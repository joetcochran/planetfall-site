// Default verb behaviour, ported from verbs.zil. Object and room handlers in rules/ run first
// and can pre-empt these. Each handler receives (g, ctx) with ctx.verb/prso/prsi/dir.
import { YUKS, DIRECTIONS } from './core.js';

const D = (g, id) => g.name(id);
const the = (g, id) => 'the ' + D(g, id);

// Deliberate deviation (user decision, 2026-09-11, round eleven): the survival clocks run on elapsed time, and
// nothing in the game said so. DIAGNOSE now says how long each has left (rules.clocks, survival.js, owns the fuse
// tables; the engine only prints what it is given), and a walk that costs much more than an ordinary step says so.
const LONG_WALK = 60;   // minutes; an ordinary step is 20
// Only once that clock has actually spoken: while you are rested and fed the answer is most of a day away, and
// saying so would only bury the two lines that matter.
const clockTail = (g, which, level) => {
  const left = level > 0 ? g.rules.clocks?.[which]?.(g) : null;
  if (left == null) return '';
  return which === 'sleep' ? ` You can stay on your feet ${g.inHours(left)} longer.` : ` You can go ${g.inHours(left)} longer without food or drink.`;
};
const announceWalk = (g, minutes) => { if (minutes >= LONG_WALK && !g.state.dead) g.tell(`(That walk took ${g.inHours(minutes)}.)`, 'event'); };

export const DEFAULT_VERBS = {
  LOOK(g) { g.look(); },
  INVENTORY(g) { g.state.elapsed = 18; const lines = g.inventoryLines(); if (!lines.length) g.tell('You are empty-handed.'); else { g.tell('You are carrying:'); for (const l of lines) g.tell(l); } },
  WAIT(g) { g.state.elapsed = 40; g.tell('Time passes...'); },
  TIME(g) { g.tell(`According to the chronometer, the current time is ${g.state.time}.`); },
  // V-SCORE (verbs.zil 220-250). Every caller (the verb, FINISH, QUIT, RESTART) leaves ASK? true: "Your score would be".
  // Deliberate deviation (user decision, 2026-09-12, round twelve): SCORE costs no time, as SAVE already does not.
  // Round twelve's typed tester checked its score during the mutant chase, which grants one turn per room, and was
  // eaten for it. A command that only reports on the game should not spend the game's clock.
  SCORE(g, ctx) {
    if (ctx) ctx.fatal = true;
    const s = g.state.score, chrono = g.isIn('CHRONOMETER', 'ADVENTURER');
    const rank = s === 80 ? 'Galactic Overlord' : s > 72 ? 'Cluster Admiral' : s > 64 ? 'System Captain' : s > 48 ? 'Planetary Commodore' : s > 36 ? 'Lieutenant' : s > 24 ? 'Ensign First Class' : s > 12 ? 'Space Cadet' : 'Beginner';
    g.tell(`Your score would be ${s} (out of 80 points). It is Day ${g.getg('DAY') ?? 1} of your adventure. Current Galactic Standard Time ${chrono ? `(adjusted to your local day-cycle) is ${g.fsetP('CHRONOMETER', 'MUNGEDBIT') ? g.getg('MUNGED-TIME') : g.state.time}` : "is impossible to determine, since you're not wearing your chronometer"}.`);
    g.tell(`This score gives you the rank of ${rank}.`);
  },

  TAKE(g, ctx) { if (itake(g, ctx) === true) g.tell('Taken.'); },
  SZAP(g) { g.tell('Zap!'); },   // V-SZAP: PRE-SZAP always answers first
  DROP(g, ctx) { if (idrop(g, ctx)) g.tell('Dropped.'); },
  PUT(g, ctx) {
    const { prso, prsi } = ctx;
    if (!(g.fsetP(prsi, 'OPENBIT') || g.fsetP(prsi, 'CONTBIT') || g.fsetP(prsi, 'DOORBIT') || g.fsetP(prsi, 'VEHBIT'))) return g.tell("You can't do that.");
    if (!g.fsetP(prsi, 'OPENBIT')) return g.tell(`The ${D(g, prsi)} isn't open.`);
    if (prsi === prso) return g.tell('How can you do that?');
    if (g.isIn(prso, prsi)) return g.tell(`The ${D(g, prso)} is already in the ${D(g, prsi)}.`);
    if (g.isIn(prsi, prso)) return g.tell(`How can you put the ${D(g, prso)} in the ${D(g, prsi)} when the ${D(g, prsi)} is already in the ${D(g, prso)}?`);
    if (!g.fits(prso, prsi)) return g.tell("There's no room.");
    if (!g.held(prso) && itake(g, { ...ctx, silent: true }) !== true) return;
    g.scoreObj(prso); g.move(prso, prsi); g.fset(prso, 'TOUCHBIT'); g.tell('Done.');
  },
  OPEN(g, ctx) {
    const o = ctx.prso;
    if (!g.fsetP(o, 'CONTBIT') && !g.fsetP(o, 'DOORBIT')) return g.tell(`You must be very clever to do that to the ${D(g, o)}.`);
    if (g.fsetP(o, 'DOORBIT') || (parseInt(g.obj(o).capacity ?? 0) || 0) !== 0) {
      if (g.fsetP(o, 'OPENBIT')) return g.tell("It's already open.");
      g.fset(o, 'OPENBIT');
      if (g.fsetP(o, 'DOORBIT')) return g.tell(`The ${D(g, o)} is now open.`);
      const inside = g.contents(o);
      if (!inside.length || g.fsetP(o, 'TRANSBIT')) return g.tell('Opened.');
      if (inside.length === 1 && g.obj(inside[0]).fdesc && !g.fsetP(inside[0], 'TOUCHBIT')) { g.tell(`The ${D(g, o)} opens.`); return g.tell(g.obj(inside[0]).fdesc); }
      g.tell(`Opening the ${D(g, o)} reveals ${listNames(g, inside)}.`);
    } else g.tell(`The ${D(g, o)} cannot be opened.`);
  },
  CLOSE(g, ctx) {
    const o = ctx.prso;
    if (!g.fsetP(o, 'CONTBIT') && !g.fsetP(o, 'DOORBIT')) return g.tell(`You can't do that to ${g.article(o)} ${D(g, o)}.`);
    if ((parseInt(g.obj(o).capacity ?? 0) || 0) !== 0 || g.fsetP(o, 'DOORBIT')) { if (g.fsetP(o, 'OPENBIT')) { g.fclear(o, 'OPENBIT'); g.tell('Closed.'); } else g.tell("It's already closed."); }
    else g.tell('You cannot close that.');
  },
  EXAMINE(g, ctx) {
    const o = ctx.prso; g.state.elapsed = 32;
    if (g.obj(o).text) return g.tell(g.obj(o).text);
    if (g.fsetP(o, 'DOORBIT')) return g.verbs['LOOK-INSIDE'](g, ctx);
    if (g.fsetP(o, 'CONTBIT')) return g.fsetP(o, 'OPENBIT') ? g.verbs['LOOK-INSIDE'](g, ctx) : g.tell(`The ${D(g, o)} is closed.`);
    g.tell(`I see nothing special about the ${D(g, o)}.`);
  },
  'LOOK-INSIDE'(g, ctx) {
    const o = ctx.prso;
    if (g.fsetP(o, 'ACTORBIT')) return g.tell('There is nothing special to be seen.');
    if (g.fsetP(o, 'DOORBIT')) return g.tell(g.fsetP(o, 'OPENBIT') ? `The ${D(g, o)} is open, but I can't tell what's beyond it.` : `The ${D(g, o)} is closed.`);
    if (g.fsetP(o, 'CONTBIT')) {
      if (!g.fsetP(o, 'OPENBIT')) {
        g.perform('OPEN', o);
        // Deliberate deviation (user decision, 2026-09-10): V-LOOK-INSIDE stops after PERFORM OPEN, so looking into a
        // closed empty canteen answered only "Opened." Once it is open, carry on and say what is (or is not) inside,
        // unless the opening message already listed the contents.
        if (!g.fsetP(o, 'OPENBIT') || (g.contents(o).length && !g.fsetP(o, 'TRANSBIT'))) return;
      }
      const inside = g.contents(o);
      if (!inside.length) return g.tell(`The ${D(g, o)} is empty.`);
      g.tell(`The ${D(g, o)} contains:`); for (const c of inside) g.tell('  ' + (g.fsetP(c, 'VOWELBIT') ? 'An ' : 'A ') + D(g, c));
      return;
    }
    if (g.fsetP(o, 'TRANSBIT')) return g.tell(`You can see dimly through the ${D(g, o)}.`);
    g.tell(`You can't look inside ${g.article(o)} ${D(g, o)}.`);
  },
  // --- verbs.zil routines the port had missed (vocabulary audit, 2026-09-10); text verbatim. -----------------------
  'LOOK-CRETIN'(g) { g.tell("This isn't a primitive two-word-parser adventure game. If you want to look AT that object, please say so."); },
  DIAGNOSE(g) {
    g.state.elapsed = 18;
    const sick = g.getg('SICKNESS-LEVEL') ?? 0, sleepy = g.getg('SLEEPY-LEVEL') ?? 0, hunger = g.getg('HUNGER-LEVEL') ?? 0;
    g.tell(sick === 0 ? 'You are in perfect health.' : `You are ${sick > 7 ? 'severely' : sick > 5 ? 'very' : sick > 3 ? 'somewhat' : 'a bit'} sick and feverish.`);
    g.tell((sleepy === 0 ? 'You feel well-rested.' : `You feel ${sleepy > 2 ? 'phenomenally' : sleepy > 1 ? 'quite' : 'sort of'} tired.`) + clockTail(g, 'sleep', sleepy));
    g.tell((hunger === 0 ? 'You seem to be well-fed.' : `You seem to be ${hunger > 4 ? 'awesomely phenomenally' : hunger > 2 ? 'noticeably' : 'fairly'} thirsty and hungry.`) + clockTail(g, 'hunger', hunger));
    // Said once, the first time either clock has begun to run: what the hours are counted against.
    if ((sleepy || hunger) && !g.getg('CLOCK-EXPLAINED')) {
      g.setg('CLOCK-EXPLAINED', true);
      g.tell('(Those are hours on your chronometer, not turns. Time passes as you move about, and some walks take hours.)');
    }
  },
  // V-SAVE / V-RESTORE: one save slot kept inside the game state (so it survives the page's autosave and a playtest
  // session). Deliberate deviation (interface): the Z-machine's SAVE/RESTORE asked for a file.
  SAVE(g, ctx) { floydQuip(g, "Floyd's eyes light up. \"Oh boy! Are we gonna try something dangerous now?\""); const { saveSlot, ...rest } = g.state; void saveSlot; g.state.saveSlot = JSON.stringify(rest); g.tell('Ok.'); ctx.fatal = true; },
  RESTORE(g, ctx) {
    floydQuip(g, 'Floyd looks disappointed, but understanding. "That part of the game was more fun than this part," he admits.');
    ctx.fatal = true;
    if (!g.state.saveSlot) return g.tell('Failed.');
    // The Z-machine's save held the game's memory, not the interpreter's random generator, so a restored game goes on
    // with fresh chances (the laser's misses are not replayed): keep the current rng.
    const slot = g.state.saveSlot, rng = g.state.rng; g.state = { ...JSON.parse(slot), saveSlot: slot, rng }; g.tell('Ok.'); g.look();
  },
  // V-RESTART / V-QUIT ask "(Y is affirmative)" and act on it. Deliberate deviation (interface): no yes/no prompt here;
  // they give the score and point at the page's Restart button (a browser tab is closed, not quit).
  // The page intercepts RESTART before this runs (game.js), because only the page can rebuild the game; this is
  // what a caller with no page gets -- the harness, and the headless tests.
  RESTART(g, ctx) { g.verbs.SCORE(g, ctx); floydQuip(g, 'Floyd looks sad. "Going away?" he asks.', true); g.tell('To restart, type RESTART again, or use the restart link above the view.'); ctx.fatal = true; },
  QUIT(g, ctx) { g.verbs.SCORE(g, ctx); floydQuip(g, 'Floyd grins impishly. "Giving up, huh?"', true); g.tell('To leave the game, just close the page; it is saved as you go.'); ctx.fatal = true; },
  VERSION(g, ctx) {
    g.tell('PLANETFALL\nInfocom interactive fiction - a science fiction story\nCopyright (c) 1983 by Infocom, Inc. All rights reserved.\nPLANETFALL is a registered trademark of Infocom, Inc.');
    floydQuip(g, '"Last version was better," says Floyd. "More bugs. Bugs make game fun."', true); ctx.fatal = true;
  },
  SCRIPT(g, ctx) { floydQuip(g, 'Floyd hops around excitedly. "Oh boy! I\'ve never seen my name in print before!"'); g.tell('Here begins' + COPR_NOTICE); ctx.fatal = true; },
  UNSCRIPT(g, ctx) { floydQuip(g, '"Can I have a copy of the printout?" asks Floyd, looking up at you.'); g.tell('Here ends' + COPR_NOTICE); ctx.fatal = true; },
  // V-AGAIN is handled by Game.dispatch (it replays the last command); this only runs when there is none.
  AGAIN(g, ctx) { g.tell("You can't see that anymore."); ctx.fatal = true; },
  ANSWER(g, ctx) { g.tell(ctx.prso ? `It is hardly likely that the ${D(g, ctx.prso)} is interested.` : 'Nobody is awaiting your answer.'); },   // V-ANSWER / V-REPLY
  CURSE(g) { g.tell('Such language from an Ensign in the Stellar Patrol!'); },
  SKIP(g) { g.tell(g.pickOne(["You've spent too much time among the Leaping Loon-toads of Leonia.", 'Having fun?', 'Wheeeeeee!!!'])); },   // WHEEEEE
  LEAVE(g, ctx) {   // LEAVE OBJECT = V-DROP; V-LEAVE gets out of the bed or the web, else walks out
    if (ctx.prso) return g.perform('DROP', ctx.prso);
    if (g.isIn('ADVENTURER', 'BED')) return g.perform('DISEMBARK', 'BED');
    if (g.isIn('ADVENTURER', 'SAFETY-WEB')) return g.perform('DISEMBARK', 'SAFETY-WEB');
    return g.doWalk('OUT');
  },
  HELP(g) { g.tell("If you're really stuck, you can order a complete map and InvisiClues Hint Booklet using the order form in your game package."); },
  'LOOK-DOWN'(g) { g.perform('EXAMINE', 'GROUND'); },
  WAVE(g, ctx) { g.tell(`Waving the ${D(g, ctx.prso)}${g.pickOne([" isn't notably helpful.", ' has no effect.', ' is as worthwhile as cleaning a Grotch cage.'])}`); },   // HACK-HACK / HO-HUM
  KNOCK(g, ctx) { const o = ctx.prso; g.tell((g.obj(o)?.synonyms ?? []).includes('DOOR') ? "Nobody's home." : `Why knock on ${g.article(o)} ${D(g, o)}?`); },
  YELL(g) { g.tell('Aarrrrggggggghhhhhhhh!'); },
  SCOLD(g, ctx) { if (g.fsetP(ctx.prso, 'ACTORBIT')) return g.perform('TELL', ctx.prso); g.tell(`For some reason, the ${D(g, ctx.prso)} doesn't seem too chagrined.`); },
  SWIM(g) { g.tell(g.state.here === 'UNDERWATER' ? 'Not much else you can do here. Might try a direction next time, though.' : "You can't swim here!"); },
  'SWIM-DIR'(g) { if (g.state.here === 'UNDERWATER') return g.tell("Okay. You're still underwater."); g.verbs.SWIM(g); },
  'SWIM-UP'(g) { if (g.state.here === 'UNDERWATER') return g.doWalk('UP'); g.verbs.SWIM(g); },
  ZORK(g) { g.tell('Gesundheit!'); },
  // V-CLIMB-FOO: CLIMB alone is V-GO-UP; CLIMB a climbable thing goes up it; anything else is CLIMB-ON.
  'CLIMB-FOO'(g, ctx) { if (!ctx.prso) return g.doWalk('UP'); if (g.fsetP(ctx.prso, 'CLIMBBIT')) return g.perform('CLIMB-UP', ctx.prso); return g.perform('CLIMB-ON', ctx.prso); },
  // V-ENTER: ENTER alone walks in; ENTER OBJECT = V-THROUGH.
  ENTER(g, ctx) { if (ctx.prso) return g.perform('THROUGH', ctx.prso); return g.doWalk('IN'); },
  FIND(g, ctx) {
    g.state.elapsed = 18; const o = ctx.prso, l = g.loc(o);
    if (o === 'ME' || o === 'HANDS') g.tell("You're around here somewhere...");
    else if (g.obj(o)?.location === 'GLOBAL-OBJECTS' || (l == null && g.here().globals.includes(o))) g.tell('You find it.');
    else if (g.isIn(o, 'ADVENTURER')) g.tell('You have it.');
    else if (g.isIn(o, g.state.here) || o === 'PSEUDO-OBJECT') g.tell("It's right here.");
    else if (l && g.fsetP(l, 'ACTORBIT')) g.tell(`The ${D(g, l)} has it.`);
    else if (l && g.fsetP(l, 'CONTBIT')) g.tell(`It's in the ${D(g, l)}.`);
    else g.tell('Beats me.');
  },
  SAY(g) { const actor = g.contents(g.state.here).find(id => g.fsetP(id, 'ACTORBIT')); if (actor) return g.tell(`You must address the ${D(g, actor)} directly.`); g.perform('TELL', 'ME'); },
  RAPE(g) { g.tell('What a (ahem!) strange idea.'); },
  'STEP-ON'(g) { g.tell("That's a silly thing to do."); },
  'STAND-ON'(g, ctx) { g.tell(`Standing on ${g.article(ctx.prso)} ${D(g, ctx.prso)} seems like a waste of time.`); },
  'REACH-FOR'(g, ctx) { const o = ctx.prso; if (g.fsetP(o, 'TAKEBIT')) return g.perform('TAKE', o); g.tell(g.isIn(o, g.state.here) ? "It's here! Now what?" : 'It is out of reach.'); },
  SMILE(g) { g.tell('How pleasant!'); },
  YES(g) { g.tell('You sound rather positive.'); },
  NO(g) { g.tell('You sound rather negative.'); },
  MAYBE(g) { g.tell('You sound rather indecisive.'); },
  'FIX-IT'(g) { g.tell("You shouldn't expect sweeping general commands like this to work. If you want to repair something, you must perform the specific steps required."); },
  // V-INSERT: PUT OBJECT with nowhere named goes into the spool reader or the kitchen niche, else asks where.
  INSERT(g, ctx) {
    if (g.state.here === 'LIBRARY') { g.tell('(into the spool reader)'); return g.perform('PUT', ctx.prso, 'SPOOL-READER'); }
    if (g.state.here === 'KITCHEN') { g.tell('(into the niche)'); return g.perform('PUT', ctx.prso, 'DISPENSER'); }
    g.tell(`You'll have to specify where you want to put the ${D(g, ctx.prso)}.`);
  },
  ZESCAPE(g) { g.tell(g.state.here === 'BRIG' ? 'Houdini himself would be stumped by this cell.' : 'There is no escape. We control the horizontal. We control the vertical. We control the disk drives...'); },
  'WALK-AROUND'(g) { g.tell('Use compass directions for movement.'); },   // USE-DIRECTIONS
  // V-REMOVE: a worn thing is taken off, anything else is taken ("remove padlock").
  REMOVE(g, ctx) { return g.perform(g.fsetP(ctx.prso, 'WORNBIT') ? 'TAKE-OFF' : 'TAKE', ctx.prso); },
  // V-VERBOSE / V-BRIEF / V-SUPER-BRIEF
  VERBOSE(g) { g.setg('VERBOSE', true); g.setg('SUPER-BRIEF', false); g.tell('Maximum verbosity.'); g.crlf(); g.look(); },
  BRIEF(g) { g.setg('VERBOSE', false); g.setg('SUPER-BRIEF', false); g.tell('Brief descriptions.'); },
  'SUPER-BRIEF'(g) { g.setg('SUPER-BRIEF', true); g.tell('Super-brief descriptions.'); },
  SEARCH(g) { g.state.elapsed = 32; g.tell('You find nothing unusual.'); },
  READ(g, ctx) { const o = ctx.prso; if (!g.fsetP(o, 'READBIT')) return g.tell(`How can I read ${g.article(o)} ${D(g, o)}?`); g.state.elapsed = 18; g.tell(g.obj(o).text ?? `There is nothing written on the ${D(g, o)}.`); },
  WEAR(g, ctx) { const o = ctx.prso; if (!g.fsetP(o, 'WEARBIT')) return g.tell("They're out of fashion, and besides, it wouldn't fit."); if (!g.held(o) && itake(g, { ...ctx, silent: true }) !== true) return; g.state.elapsed = 18; g.fset(o, 'WORNBIT'); g.tell(`You are wearing the ${D(g, o)}.`); },
  'TAKE-OFF'(g, ctx) { const o = ctx.prso; if (g.fsetP(o, 'VEHBIT')) return g.perform('DISEMBARK', o); if (!g.fsetP(o, 'WORNBIT')) return g.tell("You aren't wearing that."); g.state.elapsed = 18; g.fclear(o, 'WORNBIT'); g.tell(`You are no longer wearing the ${D(g, o)}.`); },
  EAT(g, ctx) { const o = ctx.prso; if (!g.fsetP(o, 'FOODBIT')) return g.tell(`I don't think the ${D(g, o)} would agree with you.`); g.remove(o); g.tell('Thank you very much. It really hit the spot.'); },
  THROW(g, ctx) { const o = ctx.prso; if (!g.held(o)) return g.tell(`You're not carrying the ${D(g, o)}.`); g.move(o, g.state.here); g.tell(`The ${D(g, o)} lands on the floor.`); },

  BOARD(g, ctx) { const o = ctx.prso; if (!g.fsetP(o, 'VEHBIT')) return g.tell(`You can't get into the ${D(g, o)}.`); g.tell(`You are now in the ${D(g, o)}.`); g.move('ADVENTURER', o); g.rules.objects[o]?.(g, { ...ctx, rarg: 'M-ENTER' }); },
  'CLIMB-ON'(g, ctx) { if (g.fsetP(ctx.prso, 'VEHBIT')) return g.perform('BOARD', ctx.prso); g.tell(`You can't climb onto the ${D(g, ctx.prso)}.`); },
  DISEMBARK(g, ctx) {
    const v = g.inVehicle();
    if (!ctx.prso) { if (v) return g.perform('DISEMBARK', v); return g.doWalk('OUT'); }
    if (ctx.prso !== v) return g.tell("You're not in that!");
    g.move('ADVENTURER', g.state.here); g.tell('You are on your own feet again.');
  },
  STAND(g, ctx) { const v = g.inVehicle(); if (v) return g.perform('DISEMBARK', v); g.tell('You are already standing, I think.'); void ctx; },
  EXIT(g, ctx) { return g.verbs.DISEMBARK(g, ctx); },
  THROUGH(g, ctx) {
    const o = ctx.prso;
    if (g.fsetP(o, 'VEHBIT')) return g.perform('BOARD', o);
    if (!g.fsetP(o, 'TAKEBIT')) return g.tell(`You hit your head against the ${D(g, o)} as you attempt this feat.`);
    if (g.held(o)) return g.tell('That would involve quite a contortion!');
    g.tell(g.pickOne(YUKS));
  },
  'WALK-TO'(g, ctx) { g.tell(ctx.prso && (g.loc(ctx.prso) === g.state.here || g.here().globals.includes(ctx.prso)) ? "It's here!" : 'Use compass directions for movement.'); },   // V-WALK-TO, USE-DIRECTIONS
  'CLIMB-UP'(g, ctx) { if (g.here().exits.some(e => e.direction === 'UP')) return g.doWalk('UP'); g.tell("You can't go that way."); void ctx; },
  'CLIMB-DOWN'(g, ctx) { if (ctx.prso && g.fsetP(ctx.prso, 'VEHBIT')) return g.perform('BOARD', ctx.prso); if (g.here().exits.some(e => e.direction === 'DOWN')) return g.doWalk('DOWN'); g.tell("You can't go that way."); },

  HELLO(g, ctx) { if (ctx.prso) return g.verbs.TALK(g, ctx); g.tell('Hello.'); },
  KICK(g, ctx) { g.verbs.ATTACK(g, ctx); },
  TALK(g, ctx) { g.tell(g.fsetP(ctx.prso, 'ACTORBIT') ? `The ${D(g, ctx.prso)} doesn't answer.` : `You can't talk to ${g.article(ctx.prso)} ${D(g, ctx.prso)}!`); },
  SALUTE(g) { g.tell('You salute smartly.'); },
  ATTACK(g, ctx) { g.tell(g.fsetP(ctx.prso, 'ACTORBIT') ? `The ${D(g, ctx.prso)} is unmoved.` : `Attacking the ${D(g, ctx.prso)} would accomplish nothing.`); },
  LISTEN(g) { g.tell('You hear nothing unusual.'); },
  SMELL(g) { g.tell('It smells about like you would expect.'); },
  PUSH(g, ctx) { g.tell(`Pushing the ${D(g, ctx.prso)} doesn't seem to do anything.`); },
  PULL(g, ctx) { g.tell(`Pulling the ${D(g, ctx.prso)} doesn't seem to do anything.`); },
  RUB(g, ctx) { g.tell(`Rubbing the ${D(g, ctx.prso)} accomplishes nothing.`); },

  // V-WALK: direct, blocked, conditional (door or flag), or routine exits.
  //
  // Deliberate deviation (user decision, 2026-09-11, round eleven), announceWalk below: a walk that costs much more
  // than an ordinary step (20 minutes) says what it cost. Today only the long hall qualifies, at 160 minutes each
  // way -- eight ordinary moves, a third of the time between two hunger warnings -- and nothing said so.
  WALK(g, ctx) {
    const dir = ctx.dir; if (!DIRECTIONS.includes(dir)) { g.tell("You can't go that way."); ctx.fatal = true; return; }
    const e = g.here().exits.find(x => x.direction === dir);
    const time = g.moveTime(dir);
    if (!e) { g.tell("You can't go that way."); ctx.fatal = true; return; }
    if (e.kind === 'blocked') { g.tell(e.expression[0].replace(/^"|"$/g, '')); ctx.fatal = true; return; }
    if (e.kind === 'direct') { g.state.elapsed = time; g.goto(e.target); return announceWalk(g, time); }
    if (e.kind === 'conditional') {
      if (e.door) {
        if (g.fsetP(e.door, 'OPENBIT')) { g.state.elapsed = time; g.goto(e.target); return announceWalk(g, time); }
        g.tell(`The ${D(g, e.door)} is closed.`); g.state.lastObject = e.door; ctx.fatal = true; return;
      }
      if (g.getg(e.flag)) { g.state.elapsed = time; g.goto(e.target); return announceWalk(g, time); }
      g.tell(e.elseMessage ?? "You can't go that way."); ctx.fatal = true; return;
    }
    if (e.kind === 'routine') {
      const fn = g.rules.exits[e.routine];
      if (!fn) { g.notes.add('exit ' + e.routine); g.tell("You can't go that way."); ctx.fatal = true; return; }
      // V-WALK sets C-ELAPSED for plain and conditional exits only; a routine exit (FEXIT) keeps the turn's default 7
      // unless the routine sets its own (LONG-HALL-F's 160, LADDER-EXIT-F's 33).
      const room = fn(g, dir);
      if (room) { const spent = g.state.elapsed; g.goto(room); return announceWalk(g, spent); }
      ctx.fatal = true; return;
    }
  },
};

// PRE-TAKE (verbs.zil 497-521) and PRE-PUT (587-593): they run before the objects' routines (Game.perform). A true
// return ends the command.
export const PRE_VERBS = {
  TAKE(g, ctx) {
    const o = ctx.prso; if (!o || o === 'PSEUDO-OBJECT') return false;
    if (g.isIn(o, 'ADVENTURER')) { g.tell('You already have it.'); return true; }   // held directly, not inside something held
    if (o === 'GOOD-BOARD' && g.fsetP('GOOD-BOARD', 'NDESCBIT')) return false;
    const l = g.loc(o);
    if (l && g.fsetP(l, 'CONTBIT') && !g.fsetP(l, 'OPENBIT')) { g.tell("You can't reach into a closed container."); return true; }
    if (ctx.prsi) {   // TAKE X FROM Y
      if (ctx.prsi !== l) {
        if ((o === 'KEY' && !g.fsetP('KEY', 'TOUCHBIT')) || (o === 'CELERY' && ctx.prsi === 'AMBASSADOR')) return false;
        g.tell("It's not in that!"); return true;
      }
      ctx.prsi = null; return false;
    }
    if (o === g.playerLoc()) { g.tell('You are in it, asteroid-brain!'); return true; }
    return false;
  },
  PUT: prePut, 'PUT-ON': prePut,
  SZAP(g, ctx) { g.perform('ZAP', ctx.prsi, ctx.prso); return true; },   // PRE-SZAP (verbs.zil 1659): "shoot X with Y" is ZAP Y X
};
function prePut(g, ctx) {
  const o = ctx.prso; if (!o || o === 'PSEUDO-OBJECT') return false;
  // Round twelve: a scenery tag as the indirect object is a place, not a container, and only the room's own routine
  // can answer it -- "put lever in center position" is a way of saying "center the lever". PRE-PUT's "Nice try." is
  // about picking the direct object up, which is not what was asked.
  if (ctx.prsi === 'PSEUDO-OBJECT') return false;
  if (g.fsetP(o, 'WORNBIT')) { g.tell("You can't while you're wearing it."); return true; }
  if (g.objects[o]?.location === 'GLOBAL-OBJECTS' || !g.fsetP(o, 'TAKEBIT')) { g.tell('Nice try.'); return true; }
  return false;
}

// ITAKE: returns true when taken, false when refused (message printed unless silent).
export function itake(g, ctx) {
  const o = ctx.prso;
  if (!g.fsetP(o, 'TAKEBIT')) { if (!ctx.silent) g.tell(g.pickOne(YUKS)); return false; }
  if (g.isIn(o, 'ADVENTURER')) { if (!ctx.silent) g.tell('You already have it.'); return false; }
  // Taking a thing out of a container held directly adds no weight, so the load is not checked (verbs.zil 546).
  if (!g.isIn(g.loc(o), 'ADVENTURER') && g.weight(o) + g.weight('ADVENTURER') > g.getg('LOAD-ALLOWED')) {
    if (!ctx.silent) { if (g.heavyInList) { g.heavyInList.push(o); g.tell('Your load is too heavy.'); } else g.tell(tooHeavy(g, o)); }   // in a list the hint waits for the end (Game.performList)
    ctx.fatal = true; return false;
  }
  // The fumble (verbs.zil 527-529, 552-578): with more than seven things in hand (worn ones count), each take risks
  // dropping the newest unworn one (FIRST? ,ADVENTURER), and the thing being taken, even when silent.
  const count = g.contents('ADVENTURER').length;
  if (count > 7 && g.prob(count * 8)) {
    const seq = id => g.state.objects[id].seq ?? 0;
    const drop = g.contents('ADVENTURER').filter(id => !g.fsetP(id, 'WORNBIT')).sort((a, b) => seq(b) - seq(a))[0];
    g.tell(`Oh, no. The ${D(g, drop)} slips from your arms while taking the ${D(g, o)} and both tumble to the ground.`);
    // Deliberate deviation (user decision, 2026-09-11, round eleven): the source empties the flask when a fumble
    // drops it (verbs.zil 564-568), which costs a 24-move fetch on a turn that itself costs nothing, and names
    // neither what slipped nor why. The flask now survives the fall; the fumble still drops both things.
    if ([drop, o].includes('FLASK') && g.isIn('CHEMICAL-FLUID', 'FLASK')) g.tell('The flask lands on its side, and you are lucky: the stopper holds and the chemical stays in it.');
    if ([drop, o].includes('CANTEEN') && g.isIn('HIGH-PROTEIN', 'CANTEEN') && g.fsetP('CANTEEN', 'OPENBIT')) { g.remove('HIGH-PROTEIN'); g.tell('To make matters worse, the high-protein liquid spills all over the place and then evaporates.'); }
    g.move(drop, g.state.here); g.move(o, g.state.here); ctx.fatal = true; return false;
  }
  g.move(o, 'ADVENTURER'); g.fclear(o, 'NDESCBIT'); g.scoreObj(o); g.fset(o, 'TOUCHBIT');
  if (g.getg('SPOUT-PLACED') === o) g.setg('SPOUT-PLACED', 'GROUND');   // ITAKE: taking what sits under the machine shop's spout frees it
  return true;
}
export function idrop(g, ctx) {
  const o = ctx.prso;
  if (!g.held(o)) { g.tell(`You're not carrying the ${D(g, o)}.`); return false; }
  if (g.fsetP(o, 'WORNBIT')) { g.tell("You'll have to take it off, first."); return false; }
  if (!g.isIn(o, 'ADVENTURER') && !g.fsetP(g.loc(o), 'OPENBIT')) { g.tell(`The ${D(g, g.loc(o))} is closed.`); return false; }
  g.move(o, g.playerLoc() === g.state.here ? g.state.here : g.state.here); return true;
}
// ITAKE's "Your load is too heavy." Deliberate deviation (user decisions, 2026-09-10, rounds three and four): say what
// to drop, since every playtester shed things one at a time without knowing what was heavy or whether it would be
// enough. The lightest single thing that makes enough room is named; failing that, the heaviest few together. When
// even empty hands would not do (sickness shrinks LOAD-ALLOWED), the original line stands alone. A rule module can
// still supply its own reason for one object through helpers['TOO-HEAVY'].
export function tooHeavy(g, o) {
  const own = g.rules.helpers?.['TOO-HEAVY']?.(g, o); if (own) return own;
  // Deliberate deviation (user decision, 2026-09-11, round ten): the worn Patrol uniform is a container, so putting
  // small things in its pocket relieves the carry limit -- a load-bearing mechanic that round ten found by accident
  // after seven hundred commands, and the typed run called the carry limit the game's real difficulty. Said once,
  // the first time the limit actually bites.
  const pocket = !g.getg('POCKET-HINTED') && g.fsetP('UNIFORM', 'WORNBIT') && g.seeInside('UNIFORM')
    ? (g.setg('POCKET-HINTED', true), ' (Your uniform has a pocket you can put small things in.)') : '';
  const need = g.weight(o) + g.weight('ADVENTURER') - g.getg('LOAD-ALLOWED');
  const carried = g.contents('ADVENTURER').filter(c => !g.fsetP(c, 'WORNBIT')).map(c => ({ id: c, w: g.weight(c) }));
  if (carried.reduce((n, c) => n + c.w, 0) < need) return 'Your load is too heavy.' + pocket;
  const one = carried.filter(c => c.w >= need).sort((a, b) => a.w - b.w)[0];
  if (one) return `Your load is too heavy. Dropping the ${D(g, one.id)} would make enough room.` + pocket;
  const pick = []; let freed = 0;
  for (const c of carried.sort((a, b) => b.w - a.w)) { pick.push(`the ${D(g, c.id)}`); freed += c.w; if (freed >= need) break; }
  const list = pick.length > 1 ? `${pick.slice(0, -1).join(', ')} and ${pick[pick.length - 1]}` : pick[0];
  return `Your load is too heavy. You'd have to drop ${list} first.` + pocket;
}
const COPR_NOTICE = ' a transcript of interaction with PLANETFALL.\nPLANETFALL is a registered trademark of Infocom, Inc.\nCopyright (c) 1983 Infocom, Inc.  All rights reserved.';
// The line Floyd adds to SAVE, RESTORE, SCRIPT and the rest when he is here and switched on (sets FLOYD-SPOKE).
function floydQuip(g, text, before = false) {
  if (!g.isIn('FLOYD', g.state.here) || !g.fsetP('FLOYD', 'RLANDBIT')) return;
  g.setg('FLOYD-SPOKE', true); if (before) g.crlf(); g.tell(text, 'event'); if (!before) g.crlf();
}
function listNames(g, ids) { const n = ids.map(id => `${g.article(id)} ${D(g, id)}`); return n.length > 1 ? n.slice(0, -1).join(', ') + ' and ' + n.at(-1) : n[0]; }
void the;
