# Journal

This is the running history of the remake from 14 September 2026 onward. The other pages tell the story up to that point. From here, the project's historian agent adds one dated entry after each working session or milestone. It works from git, the mailbox between Norm and Greg, the request ledger, the dashboard's record of each room, and a short note of what the user asked for and decided. Entries are never rewritten; a later entry corrects an earlier one. The newest entry is always last. Each entry ends with a marker line recording the last commit and mail message it covers, so the next entry knows where to start.

## 2026-09-14 -- Where things stand after six days

This first entry sums up the state of the project on the morning of 14 September, and the short session that ran from about 05:30 to 08:00. The game plays end to end by typing or by mouse. Blind testers won it from a cold start two days ago, and playtesting is paused. The art pipeline is proven: nine rooms are painted and accepted, and three more outdoor rooms are painted with their rising seas. This session was about not letting the two agents wait on each other, about finishing the process tools approved the evening before, and about making each cluster of rooms one layout so every doorway shows its real neighbour.

**The project at a glance**

| Measure | State |
|---|---|
| Commits | 279, through da4378d |
| Port | 105/105 rooms, every routine and timed event; the verb and vocabulary gaps closed |
| Playtesting | Eleven rounds, numbered one to twelve; wins from mid-game (11 Sep) and from the start (12 Sep); round thirteen not planned |
| Rooms accepted by the user | 9: Dorm A to D, SanFac A to D, Deck Nine |
| Mailbox | 99 messages (59 from Greg, 40 from Norm) |
| Design requests not closed | 25 (19 open, 4 reopened, 2 ready for review); chief among them DR-106 (the library's metadata), DR-109 (the opening sequence and outdoor rooms), the character and item concepts DR-095 and DR-097 to DR-099, and DR-104 (the ambassador's cutout) |

**What happened**

- **Greg was not waiting any more.** Greg had run out of queued work overnight. The user asked at 05:34: "why is greg not moving onto the other rooms, mess corridor, lawanda rooms?" A "never idle" line went into the working order (ec21dc3). Then seven of Greg's corridor-group metadata deliveries sat for about 20 minutes while Norm built a shared layout before answering. The user wrote: "ok make sure that doesnt happen again - its important we dont get stuck waiting for each other." Norm now replies to each delivery first and sends long work as a follow-up. At 06:15 the user added: "make sure ALL kalamontee rooms are in gregs queue". All 36 are listed.
- **The process tools landed** (06:08). These were the five improvements the user approved the evening before, built by parallel workflow tracks with their own reviewers:
  - A (7654323): `underpaint state` and `seam`, the join profile, and guards against missing views and overwrites.
  - B (604c0b9): one shared review server on port 5099, the state-drift checks, and switch sheets.
  - C (c4022cc): the dashboard's mailbox panel.
- **"Changes" now means "back to Norm"** (c85ec12). The user wrote: "when i say "changes needed" on a room, it should no longer be in my queue". The gate now writes the hand-back to disk.
- **One layout for the living quarters** (f0f07e4). `fabric-kalamontee.mjs` builds the Kalamontee living quarters as a single plan and cuts each room from it. The Mess Corridor, Mess Hall, Kitchen and Dorm Corridor got fabric, view plans and seed renders.
- **The Courtyard.** Its side views for days 6 to 8 did not continue the south view's sea. They were repainted from new state guides and approved at 06:59, and the Courtyard was reviewed whole.
- **The padlock.** The Mess Corridor's padlock lay by the drop fan instead of on its hasp: no object position authored in any package had ever reached the build. Authored positions now hold until the player first handles the object (0a3b8b6).
- **The Feinstein rechecked.** The user asked to remove any Feinstein room that could not be reached and to queue any that could. All can be reached, in the canon and in the port. The Gangway, Deck Eight and the Brig were queued as new packages, with the Reactor Lobby (cbed6ac).
- **This history.** The user asked for a wiki of the journey and a historian to keep it. The wiki's viewer, its renderer and test, and the historian agent were committed at 07:51 (da4378d); the pages themselves were not yet in git as of this entry.

**Decisions**

- The user: agents must not wait on each other; every Kalamontee room goes in Greg's queue; a "changes needed" verdict hands the room back to Norm; rooms that cannot be reached would be removed and rooms that can would be queued, and all turned out to be reachable; the history is published with the game and kept up by a historian.
- Norm: the Crag's "day 1 / day 2" switches are canon, not a fault, because the Crag's text never changes with the day and the Balcony's way down leads there only on day 1 (compone.zil, WATER-LEVEL-F); the review page now says why such a switch cannot change a room. The time-of-day menu doing nothing is a real fault, and outdoor rooms go back to the user only once it is fixed.

**What was hard**

- **The overnight stall.** From 21:28 on 13 September to 05:33 this morning, Norm's session waited on a question to the sleeping user while Greg's messages queued unread. The ledger records only the queue-order half of the cause. See [How we work](how-we-work.md).
- **Time of day on paintings.** The user sent the Balcony and the Crag back: the time-of-day menu did nothing. Paintings are hung unlit, so no scene light reaches them. The fix, a per-phase grade inside each painting's material with a sky matte, and a lighting panel with sliders on the review page, was in progress and not yet committed at 08:00.
- **Seas that do not continue.** The Courtyard's side seas broke at the joins until state guides carried the south view's water into them.

**Built**

- `scripts/lib/seam.mjs`, `scripts/lib/state.mjs`, `scripts/check-states.mjs`, `scripts/lib/shots.mjs`, and `scripts/review-server.mjs` with its library.
- The dashboard's mailbox panel (`wwwroot/dashboard/mail.js`) and the gate's hand-back to Norm.
- `scripts/fabric-kalamontee.mjs`.
- The wiki (`wwwroot/wiki.html`, `wwwroot/wiki/wiki.js`, `scripts/tests/wiki.mjs`) and the historian agent.
- In progress, uncommitted: `wwwroot/scene/grade.js` and `skymatte.js`, the review page's lighting panel, `scripts/fabric-lawanda.mjs`, which builds the Systems Corridors, the Infirmary and Lawanda Platform as one layout, and the padlock's three cutouts from Greg (delivered at 07:57) being registered as a cutout with open and fused variants.

All of these are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Dorm D | Accepted by the user after its south glimpse was repainted |
| Crag | Back from the user with "changes" (the day switches, and time of day) |
| Balcony | Back from the user since 13 September: time of day does nothing |
| Winding Stair | Painted, all five sea states; held for the time-of-day grade |
| Courtyard | Reviewed whole with its day 6 to 8 seas; to the user once the grade lands |
| Mess Corridor | Reviewed whole; waits on the padlock cutouts |
| Kitchen | Seeds approved; side views 080 and 260 being painted from guides |
| Mess Hall, Dorm Corridor | Fabric from the shared layout; seeds with Greg |
| Gangway, Deck Eight, Brig | Confirmed reachable and queued as new packages |

<!-- through: git da4378d · mail 20260914-115733-design-0059 -->

## 2026-09-14 -- Time of day reaches the paintings

This entry covers 08:00 to 09:03 on 14 September. Two things changed for a player. Dusk and night now darken and tint the painted rooms, where before they changed only the lights behind the paintings. And the Mess Corridor's padlock is the first thing in the game drawn as a picture of itself rather than as a box. Meanwhile three Kalamontee rooms moved on through their views, and the dashboard recorded the user's acceptance of the Balcony and the Crag.

**The project at a glance**

| Measure | State |
|---|---|
| Commits | 285, through 7536a38 |
| Rooms accepted by the user | 11: the nine of the first entry, plus the Balcony and the Crag |
| Rooms with the user for their look | The Winding Stair, the Courtyard and the Mess Corridor |
| Mailbox (committed) | 110 messages (64 from Greg, 46 from Norm) |

**What happened**

- **The padlock hangs as itself** (85624f8, 08:08). Norm approved Greg's three cutouts and put them in the game: closed, open (when the lock has OPENBIT) and fused (MUNGEDBIT). `characters.json` entries can now draw for any object, not only actors. Hung in the room, the lock sat about 0.1 m off the painted hasp, so Greg moved its anchor onto the hasp (mail `20260914-120940-design-0061`). At 08:20 Norm wrote that the Mess Corridor was complete and sent it to the user.
- **Time of day changes the painted views** (d1f27aa, 08:51). The commit quotes the user: "none of the time of day ddls work where i would expect them to". A grade worked out from each sky room's own day-phase look now runs inside the painting, cutout and decal materials. Daylight is left exactly as painted ("0 pixels different in five rooms"), and interiors get no grade. A sky matte keeps the dusk pull off bright stone and spray. The review page moved its time-of-day control into a Light panel with live sliders, reset and "copy as JSON". A switch that a painted room cannot show now says why.
- **The Kitchen, reviewed whole.** Norm approved the two side views at 08:14 and the caps at 08:57: six views, with seams of 1.0 to 2.4. Greg was asked for the two open-door states next.
- **Mess Hall and Dorm Corridor seeds approved** (08:55). Greg delivered both rooms' seeds at 08:32 and 08:49, and Norm sent the guides for their side views.
- **Back to the user** (d4df8a9, 08:59). With the grade in, the four outdoor rooms went back to the user. By that commit the dashboard showed the Balcony and the Crag accepted, and the Winding Stair, the Courtyard and the Mess Corridor waiting for the user's look.
- **Small rules.** The wiki now hides the historian's bookmark comment from readers (1a4d43e). The historian's instructions now say that no pronouns are stated for the user, Norm or Greg (c78574f). `check_design.mjs` no longer asks for a Floyd spot aboard the Feinstein, since Floyd is never there (7536a38).

**Decisions**

- Norm: the Crag's day switches stay, with an explanation on the review page instead of new paintings. The room is painted as day 1 and its text never changes with the day (d1f27aa).
- Norm: the Mess Hall's card slot was painted 0.45 m higher and 0.28 m further east than its anchor. The anchor moves to the painting, because "a card slot at shoulder height beside a door is natural" (mail `20260914-125505-dev-0044`).
- Norm: the Dorm Corridor's doorway heads paint about 8 px, some 0.06 m, above the fabric. They were approved as they are. That is within the 12 px already accepted on the Mess Corridor's door header, and it cannot spread, because no side view's guide carries those doorways (mail `20260914-125525-dev-0045`).

**What was hard**

- **A black slab where a door was painted.** The review page drew the fabric's shut Kitchen door over Greg's painted door. It counted a part as painted only when a state variant covered it, not when it matched the base views' own state. Norm found the fault was on the dev side, and fixed it in d1f27aa.
- **Pickables that miss the paint.** As with the Kitchen's button and spout earlier in the morning, the Mess Hall's slot was painted somewhere other than where its anchor stood. The fix, again, was to move the anchor to the painting.

**Built**

- `wwwroot/scene/grade.js` and `wwwroot/scene/skymatte.js`, the grade in `scene/lighting.js`, and the review page's Light panel (d1f27aa).
- `characters.json` entries for things as well as actors, and a height for cutouts hung above the floor (85624f8, d1f27aa).
- The wiki's bookmark comment hidden (1a4d43e), and the Feinstein rooms excused a Floyd spot in `check_design.mjs` (7536a38).

All of these are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Balcony, Crag | Accepted by the user |
| Winding Stair, Courtyard | With the user, time of day now grading them |
| Mess Corridor | Complete, with the padlock on its hasp; with the user |
| Kitchen | Reviewed whole; open-door states with Greg |
| Mess Hall, Dorm Corridor | Seeds approved; side views with Greg |

<!-- through: git 7536a38 · mail 20260914-125707-dev-0046 -->

## 2026-09-14 -- Four rooms accepted, and a kitchen that looks like one

This entry covers 09:03 to about 11:17 on 14 September. For a player, the first stretch of the Kalamontee living quarters is now finished art. The user accepted the Mess Corridor and the Dorm Corridor, and outside, the Winding Stair and the Courtyard. That makes fifteen accepted rooms. The Mess Hall went to the user for its look. The Kitchen came back from the user as too bare. It was re-equipped with a sink, a range with two ovens under a hood, and two refrigerators, and nothing already approved was disturbed. Behind that, Norm laid out the next clusters: the Lawanda group as one layout, and the West Wing cut from the Courtyard. The pages of this wiki went into git.

**The project at a glance**

| Measure | State |
|---|---|
| Commits | 288, through 13597c0; more work sits in the working tree, not yet committed |
| Rooms accepted by the user | 15: the eleven of the last entry, plus the Winding Stair, the Courtyard, the Mess Corridor and the Dorm Corridor |
| Rooms with the user for their look | The Mess Hall |
| Mailbox | 145 messages (80 from Greg, 65 from Norm); the 35 since the last entry are not yet committed |

**What happened**

- **The Kitchen and the Mess Hall finished their painting** (09:10 to 10:23). The Kitchen's first open-door state is Greg's edit, restored through the doorway. The second also opens the Storage West door, 30 m off across the Mess Corridor. There, Greg's raw had "the whole portal painted as a storeroom" (mail `20260914-131054-dev-0048`). Norm built that state from art already approved instead: the Mess Corridor's own open doorway, scaled into the far door's 24 x 44 px and colour-matched. The Mess Hall's far Storage West door was made the same way (41 x 76 px). Its Kitchen-door state was painted as an edit and restored at 10:15. Greg registered the Kitchen complete at 09:27 and the Mess Hall at 10:23, and both went to the user.
- **The Dorm Corridor's sides and caps, in half an hour.** Its sides arrived at 09:36 and were approved at 09:49, with seams of 0.8 to 1.2, and its caps at 10:05. It has no painted states, and went to the user at 10:05 (mail `20260914-140548-dev-0053`).
- **The user's verdicts.** By 11:17 the dashboard recorded the Winding Stair, the Courtyard, the Mess Corridor and the Dorm Corridor as accepted. The Mess Corridor's acceptance came with a question: "the conference door open toggle doesnt seem to do anything, am i missing something?" The Kitchen came back with "changes".
- **The Kitchen equipped** (10:28 to 11:06). The user wrote: "ok this is a minimalist kitchen to say the least ... there should be SOME appliances in the room, a sink, a refrigerator, a couple ovens, a stovetop ... dont forget the hood over the stove". The game calls the room only "the food production and dispensary area for the dining hall" (compone.zil). So Norm treated the change as dressing, not a change to the canon, with no new things to click (mail `20260914-142816-dev-0055`). Norm re-equipped the fabric around what was already approved:
  - the sink counter, in the middle of the south wall at the height the Mess Hall and the accepted Mess Corridor see through the open door; that glimpse changes by 2 px;
  - the range east of it: two ovens, six burners and a hood ducted to the ceiling;
  - two upright refrigerators on the east wall;
  - a steel prep table with pot shelves on the west wall.
- **The Kitchen repainted.** The door view (350) and its two states are unchanged to the pixel. Greg repainted the south view (170) by 10:38, and Norm approved it a minute later. The two sides followed and were approved at 11:06. The caps are with Greg. The bare versions are kept in `reference/superseded/`.
- **The Lawanda group as one layout** (0905776, 11:07). `fabric-lawanda.mjs` places Lawanda Platform, the three Systems Corridors and the Infirmary in one frame, with their neighbours as far as each eye can see. An adversarial verifier's fixes went in before the commit; among them, the Infirmary's medicine bottle moved to where it can be clicked. Five verdicts went to Greg in the same minute. Systems Corridor and Systems Corridor East were approved, and the other three came back with metadata changes. The canon settled Greg's open questions:
  - The platform holds only the foot of a long escalator, which climbs at 30 degrees into its own shaft ("A wide escalator, not currently operating, beckons upward", comptwo.zil).
  - The shuttle berths are 6.0 x 4.2 m openings, each wholly inside one view.
  - Systems Corridor West's stair down to the Repair Room is one storey: 22 risers, 4.0 m.
- **The West Wing cut from the Courtyard** (89e0dab, 11:14). The accepted Courtyard painting already shows the West Wing through its west breach. So the West Wing's fabric is the Courtyard's own ground, seen from the West Wing's eye. One thing changed: the barrier is waist-high, 1.0 m rather than 2 m. The game says the walls are "mostly rubble, allowing a view of the cliff and ocean below" (compone.zil), and a 2 m wall would hide both from the eye.
- **Greg's queue kept moving.** Greg delivered metadata for the four Feinstein rooms (ready for review at 09:27), then Storage West (09:46), the Plain Hall (10:26) and the West Wing (11:08). Norm answered each within minutes, even when the verdict itself had to wait for a layout pass, and kept Greg's painting ahead of it: "Painting comes first" (mail `20260914-150841-dev-0064`).
- **The wiki's pages** (13597c0, 11:16). There are ten pages, researched by six agents from git, the ledger, the mailbox and the transcripts, and composed by a writer. Two fact-checkers then found 70 problems, among them wrong dates and counts, stale state, and pronouns for the agents. All were verified and fixed.

**Decisions**

- The user: the Kitchen must read as a kitchen, with appliances and a hood over the stove. Four rooms accepted.
- The user asked whether Norm could push to a GitHub repository and build a release pipeline. Norm said yes and asked three questions: the repository's URL, whether it is public or private, and whether to host the game alone as static files or the full server. There is no answer yet.
- Norm, after the user's "make sure that doesnt happen again" (see the first entry): answer Greg within minutes, keep painting queued ahead of layout, and fan layout work out to parallel workflows. The Feinstein layout ran in parallel with the second Kalamontee pass (mail `20260914-143421-dev-0056`).
- Norm: a room's scene carries only the doors its eye can see. The review page offers a switch for every door in a scene. The Conference door is in the Rec Area, out of the Mess Corridor's sight, so its switch there changed nothing. That door is now drawn only in the scenes whose eyes can see it (uncommitted, `fabric-kalamontee.mjs`).
- Norm: a far door that its own room already paints up close is built from that approved art, not painted again (mail `20260914-131054-dev-0048`).
- Norm: the West Wing takes the Courtyard's frame and its sea levels. Only the West Wing's copy of the barrier is lowered, not the Courtyard's.
- Norm: the rest of the Feinstein is one layout against Deck Nine's accepted fabric. The Brig is reached only when Blather drags the player there, and nothing sees it, so it is placed alone: "That position is not a claim about the map" (`fabric-feinstein.mjs`, uncommitted).

**What was hard**

- **The usage limit.** The background agents hit the session usage limit at about 08:50 and resumed after 10:30. Layout reviews waited. At 09:49 Norm told Greg the next layout batch would come "at about 10:40 EDT, once the checks that batch waits on can run" (mail `20260914-134928-dev-0051`). Painting reviews went on meanwhile. The Lawanda layout landed at 11:07. The second Kalamontee pass and the Feinstein layout were still in progress at 11:17.
- **Re-equipping an approved room.** New appliances put at risk the Kitchen's approved views and the glimpse of it from two other rooms, one of them accepted. The fix was placement. Nothing crosses a seam line, nothing new lies inside the door view, and the sink counter stands where the glimpses already show a counter.
- **A far door too small to paint.** Asked to open a door 30 m off, the generator painted a whole storeroom into the portal. The state was built from approved art instead.
- **Still open: a bright band in the Kitchen.** With the caps set aside, the left edge of the 350 view shows as a brighter band on the west wall, looking north-west. Norm expects it to go once the new caps are hung. If it does not, that band of the 260 view is repainted.

**Corrections**

- The first entry of the day gave a reason for keeping the Crag's day switches: that the Balcony's way down leads to the Crag only on day 1. That was wrong. A swimmer can come up from Underwater to the Crag on any day (compone.zil, UNDERWATER: `UP TO CRAG`). The decision stands for the other reason given: the Crag's own text never changes with the day, so it is painted once.
- The same entry said the user asked to remove the Feinstein rooms that could not be reached. In the user's words the question was "do we really need those?" Norm checked the canon and played it. The Gangway, Deck Eight and the Reactor Lobby can be reached before the explosions shut the bulkheads, and Blather drags a player who keeps leaving their post to the Brig. The user chose "Paint all four (recommended)".

**Built**

- `scripts/fabric-lawanda.mjs` (0905776) and `scripts/fabric-westwing.mjs` (89e0dab).
- `scripts/fabric-kalamontee.mjs`, extended and uncommitted: the equipped Kitchen, and only the doors each eye can see. Its second pass reaches west to the Plain Hall, the Conference Room, Booth 1 and Dorms A and B, and east down the Long Hall to the Corridor Junction and the Elevator Lobby. A `--also` flag adds rooms for check renders. Scenes for the Rec Corridor, the Rec Area and the Corridor Junction are written.
- `scripts/fabric-feinstein.mjs`, uncommitted: the Gangway, Deck Eight, the Reactor Lobby and the Brig, laid out against Deck Nine's accepted fabric, which it reads but does not regenerate.
- The wiki's ten pages (13597c0).

All of these are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Winding Stair, Courtyard | Accepted by the user |
| Mess Corridor | Accepted by the user; its dead Conference-door switch taken out |
| Dorm Corridor | Complete at 10:05; accepted by the user |
| Mess Hall | Complete at 10:23 (six views, two door states); with the user |
| Kitchen | Complete at 09:27, then back from the user with "changes"; re-equipped; new south view and sides approved; caps with Greg |
| Lawanda Platform, Systems Corridor West, Infirmary | Fabric and seed renders done; metadata changes with Greg, then seeds |
| Systems Corridor, Systems Corridor East | Metadata approved; seeds with Greg |
| West Wing | Fabric cut from the Courtyard; metadata changes with Greg, then seeds |
| Storage West, Plain Hall, Rec Corridor, Rec Area, Corridor Junction | Metadata with Norm, in the second Kalamontee layout pass |
| Gangway, Deck Eight, Brig, Reactor Lobby | Metadata ready for review since 09:27; Norm's layout in progress (the dashboard still shows them queued with Greg) |

<!-- through: git 13597c0 · mail 20260914-151416-dev-0065 -->

## 2026-09-14 -- A public site, and the paintings reach the game

This entry covers about 11:17 to 12:55 on 14 September. The biggest change is outside the rooms: the game now has a public home. The user answered the question the last entry left open, and every push to the main branch is now tested, built as a static site and published on GitHub Pages. For that site to show anything painted, the game itself had to hang the paintings. Until now they showed only on the review page, so a player saw grey rooms. Now the game hangs them for every room the user has accepted, fifteen so far. Inside the rooms, the user sent two rooms back. The Mess Hall was "a little too tidy for an abandoned base". In the Kitchen, the canteen showed as a grey square. The Mess Hall was re-furnished and has new seeds, and the canteen now has pictures of its own. The Kalamontee and Feinstein layouts went into git, and this wiki gained a chart of how far each playtester got.

**The project at a glance**

| Measure | State |
|---|---|
| Commits | 300, through 568caa5 |
| Rooms accepted by the user | 15, as in the last entry; the game now hangs all fifteen |
| Rooms with the user for their look | None: the Kitchen and the Mess Hall both came back with "changes" |
| Mailbox | 171 messages (85 from Greg, 86 from Norm), all committed |
| The public site | Published by the release workflow on every push to main; first release passed at 12:47 |

**What happened**

- **A repository, then a pipeline.** The user asked: "if i provide a github repository for you to push to (remote) and begin building a build-release pipeline for our website, is that something we can do". Given the choice, the user picked "private repo creation and remote push to repo". Norm created the private repository and pushed the history, about 1.2 GB. Then came the user's "go ahead and use github pages for the hosting, for now". But Pages is not available on a private repository on the user's plan; GitHub's API refused with a 422. Norm offered a choice, and the user picked "Separate public site repo (recommended)". The source stays private, and the built site goes to a second, public repository, which Pages serves.
- **The release workflow** (c4fb332, 12:45). `.github/workflows/release.yml` runs on Linux on every push to main. It runs every test suite and the layout and scene checks, builds the .NET host, builds the site with `scripts/build-site.mjs`, and publishes it. Nothing is published unless every check passes. The first release, on b0507c1, passed in 2 minutes 19 seconds. At 12:48 the workflow moved to the v5 actions, which run on Node 24 (293bd02), and that release passed too.
- **What the public build leaves out.** The game reads room metadata and package files through routes the ASP.NET host serves. A static host has no routes, so `build-site.mjs` writes them out as plain files. It copies only what the game hangs: each room's registered views, their state variants and the decals' pictures. Drafts, references, receipts, the mailbox and the ledger are never copied. The dashboard and the review page are left out, because they need the server and one of them writes the user's verdicts. So is `room-status.json`, which holds the user's review notes. In their place the build writes `data/painted-rooms.json`, just the list of accepted rooms.
- **The game hangs the paintings** (f31720b, 12:45). An accepted room's painted views now hang in the game itself, chosen exactly as the review page chooses them. The code that picks the views for the current state, `partsForTurn`, moved into `dashboard/turn.js`, where the review page and the game both use it. Rooms not yet accepted stay grey in the game; as the code's comment puts it, "before that they are work in progress, seen on the review page". The public site reads its list from `painted-rooms.json`. Run from the dev server, the game reads the accepted rooms off `room-status.json`.
- **The Mess Hall re-furnished** (11:28 to 12:12). The user sent it back: "i dont like the picnic style benches here. i would rather there be metal utilitarian tables and chairs scattered throughout the room. its a little too tidy for an abandoned base". The game calls it "a large hall lined with tables and benches", and the canteen "is sitting on one of the benches". So Norm asked, and the user chose "Mostly chairs, a few benches". By 11:52 the fabric had thirteen metal tables, each turned a little, and thirty chairs pushed out by different amounts, two of them on their sides. Four benches were kept, among them the canteen's (mail `20260914-155238-dev-0069`). Every view sees the floor, so it is a full repaint. Greg's two new seeds arrived at 12:02 and were approved at 12:12: "The tubular chairs and the fallen chair and bench read as abandoned" (mail `20260914-161223-dev-0077`).
- **The Kitchen to the user, and back** (11:42 to 12:50). Norm approved the equipped Kitchen's caps at 11:42, and the Kitchen went to the user. It came back on its overlays: "the toggle 'canteen in dispenser' just has a grey square next to the dispenser unit". The engine had nowhere to put the canteen and no picture of it. A room's metadata can now say where a container shows what is inside it (`contentsAt`, b04ccf6, 12:03). Greg painted the canteen three ways: closed, open, and open with the brown "Hii Prooteen Likwid" at its neck. The cutouts arrived at 12:26 and went into the game at 12:47 (e3f9cd4). The same pictures serve the Mess Hall bench where the canteen first sits. A shot on the review page showed the canteen floating 0.09 m above the niche's floor, so Norm asked Greg for new heights. Norm also sent Greg a rectified guide for the dispenser's damage overlay: the dispenser's face flattened to a 480 x 1020 px plate (mail `20260914-164652-dev-0083`).
- **The Kalamontee layout's second pass** (0ccf924, 11:53). The pass placed the Plain Hall. It also gave the Rec Corridor, the Rec Area and the Corridor Junction scenes, view plans and seed renders. An adversarial verifier's seven findings were fixed first. Four verdicts went to Greg in the same minute: the Rec Corridor and the Corridor Junction were approved, and the Rec Area and the Plain Hall came back with changes. Storage West followed at 12:00, approved, with its own scene.
- **The rest of the Feinstein** (34139d7, 12:26). `fabric-feinstein.mjs` places the Gangway, Deck Eight, the Reactor Lobby and the Brig in Deck Nine's frame. It reads Deck Nine's accepted scene and never writes it. Four verdicts, each with changes, went to Greg at 12:26, with fabric and seed renders. Greg paints them after the Mess Hall and Storage West (mail `20260914-162605-dev-0082`).
- **Greg's queue.** Lawanda Platform's seeds were approved at 11:44, and Systems Corridor West's at 11:55. Both are now being painted as side views from guides.
- **How far each tester got** (1aebaa9, 12:55). The user asked: "for the wiki, i think i would like a graphical representation of how far each playtester got in the game (i think "points" is a good proxy for this) -- include a representation of the final testing where we had testing from start to finish, if the player died, they still retain memory about what to avoid the next time". A background agent read every score from the session transcripts and checked each one against the tester's diary. The result is a chart and a table in [Playing it](playing-it.md): every tester's best score by round, and round twelve's two runs from the start, life by life. The same commit fixed this wiki's side contents, which had listed every page twice.

**Decisions**

- The user: a private source repository, and the site hosted on GitHub Pages "for now", published through a separate public repository. The Mess Hall: mostly chairs and a few benches, not bench lines.
- Norm: the game hangs a room's paintings only once the user has accepted it. The review page stays the place for work in progress.
- Norm: the public repository carries one commit, "Publish the site", replaced on each release. The workflow's comment gives the reasons: the site repository never holds "a history of 280 MB builds", and it carries "no commit message from this private repository".
- Norm: the Mess Hall's new furniture keeps the canon. A few benches stay, because the game says "tables and benches" and puts the canteen on a bench.
- Norm: where a new layout shows through an accepted room's doorway, the accepted painting changes only inside that doorway, as a through-edit. The Mess Corridor's 180 portal and its Kitchen-door state wait for the new Mess Hall to be approved, as do the Kitchen's two open-door states. The Courtyard's north opening shows the Plain Hall, which now has its true shape, and it gets one through-edit of about 150 x 200 px after the Plain Hall's seeds. The user has been told the Courtyard edit is coming (mail `20260914-155324-dev-0073`).
- Norm: the Rec Area's south mouth moves 1.7 m west. That keeps the Conference door out of sight from the Plain Hall and from the accepted Courtyard, so neither needs that door's two painted states. It also keeps daylight out of the Rec Area's south view (mail `20260914-155324-dev-0071`).
- Norm: an overlay on a hinged door does not follow the leaf unless it is authored for each state. So the Rec Area's dial is an overlay only while the door is shut; open, the painting shows it as the few pixels it is.
- Norm: Storage West's paintings show its door open. A player can be in there only by opening it, so the shut door is the variant (mail `20260914-160052-dev-0075`).
- Norm: the Gangway is Deck Nine's painted stair carried on up. Deck Nine's accepted view already paints the foot of the flight, rising steeply just behind the door, so Greg's proposed stair and lower landing could not be built. Deck Eight sits 3.24 m above Deck Nine, and the Gangway's eye stands on the flight. The Reactor Lobby lost its two gate states: the bulkhead is round two bends of corridor and never in sight (mail `20260914-162605-dev-0080`).

**What was hard**

- **Pages on a private repository.** GitHub refused it on the user's plan. The fix was the second, public repository, which carries only the built site.
- **The site builds only from committed files.** Checking the site, Norm found the accepted Dorm Corridor unpainted. Its two sides and two caps had been registered in the working tree but never committed, so a clean build had no paintings for it. They were committed at 12:47 (bd9a029). The lesson: whatever the user accepts must be in git before the site can show it.
- **The Kitchen's bright band, solved.** The band the last entry left open was a hard step of about 20 levels on the west wall, looking north-west. It sat in the 260 view, where the pixels kept from the 350 view begin. Norm levelled it in place, ramping Greg's paint up over 220 px to meet the kept side. The caps' rims carried the same step, so they were restored against guides rebuilt from the levelled view. Greg's originals are kept as `_UNLEVELLED` files (mail `20260914-154259-dev-0067`).
- **Centre, not foot.** An object's position is its centre. The Mess Hall's canteen was placed as if the number were its foot, so it sank 0.12 m into the bench's seat. In the Kitchen the canteen hung 0.09 m above the niche's floor. Both new heights are with Greg, still open (mails `20260914-164652-dev-0083`, `20260914-165025-dev-0085`).
- **Transparency again.** Greg's attempts to paint the canteen straight onto transparency failed. Greg painted it on a keyed backdrop instead and cut it out with `cutout.mjs`. Greg also added `contentsAt` to the metadata schema, which lacked it.
- **Rings that cannot be hung.** Two neighbouring views can share a seam only if they are less than 94 degrees apart; at exactly 94 the seam solver has no room left. In the Rec Corridor, the ring `audit-turns` proposed put a seam window inside the southwest mouth, because the audit reads only the openings, not the corners or the chamfer. In the Rec Area, the obvious ring put one inside the moved south mouth and had a 95-degree pair. Norm planned both rings against the fabric (mails `20260914-155324-dev-0070`, `20260914-155324-dev-0071`).

**Built**

- `.github/workflows/release.yml`, the release workflow (c4fb332; the v5 actions, 293bd02), and `scripts/build-site.mjs`, the static build (c4fb332).
- The game hangs accepted rooms' paintings, with `partsForTurn` shared by the game and the review page (f31720b).
- `contentsAt`, and `characters.json` entries with no picture of their own, which draw only in their variants' states (b04ccf6). The canteen's three cutouts (e3f9cd4).
- `scripts/fabric-kalamontee.mjs`'s second pass (0ccf924) and its Storage West entry (b0507c1); `scripts/fabric-feinstein.mjs` (34139d7).
- The playtest scores chart and table, `wiki/playtest-scores.svg` and `.json`, and the side contents fix in `wiki/wiki.js` (1aebaa9).
- A join-levelling helper, `level-join.mjs`, kept in the untracked `scripts/out/` folder, not in the repository.

All of these are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| The fifteen accepted rooms | Now hung painted in the game and on the public site |
| Dorm Corridor | Accepted; its registered sides and caps committed at last (bd9a029) |
| Mess Hall | Back from the user with "changes" by 11:28; re-furnished; new seeds approved at 12:12; side views with Greg |
| Kitchen | Complete at 11:42 and to the user; back with "changes" on the canteen; canteen pictures in the game; damage overlay and canteen height with Greg |
| Mess Corridor, Courtyard | Accepted; through-edits planned inside their doorways, after the new Mess Hall and the Plain Hall are approved |
| Lawanda Platform, Systems Corridor West | Seeds approved; side views with Greg |
| Rec Corridor, Corridor Junction | Metadata approved; seeds with Greg |
| Rec Area, Plain Hall | Metadata changes with Greg |
| Storage West | Metadata approved; seed 020 with Greg, and 200 released at 12:12 |
| Gangway, Deck Eight, Reactor Lobby, Brig | Laid out against Deck Nine; metadata changes with Greg, then seeds |

<!-- through: git 568caa5 · mail 20260914-165054-dev-0086 -->

## 2026-09-14 -- Checks before delivery, and Lawanda Platform accepted

This entry covers about 12:55 to 16:05 on 14 September. It was written late, together with the next one; the next entry says why. While Greg worked through his mailbox, the user asked Norm what process changes or tools were worth making. Norm proposed four, and by 15:22 all four were in place. Greg now reviews a joined room himself before he delivers it. A new check compares each seed with its fabric, and a new tool measures exactly where an overlay goes. The release no longer publishes a site that has not changed, or one with an accepted room's painting missing. For a player, Lawanda Platform became the sixteenth accepted room. It hangs painted in the game, with each shuttle berth painted in both of its states. The Brig went to the user. And the user settled the question Norm had left open: Greg now builds his own guides.

**The project at a glance**

| Measure | State |
|---|---|
| Commits | 319, through f7bc9c1 |
| Rooms accepted by the user | 16: the fifteen of the last entry, plus Lawanda Platform |
| Rooms with the user for their look | The Brig |
| Mailbox | 213 messages (108 from Greg, 105 from Norm), all committed |

**What happened**

- **Four process changes.** The user asked: "checking in on any process changes or tooling we should consider while greg is working through his mailbox items". Norm proposed four, and left one more decision to the user: whether Greg should build his own guides. The user replied: "start on the 1-4 process changes you recommended above".
  1. *Greg runs the room review before delivering.* Norm's request (mail `20260914-182540-dev-0093`, 14:25) gave the reason. Three of the day's round trips could have been caught before delivery: Storage West 200's shelves, Lawanda 069's band and the dispenser's rings. Each had cost a repaint out of Greg's image capacity. Greg adopted the rule at 14:41 as item 14 of the contract's section 6a (mail `20260914-184114-design-0101`). His Lawanda floor cap, delivered the same minute, was the first to follow it. That edit to the contract is still uncommitted.
  2. *A seed checked against its fabric* (`check-seed.mjs`, bfc3234, 15:22). It compares structure only: walls, corners, shelves, furniture and doorways, not rust or rivets. On Storage West 200 it flags exactly the strip of shelving that Norm had caught by eye, and 020 passes. Greg used it on his next deliveries. It caught two invented floor seams in Systems Corridor East's 090 before he sent it (mail `20260914-200253-design-0108`).
  3. *Exact overlay positions* (`locate.mjs`, 577723a, 14:40). Norm's hand-read guide for the Kitchen dispenser's damage had been about 30 plate pixels out. The tool projects a thing's box into a painted view with the game's own camera and rectifies its face to a plate at a stated scale. At 14:39 Greg got the dispenser's measured face: the button at u 225, v 276, replacing Norm's 228 (mail `20260914-183945-dev-0095`).
  4. *Two release fixes* (8f671d5, 14:28). The site build now fails if an accepted room's registered painting is missing, and `--tracked` counts only committed files, so the check can run before a push. The build also writes a hash of the whole site. The release compares it with the published one and skips the push when nothing changed. Most pushes are mail and records, and the push is the whole site, about 284 MB. One push had taken 16 minutes.
- **Greg's overlay written over.** At 14:33, a test by the agent building the locate tool wrote over Greg's delivered dispenser overlay. Norm restored it from the game's copy, matched to the hash in Greg's delivery, and told Greg at 14:39: "my fault". Without `--force`, the tool now writes over no existing file, and nothing under `RoomPolishInstructions/`, which is Greg's.
- **Lawanda Platform, from its sides to the user's acceptance** (13:50 to 15:48).
  - *The ring.* Greg delivered the two sides at 13:50. The west side (249) was approved. In the east side (069), the north wall's dark lower band stopped dead at bearing 34, exactly where Norm's guide from the 339 view ran out: "the generator ended the band where the guide did" (mail `20260914-180332-dev-0091`). The band was carried through, and the corrected side and the ceiling cap were approved at 14:21. The floor cap followed at 14:53.
  - *A black slab.* With the room whole, the look at the whole room found what no number had: the fabric's Betty car stood in front of the painting as a black slab across the north side. There were two causes. The engine counted a part as painted only when its condition matched a painted state as a whole string; now a part whose conditions are all clauses of a painted state counts (7d48522). And the six views recorded no painted state, which Greg added within minutes. The review page's two switches for a true/false setting were broken too: both ticked at once, and neither could bring Alfie's car in (7d48522).
  - *The berths.* The room was still not finished, because its two berth states had no painting. Greg painted them: the north berth empty with Betty away, and Alfie in the south berth with its door open. They were approved at 15:20 (db67542). By 15:48 the user had accepted Lawanda, with no notes (31cdbc9). Norm wrote to Greg that "the berth variants and the self-review made it a one-look acceptance" (mail `20260914-194853-dev-0101`).
- **The Brig to the user** (13:54 to 15:33). Greg restated the four Feinstein rooms' metadata from Norm's verdicts at 13:54 and painted the Brig's two seeds by 13:59. They were approved at 14:27, with one fix: the limerick's first line read "There once was ea krip". The canon has "There once was a krip, name of Blather" (globals.zil 2416). The sides and caps followed, and the room was whole and approved at 15:33 (ce862a8).
- **The Brig drops off the user's queue.** The user wrote: "brig reports as 'with norm' in the dashboard". Greg's note at 15:35 had carried the status "with norm", two minutes after Norm handed the room to the user, and it overwrote the hand-over. The mailbox now refuses to let Greg's status move a room that is with the user. The message itself is still sent (b9dd06d, 16:02).
- **Greg builds his own guides.** The user decided: "greg can build his own guides (until we see that this is not efficient)". Norm told Greg at 16:01: side views from approved seeds, caps from an approved ring, and state renders with `graybox-view --switch`. Norm still reviews every result (mail `20260914-200148-dev-0103`, 101c6c2).
- **The rest of Greg's queue.**
  - *Mess Hall.* The re-furnished room's two sides were approved at 13:24, and Norm sent the guides for its caps.
  - *Storage West.* The 020 seed was approved at 13:30. The 200 seed came back for one strip, the shelf unit that led to `check-seed`.
  - *Kitchen.* The dispenser's damage now lies flat on the dispenser's face (`facing`, 85fad5d, 13:26). It draws only when the dispenser is broken, and only over the painting. Greg moved the dispenser's position onto the fabric's box (metadata v14, 13:15).
  - *Systems Corridor and Systems Corridor East.* Their seeds waited on Greg's image-generation limit from 13:23. They arrived at 15:51 and 16:02. The Systems Corridor's were approved at 15:54, and Systems Corridor East's 090 at 16:04. Its 270 came back: through the west mouth the seed painted a long invented tunnel, where the fabric shows the Systems Corridor's far wall a few metres off.

**Decisions**

- The user: the four process changes; Greg builds his own guides, "until we see that this is not efficient"; Lawanda Platform accepted.
- Norm: `underpaint state` is the sea-level compositor, and Norm had sent Greg to it for Lawanda's berths by mistake. Greg rejected the outputs and used `through --opening`. Norm's reply: "you were right, and the mistake was mine". Rather than stretch `state` to cover doorways, Norm made it refuse fabric renders that differ above the horizon and name the right command (1a61d7a, mail `20260914-192014-dev-0098`).
- Norm: a room with the user leaves the user's queue only by the user's verdict or by Norm (b9dd06d).
- Norm: Systems Corridor East's 000 and 180 need not wait for the 270 fix. They take only the outer strips of 090 and 270, and the west mouth is in 270's middle (mail `20260914-200457-dev-0105`).

**What was hard**

- **A painted feature that stops where its guide stops.** The review had flagged Lawanda 069's band as a straight step, and the delivery called it an inherited fabric edge. The warning now says outright when a line is not the room's own edge (8f671d5).
- **What the numbers cannot see.** The Betty car's slab passed every measure. Every level shot was taken in the opening state, and nothing checked what the fabric draws in front of a whole painting. Now `review-room` does, in the opening state and with each switch flipped on its own (e5bebb7). On its first run it found Alfie's car doing the same, until that berth was painted.
- **Image capacity.** Greg's image generation hit an account limit, and the Systems Corridors' seeds waited about two and a half hours (mails `20260914-172317-design-0090`, `20260914-173819-design-0091`). Every repaint spends that capacity, which is why the checks moved before delivery.
- **A check's blind spot.** `check-seed` passed Systems Corridor East's 270, invented tunnel and all. A doorway's beyond is a small patch of the frame, so Norm's eye caught it instead (mail `20260914-200436-dev-0104`).

**Built**

- `scripts/check-seed.mjs` and its library (bfc3234); `scripts/locate.mjs` and its library (577723a).
- `scripts/build-site.mjs`: fails on an accepted room's missing painting, `--tracked`, and `site-hash.txt`. The release compares the hash with the published site's before pushing (8f671d5).
- The painted-state rule for parts, and true/false switches on the review page, in `dashboard/turn.js` and `uat.js` (7d48522). `graybox-view.mjs --switch` renders the fabric in a state (7d48522).
- `review-room.mjs`: the straight-line warning says when a line is not the room's own edge (8f671d5). It warns about fabric in front of a whole painting (e5bebb7), and its switch rows return to the opening state between switches (1a61d7a).
- `underpaint state` refuses a change above the horizon (1a61d7a). The mailbox keeps a room that is with the user there (b9dd06d). `facing` puts a picture on a thing's face (85fad5d).

All of these are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Lawanda Platform | Accepted by the user by 15:48: six views and two berth states; hung in the game and on the site |
| Brig | Whole and approved at 15:33; with the user (briefly off the user's queue through a status overwrite) |
| Mess Hall | Sides approved at 13:24; caps with Greg |
| Kitchen | Dispenser damage with Greg, now from measured numbers |
| Storage West | 020 approved; 200's right edge and the 110 side with Greg |
| Systems Corridor | Seeds approved at 15:54; 000 and 180 with Greg |
| Systems Corridor East | 090 approved; 270's west mouth, and 000 and 180, with Greg |
| Systems Corridor West | Sides with Greg |
| Gangway, Deck Eight, Reactor Lobby | Metadata restated at 13:54; seeds with Greg |
| Rec Corridor, Corridor Junction | Metadata restated by Greg (v6 at 14:18, v5 at 14:46); seeds with Greg |

<!-- through: git f7bc9c1 · mail 20260914-200457-dev-0105 -->

## 2026-09-14 -- Black holes on the public site, marker graffiti and an escape pod

This entry covers about 16:05 to 19:40 on 14 September. Playing the hosted game, the user found a black hole in SanFac A, and then in Dorm A. It turned out that eight accepted rooms were missing their north and south views on the public site. Norm fixed this with one shared rule for which views a room hangs, and a check in the release, and all sixteen accepted rooms are now whole there. The Brig's graffiti was repainted four times until it looked written by hand, and the user liked it. The user moved the metadata work from Greg to Norm, so that Greg's queue is only painting. Norm built the Escape Pod to match the glimpse of it that the user had already accepted from Deck Nine. Its first two seeds were approved, with the fabric webbing the user asked for. And the history fell behind: this entry and the one before it were written together at the end of the evening.

**The project at a glance**

| Measure | State |
|---|---|
| Commits | 336, through 74cb8df; the first batch of Norm's Kalamontee metadata is in the working tree, not yet committed |
| Rooms accepted by the user | 16, as in the last entry; all sixteen now whole on the public site |
| Rooms with the user for their look | The Brig: graffiti approved by the user, waiting for acceptance |
| Mailbox | 245 messages (120 from Greg, 125 from Norm), all committed |

**What happened**

- **Black holes in the hosted game** (fd8c0b5, 16:15). The user asked: "how do i actually play the hosted game". Then: "in sanfac A, playing the game, why is there such blackness? is this on purpose?" and "i also saw it on dorm a". It was not on purpose.
  - *The cause.* The site build shipped only the views whose keys begin `TURN-`. The eight pilot rooms, Dorm A to D and SanFac A to D, register their north and south views as `VIEW-A` and `VIEW-B`. The hosted game could not find those views, skipped them without a word, and showed black.
  - *The fix.* The user asked: "audit all other rooms we have considered 'complete' for this bug and make sure not to miss is again". Now one rule picks a room's views, `hungViews` in `dashboard/turn.js`, and the game and the build share it. The site ships views only for accepted rooms. And `check-site.mjs` fails the release if any accepted room is not whole as the hosted game reads it.
  - *The audit.* Norm checked the live site before the fix and after. Before, 8 of the 16 accepted rooms were not whole; after, all 16 were.
- **The Brig checked on the site.** The user wrote: "check the brig on the live site too". The Brig was not yet accepted, so it was correctly unpainted there. `build-site --preview BRIG` builds a scratch site as if the room were accepted, and it showed the Brig would hang whole (397b6e5, 16:48).
- **Marker graffiti** (16:47 to 19:20). The user's verdict on the Brig: "the grafitti is comic sans in nice neat lines and indenting... it should resenble real grafitti, sloppy, a little 'off' like it was actually written by a marker, not like i could actually identify the font." Norm asked Greg to repaint the limerick's patch in the 008 view and nothing else, keeping the canon's words and keeping it readable (mail `20260914-204735-dev-0106`). It took four repaints:
  - *R4* (17:02) had the dark marker, but still read as a handwriting typeface. Every line was level, every line started at the same margin, and every "e" was the same shape. Norm: "I would rather not send it back to the user to reject twice" (d17ba60).
  - *R5* (17:12) had the look. But its last line sat on a panel seam and ran past the protected patch's edge, and the protection cut it to "tar-p..ls .f K..t.." (1377c83).
  - *R6* (18:35). At 17:44 Greg found only five clear pixels above the seam for the last line, and asked. Norm answered at 17:45 with two layouts, and Greg carried the line onto the panel below the seam. But restoring the seam band clipped line five, and the new line was in a heavier, blacker pen (09ddbb5).
  - *R7* (19:07) was approved at 19:09, and the Brig went back to the user (2104030).
  - *The user's answer.* "grafitti looks good, but .. how the heck do i get in and out of here if there is no toggle for the door?" Norm answered from the canon: Blather throws the player in, the cell door is locked for good ("No way, Jose."), and the Feinstein explodes with the player inside. So there is no door state to paint (876af19, mail `20260914-232040-dev-0122`).
- **Norm takes the metadata work** (17:48 to 18:42). The user asked for "a recap of where the pending items are", then: "gregs backlog is quite long, are there any you can jump in and take to help him out?" and "metadata tasks might be best". Greg's image-generation capacity had been what limited the work, so the work that needs no images moved to Norm (mail `20260914-214858-dev-0112`).
  - *Norm's own verdicts.* Norm applied four waiting edits under the contract's section 6b, which lets Norm correct metadata: the Infirmary (v4), the West Wing (v6) and the Rec Area (v4) at 18:01 (dc9e5f8), and the Plain Hall (v7) with its final view plan at 18:19 (e58f6b0). Each went to Greg for seeds.
  - *The 36 queued Kalamontee rooms.* Norm now writes their metadata together with their layouts, group by group. The first batch of eleven was being built by a workflow at 19:40, uncommitted: the Conference Room, Booth 1, SanFac E, the three Admin Corridors, the Systems Monitors, the Small and Large Offices, the Plan Room and the Transportation Supply.
  - *Greg's queue.* It is now painting only. Greg closed his two umbrella metadata asks at 18:37. The look stays his: materials, lighting mood and prompts, which he may change when he paints.
- **The Escape Pod** (18:13 to 19:37). The user wrote: "go ahead and re-edit the deck nine doorway for the pod". That answered yes to question 1 of `DR-109-GEOMETRY-DEV-ANSWER.md`. The order: Norm builds the pod and Greg paints it. After the user accepts the pod's far view (270), one re-edit is made to Deck Nine's accepted open-door view, inside the pod doorway only.
  - *The build.* A new `vault` part draws the ribbed barrel vault that Deck Nine's glimpse shows. Nothing in the kit could build one before (929d9c2). In the Feinstein frame the pod's centre is 5.6 m east of Deck Nine's: a barrel-vaulted cabin 4 m long, with two web banks, a console, a viewport and a service column on the far bulkhead, and one door (335881e). Projected through Deck Nine's camera, its far floor line falls at y 583 against the painting's 582, its bank feet within 10 px and its crown lamp within 5. Norm wrote its metadata, v1, with a 16-row state table (mail `20260914-224225-dev-0119`).
  - *The seeds.* The 270 seed, in its second round, came back at 19:19: the web banks were flat mesh panels. The user wrote: "yes i want a fabric-y kind of webbing mesh that a person could climb into - right now it looks like metal grid". The canon agrees too: "The safety webbing fills most of the pod. It could accomodate from one to, perhaps, twenty people." (globals.zil). R3 was approved at 19:27 (4aee859). The 090 seed, the door, was approved at 19:37. Norm registered both as metadata v2 (74cb8df).
- **Greg's paint queue.** The Systems Corridor's four-view ring was approved at 16:52, with a tonal patch on 090 that is invisible in every shot (0b47aff). Its caps and dark-display variant are Greg's, with his own guides. Systems Corridor East's corrected 270 was approved at 16:49. At 18:14 Greg restored Systems Corridor West's sides and reported its ring clean, with its caps next (e58f6b0).
- **The history fell behind.** The user asked: "is the historian job keeping up with updates as we go along?" It had not. The last entry, committed at 13:26 (4b94364), covered up to 12:55, and nothing more was written for about six hours. This entry and the one before it were written together at about 19:40, from git, the mailbox, the dashboard and the user's note.

**Decisions**

- The user: fix the black holes and audit every accepted room; the graffiti should look like real marker; Norm takes the metadata work so Greg can paint; re-edit Deck Nine's doorway for the pod; the pod's web is fabric webbing a person could climb into.
- Norm: one rule, `hungViews`, chooses the views for the game and for the site, and a room's views are published only once it is accepted.
- Norm: the Brig has no door switch, because the canon's cell door never opens.
- Norm: the pod's 000 and 180 views are each a bank face 0.7 m away, so they are built from 270 and 090 rather than seeded. The web look carries through every pod view, and into the Deck Nine re-edit (mails `20260914-224225-dev-0119`, `20260914-232234-dev-0123`).
- Norm: Deck Nine's re-edit waits until the user accepts the pod's 270, and changes only the pixels inside the pod doorway. Deck Nine's other views do not change (mail `20260914-221312-dev-0116`).

**What was hard**

- **A fault only the hosted game shows.** Played locally, and on the review page, the game reads each package's files through the host's routes, which list every file, so a view the static build left out never goes missing there. The black holes existed only on the public site. The lesson was to check the site itself as a player reads it, and that check now runs in every release.
- **Lettering that is not a font.** The generator kept snapping to a typeface, and the protected patches cut any stroke that crossed their edges. It took four passes and one question answered within a minute.
- **A seed right in geometry and wrong in look.** The pod's first 270 sat on the fabric line for line, but its banks did not match the cabin the user had already accepted through Deck Nine's door. The glimpse and the user's words settled it.
- **The historian's own gap.** The history has to be caught up after the fact when it is not run after each milestone.

**Corrections**

- The last entry said the fifteen accepted rooms were "now hung painted in the game and on the public site". On the public site, eight of them (Dorm A to D and SanFac A to D) had no north or south views until fd8c0b5 at 16:15.

**Built**

- `scripts/check-site.mjs`, run by the release on the built site, and `hungViews` in `dashboard/turn.js`, shared by the game and `build-site.mjs` (fd8c0b5).
- `build-site.mjs --preview ROOM` (397b6e5).
- The `vault` part, flush pipe elbows for the pod's ribs, and a charcoal `safety-web` surface. `check_design.mjs` now accepts a thing the rules bring into a room, such as the pod's survival kit and towel (929d9c2).
- `scripts/fabric-feinstein.mjs` places the Escape Pod (335881e).
- In progress, uncommitted: `scripts/fabric-kalamontee.mjs`'s third pass, which lays out the admin wing north of the Corridor Junction and makes full rooms of the Conference Room, Booth 1, Admin Corridor South and SanFac E, with the eleven rooms' metadata and scenes.

All of these are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Dorm A to D, SanFac A to D | Accepted; whole on the public site since 16:15 |
| Brig | Graffiti repainted (R7) and liked by the user; with the user to accept |
| Escape Pod | Built and laid out by Norm; seeds 270 and 090 approved; 000, 180, the caps and the variants with Greg |
| Infirmary, West Wing, Rec Area, Plain Hall | Metadata by Norm; seeds with Greg |
| Systems Corridor | Ring approved at 16:52; caps and the dark-display state with Greg |
| Systems Corridor East | 270 approved at 16:49; 000 and 180, caps and the open-cube state with Greg |
| Systems Corridor West | Ring clean at 18:14; caps with Greg |
| The first eleven of the 36 Kalamontee rooms | Metadata and layout with Norm, uncommitted |

<!-- through: git 74cb8df · mail 20260914-233727-dev-0125 -->

## 2026-09-14 -- The Brig accepted, the Escape Pod whole, and the admin wing to Greg

This entry covers the night of 14 to 15 September: about 19:40 to 23:05 EDT on the 14th, which the mailbox's UTC ids date the 15th. The user accepted the Brig, the seventeenth room. While explaining how a player gets into the Brig, Norm found that the port had never robbed the player on the way in, as the original does. The Escape Pod's base room was finished, and the scattered Mess Hall went to the user. Because registering views had become Norm's job, Greg could no longer check a new view in place with its neighbours, so Norm gave the room review a way to hang a picture before it is registered. The first version of that check gave one false all-clear, and it was fixed within minutes. The user can now get one-line updates on Telegram. Norm's first batch of metadata, the eleven rooms of the admin wing, went to Greg for seeds, and the mech wing's eleven rooms were started.

**The project at a glance**

| Measure | State |
|---|---|
| Commits | 364, through 9f297de (28 since the last entry) |
| Rooms accepted by the user | 17: the Brig joined the sixteen |
| Rooms with the user for their look | The scattered Mess Hall |
| Mailbox | 285 messages (135 from Greg, 150 from Norm). Greg's delivery at 23:04 was not yet committed |

**What happened**

- **The Brig accepted, and a fault found while explaining it** (19:50 to 19:56). The user had asked how the room works in the game: "maybe this is right (by canon) but i need to understang how in-game, i get in and out of this room". Norm answered from the canon, as the last entry records. On Deck Eight or in the Reactor Lobby, the fourth time Blather finds the player away from their post, he throws the player into the Brig. The door never opens ("No way, Jose."), and the third explosion kills anyone who is not on Deck Nine or in the pod. The user accepted the Brig by 19:50 (8a06fa5). While writing that answer, Norm found a deviation in the port. In the original, being thrown in also takes everything the player carries away to the Crag, and the padlock is moved into the Brig (globals.zil 688-691). The port did neither: it kept the player's possessions, and it left the padlock in the room where Blather caught the player. Both were fixed, with a test, at 19:56 (6e0d7a8).
- **The Escape Pod's base room** (19:47 to 21:27). Greg built the two web-bank views, 000 and 180, from the approved 270 and 090 views, with the fabric webbing the user had asked for carried round the cabin. They were approved at 19:53 and 20:00 (b93da0e, 3d35279). Norm's ring review: "the sheet reads as one cabin, the web unbroken across every seam" (mail `20260915-000035-dev-0127`). The ceiling cap followed at 20:13 (a57be53).
  - *The floor cap.* It went round three times. On R4, the whole-room review found a thin dark line along the foot of the 000 view, where it meets the floor, in five shots (d0d99ad, mail `20260915-002747-dev-0129`). R5 weakened the line but did not remove it (5126baf).
  - *A check Greg could not run.* Since the metadata work moved to Norm, only Norm registers views, so Greg could not review a new floor cap hung in the room with its neighbours. Norm added `review-room --candidate` at 20:45. It hangs a picture that is not yet registered in place of the registered one, and the join scan follows it (ef4782e). Norm checked that it reproduced R4's numbers exactly. Greg ran it on R6 before sending, and the check was clean. Norm's own review agreed at 21:27: 188 joins read and no warnings. Norm wrote: "that is the loop working" (f66ce04, mail `20260915-012711-dev-0132`).
  - *The first variant.* The viewport's black state, canon's "featureless black rectangle", was approved at 20:50. Every pixel that changed lies inside the viewport's frame (c488c93). The pod went back to Greg at 22:17 for its six other viewport states and its two door states (6d1a328).
- **The scattered Mess Hall, and the rooms that look into it** (21:38 to 22:50). Greg sent the re-furnished hall's two caps at 21:38. His `--candidate` check said they were clean. Norm's review of the whole room found four thin bright lines on the ceiling, and the cause was Norm's tool (see What was hard). The floor cap was approved, and the ceiling was approved at 21:51 after one repaint (66ddc7b). Greg then painted the two door-open states through their openings only. At 22:01 the room was whole, with no warnings of any kind, and went to the user (67fe9c0). Its neighbours still showed the old hall with its rows of benches through their doorways, so Greg began re-editing the doorway of each view that sees it:
  - *The Mess Corridor.* Its accepted 180 view and its Kitchen-open variant were re-edited, and the change stays inside the portal (6017f4b, 22:20).
  - *The Kitchen.* Its two 350 open-door states were re-edited at 22:50 (d4dc24c). The Courtyard's view onto the Plain Hall waits for the Plain Hall's seeds (mail `20260915-020104-dev-0135`).
- **Storage West** (22:29). The 200 seed came back with the invented shelf unit gone: a plain wall with two plank ends at the fabric's heights. `check-seed` passed it, and it was approved and registered (5698a99). At 23:04 Greg delivered the 110 and 290 views and both caps (mail `20260915-030438-design-0135`, not yet committed).
- **Telegram updates for the user** (21:12 to 21:15). The user asked: "i have a bot [...] in telegram that i think i would like you to report significant one-line updates to when they happen. these could be (to start) a new room is pending my review and you are blocked by something - can we do this // what do you need?" Norm built it (871c1c3):
  - *The token.* The bot's token is kept in the user's profile, outside the repository, and is never printed.
  - *The chat.* Another program already reads the bot's messages, so the chat to send to could not be found from the bot, and it had to come from the user.
  - *The mention.* The user then asked for every message to @mention the bot, so that the program reading it sees each one, and for "one more test". Every line now starts with the mention (f8be897).
  - *When a line is sent.* The mailbox sends one by itself whenever a room arrives on the user's plate. The Mess Hall's hand-over at 22:01 was the first.
- **The admin wing: Norm's first metadata batch** (20:04 to 22:53). A workflow built eleven rooms at once: the Conference Room, Booth 1, SanFac E, Admin Corridor South, the Admin Corridor, Admin Corridor North, the Systems Monitors, the Small and Large Offices, the Plan Room and the Transportation Supply.
  - *What each room got.* Each room got a package with the canon in its README, metadata, a view plan and renders of its fabric. All of them are cut from one shared layout in `fabric-kalamontee.mjs` (d204d24, 20:04).
  - *The rift.* The canon rends the Admin Corridor apart: "a gaping rift, at least eight meters across and thirty meters deep", with the sky showing through the severed roof. So the layout builds the wing as two blocks with an 8 m chasm between them, open to the sky, and the ladder lies across it as a switch.
  - *The fix pass.* After each package was checked independently, a fix pass followed (f555c75, 22:52). The Corridor Junction's dead walkway was missing from the views that see its end. Pinholes in Admin Corridor North's top corners let the background through. Slivers of sky showed past the building's severed face until the south block was roofed. The Plain Hall's scene entry had been lost from the layout file. The Transportation Supply is now lit by the player's lamp. The pass also brought the shared list of sky rooms up to date, made corrections room by room, replanned the Large Office's and the Plan Room's views, and set the caps' lenses.
  - *To Greg.* At 22:53 the eleven rooms went to Greg for seeds, one mail each (5c9015a, mails `20260915-025355-dev-0140` to `20260915-025356-dev-0150`).
- **The engine, for the admin wing.**
  - *Dark rooms.* A dark room is now drawn dark: no painting, no fabric, no sky and nothing to click. The Transportation Supply, unlit in canon, had come out daylit. In that room the game now adds canon's "There is light to the south." (verbs.zil 70-73; 8c25e4f, 22:17).
  - *The ladder.* The rules move the ladder across the rift into the Admin Corridor rooms, and it had been drawn as a loose grey box on the first drop anchor. Now a large object that a package paints into its room keeps its place there, and over a painting it is only a pick target (`largeObjects`, 3561b07, 22:58).
- **The mech wing started** (23:02). The next eleven rooms moved to Norm for the same pass: Mech Corridor North, the Mech Corridor, Mech Corridor South, Storage East, the Physical Plant, the Tool Room, the Machine Shop, the Robot Shop, Reactor Control, the Reactor Access Stairs and the Reactor Elevator (9f297de). According to Norm's note for this entry, the batch began with the admin wing's lessons already written into its rules.
- **The delivery checklist.** Item 14, Greg's rule that he runs the room review before delivering any view of a joined room, was committed at 19:50 (e9e86bc).

**Decisions**

- The user: the Brig accepted; one-line Telegram updates when a room is waiting for review or Norm is blocked; every line @mentions the bot.
- Norm: the Telegram token never enters the repository. A failed notification never stops the mailbox, and no test sends one (871c1c3).
- Norm: Greg checks every cap and variant with `review-room --candidate` before sending it, and Norm registers it after review (mail `20260915-004512-dev-0130`).
- Norm: there are no dark paintings. The Transportation Supply is painted as lit by the player's lamp: "the dark is the game's job (a dark room now draws black)" (mail `20260915-025355-dev-0148`).
- Norm: the thin ceiling line in the accepted Mess Corridor predates the re-edit, and the user accepted the room with it, so it stays. The Kitchen is not yet back with the user, so its three older join lines and the dispenser's damage overlay must be finished before it goes (mails `20260915-022040-dev-0137`, `20260915-025025-dev-0139`).
- Norm: the Plan Room's view plan lets three seams cross the wall art, because avoiding them would need a lens of 121 or more. This is eased by seeding two opposite views and building the other two from both, and whether to accept the crossings is left to Greg (mail `20260915-025355-dev-0147`).

**What was hard**

- **A line only the whole room shows.** The pod's floor line sat on the 000 view's own edge, inside the overlap, not on the cap's boundary. So the seam tool found no ridge there, and Greg could not see the line without the room hung whole. That took two rounds, and `--candidate` solved it.
- **A false all-clear from the new check.** A brand-new view, such as a room's first cap, had nothing registered to replace, so the tool gave it no list of the views it is built from, and it read none of its joins. Greg's check on the Mess Hall ceiling came back clean over four lines. Norm found them in the whole-room review and wrote to Greg: "your check missed them because of my tool ... Sorry for the false all-clear" (mail `20260915-014302-dev-0133`). Now a new candidate counts as built from every registered view, and Greg's own command reproduces the four lines (09470dc, 21:43).
- **Still open: several new views at once.** Greg's 23:04 delivery reports that, with four unregistered Storage West views hung together, the review still calls the room not whole and says the new joins are not visible. Norm had not answered when this entry was written (mail `20260915-030438-design-0135`).
- **A deviation found late.** The Brig's paintings were done and approved around a rule the port had ported wrongly. The ROB and the padlock's room came to light only when the user asked how the room is played, after the room was painted. The fix is held by a test.
- **Geometry that only a render shows.** The admin wing's pinholes and slivers of sky came from how parts meet at corners and roof edges. The independent checks of each package found them, and they were fixed before any seed was painted.

**Built**

- `scripts/notify.mjs` and `scripts/lib/notify.mjs`, and the mailbox's line to the user when a room reaches the user (871c1c3, f8be897).
- `review-room.mjs --candidate`, and the review page's `candidate` parameter (ef4782e). A new candidate's joins are read (09470dc).
- `game.js` draws a dark room dark, and the Transportation Supply's "There is light to the south." (8c25e4f).
- `largeObjects` in `scene/design.js` and `graybox.js` (3561b07).
- `scripts/fabric-kalamontee.mjs`: the third pass, which lays out the admin wing, and its fix pass (d204d24, f555c75).
- The Brig's ROB, in `rules/ship.js`, with its test (6e0d7a8).

All of these are in [Tools](tools.md), except the rule fix.

**Rooms**

| Room | Where it stands |
|---|---|
| Brig | Accepted by the user by 19:50 |
| Escape Pod | Base room whole and approved at 21:27 (six views), with the black viewport state; six viewport states and two door states with Greg |
| Mess Hall | The scattered hall complete at 22:01, with both door-open states; with the user |
| Mess Corridor | Accepted; its 180 view and Kitchen-open variant now show the scattered hall (22:20) |
| Kitchen | 350 open-door states re-edited (22:50); three older join lines and the dispenser overlay with Greg before it goes to the user |
| Storage West | 200 R2 approved at 22:29; 110, 290 and both caps delivered at 23:04, with Norm to review |
| Systems Corridor West | Views registered; with Norm to settle the caps' status after Greg closed a stale ask at 21:29 |
| The admin wing's eleven rooms | Metadata by Norm; with Greg for seeds since 22:53 |
| The mech wing's eleven rooms | With Norm for metadata since 23:02 |

<!-- through: git 9f297de · mail 20260915-030438-design-0135 -->

## 2026-09-15 -- The Kitchen and Storage West to the user, and a check for caps left behind

This entry covers about 23:05 on 14 September to 01:15 on 15 September EDT. No new requests or decisions came from the user in this stretch. The user's last messages were the Telegram setup and the verdicts on the Brig, which the last entry covers, so this was the agents working through the queue. Two rooms went to the user: the Kitchen and Storage West. Both turned on the caps, the pictures of the floor and ceiling. The Kitchen's ceiling cap had a line that got worse with every mend, until Norm worked out why and changed the seam tool. Storage West's floor cap showed a door leaf that was not there, which the whole-room review had passed. It was found by eye, and it became a new check. On its first run across every room, that check found the same fault in accepted Deck Nine, which was mended within half an hour. The Conference Room, the first of the admin wing back from Greg, had four views and its floor cap approved.

**The project at a glance**

| Measure | State |
|---|---|
| Commits | 371, through 7b0adda (7 since the last entry, the last entry's own among them). Changes to the Kalamontee layout and scenes are in the working tree, not yet committed |
| Rooms accepted by the user | 17, as in the last entry. Deck Nine gained a state variant for its floor and stays accepted |
| Rooms with the user for their look | The scattered Mess Hall (since 22:01), the Kitchen (since 00:03) and Storage West (since 00:25) |
| Mailbox | 304 messages (145 from Greg, 159 from Norm), all committed |

**What happened**

- **Storage West's ring and caps, and a review that gives the registered answer** (23:07 to 23:14). Norm approved and registered Greg's 110 and 290 views and both caps: overlaps of 0.98 to 1.015 on all twelve pairs, 182 joins read, and no line warnings (4c99152, mail `20260915-030706-dev-0151`). The last entry left one problem open: with four new views hung together, Greg's review called the room not whole. The fault was in Norm's tool. A new candidate given no camera took the first registered view's, so all four hung at 020's bearing. Now a new candidate takes its camera from the restored picture's own `.json` sidecar. A new side counts as built from the registered level views, and a new cap from every level view. Checked on Storage West as it stood before the four were registered, the candidate review came back whole with 182 joins, the same answer as the registered room (2376655, mail `20260915-031431-dev-0152`).
- **The Kitchen to the user** (23:37 to 00:13). This was the rest of what the last entry said the Kitchen needed before it could go.
  - *Two approvals.* Greg's TURN-080 R2 mended its west join, which cleared a warning in one of the review's downward shots. The dispenser's damage overlay, R2, is an exact transform of Greg's approved art onto Norm's measured face of the dispenser, because the image generator's own edit had lost the transparency. Norm hung it with the dispenser damaged: the scorched button ring and spout collar sit on the painted button and spout. Both were approved at 00:03.
  - *The ceiling line.* Where the ceiling cap met the south view (TURN-170) there was a step of about 17 levels, and a dark groove that the generator had drawn 4 to 8 px outside the guide. Greg's mends made it worse: the two lines grew from 157 and 220 px long to 379 and 378. He rejected his own attempts, left the registered art untouched, and asked Norm what the right fix was (mail `20260915-033812-design-0137`).
  - *Why the mends failed.* A cap is drawn under the ring. So the cap's accepted side, the strip it shares with the ring, is hidden wherever the ring's plate is, and the player sees the step exactly where 170's plate stops. The seam tool's usual ramp put 14 of its 36 px on the accepted side, where the ring hides them. Greg's mends brightened pixels no one sees, and the visible line grew.
  - *The fix.* On a cap, `underpaint seam` now lays the accepted pixels fully up to the boundary and runs the whole ramp outward into the new part (keep 0, into 40). A new `--crest` takes out a line along the join that the profile does not call a ridge, such as a groove. Norm mended the cap with it as R5, with no repainting. Across the join, the brightness now runs 69 at the boundary, 69 to 67 through the old groove, and 53 at 40 px, with no dip. The whole-room review: whole, 186 joins, no warnings, in the opening state and with each of the seven switches flipped. At three times the size, the hard line is gone and a soft warm falloff remains (cb94c04, mail `20260915-040329-dev-0154`).
  - *The grey square.* The hand-over told the user that the canteen now sits in its niche, so the "grey square" the user reported on 14 September is gone. Greg confirmed the work and closed his side at 00:13 (mail `20260915-041355-design-0140`).
- **Storage West to the user, after a fault the review passed** (23:55 to 00:25).
  - *The last door states.* Greg built the 200 view's two door states from the fabric's own open-versus-shut difference: the door shut, and the door open with the Kitchen door open beyond it. They were approved and registered at 00:03. All four door combinations hang the right picture, and the whole-room review was whole, with no warnings (mail `20260915-040318-dev-0153`).
  - *The ghost leaf.* According to Norm's note, a background fork of Norm did this registration, and saw the fault by looking at the shots. The floor cap had been built from the door-open 200, so it painted the open leaf standing inward from the jamb. The room opens with the door shut, and in that state the leaf's top edge showed through the bottom fade of the new door-shut picture, "a ghost leaf standing on the floor just inside the shut door". The whole-room review had just passed the room.
  - *The mend.* Greg made a door-shut variant of the floor cap the same way, from the fabric difference: the leaf taken out, the diamond plate continued under it, and the shut door's foot at the wall. It changed 9.4% of the picture, and it was approved at 00:25. Storage West went to the user with all four door states, the can and the ladder (48e8d62, mail `20260915-042540-dev-0156`).
- **A check for caps left behind by a state** (48e8d62, 00:26). A level view fades out over its top and bottom rows, and the cap shows through there. A cap is built from one picture of each level view. So where a state variant changes something inside that fade band, and the cap has no variant of its own for that state, the cap shows the other state's pixels. The room review now warns when that happens (`capStates` in `scripts/lib/shots.mjs`).
  - *What it counts.* It compares 8 px blocks by their mean brightness, leaves out sky using the game's own sky matte, and counts only changed blocks that join into a connected piece. So a thing that moved is found, while regenerated rock grain, glints on wet stone and waves pass.
  - *Its first run.* Across every room, it found exactly two: Storage West, and Deck Nine, accepted and live. With Deck Nine's gangway door shut, the floor cap still showed the open doorway's step grating through the bottom fade, about 12,000 px of it.
  - *Deck Nine mended.* Greg made a gangway-shut variant of the floor cap by 00:45, and it was approved at 00:50. The shut cap now shows the bolted bulkhead where the shut 000 has it. Deck Nine stays accepted: the change mends only the floor in one state, so it does not go back through the user's queue (276ee2a, mail `20260915-045022-dev-0157`).
- **Two writes to one filename** (00:15 to 00:17). While Greg worked on Storage West's door-shut floor cap, Norm restored one too, and wrote it to the same filename at 00:15. Greg's write at 00:17 replaced it. Norm called that the right outcome: Greg's was better, because a restore can only fix a cap's rim, and Norm's left the leaf's foot as a faint wedge in the middle. Norm rewrote the sidecar, still Norm's receipt, to describe Greg's picture. From now on, anything Norm writes into a package carries `_NORM` in its name (mail `20260915-042540-dev-0156`).
- **The can and the ladder as themselves.** Neither had a picture of its own before, and according to Norm's note both drew as dark boxes. A fork of Norm cut both out of Greg's item set with `cutout.mjs`, the ladder with a seed in each gap between the rungs. The can ("Spam and Egz") stands on the Storage West shelf, and the collapsed ladder leans against the north wall. Extended across the rift, the ladder is painted into the Admin Corridor rooms instead. So its extended state has a null picture, and a variant with a null picture now draws the thing's box. Before that, the extended ladder would have been the 2.5 m collapsed one stood on end (48e8d62).
- **The Conference Room** (00:11 to 01:11). The first of the admin wing's rooms back from Greg.
  - *The seeds.* The 069 seed, a plain close wall with one low vent, was approved at 00:19. The 252 seed was right everywhere but one spot: a chair back at its right edge that the fabric does not have. That mattered, because the 345 view is grown from 252's pixels, so the invented chair would have landed in 345's guide. Norm asked for a rectangle edit (`through --rect`), so that everything else stays as approved. R2 came back at 00:46 and was approved at 00:54, together with 159 (seams 0.8 and 0.9, 46 joins, no line warnings) (mails `20260915-041955-dev-0155`, `20260915-045427-dev-0158`).
  - *The rest.* At 01:07 Greg sent 345 and both caps, with a clean candidate review. At 01:11 Norm approved 345 and the floor cap (7b0adda). The ceiling cap went back. Its middle was a dark louvred panel whose left and bottom edges are straight lines exactly where the ring's reach ends. Norm read this as the generator turning the fabric's dark ceiling colour into a feature that stops on the guide's edge, while every ring view paints the ceiling as rusted riveted plate. The line check had read those edges as the fabric's own, because the blockout's ceiling does change colour there.
  - *The door.* Greg took the one warning left for an overlay. It was the door-open state, which the view plan gives to 252 and the floor cap, and which was not yet painted. Norm asked for it: the leaf on its west jamb, the Rec Area beyond (mail `20260915-051104-dev-0159`).
- **Still running.** According to Norm's note, the workflow writing the mech wing's metadata was still running at the end of this stretch. Changes to `fabric-kalamontee.mjs` and the scene files are in the working tree, uncommitted.

**Decisions**

- The user: none in this stretch.
- Norm: on a cap, a seam mend runs outward into the new part, because the cap's accepted side lies under the ring where no one sees it (cb94c04).
- Norm: a cap left behind by a state change is a warning in every room review, and so in Greg's candidate checks too (48e8d62).
- Norm: Deck Nine stays accepted after its floor-cap variant, since only one state's floor changed. Its five older line warnings are in the base pictures, and four are cap joins of the Kitchen kind. They will be mended with the pod-doorway re-edit, which goes back to the user anyway (mail `20260915-045022-dev-0157`).
- Norm: anything Norm writes into a package carries `_NORM` in its name, so the two agents never write the same file.
- Norm: the Conference Room's invented chair is taken out by a rectangle edit rather than a repaint, and the room is not complete until its door-open state is painted.

**What was hard**

- **A mend that made the line worse.** The Kitchen's ceiling line grew with each of Greg's attempts, though he used the seam tool as it was written. The answer lay in the draw order: the cap sits under the ring, so half of every mend landed where the player cannot see. Solved: the seam tool now knows a cap from a level view, and a test holds it.
- **A fault the whole-room review passed.** Storage West's ghost leaf was in a state the room opens in, and the review read the room as whole with no warnings. The joins it scans were all clean; the fault was a cap in the wrong state, which it did not look at. Seen by eye, then made a check, which found the same fault in a room the user had already accepted.
- **A moved thing, or regenerated grain.** A state variant of a painting differs from its base all over, speck by speck: the Winding Stair's day variants, the Balcony's glints, the Courtyard's waves and the flood rooms' clouds. The check had to find a door leaf and a step grating without flagging any of those. Block averages, the sky matte and connected pieces did it. Storage West's leaf measured about 205 blocks and Deck Nine's grating about 190, against a warning threshold of 60; the flood rooms' variants come to 15 to 45 blocks, which is only a note.
- **Two agents, one filename.** Norm and Greg wrote the same file two minutes apart, and the later write won. It happened to be the better picture. The naming rule is meant to make sure luck is not needed next time.
- **Still open: a feature invented on the guide's edge.** The Conference Room's louvred ceiling panel passed the line check, because the blockout's ceiling really changes colour where its edges fall. Norm saw it by eye. It is with Greg.

**Built**

- `underpaint.mjs seam` on a cap: the whole ramp outward (keep 0, into 40), with `--crest`, `--keep` and `--into`, and a test in `scripts/tests/underpaint.mjs` (cb94c04).
- `capStates` in `scripts/lib/shots.mjs`, run by `review-room.mjs`, with tests in `scripts/tests/shots.mjs` (48e8d62).
- `review-room --candidate` and the review page: a new candidate takes its camera from its sidecar, and what a new side or cap is built from (2376655).
- `scene/graybox.js`: a variant with a null picture draws the thing's box (48e8d62).
- `data/characters.json`: the can and the ladder (48e8d62).

All of these are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Kitchen | 080 R2, the damage overlay R2 and the ceiling cap R5 approved; with the user since 00:03 |
| Storage West | Ring, caps, all four door states and the floor cap's door-shut variant approved; the can and the ladder drawn; with the user since 00:25 |
| Mess Hall | With the user since 22:01, unchanged |
| Deck Nine | Accepted; its floor cap's gangway-shut variant approved at 00:50; the older line warnings wait for the pod-doorway re-edit |
| Conference Room | 069, 252 R2, 159, 345 and the floor cap approved; the ceiling cap R2 and the door-open state with Greg |
| The admin wing's ten other rooms | With Greg for seeds, unchanged |
| The mech wing's eleven rooms | With Norm for metadata; the workflow still running |

<!-- through: git 7b0adda · mail 20260915-051104-dev-0159 -->
