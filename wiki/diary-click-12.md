# Round 12: click-12, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The second milestone](playing-it.md#the-second-milestone-to-the-end-from-the-start), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 12, 12 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the start (Deck Nine, turn 0), in 2 legs
- **Result:** **Won 80 of 80** at turn 963.
- **Commands:** 1,140, with 5 deaths

**About the numbers.** The leg 2 report (line 1073) counts three deaths; the transcript has four in leg 2 (radiation poisoning twice).

The diary below is `playtests/2026-09-12/2026-09-12-click-12.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Planetfall click-only playtest — session `click-12` (2026-09-12)

Blind first-time player, mouse-only. Started with:

```
node scripts/playtest.mjs --session click-12 --new --click
```

Every subsequent move is a number from the printed option list (or `N item` / `N value`
for submenus). I have never played Planetfall and I am not looking anything up.

### Life one: turns 0-17, dead on the Feinstein

I started scrubbing the deck on Deck Nine. The opening paragraph makes a point of
the scrub brush, so my first instinct was to scrub the floor - the brush's "..."
menu (100) offers only *examine* and *drop*. There is no scrub, clean or polish.
Not fatal, but the very first sentence of the game describes an action the click
layer cannot express (friction 3).

Blather turned up on turn 1 and started handing out demerits. His menu (104) has
examine / talk to / salute / attack / listen to, and *salute* was exactly right -
"First right thing you've done today. Only five demerits." That felt good: the
click layer surfaced a verb I would never have guessed to type.

Turn 5 I wandered east to the Reactor Lobby and Blather shoved me back. Worth
noting that the exit numbers 21/22/23 mean different directions in the two rooms
(21 was "go east" on Deck Nine and "go south" in the Reactor Lobby). The preamble
warns about this, but it still means you cannot build any muscle memory for
movement; every room needs re-reading.

Back on Deck Nine the Blow'k-bibben-Gordo ambassador arrived, handed me a
brochure (which turned out to be an ad for Planetfall itself - lovely) and then
*asked me a direct question*: "The ambassador inquires whether you are interested
in a game of Bocci." There is no yes and no no anywhere in the list (friction 1).
He also drops a "piece of celery" which is listed under **In the room** with a
single *examine* option and no *take* (friction 2) - everything else in a room so
far has had a take.

Then I made a beginner's mistake and paid the full price for it. Turn 13: an
explosion, "The door to port slides open," and the exits list quietly changed
`22 go west / in (escape pod bulkhead closed)` to `22 go west / in`. I did not
read that closely enough - I pressed *wait* twice to see what happened next. By
turn 15 the pod bulkhead had clanged shut, by 16 "Too late. The pod's launching
procedure has already begun," and turn 17 killed me. Score 0 of 80.

That is my fault as a player. But two interface things made it worse, and I think
both are real:

- The **escape pod** entry kept offering `29 get in` the whole time, including
  after the bulkhead shut and after the launch sequence had started. The one exit
  line marks its own state - "(escape pod bulkhead closed)" - but the object's
  get-in button never does. I pressed the button that was on screen and it told me
  the bulkhead was closed. (friction 4)
- The death screen ends with "Would you like to restart the game from the
  beginning, restore a saved game position, or end this session of the game?
  (Type RESTART, RESTORE, or QUIT.)" - and the option list underneath it is
  literally `On screen you can: start again with --new`. A mouse-only player is
  dead-ended at the one screen in the game that most needs a button. (friction 5)

Also worth saying plainly: I never once saw a hint that SAVE mattered until the
death message told me so. `5 save` is in the standing button row from turn 0 and
I ignored it. Second life, I will use it.

### Life two: the pod, the ocean, the Courtyard (turns 0-34)

Restarting meant re-running the CLI with `--new`, which a mouse player cannot do.
First thing I did second time round was press `5 save` on turn 0 - and that was
instructive: **the restore button does not exist until you have saved.** `6 restore`
appeared in the standing button row the instant the save succeeded. Sensible, but
it means the button row silently gains an entry mid-game, and it is the one button
you want to know about before you need it.

I then made the same mistake a second time, because I batched several `wait`s
without reading each result, and watched the pod bulkhead shut again on turn 11.
This time I had the save, so I pressed `6 restore` and it worked cleanly - straight
back to turn 0, same room, same numbers. Restore-in-click-mode is solid.

Third attempt I counted the beats: Blather arrives, Blather leaves, the ambassador
may or may not turn up, and on **turn 8** "The door to port slides open" and the
exit line loses its "(escape pod bulkhead closed)" tag. The window is two turns
wide. `29 get in` on the escape pod worked, +3 points, and `25 get in` on the
safety web is exactly the right button to be sitting there. Note that once I was
inside the pod the room list *still* offered `28 examine / 29 get in` for "escape
pod" - the thing I was standing inside. It stayed on the list for the rest of the
pod sequence. (friction 6)

The descent is pure spectacle and the click layer handled it fine: wait, wait,
wait, and the pod lands on turn 23, a panel opens, and `towel` and `survival kit`
appear in the room with take buttons. I saved, got out of the web - the pod
immediately slid off its ledge into the sea - grabbed both, pressed
`22 open escape pod bulkhead` ("cold ocean water rushes in!"), and `32 go up / out`.

Underwater was the first room where the exit labels really earned their keep:
`21 go north, Underwater · 22 go south, Underwater · 23 go west, Underwater ·
24 go up · 25 go down, Underwater`. Four exits are annotated with the destination
name and one is not - and the unlabelled one is the one that gets you out. I read
that as "up is somewhere new" and it was: the Crag, +3, score 6.

From there it is a straight climb: Crag, Balcony (a plaque in phonetic corrupted
Galalingua - "SEENIK VISTA ... Xis stuneeng vuu uf xee Kalamontee Valee"), Winding
Stair, Courtyard. `111 open` on the survival kit revealed three blobs of goo, each
with its own `eat` button right there in the carried list, which is a genuinely
nice touch - I did not have to go hunting for a verb.

One thing I like a lot so far: the carried-items block nests. `Patrol uniform ...
in it: ID card` and `survival kit ... in it: blob of red goo (113, 114 eat)`. I
can see what is inside what without opening anything.

### The complex: Courtyard to Systems Monitors (turns 34-86)

With the pod gone I started mapping. Courtyard -> Plain Hall -> Rec Area -> Rec
Corridor, then dorms and sanitary facilities off it in pairs, then Mess Corridor,
Dorm Corridor, and a very long walk east to a Corridor Junction and an Elevator
Lobby. Four locked things so far and I cannot open any of them:

- **Rec Area**: a door with a combination dial, `27 set to a number <value>`,
  range 0-1000. The two-number form works fine (I have not found the combination
  yet so I have not used it in anger), and I like that the interface tells me the
  range when I examine the dial.
- **Mess Corridor**: a small north door hooked with a steel padlock. The padlock's
  only option is `27 examine`, which tells me it has a keyhole on its underside.
  There is no `unlock` and no `open padlock` - presumably one appears when I find
  a key, the same way the ID card's slot action did.
- **Mess Hall**: a door with a slot beside it.
- **Both elevators**: Up/Down buttons and a narrow slot. `push down button` gives
  "Nothing happens. The slot beside the buttons stays dark."
- **Booth 2** (a teleport booth with buttons for 1 and 3): "Teleportaashun buux
  not aktivaatid."

The single best thing the click layer has done so far happened in the Mess Hall.
The room description mentions "a small slot" and, unprompted, a **new action
appeared on my carried ID card**: `119 slide through slot`. I would never have
typed "put id card in slot" as a first-timer; here it was just sitting in my
inventory list the moment I entered a room with a slot in it. It even handled the
plumbing for me - "(You take the ID card out of the Patrol uniform first.)" The
card is the wrong one ("Inkorekt awtharazaashun kard...akses deeniid") but the
*interface* did its job perfectly. Same trick in both elevators.

A second good one: pushing the blue button in the Elevator Lobby added
`12 wait for the elevator` to the standing button row, which then waited the right
number of turns and stopped when the door opened. That is a genuinely thoughtful
piece of design - it turns "wait. wait. wait." into one click and it does not
overshoot.

And a third: on turn 81 I got the hunger warning and the button row grew
`11 eat the blob of red goo`. The game told me what I needed and put the exact
action one click away. `4 diagnose` then gave me a real number - "about 14 hours
longer without food or drink" - plus the useful note that those are chronometer
hours, not turns, which matters because the walk east down the Dorm Corridor ate
*three hours* in one move.

Two navigation notes. First, the exit lines learn: once you have been somewhere,
the exit shows its destination (`22 go south, Corridor Junction`), and an exit
with no name attached is somewhere you have not been. I started using that as my
"unexplored" marker and it works well. Second, the warning in the preamble about
numbers being per-room is real and it bit me: I queued `23` meaning "go east" from
the Rec Corridor, but I was actually standing in Dorm A, where 23 is "examine
bed". Nothing was lost, but in a real GUI I would have been clicking a button in
a fixed place and getting a different verb. (friction 7)

Currently in Systems Monitors, where a wall of screens tells me LIIBREREE,
REEAKTURZ and LIIF SUPORT are green but PLANATEREE DEFENS, PLANATEREE KORS
KUNTROOL, KUMUUNIKAASHUNZ and PRAJEKT KUNTROOL are broken. So that is the job.
Score 6, evening of day 1.

### Storage, the reactor, and Floyd (turns 86-131)

South of the Corridor Junction is a whole mechanical wing: Mech Corridor North /
Mech Corridor / Mech Corridor South, with Storage East, the Physical Plant,
Reactor Control, the Machine Shop, the Robot Shop and the Tool Room hanging off
it. This is where the click layer started to strain.

**Storage East** has an oil can and a cardboard box containing a cracked
seventeen-centimetre fromitz board, a B-series megafuse, a K-series megafuse and a
good ninety-ohm bedistor. `8 take all` got me the oil can and then stopped:
"cardboard box: Your load is too heavy. (For the cardboard box: dropping the
survival kit would make enough room.)" What followed was about fourteen moves of
pure inventory management - take a part, watch a different part slip out of my
arms ("Oh, no. The K-series megafuse slips from your arms while taking the good
ninety-ohm bedistor and both tumble to the ground"), drop the scrub brush, put
things into the box one at a time, put my ID card back inside my uniform to free a
hand, and finally lift the box with everything in it. (frictions 8, 9, 10)

The specific click-layer problem is that **`put in...` only lists things you are
carrying**. So there is no way to move an object from the floor into a box you are
holding in one step: you must take it - which may make you drop something - and
only then put it. In a typed game you would type "put fuse in box" and the parser
would do the implicit take. Here the option simply is not offered. (friction 10)

I will say the *messages* are excellent: every failure told me exactly which item
to drop to make room. That is more help than the original game would have given.

**Reactor Control** has a button that opens a reactor elevator (works), a
diagram I cannot read, and a dark stairway down. I went down it and got
"It is pitch black. You might be eaten by a grue." - and the option list still
showed me `21 go up, Reactor Control`, which is the single most useful thing a
click layer can do in a dark room. In a typed game a first-timer dies there
guessing directions. I walked straight back out.

Then the **Robot Shop**, and the best moment of the leg. `25 turn on` the
multiple-purpose robot: +2 points, "a faint hum from somewhere inside". `24 search`
it: +1 and a magnetic-striped card embossed "Loowur Elavaatur Akses Kard". Two
turns later, while I was in the Tool Room, he came bounding in: "Hi! You turn Floyd
on? Be Floyd's friend, yes?"

Floyd arrives with a *rich* menu, which is exactly what I would have wanted and
would never have discovered by typing:

```
Floyd: 138 ... · 139 turn off · 140 throw at... · 141 ask to follow you ·
       142 ask to go northeast · 143 ask to go east · 144 ask about...
```

`ask to follow you`, per-direction `ask to go <dir>`, and an `ask about...` topic
list. That is a companion NPC made legible. Note the per-direction entries are
generated from the room's actual exits, so they will renumber constantly, but they
are at least always correct for where I am standing.

Score 9, night of day 1, standing in the Tool Room looking at a glass flask, a
U-shaped metal bar, wide-nosed pliers, and an "Akmee Portabul Laazur" with an old
battery in it and its own `36 set to a number <value>` dial. I have a light source
and probably a pry bar for that padlock. I am also out of hands.

### Down the red elevator with Floyd (turns 131-158)

Two lovely warnings in a row in the Tool Room. First, `take curved metal bar`:
"The curved metal bar swings toward the lower elevator access card and tugs at it:
the bar is a strong magnet. Carried together any longer, it will smear the card's
magnetic stripe." That is the game telling a blind player, in advance, that it is
about to destroy the item he just earned points for. I dropped the bar. Second,
`106 put in...` on my uniform offered only "lower elevator access card" - the
uniform pocket takes cards and not towels, and the list said so rather than
letting me try and fail.

I did have to abandon a lot of kit. The Tool Room is now my stash: cardboard box
(fromitz board, both megafuses, bedistor), oil can, towel, glass flask, magnet bar.
I am carrying the laser (with its old battery and its own `149 set to a number
<value>` dial), the pliers, the canteen, the survival kit and the access card, and
that is my limit.

Floyd is a delight and the click layer serves him well. His movement suggestions
regenerate per room (`153 ask to go north`, `161 ask to go out`, and so on), and
`144 ask about...` opens a topic list. The topics are exactly the objects in scope -
"Ask Floyd about: Floyd, yourself, ID card, survival kit, canteen, ... shelf" - so
you can ask him about a shelf but not about the complex, the Kalamontee, the
shuttle, or what he remembers. For a game whose whole emotional weight is this
robot, being able to ask him about *things* but not about *anything* is a real
limit of the menu approach. (friction 12)

Downstairs: the access card slid through the Lower Elevator slot ("Elevator
enabled"), `28 push down button`, then `12 wait for the elevator` - again a single
click that waits exactly the right number of turns. Out into a Waiting Area, east
to the Kalamontee Platform (+4, score 13) and a shuttle car named Alfie with
control cabins at both ends. Both cabins have a slot, a lever (push / pull /
center) and a display reading 0. My card is rejected and the lever says "Shuttle
controls are not currently activated," so something upstairs has to be switched on
first. Sensible; noted.

The lever is a good example of the click layer working: `24 push · 25 pull ·
26 center` is a complete model of a three-position lever with no guessing about
whether the verb is "move", "set" or "pull".

### Day one ends: the padlock, and sleeping (turns 158-198)

Back up the red elevator and the long three-hour walk west. In the Mess Corridor
the laser grew a new option the moment I arrived with it: `164 shoot padlock`.
That is exactly the affordance I needed - I had already worked out that the laser
was probably for cutting, but I would not have known the game accepted "shoot
padlock" as a phrasing. It scored **+2** on the first shot ("The laser emits a
narrow blue beam of light which strikes the padlock. The padlock grows a bit warm,
but nothing else happens"), so it is the right idea with the wrong power.

The dial: `149 set to a number <value>`. I guessed 100 and got a clean, informative
refusal - "The dial can only be set from 1 to 6." Setting 6 gives a violet beam and
the same warm padlock. The laser holds an *old battery*, so I assume I need a fresh
one. I have not found one. That is where I am stuck.

I tried the pliers on the padlock and there is nothing to try: the pliers' only
entry is `151 ...` (examine / drop), and standing next to a padlock with a keyhole
adds no cut / pry / unlock option to anything. Same for the magnet bar back in the
Tool Room. So the padlock has exactly one expressible attack in the click layer,
and it is underpowered. (friction 13)

Two other dead ends, for the record: the Mess Hall door slot rejects both my cards,
the Rec Area combination dial wants a number between 0 and 1000 that I have no
source for, the Upper Elevator wants a card I do not have, Booth 2 says
"Teleportaashun buux not aktivaatid", and the Admin Corridor rift is "too wide to
jump across."

Sleep was handled beautifully. At turn 176 the warning fired and `10 sleep` appeared
in the standing button row. Pressing it in the wrong place gave me a *map*:
"Civilized members of society usually sleep in beds. The dormitories have bunks:
Dorms C and D off the Dorm Corridor, Dorms A and B off the Rec Corridor." Then
`24 get in` the bed, `10 sleep`, three waits, and SEPTEM 7, 11344.

One wrinkle on waking: "While you slept, the things you were carrying slipped to the
floor beside you," and the floor copies of my possessions lost their contextual
verbs. The goo blobs, which read `115 ... , 116 eat` while carried, read only
`35 examine` on the floor - there is no way to eat a blob you are not holding, and
nothing tells you that taking it first is the fix. `8 take all` restored everything
and the eat buttons came back. (friction 14)

Small nice thing on waking hungry: the suggestion button read
`11 eat the blob of brown goo (starving!)` - the parenthetical urgency marker is a
good touch.

### Day two: the key, and a correction (turns 199-226)

I owe the click layer an apology. In the Admin Corridor South, `24 examine crevice`
turned up "a shiny steel key!", `26 take` gave "Either the crevice is too narrow,
or your fingers are too large," and I was carrying a pair of wide-nosed pliers. The
pliers offered nothing, the key offered nothing, and I filed that as a High-severity
"no way to use one object on another."

That was wrong, and I have corrected friction row 15 rather than deleting it. The
answer was the **curved metal bar**, which the game had already told me was a strong
magnet when it tried to wipe my access card. I walked back to the Tool Room, dropped
both cards (so the magnet could not smear them), picked up the bar, walked back -
and the key's entry had silently grown a third option:

```
key: 25 examine · 26 take · 27 take with magnet (new)
```

So the layer *does* synthesise tool-specific actions from what you are carrying.
That is very good design and it is the single most important thing I have learned
this leg. What remains true, and much smaller, is that carrying the *wrong* tool
gives you no signal that a tool is wanted at all - the pliers just sit there inert,
looking exactly as useful as the magnet would have if I had left it behind.

The card-and-magnet dance is worth calling out on its own, though, because it is
the click layer's weakest moment in a different way: I had to make two round trips
through six rooms because I could not carry the magnet and the card at once and
there was no way to hand either to Floyd, who was following me the whole time.

Also on turn 221 I got "You notice that you feel a bit weak and slightly flushed,
but you're not sure why," and `4 diagnose` now says "You are a bit sick and
feverish." So there is a disease clock running as well as hunger and sleep. I have
no medicine and no idea where to find any. The key is presumably for the padlock
three hours' walk west.

### Across the rift: cards, a ladder, and a lot of walking (turns 229-269)

The key unlocked the padlock the moment I was standing next to it holding it -
`28 unlock with key` appeared on the padlock, then `29 take` to lift it off the
hasp, then `22 open door`. (I have corrected friction row 13: the padlock was
never a dead end, I just did not have the key yet.) Behind it, **Storage West**,
+4, score 19: a tin of "Spam and Egz" and a heavy-duty extendable ladder.

The tin is a nice little trap. `26 open` gives "You certainly can't open it with
your hands, and you don't seem to have found a can opener yet," and the laser is
too weak to cut it. Worth noting how I found that out, because it is a real
click-layer bug-shaped thing: `147 shoot something...` lists only objects **in the
room**, not objects you are carrying. I had to put the tin on the floor before the
laser would accept it as a target. (friction 17)

The ladder is where the carry limit stops being a nuisance and becomes a design
problem. `28 take ladder` -> "Your load is too heavy. You'd have to drop the laser,
the survival kit, the tin can, the canteen and the curved metal bar first." The
ladder is a one-item-only load, the rift it is for is a three-hour walk away, and
Floyd - who was standing right there the whole time - cannot be given anything to
carry. So the click-only route is: `20 drop all`, take the ladder, walk east for
three hours with nothing, and come back later for your food and your light source.
(friction 18)

The bridging itself was a small delight, though, and shows the layer at its best.
The ladder in hand offers examine / drop / **open**; `open` while holding it says
"You couldn't possibly extend the ladder while you're holding it"; drop it, `open`
it - "The ladder extends to a length of around eight meters" - and a brand new
option appears on the object:

```
ladder: 26 examine · 29 close · 30 put across rift (new)
```

Three clicks, no guessed phrasings, and each step's failure message told me what to
do next. `21 go north` across the swaying ladder, +4, **score 23**.

North of the rift: Admin Corridor North, with Administrative Offices west, a Plan
Room east and Transportation Supply north. The small office desk held a **kitchen
access card** and an **upper elevator access card**; the large office desk held a
**shuttle access card**. +1 each, score 26 - and every one of those unlocks
something I had already bounced off. Floyd wandered off exploring on his own around
here, which I assume is the game being ominous.

Transportation Supply is pitch black and I have no light (my laser is three hours
west in Storage West). When the hunger warning fired there, the nudge line read
"There is still goo in the survival kit you left in Storage West" - the game
tracking where I abandoned my food and telling me. That is remarkably kind.

Score 26, day two morning, sick and hungry, carrying nothing but three cards.

### The tower, and food at last (turns 270-324)

The upper elevator card worked exactly like the lower one - `182 slide through
slot`, `27 push up`, `12 wait for the elevator` - and delivered me to the **Tower
Core**, +4, score 30. Off it: an Observation Deck (the island, and another island
twenty kilometres east), a Comm Room, and a spiral stair up to a Helipad with a
rusted helicopter on it.

The Comm Room is the plot. `24 push glowing button` plays the Feinstein's last
transmission, cut off by an explosion. `27 read screen` gives the outgoing message
this planet has been repeating: "Planitwiid plaag haz struk entiir popyuulaashun.
Tiim iz kritikul. Eemurjensee asistins reekwestid." The send console has a
"Malfunkshun in Sendeeng Kuulint Sistum", a funnel-shaped hole marked "Kuulint
Sistum Manyuuwul Oovuriid", and an enunciator panel of coloured lights - red, blue,
green, yellow, gray, brown, black - with the **yellow** one flashing. Those are
exactly the colours of the chemical dispenser buttons in the Machine Shop
("KUULINTS 1-4" red/blue/green/yellow, "KATALISTS 1-3" gray/brown/black). So: make
yellow coolant in the glass flask, carry it up the tower, pour it in the funnel. I
did not have the turns left to make that round trip.

The helicopter wants an **orange key** I have not found (`28 unlock` gives "But you
don't have the orange key!"). Transportation Supply is pitch dark. The Rec Area
combination is still unknown; I tested the value-entry flow with `27 541` ("The
dial is now set to 541") and the door politely told me to keep guessing.

What I did fix was starvation. The kitchen access card opened the Mess Hall's south
door (+4, score 34) onto a "Hii Prooteen Likwid Dispensur" with an **octagonal**
niche - and the canteen I picked up on day one is described as octagonal. `27 put
in... canteen` gave "The canteen fits snugly into the octagonal niche", `30 push
button` gave "The canteen fills almost to the brim." The liquid then appeared
nested inside the canteen in my inventory with its own `186 drink` button. No
guessing at any point; the shape match was in the prose and the button was where it
should be.

I am still "a bit sick and feverish" and have no idea what to do about it. That is
where I ran out of leg: score 34 of 80, afternoon of day two, alive, well-fed,
standing in the Rec Area in front of a combination lock.

### Report

**Where I got to.** Two lives. The first ended at turn 17 on Deck Nine, score 0,
because I missed the escape pod. The second ran to turn 324 - afternoon of SEPTEM 7,
day two - and ended alive and well-fed in the Rec Area with **score 34 out of 80**,
about 330 commands played, every one of them a number from the on-screen list. I
never typed a phrase to get past anything, so the click layer did not fail outright
at any point in this leg.

**What I opened.** Escape pod and the swim up (+3, +3), Floyd switched on and
searched (+2, +1), the lower elevator and the Kalamontee shuttle platform (+4), the
padlocked Storage West (+4), the ladder across the rift and the administrative wing
(+4, +1, +1, +1), the Upper Elevator and Tower Core (+4), the Kitchen (+4), plus +2
for shooting the padlock with the laser.

**What stopped me.** Four locks I cannot pick and one illness:

- the Rec Area combination dial (0-1000, no source for the number found);
- the helicopter's orange key;
- Transportation Supply and the Reactor Access Stairs, both pitch dark - my only
  candidate light is a laser with an old battery;
- the Comm Room coolant puzzle, which I solved *intellectually* (the enunciator's
  flashing yellow light matches the yellow "KUULINT" button on the Machine Shop
  dispenser, and there is a glass flask in the Tool Room) but which needs a trip
  across the whole map that I did not have turns for;
- and a fever that started on turn 221 and that nothing I have found addresses.

**What the click interface did well.** More than I expected, and the single most
important thing is that it *synthesises actions from what you are carrying and where
you are standing*. The examples that made this leg playable:

- `119 slide through slot` appearing on my ID card the moment I walked into a room
  with a card slot - including the implicit "(You take the ID card out of the Patrol
  uniform first.)";
- `27 take with magnet` appearing on a key in a crevice, but only while I held the
  magnet bar;
- `28 unlock with key` appearing on the padlock, but only while I held the key;
- `30 put across rift` appearing on the ladder, but only after I dropped it and
  extended it;
- `164 shoot padlock`, `134 put under spout`, `27 put in... canteen`.

Second, the **suggestion buttons** in the standing row: `11 eat the blob of red goo`
when hungry (with `(starving!)` appended when it got urgent), `10 sleep` when tired,
`12 wait for the elevator` after pushing a call button - which waits exactly as long
as needed and stops on arrival. Third, the **failure messages are unusually
generous**: every over-capacity take names the item to drop, sleeping in the wrong
place lists which dorms have bunks, and the hunger nudge said "There is still goo in
the survival kit you left in Storage West" - the game remembering where I abandoned
my food. Fourth, **exit labels learn**: once visited, an exit shows its destination,
so an unlabelled exit is a reliable "unexplored" marker. Fifth, in a dark room the
exit you came in by is still listed, which is the difference between a scare and a
death.

### Verdict

**Could a first-time mouse-only player finish this?** Most of the way, yes - and
much further than I expected before I started. Everything I actually solved, I
solved by reading the list. But I do not think a mouse-only player finishes it, for
one structural reason: **the interface can express single-object actions and
game-authored tool pairings, but it cannot express an idea the author did not
anticipate.** The whole click layer is a lookup of "what does the game already know
you can do with this". That is fine while the puzzles are the ones the game pre-wired.
It is fatal the moment you need to combine two things in a way nobody scripted, or
say something to Floyd that is not a noun in the room.

Three changes that would most improve it:

1. **Give Floyd a "give" and an "ask to carry / ask to get".** The carry limit is the
   dominant cost of the whole leg - I made three separate multi-room round trips
   purely to move objects, and the ladder had to travel alone for three hours of game
   time while a robot with cargo compartments walked beside me. One `give to Floyd`
   button would remove most of that, and it would make Floyd feel like a companion
   rather than a subscription to ambient dialogue.
2. **Make carried objects legal targets of carried tools.** `147 shoot something...`
   listed only things in the room; I had to put a tin can on the floor to shoot it.
   Whatever builds that target list should union the inventory with the room.
3. **Mark buttons the world state has already closed off, and give the death screen
   buttons.** `29 get in` on the escape pod stayed live after the bulkhead shut and
   after the launch sequence had started - the exit line knows how to say "(escape pod
   bulkhead closed)" and the object entry should too. And the death screen says "Type
   RESTART, RESTORE, or QUIT" while offering the mouse player nothing at all; that is
   the one screen where a dead end is unrecoverable.

A smaller fourth, if there is room: the option list reaches forty-plus entries in a
room like the Tool Room and is reprinted whole every turn. Grouping or collapsing the
never-useful `examine` entries would make it scannable.

### Leg 2

> **Note from the session that ran these testers, not from a tester.** Leg 2 was attempted twice. The first attempt
> played from turn 325 to about turn 778 -- some 450 commands -- and was then killed by an API outage. It had filed
> friction rows as it went (rows 26-31 are what survive of it) but had written no narrative, so that stretch exists
> otherwise only in the raw transcript (`scripts/out/playtest/click-12-transcript.txt`). The inherited-state notes
> just below were written by that first attempt from leg 1's ending, which is why they describe the Rec Area at turn
> 325 rather than the strip at turn 778, where the second attempt found itself. Reconstructed from the transcript,
> the missing stretch scored: +6, +4, +6, +6, +2, +1 -- 34 to 63 -- through the Rec Area combination door, the
> shuttle to Lawanda, and into the miniaturised world. The second attempt played from there to the win. The typed
> diary of this round carries the same kind of note for the same reason. Round thirteen's prompts should have
> testers write before they play, not only every 40-60 commands.

I am picking this session up from the previous tester. Reading their diary back, the
state I inherit is:

- **Turn 325**, afternoon of SEPTEM 7 (day two), **score 34 of 80**, alive.
- Standing in the **Rec Area**, in front of the combination door, dial set to 541.
- Carrying: chronometer (worn), Patrol uniform (worn), survival kit, canteen with a
  quantity of protein-rich liquid in it, and three cards - kitchen, upper elevator,
  shuttle.
- Sick: "a bit sick and feverish" since turn 221, no medicine found.
- Stashed: the Tool Room holds the cardboard box (fromitz board, two megafuses,
  bedistor), oil can, towel, glass flask, magnet bar, pliers; Storage West holds the
  Acme laser with its old battery.
- Floyd is switched on and wandering somewhere.
- Open problems: the Rec Area combination (0-1000, no source), the helicopter's
  orange key, two pitch-dark rooms (Transportation Supply, Reactor Access Stairs),
  the Comm Room coolant puzzle (flask + yellow KUULINT from the Machine Shop
  dispenser + the funnel in the Comm Room), the shuttle (I now have a shuttle access
  card I have not tried), and the fever.

My plan for this leg, in order: try the shuttle card, do the coolant round trip,
hunt for a battery and something medicinal, and keep reading every option list in
full.

#### The coolant, first try (turns 325-392)

I started where leg 1 stopped, in the Rec Area, and the first thing I did was press
Floyd's `144 ask about…`. That produced a small correction to leg 1's friction 12
straight away: the topic list is **not** purely nouns in the room. Sitting at the end
of "Floyd, yourself, survival kit, canteen, ... combination dial" was **Lazarus**, a
name I had never seen anywhere in the game. `144 Lazarus` got "Floyd's lower lip
quivers. 'Lazarus was Floyd's best friend.' He doesn't want to talk about it any
more." So the menu does carry at least one piece of pure plot, and it is the only way
a click player would ever learn that name. I have amended row 12 rather than deleted
it: the ceiling is real, but it is not quite as low as leg 1 said.

Then the errand. My predecessor had worked out the coolant puzzle intellectually but
never had the turns to run it, so that was my opening move: Rec Corridor, Mess
Corridor, a detour into Storage West to pick the laser back up, the three-hour walk
east, and south into the Mech wing for the glass flask.

The carry limit bit immediately and in a way I want to record precisely, because it
is worse in click mode than in prose. `24 take glass flask` answered "Oh, no. The
laser slips from your arms while taking the glass flask and both tumble to the
ground" - and **the turn counter did not advance**. The take simply did not happen.
I had queued my next move, walked into the Machine Shop, and only then noticed I had
neither the laser nor the flask. Leg 1's row 8 covers the juggling; what I would add
is that a failed take looks almost identical to a successful one in a list that is
reprinted whole every turn.

The dispenser itself was a pleasure. `188 put under spout` appeared on the flask the
moment I walked in holding it, `32 push yellow button` filled it, and the fluid
became a nested entry inside the flask in my inventory. I pushed the gray catalyst
button to see what a second dose would do and got a clean, sensible refusal -
"Another dose of the chemical fluid pours out of the spout, splashes over the
already-full flask, spills onto the floor, and dries up." No damage, and I learned
the flask holds one dose.

The trip up the tower is eleven moves each way. `190 pour something…` in the Comm
Room listed "funnel-shaped hole, communications receive console, glowing button,
communication send console, screen, light", the funnel first, and pouring it in gave
"The lights on the enunciator panel blink rapidly and all go off except one, a blue
light." So it is a two-dose puzzle, and the second dose is a full round trip: down
the elevator, west, four rooms south, fill with blue, and all the way back. Twenty-two
clicks to carry one flask of blue liquid. Then: "the coolant system warning light goes
off, and another flashes, indicating that the help message is now being sent."
**+6 points, score 40.**

Two things about the pour verb. First, when there is exactly one candidate in a room
the layer writes it out in full - `193 pour on stairway` in the Tower Core,
`191 pour on blue button · 192 pour on red button` in the Elevator Lobby - and those
are nonsense. Pouring reactor coolant on an elevator call button is offered with
exactly the same prominence as the pour that solves the puzzle (friction 22). Second,
and better: the entry vanishes entirely in a room with nothing pourable-on, so an
empty corridor stays clean.

Small good thing on the way: the hunger warning fired in the elevator and the
standing row grew `11 drink the quantity of protein-rich liquid`, naming the exact
object. Drinking it also emptied my canteen, which I noticed at once as a second
container I could carry chemicals in - the inventory showing `canteen: 120 … · 121
put in…` where it had been showing nested contents is a clear enough signal.

#### The admin wing, and a shuttle that keeps office hours (turns 393-432)

With comms green on the Systems Monitors wall (KUMUUNIKAASHUNZ has flipped; PLANATEREE
DEFENS, PLANATEREE KORS KUNTROOL and PRAJEKT KUNTROOL are still red) I went looking
for the next thread. The Plan Room is the best single piece of information in the
game so far and it is pure scenery: two wall maps, "Kalamontee Kompleks" with a "Yuu
ar heer" arrow, and "Lawanda Kompleks" showing two installations, one buried deep
underground. That is where the shuttle goes.

Transportation Supply is still pitch black, and it produced my best new finding.
Floyd followed me in - the game printed ">> Floyd follows you." - and then the option
list showed **nothing but `21 go south / out`**. No Characters block, no Floyd. In a
typed game I could still say "floyd, turn on your light" and find out whether that
does anything. In click mode a companion I cannot see is a companion I cannot address
at all (friction 23). I backed out.

Then down the red elevator to the shuttle, because leg 1 had found a shuttle access
card after last trying the shuttle. `183 slide through slot` in Alfie Control East
gave the most helpful refusal I have had all game: "using the shuttle car during the
evening hours requires special authorization... the shuttle runs each day until 6000
on the standard chronometer, and that service resumes the following morning." It was
6419. So the shuttle is a timetable, not a lock, and I now know exactly what to do:
sleep, and come back before 6000.

#### Night, morning, and the ride to Lawanda (turns 433-540)

The evening went on housekeeping. I swept the mechanical wing for a light source -
Physical Plant (scenery only), Robot Shop ("components of disassembled robots, beyond
repair"), Storage East (empty but for the scrub brush leg 1 abandoned there) - and
found nothing. The Reactor Elevator opens with a button but its slot stays dark and
both of my cards got "Inkorekt awtharazaashun kard". So the reactor, like
Transportation Supply, is still shut to me.

One nice thing there: Reactor Control offers `24 go down` into the dark stairway
**and** Floyd standing beside me offers `170 ask to go down`. I can send the robot
somewhere I can't see. I didn't dare, but the option existing is the click layer
being more expressive than I expected.

Sleep is handled entirely by the game's clock: there is no `10 sleep` button until
the game decides you are tired, so a player who wants to skip to the morning shuttle
just walks to a bunk and waits. `24 get in` the bed gave "Ahhh...the bed is soft and
comfortable. You should be asleep in short order," one `3 wait`, and SEPTEM 8.

And a trap sprang. "While you slept, the things you were carrying slipped to the
floor beside you. **The open canteen spilled its liquid across the floor.**" I had
walked most of the map to fill that canteen. The canteen's list had said `34 close`
the whole time and I had no reason to press it (friction 24). Second time round I
filled it, pressed close - and then the *next* hunger warning arrived with no
`11 drink…` button at all, because closing a container hides its contents from the
list and kills the suggestion (friction 25). The warning even says "A drink from your
canteen would take care of both" while offering no way to do it in one click.

The shuttle itself is the best-designed thing I have touched in this game and the
click layer serves it cleanly. `183 slide through slot` in the morning gave "Shuttle
controls activated"; the lever is three buttons (`25 push · 26 pull · 27 center`) and
the display is a speed. Push and it climbs 5 a turn; you pass "Limit 45"; center to
hold; at the halfway sign - "Hafwaa Mark -- Beegin Deeseluraashun" - you pull, and it
falls 5 a turn.

I got it wrong, and the way I got it wrong is worth recording. The halfway sign
arrived on the same turn as a hunger nudge, I spent the next turn on
`23 examine window`, and by the time I pulled the lever I was two turns late.
Deceleration from 40 takes eight turns, and I stopped **in the tunnel**, short of the
station, with `30 open door` answering "Operator should remain in control cabin while
shuttle car is between stations." The recovery was easy once I read the signs - push
to 5, center, coast past markers reading 10 and 5, pull as the platform appears - but
this is the one puzzle in the game where the important information is a one-line
event buried among Floyd's chatter in a block that is otherwise the same forty lines
every turn. There is no persistent "distance to station" anywhere on screen; the
display shows speed only.

Lawanda Platform: **+4, score 44.**

#### The Infirmary (turns 541-560)

Up a dead escalator to a Fork, northeast to Systems Corridor West, and northwest into
an **Infirmary** - a red spool labelled "Simptumz uv Xe Dizeez", a bottle labelled
"Dizeez supreshun medisin -- eksperimentul", and a sealed emergency ration.

Two things happened here, one mechanical and one not.

The mechanical one: `26 take medicine bottle` failed with "the shuttle access card
slips from your arms," and the fix was `106 put in…` on the Patrol uniform, which
takes cards. Three clicks later all three cards were in my pocket, off the carry
count, and everything fitted. The uniform-as-card-holder is a lovely piece of design
and the layer surfaces it well - but note that nothing ever told me the uniform had a
pocket; I only knew because leg 1 happened to press `106` once.

Then the medicine. `197 taste` was the only ingestion verb on it and it answered "The
bottle is closed." `195 open`, and a **new** option appeared: `201 eat (new)`. Eating
it: "The medicine tasted extremely bitter. After a few moments the fever breaks, and
you feel your strength returning." `4 diagnose` - **"You are in perfect health."**
The illness that had been running since leg 1's turn 221 is gone. That is the same
open-the-container pattern as the canteen, and it is worth saying that here it worked
*for* me: the option appeared exactly when it became possible.

And the thing that was not mechanical at all. While I was stuffing cards into my
pocket, Floyd went rummaging in a corner: "It seems to be the breast plate of a
robot... Floyd stares at it in complete silence. A moment later, he begins sobbing
quietly, awkwardly excuses himself, and runs out of the room. You look at the breast
plate, and notice the name **Lazarus** engraved on it." I only knew who Lazarus was
because, three hundred turns earlier, his name had been an entry in Floyd's
`144 ask about…` list. The menu earned that scene.

#### A gap in the record, and where I woke up (turn 778)

A note in my own defence and against it. Between the Infirmary section above and this one
there is a stretch of roughly two hundred turns that I played and never wrote up — the
session was cut off before I got to it. What survives of it is friction rows 26 to 31,
which I did log as I hit them, and they are an honest skeleton: the library terminal's
two competing numbering systems, the ProjCon Office mural, the teleport booth's lapsing
authorisation, the fromitz boards in Planetary Defense, and the micro-relay. I am not
going to reconstruct prose I cannot remember. I am recording the loss instead, because it
is the same lesson the interface keeps teaching me: anything that is not written down at
the moment it happens is gone.

What I can do is read the world back. I picked up at **turn 778, score 63**, standing on a
silicon filament called **Strip Near Relay**, miniaturised, inside the Project's computer,
carrying a laser with a **new battery** in it. So somewhere in the lost stretch I found the
battery, the miniaturisation access card and the teleportation access card, and I got
myself shrunk.

#### Reading the state back (turns 778-822)

First move was `5 save`, because friction row 31 says I have already shot the speck once and
had to restore. Then I read the room properly.

The micro-relay is `23 examine` and nothing else. Examining it: "some sort of impurity has
wedged itself into the contact point of the relay, preventing it from closing. The speck...
resembles a blue boulder to you in your current size." The speck is `24 examine` and nothing
else. And `22 go east` — a listed exit — answers **"The relay is sealed. Although you cannot
enter it, you could look into it."**

That sentence is the game naming a verb I have no button for. There is no *look into* on the
micro-relay; there is only *examine*. I think examine is in fact doing the same job, but a
click player is told in plain English to do a thing that is not on the list, and has to guess
that a synonym he can see covers it (friction 32). The exit itself is worse: `22 go east` is
permanently untakeable, costs no turn, and carries no state marker, while the Main Lab three
rooms away happily writes `26 go southeast, Bio Lock West (bio-lock door closed)`. The layer
knows how to mark a blocked exit; it just doesn't here.

Then I walked the strip south, and got my clearest mislabel of the whole session. At **Strip
Near Station** the exits read `21 go north, Middle of Strip · 22 go west, Station 384`. I
pressed 22 expecting Station 384 and got "You feel the familiar wrenching of your innards"
and the **Miniaturization Booth** — full size, out of the computer, done. The label promised
one room and delivered a different one, and it happens to be the one move in the miniature
world you cannot undo without going through the booth again (friction 33).

Out in the Computer Room, `27 read pile of computer output` gave me the brief in one screen:
every research and production line is at 100%, drug testing is at 99.985%, and then
"*** ALURT! *** Malfunkshun in Sekshun 384! Sumuneeng reepaar roobot." So the game has told
me what the last job is. I then walked the whole of Lawanda to see what state my lost two
hundred turns had left it in, and the answer is: better than I feared.

**Planetary Defense** now holds four boards in the panel and a **fried** one on the floor.
**Course Control** blinks "Kors diivurjins minimiizeeng" with a good bedistor in the cube and
a **fused** one on the floor. Both of those repairs are done. The **Repair Room** has the
repair robot the printout is summoning: "Lying face down at the bottom of the stairs is a
motionless robot. It appears to be damaged beyond repair." So nobody is coming. Section 384
is mine.

I also went back to the ProjCon Office to re-test friction 27, and it is worse than I filed
it. The mural is `23 examine`, the logo is `24 examine`, and that is the entire room. What I
had not noticed before is that the mural is listed under **Scenery**, and the laser's
`147 shoot something…` never lists scenery — in that room the laser shows only `146 shoot`
with no target list at all. So the one improvised idea a player might reach for, burning
through the thing the prose says has a breeze behind it, is not even offered as a failure.
I have amended row 27.

Two small things on the way. The **Physical Plant** at Lawanda describes itself as "much
larger than the one in the Kalamontee Complex" for a complex that is *smaller* — which, with
a mural on a south wall that has nothing behind it on my map, is the game pointing at a
hidden level twice. And in the **Lab Storage** off the Main Lab I found a piece of paper:
"Week uv 14-Juun--2882. Kombinaashun tuu Konfurins Ruum: **206**." I have no Conference Room
on my map yet, but I have a combination looking for a door.

#### The long way to bed (turns 822-835)

Night caught me in the Library Lobby and `10 sleep` answered with leg 1's helpful map:
"Dorms C and D off the Dorm Corridor, Dorms A and B off the Rec Corridor." All four are in
**Kalamontee**, across the water, and the shuttle stops running at 6000; it was 7801. For a
moment I thought I had stranded myself.

The teleport booth saved me, and it is worth saying that the click layer made that recovery
trivial. Booth 3 is `23 go east / in` off the Library Lobby; inside, `206 slide through slot`
("Redee"), then `27 push beige button` on the very next turn — friction 29's lesson, that the
authorisation lapses if you dawdle — and I was in Booth 2 in the Kalamontee Elevator Lobby.
Two clicks across an ocean.

Then west to the Corridor Junction, where the main corridor's exit reads `24 go west` with no
destination on it, for the fourth or fifth time in this session. I have walked that link at
least six times now. It is the only three-hour move in the game and it is the only exit that
refuses to learn its own name (friction 21, still true).

Dorm C, `24 get in`, `10 sleep (exhausted)`, `3 wait`, and a genuinely nasty childhood
drowning dream later it was **SEPTEM 9**. Everything I carried was on the floor again, and
this time I could see exactly what the display does to a dropped container: the laser, which
reads as one carried line with two nested children, became **five** separate room entries —
laser, laser setting dial, new battery, each with its own numbers, the dial keeping its
`63 set to a number <value>`. Seven objects became eleven list rows. `8 take all` put it all
back, but note that `8 take all` is not offered while you are still in the bed; you have to
press `7 get out of the bed` first, and the wake-up text tells you your things are on the
floor in the same breath that the button to pick them up is missing (friction 34).

#### Two deaths in forty turns (turns 835-878)

I have now died twice in this leg, and both deaths are worth writing down carefully because
they are different kinds of thing.

**The first one is the interface's.** I woke in Dorm C on SEPTEM 9 with the line "You are
also incredibly famished. Better get some breakfast!", picked my kit up off the floor, walked
north, west and south — four moves — and on the fifth, stepping into the Mess Hall one room
short of the kitchen, "!! You collapse from extreme thirst and hunger. **** You have died ****".

Six turns from waking to dead, and in those six turns the game printed **no warning at all**.
No "!>" line, no escalation, nothing. And here is the click-layer part: through this whole
session the standing button row has been my hunger gauge. When I had food it grew
`11 eat the blob of red goo`, then `(starving!)` when it got urgent, then
`11 drink the quantity of protein-rich liquid`. I had learned to read that row. On the
morning I died I had no food, so the suggestion button **did not exist**, and the row looked
exactly like a row on a perfectly healthy morning. The one affordance that had been teaching
me how close to death I was is generated from my inventory, so it goes silent precisely when
I am in danger and have nothing to fix it with (friction 35). `4 diagnose` would have told me
— it always gives a real number of hours — but nothing suggested pressing it.

There was one genuinely good thing about that death. Leg 1 filed the death screen as
High-severity friction 5: "Type RESTART, RESTORE, or QUIT" with the option list reading only
`start again with --new`. This time the screen read **`On screen you can: 1 restore your
saved game · or start again with --new`**, and `1` worked. The restore button appears once you
have a save. I have corrected row 5: the dead end is not absolute, it is conditional on having
pressed `5 save` at some point, and RESTART and QUIT still have no buttons at all.

Restored, I got the order right the second time — food first, then sleep. `181 slide through
slot` on the kitchen card, `27 put in… canteen` into the octagonal niche, `30 push button`,
`32 take`, and the standing row grew `11 drink the quantity of protein-rich liquid` again. I
then pressed the dispenser button one more time to refill for the road and the game answered
by knocking me out on the spot — "You can't stay awake a moment longer. You drop to the ground
and fall into a deep but fitful sleep" — which cost me nothing, because the canteen was sitting
in the niche and so did not spill the way leg 2's earlier one did.

Waking, `8 take all` picked up five things and **silently left the canteen behind**, because
the canteen was inside the dispenser unit rather than loose on the floor. No mention of it in
the output; it simply was not in the list of things taken. It was the one object I had crossed
the map for (friction 36).

**The second death is mine, but it taught me the map.** I had teleported back to Lawanda —
Booth 1 in the Conference Room, `206 slide through slot`, `27 push tan button`, and out in
Booth 3 in the Library Lobby, two clicks across an ocean, which remains the best-value thing
in this game. The library terminal took `32 0` and gave a menu, and every entry on it returns
the same Phase One to Phase Four blurb: the population is **cryogenically frozen** and the
Project is automating the research that will revive and inoculate them. The microfilm reader
upstairs had a green spool: the helicopter needs a Helicopter Access Card **and** a Control
Panel Key, both from Transportation Storage — the pitch-dark room. And the `39 examine` on
the "librarian" in the scenery list gave me the best line in the game: "You call for the
librarian. Your voice goes flat against the shelves, and nothing answers: the invitation on
the terminal has outlived the last person who could have taken it up."

Then the Radiation Lock, northeast of the Main Lab, which is a proper two-door airlock and
which the click layer handles well: `23 close radiation-lock door` in the west half, walk
east, `22 open lab door`, and the exits mark themselves `(lab door closed)` /
`(radiation-lock door closed)` at every step. Beyond it, the **Radiation Lab** — split-open
canisters, a blue glow, sinister forms moving in the Bio Lab through a crack in the wall, a
brown spool, and **a powerful portable lamp**, which is the light source I have been looking
for since day one.

The sign in the lock says "Raadeeaashun suuts must bee worn beeyond xis point." I read it and
went in anyway, which is a fair blind-player mistake. What cost me was the carry limit, again:
`8 take all` got the spool and then "portable lamp: Your load is too heavy. (For the portable
lamp: dropping the survival kit would make enough room.)" So I spent a turn on `111` to find
the drop verb, a turn on `111 drop`, and a turn on `28 take` — three extra turns standing in a
radioactive room purely to shuffle my hands. By the time I was back in the lock it was "You
suddenly feel sick and dizzy", then "You feel incredibly nauseous and begin vomiting. Also,
all your hair has fallen out", and `4 diagnose` finished me: "It seems you have picked up a
bad case of radiation poisoning. **** You have died ****".

I will note, mildly, that the exits line is capable of carrying state — it says
`(lab door closed)` — but `21 go east` into a lethally radioactive room carries nothing. The
warning is in the prose and a typed player has exactly the same information, so this is not a
click-layer failure; it is just a place where the layer's own habit of annotating exits made
me trust an unannotated one (friction 37).

Restored to turn 863 again. The lamp is worth another attempt, and this time I will empty my
hands **before** I open the lock.

#### The lamp is a trap, and Floyd is dead (turns 869-907)

I went back for the lamp with everything planned. `111 drop` the empty survival kit in a safe
corridor first, then the airlock dance — close the west door, walk east, `22 open lab door` —
and then `5 save`, which I noticed **costs no turn**, so a save at a doorway is free and I
should have been doing it all game. Then in, `8 take all` in a single turn (brown spool and
portable lamp together, because my hands were empty), and straight back out. Two turns inside
instead of four.

It made no difference. "You suddenly feel sick and dizzy" as I closed the door behind me,
"You feel incredibly nauseous and begin vomiting. Also, all your hair has fallen out" one turn
later, and dead of radiation poisoning on the turn after that. **The Radiation Lab cannot be
survived without a suit, even on a perfect two-turn round trip**, and there is no suit anywhere
I have found. So the powerful portable lamp — the thing that unlocks Transportation Storage,
which in turn holds the Helicopter Access Card and the Control Panel Key that the green spool
in the library told me about — is bait behind a wall I cannot cross.

What I want to record about those three turns is what the option list did *not* say. The two
sickness lines are just narration; nothing appeared in the standing row, no `take medicine`,
no suggestion of any kind, and `4 diagnose` — which I only pressed because I was curious — is
what actually announced the death. In a layer that has trained me all game to expect an action
button when the game wants something from me, "you are dying and there is nothing to press"
looks exactly like "you are fine".

Then I went looking for Floyd, because by now I had two problems a robot solves — a sealed
relay a man cannot enter, and a radioactive room a man cannot survive — and the layer has
already proved it will grow an `ask to get…` button when Floyd is standing somewhere I am not.
I swept the whole of Lawanda. SanFac F, the Fork, the Infirmary (the medical robot breastplate
with Lazarus's name on it is still lying there), the Repair Room, Course Control, Planetary
Defense, the Physical Plant, the Library.

He was behind the one door I had not opened. `27 open bio-lock door`, `23 close bio-lock door`,
`21 go east`, and:

> Your former companion, Floyd, is lying on the ground in a pool of oil.

It happened during the two hundred turns I played and did not write down. I have no memory of
it whatsoever, which is its own kind of loss. The game's most famous scene, and I arrived at
the aftermath as a stranger.

The click layer's handling of that moment is the single most jarring thing in this session.
Floyd is not in a Characters block any more; he is under **In the room** as
`mangled robot: 29 examine`. That is the entire interaction. There is no goodbye, no take, no
cover, no *anything* — and sitting three lines below it, generated by the same rule that gives
me `pour on blue button` and `shoot silicon strip`, is **`231 shoot mangled robot`**. The
contextual action generator will happily offer to shoot my dead friend (friction 38). To the
game's enormous credit, `29 examine` answers "You turn to look at Floyd, but a tremendous sense
of loss overcomes you, and you turn away," which is exactly right. The prose knows what this
moment is. The button list does not.

One more small thing in that room. The description says "The door to the east, leading to the
Bio Lab, has a window." `25 examine window` answers "I see nothing special about the window."
There is no *look through*, and the whole point of a window in a sterilization chamber is to
look through it at the thing that killed your friend (friction 39).

And the fever came back. At turn 878 in Project Corridor West: "You notice that you feel
unusually weak, and you suspect that you have a fever." I went to Lab Storage for the bottle
that cured me at Lawanda, and `36 look inside` says **"The medicine bottle is empty."** That
was a single dose and there is not another one in the game that I have found. So I am now on a
clock with no button attached to it at all (friction 40).

So: Floyd dead, lamp unreachable, medicine gone, fever running. Everything now depends on a
speck of dirt in a sealed relay, and on whatever I can do about it alone.

#### The speck, the microbe, and the end (turns 908-963)

I owe the click layer the biggest apology of the whole session, and it is row 31.

Back in the booth: `213 slide through slot` on the miniaturization access card ("Please type in
damaged sector number"), `24 384`, and down onto the strip. At Strip Near Relay `147` opened
its target list — speck, micro-relay, silicon strip — and this time, instead of firing at the
setting the laser happened to be on, I turned the dial down first: `149 1`.

> shoot speck — "A good shot, but just a little wide of the target."

A *miss*. Not "the beam slices through the red plastic covering of the relay and it collapses
into a heap of shards". At setting 1 the laser is a precision instrument that can miss
harmlessly; at 2 and 6, which is all my earlier self tried, it is a cutting torch that destroys
the component you are trying to save. Second shot: "A near miss!" Third: "The speck is hit by
the beam! It sizzles a little, but isn't destroyed yet." Fourth:

> "The beam hits the speck again! This time, it vaporizes into a fine cloud of ash. The relay
> slowly begins to close, and a voice whispers in your ear 'Sector 384 will activate in 200
> millichrons. Proceed to exit station.'" **+8 points, score 71.**

So the game's final obstacle is solved entirely inside the click layer, and the mechanism is
the two-number `<value>` entry that leg 1 first met on a combination dial. `149 <n>` is the
whole puzzle. I have corrected row 31 from High to Low: the layer offered the right verb, the
right target list and the right control all along, and both previous attempts simply had the
power turned up too high. What survives is much smaller — nothing on screen distinguishes a
dial setting that destroys the objective from one that does not, and the destroyed-relay outcome
is unrecoverable without a save.

Then the game sprang its trap. One step south and "with a loud plop, a giant elephant-sized
monster lands on the strip just in front of you" — a microbe, "merely some tiny microbe which
has somehow violated the sterile environment", blocking the only way out.

Two things about that fight. First, the **microbe's own menu is boilerplate**: `235 …` opens
"examine, talk to, salute, attack, listen to". The same five verbs Blather had on Deck Nine on
turn 1. I was being eaten and the interface offered to salute. Second, I burned a life finding
out that `219 shoot silicon strip` — a contextual entry the generator had been printing in
every strip room — does nothing ("The silicon strip grows a bit warm"), and while I was
pressing it the microbe ate me.

The answer was in the prose, and the click layer had been carrying it, unlabelled, since I
first shrank. After several shots at setting 6:

> "Another pseudopod, **perhaps attracted by the warmth of the laser**, tries to envelop the
> weapon. You snatch it away from the monster's grasp."

Every carried object in the miniature world has an entry reading `throw off the strip` — the
canteen, the cards, the battery, the laser. For four hundred turns of reading option lists I
had filed that as exactly the kind of generated nonsense I complained about in row 22. It is
the solution. `220 throw off the strip` on a laser I had deliberately heated up:

> "As the laser flies over the edge of the strip, the hungry microbe lunges after it. Both the
> laser and the microbe plummet into the void. (Whew!)"

That is the sharpest thing this session has taught me about the click layer, and it cuts both
ways. The generator does produce the winning move without the author having to hand-place a
hint — but because it produces the same move for every object in every room, there is no way
to tell a hint from noise, and the only way I found it was a line of prose (friction 42).

South, then `22 go west, Station 384`, and the same one-way un-miniaturisation as before — but
this time narrated: "Main Miniaturization and Teleportation Booth has malfunctioned...switching
to Auxiliary Booth..." **+4, score 75**, and I was standing somewhere I had never been.

The **Lab Office** is a lovely piece of design and the layer serves it cleanly. "You realize
with shock and horror that the only way out is through the mutant-infested Bio Lab." Three
buttons on the wall: white "Lab Liits On", black "Lab Liits Of", red "Eemurjensee Sistum".
`26 open desk` — "Opening the desk reveals a gas mask" — and `28 search desk` turns up a memo:
the emergency system "wud flud xe entiir Biioo Lab wic aa dedlee fungasiid. Propur preecawshunz
shud bee taakin." Gas mask, red button, walk through. Three clicks, no guessed phrasings, and
each object appeared in the list the moment it became relevant. And while I was reading the
memo the public address system said "Revival procedure beginning. **Cryo-chamber access from
Project Control Office now open**."

Which retires friction 27, my High-severity mural. It was never a verb problem at all: the
mural slides away on its own when the revival begins. `41 wear gas mask`, `34 push red button`
("You hear a hissing from beyond the door"), `23 open office door`, west into a Bio Lab full of
choking mutants, west again through the bio-lock past Floyd's body, and the chase was on —
"The mutants burst into the room right on your heels!" every single turn, through Bio Lock West,
the Main Lab, the Computer Room, and into the ProjCon Office, where

> "The mural that previously adorned the south wall has slid away, revealing an open doorway to
> a large elevator!"

and the exits line had grown `25 go south (new)`. Down into the Cryo-Elevator, `24 push button`
— "The elevator door closes just as the monsters reach it!" — **+5, score 80 of 80.**

One sour note in the middle of the triumph. The standing row grew `13 wait for the elevator`,
the button leg 1 praised as the best-designed thing in the game because it waits exactly as
long as needed and stops on arrival. Here it printed "Time passes..." three times, then ">> The
elevator door opens onto a room to the north", and then **kept going for nine more turns**. On
a fever clock with no cure, that is twelve turns spent for three (friction 41).

Then the Cryo-Anteroom, and the ending: Veldina of Resida rising out of her cryo-unit, the
S.P.S. Flathead in orbit, Blather demoted to Ensign Twelfth Class and assigned as my personal
toilet attendant, a medical robot stinging my arm with the antidote for The Disease — and a
team of robot technicians parting their ranks to let **Floyd** come bounding through. "Hi!
Floyd feeling better now!" He hands over a helicopter key, a reactor elevator card and a
paddleball set: "Maybe we can use them in the sequel..." — which is the game cheerfully
confirming that the three things I never solved were never on the critical path.

**Score 80 out of 80. Rank: Galactic Overlord. Turn 963, afternoon of Day 4.**

And then one last click-layer note, which is the reason I pressed `look` after the credits:

> The game is over. Start again with --new.

No option list at all. Not one number. The death screen at least offers
`1 restore your saved game`; the **victory** screen offers a mouse-only player nothing but a
command-line flag he cannot type (friction 43).

### Report (leg 2)

**Where I got to.** I picked the session up at turn 778 with score 63, standing miniaturised
on a silicon filament inside the Project's computer, and finished it at **turn 963 with a
score of 80 out of 80**, rank Galactic Overlord, alive and cured. About 190 commands this
leg, every one of them a number or a `<option> <item>` / `<option> <value>` pair from the
on-screen list. **I never typed a phrase to get past anything in either leg, and the game is
complete.** A mouse-only player can finish Planetfall.

Along the way I died three times — starvation one room short of the kitchen, radiation
poisoning in the Radiation Lab, and eaten by a microbe — and restored each time from the
click layer's own `1 restore your saved game` button.

**What I opened this leg.** The Comm Room coolant puzzle and the shuttle to Lawanda were
already done when I inherited the session, as were Planetary Defense and Course Control. What
I added: the micro-relay repair (+8), the escape to the Auxiliary Booth (+4), and the run
through the gassed Bio Lab to the cryo-elevator (+5). Also the Radiation Lab (a trap), the
Bio Lock (where Floyd's body is), the Lab Office, and the library terminal and microfilm
reader.

**What I never solved, and did not need to.** The helicopter's orange key, Transportation
Storage (pitch dark; the powerful portable lamp that would light it sits in a room that kills
you without a radiation suit I never found), and the reactor. The ending confirms all three
were optional — Floyd hands you a helicopter key, a reactor elevator card and a paddleball
set with "Maybe we can use them in the sequel..."

**Three corrections I owe the layer.** This leg overturned three of my own High-severity rows,
and the pattern in all three is the same: I concluded a thing was impossible when I had simply
not brought the right state to it.

- **Row 31, the speck.** Not a dead end and not a bug. The laser's `149 set to a number
  <value>` dial is the puzzle: at 1 it is precise and misses harmlessly, at 2-6 it is a
  cutting torch that destroys the relay. Four shots at setting 1 and the speck vaporised.
  High → Low.
- **Row 27, the mural.** Not a missing verb. The mural slides away on its own when the PA
  announces the revival procedure. High → Low.
- **Row 5, the death screen.** It *does* have a button — `1 restore your saved game` —
  provided you have saved at least once. High → Medium.

**What the click layer did well, that I had not already credited.**

- **`5 save` costs no turn.** I only noticed on the ninth hour. A save at a doorway, before a
  fight, in front of a locked thing, is free. That single fact is what made three deaths
  survivable, and nothing on screen says it.
- **The `<value>` two-number entry is the best control in the interface.** It is how the
  library terminal, the miniaturization booth, the combination dial, the shuttle speed and
  the laser power all work, and it is what solved the endgame. Six keystrokes, no phrasing to
  guess, and the refusals are informative ("The dial can only be set from 1 to 6").
- **Exits mark door state properly and consistently** — `(bio-lock door closed)`,
  `(lab door closed)`, `(radiation-lock door closed)` — and new ones appear marked `(new)`
  the instant the world changes. `25 go south (new)` appearing in the ProjCon Office is how I
  knew the mural had opened.
- **The airlocks** are a four-button dance (close this, walk, open that) that the layer
  renders with no ambiguity at all.
- **The Lab Office endgame** — gas mask in a desk, memo explaining the fungicide, three
  labelled wall buttons — is the layer at its best: every object acquires its action the
  moment that action becomes possible.

### Verdict (leg 2)

**Yes. A first-time mouse-only player can finish this game**, and I no longer believe the
ceiling I described at the end of leg 1. I wrote then that "the interface can express
single-object actions and game-authored tool pairings, but it cannot express an idea the
author did not anticipate", and that this would be fatal. It was not, because every puzzle
between there and the end turned out to be expressible: a numeric dial, a card in a slot, a
worn mask, a pushed button, and one thrown object.

But the way I won the last fight is the thing I would most want the designers to look at.
The microbe was beaten by `220 throw off the strip`, an entry the generator had been printing
on **every carried object in every room of the miniature world** since I arrived. It reads as
noise — the same noise as `pour on blue button` and `shoot silicon strip` — right up until the
moment it is the only thing that works. I found it from a sentence of prose, not from the list.
So the contextual generator both hides and supplies the answer, and the player has no way to
tell which entries are affordances and which are the engine being thorough.

Three changes I would still make, in order:

1. **Let the standing button row speak about clocks it cannot fix.** It grows
   `11 eat the blob of red goo (starving!)` when I have food and falls completely silent when
   I have none — which is exactly when I am about to die, and I did. Same for illness and for
   radiation: the game runs three lethal timers and `4 diagnose` is the only readout, and
   nothing ever points at it. A persistent `4 diagnose (starving)` marker would cost one word.
2. **Separate hints from noise in the contextual generator.** Pouring coolant on an elevator
   button, shooting the strip I am standing on, and offering to shoot Floyd's corpse are all
   the same rule that produced `throw off the strip`. Some grouping — a "sensible here" tier
   and an "everything else" tier behind a `…` — would let the list carry a signal again.
3. **Give the end screens buttons.** Death has `1 restore your saved game` (good, and only if
   you have saved). **Victory has nothing at all**: "The game is over. Start again with --new."
   And `5 save` / `6 restore` are a single unnamed slot — I overwrote a pre-monster save with a
   post-monster one and locked myself into a fight I did not yet know how to win.

A fourth, smaller: the "smart wait" buttons are the layer's nicest invention and
`13 wait for the elevator` overshot the arrival by nine turns. When one of those misbehaves it
costs more than a plain `3 wait` ever could, because the whole point is that you stop reading.

### Friction log

| # | What I was trying to do | What the interface offered | What happened | Severity |
| ---|---|---|---|--- |
| 1 | Answer the ambassador's direct question ("interested in a game of Bocci?") | No yes/no anywhere; his menu is examine / talk to / salute / attack / listen to | Could not answer. "talk to" gives a shrug, not a reply | Low |
| 2 | Take the piece of celery the ambassador dropped | It is listed under **In the room** but the only option is `30 examine` | No way to try taking it; can't tell if it is scenery or a missed item | Low |
| 3 | Scrub the deck, which is the job the opening paragraph gives me | Brush menu (100) = examine, drop only | The game's own premise has no button | Low |
| 4 | Get into the escape pod | `29 get in` stayed on the list unchanged while the bulkhead was shut and after the launch had begun | Pressed it, got "The escape pod bulkhead is closed." The exit line marks state, the object button never does | Medium |
| 5 | Restart after dying | Death text says "Type RESTART, RESTORE, or QUIT"; option list says `On screen you can: start again with --new` | Mouse-only player is dead-ended at the death screen with no button at all. **CORRECTED in leg 2:** the screen reads `On screen you can: 1 restore your saved game · or start again with --new` once you have saved at least once, and `1` works cleanly. So the dead end is conditional, not absolute - but it is conditional on the player having already pressed `5 save`, which is exactly what a first-timer has not done before their first death (that is how leg 1 died). RESTART and QUIT still have no button in either case | Medium (was High) |
| 6 | Work out what I could do inside the escape pod | Room list kept showing `escape pod: 28 examine · 29 get in` while I was *inside* the escape pod | Harmless but confusing - the container you are in is listed as a thing you can enter | Low |
| 7 | Move in a direction I had just used in the previous room | Exit numbers are per-room: `23` was "go east" in the Rec Corridor and "examine bed" in Dorm A | Pressed 23 expecting to move and examined a bed instead. No muscle memory is possible for movement | Medium |
| 8 | Pick up four spare parts from Storage East | `8 take all`, then individual `take` buttons | Carry limit. Each take dropped something else ("the K-series megafuse slips from your arms..."). Took 14 moves of take/put/drop juggling to leave with everything, using the cardboard box as a sack | Medium |
| 9 | Put a floor item into the cardboard box I was holding | `128 put in…` (box in hand) vs `28 put in…` (box on floor) | The same action has two numbers depending on where the box is, and 128 vanishes without warning when the box falls. The error message ("not on screen now: something has changed") is clear, but the number churn is real | Medium |
| 10 | Move a spare part from the floor into the cardboard box I was holding | `128 put in…` lists ONLY carried items ("Put in cardboard box: ID card, towel, canteen, lower elevator access card") | No one-step "put floor item in held container". You must take it first, which can make you drop something else. A typed parser would do the implicit take | Medium |
| 11 | Hand something to Floyd so he could carry it while my arms were full | Floyd's menu: examine, talk to, salute, attack, listen to, search, turn off, throw at…, ask to go <dir>…, ask about… | There is no **give**. There is `show to floyd` on a card and `throw at` (!), but no way to hand a friendly robot an object. With a hard carry limit this is the obvious workaround and it has no button | Medium |
| 12 | Ask Floyd about the complex, the shuttle, the Kalamontee, or himself-in-general | `144 ask about…` lists only objects currently in scope (carried or in the room), e.g. "…glass flask, curved metal bar, shelf" | **PARTLY CORRECTED in leg 2.** The list is not purely nouns in scope: in the Rec Area it also offered **Lazarus**, a name that appears nowhere else in the game, and asking produced Floyd's one piece of real backstory. So the layer can carry authored plot topics. What stands is that it carries very few of them - there is still no way to ask about the complex, the plague, the shuttle or what to do next, and the topic list is dominated by whatever happens to be lying on the floor | Medium |
| 13 | Get the steel padlock off the small door in the Mess Corridor | With no key: `164 shoot padlock` only (+2 points, "nothing else happens"). Once carrying the key: `28 unlock with key` appeared on the padlock | **CORRECTED - partly my misreading.** It was not a dead end; I simply did not have the key yet, and the unlock button appears the moment you do. What stands: the laser is *scored* (+2) for a use that cannot succeed with the old battery, which reads as encouragement down a dead path | Low (was High) |
| 14 | Eat a blob of goo that had slipped to the floor while I slept | Floor entry read `35 examine` only; the `eat` verb exists only on a *carried* blob | Contextual verbs silently vanish when an item is on the floor. A player who did not think to `take all` first would conclude the goo was no longer edible | Medium |
| 15 | Fish a steel key out of a crevice "too narrow, or your fingers are too large" | With the pliers in hand: key = `25 examine · 26 take`, pliers = examine/drop, nothing else. With the **magnet bar** in hand the key grew `27 take with magnet` | **CORRECTED - my misreading.** I filed this as "no way to apply a tool to an object" and that was wrong: the click layer does generate tool-specific actions, it just does it for the *right* tool. The pliers are simply not the answer. Residual, much smaller point: holding the wrong tool gives no hint that a tool is wanted at all | Low (was High) |
| 16 | Ask Floyd to pick the key out of the crevice for me | Floyd's menu has turn off, throw at…, ask to go <dir>, ask about… | **CORRECTED in leg 2, and this is the layer at its best.** In Lawanda's Repair Room there is a robot-sized doorway I cannot fit through. Floyd's menu carried `153 ask to go north`; he squeezed in, came out and said "Nothing else interesting inside. Just a shiny fromitz board" - and on that same turn his menu grew **`207 ask to get the board (new)`**. One click and he fetched the part that the whole endgame needs. So fetch DOES exist; it is authored per-situation and appears out of Floyd's own dialogue. What remains true is the general case: there is still no standing give/carry/fetch, so the carry-limit round trips of row 18 are unchanged | Low (was Medium) |
| 17 | Cut open a tin can I was holding, with the laser | `147 shoot something…` listed "ladder, key, pair of wide-nosed pliers, shelf" — every object in the room, and nothing I was carrying | Had to drop the can on the floor before it became a legal target. Carried items are invisible to a carried tool's target list | Medium |
| 18 | Carry the ladder from Storage West to the rift along with my food, light and tools | `28 take ladder` → "You'd have to drop the laser, the survival kit, the tin can, the canteen and the curved metal bar first"; Floyd offers no carry/give option | The ladder is a solo load and its destination is a three-hour walk away, so the only click-expressible route is `20 drop all`, walk, and come back. Multi-trip fetch quests are the main cost of the carry limit + no-give combination | High |
| 19 | Scan the options in a room I had used as a stash | The Tool Room list ran to 40+ entries (11 room objects with 2-6 verbs each, plus exits, standing buttons, carried items and their nested contents), reprinted in full every turn | Finding the one entry I wanted meant re-reading the whole block. Most of the bulk is `examine` entries that never do anything | Medium |
| 20 | Get back to somewhere I had been, across the three-hour east-west corridor | Exits only, one room at a time; no map, no room list, no "travel to" | Every fetch is a manual re-walk of 6-10 clicks. The exit labels (which do show destinations once visited) are the only navigation aid, and with the carry limit this is where most of my clicks went | Medium |
| 21 | Tell at a glance whether the long east-west main corridor led somewhere I had been | Dorm Corridor shows `23 go east` and Corridor Junction shows `24 go west`, both with no destination name, even though I have walked that link several times | Leg 1's best navigation trick - "an exit with no name attached is somewhere you have not been" - is not reliable. The one link in the game that costs three hours is exactly the one that never learns its label | Medium |
| 22 | Carry a flask of coolant across the map | Once the flask had fluid in it, every room generated a `pour on <thing>` entry for every object present: in the Elevator Lobby the flask offered `191 pour on blue button · 192 pour on red button` | The contextual-action generator does not filter for sense. Pouring chemicals on an elevator call button is offered as prominently as the one pour that matters, and in a busy room that is several more lines to scan. It also makes "a new option appeared" stop meaning "this is a hint" | Low |
| 23 | Ask Floyd for help inside the pitch-dark Transportation Supply | The room prints ">> Floyd follows you." and then lists nothing but `21 go south / out` - no Characters block at all | Floyd is audibly in the room but has no entry, so there is no way to ask him anything, including whether he can do something about the dark. In click mode an NPC you cannot see is an NPC you cannot address | Medium |
| 24 | Keep the canteen of protein liquid I had just walked across the complex to fill | The canteen's action list includes `34 close`, sitting between `take` and `look inside` with nothing to distinguish it | I slept, and "While you slept, the things you were carrying slipped to the floor beside you. The open canteen spilled its liquid across the floor." The button that would have saved it was on screen the whole time and nothing ever suggested a reason to press it. A typed player is in the same spot, so this is the game's trap rather than the layer's - but a menu that lists `close` on everything closeable trains you to ignore it | Low |
| 25 | Drink from my canteen after the hunger warning fired, having closed the canteen so it would not spill overnight | The warning read "!> A growl from your stomach warns that you're getting pretty hungry and thirsty. !> A drink from your canteen would take care of both." - but the standing row had **no** `11 drink…` suggestion, and the Carried block showed only `canteen: 120 …` with no nested liquid | Closing the container hides its contents and kills the one-click hunger suggestion that the game had trained me to rely on. The fix (open `120 …`, pick `open`, then drink) is two extra steps behind a "…" that a click player has no reason to open, and the warning text does not mention it. The suggestion button should follow its own advice and offer "open the canteen and drink" | Medium |
| 26 | Choose an item from the library terminal's own on-screen menu ("1. Histooree ... 5. Xe Prajekt ... 6. Inturlajik Gaamz") | The terminal is `32 type a number <value>`, so the answer is `32 5` - but the game had just printed a numbered menu whose numbers 1-6 are also the standing Buttons (1 look, 2 inventory, 3 wait, 4 diagnose, 5 save, 6 restore) | Two numbering systems on screen at once, overlapping exactly. Pressing what the fiction tells you to press (5) saves your game. The two-number form is the right mechanism; nothing on screen connects the terminal's menu to it, and the terminal's own "Tiip zeeroo tuu goo tuu aa hiiyur levul" reads as an instruction to press 0 | Medium |
| 27 | Get behind the mural in the ProjCon Office, which the game goes out of its way to tell me is hiding something ("The mural seems to ripple now and then, as though a breeze were blowing behind it," and Floyd adds "I don't remember seeing this before") | The mural's entire entry is `23 examine`. The Exits line offers only `21 go north · 22 go east` - no south, no "look behind", "move", "pull aside", "go through". Floyd's movement suggestions are likewise only north and east | This is the clearest hole I have found. The prose plants a secret passage in bold letters, the companion NPC confirms the wall is new, and the click layer has no verb for it at all. A typed player says LOOK BEHIND MURAL or MOVE MURAL; a mouse player re-reads the same one-line description forever. Confirmed by looking again and re-examining - no option ever appeared. **Re-tested in leg 2 and it is worse than I filed it:** the mural is listed under **Scenery**, and the laser's `147 shoot something…` never offers scenery as a target - in that room the laser shows only `146 shoot` and no target list at all. So the one improvised idea a player might reach for is not even available to fail. **CORRECTED at the end of leg 2, and I was wrong about the whole thing:** the mural is not a puzzle and needs no verb. When the PA announces "Revival procedure beginning. Cryo-chamber access from Project Control Office now open," the mural slides away by itself and the exits line grows `25 go south (new)`. What remains is a real but much smaller cost: for several hundred turns the prose plants a secret passage, Floyd remarks on it, and nothing anywhere hints that the answer is *later* rather than *a verb you have not found*. A player can burn a lot of clicks on it | Low (was High) |
| 28 | Put a fourth card (the teleportation access card) into the Patrol uniform's pocket, which was already holding three | `106 put in…` simply **disappeared** from the Patrol uniform's entry once the pocket was full - the line went from `Patrol uniform (worn): 102 … · 106 put in…` to `Patrol uniform (worn): 102 …`. Pressing the number I had used three times a minute earlier gave "Option 106 ... is not on screen now: something has changed. Look at the list again." | The layer is honest but mute: a capacity limit is expressed only by an option silently vanishing, and the generic churn message does not say *why*. "The pocket is full" would cost one sentence. This is the same class as leg 1's row 9 - numbers that evaporate under you - but here it hides a game rule | Medium |
| 29 | Use the teleport booth after activating it | `206 slide through slot` on the teleportation access card gives "Nothing happens for a moment. Then a light flashes 'Redee.'" I then explored for 26 turns and came back; `27 push beige button` answered **"Teleportaashun buux not aktivaatid"** - word for word the message I got before I had the card at all | The authorisation lapses, and the failure text is identical to the no-card case, so the obvious reading is "the card did not work" rather than "do it again, now". Sliding and pushing on consecutive turns teleported me instantly. One differentiated message ("authorisation expired") would save a player from writing the whole teleport network off | Low |
| 30 | Remove the one failed fromitz board from the Planetary Defense access panel | Four boards, four identical entries (`31 take`, `33 take`, `35 take`, `37 take`); `30/32/34/36 examine` return word-for-word the same description for all four; three of them answer "You jerk your hand back as you receive a powerful shock from the fromitz board" - and go on answering it however many times you press | The only method the layer offers is trial and error by electrocution, and the buttons never learn: a board that has just shocked me looks exactly like the one that has not. The exit lines manage state markers like "(door closed)"; an object entry that has already failed the same way should be able to say so | Medium |
| 31 | Free the speck that is jamming the micro-relay inside the computer - the single repair the whole endgame is about | Inside Station 384 the laser offers `147 shoot something…`, and the list contains the speck. Shooting it at setting 6 and, after a restore, at setting 2 gave the identical result: "A thin violet/orange beam ... slices through the red plastic covering of the relay ... Air rushes into the relay, which collapses into a heap of plastic shards." No points either time, and afterwards `22 go east` answers "You would slice yourself to ribbons on the shattered relay." There is no other option on the speck or on the relay in any room - `23 examine`, `24 examine`, and nothing else | The click layer offers exactly one verb for the game's final obstacle, that verb destroys the component, the power dial makes no difference, and nothing warns you beforehand. I restored rather than live with it. If shooting really is wrong, a mouse-only player has no second idea to try; if it is right, the game should say so | **CORRECTED at the end of leg 2 - this was my misreading, twice over, and the layer was right all along.** The laser's `149 set to a number <value>` dial *is* the puzzle. At setting **1** the beam is precise and a miss is harmless ("A good shot, but just a little wide of the target", "A near miss!"); four shots at setting 1 gave "The speck is hit by the beam! It sizzles a little" and then "it vaporizes into a fine cloud of ash... Sector 384 will activate in 200 millichrons", **+8 points**. At 2 and 6 - the only settings the earlier attempts tried - it is a cutting torch that slices the plastic and destroys the relay. So the click layer offered the right verb, the right target list and the right control, and the game's final obstacle is solvable entirely by clicking. Residual, and genuinely small: nothing on screen distinguishes a dial setting that destroys the objective from one that does not, and the destroyed-relay state is unrecoverable without a save | Low (was High) |
| 32 | Do what the micro-relay's own refusal told me to do - "Although you cannot enter it, you could **look into** it" | The micro-relay's entire entry is `23 examine`. There is no *look into*, and `22 go east` stays listed as a normal exit forever, costs no turn, and carries no "(sealed)" marker even though the Main Lab three rooms away writes "(bio-lock door closed)" on its exits | Examine turns out to do the job, but the game names a verb in plain English that is not on the list and leaves the player to guess that a differently-worded button covers it. The permanently-dead exit is the same class as row 4: the layer knows how to mark blocked exits and doesn't here | Medium |
| 33 | Walk west along the silicon filament to Station 384, which is what the exit line said was there | `Exits: 21 go north, Middle of Strip · 22 go west, Station 384` | Pressing 22 un-miniaturised me - "You feel the familiar wrenching of your innards" - and dumped me in the **Miniaturization Booth** at full size, which is not Station 384 and is not on the strip. The one irreversible move in the miniature world is behind a label that names the wrong room. **Clarified later in leg 2:** Station 384 is a real room and can be stood in - you arrive there from the booth - but walking *into* it from the strip always un-miniaturises you and deposits you full-size in a booth somewhere else (the second time, the Auxiliary Booth, with the game explaining "Main Miniaturization and Teleportation Booth has malfunctioned"). So the exit is the one-way door out of the entire miniature world, it is the correct and necessary move at the end, and the label gives no hint of either fact | Medium |
| 34 | Pick up the things that slipped to the floor while I slept | On waking, the standing row in the bed is `1 look · 2 inventory · 3 wait · 4 diagnose · 5 save · 6 restore · 7 get out of the bed` - **no `8 take all`**. It only appears after `7 get out of the bed` | The wake-up text says "the things you were carrying slipped to the floor beside you" in the same breath that the button for fixing it is absent. Worse, a dropped container is flattened: the laser (one carried line, two nested children) became five top-level room entries - laser, laser setting dial, new battery - so seven possessions became eleven rows to scan | Low |
| 35 | Not starve to death. I woke on SEPTEM 9 to "You are also incredibly famished. Better get some breakfast!", walked four rooms toward the kitchen, and died on the fifth | Six turns from waking to dead with **no warning line of any kind** in between - and, crucially, **no suggestion button**. All session the standing row has been my hunger gauge (`11 eat the blob of red goo`, then `(starving!)`, then `11 drink the quantity of protein-rich liquid`); that entry is generated from what I am carrying, so with no food it simply does not appear | The gauge the interface trained me to read goes silent exactly when I am starving *and* have nothing to eat - the one case where I most need to be told. A healthy morning and a fatal one look identical in the button row. `4 diagnose` knows the real number of hours and nothing points you at it. A "(no food - you have N hours)" state on the row, or a warning line, would cost one sentence | High |
| 36 | Pick my full canteen back up after collapsing asleep on the kitchen floor | `8 take all` reported "survival kit: Taken. kitchen access card: Taken. miniaturization access card: Taken. teleportation access card: Taken. laser: Taken." | It **silently skipped the canteen**, because the canteen was sitting inside the dispenser unit rather than loose on the floor. No line said so. It was the one object I had crossed the map and nearly died for, and the only way to notice is to re-read the room list and spot what is still there. "take all" should either include room containers or say what it is not taking | Medium |
| 37 | Judge whether walking east into the Radiation Lab was safe | The exits line read `21 go east · 25 close lab door · 23 examine lab door` - no marker. Two turns earlier the same line had happily written `21 go east (lab door closed)` | The warning ("Raadeeaashun suuts must bee worn beeyond xis point") is in the room prose and a typed player gets exactly the same information, so this is not a click failure. But the layer annotates exits for door state and for nothing else, which quietly trains you to read an unannotated exit as an ordinary one. The carry limit then cost me three extra turns of exposure inside the room (drop, find the drop verb behind `111`, take) and that is what actually killed me | Low |
| 38 | React in any way to finding Floyd dead - the scene the whole game has been building toward | Floyd is no longer a character. He is `mangled robot: 29 examine` under **In the room**, and the laser's contextual generator adds **`231 shoot mangled robot`** three lines below it | `29 examine` itself is perfect ("You turn to look at Floyd, but a tremendous sense of loss overcomes you, and you turn away") - the prose knows exactly what this moment is. The button list does not: one examine, no goodbye, no take, no cover, and an offer to shoot the corpse generated by the same blind rule that offers `pour on blue button`. Whatever filters contextual actions should have a "not this one" list, and a scene this authored deserves an authored option or two | Medium |
| 39 | Look through the window in the Bio Lab door - the room description points it out, and what is on the other side is what killed Floyd | `window: 25 examine`, which answers "I see nothing special about the window." | Same shape as row 32: the prose plants an object whose only purpose is to be looked *through*, and the layer offers the generic *examine* that returns the stock nothing-special message. A window, a crack, a mural and a sealed relay have all now behaved this way; "look through / look behind / look into" is a whole family of verbs the layer does not have | Medium |
| 40 | Treat the fever that came back at turn 878 ("you feel unusually weak, and you suspect that you have a fever") | The medicine bottle is still lying in Lab Storage, and `36 look inside` says "The medicine bottle is empty." Nothing anywhere else offers a cure, and nothing appears in the standing button row | The cure was a one-shot and the disease is not. That is the game's design, not the layer's. What *is* the layer's is that a lethal, running clock produces no marker of any kind: `4 diagnose` is the only readout and nothing ever points you at it, exactly as with starvation (row 35) and radiation. The standing row grows a button for hunger and for sleep; illness is the one timer it never speaks about | Medium |
| 41 | Ride the cryo-elevator down without wasting turns, on a fever clock with no cure | `13 wait for the elevator` - the standing-row "smart wait" that leg 1 praised for stopping exactly on arrival | It printed "Time passes..." three times, then ">> The elevator door opens onto a room to the north", and then **kept waiting for nine more turns** (turn 950 to 962). Twelve turns spent for three. The whole value of a smart-wait button is that you stop reading the output; when one overshoots it costs more than a plain `3 wait` ever could | Medium |
| 42 | Get past the microbe that lands on the strip and blocks the only exit | The microbe's own menu, `235 …`, is the generic character list: **examine, talk to, salute, attack, listen to** - the same five verbs Blather had on turn 1. `234 shoot microbe` wounds it and it heals every time. `219 shoot silicon strip` does nothing and cost me a life. The answer is `220 throw off the strip` on the *laser*, after heating it up by firing | The winning move is a contextual entry the generator prints on **every carried object in every room of the miniature world** - canteen, cards, battery, laser - which reads as pure noise (row 22) until the one moment it is the only thing that works. I found it from a line of prose ("a pseudopod, perhaps attracted by the warmth of the laser, tries to envelop the weapon"), not from the list. So the generator supplies the solution *and* buries it, and nothing distinguishes an affordance from the engine being thorough. Meanwhile the monster's own menu offers to salute it | High |
| 43 | Do anything at all after winning the game | `look` answers "The game is over. Start again with --new." and there is **no "On screen you can" block whatsoever** - not one number | The death screen at least offers `1 restore your saved game`. The victory screen offers a mouse-only player a command-line flag he cannot type. This is row 5 again, but worse, and on the one screen every player reaches if the game works | Medium |
| 44 | Keep a line of retreat before a fight I did not yet understand | `5 save` and `6 restore` are a single unnamed slot with no confirmation and no list | I saved at turn 919 (relay fixed, monster not yet arrived), then saved again at 920 out of habit once the microbe appeared - silently destroying the only state from which I could have avoided the fight. Two good things deserve saying alongside it: **`5 save` costs no turn at all** (the turn counter does not advance), which makes saving at every doorway free; and nothing on screen tells you that | Medium |
