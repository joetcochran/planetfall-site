// Hand-ported rules for the SPS Feinstein opening: Deck Nine, the gangway, Deck Eight, the reactor
// lobby, the brig, the escape pod, and the trip down to the crag.
// Each block names the ZIL routine it ports (globals.zil / misc.zil) so it can be checked against the source.

const AMBASSADOR_QUOTES = [
  "introduces himself as Br'gun-te'elkner-ipg'nun.", 'asks if you are performing some sort of religious ceremony.',
  'inquires whether you are interested in a game of Bocci.', 'recites a plea for coexistence between your races.',
  'asks where Admiral Smithers can be found.', 'remarks that all humans look alike to him.', 'offers you a bit of celery.'];
const CANT_GO = "You can't go that way.";
const here = (g, ...rooms) => rooms.includes(g.state.here);

export const objects = {
  // POD-DOOR-F
  'POD-DOOR'(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    if (ctx.verb === 'OPEN') {
      if (g.fsetP('POD-DOOR', 'OPENBIT')) g.tell("It's already open!");
      else if (g.getg('TRIP-COUNTER') > 14) { g.fset('POD-DOOR', 'OPENBIT'); g.tell('The bulkhead opens and cold ocean water rushes in!'); }
      else if (g.getg('BLOWUP-COUNTER') > 0) g.tell(here(g, 'DECK-NINE') ? "Too late. The pod's launching procedure has already begun." : 'Opening the door now would be a phenomenally stupid idea.');
      else g.tell("Why open the door to the emergency escape pod if there's no emergency?");
      return true;
    }
    if (ctx.verb === 'CLOSE') { g.tell(g.fsetP('POD-DOOR', 'OPENBIT') ? "You can't close it yourself." : 'It is closed!'); return true; }
    if (ctx.verb === 'THROUGH') { g.doWalk(here(g, 'DECK-NINE') ? 'WEST' : 'OUT'); return true; }
    return false;
  },
  // GANGWAY-DOOR-F is shared by both emergency bulkheads.
  'GANGWAY-DOOR': bulkhead('GANGWAY-DOOR'),
  'CORRIDOR-DOOR': bulkhead('CORRIDOR-DOOR'),
  // GLOBAL-POD-F
  'GLOBAL-POD'(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    if (['THROUGH', 'BOARD', 'WALK-TO'].includes(ctx.verb)) { if (here(g, 'ESCAPE-POD')) g.tell("You're already in it!"); else g.doWalk('WEST'); return true; }
    if (['EXIT', 'DISEMBARK', 'DROP'].includes(ctx.verb)) { if (here(g, 'DECK-NINE')) g.tell("You're not in it!"); else g.doWalk('OUT'); return true; }
    if (ctx.verb === 'OPEN') { g.perform('OPEN', 'POD-DOOR'); return true; }
    return false;
  },
  // SAFETY-WEB-F
  'SAFETY-WEB'(g, ctx) {
    const v = ctx.verb, obj = ctx.rarg === 'M-OBJECT';
    if (obj && v === 'EXAMINE') { g.tell('The safety webbing fills most of the pod. It could accomodate from one to, perhaps, twenty people.'); return true; }
    if (obj && v === 'TAKE') { g.tell('The safety web seems to be more intended for getting into than grabbing onto.'); return true; }
    if (obj && ['BOARD', 'CLIMB-ON'].includes(v)) { g.move('ADVENTURER', 'SAFETY-WEB'); g.tell('You are now safely cushioned within the web.'); return true; }
    if (ctx.rarg === 'M-BEG' && ['OPEN', 'TAKE'].includes(v)) { g.tell(ctx.prso === 'SAFETY-WEB' ? "You're in it!" : "You can't reach it from here."); return true; }
    if (ctx.rarg === 'M-BEG' && v === 'WALK') { g.tell("You'll have to stand up, first."); ctx.fatal = true; return true; }
    if (obj && ['EXIT', 'DISEMBARK', 'DROP', 'STAND', 'TAKE-OFF'].includes(v) && g.isIn('ADVENTURER', 'SAFETY-WEB')) {
      g.move('ADVENTURER', g.state.here);
      if (g.getg('TRIP-COUNTER') > 14 && !g.enabled('I-SINK-POD')) { g.queue('I-SINK-POD', -1); g.tell('As you stand, the pod shifts slightly and you feel it falling. A moment later, the fall stops with a shock, and you see water rising past the viewport.'); }
      else g.tell('You are standing again.');
      return true;
    }
    return false;
  },
  // BLATHER-F
  BLATHER(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    switch (g.getg('WINNER') === 'BLATHER' ? 'TALK' : ctx.verb) {   // addressed by name ("blather, ..."), the source answers as for TALK
      case 'TALK': case 'HELLO': g.tell('Blather shouts "Speak when you\'re spoken to, Ensign Seventh Class!" He breaks three pencil points in a frenzied rush to give you more demerits.'); ctx.fatal = true; return true;
      case 'ATTACK': case 'KICK': g.jigsUp('Blather removes several of your appendages and internal organs.'); return true;
      case 'SALUTE': g.tell('Blather\'s sneer softens a bit. "First right thing you\'ve done today. Only five demerits."'); return true;
      case 'EXAMINE': g.tell('Ensign Blather is a tall, beefy officer with a tremendous, misshapen nose. His uniform is perfect in every respect, and the crease in his trousers could probably slice diamonds in half.'); return true;
      case 'TAKE': g.tell('Blather brushes you away, muttering about suspended shore leave.'); return true;
      case 'THROW': if (ctx.prsi === 'BLATHER') { g.move(ctx.prso, g.state.here); g.tell(`The ${g.name(ctx.prso)} bounces off Blather's bulbous nose. He becomes livid, orders you to do five hundred push-ups, gives you ten thousand demerits, and assigns you five years of extra galley duty.`); return true; } return false;
    }
    return false;
  },
  // AMBASSADOR-F
  AMBASSADOR(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    switch (g.getg('WINNER') === 'AMBASSADOR' ? 'TALK' : ctx.verb) {   // addressed by name ("ambassador, ..."), the source answers as for TALK
      case 'TALK': case 'HELLO': g.tell('The ambassador taps his translator, and then touches his center knee to his left ear (the Blow\'k-bibben-Gordoan equivalent of shrugging).'); ctx.fatal = true; return true;
      case 'ATTACK': case 'KICK': g.tell('The ambassador is startled, and emits an amazing quantity of slime which spreads across the section of the deck you just polished.'); return true;
      case 'EXAMINE': g.tell('The ambassador has around twenty eyes, seven of which are currently open. Half of his six legs are retracted. Green slime oozes from multiple orifices in his scaly skin. He speaks through a mechanical translator slung around his neck.'); return true;
      case 'LISTEN': g.tell('The alien makes a wheezing noise as he breathes.'); return true;
    }
    return false;
  },
  // CELERY-F
  CELERY(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    if (ctx.verb === 'EAT') { g.jigsUp("Oops. Looks like Blow'k-Bibben-Gordoan metabolism is not compatible with our own. You die of all sorts of convulsions."); return true; }
    if (ctx.verb === 'TAKE') { g.tell('The ambassador seems perturbed by your lack of normal protocol.'); return true; }
    return false;
  },
  // PATROL-UNIFORM-F
  'PATROL-UNIFORM'(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    if (ctx.verb === 'EXAMINE') {
      g.tell('It is a standard-issue one-pocket Stellar Patrol uniform, a miracle of modern technology. It will keep its owner warm in cold climates and cool in warm locales. It provides protection against mild radiation, repels all insects, absorbs sweat, promotes healthy skin tone, and on top of everything else, it is super-comfy.'
        + (g.getg('TRIP-COUNTER') === 15 ? ' There are definitely worse things to find yourself wearing when stranded on a strange planet.' : ''));
      return true;
    }
    if (ctx.verb === 'TAKE-OFF' && g.fsetP('PATROL-UNIFORM', 'WORNBIT')) {
      g.fclear('PATROL-UNIFORM', 'WORNBIT');
      let t = 'You have removed your Patrol uniform.';
      if (g.getg('TRIP-COUNTER') === 15) t += ' You suddenly realize how warm it is. You also feel naked and vulnerable.';
      if (g.isIn('BLATHER', g.state.here)) t += ' "Removing your uniform while on duty? Five hundred demerits!"';
      else if (g.isIn('FLOYD', g.state.here)) t += ' Floyd giggles. "You look funny without any clothes on."';
      g.tell(t); return true;
    }
    if (['OPEN', 'CLOSE'].includes(ctx.verb)) { g.tell("There's no way to open or close the pocket of the Patrol uniform."); return true; }
    return false;
  },
  // CHRONOMETER-F
  CHRONOMETER(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT' || !['EXAMINE', 'READ'].includes(ctx.verb)) return false;
    g.tell(`It is a standard wrist chronometer with a digital display. According to the chronometer, the current time is ${g.state.time}. The back is engraved with the message "Good luck in the Patrol! Love, Mom and Dad."`);
    return true;
  },
  // TOWEL-F
  TOWEL(g, ctx) { if (ctx.rarg === 'M-OBJECT' && ctx.verb === 'EXAMINE') { g.tell('A pretty ordinary towel. Something is written in its corner.'); return true; } return false; },
  // CONTROLS-F (escape pod branch)
  CONTROLS(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    if (['RUB', 'PUSH', 'PULL', 'TAKE', 'EXAMINE', 'TURN', 'MOVE'].includes(ctx.verb)) {
      g.tell(here(g, 'ESCAPE-POD') ? 'The controls are entirely automated.' : "The controls are incredibly complicated and you shouldn't even be thinking about touching them."); return true;
    }
    return false;
  },
  // WINDOW-F (escape pod branch)
  WINDOW(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT' || !['LOOK-INSIDE', 'EXAMINE'].includes(ctx.verb)) return false;
    if (here(g, 'ESCAPE-POD')) {
      const t = g.getg('TRIP-COUNTER') ?? 0;
      g.tell(t < 2 ? 'You can see debris from the exploding Feinstein.' : t > 8 ? 'You can see a planet, hopefully a hospitable one.' : 'The window has polarized to blackness.'); return true;
    }
    if (here(g, 'BALCONY')) { g.tell('Water. Lots and lots of water.'); return true; }
    return false;
  },
  // CLIFF-F / OCEAN-F (crag)
  CLIFF(g, ctx) { if (ctx.rarg !== 'M-OBJECT') return false; if (['CLIMB-UP', 'CLIMB-ON'].includes(ctx.verb)) { g.doWalk('UP'); return true; } if (ctx.verb === 'CLIMB-DOWN') { g.doWalk('DOWN'); return true; } return false; },
  OCEAN(g, ctx) { if (ctx.rarg !== 'M-OBJECT') return false; if (['TAKE', 'THROUGH', 'RUB'].includes(ctx.verb)) { g.tell("You can't reach the ocean from here."); return true; } if (ctx.verb === 'EXAMINE') { g.tell('It stretches as far as you can see.'); return true; } return false; },
  STAIRS(g, ctx) { if (ctx.rarg !== 'M-OBJECT') return false; if (['CLIMB-UP', 'CLIMB-ON', 'THROUGH'].includes(ctx.verb)) { g.doWalk(here(g, 'DECK-EIGHT') ? 'DOWN' : 'UP'); return true; } if (ctx.verb === 'CLIMB-DOWN') { g.doWalk('DOWN'); return true; } return false; },
};

function bulkhead(id) {
  return (g, ctx) => {
    if (ctx.rarg !== 'M-OBJECT') return false;
    if (ctx.verb === 'OPEN') { g.tell(g.fsetP(id, 'OPENBIT') ? "It's already open!" : "There doesn't seem to be any way to open it."); return true; }
    if (ctx.verb === 'CLOSE') { g.tell(g.fsetP(id, 'OPENBIT') ? "You can't close it yourself." : 'It is closed!'); return true; }
    return false;
  };
}

export const rooms = {
  // GANGWAY-F
  GANGWAY(g, ctx) { if (ctx.rarg === 'M-END' && g.prob(15) && g.getg('BLOWUP-COUNTER') === 0) g.tell('You hear a distant bellowing ... something about an Ensign Seventh Class whose life is in danger.'); return false; },
  // CRAG-F
  CRAG(g, ctx) { if (ctx.rarg === 'M-ENTER') g.setg('DROWN', 3); return false; },
  // UNDERWATER-F: every turn spent underwater counts toward drowning; reaching the crag resets it.
  UNDERWATER(g, ctx) { if (ctx.rarg === 'M-END') { g.setg('DROWN', (g.getg('DROWN') ?? 0) + 1); if (g.getg('DROWN') > 2) g.jigsUp('A mighty undertow drags you across some underwater obstructions.'); } return false; },
};

// Doors the routine exits check, so the scene draws them and the exit menu can open them.
export const exitDoors = { 'POD-EXIT-F': 'POD-DOOR' };
// POD-EXIT-F refuses UP while the pod is docked and EAST once it has sunk ("You can't go that way."), so the compass
// and the scene leave out the one that can only refuse (the click playtest found the sunk pod's east exit listed).
// Blocked exits kept on the compass (parser.exitChoices): Blather barring the way and the locked cell door are part of
// the opening scene, and the room text names those exits.
export const showBlocked = { 'DECK-EIGHT': ['EAST', 'WEST', 'NORTH'], 'REACTOR-LOBBY': ['SOUTH', 'EAST'], BRIG: ['SOUTH'] };
export const exitVisible = { 'POD-EXIT-F': (g, dir) => g.getg('BLOWUP-COUNTER') > 4 ? dir !== 'EAST' : dir !== 'UP' };
// The pod door and the two bulkheads only close by themselves ("You can't close it yourself."): no Close entry.
const never = () => false;
// The emergency bulkheads only move by themselves ("There doesn't seem to be any way to open it."): neither Open nor Close.
export const menus = { 'POD-DOOR': [{ verb: 'CLOSE', when: never }], 'GANGWAY-DOOR': [{ verb: 'OPEN', when: never }, { verb: 'CLOSE', when: never }], 'CORRIDOR-DOOR': [{ verb: 'OPEN', when: never }, { verb: 'CLOSE', when: never }] };

export const exits = {
  // POD-EXIT-F: where EAST/OUT/UP from the pod lead, depending on the phase of the trip.
  'POD-EXIT-F'(g, dir) {
    if (g.getg('BLOWUP-COUNTER') > 4) {
      if (dir === 'EAST') { g.tell(CANT_GO); return null; }
      if (!g.fsetP('POD-DOOR', 'OPENBIT')) { g.tell('The pod door is closed.'); return null; }
      g.state.elapsed = 30; return 'UNDERWATER';
    }
    if (dir === 'UP') { g.tell(CANT_GO); return null; }
    if (!g.fsetP('POD-DOOR', 'OPENBIT')) { g.tell('The pod door is closed.'); return null; }
    return 'DECK-NINE';
  },
  // WATER-LEVEL-F: the sea rises one room a day.
  //
  // Deliberate deviation (user decision, 2026-09-12, round eleven), exitLabels below: this is the only exit in the
  // game with no destination on its button, and from the second day down it is the sea and instant death. The room
  // text does say the crag is under water; the button said nothing at all, and both testers pressed it and drowned.
  'WATER-LEVEL-F'(g) {
    const day = g.getg('DAY');
    if (here(g, 'BALCONY')) return day === 1 ? 'CRAG' : 'UNDERWATER';
    if (here(g, 'WINDING-STAIR')) return day < 4 ? 'BALCONY' : 'UNDERWATER';
    if (here(g, 'COURTYARD')) return day < 6 ? 'WINDING-STAIR' : 'UNDERWATER';
    return null;
  },
};

// What the compass writes after "go down" where WATER-LEVEL-F decides the way: the room below, or the sea.
export const exitLabels = {
  'WATER-LEVEL-F'(g) {
    const day = g.getg('DAY');
    const drowned = here(g, 'BALCONY') ? day > 1 : here(g, 'WINDING-STAIR') ? day >= 4 : here(g, 'COURTYARD') ? day >= 6 : false;
    return drowned ? 'into the water' : null;
  },
};

export const interrupts = {
  // I-RANDOM-INTERRUPTS: only the part that schedules the explosion is ported; comm/laser setup belongs to later areas.
  'I-RANDOM-INTERRUPTS'(g) { g.queue('I-BLOWUP-FEINSTEIN', g.random(90) + 240); g.setg('NUMBER-NEEDED', g.random(1000)); },
  // I-BLATHER
  'I-BLATHER'(g) {
    const h = g.state.here;
    if (h === 'DECK-EIGHT' || h === 'REACTOR-LOBBY') {
      if (g.isIn('BLATHER', h)) {
        g.setg('BRIGS-UP', (g.getg('BRIGS-UP') ?? 0) + 1);
        if (g.getg('BRIGS-UP') > 3) {
          g.tell("Blather loses his last vestige of patience and drags you to the Feinstein's brig. He throws you in, and the door clangs shut behind you.", 'event');
          // As globals.zil 688-691 has it: GOTO BRIG, then ROB ADVENTURER CRAG (everything carried goes to the Crag),
          // then MOVE PADLOCK HERE -- HERE being the Brig by then. The port had dropped the ROB and put the padlock
          // in the room Blather caught you in.
          g.goto('BRIG');
          for (const x of g.contents('ADVENTURER')) g.move(x, 'CRAG');
          g.move('PADLOCK', 'BRIG'); g.fclear('PADLOCK', 'TAKEBIT');
        } else g.tell('"I said to return to your post, Ensign Seventh Class!" bellows Blather, turning a deepening shade of crimson.', 'event');
      } else if (g.getg('BLOWUP-COUNTER') === 0) {
        g.move('BLATHER', h); g.state.lastObject = 'BLATHER';
        g.tell('Ensign Blather, his uniform immaculate, enters and notices you are away from your post. "Twenty demerits, Ensign Seventh Class!" bellows Blather. "Forty if you\'re not back on Deck Nine in five seconds!" He curls his face into a hideous mask of disgust at your unbelievable negligence.', 'event');
      }
    } else if (h === 'DECK-NINE') {
      if (g.getg('BLATHER-LEAVE') === 3 && g.isIn('BLATHER', h)) {
        g.setg('BLATHER-LEAVE', 0); g.remove('BLATHER');
        g.tell('Blather, adding fifty more demerits for good measure, moves off in search of more young ensigns to terrorize.', 'event');
      } else if (g.isIn('BLATHER', 'DECK-NINE')) {
        g.setg('BLATHER-LEAVE', (g.getg('BLATHER-LEAVE') ?? 0) + 1);
      } else if (!g.isIn('AMBASSADOR', h) && g.getg('BLOWUP-COUNTER') === 0 && g.prob(5)) {
        g.move('BLATHER', h); g.state.lastObject = 'BLATHER';
        g.tell('Ensign First Class Blather swaggers in. He studies your work with half-closed eyes. "You call this polishing, Ensign Seventh Class?" he sneers. "We have a position for an Ensign Ninth Class in the toilet-scrubbing division, you know. Thirty demerits.'
          + (!g.fsetP('PATROL-UNIFORM', 'WORNBIT') ? ' And another sixty for improper dress!' : '') + '" He glares at you, his arms crossed.', 'event');
      }
    }
  },
  // I-AMBASSADOR
  'I-AMBASSADOR'(g) {
    const h = g.state.here;
    if ((g.getg('AMBASSADOR-LEAVE') ?? 0) > 2 && g.isIn('AMBASSADOR', h)) {
      g.remove('AMBASSADOR'); g.remove('CELERY');
      if (h === 'DECK-NINE') g.tell('The ambassador grunts a polite farewell, and disappears up the gangway, leaving a trail of dripping slime.', 'event');
      g.disable('I-AMBASSADOR');
    } else if (g.isIn('AMBASSADOR', 'DECK-NINE')) {
      g.setg('AMBASSADOR-LEAVE', (g.getg('AMBASSADOR-LEAVE') ?? 0) + 1);
      if (h === 'DECK-NINE') g.tell('The ambassador ' + g.pickOne(AMBASSADOR_QUOTES), 'event');
    } else if (h === 'DECK-NINE' && !g.isIn('AMBASSADOR', h) && !g.isIn('BLATHER', h) && g.getg('BLOWUP-COUNTER') === 0 && g.prob(15)) {
      g.move('AMBASSADOR', h); g.move('CELERY', h); g.state.lastObject = 'AMBASSADOR'; g.move('BROCHURE', 'ADVENTURER');
      g.tell("The alien ambassador from the planet Blow'k-bibben-Gordo ambles toward you from down the corridor. He is munching on something resembling an enormous stalk of celery, and he leaves a trail of green slime on the deck. He stops nearby, and you wince as a pool of slime begins forming beneath him on your newly-polished deck. The ambassador wheezes loudly and hands you a brochure outlining his planet's major exports.", 'event');
    }
  },
  // I-BLOWUP-FEINSTEIN
  'I-BLOWUP-FEINSTEIN'(g) {
    g.queue('I-BLOWUP-FEINSTEIN', -1);
    const c = (g.getg('BLOWUP-COUNTER') ?? 0) + 1; g.setg('BLOWUP-COUNTER', c);
    const h = g.state.here;
    if (c === 5) {
      if (h === 'DECK-NINE') return g.jigsUp('An enormous explosion tears the walls of the ship apart. If only you had made it to an escape pod...');
      g.tell('Through the viewport of the pod you see the Feinstein dwindle as you head away. Bursts of light dot its hull. Suddenly, a huge explosion blows the Feinstein into tiny pieces, sending the escape pod tumbling away!', 'event');
      g.queue('I-POD-TRIP', -1); g.disable('I-BLOWUP-FEINSTEIN');
      if (!g.isIn('ADVENTURER', 'SAFETY-WEB') && g.prob(20)) return g.jigsUp('You are thrown against the bulkhead, head first. It seems that getting in the safety webbing would have been a good idea.');
      if (!g.isIn('ADVENTURER', 'SAFETY-WEB')) g.tell('You are thrown against the bulkhead, bruising a few limbs. The safety webbing might have offered a bit more protection.', 'event');
    } else if (c === 4) {
      g.disable('I-BLATHER'); g.disable('I-AMBASSADOR');
      g.tell(h === 'DECK-NINE' ? 'Explosions continue to rock the ship.' : 'You feel the pod begin to slide down its ejection tube as explosions shake the mother ship.', 'event');
    } else if (c === 3) {
      g.fclear('POD-DOOR', 'OPENBIT');
      if (h === 'DECK-NINE') g.tell('More powerful explosions buffet the ship. The lights flicker madly, and the escape-pod bulkhead clangs shut.', 'event');
      else if (h === 'ESCAPE-POD') g.tell('The pod door clangs shut as heavy explosions continue to buffet the Feinstein.', 'event');
      else g.jigsUp("The ship rocks from the force of multiple explosions. The lights go out, and you feel a sudden drop in pressure accompanied by a loud hissing. Too bad you weren't in the escape pod...");
    } else if (c === 2) {
      for (const d of ['CORRIDOR-DOOR', 'GANGWAY-DOOR']) { g.fclear(d, 'OPENBIT'); g.fclear(d, 'INVISIBLE'); }
      if (h === 'DECK-NINE') g.tell('More distant explosions! A narrow emergency bulkhead at the base of the gangway and a wider one along the corridor to starboard both crash shut!', 'event');
      else if (h === 'ESCAPE-POD' || h === 'BRIG') g.tell('The ship shakes again. You hear, from close by, the sounds of emergency bulkheads closing.', 'event');
      else if (h === 'GANGWAY') g.tell('Another explosion. A narrow bulkhead at the base of the gangway slams shut!', 'event');
      else {
        let t = 'You are deafened by more explosions and by the sound of emergency bulkheads slamming closed. ';
        if (g.isIn('BLATHER', h)) t += 'Blather, foaming slightly at the mouth, screams at you to swab the decks';
        else { g.move('BLATHER', h); t += 'Blather enters, looking confused, and begins ranting madly at you'; }
        g.tell(t + '.', 'event');
      }
    } else if (c === 1) {
      g.setg('BRIGS-UP', 0); g.fset('POD-DOOR', 'OPENBIT');
      let t = 'A massive explosion rocks the ship. Echoes from the explosion resound deafeningly down the halls. ';
      if (h === 'DECK-NINE') {
        t += 'The door to port slides open. ';
        if (g.isIn('AMBASSADOR', h)) { g.remove('AMBASSADOR'); g.remove('CELERY'); t += 'The ambassador squawks frantically, evacuates a massive load of gooey slime, and rushes away.'; }
        else if (g.isIn('BLATHER', h)) { g.remove('BLATHER'); t += 'Blather, confused by this non-routine occurrence, orders you to continue scrubbing the floor, and then dashes off.'; }
      } else if (!['ESCAPE-POD', 'GANGWAY', 'BRIG'].includes(h)) t += 'Blather, looking slightly disoriented, barks at you to resume your assigned duties.';
      g.tell(t.trim(), 'event');
    }
  },
  // I-POD-TRIP
  'I-POD-TRIP'(g) {
    const t = (g.getg('TRIP-COUNTER') ?? 0) + 1; g.setg('TRIP-COUNTER', t);
    const say = s => g.tell(s, 'event');
    if (t === 1) say('As the escape pod tumbles away from the former location of the Feinstein, its gyroscopes whine. The pod slowly stops tumbling. Lights on the control panel blink furiously as the autopilot searches for a reasonable destination.');
    else if (t === 2) say("The auxiliary rockets fire briefly, and a nearby planet swings into view through the port. It appears to be almost entirely ocean, with just a few visible islands and an unusually small polar ice cap. A moment later, the system's sun swings into view, and the viewport polarizes into a featureless black rectangle.");
    else if (t === 3) say('The main thrusters fire a long, gentle burst. A monotonic voice issues from the control panel. "Approaching planet...human-habitable."');
    else if (t === 7) say("The pod is buffeted as it enters the planet's atmosphere.");
    else if (t === 8) say("You feel the temperature begin to rise, and the pod's climate control system roars as it labors to compensate.");
    else if (t === 9) say("The viewport suddenly becomes transparent again, giving you a view of endless ocean below. The lights on the control panel flash madly as the pod's computer searches for a suitable landing site. The thrusters fire long and hard, slowing the pod's descent.");
    else if (t === 10) say('The pod is now approaching the closer of a pair of islands. It appears to be surrounded by sheer cliffs rising from the water, and is topped by a wide plateau. The plateau seems to be covered by a sprawling complex of buildings.');
    else if (t === 11) {
      if (g.isIn('ADVENTURER', 'SAFETY-WEB')) {
        g.move('FOOD-KIT', g.state.here); g.move('TOWEL', g.state.here);
        say('The pod lands with a thud. Through the viewport you can see a rocky cleft and some water below. The pod rocks gently back and forth as if it was precariously balanced. A previously unseen panel slides open, revealing some emergency provisions, including a survival kit and a towel.');
        g.setg('TRIP-COUNTER', 15); g.disable('I-POD-TRIP');
      } else g.jigsUp('The pod, whose automated controls were unfortunately designed by computer scientists, lands with a good deal of force. Your body sails across the pod until it is stopped by one of the sharper corners of the control panel.');
    }
  },
  // I-SINK-POD
  'I-SINK-POD'(g) {
    const s = (g.getg('SINK-COUNTER') ?? 0) + 1; g.setg('SINK-COUNTER', s);
    if (g.state.here !== 'ESCAPE-POD') return;
    if (s === 3) g.tell('The pod is now completely submerged, and you feel it smash against underwater rocks. Bubbles streaming upward past the window indicate that the pod is continuing to sink.', 'event');
    else if (s === 4 && !g.fsetP('POD-DOOR', 'OPENBIT')) g.tell('The pod creaks ominously from the increasing pressure.', 'event');
    else if (s === 5) g.jigsUp(g.fsetP('POD-DOOR', 'OPENBIT') ? "Between the swirling waters and the increasing pressure, it's curtains for you. Perhaps you should have left the pod a bit sooner." : 'The pod splits open, and water pours in.');
  },
};

// Room PSEUDO scenery routines (globals.zil) for Deck Nine and the brig. The parser resolves a room's
// pseudo word to PSEUDO-OBJECT and Game.perform dispatches here by routine name.
const obj = ctx => ctx.rarg === 'M-OBJECT';
const is = (ctx, ...verbs) => verbs.includes(ctx.verb);
const likeSlime = (g, how) => g.tell(`It ${how} like slime. Aren't you glad you didn't step in it?`);   // LIKE-SLIME
// Scenery words that the click UI should not draw before they exist (the routines answer "What slime?" until then).
export const visible = {
  'TRANSLATOR-PSEUDO': g => g.isIn('AMBASSADOR', g.state.here),
  'SLIME-PSEUDO': g => g.isIn('AMBASSADOR', g.state.here) || (g.getg('AMBASSADOR-LEAVE') ?? 0) > 0,
};
export const pseudos = {
  // TRANSLATOR-PSEUDO (Deck Nine): the ambassador's translator.
  'TRANSLATOR-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (!g.isIn('AMBASSADOR', g.state.here)) { g.tell('What translator?'); return true; }
    if (is(ctx, 'TAKE')) { g.tell('The ambassador whimpers and slaps your wrist.'); return true; }
    if (is(ctx, 'MUNG')) { g.tell('Are you trying to create an interplanetary incident?'); return true; }
    return false;
  },
  // SLIME-PSEUDO (Deck Nine): the trail the ambassador leaves. depends on: AMBASSADOR-LEAVE (I-AMBASSADOR)
  'SLIME-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (!g.isIn('AMBASSADOR', g.state.here) && !((g.getg('AMBASSADOR-LEAVE') ?? 0) > 0)) { g.tell('What slime?'); return true; }
    if (is(ctx, 'EAT', 'TASTE')) { likeSlime(g, 'tastes'); return true; }
    if (is(ctx, 'TAKE', 'RUB')) { likeSlime(g, 'feels'); return true; }
    if (is(ctx, 'EXAMINE')) { likeSlime(g, 'looks'); return true; }
    if (is(ctx, 'SMELL')) { likeSlime(g, 'smells'); return true; }
    // V-REMOVE: the engine parses "remove X" as TAKE-OFF, so that verb stands in for REMOVE here.
    if (is(ctx, 'SCRUB', 'REMOVE', 'TAKE-OFF')) {
      g.tell("Whew. You've cleaned up maybe one ten-thousandth of the slime." + (g.isIn('BLATHER', g.state.here) ? '' : ' If you hurry, it might be all cleaned up before Ensign Blather gets here.'));
      return true;
    }
    return false;
  },
  // GRAFFITI-PSEUDO (Brig): reading it takes 28 minutes (C-ELAPSED).
  'GRAFFITI-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'READ')) return false;
    g.state.elapsed = 28;
    g.tell('All the graffiti seem to be about Blather. One of the least obscene items reads:\n\nThere once was a krip, name of Blather\nWho told a young Ensign named Smather\n"I\'ll make you inherit\nA trotting demerit\nAnd ship you off to those stinking fawg-infested tar-pools of Krather."\n\nIt\'s not a very good limerick, is it?');
    return true;
  },
  // DOOR-PSEUDO (Brig): the cell door.
  'DOOR-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'OPEN', 'UNLOCK')) { g.tell('No way, Jose.'); return true; } return false; },
};

// GO (misc.zil): interrupts placed on the clock at the start of the game. Hunger, sleep and sickness
// warnings are queued as the original does; their routines belong to a later milestone.
export function setup(g) {
  g.queue('I-BLATHER', -1); g.queue('I-AMBASSADOR', -1); g.queue('I-RANDOM-INTERRUPTS', 1);
  g.queue('I-SLEEP-WARNINGS', 3600); g.queue('I-HUNGER-WARNINGS', 2000); g.queue('I-SICKNESS-WARNINGS', 1000);
  for (const k of ['BLOWUP-COUNTER', 'TRIP-COUNTER', 'SINK-COUNTER', 'BRIGS-UP', 'BLATHER-LEAVE', 'AMBASSADOR-LEAVE', 'DROWN']) g.setg(k, 0);
  g.state.time = 4450 + g.random(180);
}
