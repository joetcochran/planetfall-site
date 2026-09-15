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
| 08:36 | The user names the design agent Greg; the override layers are dropped | transcript |
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
| 22:58 | The user names the development agent Norm | transcript |
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
