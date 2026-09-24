# The Conference Room table

*A subpage of the [journal](journal.md).*

The Conference Room was the hardest room in the port. The original describes "a fairly square room, almost filled by a round conference table" (`source/compone.zil:247`). Between 15 and 19 September that round table was painted in eight rounds, and Norm made four attempts to correct it by arithmetic instead of by brush. It was reported fixed three times: to Greg once and to the user twice. The workflow review of 20 September counted 19 extra rounds on this room's 8 views, more than any other room in the game (`RoomPolishInstructions/WORKFLOW-REVIEW-2026-09-20.md`). On 22 September the user parked it until last and decided the table would be rectangular, with the original's text changed to match. That meant repainting three views and reopening a room that was already accepted, and it made the Rec Area the other room left waiting. On 24 September two of the three long-table repaints were approved.

***The user asked for this to be written up on its own, because it had been a mess.*** Everything below traces to the mailbox (`RoomPolishInstructions/mail/`), the request ledger, the room's metadata, `PLAN-CONFERENCE-ROOM-TABLE.md` and the commits named.

## The round table

### The fault

The room was delivered whole on 15 September and went to the user at 01:29 (bc20f01). The same day it came back: ***to the user, the table was not round but heart-shaped*** (the room's record in `wwwroot/data/room-status.json`). The original agreed with the user, and so did the fabric, the grey blockout the paintings are made from, which builds the table as a 3.6 m disc. The heart was in the paint.

On 17 September Norm worked out where it came from. In the looking-down cap the rim was two arcs: an upper one and, after a step inward, a smaller lobe round the lower left. A disc with a cusp in its outline reads as a heart. He drew the true rim as a dashed circle over the painting and asked Greg for a repaint (mail 20260918-012753-dev-0390).

### Called fixed, twice, on the wrong evidence

Greg delivered that repaint, DOWN R3, at 03:38 on 19 September. Norm registered it at 06:59 and told Greg the table was a circle again. At 07:04 he sent the room to the user (mail 20260919-110433-dev-0652). Four minutes later he withdrew it (mail 20260919-110833-dev-0658). ***The user had replied with a screenshot: to them the table looked exactly the same.*** They were right.

Two mistakes sat under that claim, and both pass every automatic check.

- **The measurement covered part of the object.** The eye stands at [2.3, 1.6, 1.2], south-east of the table, so the looking-down cap frames only bearings 74 to 169 of the rim. The radii Norm quoted as proof were read along that one arc. Making one arc circular says nothing about a circle.
- **The numbers contradicted the claim.** The radii offered as the fix ran 473 to 517 px against a guide circle of 558 px, on their face 41 to 85 px short of the circle they were compared with. Nobody put the two columns side by side.

### The guide itself was wrong

When the rim was measured properly, an older fault appeared. The guide circle Greg had been painting to was computed from the table's centre height, 0.72 m, instead of its top, 0.745 m. The true circle in that cap has its centre at (-106.4, 164.6) px and a radius of 574.0 px, against the (-85, 178) and 558 Greg had been given. He had twice been asked to paint to a circle 16 px too small and 21 px off centre, and marked down for missing it.

Norm then projected the painted rim onto the table-top plane through each view's own camera and read its radius at every bearing. A 3.6 m disc reads 1.80 m everywhere, and the fabric's own render reads 1.755 to 1.795 with the same detector, so 1.80 plus or minus 0.05 is what "round" means here (mail 20260919-113034-dev-0664).

| bearing | 0 | 60 | 100 | 120 | 142 | 160 | 180 | 200 | 320 |
|---|---|---|---|---|---|---|---|---|---|
| painted radius (m) | 1.78 | 1.77 | 1.72 | 1.64 | 1.55 | 1.69 | 1.81 | 1.84 | 1.88 |

That is a bite of up to 0.28 m at bearing 142, with lobes pushed out at 180 to 210 and 320 to 340. The bite sat on the rim nearest the eye, which is why it showed in every looking-down shot.

### Rounds four to eight, in one morning

All of these came between 07:44 and 09:15 on 19 September.

- **R4** (the cap and the 252 view together). The cap moved only 0.02 to 0.03 m. Norm answered with the rim written out as pixel points every 5 degrees (mail 20260919-115928-dev-0669).
- **The cap taken off Greg's plate** (08:03, mail 20260919-120344-dev-0670). Norm computed it instead, scaling Greg's own pixels radially onto the true circle. In a view looking straight down, the rim is an exact circle, so this needs no judgement. It reads 1.79 to 1.80 m at every bearing the cap owns.
- **R5** was asked to pull one arc in by 8 to 14 px and came back pulled in by 50 to 70, the other way out of true.
- **R6** was Norm's: R4 everywhere, with R5's pixels only outside the true rim over bearings 168 to 214. Both are Greg's paint, so nothing was invented.
- **R7** held everything it was asked to hold. The near corner did not move at all: four attempts, four near-identical outlines.
- **R8.** Norm stopped describing a movement and showed a target instead: the fabric's render beside Greg's painting, with the outline to match. Greg matched it, and the outline moved for the first time in five attempts. But it came out faceted, because the fabric draws that table as a fourteen-sided cylinder (`wwwroot/scene/parts.js`). The reference was a polygon and the instruction said to match it. R8 measured further from a circle than R7, so R7 was registered (mail 20260919-135539-dev-0694).

Before asking a fifth time, Norm tried the near corner by arithmetic four ways: a radial scale in the table's plane, reprojecting the whole top from the floor cap, reprojecting a narrow band, and moving the edge outward in one piece. Every one measured correct and looked wrong, and none was kept. The room's metadata lists all four so that nobody tries them again.

### What reframed it

The engine gives each direction to whichever view sees it most centrally, so only one view's rim is on show at any bearing: the 345 view over bearings 0 to 91 and 293 to 359, the looking-down cap over 92 to 152, and the 252 view over 153 to 292. The heart's bite lay almost entirely in the arc the cap owns. That is why fixing the cap mattered far more than its size suggested, and why shortfalls in the other two views showed only where two views cross-fade. The rule written into the room's metadata: read the view that owns a bearing, not an average of the views that frame it.

### Closed, and reopened

***The user decided to stop asking and to register the table as the best available, with what was left written down.*** Norm sent the room back at 10:23 (mail 20260919-142358-dev-0697), saying plainly what was still open: about eight bearings short, the cap and the side view disagreeing by up to 0.245 m where they fade into each other, and a faint tonal step on the table top. ***The user answered with a second screenshot, circling two hard steps in the rim.*** Norm's diagnosis, not a measurement, was that correcting the cap while the ring views stayed where they were had created those steps: before, the cap and the ring were wrong together, and so agreed.

One more fault came out of the user's marked-up screenshot. With the door open, part of the table top was simply missing: the door-open variant still carried pixels from the rejected R5 over bearings 176 to 208, so the table changed shape when the door opened. Norm re-derived the variant from the base everywhere outside the door's own region, so that the two states can no longer drift apart (mail 20260919-152136-dev-0704). The lesson for Norm and Greg was about the hand-off: when the user marks a fault on a picture, Greg gets the marked copy and the clean original together, so he can patch the mark and leave the rest untouched.

***Twice during those rounds the user proposed giving up on the circle and making the table rectangular.*** Norm argued them out of it once, on a review sheet showing the table reading as a circle in every shot it appears in. That sheet did not cover the angle the user was looking from. (These proposals are recorded from the session; they are not in the mailbox or the ledger.)

## The decision to go rectangular

On 22 September, with nearly every other room accepted, ***the user parked the Conference Room until last and asked for a rectangular table instead***. The decisions that followed are in `PLAN-CONFERENCE-ROOM-TABLE.md` and in Norm's note to Greg that evening (mail 20260922-230404-dev-0888).

- **The original's text changes with the picture.** ***The user chose to edit Infocom's text rather than leave it contradicting the painting.*** "Round" became "long" in `compone.zil:247`, and ROUND was dropped from the table's adjectives in `globals.zil`. The world data was re-extracted, a four-line change, and every suite passed (304ab4c2). It is the only edit to the original's text made for the sake of a picture, and it is listed on [Where we left the original](canon-deviations.md).
- **The size.** The first proposal, 2.8 x 4.1 m, did not fit. The eye is 2.3 m east and 1.2 m south of the room's centre, so a long table where the disc stood put a chair 0.43 m from the player, or, turned the other way, a table corner 0.25 m away. Norm searched for the largest table that keeps every corner and chair at least 0.9 m from the eye: 3.0 x 4.1 m, long side north-south, 1.02 m clear. At 12.3 square metres it is larger than the disc's 10.2, so "almost filled by a long conference table" stays true (7dfb1324).
- **The chairs.** ***The user chose three chairs down each long side, knowing that moving the chairs makes it a repaint rather than a table-shaped edit.*** Norm's first plan had the chair rows off-centre, because he read each chair as a point when a chair back turned sideways is 0.45 m long; building the fabric found it, and only the west row moved (304ab4c2).
- **The cost: three pictures.** In every layout tried, the table and chairs fall only in the 252 and 345 views and the looking-down cap. Greg paints those three. The two door-open variants are derived by compute from the new bases, and the other three views are untouched.
- **The glimpses into the room.** Booth 1, accepted on 15 September, looks into the Conference Room through its north doorway and paints the round table in three of its views, about 65,000 px in all. ***The user authorised reopening Booth 1 for this work, and only for this work.*** It is to be rebuilt by compute from the new views where that holds, and then goes back to the user. The Rec Area's view through the open conference door had never been built, because it has to be made from this room's paintings. So the Rec Area waits on the Conference Room, and those were the last two rooms.
- **The round rim's markup is closed, not ignored.** The user's marked-up picture of the round rim repairs a shape that no longer exists.

## The long table

***On 23 September the user unparked the room.*** At 21:22 Norm asked Greg for the three repaints, each over the current registered picture and inside a stated box, with guides rendered from the new fabric (mail 20260924-012244-dev-0910). Greg delivered all three at 22:01 (mail 20260924-020118-design-0832).

On the morning of 24 September Norm reviewed them (mail 20260924-121254-dev-0912):

- **The 345 view: approved.** Taken in through its box, with the structure held at 0.969 and the join clean along all 34 stretches. Booth 1's opening is untouched.
- **The looking-down cap: approved.** Structure held at 0.97, the join clean along all 38 stretches, the slab's corner and the two chairs where the guide puts them.
- **The 252 view: sent back for one fault.** Three chairs were painted down the table's left side, where the room has bare deck plate and the foot of the wall. The table's six chairs are three against the far wall, which Greg painted correctly, and three down the side this camera cannot see. Greg was asked to repaint only that box and to leave the table, the far chairs, the door and the walls exactly as they are.

Greg closed the two approved asks at 08:15 and began the repaint (mail 20260924-121505-design-0834).

## Where it stands (24 September, morning)

- **345 and the looking-down cap** are approved and taken in. Norm registers the room's three new pictures together, so that the table never shows round in one view and long in another.
- **252** is back with Greg for the three chairs.
- **After that**, Norm derives the two door-open variants, rebuilds Booth 1's and the Rec Area's glimpses into the room by compute, and sends the Conference Room, Booth 1 and the Rec Area to the user. They are the last rooms: 107 of 109 are accepted.

## Who did what

Greg did what he was asked in almost every round. He closed a hard seam across the near rim, left the far arc untouched every time he was told to, kept every repaint inside its box, and carried the door-open variant's table pixels unchanged for four rounds. The fault, round after round, was in the instruction: a guide circle computed from the wrong height, a movement described where a target was needed, and then a target of the wrong shape.

## What it teaches

- A measurement that covers part of an object says nothing about the object. One arc of a rim is not a rim.
- Check that a report's own numbers reach the target before repeating its conclusion.
- A reference is only as good as its own geometry. Greg was handed a fourteen-sided polygon and asked for a circle.
- Describing a movement is not the same as showing a target, and showing the wrong target is worse than either.
- Agreement between neighbouring views can matter more than accuracy in one of them.
- When a shape keeps failing, changing the shape can be cheaper than another round. The rectangular table cost three pictures; the round one had cost eight rounds and never came right.
- The user found every one of these faults by looking at the screen while the measures passed. That is the argument for the toggle gate and for the rule that a claim is not a fix until someone has seen it. The same day's other half of that lesson, a review-page tag reported fixed three times, is in the [journal for 19 September](journal.md#19-september-claims-that-were-never-on-the-screen).
