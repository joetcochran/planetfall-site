// Hand-ported rules for Floyd, the multiple purpose robot found in the Robot Shop.
// Each block names the ZIL routine it ports so it can be checked against the source:
//   compone.zil  FLOYD-F, FLOYD-COMES-ALIVE, I-FLOYD, CALL-ME-FLOYD, KLUDGE, FLOYDS-FAMOUS-DOOR-ROUTINE,
//                FLUSH, FLOYD-INTO-LAB, FLOYD-NOT-HAVE, DEAD-FLOYD-F, FLOYDISMS
//   comptwo.zil  FLOYD-THROUGH-HOLE, COMPUTER-ACTION (the parts of the hole and computer puzzles Floyd owns)
//   globals.zil  GLOBAL-GAMES-F, HANDS-F, FLOYD-REVEAL-CARD-F
//   verbs.zil    the verb defaults Floyd's responses hang off (V-GIVE, V-SHOW, V-PLAY, V-PLAY-WITH, V-FOLLOW,
//                V-LAMP-ON, V-LAMP-OFF, V-KISS, V-SCOLD, V-KICK, V-MUNG, V-SHAKE, V-SHAKE-WITH, V-REACH,
//                V-POINT, V-SCRUB, V-TELL, V-ASK-FOR)
// Verb ids: ZIL V-LAMP-ON / V-LAMP-OFF are exposed as TURN-ON / TURN-OFF ("turn on", "activate", "turn off").
//
// Floyd's "switched on" state is RLANDBIT on the FLOYD object, exactly as in the ZIL; ACTORBIT is set with it.
// FLOYD-SPOKE keeps him from doing two things on one turn; FLOYD-FOLLOW records that he was in the room you
// just left; FLOYD-INTRODUCED and FLOYD-REACTIVATED pick which greeting he uses.
import { clickableObjects, exitChoices } from '../engine/parser.js';

const D = (g, id) => g.name(id);
const here = (g, ...rooms) => rooms.includes(g.state.here);
const floydOn = g => g.fsetP('FLOYD', 'RLANDBIT');
const floydHere = g => g.isIn('FLOYD', g.state.here);

// FLOYDISMS (PLTABLE -> g.pickOne)
const FLOYDISMS = [
  'paces impatiently',
  'absent-mindedly recites the first six hundred digits of pi',
  'lowers his voice and tells you the latest rumors about Dr. Fizpick',
  'recalls the time he bruised his knee',
  'chants the death scene from "Carmen"',
  'cranes his neck to see what you are doing',
  'rubs his head affectionately against your shoulder',
  'asks if you want to play Hucka-Bucka-Beanstalk',
  'examines himself for signs of rust',
  'absent-mindedly oils one of his joints',
  'wanders restlessly around the room',
  'notices a mouse scurrying by and tries to hide behind you',
  'sings an ancient ballad, totally out of key',
  'frets about the possibility of his batteries failing',
  'reminisces about his friend Lazarus, a medical robot',
  'relates some fond memories about his robotic friend Lazarus',
  'whistles tunelessly',
  'tells you about the time he helped someone sharpen a pencil',
  'yawns and looks bored',
  'produces a crayon from one of his compartments and scrawls his name on the wall',
];
// HO-HUM (verbs.zil), used by HACK-HACK for KICK / MUNG.
const HO_HUM = [" isn't notably helpful.", ' has no effect.', ' is as worthwhile as cleaning a Grotch cage.'];

// --- Floyd's helper routines -----------------------------------------------------------------

// FLOYD-NOT-HAVE
function floydNotHave(g) { g.tell('"Floyd does not one of those have!"'); }

// FLOYD-INTO-LAB. depends on: FLOYD-WAITING is set by BIO-LOCK-EAST-F (comptwo.zil), not ported here.
function floydIntoLab(g) {
  g.tell(g.getg('FLOYD-WAITING') ? '"As soon as you open the door, dummy."' : '"Are you kidding? Floyd not going in THERE without a good reason."');
}

// FLOYD-THROUGH-HOLE (comptwo.zil). The hole itself (ROBOT-HOLE-F, GOOD-BOARD-F) belongs to the repair-room area;
// this is the part Floyd performs. Sets BOARD-REPORTED so "take board" (addressed to Floyd) can succeed.
function floydThroughHole(g) {
  if (g.getg('HOLE-TRIP-FLAG')) { g.tell('"Not again," whines Floyd.'); return true; }
  g.state.elapsed = 50;
  g.setg('HOLE-TRIP-FLAG', true); g.setg('BOARD-REPORTED', true);
  g.fclear('GOOD-BOARD', 'INVISIBLE');
  g.tell('Floyd squeezes through the opening and is gone for quite a while. You hear thudding noises and squeals of enjoyment. After a while the noise stops, and Floyd emerges, looking downcast. "Floyd found a rubber ball inside. Lots of fun for a while, but must have been old, because it fell apart. Nothing else interesting inside. Just a shiny fromitz board."');
  return true;
}

// FLOYDS-FAMOUS-DOOR-ROUTINE
function floydsFamousDoorRoutine(g, prso) {
  if (prso === 'ROBOT-HOLE') return floydThroughHole(g);
  if (prso === 'BIO-DOOR-EAST') return floydIntoLab(g);
  if (prso && g.fsetP(prso, 'DOORBIT')) g.tell('"You go first," says Floyd.');
  else g.tell('Floyd scratches his head and looks at you.');
}

// FLUSH. depends on: P-CONT, the original parser's "more commands on this line" state. This parser takes one
// command per line, so there is never anything to flush; the ZIL prints a Floyd line and RFATALs when there is.
function flush() { return false; }

// COMPUTER-ACTION (comptwo.zil): Floyd notices the broken computer. Reached from KLUDGE and SHOW PRINT-OUT.
function computerAction(g) {
  g.setg('COMPUTER-FLAG', true); g.setg('FLOYD-SPOKE', true);
  g.tell(`Floyd examines the ${here(g, 'COMPUTER-ROOM') ? 'glowing light' : 'computer printout'}. With a concerned frown, he says, "Uh oh. Computer is broken. A Doctor-person once told Floyd that Computer is the most important part of the Project."`);
}

// KLUDGE: things Floyd says the first time he enters certain rooms.
function kludge(g) {
  if (here(g, 'REPAIR-ROOM') && !g.getg('ACHILLES-FLAG')) {
    g.setg('ACHILLES-FLAG', true); g.setg('FLOYD-SPOKE', true);
    g.tell('Floyd points at the fallen robot. "That\'s Achilles. He was in charge of repairing machinery. He repaired Floyd once. I never liked him much; he wasn\'t friendly like other robots. Looks like he fell down the stairs. He always had trouble with one of his feet working right. A Planner-person once told me that\'s why they named him Achilles."', 'event');
  } else if (here(g, 'COMPUTER-ROOM') && !g.getg('COMPUTER-FLAG')) computerAction(g);
}

// CALL-ME-FLOYD
function callMeFloyd(g) {
  g.setg('FLOYD-INTRODUCED', true);
  g.tell('The robot you were fiddling with in the Robot Shop bounds into the room. "Hi!" he says, with a wide and friendly smile. "You turn Floyd on? Be Floyd\'s friend, yes?"', 'event');
}

// FLOYD-COMES-ALIVE. FIRST? ADVENTURER is the most recently taken object in the ZIL tree; the engine keeps no
// insertion order, so the first held object in world order stands in for it.
function floydComesAlive(g) {
  if (floydHere(g)) {
    if (g.getg('FLOYD-REACTIVATED')) {
      g.setg('FLOYD-SPOKE', true);
      g.tell('Floyd jumps to his feet, hopping mad. "Why you turn Floyd off?" he asks accusingly.', 'event');
    } else {
      g.setg('FLOYD-INTRODUCED', true); g.setg('FLOYD-SPOKE', true);
      const foo = g.contents('ADVENTURER')[0];
      g.tell('Suddenly, the robot comes to life and its head starts swivelling about. It notices you and bounds over. "Hi! I\'m B-19-7, but to everyperson I\'m called Floyd. Are you a doctor-person or a planner-person? '
        + (foo ? `That's a nice ${D(g, foo)} you are having there. ` : '') + 'Let\'s play Hider-and-Seeker you with me."', 'event');
    }
  }
  g.fset('FLOYD', 'RLANDBIT'); g.fset('FLOYD', 'ACTORBIT'); g.fset('FLOYD', 'TOUCHBIT');
  g.setg('FLOYD-REACTIVATED', true);
}

// --- objects ---------------------------------------------------------------------------------

export const objects = {
  // FLOYD-F
  FLOYD(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    const v = ctx.verb, { prso, prsi } = ctx, h = g.state.here;

    // Orders addressed to Floyd ("Floyd, ..."). depends on: parser support for addressing actors (WINNER); this
    // parser never sets WINNER to FLOYD, so the branch is ported for completeness and reached only if a rule sets it.
    if (g.getg('WINNER') === 'FLOYD') {
      g.setg('FLOYD-SPOKE', true);
      if (v === 'GIVE' && prsi === 'ME') { g.setg('WINNER', 'ADVENTURER'); g.perform('ASK-FOR', 'FLOYD', prso); return true; }
      // V-SGIVE ("Floyd, give me the card" with the objects reversed) depends on: parser syntax GIVE actor OBJECT.
      if (v === 'WALK') {
        if (here(g, 'REPAIR-ROOM') && ['NORTH', 'IN'].includes(ctx.dir)) floydThroughHole(g);
        else if (here(g, 'BIO-LOCK-EAST') && ctx.dir === 'EAST') floydIntoLab(g);
        else if (here(g, 'RADIATION-LOCK-EAST') && ctx.dir === 'EAST') g.tell('"After you."');
        else g.tell('Floyd looks slightly embarrassed. "You know me and my sense of direction." Then he looks up at you with wide, trusting eyes. "Tell Floyd a story?"');
        if (flush(g)) ctx.fatal = true;
        return true;
      }
      if (v === 'THROUGH') { floydsFamousDoorRoutine(g, prso); if (flush(g)) ctx.fatal = true; return true; }
      if (v === 'TAKE' && prso === 'GOOD-BOARD') {
        if (!g.isIn('GOOD-BOARD', 'ROBOT-HOLE')) g.tell('Floyd looks half-bored and half-annoyed. "Floyd already did that. How about some leap-frogger?"');
        else if (g.getg('BOARD-REPORTED')) {
          g.move('GOOD-BOARD', 'ADVENTURER'); g.fclear('GOOD-BOARD', 'NDESCBIT'); g.fset('GOOD-BOARD', 'TAKEBIT'); g.state.elapsed = 22;
          g.tell('Floyd shrugs. "If you say so." He vanishes for a few minutes, and returns holding the fromitz board. It seems to be in good shape. He tosses it toward you, and you just manage to catch it before it smashes.');
        } else g.tell('"Huh?" asks Floyd. "What fromitz board?"');
        return true;
      }
      if (v === 'FOLLOW' && prso === 'ME') { g.tell('"Okay!"'); return true; }
      if (v === 'HELLO') { g.setg('WINNER', 'ADVENTURER'); g.perform('HELLO', 'FLOYD'); return true; }
      if (v === 'DROP') {
        if (g.isIn(prso, 'FLOYD')) {
          if (g.prob(50)) { g.move(prso, h); g.tell(`Floyd shrugs and drops the ${D(g, prso)}.`); }
          else g.tell(`Floyd clutches the ${D(g, prso)} even more tightly. "Floyd won't," he says defiantly.`);
        } else floydNotHave(g);
        return true;
      }
      g.tell('Floyd whines, "Enough talking! Let\'s play Hider-and-Seeker."'); ctx.fatal = true; return true;
    }

    if (v === 'CLOSE') { g.tell('Huh?'); return true; }
    if (v === 'LOOK-INSIDE' || v === 'REACH') { g.perform('OPEN', 'FLOYD'); return true; }

    if (floydOn(g)) {
      g.setg('FLOYD-SPOKE', true);
      switch (v) {
        case 'TURN-ON': g.tell("He's already been activated."); return true;
        case 'TURN-OFF': {
          g.fclear('FLOYD', 'RLANDBIT'); g.fclear('FLOYD', 'ACTORBIT'); g.disable('I-FLOYD');
          const carried = g.contents('FLOYD');
          g.tell('Floyd, shocked by this betrayal from his new-found friend, whimpers and keels over' + (carried.length ? ', dropping what he was carrying.' : '.'));
          for (const x of carried) g.move(x, h);
          return true;
        }
        case 'EXAMINE': g.tell('From its design, the robot seems to be of the multi-purpose sort. It is slightly cross-eyed, and its mechanical mouth forms a lopsided grin.'); return true;
        case 'KISS': g.tell('You receive a painful electric shock.'); return true;
        case 'SCOLD': g.tell('Floyd looks defensive. "What did Floyd do wrong?"'); return true;
        case 'PLAY-WITH':
          g.state.elapsed = 30; g.queue('I-FLOYD', 1);
          g.tell('You play with Floyd for several centichrons until you drop to the floor, exhausted. Floyd pokes at you gleefully. "C\'mon! Let\'s play some more!"'); return true;
        case 'LISTEN': g.tell('Floyd is babbling about this and that.'); return true;
        case 'TAKE':
          if (prso !== 'FLOYD') return false;
          g.tell('You manage to lift Floyd a few inches off the ground, but he is too heavy and you drop him suddenly. Floyd gives a surprised squeal and moves a respectable distance away.'); return true;
        case 'ATTACK': case 'MUNG': g.tell('Floyd starts dashing around the room. "Oh boy oh boy oh boy! I haven\'t played Chase and Tag for years! You be It! Nah, nah!"'); return true;
        case 'KICK': case 'SHAKE':
          if (v === 'SHAKE' && prsi) return false;   // "shake hands with floyd" is V-SHAKE-WITH, which FLOYD-F does not catch
          g.tell('"Why you do that?" Floyd whines. "I think a wire now shaken loose." He goes off into a corner and sulks.'); return true;
        case 'HELLO': case 'TALK': g.tell('"Hi!" Floyd grins and bounces up and down.'); return true;
        case 'SEARCH': case 'SCRUB': case 'OPEN': g.tell('Floyd giggles and pushes you away. "You\'re tickling Floyd!" He clutches at his side panels, laughing hysterically. Oil drops stream from his eyes.'); return true;
        case 'GIVE': case 'PUT':
          if (prsi !== 'FLOYD') return false;
          if (v === 'GIVE' && !g.held(prso)) { g.tell(`You're not holding the ${D(g, prso)}.`); return true; }   // PRE-GIVE
          if (prso === 'LAZARUS-PART') {
            // depends on: INFIRMARY-F (comptwo.zil) placing the breastplate; only Floyd's reaction is here.
            g.remove('FLOYD'); g.setg('FLOYD-FOLLOW', false); g.move('LAZARUS-PART', h); g.queue('I-FLOYD', 40);
            g.tell('At first, Floyd is all grins because of your gift. Then, he realizes what it is, begins weeping, drops the breastplate, and rushes out of the room.');
          } else if (['RED-GOO', 'GREEN-GOO', 'BROWN-GOO'].includes(prso)) g.tell('Floyd looks at the goo. "Yech! Got any Number Seven Heavy Grease?"');
          else if (g.contents('FLOYD').length || g.prob(25)) { g.move(prso, h); g.tell(`Floyd examines the ${D(g, prso)}, shrugs, and drops ${prso === 'PLIERS' ? 'them' : 'it'}.`); }
          else { g.move(prso, 'FLOYD'); g.tell('"Neat!" exclaims Floyd. He thanks you profusely.'); }
          return true;
        case 'SHOW':
          if (prsi !== 'FLOYD') return false;
          if (prso === 'PRINT-OUT' && !g.getg('COMPUTER-FLAG')) computerAction(g);
          else if (prso === 'ROBOT-HOLE') floydThroughHole(g);
          // depends on: PSEUDO objects (REC-AREA "games" pseudo) are not modelled by the engine; the ZIL line is
          // "Too intellectual for Floyd. Any paddleball sets around?"
          else if (['ID-CARD', 'SHUTTLE-CARD', 'KITCHEN-CARD', 'UPPER-ELEVATOR-CARD'].includes(prso)) g.tell('Floyd scratches his head. "Aren\'t those things usually blue?"');
          else if (prso === 'LOWER-ELEVATOR-CARD' && !g.getg('CARD-REVEALED')) { g.setg('CARD-REVEALED', true); g.tell('"I\'ve got one just like that!" says Floyd. He looks through several of his compartments, then glances at you suspiciously.'); }
          else g.tell(`Floyd looks over the ${D(g, prso)}. "Can you play any games with it?" he asks.`);
          return true;
        case 'RUB': g.tell('Floyd gives a contented sigh.'); return true;
        case 'SMELL': g.tell('Floyd smells faintly of ozone and light machine oil.'); return true;
        case 'ASK-FOR':
          if (prsi && g.isIn(prsi, 'FLOYD')) { g.move(prsi, 'ADVENTURER'); g.tell(`"Okay," says Floyd, handing you the ${D(g, prsi)}, "but only because you're Floyd's best friend."`); }
          else floydNotHave(g);
          return true;
      }
      return false;
    }

    // Floyd switched off.
    switch (v) {
      case 'TURN-ON':
        if (g.getg('FLOYD-INTRODUCED')) { g.queue('I-FLOYD', -1); return true; }
        // Deliberate deviation (user decision, 2026-09-10): the source prints only "Nothing happens." while the score
        // rises and Floyd boots a few turns later; both playtesters read it as a failure. Add a hint that it worked.
        g.queue('I-FLOYD', 25); g.tell('Nothing happens. Then again, you notice a faint hum from somewhere inside the robot.');
        if (!g.getg('FLOYD-SCORE-FLAG')) { g.setg('FLOYD-SCORE-FLAG', true); g.state.score += 2; }
        return true;
      case 'TURN-OFF': g.tell("The robot doesn't seem to be on."); return true;
      // Deliberate deviation (user decision, 2026-09-11, round ten): the source's description ends at "turned off",
      // and both round-ten testers switched the robot on without ever searching it. That leaves the lower elevator
      // access card -- the key to the whole second half of the map -- to Floyd's own random reveal (5% a card-slot
      // use on day 2), and both runs stalled for hundreds of commands. Naming the compartments invites the search
      // without giving the card away.
      case 'EXAMINE': g.tell('The de-activated robot is leaning against the wall, its head lolling to the side. It is short, and seems to be equipped for general-purpose work. It has apparently been turned off. Several compartments are set into its casing, their catches unfastened.'); return true;
      case 'SEARCH': case 'OPEN':
        if (!g.getg('CARD-REVEALED') && !g.getg('CARD-STOLEN')) {
          g.fclear('LOWER-ELEVATOR-CARD', 'INVISIBLE'); g.move('LOWER-ELEVATOR-CARD', 'ADVENTURER'); g.scoreObj('LOWER-ELEVATOR-CARD'); g.setg('CARD-STOLEN', true);
          g.tell('In one of the robot\'s compartments you find and take a magnetic-striped card embossed "Loowur Elavaatur Akses Kard."');
        } else g.tell("Your search discovers nothing in the robot's compartments except a single crayon which you leave where you found it.");
        return true;
    }
    return false;
  },

  // DEAD-FLOYD-F
  'DEAD-FLOYD'(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    if (ctx.verb === 'EXAMINE') { g.tell('You turn to look at Floyd, but a tremendous sense of loss overcomes you, and you turn away.'); return true; }
    if (ctx.verb === 'TURN-ON') { g.tell("As you touch Floyd's on-off switch, it falls off in your hands."); return true; }
    if (ctx.verb === 'TURN-OFF') { g.tell("I'm afraid that Floyd has already been turned off, permanently, and gone to that great robot shop in the sky."); return true; }
    return false;
  },

  // GLOBAL-GAMES-F
  'GLOBAL-GAMES'(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT' || ctx.verb !== 'PLAY') return false;
    if (floydHere(g)) g.perform('PLAY-WITH', 'FLOYD'); else g.tell('Okay. Gee, that was fun.');
    return true;
  },

  // HANDS-F
  HANDS(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT' || ctx.verb !== 'SHAKE') return false;
    const h = g.state.here;
    if (g.isIn('AMBASSADOR', h)) g.tell('A repulsive idea.');
    else if (g.isIn('BLATHER', h)) g.tell('Saluting might be a better idea.');
    else if (floydHere(g) && floydOn(g)) g.tell("You shake one of Floyd's grasping extensions.");
    else g.tell("There's no one to shake hands with.");
    return true;
  },
};

export const rooms = {};
export const exits = {};
export const describers = {};

// --- interrupts ------------------------------------------------------------------------------

export const interrupts = {
  // I-FLOYD: runs every turn (tick -1) once Floyd has been switched on. Early returns skip the FLOYD-SPOKE reset,
  // as the RTRUEs in the original do.
  'I-FLOYD'(g) {
    g.queue('I-FLOYD', -1);
    const h = g.state.here, say = t => g.tell(t, 'event');
    if (!floydOn(g)) {
      g.fset('FLOYD', 'ACTORBIT');
      floydComesAlive(g);
    } else if (floydHere(g)) {
      if (!g.getg('FLOYD-INTRODUCED')) {
        g.setg('FLOYD-INTRODUCED', true);
        say('The robot, now apparently active, notices you enter. "Hi," he says. "I\'m Floyd!"');
      } else if (g.getg('FLOYD-FOLLOW') && g.roomFlag(h, 'FLOYDBIT') && g.prob(6)) {
        g.remove('FLOYD'); g.setg('FLOYD-FOLLOW', false);
        say('Floyd says "Floyd going exploring. See you later." He glides out of the room.');
      } else {
        g.setg('FLOYD-FOLLOW', true);
        if (g.prob(40) && !g.getg('FLOYD-SPOKE')) { const line = g.pickOne(FLOYDISMS); if (/Lazarus/.test(line)) g.setg('LAZARUS-MENTIONED', true); say('Floyd ' + line + '.'); return true; }
      }
    } else {  // Floyd is active but not present
      if (g.getg('FLOYD-FOLLOW') && g.prob(80)) {
        if (g.isIn('LAZARUS-PART', h)) { g.setg('FLOYD-FOLLOW', false); say('Floyd starts to follow you but notices the Lazarus breast plate. He sniffs and leaves the room.'); return true; }
        g.move('FLOYD', h); say('Floyd follows you.'); kludge(g);
      } else {
        g.setg('FLOYD-FOLLOW', false);
        const introduce = () => { if (g.getg('FLOYD-INTRODUCED')) return false; callMeFloyd(g); return true; };
        if (here(g, 'BOOTH-1', 'BOOTH-2', 'BOOTH-3')) {
          g.move('FLOYD', h); if (introduce()) return true;
          say('Floyd scampers into the booth. "Oooo, this is a tiny room," he remarks.');
        } else if ((here(g, 'BIO-LOCK-EAST', 'BIO-LOCK-WEST') && !g.getg('FLOYD-GAVE-UP')) || here(g, 'RADIATION-LOCK-EAST', 'RADIATION-LOCK-WEST')) {
          g.move('FLOYD', h); if (introduce()) return true;
          say('Floyd glides after you. "Is this...is this a squash court?" he asks.');
        } else if (here(g, 'ALFIE-CONTROL-EAST', 'ALFIE-CONTROL-WEST', 'BETTY-CONTROL-EAST', 'BETTY-CONTROL-WEST', 'UPPER-ELEVATOR', 'LOWER-ELEVATOR', 'REACTOR-ELEVATOR')
                   || (h === 'MESS-HALL' && g.isIn('FLOYD', 'KITCHEN'))) {
          g.move('FLOYD', h); if (introduce()) return true;
          const what = here(g, 'UPPER-ELEVATOR', 'LOWER-ELEVATOR', 'REACTOR-ELEVATOR') ? 'elevator' : h === 'MESS-HALL' ? 'room' : 'cabin';
          say(`Floyd bounces into the ${what}. "Hey, wait for Floyd!" he yells, smiling broadly.`);
        } else if (h === 'MINI-BOOTH') {
          g.move('FLOYD', h); if (introduce()) return true;
          say('"Hi," whispers Floyd, tiptoeing in. "Are we going to teleport into the computer like Achilles always used to do?"');
        } else if (g.prob(30)) {
          if (h === 'INFIRMARY' && g.getg('LAZARUS-FLAG')) return false;   // depends on: INFIRMARY-F sets LAZARUS-FLAG
          g.move('FLOYD', h);
          if (g.getg('FLOYD-INTRODUCED')) {
            if (g.prob(15) && !g.isIn('ADVENTURER', 'BED')) say('Floyd rushes into the room and barrels into you. "Oops, sorry," he says. "Floyd not looking at where he was going to."');
            else say('Floyd bounds into the room. "Floyd here now!" he cries.');
            kludge(g);
          } else callMeFloyd(g);
        }
      }
    }
    g.setg('FLOYD-SPOKE', false);
  },
};

// --- verb defaults (verbs.zil) ---------------------------------------------------------------

const hackHack = (g, ctx, str) => g.tell(str + D(g, ctx.prso) + g.pickOne(HO_HUM));
const notHolding = (g, id) => g.tell(`You're not holding the ${D(g, id)}.`);

export const verbs = {
  // Deliberate deviation (user decision, 2026-09-12, round twelve): Floyd asks "Tell Floyd a story?" over and over and
  // the game did not hold the word "story", so round twelve's typed tester answered him four times and concluded the
  // parser was broken. The source has no story, so he does not get one: the asking was always the point.
  STORY(g) {
    if (!g.isIn('FLOYD', g.state.here) || !floydOn(g)) { g.tell('There is nobody here to tell a story to.'); return; }
    g.tell('You start in on a story. Floyd listens with his whole body, and after four words he cannot bear the suspense and tells you the ending himself, twice, wrongly. "Floyd loves that one," he says.');
    g.setg('FLOYD-SPOKE', true);
  },
  // V-GIVE with PRE-GIVE
  GIVE(g, ctx) {
    const { prso, prsi } = ctx;
    if (!g.held(prso)) return notHolding(g, prso);
    if (!prsi) return g.tell(`Give the ${D(g, prso)} to whom?`);
    if (!g.fsetP(prsi, 'ACTORBIT')) return g.tell(`You can't give ${g.article(prso)} ${D(g, prso)} to ${g.article(prsi)} ${D(g, prsi)}!`);
    g.tell(`The ${D(g, prsi)} declines your offer.`);
  },
  // V-SHOW
  SHOW(g, ctx) {
    const { prso, prsi } = ctx;
    if (!g.held(prso)) return notHolding(g, prso);
    if (!prsi) return g.tell(`Show the ${D(g, prso)} to whom?`);
    if (prsi === 'ME') return g.perform('EXAMINE', prso);
    if (g.fsetP(prsi, 'ACTORBIT')) return g.tell(`The ${D(g, prsi)} looks at the ${D(g, prso)}.`);
    g.tell(`Why would you want to show something to ${g.article(prso)} ${D(g, prso)}?`);
  },
  // V-PLAY
  PLAY(g, ctx) { g.tell(`How does one play ${g.article(ctx.prso)} ${D(g, ctx.prso)}?`); },
  // V-PLAY-WITH
  'PLAY-WITH'(g, ctx) { if (g.fsetP(ctx.prso, 'ACTORBIT')) return g.perform('PLAY', 'GLOBAL-GAMES'); g.tell('I sometimes wonder about your mental health.'); },
  // V-FOLLOW
  FOLLOW(g, ctx) { g.tell(`The ${D(g, ctx.prso)} is right here!`); },
  // V-LAMP-ON
  'TURN-ON'(g, ctx) {
    const o = ctx.prso;
    if (!g.fsetP(o, 'LIGHTBIT')) return g.tell("You can't turn that on.");
    if (g.fsetP(o, 'ONBIT')) return g.tell("It's already on.");
    g.fset(o, 'ONBIT'); g.tell(`The ${D(g, o)} is now on.`);
  },
  // V-LAMP-OFF
  'TURN-OFF'(g, ctx) {
    const o = ctx.prso;
    if (!g.fsetP(o, 'LIGHTBIT')) return g.tell("You can't turn that off.");
    if (!g.fsetP(o, 'ONBIT')) return g.tell("It's already off.");
    g.fclear(o, 'ONBIT'); g.tell(`The ${D(g, o)} is now off.`);
  },
  // V-KISS
  KISS(g) { g.tell("I'd sooner kiss a pile of Antarian swamp mold."); },
  // V-SCOLD
  SCOLD(g, ctx) { if (g.fsetP(ctx.prso, 'ACTORBIT')) return g.perform('TELL', ctx.prso); g.tell(`For some reason, the ${D(g, ctx.prso)} doesn't seem too chagrined.`); },
  // V-KICK (the parser currently maps "kick" to ATTACK; the verb is here for when it does not)
  KICK(g, ctx) { hackHack(g, ctx, 'Kicking the '); },
  // V-MUNG
  MUNG(g, ctx) { hackHack(g, ctx, 'Trying to destroy the '); },
  // V-SHAKE / V-SHAKE-WITH (the second object selects the WITH form)
  SHAKE(g, ctx) {
    const { prso, prsi } = ctx;
    if (prsi) {
      if (prso !== 'HANDS') return g.tell('Huh?');
      if (g.fsetP(prsi, 'ACTORBIT')) return g.perform('SHAKE', 'HANDS');
      return g.tell(`You can't shake hands with ${g.article(prsi)} ${D(g, prsi)}!`);
    }
    if (!g.held(prso) && prso !== 'HANDS') return notHolding(g, prso);
    // depends on: LASER / OLD-BATTERY / NEW-BATTERY (BATTERY-FALLS) belong to the laser puzzle.
    const inside = g.contents(prso);
    if (!g.fsetP(prso, 'OPENBIT') && inside.length) return g.tell(`It sounds as if there is something inside the ${D(g, prso)}.`);
    if (g.fsetP(prso, 'OPENBIT')) {
      if (prso === 'FOOD-KIT' && ['RED-GOO', 'GREEN-GOO', 'BROWN-GOO'].some(x => g.isIn(x, 'FOOD-KIT'))) { for (const x of ['RED-GOO', 'GREEN-GOO', 'BROWN-GOO']) g.remove(x); return g.tell('Colored goo flies all over everything. Yechh!'); }
      if (inside.length) { for (const x of inside) { if (['HIGH-PROTEIN', 'CHEMICAL-FLUID'].includes(x)) g.remove(x); else g.move(x, g.state.here); } return g.tell(`The contents of the ${D(g, prso)} spill onto the floor.`); }
      return g.tell(`You have shaken the ${D(g, prso)}.`);
    }
    if (g.fsetP(prso, 'CONTBIT')) return g.tell(`The ${D(g, prso)} sounds empty.`);
    g.tell('Shaken.');
  },
  // V-REACH
  REACH(g, ctx) { g.tell(`There is ${g.contents(ctx.prso).length ? 'something' : 'nothing'} inside the ${D(g, ctx.prso)}.`); },
  // V-POINT
  POINT(g, ctx) { if (floydHere(g)) return floydsFamousDoorRoutine(g, ctx.prso); g.tell("It's usually impolite to point."); },
  // V-SCRUB
  SCRUB(g, ctx) {
    const { prso, prsi } = ctx;
    if (!prsi && !g.isIn('SCRUB-BRUSH', 'ADVENTURER') && !g.isIn('TOWEL', 'ADVENTURER')) return g.tell("You don't have anything to scrub with!");
    if (prsi && !['SCRUB-BRUSH', 'TOWEL'].includes(prsi)) return g.tell("You can't scrub something with that!");
    if (g.fsetP(prso, 'ACTORBIT')) return g.tell(`The ${D(g, prso)} prefers cleaning himself.`);
    g.tell(`The ${D(g, prso)} is a bit shinier now.`);
  },
  // V-TELL. depends on: P-CONT (a quoted command after "actor,"); without it the actor just looks expectant.
  TELL(g, ctx) {
    const o = ctx.prso;
    if (o === 'ME') { g.tell('Talking to yourself is a sign of impending mental collapse.'); ctx.fatal = true; return; }
    if (o === 'FLOYD' && floydOn(g) && (ctx.prsi || ctx.topic)) return floydTopic(g, ctx.prsi);
    if (g.fsetP(o, 'ACTORBIT')) return g.tell(`The ${D(g, o)} looks at you expectantly, as though he thought you were about to talk.`);
    g.tell(`Talking to ${g.article(o)} ${D(g, o)}? Dr. Quarnsboggle, the Feinstein's psychiatrist, would ${g.getg('BLOWUP-COUNTER') === 5 ? 'have been' : 'be'} fascinated to hear that.`);
    ctx.fatal = true;
  },
  // V-ASK-FOR ("ask X for Y"; without "for" it is TELL)
  'ASK-FOR'(g, ctx) {
    const { prso, prsi } = ctx;
    if (!prsi) return g.perform('TELL', prso);
    if (!g.fsetP(prso, 'ACTORBIT')) return g.perform('TELL', prso);
    g.tell(g.isIn(prsi, prso) ? `The ${D(g, prso)} doesn't seem inclined to give up the ${D(g, prsi)}.` : `The ${D(g, prso)} isn't holding the ${D(g, prsi)}.`);
  },
};

// Parser phrases for the verbs above: [phrase, VERB, needsObject, preposition]. Synonyms follow syntax.zil.
export const vocabulary = [
  ['give', 'GIVE', 1, 'to'], ['hand', 'GIVE', 1, 'to'], ['offer', 'GIVE', 1, 'to'], ['donate', 'GIVE', 1, 'to'], ['feed', 'GIVE', 1, 'to'],
  ['show', 'SHOW', 1, 'to'],
  ['play with', 'PLAY-WITH', 1], ['play', 'PLAY', 1, 'with'],
  ['follow', 'FOLLOW', 1], ['pursue', 'FOLLOW', 1], ['chase', 'FOLLOW', 1],
  ['turn on', 'TURN-ON', 1], ['activate', 'TURN-ON', 1], ['turn off', 'TURN-OFF', 1],
  ['kiss', 'KISS', 1], ['scold', 'SCOLD', 1], ['yell at', 'SCOLD', 1],
  ['destroy', 'MUNG', 1], ['damage', 'MUNG', 1], ['break', 'MUNG', 1], ['smash', 'MUNG', 1],
  ['shake', 'SHAKE', 1, 'with'],
  ['reach in', 'REACH', 1], ['reach into', 'REACH', 1],
  ['point at', 'POINT', 1], ['point to', 'POINT', 1],
  ['tell a story', 'STORY', 0], ['tell story', 'STORY', 0], ['tell floyd a story', 'STORY', 0], ['tell floyd story', 'STORY', 0],
  ['scrub', 'SCRUB', 1, 'with'], ['clean', 'SCRUB', 1, 'with'], ['polish', 'SCRUB', 1, 'with'],
  ['ask', 'ASK-FOR', 1, 'for'], ['tell', 'ASK-FOR', 1, 'for'],
  ['ask', 'TELL', 1, 'about'], ['tell', 'TELL', 1, 'about'],   // no ASK ABOUT syntax in the source: "ask floyd about X" is talking to Floyd (V-TELL)
  ['listen to', 'LISTEN', 1],   // syntax.zil LISTEN TO OBJECT; the bare "listen" phrase takes no object
];

// Click-menu verbs (see parser.verbsFor): Floyd's on-off switch (FLOYD-F TURN-ON / TURN-OFF); SEARCH comes from SEARCHBIT.
// Floyd is a container in the source (CONTBIT OPENBIT): Close only gets "Huh?", and while he is switched off Look inside
// and Put in are noise next to Search (which finds the card), so they wait until he is on.
// Round eleven (A6): "look inside Floyd" and "search Floyd" are one action in FLOYD-F -- both print the tickling
// paragraph -- so the menu offered two numbers for the same joke. Search keeps it; Look inside is hidden.
// Round twelve (A4): nothing generated is aimed at Floyd's body. The examine knows what the moment is; the laser's
// wildcard did not.
export const notTargets = { 'DEAD-FLOYD': true };

// Deliberate deviation (user decision, 2026-09-12, round twelve): Floyd asks "Tell Floyd a story?" over and over and
// the game did not hold the word "story". Round twelve's typed tester answered him four times and concluded the
// parser was broken. The source has no story, so he does not get one: he admits the asking was the point.
export const menus = { FLOYD: [{ verb: 'TURN-ON', when: g => !floydOn(g) }, { verb: 'TURN-OFF', when: floydOn }, { verb: 'CLOSE', when: () => false }, { verb: 'LOOK-INSIDE', when: () => false }, { verb: 'PUT', when: floydOn }] };
// Deliberate deviation (user decision, 2026-09-10, round five): "ask floyd about X" / "tell floyd about X". The source
// has no topics (V-TELL only has him look at you expectantly); every typed playtester tried it, so Floyd answers in his
// own voice: a few things he has feelings about, and a stock reply for the rest (picked by the thing, so it is stable).
// The parser lets the topic be anything seen elsewhere, or unknown words (parser.parse, TELL ... about).
const CARDS = ['KITCHEN-CARD', 'UPPER-ELEVATOR-CARD', 'LOWER-ELEVATOR-CARD', 'SHUTTLE-CARD', 'TELEPORTATION-CARD', 'MINI-CARD'];
function floydTopic(g, id) {
  g.setg('FLOYD-SPOKE', true);
  if (!id) return g.tell('Floyd looks puzzled. "Floyd never heard of that. Is it a game?"');
  if (id === 'FLOYD') return g.tell('Floyd puffs out his chest. "Floyd is B-19-7, multiple purpose robot! Floyd is very good at Hider-and-Seeker. Also fixing things. Mostly Hider-and-Seeker."');
  if (id === 'ME') return g.tell('"You are Floyd\'s friend!" says Floyd, and gives you a hug that nearly cracks a rib.');
  if (id === 'LAZARUS-PART') return g.tell('Floyd\'s lower lip quivers. "Lazarus was Floyd\'s best friend." He doesn\'t want to talk about it any more.');
  if (CARDS.includes(id)) {
    if (g.getg('CARD-REVEALED') || g.getg('CARD-STOLEN') || g.held('LOWER-ELEVATOR-CARD')) return g.tell('"Cards are neat!" says Floyd. "Floyd likes the kind with the stripe best."');
    return g.tell('Floyd\'s eyes light up. "Cards are neat! Floyd likes cards." He pats one of his compartments and giggles.');
  }
  const name = g.name(id);
  const lines = [
    `Floyd thinks hard about the ${name}. "Floyd doesn't know much about that. Want to play Hider-and-Seeker instead?"`,
    `Floyd scratches his head. "The ${name}? Floyd never played with one of those."`,
    'Floyd shrugs. "Ask a Doctor-person. Floyd only knows about games. And fixing things. A little."',
  ];
  g.tell(lines[[...id].reduce((n, c) => n + c.charCodeAt(0), 0) % lines.length]);
}

// Deliberate deviation (user decision, 2026-09-10, round four): once he has introduced himself ("...to everyperson I'm
// called Floyd"), the narrator and the menus call him Floyd; the source's DESC stays "multiple purpose robot" throughout,
// which the typed playtester took for a second robot. See Game.properName.
export const names = { FLOYD: g => g.getg('FLOYD-INTRODUCED') ? 'Floyd' : null };
// How a topic reads in "Ask about…": his friend, not the breastplate ("medical robot breastplate") you may not have seen.
export const topicNames = { 'LAZARUS-PART': () => 'Lazarus' };
// Orders on Floyd's menu (parser.ordersFor). Fetching the good fromitz board is FLOYD-F's own order branch ("floyd, get
// board", TAKE GOOD-BOARD with Floyd as WINNER), which the click UI could not give: the round-five late-game playtester
// reached the Repair Room, heard Floyd describe the board, and had no way to ask for it.
// Deliberate deviation (user decision, 2026-09-11, round ten): the click layer had exactly one order in the whole
// game -- "get the board", in the Repair Room, in the Lawanda half -- so for the entire first half a mouse player
// had no way to ask Floyd for anything, while a typed player could try "floyd, ..." and get an answer, in character,
// every time. Both round-ten testers said so from opposite directions. These mirror the branches FLOYD-F already
// handles for WINNER = FLOYD: follow, go somewhere, hand something over. Floyd's own refusals do the rest.
const DIR_WORDS = { NORTH: 'north', SOUTH: 'south', EAST: 'east', WEST: 'west', NE: 'northeast', NW: 'northwest', SE: 'southeast', SW: 'southwest', UP: 'up', DOWN: 'down', IN: 'in', OUT: 'out' };
export const orders = {
  FLOYD: [
    { label: g => `Ask ${g.name('FLOYD')} to get the board`, cmd: { verb: 'TAKE', prso: 'GOOD-BOARD' },
      when: g => floydOn(g) && here(g, 'REPAIR-ROOM') && g.getg('BOARD-REPORTED') && g.isIn('GOOD-BOARD', 'ROBOT-HOLE') },
    { label: g => `Ask ${g.name('FLOYD')} to follow you`, cmd: { verb: 'FOLLOW', prso: 'ME' },
      when: g => floydOn(g) && floydHere(g) && !g.getg('FLOYD-FOLLOW') },
  ],
};
// One "go that way" per exit, and one "hand it over" per thing Floyd is carrying, built when the menu is drawn.
export const dynamicOrders = { FLOYD: g => floydOrders(g) };
function floydOrders(g) {
  if (!floydOn(g) || !g.isIn('FLOYD', g.state.here)) return [];
  const out = [];
  for (const e of exitChoices(g)) {
    const word = DIR_WORDS[e.direction];
    if (word) out.push({ label: `Ask ${g.name('FLOYD')} to go ${word}`, cmd: { verb: 'WALK', dir: e.direction } });
  }
  for (const id of g.contents('FLOYD')) out.push({ label: `Ask ${g.name('FLOYD')} for the ${g.name(id)}`, cmd: { verb: 'GIVE', prso: id, prsi: 'ME' } });
  return out;
}
// Floyd's "Ask about…" submenu (parser.topicsFor): the round-five topics (floydTopic) by click, while he is switched on:
// himself, you, what you carry (and in your pockets), and his friend Lazarus once you have found the breastplate.
export const topics = {
  FLOYD: g => {
    if (!floydOn(g)) return [];
    const carried = [];
    for (const id of g.contents('ADVENTURER')) { if (!g.fsetP(id, 'WORNBIT')) carried.push(id); else if (g.seeInside(id)) carried.push(...g.contents(id)); }
    // Deliberate deviation (user decision, 2026-09-11, round eight): also once he has reminisced about Lazarus, so "ask
    // floyd about lazarus" gets his answer instead of "Floyd never heard of that" a turn after he brought him up.
    const lazarus = (g.fsetP('LAZARUS-PART', 'TOUCHBIT') || g.getg('LAZARUS-MENTIONED')) && !carried.includes('LAZARUS-PART') ? ['LAZARUS-PART'] : [];
    // ... and the things drawn in the room (round seven: the key in the crevice, the padlock on the door).
    const around = [...clickableObjects(g)].filter(id => !carried.includes(id) && !g.held(id) && !g.fsetP(id, 'ACTORBIT') && id !== 'LAZARUS-PART');
    return ['FLOYD', 'ME', ...carried, ...lazarus, ...around];
  },
};
// Two-object click-menu entries (see parser.usesFor): showing Floyd the computer print-out (COMPUTER-ACTION).
export const uses = [
  { verb: 'SHOW', prso: ['PRINT-OUT', 'LOWER-ELEVATOR-CARD', 'ROBOT-HOLE'], prsi: ['FLOYD'], label: 'Show to {prsi}' },
];

// Helpers other areas call into (not part of the rules shape the engine reads).
export const helpers = {
  // FLOYD-REVEAL-CARD-F (globals.zil): called by SLOT-F after the kitchen or upper elevator card is used.
  // depends on: the card-slot routine (SLOT-F) and DAY / INTERNAL-MOVES (g.state.time) bookkeeping.
  'FLOYD-REVEAL-CARD-F'(g) {
    const day = g.getg('DAY'), t = g.state.time;
    const chance = (day === 2 && t < 5000 && g.prob(5)) || (day === 2 && t > 4999 && g.prob(10))
      || (day === 3 && t < 5000 && g.prob(20)) || (day === 3 && t > 4999 && g.prob(40)) || day > 3;
    if (!(floydHere(g) && !g.getg('CARD-REVEALED') && chance)) return false;
    g.setg('CARD-REVEALED', true); g.setg('FLOYD-SPOKE', true);
    if (!g.getg('CARD-STOLEN')) {
      g.move('LOWER-ELEVATOR-CARD', 'FLOYD');
      g.tell('Floyd claps his hands with excitement. "Those cards are really neat, huh? Floyd has one for himself--see?" He reaches behind one of his panels and retrieves a magnetic-striped card. He waves it exuberantly in the air.');
    } else g.tell('Floyd bobs up and down with excitement. "Those cards are really neat! Floyd has one, too." He begins searching through his compartments, but finds nothing. He scratches his head and looks confused.');
    return true;
  },
  FLOYDISMS,
};

// Globals from compone.zil / comptwo.zil / globals.zil that Floyd's routines read or write, at their ZIL defaults.
export function setup(g) {
  for (const k of ['FLOYD-SCORE-FLAG', 'FLOYD-SPOKE', 'FLOYD-FOLLOW', 'FLOYD-REACTIVATED', 'FLOYD-INTRODUCED', 'CARD-STOLEN', 'CARD-REVEALED',
                   'HOLE-TRIP-FLAG', 'BOARD-REPORTED', 'ACHILLES-FLAG', 'COMPUTER-FLAG', 'FLOYD-WAITING', 'FLOYD-GAVE-UP', 'LAZARUS-FLAG']) {
    if (g.getg(k) === undefined) g.setg(k, false);
  }
}
