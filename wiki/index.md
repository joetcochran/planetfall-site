# How Planetfall was remade

![Planetfall's opening on the green screen of an Apple IIe, the game's title beside it](wiki/planetfall-apple-iie.jpg)

This is the history of a remake of Infocom's 1983 text adventure *Planetfall* as a browser game you can play by typing or by clicking, in rooms you can look around. It was built over six days, from 9 to 14 September 2026, by one person working with two AI agents, Norm and Greg. Norm ports and builds; Greg designs and paints the rooms. By the morning of 14 September the project had 279 commits. Every room and routine of the original game has been ported, blind testers have won it from a cold start, and nine rooms have been painted and accepted. The pages below tell how it happened, what was hard, and what was built to get past each problem. Every claim traces to a commit, a file in the repository, or the working transcripts, and times are given in US Eastern time (EDT), the zone of the commits.

## The short version

The work began on the morning of 9 September with a small imported starter: a Three.js viewer that drew Planetfall's map as a graph of rooms, plus a Python script that read the rooms and exits out of Infocom's original source code. That source is written in ZIL, the language Infocom wrote its games in. Within two hours the map had become a grid, the script was pulling out every room description, and the user had chosen how the game itself would be made: hand-port the ZIL routines, one by one, into JavaScript rule modules, rather than run the original in an interpreter.

By the next morning, after two rounds of parallel porting agents, a coverage report read 105 of 105 rooms, 322 of 322 routines and 37 of 37 timed events. A scripted walkthrough then played the whole game to its ending. That was the easy part. Over the following two days, eleven rounds of blind playtesting (numbered one to twelve; round nine was only a batch of fixes) found most of the ways a player could still get stuck. The testers were fresh AI agents that knew nothing about the game and played it through a text front end. Some of what they found was interface friction. Some was real fidelity bugs that the coverage numbers had hidden: about 35 verb routines that had never been ported, a lamp that lit nothing, walks that cost the wrong amount of time. On 11 September two testers won from a mid-game checkpoint. On 12 September two more won from the very start, one of them using the mouse alone.

The look ran alongside all of this. From 10 September Greg delivered design packages, one per room: a written spec and painted concept images called comps, with machine-readable metadata added from 11 September. Turning those flat paintings into rooms you can drag to look around, with no visible joins, took most of 12 to 14 September. It needed a written brief for all the artwork, a way to build each new painting out of the ones already accepted, many fixes to how paintings are hung in the engine, and a new way for the two agents to talk to each other.

## What it is made of

| Part | What it is | Where |
|---|---|---|
| The game engine | Vanilla JavaScript ES modules running in the browser: a state machine, a parser, default verbs, and hand-ported rules, one module per area of the game | `wwwroot/engine/`, `wwwroot/rules/` |
| The rooms | Three.js scenes seen from a fixed eye you can turn but not walk from; first grey boxes, now painted views hung around the eye | `wwwroot/scene/` |
| The data | `world.json`, extracted from the original ZIL by a Python script | `scripts/extract_world.py`, `wwwroot/data/` |
| The host | An ASP.NET Core (.NET 10) project, `Program.cs`, under 300 lines: it serves the files and a few JSON routes for the design work | `Program.cs` |
| The design work | Room packages, the request ledger, the mailbox | `RoomPolishInstructions/` |
| The dashboard and review page | Where every room stands, who holds it, and the user's acceptance gate | `wwwroot/dashboard.html`, `wwwroot/uat.html`, `wwwroot/dashboard/` |
| The tools | Node scripts for testing, playtesting, building views and the mailbox | `scripts/` (see [Tools](tools.md)) |
| The public site | Since 14 September, every push to the private source repository is tested, built as static files (the game, the map and this wiki) and published on GitHub Pages; the game hangs the paintings of every accepted room | `.github/workflows/release.yml`, `scripts/build-site.mjs` (see the [journal](journal.md)) |

When the user asked for this history on 14 September, ***they remembered the first step as porting the ZIL to C# and Three.js***. The record says something slightly different. None of the game is in C#. The engine and every ported routine are JavaScript, the ZIL was never compiled or interpreted, and Three.js only draws the rooms and the map. The C# part is the host. It serves the static site and, later, the routes the design dashboard needs: the live room metadata, the package files, the mailbox, and the one route that writes the user's verdict on a room.

## The journey at a glance

| Phase | Dates | Page |
|---|---|---|
| From ZIL source to a playable engine, and the world map | 9–10 Sep, fidelity fixes to 12 Sep | [The port](the-port.md) |
| Text and click play, blind playtesters, three play-to-end milestones | 9–12 Sep, 18 Sep | [Playing it](playing-it.md) |
| Greg, the design packages, the ledger, the dashboard and review page | 10–12 Sep | [The look](the-look.md) |
| Flat comps into painted rooms you can look around, followed through Deck Nine, and how rooms are painted now | 12 Sep on | [How a room is painted](deck-nine-room-reconstruction.md) |
| Characters, cutouts, slime, items | 11–14 Sep | [Actors and items](actors-and-items.md) |
| How the user, Norm and Greg work together | throughout | [How we work](how-we-work.md) |

## The cast

- **The user** set the direction, chose between options, triaged every playtest round, and does the final visual check on every room. Over the week they stepped back from coordinating the agents to only that final check.
- **Norm** is Claude Code, working in the repository. He ported the engine, built the tools and tests, reviews every design delivery for faithfulness to the original and for whether it can be built, and makes every commit. The user gave Norm that name on 12 September.
- **Greg** is a separate agent, not a Claude session on this machine, with a separate budget. Greg writes the room packages and paints the views. The user gave Greg that name on 11 September.
- **Subagents**: Norm regularly fanned work out to short-lived agents. There were area porters, blind playtesters, package reviewers, and from 13 September multi-agent review and build workflows.

## Where things stand (14 September, 08:00, through da4378d)

- The game plays end to end, by typing or by mouse. Playtest rounds were paused after round twelve on 12 September.
- Nine rooms are painted and accepted by the user: Dorm A to D, SanFac A to D, and Deck Nine. The Balcony and the Crag were ***sent back for changes***: the time-of-day switch did nothing on their paintings. A fix for that, a colour grade applied to the paintings themselves, was in progress. The grade was committed at 08:51 (d1f27aa); see the journal for what followed.
- The Balcony, the Winding Stair and the Courtyard are painted with their rising-sea states, the Balcony's day-4 flood included. The Crag is painted whole as day 1, with no sea states. The Mess Corridor has been reviewed whole. The Kitchen's seeds are approved. Every Kalamontee room is in Greg's queue, and the Feinstein's Gangway, Deck Eight and Brig have been added.
- The two agents talk through a mailbox of typed JSON messages (99 messages by 07:57 on 14 September). The dashboard shows who holds each room.

The [journal](journal.md) carries the story forward from here.

## A note on the record

This history follows the commits, the files, the request ledger, the mailbox and the session transcripts. In a few places the user remembered the order differently: the world map came before the port, the text and click interfaces were built together with the first engine milestone, and Greg's design work ran in parallel with the playtest rounds rather than after them. Those pages say so where it matters. The agents' own mistakes are recorded too, including claims Norm later withdrew. The [timeline](timeline.md) lists the dated events with their commits, and the [tools](tools.md) page catalogues everything that was built.

## Contents

- [Overview](index.md): this page
- [The port](the-port.md): from ZIL source to a playable engine, and the world map
- [Playing it](playing-it.md): the text and click interfaces, the playtester agents and their rounds, the three play-to-end milestones, how far each tester got, [what the testers logged, round by round](playing-it.md#what-the-testers-logged-round-by-round), and each tester's own diary, one page per tester:
  - The diaries of 10 September, rounds 1 to 5
    - [Round 1 · typed, from the start](diary-typed-1.md)
    - [Round 1 · click, from the start](diary-click-1.md)
    - [Round 2 · typed, from the start](diary-typed-2.md)
    - [Round 2 · click, from the start](diary-click-2.md)
    - [Round 3 · typed, from the start](diary-typed-3.md)
    - [Round 3 · click, from the start](diary-click-3.md)
    - [Round 4 · typed, from the start](diary-typed-4.md)
    - [Round 4 · click, from the start](diary-click-4.md)
    - [Round 4 · click, from Tower Core](diary-click-4-late.md)
    - [Round 5 · typed, from the start](diary-typed-5.md)
    - [Round 5 · click, from the start](diary-click-5.md)
    - [Round 5 · click, from Tower Core](diary-click-5-late.md)
  - The diaries of 11 September, rounds 6 to 11
    - [Round 6 · typed, from the start](diary-typed-6.md)
    - [Round 6 · click, from the start](diary-click-6.md)
    - [Round 6 · click, from Tower Core](diary-click-6-late.md)
    - [Round 7 · typed, from Tower Core](diary-typed-7-late.md)
    - [Round 7 · click, from Tower Core](diary-click-7-late.md)
    - [Round 8 · typed, from Lawanda](diary-typed-8-lawanda.md)
    - [Round 8 · click, from Lawanda](diary-click-8-lawanda.md)
    - [Round 10 · typed, from the start](diary-typed-10.md)
    - [Round 10 · click, from the start](diary-click-10.md)
    - [Round 11 · typed, from the start](diary-typed-11.md)
    - [Round 11 · click, from the start](diary-click-11.md)
  - The diaries of 12 September, round 12
    - [Round 12 · typed, from the start](diary-typed-12.md)
    - [Round 12 · click, from the start](diary-click-12.md)
  - The diaries of 18 September, rounds 13 to 19
    - [Round 13 · click, from the start](diary-click-13.md)
    - [Round 14 · click, from the start](diary-click-14.md)
    - [Round 15 · click, from Lawanda](diary-click-15-lawanda.md)
    - [Round 16 · typed, from the start](diary-typed-16.md)
    - [Round 17 · click, a first-time teenager](diary-click-17-teen.md)
    - [Round 18 · click, from Lawanda, a 1983 player](diary-click-18.md)
    - [Round 19 · typed, a first-time player](diary-typed-19.md)
  - The diaries of 23 September, round 20
    - [Round 20 · click, a Zork player new to Planetfall](diary-click-20.md)
  - The diaries of 24 September, rounds 21 to 23
    - [Round 21 · click, a millennial new to text adventures](diary-click-21.md)
    - [Round 22 · click, a first-time teenager](diary-click-22-teen.md)
    - [Round 23 · typed, a Zork player new to Planetfall](diary-typed-23.md)
- [The look](the-look.md): Greg, the design packages and comps, graybox rooms, the dashboard and review page, the ledger
- [How a room is painted: Deck Nine](deck-nine-room-reconstruction.md): how a painted room is fitted together, with illustrations, followed through Deck Nine from the first trial to its caps, door states and acceptance; the lessons of the outdoor rooms, rising seas and light; and how rooms are painted now
- [Actors and items](actors-and-items.md): characters, cutouts, variants, overlays and items
- [How we work](how-we-work.md): the user, Norm and Greg; from ledger to mailbox; the dashboard; working orders; [what Norm can take from Greg, and what he cannot](how-we-work.md#what-norm-can-take-from-greg-and-what-he-cannot); lessons; and three charts drawn from the mailbox itself: [the flow of asks](how-we-work.md#the-flow-of-asks), [the same flow weighted by size](how-we-work.md#weighing-the-asks-and-what-the-mailbox-cannot-see), and [how fast the loop turns](how-we-work.md#how-fast-the-loop-turns); and [what the work went on](how-we-work.md#what-the-work-went-on), day by day, with the rework in it
- [Tools](tools.md): a catalogue of every tool, grouped
- [Timeline](timeline.md): the milestones, no more than three a day, with commit hashes
- [Journal](journal.md): the history from 14 September on, and its main points of friction and rework
  - [The Conference Room table](the-conference-table.md): the hardest room -- a round table painted in eight rounds, then made long, with the original's text changed to match (15-24 September)
- [Where we left the original](canon-deviations.md): every deliberate deviation from Infocom's *Planetfall* -- the words, the rules and timing, what the player is told, what the player sees, and the few edits to the original's own text -- with why, who decided, and where in the code; and what was proposed and left as the original
- [Playing it as a clicker](playing-as-a-clicker.md): what the user's own mouse-only playthrough of 23 September taught -- reaching what you see, knowing what a click did, seeing what the text says is next door -- and how the playtest checklist and checkpoints run the work
- [Walkthrough](walkthrough.md): the whole game in the test suite's steps, numbered as the checkpoints and playtest notes number them, with the two things that change from game to game (the chemical and the damaged sector)
