# Round 20: click-20, by mouse, as a Zork player new to Planetfall

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The third milestone](playing-it.md#the-third-milestone-every-way-of-playing-wins-blind), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 20, 23 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the start (Deck Nine, turn 0), in 3 legs
- **Played as:** an adult who knows Zork and its kind but had never played Planetfall
- **Result:** **Won 80 of 80** at turn 627.
- **Commands:** 1,325, with 10 deaths

**About the numbers.** Played as an adult who knows Zork and its kind but has never played Planetfall, seed 20, in three legs. Game 1 reached 42 (transcript line 14540) and died five times: the Feinstein at turn 16, the Bio Lab door at 410, and three collapses from lack of sleep at 510-512, each restored to a save made at 507 that had no way on; it restarted at transcript line 15030 after 585 commands. Game 2 won 80 of 80, Galactic Overlord, at turn 627, in 740 commands, with five deaths, all restored: the Bio Lab door, radiation poisoning twice and the microbe twice. The diary counts about 397, 395 and 305 commands for its three legs (about 1,100); the transcript has 1,325 lines beginning "> ".

The diary below is `playtests/2026-09-23/2026-09-23-click-20.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down. Words in ***bold italic*** are a paraphrase: this history does not quote the user.

## Playtest round twenty: click-only, from the start (seed 20)

- Mode: click only (numbered options, as a mouse player)
- Start: from the start, `--new --seed 20 --click`
- Persona: an adult who has played plenty of text adventures (Zork I-III, Enchanter, Hitchhiker's), knows the genre's habits (map, examine everything, save before risk, watch light and hunger), but has never played Planetfall.
- Hard cap: game turn 1000. Leg budget: about 400 commands.

### Friction

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 1 | 2-5 | Deck Nine | The ambassador drops a "piece of celery" in the room, but it only offers "examine". No take. | A typed-parser player would try TAKE CELERY. Here it looks like a thing and you can't pick it up, and nothing says why. Probably a red herring, which is fine, but it's a dead end you can't test. |
| 2 | 6 | Deck Nine | Slime on my freshly polished deck, a scrub brush in hand, and no "scrub slime" / "clean slime" option. The brush only offers examine and drop. | The first joke of the game is set up (scrub-brush ensign, slime) and the click menu can't take part. Felt like a missing verb. |
| 3 | 7 | Reactor Lobby | Blather yells at me the moment I leave Deck Nine. Went back. | Good: tells me clearly to stay put, which is where the action is. |
| 4 | 11-16 | Deck Nine | First life: I waited several turns without reading the output (my own slip), missed "The door to port slides open", and the bulkhead shut again before I could act. "Open bulkhead" then gave "Too late" and death. | Mostly my fault, but the window is only ~3 turns and the open door message is one line among the ambassador chatter. Having saved at turn 5 saved me. RESTORE worked cleanly. |
| 5 | 11 | Deck Nine | Once the door is open, "get in escape pod" is offered right there. | Helped: the obvious action is one click. |
| 7 | 44 | Rec Area | North door locked by a combination dial "0 to 1000". The dial is a clickable "set to a number <value>" option. | Clear, and the value entry fits click play. No clue to the number yet. |
| 8 | 62-63 | Mess Hall | Door asks for a "kitcin akses kard". My ID card gets a "slide through slot" option as soon as a slot is in the room, which is neat, but it's refused. | Helped: the contextual "slide through slot" appearing on the card taught me the mechanic without a hint. |
| 9 | 74 | Dorm Corridor east | "go east" is a 3-hour walk down the dead walkway, and the game says so: "(That walk took about 3 hours.)" | Helped: the note makes the time cost visible. A bit alarming with a hunger clock running. |
| 10 | 75 | Elevator Lobby | Hunger warning in bold with "The goo in your survival kit would take care of both" plus an "eat the blob of red goo" button and "diagnose (hungry, about 14 hours)". | Big praise: exactly the nudge a click player needs, and a timer to plan by. |
| 11 | 84-91 | Elevators, Booth 2 | Both elevators and the teleport booth need an access card; ID card refused. Three locked card-slot doors now. | Fine as a puzzle signpost; I'm now hunting for cards. |
| 12 | 106-111 | Admin Corridor South | "examine crevice" reveals a shiny steel key; "take key": fingers too big. | Classic, fair puzzle. The room description now mentions the shiny object, good. |
| 13 | 115 | Storage East | "take all" over-weight: the message names exactly what to drop ("dropping the scrub brush would make enough room") and mentions the uniform pocket. | Praise: inventory limits explained in click-friendly terms. |
| 14 | 134 | Tool Room | Picking up the curved metal bar: "the bar is a strong magnet ... it will smear the card's magnetic stripe." | Praise and a clear hint: it's a magnet (for the key!), and a warning before damage instead of after. |
| 15 | 134 | Tool Room | Taking the pliers while over-loaded dropped both the bar and pliers, and the turn counter didn't advance on the refused takes. | Slightly confusing: the bar I had just taken fell back to the floor. |
| 16 | 142-143 | Admin Corridor South | With the magnet carried, the key grows a "take with magnet" option. Got the steel key. | Praise: the contextual verb turned the "aha" into a click. No points for it, oddly. |
| 17 | 151-154 | Robot Shop | Turned on the robot (+2); Floyd wakes, complains of an itch in his compartment; "search Floyd" pops out the lower elevator access card. | Praise: charming, and the itch line points straight at the action. |
| 18 | 156 | Robot Shop | Floyd reacts to SAVE ("Are we gonna try something dangerous now?"). | Praise, made me laugh. |
| 19 | 162 | Lower Elevator | The diagnose button already reads "(hungry, about 14 hours)" and an "eat the blob of brown goo" button appeared, but I didn't notice a hunger message this time (may have scrolled past). | Mild: easy to miss if you're moving fast; the button label is the only trace. |
| 20 | 167 | Lower Elevator | Tiredness warning names the dorms that have bunks. | Praise for naming where to sleep, but they're a 3-hour walk west of here and I'm now at the bottom of a shaft. Worried. |
| 21 | 171 | Kalamontee Platform | Notice: shuttle runs "until 6000", after that needs special authorization. Shuttle control says "controls are not currently activated"; lower-elevator card refused. | Fair; another card to find. The time was 8278 so I couldn't tell whether the hours or a card was the issue. |
| 22 | 188-192 | Dorm D | Slept in a bunk: nice nightmare vignette, new day Septem 7, "things you were carrying slipped to the floor", and the "get out of the bed (to reach what is on the floor)" button plus take all recover everything. | Praise: smooth in click play. |
| 23 | 203 | Storage West | Typed "padlock drop" (my slip) and got "not one of the options on screen (I don't know the word padlock)". | Mild: the item's number had changed after I took it; the phrase form works only as the menu spells it. Fine. |
| 24 | 203 | Storage West | Ladder too heavy: "You'd have to drop the survival kit, the padlock, the canteen and the oil can first." | Praise for naming the list; "drop all" then take ladder then retake the kit worked. |
| 25 | 209 | Corridor Junction | "You feel a bit weak and slightly flushed, but you're not sure why." Diagnose now says feverish. | A new clock: disease. Unnerving but fair warning. No idea of the cure yet. |
| 26 | 213-217 | Admin Corridor | Ladder: "You couldn't possibly extend the ladder while you're holding it" -> drop -> "open" extends to 8 m -> "put across rift" appears -> cross (+4). | Praise: each step's refusal points to the next click. "open" as the verb for "extend" was a small guess. |
| 27 | 266 | Storage West | "take all" in a room with lots of things: items juggle and "slip from your arms" (tin can drops while taking canteen, card drops while taking oil can). | Messy: take all picked up junk I didn't want (padlock, tin) and dropped things I did. A "take all" that stops when full would read better. |
| 28 | 275-279 | Kitchen | Room text says "You should probably examine it more closely"; octagonal niche + octagonal canteen; "put in" list, push button, canteen fills with brown liquid. +4 for entering. | Praise: well signposted. |
| 29 | 295-325 | Shuttle Alfie | Shuttle card activated the controls; push lever = +5/turn, centre holds, pull = -5/turn. Passed "Limit 45", held 35, "Halfway mark -- begin deceleration" -> pulled, and the car stopped dead in the tunnel with no station. Door: "Operator should remain in control cabin while between stations." Pushed to 5 and held; countdown signs "15", "10", "5" with red lights, then "approaching a station" -- I held 5 and it smashed into the far wall. "Unhealthy crunching sounds" but diagnose shows no injury. | The halfway sign made me think decelerate now and all the way; stopping mid-tunnel was confusing (no message that I was short). The 15/10/5 signs were the real brake cue and I misread them as distance only. The crash text sounds lethal/injuring but diagnose says fine, so I don't know if I've been hurt. |
| 30 | 305 | Shuttle | "open the canteen and drink" appears as a standing button when hungry. | Praise. |
| 31 | 339-341 | Infirmary | The medicine only offers "taste" until the bottle is opened; then "drink" appears and cures the fever. | Mild: had to think to open the bottle first; "taste" alone looked like the only way to take it and I was wary of it. |
| 32 | 336 | Infirmary | Floyd finds Lazarus's breastplate and runs off sobbing. | Praise: a real emotional beat, well placed. |
| 33 | 349-352 | Planetary Defense | Four fromitz boards, one is bad, and "examine" gives identical text for all four. | Open question: no way I can see to tell the bad one from the good ones by clicking. |
| 34 | 336 | Infirmary | "take all" again juggled: spool dropped while taking the bottle. | Same as #27; take all is unreliable near the weight limit. |
| 6 | 26-28 | Escape Pod | Landing: "precariously balanced". Standing up (a nice "get out of the safety web (to reach what is on the floor)" button) drops the pod into the water; take all, open bulkhead, up x4 through a depth-3 underwater section to the Crag. | Praise: the underwater "depth 3 of 3" counter makes the swim readable. The pod falling when I stood was a mild scare but not fatal. |

### Narrative

#### Commands 1-57 (turns 0-35): the Feinstein and the pod

Started on Deck Nine with a scrub brush, chronometer, uniform with an ID card (ID 6172-531-541, magnetic stripe). An alien ambassador turned up, handed me a joke brochure, dropped celery and slime, and left up the gangway. East is the Reactor Lobby, where Ensign Blather put demerits on me for leaving my post, so I went back. SAVE at turn 5 on Deck Nine.

First life: explosions started around turn 11 and the port escape-pod door slid open. I missed it and the door shut by turn 14; "open bulkhead" said the pod was already launching and the ship blew up with me on board. Died at turn 16. RESTORE to turn 5.

Second life: went east and back (Blather), waited, the door opened on turn 11, got in the pod (+3), got into the safety web, and waited out the launch, the Feinstein exploding, and a long descent to an ocean planet with a plateau of buildings on an island. The pod landed precariously on a cliff, a panel opened with a survival kit and a towel. Standing up tipped the pod into the sea. Took the kit and towel, opened the bulkhead (water rushed in), and swam up three depth levels to a **Crag** (+3, score 6). SAVE at the Crag, turn 35.

Goals: climb to the structure above, open the survival kit, find food/water (genre instinct says hunger will matter), map the complex on the plateau.

#### Commands 58-115 (turns 35-94): the complex

Survival kit holds red, brown and green goo; the towel says "Don't Panic!". Up from the Crag: Balcony (plaque in phonetic spelling: "Seenik Vista", Kalamontee Valley, old provincial capital at the bend of the Gulmaan River), Winding Stair, Courtyard (exits N, W, S-down). North: Plain Hall (N, NE, S), Rec Area (games, tapes, north door locked with a 0-1000 combination dial), Rec Corridor (N Dorm B/SanFac B, S Dorm A/SanFac A, all empty; E, SW back to Plain Hall). East: Mess Corridor (north door padlocked; south Mess Hall). Mess Hall: took a canteen (opened, empty?), south door wants a kitchen access card; my ID card refused. East: Dorm Corridor (Dorm D/SanFac D north, Dorm C/SanFac C south, empty). East along the dead walkway: 3-hour walk to Corridor Junction. East: Elevator Lobby: blue (Upper) and red (Lower) elevators open with their buttons but need a card; Booth 2 teleport "not activated". Hungry at turn 75; ate the red goo (cherry pie, quenches thirst too). North from the junction: Admin Corridor South (cracked, crevice).

Theories: I need access cards (kitchen, elevator, teleport). Admin area likely has them. The combination number may be written somewhere. Still unexplored: Courtyard west, Plain Hall NE, junction south, admin area.

#### Commands 116-190 (turns 94-169): key, tools, Floyd, the lower elevator

North of the junction: Admin Corridor South (crevice with a steel key, SanFac E east), Admin Corridor (huge rift north, 8 m wide; Systems Monitors west: Library, Reactors, Life Support green; Planetary Defense, Planetary Course Control, Communications, Project Control malfunctioning). South of the junction: Mech Corridor North (Storage East: oil can taken, cardboard box with a cracked fromitz board, B- and K-series megafuses, a good 90-ohm bedistor, left there; Physical Plant west), Mech Corridor (Reactor Control east: reactor elevator needs a card, dark stairs down, "grue" warning, went back), Mech Corridor South (Tool Room SW: glass flask, U-shaped magnet bar, pliers, laser with old battery and a 1-6 dial set to 5; Machine Shop S: chemical dispenser with coloured buttons; Robot Shop E of that).

Dropped the scrub brush and brochure in Storage East, the ID card and towel in the Tool Room (the magnet would wipe the card). Took the magnet and pulled the key out of the crevice. Turned on the robot: Floyd (+2), searched him, got the **lower elevator access card** (+1, score 9). Dropped the magnet in the Robot Shop. SAVE at turn 156 in the Robot Shop. Took the red elevator down with Floyd to a **Waiting Area** (platform east, benches). Now hungry-ish (11 h) and tired (10 h).

#### Commands 191-270 (turns 169-253): shuttle, sleep, ladder, the offices, the tower

Kalamontee Platform (+4): shuttle "Alfie" south, control cabins east and west with a slot, a +/- lever and a display. Notice: service until 6000, after that special authorization. Controls "not activated". Went back up, ate the brown goo, walked west (weak/flushed feeling), and slept in Dorm D (SAVE at turn 189 before sleeping). Woke on day 2 (Septem 7) at time 1625; items on the floor, took all.

Unlocked the Mess Corridor padlock with the steel key: Storage West (+4) with a "Spam and Egz" tin can (unopened, no opener) and a heavy ladder. Dropped everything there (kit re-taken), carried the ladder 3 hours east and north to the rift. Now **feverish** (diagnose). SAVE at turn 212 in Admin Corridor. Dropped, extended ("open") and laid the ladder across the rift, crossed (+4). Admin Corridor North: Small Office (desk: kitchen + upper elevator access cards, +1 each), Large Office (desk: shuttle access card, +1; window view), Transportation Supply north (pitch dark, need light), Plan Room east (maps of Kalamontee and Lawanda complexes; Lawanda has an underground installation).

Upper elevator with its card: up to the **Tower Core** (+4, score 28). Ate the last (green) goo on the way: no food left now. Comm Room NE: receive console plays the Feinstein's last message (frequency 48.5); send console screen: "Planetwide plague has struck entire population. Time is critical." Send console has a coolant malfunction: funnel "Coolant System Manual Override", enunciator with a flashing **yellow** light. The Machine Shop dispenser has "KUULINTS 1-4" red/blue/green/yellow: I think I need the flask filled with yellow coolant poured into the funnel. Observation Deck SW (second island 20 km east). Helipad up: a rusty helicopter, control panel locked, "you don't have the orange key".

Theories: my fever is the plague; the cure is probably in Lawanda via the shuttle (card now in hand). Food: kitchen via the kitchen card in the Mess Hall; canteen is in Storage West. Light needed for Transportation Supply and the reactor stairs.


#### Commands 271-397 (turns 253-358): kitchen, the shuttle ride, Lawanda

SAVE at the Helipad (turn 254). Down the upper elevator and 3 hours west. In Storage West dropped the padlock, key and (empty) survival kit, took the canteen and the lower elevator card. Kitchen card opened the kitchen (+4); canteen in the octagonal niche, button, full of protein liquid. Walked back east and down the red elevator to Kalamontee Platform. SAVE in Alfie Control East (turn 294). Shuttle card activated the controls. Pushed the lever to 35 (under the "Limit 45" sign), centred, drank from the canteen on the way (hunger fixed), pulled the lever at the "Halfway mark - begin deceleration" sign and stopped short in the tunnel. Pushed back to 5 and held; the "15/10/5" countdown signs went by and the car smashed into the wall at Lawanda station (no apparent injury). Lawanda Platform (+4, score 36; Shuttle Car Betty north). SAVE at Lawanda Platform (turn 328).

Up the dead escalator to a Fork (NE/SE). NE: Systems Corridor West (NW Infirmary; stairs down north; E). **Infirmary**: red spool "Symptoms of the Disease", medicine bottle "Disease suppression medicine -- experimental", sealed emergency ration. Floyd found Lazarus's breastplate and ran off sobbing. Drank the medicine: the fever broke, diagnose now "perfect health" (but "suppression" makes me think it will come back). Took the spool and the ration. Systems Corridor: **Planetary Defense** (N): "Circuit board failure. Warning: this board controls the discrimination circuits"; an access panel holds four 17-cm fromitz boards, all look the same. Systems Corridor East: Physical Plant (E, big), **Course Control** (N): "Bedistor failure!" and "Critical divergence from planned course"; a metal cube holds a **fused 90-ohm bedistor**. SAVE in Course Control (turn 358).

### Leg 1 handoff

- **Stopped for:** the ~400-command budget (about 397 commands, counting status/options calls).
- **Game turn:** 358. **Score:** 36 of 80. **Time:** 5492, dusk, day 2 (Septem 7).
- **Location:** Course Control, Lawanda complex. Floyd wandered off exploring (he always comes back).
- **Inventory:** chronometer (worn), uniform (worn; pocket holds kitchen access card, upper elevator access card), canteen (protein liquid, some drunk, closed? it was opened to drink), shuttle access card, lower elevator access card, red spool ("Symptoms of the Disease"), emergency ration (one meal, uneaten).
- **Saved:** yes, the game's SAVE in Course Control at turn 358 (the single save slot).
- **Health:** fever cured by the experimental medicine at turn 341; well-fed (drank canteen ~turn 306); well-rested (slept turn 191).

**Map so far**
- Feinstein (gone): Deck Nine, Reactor Lobby, escape pod.
- Crag -(up)- Balcony -(up)- Winding Stair -(up)- Courtyard (N Plain Hall, W unexplored, S down).
- Plain Hall: N Rec Area, NE (unexplored), S Courtyard. Rec Area: N door with 0-1000 combination dial (locked), E Rec Corridor, S Plain Hall.
- Rec Corridor: N Dorm B -> SanFac B; S Dorm A -> SanFac A; W Rec Area; SW Plain Hall; E Mess Corridor.
- Mess Corridor: N Storage West (padlock, key, empty survival kit, oil can, Spam and Egz tin can dropped/left); S Mess Hall -> S Kitchen (protein dispenser); E Dorm Corridor.
- Dorm Corridor: N Dorm D -> SanFac D; S Dorm C -> SanFac C; E (3-hour walk) Corridor Junction.
- Corridor Junction: N Admin Corridor South (E SanFac E) -> N Admin Corridor (W Systems Monitors; N across the ladder) -> Admin Corridor North (W Small Office -> W Large Office; N Transportation Supply, DARK; E Plan Room). E Elevator Lobby (N Upper Elevator, S Lower Elevator, E Booth 2 teleport, inactive). S Mech Corridor North.
- Mech Corridor North: E Storage East (brush, brochure, cardboard box: cracked fromitz board, B- and K-series megafuses, **good 90-ohm bedistor**), W Physical Plant (SE to Mech Corridor), S Mech Corridor (E Reactor Control: reactor elevator needs a card, dark stairs down) -> S Mech Corridor South (SW Tool Room: flask, pliers, laser w/ old battery, ID card, towel; S Machine Shop: chemical dispenser; SE/E Robot Shop: magnet dropped there).
- Upper elevator: Tower Core (NE Comm Room, SW Observation Deck, up Helipad with a helicopter locked by an orange key).
- Lower elevator: Waiting Area -> E Kalamontee Platform (Shuttle Car Alfie S; Alfie Control East; West cabin unvisited).
- Lawanda: Lawanda Platform (N Shuttle Car Betty, S Alfie, E up Escalator) -> Fork (NE Systems Corridor West, SE unexplored). Systems Corridor West: NW Infirmary, N stairs down (unexplored), E Systems Corridor (N Planetary Defense) -> E Systems Corridor East (E Physical Plant, N Course Control, S unexplored).

**Solved:** escape pod; swim to the crag; key from the crevice with the magnet; Floyd and the lower elevator card; padlock; ladder across the rift; three cards from the offices; upper elevator; kitchen and canteen; shuttle to Lawanda; the fever (for now).

**Open puzzles:** Course Control's fused bedistor (I think the good 90-ohm bedistor from Storage East's box replaces it: back in Kalamontee, a shuttle trip away); Planetary Defense's failed fromitz board (one of four is bad; the cracked board in Storage East is no use; need a way to tell or a spare); Comm Room coolant (yellow light, funnel; fill the flask with yellow coolant at the Machine Shop dispenser and pour it in); combination dial in the Rec Area; dark Transportation Supply and reactor stairs (need a light); helicopter's orange key; Booth 2 teleport; reactor elevator card; the Spam tin (no opener); the red spool (need a reader); what the laser is for.

**Theories:** The planet's systems (defense, course control, comms) are broken and fixing them is the main arc; the plague is what killed everyone, and the medicine only suppresses it. The spool probably plays in a reader somewhere (library? LIIBREREE was green on the monitors). Time matters: the shuttle runs freely until 6000 each day.

**Next I intended to:** explore the rest of Lawanda first (Fork SE, Systems Corridor East S, the stairs down north of Systems Corridor West), look for a spool reader, a light source and a spare fromitz board; then take the shuttle back (brake earlier when the countdown signs start!) to fetch the good bedistor and the flask, fill the flask with yellow coolant for the Comm Room, and bring pliers too (maybe for the fused bedistor). Watch the hunger clock (canteen + ration) and the next sleep (~day 2 night).

### Command log (appended as I play)

- ~cmd 190, turn 169: Waiting Area (bottom of red elevator), Floyd with me. Score 9.
- [Kalamontee Staashun." Below it, a smaller notice gives the shuttle's hours.] 23 : This is a wide, flat strip of concrete which continues westward. A large transport of some sort lies to the south, its open door beckoning you to enter. A faded sign on the wall reads "Shutul Platform -- Kalamontee Staas...
- [Kalamontee Platform · night · turn 171 · time 8271 · score 13] 35 : The notice reads "Shutul Servis: evree dae until 6000. Aaftur 6000, shutul yuus reekwiirz speshul awtharazaashun."
- [Kalamontee Staashun."] 34 : The faded sign reads "Shutul Platform -- Kalamontee Staashun."
- [Shuttle Car Alfie · night · turn 173 · time 8285 · score 13] 22 : This is the cabin of a large transport, with seating for around 20 people plus space for freight. There are open doors at the eastern and western ends of the cabin, and a doorway leads out to a wide platform to the north...
- [Alfie Control East · night · turn 174 · time 8305 · score 13] 23 : This is a small control cabin. A control panel contains a slot, a lever, and a display. The lever can be set at a central position, or it could be pushed up to a position labelled "+", or pulled down to a position labell...
- [Alfie Control East · night · turn 174 · time 8305 · score 13] 37 : A recorded voice says "Shuttle controls are not currently activated."
- [Alfie Control East · night · turn 174 · time 8305 · score 13] 141 : Actions on lower elevator access card: examine, drop, read. Answer "141 <action>".
- [Alfie Control East · night · turn 175 · time 8312 · score 13] 150 : A sign flashes "Inkorekt awtharazaashun kard...akses deeniid."
- [Shuttle Car Alfie · night · turn 176 · time 8332 · score 13] 24 : This is the cabin of a large transport, with seating for around 20 people plus space for freight. There are open doors at the eastern and western ends of the cabin, and a doorway leads out to a wide platform to the north...
- [Kalamontee Staashun." Below it, a smaller notice gives the shuttle's hours.] 21 : This is a wide, flat strip of concrete which continues westward. A large transport of some sort lies to the south, its open door beckoning you to enter. A faded sign on the wall reads "Shutul Platform -- Kalamontee Staas...
- [Waiting Area · night · turn 178 · time 8359 · score 13] 24 : This is a concrete platform sparsely furnished with benches. The platform continues to the east, and to the south is a metal door.
- [Lower Elevator · night · turn 179 · time 8366 · score 13] 22 : This is a medium-sized room with a door to the north which is open. A control panel contains an Up button, a Down button, and a narrow slot.
- [Lower Elevator · night · turn 180 · time 8373 · score 13] 38 : The elevator door slides shut. After a moment, you feel a sensation of vertical movement.
- [Lower Elevator · night · turn 181 · time 8413 · score 13] 3 : Time passes...
- [Lower Elevator · night · turn 182 · time 8453 · score 13] 3 : Time passes...
- [Lower Elevator · night · turn 183 · time 8493 · score 13] 3 : Time passes...
- [Lower Elevator · night · turn 184 · time 8533 · score 13] 3 : Time passes... !> You're now really ravenous and your lips are quite parched. !> The goo in your survival kit would take care of both.
- [Lower Elevator · night · turn 185 · time 8548 · score 13] 11 : Mmmm...that tasted just like delicious Nebulan fungus pudding. It was moist enough to quench your thirst, too.
- [Elevator Lobby · night · turn 186 · time 8555 · score 13] 21 : This is a wide, brightly lit lobby. A blue metal door to the north is open and a larger red metal door to the south is also open. Beside the blue door is a blue button, and beside the red door is a red button. A corridor...
- [Corridor Junction · night · turn 187 · time 8585 · score 13] 24 : A north-south corridor intersects the main corridor here. To the west, the main corridor extends as far as you can see; a non-working walkway from that direction ends here. To the east, the corridor widens into a well-li...
- [Dorm Corridor · night · turn 188 · time 8745 · score 13] 24 : You walk down the long, featureless hallway for a long time. Finally, you see some doorways ahead... This is a wide, east-west hallway with openings to the north and south. To the east, the corridor stretches off into th...
- [Dorm D · night · turn 189 · time 8765 · score 13] 21 : This is a very long room lined with multi-tiered bunks. Flimsy partitions between the tiers may have provided a modicum of privacy. These spartan living quarters could have once housed many hundreds, but it seems quite d...
- [Dorm D · night · turn 189 · time 8765 · score 13] 5 : Ok.
- [Dorm D, in the bed · night · turn 190 · time 8772 · score 13] 34 : Ahhh...the bed is soft and comfortable. You should be asleep in short order.
- [Dorm D, in the bed · night · turn 191 · time 8779 · score 13] 10 : You'll probably be asleep before you know it.
- [Dorm D, in the bed · morning · turn 192 · time 1625 · score 13] 3 : Time passes... ...You find yourself on the bridge of the Feinstein. Ensign Blather is here, as well as Admiral Smithers. You are diligently scrubbing the control panel. Blather keeps yelling at you to scrub harder. Sudde...
- [Dorm D, in the bed · morning · turn 193 · time 1665 · score 13] 3 : Time passes...
- [Dorm D · morning · turn 194 · time 1672 · score 13] 7 : You are on your own feet again.
- [Dorm D · morning · turn 195 · time 1679 · score 13] 8 : survival kit: Taken. canteen: Taken. key: Taken. lower elevator access card: Taken. oil can: Taken.
- [Dorm Corridor · morning · turn 196 · time 1699 · score 13] 22 : This is a wide, east-west hallway with openings to the north and south. To the east, the corridor stretches off into the distance. That section of the hallway is lined with a motorized walkway (no longer running) that wa...
- [Mess Corridor · morning · turn 197 · time 1719 · score 13] 24 : This is a wide, east-west hallway with a large portal to the south. A small door to the north is closed and hooked with a simple steel padlock which is also closed.
- [Mess Corridor · morning · turn 198 · time 1726 · score 13] 36 : The padlock springs open.
- [Mess Corridor · morning · turn 199 · time 1733 · score 13] 37 : Taken.
- [Mess Corridor · morning · turn 200 · time 1740 · score 13] 33 : Opened.
- [Storage West · morning · turn 201 · time 1760 · score 17] 21 : This is a small room obviously intended as a storage area. On a small shelf is a large, unopened tin can. It has a plain white label which reads "Spam and Egz." A heavy-duty extendable ladder is leaning against the rear ...
- [Storage West · morning · turn 202 · time 1767 · score 17] 38 : It is a heavy-duty ladder built of sturdy aluminum tubing. It is currently collapsed and is around two-and-a-half meters long, but if extended would obviously be much longer.
- [Storage West · morning · turn 203 · time 1774 · score 17] 35 : This is a rather normal tin can. It is large and is labelled "Spam and Egz."
- [Storage West · morning · turn 203 · time 1774 · score 17] padlock drop : That is not one of the options on screen (I don't know the word "padlock".).
- [Storage West · morning · turn 203 · time 1774 · score 17] 39 : Your load is too heavy. You'd have to drop the survival kit, the padlock, the canteen and the oil can first.
- [Storage West · morning · turn 204 · time 1781 · score 17] 20 : survival kit: Dropped. padlock: Dropped. canteen: Dropped. key: Dropped. lower elevator access card: Dropped. oil can: Dropped.
- [Storage West · morning · turn 205 · time 1788 · score 17] 39 : Taken.
- [Storage West · morning · turn 206 · time 1795 · score 17] 43 : Taken.
- [Storage West · morning · turn 206 · time 1795 · score 17] 59 : Your load is too heavy. Dropping the survival kit would make enough room.
- [Mess Corridor · morning · turn 207 · time 1815 · score 17] 22 : This is a wide, east-west hallway with a large portal to the south. A small door to the north is open.
- [Dorm Corridor · morning · turn 208 · time 1835 · score 17] 23 : This is a wide, east-west hallway with openings to the north and south. To the east, the corridor stretches off into the distance. That section of the hallway is lined with a motorized walkway (no longer running) that wa...
- [Corridor Junction · morning · turn 209 · time 1995 · score 17] 23 : You walk down the long, featureless hallway for a long time. Finally, you see an intersection ahead... A north-south corridor intersects the main corridor here. To the west, the main corridor extends as far as you can se...
- [Admin Corridor South · morning · turn 210 · time 2015 · score 17] 21 : This section of hallway seems to have suffered some minor structural damage. The walls are cracked, and a jagged crevice crosses the floor. An opening leads east and the corridor heads north and south.
- [Admin Corridor · morning · turn 211 · time 2035 · score 17] 21 : The hallway, in fact the entire building, has been rent apart here, presumably by seismic upheaval. You can see the sky through the severed roof above, and the ground is thick with rubble. To the north is a gaping rift, ...
- [Admin Corridor · morning · turn 212 · time 2053 · score 17] 4 : You are a bit sick and feverish. You feel well-rested. You seem to be fairly thirsty and hungry. You can go about 14 hours longer without food or drink. (Those are hours on your chronometer, not turns. Time passes as you...
- [Admin Corridor · morning · turn 212 · time 2053 · score 17] 157 : Actions on ladder: examine, drop, open. Answer "157 <action>".
- [Admin Corridor · morning · turn 212 · time 2053 · score 17] 5 : Ok.
- [Admin Corridor · morning · turn 213 · time 2060 · score 17] 157 open : You couldn't possibly extend the ladder while you're holding it.
- [Admin Corridor · morning · turn 214 · time 2067 · score 17] 157 drop : Dropped.
- [Admin Corridor · morning · turn 215 · time 2103 · score 17] 37 : The ladder extends to a length of around eight meters.
- [Admin Corridor · morning · turn 216 · time 2110 · score 17] 39 : The ladder swings out across the rift and comes to rest on the far edge, spanning the precipice.
- [Admin Corridor North · morning · turn 217 · time 2143 · score 21] 21 : You slowly make your way across the swaying ladder. You can see sharp, pointy rocks at the bottom of the rift, far below... The corridor ends here. Portals lead west, north, and east. Signs above these portals read, resp...
- [Small Office · morning · turn 218 · time 2163 · score 21] 24 : You have entered a small office of some sort. A small desk faces the main doorway which lies to the east. Another exit leads west.
- [Small Office · morning · turn 219 · time 2170 · score 21] 34 : Opening the small desk reveals a kitchen access card and an upper elevator access card.
- [Small Office · morning · turn 220 · time 2177 · score 22] 40 : Taken. [+1 point · score 22]   (the game shows this as a green notice)
- [Small Office · morning · turn 221 · time 2184 · score 23] 43 : Taken. [+1 point · score 23]   (the game shows this as a green notice)
- [Large Office · morning · turn 222 · time 2204 · score 23] 24 : This is a large, plush office. The far wall is one large picture window, scratched but unbroken, offering a view of this installation and the ocean beyond. In front of the window is a wide wooden desk. The only exit is e...
- [Large Office · morning · turn 223 · time 2211 · score 23] 34 : Opening the large desk reveals a shuttle access card.
- [Large Office · morning · turn 224 · time 2218 · score 23] 38 : You can see the dormitories and other parts of the complex in the distance. Water is visible in every direction.
- [Large Office · morning · turn 225 · time 2225 · score 24] 43 : Taken. [+1 point · score 24]   (the game shows this as a green notice)
- [Small Office · morning · turn 226 · time 2245 · score 24] 23 : You have entered a small office of some sort. A small desk faces the main doorway which lies to the east. Another exit leads west.
- [Admin Corridor North · morning · turn 227 · time 2265 · score 24] 23 : The corridor ends here. Portals lead west, north, and east. Signs above these portals read, respectively, "Administraativ Awfisiz," "Tranzportaashun Suplii," and "Plan Ruum." To the south is a wide rift, spanned by a met...
- [Transportation Supply · morning · turn 228 · time 2285 · score 24] 21 : !> It is pitch black. You might be eaten by a grue. There is light to the south.
- [Admin Corridor North · morning · turn 229 · time 2305 · score 24] 22 : The corridor ends here. Portals lead west, north, and east. Signs above these portals read, respectively, "Administraativ Awfisiz," "Tranzportaashun Suplii," and "Plan Ruum." To the south is a wide rift, spanned by a met...
- [Plan Room · morning · turn 230 · time 2325 · score 24] 23 : This is a small room whose far wall is covered with many small cubbyholes, all empty. The left wall is covered with an enormous map, labelled "Kalamontee Kompleks", showing two installations connected by a long hallway. ...
- [Admin Corridor North · morning · turn 231 · time 2345 · score 24] 24 : The corridor ends here. Portals lead west, north, and east. Signs above these portals read, respectively, "Administraativ Awfisiz," "Tranzportaashun Suplii," and "Plan Ruum." To the south is a wide rift, spanned by a met...
- [Admin Corridor · morning · turn 232 · time 2378 · score 24] 22 : You slowly make your way across the swaying ladder. You can see sharp, pointy rocks at the bottom of the rift, far below... The hallway, in fact the entire building, has been rent apart here, presumably by seismic upheav...
- [Admin Corridor South · morning · turn 233 · time 2398 · score 24] 22 : This section of hallway seems to have suffered some minor structural damage. The walls are cracked, and a jagged crevice crosses the floor. An opening leads east and the corridor heads north and south.
- [Corridor Junction · morning · turn 234 · time 2418 · score 24] 22 : A north-south corridor intersects the main corridor here. To the west, the main corridor extends as far as you can see; a non-working walkway from that direction ends here. To the east, the corridor widens into a well-li...
- [Elevator Lobby · morning · turn 235 · time 2448 · score 24] 23 : This is a wide, brightly lit lobby. A blue metal door to the north is open and a larger red metal door to the south is also open. Beside the blue door is a blue button, and beside the red door is a red button. A corridor...
- [Upper Elevator · morning · turn 236 · time 2455 · score 24] 21 : You have entered a tiny room with a sliding door to the south which is open. A control panel contains an Up button, a Down button, and a narrow slot.
- [Upper Elevator · morning · turn 237 · time 2462 · score 24] 162 : A recorded voice chimes "Elevator enabled."
- [Upper Elevator · morning · turn 238 · time 2469 · score 24] 38 : The elevator door slides shut. After a moment, you feel a sensation of vertical movement. Some innocuous Hawaiian music oozes from the elevator's intercom.
- [Upper Elevator · morning · turn 239 · time 2509 · score 24] 3 : Time passes... !> You're now really ravenous and your lips are quite parched. !> The goo in your survival kit would take care of both.
- [Upper Elevator · morning · turn 240 · time 2549 · score 24] 3 : Time passes...
- [Upper Elevator · morning · turn 241 · time 2589 · score 24] 3 : Time passes...
- [Upper Elevator · morning · turn 242 · time 2604 · score 24] 11 : Mmmm...that tasted just like yummy lima beans. It was moist enough to quench your thirst, too.
- [Tower Core · morning · turn 243 · time 2611 · score 28] 22 : This is a small, circular room. A sliding door leads north, and a spiral staircase heads upwards. Other exits lie to the northeast and southwest. [+4 points · score 28]   (the game shows this as a green notice)
- [Comm Room · morning · turn 244 · time 2631 · score 28] 25 : This is a small room with no windows. The sole exit is southwest. Two wide consoles fill either end of the room; thick cables lead up into the ceiling. The console on the left side of the room is labelled "Reeseev Staash...
- [Comm Room · morning · turn 245 · time 2649 · score 28] 38 : "Tuu enee ship uv xe Sekund Galaktik Yuunyun: Planitwiid plaag haz struk entiir popyuulaashun. Tiim iz kritikul. Eemurjensee asistins reekwestid. <reepeet mesij>"
- [Comm Room · morning · turn 246 · time 2656 · score 28] 35 : A voice fills the room ... the voice of the Feinstein's communications officer! "Stellar Patrol Ship Feinstein to planetside ... Please respond on frequency 48.5 ... SPS Feinstein to planetside ... Please come in ..." Af...
- [Comm Room · morning · turn 247 · time 2663 · score 28] 42 : It's a panel of small coloured lights: red, blue, green, yellow, gray, brown and pink. The yellow one is flashing.
- [Tower Core · morning · turn 248 · time 2683 · score 28] 28 : This is a small, circular room. A sliding door leads north, and a spiral staircase heads upwards. Other exits lie to the northeast and southwest.
- [Observation Deck · morning · turn 249 · time 2703 · score 28] 28 : This is a balcony girdling the tower. The view is breathtaking; the tower must be half a kilometer tall. From here it is clear that you are on an island. The dormitory section of the complex is visible on the other side ...
- [Tower Core · morning · turn 250 · time 2723 · score 28] 25 : This is a small, circular room. A sliding door leads north, and a spiral staircase heads upwards. Other exits lie to the northeast and southwest.
- [Helipad · morning · turn 251 · time 2753 · score 28] 29 : You are at the center of a wide, flat area atop the tower. A fence prevents you from approaching the perimeter, so your view is limited to cloud-filled sky. A large vehicle, severely weathered and topped with rotor blade...
- [Helicopter · morning · turn 252 · time 2760 · score 28] 36 : This is a large vehicle with a lot of cargo space. A complex control panel is closed and locked. Everything is covered with a thick layer of rust. Through the windows of the vehicle you can see a wide Helipad, and beyond...
- [Helicopter · morning · turn 253 · time 2767 · score 28] 40 : But you don't have the orange key!
- [Helipad · morning · turn 254 · time 2774 · score 28] 38 : You are at the center of a wide, flat area atop the tower. A fence prevents you from approaching the perimeter, so your view is limited to cloud-filled sky. A large vehicle, severely weathered and topped with rotor blade...
- [Helipad · morning · turn 254 · time 2774 · score 28] 5 : Ok.
- [Tower Core · morning · turn 255 · time 2789 · score 28] 30 : This is a small, circular room. A sliding door leads north, and a spiral staircase heads upwards. Other exits lie to the northeast and southwest.
- [Upper Elevator · morning · turn 256 · time 2796 · score 28] 21 : You have entered a tiny room with a sliding door to the south which is open. A control panel contains an Up button, a Down button, and a narrow slot.
- [Upper Elevator · morning · turn 257 · time 2803 · score 28] 39 : The elevator door slides shut. After a moment, you feel a sensation of vertical movement. Some innocuous Hawaiian music oozes from the elevator's intercom.
- [Upper Elevator · morning · turn 258 · time 2843 · score 28] 3 : Time passes...
- [Upper Elevator · morning · turn 259 · time 2883 · score 28] 3 : Time passes...
- [Upper Elevator · morning · turn 260 · time 2923 · score 28] 3 : Time passes...
- [Elevator Lobby · morning · turn 261 · time 2930 · score 28] 22 : This is a wide, brightly lit lobby. A blue metal door to the north is open and a larger red metal door to the south is also open. Beside the blue door is a blue button, and beside the red door is a red button. A corridor...
- [Corridor Junction · morning · turn 262 · time 2960 · score 28] 24 : A north-south corridor intersects the main corridor here. To the west, the main corridor extends as far as you can see; a non-working walkway from that direction ends here. To the east, the corridor widens into a well-li...
- [Dorm Corridor · morning · turn 263 · time 3120 · score 28] 24 : You walk down the long, featureless hallway for a long time. Finally, you see some doorways ahead... This is a wide, east-west hallway with openings to the north and south. To the east, the corridor stretches off into th...
- [Mess Corridor · morning · turn 264 · time 3140 · score 28] 24 : This is a wide, east-west hallway with a large portal to the south. A small door to the north is open.
- [Storage West · morning · turn 265 · time 3160 · score 28] 21 : This is a small room obviously intended as a storage area. There is a padlock here. On a small shelf is a large, unopened tin can. It has a plain white label which reads "Spam and Egz." There is a canteen here. There is ...
- [Storage West · morning · turn 266 · time 3167 · score 28] 8 : padlock: Taken. tin can: Taken. canteen: Oh, no. The tin can slips from your arms while taking the canteen and both tumble to the ground. Collectively, all these items are too much for you to carry. key: Taken. lower ele...
- [Storage West · morning · turn 267 · time 3174 · score 28] 156 drop : Dropped.
- [Storage West · morning · turn 268 · time 3181 · score 28] 129 drop : Dropped.
- [Storage West · morning · turn 269 · time 3188 · score 28] 111 drop : Dropped.
- [Storage West · morning · turn 270 · time 3195 · score 28] 52 : Taken.
- [Storage West · morning · turn 271 · time 3202 · score 28] 59 : Taken.
- [Mess Corridor · morning · turn 272 · time 3222 · score 28] 22 : This is a wide, east-west hallway with a large portal to the south. A small door to the north is open.
- [Mess Hall · morning · turn 273 · time 3242 · score 28] 22 : This is a large hall lined with tables and benches. An opening to the north leads back to the corridor. A door to the south is closed. Next to the door is a small slot.
- [Mess Hall · morning · turn 274 · time 3249 · score 28] 161 : The kitchen door quietly slides open.
- [Kitchen · morning · turn 275 · time 3269 · score 32] 22 : This is the food production and dispensary area for the dining hall to the north. Of particular interest is a machine near the door. You should probably examine it more closely. [+4 points · score 32]   (the game shows t...
- [Kitchen · morning · turn 276 · time 3276 · score 32] 35 : This wall-mounted unit contains an octagonal niche beneath a spout. Above the spout is a button. The machine is labelled "Hii Prooteen Likwid Dispensur."
- [Kitchen · morning · turn 276 · time 3276 · score 32] 38 : Put in dispenser unit: canteen, kitchen access card, upper elevator access card, shuttle access card, lower elevator access card. Answer "38 <item>".
- [Kitchen · morning · turn 277 · time 3283 · score 32] 38 canteen : The canteen fits snugly into the octagonal niche, its mouth resting just below the spout of the machine.
- [Kitchen · morning · turn 278 · time 3290 · score 32] 41 : The canteen fills almost to the brim with a brown liquid.
- [Kitchen · morning · turn 279 · time 3297 · score 32] 43 : Taken.
- [Kitchen · morning · turn 280 · time 3304 · score 32] 120 close : Closed.
- [Mess Hall · morning · turn 281 · time 3324 · score 32] 21 : This is a large hall lined with tables and benches. An opening to the north leads back to the corridor. A door to the south is open. Next to the door is a small slot.
- [Mess Corridor · morning · turn 282 · time 3344 · score 32] 21 : This is a wide, east-west hallway with a large portal to the south. A small door to the north is open.
- [Dorm Corridor · morning · turn 283 · time 3364 · score 32] 23 : This is a wide, east-west hallway with openings to the north and south. To the east, the corridor stretches off into the distance. That section of the hallway is lined with a motorized walkway (no longer running) that wa...
- [Corridor Junction · afternoon · turn 284 · time 3524 · score 32] 23 : You walk down the long, featureless hallway for a long time. Finally, you see an intersection ahead... A north-south corridor intersects the main corridor here. To the west, the main corridor extends as far as you can se...
- [Elevator Lobby · afternoon · turn 285 · time 3554 · score 32] 23 : This is a wide, brightly lit lobby. A blue metal door to the north is open and a larger red metal door to the south is also open. Beside the blue door is a blue button, and beside the red door is a red button. A corridor...
- [Lower Elevator · afternoon · turn 287 · time 3568 · score 32] 39 : The elevator door slides shut. After a moment, you feel a sensation of vertical movement.
- [Lower Elevator · afternoon · turn 288 · time 3608 · score 32] 3 : Time passes...
- [Lower Elevator · afternoon · turn 289 · time 3648 · score 32] 3 : Time passes...
- [Lower Elevator · afternoon · turn 290 · time 3688 · score 32] 3 : Time passes...
- [Waiting Area · afternoon · turn 291 · time 3695 · score 32] 21 : This is a concrete platform sparsely furnished with benches. The platform continues to the east, and to the south is a metal door.
- [Kalamontee Staashun." Below it, a smaller notice gives the shuttle's hours.] 23 : This is a wide, flat strip of concrete which continues westward. A large transport of some sort lies to the south, its open door beckoning you to enter. A faded sign on the wall reads "Shutul Platform -- Kalamontee Staas...
- [Shuttle Car Alfie · afternoon · turn 293 · time 3722 · score 32] 22 : This is the cabin of a large transport, with seating for around 20 people plus space for freight. There are open doors at the eastern and western ends of the cabin, and a doorway leads out to a wide platform to the north...
- [Alfie Control East · afternoon · turn 294 · time 3742 · score 32] 23 : This is a small control cabin. A control panel contains a slot, a lever, and a display. The lever can be set at a central position, or it could be pushed up to a position labelled "+", or pulled down to a position labell...
- [Alfie Control East · afternoon · turn 294 · time 3742 · score 32] 5 : Ok.
- [Alfie Control East · afternoon · turn 295 · time 3749 · score 32] 163 : A recording of a deep male voice says "Shuttle controls activated."
- [Alfie Control East · afternoon · turn 296 · time 3756 · score 32] 37 : The lever is now in the upper position.
- [Alfie Control East · afternoon · turn 297 · time 3876 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 298 · time 3936 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 299 · time 3976 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 300 · time 4006 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 301 · time 4030 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 302 · time 4050 · score 32] 3 : Time passes... !> A growl from your stomach warns that you're getting pretty hungry and thirsty. !> A drink from your canteen would take care of both.
- [Alfie Control East · afternoon · turn 303 · time 4067 · score 32] 39 : The lever is now in the central position.
- [Alfie Control East · afternoon · turn 304 · time 4084 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 305 · time 4101 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 307 · time 4135 · score 32] 11 : Opening the canteen reveals a quantity of protein-rich liquid. Mmmm....that was good. It certainly quenched your thirst and satisfied your hunger.
- [Beegin Deeseluraashun."] 3 : Time passes...
- [Alfie Control East · afternoon · turn 309 · time 4169 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 310 · time 4186 · score 32] 38 : The lever is now in the lower position.
- [Alfie Control East · afternoon · turn 311 · time 4206 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 312 · time 4230 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 313 · time 4260 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 314 · time 4300 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 315 · time 4360 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 316 · time 4480 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 317 · time 4520 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 319 · time 4536 · score 32] 35 : You see parallel rails running along the floor of a long tunnel, vanishing in the distance.
- [Alfie Control East · afternoon · turn 320 · time 4543 · score 32] 43 : A recorded voice says "Operator should remain in control cabin while shuttle car is between stations."
- [Alfie Control East · afternoon · turn 320 · time 4543 · score 32] 24 : The door is closed.
- [Alfie Control East · afternoon · turn 321 · time 4550 · score 32] 37 : The lever is now in the upper position.
- [Alfie Control East · afternoon · turn 322 · time 4670 · score 32] 39 : The lever is now in the central position.
- [Alfie Control East · afternoon · turn 323 · time 4790 · score 32] 3 : Time passes...
- [Alfie Control East · afternoon · turn 324 · time 4910 · score 32] 3 : Time passes...
- [Alfie Control East · dusk · turn 325 · time 5030 · score 32] 3 : Time passes...
- [Alfie Control East · dusk · turn 326 · time 5048 · score 32] 4 : You are a bit sick and feverish. You feel well-rested. You seem to be well-fed.
- [Shuttle Car Alfie · dusk · turn 327 · time 5068 · score 32] 24 : This is the cabin of a large transport, with seating for around 20 people plus space for freight. There are open doors at the eastern and western ends of the cabin, and a doorway leads out to a wide platform to the north...
- [Lawanda Staashun."] 21 : This is a wide, flat strip of concrete. Open shuttle cars lie to the north and south. A wide escalator, not currently operating, beckons upward at the east end of the platform. A faded sign reads "Shutul Platform -- Lawa...
- [Lawanda Platform · dusk · turn 328 · time 5075 · score 36] 5 : Ok.
- [Escalator · dusk · turn 329 · time 5095 · score 36] 23 : You are in the middle of a long mechanical stairway. It is not running, and seems to be in disrepair.
- [Fork · dusk · turn 330 · time 5115 · score 36] 23 : This is a hallway which forks to the northeast and southeast. To the west is the top of a long escalator.
- [Systems Corridor West · dusk · turn 331 · time 5140 · score 36] 25 : The corridor bends here, leading east and southwest. A doorway opens to the northwest, and a narrow stairway leads down to the north.
- [Infirmary · dusk · turn 332 · time 5160 · score 36] 26 : You have entered a clean, well-lighted place. There are a number of beds, some complicated looking equipment, and many shelves that are mostly bare. Lying on one of the beds is a small red spool. On a low shelf is a tran...
- [eksperimentul"] 40 : "Dizeez supreshun medisin -- eksperimentul"
- [Infirmary · dusk · turn 334 · time 5196 · score 36] 35 : The spool is labelled "Simptumz uv Xe Dizeez."
- [Wun Meel."] 44 : A flat foil pack the size of a paperback, sealed and stamped with a red cross and the words "Emurjinsee Raashun -- Wun Meel."
- [Infirmary · dusk · turn 336 · time 5210 · score 36] 8 : red spool: Taken. medicine bottle: Oh, no. The red spool slips from your arms while taking the medicine bottle and both tumble to the ground. Collectively, all these items are too much for you to carry. emergency ration:...
- [Infirmary · dusk · turn 337 · time 5217 · score 36] 103 kitchen access card : Done.
- [Infirmary · dusk · turn 338 · time 5224 · score 36] 103 upper elevator access card : Done.
- [Infirmary · dusk · turn 339 · time 5231 · score 36] 37 : Taken.
- [Infirmary · dusk · turn 340 · time 5238 · score 36] 171 open : Opened.
- [Infirmary · dusk · turn 341 · time 5253 · score 36] 175 : The medicine tasted extremely bitter. After a few moments the fever breaks, and you feel your strength returning.
- [Infirmary · dusk · turn 342 · time 5271 · score 36] 4 : You are in perfect health. You feel well-rested. You seem to be well-fed.
- [Infirmary · dusk · turn 343 · time 5278 · score 36] 171 drop : Dropped.
- [Infirmary · dusk · turn 344 · time 5285 · score 36] 34 : Taken.
- [Systems Corridor West · dusk · turn 345 · time 5310 · score 36] 27 : The corridor bends here, leading east and southwest. A doorway opens to the northwest, and a narrow stairway leads down to the north.
- [Systems Corridor · dusk · turn 346 · time 5330 · score 36] 23 : This section of hallway has a doorway to the north labelled "Planateree Deefens." The corridor continues east and west.
- [Planetary Defense · dusk · turn 347 · time 5350 · score 36] 21 : This room is filled with a dazzling array of lights and controls. One light, blinking quickly, catches your eye. It reads "Surkit Boord Faalyur. WORNEENG: xis boord kuntroolz xe diskriminaashun surkits." There is a small...
- [Planetary Defense · dusk · turn 348 · time 5357 · score 36] 34 : The panel swings open. The access panel contains:   A first seventeen-centimeter fromitz board   A fourth seventeen-centimeter fromitz board   A third seventeen-centimeter fromitz board   A second seventeen-centimeter fr...
- [Planetary Defense · dusk · turn 349 · time 5364 · score 36] 41 : Like most fromitz boards, it is a twisted maze of silicon circuits. It is square, approximately seventeen centimeters on each side.
- [Planetary Defense · dusk · turn 350 · time 5371 · score 36] 43 : Like most fromitz boards, it is a twisted maze of silicon circuits. It is square, approximately seventeen centimeters on each side.
- [Planetary Defense · dusk · turn 351 · time 5378 · score 36] 45 : Like most fromitz boards, it is a twisted maze of silicon circuits. It is square, approximately seventeen centimeters on each side.
- [Planetary Defense · dusk · turn 352 · time 5385 · score 36] 47 : Like most fromitz boards, it is a twisted maze of silicon circuits. It is square, approximately seventeen centimeters on each side.
- [Systems Corridor · dusk · turn 353 · time 5405 · score 36] 22 : This section of hallway has a doorway to the north labelled "Planateree Deefens." The corridor continues east and west.
- [Systems Corridor East · dusk · turn 354 · time 5425 · score 36] 23 : The hallway ends here with a large doorway leading east, and smaller doorways to the north and south. The northern doorway is labelled "Planateree Kors Kontrool." The hallway itself leads west.
- [Physical Plant · dusk · turn 355 · time 5445 · score 36] 23 : This is an enormous room full of environmental control equipment presumably intended to heat and ventilate the Lawanda Complex. Oddly, although the Lawanda Complex is slightly smaller than its counterpart, this plant is ...
- [Systems Corridor East · dusk · turn 356 · time 5465 · score 36] 24 : The hallway ends here with a large doorway leading east, and smaller doorways to the north and south. The northern doorway is labelled "Planateree Kors Kontrool." The hallway itself leads west.
- [Course Control · dusk · turn 357 · time 5485 · score 36] 21 : This is a long room whose walls are covered with complicated controls and colored lights. Two of these lights are blinking. The first one reads "Bedistur Faalyur!" The other light reads "Kritikul diivurjins frum pland ko...
- [Course Control · dusk · turn 358 · time 5492 · score 36] 34 : The lid swings open. The large metal cube contains:   A fused ninety-ohm bedistor
- [Course Control · dusk · turn 358 · time 5492 · score 36] 5 : Ok.

### Leg 2

Took from the handoff: turn 358, score 36, in Course Control (Lawanda) with a save there. Plan: take the fused bedistor, explore the rest of Lawanda (Fork SE, Systems Corridor East S, the stairs down), look for a spool reader, light and a spare fromitz board, then shuttle back for the good bedistor and yellow coolant.

#### Leg 2 friction (continuing the table's numbering)

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 35 | 359 | Course Control | "take fused bedistor": "It seems to be fused to its socket." | Fair and clear: tells me I need a tool (pliers, I guess). |
| 36 | 364-370 | Library Lobby | The terminal's menus are a "type a number <value>" option; 0 goes up a level. Read the Project pages: cryogenic freezing of the population, a computer researching the cure, revival as phase four. | Praise: menu navigation by number fits click play perfectly. |
| 37 | 373-378 | Library | Microfilm reader: "put in" the spool, "turn on", then "read" shows it. Red spool: death comes 8-10 days after the first symptoms, the second symptom is needing more sleep. Green spool: helicopter needs an access card and a control panel key, both from Transportation Supply. | Praise: two spools, two solid clues. The disease clock is now explicit and scary. |
| 38 | 380 | Library Lobby | Fever returned about 40 turns after the "suppression" medicine. | Fair: the label said suppression. The bottle I dropped in the Infirmary might have more doses; worth remembering. |
| 39 | 383 | Computer Room | Printout: all research 100%, drug testing 99.985%, "Malfunction in Section 661! Summoning repair robot." | Praise: a crisp, readable status clue; connects the Miniaturization Booth next door. |
| 40 | 386-387 | ProjCon Office | Mural "seems to ripple ... as though a breeze were blowing behind it", Floyd says he doesn't remember seeing it; but the only option on the mural is "examine". | Hurt: the text begs "look behind / move mural" and the click menu can't try it. Maybe it opens from the other side, but I can't test the obvious idea. |
| 41 | 401 | Lab Storage | Taking the paper made the teleport card "slip from your arms" (#27 again). Found the pocket takes 3 cards, not 4. | Mild: the same juggle; the fix (stuff cards into the uniform pocket) was mine to find. |
| 42 | 410 | Bio Lock East | Window shows a miniaturization-booth card inside the Bio Lab with "shadowy, ominous shapes". I opened the lab door: mutants ate me. | Fair: I was warned and had saved at 405. RESTORE worked. |
| 43 | 419-420 | Booth 3 | Teleport card + beige "2" button took me straight to Booth 2 in Kalamontee. | Big praise: saves the long shuttle ride, and "slide through slot" appeared on the card at once. |
| 44 | 434-436 | Machine Shop | The flask grows "put under spout" only when you're in the Machine Shop; then the yellow button fills it ("turns milky white"). | Praise: the contextual verb shows the way. |

#### Commands 1-60 of leg 2 (turns 358-436): the Lawanda labs, teleport home

Course Control's fused bedistor won't come out by hand. South of Systems Corridor East: **Library Lobby** (terminal with a numbered menu; green spool on the floor; Booth 3 east), **Library** west (microfilm reader). Read both spools (see #37). South: **Project Corridor East** -> S **Computer Room** (red malfunction light, printout: Section 661 malfunction, drug testing 99.985%; **Miniaturization Booth** south with a slot and a numeric keyboard), W **ProjCon Office** (logo, rippling mural), Project Corridor -> Project Corridor West (SanFac F west, NW back to the Fork). East of Project Corridor East: **Main Lab** (S Lab Storage; NE radiation lock -> sign "radiation suits must be worn"; SE bio lock -> Bio Lab full of mutants, a miniaturization card on the floor inside). **Lab Storage**: lab uniform with a **teleportation access card** and a note "Combination to Conference Room: 428"; a **new laser battery**. SAVE at turn 405 in Lab Storage. Died opening the Bio Lab door (turn 410), RESTORE to 405. Fever came back at turn 380.

Teleported from Booth 3 to Booth 2 (Kalamontee Elevator Lobby). Took the good bedistor from Storage East, dropped the lower elevator card in the Tool Room, took the flask and pliers, filled the flask with yellow coolant (it went milky white).

Thinking: the computer's Section 661 malfunction is fixed by miniaturizing into it with the card that's in the Bio Lab, so I need a way to deal with the mutants (a distraction? Floyd? something lethal?). The Conference Room is probably the Rec Area's north door (428). Transportation Supply needs light, and has the helicopter key and card.

#### Leg 2 command log (condensed)
- t358-363 Course Control: fused bedistor stuck; S, S to Library Lobby; green spool taken.
- t364-370 terminal: 5 Project -> 1 origins, 2 installations, 3 project control.
- t372-378 Library: reader, red spool then green spool read. Red spool dropped in the Library.
- t381-390 Computer Room (printout), ProjCon Office (mural), Project Corridor, SanFac F.
- t394-405 Main Lab, Lab Storage: battery, teleport card; SAVE t405.
- t406-410 bio lock, window, open lab door -> death. RESTORE t405.
- t407-417 radiation lock (suit sign), Miniaturization Booth, Booth 3.
- t419-420 teleport to Booth 2. t424-436 bedistor, flask, pliers, yellow coolant.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 45 | 449-507 | Comm Room / Machine Shop | Coolant: each pour turns the light to a new colour (yellow -> blue -> green -> all dark, +6). Every colour is a full round trip: tower, elevator, four corridors, Machine Shop and back, ~28 turns each. | Hurt: three round trips of pure walking. The flask can't be filled in advance because the next colour is only shown after the pour. Rewarding at the end, but tedious, and it ate my whole evening. |
| 46 | 475-512 | Upper Elevator / Comm Room | Sleep warnings at 475 ("begin to feel weary"), 498, 504, 508; collapse at ~511. I finished the coolant, SAVED in the Comm Room at 507, and the save is doomed: every route to a bunk is more than 4 turns, and collapsing anywhere (elevator, Comm Room, even inside the helicopter) gets you eaten by "grues". | Hurt badly: my own fault for pushing on after "weary", but the game gave no sign that a save at 507 was a dead end, and with a single save slot there is no way back. The final warnings and the "sleep now!" button are good, but "sleep" outside a bed only says "civilized members of society usually sleep in beds". I have to RESTART from turn 0. |
| 47 | 508 | Tower Core | Once exhausted, the diagnose button reads "(exhausted, about an hour)" and a "10 sleep (exhausted)" / "sleep now!" button appears. | Praise for the visibility, but it arrives too late to help; a "weary, about N hours" label at the first warning would have let me plan. |

#### Commands 61-130 of leg 2 (turns 436-512): the coolant, and a doomed save

Took the yellow coolant up to the Comm Room (SAVE at turn 449 there) and poured it into the funnel: the light went blue. Round trip down for blue, then green: the enunciator went dark, the help message is being sent (+6, score 42). Ate the emergency ration at turn 493 (hungry, and it freed weight so I could carry the flask and pliers). Felt weary at 475 and pushed on. SAVED in the Comm Room at 507 (overwriting the 449 save), started for the dorms and collapsed in the upper elevator at 511: grues. RESTORE to 507 three times: waited in the Comm Room (grues), climbed to the helicopter and tried "sleep now!" ("civilized members of society usually sleep in beds") and collapsed there too (grues). The only save is doomed.

**RESTART** at about command 128 of leg 2. What I carry over as a player (my own knowledge from this playthrough, not outside knowledge): the route, the cards, the conference room combination 428, the coolant order yellow-blue-green, the teleport link Booth 2 <-> Booth 3, and "sleep only in a bunk, and go at the first 'weary'".

- t436-507 command log: flask to tower, pour yellow; down for blue, pour; down for green (ration eaten, pliers dropped by the juggle and retaken), pour (+6). SAVE t507. Collapse and death at t511/510/512 on three tries.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 48 | 42-43 (game 2) | Rec Area | After the restart I dialled 428 (from the Lab Storage note in game 1) and the door stayed locked. | Confusing but probably fair: the combination seems to be rolled per game, so my note from before the restart is worthless. A player who restarts will expect it to hold; nothing says it changed. |
| 49 | 66 (game 2) | Admin Corridor South | Diagnose button read "(hungry, nothing to eat, about 14 hours)" while I carried a closed survival kit full of goo; an "open the survival kit and eat" button sat right next to it. | Mild contradiction: "nothing to eat" is wrong; the one-click button fixed it. |
| 50 | 133 (game 2) | Upper Elevator | Hunger warning: "There is still goo in the survival kit you left in Storage West." | Praise: remembers where I left my food. |
| 51 | 139 (game 2) | Storage West | "eat blob of brown goo" was offered on the kit lying on the floor, but refused: "You're not holding the survival kit." Cost a turn. | Mild: an option shown on screen that can't work as offered. |
| 52 | 146-148 (game 2) | Kitchen | Put the (closed) canteen in the niche and pushed the button: the liquid spilled over the closed canteen. Had to open it and redo it. | Fair and funny, but the menu offered "put in" with no hint that the canteen was closed. |
| 53 | 148 (game 2) | Kitchen | Diagnose button now reads "(hungry, about 8 hours; tired, about 8 hours)" and a "sleep" button appears. | Big praise: exactly the planning aid I wished for in #47; it shows "tired" hours well before the collapse. I missed it in game 1 because I wasn't reading the button. |

#### Game 2, commands ~130-215 of leg 2 (game turns 0-158): the fast replay

RESTART. Waited on Deck Nine (door opened at turn 9), pod (+3), web, landing, out, kit (left the towel), swim, Crag (+3). Tried 428 on the Rec Area dial: locked (#48). Canteen from the Mess Hall, brush dropped there. Walked east: Tool Room (dropped the ID card, took the magnet), key from the crevice with the magnet, ate the red goo, Robot Shop: Floyd on (+2), searched, lower elevator card (+1). SAVE in the Robot Shop at turn 80. West: padlock unlocked with the key, Storage West (+4), dropped key, padlock, canteen and kit, carried the ladder east, bridged the rift (+4), offices: kitchen, upper elevator and shuttle cards (+3). Upper elevator to the Tower Core (+4). Back west: weary at 136 (going straight to a bunk this time), kit and canteen from Storage West, kitchen (+4), filled the canteen (second try), ate the brown goo. **SAVE in Dorm D at turn 158** (score 28), about to sleep. This game is at score 28 by turn 158 against 28 at turn 243 in game 1.

- g2 t0-35 Deck Nine, pod, crag. t41-45 Rec Area dial 428 fails. t48-51 canteen, brush dropped.
- g2 t54-80 junction, Tool Room, key, Floyd, lower card, SAVE t80.
- g2 t85-112 padlock, ladder, rift, cards. t118-129 Tower Core. t133-158 Storage West, kitchen, Dorm D, SAVE t158.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 54 | 188 (game 2) | Elevator Lobby | Fever arrived at turn 188 this game (209 in game 1). | Neutral: the disease clock isn't fixed to a turn; good that I know where the medicine is. |
| 55 | 200-224 (game 2) | Alfie Control East | Shuttle ride done right: +5 a turn to 35, centre, cruise 5 turns past "Halfway mark", then pull; the "15", "10", "5" signs are speed limits to be under as you pass. Reached 5 at the "5" sign and glided in: "comes to rest at the concrete platform". | Praise once understood; game 1's crash (#29) was reading "halfway, begin deceleration" as "brake now, all the way". A symmetric-braking hint would help, but it is solvable by reasoning. |
| 56 | 243-244 (game 2) | Course Control | Carrying the pliers, the fused bedistor still only offers "take" ("fused to its socket"); the pliers offer only examine and drop. No "take with pliers" option. | Hurts: the magnet grew a "take with magnet" option for the key (#16), so I expected the same here. Now I'm not sure the pliers are the tool, or whether the click menu just lacks the verb. |

#### Game 2, leg-2 commands ~215-260 (game turns 158-244): sleep, shuttle, Lawanda

Slept in Dorm D (woke Septem 7 at 1603), dropped the kitchen card there, pocketed the three other cards. Bedistor from Storage East, pliers from the Tool Room, ate the last goo, dropped the kit. Fever at 188. Lower elevator to Kalamontee Platform (+4). SAVE in Alfie Control East at 198. Clean shuttle ride to Lawanda (+4, score 36). Infirmary: drank the medicine (fever gone), took the ration, left the empty bottle, and noted the beds there (somewhere to sleep in Lawanda!). Course Control: opened the cube; can't get the fused bedistor out with the pliers from the menu. Next: look for another way (maybe the pliers need to be "used" differently, or the fused one must be broken out), then the library and Lab Storage for the teleport card and this game's combination.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 57 | 244-246 (game 2) | Course Control | Correction to #56: the "take with pliers" option on the fused bedistor appeared only AFTER the bare "take" had failed. Then it came out, and "put in" the good bedistor fixed Course Control (+6). | Mixed: nice that the failure unlocks the tool option, but I nearly gave up because the menu hid it the first time. The magnet's option in #16 was there from the start; here it needed a failed try first. |
| 58 | 248 (game 2) | Course Control | Canteen: after "open", a standing button "drink the quantity of protein-rich liquid" appears, while the canteen's own "…" list has no drink. | Mild: two places to look; the button is the one that works. |

Course Control fixed (score 42 at turn 247). Drank from the canteen (hungry again only ~65 turns after the goo), dropped the pliers and fused bedistor there. Now in the Library Lobby, heading south for Lab Storage (teleport card, and this game's combination note) and then the teleport to Kalamontee for the coolant.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 59 | 259 (game 2) | Lab Storage | The note now says "Combination to Conference Room: 977" (428 in game 1). | Confirms #48: rolled per game. Fair, and it stops replay shortcuts, but a restarting player gets no warning. |
| 60 | 255 (game 2) | Project Corridor East | Fever back only 20 turns after the medicine this time (game 1: ~40). | Worrying: "suppression" is very short; the real cure must be the Project's drug. |
| 61 | 268-271 (game 2) | Booth 1 / Conference Room | Booth 3's brown "1" button teleports to Booth 1, which opens into the Conference Room behind the Rec Area's dial door. Nothing in the room but a long table; the door is "locked from the other side". | Mixed: fun discovery, but the combination-lock room is empty, so the 428/977 note was a red herring or a shortcut only. |

Took the teleport card and the new battery in Lab Storage (combination 977 this game). Tried Booth 3's brown button out of curiosity: Booth 1 is the Conference Room in Kalamontee, empty. Next: Booth 1's buttons (beige, tan) to get to Booth 2 at the Elevator Lobby, then flask + coolant for the Comm Room, and the laser with the new battery (a weapon for the Bio Lab mutants?).

Booth 1's beige button to Booth 2 (Elevator Lobby): the three booths are a triangle, handy. Tool Room: swapped the laser's old battery for the new one (laser dial 1-6, set to 5), took the laser and the flask, left the old battery. Filled the flask with yellow (game 1's first colour; gambling the order is the same). Now at the Elevator Lobby heading up to the Comm Room; will SAVE before pouring in case the colour order was rolled too.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 62 | 303 (game 2) | Comm Room | The enunciator light is RED this game (yellow in game 1). SAVED at 303 and poured my yellow anyway as a test: "Coolant System Imbalance Critical -- Shutting Down All Systems", the send console dies. RESTORED to 303. | Fair since I saved, and the light was plainly red; but a wrong pour silently ends the puzzle for good with no hint that it's unrecoverable. Another per-game roll a restarting player can trip over. |

At the Comm Room with the wrong colour (red is lit). Restored the 303 save. Next: back down to empty the flask and fill red, then follow the lights.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 63 | 315 (game 2) | Machine Shop | To empty the wrong-colour flask, "pour" offers only the dispenser and its buttons (no floor, no sink). "pour on chemical dispenser" worked ("making quite a mess"). | Mild: had to guess a target; an "empty flask" or "pour on floor" would be the natural click. |

Went back down, emptied the yellow on the dispenser, filled red, came back up and poured: the enunciator now shows yellow (so this game's order starts red, yellow, ...). Heading down again for yellow. Score still 42, turn 332.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 64 | 359-360 (game 2) | Comm Room | This game the sequence was red, then yellow, then dark: two pours instead of game 1's three. +6, score 48. | Fine: the roll changes length too. Two round trips still felt long, but the payoff line ("help message is now being sent") is satisfying. |

Coolant fixed on the second pour (score 48 at turn 360). SAVED in the Comm Room at 360 (not tired yet; woke at 1603, now 5411). With the last of the budget I'll teleport to Lawanda and look at the unexplored stairs down off Systems Corridor West, ending near the Infirmary's beds for the next sleep.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 65 | 374 (game 2) | Systems Corridor West | The stairs-down exit is labelled "go down, Balcony", but it leads to the **Repair Room**. | Hurt: a wrong destination label; I nearly skipped it thinking it looped back to the Kalamontee Balcony. |
| 66 | 375-382 (game 2) | Repair Room | Robot-sized doorway, too small for me. "ask Floyd to go north": he plays with a ball and mentions "a shiny fromitz board". After that, Floyd grows an "ask to get the board" option, and he fetches it. | Big praise: the conversation teaches the next click, and Floyd's scene (Achilles fell down the stairs) is lovely. |
| 67 | 387-390 (game 2) | Planetary Defense | "examine" can't tell the four boards apart, but "take" can: the good ones shock you ("powerful shock"), the bad one slides out (the second this game; it's "fried" in my inventory). Put the shiny board in: +6. | Praise: the test is the action itself, and the shock costs nothing. Answers my open question #33. |

#### Game 2, last stretch (turns 369-390): Repair Room, Floyd and the fromitz board

Teleported Booth 2 -> Booth 3 (tan button), walked to Systems Corridor West and took the stairs down (labelled "Balcony", #65) to the **Repair Room**: the dead robot Achilles, locked cabinets, and a robot-sized doorway north. Asked Floyd to go north; he came back talking about a shiny fromitz board; asked him to get it. SAVED in Planetary Defense at 385, opened the panel: boards 1 and 3 shocked me, board 2 slid out (fried), the shiny board went in, warning lights stopped (+6, score 54). **SAVED in Planetary Defense at turn 390.** Stopped here for the command budget.

### Leg 2 handoff

- **Stopped for:** the ~400-command budget (about 395 playtest commands this leg, counting status/options/look-ups). No win; turn cap not reached.
- **Important:** this is **game 2**. At about leg-2 command 128 the game-1 save was doomed (collapsed from lack of sleep with the only save made too late, #46), so I RESTARTED. Game turns below are game 2's.
- **Game turn:** 390. **Score:** 54 of 80. **Time:** 6045, evening, day 2 (Septem 7). Woke at 1603 this day, so tiredness will come around time 8200-8300 (the first "weary" warning); the diagnose button shows "tired, about N hours".
- **Location:** Planetary Defense (Lawanda). Floyd is with me.
- **Inventory:** chronometer, uniform (pocket: shuttle card, lower elevator card), canteen (protein liquid, part drunk, closed), upper elevator card, glass flask (empty), fried fromitz board, teleportation card, laser (new battery, dial at 5), emergency ration (uneaten).
- **Saved:** yes, the single game SAVE in Planetary Defense at turn 390.
- **Health:** feverish again (came back at 255, 20 turns after the medicine; the bottle in the Infirmary is empty). Last drink at 249; hungry again probably around turn 310-330 of play time... drink the canteen or eat the ration at the next warning.
- **Left behind:** kitchen card in Dorm D; kit (empty), ID card, old battery in the Tool Room; magnet in the Robot Shop; key, padlock in Storage West; pliers and fused bedistor in Course Control; brush in the Mess Hall; medicine bottle (empty) in the Infirmary.

**Map additions (leg 2)**
- Lawanda: Systems Corridor East S -> **Library Lobby** (terminal, Booth 3 east, W up to the **Library**: microfilm reader) -> S **Project Corridor East** (E **Main Lab**, S **Computer Room**, W Project Corridor -> W Project Corridor West (W SanFac F, NW Fork)). Computer Room: S **Miniaturization Booth** (slot, numeric keyboard), W **ProjCon Office** (rippling mural, N back to Project Corridor), NE Main Lab. Main Lab: S **Lab Storage**, NE radiation lock (W/E halves; "radiation suits must be worn"), SE bio lock (W/E halves; Bio Lab beyond, full of mutants, miniaturization card inside the door).
- Systems Corridor West: stairs down (labelled "Balcony") -> **Repair Room** (Achilles, locked cabinets, robot-sized doorway N to a supply room).
- Teleport booths: Booth 1 = inside the **Conference Room** (behind the Rec Area dial door), Booth 2 = Kalamontee Elevator Lobby, Booth 3 = Library Lobby. Each has two buttons for the other two; slide the teleport card first.

**Solved in game 2 (score 54):** pod, crag, key via magnet, Floyd and lower card, padlock, ladder and rift, three office cards, Tower Core, kitchen, sleep, shuttle both platforms, Course Control (pliers pull out the fused bedistor, put in the good one: +6), Comm Room coolant (+6; colour order rolled per game: red then yellow this time), Planetary Defense (Floyd fetches the shiny board from the Repair Room's robot doorway; the bad board is the one that doesn't shock: +6).

**Open puzzles:** the Bio Lab's miniaturization card (mutants kill you when the door opens; the laser with a new battery might be the answer, or a distraction); the Miniaturization Booth (card, then a number on the keypad; "Section 661"? the computer printout said "Malfunction in Section 661"); the Radiation Lab (need a suit); Transportation Supply (dark; the green spool says the helicopter card and control-panel key are there; need a light); the rippling mural in ProjCon Office (only "examine" offered); the Physical Plant; the cure for the disease (drug testing 99.985%: probably finishes once the computer is repaired).

**Theories:** the Project froze the population and a computer is researching the cure; its malfunction in Section 661 is fixed by miniaturizing into it. Everything left points at the Bio Lab card. Per-game rolls I've seen: the conference-room combination (428, then 977), the coolant colours (yellow-blue-green, then red-yellow), and the fever's onset.

**Next I intend to:** drink or eat at the next hunger warning; before "weary", sleep in the Infirmary's beds (Lawanda) or Dorm D; then try the laser (setting?) on the Bio Lab mutants from the bio lock, SAVE first; get the miniaturization card; Miniaturization Booth, type 661.

### Leg 3

Picked up from the leg 2 handoff: game 2, turn 390, score 54, Planetary Defense with Floyd, saved there. Diagnose at 391: feverish, well-rested, well-fed. Plan: head to the Main Lab and look at the Bio Lab problem with the laser (SAVE first), then the Miniaturization Booth. Keep an eye on the "tired" hours on the diagnose button and sleep in the Infirmary beds before "weary".

#### Leg 3 friction (continuing the numbering)

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 68 | 405 | Bio Lock East | Asked Floyd to go east into the Bio Lab: "Floyd not going in THERE without a good reason." | Helped: a clear hint that Floyd is the way in, and that I need to give him a reason. Now what counts as a reason? |
| 69 | 405 | Bio Lock East | Opened the lab door again to see whether the laser could act first: instant death, no turn to shoot. SAVE at 404 made it cheap; RESTORE. | Fair (I was warned twice), and it rules out "shoot them as they come". |

**Leg 3, commands 1-15 (turns 390-405).** Walked with Floyd from Planetary Defense to the Main Lab and into the bio lock. Floyd reads the card through the window ("a miniaturization booth access card!"). SAVE at 404 in Bio Lock East. Asked Floyd to go east: he won't without "a good reason". Opened the door to test the laser: eaten at once. RESTORE to 404. Next: work out what "a good reason" for Floyd is, and look at the rest of the unexplored places (Radiation lock, Physical Plant, the mural).

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 70 | 421 | Radiation Lock East | "both lock doors cannot be open simultaneously": the radiation lock's west door stays open (the bio lock's closed by itself), so I had to go back and close it. | Mild: the refusal is clear, but the two locks behave differently, and waiting didn't help. |
| 71 | 428 | Radiation Lab | A powerful portable lamp and a brown spool on the table. "take portable lamp": too heavy, drop the laser; then "take brown spool" made the fried board fall (#27 again). | The juggle cost me time I didn't have in a radioactive room. |
| 72 | 431-433 | Radiation Lab | Sick and dizzy at 431, vomiting and bald at 432 (Floyd laughs), dead of radiation poisoning at 433, five turns after first entering. | Fair (the sign said suits), and the escalating messages are a good clock, but it's short: one wasted turn on the juggle killed me. RESTORE to 420. |

**Leg 3, commands 16-45 (turns 405-433).** Floyd: "talk to" and "ask about Floyd" (he's "very good at Hider-and-Seeker. Also fixing things"). Miniaturization Booth: slot and keypad, Floyd asks if we'll "teleport into the computer like Achilles". The mural still offers only examine. Radiation lock: had to close the west door by hand. SAVE at 420 in Radiation Lock East. The Radiation Lab holds a portable lamp (the light I need for Transportation Supply!) and a brown spool. Died of radiation after a load juggle. RESTORE to 420. Next: prepare my load outside first, and try asking Floyd to fetch things (he's a robot).

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 73 | 429-434 | Radiation Lab | Second try with the load prepared: in, lamp, spool, out, door closed, out of the lock: still died at 434, five turns after walking in. The dose is taken on entry; leaving early doesn't save you. | Fair but harsh: the game never says "leave now and you'll live"; it's just a timer to death once you set foot inside. I need a suit (none found) or someone who isn't flesh. RESTORE to 420 again. |
| 74 | 424-429 | Radiation Lock | Chaining commands, I sent a stale option number twice: "Option 33 ... is not on screen now: something has changed." Numbers for the same door differ between the two halves of the lock (33 open here, 35 there). | Helped: the refusal is safe and costs no turn. My fault, but per-room door numbers are easy to mix up. |
| 75 | 401-431 | Bio/Radiation locks | Floyd says "Is this...is this a squash court?" every single time he follows me into either lock half (six or seven times now). | Mild: charming once, then noise. |

**Leg 3, commands 46-75 (turns 420-434).** Standing in the lock with the lab door open is safe; only entering the lab doses you. Floyd won't go in on his own ("After you") and "ask about" has no lamp. Everything is back as it was, lab door closed, Floyd with me in the Main Lab at 434, still feverish. Next: look at the unexplored corners for a radiation suit or other light: the Lawanda Physical Plant, then teleport to Kalamontee for the Courtyard's west exit and the Plain Hall's NE, never visited.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 76 | 438 | Lawanda Physical Plant | "Oddly, although the Lawanda Complex is slightly smaller than its counterpart, this plant is much larger than the one in the Kalamontee Complex." | Intriguing: reads like a hint that something is hidden near it (the rippling mural?), but nothing in the click menu lets me act on it. |
| 77 | 449-451 | Rec Corridor | Hungry. The handoff said the canteen had liquid left; "look inside": empty. The standing button only offered the emergency ration. | Mild: the hunger button quietly told the truth (it offered the ration, not the canteen), which I only understood after checking. |

**Leg 3, commands 76-100 (turns 434-456).** Lawanda Physical Plant: only complicated equipment, but the size remark (#76). Teleported Booth 3 -> Booth 2 with Floyd (he squeals), walked 3 hours west. Hungry at 449, canteen empty. Plain Hall NE just loops to the Rec Corridor; Courtyard west is the ruined West Wing (cliff and ocean, dead end). So Kalamontee has no unexplored rooms left except the dark ones. Next: kitchen card from Dorm D, refill the canteen, sleep in Dorm D before "weary", then think about the radiation suit and Floyd's "good reason".

(Coordinator note at turn ~478: ***the user let the run go on, to 2,000 turns across both games***, so this game's hard stop is now **game turn 1490**. The leg's ~400-command budget is unchanged.)

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 78 | 462 | Dorm D | "take kitchen access card" made the teleport card fall (#27 again). I had to walk back, pocket the upper elevator card and drop the laser. A leg-2 restore had undone my earlier pocketing, which I'd forgotten. | Hurt: the fourth juggle this session; each costs 3-6 turns with hunger and sleep both ticking. |
| 79 | 461 | Dorm Corridor | "You begin to feel weary", and the diagnose button at once reads "hungry, about 10 hours; tired, about 10 hours". | Praise: this time I was ready, a bunk one room away. |

**Leg 3, commands 101-135 (turns 456-499).** Weary at 461; back to Dorm D for the kitchen card (juggle, #78), refilled the canteen in the kitchen and drank. **SAVE in Dorm D at 484**, slept, woke Septem 8 at 1814 (turn 487), took my things back. The fever message came again at 494 ("unusually weak"). In Storage West the tin can now offers "open": "you don't seem to have found a can opener yet" (so the game knows I'll want one). Took the steel key: the Repair Room in Lawanda has locked cabinets, and this key is the only key I own. Next: teleport back to Lawanda and try it.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 80 | 512 | Systems Corridor West | The stairs exit now reads "go north / down, Repair Room" (it said "Balcony" in leg 2, #65). | Good: the label corrects itself once the room is visited. The first-visit guess was still wrong. |
| 81 | 504-507 | Booth 2/3 | Hungry again ~25 turns after drinking a full canteen (but I'd slept in between). The canteen holds one drink. | Mild: the sleep seems to eat the meal. Fair, but the kitchen is 3 hours from everything. |
| 82 | 514-516 | Repair Room | Brought the steel key for the "wide storage cabinets, all locked": the key offers only examine and drop, and the cabinets only examine ("The cabinets are locked."). "ask Floyd to go north": "Not again." | Dead end, no hint whether the cabinets can ever open. A wasted trip. |

**Leg 3, commands 136-160 (turns 499-519).** Walked east, teleported Booth 2 -> 3 with Floyd, down to the Repair Room. The key does nothing for the cabinets; Floyd won't crawl through again. Hungry (12 h), fever, rested. Open problems are down to two big ones: the Bio Lab card (Floyd needs "a good reason") and the Radiation Lab lamp (need a suit). Next: go back to the Bio Lock and try things with Floyd there, more patiently.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 83 | 530-534 | Bio Lock East | Floyd's "ask about" list has no card, no mutants, no lab; "throw at Floyd" lists my items. "ask about yourself": "You are Floyd's friend!" (a hug). | Warm, but no route to the "good reason" he wants. |
| 84 | 535 | Bio Lock East | SAVE at 534. "shoot window" with the laser: "The window grows a bit warm, but nothing else happens" and **+2 points** (score 56). | Puzzling: points for an action that did nothing. Is it for firing the laser at all? For the window? I can't tell what I did right, so I can't build on it. |

**Leg 3, commands 161-180 (turns 519-535).** Back in Bio Lock East with Floyd. Ate the emergency ration (hungry 7 h; no food left now except the kitchen refills). Floyd still refuses without a good reason. **SAVE at 534 in Bio Lock East.** Shot the window with the laser on setting 5: +2 points, no visible effect. Next: try the other laser settings, and think about what a "good reason" could be.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 85 | 536-538 | Bio Lock East | Laser setting 6 shoots a violet beam, setting 5 a blue one; the window only "grows a bit warm". | Interesting: the six settings look like colours of the spectrum. No use found yet. |
| 86 | 539 | Bio Lock East | "show to floyd" exists only on the lower elevator card (the one that came out of Floyd): "Can you play any games with it?" | Cute, but the one "show" option isn't the one I need. |
| 87 | 555 | Computer Room | The printout now says "Malfunkshun in Sekshun 763" (game 1 said 661). Revival "0 daaz, 0.8 kronz" away. | Good that I re-read it: another per-game roll. Took the printout this time so I carry the number. |

**Leg 3, commands 181-205 (turns 535-556).** Tried laser setting 6 on the window (violet, nothing). Showed Floyd the lower elevator card ("Can you play any games with it?"). Library terminal: Technology -> Robotics and Medicine are flavour only. Computer Room: this game's section is 763; took the printout. Floyd went exploring. Next: wait for Floyd, then see whether anything about the printout or the booth gives him his "good reason".

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 88 | 563-568 | Main Lab / Bio Lock East | The "good reason" was the computer printout: after "show to floyd" (he says the Computer is the most important part of the Project), asking him to go east at the window made him volunteer: "Floyd will get card ... You open the door, then Floyd will rush in. Then you close door. When Floyd knocks, open door again." | Big praise: the "show to floyd" option on the printout was the key and the click menu offered it the moment I carried it. It only took me a while because I had left the printout in the Computer Room (in leg 2 and until now). |
| 89 | 569-573 | Bio Lock East | Open, close, three knocks, open, close: Floyd comes out with the card, torn apart, and dies in my lap while I sing him the Ballad of the Starcrossed Miner. +2 (score 58). | The emotional high point of the game. The instructions were spelled out so the click sequence was easy; I genuinely didn't expect him to die. |

**Leg 3, commands 206-225 (turns 556-573).** Showed Floyd the printout; at the bio lock he volunteered to fetch the card. **SAVE at 568 in Bio Lock East** before opening. Door open, close, knocks, open, close: Floyd brought out the miniaturization booth card and died. Score 58. Next: take the card, go to the Miniaturization Booth, type 763 (this game's section).

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 90 | 583 | Station 763 | Arrived: the room heading says "Station 763" but the status line under it says "Station 384". | Confusing: which number is real? I'd typed 763. Looks like a display slip. |
| 91 | 587-596 | Strip Near Relay | Blue speck inside a red plastic relay. Reasoned that a red beam (setting 1) would pass the red plastic; it did: several misses, two hits, speck vaporized, +8 (score 71). "Proceed to exit station." | Big praise: a real reasoning puzzle using the laser's colour dial, and the misses make it tense. The "laser feels warm" messages built dread. |
| 92 | 597-599 | Middle of Strip | A giant red microbe blocks the way back. The red beam "passes harmlessly through its red skin"; switching the dial costs a turn and it ate me. Died. | Fair and consistent with the speck (red passes red), but the one-turn dial change is deadly. RESTORE to 588. |

**Leg 3, commands 226-250 (turns 573-599).** Took the miniaturization card (+1). Miniaturization Booth: slid the card, typed 763: shrunk into the computer (+4 on the strip). SAVE at 581 in the booth and again at 588 at the relay. Laser on 1 through the red plastic killed the speck (+8, score 71). On the way back a red microbe blocked the strip; the red beam passed through it and I died while turning the dial. RESTORE to 588. Plan: kill the speck on 1, then set the dial to another colour *before* walking south.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 93 | 599-602 | Middle of Strip | Second death: blue beam wounds it but "the wound quickly seals"; throwing the laser at the microbe: "ignores the laser"; throwing it off the strip while only "somewhat warm": eaten. RESTORE to 588, had to redo the random-miss speck shooting. | Hurt a little: I hadn't saved after the speck (my slip); the speck's random misses make each replay a gamble of turns. |
| 94 | 601-603 | Middle of Strip | Kept shooting until "very warm" and "Another pseudopod, perhaps attracted by the warmth of the laser, tries to envelop the weapon": then "throw off the strip" and the microbe dives after it. Back at the station: "switching to Auxiliary Booth", +4 (score 75). | Praise: the warmth messages are a fair, readable hint once you see them escalate; losing the laser feels like a real sacrifice. The click menu offering "throw off the strip" on the laser made the idea visible. |

**Leg 3, commands 251-275 (turns 588-605).** RESTORE to 588, speck again, **SAVE at 593** at the relay. Dial to 5, south, shot the microbe until the laser was "very warm" and it grabbed for the laser, threw the laser into the void: the microbe followed it. West to the station: teleported to an Auxiliary Booth (+4, score 75 of 80). Next: see where the Auxiliary Booth is, and what the computer's repair has done (the cure?).

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 95 | 606-612 | Lab Office | The Auxiliary Booth opens into the Lab Office, whose only exit is through the Bio Lab. The desk holds a gas mask; three buttons (lights on, lights off, red "Emergency System"). Putting on the mask triggered "Revival procedure beginning. Cryo-chamber access from Project Control Office now open." | Praise: the mask + red button pairing is readable, and the announcement points straight at the rippling mural I couldn't touch earlier (#40). |
| 96 | 613-614 | Lab Office | Pushed red (hissing), waited one turn, opened the door: the mist was already clearing and the mutants rushed me. RESTORE to 612; opened the door at once instead. | Tight window (one turn), but the "mist clears" line gave me the chance to see my mistake. |
| 97 | 614-623 | Bio Lab to Cryo-Elevator | Through the misty Bio Lab, the lock, Main Lab, Computer Room and ProjCon Office with the mutants "right on your heels" every step; the mural had slid away to an elevator; one push and the door closed as they reached it. +5, **score 80 of 80**. | Big praise: a proper chase that the click menu handles well because each step is one obvious exit. Floyd's body lying in the lock as I ran past was a nice cruel touch. |

**Leg 3, commands 276-300 (turns 605-623).** Lab Office: gas mask from the desk, worn; **SAVE at 606 and 612**; red Emergency System button fills the Bio Lab with mist. First try I waited a turn and the mist cleared; RESTORE to 612. Second try: open door at once, west through the Bio Lab, the locks, Main Lab, SW, W into ProjCon Office where the mural has slid away, S into the Cryo-Elevator, push: score **80/80** at turn 623. The elevator is going down.

| # | turn | where | what happened | why it hurt or helped |
|---|------|-------|---------------|-----------------------|
| 98 | 626 | Cryo-Elevator | Hunger warning on the way down: "There is nothing to eat or drink on this side of the shuttle tunnel." | Useful information, though by then it didn't matter. |
| 99 | 627 | Cryo-Anteroom | The ending: Veldina wakes, the cure is found, the Flathead arrives, Blather is demoted to my toilet attendant, and **Floyd comes back repaired** with a helicopter key, a reactor elevator card and a paddleball set "for the sequel". | Wonderful payoff, and it answers my open threads (the helicopter, the reactor elevator, the radiation lamp and the dark rooms were never needed). |

### The ending

- **Won** at game turn **627** (game 2), leg-3 command about 305. Final score **80 of 80**, rank **Galactic Overlord**. Day 3, time 4146.
- **Location:** Cryo-Anteroom, below the ProjCon Office.
- **Inventory at the end:** chronometer, Patrol uniform (pocket: upper elevator, shuttle and lower elevator cards), gas mask (worn), canteen (empty), key, computer printout, miniaturization card, teleportation card. The laser went into the void with the microbe.
- **Saves this leg:** 404 and 420 (radiation lock, twice restored), 484 (Dorm D, before sleep), 534 and 568 (Bio Lock East), 581 (Miniaturization Booth), 588 and 593 (Strip Near Relay), 606 and 612 (Lab Office). **Restores:** to 404 (Bio Lab door), 420 twice (radiation), 588 twice (microbe), 612 (mist).
- **Deaths this leg:** Bio Lab door (1), radiation poisoning (2), microbe (2), plus the mist mistake avoided by restoring before death.

**How the last stretch was solved:** show the computer printout to Floyd, then ask him to go into the Bio Lab: he fetches the miniaturization card and dies. Booth: card, type the sector number from the printout (763 this game). Inside the computer: laser on setting 1 (red) through the red relay casing at the blue speck; set it to a non-red colour before meeting the red microbe, shoot until the laser is very warm and the microbe grabs for it, throw the laser off the strip. The Auxiliary Booth leads to the Lab Office: gas mask from the desk, wear it, red Emergency System button, open the door *at once*, and run through the Bio Lab to the ProjCon Office, where the mural has opened on the Cryo-Elevator. Push its button.

**Never needed:** the Radiation Lab lamp and brown spool, Transportation Supply and the helicopter, the reactor stairs and elevator, the Repair Room cabinets, the Spam tin, the combination-lock Conference Room (other than as a teleport end).
