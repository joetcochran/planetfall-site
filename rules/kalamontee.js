// Hand-ported rules for the Kalamontee shore and the upper complex reached from the crag: the balcony,
// winding stair, courtyard and west wing, the rec area and the conference room behind its combination
// door, Booth 1, the mess corridor with its padlocked storage door, the mess hall and kitchen (card
// slot, dispenser, protein liquid), Storage West (can, ladder), and the dormitories with their bunks.
// Each block names the ZIL routine it ports (compone.zil / globals.zil / verbs.zil).
//
// Objects that ship.js also defines (WINDOW, CLIFF, CONTROLS) are redefined here as supersets of the
// ship branches, because rule modules merge by object id and this module loads after ship.js.
import { YUKS } from '../engine/core.js';
import { itake, tooHeavy } from '../engine/verbs.js';
import { resolve } from '../engine/parser.js';
import { describeRoom } from '../engine/describe.js';
import { podWindow } from './ship.js';   // one ladder for the pod's viewport, not two that drift (DR-112)

const HO_HUM = [" isn't notably helpful.", ' has no effect.', ' is as worthwhile as cleaning a Grotch cage.'];
const WHEEEEE = ["You've spent too much time among the Leaping Loon-toads of Leonia.", 'Having fun?', 'Wheeeeeee!!!'];
const WRONG_CARD = 'A sign flashes "Inkorekt awtharazaashun kard...akses deeniid."';
const ELEVATOR_ENABLED = 'A recorded voice chimes "Elevator enabled."';
const NOT_HUNGRY = "Thanks, but you're not hungry.";
const here = (g, ...rooms) => rooms.includes(g.state.here);
const obj = ctx => ctx.rarg === 'M-OBJECT';
const is = (ctx, ...verbs) => verbs.includes(ctx.verb);
const D = (g, id) => g.name(id);
// C-TICK of an interrupt: non-zero while it is counting down. (suggested core helper: g.tick(name))
const tick = (g, name) => g.state.queue.find(x => x.name === name)?.tick || 0;
// ROB (verbs.zil): move everything inside `from` into `to`. (suggested core helper: g.rob(from, to))
const rob = (g, from, to) => { for (const id of g.contents(from)) g.move(id, to); };
const notHolding = (g, id) => g.tell(`You're not holding the ${D(g, id)}.`);   // NOT-HOLDING
const hackHack = (g, str, id) => g.tell(str + D(g, id) + g.pickOne(HO_HUM));   // HACK-HACK
const worthlessAction = g => g.tell('A worthless action -- and much too difficult for a poorly-written program like this one to handle.'); // WORTHLESS-ACTION

export const objects = {
  // WINDOW-F (globals.zil): every room branch, so the ship's escape-pod window keeps working.
  WINDOW(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'LOOK-INSIDE')) {
      if (here(g, 'BIO-LOCK-EAST')) { g.tell('You can see a large laboratory, dimly illuminated. A blue glow comes from a crack in the northern wall of the lab. Shadowy, ominous shapes move about within the room.' + (!g.fsetP('MINI-CARD', 'TOUCHBIT') ? ' On the floor, just inside the door, you can see a magnetic-striped card.' : '')); return true; }
      if (here(g, 'BIO-LAB')) { g.tell('You see the Bio Lock.'); return true; }
      if (here(g, 'ALFIE-CONTROL-EAST', 'ALFIE-CONTROL-WEST', 'BETTY-CONTROL-EAST', 'BETTY-CONTROL-WEST')) {
        const fn = g.rules.describers?.['DESCRIBE-VIEW']; // depends on: DESCRIBE-VIEW (shuttle area)
        if (fn) g.tell('You see ' + fn(g)); else g.notes.add('describer DESCRIBE-VIEW');
        return true;
      }
      if (here(g, 'BALCONY')) { g.tell('Water. Lots and lots of water.'); return true; }
      if (here(g, 'HELICOPTER')) { g.tell('You see the helipad and the ocean beyond.'); return true; }
      if (here(g, 'ESCAPE-POD')) { g.tell(podWindow(g)); return true; }
      if (here(g, 'LARGE-OFFICE')) { g.tell('You can see the dormitories and other parts of the complex in the distance. Water is visible in every direction.'); return true; }
      return false;
    }
    if (is(ctx, 'THROUGH') && here(g, 'BALCONY')) { g.jigsUp('You slice yourself to ribbons on the broken windows and then plummet into the swirling ocean below. Very clever.'); return true; }
    if (is(ctx, 'OPEN')) { g.tell("This window doesn't open."); return true; }
    if (is(ctx, 'EXAMINE') && here(g, 'BALCONY')) { g.tell("They're shattered."); return true; }
    if (is(ctx, 'MUNG')) { g.tell(here(g, 'BALCONY') ? "They're already broken." : "It's made of tough Zynoid plastic."); return true; }
    return false;
  },
  // CLIFF-F (globals.zil)
  CLIFF(g, ctx) {
    if (!obj(ctx)) return false;
    if (here(g, 'WEST-WING')) {
      if (is(ctx, 'LEAP')) { g.jigsUp('Brilliant idea!'); return true; }
      if (is(ctx, 'THROW-OFF')) {
        if (!g.held(ctx.prso)) { notHolding(g, ctx.prso); return true; }   // the ZIL syntax requires the object to be held
        if (ctx.prso === 'LASER') g.disable('I-WARMTH');
        g.remove(ctx.prso); g.tell(`The ${D(g, ctx.prso)} falls into the ocean below.`); return true;
      }
      return false;
    }
    if (is(ctx, 'CLIMB-UP', 'CLIMB-ON')) { g.doWalk('UP'); return true; }
    if (is(ctx, 'CLIMB-DOWN')) { g.doWalk('DOWN'); return true; }
    return false;
  },
  // TABLES-F (globals.zil). The parser maps "put X on Y" to PUT, so PUT with the table as PRSI is treated as PUT-ON.
  TABLES(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'LOOK-UNDER') && here(g, 'MESS-HALL')) { g.tell("Wow!!! Under the table are three keys, a sack of food, a reactor elevator access pass, one hundred gold pieces ... Just kidding. Actually, there's nothing there."); return true; }
    if (is(ctx, 'PUT-ON', 'PUT') && ctx.prsi === 'TABLES') { g.tell('That would accomplish nothing useful.'); return true; }
    return false;
  },
  // SHELVES-F (globals.zil)
  SHELVES(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('The shelves are pretty dusty.'); return true; }
    if (is(ctx, 'PUT-ON', 'PUT') && ctx.prsi === 'SHELVES') { g.tell('That would be a waste of time.'); return true; }
    return false;
  },
  // CONTROLS-F (globals.zil): booth branch plus the ship's escape-pod branch.
  CONTROLS(g, ctx) {
    if (!obj(ctx)) return false;
    if (here(g, 'UPPER-ELEVATOR', 'LOWER-ELEVATOR', 'BOOTH-1', 'REACTOR-ELEVATOR', 'BOOTH-2', 'BOOTH-3')) {
      if (is(ctx, 'EXAMINE')) { g.tell('The control panel is a simple one, as described. Just a small slot and two buttons.'); return true; }
      return false;
    }
    if (is(ctx, 'RUB', 'MOVE', 'TURN', 'SET', 'TAKE', 'EXAMINE', 'PUSH', 'PULL')) {
      g.tell(here(g, 'HELICOPTER') ? 'The controls are covered and locked.' : here(g, 'ESCAPE-POD') ? 'The controls are entirely automated.' : "The controls are incredibly complicated and you shouldn't even be thinking about touching them.");
      return true;
    }
    if (here(g, 'HELICOPTER') && is(ctx, 'OPEN', 'UNLOCK')) { g.tell("You don't even have the orange key!"); return true; }
    return false;
  },
  // GLOBAL-DOORWAY-F (globals.zil 229-235): the generic doorway, portal or opening. Round nineteen: it had no routine,
  // so "go through the portal" fell to V-THROUGH's "You hit your head against the doorway".
  'GLOBAL-DOORWAY'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'THROUGH')) { g.tell('Use compass directions for movement.'); return true; }   // USE-DIRECTIONS
    if (is(ctx, 'OPEN', 'CLOSE')) { g.tell("It's just an opening; you can't open or close it."); return true; }
    if (is(ctx, 'LOOK-INSIDE')) { g.tell("Can't see much from here. Try going there."); return true; }
    return false;
  },
  // SLOT-F (globals.zil)
  SLOT(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'PUT') && ctx.prsi === 'SLOT') { g.tell("The slot is shallow, so you can't put anything in it. It may be possible to slide something through the slot, though."); return true; }
    if (is(ctx, 'EXAMINE')) { g.tell('The slot is about ten centimeters wide, but only about two centimeters deep. It is surrounded on its long sides by parallel ridges of metal.'); return true; }
    if (is(ctx, 'SLIDE') && ctx.prsi === 'SLOT') {
      const card = ctx.prso;
      // SLOT-F moves the card to your hands. Said when it came out of a pocket (the uniform's), which the typed
      // playtester only found out from the next inventory ("I never took it out").
      if (!g.isIn(card, 'ADVENTURER') && g.held(card)) g.tell(`(You take the ${D(g, card)} out of the ${D(g, g.loc(card))} first.)`);
      g.move(card, 'ADVENTURER');
      // Deliberate deviation (user decision, 2026-09-11, round ten): a card the magnet has smeared was ruined for
      // the rest of the game, and the game tracked it forever ("Magnetik striip randumiizd") without ever saying it
      // could not be undone. Against a single save slot that is a silent, unrecoverable state: round ten's click run
      // lost the shuttle access card to it and paid a 115-turn restore, fifty of its commands. The slot now
      // re-records the strip on the second try, which keeps the warning and the lesson but not the dead end.
      if (g.fsetP(card, 'SCRAMBLEDBIT')) {
        if (!g.getg('CARD-REMAGNETIZED-' + card)) {
          g.setg('CARD-REMAGNETIZED-' + card, true);
          g.tell('A sign flashes "Magnetik striip randumiizd...konsult Prajekt Handbuk abowt propur kaar uv awtharazaashun kardz."');
          return true;
        }
        g.fclear(card, 'SCRAMBLEDBIT');
        g.tell(`The slot holds on to the ${D(g, card)} for a moment. Something inside the machine hums, and a sign flashes "Striip riikoordid." The card comes back out with its stripe clean.`);
        return true;
      }
      if (card === 'KITCHEN-CARD') {
        if (!here(g, 'MESS-HALL')) { g.tell(WRONG_CARD); return true; }
        if (g.fsetP('KITCHEN-DOOR', 'OPENBIT')) { g.tell('Nothing happens.'); return true; }
        g.fset('KITCHEN-DOOR', 'OPENBIT'); g.queue('I-KITCHEN-DOOR-CLOSES', 50);
        g.tell('The kitchen door quietly slides open.'); floydRevealCard(g); return true;
      }
      // Deliberate deviation (user decision, 2026-09-11, round ten): the source lets the authorisation lapse after
      // 180 and 200 time units (I-TURNOFF-UPPER-ELEVATOR / -LOWER-ELEVATOR), so every trip costs the card again.
      // Both round-ten runs spent most of their commands on the round trip between the food at the west end and the
      // work at the east end, and the re-carding was pure tax on top of it. Once a card has enabled an elevator it
      // stays enabled; nothing else in the puzzle depends on it lapsing.
      if (card === 'UPPER-ELEVATOR-CARD') {
        if (!here(g, 'UPPER-ELEVATOR')) { g.tell(WRONG_CARD); return true; }
        g.setg('UPPER-ELEVATOR-ON', true); g.tell(ELEVATOR_ENABLED); floydRevealCard(g); return true;
      }
      if (card === 'LOWER-ELEVATOR-CARD') {
        if (!here(g, 'LOWER-ELEVATOR')) { g.tell(WRONG_CARD); return true; }
        g.setg('LOWER-ELEVATOR-ON', true); g.tell(ELEVATOR_ENABLED); return true;
      }
      if (card === 'TELEPORTATION-CARD') {
        if (!here(g, 'BOOTH-1', 'BOOTH-2', 'BOOTH-3')) { g.tell(WRONG_CARD); return true; }
        g.setg('TELEPORTATION-ON', true); g.setg('TELEPORTATION-USED', true); g.queue('I-TURNOFF-TELEPORTATION', 30); g.tell('Nothing happens for a moment. Then a light flashes "Redee."'); return true;
      }
      if (card === 'SHUTTLE-CARD') { const f = g.rules.helpers?.['SHUTTLE-ACTIVATE']; if (f) return f(g); g.notes.add('routine SHUTTLE-ACTIVATE'); return true; }   // SHUTTLE-ACTIVATE lives in connectors.js
      if (card === 'MINI-CARD') {
        if (!here(g, 'MINI-BOOTH')) { g.tell(WRONG_CARD); return true; }
        g.setg('MINI-ACTIVATED', true); g.queue('I-TURNOFF-MINI', 30); g.tell('A melodic high-pitched voice says "Miniaturization and teleportation booth activated. Please type in damaged sector number."'); return true; // depends on: I-TURNOFF-MINI (lab area)
      }
      if (card === 'ID-CARD') { g.tell(WRONG_CARD); return true; }
      return false;   // anything else slid through the slot falls to V-SLIDE, as in the original
    }
    return false;
  },
  // TELEPORTATION-BUTTON-1-F / -2-F / -3-F (globals.zil)
  'TELEPORTATION-BUTTON-1': (g, ctx) => teleport(g, ctx, 'BOOTH-1'),
  'TELEPORTATION-BUTTON-2': (g, ctx) => teleport(g, ctx, 'BOOTH-2'),
  'TELEPORTATION-BUTTON-3': (g, ctx) => teleport(g, ctx, 'BOOTH-3'),
  // COMBINATION-DIAL-F (compone.zil). SET with PRSI INTNUM reads the number from P-NUMBER.
  'COMBINATION-DIAL'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('The dial can be turned to any number between 0 and 1000.'); return true; }
    if (is(ctx, 'SET') && ctx.prsi === 'INTNUM') {
      const n = g.getg('P-NUMBER');
      if (g.fsetP('COMBINATION-DIAL', 'MUNGEDBIT')) g.tell("The dial has somehow become fused and won't move.");
      else if (n === g.getg('DIAL-NUMBER')) g.tell("That's what the dial is set to now!");
      else if (n === g.getg('NUMBER-NEEDED')) { g.setg('DIAL-NUMBER', 0); g.fset('CONFERENCE-DOOR', 'OPENBIT'); g.tell('The door swings open, and the dial resets to 0.'); }
      else if (n > 1000) g.tell('The dial cannot be turned to a number that high.');
      else { g.setg('DIAL-NUMBER', n); g.tell(`The dial is now set to ${n}.`); }
      return true;
    }
    return false;
  },
  // CONFERENCE-DOOR-F (compone.zil)
  'CONFERENCE-DOOR'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'OPEN')) {
      if (g.fsetP('CONFERENCE-DOOR', 'OPENBIT')) g.tell("It's already open!");
      else g.tell(here(g, 'REC-AREA') ? 'The door is locked. You probably have to turn the dial to some number to open it.' : 'The door seems to be locked from the other side.');
      return true;
    }
    if (is(ctx, 'CLOSE')) {
      if (g.fsetP('CONFERENCE-DOOR', 'OPENBIT')) { g.fclear('CONFERENCE-DOOR', 'OPENBIT'); g.tell('The door closes and you hear a click as it locks.'); }
      else g.tell('It is closed!');
      return true;
    }
    // Deliberate deviation (user decision, 2026-09-10, round four): the source has no description ("nothing special").
    if (is(ctx, 'EXAMINE')) { g.tell((here(g, 'REC-AREA') ? "It's a heavy door with a large combination dial set into it." : "It's a heavy door.") + ` It is ${g.fsetP('CONFERENCE-DOOR', 'OPENBIT') ? 'open' : 'closed'}.`); return true; }
    return false;
  },
  // STORAGE-WEST-DOOR-F (compone.zil)
  'STORAGE-WEST-DOOR'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'OPEN')) {
      if (g.fsetP('STORAGE-WEST-DOOR', 'OPENBIT')) g.tell("It's already open!");
      else if (g.getg('PADLOCK-REMOVED')) { g.fset('STORAGE-WEST-DOOR', 'OPENBIT'); g.tell('Opened.'); }
      else g.tell('The door cannot be opened until the padlock is removed.');
      return true;
    }
    if (is(ctx, 'CLOSE')) {
      if (g.fsetP('STORAGE-WEST-DOOR', 'OPENBIT')) { g.fclear('STORAGE-WEST-DOOR', 'OPENBIT'); g.tell('The door is now closed.'); }
      else g.tell('It is closed!');
      return true;
    }
    if (is(ctx, 'UNLOCK')) { g.tell("The door itself isn't locked." + (!g.fsetP('PADLOCK', 'OPENBIT') ? ' It is the padlock on the door which is locked.' : '')); return true; }
    return false;
  },
  // PADLOCK-F (compone.zil). The key lives in ADMIN-CORRIDOR-S (KEY-F is not ported here).
  PADLOCK(g, ctx) {
    if (!obj(ctx)) return false;
    if (here(g, 'BRIG')) { g.tell("You can't see or reach the lock from inside the cell."); return true; }
    if (is(ctx, 'OPEN-WITH') && ctx.prso === 'PADLOCK') { g.perform('UNLOCK', 'PADLOCK', ctx.prsi); return true; }
    if (is(ctx, 'UNLOCK', 'OPEN')) {
      if (!g.fsetP('PADLOCK', 'OPENBIT')) {
        if (!ctx.prsi) g.tell("You can't open it with your hands.");
        else if (ctx.prsi === 'KEY') {
          if (g.fsetP('PADLOCK', 'MUNGEDBIT')) g.tell('Tsk, tsk ... the padlock seems to be fused shut.');
          else { g.fset('PADLOCK', 'OPENBIT'); g.tell('The padlock springs open.'); }
        } else g.tell("That doesn't work.");
      } else g.tell('The padlock is already unlocked.');
      return true;
    }
    if (is(ctx, 'CLOSE', 'LOCK')) {
      if (g.fsetP('PADLOCK', 'OPENBIT')) { g.fclear('PADLOCK', 'OPENBIT'); g.tell('The padlock closes with a sharp click.'); }
      else g.tell('The padlock is already locked.');
      return true;
    }
    if (is(ctx, 'TAKE') && !g.getg('PADLOCK-REMOVED')) {
      if (g.fsetP('PADLOCK', 'OPENBIT')) {
        g.setg('PADLOCK-REMOVED', true); g.fclear('PADLOCK', 'TRYTAKEBIT'); g.fclear('PADLOCK', 'NDESCBIT');
        // Deliberate deviation (user decision, 2026-09-11, round seven): the source unhooks the padlock and then fails
        // the take with "Your load is too heavy.", which read as if the padlock were still on the door.
        if (g.weight('PADLOCK') + g.weight('ADVENTURER') > g.getg('LOAD-ALLOWED')) {
          g.tell('You lift the padlock off the hasp, but your load is too heavy to carry it as well, so you set it down on the floor.' + tooHeavy(g, 'PADLOCK').replace(/^Your load is too heavy\./, ''));
          ctx.fatal = true; return true;
        }
        return false;
      }
      g.tell('The padlock is locked to the door.'); return true;
    }
    if (is(ctx, 'MUNG')) { g.tell("And, as we go into the next round, it's Padlock 1, Adventurer 0..."); return true; }
    // Deliberate deviation (user decision, 2026-09-10, round four): the source has no description ("nothing special").
    if (is(ctx, 'EXAMINE')) {
      const open = g.fsetP('PADLOCK', 'OPENBIT');
      // Deliberate deviation (user decision, 2026-09-12, round eleven): a padlock the acid has fused says so. The
      // fusing is the source's (a MUNGBIT object takes MUNGEDBIT), and behind this door are the game's food and the
      // ladder that bridges the rift, so it is the one place where a destroyed object leaves the game unwinnable --
      // and round eleven's click tester read the unchanged description for three hundred commands without knowing.
      const fused = g.fsetP('PADLOCK', 'MUNGEDBIT') ? ' The keyhole and the shackle have been welded into one lump of pitted steel; no key will ever turn in it again.' : '';
      if (!g.getg('PADLOCK-REMOVED')) g.tell((open ? 'The padlock hangs open from the hasp.' : "It's a sturdy steel padlock, hooked through the hasp of the door. It has a keyhole on its underside.") + fused);
      else g.tell(`It's a sturdy steel padlock, ${open ? 'standing open' : 'locked shut'}.` + fused);
      return true;
    }
    return false;
  },
  // CAN-F (compone.zil)
  CAN(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('This is a rather normal tin can. It is large and is labelled "Spam and Egz."'); return true; }
    if (is(ctx, 'OPEN')) { g.tell("You certainly can't open it with your hands, and you don't seem to have found a can opener yet."); return true; }
    return false;
  },
  // LADDER-F (compone.zil). The rift branches are kept so the ladder behaves once that area is ported.
  LADDER(g, ctx) {
    if (!obj(ctx)) return false;
    const extended = !!g.getg('LADDER-EXTENDED');
    if (is(ctx, 'TAKE')) { if (extended) { g.tell("You can't possibly carry the ladder while it's extended."); return true; } return false; }
    if (is(ctx, 'EXAMINE')) {
      g.tell('It is a heavy-duty ladder built of sturdy aluminum tubing. It is currently ' + (extended ? 'extended to its full length of about 8 meters, but could be collapsed to a shorter length for easier carrying.' : 'collapsed and is around two-and-a-half meters long, but if extended would obviously be much longer.'));
      return true;
    }
    if (is(ctx, 'OPEN')) {
      if (extended) g.tell('The ladder is already extended.');
      else if (here(g, 'STORAGE-EAST', 'STORAGE-WEST', 'BOOTH-2', 'UPPER-ELEVATOR', 'LOWER-ELEVATOR')) g.tell("You can't extend the ladder in this tiny space!");
      else if (g.isIn('LADDER', 'ADVENTURER')) g.tell("You couldn't possibly extend the ladder while you're holding it.");
      else { g.fset('LADDER', 'TRYTAKEBIT'); g.setg('LADDER-EXTENDED', true); g.state.elapsed = 36; g.tell('The ladder extends to a length of around eight meters.'); }
      return true;
    }
    if (is(ctx, 'CLOSE')) {
      if (extended) {
        // Deliberate deviation (user decision, 2026-09-11, round ten): the source collapses the ladder while it is
        // bridging the rift and drops it in (compone.zil 682-688), which is one unremarkable turn, unwarned and
        // unrecoverable, and severs Admin Corridor North for the rest of the game -- three hundred turns after the
        // player scored four points for placing it. Refuse it instead; every other refusal in this sequence explains
        // itself, and the round-ten typed run lost a full restore to this one.
        if (g.getg('LADDER-FLAG')) { g.tell('The ladder is bridging the rift. Collapsing it now would drop it in, and you would have no way across.'); return true; }
        g.state.elapsed = 21;
        g.setg('LADDER-EXTENDED', false); g.fclear('LADDER', 'TRYTAKEBIT'); g.tell('The ladder collapses to a length of around two-and-a-half meters.');
      } else g.tell('The ladder is already in its collapsed state.');
      return true;
    }
    if (is(ctx, 'SPAN', 'ATTRACT') && ctx.prsi === 'RIFT') {   // depends on: RIFT (admin corridor area)
      if (g.getg('LADDER-FLAG')) g.tell('The ladder already spans the rift.');
      else if (extended) { g.setg('LADDER-FLAG', true); g.fset('LADDER', 'NDESCBIT'); g.tell('The ladder swings out across the rift and comes to rest on the far edge, spanning the precipice.'); }
      // Deliberate deviation (user decision, 2026-09-10, after both blind playtests lost the run here): the source
      // drops the collapsed ladder into the rift for good; here the attempt is refused and the ladder stays.
      else g.tell('The ladder, far too short to reach the other edge of the rift, would simply plunge in. It had better be extended first.');
      return true;
    }
    if (is(ctx, 'CLIMB-UP', 'CLIMB-ON')) {   // CLIMB-FOO is what "climb ladder" parses to
      if (g.getg('LADDER-FLAG')) { g.tell("You can't climb a horizontal ladder!"); return true; }
      if (g.isIn('LADDER', 'ADVENTURER')) { g.tell("That would be a neat trick, considering that you're holding it."); return true; }
      return false;
    }
    return false;
  },
  // KITCHEN-DOOR-F (compone.zil)
  'KITCHEN-DOOR'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'OPEN')) { g.tell('A light flashes "Pleez yuuz kitcin akses kard."'); return true; }
    return false;
  },
  // DISPENSER-F (compone.zil)
  DISPENSER(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) {
      g.tell('This wall-mounted unit contains an octagonal niche beneath a spout. ' + (g.isIn('CANTEEN', 'DISPENSER') ? 'A canteen is resting in the niche, its mouth lying just below the spout. ' : '') + 'Above the spout is a button. The machine is labelled "Hii Prooteen Likwid Dispensur."');
      return true;
    }
    if (is(ctx, 'CLOSE')) { g.tell("There's no way to close it."); return true; }   // NO-CLOSE
    if (is(ctx, 'PUT')) {
      if (ctx.prso === 'CANTEEN') {
        if (!g.held('CANTEEN') && itake(g, { ...ctx, prso: 'CANTEEN', silent: true }) !== true) return true;   // the PUT syntax takes the object first
        g.move('CANTEEN', 'DISPENSER'); g.tell('The canteen fits snugly into the octagonal niche, its mouth resting just below the spout of the machine.');
      } else g.tell("It doesn't fit in the niche.");
      return true;
    }
    return false;
  },
  // HIGH-PROTEIN-F (compone.zil)
  'HIGH-PROTEIN'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EAT')) {
      if (!g.isIn('CANTEEN', 'ADVENTURER')) notHolding(g, 'CANTEEN');
      else if ((g.getg('HUNGER-LEVEL') ?? 0) === 0) g.tell(NOT_HUNGRY);   // depends on: HUNGER-LEVEL / I-HUNGER-WARNINGS (hunger cycle)
      else {
        g.remove('HIGH-PROTEIN'); g.state.elapsed = 15; g.setg('HUNGER-LEVEL', 0); g.queue('I-HUNGER-WARNINGS', 3600);
        g.tell('Mmmm....that was good. It certainly quenched your thirst and satisfied your hunger.');
      }
      return true;
    }
    if (is(ctx, 'POUR') && ctx.prso === 'HIGH-PROTEIN') {
      if (!g.isIn('CANTEEN', 'ADVENTURER')) { g.tell('Maybe if you were holding the canteen...'); return true; }
      const prsi = ctx.prsi ?? 'GROUND';
      if (prsi === 'FLASK') { worthlessAction(g); return true; }
      if (prsi === 'FUNNEL-HOLE') {   // depends on: CHEMICAL-FLUID-F, FLASK, CHEMICAL-REQUIRED (lab area)
        const x = g.isIn('CHEMICAL-FLUID', 'FLASK');
        g.setg('CHEMICAL-REQUIRED', 10); g.remove('HIGH-PROTEIN'); g.perform('POUR', 'CHEMICAL-FLUID', 'FUNNEL-HOLE');
        if (x) g.move('CHEMICAL-FLUID', 'FLASK');
        return true;
      }
      g.remove('HIGH-PROTEIN'); g.tell(`The protein-rich fluid pours over the ${D(g, prsi)} and then dries up.`); return true;
    }
    return false;
  },
  // BED-F (globals.zil). The bed is a vehicle: M-BEG runs while the player is in it.
  BED(g, ctx) {
    if (ctx.rarg === 'M-BEG') {
      if (is(ctx, 'WALK')) { g.tell("You'll have to stand up, first."); return true; }
      if (is(ctx, 'TAKE', 'OPEN', 'CLOSE', 'RUB') && ctx.prso !== 'BED') { g.tell("You can't reach it from here."); return true; }
      return false;
    }
    if (!obj(ctx)) return false;
    if (is(ctx, 'THROUGH', 'BOARD', 'WALK-TO')) {
      if (here(g, 'INFIRMARY')) { g.jigsUp('You climb into the bed. It is soft and comfortable. After a few moments, a previously unseen panel opens, and a diagnostic robot comes wheeling out. It is very rusty and sways unsteadily, bumping into several pieces of infirmary equipment as it crosses the room. As the robot straps you to the bed, you notice some smoke curling from its cracks. Beeping happily, the robot injects you with all 347 serums and medicines it carries. The last thing you notice before you pass out is the robot preparing to saw your legs off.'); return true; }
      if ((g.getg('SLEEPY-LEVEL') ?? 0) > 0) {   // depends on: SLEEPY-LEVEL / I-SLEEP-WARNINGS (sleep cycle)
        g.move('ADVENTURER', 'BED'); g.queue('I-FALL-ASLEEP', 16); g.disable('I-SLEEP-WARNINGS');
        g.tell('Ahhh...the bed is soft and comfortable. You should be asleep in short order.');
      } else { g.move('ADVENTURER', 'BED'); g.tell('You are now in bed.'); }
      return true;
    }
    if (is(ctx, 'DISEMBARK', 'STAND', 'EXIT', 'DROP') && tick(g, 'I-FALL-ASLEEP')) { g.tell("How could you suggest such a thing when you're so tired and this bed is so comfy?"); return true; }
    if (is(ctx, 'LEAVE', 'EXIT', 'DROP')) { g.perform('DISEMBARK', 'BED'); return true; }
    if (is(ctx, 'PUT') && ctx.prsi === 'BED') { g.move(ctx.prso, g.state.here); g.tell(`The ${D(g, ctx.prso)} bounces off the bed and lands on the floor.`); return true; }
    return false;
  },
};

// TELEPORT (globals.zil): shared by the three booth buttons.
function teleport(g, ctx, booth) {
  if (!obj(ctx) || !is(ctx, 'PUSH')) return false;
  // Deliberate deviation (user decision, 2026-09-12, round twelve): the authorisation lasts one trip, and the refusal
  // for a lapsed one was word for word the refusal for never having found the card -- so both testers read a booth
  // they had used ten minutes earlier as broken, and wrote the network off. The second line is added; the source's
  // sign is unchanged. And the refusal costs no turn (B4): it changes nothing, and in the endgame chase a turn spent
  // on a refusal is a death.
  if (g.getg('TELEPORTATION-ON') !== true) {
    g.tell('A sign flashes "Teleportaashun buux not aktivaatid."' + (g.getg('TELEPORTATION-USED') ? ' The authorisation from your last trip has expired; the slot will take the card again.' : ''));
    ctx.fatal = true; return true;
  }
  g.tell('You experience a strange feeling in the pit of your stomach.');
  if (g.isIn('FLOYD', g.state.here)) {   // depends on: FLOYD, I-FLOYD (Floyd area)
    g.tell('Floyd gives a terrified squeal, and clutches at his guidance mechanism.'); g.setg('FLOYD-SPOKE', true); g.queue('I-FLOYD', 1);
  }
  rob(g, g.state.here, booth);
  g.goto(booth, false);   // GOTO with V? false: no description after the jump
  g.disable('I-TURNOFF-TELEPORTATION'); g.setg('TELEPORTATION-ON', false);
  return true;
}

// FLOYD-REVEAL-CARD-F (globals.zil). Only acts when Floyd is in the room.
// depends on: FLOYD, CARD-REVEALED, CARD-STOLEN, INTERNAL-MOVES, LOWER-ELEVATOR-CARD (Floyd area)
function floydRevealCard(g) {
  if (!g.isIn('FLOYD', g.state.here) || g.getg('CARD-REVEALED')) return;
  const day = g.getg('DAY'), moves = g.state.time;   // INTERNAL-MOVES is the chronometer, g.state.time here
  const reveal = (day === 2 && moves < 5000 && g.prob(5)) || (day === 2 && moves > 4999 && g.prob(10))
    || (day === 3 && moves < 5000 && g.prob(20)) || (day === 3 && moves > 4999 && g.prob(40)) || day > 3;
  if (!reveal) return;
  g.setg('CARD-REVEALED', true); g.setg('FLOYD-SPOKE', true);
  if (!g.getg('CARD-STOLEN')) { g.move('LOWER-ELEVATOR-CARD', 'FLOYD'); g.tell('Floyd claps his hands with excitement. "Those cards are really neat, huh? Floyd has one for himself--see?" He reaches behind one of his panels and retrieves a magnetic-striped card. He waves it exuberantly in the air.'); }
  else g.tell('Floyd bobs up and down with excitement. "Those cards are really neat! Floyd has one, too." He begins searching through his compartments, but finds nothing. He scratches his head and looks confused.');
}

// BUTTON-PSEUDO (globals.zil): the dispenser button in the kitchen, reached as pseudos['BUTTON-PSEUDO'] when the
// parser resolves "button" to the scenery word, and through the "push button" phrase (PUSH-BUTTON below) with no noun.
function buttonPseudo(g) {
  if (g.fsetP('DISPENSER', 'MUNGEDBIT')) g.tell('The dispenser sputters a few times.');
  else if (g.isIn('CANTEEN', 'DISPENSER')) {
    if (!g.fsetP('CANTEEN', 'OPENBIT')) g.tell('A thick, brown liquid spills over the closed canteen, dribbles down the side of the machine, and forms a puddle on the floor which quickly dries up.');
    else if (g.isIn('HIGH-PROTEIN', 'CANTEEN')) g.tell('The brown liquid splashes over the mouth of the already-filled canteen, creating a mess' + (g.fsetP('PATROL-UNIFORM', 'WORNBIT') ? ' and staining your uniform' : '') + '.');
    else { g.move('HIGH-PROTEIN', 'CANTEEN'); g.tell('The canteen fills almost to the brim with a brown liquid.'); }
  } else g.tell('A thick, brownish liquid pours from the spout and splashes to the floor, where it quickly evaporates.');
}

// Room PSEUDO scenery routines (globals.zil) for the shore, the upper complex and the dormitories.
// The parser resolves a room's pseudo word to PSEUDO-OBJECT and Game.perform dispatches here by name.
// Deliberate deviation (user decision, 2026-09-11, round ten): scenery words for nouns the room descriptions print.
// The Plan Room names its two wall maps "Kalamontee Kompleks" and "Lawanda Kompleks" and the source answers only to
// "maps", so "examine lawanda map" failed in the room that introduces the second complex; the Robot Shop is "filled
// with robot-like devices" and answered only to "device". Both go to the room's existing scenery routine.
export const pseudoWords = {
  'PLAN-ROOM': [{ word: 'KALAMONTEE', routine: 'MAPS-PSEUDO' }, { word: 'LAWANDA', routine: 'MAPS-PSEUDO' }, { word: 'MAP', routine: 'MAPS-PSEUDO' }],
  // Round eleven (A6, A11): the Robot Shop answers to "device" and "devices" but not to "robots", the word its own
  // description uses and the one a player reaches for -- and it only worked at all while the de-activated robot was
  // still standing there, which is to say before Floyd. The Kalamontee platform prints "A faded sign on the wall
  // reads ..." and had no word for it, while the Lawanda platform's identical sign has had one since round ten.
  'ROBOT-SHOP': [{ word: 'ROBOT-LIKE', routine: 'DEVICES-PSEUDO' }, { word: 'DEVICES', routine: 'DEVICES-PSEUDO' }, { word: 'ROBOTS', routine: 'DEVICES-PSEUDO' }],
  'KALAMONTEE-PLATFORM': [{ word: 'SIGN', routine: 'KALAMONTEE-SIGN-PSEUDO' },
    ...['NOTICE', 'HOURS', 'SCHEDULE', 'TIMETABLE'].map(word => ({ word, routine: 'SERVICE-HOURS-PSEUDO' }))],
};

// Deliberate deviation (user decision, 2026-09-18, round fourteen, B3): the shuttle's service hours on the platform.
// The source says them only at the control cabin's slot, and only once it is too late (SHUTTLE-ACTIVATE: "using the
// shuttle car during the evening hours requires special authorization"). Round fourteen's click tester rode the lower
// elevator down at night with no food and made the whole round trip again. A notice under the platform sign, in the
// phonetic spelling of the complex's other signs, says it where a traveller would look. It hangs on the west end wall
// just below the faded sign (KALAMONTEE-PLATFORM.metadata.json, SERVICE-HOURS-PSEUDO).
// Round seventeen (row 25, user decision 2026-09-18): the notice is about the hours and nothing else. It used to end
// "Servis rezuumz eech morning.", and the teen tester, turned away by a lever that needed the shuttle card, read that
// as "wait for morning", slept, and came back to the same refusal. Nothing on it now suggests that waiting helps.
export const SERVICE_HOURS = 'Shutul Servis: evree dae until 6000. Aaftur 6000, shutul yuus reekwiirz speshul awtharazaashun.';
export const roomText = {
  'KALAMONTEE-PLATFORM': g => `${describeRoom(g, g.here())} Below it, a smaller notice gives the shuttle's hours.`,
};

export const pseudos = {
  // The Kalamontee platform's sign, the twin of the Lawanda one (lawanda.js). Its text is the room's own.
  'KALAMONTEE-SIGN-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'EXAMINE', 'READ')) return false;
    g.tell('The faded sign reads "Shutul Platform -- Kalamontee Staashun."'); return true;
  },
  // The service-hours notice (B3, above).
  'SERVICE-HOURS-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'EXAMINE', 'READ')) return false;
    g.tell(`The notice reads "${SERVICE_HOURS}"`); return true;
  },
  // STRUCTURE-PSEUDO (Crag): the structure seen from below.
  'STRUCTURE-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell("You'd be able to tell more about it if you climbed up to it."); return true; }
    if (is(ctx, 'CLIMB-UP')) { g.doWalk('UP'); return true; }
    return false;
  },
  // CLEFT-PSEUDO (Crag). V-CLIMB-FOO is the "climb X" syntax, which the engine parses as CLIMB-ON.
  'CLEFT-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'CLIMB-UP', 'CLIMB-FOO', 'CLIMB-ON')) { g.doWalk('UP'); return true; } return false; },
  // PLAQUE-PSEUDO (Balcony)
  'PLAQUE-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'READ', 'EXAMINE')) return false;
    g.tell('\nSEENIK VISTA\n\nXis stuneeng vuu uf xee Kalamontee Valee kuvurz oovur fortee skwaar miilz uf xat faamus tuurist spot. Xee larj bildeeng at xee bend in xee Gulmaan Rivur iz xee formur pravincul kapitul bildeeng.');
    return true;
  },
  // CASTLE-PSEUDO (Courtyard, West Wing)
  'CASTLE-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE')) { g.tell('The castle is ancient and crumbling.'); return true; } return false; },
  // GAMES-PSEUDO (Rec Area). depends on: GLOBAL-GAMES-F (floyd.js)
  'GAMES-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'PLAY')) { g.perform('PLAY', 'GLOBAL-GAMES'); return true; }
    if (is(ctx, 'EXAMINE')) { g.tell('All the usual games -- Chess, Cribbage, Galactic Overlord, Double Fannucci...'); return true; }
    return false;
  },
  // TAPES-PSEUDO (Rec Area)
  'TAPES-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'READ', 'PLAY', 'TAKE')) { g.tell('Hardly the time or place for reading recreational tapes.'); return true; }
    if (is(ctx, 'EXAMINE')) { g.tell("Let's see...here are some musical selections, here are some bestselling romantic novels, here is a biography of a famous Double Fannucci champion..."); return true; }
    return false;
  },
  // PARTITION-PSEUDO (Dorms A-D)
  'PARTITION-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE')) { g.tell('The partitions are very plain, and were obviously intended to separate this huge room into smaller areas.'); return true; } return false; },
  // TOILET-PSEUDO (SanFacs A-E): "toilet" and "fixtures".
  'TOILET-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('The fixtures are all dry and dusty.'); return true; }
    if (is(ctx, 'FLUSH')) { g.tell('The water seems to be turned off.'); return true; }
    return false;
  },
  // SPOUT-PSEUDO (Kitchen): the dispenser's spout.
  'SPOUT-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'PUT-UNDER') && ctx.prso === 'CANTEEN') { g.perform('PUT', 'CANTEEN', 'DISPENSER'); return true; }
    if (is(ctx, 'LOOK-UNDER') && g.isIn('CANTEEN', 'DISPENSER')) { g.tell('The canteen is sitting under the spout.'); return true; }
    return false;
  },
  // BUTTON-PSEUDO (Kitchen): the dispenser button; "push button" with no noun still reaches buttonPseudo through PUSH-BUTTON.
  'BUTTON-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'PUSH')) { buttonPseudo(g); return true; } return false; },
  // CUBBYHOLE-PSEUDO (Plan Room)
  'CUBBYHOLE-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE', 'LOOK-INSIDE')) { g.tell('The cubbyholes look like the kind that are used to hold maps or blueprints. They are all empty now.'); return true; } return false; },
  // MAPS-PSEUDO (Plan Room). Deliberate deviation (user decision, 2026-09-11, round ten): the source answers
  // "Examining the maps reveals no new information." for both walls. Round ten's mid-game is seven simultaneous
  // locks whose every key lies on the far side of one of them -- the Lower Elevator -- with nothing anywhere saying
  // which; all three legs of both runs independently searched the wrong island for hundreds of commands. The
  // Lawanda map is the one reachable place where that thread belongs: it is the wall the room hangs it on, in the
  // room whose whole purpose is showing the player that a second complex exists. It names the way there and nothing
  // else -- no puzzle, no card, no combination.
  'MAPS-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'EXAMINE')) return false;
    if (g.state.pseudo?.word === 'lawanda') {
      g.tell('The Lawanda map shows a complex much like this one, but deep under the sea bed and a long way off: a shuttle tunnel runs out to it from a platform below the Kalamontee complex, and the only way down to that platform is the lower elevator.');
      return true;
    }
    g.tell('Examining the maps reveals no new information.');
    return true;
  },
};

// No room in this area has M-ENTER/M-END side effects beyond CRAG-F (ported in ship.js); the M-LOOK
// routines (BALCONY-F, WINDING-STAIR-F, COURTYARD-F, REC-AREA-F, CONFERENCE-ROOM-F, MESS-CORRIDOR-F,
// MESS-HALL-F) are pure text and are rendered from the description trees in world.json.
export const rooms = {};
export const exits = {};
export const describers = {};

export const interrupts = {
  // I-KITCHEN-DOOR-CLOSES (globals.zil): waits every turn while you are in the kitchen.
  'I-KITCHEN-DOOR-CLOSES'(g) {
    if (here(g, 'KITCHEN')) { g.queue('I-KITCHEN-DOOR-CLOSES', -1); return; }
    g.fclear('KITCHEN-DOOR', 'OPENBIT'); g.disable('I-KITCHEN-DOOR-CLOSES');
    if (here(g, 'MESS-HALL')) g.tell('The kitchen door slides quietly closed.', 'event');
  },
  // I-TURNOFF-TELEPORTATION (globals.zil)
  'I-TURNOFF-TELEPORTATION'(g) {
    g.setg('TELEPORTATION-ON', false);
    if (here(g, 'BOOTH-1', 'BOOTH-2', 'BOOTH-3')) g.tell('The ready light goes dark.', 'event');
  },
  // I-FALL-ASLEEP, which BED-F queues, belongs to the sleep cycle (rules/survival.js) together with
  // DREAMING and WAKING-UP; without that module it lands in Game.notes as an unported interrupt.
};

// Verb defaults from verbs.zil that this area's objects rely on and the engine does not provide.
export const verbs = {
  UNLOCK(g) { g.tell("You can't do that."); },      // V-UNLOCK -> V-TURN
  LOCK(g) { g.tell("You can't do that."); },        // V-LOCK -> V-TURN
  'OPEN-WITH'(g, ctx) { if (ctx.prsi === 'HANDS') return g.perform('OPEN', ctx.prso); g.tell("That doesn't work."); },   // V-OPEN-WITH
  // V-SET. Typed as "set/turn X [to N]": the parser has no numbers, so with no PRSO the phrase is parsed
  // here, P-NUMBER is set and the action re-performed with INTNUM as PRSI, the way the original parser did.
  SET(g, ctx) {
    if (!ctx.prso) return setFromText(g, ctx);
    if (!ctx.prsi) g.tell(['COMBINATION-DIAL', 'LASER-DIAL'].includes(ctx.prso) ? 'You must specify a number to set the dial to.' : `Turning the ${D(g, ctx.prso)} accomplishes nothing.`);
    else g.tell(`Setting ${g.article(ctx.prso)} ${D(g, ctx.prso)} is a strange concept.`);
  },
  SLIDE(g) { g.tell(g.pickOne(YUKS)); },            // V-SLIDE
  MUNG(g, ctx) { hackHack(g, 'Trying to destroy the ', ctx.prso); },   // V-MUNG
  'LOOK-UNDER'(g, ctx) { g.tell(`There is nothing but ${ctx.prso === 'AMBASSADOR' ? 'slime' : 'dust'} there.`); },   // V-LOOK-UNDER
  'PUT-UNDER'(g) { g.tell("You can't do that."); },   // V-PUT-UNDER (the kitchen's SPOUT-PSEUDO redirects the canteen into the dispenser)
  FLUSH(g, ctx) { g.tell(`Flush ${g.article(ctx.prso)} ${D(g, ctx.prso)}?`); },   // V-FLUSH
  // V-LEAP / V-SKIP
  LEAP(g, ctx) {
    if (!ctx.prso) return g.tell(g.pickOne(WHEEEEE));
    if (!g.isIn(ctx.prso, g.state.here)) return g.tell('That would be a good trick.');
    g.tell(g.fsetP(ctx.prso, 'ACTORBIT') ? `The ${D(g, ctx.prso)} is too big to jump over.` : g.pickOne(WHEEEEE));
  },
  'THROW-OFF'(g) { g.tell("It's difficult to see how that can be done."); },   // V-THROW-OFF
  POUR(g) { g.tell('Pouring or spilling non-liquids is specifically forbidden by section 17.9.2 of the Galactic Adventure Game Compendium of Rules.'); },   // V-POUR
  // V-EAT-FROM
  'EAT-FROM'(g, ctx) {
    const o = ctx.prso, inside = g.contents(o);
    if (!g.fsetP(o, 'OPENBIT')) return g.tell("It's closed.");
    if (inside.length > 1) return g.tell(`There's more than one thing in the ${D(g, o)}.`);
    if (inside.length === 1) return g.perform('EAT', inside[0]);
    g.tell("It's empty!");
  },
  // "push button": the kitchen's BUTTON-PSEUDO; elsewhere resolve "button" against the objects in scope.
  'PUSH-BUTTON'(g, ctx) {
    if (here(g, 'KITCHEN')) return buttonPseudo(g);
    const r = resolve(['button'], g);
    // The question is the parser's WHICH-PRINT, so its answer is an orphan as any other (parser.js parse): round
    // nineteen's "blue", "the blue one" and "blue button" after "the blue button or the red button?" were fresh commands.
    if (r.error && r.candidates) g.state.pendingAsk = { cmd: { verb: 'PUSH' }, slot: 'prso', candidates: r.candidates, text: ctx.text ?? 'push button' };
    if (r.error) { g.tell(r.error); ctx.fatal = true; return; }
    g.state.lastObject = r.id; g.perform('PUSH', r.id);
  },
  // V-PUSH with INTNUM ("push 2"): the booth branches.
  'PUSH-NUMBER'(g, ctx) {
    const n = parseInt((ctx.text ?? '').match(/\d+/)?.[0] ?? '0', 10); g.setg('P-NUMBER', n);
    // Deliberate deviation (user decision, 2026-09-11, round nine): at a keyboard "press 21" types it. The source says
    // "You probably want to use the TYPE command. Check your documentation." (round eight's typed tester).
    if (here(g, 'LIBRARY-LOBBY', 'MINI-BOOTH')) return g.perform('TYPE', null, null, { text: (ctx.text ?? '').replace(/^\s*(push|press)\b/i, 'type') });
    if (n >= 1 && n <= 3 && here(g, 'BOOTH-1', 'BOOTH-2', 'BOOTH-3')) {
      if (g.state.here === `BOOTH-${n}`) return g.tell(`There's no button here that's labelled with the number ${n}.`);   // NO-BUTTON
      return g.perform('PUSH', `TELEPORTATION-BUTTON-${n}`);
    }
    g.tell('Push a number?!?');
  },
};

function setFromText(g, ctx) {
  const words = (ctx.text ?? '').toLowerCase().replace(/[^a-z0-9'\- ]/g, ' ').split(/\s+/).filter(Boolean);
  const verb = words.shift();
  const num = words.find(w => /^\d+$/.test(w));
  // TURN OBJECT TO OBJECT = V-SET (syntax.zil 371): a word after "to" that is not a number names a second thing. It
  // used to be folded into the first noun, so "set lever to center" was "You can't see any lever center here!" while
  // "push lever to center" worked (round sixteen).
  const to = words.indexOf('to');
  if (num === undefined && to > 0 && to < words.length - 1) {
    const clean = ws => ws.filter(w => !['the', 'a', 'an'].includes(w));
    const a = resolve(clean(words.slice(0, to)), g);
    if (a.error) { g.tell(a.error); ctx.fatal = true; return; }
    const b = resolve(clean(words.slice(to + 1)), g);
    if (b.error) { g.tell(b.error); ctx.fatal = true; return; }
    g.state.lastObject = a.id;
    g.perform('SET', a.id, b.id);
    return;
  }
  const rest = words.filter(w => w !== num && !['to', 'the', 'a', 'an'].includes(w));
  if (!rest.length) { g.tell(`What do you want to ${verb}?`); ctx.fatal = true; return; }
  const r = resolve(rest, g);
  if (r.error) { g.tell(r.error); ctx.fatal = true; return; }
  g.state.lastObject = r.id;
  if (num === undefined) g.perform('SET', r.id);
  else { g.setg('P-NUMBER', parseInt(num, 10)); g.perform('SET', r.id, 'INTNUM'); }
}

// Click-menu verbs (see parser.verbsFor): the ladder is extended and collapsed with OPEN/CLOSE. Open stays while you hold
// it (round five: hiding it left the click playtester guessing; its refusal says to put the ladder down first); Close
// only when extended; Take only when short and not already in hand.
const ladderExtended = g => !!g.getg('LADDER-EXTENDED');
// The Kitchen's way out is a plain exit in the source (NORTH / OUT TO MESS-HALL, not tied to the door), so the scene drew
// no door there and the door could not be clicked from inside; its panel now carries it. Walking out still ignores it.
export const panelDoors = { KITCHEN: { NORTH: 'KITCHEN-DOOR', OUT: 'KITCHEN-DOOR' } };

export const menus = {
  // WINDOW-F answers LOOK-INSIDE, not EXAMINE, in every room but the pod (where EXAMINE shows the view too), so the
  // window's menu said "nothing special" while the view was a verb away (round eighteen: Bio Lock East, where Floyd
  // peers through it in the same turn). The verb is the source's; the entry reads "Look through".
  WINDOW: [{ verb: 'LOOK-INSIDE', label: 'Look through', when: g => g.state.here !== 'ESCAPE-POD' }],
  LADDER: [{ verb: 'OPEN', when: g => !ladderExtended(g) }, { verb: 'CLOSE', when: ladderExtended }, { verb: 'TAKE', when: g => !ladderExtended(g) && !g.held('LADDER') }],
  'COMBINATION-DIAL': [{ verb: 'SET', number: true }],                                    // the rec area dial: "Set to a number"
  CAN: ['OPEN'],                                                                          // CAN-F answers OPEN (no can opener yet)
  DISPENSER: [{ verb: 'CLOSE', when: () => false }],                                       // DISPENSER-F: "There's no way to close it." (NO-CLOSE)
  'TELEPORTATION-BUTTON-1': ['PUSH'], 'TELEPORTATION-BUTTON-2': ['PUSH'], 'TELEPORTATION-BUTTON-3': ['PUSH'],
  PADLOCK: [{ verb: 'TAKE', when: g => g.fsetP('PADLOCK', 'OPENBIT') }],                 // locked to the door until unlocked
  'BUTTON-PSEUDO': ['PUSH'], 'PLAQUE-PSEUDO': ['READ'], 'GAMES-PSEUDO': ['PLAY'], 'IN-BOOTH-PSEUDO': ['DISEMBARK'], 'STRUCTURE-PSEUDO': ['CLIMB-UP'], 'CLEFT-PSEUDO': ['CLIMB-UP'],
};

// Two-object click-menu entries (see parser.usesFor): the cards go through the slot, the key opens the padlock.
export const uses = [
  { verb: 'SLIDE', prso: ['KITCHEN-CARD', 'UPPER-ELEVATOR-CARD', 'LOWER-ELEVATOR-CARD', 'TELEPORTATION-CARD', 'SHUTTLE-CARD', 'MINI-CARD', 'ID-CARD'], prsi: ['SLOT'], label: 'Slide through slot' },
  { verb: 'UNLOCK', prso: ['PADLOCK'], prsi: ['KEY'], label: 'Unlock with key', when: g => !g.fsetP('PADLOCK', 'OPENBIT') },
];

// Parser phrases from syntax.zil for the verbs above: [phrase, VERB, needsObject, prep?].
export const vocabulary = [
  ['unlock', 'UNLOCK', 1, 'with'], ['lock', 'LOCK', 1, 'with'], ['open', 'OPEN-WITH', 1, 'with'],   // "open padlock with pliers" (syntax.zil OPEN OBJECT WITH OBJECT)
  ['set', 'SET', 0], ['turn', 'SET', 0],
  ['slide', 'SLIDE', 1, 'through|thru|in|into'],
  ['break', 'MUNG', 1], ['destroy', 'MUNG', 1], ['smash', 'MUNG', 1], ['damage', 'MUNG', 1],
  ['look under', 'LOOK-UNDER', 1], ['look behind', 'LOOK-UNDER', 1],
  ['put', 'PUT-UNDER', 1, 'under'], ['flush', 'FLUSH', 1], ['climb to', 'CLIMB-UP', 1],
  ['jump off', 'LEAP', 1], ['jump over', 'LEAP', 1], ['jump from', 'LEAP', 1], ['jump in', 'LEAP', 1], ['jump across', 'LEAP', 1], ['jump', 'LEAP', 0],
  ['leap off', 'LEAP', 1], ['leap over', 'LEAP', 1], ['leap', 'LEAP', 0],
  ['toss', 'THROW-OFF', 1, 'off|over'], ['hurl', 'THROW-OFF', 1, 'off|over'], ['chuck', 'THROW-OFF', 1, 'off|over'],
  ['pour', 'POUR', 1, 'on|over|onto|in|into'], ['spill', 'POUR', 1, 'on|over|onto|in|into'],
  ['drink', 'EAT', 1], ['swallow', 'EAT', 1], ['drink from', 'EAT-FROM', 1], ['eat from', 'EAT-FROM', 1],
  ['sit on', 'CLIMB-ON', 1], ['sit in', 'BOARD', 1], ['lie on', 'CLIMB-ON', 1], ['lie in', 'BOARD', 1], ['lie down on', 'CLIMB-ON', 1], ['lie down in', 'BOARD', 1],
  ['push button', 'PUSH-BUTTON', 0], ['push the button', 'PUSH-BUTTON', 0], ['press button', 'PUSH-BUTTON', 0], ['press the button', 'PUSH-BUTTON', 0], ['press', 'PUSH', 1],
  ['push 1', 'PUSH-NUMBER', 0], ['push 2', 'PUSH-NUMBER', 0], ['push 3', 'PUSH-NUMBER', 0], ['press 1', 'PUSH-NUMBER', 0], ['press 2', 'PUSH-NUMBER', 0], ['press 3', 'PUSH-NUMBER', 0],
];

// Globals this area reads (compone.zil / globals.zil / parser.zil defaults).
export function setup(g) {
  for (const [k, v] of Object.entries({ 'DIAL-NUMBER': 0, 'PADLOCK-REMOVED': false, 'LADDER-EXTENDED': false, 'LADDER-FLAG': false, 'TELEPORTATION-ON': false, 'CARD-REVEALED': false, 'P-NUMBER': 0 })) g.setg(k, v);
  for (const k of ['HUNGER-LEVEL', 'SLEEPY-LEVEL']) if (g.getg(k) === undefined) g.setg(k, 0);
}
