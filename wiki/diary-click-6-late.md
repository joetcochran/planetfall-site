# Round 6: click-6-late, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 6, 11 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the Tower Core checkpoint (turn 107, score 21)
- **Result:** Did not win. Where play ended: Alfie Control East, turn 403, with 40 points.
- **Commands:** 316, with no deaths

The diary below is `playtests/2026-09-11/2026-09-11-click-6-late.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest from a checkpoint: session `click-6-late`
**Who:** Claude (blind, mouse-only playtester)  **Date:** 2026-09-11  **Session:** `click-6-late` (`node scripts/playtest.mjs --session click-6-late --new --checkpoint tower-core --click`)

### Briefing
I am an Ensign of the Stellar Patrol whose ship blew up; I came down in a pod, climbed to a ruined castle and into a deserted complex, fished a key out of a crevice with a magnet, got a ladder from Storage West and bridged a rift, found three access cards in offices and used the upper elevator card to ride up to the Tower Core. The briefing was clear and concrete: it told me what I hold, what I left where (survival kit in Storage West), and gave a next goal (explore the tower, then before night return for the kit and find a bunk off the Rec Corridor).

### Attempt 1, turns 107-120: the top of the tower
I saved first (Save is free: it took no turn and a "38 restore (new)" button appeared, which is reassuring). Tower Core has four exits. Northeast is a Comm Room with two consoles written in a phonetic spelling ("Reeseev Staashun", "Malfunkshun in Sendeeng Kuulint Sistum"). Pushing "Mesij Plaabak" played the Feinstein's last transmission ending in an explosion: a good gut-punch and it explains the briefing. The screen asks for emergency help for a planet-wide plague. The send side has a funnel labelled "Kuulint Sistum Manyuuwul Oovuriid" (coolant system manual override), and the enunciator has seven coloured lights with GREEN flashing. My guess: pour some green liquid into the funnel to fix the transmitter. I remember a glass flask in the Tool Room, so liquids are a thing somewhere.

Southwest is the Observation Deck: I am on an island, and there is another island 20 km east. Up is a Helipad with a rusted helicopter; inside, "a complex control panel is closed and locked". The lock only offers "examine" ("I see nothing special about the lock"), and none of my items offer "unlock" or "put in". I carry a key, but the interface gives me no way to try it on this lock, which as a mouse player I take to mean "not this key, not now". I am leaving the tower for now.

### Attempt 1, turns 121-136: back down, a booth and a red door
The elevator would not go down at first: "Nothing happens. The slot beside the buttons stays dark." That line is a lovely hint; I slid the upper elevator card again ("Elevator enabled.") and pushed Down. The ride takes two "wait"s before "The elevator comes to a stop at the bottom of the shaft... The elevator door slides open." Fine, but I could not tell how long to wait.

In the Elevator Lobby, east is "Booth 2", with brown "1" and tan "3" buttons and a wide slot. It is a teleport booth: "Teleportaashun buux not aktivaatid." The shuttle card was refused ("Inkorekt awtharazaashun kard"). So there is a card I have not found yet. The red door south: pushing the red button made "The red door begins vibrating a bit", but after two waits it was still closed. I guess the red door is a second (lower) elevator whose car is locked elsewhere, or needs a card I lack. Leaving it; heading west to fetch my survival kit and to find a use for the kitchen card.

### Attempt 1, turns 137-155: supplies, the kitchen, a full canteen
West from Corridor Junction was an unlabelled "go west": a long walk ("You walk down the long, featureless hallway for a long time") to the Dorm Corridor, where my stomach growled and the game helpfully added "There is still goo in the survival kit you left in Storage West." That reminder is exactly what a checkpoint player needs. In Storage West the goo blobs only offered "examine" while the kit sat on the floor; once I took the kit, "eat (new)" appeared. I ate the brown goo, read the brochure (a cute self-referential joke) and dropped it.

South of the Mess Corridor is the Mess Hall with a canteen on a bench and a slotted door. The kitchen card opened it (+4, score 25). The "Hii Prooteen Likwid Dispensur" has an octagonal niche, and the canteen is octagonal; the "put in..." list flow ("14" to see the list, then "14 canteen") worked on the first try. Button: "The canteen fills almost to the brim with a brown liquid." I took it and closed it so it will not spill. I also got "You begin to feel weary", and a "sleep" button appeared in the button row, so bed is next.

### Attempt 1, turns 156-168: dorms and a combination door
I saved in Dorm B (a long room of bunks with a "bed: get in" option) and, since I was only "weary", scouted a little first. Dorm A (south of Rec Corridor) leads to SanFac A, a dry toilet room with nothing to do. West of Rec Corridor is the Rec Area: games, tapes ("a biography of a famous Double Fannucci champion"), and a heavy door north with a combination dial "set to 0", turnable 0-1000. The option "set to a number <value>" is clear, but I have no clue to the number yet, and guessing 1000 values by mouse is not an option. I will keep an eye out for a number. Now heading back to Dorm B to sleep before I collapse somewhere.

### Attempt 1, turns 169-177: a night in Dorm B
SanFac B, north of Dorm B, is another empty toilet room. I got in a bed ("the bed is soft and comfortable. You should be asleep in short order"), pressed "sleep" ("You'll probably be asleep before you know it"), which did nothing visible, then "wait", and I fell asleep: a surreal dream of throwing my scrub brush at Blather and both going over a waterfall, then "SEPTEM 7, 11344... You wake up feeling refreshed." The clock reset to 1680. My things "slipped to the floor beside you"; while still in the bed the floor items offered no "take", but after "get out of the bed" a "take all (new)" button appeared and gathered everything in one click. Smooth.

### Attempt 1, turns 178-192: morning sweep of the west end
Day two. I misclicked once: I meant "go east" in Rec Corridor but option 5 there is "go southwest, Plain Hall" (the number meant east back in Dorm B). Numbers are stable per room, not across rooms, and I carried the wrong habit over; my fault, but it happens easily when every room renumbers. So I used it to check the castle: the Courtyard's unlabelled "go west" is the West Wing, a rubble-choked dead end with a cliff view. Then Dorm D / SanFac D (north of Dorm Corridor) and Dorm C / SanFac C (south) are identical empty dorms. Unlabelled exits are a great "you have not been here" signal, and I am using them as my to-do list.

### Attempt 1, turns 193-209: fever, monitors, and a dark room
The long walk back east brought a double warning: hungry again, and "You notice that you feel a bit weak and slightly flushed, but you're not sure why." Diagnose: "You are a bit sick and feverish." Given the plague message on the Comm Room screen, that is ominous and means a clock is running. I drank the canteen's protein liquid ("satisfied your hunger") and kept the green goo for later.

Then I followed unlabelled exits. Admin Corridor South east is SanFac E (empty). Admin Corridor west is "Sistumz Moniturz": monitors show LIIBREREE, REEAKTURZ, LIIF SUPORT green, and PLANATEREE DEFENS, PLANATEREE KORS KUNTROOL, KUMUUNIKAASHUNZ and PRAJEKT KUNTROOL malfunctioning. A great status board; it tells me communications is one of the broken things (matches the Comm Room). Across the ladder, "Tranzportaashun Suplii" north is pitch black ("You might be eaten by a grue"), so I backed out; I need a light. East is the Plan Room with maps: this "Kalamontee Kompleks" (two installations joined by a long hall) and "Lawanda Kompleks" (two installations, one deep underground). I bet the shuttle card takes me to Lawanda, the island I saw from the tower.

### Attempt 1, turns 210-227: the mech wing
Back south to the Mech Corridors, following unlabelled exits. Storage East had an oil can on a shelf and a cardboard box holding a cracked fromitz board, B- and K-series megafuses and a good ninety-ohm bedistor: spare electronics, clearly for some repair later. I took the can and the whole box. Physical Plant (west) is a dim heat-and-ventilation hall with nothing to handle. Reactor Control (east of Mech Corridor) has a button that opens a "Reactor Elevator", which also refuses to move ("The slot beside the buttons stays dark"), so that is yet another missing card. A "dark stairway" also winds down from Reactor Control; after the grue warning I am not going down it blind. The diagram joke ("a special twelve-year course in ninth-order molecular physics") made me smile.

The carried list is getting long: with the box, its four parts are listed as separate carried lines, so Reactor Control shows 70+ numbered options. Picking an exit means scrolling past a wall of "examine / drop" lines for fuses.

### Attempt 1, turns 228-242: green coolant and a robot named Floyd
Mech Corridor South's unlabelled south exit is the Machine Shop: a chemical dispenser with "KUULINTS 1 - 4" in red, blue, green and yellow, "KATALISTS" gray/brown/black, and white "BAAS" and "ASID". Those are exactly the seven enunciator colours from the Comm Room, so the plan snapped into place: green coolant into the funnel. I went west to the Tool Room for the glass flask. Weight bit me: "Your load is too heavy. Dropping the canteen would make enough room." I love that the refusal names what to drop. I dropped the key and the empty canteen and took the flask. Back in the Machine Shop, the flask got a "put under spout (new)" option, and green gave "The flask fills with some green chemical fluid. The fluid gradually turns milky white." Milky white worried me a little, but I assume it is still the green coolant.

Then I could not pick the full flask back up ("Dropping the kitchen access card would make enough room"), so it is sitting under the spout for now. East is the Robot Shop, where "turn on" a slumped four-foot robot gave +2 (score 27) and a "faint hum"; one wait later: "Hi! I'm B-19-7, but to everyperson I'm called Floyd... Let's play Hider-and-Seeker you with me." Floyd has a rich option set (talk to, ask about..., listen to, salute). I also typed "options" once without the "--" flag; the game refused it without spending a turn.

### Attempt 1, turns 243-262: coolant delivered, and the light turns brown
Floyd, asked about himself: "Floyd is very good at Hider-and-Seeker. Also fixing things. Mostly Hider-and-Seeker." He follows me everywhere and fills the gaps with little bits of business (scrawling his name on the wall with a crayon; "Oh boy! Are we gonna try something dangerous now?" every time I press Save, which is a nice joke but also buries the "Ok." confirmation).

I dropped the cardboard box in the Machine Shop to free weight and took the full flask. Surprise in the Elevator Lobby: "The red door has opened since you were last here." So my earlier red-button press did work, just slowly, and nothing told me at the time. Behind it is the Lower Elevator, which also wants a card ("slot stays dark"). Up the upper elevator (card, Up, two waits) to the Comm Room, where the fluid now offered "pour into funnel-shaped hole (new)". Result: "The lights on the enunciator panel blink rapidly and all go off except one, a brown light." So it is a sequence: brown is KATALIST 2 at the Machine Shop. That is a round trip of roughly 12 moves plus two elevator waits each way. The puzzle logic is great; the legwork per step is heavy.

### Attempt 1, turns 263-290: the help message goes out
(Correction on the Save quip: the "Ok." does appear, just after Floyd's line with a blank between; I had cut my output short.) The trip back down was mechanical and uneventful, apart from Floyd telling me "the latest rumors about Dr. Fizpick" and "fond memories about his robotic friend Lazarus". At the Machine Shop: flask under spout, brown button ("fills with some brown chemical fluid... turns milky white"), take, and the long walk back up. Pouring it in: "The lights on the enunciator panel blink rapidly and then go dark. The coolant system warning light goes off, and another flashes, indicating that the help message is now being sent." +6, score 33. A proper milestone: the planet's distress call is transmitting again. The two-step sequence was fair and the colour matching was satisfying; the only real cost was about 28 turns of walking and elevator-waiting for two pours.

### Attempt 1, turns 291-309: what now?
With the transmitter fixed I took stock. Open leads: two dark places (Transportation Supply, and the "dark stairway" down from Reactor Control), a combination door (0-1000), a teleport booth and two elevators (Lower, Reactor) that each want a card I do not have, and the locked helicopter controls. No new message appeared on the Comm Room screen. I rode down and rechecked the two offices across the rift: both desks empty. Floyd lags a turn behind when I cross the ladder ("Floyd bounds into the room. 'Floyd here now!'"), and after I tried "look inside Floyd" (he giggles, "You're tickling Floyd!") he announced "Floyd going exploring. See you later." and wandered off. I am now fairly stuck on "what is the next objective": the game gave me a strong goal for the transmitter via colours, but nothing currently points at a light source or a missing card. My plan: fetch the laser from the Tool Room and see what new options it gives me.

### Attempt 1, turns 310-333: a laser, but not a lamp
I walked the long way down to the Tool Room (misclicking into the Machine Shop once because I chained "south" one time too many; harmless). I dropped the flask and picked up the "Akmee Portabul Laazur" (dial with settings 1-6, currently 5, holding an old battery). Carrying it added a "shoot (new)" option; firing it into empty air gave "The laser emits a narrow blue beam of light." and, surprisingly, +2 (score 35). Hoping a beam of light might count as light, I walked all the way back over the rift into the pitch-black Transportation Supply and fired it there: same message, still dark. So the laser is not a lamp. I left before anything ate me. The laser has no "shoot at..." target option anywhere yet, so I cannot aim it at things like the helicopter lock unless the target offers it.

### Attempt 1, turns 334-347: the laser has no target
I carried the laser all the way up to the helicopter hoping for "shoot at lock". The only new option was "shoot floyd" (no, thank you). The lock still says "I see nothing special about the lock." So the laser can only be pointed at characters as far as the menu goes. Talking to Floyd just gets "Hi!" and a bounce. This is my first real "stuck" spell: I have spent about 40 turns on hypotheses (light from the laser, laser vs lock) that each needed a long walk to test. My next ideas are all cheap-looking options I skipped: "move rubble" (Courtyard, West Wing, Admin Corridor), "play games" in the Rec Area (maybe it reveals the combination), and "examine devices" in the Robot Shop.

### Attempt 1, turns 348-368: cheap options, no payoff
Down again and west. "move rubble" in the Admin Corridor: "Not bloody likely." Diagnose: still "a bit sick and feverish", rested and fed. In the Rec Area, "play games" had me playing with Floyd "for several centichrons until you drop to the floor, exhausted" (sweet, but no clue), and the games are "Chess, Cribbage, Galactic Overlord, Double Fannucci...". The combination is still unknown. Floyd's idle chatter is lovely flavour (pencil sharpening, ballads out of key, bruised knee, his friend Lazarus the medical robot) but it has not yet pointed me anywhere. Running out of cheap ideas; remaining are "examine" on scenery I skipped (Systems Monitors equipment, Robot Shop devices, Physical Plant catwalks).

### Attempt 1, turns 369-384: Floyd's pocket
The breakthrough came from the "ask about..." list. Asking Floyd about the oil can: "Floyd doesn't know much about that." Asking about the shuttle access card: "Floyd's eyes light up. 'Cards are neat! Floyd likes cards.' He pats one of his compartments and giggles." That was the hint I needed. "search Floyd" just gets the tickle routine (and he wanders off exploring). I got hungry and ate the green goo ("yummy lima beans"). When Floyd rejoined me in the Dorm Corridor, I saved, then did the mean thing: "turn off Floyd" ("shocked by this betrayal from his new-found friend, whimpers and keels over"), "search Floyd": "you find and take a magnetic-striped card embossed 'Loowur Elavaatur Akses Kard.'" +1, score 36. Turning him back on: "Why you turn Floyd off?" he asks accusingly. I felt bad. The hint-to-solution chain was fair, and the "ask about" list being limited to what I carry kept it discoverable by clicking.

### Attempt 1, turns 385-399: the shuttle, but after hours
The lower elevator card went into the Lower Elevator slot ("Elevator enabled."); Down plus three waits brought me to a concrete Waiting Area and then "Kalamontee Platform" with a sign "Shutul Platform -- Kalamontee Staashun" (+4, score 40). The shuttle car "Alfie" has control cabins at both ends, each with a slot, a lever (+ / centre / -) and a digital display reading 0. The east cabin looks down a tunnel with rails, the west one at a concrete wall, so east is the driving end. I saved and slid the shuttle card: "A recorded voice explains that using the shuttle car during the evening hours requires special authorization." Time 6388. So the clock matters: I need to sleep and come back in the morning. That is a fair rule, but nothing before this told me the working hours, and I have no idea what time "evening" starts on this planet's clock. Plan for the evening: recover the canteen from the Tool Room, refill it at the kitchen, sleep in a dorm, and be back at the platform early.

### Attempt 1, turns 400-403: stopping at the shuttle
The chronometer only restates the number ("the current time is 6428") plus a sweet engraving from Mom and Dad; it does not say whether that is evening. Back in the east cabin, pushing the lever without authorization: "Shuttle controls are not currently activated." Clear. I am past my turn budget (107 to 403), and reaching the morning would take roughly 40 more waits to get tired, a sleep, and a walk back, so I am stopping here, parked in the shuttle cab with Floyd. Final status also shows a small oddity: "The laser contains: A laser setting dial, An old battery", and the carried list offers "laser setting dial: drop", as if the dial were a loose item.

### Friction log
| Turn | Where | What happened | Kind |
|---|---|---|---|
| 107 | Tower Core | Save took no turn and immediately added a Restore button | Positive |
| 109 | Comm Room | "Mesij Plaabak" playback of the Feinstein's last words is a strong story beat | Positive |
| 113 | Comm Room | Enunciator + funnel + coolant sign add up to a readable puzzle setup (green light flashing) | Positive |
| 119 | Helicopter | Lock offers only "examine" -> "I see nothing special about the lock"; no way to try my key on it | Unhelpful response |
| 124 | Upper Elevator | "The slot beside the buttons stays dark" told me exactly what to do | Positive |
| 127 | Upper Elevator | Had to guess how many "wait"s the ride takes; no progress text on the first wait | Pacing |
| 132 | Booth 2 | Card slot shown on every card with "slide through slot"; wrong card gives a clear refusal | Positive |
| 134 | Elevator Lobby | "The red door begins vibrating a bit" then nothing after two waits; unclear if I did something or not | Confusing |
| 138 | Dorm Corridor | Hunger warning also reminds me where I left the goo | Positive |
| 140 | Storage West | Goo in a kit on the floor offers only "examine"; "eat" appears only after taking the kit | Confusing |
| 146 | Mess Hall | "sleep" button appears when weary; nice cue | Positive |
| 151 | Kitchen | "put in..." list flow (14, then "14 canteen") is clear | Positive |
| 154 | Kitchen | Taking a full canteen lists "quantity of protein-rich liquid" as a separate carried item with "drink", then it vanishes from the list once I close it | Silent state change |
| 165 | Rec Area | Combination dial offers "set to a number <value>" with range 0-1000: clear affordance, no clue yet | Puzzle (stuck) |
| 174 | Dorm B | "sleep" button in bed only says "You'll probably be asleep before you know it"; had to "wait" to actually sleep | Confusing |
| 175 | Dorm B | Items dropped during sleep have no "take" while I am in bed; fine after getting out, "take all" collected everything | Positive |
| 179 | Rec Corridor | Misclick: same number means different exits in adjacent rooms, I pressed 5 expecting "east" | Confusing |
| 181 | Courtyard | Unlabelled exits ("go west" with no room name) act as an unexplored-exit marker | Positive |
| 192 | Dorm C/D | Four identical dorm+sanfac pairs with nothing in them: a lot of clicks for no content | Pacing |
| 195 | Corridor Junction | Sickness creeps in via an ambient line; diagnose confirms "a bit sick and feverish" | Positive |
| 203 | Systems Monitors | Monitor room is a clear status board of what is broken | Positive |
| 207 | Transportation Supply | Pitch black; no light source in my inventory and nothing on screen hints where one is | Puzzle (stuck) |
| 218 | Storage East | Taking the box lists its four contents as separate carried items with their own drop options; the option list balloons past 70 | List too long |
| 225 | Reactor Elevator | Second card-locked elevator; "slot stays dark" is again a clear hint | Positive |
| 222 | Reactor Control | "dark stairway winds downward": no light source yet, so another dark route I cannot take | Puzzle (stuck) |
| 232 | Tool Room | "Your load is too heavy. Dropping the canteen would make enough room." names exactly what to drop | Positive |
| 237 | Machine Shop | Dispenser colours match the Comm Room enunciator; "put under spout (new)" appears on the flask | Positive |
| 238 | Machine Shop | "The fluid gradually turns milky white" after pushing green: unclear whether I still have green coolant | Confusing |
| 238 | Machine Shop | Full flask is heavier; can no longer carry it with my load, so I have to juggle cards/box | Pacing |
| 242 | Robot Shop | Floyd wakes up with a funny, characterful speech; +2 for turning him on | Positive |
| 251 | Elevator Lobby | "The red door has opened since you were last here" - the delayed effect of my button push 115 turns earlier; good that it is reported, but at the time nothing told me to come back | Silent state change |
| 261 | Comm Room | "pour into funnel-shaped hole (new)" appears exactly when I carry liquid here | Positive |
| 262 | Comm Room | Enunciator moves on to brown: a multi-step colour sequence, each step a ~15-turn round trip | Pacing |
| 262 | Comm Room | Floyd's Save quip is printed before the "Ok." confirmation, so the save result is easy to miss (not lost; see turns 263-290) | Text bug |
| 290 | Comm Room | Second pour (brown) completes the repair: clear success text and +6 | Positive |
| 289 | Upper Elevator | Every elevator ride needs card + button + two blind waits (4 turns) even though I enabled it minutes ago | Pacing |
| 305 | Large Office | After the comm repair, nothing on screen points to the next objective; four locked/dark leads, no hint for any | Puzzle (stuck) |
| 309 | Large Office | "look inside Floyd" gives a funny tickle response | Positive |
| 322 | Tool Room | "shoot laser" into the air gives +2 with no explanation of what I achieved | Confusing |
| 332 | Transportation Supply | Firing a beam "of light" in a dark room does not light it; plausible, but a line saying so would save a trip | Unhelpful response |
| 345 | Helicopter | Laser offers "shoot floyd" but no way to aim at the lock or controls; the only target a mouse player gets is the friendly robot | Action not on list |
| 346 | Helicopter | "talk to Floyd" -> just "Hi!"; no conversational hints | Unhelpful response |
| 359 | Admin Corridor | "move rubble" exists as an option in three rooms; all it ever says is "Not bloody likely." | Dead option |
| 367 | Rec Area | "play games" with Floyd: charming, no information | Positive |
| 370 | Dorm/Rec | "ask Floyd about shuttle access card" -> he pats a compartment: a fair, clickable hint | Positive |
| 371 | Rec Area | "search Floyd" while on only tickles him and he wanders off for ~8 turns | Pacing |
| 382 | Dorm Corridor | Turn off + search Floyd yields the lower elevator card (+1) | Positive |
| 394 | Kalamontee Platform | Reaching the shuttle platform gives +4 and a clear sign | Positive |
| 397 | Alfie Control East | Shuttle refuses in "evening hours"; the time shown on the status line (6388) has no day/evening meaning for me | Confusing |
| 400 | Alfie Control West | Chronometer gives only the raw number; no day/evening cue | Unhelpful response |
| 403 | Alfie Control East | "Shuttle controls are not currently activated." clear refusal | Positive |
| 403 | anywhere | Laser's dial is listed as a carried item inside the laser, with its own "drop" option | Text bug |

### Report
I played from turn 107 to turn 403 (296 game turns) and went from 21 to 40 points. Milestones: I explored the tower top (Comm Room, Observation Deck, Helipad, rusted helicopter); filled the canteen at the kitchen (+4); slept through a night in Dorm B; found the mech wing (Storage East, Physical Plant, Reactor Control, Machine Shop, Robot Shop); switched on Floyd (+2); fixed the communications coolant with green then brown chemicals from the Machine Shop, so the distress call is transmitting again (+6); fired the laser (+2); got the lower elevator card out of Floyd's compartment (+1); and rode down to the Kalamontee shuttle platform (+4). I stopped in the shuttle's control cab because the shuttle will not run "during the evening hours". Rooms I never got into: Transportation Supply and the stairway below Reactor Control (both dark), the combination door in the Rec Area, the Reactor Elevator and teleport Booth 2 (no card), and the helicopter's locked controls.

What worked in the click interface: options that appear only when they make sense ("put under spout" on the flask in the Machine Shop, "pour into funnel-shaped hole" on liquid in the Comm Room, "slide through slot" on every card near a slot) quietly teach the verbs, and the enunciator/dispenser colour match was a satisfying bit of deduction. Refusal messages are very good: "Dropping the canteen would make enough room", "The slot beside the buttons stays dark", "Inkorekt awtharazaashun kard". Unlabelled exits work as a list of places I have not been. The "ask about..." list, built from what I carry, turned out to be the key to the Floyd card puzzle, and Floyd himself is delightful. Save and Restore are free and always one click away.

What still hurts: (1) Legwork. Each coolant pour was a ~15-turn round trip including four elevator turns (card, button, two blind waits), and the long hallway plus the ladder make most errands 8-12 clicks. (2) Stuck spells with no direction. After the transmitter repair nothing pointed anywhere, and I spent about 60 turns testing ideas (laser as light, laser on the helicopter lock, move rubble, play games) before the "ask about" hint paid off. (3) The option list is long. With a box of parts or the laser (which adds dial and battery lines) the list goes past 70-80 entries, and numbers change from room to room, which caused one misclick. (4) Hidden or delayed state. The red door opened long after I pushed the button, with no cue at the time; the shuttle's "evening hours" rule arrives with no way to read the clock as day or evening. (5) Dead options such as "move rubble" in three rooms ("Not bloody likely").

The briefing was enough to pick up the thread: it told me exactly where my survival kit was, what the cards had opened, and that I needed food and a bed before night. The in-game hunger line "There is still goo in the survival kit you left in Storage West" backed it up nicely. The only thing I missed was a sense of the clock (how "time 7321" relates to day and night), which mattered later for sleep and the shuttle.

The three changes I would make first: (a) Cut the elevator friction: once a car is enabled, keep it enabled for a while, and print arrival on the same turn or say "(the ride takes a couple of turns)" so the waits are not blind. (b) Collapse container contents and fixed parts in the carried list (show "cardboard box (4 items)" and hide "laser setting dial: drop"), and keep exits and the common buttons at fixed numbers across rooms. (c) Give the clock a human reading on the status line or on "examine chronometer" (morning / afternoon / evening), and have Floyd or the room text nudge the player after a big milestone, e.g. a hint toward "ask about" when the player has been stuck for a while.

### Verdict
This checkpoint plays well by mouse. The puzzles I solved (coolant colours, the card in Floyd) were fair and discoverable from on-screen options alone, and the feedback messages are the best part of the interface. The main costs are walking and elevator overhead, very long option lists, and a couple of long stuck spells where nothing pointed to the next goal.
