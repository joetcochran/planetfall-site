# Timeline

The milestones of the remake, no more than three a day, each with the commit or record that shows it. A milestone here is a step that changed what the game is or how it is made: the first engine, the first blind win, the first painted room, a new way of building rooms, the first public release. Routine deliveries, single fixes and most room acceptances are left out; the [journal](journal.md) tells the rest, and its subpage [The Conference Room table](the-conference-table.md) tells the hardest room. Times are US Eastern (EDT), the zone of the commits. Events from the morning of 9 September came before git existed, so they cite the session transcript.

## 9 September: the port begins

| When | Milestone | Record |
|---|---|---|
| 11:58–12:06 | The approach is chosen: hand-port Infocom's ZIL routines into JavaScript rule modules, rather than run the original in an interpreter | transcript |
| 16:21 | `git init`; the baseline commit holds engine milestone 1, Deck Nine to the Crag | bd88341 |
| 16:54 | The playthrough tester, the click contract and browser replay | b0aa81d |

## 10 September: complete, then tested

| When | Milestone | Record |
|---|---|---|
| 06:44 | Every area integrated: 105 of 105 rooms, 322 of 322 routines, 37 of 37 timed events | 2ab5898 |
| 07:14 | The scripted walkthrough plays to the ending; round one of blind playtesting launches a minute later | 0eabc12 |
| 11:35 | Greg's first four design packages arrive | eef7c52 |

## 11 September: the ledger, the dashboard, the first wins

| When | Milestone | Record |
|---|---|---|
| 08:14 | The design review contract: every request numbered in one ledger | 3710e1f |
| 09:46 | **Both round-eight testers win 80 of 80 from mid-game** | 18f2073 |
| 19:46 | The Planetfall Dashboard | 5c9a0eb |

## 12 September: the day the look changed

| When | Milestone | Record |
|---|---|---|
| 06:51–06:54 | **The first wins from a cold start: one typed (74 of 80), one by mouse alone (80 of 80)** | 20416ea, 007774f |
| 14:43 | Per-view lenses fitted: Deck Nine's painted set hangs round the eye | bd6b9e4 |
| 23:23–23:44 | `underpaint.mjs` builds new views out of accepted ones, and Dorm A's first built ring hangs without a seam | 6f29ab0, d6cb240 |

## 13 September: the method proven

| When | Milestone | Record |
|---|---|---|
| 09:09 | All eight pilot rooms (Dorm A to D, SanFac A to D) pass review | 7ad667e |
| 15:17 | **The user accepts Deck Nine**; with the eight pilot rooms, nine painted rooms are accepted that day | 810594f, `room-status.json` |
| 18:10–18:22 | The mailbox of typed messages between Norm and Greg; contract version 6 | d06b858, da120e4 |

## 14 September: one layout per cluster, and a public site

| When | Milestone | Record |
|---|---|---|
| 06:40 | The Kalamontee living quarters built as one layout, each room cut from it, so every doorway shows its real neighbour | f0f07e4 |
| 12:45 | **The release workflow: every push to main is tested, built and published on GitHub Pages; the game hangs the paintings of every accepted room** | c4fb332, f31720b |
| 16:15 | Eight accepted rooms found with black holes on the public site; `check-site.mjs` now guards every release | fd8c0b5 |

## 15 September: the opening sequence first

| When | Milestone | Record |
|---|---|---|
| 01:29 | The Conference Room goes to the user for the first time; it comes back the same day with a heart-shaped table ([the whole story](the-conference-table.md)) | bc20f01 |
| 10:33 | **The user reorders the work: the opening sequence ahead of everything, to be playtested with the graphics in place** | fcc0581 |

## 16 September: the opening sequence whole, and the pod rebuilt

| When | Milestone | Record |
|---|---|---|
| 08:23 | **The opening sequence is complete: all eight rooms of the tested stretch are whole turns** | 090550a |
| 21:50 | Art rooms reach the game: the seat inside the pod's safety web, built and painted but never drawn, is drawn | 238dea6 |
| 22:25 | DR-112 complete: the escape pod rebuilt to the user's storyboard, every state the game can reach | 820c665 |

## 17 September: the bound on what Norm can take

| When | Milestone | Record |
|---|---|---|
| 07:54 | `release.mjs`: a release morning and evening, gated to refuse rather than publish something wrong | b26baea |
| 09:14 | **Norm takes the mechanical work round Greg's painting (cameras, compositing, checking); making pixels stays Greg's. The tag `design-handover-point` marks the rollback** | bf7993c |
| 22:08 | **Every one of the game's 105 rooms has a design package** | 01a4012 |

## 18 September: image work to Greg, compute to Norm, and every way of playing wins

| When | Milestone | Record |
|---|---|---|
| 06:53 | Greg's work becomes image work only; every compute task is Norm's | mail 20260918-105329-dev-0462 |
| 14:44 | **Every way of playing wins blind: round fifteen 80 of 80 by mouse from Lawanda, round sixteen 68 of 80 typed from the start** | 2db0b7f |
| 15:17 | The first cap filled by compute rather than painted (`cap-fill.mjs`); by evening Norm runs up to six subagents, each on its own port under one render lock | 5377ab3, ddc51a1 |

## 19 September: a gate that looks at pixels

| When | Milestone | Record |
|---|---|---|
| 04:36 | Greg's queue empty: every requested image delivered | mail 20260919-083639-design-0668 |
| Morning | **The toggle gate: no room goes for acceptance until every switch is seen to change something on the screen** | a6fea95e (committed 20 Sep) |
| 09:12 | Art changed after acceptance goes back to the user: Booth 3 is the first | mail 20260919-131216-dev-0691 |

## 20 September: the brakes

| When | Milestone | Record |
|---|---|---|
| 08:48 | An adversarial review of the whole workflow: 195 extra rounds on 818 views, a quarter of the image budget spent painting something twice | 6190a72 |
| 17:10 | **Contract version 7: every ask says what settles it, every change verdict names its fault, and a view gets two change asks, not three** | d3a83eb |
| 18:46 | Nothing reaches the user unreviewed: a whole-room review leaves a receipt, and the mailbox refuses a room it does not cover | 0e07730 |

## 21 September: two thirds accepted

| When | Milestone | Record |
|---|---|---|
| 00:36 | Painting reaches 789 of 791 planned views; 107 of 109 rooms whole | 04bc2df |
| 09:26 | Nothing was ever floating: a painted room writes no depth, so the fabric returns as a depth-only mask | 6d2ffbda |
| Evening | **Accepted rooms pass two thirds: 69 of 105, thirty of them accepted that day** | `room-status.json` |

## 22 September: every view painted

| When | Milestone | Record |
|---|---|---|
| 18:48 | **Every planned view is painted: 863 of 863, the Library's ceiling last** | 47cdf362 |
| 19:26 | The Conference Room's table becomes long in the ZIL itself: the first edit to Infocom's text for the sake of a picture | 304ab4c2 |
| 21:29 | The public site found stale, every release having failed while reporting success; the release now waits for the workflow | 88db0df9 |

## 23 September: the user plays it to the end

| When | Milestone | Record |
|---|---|---|
| Morning | **The user reaches the ending as a clicker, 74 of 80, the last stretch played from checkpoints built during the playtest** | b5a5e3a9, 9b969ec9 |
| 09:25 | The browser harness clicks where things are drawn, not by a thing's id | 0f091163 |
| 10:16 | **The dashboard becomes the user's playtest bug checklist: the work turns from the rooms to the player**; 107 of 109 rooms accepted | d71649fc |

## 24 September: the long table

| When | Milestone | Record |
|---|---|---|
| 08:12 | The Conference Room's long table: two of its three repaints approved and taken in, the third sent back ([the whole story](the-conference-table.md)) | mail 20260924-121254-dev-0912 |
| 08:35 | Rounds twenty-one and twenty-two, both clicking from the start, both win (80 and 74 of 80) | cfff8b64 |
| 11:33 | The room record shows the Rec Area and the Conference Room accepted: all 109 rooms accepted | 3a708d2a |
| 12:53 | **Round twenty-three: the first typed tester to win 80 of 80 from the start**, at turn 723 | 742458f1 |
| 13:03 | Rounds twenty-one and twenty-two triaged against the source; thirteen fixes merged | 26d7881b |
