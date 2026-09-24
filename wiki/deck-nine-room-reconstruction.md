# How a room is painted: Deck Nine

This page shows how a painted room is fitted together, by following one room through every stage. Deck Nine is a good room to follow because nearly every stage survived in its package: the first trial, the room's geometry, lenses that had to be measured, grey blockouts, two approved seed paintings, the material computed beneath each new view, the four-view ring, the ceiling and floor caps, the door states, the user's acceptance, and a later correction caused by the room next door. The last sections cover the lessons other rooms added in the same days, and how rooms are painted now.

The page is drawn from the commits, the request ledger and mailbox, `DECK-NINE.metadata.json`, and the image files in the room's package. The contact sheets are made from those files. The opening cutaway is an explanatory illustration of the method, not a file from the work. Bearings run clockwise: `000` faces north toward the gangway, `090` east toward the reactor corridor, `180` south toward the sanitation alcove, and `270` west toward the escape pod.

![Reconstructed exploded view of Deck Nine's four-view ring and two caps](wiki/deck-nine-overview-reconstruction.png)

The idea behind it is simple. The player does not walk a camera through a 3D room. The eye stays at one measured point and can only turn. A painting made from that eye, hung on the flat plane it was projected onto, is exactly right from the eye however the player turns, and nothing behind it needs to be modelled. Norm built this on 12 September as "the plate" (e41b1a6). Painted views are hung around the eye like panels inside a lantern: four across the horizon, one overhead and one underfoot. Doors and other structural changes swap in other paintings. Actors, items and slime are drawn separately so they can move.

## 1. Begin with the room, not with a painting

The room's metadata describes a small, awkward space: 7.0 m east to west and 2.3 m high through its main channel, and 4.4 m north to south, which is a 2.2 m channel with a 1.1 m bay on each side. The eye is fixed at `[0, 1.6, 0]`. Three routes have to stay readable from that point:

- west, through a 1.6 by 2.0 m sliding door, into the escape pod;
- east, through a 2.2 by 2.1 m opening, into a corridor that curves out of sight toward the reactor lobby;
- north and up, through a 0.9 by 1.9 m gangway mouth, with a steep stair rising through the deck head.

The fourth direction is deliberately not an exit. It is a shallow sanitation alcove, and a painting must not turn it into a passage. The package's README also sets the room's look: desaturated blue-grey painted steel, dark navy-charcoal ribs, cool ageing fluorescent light, a warm pool at the gangway mouth, and a freshly scrubbed patch of floor that is cleaner than the rest but not mirror-polished.

The metadata does more than describe a box. It records which wall each door belongs to, how the doors move, what lies beyond every opening, the lighting, the things a player can click, and the game conditions for each state. That made the room testable. A painting could disagree with the package, and the package decided which one was wrong.

## 2. The first trial (DR-093)

The panorama trial earlier on 12 September had shown why one wide image would not do: a single 360-degree image gave about 4.9 pixels per degree, against about 23 for a framed view. DR-093 (b9f3334) asked instead whether several painted views could cover one room while the player still dragged through a full turn. Deck Nine was drawn as six level views, 60 degrees apart, plus an up and a down view, with the pass and fail criteria written before the pictures existed: one fixed viewpoint, continuous overlaps, consistent lighting and contents, no actors in the background, and enough pixel density.

![The six archived level views from the DR-093 Deck Nine trial](wiki/deck-nine-01-inherited-trial.png)

The trial exposed two kinds of problem. First, the lens the pictures were asked for, 74 degrees, was not the lens they showed. Norm first declared the set a failure from a table that assumed the asked-for lens, then withdrew the verdict when Greg challenged it (dbbd89a, 00c2918). He then fitted each picture's real lens against the door jambs, whose bearings from the eye are known exactly. Five of the six fits ran from 101.5 to 119.5 degrees, and the sixth, the weakest fit, came out at 74.5. Hung at a common 110, the set held together; at 74 every doorway collided (bd6b9e4).

Second, no lens could make two pictures agree about content. The two views either side of the pod door disagreed about where the door was, because each had been drawn from its own implied standing point (d10bb79). The trial showed that the viewer could hang paintings, and also that six separately generated paintings were not yet a room. A view is accepted not because it looks good alone but because it agrees with the views on both sides.

## 3. A planned four-view ring (DR-108)

That evening Norm wrote one brief for all the artwork and audited every package against it: 128 images in 51 packages, and no room could be hung as it stood (264a87e). He also built `planRing()`, which works out from the metadata alone the cheapest set of views that keeps every seam on plain wall (69cc078). For Deck Nine it chose four views at 115 degrees. Four times 115 gives 460 degrees of painting for a 360-degree turn, about 25 degrees of overlap at each join. The Deck Nine rebuild became DR-108: four level views of 1672 by 941 pixels, all from the same eye at a level pitch.

This cut the joins from six to four and gave each view enough shared picture to be checked against its neighbours. It also set an order that later rooms followed:

1. render exact blockouts from the room's geometry;
2. approve two opposite seed paintings;
3. compute what those seeds already show in each missing direction;
4. paint only the parts the seeds cannot supply;
5. put the protected pixels back and fit the result;
6. close the ring of level views before either cap.

The blockout is not a beauty reference. It is a camera and geometry reference. Its doors, wall corners and horizon tell the painter where the room is, even where its flat colours are ugly.

## 4. Two seeds set the look

The north (`000`) and south (`180`) views were the seeds. Together they set the room's materials, exposure, scale and fixed fittings. Choosing opposites meant each seed fed both side views, so neither side had to be invented alone.

The seeds were painted over blockouts rendered from the engine's own fabric. Deck Nine's older views did not match that fabric: a deck head ran through as wall, and the alcove sat five degrees off centre. `graybox-view.mjs` renders the fabric from the eye at an exact camera, so a seed painted over it is at the right camera by construction (1adf50a). The trial had taught the same lesson in prose: "camera in the centre" did not hold a camera in place, but door jambs at stated fractions of the frame did. On 13 September the seed blockouts were committed at 08:50 and the seeds at 09:01 (8ce2940, 7d06a6a).

## 5. A side view from protected pixels and a small new part

TURN-090 shows the method most clearly. A tool projected the accepted `000` and `180` seeds into the exact camera of the new view. Because every view shares one eye, any two views differ only by a rotation, so this projection is exact. The result is the **underpaint**: material already decided elsewhere, placed where the new view sees it. A companion `NEW` mask marks the part neither seed covers. Greg painted over the whole guide. Norm's restore step then put the protected seed pixels back and measured the join.

![Blockout, underpaint, new region and final TURN-090](wiki/deck-nine-02-one-view-built.png)

The method came from a failure the night before. The first attempt put an accepted seed in the middle of a larger grey canvas and asked the image generator to fill the border; it drew a new room at its own framing instead (70fe4c4). Whole-picture edits, by contrast, kept every edge. Norm's conclusion was that the generator must be given complete pictures and never holes, and `underpaint.mjs` (6f29ab0) was built on that. It was proved first on the dorm pilot (DR-107): Dorm A's ring hung that night with joins scoring 1.2 to 2.5, where Deck Nine's DR-093 set had scored 8 to 37.

TURN-090's receipts record the camera as bearing 90, pitch 0, horizontal lens 115 degrees, at 1672 by 941 pixels. Its underpaint drew from both seeds and left 45 percent of the frame as new. The final view kept 93.6 percent of the protected picture overall and 53.9 percent in the band where old meets new. A per-channel gain corrected a small exposure difference, and the join measured 9.4 (`DR-108_TURN-090_UNDER.json`, `DR-108_TURN-090.json`).

Those numbers do not accept a room. They answer narrow questions: did a protected wall change, did the view drift, did the join get brighter? The review still asks the broad one: does turning through it feel like one room?

TURN-270 was built the same way. Norm approved both side views at 09:13 on 13 September (c2ed959), and the room had four level views rather than six unrelated pictures.

![The four accepted cardinal views of the DR-108 ring](wiki/deck-nine-03-closed-ring.png)

"Hanging" a view means registering it with its bearing, pitch, lens and state condition. The viewer draws every view at once, each as a flat plate at its own fitted lens (`dashboard/turn.js`, `scene/parts.js`). Each view owns an arc of bearing outright and fades out just beyond it, over 5 degrees, or 2 where one view was built from the other. Where the joins fall is solved, not fixed: one gain per view first levels the exposure across the overlaps, then each join is placed where the two pictures agree best, with a heavy charge for any join inside a doorway, because "two views of a DOOR disagree about what the door IS" (ec7fbc8). These rules came from the user's first drag through the DR-093 set on 12 September, which found a jump in the east corridor and a pod door that sat closer in one picture than the next (d10bb79, a30de17). Where no join could be put on plain wall, the rule became a view centred on every opening (cba06f2). A wrong lens makes two correct paintings collide, and a changed object at the edge of a fade shows two versions at once, which is why every view is judged while turning, not only as a still.

## 6. The caps, from the closed ring

The ceiling and floor came after the ring. Both are square, 1254 by 1254 pixels, with a 127-degree lens at pitch `+90` or `-90`. They were not free overhead paintings. The closed ring was projected into their outer part first, so the underpaint fixed what each cap had to meet at every edge, and only the unseen centre needed painting.

![Blockout, underpaint and accepted UP and DOWN caps](wiki/deck-nine-04-caps-built.png)

The accepted UP cap kept 94.7 percent of its protected picture and recorded a join of 7.9. DOWN kept 92.3 percent, with a join of 4.6 (`DR-108_TURN-UP.json`, `DR-108_TURN-DOWN.json`). More important than either number, their edges came from the ring they actually touch. If a ceiling is painted first, all four wall-to-ceiling joins must be negotiated against a picture that never knew those walls. When the ring feeds the cap, the cap starts with four agreements in place.

Caps gave more trouble than their size suggests. In the first days they were thrown to about 10^16 metres by a tangent in the maths (b920d0f); they became square because a wide cap left a dark band when looking down (bd86df5); one drew as a single flat colour at a level gaze, and caps sometimes drew over the ring (41b26a8); and open-air rooms had been given a ceiling (5a2f7ac). The Crag's floor join survived three repaints until Norm measured a bright highlight ridge lying exactly on it; `underpaint seam` now takes out such a ridge, and restore reports each stretch of a join as a STEP or a RIDGE (2f97763, 7654323). Projecting the ring does not fill a cap: on a complete four-view ring, `caps` found about 69 percent real pixels and left the centre flat, so a cap still has to be painted, or, for regular plating, filled by `cap-fill.mjs` (see [Tools](tools.md#painting-tools)).

## 7. Door states, once the empty room works

The base room is empty. Blather, the ambassador, the translator, slime and loose objects can appear, disappear or move, so none belongs in a background. Since DR-100 on 12 September, a state that changes structure is a painted variant of the view that sees it, such as `TURN-270@POD-DOOR-OPEN`, with a condition in the game's own terms. The base is the default and the most specific matching variant wins. Only the views a state changes need a variant, and flat additions such as the slime are drawn by the engine as decals (see [Actors and items](actors-and-items.md)). DR-100 began because the review page's door switches had changed nothing on screen. Deck Nine's pod door was the first state in the game that actually drew (7d8e85e).

In the DR-108 set, the room's paintings change only when the architecture does:

- the narrow emergency bulkhead shut across the base of the gangway (`TURN-000@GANGWAY-DOOR-SHUT`);
- the wider bulkhead shut across the east corridor (`TURN-090@CORRIDOR-DOOR-SHUT`);
- the escape-pod door open in the west wall (`TURN-270@POD-DOOR-OPEN`).

![Base and conditional structural views for Deck Nine](wiki/deck-nine-05-structural-states.png)

Each variant was edited only through its doorway, and every pixel outside was restored from its base, so a state cannot repaint the rest of the room. Each is tied to a game condition such as `POD-DOOR has OPENBIT`, not to a reviewer choosing an alternative by eye.

One state showed that caps need states too. With the gangway bulkhead shut in TURN-000, the open step grating in the floor cap still showed through the bottom fade of that view. The level view was right, and the room was still wrong when looking down. A gangway-shut variant of the floor cap was added on 15 September, two days after the room was accepted (276ee2a). The check that found it, `capStates` in `review-room.mjs`, was written after the same fault in Storage West, and on its first run it found Deck Nine's. A state owns every view in which its changed structure can appear, including a cap.

## 8. Register, toggle, review, then ask for acceptance

Registering the four level views, the two caps and their variants in the metadata made them available to the review page, and from 14 September to the game itself, which hangs the paintings of every accepted room (f31720b). Review happened at several levels:

- the package checks catch missing cameras, invalid conditions and missing files;
- image measurements check protected pixels, lenses, gains and joins;
- the room review page shows every state while turning around the eye;
- the doors are switched to see that each switch changes something on screen;
- the game's invisible click targets stay under the paintings, so the door the player clicks is the painted door (d10bb79);
- the user makes the final visual decision at the dashboard gate.

Norm approved the whole DR-108 set at 09:35 on 13 September (2e9c699), and the user accepted Deck Nine at the gate that afternoon (810594f). Acceptance did not mean that work in a neighbouring room could never reopen part of it.

## 9. The room next door changed the view through the door

The open pod door shows a glimpse of the Escape Pod. On 16 September the pod was laid out twice more (see the [journal](journal.md#15-16-september-the-opening-sequence-and-the-pod-built-three-times)). The glimpse was re-edited that morning to the first of those layouts, with the safety web as one mass on the left; the result, `DR-108_TURN-270_POD-DOOR-OPEN_V2_R4.png`, was accepted (caa1c05). That evening's rebuild (DR-112) moved the pod's control panel to the far bulkhead and cleared the right-hand wall for the porthole, so the accepted glimpse was now right on the left and right and wrong straight ahead, the easiest kind of error to miss (the metadata's `POD-MOUTH` note).

The corrected glimpse was right at the third attempt. The edit was confined to the `POD-MOUTH` doorway: measured against R4, exactly zero pixels changed outside the doorway and 55,559 inside it. The control panel now sits on the far bulkhead where the pod's own TURN-270 puts it, and the porthole reads only as a narrow dark recess at that distance. Norm approved it at 21:59 on 16 September as `DR-112_TURN-270_POD-DOOR-OPEN.png` (mail 20260917-015910-dev-0268). The mail said it was registered, but it was not: the room's metadata went on hanging R4 for the open pod door, with a note that it needed this re-edit. The wiki's own fact check found the gap on 24 September, and the corrected glimpse was registered that day, the only change to the accepted room, which went back to the user for review.

A room is not isolated. An opening is shared between two rooms, and changing either side can reopen a small, bounded part of the other. The response is not to repaint the room but to find the opening, lock everything outside it, and update only the shared view.

## What Deck Nine changed in the method

Deck Nine left a set of rules that later rooms used:

- Write the pass and fail conditions before running an experiment.
- Treat stated camera values as intent until the picture has been fitted against known geometry.
- Plan the smallest ring with enough overlap; for this room, four views at 115 degrees.
- Give the painter an exact blockout, not dimensions in prose.
- Approve opposite seeds, build the missing views from them, and protect the pixels they supply.
- Close and review the ring before the caps.
- Keep movable actors, items and decals out of room backgrounds.
- Give door states narrow masks and real game conditions, and give a cap a state wherever a level view's state shows through its fade.
- Review switches and joins in the running viewer; a still image and an automated check can both pass while the turn is wrong.
- Treat a doorway glimpse as shared with the room next door.

In the work, Greg painted and repaired the visible room; Norm set the cameras, built the guides, protected accepted pixels, wired the game conditions and tested the result; and the user decided whether it read correctly.

## Outdoors, rising seas and light

Deck Nine is an interior. The outdoor rooms painted in the same days (DR-109) added three lessons.

- **Outdoors.** There was no fabric to seed from, so the parts kit gained open rooms, sea, rock, a winding stair and prism-shaped rooms, and each sky room got one sun. The outdoors exposed engine faults the interiors had hidden: the Balcony's sea horizon sat 3.3 degrees low because the far plane stopped at 200 m, and now reaches 40 km (f372d50); and every painting had been hung round the room's floor rather than the eye, so each view's horizon sat 7.6 degrees low and neighbouring views met at an angle, hidden wherever joins fell on walls (71fbe11).
- **Seas that rise.** Planetfall's sea rises day by day, so the outdoor rooms have a variant for each day. Asked to raise the sea, the generator also repainted fixed rock, and once painted a rock face out of the Winding Stair's day-3 view. `underpaint state` builds a sea-only variant that takes only new water, and only where the earlier day already shows sea or where fabric renders at two sea levels say the water rose; `check-states.mjs` flags any variant that changed fixed structure (7654323, 604c0b9).
- **Light.** The lighting rig was built for geometry, and a painting is hung unlit, so dusk and night changed nothing on screen; ***the user found that none of the time-of-day switches worked*** (13 September). Since 14 September a per-phase grade is applied inside each painting's own material, leaving daylight exactly as painted, and a sky matte keeps wet rock from turning salmon at dusk (`scene/grade.js`, `scene/skymatte.js`, d1f27aa).

## A number is a question, the picture is the answer

By 16 September a painted room passed through five or six measuring tools before it was registered, and that day nearly every one gave at least one confident wrong answer (see the [journal](journal.md#15-16-september-the-opening-sequence-and-the-pod-built-three-times)). Each was settled in seconds by magnifying the actual boundary and looking at it.

The escape pod's descent made the same point on one question: how fast the planet grows in the porthole. Counting changed pixels read 99 percent for two different beats, because the stars differ too; counting lit pixels undercounted a dim, far disc; the largest connected region was cut off by the webbing; and a span at a fixed brightness was fooled by the atmosphere's halo, on which reading a correct painting was rejected. What works is the span at half of each state's own peak brightness, which reads 41, 143, 326, 499 and 501 px across the five approach beats (a00e392). The failed measures are recorded in the package, since the next painted sequence will ask the same question.

Two habits came from that day. Where a measurement cannot apply, the reason is written into the view's own registration, so nobody repaints a correct wall on the same reading twice. And where a tool's number is noise, the tool says so: `restore` prints the band's own texture beside its score, and `review-room.mjs` marks overlaps unreliable where its lens fitter trusts no view, as in fog and water (6e897eb, 581a9c1, c47aad9).

## What changed after Deck Nine

The order above still holds. What changed is who does each step and what guards it.

- **Fabric replaced the package blockouts.** Rooms are built from `scripts/fabric-*.mjs`, and the guides are renders of that fabric (`graybox-view.mjs`). They took the place of the hand-measured props used for the first pilot rooms.
- **One layout for rooms that see each other.** From 14 September each cluster of rooms is built as one plan and each room cut from it, starting with the Kalamontee living quarters (f0f07e4), then Lawanda and the Feinstein. A doorway shows its neighbour's real geometry. See the [journal](journal.md#14-september-not-waiting-one-layout-and-a-public-site).
- **Norm renders the guides; Greg paints over them.** Since 18 September Greg's work is image work only, and cameras, guides, compositing and registration are Norm's (see the [journal](journal.md#18-september-image-work-to-greg-compute-to-norm-and-the-playtests-back)). Greg is asked only for what compute cannot make, inside a stated box. [The Look](the-look.md) shows the Helipad's guides beside Greg's paintings.
- **Only the new part is taken in.** A delivery is taken in by `underpaint.mjs restore`, or by `underpaint.mjs through --rect` for a stated box, and every pixel outside the new part is kept from the accepted picture. Registering never overwrites: a repaint of a registered view carries a round number, `_R<n>`, and is restored to its own file (`scripts/deliveries.mjs`).
- **The whole room is reviewed before the user sees it.** `review-room.mjs` shoots the room turning, with every switch; since 19 September its toggle gate holds back a room until every switch has been seen to change something on screen, and since 20 September it writes a receipt of every view it reviewed, which the mailbox checks before a room may go to the user (see [Tools](tools.md#dashboard-and-review)).
- **Each ask says what settles it.** Since 20 September every ask in the mailbox states whether it is settled by the pixels, by a render, by the rendered page or by a test, and closing it needs that evidence.
- **Doorway glimpses are built by compute where they can be.** `room-through.mjs` runs each doorway ray on into the neighbour and reads the point it meets from the neighbour's own paintings, so the parallax is right (18 September). Where no painting of the neighbour sees the faces the doorway looks at, those parts are painted. On 24 September the Conference Room's long table, seen from Booth 1 and through the Rec Area's door, was built this way: the reprojected parts kept, and Greg asked to paint only the holes (mail 20260924-124034-dev-0915). See [The Conference Room table](the-conference-table.md).

## Artifact trail

Paths are inside `RoomPolishInstructions/DECK-NINE_Visual-Design-Handoff_v1/DECK-NINE/`.

| Stage | Recorded artifact |
|---|---|
| Geometry and behaviour | `DECK-NINE.metadata.json` |
| Design and acceptance requirements | `README.md` |
| First turntable trial | `reference/DR-093-TRIAL-NOTES.md`, `DR-093-SET-PROMPTS.json` and `DECK-NINE_TURN-*` |
| Blockouts and seeds | `reference/DR-108_TURN-*_BLOCKOUT.png`, `DR-108_TURN-000_SEED.png`, `DR-108_TURN-180_SEED.png` |
| Side views | `DR-108_TURN-090_UNDER.json`, `DR-108_TURN-270_UNDER.json`, their `_NEW` masks, and the restored views with their `.json` receipts |
| Registered ring | `DR-108_TURN-000_SEED.png`, `DR-108_TURN-090.png`, `DR-108_TURN-180_SEED.png`, `DR-108_TURN-270.png` |
| Caps | `DR-108-UP_BLOCKOUT`, `DR-108-UP_UNDER`, `DR-108_TURN-UP`, and the same for DOWN |
| Door states | `DR-108_TURN-000_GANGWAY-DOOR-SHUT.png`, `DR-108_TURN-090_CORRIDOR-DOOR-SHUT.png`, `DR-112_TURN-270_POD-DOOR-OPEN.png` (since 24 September; `DR-108_TURN-270_POD-DOOR-OPEN_V2_R4.png` before), and the later `DR-108_TURN-DOWN_GANGWAY-DOOR-SHUT_R1.png` |
| The glimpse corrected for the pod | `DR-112_TURN-270_POD-DOOR-OPEN.png` (approved 16 September, registered 24 September) |
| The user's verdict | commits `2e9c699` and `810594f`, and `wwwroot/data/room-status.json` |

The figures on this page are rebuilt by `scripts/build-deck-nine-wiki-figures.mjs`, which reads the package images and does not change them.
