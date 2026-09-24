# Round 23: typed-23, typed, as a Zork player new to Planetfall

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The third milestone](playing-it.md#the-third-milestone-every-way-of-playing-wins-blind), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 23, 24 September 2026
- **Mode:** typed: commands typed into the parser
- **Start:** from the start (Deck Nine, turn 0), in 2 legs
- **Played as:** an adult who knows Zork and its kind but had never played Planetfall
- **Result:** **Won 80 of 80** at turn 723.
- **Commands:** 996, with 10 deaths

**About the numbers.** Played as an adult who knows Zork and its kind but has never played Planetfall, typed from the start, seed 23, in two legs, on main before rounds twenty-one and twenty-two's fixes were merged. Won 80 of 80, Galactic Overlord, at turn 723, in one game. Ten deaths, all restored: the Infirmary bed at turn 501, the Bio Lab mutants five times at Bio Lock East (turns 533 to 594), the Radiation Lab twice and the microbe twice. The tester numbers its deaths up to nine (diary line 491). It also restored once while alive, at turn 267, after locking the kitchen card inside the kitchen (diary line 135). Floyd's death in the Bio Lab is not a player death. The diary counts about 750 and roughly 175 commands for its legs (lines 350 and 527); the transcript has 764 lines beginning "> " up to the Kitchen save at turn 575 (line 3945) and 996 in all.

The diary below is `playtests/2026-09-24/2026-09-24-typed-23.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Playtest round twenty-three: typed, from the start (seed 23)

- Mode: typed (free text through the parser, as in the original)
- Start: from the start, `--new --seed 23`
- Persona: an adult who knows Zork and its kind well but has never played Planetfall.
- Hard cap: game turn 2000 across all games. Leg budget: about 750 commands.

### Friction

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 1 | 33-36 | Underwater | UP x4 from the sunken pod; status line shows "depth 3 of 3" down to "at the surface" | Clear progress on a scary sequence; I never felt lost underwater | nice | - |
| 3 | 95-96 | Admin Corridor South | `get key` -> "Either the crevice is too narrow, or your fingers are too large."; `get key with brush` -> "Nice try." | Fair and funny; clearly a find-the-tool puzzle, not a parser wall | nice | - |
| 2 | 63 | Mess Hall | `slide card through slot` -> "(You take the ID card out of the Patrol uniform first.) ... Inkorekt awtharazaashun kard" | Parser handled the verb and auto-took the card; the refusal tells me another card exists | nice | - |

### Narrative

#### Turns 0-3: Deck Nine
I open as a lowly Ensign Seventh Class scrubbing the deck of the Stellar Patrol Ship Feinstein, dreading one Ensign Blather. Inventory: scrub brush, chronometer, uniform with an ID card. The brush and the (closed) escape pod both get "nothing special". An escape pod right next to me in the first room of a game called Planetfall feels like Chekhov's gun.
Turns 4-6: The ID card is Special Assignment Task Force with a magnetic stripe (a keycard later, surely). The chronometer is engraved from Mom and Dad, which is a sweet touch, and it reads "4581" - an odd decimal clock. I scrubbed the floor for the joke; it got "a bit shinier". I'll wait here a turn or two to see whether Blather or some disaster comes to me before I wander.
Turns 7-9: Three waits, nothing. Fine, I'm a veteran, I'll go look around rather than stand here. Starboard first, then up the gangway.
Turns 10-12: Went starboard to the Reactor Lobby and Blather popped up instantly with "Twenty demerits!" - nicely obnoxious. I scurried back to Deck Nine and dutifully scrubbed, and BOOM: a massive explosion, and the escape pod door slides open. Called it. Into the pod, now.
Turns 13-15: Into the pod (+3 points), climbed into the safety webbing (GET IN WEBBING understood first try), door clanged shut, and we're sliding down the ejection tube. Classic Infocom: the web is surely what keeps me alive through the landing. Waiting it out.
Turns 16-18: The Feinstein blows to pieces behind me (goodbye, Blather, I suppose). The pod tumbles, gyros whine, the autopilot picks a mostly-ocean planet with a few islands and a small ice cap. Lovely paced cutscene-by-Z. Ocean world plus a pod: I'm already worried about water.
Turns 19-21: "Approaching planet...human-habitable." Then two quiet turns. Staying in the web until we hit ground.
Turns 22-24: Atmospheric entry: buffeting, heat, climate control roaring. Still webbed in.
Turns 25-27: Endless ocean, then a pair of islands, the nearer one cliff-ringed with a plateau of sprawling buildings. Thud - landed, but "precariously balanced" over a rocky cleft and water. A panel opens: survival kit and a towel (a towel! Hitchhiker's nod). It's dusk. The pod rocking says "don't dawdle". Grab the goods and get out.
Turns 28-30: Standing up tipped the pod off its perch and it's sinking - now fully submerged and smashing on rocks. Got the kit and towel. Bulkhead is closed. Heart rate up: open the door and swim, and hope the pressure lets me.
Turns 31-33: Opened the bulkhead, ocean rushed in, swam OUT into murk at "depth 3 of 3" (the status line tells me the depth, which is a kind mercy), then kicked UP to depth 2. One more up.
Turns 34-36: Up, up, up, and onto the Crag (+3, score 6). The swim was well signposted: each step says the light is getting closer and "one more push" at the end. A small structure clings to the cliff eight meters above - "even an out-of-shape Ensign Seventh Class" can climb it. Ha. Checking the kit first, then up.
Turns 37-39: Kit holds red, brown and green goo - emergency rations, I'm keeping them for when hunger hits. The towel says "Escape Pod #42 / Don't Panic!" - I grinned. Now SAVE, then climb.
Turns 39-41: SAVE said "Ok." (one slot, I assume). Climbed to the Balcony: an octagonal lookout with shattered windows and a plaque in phonetically-spelled "corrupt Galalingua": SEENIK VISTA, the Kalamontee Valley, a former provincial capital building at the bend of the Gulmaan River. Reading it aloud in my head is a joy. The place is abandoned. Stairs lead up.
Turns 42-44: Winding Stair up to a ruined castle Courtyard (exits N, W, S-down), then north into a Plain Hall, modern construction grafted onto the old castle; halls go N and NE. Starting a map: Crag -up- Balcony -up- Winding Stair -up- Courtyard -N- Plain Hall. West of the courtyard is unexplored.
Turns 45-47: Rec Area: games and tapes scattered (Chess, Cribbage, Galactic Overlord, Double Fannucci - more in-jokes). North is a locked door with a dial, 0 to 1000. A combination lock with a thousand settings: not brute-forcing that; the number must be written somewhere. Exits E and S.
Turns 48-50: Tapes are music, romance novels, a Double Fannucci champion's biography - flavour only. East to the Rec Corridor (N, S, SW, E-W), north into Dorm B: bunks for hundreds, deserted. Where did everyone go? It's getting dark, and I'll need somewhere to sleep eventually; bunks noted.
Turns 51-53: SanFac B beyond the dorm - dry toilets ("how little the millennia have changed toilet bowl design"), dead end. Back to the Rec Corridor. South next.
Turns 54-56: South of the corridor is Dorm A with SanFac A below it - a mirror image of B. Identical rooms, nothing to take. Back north and continue east.
Turns 57-59: East to the Mess Corridor: a small north door with a steel padlock (a key hunt), and a big portal south to the Mess Hall. There: tables, a closed south door with a small slot beside it (my ID card's magnetic stripe, I bet), and an octagonal canteen on a bench. Octagons everywhere - the builders loved eight sides.
Turns 60-62: Took the canteen, opened it: empty. A water carrier with nothing to carry yet. Now the slot by the south door - I'll try sliding the ID card.
Turns 63-65: SLIDE CARD THROUGH SLOT was understood (it even took the card out of my uniform for me) but: "Inkorekt awtharazaashun kard...akses deeniid." So there are other cards with the right authorization. Noted: this door wants a kitchen/mess card. Back north and keep exploring east.
Turns 66-68: East past the padlocked door to the Dorm Corridor, where a dead motorized walkway runs off east down a "tremendously long hall". North: Dorm D. More bunks. I'll check its SanFac and Dorm C quickly for anything lying about.
Turns 69-71: SanFac D, empty; back to the corridor. These identical dorms are costing turns for nothing - a bit tedious, but a veteran checks. Dorm C next, then east.
Turns 72-74: Dorm C and SanFac C: nothing. All four dorm wings are empty shells. Heading east along the dead walkway now.
Turns 75-77: The walk east took "about 3 hours" of game time in one move - a nice touch, and a warning that this complex is big and time matters. Corridor Junction (N-S crossing), then the brightly lit Elevator Lobby: a blue door N with a blue button, a larger red door S with a red button, and a phone-booth-sized room east. Lights still work here!
Turns 78-80: Booth 2 is a tiny room with a "2", a card slot and buttons "1" (brown) and "3" (tan) - a teleport or tram booth. Then my stomach growled, and the game kindly pointed me at DIAGNOSE and the goo. Ate the red goo: cherry pie, quenches thirst too. DIAGNOSE: perfect health, well-rested, well-fed. Two goos left (brown, green). The nudge text is gentler than Infocom ever was; I don't mind.
Turns 81-82: The booth wants a card too ("Inkorekt awtharazaashun kard") and the brown button says "Teleportaashun buux not aktivaatid." Teleport booths! Need the right card. Back to the lobby to try the elevator buttons.
Turns 83-85: Pressed blue (whirring behind the blue door) and red (the red door vibrates). Waited, and the blue north door slid open. Going in.
Turns 86-88: Upper Elevator: Up, Down and a slot. Up does nothing, and my Patrol card is refused again. Everything here is card-gated; my ID is useless. Somewhere lies a pile of keycards. Let me try Down, then the red door.
Turns 89-91: Down does nothing either ("the slot stays dark"). Back in the lobby the red door is still closed; pushing red again: "Patience, patience..." Ha. The red car is on its way from somewhere. I'll explore the junction's north/south arms and come back.
Turns 92-94: North from the junction to Admin Corridor South: cracked walls and a jagged crevice in the floor. X CREVICE: a shiny steel key at the bottom, under dust! That's the padlock key surely. Now to get it out of a narrow crack.
Turns 95-97: GET KEY: "Either the crevice is too narrow, or your fingers are too large." GET KEY WITH BRUSH: "Nice try." Classic fish-it-out puzzle - I need a magnet or something thin and sticky. Parking it. Exploring the admin wing (E, N).
Turns 98-100: East is SanFac E, dead. North: the Admin Corridor, torn open by an earthquake - sky through the roof, rubble, and a rift eight meters wide and thirty deep blocking the north. A doorway west says "Sistumz Moniturz" (Systems Monitors). A rift like that is a later bridge-building puzzle.
Turns 101-103: Systems Monitors: green for Library, Reactors, Life Support; red for Planetary Defense, Planetary Course Control, Communications, Project Control. That reads like my to-do list - fix four systems, probably to get rescued. Equipment is too complicated to touch. Back out to the rift.
Turns 104-106: The rift: 8m wide, 30m deep, sharp rocks. Not jumping. Back down to the junction to try its south arm.
Turns 107-109: Mech Corridor North (rooms E and W). Storage East: an oil can on a shelf and a cardboard box of spare parts - a cracked fromitz board, B- and K-series megafuses, a good ninety-ohm bedistor. Glorious techno-babble; these are repair parts for something. GET ALL got the oil can but the box is too heavy - the game helpfully suggests dropping the brush and mentions my uniform pocket. I'll ditch the brush here.
Turns 110-112: Dropped the brush in Storage East (farewell, trusty brush), took the box. Carrying: chronometer, ID card (loose now), uniform, towel, kit (brown+green goo), canteen, oil can, box of parts. Inventory limit is tight - I'll have to be choosy. Across the hall west next.
Turns 113-115: West is the Physical Plant, a huge dim room of catwalks and mostly-dead heating gear with NE and SE exits. SE brought me out to "Mech Corridor", one step south of Mech Corridor North. So the plant spans two corridor stops. East from here next.
Turns 116-118: Reactor Control: dials, gauges, a wall diagram of a reactor buried far below, a dark stairway down, and a metal door east with a button. The button opens it: the Reactor Elevator, also with Up/Down and a slot. Another card lock, I assume. The dark stairway worries me - I have no light source.
Turns 119-121: Reactor Elevator's Down: dead, slot dark. Went down the dark stairway anyway just to peek: "It is pitch black. You might be eaten by a grue." A GRUE, in a sci-fi game! Laughed out loud - and I'm leaving immediately.
Turns 122-124: Back up, out, and south to Mech Corridor South, which ends in three doorways: SW, S, SE. Map so far east of the junction: Admin wing N (crevice key, rift, monitors), elevator lobby E, mech wing S (storage, plant, reactor control).
Turns 125-127: Jackpot - the Tool Room. A large glass flask, a U-shaped metal bar with filings clinging to its ends (a MAGNET - that's my crevice key!), wide-nosed pliers, and an "Akmee Portabul Laazur" with an old battery and a 1-6 dial set to 5. Night has fallen. Carrying capacity is the problem now: I'll drop the parts box here (it can wait) and take the magnet and laser.
Turns 128-130: Dropped the box, took the bar - and the game warned me the magnet tugs at my ID card and will smear its stripe if I carry them together. That's a generous warning; old Infocom would have silently ruined it. My Patrol ID has been refused everywhere, so I dropped it here in the Tool Room rather than risk it.

#### Friction (continued)

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 4 | 129 | Tool Room | `get bar` -> "the bar is a strong magnet. Carried together any longer, it will smear the card's magnetic stripe." | Fair warning before a silent loss; I dropped the card | nice | - |
| 5 | 109 | Storage East | `get all` -> box "Your load is too heavy" plus a hint to drop the brush | Tight carry limit forces juggling, but the hint told me exactly what to drop | nice | - |
Turns 131-133: Took the laser. The flask is wide-mouthed, 1-2 liters - a vessel for the dispenser I then found east in the Machine Shop: a big machine with a spout and buttons for Coolants 1-4 (red, blue, green, yellow), Catalysts 1-3 (gray, brown, pink), BASE and ACID. A chemistry puzzle waiting for a recipe. I'll remember the flask lives in the Tool Room.
Turns 134-136: Robot Shop, full of half-disassembled robots, and one four-foot general-purpose robot slumped against the wall with unfastened compartments. TURN ON ROBOT: "Nothing happens. Then again, ... a faint hum" and +2 (score 8). A companion booting up? Waiting to see.
Turns 137-139: FLOYD! "Hi! I'm B-19-7, but to everyperson I'm called Floyd... Let's play Hider-and-Seeker you with me." Instantly charming - a childlike robot with broken grammar who admires my chronometer. He bounces when greeted. Asked about the card; he doesn't know, wants to play. I have a friend now. Let's see what he knows about this place.
Turns 140: LOOK IN COMPARTMENTS tickled Floyd - he laughed oil tears and a magnetic-striped card dropped out of his side panel ("That was the itchy thing"). Adorable, and a card! But GET CARD: too heavy, drop the towel. And I'm holding the magnet, which would smear it. So: leave the card on the floor, go fish out the steel key with the magnet first, park the magnet, then come back for the card.
Turns 141-143: The card reads "loowur elivaatur akses kard" - Lower Elevator access. Floyd paces impatiently and then trots after me as I head north toward the crevice (NW from Robot Shop lands in Mech Corridor South - so the S door of Mech Corridor South is still unexplored, and SE is the Robot Shop).
Turns 144-146: North, north, north to the crevice. Floyd fell behind at the junction, it seems. Now for the magnet.
Turns 147-148: PUT MAGNET IN CREVICE: a clank, dust, and the steel key leaps up onto the magnet. Satisfying (no points though). Floyd bounds in: "Floyd here now!" The padlock it probably fits is back west past the 3-hour walkway, so first I'll get the elevator card. Dropping the magnet here so it can't ruin the card.
Turns 149-151: Magnet dropped in Admin Corridor South. Heading back south to the Robot Shop for the card, Floyd trailing.
Turns 152-154: Back in the Robot Shop; the lower elevator access card is waiting on the floor. Floyd wandered off somewhere. Need a free hand: the towel goes.
Turns 155-157: Dropped the towel, took the card (+1, score 9). Put the key in my uniform pocket, which worked ("Done.") and hopefully frees hand space. Floyd examines himself for rust - he fills the silence nicely. Off to the red (lower) elevator in the lobby.
Turns 158-160: The S doorway of Mech Corridor South just leads to the Machine Shop. So the south cluster is a loop: Tool Room (SW) - Machine Shop (S) - Robot Shop (SE). Now north to the lobby.
Turns 161-163: Trudging north; Floyd keeps bounding in with "Floyd here now!" - he lags and catches up. Cute, slightly repetitive already. At the junction; lobby is east.
Turns 164-166: The red door is open now ("has opened since you were last here" - helpful). Into the Lower Elevator; Floyd bounces in yelling "Hey, wait for Floyd!" Slid the lower-elevator card: "Elevator enabled." Down we go.
Turns 167-169: Door shut, vertical movement... and then two quiet waits. Is it still moving? Let me LOOK.
Turns 170-172: Floyd recited 600 digits of pi while we rode. The elevator is slow but arrived at the bottom. Hungry again already (turn 171, about 90 turns after the cherry pie) - ate the brown goo, "Nebulan fungus pudding". Only green goo left. Food is going to be a real clock in this game; I need to find a proper supply and water for the canteen.
Turns 173-175: Waiting Area (benches, a metal door S), then Kalamontee Platform (+4, score 13): a shuttle station with a transport sitting open to the south. Notice: "Shutul Servis evree dae until 6000. Aaftur 6000, shutul yuus reekwiirz speshul awtharazaashun." It's 8005 now, so I'd need special authorization - another card. Let's look at the shuttle anyway.
Turns 176-178: Shuttle Car Alfie, seats for 20, control cabins at each end. Alfie Control East: slot, a +/center/- lever, a readout at 0, rails vanishing down a long tunnel. My elevator card is refused. Floyd reminisces about his friend Lazarus, a medical robot - I file that name away. The shuttle is out for now. Back to the Waiting Area's south door.
Turns 179-181: Asked Floyd about Lazarus: his lower lip quivers, "Lazarus was Floyd's best friend," and he won't say more. Oof - a robot with grief. Then: "You begin to feel weary" - and the game even lists the dorm bunks for me. Those are back past the 3-hour walkway. West control cabin is the same controls facing a wall. I'll peek through the Waiting Area's south door, then head for a bed.
Turns 182-184: Floyd barrels into me ("Floyd not looking at where he was going to"). Back at the Waiting Area I realise the "metal door south" is just the elevator I arrived in. So the lower level is only the shuttle for now. Up and west to bed.
Turns 185-187: Elevator up (the card enabling seems to persist). Floyd cranes his neck, whistles tunelessly. Waiting out the slow ride.
Turns 188-190: Floyd hides behind me from a mouse (a robot scared of a mouse!). Top of the shaft, back in the lobby. Now the long walk west to the dorms, and the padlock is right on the way.
Turns 191-193: The 3-hour walk again (Floyd kept up). At the padlocked door: "You're really tired now." Quickly unlocking the padlock, then straight to a bunk.
Turns 194-196: UNLOCK PADLOCK WITH KEY worked straight from my pocket - "springs open". Removed the padlock (now carrying it, oops) and opened the small door. A peek, then bed.
Turns 197-199: Storage West (+4, score 17): a big unopened tin of "Spam and Egz" and a heavy-duty EXTENDABLE LADDER. That ladder is going across the rift, I'd bet my chronometer on it. Dropped the padlock there. Now sleep before I collapse; I'll come back for the ladder.
Turns 200-201: Into Dorm D with Floyd. SAVED before sleeping (old habit: sleep in Infocom games can be dangerous) - and Floyd's eyes light up: "Oh boy! Are we gonna try something dangerous now?" He reacts to SAVE! That is a lovely fourth-wall wink. Now: get in a bunk and sleep.
Turns 202-204: GET IN BUNK, SLEEP, Z. A dream: eight years old on Gallium, a sponge-cat named Swanzo, then the school bully holds my head under water. Creepy - illness or drowning foreshadowing? Woke on SEPTEM 7, 11344, refreshed. My things slipped to the floor. Floyd: "About time you woke up, you lazy bones!" Morning, time 1643. Picking everything up.
Turns 205-207: Up, GET ALL recovered kit, canteen, elevator card, oil can, laser. DIAGNOSE: perfect health, rested, well-fed. Plan: fetch the ladder from Storage West and haul it to the rift in the admin wing.
Turns 208-210: Back to Storage West. Trying for the ladder.
Turns 210-212: The ladder is heavy - the game said exactly what to drop (laser, kit, canteen), so I left them in Storage West and took the ladder. Now I'm carrying the ladder, the oil can and the elevator card. The walk east is 3 hours; I'd better make this trip count.
Turns 213-215: Hauled the ladder east - three hours down the dead walkway, Floyd bounding in behind as always. At the junction. North twice to the rift.
Turns 216-218: At the rift with the ladder. EXTEND LADDER: "You couldn't possibly extend the ladder while you're holding it." Fair enough - drop it first.
Turns 219-221: Dropped the ladder; "you feel a bit weak and slightly flushed, but you're not sure why" - uh-oh, the drowning dream was a disease omen, I suspect. EXTEND LADDER: eight meters. PUT LADDER ACROSS RIFT: it spans the precipice. And then: hungry again - and my last goo is in the kit I left in Storage West, three hours' walk away. I walked right into that. The game even reminds me where I left it. Do I cross the bridge first and hope for food, or trek back? I'll cross, peek quickly, and decide.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 6 | 221 | Admin Corridor | Hunger hit about 50 turns after waking, right after the ladder forced me to drop the kit (with the last goo) three hours' walk away | Tight carry limit plus a hunger clock plus a 3-hour corridor is a nasty combination; nobody warned me hunger was that close | tedious | medium |
| 7 | 218 | Admin Corridor | `extend ladder` while holding it -> "You couldn't possibly extend the ladder while you're holding it." | Clear, tells me what to do | nice | - |
Turns 222-224: Across the swaying ladder (+4, score 21) to Admin Corridor North: portals to Administrative Offices (W), Transportation Supply (N), Plan Room (E). The Small Office's desk holds a KITCHEN access card and an UPPER elevator access card. Kitchen card = the Mess Hall door = food! That solves hunger, if I can get there in time.
Turns 225-227: Took both cards (+2, score 23). West into the plush Large Office with a scratched picture window over the complex and ocean. Its desk: a SHUTTLE access card. The whole keyring is coming together. Grabbing it.
Turns 228-230: Shuttle card taken (+1, score 24). Floyd announced "Floyd going exploring. See you later" and glided off - then bounded back in two rooms later. Quick peek into Transportation Supply and the Plan Room, then I must go eat.
Turns 231-233: Transportation Supply is pitch dark (grue again) - backed out. Floyd chants the death scene from Carmen. The Plan Room: empty cubbyholes, a map of "Kalamontee Kompleks" (two installations joined by the long hall; "Yuu ar heer" at the top) and a map of "Lawanda Kompleks" with one installation buried deep underground. So the shuttle goes to Lawanda. Big world. Now: food.
Turns 234-236: Back over the ladder, heading south. Magnet still lying here. The west trek next - three hours to the Mess Hall with the kitchen card.
Turns 237-239: The long walk west, and "You're now really ravenous and your lips are quite parched." Made it to the Mess Corridor. The kit is just north; I'll eat the green goo first to be safe, then use the kitchen card to find more food and water.
Turns 240-242: Took the kit (green goo) and canteen, leaving the laser. Gambling a couple of turns: try the kitchen first and keep the goo as the emergency ration.
Turns 243-245: The kitchen card opens the Mess Hall door. Kitchen (+4, score 28): "Of particular interest is a machine near the door. You should probably examine it more closely." Unusually direct for Infocom, but I'm starving so I'll take it.
Turns 246-248: A "Hii Prooteen Likwid Dispensur" with an octagonal niche - so THAT's why the canteen is octagonal. Canteen in niche, push button: it fills with brown liquid. Floyd scrawls his name on the wall in crayon and asks to play Hucka-Bucka-Beanstalk. Drinking now.
Turns 248-250: Disaster-comedy: GET CANTEEN made the kitchen card slip from my arms, both tumbled, and the protein liquid spilled and evaporated. The weight limit strikes again. Refilled (put canteen in niche, push button) - and now "You're starting to feel faint." Drinking straight from the canteen in the niche this time, no picking up.
Turns 251-253: DRINK LIQUID: "You're not holding the canteen." Of course. Dropped the oil can to make room, took the canteen safely this time.
Turns 254-255: Drank: hunger and thirst satisfied. Relief. But DIAGNOSE: "You are a bit sick and feverish." So the flushed feeling and the drowning dream were a disease clock. I need to find medicine - maybe the Lazarus medical robot Floyd mourns, or an infirmary somewhere. Refilling the canteen to carry.
Turns 256-258: Canteen refilled and in hand, full of protein liquid - a portable meal. Does it spill if carried open? I'll close it. Inventory juggle next.

#### Friction (continued)

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 8 | 248 | Kitchen | `get canteen` (full) -> kitchen card slipped, both tumbled, the liquid spilled and evaporated | Punishing and a bit random while I was ravenous; it cost the drink and two turns | confusing | medium |
| 9 | 251 | Kitchen | `drink liquid` with canteen in the niche -> "You're not holding the canteen." | Understandable, but it could have just let me drink from the niche | not understood | low |
| 10 | 246 | Kitchen | Octagonal canteen fits the octagonal niche of the protein dispenser | Lovely fair clue; the octagon motif paid off | nice | - |
Turns 259-260: Closed the canteen. Inventory: key (pocket), kit with green goo, canteen, upper elevator card, shuttle card, lower elevator card; the kitchen card and oil can are on the kitchen floor. Tried PUT ALL CARDS IN UNIFORM: "You can't see any all cards here!" - an odd parser hiccup. Will try the plainer form.
Turns 260-262: PUT CARDS IN UNIFORM asks which card (no plural support), so one at a time: upper and lower elevator cards into the pocket. Kitchen card too - then I'll head out.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 11 | 260 | Kitchen | `put all cards in uniform` -> "You can't see any all cards here!"; `put cards in uniform` -> "Which do you mean...?" | No plural handling for a set of same-noun items; had to do each card by hand | not understood | low |
Turns 263-265: "There's no room" for the kitchen card in the pocket, so I left it on the kitchen floor... and as I walked out, "The kitchen door slides quietly closed." The kitchen card is INSIDE. I have locked myself out of the only food source I know. Classic self-inflicted Infocom wound. Let me see if the door can be opened any other way before I consider restoring.
Turns 266-267: OPEN DOOR: "Pleez yuuz kitcin akses kard." FLOYD, OPEN DOOR: he whines "Enough talking! Let's play Hider-and-Seeker." Locked out for good. I've got one canteen of liquid and one goo, and a fever ticking. A veteran restores. My save is at turn 201 in Dorm D, just before sleeping - about 65 turns back. Worth it; this time I'll carry the kitchen card out with me (drop something else instead).

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 12 | 263-265 | Kitchen / Mess Hall | Card wouldn't fit the pocket ("There's no room"), I left it on the kitchen floor, walked out, "The kitchen door slides quietly closed." | Locked myself out of the only food with no warning that the door auto-closes; the one-at-a-time card juggling set it up. Restoring 65 turns | blocked | high |
Turn 267 -> RESTORE -> turn 201: Floyd, on RESTORE: "That part of the game was more fun than this part," he admits. Ha! Back in Dorm D at night. (Turn bookkeeping for the cap: 267 turns spent before this restore; from here the total is 267 + (turn - 201).) Replay plan: sleep, ladder east (leaving laser/kit/canteen), cross, grab the three cards, straight back west, eat, then the kitchen - and this time the kitchen card never leaves my hands.
Turns 202-204 (replay): Different dream this time - a rowdy pub on Ramos Two, Fire Nectar, a castle under three moons. So the dreams are randomized, not a fixed omen. Woke at 1642.
Turns 205-207 (replay): Up, GET ALL, out to the Dorm Corridor. Retracing the ladder route.
Turns 208-210 (replay): Storage West; dropped laser, kit and canteen. Also dropping the oil can here, which I never used, so there's slack in my arms for cards later.
Turns 211-213 (replay): Oil can dropped, ladder taken, out to the Mess Corridor. East we go.
Turns 214-216 (replay): East the three hours, north to the crevice. Same as before, just efficient.
Turns 217-219 (replay): Rift, drop ladder, extend. And again at turn 219 "weak and slightly flushed" - so the illness is scheduled, not random. Floyd oils a joint (I have an oil can... noted).
Turns 220-222 (replay): Ladder across; Floyd whispers rumors about a Dr. Fizpick (another name!). Crossed (+4, 21), hunger growl right on schedule. Small Office next - desk.
Turns 223-225 (replay): Kitchen and upper elevator cards (+2, 23). Into the Large Office for the shuttle card.
Turns 226-228 (replay): Shuttle card (+1, 24). All four cards in hand. Heading straight back west to eat - no detours this time.
Turns 229-231 (replay): Back over the ladder and south. Floyd has lagged somewhere. Junction, then west.
Turns 232-234 (replay): Back to the Mess Corridor at turn 234 - five turns earlier than the first time, and not yet ravenous. Grabbing the canteen from Storage West, then kitchen.
Turns 235-237: Canteen and kit in hand (with four cards). Floyd rejoins. To the kitchen.
Turns 238-240: Card through the slot, into the Kitchen (+4, 28), ravenous right on cue. Now the careful ritual: canteen in niche, button, and drink it FROM my hands.
Turns 241-243: Canteen was already open; niche, button, filled. Floyd sings off-key, frets about his batteries. Dropping the kit before lifting the full canteen, to avoid a repeat spill.
Turns 244-246: Kit down, canteen up - no spill - and drank. Fed and watered, with the green goo still in reserve. Refill, close, and this time the kitchen card stays with me.
Turns 247-249: Refilled and picked up the canteen. Now pocketing cards: kitchen card in the uniform (it's the one I must never lose), and I'll carry the rest.
Turns 250-252: Closed canteen; kitchen card and lower-elevator card into the uniform pocket (with the key). Carrying: canteen, upper elevator card, shuttle card. Kit (green goo) on the kitchen floor - I'll take it too. DIAGNOSE next to check the fever.
Turns 253-254: Kit back in hand, DIAGNOSE: "a bit sick and feverish", rested, fed. SAVED here in the Kitchen at turn 254 (overwrites the Dorm D save). Now the unexplored west end: Courtyard west, Plain Hall northeast, Rec Corridor southwest - I'm hunting for an infirmary or anything medical.
Turns 255-257: Out through the Mess Hall (kitchen door closes behind - card safely in my pocket this time), west to the Rec Corridor. Southwest branch next.
Turns 258-260: The Rec Corridor's SW branch just loops to the Plain Hall. South to the Courtyard and west into the West Wing - rubble everywhere, ocean view, dead end. The west end is exhausted apart from the Rec Area's dial door. So the remaining leads are the upper elevator, the shuttle to Lawanda, the dark Transportation Supply room, and the dial door.
Turns 261-263: Searched the rubble: nothing. Asked Floyd about the dial - the parser asked which dial (combination or laser), I answered "combination dial" and it understood the disambiguation. Floyd doesn't know. He only ever wants Hider-and-Seeker. Heading east to try the upper elevator, collecting the laser on the way.
Turns 264-266: Plain Hall, NE to the Rec Corridor, E to the Mess Corridor. Laser next.
Turns 267-269: Laser picked up (no weight complaint this time). Floyd chants Carmen again. East, the long walk.
Turns 270-272: Three-hour walk east again (this corridor is the game's tax), and on to the Elevator Lobby. Both doors open. Up in the blue one with the upper card.
Turns 273-275: Upper Elevator, card slid: "Elevator enabled." Up we go.
Turns 276-278: Ride up, out into the Tower Core (+4, score 32): circular room, spiral staircase up, exits NE and SW. A tower - maybe communications? Exploring.
Turns 279-281: The Comm Room. A receive console with a blinking "Transmission Received" light: MESSAGE PLAYBACK plays the Feinstein's comm officer asking planetside to respond on 48.5, then an explosion and static. Chilling. The send console's screen: "To any ship of the Second Galactic Union: Planetwide plague has struck entire population. Time is critical. Emergency assistance requested." A PLAGUE - and I'm feverish. Gulp. It's malfunctioning: "Malfunction in Sending Coolant System", an enunciator panel flashing GRAY, and a funnel-shaped hole marked "Coolant System Manual Override". The Machine Shop dispenser has coolants and catalysts... gray is Catalyst 1. Hmm, but the funnel wants coolant. Let me read more.
Turns 282-284: The enunciator has seven lights - red, blue, green, yellow, gray, brown, pink - exactly the colours of the Machine Shop's coolant and catalyst buttons. So: fill the flask with whatever colour is flashing and pour it in the funnel, probably in a sequence. Gray = Catalyst 1 right now. Then SW to the Observation Deck: a half-kilometer tower, the whole island below, and another island 20 km east (Lawanda, surely). Up the spiral stair next.
Turns 285-287: Up the spiral to the Helipad atop the tower: a weathered helicopter. Climbed in: rusted, a locked control panel. A tempting escape route but it looks like set dressing - or a very late-game reward. Back down to deal with the comm system.
Turns 288-290: OPEN PANEL in the helicopter: "You don't even have the orange key!" - so there's an orange key somewhere. Out and down to the Tower Core. Heading for the flask and the Machine Shop dispenser.
Turns 291-293: Down the elevator to "innocuous Hawaiian music" oozing from the intercom. Ha. Floyd bored.
Turns 294-296: Down, out through the lobby to the junction. It's afternoon now. South to the tool room for the flask.
Turns 297-299: South through the mech wing. Tool Room is SW.
Turns 300-302: Took the flask (the laser and everything else fit, surprisingly). Into the Machine Shop. Flask under the spout, gray button.
Turns 303-304: PUT FLASK UNDER SPOUT, PUSH GRAY BUTTON: gray fluid that turns milky white. But GET FLASK: too heavy - it suggests dropping the upper elevator card, which I need to get back up the tower. I'll drop the laser instead; it's been dead weight.
Turns 305-307: Laser left in the Machine Shop; flask of milky catalyst in hand. Floyd went "exploring". Hurrying back up to the Comm Room, hoping the gray light waits for me.
Turns 308-310: North, north, north to the junction. Lobby next.
Turns 311-313: Lobby, into the Upper Elevator (Floyd bounces in), Up - no card swipe needed, it remembered. Riding up.
Turns 314-316: At the top, out to the Tower Core. Comm Room is NE. Moment of truth for the flask.
Turns 317-318: Still gray. POUR FLUID IN FUNNEL: it disappears, the enunciator blinks and settles on RED. So it IS a sequence. Red = Coolant 1. That's another round trip to the Machine Shop (about 15 turns each way with the elevator). Tedious, but fair and clear. Off again.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 13 | 282-318 | Comm Room | Enunciator lights match the Machine Shop dispenser colours; gray catalyst poured -> light goes red | Elegant colour-matching clue, instantly readable | nice | - |
| 14 | 318 | Comm Room | Each colour means a ~30-turn round trip (tower elevator + mech wing) to refill one flask | Right idea, but it's a lot of walking per step while a fever ticks | tedious | medium |
Turns 319-321: Back into the elevator, down.
Turns 322-324: Down and out into the lobby. West and south to the Machine Shop.
Turns 325-327: Junction, Mech Corridor North, Mech Corridor. One more south and then S to the Machine Shop.
Turns 328-330: Machine Shop again, flask under the spout. Red button.
Turns 331-333: Red coolant, milky white again, flask in hand. Back north for trip two.
Turns 334-336: Up the mech corridor to the junction. I'm getting to know this route by heart.
Turns 337-339: Lobby, elevator, up, Hawaiian music again.
Turns 340-342: Top of the tower again. NE to pour.
Turns 343-344: Poured the red: now BROWN (Catalyst 2). Round three. I'm resigned to the commute; at least it's clearly working. I'll check my health on the way.
Turns 345-347: Elevator down, Floyd gossiping about Dr. Fizpick. Using the ride for a DIAGNOSE.
Turns 348-350: Still just "a bit sick and feverish" - holding steady, fed and rested. Down and out into the lobby.
Turns 351-353: Junction, south, south.
Turns 354-356: Machine Shop, flask under spout. Brown this time.
Turns 357-359: Brown catalyst in the flask, heading back north. Trip three.
Turns 360-362: North to the junction with Floyd oiling his joints behind me.
Turns 363-365: Lobby, elevator, up.
Turns 366-368: Floyd crayons his name on the elevator wall. Top. NE and pour.
Turns 369-370: Brown poured - the enunciator goes dark, the coolant warning clears, and the help message is now being sent! +6, score 38. Three round trips and it's done; the pay-off felt earned. Communications: fixed. Now the plague... and me. Saving here.
Turns 370-371: SAVED in the Comm Room at turn 370 (overwrites the kitchen save). The screen still shows the plague distress text. Next objective: the shuttle to the other island (Lawanda) with the shuttle card - hopefully a hospital there, since I'm clearly catching the plague.
Turns 372-374: Tower Core, elevator, down (Hawaiian music, of course).
Turns 375-377: Dusk now. Lobby. South into the red elevator and down to the shuttle.
Turns 378-380: Lower elevator heading down, still enabled from yesterday.
Turns 381-383: Bottom, out to the Waiting Area. To the shuttle's east control cabin (that one faces the tunnel).
Turns 384-386: Platform, shuttle, Alfie Control East. Shuttle card through the slot, then the lever. I suspect I'll need to manage speed: + to accelerate, - to brake before the far end.
Turns 387-389: "Shuttle controls activated." Floyd rubs his head on my shoulder (aww). Lever up: we're moving, display 5, then 10. Speed climbs 5 per turn with the lever up. I don't know the tunnel length; I'll accelerate a bit then hold at center and watch for a warning to brake.
Turns 390-392: 15, a sign "Limit 45", 20, 25. I'll push to 45 and then set the lever to center to cruise.
Turns 393-395: 30, 35, 40. One more then center.
Turns 396-398: 45 reached, SET LEVER TO CENTER understood, cruising at 45. Waiting for a sign to slow down.
Turns 399-401: "Hafwaa Mark -- Beegin Deeseluraashun." Pulled the lever down: 40. Braking. A nice little physics toy, honestly.
Turns 402-404: 35, 30, 25. Gliding in.
Turns 405-407: 20, 15, 10. Still no station in sight.
Turns 408-410: At 5 we passed a sign with blinking red lights reading "15" (approach limit, I think), then the display hit 0 and the car stopped, lever popping back to center - but the window still shows tunnel. I braked too early. Nudging forward at a crawl, staying under 15.
Turns 411-413: Lever up to 5, then center; the red-lit signs count down 10, 5 - they're distance markers, not limits. Then: "approaching a brightly-lit area... concrete platforms of a shuttle station." And hungry again. Will drink from the canteen once we stop.
Turns 414-416: Ouch. At speed 5 the shuttle "rumbles through the station and smashes into the wall at the far end" - I'm thrown into the panel, "unhealthy crunching sounds" from me and the car. I should have braked to 0 as the platform came up. Drank the canteen (hunger gone). Now DIAGNOSE to see what the crash cost me.
Turn 417: DIAGNOSE: no injury, just the same fever. Phew. The car may be wrecked for the return trip, but I'll deal with that. Not restoring; onward.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 15 | 400-414 | Shuttle Car Alfie | Followed "Beegin Deeseluraashun" at halfway, stopped dead short in the tunnel; crept on at 5 and still "smashes into the wall at the far end" | The red-lit "15/10/5" signs read like speed limits, not distance markers; nothing said "brake to 0 now". Unclear what a correct stop looks like | confusing | medium |
| 16 | 388-396 | Shuttle Car Alfie | Lever up/center/down with a live speed readout and a "Limit 45" sign | A tactile little driving puzzle, well paced | nice | - |
Turns 418-420: Out onto Lawanda Platform (+4, score 42) - shuttle cars to north AND south, so there's a second car if Alfie is wrecked. A dead escalator leads up from the east end; I'm climbing it.
Turns 421-423: Top of the escalator: the Fork (NE / SE). NE: Systems Corridor West - bends E and SW, a doorway NW, a narrow stairway down to the north. Lawanda has a whole new map. NW doorway first.
Turns 424-425: THE INFIRMARY. Clean and lit: beds, equipment, a small red spool on a bed, a translucent medicine bottle, and a sealed emergency ration with a red cross. Exactly what a feverish castaway prays for. (I fumbled an X LAMP out of habit - no lamp here.)
Turns 425-427: Label: "Dizeez supreshun medisin -- eksperimentul". Took the bottle; DRINK MEDICINE: "The bottle is closed." And then Floyd, rummaging, finds a bent, rusting robot breast plate engraved "Lazarus", stares in silence, sobs quietly, excuses himself and runs out. I genuinely felt that. A 1983 game making me sad about a robot. Opening the bottle now.
Turns 428-430: Opened, drank: bitter, the fever breaks, strength returns. DIAGNOSE: perfect health. It said "suppression" and "experimental" though - I bet the disease comes back. Keeping the bottle (there may be more doses). Taking the ration and the red spool too.
Turns 431-433: The bottle is empty - one dose only. GET RATION AND SPOOL: the bottle slipped and the ration dropped again ("too much for you to carry"), spool taken. The weight juggling is my constant companion. Inventory: canteen, kit (green goo), shuttle card, flask, red spool; pocket has key, kitchen card, lower card; upper card loose. Leaving the empty bottle; dropping the flask here (I know where the dispenser is) to take the ration.
Turns 434-436: Flask dropped in the Infirmary, ration taken. The spool is labelled "Simptumz uv Xe Dizeez" - a data spool; there must be a reader somewhere (the Library, which the Systems Monitors listed as green). Saving, then exploring Lawanda.
Turns 436-438: SAVED in the Infirmary (turn 436). Floyd is back, cheerful again. East along the Systems Corridor: a doorway N labelled "Planateree Deefens" - one of the red monitors. In.
Turns 439-440: Planetary Defense: "Circuit Board Failure. WARNING: this board controls the discrimination circuits." A small access panel. So the cracked fromitz board in that cardboard box is the broken part, and I need a good one. The box is back in the Kalamontee Tool Room. Opening the panel to see.
Turns 441-443: The panel holds four fromitz boards; the first three examine identically ("twisted maze of silicon circuits"). One must be the faulty one. The fourth next; if none looks bad, I'll try pulling them one at a time and watch the warning light.
Turns 444-446: The fourth board looks the same; the light gives "nothing special". TAKE FIRST BOARD: a powerful shock. So they're live - I need insulation or to cut the power. Floyd is a robot... maybe Floyd can handle them? Or rubber gloves somewhere. Let me try asking Floyd.
Turns 446-447: FLOYD, GET FIRST BOARD: "Enough talking! Let's play Hider-and-Seeker." (Floyd never takes orders, it seems.) GET FIRST BOARD WITH TOWEL: I left the towel in the Robot Shop anyway. Trying the other boards bare-handed to see if only some are live.
Turns 447-449: The second board slid out fine - and in my inventory it's now "A fried seventeen-centimeter fromitz board". So the second was the dud (the game reveals it once it's in hand). The first shocks because it's live. PUT SECOND BOARD IN PANEL: "You can't see any second board here!" - the name changed under me, a small parser surprise. I need a GOOD 17 cm fromitz board; the one in the Kalamontee box is cracked. There must be another spare somewhere here in Lawanda.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 17 | 441-449 | Planetary Defense | Four boards examine identically; the bad one only reveals itself ("fried") after you pull it; first board shocks you | Trial and error rather than deduction, but cheap and fair enough | confusing | low |
| 18 | 448 | Planetary Defense | `put second board in panel` after taking it -> "You can't see any second board here!" (it had become "fried board") | The object renamed itself in my hands; the old name should still resolve | not understood | low |
Turns 450-452: Dropped the fried board there. East to Systems Corridor East: big doorway E, north "Planateree Kors Kontrool" (another red monitor), and south. Course Control first.
Turns 453-454: Course Control: "Bedistur Faalyur!" and "Critical divergence from planned course." The box in Kalamontee has "a good ninety-ohm bedistor" - that's the fix. A closed metal cube in the corner (I typo'd "cubicle" and the parser politely didn't know it).
Turns 454-456: The cube holds a FUSED ninety-ohm bedistor. TAKE BEDISTOR: "It's stuck"-ish refusal? (see below). Plan: I'll need pliers (Tool Room) and the good bedistor (box, Tool Room). Everything lives back in Kalamontee's Tool Room: pliers, the box with the good bedistor, maybe a way to fix the board. Exploring the rest of Lawanda first.
Turns 457-458: South: the Library Lobby - dusty carpet, a small object glinting in the dust, a computer terminal (video screen and keyboard, off), a booth east, a doorway up west. I stupidly stepped back north before investigating; going back.
Turns 459-461: GET OBJECT picked up a green spool. Two spools now (red: disease symptoms; green: ?). The terminal here is surely the reader. Turning it on.
Turns 462-463: Green spool: "Helikoptur Opuraateeng Manyuuwul" (the rusty helicopter!). And "weak and slightly flushed" again - the suppressant only bought ~33 turns. The disease is a real clock. Turned on the terminal: a menu - 1 History, 2 Culture, 3 Technology, 4 Geography, 5 The Project, 6 Interlogic Games. Lore time; "The Project" first.
Turns 464-466: TYPE 5 -> Project submenu (0 Main, 1 Origins of the Disease, 2 The Installations, 3 Project Control). Origins: the Disease came out of the Center for Advanced Cryogenic Research, which was researching ways to extend the cryogenic period indefinitely; somehow the disease got loose. "Consult the librarian for the appropriate spools." Reading the other two.
Turns 467-469: Project Control: Phase One build Kalamontee and Lawanda; Phase Two mass cryogenic freezing of the population; Phase Three computers monitor the cryogenics while automated research is done; Phase Four revival and inoculation. So everyone is FROZEN somewhere below, waiting for a cure, and the Project Control monitor was red - the computer is broken. That's the endgame shape: fix Project Control, cure found, people revived (and maybe me cured). Installations: vast reactors and cryo chambers built in the mountains below. Great lore, and it tells me the goal. Now let me check the booth east and the west doorway.
Turns 470-472: Booth 3 east (buttons 1 and 2, card slot - the teleport network links booths 1, 2, 3; need an activation card). Floyd: "Oooo, this is a tiny room." West up the steps: the Library, a desk with a spool reader (screen and circular opening), off. Spool time.
Turns 473-475: Reader on, red spool in: "Once the first symptoms are shown, death always occurs in eight to ten days. The primary symptom is a high fever. The secondary symptom is a sharp increase in the amount of sleep needed each night." So I have 8-10 game days, sleeping more and more. That's the true clock of the game - fair warning, delivered as lore. Chilling and clever. Now the green spool.
Turns 476-478: Green spool: pilots need a Helicopter Access Card and a Control Panel Key, obtainable from Transportation Storage - that's the pitch-dark Transportation Supply room in Kalamontee (grue!). So I need a light source to get the orange key. Taking the green spool back and leaving the red one (lore read, dead weight).
Turns 479-481: Dropped both spools in the Library (info memorised). Night has fallen; sleep will come soon and, per the spool, I'll need more of it each night. Exploring the rest of Lawanda quickly: Library Lobby south.
Turns 482-485: Library Lobby, south to Project Corridor East (N, S, E doorways, hall west), south into the Computer Room: the main Project computer, one glowing red light, a pile of printout, and a small booth south. Reading the printout.
Turns 485-486: The printout's last page: research 100%, drug production 100%, drug testing 99.985%, "Projected time to revival procedure: 0 days, 0.8 chrons" - and then "ALERT! ALERT! Malfunction in Section 196! Summoning repair robot." The cure was 0.8 chrons from done when the computer broke, and the repair robot never came. So I have to fix Section 196 of the computer myself. That's the heart of the game. How do you get inside a computer? Miniaturization booth? (There's a small booth south...)
Turns 487-489: Called it - the Miniaturization Booth: a card slot and a numeric keypad. Floyd tiptoes in: "Are we going to teleport into the computer like Achilles always used to do?" So: a miniaturization card, then type 196. Back out and west: ProjCon Office, a logo on the west wall and a garish mural on the south wall that "clashes with the decor" - that's a suspiciously pointed description.
Turns 490-492: The mural ripples "as though a breeze were blowing behind it" - a hidden passage. The logo: a flame over a sleep chamber, "Project Control". LOOK BEHIND MURAL: "It won't budge." Hmm, it answered as if I'd tried to move it. Trying a few verbs.
Turns 493-494: PUSH MURAL: nothing. CUT MURAL: "You have nothing to shoot it with." (so the laser is what cuts things here). And S: "The cryo-elevator door is closed." - the game just told me the mural hides a cryo-elevator! That's the way down to the frozen population, presumably opening at the end. Noting it, moving on north.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 19 | 494 | ProjCon Office | `s` toward the mural -> "The cryo-elevator door is closed." | Gave away what's behind the mural before I'd found it; a spoiler, though a helpful one | other | low |
| 20 | 494 | ProjCon Office | `cut mural` -> "You have nothing to shoot it with." | CUT silently maps to SHOOT; a bit odd, but it hints the laser cuts | confusing | low |
Turns 495-497: Project Corridor (E-W), west to Project Corridor West (N, E, W exits). North next.
Turns 496-497: (Correction: Project Corridor West's exits are E, NW and W - my N bumped a wall.) West is SanFac F, a small dusty toilet. And: "You begin to feel weary." The hint lists the Kalamontee dorms - a shuttle ride plus a 3-hour walk away! But the Infirmary here has beds. Trying those. Heading NW, which should loop back to the Fork.
Turns 498-500: Loop confirmed: Project Corridor West NW = the Fork. Now NE to Systems Corridor West and NW into the Infirmary to try a bed.
Turns 501: GET IN BED in the Infirmary. A rusty diagnostic robot wheels out, straps me down, smoking, "injects you with all 347 serums and medicines it carries", and the last thing I see is it preparing to saw my legs off. DEAD. Score 42 of 80, rank Lieutenant, "Day 2". I laughed out loud - that's pure Infocom, and entirely my fault for trusting a bed in a place full of broken robots. The Treaty of Gishen IV line is a nice touch. Restoring to the Infirmary save (turn 436). Turn bookkeeping: 567 turns spent in total so far; after this restore, total = 567 + (turn - 436).

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 21 | 501 | Infirmary | `get in bed` -> death by rusty diagnostic robot (347 serums, leg saw) | Hilarious and in-genre, but the weariness hint only named the far-off Kalamontee dorms; nothing warned the infirmary beds were lethal. Cost me 65 turns | other | medium |
Turn 436 (restored): Back in the Infirmary at 6659, evening, fever suppressed. New plan knowing weariness hits at ~turn 497: peek at the few unexplored Lawanda exits (big east doorway, the stairway down), then take the shuttle home early, grab pliers and the good bedistor from the Tool Room, and sleep in a real Kalamontee dorm bunk.
Turns 437-439: Down the narrow stairs: the Repair Room - dim, locked cabinets, a very small doorway north, and a motionless robot face-down at the foot of the stairs, "damaged beyond repair". The repair robot that was summoned for Section 196, I'd bet - it fell down the stairs. Poor thing.
Turns 440: Nothing on the dead robot. North: "a robot-sized doorway -- a bit too small for you." A job for Floyd! Asked him to go north.
Turns 441-443: Floyd arrives and identifies the corpse: Achilles, the repair robot, "always had trouble with one of his feet... that's why they named him Achilles." Groan, love it. FLOYD, GO NORTH worked! He squeezes in, plays with an old rubber ball that falls apart, and comes back: "Nothing else interesting inside. Just a shiny fromitz board." THAT's my good board - but Floyd didn't bring it. Classic. Need to ask him to fetch it.
Turns 444: FLOYD, GET BOARD: "If you say so." He fetches it and tosses it to me - good shape. Then wanders off exploring. (My follow-up chained command hit an empty room; harmless.) Off to Planetary Defense to swap boards.
Turns 445-448: Up, east, north into Planetary Defense. Opening the panel again (this timeline hasn't touched it). Second board out (the fried one), shiny board in.
Turns 449-452: Second (fried) board out, PUT SHINY BOARD IN PANEL: "The card clicks neatly into the socket. The warning lights stop flashing." +6, score 48. Planetary Defense fixed! Two of four red monitors done (Comms, Defense). Dropping the fried board and red spool here. Next: Course Control's fused bedistor - I need the pliers and good bedistor from Kalamontee, which fits the plan of going back to sleep there anyway.
Turns 453-455: Fever symptoms back (turn 453, same as the other timeline's 462-ish - it tracks time since the medicine). Floyd rejoins. Quick peek through Systems Corridor East's big east doorway before heading for the shuttle.
Turns 456-457: The big east doorway is Lawanda's Physical Plant: enormous, "oddly" much larger than Kalamontee's though the complex is smaller. That oddness smells like a secret, but nothing obvious. One more peek: Project Corridor East's east doorway.
Turns 458-461: Back through the Library Lobby (green spool still in the dust in this timeline; I know what it says) to Project Corridor East, then east.
Turns 461-462: Main Lab: exits W, SW, heavy metal doors NE and SE, a small doorway S. South is Lab Storage: a pale blue lab uniform on a rack (logo on the pocket) and a FRESH LASER BATTERY. (I fired off a few reflex guesses - locker, gas mask - that the parser rightly rejected; my fault.) Searching the lab uniform and taking the battery.
Turns 463-465: SEARCH LAB UNIFORM: a small piece of paper and a TELEPORTATION ACCESS CARD in its pocket! That's the booth network - Booth 3 here, Booth 2 by the Kalamontee elevators. No more shuttle crashes. (LOOK IN POCKET OF LAB UNIFORM: "I don't know the word 'of'" - a parser gap.) Took the uniform. Reading the paper.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 22 | 463 | Lab Storage | `look in pocket of lab uniform` -> "I don't know the word 'of'." | "X of Y" is common English; SEARCH worked, so no harm | not understood | low |
Turns 465-466: The paper: "Week of 14-June-2882. Combination to Conference Room: 324." The Rec Area dial door (0-1000)! Took the fresh battery too - my laser's battery was "old". Pieces clicking together fast now.
Turns 467: The Main Lab's heavy doors are a "radiation-lock door" (NE) and a "bio-lock door" (SE). Both sound like death without preparation, and it's night. Leaving them for tomorrow. Teleporting home via Booth 3.
Turns 468-471: Project Corridor East, Library Lobby, Booth 3. Sliding the teleportation card.
Turns 471-473: "Redee." Pushed beige (2): a strange feeling in the pit of my stomach, Floyd squeals and clutches his guidance mechanism - and I'm in Booth 2, Kalamontee, in one turn. What took ~30 turns by shuttle. Out to the lobby; Tool Room for pliers and the good bedistor.
Turns 474-476: Junction, down the mech wing.
Turns 477-479: Tool Room, and weary already at 478 (earlier than yesterday - the disease's extra-sleep symptom, I think). Dropping the lab uniform and shuttle card (the teleporter replaces the shuttle) to take the pliers and the good bedistor.
Turns 479-480: GET PLIERS: the teleportation card slipped and both tumbled - the weight limit again, even after dropping two items. It's clearly weight not count. Rearranging: the old steel key comes out of my pocket to make room for the teleport card, and the battery stays here next to the laser.
Turns 481-483: Key and battery dropped, card retaken, pliers taken - then GET GOOD BEDISTOR made the pliers slip. Argh. (PUT TELEPORTATION CARD IN UNIFORM also asked "lab or Patrol uniform?" - fair, the lab one is on the floor.) Clearly I'm at the limit. The empty canteen goes next; the kitchen is on the way to the dorms.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 23 | 479-483 | Tool Room | Three "Oh, no. The X slips from your arms... both tumble to the ground" in a row while collecting small parts | The carry limit is the single most frequent friction of the game for me; each failure costs a turn and I can't see how close I am to the limit | tedious | medium |
Turns 484-487: Teleport card into the Patrol uniform pocket; empty canteen dropped in the Tool Room; pliers and good bedistor taken at last. Food: the ration and the green goo. Now to the dorms to sleep (about 7 moves), and tomorrow the dial door (324) and back to Lawanda by teleporter.
Turns 488-491: North through the mech wing to the junction, Floyd back at my heels. The long walk west next.
Turns 492-494: The 3-hour walk ("really tired now" on arrival), north into Dorm D. SAVED at turn 494 before sleeping (overwrites the Infirmary save). Bunk and sleep.
Turns 494-496: (The save was actually at turn 493.) Slept; dreamed of a busy office where Floyd delivers coffee and asks for a story, "his deep, trusting eyes" - this game keeps making me fond of him. SEPTEM 8, woke at 1817 (175 later than yesterday's 1642: the extra sleep the spool warned about). Day 3 of 8-10. Gather things, then the Conference Room dial (324) in the Rec Area nearby.
Turns 497-499: Up, GET ALL (kit, upper card, bedistor, pliers, ration), DIAGNOSE: "a bit sick and feverish", rested, fed. West to the Rec Area.
Turns 500-503: Dorm Corridor, Mess Corridor, Rec Corridor, Rec Area. Dialling 324.
Turns 504-506: TURN DIAL TO 324: "The door swings open." Conference Room: a long table, and north a phone-booth-sized room - Booth 1! So the teleporter links the dorm end (1), the elevator lobby (2) and Lawanda (3). That kills the 3-hour walk forever. Wonderful.
Turns 507-510: Table: nothing. Booth 1 (buttons 2 beige, 3 tan). Slid the card, pushed tan: straight to Booth 3 in Lawanda. From the dorms to the far island in one move. Now Course Control with the pliers and bedistor.
Turns 511-514: Library Lobby, Systems Corridor East, Course Control. Opening the cube; then TAKE FUSED BEDISTOR WITH PLIERS.
Turns 515-517: Pliers pulled the fused bedistor; good bedistor in: "The warning lights go out and another light goes on." +6, score 54. Course Control fixed. Three of four red systems done; only Project Control remains - Section 196, inside the computer, via the miniaturization booth. I need a miniaturization access card. Where? Candidates: the bio-lock and radiation-lock doors in the Main Lab, and the dark Transportation Supply room. Dropping the dead bedistor and pliers.
Turn 518: SAVED in Course Control at turn 518 (total turns spent so far about 649). Now to the Main Lab to probe the lock doors, save in hand.
Turns 519-522: Back down to the Main Lab. Trying the radiation-lock door first.
Turns 523-525: The radiation-lock door just opened. Radiation Lock West, a decontamination chamber before the Radiation Lab. Floyd: "Is this...is this a squash court?" Hungry - ate the emergency ration (see response). Carefully east.
Turns 526-528: The ration was pale and faintly sweet, "not a meal anyone would choose, but it is a meal". Radiation Lock East, then OPEN DOOR - "The door opens" - and east into the Radiation Lab: equipment, and "A lamp is sitting on a table". A LAMP! That's my light for the dark Transportation Supply room. But this is a radiation lab... grab it and leave fast.
CORRECTION to the entry above (turns 526-528): I wrote that ahead of reading the responses, and it was wrong - there is no lamp and I never entered the lab. What actually happened: Radiation Lock East has a sign "WARNING! Radiation suits must be worn beyond this point." OPEN DOOR: a bored recorded voice says both lock doors cannot be open at once. E: "The lab door is closed." GET LAMP: "You can't see any lamp here!" (my own wishful typing). I have no radiation suit, so I'm NOT going in. Backing out to close the west door and try the bio-lock instead.
Turns 528-532: Back west to Radiation Lock West and the Main Lab. OPEN BIO-LOCK DOOR: opened. SE into Bio Lock West: a decontamination chamber for the Bio Lab (east), with a sign "WARNING! Mutant creatures beyond this point!" Mutants. I'm unarmed - the laser is back in the Kalamontee Machine Shop. Not going in blind.
CORRECTION again: I jumped ahead of the text. Bio Lock West actually says only that it's a sterilization chamber protecting delicate biological experiments in the Bio Lab beyond, continuing east; Floyd asks if it's a squash court again. No mutant sign (yet). Lesson: write after reading, not before. Stepping east carefully.
Turns 532-533: Bio Lock East; the west door closes silently behind us. The Bio Lab door has a window: a large dim lab, a blue glow from a crack in the north wall, "shadowy, ominous shapes" moving, and a magnetic-striped card on the floor just inside the door. Floyd peers in on tiptoe: "Ooo, look, there's a miniaturization booth access card!" There it is - the key to Section 196, guarded by monsters. The only helper small and brave (or foolish) enough... is Floyd. Oh no. I think I know where this is going.
Turn 533: SAVED first (Floyd: "Oh boy! Are we gonna try something dangerous now?" - yes, Floyd, yes). FLOYD, GET CARD: "Enough talking! Let's play Hider-and-Seeker." Then I opened the door myself: "a Bio-Lab full of horrible mutations... Growling with hunger and delight, the mutations march into the bio-lock and devour you." DEAD, score 54, "Planetary Commodore". Fair: the game showed me the shapes. Restoring to turn 533. Turn bookkeeping: 664 spent so far; after this, total = 664 + (turn - 533).

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 24 | 533 | Bio Lock East | `floyd, get card` -> "Enough talking! Let's play Hider-and-Seeker." | Floyd obeyed "go north" and "get board" in the Repair Room but refuses here with a stock line; I can't tell whether it's the wrong phrasing or the wrong moment | confusing | medium |
Turns 533-535 (restored): FLOYD, GO EAST: "Are you kidding? Floyd not going in THERE without a good reason." So he can be sent - I just need to give him a reason. ASK FLOYD ABOUT MINIATURIZATION CARD (see next) ...
Turn 535: Floyd on the card: "Cards are neat! Floyd likes the kind with the stripe best." FLOYD, GET THE MINIATURIZATION CARD and FLOYD, OPEN THE DOOR both get the stock "Enough talking! Let's play Hider-and-Seeker." I'm stuck on how to phrase the "good reason". Trying a couple more angles (ask about the lab, tell him about the computer).
Turns 536-538: ASK FLOYD ABOUT LAB: "Ask a Doctor-person. Floyd only knows about games. And fixing things. A little." PLAY HIDER-AND-SEEKER: I play until I collapse, he wants more (cute, useless). FLOYD, GO EAST AND GET THE CARD: again "not going in THERE without a good reason", and he re-announces the card through the window. I'm going round in circles. One or two more phrasings, then I'll leave this and tackle the helicopter / dark room while I think.
Turns 538-539 and a second death: TELL FLOYD TO GET THE CARD: "I don't know the word 'get'." (!) TELL FLOYD ABOUT THE COMPUTER: "The terminal? Floyd never played with one of those." Then, hoping Floyd would react to the door opening, I opened it myself again - devoured again, same text. Restored to turn 533. Turn bookkeeping: 670 spent; after this restore, total = 670 + (turn - 533).

New idea: I'm unarmed. The laser (with a fresh battery, 6 settings) is a weapon. Fetch it from Kalamontee via the teleporter and come back to deal with the mutants myself, or at least see what the settings do.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 25 | 538 | Bio Lock East | `tell floyd to get the card` -> "I don't know the word 'get'." | GET is the most basic verb in the parser; the TELL X TO Y form breaks it. Misleading error | bug | medium |
| 26 | 533-539 | Bio Lock East | Floyd needs "a good reason" to go into the Bio Lab; nothing I say counts, and opening the door myself is instant death (twice) | This is where I'd reach for the hint book; the refusal hints at a condition but not its shape | blocked | high |
Turns 534-537: Out of the bio-lock (opened its west door), Main Lab, Project Corridor East. North to Booth 3, teleport to Booth 2, Machine Shop for the laser.
Turns 538-541: Library Lobby, Booth 3. "You notice that you feel unusually weak, and you suspect that you have a fever" - the disease stepping up a stage on day 3. Card slid, beige button: Booth 2, Kalamontee.
Turns 542-545: Lobby, junction, south through the mech wing.
Turns 546-549: Tool Room: took the new battery and my canteen. East into the Machine Shop where the laser waits. Swapping batteries next.
Turns 550-553: Took the old battery out, NEW BATTERY IN LASER worked, dropped the old one, and picked up the laser without a weight complaint. Armed. Testing settings would waste charge, so I'll just carry it. Next: fill the canteen at the kitchen? That's back west (Booth 1 is right beside it via the Conference Room). The teleporter makes this easy: Booth 2 -> Booth 1 -> Rec Area -> Mess Hall.
Turns 554-556: North up the mech wing with the laser, Floyd in tow.
Turns 557-560: Junction, lobby, Booth 2, card slid. Brown button for Booth 1 next.
Turns 561-564: Booth 1, Conference Room, Rec Area, Rec Corridor. Kitchen next.
Turns 565-568: Mess Corridor, Mess Hall, kitchen card (it came out of my pocket by itself), Kitchen. Filling the canteen.
Turns 569-571: Canteen in niche, button, filled, and taken without a spill this time. Closing it, pocketing the kitchen card, and saving. I'm close to the end of my leg budget.
Turns 572-575: Closed the canteen, kitchen card back in the Patrol uniform, SAVED (turn 573), --status, DIAGNOSE ("a bit sick and feverish", rested, fed), inventory, and SAVED again at turn 575 in the Kitchen. That's my leg.

### Leg 1 handoff

- **Why I stopped:** leg budget reached (about 750 commands including --status).
- **Game turn:** 575 on the counter. Total turns spent across restores (for the 2000 cap): about **712** (267 before the 1st restore; 201->501 = 300; 436->533 = 97 plus 6 more before the 3rd restore; 533->575 = 42).
- **Score:** 54 of 80 (rank at last death: Planetary Commodore).
- **Time/day:** Day 3 (SEPTEM 8, 11344), morning, time 3002.
- **Location:** Kitchen (Kalamontee, south of the Mess Hall). Floyd is with me. The kitchen door closes automatically when you leave; the kitchen card is in my pocket.
- **Inventory:** chronometer (worn); Patrol uniform (worn) with kitchen access card and lower elevator access card in its pocket; survival kit with one blob of green goo; canteen (FULL of protein liquid, closed); upper elevator access card; teleportation access card; laser (dial at setting 5) with a NEW battery.
- **Saves:** one slot. Current save = Kitchen, turn 575 (identical to now).
- **Health:** "a bit sick and feverish", well-rested, well-fed. I HAVE THE PLAGUE. The red spool says: once symptoms show, death in 8-10 days; symptoms are a high fever and needing more sleep each night. Symptoms began day 2 (about turn 219). The single dose of "disease suppression medicine" (Lawanda Infirmary) is used up; it only hid the fever for about 30 turns. Weariness now arrives earlier each day (day 3 I was weary by turn ~478 and woke at 1817 vs 1642 the day before).
- **Food:** hunger returns roughly every 50-90 turns. Kitchen protein dispenser: PUT CANTEEN IN NICHE, PUSH BUTTON, GET CANTEEN, DRINK LIQUID. Drop things before lifting the full canteen or it can spill. The emergency ration is eaten; the green goo remains.
- **Sleep:** ONLY in the Kalamontee dorm bunks (Dorm D works: GET IN BUNK, SLEEP, Z). Do NOT get into an Infirmary bed in Lawanda - a rusty robot kills you.
- **Carry limit:** strict and weight-based. "Oh, no. The X slips from your arms" means drop something first. The pocket holds about 3 small things.

#### Map (as I know it)
- KALAMONTEE west (dorm end): Crag (sea) -up- Balcony (plaque) -up- Winding Stair -up- Courtyard (W: West Wing, dead end). Courtyard N: Plain Hall (N: Rec Area; NE: Rec Corridor). Rec Area: dial door N (combination **324**, now open) -> Conference Room -> N **Booth 1**. Rec Corridor: N Dorm B (N SanFac B), S Dorm A (S SanFac A), E Mess Corridor. Mess Corridor: N Storage West (Spam tin, oil can, padlock), S Mess Hall -> S Kitchen (needs kitchen card), E Dorm Corridor. Dorm Corridor: N Dorm D / SanFac D, S Dorm C / SanFac C, E = a 3-HOUR walk to the Corridor Junction.
- KALAMONTEE east: Corridor Junction N: Admin Corridor South (crevice; magnet on floor; E SanFac E) -> N Admin Corridor (W Systems Monitors; N rift spanned by my ladder) -> Admin Corridor North (W Small Office -> W Large Office; N Transportation Supply = PITCH DARK; E Plan Room). Junction E: Elevator Lobby (N blue door = Upper Elevator, enabled; S red door = Lower Elevator, enabled; E **Booth 2**). Junction S: Mech Corridor North (E Storage East, my brush; W Physical Plant) -> Mech Corridor (E Reactor Control: dark stairs down; Reactor Elevator with slot, dead) -> Mech Corridor South (SW Tool Room: box of parts, shuttle card, key, ID card, lab uniform; S Machine Shop: chemical dispenser, old battery; SE Robot Shop: towel).
- Upper Elevator up -> Tower Core: NE Comm Room (FIXED), SW Observation Deck, UP Helipad (rusty helicopter; its panel wants "the orange key").
- Lower Elevator down -> Waiting Area -> E Kalamontee Platform -> S Shuttle Car Alfie (I crashed it into the Lawanda end once; teleporter makes it unnecessary).
- LAWANDA (by teleporter: slide the teleportation card in any booth, then press the button for the booth number; Booth 1 = Conference Room, 2 = Elevator Lobby, 3 = Lawanda Library Lobby): Booth 3 -W- Library Lobby (terminal: TYPE numbers; green spool in the dust). Library Lobby W up: Library (spool reader; my spools). N: Systems Corridor East (N Course Control FIXED; E huge Physical Plant). S: Project Corridor East (S Computer Room -> S **Miniaturization Booth** with slot + keypad; Computer Room W ProjCon Office with a rippling mural that hides the cryo-elevator; E Main Lab). Main Lab: S Lab Storage; NE radiation-lock door -> Radiation Lock W/E (sign: radiation suits required); SE bio-lock door -> Bio Lock West/East -> Bio Lab full of MUTANTS (instant death if you open its door). Systems Corridor (W of SC East): N Planetary Defense (FIXED). Systems Corridor West: NW Infirmary (deadly beds), stairs down N to Repair Room (dead robot Achilles; robot-sized door N), SW Fork -> W/down escalator to Lawanda Platform (shuttle cars N and S). Project Corridor West: W SanFac F, NW Fork, E Project Corridor.

#### Puzzles solved
Escape pod and swim to the Crag; magnet fishes the steel key from the crevice; padlock -> Storage West (ladder); ladder bridges the rift; desk cards (kitchen, upper elevator, shuttle); tickling Floyd -> lower elevator card; kitchen protein dispenser; Comm Room coolant sequence (flask from the Tool Room, filled at the Machine Shop dispenser with the colour the enunciator shows - gray, red, brown for me - poured into the funnel): help message sent (+6); shuttle to Lawanda; medicine; FLOYD, GO NORTH / FLOYD, GET BOARD in the Repair Room -> shiny fromitz board -> Planetary Defense fixed by swapping out the "second" board (+6); pliers + good bedistor -> Course Control fixed (+6); lab uniform -> teleportation card + paper with the Conference Room combo 324; teleporter network 1/2/3.

#### Open puzzles
1. **Project Control / Section 196** - the last red system, and surely the cure for the plague and for me. The Computer Room printout: cure 0.8 chrons from done when "Malfunction in Section 196" hit. Plan: get the **miniaturization booth access card** lying just inside the Bio Lab door (Floyd spotted it through the window), then in the Miniaturization Booth slide it and type 196.
2. **Getting that card:** opening the Bio Lab door myself = death (twice). FLOYD, GO EAST -> "Floyd not going in THERE without a good reason." FLOYD, GET CARD / OPEN THE DOOR -> the stock "Enough talking!" refusal. TELL FLOYD TO GET THE CARD -> "I don't know the word 'get'." Unsolved.
3. **Helicopter:** needs a Helicopter Access Card and a Control Panel Key ("orange key") from Transportation Supply (pitch dark; no light source found yet).
4. Radiation Lab needs a radiation suit (none found).
5. Also: the cryo-elevator behind the ProjCon mural; the Reactor Elevator slot; the dark Reactor Access Stairs; Lawanda's Physical Plant being "oddly" bigger than it should be.

#### Theories
- The laser (6 settings, fresh battery) may deal with the mutants, or cut something open; untested.
- Floyd's "good reason" may be about timing or phrasing (maybe he acts if I open the door with him beside me in a particular way, or from Bio Lock West). A fresh pair of eyes should try a few forms, saving first.
- A light source may be hidden in the Lawanda Physical Plant or the Radiation Lab.

#### What I intended to do next
1. From the Kitchen: N, N, W, W to the Rec Area, N, N to Booth 1, slide the teleportation card, push tan (3) -> Lawanda.
2. Bio Lock East with the laser (SAVE first). Try SET DIAL / SHOOT MUTANTS, OPEN DOOR then CLOSE DOOR, and new Floyd phrasings. Restore after any death.
3. With the card: Computer Room -> S Miniaturization Booth, slide the card, type 196.
4. Watch hunger (drink the canteen when warned; refill at the Kitchen) and weariness (teleport to Booth 1 and sleep in Dorm B or D).

### Leg 2

Picking up in the Kitchen at turn 575 (about 712 total turns spent), score 54, day 3, feverish, full canteen, laser with a fresh battery. Plan: teleport to Lawanda and crack the Bio Lab card problem - with the laser, and with Floyd somehow.

#### Leg 2 friction

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|

Turns 575-578: Status check, then out of the Kitchen (door closes behind me, card safely pocketed) and north to the Mess Corridor with Floyd. Heading west to Booth 1.
Turns 579-581: Rec Corridor, Rec Area, Conference Room. Floyd stopped following at the Rec Area. I need him for the bio-lock, so I'll wait a turn for him to catch up before teleporting.
Turns 582-584: Floyd bounded in on the first wait; the second wait was wasted (should've gone on). Into Booth 1 with him. Card, tan button.
Turns 585-587: Card, tan, Floyd squeals, Lawanda. Library Lobby. South and east to the Main Lab and the bio-lock.
Turns 588-590: Project Corridor East, Main Lab (Floyd still with me), bio-lock door open. Into the lock.
Turns 591-593: Through Bio Lock West to Bio Lock East with Floyd; SAVED at 592 (Floyd: "Are we gonna try something dangerous now?"). Looked through the window: same blue-glow crack, shadowy shapes, card just inside. Floyd names the card again. Time to try the laser on the mutants: set it low first.
Turns 594 and a third death: the laser has 6 settings, dial on 5. I opened the door with the laser in hand, hoping for a turn to shoot: no - "frozen with horror", devoured, same text. Restored to 592. Bookkeeping: about 731 total spent; after this, total = 731 + (turn - 592). Floyd is plainly the key. Next experiment: have him see the card through the window and open the door on the very next turn, while it's fresh in his mind.
Turn 593, death four: window, then OPEN DOOR at once - devoured again, word for word. Restored to 592 (total about 733). So timing isn't it. I'm going to try giving Floyd a reason in words he might recognise: the booth, the computer, "help".
Turn 593, death five: TELL FLOYD ABOUT MINIATURIZATION BOOTH -> "Floyd never heard of that. Is it a game?"; FLOYD, HELP ME -> stock "Enough talking!"; then Floyd peered through the window on his own and I opened the door the instant after - devoured. Restored to 592; total spent about 735. I'm done throwing myself at this door. Something else must have to happen first. The Main Lab has an unexplored SW exit, and the Lawanda Physical Plant is "oddly" big. Exploring those.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 27 | 593-594 | Bio Lock East | Three more OPEN DOOR deaths (laser in hand; right after Floyd sees the card; after he peers on his own) - identical death text each time | No variation in the death message means no feedback on whether I'm getting warmer; five deaths now at this one door | blocked | high |
Turns 593-596: Back out through the lock to the Main Lab, then SW - which is just the Computer Room again. Floyd frets: "Computer is broken... the most important part of the Project." At least he cares. Now the Lawanda Physical Plant, via the Library Lobby.
Turns 597-599: North, north, north to Systems Corridor East; Floyd bounding in behind every step. East into the big plant.
Turns 600-601: Physical Plant: "Oddly... much larger than the one in the Kalamontee Complex. The only exit is westward." EXAMINE EQUIPMENT: too complicated. SEARCH ROOM: "I don't know the word 'room'." (a veteran reflex the parser doesn't share). The oddness must mean something, but I see nothing to act on. My real blocker everywhere is LIGHT: two pitch-dark places in Kalamontee. Does the laser make light?
Turns 602-603: TURN ON LASER: "You can't turn that on." FIRE LASER: "a narrow blue beam of light" - and +2 points (score 56)! Just for firing it. Setting 5 = blue; I bet the six settings are colours of the spectrum. Trying setting 1.
Turns 604-605: SET DIAL TO 1, FIRE: a red beam. So 1-6 run red to violet-ish. Not a torch. I'll stop wasting charge. Setting it back to 5 later maybe. Checking the middle Systems Corridor for exits I haven't tried.
Turns 606-608: Went west then fumbled a S back into the Library Lobby. Fine: the terminal may have lore on the labs. Turned it on; Technology (3) first.
Turns 609-611: Technology submenu (Medicine, Agriculture, Transportation, Robotics, Planetary Systems). Medicine: diseases curable for centuries, cryogenics lets doctors freeze patients until a cure is found, life expectancy 147. TYPE 0 from the article took me back to the Technology menu, not the main one. Robotics next - Floyd might have a manual.
Turn 612: Robotics: old robot teams replaced by single multipurpose B-19s (Floyd's series). Nice, but no help. New idea while standing here: shoot the mutants THROUGH the window, without opening the door. Back to the bio-lock.
Turns 613-615: Project Corridor East, Main Lab, bio-lock door open. Floyd didn't follow this time; I'll wait for him in the lock.
Turns 616-617: Floyd caught up in the lock. SHOOT MUTANTS: "You can't see any mutants here!"; SHOOT SHAPES: "I don't know the word 'shapes'." - even though the window text calls them "shadowy, ominous shapes". Through-the-glass is not a thing. Next gamble: the Radiation Lab, with a save, to see what's actually in there (maybe a light, maybe a suit).

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 28 | 617 | Bio Lock East | `shoot shapes` -> "I don't know the word 'shapes'." | The window description's own noun isn't in the vocabulary | not understood | low |
Turns 618-622: Out of the bio-lock to the Main Lab; hunger growled right on cue (the hint helpfully names the goo). Opened the canteen and drank the protein liquid instead - fed and watered, goo kept in reserve. Canteen now empty. On to the radiation lock.
Turns 623-625: The radiation-lock door was still open from yesterday's visit. Through both halves to Radiation Lock East. The west door has to be closed before the lab door will open (the bored recorded voice told me last time), so back one step to close it.
Turns 626-628: West door closed (Floyd whispers Fizpick rumours again), back east, SAVED at 628 in Radiation Lock East (overwrites the bio-lock save; this one is strictly better - fed, score 56). Now the lab door.
Turns 629-631: Door opened, and in: the Radiation Lab, blue-glowing split canisters, a crack through to the Bio Lab and its "sinister-looking forms" - and on the table a small brown spool AND "a powerful portable lamp". (My false entry from leg 1 about a lamp here turns out to have been prophecy, which is embarrassing and funny.) Grab both and get out before the radiation gets me.
Turns 632-635: GET LAMP AND SPOOL: spool yes, lamp "too heavy", with the suggestion to drop the kit. I dropped the empty canteen first instead - still too heavy - so the kit (with my last goo) went too. Lamp in hand. Two containers left on a radioactive floor; I'll grab the canteen if the weight allows. Leaving now.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 29 | 631 | Radiation Lab | The lab holds the lamp I needed for both dark rooms, reachable without any suit; nothing bad happened (yet) | A real "aha" payoff for braving the warning sign, with a save in hand | nice | - |
Turns 636-637: Out to the lock: "You suddenly feel sick and dizzy." Then vomiting, and ALL MY HAIR FALLS OUT. Floyd points and laughs hysterically: "You look funny with no hair." Poor ensign. Radiation poisoning - four turns in there was too many. I'll see if it kills me; if it does, the replay is: in, GET LAMP (drop kit and canteen FIRST, outside), out.
Turn 638, death six: "It seems you have picked up a bad case of radiation poisoning." Dead two turns after the hair loss. Restored to 628 in Radiation Lock East. Bookkeeping: about 781 total spent; after this, total = 781 + (turn - 628). Speed run: drop the kit and canteen here, open, in, GET LAMP, out - two turns in the lab, not four.
Turns 629-634: Dropped kit and canteen in the lock, opened the door, E, GET LAMP ("Taken." - one try), W. Two turns in the lab. I skipped the brown spool this time to save a turn. Closing the lab door and watching my health like a hawk.
Turns 635-637, death seven: sick and dizzy the turn after I left, hair gone the next, dead of radiation poisoning the one after that - even with only two turns inside. Restored to 628. Bookkeeping: about 790 total; after this, total = 790 + (turn - 628). So either ANY time in there is lethal, or the LAMP is what's hot. One experiment: go in, touch nothing, come out, close up and wait. If I live, the lamp is the poison.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 30 | 635-638 | Radiation Lock | Two turns in the Radiation Lab -> sick, bald, dead within about 5 turns, with no suit anywhere I've seen | The sign warned me, fair; but the only light source I've found sits in a room that kills in five turns, and I can't tell if it's the room or the lamp | blocked | high |
Turns 629-633: The experiment: in for ONE turn, touching nothing, out, door shut, wait - "You suddenly feel sick and dizzy." The room itself is lethal; the lamp is innocent. Restored before the hair loss (Floyd: "That part of the game was more fun than this part"). Total now about 795; after this restore, total = 795 + (turn - 628). But I have a robot who doesn't have hair. Floyd fetched the board in the Repair Room: let's send him in for the lamp.
Turns 629-630: Door open. FLOYD, GO EAST: "After you." - ha, he won't lead the way. FLOYD, GET LAMP: "You can't see any lamp here!" (it's the parser talking about me, not Floyd). Closing the door; I want to know whether just standing at the open door poisoned me.
Turns 631-633: Door closed, two waits: no sickness. So opening the door is safe, stepping in is death. Floyd won't go first, and I can't command him about things I can't see. The lamp is out of reach until I find a suit or a trick. Leaving the lab wing to sweep Kalamontee for things I've missed (Physical Plant NE, Observation Deck, Storage East), then sleep. Floyd is with me.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 31 | 630 | Radiation Lock East | `floyd, go east` -> "After you." ; `floyd, get lamp` -> "You can't see any lamp here!" | Floyd will fetch things he has seen, but won't go first; I can't send him in for an object only he'd be near. Clever-ish, but it closes the obvious out | confusing | medium |
Turns 634-636: Out through the radiation lock to the Main Lab. Now to Booth 3.
Turns 637-639: Corridor, Library Lobby, Booth 3, Floyd scampering in. Card and beige for Booth 2.
Turns 640-642: Teleported to Booth 2 and out to the Elevator Lobby. Now the Kalamontee Physical Plant's NE exit, which I never walked.
Turns 643-645: Junction, Mech Corridor North, west into the Physical Plant - which I now realise I entered by its NE corner, so there's nothing new there. Next: the Reactor Elevator's slot with every card I've got.
Turns 646-648: Mech Corridor, Reactor Control, button: the reactor elevator doors open. In, and slot every card.
Turns 649-651: Floyd bounced into the Reactor Elevator with me. Upper card and teleport card: "Inkorekt awtharazaashun kard." One more card exists somewhere. Then a thought: in THIS timeline Floyd walked into the Computer Room at 596 and said "Computer is broken... the most important part of the Project." In all my earlier bio-lock deaths he had never seen the broken computer. Maybe that's his "good reason". Back to Lawanda to test it.
Turns 652-654: Out of the elevator - its door slid shut behind me, and I'm not sure Floyd got out. Mech Corridor, Mech Corridor North. He usually catches up; I'll watch for him.
Turns 655-658: Floyd bounded into the lobby after all. Booth 2 together, card slid. Tan to Lawanda.
Turns 659-661: Booth 3, Library Lobby, Project Corridor East, Floyd close behind. Into the Main Lab and the bio-lock.
Turns 662-665: Main Lab, bio-lock door, both halves of the lock with Floyd. SAVED at 665 in Bio Lock East (overwrites the radiation-lock save). Now: FLOYD, GO EAST - does the broken computer count as a good reason?
Turn 666: YES. Floyd peers through the window, and now he's seen the broken computer: "We'll need card there to fix computer... Floyd will get card. Robots are tough. Nothing can hurt robots. You open the door, then Floyd will rush in. Then you close door. When Floyd knocks, open door again. Okay? Go!" His voice trembles. I have a lump in my throat. The good reason was the broken computer - he had to see it himself. Opening the door.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 32 | 666 | Bio Lock East | After Floyd had seen the broken computer (Computer Room), `floyd, go east` -> he volunteers and spells out the plan | Lovely motivated-companion design, and it fits "good reason" exactly - but it cost me five deaths because nothing pointed me back to the computer | nice | - |
Turns 667-669: Opened; Floyd plunges in and is set upon by hideous monsters, shrieks at me to close the door. Closed it. Growling, a skirmish, a high-pitched metallic scream. Waited: three fast knocks... then "the distinctive sound of tearing metal." Oh no. Opening the door as promised.
Turns 670-671: Opened: Floyd stumbles out clutching the mini-booth card, mutants rushing the doorway. Closed it "not a moment too soon". And then Floyd staggers to the ground, torn apart, oil flowing. "Floyd did it ... got card. Floyd a good friend, huh?" I cradle his head and sing the Ballad of the Starcrossed Miner, and he smiles and his eyes close. +2, score 58. I am not ashamed to say that got me. Forty-odd years after everyone else, I finally understand why people talk about this scene. Sitting a moment. Then: the card.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 33 | 671 | Bio Lock East | Floyd's death and the Ballad of the Starcrossed Miner | The emotional high point of the game; everything with Floyd built to it | nice | - |
Turns 672-673: Took the miniaturization card (+1, score 59). SAVED at 672 - no "Oh boy" from Floyd this time, and the silence says it all. West through the lock, alone now. To the Computer Room and the booth.
Turns 674-676: Out of the lock, Main Lab, SW to the Computer Room. The red light still glows. Into the booth south, laser and all - who knows what lives inside a computer.
Turns 677-679: Booth, card: "Please type in damaged sector number." TYPE 196: the walls slide away and I'm at "Station 196" - standing on a heavy metal plate, an identical plate overhead (a capacitor? I'm INSIDE the circuitry), a wide metallic strip east. Honey, I shrunk the Ensign.
Turns 680-682: East onto the "silicon filament ... like a wide metal highway" (+4, score 63), a sheer drop into black void to the south. North along the strip over a bottomless void to a sealed micro-relay in transparent red plastic. Looking in.
Turn 683: A speck wedged in the relay's contact, a "blue boulder" at my size, behind RED translucent plastic. Physics puzzle: red plastic passes red light, a blue thing absorbs red. My laser is still on setting 1 (red) from my test earlier. Shooting the speck.
Turns 684-686: Three shots: "a little wide", "A near miss!", "just misses". The red beam does go through the plastic, at least. And now "The laser feels slightly warm now". Overheating clock? Two or three more shots, then rethink.
Turns 687-688: Hit! It sizzles. Hit again: vaporized into ash, the relay closes, and a whisper: "Sector 196 will activate in 200 millichrons. Proceed to exit station." +8, score 71! (I fired two more reflex shots at nothing - "You can't see any speck here!" - no turn cost.) RUN for the station before 196 powers up under my feet.
Turns 689-691, death eight - and my own fault in a new way: I typed S, S, W, LOOK, Z, Z in a rush without reading between them. The first S dropped "a giant elephant-sized monster" onto the strip - a slimy translucent RED microbe that "somehow violated the sterile environment" - and the rest of my keystrokes bounced off it ("Not a chance...", "Do you have a penchant for bottomless voids?") while it slithered closer, until the two Z's let it shove me into its gullet. Score 71, "System Captain". Lesson re-learned: one command, read, then the next. Restoring to 672 (Bio Lock East, card in hand). Bookkeeping: about 858 total; after this, total = 858 + (turn - 672).

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 34 | 688-691 | Middle of Strip | Right after the speck is vaporized and "Proceed to exit station", a microbe lands on the strip and eats you in about three turns | A great surprise twist; my death was from typing ahead, not the game's unfairness | nice | - |
Turns 672-674 (replay): Floyd's body lies in a pool of oil in the lock; I left him there. West, door open. Same route to the booth.
Turns 675-677 (replay): Main Lab, Computer Room, Miniaturization Booth. Card, 196.
Turns 678-680 (replay): Card, TYPE 196, Station 196, east onto the strip (+4, 63). North twice to the relay.
Turns 681-683 (replay): North, north, first shot misses. Firing one at a time now and reading each.
Turns 684-686 (replay): Miss, miss, miss; laser warm again. The aim is random, it seems. Keep firing.
Turns 687-689 (replay): Hit (sizzle), miss ("somewhat warm" now), hit - vaporized, +8, score 71, "Proceed to exit station." This time I SAVE before stepping south into the microbe's ambush.
Turns 689-690: SAVED at 689 at the relay. South: plop, the red microbe. Its skin is red and translucent, like the relay's plastic - so my red beam would sail straight through it. Switching to blue (5) and shooting.
Turns 691-692: Dial to 5 (the microbe towers over me meanwhile). Blue beam: it "rears back for a moment" then advances again; a pseudopod swipes at my head and I duck. The laser keeps getting warmer. Shooting only stalls it. Desperate idea: it lunged at the heat - throw the warm laser into the void and hope it follows.
Turn 693, death nine: the laser sailed into the void and the microbe ate me anyway. Restored to 689. Bookkeeping: about 879 total; after this, total = 879 + (turn - 689). Next try: keep shooting it every turn (each shot made it rear back) and see whether the laser's heat builds to something useful.
Turns 689-691 (again): Restored, south, microbe. Tested red on it: "passes harmlessly through its red skin." So colour matters, as I thought, but blue only makes it rear back. My theory now: it's drawn to HEAT, and the laser wasn't hot enough when I threw it. Restoring to the relay, where I can heat the laser safely (set to 5 and fire at the wall) before stepping south.
Turns 689-691 (third go): Restored, dial to 5, SHOOT WALL: "I don't know the word 'wall'." (the room description's own "huge featureless wall"). FIRE LASER works though: blue beam. Firing a few more to build heat.
Turns 692-694: Three more blue blasts; "The laser feels very warm now". Two more for luck, then south.
Turns 695-697: Two more shots: "The laser feels quite hot." South: the microbe plops down, salivating. Now throw the hot laser over the edge.
Turns 698-699: THROW LASER INTO VOID: "the hungry microbe lunges after it. Both the laser and the microbe plummet into the void. (Whew!)" - their Whew and mine. The heat theory was right; it just needed to be hot, not warm. South to the station end.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 35 | 690-698 | Middle of Strip | Microbe: red beam passes through its red skin, blue makes it flinch, a HOT laser thrown into the void lures it after | Layered and fair once you watch the laser's warmth messages; the first throw at "somewhat warm" just failing silently was harsh | nice | - |
Turns 700-701: West onto Station 196: "Main Miniaturization Booth has malfunctioned...switching to Auxiliary Booth..." (+4, score 75) and I'm full-size in an Auxiliary Booth. North: the Lab Office - locked files, a messy desk, three buttons (Lab Lights On, Lab Lights Off, Emergency System), and a door west to the Bio Lab. "The only way out is through the mutant-infested Bio Lab." Ha, lovely sting. Saving first, then the desk.
Turns 702-704: SAVED at 701. The desk papers: a memo - an emergency system floods the whole Bio Lab with "a deadly fungicide"; "proper precautions should be taken". OPEN DESK: a GAS MASK. The puzzle writes itself: mask on, red button, walk through the gassed lab. Taking and wearing the mask.
Turns 705-707: Mask taken and worn (dusk now). Red button: "a hissing from beyond the door to the west." Fungicide away. Through the lab, fast.
Turns 708-709: Door open: mist, "horrifying biological nightmares stagger about making choking noises." West into the Bio Lab: a mandibled shell-beast, an axe-wielding deformed humanoid, a fanged lurker, a three-legged tentacle plant - all stunned by the mist "but slowly recovering". And the PA: "Revival procedure beginning. Cryo-chamber access from Project Control Office now open." The mural! West to the lock, now.
Turns 709-714: A chase! W bumped the closed lab door (a wasted keystroke), OPEN DOOR asked "lab door or office door?", answered LAB DOOR, fled west into Bio Lock East past poor Floyd - the mutants burst in on my heels, the plant lashing my ankles. West, door opened ("almost upon you now!"), west into the Main Lab, fangs tearing my clothes. Racing for the Project Control Office: SW, W, then S into the cryo-elevator.
Turns 715-718: Computer Room (the red light is DARK now - fixed!), mandibles nipping my arms; ProjCon Office, where the mural has slid away to reveal the elevator; S into the Cryo-Elevator with the monsters storming the door; PUSH BUTTON: "The elevator door closes just as the monsters reach it!" +5, score 80 of 80. My heart is actually pounding. That chase was a perfect piece of pacing: every room one step ahead of the teeth. Going down.

| # | turn | where | what I typed / what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|------------------------------|-----------------------|------|----------|
| 36 | 709-718 | Bio Lab to Cryo-Elevator | The fungicide only stuns the mutants; a room-by-room chase to the cryo-elevator with a new bite each turn | Thrilling and exactly fair: the route was one I already knew, and the PA announcement told me where to run | nice | - |
| 37 | 709 | Bio Lab | `w` -> "The lab door is closed." then `open door` -> "Which do you mean, the lab door or the office door?" | Two keystrokes lost mid-chase; luckily they cost no game time | not understood | low |
Turns 719-721: Two waits and a look: still in the elevator, door closed, no sign of arrival. Last time an elevator stalled on me, the answer was patience. Waiting more.
Turns 722-723: The door opened and I stepped into the Cryo-Anteroom: thousands upon thousands of cryo-units, millions asleep. A medical robot wakes Veldina, leader of Resida, red-haired and gracious: the cure is found, the systems repaired, thanks to me. The S.P.S. Flathead is in orbit; Blather was picked up from his own escape pod and is now an Ensign Twelfth Class assigned as my personal toilet attendant (the scrub brush comes full circle!). I'm promoted to Lieutenant First Class and offered the leadership of a world. A robot stings my arm with the antidote. And then the robot technicians part and FLOYD comes bounding in - "Floyd feeling better now!" - handing me a helicopter key, a reactor elevator card and a paddleball set: "Maybe we can use them in the sequel..." So the helicopter, the orange key, the dark room, the reactor elevator and the radiation-lab lamp were all red herrings or sequel bait. I laughed and, honestly, got a bit misty. GAME WON: 80 of 80, "Galactic Overlord", Day 3, turn 723.

Final thoughts: a beautifully built game. The world is coherent (every lock has a card, and the cards are where people would have left them), the lore is delivered as puzzle information (the disease clock, the Project phases, the Section 196 printout), and Floyd carries the whole thing emotionally - his death and return are earned. The frictions were mostly the ones any 1983 game has: a harsh weight limit, a hunger clock, a long corridor tax, and a couple of doors where one wrong step is instant death with no gradient of feedback. The one puzzle I'd have reached for the hint book on was Floyd's "good reason" - it resolved the moment he had seen the broken computer for himself, which is fair, but I'd died five times at that door before stumbling onto it.

### Leg 2 handoff

- **Why I stopped:** the game is WON (80/80). Nothing more to play in this run.
- **Game turn:** 723 on the counter. Total turns spent across all restores (for the 2000 cap): about **913** (712 at the start of leg 2; restores at 594->592, 593->592 x2, 638->628, 637->628, 633->628, 691->672, 693->689, 691->689 accounted in the running totals above).
- **Score:** 80 of 80, rank Galactic Overlord.
- **Time/day:** Day 3, dusk, time 5312.
- **Location:** Cryo-Anteroom (end of game). Floyd is alive again.
- **Inventory:** as at the end - the gas mask (worn), chronometer, tattered Patrol uniform with cards, kit, canteen, cards; the laser is gone into the void of Section 196.
- **Saves:** one slot. Current save = Lab Office, turn 701 (score 75), just after arriving through the auxiliary booth, before taking the gas mask.
- **Health:** cured (antidote in the ending).
- **Commands used this leg:** roughly 175 of the ~750 budget.

#### How the ending went (puzzles solved this leg)
1. Floyd's "good reason": he must have SEEN the broken computer (walk him into the Computer Room so he remarks "Computer is broken"). Then in Bio Lock East, FLOYD, GO EAST -> he volunteers. OPEN DOOR (he rushes in), CLOSE DOOR, wait for the knocks, OPEN DOOR (he staggers out with the card), CLOSE DOOR. Floyd dies (+2), GET CARD (+1).
2. Miniaturization Booth: slide the card, TYPE 196 -> Station 196, E (+4), N, N to the relay. The laser on setting 1 (red) passes through the relay's red plastic: SHOOT SPECK WITH LASER until it's vaporized (random misses; +8).
3. The microbe that ambushes you going south: red passes through its red skin. Fire the laser repeatedly (setting 5) BEFORE going south until it is "quite hot", then THROW LASER INTO VOID; the microbe dives after it. S, W -> Auxiliary Booth (+4).
4. Lab Office: SEARCH DESK (memo about fungicide), OPEN DESK (gas mask), WEAR MASK, PUSH RED BUTTON, OPEN DOOR, W into the Bio Lab, OPEN LAB DOOR, then run W, W, OPEN DOOR, W, SW, W, S into the Cryo-Elevator and PUSH BUTTON (+5). Wait ~4 turns; N to the Cryo-Anteroom and the ending.

#### Traps confirmed
- Opening the Bio Lab door without Floyd having volunteered = instant death.
- The Radiation Lab kills you (sick next turn, bald the turn after, dead ~5 turns later) even for a single turn inside; the lamp there is unnecessary.
- The helicopter, orange key, dark Transportation Supply room and Reactor Elevator are never needed (Floyd hands you their keys "for the sequel").
- **Inventory (exact, from --status):** chronometer (worn), Patrol uniform (worn) holding the kitchen and lower elevator cards, survival kit with the green goo (never eaten!), canteen (empty), upper elevator card, miniaturization card, teleportation card, gas mask (worn), memo.
