// Hand-ported rules for the Bio Lab, the miniaturization sequence inside the computer, and the endgame:
//   - the bio-lock (BIO-LOCK-WEST, BIO-LOCK-EAST) with its two doors and their auto-close clocks;
//   - Floyd's foray into the Bio Lab for the miniaturization card (BIO-LOCK-EAST-F, I-FLOYD-FORAY,
//     I-CLEAR-FLOYD-PEER, MINI-CARD-F, MONSTER-DEATH) and his death; DEAD-FLOYD-F itself is in floyd.js;
//   - the Bio Lab (BIO-LAB-F), its mutants (GRUE-F; RAT-ANT, TROLL and the truncated TRIFFID have no routine),
//     the fungicide mist (I-UNFLOOD) and the chase to the cryo-elevator (I-CHASE-SCENE);
//   - the Miniaturization Booth (V-TYPE, KEYBOARD-PSEUDO, IN-BOOTH-PSEUDO, I-TURNOFF-MINI), the robot
//     doorway in the Repair Room (ROBOT-HOLE-F), Station 384 (STATION-384-F, PLATE-PSEUDO, I-ANNOUNCEMENT)
//     and the strip (MIDDLE-OF-STRIP-F, STRIP-F, MICROBE-F, I-MICROBE, SHOOT-MICROBE, I-FRY);
//   - the radiation lab's clock (I-NUKED-BLUE) and the comm room's I-UNENTER, which the coverage report
//     lists with this area;
//   - the ending in the Cryo-Anteroom (CRYO-ANTEROOM-F).
// Each block names the ZIL routine it ports (comptwo.zil unless noted; globals.zil for the pseudos, verbs.zil
// for V-TYPE, compone.zil for I-UNENTER). Text is copied verbatim; "|" in the source is a line break here.
//
// depends on (other modules):
//   floyd.js      FLOYD-F, I-FLOYD, DEAD-FLOYD-F; COMPUTER-FLAG (Floyd has noticed the broken computer);
//                 FLOYD-WAITING / FLOYD-GAVE-UP are read by floyd.js and written here.
//   kalamontee.js SLOT-F sets MINI-ACTIVATED and queues I-TURNOFF-MINI when the mini card goes through the
//                 booth slot; WINDOW-F shows the card through the bio-lock window; SET/TURN verbs.
//   lawanda.js    COMPUTER-FIXED (SHOOT-SPECK), LAB-LIGHTS-ON / LAB-FLOODED and the office buttons that queue
//                 I-UNFLOOD (FUNGICIDE-BUTTON-F), RADIATION-LAB-F (queues I-NUKED-BLUE), COMM-FIXED,
//                 DEFENSE-FIXED, COURSE-CONTROL-FIXED, LIBRARY-TYPE (reached through helpers['LIBRARY-TYPE']).
//   lower.js      LASER, LASER-SETTING, WARMTH-FLAG, I-WARMTH and the verb ZAP: V-ZAP should call
//                 helpers['SHOOT-MICROBE'] when the target is the microbe (and I-FRY is queued by SHOOT-SPECK).
//   connectors.js CRYO-BUTTON-PSEUDO (disables I-CHASE-SCENE), STRIP-NEAR-RELAY-F (the microbe follows),
//                 VOID-PSEUDO (performs THROW-OFF on the STRIP), RELAY-F.

const here = (g, ...rooms) => rooms.includes(g.state.here);
const obj = ctx => ctx.rarg === 'M-OBJECT';
const is = (ctx, ...verbs) => verbs.includes(ctx.verb);
const D = (g, id) => g.name(id);
const say = (g, text) => g.tell(text, 'event');

const BOTH_DOORS = 'A very bored-sounding recorded voice explains that, in order to prevent contamination, both lock doors cannot be open simultaneously.';   // BOTH-DOORS
const DOOR_OPENS = 'The door opens.';                                             // DOOR-OPENS
const DOOR_CLOSES = 'The door closes.';                                           // DOOR-CLOSES
const ALREADY_OPEN = "It's already open!";                                        // ALREADY-OPEN (globals.zil)
const IS_CLOSED = 'It is closed!';                                                // IS-CLOSED (globals.zil)
const FAMILIAR_WRENCHING = 'You feel the familiar wrenching of your innards, and find yourself in a vast room whose distant walls are rushing straight toward you...';   // FAMILIAR-WRENCHING
const MONSTER_ENTRANCES = [                                                       // MONSTER-ENTRANCES (PLTABLE)
  'The growling humanoid is charging straight at you, waving his axe-like implement!',
  'A pair of slavering fangs removes part of your clothing!',
  'Needle-sharp mandibles nip at your arms!',
  'The mobile plant whips its poisonous tentacles against your ankles!'];
const WINNER_ATTACKED = [                                                         // WINNER-ATTACKED
  'A pseudopod extends toward you. You jump back just in time to avoid being engulfed.',
  'A slimy pseudopod brushes against your shoulder. You twist away in the nick of time.',
  'A pseudopod shoots out toward your head! Ducking quickly, you save your life.',
  'Two protoplasm-filled blobs sneak toward you from the left. You jump to the side and almost fall off the strip into the void below!'];
const MONSTER_CLOSES = [                                                          // MONSTER-CLOSES
  'The microbe slithers closer. The cilia around its gullet glisten with mucus, giving the impression that the microbe is salivating.',
  'The microbe flows toward you. It towers above you, its cilia waving madly in your face.',
  'The monster wriggles nearer. It is now so close that you can make out details in the protoplasm beneath its translucent skin.'];
const MICROBE_STRIKES = [                                                         // MICROBE-STRIKES
  "The microbe's outer membrane sizzles a bit, and some protoplasm oozes out. The microbe recoils momentarily, but quickly recovers.",
  "The beam slices through the microbe's skin! A tremendous shudder passes through the microbe, but the wound quickly seals itself.",
  'The monster rears back for a moment, but almost as soon as the beam goes off, it advances again.'];
const MUTANTS = ['RAT-ANT', 'TRIFFID', 'TROLL', 'GRUE'];
const STRIP_ROOMS = ['MIDDLE-OF-STRIP', 'STRIP-NEAR-STATION', 'STRIP-NEAR-RELAY'];

// MONSTER-DEATH
function monsterDeath(g) {
  g.jigsUp('The biological nightmares reach you. Gripping coils wrap around your limbs as powerful teeth begin tearing at your flesh. Something bites your leg, and you feel a powerful poison begin to work its numbing effects...');
}
// NUMBERS-ONLY (verbs.zil)
function numbersOnly(g) { g.tell('This keyboard only has numeric keys. You can type numbers on it, but not words.'); }
// FINISH (verbs.zil) for a completed game: the score, then the session is over. engine gap: FINISH has no
// "won" state in the engine; state.dead is the only game-over it knows, so the ending sets it (with
// state.finished so the presentation can tell a victory from a death).
function finish(g) {
  g.crlf(); g.verbs.SCORE(g, { verb: 'SCORE' });
  g.state.finished = true; g.state.dead = true;
}
// SHOOT-MICROBE: called by V-ZAP (lower.js) when the laser is fired at the microbe. depends on: LASER-SETTING
function shootMicrobe(g) {
  let text = 'The laser beam strikes the microbe';
  if (g.getg('LASER-SETTING') === 1) text += ', but passes harmlessly through its red skin.';
  else { g.setg('MICROBE-HIT', true); text += '. ' + g.pickOne(MICROBE_STRIKES); }
  g.tell(text);
  return true;
}
// BEAM-COLOR (comptwo.zil), indexed by LASER-SETTING; lower.js keeps the same table for LASER-F.
const BEAM_COLOR = [null, 'red', 'orange', 'yellow', 'green', 'blue', 'violet'];
// BEAM-MISSES (comptwo.zil)
const BEAM_MISSES = ['The beam just misses the speck!', 'A near miss!', 'A good shot, but just a little wide of the target.'];
// SHOOT-SPECK (comptwo.zil): called by V-ZAP (lower.js) when the laser is fired at the speck. Only setting 1 is
// fine enough; the chance of a hit starts at MARKSMANSHIP-COUNTER (0) and grows by 12 per miss, and the speck takes
// two hits (SPECK-HIT). Any other setting destroys the relay. depends on: LASER-SETTING (lower.js), CRYO-ELEVATOR-DOOR
// (connectors.js); the PROJCON-OFFICE TOUCHBIT clear makes the office describe itself afresh without the mural.
function shootSpeck(g) {
  if (g.getg('LASER-SETTING') === 1) {
    if (g.prob(g.getg('MARKSMANSHIP-COUNTER'))) {
      if (g.getg('SPECK-HIT')) {
        g.setg('COMPUTER-FIXED', true);
        g.fset('CRYO-ELEVATOR-DOOR', 'OPENBIT'); g.fclear('CRYO-ELEVATOR-DOOR', 'INVISIBLE');
        g.state.rooms['PROJCON-OFFICE'].touched = false;
        g.queue('I-FRY', 200);
        g.state.score += 8;
        g.remove('SPECK');
        g.tell('The beam hits the speck again! This time, it vaporizes into a fine cloud of ash. The relay slowly begins to close, and a voice whispers in your ear "Sector 384 will activate in 200 millichrons. Proceed to exit station."');
      } else {
        g.setg('SPECK-HIT', true);
        g.tell("The speck is hit by the beam! It sizzles a little, but isn't destroyed yet.");
      }
    } else {
      g.setg('MARKSMANSHIP-COUNTER', g.getg('MARKSMANSHIP-COUNTER') + 12);
      g.tell(g.pickOne(BEAM_MISSES));
    }
  } else {
    g.remove('RELAY');
    g.tell(`A thin ${BEAM_COLOR[g.getg('LASER-SETTING')]} beam shoots from the laser and slices through the red plastic covering of the relay like a hot knife through butter. Air rushes into the relay, which collapses into a heap of plastic shards.`);
  }
  return true;
}

export const rooms = {
  // BIO-LOCK-EAST-F: Floyd peers through the window, sees the card, and (once he knows the computer is broken)
  // volunteers to fetch it; then he waits, with dwindling patience, for you to open the door.
  'BIO-LOCK-EAST'(g, ctx) {
    if (ctx.rarg !== 'M-END' || !g.isIn('FLOYD', g.state.here) || !g.fsetP('FLOYD', 'RLANDBIT') || g.getg('WINNER') === 'FLOYD') return false;
    if (g.getg('FLOYD-WAITING')) {
      if (g.getg('WAITING-COUNTER') > 3) {
        g.setg('FLOYD-WAITING', false); g.setg('FLOYD-GAVE-UP', true); g.setg('FLOYD-SPOKE', true); g.setg('FLOYD-FOLLOW', false);
        g.move('FLOYD', 'BIO-LOCK-WEST'); g.queue('I-FLOYD', 1);
        say(g, '"Okay," says Floyd with uncharacteristic annoyance. "Forget about the stupid card." He goes to the other end of the bio-lock and sulks.');
      } else if (!g.getg('FLOYD-FORAYED')) {
        g.setg('FLOYD-SPOKE', true); g.setg('WAITING-COUNTER', g.getg('WAITING-COUNTER') + 1);
        say(g, 'Floyd looks at you with a dash of impatience and a healthy helping of nervousness. "Well?" he asks. "Are you going to open the door?"');
      }
    } else if (!g.getg('FLOYD-GAVE-UP') && !g.getg('FLOYD-PEERED')) {
      g.setg('FLOYD-SPOKE', true); g.setg('FLOYD-PEERED', true); g.queue('I-CLEAR-FLOYD-PEER', 40);
      g.fclear('MINI-CARD', 'INVISIBLE');
      let text = 'Floyd stands on his tiptoes and peers in the window. ';
      if (g.getg('COMPUTER-FLAG')) {
        g.setg('FLOYD-WAITING', true);
        text += '"Looks dangerous in there," says Floyd. "I don\'t think you should go inside." He peers in again. "We\'ll need card there to fix computer. Hmmm... I know! Floyd will get card. Robots are tough. Nothing can hurt robots. You open the door, then Floyd will rush in. Then you close door. When Floyd knocks, open door again. Okay? Go!" Floyd\'s voice trembles slightly as he waits for you to open the door.';
      } else text += '"Ooo, look," he says. "There\'s a miniaturization booth access card!"';
      say(g, text);
    }
    return false;
  },
  // BIO-LAB-F: M-LOOK is in world.json (LAB-LIGHTS-ON). Every turn spent inside starts the chase clock and, unless
  // the fungicide mist is up and you wear the gas mask, kills you.
  'BIO-LAB'(g, ctx) {
    if (ctx.rarg !== 'M-END') return false;
    g.queue('I-CHASE-SCENE', -1);
    g.disable('I-SLEEP-WARNINGS');   // "don't fall asleep in mid-chase"
    if (g.getg('LAB-FLOODED')) {
      const mist = 'The air is filled with mist, which is affecting the mutants. They appear to be stunned and confused, but are slowly recovering.';
      if (!g.fsetP('GAS-MASK', 'WORNBIT')) g.jigsUp(mist + " Unfortunately, you don't seem to be that hardy.");
      else g.tell(mist);
    } else g.jigsUp('The mutants attack you and rip you to shreds within seconds.');
    return false;
  },
  // STATION-384-F: the plates are the booth's far end. Arriving by TYPE does nothing (BEEN-HERE is set after);
  // walking back onto the plates sends you to the booth, or to the Auxiliary Booth once the computer is fixed.
  'STATION-384'(g, ctx) {
    if (ctx.rarg !== 'M-ENTER' || !g.getg('BEEN-HERE')) return false;
    g.setg('BEEN-HERE', false);
    if (g.getg('COMPUTER-FIXED')) {
      g.queue('I-ANNOUNCEMENT', 130);
      g.tell('A voice seems to whisper in your ear "Main Miniaturization and Teleportation Booth has malfunctioned...switching to Auxiliary Booth..." ' + FAMILIAR_WRENCHING);
      g.goto('AUXILIARY-BOOTH');
      return 2;   // RFATAL: the station is never described
    }
    g.tell(FAMILIAR_WRENCHING);
    g.goto('MINI-BOOTH', false);   // <GOTO ,MINI-BOOTH <>>: no look
    return 2;
  },
  // MIDDLE-OF-STRIP-F: on the way back from the repaired relay a microbe drops onto the strip behind you.
  'MIDDLE-OF-STRIP'(g, ctx) {
    if (ctx.rarg !== 'M-ENTER') return false;
    if (g.getg('COMPUTER-FIXED') && g.getg('NO-MICROBE') && !g.getg('MICROBE-DISPATCHED')) {
      g.move('MICROBE', g.state.here); g.queue('I-MICROBE', -1); g.setg('NO-MICROBE', false);
      g.tell('Suddenly, with a loud plop, a giant elephant-sized monster lands on the strip just in front of you. It is amorphously shaped, its skin a slimy translucent red membrane. While most of your brain screams with panic about the disgusting monster that now blocks your exit, some small section in the back of your mind calmly realizes that this is merely some tiny microbe which has somehow violated the sterile environment of the computer interior.\n\nAs you stand frozen with fear, the microbe slithers toward you, extending slimy pseudopods thick with waving cilia. It looks pretty hungry, and seems intent on having you for lunch.');
      g.crlf();
    }
    return false;
  },
  // CRYO-ANTEROOM-F: M-LOOK is in world.json; the first turn spent here is the ending. depends on: COMM-FIXED,
  // DEFENSE-FIXED, COURSE-CONTROL-FIXED (lawanda / tower areas)
  'CRYO-ANTEROOM'(g, ctx) {
    if (ctx.rarg !== 'M-END') return false;
    const shipHere = g.getg('COMM-FIXED') && g.getg('DEFENSE-FIXED');
    g.tell('A door slides open and a medical robot glides in. It opens the cryo-unit and administers an injection to its inhabitant. As the robot glides away, a figure rises from the cryo-unit -- a handsome, middle-aged woman with flowing red hair. She spends some time studying readouts from the control panel' + (shipHere ? ', pressing several keys.' : '.'));
    if (g.getg('COURSE-CONTROL-FIXED')) {
      g.tell('\nAs other cryo-units in the chambers beyond begin opening, the woman turns to you, bows gracefully, and speaks in a beautiful, lilting voice. "I am Veldina, leader of Resida. Thanks to you, the cure has been discovered, and the planetary systems repaired. We are eternally grateful."');
      if (shipHere) {
        g.tell('\n"You will also be glad to hear that a ship of your Stellar Patrol now orbits the planet. I have sent them the coordinates for this room." As if on cue, a landing party from the S.P.S. Flathead materializes nearby. Blather is with them, having been picked up from deep space in another escape pod, babbling cravenly. Captain Sterling of the Flathead acknowledges your heroic actions, and informs you of your promotion to Lieutenant First Class.\n\nAs a team of mutant hunters head for the cryo-elevator, Veldina mentions that the grateful people of Resida offer you leadership of their world. Captain Sterling points out that, even if you choose to remain on Resida, Blather (demoted to Ensign Twelfth Class) has been assigned as your personal toilet attendant.\n\nYou feel a sting from your arm and turn to see a medical robot moving away after administering the antidote for The Disease.\n\nA team of robot technicians step into the anteroom. They part their ranks, and a familiar figure comes bounding toward you! "Hi!" shouts Floyd, with uncontrolled enthusiasm. "Floyd feeling better now!" Smiling from ear to ear, he says, "Look what Floyd found!" He hands you a helicopter key, a reactor elevator card, and a paddleball set. "Maybe we can use them in the sequel..."');
        g.crlf();
      } else {
        g.tell('\n"Unfortunately, a second ship from your Stellar Patrol has ' + (!g.getg('DEFENSE-FIXED') ? 'been destroyed by our malfunctioning meteor defenses.' : 'come looking for survivors, and because of our malfunctioning communications system, has given up and departed.')
          + ' I fear that you are stranded on Resida, possibly forever. However, we show our gratitude by offering you an unlimited bank account and a house in the country."');
        g.crlf();
      }
    } else {
      g.tell('\nShe turns to you and, with a strained voice says, "You have fixed our computer and a Cure has been discovered, and we are grateful. But alas, it was all in vain. Our planetary course control system has malfunctioned, and the orbit has now decayed beyond correction. Soon Resida will plunge into the sun."');
      g.crlf();
      if (shipHere) { g.tell('Veldina examines the control panel again. "Fortunately, another ship from your Stellar Patrol has arrived, so at least you will survive." At that moment, a landing party from the S.P.S. Flathead materializes, and takes you away from the doomed world.'); g.crlf(); }
    }
    finish(g);
    return true;
  },
};

export const objects = {
  // BIO-DOOR-EAST-F: the lab door. Opening it is the start of Floyd's foray, or death, or (after the foray) a
  // door that closes itself after 30.
  'BIO-DOOR-EAST'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'OPEN')) {
      if (g.fsetP('BIO-DOOR-EAST', 'OPENBIT')) g.tell(ALREADY_OPEN);
      else if (g.fsetP('BIO-DOOR-WEST', 'OPENBIT')) g.tell(BOTH_DOORS);
      else if (g.getg('FLOYD-WAITING') && g.fsetP('FLOYD', 'RLANDBIT') && g.getg('FORAY-COUNTER') === 0) {
        g.queue('I-FLOYD-FORAY', -1); g.setg('FLOYD-FORAYED', true); g.fset('BIO-DOOR-EAST', 'OPENBIT');
        g.remove('FLOYD'); g.disable('I-FLOYD');
        g.tell('The door opens and Floyd, pausing only for the briefest moment, plunges into the Bio Lab. Immediately, he is set upon by hideous, mutated monsters! More are heading straight toward the open door! Floyd shrieks and yells to you to close the door.');
      } else if (!g.getg('FLOYD-FORAYED') && !g.enabled('I-CHASE-SCENE')) {
        g.jigsUp('Opening the door reveals a Bio-Lab full of horrible mutations. You stare at them, frozen with horror. Growling with hunger and delight, the mutations march into the bio-lock and devour you.');
      } else { g.fset('BIO-DOOR-EAST', 'OPENBIT'); g.queue('I-BIO-EAST-CLOSES', 30); g.tell(DOOR_OPENS); }
      return true;
    }
    if (is(ctx, 'CLOSE')) {
      if (g.fsetP('BIO-DOOR-EAST', 'OPENBIT')) {
        if (g.getg('FORAY-COUNTER') === 4) g.state.elapsed = 95;
        g.fclear('BIO-DOOR-EAST', 'OPENBIT');
        g.tell('The door closes' + (g.enabled('I-CHASE-SCENE') ? ', but not soon enough!' : '.'));
      } else g.tell(IS_CLOSED);
      return true;
    }
    return false;
  },
  // BIO-DOOR-WEST-F: the bio-lock door to the main lab.
  'BIO-DOOR-WEST'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'OPEN')) {
      if (g.fsetP('BIO-DOOR-WEST', 'OPENBIT')) g.tell(ALREADY_OPEN);
      else if (g.fsetP('BIO-DOOR-EAST', 'OPENBIT')) g.tell(BOTH_DOORS);
      else { g.tell(DOOR_OPENS); g.queue('I-BIO-WEST-CLOSES', 30); g.fset('BIO-DOOR-WEST', 'OPENBIT'); }
      return true;
    }
    if (is(ctx, 'CLOSE')) {
      if (g.fsetP('BIO-DOOR-WEST', 'OPENBIT')) { g.fclear('BIO-DOOR-WEST', 'OPENBIT'); g.tell(DOOR_CLOSES); }
      else g.tell(IS_CLOSED);
      return true;
    }
    return false;
  },
  // MINI-CARD-F: while it lies inside the Bio Lab (NDESCBIT) it can only be seen through the window.
  'MINI-CARD'(g, ctx) {
    if (!obj(ctx)) return false;
    if (g.rules.helpers['SCRAMBLED-CARD']?.(g, ctx)) return true;   // lower.js: a card the magnet has spoiled shows it
    if (g.fsetP('MINI-CARD', 'NDESCBIT') && is(ctx, 'RUB', 'MOVE', 'TURN', 'SET', 'TAKE', 'PUSH', 'PULL', 'SMELL')) { g.tell("It's in the next room."); return true; }
    return false;
  },
  // ROBOT-HOLE-F: the robot-sized doorway in the Repair Room. Floyd's trip through it is in floyd.js.
  'ROBOT-HOLE'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell("It's too small for you to get through. It was presumably intended for robots, such as the broken repair robot lying over there."); return true; }
    if (is(ctx, 'LOOK-INSIDE')) { g.tell('You can make out a small supply room of some sort.'); return true; }
    if (is(ctx, 'OPEN', 'CLOSE')) { g.tell("There's no door, just an opening in the wall."); return true; }
    return false;
  },
  // GRUE-F: only answers when the grue is not in the room (the source's check; the parser rarely offers it then).
  GRUE(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'EXAMINE') || g.isIn('GRUE', g.state.here)) return false;
    g.tell('Grues are vicious, carnivorous beasts first introduced to Earth by a visiting alien spaceship during the late 22nd century. Grues spread throughout the galaxy alongside man. Although now extinct on all civilized planets, they still exist in some backwater corners of the galaxy. Their favorite diet is Ensigns Seventh Class, but their insatiable appetite is tempered by their fear of light.');
    return true;
  },
  // RAT-ANT, TROLL: no routine in the source. TRIFFID: comptwo.zil is cut off inside its record (after
  // "(FLAGS ACTORBI"), so it has its LDESC and vocabulary but no flags or action to port; I-CHASE-SCENE moves it.

  // MICROBE-F: talking is hopeless; feeding it the hot laser is one way to be rid of it.
  // depends on: LASER, WARMTH-FLAG, I-WARMTH (lower.js)
  MICROBE(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'HELLO', 'TALK') || g.getg('WINNER') === 'MICROBE') {
      g.tell("You don't seem to have bridged the vast communication gulf between yourself and the microbe.");
      ctx.fatal = true; return true;
    }
    if (is(ctx, 'THROW', 'GIVE') && ctx.prsi === 'MICROBE') {
      if (ctx.prso === 'LASER' && g.getg('WARMTH-FLAG') > 7) {
        g.remove('LASER'); g.disable('I-WARMTH');
        if (g.getg('WARMTH-FLAG') > 10) {
          g.disable('I-MICROBE');
          g.tell('The microbe gobbles up the laser and turns toward you. A moment later, it begins writhing in pain. Apparently, eating the hot laser was a bit too much for it. With a bellow of agony, it rolls off the edge of the strip. (Whew!)');
          g.remove('LASER'); g.remove('MICROBE'); g.setg('NO-MICROBE', true); g.setg('MICROBE-DISPATCHED', true);
        } else g.tell('The microbe greedily devours the laser, and turns toward you.');
      } else g.tell(`The microbe ignores the ${D(g, ctx.prso)}, but does attempt to digest your arm.`);
      return true;
    }
    return false;
  },
  // STRIP-F: things thrown off the strip are gone; a hot laser takes the microbe with it. The THROW-OFF syntax
  // takes a held object (the original parser's HAVE check), so the guard here uses NOT-HOLDING's text.
  STRIP(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'THROW-OFF')) return false;
    const o = ctx.prso;
    if (!g.held(o)) { g.tell(`You're not holding the ${D(g, o)}.`); return true; }
    if (o === 'LASER' && g.getg('WARMTH-FLAG') > 7) {
      g.disable('I-WARMTH'); g.disable('I-MICROBE');
      g.tell('As the laser flies over the edge of the strip, the hungry microbe lunges after it. Both the laser and the microbe plummet into the void. (Whew!)');
      g.remove('LASER'); g.remove('MICROBE'); g.setg('NO-MICROBE', true); g.setg('MICROBE-DISPATCHED', true);
    } else {
      if (o === 'LASER') g.disable('I-WARMTH');
      g.remove(o);
      g.tell(`The ${D(g, o)} flies over the edge of the strip and disappears into the void.`);
    }
    return true;
  },
};

export const exits = {};
export const describers = {};

export const interrupts = {
  // I-CLEAR-FLOYD-PEER: Floyd may peer through the window again after 40.
  'I-CLEAR-FLOYD-PEER'(g) { g.setg('FLOYD-PEERED', false); return false; },
  // I-BIO-EAST-CLOSES / I-BIO-WEST-CLOSES: the lock doors close themselves 30 after opening.
  'I-BIO-EAST-CLOSES'(g) {
    if (!g.fsetP('BIO-DOOR-EAST', 'OPENBIT')) return;
    g.fclear('BIO-DOOR-EAST', 'OPENBIT');
    if (here(g, 'BIO-LOCK-EAST', 'BIO-LOCK-WEST', 'BIO-LAB')) say(g, 'The door at the eastern end of the bio-lock closes silently.');
  },
  'I-BIO-WEST-CLOSES'(g) {
    if (!g.fsetP('BIO-DOOR-WEST', 'OPENBIT')) return;
    g.fclear('BIO-DOOR-WEST', 'OPENBIT');
    if (here(g, 'BIO-LOCK-WEST', 'BIO-LOCK-EAST', 'MAIN-LAB')) say(g, 'The door at the western end of the bio-lock closes silently.');
  },
  // I-FLOYD-FORAY: runs every turn from the moment Floyd plunges in. Sounds through the door on 2 and 3; on 4 the
  // door must be open for him to stumble out with the card; on 5 it must be closed again, and Floyd dies.
  'I-FLOYD-FORAY'(g) {
    const c = g.getg('FORAY-COUNTER') + 1; g.setg('FORAY-COUNTER', c);
    const open = g.fsetP('BIO-DOOR-EAST', 'OPENBIT');
    if (c === 2) {
      if (open) { g.crlf(); monsterDeath(g); }
      else say(g, 'From within the lab you hear ferocious growlings, the sounds of a skirmish, and then a high-pitched metallic scream!');
    } else if (c === 3) {
      if (open) { g.crlf(); monsterDeath(g); }
      else say(g, 'You hear, slightly muffled by the door, three fast knocks, followed by the distinctive sound of tearing metal.');
    } else if (c === 4) {
      if (open) { g.move('FLOYD', g.state.here); say(g, 'Floyd stumbles out of the Bio Lab, clutching the mini-booth card. The mutations rush toward the open doorway!'); }
      else {
        say(g, 'The three knocks come again, followed by a wild scream. Then, all is silence from within the Bio Lab, except for an occasional metallic crunch.');
        g.fclear('FLOYD', 'RLANDBIT'); g.disable('I-FLOYD-FORAY');
      }
    } else if (c === 5) {
      if (open) { g.crlf(); monsterDeath(g); return; }
      g.remove('FLOYD'); g.fclear('FLOYD', 'RLANDBIT'); g.disable('I-FLOYD'); g.fset('FLOYD', 'INVISIBLE');
      g.move('DEAD-FLOYD', g.state.here); g.move('MINI-CARD', 'BIO-LOCK-EAST'); g.fset('MINI-CARD', 'TOUCHBIT');
      g.state.score += 2;
      say(g, "And not a moment too soon! You hear a pounding from the door as the monsters within vent their frustration at losing their prey.\n\nFloyd staggers to the ground, dropping the mini card. He is badly torn apart, with loose wires and broken circuits everywhere. Oil flows from his lubrication system. He obviously has only moments to live.\n\nYou drop to your knees and cradle Floyd's head in your lap. Floyd looks up at his friend with half-open eyes. \"Floyd did it ... got card. Floyd a good friend, huh?\" Quietly, you sing Floyd's favorite song, the Ballad of the Starcrossed Miner:\n\nO, they ruled the solar system\nNear ten thousand years before\nIn their single starcrossed scout ships\nMining ast'roids, spinning lore.\n\nThen one true courageous miner\nSpied a spaceship from the stars\nBoarded he that alien liner\nOut beyond the orb of Mars.\n\nYes, that ship was filled with danger\nMighty monsters barred his way\nYet he solved the alien myst'ries\nMining quite a lode that day.\n\nO, they ruled the solar system\nNear ten thousand years before\n'Til one brave advent'rous spirit\nBrought that mighty ship to shore.\n\nAs you finish the last verse, Floyd smiles with contentment, and then his eyes close as his head rolls to one side. You sit in silence for a moment, in memory of a brave friend who gave his life so that you might live.");
      g.fclear('FLOYD', 'RLANDBIT'); g.fclear('MINI-CARD', 'NDESCBIT'); g.disable('I-FLOYD-FORAY');
    }
  },
  // I-CHASE-SCENE: every turn once you have stood in the Bio Lab. While the mist is up nothing happens; after it
  // clears the mutants follow you room by room and catch you if you stand still, double back, or dawdle in the
  // cryo-elevator. The source tests VERB? WALK for doubling back; this engine's interrupts do not see the verb,
  // so "you moved this turn" (HERE differs from the last room recorded) stands in for it.
  'I-CHASE-SCENE'(g) {
    const h = g.state.here, flooded = g.getg('LAB-FLOODED');
    if (g.isIn('RAT-ANT', h) && !flooded) { g.jigsUp('\nDozens of hungry eyes fix on you as the mutations surround you and begin feasting.'); return; }
    if (!flooded) {
      if (h === 'BIO-LOCK-WEST' && !g.getg('EXTRA-MOVE-FLAG')) { g.setg('EXTRA-MOVE-FLAG', true); say(g, 'The monsters gallop toward you, smacking their lips.'); }
      else if (h === 'CRYO-ELEVATOR' && !g.getg('CRYO-MOVE-FLAG')) { g.setg('CRYO-MOVE-FLAG', true); say(g, 'The monsters are storming straight toward the elevator door!'); }
      else if (h === g.getg('SECOND-TO-LAST-ROOM') && h !== g.getg('LAST-CHASE-ROOM')) { g.jigsUp('\nYou stupidly run right into the jaws of the pursuing mutants.'); return; }
      else {
        if (h === 'CRYO-ELEVATOR') { g.crlf(); monsterDeath(g); return; }
        for (const m of MUTANTS) g.move(m, h);
        say(g, 'The mutants ' + (h === 'BIO-LOCK-WEST' ? 'are almost upon you now!' : 'burst into the room right on your heels! ' + g.pickOne(MONSTER_ENTRANCES)));
      }
    }
    g.setg('SECOND-TO-LAST-ROOM', g.getg('LAST-CHASE-ROOM')); g.setg('LAST-CHASE-ROOM', h);
  },
  // I-NUKED-BLUE: three stages of radiation sickness after entering the Radiation Lab. depends on: RADIATION-LAB-F
  // queues it (lawanda.js).
  'I-NUKED-BLUE'(g) {
    g.queue('I-NUKED-BLUE', -1);
    const n = g.getg('NUKED-COUNTER') + 1; g.setg('NUKED-COUNTER', n);
    if (n === 1) say(g, 'You suddenly feel sick and dizzy.');
    else if (n === 2) say(g, 'You feel incredibly nauseous and begin vomiting. Also, all your hair has fallen out.' + (g.isIn('FLOYD', g.state.here) ? ' Floyd points at you and laughs hysterically. "You look funny with no hair," he gasps.' : ''));
    else if (n === 3) g.jigsUp('\nIt seems you have picked up a bad case of radiation poisoning.');
  },
  // I-UNFLOOD: the fungicide mist clears 50 after the button. depends on: FUNGICIDE-BUTTON-F (lawanda.js) queues it.
  'I-UNFLOOD'(g) {
    g.setg('LAB-FLOODED', false);
    if (here(g, 'BIO-LAB')) say(g, 'The last traces of mist in the air vanish. The mutants, recovering quickly, notice you and begin salivating.');
    else if (here(g, 'LAB-OFFICE') && g.fsetP('OFFICE-DOOR', 'OPENBIT')) say(g, 'The mist in the Bio Lab clears. The mutants recover and rush toward the door!');
  },
  // I-TURNOFF-MINI: the card's activation lapses 30 after the slot. depends on: SLOT-F (kalamontee.js) queues it.
  'I-TURNOFF-MINI'(g) {
    g.setg('MINI-ACTIVATED', false);
    if (here(g, 'MINI-BOOTH')) say(g, 'A recorded voice says "Miniaturization booth de-activated."');
  },
  // I-ANNOUNCEMENT: queued by STATION-384-F when you leave the repaired computer.
  'I-ANNOUNCEMENT'(g) { say(g, 'A recorded announcement blares from the public address system. "Revival procedure beginning. Cryo-chamber access from Project Control Office now open."'); },
  // I-FRY: Sector 384 comes back to life 200 after the speck is destroyed. depends on: SHOOT-SPECK (lower.js) queues it.
  'I-FRY'(g) {
    if (!here(g, ...STRIP_ROOMS)) return;
    g.crlf();
    g.jigsUp('\nWith a furious storm of electrical mayhem, Sector 384 comes to life. A few micro-volts course through the silicon strip on which you stand. Unfortunately, at your current size, this is enough to barbecue you.');
  },
  // I-MICROBE: every turn while the microbe is on the strip. A hit (SHOOT-MICROBE) only makes it lash out; otherwise
  // it closes in and swallows you on the third turn. depends on: WARMTH-FLAG, LASER (lower.js)
  'I-MICROBE'(g) {
    if (g.getg('MICROBE-HIT') === true) {
      const attacked = g.pickOne(WINNER_ATTACKED), warmth = g.getg('WARMTH-FLAG'), laserHeld = g.isIn('LASER', 'ADVENTURER');
      if (warmth > 13 && laserHeld) { g.jigsUp(attacked + ' The microbe, whipped into a rabid frenzy by the waves of heat from the pulsing laser, literally lunges at it. You jump back and, losing your balance, fall over the edge of the strip. The microbe, writhing madly, hurls itself after its prey. You and the microbe both plunge into the void below.'); return; }
      say(g, attacked + (warmth > 7 && laserHeld ? " Another pseudopod, perhaps attracted by the warmth of the laser, tries to envelop the weapon. You snatch it away from the monster's grasp." : ''));
    } else if (g.getg('MICROBE-COUNTER') === 2) { g.jigsUp('\nThe microbe wraps several pseudopods around you and shoves you into its mucus-covered gullet. Digestive juices begin their work. The experience is not pleasant.'); return; }
    else { g.setg('MICROBE-COUNTER', g.getg('MICROBE-COUNTER') + 1); say(g, g.pickOne(MONSTER_CLOSES)); }
    g.setg('MICROBE-HIT', false);
  },
  // I-UNENTER (compone.zil): re-arms the comm room's "just entered" flag once you have left it.
  'I-UNENTER'(g) {
    if (!here(g, 'COMM-ROOM')) { g.setg('JUST-ENTERED', true); g.disable('I-UNENTER'); }
    return false;
  },
};

// Room PSEUDO scenery routines (globals.zil) for the rooms this module owns.
export const pseudos = {
  // KEYBOARD-PSEUDO (Miniaturization Booth)
  'KEYBOARD-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE')) { g.tell('It is a standard numeric keyboard with ten keys labelled from 0 through 9.'); return true; } return false; },
  // CRACK-PSEUDO (Bio Lab, Radiation Lab)
  'CRACK-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('The crack is too small to go through, but large enough to look through.'); return true; }
    if (is(ctx, 'LOOK-INSIDE')) { g.tell(here(g, 'RADIATION-LAB') ? 'You see a dimly lit Bio Lab. Sinister shapes lurk about within.' : 'You see a laboratory suffused with a pale blue glow.'); return true; }
    return false;
  },
  // PLATE-PSEUDO (Station 384)
  'PLATE-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE')) { g.tell('The plates seem to be featureless metal squares.'); return true; } return false; },
  // IN-BOOTH-PSEUDO (Miniaturization Booth, Auxiliary Booth, and the teleportation booths)
  'IN-BOOTH-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'THROUGH', 'BOARD', 'WALK-TO')) { g.tell("You're already in the booth!"); return true; }
    if (is(ctx, 'DROP', 'EXIT', 'DISEMBARK')) { g.doWalk('OUT'); return true; }
    return false;
  },
};

// The Repair Room's robot-sized doorway stays on the compass: its refusal says why you cannot follow Floyd.
export const showBlocked = { 'REPAIR-ROOM': ['NORTH'] };
export const menus = {
  'KEYBOARD-PSEUDO': [{ verb: 'TYPE', number: true }],   // the miniaturization booth's keyboard: "Type a number"
  'ROBOT-HOLE': [{ verb: 'OPEN', when: () => false }],   // ROBOT-HOLE-F: "There's no door, just an opening in the wall."
  MICROBE: ['TALK'],   // it is an actor already; listed so the click path to the (fatal-to-conversation) reply is explicit
  'MINI-CARD': [{ verb: 'TAKE', when: g => !g.fsetP('MINI-CARD', 'NDESCBIT') }],   // seen through the window it is "in the next room"
};

// Two-object click-menu entries (see parser.usesFor): things go over the edge of the strip (STRIP-F THROW-OFF).
export const uses = [
  { verb: 'THROW-OFF', prso: ['LASER', 'OLD-BATTERY', 'NEW-BATTERY', 'MINI-CARD', 'FOOD-KIT', 'CANTEEN'], prsi: ['STRIP'], label: 'Throw off the strip' },
];

// Verb defaults from verbs.zil that this area needs and no other module provides.
export const verbs = {
  // V-TYPE. The parser has no numeric literals (engine gap: INTNUM / P-NUMBER), so the number is read from the
  // typed text, as kalamontee.js does for PUSH-NUMBER and SET; without one PRSO is not INTNUM.
  // depends on: LIBRARY-TYPE (lawanda.js) through helpers['LIBRARY-TYPE'].
  // V-TYPE is ported in rules/lawanda.js (it also parses the typed number/noun); the MINI-BOOTH branch there
  // covers this area, and LIBRARY-TYPE is reached through helpers.
};

// Parser phrases from syntax.zil: TYPE OBJECT / TYPE IN OBJECT (the number is read from the text), and the
// THROW ... OFF/OVER form of V-THROW-OFF added to the existing "throw" phrase.
export const vocabulary = [
  ['type', 'TYPE', 0], ['type in', 'TYPE', 0],
  ['throw', 'THROW-OFF', 1, 'off|over'],
];

// Cross-area routines.
export const helpers = {
  'SHOOT-MICROBE': shootMicrobe,     // for V-ZAP (lower.js)
  'SHOOT-SPECK': shootSpeck,         // for V-ZAP (lower.js)
  'MONSTER-DEATH': monsterDeath,
};

// Globals this area owns (comptwo.zil / compone.zil defaults). Globals other modules own are only given their
// ZIL default when nothing has set them (COMPUTER-FIXED in connectors.js; FLOYD-* in floyd.js; WARMTH-FLAG and
// LASER-SETTING in lower.js; COMM-FIXED, DEFENSE-FIXED, COURSE-CONTROL-FIXED, LAB-LIGHTS-ON, LAB-FLOODED in lawanda.js).
export function setup(g) {
  // Deliberate deviation (user decision, 2026-09-11, round nine): Infocom's typo "The is the second half of the
  // sterilization chamber" (comptwo.zil 1705) reads "This is".
  const typo = g.rooms.get('BIO-LOCK-EAST')?.description.segments.find(s => s.type === 'text' && s.text.startsWith('The is the second half'));
  if (typo) typo.text = typo.text.replace(/^The is/, 'This is');
  for (const [k, v] of Object.entries({ 'FLOYD-PEERED': false, 'WAITING-COUNTER': 0, 'FLOYD-FORAYED': false, 'FORAY-COUNTER': 0,
    'EXTRA-MOVE-FLAG': false, 'CRYO-MOVE-FLAG': false, 'LAST-CHASE-ROOM': null, 'SECOND-TO-LAST-ROOM': null, 'NUKED-COUNTER': 0,
    'MINI-ACTIVATED': false, 'BEEN-HERE': false, 'MICROBE-HIT': false, 'JUST-ENTERED': true, 'SPECK-HIT': false, 'MARKSMANSHIP-COUNTER': 0 })) g.setg(k, v);
  for (const [k, v] of Object.entries({ 'FLOYD-WAITING': false, 'FLOYD-GAVE-UP': false, 'COMPUTER-FLAG': false, 'COMPUTER-FIXED': false,
    'NO-MICROBE': true, 'MICROBE-DISPATCHED': false, 'MICROBE-COUNTER': 0, 'LAB-LIGHTS-ON': false, 'LAB-FLOODED': false,
    'COMM-FIXED': false, 'DEFENSE-FIXED': false, 'COURSE-CONTROL-FIXED': false, 'WARMTH-FLAG': 0, 'LASER-SETTING': 5, 'P-NUMBER': 0 })) {
    if (g.getg(k) === undefined) g.setg(k, v);
  }
}
