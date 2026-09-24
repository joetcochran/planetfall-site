// Hand-ported survival and time systems that run everywhere: sleep, hunger, sickness, dreams, the day
// counter, the chronometer's time, the survival kit, the protein liquid and the bed.
// Each block names the ZIL routine it ports (globals.zil / verbs.zil / compone.zil) so it can be
// checked against the source. Interrupts keep their ZIL names so ship.js's setup() queue entries find them.

const DORMS = ['DORM-A', 'DORM-B', 'DORM-C', 'DORM-D'];
// Deliberate deviation (user decision, 2026-09-12, round eleven): a night you are locked into. The shuttle refuses the
// card after 6000 and only sleeping ends a day, but sleeping is refused until you are tired, so a player who reaches
// the platform at dusk can be shut out of half the game with nothing to do about it for a thousand time units. Once
// the curfew has actually turned you away, a bunk will take you whether or not you are weary.
const nightLocked = g => !!g.getg('CURFEW-SEEN') && g.state.time > 6000;
const NOT_HUNGRY = "Thanks, but you're not hungry.";                                  // <GLOBAL NOT-HUNGRY>
const here = (g, ...rooms) => rooms.includes(g.state.here);
const tickOf = (g, name) => g.state.queue.find(e => e.name === name)?.tick ?? 0;       // <GET <INT name> ,C-TICK>
const say = (g, text) => g.tell(text, 'event');                                        // TELL CR "..." CR from an interrupt
// The hunger, sleep and sickness warnings: the same text, shown apart from Floyd's asides (kind 'warning'). Round seven's
// click tester starved after skimming past them among his chatter. Presentation only.
const warn = (g, text) => g.tell(text, 'warning');

// <GLOBAL DREAMS <PLTABLE ...>>
const DREAMS = [
  "...You find yourself on the bridge of the Feinstein. Ensign Blather is here, as well as Admiral Smithers. You are diligently scrubbing the control panel. Blather keeps yelling at you to scrub harder. Suddenly you hit the ship's self-destruct switch! Smithers and Blather howl at you as the ship begins exploding! You try to run, but your feet seem to be fused to the deck...",
  '...You gulp down the last of your Ramosian Fire Nectar and ask the andro-waiter for another pitcher. This pub makes the finest Nectar on all of Ramos Two, and you and your shipmates are having a pretty rowdy time. Through the windows of the pub you can see a mighty, ancient castle, shining in the light of the three Ramosian moons. The Fire Nectar spreads through your blood and you begin to feel drowsy...',
  '...Strangely, you wake to find yourself back home on Gallium. Even more strangely, you are only eight years old again. You are playing with your pet sponge-cat, Swanzo, on the edge of the pond in your backyard. Mom is hanging orange towels on the clothesline. Suddenly the school bully jumps out from behind a bush, grabs you, and pushes your head under the water. You try to scream, but cannot. You feel your life draining away...',
  '...Your vision slowly returns. You are on a wooded cliff overlooking a waterfall. A rainbow spans the falls. Blather stands above you, bellowing that the ground is filthy -- scrub harder! You throw your brush at Blather, but it passes thru him as though he were a ghost, and sails over the cliff. Blather leaps after the valuable piece of Patrol property, and both plummet into the void...',
  "...At last, the Feinstein has arrived at the historic Nebulon system. It's been five months since the last shore leave, and you're anxious for Planetfall. You and some other Ensigns Seventh Class enter the shuttle for surfaceside. Suddenly, you're alone on the shuttle, and it's tumbling out of control! It lands in the ocean and begins sinking! You try to clamber out, but you are stuck in a giant spider web. A giant spider crawls closer and closer...",
];

// --- time -----------------------------------------------------------------------------------------
// TELL-TIME (globals.zil): the chronometer shows INTERNAL-MOVES unless it has been munged, in which case
// it is frozen at MUNGED-TIME. (MUNGED-TIME itself is set by CHEMICAL-FLUID-F in compone.zil, which
// belongs to the comm-room area; this module only initialises and honours it.)
export function tellTime(g) {
  return `According to the chronometer, the current time is ${g.fsetP('CHRONOMETER', 'MUNGEDBIT') ? g.getg('MUNGED-TIME') : g.state.time}.`;
}
// MOVES as set at the end of MAIN-LOOP (misc.zil): what the status line shows. 0 without the chronometer.
export function presentTime(g) {
  if (!g.isIn('CHRONOMETER', 'ADVENTURER')) return 0;
  return g.fsetP('CHRONOMETER', 'MUNGEDBIT') ? g.getg('MUNGED-TIME') : g.state.time;
}

export const objects = {
  // CRETIN-F (globals.zil 335-361), the routine for ME. It was never ported, so every verb aimed at yourself fell
  // through to the engine's defaults and "x me" answered "I see nothing special about the you." Text verbatim.
  ME(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    const v = ctx.verb;
    if (v === 'GIVE') { g.perform('TAKE', ctx.prso); return true; }
    if (v === 'SCRUB') { g.tell("If only you'd done that before the last inspection, you wouldn't have gotten 300 demerits."); return true; }
    if (v === 'DROP') { g.tell('Huh?'); return true; }
    if (v === 'SMELL') { g.tell('Phew!'); return true; }
    if (v === 'FOLLOW') { g.tell('It would be hard not to.'); return true; }
    if (v === 'EAT') { g.tell('Auto-cannibalism is not the answer.'); return true; }
    if (v === 'ATTACK' || v === 'KICK' || v === 'MUNG') { g.jigsUp("If you insist.... Poof, you're dead!"); return true; }
    if (v === 'TAKE') { g.tell('How romantic!'); return true; }
    if (v === 'DISEMBARK') { g.tell("You'll have to do that on your own."); return true; }
    if (v === 'EXAMINE') { g.tell("That's difficult unless your eyes are prehensile."); return true; }
    return false;
  },
  // SLEEP-F: "go to sleep" reaches V-SLEEP through the sacred act of sleeping.
  SLEEP(g, ctx) { if (ctx.rarg === 'M-OBJECT' && ctx.verb === 'WALK-TO') { g.verbs.SLEEP(g, ctx); return true; } return false; },

  // CHRONOMETER-F, with TELL-TIME honouring MUNGED-TIME. Supersedes the ship.js version when both modules load.
  CHRONOMETER(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT' || !['EXAMINE', 'READ'].includes(ctx.verb)) return false;
    g.tell(`It is a standard wrist chronometer with a digital display. ${tellTime(g)} The back is engraved with the message "Good luck in the Patrol! Love, Mom and Dad."`);
    return true;
  },

  // FOOD-KIT-F
  'FOOD-KIT'(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT' || ctx.verb !== 'EMPTY') return false;
    if (!g.fsetP('FOOD-KIT', 'OPENBIT')) { g.tell('The kit is closed!'); return true; }
    if (g.contents(ctx.prso).length) { g.tell('The goo, being gooey, sticks to the inside of the kit. You would probably have to shake the kit to get the goo out.'); return true; }
    return false;
  },
  // GOO-F is shared by the three blobs.
  'RED-GOO': goo, 'BROWN-GOO': goo, 'GREEN-GOO': goo,

  // HIGH-PROTEIN-F
  'HIGH-PROTEIN'(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    if (ctx.verb === 'EAT') {
      if (!g.isIn('CANTEEN', 'ADVENTURER')) { g.tell("You're not holding the canteen."); return true; }
      if (g.getg('HUNGER-LEVEL') === 0) { g.tell(NOT_HUNGRY); return true; }
      g.remove('HIGH-PROTEIN'); g.state.elapsed = 15; g.setg('HUNGER-LEVEL', 0); g.queue('I-HUNGER-WARNINGS', 3600);
      g.tell('Mmmm....that was good. It certainly quenched your thirst and satisfied your hunger.');
      return true;
    }
    if (ctx.verb === 'POUR' && ctx.prso === 'HIGH-PROTEIN') {
      if (!g.isIn('CANTEEN', 'ADVENTURER')) { g.tell('Maybe if you were holding the canteen...'); return true; }
      const prsi = ctx.prsi ?? 'GROUND';
      if (prsi === 'FLASK') { g.tell('A worthless action -- and much too difficult for a poorly-written program like this one to handle.'); return true; }   // WORTHLESS-ACTION
      if (prsi === 'FUNNEL-HOLE') {
        // depends on: CHEMICAL-FLUID-F / the comm-room funnel puzzle (compone.zil). Faithful to the source's hand-off.
        const x = g.isIn('CHEMICAL-FLUID', 'FLASK');
        g.setg('CHEMICAL-REQUIRED', 10); g.remove('HIGH-PROTEIN');
        g.perform('POUR', 'CHEMICAL-FLUID', 'FUNNEL-HOLE');
        if (x) g.move('CHEMICAL-FLUID', 'FLASK');
        return true;
      }
      g.remove('HIGH-PROTEIN'); g.tell(`The protein-rich fluid pours over the ${g.name(prsi)} and then dries up.`); return true;
    }
    return false;
  },

  // BED-F
  BED(g, ctx) {
    const v = ctx.verb;
    if (ctx.rarg === 'M-BEG') {
      if (v === 'WALK') { g.tell("You'll have to stand up, first."); return true; }
      if (['TAKE', 'OPEN', 'CLOSE', 'RUB'].includes(v) && ctx.prso !== 'BED') { g.tell("You can't reach it from here."); return true; }
      return false;
    }
    if (ctx.rarg !== 'M-OBJECT') return false;
    if (['THROUGH', 'BOARD', 'WALK-TO'].includes(v)) {
      if (here(g, 'INFIRMARY')) { g.jigsUp('You climb into the bed. It is soft and comfortable. After a few moments, a previously unseen panel opens, and a diagnostic robot comes wheeling out. It is very rusty and sways unsteadily, bumping into several pieces of infirmary equipment as it crosses the room. As the robot straps you to the bed, you notice some smoke curling from its cracks. Beeping happily, the robot injects you with all 347 serums and medicines it carries. The last thing you notice before you pass out is the robot preparing to saw your legs off.'); return true; }
      if (g.getg('SLEEPY-LEVEL') > 0 || nightLocked(g)) {
        g.move('ADVENTURER', 'BED'); g.queue('I-FALL-ASLEEP', 16); g.disable('I-SLEEP-WARNINGS');
        g.tell('Ahhh...the bed is soft and comfortable. You should be asleep in short order.');
      } else { g.move('ADVENTURER', 'BED'); g.tell('You are now in bed.'); }
      return true;
    }
    if (['DISEMBARK', 'STAND', 'EXIT', 'DROP'].includes(v) && tickOf(g, 'I-FALL-ASLEEP')) { g.tell("How could you suggest such a thing when you're so tired and this bed is so comfy?"); return true; }
    if (['LEAVE', 'EXIT', 'DROP'].includes(v)) { g.perform('DISEMBARK', 'BED'); return true; }
    if (v === 'PUT' && ctx.prsi === 'BED') { g.move(ctx.prso, g.state.here); g.tell(`The ${g.name(ctx.prso)} bounces off the bed and lands on the floor.`); return true; }
    return false;
  },
};

// Deliberate deviation (user decision, 2026-09-10, round four): each hunger warning points at the next thing to eat or
// drink. Both typed playtesters ran low looking for water and never learned that the goo or the kitchen would do.
// Round eleven (user decision, 2026-09-11): the hint used to name the first food that existed anywhere in the world,
// so once the kit had been left in Storage West every warning pointed at Storage West -- from Lawanda, a shuttle ride
// away, at a two-turn deadline. It now names only what the player can act on: what is held, then what is in this room,
// then what is on this side of the shuttle tunnel. With the food across the tunnel it says so, because "you should
// have brought it" is the true answer and the trip is not one the player can make in time.
function hungerHint(g) {
  const roomIdOf = id => { let l = g.loc(id); for (let i = 0; l && i < 10; i++) { if (g.rooms.has(l)) return l; l = g.loc(l); } return null; };
  // The second complex is comptwo.zil's rooms; nothing edible is over there, and the only way back is the shuttle.
  const far = room => room != null && g.rooms.get(room)?.file === 'comptwo.zil';
  const here = g.state.here, away = far(here);
  const supplies = [];
  if (['RED-GOO', 'BROWN-GOO', 'GREEN-GOO'].some(b => g.isIn(b, 'FOOD-KIT')) && g.fsetP('FOOD-KIT', 'TOUCHBIT'))
    supplies.push({ id: 'FOOD-KIT', inHand: 'The goo in your survival kit would take care of both.', inRoom: 'The survival kit here still has goo in it.', what: 'goo in the survival kit' });
  if (g.isIn('HIGH-PROTEIN', 'CANTEEN') && g.fsetP('CANTEEN', 'TOUCHBIT'))
    supplies.push({ id: 'CANTEEN', inHand: 'A drink from your canteen would take care of both.', inRoom: 'The canteen here still has something in it.', what: 'something to drink in the canteen' });
  // The Lawanda infirmary's emergency ration (lawanda.js), once the player has seen it: the hint names food it knows
  // the player has found, so it never gives away a room they have not been in.
  if (g.loc('RATION-PACK') && g.fsetP('RATION-PACK', 'TOUCHBIT'))
    supplies.push({ id: 'RATION-PACK', inHand: 'The emergency ration you are carrying would take care of both.', inRoom: 'The emergency ration is here.', what: 'an emergency ration' });
  for (const s of supplies) {
    if (g.held(s.id)) return s.inHand;
    const room = roomIdOf(s.id);
    if (room === here) return s.inRoom;
    if (room && far(room) === away) return `There is still ${s.what} you left in ${g.name(room)}.`;
  }
  const across = supplies.map(s => roomIdOf(s.id)).find(r => r && far(r) !== away);
  if (across) return `There is nothing to eat or drink on this side of the shuttle tunnel. What you had is back in ${g.name(across)}.`;
  if (away) return 'There is nothing to eat or drink on this side of the shuttle tunnel.';
  if (g.state.rooms.KITCHEN?.touched) return 'You think of the machine in the kitchen.';
  if (g.state.rooms['MESS-HALL']?.touched) return "You find yourself thinking of the kitchen behind the Mess Hall's locked door.";
  return 'Surely a complex this size had a kitchen somewhere.';
}

// GOO-F
function goo(g, ctx) {
  if (ctx.rarg !== 'M-OBJECT') return false;
  const o = ctx.prso;
  if (ctx.verb === 'EAT') {
    if (g.getg('HUNGER-LEVEL') === 0) g.tell(NOT_HUNGRY);
    else if (!g.isIn('FOOD-KIT', 'ADVENTURER')) { g.tell("You're not holding the survival kit."); g.state.lastObject = 'FOOD-KIT'; }   // NOT-HOLDING + THIS-IS-IT
    else {
      g.remove(o); g.state.elapsed = 15; g.setg('HUNGER-LEVEL', 0); g.queue('I-HUNGER-WARNINGS', 1450);
      g.tell('Mmmm...that tasted just like ' + (o === 'BROWN-GOO' ? 'delicious Nebulan fungus pudding' : o === 'RED-GOO' ? 'scrumptious cherry pie' : 'yummy lima beans') + '.');
      // Deliberate deviation (user decision, 2026-09-10, round four): hunger and thirst are one clock in the source, so
      // the goo quenches thirst too; say so, since every playtester went looking for water they did not need yet.
      g.tell('It was moist enough to quench your thirst, too.');
    }
    return true;
  }
  // Deliberate deviation (user decision, 2026-09-10, round four): the source has no description ("nothing special");
  // each smell matches the flavour the blob tastes of when eaten.
  if (ctx.verb === 'EXAMINE') { const c = { 'RED-GOO': ['red', 'cherries'], 'BROWN-GOO': ['brown', 'mushrooms'], 'GREEN-GOO': ['green', 'beans'] }[o]; g.tell(`It's a blob of ${c[0]} goo. It smells faintly of ${c[1]}.`); return true; }
  if (ctx.verb === 'TAKE' || ctx.verb === 'DROP') {
    g.tell((ctx.verb === 'DROP' ? 'The goo, being gooey, sticks where it is' : 'It would ooze through your fingers') + ". You'll have to eat it right from the survival kit.");
    return true;
  }
  return false;
}

export const rooms = {};
export const exits = {};
export const describers = { 'TELL-TIME': tellTime };
// Round seventeen (row 24): the bed never lets Take reach past it (BED-F's M-BEG: "You can't reach it from here."),
// and unlike the landed safety web it does not stand you up to take things. So "Take all" leaves the floor alone
// from the bed (parser.js takeableHere). The teen tester woke with everything slipped to the floor, was offered
// "Take all", and got six refusals in a row; "get out of the bed (to reach what is on the floor)" is the way.
export const heldInVehicle = { BED: () => true };

// The survival clocks, for DIAGNOSE (verbs.js). Deliberate deviation (user decision, 2026-09-11, round eleven): say
// how much time each clock has left. They are fuses on elapsed time, so they are spent by walking about, not by
// typing, and both round-eleven testers read the warnings as a count of turns: the typed one rationed his commands
// while the long hall quietly ate three hours a crossing, and starved anyway. What is left is the current fuse's
// remaining tick plus the stages still queued behind it.
const HUNGER_STAGES = [450, 150, 100, 150];  // queued by I-HUNGER-WARNINGS after levels 1-4; level 5 collapses you
const SLEEP_STAGES = [400, 135, 60, 50];     // queued by I-SLEEP-WARNINGS after levels 1-4; level 5 drops you where you stand
const clockLeft = (g, fuse, stages, level) => (g.enabled(fuse) ? tickOf(g, fuse) + stages.slice(level).reduce((a, b) => a + b, 0) : null);
export const clocks = {
  hunger: g => clockLeft(g, 'I-HUNGER-WARNINGS', HUNGER_STAGES, g.getg('HUNGER-LEVEL') ?? 0),
  sleep: g => clockLeft(g, 'I-SLEEP-WARNINGS', SLEEP_STAGES, g.getg('SLEEPY-LEVEL') ?? 0),
};

export const interrupts = {
  // I-SLEEP-WARNINGS
  'I-SLEEP-WARNINGS'(g) {
    const level = (g.getg('SLEEPY-LEVEL') ?? 0) + 1; g.setg('SLEEPY-LEVEL', level);
    if (g.isIn('ADVENTURER', 'BED')) {
      say(g, 'You suddenly realize how tired you were and how comfortable the bed is. You should be asleep in no time.');
      g.disable('I-SLEEP-WARNINGS'); g.queue('I-FALL-ASLEEP', 16); return true;
    }
    // Deliberate deviation (user decision, 2026-09-12, round twelve): the warning names the bunks. Round eleven put
    // that address in the refusal you get for typing SLEEP, and round twelve's typed tester called it an excellent
    // hint and then died of it: you only see it once you try to sleep, and by then the dormitories were four rooms
    // and a three-hour corridor away. It is said at the first warning and again at the third, when it is urgent, and
    // not at all once you are standing in a dorm.
    const bunks = () => here(g, ...DORMS) ? '' : ' The dormitories have bunks: Dorms C and D off the Dorm Corridor, Dorms A and B off the Rec Corridor.';
    if (level === 1) { warn(g, 'You begin to feel weary. It might be time to think about finding a nice safe place to sleep.' + bunks()); g.queue('I-SLEEP-WARNINGS', 400); }
    else if (level === 2) { warn(g, "You're really tired now. You'd better find a place to sleep real soon."); g.queue('I-SLEEP-WARNINGS', 135); }
    else if (level === 3) { warn(g, "If you don't get some sleep soon you'll probably drop." + bunks()); g.queue('I-SLEEP-WARNINGS', 60); }
    else if (level === 4) { warn(g, 'You can barely keep your eyes open.'); g.queue('I-SLEEP-WARNINGS', 50); }
    else if (level === 5) {
      if (g.state.here === 'BED') { say(g, 'You slowly sink into a deep and blissful sleep.'); dreaming(g); }   // as in the source: HERE is never the bed, so this branch is unreachable
      else if (here(g, ...DORMS)) { say(g, 'You climb into one of the bunk beds and immediately fall asleep.'); g.move('ADVENTURER', 'BED'); dreaming(g); }
      else {
        say(g, "You can't stay awake a moment longer. You drop to the ground and fall into a deep but fitful sleep.");
        const day = g.getg('DAY');
        if ((day === 1 && here(g, 'CRAG')) || (day === 3 && here(g, 'BALCONY')) || (day === 5 && here(g, 'WINDING-STAIR')))
          g.jigsUp('Suddenly, in the middle of the night, a wave of water washes over you. Before you can quite get your bearings, you drown.');
        else if (g.prob(30)) g.jigsUp('Suddenly, in the middle of the night, you awake as several ferocious beasts (could they be grues?) surround and attack you. Perhaps you should have found a slightly safer place to sleep.');
        else dreaming(g);
      }
    }
    return true;
  },
  // I-FALL-ASLEEP
  'I-FALL-ASLEEP'(g) { say(g, 'You slowly sink into a deep and restful sleep.'); g.disable('I-FALL-ASLEEP'); dreaming(g); return true; },

  // I-HUNGER-WARNINGS
  'I-HUNGER-WARNINGS'(g) {
    const level = (g.getg('HUNGER-LEVEL') ?? 0) + 1; g.setg('HUNGER-LEVEL', level);
    // Deliberate deviation (user decision, 2026-09-11, round ten): name DIAGNOSE the first time a survival clock
    // speaks. It reports all three clocks (sickness, sleep, hunger) and is the only way to see them, and round ten
    // went 674 commands before either tester thought to try it -- after one of them had already starved to death.
    if (level === 1) { g.queue('I-HUNGER-WARNINGS', 450); warn(g, "A growl from your stomach warns that you're getting pretty hungry and thirsty." + (g.getg('DIAGNOSE-HINTED') ? '' : ' (DIAGNOSE will tell you how you are doing.)')); g.setg('DIAGNOSE-HINTED', true); }
    else if (level === 2) { g.queue('I-HUNGER-WARNINGS', 150); warn(g, "You're now really ravenous and your lips are quite parched."); }
    else if (level === 3) { g.queue('I-HUNGER-WARNINGS', 100); warn(g, "You're starting to feel faint from lack of food and liquid."); }
    // Deliberate deviation (user decision, 2026-09-12, round eleven): the source gives 50 time units between the last
    // warning and the collapse -- two turns -- where the sleep ladder gives four warnings over hundreds. Round eleven's
    // typed tester read the warning, walked one room, and died. 150 leaves room to reach food that is in the building.
    else if (level === 4) { g.queue('I-HUNGER-WARNINGS', 150); warn(g, "If you don't eat or drink something in a few millichrons, you'll probably pass out."); }
    else if (level === 5) g.jigsUp('You collapse from extreme thirst and hunger.');
    if (level < 5) { const hint = hungerHint(g); if (hint) warn(g, hint); }
    return true;
  },

  // I-SICKNESS-WARNINGS: the disease only progresses once per day, the morning after (WAKING-UP raises the flag).
  'I-SICKNESS-WARNINGS'(g) {
    g.queue('I-SICKNESS-WARNINGS', 700);
    if (!g.getg('SICKNESS-WARNING-FLAG')) return false;
    g.setg('SICKNESS-WARNING-FLAG', false);
    g.setg('LOAD-ALLOWED', g.getg('LOAD-ALLOWED') - 10);
    const level = (g.getg('SICKNESS-LEVEL') ?? 0) + 1; g.setg('SICKNESS-LEVEL', level);
    switch (level) {
      case 1: warn(g, "You notice that you feel a bit weak and slightly flushed, but you're not sure why."); break;
      case 2: warn(g, 'You notice that you feel unusually weak, and you suspect that you have a fever.'); break;
      case 3: warn(g, 'You are now feeling quite under the weather, not unlike a bad flu.'); break;
      case 4: warn(g, "Your fever seems to have gotten worse, and you're developing a bad headache."); break;
      case 5: warn(g, 'Your health has deteriorated further. You feel hot and weak, and your head is throbbing.'); break;
      case 6: warn(g, 'You feel very, very sick, and have almost no strength left.'); break;
      case 7: warn(g, "You feel like you're on fire, burning up from the fever. You're almost too weak to move, and your brain is reeling from the pounding headache."); break;
      case 8: warn(g, "You're no longer sure of where you are and what you're doing. You stumble about, your pain subsiding into a dull numbness."); break;
      case 9: g.jigsUp('You finally succumb to the ravages of your illness and collapse.'); break;
    }
    return true;
  },
};

// DREAMING
function dreaming(g) {
  if (g.state.rooms.FORK?.touched && g.prob(13))
    g.tell('You are in a busy office crowded with people. The only one you recognize is Floyd. He rushes back and forth between the desks, carrying papers and delivering coffee. He notices you, and asks how your project is coming, and whether you have time to tell him a story. You look into his deep, trusting eyes...');
  else if (g.prob(60)) { g.crlf(); g.tell(g.pickOne(DREAMS)); }
  wakingUp(g);
}

// WAKING-UP
function wakingUp(g) {
  g.setg('DAY', g.getg('DAY') + 1);
  g.setg('SICKNESS-WARNING-FLAG', true);
  g.setg('SLEEPY-LEVEL', 0);
  resetTime(g);
  if (g.state.dead) return;
  const slipped = [], spilled = [];
  for (const x of g.contents('ADVENTURER')) {
    if (!g.fsetP(x, 'WORNBIT')) { g.move(x, g.state.here); slipped.push(x); }
    if (x === 'CANTEEN' && g.isIn('HIGH-PROTEIN', 'CANTEEN') && g.fsetP('CANTEEN', 'OPENBIT')) { g.remove('HIGH-PROTEIN'); spilled.push('CANTEEN'); }
    if (x === 'FLASK' && g.isIn('CHEMICAL-FLUID', 'FLASK')) { g.remove('CHEMICAL-FLUID'); spilled.push('FLASK'); }
  }
  g.crlf();
  g.tell(`***** SEPTEM ${g.getg('DAY') + 5}, 11344 *****`, 'event');
  g.crlf();
  const sick = g.getg('SICKNESS-LEVEL');
  let t = !g.isIn('ADVENTURER', 'BED') ? 'You wake and slowly stand up, feeling stiff from your night on the floor.'
    : sick < 3 ? 'You wake up feeling refreshed and ready to face the challenges of this mysterious world.'
    : sick < 6 ? 'You wake after sleeping restlessly. You feel weak and listless.'
    : 'You wake feeling weak and worn-out. It will be an effort just to stand up.';
  if (g.getg('HUNGER-LEVEL') > 0) { g.setg('HUNGER-LEVEL', 4); g.queue('I-HUNGER-WARNINGS', 100); t += ' You are also incredibly famished. Better get some breakfast!'; }
  else g.queue('I-HUNGER-WARNINGS', 400);
  g.tell(t);
  // Deliberate deviation (user decision, 2026-09-10): the source drops everything carried without a word, and the
  // typed playtester nearly walked off without the ID card. Say so once.
  // Round five (user decision): the line also says what spilled, which the source empties without a word.
  // Deliberate deviation (user decision, 2026-09-24, rounds 21-22): the line names them, so the player can tell at a
  // glance what to pick up again (round twenty-two, #49: "the things you were carrying" left the tester to work it out).
  const names = slipped.map(x => `the ${g.name(x)}`), list = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0];
  if (slipped.length) g.tell(`While you slept, the things you were carrying slipped to the floor beside you: ${list}.` + (spilled.includes('FLASK') ? ' The fluid in the flask spilled out and evaporated.' : '') + (spilled.includes('CANTEEN') ? ' The open canteen spilled its liquid across the floor.' : ''));
  // depends on: Floyd (compone.zil FLOYD-F and the FLOYD-INTRODUCED / FLOYD-SPOKE globals). Read, not invented.
  if (g.fsetP('FLOYD', 'RLANDBIT') && g.getg('FLOYD-INTRODUCED')) {
    g.move('FLOYD', g.state.here); g.setg('FLOYD-SPOKE', true);
    g.tell(g.isIn('ADVENTURER', 'BED') ? 'Floyd bounces impatiently at the foot of the bed. "About time you woke up, you lazy bones! Let\'s explore around some more!"'
      : 'Floyd gives you a nudge with his foot and giggles. "You sure look silly sleeping on the floor," he says.');
  }
}

// How long the player can stay awake after waking on each day (RESET-TIME's QUEUE values); day 1's is the start
// of the game's (ship.js). Shared with the checkpoint refresh below.
const AWAKE_FOR = { 1: 3600, 2: 5800, 3: 5550, 4: 5200, 5: 4800, 6: 4300, 7: 3700, 8: 3000 };

// RESET-TIME: a new morning sets INTERNAL-MOVES, re-arms the sleep clock and lets the sea's new level be described afresh.
function resetTime(g) {
  const untouch = room => { g.state.rooms[room].touched = false; };
  const day = g.getg('DAY');
  switch (day) {
    case 2: untouch('BALCONY'); g.state.time = 1600 + g.random(80); break;
    case 3: untouch('BALCONY'); g.state.time = 1750 + g.random(80); break;
    case 4: untouch('WINDING-STAIR'); g.state.time = 1950 + g.random(80); break;
    case 5: untouch('WINDING-STAIR'); g.state.time = 2150 + g.random(80); break;
    case 6: untouch('COURTYARD'); g.state.time = 2450 + g.random(80); break;
    case 7: untouch('COURTYARD'); g.state.time = 2800 + g.random(80); break;
    case 8: g.state.time = 3200 + g.random(80); break;
    case 9: g.jigsUp("Unfortunately, you don't seem to have survived the night."); break;
  }
  if (day >= 2 && AWAKE_FOR[day]) g.queue('I-SLEEP-WARNINGS', AWAKE_FOR[day]);
}

// Not in the source: a playtest checkpoint starts the player fed, rested and well (the user, 2026-09-23: "every
// checkpoint should start me off with full health and sleep"). Fed as by the high-protein liquid (its 3600), rested
// as on waking this day, and the disease back to nothing with the carrying strength it took. The day and the clock are
// left alone -- they drive the sea, the lights and the rest of the plot.
function checkpointRefresh(g) {
  g.setg('HUNGER-LEVEL', 0); g.queue('I-HUNGER-WARNINGS', 3600);
  g.setg('SLEEPY-LEVEL', 0); g.disable('I-FALL-ASLEEP'); g.queue('I-SLEEP-WARNINGS', AWAKE_FOR[g.getg('DAY')] ?? 3000);
  g.setg('LOAD-ALLOWED', 100); g.setg('SICKNESS-LEVEL', 0);
  g.setg('SICKNESS-WARNING-FLAG', false);        // and no step of the disease pending from this morning's waking
}
export const helpers = { 'CHECKPOINT-REFRESH': checkpointRefresh };

export const verbs = {
  // V-EAT (replaces the engine placeholder; the goo and the liquid handle their own eating)
  EAT(g, ctx) { g.tell(`I don't think that the ${g.name(ctx.prso)} would agree with you.`); },
  // V-EAT-FROM
  'EAT-FROM'(g, ctx) {
    const inside = g.contents(ctx.prso);
    if (!g.fsetP(ctx.prso, 'OPENBIT')) return g.tell("It's closed.");
    if (inside.length > 1) return g.tell(`There's more than one thing in the ${g.name(ctx.prso)}.`);
    if (inside.length === 1) return void g.perform('EAT', inside[0]);
    g.tell("It's empty!");
  },
  // V-TASTE
  TASTE(g, ctx) {
    const o = ctx.prso;
    if (['HIGH-PROTEIN', 'RED-GOO', 'BROWN-GOO', 'GREEN-GOO'].includes(o)) g.tell('It tastes edible.');
    else if (o === 'CHEMICAL-FLUID') g.tell('It burns your tongue.');
    else g.tell(`It tastes just like ${g.article(o)} ${g.name(o)}.`);
  },
  // V-POUR
  POUR(g) { g.tell('Pouring or spilling non-liquids is specifically forbidden by section 17.9.2 of the Galactic Adventure Game Compendium of Rules.'); },
  // V-EMPTY
  EMPTY(g, ctx) {
    const o = ctx.prso;
    if (!g.fsetP(o, 'OPENBIT')) return g.tell("You can't empty it when it's closed!");
    const inside = g.contents(o);
    if (!inside.length) return g.tell(`There's nothing in the ${g.name(o)}.`);
    for (const x of inside) { if (x === 'HIGH-PROTEIN' || x === 'CHEMICAL-FLUID') g.remove(x); else g.move(x, g.state.here); }
    g.tell(`The ${g.name(o)} is now empty.`);
  },
  // V-SLEEP
  SLEEP(g) {
    if (g.getg('SLEEPY-LEVEL') === 0 && nightLocked(g) && here(g, ...DORMS)) g.perform('BOARD', 'BED');
    else if (g.getg('SLEEPY-LEVEL') === 0) g.tell("You're not tired!" + (nightLocked(g) ? ' Still, there is nothing to be done until the shuttle runs again; the dormitories have bunks, off the Dorm Corridor and the Rec Corridor.' : ''));
    else if (g.enabled('I-FALL-ASLEEP')) g.tell("You'll probably be asleep before you know it.");
    // Deliberate deviation (user decision, 2026-09-10): in a room lined with bunks the source's answer below read as a
    // refusal; point at the bunks instead.
    else if (here(g, ...DORMS) && !g.isIn('ADVENTURER', 'BED')) g.tell("You'd better get into one of the bunks first.");
    // Deliberate deviation (user decision, 2026-09-11, round eleven): once you are tired the refusal names the beds.
    // Sleeping is the only way to end the night, and the source's line is the same rebuke whether or not you know
    // where a bed is; both testers were told to sleep in a bed for hundreds of turns without being told where one was.
    else g.tell('Civilized members of society usually sleep in beds. The dormitories have bunks: Dorms C and D off the Dorm Corridor, Dorms A and B off the Rec Corridor.');
  },
  // V-ALARM ("wake X")
  ALARM(g, ctx) { g.tell(`The ${g.name(ctx.prso)} isn't sleeping.`); },
  // V-SIT
  SIT(g) {
    if (here(g, 'ESCAPE-POD')) { g.tell('(in the web)'); g.perform('BOARD', 'SAFETY-WEB'); return; }
    if (here(g, ...DORMS, 'INFIRMARY')) { g.tell('(on the bed)'); g.perform('BOARD', 'BED'); return; }
    g.state.elapsed = 31; g.tell('You recline on the floor for a bit, and then stand up again.');
  },
  // V-TIME
  TIME(g) { if (g.isIn('CHRONOMETER', 'ADVENTURER')) g.tell(tellTime(g)); else g.tell("It's hard to say, since you've removed your chronometer."); },
};

// Parser phrases from syntax.zil: EAT/DRINK/SWALLOW, EAT FROM, POUR/SPILL, EMPTY, TASTE, SLEEP, WAKE/AWAKE, SIT/LIE/LAY/RECLINE, TIME/T.
export const vocabulary = [
  ['drink', 'EAT', 1], ['swallow', 'EAT', 1], ['eat from', 'EAT-FROM', 1], ['drink from', 'EAT-FROM', 1],
  ['pour', 'POUR', 1, 'over|onto|on|into|in|out'], ['spill', 'POUR', 1, 'over|onto|on|into|in|out'], ['empty', 'EMPTY', 1], ['taste', 'TASTE', 1],
  ['sleep', 'SLEEP', 0], ['go to sleep', 'SLEEP', 0], ['wake up', 'ALARM', 1], ['wake', 'ALARM', 1], ['awake', 'ALARM', 1],
  ['sit', 'SIT', 0], ['sit down', 'SIT', 0], ['lie', 'SIT', 0], ['lie down', 'SIT', 0], ['lay', 'SIT', 0], ['lay down', 'SIT', 0], ['recline', 'SIT', 0],
  ['sit on', 'CLIMB-ON', 1], ['sit in', 'BOARD', 1], ['lie on', 'CLIMB-ON', 1], ['lie in', 'BOARD', 1], ['lie down on', 'CLIMB-ON', 1], ['lie down in', 'BOARD', 1],
  ['t', 'TIME', 0],
];

// GO (misc.zil): the survival globals, and the three clocks in case this module runs without ship.js.
export function setup(g) {
  for (const k of ['SLEEPY-LEVEL', 'HUNGER-LEVEL', 'SICKNESS-LEVEL', 'MUNGED-TIME']) g.setg(k, 0);
  g.setg('SICKNESS-WARNING-FLAG', false);
  if (g.getg('DAY') == null) g.setg('DAY', 1);
  for (const [name, tick] of [['I-SLEEP-WARNINGS', 3600], ['I-HUNGER-WARNINGS', 2000], ['I-SICKNESS-WARNINGS', 1000]])
    if (!g.state.queue.some(e => e.name === name)) g.queue(name, tick);
}

// Click-menu labels (see parser.verbLabel): the protein-rich liquid is drunk ("drink" is EAT in syntax.zil).
// The goo is eaten straight from the kit, which must be in hand (GOO-F: "You're not holding the survival kit."). Round
// eleven (A4, the user's decision) keeps Eat on the goo while the open kit lies at your feet too, because that refusal
// is the answer the player needs: pick up the kit. This gate used to require the kit in hand, so A4 never showed
// (round fourteen); parser.verbsFor still takes Eat away while the kit is shut or out of reach.
const kitAtHand = g => g.held('FOOD-KIT') || g.loc('FOOD-KIT') === g.state.here;
export const menus = { 'HIGH-PROTEIN': [{ verb: 'EAT', label: 'Drink' }], 'RED-GOO': [{ verb: 'EAT', when: kitAtHand }], 'BROWN-GOO': [{ verb: 'EAT', when: kitAtHand }], 'GREEN-GOO': [{ verb: 'EAT', when: kitAtHand }] };
