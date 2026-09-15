// Game engine core: a pure state machine driven by world.json plus hand-ported rules.
// No DOM or Three.js here so scripts/play.mjs can drive it under Node.
//
// Vocabulary follows the ZIL it ports from so the rules read like the source:
//   fset/fclear/fsetP  object flags        move/remove/loc/isIn  object tree
//   setg/getg          globals             queue/disable/enabled  interrupt clock
//   tell/crlf          output              jigsUp                death
//   goto/look          movement            perform               verb dispatch
import { describeRoom } from './describe.js';
import { DEFAULT_VERBS, PRE_VERBS, tooHeavy } from './verbs.js';

// Scenery words (room PSEUDO entries) with a readable label: the ZIL word is cut to six letters ("TRANSL"), so the
// routine's name supplies the full word when it extends the truncated one ("translator").
// Six-letter words the routine name does not restore are spelled as the room text has them (the Repair Room's "strange
// machines" were labelled "machin").
const TRUNCATED = { MACHIN: 'machines', BENCHE: 'benches' };
export function pseudoLabel(p) {
  const word = p.word.toLowerCase(), full = p.routine.replace(/-PSEUDO$/, '').toLowerCase().split('-')[0];
  return full.length > word.length && full.startsWith(word) ? full : TRUNCATED[p.word.toUpperCase()] ?? word;
}

export const DIRECTIONS = ['NORTH','SOUTH','EAST','WEST','NE','NW','SE','SW','UP','DOWN','IN','OUT'];
const C_ELAPSED_DEFAULT = 7, DEFAULT_MOVE = 20;
export const YUKS = ['Fat chance.','A valiant attempt.',"You can't be serious.",'Not bloody likely.','An interesting idea...','What a concept!'];

// The doors drawn on this room's exits (see Game.exitsHere).
const exitsDoors = g => g.exitsHere().filter(e => e.door && e.doorVisible).map(e => e.door);

// Deterministic PRNG so a scripted playthrough is repeatable (mulberry32).
function rand(state) {
  state.rng = (state.rng + 0x6D2B79F5) | 0;
  let t = state.rng; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export class Game {
  constructor(world, rules, { seed = 1 } = {}) {
    this.world = world;
    this.rooms = new Map(world.rooms.map(r => [r.id, r]));
    this.objects = world.objects;
    this.rules = rules;                 // {objects:{}, rooms:{}, interrupts:{}, exits:{}, describers:{}, setup(g)}
    this.verbs = { ...DEFAULT_VERBS, ...(rules.verbs ?? {}) };
    this.messages = [];
    this.notes = new Set();             // unported routines encountered
    this.state = this.initialState(seed);
    rules.setup?.(this);
  }

  initialState(seed) {
    const objects = {};
    for (const [id, o] of Object.entries(this.objects)) objects[id] = { loc: o.location, flags: [...o.flags] };
    const rooms = {};
    for (const r of this.world.rooms) rooms[r.id] = { touched: false, flags: [...r.flags] };
    return { here: 'DECK-NINE', turn: 0, time: 4540, elapsed: C_ELAPSED_DEFAULT, score: 0, dead: false, rng: seed | 0,
             // Deliberate deviation (user decision, 2026-09-10, round-three fix list): VERBOSE starts on, so a room revisited
             // shows its description again instead of only its name plus whatever stands in it (the click playtest read the
             // ambassador's description as Deck Nine's). The original started in BRIEF; "brief" and "superbrief" still work.
             globals: { DAY: 1, LIT: true, WINNER: 'ADVENTURER', HERE: 'DECK-NINE', 'LOAD-ALLOWED': 100, VERBOSE: true, 'SUPER-BRIEF': false }, objects, rooms, queue: [], lastObject: 'POD-DOOR', pseudo: null };
  }

  // --- object tree -------------------------------------------------------------------
  obj(id) { return this.objects[id]; }
  name(id) { if (id === 'PSEUDO-OBJECT') return this.state.pseudo ? pseudoLabel(this.state.pseudo) : 'pseudo'; return this.properName(id) ?? this.objects[id]?.name ?? this.rooms.get(id)?.name ?? id; }
  // rules.names[id] = g => string | null gives an object a proper name while it applies. Deliberate deviation (user
  // decision, 2026-09-10, round four): once Floyd has introduced himself the narrator calls him Floyd, not "multiple
  // purpose robot" (floyd.js). A proper name takes no article: tell() folds "the Floyd" / "a Floyd" into "Floyd".
  properName(id) { return this.rules.names?.[id]?.(this) ?? null; }
  loc(id) { return this.state.objects[id]?.loc ?? null; }
  isIn(id, container) { return this.loc(id) === container; }
  // seq orders what the player holds, newest first, as MOVE made a thing the FIRST? of its new place (ITAKE's fumble).
  move(id, to) { const o = this.state.objects[id]; o.loc = to; o.seq = this.state.moveSeq = (this.state.moveSeq ?? 0) + 1; }
  remove(id) { this.state.objects[id].loc = null; }
  contents(container) { return Object.keys(this.state.objects).filter(id => this.state.objects[id].loc === container); }
  fsetP(id, flag) { return this.state.objects[id]?.flags.includes(flag) ?? false; }
  fset(id, flag) { const f = this.state.objects[id].flags; if (!f.includes(flag)) f.push(flag); }
  fclear(id, flag) { const f = this.state.objects[id].flags; const i = f.indexOf(flag); if (i >= 0) f.splice(i, 1); }
  held(id) { let l = this.loc(id); while (l) { if (l === 'ADVENTURER') return true; l = this.loc(l); } return false; }
  // Where the player stands: the room, or the vehicle inside the room.
  playerLoc() { return this.loc('ADVENTURER'); }
  inVehicle() { const l = this.playerLoc(); return l !== this.state.here && this.fsetP(l, 'VEHBIT') ? l : null; }
  seeInside(id) { return this.fsetP(id, 'OPENBIT') || this.fsetP(id, 'TRANSBIT'); }
  // SIZE defaults to 5 (PROPDEF SIZE 5); WEIGHT leaves out worn things, and what they hold (verbs.zil WEIGHT).
  size(id) { const s = parseInt(this.obj(id)?.size ?? 5); return Number.isFinite(s) ? s : 5; }
  weight(id) { return this.size(id) + this.contents(id).reduce((n, c) => n + (this.fsetP(c, 'WORNBIT') ? 0 : this.weight(c)), 0); }
  article(id) { return this.fsetP(id, 'VOWELBIT') ? 'an' : 'a'; }
  // V-PUT's room check: the container's CAPACITY against what it would then hold (its WEIGHT less its own SIZE).
  fits(o, c) { return this.weight(c) + this.weight(o) - this.size(c) <= (parseInt(this.obj(c)?.capacity ?? 0) || 0); }

  // --- globals, randomness, clock ----------------------------------------------------
  setg(n, v) { this.state.globals[n] = v; }
  getg(n) { return this.state.globals[n]; }
  random(n) { return Math.floor(rand(this.state) * n) + 1; }
  prob(n) { return this.random(100) <= n; }
  pickOne(list) { return list[this.random(list.length) - 1]; }
  queue(name, tick) { const q = this.state.queue; let e = q.find(x => x.name === name); if (!e) q.push(e = { name }); e.tick = tick; e.enabled = true; }
  disable(name) { const e = this.state.queue.find(x => x.name === name); if (e) e.enabled = false; }
  enabled(name) { return !!this.state.queue.find(x => x.name === name)?.enabled; }
  tickOf(name) { const e = this.state.queue.find(x => x.name === name); return e?.enabled ? e.tick : 0; }   // <GET <INT name> ,C-TICK>
  clocker() {
    const el = this.state.elapsed;
    for (const e of [...this.state.queue]) {
      if (!e.enabled || e.tick === 0) continue;
      if (e.tick === -1) this.runInterrupt(e.name);
      else { e.tick -= el; if (e.tick <= 1) { e.tick = 0; this.runInterrupt(e.name); } }
      if (this.state.dead) return;
    }
  }
  runInterrupt(name) {
    const fn = this.rules.interrupts[name];
    if (!fn) { this.notes.add('interrupt ' + name); return; }
    fn(this);
  }

  // --- output -------------------------------------------------------------------------
  tell(text, kind = 'text') {
    for (const id of Object.keys(this.rules.names ?? {})) { const n = this.properName(id); if (n && text.includes(n)) text = text.replace(new RegExp(`\\b(?:[Tt]he|[Aa]n?) ${n}\\b`, 'g'), n); }
    this.messages.push({ kind, text });
  }
  crlf() { this.tell('', 'break'); }
  // JIGS-UP, then FINISH (verbs.zil 252-285): the score, the Treaty of Gishen IV, and the choice of restarting,
  // restoring a saved position or quitting. Restore works from here (dispatch); Restart and Quit are the page's.
  jigsUp(text) {
    this.tell(text, 'death'); this.tell('    ****  You have died  ****', 'death'); this.state.dead = true;
    this.crlf(); this.verbs.SCORE(this, { verb: 'SCORE' });
    this.tell('Oh, well. According to the Treaty of Gishen IV, signed in 8747 GY, all adventure game players must be given another chance after dying. In the interests of interstellar peace...');
    this.crlf(); this.tell('Would you like to restart the game from the beginning, restore a saved game position, or end this session of the game? (Type RESTART, RESTORE, or QUIT.)');
    // Deliberate deviation (user decision, 2026-09-11, round eleven): the prompt offers RESTORE to players who have
    // no saved position, and nothing in the game ever says SAVE exists. Round eleven lost a leg of each blind run to
    // it. The source's line is untouched; this one is added only when there is nothing to restore.
    if (!this.state.saveSlot) this.tell('(You have no saved position. SAVE costs no time at all, and one would have spared you replaying all of this.)');
  }
  scoreObj(id) {
    const v = parseInt(this.obj(id)?.value ?? this.rooms.get(id)?.value ?? 0) || 0;
    const key = 'scored:' + id;
    if (v && !this.getg(key)) { this.setg(key, true); this.state.score += v; }
  }

  // --- rooms and movement ---------------------------------------------------------------
  here() { return this.rooms.get(this.state.here); }
  // A room's scenery words: its PSEUDO list from the source, plus any a rules module adds (rules.pseudoWords[room]).
  pseudoWords(room = this.state.here) { return [...(this.rooms.get(room).pseudo ?? []), ...(this.rules.pseudoWords?.[room] ?? [])]; }
  roomFlag(room, flag) { return this.state.rooms[room].flags.includes(flag); }
  // LIT? (parser.zil 1213-1228): a room is lit by its own ONBIT, or by any object giving light (ONBIT) that the
  // winner carries or that stands in the room, including inside an open or transparent container. Only two rooms are
  // dark (TRANSPORTATION-SUPPLY and REACTOR-ACCESS-STAIRS) and the game's one light is the powerful portable lamp in
  // the Radiation Lab, whose LAMP-F sets ONBIT (comptwo.zil 2197-2210, lawanda.js). Until round eleven this method
  // read the room's flag alone, so the lamp lit nothing and both rooms were sealed: two blind runs spent a thousand
  // commands looking for a light that was working correctly and simply could not be seen by.
  lit(room = this.state.here) {
    if (this.roomFlag(room, 'ONBIT')) return true;
    const winner = this.getg('WINNER') ?? 'ADVENTURER';
    // Deliberate deviation (user decision, 2026-09-11, round eleven): an order dispatches Floyd, and a robot with his
    // own sensors is not stopped by the dark, so "floyd, get the orange key" works in a room the player cannot see in.
    // The player still gets "It is pitch black" for anything they try themselves.
    if (winner === 'FLOYD' && this.fsetP('FLOYD', 'RLANDBIT')) return true;
    const shines = ids => ids.some(id => this.fsetP(id, 'ONBIT') || ((this.fsetP(id, 'OPENBIT') || this.fsetP(id, 'TRANSBIT')) && shines(this.contents(id))));
    return shines(this.contents(winner)) || shines(this.contents(room).filter(id => id !== 'ADVENTURER'));
  }
  roomAction(room, rarg) { const fn = this.rules.rooms[room]; return fn ? fn(this, { rarg, verb: null }) : false; }
  goto(room, look = true) {
    const wasLit = this.getg('LIT');
    this.move('ADVENTURER', room);
    this.state.here = room; this.setg('HERE', room); this.setg('LIT', this.lit());
    if (!wasLit && !this.getg('LIT') && this.prob(75)) { this.jigsUp('Oh, no! Something (a grue?) slithered into the room and devoured you!'); return; }
    if (this.roomAction(room, 'M-ENTER') === 2) return;
    if (look) { this.firstLook(); this.noticeChanges(); }
    this.scoreObj(room);
  }
  // DESCRIBE-ROOM: V? is LOOK? or VERBOSE (SUPER-BRIEF overrides VERBOSE on arrival); an untouched room is always described.
  firstLook() { const verbose = !this.state.rooms[this.state.here].touched || (!!this.getg('VERBOSE') && !this.getg('SUPER-BRIEF')); this.describe(verbose); }
  look() { this.state.elapsed = 9; this.describe(true); }
  describe(verbose) {
    const r = this.here(); const st = this.state.rooms[r.id];
    if (!this.getg('LIT')) {
      this.tell('It is pitch black. You might be eaten by a grue.', 'warning');
      // DESCRIBE-ROOM (verbs.zil 70-73): the one dark room with a way out you can see.
      if (r.id === 'TRANSPORTATION-SUPPLY') this.tell('There is light to the south.');
      return;
    }
    if (!st.touched) { st.touched = true; verbose = true; }
    const v = this.inVehicle();
    this.tell(r.name + (v ? ', in the ' + this.name(v) : ''), 'room');
    if (verbose) { const text = describeRoom(this, r); if (text) this.tell(text); }
    if (v && this.rules.objects[v]) this.rules.objects[v](this, { rarg: 'M-LOOK', verb: null });
    this.describeObjects();
  }
  // Port of DESCRIBE-OBJECTS/PRINT-CONT for a room: first descriptions until touched, then long descriptions.
  describeObjects() {
    const lines = [];
    const av = this.inVehicle();
    const listed = id => !this.fsetP(id, 'INVISIBLE') && !this.fsetP(id, 'NDESCBIT') && id !== 'ADVENTURER' && id !== av;
    const describeIn = (container, level) => {
      for (const id of this.contents(container)) {
        if (id === 'ADVENTURER' || id === av) continue;
        if (this.fsetP(id, 'INVISIBLE')) continue;
        if (!this.fsetP(id, 'NDESCBIT')) {
          const o = this.obj(id);
          if (level === 0) lines.push(!this.fsetP(id, 'TOUCHBIT') && o.fdesc ? o.fdesc : o.ldesc ? o.ldesc : this.properName(id) ? `${this.properName(id)} is here.` : `There is ${this.article(id)} ${o.name} here.`);
          else lines.push('  '.repeat(level) + (this.fsetP(id, 'VOWELBIT') ? 'An ' : 'A ') + o.name + (this.fsetP(id, 'WORNBIT') ? ' (being worn)' : ''));
        }
        const visibleInside = this.seeInside(id) && this.contents(id).some(c => c !== 'ADVENTURER' && !this.fsetP(c, 'INVISIBLE') && !this.fsetP(c, 'NDESCBIT'));
        if (visibleInside) { if (level === 0 || !this.fsetP(id, 'NDESCBIT')) lines.push('  '.repeat(level) + `The ${this.name(id)} contains:`); describeIn(id, level + 1); }
      }
    };
    describeIn(this.state.here, 0);
    if (av) describeIn(av, 0);
    for (const l of lines) this.tell(l);
    void listed;
  }
  inventoryLines() {
    const lines = [];
    const walk = (container, level) => {
      for (const id of this.contents(container)) {
        lines.push('  '.repeat(level) + (this.fsetP(id, 'VOWELBIT') ? 'An ' : 'A ') + this.name(id) + (this.fsetP(id, 'WORNBIT') ? ' (being worn)' : ''));
        if (this.seeInside(id) && this.contents(id).length) { lines.push('  '.repeat(level + 1) + `The ${this.name(id)} contains:`); walk(id, level + 2); }
      }
    };
    walk('ADVENTURER', 0);
    return lines;
  }

  // Objects the player can refer to right now: room contents (and open containers), inventory, vehicle, room globals, global objects.
  scope() {
    const out = new Set();
    const add = id => { if (!id || out.has(id) || id === 'ADVENTURER') return; out.add(id); if (this.seeInside(id) || this.fsetP(id, 'ACTORBIT')) for (const c of this.contents(id)) add(c); };
    for (const id of this.contents(this.state.here)) add(id);
    const v = this.inVehicle(); if (v) { add(v); for (const id of this.contents(v)) add(id); }
    for (const id of this.contents('ADVENTURER')) add(id);
    for (const g of this.here().globals) add(g);
    for (const [id, o] of Object.entries(this.objects)) if (o.location === 'GLOBAL-OBJECTS' && !['LOCAL-GLOBALS'].includes(id)) add(id);
    return [...out].filter(id => !this.fsetP(id, 'INVISIBLE'));
  }
  // Things a scene should draw: visible objects physically in the room (or in the vehicle), plus the room's referable globals.
  sceneObjects() {
    const v = this.inVehicle();
    const here = this.contents(this.state.here).filter(id => id !== 'ADVENTURER' && !this.fsetP(id, 'INVISIBLE'));
    const inVehicle = v ? this.contents(v).filter(id => id !== 'ADVENTURER' && !this.fsetP(id, 'INVISIBLE')) : [];
    const globals = this.here().globals.filter(id => this.objects[id] && !this.fsetP(id, 'INVISIBLE'));
    return { here, inVehicle, globals, vehicle: v };
  }
  // Exits with live door state. A routine exit has no door in the source data; a rule module can name the
  // door it checks through rules.exitDoors[ROUTINE] (an object id, or (g, exit) => id | null), so the scene
  // draws a door panel and the exit menu offers Open/Close for it, the way conditional exits already do.
  // rules.exitVisible[ROUTINE] = (g, direction) => boolean hides a routine exit while it can only answer "You can't go
  // that way." (the sunk pod's east door), so the compass and the scene never offer an option the game refuses.
  // exitsHere({ hidden: true }) keeps those too, each marked `hidden`, for the scene: a door hidden with its exit is
  // still drawn (closed, unpickable), so a lift in transit is not a room with no door at all (DR-046).
  exitsHere({ hidden = false } = {}) {
    const shown = e => !e.routine || !this.rules.exitVisible?.[e.routine] || this.rules.exitVisible[e.routine](this, e.direction);
    return this.here().exits.filter(e => hidden || shown(e)).map(e => {
      let door = e.door ?? null;
      if (!door && e.routine) { const d = this.rules.exitDoors?.[e.routine]; const id = typeof d === 'function' ? d(this, e) : d; if (id && this.objects[id]) door = id; }
      if (!door) { const pd = this.rules.panelDoors?.[this.state.here]?.[e.direction]; if (pd && this.objects[pd]) door = pd; }   // a door drawn on a plain exit (the Kitchen's)
      const shut = door && e.routine && this.rules.exitOpen?.[e.routine];   // a routine exit whose way is open only with the door open and the car there
      return { ...e, hidden: !shown(e), door, open: door ? (shut ? !!shut(this, e) : this.fsetP(door, 'OPENBIT')) : null, doorVisible: door ? !this.fsetP(door, 'INVISIBLE') : null };
    });
  }

  // Deliberate deviation (user decision, 2026-09-10, round four): coming back to a room, say which of its doors (or
  // open-and-shut containers) changed while you were away. The original changed them silently (the lobby's elevator
  // doors opening for a car you called, the reactor elevator door shutting behind you), and both playtests took the
  // silent change for a bug. What the player sees is recorded after every turn; a change is only reported when the
  // record is older than this turn, so a door that shut with its own message as you passed is not reported again.
  watched() {
    const out = new Set(exitsDoors(this));
    const { here, globals } = this.sceneObjects();
    for (const id of [...here, ...globals]) if (this.fsetP(id, 'DOORBIT') || (this.fsetP(id, 'CONTBIT') && !this.fsetP(id, 'ACTORBIT'))) out.add(id);
    return [...out];
  }
  recordSeen() {
    if (!this.getg('LIT')) return;
    const seen = this.state.seen ??= {};
    for (const id of this.watched()) seen[id] = { open: this.fsetP(id, 'OPENBIT'), turn: this.state.turn };
  }
  noticeChanges() {
    if (!this.getg('LIT')) return;
    const seen = this.state.seen ??= {};
    for (const id of this.watched()) {
      const open = this.fsetP(id, 'OPENBIT'), was = seen[id];
      if (was && was.open !== open && was.turn < this.state.turn) this.tell(`The ${this.name(id)} has ${open ? 'opened' : 'closed'} since you were last here.`);
      seen[id] = { open, turn: this.state.turn };
    }
  }

  // --- verbs ----------------------------------------------------------------------------
  // Order mirrors PERFORM: vehicle M-BEG, room M-BEG, indirect object, direct object, then the verb default.
  perform(verb, prso = null, prsi = null, extra = {}) {
    const ctx = { verb, prso, prsi, rarg: 'M-OBJECT', fatal: false, ...extra };
    // Handlers get their own copy of ctx with the RARG set; a `ctx.fatal = true` (RFATAL) inside one is copied back.
    const call = (fn, rarg) => { const c = { ...ctx, rarg }; const r = fn(this, c); if (c.fatal) ctx.fatal = true; return r; };
    const objAction = (id, rarg) => {
      if (id === 'PSEUDO-OBJECT') {   // room scenery word: dispatch to the PSEUDO routine the parser resolved
        const routine = this.state.pseudo?.routine, pfn = routine && this.rules.pseudos?.[routine];
        if (!pfn) { if (routine) this.notes.add('pseudo ' + routine); return false; }
        return call(pfn, rarg);
      }
      const fn = id && this.rules.objects[id]; if (!fn) { if (id && this.obj(id)?.action) this.notes.add('object ' + this.obj(id).action); return false; } return call(fn, rarg);
    };
    // A command addressed to an actor ("floyd, take board"): the actor's routine sees it first, as PERFORM did
    // for WINNER; an actor without an order branch lets the command fall through to the player, as in the original.
    const winner = this.getg('WINNER');
    if (winner && winner !== 'ADVENTURER' && objAction(winner, 'M-OBJECT')) return ctx;
    if (this.state.dead) return ctx;
    const v = this.inVehicle();
    if (v && objAction(v, 'M-BEG')) return ctx;
    if (this.state.dead) return ctx;
    const room = this.rules.rooms[this.state.here];
    if (room && call(room, 'M-BEG')) return ctx;
    if (this.state.dead) return ctx;
    // The PRE- routine of the verb's syntax runs next, before the objects see the command (PERFORM). It gets the real
    // ctx: PRE-TAKE's "take X from the thing it is in" clears PRSI, so the PRSI's own routine is then skipped.
    const pre = PRE_VERBS[verb];
    if (pre && pre(this, ctx)) return ctx;
    prsi = ctx.prsi;
    if (prsi && objAction(prsi, 'M-OBJECT')) return ctx;
    if (this.state.dead) return ctx;
    if (prso && objAction(prso, 'M-OBJECT')) return ctx;
    if (this.state.dead) return ctx;
    const fn = this.verbs[verb];
    if (!fn) { this.tell("I don't know how to do that."); ctx.fatal = true; return ctx; }
    fn(this, ctx);
    return ctx;
  }
  // What "take all" / "drop all" / "take all from X" would act on: loose takeable things here (or in the vehicle), the
  // unworn things carried, or the visible contents of an open container.
  allTargets(verb, from = null) {
    if (from) return this.seeInside(from) ? this.contents(from).filter(id => id !== 'ADVENTURER' && !this.fsetP(id, 'INVISIBLE') && this.fsetP(id, 'TAKEBIT')) : [];
    if (verb === 'DROP') return this.contents('ADVENTURER').filter(id => !this.fsetP(id, 'WORNBIT'));
    if (verb === 'EXAMINE') {   // "examine all": what is described here, and what you carry
      const { here, inVehicle } = this.sceneObjects();
      return [...here, ...inVehicle].filter(id => !this.fsetP(id, 'NDESCBIT') && !this.fsetP(id, 'INVISIBLE')).concat(this.contents('ADVENTURER'));
    }
    const { here, inVehicle } = this.sceneObjects();
    return here.concat(inVehicle).filter(id => this.fsetP(id, 'TAKEBIT') && !this.fsetP(id, 'NDESCBIT'));
  }
  // "take all" / "drop all" / "take all from box": one line per object, "name: reply", the way the original listed them.
  performAll(verb, from = null, except = []) {
    if (from && !this.seeInside(from)) { this.tell(`The ${this.name(from)} is closed.`); return { verb, fatal: true }; }
    const ids = this.allTargets(verb, from).filter(id => !except.includes(id));
    if (!ids.length) { this.tell(verb === 'DROP' ? "You're not carrying anything." : from ? `There's nothing in the ${this.name(from)} to take.` : verb === 'EXAMINE' ? 'There is nothing here to examine.' : 'There is nothing here to take.'); return { verb, fatal: true }; }
    const ctx = this.performList(verb, ids, from);
    // Round twelve (A2): "take all" takes what is loose, so anything standing inside an open container in the room --
    // the canteen left sitting in the kitchen dispenser -- was left behind without a word, and the only way to notice
    // was to re-read the room and spot what was still in it.
    if (verb === 'TAKE' && !from && !this.state.dead) {
      const left = new Map();
      for (const c of this.contents(this.state.here)) {
        if (c === 'ADVENTURER' || !this.seeInside(c)) continue;
        const kids = this.contents(c).filter(id => this.fsetP(id, 'TAKEBIT') && !this.fsetP(id, 'INVISIBLE') && !ids.includes(id));
        if (kids.length) left.set(c, kids);
      }
      for (const [c, kids] of left) this.tell(`(Still in the ${this.name(c)}: ${kids.map(id => this.name(id)).join(', ')}.)`);
    }
    return ctx;
  }
  // "take kit and towel": each object in turn, with the same "name: reply" lines.
  // A thing refused for weight gets only "Your load is too heavy." on its line; what to drop comes after the whole list,
  // against the load the list ended with (verbs.js ITAKE sets heavyInList). Worked out mid-list, the hint went stale as
  // soon as a later thing was taken ("take box and oil can", round seven).
  performList(verb, ids, prsi = null) {
    const ctx = { verb, fatal: false };
    this.heavyInList = [];
    for (const id of ids) {
      if (this.state.dead) break;
      const at = this.messages.length;
      this.perform(verb, id, prsi);
      if (this.messages.length > at) this.messages[at] = { ...this.messages[at], text: `${this.name(id)}: ${this.messages[at].text}` };
      else this.tell(`${this.name(id)}: Done.`);
    }
    const heavy = this.heavyInList.filter(id => !this.held(id)); this.heavyInList = null;
    if (heavy.length && !this.state.dead) {
      const hint = tooHeavy(this, heavy[0]).replace(/^Your load is too heavy\.\s*/, '');
      if (hint) this.tell(`(For the ${this.name(heavy[0])}: ${hint.charAt(0).toLowerCase() + hint.slice(1)})`);
    }
    return ctx;
  }
  verbIs(ctx, ...names) { return names.includes(ctx.verb); }
  doWalk(dir) { return this.perform('WALK', null, null, { dir }); }

  // One player turn: perform, then the room's M-END, then the clock, then time advances.
  dispatch(command) {
    if (command.verb === 'WAIT-FOR') return this.waitFor(command.key);
    this.messages = [];
    if (this.state.dead && command.verb === 'RESTORE' && !this.state.finished) { this.verbs.RESTORE(this, { verb: 'RESTORE' }); return this.messages; }   // FINISH: RESTORE
    if (this.state.dead) { this.tell(this.state.finished ? 'The game is over. Restart to play again.' : this.state.saveSlot ? 'You have died. Restart, or restore a saved game position, to play again.' : 'You have died, with no saved position to go back to. Restart to play again, and remember that SAVE costs no time.'); return this.messages; }
    // V-AGAIN ("again", "g"): replay the last command, unless an object in it has since vanished (ANYMORE).
    if (command.verb === 'AGAIN' && !command.prso) {
      const last = this.state.lastCommand;
      const gone = last && [last.prso, last.prsi].some(id => id && id !== 'PSEUDO-OBJECT' && this.objects[id] && this.loc(id) == null && this.objects[id].location !== 'GLOBAL-OBJECTS' && this.objects[id].location !== 'LOCAL-GLOBALS');
      const elsewhere = last && [last.prso, last.prsi].includes('PSEUDO-OBJECT') && last.pseudoRoom !== this.state.here;
      if (last && !gone && !elsewhere) command = { ...last, text: last.text };
    } else if (command.verb !== 'AGAIN') this.state.lastCommand = { ...command, pseudoRoom: this.state.here, pseudo: command.pseudo ?? this.state.pseudo };
    this.state.elapsed = C_ELAPSED_DEFAULT;
    const before = this.state.lastObject;
    if (command.number != null) this.setg('P-NUMBER', command.number);   // a number entry (dial, keyboard): the original parser's P-NUMBER
    if (command.pseudo) this.state.pseudo = command.pseudo;
    this.setg('WINNER', command.winner ?? 'ADVENTURER');
    const ctx = command.all ? this.performAll(command.verb, command.from ?? null, command.except ?? []) : command.prsos ? this.performList(command.verb, command.prsos) : this.perform(command.verb, command.prso, command.prsi, { dir: command.dir, text: command.text, topic: command.topic });
    this.setg('WINNER', 'ADVENTURER');
    // "it" follows the direct object unless a handler redirected it (THIS-IS-IT).
    if (command.prso && this.state.lastObject === before) this.state.lastObject = command.prso;
    if (!ctx.fatal && !this.state.dead) {
      this.roomAction(this.state.here, 'M-END');
      // MAIN-LOOP: INTERNAL-MOVES advances by C-ELAPSED before CLOCKER runs.
      this.state.time += this.state.elapsed;
      if (!this.state.dead) this.clocker();
      this.state.turn++;
      // MAIN-LOOP recomputes LIT every turn, so a light switched on where you stand takes effect at once.
      if (!this.state.dead) {
        const nowLit = this.lit();
        if (nowLit !== !!this.getg('LIT')) { this.setg('LIT', nowLit); if (nowLit) this.describe(true); }
      }
    }
    if (!this.state.dead) this.recordSeen();
    return this.messages;
  }
  start() {
    this.messages = [];
    this.tell('Another routine day of drudgery aboard the Stellar Patrol Ship Feinstein. This morning\'s assignment for a certain lowly Ensign Seventh Class: scrubbing the filthy metal deck at the port end of Level Nine. With your Patrol-issue self-contained multi-purpose all-weather scrub brush you shine the floor with a diligence born of the knowledge that at any moment dreaded Ensign First Class Blather, the bane of your shipboard existence, could appear.');
    this.crlf();
    this.look();
    this.recordSeen();
    return this.messages;
  }
  moveTime(dir) { return this.here().moveTime?.[dir] || DEFAULT_MOVE; }
  // Deliberate deviation (user decision, 2026-09-11, round eleven): the chronometer counts minutes (the source's own
  // comments: the long hall is 160 of them, the shuttle card lasts 80), and the survival clocks run on them rather
  // than on turns. Anything that spends a real amount of time now says so in hours, where a player can feel it.
  inHours(minutes) {
    const h = minutes / 60;
    if (h < 0.75) return 'less than an hour';
    if (h < 1.5) return 'about an hour';
    return `about ${Math.round(h)} hours`;
  }
  // Deliberate deviation (user decision, 2026-09-11, round seven): a "Wait for ..." button (rules.waitFor[key] =
  // { label, when(g) }) waits turn after turn, each an ordinary WAIT with its own text, while `when` holds, at most 12
  // turns. Every playtester counted blind waits on each elevator ride. The escape pod has none: its waits stay.
  waitFor(key) {
    const w = this.rules.waitFor?.[key], out = [];
    for (let i = 0; i < 12 && w?.when(this) && !this.state.dead; i++) out.push(...this.dispatch({ verb: 'WAIT' }));
    if (!out.length) out.push(...this.dispatch({ verb: 'WAIT' }));
    this.messages = out; return out;
  }
  // The part of the day, for views of the sky (the design packages' windows and exteriors): the shuttle calls it
  // evening after 6000 (SHUTTLE-ACTIVATE), and the hour before that is dusk. No text depends on it.
  dayPhase() { const t = this.state.time; return t > 6000 ? 'dark' : t >= 5000 ? 'crepuscular' : 'light'; }
  // Deliberate deviation (user decision, 2026-09-11, round seven): the status line names the part of the day, so the
  // shuttle's evening rule can be planned for underground too (the source only has the chronometer's bare number).
  // The same bands as dayPhase: morning and afternoon are light, dusk crepuscular, evening and night dark. Aboard the
  // Feinstein, before the pod lands, it keeps ship time ("This morning's assignment") and shows nothing.
  partOfDay() {
    if ((this.getg('TRIP-COUNTER') ?? 0) < 15) return null;
    const t = this.state.time;
    return t < 3500 ? 'morning' : t < 5000 ? 'afternoon' : t <= 6000 ? 'dusk' : t <= 7200 ? 'evening' : 'night';
  }

  // --- persistence ---------------------------------------------------------------------
  save() { return JSON.stringify(this.state); }
  load(json) { this.state = JSON.parse(json); }
  restart(seed) { this.state = this.initialState(seed ?? this.state.rng); this.rules.setup?.(this); }
}
