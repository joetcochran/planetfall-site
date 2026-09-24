# Round 2: typed-2, typed

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 2, 10 September 2026
- **Mode:** typed: commands typed into the parser
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Dorm D, turn 218, with 14 points.
- **Commands:** 239, with no deaths

The diary below is `playtests/2026-09-10/2026-09-10-typed-2.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind playtest diary — typed input, session `typed-2`

**Who:** a blind playtester using free-text typed commands (no knowledge of the game, no source read).
**Date:** 2026-09-10
**Session:** `typed-2` (`node scripts/playtest.mjs --session typed-2 ...`)
**Budget:** ~250 commands total.

---

### Attempt 1, commands 1-5: Scrubbing floors under Blather's glare

Command tally: 5 / 250.

I open on Deck Nine of a Stellar Patrol ship, an Ensign Seventh Class with a scrub brush, ordered to polish the floor. The room says the corridor curves to starboard, a gangway leads up, and there's an escape-pod bulkhead to port. I take inventory first: brush, chronometer, uniform with an ID card inside. Ensign Blather barges in almost immediately, sneering and handing out demerits. That reads like flavour rather than a threat, so I ignore him.

I examine the bulkhead (just "closed") and try to open it. The game refuses with a nicely in-character line: "Why open the door to the emergency escape pod if there's no emergency?" That's a big hint: something bad is going to happen and the pod is my way out. I decide to explore upward while I wait for the "emergency". Up leads to a gangway, then Deck Eight, where Blather follows me and threatens forty demerits if I'm not back on Deck Nine in five seconds. I'm not sure whether demerits have any mechanical effect. I'm curious whether the Hyperspatial Jump Machinery Room to fore is enterable.

One small oddity: the time counter jumps by uneven amounts (4563 -> 4581 -> 4613 -> 4620 -> 4640). I can't tell what unit it is.



### Attempt 1, commands 6-16: Blather herds me home, then the ship blows up

Command tally: 16 / 250.

Every attempt to leave Deck Eight or the Reactor Lobby is stopped by Blather ("blocks your path", "throws you to the deck", "pushes you roughly back"). Those refusals do not advance the turn counter, which is kind. The message on the gangway ("distant bellowing ... something about an Ensign Seventh Class whose life is in danger") is a good nudge that the prologue is on a timer. Back on Deck Nine I try `scrub floor` (works: "a bit shinier now" - nice touch) and then `wait` four times. Blather wanders off, and on the fourth wait an explosion rocks the ship and the pod door to port slides open.

I go into the Escape Pod: automated controls and a mass of safety webbing. `get in webbing` is understood on the first try and the status line even changes to "Escape Pod, in the safety web". The door clangs shut behind me. Score went to 3 for entering the pod. Now I wait for the pod to do its thing.

Notes: the prologue is well signposted. The one thing I'd flag is that there was nothing to *do* during the wait except `wait`; a new player who keeps wandering might just get frustrated by Blather.

### Attempt 1, commands 17-34: The long ride down, and a wet exit

Command tally: 34 / 250.

Thirteen consecutive `wait`s carry the pod from ejection to touchdown. The travelogue is lovely (the Feinstein blows up, the gyros stabilise the tumble, an ocean planet with a small ice cap swings past, "Approaching planet...human-habitable.", atmospheric buffeting, a cliff island topped by a "sprawling complex of buildings"). A few of the waits produce nothing at all (turns 22-24), which briefly made me wonder if I'd missed a cue. Thirteen waits is a lot for typed play; I wouldn't cut the text, but a couple of the silent turns could go.

The pod lands "precariously balanced" and a panel opens with a survival kit and a towel. When I `get out of webbing` the pod falls and water rises past the viewport. `take kit and towel` fails with "You can't see any kit and towel here!" - the parser doesn't understand `X and Y` as a list, which was a surprise since the objects are right there. `take all` works fine and lists both. I open the bulkhead, water rushes in, and `out` puts me Underwater with "dim light filters down from above". `up` gets me to a Crag; score 6. A structure clings to the cliff eight meters above and the text practically tells me to climb.

Inventory now: brush, chronometer, uniform (ID card), towel, survival kit.

### Attempt 1, commands 35-42: The plaque speaks in phonetics; up into a ruin

Command tally: 42 / 250.

The Balcony has a plaque in "a corrupt form of Galalingua". `read plaque` gives phonetic English ("SEENIK VISTA ... Xis stuneeng vuu uf xee Kalamontee Valee ... Gulmaan Rivur ... formur pravincul kapitul bildeeng"). Once I sounded it out it read as "Scenic Vista, this stunning view of the Kalamontee Valley covers over forty square miles ... the large building at the bend in the Gulman River is the former provincial capitol building." Fun, and it tells me a valley and a river are somewhere near. I open the survival kit: red, brown and green goo. `examine red goo` says nothing special, so I'll assume it's food and hold it until I'm hungry.

Up, up, up: a Winding Stair, then a ruined castle Courtyard (openings north and west, stairs down south), then a Plain Hall of "much more modern style" branching north and northeast, then a Rec Area with games and tapes scattered around, exits east and south, and a locked door north with a dial set to 0. That dial is obviously a puzzle; I'll come back once I know a number. Nothing has said anything about hunger or sleep yet, and the score is 6.

### Attempt 1, commands 43-53: Dorms, toilets and a padlock

Command tally: 53 / 250.

The dial goes 0-1000, so I need a specific number from somewhere. Games and tapes are pure flavour (Double Fannucci gets a cameo). East of the Rec Area is a Rec Corridor with portals north and south and a branch southwest. North is Dorm B (hundreds of bunks, deserted) and beyond it SanFac B, a dead-end bathroom with a nice joke about toilet design. South is Dorm A, identical text to Dorm B; I assume SanFac A lies beyond and skip it to save commands. East again is the Mess Corridor: a big portal south and a small north door with a closed steel padlock. The task prompt's example command "open padlock with pliers" is rattling around my head, so I'll be looking for a tool. Still no hunger or fatigue messages. Map so far is a neat grid, easy to hold in my head.

### Attempt 1, commands 54-62: The Mess Hall, a slot, and the wrong card

Command tally: 62 / 250.

The padlock "nothing special". South of the Mess Corridor is the Mess Hall: tables, benches, a closed south door with a small slot beside it, and an octagonal canteen on a bench. I take the canteen. `examine slot`: ten centimetres wide, two deep, ridges on the long sides - a card reader. `put card in slot` gives a genuinely helpful failure ("It may be possible to slide something through the slot, though"), so `slide card through slot` - and the sign flashes "Inkorekt awtharazaashun kard...akses deeniid." Fine: my Patrol ID doesn't work here, there must be a local authorisation card somewhere. The canteen is empty, so I'll want to find water for it. I'm building a shopping list: a number for the dial, a tool for the padlock, a card for the slot, water for the canteen.

Friction: `examine padlock` and `examine red goo` both give the generic "nothing special", which is fine for the goo but for the padlock I'd have liked a hint about what could open it.


### Attempt 1, commands 63-71: The long walkway, an elevator lobby, and a dead teleporter

Command tally: 71 / 250.

East of the Mess Corridor is the Dorm Corridor (Dorm D north, presumably Dorm C south - I skip them) and a "tremendously long" hall lined with a dead motorized walkway. `east` walks me the whole way in one command ("You walk down the long, featureless hallway for a long time") to a Corridor Junction with a north-south cross corridor. It cost 160 time units, which is the first sign the time counter tracks distance. East again is a bright Elevator Lobby: blue door north with a blue button, larger red door south with a red button, and a booth east. `push blue button` gets a whirring noise - an elevator on its way. I duck into Booth 2 meanwhile: a slot, a brown "1" button and a tan "3" button. `push tan button` -> "Teleportaashun buux not aktivaatid." So it's a teleporter network and it's switched off somewhere. The phonetic-spelling signs are consistently readable and I've come to enjoy them.


### Attempt 1, commands 72-83: A dead elevator, a rift, and a status board for the whole planet

Command tally: 83 / 250.

The blue elevator arrives and I get in: Up, Down and a narrow slot. Up does "Nothing happens" and my ID card is again "Inkorekt". So the whole complex is gated on one missing card, or on power. The Corridor Junction's north branch is Admin Corridor South (cracked walls, a crevice in the floor, another dead-end SanFac E to the east), then Admin Corridor, where the building has been torn open by a quake: sky above, rubble, and a rift eight metres wide and thirty deep to the north. West is "Sistumz Moniturz": a wall of status monitors. LIIBREREE, REEAKTURZ and LIIF SUPORT are green; PLANATEREE DEFENS, PLANATEREE KORS KUNTROOL, KUMUUNIKAASHUNZ and PRAJEKT KUNTROOL show faults. That's the clearest statement of the game's goals so far: something on this planet is broken in four places, and Course Control and Defense sound like the planet itself is in trouble. The equipment is "too complicated" to operate, which is fair.

Where I stand: I have found three locked things (padlock, dial door, card door), a dead elevator, a dead teleporter and a rift, and no tools or cards. Unexplored leads: Courtyard west, Plain Hall northeast, Rec Corridor southwest, Admin Corridor north past the rift, Elevator Lobby's red door, Dorm C / SanFac A, Junction south.


### Attempt 1, commands 84-94: A glint in the crack, and "Nice try"

Command tally: 94 / 250.

The rift is "too wide to jump across". On the way back south the game drops a great cue: "a glint of light from the direction of the floor" in Admin Corridor South. Then, at the Junction, "A growl from your stomach warns that you're getting pretty hungry and thirsty." I eat the red goo ("scrumptious cherry pie") but I have nothing to drink; I'll need water soon. Back at the crevice, `examine floor` says nothing special (mild sting after the glint hint) but `examine crevice` finds a shiny steel key. `take key`: fingers too large. `get key with brush`: "Nice try." That response tells me it's the wrong tool but not why, and it's a bit smug; I'd prefer "The brush is far too thick for the crack." So: the key wants something thin, or a magnet. It presumably opens the padlock. Now to the Mech Corridor rooms south of the Junction.


### Attempt 1, commands 95-105: The parts room

Command tally: 105 / 250.

Storage East, off Mech Corridor North, is the first real loot: an oil can on a shelf and a cardboard box holding a cracked seventeen-centimeter fromitz board, a B-series megafuse, a K-series megafuse and a good ninety-ohm bedistor. `take all` grabs the oil can but the box is "too heavy" with everything I carry. I drop the scrub brush (finally) and try `take all from box`, which the parser mangles into "You can't see any all from box here!" - a second list-handling failure. Four individual takes work. The parts have deliberately silly names but "cracked" versus "good" is a clear flag that one of these is a decoy and there's a repair puzzle somewhere. West of the corridor is the Physical Plant: huge, dim, catwalks, mostly dead heating and ventilation gear, exits northeast and southeast.

Inventory: chronometer, uniform (ID card), towel, survival kit (brown goo, green goo), canteen (open, empty), oil can, fromitz board, two megafuses, bedistor.


### Attempt 1, commands 106-117: Reactor Control and a chemistry set

Command tally: 117 / 250.

South of the Physical Plant the Mech Corridor continues. East off it is Reactor Control: dials and gauges for a planetary reactor buried far below, a dark stairway winding down (no light source, so not yet), and a metal door with a button. The button opens it to the Reactor Elevator - Up, Down, small slot - and Down does "Nothing happens" like its cousin. Two elevators, one teleporter and one door all wait on a card I don't have. Mech Corridor South forks southwest/south/southeast. South is a Machine Shop with a dispensing machine: KUULINTS 1-4 (red, blue, green, yellow), KATALISTS 1-3 (gray, brown, black), and two white buttons, square BAAS and round ASID. I'm holding an empty canteen; acid seems like the obvious thing to try on the padlock or the crack. `examine spout` is "nothing special", so I'll just try it.


### Attempt 1, commands 118-124: Acid splashes, and Floyd wakes up

Command tally: 124 / 250.

`put canteen under spout` works, but `push round button` (ASID) just splashes the fluid over the canteen's narrow mouth. So the dispenser needs a wider container or a funnel. No harm done, apparently. East of the shop is the Robot Shop: piles of disassembled robots and one four-foot unit that might work. `examine robot`: de-activated, general-purpose, "apparently been turned off". `turn on robot` says "Nothing happens" but the score jumps to 8, which is a mixed signal - the text says failure, the score says success. One `wait` later the robot boots: "Hi! I'm B-19-7, but to everyperson I'm called Floyd. Are you a doctor-person or a planner-person? That's a nice chronometer you are having there. Let's play Hider-and-Seeker you with me." Delightful. Now I have a companion with small hands, and a key in a narrow crack. I know exactly where we're going.


### Attempt 1, commands 125-148: Floyd would rather play

Command tally: ~148 / 250 (turn 134; about a dozen commands were rejected without using a turn).

`floyd, follow me` gets a cheerful "Okay!" and he follows room to room with "Floyd follows you." I walk him six rooms to the crevice, and on arrival the room text now says "Lying at the bottom of a narrow crevice is a shiny object" (which it didn't before I'd examined it - fine). `floyd, get key`: "Enough talking! Let's play Hider-and-Seeker." `floyd, take key from crevice`: parser gibberish again. `play with floyd`: a lovely bit ("several centichrons until you drop to the floor, exhausted") but afterwards the same whine. The order is clearly understood (it's not a parse error) and the refusal costs no turn, which makes me think Floyd simply can't or won't do this, rather than that I've phrased it wrong. So either the key needs some other tool, or Floyd needs something else first. I'm spending too much here. Thirst is the pressing problem - the stomach warning was at turn 86 and I haven't found a drop of water. I'll go check the red door in the Elevator Lobby, which is two rooms away, and then sweep the unexplored exits in the south (Machine Shop west, Mech Corridor South SW/SE, Robot Shop NW).


### Attempt 1, commands 149-177: The Tool Room, and the magnet earns its keep

Command tally: ~177 / 250 (turn 162).

The red door is a slower "Lower Elevator" with the same dead slot; I don't bother pressing anything. Heading south I overshoot into the Machine Shop and take its west exit, which turns out to be the room I've needed all along: the Tool Room. Glass flask (wide mouth - for the dispenser), a U-shaped metal bar, wide-nosed pliers, and an "Akmee Portabul Laazur" containing an old battery. Floyd barrels in behind me with "Floyd not looking at where he was going to." My load limit bites again, so I dump the towel and the four repair parts here and take flask, bar and pliers; the laser is still too heavy on top, and its battery is described as "old", so it stays. Floyd's idle chatter while I shuffle inventory is charming and does its job - he "frets about the possibility of his batteries failing", scrawls his name on the wall in crayon, gossips about a Dr. Fizpick. The battery fretting sounds like a hint about the laser battery.

Six rooms north with Floyd bounding after me, then `get key with bar`: "With a spray of dust and a loud clank, a piece of metal leaps from the crevice and affixes itself to the magnet. It is a steel key!" Very satisfying. Now west, all the way back to the Mess Corridor padlock.


### Attempt 1, commands 178-200: Behind the padlock: Spam and Egz and a ladder

Command tally: ~200 / 250 (turn 179).

`unlock padlock with key` works first time ("The padlock springs open"). Then a small comedy: `open door` says it can't be opened "until the padlock is removed", `remove padlock` says "You aren't wearing that." (ouch - the game's own word, rejected), and it's `take padlock` that does it. Storage West beyond: an unopened tin of "Spam and Egz" and a heavy-duty extendable ladder. Score 12. The ladder is obviously for the eight-metre rift. I can't lift it even after dropping the padlock, key, oil can and magnet; whatever the weight system is, the ladder wants nearly empty hands and the game never says so, just "Your load is too heavy" every time. `take can` correctly asks "the tin can or the oil can?" - good disambiguation.

I eat the brown goo (Nebulan fungus pudding), and the game immediately tells me I'm weary and should find "a nice safe place to sleep". So I now have three clocks running (thirst, sleep, and whatever the monitors are counting down) and I have found no water anywhere. `open tin can with pliers`: "That doesn't work." Presumably the laser, whose battery is old. Plan for the last fifty commands: drop everything but the pliers, carry the ladder to the rift, cross, and see what's on the other side.


### Attempt 1, commands 201-216: The ladder is lost forever

Command tally: ~216 / 250 (turn 192).

`--status` shows I'm carrying only pliers, chronometer, uniform and ID card, and `take ladder` still says "Your load is too heavy." I examine the ladder ("heavy-duty ... currently collapsed ... around two-and-a-half meters long, but if extended would obviously be much longer") and drop the pliers; with nothing at all in my hands the ladder is finally "Taken." So the ladder needs empty hands and the message never distinguishes that from ordinary overloading.

I carry it five rooms to the rift and type `put ladder across rift`. "The ladder, far too short to reach the other edge of the rift, plunges into the rift and is lost forever." I had just read that it extends. I did not type `extend ladder` first because "put across" felt like the obvious verb and I expected either success or a "too short - maybe extend it" refusal. Instead the only ladder in the game is gone and this attempt can no longer cross the rift. It's the first time the game has punished a reasonable first try with an unrecoverable loss, and it comes at the end of a long chain of fetching (magnet -> key -> padlock -> ladder). I'm not going to restart with 30-odd commands left; I'll spend them on the unexplored exits in the south and then write up.


### Attempt 1, commands 217-246: The laser works, a night's sleep, and a silent robbery

Command tally: ~246 / 250 (turn 218). Stopping here.

Southwest of Mech Corridor South is just the Tool Room, so the southern loop is fully mapped. With empty hands I take the laser: six-setting dial (on 5), old battery on top. `turn on laser` -> "You can't turn that on." (unhelpful for a device with a dial), `fire laser at wall` -> "You can't see any wall here!", but `fire laser at towel` produces a narrow blue beam and the towel "bursts into flame ... and is quickly consumed." So the "old" battery has charge, and I got two points for incinerating my towel, which I don't understand. This is almost certainly how the Spam and Egz tin opens, but the tin is eight rooms away and I'm out of budget.

The sleep clock escalates nicely ("If you don't get some sleep soon you'll probably drop", "You can barely keep your eyes open"). In Dorm D, `sleep` still says "Civilized members of society usually sleep in beds" - while I'm standing in a room described as lined with bunks. `get in bunk` fixes it ("the bed is soft and comfortable") and a few waits later I sleep, get an ominous drowning dream about a bully and a pond, and wake on "SEPTEM 7, 11344" with the time counter reset to 1670 and Floyd bouncing at the foot of the bed. Then `get out of bed` and `--status` show I'm carrying only my chronometer and uniform. `look` reveals the laser and my ID card lying on the floor: everything I held, including the card that was inside the uniform I'm wearing, was dropped during the night with no message at all. On a longer run that could cost someone a critical item without their noticing.

Final state: Dorm D, day 2, score 14, thirsty (no water found in the entire run), ladder lost in the rift. Map covered: the ship prologue, crag/balcony/stair, castle courtyard, Plain Hall, Rec Area, Rec Corridor, Dorms A/B/D + SanFacs B/E, Mess Corridor/Hall, Storage West, Dorm Corridor, walkway, Corridor Junction, Elevator Lobby + both elevators + Booth 2, Admin Corridors, Systems Monitors, Mech Corridors, Storage East, Physical Plant, Reactor Control + elevator, Machine Shop, Tool Room, Robot Shop. Not explored: Courtyard west, Plain Hall northeast, Rec Corridor southwest, Dorm C / SanFac A, the dark stairway in Reactor Control, beyond the rift, and everything behind the card slots.

### Friction log

| # | Attempt/cmd | Where | What happened | Why it hurt | Suggested fix |
|---|---|---|---|---|---|
| 1 | 1/1-5 | Deck Nine | Time counter advances by uneven amounts (18, 32, 7, 20) per turn with no unit shown | I can't tell whether time matters or what the scale is | Show a unit or make the status-line time more legible (e.g. "4640 (day 1)") |
| 2 | 1/30 | Escape Pod | `take kit and towel` -> "You can't see any kit and towel here!" | Parser treats "X and Y" as one noun; standard IF players expect lists | Support `and`/comma lists in TAKE/DROP, or at least reply "one thing at a time" |
| 3 | 1/54 | Mess Corridor | `examine padlock` -> "nothing special" | The padlock is clearly a puzzle; zero information | Describe it (e.g. "a cheap steel padlock; the hasp looks thin") to hint that a tool could cut/pry it |
| 4 | 1/91 | Admin Corridor South | After the "glint of light from the floor" cue, `examine floor` -> "nothing special"; only `examine crevice` reveals the key | The hint names the floor, the object is under the crevice; first natural follow-up fails | Let `examine floor` / `search floor` mention the crevice and the glint |
| 5 | 1/94 | Admin Corridor South | `get key with brush` -> "Nice try." | Snarky, zero information about why the brush fails | Say what property the tool lacks ("too thick", "not magnetic") |
| 6 | 1/99 | Storage East | `take all from box` -> "You can't see any all from box here!" | "ALL FROM <container>" is standard IF; the error is nonsense text | Support `take all from X`, or reply "You'll have to take things out one at a time" |
| 7 | 1/98 | Storage East | `take all` tries to take the cardboard box itself and fails on weight, without taking its contents | Player wanted the parts, not the box | Have `take all` prefer loose items and container contents over fixed/heavy containers |
| 8 | 1/123 | Robot Shop | `turn on robot` -> "Nothing happens." but score rises by 2; robot boots one turn later | Text says the action failed while the score says it worked; I nearly tried other verbs | Give a cue on the same turn ("A faint hum starts somewhere inside the robot.") |
| 9 | 1/124-125 | Robot Shop | `ask floyd about card` -> "You can't see any floyd about card here!"; `floyd, tell me about the key` -> "You can't see any me about key here!" | The task brief says asking characters about things is a supported verb; the parser swallows ASK/TELL ABOUT into a noun phrase and the error text is gibberish | Implement ASK X ABOUT Y / X, TELL ME ABOUT Y, or reply "Floyd doesn't seem to understand questions" |
| 10 | 1/132-134 | Admin Corridor South | `floyd, get key` -> "Enough talking! Let's play Hider-and-Seeker." (no turn used), before and after playing with him | The obvious use of a small-handed companion is refused with a generic whine; I can't tell whether the puzzle is Floyd-unrelated or I need a precondition | If Floyd is the answer later, hint at it ("Floyd peers into the crack. 'Too dark down there!'"); if not, have him say why he can't |
| 11 | 1/132 | Admin Corridor South | `floyd, take key from crevice` -> "You can't see any key from crevice here!" | Any prepositional phrase in an order breaks parsing | Strip/handle FROM/IN/WITH phrases in orders to characters |
| 12 | 1/168 | Mess Corridor | Game says door can't open "until the padlock is removed"; `remove padlock` -> "You aren't wearing that." | The game's own verb is rejected with a clothing message | Map REMOVE on non-worn things to TAKE, or accept `remove padlock` explicitly |
| 13 | 1/174-176 | Storage West | `take ladder` -> "Your load is too heavy." repeatedly, even after dropping four items | No feedback on how much lighter I need to be; trial-and-error drops burn commands | Say "You'd need both hands free" / "far too heavy with everything else you're carrying" |
| 14 | 1/86-179 | everywhere | Hunger/thirst warning at turn 86, again at 165, sleep warning at 178; no drinkable water found in ~40 rooms | The needs clock is running well ahead of the map; I have a canteen and no way to fill it | Put a water source (or a hint to one) in the first hour of exploration, or slow the thirst clock |
| 15 | 1/192 | Admin Corridor | `put ladder across rift` with the collapsed ladder: "far too short ... plunges into the rift and is lost forever" | Unrecoverable loss of a unique key item on the most natural first attempt; the extend step is only implied by the examine text | Either refuse ("It's far too short as it is - it would just fall in"), or auto-extend, or at least let the ladder be recovered from the rift floor |
| 16 | 1/200 | Tool Room | `turn on laser` -> "You can't turn that on." though `fire laser at X` works | A device with a dial and a battery refusing "turn on" with a generic message sends the player off to find a battery | Reply "The laser has no on switch; you aim it and fire." |
| 17 | 1/203 | Tool Room | Firing the laser at the towel destroys it and awards 2 points | Rewarding the destruction of an item is confusing; I don't know if the towel mattered | Either don't score it or make the points come from a clearer trigger (first use of the laser) |
| 18 | 1/210 | Dorm D | `sleep` in a room "lined with multi-tiered bunks" -> "Civilized members of society usually sleep in beds." | The room is full of beds; the game wants `get in bunk` first but doesn't say so | Have SLEEP in a dorm auto-enter a bunk, or say "You'd better get into one of the bunks first" |
| 19 | 1/213-217 | Dorm D | Waking up, everything I carried (laser, and the ID card that was inside my worn uniform) is on the floor with no message | Silent inventory loss; the card falling out of a worn garment makes no sense; easy to walk away without it | Print "While you slept, your things slipped to the floor" or keep worn/contained items on the player |
| 20 | 1/202 | Tool Room | `fire laser at wall` -> "You can't see any wall here!" | Rooms have walls; the refusal breaks immersion when I just want to test the device | Add a generic "wall"/"floor" scenery noun, or a "fire laser" with no target that fires harmlessly |

### Report

**What I was trying to do.** I played one continuous attempt of about 246 typed commands, cold, with no knowledge of the game. My goals shifted as the game revealed them: survive the ship, get off the sinking pod, climb into the complex, and then, once I'd seen the Systems Monitors wall, fix whatever is broken (Planetary Defense, Course Control, Communications, Project Control show faults). In practice the run was a scavenger hunt: every door and machine I found wanted an object I didn't have yet.

**The path I found.** Deck Nine -> wait for the explosion (Blather blocks every other direction, harmlessly) -> escape pod -> webbing -> 13 waits -> pod falls into the sea -> open bulkhead, swim up -> Crag -> Balcony (phonetic plaque) -> Winding Stair -> Courtyard -> Plain Hall -> Rec Area (dial door, 0-1000) -> Rec Corridor -> Dorms/SanFacs -> Mess Corridor (padlocked door) -> Mess Hall (canteen; card slot rejects my Patrol ID) -> Dorm Corridor -> the long dead walkway -> Corridor Junction -> Elevator Lobby (blue and red elevators, both need a card; teleport Booth 2 "not aktivaatid") -> Admin Corridor South (key glinting in a crevice) -> Admin Corridor (eight-metre rift; "Sistumz Moniturz" status wall) -> south to the Mech corridors -> Storage East (oil can, fromitz board, two megafuses, bedistor) -> Physical Plant -> Reactor Control (dark stairway, reactor elevator also wants a card) -> Machine Shop (chemical dispenser: coolants, catalysts, base, acid; canteen mouth too narrow) -> Robot Shop -> turn on Floyd -> Tool Room (flask, magnet bar, pliers, laser) -> magnet fetches the key -> key opens the padlock -> Storage West (Spam and Egz tin, extendable ladder) -> carry ladder to the rift -> lose it -> laser works after all (burned my towel to prove it) -> sleep in Dorm D -> day 2.

**Where I got stuck and why.** Three places, in ascending order of severity.
1. *Floyd and the key.* I assumed a small robot could reach into a narrow crack. `floyd, get key` is understood but refused with a generic "Enough talking! Let's play Hider-and-Seeker" before and after playing with him. The real answer (the magnet in the Tool Room) was fine once I found it, but the refusal gave no signal that I was on the wrong track, so I burned ~15 commands there.
2. *Water.* Thirst warnings started at turn 86 and I never found a single drop in roughly forty rooms, despite carrying an empty canteen and later a flask. The one liquid source (the dispenser) offers coolant, catalyst, acid and base. If water exists behind a card slot or across the rift, the thirst clock is running far ahead of what a blind player can reach.
3. *The ladder.* Carrying the collapsed ladder to the rift and typing `put ladder across rift` destroyed it permanently. The examine text does mention that it extends, but a first attempt with the most natural verb should not delete the only ladder in the game. This single response ended the attempt's forward progress.

**Biggest points of confusion.**
1. The ladder loss (above). It's the one moment the game felt unfair rather than hard.
2. The weight system. "Your load is too heavy" is the only message for everything from "one item too many" to "this needs both hands completely free" (the ladder, which refused me while I carried nothing but pliers). I spent about fifteen commands dropping things one at a time.
3. Talking to Floyd. The brief says ask characters about things; `ask floyd about X` and `floyd, tell me about X` both produce garbled "You can't see any floyd about card here!" errors. Orders with prepositions (`floyd, take key from crevice`) fail the same way. Only the bare `floyd, follow me` / `floyd, get X` shape parses.
4. Contradictory feedback: `turn on robot` says "Nothing happens" while awarding points; `remove padlock` says "You aren't wearing that" right after the game said the padlock must be removed; `sleep` in a room full of bunks says to sleep in a bed; `turn on laser` says it can't be turned on but `fire laser at` works.
5. Silent inventory loss on waking: the laser and even the ID card inside my worn uniform ended up on the floor with no message.

**What worked well.** The writing is consistently good and the phonetic signage ("Inkorekt awtharazaashun kard", "Teleportaashun buux not aktivaatid", "Sistumz Moniturz") is both a joke and a readable clue system. The prologue is tightly signposted: Blather's blocking costs no turns, the gangway bellow tells you your life is in danger, the pod refuses to open "if there's no emergency". Discovery moments land: the glint in the crevice, the key leaping onto the magnet, the padlock springing open, Floyd waking up mid-sentence. Floyd's idle lines (batteries, crayon, pi, Lazarus, Carmen) are the best thing in the game and "frets about his batteries failing" doubles as a hint. The status line with room/turn/time/score is genuinely useful, and the parser is good at the basics: `get in webbing`, `put canteen under spout`, `get key with bar`, `unlock padlock with key`, `slide card through slot` all worked the first time, and the "slot is shallow ... may be possible to slide something through" failure was a model of a helpful refusal. Disambiguation ("the tin can or the oil can?") is correct. The Systems Monitors room is an excellent way to tell the player what the game is about without a lecture.

**What I would change.**
- Make the collapsed-ladder-across-rift attempt a refusal, not a loss (or let it be recovered).
- Distinguish "too heavy overall" from "needs empty hands", and consider raising the carry limit slightly; the game hands out a dozen small parts early.
- Support ASK X ABOUT Y and X, TELL ME ABOUT Y with at least a stock Floyd answer, and strip prepositional phrases in orders.
- Put a reachable water source in the first hour, or slow the thirst clock; and make hunger/thirst/sleep messages mention how long you have.
- Fix the contradictory messages listed above (robot power-on, `remove padlock`, `sleep` in dorms, `turn on laser`) and print a line when items are dropped during sleep.
- Support `take X and Y` and `take all from X`; the errors they produce today are word salad.
- Consider trimming two or three of the silent turns in the pod descent.

#### Verdict
A faithful, well-written remake whose parser handles the classic verbs well but stumbles on lists, prepositions in orders, and conversation. The first act (ship, pod, cliff, complex) plays smoothly and the fetch chain magnet -> key -> padlock -> ladder is satisfying to work out. The run was ended not by difficulty but by one unforgiving response (the ladder) and one missing resource (water). Fix those two and the contradictory refusals, and this is very playable for a blind typed-input player. I reached score 14 in one attempt, day 2, with the rift, the card-locked doors, the dial door, the teleporters and the dark stairway all still ahead of me - and I'd happily keep going.
