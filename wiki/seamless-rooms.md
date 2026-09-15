# Seamless rooms: painted views you can look around

On 12 September the user chose painted rooms over modelled ones, on one condition: the player must still be able to drag to look all the way around. This page tells how flat concept paintings became rooms with no visible joins. It covers a trick that makes a painting exact from a fixed eye, a long fight with seams, a written brief for all the artwork, a method that builds each new painting from the ones already accepted, and a series of fixes to how the engine hangs paintings. It also covers the doors that open, the seas that rise, and the time-of-day lighting that reached the paintings on the morning of 14 September.

## A few words used on this page

| Word | Meaning |
|---|---|
| Eye | The fixed point, 1.6 m up in each room, that the player turns around but never leaves |
| View | One painting of the room from the eye, facing a stated bearing with a stated lens |
| Ring | The level views that go all the way round; the **caps** are the views straight up and straight down |
| Seam | Where two neighbouring views meet on screen |
| Fabric | The room as the engine builds it from parts: walls, doors, stairs, rock and sea, drawn plain |
| Seed | The first painted view of a room, from which the others are built |
| Guide | The picture Norm gives Greg to paint over: accepted views projected into the new frame, with fabric filling the rest |
| State variant | A second painting of a view for a different game state, such as a door open or the sea higher, named `TURN-nnn@STATE` |

## Why a flat painting can be exact

The idea behind everything on this page came from the camera. The eye never moves; it only turns. A painting made from the eye and hung on the flat plane it was projected onto is therefore exactly right from the eye, however you turn. Nothing needs to be modelled behind it.

Norm built this as "the plate" (e41b1a6, 12 September 13:04). It hangs a comp at its bearing, pitch and lens, and fades its edges so it stops reading as a poster on a wall (6c4b874). The failed panorama trial earlier that day had made the density argument for it. One 360-degree image from Greg's generator gave about 4.9 pixels per degree, against about 23 for a framed view. Norm wrote in the next request: "The fix is not a wider image. It is more narrow ones."

The user raised a worry that shaped the next step. It was like Wile E. Coyote painting a tunnel on a mountain: the images "trick us into thinking there's depth". They added: "lets try to get this approach right because it means a lot of work for greg".

## The turntable trial (DR-093)

DR-093 (b9f3334, 13:22) asked Greg for eight views of Deck Nine from its own eye, with pass and fail criteria stated up front and each view's camera recorded as numbers. It exposed the central problem at once, and Greg caught it with arithmetic. The old comps were compositions, not views from the eye. Deck Nine's View A showed the pod door beside a centred stair, which needs nearly 180 degrees of view. Asked for true views, the generator kept backing the camera away. The first candidate implied a lens of about 138 degrees, or a room about 3.4 times deeper than the real one (e9b6310). Norm's summary: "A camera in the wrong place cannot be calibrated out."

Greg had asked before painting whether the old framing or the true eye should win, and recommended the eye, "accepting that TURN-000 will be much more cramped". Norm set the rule then (7dd5a18, 13:33): "A cramped view that is true is usable; a handsome one that is false is not." A retry prompt that spelled out what must not appear worked (7e173a3, 13:44). It asked for no floor, no ceiling, and door jambs at stated fractions of the frame.

Norm then made a mistake in public. Norm declared the eight-view set a failure, using a table computed from the centre ray alone with every plate hung at the lens Greg had asked for (dbbd89a). Greg challenged the table, and Norm withdrew the verdict (00c2918, 14:05). Half an hour later the user asked why nothing was happening on work Norm had said was Norm's own: "so you say things are pending on you but youre not actually doing anything - why". Norm answered, "Fair. I said it and then didn't do it. Doing it now."

Norm then fitted each plate's real lens by matching vertical edges in the image to the known door-jamb bearings. Five of the six fitted lenses ran from 101.5 to 119.5 degrees (the sixth, a weak fit, came out at 74.5), and hung at a common 110 the set held together (bd6b9e4): "The artwork was never the problem; the hanging was." The caps had also been thrown to about 10^16 metres by a tangent in the maths (b920d0f).

## Seams under the user's eye

The user's first look at the turn found "a kind of "snap"" where the east corridor changed from one painting to the next, and a door that sat closer in one image than in the other. Each report led to a rule in `dashboard/turn.js`, the library that hangs a set of views:

- **Per-view lenses and owned arcs** (d10bb79). The set had been hung at one common lens of 110 degrees, with 50 degrees of overlap between neighbours, so any disagreement was cross-faded into view for half the turn. Now each view is hung at its own fitted lens, owns an arc of 26 degrees outright and fades out over 8. The plain room geometry, which had been showing through the fades (the pod door's lettering appeared ghosted through the painted door), is no longer drawn under a complete set.
- **Seams off the grid** (a30de17). The seams had been on an even grid, which put them exactly on the doors at 90 and 270 degrees.
- **Seams are pushed off openings** (ec7fbc8), by a heavy penalty rather than a ban, because an opening can be wider than the spacing between views. In Norm's words: "Two views of a flat wall that disagree give a soft double image; two views of a DOOR disagree about what the door IS."
- **Exposure levelling** (ec7fbc8). One gain per view is fitted from the overlaps, taking the worst brightness ratio from 2.7:1 down to 1.13:1.

After one solver change the user wrote in the dashboard's "changes needed" box: "its like we lost the 'hanging' fixes we have already done from before". The fixes had been undone by the change, and were restored.

When a seam has nowhere clean to go, the user ruled: "yeah if a doorway is a bad place for a seam then SEND IT TO GREG FOR REWORK (IN THE FUTURE)". `clearance()` now reports such a seam before any image is painted, and the rule became "put a view on every opening" (cba06f2).

The per-room review page `uat.html` (45adc47), with the room's own states as switches, is where all of this is judged.

## Painted states (DR-100)

The review page's door switches changed nothing on screen, because the whole set of views had been painted in one state. The user was clear: "you need to tell greg what artifacts you need and let him deliver it, and then incorporate it. don't report back to me that this is ready for my review until after youve done this."

DR-100 made states into painted variants. A view such as `TURN-270` has variants such as `TURN-270@POD-DOOR-OPEN`, each carrying a condition in the scene language. The base is the default, and the most specific matching variant wins. Only the views a state actually changes need a variant: "a state does not cost a set". Structural changes are painted. Flat additions, such as the ambassador's slime, are drawn by the engine as decals ([Actors and items](actors-and-items.md)).

The pod door was "the first conditional state in the game that actually draws" (7d8e85e, 18:42). All four Deck Nine states drew by 18:56 (167cc90), and Greg's delivery was committed at 19:02 (385f2bc). Later that evening the user asked for lettering like "emergency use only" on the shut pod door. The request (DR-101, 9eb842e) used the source's own words instead, and Greg painted "EMERGENCY ESCAPE POD" into the Deck Nine repaint approved the next morning (2e9c699).

## One brief for all the artwork

That evening the user passed on Greg's list of what a brief should define: view coverage, continuity, conditional states, separate assets and integration evidence. The user asked for every package to be audited against it, keeping usable art and replacing what fails. Norm wrote `ARTWORK-BRIEF.md` and `ARTWORK-AUDIT.md` (264a87e, 21:56). Subagents opened and judged all 128 images in the 51 packages. The verdicts:

| Verdict | Packages |
|---|---|
| ADD VIEWS | 1 |
| GROW | 21 |
| RESTAGE | 21 |
| REDO | 8 |

No room could be hung as it stood. The same evening Norm built `planRing()` and `audit-turns.mjs` (69cc078), which work out from the metadata alone the cheapest set of views that keeps every seam on plain wall. Deck Nine came out at four views of 115 degrees each. Norm also built `review-room.mjs` (836ebfe), which gathers the brief's section-5 evidence from a script rather than from reading a screen. And caps became square, because a wide cap had left a dark band when looking down (bd86df5).

At 22:02 the user picked the pilot: "ok lets do the 4 dorms and 4 sanfacs.... reminder to not involve me unless absolutely necessary". That became DR-107. Two shells cover eight rooms, so it was a cheap cluster to prove a method on.

## Holes fail, complete pictures work

The first method failed within the hour. `stage-canvas.mjs` (70fe4c4) put an accepted seed in the middle of a larger grey canvas and asked the generator to fill the border. The generator drew a new room at its own framing instead. Greg rejected the result: "the deterministic centre is preserved but the generated border follows a different perspective." Norm measured it and could find the seed in the draft at no scale from 0.8 to 1.5; the best correlation was 0.43. Whole-picture clean-up edits, by contrast, kept every edge, at 0.82 and exactly scale 1 (005becf).

The user named the real gap at 22:45: "we haven't yet proved a repeatable method for producing seamless adjoining images. We should establish that with one successful room before scaling up." Norm's reply set the method: "Holes fail... Complete pictures work... So the method has to give the generator complete pictures and never holes."

## Underpaint and restore

`scripts/underpaint.mjs` (6f29ab0, 23:23) is the method in code. It works in four steps:

1. **Underpaint.** Every view shares one eye, so any two views differ only by a rotation. The pixels of the accepted neighbours can therefore be projected exactly into the new frame. Whatever they do not cover is filled with a blockout, a plain render of the room.
2. **Render.** Greg paints over this guide as an ordinary whole-picture edit. The generator is good at that.
3. **Restore.** The tool finds the new painting's true camera, puts the accepted pixels back exactly, and scores the result on three bars: how much of the accepted part held, the band where old meets new, and the join itself.
4. **Look.** Added after the numbers proved not to be enough (see below).

Dorm A's first built ring hung at 23:47. Its lenses measured exactly as hung, its gains came out at 1.000, and its seams scored 1.2 to 2.5, where Deck Nine's had been 8 to 37. Norm wrote: "the ring is the proof the method works." At 23:30 the user had gone to bed: "try to work with greg overnight to get through as many rooms as you can."

## Hardened by failures

Every tool added overnight and the next morning answers a specific failure:

- **Caps held.** Norm had read the seeds' pitch off the painted floor, and it was about 2 degrees wrong, so bunk posts leaned in every view built from them: "HOLD the caps -- please do not render them yet." The fix was `underpaint fit`, which reads a seed's heading from its long lines and its pitch from how its verticals stack (65aafd3).
- **Shared shells.** `through` keeps an edit only inside a doorway, and `mirror` flips a room onto its twin (be02fbf). The brief moved to version 1.1 (b07575e).
- **Joins that pass every number.** On the morning of 13 September three renders passed every bar and still showed joins: a mattress changing colour, a trough broken into blocks. "the numbers are right, the joins are not." `underpaint joins` cuts every join out at full size to be looked at, and brief 1.2 made looking a step (6d05242).
- **Norm's own blockout.** The dorm's west rails stepped at the join in three renders. "the fault was my guide, not your renders." Norm's hand-measured rails were 5 to 8 cm off, so the dorm blockout was re-measured (41b26a8).
- **Seeds from the fabric.** Deck Nine's kept views could not seed the method: a band was missing and an alcove sat 5 degrees off. Norm first gave the wrong distance to the wall, then corrected it. `graybox-view.mjs` now renders the engine's fabric at an exact camera, so Greg paints seeds over the room as built (1adf50a). This became brief 1.3 (05d7a2f).

All eight pilot rooms passed at 09:09 on 13 September (7ad667e). "Of the 48 hung images, 16 were painted; the rest are the same pixels turned, mirrored or edited through a doorway." Deck Nine's repaint (DR-108) was approved at 09:35 (2e9c699). Where two views overlap, the ratio between them now ran 0.996 to 1.005, against 0.94 to 1.07 before. The user accepted Deck Nine at the dashboard gate that afternoon (810594f).

## Outdoors, and seas that rise

DR-109 took the method outside, where there was no fabric to seed from. The parts kit gained open rooms, sea, rock, a winding stair (aec9b63), prism-shaped rooms (59faffa) and a solid stair cut from rock (b1d830f). Each sky room got one sun that sets the key light in every phase (2957d55). Neighbouring rooms had to agree. The Winding Stair was turned to face the Balcony's cliff, with heights taken from the original source (e1c49f1).

The outdoors found bugs the interiors had hidden:

- **The horizon was low.** The Balcony's sea horizon sat 3.3 degrees too low because the engine's far plane stopped at 200 m. It now reaches 40 km, with the sea 30 km out and no fog on it (f372d50).
- **Paintings hung round the floor.** The Winding Stair's horizon bent into peaks at the seams. Norm found the cause: "the engine hung every painting round the room's floor, 1.6 m below the camera, so each view's horizon sat 7.6 degrees low and the views met at an angle. It was in every painted room, hidden wherever seams fall on walls; your open sea showed it." (71fbe11)
- **Ceilings over the sky.** Open-air rooms had been given a ceiling in their caps (5a2f7ac).

Planetfall's sea rises day by day, so the outdoor rooms need state variants for each day. The generator, asked to raise the sea, also repainted fixed rock, and once painted a whole rock face out of the Winding Stair's day-3 view. `underpaint state` now builds a sea-only composite. It takes only the new water, and only where the earlier day already shows sea or where fabric renders at two sea levels say the water rose. `check-states.mjs` flags any variant that changed fixed structure (7654323, 604c0b9).

When the user reviewed the Balcony, they asked for the room itself to flood on day 4; the extra views were approved at 16:01 (ae3007f). The Winding Stair was completed with five sea states at 20:33 (803ad53), after a ghost rock knob was found still in its fabric and removed (2729c00). The Crag was reviewed whole at 19:05 (62efaa5), with the climb up to the Balcony painted in. The Courtyard, rebuilt as a ruin rather than an intact yard (5d74637), was reviewed whole on the morning of 14 September, including its sea states for days 6 to 8.

## Caps

The views straight up and straight down gave more trouble than their size suggests:

- they were thrown to infinity (b920d0f);
- they needed to be square (bd86df5);
- seen at a level gaze, SanFac A's ceiling cap (a 66 m plane drawn as two triangles) came out as one flat colour; caps sometimes drew over the ring; and lamp housings drew over the paintings (41b26a8);
- open-air caps got a ceiling (5a2f7ac).

The Crag's floor seam survived three repaints. Greg wrote: "Imagegen keeps breaking the reflection at same boundary". Norm measured a bright highlight ridge lying exactly on the join and made a candidate that lays the ring back and ramps across it (2f97763). The fix became `underpaint seam`, which mends a ridge on a join, and restore now reports each join's stretches as STEP or RIDGE (both 7654323, 14 September).

## One layout for rooms that see each other

The user's Dorm D verdict was that "there appears to be some confusion about whats in the adjacent room at the south". The glimpse through the doorway did not match the canon, in which the Dorm Corridor crosses and another dorm lies beyond. Greg repainted it through the doorway in three passes (441f9ec), and the user accepted it on 14 September. The lasting fix was structural. `fabric-kalamontee.mjs` (f0f07e4, 14 September) builds the whole Kalamontee living quarters as one layout and cuts each room's fabric from it, so every glimpse through a doorway is the neighbour's real geometry. The Mess Corridor was the first room hung whole on that layout, at 07:22. A matching script for the Lawanda rooms, `fabric-lawanda.mjs`, was written but not yet committed.

## Lighting

Lighting came in three layers:

- **Day phases.** The lighting rig (d10a414, DR-060) made the renderer read each sky room's authored day, dusk and night looks.
- **Interiors.** Nothing in the packages said how an interior was lit, so Greg's fill-plus-fixtures vocabulary got a schema and a reader (be88f13, DR-092).
- **The sun.** One sun per sky room sets the key light in every phase.

None of it reached the paintings. The user found out during review: "crag room time of day ddl does nothing ... actually it seems none of the time of day ddls work" (13 September). The Balcony and the Crag went back with "changes". The reason is in a code comment written for the fix: "A painted view is hung unlit, MeshBasicMaterial, so no light in the scene can reach it -- which is right, because a painting carries its own light, and is why dusk and night changed nothing on screen."

The fix was in progress at 08:00 on 14 September. It was committed at 08:51 (d1f27aa); see the [journal](journal.md).

- `scene/grade.js` applies a per-phase grade inside each painting's own material: exposure, tint, saturation, lift and a pull towards the sky colour, with daylight left exactly as painted.
- `scene/skymatte.js` decides what is sky, so wet rock does not go salmon at dusk.
- The review page gains a lighting panel with sliders and a copy-as-JSON button, in the shape the metadata uses.

## Where the rooms stand (14 September, 08:00)

| Room | State |
|---|---|
| Dorm A, B, C; SanFac A, B, C, D | Accepted by the user, 13 September |
| Dorm D | Accepted, 14 September, after the south glimpse was repainted |
| Deck Nine | Accepted, 13 September (repainted under DR-108) |
| Balcony, Crag | Painted and reviewed whole; sent back by the user because time of day did nothing |
| Winding Stair | Painted with all five sea states; held back until the time-of-day grade lands |
| Courtyard | Reviewed whole with its sea states, to go to the user once the grade lands |
| Mess Corridor | Reviewed whole; waiting for its padlock cutouts |
| Kitchen | Seeds approved; side views 080 and 260 being painted from guides |
| Mess Hall, Dorm Corridor | Fabric built from the shared layout; seeds with Greg |
| Other Kalamontee rooms; Gangway, Deck Eight, Brig | Queued for Greg's metadata |

## What was hard

- **A generator that will not follow.** Greg's image generator could not widen a picture or fill a hole, never hit the lens it was asked for, had no resolution control, and could not write transparency.
- **Old comps were not views.** They could not be hung as they were.
- **Seams.** Snaps, doubled doors, exposure jumps, and seams that fell exactly on doors.
- **Numbers that pass and pictures that fail.** Joins, ridges and structural drift all passed the metrics at least once.
- **Norm's own errors.** A false fail verdict, a wrong seed pitch, a mis-measured blockout, a wrong wall distance, and a rock blamed on the wrong cause. Each was corrected in the record.
- **Engine bugs.** Many were hidden until the art exposed them: caps at infinity, flat caps, paintings hung round the floor, and a far plane at 200 m.
- **State upon state.** Doors and seas multiply the views, and every state has to agree with its base and with the state before it.
- **Lighting a painting.** The lighting was designed for geometry, and a painting ignores it.

## What we built to fix it

- **The plate, per-view lens fitting, owned arcs, seam solving and exposure levelling** (`dashboard/turn.js`), with `scripts/tests/turn.mjs` to hold them.
- **`clearance()` and `planRing()`**, which plan the views around the openings before anyone paints.
- **State variants** keyed `TURN-nnn@STATE`, and **decals** for flat additions.
- **The brief and the audit**, one rulebook for every package.
- **`underpaint.mjs`**, the view-building tool, with the subcommands view, restore, fit, through, mirror, joins, caps, seam and state, and guards against missing views and overwrites.
- **`graybox-view.mjs`**, which renders seeds and blockouts from the engine's own fabric.
- **`review-room.mjs`**, which produces lenses, gains, seams, overlaps, shots, a contact sheet and a switch sheet.
- **`check-states.mjs` and the line and drift checks** in `lib/shots.mjs`.
- **The outdoor parts kit** and **one shared layout** per cluster of rooms.
- **The time-of-day grade** (d1f27aa, 14 September).

Every one of these is listed with its date and commit on [Tools](tools.md).
