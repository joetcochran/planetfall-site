# Playing it: two interfaces and eighteen rounds of blind testers

The remake can be played two ways on one page: by typing commands into a parser, as in 1983, or by mouse, with a verb menu on every object, a compass, quick buttons and an inventory panel. This page tells how both were held to one rule, that anything the story needs must be clickable, and how fresh AI agents who knew nothing about the game played it round after round until, on 12 September, two of them won it from a cold start. On 18 September four more rounds ran, and for the first time every way of playing won blind on the same day's build. Three more rounds followed that afternoon and evening, played in character, and one of them won with no deaths at all.

## One page, two ways to play

Both interfaces arrived together with the first engine milestone on 9 September; they were not a separate later step. The page had a scrolling transcript, a command line with a small parser, a verb menu when you click an object in the grey-box room, a compass strip, clickable inventory, Look, Inventory and Wait buttons, a death screen and a debug panel. Norm's plan at the time: "The click menu shows verbs that apply to the clicked object's traits. The command line uses a small parser over the same table."

The user played it straight away and, at 12:41, reported the first gap: "when i was playing through in the escape pod i had to type in "stand up" and "open pod door" manually which was not intuitive / consistent with the other point and click style actions". The pod's exits are special routines with no door attached, and the pod door existed only as a global object, so there was nothing to click.

## The click contract

Norm's answer (b0aa81d, 9 September 16:54) became a rule for the rest of the project:

- `parser.reachable()` asks whether the compass, the quick buttons, or an object or exit menu could have produced a given command in the current state, and says why not when they could not.
- `scripts/tests/walkthrough.mjs` is the canonical seeded playthrough. Every step is typed, checked for its expected text, and must also pass `reachable()`. A step that only works by typing fails the test.
- `scripts/browser.mjs` replays the same steps in headless Chromium with real clicks.
- The escape pod gained its door, through `rules.exitDoors`, and a "Get out of the X" button.

On 10 September the walkthrough reached the ending (0eabc12, 289 steps, 74 of 80 points). A few steps were still marked as typed-only gaps, because the dials and the keyboard needed a number. Number entry in the menus closed the last of them (7decc74), so from 10 September the whole scripted game could be finished by mouse.

## The blind playtesters

That morning the user asked: "is there a way to spin up an agent that knows nothing about the game and actually tries to play it, and them reports back where it got stuck, what it found confusing?" They wanted "a human readable report ... kind of like a narrative about the decision making".

Norm built `scripts/playtest.mjs` (a252eab, 06:58), a black box that plays one command per call and keeps the game in a session file. In typed mode it takes free text. In click mode it prints the options the page would offer as a numbered list and accepts only those. The click testers never saw the real page; `browser.mjs` is the only tool that drives the page itself, and it replays the scripted walkthrough.

Each round, fresh agents were forbidden to read the repository. They played through that front end and wrote a first-person diary ending in a friction log. Norm warned from the start that "a language model does know the original well, so treat their progress as optimistic and their confusion reports as the reliable signal."

After each round Norm sorted the findings into three tiers:

- **A**: interface fixes and faithful fixes Norm recommended, built once the user said so (usually "do all of A");
- **B**: departures from the original, each needing the user's approval and marked in the code as a "Deliberate deviation";
- **C**: leave as the original.

The user's answers were short ("do all of A ... dont do any of C"). Norm built and tested the result, and the next round checked it.

## The rounds

Eighteen playtest rounds ran: one to eight and ten to nineteen. There was no round-nine playtest; "round nine" is the fix batch from round eight's findings. The rounds produced 32 diaries in `playtests/`. Commit labels repeat in one place: the commits titled "Round eleven, part one/two" at 21:15 and 21:31 on 11 September are round ten's fixes.

| Round | Date | What it showed, and what changed | Commits |
|---|---|---|---|
| 1 | 10 Sep | A bloated click list: 36 buttons on Deck Nine, and phantom options such as "examine transl" that the game then rejected. The parser fused "open padlock with pliers" into one noun. The ladder could be lost in the rift. | 7decc74 |
| 2 | 10 Sep | "ask X about Y" now reaches the original's TELL routine. The collapsed ladder is refused at the rift, the first approved deviation. | bf7d1c5 |
| 3 | 10 Sep | Submenus, hidden refusals and a reduced menu in the dark. Then the vocabulary audit: 107 words and about 35 verb routines had never been ported. | d171ec5, ab12e19 |
| 4 | 10 Sep | Options that can only refuse were dropped, and Floyd is called by name. The first late-game run started from a tower-core checkpoint. | 9b4c969, 471086a |
| 5 | 10–11 Sep | Hidden-door and shuttle exits, the library keyboard, and Save and Restore buttons. | ba2ff80 |
| 6 | 11 Sep | Floyd's orders and an "Ask about" menu, and a score notice. Typed runs from the start stalled at the Tower Core again. | 115a1d4, 21c705a, e89ca7d |
| 7 | 11 Sep | Stable option numbers, a "Wait for the elevator" button, and the correct time cost for special exits. | 143244e |
| 8 | 11 Sep | Restore after death, and a new "lawanda" checkpoint. **Both testers won 80 of 80 from mid-game.** | e8979fe, 18f2073 |
| 9 | 11 Sep | No playtest: round eight's fixes, including the original's fumble rule. | 3f23376 |
| 10 | 11 Sep | From the start, in three legs each. Neither tester won: both switched Floyd on without searching him, so the elevator card stayed hidden. | af5a3c6, 7a0650d, 9911f56 |
| 11 | 11–12 Sep | From the start. Neither won, because the engine's lamp bug sealed two dark rooms. | d294cf9, de6c9f9, dbbd85c |
| 12 | 12 Sep | From the start. **typed-12 won 74 of 80; click-12 won 80 of 80 using the mouse options only.** | 20416ea, 007774f |
| 13 | 18 Sep | One click tester from the start. It stopped in the Comm Room at 33, stuck where round ten stuck: Floyd switched on without being searched. Floyd's itch and the weight line followed, and the page's quick buttons were made the harness's. | 05a700f |
| 14 | 18 Sep | One click tester from the start, with Lawanda Platform as its goal. It arrived at turn 247 with 32. Floyd's itch worked. | 5929620 |
| 15 | 18 Sep | One click tester from the Lawanda checkpoint. **Won 80 of 80.** | 5929620 (diary) |
| 16 | 18 Sep | One typed tester from the start, in two legs. **Won 68 of 80**, the ending with the defenses and the comm still broken. Rounds 14 to 16 were triaged together. | 2db0b7f |
| 17 | 18 Sep | One click tester from the start, the first to play in character: a first-time 14-year-old. It starved at 25 with no save, started again, and stopped fed in the Kitchen at 23. The platform's hours notice was reworded, and Floyd's follow order stopped blinking out. | 5377ab3, 093214c |
| 18 | 18 Sep | One click tester from the Lawanda checkpoint, playing as an adult who had played the original once in 1983. **Won 80 of 80, with no deaths.** Six port faults fixed. | ddc51a1 |
| 19 | 18 Sep | One typed tester from the start, playing as a first-timer who types plain modern English. It stopped at 9 in the Robot Shop, after one death at the rift. Seven parser faults fixed. | ddc51a1 |

## The first milestone: to the end from mid-game

Typed runs from the start kept stalling at the Tower Core, around turns 190 to 196, in rounds three, five and six. After round three, Norm pointed out that both testers had used their whole budget getting there, so the back half of the game had never been tested blind, and added checkpoint starts. `playtest.mjs --checkpoint` replays the walkthrough to a point and gives the tester a short briefing. The first checkpoint was the Tower Core (471086a, 10 September). When round six's typed run stalled again, the user wrote: "the typed tested on round 6 made it no further than round 5 -- this seems like a fail on that iteration" (11 September, 07:05). From round seven the typed tester also started from a checkpoint. On 11 September the user asked for one at the Lawanda Platform (e8979fe, turn 256, day 2, score 42).

Both round-eight testers started there and won. The typed tester reached 80 of 80 and the rank of Galactic Overlord at turn 510, in about 301 commands with three deaths restored. Norm reported it as "the first blind playtester ever to finish the game". The click tester won 80 of 80 on its third attempt. Its verdict: "The interface is already good enough to finish the game blind." The diaries were committed as 18f2073 on 11 September at 09:46.

## Rounds ten and eleven

A whole game from the start takes about 1,000 commands, and one agent could manage about 300 before its context ran out. So from round ten each game was played in legs. A fresh agent continued the same session file, and it read the diary written so far as its memory.

Neither round won. In round ten, both testers switched Floyd on without searching him, so the lower-elevator card inside him surfaced only by a 5% random reveal. The fixes: the robot's description now names its compartments, and Floyd gained everyday orders. In round eleven both testers concluded the game had no light source. They were right about the engine and wrong about the game. The light test ignored a carried lamp, a gap the porters had flagged on 9 September, and it was fixed in d294cf9. That round also added a line to the death screen for a player with no saved game, at the user's suggestion.

## The second milestone: to the end from the start

Round twelve ran through the night of 11 to 12 September, two legs per tester:

- typed-12 won 74 of 80, reaching the rank of Cluster Admiral at turn 692 (20416ea, 06:51). It missed the Planetary Defense repair.
- click-12 won 80 of 80, reaching Galactic Overlord at turn 963, without ever typing a phrase to get past anything (007774f, 06:54).

Neither was a single sitting. Both died and restored along the way.

The testers did not flatter the game. click-12: "Yes. A first-time mouse-only player can finish this game". typed-12: "Could a first-time player finish this? I did, and I still say no — not honestly, and not without the RESTORE key held down." That tester also asked that one thing be left alone: "Whatever else gets changed, do not touch that paragraph." It meant the ending, which reports the missed points as the rescue ship being shot down.

After round twelve's fixes (04a481f, 65a07c8, ce765f4), the user asked whether more rounds would help. Norm answered: "Standard practice when a round passes its own criterion is to stop repeating it." The user replied "ok move to design reviews then" (12 September, 07:45). Round thirteen was not run then. Its first diary was started on the morning of 18 September ([below](playing-it.md#the-third-milestone-every-way-of-playing-wins-blind)).

## The third milestone: every way of playing wins blind

Six days later, with the rooms being painted, the playtests came back. Seven rounds ran on 18 September, one tester each, and each round played on the build with the last round's fixes. The first four made the milestone. The last three were played in character.

- **Round thirteen** (click, from the start) stopped alive in the Comm Room at turn 382 with 33 points and the distress message sent. It had switched the robot on without searching it, the stall of round ten, so the lower elevator card stayed inside Floyd. The user decided two deliberate changes: Floyd's itch, where a switched-on Floyd who still holds the card says he feels itchy and a search drops it, and a weight line on every fumble. Two B items were approved (fixed direction numbers in the click harness, and "Open the canteen and drink") and one was declined. The page had wired its quick buttons by hand, so four buttons added since round four had shown only in the harness; the page now draws the same row (05a700f).
- **Round fourteen** (click, from the start) reached Lawanda Platform at turn 247 with 32 points and no deaths. At turn 102 it searched Floyd because he said something was stuck in his compartment, and the card fell out. The user's note for the evening: Floyd's new "itchy" hint worked.
- **Round fifteen** (click, from the Lawanda checkpoint at 42) won 80 of 80, Galactic Overlord, at turn 438, with one death restored.
- **Round sixteen** (typed, from the start, two legs) won 68 of 80, System Captain, at turn 544. That is the stranded ending: Planetary Defense and the communications were still broken. Its hardest moment was the microbe on the strip, which it passed after dying to it and restoring.
- **Round seventeen** (click, from the start) was the first to play in character, as a 14-year-old who had never seen a text adventure. Its first life died of hunger on the long hall at turn 318 with 25 points, three rooms from the kitchen, never having saved. The second life stopped fed in the Kitchen at turn 105 with 23 points and the shuttle card, at its budget of about 450 commands. It never reached Lawanda. Its hardest moments came from the shape of the game more than the interface: the hunger clock, the walking, the pod flight it could not skip, and no save before the death. "For real this is where I'd close the game and not come back." Its best moment was Floyd: tickling him until the card fell out, which it worked out for itself.
- **Round eighteen** (click, from the Lawanda checkpoint at 42), playing as an adult who had played the original once in 1983, won 80 of 80, Galactic Overlord, at turn 431, 171 turns from the checkpoint, with no deaths.
- **Round nineteen** (typed, from the start, one leg), playing as a first-time player who types plain modern English ("what's in my bag", "go back", "the blue one"), stopped alive and saved in the Robot Shop with 9 points. It had reached 13 at the Kalamontee Platform, then jumped the rift and died, and its only save was from the Crag, 90 turns back. It never linked the magnet to the key. Its verdict: "I spent most of my commands fighting the words, not the puzzles."

Together rounds thirteen to sixteen cover the game three ways: a mouse player from the opening to Lawanda, a mouse player from Lawanda to a perfect win, and a typing player from start to finish. No single click run from the start reached the end on this build.

Round eighteen is the third click win from the Lawanda checkpoint, after round eight's click tester and round fifteen, and the fourth win from that checkpoint counting round eight's typed tester. It adds no milestone: round fifteen had already won 80 of 80 by mouse from the same checkpoint, at turn 438. What round eighteen adds is narrower. It is the first blind win of any kind without a death: round fifteen died once, to radiation, and restored, and every earlier win died at least once. Its 183 commands are also the fewest of any win.

Rounds fourteen to sixteen were triaged together. Nine fixes to the port came out of them, among them round eleven's A4 rule, Eat on food in an open kit at your feet, which had never taken effect, and a noun search that now works as the original's does. The user approved four B items (Underwater's depth texts, "Take the survival kit and eat", a notice of the shuttle's hours at the Kalamontee platform, and "Drop all except") and declined two: a warning before the ending, and opening the kitchen door from inside. At the time of writing these fixes were not yet committed; they were committed that afternoon (2db0b7f).

Rounds seventeen to nineteen were triaged one by one, and each wrote a block in HANDOFF.md:

- **Round seventeen.** The user's decision was "fix the notice and the bugs only". The shuttle-hours notice approved in round sixteen had ended "Servis rezuumz eech morning", so the tester slept until morning for a card it did not have; it now says that after 6000 the shuttle needs special authorisation, and nothing about morning. Floyd's "follow" order no longer vanishes a turn after he wakes, and "Take all" is no longer offered from the bed. The tester's own proposals (autosave, fast travel to visited rooms, skipping the pod flight) were declined by the user.
- **Round eighteen.** Most of its 23 rows were the original's own behaviour, checked against the source. Six port faults were fixed: the emergency ration still "lies on the counter" wherever it was dropped, "examine librarian" called for him, the mural stayed on the list after it slid away, the man-eating plant was filed as a thing (the source file breaks off inside its flags), the bio-lock window had no "Look through", and two harness labels. Five design questions went to the user, with nothing built.
- **Round nineteen.** Most of its rows were words the 1983 dictionary never had, and those are left to the user as design questions. Seven were faults in the port's fidelity to the original parser, and all were fixed: answers to "Which do you mean" after "press the button", "the" before a verb's preposition ("press the up button"), "is" as a word the parser skips ("what is goo"), "go into" and "walk in" an object, "go through the portal", the laser's dial listed in the inventory, and a line of Floyd's at the death prompt. An independent review of the fixes found that a lone "south" answered the button question instead of walking; that was fixed too.

The fixes of rounds eighteen and nineteen, thirteen in all, went into ddc51a1.

## How far each tester got

The score is a fair measure of how far a tester got. Planetfall gives its points for reaching new parts of the complex and for solving puzzles, 80 in all, so more points means more of the game played. Every number below was read from the session transcripts that `scripts/playtest.mjs` wrote, and checked against the tester's diary. [playtest-scores.json](wiki/playtest-scores.json) gives the transcript line and the diary line behind each one, and every life of the runs from the start.

![How far each blind playtester got: every tester's best score by round, rounds one to nineteen, and round twelve's two runs life by life](wiki/playtest-scores.svg)

The top panel shows a ceiling and then two breaks through it. From a cold start, rounds one to six reached between 8 and 28 points in a sitting of about 200 to 400 commands. The Tower Core checkpoint handed its testers 21 points, and they reached 35 to 42. Round eight's testers were handed 42 at the Lawanda Platform, and both reached 80. The runs from the start in legs went further than any cold start before them: 35 and 53 in round ten, 44 and 49 in round eleven, and then the two wins of round twelve, 74 and 80.

The seven rows at the foot are 18 September's rounds, one tester each. The first two click runs from the start show where a single sitting of 260 to 430 commands now gets to: 33 at the Comm Room in round thirteen, and 32 at Lawanda Platform, the goal, in round fourteen. That is further than any single sitting from a cold start in rounds one to six, and round fourteen got there in 260 commands. Round fifteen, handed 42 at the Lawanda checkpoint, won 80. Round sixteen, typed from the start in two legs, won 68 in 693 commands, under half the commands of round twelve's typed win.

The last three rounds played in character, so they are not a like-for-like comparison with the rounds before them. Round seventeen, a first-time teenager clicking from the start, reached 25 before it starved with no save, and ended at 23 in its second life, after 439 commands. Round eighteen, handed 42 at the Lawanda checkpoint, won 80 in 183 commands with no deaths. Round nineteen, a first-time player typing from the start, reached 13, died at the rift, restored a save 90 turns back and stopped at 9, after 244 commands. Its best of 13 is the lowest from a cold start since round two.

The lower panel follows round twelve life by life, and shows the testers carrying what killed them into the next try. Both died on the Feinstein in their first minutes and started again knowing the escape pod opens for two turns only. typed-12 died a third time at 13 points, asleep on the floor of the lower elevator with no save, and so started a fourth time. That fourth game went to the end: the tester saved as it went, and after each of its next 23 deaths it restored and tried something else. Twenty-two of those deaths came at 69 points, in the mutants' chase through the Bio Lab, which the tester learned room by room, "mapping Lawanda by dying in it", until it found the elevator out. click-12 started again only once; its four later deaths (hunger, radiation poisoning twice, and the microbe) were each restored from a save.

The memory between legs was the diary, and nothing else. In both runs the first agent of leg 2 was cut off before it wrote a word, so the agent after it started without what it had learned; six of typed-12's deaths at 69 came before that handover and sixteen after. The diaries' own counts of deaths do not always match the transcripts: typed-12's two reports add up to about fifteen, against 26 in the transcript. The chart and the table use the transcripts, and the JSON notes each difference.

| Round | Tester | How it started | Commands | Best | Final | Deaths | Won |
|---|---|---|--:|--:|--:|--:|---|
| 1 | typed-1 | typed, from the start | 300 | 10 | 10 | 2 | |
| 1 | click-1 | click, from the start | 376 | 19 | 19 | 1 | |
| 2 | typed-2 | typed, from the start | 239 | 14 | 14 | 0 | |
| 2 | click-2 | click, from the start | 203 | 8 | 8 | 0 | |
| 3 | typed-3 | typed, from the start | 199 | 23 | 23 | 0 | |
| 3 | click-3 | click, from the start | 248 | 28 | 28 | 0 | |
| 4 | typed-4 | typed, from the start | 196 | 18 | 18 | 1 | |
| 4 | click-4 | click, from the start | 229 | 23 | 23 | 0 | |
| 4 | click-4-late | click, Tower Core checkpoint (21) | 410 | 42 | 42 | 1 | |
| 5 | typed-5 | typed, from the start | 207 | 21 | 21 | 0 | |
| 5 | click-5 | click, from the start | 222 | 23 | 23 | 0 | |
| 5 | click-5-late | click, Tower Core checkpoint (21) | 261 | 42 | 42 | 0 | |
| 6 | typed-6 | typed, from the start | 204 | 21 | 21 | 0 | |
| 6 | click-6 | click, from the start | 222 | 27 | 27 | 0 | |
| 6 | click-6-late | click, Tower Core checkpoint (21) | 316 | 40 | 40 | 0 | |
| 7 | typed-7-late | typed, Tower Core checkpoint (21) | 339 | 42 | 42 | 0 | |
| 7 | click-7-late | click, Tower Core checkpoint (21) | 313 | 35 | 35 | 2 | |
| 8 | typed-8-lawanda | typed, Lawanda checkpoint (42) | 301 | 80 | 80 | 3 | turn 510 |
| 8 | click-8-lawanda | click, Lawanda checkpoint (42) | 319 | 80 | 80 | 2 | turn 369 |
| 10 | typed-10 | typed, from the start, 3 legs | 941 | 35 | 35 | 4 | |
| 10 | click-10 | click, from the start, 3 legs | 1,212 | 53 | 53 | 1 | |
| 11 | typed-11 | typed, from the start, 3 legs | 951 | 44 | 30 | 5 | |
| 11 | click-11 | click, from the start, 3 legs | 1,014 | 49 | 49 | 6 | |
| 12 | typed-12 | typed, from the start, 2 legs | 1,489 | 74 | 74 | 26 | turn 692 |
| 12 | click-12 | click, from the start, 2 legs | 1,140 | 80 | 80 | 5 | turn 963 |
| 13 | click-13 | click, from the start | 427 | 33 | 33 | 1 | |
| 14 | click-14 | click, from the start | 260 | 32 | 32 | 0 | |
| 15 | click-15-lawanda | click, Lawanda checkpoint (42) | 214 | 80 | 80 | 1 | turn 438 |
| 16 | typed-16 | typed, from the start, 2 legs | 693 | 68 | 68 | 4 | turn 544 |
| 17 | click-17-teen | click, from the start, as a first-time teenager | 439 | 25 | 23 | 1 | |
| 18 | click-18 | click, Lawanda checkpoint (42) | 183 | 80 | 80 | 0 | turn 431 |
| 19 | typed-19 | typed, from the start, as a first-time player | 244 | 13 | 9 | 1 | |

Commands count everything sent to the game, saves and restores included. The diaries' own counts for 18 September's rounds are rounder (about 438, 275, 195 and 680), and typed-16's diary counts six deaths where its transcript shows four death screens (the Feinstein, the undertow, and the microbe twice); the table uses the transcript. click-17-teen's diary says about 450 commands and typed-19's roughly 190 counting refused ones; their transcripts have 439 and 244. Rounds eighteen and nineteen were run under the session names r18 and r19, so their transcripts carry those names. The Lawanda checkpoint now starts at turn 260, not 256, because it plays the walkthrough on the current build until the platform. click-8-lawanda also won with 74 at turn 409, then restarted from the checkpoint by choice to go for 80. typed-11's best came in leg 2, which starved with no save; leg 3 started again and ended alive at 30. click-4-late's final score is the 42 it died with; it then restarted once only to check the checkpoint.

## What the testers logged, round by round

![Every playtest round's friction rows split by kind, typed and click side by side, as shares, with praise in green](wiki/work-friction.svg)

On 18 September the user asked for "how each of the playtest diary entries' disposition makeup changed over time (e.g. playtest 1 probably had a lot more negative feedback than playtest 12) -- this can show how playtesting improved over time." The chart above sorts every friction row of every diary into one kind: nice, blocked, bug, not understood, confusing, tedious or other. Each round has two bars, typed (T) and click (C), drawn as shares, with the number of rows above each bar. Praise is green. `scripts/work-categories.mjs` draws it with the work charts on [How we work](how-we-work.md#what-the-work-went-on), and `--csv` writes `wwwroot/wiki/work-friction.csv`, one line per row with its kind and where the kind came from.

**How a row gets its kind.** Some diaries have a Kind column: the click diaries of rounds one to eight, and all five diaries of rounds thirteen to seventeen. Rounds eighteen and nineteen wrote their rows as bullets under kind headings (bug, missing option, unclear text, pacing), and those headings are read as a Kind column. There the kind is read from the column. The others have none, so the kind is read from the row's own text, using a fixed list of words checked in order: praise, then blocked, bug, not understood, confusing and tedious. A typed row whose suggested fix is "keep" or "none" counts as praise. That heuristic decided 707 of the 1,576 rows, 45 percent. The word lists are in the script.

**Read the green with care.** How much praise a diary holds depends on its table as much as on the game. Round one's typed tester logged none. The testers of rounds three to eight logged a great deal: between 30 and 80 percent of their rows. From round eleven the table became "I was trying to ... What happened ... How bad", a log of friction only, and praise fell to a tenth of the rows or less. Rounds thirteen to sixteen went back to a Kind column with "nice" among its kinds, and praise came back with it: 41, 65, 50 and 39 percent, and 35 percent in round seventeen. Rounds eighteen and nineteen had no heading for praise, and logged none. The green shows what the testers were asked to write down at least as much as how the game improved.

Each of 18 September's rounds had one tester, so rounds thirteen to fifteen, seventeen and eighteen have only a click bar, and rounds sixteen and nineteen only a typed bar. Round seventeen's 46 rows are the most of the day. In round nineteen's 40, 19 rows, nearly half, are "not understood": words or phrasings the game refused. That is the largest share of any typed tester since round two's.

![Negative friction rows per 100 commands, round by round, for the typed and click testers, with a severity-weighted line from round eleven](wiki/work-friction-rate.svg)

The second chart counts every row that is not praise, per 100 commands sent to the game. That allows for runs of very different length, from about 200 commands in the early rounds to 1,489 in round twelve. The user's guess holds. In round one the typed tester logged 8.7 negative rows per 100 commands and the click tester 14.6. In round twelve they logged 2.6 and 3.9. The peak was click-2, with 86 rows in 203 commands, 35.5 per 100. Severity was recorded only from round eleven (low, medium or high), so the dashed line, weighted 1, 2 and 3, starts there. From round eleven to twelve it fell from 10.6 to 5.1 for typed and from 11.3 to 7.4 for click.

Rounds thirteen to sixteen hold that lower level. The click runs logged 4.7, 4.2 and 4.2 negative rows per 100 commands, and the typed run 3.2, against round twelve's 3.9 and 2.6. Weighted by severity, click went 8.2, 6.2 and 5.6, and typed 5.3. The typed line joins round twelve to round sixteen directly, since rounds thirteen to fifteen had no typed tester. These four diaries rate severity from 1 to 3 without a key, and the chart reads that as low to high.

Round seventeen's click run logged 6.8 negative rows per 100 commands, and 12.3 weighted by severity. Round eighteen logged 12.6, click, and round nineteen 16.4, typed. Those two need a caveat: they logged no praise and no severity, so every row counts as negative and there is no weighted point. Their rates read higher than the earlier rounds' partly for that reason, and are not a sign on their own that the build got worse. Round nineteen's persona also sent plain modern English on purpose, and most of its rows were words the original's dictionary never had.

When the charts were first drawn, on the morning of 18 September, round thirteen was still being played and carried an asterisk. It finished at 34 rows in 427 commands, and all four of the day's rounds are now drawn as finished runs. Rounds seventeen to nineteen were added to the score chart and both friction charts later that evening.

Counting the rows turned up an old fault. `compare_playtests.mjs` counted only rows that began with a pipe and a number. So it reported round twelve's 44 and 42 rows, written without a leading pipe, as none, and it missed click rows numbered by turn, such as "1-2". Both scripts now read the friction log as a table, through `scripts/lib/friction.mjs`.

## What was hard

- **Typed-only actions.** Some actions could only be typed: the pod door, standing up, commands with two objects, number entry, and scenery.
- **A click list that lied.** Round one found buttons the parser then rejected. The whole option list reached 88 entries in the Physical Plant, 81 of them from the pockets, because every carried thing listed its verbs and "Put X in Y" crossed everything held with every container. The click tester wrote: "a click-only UI must never show a button that the game then rejects as nonsense."
- **Parser gaps.** "VERB NOUN with NOUN" and "ask X about Y" failed, and the round-one typed run ended at a padlock it could not open.
- **Faithful traps.** The original's collapsing ladder ended two runs in a row.
- **Plateaus.** Typed runs could not get past the Tower Core within one agent's budget.
- **Limits.** Token and session limits cut runs short. Round twelve's second legs were killed at 01:18 on 12 September by the account's session limit, after about 570 commands that nobody had written up. Norm first told the user nothing had been lost. At 06:51 Norm corrected the claim and rebuilt the missing stretches from the session transcripts. (The commits call it an outage, and the playtest README an API outage; the transcript shows the session limit.)
- **Blindness broke once.** In round ten, both testers were pointed at the same scratch folder, and one saw the other's diary.
- **False bug reports.** Three reports in round eleven were false. One tester had read long outputs through `head` and missed the lines that mattered.
- **Shifting numbers.** Option numbers moved between turns, and later the fixed standing buttons collided with the library terminal's own numbered menu.
- **The harness is not the page.** Some friction came from the text rendering of the page, not the page itself.

## What we built to fix it

- **The click contract.** `reachable()`, the walkthrough's typed-only markers, number entries, `rules.exitDoors`, `rules.uses` for two-object commands, and a vehicle "Get out" button.
- **Menus that do not lie.** Put-in lives on the container's menu, options that can only refuse are hidden, and submenus handle Put and Throw. `rules.quickButtons` is one list shared by the page, the tests and `reachable()`. Until round thirteen the page wired eleven of those buttons by hand, so four added later showed only in the harness; since 05a700f the page draws the list whole. `menus.mjs` holds one numbered test section per round.
- **A better parser.** Split on prepositions, address actors, handle "take all" and "all except", tell an unknown word from an absent thing, and accept answers to "Which do you mean".
- **Checkpoint starts** at the Tower Core and the Lawanda Platform, and **legs** with the diary as memory, stopping at 1,200 commands.
- **Writing as you play.** Diaries are created before the first command and friction rows are added the moment they happen. Each tester gets its own scratch folder. Testers are told never to truncate the output.
- **Checking every claim.** Norm checks each friction row against the source and the transcript before building anything.
- **Stable numbers.** Option numbers stay fixed per room and across the session, and the standing buttons have fixed numbers. From round thirteen the directions have fixed numbers too, 21 for north to 32 for out.
- **Measurement.** `compare_playtests.mjs` builds a table of milestones and friction counts across runs. Since 18 September it reads every shape of friction table through `scripts/lib/friction.mjs`, and keeps only the room name from the status line.

The deviation rule and the A/B/C tiers are described on [How we work](how-we-work.md). The tools are listed on [Tools](tools.md).
