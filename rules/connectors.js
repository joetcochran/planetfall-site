// Hand-ported rules for the routine exits that join map regions, together with the rooms and objects
// on either side of each link that exist only to serve it:
//   - the long hall (Dorm Corridor to Corridor Junction);
//   - the ladder across the rift (Admin Corridor to Admin Corridor North), with the rift, the crevice
//     and the key in the damaged corridor south of it;
//   - the upper elevator (Elevator Lobby to Tower Core) and the lower elevator (Elevator Lobby to the
//     Waiting Area on the Kalamontee platform), their doors, call buttons, panel button and clocks;
//   - the reactor elevator door and button in Reactor Control;
//   - the cryo-elevator (ProjCon Office to the Cryo-Anteroom) and its button;
//   - the shuttle cars Alfie and Betty between the Kalamontee and Lawanda platforms: their cabins, control
//     cabins, door, lever, activation by card, the I-SHUTTLE trip clock and the arrival outcomes;
//   - the sealed micro-relay at the end of the strip (RELAY-EXIT-F), the only routine exit that never passes.
// With these, every routine exit in the source has a handler.
// Each block names the ZIL routine it ports (compone.zil / comptwo.zil / globals.zil / verbs.zil).
//
// The LADDER object itself (LADDER-F) is in kalamontee.js, where it starts; this module only reads
// LADDER-EXTENDED and LADDER-FLAG, which that module's setup() initialises. The card slot (SLOT-F) is
// also in kalamontee.js: it sets UPPER/LOWER-ELEVATOR-ON and queues the I-TURNOFF-* clocks ported here.
import { YUKS } from '../engine/core.js';
import { itake } from '../engine/verbs.js';

const HO_HUM = [" isn't notably helpful.", ' has no effect.', ' is as worthwhile as cleaning a Grotch cage.'];
const DOOR_CLOSED = 'The door is closed.';                                       // DOOR-CLOSED
const ELEVATOR_STARTS = 'The elevator door slides shut. After a moment, you feel a sensation of vertical movement.';   // ELEVATOR-STARTS
const ELEVATOR_LIGHT_OFF = 'A recording says "Elevator no longer enabled."';   // ELEVATOR-LIGHT-OFF
const elevatorDoorOpens = g => g.tell('The elevator door slides open.', 'event');   // ELEVATOR-DOOR-OPENS
// Deliberate deviation (user decision, 2026-09-10, round four): the ride's end is announced before the door opens; the
// click playtester waited two more turns not knowing the ride was over. Round six: it also says which side the door is
// on (south in the upper car, north in the lower), since the typed playtester walked into a wall getting out.
const elevatorArrives = (g, car, up) => { if (here(g, car)) g.tell(`The elevator comes to a stop at the ${up ? 'top' : 'bottom'} of the shaft. The door is on the ${car === 'UPPER-ELEVATOR' ? 'south' : 'north'} side.`, 'event'); };
const CANT_GO = "You can't go that way.";                                        // CANT-GO
const WRONG_CARD = 'A sign flashes "Inkorekt awtharazaashun kard...akses deeniid."';   // WRONG-CARD
const SHUTTLE_RECORDING = [null,
  'A recorded voice says "Shuttle controls are already activated."',
  'A recorded voice says "Use other control cabin. Control activation overridden."',
  'A recording of a deep male voice says "Shuttle controls activated."',
  'A recorded voice says "Shuttle controls are not currently activated."'];   // SHUTTLE-RECORDING-1..4
const SIGN_PASS = 'You pass a sign, surrounded by blinking red lights, which says ';   // SIGN-PASS
const ALFIE_CABINS = ['ALFIE-CONTROL-EAST', 'ALFIE-CONTROL-WEST'], BETTY_CABINS = ['BETTY-CONTROL-EAST', 'BETTY-CONTROL-WEST'];
const inAlfie = g => here(g, 'SHUTTLE-CAR-ALFIE', ...ALFIE_CABINS), inBetty = g => here(g, 'SHUTTLE-CAR-BETTY', ...BETTY_CABINS);

const here = (g, ...rooms) => rooms.includes(g.state.here);
const obj = ctx => ctx.rarg === 'M-OBJECT';
const is = (ctx, ...verbs) => verbs.includes(ctx.verb);
const D = (g, id) => g.name(id);
const hackHack = (g, str, id) => g.tell(str + D(g, id) + g.pickOne(HO_HUM));   // HACK-HACK

// Doors the routine exits check, so the scene draws a door panel and the exit menu offers Open/Close.
export const exitDoors = {
  'ELEVATOR-ENTER-F': (g, e) => e.direction === 'NORTH' ? 'UPPER-ELEVATOR-DOOR' : e.direction === 'SOUTH' ? 'LOWER-ELEVATOR-DOOR' : null,
  'ELEVATOR-EXIT-F': g => here(g, 'UPPER-ELEVATOR') ? 'UPPER-ELEVATOR-DOOR' : 'LOWER-ELEVATOR-DOOR',
  'OTHER-ELEVATOR-ENTER-F': 'LOWER-ELEVATOR-DOOR',
  'CRYO-EXIT-F': 'CRYO-ELEVATOR-DOOR',
};

export const exits = {
  // LONG-HALL-F (compone.zil): the walk takes 160 minutes either way (C-MOVE agrees on both rooms).
  'LONG-HALL-F'(g) {
    g.state.elapsed = 160;
    const toDorms = here(g, 'CORRIDOR-JUNCTION');
    g.tell('You walk down the long, featureless hallway for a long time. Finally, you see ' + (toDorms ? 'some doorways ahead...' : 'an intersection ahead...'));
    g.crlf();
    return toDorms ? 'DORM-CORRIDOR' : 'CORRIDOR-JUNCTION';
  },
  // LADDER-EXIT-F (compone.zil): passable only while the extended ladder spans the rift.
  'LADDER-EXIT-F'(g) {
    if (!g.getg('LADDER-FLAG')) { g.tell('The rift is too wide to jump across.'); return null; }
    g.state.elapsed = 33;
    g.tell('You slowly make your way across the swaying ladder. You can see sharp, pointy rocks at the bottom of the rift, far below...');
    g.crlf();
    return here(g, 'ADMIN-CORRIDOR-N') ? 'ADMIN-CORRIDOR' : 'ADMIN-CORRIDOR-N';
  },
  // ELEVATOR-ENTER-F (compone.zil): from the lobby, north into the upper elevator or south into the lower
  // one, only when that door is open and the car is at the lobby level.
  'ELEVATOR-ENTER-F'(g, dir) {
    if (dir === 'NORTH') { if (g.fsetP('UPPER-ELEVATOR-DOOR', 'OPENBIT') && !g.getg('UPPER-ELEVATOR-UP')) return 'UPPER-ELEVATOR'; g.tell(DOOR_CLOSED); return null; }
    if (dir === 'SOUTH') { if (g.fsetP('LOWER-ELEVATOR-DOOR', 'OPENBIT') && g.getg('LOWER-ELEVATOR-UP') === true) return 'LOWER-ELEVATOR'; g.tell(DOOR_CLOSED); return null; }
    return null;
  },
  // ELEVATOR-EXIT-F (compone.zil): where the open door lets you out depends on which end of the shaft the car is at.
  'ELEVATOR-EXIT-F'(g) {
    if (here(g, 'UPPER-ELEVATOR')) { if (g.fsetP('UPPER-ELEVATOR-DOOR', 'OPENBIT')) return g.getg('UPPER-ELEVATOR-UP') === true ? 'TOWER-CORE' : 'ELEVATOR-LOBBY'; g.tell(DOOR_CLOSED); return null; }
    if (here(g, 'LOWER-ELEVATOR')) { if (g.fsetP('LOWER-ELEVATOR-DOOR', 'OPENBIT')) return g.getg('LOWER-ELEVATOR-UP') === true ? 'ELEVATOR-LOBBY' : 'WAITING-AREA'; g.tell(DOOR_CLOSED); return null; }
    return null;
  },
  // OTHER-ELEVATOR-ENTER-F (compone.zil): into the lower elevator from the waiting area at the bottom of its shaft.
  'OTHER-ELEVATOR-ENTER-F'(g) {
    if (g.fsetP('LOWER-ELEVATOR-DOOR', 'OPENBIT') && !g.getg('LOWER-ELEVATOR-UP')) return 'LOWER-ELEVATOR';
    g.tell(DOOR_CLOSED); g.state.lastObject = 'LOWER-ELEVATOR-DOOR'; return null;   // THIS-IS-IT
  },
  // CRYO-EXIT-F (comptwo.zil)
  'CRYO-EXIT-F'(g) {
    if (g.fsetP('CRYO-ELEVATOR-DOOR', 'OPENBIT')) return g.getg('CRYO-SCORE-FLAG') ? 'CRYO-ANTEROOM' : 'PROJCON-OFFICE';
    g.tell(DOOR_CLOSED); return null;
  },
  // SHUTTLE-ENTER-F (globals.zil): Betty docks on the north side of either platform, Alfie on the south.
  'SHUTTLE-ENTER-F'(g, dir) {
    const alfie = g.getg('ALFIE-AT-KALAMONTEE'), betty = g.getg('BETTY-AT-KALAMONTEE');
    let ok = false;
    if (here(g, 'KALAMONTEE-PLATFORM')) ok = dir === 'NORTH' ? betty : dir === 'SOUTH' ? alfie : false;
    else if (here(g, 'LAWANDA-PLATFORM')) ok = dir === 'NORTH' ? !betty : dir === 'SOUTH' ? !alfie : false;
    if (ok) return dir === 'NORTH' ? 'SHUTTLE-CAR-BETTY' : 'SHUTTLE-CAR-ALFIE';
    g.tell(CANT_GO); return null;
  },
  // SHUTTLE-EXIT-F (globals.zil)
  'SHUTTLE-EXIT-F'(g) {
    if (here(g, 'SHUTTLE-CAR-ALFIE')) return g.getg('ALFIE-AT-KALAMONTEE') ? 'KALAMONTEE-PLATFORM' : 'LAWANDA-PLATFORM';
    if (here(g, 'SHUTTLE-CAR-BETTY')) return g.getg('BETTY-AT-KALAMONTEE') ? 'KALAMONTEE-PLATFORM' : 'LAWANDA-PLATFORM';
    return null;
  },
  // RELAY-EXIT-F (comptwo.zil): never passable; the relay is looked into, not entered.
  'RELAY-EXIT-F'(g) {
    g.tell(g.isIn('RELAY', g.state.here) ? 'The relay is sealed. Although you cannot enter it, you could look into it.' : 'You would slice yourself to ribbons on the shattered relay.');
    return null;
  },
};

export const rooms = {
  // ADMIN-CORRIDOR-F: the spanning ladder is always on your side of the rift. M-LOOK is in world.json.
  'ADMIN-CORRIDOR'(g, ctx) { if (ctx.rarg === 'M-ENTER' && g.getg('LADDER-FLAG')) g.move('LADDER', g.state.here); return false; },
  // ADMIN-CORRIDOR-N-F
  'ADMIN-CORRIDOR-N'(g, ctx) { if (ctx.rarg === 'M-ENTER' && g.getg('LADDER-FLAG')) g.move('LADDER', g.state.here); return false; },
  // ADMIN-CORRIDOR-S-F: a hint toward the key while it is still hidden in the crevice.
  'ADMIN-CORRIDOR-S'(g, ctx) {
    if (ctx.rarg === 'M-END' && g.fsetP('KEY', 'INVISIBLE') && g.prob(20)) { g.tell('You catch, out of the corner of your eye, a glint of light from the direction of the floor.'); g.setg('GLINT-SEEN', true); }
    return false;
  },
  // UPPER-ELEVATOR-F: M-LOOK is in world.json (with the door's DDESC); M-END is the intercom.
  'UPPER-ELEVATOR'(g, ctx) {
    if (ctx.rarg === 'M-END' && !g.fsetP('UPPER-ELEVATOR-DOOR', 'OPENBIT') && g.prob(10)) g.tell("Some innocuous Hawaiian music oozes from the elevator's intercom.");
    return false;
  },
  // ELEVATOR-LOBBY-F, LOWER-ELEVATOR-F and CRYO-ELEVATOR-F are M-LOOK only and render from world.json.
  // LAWANDA-PLATFORM-F (comptwo.zil): arriving at Lawanda for the first time arms the sickness warning
  // (survival.js reads SICKNESS-WARNING-FLAG). M-LOOK is in world.json.
  'LAWANDA-PLATFORM'(g) {
    if (!g.getg('LAWANDA-PLATFORM-FLAG')) { g.setg('LAWANDA-PLATFORM-FLAG', true); g.setg('SICKNESS-WARNING-FLAG', true); }
    return false;
  },
  // STRIP-NEAR-RELAY-F (comptwo.zil): the microbe follows you up the strip. depends on: MICROBE, NO-MICROBE, MICROBE-COUNTER (strip area)
  'STRIP-NEAR-RELAY'(g, ctx) {
    if (ctx.rarg === 'M-ENTER' && !g.getg('NO-MICROBE')) { g.move('MICROBE', g.state.here); g.setg('MICROBE-COUNTER', 0); g.tell('The microbe, writhing angrily, follows you northward.'); }
    return false;
  },
  // KALAMONTEE-PLATFORM-F, SHUTTLE-CAR-F and CONTROL-CABIN-F are M-LOOK only (CONTROL-CABIN-F through DESCRIBE-VIEW below).
};

export const objects = {
  // RIFT-F (compone.zil)
  RIFT(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'LEAP')) { g.jigsUp('You get a brief (but much closer) view of the sharp and nasty rocks at the bottom of the rift.'); return true; }
    if (is(ctx, 'PUT') && ctx.prsi === 'RIFT') {
      if (!g.held(ctx.prso) && itake(g, { ...ctx, silent: true }) !== true) return true;   // the PUT syntax takes the object first
      if (ctx.prso === 'LASER') g.disable('I-WARMTH');   // depends on: LASER, I-WARMTH (tool room)
      g.remove(ctx.prso);
      if (ctx.prso === 'SCRUB-BRUSH') g.tell('You watch with tremendous satisfaction as the brush is lost forever.');
      else g.tell(`The ${D(g, ctx.prso)} sails gracefully into the rift.`);
      return true;
    }
    if (is(ctx, 'EXAMINE', 'LOOK-INSIDE')) { g.tell('The rift is at least eight meters wide and more than thirty meters deep. The bottom is covered with sharp and nasty rocks.'); return true; }
    return false;
  },
  // GROUND-F (globals.zil): the floor, a global object. PUT X ON FLOOR drops it; sitting on it passes a little time;
  // in Admin Corridor South, examining it shows the crevice.
  GROUND(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'PUT', 'PUT-ON') && ctx.prsi === 'GROUND') { g.perform('DROP', ctx.prso); return true; }
    if (is(ctx, 'CLIMB-ON', 'BOARD')) { g.state.elapsed = 28; g.tell('You sit down on the floor. After a brief rest, you stand again.'); return true; }
    // Deliberate deviation (user decision, 2026-09-10): the source answers only EXAMINE here, and the typed playtester's
    // "search floor" after the glint got nothing. SEARCH and LOOK-UNDER give the same answer, and once the glint has been
    // seen while the key still lies hidden, the answer says where the glint comes from.
    if (is(ctx, 'EXAMINE', 'SEARCH', 'LOOK-UNDER') && here(g, 'ADMIN-CORRIDOR-S')) {
      g.tell('A narrow, jagged crevice runs across the floor.' + (g.getg('GLINT-SEEN') && !g.fsetP('KEY', 'TOUCHBIT') ? ' The glint seems to come from somewhere down inside it.' : ''));
      return true;
    }
    return false;
  },
  // CREVICE-F (compone.zil)
  CREVICE(g, ctx) {
    if (!obj(ctx)) return false;
    // Deliberate deviation (user decision, 2026-09-11, round six): "put bar in crevice" lowers the magnet in, as "get key
    // with bar" does; the source only knows ATTRACT / PUT-ON and answers "You can't do that.", which the typed
    // playtester took for a wrong idea rather than a wrong phrasing.
    if (is(ctx, 'PUT', 'PUT-ON') && ctx.prsi === 'CREVICE' && ctx.prso === 'MAGNET') { g.perform('ATTRACT', 'MAGNET', 'CREVICE'); return true; }
    if (is(ctx, 'REACH')) { g.tell('The crevice is too narrow to reach into.'); return true; }
    if (is(ctx, 'LOOK-INSIDE', 'EXAMINE', 'SEARCH')) {
      if (g.fsetP('KEY', 'TOUCHBIT')) g.tell('Nothing there but bunches of dust.');
      else { g.fclear('KEY', 'INVISIBLE'); g.tell('Lying at the bottom of the narrow crack, partly covered by layers of dust, is a shiny steel key!'); }
      return true;
    }
    return false;
  },
  // KEY-F (compone.zil): the key cannot be lifted out by hand; the magnet (tool room) fishes it out.
  KEY(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'TAKE', 'ZATTRACT', 'MOVE') && !g.fsetP('KEY', 'TOUCHBIT')) {
      if (ctx.prsi === 'PLIERS') g.tell('These are heavy-duty pliers, too large to reach into this narrow crack.');
      else if (ctx.prsi === 'MAGNET') g.perform('ATTRACT', 'MAGNET', 'KEY');   // depends on: MAGNET-F (tool room)
      else if (ctx.prsi) g.tell('Nice try.');
      else g.tell('Either the crevice is too narrow, or your fingers are too large.');
      return true;
    }
    if (is(ctx, 'PUT') && ctx.prsi === 'CREVICE') { g.tell("And you wonder why you're still only an Ensign Seventh Class?"); return true; }
    return false;
  },

  // UPPER-ELEVATOR-DOOR-F (compone.zil): the elevator doors only move by themselves.
  'UPPER-ELEVATOR-DOOR'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'OPEN')) { g.tell(g.fsetP('UPPER-ELEVATOR-DOOR', 'OPENBIT') ? "It's already open!" : "It won't budge."); return true; }   // ALREADY-OPEN
    if (is(ctx, 'CLOSE')) { g.tell(g.fsetP('UPPER-ELEVATOR-DOOR', 'OPENBIT') ? "You can't close it yourself." : 'It is closed!'); return true; }   // IS-CLOSED
    return false;
  },
  // LOWER-ELEVATOR-DOOR-F (compone.zil): "open" from either landing only counts when the car is on that side.
  'LOWER-ELEVATOR-DOOR'(g, ctx) {
    if (!obj(ctx)) return false;
    const open = g.fsetP('LOWER-ELEVATOR-DOOR', 'OPENBIT');
    const onThisSide = open && ((here(g, 'ELEVATOR-LOBBY') && g.getg('LOWER-ELEVATOR-UP') === true) || (here(g, 'WAITING-AREA') && !g.getg('LOWER-ELEVATOR-UP')));
    if (is(ctx, 'OPEN')) { g.tell(onThisSide ? "It's already open!" : "It won't budge."); return true; }
    if (is(ctx, 'CLOSE')) { g.tell(onThisSide ? "You can't close it yourself." : 'It is closed!'); return true; }
    return false;
  },
  // BLUE-ELEVATOR-BUTTON-F (compone.zil): calls the upper elevator down to the lobby.
  'BLUE-ELEVATOR-BUTTON'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'PUSH') || g.getg('UPPER-ELEVATOR-UP') !== true) return false;
    if (g.enabled('I-UPPER-ELEVATOR-ARRIVE')) g.tell('Patience, patience...');
    else { g.queue('I-UPPER-ELEVATOR-ARRIVE', g.random(20) + 40); g.tell('You hear a faint whirring noise from behind the blue door.'); }
    return true;
  },
  // RED-ELEVATOR-BUTTON-F (compone.zil): calls the lower elevator up to the lobby.
  'RED-ELEVATOR-BUTTON'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'PUSH') || g.getg('LOWER-ELEVATOR-UP')) return false;
    if (g.enabled('I-LOWER-ELEVATOR-ARRIVE')) g.tell('Patience, patience...');
    else { g.queue('I-LOWER-ELEVATOR-ARRIVE', g.random(40) + 80); g.tell('The red door begins vibrating a bit.'); }
    return true;
  },
  // ELEVATOR-BUTTON-F (compone.zil): the Up/Down panel inside either car. Needs the matching card in the slot.
  'ELEVATOR-BUTTON'(g, ctx) {
    if (!obj(ctx)) return false;
    // Deliberate deviation (user decision, 2026-09-10): "Nothing happens." alone left the click playtester guessing at
    // the fifth card slot; when no card has woken this car, add that the slot stays dark.
    const nothing = () => g.tell('Nothing happens.' + ((here(g, 'UPPER-ELEVATOR') && !g.getg('UPPER-ELEVATOR-ON')) || (here(g, 'LOWER-ELEVATOR') && !g.getg('LOWER-ELEVATOR-ON')) || here(g, 'REACTOR-ELEVATOR') ? ' The slot beside the buttons stays dark.' : ''));
    const start = (door, trip, ticks) => { g.tell(ELEVATOR_STARTS); g.fclear(door, 'OPENBIT'); g.setg('ELEVATOR-IN-TRANSIT', true); g.queue(trip, ticks); };
    const ready = (up, on, wantUp) => g.getg(up) === wantUp && g.getg(on) === true && !g.getg('ELEVATOR-IN-TRANSIT');
    if (is(ctx, 'PUSH-UP')) {
      if (here(g, 'LOWER-ELEVATOR') && ready('LOWER-ELEVATOR-UP', 'LOWER-ELEVATOR-ON', false)) start('LOWER-ELEVATOR-DOOR', 'I-LOWER-ELEVATOR-TRIP', 100);
      else if (here(g, 'UPPER-ELEVATOR') && ready('UPPER-ELEVATOR-UP', 'UPPER-ELEVATOR-ON', false)) start('UPPER-ELEVATOR-DOOR', 'I-UPPER-ELEVATOR-TRIP', 50);
      else nothing();
      return true;
    }
    if (is(ctx, 'PUSH-DOWN')) {
      if (here(g, 'LOWER-ELEVATOR') && ready('LOWER-ELEVATOR-UP', 'LOWER-ELEVATOR-ON', true)) start('LOWER-ELEVATOR-DOOR', 'I-LOWER-ELEVATOR-TRIP', 100);
      else if (here(g, 'UPPER-ELEVATOR') && ready('UPPER-ELEVATOR-UP', 'UPPER-ELEVATOR-ON', true)) start('UPPER-ELEVATOR-DOOR', 'I-UPPER-ELEVATOR-TRIP', 50);
      else nothing();
      return true;
    }
    if (is(ctx, 'PUSH')) { g.tell('You must specify whether you want to push the Up button or the Down button.'); return true; }
    return false;
  },
  // REACTOR-ELEVATOR-DOOR-F (compone.zil)
  'REACTOR-ELEVATOR-DOOR'(g, ctx) { if (obj(ctx) && is(ctx, 'OPEN', 'CLOSE')) { g.tell("It won't budge."); return true; } return false; },
  // DESK-F (compone.zil): the small and large office desks beyond the rift (admin-north). Opening and taking from
  // the drawer are the container defaults.
  'SMALL-DESK'(g, ctx) { if (obj(ctx) && is(ctx, 'SEARCH', 'EXAMINE')) { g.tell('The desk has a drawer which is currently ' + (g.fsetP('SMALL-DESK', 'OPENBIT') ? 'open' : 'closed') + '.'); return true; } return false; },
  'LARGE-DESK'(g, ctx) { if (obj(ctx) && is(ctx, 'SEARCH', 'EXAMINE')) { g.tell('The desk has a drawer which is currently ' + (g.fsetP('LARGE-DESK', 'OPENBIT') ? 'open' : 'closed') + '.'); return true; } return false; },
  // LIGHTS-F (globals.zil): a local-global referable in the elevators, the comm room and the computer room.
  LIGHTS(g, ctx) {
    if (obj(ctx) && is(ctx, 'EXAMINE') && here(g, 'COMPUTER-ROOM')) { g.tell('The red light would seem to indicate a malfunction in the computer.'); return true; }
    // Deliberate deviation (user decision, 2026-09-10, round five): the Comm Room's lights had no description.
    if (obj(ctx) && is(ctx, 'EXAMINE') && here(g, 'COMM-ROOM')) {
      const color = g.rules.helpers['CHEMICAL-COLOR']?.(g), done = g.getg('COMM-FIXED') || g.getg('COMM-SHUTDOWN');
      g.tell('The red light labelled "Tranzmishun Reeseevd" is blinking rapidly. ' + (done || !color ? "The enunciator panel's lights are all dark." : `On the enunciator panel, a ${color} light is flashing.`));
      return true;
    }
    return false;
  },

  // GLOBAL-SHUTTLE-F (globals.zil): "the shuttle car" as a thing to enter or leave.
  'GLOBAL-SHUTTLE'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'THROUGH', 'WALK-TO', 'BOARD')) { g.tell(inAlfie(g) || inBetty(g) ? 'You ARE in the shuttle car.' : "Use 'north' or 'south'."); return true; }
    if (is(ctx, 'EXIT', 'DISEMBARK', 'DROP')) {
      if (here(g, 'SHUTTLE-CAR-ALFIE')) g.doWalk('NORTH');
      else if (here(g, 'SHUTTLE-CAR-BETTY')) g.doWalk('SOUTH');
      else if (here(g, ...ALFIE_CABINS, ...BETTY_CABINS)) g.tell("You can't exit the shuttle car from here.");
      else g.tell("You're not in the shuttle car!");
      return true;
    }
    return false;
  },
  // SHUTTLE-DOOR-F (globals.zil): the control cabin door, invisible and open except while the car moves.
  'SHUTTLE-DOOR'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'OPEN')) return false;
    g.tell(g.getg('SHUTTLE-MOVING') ? 'A recorded voice says "Operator should remain in control cabin while shuttle car is between stations."' : "Are you sure it isn't?");
    return true;
  },
  // LEVER-F (globals.zil): up (+) accelerates, down (-) brakes, centre coasts. Each change wakes I-SHUTTLE next turn.
  LEVER(g, ctx) {
    if (!obj(ctx)) return false;
    const setting = g.getg('LEVER-SETTING'), on = g.getg('SHUTTLE-ON');
    // Round twelve (B4): the recorded refusal changes nothing, so it costs no turn.
    if (is(ctx, 'PUSH', 'PUSH-UP')) {
      if (!on) { g.tell(SHUTTLE_RECORDING[4]); ctx.fatal = true; }
      else if (setting === 1) g.tell('The lever is already in the upper position.');
      else if (setting === 0) { g.setg('LEVER-SETTING', 1); g.queue('I-SHUTTLE', 1); g.tell('The lever is now in the upper position.'); }
      else { g.setg('LEVER-SETTING', 0); g.tell('The lever is now in the central position.'); }
      return true;
    }
    // Deliberate deviation (user decision, 2026-09-12, round eleven): the lever's description says it "can be set at
    // a central position" and neither "central" nor "middle" nor "center" was a word, so the coasting position could
    // only be found by pushing and pulling at random. It is one step from either end, as the two branches below are.
    if (is(ctx, 'CENTER')) {
      if (!on) { g.tell(SHUTTLE_RECORDING[4]); ctx.fatal = true; }
      else if (setting === 0) g.tell('The lever is already in the central position.');
      else { g.setg('LEVER-SETTING', 0); g.queue('I-SHUTTLE', 1); g.tell('The lever is now in the central position.'); }
      return true;
    }
    if (is(ctx, 'PULL', 'PUSH-DOWN')) {
      if (!on) { g.tell(SHUTTLE_RECORDING[4]); ctx.fatal = true; }
      else if (setting === 1) { g.setg('LEVER-SETTING', 0); g.tell('The lever is now in the central position.'); }
      else if (setting === 0) {
        if (g.getg('SHUTTLE-VELOCITY') === 0) g.tell('The lever immediately pops back to the central position.');
        else { g.setg('LEVER-SETTING', -1); g.queue('I-SHUTTLE', 1); g.tell('The lever is now in the lower position.'); }
      } else g.tell('The lever is already in the lower position.');
      return true;
    }
    return false;
  },
  // RELAY-F (comptwo.zil). depends on: COMPUTER-FIXED (computer room)
  RELAY(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'EXAMINE', 'LOOK-INSIDE')) return false;
    g.tell('This is a vacuum-sealed micro-relay, encased in red translucent plastic.' + (g.getg('COMPUTER-FIXED') ? '' : ' Within, you can see that some sort of speck or impurity has wedged itself into the contact point of the relay, preventing it from closing. The speck, presumably of microscopic size, resembles a blue boulder to you in your current size.'));
    return true;
  },
};

// SHUTTLE-ACTIVATE (globals.zil): called by SLOT-F (kalamontee.js) when the shuttle card goes through a slot.
// Only the cabin facing the tunnel can be activated; the card lasts 80 minutes, extended while the car moves.
function shuttleActivate(g) {
  const h = g.state.here;
  if (!here(g, ...ALFIE_CABINS, ...BETTY_CABINS)) { g.tell(WRONG_CARD); return true; }
  if ((g.getg('ALFIE-BROKEN') && here(g, ...ALFIE_CABINS)) || (g.getg('BETTY-BROKEN') && here(g, ...BETTY_CABINS))) { g.tell('A garbled recording mentions that the shuttle car has undergone some damage and that the repair robot has been summoned.'); return true; }
  // Deliberate deviation (user decision, 2026-09-11, round eleven): the recording names the hours. The curfew is the
  // source's, but nothing in the game ever said the shuttle kept a schedule, so round eleven's click tester was
  // stranded on the Lawanda side at 6100 with the food on the other, and spent the rest of the day not knowing why.
  if (g.state.time > 6000) { g.setg('CURFEW-SEEN', true); g.tell('A recorded voice explains that using the shuttle car during the evening hours requires special authorization. It adds that the shuttle runs each day until 6000 on the standard chronometer, and that service resumes the following morning.'); return true; }   // INTERNAL-MOVES
  const atKal = here(g, ...ALFIE_CABINS) ? g.getg('ALFIE-AT-KALAMONTEE') : g.getg('BETTY-AT-KALAMONTEE');
  const facingTunnel = h.endsWith('EAST') ? atKal : !atKal;   // the east cabin leads out of Kalamontee, the west cabin out of Lawanda
  if (g.getg('SHUTTLE-ON')) g.tell(SHUTTLE_RECORDING[1]);
  else if (!facingTunnel) g.tell(SHUTTLE_RECORDING[2]);
  else { g.setg('SHUTTLE-ON', true); g.queue('I-TURNOFF-SHUTTLE', 80); g.tell(SHUTTLE_RECORDING[3]); }
  return true;
}
export const helpers = { 'SHUTTLE-ACTIVATE': shuttleActivate };
// A platform offers only the direction where a car is waiting (SHUTTLE-ENTER-F answers "You can't go that way." otherwise).
const carWaiting = (g, dir) => {
  const alfie = g.getg('ALFIE-AT-KALAMONTEE'), betty = g.getg('BETTY-AT-KALAMONTEE');
  if (here(g, 'KALAMONTEE-PLATFORM')) return dir === 'NORTH' ? !!betty : dir === 'SOUTH' ? !!alfie : true;
  if (here(g, 'LAWANDA-PLATFORM')) return dir === 'NORTH' ? !betty : dir === 'SOUTH' ? !alfie : true;
  return true;
};
// Inside a car the way out is only offered while its door is open (in transit it only answers "The door is closed.",
// and the player can't open it).
export const exitVisible = { 'SHUTTLE-ENTER-F': carWaiting, 'ELEVATOR-EXIT-F': g => g.fsetP(here(g, 'UPPER-ELEVATOR') ? 'UPPER-ELEVATOR-DOOR' : 'LOWER-ELEVATOR-DOOR', 'OPENBIT') };
// "Wait for the elevator" (core.waitFor): inside a moving car, or in the lobby while a car you called is on its way.
// The cryo-elevator too (user decision, 2026-09-11, round nine): its ride takes 100 time units, and round eight's
// testers waited and looked, unsure whether they were meant to act.
export const waitFor = {
  // Round twelve (A1): the test is the fuse's remaining tick, not whether it is enabled. A fuse that has fired keeps
  // its enabled flag and only drops its tick to zero, so "wait for the elevator" went on waiting after the door had
  // opened -- twelve turns spent for a three-turn ride, on a fever clock with no cure.
  cryo: { label: 'Wait for the elevator', when: g => here(g, 'CRYO-ELEVATOR') && g.tickOf('I-CRYO-ELEVATOR-ARRIVE') > 0 },
  elevator: { label: 'Wait for the elevator', when: g => (here(g, 'UPPER-ELEVATOR', 'LOWER-ELEVATOR') && !!g.getg('ELEVATOR-IN-TRANSIT'))
    || (here(g, 'ELEVATOR-LOBBY') && (g.tickOf('I-UPPER-ELEVATOR-ARRIVE') > 0 || g.tickOf('I-LOWER-ELEVATOR-ARRIVE') > 0)) },
};
// An elevator door panel reads open only when the door is open with the car at this landing (ELEVATOR-ENTER-F's test).
export const exitOpen = {
  'ELEVATOR-ENTER-F': (g, e) => e.direction === 'NORTH' ? g.fsetP('UPPER-ELEVATOR-DOOR', 'OPENBIT') && !g.getg('UPPER-ELEVATOR-UP') : g.fsetP('LOWER-ELEVATOR-DOOR', 'OPENBIT') && g.getg('LOWER-ELEVATOR-UP') === true,
  'OTHER-ELEVATOR-ENTER-F': g => g.fsetP('LOWER-ELEVATOR-DOOR', 'OPENBIT') && !g.getg('LOWER-ELEVATOR-UP'),
};

// DESCRIBE-SHUTTLE-TRIP (globals.zil)
function describeShuttleTrip(g) {
  const c = g.getg('SHUTTLE-COUNTER');
  g.tell('The shuttle car continues to move. The display ' + (g.getg('LEVER-SETTING') === 0 ? 'still reads ' : 'blinks, and now reads ') + g.getg('SHUTTLE-VELOCITY') + '.', 'event');
  if (c === 2) g.tell('You pass a sign which says "Limit 45."', 'event');
  if (c === 12) g.tell('The tunnel levels out and begins to slope upward. A sign flashes by which reads "Hafwaa Mark -- Beegin Deeseluraashun."', 'event');
  if (c === 20) g.tell(SIGN_PASS + '"15."', 'event');
  if (c === 21) g.tell(SIGN_PASS + '"10."', 'event');
  if (c === 22) g.tell(SIGN_PASS + '"5."', 'event');
  if (c === 23) g.tell('The shuttle car is approaching a brightly-lit area. As you near it, you make out the concrete platforms of a shuttle station.', 'event');
}
// DESCRIBE-SHUTTLE-ARRIVE (globals.zil): the outcome depends on the speed at the platform; either way the
// car ends up at the other station and the controls reset.
function describeShuttleArrive(g) {
  if (g.getg('SHUTTLE-COUNTER') !== 24) return;
  const v = g.getg('SHUTTLE-VELOCITY'), alfie = here(g, ...ALFIE_CABINS);
  if (v === 0) g.tell('The shuttle car glides into the station and comes to rest at the concrete platform. You hear the cabin doors slide open.', 'event');
  else if (v < 20) { g.setg(alfie ? 'ALFIE-BROKEN' : 'BETTY-BROKEN', true); g.tell('The shuttle car rumbles through the station and smashes into the wall at the far end. You are thrown forward into the control panel. Both you and the shuttle car produce unhealthy crunching sounds as the cabin doors creak slowly open.', 'event'); }
  else g.jigsUp("The shuttle car hurtles past the platforms and rams into the wall at the far end of the station. The shuttle car is destroyed, but you're in no condition to care.");
  g.setg('SHUTTLE-VELOCITY', 0); g.setg('SHUTTLE-MOVING', false); g.setg('SHUTTLE-COUNTER', 0); g.setg('LEVER-SETTING', 0); g.setg('SHUTTLE-ON', false);
  g.fset('SHUTTLE-DOOR', 'INVISIBLE'); g.fset('SHUTTLE-DOOR', 'OPENBIT'); g.disable('I-SHUTTLE');
  const flag = alfie ? 'ALFIE-AT-KALAMONTEE' : 'BETTY-AT-KALAMONTEE';
  g.setg(flag, !g.getg(flag));
}

export const interrupts = {
  // I-UPPER-ELEVATOR-ARRIVE / I-LOWER-ELEVATOR-ARRIVE (compone.zil): the called car reaches the lobby.
  'I-UPPER-ELEVATOR-ARRIVE'(g) {
    g.fset('UPPER-ELEVATOR-DOOR', 'OPENBIT'); g.setg('UPPER-ELEVATOR-UP', false); g.disable('I-UPPER-ELEVATOR-ARRIVE');
    if (here(g, 'ELEVATOR-LOBBY')) g.tell('The door at the north end of the room slides open.', 'event');
  },
  'I-LOWER-ELEVATOR-ARRIVE'(g) {
    g.fset('LOWER-ELEVATOR-DOOR', 'OPENBIT'); g.setg('LOWER-ELEVATOR-UP', true); g.disable('I-LOWER-ELEVATOR-ARRIVE');
    if (here(g, 'ELEVATOR-LOBBY')) g.tell('The door at the south end of the room slides open.', 'event');
  },
  // I-UPPER-ELEVATOR-TRIP / I-LOWER-ELEVATOR-TRIP (compone.zil): the ride ends at the other end of the shaft.
  'I-UPPER-ELEVATOR-TRIP'(g) { g.setg('UPPER-ELEVATOR-UP', g.getg('UPPER-ELEVATOR-UP') !== true); g.setg('ELEVATOR-IN-TRANSIT', false); g.fset('UPPER-ELEVATOR-DOOR', 'OPENBIT'); elevatorArrives(g, 'UPPER-ELEVATOR', g.getg('UPPER-ELEVATOR-UP')); elevatorDoorOpens(g); },
  'I-LOWER-ELEVATOR-TRIP'(g) { g.setg('LOWER-ELEVATOR-UP', g.getg('LOWER-ELEVATOR-UP') !== true); g.setg('ELEVATOR-IN-TRANSIT', false); g.fset('LOWER-ELEVATOR-DOOR', 'OPENBIT'); elevatorArrives(g, 'LOWER-ELEVATOR', g.getg('LOWER-ELEVATOR-UP')); elevatorDoorOpens(g); },
  // I-TURNOFF-UPPER-ELEVATOR / I-TURNOFF-LOWER-ELEVATOR (compone.zil): the card's enable times out, but never mid-ride.
  'I-TURNOFF-UPPER-ELEVATOR'(g) {
    if (g.getg('ELEVATOR-IN-TRANSIT')) { g.queue('I-TURNOFF-UPPER-ELEVATOR', 120); return; }
    g.setg('UPPER-ELEVATOR-ON', false); if (here(g, 'UPPER-ELEVATOR')) g.tell(ELEVATOR_LIGHT_OFF, 'event');
  },
  'I-TURNOFF-LOWER-ELEVATOR'(g) {
    if (g.getg('ELEVATOR-IN-TRANSIT')) { g.queue('I-TURNOFF-LOWER-ELEVATOR', 120); return; }
    g.setg('LOWER-ELEVATOR-ON', false); if (here(g, 'LOWER-ELEVATOR')) g.tell(ELEVATOR_LIGHT_OFF, 'event');
  },
  // I-REACTOR-DOOR-CLOSE (compone.zil): once due, waits every turn until you are out of the car, then shuts the door.
  'I-REACTOR-DOOR-CLOSE'(g) {
    g.queue('I-REACTOR-DOOR-CLOSE', -1);
    if (here(g, 'REACTOR-ELEVATOR')) return;
    g.fclear('REACTOR-ELEVATOR-DOOR', 'OPENBIT');
    if (here(g, 'REACTOR-CONTROL')) g.tell('The elevator door slides shut.', 'event');
    g.disable('I-REACTOR-DOOR-CLOSE');
  },
  // I-CRYO-ELEVATOR-ARRIVE (comptwo.zil)
  'I-CRYO-ELEVATOR-ARRIVE'(g) { g.fset('CRYO-ELEVATOR-DOOR', 'OPENBIT'); g.tell('The elevator door opens onto a room to the north.', 'event'); },
  // I-TURNOFF-SHUTTLE (globals.zil)
  'I-TURNOFF-SHUTTLE'(g) { if (g.getg('SHUTTLE-MOVING')) g.queue('I-TURNOFF-SHUTTLE', 80); else g.setg('SHUTTLE-ON', false); },
  // I-SHUTTLE (globals.zil): runs every turn once the lever is moved. The first tick starts the car; after that
  // the counter advances while the car moves, the lever changes the speed, and the 24th tick is the arrival.
  // (The source's "backward" branch is commented out in the ZIL and is not ported.)
  'I-SHUTTLE'(g) {
    g.queue('I-SHUTTLE', -1);
    const lever = g.getg('LEVER-SETTING');
    if (!g.getg('SHUTTLE-MOVING')) {
      g.setg('SHUTTLE-MOVING', true); g.fclear('SHUTTLE-DOOR', 'OPENBIT'); g.fclear('SHUTTLE-DOOR', 'INVISIBLE');
      let text = 'The control cabin door slides shut and the shuttle car begins to move ';
      if (lever === 1) { g.setg('SHUTTLE-VELOCITY', g.getg('SHUTTLE-VELOCITY') + 5); text += 'forward! The display changes to 5.'; }
      g.tell(text, 'event');
      return;
    }
    if (g.getg('SHUTTLE-VELOCITY') > 0) g.setg('SHUTTLE-COUNTER', g.getg('SHUTTLE-COUNTER') + 1);
    if (lever === 1) g.setg('SHUTTLE-VELOCITY', g.getg('SHUTTLE-VELOCITY') + 5);
    else if (lever === -1) {
      if (g.getg('SHUTTLE-VELOCITY') > 0) g.setg('SHUTTLE-VELOCITY', g.getg('SHUTTLE-VELOCITY') - 5);
      else { g.setg('LEVER-SETTING', 0); g.tell('The shuttle car comes to a stop and the lever pops back to the central position.', 'event'); }
    }
    if (g.getg('SHUTTLE-COUNTER') === 24) describeShuttleArrive(g);
    else if (g.getg('SHUTTLE-VELOCITY') > 0) describeShuttleTrip(g);
  },
};
export const describers = {
  // DESCRIBE-VIEW (globals.zil): what the control cabin window shows; also used by WINDOW-F (kalamontee.js).
  'DESCRIBE-VIEW'(g) {
    const alfie = g.getg('ALFIE-AT-KALAMONTEE'), betty = g.getg('BETTY-AT-KALAMONTEE');
    if ((here(g, 'ALFIE-CONTROL-WEST') && alfie) || (here(g, 'BETTY-CONTROL-WEST') && betty) || (here(g, 'ALFIE-CONTROL-EAST') && !alfie) || (here(g, 'BETTY-CONTROL-EAST') && !betty)) return 'a featureless concrete wall.';
    if (g.getg('SHUTTLE-MOVING') && g.getg('SHUTTLE-COUNTER') === 23) return 'parallel rails ending at a brightly-lit station ahead.';
    return 'parallel rails running along the floor of a long tunnel, vanishing in the distance.';
  },
};

// Deliberate deviation (user decision, 2026-09-12, round eleven): two words the shuttle's own control panel prints
// and the source never made into words. "A control panel contains a slot, a lever, and a display" -- and "display"
// was not in the dictionary, on the one panel in the game the player must operate precisely.
// Round twelve finishes the same thought: "center" and "middle" went in as verbs, so "center lever" worked, but the
// three phrasings a player actually reaches for -- "put lever in center position", "move lever to central position",
// "push lever to middle" -- still failed on the noun, in a tunnel, while accelerating past the posted speed limit.
// Round twelve (A6): the strip's east exit never passes -- the relay is looked into, not entered -- and carried no
// marker at all, while a shut door three rooms away writes "(door closed)" on its own exit. A label in parentheses is
// drawn as a state marker; anything else is drawn as a destination (rules.exitLabels, ship.js).
export const exitLabels = {
  'RELAY-EXIT-F': g => (g.isIn('RELAY', g.state.here) ? '(sealed)' : '(shattered)'),
  // The long hall is the one link in the game that costs three hours, and because its exit is a routine the compass
  // never learned to name either end of it: the walk you most want to recognise looked like the one place you had
  // never been.
  'LONG-HALL-F': g => {
    const to = here(g, 'CORRIDOR-JUNCTION') ? 'DORM-CORRIDOR' : 'CORRIDOR-JUNCTION';
    return g.state.rooms[to]?.touched ? g.name(to) : null;
  },
};

export const pseudoWords = Object.fromEntries(['ALFIE-CONTROL-EAST', 'ALFIE-CONTROL-WEST', 'BETTY-CONTROL-EAST', 'BETTY-CONTROL-WEST']
  .map(r => [r, [{ word: 'DISPLAY', routine: 'SHUTTLE-DISPLAY-PSEUDO' }, { word: 'READOUT', routine: 'SHUTTLE-DISPLAY-PSEUDO' },
    ...['CENTER', 'CENTRE', 'CENTRAL', 'MIDDLE', 'POSITION'].map(word => ({ word, routine: 'LEVER-POSITION-PSEUDO' }))]]));

// Room PSEUDO scenery routines (globals.zil) for the rooms this module owns. The parser resolves a room's
// pseudo word to PSEUDO-OBJECT and Game.perform dispatches here by routine name.
export const pseudos = {
  // The lever's three positions as a thing you can name. A phrase resolves here when every word of it belongs to this
  // routine, so "center position", "central position" and "middle" all arrive; the parser runs the indirect object's
  // routine before the direct one, so this is reached whatever verb was used to say it.
  'LEVER-POSITION-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE', 'READ')) {
      g.tell(`The lever is in the ${['lower', 'central', 'upper'][(g.getg('LEVER-SETTING') ?? 0) + 1]} position.`);
      return true;
    }
    if (ctx.prso == null || ctx.prso === 'LEVER' || ctx.prso === 'PSEUDO-OBJECT') { g.perform('CENTER', 'LEVER'); return true; }
    return false;
  },
  // The display always shows the speed: the room description reads it out whether or not the car is live ("currently
  // reads 0"), and the source has no EXAMINE for it, so there is no dark state to show (DR-083).
  'SHUTTLE-DISPLAY-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'EXAMINE', 'READ')) return false;
    g.tell(`The display reads ${g.getg('SHUTTLE-VELOCITY') ?? 0}.`);
    return true;
  },
  // REACTOR-BUTTON-PSEUDO: the button beside the reactor elevator door in Reactor Control.
  'REACTOR-BUTTON-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'PUSH')) return false;
    g.fset('REACTOR-ELEVATOR-DOOR', 'OPENBIT'); g.queue('I-REACTOR-DOOR-CLOSE', 30);
    g.tell('The metal doors slide open, revealing a small room to the east.'); return true;
  },
  // DIAGRAM-PSEUDO (Reactor Control)
  'DIAGRAM-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'READ')) { g.tell("Not unless you've taken a special twelve-year course in ninth-order molecular physics."); return true; } return false; },
  // CRYO-BUTTON-PSEUDO: the one button in the cryo-elevator. depends on: I-CHASE-SCENE (bio lab sequence)
  'CRYO-BUTTON-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'PUSH')) return false;
    if (!g.getg('CRYO-SCORE-FLAG')) {
      g.queue('I-CRYO-ELEVATOR-ARRIVE', 100); g.disable('I-CHASE-SCENE'); g.fclear('CRYO-ELEVATOR-DOOR', 'OPENBIT');
      g.setg('CRYO-SCORE-FLAG', true); g.state.score += 5;
      g.tell('The elevator door closes just as the monsters reach it! You slump back against the wall, exhausted from the chase. The elevator begins to move downward.'); return true;
    }
    if (g.fsetP('CRYO-ELEVATOR-DOOR', 'OPENBIT')) {
      g.jigsUp("Stunning. After days of surviving on a hostile, plague-ridden planet, solving several of Infocom's toughest puzzles, and coming within one move of completing Planetfall, you blow it all in one amazingly dumb input.\n\nThe doors close and the elevator rises quickly to the top of the shaft. The doors open, and the mutants, which were waiting impatiently in the ProjCon Office for just such an occurence, happily saunter in and begin munching."); return true;
    }
    return false;
  },
  // NEAR-BOOTH-PSEUDO (Elevator Lobby): the booth seen from outside.
  'NEAR-BOOTH-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'DROP', 'EXIT', 'DISEMBARK')) { g.tell("You're not in the booth!"); return true; }
    if (is(ctx, 'THROUGH', 'BOARD', 'WALK-TO')) { g.doWalk('IN'); return true; }
    return false;
  },
  // WALKWAY-PSEUDO (Dorm Corridor, Corridor Junction)
  'WALKWAY-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE', 'LAMP-ON')) { g.tell('The walkway, which hastened the trip down that long corridor, is no longer in service.'); return true; } return false; },
  // RUBBLE-PSEUDO (Admin Corridor)
  'RUBBLE-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'MOVE')) { g.tell(g.pickOne(YUKS)); return true; } return false; },
  // BENCH-PSEUDO (Waiting Area, Lawanda platform)
  'BENCH-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'CLIMB-ON', 'BOARD')) { g.tell('The benches look uncomfortable.'); return true; } return false; },
  // VOID-PSEUDO (Strip Near Relay): things put into the void go off the strip. depends on: STRIP-F, ZAP (strip area)
  'VOID-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'PUT') && ctx.prsi === 'PSEUDO-OBJECT') { g.perform('THROW-OFF', ctx.prso, 'STRIP'); return true; }
    if (is(ctx, 'ZAP') && ctx.prso === 'LASER' && ctx.prsi === 'PSEUDO-OBJECT') { g.perform('ZAP', 'LASER'); return true; }
    return false;
  },
};

// Two-object click-menu entries (see parser.usesFor).
export const uses = [
  { verb: 'SPAN', prso: ['LADDER'], prsi: ['RIFT'], label: 'Put across rift', when: g => !!g.getg('LADDER-EXTENDED') && !g.getg('LADDER-FLAG') },   // extended, and not already across
  { verb: 'ZATTRACT', prso: ['KEY'], prsi: ['MAGNET'], label: 'Take with magnet', when: g => !g.held('KEY') },
];

// Click-menu verbs for objects whose traits alone would not offer them (see parser.verbsFor).
const never = () => false;
export const menus = {
  // Round twelve (A5): the relay's own refusal says "you could look into it" and its menu offered only Examine.
  // RELAY-F answers both (they print the same thing), so the verb the game names is now on the list.
  RELAY: [{ verb: 'LOOK-INSIDE' }],
  // The elevator doors only move by themselves ("You can't close it yourself." / "It won't budge."): no Open or Close entry.
  'UPPER-ELEVATOR-DOOR': [{ verb: 'OPEN', when: never }, { verb: 'CLOSE', when: never }], 'LOWER-ELEVATOR-DOOR': [{ verb: 'OPEN', when: never }, { verb: 'CLOSE', when: never }], 'REACTOR-ELEVATOR-DOOR': [{ verb: 'OPEN', when: never }, { verb: 'CLOSE', when: never }],
  // The cryo-elevator's door has no DOORBIT: it opens itself on arrival, and OPEN gets V-OPEN's "You must be very clever".
  'CRYO-ELEVATOR-DOOR': [{ verb: 'OPEN', when: never }, { verb: 'CLOSE', when: never }],
  'ELEVATOR-BUTTON': ['PUSH-UP', 'PUSH-DOWN'],
  'BLUE-ELEVATOR-BUTTON': ['PUSH'],
  'RED-ELEVATOR-BUTTON': ['PUSH'],
  LEVER: ['PUSH', 'PULL', 'CENTER'],
  // No "Get in" on the shuttle car (round five): at a platform it answers "Use 'north' or 'south'." and in a cabin "You ARE
  // in the shuttle car."; the exits carry you in. Get out only in the car itself.
  'GLOBAL-SHUTTLE': [{ verb: 'BOARD', when: never }, { verb: 'DISEMBARK', when: g => g.state.here.startsWith('SHUTTLE-CAR') }],
  // scenery words (keyed by PSEUDO routine; see ui.pseudoMenu)
  'REACTOR-BUTTON-PSEUDO': ['PUSH'],
  'CRYO-BUTTON-PSEUDO': ['PUSH'],
  'DIAGRAM-PSEUDO': ['READ'],

  'NEAR-BOOTH-PSEUDO': ['THROUGH'],
  'BENCH-PSEUDO': ['CLIMB-ON'],
};

// Verb defaults from verbs.zil that the objects above rely on and the engine does not provide.
export const verbs = {
  SPAN(g) { g.tell("You can't."); },                                   // V-SPAN
  ATTRACT(g) { g.tell('Nothing interesting happens.'); },              // V-ATTRACT
  ZATTRACT(g, ctx) { g.perform('ATTRACT', ctx.prsi, ctx.prso); },      // V-ZATTRACT: "take X with Y" is "attract Y to X"
  REACH(g, ctx) { g.tell(`There is ${g.contents(ctx.prso).length ? 'something' : 'nothing'} inside the ${D(g, ctx.prso)}.`); },   // V-REACH
  MOVE(g, ctx) { g.tell(g.fsetP(ctx.prso, 'TAKEBIT') ? `Moving the ${D(g, ctx.prso)} reveals nothing.` : `You can't move the ${D(g, ctx.prso)}.`); },   // V-MOVE
  // Deliberate deviation (user decision, 2026-09-12, round twelve): "press up" and "press down" with nothing named
  // reach the elevator's own panel. Every elevator description says "A control panel contains an Up button, a Down
  // button, and a slot", and the panel's own noun phrase came back as "What do you want to press?".
  'PUSH-UP'(g, ctx) { if (!ctx.prso) return pressPanel(g, 'PUSH-UP'); hackHack(g, 'Pushing up the ', ctx.prso); },       // V-PUSH-UP
  'PUSH-DOWN'(g, ctx) { if (!ctx.prso) return pressPanel(g, 'PUSH-DOWN'); hackHack(g, 'Pushing down the ', ctx.prso); },   // V-PUSH-DOWN
  // V-CENTER has no source routine: the word enters the dictionary only because the lever's own description offers a
  // central position. LEVER-F answers it; nothing else has a middle to be put in.
  CENTER(g, ctx) { g.tell(`There is no way to center ${g.article(ctx.prso)} ${g.name(ctx.prso)}.`); },
};

// "press up" / "press down" in a lift: the one panel that answers those verbs.
function pressPanel(g, verb) {
  if (g.scope().includes('ELEVATOR-BUTTON')) { g.perform(verb, 'ELEVATOR-BUTTON'); return; }
  g.tell(`What do you want to ${verb === 'PUSH-UP' ? 'push up' : 'push down'}?`);
}

// Parser phrases from syntax.zil: [phrase, VERB, needsObject, prep?]. Entries whose phrase already exists
// (put, throw, take, slide, ...) extend it with a preposition that selects this verb.
export const vocabulary = [
  ['put', 'SPAN', 1, 'across'], ['slide', 'SPAN', 1, 'across'],
  ['put', 'ATTRACT', 1, 'over|near'], ['take', 'ATTRACT', 1, 'over|near'],
  ['take', 'ZATTRACT', 1, 'with'], ['get', 'ZATTRACT', 1, 'with'], ['pick up', 'ZATTRACT', 1, 'with'], ['pull', 'ZATTRACT', 1, 'with'], ['rub', 'ZATTRACT', 1, 'with'], ['remove', 'ZATTRACT', 1, 'with'],
  ['throw', 'PUT', 1, 'in|into|on'],
  ['reach in', 'REACH', 1], ['reach into', 'REACH', 1],
  ['move', 'MOVE', 1], ['shift', 'MOVE', 1],
  ['push up', 'PUSH-UP', 2], ['press up', 'PUSH-UP', 2], ['push down', 'PUSH-DOWN', 2], ['press down', 'PUSH-DOWN', 2],
  ['pull up', 'PUSH-UP', 2], ['pull down', 'PUSH-DOWN', 2], ['move up', 'PUSH-UP', 2], ['move down', 'PUSH-DOWN', 2],
  ['center', 'CENTER', 1], ['centre', 'CENTER', 1], ['middle', 'CENTER', 1],
];


// Globals this module owns (compone.zil / comptwo.zil defaults). UPPER-ELEVATOR-UP starts T: the upper car
// waits at the tower; the lower car waits at the platform.
export function setup(g) {
  for (const k of ['LADDER-EXTENDED', 'LADDER-FLAG', 'COMPUTER-FIXED', 'SICKNESS-WARNING-FLAG']) if (g.getg(k) === undefined) g.setg(k, false);
  if (g.getg('NO-MICROBE') === undefined) g.setg('NO-MICROBE', true);
  if (g.getg('MICROBE-COUNTER') === undefined) g.setg('MICROBE-COUNTER', 0);
  for (const [k, v] of Object.entries({ 'LOWER-ELEVATOR-UP': false, 'UPPER-ELEVATOR-UP': true, 'ELEVATOR-IN-TRANSIT': false, 'LOWER-ELEVATOR-ON': false, 'UPPER-ELEVATOR-ON': false, 'CRYO-SCORE-FLAG': false,
    'ALFIE-AT-KALAMONTEE': true, 'BETTY-AT-KALAMONTEE': false, 'SHUTTLE-MOVING': false, 'SHUTTLE-ON': false, 'SHUTTLE-VELOCITY': 0, 'SHUTTLE-COUNTER': 0, 'LEVER-SETTING': 0, 'ALFIE-BROKEN': false, 'BETTY-BROKEN': false, 'LAWANDA-PLATFORM-FLAG': false })) g.setg(k, v);
}
