# Timeline

A dated list of the events that shaped the remake, one line each, with the commit that records it. Times are US Eastern (EDT), the zone of the commits; the session transcripts are in UTC, four hours ahead. Events from the morning of 9 September came before git existed, so they cite the session transcript instead of a commit. The history runs to 11:17 on 14 September, 288 commits in all; events not yet committed cite the mailbox or the dashboard's record. The [journal](journal.md) carries it on from there.

## 9 September: the port begins

| When | Event | Record |
|---|---|---|
| 11:08 | An imported starter exists: a Three.js map viewer and a Python ZIL extractor (105 rooms, 284 exits) | transcript |
| 11:10 | First Claude Code session; the viewer moves into the ASP.NET Core host | transcript |
| 11:24–11:34 | The world map becomes a grid by region (`layout.js`, `check_layout.mjs`) | transcript |
| 11:46–11:54 | The extractor takes in all 105 room descriptions as condition trees, and 150 objects | transcript |
| 11:58–12:06 | Shared vision agreed: hand-port the ZIL into data-driven JavaScript rules | transcript |
| 12:06–12:21 | Engine milestone 1: Deck Nine to the Crag | transcript |
| 12:21–12:39 | First fan-out: four agents (browser tester, Kalamontee shore, survival, Floyd) | transcript |
| 12:41 | The user asks for a playthrough tester and a handoff file | transcript |
| 16:21 | `git init`; baseline commit, engine milestone 1 | bd88341 |
| 16:27 | Long hall and ladder connectors | 9fd94c1 |
| 16:39 | The four elevators; scenery words as objects | 1d345c8 |
| 16:48 | Shuttle and relay: every special exit has a handler | 2ed44e0 |
| 16:54 | Playthrough tester, click contract, browser replay | b0aa81d |
| 16:56–17:13 | Five area agents run; the bio lab agent is stopped by the session limit | transcript |

## 10 September: complete, then tested

| When | Event | Record |
|---|---|---|
| 06:44 | Every area integrated: 105/105 rooms, 322/322 routines, 37/37 timed events, 945 checks | 2ab5898 |
| 06:52 | Graphics assessment: one scene file in 105 rooms | 1c24cc4 |
| 06:58 | `playtest.mjs`, the blind playtest front end | a252eab |
| 07:14 | The scripted walkthrough plays to the ending: 289 steps, 74 of 80 | 0eabc12 |
| 07:15 | Round one of blind playtesting launches | transcript |
| 07:23 | The full game replays in Chromium | a70e212 |
| 11:35 | Greg's first four design packages arrive | eef7c52 |
| 12:14 | Round one's findings built in; no typed-only steps left in the walkthrough; Winding Stair package with shared conventions | 7decc74 |
| 12:18 | `compare_playtests.mjs` | 711f90c |
| 12:36 | First approved deviation: the collapsed ladder is refused at the rift | bf7d1c5 |
| 12:49 | The user sets the deviation rule | transcript |
| 17:00 | Round three's fix list; commits now co-authored by Claude Opus 5 (except ba2ff80 at 21:37) | d171ec5 |
| 17:47 | The `syntax.zil` audit: 107 words and about 35 verb routines ported | ab12e19 |
| 18:47 | Checkpoint starts for playtesting (tower core) | 471086a |
| 21:37 | Round five's fixes | ba2ff80 |

## 11 September: the ledger, the dashboard, the first wins

| When | Event | Record |
|---|---|---|
| 06:26 | `DESIGN-REQUESTS.md` created | 0a863ef |
| 06:45 | Round six: Floyd's orders and "Ask about" | 115a1d4 |
| 07:42 | Round seven: stable numbers, elevator waits, special exits cost 7 units | 143244e |
| 08:14 | Design review contract: the numbered ledger | 3710e1f |
| 08:36 | The user gives Greg his name; the override layers are dropped | transcript |
| 08:55 | Round eight's fixes and the Lawanda checkpoint | e8979fe |
| 09:13 | `check_design.mjs`; review of Greg's consolidated metadata | 992386c, bb2ccb8 |
| 09:46 | **Milestone: both round-eight testers win 80/80 from mid-game** | 18f2073 |
| 11:42 | The graybox reads the design metadata (DR-045) | 8d141b0 |
| 11:42 | Round nine: a fix batch, with the original's fumble rule | 3f23376 |
| 11:44 | DR-014 approved: day-phase looks as lighting metadata | 18894fe |
| 19:46 | The Planetfall Dashboard | 5c9a0eb |
| 20:58 | Round ten from the start: neither tester wins | af5a3c6 |
| 21:15 | The parser tells an unknown word from an absent thing | 7a0650d |
| 23:32 | The lamp finally lights the dark rooms; round eleven's diaries | d294cf9 |
| 23:46 | The survival clocks explained in hours | de6c9f9 |

## 12 September: the day the look changed

| When | Event | Record |
|---|---|---|
| 06:51 | **Milestone: typed-12 wins 74/80 from a cold start** | 20416ea |
| 06:54 | **Milestone: click-12 wins 80/80 from a cold start, mouse only** | 007774f |
| 07:45 | Playtesting pauses; the user moves to design reviews | transcript |
| 08:00 | Twenty package approvals in one pass | a6d8455 |
| 08:22 | Deck Nine metadata by Norm (DR-086); two comp contradictions (DR-087); compare mode | 723da28, 180a41f |
| 08:45 | The parts kit and the user acceptance gate | 8f18eac |
| 09:29 | RESTART fixed after the user could not find it | d9716fd |
| 11:03 | First working order for Greg | b2c9867 |
| 11:26 | Automated dialogue: Norm's ledger watcher, Greg's heartbeat | transcript |
| 11:36 | Day-phase lighting rig (DR-060) | d10a414 |
| 11:54 | Panorama trial withdrawn (DR-088) | 240d1df |
| 11:59 | Norm owns up to destroying Greg's delivery entry | 6a939bc |
| 12:09 | Authored interior lighting (DR-092) | be88f13 |
| 12:46 | Deck Nine three ways | 66025be |
| 13:04 | The plate: a comp you can look around | e41b1a6 |
| 13:22 | The turntable trial filed (DR-093) | b9f3334 |
| 13:58 | Norm declares the set a fail | dbbd89a |
| 14:05 | Fail verdict withdrawn as Norm's error | 00c2918 |
| 14:43 | Per-view lenses fitted; the set hangs | bd6b9e4 |
| 14:53 | Caps no longer thrown to infinity | b920d0f |
| 15:06 | Seam snapping fixed: per-view lenses, owned arcs | d10bb79 |
| 16:56 | The per-room review page with state switches | 45adc47 |
| 17:35 | Seams pushed off openings; exposure levelled | ec7fbc8 |
| 17:57 | A seam with nowhere to go becomes a rework request; `/` opens the dashboard | cba06f2 |
| 18:42 | The first conditional state that draws: the pod door | 7d8e85e |
| 18:56 | All four Deck Nine states draw | 167cc90 |
| 19:01 | Any actor can be placed and sized | 340a897 |
| 19:09 | Runtime asset contract for characters | 529eedc |
| 20:28 | Blather cut out and standing in Deck Nine | 8d0d88f |
| 20:52 | Blather with real transparency, the ambassador, the slime as a decal | 4c01c37 |
| 21:04 | The slime becomes a route, with trails | 72c427f |
| 21:56 | `ARTWORK-BRIEF.md` and the audit of 51 packages; the view planner | 264a87e, 69cc078 |
| 22:01 | DR-105 approved: the slime trail | 99d968e |
| 22:02 | The user picks the dorm and SanFac pilot (DR-107) | transcript |
| 22:12 | `review-room.mjs` | 836ebfe |
| 22:48 | Widening a painting fails: holes fail, complete pictures work | 005becf |
| 22:58 | The user gives Norm his name | transcript |
| 23:00 | Ledger compacted from about 524 KB to 57 KB | 0145a93 |
| 23:23 | `underpaint.mjs`: build new views from accepted ones | 6f29ab0 |
| 23:44 | Dorm A's first built ring hangs seamlessly | d6cb240, 9e32152 |

## 13 September: the method proven

| When | Event | Record |
|---|---|---|
| 00:20 | `underpaint fit`: a seed's camera read from the picture | 65aafd3 |
| 00:28 | Brief 1.1: the method the pilot proved | b07575e |
| 07:51 | `underpaint joins`: numbers pass, joins do not | 6d05242 |
| 08:36 | Caps drawn properly at a level gaze and under the ring | 41b26a8 |
| 08:41 | `graybox-view.mjs`: seeds from the room's fabric | 1adf50a |
| 09:09 | All eight pilot rooms pass; two rooms in flight | 7ad667e |
| 09:20 | The parts kit goes outdoors | aec9b63 |
| 09:35 | Deck Nine's repaint approved (DR-108) | 2e9c699 |
| 09:45 | The sea's horizon: far plane 40 km | f372d50 |
| 10:08 | Dashboard: six stages and who holds each room | 5d2d931 |
| 14:58 | The Balcony reviewed with its sea variants | 4e63ca7 |
| 15:14 | A switched-off Floyd is still drawn | 941a2e8 |
| 15:17 | **The user accepts Deck Nine**; the Balcony should flood on day 4 | 810594f |
| 16:00 | Paintings hang round the eye, not the floor | 71fbe11 |
| 17:07 | Floyd drawn as himself, as a stand-in | 506684a |
| 17:19 | Static files re-checked on every load | 35b59a4 |
| 17:37 | `cutout.mjs` | 3178db6 |
| 18:10 | The mailbox; production Floyd, on and off; the dashboard check stops touching verdicts | d06b858, db8539d, 1594334 |
| 18:22 | Contract version 6: the mailbox | da120e4 |
| 18:53 | The Crag floor seam found to be a highlight ridge | 2f97763 |
| 19:05 | The Crag reviewed whole | 62efaa5 |
| 20:02 | Dorm D's south glimpse repainted to the canon | 441f9ec |
| 20:33 | The Winding Stair complete with five sea states | 803ad53 |
| 20:52 | The Courtyard's fabric | 79d14c3 |
| 21:28 | Norm's session blocks on a question to the sleeping user until 05:33 | transcript |

## 14 September: process tools and one layout

| When | Event | Record |
|---|---|---|
| 05:39 | Courtyard base complete; working order "never idle" | ec21dc3 |
| 06:08 | Process tools A, B and C: underpaint state and seam, the review server, the mailbox panel | 7654323, 604c0b9, c4022cc |
| 06:34 | "Changes" at the gate hands a room back to Norm | c85ec12 |
| 06:40 | The Kalamontee living quarters as one layout; every Kalamontee room queued | f0f07e4 |
| 07:16 | Authored object positions reach the build (the padlock) | 0a3b8b6 |
| 07:29 | Mess Corridor reviewed whole; Gangway, Deck Eight and Brig queued | cbed6ac |
| 07:51 | The wiki page and the historian agent | da4378d |
| 08:08 | The padlock's cutouts: the first item drawn as itself | 85624f8 |
| 08:51 | Time of day reaches the paintings: the day-phase grade and the review page's Light panel | d1f27aa |
| 08:59 | The Balcony and the Crag recorded as accepted; the Winding Stair, the Courtyard and the Mess Corridor go to the user | d4df8a9 |
| 09:27 | The Kitchen complete, its far storage door built from the Mess Corridor's approved art; to the user | mail 20260914-132702-design-0068 |
| 10:05 | The Dorm Corridor complete; to the user | mail 20260914-140548-dev-0053 |
| 10:23 | The Mess Hall complete; to the user | mail 20260914-142341-design-0076 |
| 10:28 | The user sends the Kitchen back: "there should be SOME appliances in the room"; its fabric is re-equipped | mail 20260914-142816-dev-0055 |
| 11:06 | The equipped Kitchen's south view and sides approved | mail 20260914-150610-dev-0058 |
| 11:07 | The Lawanda group as one layout: Lawanda Platform, the three Systems Corridors, the Infirmary | 0905776 |
| 11:14 | The West Wing cut from the Courtyard's own fabric | 89e0dab |
| 11:16 | The wiki's ten pages, fact-checked | 13597c0 |
| By 11:17 | **The user has accepted the Winding Stair, the Courtyard, the Mess Corridor and the Dorm Corridor: 15 rooms in all** | `room-status.json`, uncommitted |
| 11:28 | The user sends the Mess Hall back: "a little too tidy for an abandoned base"; scattered metal tables and chairs, a few benches | mail 20260914-152826-dev-0066 |
| 11:42 | The equipped Kitchen complete, its west join levelled; to the user | mail 20260914-154259-dev-0067 |
| 11:53 | The Kalamontee layout's second pass: the Plain Hall placed; the Rec Corridor, the Rec Area and the Corridor Junction; the Mess Hall re-furnished | 0ccf924 |
| 12:03 | A container shows its contents where the room says (`contentsAt`), after the canteen showed as a grey square | b04ccf6 |
| 12:12 | The re-furnished Mess Hall's seeds approved | mail 20260914-161223-dev-0077 |
| 12:26 | The rest of the Feinstein as one layout against Deck Nine: the Gangway, Deck Eight, the Reactor Lobby, the Brig | 34139d7 |
| 12:45 | The game hangs the paintings of every accepted room | f31720b |
| 12:45 | **The release workflow: every push to main tested, built as a static site and published on GitHub Pages; the first release passes at 12:47** | c4fb332 |
| 12:47 | The canteen's pictures in the game; the accepted Dorm Corridor's sides and caps committed | e3f9cd4, bd9a029 |
| 12:55 | The wiki's chart of how far each playtester got | 1aebaa9 |
| 14:28 | The release publishes only a site that changed, and never with an accepted room's painting missing | 8f671d5 |
| 14:40 | `locate.mjs`: exact positions for overlays on a painted face | 577723a |
| 14:41 | Greg adopts the room review before every delivery of a joined room | mail 20260914-184114-design-0101 |
| 14:57 | A part painted when its condition is a clause of the painted state: Lawanda's car no longer stands in front of the painting | 7d48522 |
| 15:22 | `check-seed.mjs`: a seed checked against its fabric | bfc3234 |
| By 15:48 | **The user accepts Lawanda Platform: 16 rooms in all** | 31cdbc9 |
| 16:02 | The user: Greg builds his own guides; a room with the user stays with the user | 101c6c2, b9dd06d |
| 16:15 | **Eight accepted rooms found with black holes on the public site; every hung view now ships, and `check-site.mjs` guards the release** | fd8c0b5 |
| 17:48 | The user moves the metadata work to Norm; Greg's queue is painting only | mail 20260914-214858-dev-0112 |
| 18:41 | The Escape Pod built to Deck Nine's accepted glimpse, with a new `vault` part | 929d9c2, 335881e |
| 19:09 | The Brig's limerick approved as marker graffiti at the fourth repaint; back to the user | 2104030 |
| 19:37 | The Escape Pod's first two seeds approved, with the fabric webbing the user asked for | 74cb8df |
| By 19:50 | **The user accepts the Brig: 17 rooms in all** | 8a06fa5 |
| 19:56 | Thrown into the Brig, the player is robbed to the Crag and the padlock goes to the Brig, as in the original | 6e0d7a8 |
| 20:04 | Norm's first metadata batch: the admin wing, the Conference Room and Booth 1, eleven rooms from one layout | d204d24 |
| 20:45 | `review-room --candidate`: a view reviewed in place before it is registered | ef4782e |
| 21:12 | One-line Telegram updates to the user | 871c1c3 |
| 21:27 | The Escape Pod's base room whole and approved | f66ce04 |
| 21:43 | `--candidate` reads a new view's joins, after a false all-clear on the Mess Hall ceiling | 09470dc |
| 22:01 | The scattered Mess Hall complete; to the user | 67fe9c0 |
| 22:17 | A dark room is drawn dark | 8c25e4f |
| 22:53 | The admin wing's eleven rooms, fixed and verified, to Greg for seeds | f555c75, 5c9015a |
| 23:02 | The mech wing's eleven rooms to Norm for metadata | 9f297de |
| 23:14 | `--candidate` takes a new view's camera from its sidecar: a candidate review now gives the registered answer | 2376655 |

## 15 September: caps and the states they miss

| When | Event | Record |
|---|---|---|
| 00:03 | `seam` mends a cap's join outward, where the player sees it; the Kitchen to the user | cb94c04 |
| 00:25 | A cap left behind by a state change becomes a review warning; Storage West to the user, with the can and the ladder as cutouts | 48e8d62 |
| 00:50 | Accepted Deck Nine's floor cap gets its gangway-shut variant, found by the new check; the room stays accepted | 276ee2a |
| 01:11 | The Conference Room, the admin wing's first room back from Greg: its four views and floor cap approved | 7b0adda |
| 02:23 | Booth 1 whole and to the user, its Redee sign dark and lit | 72c3455 |
| 10:33 | **The user reorders the queue: the opening sequence ahead of everything, to be playtested with the graphics in place** | fcc0581 |
| 10:37 | The mech wing's eleven rooms get their metadata, view plans and fabric renders | fcc0581 |
| 11:30 | The pod's webbing made nets and its viewport enlarged, on the user's note that the camera must be inside the web; a scene may declare `viewOf` | 1c39c8a |
| During the day | **The user accepts Booth 1, the Mess Hall, the Kitchen and Storage West: 21 rooms in all** | dashboard |

## 16 September: the opening sequence, the admin wing, and the pod rebuilt

| When | Event | Record |
|---|---|---|
| 05:18 | Underwater built from nothing in a morning: metadata, fabric, six blockouts, and a room may author its own fog | 9c23f3f |
| 06:17 | `review-room` says when its own overlap numbers are noise, for rooms of fog and water | 581a9c1 |
| 06:35 | Five painted variants found to be unhangable for want of a `state` field; `check_design` makes that an error | 34e7e29 |
| 08:23 | **The opening sequence is complete: all eight rooms of the tested stretch are whole turns** | 090550a |
| 09:10 | The pod re-cut on the user's layout, the webbing one side and the window opposite | 2c10fd5 |
| 12:25 | The Escape Pod finished and with the user; three faults fixed in the browser gate | b11ee36 |
| 13:09 | A registration must match its delivered sidecar's camera, after two views hung at lenses they were not painted at | eca602b |
| 15:23 | Admin Corridor South finished: six views and the ladder variant, no warnings | 6cd6586 |
| 16:10 | The Admin Corridor whole; the third false seam of the day | 07a5505 |
| 16:31 | The blend-band score found to reward invented texture; `restore` now names the band's texture and calls the number noise | 6e897eb |
| 16:43 | Admin Corridor North whole; a warning reported to the user as a real bug is withdrawn | d5f90ba |
| 17:21 | `labelOffset`: a name plate moves off the thing the player needs | 09d786a |
| 18:56 | **DR-112: the user's three deviations for the escape pod -- the window stays clear, the web holds you, standing is implicit** | b487d77 |
| 19:12 | The pod re-cut to the user's storyboard layout, and the seat inside the webbing is a room again | ac9bfdc |
| 20:06 | A window must read as a hole in a blockout: the kit gains a near-black `viewport-glass` | 51595e7 |
| 20:27 | `check-state`: a state variant may be relit as hard as the story wants, but not moved or regenerated | 87292e6 |
| 21:02 | The pod's sixteen viewport states complete, on the fifth measure of how a planet grows | a00e392 |
| 21:50 | **The seat inside the safety web was built, painted and never drawn: art rooms reach the runtime** | 238dea6 |
| 22:25 | **DR-112 complete: both pod packages, the Deck Nine glimpse, and every state the game can reach. Both agents stop, at the user's instruction** | 820c665 |
| During the day | **The user accepts the Gangway, Deck Eight, the Reactor Lobby, Underwater and the Escape Pod: 26 rooms in all** | dashboard |

## 17 September: the backlog cleared, and the bound on what Norm can take

| When | Event | Record |
|---|---|---|
| 07:11 | A room painted as a single view is clamped to where its painting reaches, derived from what is registered | e9044a9 |
| 07:33 | The clamp's vertical limit derived instead of typed: 0.066 radians, not the 0.35 guessed | 3004c34 |
| 07:49 | `paintedWhen`: a package says which of its large objects the picture has, after a ladder that could be taken but not seen | 36b0f66 |
| 07:54 | `release.mjs`: release morning and evening if there have been commits, gated to refuse rather than to publish something wrong | b26baea |
| 08:08 | A switch whose painted change is tiny and far off is tagged "glimpse", with its size and arc measured | a5c7239 |
| 08:16 | The cumulative flow of both agents' asks, drawn from the mailbox itself | a2c413c |
| 08:25 | Retroactive sizing for every ask, and a chart of how fast the loop turns | 0829752 |
| 08:30 | **Twenty-nine seeds registered in one pass: the batch that waited out the escape pod** | 822034b |
| 08:32 | The charts' clock was four hours out: message ids are UTC, and `at` is now the authority | 2f6d7bc |
| 09:01 | Greg stops, low on tokens, with nothing owed and the queue's state written down | mail 20260917-130122-dev-0276 |
| 09:14 | **Norm takes the mechanical envelope of Greg's work: eight lenses established by re-rendering, sidecars written at render time, and the tag `design-handover-point` set for the rollback** | bf7993c |
| During the day | **The bound found by trial: compositing, cameras and checking move to Norm; making pixels does not. A derived pair of caps came out 31 per cent blockout colour and was not registered** | [How we work](how-we-work.md#what-norm-can-take-from-greg-and-what-he-cannot) |
| 12:11 | The Tower Core's north exit guarded, as its lobby side always was; the user's decision to fix a fault no finished game reaches | 221b11c |
| 12:12 | Fourteen rooms packaged by three agents fanned out, so the queue is full when Greg is back | c71df49 |
| 13:02 | **Fourteen rooms cut from the area builders, `fabric-tower.mjs` and `fabric-shuttle.mjs` new: 63 of 105 rooms have a scene** | 7e21721 |
| 14:05 | A room's authored lighting no longer puts out its neighbours' lamps: seven rooms had been losing light | deb9b3c |
| 15:22 | The climb out of the sea shows its depth, and the compass becomes a rose with fixed slots | bf9f499 |
| 15:51 | DR-113 filed: fourteen rooms, one ask each; Greg returns to them at about 15:50 | 199d931 |
| 15:54 | **The user accepts the Escape Pod Web** | 1ddf458 |
| 16:02 | The browser walkthrough's failures were one race: 298 steps, none failing | c935077 |
| 16:30 | Forty rooms' dashboard history backfilled from evidence | 382b8e9 |
| 18:01 | Lawanda's five cut, blocked out and filed as DR-114 | c027c57 |
| 19:26 | The three gates: `precheck` gets a test, `check_design` compares lifts with landings, and the Lawanda Platform's two copies are compared | af52f62 |
| 19:38 | Greg's twenty-eight DR-113 seeds registered, and the guides for the next twenty-eight laid | e3b97a4 |
| 19:40 | Five closures found premature and made true: Lawanda's ten seeds registered | mail 20260917-234035-dev-0333 |
| During the day | The user accepts Admin Corridor South | dashboard |
| 20:47 | An uncommitted bulk registration found mostly wrong and reverted; `check_design` refuses two base pictures at one camera and conditions the game cannot read; thirteen Lawanda metadata passes reviewed, SanFac F approved | a24701b |
| 20:55 | **The monitor strips switch green as overlays cut from Greg's own strip; the Admin Corridor and Admin Corridor North go to the user** | 43ab305 |
| 20:57 | Planetary Defense's ring of four closed | mail 20260918-005730-dev-0359 |
| 21:11 | The dashboard audited on the user's question: 27 statuses wrong, and 38 owed guides built and sent | 8bc38d3 |
| 21:23 | The last ten Lawanda rooms packaged by Norm, and Floyd kept out of the rooms inside the computer | 245f016 |
| 21:34 | The user's three change notes: day, dusk and night as switches, the heart-shaped table traced to a cusp, and sprites asked for 36 objects | 980949a |
| 22:00 | The project hallway and the computer's rooms blocked out, `fabric-computer.mjs` new; Planetary Defense whole | ae32e50 |
| 22:06 | The Infirmary's spool and bottle live; a see-through container stops drawing its contents twice | 481f647 |
| 22:08 | **Betty's three rooms packaged: all 105 rooms now have a package** | 01a4012 |
| 22:28 | At the user's word, Norm takes five of Greg's metadata fixes back to unblock the Lawanda layout | mail 20260918-022806-dev-0410 |
| 22:41 | The project hallway's south cluster fits one layout: Project Corridor East, the Projcon Office, the Computer Room, the Mini Booth | 2b7fa48 |
| 22:47 | Booth 3 stands in a notch cut from Physical Plant Two, proved by re-rendering the accepted views around it | 419986b |
| 23:50 | The last object sprites installed: every portable object has a picture, and flat things lie down | e374533, 0f79f1c |

## 18 September: the lab cluster laid in, and seven rooms accepted

| When | Event | Record |
|---|---|---|
| 00:33 | Physical Plant Two whole and to the user; a test that stalls once no longer freezes a release | 0f79f1c |
| 02:12 | Booth 3 whole and to the user; the Projcon mural stops drawing over paintings | d29f111 |
| 02:38 | Six lab-cluster metadata fixes taken off Greg's queue by Norm | 685f72f |
| 02:57 | Project Corridor West whole and to the user | mail 20260918-065711-dev-0450 |
| 03:10 | SanFac F whole and to the user | mail 20260918-071028-dev-0452 |
| 03:23 | **The whole Lawanda lab cluster laid into the fabric, the Main Lab built in full, 50 blockouts rendered** | 12fcb1a |
| 06:02 | The Computer Room whole and to the user, with its computer-fixed state | mail 20260918-100240-dev-0455 |
| During the night | The user decides the Library shrinks from 16 x 12 m to 12 x 12 m, with the Library Lobby's west doorway narrowed to 3 m | session note |
| During the night | The user accepts the Admin Corridor, Admin Corridor North, West Wing, Physical Plant Two, Booth 3, Project Corridor West and SanFac F | dashboard |
| 06:03 | The how-we-work charts redrawn from the mailbox, at the user's request | `mail-flow.svg` |
| 06:34 | The Mini Booth whole and to the user | mail 20260918-103448-dev-0461 |
| 06:52 | The Library fitted at 12 x 12; `deliveries.mjs` and `view-diff.mjs` promoted from the scratchpad | 3d325d5 |
| 06:53 | The user makes Greg's work image work only; every compute task is Norm's | mail 20260918-105329-dev-0462 |
| 07:09 | Round thirteen's diary started: the first playtest since 12 September | `playtests/2026-09-18/` |
| 07:28 | Strip Near Station whole and to the user; the work-category and playtest-friction charts | 469d1f8 |
| 10:07 | The Tower Core whole and to the user | mail 20260918-140730-dev-0492 |
| 10:29 | Round thirteen's fixes: Floyd's itch, the weight line, and the page's quick buttons made the harness's | 05a700f |
| 13:29 | Alfie's two cabins and the shuttle car whole and to the user | mail 20260918-172924-dev-0522, -0523, -0524 |
| 13:41 | The DR-113 Kalamontee ring views painted; round fourteen reaches Lawanda Platform by mouse from the start | 5929620 |
| Afternoon | **Every way of playing wins blind:** round fifteen wins 80 of 80 by mouse from the Lawanda checkpoint, and round sixteen wins 68 of 80 typed from the start | `playtests/README.md`, not yet committed |
| During the day | The user accepts the Tower Core, the Computer Room, the Mini Booth and Strip Near Station, and sends Alfie's three rooms back: the shuttle door never shuts | dashboard |
| 14:58 | Review-page state presets; the Observation Deck whole and to the user | 79853eb |
| 15:17 | The Helipad whole and to the user, its floor cap the first filled by compute (`cap-fill.mjs`) | 5377ab3 |
| 16:11 | The shuttle rides: tunnel motion, the lever, the speed display and the approach glow; the Underwater depth plan (DR-115) with 24 blockouts | 093214c |
| Evening | The user has Norm fan out subagents, each on its own port under one shared render lock | session note |
| 18:00 | The Underwater depth rooms installed, inert; round eighteen wins 80 of 80 by mouse, and rounds eighteen and nineteen give 13 port fixes; design warnings from 55 to 11 | ddc51a1 |
| 18:25 | Bio Lock East whole and to the user | 7f42fea, mail 20260918-222511-dev-0572 |
| Evening | Rounds seventeen to nineteen drawn into the playtest charts; round eighteen is the first blind win with no deaths, but adds no milestone | `playtest-scores.json`, not yet committed |

## 19 September: the fan-out at full stretch, and a gate that looks at pixels

| When | Event | Record |
|---|---|---|
| 00:43 | The night's batch: the Main Lab whole, the Cryo Anteroom accepted, Bio Lock West whole; open-door views composited by compute (`room-through.mjs`) | ce92841 |
| 02:16-02:39 | Sixteen rooms' views registered in two runs; rings close for Booth 2, the Mech corridors, Rec Area, Rec Corridor, Corridor Junction, Plain Hall, Systems Corridor East and the Library Lobby | DESIGN-REQUESTS, 19 Sep |
| 04:36 | **Greg's queue empty: every requested image delivered, and his stale asks closed** | mail 20260919-083639-design-0668 |
| 06:11 | The user settles the radiation lock from the source: one chamber, so West is repainted to East's finish | mail 20260919-101159-dev-0629 |
| 07:04 | The Conference Room whole and to the user -- withdrawn four minutes later, the table still not round | mail 20260919-110433-dev-0652 |
| 07:04 | Planetary Defense whole in both states and to the user | mail 20260919-110434-dev-0653 |
| 08:10 | The Main Lab whole -- ring, caps and both open-door composites -- and to the user | mail 20260919-121026-dev-0678 |
| 08:17 | Project Corridor East whole and to the user | mail 20260919-121717-dev-0680 |
| 08:52 | Radiation Lock West's six views repainted; the chamber reads as one room across the bore | mail 20260919-125214-dev-0687 |
| 09:12 | Booth 3 back to the user for re-acceptance, under the user's new rule: art changed after acceptance goes back | mail 20260919-131216-dev-0691 |
| Morning | **The user's toggle gate: no room goes for acceptance until every switch is seen to change something on the screen** | `scripts/lib/shots.mjs`, not yet committed |
| Morning | **Painting passes 700: 708 of 784 planned, 78 of 109 rooms whole** | `wwwroot/data/paint-progress.json`, not yet committed |
| Morning | The user's four rooms all come back the same day, every one with a toggle that seemed to do nothing | dashboard |

## 20 September: the brakes fitted, and a night that leaves sixteen rooms for the morning

| When | Event | Record |
|---|---|---|
| 08:48 | An adversarial review of the whole workflow: 195 extra rounds on 818 views, and a circuit-breaker that had never fired in 223 requests | 6190a72 |
| 08:57 | The user stops the room pipeline until the four approved changes are built | a699a1a |
| 17:10 | **Contract Version 7 (DR-115): the mailbox refuses an ask with no settling test, a changes verdict with no fault, and a third change ask on one view** | d3a83eb |
| 17:20-19:26 | The underwater climb finished: D2, D1 and D0 painted whole, and all three accepted; Underwater's own UP cap repainted to R8 and re-accepted | a9aa41f, dashboard |
| 18:19 | DR-111 closed on the user's "the pod is ok": the pod is found in Underwater's 180 view, and its DOWN-cap half was never buildable | mail 20260920-221943-dev-0717 |
| 18:46 | **Nothing reaches the user unreviewed: every whole-room review leaves a receipt, and the mailbox refuses a room whose views it does not cover** | 0e07730 |
| 18:50 | The art rooms get review links on the dashboard, sorted by eye height | 1eac996 |
| 19:46 | Fifteen caps registered across eleven rooms: the backlog's whole first half was a parser fault, not a painting fault | 6cf7fda |
| 20:54 | Eleven floor caps built by compute rather than bought from Greg | d6a398f |
| Evening | The user: "work through the night to get as far as you can so that as many rooms as possible are waiting for my review in the morning" | session note |
| 23:44 | The toggle gate was judging a sliver: switch shots 108 to 143 px tall against the level shots' 559, and four shuttle cabs reporting every switch failing | a6dcdc3 |
| 00:20, 21 Sep | Floyd swept across all 71 rooms with a switch shot on file: he draws in 66, and there is no room-by-room defect to chase | c4e008d |
| 00:36, 21 Sep | **Painting passes 789 of 791 views, 107 of 109 rooms whole; the two left wait on guide faults of Norm's** | 04bc2df |
| 00:40, 21 Sep | Sixteen rooms waiting in the user's review queue for the morning | fb90b65 |

## 21 September: the things in the rooms

| When | Event | Record |
|---|---|---|
| 06:37 | Open containers draw their contents instead of a tan box: one rendering path behind four of the user's reports across five days | 3c56c760 |
| 06:54 | A dropped-item sweep without a browser: 44 things at 476 anchors, and 25 of them under 20 px at the median anchor | a2044c0e |
| 07:09 | **The dashboard stops understating the work: views 103 of 105 and reviews 86, backfilled from the artefacts each stage leaves** | 0f108704 |
| 07:09 | The working order is rewritten around the object layer (DR-117) and the switches that move nothing (DR-118), both of them Norm's | 0f108704 |
| 08:17 | An exit's name plate can be moved off what matters, at the user's word about the Winding Stair's balcony | daec9a80 |
| 09:26 | **Nothing was ever floating: a painted room writes no depth, so the fabric returns as a depth-only mask** | 6d2ffbda |
| 14:22 | The escape pod's duplicate towel, reported repeatedly and never reproduced, is found: a `painted` flag declared where nothing reads it | mail 20260921-182236-dev-0793 |
| 14:54 | **Five "the toggle does nothing" complaints are one cause: a state with no painted variant re-hangs the base texture in silence** | mail 20260921-185455-dev-0794 |
| 15:26, 19:09 | Two of those five are canon, not faults: the Reactor Elevator's door and Project Corridor East's borrowed switches are recorded as `noVisibleChange` with measurements | mail 20260921-192656-dev-0796, 20260921-230926-dev-0810 |
| 18:29 | Greg's missing state paintings registered for Bio Lab, Main Lab and Kalamontee Platform; `precheck` had failed six of eleven good pictures on the wrong measure | mail 20260921-222942-dev-0807 |
| Evening | **Accepted rooms pass two thirds: 69 of 105, thirty of them accepted on this day** | `wwwroot/data/room-status.json` |
| 19:36 | Greg's image budget runs out until Thursday evening; his queue is written down in priority order, the microbe first | mail 20260921-233622-dev-0816 |

## 22 September: Greg back early, and the doors opened

| When | Event | Record |
|---|---|---|
| 07:55 | The 21st's work committed and released; Norm fans triage agents out over about twenty unaccepted rooms' dead switches | 4f04cee8 |
| 08:00 | **Greg's image budget is back two days early: the microbe's cutout is the first picture** | mail 20260922-120042-design-0778 |
| 10:20 | Floyd stands on his tread: an opt-in actor height, used by the Escalator alone, with the user's approval | 4eceecff |
| 10:58 | Switches that show what they switch: door-open views and sea states built by compute from the neighbours' paintings, and Greg's first pictures in | aa68da04 |
| 11:05 | Every delivery came back as a full-frame regeneration; only the asked boxes go in, and Greg is asked never to re-letter a label | mail 20260922-150541-dev-0840 |
| 12:13 | **The dark slabs in the elevator doorways are the page drawing fabric over paintings that never declared the door shut; fixed in data, accepted rooms byte-identical** | mail 20260922-161322-dev-0851 |
| 12:22 | Three tool fixes the user approved: a state is not a view, a busy build folder is left whole, masks are not in front | d18fe697 |
| 12:36 | **Accepted rooms reach 88 of 105 on the dashboard, nineteen of them accepted on this day** | `wwwroot/data/room-status.json` |

## 22 September evening to 23 September: the user plays it to the end

| When | Event | Record |
|---|---|---|
| 22 Sep 15:05 | "Play from here": the review page drops the user into the game in the room under review | a8c5fdb7 |
| 22 Sep 18:48 | **Every planned view is painted: 863 of 863, the Library's ceiling last** | 47cdf362 |
| 22 Sep 19:26 | The Conference Room's table becomes long in the ZIL itself, the first edit to Infocom's text for the sake of a picture | 304ab4c2 |
| 22 Sep 21:29 | **The public site is found stale, every release since the last good Pages build having failed while reporting success; the build machine's disk is freed and the release waits for the workflow** | 88db0df9 |
| 22 Sep 21:40 | A room with one eye by design may say so (`metadata.singleView`), and the site publishes with 109 rooms | 6534ef8f |
| 23 Sep 06:59 | The Comm Room is accepted; checkpoints are born, so a playtest can start at the Comm Room door | 4cf99e5b, b5a5e3a9 |
| 23 Sep 07:12 | Releases send only what changed and fetch only the art the site hangs: 18 minutes to about five | c4df9c2e |
| 23 Sep 07:21 | The first sparse release fails safely: Linux cut the art list at 64 KB | adca7f6e |
| 23 Sep 07:39 to 08:47 | Five more checkpoints, each at the user's request; every checkpoint starts fed, rested and well | 73a416d8 to 777488a4 |
| 23 Sep morning | **The user reaches the ending as a clicker: 74 of 80, Cluster Admiral** | the note to the historian; the same score as the checkpoint route to the ending (7b06d7c8) |
| 23 Sep 09:08 | The user triages 25 playtest items: click fixes checked by real clicks, one lit-sign style, pink for black | 9b969ec9 |
| 23 Sep | The deviations from the original are gathered on one page, at the user's request | [Where we left the original](canon-deviations.md) |
