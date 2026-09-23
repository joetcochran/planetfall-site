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

- **A black slab where a door was painted.** The review page drew the fabric's shut Kitchen door over Greg's painted door. It counted a part as painted only when a state variant covered it, not when it matched the base views' own state. Norm found the fault was on his own side, and fixed it in d1f27aa.
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
## 2026-09-15 -- The opening sequence goes to the front of the queue

This entry covers the rest of 15 September EDT, from about 01:15, and closes the gap between the last entry and the day that follows. In the morning the user said they wanted to play the opening sequence with the graphics in place and put it in front of a playtester, so the whole working order was rewritten around it: the eight rooms a tester walks through first, ahead of everything else. Four rooms were accepted for their look. The rest of the day went on the escape pod, where the user had said that the camera must be inside the safety webbing, and on eleven mech-wing rooms getting their metadata.

**The project at a glance**

| Measure | State |
|---|---|
| Commits | 381, through 58f3987 (10 since the last entry) |
| Rooms accepted by the user | 21: Booth 1, the Mess Hall, the Kitchen and Storage West joined the 17 |
| Mailbox | 348 messages (161 from Greg, 187 from Norm) |

**What happened**

- **Booth 1 and the Conference Room to the user** (01:25 to 02:23). The Conference Room went with its door shut and open (bc20f01), Booth 1 with its ring, both caps, its Redee sign dark and lit, and the Conference Room's far door seen through it in both states (460cddb, 72c3455). Two tool changes came with them: a new candidate given no camera is now refused by `review-room` and not hung by the review page, instead of being hung at another view's camera; and the straight-line check falls back to a package's own `_FABRIC` render where a guide's blockout is not in the package, which is how Booth 1's south-east corner sits on another view's frame edge.
- **The queue rewritten round the opening sequence** (10:33 to 10:45). The user, that morning: they want to play the opening sequence with the graphics in place and put it in front of a playtester. So DR-109 went ahead of all other work, with the admin and mech wings behind it as filler rather than withdrawn, and the rooms ordered as the player meets them, because that is how a tester walks it (fcc0581). A second note from the user -- the playtest stops at the Crag -- fixed the stretch exactly: Deck Nine, the Reactor Lobby, the Gangway, Deck Eight, the Brig, the Escape Pod, Underwater and the Crag. Nothing outside DR-109 had to be pulled forward (9542ad1).
- **The mech wing, eleven rooms of metadata** (fcc0581, 06:19 in the ledger). The whole wing south of the Corridor Junction, which had no package at all: Mech Corridor North, the Mech Corridor, Mech Corridor South, Storage East, the Physical Plant, the Tool Room, the Machine Shop, the Robot Shop, Reactor Control, the Reactor Access Stairs and the Reactor Elevator. Each got a README from the canon, metadata with every opening cast against the fabric, a view plan, and six fabric renders. One layout bug fell out of it: a pipe's path is the only part given as a list of points and was not moved into the room's frame, so the Physical Plant's two boiler flues and the Machine Shop's vat pipe stood 160 to 177 m outside their rooms in every render. With that fixed, re-rendering the two rooms gave files identical to the ones Greg already held.
- **The pod, the webbing and the window** (11:30 to 11:39). The user: "when we get in the escape pod we have to be IN THE WEBBING ... the way the camera is positioned, it seems like we are OUTSIDE the webbing", with two requirements -- the camera behind the webbing after boarding, and what is outside the porthole clearly visible, the porthole made bigger if that is what it takes. Canon agrees and says more: the webbing "fills half the pod". The pane grew from 1.0 x 0.6 m to 1.9 x 0.9, the two web banks became nets rather than slabs with an open nest between them, and a second eye, ESCAPE-POD-WEB, was placed inside the south bank. Norm's own measurement, taken against his recommendation, said the user's floor plan was the better one: from a side bank to an end wall the sightline rakes the strap plane at 66 degrees and the straps hide 74 per cent of what lies beyond, against 3 degrees and 30 per cent for webbing one side and the window opposite. That commit ends "Waiting on their word" (1c39c8a). Told that moving the porthole was what bought the second requirement, the user answered "it sounds like my idea for moving the porthole was not necessary, so skip it", and Norm bought the same thing three other ways: a coarser mesh (0.07 m straps on 0.375 m centres instead of 0.30), the web eye moved to the middle of the nest, and the service column moved out from under the eye (9a3ca23).
- **The Gangway's ring, the pod's door group, the wing's kit** (58f3987, 14:50 to 14:52). The Gangway's two side fills were registered at R4 and R5 rather than at the delivered R7 and R8: the seam mend had smeared a 100 px column out from each boundary and dissolved the near rail post, and the step it was chasing turned out to be at the other end of the room, the two approved seeds disagreeing with each other. The pod's four door variants were approved, completing the door group. Admin Corridor South's TURN-170 was registered and set the admin wing's kit; TURN-350 went back, its galvanised rust-streaked walls being a different corridor from 170's panels and eye-height band.

**Decisions**

- The user: the opening sequence goes ahead of all other work, so they can play it with the graphics in place and give it to a playtester; and the playtest stops at the Crag, which fixes the stretch at eight rooms.
- The user, on the pod: the camera must be inside the webbing and the view out of the porthole clearly readable, and resizing the pod is allowed. Then, on being told the porthole need not move: skip it.
- Norm: Underwater's metadata moves from Greg to Norm, because the room was at zero and was the longest pole in the stretch (ledger, 10:46 and 10:47).
- Norm: a scene may declare `viewOf`, the game room a view room is an eye in, because a second eye in one room would otherwise be taken for a variant of the first.
- Norm: the Gangway's TURN-000 stands as it is; if a cap makes the seeds' disagreement obvious, TURN-000 changes rather than the fills.

**What was hard**

- **A mend that smeared the room.** The Gangway's delivered R7 and R8 mended a real step, but at the wrong end, and cost a rail post. Solved by registering the earlier revisions and writing the true cause -- two seeds that disagree by 56 points of luminance in their middles -- into the record.
- **Where the eye goes in a small room.** The pod could be painted from the aisle, where the viewport reads and the web does not, or from inside the web, where the web reads and the viewport is lost. On the 15th it was settled with a second eye and a bigger pane. That held for one day.

**Rooms**

| Room | Where it stands |
|---|---|
| Booth 1, the Mess Hall, the Kitchen, Storage West | Accepted by the user during the day |
| Conference Room | With the user from 01:29, door shut and open |
| Escape Pod | Door group complete; the ring repainted round the new webbing, with a second eye |
| Gangway | Ring hung at 120 exact, overlaps 0.998 to 1.002 |
| Admin Corridor South | 170 registered and it sets the wing's kit; 350 back to Greg |
| The mech wing's eleven rooms | Metadata, view plans and fabric renders done; with Greg for seeds |
| Underwater | Metadata handed from Greg to Norm; the room still at zero |

<!-- through: git 58f3987 · mail 20260915-192557-design-0161 -->

## 2026-09-16 -- The admin wing, a day of false alarms, and the pod ordered rebuilt

A long day in three parts. It opened with the last rooms of the opening sequence being finished, so that by 08:23 all eight rooms a tester walks through were whole turns, and the user accepted five of them. Through the afternoon Greg and Norm painted the Kalamontee admin wing: Admin Corridor South finished, the Admin Corridor and Admin Corridor North whole, SanFac E consistent with itself, two Systems Monitors views and the Plan Room's two maps. In the evening the user playtested the opening sequence and asked for the escape pod sequence to be reworked from scratch, giving a fifteen-beat storyboard of what the viewport should show. That became DR-112, and the pod's fabric was re-cut for the second time in a day.

The thread that ran through the whole day is worth stating on its own: nearly every measuring tool produced at least one confident wrong answer, and each time the argument was settled in seconds by magnifying the actual boundary and looking at it.

**The project at a glance**

| Measure | State |
|---|---|
| Commits | 430, through ac9bfdc (49 on 16 September) |
| Rooms accepted by the user | 26: the Gangway, Deck Eight, the Reactor Lobby, Underwater and the Escape Pod joined the 21 |
| Rooms with the user for their look | Admin Corridor South, since 17:21 |
| Mailbox | 487 messages (236 from Greg, 251 from Norm); the last twelve not yet committed |

**What happened**

- **The opening sequence finished, and five rooms accepted** (05:18 to 08:27). Underwater was built from nothing in a morning -- metadata written from the source and the Crag's approved geometry, a fabric, six blockouts, then seeds, ring and caps (9c23f3f, 581a9c1). Three of its cuts failed before the fourth worked: the rock face at 3.2 m made the whole north view a black wall, closing it off behind filled the cleft with rock, and an unfogged surface read as a hard-edged sky over a horizon line, which is the one thing a room 4.6 m under water must not have. Deck Eight and the Gangway were completed, and at 08:23 the Reactor Lobby's caps closed the last room: eight whole turns with eighteen painted state variants between them, where that morning three were unfinished and Underwater was a stub with one note in it (090550a). Over the course of the day the user accepted the Gangway, Deck Eight, the Reactor Lobby, Underwater and the Escape Pod. The Infirmary and the West Wing were also finished and sent (fcb3156); both came back with changes.
- **Five variants that could never appear** (34e7e29, 06:35). The user flipped the Gangway's door switch and nothing happened. A variant hangs by the `state` field on its reference image, and none of the five registered that morning -- the Gangway's shut bulkhead and the pod's four door states -- carried one. They had been painted, measured, approved and registered, and not one of them could ever have been drawn. Worse, a change made hours earlier had hidden it, by treating a variant's `@STATE` suffix as proof the state was answered. `check_design` now makes a hung view with an `@` in its id and no `state` an error.
- **The pod's six complaints, and the re-cut** (08:48 to 12:25). The user reviewed the Escape Pod and sent back six items. The big blue block across the webbing was the safety web drawn as a placeholder over paintings whose nets are the web; the switch list came out in discovery order with duplicates, and is now the package's own narrative order, twelve boxes instead of fifteen (93985e0). Then the big one: the user asked again for the window on the wall opposite the webbing. Norm's own measurement of the 15th had already agreed with them, and the room had been settled the other way without their word, so it was undone (2c10fd5). The pod was re-cut round one web mass and one eye, ESCAPE-POD-WEB was deleted, and the whole room was repainted -- ring, caps, nine viewport states and four door states -- finishing at 12:24 with every overlap inside the bar and the seams improved as well (b11ee36).
- **The Kalamontee admin wing** (12:31 to 17:05). Six rooms moved. Admin Corridor South was finished -- six views plus a LADDER-ACROSS variant, eleven overlaps between 0.991 and 1.012 and 186 joins read with nothing raised (6cd6586). The Admin Corridor closed its ring and its caps and measures best in the wing, twelve overlaps between 0.993 and 1.006 (07a5505). Admin Corridor North did the same (d5f90ba). Its TURN-000 and the Admin Corridor's TURN-000 R2 are the same rift painted from opposite sides, and they were checked line by line against each other, which is the test those two rooms exist to fail. SanFac E's four views were made consistent (7b9b4d7), Systems Monitors' 110 and 270 registered with all seven status plates lettered, and the Plan Room's two maps registered as canon to the letter: "Kalamontee Kompleks" with its red "Yuu ar heer" arrow, and "Lawanda Kompleks" with one installation buried deep underground.
- **Name plates that sat on the thing the player needed** (09d786a, 17:21). Two of the user's own notes turned out to be one bug: a thing's name plate is drawn above its box, and above is wrong wherever what the player needs is right there. In the Escape Pod "set of controls" sat over the porthole the whole launch and descent plays out in; in Admin Corridor South "crevice" sat over the key lying in it. A `labelOffset` in metres now moves a plate, for objects and for globals alike. Both rooms went back to the user.
- **DR-112: the escape pod sequence rebuilt** (evening). The user playtested the opening sequence and asked for the pod sequence to be reworked from scratch, with a fifteen-beat storyboard of what the viewport should show. The beats map one to one onto the game's own turn counters, so no new machinery was needed to drive them. The rules changed first (b487d77), then the fabric (ac9bfdc): the console moved to the back bulkhead, the porthole enlarged to 2.4 x 1.1 m -- sixty per cent more pane -- and the webbing made half the pod, which is what canon says. ESCAPE-POD-WEB was restored.

**Decisions**

- The user: rework the escape pod sequence from scratch, to the storyboard they wrote. Three deliberate deviations from Infocom's text were agreed after a round of review and questions, and each is pinned by a test in `scripts/tests/pod.mjs`:
  - *The viewport no longer polarizes.* The source blacks the window out from turn 2 and makes it transparent "again" at turn 9, which is exactly the seven turns the descent is visible in, four thousand miles down to the surf. That existed to excuse a window a 1983 parser could not draw; this port draws it.
  - *The web holds you from the explosion to the thud.* The whole storyboard plays out through the viewport while the player is strapped in, so leaving is refused until the pod lands. The source's landing death, thrown against the sharper corners of the control panel, becomes unreachable. Knowingly.
  - *Standing is implicit.* The source is asymmetric: SIT is understood, but getting out demands the word STAND. Now anything needing the player out does it for them. The escape is a turn shorter, and LOOK no longer stands you, so looking round after the thud costs nothing, where a single look used to drown people.
- The user, on the pod's layout: webbing on the left only, the control panel on the back bulkhead, a large porthole on the right only, "it would be a shame to make the player see everything through a keyhole".
- The user, earlier in the day: move the "set of controls" text down, it is blocking the porthole.
- The user: the escape window after the landing stays exactly as the source has it. Correct play uses the whole of it and one stray LOOK drowns you; three fixes were offered and the user chose to leave it, so the code says so and says not to widen it quietly.
- Norm: a registration must match its delivered sidecar. Two mis-recorded lenses were approved by hand that morning -- the pod's TURN-000 registered at 93 where it was painted at 110, Admin Corridor South's TURN-170 at 120 where its sidecar said 110 -- so `check_design` now refuses any registration whose bearing, pitch or field of view disagrees with the delivered sidecar (eca602b). The rule then caught a third one, Norm's own, on Systems Monitors 110, before anything was built from it (6cd6586).
- Norm: the pod's TURN-000 is repainted at a true 110 rather than having the drifted 93 recorded as its lens. Greg argued for this against Norm's first instinct and was right: the repaint moved five overlaps back inside the bar and improved the seams, where recording 93 would have moved both caps and left the seams alone (f410887, b11ee36).
- Norm: Systems Monitors' eight status combinations become three composable single-strip overlays rather than eight near-identical full-wall paintings, as Greg proposed (ledger, 15:23). The same three strips are seen from two rooms, so the Admin Corridor and Admin Corridor North wait on them rather than going to the user.
- Norm: a room may carry an explicit `eye`, because the pod's two eyes are not in the middle of the box, as every other room's is.

**What was hard**

- **Nearly every instrument was confidently wrong about something.** Each one was settled by magnifying the actual boundary rather than by arguing about the number.
  - *A seam that was a panel joint.* A strip profile down Admin Corridor North's 090 and 270 joins reported the new part 2 to 24 points darker and 8 to 28 more saturated at every height, and `restore` reported a step. Two instruments agreeing, and the rejection was half written. Magnified five times, the texture, the rust streaking, the panel line and the eye-height band all run straight across the boundary: what both had found was a riveted panel joint about 26 px to the side, which a 40 px sampling strip straddles (c47aad9).
  - *A seam that was a doorway.* The same profile called the Admin Corridor's 263 join a 19-point brightness gap. The join falls where the Systems Monitors doorway begins, so the strip compares the doorway's dark interior against lit wall (7d37c45). A further two straight-line warnings in the same room are the same doorway's jamb; the two paintings overlap at exactly 1.000 (07a5505).
  - *A score that ranked invented texture above a correct wall.* SanFac E's 008 scored 0.244 on the blend band while carrying a dense embossed pattern the room does not have, and 0.195 once the pattern was taken out and the painting was right. The score is a correlation, so it can only measure edges that exist: inventing texture gives it something to hold. Read as a bar it would have rejected the right painting and passed the wrong one. This one produced a real fix -- `restore` now reports the band's own texture beside the score and says outright when the number is noise (6e897eb).
  - *A warning reported to the user as a real bug, which was not.* Norm told Greg and the user that the Admin Corridor had one real fault, the engine drawing a fabric prop over the painting. It does not: that warning comes from a static scan of the part list, which asks whether a part's condition holds and never whether the part can be seen, and a painted plate is drawn ignoring the depth buffer precisely so that it covers the fabric. Rendered and looked at, the painted ladder and the painted monitor strips are there and no grey box is. The correction was written into both rooms' metadata, with the instruction to confirm this warning by looking before acting on it (d5f90ba). What is real is smaller: the painted monitor strips cannot change, so a player who repairs all three systems and walks back still sees red.
- **A mistake of Norm's underneath two rounds of Greg's work.** SanFac E's two approved seeds do not share a surface: one wall carries 28.2 per cent edge density and the other 6.8. They had been approved as one kit on hue and saturation, without texture being checked, so Greg's first delivery followed one seed and his second followed the other, and both were consistent with something Norm had registered. Which was right was settled across rooms rather than by preference: Admin Corridor South's 080 is registered showing this room through the shared opening and reads 10.1 per cent, so plain concrete wins and the textured seed was the outlier. It went back to be flattened, with the verdict saying plainly whose mistake it was (6e897eb, 7b9b4d7).
- **A room deleted, and the user reporting the symptom three times.** ESCAPE-POD-WEB, the art-only second eye inside the webbing, existed on the user's decision of the 15th and was deleted in the morning's re-cut in favour of a single eye. The user then reported three times that the camera does not move when you get into the webbing. It did not, because the room that moved it had been deleted. It was restored that evening (ac9bfdc). Worth recording as it happened.
- **Two review tools that could not show what they were asked to show.** The switch sheet renders only the varied views, and the pod's survival kit and towel stand at bearings no varied view covers, so no row of that sheet could ever have shown them; they were checked by driving the page round to 240 instead (06ea054). And the four-stage climb out of the sea drew at identical brightness on the review page, because the page did not pass the game object that a state grade needs to evaluate its condition. The real game had been grading correctly the whole time (3fb0e81). A review tool that quietly cannot see a state is worse than none, because the absence reads as the room being wrong.

**Built**

- `scripts/sprite.mjs`: the step between a delivered sprite and the runtime -- trim, resize and downsample on premultiplied colour, so transparency does not drag a dark fringe into the edges. With a test (06ea054).
- `restore`'s `BAND_TEXTURE` line in `scripts/lib/views.mjs`: the blend band's own texture beside its score, and a plain statement when the number is noise, calibrated on five views whose rightness was settled by looking (6e897eb).
- `check_design.mjs`: a registration whose camera disagrees with its delivered sidecar is an error (eca602b); a hung view with an `@` in its id and no `state` field is an error naming the condition to set (34e7e29).
- `review-room.mjs`: where the lens fitter trusts no view, the overlap residuals are annotated unreliable and the room is judged on its contact sheet -- for rooms of fog, water and rounded rock (581a9c1). Its "fabric drawn in front of the whole painting" warning is now documented as a static scan to be confirmed by looking (d5f90ba).
- The review page (`dashboard/uat.js`) and compare mode: state grades are evaluated, so a room's own lighting states show (3fb0e81); switches are collected in the package's narrative order, with two switches that read the same collapsed into one (93985e0, 06ea054).
- `scene/graybox.js`: `labelOffset`, in metres, moves a thing's name plate off what matters. It works for objects and for globals, and may be given alone, with no position (09d786a).
- `scene/lighting.js`: a room may author its own fog -- colour, near and far -- which also serves as the background in an enclosed room, and `sea` takes `fog: true` for the one room that looks at the surface from underneath (9c23f3f).
- `wwwroot/rules/`: `heldInVehicle`, a hook saying when a vehicle will not let go, so that "Take all" excludes what is outside the vehicle only while the player really cannot leave it (b487d77).
- `scripts/tests/pod.mjs`: a suite pinning the three DR-112 deviations, which are each easy to undo by accident (b487d77).
- `scripts/browser.mjs`: three faults fixed in the gate itself -- a race that killed a run before a single check, a by-design 404 counted as a failure, and a cascade of 270 failures from one race, now diagnosed rather than merely counted. Checks passing went from 0 to 105 and failures from 271 to 193 (12499c6, b11ee36).
- Scene files may carry an explicit `eye`, for a room whose viewpoint is not the middle of its box (ac9bfdc).

All of these are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Gangway, Deck Eight, Reactor Lobby | Accepted by the user |
| Underwater | Accepted, with the climb out of the water and the sunken pod added on the user's notes |
| Escape Pod | Accepted for its look on the 16th; its sequence and fabric now being rebuilt under DR-112 |
| Admin Corridor South | Finished: six views and the LADDER-ACROSS variant; with the user since 17:21 |
| Admin Corridor, Admin Corridor North | Six views each, measured whole; with Norm, waiting on the three monitor-strip overlays |
| SanFac E | Ring consistent with itself: 098 R2, 280, 008 and 190 registered; caps next |
| Systems Monitors | 110 and 270 registered; three guides and the strip overlays with Norm |
| Plan Room | Both maps registered; two guides to come |
| Infirmary, West Wing | Whole and sent; back from the user with changes (object renderings, and day/dusk/night) |
| The mech wing's eleven rooms | Seed pairs delivered through the evening, with Norm for review |

<!-- through: git ac9bfdc · mail 20260916-230750-design-0235 -->

## 2026-09-16 -- The escape pod rebuilt, and the room the game never drew

The evening of the 16th and the small hours after it went to one request. DR-112 is the escape pod scrapped and built again to a storyboard the user wrote after playing the opening, and by 22:25 both of its packages were finished and work stopped, at the user's instruction, for both agents. What changed for a player: climb into the safety web now and the camera moves in behind the webbing, and the porthole runs the whole launch and descent -- the pane black against the bore of the ejection tube, the Feinstein coming apart in two beats, the planet closing from four thousand miles to five hundred, entry at fifty miles and at five, the ocean, the islands seen from above, the cleft, the water rising, and under. None of that was on screen when the evening began, and one of the reasons it was not is the best thing this session found.

**What happened**

- **Two packages for one room.** ESCAPE-POD-WEB, the seat inside the safety web, is an art room: one master frame and fifteen state variants, the launch and the descent entire. A player strapped into a web cannot swing round, so its view is clamped to about 40 degrees either side of the porthole, which fits inside a single 110-degree view, and it needs no ring and no caps (9ea7e0f, 820c665). ESCAPE-POD, the eye standing on the floor, was re-cut: a ring of four at 110 degrees with UP and DOWN caps at 131, and eleven state variants (3ed3f44, 820c665). Its twenty-five previously accepted views were not sent back but recorded as superseded, with their files, because the room they were of no longer exists (9ea7e0f).
- **The layout the user described, on screen at last.** TURN-270 is the room as you meet it coming in from Deck Nine, facing west: webbing on the left, the control panel on the back bulkhead, the porthole on the right (f55ed81). The porthole is 2.4 x 1.1 m, sixty per cent more pane than before.
- **The bug that mattered most was in the engine, not the art.** ESCAPE-POD-WEB was built, painted, checked and registered, and the game never drew it. Fixed at 21:50 and verified in the running game (238dea6). It has a section of its own below.
- **Deck Nine's glimpse, right at the third attempt.** The view through the open pod door had been painted twice against a pod that changed underneath it. It was re-edited through the POD-MOUTH mask only and measured against the accepted R4: exactly zero pixels differ outside the doorway and 55,559 inside it, so Deck Nine itself is untouched (4de79db).
- **Four faults that no checker here could see**, three of them in which states exist rather than in any painting, and one of them Norm's own arithmetic. Also below.
- **Then both agents stopped.** The user asked for the pause, Norm wrote the line it falls on into the mailbox before the last batch of work began -- the sixteen states, the aisle ring, the Deck Nine glimpse, and nothing after (dev-0256, 20:22) -- and the final commit records that the queue is idle on purpose (820c665).

**Decisions**

- **The user, after playtesting: scrap the pod and build it again**, to a fifteen-beat storyboard of what the viewport should show. Their layout, in their own words, as you meet the room from Deck Nine: webbing on the LEFT only, the control panel on the BACK wall, a large porthole on the RIGHT only, and the camera moved BEHIND the webbing when you climb in -- which they said they had asked for several times already, and they had. They also asked to be shown the images as previews while they came.
- **The user's four rulings on how the sequence works.** Cut the viewport's polarization, so the descent is visible at all; an art-only second room with a narrow view clamp for the seat inside the web; the web refuses to let the player out until the pod is down on the cleft; and get rid of the stand-up mechanic, since sitting down happens implicitly. The three that are deviations from Infocom's text are each pinned by a test in `scripts/tests/pod.mjs`, written the same evening (b487d77), because each is easy to undo by accident and each contradicts the source.
- **The user: both agents stop when the pod and the glimpse are delivered.** Not "finish the queue first" -- park DR-106, park the mech wing, go idle. Norm passed it on with the stopping line spelled out so both would stop at the same place, and with the instruction that anything needing a decision neither agent could make was to be reported rather than chosen (dev-0256).
- **Norm: only a painted art room is routed to.** Sending the camera to an art room the user has not accepted would put its graybox on screen in place of a room's finished paintings, which is worse than not moving the camera at all, so a room falls back to itself until its pictures are accepted. ESCAPE-POD-WEB was therefore marked accepted by Norm so that its paintings hang, with the reason and the way to undo it written into `room-status.json` (238dea6).
- **Norm: a window has to read as a hole.** The kit gained a `viewport-glass` material, near black on purpose, and the pod's pane uses it. It is true as well as convenient: the base state of that pane is black, the bore of the ejection tube a hand's breadth beyond the glass (51595e7).
- **Norm: a state may be relit as hard as the story wants; its geometry may not move and its texture may not be regenerated.** The Feinstein blowing apart ought to light the cabin, and the planet's glare ought to light it differently again. The first cut of the rule demanded pixel identity outside the glass and failed three correct paintings for being right; the brief was too strict and Norm had written it (87292e6).
- **Norm: the second pod on the sea floor was a request that geometry forbids.** The user had seen two pods in Underwater, and there were two. Each variant was diffed against its own base and the centroid unprojected: the level view puts the pod at bearing 162.6 and elevation -7.7, the cap at 146.2 and -50.5. Sixteen degrees apart in bearing is not one object. A 131-degree cap reaches -24.5 on its axes, so it cannot see the pod at all, and the only way to paint the cap variant Norm's own DR-111 had asked for was to invent a nearer one. The cap variant is withdrawn, the arithmetic is in the metadata, and the underwater suite now checks that no such variant comes back (ceaf300).
- **Norm: the provisions panel needs a third picture.** `I-POD-TRIP` puts the survival kit and the towel in the room on the same turn, so from the thud until one is taken both single-object conditions hold and the engine picks arbitrarily between them. PROVISIONS-BOTH hangs on both conditions together, and two leaves outrank one (7e9bb46).
- **Norm: a wrong cabinet beats a shut one.** TOWEL-PRESENT R1 was left hanging while it was re-cut, because unregistering it falls back to the base view, with the panel closed at a point in the game where it has certainly opened (92de636).

**What was hard**

- **The safety web's eye was built, painted, checked, registered -- and never drawn.** The user reported in play that "get in" did not move the camera and that nothing showed in the porthole during the fall. Both were one cause. Climbing into the webbing does not change room, because SAFETY-WEB is a vehicle inside the pod (VEHBIT and CLIMBBIT, `globals.zil` 950-956), and `game.js` keyed the scene, the ring, the lighting and the eye off `g.state.here` alone. `viewOf`, the field by which an art room names the game room it is a second eye on, was read only by the review page and the checkers: the runtime had never heard of art rooms. So the player climbed in, the camera stayed standing in the open strip, and the entire storyboard hung on a room nothing ever rendered. Nothing failed, which is what made it expensive. The fix gives the link both halves: the art room names its game room in `viewOf`, the game room lists it in `altViews` with the condition that selects it -- for the pod, the adventurer being in SAFETY-WEB -- and `game.js` resolves a view room on every render and takes its scene, its ring, its lighting and its eye, provided it is painted. Verified through the real game page rather than headless: standing, the eye is 1.6 m up; in the web it is 1.2 m and the game room is unchanged; and the porthole runs the beats as the counters tick. `scripts/tests/artroom.mjs` pins it (238dea6).
- **A number is a question and the picture is the answer, four times over on one room.** Measuring how fast the planet grows through the pane defeated four reasonable instruments in a row. Counting pixels that differ from the master reads 99 per cent for two different beats, because the starfield differs too. Counting lit pixels undercounts a dim far disc. The largest connected region caps out at a single strap cell, because the webbing cuts the pane into six. A fixed-threshold span is defeated by an atmospheric halo: it read PLANET-3000 at 501 px edge to edge and Norm rejected a painting that was right, having earlier set a size target in a unit the instrument could not measure. The span at half the state's own peak brightness is the one that works -- relative to each state, so a dim far planet and a bright near one measure alike, and a halo falls below half-peak and drops out. On it the approach reads 41, 143, 326, 499 and 501 px across beats 5 to 9, strictly growing and then carried by the scale of the surface once the planet fills the pane. Greg's instinct on that file was right before any of the four numbers were, and Norm said so in the verdict: "you should have had one round on it, not three" (c4eb779, a00e392, dev-0264). All four measures and why each fails are recorded in the package, because the next painted sequence will face the same question.
- **Four faults no checker here could see.** Three were in which states exist rather than in any picture. IN-WEB, a variant of the standing eye for being in the webbing, became unreachable the moment the art-room routing made the camera move, and was always a picture of something impossible -- you cannot stand on the floor and be in the web at once; it is deleted with the reason naming the routing, so removing the routing makes it paintable again and nothing else does (4de79db). OPEN-FLOOD duplicated FLOOR-WATER's condition character for character, so one of the two could never be chosen, and what it painted -- the door open on rock and sea with the floor still dry -- is a state no turn holds open: played from the landing, standing takes SINK-COUNTER to 1, opening the door takes it to 2, and the sentence that opens the door is the water arriving, "The bulkhead opens and cold ocean water rushes in!" (0d363e2). TOWEL-PRESENT R1 drew a different cabinet from its two siblings, another hinge and a deeper recess: over the door and frame, where no change of contents should reach, it differed from both by 73 per cent of the pixels where those two differ from each other by 26, so in play the panel would have changed shape as the player took the survival kit out of it. R2 was re-cut from PROVISIONS-BOTH by removing the kit, which is literally the move the game makes, and the three now share one cabinet (92de636, 820c665). `check-seed` asks whether a painting matches the geometry and `check-state` asks whether a variant moves the room it departs from; neither can ask whether the game reaches a state, or whether two states collide, or whether siblings agree with each other. Only reading what the rules do on the turn in question, and laying the siblings side by side, found these.
- **The fourth fault was Norm's own, and it moved every view of the room.** The pod's package declared its eye at [0, 1.6, 0] while the fabric writer carried a different value, and Norm "corrected" the metadata to match. It was not a contradiction: the writer shifts every part by that eye when it writes the scene, so the scene already has the eye at its origin. Setting it again moved the camera 0.30 m, standing it 0.85 m off a 2.4 m pane instead of 1.15 m. Six blockouts were rendered from the wrong camera and sent, and a seed pair was painted from them before anyone looked at a render; the views moved between 47 and 81 per cent of the frame. It was caught by looking at the painting rather than at the numbers -- TURN-000 had no rim and no jambs and the pane ran edge to edge, and a 2.4 m pane at 1.15 m subtends about 92 degrees of a 110-degree lens, so it cannot reach the frame edges. All six blockouts were re-rendered and both seeds thrown away and repainted. The package now states which fields are scene coordinates and which are room coordinates, and warns the next reader off the same fix (5a680b3, f55ed81).
- **A window drawn in wall grey put a porthole where one could go.** Greg's first master frame for the seat inside the webbing had a round porthole at the right edge of the frame, mostly cut off, where the spec asks for a rectangular pane dead centre. He painted exactly what he was given: the blockout drew the pane in the same grey as the wall around it, so from the seated eye, through the safety net, it was one more pale panel among pale panels. `check-seed` passed it at 1.42 invented and 0.65 dropped -- a pane in the wrong place and the wrong shape is not a thing that number can see. Norm had also rendered that blockout, described it to the user as the seat looking across the net at the porthole, and sent it on (51595e7).
- **The near field was being repainted instead of reused.** The first three state variants came back with the right thing inside the glass and every strap edge and speck of grating very slightly different from the master's. Each frame alone looks right, which is why it needed measuring: the player sits in this one frame for fourteen turns, longer than anywhere else in the game, and re-rendered texture would make the room crawl every time the counter ticks. `check-state` was calibrated on the master itself rather than guessed -- a pure relight scores 0.994 to 1.000, a one-pixel shift 0.701 and a two-pixel shift 0.595 -- so 0.95 separates them with room to spare, and the batch's 0.842 to 0.860 was neither. Rebuilt as glass-only composites over the registered master, all sixteen states hold the near field at 1.000 (87292e6, dev-0257).

**Built**

- `scripts/check-state.mjs`: compares a state variant's near field to its master by structure rather than colour, and reports the relight separately, so a state may be lit as hard as the story wants but may not move or be regenerated. The glass region is taken from the fabric automatically, now that `viewport-glass` makes the pane the one near-black thing in a blockout, so Greg can run it himself before delivering (87292e6).
- Art rooms in the game itself: a scene's `viewOf` names the game room a second eye belongs to, the game room's `altViews` lists the art room with the condition that selects it, and `game.js` resolves a view room on every render, taking only a painted alternative. `scripts/check_scenes.mjs` validates both halves and `scripts/tests/artroom.mjs` pins them -- every link in both directions, an art room no room routes to being the failure it tests for, the pod's own condition against a real game, and each of the sixteen beats resolving to exactly one state (238dea6).
- `scripts/check_design.mjs` understands an art room: a package may name a room `world.json` does not have, provided its scene says whose view it is. Without that, ESCAPE-POD-WEB could not have been a package at all (9ea7e0f).
- `scene/materials.js`: `viewport-glass`, near black on purpose, so a window reads as a hole in every blockout from now on (51595e7).
- A `supersededImages` block in room metadata: the honest form of "scrap what we've got". The record of what was painted and approved survives with its files, and no tool will build from it (9ea7e0f).
- `scripts/tests/underwater.mjs` checks that the DOWN cap has no pod variant and re-derives the arithmetic that says why (ceaf300).

All of these are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Escape Pod | Rebuilt whole under DR-112: four level views, two caps and eleven state variants, every state the game can reach. With the user |
| Escape Pod Web | New art room, complete: one master frame and fifteen states. Accepted by Norm rather than by the user, so that its paintings hang; the dashboard note says why and how to put it back for review |
| Deck Nine | The glimpse through the open pod door re-edited a third time and registered, agreeing with the pod's own TURN-270 |
| Underwater | The second pod on the sea floor withdrawn from the DOWN cap; the level view untouched |
| Reactor Access Stairs, Reactor Elevator | Seed pairs delivered and with Norm, then parked at the stop |
| Everything else | Parked. DR-106, the mech wing and both agents' open lists are idle at the user's instruction |

<!-- through: git 820c665 · mail 20260917-022458-dev-0272 -->

## 2026-09-17 -- What Norm can take from Greg, and what he cannot

Greg ran low on tokens, and the user asked whether Norm could take some of his work. The answer was settled by trial rather than by assertion, and it is: the mechanical envelope around painting, yes; the painting itself, no. Nothing a player sees changed because of that finding. What changed is how the rest of the rooms will be made, and what the limit on that is -- because the half Norm cannot take is the expensive half, so the token problem cannot be solved by moving work across. It can only be made cheaper per round.

The morning before the question came up was spent finishing the pod work in play and clearing the backlog that had built up behind it: thirty-seven of Greg's seeds reviewed and registered across sixteen rooms, four faults found by playing rather than by measuring, and the release put on a timetable.

**What happened**

- **The pod's last two faults came from playing it.** After the safety web became a room the game actually draws, the first frame after climbing in was still graybox. The nest is painted as a single frame -- the saving that pays for sixteen states of the descent -- and the yaw carries over from the room the player came from, which has a ring of four, so they can be facing anywhere. A room that registers exactly one level view is now clamped to it, and the allowance is computed per frame from the camera rather than declared, so it cannot fall out of step with what was painted. Of the 27 accepted rooms exactly one is affected (e9044a9). The ceiling and floor were still blocky afterwards, which was a second fault of the same kind (3004c34, below).
- **A ladder you could take but not see.** `largeObjects` was doing two jobs -- "the picture already draws this" and "something big lies here" -- and the design page read the second as the first, suppressing the object's own box in every painted room. The ladder is listed in eight rooms and painted in one. Storage West, where the ladder starts, is accepted and painted, so the first thing a player has to find in that part of the game was invisible. Each package now says which of its large objects the picture has, and when: always, only in a named state (`paintedWhen`), or not at all (36b0f66).
- **A switch whose picture changes somewhere far off now says so.** The Admin Corridor South ladder is painted, and the toggle does work, and it is 66 x 49 px of a 1672 x 941 frame. The review page tags such a switch "glimpse", with the size and the arc measured from the pictures themselves (a5c7239).
- **The backlog cleared.** Eleven asks closed whose views had been registered during the pod work and never answered (dev-0274), then twenty-nine seeds registered in one pass -- Transportation Supply, both offices, the three Mech Corridors, Storage East, Physical Plant, the Tool Room, the Machine Shop, the Robot Shop, Reactor Control, the Reactor Access Stairs, the Reactor Elevator, Admin Corridor 000 and SanFac E 098. Every one passed `check-seed` against its own blockout and every one was looked at as well as measured, in four contact sheets (822034b, dev-0275).
- **Three charts of the work itself**, asked for by the user: the cumulative flow of every ask ever raised, the same flow weighted by a retrospective estimate of each ask's size, and how long an ask waits to be answered (a2c413c, 0829752). They are on [How we work](how-we-work.md#the-flow-of-asks), and the clock behind them was wrong at first (below).
- **Then the handover trial**, in four parts, each tried rather than argued. Compositing, cameras and checking moved to Norm and are recorded below under Built. Image generation did not move, and that is the finding that matters: `underpaint.mjs caps` on SanFac E, the most favourable case available, produced two caps that are 69 per cent real accepted pixels projected in and 31 per cent a flat quadrilateral of blockout colour, sitting in the centre of each cap -- exactly where a player looks when they look up or down. They were not registered.

**Decisions**

- **The user: find out whether Norm can take some of Greg's work, and tag the point before it.** The git tag `design-handover-point` marks 070fd68, the commit before any of the trial, at the user's request, in case it shows a quality loss that needs Greg back. `scripts/release.mjs` now pushes `--follow-tags`, so the rollback point travels with the release instead of living on one machine (bf7993c).
- **The user: Norm's work on Greg's side is logged, not done quietly.** "i want to make sure you are getting credit" (17 Sep). So the four rooms say on the dashboard what Norm did to them, and dev-0277 records it in the mailbox, even though Greg is stopped and needs no answer.
- **The user: Greg stops, and nothing is owed.** Norm wrote the pause into the mailbox with the queue's exact state, so that whoever picks it up -- Greg or another session -- does not have to reconstruct it, and named the smallest possible thing that would finish the eight held seeds: one sidecar each, no repainting and no re-cutting (dev-0276, 09:01).
- **The user: release morning and evening, once each, if there have been commits.** `scripts/release.mjs` is what the schedule runs, and it is written to refuse rather than to publish something wrong, because a push is public and cannot be taken back (b26baea).
- **The user, on distant details: label the toggle.** "whenever i complain about a object missing because the toggle isn't working, it could be for this reason ... so maybe for all objects like this going forward (and backward) label the toggle like (glimpse)" (17 Sep). It was the third time a correct but tiny painted change had been reported as a dead switch.
- **Norm: measure the lens, never type it.** Eight of Greg's seeds were checked and good but could not be registered, because the delivery carried no sidecar saying what camera each was painted at. Three views in this port have been hung at a lens somebody typed from memory. So each was established by evidence instead: the seed passes `check-seed` against its blockout, the blockout can be re-rendered, and an exact pixel match between a re-render at a candidate lens and the delivered blockout pins it. Six came out at 110 and Plain Hall's two at 120 -- its ring is 324/067.5/171/256 at 120 with caps at 128 -- so the batch default would have mis-hung both (bf7993c).
- **Norm: do not register a picture with a hole in the middle of it.** The SanFac E caps were derived, not invented -- a cap is a projection of the level views, which is why it was the fair test -- and they still came out a third bare.
- **Norm: fan out onto the rooms with no geometry at all.** Of the rooms still unpainted, 32 have a full ring and caps, 25 a partial ring, and 21 nothing; of those 21, one has a scene written, seven are cut and need only a `SCENES` entry, and thirteen have no geometry whatsoever. Blockouts are the one part of the pipeline that needs no image generation, so Norm took the thirteen, in order that Greg returns to a queue he can paint straight through rather than to a wait (Norm's survey, 17 Sep).
- **Norm: ask rather than guess about the ladder.** TRANSPORTATION-SUPPLY-194 was held back out of the batch of twenty-nine. Greg's note asks for it to be registered "with LADDER-FLAG true", and the room does carry a LADDER-ACROSS state; but the flag is false for the whole first half of the game, so if the ladder is visible in the picture the seed is a variant and a base is still owed. One sentence from Greg settles it, and it is still open (dev-0275).

**What was hard**

- **The thing Norm cannot do is the thing that costs.** Norm has no image generation. The trial was set up to be as favourable as possible: SanFac E has a complete four-view ring and no caps, and a cap is derived from the level views rather than invented. The result was 69 per cent real pixels projected in exactly, and 31 per cent a flat quadrilateral of blockout colour in the centre. So the division is: Greg makes pixels, Norm does everything else. Where Norm substitutes, the result is measurably identical -- the `through` round-trip below is within 0.35 per cent of Greg's own delivery. Where Norm cannot, the failure is a hole in the middle of the picture rather than a subtle drop in quality, which is the better way to fail, but it means the budget cannot be relieved by shifting work. It can only be made cheaper per round: by Norm's count on 17 September, 122 of the 454 images Greg has ever sent -- 27 per cent -- were re-cuts, and a large part of that was mechanical rather than artistic.
- **A number guessed where it should have been derived, twice in one morning.** The safety web's horizontal turn limit was worked out properly from the camera; the vertical one was a hard-coded 0.35 radians, about 20 degrees, where the arithmetic gives under 4. A single-view room has no caps, so there is no painting above or below at all, and twenty degrees of allowance walks five times past the edge of the plate onto bare fabric -- which is the blocky ceiling and floor the user reported. The vertical limit is now derived the same way as the horizontal, and the picture's shape is measured off the hung plate's own texture. Entering while looking up or down holds at 0.066 radians, the 3.8 degrees the arithmetic predicts (3004c34).
- **The charts' clock was four hours out.** A message id is UTC, built from `toISOString()`; every message also carries `at`, the local time it was written. Across the mailbox the id runs four hours ahead of `at` in 538 messages and level with it in exactly one -- the very first, made before the id format settled -- and that single exception had been read as the rule and cited as the evidence for it. Every day boundary on the charts fell at 20:00 the evening before, and the first ask was drawn as waiting 4h22m when it waited 22 minutes. `at` is now the authority and the id only the fallback, which needs no timezone arithmetic and no assumption about EDT against EST (2f6d7bc).
- **Sidecars written beside the wrong revisions.** The first pass at registering the eight seeds wrote each sidecar beside whatever revision a directory glob found first. A package's reference folder holds every round, so that put R1's sidecar where R3 was the delivery; only the message says which round was sent. Corrected, and the four misplaced files taken back (dev-0277).
- **Work nobody asked for does not appear on the charts.** They count asks between the two agents, so Norm doing Greg's work raises none and shows as nothing. That is the limitation `scripts/lib/asks.mjs` already states at the top of itself, and the handover is now its clearest example (bf7993c).

**Built**

- `scripts/precheck.mjs`: every check a picture must pass, in one command, deciding from the file itself rather than from a flag -- is there a sidecar with bearing, pitch and lens; `check-seed` against the blockout; `check-state` against the accepted view; and one check that did not exist before, whether a variant agrees with the other variants of the same view. `check-state` only ever compares a variant with its base, which is how a provisions panel came to change shape as its contents were taken out. Written on 17 September and not yet committed when this entry was written.
- `scripts/graybox-view.mjs` now writes a sidecar beside every blockout it renders -- room, bearing, pitch, lens, size -- so the camera is recorded at the moment the picture is made. It closes the class of problem that held the eight seeds: a seed painted from a blockout can now be registered straight from that file, and Greg need never produce a sidecar again (bf7993c).
- `scripts/release.mjs`: the release on a rhythm. It refuses unless the branch is main, the remote is reachable, there is at least one commit the remote lacks, `build-site.mjs --dry --tracked` passes and every test file passes. The `--tracked` gate is the one that matters, because the release builds from a clean checkout and a painting that was never committed ships its room unpainted. Uncommitted work is reported but does not block; nothing to release exits 0. It pushes `--follow-tags` (b26baea, bf7993c).
- `scripts/mail-flow.mjs` and `scripts/lib/asks.mjs`: the three charts of the mailbox, with the retrospective sizing rule stated where it is used and a note at the top of what a mailbox cannot see (a2c413c, 0829752, 2f6d7bc).
- The review page's "glimpse" tag, measured rather than declared: each variant is drawn against the view it departs from and the changed area counted, and under one per cent of the frame is a glimpse, with the size and the arc in the tooltip (a5c7239).
- `paintedWhen` in a package's `largeObjects`, held by `scripts/tests/design.mjs`: whether a picture has a large object cannot be inferred from the object, so the package has to say (36b0f66).
- `underpaint.mjs through` proved as a substitute for a scoped repaint: Norm round-tripped an escape pod state through it, holding 1.000 on `scripts/check-state.mjs` -- the same gate Greg's deliveries face -- and landing within 0.35 per cent of the version Greg had delivered, the difference being a slightly different feather at the opening's edge.

All of these are in [Tools](tools.md). What the division of labour now is, and why it cannot move further, is on [How we work](how-we-work.md#what-norm-can-take-from-greg-and-what-he-cannot).

**Rooms**

| Room | Where it stands |
|---|---|
| Rec Corridor, Rec Area, Corridor Junction, Plain Hall | Metadata corrections confirmed, then eight seeds delivered, checked and registered, each one's lens established by re-rendering. With Norm |
| Transportation Supply, both offices, the three Mech Corridors, Storage East, Physical Plant, Tool Room, Machine Shop, Robot Shop, Reactor Control, Reactor Access Stairs, Reactor Elevator, plus Admin Corridor 000 and SanFac E 098 | Twenty-nine seeds registered in one pass. Reactor Control 161's gauge bank is the best instrument panel in the game so far; Reactor Access Stairs 315 and Storage East 106 are bare walls, registered as they are |
| Transportation Supply 194 | Held on a question: is the ladder actually visible in the picture? Open, and Greg's when he returns |
| SanFac E | Its two caps were attempted by Norm and not registered: a third of each is blockout colour |
| Escape Pod Web | The single-view clamp and the vertical limit fixed in the game, on the user's reports from play |
| Storage West, Kitchen, Mess Hall, Mess Corridor, Tool Room | The ladder is drawn again where no painting has it |
| Thirteen rooms with no geometry | Blockout work begun by Norm, so that Greg returns to a queue he can paint straight through |

<!-- through: git bf7993c · mail 20260917-131334-dev-0277 -->

## 2026-09-17 -- The afternoon: nineteen rooms made paintable, and three gates put right

This entry fills a gap. It covers the afternoon and early evening of 17 September, from 12:11 to 19:46 EDT, which the next entry skipped past. The morning had ended with Greg stopped and Norm starting on the rooms that had no geometry at all. By early evening those rooms, and five more in Lawanda, had gone from nothing to seeds: packaged, cut, blocked out, painted by Greg and registered. Greg came back at about 15:50 to a full queue.

For a player, the afternoon's changes were small but real. Name plates no longer pile up on each other. The climb out of the sea shows how far up you are, and the compass buttons stay in the same place from room to room. For the work, the checks that every picture passes were themselves checked, and three were found wanting.

**What happened**

- **Fourteen rooms, from nothing to seeds.** These were the tower top, the descent to the Kalamontee shuttle, and the Alfie shuttle and its two cabins. Three agents wrote their packages in parallel, on the user's instruction to fan out, and Norm did the Tower Core, the hub no agent owned (c71df49). The rooms were cut with the area builders, bringing 63 of the game's 105 rooms to a scene where there had been 49 (7e21721). Then came 84 blockouts (03921b5) and DR-113 in the ledger, with one ask per room (199d931). Greg painted all fourteen seed pairs between 16:03 and 18:13 (design-0267 to design-0280). Norm registered them and laid the underpaintings for each room's last two ring views. All 28 of those came out 52.4 per cent new. That is geometry, not coincidence: two seeds 180 degrees apart and new views at 90 between them overlap by exactly that much (e3b97a4, dev-0300 to dev-0313).
- **Lawanda's five, the same way.** The Repair Room, Planetary Defense, Planetary Course Control, the Library Lobby and Physical Plant Two got a geometry pass, so their views are planned from their own openings (4d6459e). They were cut from the one Lawanda layout, bringing the count to 68 scenes (00e09f3), and blocked out, 30 renders (a652877). DR-114 was filed (c027c57). Greg painted the ten seeds by 19:09 (design-0281 to design-0285), and they were registered at 19:44 (c9d698f).
- **The user's list from play.** Name plates are now laid out each frame and the ones that would overlap are dropped, with the one under the cursor kept. The pod's "set of controls" plate moved off the porthole onto the back bulkhead. Rooms in the dashboard's "Ready for your look" queue became links, and the site got a favicon (a04aeb5).
- **The climb out of the sea.** Playtesting the opening, the user clicked the same button until something changed, and one click more took them back into the water. On the Crag a single step back down drowns you. The status line now reads "depth 3 of 3" up to "at the surface". The compass is a rose with fixed slots, so UP is in the same place at every depth and on the Crag (bf9f499).
- **Lamps that went out.** A package that authors its own lighting replaced the scene's guessed lamps, and since scenes now carry their neighbours' geometry, that rule was also removing the neighbours' lamps. Seven rooms were losing light, four of them accepted and painted; the Gangway lost eleven of thirteen. Every area builder now stamps a neighbour's lamps with the neighbour's id, and only unstamped lamps are replaced (deb9b3c).
- **The browser walkthrough made trustworthy.** It had used the user's own port and build. A killed run left an orphaned server holding the game's DLL for over an hour, until the user's build failed. It now uses the shared review server and refuses port 5012 (1b69439). Its long run of failures turned out to be one race: a walk rebuilds the scene after moving the player, so the tool was reading the room just left. It now waits for the game to report which room it has drawn. The run went from 218 failures in 245 steps to 298 steps with none (c935077).
- **The dashboard's history backfilled from evidence.** Eleven accepted rooms had every earlier stage blank. Each stage is now dated by the first commit that carried what that stage produces, and never at or beyond the stage a room has actually reached (382b8e9). What stayed dark was honest: 28 rooms had no package at all.
- **Greg handed the metadata back.** At 19:33 Norm wrote "You are idle and I am the bottleneck". It returned the metadata pass to Greg: 25 Lawanda rooms with no package, in dependency order (dev-0299). The first two, Project Corridor West and Project Corridor, were approved within minutes (dev-0334, dev-0335).

**Decisions**

- **The user: fix the Tower Core's unguarded exit.** The source lets "north" at the top of the tower step into the car wherever it is. Nothing in the finished game reaches that state, but the user's decision was to fix it. The guard is a rule rather than an edit to the generated world data (221b11c).
- **The user, on the tower's look.** The Comm Room keeps its 45-degree turn. The Observation Deck needs no painted flood variants (c71df49). The Helipad overhangs the Observation Deck "and we live with it", so the deck's up cap is the pad's underside, not sky (e643d21). The Escalator and the Fork stay where they are (af52f62).
- **The user accepted the Escape Pod Web**, recorded through the dashboard's accept route. That replaced Norm's workaround acceptance of the same morning (1ddf458). The user also accepted Admin Corridor South on 17 September, on the dashboard.
- **Norm chose the method for the fourteen.** The user left it to him. He chose the area builders, not hand-written scenes, because a glimpse through a doorway is only right if it is the neighbour's own geometry, and all fourteen open onto each other (7e21721).
- **Norm: the Tower Core has six lamps.** Canon does not decide it. The package's four and the fabric's two were never two halves of one scheme, and both neighbours paint a ceiling lamp through their doorways, so both sets are now authored (e643d21).
- **Norm: leave the black blockout rather than patch it.** In the Escalator's shaft the lamps sit above the soffit they hang from, so the UP cap blockout is entirely black. Moving them would change fabric behind the accepted Lawanda Platform painting, so Greg was told not to paint that cap until the user settles it (03921b5, dev-0292). This was still open at the end of the session.
- **Norm: give the metadata back to Greg.** That was the morning's handover reversed. Greg had come back and was out of work, and Norm was the bottleneck (dev-0299).

**What was hard**

- **Five closures claimed work that had not been done.** Norm closed nineteen of Greg's deliveries with a script that picked them by words in their subjects. "seed pair" matched the five Lawanda rooms as well as the fourteen tower rooms. Five messages said the seeds had passed the pre-delivery check and been hung when neither was true, and quoted the other rooms' measures. Norm did the work, all ten passed (worst 1.59 against the 1.8 flag), and wrote to Greg plainly: "if any of those five had FAILED you would have been told it passed" (dev-0333, 19:40, c9d698f).
- **The three gates.** The pre-delivery check had given six false alarms and had no test. Among them, it read a request number as a bearing, and it took a comp for a base view at 000. `check_design` let three real geometry faults through in a day:
  - a lift and its landing were never compared, which is how the Helipad's boarding doors drifted to 2.4 m against the Helicopter's 3.2 (f383a3d);
  - a diagonal `wall` was not held to its own quadrant, so the Observation Deck named its doorway by the core's name for it;
  - a room's exits were never compared with its own openings, which is how the Repair Room's stair mouth came to open 1.1 m below its own flight (4d6459e).

  And nothing compared the Lawanda Platform's two copies. All three gates were fixed and pinned. Two candidate checks were thrown away because they fired only on correct rooms (af52f62).
- **A test that could corrupt a package when killed.** The design test perturbs two real packages on purpose. A `finally` block covers a throw but not a kill, and the release kills any test that runs past five minutes, which had happened three times that day. The original is now written beside the file first and restored before the next run starts (c9d698f).
- **A release that hung in silence.** The first real release sat in its test loop for 72 minutes, with nothing on the console and nothing sent to the user. Each test file now has a five-minute limit, and a hung test holds the release exactly as a failing one does (bd53f0d).
- **Booth 3 had nowhere to stand.** The Library Lobby's east wall and Physical Plant Two's west wall are back to back. Any booth behind the lobby's east mouth would sit inside the plant. It was reported, not patched (00e09f3), and settled that evening (see the next entry).

**Built**

- `scripts/fabric-tower.mjs` and `scripts/fabric-shuttle.mjs`, new, and `fabric-kalamontee.mjs` extended to the descent (7e21721). The kit's drum takes a `ceilingHole`, so the Tower Core's stair climbs through its ceiling (f383a3d).
- Lamp stamps in every area builder (deb9b3c).
- `scripts/tests/precheck.mjs`, new, and `scripts/tests/lawanda.mjs`, new. `check_design` compares a lift with its landing and holds diagonal walls to their quadrant. It also warns where a room's exits and openings disagree (af52f62).
- `browser.mjs` on the review server, waiting for the drawn room (1b69439, c935077). The compass rose and `rules.roomNote` (bf9f499). Label layout in `scene/view.js` (a04aeb5). `release.mjs`'s per-test limit (bd53f0d). The design test's restore-on-kill (c9d698f). The backfill rule in `room-status.json` (382b8e9).

All are updated in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Escape Pod Web | Accepted by the user |
| Admin Corridor South | Accepted by the user |
| Upper and Lower Elevator, Alfie Control East and West, Comm Room, Waiting Area, Tower Core, Shuttle Car Alfie, Fork, Escalator, Kalamontee Platform, Helicopter, Observation Deck, Helipad | Packaged, cut, blocked out, seeds painted and registered. Guides out for the last two ring views, with Greg |
| Repair Room, Planetary Defense, Planetary Course Control, Library Lobby, Physical Plant Two | Geometry pass, cut, blocked out, seeds painted and registered |
| Project Corridor West, Project Corridor | Metadata by Greg, approved; Norm cuts them next |
| Transportation Supply 194 | Greg answered that the picture shows the ladder, so a ladderless base is owed (design-0266). Norm withdrew the question that evening (see the next entry) |

<!-- through: git c9d698f · mail 20260917-234632-dev-0335 -->

## 2026-09-17 -- A registration undone, thirteen rooms answered, and the monitor strips turn green

The user opened the evening with one line: "resume planetfall work - fan out your work if needed" (17 Sep). They made no decisions tonight, so everything below was decided by Norm or by Greg. Greg was back at work, which the morning's entry could not assume: between 19:45 and 20:33 he delivered thirteen metadata passes for the Lawanda complex, then painted as fast as guides reached him.

For a player, two things changed. In the Admin Corridor the grey bar that sat over the painting through the doorway is gone, and the three status strips on the Systems Monitors wall now turn from red to green as the systems they report are fixed. The Admin Corridor and Admin Corridor North went to the user for review. For the work, the most useful change was a correction: most of a bulk registration left uncommitted by the previous session was found to be wrong and was reverted, and the design checker now refuses the two kinds of mistake that let it through.

**What happened**

- **The uncommitted registration was mostly wrong, and was reverted.** It had re-hung Admin Corridor North's 090 and 270 and SanFac E's 008 and 190 on Greg's raw renders instead of the restored frames, hung SanFac E at lens 120 where it was painted at 110, and added CAP-UP and CAP-DOWN pictures in all three Admin Corridors beside the TURN-UP and TURN-DOWN caps hung there since 16 September. All of it was undone. What players see is the same as it was on 16 September (a24701b, dev-0341).
- **Two corrections to Greg, in writing.** In dev-0336 Norm withdrew his own morning question about Transportation Supply 194. He had asked the question the wrong way round, and Greg's answer followed that framing (below, under Decisions). Five minutes later dev-0341 corrected dev-0336 itself. It had said Norm registered the six Admin Corridor caps that evening. In fact they had been hung on 16 September, and the only change that evening was removing the duplicates. The same message told Greg to ignore a sentence about the Tower Core that had been carried over into four new guides from an older template.
- **Thirteen metadata passes reviewed in parallel.** Norm split Greg's thirteen DR-106 packages among three reviewer agents and checked each verdict before it went out. SanFac F was approved. Twelve went back for changes (dev-0342 to dev-0354). The findings that matter:
  - Project Corridor East's south mouth lies on the axis two accepted seeds look down, and both of them paint that far wall blank (dev-0342).
  - The Library's floor is 0.6 m off the lobby's, and the room overlaps Systems Corridor West by 0.5 m (dev-0351).
  - Booth 3's notch into Physical Plant Two is capped at booth height (dev-0353).
  - Four rooms wrote conditions such as "lacks OPENBIT", which the game cannot read (dev-0348 to dev-0351).
- **The monitor strips became overlays.** Greg had asked for three single-strip overlays rather than eight repainted walls (design-0212). The green is his own: the always-green fourth strip, cut from Systems Monitors TURN-270 R4 with its glow. It is laid over each switched strip at the painted strip's measured size and shown on that strip's own flag. The red stays in the painting (43ab305, dev-0357).
- **Guides out, and one ring closed.** Norm sent underpaintings for the last two ring views of Planetary Defense, the Repair Room, Planetary Course Control and the Library Lobby (dev-0337 to dev-0340), and for Systems Monitors 010, 130 and 170 (dev-0356). Greg painted Planetary Defense 180 and 270 within minutes. Norm restored and registered them, which closed that room's ring of four (dev-0359). Systems Monitors 010 came back at 20:55 (design-0304). Greg also rewrote the states conditions in four DR-114 packages the same evening (design-0303).

**Decisions**

- **The user: resume, and fan out if needed.** That was the whole instruction, and it is why the thirteen reviews ran as three parallel groups.
- **Norm: revert, and keep only what was right.** The registration had never been committed, so it was taken back to what was, and the one genuine registration in it, Transportation Supply 194, was kept. HANDOFF.md now carries a standing rule: diff what a scratch registration script would write against HEAD before running it again.
- **Norm: Transportation Supply 194 is the base picture, not a ladder variant.** LADDER-FLAG is true whenever anyone stands in that room, because the ladder across the rift is the only way in. So a view without the ladder does not exist, and none is owed. Both of the room's views carry the state, so the game's stand-in ladder does not draw over the painted one (a24701b, dev-0336).
- **Norm: move the mouth, do not repaint the seeds.** For Project Corridor East the cheaper fix is to move the Computer Room's mouth at least 3.3 m off the axis, rather than repaint and re-register two accepted seeds (dev-0342).
- **Norm: accept Booth 3 where Greg put it, with a capped notch.** Norm looked for somewhere else to put the booth and found nowhere. Its mouth is pinned to the lobby's, and moving the plant would change Systems Corridor East's art, which is already cut. A full-height notch would show above the machinery in Physical Plant Two's registered TURN-270. A notch at booth height, 3.3 m at most, shows in none of the accepted views (dev-0353). Physical Plant Two's own guides are built but held until the notch lands.
- **Norm: a condition the game cannot read on a picture that is hung is an error; on a state that is only described, a warning.** Some older packages use states to describe events rather than switches, so a refusal there would block work that is not wrong. There are 32 such warnings today (a24701b).
- **Greg: the Library Lobby terminal's display is live text, not a painted state.** He moved it into the package's notes (design-0303).
- **Norm: the two Admin Corridors go to the user only now.** Both had been waiting only on the strips, and neither had an open ask or an outstanding note from the user (dev-0357, dev-0358).

**What was hard**

- **Every check passed the wrong registration.** Caps were matched on pitch alone, so a second base picture at the same camera was never noticed. `check_design` now refuses two base pictures at one camera.
- **English that looks like a condition.** "CUBE lacks OPENBIT" reads correctly to a person. The game's condition language evaluates it to false, silently, so a picture hung on it would never be shown. It appeared in five packages, and "DEFENSE-FIXED is true" in two more. `check_design` now refuses such a condition on a picture that is hung, and warns on one in a package's states list. Both rules are pinned in the design test (a24701b).
- **The grey bar over the Admin Corridor.** The game's stand-in red lamps were being drawn over a painting that already showed them red. The painting was registered with no state, so the game did not know the lamps were already in it. The two base views now carry the all-unfixed state they were painted in, and the lamps drop out. The fix was checked on the review page as well as reasoned about. Looking through the doorway at 263, the strips read red, red, red; with Defense fixed, green, red, red; with Defense and Comm fixed, green, red, green. Nothing is drawn over the painting in any of the three (43ab305).
- **A ridge that was not a seam.** Restoring Planetary Defense 270, the restore tool flagged a ridge on the east join. Norm magnified it beside the blockout and found the gauge module from Greg's accepted 000 seed, whose bright dials begin right at the join. The finding is written into the registration so that nobody sends the picture back for it (dev-0359).
- **The cap blockouts were the wrong shape.** Every DR-113 and DR-114 cap blockout had been rendered at 1672 x 941 at lens 110. A cap is 1254 pixels square, at the lens its ring's reach calls for. The five DR-114 rooms' caps are being re-rendered square at 131. The DR-113 caps wait until each room's ring closes. This was still open at the end of the session (HANDOFF.md, dev-0359).

**Built**

- `scripts/check_design.mjs` gained two refusals and a warning: two base pictures at one camera; a condition on a hung picture that the game cannot read; and, as a warning, a states condition it cannot read. The first two are pinned in `scripts/tests/design.mjs` (a24701b).
- `scripts/precheck.mjs`, now committed, tells a revision (`_R2`, a seed, a completed guide) from a state variant by its name. Revisions are checked against the blockout and variants against their base. It also names the files in a delivery that are not pictures instead of failing on them (a24701b).
- `scripts/fabric-kalamontee.mjs` lays the monitor-strip overlays, `wwwroot/assets/overlays/MONITOR-STRIP-LIVE.png`, each on its own flag. `scripts/tests/turn.mjs` pins both rooms (43ab305).

All three are updated in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Admin Corridor, Admin Corridor North | Reviewed, and with the user. The strips switch green, and the grey bar is gone |
| SanFac E, and the caps of all three Admin Corridors | The wrong re-hangs and the duplicate caps reverted; nothing hung has changed since 16 September |
| Transportation Supply | 194 registered as the base picture; no ladderless view is owed |
| Planetary Defense | Ring closed at 000, 090, 180 and 270; caps next, waiting on square cap blockouts |
| Repair Room, Planetary Course Control, Library Lobby | Guides out for their last two ring views, with Greg |
| Physical Plant Two | Guides for 000 and 180 built, held until Booth 3's notch lands |
| Systems Monitors | Guides out for 010, 130 and 170; 010 delivered, waiting to be restored |
| SanFac F | Metadata approved (four views at 110); Norm places it and cuts blockouts next |
| Project Corridor East, ProjCon Office, Computer Room, Mini Booth, Library, Booth 3, Auxiliary Booth, Cryo Elevator, Cryo Anteroom, Main Lab, Lab Storage, Lab Office | Metadata back with Greg for changes |

<!-- through: git 43ab305 · mail 20260918-005730-dev-0359 -->

## 2026-09-17 -- Late evening: every room has a package, the dashboard audited, and objects get pictures

The late evening, from 20:59 to 22:08 EDT, ran on the user's short questions. They asked whether the dashboard was up to date, and it was not. They asked whether the other Lawanda rooms, "including bio locks", could be started. They said to "feel free to queue up all unpainted objects", to "keep going on the lawanda blockouts", and "what about bettie?". By 22:08 every one of the game's 105 rooms had a package, which had never been true before.

For a player: in the Infirmary the red spool and the medicine bottle are pictures instead of grey blocks. The West Wing's review page has day, dusk and night at the top of its switches. For the work: the dashboard tells the truth again, and 38 guides that had been owed but hidden by wrong statuses were built and sent.

**What happened**

- **The dashboard audit.** The user asked "is the dashboard status lights per room up to date". Norm found 27 rooms wrong (8bc38d3, dev-0383):
  - eighteen showed the next room's work, and as with Norm while their asks sat with Greg;
  - three finished rooms still showed work in progress;
  - nineteen Kalamontee rooms read "seeds delivered for review", although their seeds had been registered that morning.

  The next step for those nineteen was Norm's: the guides for the other two ring views. Nobody had built them. All 38 were laid from each room's own planned cameras, looked at on one sheet, and sent (dev-0364 to dev-0382).
- **The last ten Lawanda rooms get metadata.** The user asked, "other lawanda rooms including bio locks can be started, no?" Norm took the ten back from Greg's queue so that Greg's time went on painting (dev-0362). They were the bio and radiation labs, their four locks, Station 384 and the three rooms of the strip. Three agents wrote them in parallel, one per group, and Norm checked each against the source before it went in. The exits are canon's, and the sign reads "WORNEENG! Raadeeaashun suuts must bee worn beeyond xis point." to the letter. The crack sits at the same place in the Radiation Lab's wall and the Bio Lab's (245f016).
- **The Lawanda blockouts.** The user said "keep going on the lawanda blockouts" (ae32e50):
  - Project Corridor, Project Corridor West and SanFac F were placed in the Lawanda layout, and Project Corridor East gained its west and east mouths. The three accepted views that look toward it re-render pixel for pixel as before. Twelve blockouts, and seeds asked (dev-0396 to dev-0398).
  - The four rooms inside the computer, Station 384 and the strip, got a builder of their own, `fabric-computer.mjs`. Sixteen blockouts, and seeds asked (dev-0402 to dev-0405).
- **Rings closed.** Systems Monitors' last three views were restored, closing its five-view ring (8bc38d3). Planetary Defense's caps were painted and registered, so the room is whole. Transportation Supply 104 and 284 and Upper Elevator 000 and 270 closed those rings too (ae32e50, dev-0393 to dev-0395). Cap guides went out for SanFac E, Systems Monitors, Systems Corridor and Systems Corridor West (3bd6741), and then for Transportation Supply and the Upper Elevator (dev-0400, dev-0401).
- **The user's three change notes** (980949a):
  - West Wing, "need daylight options for day/dusk/night". The clock had existed since 14 September, but only as a selector in the Light panel below the sliders, and the user never found it. Rooms with a sky now show a time-of-day row at the top of the switches, driving the same clock. The room went back to the user (dev-0392).
  - Conference Room, "table is not circular, it is more heart shaped". Canon agrees with the user: "a round conference table". The fault is in the DOWN cap only, where the rim is two arcs with a cusp between them. A level disc seen straight down is an exact circle. Norm drew it to the pixel over the cap, and Greg repaints to it (dev-0390).
  - Infirmary, "objects render as blocks". This was a gap across the whole game, not just one room: 36 of its 42 portable objects had no picture. The user said "feel free to queue up all unpainted objects", so all of them went to Greg in one ask, the Infirmary's two first (dev-0391).
- **The spool and the bottle are live.** Greg painted both (design-0314, design-0315), and Norm trimmed them and hung them. Both had been floating above their surfaces and now stand on them. The emergency ration is still a block: the port adds it, so it was never in the source's list of objects. It is asked for next, which makes 37 sprites in the queue (481f647, dev-0406). The scrub brush, the chronometer and the ID card arrived before this entry was written (design-0316 to design-0318), but they are not yet in a commit.
- **Betty.** The user asked "what about bettie?". Shuttle Car Betty and its two control cabins turned out to be the only rooms in the game with no package. They are defined in `globals.zil`, and the list of Lawanda rooms had been drawn from `comptwo.zil`. An agent wrote them from Alfie's packages, and Norm checked every place where Betty differs from Alfie against the source. Betty's platform doorway is south, where Alfie's is north. Betty starts at Lawanda, so her base picture is reversed and her west cabin is the working one. She berths on the north side of both platforms (01a4012).

**Decisions**

- **The user: start the rest of Lawanda, queue every unpainted object, keep blocking out, and do Betty.** Each of these became work the same evening; the user made no further decisions.
- **Norm: no Floyd inside the computer.** Floyd dies fetching the card that gets you into Station 384 and the strip, so the four rooms went on `check_design`'s no-Floyd list. The Floyd entries the checker had forced on them were removed, and no switch is offered "for something that cannot happen" (245f016).
- **Norm: the Conference Room is fixed in one picture.** Only the DOWN cap is repainted. The level views show a smooth rim and are left alone (dev-0390).
- **Norm: the Infirmary stays off the user's list until the ration has a picture** (481f647).
- **Norm: Planetary Defense's views carry the state they are painted in.** It is written `DEFENSE-FIXED == false`, the same spelling Systems Corridor's views use, so that one condition in the fabric matches both rooms. That took a flat red box off the warning display in the painting. The repaired picture, with the display dark, is asked for (dev-0399).
- **Norm: light the strip enough to see it.** At the packages' first settings the strip barely separated from the black of the void. The fill went up and the fog was pushed out to 8-16 m, which still hides the relay and the station from the middle room (ae32e50).

**What was hard**

- **The dashboard had drifted, and the first explanation of why was wrong.** The status line is a side effect of the mailbox. Norm first put the drift down to a batch send that stamped each room one along (8bc38d3). Checked afterwards, the real cause was that each of Greg's tower deliveries set its room's status to what he was starting next. Norm corrected the record a minute later (3bd6741), and Greg was asked to describe the room he is delivering instead (dev-0383).
- **Guides owed and invisible.** The cost of the drift was not the wrong words but the work they hid. Nineteen rooms had waited since the morning for guides that only Norm could build.
- **The first cap guides had no blockout under them.** Each middle was filled with one flat colour, the same failure as the morning's derived caps. They were rebuilt from square blockouts rendered at each cap's own camera (3bd6741). The DR-114 cap blockouts themselves had been rendered at the wrong shape. All ten were re-rendered square at 131, which closed the problem the previous entry left open for the DR-114 rooms. The DR-113 ones are re-rendered as each ring closes (1b0b954).
- **An olive box over the bottle.** The user asked whether the medicine bottle showed olive because it was a clear bottle. In effect it did. The engine draws the contents of any see-through container. Greg's bottle already paints the medicine, so the medicine was drawn a second time, as a box with no picture. A container whose picture already shows what is in it is now marked `showsContents`. Its contents stay an invisible click target, so the medicine can still be drunk (481f647).
- **Still open:** the radiation lock's squared west end overlaps the Main Lab's corner, where the bio lock is angled to meet it. It gets reconciled when those rooms are placed in the layout (245f016).

**Built**

- `scripts/fabric-computer.mjs`, new: Station 384 and the strip in a frame of their own, the void being each package's black fog (ae32e50).
- `scripts/fabric-lawanda.mjs` extended to the project hallway, with placeholder shells for the Main Lab and the Projcon Office (ae32e50).
- The review page's time-of-day row (`dashboard/uat.js`, 980949a).
- `showsContents` in `data/characters.json`, honoured by `scene/graybox.js` (481f647).
- `check_design`'s no-Floyd list for the four rooms inside the computer (245f016).

All are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| West Wing | Day, dusk and night as switches; back with the user |
| Conference Room | With Greg: the DOWN cap repainted to the true circle |
| Infirmary | Spool and bottle live; with Greg for the ration's sprite, then back to the user |
| Planetary Defense | Whole, four views and both caps. One state is left, the display dark once repaired, with Greg |
| Systems Monitors, SanFac E, Systems Corridor, Systems Corridor West, Transportation Supply, Upper Elevator | Rings closed; caps with Greg |
| Nineteen rooms whose seeds were registered on 17 September, from the Rec Corridor to the Reactor Elevator | Guides for their last two ring views, with Greg (dev-0364 to dev-0382) |
| Project Corridor, Project Corridor West, SanFac F | Placed and blocked out; seeds with Greg |
| Station 384, Strip Near Station, Middle of Strip, Strip Near Relay | Metadata by Norm, blocked out; seeds with Greg |
| Bio Lab, Radiation Lab, the four locks | Metadata by Norm and checked; waiting to be placed in the layout |
| Shuttle Car Betty, Betty Control East and West | Packaged; the last three rooms in the game to get one |
| Elevator Lobby, Booth 2 | Corrected to show their metadata was never asked of anyone |

<!-- through: git 01a4012 · mail 20260918-020717-design-0318 -->

## 2026-09-18 -- Through the night: the lab cluster laid in, and seven rooms accepted

The user said "keep going" and left the two agents to work through the night of 17 to 18 September. By morning the whole Lawanda lab cluster stood in the shared layout, and Greg had painted seeds for it. Physical Plant Two, Booth 3, Project Corridor West, SanFac F and the Computer Room had each gone to the user whole. The dashboard's working copy records the user accepting seven rooms during the night: the Admin Corridor, Admin Corridor North, West Wing, Physical Plant Two, Booth 3, Project Corridor West and SanFac F. The user made one decision, about the Library. In the morning they asked for the charts on [How we work](how-we-work.md#the-flow-of-asks) to be redrawn. They now run to 06:03 on the 18th.

**What happened**

- **The project hallway's south end, then the labs.** At the user's word, Norm took five metadata fixes back from Greg's queue to unblock the Lawanda layout: Project Corridor East, the Projcon Office, the Computer Room, the Mini Booth and Booth 3 (`20260918-022806-dev-0410`). The south cluster was then fitted into one layout (2b7fa48) and cut (0ae66ea). Booth 3 went into a notch cut from Physical Plant Two, capped at 3.36 m, where the plant's machinery hides it in the plant's accepted painting (419986b). Norm then took six more of Greg's metadata fixes, for the Cryo Elevator and Anteroom, the Main Lab, Lab Storage, the Lab Office and the Auxiliary Booth (685f72f, `20260918-062246-dev-0447`). A second pass brought the lab texts into line with the fabric (`20260918-072408-dev-0454`). At 03:23 the whole lab cluster went into the fabric: the Main Lab built in full, Lab Storage, both Radiation Lock halves and the Radiation Lab, both Bio Lock halves and the Bio Lab, the Lab Office, the Auxiliary Booth and both Cryo rooms, with 50 blockouts rendered (12fcb1a). Norm's note for the session says every accepted neighbour re-rendered pixel-identical. Greg had painted seeds for all twelve rooms by 04:33 (`20260918-083344-design-0414`).
- **Rooms elsewhere.** Betty and her two cabins (fd6e6b7), the Elevator Lobby and Booth 2 (c99b747) were cut and blocked out, and Greg's seeds for them were in by 05:51. Norm laid rings, guides and caps through the night for Physical Plant Two, Booth 3, the Computer Room, the Mini Booth, Project Corridor, Project Corridor West, SanFac F and Station 384 (05bfed1 to a3fc05a).
- **Every object has a picture.** Greg's object sprites reached 43 of 43. Agents installed them, with every piece of lettering checked against the source. The carton was redrawn standing up, and the Lazarus breastplate was redrawn to match its description in `comptwo.zil` (17afea0, e374533). Things drawn from above now lie flat on their surface (fd6e6b7). "Every object with a picture file now has an entry, 43 in all" (0f79f1c).

**Decisions**

- **The user: the Library shrinks.** At its proposed 16 x 12 m the Library did not fit. Project Corridor, the Systems Corridor, Systems Corridor West and Project Corridor West box it in. The user chose to make it 12 x 12 m and to narrow the Library Lobby's west doorway to 3 m. That work comes next (session note).
- **The user: Norm takes the metadata fixes that block the layout.** This is the reason given in `20260918-022806-dev-0410`. The same reasoning moved the six lab fixes, to "keep the lab cluster moving" (`20260918-062246-dev-0447`).
- **Norm: gate commits on `release.mjs --dry`.** `npm test`'s single chain stalls intermittently right after check-seed, although every file passes alone (05bfed1). From then on each commit message records that the dry release passed.
- **Norm: a repaint, not a patch.** SanFac F's first 000 and 180 carried in a brighter wedge from the seed. The seam tool softened it but broke the stall's corrugation, so a repaint was asked for instead (9e04317).
- **Norm: the Projcon mural hangs on `COMPUTER-FIXED != true`.** Seen from the Computer Room and Project Corridor, the mural had been drawn over both rooms' paintings. The flag starts unset in `comptwo.zil`, and `== false` was the fragile way to write it (d29f111).

**What was hard**

- **Seams that only the whole room shows.** Norm had registered Station 384's 000 and 180 with a note calling their flagged steps a real edge. "That was wrong, and the whole-room view shows it": the strip stopped square at the next view's edge instead of receding into the fog. The Mini Booth's lit band stopped the same way at a frame edge (`20260918-065657-dev-0449`). Both were sent back. Greg repainted the Mini Booth's 090 a third time (12fcb1a). Station 384's R2 had the right shape but faded to black beside the lit strip, and an R3 is asked for (`20260918-100301-dev-0456`). That is still open. The same kind of review found a lighter patch at Booth 3's NE corner, which was repainted (`20260918-052520-dev-0438`, d29f111).
- **A seed that disagreed with its neighbour.** Booth 3's first 270 painted the Library Lobby's carpet red and a shutter in the Library's mouth. The lobby's own accepted view has dusty brown carpet and an open mouth. It went back for consistency, not geometry, and R2 matched (05bfed1, 0f79f1c).
- **A pair redrawn, not painted over.** The Mini Booth's first 090 and 270 held only 0.12 of the accepted picture: they were the same head-on picture redrawn, not painted over the guides. Their restore outputs were committed by mistake with the folder, then removed (313e777, 82e1202).
- **A test that stalls.** `tests/check-seed.mjs` held a release check for its full five minutes three times, then passed in under 2 seconds on the next run each time. Its runs got a 60-second limit (f24756c), and the release now reruns a stalled file once and says so (0f79f1c). The HANDOFF records the cause as unknown. Norm's note puts it down to agents rendering while the tests run, and says the gate passes cleanly when nothing else is running.
- **What the chart could not see.** Redrawing the charts showed that none of Greg's messages since 21:48 on the 17th has carried an ask. Norm's review of his 106 deliveries that night therefore leaves no mark on them. [How we work](how-we-work.md#the-flow-of-asks) now says so.

**Built**

- `scripts/fabric-lawanda.mjs`: Booth 3, the south cluster and the lab cluster. It now throws if the mouths stop lining up (419986b, 0ae66ea, 12fcb1a).
- `scripts/fabric-kalamontee.mjs`: the Elevator Lobby and Booth 2 (c99b747). `scripts/fabric-shuttle.mjs`: Betty (fd6e6b7).
- `scripts/graybox-view.mjs --fill`, for blockouts of rooms that are lit very dimly (12fcb1a).
- `scripts/release.mjs` reruns a stalled test once (0f79f1c).
- `characters.json` `flat` (fd6e6b7).
- The three mailbox charts, redrawn with `node scripts/mail-flow.mjs --csv`.

All are in [Tools](tools.md). The `check_design` rules that refuse two base pictures at one camera and conditions the game cannot read date from the evening before (a24701b) and are in the previous entries.

**Rooms**

| Room | Where it stands |
|---|---|
| Admin Corridor, Admin Corridor North, West Wing | Accepted by the user (dashboard, not yet committed) |
| Physical Plant Two, Booth 3, Project Corridor West, SanFac F | Whole, sent to the user, and accepted (dashboard, not yet committed) |
| Computer Room | Whole, with its computer-fixed state; with the user (`20260918-100240-dev-0455`) |
| Project Corridor | Ring closed and caps hung; the mural's fixed state painted by Greg (`20260918-083344-design-0415`) |
| Mini Booth | Ring closed with 090 R3; caps in |
| Station 384 | Caps in; 000 and 180 back with Greg for R3 |
| Strip Near Station, Middle of Strip | Seeds registered (a3fc05a); side views repainted as R2 to follow the fabric |
| Strip Near Relay | Seeds delivered by Greg |
| Main Lab, Lab Storage, Lab Office, Auxiliary Booth, Cryo Elevator, Cryo Anteroom, Bio Lab, both Bio Locks, Radiation Lab, both Radiation Locks | Laid into the fabric and blocked out; Greg's seeds delivered |
| Project Corridor East, Projcon Office | Seeds registered (12fcb1a); Greg's next two views delivered |
| Shuttle Car Betty, both Betty cabins, Elevator Lobby, Booth 2 | Cut and blocked out; Greg's seeds delivered |
| Library | To be shrunk to 12 x 12 m, at the user's decision |

<!-- through: git 12fcb1a · mail 20260918-100301-dev-0456 -->

## 2026-09-18 -- Norm and Greg by name

A style decision for this history, not a session of work. The user wrote: "in the historian documents its ok to anthropomorphize greg and norm (pronoun: he/him) -- mentions of designer and dev should be replaced with these proper noun names". So from this date the wiki calls the two agents Norm and Greg, both he/him, wherever it means them as actors, and the earlier pages and entries were brought into line with that. Mail ids, command flags and file names that say `dev` or `design` are unchanged, and so are the user's own quoted words.

<!-- through: git 12fcb1a · mail 20260918-100301-dev-0456 -->

## 2026-09-18 -- Every way of playing wins blind, and the Kalamontee descent painted

This entry runs from the morning of 18 September to about 14:40. It had two strands. First, playtesting came back after six days away: four blind rounds ran, one tester each. By the afternoon every way of playing the game had been won blind: by mouse from the start to Lawanda, by mouse from Lawanda to a perfect 80, and by typing from start to finish. Second, the painting went on. Greg worked through the Kalamontee sequence under DR-113 while Norm did the checking, and the user accepted four more rooms. At the end the user asked to "have historian update the most recent playtest graphs". The charts on [Playing it](playing-it.md#how-far-each-tester-got) now include rounds thirteen to sixteen.

**What happened**

- **Four blind rounds.** All the numbers here come from the session transcripts:
  - Round thirteen (click, from the start, diary started at 07:09) stopped alive in the Comm Room at turn 382 with 33 points, after 427 commands. It had switched the robot on without searching it, so the lower elevator card stayed inside Floyd. That is the trap both round-ten testers fell into.
  - Round fourteen (click, from the start) reached its goal, Lawanda Platform, at turn 247 with 32 points, in 260 commands and with no deaths. The user's note for the day: Floyd's new "itchy" hint worked. At turn 102 the tester searched Floyd because he said something was stuck in his compartment, and the card fell out.
  - Round fifteen (click, from the Lawanda checkpoint) won 80 of 80, Galactic Overlord, at turn 438.
  - Round sixteen (typed, from the start, two legs) won 68 of 80, System Captain, at turn 544 in 693 commands. That is the ending where the defenses and the communications were still broken.
- **Round thirteen's fixes** (05a700f). Floyd's itch and a weight line on every fumble were built as deliberate deviations. The click harness got fixed direction numbers, and a one-click "Open the canteen and drink" was added. The page's quick buttons were made the same list the harness uses. The playtest status line now shows the climb's depth.
- **Rounds fourteen to sixteen's fixes** were triaged together, and are not yet committed. There were nine fixes to the port, among them round eleven's A4 rule, which had never worked, and a noun search that now works as the original's GET-OBJECT does. Four B items were built as deliberate deviations, each with tests (HANDOFF.md 5b).
- **The Kalamontee sequence painted.** Between 07:16 (`20260918-111659-design-0438`) and 12:51 (`20260918-165124-design-0490`) Greg painted DR-113's ring views, in the order Norm's message that morning set. First came the Tower Core, both Alfie cabins and the shuttle car, then the Lower Elevator, the Helipad, the Helicopter, the Waiting Area, the Kalamontee Platform, the Escalator and the Fork. Norm registered them, asked for R2s where needed, and laid the cap guides, and the caps followed through the afternoon. Alfie's rooms also got painted state variants: moving with the door shut, and arrived at Lawanda (5929620).
- **Fixes to the renderer and the scene.** Painted plates stopped taking the scene's fog, which had left a black blot in the computer rooms (469d1f8). The floor and ceiling discs had rendered wrongly at level pitch. That fault had been painted into seeds as a false "hump", so the affected blockouts were rendered again and the seeds repainted (`20260918-134702-dev-0490`, 05a700f). Underwater now takes its light from above, the user's idea, as a grade in the engine rather than a repaint (`20260918-130342-dev-0485`). The Library was fitted at 12 x 12 m (3d325d5).

**Decisions**

- **The user: Greg's work is image work only.** Norm's message to Greg gave the reason: "Your tokens are the premium now. You render images and I can't, so from now on every compute task is mine". Norm also promised to try a compute fix before any repaint ask. The same message moved the DR-113 ring views to the front of Greg's queue, since they had waited 11 hours (`20260918-105329-dev-0462`).
- **The user: rounds thirteen to sixteen.** From round thirteen, Floyd's itch and the weight line, B1 and B2 approved, and B3 declined. From rounds fourteen to sixteen, round eleven's A4 rule stands, B1 to B4 are approved, and B5 (a warning before the ending) and B6 (opening the kitchen door from inside) are declined.
- **The user: four local fixes in accepted rooms,** chosen as clear defects: SanFac F's floor, Project Corridor West's ceiling, a slab on Strip Near Station's deck, and the Courtyard's north doorway. Each was a masked repaint with everything outside the mask kept byte for byte (`20260918-164251-dev-0496`). All four were in by 13:37 (`20260918-173744-dev-0525`).
- **Norm: warp before a third round.** The Lower Elevator's 180 R2 kept a wrong west corner. Norm fixed its geometry by warping the painting instead of asking Greg for a third round (`20260918-140305-dev-0491`).
- **The historian: the work charts left as drawn.** `work-categories.mjs` redraws all five of its charts together. Only the two friction charts were kept from the new run. The three work charts on [How we work](how-we-work.md#what-the-work-went-on) stay as drawn that morning, because the text beside them quotes their numbers.

**What was hard**

- **The Floyd card trap, a third time.** Round thirteen stalled exactly where round ten's two testers did. Once Floyd is switched on, the original gives the card up only by his own random reveal, 5 percent on each use of a card slot on day 2. Floyd's itch leaves that in place and adds a spoken hint. Round fourteen showed that it works.
- **Fixes that had never fired.** Round eleven's A4 (Eat on food in an open kit at your feet) had never taken effect. `openUpTo` walked past the room, and the goo's gate wanted the kit in hand. The weight refusal's pocket hint had tested an object, `UNIFORM`, that does not exist. Both were found only because a tester hit them again.
- **Two quick rows.** The page had wired its buttons by hand, so four buttons added since round four had only ever appeared in the harness. Mouse testers had been playing with buttons a real player did not have.
- **A fault painted into seeds.** The broken floor disc was taken as part of the room and painted in, where it hid the Comm Room's send console. Greg repainted the Upper Elevator's 090 and the Comm Room's 135 seeds. The Observation Deck's guides were rebuilt, and its 225 seed was repainted to put the horizon at eye level.
- **Counts that disagree.** The diaries' command counts are rounder than the transcripts' (about 438 against 427 for round thirteen). Round sixteen's diary counts six deaths where its transcript shows four death screens. The chart and the table use the transcripts, and `playtest-scores.json` notes each difference.
- **Station 384** had its R3 step again at the same place, and the user's message stopped Greg's work on it. It went back to Norm (`20260918-105329-dev-0462`). It is still open.

**Built**

- `scripts/playtest.mjs`: the climb's depth on the status line, and fixed direction numbers (05a700f). RESTART now works as it does on the page (not yet committed).
- `scripts/deliveries.mjs` and `scripts/view-diff.mjs`, promoted from the scratchpad, with tests (3d325d5).
- `scripts/level-join.mjs`, `scripts/warp-walls.mjs` and `scripts/lamp-off.mjs`, with their libraries and tests (05a700f). The last puts out the Computer Room's and the Mini Booth's red light once the computer is fixed.
- `scripts/work-categories.mjs` and `scripts/lib/friction.mjs` (469d1f8).
- The playtest charts redrawn with rounds thirteen to sixteen. `playtest-scores.json` gained their four runs, each with its transcript and diary lines. `playtest-scores.svg` gained four rows. No script draws that chart, so the rows were added in its own layout. `work-friction.svg`, `work-friction-rate.svg` and `work-friction.csv` were redrawn by the script: 1,467 friction rows in all.

All are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Tower Core | Whole, with its door-open state, and to the user at 10:07 (`20260918-140730-dev-0492`); accepted |
| Computer Room, Mini Booth | The user's changes done at 08:24: the light goes dark when fixed, a larger print-out, no Floyd in the booth (`20260918-122408-dev-0478`, `-122409-dev-0479`); both accepted |
| Strip Near Station | Whole and to the user at 07:27 with the plate-fog fix; accepted; its 270 deck fix registered (`20260918-172732-dev-0520`) |
| SanFac F, Project Corridor West, Courtyard | Accepted rooms; the user's local fixes registered |
| Alfie Control East and West, Shuttle Car Alfie | Whole, with their states, and to the user at 13:29; sent back: the shuttle door never shuts |
| Lower Elevator, Fork | Rings and caps whole (`20260918-181231-dev-0532`, `20260918-183203-dev-0538`) |
| Helicopter, Escalator, Comm Room, Kalamontee Platform, Helipad | Rings closed; caps registered or in R2 |
| Observation Deck | 135 and 315 over R3 guides built from the corrected 225 seed |
| Upper Elevator | 090 seed R2 registered; caps released over new guides |
| Waiting Area | 000 registered; 270 held for a decision |
| Underwater | Light from above, with the user |
| Library | Fitted at 12 x 12 m (3d325d5); seeds 090 and 270 asked over the new blockouts (`20260918-110754-dev-0464`) |

A seventeenth round, a click tester playing as a first-time 14-year-old, started its diary at 14:40. It is not in the charts. (Added later: it was drawn into the playtest charts later that evening, with rounds eighteen and nineteen; see [Playing it](playing-it.md#how-far-each-tester-got).)

<!-- through: git 5929620 · mail 20260918-183835-dev-0541 -->

## 2026-09-18 -- Fanned out: six agents on their own ports, and caps filled by compute

The evening session ran from about 16:15 to 18:30 EDT. The user opened it with "resume work from handoff". When Norm began working through the list one task at a time, the user stopped him: "fan out subagents to parallelize work", and then "keep fanning out more work while they run". Norm ran up to six subagents at once for the rest of the evening. For the work, this changed how fast things moved. Bio Lock East went whole and to the user. Compute filled about ten caps that Greg would otherwise have painted. Two more playtests were triaged into 13 port fixes. For a player, the fixes are the visible part: more plain English is understood, and a few wrong lines are gone. Two commits hold the session, ddc51a1 and 7f42fea.

This entry also picks up the afternoon's four commits, between the last entry and this session.

**What happened**

- **Before the session (14:44 to 16:11).** Rounds fourteen to sixteen's fixes were committed (2db0b7f). The review page gained state presets, so compound states such as the shuttle's MOVING can be reached and shot in review sheets (79853eb). `cap-fill.mjs` was written and filled its first cap, the Helipad's floor (79853eb, 5377ab3). The shuttle now rides: tunnel motion in the forward window, the lever, the speed display, the approach glow and a darker grade while moving, all as overlays that leave the base picture unchanged (093214c). The same commit laid out the Underwater depth plan (DR-115) with 24 blockouts and ended the check-seed test's stall. The HANDOFF traces that stall to `process.exit()` hanging in Node's teardown. Round seventeen was triaged. The Fork, Escalator, Helicopter, Observation Deck, Helipad, Kalamontee Platform, Comm Room, Upper Elevator and Waiting Area went whole, in their base state at least.
- **The fan-out.** Norm gave each group of rooms or each playtest to its own subagent: up to six at once, by the HANDOFF's account. Each had its own scratch port, and every heavy job waited on one shared lock (the rule is under Decisions).
- **Caps by compute.** `cap-fill.mjs` carries a cap's floor or ceiling plating across the hole from the border's own texture. This evening it filled the floor caps of the Projcon Office, Project Corridor East, Transportation Supply, the Systems Corridor, Systems Corridor West, the Bio Lab, Bio Lock East and the Cryo Elevator, plus both caps of Middle of Strip. Middle of Strip's ceiling is pure black, the void above the strip. Norm told Greg to skip those (`20260918-212542-dev-0561`). Caps with fixtures, lamps, ribs that change direction or objects in the hole stay Greg's. SanFac E's floor was tried and rejected, because the outline of the hole showed.
- **Bio Lock East whole.** Norm levelled the 180 view at both joins, and compute removed a ghost of the seed's frame from the far walls of 000 and 180. Greg painted the ceiling cap. The room's four mutants were one object in the metadata, and the review crashed on it. They became four real actors, so the review runs every switch. The room went to the user at 18:25 (`20260918-222511-dev-0572`).
- **The Underwater depth rooms installed, inert.** The climb out of the water is now three art rooms above the seabed, Underwater D2, D1 and D0, each with a scene, a package and blockouts. The game draws none of them until each is accepted, and the six accepted seabed views render with 0 px changed (ddc51a1). The old depth grade was removed, which is visible, as the user wanted (HANDOFF). Greg has the three seeds as a low-priority ask (`20260918-211700-dev-0560`).
- **Two playtests.** Round eighteen, click-only from the Lawanda checkpoint and played as an adult who played the original once in 1983, won 80 of 80 at turn 431 with no deaths. Round nineteen, typed from the start by a first-time player who types plain modern English, stopped alive in the Robot Shop with 9 of 80. Its 40 friction rows were mostly words the 1983 dictionary never had. Between them the two gave 13 port fixes, among them:
  - the ration's "lies on the counter" line no longer follows it to other rooms;
  - the man-eating plant is listed as a character;
  - the bio-lock window can be looked through;
  - "the blue one" answers the button question;
  - "press the up button", "what is goo", "where is floyd" and "go in the shuttle" now work, as the original's grammar allows;
  - the laser no longer lists its own dial as a thing it contains.
- **Design warnings from 55 to 11.** `check_design` now matches states by condition as the review page's presets do. The thirteen opening-size warnings of DR-084 were cleared with metadata alone, with no geometry change. Base views marked `"state": "true"` lost the field (ddc51a1).
- **Greg's evening batch.** Greg painted the lab cluster's rings in quick succession between 16:48 and 18:04: Bio Lock West, the Cryo Anteroom, the Cryo Elevator, the Lab Office, the Main Lab, the Radiation Lab and both radiation locks, and Betty Control East. The Cryo rooms, Main Lab 270 and Betty Control East 000 were registered. Most of the rest went back (see What was hard).

**Decisions**

- **The user: fan out.** The session's direction is in two short messages: "fan out subagents to parallelize work", then "keep fanning out more work while they run".
- **The user: one port per agent.** "a previous agent reported that some subagent activities interfered with each other causing cpu contention - honor that boundary." Norm gave each subagent its own scratch port, 5101 and up, never the user's 5012 or the review server's 5099. Every heavy job took one shared lock, made with `mkdir` so that only one agent can hold it (HANDOFF, evening block).
- **The user: the Library Lobby's gap stays.** The stair builder leaves a 0.425 m gap between the top tread and the wall. The user: "leave it if its invisible to the player". TURN-270 paints the steps running up to the sill (HANDOFF).
- **The user: pings while away.** Norm was to send milestone updates by Telegram until 7 pm, while the user was at dinner.
- **Norm: compute before asking Greg.** Every cap was tried with `cap-fill` before it was asked of Greg. Greg's Bio Lab floor cap was rejected (held 0.011: the centre was redrawn instead of continued), and compute filled it instead (`20260918-212542-dev-0561`).
- **Norm: Greg's queue made real.** Norm asked Greg to close the stale asks among the 40 open against him, so that the list is his real queue (`20260918-203422-dev-0558`). The Library Lobby's 000 and 180 were taken off hold: a fresh rebuild of their guides came out byte-identical to the R2 copies (`20260918-210622-dev-0559`).
- **Open for the user.** Rounds eighteen and nineteen left design questions, none of them blocking. Among them: should "transport" name the shuttle, should everyday words such as "go back" and "use" be added, and should the magnet warning repeat (HANDOFF 5d, 5e).

**What was hard**

- **Contention.** The browser agent measured what the port-and-lock rule prevents. Three walkthroughs run at once all failed at "get in web", a step that takes 7 s when run alone. Under the lock, the walkthrough ran clean six times in a row (HANDOFF).
- **A fix that broke something.** Round nineteen's tester could not answer "Which do you mean, the blue button or the red button?", because the question came from a room rule and not from the parser. The fix made the rule's question a pending question. An independent review of that fix found that a lone "south" then answered it, since the buttons' adjectives are NORTH and SOUTH, and pushed the red button instead of walking. A lone direction now walks, as in the original's parser. One small point is still open: a game saved before the plant fix keeps the plant's old flags until it restarts.
- **Paintings sent back.** Thirteen of the twenty paintings Greg delivered that evening went back for R2, each with its fault and where it is. The commit message says 11 of 16, a miscount Norm corrected afterwards from the verdict mails. There were three kinds of fault:
  - Doors painted into plain walls, in the Radiation Lab and both radiation locks: "a centre door painted into every view", where only the 090 and 270 views hold doors (`20260918-220731-dev-0562`, `-0563`, `-0564`).
  - Objects cut at the joins, in the Main Lab and the Lab Office: a lamp sliced by the ceiling join, filing cabinets cut in half, paper cut straight along a join. Main Lab 340 came back as the guide's untextured blockout (`20260918-221018-dev-0565`, `-221031-dev-0566`).
  - A mask painted as colour, in Bio Lock West: the guide's mask came back as teal wall with a white band along its edge (`20260918-222242-dev-0568`).

  Greg had delivered R2s for the Radiation Lab and Radiation Lock East's 000 by 18:23. The HANDOFF notes that if the R2s repeat these faults, it goes to the user, because each repaint spends Greg's tokens twice.

**Built**

- `scripts/cap-fill.mjs` and `scripts/lib/cap-fill.mjs`: new this afternoon (79853eb). This evening they gained `--sat`, `--sat-floor`, `--src-rect` and `--no-lines`, and the colour test now ignores near-black (ddc51a1).
- `scripts/review-room.mjs`: state presets (79853eb).
- `scripts/browser.mjs`: `--stop-after "<cmd>"`, to repeat the early stretch of the walkthrough (ddc51a1).
- `scripts/check_design.mjs`: states matched by condition, a warning for a base view's state that does not parse, and DR-084's `clear` field and UP/DOWN skip (ddc51a1).
- `scripts/fabric-underwater.mjs`: the three depth rooms' scenes (ddc51a1).

All are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Bio Lock East | Whole: four views and both caps, the floor by compute; to the user at 18:25 (`20260918-222511-dev-0572`) |
| Bio Lab | Ring closed; Greg's ceiling cap and the floor by compute registered |
| Cryo Anteroom | 090 and 270 registered, ring closed; both caps asked of Greg (`20260918-222258-dev-0570`) |
| Cryo Elevator | 090 and 270 registered, ring closed; floor by compute, ceiling asked (`20260918-222258-dev-0571`) |
| Main Lab | 270 registered, levelled; 130, 180 and 340 with Greg for R2 |
| Betty Control East | 000 registered; 180 delivered for review |
| Betty Control West | 000 delivered; 180 paused behind the R2s |
| Lab Office | 090 and 270 with Greg for R2 |
| Radiation Lab, Radiation Lock East, Radiation Lock West | All six views sent back; the lab's two R2s and Lock East's 000 R2 delivered |
| Bio Lock West | 003 and 183 sent back; its mutants split into four actors |
| Projcon Office, Project Corridor East, Transportation Supply, Systems Corridor, Systems Corridor West, Middle of Strip | Floor caps (and Middle of Strip's ceiling) filled by compute and registered |
| Underwater D2, D1, D0 | Installed inert; seeds asked, low priority |
| Library Lobby | Text brought up to date with Booth 3 and Project Corridor East; its stairs rise the right way; 000/180 back with Greg (`20260918-210622-dev-0559`) |
| Earlier in the afternoon | Observation Deck and Helipad whole and to the user; Fork, Escalator, Helicopter, Kalamontee Platform, Comm Room, Upper Elevator and Waiting Area whole, in their base state at least |

Rounds seventeen to nineteen are not yet in the playtest charts. (Added later: they were added to the charts and to [Playing it](playing-it.md#the-third-milestone-every-way-of-playing-wins-blind) later that evening, after this entry was written.)

<!-- through: git 7f42fea · mail 20260918-222511-dev-0572 -->

## 2026-09-19 -- The third time asked, and never once on the screen

The session ran from the night's batch through the morning, and by its own shape it was the largest fan-out of the port so far: ten or eleven agents at once, each on its own scratch port from 5101, every heavy render or test waiting on one shared lock. Greg emptied his queue in the small hours and then spent the morning on corrections; Norm's side was the receiving end, reviewing each delivery and either registering it or sending it back with the fault and where it is. Four rooms reached the user, and all four came back the same morning with the same kind of complaint: the toggles do nothing. That complaint is the real subject of the entry. The user asked three times for one small thing on the review page, was told three times that it was done, and never saw it work -- and the rule they wrote in response, that a room may not go for acceptance until its toggles are seen to change something on the screen, is worth more than the fix that finally landed.

**What happened**

- **The glimpse tag, asked for three times, and wrong all three.** The review page's tags tell a reviewer why a switch seems to do nothing. The user wanted one that says: what this switch moves is not in this room. Norm changed the room-detection logic twice, verified it each time by importing the function into node, and reported it working. The bug was never in that function. One line above the call site read `const seen = gap ? null : elsewhere;` -- so any switch with no painted variant took the "not painted" tag and the glimpse tag was never appended, which was every switch the user was looking at. Their reply: "WHY IS IT STILL NOT LABELED WITH THE GLIMPSE TAG ON THE SCREEN? THIS IS THE 3RD TIME IVE HAD TO TELL YOU AND I HAVE NEVER ACTUALLY SEEN IT WORK." It was fixed only when Norm loaded the real page and read the rendered DOM. The tag now names the room the moving part is in ("in another room, Deck Nine", from the game's own room names), falls back to a distance where the scene names no room, and sits alongside "not painted" rather than instead of it, because both can be true at once. Project Corridor East's COURSE-CONTROL-FIXED and CUBE switches are exactly that case: they move props 30 to 38 m up the corridor.
- **The toggle gate.** The user's answer to the same failure, given as a rule: before a room is sent for acceptance, run through its toggles and confirm that something -- anything -- changes on the screen; nothing changing is a pre-acceptance fail. It is built into the review the room already runs. `review-room.mjs` was shooting each switch at several bearings anyway; the gate diffs those shots against the base row pixel by pixel and takes no new renders. Scale is deliberately not part of the test: a switch that moves a 36 by 10 px prop 34 m up a corridor, two hundredths of one per cent of the frame, passes. The question is zero or not zero.
- **Greg's queue emptied, and then the morning was corrections.** Between midnight and 04:36 Greg delivered pair after pair -- Small Office, Large Office, Mech Corridor, Mech Corridor South, Storage East, Physical Plant, Tool Room, Machine Shop, Robot Shop, Reactor Control, Reactor Access Stairs, Reactor Elevator, Plan Room, the Library's two seeds, the three Underwater depth seeds, Station 384's fourth round -- and closed his own stale asks (`20260919-083639-design-0668`). His dashboard row then read "All requested design images delivered; awaiting reviews or new asks". From 06:00 he worked only on what came back.
- **Rings closing in batches.** Norm registered in runs, mostly between 02:16 and 02:39 and again between 06:23 and 07:40. Rings closed for Booth 2, Strip Near Relay, Planetary Course Control, Large Office, Mech Corridor and Mech Corridor North and South, Rec Area, Rec Corridor, Corridor Junction, Plain Hall, Systems Corridor East, Library Lobby, Storage East, Repair Room, Machine Shop, Robot Shop, Elevator Lobby, Plan Room, Tool Room, Physical Plant, Reactor Control, Reactor Elevator, Project Corridor, the Projcon Office and Project Corridor East. Many of them took a compute fix on the way in -- a join levelled, a lamp finished, guide wedges removed, an invented passage rebuilt -- rather than another round with Greg.
- **The radiation lock settled, and West repainted.** Six views repainted and right by 08:52 (`20260919-125214-dev-0687`), with the warning sign lettered in 090 from the exact string in the ZIL. See Decisions.
- **Four rooms to the user, four back.** The Conference Room went at 07:04 and was withdrawn four minutes later, because its table was still not round. Planetary Defense went at 07:04 whole in both states, the Main Lab at 08:10 whole with both open-door composites, Project Corridor East at 08:17. Booth 3 went back at 09:12 for re-acceptance. Every one returned with a note about a toggle: "none of the toggles, except floyd, do anything" (Project Corridor East); "computer fixed toggles do nothing / lab lights toggles do nothing" and a bio door that seemed to drive the wrong door (Main Lab); "its cracked does not seem to drive anything" (Planetary Defense); "what does spool reader on toggle do? im not seeing a change when i toggle it" (Booth 3). Bio Lock West, which had gone the evening before, came back with "office door open doesnt seem to do anything, which glimpse (east or west?) does this happen on?" -- the same question the tag exists to answer.
- **State art.** Alfie Control East's `@MOVING` trio and its 270 pair were registered, Alfie Control West's Lawanda-tunnel-end view with it; Planetary Defense's SYSTEM-REPAIRED went in under `DEFENSE-FIXED == true` with a red cast taken out by compute; Project Corridor's `180@COMPUTER-FIXED` went in with its state condition. The three Underwater depth seeds were registered, so D2, D1 and D0 have their first paintings.
- **The count.** Painting stood at about 673 of 778 planned when the session opened and at 708 of 784 when it closed, with 78 of 109 rooms fully painted and 2 pictures left on Greg's side of the line. Forty-one rooms are accepted; Booth 3 left that list when it went back for re-acceptance.

**Decisions**

- **The user: the radiation lock is one chamber, so West is repainted to match East.** Norm had put it as a matter of taste -- "canon calls them one chamber" -- and the user pushed back: "the rad lock question confuses me, if canon calls them ONE why do we have TWO (east and west)". Reading the source turned it from a coin toss into a settled answer. The rooms' own descriptions call themselves the western and eastern halves of one decontamination chamber (`source/comptwo.zil:1767`, `:1780`); they are two rooms only so the airlock interlock has a middle to stand in (`:1899`, `:1915`); and nothing divides them, since East's west opening is the chamber's full bore (`scripts/fabric-lawanda.mjs:124`). The fabric gives both halves the same `wall-panel`, so West's rusty riveted plate was simply off-fabric. The warning sign belongs to East by canon, and was lettered in the same batch.
- **The user: acceptance attaches to the pictures, not to the room.** Two halves given together. "An already accepted room is accepted, no need to rerun through this gate" -- so the toggle gate skips accepted rooms in code, not by convention. And "if the room structurally changes, like the library has, then i need to review it again" -- so when we change the art after acceptance, it goes back. Booth 3 is the case: accepted on 18 September, then its 270 view was locally repainted because the Library behind its mouth had been resized to 12 by 12 on the user's own earlier call. The repaint was 22,926 px inside the doorway and zero outside, and the whole-room review afterwards was clean; it went back anyway, because the picture they signed off is not the picture that is there now. The Library Lobby had the same repaint for the same reason and did not go back, never having been accepted.
- **The user: tell me when the dashboard's cards pass a decade.** Seeds, Views and Reviews, "anytime those number cross a multiple of 10, e.g. Seeds now past 90 / 105". Built on the dashboard's own counting, including the cumulative repair the dashboard makes, so the message can never disagree with the card in front of them.
- **The user: release first, then a click playtest from the start.** Round twenty is to run against one coherent build, because rooms registering underneath a round make its findings stale, and because yesterday's `exitNote` change now feeds the click menu and the playtest harness itself. At the time of writing the release had not been cut and the round had not run.
- **The user: the two escape-pod items are closed.** The "set of controls" label stays where it is, and the ESCAPE-POD-WEB acceptance Norm had set on 17 September is confirmed as the user's own. Neither needed a file change; both leave the backlog.
- **Norm: stop a round rather than spend another.** Station 384's fourth round was held with no fifth asked, because the plates came back at the guide's own dark fill, which is ours to fix. The Lab Office's ring closed at R4 with no fifth round. The Conference Room's DOWN cap was taken off Greg's plate at 08:03 so that compute could place its rim from his R4 and leave him one view to paint.

**What was hard**

- **Three fixes verified in the wrong place.** The glimpse tag was the worst of them, but the same shape happened twice more the same day. The Conference Room's table was reported fixed on a measurement that covered a single 90-degree arc of the rim -- the DOWN cap frames only bearings 74 to 169, because the eye sits south-east of the table -- and the radii reported as correct were 60 to 90 px short of the target circle on their face. The user found it with a screenshot: "conference room table looks exactly the same to me...". Each time a number was trusted instead of a picture. The toggle gate is the standing answer, and it is settled by pixels and nothing else.
- **The Conference Room's table, eight rounds and still open.** R3 through R8 in one morning. R5 moved a lobe 50 to 70 px the wrong way, so compute built R6 out of Greg's R4 and R5 and closed that fault; R7 took out a wedge; R8 stopped describing the fault and showed it instead, the fabric's own outline drawn beside Greg's at twice size. The room is with Norm for review as the session ends and has not gone back to the user since it was withdrawn. (Added later, at the user's request: the whole arc of this table, from the first rejection on 15 September to where it stands now, is its own page -- [The Conference Room table](the-conference-table.md). R7 was registered at 09:55 and the room went back to the user at 10:23 as best-available, with one arc knowingly open; the user's reply found two hard steps in the rim, and it is open again.)
- **A texture measure that could not see the fault.** Reactor Access Stairs came back twice with a swirled stucco where the room is smooth poured concrete, and both times the numbers said it was fixed: the only texture measure was a 3 by 3 high-pass, and the fine grain matched almost exactly. The fault lives at 5 to 20 px, and there it had got worse between the rounds, not better. Both times it was caught by an agent magnifying the boundary at full size. The new measure (below) named the third round's fault -- a flat fill with no surface at all, the opposite failure -- before the pictures were opened.
- **A seed check that cannot see an invented thing standing against a wall.** The Library's 090 seed passed at 1.23 against a 1.8 flag and was plainly wrong: the leftover tables stand against the wall, where their tops lie along the wall's own courses, so the measure has nothing unmatched to catch. The agent refused to register on the number, which was right.
- **Three rounds lost to rectangles drawn too small, and none of them Greg's fault.** The Library's ask named three rectangles and one invented table was inside none of them; the Small Office lost two rounds the same way, once to a ledge's cast shadow that fell below the rect and once to a desk corner beyond it. Greg did what each ask said, inside each rect, every time. The rule written down: when an ask names regions, the regions have to cover every instance of the fault, and the check before sending is to draw the boxes on the blockout and confirm nothing offending sits outside them.
- **A cap compute should never have filled.** Storage East's DOWN cap came back as the walls' plating laid down as decking. The room is 4 by 4 m with the eye at 1.6 m and a 132-degree cap lens, and at that geometry the floor reaches 349 px from the centre while the hole already runs to 363: there is no deck in the border to quilt from at all. It is a precondition, not a quality problem, and it is now checked (below).
- **The lock defeated twice.** Once by an agent editing its own running scripts -- bash resumed them at a stale byte offset, and they lost the line that takes the lock -- and once by Norm, whose lock-taking command was backgrounded and then stopped after it had made the directory but before it wrote its owner token. That lock sat ownerless from 08:21 to 08:58 and cost one agent 75 minutes and another 18. Four rules came out of it: write the owner token in the same breath as the mkdir; release only a lock whose token is still yours; an ownerless lock more than two minutes old is abandoned by definition; and never edit a script that is already running.
- **Fan-out friction in the plumbing.** Two registrations hit a transient Windows file error while the review server held a package's metadata open, which would have left metadata half-written; registration now retries five times. The milestone state file is written through a temp file and renamed, because two agents landing together threw the same error. And a whole delivery batch had to be run by hand because its files were named with the `@` form of a state (`-270@AT-LAWANDA_GREG.png`) which the delivery and precheck parsers did not read -- both spellings are read now.
- **A condition that could never count as painted.** Betty's cabins carried a fourth-state warning because Alfie's car, parked across the platform, was placed by a condition containing an `or`, and the dashboard's clause reader refuses those outright. So Alfie's car and both his cabins stood in front of Betty's finished paintings for ever. Split into its two all-`and` cases, the picture the engine draws is unchanged in every state, and the warning is gone.

**Built**

- **The toggle gate** (`scripts/lib/shots.mjs`: `toggleDiff`, `toggleExemption`, `toggleGate`, `roomAccepted`; driven from `scripts/review-room.mjs`; tests in `scripts/tests/toggle-gate.mjs`). Diffs the switch rows the review already shot, bearing by bearing. A switch already on in the opening state is now switched off instead of skipped, so it is exercised at all. A room can exempt a switch in writing, in its metadata, but only with a reason: a bare `true` would be a silent opt-out of the one check that looks at pixels. Restoring the page after each row tries three times and no more, and says so when it fails, because the user asked for the gate and in the same breath asked not to get caught in an infinite loop.
- **`scripts/lib/relief.mjs`** (with `scripts/tests/relief.mjs`), folded into `precheck.mjs`: is a repaint inside a guide's mask the same material as the held pixels beside it? The picture is band-limited to features 5 to 19 px across and compared locally, tile by tile, against held pixels a few pixels away, with the median of the per-tile ratios as the headline. It reports rather than fails.
- **`scripts/stage-milestones.mjs` and `scripts/lib/milestones.mjs`** (with `scripts/tests/milestones.mjs`): the decade messages, run by `mail.mjs` after every status move, since a status move is the only thing that changes those counts. The first run on a project already under way announces nothing.
- **`cap-fill.mjs`'s surface check** (`capSurface`): before filling, it asks whether the border holds any of the cap's own floor or ceiling, and refuses with the arithmetic spelled out when it does not.
- **`deliveries.mjs` and `precheck.mjs`**: provenance tags (`NORM`, `COMPOSITE`, `CAPFILL`, `LEVELLED`, `MERGE`) told apart from state names, `@` state names read, retried writes, and a blockout matched by the picture's own room first -- two Underwater depth seeds had been measured against a third room's blockout and flagged for geometry they had painted correctly.
- **The review page's "elsewhere" note** (`dashboard/uat.js`): the rewritten glimpse tag described above.
- An accepted-art audit was run before the release check: it walks the packages and reports any accepted room whose registered art is dirty in git. Of 42 accepted rooms it named Booth 3, and nothing else.

All are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Main Lab | Whole -- ring, caps and both open-door composites -- to the user at 08:10; back the same morning with four toggle faults |
| Project Corridor East | Whole, ring and both caps, to the user at 08:17; back with "none of the toggles, except floyd, do anything" |
| Planetary Defense | Whole in both states, to the user at 07:04; back with the access panel's cover and "its cracked" |
| Booth 3 | Back to the user at 09:12 for re-acceptance after its Library vista was repainted; returned with a question about the spool reader toggle |
| Conference Room | To the user at 07:04, withdrawn at 07:08; rounds R3 to R8 on the table, R8 with Norm for review ([the whole arc](the-conference-table.md)) |
| Bio Lock West | Back from the user with the office-door toggle and the glimpse question |
| Radiation Lock West | All six views repainted to East's finish, the warning sign lettered; delivered for review |
| Radiation Lab, Radiation Lock East, Auxiliary Booth | Caps taken and registered; whole in their base state |
| Bio Lock East, Bio Lab, Cryo Elevator, Lab Office | Open-door jamb repairs, caps and R4s registered; rings and composites closed |
| Booth 2, Strip Near Relay, Planetary Course Control, Systems Corridor East, Mech Corridor, Mech Corridor North and South, Corridor Junction, Plain Hall, Rec Area, Rec Corridor, Large Office, Library Lobby | Rings closed and registered |
| Storage East, Repair Room, Machine Shop, Robot Shop, Elevator Lobby, Plan Room, Tool Room, Physical Plant, Reactor Control, Reactor Elevator | Rings closed; their caps are the seven-cap batch, delivered 7 of 7 by 09:22 |
| Reactor Access Stairs | Three rounds on the same wall: stucco, stucco, then a flat fill; still with Greg |
| Library | 270 seed registered, 090 through three rounds for invented tables; with Norm for review |
| Small Office | 013 registered; 193 into a fourth round for a ledge's shadow |
| Station 384 | 000 and 180 held at R4, no fifth round asked: the fault is in our guide |
| Underwater D2, D1, D0 | First seeds registered; the rest of each ring is Norm's to guide |
| Projcon Office, Project Corridor | Rings and caps registered; the Projcon Office still wants a painted computer-fixed state |
| Cryo Anteroom | Accepted (overnight) |

<!-- through: git ce92841 · mail 20260919-132200-design-0702 -->

## 2026-09-20 -- Work through the night, and sixteen rooms waiting for the morning

The day began with the room pipeline deliberately stopped and ended at 00:45 the next morning with 789 of 791 views painted and sixteen rooms sitting in the user's review queue. In between, the user read an adversarial review of how the work is done, approved four changes to it, and said that nothing else was to be built until they were in: "before we begin any other 'real' work building rooms these workflow changes must be included" (a699a1a). Once they were in, at 17:10, the user set the night's task: "you and greg need to work through the night to get as far as you can so that as many rooms as possible are waiting for my review in the morning. make me proud." The standing orders from earlier in the week were still in force -- Greg is never to be left without work, and "I should NEVER be seeing something without your review". Both were tested that night, and one of them failed and had to be made mechanical.

**What happened**

- **The workflow taken apart, and four brakes fitted.** The user asked for the whole machine reviewed with nothing fenced off, weighted for less rework and fewer defects reaching them rather than for throughput (`RoomPolishInstructions/WORKFLOW-REVIEW-2026-09-20.md`, 6190a72). The measurement that shaped it: of 818 registered views, 120 had needed more than one round, which is 195 extra rounds -- about a quarter of the image budget spent painting something twice -- while the median ask closes in 27 minutes. The loop was never slow; it did not converge. Six rooms held 65 of those 195 extra rounds. The contract went to Version 7 (DR-115, d3a83eb): every ask must declare what would settle it and every close must bring matching evidence; a verdict asking for changes must say what is *wrong* rather than where it is, and must attach the boxes drawn on the blockout when the fault names a rectangle; and a view gets two change asks, not three, after which the room goes to the user. `check_design.mjs` also warns when one state key answers both the paintings and the lighting grade, which is the bug that started the review.
- **The underwater climb finished, and the depth rooms accepted.** D2's, D1's and D0's rings and caps were asked, painted and registered between 17:20 and 19:26, each one measured against its blockout rather than against the depth below it; the pod shrinks with depth to a ratio given in the ask, and D1's came back at 0.70 against the 0.69 asked. Underwater's own UP cap went to R7 and R8 and was re-registered, so the accepted room was re-accepted on the 20th. D0, D1 and D2 were accepted by the user the same day. DR-111, open since 16 September -- "you've just exited the pod, so where is it?" -- was closed on the user's "the pod is ok", with the arithmetic showing that its DOWN-cap half could never have been built: at the pod's real position, about 6 m out at bearing 165, it is outside a cap that reaches 3.5 m across the seabed.
- **Twelve caps had been unregisterable since the 19th, and nothing was wrong with them.** `precheck.mjs` could not find a cap's camera: it matched a three-digit group anywhere in the filename, so `DR-106_STORAGE-EAST-CAP-UP_GREG.png` read as bearing 106 and was judged against the room's registered TURN-106; and a cap has no bearing at all, only a pitch, with its geometry in a `_SQ_BLOCKOUT` sidecar the parser did not look at (dc3f9ac). Fixed, fifteen caps across eleven rooms were registered within the hour (6cf7fda), each inheriting its true lens -- 131 at Machine Shop, 133 at Robot Shop, 132 at Storage East, because a cap sits at whatever its ring's reach sets.
- **Eleven floor caps built by compute instead of bought from Greg** (d6a398f). Fifteen rooms had closed rings and no caps, roughly thirty images if all of it went to Greg; `cap-fill.mjs` quilts a plain floor inward from the ring's own border, leaving only the fittings overhead as image work. Five of the eleven refused at first and named their own remedy, a larger block size. Two refused on the geometric precondition added the day before, and those two really were Greg's.
- **The night's cap queue.** Thirteen UP caps were asked in one message at 20:44, "each one closes a room for the user's morning", then four more views at 22:17 and the last two at 23:59. Greg painted through the night; Norm reviewed and registered each delivery as it landed. The Library's ring closed with its 000 and 180 repainted, and Reactor Access Stairs came whole at 00:36 after five rounds on its concrete.
- **Sixteen rooms went to the user**, from Robot Shop and Storage East at 21:25 to Lab Storage at 00:39, each one with its contact sheet read at full size before it was sent.
- **The count.** Views painted went from 768 at the start of the night to 789 of 791, and 107 of the 109 rooms are now whole. The two left are the Library's UP cap and Small Office's DOWN, both held on faults in Norm's guides. Forty-one of the 105 game rooms are accepted, exactly as when the night began: the night's work is in the queue, not through it.
- **Released as it closed.** Each push to `main` releases the public site, and there were ten across the day and the night, the first at 07:19 and the last at 00:46.
- Greg's Deck Nine case study, delivered on the evening of the 19th, was committed and published with that day's work (a6fea95e); [Building Deck Nine](deck-nine-room-reconstruction.md) is on the wiki, and Norm's review of it was still open at the end of the night.

**Decisions**

- **The user: the brakes come before the rooms.** Items 1 to 4 of the review were approved -- "approved" -- with the circuit-breaker set at two asks rather than three ("stopping at 2 is fine"), the tighter of the two readings chosen ("your interpretation is correct, not the looser one"), a genuinely new fault resetting the count, and Norm's proposal taken for what declares an ask settled ("use your proposal"). The reason for stopping the pipeline is the review's own number: every room built before the brake exists is another room built without it.
- **The user: "I should NEVER be seeing something without your review."** Said when Underwater D2 reached them as "whole, six of six" with five views reviewed that session and the sixth inherited from an earlier one, and they opened it and found rocks floating in that sixth view. HANDOFF had said since the start to review a room whole before sending it on; it was skipped and nothing noticed. A rule that depends on remembering is not a rule, so it is now a receipt and a refusal (below, 0e07730).
- **The user: "wait for the cap."** They asked whether D2 could be tried in the dashboard before its UP cap landed, and on hearing what acceptance actually does, said to wait. For an art room, acceptance is not the end of review but the switch that puts the room on screen, so accepting at five of six views would put a hole in the climb at the one moment the player looks up. Written into HANDOFF as a general rule, since the seat in the pod's safety web behaves the same way (94a60e8).
- **Norm: the brake does not reach back.** Built as written, it counted the whole mailbox, and seventeen views that were mid-flight and going fine were already at or past the limit the moment it went live. It now counts only rounds asked under Version 7, which is readable from the message itself, and was measured against the live mailbox before it was let near real work (286d721).
- **Norm: do not ask for a third cap over a guide that is known to be wrong.** After two caps came back wrong twice for faults in his own guides, the Library's UP cap guide was rebuilt from the corrected ring, inspected, and not sent: it still shows the ceiling fixtures as L shapes at two corners. "Greg is clear because he is blocked on me, not because there is nothing to paint" (cbca2f7, mail `20260921-044429-dev-0778`).

**What was hard**

- **The toggle gate was judging a sliver.** The four shuttle control cabs each reported fifteen or sixteen failing switches -- every switch in the room, Floyd included, when Floyd's cutout plainly draws. Not sixty-two faults but one: the review page lays the switch list under the stage, so a long list squeezes the canvas rather than merely moving it, and the switch shots came out 108 to 143 px tall against the level shots' 559. The window is now grown until the stage is back, and the drag point re-centred with it; Alfie Control West went from fifteen failures to three (a6dcdc3). This is the other half of the 19 September fix, which had made the clip follow the canvas but not stopped the canvas shrinking.
- **And a second half of that, still open.** In those same cabs the camera does not turn during the switch phase at all: hash the eight switch-base shots of Alfie Control West and there is one distinct image out of eight, while the same room's level shots are eight distinct and another room's switch shots are eight distinct. Four causes were ruled out with evidence rather than guessed at -- the squeezed canvas, a drag overshooting the canvas, the age of the review, and Floyd's own bit. It is in the backlog with the numbers (c4e008d).
- **Three toggle failures were canon, and the packages had already argued them in prose.** The Tool Room's flask stands 50 degrees below level, under every level view's bottom edge, and the contact sheet shows it plainly in the DOWN cap; the Reactor Elevator's door is always open from inside the car; the Machine Shop's ladder across the rift is a sliver under a pixel high at 70 to 79 m. All three now carry `states.<STATE>.noVisibleChange`, the field the gate reads -- which turned out never to have been in `ROOM-METADATA-SCHEMA.json`, although `shots.mjs` has documented and read it since it was written. It takes a string and not a boolean, because a bare `true` would be a silent opt-out of the one gate that looks at pixels.
- **Reactor Control is held back on a defect in the page, not in the art.** Its elevator doorway composites wrongly in both door states: shut reads mean 10.8 against the surrounding wall's 31.5, a near-black void, and open reads 47.5, a flat slab with none of the car's depth. Both ends are sound -- the accepted painting shows proper shut metal leaves, and the fabric graybox draws them exactly as the code says -- so what the painted page composites into the doorway cut is the thing that is wrong. The toggle gate cannot catch it: the switch moves 90,197 px and passes. Open, in the backlog, and worth checking against the other door rooms.
- **Two caps came back wrong twice, and both times the fault was in Norm's guide, not Greg's paint** (e38d4fe). Small Office's DOWN cap was sent back twice for composite debris at the desk's foot, with region boxes drawn both times; the shapes are in the guide before anyone paints on it, because `underpaint.mjs` reprojects near-field ring content -- TURN-283's chair and a pale slab along its very bottom edge -- into the cap plane and stretches it into shards. The Library's UP cap is the same mistake with a different root: its guide stitches four ring views and one of them disagrees with the fabric. Measured as the ceiling band's dominant gradient ratio against the blockout, 000 reads 11.28 against 6.41, 090 and 270 agree with theirs, and 180 reads 0.66 against 6.35 -- ribs at 90 degrees from the fabric, in a view registered twice without anyone seeing it, both times while looking at the tables. Both asks and both region boxes were withdrawn, neither counts against Greg, and the lesson is in the backlog: when a cap comes back wrong twice, look at the guide before the painter. Greg's 180 R3 fixed the ribs, 12.51 against the blockout's 6.35, five minutes after being asked.
- **The measures could not settle two of the night's judgements, so pictures did.** The Library's 090 R3 scores 1.23 for invented structure and R2 scored 1.23 too -- and R2 was wrong, because check-seed cannot see an invented object standing against a wall. Lab Storage's 090 flagged three regions of invented structure that are the room itself: canon is a tiny supply room of dusty shelves, and the painting fills shelving the fabric models, which is not the same thing as free-standing tables on bare carpet. Both were decided by putting the pictures, the marked fault sheet and the blockout side by side (a959b2ee).
- **A parser meeting a spelling it did not know, for the third time.** The `@` form of a state name on 19 September, a blockout matched by request number the same day, and now a cap's bearing. An hour after writing that lesson down, the registration script hid two more caps because it hardcoded the `DR-106` prefix and they had come in under DR-114. Generalised, both registered.
- **Floyd's sweep, and the answer to a question asked a week ago.** On DORM-A the user had asked, "do we need to sweep ALL the rooms for this defect?" Of the 71 rooms with a Floyd switch shot on file he draws in 66. The two rooms the user reported are fixed. Five more looked like defects, and every one of them drew him the moment it was re-reviewed -- stale results from 18 September, not faults in the art. The five that remain are the shuttle rooms, where the gate never turns the camera to the bearing he stands on, which is the open bug above. So the answer is no: there is no room-by-room Floyd defect to chase.

**Built**

- **Contract Version 7's refusals** (`scripts/lib/mail.mjs`, `scripts/mail.mjs`, `scripts/check_design.mjs`, d3a83eb): `--settled-by` on every ask with a matching `--evidence` on its close, `--fault` and `--regions` on a changes verdict, and the two-ask brake. One deliberate deviation from the plan -- the tool cannot set `NEEDS USER` itself, because a refused send writes nothing, which is the mailbox's oldest guarantee, so the refusal names the request and says to set it. Seventeen new test cases.
- **The review receipt** (`scripts/review-room.mjs`, `scripts/lib/mail.mjs`, 0e07730): every whole-room review writes `scripts/out/review/<ROOM>/reviewed.json`, each registered view by content hash, recording what that run actually had in front of it. The mailbox then refuses `--status-with user` unless the receipt covers every registered view at the pixels it has now. Three ways to fail, each named in the refusal: no review on record, a view registered since the last one, or a view repainted since it was reviewed. An inherited approval cannot pass it.
- **The gate's window** (`scripts/review-room.mjs`, a6dcdc3 and c4e008d): the review window grows until the stage is back at full size before the switch rows are shot, and `turnTo` now turns in bounded steps, a 180-degree turn having been asking for a pointer 290 px outside a 994 px canvas.
- **`precheck.mjs`'s cap cameras** (dc3f9ac): a request number is not a bearing, a cap has no bearing at all, and a cap's geometry comes from its `_SQ_BLOCKOUT` sidecar.
- **`cap-fill.mjs` at scale** (d6a398f): a block-size option that its own refusal recommends, and eleven caps filled, restored and registered in one run.
- **`ROOM-METADATA-SCHEMA.json`**: `states.<STATE>.noVisibleChange`, a written reason why a switch changes nothing on screen, which the toggle gate reads.
- **Art rooms on the dashboard** (`dashboard/`, 1eac996): the four underwater depths and the seat in the pod's safety web each get a review link on the row of the room they are a view of, sorted by eye height so a climb reads as a ladder. Deliberately not added to the room counts, so the page still reads 105 of 105; verified in the rendered page rather than in the code.

All are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Robot Shop, Storage East | Whole and reviewed, to the user at 21:25 |
| Corridor Junction | Whole and reviewed, to the user at 22:10 |
| Bio Lab, Kalamontee Platform | To the user at 23:26 |
| Repair Room, Station 384 | To the user at 23:27 |
| Tool Room, Reactor Elevator, Rec Corridor | To the user at 23:29 |
| Physical Plant, Large Office | To the user at 23:46 |
| Booth 2, Mech Corridor North, Mech Corridor South | To the user at 23:47 |
| Lab Storage | To the user at 00:39, the sixteenth and last; its UP cap keeps one residual on the record, two dashes of about 80 by 2 px on the south join, rather than going back |
| Underwater D2, D1, D0 | Rings and caps painted and registered; all three accepted by the user on the 20th. D2 was taken back off their plate the same evening for floating rocks in a view nobody had reviewed that session; the three 000 seeds were repainted over re-cut blockouts and registered, and it sits with Norm |
| Underwater | UP cap repainted to R8 and re-registered; accepted again on the 20th |
| Reactor Access Stairs | Whole at 00:36 after five rounds on its concrete; held on two switches that move nothing, one of them its own lamp |
| Reactor Control | Whole, but held back: the page composites its elevator doorway wrongly in both door states |
| Library | 090, 000 and 180 closed, the last of them at R3 after its ceiling ribs were found running 90 degrees from the fabric; the UP cap is the last view of the room and waits on a guide fix of Norm's |
| Small Office | Ring and UP cap in; the DOWN cap is the other of the project's two unpainted views, waiting on the cap guide |
| Plain Hall, Rec Area, Systems Corridor East, Planetary Course Control, Library Lobby, Mech Corridor, Strip Near Relay | UP caps, and in some cases DOWN caps, painted through the night and registered |
| Machine Shop, Repair Room, Elevator Lobby, Plan Room, Lab Office, Tool Room, Physical Plant, Reactor Elevator, Storage East, Robot Shop | Fifteen caps registered once the parser could find their cameras; eleven more floor caps filled by compute |

<!-- through: git cbca2f7 · mail 20260921-044429-dev-0778 -->

## 2026-09-21 -- Thirty rooms accepted, and five dead toggles with one cause

The day was the user's, spent at the dashboard's acceptance gate on the sixteen rooms the night had queued and the rooms that followed them. Thirty-two rooms got a verdict: thirty accepted and two sent back. Accepted rooms went from 41 of 105 when the last entry closed at 00:56 to 69 by the evening, past 52 before seven in the morning. What the user found on the way through was mostly not paint. It was the things in the rooms -- a magnet hanging in front of the shelf it stands on, a brown block where a lab uniform's card should be, two towels in the escape pod where there is one, and toggle after toggle that changed nothing on the screen. The day went on those, and on the twenty-four missing state paintings Greg made before his image budget ran out until Thursday evening.

**What happened**

- **One rendering path was behind four of the user's reports across five days** (3c56c760). `graybox.js` drew a container's contents as their own picture only where the room had authored `contentsAt`, and almost no room had; everywhere else a thing with perfectly good art came out as a 0.3 m tan box. That is Lab Storage's "brown block being painted on the lab uniform" (21 Sep), Storage East's carton, Planetary Defense's access panel (19 Sep) and the Infirmary's "objects render as blocks" (16 Sep), each read at the time as that room's own problem. Contents now use their picture wherever the thing stands, flat things lie flat, and of every open container in the project 18 contents draw as themselves and none falls back to the box.
- **Nothing was ever floating** (6d2ffbda). The user, on the Tool Room's magnet: "not ON the shelf, its like hanging in front of the shelf". Every object in the room was seated exactly -- the magnet's foot at 1.870 against a board top of 1.870 -- but `partsForTurn` drops a painted room's fabric, and the plates that replace it write no depth. Fifteen meshes in a painted Tool Room, and nothing in the scene for an object to be hidden by, at any draw order. The fabric now returns as a depth-only mask between the plates and the things that move; it cuts the magnet at foot plus 0.075 m, the quarter the package note always said the board's front edge should hide.
- **The 3x rule met canon, twice, and canon won.** The user's "3x bigger", asked three times about three different objects, had scaled each prop by its own size and never against what holds it. The fromitz boards came out at 0.51 m inside a 0.330 m carton, 1.58 times their own container, with a description reading "seventeen-centimeter"; the canteen at 0.75 m stood in a 0.24 m dispenser, in an octagonal niche the art had painted for the canon flask, and read with its left side cut away. Both went back to canon size, and one rule came out of it: where canon paints the container, canon sizes the thing inside it. A fit check over every container now reports nothing above 1.00x, the worst being the pod's goo at 0.88x.
- **A sweep of the objects rather than another sweep of the rooms** (a2044c0e, `scripts/drop-sweep.mjs`). The review page shoots a room in its opening state, so it cannot see a dropped thing at all, which is why the user and not the gate found the magnet, Storage East's speck of an oil can and Lab Storage's block. One bad object shows up in every room it can reach, so 44 objects at 476 anchors were checked by arithmetic, with no browser: 25 of the 44 come out under 20 px at the median anchor, every keycard at 5 px and the Admin Corridor key at 3. That is not three one-off notes; it is more than half the inventory.
- **The eight flat cards, and an ask size cannot answer** (dev-0787; Greg's eight, design-0765). A thing standing upright draws at 160 px per metre of its height and a thing lying flat at 95, so the cards lose 40 per cent before they start. Rather than tripling them again, Greg was asked to redraw the seven keycards and the brass key in three-quarter view, standing, at exactly their present sizes: worth 1.68x for nothing, and no change to canon. He delivered all eight the same afternoon.
- **Five "the toggle does nothing" complaints turned out to be one cause** (dev-0794). `turn.js` `pickVariants` falls back to the base texture when no variant matches, so a state with no painted variant re-hangs the same picture, pixel for pixel, with no warning. It is worst where the base views themselves carry a compound condition, as Bio Lab's seven do. Norm added a check to `review-room.mjs` that reports any switch no painted variant can answer, exempting things that draw their own picture -- which is exactly the distinction the user had already made: "none of the toggles, EXCEPT FLOYD, do anything".
- **Two of the five needed no paint at all.** The Reactor Elevator's west door has no shut state to draw: the only way into the car needs the door open, the rule that shuts it leaves it alone while the player is inside, and by hand "It won't budge" (compone.zil 1460-1461, 1488-1498, 1504). Project Corridor East owns nothing of its own (comptwo.zil 1480-1491); its two switches belong to the Project Control office, 34.3 and 37.7 m down the corridor's long sightline, where a 0.4 m feature draws under 5 px and the gate measures 2 px changing. Both were recorded as `noVisibleChange` with the measurements rather than sent to Greg, and both rooms went to the user and were accepted.
- **The duplicate towel, reported repeatedly and never once reproduced, was found** (dev-0793). Both provisions had been marked `painted: true` days earlier to stop exactly this, and the flag was dead: `design.js` honours `painted` and `paintedWhen` only for `meta.largeObjects`, and these were declared on `meta.objects`, where nothing read them. So the cutout kept drawing on top of a painting that already had the towel in it. The deck cutout sits at y 0.315, which a level review frame clips, which is why three of Norm's renders showed one towel while the user kept seeing two. Reproduced from the user's own switch combination, fixed, and a sweep of every package finds `painted` on `meta.objects` in exactly two places, both in this room.
- **Greg painted the missing states, and twenty-four went in.** Bio Lab eleven, Main Lab nine, Kalamontee Platform two files covering three states, Elevator Lobby two. Two arrived one pixel narrower than the view they replace and had to be re-exported; registration now refuses a size mismatch outright rather than hanging a variant whose every edge disagrees with its base.
- **The dashboard had been understating the work** (0f108704). The stage cards counted a stage done only where something had written a date for it, and nothing ever wrote `views` when a room's last view was registered or `reviewed` when a room was hung whole. `scripts/stage-stamp.mjs` fills those from the artefact each stage leaves behind: views went from 68 of 105 to 103, reviewed from 67 to 86, seeds from 56 to 105. Nothing is invented and no existing date is touched.
- **A new working order, and both of its top items are Norm's** (0f108704). The list it replaces was written on 15 September, when the opening sequence was the thing that had to finish, and all six of its items are done. At 789 of 791 views the queue is no longer about rooms: DR-117 is the object layer, size, seating and draw order, and DR-118 is the switches that move nothing, nineteen rooms of them. That is said plainly in the ledger so that a short queue is not read as an idle one.
- **Work landing in Greg's queue now sends a Telegram line too** (1885bb82), at the user's request: "if something goes into gregs queue, alert rufferto through telegram." Only a room arriving on the user's own plate had done so before, so work could be queued for Greg unannounced. It fires on new asks addressed to Greg and on a room handed to him, and carries the total number of open asks so the size of the queue is in the line.
- **An exit plate was nudged off the Winding Stair's balcony** (daec9a80). The user, with a screenshot: "would be nice to move this text up and to the left so it doesnt cover the most interesting part of this view." `labelOffset` existed for objects and plaques but not for exits, so no package could say it; exits have it now, and the DOWN plate moves 1.05 m up and 1.4 m south into the open sky. The 1.4 is sized for the long form of the text, "DOWN · Balcony", which is about 2.16 m wide against the short form's 0.875 m.

**Decisions**

- **The user: drop the Deck Nine review.** "lets drop the deck nine review as a task" (dev-0788). It had been open since the 19th through three sessions, and each time the room work was worth more, which is its own answer about priority. The article and all six of its figures are published either way; what was dropped is Norm's formal review pass over it.
- **The user: no shared-code changes until after Thursday.** The Escalator's fix touches `graybox.js`, and a regression there would need repainting that Greg cannot do while his budget is out. The room stays rejected until then.
- **The user: size is settled; the cards are an art problem.** The 3x rule is theirs, and it is not to be applied again to the keycards. The angle they are drawn at is what changes.
- **Norm: withdraw an ask rather than buy a painting that cannot show anything.** Two of the five toggle complaints were canon behaving correctly, so they were withdrawn with the canon citations and the measurements, and recorded in the metadata so that the next sweep does not raise them again.
- **Norm: sort the dead switches before sending them.** Today's sweep turned up dead switches in about fifteen more rooms, but a good number name a neighbour's fitting seen from eleven to nineteen metres away, and Project Corridor East proved that class needs no paint at all. They are being checked one render at a time, so that what reaches Greg is art that is genuinely needed (dev-0816).
- **Norm: do not queue art nobody has asked for.** Main Lab's camera 230 now carries two variants of equal specificity, so with both states true at once one of them can never hang. It wants a single painting of the two together; the room has just been accepted and nobody has complained, so it is recorded rather than queued.

**What was hard**

- **The new check's first report was a room that was already correct.** The review-room check did not read `states.<NAME>.noVisibleChange`, the field that exists precisely to answer it, so the Reactor Elevator was reported as missing a painting and that was passed on to Greg as work. The check honours the field now and the room reports nothing. Norm's own fault, and said so when withdrawing it (dev-0796).
- **`precheck` failed six of Greg's eleven good Main Lab and Kalamontee paintings** with "accepted MOVES THE ROOM". The check was wrong, not the paintings: `check-state` measures how many of the base's pixels survive, which is the right question for a local change like a door swinging and meaningless for a global one. Main Lab's lights coming on relight the whole room by x1.70 to x2.07, so the near field cannot be held by construction. Norm measured instead the thing a relight cannot move, where the edges are: all eleven align with their base at shift 0, correlation 0.76 to 0.97. The reasoning is written into each registration note so it is not argued again.
- **Two good paintings would not register because they were one pixel narrow.** Nothing in either picture was wrong. It costs a round trip each time, so the export size is now refused rather than tolerated, and the note went to Greg with the Thursday queue.
- **The Escalator is still rejected, and the cause is not the art.** The user: "floyd does not show up when the toggle is checked (though the label 'multi purpose robot'" appears). `graybox.js` keeps an actor's place as a floor point and stands the figure at half its own height, so the y in `actors.<ID>.position` is discarded. The Escalator is a 17.6 m shaft with the eye at 9.42 m and Floyd authored at 6.67 m, so he is drawn about 6.7 m too low, at the bottom, with his label and pick target down there with him. Of 110 actor placements in the project this is the only one with a non-zero y, so the fix is an opt-in `anchorHeight` that leaves every other room bit-identical by construction. Designed, agreed with the user, and held in the dev backlog until after Thursday. Two alternatives were tried and rejected: moving Floyd into `objects`, which `check_design` refuses because he starts in the Robot Shop, and drawing a second Floyd, which leaves the stray label and dead pick target that were the reported bug in the first place.
- **The microbe is the only actor in the project with no picture.** The user, on Middle of Strip: "microbe actor is not drawn - big purple box". `MICROBE` has no entry in `characters.json`, so graybox falls back to a coloured box. Of 110 actor placements, 109 draw a cutout. The room's own metadata has always said it should be an overlay that moves and is never painted into any view, so this was never anything but a missing picture. It is first in Greg's Thursday queue; the room stays rejected until it exists.

**Built**

- **`scripts/drop-sweep.mjs`** (a2044c0e): four checks over the packages, the world and the art, with no browser -- a thing with no picture, a picture whose height disagrees with the height its room placed it for, how tall a thing actually comes out in pixels at each of its anchors, and an anchor outside its room. A raised anchor is explicitly not a fault: the Escalator's are on its steps.
- **`scripts/stage-stamp.mjs`** (0f108704): fills a room's missing stage dates from the artefact each stage leaves behind, and runs on every status move before the milestones, so the dashboard's counts stop drifting below the truth.
- **`review-room.mjs`'s dead-switch check**: any switch no painted variant branches on is reported, with things that draw their own picture exempt and `noVisibleChange` honoured.
- **`mail.mjs`'s Telegram trigger for Greg's queue** (1885bb82), and **`labelOffset` on exits** in the schema and `graybox.js` (daec9a80), and **`painted` and `paintedWhen` carried through for `meta.objects`** in `design.js`.
- **The charts on [How we work](how-we-work.md) redrawn through 21 September**, and every figure quoted in that page's prose re-checked against them. Three of its claims had moved: rework now leads on three days rather than one, the 18th has passed the 16th as the mailbox's busiest day, and the widest break in the flow is no longer the ISP outage but the 30 hours on the 19th and 20th when the pipeline was stopped on purpose.

All are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Escape Pod, Kitchen, Tool Room, Storage East | Accepted after the object work: the duplicate towel gone, the canteen back to canon size, the magnet seated behind the board's edge, the oil can at 3x |
| Bio Lab, Main Lab, Kalamontee Platform | Missing state paintings delivered and registered, and all three accepted the same evening |
| Elevator Lobby | Its upper and lower car-open states painted and registered; still with Norm |
| Reactor Elevator, Project Corridor East | Accepted with their dead switches recorded as `noVisibleChange` and measured, not painted |
| Lab Storage, Infirmary, SanFac E, Systems Monitors, Plan Room, Projcon Office, Project Corridor, Large Office, Physical Plant, Robot Shop, Repair Room, Rec Corridor, Corridor Junction, Mech Corridor North and South, Booth 2, Helicopter, Fork, Station 384, Bio Lock West and East | Accepted through the day, thirty rooms in all |
| Escalator | Rejected: Floyd is drawn at the foot of the shaft because his authored height is discarded. The fix is designed and held until after Thursday |
| Middle of Strip | Rejected: the microbe has no picture at all. First in Greg's Thursday queue |
| Small Office, Library | Still the project's last two unpainted views, both waiting on guide faults of Norm's |

<!-- through: git 6d2ffbda · mail 20260921-233622-dev-0816 -->

## 2026-09-22 -- Greg back two days early, and the dark doors that were never the paintings

Greg's image budget, expected back on Thursday evening, came back on Tuesday morning. Norm first committed and released the 21st's uncommitted work (4f04cee8, 07:55). Then he fanned out triage agents over about twenty rooms the user had not yet accepted, each with switches that changed nothing on the screen. Each such switch went one of three ways. It was correctly invisible, and recorded as `noVisibleChange` with measured geometry and a canon citation. It needed a small painting from Greg. Or it could be built by compute from the neighbours' paintings. For a player, doors now open onto what is really behind them, and a family of near-black slabs in the elevator rooms is gone. Accepted rooms went from 69 of 105 in the morning to 86 in Norm's last status of the session. The dashboard's record at 12:36 counts 88.

**What happened**

- **The dark slabs in the elevator doorways were the page, not the paint.** Waiting Area, Reactor Control, Lab Office and the Upper and Lower Elevators all showed a flat dark block where a painted door should be. In each, the page drew the fabric's shut door leaves over a painting whose views had never said they showed the door shut (dev-0851, dev-0854). The fix is data only, the one the Kitchen had on 14 September: each base view now declares its door state, such as `LOWER-ELEVATOR-DOOR without OPENBIT` in Waiting Area. No shared code changed, and all 76 accepted rooms were checked byte-identical.
- **Doorways built from their neighbours.** Where a door opened onto a room that was already painted, Norm built the open view by compute, with 0 px changed outside the opening. The views: both radiation locks' far doors; Lower Elevator's three door-open views onto the lobby and the Waiting Area; and Upper Elevator's six, one of them onto the Tower Core's drum and stair. Also Reactor Control's door onto the car (101,438 doorway px, dev-0851), Plain Hall's sea following the Courtyard's day 6-7 and day 8 seas, Systems Corridor East's cube lid, and the defense warning light going dark through Systems Corridor's north door (aa68da04). Two doorways that showed placeholders were rebuilt the same way: Systems Corridor East onto the Library Lobby (62,400 px, dev-0848), and the Auxiliary Booth onto the Lab Office (135b49e6).
- **Greg painted through the morning.** He delivered the microbe (first at 08:00), the blue speck and the acid-fused dial as cutouts, and the relay's shattered and closed states. Also Betty's car at Kalamontee and the Radiation Lab's lock door open. Then the Elevator Lobby's call-button lights, the Lab Office's north wall as locked file drawers where a second desk had been painted, Planetary Defense's closed access panel and empty socket, and the Machine Shop's acid-damaged dispenser. Last came repaints of Systems Corridor West's ceiling and Planetary Course Control's west wall, and the Lab Office desk seen from above.
- **Every one of Greg's deliveries came back as a full-frame regeneration.** Tens to hundreds of thousands of pixels changed outside the asked box (dev-0840). Norm composited only the asked rectangle into each registered view, and put back what should not have moved. The dispenser's button labels had been re-lettered ("KUULINTS" became "KAUALTS", "ASID" became "ASD"), and three boards that were not asked for had been redrawn in the empty-socket panel. Greg was told to edit only inside the box, never to re-letter canon's fixed spelling, and to inpaint rather than regenerate if his tool can.
- **Asks withdrawn before they cost a picture.** Betty's moving and door-shut states can never be seen from inside the car: canon shuts the cabin door in the same step the car starts, and the car only starts from a cabin (globals.zil 1903-1906; dev-0824). Greg himself asked before painting the Cryo Elevator's three gaps and was right: every reachable state was already painted (design-0780, dev-0829). The Alfie cabins' "door never closes" note was the same canon, and those three rooms were accepted on it.
- **Floyd stands on his tread** (4eceecff). The fix held back on the 21st went in with the user's approval. An actor may opt in to its authored height with `anchorHeight`, and only the Escalator does. Floyd's footprint in Storage West was checked pixel-identical to its 21 September review, and in Dorm A and the Balcony his top and bottom rows are unchanged at every bearing. The Escalator was accepted.
- **Main Lab went back to the user on the evening of the 21st** (dev-0817), because a lights-on painting was registered after they had accepted it: our change to accepted art, so it went back. It was accepted again.

**Decisions**

- **The user: avoid systemic changes that could regress accepted rooms, and escalate anything that touches completed work.** They said it again today, and it shaped the day. The door slabs were fixed in the packages, not in the page. The two code changes the user did approve came with evidence that accepted rooms did not move: the Escalator's opt-in height, and later three tool fixes (d18fe697).
- **The user: Transportation Supply is lit only by the player's lamp.** Shown previews, they chose the 35% one. The room has no light of its own (compone.zil 1182-1195), so all six views were graded by compute: the wall straight ahead keeps 35% of its painted brightness, and the south doorway keeps its own light. The art of an accepted room changed, so it went back to them at 12:40 (dev-0857).
- **The user: the Comm Room's flashing sign is painted as three cutouts,** one per message, with canon's exact spelling, so that the page can make it flash later (dev-0852).
- **The user approved the lit Main Lab seen through the radiation lock.**
- **The user: the Machine Shop's spout is parked.** "revisit after rooms are accepted, take no action now". Drawing the flask under the spout needs a shared change to the page.
- **The user: the Conference Room goes last.** "i want to leave conference room to last, maybe we need to repaint the whole thing as a rectangular table". The Rec Area's view through the conference door is built from that room, so it waits too (HANDOFF).
- **Norm: sort before asking.** A switch that changes nothing went to Greg only when a render and the canon both said a painting was missing. That is why today's asks to Greg were small, and the eight he delivered by midday each came within an hour of being asked.

**What was hard**

- **Upper Elevator went to the user too soon.** It was sent at 10:38. A later sweep for fabric drawn over paintings found 23 dark meshes from the far landing drawn over the 180 view whenever the car was down, so Norm withdrew it at 12:02 (dev-0850). It was fixed the way Lower Elevator had been that morning, with door-open views keyed on where the car is, and re-sent at 12:26 with no fabric over the painting in any state (dev-0853). The user then accepted it.
- **Pictures that could not be taken as delivered.** Every delivery came back as a full-frame regeneration, so each had to be cut down to its box. That is safe, but it costs a check per picture, and it only works where the box is known. A relettered label inside the box is exactly the kind of change a crop cannot catch.
- **Three tool faults, each found by today's work** (d18fe697). `precheck` read Elevator Lobby's `000@UPPER-ELEVATOR-UP` as the room's UP cap, because the state's name ends in `-UP`. It now reads a bearing only from before the `@`, with a test that fails on the old code. `uat.js` counted the depth-only masks of 21 September as fabric drawn in front of a painting, which buried Waiting Area's real door slab under about 38 false warnings. And the review server's clean-up had deleted everything in a build folder except the dll a running server held, so every fanned-out agent's next build into it failed on the locked file (MSB3027). A folder Windows refuses to rename is now left whole.
- **Why the subtasks were slow.** The user asked. There were two causes. The single render lock that keeps fanned-out agents from fighting for the CPU also puts each 10 to 15 minute review in a queue behind the last. And Norm found five review servers orphaned from the 20th and 21st still holding the build folder. The tool fix above stops a held folder being half-deleted again.
- **Still open.** Systems Corridor came back from the user: "when defense fixed is false, there is a 2d red block that appears in the glimpse. needs to be better graphics". The warning display is with Greg as a repaint (dev-0856). Planetary Defense came back too, for its name plate: "access panel text label should be moved up a bit".

**Built**

- **`anchorHeight` for actors** in `graybox.js`, `design.js` and the schema (4eceecff), used by the Escalator alone.
- **`precheck` reads the view before the `@`**, **the review server leaves a busy build folder whole**, and **the review page leaves masks out of its over-painting list** (d18fe697).
- **The charts on [How we work](how-we-work.md) redrawn at 12:40 on 22 September** by their own scripts, `scripts/mail-flow.mjs --csv` and `scripts/work-categories.mjs --csv`, and the page's figures re-checked against them. On the 22nd, to midday, every one of 16 asks went to Greg and none to Norm: Greg's deliveries carry no ask of their own, so a day spent registering them does not show on the chart. Rework has now led on four days. One finding from the redraw: the work chart asks git for commits since 10 September with no time of day, and git starts that window at the current time of day. So the 10th's bar moved from 97 to 90 percent between an evening drawing and a midday one. It is written down on the page and in [Tools](tools.md), and the script is not changed.

All are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Escalator, Middle of Strip | Accepted: Floyd on his tread, and the microbe drawn from Greg's cutout where the purple box was |
| Waiting Area, Reactor Control, Upper Elevator, Lower Elevator, Elevator Lobby | Accepted once the door slabs were fixed in data, the doors opened onto their neighbours by compute, and the lobby's call buttons lit |
| Radiation Lock West and East, Radiation Lab, Cryo Elevator, Plain Hall, Mech Corridor | Accepted, their dead switches either built by compute, painted by Greg or recorded as `noVisibleChange` with canon |
| Systems Corridor East, Auxiliary Booth | Accepted after their doorways were rebuilt from the neighbours' corrected paintings |
| Alfie Control West and East, Shuttle Car Alfie | Accepted: the door that "stays open the whole time" is canon, since it is only shut while the car moves |
| Transportation Supply | Accepted during the day; back with the user at 12:40 for the lamp-lit grade they chose |
| Systems Corridor | Sent back for its red block; the warning display is with Greg |
| Planetary Defense | Its two notes fixed and sent; back again for its name plate, with Norm |
| Lab Office, Strip Near Relay, Machine Shop, Systems Corridor West, Planetary Course Control, Shuttle Car Betty | Greg's paintings delivered; with Norm for review and registration |
| Comm Room | With Greg: the sign as three cutouts |
| Small Office, Reactor Access Stairs, Library | Blocked, per Norm's last status |
| Conference Room, Rec Area | Parked until last, at the user's word |

<!-- through: git d18fe697 · mail 20260922-164024-dev-0857 -->

## 2026-09-23 -- The user plays it to the end, and "clickable" turns out to mean less than it said

For the first time the user played the published game themselves, from start to finish, as a clicker, and Norm kept a log of every note (`playtests/2026-09-23/PLAYTEST-LOG.md`). It began on the evening of 22 September. The first thing it found was that the public site was out of date. It ended on the morning of the 23rd with the ending reached: 74 of 80 points, the rank of Cluster Admiral. The last stretch, from the Comm Room on, was played from checkpoints Norm built during the playtest, so that the user could try one puzzle without replaying the opening. The log holds 25 items, each with a diagnosis, and the user triaged them at 09:08 (9b969ec9). For a player, the public site is current again, a release now takes minutes instead of a quarter of an hour, and a set of fixes has been decided: things that can be seen but not clicked, green boxes where the game has switched something on, and pictures still missing. The user also asked for this history to take note of "the changes we are making for a better player experience, deviating from canon". That is now its own page, [Where we left the original](canon-deviations.md).

**What happened**

- **The public site had not updated for days, and every release had said it had.** The user's first note was that the Escape Pod had "none of the painted artwork". The Escape Pod was fine. The whole site was stale (88db0df9, 21:29 on the 22nd). The fix's commit counts two days and ten failed runs. The playtest log, written later, counts eight days: the last good GitHub Pages build was on 15 September, and 25 runs had failed since. There were two causes. The build machine ran out of disk, since the repository carries 6.3 GB of art and 7.8 GB of git history. And the site's check that every room is whole stopped at the Escape Pod's second eye, which has one view by design. The workflow now frees about 25 GB of unused toolchains first, and a room may declare `metadata.singleView`, with a required reason (6534ef8f). The site was published at 01:58 UTC with 109 rooms, where it had held 77.
- **Releases went from 18 minutes to about five.** The user asked: "only copy the updated files and leave any asset files alone which have not changed". Tests and builds took only about 2 of the 18 minutes; the rest was moving art. The published repository now keeps its history, so git sends only changed files. The checkout fetches only the 867 pictures the site hangs, not the other 4.5 GB, and the checkout went from 6 minutes to 5 seconds (c4df9c2e). The disk clean-up now runs in the background alongside the tests (563ba63a). The first release built this way failed safely (see below).
- **Checkpoints were born during the playtest** (b5a5e3a9 onward). The user asked to "test the enunciator and chemical dumping mechanism without going through the whole opening". A checkpoint is a route of real commands, played from the start at a fixed seed, plus the facts that must hold where it ends. No state is edited by hand, so it is a position the game can really reach (`scripts/lib/checkpoints.mjs`). The page loads one with `?checkpoint=` or from the debug panel. Six were made that morning, each at the user's request: `comm-room`, `comm-fixed`, `bio-lock`, `mini-card`, `microbe` and `aux-booth`. Then the user asked that "every checkpoint should start me off with full health and sleep", so each one now loads fed, rested and well (73a416d8). A later fix also cleared the morning's pending step of the disease (bbed4544). This refresh happens only when a checkpoint loads. It is a testing aid, not a change to the game.
- **What the playthrough found** fell into a few families:
  - *Things that can be seen but not clicked.* The filled flask was under the fluid's fallback box, which took 8 of 81 clicks. The fused bedistor lay under the cube's name plate, and when dropped it landed inside the cube. The medicine bottle stood inside the Infirmary shelves' click box, which took 81 of 81 clicks. In the Lab Office, the desk's hotspot jumped to mid-room once examined, and the gas mask floated there.
  - *Green boxes where the game switches something on.* They appeared in both elevator cars when a card was slid, in Course Control once it was fixed, and in the booths and shuttle cabins. The user: "i thought i used the upper elevator access card in the first elevator and left it there (it was a green box -- i assumed it stayed in the elevator)". The box had taught them something false.
  - *Pictures still missing.* The extended ladder was a yellow box, and so was the "mangled robot". The user: "we need artwork for "mangled robot" (specifically a mangled version of floyd)". Floyd's death is the game's famous emotional moment, and the picture is all a player ever sees of him.
  - *Things drawn too early or not at all.* The miniaturization card lay at the player's feet while canon still has it "in the next room". The mutants were not drawn one room behind in the final chase, even at the Cryo-Elevator door where the game ends.
  - *Legibility.* Nothing but tiny lettering in a corner said the red button was the fungicide. On the Comm Room's enunciator, the lamps were small and one of the colours was black.
- **One note was pure praise.** Item 14, at the shuttle's lever: "WOW the push lever is great to see the lights going by simulating movement - this was a highly unexpected graphic display - very impressive!!" That is the tunnel motion added on 18 September (093214c8). The log marks it as something to leave alone.
- **The microbe was fair.** According to the note Norm passed on, the user died on the strip by firing the laser too long, and took it for bad luck. It was not luck. In canon the laser warms with every shot and says so ("slightly warm", then "quite hot", `lower.js:321-329`). Past a point a pseudopod reaches for it "perhaps attracted by the warmth of the laser", and hotter still the microbe lunges and both go over the edge (`biolab.js:409-411`). It is a canon puzzle whose hint is subtle, and nothing was changed.
- **The Lab Office desk, the Library terminal and the spool reader now stay where they are painted** (25bd79cf). Canon uses the desk's "touched" flag to mean "already searched" (comptwo.zil 2270-2272), and the drawing had read that flag as "picked up and moved". The user chose the per-room fix, three lines of package data, over changing the shared rule.
- **Before the playtest, on the afternoon and evening of the 22nd.** Every planned view was painted: 863 of 863, the Library's ceiling the last (47cdf362). A room under review can now be played from where it stands, with a "Play from here" link (a8c5fdb7). Doorway glimpses were rebuilt from the neighbour's own paintings, where they had been painted in the viewing room's style (8e0b2b32). The Comm Room's seven enunciator lamps became overlays cut from Greg's own painting, with no new image (de11be6c). The user accepted the room on the 23rd (4cf99e5b). And the Conference Room's "round" table became "long" in the source itself (304ab4c2), the first edit to Infocom's text made for the sake of a picture.

**Decisions**

- **The user's triage** (the end of the playtest log): fix now everything that can be seen but not clicked, and prove each fix with real clicks. Two shared changes were approved: the browser harness clicks where things are drawn and fails on targets too small or covered, and a click on a name plate opens that thing's menu. **Not approved:** a greyed-out Take that gives its reason.
- **The user: one lit-sign style for every place a card switches something on.** That covers both elevator cars, the four shuttle cabins, Course Control, the Mini Booth and the teleport booths. It came from their own proposal: "light up a sign that says "shuttle controls activated" (following the same phonetic spellings as other signs has)". Greg paints the style once and Norm makes the lit states. Every accepted room it touches goes back to the user.
- **The user: colour 7 becomes pink, "Pink only".** "i don't like "black" light on the enunciator. i want to change this to PINK to make it more obvious what color is being asked for (this also affects the chemical dispenser AND canon text". BLACK is not kept as a hidden word. Also: the lamps get bigger, and "yes lets do a slow blink here as well". Canon already says the light is flashing (compone.zil 2869).
- **The user: the filled flask is milky white.** Canon disagrees with itself here (the dispenser says green, EXAMINE says milky white), and the user chose "flask color should always be milky white". The flask under the spout stays parked until every room is accepted.
- **The user: the mutants are drawn in the next room now, but narrowly.** Only the four mutants, and only at the two moments of the chase, Bio Lock West and the Cryo-Elevator door. The wider plan for glimpsed actors stays parked.
- **Greg's next pictures** (mail 20260923-131200-dev-0890 to -0892): the mangled Floyd, "mangled but still recognisably Floyd, not gore"; the ladder extended to 8 m, lying flat; and the dispenser's seventh button in pink. One combined request follows for the enunciator, the sign style and a sweep of every grey box left.

**What was hard**

- **A release that reported success without checking.** `release.mjs` announced "Released" once the push went through. It never looked at the workflow, so every failed run read as a success, and Norm repeated that to the user (88db0df9). It now waits for the workflow. Since 563ba63a it also waits for GitHub Pages itself, because the user's new checkpoint was a 404 for about three minutes after "published". A run cancelled by a newer push is now reported as superseded, not failed.
- **The first sparse release failed safely** (adca7f6e). On Linux a pipe is written asynchronously, and the list of art to fetch was cut at 64 KB: 514 of 868 lines, every room from S onward. The build refused to publish a room with missing paintings, which is what the check is for. Windows writes the same pipe synchronously, which is why Norm's local rehearsal passed. The list now goes to a file.
- **"Clickable" meant "has a menu".** The test suite's click checks open a menu by the thing's id (`planetfall.pick(id)`), and never have to find the thing on the screen. So the flask under a box, the bedistor under a plate and the bottle inside the shelves all passed every test. The user asked: "how did the clicker playtester get through this step?" The approved fix makes the harness click where things are drawn. It was being built as this entry was written.
- **A canon shortcut drawn as a real object.** Canon defines the mini card in Bio Lock East and uses "not described" to mean "seen through the window, in the next room". The game logic was right; the page drew the card at the player's feet. The user: "it shouldnt actually print until AFTER he comes out and does his death scene."
- **An accepted room with its warning still showing.** The Upper Elevator's review had flagged the green box, and the room was accepted on 22 September with that warning in place. The log lists "how item 4 got accepted" as a question for the review page.
- **The walkthrough is written for typists.** The user could not find "drop magnet" as a click, because the thing is labelled "curved metal bar" and MAGNET is only a synonym. The walkthrough also slides the elevator card again on every ride, when once is enough. Both were Norm's transcription faults, and both are recorded in the log.
- **A correction to the playtest log.** Items 4a and 7 say an elevator card's enable runs out after 180 turns in this port, as it does in the source. It does not. A deviation from 11 September, round ten, keeps an elevator enabled for good once carded (`kalamontee.js:141-148`). The turn-off routines exist (`connectors.js:450-457`), but nothing ever schedules them. The redundant re-slide finding stands, and in fact is stronger. It also matters for the sign design: an "elevator enabled" sign would never go out in the two cars.
- **A commit that took in unfinished work.** Norm committed the Conference Room while an agent was still writing, "the same fault I named earlier today and then repeated", and said so in the commit (304ab4c2).

**Built**

- **Checkpoints**: `scripts/lib/checkpoints.mjs`, `scripts/checkpoints.mjs`, `data/checkpoints/`, `engine/checkpoint.js`, `?checkpoint=` in `game.js`, the test `tests/checkpoints.mjs`, and the refresh on load in `rules/survival.js` (b5a5e3a9, 73a416d8, bbed4544).
- **The release workflow**: a sparse checkout with a fetch list (`build-site.mjs --list FILE`), a published repository that keeps its history, and a disk clean-up in the background (c4df9c2e, adca7f6e, 563ba63a). **`release.mjs`** now waits for the workflow and for Pages before saying "published" (88db0df9, 563ba63a).
- **`metadata.singleView`**, which `check-site.mjs` honours for a one-eye room with a stated reason (6534ef8f).
- **"Play from here"**: `?room=ID` in the game, linked from the review page (a8c5fdb7).
- **`scripts/check_status.mjs`**, which works out who holds each room from the mailbox and fails when the dashboard says Greg holds work he does not (8e0b2b32).
- **The playtest log** itself: a user's live playthrough recorded item by item, each with its diagnosis, and triaged only at the end.

All are in [Tools](tools.md).

**Rooms**

| Room | Where it stands |
|---|---|
| Betty Control East and West, Shuttle Car Betty, Systems Corridor West, Systems Corridor, Small Office, Machine Shop, Reactor Access Stairs, Planetary Defense, Planetary Course Control, Library Lobby, Library, Lab Office, Strip Near Relay | Accepted between the afternoon of the 22nd and the playtest |
| Comm Room | Accepted on the 23rd (4cf99e5b). It goes back to the user when the pink, larger, blinking lamps land |
| Upper and Lower Elevator, Alfie and Betty cabins, Course Control, Mini Booth, Booths 1 to 3 | Accepted. Each goes back to the user when its lit sign is added |
| Lab Office, Library Lobby, Library | Accepted; things stay in place once used (25bd79cf), with no change to the art |
| Infirmary, Bio Lock East, Admin Corridor | Accepted; click fixes and pictures decided in the triage |
| Conference Room, Rec Area | Still parked until last. The Conference Room's canon text now says "long" |

The dashboard counts 107 of its 109 rooms accepted: only the two parked rooms are left.

<!-- through: git 9b969ec9 · mail 20260923-131217-dev-0892 -->
