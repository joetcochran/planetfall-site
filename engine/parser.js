// Small command parser: verb phrase, optional direct object, optional preposition + indirect object.
// Nouns resolve against the objects in scope using the synonyms and adjectives extracted from ZIL.
// This is not the original parser; it covers the phrasings the click UI produces plus common typed forms.

import { pseudoLabel } from './core.js';
export { pseudoLabel };

const DIRS = { n:'NORTH', north:'NORTH', s:'SOUTH', south:'SOUTH', e:'EAST', east:'EAST', w:'WEST', west:'WEST', ne:'NE', northeast:'NE', nw:'NW', northwest:'NW',
  se:'SE', southeast:'SE', sw:'SW', southwest:'SW', u:'UP', up:'UP', d:'DOWN', down:'DOWN', in:'IN', inside:'IN', out:'OUT', outside:'OUT',
  port:'WEST', starboard:'EAST', fore:'NORTH', aft:'SOUTH' };

// Longest phrase first. [phrase, verb, needsObject (0 none, 1 required, 2 optional), preposition for a second object]
const VERBS = [
  ['pick up','TAKE',1], ['take off','TAKE-OFF',1], ['put on','WEAR',1], ['look at','EXAMINE',1], ['look in','LOOK-INSIDE',1], ['look into','LOOK-INSIDE',1], ['look inside','LOOK-INSIDE',1],
  ['look through','LOOK-INSIDE',1], ['look out','LOOK-INSIDE',1], ['get in','BOARD',1], ['get into','BOARD',1], ['climb in','BOARD',1], ['climb into','BOARD',1],
  ['get out of','DISEMBARK',1], ['get out','DISEMBARK',0], ['get off','DISEMBARK',0], ['stand up','STAND',0], ['get up','STAND',0], ['go through','THROUGH',1],
  ['talk to','TALK',1], ['get on','CLIMB-ON',1], ['get onto','CLIMB-ON',1], ['climb up','CLIMB-UP',0], ['climb down','CLIMB-DOWN',0], ['climb on','CLIMB-ON',1], ['climb onto','CLIMB-ON',1],
  ['take','TAKE',1], ['get','TAKE',1], ['grab','TAKE',1], ['drop','DROP',1], ['put','PUT',1,'in|into|inside|on'], ['open','OPEN',1], ['close','CLOSE',1], ['shut','CLOSE',1],
  ['examine','EXAMINE',1], ['x','EXAMINE',1], ['inspect','EXAMINE',1], ['read','READ',1], ['search','SEARCH',1], ['look','LOOK',0], ['l','LOOK',0],
  ['inventory','INVENTORY',0], ['i','INVENTORY',0], ['wait','WAIT',0], ['z','WAIT',0], ['wear','WEAR',1], ['remove','REMOVE',1,'from|with',{ from: 'TAKE', with: 'ZATTRACT' }], ['eat','EAT',1],
  ['enter','ENTER',2], ['board','BOARD',1], ['exit','DISEMBARK',0], ['leave','LEAVE',2], ['disembark','DISEMBARK',0], ['stand','STAND',0],
  ['hello','HELLO',2], ['hi','HELLO',2], ['salute','SALUTE',1], ['attack','ATTACK',1], ['kick','KICK',1], ['hit','ATTACK',1], ['kill','ATTACK',1],
  ['listen','LISTEN',0], ['smell','SMELL',1], ['push','PUSH',1], ['pull','PULL',1], ['rub','RUB',1], ['throw','THROW',1,'at|to'], ['time','TIME',0], ['score','SCORE',0],
  ['climb','CLIMB-FOO',2], ['go','WALK',1], ['walk','WALK',1], ['run','WALK',1],
  ['verbose','VERBOSE',0], ['brief','BRIEF',0], ['superbrief','SUPER-BRIEF',0], ['super','SUPER-BRIEF',0],
  // syntax.zil words the port had missed (found by auditing every SYNTAX verb and verb SYNONYM against this parser,
  // 2026-09-10, after the typed playtester's "extend ladder" was an unknown word). Synonyms of verbs above first.
  ['extend','OPEN',1], ['unfold','OPEN',1], ['lengthen','OPEN',1], ['collapse','CLOSE',1], ['fold','CLOSE',1], ['shorten','CLOSE',1],
  ['fight','ATTACK',1], ['hurt','ATTACK',1], ['injure','ATTACK',1], ['murder','ATTACK',1], ['slay','ATTACK',1], ['dispatch','ATTACK',1], ['strike','ATTACK',1], ['knock down','ATTACK',1],
  ['release','DROP',1], ['describe','EXAMINE',1], ['what','EXAMINE',1], ['whats','EXAMINE',1], ['stare at','EXAMINE',1], ['gaze at','EXAMINE',1],
  ['stare','LOOK',0], ['gaze','LOOK',0], ['look around','LOOK',0], ['rummage','SEARCH',1], ['sort','SEARCH',1], ['sift','SEARCH',1], ['tug','PULL',1],
  ['stuff','PUT',1,'in|into|inside|on'], ['insert','PUT',1,'in|into|inside|on'], ['apply','PUT',1,'to'], ['skim','READ',1],
  ['touch','RUB',1], ['feel','RUB',1], ['pat','RUB',1], ['pet','RUB',1], ['sniff','SMELL',1], ['hold','TAKE',1], ['carry','TAKE',1], ['pick','TAKE',1], ['proceed','WALK',1],
  // verbs of their own (engine/verbs.js ports them from verbs.zil)
  ['diagnose','DIAGNOSE',0], ['again','AGAIN',0], ['g','AGAIN',0], ['save','SAVE',0], ['restore','RESTORE',0], ['restart','RESTART',0], ['quit','QUIT',0], ['q','QUIT',0],
  ['script','SCRIPT',0], ['unscript','UNSCRIPT',0], ['version','VERSION',0], ['help','HELP',0], ['hint','HELP',0], ['hints','HELP',0],
  ['answer','ANSWER',2], ['reply','ANSWER',2], ['curse','CURSE',2], ['damn','CURSE',2], ['shit','CURSE',2], ['fuck','CURSE',2], ['trot','CURSE',2], ['krip','CURSE',2], ['megakrip','CURSE',2], ['trotting','CURSE',2],
  ['find','FIND',1], ['where','FIND',1], ['seek','FIND',1], ['see','FIND',1], ['look for','FIND',1], ['search for','FIND',1],
  ['knock on','KNOCK',1], ['knock at','KNOCK',1], ['knock','KNOCK',1], ['rap on','KNOCK',1], ['rap','KNOCK',1],
  ['point at','POINT',1], ['point to','POINT',1], ['point','POINT',1,'at|to'], ['aim','POINT',1,'at|to'], ['gesture at','POINT',1], ['gesture','POINT',1,'at|to'],
  ['rape','RAPE',1], ['molest','RAPE',1], ['reach in','REACH',1], ['reach into','REACH',1], ['reach for','REACH-FOR',1], ['reach','REACH-FOR',1],
  ['skip','SKIP',0], ['hop','SKIP',0], ['step on','STEP-ON',1], ['step in','STEP-ON',1], ['stand on','STAND-ON',1],
  ['swim up','SWIM-UP',0], ['swim','SWIM',2], ['bathe','SWIM',2], ['wade','SWIM',2],
  ['smile at','SMILE',1], ['smile','SMILE',0], ['grin at','SMILE',1], ['grin','SMILE',0], ['say to','TALK',1], ['say','SAY',0], ['talk','SAY',0],
  ['wave','WAVE',1,'at'], ['brandish','WAVE',1,'at'], ['yell at','SCOLD',1], ['scream at','SCOLD',1], ['shout at','SCOLD',1], ['yell','YELL',0], ['scream','YELL',0], ['shout','YELL',0],
  ['zork','ZORK',0], ['sneeze','ZORK',0], ['yes','YES',2], ['y','YES',2], ['affirmative','YES',2], ['no','NO',0], ['negative','NO',0], ['maybe','MAYBE',0], ['possibly','MAYBE',0], ['dunno','MAYBE',0],
  ['swab','SCRUB',1,'with'], ['shine','SCRUB',1,'with'], ['mop','SCRUB',1,'with'], ['brush','SCRUB',1,'with'], ['swing','SLIDE',1,'through|thru|in|into'], ['surprise','ALARM',1], ['startle','ALARM',1],
  ['fix','FIX-IT',1], ['repair','FIX-IT',1], ['escape','ZESCAPE',0], ['walk around','WALK-AROUND',1], ['look down','LOOK-DOWN',0],
];
// WHICH-PRINT's "the X", except for a proper name (Game.properName: "Floyd", not "the Floyd").
const theName = (g, id) => g.properName(id) ?? 'the ' + g.name(id);
// syntax.zil 6's BUZZ words (A AN THE IS ARE ONE OUR ...) are skipped wherever they stand (parser.zil 274), so "what is
// goo" is WHAT GOO and "the blue one" answers "Which do you mean ...?" as BLUE does (round nineteen).
const NOISE = new Set(['the','a','an','to','at','with','my','some','your','is','are','one','our']);
// A verb with no declared preposition still splits "VERB NOUN with/about/... NOUN" into two objects, so that
// "open padlock with pliers" or "ask floyd about water" reach the object's handler instead of failing on a
// noun made of both nouns ("You can't see any padlock pliers here!"), which the typed playtest hit five times.
const PREPS = ['with', 'about', 'to', 'at', 'on', 'in', 'into', 'inside', 'under', 'from', 'off', 'through', 'thru', 'across', 'onto', 'over', 'behind'];
// Rule modules add phrases through rules.vocabulary; longer phrases are tried first.
// An entry whose phrase already exists extends that phrase with its prepositions, and the entry's verb is
// used when one of those prepositions is present: ['put', 'SPAN', 1, 'across'] makes "put ladder across
// rift" parse as SPAN while "put can in niche" still parses as PUT (syntax.zil has one SYNTAX per preposition).
export function addVocabulary(entries) {
  for (const e of entries) {
    const existing = VERBS.find(v => v[0] === e[0]);
    if (!existing) { VERBS.push(e); continue; }
    if (!e[3]) continue;
    const byPrep = existing[4] ?? (existing[4] = {});
    for (const prep of e[3].split('|')) { if (!byPrep[prep] && e[1] !== existing[1]) byPrep[prep] = e[1]; }
    existing[3] = [...new Set([...(existing[3] ? existing[3].split('|') : []), ...e[3].split('|')])].join('|');
  }
  VERBS.sort((a, b) => b[0].split(' ').length - a[0].split(' ').length);
}

// Round twelve (A11): the game asks "Which do you mean, the first fromitz board or the fourth fromitz board?" and
// then did not understand "first", because there was no pending question -- the answer was parsed as a fresh command
// and came back as an unknown word. The words the question itself printed are now an answer to it.
export function parse(text, g) {
  const pending = g.state?.pendingAsk;
  if (g.state) g.state.pendingAsk = null;
  if (pending) {
    const words = text.toLowerCase().replace(/[^a-z0-9'\- ]/g, ' ').split(/\s+/).filter(Boolean).filter(w => !NOISE.has(w));
    const startsAVerb = !!words.length && VERBS.some(v => v[0].split(' ')[0] === words[0]);
    // A lone direction is a walk, never an answer (parser.zil sets DIR and returns before ORPHAN-MERGE): the elevator
    // buttons have NORTH and SOUTH as adjectives, so "push button", then "south" pushed the red one.
    const aWalk = words.length === 1 && Object.hasOwn(DIRS, words[0]);
    if (words.length && !startsAVerb && !aWalk) {
      const r = resolve(words, g, pending.candidates);
      if (!r.error) return { ...pending.cmd, [pending.slot]: r.id, text: `${pending.text} (${text})` };
    }
  }
  const out = parseCommand(text, g);
  if (g.state && out?.error && out.ask) g.state.pendingAsk = { ...out.ask, candidates: out.candidates, text };
  return out;
}

function parseCommand(text, g) {
  // "floyd, follow me": a command addressed to an actor in the room (the original's WINNER); the rest is parsed as usual.
  const addressed = text.match(/^\s*([a-z][a-z'\-]*)\s*,\s*(.+)$/i);
  if (addressed) {
    const r = resolve([addressed[1].toLowerCase()], g);
    if (r.error) return r;
    if (!g.fsetP(r.id, 'ACTORBIT')) return { error: `You can't talk to the ${g.name(r.id)}!` };
    const cmd = parseCommand(addressed[2], g);
    if (cmd.error) { if (cmd.ask) cmd.ask.cmd = { ...cmd.ask.cmd, winner: r.id }; return cmd; }
    return { ...cmd, winner: r.id, text };
  }
  let words = text.toLowerCase().replace(/,/g, ' and ').replace(/[^a-z0-9'\- ]/g, ' ').split(/\s+/).filter(Boolean);
  if (!words.length) return { error: 'I beg your pardon?' };
  // THE, A and AN are BUZZ words (syntax.zil 6): the source's parser skips them before it looks for the verb's
  // preposition, so "press the up button" is PUSH UP BUTTON (syntax.zil 252). Round nineteen: "You can't see any up
  // button here!" in the Upper Elevator, whose text lists an Up button.
  words = [words[0], ...words.slice(1).filter(w => !['the', 'a', 'an'].includes(w))];
  // A particle at the end of the sentence belongs to the verb (parser.zil 252-258: a preposition with nothing after it
  // becomes the verb's preposition): "push lever up" is PUSH UP LEVER, "take uniform off" is TAKE OFF UNIFORM.
  const last = words.at(-1);
  if (words.length >= 3 && ['up', 'down', 'on', 'off'].includes(last) && VERBS.some(v => v[0] === `${words[0]} ${last}`)) words = [words[0], last, ...words.slice(1, -1)];
  if (words.length === 1 && DIRS[words[0]]) return { verb: 'WALK', dir: DIRS[words[0]], text };
  // V-PUSH with a number (INTNUM): "push 2" in a booth, "press 384" at a keyboard (kalamontee.js PUSH-NUMBER).
  if (['push', 'press'].includes(words[0]) && /^\d+$/.test(words[1] ?? '') && g.verbs['PUSH-NUMBER']) return { verb: 'PUSH-NUMBER', text };
  let verb = null, needs = 0, prep = null, byPrep = null, rest = words;
  for (const [phrase, v, n, p, pv] of VERBS) {
    const pw = phrase.split(' ');
    if (pw.every((w, i) => words[i] === w)) { verb = v; needs = n; prep = p; byPrep = pv ?? null; rest = words.slice(pw.length); break; }
  }
  if (!verb) return { error: `I don't know the word "${words[0]}".` };
  if (verb === 'WALK' && ['to', 'toward', 'towards'].includes(rest[0])) {   // WALK TO OBJECT = V-WALK-TO (syntax.zil 397), never a walk: "go to storage west"
    const nw = rest.slice(1).filter(w => !NOISE.has(w));
    if (!nw.length) return { error: `What do you want to ${words[0]} to?` };
    const r = resolve(nw, g); if (r.error && /^Which/.test(r.error)) return r;
    return r.error ? { verb: 'WALK-TO', text } : { verb: 'WALK-TO', prso: r.id, text };   // a place, or a thing not here: "Use compass directions for movement."
  }
  // WALK IN OBJECT and WALK WITH (THROUGH, THRU) OBJECT are V-THROUGH (syntax.zil 392-393; IN takes INSIDE and INTO,
  // syntax.zil 9): "go in the shuttle" is the shuttle's "Use 'north' or 'south'." Round nineteen: it walked IN instead
  // ("You can't go that way."), and "run into the escape pod" failed on "into".
  if (verb === 'WALK' && ['in', 'inside', 'into', 'with', 'through', 'thru'].includes(rest[0]) && rest.some((w, i) => i > 0 && !NOISE.has(w))) { verb = 'THROUGH'; needs = 1; rest = rest.slice(1); }
  if (verb === 'WALK') { const d = rest.find(w => DIRS[w]); if (d) return { verb, dir: DIRS[d], text }; if (!rest.length) return { error: 'Which way?' }; verb = 'WALK-TO'; needs = 1; }
  // Deliberate deviation (user decision, 2026-09-12, round eleven): "wait until morning" used to drop its last two
  // words and answer "Time passes...", which is indistinguishable from having worked. Round eleven's typed tester
  // spent nineteen of them on a night he could not measure, and lost the Lawanda half of the leg to it.
  if (verb === 'WAIT' && rest.filter(w => !NOISE.has(w)).length) return { error: 'You can only WAIT, one turn at a time. Time passes as you move about, not as you type.' };
  if (verb === 'SWIM' && rest.length) { const d = rest.find(w => DIRS[w]); if (d) return DIRS[d] === 'UP' ? { verb: 'SWIM-UP', text } : { verb: 'SWIM-DIR', dir: DIRS[d], text }; }   // SWIM OBJECT / SWIM DOWN = V-SWIM-DIR
  if (verb === 'LOOK' && rest.length && !['around'].includes(rest[0])) { const r = resolve(rest.filter(w => !NOISE.has(w)), g); if (!r.error) return { verb: 'LOOK-CRETIN', prso: r.id, text }; }   // LOOK OBJECT = V-LOOK-CRETIN
  let objWords = rest, prsiWords = [];
  let split = false;
  if (prep) {
    const re = new RegExp('^(' + prep + ')$');
    const i = rest.findIndex(w => re.test(w));
    if (i >= 0) { objWords = rest.slice(0, i); prsiWords = rest.slice(i + 1); if (byPrep?.[rest[i]]) verb = byPrep[rest[i]]; prep = rest[i]; split = true; }   // prep: the word actually used
  }
  if (!split && needs) {
    const i = rest.findIndex((w, k) => k > 0 && PREPS.includes(w));   // an undeclared preposition still separates the two nouns ("ask floyd about card")
    if (i > 0) { objWords = rest.slice(0, i); prsiWords = rest.slice(i + 1); prep = rest[i]; }
  }
  objWords = objWords.filter(w => !NOISE.has(w)); prsiWords = prsiWords.filter(w => !NOISE.has(w));
  const result = { verb, text };
  if (needs === 2 && !objWords.length) needs = 0;
  if (needs) {
    if (!objWords.length) return { error: `What do you want to ${words[0]}?` };
    // ALL with a noun ("take all boards", "drop all cards") is every one of those things (P-ALL with P-NAM set: GET-OBJECT
    // keeps each match). It used to reach the noun resolver whole: "You can't see any all boards here!" (round sixteen).
    if (['all', 'every'].includes(objWords[0]) && objWords.length > 1 && !['except', 'but'].includes(objWords[1]) && ['TAKE', 'DROP', 'EXAMINE'].includes(verb)) {
      const r = resolve(objWords.slice(1), g);
      if (r.error && !r.candidates) return r;
      const ids = (r.candidates ?? [r.id]).filter(id => verb === 'TAKE' ? !g.held(id) : verb === 'DROP' ? g.held(id) && !g.fsetP(id, 'WORNBIT') : true);
      if (ids.length > 1) return { verb, prsos: ids, text };
      if (ids.length === 1) return { verb, prso: ids[0], text };
      return r.error ? r : { verb, prso: r.id, text };
    }
    if (['all', 'everything'].includes(objWords[0]) && ['TAKE', 'DROP', 'EXAMINE'].includes(verb) && (objWords.length === 1 || ['except', 'but'].includes(objWords[1]))) {   // "take all" / "drop all" / "take all from box" / "drop all except card"; EXAMINE takes MANY too (syntax.zil 129)
      const cmd = { verb, all: true, text };
      if (objWords.length > 1) {   // ALL EXCEPT / ALL BUT (parser.zil P-BUTS): the things named are left out
        const groups = []; let cur = [];
        for (const w of objWords.slice(2)) { if (w === 'and') { if (cur.length) groups.push(cur); cur = []; } else cur.push(w); }
        if (cur.length) groups.push(cur);
        if (!groups.length) return { error: `What do you want to ${words[0]} all but?` };
        cmd.except = [];
        for (const gw of groups) { const r = resolve(gw, g); if (r.error) return r; cmd.except.push(r.id); }
      }
      if (verb === 'TAKE' && prsiWords.length && ['from', 'in', 'out', 'off'].includes(prep)) { const r = resolve(prsiWords, g); if (r.error) return r; cmd.from = r.id; }
      return cmd;
    }
    if (verb === 'GIVE' && !prsiWords.length && objWords.length > 1) {   // GIVE OBJECT OBJECT = V-SGIVE (syntax.zil 156): "give floyd the key", "floyd, give me the card"
      for (let i = 1; i < objWords.length; i++) {
        const a = resolve(objWords.slice(0, i), g);
        if (a.error || (a.id !== 'ME' && !g.fsetP(a.id, 'ACTORBIT'))) continue;
        const o = resolve(objWords.slice(i), g); if (o.error) return o;
        return { verb, prso: o.id, prsi: a.id, text };   // PRE-SGIVE swaps them into GIVE thing TO actor
      }
    }
    if (['TAKE', 'DROP', 'EXAMINE'].includes(verb) && objWords.includes('and')) {   // "take kit and towel", "drop brush, towel", "examine box and flask"
      const groups = []; let cur = [];
      for (const w of objWords) { if (w === 'and') { if (cur.length) groups.push(cur); cur = []; } else cur.push(w); }
      if (cur.length) groups.push(cur);
      const ids = [];
      for (const gw of groups) { const r = onGround(g, verb, prsiWords, resolve(gw, g)); if (r.error) return r; if (!ids.includes(r.id)) ids.push(r.id); }
      if (ids.length > 1) return { verb, prsos: ids, text };
      result.prso = ids[0];
    } else {
      const r = onGround(g, verb, prsiWords, resolve(objWords, g));
      // "take cards" / "drop cards": a plural noun that matches several things acts on each of them (Take: those not
      // already carried; Drop: those carried and not worn), instead of asking which one.
      if (r.error && r.plural && ['TAKE', 'DROP'].includes(verb)) {
        const ids = r.candidates.filter(id => verb === 'TAKE' ? !g.held(id) : g.held(id) && !g.fsetP(id, 'WORNBIT'));
        if (ids.length > 1) return { verb, prsos: ids, text };
        if (ids.length === 1) { result.prso = ids[0]; }
        else return r;
      } else if (r.error) { if (r.candidates) r.ask = { cmd: { verb, text }, slot: 'prso' }; return r; }
      else result.prso = r.id;
    }
  }
  if (prep && prsiWords.length) {
    let r = resolve(prsiWords, g);
    // Deliberate deviation (user decision, 2026-09-10, round five): "ask floyd about key" names a topic, which need not
    // be in the room: a thing you have seen anywhere will do, and an unknown one is kept as words for the actor to answer.
    if (verb === 'ASK-FOR' && prep === 'about') result.verb = 'TELL';   // "ask floyd about X" (the "ask ... for" phrase matched first)
    if (r.error && result.verb === 'TELL' && prep === 'about' && !/^Which/.test(r.error)) {
      r = resolve(prsiWords, g, [...new Set([...knownObjects(g), ...topicsFor(g, result.prso)])]);
      if (r.error && !/^Which/.test(r.error)) { result.topic = prsiWords.join(' '); r = null; }
    }
    if (r?.error) { if (r.candidates) r.ask = { cmd: { ...result }, slot: 'prsi' }; return r; }
    if (r) result.prsi = r.id;
  }
  else if (verb === 'PUT' && needs && result.prso) result.verb = 'INSERT';   // PUT OBJECT with nowhere named = V-INSERT
  return result;
}

// GET-OBJECT's second pass (parser.zil 925-940): when a noun matches more than one thing, the parser searches again with
// only the places the verb's SYNTAX allows. TAKE OBJECT is (ON-GROUND MANY) (syntax.zil 241, 319), so the second pass
// sees what stands in the room -- directly, or inside an open surface or searchable container there (SEARCH-LIST at
// P-SRCTOP) -- and never what the player already has. One match there is the answer; none asks about all of them, as
// before. Round sixteen: "take card" in the Robot Shop asked "the lower elevator access card or the ID card?" with the
// ID card in the uniform pocket, twice, and the tester walked off without the new card; "take object" in the Library
// Lobby named the green spool on the floor by asking about the red one in hand. Only a plain TAKE: the TAKE ... FROM /
// OUT / OFF / WITH syntaxes carry other bits.
function onGround(g, verb, prsiWords, r) {
  if (verb !== 'TAKE' || prsiWords.length || !r.error || !r.candidates || r.plural) return r;
  const top = id => {   // the containers between id and the room: the outermost must be a surface or searchable, all open
    const chain = [];
    for (let l = g.loc(id); l; l = g.loc(l)) {
      if (l === g.state.here) return !chain.length || ((g.fsetP(chain.at(-1), 'SURFACEBIT') || g.fsetP(chain.at(-1), 'SEARCHBIT')) && chain.every(c => g.seeInside(c)));
      chain.push(l);
    }
    return false;
  };
  const ground = r.candidates.filter(top);
  if (ground.length === 1) return { id: ground[0] };
  if (ground.length > 1 && ground.length < r.candidates.length) return { ...r, error: `Which do you mean, ${ground.map(id => theName(g, id)).join(' or ')}?`, candidates: ground };
  return r;
}
// Things the player knows of, for conversation topics: what they have handled, carry, or have seen in a room they have
// been to (not what is hidden).
export function knownObjects(g) {
  const roomOf = id => { let l = g.loc(id); for (let i = 0; l && i < 10; i++) { if (g.rooms.has(l)) return l; l = g.loc(l); } return null; };
  return Object.keys(g.state.objects).filter(id => id !== 'ADVENTURER' && !g.fsetP(id, 'INVISIBLE') && (g.fsetP(id, 'TOUCHBIT') || g.held(id) || g.state.rooms[roomOf(id)]?.touched));
}
// Match noun words against synonyms/adjectives of in-scope objects. Words are compared on the
// first six letters, which is how the Z-machine truncated its vocabulary.
export function resolve(words, g, scope = g.scope()) {
  if (words.length === 1 && (words[0] === 'it' || words[0] === 'them')) { const id = g.state.lastObject; return id ? { id } : { error: "I don't know what \"it\" refers to." }; }
  if (words.length === 1 && (words[0] === 'me' || words[0] === 'myself' || words[0] === 'self')) return { id: 'ME' };
  const cut = w => w.slice(0, 6);
  const forms = w => w.length > 3 && w.endsWith('s') ? [cut(w), cut(w.slice(0, -1))] : [cut(w)];   // "bunks" also tries "bunk"
  const has = (list, w) => forms(w).some(f => list.includes(f));
  const scored = [];
  for (const id of scope) {
    const o = g.objects[id];
    const extra = g.rules.objectWords?.[id];
    const syn = [...o.synonyms, ...(extra?.synonyms ?? [])].map(s => cut(s.toLowerCase()));
    const adj = [...o.adjectives, ...(extra?.adjectives ?? [])].map(s => cut(s.toLowerCase()));
    const nounHit = words.some(w => has(syn, w));
    if (!nounHit) continue;
    const bad = words.some(w => !has(syn, w) && !has(adj, w));
    if (bad) continue;
    scored.push({ id, adj: words.filter(w => has(adj, w)).length });
  }
  // GET-OBJECT (parser.zil 890-990) searches the room and the player first, and looks at the globals (GLOBAL-CHECK:
  // the room's local globals and GLOBAL-OBJECTS) only when that found nothing. So a thing in the room always beats a
  // global of the same name. Round sixteen: "look through doorway" in the Repair Room asked "the small doorway or the
  // doorway?" -- the room's robot-sized doorway against the generic GLOBAL-DOORWAY -- where the source never asks.
  const isGlobal = id => ['GLOBAL-OBJECTS', 'LOCAL-GLOBALS'].includes(g.loc(id));
  if (scored.some(s => !isGlobal(s.id)) && scored.some(s => isGlobal(s.id))) scored.splice(0, scored.length, ...scored.filter(s => !isGlobal(s.id)));
  if (!scored.length && words.length === 1 && !nounWords(g).has(cut(words[0]))) {
    // A lone adjective names the thing that carries it (parser.zil 849-852 and 895-897: with no noun, THIS-IT? matches
    // any object with that adjective, 1244-1247), unless the word is some object's noun: "examine funnel" is the
    // funnel-shaped hole.
    const adj = scope.filter(id => g.objects[id].adjectives.some(a => forms(words[0]).includes(cut(a.toLowerCase()))));
    if (adj.length === 1) return { id: adj[0] };
    if (adj.length > 1) return { error: `Which do you mean, ${adj.map(id => theName(g, id)).join(' or ')}?`, candidates: adj, plural: false };
  }
  if (!scored.length) {
    // "open south door": a compass word names the door on that side of the room ("A door to the south"), when the rest
    // of the words fit that door. The source's doors have no direction adjectives; every typed playtester tried it.
    const d = words.find(w => DIRS[w] && !['IN', 'OUT'].includes(DIRS[w]));
    const doors = d ? g.exitsHere().filter(e => e.direction === DIRS[d] && e.door).map(e => e.door) : [];
    if (doors.length && words.length > 1) { const r = resolve(words.filter(w => w !== d), g, [...new Set(doors)]); if (!r.error) return r; }
    // Room PSEUDO scenery (plaque, walkway, button, ...): the original points PSEUDO-OBJECT at the room's
    // routine for that word; here the routine name is remembered on the state and dispatched by Game.perform.
    // A plural scenery word answers to its singular too ("map" for the Plan Room's MAPS; the Z-machine had no stemming,
    // but "examine map" there was seven failed tries in round seven).
    // The name the game itself prints for a thing always names it. The source matches only synonyms and adjectives,
    // so a description like "set of controls" -- which the disambiguation question offers in those very words --
    // could not be typed back ("Which do you mean, the laser setting dial or the set of controls?" then "You can't
    // see any set of controls here!", round ten). Last resort, and only on an unambiguous full-name match.
    const phrase = words.join(' ');
    const byName = scope.filter(id => g.name(id).toLowerCase().replace(/^(a|an|the) /, '') === phrase);
    if (byName.length === 1) return { id: byName[0] };

    // Scenery: a phrase names a routine when every word of it is one of that routine's words, so "lawanda map" and
    // "robot-like devices" reach the same scenery the single words do (round ten: the Plan Room names its two maps
    // and the source answered only to "maps").
    const here = g.pseudoWords();
    const matches = (p, w) => [w, w + 's'].some(x => cut(x) === cut(p.word.toLowerCase()));
    const routines = [...new Set(here.map(p => p.routine))];
    const routine = routines.find(r => words.every(w => here.some(p => p.routine === r && matches(p, w))));
    if (routine) {
      const p = here.find(x => x.routine === routine && matches(x, words.at(-1))) ?? here.find(x => x.routine === routine);
      g.state.pseudo = { word: p.word.toLowerCase(), routine };
      return { id: 'PSEUDO-OBJECT' };
    }
    // A word the dictionary does not hold is not a thing that is absent, it is a word the game does not know
    // (parser.zil 508-515). Round ten: both messages read as "you missed something", so the typed tester spent turns
    // hunting for maps and cargo spaces that were never objects at all.
    const unknown = unknownWord(g, words);
    if (unknown) return { error: `I don't know the word "${unknown}".` };
    return { error: `You can't see any ${words.join(' ')} here!` };
  }
  const best = Math.max(...scored.map(s => s.adj));
  const top = scored.filter(s => s.adj === best);
  if (top.length === 1) return { id: top[0].id };
  return { error: `Which do you mean, ${top.map(s => theName(g, s.id)).join(' or ')}?`, candidates: top.map(s => s.id), plural: pluralOf(g, words.at(-1), top.map(s => s.id)) };
}

// ---------------------------------------------------------------- click-menu contract
// rules.menus[key] (an object id or a PSEUDO routine) lists entries that are a verb name or
// { verb, when?, number?, label? }: `when(g)` false hides the entry (and a trait-derived verb of the same name),
// `number` marks a dial/keyboard entry that asks for a number and is dispatched with P-NUMBER set (INTNUM).
export function menuEntries(g, key) {
  return (g.rules.menus?.[key] ?? []).map(e => typeof e === 'string' ? { verb: e } : e).map(e => e.when && !e.when(g) ? { ...e, hidden: true } : e);
}
export function numberEntries(g, key) { return menuEntries(g, key).filter(e => e.number && !e.hidden); }
export const numberLabel = e => e.label ?? (e.verb === 'TYPE' ? 'Type a number' : `${VERB_LABELS[e.verb] ?? e.verb} to a number`);
// The command a number entry produces: TYPE takes the number as its object ("type 384"); SET and the rest take it
// as the indirect object ("set dial to 6"). Game.dispatch copies `number` into P-NUMBER, the original parser's slot.
export function numberCommand(verb, id, n, pseudo = null) {
  const key = pseudo?.routine ?? id;
  const c = verb === 'TYPE' ? { verb, prso: 'INTNUM', number: n, key } : { verb, prso: id, prsi: 'INTNUM', number: n, key };
  if (pseudo) c.pseudo = pseudo;
  return c;
}
// rules.visible[id or PSEUDO routine] = g => boolean hides a drawn object or scenery word while it makes no sense
// yet (the ambassador's slime before the ambassador has been on deck).
const visible = (g, key) => { const f = g.rules.visible?.[key]; return !f || !!f(g); };
export const isVisible = visible;

// Scenery words of the room (PSEUDO entries), one per routine, labelled by core.js pseudoLabel ("TRANSL" -> translator).
// In a dark room nothing is drawn but the exits and the quick buttons (you can still feel what you carry).
export const dark = g => !g.getg('LIT');
export function pseudosHere(g) {
  const seen = new Set(), out = [];
  if (dark(g)) return out;
  for (const p of g.pseudoWords()) {
    if (seen.has(p.routine)) continue; seen.add(p.routine);
    if (!visible(g, p.routine)) continue;
    out.push({ word: p.word.toLowerCase(), routine: p.routine, label: pseudoLabel(p) });
  }
  return out;
}

// Verbs the click menu can offer for an object, by trait. Movement and room verbs are handled separately.
export function verbsFor(g, id) {
  const f = flag => g.fsetP(id, flag), v = g.inVehicle();
  const out = ['EXAMINE'];
  // Round eleven (A3): Take stays on the menu from inside a vehicle, where the game answers "You can't reach it from
  // here." Hiding it read as "this cannot be taken": both testers left the towel and the survival kit in the escape
  // pod because the take buttons appear only on the turn the pod starts to sink. takeableHere still leaves them out,
  // so "Take all" does not spend a turn of a timed emergency on things that are out of reach.
  if (f('TAKEBIT') && !g.held(id)) out.push('TAKE');
  if (g.held(id) && !f('WORNBIT') && !(f('NDESCBIT') && !f('TAKEBIT'))) out.push('DROP');   // not a fixed part of something carried (the laser's dial)
  if (f('DOORBIT') || f('CONTBIT')) out.push(f('OPENBIT') ? 'CLOSE' : 'OPEN');
  if (f('CONTBIT') || f('DOORBIT')) out.push('LOOK-INSIDE');
  if (f('READBIT')) out.push('READ');
  if (f('WEARBIT')) out.push(f('WORNBIT') ? 'TAKE-OFF' : 'WEAR');
  if (f('VEHBIT')) out.push(g.inVehicle() === id ? 'DISEMBARK' : 'BOARD');
  else if (f('CLIMBBIT')) {   // a stairway is climbed, not boarded: Climb up / Climb down by the room's exits
    const dirs = exitChoices(g).map(e => e.direction), up = dirs.includes('UP'), down = dirs.includes('DOWN');
    if (up || !down) out.push('CLIMB-UP'); if (down) out.push('CLIMB-DOWN');
  }
  if (f('DOORBIT')) out.push('THROUGH');
  if (f('FOODBIT')) out.push('EAT');
  if (f('ACTORBIT')) out.push('TALK', 'SALUTE', 'ATTACK', 'LISTEN');
  if (f('SEARCHBIT')) out.push('SEARCH');
  for (const e of menuEntries(g, id)) {   // verbs a rule module declares, or gates, for this object
    if (e.number || ['PUT', 'THROW'].includes(e.verb)) continue;   // PUT / THROW entries gate the "Put in…" / "Throw at…" submenus, they are not verbs of their own
    if (e.hidden) { const i = out.indexOf(e.verb); if (i >= 0) out.splice(i, 1); }
    else if (!out.includes(e.verb) && !(e.verb === 'TAKE' && g.held(id))) out.push(e.verb);   // a gate that opens Take never offers it on a thing in hand
  }
  // Food is eaten (or drunk) from your hands, out of open containers you carry. Round eight took Eat off food that was
  // not in hand; round eleven (A4) puts it back when the food is visible inside an open container standing here,
  // because the refusal names the thing to pick up first ("You're not holding the survival kit.") and that is the
  // answer the player needs. The hunger warning had been sending testers to blobs of goo with no verb on them at all.
  const reachableFood = g.held(id) ? openUpTo(g, id) : openUpTo(g, id) && g.loc(g.loc(id) ?? id) === g.state.here;
  if (f('FOODBIT') && out.includes('EAT') && !reachableFood) out.splice(out.indexOf('EAT'), 1);
  return out;
}
// Every container between `id` and the player (or the room it stands in) is open. It used to walk on past the room,
// which is never OPENBIT, so food in an open kit on the floor always failed and round eleven's A4 never took effect
// (round fourteen: starving in Storage West, the goo offered only Examine).
function openUpTo(g, id) { for (let l = g.loc(id); l && l !== 'ADVENTURER' && !g.rooms.has(l); l = g.loc(l)) if (!g.fsetP(l, 'OPENBIT')) return false; return true; }
// The label a menu shows for `verb` on `id`: a module's own label for that entry (menus: { 'HIGH-PROTEIN': [{ verb: 'EAT',
// label: 'Drink' }] }: the liquid is drunk, though DRINK is EAT in the source), else the verb's usual label.
export function verbLabel(g, id, verb) {
  return menuEntries(g, id).find(e => e.verb === verb && e.label && !e.number && !e.hidden)?.label ?? VERB_LABELS[verb] ?? verb;
}
// The exits the compass and the click list offer: not the blocked ones, which only print a refusal ("Certain death.",
// "You'll have to use the elevator controls."), unless a module keeps one because its refusal is part of the story
// (rules.showBlocked[ROOM] = [directions]: Blather barring the way, the locked cell door); and not an exit through a
// door that is still hidden and shut (the ProjCon Office's cryo-elevator, before the mural gives it away). A typed move
// still gets its answer; the scene still draws blocked exits.
export function exitChoices(g) {
  const keep = g.rules.showBlocked?.[g.state.here] ?? [];
  return g.exitsHere().filter(e => (e.kind !== 'blocked' || keep.includes(e.direction)) && !(e.door && !e.doorVisible && !e.open) && knownInDark(g, e));
}
// In the dark you can't see the way out: the compass and the click list keep only the exits into rooms you have been
// in (the way you came). Typed moves are unchanged, and so are the source's odds: V-WALK and GOTO kill 75% of moves
// from a dark room into another dark one. Round seven's click tester clicked "go down" on the pitch-black stairs.
export const knownInDark = (g, e) => !dark(g) || (!!e.target && !!g.state.rooms[e.target]?.touched);
// What a routine exit (PER <routine>) can say about itself, which the source never states: its data has no target, so
// the name plate wrote "SOUTH · ?" in the shuttle cars (2026-09-18). rules.exitLabels[ROUTINE](g, exit) answers without
// running the routine (no text, no side effects): a destination name, a state marker in parentheses ("(sealed)"), or
// null for nothing to add -- never a guess. Every place that labels an exit (the scene's plate, the compass, the
// click menu, the text playtest) reads it here, so they agree.
export function exitNote(g, e) {
  if (!e?.routine) return null;
  const note = g.rules.exitLabels?.[e.routine]?.(g, e);
  return typeof note === 'string' && note ? note : null;
}
export const isMarker = note => note.startsWith('(') && note.endsWith(')');
// Objects a player can click right now: what the scene draws (room contents, the vehicle's contents, the
// room's referable globals, and the contents of open containers) plus the inventory. Mirrors graybox.js
// and ui.js so scripts/tests/walkthrough.mjs can assert that a command was reachable without typing.
export function clickableObjects(g) {
  const out = new Set();
  const inventory = container => { for (const id of g.contents(container)) { out.add(id); if (g.seeInside(id)) inventory(id); } };
  // Round twelve (A10): in the dark the game still prints "Floyd follows you." and the menu listed nothing but the way
  // out, so there was no way to ask him anything -- including about the dark. An actor you have already dealt with
  // (TOUCHBIT) stays clickable; anything lurking unmet does not, so the dark still gives nothing away.
  if (dark(g)) {
    inventory('ADVENTURER');
    for (const id of g.contents(g.state.here)) if (id !== 'ADVENTURER' && g.fsetP(id, 'ACTORBIT') && g.fsetP(id, 'TOUCHBIT') && !g.fsetP(id, 'INVISIBLE')) out.add(id);
    return out;
  }
  const { here, inVehicle, globals, vehicle } = g.sceneObjects();
  const addWithContents = id => { out.add(id); if (g.seeInside(id)) for (const c of g.contents(id)) if (!g.fsetP(c, 'INVISIBLE')) out.add(c); };
  for (const id of [...here, ...inVehicle]) addWithContents(id);
  if (vehicle) out.add(vehicle);
  for (const id of globals) if (!g.fsetP(id, 'DOORBIT')) out.add(id);   // doors are drawn as exit panels, see reachable()
  inventory('ADVENTURER');
  for (const id of out) if (!visible(g, id)) out.delete(id);
  return out;
}
// Held things that can go into container `c` right now, for the container's "Put in…" submenu: `c` must be an open
// container that is not an actor, and the thing must be a loose takeable one (carried in hand or in a worn pocket, not
// the goo in the kit or the battery in the laser), not `c` itself or holding `c`, and it must fit (roomFor). Listing every held thing on every container was the wall of "put in" lines both click
// playtests reported. A module hides the whole entry with a gated PUT menu entry (floyd.js).
export function putInto(g, c) {
  if (!g.fsetP(c, 'CONTBIT') || !g.fsetP(c, 'OPENBIT') || g.fsetP(c, 'ACTORBIT')) return [];
  if (menuEntries(g, c).some(e => e.verb === 'PUT' && e.hidden)) return [];
  const loose = [];
  for (const id of g.contents('ADVENTURER')) {
    if (!g.fsetP(id, 'WORNBIT')) loose.push(id);
    else if (g.seeInside(id)) loose.push(...g.contents(id));   // the uniform's pocket
  }
  const within = (a, b) => { for (let l = g.loc(a); l; l = g.loc(l)) if (l === b) return true; return false; };   // a is somewhere inside b
  const candidates = loose.filter(id => id !== c && g.fsetP(id, 'TAKEBIT') && !g.fsetP(id, 'WORNBIT') && !g.isIn(id, c) && !within(c, id) && !within(id, c));
  const fits = candidates.filter(id => roomFor(g, id, c));
  // Round twelve (A3): when nothing fits, the entry used to disappear, so a capacity limit was expressed only by an
  // option silently going away and the generic "not on screen now" message. Keep it: V-PUT says "There's no room."
  return fits.length ? fits : candidates;
}
// Room in `c` for the "Put in…" submenu: V-PUT's capacity check, with two allowances for containers whose own routine
// takes things on its own terms: a zero CAPACITY (the kitchen dispenser's niche, the cube, the robot's socket) offers
// every loose thing, and fixed parts (NDESCBIT contents: the laser's dial) take up no room.
function roomFor(g, id, c) {
  const cap = parseInt(g.obj(c)?.capacity ?? 0) || 0; if (!cap) return true;
  const used = g.contents(c).filter(x => !g.fsetP(x, 'NDESCBIT') && !g.fsetP(x, 'WORNBIT')).reduce((n, x) => n + g.weight(x), 0);
  return used + g.weight(id) <= cap;
}
// The exit menu's door entries: Open or Close by state, and Examine, minus what a module hides for that door (the
// elevator doors and bulkheads only move by themselves: "You can't close it yourself.").
export function doorVerbs(g, door) {
  const out = [g.fsetP(door, 'OPENBIT') ? 'CLOSE' : 'OPEN', 'EXAMINE'];
  const hidden = menuEntries(g, door).filter(e => e.hidden).map(e => e.verb);
  return out.filter(v => !hidden.includes(v));
}
// Loose things a "Take all" click would pick up: the same list as Game.performAll, limited to what the object menus
// themselves would offer Take for (nothing from inside a bed or the safety web, nothing in the dark).
export function takeableHere(g) {
  if (dark(g)) return [];
  const v = g.inVehicle();
  // Things outside the vehicle you are in are out of reach, so "Take all" leaves them alone rather than spend a turn
  // on what it cannot have -- UNLESS the vehicle will let you out, in which case getting out is part of taking and
  // the turn is not wasted. The safety web after the pod lands is the case that matters: that is the one turn you
  // must have the towel and the survival kit, and round eleven records both testers leaving them behind
  // (rules/ship.js heldInVehicle, DR-112).
  const stuck = v ? !!g.rules?.heldInVehicle?.[v]?.(g) : false;
  return g.allTargets('TAKE').filter(id => verbsFor(g, id).includes('TAKE') && !(stuck && v !== id && !g.isIn(id, v)));
}
// Deliberate deviation (user decision, 2026-09-12, round twelve): Diagnose carries the state of the survival clocks,
// so the row says how you are rather than only what to do about it. The eat button below is generated from what you
// carry, which means it disappears exactly when you are starving with nothing to eat -- round twelve's click tester
// woke famished, walked four rooms and died on the fifth with no warning line and no button, and a healthy morning
// looked identical to a fatal one. Illness never reached the row at all. The hours come from rules.clocks (survival.js).
function clockState(g) {
  const bits = [];
  const hunger = g.getg('HUNGER-LEVEL') ?? 0, sleepy = g.getg('SLEEPY-LEVEL') ?? 0, sick = g.getg('SICKNESS-LEVEL') ?? 0;
  const hours = which => { const m = g.rules.clocks?.[which]?.(g); return m == null ? '' : ', ' + g.inHours(m); };
  if (hunger > 0) bits.push((hunger > 3 ? 'starving' : 'hungry') + (foodToHand(g) ? '' : ', nothing to eat') + hours('hunger'));
  if (sleepy > 0) bits.push((sleepy > 2 ? 'exhausted' : 'tired') + hours('sleep'));
  if (sick > 0) bits.push(sick > 5 ? 'very sick' : 'feverish');
  return bits.length ? ` (${bits.join('; ')})` : '';
}
// Food you could eat or drink where you stand: what verbsFor would offer EAT for, out of what you carry.
function foodToHand(g) {
  const food = [];
  const reach = c => { for (const id of g.contents(c)) { if (g.fsetP(id, 'FOODBIT')) food.push(id); if (g.seeInside(id)) reach(id); } };
  reach('ADVENTURER');
  return food.some(id => openUpTo(g, id));
}
// The quick buttons beside the compass, in screen order. Look, Inventory, Wait and Diagnose (how you feel: the
// original's DIAGNOSE) are always there; the others appear when they make sense: Get out (in a vehicle), Take all (two
// or more loose things to take), Drop all (two or more unworn things carried), Sleep (weary; it stays while you drop
// off, where it answers "You'll probably be asleep before you know it." and time passes; its label grows more urgent
// with each warning). Save is always there and Restore once something is saved.
export function quickButtons(g) {
  const out = [{ key: 'look', label: 'Look', cmd: { verb: 'LOOK' } }, { key: 'inv', label: 'Inventory', cmd: { verb: 'INVENTORY' } }, { key: 'wait', label: 'Wait', cmd: { verb: 'WAIT' } }, { key: 'diagnose', label: 'Diagnose' + clockState(g), cmd: { verb: 'DIAGNOSE' } }];
  // Round twelve (A8): waking says "the things you were carrying slipped to the floor beside you" in the same breath
  // as the row losing its Take all, because from inside a vehicle the room's things are out of reach. The button that
  // fixes it now says that is what it is for.
  const v = g.inVehicle();
  if (v) {
    const stranded = !dark(g) && g.allTargets('TAKE').some(id => !g.isIn(id, v));
    out.push({ key: 'leave', label: `Get out of the ${g.name(v)}` + (stranded ? ' (to reach what is on the floor)' : ''), cmd: { verb: 'DISEMBARK', prso: v } });
  }
  if (takeableHere(g).length >= 2) out.push({ key: 'takeall', label: 'Take all', cmd: { verb: 'TAKE', all: true } });
  if (g.allTargets('DROP').length >= 2) out.push({ key: 'dropall', label: 'Drop all', cmd: { verb: 'DROP', all: true } });
  const tired = g.getg('SLEEPY-LEVEL') ?? 0;   // the label follows I-SLEEP-WARNINGS' five levels
  if (tired > 0) out.push({ key: 'sleep', label: ['Sleep', 'Sleep', 'Sleep (very tired)', 'Sleep (exhausted)', 'Sleep now!'][Math.min(tired, 4)], cmd: { verb: 'SLEEP' } });
  // Hunger grows a button the way weariness does. Round ten: weariness politely promotes itself to a Sleep button
  // the moment it matters, while hunger -- which killed the click run, with two blobs of goo in its own kit --
  // never reached the clickable layer at all, and eating meant remembering a number inside a container inside the
  // inventory. Only food that is actually edible from the hand is offered (the same gate verbsFor applies).
  const hungry = g.getg('HUNGER-LEVEL') ?? 0;
  if (hungry > 0) {
    const food = [];
    const reach = c => { for (const id of g.contents(c)) { if (g.fsetP(id, 'FOODBIT')) food.push(id); if (g.seeInside(id)) reach(id); } };
    reach('ADVENTURER');
    const best = food.find(id => openUpTo(g, id));
    if (best) out.push({ key: 'eat', label: `${verbLabel(g, best, 'EAT')} the ${g.name(best)}` + (hungry > 3 ? ' (starving!)' : ''), cmd: { verb: 'EAT', prso: best } });
    // Deliberate deviation (user decision, 2026-09-18, round thirteen, B2): closing the canteen hid the drink, and
    // leaving it open spills it overnight (WAKING-UP), so the careful move cost the button. A closed container you hold
    // with something to eat or drink in it offers both steps as one click. It is still two turns: OPEN, then EAT
    // (core.js dispatch, openFirst).
    else {
      const shut = g.contents('ADVENTURER').find(c => !g.fsetP(c, 'OPENBIT') && g.fsetP(c, 'CONTBIT') && !g.fsetP(c, 'LOCKEDBIT') && g.contents(c).some(id => g.fsetP(id, 'FOODBIT')));
      const food = shut && g.contents(shut).find(id => g.fsetP(id, 'FOODBIT'));
      if (food) out.push({ key: 'eat', label: `Open the ${g.name(shut)} and ${verbLabel(g, food, 'EAT').toLowerCase()}` + (hungry > 3 ? ' (starving!)' : ''), cmd: { verb: 'EAT', prso: food, openFirst: shut } });
      // Deliberate deviation (user decision, 2026-09-18, round fourteen, B2): food in an open container at your feet
      // (the survival kit on the floor) is eaten from the hand (GOO-F: "You're not holding the survival kit."), so eating
      // was three clicks at the worst moment -- round fourteen's tester was starving in Storage West. One click takes the
      // container and eats, as two ordinary turns (core.js dispatch, takeFirst); the fumble and the weight check still
      // apply to the take. Click only: typing EAT keeps the source's refusal.
      else {
        const feeds = id => g.fsetP(id, 'FOODBIT') && id !== 'MEDICINE';   // the medicine is FOODBIT but no meal
        const kit = g.contents(g.state.here).find(c => g.fsetP(c, 'CONTBIT') && g.fsetP(c, 'OPENBIT') && g.fsetP(c, 'TAKEBIT') && g.contents(c).some(feeds));
        const food = kit && g.contents(kit).find(feeds);
        if (food) out.push({ key: 'eat', label: `Take the ${g.name(kit)} and ${verbLabel(g, food, 'EAT').toLowerCase()} the ${g.name(food)}` + (hungry > 3 ? ' (starving!)' : ''), cmd: { verb: 'EAT', prso: food, takeFirst: kit } });
      }
    }
  }
  for (const [key, w] of Object.entries(g.rules.waitFor ?? {})) if (w.when(g)) out.push({ key: 'waitfor-' + key, label: w.label, cmd: { verb: 'WAIT-FOR', key } });   // "Wait for the elevator"
  out.push({ key: 'save', label: 'Save', cmd: { verb: 'SAVE' } });   // V-SAVE / V-RESTORE: one slot kept with the game
  if (g.state.saveSlot) out.push({ key: 'restore', label: 'Restore', cmd: { verb: 'RESTORE' } });
  return out;
}
// What an actor's "Throw at…" submenu lists: the unworn things you carry, unless a module hides THROW for that actor.
export function throwAt(g, a) {
  if (!g.fsetP(a, 'ACTORBIT') || menuEntries(g, a).some(e => e.verb === 'THROW' && e.hidden)) return [];
  return g.contents('ADVENTURER').filter(id => !g.fsetP(id, 'WORNBIT'));
}
// Orders an actor can be given from its menu ("Ask Floyd to get the board"): rules.orders[actor] = [{ label, cmd, when?(g) }],
// label a string or g => string; the entry dispatches cmd with the actor as WINNER, as "floyd, get board" does typed.
export function ordersFor(g, actor) {
  // rules.orders[actor] is the fixed list; rules.dynamicOrders[actor] = g => [{label, cmd}] adds the ones that
  // depend on the moment (the exits out of this room, the things the actor happens to be carrying).
  const fixed = (g.rules.orders?.[actor] ?? []).filter(o => !o.when || o.when(g));
  const live = g.rules.dynamicOrders?.[actor]?.(g) ?? [];
  return [...fixed, ...live].map(o => ({ label: typeof o.label === 'function' ? o.label(g) : o.label, cmd: { ...o.cmd, winner: actor } }));
}
// What an actor's "Ask about…" submenu lists: rules.topics[actor] = g => [ids]; each entry is TELL actor ABOUT id.
export function topicsFor(g, actor) { return g.rules.topics?.[actor]?.(g) ?? []; }
export const topicLabel = (g, id) => id === 'ME' ? 'yourself' : g.rules.topicNames?.[id]?.(g) ?? g.name(id);   // rules.topicNames[id] = g => label | null
// Every number entry drawn right now: [{ verb, id, key, pseudo, label }].
export function numberTargets(g) {
  const out = [];
  for (const id of clickableObjects(g)) for (const e of numberEntries(g, id)) out.push({ verb: e.verb, id, key: id, pseudo: null, label: numberLabel(e) });
  for (const p of pseudosHere(g)) for (const e of numberEntries(g, p.routine)) out.push({ verb: e.verb, id: 'PSEUDO-OBJECT', key: p.routine, pseudo: { word: p.word, routine: p.routine }, label: numberLabel(e) });
  return out;
}
// A number-taking click ("Set to a number" on a dial, "Type a number" on a keyboard) as a command: either built
// by the UI (numberCommand) or typed ("set dial to 6", "turn dial to 300", "type 384"). Returns the drawn target
// plus the number, or null when nothing here offers a number entry for the verb.
export function numberEntry(g, cmd) {
  let { verb, prso, number, text, key, pseudo } = cmd;
  if (number == null) {
    if (!text || (prso && prso !== 'INTNUM')) return null;
    const words = text.toLowerCase().replace(/[^a-z0-9'\- ]/g, ' ').split(/\s+/).filter(Boolean).slice(1);
    const i = words.findIndex(w => /^\d+$/.test(w)); if (i < 0) return null; number = parseInt(words[i], 10);
    const noun = words.slice(0, i).filter(w => !NOISE.has(w) && !['to', 'in', 'on', 'into'].includes(w));
    if (noun.length) { const saved = g.state.pseudo; const r = resolve(noun, g); if (r.error) return null; prso = r.id; if (prso === 'PSEUDO-OBJECT') pseudo = g.state.pseudo; else g.state.pseudo = saved; }
    else { const t = numberTargets(g).find(t => t.verb === verb); if (!t) return null; prso = t.id; pseudo = t.pseudo; }
    key = pseudo?.routine ?? prso;
  }
  key ??= pseudo?.routine ?? prso;
  const t = numberTargets(g).find(t => t.key === key && t.verb === verb);
  return t ? { ...t, number } : null;
}
// Could the UI (compass, quick buttons, object and exit menus) have produced this parsed command in the
// current state? Returns null when it could, otherwise a short reason. This is the contract the
// point-and-click layer must keep: every action a walkthrough needs has to come back null here.
export function reachable(g, cmd) {
  const { verb, prso, prsi, dir } = cmd;
  if (cmd.winner && cmd.winner !== 'ADVENTURER') {   // an order: the actor's menu entry
    if (!clickableObjects(g).has(cmd.winner)) return `${g.name(cmd.winner)} is not clickable here`;
    return ordersFor(g, cmd.winner).some(o => o.cmd.verb === verb && o.cmd.prso === prso && (o.cmd.prsi ?? null) === (prsi ?? null)) ? null : `ordering ${g.name(cmd.winner)} to ${(VERB_LABELS[verb] ?? verb).toLowerCase()} is typed only`;
  }
  if (verb === 'WALK') return exitChoices(g).some(e => e.direction === dir) ? null : `no compass button for ${dir}`;
  if (cmd.number != null || (!prso && cmd.text && ['SET', 'TYPE'].includes(verb) && /\d/.test(cmd.text)))   // dials and keyboards
    return numberEntry(g, cmd) ? null : `no number entry is drawn here for ${verb}`;
  if (verb === 'PUSH-BUTTON' && !prso) {   // kalamontee.js's "push button" phrase: whatever "button" resolves to here, pushed
    const r = resolve(['button'], g); return r.error ? r.error : reachable(g, { verb: 'PUSH', prso: r.id });
  }
  if (cmd.takeFirst) return quickButtons(g).some(b => b.key === 'eat' && b.cmd.takeFirst === cmd.takeFirst && b.cmd.prso === prso) ? null : `no "Take the ${g.name(cmd.takeFirst)} and ..." button here`;   // B2, round fourteen
  if (cmd.openFirst) return quickButtons(g).some(b => b.key === 'eat' && b.cmd.openFirst === cmd.openFirst && b.cmd.prso === prso) ? null : `no "Open the ${g.name(cmd.openFirst)} and ..." button here`;   // B2
  if (cmd.prsos) {   // "take kit and towel": each one must be clickable on its own
    for (const id of cmd.prsos) { const why = reachable(g, { verb, prso: id }); if (why) return why; }
    return null;
  }
  if (cmd.all) {
    // Round eleven (A10): Take all used to pick straight back up whatever you had just dropped to make room, and the
    // only way round it was one press per object. "Take all except ..." is a submenu on the same button.
    // Round fourteen (B4, user decision 2026-09-18): "Drop all except …" on the Drop all button, the same way.
    if (cmd.except) return quickButtons(g).some(b => b.key === { TAKE: 'takeall', DROP: 'dropall' }[verb]) ? null : `${VERB_LABELS[verb] ?? verb} all except ... is typed only`;
    if (cmd.from) return `${VERB_LABELS[verb] ?? verb} all from the ${g.name(cmd.from)} is typed only; take the things one at a time`;
    const key = { TAKE: 'takeall', DROP: 'dropall' }[verb];
    return key && quickButtons(g).some(b => b.key === key) ? null : `no "${VERB_LABELS[verb] ?? verb} all" button here`;
  }
  if (!prso) {
    if (['LOOK', 'INVENTORY', 'WAIT', 'DIAGNOSE'].includes(verb)) return null;                  // quick buttons
    if (verb === 'WAIT-FOR' && quickButtons(g).some(b => b.key === 'waitfor-' + cmd.key)) return null;   // "Wait for ..." 
    if (['DISEMBARK', 'STAND', 'EXIT'].includes(verb) && g.inVehicle()) return null;            // "Get out of ..." quick button
    if (verb === 'SLEEP' && quickButtons(g).some(b => b.key === 'sleep')) return null;           // "Sleep" quick button
    if (['SAVE', 'RESTORE'].includes(verb) && quickButtons(g).some(b => b.key === verb.toLowerCase())) return null;   // Save / Restore
    return `no button for ${verb}`;
  }
  if (prso === 'PSEUDO-OBJECT') {   // scenery tags: Examine plus the verbs the module declares for the routine
    const routine = g.state.pseudo?.routine;
    if (!pseudosHere(g).some(p => p.routine === routine)) return `scenery word "${g.name(prso)}" is not drawn in this room`;
    if (prsi) return `${verb} on scenery "${g.name(prso)}" with ${g.name(prsi)} is not in any menu`;
    if (verb === 'EXAMINE' || menuEntries(g, routine).some(e => e.verb === verb && !e.hidden && !e.number)) return null;
    return `${VERB_LABELS[verb] ?? verb} is not in the menu for scenery "${g.name(prso)}" (declare menus['${routine}'])`;
  }
  const clickable = clickableObjects(g);
  const doors = exitChoices(g).filter(e => e.door && e.doorVisible).map(e => e.door);
  if (!prsi) {
    if (clickable.has(prso) && verbsFor(g, prso).includes(verb)) return null;
    if (doors.includes(prso) && doorVerbs(g, prso).includes(verb)) return null;                  // exit menu
    if (!clickable.has(prso) && !doors.includes(prso)) return `${g.name(prso)} is not clickable here`;
    return `${VERB_LABELS[verb] ?? verb} is not in the menu for ${g.name(prso)}`;
  }
  if (verb === 'PUT' && clickable.has(prsi) && putInto(g, prsi).includes(prso)) return null;                                              // the container's "Put ... in" entries
  if (verb === 'THROW' && clickable.has(prsi) && throwAt(g, prsi).includes(prso)) return null;
  if (verb === 'TELL' && clickable.has(prso) && topicsFor(g, prso).includes(prsi)) return null;                                                     // the actor's "Ask about…" entries                                                          // "Throw ..." entries
  if (usesFor(g, prso).some(u => u.verb === verb && u.prsi === prsi)) return null;                                                          // module-declared "use with" entries
  return `${verb} ${g.name(prso)} with ${g.name(prsi)} is not in any menu`;
}
// Two-object menu entries a rule module declares for `id` whose partner is in scope:
// rules.uses = [{ verb, prso: [ids], prsi: [ids], label, when?(g, prso, prsi) }], label may contain {prsi}.
export function usesFor(g, id) {
  const out = [];
  if (!clickableObjects(g).has(id) && !g.exitsHere().some(e => e.door === id)) return out;
  const scope = g.scope();
  // prsi '*' means "whatever is here": a tool whose targets cannot be listed in advance offers every thing drawn in
  // the room, so a mouse player can make the attempt a typed player can make and be told no. Round ten: the oil can,
  // the laser and the acid each had no verb that could reach any target, so a click tester could not tell a wrong
  // idea from a missing button. Actors are left out -- shooting Floyd should stay a thing you have to mean.
  // Round twelve (A4): a module can take a thing out of the wildcard lists (rules.notTargets). The laser offered
  // "shoot mangled robot" three lines under the examine that handles Floyd's death, generated by the same blind rule
  // that offers to pour acid on an elevator call button.
  const wildcard = () => [...clickableObjects(g)].filter(t => t !== id && !g.held(t) && !g.fsetP(t, 'ACTORBIT') && !g.fsetP(t, 'DOORBIT') && !g.rules.notTargets?.[t]);
  for (const u of g.rules.uses ?? []) if (u.prso.includes(id)) for (const prsi of (u.prsi === '*' ? wildcard() : u.prsi)) {
    if (prsi === id || !scope.includes(prsi)) continue;
    if (u.when && !u.when(g, id, prsi)) continue;
    if (out.some(o => o.verb === u.verb && o.prsi === prsi)) continue;   // an explicit entry wins over the wildcard
    out.push({ verb: u.verb, prsi, label: u.label.replace('{prsi}', g.name(prsi)) });
  }
  return out;
}
// Every noun (synonym) any object has, cut to six letters: a word in here is a noun even where it is also an adjective.
const NOUNS = new WeakMap();
function nounWords(g) {
  if (!NOUNS.has(g.objects)) NOUNS.set(g.objects, new Set(Object.values(g.objects).flatMap(o => o.synonyms.map(s => s.toLowerCase().slice(0, 6)))));
  return NOUNS.get(g.objects);
}
// Every word the game's dictionary holds for naming a thing: any object's synonyms and adjectives, and the scenery
// words the rules add. The Z-machine rejected a word outside its dictionary before it ever looked at the room
// (parser.zil 508-515, UNKNOWN-WORD), which is how the original told "that isn't here" from "that isn't a word".
const VOCAB = new WeakMap();
function nameWords(g) {
  if (!VOCAB.has(g.objects)) {
    const out = new Set();
    for (const o of Object.values(g.objects)) {
      for (const s of o.synonyms) out.add(s.toLowerCase().slice(0, 6));
      for (const a of o.adjectives) out.add(a.toLowerCase().slice(0, 6));
    }
    VOCAB.set(g.objects, out);
  }
  // The scenery words are per room and per rules module, so they are added on each call rather than cached.
  const out = VOCAB.get(g.objects);
  const all = new Set(out);
  for (const p of g.pseudoWords()) { const w = p.word.toLowerCase().slice(0, 6); all.add(w); all.add((p.word.toLowerCase() + 's').slice(0, 6)); }
  // rules.objectWords: labels a room prints that the source never made words (the dispenser's "ASID" and "BAAS",
  // the Comm Room's "Mesij Plaabak"). Round ten: the prose is the whole method, so its own labels must be typeable.
  for (const w of Object.values(g.rules.objectWords ?? {}).flatMap(e => [...(e.synonyms ?? []), ...(e.adjectives ?? [])])) all.add(w.toLowerCase().slice(0, 6));
  return all;
}
// The first word of a noun phrase the dictionary does not hold at all, if any. Directions, numbers and the words the
// parser strips before it gets here are never reported.
function unknownWord(g, words) {
  const vocab = nameWords(g);
  const known = w => {
    const c = w.slice(0, 6);
    if (vocab.has(c)) return true;
    if (w.length > 3 && w.endsWith('s') && vocab.has(w.slice(0, -1).slice(0, 6))) return true;   // "bunks" for "bunk"
    return DIRS[w] || /^\d+$/.test(w) || ['it', 'them', 'me', 'myself', 'self', 'all', 'everything'].includes(w);
  };
  return words.find(w => !known(w)) ?? null;
}
// "cards" is plural when "card" is itself a noun of the things it matched (the source lists CARDS as a synonym too).
function pluralOf(g, w, ids) { const one = w.length > 3 && w.endsWith('s') ? w.slice(0, -1).slice(0, 6) : null; return !!one && ids.some(id => g.objects[id].synonyms.some(x => x.toLowerCase().slice(0, 6) === one)); }
export const VERB_LABELS = { EXAMINE:'Examine', TAKE:'Take', DROP:'Drop', OPEN:'Open', CLOSE:'Close', 'LOOK-INSIDE':'Look inside', READ:'Read', WEAR:'Wear', 'TAKE-OFF':'Take off',
  BOARD:'Get in', DISEMBARK:'Get out', THROUGH:'Go through', EAT:'Eat', TALK:'Talk to', SALUTE:'Salute', ATTACK:'Attack', LISTEN:'Listen to', SEARCH:'Search',
  PUSH:'Push', SLEEP:'Sleep', DIAGNOSE:'Diagnose', REMOVE:'Remove', 'PUSH-UP':'Push Up', 'PUSH-DOWN':'Push Down', PULL:'Pull', MOVE:'Move', TYPE:'Type', SET:'Set', ZAP:'Shoot', 'TURN-ON':'Turn on', 'TURN-OFF':'Turn off', TASTE:'Taste', PLAY:'Play', FLY:'Fly', SLIDE:'Slide', UNLOCK:'Unlock', LOCK:'Lock', 'LOOK-UNDER':'Look under', 'CLIMB-ON':'Climb on', 'CLIMB-UP':'Climb up', 'CLIMB-DOWN':'Climb down', RUB:'Rub', SMELL:'Smell', KICK:'Kick', HELLO:'Say hello', FOLLOW:'Follow', CALL:'Call' };
