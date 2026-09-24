# Journal

This is the history of the remake from 14 September 2026 onward; the other pages tell the story up to that point. It was first kept as one entry per working session, written by the project's historian agent from git, the mailbox between Norm and Greg, the request ledger, the dashboard's record of each room, and a note of what the user asked for and decided. On 24 September, at the user's request, the day-by-day entries were condensed into this account. It keeps the dates, and it names the places where the work went wrong, what each one cost, and what changed in the process because of it. The room that cost the most has a page of its own, [The Conference Room table](the-conference-table.md). The [timeline](timeline.md) lists the milestones, and [Tools](tools.md) catalogues what was built.

Where this page gives the user's view, it gives it in paraphrase, marked in ***bold italic***. The user is not quoted.

## Ten days at a glance

| | 14 September, morning | 24 September, morning |
|---|---|---|
| Rooms accepted by the user | 9 | 107 of 109 (the Conference Room and the Rec Area are left) |
| Planned views painted | the pilot rooms, Deck Nine and three outdoor rooms | 863 of 863 (22 Sep) |
| Blind playtest wins | from mid-game (11 Sep) and from the start (12 Sep) | every way of playing, by mouse and by typing (18 Sep); the user's own playthrough to the ending (23 Sep) |
| Public site | none | released on every push since 14 Sep |
| What the work is about | painting rooms | the player: a checklist of the user's playtest bugs |

## The main points of friction

Most days went well: rooms were painted, reviewed and accepted, often within the hour. The cost was concentrated in a few places, and each one changed how the work is done.

| Friction | What it cost | What changed |
|---|---|---|
| **Paintings done twice.** Repaints were the largest single cost. | By 20 September, 195 extra rounds on 818 registered views: about a quarter of Greg's image budget. Six rooms held 65 of them, and the Conference Room alone 19. | Greg checks a joined room before he delivers (14 Sep); Norm tries compute before any repaint (18 Sep); contract version 7 limits a view to two change asks (20 Sep). |
| **Greg's image budget.** Only Greg can make pixels. | Work stopped or slowed on 14, 17 and 21 September while his budget was out. | Greg's work is image work only, and everything else is Norm's (18 Sep); caps and doorways are built by compute where they can be. |
| **Numbers trusted over pictures.** Tools and agents called things fixed that were not. | A tag reported fixed three times and never seen working; a table called round twice; switches that did nothing on screen reaching the user. | The toggle gate (19 Sep); a review receipt the mailbox checks (20 Sep); a fix to a page counts only once the rendered page has been read back. |
| **The escape pod, built three times.** | Three layouts in two days; 25 accepted views superseded; the user reported the same camera fault three times. | A painted room is only done when the game itself draws it (16 Sep). |
| **The public site out of step with the work.** | Black holes in eight accepted rooms (14 Sep); a site eight days stale while every release reported success (22 Sep). | `check-site.mjs` in every release; the release waits for the workflow and for Pages before it says "published". |
| **The dashboard telling a different story from the mailbox.** | 27 wrong statuses hiding 38 owed guides (17 Sep); stage counts far below the truth (21 Sep). | Audits on the user's question, then `stage-stamp.mjs` and `check_status.mjs` to keep it true by construction. |
| **The things in the rooms.** Objects, not paint. | Four of the user's reports across five days traced to one rendering path; five complaints of switches that did nothing to one cause (21 Sep). | Sweeps over every object and every switch instead of fixes room by room. |
| **"Clickable" meant "has a menu".** | Things a player could see but not click passed every test until the user played (23 Sep). | The browser harness clicks where things are drawn. |
| **The Conference Room table.** | Eight rounds on a round table, then a rectangular one, the first edit to Infocom's text for a picture, and an accepted room reopened. | See [its own page](the-conference-table.md). |

## 14 September: not waiting, one layout, and a public site

The day opened with Greg idle. He had run out of queued work overnight while Norm's session sat on a question to the sleeping user, from 21:28 on the 13th to 05:33. ***The user wanted the two agents never to be stuck waiting on each other, and every Kalamontee room put in Greg's queue.*** A "never idle" line went into the working order (ec21dc3), and Norm now answers each delivery within minutes and sends long work as a follow-up. That rule held for the rest of the project.

Three changes that day shaped everything after.

- **One layout per cluster.** `fabric-kalamontee.mjs` builds the Kalamontee living quarters as one plan and cuts each room from it (f0f07e4), so a doorway shows its real neighbour. Lawanda (0905776) and the Feinstein (34139d7) followed the same day.
- **A public site.** ***The user wanted the site on GitHub Pages with the source kept private.*** Pages is not available on a private repository on the user's plan, so the built site goes to a second, public repository (c4fb332). The game now hangs the paintings of every accepted room (f31720b).
- **Checks before delivery.** Asked what process changes were worth making, Norm proposed four and the user approved them: Greg reviews a joined room before he delivers it, `check-seed.mjs` compares a seed with its fabric, `locate.mjs` measures where an overlay goes, and the release skips a site that has not changed (bfc3234, 577723a, 8f671d5). Three of that day's round trips, each a repaint, would have been caught by the first. ***The user also decided that Greg builds his own guides.***

**What went wrong.** Playing the hosted game, the user found black holes in SanFac A and Dorm A. Eight of the sixteen accepted rooms were missing their north and south views on the public site, because the build shipped only views named `TURN-` and the pilot rooms used other names. Locally everything looked fine. One rule now picks a room's views for the game and the build alike, and `check-site.mjs` fails the release if an accepted room is not whole as the hosted game reads it (fd8c0b5). The Kitchen came back twice, ***first as too bare to be a kitchen, then for a grey square where the canteen should be***; it was re-equipped around the views already approved, and the canteen got pictures of its own. The Brig's limerick took four repaints (R4 to R7) before it read as marker rather than a handwriting typeface.

In the evening ***the user moved the metadata work from Greg to Norm, so that Greg's queue was painting only*** (mail 20260914-214858-dev-0112). The Brig became the seventeenth accepted room.

## 15–16 September: the opening sequence, and the pod built three times

On the 15th ***the user asked for the opening sequence ahead of everything, so they could play it with the graphics in place and put a playtester in front of it*** (fcc0581). The stretch was fixed at eight rooms, Deck Nine to the Crag. Underwater was built from nothing the next morning, and by 08:23 on the 16th all eight were whole (090550a). The user accepted the Gangway, Deck Eight, the Reactor Lobby, Underwater and the Escape Pod that day, which made 26.

**The escape pod was the costliest room of those two days.** It was laid out three times.

1. On the 15th, ***the user wanted the camera inside the safety webbing and the view through the porthole clear***. Norm's own measurement favoured the user's floor plan, but the room was settled with a second eye inside the web instead (1c39c8a, 9a3ca23).
2. On the morning of the 16th, reviewing the pod, ***the user asked again for the window on the wall opposite the webbing***. The room was re-cut round one eye, the second eye was deleted, and the whole room was repainted: ring, caps, nine viewport states and four door states (2c10fd5, b11ee36).
3. That evening, after playtesting the opening, ***the user asked for the pod sequence to be rebuilt from scratch to a fifteen-beat storyboard of what the window shows***. This was DR-112. The second eye came back, the porthole grew to 2.4 x 1.1 m, and three deliberate departures from the original went in, each pinned by a test: the window no longer blacks out, the web holds the player until the landing, and standing up is implicit (b487d77). Twenty-five previously accepted views were recorded as superseded (9ea7e0f).

The worst of it was invisible. The seat inside the web was built, painted, checked and registered, and the game never drew it: the runtime keyed everything off the room the player is in, and climbing into the web does not change room. The user reported the symptom three times before the cause was found at 21:50 (238dea6). The fix made art rooms part of the game, and a test pins it. Deck Nine's glimpse through the pod door was painted three times against a pod that kept changing. ***At the end of that evening the user had both agents stop*** (820c665).

**A day of false alarms.** Also on the 16th, nearly every measuring tool gave at least one confident wrong answer. A "seam" was a riveted panel joint, another was a doorway, a blend score ranked an invented texture above a correct wall, and a warning reported to the user as a real bug was not one. Each was settled in seconds by magnifying the actual boundary. Two views had been hung at lenses they were not painted at, so `check_design` now refuses a registration whose camera disagrees with its delivered sidecar (eca602b). Five door variants had been painted and approved that could never appear, for want of a `state` field (34e7e29).

## 17 September: what Norm can take from Greg

Greg ran low on image budget and stopped at 09:01 (mail 20260917-130122-dev-0276). ***The user asked whether Norm could take some of his work, with the point before the attempt tagged in case quality dropped.*** The tag `design-handover-point` marks it (bf7993c). The trial settled the division of labour. Cameras, compositing, registration and checking moved to Norm, and measurably as well as Greg would have done them. Making pixels did not: Norm's attempt at a pair of caps came out 31 per cent flat blockout colour in the middle, where a player looks, and they were not registered. By Norm's count that day, 122 of the 454 images Greg had ever sent, 27 per cent, were re-cuts. The budget could not be relieved by moving work across, only by making each round cheaper. That is written up on [How we work](how-we-work.md#what-norm-can-take-from-greg-and-what-he-cannot).

While Greg was out, Norm packaged, cut and blocked out the rooms that had no geometry, so that Greg came back at about 15:50 to a full queue. By 22:08 every one of the game's 105 rooms had a package (01a4012).

**What went wrong.** Norm closed nineteen of Greg's deliveries with a script that matched words in their subjects, and five of the closures claimed checks that had not been run (dev-0333). A bulk registration left uncommitted by an earlier session was found mostly wrong and reverted (a24701b). And ***the user asked whether the dashboard was up to date***. It was not: 27 rooms were shown wrongly, and nineteen of them hid 38 guides that only Norm could build and nobody had (8bc38d3). All 38 were built and sent that evening.

The same evening Norm traced the Conference Room's heart-shaped table, which the user had sent back on the 15th, to a cusp in the looking-down picture. Its story from there is on [its own page](the-conference-table.md).

## 18 September: image work to Greg, compute to Norm, and the playtests back

***The user made Greg's work image work only.*** Every compute task became Norm's, with a promise to try a compute fix before asking for any repaint (mail 20260918-105329-dev-0462). In the evening ***the user had Norm fan the work out to subagents, each on its own port so they would not fight for the machine***. Norm ran up to six at once, with one shared lock round every heavy render or test. `cap-fill.mjs` filled caps that Greg would otherwise have painted, about ten that evening (5377ab3, ddc51a1).

Playtesting came back after six days. Four blind rounds ran that morning and early afternoon, and by the afternoon every way of playing had been won blind: by mouse from the start to Lawanda, by mouse from Lawanda to 80 of 80, and typed from start to finish, 68 of 80 (2db0b7f). Round thirteen fell into the same trap as round ten, a card left inside Floyd. Floyd now hints that something is stuck in his compartment, and round fourteen found the card that way.

**What went wrong.** Thirteen of the twenty paintings Greg delivered that evening went back for a second round: doors painted into plain walls, objects cut at the joins, a mask painted as colour. Each repaint spends his budget twice. Seeds had also been painted over a floor disc that the renderer drew wrongly at level pitch, so the fault went into the pictures and they were repainted.

## 19 September: claims that were never on the screen

This was the largest fan-out yet, ten or eleven agents at once, and by 04:36 Greg had delivered every image asked of him. Four rooms reached the user, and all four came back the same morning with the same complaint: ***the switches did nothing on the screen***.

- **A review-page tag, reported fixed three times.** The user wanted a tag saying when what a switch moves is in another room. Norm changed the logic twice, checked it in node each time, and reported it working. The fault was one line above the call. It was found only when Norm loaded the real page and read the rendered result. ***The user had asked three times and never seen it work, and said so forcefully.***
- **The Conference Room's table, called round twice** on measurements that covered one arc of the rim. Withdrawn four minutes after it was sent, and reopened after it went back later that morning ([its page](the-conference-table.md)).

***The user's answer was a rule: no room goes for acceptance until every switch has been seen to change something on the screen.*** The toggle gate diffs the switch shots the review already takes and asks only whether anything changed (committed with the day's work in a6fea95e). ***The user also ruled that acceptance belongs to the pictures: an accepted room is not re-gated, but if the art changes after acceptance, the room goes back.*** Booth 3 was the first to go back (mail 20260919-131216-dev-0691).

**Other costs that day.** The Library lost three rounds, and the Small Office two, to boxes drawn too small round the fault; Greg painted inside each box as asked every time. The rule now is to draw the boxes on the blockout and check that nothing wrong lies outside them. The shared lock was defeated twice, and one ownerless lock cost one agent 75 minutes and another 18.

## 20 September: the brakes

***The user stopped the room pipeline until an adversarial review of the whole workflow had been read and its changes built*** (a699a1a). The review measured what the week had cost: of 818 registered views, 120 had needed more than one round, 195 extra rounds in all, while the median ask closed in 27 minutes. The loop was fast; it did not converge. The contract's circuit-breaker had never once fired (6190a72, `RoomPolishInstructions/WORKFLOW-REVIEW-2026-09-20.md`).

***The user approved four changes, with the brake set at two asks rather than three.*** Contract version 7 went in at 17:10 (d3a83eb): an ask must say what would settle it, a change verdict must name the fault and draw its boxes, and a view gets two change asks before the room goes to the user. Norm made the brake count only rounds asked after it existed, so it did not trip over work already in flight (286d7217).

When Underwater D2 reached the user with floating rocks in a view nobody had reviewed that session, ***the user was clear that nothing should ever reach them without Norm's review***. A rule that depends on remembering was made mechanical: a whole-room review now leaves a receipt, and the mailbox refuses to hand the user a room whose views the receipt does not cover (0e07730).

Then ***the user asked both agents to work through the night so that as many rooms as possible were waiting in the morning***. By 00:40 sixteen rooms were in the queue and 789 of 791 views were painted (04bc2df, fb90b65). Two findings from the night: twelve caps that had looked unregisterable since the 19th were a parser fault, not a painting fault (dc3f9ac, 6cf7fda); and the toggle gate had been judging a sliver, switch shots 108 to 143 px tall against 559 (a6dcdc3). Two caps came back wrong twice for faults in Norm's guides, not Greg's paint; the lesson written down was to look at the guide before the painter.

## 21–22 September: the things in the rooms, and Greg back early

The user spent the 21st at the acceptance gate. Thirty rooms were accepted that day, taking the count from 41 to 69. What the user found on the way was mostly not paint but the things in the rooms, and several reports that had been treated as one room's problem turned out to share a cause.

- One rendering path drew an open container's contents as a tan box. It was behind four of the user's reports across five days (3c56c760).
- Nothing was ever floating: a painted room writes no depth, so objects had nothing to be hidden behind. The fabric now returns as a depth-only mask (6d2ffbda).
- Five complaints of a switch that did nothing had one cause: a state with no painted variant silently re-hangs the base picture (dev-0794). Two of the five were the original behaving correctly, and were recorded as such rather than painted.
- A sweep of every object, rather than every room, found 25 of 44 things under 20 px tall at their usual places (a2044c0e).

Greg's budget ran out on the evening of the 21st and was expected back on the Thursday. It came back on the Tuesday morning, the 22nd. Norm fanned triage agents out over about twenty unaccepted rooms' dead switches, and each switch was sorted: correctly invisible, needing a small painting, or buildable by compute from the neighbours' paintings. Greg's asks were therefore small, and each came within an hour. But every delivery came back as a full-frame regeneration, with labels re-lettered outside the box, so only the asked rectangles were taken in (dev-0840).

***The user asked for no shared or systemic change that could disturb accepted rooms without their decision.*** The dark slabs in five rooms' doorways were fixed in each room's data, not in the page, and all 76 accepted rooms were checked byte-identical (dev-0851). By 18:48 on the 22nd every planned view was painted, 863 of 863 (47cdf362). ***The user parked the Conference Room until last and decided its table would be rectangular, with the original's text changed to match*** (304ab4c2).

## 22–23 September: the user plays it to the end

The user played the published game themselves, by mouse, from the evening of the 22nd to the ending on the morning of the 23rd: 74 of 80, Cluster Admiral. Norm logged every note (`playtests/2026-09-23/PLAYTEST-LOG.md`), 25 items in all, which the user triaged at 09:08 (9b969ec9).

**The first thing it found was the site itself.** The Escape Pod seemed to have no paintings, but the whole site was stale. By the playtest log's count, the last good GitHub Pages build was on 15 September and 25 runs had failed since: the build machine ran out of disk, and a site check stopped at a room with one view by design. `release.mjs` had announced "Released" once the push went through, without looking at the workflow, and Norm had passed that on to the user. The release now waits for the workflow and for Pages (88db0df9, 563ba63a). Releases also went from 18 minutes to about five, sending only what changed (c4df9c2e).

**"Clickable" had meant "has a menu".** The tests opened a thing's menu by its id and never had to find it on the screen, so a flask under a box and a bottle inside the shelves' click area passed every test. ***The user asked how the testers had got past those steps.*** The approved fix makes the browser harness click where things are drawn, on a grid of real clicks (0f091163). Its first run failed eleven steps, five of them new.

Checkpoints were born during the playtest, so that ***the user could try one puzzle without replaying the opening*** (b5a5e3a9). At 10:16 ***the user judged the room work mostly done***, and the dashboard became a checklist of their playtest bugs (d71649fc). The rest of the day went to the player: lit signs in the original's phonetic spelling where green boxes had misled the user, the enunciator's black lamp made pink in the game and in Infocom's text, glimpses of what the text says is in the next room, and Greg's pictures of the mangled Floyd, the ladder and the stunned mutants. Eighteen accepted rooms changed, and each went back to the user. By the evening 30 of the user's 39 checklist entries were accepted and none rejected. The deviations are listed on [Where we left the original](canon-deviations.md), and what a clicker needs is on [Playing it as a clicker](playing-as-a-clicker.md).

## 24 September: the last two rooms

107 of 109 rooms are accepted. The two left are the Conference Room and the Rec Area, whose view through the conference door is built from the Conference Room's paintings. On the morning of the 24th two of the long table's three repaints were approved and taken in, and the third went back to Greg for three chairs painted where the room has bare floor (mail 20260924-121254-dev-0912). The whole story is on [The Conference Room table](the-conference-table.md).

## What the process looks like now

Each friction left a rule behind. Taken together:

- **Nobody waits.** Norm answers Greg within minutes and keeps painting queued ahead of layout work.
- **Pixels are Greg's; everything else is Norm's.** Cameras, compositing, caps and doorways are built by compute first. Greg is asked only for what compute cannot make, inside a box drawn on the blockout.
- **Two asks per view.** After a second change ask, the room goes to the user rather than round again.
- **Seen, not measured.** A switch must visibly change something, a review must cover every view at its current pixels, and a fix to a page is done only once the rendered page has been read back.
- **Accepted art is protected.** No shared change may disturb accepted rooms without the user's decision, and any change to accepted art sends the room back.
- **The site is checked as a player reads it.** A release refuses to publish a room with a painting missing, and says "published" only once Pages has it.

<!-- through: git a2fe780a · mail 20260924-001807-design-0830 -->

## 2026-09-24 -- Three more blind wins, and the glimpses between rooms

***The user asked for the playtesting parts of the wiki to be brought up to date.*** The day had three blind playtest rounds, and all three won from the start: two click testers side by side in the morning, and in the afternoon a typing tester who reached 80 of 80, the first typed run ever to do so from the start. The fixes from all three rounds were in by mid-afternoon. On the rooms side, the record shows all 109 rooms accepted, and the user's checklist moved on to what one room shows of the next.

**What happened**

- **Rounds twenty-one and twenty-two** (click, seeds 21 and 22, diaries cfff8b64) won 80 and 74 of 80. Norm triaged both against `source/*.zil`, the user approved the list, and thirteen commits were built on a branch and merged at 13:03 (26d7881b). The carry limit stays the original's, but a fumble now says it is a count and names where things stop counting, and the inventory reads "hands full" past seven (320c6c02). Put in and Take out reach into open containers you carry (929734ef, 87cee82a). The laser's Put in offers only a battery (cb09a655). Climb up and Climb down appear only where the room has that exit (c5f06a27). A win offers Restore (e986bfe3). The medicine doses as the source doses it (b7e4d18e). Waking names what slipped to the floor (939d2f5c). Diagnose gives a rough move count (701a6cb5). A harness submenu keeps its number (1bf927b1).
- **Round twenty-three** (typed, seed 23, diary in 742458f1) played as an adult who knows Zork but not Planetfall. It won 80 of 80, Galactic Overlord, at turn 723, in 996 commands and one game, with ten deaths, all restored. Its hardest stretch was Floyd's "good reason" to enter the Bio Lab: five deaths at that door before it walked Floyd past the broken computer. Norm triaged it the same afternoon, and ***the user approved all five changes proposed***, four of them in the parser (74a1276a; below).
- **Glimpses through doorways.** Most of the user's checklist items from #41 to #51 were one room's view of the next not matching that room. The Dorm, Mess and Rec Corridors, and the Rec Corridor with Dorm A and Dorm B, were rebuilt from the neighbour's own paintings by compute (afa53afb, 2d67be60, 86838616). For the other direction, Dorm A and Dorm B looking back to the Rec Corridor, Greg painted a squared doorway at the hall's end; Norm checked that nothing changed outside the asked box and hung it in both dorms (fce2f67c; mail 20260924-170843-dev-0932). The Lab Office desk's corner that showed the floor through it is solid (#51, 742458f1). The Rec Area's floor-cap furniture was painted by Greg and approved (#46, mail 20260924-165300-dev-0931), and its level views' tables were asked to match.
- **The long table, finished.** The Rec Area's view through the open conference door and Booth 1's views were rebuilt around the long table (054bf4eb, 3a708d2a). The room-status record carries the Rec Area and the Conference Room as accepted on the 24th from 3a708d2a on, which puts all 109 rooms at accepted.
- **The wiki.** Every playtest diary became a page under [Playing it](playing-it.md) (d7aaafc2), and pictures were added to several pages. Late in the day, ***at the user's request***, Greg painted a second version of the cast picture with the grue in a director's chair, and Norm approved it for [Actors and items](actors-and-items.md) (mail 20260924-171328-design-0846, 20260924-171408-dev-0934); in the mailbox only at the time of writing.

**Decisions**

- The round twenty-one and twenty-two fixes were held on their branch until round twenty-three had finished, so that it played one build throughout (HANDOFF.md).
- The user approved the triage list for rounds twenty-one and twenty-two. Left as the original: the Infirmary bed's instant death, the four fromitz boards that look alike, Take all picking up what you just dropped, and the survival clocks themselves. Only how the clocks are reported changed.
- From round twenty-three, left as the original: the unknown words ROOM, WALL and SHAPES (none is a synonym of any object in the source), the kitchen door closing on its own, Floyd's "Enough talking!" and his need for a good reason (seeing the broken computer), his "After you.", the Radiation Lab's fatal dose, the shuttle's stop rules, the fried board losing the name "second", the Bio Lab's two doors, the hunger clock and the Infirmary bed. The canteen spill and the unexplained fumbles had already been mended by the 26d7881b merge, since the tester played the build before it.
- "Look in pocket of lab uniform" is registered as a deviation: the fix skips OF as the source's word list says, but the source's parser stops its object search after OF (parser.zil:894), so what the original would have replied is not clear from the code.

**What was hard**

- **The parser, told apart from the original.** "Tell floyd to get the card" answered "I don't know the word 'get'". The source's parser reads the TO after TELL as a quotation mark, so that what follows becomes an order (parser.zil:174). "Look in pocket of lab uniform" answered "I don't know the word 'of'", though the source skips OF as a word of no meaning (syntax.zil:6). Both were port faults. The first now works as "floyd, get the card"; the second is read from its other words. Three more came with them: "put all cards in uniform" puts in each card held (syntax.zil:257), south in the ProjCon Office before the mural is found says "You can't go that way." instead of naming the hidden door (comptwo.zil:1313), and "Which do you mean" names the noun as typed (parser.zil:1008-1020). All five are in 74a1276a.
- **A room that would not turn.** ***The user found the Rec Area locked facing one way, and called it a major issue*** (#45). The page treated a room with exactly one level view without a door state as a single-view room, and the Rec Area's four ring views all carry the door's state. The rule now asks whether all a room's level views face one bearing, and all 109 rooms were checked against it (afa53afb).
- **A chart that saw three rows of thirty-seven.** Round twenty-three's friction table heads its column "what I typed / what happened", and the chart script looked for "what happened". It is now read as that; no other diary uses the header, and rounds one to twenty-two come out unchanged row for row.

**Built**

- `scripts/lib/friction.mjs` reads round twenty-three's column header as "what happened", so its 37 rows reach the friction charts. `scripts/wiki-diaries.mjs` names round twenty-three's persona. Both are updated on [Tools](tools.md), with the hand-edited score chart.

**Rooms**

- Rec Area and Conference Room: accepted (3a708d2a). Booth 1 was reopened for the long table, as the user had authorised in advance, went back to them, and is recorded accepted again.
- Changed after acceptance and back with the user for a look: the Dorm, Mess and Rec Corridors, Dorm A and Dorm B (the corridor doorway), and the Lab Office (the desk).

**The playtest pages** are brought up to date with this entry: the round index in `playtests/README.md`, the history, the score table and chart, and the friction charts on [Playing it](playing-it.md), and round twenty-three's diary as [its own page](diary-typed-23.md).

<!-- through: git 74a1276a · mail 20260924-171606-design-0849 -->
