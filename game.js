// Game bootstrap: loads world.json, creates the engine, the 3D view and the UI, and routes actions.
import { Game } from './engine/core.js';
import { parse, addVocabulary, resolve, VERB_LABELS, verbLabel, numberEntry, putInto, throwAt } from './engine/parser.js';
import { rules } from './rules/index.js';
import { View } from './scene/view.js';
import * as THREE from 'three';
import { buildRoom } from './scene/graybox.js';
import { designOverrides, packageImage } from './scene/design.js';
import { lighting } from './scene/lighting.js';
import { fitTextures } from './scene/textures.js';
import { turnFor, pickVariants, partsForTurn } from './dashboard/turn.js';
import { UI } from './ui/ui.js';

const SAVE_KEY = 'planetfall-save-v1';
const response = await fetch('./data/world.json');
if (!response.ok) throw new Error('world.json could not be loaded');
const world = await response.json();
addVocabulary(rules.vocabulary ?? []);
const params = new URLSearchParams(location.search);
const seed = parseInt(params.get('seed') ?? '', 10);   // ?seed=N makes a run repeatable (scripts/browser.mjs)
const g = new Game(world, rules, { seed: Number.isFinite(seed) ? seed : (Date.now() % 100000) | 0 });
const view = new View(document.querySelector('#view'));
// Character cutouts (data/characters.json): one flat picture per actor, hung where the room puts him. Absent or
// unreadable, every actor stays the graybox box it was, so the game does not depend on any of it existing.
const characters = await fetch('./data/characters.json').then(r => r.ok ? r.json() : {}).catch(() => ({}));
const sceneCache = new Map();
// data/scenes/index.json lists the rooms that have an override file, so only those are fetched and a room
// without one never produces a 404 in the console. Without a manifest every room is probed once.
const sceneIndex = await fetch('./data/scenes/index.json').then(r => r.ok ? r.json() : null).catch(() => null);
const hasScene = room => !sceneIndex || (sceneIndex.rooms ?? []).includes(room);
// Every room's design metadata in one request (Program.cs reads the canonical packages; DR-045). A host without that
// endpoint gives {} and every room keeps the graybox fallbacks.
const design = await fetch('./design/rooms.json').then(r => r.ok ? r.json() : {}).catch(() => ({}));
// The shared day-phase defaults, for every room whose package does not author its own look (DR-060).
const shared = await fetch('./design/file/SHARED-ROOM-METADATA.json').then(r => r.ok ? r.json() : {}).catch(() => ({}));
// The files in each package, so an image a package names by file (a decal's picture) is loaded from where it is served.
const packages = await fetch('./design/packages.json').then(r => r.ok ? r.json() : {}).catch(() => ({}));
const loadTexture = (url, onLoad, onError) => new THREE.TextureLoader().load(url, onLoad, undefined, onError);
// The painted rooms. A room's paintings are hung in the game once the user has accepted it on the dashboard -- before
// that they are work in progress, seen on the review page. The public site carries the list as data/painted-rooms.json
// (scripts/build-site.mjs); running from the dev server it is read off data/room-status.json, the gate's own record.
const painted = await fetch('./data/painted-rooms.json').then(r => r.ok ? r.json() : null).catch(() => null)
  ?? await fetch('./data/room-status.json').then(r => r.ok ? r.json() : null).then(s => ({ rooms: Object.entries(s?.rooms ?? {}).filter(([, e]) => e?.accepted?.state === 'accepted').map(([id]) => id) })).catch(() => ({ rooms: [] }));
const paintedRooms = new Set(painted?.rooms ?? []);
// Lenses dev has fitted and chosen to trust (turn.js fitLenses), as the review page hangs them.
const lensFits = await fetch('./data/lens-fits.json').then(r => r.ok ? r.json() : {}).catch(() => ({}));
const turnCache = new Map();
async function sceneOverrides(room) {
  if (sceneCache.has(room)) return sceneCache.get(room);
  let raw = {};
  if (hasScene(room)) try { const r = await fetch(`./data/scenes/${room}.json`); if (r.ok) raw = await r.json(); } catch { /* no override */ }
  const data = { raw, merged: designOverrides(raw, design[room]) };
  sceneCache.set(room, data); return data;
}
// A painted room's turn: its views levelled and seamed once, then only the state's variants swapped on each render.
async function paintedTurn(room, raw) {
  if (!paintedRooms.has(room)) return null;
  if (!turnCache.has(room)) turnCache.set(room, turnFor(room, design, packages, raw, lensFits).catch(() => null));
  return turnCache.get(room);
}

let ui, built;
async function render() {
  const look = lighting(g.dayPhase(), g.state.here, design[g.state.here], shared);
  const room = g.state.here;
  // In the dark the room is not drawn at all: "It is pitch black. You might be eaten by a grue." A painting or the
  // graybox would show the player what the game says they cannot see -- the Transportation Supply, unlit in canon,
  // came out daylit (2026-09-15). Nothing to click either; the text still works (exits, LAMP ON, and so on).
  if (!g.getg('LIT')) {
    view.setLighting(null);                        // no sky dome or gradient: a sky room's sky is not seen in the dark
    view.scene.background = new THREE.Color('#000000');
    view.setRoom(new THREE.Group(), [], design[room]?.eye ?? [0, 1.6, 0]);
    ui.refresh();
    try { localStorage.setItem(SAVE_KEY, g.save()); } catch { /* storage unavailable */ }
    return;
  }
  const { raw, merged } = await sceneOverrides(room);
  const turn = await paintedTurn(room, raw);
  if (turn?.plates?.length) pickVariants(turn, g);
  const overrides = turn?.plates?.length ? { ...merged, parts: partsForTurn(merged, turn) } : merged;
  if (g.state.here !== room) return;               // the player moved on while the paintings loaded
  built = buildRoom(g, overrides, { loadTexture, resolveImage: p => packageImage(packages, room, p), fixtures: look.fixtures, characters });
  if (turn?.plates?.length && !turn.whole) fitTextures(built.group);
  view.setLighting(look);
  view.setRoom(built.group, built.pickables, built.eye);
  ui.refresh();
  try { localStorage.setItem(SAVE_KEY, g.save()); } catch { /* storage unavailable */ }
}
// Typing RESTART has to be the page's job: the engine cannot rebuild itself, which is why V-RESTART could only
// name a button. It named one that lived in the collapsed debug panel, so for an ordinary player it named nothing.
// The source asks "(Y is affirmative)" before restarting; this asks for the word again, which is the same bargain
// -- one confirmation before a game is thrown away -- and any other command calls it off.
let restartArmed = false;
function run(command) {
  let cmd = command, echo = command.text;
  if (command.text && !command.verb) { cmd = parse(command.text, g); if (cmd.error) { ui.append([{ kind: 'text', text: cmd.error }], echo); return; } }
  else echo = describeCommand(command);
  if (cmd.verb === 'RESTART') {
    if (restartArmed) { restartArmed = false; restart(); return; }
    restartArmed = true;
    g.messages = []; g.verbs.SCORE(g, { verb: 'SCORE' });
    g.tell('Type RESTART again to start over from the beginning, or anything else to carry on. (The "restart" link at the top of the view does the same thing.)');
    ui.append(g.messages.splice(0), echo);
    return;
  }
  restartArmed = false;
  const before = g.state.score;
  const messages = g.dispatch(cmd);
  ui.append(messages, echo);
  if (g.state.score > before && cmd.verb !== 'RESTORE') ui.scoreNotice(g.state.score - before, g.state.score);   // points scored this turn
  render();
}
function describeCommand(c) {
  const n = id => g.name(id);
  if (c.verb === 'WALK') return 'go ' + c.dir.toLowerCase();
  if (c.verb === 'WAIT-FOR') return 'wait for the ' + c.key;
  if (c.all) return c.verb.toLowerCase() + ' all' + (c.except?.length ? ' except ' + c.except.map(n).join(', ') : '');
  if (c.verb === 'TELL' && c.prsi) return `ask ${n(c.prso)} about ${c.prsi === 'ME' ? 'yourself' : n(c.prsi)}`;
  if (c.winner) return `${n(c.winner)}, ${describeCommand({ ...c, winner: null })}`;
  const base = (c.verb.replace('-', ' ').toLowerCase()) + (c.prso ? ' ' + n(c.prso) : '');
  const prep = { PUT: 'in', THROW: 'at', SLIDE: 'through', SPAN: 'across', 'PUT-UNDER': 'under', 'PUT-ON': 'on', ATTRACT: 'over' }[c.verb] ?? 'with';
  return c.prsi ? `${base} ${prep} ${n(c.prsi)}` : base;
}
const restart = () => { try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ } g.restart((Date.now() % 100000) | 0); ui.transcript.replaceChildren(); ui.append(g.start()); render(); };
ui = new UI(document.body, g, {
  onCommand: run,
  onRestart: restart,
  onJump: room => { g.goto(room); ui.append(g.messages.splice(0), 'debug: jump to ' + room); render(); },
});
view.onPick = (p, e) => { if (p.kind === 'exit') ui.exitMenu(e.clientX, e.clientY, p); else if (p.kind === 'pseudo') ui.pseudoMenu(e.clientX, e.clientY, p); else ui.objectMenu(e.clientX, e.clientY, p.id); };
document.querySelector('#view').addEventListener('hover', e => ui.setHover(e.detail));

// Resume a saved game if there is one (unless ?fresh is given), otherwise start the opening.
let resumed = false;
try { const saved = params.has('fresh') ? null : localStorage.getItem(SAVE_KEY); if (saved) { g.load(saved); resumed = true; } } catch { /* ignore */ }
// A resumed game starts you wherever you left off, which is bewildering if you had forgotten there was one --
// the transcript line for it scrolls away, so say it in the toast as well, where it cannot be missed.
if (resumed) {
  ui.say('Resumed your saved game. Type RESTART, or use the restart link above, to begin again.');
  ui.notice(`Resumed your saved game in the ${g.name(g.state.here)}. Type RESTART to start over.`);
  g.messages = []; g.look(); ui.append(g.messages.splice(0));
}
else ui.append(g.start());
await render();

// Test hook used by scripts/browser.mjs: parse a typed command against the live game, and open the click
// menu for an object or exit door exactly as a click on its placeholder would (the raycast is the only
// part skipped, since it depends on where the camera happens to point).
window.planetfall = {
  game: g, ui, view,
  parse: text => parse(text, g),
  resolve: words => resolve(words, g),
  numberEntry: cmd => numberEntry(g, cmd),
  putInto: id => putInto(g, id),
  throwAt: id => throwAt(g, id),
  labels: VERB_LABELS,
  verbLabel: (id, verb) => verbLabel(g, id, verb),
  pick(id) {
    const p = built?.pickables.find(p => (p.kind === 'object' && p.id === id) || (p.kind === 'exit' && p.exit.door === id) || (id === 'PSEUDO-OBJECT' && p.kind === 'pseudo' && p.routine === g.state.pseudo?.routine));
    if (!p) return false;
    view.faceTowards(p.position); view.onPick(p, { clientX: 480, clientY: 360 }); return true;
  },
};
