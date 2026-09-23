# The look: Greg, the packages and the review loop

Every room began as a grey box. This page covers how that changed, from 10 September to the evening of 12 September. A second agent, Greg, started delivering one design package per room, with a written spec, painted concept images and later machine-readable metadata. Norm learned to review those packages against the original game. A list of findings grew into a numbered ledger with a contract. A dashboard and a per-room review page gave the user a place to judge the results. The page ends at the moment the user chose painted rooms you can look around; [Seamless rooms](seamless-rooms.md) takes it from there.

## The graybox

From the first commit (bd88341, 9 September) every room was built from its game data as flat-coloured boxes. Exits were panels, objects were small boxes, actors were purple boxes, and portable things were gold. The eye is fixed in the middle of the room: you can turn it but not walk it. `scene/view.js` renders at 70 degrees vertical, lit by a hemisphere light and one point light. Per-room override files in `data/scenes/` existed, but only the escape pod had one. The backlog item read "Replace grayboxes with real graphics (user goal)", with the asset pipeline undecided.

On the morning of 10 September the user asked how far away room-by-room imagery was. Norm's assessment (1c24cc4) was blunt: one room of 105 had a scene file, and "the plumbing is small, the content is the long pole". Norm recommended one generated 360-degree panorama per room. That idea came back, and failed, two days later.

## A second agent

At 11:13 that morning the user wrote: "i'm having another agent create the room details and instructions for integration into the local folder "RoomPolishInstructions" -- when we get to the point of "painting" the rooms, take a look at those." The first four packages were committed at 11:35 (eef7c52): Deck Nine, the escape pod, Underwater to Crag, and the Balcony.

Each package had two parts:

- An authoritative README covering geometry, palette, states and suggested Three.js integration. It proposed a bespoke builder function per room.
- Two or more framed concept images, the "comps", about 1672 by 941 pixels.

The rule of authority was game state first, then README, then images. The Deck Nine README listed "a full equirectangular panorama" as out of scope. This agent was "another agent", "the graphics agent" or "the design agent" until 11 September at 08:36, when the user wrote "the design agent (lets call him greg)".

## Reviewing the packages

The user asked whether Greg should do anything differently. Norm checked the packages against `world.json`, the rules and the ZIL, and found them "acceptable as they stand". Norm asked for six conventions:

1. a hotspot table;
2. priority tiers;
3. a rule for where dropped items go;
4. regional style guides;
5. an index with a replace-in-place revision rule;
6. engine names taken from the code rather than guessed.

Greg's next package, the Winding Stair (in 7decc74, 12:14), arrived with `CONVENTIONS.md`, `INDEX.md` and a Kalamontee regional guide that did all six. Packages kept coming while the playtest rounds ran:

- the Courtyard, West Wing and Plain Hall;
- the Rec Area, Rec Corridor and SanFac A;
- Dorm A;
- seven Kalamontee packages, then six more.

Read-only review agents checked each batch. One finding shows the kind of error they caught: the Rec Corridor package was sent back because it wrote `SOUTHWEST` where the game's data says `SW`, and because its dropped-item fan sat on an exit path.

## From a list to a ledger

On 11 September at 06:22 the user asked Norm to put every finding "in one and call it DESIGN-REQUESTS" (0a863ef). It was rewritten within the hour against an ingestion contract the user supplied, in which Greg's changes arrived as numbered override layers on a baseline (283577d).

At 08:06 the user proposed the loop that still runs today: "lets come up with a pattern where you review the design artifacts for canonical accuracy and can provide requests back to the design agent ... can we put that in a contract that you both have access to". `DESIGN-REVIEW-CONTRACT.md` (3710e1f, 08:14) turned the list into a ledger of numbered requests, DR-001 onward. Each has an owner, a status and an append-only thread. The user decides, Greg owns the look, and Norm reviews for faithfulness and buildability, not taste. Norm makes every commit.

The contract changed quickly:

| Version | Date | What changed |
|---|---|---|
| 1 | 11 Sep | First version: numbered requests, statuses, threads |
| 2 | 11 Sep | Greg got write access to the repository. The override layers were dropped in favour of direct per-room metadata, with an index, a schema and shared metadata. |
| 3 | 11 Sep | Time-stamped thread entries "so we can see a dialogue", a delivery checklist with `check_design.mjs`, and Norm allowed to correct metadata but never images |
| 4 | 11 Sep | The inventory of sky rooms, and a check that each has all three day-phase looks |
| 5 | 12 Sep | The artwork brief and audit (see [Seamless rooms](seamless-rooms.md)) |
| 5.1 | 12 Sep | The ledger cut down to the live queue, with the rest archived verbatim; Norm given his name |
| 6 | 13 Sep | The mailbox (see [How we work](how-we-work.md)) |
| 7 | 20 Sep | The brakes, after an adversarial review of the workflow: an ask says what would settle it and its close brings that evidence; a verdict asking for changes says what is wrong, with the boxes drawn on the blockout where it names a rectangle; and a view gets two change asks, not three, before the room goes to the user |

The user put the division of labour in one sentence: "you are empowered to make any corrections to the metadata files, but any design artifacts (images) should be left to greg" (11 September, 08:43).

## Metadata, and a checker

With repository access, Greg consolidated everything into one `<ROOM>.metadata.json` per room. Each file holds exits, doors, dropped-item anchors, Floyd's spot, states and, later, lighting. They sit alongside a schema, a package index and a shared file (DR-037, reviewed in bb2ccb8).

Most review findings were mechanical: an object from the wrong room, dropped-item anchors inside exit lanes, Floyd inside the item fan, doors missing their panels. So Norm wrote `scripts/check_design.mjs` (992386c, 09:13), a read-only checker Greg runs before marking anything ready. Later a sweep of doorways shared by two packages found 6 of 41 disagreeing on size. The checker now catches that too (DR-084).

The first decision the user made through the ledger was DR-014. The user had proposed separate "light", "dark" and "crepuscular" window states. Greg recommended one set of paintings with three lighting looks in the metadata, instead of 20 to 30 extra images. The user answered "DR-014 - yes", and it was approved that morning.

## The graybox reads the design

Until 11 September the grey box ignored all of this, so small controls overlapped and dropped items drew at the eye. DR-045 (8d141b0, 11:42) made the host serve every package's metadata live at `/design/rooms.json`. `scene/design.js` folds it in under the scene files, so the grey box takes its proxy sizes, dropped-item anchors and Floyd's spot from the design. DR-046 (3c2c8de) added three more rules: no false openings, a door hidden together with its exit, and extra items kept clear of every exit lane.

## The Planetfall Dashboard

On 11 September at 19:26 the user asked for "a dashboard so i can check on overall status ... lets call this the Planetfall Dashboard". After a round of questions, Norm built it in twenty minutes (5c9a0eb, 19:46). It lists all 105 rooms, grouped by the 13 regions the map layout already computed, through the stages package, review, integrated and room test. Each room shows its comps, links to its package files, and a walkable preview that uses the game's own pipeline, with hopping to the next room. At launch it showed 26 rooms packaged; 28 were indexed, but Deck Nine and the escape pod had no metadata yet.

Over the next days it gained:

- compare mode (180a41f, 12 September), which lays a comp over the built view with the lens as a slider;
- a fifth stage, the user's acceptance gate (8f18eac);
- the six-stage, who-holds-what layout of 13 September (5d2d931);
- a mailbox panel (c4022cc).

Since cba06f2, `/` opens the dashboard.

## The acceptance gate and the review page

On 12 September the user pointed out the cost of the obvious approach: a model eyeballing screenshots and nudging geometry would spend about 50,000 tokens a room. They asked instead for a tool, and for "a user acceptance gate on whether it looks right". Commit 8f18eac (08:45) delivered two things. The first was the parts kit: a room is described as a block of JSON built from nine reusable parts and named materials. The second was the gate: a "Does it look right?" verdict with a note, written by `POST /design/accept` into `room-status.json`. It is the one stage no check can replace.

Later that day the user asked whether Deck Nine had states worth showing, such as "the ambassador showing up / blather showing up / after the emergency happens / open bulkhead". The answer was `uat.html` (45adc47). It draws one room exactly as the game does, and derives its switches from the room's own conditions, doors and actors. It replaced a temporary comparison page. It marks any switch that has no artwork behind it. It is where the user now does every final look.

## Clearing the backlog

By the morning of 12 September, 51 rooms had packages and none was in the game. Norm wrote a working order at the top of the ledger (b2c9867, 11:03): pause new packages and clear the integration gates in priority order. Working orders have driven Greg's queue ever since.

## The day the look changed (12 September)

The user asked Norm to "move to the starting point room and try to apply the design guidance there". Deck Nine had no metadata, so Norm wrote it (DR-086). Norm also found two places where the comp contradicted the running game (DR-087). The comp put a wheel door at the top of the gangway, where the game has a narrow bulkhead at its base, and it drew a hinged hatch where the pod door slides. Greg repainted both.

Then the user looked at the built room: "the scene in deck 9 is very blocky. is there going to be some overlay of the graphics at some point?" Norm had to admit that the comps had only ever been references and would not appear in the game as they were. Norm later said, "I explained it badly. Twice." Several attempts followed:

- **A panorama.** Greg's generator returned 1774 by 887 pixels against the 6144 by 3072 needed, so the trial was withdrawn on its own pass criterion (240d1df).
- **Better lighting**: the day-phase rig (DR-060) and authored interior lighting (DR-092).
- **Three ways.** Deck Nine was built three ways on one comparison page (66025be): as it was, as stylised geometry with drawn textures, and as the comp with clickable hotspots over it.

The user chose the painted comp, and refused to lose what made the rooms rooms: "ok c is the best visually, but we lost the ability to drag around to see the whole room". How the team got both is the subject of [Seamless rooms](seamless-rooms.md).

## What was hard

- **Packages of prose.** The first packages were written specs with mood images. Items were placed by sector rather than by coordinate, and engine names were guessed. Four older packages, and Deck Nine, had no machine-readable metadata at all, so those rooms could not be built.
- **Mechanical errors.** Most review findings were small errors in ids, lanes and doors, and each one took a review round to catch.
- **Lenses.** Comps and camera did not share a lens. The engine renders 70 degrees vertical, while two comps measured about 105 degrees against the 70 and 82 they claimed.
- **Comps against the game.** Deck Nine's comp contradicted the game in two places, and a panorama conditioned on it copied both mistakes.
- **Expectations.** The user expected to see the paintings in the game, and was shown grey boxes.
- **Two agents, one ledger.** A test's cleanup ran `git checkout` on the ledger and wiped one of Greg's delivery entries (6a939bc). Norm reconstructed it and apologised in the ledger.
- **A schema bug.** Norm put `lighting` beside a `$ref`, and the checker rejected Greg's valid lighting (2c62ad5).
- **Stale pages.** The dashboard served stale copies from the browser cache.
- **Locked builds.** Norm's review servers repeatedly locked the user's build.
- **Unreliable timestamps.** Norm typed the ledger timestamps by hand on 12 September, and they ran ahead of real time until Norm's 23:47 entry. For the order of events that day, use the commit times.

## What we built to fix it

- **Shared conventions** and a regional guide (7decc74), then a per-room metadata file with a schema (bb2ccb8).
- **The ledger and the contract** (3710e1f), with threads, statuses and a division of labour.
- **`check_design.mjs`**, run by Greg before every delivery (992386c), which now includes the check on shared doorways.
- **The live metadata route and `design.js`** (8d141b0), so the build follows the design.
- **The Planetfall Dashboard** (5c9a0eb), **compare mode** (180a41f), **the acceptance gate** (8f18eac) and **the review page** (45adc47).
- **The parts kit and material palette** (8f18eac), which later carried the painted rooms.
- **Working orders** in the ledger (b2c9867).
- **Tests that never revert a shared file wholesale.**
