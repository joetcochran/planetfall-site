// Hand-ported rules for the lower Kalamontee complex (the mechanical wing off the admin corridor):
//   - Systems Monitors: the DESCRIBE-MONITORS wall (used by the room description and "examine monitors");
//   - Physical Plant: the catwalks and the equipment;
//   - the Machine Shop: the chemical dispenser, its spout, the nine coloured buttons that fill the flask
//     with a "kuulint", "katalist", "baas" or "asid", and Floyd's fun with the buttons;
//   - the Robot Shop's disassembled devices;
//   - Storage East: the oil can and the cardboard box;
//   - the Tool Room: the flask, the horseshoe magnet (which fishes the key out of the crevice in Admin
//     Corridor South and scrambles any card you carry), and the Acme portable laser with its dial, its
//     batteries, and the I-WARMTH clock;
//   - the off-stage chemical fluid, which does most of the game's dissolving, damaging and comm-room fixing;
//   - Sanfac E's toilet and the inside-the-booth scenery word shared by Booths 1, 2 and 3.
// Each block names the ZIL routine it ports (compone.zil / comptwo.zil / globals.zil / verbs.zil).
//
// The key and crevice (KEY-F, CREVICE-F) are in connectors.js; KEY-F performs ATTRACT MAGNET KEY, which
// MAGNET-F below answers. SET with a number reuses kalamontee.js's V-SET port: it parses the number, sets
// P-NUMBER and re-performs SET with INTNUM as the indirect object.
import { itake } from '../engine/verbs.js';

const here = (g, ...rooms) => rooms.includes(g.state.here);
const obj = ctx => ctx.rarg === 'M-OBJECT';
const is = (ctx, ...verbs) => verbs.includes(ctx.verb);
const D = (g, id) => g.name(id);
const notHolding = (g, id) => g.tell(`You're not holding the ${D(g, id)}.`);   // NOT-HOLDING
const noClose = g => g.tell("There's no way to close it.");                   // NO-CLOSE
const worthlessAction = g => g.tell('A worthless action -- and much too difficult for a poorly-written program like this one to handle.');   // WORTHLESS-ACTION
const alreadyBattery = g => g.tell("There's already a battery there.");      // ALREADY-BATTERY
const batteryNow = g => g.tell('The battery is now resting in the depression, attached to the laser.');   // BATTERY-NOW
const cubeSeems = ' Unfortunately, the cube seems to undergo some damage as well.';   // CUBE-SEEMS
const chemicalPours = (g, id) => g.tell(`The chemical pours all over the ${D(g, id)}, making quite a mess.`);   // CHEMICAL-POURS
const STRIP_DISSOLVES = 'The chemical drips all over the silicon strip, which immediately begins to dissolve. As it does so, you plunge into the void below.';   // STRIP-DISSOLVES (JIGS-UP)

// COLOR-LTBL (compone.zil), indexed by a button's C-MOVE property, and the buttons' C-MOVE values.
const COLOR_LTBL = [null, 'red', 'blue', 'green', 'yellow', 'gray', 'brown', 'black', 'clear', 'clear'];
const BUTTON_CMOVE = { 'RED-BUTTON': 1, 'BLUE-BUTTON': 2, 'GREEN-BUTTON': 3, 'YELLOW-BUTTON': 4, 'GRAY-BUTTON': 5, 'BROWN-BUTTON': 6, 'BLACK-BUTTON': 7, 'ROUND-WHITE-BUTTON': 8, 'SQUARE-WHITE-BUTTON': 9 };
// BEAM-COLOR (comptwo.zil), indexed by LASER-SETTING.
const BEAM_COLOR = [null, 'red', 'orange', 'yellow', 'green', 'blue', 'violet'];
// The cards I-MAGNET scrambles, in the order the routine checks them (only the first one held, each turn).
const CARDS = ['KITCHEN-CARD', 'SHUTTLE-CARD', 'TELEPORTATION-CARD', 'UPPER-ELEVATOR-CARD', 'LOWER-ELEVATOR-CARD', 'MINI-CARD', 'ID-CARD'];
// What the laser burns up (LASER-F).
const BURNABLE = ['TOWEL', 'BROCHURE', 'COMBINATION-PAPER', 'PRINT-OUT', 'LAB-UNIFORM', 'PATROL-UNIFORM', 'ID-CARD', 'KITCHEN-CARD', 'MINI-CARD', 'TELEPORTATION-CARD', 'SHUTTLE-CARD', 'UPPER-ELEVATOR-CARD', 'LOWER-ELEVATOR-CARD'];
const MUTANTS = ['RAT-ANT', 'TROLL', 'GRUE', 'TRIFFID'];

// DESCRIBE-MONITORS (compone.zil): the wall of monitors, green or malfunctioning depending on what has been fixed.
// depends on: DEFENSE-FIXED, COURSE-CONTROL-FIXED (Lawanda), COMM-FIXED (set by CHEMICAL-FLUID-F below)
function describeMonitors(g) {
  const d = !!g.getg('DEFENSE-FIXED'), c = !!g.getg('COURSE-CONTROL-FIXED'), m = !!g.getg('COMM-FIXED'), all = d && c && m;
  let s = 'The far wall is filled with a number of monitors. Of these, the ones labelled ';
  if (d) s += 'PLANATEREE DEFENS, ';
  if (c) s += 'PLANATEREE KORS KUNTROOL, ';
  if (m) s += 'KUMUUNIKAASHUNZ, ';
  s += 'LIIBREREE, REEAKTURZ, and LIIF SUPORT are green, but the one' + (all ? '' : 's') + ' labelled ';
  if (!d) s += 'PLANATEREE DEFENS, ';
  if (!c) s += 'PLANATEREE KORS KUNTROOL, ';
  if (!m) s += 'KUMUUNIKAASHUNZ, ';
  if (!all) s += 'and ';
  s += 'PRAJEKT KUNTROOL indicate' + (all ? 's' : '') + ' a malfunctioning condition.';
  return s;
}

export const describers = {
  'DESCRIBE-MONITORS': describeMonitors,
};

export const rooms = {
  // MACHINE-SHOP-F (compone.zil): M-LOOK is in world.json; M-END is Floyd playing with the buttons.
  // engine gap: MACHINE-SHOP-F M-LOOK's "Sitting under the spout is a <D ,SPOUT-PLACED>" is a
  // "value" segment with format "description" that describe.js prints as the raw object id (and the VOWELBIT
  // test on ,SPOUT-PLACED reads the global's name, not the object it holds).
  // engine gap: ITAKE (verbs.zil) resets SPOUT-PLACED to GROUND when the placed object is taken; verbs.js
  // itake does not, so M-END below resets it once the placed object has left the room.
  'MACHINE-SHOP'(g, ctx) {
    if (ctx.rarg !== 'M-END') return false;
    if (g.getg('SPOUT-PLACED') === 'GROUND' && g.isIn('FLOYD', g.state.here) && g.fsetP('FLOYD', 'RLANDBIT') && g.prob(15)) {
      g.setg('FLOYD-SPOKE', true);   // depends on: FLOYD-SPOKE (floyd.js)
      g.tell('Floyd pushes one of the dispenser buttons. Fluid pours from the spout and splashes across the floor. Floyd jumps up and down, giggling.');
    }
    return false;
  },
  // SYSTEMS-MONITORS-F is M-LOOK only and renders from world.json through DESCRIBE-MONITORS above.
};

// PRE-PUT-UNDER (verbs.zil), with the PUT syntax's TAKE flag: the object is taken first when it can be.
function prePutUnder(g, ctx) {
  if (!g.held(ctx.prso) && ctx.prso !== 'PSEUDO-OBJECT') itake(g, { ...ctx, silent: true });
  if (!g.held(ctx.prso)) { notHolding(g, ctx.prso); return true; }
  if (g.fsetP(ctx.prso, 'WORNBIT')) { g.tell("You'll have to take it off, first."); return true; }   // TAKE-IT-OFF
  return false;
}

// CHEM-BUTTON-F (compone.zil): shared by the nine dispenser buttons.
function chemButton(g, ctx, id) {
  if (!obj(ctx) || !is(ctx, 'PUSH')) return false;
  const placed = g.getg('SPOUT-PLACED');
  if (g.fsetP('CHEMICAL-DISPENSER', 'MUNGEDBIT')) g.tell('The machine coughs a few times, but nothing else happens.');
  else if (placed === 'FLASK') {
    if (g.isIn('CHEMICAL-FLUID', 'FLASK')) g.tell('Another dose of the chemical fluid pours out of the spout, splashes over the already-full flask, spills onto the floor, and dries up.');
    else {
      g.move('CHEMICAL-FLUID', 'FLASK'); g.setg('CHEMICAL-FLAG', BUTTON_CMOVE[id]);
      g.tell(`The flask fills with some ${COLOR_LTBL[BUTTON_CMOVE[id]]} chemical fluid. The fluid gradually turns milky white.`);
    }
  } else if (placed === 'CANTEEN' && g.fsetP('CANTEEN', 'OPENBIT')) g.tell('Chemical fluid gushes from the spout. Unfortunately, the mouth of the canteen is very narrow, and the fluid just splashes over it.');
  else {
    g.tell(`Some sort of chemical fluid pours out of the spout, spills all over the ${D(g, placed)}, and dries up.`);
    if ((id === 'ROUND-WHITE-BUTTON' || id === 'SQUARE-WHITE-BUTTON') && (g.fsetP(placed, 'ACIDBIT') || g.fsetP(placed, 'MUNGBIT'))) {
      g.setg('CHEMICAL-FLAG', 9); g.perform('POUR', 'CHEMICAL-FLUID', placed);
    }
  }
  return true;
}

// ZAP-COUNT (comptwo.zil): true when the laser has no shot left (the battery in it is spent, or there is none).
function zapCount(g) {
  if (g.isIn('OLD-BATTERY', 'LASER')) { if (g.getg('OLD-SHOTS') > 0) { g.setg('OLD-SHOTS', g.getg('OLD-SHOTS') - 1); return false; } return true; }
  if (g.isIn('NEW-BATTERY', 'LASER')) { if (g.getg('NEW-SHOTS') > 0) { g.setg('NEW-SHOTS', g.getg('NEW-SHOTS') - 1); return false; } return true; }
  return true;
}
const laserFeels = (g, s) => g.tell(`The laser feels ${s}, but that doesn't seem to affect its performance at all.`, 'event');   // LASER-FEELS
const laserCools = (g, s) => g.tell(`The laser has cooled, but it still feels ${s}.`, 'event');   // LASER-COOLS

export const objects = {
  // CHEMICAL-DISPENSER-F (compone.zil): only PUT-UNDER matters; the buttons and spout do the rest.
  'CHEMICAL-DISPENSER'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'PUT-UNDER') || ctx.prsi !== 'CHEMICAL-DISPENSER') return false;
    if (prePutUnder(g, ctx)) return true;
    if (g.getg('SPOUT-PLACED') === 'GROUND') { g.move(ctx.prso, g.state.here); g.tell(`The ${D(g, ctx.prso)} is now sitting under the spout.`); g.setg('SPOUT-PLACED', ctx.prso); }
    else g.tell(`The ${D(g, g.getg('SPOUT-PLACED'))} is already resting under the spout.`);
    return true;
  },
  // CHEM-BUTTON-F (compone.zil): KUULINTS 1-4, KATALISTS 1-3, ASID and BAAS.
  'RED-BUTTON': (g, ctx) => chemButton(g, ctx, 'RED-BUTTON'),
  'BLUE-BUTTON': (g, ctx) => chemButton(g, ctx, 'BLUE-BUTTON'),
  'GREEN-BUTTON': (g, ctx) => chemButton(g, ctx, 'GREEN-BUTTON'),
  'YELLOW-BUTTON': (g, ctx) => chemButton(g, ctx, 'YELLOW-BUTTON'),
  'GRAY-BUTTON': (g, ctx) => chemButton(g, ctx, 'GRAY-BUTTON'),
  'BROWN-BUTTON': (g, ctx) => chemButton(g, ctx, 'BROWN-BUTTON'),
  'BLACK-BUTTON': (g, ctx) => chemButton(g, ctx, 'BLACK-BUTTON'),
  'ROUND-WHITE-BUTTON': (g, ctx) => chemButton(g, ctx, 'ROUND-WHITE-BUTTON'),
  'SQUARE-WHITE-BUTTON': (g, ctx) => chemButton(g, ctx, 'SQUARE-WHITE-BUTTON'),

  // CHEMICAL-FLUID-F (compone.zil): the fluid lives in the flask; pouring it decides what dissolves.
  // depends on: SHUTDOWN describer (comm room), COURSE-CONTROL-FIXED and CUBE (Lawanda), MUNGED-TIME (survival.js)
  'CHEMICAL-FLUID'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EAT')) { g.jigsUp('Mmmmm....that tasted just like delicious poisonous chemicals!'); return true; }
    if (is(ctx, 'PUT') && ctx.prsi === 'CHEMICAL-FLUID') { g.perform('PUT', ctx.prso, 'FLASK'); return true; }
    if (is(ctx, 'THROW', 'POUR') && MUTANTS.includes(ctx.prsi)) {
      if (!g.held('FLASK')) { g.tell("You're not holding the flask."); return true; }
      g.remove('CHEMICAL-FLUID'); g.tell('The mutants lap up the chemical, howling with delight. One immediately grows three new mouths.'); return true;
    }
    if (!is(ctx, 'PUT', 'POUR')) return false;
    if (!g.held('FLASK')) { g.tell("You're not holding the flask."); return true; }
    if (ctx.prsi === 'CANTEEN') { worthlessAction(g); return true; }
    g.remove('CHEMICAL-FLUID');
    const prsi = ctx.prsi ?? 'GROUND';
    if (prsi === 'FUNNEL-HOLE') {
      if (g.getg('CHEMICAL-FLAG') === g.getg('CHEMICAL-REQUIRED')) {
        const steps = g.getg('STEPS-TO-GO') - 1;
        g.setg('CHEMICAL-REQUIRED', g.getg('ORDER-LTBL')[steps + 1]); g.setg('STEPS-TO-GO', steps);
        let text = 'The liquid disappears into the hole. The lights on the enunciator panel blink rapidly ';
        if (steps === 0) { g.setg('COMM-FIXED', true); g.state.score += 6; g.setg('CHEMICAL-REQUIRED', 10); text += 'and then go dark. The coolant system warning light goes off, and another flashes, indicating that the help message is now being sent.'; }
        else text += `and all go off except one, a ${COLOR_LTBL[g.getg('CHEMICAL-REQUIRED')]} light.`;
        g.tell(text);
      } else {
        g.setg('COMM-SHUTDOWN', true);
        if (g.getg('COMM-FIXED')) { g.state.score -= 6; g.setg('COMM-FIXED', false); }
        const shutdown = g.rules.describers?.SHUTDOWN;   // depends on: SHUTDOWN (comm room)
        if (!shutdown) g.notes.add('describer SHUTDOWN');
        g.tell('An alarm sounds briefly, and a sign flashes ' + (shutdown ? shutdown(g) : '') + ' A moment later, the lights in the room dim and the send console shuts down.');
      }
      return true;
    }
    if (g.getg('CHEMICAL-FLAG') === 8 || g.getg('CHEMICAL-FLAG') === 9) {
      if (g.fsetP(prsi, 'ACIDBIT')) {
        if (prsi === g.getg('SPOUT-PLACED')) g.setg('SPOUT-PLACED', 'GROUND');
        g.remove(prsi);
        let text = `The ${D(g, prsi)} dissolves right before your eyes!`;
        if (prsi === 'BAD-BEDISTOR' && !g.fsetP('BAD-BEDISTOR', 'TOUCHBIT')) { g.fset('CUBE', 'MUNGEDBIT'); text += cubeSeems; }
        else if (prsi === 'GOOD-BEDISTOR' && g.getg('COURSE-CONTROL-FIXED')) { g.fset('CUBE', 'MUNGEDBIT'); g.state.score -= 6; g.setg('COURSE-CONTROL-FIXED', false); text += cubeSeems; }
        g.tell(text); return true;
      }
      if (prsi === 'CREVICE' && !g.fsetP('KEY', 'TOUCHBIT')) {
        g.tell(g.fsetP('KEY', 'INVISIBLE') ? 'A puff of smoke rises from the crevice.' : 'Although the chemical has no effect on the crevice, it does seem to have dissolved the key that was lying in it.');
        g.remove('KEY'); g.fset('KEY', 'TOUCHBIT'); g.fclear('KEY', 'INVISIBLE'); return true;
      }
      if (prsi === 'HIGH-PROTEIN' || prsi === 'MEDICINE') { g.jigsUp('Unfortunately, those two liquids seem to react quite violently with each other. The resulting exothermic reaction might have been interesting to watch from a distance of, say, several hundred feet.'); return true; }
      if (prsi === 'ME' || prsi === 'ADVENTURER' || prsi === 'HANDS') { g.jigsUp('Have you always had this desire to see melting flesh?'); return true; }
      if (prsi === 'FLOYD' && g.fsetP('FLOYD', 'RLANDBIT')) { g.tell('Floyd yelps. "Hey, cut it out! That stuff burns!"'); return true; }
      if (prsi === 'MICROBE') { g.jigsUp('The microbe writhes in pain. ' + STRIP_DISSOLVES); return true; }
      if (prsi === 'STRIP' || prsi === 'RELAY') { g.jigsUp(STRIP_DISSOLVES); return true; }
      if (g.fsetP(prsi, 'MUNGBIT')) {
        g.fset(prsi, 'MUNGEDBIT');
        if (prsi === 'CHRONOMETER') g.setg('MUNGED-TIME', g.state.time);
        g.tell(`The ${D(g, prsi)} seems to undergo some damage as a result of your action.`);
        if (prsi === 'CUBE' && g.getg('COURSE-CONTROL-FIXED')) { g.setg('COURSE-CONTROL-FIXED', false); g.remove('GOOD-BEDISTOR'); g.state.score -= 6; g.tell('The bedistor also happens to dissolve.'); }
        return true;
      }
      chemicalPours(g, prsi); return true;
    }
    chemicalPours(g, prsi); return true;
  },

  // OIL-CAN-F (compone.zil): pouring the can is oiling whatever it is poured on (the floor by default).
  'OIL-CAN'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'POUR')) { g.perform('OIL', ctx.prsi ?? 'GROUND'); return true; }
    if (is(ctx, 'EMPTY')) { g.tell('Pretty much impossible -- you could only do that one drop at a time.'); return true; }
    return false;
  },
  // CARTON-F (compone.zil)
  CARTON(g, ctx) { if (obj(ctx) && is(ctx, 'CLOSE')) { noClose(g); return true; } return false; },
  // FLASK-F (compone.zil)
  FLASK(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('The flask has a wide mouth and looks large enough to hold one or two liters. It is made of glass, or perhaps some tough plastic' + (g.isIn('CHEMICAL-FLUID', 'FLASK') ? ', and is filled with a milky white fluid' : '') + '.'); return true; }
    if (is(ctx, 'CLOSE')) { noClose(g); return true; }
    if (is(ctx, 'EMPTY') && g.isIn('CHEMICAL-FLUID', 'FLASK') && ctx.prsi === 'FUNNEL-HOLE') { g.perform('POUR', 'CHEMICAL-FLUID', 'FUNNEL-HOLE'); return true; }
    return false;
  },
  // MAGNET-F (compone.zil): carrying it starts I-MAGNET; held near the key or the crevice it pulls the key out.
  MAGNET(g, ctx) {
    if (!obj(ctx)) return false;
    // Deliberate deviation (user decision, 2026-09-10, round four): the source has no description ("nothing special");
    // its own synonyms for the bar are MAGNET and HORSESHOE.
    if (is(ctx, 'EXAMINE')) { g.tell("It's a heavy bar of dark metal, bent into a U. A few metal filings cling to its ends."); return true; }
    if (is(ctx, 'TAKE')) { g.queue('I-MAGNET', -1); return false; }
    if (is(ctx, 'ATTRACT', 'PUT-ON')) {
      if (ctx.prso === 'MAGNET' && !g.isIn('MAGNET', 'ADVENTURER')) { notHolding(g, 'MAGNET'); return true; }
      if (g.fsetP('KEY', 'TOUCHBIT') && ctx.prsi === 'KEY') { g.move('KEY', 'ADVENTURER'); g.tell('The key jumps against the ends of the magnet and sticks there. Proud of your feat, you remove the key from the magnet.'); return true; }
      if (!g.fsetP('KEY', 'TOUCHBIT') && (ctx.prsi === 'KEY' || ctx.prsi === 'CREVICE')) {
        g.move('KEY', 'ADVENTURER'); g.fclear('KEY', 'INVISIBLE'); g.fclear('KEY', 'TRYTAKEBIT'); g.fset('KEY', 'TOUCHBIT');
        g.tell('With a spray of dust and a loud clank, a piece of metal leaps from the crevice and affixes itself to the magnet. It is a steel key! With a tug, you remove the key from the magnet.'); return true;
      }
      return false;
    }
    return false;
  },
  // LASER-DIAL-F (comptwo.zil): SET with INTNUM reads the number from P-NUMBER (see kalamontee.js V-SET).
  'LASER-DIAL'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'SET') && ctx.prsi === 'INTNUM') {
      const n = g.getg('P-NUMBER');
      if (g.fsetP('LASER-DIAL', 'MUNGEDBIT')) g.tell('The laser dial seems to have become damaged and will not turn.');
      else if (n === g.getg('LASER-SETTING')) g.tell("That's where it's set now!");
      else if (n > 6 || n === 0) g.tell('The dial can only be set from 1 to 6.');
      else { g.setg('LASER-SETTING', n); g.tell(`The dial is now set to ${n}.`); }
      return true;
    }
    if (is(ctx, 'EXAMINE')) { g.tell(`The dial is currently set to ${g.getg('LASER-SETTING')}.`); return true; }
    return false;
  },
  // LASER-F (comptwo.zil). depends on: SHOOT-SPECK, SHOOT-MICROBE (strip and relay area), MICROBE
  LASER(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'SET') && ctx.prsi === 'INTNUM') { g.perform('SET', 'LASER-DIAL', 'INTNUM'); return true; }
    if (is(ctx, 'EXAMINE')) {
      g.tell(`The laser, though portable, is still fairly heavy. It has a long, slender barrel and a dial with six settings, labelled "1" through "6." This dial is currently on setting ${g.getg('LASER-SETTING')}. There is a depression on the top of the laser which ` + (g.isIn('OLD-BATTERY', 'LASER') ? 'contains an old battery' : g.isIn('NEW-BATTERY', 'LASER') ? 'contains a new battery' : 'is empty') + '.');
      return true;
    }
    if (is(ctx, 'OPEN', 'CLOSE')) { g.tell("There doesn't seem to be any way to do that to this laser."); return true; }
    if (is(ctx, 'PUT')) {
      if (ctx.prso === 'OLD-BATTERY' || ctx.prso === 'NEW-BATTERY') {
        const other = ctx.prso === 'OLD-BATTERY' ? 'NEW-BATTERY' : 'OLD-BATTERY';
        if (g.isIn(other, 'LASER')) alreadyBattery(g);
        else {
          if (!g.held(ctx.prso) && itake(g, { ...ctx, silent: true }) !== true) return true;   // the PUT syntax takes the object first
          g.move(ctx.prso, 'LASER'); batteryNow(g);
        }
        return true;
      }
      if (ctx.prso !== 'LASER') { g.tell(`The ${D(g, ctx.prso)} doesn't fit the depression.`); return true; }
      return false;
    }
    if (is(ctx, 'ZAP')) {
      if (!g.isIn('LASER', 'ADVENTURER')) { notHolding(g, 'LASER'); return true; }
      if (!g.getg('LASER-SCORE-FLAG')) { g.setg('LASER-SCORE-FLAG', true); g.state.score += 2; }
      const prsi = ctx.prsi;
      if (prsi === 'LASER' || prsi === 'LASER-DIAL' || (prsi === 'OLD-BATTERY' && g.isIn('OLD-BATTERY', 'LASER')) || (prsi === 'NEW-BATTERY' && g.isIn('NEW-BATTERY', 'LASER'))) { g.tell("Sorry, the laser doesn't have a rubber barrel."); return true; }
      if (zapCount(g)) { g.tell('Click.'); return true; }
      if (g.fsetP('LASER', 'MUNGEDBIT')) { g.tell('The laser sparks a few times, whines, and then stops.'); return true; }
      g.queue('I-WARMTH', -1); g.setg('LASER-JUST-SHOT', true);
      if (prsi === 'SPECK' || prsi === 'MICROBE') {
        const name = prsi === 'SPECK' ? 'SHOOT-SPECK' : 'SHOOT-MICROBE', fn = g.rules.helpers?.[name];
        if (fn) fn(g); else g.notes.add('routine ' + name);
        return true;
      }
      if (prsi === 'ME' || prsi === 'HANDS' || prsi === 'ADVENTURER') { g.tell('Ouch! You managed to burn yourself nicely.'); return true; }
      let text = `The laser emits a narrow ${BEAM_COLOR[g.getg('LASER-SETTING')]} beam of light`;
      if (!prsi) text += '.';
      else if (BURNABLE.includes(prsi)) {
        g.remove(prsi);
        if (prsi === g.getg('SPOUT-PLACED')) g.setg('SPOUT-PLACED', 'GROUND');
        text += ` which strikes the ${D(g, prsi)}. The ${D(g, prsi)} bursts into flame, blinding you momentarily, and is quickly consumed.`;
      } else if (prsi === 'FLOYD' && g.fsetP('FLOYD', 'RLANDBIT')) text += ' which strikes Floyd. "Yow!" yells Floyd. He jumps to the other end of the room and eyes you warily.';
      else if (prsi === 'PSEUDO-OBJECT' && here(g, 'PROJCON-OFFICE')) text += ` which strikes the ${D(g, prsi)}. However, this doesn't seem to affect it.`;
      else text += ` which strikes the ${D(g, prsi)}. The ${D(g, prsi)} grows a bit warm, but nothing else happens.`;
      g.tell(text); return true;
    }
    if (is(ctx, 'DROP')) {
      g.disable('I-WARMTH');
      if (g.isIn('MICROBE', g.state.here) && g.getg('WARMTH-FLAG') > 7) { g.remove('LASER'); g.tell('The microbe rushes to envelop the laser. You hear a faint burp as the monster begins to look around for other morsels...'); return true; }
      return false;
    }
    return false;
  },
};

export const interrupts = {
  // I-MAGNET (compone.zil): runs every turn while the magnet is carried and scrambles the first card found on you.
  'I-MAGNET'(g) {
    if (!g.isIn('MAGNET', 'ADVENTURER')) { g.disable('I-MAGNET'); return; }
    for (const card of CARDS) if (g.held(card)) {
      if (!g.fsetP(card, 'SCRAMBLEDBIT')) {
        const warned = g.getg('MAGNET-WARNED') ?? [];   // deliberate deviation (round seven): one turn's grace per card
        if (!warned.includes(card)) { g.setg('MAGNET-WARNED', [...warned, card]); magnetWarning(g, card); break; }
        magnetNotice(g, card);
      }
      g.fset(card, 'SCRAMBLEDBIT'); break;
    }
  },
  // I-WARMTH (comptwo.zil): the laser warms by one step per shot and cools by one per idle turn.
  'I-WARMTH'(g) {
    if (g.getg('LASER-JUST-SHOT')) {
      g.setg('LASER-JUST-SHOT', false);
      const w = g.getg('WARMTH-FLAG') + 1; g.setg('WARMTH-FLAG', w);
      if (w === 3) laserFeels(g, 'slightly warm now');
      else if (w === 6) laserFeels(g, 'somewhat warm now');
      else if (w === 9) laserFeels(g, 'very warm now');
      else if (w === 12) laserFeels(g, 'quite hot');
      return;
    }
    if (g.getg('WARMTH-FLAG') === 0) { g.disable('I-WARMTH'); return; }
    const w = g.getg('WARMTH-FLAG') - 1; g.setg('WARMTH-FLAG', w);
    if (w === 12) laserCools(g, 'quite hot');
    else if (w === 9) laserCools(g, 'very warm');
    else if (w === 6) laserCools(g, 'somewhat warm');
    else if (w === 3) laserCools(g, 'slightly warm');
  },
};

// Room PSEUDO scenery routines (globals.zil) for the rooms this module owns.
export const pseudos = {
  // MONITORS-PSEUDO (Systems Monitors)
  'MONITORS-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE', 'READ')) { g.tell(describeMonitors(g)); return true; } return false; },
  // EQUIPMENT-PSEUDO (Systems Monitors, Physical Plant; also the infirmary, repair room and Physical Plant Two).
  // V-LAMP-ON / V-LAMP-OFF are exposed as TURN-ON / TURN-OFF by floyd.js.
  'EQUIPMENT-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE', 'RUB', 'LAMP-ON', 'LAMP-OFF', 'TURN-ON', 'TURN-OFF')) { g.tell("The equipment here is so complicated that you couldn't even begin to figure out how to operate it."); return true; } return false; },
  // CATWALK-PSEUDO (Physical Plant)
  'CATWALK-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'CLIMB-ON', 'CLIMB-UP', 'CLIMB-FOO')) { g.tell('The catwalks are too high for you to access.'); return true; } return false; },
  // TOILET-PSEUDO (Sanfac E; also Sanfac F)
  'TOILET-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('The fixtures are all dry and dusty.'); return true; }
    if (is(ctx, 'FLUSH')) { g.tell('The water seems to be turned off.'); return true; }
    return false;
  },
  // DEVICES-PSEUDO (Robot Shop)
  'DEVICES-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE')) { g.tell('They are components of disassembled robots, beyond repair.'); return true; } return false; },
  // CHEM-SPOUT-PSEUDO (Machine Shop): "put X under spout" is "put X under the dispenser".
  'CHEM-SPOUT-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'PUT-UNDER') && ctx.prsi === 'PSEUDO-OBJECT') { g.perform('PUT-UNDER', ctx.prso, 'CHEMICAL-DISPENSER'); return true; }
    if (is(ctx, 'LOOK-UNDER') && g.getg('SPOUT-PLACED')) { g.tell(`There is ${g.article(ctx.prso)} ${D(g, g.getg('SPOUT-PLACED'))} under the spout.`); return true; }   // A-AN reads PRSO
    return false;
  },
  // IN-BOOTH-PSEUDO (Booths 1, 2, 3 and the mini-booth): the booth from inside.
  'IN-BOOTH-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'THROUGH', 'BOARD', 'WALK-TO')) { g.tell("You're already in the booth!"); return true; }
    if (is(ctx, 'DROP', 'EXIT', 'DISEMBARK')) { g.doWalk('OUT'); return true; }
    return false;
  },
};

// Click-menu verbs for objects whose traits alone would not offer them (see parser.verbsFor).
export const menus = {
  'RED-BUTTON': ['PUSH'], 'BLUE-BUTTON': ['PUSH'], 'GREEN-BUTTON': ['PUSH'], 'YELLOW-BUTTON': ['PUSH'], 'GRAY-BUTTON': ['PUSH'],
  'BROWN-BUTTON': ['PUSH'], 'BLACK-BUTTON': ['PUSH'], 'ROUND-WHITE-BUTTON': ['PUSH'], 'SQUARE-WHITE-BUTTON': ['PUSH'],
  // Firing needs the laser in hand (PRE-ZAP). LASER-F answers OPEN and CLOSE with "There doesn't seem to be any way to
  // do that to this laser.", but the laser is an open container (for its battery), so the menu offered Close (round 15).
  LASER: [{ verb: 'ZAP', when: g => g.held('LASER') }, { verb: 'CLOSE', when: () => false }, { verb: 'OPEN', when: () => false }],
  FLASK: [{ verb: 'CLOSE', when: () => false }],                       // FLASK-F: "There's no way to close it." (NO-CLOSE)
  CARTON: [{ verb: 'CLOSE', when: () => false }],                     // CARTON-F: "There's no way to close it."
  'LASER-DIAL': [{ verb: 'SET', number: true }],                      // "Set to a number"
};

// Two-object click-menu entries (see parser.usesFor): the laser at its targets (V-ZAP), containers under the
// dispenser's spout (CHEMICAL-DISPENSER-F PUT-UNDER) and the flask's fluid into the comm room's funnel (CHEMICAL-FLUID-F).
export const uses = [
  { verb: 'ZAP', prso: ['LASER'], prsi: ['SPECK', 'MICROBE', 'RELAY'], label: 'Shoot {prsi}', when: g => g.held('LASER') },   // not Floyd: the one target a mouse player saw, one click from the others (typed still works)
  { verb: 'PUT-UNDER', prso: ['FLASK', 'CANTEEN'], prsi: ['CHEMICAL-DISPENSER'], label: 'Put under spout', when: (g, prso) => g.getg('SPOUT-PLACED') !== prso },
  { verb: 'POUR', prso: ['CHEMICAL-FLUID'], prsi: ['FUNNEL-HOLE'], label: 'Pour into {prsi}' },
  // Round ten (A3): the three tools a click player could hold but never aim. Each offers whatever is drawn in the
  // room; most targets refuse, and the refusal is the teaching a typed player already gets for free.
  { verb: 'ZAP', prso: ['LASER'], prsi: '*', label: 'Shoot {prsi}', when: g => g.held('LASER') },
  { verb: 'POUR', prso: ['CHEMICAL-FLUID'], prsi: '*', label: 'Pour on {prsi}' },
  { verb: 'POUR', prso: ['OIL-CAN'], prsi: '*', label: 'Oil {prsi}', when: g => g.held('OIL-CAN') },
];

// Verb defaults from verbs.zil that the objects above rely on and the engine does not provide.
export const verbs = {
  // V-ZAP, with PRE-ZAP folded in: "shoot X" with the laser in hand is "shoot laser at X".
  ZAP(g, ctx) {
    if (!ctx.prsi && ctx.prso !== 'LASER') {   // PRE-ZAP
      if (g.isIn('LASER', 'ADVENTURER')) { g.perform('ZAP', 'LASER', ctx.prso); return; }
      g.tell('You have nothing to shoot it with.'); return;
    }
    if (!g.held(ctx.prso)) return notHolding(g, ctx.prso);
    if (ctx.prso !== 'LASER') return g.tell("You can't shoot that.");
    if (!ctx.prsi) return g.tell('At what?');
    g.tell('Nothing happens.');
  },
  'PUT-UNDER'(g, ctx) { if (!prePutUnder(g, ctx)) g.tell("You can't do that."); },   // PRE-PUT-UNDER, V-PUT-UNDER
  'PUT-ON'(g, ctx) { g.perform(ctx.prso === 'MAGNET' || ctx.prso === 'LADDER' ? 'ATTRACT' : 'PUT', ctx.prso, ctx.prsi); },   // V-PUT-ON
  // V-OIL
  OIL(g, ctx) {
    if (!ctx.prsi) { if (g.isIn('OIL-CAN', 'ADVENTURER')) { g.perform('OIL', ctx.prso, 'OIL-CAN'); return; } return g.tell('Oil it with what?'); }
    if (ctx.prsi === 'OIL-CAN') return g.tell(ctx.prso === 'FLOYD' && g.fsetP('FLOYD', 'RLANDBIT') ? 'Floyd thanks you for your thoughtfulness.' : `The ${D(g, ctx.prso)} doesn't need oiling.`);
    g.tell(`You can't use ${g.article(ctx.prsi)} ${D(g, ctx.prsi)} as an oil can!`);
  },
  FLUSH(g, ctx) { g.tell(`Flush ${g.article(ctx.prso)} ${D(g, ctx.prso)}?`); },   // V-FLUSH
};

// Parser phrases from syntax.zil: [phrase, VERB, needsObject, prep?]. Entries whose phrase already exists
// (put, push, slide, empty, ...) extend it with a preposition that selects this verb.
// Deliberate deviation (user decision, 2026-09-11, round ten): the dispenser's two white buttons are described only
// by their labels -- one says "BAAS", the other "ASID" (MACHINE-SHOP description) -- but the source gave them no
// words beyond their colour and shape, so "press acid button" failed in a room whose whole puzzle is reading labels.
// The Comm Room's playback button is marked "Mesij Plaabak" and answers to "playback"; "message" belonged only to
// the screen, so "press message playback button" failed too.
// Deliberate deviation (user decision, 2026-09-18, round nineteen): the platform says "A large transport of some sort
// lies to the south" and the cabin is "the cabin of a large transport", but GLOBAL-SHUTTLE knows only CAR and SHUTTL
// (globals.zil 1547), so "enter the transport" failed on the game's own word.
export const objectWords = {
  'ROUND-WHITE-BUTTON': { adjectives: ['ASID', 'ACID'] },
  'SQUARE-WHITE-BUTTON': { adjectives: ['BAAS', 'BASE'] },
  'PLAYBACK-BUTTON': { adjectives: ['MESIJ', 'MESSAGE'] },
  'GLOBAL-SHUTTLE': { synonyms: ['TRANSPORT'] },
};

export const vocabulary = [
  // FIRE OBJECT WITH OBJECT = V-SZAP (syntax.zil 140, for all five synonyms): PRE-SZAP turns it round into ZAP.
  // Deliberate deviation (user decision, 2026-09-12, round twelve): "cut" and "slice" are the natural verbs for a
  // laser, and the source has neither, so "cut mural with laser" came back as an unknown word on a laser that does
  // exactly that. They join the shoot family and go through the same PRE-SZAP.
  ...['shoot', 'fire', 'zap', 'blast', 'burn', 'cut', 'slice'].map(w => [w, 'ZAP', 1, 'at|with', { with: 'SZAP' }]),
  ['shoot at', 'ZAP', 1], ['fire at', 'ZAP', 1],
  ['put', 'PUT-UNDER', 1, 'under|beneath'], ['push', 'PUT-UNDER', 1, 'under'], ['slide', 'PUT-UNDER', 1, 'under'], ['place', 'PUT-UNDER', 1, 'under'],
  ['put', 'PUT-ON', 1, 'on|onto'],
  ['oil', 'OIL', 1, 'with'], ['lubricate', 'OIL', 1, 'with'],
  ['flush', 'FLUSH', 1],
  ['empty', 'EMPTY', 1, 'in|into'],
  ['attract', 'ZATTRACT', 1, 'with'],
];

// RANDOMIZE-ORDER (compone.zil): a random permutation of the seven chemicals into ORDER-LTBL (1-based).
function randomizeOrder(g) {
  const order = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let count = 1; count <= 7; count++) {
    const temp = g.random(7);
    if (order.slice(1).includes(temp)) count--; else order[count] = temp;
  }
  g.setg('ORDER-LTBL', order);
}
// COMM-SETUP (compone.zil): the laser's shots and the comm room's chemical order. The source calls it from
// I-RANDOM-INTERRUPTS, which tower.js's superset of that interrupt does on the first turn.
function commSetup(g) {
  g.setg('OLD-SHOTS', 2 + g.random(3)); g.setg('NEW-SHOTS', 20 + g.random(10));
  randomizeOrder(g);
  g.setg('STEPS-TO-GO', 1 + g.random(2));
  g.setg('CHEMICAL-REQUIRED', g.getg('ORDER-LTBL')[g.getg('STEPS-TO-GO') + 1]);
}
// Deliberate deviation (user decision, 2026-09-10, round five): I-MAGNET spoils a card you carry along with the magnet
// (SCRAMBLEDBIT) without a word, and the source only reveals it at a slot ("Magnetik striip randumiizd"); the click
// playtester carried a dead kitchen card for many turns. Examining or reading a spoiled card now says so, and why.
// Deliberate deviation (user decision, 2026-09-11, round six): a sound card says it has a magnetic stripe, so a player
// who has not grown up with swipe cards has the clue the source's 1983 audience took for granted; the round-five click
// playtester only understood the lost kitchen card "because I happen to know that magnets wipe magnetic strips".
function scrambledCard(g, ctx) {
  if (ctx.rarg !== 'M-OBJECT' || !['EXAMINE', 'READ'].includes(ctx.verb)) return false;
  g.verbs[ctx.verb](g, ctx);
  g.tell(g.fsetP(ctx.prso, 'SCRAMBLEDBIT') ? `The magnetic stripe on the back looks smeared, as if the ${g.name('MAGNET')} had been stuck to it while you carried them together.`
    : 'A dark magnetic stripe runs along the back.');
  return true;
}
// Deliberate deviation (user decisions, 2026-09-11, rounds six and seven): the source's I-MAGNET spoils the first card it
// finds on its first turn, silently. Now the first turn a card and the magnet are carried together only warns (the
// magnet tugs at it); a card still carried with it on a later turn is spoiled, and that is said too. Round six's line
// came with the damage, and the typed playtester still lost two cards in two commands.
function magnetWarning(g, card) {
  g.tell(`The ${g.name('MAGNET')} swings toward the ${g.name(card)} and tugs at it: the bar is a strong magnet. Carried together any longer, it will smear the card's magnetic stripe.`, 'event');
}
function magnetNotice(g, card) {
  g.tell(`The ${g.name('MAGNET')} tugs toward the ${g.name(card)}, and for a moment the two cling together. When you pull them apart, the magnetic stripe on the card looks smeared.`, 'event');
}
for (const card of ['KITCHEN-CARD', 'SHUTTLE-CARD', 'TELEPORTATION-CARD', 'UPPER-ELEVATOR-CARD', 'LOWER-ELEVATOR-CARD', 'ID-CARD']) objects[card] = scrambledCard;   // MINI-CARD has its own routine (biolab.js), which calls the helper
export const helpers = { 'COMM-SETUP': commSetup, 'DESCRIBE-MONITORS': describeMonitors, 'SCRAMBLED-CARD': scrambledCard };

// Globals this module owns (compone.zil / comptwo.zil defaults; GO sets SPOUT-PLACED to GROUND), plus
// the other areas' flags it reads when no other module has set them.
export function setup(g) {
  for (const [k, v] of Object.entries({ 'SPOUT-PLACED': 'GROUND', 'CHEMICAL-FLAG': 0, 'LASER-SETTING': 5, 'WARMTH-FLAG': 0, 'LASER-JUST-SHOT': false, 'LASER-SCORE-FLAG': false })) g.setg(k, v);
  for (const [k, v] of Object.entries({ 'COMM-FIXED': false, 'COMM-SHUTDOWN': false, 'DEFENSE-FIXED': false, 'COURSE-CONTROL-FIXED': false, 'FLOYD-SPOKE': false, 'MUNGED-TIME': 0, 'P-NUMBER': 0 })) if (g.getg(k) === undefined) g.setg(k, v);
  for (const [k, v] of Object.entries({ 'OLD-SHOTS': 0, 'NEW-SHOTS': 0, 'CHEMICAL-REQUIRED': 0, 'STEPS-TO-GO': 0 })) if (g.getg(k) === undefined) g.setg(k, v);
  if (g.getg('ORDER-LTBL') === undefined) g.setg('ORDER-LTBL', [0, 0, 0, 0, 0, 0, 0, 0]);   // COMM-SETUP itself runs from I-RANDOM-INTERRUPTS on the first turn (tower.js)
}
