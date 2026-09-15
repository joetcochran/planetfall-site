// Hand-ported rules for the tower above the upper elevator: the Tower Core, the Helipad and the rusted
// helicopter on it, the Observation Deck, and the Comm Room with its playback button, enunciator panel and
// the coolant-system shutdown sign. Each block names the ZIL routine it ports (compone.zil / comptwo.zil /
// globals.zil / misc.zil / verbs.zil).
//
// Not redefined here because other modules already carry the tower branches: WINDOW-F and CONTROLS-F
// (kalamontee.js has the HELICOPTER branches), OCEAN-F (ship.js, complete), LIGHTS-F (connectors.js).
// STAIRS has no action routine in the source (there is no STAIRS-F); ship.js's STAIRS handler stands.
//
// COMM-SETUP (compone.zil) is called from I-RANDOM-INTERRUPTS in the source. ship.js ports only the
// explosion half of that interrupt, so this module redefines I-RANDOM-INTERRUPTS as a superset: ship's
// body first (so its random draws keep their order), then COMM-SETUP. It is also exported under
// helpers['COMM-SETUP'] for anyone who needs to re-seed the comm puzzle.
//
// depends on: CHEMICAL-FLUID-F (machine shop / lab area) is the routine that pours into the FUNNEL-HOLE,
// walks ORDER-LTBL / STEPS-TO-GO, sets COMM-FIXED or COMM-SHUTDOWN and prints describers.SHUTDOWN(g).
// ORDER-LTBL is stored 1-indexed (index 0 unused) so g.getg('ORDER-LTBL')[n] reads like <GET ,ORDER-LTBL n>.
import { YUKS } from '../engine/core.js';
import { interrupts as shipInterrupts } from './ship.js';

const here = (g, ...rooms) => rooms.includes(g.state.here);
const obj = ctx => ctx.rarg === 'M-OBJECT';
const is = (ctx, ...verbs) => verbs.includes(ctx.verb);

// The colour COND shared by COMM-ROOM-F (M-END) and CHEMICAL-FLUID-F, keyed by CHEMICAL-REQUIRED.
const CHEMICAL_COLORS = [null, 'red', 'blue', 'green', 'yellow', 'gray', 'brown', 'black'];
const chemicalColor = g => CHEMICAL_COLORS[g.getg('CHEMICAL-REQUIRED')] ?? '';

export const rooms = {
  // COMM-ROOM-F (compone.zil): M-LOOK renders from world.json (with the SHUTDOWN describer below). M-END, on the
  // turn you arrive and until the coolant system is fixed or shut down, names the light flashing on the
  // enunciator panel and arms I-UNENTER so the message repeats on the next visit.
  'COMM-ROOM'(g, ctx) {
    if (ctx.rarg === 'M-END' && !g.getg('COMM-FIXED') && !g.getg('COMM-SHUTDOWN') && g.getg('JUST-ENTERED')) {
      g.queue('I-UNENTER', -1);
      g.setg('JUST-ENTERED', false);
      g.tell('A ' + chemicalColor(g) + ' colored light is flashing on the enunciator panel.');
    }
    return false;
  },
  // TOWER-CORE, HELIPAD, HELICOPTER and OBSERVATION-DECK have no action routine; their LDESCs are in world.json.
};

export const objects = {
  // Deliberate deviation (user decision, 2026-09-10, round five): the funnel-shaped hole had no description.
  'FUNNEL-HOLE'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'EXAMINE')) return false;
    g.tell('It\'s a funnel-shaped opening in the send console, labelled "Kuulint Sistum Manyuuwul Oovuriid." Anything poured into it would run down into the machinery below.');
    return true;
  },
  // HELICOPTER-OBJECT-F (compone.zil): a local-global shared by the Helipad and the Helicopter room. Getting in
  // and out moves between the two rooms; the vehicle bit is never boarded.
  'HELICOPTER-OBJECT'(g, ctx) {
    if (!obj(ctx)) return false;
    // Deliberate deviation (user decision, 2026-09-10, round four): the source has no description ("nothing special");
    // this one is taken from the Helicopter room's own.
    if (is(ctx, 'EXAMINE')) { g.tell("It's a large vehicle with a lot of cargo space, covered with a thick layer of rust." + (here(g, 'HELIPAD') ? ' Several doors in its side stand open.' : '')); return true; }
    if (is(ctx, 'THROUGH', 'BOARD', 'WALK-TO')) {
      if (here(g, 'HELIPAD')) g.goto('HELICOPTER');
      else g.tell("You're in it!");
      return true;
    }
    if (is(ctx, 'EXIT', 'DROP', 'DISEMBARK')) {
      if (here(g, 'HELICOPTER')) g.goto('HELIPAD');
      else g.tell("You're not in it!");
      return true;
    }
    if (is(ctx, 'FLY')) {
      g.tell(here(g, 'HELICOPTER') ? 'The controls seem to be locked.' : "You're not even in it!");
      return true;
    }
    return false;
  },
  // PLAYBACK-BUTTON-F (compone.zil)
  'PLAYBACK-BUTTON'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'PUSH')) return false;
    g.tell('A voice fills the room ... the voice of the Feinstein\'s communications officer! "Stellar Patrol Ship Feinstein to planetside ... Please respond on frequency 48.5 ... SPS Feinstein to planetside ... Please come in ..." After a pause you hear the officer, in a quieter voice, say "Admiral, no response on any of the standard frequen..." The sentence is cut short by the sound of an explosion and a loud burst of static, followed by silence.');
    return true;
  },
};

// Room PSEUDO scenery routines (globals.zil) for the tower rooms.
// Deliberate deviation (user decision, 2026-09-11, round eight): two things the room text shows but the source gives no
// word for (typed "examine island" and "open door" in the helicopter both failed in round seven). The text describes
// only what the room description already says; it also gives the design packages something to draw from.
export const pseudoWords = {
  'OBSERVATION-DECK': [{ word: 'ISLAND', routine: 'ISLAND-PSEUDO' }, { word: 'ISLANDS', routine: 'ISLAND-PSEUDO' }],
  // Round ten: "a large vehicle with a lot of cargo space" and "search the cargo space" answered "You can't see any
  // cargo space here!", in a game that asks you to notice what the prose mentions. The text only restates the
  // description and the rust, and gives nothing away.
  HELICOPTER: [{ word: 'DOOR', routine: 'HELICOPTER-DOORS-PSEUDO' }, { word: 'DOORS', routine: 'HELICOPTER-DOORS-PSEUDO' },
    { word: 'CARGO', routine: 'HELICOPTER-CARGO-PSEUDO' }, { word: 'SPACE', routine: 'HELICOPTER-CARGO-PSEUDO' }, { word: 'BAY', routine: 'HELICOPTER-CARGO-PSEUDO' }],
};
export const pseudos = {
  'ISLAND-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'EXAMINE', 'LOOK-INSIDE')) return false;
    g.tell('From this height the whole island lies spread out below you: the dormitory section on the far side, the rest of the complex sprawling beneath the tower, and a ragged line of surf all around. Far to the east, about 20 kilometers away, a second island rises from the ocean, much like this one; you can just make out a few buildings on it.');
    return true;
  },
  'HELICOPTER-CARGO-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'EXAMINE', 'LOOK-INSIDE', 'SEARCH')) return false;
    g.tell('The cargo bay takes up most of the vehicle and is quite empty, its floor and ribs under the same thick layer of rust as everything else here.');
    return true;
  },
  'HELICOPTER-DOORS-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('The doors stand open, rusted solid on their tracks. Beyond them is the Helipad.'); return true; }
    if (is(ctx, 'OPEN')) { g.tell('They are already open.'); return true; }
    if (is(ctx, 'CLOSE')) { g.tell('The doors are rusted solid and won\'t budge.'); return true; }
    return false;
  },
  // FENCE-PSEUDO (Helipad). CLIMB-ON is what the parser gives "climb fence" (the source's CLIMB-FOO).
  'FENCE-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'CLIMB-UP', 'CLIMB-FOO', 'CLIMB-ON', 'LEAP')) return false;
    g.tell("You can't."); return true;
  },
  // LOCK-PSEUDO (Helicopter): the lock on the control panel.
  'LOCK-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'OPEN', 'UNLOCK')) return false;
    g.tell(ctx.prsi ? "That won't unlock it." : "But you don't have the orange key!"); return true;
  },
  // CABLES-PSEUDO (Comm Room)
  'CABLES-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE', 'FOLLOW')) { g.tell('These heavy cables merely run from the two consoles up into the ceiling.'); return true; }
    if (is(ctx, 'MUNG')) { g.jigsUp("So, that's what it's like to have twenty million volts run through your body!"); return true; }
    return false;
  },
  // ENUNCIATOR-PSEUDO (Comm Room)
  'ENUNCIATOR-PSEUDO'(g, ctx) {
    // Deliberate deviation (user decision, 2026-09-10, round five): the enunciator had no description ("nothing special"),
    // though its flashing colour is the coolant puzzle's clue.
    if (obj(ctx) && is(ctx, 'EXAMINE')) {
      const done = g.getg('COMM-FIXED') || g.getg('COMM-SHUTDOWN');
      g.tell("It's a panel of small coloured lights: red, blue, green, yellow, gray, brown and black. " + (done || !chemicalColor(g) ? 'All of them are dark.' : `The ${chemicalColor(g)} one is flashing.`));
      return true;
    }
    if (!obj(ctx) || !is(ctx, 'LOOK-INSIDE', 'PUSH', 'MOVE')) return false;
    g.tell(g.pickOne(YUKS)); return true;
  },
};

export const describers = {
  // SHUTDOWN (compone.zil): the send console's sign once the coolant system has been shut down. Returns the
  // text (quotes included) for the description tree; CHEMICAL-FLUID-F prints it inside its own sentence.
  SHUTDOWN() { return '"Kuulint Sistum Imbalins Kritikul -- Shuteeng Down Awl Sistumz."'; },
};

// RANDOMIZE-ORDER (compone.zil): fills ORDER-LTBL with the numbers 1..7 in a random order, redrawing duplicates.
function randomizeOrder(g) {
  const tbl = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let count = 1; count <= 7; count++) {
    const temp = g.random(7);
    if (tbl.includes(temp)) count--;
    else tbl[count] = temp;
  }
  g.setg('ORDER-LTBL', tbl);
}
// COMM-SETUP (compone.zil): "sets up comm system and laser values". Two or three chemicals must be poured in
// the order the table dictates; CHEMICAL-REQUIRED is the first of them.
function commSetup(g) {
  g.setg('OLD-SHOTS', 2 + g.random(3));
  g.setg('NEW-SHOTS', 20 + g.random(10));
  randomizeOrder(g);
  g.setg('STEPS-TO-GO', 1 + g.random(2));
  g.setg('CHEMICAL-REQUIRED', g.getg('ORDER-LTBL')[g.getg('STEPS-TO-GO') + 1]);
}
export const helpers = { 'COMM-SETUP': commSetup, 'RANDOMIZE-ORDER': randomizeOrder, 'CHEMICAL-COLOR': chemicalColor };

export const interrupts = {
  // I-RANDOM-INTERRUPTS (misc.zil): redefined as a superset of ship.js's port, adding the COMM-SETUP call.
  'I-RANDOM-INTERRUPTS'(g) { shipInterrupts['I-RANDOM-INTERRUPTS'](g); commSetup(g); },
  // I-UNENTER (compone.zil): armed every turn once the comm room has greeted you; re-arms the greeting as
  // soon as you are somewhere else.
  'I-UNENTER'(g) {
    if (!here(g, 'COMM-ROOM')) { g.setg('JUST-ENTERED', true); g.disable('I-UNENTER'); }
  },
  // I-ANNOUNCEMENT (comptwo.zil): queued by STATION-384-F once the computer is fixed. depends on: STATION-384-F (strip area)
  'I-ANNOUNCEMENT'(g) {
    g.tell('A recorded announcement blares from the public address system. "Revival procedure beginning. Cryo-chamber access from Project Control Office now open."', 'event');
  },
};

// Click-menu verbs (see parser.verbsFor). The helicopter's VEHBIT already offers Get in; Get out is added
// because the Helicopter room is not a vehicle the engine tracks.
export const menus = {
  'PLAYBACK-BUTTON': ['PUSH'],
  // The helicopter's locked panel: a mouse player gets the source's answer to OPEN/UNLOCK too ("But you don't have
  // the orange key!", LOCK-PSEUDO); round seven's click tester could not tell whether the key was wrong.
  'LOCK-PSEUDO': ['UNLOCK'],
  'HELICOPTER-DOORS-PSEUDO': ['OPEN', 'CLOSE'],
  'HELICOPTER-OBJECT': [{ verb: 'BOARD', when: g => here(g, 'HELIPAD') }, { verb: 'DISEMBARK', when: g => here(g, 'HELICOPTER') }],   // in from the Helipad, out from inside
};

// Verb defaults from verbs.zil that the tower needs and no other module provides.
export const verbs = {
  FLY(g) { g.tell('Humans are not usually equipped for flying.'); },   // V-FLY
};

// Parser phrases from syntax.zil: FLY and FLY OBJECT.
export const vocabulary = [
  ['fly', 'FLY', 2],
];

// Globals this module owns (compone.zil defaults). CHEMICAL-REQUIRED, STEPS-TO-GO and ORDER-LTBL are filled by
// COMM-SETUP on the first turn; OLD-SHOTS / NEW-SHOTS are the laser's and are only set there.
export function setup(g) {
  for (const [k, v] of Object.entries({ 'COMM-SHUTDOWN': false, 'COMM-FIXED': false, 'JUST-ENTERED': true })) g.setg(k, v);
  if (g.getg('CHEMICAL-REQUIRED') === undefined) g.setg('CHEMICAL-REQUIRED', 0);
  if (g.getg('STEPS-TO-GO') === undefined) g.setg('STEPS-TO-GO', 0);
  if (g.getg('ORDER-LTBL') === undefined) g.setg('ORDER-LTBL', [0, 0, 0, 0, 0, 0, 0, 0]);
}
