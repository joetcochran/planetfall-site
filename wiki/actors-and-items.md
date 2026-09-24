# Actors and items

![The cast arm in arm, like actors promoting their show: Blather with his clipboard, the ambassador holding a stalk of celery, the rat-ant, the ensign in his mirrored helmet with his mop and Floyd perched on his shoulder, the troll, the grue in a folding director's chair, in a cardigan and reading glasses, going over the script, the triffid, and a grinning man in the microbe costume with its head under his arm, a planet rising behind them. Painted by Greg.](wiki/the-cast.jpg)

A painted room is only a backdrop until the things in it move. The characters come and go, Floyd switches on and off, and the player picks things up and drops them. This page tells how purple and gold boxes became Blather, the ambassador and his slime, and Floyd himself. It covers placement rules, cut-out figures that face the eye, painted variants for switched-off states, overlays laid on the floor, and the padlock that exposed a gap in how authored objects reached the build.

## Boxes on a ring

From the first commit (bd88341, 9 September) the grey box drew every actor as a purple box, 1.7 m tall, and every portable item as a gold box. Loose things stood on a ring round the eye. The user's founding request already had items at its heart: ***clicking an item to pick it up should take it off the screen and put it in the player's inventory***.

## Where things stand in a room

Placement got smarter before anything got a face:

- **Floyd's anchor.** Floyd follows the player into any room, since the original's follow routine has no room test. So every planet room got a conditional anchor for him, clear of exit lanes and clear of the fan where dropped items go (DR-003 and DR-013, approved 11 September).
- **Dropped-item anchors** (DR-045, 8d141b0). The grey box reads each room's dropped-item anchors from its metadata, in drop order, and remembers them across rebuilds. Before this, loose objects fell to a ring whose radius was 0.1 m in Booth 2, so they were drawn at the eye.
- **The ring solver** (DR-046, 3c2c8de). Anything past the last anchor goes to the point on the ring that best clears the anchors in use and every line from the eye to an exit.

One apparent bug from this period was not a bug. On 11 September ***the user wondered whether Floyd had dropped something he should not have, and whether that was a real bug***. Floyd had revealed the card, and the player had taken it out of him, which is faithful: he is an open container you can see into. The fix was to the playtest harness, which now lists a character's things under "Held by a character" (7a0650d).

## Characters as cutouts

Once the painted rooms existed, on 12 September, Greg delivered concept sheets:

- Blather and the ambassador (DR-095);
- Floyd (DR-096);
- the microbe (DR-097);
- the Bio Lab mutants (DR-098);
- a 49-image item library (DR-099).

The user approved the looks. Norm checked each one against the ZIL and sent all five back with canon notes. Blather's prop is an "oversized clipboard", not a notepad. The ambassador needs exactly seven eyes. Floyd was missing his only two canonical traits, being slightly cross-eyed and a lopsided grin, and needed a switched-off pose. And 48 of the 49 item images had no transparency.

Norm then wrote a runtime asset contract (529eedc, 19:09). Each character is one flat cutout that turns to face the eye. Because the eye never moves inside a room, this is exact rather than an approximation. The figure's height is real, its width comes from the picture's own proportions, and its depth is only a footprint for keeping clear of exits. Greg added a rule that stuck: "Keep any physical footprint used for clearance conceptually separate from that displayed width; oversized held props can enlarge the silhouette without enlarging the torso." Floyd was left as the one open exception, since he follows the player and is seen at every bearing; the user later chose a cutout stand-in for him (506684a).

Two engine gaps came to light at the same time. The grey box only ever placed Floyd by name, so every other actor went to the ring. And nothing could state a size, so a four-foot Floyd drew at 1.7 m. Both were fixed in 340a897.

![Every character cutout in one row, to one scale: Blather, the ambassador, Floyd standing, switched off and dying, the rat-ant, troll, grue and triffid standing and then stunned in the fungicide mist, the microbe that towers over them all, and the speck](wiki/characters-cutouts-to-scale.jpg)


## Blather, the ambassador and the slime

At 20:03 on 12 September ***the user asked to try adding Blather next, from what Greg had provided***. Norm cut Blather from the concept sheet and created `data/characters.json` and a `cutout` part (8d0d88f). Norm's first crop cut off Blather's head, because "a head is narrower than a body".

Greg's clean redraw on a plain backdrop could not be used either. The file had a transparency channel, but in Norm's words "every one of the 1,572,864 pixels is 255": fully opaque. The user had already asked Greg for it, and told Norm to make such requests through the ledger in future: ***Norm was free to ask Greg for work like this himself***. With the user's permission to remove the background locally, Greg delivered a file with real transparency before Norm had finished writing DR-104. It was hung that evening (4c01c37, 20:52). Norm cut the ambassador from the sheet too; he remains provisional until Greg's production cutout arrives.

Then the slime. ***The user named the ambassador's slime, still a green square, as the last thing for the evening***. Norm read the source again. The slime is a trail in, a pool under the ambassador and a trail out: "The slime is a route, not a patch" (72c427f). Norm built:

- a `decals` block in the room metadata, each decal with its own condition;
- a `decal` part for patches and a `trail` part for strips along a path on the floor;
- a spot for the ambassador to stand, with the pool under him (15558c2).

Norm also caught an error in the request Norm had written. The departure trail's condition would have drawn it the turn after the ambassador arrived, while he still stood on the pool. It now waits until he has gone and a timer has passed.

Greg's pool and trail went in. Greg's trail tile did not repeat cleanly, so trails now tile mirrored, which makes every join continuous by construction (69cc078). DR-105 was approved at 22:01 (99d968e).

## Items: two kinds

Norm's first item spec treated every item as a billboard seen from 30 to 40 degrees. Greg caught the flaw: a towel or a circuit board seen at that angle cannot be scaled truthfully. So items are split in two (6aa5789):

- **Upright items** stand as cutouts, like characters.
- **Flat items** such as towels, boards, cards and paper lie on the floor as top-down pictures.

In the same commit the ambassador's celery is drawn as part of his cutout rather than as a second box. Greg corrected two more of Norm's claims, one of them that a particular part was a board when it is not, and a recount found the cards had been undercounted by four (0d09c7e).

The brief's audit found movable things painted into the room comps, where they would stay after the player took them: the padlock, the canteen, the can, the ladder, the spools, the boards, the food kit and the towel. Under the brief, these become separate assets.

![Two items as the game draws them: the shuttle access card, the kitchen access card and the laser](wiki/items-cards-and-laser.jpg)


## Floyd

![Floyd, the cutout the game draws](wiki/floyd.jpg)

Floyd arrived on 13 September. ***The user's Dorm A verdict reported that Floyd did not appear when they switched him on in the review page***. Floyd counts as an actor only while he is switched on, so a switched-off Floyd was built as an invisible click target. Anyone a room's design places as an actor now counts as one (941a2e8).

The user took a stand-in for now: ***Floyd more or less worked, but a real painting of him from Greg was still missing***. ***They approved a stand-in for the time being***, and Norm cut the sheet's front figure (506684a). ***The user still saw a solid purple box*** on the Balcony. The browser had kept its old copy of the character list, so the host now tells browsers to re-check every file (35b59a4).

Greg's generator could not produce real transparency. Greg reported: "the robot itself is translucent". Two other attempts had checkerboards painted into the picture. So Norm built `scripts/cutout.mjs` (3178db6), and Greg painted Floyd standing and switched off on flat magenta. The tool:

- keys out the flat backdrop from the border and from seed points;
- keeps the largest connected island;
- drops enclosed pockets of backdrop only when the key colour is strong;
- un-mixes the rim pixels against the figure's own colour.

The first pass left most of the rim pink. With rim un-mixing, tinted rim pixels fell from 6,423 to 3 (db8539d).

The switched-off Floyd is a variant in `characters.json` with the condition "FLOYD without RLANDBIT", written in the same condition language the rooms use. DR-096 was approved at 18:19 to 18:24. It was the first exchange carried over the new mailbox.

## Objects held in place

On 14 September, hanging the Mess Corridor showed that the engine had never read an object's position from the metadata. The room's padlock was authored on the Storage West door's hasp, but a stand-in box lay on the floor by the drop fan. The fix (0a3b8b6) gives a framed room the metadata position, and holds it until the player first handles the object. After that it is loose like anything else. About a dozen packages had authored positions that had been silently ignored, including the Mess Hall canteen, the Infirmary's red spool and medicine bottle, and the Planetary Defense boards.

Norm asked Greg for the padlock's size and three cutouts: closed, open and fused. Greg gave 7 by 10 by 3.5 cm and, at 07:57, the cutouts with real transparency (mail `20260914-115733-design-0058`). At 08:08 they went into `characters.json` as a cutout with open and fused variants (85624f8): the first item drawn as itself rather than as a box.

## What is still open (14 September)

- The ambassador's production cutout (DR-104, part 2).
- The microbe, the mutants and the item library (DR-097 to DR-099) are all reopened.
- There is no general item layer yet: apart from the padlock (85624f8), every item still draws as a box, and the flat-item floor pictures have been specified but not built.
- Greg's `characters/` and `items/` design folders are not tracked in git, so the concept sheets and magenta paintings are not in the repository history.
- Since d1f27aa (08:51), cutouts and slime decals go through the same time-of-day grade as the paintings, because "a figure drawn in daylight stands lit up in a room at night".

## What was hard

- **No authored size or place.** Before 12 September only Floyd had an anchor, and nothing had a size.
- **Hidden figures.** In painted rooms, invisible click targets and depth problems hid actors behind the paintings (45adc47).
- **Cutting from sheets.** Concept sheets have captions, rulers and neighbouring figures. A crop by row width cut off a head, and a ruler ran through Floyd's hand.
- **No transparency.** The generator could not make it. Its output came back opaque, translucent, or with a painted checkerboard.
- **The slime's shape.** It was the wrong shape in the wrong place, and its first timing condition was wrong.
- **Tiles that do not wrap.** The trail's tile did not repeat cleanly, and a retry lost its transparency.
- **A switched-off Floyd is not an actor.** He vanished exactly when the user toggled him.
- **Browser caching** made a working fix look broken.
- **A silent gap.** Package-placed objects never reached the build, and nothing reported it.

## What we built to fix it

- **Placement**: anchors, the ring solver, any authored actor honoured with a size (340a897), and object positions held until handled (0a3b8b6).
- **`characters.json`**, a registry of cutouts with heights, footprints and conditional variants.
- **The `cutout`, `decal` and `trail` parts**, with mirrored tiling and a material that stays an honest green until its picture loads.
- **`cutout.mjs`** and its library, tested on a synthetic figure with a known answer.
- **Review-page switches** for every actor and threshold, so the user can call up the ambassador, Blather or a switched-off Floyd.
- **Re-checked static files** in the host, and tests in `scripts/tests/design.mjs` for each placement rule.
