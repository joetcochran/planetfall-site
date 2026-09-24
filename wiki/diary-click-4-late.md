# Round 4: click-4-late, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 4, 10 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the Tower Core checkpoint (turn 107, score 21)
- **Result:** Did not win. Where play ended: Kitchen, turn 499, with 42 points.
- **Commands:** 410, with one death

**About the numbers.** Died at 42 at turn 499, then restarted once from the checkpoint only to confirm it (diary line 182), so the transcript's last line reads 21. The final score here is the score at the death that ended play.

The diary below is `playtests/2026-09-10/2026-09-10-click-4-late.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest from a checkpoint: session `click-4-late`
**Who:** Claude (blind, mouse-only playtester; no prior knowledge used) **Date:** 2026-09-10  **Session:** `click-4-late` (`node scripts/playtest.mjs --session click-4-late --new --checkpoint tower-core --click`)

### Briefing

The briefing told me I am a Stellar Patrol ensign whose ship blew up; I climbed from the sea to a deserted complex, used a magnet to fish a key out of a crevice, opened Storage West, bridged a rift with a ladder, found three access cards, and rode the upper elevator to the top, where I now stand in the Tower Core at turn 107, score 21. It is clear and well paced: it says what I carry, what I left where (kit, towel, brush, flask, pliers, laser), and which rooms I have seen. The one thing it does not say is what my goal is beyond survival, so I start without a direction other than "explore upward".

### Attempt 1, turns 107-122: the top of the tower

I started in the Tower Core with four exits on the list. First I read the brochure (it is a joke ad for the game itself), then went northeast into a Comm Room. It is the most interesting room so far: a receive console with a "Mesij Plaabak" button and a send console flashing "Malfunkshun in Sendeeng Kuulint Sistum", a funnel-shaped hole labelled "Kuulint Sistum Manyuuwul Oovuriid" (coolant system manual override), and a green light flashing on an enunciator. Pushing the button played the Feinstein's last call, cut off by the explosion; a nice, grim beat. The screen reads (decoding the phonetic spelling) "to any ship of the Second Galactic Union: planetwide plague has struck the entire population... emergency assistance requested". So the people here died of a plague, and the send console wants coolant poured into the funnel. "Examine" on the light, hole and enunciator all just said "I see nothing special", which is a bit flat for what are obviously clue objects; my guess is that the green colour is the clue and I need a green liquid in a container (the glass flask in the Tool Room comes to mind).

Southwest of the core is the Observation Deck: I am on an island, with another island 20 km east. Up the stairs is a Helipad with a rusty helicopter. "get in" worked and showed a control panel "covered and locked", and a "lock" in the scenery. I carry a key, but the key only offers "examine" and "drop", and the lock only "examine". So I cannot even try the key on the lock. Maybe the key simply does not fit (it was the padlock key), but a mouse player has no way to test that.

### Attempt 1, turns 123-150: down again for a flask, and a chemical dispenser

My plan was: fetch the glass flask, find some green liquid, pour it into the coolant funnel. Riding the elevator down needed the card slid again ("Nothing happens. The slot beside the buttons stays dark", then slide, then "Elevator enabled"), which the list made easy since each card grows a "slide through slot" entry inside the elevator. Two "wait"s later I was at the bottom. The lobby has a telephone-booth-sized room to the east, "Booth 2", with buttons "1" and "3" and a slot. The shuttle card was refused ("Inkorekt awtharazaashun kard"), the brown button said "Teleportaashun buux not aktivaatid", and my ID card got a lovely reply: "Magnetik striip randumiizd" -- I think carrying it near the magnet wiped it. That is a funny consequence I did not see coming.

The exit labels were a real help on the way to the Tool Room: unvisited exits have no name, visited ones do ("go southwest, Tool Room"), so I could find it without a map. I did "take all" and got the flask, pliers and laser (with an old battery, dial on 5). East of the Tool Room is a Machine Shop with a dispenser: four coloured coolants, three catalysts, a base and an acid. The flask gained a "put under spout" entry, which was exactly what I wanted. Then I made a mistake the interface invited: I queued "push green button" by its old number, but putting the flask down moved it into "In the room" at the top of the list and every number shifted, so I examined the red button instead. After re-reading the options, green filled the flask, and then "the fluid gradually turns milky white", which puzzles me. I was also warned I am getting hungry and thirsty; the goo is back in Storage West.

### Attempt 1, turns 151-173: a robot friend, and lunch

East of the Machine Shop is a Robot Shop with one intact robot. "turn on" gave "Nothing happens. Then again, you notice a faint hum" and two points; one "wait" later he woke up: "Hi! I'm B-19-7, but to everyperson I'm called Floyd... Let's play Hider-and-Seeker you with me." He follows me around ("Floyd bounds into the room. 'Floyd here now!'") and fills the silence with little jokes (a crayon on the wall, an off-key ballad). That was the best moment of the run so far. Oddly, once Floyd was awake he vanished from the option list: "Floyd is here" in the room text, but no "examine Floyd" or "talk to" entry anywhere.

In the same turn I got "You begin to feel weary", and a "sleep" button appeared in the button row, which is a thoughtful touch. Hunger had got worse, so I walked back to Storage West (the long hallway west is compressed into one move with "You walk down the long, featureless hallway for a long time", which I appreciated). Eating was fiddly: "eat blob of brown goo" is offered while the kit sits on the floor, but answers "You're not holding the survival kit". Taking the kit then said "Your load is too heavy. Dropping the glass flask would make enough room", a helpful message, but I did not want to drop the flask of coolant, so I dropped the laser instead, took the kit, ate ("just like delicious Nebulan fungus pudding"), dropped the brochure and key, and was able to pick the laser back up. Now I want to sleep before hauling the flask up the tower.

### Attempt 1, turns 174-188: kitchen, bed, and a new day

Before bed I peeked into the Mess Hall: a canteen on a bench (too heavy to add; "Dropping the survival kit would make enough room") and a slotted door. "slide kitchen access card through slot" opened it and entering the Kitchen gave four points (27). The kitchen has a "Hii Prooteen Likwid Dispensur" with an octagonal niche, and the canteen is octagonal, so I know what to do next time I am thirsty. But "You're really tired now", so I walked to Dorm Corridor and north into Dorm D, used "get in bed" and "sleep", and one wait later slept through to SEPTEM 7. Floyd was bouncing at the foot of the bed: "About time you woke up, you lazy bones!"

Two things on waking. First, everything I carried "slipped to the floor", and while I was still in bed the list offered examine/read for each item but no "take"; I had to get out first, then "take all" (which worked well and picked everything up in one go). Second, the flask is now empty: its description no longer mentions the milky fluid. Nothing told me when it went. I suspect the coolant spoiled or spilled during the night, or it was never the right mix (it turned white right away). I will need to refill it and go straight to the tower.

### Attempt 1, turns 189-227: water bottle, coolant run, and the light turns brown

I planned my morning around the weight limit. The game tells me exactly what to drop each time ("Dropping the ID card would make enough room"), so I shed the randomised ID card in the Mess Hall and took the canteen. In the Kitchen, "put in: ... canteen" on the dispenser seated it "snugly into the octagonal niche", "open canteen" then "push button" filled it with brown liquid. A full canteen is heavier, so the pliers stayed behind in the Kitchen.

Then the long haul: Mess Hall to the Machine Shop, eight moves. Here I tripped over the phrase rule. I typed "put glass flask under spout" and got "That is not one of the options on screen (PUT-UNDER glass flask with spout is not in any menu)"; the option is written "put under spout" under the flask, so I would have had to type it exactly. Worse, I had queued "push green button" in the same batch, and it went through with the flask not under the spout: "Some sort of chemical fluid pours out of the spout, spills all over the floor, and dries up." My own fault for batching, but the rejection message could say which phrase would have worked. With the right number, the flask filled green-then-milky again. Taking it was too heavy, so the laser stayed on the Machine Shop floor.

Elevator up (slide card, up, wait, wait), into the Comm Room. Now Floyd finally shows up in a new "Characters" block with a big list (talk to, salute, listen to, turn off, throw at...), and the fluid has a new "pour into funnel-shaped hole" option, which reassured me I was on the right track. Pouring it: "The lights on the enunciator panel blink rapidly and all go off except one, a brown light." So it is a sequence: the light tells me which colour comes next, and brown is one of the catalysts. That means another round trip of about 25 moves.

### Attempt 1, turns 228-258: the help message goes out

The second round trip went smoothly because I now knew the whole route by heart and the exit labels read like a map. On the way down I got "really ravenous"; "open canteen" revealed "a quantity of protein-rich liquid" which then had its own "drink" entry, so no goo needed. Brown catalyst went into the flask (again "gradually turns milky white", so that is just what these chemicals do), Floyd wandered off "exploring" and then caught up at the elevator ("Hey, wait for Floyd!"). One thing I liked: the pour option accepts the phrase "pour into funnel-shaped hole" without the object name when only one thing can be poured.

Result: "The lights on the enunciator panel blink rapidly and then go dark. The coolant system warning light goes off, and another flashes, indicating that the help message is now being sent." Score 27 to 33. That feels like a real milestone: someone may come for me. I do not yet know what to do next, so the plan is to sweep the rooms I have not opened: the unnamed doors off Mech Corridor and Mech Corridor North, Dorm D's north end, the south side of Dorm Corridor, Rec Corridor, and the red door in the Elevator Lobby.

### Attempt 1, turns 259-285: sweeping the Mech wing

Down again (the elevator intercom played "innocuous Hawaiian music", which made me laugh) and into the unnamed doors. Storage East had an oil can and a cardboard box of spare parts: a cracked fromitz board, a B-series and a K-series megafuse, and a good ninety-ohm bedistor. Those smell like repair parts for a robot or a machine. I left the empty flask there to make room and took the box and oil can. West of Mech Corridor North is the Physical Plant (a dim hall of catwalks, nothing to take). East of Mech Corridor is Reactor Control: controls "you shouldn't even be thinking about touching", a dark stairway down ("It is pitch black. You might be eaten by a grue", so I need a light source), and a button that opens a Reactor Elevator. The elevator's doors had closed again by the time I came back up from the stairs, and "go east / in" just said "The reactor elevator door is closed", so I pushed the button again. Inside, all three of my cards are refused. I need another card and a light. The list making "slide through slot" appear on each card when a slot is present is great for quickly trying every card.

### Attempt 1, turns 286-313: dormitories and a locked door with a dial

"talk to Floyd" only got "Hi!" and a bounce; cute, not useful. I swept the western half: Dorm C and D, Dorm A and B off Rec Corridor, and a SanFac behind each, all empty ("You marvel at how little the millenia and cultural gulfs have changed toilet bowl design" made me grin the first time, less the fourth). Eight rooms, nothing to take. The Rec Area west of Rec Corridor was the only find: a door north that is "closed and locked" with a combination dial "set to 0", turnable "to any number between 0 and 1000". The dial has a "set to a number <value>" entry, which is the right tool for it, but I have no clue to the number, and 1001 guesses is not a plan. "play games" with Floyd until I "drop to the floor, exhausted" was a nice bit of colour. Open leads now: the combination, a light for the reactor stairs, a card for the reactor elevator, the teleport booth, the helicopter lock, and the south red door in the Elevator Lobby. I also have not yet looked at Plain Hall south of here, or the far end of Admin Corridor where the offices were.

### Attempt 1, turns 314-341: back across the rift, looking for clues

With no idea for the dial, I walked the loop: Plain Hall, the Courtyard, a rubble-choked West Wing ("move rubble": "Not bloody likely."), then all the way round to the admin side. The unlabelled east exit of Admin Corridor South was just SanFac E. West of Admin Corridor, behind a doorway marked "Sistumz Moniturz", a wall of monitors shows KUMUUNIKAASHUNZ green (I fixed that one, I think), LIIBREREE, REEAKTURZ and LIIF SUPORT green, and PLANATEREE DEFENS, PLANATEREE KORS KUNTROOL and PRAJEKT KUNTROOL malfunctioning. That reads like the game's to-do list, which I like a lot.

Over the ladder, Admin Corridor North has two doors I never opened. North, "Tranzportaashun Suplii", is pitch black with the grue warning again, and its exit entry is a merged "go north / east / west", which looks like the game folding three dark exits into one button. East, the "Plan Ruum", has two maps: "Kalamontee Kompleks" (here, two installations joined by a long hallway) and "Lawanda Kompleks" (two installations, one deep underground), which I take to be the island 20 km east. Both office desks are empty now. So I now have two dark rooms and no lamp. The only unread thing I remember is the towel in Storage West, which had a "read" entry; worth the walk.

### Attempt 1, turns 342-369: the towel's joke, and a red door I had ignored

The towel read: "S.P.S. FEINSTEIN / Escape Pod #42 / Don't Panic!" -- a joke rather than a clue, though I did wonder about 42 for the dial. The tin can of "Spam and Egz" needs a can opener I have not found. Then I realised I had never pushed the red button in the Elevator Lobby. "The red door begins vibrating a bit", and three waits later "The door at the south end of the room slides open" onto a Lower Elevator with its own slot. None of my cards work there ("Inkorekt awtharazaashun kard"). So there is a fourth card somewhere, and the obvious hiding places are the two dark rooms and the combination door. I tried "look inside" and "search" on Floyd, since he keeps producing things "from one of his compartments", but he just giggles "You're tickling Floyd!". I am starting to circle: every lead needs a light, a number, or a card I do not have.

### Attempt 1, turns 370-381: betraying Floyd, and the shuttle platform

Floyd produces crayons "from one of his compartments" but tickles when searched, so I tried the unkind thing: "turn off Floyd". "Floyd, shocked by this betrayal from his new-found friend, whimpers and keels over." Then "search Floyd": "In one of the robot's compartments you find and take a magnetic-striped card embossed 'Loowur Elavaatur Akses Kard.'" (+1). I turned him straight back on ("Why you turn Floyd off?" he asks accusingly), and felt bad. It is a clever puzzle and the list gave me all the pieces (Floyd has both "turn off" and "search"), but the only hint was the compartment flavour text; I found it by elimination after 30 turns of circling. The new card also sprouted a "show to floyd" entry, which I did not try.

The lower elevator took the new card and four waits to reach the bottom. North out of it is a concrete Waiting Area, and east the "Shutul Platform -- Kalamontee Staashun" with a shuttle car, open door "beckoning you to enter" (+4, score 38). This must be what the shuttle card is for, and the Lawanda map suggests where it goes.

### Attempt 1, turns 382-410: driving the shuttle

Boarding was clumsy. The platform lists "go north" (answer: "You can't go that way.") and the shuttle car's "get in" entry, which answered "Use 'north' or 'south'." That is parser advice for a typist, and "north" is the wrong one; "go south" was the way in. Inside, the east control cabin has a slot, a lever (up "+", centre, down "-") and a speed display. The shuttle card: "Shuttle controls activated." Then I drove it, and this was the best sequence of the session. "push lever": the car starts and the display climbs 5 per turn; I let it reach 25 and pulled the lever back to centre to coast. Around turn 398 a sign flashed by: "Hafwaa Mark -- Beegin Deeseluraashun." I pulled to "-" and bled speed to 10, centred, and then passed signs "surrounded by blinking red lights" reading "15", "10", "5", which I read as speed limits and matched: 5 at the "5" sign, then "approaching a brightly-lit area", one more pull, and "The shuttle car glides into the station and comes to rest at the concrete platform." Push and pull on a three-position lever map perfectly onto clicks, and the countdown signs give just enough warning. I ate my last goo (lima beans) while coasting. The shuttle cabin still offers "get in" on the shuttle car while I sit in it.

### Attempt 1, turns 411-433: Lawanda, an infirmary, and a fever

Stepping onto the Lawanda Platform gave four more points (42). Up a dead escalator, a Fork, then Systems Corridor West. The Infirmary to the northwest had a red spool labelled "Simptumz uv Xe Dizeez" and a bottle of "Dizeez supreshun medisin -- eksperimentul". The weight limit bit again, so the empty survival kit and the upper elevator card stayed behind. Then Floyd found the rusted breast plate of his friend Lazarus, went silent, "begins sobbing quietly, awkwardly excuses himself, and runs out of the room". That hit harder than I expected from a list of numbered options.

The doorway marked "Planateree Deefens" (one of the red monitors back home) has a light reading "Surkit Boord Faalyur" and an access panel with four fromitz boards. Only the second one had a "take" entry, which is a strong (maybe too strong) hint; pulling it out turned it into a "fried seventeen-centimeter fromitz board" and left an empty socket. My spare from Storage East is cracked, and it is not offered in the panel's "put in" list, probably because it is still inside the cardboard box. So I need a good board. And as I walked on: "You notice that you feel unusually weak, and you suspect that you have a fever." I think I have caught the plague. The medicine bottle suddenly matters.

### Attempt 1, turns 434-446: course control, the library, and a keyboard I cannot touch

"diagnose" confirmed "You are a bit sick and feverish." North of Systems Corridor East, Course Control flashes "Bedistur Faalyur!" and "Kritikul diivurjins frum pland kors". Its metal cube holds "a fused ninety-ohm bedistor", and I have a good ninety-ohm bedistor in my box, so this is a clear swap. But "take" says "It seems to be fused to its socket", and the wide-nosed pliers are lying in the Kalamontee kitchen, a shuttle ride away. That one hurt; I had dropped them for a canteen of soup.

South is the Library Lobby: a green spool ("Helikoptur Opuraateeng Manyuuwul"; too heavy to add) and a terminal. "turn on terminal" showed a menu: 1. Histooree 2. Kulcur 3. Teknolojee 4. Jeeografee 5. Xe Prajekt 6. Inturlajik Gaamz, and "examine terminal" describes "a keyboard with ten keys numbered from zero through nine". But there is no keyboard object, no "type" or "press <value>" entry, nothing. A numbered menu that a mouse player cannot pick from is the biggest interface hole of the run so far. Up the steps, the Library's microfilm reader took the red spool (via "put in") and told me the disease kills "in aat tuu ten daaz" after the first symptoms, with fever first and then "a sharp inkrees in xe amownt uv sleep needid". So I have days, not hours, but the clock is running.

### Attempt 1, turns 447-459: the lab, a teleport card, and 982

South of the Library Lobby is Project Corridor East and the Main Lab, with a radiation-lock door and a bio-lock door I decided not to open while feverish and alone. Lab Storage had a fresh laser battery and a pale blue lab uniform; "search lab uniform" found "a small piece of paper and a teleportation access card in the pocket". The paper: "Kombinaashun tuu Konfurins Ruum: 982." I am fairly sure that is the dial on the locked door in the Rec Area. The teleport card is the real prize: there are booths at both ends, so the pliers are no longer a shuttle ride away. The weight limit forced another shuffle: the canteen stayed in Lab Storage and I left the paper (I will remember 982).

The Computer Room has a glowing red light, and Floyd, unprompted: "Uh oh. Computer is broken. A Doctor-person once told Floyd that Computer is the most important part of the Project." The printout's last page shows the cure research at 100% and drug testing at 99.985%, then "ALURT! Malfunkshun in Sekshun 384! Sumuneeng reepaar roobot." So the endgame is taking shape: fix the computer so the Project can finish, fix the planet's defences and course. Floyd reacting to rooms like a guide is lovely.

### Attempt 1, turns 460-499: the miniaturization booth, a teleport home, and death by sleep

West of the Computer Room, the ProjCon Office has a garish mural that "seems to ripple now and then, as though a breeze were blowing behind it" (Floyd: "I don't remember seeing this before"). Nice clue, but the exit list already had a "go south" there that the room text does not mention, and it answered "The cryo-elevator door is closed." So the list gave away the secret door before the mural could. Project Corridor and Project Corridor West led back to the Fork and a small SanFac F, where "You begin to feel weary" appeared at turn 464 -- early, which fits the microfilm's warning about the disease increasing sleep.

South of the Computer Room is a Miniaturization Booth (Floyd whispers "Are we going to teleport into the computer like Achilles always used to do?"), whose keyboard DOES have a "type a number <value>" entry. I would type 384 for the broken section, but it wants a card I do not have; the teleport card is refused. Booth 3 in the Library Lobby took the teleport card ("Redee") and the beige "2" button put me in Booth 2 back home. Floyd "gives a terrified squeal". I went for the kitchen: hungry, I refilled the canteen, dropped the cracked board to make room, drank, and in the same turn: "You can't stay awake a moment longer. You drop to the ground and fall into a deep but fitful sleep." Then "several ferocious beasts (could they be grues?) surround and attack you. Perhaps you should have found a slightly safer place to sleep." Dead at turn 499, score 42.

In fairness, 35 turns passed between the first weary message and the collapse, and I was chaining moves and reading only the first lines of each reply, so a "really tired" warning may have scrolled past me. But in a mouse interface the "sleep" button had been sitting in the button row since 464 with nothing to set it apart, and the kitchen is not a bed. A stronger visual cue (the button changing to "sleep (urgent)" or similar) would have saved a 390-turn run.

### Attempt 2, turn 107: restart, and stopping

The restart command put me back in the Tower Core at turn 107, score 21, with the briefing inventory, exactly as promised. By then I had spent 392 turns against a budget of about 200, so I stopped rather than replay the coolant runs. If I went on, the order would be: coolant (green then brown), Floyd's card, shuttle, teleport card, pliers via the booths, and above all sleep in a bed as soon as "weary" shows up.

### Friction log

| Turn | Where | What happened | Kind |
|---|---|---|---|
| 110 | Comm Room | "push glowing button" plays the Feinstein's last message, cut off by an explosion; strong story beat | Positive |
| 111 | Comm Room | Screen text in phonetic spelling is readable and hints at the plague and the coolant fault | Positive |
| 112-114 | Comm Room | examine light / funnel-shaped hole / enunciator all answer "I see nothing special", for objects the room text makes important | Unhelpful response |
| 118 | Helipad | "get out" of the large vehicle is offered while I am standing outside it | Dead option |
| 121 | Helicopter | A "lock" and a key in hand, but no "unlock" or "put key in" option anywhere; cannot test the obvious idea | Action not on list |
| 126 | Upper Elevator | "push down" refused ("slot stays dark") until the card is slid again; fair, and the reply says why | Positive |
| 136 | Booth 2 | Sliding the ID card: "Magnetik striip randumiizd"; funny consequence of carrying the magnet | Positive |
| 141 | Mech Corridor South | Exit labels name visited rooms ("go southwest, Tool Room"), so I found my way back with no map | Positive |
| 148-149 | Machine Shop | Putting the flask under the spout moved it into "In the room" and renumbered everything below; my next number hit the wrong button | Confusing |
| 150 | Machine Shop | Green coolant "gradually turns milky white"; unclear whether that is the right stuff or it went bad | Confusing |
| 156-157 | Robot Shop | Turning on the robot, then Floyd waking up and following me; charming | Positive |
| 158 | Robot Shop | "Floyd is here" but Floyd has no entry in the option list at all (no examine, no talk) | Action not on list |
| 157 | Robot Shop | "sleep" button appears as soon as I am told I am weary | Positive |
| 163 | Corridor Junction | The long walk west is one move with a "you walk for a long time" line | Positive |
| 166 | Storage West | "eat blob of brown goo" offered while the kit is on the floor, refused with "You're not holding the survival kit" | Dead option |
| 166 | Storage West | "Your load is too heavy. Dropping the glass flask would make enough room" tells me exactly what to do | Positive |
| 176 | Mess Hall | Kitchen card opens the door, entering the kitchen scores; the dispenser's octagonal niche matches the octagonal canteen, a fair clue | Positive |
| 185 | Dorm D | After waking, items on the floor have examine/read but no "take" while I am in bed | Action not on list |
| 187 | Dorm D | "take all" collected all eight dropped items in one click | Positive |
| 188 | Dorm D | The flask's milky fluid is gone with no message about when or why | Silent state change |
| 191 | Mess Hall | Weight messages name the item to drop; made juggling a full inventory painless | Positive |
| 209 | Machine Shop | Typed "put glass flask under spout"; rejected as not on screen, the listed phrase is "put under spout" under the flask; the reply does not suggest the right form | Unhelpful response |
| 210 | Machine Shop | A batched "push green button" then ran with no flask under the spout and the coolant was wasted | Confusing |
| 226 | Comm Room | Floyd now has a "Characters" block (talk to, salute, listen to...); he was missing in the Robot Shop | Positive |
| 227 | Comm Room | "pour into funnel-shaped hole" appears for the fluid; pouring turns the enunciator light brown, so the colour is the clue for the next chemical | Positive |
| 227 | Comm Room | Each colour means a ~25-move round trip between the Machine Shop and the tower top | Pacing |
| 234 | Upper Elevator | Opening the canteen exposes the liquid with a "drink" entry; clean | Positive |
| 258 | Comm Room | Second pour sends the help message, +6 points; a clear, satisfying milestone | Positive |
| 263 | Upper Elevator | "Innocuous Hawaiian music oozes from the elevator's intercom" | Positive |
| 269 | Storage East | Box of spare parts (fuses, bedistor, fromitz board) all listed with their own take entries; easy to grab the lot | Positive |
| 279 | Reactor Access Stairs | Stairs down are pitch black; no light source in my kit, so this is a dead end for now | Puzzle (stuck) |
| 280 | Reactor Control | Reactor elevator doors close on their own with no message; next "go east" just says the door is closed | Silent state change |
| 283-284 | Reactor Elevator | Every card gets "slide through slot" as soon as a slot is present, so trying all cards is quick | Positive |
| 285 | Reactor Elevator | "talk to Floyd" only returns "Hi!"; the long Floyd action list mostly leads nowhere | Unhelpful response |
| 292-307 | Dorms A-D | Eight near-identical dorm and SanFac rooms with nothing in them; cheap to check, but a lot of walking | Pacing |
| 310 | Rec Area | Combination dial with a proper "set to a number <value>" entry; good fit for mouse play | Positive |
| 311 | Rec Area | Locked door with a 0-1000 dial and no clue in sight yet | Puzzle (stuck) |
| 316 | West Wing | "move rubble": "Not bloody likely." | Positive |
| 328 | Systems Monitors | Monitor wall lists which systems are broken; a good in-world goal list | Positive |
| 333 | Transportation Supply | Second pitch-black room; no light source found anywhere so far | Puzzle (stuck) |
| 333 | Transportation Supply | Dark room shows one merged exit "go north / east / west" | Confusing |
| 335 | Plan Room | Maps of Kalamontee and Lawanda complexes give the geography of both islands | Positive |
| 351 | Storage West | The towel's "Don't Panic!" label is a nice gag | Positive |
| 359-362 | Elevator Lobby | Red button: door "begins vibrating", opens three waits later; I had ignored the button since turn 131 because the room text puts it in a sentence and the list shows it only as "push" | Positive |
| 365-367 | Lower Elevator | All cards refused; a fourth card is needed and I have no idea where | Puzzle (stuck) |
| 368 | Lower Elevator | "search Floyd" and "look inside Floyd" both give the tickling joke; fine, but no hint | Unhelpful response |
| 370-371 | Lower Elevator | Turning Floyd off and searching him yields the lower elevator card; clever, and both actions were on his list | Positive |
| 371 | Lower Elevator | The only hint for the Floyd card is flavour text about his "compartments"; I found it by elimination after ~30 turns stuck | Puzzle (stuck) |
| 381 | Kalamontee Platform | Reaching the shuttle platform: +4, the shuttle card suddenly has a purpose | Positive |
| 381 | Kalamontee Platform | "go north" listed, answers "You can't go that way." | Dead option |
| 382 | Kalamontee Platform | "get in shuttle car" answers "Use 'north' or 'south'." -- typist advice, and only south works | Unhelpful response |
| 384 | Alfie Control East | "shuttle car: get in" still offered while inside it | Dead option |
| 386-410 | Alfie Control East | Driving the shuttle with push/pull lever, halfway sign and 15/10/5 signs; tense, fair, fully clickable | Positive |
| 412 | Lawanda Platform | Arriving scores +4 | Positive |
| 422 | Infirmary | Floyd finding Lazarus's breast plate and running off sobbing; strong emotional beat | Positive |
| 426-429 | Planetary Defense | Only the faulty board has a "take" entry, so the list solves the "which board" question for me | Confusing |
| 431 | Planetary Defense | The cracked spare board is not in the panel's "put in" list while it sits in the cardboard box; no hint that I must take it out first | Action not on list |
| 433 | Systems Corridor East | Fever message: the plague has started on me; clearly announced, and it makes the medicine matter | Positive |
| 437 | Course Control | Fused bedistor needs pliers I left in the Kalamontee kitchen; no warning when I dropped them that they would be needed across the sea | Pacing |
| 441-442 | Library Lobby | Terminal shows a 1-6 menu and has a 0-9 keyboard, but no "type"/"press" entry or keyboard object exists; cannot use it by mouse | Action not on list |
| 445-446 | Library | "put in" red spool, "turn on" the reader: clear, readable disease timeline | Positive |
| 451 | Lab Storage | "search lab uniform" yields the teleport card and the 982 combination; a satisfying double find | Positive |
| 453-455 | Lab Storage | Weight limit again; I had to leave the paper behind and rely on memory | Pacing |
| 457 | Computer Room | Floyd comments on the broken computer unprompted; he works as a hint system | Positive |
| 458 | Computer Room | Printout gives drug status and "Malfunkshun in Sekshun 384"; clear goal | Positive |
| 461 | ProjCon Office | Exit list shows "go south" (cryo-elevator door) that the room text hides; spoils the rippling-mural clue | Confusing |
| 469 | Miniaturization Booth | Keyboard here has "type a number <value>", unlike the library terminal; inconsistent | Confusing |
| 485-486 | Booth 3 | Teleport card plus beige button: back to Kalamontee in one move; a big relief | Positive |
| 496 | Kitchen | "drink" is not offered while the canteen sits in the dispenser; had to drop something to pick it up first | Action not on list |
| 499 | Kitchen | Collapsed asleep on the kitchen floor and was killed by beasts; weary warning came 35 turns before, sleep button never looked urgent | Unhelpful response |
| 107 | Tower Core | Checkpoint restart works cleanly, but dying costs the whole 390-turn run; no save of my own to fall back on | Pacing |

### Report

I played one full attempt from turn 107 to 499 and died there at score 42 (from 21), then restarted once to confirm the checkpoint. Milestones: repaired the send station's coolant (green coolant, then brown catalyst) and got the help message out (+6); woke Floyd (+2); got into the kitchen (+4); took the lower elevator card from Floyd's compartment (+1); reached the Kalamontee shuttle platform (+4); drove the shuttle to Lawanda and stepped off (+4). In Lawanda I reached the Infirmary (medicine, disease spool), Planetary Defense (pulled the fried fromitz board), Course Control (found the fused bedistor, lacking pliers), the Library (read the disease spool), Lab Storage (teleport card, combination 982), the Computer Room (Section 384 alert) and the Miniaturization Booth, then teleported home for the pliers and died of sleep on the kitchen floor. Rooms new to me this run: roughly 40.

The click interface mostly worked well. Exit labels that name visited rooms turned the corridors into a map. The list grows the right verb at the right moment: "slide through slot" on every card when a slot is there, "put under spout" for the flask, "pour into funnel-shaped hole" for the fluid, "sleep" in the button row when tired, a proper "<value>" entry for dials and the miniaturization keyboard. The weight messages ("Dropping the glass flask would make enough room") made a tight inventory bearable. The shuttle ride, driven entirely with push and pull on one lever, was the high point, and Floyd (the Lazarus scene, his hints in the Computer Room) gave the late game a heart.

What still hurts: (1) the Library terminal describes a ten-key keyboard and a 1-6 menu but offers no way to press a key, while the Miniaturization Booth's keyboard has one; (2) the death by sleep: once "weary" appears, the sleep button looks the same as every other button, and a long run ends in one turn; (3) the option list sometimes gives puzzles away or hides them: only the faulty fromitz board had "take", the ProjCon Office listed a "go south" the room text hides, Floyd was missing from the list in the Robot Shop, and the helicopter "lock" has no way to try a key; (4) dead options ("get out" of a vehicle I am not in, "get in shuttle car" answering "Use 'north' or 'south'", a platform "go north" that goes nowhere, "eat" goo while the kit is on the floor, no "take" on things beside the bed); (5) renumbering: putting an item down moves everything below it, and the phrase form is strict ("put glass flask under spout" rejected; only "put under spout" works). The briefing was enough to pick up the thread: it told me what I had, what I had left where, and which rooms I had seen, and the "Places you have been" list matched the exit labels. What it lacked was any goal, so my first 20 turns were aimless until the Comm Room gave me one.

The three changes I would make first: (1) give every in-game keyboard a "type a number <value>" or per-key entry, starting with the Library terminal; (2) escalate the tiredness warnings in the interface itself (mark "sleep" as urgent, or put a status line such as "Very tired" on the turn footer) and say plainly that sleeping anywhere but a bed is dangerous; (3) audit the option list for leaks and dead ends: drop options that cannot apply (get in/out when already in/out, "go" exits that refuse), make "take" and "drink" available wherever the parser would allow them once the item is reachable, and do not let the list alone reveal the faulty board or the hidden cryo-elevator exit.

### Verdict

The click interface carried me through a long, varied stretch of the game (coolant repair, Floyd, shuttle driving, teleporting between islands) with very little fighting the controls, and the late game's writing and Floyd are a delight. The biggest blockers were a terminal I could not type into and a death by sleep that the interface did nothing to flag, which cost a 390-turn run. With those two fixed and the dead options trimmed, it would be a very good way to play.
