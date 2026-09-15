# How Planetfall was remade

This is the history of a remake of Infocom's 1983 text adventure *Planetfall* as a browser game you can play by typing or by clicking, in rooms you can look around. It was built over six days, from 9 to 14 September 2026, by one person working with two AI agents: Norm, the development agent, and Greg, the design agent, who paints the rooms. By the morning of 14 September the project had 279 commits. Every room and routine of the original game has been ported, blind testers have won it from a cold start, and nine rooms have been painted and accepted. The pages below tell how it happened, what was hard, and what was built to get past each problem. Every claim traces to a commit, a file in the repository, or the working transcripts, and times are given in US Eastern time (EDT), the zone of the commits.

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

When the user asked for this history, they recalled that the first step had been to "port the ZIL to C# / three.js" (14 September). The record says something slightly different. None of the game is in C#. The engine and every ported routine are JavaScript, the ZIL was never compiled or interpreted, and Three.js only draws the rooms and the map. The C# part is the host. It serves the static site and, later, the routes the design dashboard needs: the live room metadata, the package files, the mailbox, and the one route that writes the user's verdict on a room.

## The journey at a glance

| Phase | Dates | Page |
|---|---|---|
| From ZIL source to a playable engine, and the world map | 9–10 Sep, fidelity fixes to 12 Sep | [The port](the-port.md) |
| Text and click play, blind playtesters, two play-to-end milestones | 9–12 Sep | [Playing it](playing-it.md) |
| Greg, the design packages, the ledger, the dashboard and review page | 10–12 Sep | [The look](the-look.md) |
| Flat comps into seamless painted rooms | 12–14 Sep | [Seamless rooms](seamless-rooms.md) |
| Characters, cutouts, slime, items | 11–14 Sep | [Actors and items](actors-and-items.md) |
| How the user, Norm and Greg work together | throughout | [How we work](how-we-work.md) |

## The cast

- **The user** set the direction, chose between options, triaged every playtest round, and does the final visual check on every room. Over the week they stepped back from coordinating the agents to only that final check.
- **Norm** is the development agent (Claude Code). Norm ported the engine, built the tools and tests, reviews every design delivery for faithfulness to the original and for whether it can be built, and makes every commit. The user gave Norm that name on 12 September.
- **Greg** is the design agent, a separate agent, not a Claude session on this machine, with a separate budget. Greg writes the room packages and paints the views. The user gave Greg that name on 11 September.
- **Subagents**: Norm regularly fanned work out to short-lived agents. There were area porters, blind playtesters, package reviewers, and from 13 September multi-agent review and build workflows.

## Where things stand (14 September, 08:00, through da4378d)

- The game plays end to end, by typing or by mouse. Playtest rounds were paused after round twelve on 12 September.
- Nine rooms are painted and accepted by the user: Dorm A to D, SanFac A to D, and Deck Nine. The Balcony and the Crag came back with "changes": the time-of-day switch did nothing on their paintings. A fix for that, a colour grade applied to the paintings themselves, was in progress. The grade was committed at 08:51 (d1f27aa); see the journal for what followed.
- The Balcony, the Winding Stair and the Courtyard are painted with their rising-sea states, the Balcony's day-4 flood included. The Crag is painted whole as day 1, with no sea states. The Mess Corridor has been reviewed whole. The Kitchen's seeds are approved. Every Kalamontee room is in Greg's queue, and the Feinstein's Gangway, Deck Eight and Brig have been added.
- The two agents talk through a mailbox of typed JSON messages (99 messages by 07:57 on 14 September). The dashboard shows who holds each room.

The [journal](journal.md) carries the story forward from here.

## A note on the record

This history follows the commits, the files, the request ledger, the mailbox and the session transcripts. In a few places the user remembered the order differently: the world map came before the port, the text and click interfaces were built together with the first engine milestone, and Greg's design work ran in parallel with the playtest rounds rather than after them. Those pages say so where it matters. The agents' own mistakes are recorded too, including claims Norm later withdrew. The [timeline](timeline.md) lists the dated events with their commits, and the [tools](tools.md) page catalogues everything that was built.

## Contents

- [Overview](index.md): this page
- [The port](the-port.md): from ZIL source to a playable engine, and the world map
- [Playing it](playing-it.md): the text and click interfaces, the playtester agents and their rounds, the two play-to-end milestones, and how far each tester got
- [The look](the-look.md): Greg, the design packages and comps, graybox rooms, the dashboard and review page, the ledger
- [Seamless rooms](seamless-rooms.md): turning flat comps into seamless painted rooms in Three.js
- [Actors and items](actors-and-items.md): characters, cutouts, variants, overlays and items
- [How we work](how-we-work.md): the user, Norm and Greg; from ledger to mailbox; the dashboard; working orders; lessons
- [Tools](tools.md): a catalogue of every tool, grouped
- [Timeline](timeline.md): one dated line per event, with commit hashes
- [Journal](journal.md): the running history from 14 September on
