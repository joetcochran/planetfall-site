# Round 5: click-5-late, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 5, 10 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the Tower Core checkpoint (turn 107, score 21)
- **Result:** Did not win. Where play ended: Repair Room, turn 355, with 42 points.
- **Commands:** 261, with no deaths

The diary below is `playtests/2026-09-10/2026-09-10-click-5-late.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest from a checkpoint: session `click-5-late`
**Who:** Claude (blind click-only playtester agent) **Date:** 2026-09-10  **Session:** `click-5-late` (`node scripts/playtest.mjs --session click-5-late --new --checkpoint tower-core --click`)

### Briefing
The briefing told me I am a Stellar Patrol ensign whose ship blew up this morning; I crossed a rift with a ladder, found three access cards in offices, and rode the upper elevator to the Tower Core, where I now stand at turn 107 with score 21. It also warned me that before night I must fetch the survival kit (left in Storage West) and sleep in a dorm off the Rec Corridor. It was clear and gave me concrete goals; the list of places visited and items left behind is useful as a map-in-words.

### Attempt 1, turns 107-122: the top of the tower
I saved first (option 10; it did not cost a turn and a "38 restore (new)" button appeared, which is reassuring). The Tower Core has four exits, so I did them in order. Northeast is a Comm Room with two consoles written in a phonetic spelling I had to sound out: the screen reads "Tuu enee ship uv xe Sekund Galaktik Yuunyun: Planitwiid plaag haz struk entiir popyuulaashun" -- so a plague wiped out the people here, which explains the empty complex. Pushing "Mesij Plaabak" played my own ship's last transmission, cut off by the explosion. Nice, grim beat.

The send console has a "Malfunkshun in Sendeeng Kuulint Sistum" sign, an enunciator with seven coloured lights (only green flashing) and a funnel-shaped hole: examining it says "Anything poured into it would run down into the machinery below." So I need some liquid, probably green-coded, to fix the coolant and send a message. I remember a glass flask in the Tool Room.

Southwest is an Observation Deck: I am on an island, with a second island 20 km east. Up is a Helipad with a rusted helicopter; inside, the controls are "covered and locked". My key offers only examine/drop, and the lock only examine, so I read that as "not this key" rather than guessing.

### Attempt 1, turns 123-143: back down, and two more locked doors
Going down, "push down" did nothing: "The slot beside the buttons stays dark." That reply told me exactly what to do -- slide the upper card again -- and then "Elevator enabled", press down, wait. The first "go south / out" while still moving answered "The door is closed", which is fair; two waits later the door opened.

In the Elevator Lobby I finally looked east: "Booth 2", a teleport booth with a brown "1" and tan "3" button. Pushing 3: "Teleportaashun buux not aktivaatid." My shuttle card is refused ("Inkorekt awtharazaashun kard"), so there is a teleport card somewhere. The red button calls a Lower Elevator (it takes about three turns to arrive, announced by ">> The door at the south end of the room slides open"), but my upper card is refused there too. So the cards I have do not open these; I need a lower-elevator card and a teleport card. My open leads are: the flask in the Tool Room (for the coolant funnel), the kitchen card, and the shuttle card.

### Attempt 1, turns 144-162: food, a canteen and the kitchen
Walking west from the Corridor Junction the game warned me twice in a row: first "A growl from your stomach warns that you're getting pretty hungry and thirsty" with the helpful follow-up ">> There is still goo in the survival kit you left in Storage West", then at the Dorm Corridor "You begin to feel weary." A "sleep" button appeared in the Buttons row at that moment -- nice, it tells me sleeping is now possible.

In Storage West the goo blobs inside the kit only offered "examine" while the kit sat on the floor; once I took the kit, "eat (new)" appeared on each blob. Brown goo tasted like "Nebulan fungus pudding" and quenched thirst. I took the towel too, on a hunch.

The Mess Hall south of the corridor had a canteen on a bench and a slotted door; the kitchen card slid through ("The kitchen door quietly slides open") and entering the Kitchen gave +4 (score 25). The "Hii Prooteen Likwid Dispensur" has an octagonal niche and the canteen is octagonal, so: open canteen, "put in…" dispenser (answer "14 canteen"), push button, "The canteen fills almost to the brim with a brown liquid." The "put in…" list flow worked well once I saw it. I saved here.

### Attempt 1, turns 163-181: finding a bunk and a strange dream
I checked Dorm D and Dorm C off the Dorm Corridor first; each is a bunk room with an empty SanFac beyond it ("You marvel at how little the millenia and cultural gulfs have changed toilet bowl design"). At the Rec Corridor the sleep button changed its label to "sleep (very tired)" -- a great low-key status signal, better than a wall of text. In Dorm B I saved, used "get in" on the bed, pressed sleep, waited one turn, and dreamt of throwing my scrub brush at someone called Blather. I woke on "SEPTEM 7, 11344" with the time reset to 1680 and "the things you were carrying slipped to the floor beside you." The "take all" button appeared right away and picked everything back up in one click. The dream feels like it might be a hint (a brush, a cliff, a waterfall), or just colour.

### Attempt 1, turns 182-205: day two, a combination lock and a dead-end wing
With the new day I swept the west end. Dorm A/B are more bunks. West of the Rec Corridor is the Rec Area: games, tapes, and a heavy north door with a combination dial, "set to a number <value>", range 0 to 1000. I have no number for it. I read the brochure hoping for one; it is an in-joke advert, nothing more. The games and tapes examine into flavour ("Double Fannucci") but no code. The Courtyard's west opening leads to a West Wing of rubble ("move rubble": "A valiant attempt."), a pure dead end.

Walking back east the game warned I was hungry again after only about 25 turns awake. I opened the canteen ("reveals a quantity of protein-rich liquid"), a "drink (new)" option appeared on the liquid, and one drink satisfied both hunger and thirst but emptied it. I will refill at the kitchen when I next pass. Next stop: the Tool Room flask and the Mech corridors, where I have not yet looked for side exits.

### Attempt 1, turns 206-223: the Mech corridors, and a weight limit
Mech Corridor North had unnamed east and west exits -- I have learned that an exit without a room name after it means I have never been there, which is a lovely quiet affordance. East is Storage East: an oil can on a shelf and a cardboard box of electronics (a cracked fromitz board, B- and K-series megafuses, a ninety-ohm bedistor). I took the oil can; the box was refused: "Your load is too heavy. Dropping the survival kit would make enough room." I dropped the brochure and the (now spent) key, and it still refused, this time suggesting the towel. The message naming a specific item to drop is really helpful, but it made me realise I am carrying a lot of junk and will have to plan. I left the box where it is.

West is the Physical Plant (too complicated to operate). Off the Mech Corridor, Reactor Control has a dark stairway down and a button that opens a Reactor Elevator -- but again "The slot beside the buttons stays dark" and my shuttle card is refused. That is now three card-locked lifts (lower elevator, teleport booth, reactor elevator). I am heading for the three unexplored doors at Mech Corridor South.

### Attempt 1, turns 224-238: coolant, and a robot friend
South of Mech Corridor South is the Machine Shop with a chemical dispenser: "KUULINTS 1 - 4" in red, blue, green, yellow; "KATALISTS 1 - 3" in gray, brown, black; and white BAAS / ASID buttons. Those are exactly the seven enunciator colours from the Comm Room, and green was the one flashing. That connection felt great. I fetched the glass flask from the Tool Room next door (it fit, no weight complaint), and in the Machine Shop every carried container grew a "put under spout" option. Flask under spout, green button: "The flask fills with some green chemical fluid. The fluid gradually turns milky white." The colour change worries me a little -- is it still the green coolant? -- but it is the only green I can get.

East of the Machine Shop, the Robot Shop has one intact robot. "turn on" gave "Nothing happens. Then again, you notice a faint hum" and +2 (27). One wait later: "Hi! I'm B-19-7, but to everyperson I'm called Floyd ... Let's play Hider-and-Seeker you with me." Charming. At first I thought Floyd had vanished from the option list: the room's objects section disappeared and he is listed under a new "Characters:" heading at the very bottom, below all fourteen of my carried items. Talking to him just gets "Hi!" and a bounce.

### Attempt 1, turns 239-268: the coolant relay
Floyd tagged along (">> Floyd follows you." on every move, plus a stream of ambient chatter: an out-of-key ballad, crayon graffiti, a pencil-sharpening story). He is good company; the chatter never blocks anything. Back up the tower, the flask of (now milky) fluid had a new option, "pour into funnel-shaped hole", right on the fluid's row. Result: "The liquid disappears into the hole. The lights on the enunciator panel blink rapidly and all go off except one, a brown light." So it is a sequence, and the next ingredient is the brown catalyst. No points for step one.

The round trip from Comm Room to Machine Shop is about 14 clicks (tower, elevator card, down, three waits, lobby, junction, three corridors). I did it and filled the flask with brown ("gradually turns milky white" again, so that message is just how the chemicals look). Now heading back. If this sequence has many steps the legwork will add up.

### Attempt 1, turns 269-288: message sent, and a card from Floyd
The trip back was uneventful (Floyd briefly lagged behind and then "bounds into the room. 'Floyd here now!'"). Pouring the brown catalyst: "The lights on the enunciator panel blink rapidly and then go dark. The coolant system warning light goes off, and another flashes, indicating that the help message is now being sent." Score 27 -> 33. Two ingredients was a fair length for this.

Then I looked at Floyd's option row again. "search" and "look inside" both made him giggle: "You're tickling Floyd!" The row also offers "turn off" -- with a robot that tickles, turning him off and then searching seemed a natural experiment, if a mean one. "Floyd, shocked by this betrayal from his new-found friend, whimpers and keels over." Search: "In one of the robot's compartments you find and take a magnetic-striped card embossed 'Loowur Elavaatur Akses Kard.'" (+1, 34). I turned him back on at once ("Why you turn Floyd off?" he asks accusingly). I felt a bit guilty, which I think is the point. Now the Lower Elevator is open to me.

### Attempt 1, turns 289-317: down to the shuttle
Down the upper elevator, across the lobby, into the Lower Elevator: the new card was accepted ("Elevator enabled"), and three waits later I stepped out onto a concrete Waiting Area that continues east to the "Shutul Platform -- Kalamontee Staashun" (+4, score 38). A shuttle car, Alfie, waits with its door open; its east end is a control cabin with a slot, a +/- lever and a speed display. I saved, slid the shuttle card ("Shuttle controls activated") and pushed the lever up. The car starts moving and gains 5 per turn; a trackside sign says "Limit 45." I let it reach 40 and pulled the lever back to the centre, where it holds speed ("The display still reads 40"). I have no idea how long the tunnel is, so I will watch for signs and brake when told.

A small oddity: the lower elevator card grew a "show to floyd" option out in the Waiting Area. I did not try it.

### Attempt 1, turns 318-336: the shuttle ride, and a crash
I cruised at 40 and waited. At turn 321 "The tunnel levels out and begins to slope upward. A sign flashes by which reads 'Hafwaa Mark -- Beegin Deeseluraashun.'" I was two turns slow to react (the line arrived inside a batch of waits), then pulled the lever to "-". The car shed 5 per turn and passed red-lit signs reading "15", "10", then crept to a halt in the tunnel at 0 -- "the lever pops back to the central position" -- short of the station. So I had braked too early after all, or the signs were speed limits for the approach. I pushed "+" again: 5, then 10, and "The shuttle car is approaching a brightly-lit area ... a shuttle station." I pulled to centre, thinking that would hold 10 and I would brake next turn -- but it was already too late: "The shuttle car rumbles through the station and smashes into the wall at the far end ... Both you and the shuttle car produce unhealthy crunching sounds." I survived. Diagnose says "You are a bit sick and feverish" -- which I suspect is not the crash but the plague the message on the Comm Room screen talked about, which is alarming.

I learned the rule too late: the red-lit numbers are the speed you should be under at that point, and you need to be nearly stopped as the station comes into view. The mechanic is fair, but the braking cue ("Beegin Deeseluraashun") and the arrival message both come as one-line ticks that are easy to lose in a run of waits; one turn of lag is fatal. I have a save from before the ride, but I am near my turn budget, so I will press on rather than replay it.

### Attempt 1, turns 337-355: Lawanda, medicine, and Floyd's grief
Stepping out of the wrecked car onto "Shutul Platform -- Lawanda Staashun" still scored +4 (42), so the crash cost me nothing obvious. Up a dead escalator, a Fork, then Systems Corridor West. Northwest is an Infirmary with a red spool ("Simptumz uv Xe Dizeez") and a bottle labelled "Dizeez supreshun medisin -- eksperimentul". Given my fever I saved, opened it and ate the medicine ("extremely bitter"). Diagnose afterwards still said "a bit sick and feverish", so I cannot tell whether it did anything. While I was there Floyd found the rusted breast plate of his friend Lazarus, "begins sobbing quietly, awkwardly excuses himself, and runs out of the room." A genuinely affecting moment, delivered entirely as an ambient tick.

North of the corridor, the Repair Room has a dead robot (Achilles, whom Floyd "never liked much") and a robot-sized doorway. "go north": "a bit too small for you". The doorway row offered "show to floyd"; that sent him in, and he came back with "Nothing else interesting inside. Just a shiny fromitz board." I remember a cracked fromitz board in Storage East, so this is surely the replacement part. A "shiny seventeen-centimeter fromitz board: examine" row appeared -- but clicking it answered "You can't see any shiny seventeen-centimeter fromitz board here", and the same turn Floyd announced "Floyd going exploring. See you later" and left, taking his row with him. I found no way to ask him to fetch the board. That is where my turn budget ran out.

### Friction log
| Turn | Where | What happened | Kind |
|---|---|---|---|
| 107 | Tower Core | Save is a button, costs no turn, and Restore appears as "(new)" | Positive |
| 109 | Comm Room | Phonetic alien spelling on the screen is readable and a good clue delivery | Positive |
| 111 | Comm Room | Examining the funnel says "Anything poured into it would run down into the machinery" -- a clear hint that I need a liquid | Positive |
| 121 | Helicopter | Lock examine gives only "I see nothing special"; carried key has no "unlock" option, so I cannot even try it -- fine if intended, but I cannot tell "wrong key" from "no such action" | Confusing |
| 126 | Upper Elevator | "Nothing happens. The slot beside the buttons stays dark." -- a refusal that tells me what to do next | Positive |
| 129 | Upper Elevator | Elevator travel takes a few waits; exit option is shown while the door is shut ("The door is closed") | Pacing |
| 138 | Elevator Lobby | Red door "begins vibrating a bit", then opens two turns later with a ">>" line -- clear cause and effect | Positive |
| 143 | Lower Elevator | Wrong card gives a consistent "Inkorekt awtharazaashun kard" message; cheap to test each card | Positive |
| 145 | Corridor Junction | Hunger warning also reminds me where the food is ("still goo in the survival kit you left in Storage West") | Positive |
| 146 | Dorm Corridor | "sleep" button appears in the Buttons row as soon as I get weary | Positive |
| 148 | Storage West | Goo inside a kit on the floor offers only "examine", no "eat" or "take"; I had to guess to pick up the kit first | Confusing |
| 156 | Kitchen | Entering scores +4 but nothing says so; I only noticed from the status line | Silent state change |
| 159 | Kitchen | "put in…" list then "14 canteen" worked cleanly; octagonal canteen/niche is a fair visual rhyme | Positive |
| 175 | Rec Corridor | Sleep button label escalates to "sleep (very tired)" | Positive |
| 178 | Dorm B | "sleep" in bed says "You'll probably be asleep before you know it" and needs an extra wait to actually sleep; one extra click | Pacing |
| 180 | Dorm B | Inventory spilled on waking; "take all" button made recovery one click | Positive |
| 170 | Dorm C / D | Four near-identical dorm and SanFac rooms with nothing in them; a lot of clicks for nothing | Pacing |
| 187 | Rec Area | Combination dial with a "<value>" slot is discoverable and the range (0-1000) is stated when examined | Positive |
| 190 | Rec Area | No clue yet for the combination; brochure is a joke. Parked | Puzzle (stuck) |
| 196 | West Wing | Whole room is a dead end whose only verb, "move rubble", just says "A valiant attempt." | Dead option |
| 202 | Corridor Junction | Hunger returns quickly after waking; the reminder names the fix ("The goo in your survival kit would take care of both") | Positive |
| 203 | Corridor Junction | Opening the canteen surfaces the liquid as its own row with "drink (new)" -- easy to find | Positive |
| 206 | Mech Corridor North | Exits without a room name mark unvisited places -- works as a to-do list | Positive |
| 208 | Storage East | "Your load is too heavy. Dropping the survival kit would make enough room." names a concrete fix | Positive |
| 210 | Storage East | After dropping two light items the suggestion changes to the towel; there is no weight readout, so inventory planning is guesswork | Confusing |
| 219 | Reactor Elevator | Third card-locked lift in a row; I cannot tell which card each wants | Puzzle (stuck) |
| 224 | Machine Shop | Dispenser colours match the Comm Room enunciator; the clue chain is readable without a parser | Positive |
| 228 | Machine Shop | Carried containers gain "put under spout" in this room only -- exactly the verb I needed | Positive |
| 230 | Machine Shop | Green fluid "gradually turns milky white"; I cannot tell whether it is still the right coolant | Confusing |
| 235 | Robot Shop | Turning on the robot scored +2 silently (seen only in the status line) | Silent state change |
| 237 | Robot Shop | Floyd is listed under "Characters:" at the very bottom, after 14 carried items; the room section vanished so he looked unclickable at first | List too long |
| 238 | Robot Shop | "talk to Floyd" gives only a stock "Hi!"; no topics to pick | Unhelpful response |
| 251 | Comm Room | "pour into funnel-shaped hole" appears on the fluid row only in this room -- no guessing needed | Positive |
| 252 | Comm Room | Enunciator switches to brown: clear next-step signal, even with no points | Positive |
| 255 | Upper Elevator | Every elevator trip needs slide card + push + three waits; the card slide is required each time | Pacing |
| 260 | Mech corridors | ~14 clicks per Comm Room <-> Machine Shop round trip for a multi-step chemical sequence | Pacing |
| 267 | Machine Shop | Floyd's ambient lines add life and never get in the way | Positive |
| 282 | Comm Room | Coolant fixed and help message sent, +6; the result text explains exactly what changed | Positive |
| 283 | Comm Room | "search Floyd" while he is on gives a tickle joke that hints at hidden compartments | Positive |
| 286 | Comm Room | Turn off + search Floyd yields the lower elevator card. The option row made this findable, but only because "turn off" sat on every character row; it felt like brute-forcing the verb list | Confusing |
| 288 | Comm Room | Clicking Save printed a Floyd ambient line before "Ok." -- looks like the world ticked, though the turn counter did not move | Text bug |
| 303 | Waiting Area | Lower elevator card suddenly offers "show to floyd"; unclear why this one card gets it | Confusing |
| 304 | Kalamontee Platform | Reaching the shuttle platform scored +4 | Positive |
| 309 | Alfie Control East | Lever push/pull + a speed readout that ticks each turn is fully playable by clicks | Positive |
| 311 | Alfie Control East | "You pass a sign which says 'Limit 45.'" -- fair warning delivered in the tick text | Positive |
| 321 | Alfie Control East | Halfway/decelerate sign arrives as a single tick line; easy to miss while clicking wait | Pacing |
| 332 | Alfie Control East | Braked to 0 in the tunnel short of the station; nothing tells you how far the station is | Puzzle (stuck) |
| 335 | Alfie Control East | "approaching a brightly-lit area" comes one turn before the crash at speed 10; no margin to react with a single click | Confusing |
| 336 | Alfie Control East | Diagnose: "a bit sick and feverish" appears without any earlier warning I noticed | Silent state change |
| 339 | Lawanda Platform | Arrival still scored +4 after the crash | Positive |
| 345 | Infirmary | Floyd finding Lazarus's breast plate is a strong story beat, well delivered | Positive |
| 350 | Infirmary | Ate the experimental medicine; diagnose unchanged, so no feedback whether it helped | Unhelpful response |
| 352 | Repair Room | Scenery row reads "machin" (truncated "machine") | Text bug |
| 354 | Repair Room | "show to floyd" on the small doorway is a good click-native way to send him in | Positive |
| 355 | Repair Room | Listed "shiny ... fromitz board: examine" answers "You can't see any ... here" | Dead option |
| 355 | Repair Room | No option to ask Floyd to bring the board out; then he wandered off ("Floyd going exploring") and his row vanished | Action not on list |

### Report
I played from turn 107 to turn 355 (about 248 turns) and took the score from 21 to 42. Milestones: explored the whole tower (Comm Room, Observation Deck, Helipad and the locked helicopter); slept through the first night in Dorm B; opened the Kitchen and filled the canteen (+4); switched on Floyd (+2); fixed the Comm Room coolant with the green coolant and then the brown catalyst, so the help message is sent (+6); found the lower elevator card inside Floyd (+1); rode the Lower Elevator to Kalamontee Platform (+4); drove shuttle Alfie to Lawanda (crashed into the end wall but survived, +4 for the platform); found the Infirmary medicine and red spool; and reached the Repair Room, where Floyd located a shiny fromitz board I could not get him to hand over. Still open: the Rec Area combination door, the teleport booth, the reactor elevator, the helicopter lock, the cardboard box of parts in Storage East, and my fever.

What worked: the numbered option list gives context verbs exactly when they matter -- "put under spout" only in the Machine Shop, "pour into funnel-shaped hole" only in the Comm Room, "eat (new)" on goo once the kit is in hand, "show to floyd" on the robot-sized doorway. Refusals usually tell you what to do ("The slot beside the buttons stays dark", "Dropping the survival kit would make enough room"). Unnamed exits read as "not visited yet", which works as a to-do list. The sleep button that becomes "sleep (very tired)" is an excellent status cue. Save and Restore as buttons made experimenting (medicine, shuttle, turning Floyd off) cheap.

What still hurts: (1) The option list is long and my 14 carried items push Characters to the very bottom, so Floyd looked unclickable when he first woke up. (2) Asking Floyd to do things: "talk to" is a stock "Hi!" and there is no "ask Floyd to get X"; the fromitz board appeared as a dead "examine" row and Floyd then left. (3) Real-time events (the shuttle's halfway sign, "approaching a brightly-lit area") arrive as single tick lines with one turn to react; at speed 10 that turn was already too late. (4) Legwork: the two-step coolant relay costs about 14 clicks each way, with a card slide and three waits on every elevator ride. (5) Silent score changes and a fever that appears with no warning; the medicine gives no feedback.

The briefing was enough to pick up the thread: it named my goal (see what the elevator brought me to), the night-time chores (kit, bunk), and where things were left, and the "places you have been" list matched the named exits. The one thing I would have liked is a one-line map of which corridor connects to which, because I spent early turns re-learning that Storage West is off the Mess Corridor.

The three changes I would make first: (1) Put "Characters" above "Carried", or collapse carried items to a single "Inventory…" row outside rooms where they gain a special verb. (2) Give NPCs an "ask to…" list (for example "ask Floyd to fetch…" listing things he has mentioned), and never list an object row the game then says is not here. (3) In timed sequences (the shuttle), make the key cues sticky -- for example a status line "Station ahead: slow to 5" -- or give one extra turn of margin, so a click player waiting in a batch is not punished for a single missed line.

### Verdict
The click interface carried me through a long, multi-step stretch (coolant relay, Floyd, two elevators, the shuttle) without ever needing to type, and context verbs showed up exactly where the puzzles wanted them. It stumbles on NPC interaction (Floyd's fromitz board) and on fast timed events, and the option list grows long enough to hide important rows.
