# The Conference Room table

The Conference Room holds one round table, 3.6 m across, with six chairs round it. Between 15 and 19 September 2026 it took eight rounds of painting, five separate asks on a single corner of it, four attempts to fix it by arithmetic instead of by brush, and three written claims that it was done -- to Greg at 06:59 on the 19th, to the user at 07:04, and to the user again at 10:23. The user answered each of the two they saw with a screenshot showing it was not done. They asked for this to be written up on its own: "make sure the historian includes this whole ordeal as its own article - this has been a mess."

It is here because of what it teaches, not because of its size. Everything below traces to the mailbox (`RoomPolishInstructions/mail/`), the request ledger, and the room's own metadata, which now carries the whole account under a heading that says the room did not measure clean.

## The fault

The room was delivered whole on 15 September. The user rejected it that day with one line, recorded in the dashboard's own record of the room (`wwwroot/data/room-status.json`):

> table is not ciruclar, it is more heart shaped

Canon is on their side. The original's text calls it "a fairly square room, almost filled by a round conference table" (`source/compone.zil:247`), and the fabric -- the grey blockout the paintings are made from -- builds it as a 3.6 m disc (`scripts/fabric-kalamontee.mjs:379`). The heart was invented in the paint.

On 17 September Norm worked out where it came from: in the looking-down cap the rim was two arcs, an upper one and, after a step inward, a smaller lobe round the lower left. A disc with a cusp in its outline reads as a heart. He drew the true rim as a magenta dashed circle over the painting and asked Greg for a repaint (the ledger, 2026-09-17 21:27; mail `20260918-012753-dev-0390`).

## The first time it was called fixed

Greg delivered that repaint, DOWN R3, at 03:38 on 19 September (`20260919-073849-design-0656`). Norm registered it at 06:59 and told Greg "the table is a circle again" (`20260919-105902-dev-0643`). At 07:04 he sent the room to the user: "The table is round... Ready for your acceptance" (`20260919-110433-dev-0652`).

Four minutes later he withdrew it (`20260919-110833-dev-0658`). The user had replied with a screenshot: the table looked exactly the same to them. They were right.

Two mistakes sat under that claim, and both are the kind that pass every automatic check.

**The measurement covered part of the object.** The rim radii Norm had read, and quoted as proof, were taken along the lower-left arc of the looking-down cap. The eye in this room stands at [2.3, 1.6, 1.2], south-east of the table, so that cap frames only bearings 74 to 169 of the rim. Making one arc circular says nothing about a circle. Two of the four level views have no table in frame at all.

**The numbers contradicted the claim they were offered as evidence for.** The radii reported as the fix ran 473 to 517 px, measured against a guide circle of 558 px. On their face they were 41 to 85 px short of the very circle they were being compared with. Nobody put the two columns side by side.

## The third error: the guide itself was wrong

When the rim was finally measured properly, a third fault appeared, older than either. The guide circle Greg had been painting to -- centre (-85, 178) px, radius 558 px -- had been computed from the table box's centre height, 0.72 m, instead of its top surface at 0.745 m. The true figures for that cap are centre (-106.4, 164.6) px, radius 574.0 px. Greg had twice been asked to paint to a circle 16 px too small and 21 px off centre, and had been marked down for missing it.

With the right circle, the real shape came out. Norm reprojected the painted rim onto the table-top plane through each view's own camera and read its radius at every bearing; a 3.6 m circle reads 1.80 m everywhere, and the fabric's own render reads 1.755 to 1.795 with the same detector, so 1.80 plus or minus 0.05 is what "round" costs (`20260919-113034-dev-0664`, 07:30).

| bearing | 0 | 60 | 100 | 120 | 142 | 160 | 180 | 200 | 320 |
|---|---|---|---|---|---|---|---|---|---|
| painted radius (m) | 1.78 | 1.77 | 1.72 | 1.64 | 1.55 | 1.69 | 1.81 | 1.84 | 1.88 |

A bite of up to 0.28 m at bearing 142, spanning bearings 100 to 165, with compensating lobes at 180-210 and 320-340. A heart, and the bite sits on the rim nearest the eye, which is why it showed in every looking-down shot.

## Rounds four to eight

All of these happened in one morning, between 07:44 and 09:15.

- **R4** (DOWN and 252 together). The cap barely moved: 0.02 to 0.03 m better than R3, still 37 to 70 px short from bearing 120 round to 165. The side view moved a long way where Greg had worked. Norm answered with the rim written out as pixel points every 5 degrees (`20260919-115928-dev-0669`).
- **The cap comes off Greg's plate** (08:03, `20260919-120344-dev-0670`). Two passes against the same guide had come back the same. Norm took the cap away and computed it instead, by a radial scale of Greg's own pixels -- his top surface, his drum band, his contact shadow -- onto the true circle. It reads 1.79 to 1.80 m at every bearing it owns. That one worked because the cap looks straight down, so the table's plane is parallel to the image plane and the rim there is an exact circle with no fitting and no judgement.
- **R5** regressed. Asked to pull one arc in by 8 to 14 px, it came back pulled in by 50 to 70, further out of true than the overhang had been and in the opposite direction.
- **R6 was Norm's**, not a round at all: R4 everywhere, except that outside the true rim over bearings 168-214 it takes R5's pixels. Both sides of that edge are Greg's paint, so nothing was invented, and 22,654 px closed the fault without spending another round.
- **R7** held everything it was asked to hold and moved exactly one thing it was not asked to move -- which is to say the corner did not move at all. Four attempts, four near-identical silhouettes.
- **R8**. Norm stopped describing a movement and showed a target: two panels at the same zoom, the fabric's own render above and Greg's painting below, match the outline. Greg matched it. For the first time in five attempts the silhouette moved, 55,842 px, six times R7's change. And it came out a faceted polygon with hard vertices, because the fabric does not draw that table as a circle: `wwwroot/scene/parts.js` builds it with `CylinderGeometry(w / 2, w / 2, h, 14)`, a fourteen-sided cylinder. The reference was a polygon and the instruction said to match it. Measured, R8 sat further from the circle than R7 -- 34 bearings out of tolerance against 22, worst -0.130 m against -0.100 -- so R7 is what was registered (`20260919-135539-dev-0694`).

## The four compute attempts

Before asking Greg a fifth time, Norm tried to do the near corner by arithmetic four ways: a radial scale in the table's own plane, reprojecting the whole table top from the floor cap, reprojecting only a narrow band from it, and translating the edge outward as one piece. Every one measured correct and looked wrong -- the drum face shears into blocks, the texture smears into a wash, the last turns the drum into a staircase. None of the candidates was kept. The room's metadata lists all four so that nobody tries them again.

## The finding that reframed all of it

The engine gives each direction to whichever view sees it most centrally. Only one view's rim is on show at any bearing: TURN-345 over bearings 0-91 and 293-359, the looking-down cap over 92-152, TURN-252 over 153-292. The user's notch lived almost entirely in the arc the cap owns, which is why fixing the cap mattered far more than its area suggested -- and why shortfalls in the other two views never showed, except inside the cross-fade band where two views mix.

The rule that came out of it, written into the room's metadata: do not average the views that frame a bearing; read the owning view. And one arc is never enough on its own.

## How it was closed, and reopened

The user's own call was to stop asking and register the table as best-available with the remainder written down. Norm did that at 09:55, and sent the room back at 10:23 (`20260919-142358-dev-0697`) with the open items stated plainly rather than buried: about eight bearings of 240 still short, worst -0.100 m at bearing 153; the cap and the side view disagreeing by up to 0.245 m across the band where they fade into each other, which a player turning through sees as a soft double edge; and a faint tonal step on the table top where the cap meets the ring.

The user answered with a second screenshot, circling two places where the rim makes a hard step. The working diagnosis -- and it is a diagnosis, not a measurement -- is that those are the two cross-fade seams, and that correcting the cap onto the true circle while the ring views stayed where they were is what created them. Before, the cap and the ring were wrong together, and therefore agreed. The table is open again as this is written. (The second screenshot and the exchange around it are recorded here from the session; the mailbox and the ledger stop at the 10:23 note.)

## Who did what

Greg executed what he was asked in almost every round. He closed a hard seam across the table's near rim that read as a crack, left the far arc untouched every single time he was told to, kept every repaint inside the rectangle he was given, and carried the door-open variant's table pixels identically four rounds running -- the step in this pipeline that most often goes wrong, and which never went wrong here. The fault, round after round, was in the instruction: a guide circle computed from the wrong height, a movement described where a target was needed, and finally a target that was the wrong shape.

Twice the user proposed giving up on the circle and rewriting the table as rectangular. Norm argued them out of it once, on the strength of a review sheet showing the table reading as a circle in every shot it appears in. That evidence did not cover the angle they were actually looking from. (Those two proposals are not in the mailbox or the ledger; they are recorded here from the session.)

## What it teaches

- A measurement that covers part of an object says nothing about the object. One arc of a rim is not a rim.
- Check that a report's own numbers beat the target before repeating its conclusion. The figures quoted as proof of roundness were, on their face, 41 to 85 px short of the circle they were quoted against.
- A reference is only as good as its own geometry. We handed a painter a fourteen-sided polygon and asked for a circle.
- Describing a movement is not the same as showing a target, and showing the wrong target is worse than either.
- Consistency between neighbouring views can matter more than accuracy in one of them. Making the cap correct made the picture worse, because its neighbour stayed where it was.
- The user found every one of these by looking at the screen, while our measures passed. That is the whole argument for the toggle gate and for the rule that a claim is not a fix until someone has seen it.

The same day's journal entry carries the other half of this lesson, a review-page tag reported fixed three times and never once seen working: see [the journal for 19 September](journal.md#2026-09-19-the-third-time-asked-and-never-once-on-the-screen).
