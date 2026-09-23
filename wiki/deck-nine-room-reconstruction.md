# Building a painted room: Deck Nine reconstructed

Deck Nine is a useful room to follow because nearly every stage survived: the first experiment, the geometry package, failed measurements, grey blockouts, two approved seed paintings, the computed material placed beneath new views, the four-view ring, the ceiling and floor caps, structural variants, user acceptance, and one late correction caused by the room next door. It is therefore less a perfect model than an honest one. The process can be seen changing while the room is being made.

This article reconstructs that process from commits, the design ledger and mailbox, `DECK-NINE.metadata.json`, and the image files in the room package. The contact sheets are made from those archived files. The opening cutaway is a new explanatory illustration: it shows the method, not a literal intermediate artifact. Bearings are clockwise: `000` faces north toward the gangway, `090` east toward the reactor corridor, `180` south toward the sanitation alcove, and `270` west toward the escape pod.

![Reconstructed exploded view of Deck Nine's four-view ring and two caps](wiki/deck-nine-overview-reconstruction.png)

The important idea is simple. The player does not walk a camera freely through a 3D room. The eye stays at one measured point and can turn. Painted views are hung around that eye like panels inside a lantern: four across the horizon, one overhead and one underfoot. Ordinary overlap hides the edges. Doors and other structural changes swap in additional paintings; actors, items and slime are drawn separately so they can move.

## 1. Begin with the room, not with a painting

The authoritative room was a small, awkward volume: 7.0 m east to west, 2.3 m high through its main corridor, and 4.4 m across including the two recesses. The eye was fixed at `[0, 1.6, 0]`. Three routes had to remain readable from that point:

- west through a 1.6 by 2.0 m sliding door into the escape pod;
- east through a 2.2 by 2.1 m opening into a corridor that curves toward the reactor lobby;
- north and upward through a 0.9 by 1.9 m gangway mouth, with a steep stair rising through the deck head.

The fourth direction was deliberately not an exit. It was a shallow sanitation alcove. This matters because image generation likes balanced architecture and can quietly turn a recess into a passage. The package also fixed the room's visual grammar: worn blue-grey steel, dark ribs, cool fluorescent strips, a warmer pool at the gangway, and a locally scrubbed rather than mirror-polished floor.

The metadata did more than describe a box. It recorded which wall each door belonged to, how the doors moved, what was beyond every opening, the lighting, pickable objects, and state conditions. That made the room testable. A pretty image could disagree with the package; the package decided which one was wrong.

## 2. The first trial asked the right question

DR-093 did not begin by rebuilding every room. It asked whether painted views could cover one room while the player still dragged through a full turn. Deck Nine was drawn as six level views, 60 degrees apart, plus an up and a down view. The pass criteria were written before the pictures existed: one fixed viewpoint, continuous overlaps, consistent lighting and contents, no actors baked into the background, and enough pixel density.

![The six archived level views from the DR-093 Deck Nine trial](wiki/deck-nine-01-inherited-trial.png)

The trial exposed two different kinds of uncertainty. First, the stated 74-degree lens did not match what the paintings actually showed. The strong vertical edges of known door jambs were used to fit each image instead. Five of the six clustered around 101 to 120 degrees, with a common working value near 110. Hung at 74 degrees, openings collided; hung near the measured lens, the corridor began to read as one place.

Second, fitting a lens could not make inconsistent content agree. Neighbouring views changed pipe runs, lamps and door details. The trial proved that the viewer could hang paintings, but also proved that six independently generated paintings were not yet a production room. That distinction became central: a view is not accepted because it looks good alone; it is accepted because it agrees with the views on both sides.

## 3. Replace the turn with a planned four-view ring

The production rebuild became DR-108. The planner chose four cardinal views at 115 degrees. Four times 115 gives 460 degrees of painted coverage for a 360-degree turn, leaving about 25 degrees of overlap at each boundary. The views were all 1672 by 941 pixels and shared the same eye and level pitch.

This reduced the number of horizontal seams from six to four and gave each view enough shared material to be checked against its neighbours. It also established a repeatable order:

1. render exact blockouts from the room geometry;
2. approve two opposite seed paintings;
3. compute what those seeds imply in each missing direction;
4. paint only the regions the seeds cannot supply;
5. restore the protected material and fit the result;
6. close the horizontal ring before attempting either cap.

The blockout is not a beauty reference. It is a camera and geometry reference. Its doors, wall junctions and horizon tell the painter where the room is, even when its temporary materials are ugly.

## 4. Two seeds establish the visual world

The north (`000`) and south (`180`) views became the opposite seeds. Together they established the room's material language, exposure, scale and fixed fittings. Choosing opposites was useful: each seed contributed to both side views, and neither missing side had to be invented in isolation.

The seeds were still checked against the blockouts. This is where the earlier trial had taught the most expensive lesson: prose such as “camera in the centre” is weaker than a visible consequence such as a nearby wall occupying a particular part of the frame. The blockout supplied the consequence.

## 5. Build a side view from protected pixels and a small new region

TURN-090 shows the method most clearly. A tool reprojected the accepted `000` and `180` seeds into the exact target camera. That image was the **underpaint**: material already decided elsewhere, placed where the new view should see it. A companion `NEW` mask identified the region that neither seed owned reliably. Greg painted the missing material. Norm's restore step then put the protected seed pixels back and measured the join.

![Blockout, underpaint, new region and final TURN-090](wiki/deck-nine-02-one-view-built.png)

The recorded target for this view was bearing 90, pitch 0, horizontal field of view 115, at 1672 by 941 pixels. Its underpaint drew from both opposite seeds and marked 45 per cent as new share. The fitted final retained 93.6 per cent of the protected image overall; in the join band it retained 53.9 per cent. A per-channel gain corrected the small exposure difference, and the recorded join measure was 9.4.

Those numbers are not a claim that a room can be accepted by arithmetic. They are guardrails. They answer narrow questions: did a supposedly protected wall change, did the view drift, did the seam get brighter? The visual review still asks the broader one: does turning through it feel like one room?

TURN-270 was built the same way. At that point the room had four level views rather than six unrelated illustrations.

![The four accepted cardinal views of the DR-108 ring](wiki/deck-nine-03-closed-ring.png)

“Hanging” the views means registering each image with its bearing, pitch, lens and state condition. The viewer then chooses the view whose centre is nearest the direction the player is looking and blends across the overlap near a boundary. A wrong lens makes two correct paintings collide. A changed object at the edge makes the blend reveal two versions at once. This is why every view is judged in motion, not only as a still.

## 6. Build the caps from the closed ring

The ceiling and floor came after the ring. Both were square, 1254 by 1254 pixels, with a 127-degree field of view and pitch `+90` or `-90`. They were not independent overhead paintings. The closed ring was projected into their outer region first, producing an underpaint that fixed what the cap had to meet at every edge. Only the unseen centre needed to be completed.

![Blockout, underpaint and accepted UP and DOWN caps](wiki/deck-nine-04-caps-built.png)

The accepted UP cap retained 94.7 per cent of its protected source overall and recorded a join of 7.9. DOWN retained 92.3 per cent, with a join of 4.6. More important than either number, their boundary material came from the ring they would actually touch.

This order prevents a common trap. If a beautiful ceiling is painted first and the wall views later, all four wall-to-ceiling joins must be negotiated against a picture that never knew those walls. When the ring feeds the cap, the cap begins with four agreements already in place.

## 7. Add structural states after the empty room works

The base room was intentionally empty. Blather, the ambassador, the translator, slime and loose objects could appear, disappear or move, so none belonged permanently in a background. The room paintings changed only when the architecture changed:

- the gangway emergency bulkhead shut across the north opening;
- the wider corridor bulkhead shut across the east opening;
- the escape-pod door opened in the west wall.

![Base and conditional structural views for Deck Nine](wiki/deck-nine-05-structural-states.png)

Each variant was restored against its accepted base outside the changed area. That makes the condition legible without allowing an edit to repaint the rest of the room. The images were tied to game conditions such as `POD-DOOR has OPENBIT`, rather than to a reviewer manually choosing an attractive alternate.

One state exposed why caps also need state coverage. When the gangway bulkhead shut in TURN-000, the open stair grating could still show through the floor cap's blend. The horizontal view was correct and the room was still wrong while turning downward. A gangway-shut DOWN variant was added after the main room had been accepted. The lesson is that a state owns every view in which its changed structure can appear, including a neighbouring cap.

## 8. Register, toggle, playtest, then ask for acceptance

Registration made the six base views and their variants available to the running game. Review then happened at several levels:

- metadata and package checks caught missing cameras, invalid conditions and references;
- image measurements checked protected regions, lenses, gains and joins;
- the room review page exercised every state while taking views around the eye;
- a person dragged through the seams and toggled doors to see whether anything changed on screen;
- gameplay verified that the same doors remained clickable and led to the right places;
- the user made the final visual decision at the dashboard gate.

Deck Nine's rebuilt DR-108 set was approved, and the user accepted the room on 13 September. “Accepted” meant the production images hung in the game instead of the grey fabric. It did not mean that no neighbouring work could ever create a new obligation.

## 9. The room next door changed the view through the door

The open pod door contains a glimpse of the Escape Pod. Later, the pod itself was rebuilt: webbing moved to the left side, the control panel moved to the back bulkhead, and the porthole moved to the right wall. Deck Nine's accepted open-door variant now showed an obsolete adjacent room.

The glimpse took three attempts. The final edit was constrained through the `POD-MOUTH` mask. Compared with the accepted previous plate, exactly zero pixels changed outside the doorway and 55,559 changed inside it. The corrected far wall agreed with the pod's own accepted TURN-270, while the porthole remained only a narrow dark recess at that distance. This was filed as `DR-112_TURN-270_POD-DOOR-OPEN.png`.

That is an exception path worth keeping in the happy-path story. A room is not isolated. An opening is a contract between two rooms, and changing either side may reopen a small, bounded part of the other. The correct response is not to repaint the room; it is to identify the aperture, lock everything outside it, and update only the shared view.

## What Deck Nine changed in the method

Deck Nine left behind a set of rules that were used on later rooms:

- Write the pass and fail conditions before running an experiment.
- Treat stated camera values as intent until the image has been fitted against known geometry.
- Plan the smallest ring with enough overlap; for this room, four views at 115 degrees.
- Use exact blockouts to communicate spatial consequences, not merely dimensions in prose.
- Approve opposite seeds, derive missing views from them, and protect inherited pixels.
- Close and review the horizontal ring before deriving the UP and DOWN caps.
- Keep movable actors, items and decals out of room backgrounds.
- Give structural variants narrow masks and real game-state conditions.
- Review toggles and seams in the running viewer; a still image and an automated check can both pass while the turn is wrong.
- Treat a doorway glimpse as shared continuity with the adjoining room.

The workflow is sometimes described as Greg paints and Norm hangs. Deck Nine shows the more useful version. Greg establishes and repairs the visible world; Norm establishes cameras, derives guides, protects accepted material, connects game conditions and tests the result; the user settles whether it actually reads correctly. The room emerges through the boundaries between those jobs.

## Artifact trail

| Stage | Recorded artifact |
|---|---|
| Geometry and behavior | `RoomPolishInstructions/DECK-NINE_Visual-Design-Handoff_v1/DECK-NINE/DECK-NINE.metadata.json` |
| Design and acceptance requirements | the package `README.md` |
| Initial turntable trial | `reference/DR-093-TRIAL-NOTES.md` and `DECK-NINE_TURN-*` |
| Production blockouts and seeds | `reference/DR-108_TURN-*_BLOCKOUT.png`, `000_SEED`, `180_SEED` |
| Side-view derivation | `DR-108_TURN-090_UNDER.json`, `DR-108_TURN-270_UNDER.json` and their images |
| Registered ring | `DR-108_TURN-000/090/180/270` files and camera metadata |
| Caps | `DR-108-UP/DOWN_BLOCKOUT`, `UNDER`, and `DR-108_TURN-UP/DOWN` |
| Structural variants | the three door-state views plus the later floor-cap state |
| Adjacent-room correction | `DR-112_TURN-270_POD-DOOR-OPEN.png` |
| User verdict | commits `2e9c699` and `810594f`, plus `wwwroot/data/room-status.json` |

The figures on this page can be rebuilt with `scripts/build-deck-nine-wiki-figures.mjs`; the script reads the archived package images and does not alter them.
