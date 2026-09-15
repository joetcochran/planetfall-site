# The port: from ZIL source to a playable engine

Infocom wrote *Planetfall* in ZIL, a Lisp-like language whose original compiler is lost. This page tells how that source became a JavaScript engine that plays the whole game in a browser: first the world map, then a shared plan, a first milestone built in about fifteen minutes, two waves of parallel porting agents, and a coverage report that reached 105 of 105 rooms by the morning of 10 September. It also covers what that report missed, which blind playtesters kept finding for two more days.

## Before the first session: a map viewer

The work did not start from nothing. Before the first Claude Code session on 9 September, the user had imported a small starter called "Planetfall world map, first milestone". Its files are dated 11:08 that morning, and where it came from is not recorded. It had three parts:

- a Three.js viewer that drew the rooms as a graph with a force layout;
- a Python script, `extract_world.py`, that read rooms and exits out of the ZIL with a balanced-expression tokenizer;
- a small Node server on port 5173.

It read 105 rooms and 284 exits from the historical source of Planetfall (the `historicalsource/planetfall` collection, commit 7e7af12). Next to it sat an empty ASP.NET Core "Hello World" project.

So the world map came first, before the port. The user remembered it the other way round, but the record is clear.

## The first morning (9 September)

The first session ran from 11:10 to 12:43. Git did not exist yet, so this morning is recorded only in the session transcript. The first commit, made that afternoon, is a snapshot of all of it.

**Into the host (11:10–11:22).** The user's first request was to run the viewer from Visual Studio with F5, with no separate Node server and no CDN. Norm moved it into the ASP.NET Core project as static files. Norm chose `UseStaticFiles` so that a regenerated `world.json` would be served without a rebuild. A small script, `vendor.mjs`, copies the four Three.js runtime files into the site, and stamps them with the current time because Windows kept the original timestamps and fooled the incremental build.

**A grid map (11:24–11:34).** The user asked for north, south, east and west to run up, down, right and left on screen, with up and down using the third axis. Norm checked the data first. "Short answer: the data supports it well within each region, but not across the whole map." There were ten regions joined only by special exits such as elevators, the shuttle and the long hall. Four rooms had no compass exits at all, and 13 exits contradicted a unit grid. So `layout.js` places rooms on a grid within each region. The regions themselves get hand-set anchors in `layout.json`, which is marked as a rendering choice and not a game fact, and exits that do not fit are drawn slanted. `check_layout.mjs` fails if two rooms share a cell.

**Every room described (11:46–11:54).** The user asked to "recreate the planetfall game using the world map you created and the original source". The extractor grew to take in all 105 room descriptions, 150 objects, the doors, the flags and the scenery words. Descriptions are not plain strings in the source. 33 rooms print theirs from routine code with branches, such as the Balcony's different text on different days. So each description is kept as a tree whose branches are labelled with the original ZIL condition.

**A shared vision (11:58–12:06).** Next the user asked for "a game engine which honors the world map", with rooms you drag to look around and click to interact with. The user asked Norm to put questions first "so we get a shared vision". Two rounds of multiple-choice questions settled the design. The central decision was how the game logic would run. There were three options: run the original in a Z-machine interpreter, reinterpret the game freely, or hand-port the routines as data-driven JavaScript. The user chose the hand port. The other answers:

- grey boxes now, hand-authored scenes later;
- a click menu of verbs plus an optional command line;
- game state kept in the browser, with ASP.NET only serving files;
- a fixed viewpoint with drag to look;
- clickable exits and a compass;
- a scrolling transcript.

**Milestone 1 (12:06–12:21).** The first engine took about fifteen minutes to build: the Feinstein opening, from Deck Nine through Blather, the explosion and the escape pod to landing on the Crag. `engine/core.js` is a pure state machine. Its helpers are named after their ZIL counterparts (`fset`, `move`, `queue`, `tell`, `jigsUp`, `perform`), and each turn follows the original order. Around it went a small parser, the default verbs from `verbs.zil`, a description renderer that evaluates the stored condition trees, the grey-box room builder and the page. Any routine the engine reaches without a handler is written to a notes list instead of failing silently.

**The first fan-out (12:21–12:39).** The user said "fan out subagents". Four agents worked in parallel, each owning its own files:

- a browser tester, which found and fixed a death overlay that covered the view from the first frame;
- the Kalamontee shore;
- the survival clocks (hunger and sleep);
- Floyd.

At the end Norm wrote `coverage.mjs`, which read 52 of 105 rooms and 117 of 244 routines. Norm also wrote `HANDOFF.md`, because the user asked to "store our progress in a readme file so an agent can pick it up later".

## The first commit and the connectors (9 September, afternoon)

In the second session Norm recommended git before any more parallel work: "there is no history at all". The baseline commit bd88341 (16:21) holds 56 files: the host, the extractor, the map viewer, the engine, and four rule modules with their tests. It is named "engine milestone 1", but strictly that milestone was only the ship; the commit also carries the three modules from the fan-out.

The next hour joined the regions:

- the long hall and the ladder (9fd94c1, 16:27);
- the four elevators (1d345c8, 16:39). The reactor and cryo elevators' buttons are ZIL scenery words, not objects, so the engine learned to resolve them;
- the shuttle and the relay (2ed44e0, 16:48). After this, all 25 special exits had handlers.

A playthrough tester followed at 16:54 (b0aa81d); [Playing it](playing-it.md) tells that story.

At 16:55 the user asked to "run remaining areas as parallel agents". Five more agents took the Kalamontee lower levels, the tower, Lawanda, the bio lab and endgame, and the scenery words. Norm held back integration until all five had finished, "since registering a module changes seeded random draws and would disturb the checks the running agents rely on". Four finished. The bio lab agent was stopped at 17:13 by the account's session limit.

## "The engine port of Planetfall is complete" (10 September)

The user returned at 06:34 the next morning: "you were interrupted last session by token exhaustion". Every agent had written to disk as it went, so Norm found only two failing checks in the bio lab work and resumed that same agent to finish them. Integration then resolved the places where modules overlapped: the chronometer, the bed, the protein liquid, and a verb defined twice. Commit 2ab5898 (06:44) reached 105 of 105 rooms, 322 of 322 routines, 37 of 37 timed events and 945 test checks. Norm reported: "The engine port of Planetfall is complete."

The rest of that morning found the seams between the parallel ports:

- A handler's "this turn takes no time" flag was being lost, because each handler got a copy of the turn context (48acae1).
- One porter had written the routine that repairs the computer, SHOOT-SPECK, but none had exported it, so the computer could never be fixed (0eabc12).

By 07:14 the scripted walkthrough played the whole game to the ending in 289 steps, finishing at 74 of 80 points on day 2. By 07:23 it replayed in a real Chromium browser (a70e212).

## What the coverage report hid

"322 of 322" turned out to count only object, room and timed-event routines. The blind playtesters found the rest over the next two days:

| Gap | How it showed up | Fix |
|---|---|---|
| About 35 verb routines from `verbs.zil` never ported, and 107 words from `syntax.zil` unknown to the parser | The typed tester's one wall in round three: "extend ladder" was an unknown word | ab12e19 (10 Sep 17:47) |
| Carried weight counted worn items, and unsized things weighed nothing | Found while fixing round three's findings (the round-four batch) | 9b4c969 |
| Special exits cost 20 time units instead of the default 7 | Round six's triage (fixed in the round-seven batch) | 143244e |
| The checks the original makes before taking or putting, and its fumble rule, were missing | Round eight's triage | 3f23376 |
| The parser could not tell an unknown word from a thing that is not here | Round ten | 7a0650d |
| The engine's light test read only the room's own flag, so the game's one lamp lit nothing and two dark rooms were sealed | Round eleven: both testers decided the game had no light | d294cf9 |

The last one is described in the code itself: "two blind runs spent a thousand commands looking for a light that was working correctly and simply could not be seen by". The porters had flagged the light gap in the backlog on 9 September.

## Deliberate deviations

On 10 September at 12:49 the user set a rule that has shaped the port ever since: "a little bit of common sense deviation from the source makes sense. we don't have to stay 100% true if gameplay would be significantly improved." Each deviation is proposed, approved by the user one at a time, and marked in the code with the words "Deliberate deviation" and the date and round. There are 76 such comments in the engine and rule modules. Among them:

- the collapsed ladder is refused at the rift instead of lost (bf7d1c5);
- the narrator calls Floyd by name once he has been introduced;
- Floyd can carry out orders in the dark (d294cf9);
- the survival clocks are explained in hours (de6c9f9).

## The world map today

`map.html`, `layout.js` and `layout.json` have not changed since the baseline commit bd88341. `check_layout.mjs` still places all 105 rooms with no shared cells and 13 exits off the grid. One task in `HANDOFF.md` is still open: tightening the region anchors so that elevator shafts run vertically and the shuttle tunnel joins its two platforms. The work moved on to playtesting and graphics.

## Who wrote it

Commit trailers show that the port itself, from the first commit through 14:01 on 10 September, was co-authored by the Claude Fable 5.1 model. From d171ec5 (10 September, 17:00) commits are co-authored by Claude Opus 5, with one later exception (ba2ff80).

## What was hard

- **The source cannot run.** The source's own README says there is no known way to compile it into a playable story file, so there was no reference build to compare against. Every behaviour had to be read from the source and re-expressed by hand.
- **Descriptions are code.** A third of the rooms compute their own text, with conditions on flags, days and object locations.
- **The source is damaged.** `comptwo.zil` ends in the middle of the triffid object, and the extractor stopped on "Unterminated expression". Atoms also carry a leading comma (`,M-LOOK`), so the first search for description routines found nothing.
- **The map is not a grid.** There are ten disconnected regions, rooms with no compass exits, and exits that contradict each other, such as an escalator that is both UP and EAST.
- **The clock.** Every timed event depends on the exact order of the original main loop. The first engine added elapsed time after the clock ran, while the original adds it before.
- **Scenery words.** 44 routines belong to scenery words that are not objects (88 word entries across the rooms), and ZIL cuts each word to six letters, so "TRANSL" should read "translator".
- **Floyd.** His routine has a branch that runs only when the player gives him an order, but the parser could not address actors at first. On top of that he is a container the player can take things out of, and he can act only once per turn.
- **Parallel agents collide.** Modules defined the same objects twice. One module needed a routine that no module exported. And every newly registered module shifted the seeded random numbers that other agents' tests relied on.
- **Limits.** The session limit killed one agent mid-port, and later sessions ran low on tokens too.

## What we built to fix it

- **A structural extractor, not an interpreter.** `extract_world.py` keeps descriptions as condition trees, strips the leading commas, and completes and flags the truncated triffid. At runtime, `describe.js` and `conditions.js` evaluate the conditions against live state.
- **The grid layout** with hand anchors per region, slanted misfit exits, and `check_layout.mjs` to hold it.
- **An engine that names its ZIL.** Helpers carry ZIL names and turns follow the original order. The survival porter flagged the clock order and integration corrected it, so time now advances before the clock runs.
- **Scenery as objects.** A room's scenery word resolves to a stand-in object and dispatches to the right routine, and its label is restored to the full word.
- **Talking to actors.** "floyd, give me the card" works, with the actor's own routine running first (7decc74).
- **Rules for parallel work.** Each agent owns its own files, and cross-area calls go through a shared helpers export. `rules/index.js` merges modules in a fixed order where the later one wins. Registration waits until every agent has finished.
- **Visible gaps.** Unported routines are listed in a notes panel. `coverage.mjs` measures progress per region. The syntax audit now runs as a test in `menus.mjs`, so the verb blind spot cannot come back.
- **Continuity.** Agents write to disk as they go, and `HANDOFF.md` plus the memory files carry state from one session to the next.

See [Tools](tools.md) for the full list, and [Playing it](playing-it.md) for how the game was tested against real players.
