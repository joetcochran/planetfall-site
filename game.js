// Game bootstrap: loads world.json, creates the engine, the 3D view and the UI, and routes actions.
import { Game } from './engine/core.js';
import { parse, addVocabulary, resolve, VERB_LABELS, verbLabel, numberEntry, putInto, throwAt, isVisible } from './engine/parser.js';
import { rules } from './rules/index.js';
import { View } from './scene/view.js';
import * as THREE from 'three';
import { buildRoom } from './scene/graybox.js';
import { designOverrides, packageImage } from './scene/design.js';
import { lighting } from './scene/lighting.js';
import { fitTextures } from './scene/textures.js';
import { turnFor, pickVariants, partsForTurn } from './dashboard/turn.js';
import { when, buildParts } from './scene/parts.js';
import { glimpseParts } from './scene/glimpse.js';
import { UI } from './ui/ui.js';
import { applyCheckpoint } from './engine/checkpoint.js';

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
// The narrow glimpse (scene/glimpse.js, data/glimpses.json): the Bio Lab mutants seen one room behind in the final
// chase, and nothing else. Absent or unreadable, nothing is ever drawn through an opening, as before.
const glimpses = await fetch('./data/glimpses.json').then(r => r.ok ? r.json() : {}).catch(() => ({}));
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

// AN ART ROOM IS A SECOND EYE ON A ROOM THE GAME ALREADY HAS, and this is what hangs it. The escape pod is the case
// it was written for (DR-112): climbing into the safety web does not change room -- SAFETY-WEB is a vehicle inside
// the pod (VEHBIT and CLIMBBIT, globals.zil 950-956) -- but the seat inside the webbing is a different eye from the
// one standing in the open strip, and the view system gives ONE eye and ONE ring to a room. So the nest is its own
// package, ESCAPE-POD-WEB, whose scene names the game room in `viewOf`, and the pod's scene lists it in `altViews`
// with the condition that selects it.
//
// Without this the nest was unreachable and the whole descent was invisible: the player climbed in, the camera did
// not move, and the sixteen painted states of the storyboard -- the Feinstein coming apart, the planet closing from
// four thousand miles to the surf -- hung on a room the game never rendered. The art was right and nothing showed it.
//
// Only a PAINTED alternative is taken. An art room that the user has not accepted yet has no hung views, and routing
// to it would put its graybox on screen in place of the game room's finished paintings -- worse than not routing at
// all. So the room falls back to itself until its paintings are accepted, and starts working the moment they are.
// A ROOM PAINTED AS ONE VIEW MUST NOT BE TURNED PAST WHERE ITS PAINTING REACHES. The escape pod's nest is painted
// as a single frame -- that is the saving that pays for sixteen states of the descent -- and the yaw carries over
// from whatever the player was facing in the room they came from, which for the pod is a ring of four. Climb into
// the safety web while facing the webbing and the camera kept pointing there, where nothing is painted, and the
// player got the bare graybox: flat grey ribs and strap boxes, reported from play on 2026-09-17.
//
// Derived rather than declared, so it cannot fall out of step with what was actually painted: a room whose package
// registers exactly ONE level view (caps and state variants aside) is inherently clamped to that view, and a room
// with a ring is not clamped at all. Nothing new to author, and the next single-view art room is covered by having
// been painted that way.
function clampFor(roomId) {
  const views = Object.values(design[roomId]?.referenceImages ?? {})
    .filter(v => !v.state && Math.abs(v.pitch ?? 0) < 45);      // the base ring, without caps or painted states
  return views.length === 1 ? { bearing: views[0].bearing ?? 0, hfov: views[0].hfov ?? 110 } : null;
}

function viewRoomFor(raw, g) {
  const alt = (raw?.altViews ?? []).find(a => {
    if (!a?.room || !paintedRooms.has(a.room)) return false;
    try { return when(g, a.when); } catch { return false; }
  });
  return alt?.room ?? null;
}

let ui, built;
// The room the SCENE was last built for, which is not always the room the player is in: a walk moves the player
// first and rebuilds after. Anything that reads the drawn scene -- the click driver asking for a pickable, the
// compass strip -- has to wait for these two to agree, or it reads the room it has just left. That race cost a
// whole browser run twice over: the canteen "not drawn" in the Mess Hall and the Courtyard offering the Winding
// Stair's exits, both of them the scene simply not having caught up yet (2026-09-17).
let builtRoom = null;
// How many renders are still in flight. A render in the same room is just as slow as a walk's -- it refetches the
// scene and waits on the paintings -- and until it ends the inventory panel and the scene both show the turn before:
// the browser run failed "eat red goo" on an inventory still without the kit's contents, and "take ladder" on a
// scene still the Mess Corridor's three turns after walking into Storage West (2026-09-18, under a render).
// planetfall.settled() is the condition to wait on; drawnRoom() alone cannot see a same-room render.
let rendering = 0;
// A loading spinner while a room's paintings load (the user, 2026-09-23: "a loading spinner ... the 'planetfall guy'
// head" -- the favicon's own picture, assets/ui/loading-head.png). Shown only when a render outlasts a quarter of a
// second, so a quick step never flashes it; hidden as soon as no render is in flight.
const loadingEl = Object.assign(document.createElement('div'), { id: 'loading', hidden: true, role: 'status', ariaLabel: 'Loading the room' });
loadingEl.innerHTML = '<div class="ring"></div><img src="assets/ui/loading-head.png" alt="">';
document.querySelector('#view').appendChild(loadingEl);
let loadingTimer = null;
async function render() {
  rendering++;
  if (!loadingTimer) loadingTimer = setTimeout(() => { if (rendering) loadingEl.hidden = false; }, 250);
  try { await renderNow(); } finally {
    rendering--;
    if (!rendering) { clearTimeout(loadingTimer); loadingTimer = null; loadingEl.hidden = true; }
  }
}
async function renderNow() {
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
  const { raw } = await sceneOverrides(room);
  // The eye to render from: this room's own, or an art room's while its condition holds.
  const viewRoom = viewRoomFor(raw, g) ?? room;
  const { raw: viewRaw, merged } = viewRoom === room ? await sceneOverrides(room) : await sceneOverrides(viewRoom);
  // The art room carries its own eye, its own lighting and its own ring, and is graded as itself: the nest's cabin
  // light does not change through the descent -- what changes comes IN through the porthole, which is the painting's
  // business and not a fixture's.
  const look = lighting(g.dayPhase(), viewRoom, design[viewRoom], shared, g);
  const turn = await paintedTurn(viewRoom, viewRaw);
  if (turn?.plates?.length) pickVariants(turn, g);
  // Through partsForTurn with no turn as well: it keeps a patch cut from a painting off a room whose paintings are
  // not hung (the shuttle cabins' lever, shown over bare fabric).
  const overrides = turn?.plates?.length ? { ...merged, parts: partsForTurn(merged, turn) }
    : merged.parts ? { ...merged, parts: partsForTurn(merged, null) } : merged;
  if (g.state.here !== room) return;               // the player moved on while the paintings loaded
  built = buildRoom(g, overrides, { loadTexture, resolveImage: p => packageImage(packages, viewRoom, p), fixtures: look.fixtures, characters });
  if (turn?.plates?.length && !turn.whole) fitTextures(built.group);
  // Who is in the next room, seen through the opening -- only the pairs data/glimpses.json lists, only from the room's
  // own eye (not an art room's). No plate, no pick target: added to the group, never registered. Over a painting it
  // is drawn with the things that move (renderOrder 20, graybox.js register), after the depth-only masks that cut it.
  const far = viewRoom === room ? glimpseParts(g, { room, table: glimpses, design, characters, eye: built.eye, when, visible: isVisible }) : [];
  if (far.length) {
    const glimpse = buildParts(g, far, { loadTexture }).group;
    if ((overrides.parts ?? []).some(p => p?.part === 'plate' || p?.part === 'panorama')) glimpse.traverse(m => { if (!m.userData.mask) m.renderOrder = 20; });   // a seal (glimpse.js) stays a depth mask, drawn first
    glimpse.userData.glimpse = far.filter(p => p.glimpse).map(p => p.glimpse);
    built.group.add(glimpse);
  }
  view.setLighting(look);
  // Before setRoom, so the first frame of a new room is already aimed. Only where paintings were actually hung: a
  // room showing its graybox has nothing to be turned away from, and must stay free to look round. The plate's own
  // picture gives the shape the vertical limit is worked out from, so it is measured rather than assumed.
  const clamp = turn?.plates?.length ? clampFor(viewRoom) : null;
  if (clamp) {
    const img = turn.plates[0]?.texture?.image;
    if (img?.width && img?.height) clamp.aspect = img.height / img.width;
  }
  view.setClamp(clamp);
  view.setRoom(built.group, built.pickables, built.eye);
  builtRoom = viewRoom;
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
  if (c.takeFirst) return `take ${n(c.takeFirst)}, then ${describeCommand({ ...c, takeFirst: null })}`;   // "Take the survival kit and eat" (round fourteen, B2)
  if (c.openFirst) return `open ${n(c.openFirst)}, then ${describeCommand({ ...c, openFirst: null })}`;   // "Open the canteen and drink" (B2)
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
// ?room=ID starts you standing in that room, for walking out of a room you are reviewing and looking at what joins
// it (the user, 2026-09-22: "a way when reviewing a room for me to enter play mode directly in that room so i can
// navigate around and look for continuity"). The review page links here. It is the same jump the debug menu makes,
// so nothing about the room is special-cased; an id the world does not have is said in the toast and ignored.
const startRoom = (params.get('room') ?? '').toUpperCase();
if (startRoom) {
  if (g.rooms.has(startRoom)) {
    g.goto(startRoom);
    g.messages = []; g.look(); ui.append(g.messages.splice(0));
    ui.notice(`Playing from the ${g.name(startRoom)}. Walk out and back to check what joins it.`);
  } else ui.notice(`No room called ${startRoom}; started as usual.`);
}
// ?checkpoint=ID starts from a saved position partway through the game (engine/checkpoint.js; the files are
// data/checkpoints/, written by scripts/checkpoints.mjs), for playtesting a puzzle without replaying the opening. It
// replaces any game in progress. The parameter is then taken off the address, so a reload resumes the game as played
// from there rather than starting the checkpoint over. The debug panel lists them.
const checkpointId = params.get('checkpoint');
if (checkpointId) {
  const cp = await fetch(`./data/checkpoints/${encodeURIComponent(checkpointId)}.json`).then(r => r.ok ? r.json() : null).catch(() => null);
  if (cp) {
    applyCheckpoint(g, cp, (Date.now() % 100000) | 0);
    ui.transcript.replaceChildren();
    g.messages = []; g.look(); ui.append(g.messages.splice(0));
    ui.notice(`Checkpoint: ${cp.label}.`);
  } else ui.notice(`No checkpoint called ${checkpointId}; started as usual.`);
  params.delete('checkpoint');
  history.replaceState(null, '', location.pathname + (params.size ? '?' + params : '') + location.hash);
}
fetch('./data/checkpoints/index.json').then(r => r.ok ? r.json() : null).then(index => {
  const select = document.querySelector('#checkpoint');
  for (const c of index?.checkpoints ?? []) { const o = document.createElement('option'); o.value = c.id; o.textContent = c.label; select.appendChild(o); }
  select.onchange = () => { if (select.value) location.search = '?checkpoint=' + encodeURIComponent(select.value); };
}).catch(() => { /* no checkpoints published */ });
await render();

// Test hook used by scripts/browser.mjs: parse a typed command against the live game, and open the click
// menu for an object or exit door exactly as a click on its placeholder would (the raycast is the only
// part skipped, since it depends on where the camera happens to point).
window.planetfall = {
  game: g, ui, view,
  // Which room the drawn scene belongs to. A tool driving the page waits for this to equal the room the game is in
  // before it reads anything off the scene; polling a timeout instead is what made the browser walkthrough flaky.
  drawnRoom: () => builtRoom,
  // True once every render started so far has finished: the scene, the compass, the inventory and the quick row all
  // show the game as it is now.
  settled: () => rendering === 0,
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
