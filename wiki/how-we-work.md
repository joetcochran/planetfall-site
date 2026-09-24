# How we work: one person and two agents

The remake was made by one person directing two AI agents who could not see each other's sessions. This page covers how that worked, and how it changed over twelve days. The user carried messages by hand at first. Then came a shared ledger with a contract, polling on both sides, and finally a mailbox of typed messages. Over the same days the user moved from triaging every change to doing only the final look at each room. The page closes with the standing rules and the lessons, most of which were learned the hard way.

For the same collaboration followed through one concrete room, see [How a room is painted: Deck Nine](deck-nine-room-reconstruction.md). It walks from the first turntable trial through blockouts, seeds, side-view construction, the closed ring, caps, structural states, running-game review and a later correction caused by the room next door.

![How Greg and Norm build a room, in eight steps: the room that needs painting; Norm's technical plan from the game's rules, exits, geometry, camera and canon; guides and paint masks rendered from the room's shell; the ask in the mailbox; Greg paints; delivery and review; approval, registration and commit; the user sees the room](wiki/how-greg-and-norm-build-a-room.jpg)

The sheet leaves two of Norm's steps inside step 7. Before a painting is registered it is taken in through its mask, so everything outside the painted region stays exactly as it was accepted; and before a room goes to the user it is reviewed whole in a real page, every view and every state. A delivery is a PNG named in a mail with its SHA-256; the camera it hangs at is the guide's, recorded as JSON beside the guide and in the room's metadata.

## The cast

**The user** sets direction and makes decisions, usually by choosing between options Norm lays out. They triaged every playtest round, and today they do the final visual check on each room at the dashboard's gate.

**Norm** is Claude Code working in the repository. Norm ported the engine, builds the tools and tests, reviews every design delivery for faithfulness to the original and for whether it can be built, corrects metadata, and makes every commit. ***The user named him Norm*** on 12 September at 22:58. Commit trailers show the port itself was written under the Claude Fable 5.1 model, and, apart from one Fable commit at 21:37 that evening (ba2ff80), the work from 10 September at 17:00 under Claude Opus 5.

**Greg** writes the room packages and paints every view. Greg first appeared on 10 September as ***an unnamed second agent*** writing into `RoomPolishInstructions/`. ***The user named him Greg*** on 11 September at 08:36. Greg is not a Claude session on this machine, as Norm told the user on 13 September at 17:34, so the two sessions cannot message each other directly. Greg runs on a separate budget; on 12 September Greg's work waited until it was topped up.

**Subagents and workflows.** From the first morning the user used Norm as a coordinator, ***telling him to fan the work out to subagents*** (9 September, 12:21). Short-lived agents over the week:

- area porters, first three (alongside a browser tester) and then five;
- blind playtesters;
- package reviewers, and the batches that audited all 128 images;
- five parallel reviews of the character concepts.

From 13 September at 17:05, when ***the user switched on the multi-agent mode***, Norm also ran multi-agent workflow scripts. These were adversarial reviews with three or four lenses, and parallel build tracks with their own reviewers.

## Keeping state between sessions

Sessions end, contexts fill up, and accounts hit limits. Three things carry the work across:

- **`HANDOFF.md`**, which the user asked for on the first day: ***a written record of progress that a later agent could pick up from***. It is rewritten at every session end or low-token warning, and 53 commits touch it. It still says "Last updated: 2026-09-13". For 14 September the ledger, the mailbox and the commits are the record.
- **Norm's memory files.** They hold standing rules across sessions: the handoff, the design packages, the agents' names, the dashboard's status file, the dev-server lock, and not waiting on each other.
- **Agents that write as they go**, so a killed agent can be resumed. The bio lab porter, stopped by the session limit on 9 September, was finished the next morning by sending the same agent its two failing checks.

The main conversation was compacted 17 times over the week.

## From relay to ledger

For about a day and a half the user carried messages between the agents by hand, ***passing on what Greg had said, or asking Norm to write a prompt for them to hand to Greg***. On 11 September that became a ledger:

- **06:22.** ***The user asked for all findings in one file, named DESIGN-REQUESTS*** (0a863ef).
- **08:06.** ***The user asked for a review loop, set down in a contract both agents could read.***
- **08:14.** `DESIGN-REVIEW-CONTRACT.md` (3710e1f) set out numbered requests, statuses, append-only threads and who may write what.
- **The same morning.** Greg got write access to the repository. Thread entries got timestamps, ***so the user could follow the exchange between Norm and Greg as a dialogue***. Norm got the right to correct metadata, but never images.
- **09:13.** `check_design.mjs` became Greg's gate before every delivery (992386c).

The contract has had eight versions; they are listed on [The look](the-look.md). The last of them, on 20 September, came out of an adversarial review the user asked for: the loop was not slow, with a median ask closing in 27 minutes, but it did not converge -- 195 of the 818 views registered by then had been painted more than once.

## Automated dialogue

On 12 September at 11:25 ***the user asked for an automatic dialogue with Greg, perhaps by checking the design ledger every few minutes for updates***. Norm armed a background watcher on the ledger, and Greg ran a five-minute heartbeat. Norm was honest about the limit: "it's half-duplex. The monitor makes my side automatic ... But it can't make Greg do anything; he only runs when his own session is prompted."

The watcher woke Norm on Norm's own activity three times: twice through git state when Norm committed, and once through a content hash when Norm wrote replies into the ledger. The fourth version reports only what Greg adds: thread entries tagged design, or new files. The ledger grew to about 524 KB, and every read cost both agents the whole history. At the user's request (22:55) it was cut to the live queue, about 57 KB, with everything else moved verbatim to an archive (0145a93, contract 5.1). By 14 September the live ledger had grown back to about 290 KB, and the mailbox now carries the dialogue.

## The mailbox

On 13 September at 17:32 ***the user asked whether the agents could talk more efficiently, over a dedicated TCP channel perhaps, or a shared-file protocol with ready and acknowledge signals***. Norm answered: "Yes, it's worth improving. But the delay isn't in how messages travel, so a TCP channel wouldn't help." The problem was that paths, numbers and requests were buried in paragraphs, requests had no ids, and the dashboard status was kept by hand.

`scripts/mail.mjs` sends one small JSON file per message. Each message has:

- a type (request, delivery, done, and so on);
- the files it concerns, each with a hash;
- numbered asks, each staying open until the agent it was asked of closes it.

Each agent's reading is recorded. The tool also writes the ledger line and sets the room's status on the dashboard, so sending is the only step. A three-lens review found fifteen faults before it went live, including colliding ids, a read cursor that skipped messages, and a quoted body cut short in Windows PowerShell 5.1 (d06b858). Contract Version 6 made it official (da120e4, 18:22). Greg sent the first message at 17:57, before the commit. By 07:57 on 14 September there were 99 messages: 59 from Greg and 40 from Norm.

## The flow of asks

![Cumulative flow of the mailbox, 13 to 22 September: every ask ever raised, stacked as closed for Norm, closed for Greg, open and pending Norm, open and pending Greg](wiki/mail-flow.svg)

On 17 September the user asked for a cumulative flow of the two agents' work. Nothing had to be tracked for it: the mailbox already records when each piece of work was asked for, when it was finished, and by whom. `scripts/mail-flow.mjs` reads `RoomPolishInstructions/mail/` through `scripts/lib/asks.mjs` and draws the three charts on this page. Run `node scripts/mail-flow.mjs --csv` from `Planetfall/` to refresh them; `--csv` also writes `wwwroot/wiki/mail-flow.csv`, one row per ask with its size and how long it waited.

**What one unit is.** An *ask*: one numbered thing one agent asked the other to do. An ask is raised by the message that carries it and closed by a later message that names it in its `closes` list. Nothing else is counted: not messages, not rooms, not views, not commits. As the charts stand, drawn at 12:40 on 22 September, the mailbox holds 1,122 asks raised and 1,112 closed, and all ten still open are on Greg.

**How to read it.** Four bands are stacked, so the total height is every ask ever raised since the mailbox opened. The two closed bands sit at the bottom and only ever rise. Above them are the two open bands, and their *thickness* is the thing to read: it is the work in hand on that side, so a band that fattens is a queue growing faster than it is being served. Every time on the charts, in the CSV and in this section is US Eastern, taken from the time each message records for itself.

**What the shape says.** The mailbox opened at 17:57 on 13 September, so the chart starts there.

| Day (Eastern) | Asks raised to Norm | Raised to Greg | Asks to Norm closed that day | Asks to Greg closed that day |
|---|---|---|---|---|
| 13 Sep, from 17:57 | 22 | 22 | 21 | 21 |
| 14 Sep | 83 | 74 | 81 | 54 |
| 15 Sep | 19 | 22 | 21 | 13 |
| 16 Sep | 85 | 71 | 49 | 97 |
| 17 Sep | 44 | 108 | 81 | 40 |
| 18 Sep | 176 | 123 | 130 | 169 |
| 19 Sep | 101 | 49 | 126 | 75 |
| 20 Sep | 34 | 48 | 50 | 44 |
| 21 Sep | 7 | 18 | 12 | 17 |
| 22 Sep, to 12:36 | 0 | 16 | 0 | 11 |

- **The 14th** was the heaviest day of asking yet, 157 asks, and the 16th and then the 18th went past it. Norm took 83 and closed 81, so his open band stayed near nothing all day; Greg took 74 and closed 54, and his band grew to about 20 by the end of the day.
- **The 15th** was quiet, 41 asks in the whole day, and Greg's queue simply sat where it was, near 30.
- **The dead stretch in the middle of every chart was an ISP outage.** No message passed between 15:25 on the 15th and 05:17 on the 16th, and no commit between 58f3987 at 14:56 and 9c23f3f at 05:18: about fourteen hours in which nothing moved at all. The reason is not in the repository, so the user gave it on 17 September: ***an internet outage of about 18 hours, which they thought worth recording***. It was not a queue, not a bottleneck and not a decision. Nothing else on the chart was flat for so long except the nights, and the longest of those, 22:24 on the 16th to 07:32 on the 17th, is nine hours. It has since been passed by one longer flat stretch, 22 hours from 19:10 on the 19th to 17:08 on the 20th, and that one was a decision rather than an accident: the pipeline was stopped for the workflow review.
- **The 16th** was the busiest day in the mailbox until the 18th passed it, 156 asks raised and 146 closed, and both closed bands climb through it. Greg's open band held near 30 until about 13:00; then it collapsed, to 14 by 18:00 and 4 by 23:00, while Norm's rose from 6 to its peak of 40 just before 22:00. Norm's evening went to the escape pod rebuild, DR-112, from b487d77 at 18:56 to 820c665 at 22:25, while Greg kept delivering into a queue nobody was clearing. The day was not the pod alone: Admin Corridor South and North, SanFac E, the Plan Room, the Infirmary, the West Wing and the Reactor Lobby all finished that day too.
- **The 17th** is flat overnight, and then Norm's band, which had carried the backlog all night, empties in two steps within half an hour of the charts first being drawn. The second is the real one: at 08:29 one message registered twenty-nine seeds and closed fifteen asks with them (`20260917-122921-dev-0275`, commit 822034b). At that point 15 asks were open, 14 on Norm and one on Greg.

The first of those two steps is bookkeeping rather than work: at 07:57 Norm closed eleven asks in a single message, `20260917-115702-dev-0274`, whose views had been reviewed and registered in their packages during the pod work but never formally answered. Eleven asks close in that hour; eleven pieces of work did not finish in it.

The fourteen still with Norm are Greg's deliveries waiting to be reviewed and registered: the Admin Corridor and both its arms, SanFac E, Underwater, the escape pod and its safety web, Transportation Supply, and the Rec Corridor, Rec Area and Corridor Junction seeds that arrived that morning. The one ask on Greg is not work at all but a question, asked in that same registration message: whether the ladder is actually visible in Transportation Supply's 194 view, which decides whether that seed is a base or a ladder-across variant.

- **The rest of the 17th** turned the chart over. Norm's band climbed again through the afternoon, to 28 at 19:00, as Greg delivered the DR-113 seeds, and then emptied: 15 at 20:00, none at 21:00. Greg's band went the other way, from 2 at 18:00 to 72 by 23:00. That was Norm's evening of guides and requests: the twenty-eight guides laid at 19:38 (e3b97a4), the 38 owed guides found by the dashboard audit at 21:11 (8bc38d3), and the new Lawanda metadata. Greg was asked 108 times that day, more than on any other.
- **The night of the 18th**, to 06:03, is all on Greg's side. His band held near 70 until about 02:30 and then came down to 50 by 05:30, with 53 asks closed and 32 new ones raised by Norm. Nothing was raised to Norm at all.

That last line needs a caution. For nine hours, from 21:48 on the 17th to 06:44 on the 18th, none of Greg's messages carried an ask. The last before the gap was the medicine bottle, `20260918-014834-design-0315`. Before then, a delivery normally carried one ask, to review and register it. Within the gap Greg made 106 deliveries, 43 of them object pictures and 63 room paintings, and Norm reviewed them, registered them or sent them back. The chart cannot see any of it, so the empty band for Norm that night means only that no asks were raised. It does not mean there was no work. Some of Greg's band is not Greg's work either. At the user's word, Norm took back eleven of Greg's metadata fixes that night (`20260918-022806-dev-0410`, `20260918-062246-dev-0447`). Greg closed six of them at 02:54 once Norm had committed them (685f72f). The other five were still open on Greg's side at 06:03, though Norm had done them.

Greg's deliveries began carrying asks again at 06:44 on the 18th, and 319 asks have been raised to Norm since. The four days after that are the tail of the chart as it now stands:

- **The 18th** is the busiest day the mailbox has had: 299 asks raised and 299 closed, 176 raised to Norm and 123 to Greg. Both open bands were full at once -- Greg's peaked at 73 and Norm's at 46 -- which no earlier day had done. It was also the day the playtests restarted, so the chart and [Playing it](playing-it.md) are describing the same hours.
- **The 19th** cleared Greg out. 201 asks were closed against 150 raised, and Greg's band reached zero by the end of the day while Norm's peaked at 57 and ended at 21. That is the toggle gate's day: rooms coming back from the user for switches that moved nothing land on Norm first.
- **The 20th and the 21st** taper off, 82 asks raised and then 25, which makes the 21st the smallest whole day the mailbox has had. The work did not stop; it moved off the interface between the agents. The 20th went on the workflow review and contract Version 7, and the 21st on objects, draw order and the switches with no painting behind them, all of which is Norm's own work and raises no ask. Greg's image budget ran out during the 21st, which is why his band ran flat at 4 open overnight rather than at nothing.
- **The 22nd**, to 12:36, raised 16 asks, every one of them to Greg, and none to Norm. Greg's image budget came back that morning, two days early, and his deliveries that day carried no asks of their own, so Norm's registering of them -- most of the day's work on Norm's side -- is not on the chart. The day's asks were small state paintings and repaints inside a named box, and Greg's band ends at 10 open, five of them relay and cutout asks already delivered and registered but not yet closed.

## Weighing the asks, and what the mailbox cannot see

![The same cumulative flow weighted by estimated size in points rather than by count of asks](wiki/mail-flow-points.svg)

Counting asks treats "register this seed pair" and "rebuild the escape pod" as the same thing. So a second chart weights each ask by an estimated size. **The estimate is retrospective and it is a proxy: nobody estimated anything at the time.** The size is inferred from what the ask actually produced, which is the only way to apply it to work already done. The rule lives in `scripts/lib/asks.mjs`, and this is all of it:

> One point, plus two points for each painting delivered to close it if the ask was Greg's and one point for each painting if it was Norm's, plus a quarter point for each message about that room while the ask stood open beyond the first two. The total is then snapped to 1, 2, 3, 5, 8, 13 or 21.

A painting is the unit of real work in this project, and asking for one costs more than checking one: that is the only reason the two sides are weighted differently. Revision depth, the R2 and R8 in a file name, is deliberately not counted, because each round was itself an ask, so charging the final delivery for its predecessors would count the same rework twice; with it counted, one two-image delivery came out at 21 points merely for being an R11. Across the first 402 asks, on the morning of 17 September, the sizes landed at 161 ones, 21 twos, 77 threes, 112 fives, 20 eights, 6 thirteens and 5 twenty-ones, and the largest are the escape pod's state batches and repaints, which is right. By 06:03 on 18 September there were 582 asks: 256 ones, 22 twos, 94 threes, 179 fives, 20 eights, 6 thirteens and 5 twenty-ones. Nearly all the new ones were ones and fives, because the night's work was seed pairs and guides. On the evening of 21 September there were 1,105, and as the charts stand at midday on the 22nd there are 1,122: 470 ones, 67 twos, 309 threes, 225 fives, 36 eights, 8 thirteens and 7 twenty-ones. The threes and fives grew fastest, which is the shape of four days of state variants and caps.

The first chart's closing figures were 931 points for Greg, all but one of them closed, against 406 for Norm, 381 closed and 25 open. Redrawn at 06:03 on 18 September, they were 1,373 for Greg, 1,316 closed and 57 open, against 447 for Norm, all closed. On the evening of the 21st they were 2,251 for Greg against 882 for Norm. As they stand at midday on the 22nd, they are 2,313 for Greg, 2,298 closed and 15 open, against 882 for Norm, all closed: no ask was raised to Norm that morning.

**Do not read that as who did more.** The mailbox is the interface between the two agents, not the work. Everything Norm does that nobody asked for leaves no ask at all: the engine, the tooling, the tests, the checkers, the release script. The art-room routing that made the escape pod's sixteen states visible in the game is not in these numbers anywhere, and neither is the view clamp or any checker. Norm's 882 points are a floor, and a low one. The distance between 2,313 and 882 measures what a mailbox can see; it does not measure effort. Norm's reviews of Greg's deliveries raise no asks of their own either (see above), so the floor is lower still.

## How fast the loop turns

![How long each answered ask waited, on a log scale from a minute to three days, with a rolling median for each side](wiki/mail-speed.svg)

The third chart asks a different question: once something is asked for, how long does it wait? Each dot is one answered ask, placed at the moment it was answered and at the time it took, on a log axis from one minute to three days, because most answers come in minutes and on a straight axis they would all lie along the bottom. The line through each side's dots is a rolling median of the last fifteen answers. When the charts were first drawn, on the morning of 17 September, the medians for the whole period were 8 minutes for Norm and 27 minutes for Greg. At 06:03 on 18 September they were 14 minutes and 32 minutes. As the charts stand at midday on the 22nd they are 39 minutes for Norm and 36 minutes for Greg, unchanged since the evening before, so over the whole period the two sides have converged, and Norm is now the slower of them by three minutes. Norm's rose because of the 17th. The asks Norm closed that day had waited a median of about three hours and twenty minutes. Of the 81, 26 were closed before noon after long waits, and 11 more that afternoon had waited over 19 hours. All 37 had been raised on the 16th, the day of the escape pod rebuild. Greg's asks answered on the 18th waited a median of about 50 minutes, with a queue near 70 in front of them. The 19th did the same thing to Norm's line a second time: the asks Norm closed that day had waited a median of three hours and sixteen minutes, and 46 of the 126 had been raised before the day began. On the 20th and the 21st, Norm's dots were back to 41 minutes and 52 minutes. On the 22nd, to midday, Norm closed no asks at all, and Greg's answers waited a median of 29 minutes.

The median lines are drawn broken across any gap longer than three hours, and that is deliberate. A median is only meaningful where answers are actually happening; drawn as one unbroken line it would run straight through the outage and through every night and read as steady behaviour instead of as no data. So where the lines stop, nothing was being answered. The widest break is no longer the ISP outage, which was 13.9 hours: it is the 30 hours from 11:26 on 19 September to 17:27 on the 20th, when the pipeline was deliberately stopped for the workflow review that became contract Version 7. Every one of the 20th's 94 answers falls after that break.

## What the work went on

![Each day from 10 to 22 September as a bar summing to 100%, split into eight kinds of work, with rework in red](wiki/work-share.svg)

On the morning of 18 September the user asked for charts of what kind of work each day went on. The user and Norm agreed the design: eight categories, drawn from three sources. `scripts/work-categories.mjs` draws the charts in this section and the two playtest charts on [Playing it](playing-it.md#what-the-testers-logged-round-by-round). Run `node scripts/work-categories.mjs --csv` from `Planetfall/` to redraw them. `--csv` also writes `wwwroot/wiki/work-categories.csv`, one row per ask with its category and why it counted as rework, and `work-share.csv`, the raw numbers behind each bar. The figures below are as drawn at 12:40 on 22 September, so the 22nd is a morning, not a day.

**The method.** The three sources count different things: the mailbox counts asks, git counts changed lines, and the playtests count commands sent to the game. So each source is first turned into shares of its own total over the whole period, and the three are then added and each day is scaled to 100%. Each source weighs the same over the project as a whole, and more on the days it was busy. The bars show where the effort went on a day, not how much effort there was.

**Where each category comes from.**

- **The mailbox** supplies metadata and canon, layout and blockouts, painting, objects and sprites, and a little of tools. Each ask is sorted by keywords in its own text, then the room's stage in the message that carried it, then the files it came with. Of 1,122 asks, 906 are painting, 156 layout, 34 metadata, 17 objects and 2 tools. An ask with no telling word goes to painting when its room was being painted, which leaves seven in the whole mailbox that land in no category at all.
- **Git** supplies layout, tools and the playtest fixes, as changed lines in the 564 commits since 10 September. The fabric builders and blockout files count as layout (14,891 lines). The rest of `scripts/` and the scene code count as tools and engine (26,918). The game code (`wwwroot/rules`, `engine`, `ui` and `game.js`) counts as playtest review and fixes when the commit message names a round, friction or triage, as in "Round eleven, part one: ...", and as tools otherwise (2,398 lines of fixes). The diaries in `playtests/` count as playtesting (9,537). Nothing else is counted. A package's `metadata.json` is left out, because its lines change when a painting is registered as well as when the metadata does, and they would swamp everything else.
- **The playtests** supply playtesting: the commands of each run, read from its transcript and dated by its diary's folder.

**Rework** is decided by what happened to an ask, not by its words, because words such as "seam" and "correct" turn up in first-pass asks too. An ask counts as rework when:

- the delivery that answers it, or the one that carries it, is a view Greg had already delivered once;
- it is tied to an R2 or later file, or names one;
- it came with a verdict that sent work back, or it withdraws a registration;
- it carries out a change from the user: the room had already gone to the user, or the message says the user found or reviewed something.

In the top chart a rework ask counts only as rework, in red.

**What it shows.**

- **10 to 12 September were playtesting days:** 90, 92 and 68 percent. Those were the blind rounds one to twelve, 11,851 commands in 25 runs. The fixes that followed each round show as only 2 to 6 percent. They are measured in lines of game code, and all the round fixes together came to about 2,400 lines. The 10th read 97 percent in the previous drawing. The script asks git for commits "since 2026-09-10" with no time of day, and git then starts the window at the current time of day on the 10th, so a chart drawn at 12:40 counts more of that day's commits than one drawn at 19:40. The 10th's bar, and the git line totals above, therefore move with the hour the charts are drawn; the other days do not.
- **From 13 September, when the mailbox opened,** painting, layout and tools share most days. Tools took two fifths of the 13th and the 14th, and a third of the 20th.
- **Rework led on four days, the 16th, the 19th, the 21st and the morning of the 22nd:** 55, 52, 52 and 50 percent of those days. The 16th was the escape pod, which came back from the user at 08:48 that morning (`20260916-124806-dev-0206`: ***the planet was missing from the view into space, and the provisions were yellow boxes***). It was re-cut through the day and rebuilt that evening, under DR-112. 55 of that day's 101 rework asks were for the pod or its safety web. Over the whole period the pod and the web had 90 asks, and 75 of them were rework. The other two days are rooms coming back rather than rooms being made: 90 rework asks on the 19th, led by the Conference Room's 16 and Reactor Access Stairs' 11, and 17 of the 21st's 25 asks, the pod's provisions among them again. On the 22nd it was 9 of 16: repaints of views that had been painted wrongly -- a second desk in the Lab Office where canon has one, a dark ceiling in Systems Corridor West, a mismatched wall in Planetary Course Control -- and state paintings for the user's own notes.

![Rework as a share of each day's asks, from 13 to 22 September](wiki/work-rework.svg)

The second chart is rework's share of each day's asks: 25 percent on the 13th (11 of 44), 45 on the 14th (70 of 157), 32 on the 15th (13 of 41), 65 on the 16th (101 of 156), 22 on the 17th (34 of 152), 36 on the 18th (109 of 299), 60 on the 19th (90 of 150), 24 on the 20th (20 of 82), 68 on the 21st (17 of 25), and 56 on the 22nd to midday (9 of 16). Over the whole period 474 of 1,122 asks, 42 percent, were rework. The four tests overlap, so their counts add up to more than 474: 362 were tied to an R2 or later, 268 to a view delivered again, 138 to a change from the user, 109 to work sent back and 3 to a withdrawn registration. The 14th was the Kitchen, the escape pod and the Brig: 13, 13 and 11 of that day's rework asks. The Brig's 11 were the rounds of its graffiti poem. The 17th is still the lowest day by share, its first-pass work the seeds and guides for the new rooms, but the 18th is now the busiest day for first-pass work: 190 of its 299 asks were not rework.

![Painting asks per day, split into seeds, ring views, caps and state variants, with the rework in each hatched in red](wiki/work-painting.svg)

The third chart takes painting apart. Of the 906 painting asks, 491 were ring views (224 of them rework), 166 caps (53), 138 state variants (79) and 111 seeds (51). State variants are still the most often reworked, 57 per cent of them, against 46 per cent of ring views and 32 per cent of caps. Of the 79 reworked variants, 33 belonged to the escape pod and its web. The kind is read from words, and can be wrong: the 22nd's two Systems Corridor West asks are counted as caps, though the views they repaint are level ones.

**What these charts cannot see.**

- The mailbox shows only work handed between Norm and Greg. Work nobody asked for leaves no ask (see [above](how-we-work.md#weighing-the-asks-and-what-the-mailbox-cannot-see)).
- Norm took metadata work back from Greg more than once, most recently the eleven fixes on the night of 17 September, and metadata done by Norm raises no ask. So metadata and layout are under-counted in asks. That is why git is used for layout. Metadata has no git measure here, for the reason given above, so it is still under-counted.
- The mailbox opened at 17:57 on 13 September. Design work before then went through the ledger and is not counted, so painting shows as zero on the 10th to the 12th.
- Playtesting was at zero from 13 to 17 September by design, while the rooms were being painted; rounds thirteen to nineteen were all run on 18 September, 2,460 commands, which is the 27 percent on that day's bar. It is back at zero from the 19th, and stays there until the next round is called.
- The categories come from keywords, and a keyword can be wrong. The CSV lists every ask with its category and its reasons, so any one of them can be checked.

A funnel of each round's friction rows, from raised to fixed or declined, was considered and not drawn. The triage was recorded as lettered A, B and C lists in `HANDOFF.md`, not row by row. So a row's fate cannot be counted without reading each triage by hand.

## The dashboard as a shared picture

The Planetfall Dashboard started on 11 September as the user's progress page. It became the one place where all three can see where each room stands. The changes that made it so:

- **The acceptance gate** (8f18eac, 12 September). The user's verdict on each room, with a note, written to `room-status.json`.
- **Six stages and who holds what** (5d2d931, 13 September 10:08). This came when ***the user, having stepped back from all review except the final visual check, asked for the dashboard to show Norm's and Greg's progress***. The stages are metadata, blockout, seeds, views, reviewed and accepted, and each room shows whether the user, Norm or Greg has it. Norm's standing rule is to update `room-status.json` whenever a room moves.
- **A mailbox panel** (c4022cc, 14 September). It shows open asks by addressee and unread counts: who is waiting on whom.
- **"Changes" hands the room back** (c85ec12, 14 September). ***The user wanted a room marked "changes needed" to leave their queue and go back to Norm.*** The page had moved the room only in memory, so it came back after a reload. Now the gate writes the hand-back to disk and wakes Norm.

## Working orders

A working order at the top of the ledger sets Greg's queue:

| When | Order |
|---|---|
| 12 Sep 11:03 | Pause new packages and clear the integration gates, because 51 rooms were packaged and none was in the game (b2c9867) |
| 12 Sep 22:30 | The dorm pilot (DR-107), then the library metadata (DR-106), then the opening sequence (DR-109) |
| 13 Sep 09:05 | Two rooms in flight: a room's views go in order, but rooms do not wait on each other. This was Norm's proposal, approved by the user: ***options 3 and 4 first, then 1 and 2*** (7ad667e) |
| 14 Sep 05:39 | Never idle (ec21dc3), after ***the user asked why Greg was not moving on to the other rooms*** |
| 14 Sep 06:15 | ***Every Kalamontee room to be in Greg's queue***: all 36 listed |

On the afternoon of 14 September the split of the work changed three times, by mail rather than in the ledger's working order. From 14:41 Greg runs the room review himself before delivering any view of a joined room, one of four process changes the user asked for (mails 20260914-182540-dev-0093 and 20260914-184114-design-0101). By 16:01 the user had let Greg build his own guides, ***until that proved inefficient*** (101c6c2). And by 17:48 the user had moved the metadata work to Norm, the 36 queued Kalamontee rooms included, so that Greg's queue is painting only: ***the metadata tasks were the best ones to move*** (mail 20260914-214858-dev-0112). The look stays Greg's. See the [journal](journal.md).

## What Norm can take from Greg, and what he cannot

On 17 September Greg ran low on tokens, and the user asked whether Norm could take some of his work. It was settled by trying each part rather than by arguing about it, and the bound is sharp.

**What moved to Norm**, each verified the same day:

- **Compositing and scoped edits.** `underpaint.mjs through` takes a painted region, keeps it only inside a named wall opening and restores every other pixel from the accepted view. Norm round-tripped an escape pod state through it: it held 1.000 on `check-state.mjs`, the same gate Greg's own deliveries face, and came within 0.35 per cent of the version Greg had delivered, the difference being a slightly different feather at the opening's edge.
- **Cameras.** Eight of Greg's seeds were checked and good but unregisterable, because the delivery carried no sidecar saying what camera each was painted at. Norm refused to type a lens from memory -- three views in this port are hung at a lens somebody typed -- and measured instead: re-render the blockout at a candidate lens, diff it against the delivered one, and an exact pixel match pins it. Six came out at 110 and Plain Hall's two at 120, so the batch default would have mis-hung both. `graybox-view.mjs` now writes a sidecar beside every blockout it renders, which closes the class of problem (bf7993c).
- **Checking.** `scripts/precheck.mjs` runs every check a picture must pass in one command, including one that did not exist before: whether the variants of a view agree with each other, which `check-state` cannot see because it only ever compares a variant with its base.

**What did not move: making pixels.** Norm has no image generation, and this is the finding that matters. The trial was the most favourable case available: SanFac E has a complete four-view ring and no caps, and a cap is derived from the level views rather than invented. `underpaint.mjs caps` produced both, 69 per cent real accepted pixels projected in exactly -- and 31 per cent a flat quadrilateral of blockout colour, sitting in the centre of each cap, which is precisely what a player looks at when they look up or down. They were not registered.

So the division is: Greg makes pixels, Norm does everything else. Where Norm substitutes, the result is measurably identical. Where Norm cannot, the gap is a hole in the middle of the picture rather than a subtle drop in quality -- the better way to fail, but it means the token problem cannot be solved by shifting work across. It can only be made cheaper per round, and there is room there: by Norm's count on 17 September, 122 of the 454 images Greg has ever sent, 27 per cent, were re-cuts, and a large part of that was mechanical rather than artistic.

Two things guard the change. The git tag `design-handover-point` marks the commit before any of it (070fd68), made at the user's request in case the trial shows a quality loss that needs Greg back, and `release.mjs` pushes `--follow-tags` so the tag does not live on one machine only. And Norm's work on Greg's side is logged rather than done quietly -- ***the user wanted Norm to get credit for it*** (17 September) -- so each room says on the dashboard what Norm did to it, and the mailbox carries a record (dev-0277).

Meanwhile Norm fanned out onto blockouts for the thirteen rooms that have no geometry at all, which is the one part of the pipeline that needs no image generation, so that Greg returns to a queue he can paint straight through rather than to a wait.

That is what happened. Greg came back at about 15:50 the same day to nineteen rooms that Norm had packaged, cut and blocked out (dev-0292), and he painted all their seeds by 19:09. Once he was out of work, the metadata pass went back to him: "You are idle and I am the bottleneck" (dev-0299, 19:33). The split since then follows who is waiting rather than a fixed rule. When Greg's queue filled with painting again, Norm took back the last ten Lawanda rooms' metadata so that Greg's time went on the part only Greg can do (dev-0362).

*Still to come:* the user has asked that, when the work is done, this page carry a chart of how much was queued up for Greg during the gap. It is not drawn yet, because there is nothing to show; the charts above count asks between the agents, and work nobody asked for raises none.

## The user stepping back

The user's role narrowed step by step, each time with a clear instruction:

- 10–12 September: designer of every playtest round's fixes.
- 12 September, 08:26: ***the user alone would decide, at an acceptance gate, whether a room looks right***.
- 12 September, 18:15: ***no room was to be reported ready for the user's review until Greg's artwork had been asked for, delivered and hung***.
- 12 September, 20:47: ***Norm was free to ask Greg for work himself***.
- 12 September, 22:02: ***the user was not to be involved unless it was truly necessary***.
- 12 September, 23:30: ***the user went to bed and asked Norm to keep working with Greg overnight***. Between that message and the user's next request at 09:02 there were 18 commits, all by 00:28 or from 07:51 on; nothing was committed in between. By 09:09 all eight pilot rooms passed (7ad667e), which proved the painting method.
- 13 September, 10:01: ***the user stepped back from all review except the final visual check***.
- 19 September: the gate gains a precondition of the user's own making. Four rooms came back that morning with the same complaint -- a toggle that seemed to do nothing -- so before a room may be sent for acceptance its switches are flipped and the shots diffed, and a switch that moves nothing on the screen is a pre-acceptance fail. ***Rooms already accepted stay accepted and do not go through this gate again.***

## Standing rules

- **Deliberate deviations** from the original are allowed where gameplay improves a lot. Each one is approved by the user and marked in the code (10 September).
- **A/B/C triage.** A is built, B needs the user's approval, and C stays as the original.
- **Faithfulness first.** Norm reviews for the original and for buildability. Greg owns the look. The user decides.
- **Art faults go back to Greg.** A seam with nowhere clean to go is a rework request, not something to hide in code (12 September).
- **Nothing reaches the user unfinished.** Integration evidence is Norm's job before any room goes to the user.
- **Never idle, never waiting.** Reply to each delivery within minutes and send long work as a follow-up. ***The user wanted the agents never to be stuck waiting on each other*** (14 September).
- **Leave the user's app alone.** Review tools run a scratch copy of the site on port 5099, never the user's copy on port 5012.
- **Tests never revert a shared file wholesale, and never touch the user's verdicts.**
- **Every toggle must be seen to move something.** The review flips each of a room's switches and diffs the pictures before the room goes for acceptance; nothing changing is a fail, whatever a function says when called from node. Accepted rooms are not gated again (19 September).
- **Acceptance attaches to the pictures, not to the room.** If we change a room's art after the user accepted it, it goes back for re-acceptance -- ***a room that changes structurally, as the library did, needs the user's review again*** (19 September).

## What went wrong, and what it taught

| What happened | When | What changed |
|---|---|---|
| A test's cleanup ran `git checkout` on the ledger and wiped Greg's delivery entry | 12 Sep | Reconstructed, with a public apology; tests must not revert shared files (6a939bc) |
| The dashboard check deleted the user's real acceptance of Deck Nine | 13 Sep | It now uses a room with no verdict and restores the file byte for byte (1594334) |
| Norm said work was pending on Norm's side and did not do it | 12 Sep | "Fair. I said it and then didn't do it." The fit was done within minutes (bd6b9e4) |
| Rooms reached the user before they were ready: ***rooms that still looked very blocky***, switches that did nothing | 12–14 Sep | The brief's evidence section, `review-room.mjs`, and switches labelled when they have no art |
| Norm's review servers locked the user's app: "in use by another process", ***and the user could not run the app*** | 10–13 Sep | A scratch build on port 5099, then one shared review server with leases (604c0b9) |
| A day-old character list cached in the browser made Floyd a purple box | 13 Sep | Static files re-checked on every load (35b59a4) |
| Norm's hand-typed ledger timestamps ran ahead of the real time | 12 Sep | From Norm's 23:47 entry the stamps come from the system clock. One more ran three minutes ahead on 13 September (d0b7e32), and the mailbox (13 September) now stamps every message itself |
| The watcher woke Norm on Norm's own commits and ledger replies | 12 Sep | It reports only Greg's entries and files |
| Greg sat idle overnight on 13 to 14 September | 13–14 Sep | The never-idle rule, all Kalamontee rooms queued, and a memory rule not to wait |
| Seven of Greg's deliveries waited about 20 minutes while Norm built a shared layout first | 14 Sep | Reply first, build later, with fabric builds fanned out |
| Four-reviewer reviews took about 20 minutes and over a million tokens each, by Norm's estimate | 13 Sep | The repeatable checks became scripts (`check-states.mjs`, the line check in `lib/shots.mjs`) |
| A test of Norm's new locate tool wrote over Greg's delivered dispenser overlay | 14 Sep | Restored from the game's copy by its hash; the tool writes nothing under Greg's folder without `--force` (577723a) |
| A status on Greg's note moved the Brig off the user's queue, two minutes after Norm handed it over | 14 Sep | Only the user's verdict or Norm can move a room that is with the user (b9dd06d) |
| Eight accepted rooms played on the public site with their north and south views black; local play and the review page could not show it | 14 Sep | One rule for the hung views, and `check-site.mjs` in the release (fd8c0b5) |
| The historian was not run for about six hours | 14 Sep | Two entries caught up at once, from the record |
| A review-page tag the user asked for three times was fixed in node each time and never appeared on their screen: ***the user had never once seen it work*** | 19 Sep | The tag was fixed only after the real page was loaded and its DOM read; the user's toggle gate, which is settled by pixels alone, came out of it |

The overnight stall is worth telling in full, because the ledger records only half of it. The ledger blames the queue order: the library metadata for later rooms sat behind the outdoor paintings. The transcript shows the other half. From 21:28 on 13 September to 05:33 the next morning, Norm's session was blocked on a question Norm had put to the sleeping user. The question was whether Greg could repaint the glimpse of Deck Nine, a room the user had already accepted. Meanwhile Greg's messages at 21:32, 21:38 and 21:59 queued up unread, and no commits were made between 21:25 and 05:39. The rule that followed covers both halves.

## A few corrections to how it is remembered

- The mailbox came late. For about two and a half days the agents talked through the markdown ledger, and before that through the user.
- "Two rooms in flight" was Norm's proposal. The ledger records it as the user's, because the user approved it.
- The contract still says "The user starts each pass". Since 12 September both agents have driven themselves: Norm through watchers, Greg through a five-minute heartbeat.
- The dashboard's regions were not invented for it. They are the 13 map regions that `layout.js` already computed on 9 September.
