# Round 7: typed-7-late, typed

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 7, 11 September 2026
- **Mode:** typed: commands typed into the parser
- **Start:** from the Tower Core checkpoint (turn 107, score 21)
- **Result:** Did not win. Where play ended: Fork, turn 410, with 42 points.
- **Commands:** 339, with no deaths

The diary below is `playtests/2026-09-11/2026-09-11-typed-7-late.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind typed playtest from a checkpoint: session `typed-7-late`
**Who:** Claude (blind tester, typed commands only) **Date:** 2026-09-11  **Session:** `typed-7-late` (`node scripts/playtest.mjs --session typed-7-late --new --checkpoint tower-core`)

### Briefing
The briefing says I am a Stellar Patrol ensign whose ship blew up this morning; I have crossed a rift with a ladder, found three access cards in offices, and just ridden an elevator up to a "Tower Core" using the upper elevator card. It is night, I will soon need to eat (kit left in Storage West) and sleep (dorms off Rec Corridor). It is clear and concrete: I know what I carry (key, kitchen card, upper elevator card, shuttle card, brochure), what I left where, and what I meant to do next.

### Attempt 1, turns 107-121: up the spiral stair to a rusty helicopter
I began with "look" (it costs a turn: 107 to 108, fine). Tower Core has a sliding door north, a spiral stair up, and exits NE and SW. "north" just put me back into the Upper Elevator, so the door north is the elevator I came from. I went back "south" and "up" to a Helipad: a fence, cloudy sky, and "a large vehicle, severely weathered and topped with rotor blades". "examine vehicle" said several doors stand open, so "enter vehicle" worked and I was in the Helicopter, with a "complex control panel ... closed and locked".

Two small surprises. "open door" inside the helicopter replied "You can't see any door here!" although the room text says "Several doors lead out to the Helipad". And "unlock panel with key" (I carry a key) replied "You don't even have the orange key!", which tells me the panel wants an orange key that I have never seen; "open panel" gave the same line. That is a useful hint, if slightly odd to hear about an orange key I do not know about. "examine my key" says nothing special. I left with "out" (good, understood) and went "down" to explore the NE and SW exits.

### Attempt 1, turns 121-133: the Comm Room and the Observation Deck
"northeast" from the core led to a Comm Room with two consoles written in a phonetic spelling ("Reeseev Staashun", "Mesij Plaabak"). Reading it aloud was fun and decodable: receive station, message playback. "push playback button" played the Feinstein's last call, cut off by the explosion; a nice emotional beat that ties the place to my backstory. "read screen" showed a distress message: a planet-wide plague struck the whole population, emergency assistance requested. So that is what happened to the people here.

The right-hand console flashes "Malfunkshun in Sendeeng Kuulint Sistum" (sending coolant system) and has a funnel-shaped hole labelled "Kuulint Sistum Manyuuwul Oovuriid" (coolant system manual override). "examine enunciator" lists seven coloured lights with green flashing. My hunch: I must pour some liquid into the hole, probably matched to the flashing colour, to fix the transmitter and call for help. The Tool Room flask may be the vessel.

Parser notes: "examine all" gave "You can't see any all here!" (I expected a refusal like "one at a time", but the wording is odd). "examine funnel" failed ("You can't see any funnel here!") although the text says "funnel-shaped hole"; "examine hole" worked and helpfully said anything poured in would run down into the machinery. On the Observation Deck, "examine island" failed although the text is all about the island; "look down" gave a generic floor line. The deck view itself (half-kilometre tower, another island 20 km east) is atmospheric.

### Attempt 1, turns 133-157: back down, the booth and the red elevator
"read brochure" is a joke ad for the game itself; fine. I typed "save" (answered "Ok.") before heading down, since I will want a fallback. In the Upper Elevator "push down button" said "Nothing happens. The slot beside the buttons stays dark", which told me clearly I must swipe the card again. "slide upper elevator card through slot" gave "Elevator enabled", then "push down button" and two "wait"s brought me down. Good feedback all round.

The Elevator Lobby has a blue door (the upper elevator, north), a red door south with a red button, a corridor west and a telephone-booth room east. East is "Booth 2", with a ten-centimetre slot and buttons "1" and "3": clearly a transit system between numbered stations. "slide shuttle card through slot" there gave "Inkorekt awtharazaashun kard...akses deeniid." So the shuttle card is not for this booth; noted.

"push red button" made the red door vibrate; it took two waits and an examine before "The door at the south end of the room slides open". "south" before that said "The door is closed." The Lower Elevator also has a card slot; the kitchen card is refused. I have no lower elevator card, so the lower elevator is out for now.

Then my stomach growled, and the game kindly reminded me "There is still goo in the survival kit you left in Storage West." That is exactly the right nudge. I headed west to Corridor Junction to fetch it.

### Attempt 1, turns 157-178: goo, a canteen and the kitchen
I tried a travel command, "go to storage west", half expecting a refusal. It worked, one room per command: the first took me along the long hall to Dorm Corridor (with a nice "you walk down the long, featureless hallway" line), the second to Mess Corridor. A third would presumably have gone north; I just typed "north". That is a real convenience for a player coming back to a big map from a briefing. On the way I got "You begin to feel weary", so sleep is now pressing too.

Storage West had the kit with brown and green goo. "take kit", "eat brown goo" ("Nebulan fungus pudding ... quench your thirst, too"). I grabbed the towel as well. South of Mess Corridor is the Mess Hall with an octagonal canteen on a bench, and a closed door with a slot. "slide kitchen card through slot" opened it: Kitchen, +4 points. The "Hii Prooteen Likwid Dispensur" has an octagonal niche under a spout: the octagonal canteen is an obvious match. "open canteen", "put canteen in niche" ("fits snugly"), "push button" filled it with brown liquid. "take canteen", "close canteen". Everything was understood first try, and the matching shapes made the puzzle feel fair.

### Attempt 1, turns 178-186: correction on "go to", and a night in Dorm B
Correction to the last section: "go to rec corridor" from Mess Corridor said "You can't see any rec corridor here!" So "go to storage west" never was a travel command; the parser simply read the trailing "west" as a direction, and the two moves happened to be the right way. No harm done, but I had credited a feature that is not there. A player returning from a briefing full of room names would love a "go to <place>" command, or at least a reply like "You'll have to give directions" instead of "You can't see any rec corridor here!".

"west" found Rec Corridor, "north" found Dorm B with many-tiered bunks. I saved, then "get in bunk" ("the bed is soft and comfortable"), "sleep" ("You'll probably be asleep before you know it"), and one "wait" later I dreamed about Blather and a scrub brush, and woke on Septem 7 at morning, time 1680. My things "slipped to the floor beside you". "get out of bed" and "take all" got everything back in one go; "take all" listing each item is good.

### Attempt 1, turns 186-200: dorms, sanitary facilities, and a dial lock
I did a sweep of the dorm wing: Dorm B north to SanFac B (a nice line about toilet bowl design surviving millennia), back south through Rec Corridor to Dorm A and SanFac A. All empty. Rec Corridor "southwest" gave Plain Hall (which I remember from the briefing list), and "north" from there reached a new room, Rec Area: games, tapes, and a door north "closed and locked" with a dial set to 0. "examine games" (Double Fannucci!) and "examine tapes" are flavour; "examine dial" says it turns from 0 to 1000. So a combination is hidden somewhere; I will keep an eye out for a number. Rec Area's east hallway loops back to Rec Corridor, so Rec Corridor is a little triangle with Plain Hall.

Nothing parsed badly in this stretch. Dead-end rooms are described vividly, so they did not feel wasted, but I am now 90 turns in with only +4 points, and three open problems: the green-light coolant hole, the orange key for the helicopter, the dial lock (plus no lower elevator card).

### Attempt 1, turns 200-215: more dorms, lunch from the canteen, and a worrying symptom
Dorm Corridor's north and south openings are Dorms D and C with their SanFacs, all deserted. In SanFac D my stomach growled again. I wanted to save the green goo, so I tried "drink liquid" and got "You can't see any liquid here!", because the canteen was closed. Fair, though "The canteen is closed" would have been kinder, since I know the liquid is in it. "open canteen" then "drink liquid" worked: "quenched your thirst and satisfied your hunger". The canteen is now empty; I will refill it at the kitchen.

Then, in SanFac C: "You notice that you feel a bit weak and slightly flushed, but you're not sure why." Combined with the Comm Room message about a planet-wide plague, I read this as me catching the disease, which probably means a clock is ticking. That raises the stakes; I need to move faster and look for a medical area. I went east along the long hallway back to Corridor Junction to try its north-south corridor.

### Attempt 1, turns 215-230: Systems Monitors and the Mech wing
North from the junction is Admin Corridor South, then Admin Corridor with my ladder still across the rift, and a doorway west labelled "Sistumz Moniturz". The monitors say LIIBREREE, REEAKTURZ and LIIF SUPORT are fine, but PLANATEREE DEFENS, PLANATEREE KORS KUNTROOL, KUMUUNIKAASHUNZ and PRAJEKT KUNTROOL are malfunctioning. So there is a Library somewhere (a possible source of the dial combination or other clues), and "communications" matches the broken Comm Room coolant. "examine equipment" and "examine monitors" both answered sensibly. Admin Corridor South's east opening is only SanFac E.

South of the junction the Mech Corridor has rooms on both sides. East of the middle one is Reactor Control: a diagram of a buried reactor, a metal door east with a button, and "a dark stairway winds downward" (I have no light, so I will not go down blind). West is Physical Plant, a huge dim room of catwalks and heating equipment with exits NE and SE.

### Attempt 1, turns 230-245: spare parts, a weight limit, and the coolant dispenser
Physical Plant's NE and SE exits just loop back to the Mech corridors. East of Mech Corridor North is Storage East: an oil can and a cardboard box holding a cracked fromitz board, B- and K-series megafuses, and a "good ninety-ohm bedistor". These look like repair parts for something (maybe a robot or the comm gear). "take box and oil can" took the oil can but said for the box "Your load is too heavy. Dropping the brochure would make enough room." I dropped the brochure, then "take box" said "Dropping the towel would make enough room." So the first hint was wrong, or at least incomplete; it cost me a turn and an item I did not need to drop. I left the box for now since I know where it is.

Mech Corridor South ends with doorways SW, S and SE (east/west refused, which is correct and the room text says so). SW is the Tool Room (flask, pliers, the "Akmee Portabul Laazur" with an old battery). South is the Machine Shop, and here is the payoff: a dispensing machine with a spout and buttons "KUULINTS 1-4" coloured red, blue, green, yellow, three "KATALISTS" gray, brown, black, and two white ones "BAAS" and "ASID". The colours are exactly the seven enunciator colours from the Comm Room. The green light was flashing, so: green coolant (button 3) into the flask, carry it up the tower, pour it into the funnel hole. Very satisfying connection.

### Attempt 1, turns 245-265: green coolant up the tower, and now brown
"take flask" in the Tool Room worked, but "take laser" said "You'd have to drop the survival kit and the towel first", so I left the laser. In the Machine Shop "put flask under spout" and "push green button" were understood first time: "The flask fills with some green chemical fluid. The fluid gradually turns milky white." That colour change worried me (had it gone bad?) but I carried on. The walk back (N, N, N, N, E, N, swipe the upper card, "push up button", two waits, S, NE) is about twelve turns; all commands understood.

In the Comm Room I saved and typed "pour fluid into hole": "The liquid disappears into the hole. The lights on the enunciator panel blink rapidly and all go off except one, a brown light." No points yet, so it is a sequence: brown is KATALIST 2. Back down I go. It is a long round trip per step; if there are many colours this will get tedious, but the feedback is clear.

### Attempt 1, turns 265-285: brown catalyst, and meeting Floyd
Down again (swipe, "push down button", two waits), then W, S, S, S, S to the Machine Shop. "put flask under spout", "push brown button": brown fluid, again turning milky white. Since the Machine Shop had an unexplored east door I spent one move on it before heading back up: the Robot Shop, full of disassembled robots, with one four-foot robot "remotely close to being in working order". "examine robot": deactivated, head lolling. "turn on robot" gave "Nothing happens. Then again, you notice a faint hum" and +2 points (27). After a "wait" it sprang to life: "Hi! I'm B-19-7, but to everyperson I'm called Floyd ... Let's play Hider-and-Seeker you with me." Charming. Next wait he "reminisces about his friend Lazarus, a medical robot", which is a hint that there is a medical area somewhere (good, given my flushed symptoms).

So I now have a companion. I will ask him things once the coolant is done.

### Attempt 1, turns 285-301: Floyd tags along, and the distress call goes out
I tried talking to Floyd. "ask floyd about lazarus" gave "Floyd looks puzzled. 'Floyd never heard of that. Is it a game?'", which is funny but contradicts the line one turn earlier where he reminisced about Lazarus. "floyd, follow me" got "Okay!" and he did follow, bouncing into the elevator ("Hey, wait for Floyd!") and telling me about sharpening a pencil. "ask floyd about orange key": same "never heard of that".

Up the tower again (N, swipe, up, wait x2, S, NE) and "pour fluid into hole": "The lights ... go dark. The coolant system warning light goes off, and another flashes, indicating that the help message is now being sent." +6, score 33. That is a real milestone: I have repaired the transmitter and help is being called. Now: the illness, the dial door, the lower elevator, the orange key, the shuttle card, and a Library and medical area that I have only heard about.

### Attempt 1, turns 301-326: more locked doors (teleport booth, reactor elevator, dark stairs)
After the repair the Comm Room text updated nicely ("Tranzmishun in pragres", enunciator dark). Floyd kept up a stream of chatter (Dr. Fizpick rumours, batteries, a bruised knee, barrelling into me: "Floyd not looking at where he was going to"). He is great company, and his idle lines never got in the way.

Back at Booth 2, "push tan button" said "Teleportaashun buux not aktivaatid", so the booth is a teleporter that needs its own card; the upper elevator card was refused too. "ask floyd about booth": "Floyd doesn't know much about that. Want to play Hider-and-Seeker instead?"

Reactor Control: "push button" opened the metal doors to a Reactor Elevator with yet another card slot ("Nothing happens. The slot ... stays dark"). I saved (Floyd: "Oh boy! Are we gonna try something dangerous now?", lovely) and went "down" the dark stairs: "It is pitch black. You might be eaten by a grue." I went straight back "up". So I need a light source. Four things now want something I lack: the teleport card, a lower elevator card, a reactor elevator card, and a light, plus the orange key and the dial number. The shuttle card has no home yet either.

### Attempt 1, turns 326-338: across the rift again: a dark supply room and unreadable maps
I went back across the ladder ("You slowly make your way across the swaying ladder ... sharp, pointy rocks", nice) to Admin Corridor North. Its signs read "Administraativ Awfisiz" (west, the offices), "Tranzportaashun Suplii" (north) and "Plan Ruum" (east). The briefing only mentioned the offices, so I tried the other two. Transportation Supply is pitch black (another reason to find a light; maybe the shuttle card's use is in there). The Plan Room describes two big maps, "Kalamontee Kompleks" with a "Yuu ar heer" arrow and "Lawanda Kompleks" with an installation buried underground. But "examine left map", "examine right map", "examine map", "read map", "examine kalamontee map", "examine lawanda map" and "examine arrow" all gave "You can't see any ... here!". Seven refusals for things the room text describes prominently. Only "examine cubbyholes" worked (empty). That was the worst parser moment so far, since a map is exactly what I want at this point.

The room text does suggest the other island (seen from the tower, 20 km east) is the Lawanda complex, and that the shuttle card and teleport booth probably connect the two.

### Attempt 1, turns 338-354: Floyd's secret card
The offices were as the briefing left them (drawer open, desk empty). "look through window" in the Large Office worked. With no light source and no new cards, I turned to Floyd. "ask floyd about lamp": never heard of it. "floyd, help me": "Enough talking! Let's play Hider-and-Seeker." "ask floyd about cards" asked which of MY cards I meant, so I chose "ask floyd about shuttle access card" and got the key reply: "Cards are neat! Floyd likes cards." He pats one of his compartments and giggles. He has a card!

Getting it took some flailing. "search floyd" and "open compartment": he giggles, "You're tickling Floyd!" "ask floyd for card" and "floyd, give card to me" both went into disambiguation over my own four cards. "floyd, give me your card" produced a parser garble: "You can't see any me your card here!". "ask floyd about compartment" gave a generic self-introduction. The tickling reply suggested the answer, though: he won't hold still while he is on. "turn off floyd" ("shocked by this betrayal ... whimpers and keels over", which made me feel guilty) and then "search floyd": "you find and take a magnetic-striped card embossed 'Loowur Elavaatur Akses Kard.'" +1, score 34. "turn on floyd": "Why you turn Floyd off?" A good puzzle with real emotional weight; the only problem was the parser around "give me your card".

### Attempt 1, turns 354-368: down the lower elevator to the shuttle platform
Back over the rift and to the Elevator Lobby (E, E, S, S, S, E, S), Floyd tagging along. "slide lower card through slot" gave "Elevator enabled", "push down button" and three waits (Floyd chanting the death scene from "Carmen") brought me to the bottom, door on the north side. The Waiting Area is a concrete platform with benches, a metal door south, and the platform continuing east. "east": Kalamontee Platform, "Shutul Platform -- Kalamontee Staashun", with a large transport to the south, door open. +4, score 38. The shuttle card finally has a purpose. It is now dusk, so another night is coming; I have one green goo and an empty canteen, which is a concern, but the shuttle is the big lead.

### Attempt 1, turns 368-382: driving the shuttle
"south" into Shuttle Car Alfie, "east" into Alfie Control East: a slot, a lever (centre, up "+", down "-") and a display at 0. I saved (Floyd again: "Are we gonna try something dangerous now?"). "slide shuttle card through slot": "Shuttle controls activated." Then "push lever up" failed with "You can't see any lever up here!", so I tried plain "push lever": "The lever is now in the upper position", the door slid shut and the car moved, display 5. Each wait added 5. At 15 I passed a sign "Limit 45." At 40 I wanted to hold speed: "set lever to center" also failed ("You can't see any lever center here!"), but "pull lever" moved it to centre and the display "still reads 40". So push/pull work, but the natural "push lever up", "pull lever down", "set lever to center" do not, which is awkward given the room text describes exactly those positions. Floyd recited six hundred digits of pi and sang out of key during the ride, which I enjoyed.

### Attempt 1, turns 382-404: halfway mark, braking too early, and a crash
I cruised at 40 and let the waits run. At turn 386 a sign flashed "Hafwaa Mark -- Beegin Deeseluraashun", but I was batching waits and only reacted three turns later. "pull lever" put it in the lower position and the speed fell 5 per turn; I ate my last green goo on the way ("yummy lima beans") when hunger struck. Signs with blinking red lights counted down "15", "10", "5", and the car stopped at 0 with the lever popping back to centre. But the window showed "rails ending at a brightly-lit station ahead": I had stopped short. "west" said "The door is closed" and "open door" gave "Operator should remain in control cabin while shuttle car is between stations." That was clear.

So I nudged forward: "push lever" (speed 5, "approaching a brightly-lit area ... a shuttle station"), then "pull lever" to go back to centre, thinking centre would coast to a halt at the platform. Wrong: centre holds speed, and "The shuttle car rumbles through the station and smashes into the wall at the far end ... unhealthy crunching sounds as the cabin doors creak slowly open." I should have pulled twice, to the lower position. My own mistake, but the mental model "centre = hold speed" was clear from the ride; I just forgot it under pressure and assumed a station would stop me. "diagnose": "a bit sick and feverish", well-rested, well-fed. No score for arriving, so the crash probably cost the arrival points.

Budget check: I am at roughly 320 commands, past the ~300 budget, so I will only step out to see where I am and then write up.

### Attempt 1, turns 404-410: Lawanda Platform, and stopping
Despite the crash the cabin doors had creaked open. "west" into the cabin, "north" out: Lawanda Platform, "Shutul Platform -- Lawanda Staashun", +4, score 42. So the crash did not cost the arrival points after all (whether it cost anything else, such as the return trip, I cannot tell). Floyd announced "Floyd going exploring. See you later." and glided off, which startled me a little. "east" onto a broken escalator, "up" to a Fork with branches NE and SE. I saved there and stopped, at about 339 commands.

### Friction log
| # | Attempt/cmd | Where | What happened | Why it hurt | Suggested fix |
|---|---|---|---|---|---|
| 1 | "look", "north", "up" | Tower Core | Room text clear; exits listed; stair up to Helipad | (positive) orientation easy | none |
| 2 | "enter vehicle" | Helipad | Understood, moved into Helicopter | (positive) | none |
| 3 | "open door" | Helicopter | "You can't see any door here!" though room text says "Several doors lead out" | Described scenery not recognised | Add the doors as scenery ("they are already open") |
| 4 | "unlock panel with key" / "open panel" | Helicopter | "You don't even have the orange key!" | Mentions an orange key I have never seen; reads a bit like a spoiler but is a useful hint | Fine as a hint; maybe "The panel needs a key you don't have" plus the colour on examine |
| 5 | "push playback button" | Comm Room | Plays the Feinstein's last message | (positive) great story beat, phonetic labels decodable | none |
| 6 | "examine all" | Comm Room | "You can't see any all here!" | Odd wording for an unsupported "all" | Say "You can only examine one thing at a time." |
| 7 | "examine funnel" | Comm Room | "You can't see any funnel here!"; "examine hole" works | The description's adjective "funnel-shaped" not a synonym | Add "funnel" as a synonym for the hole |
| 8 | "examine island" | Observation Deck | "You can't see any island here!" | The room text is about the island and the other island east | Add distant scenery (island, complex, ocean) with short descriptions |
| 9 | "examine hole" | Comm Room | "Anything poured into it would run down into the machinery below." | (positive) clear hint about what to do | none |
| 10 | "push down button" (card not swiped) | Upper Elevator | "Nothing happens. The slot beside the buttons stays dark." | (positive) tells me exactly why | none |
| 11 | "slide shuttle card through slot" | Booth 2 | "Inkorekt awtharazaashun kard...akses deeniid." | (positive) clear refusal in the game's style | none |
| 12 | "push red button", "wait" x2 | Elevator Lobby | Door took ~3 turns to open; "south" meanwhile: "The door is closed." | Mild: no sign whether it was coming or not until it opened | Maybe "you hear machinery approaching" on the waiting turn |
| 13 | hunger message | Lower Elevator | "There is still goo in the survival kit you left in Storage West." | (positive) reminder of where food is | none |
| 14 | "go to storage west" | Corridor Junction | Moved me west (see row 16: it was only the word "west") | Looked like a travel command at first | see row 16 |
| 15 | kitchen card, canteen, dispenser | Mess Hall / Kitchen | Every command understood first try; +4 on entering | (positive) fair, shape-matched puzzle | none |
| 16 | "go to rec corridor" | Mess Corridor | "You can't see any rec corridor here!" (the earlier "go to storage west" had just been read as "west") | Misleading: first success looked like a travel feature | Support "go to <visited room>" or reply "You'll need to say which direction." |
| 17 | "get in bunk", "sleep", "wait" | Dorm B | Slept, dream, woke next morning; items on floor | (positive) smooth | none |
| 18 | "take all" after waking | Dorm B | Picked up all eight items with per-item lines | (positive) | none |
| 19 | "examine games/tapes/dial" | Rec Area | All answered with flavour; dial "0 to 1000" | (positive) scenery covered | none |
| 20 | Rec Area east -> Rec Corridor | Rec Area | East exit loops to Rec Corridor, which I had reached via SW to Plain Hall | Mild map confusion (a triangle) | fine; maybe mention "leads back toward the dorms" |
| 21 | "drink liquid" (canteen closed) | Dorm C | "You can't see any liquid here!" | Slight: I know it is in the canteen | Reply "The canteen is closed." or auto-open |
| 22 | "weak and slightly flushed" | SanFac C | Symptom message, no explanation | (positive, ominous) links to the plague message; creates urgency | none |
| 23 | "examine monitors" | Systems Monitors | Lists which systems are green and which malfunction | (positive) a clear status board hinting at goals (communications) and a Library | none |
| 24 | Reactor Control | Mech Corridor | "a dark stairway winds downward" | Unclear whether I need a light first; no hint | fine as is |
| 25 | "take box and oil can" then "drop brochure", "take box" | Storage East | First hint "Dropping the brochure would make enough room"; after dropping it, "Dropping the towel would make enough room" | The weight hint was wrong the first time; wasted a turn and an item | Compute the hint against the real shortfall, or name all items needed |
| 26 | Machine Shop dispenser | Machine Shop | Buttons coloured to match the Comm Room enunciator | (positive) strong cross-room clue, felt fair | none |
| 27 | "put flask under spout", "push green button" | Machine Shop | Understood; fluid "gradually turns milky white" | Colour change made me wonder whether it had spoiled | Fine as flavour; maybe say it is normal, or keep for mystery |
| 28 | "pour fluid into hole" | Comm Room | Accepted; enunciator now shows brown | (positive) clear next step | none |
| 29 | round trip Machine Shop <-> Comm Room | Tower | ~12 turns each way, swipe card every ride | Repetitive if the sequence is long | Maybe keep the elevator enabled for a while after a swipe |
| 30 | "turn on robot" + "wait" | Robot Shop | Robot hums, +2, then wakes as Floyd with a lovely intro | (positive) memorable companion moment; delayed wake felt natural | none |
| 31 | Floyd mentions Lazarus, a medical robot | Robot Shop | Idle chatter | (positive) hints at a medical area | none |
| 32 | "ask floyd about lazarus" | Robot Shop | "Floyd never heard of that. Is it a game?" one turn after Floyd reminisced about Lazarus | Breaks the illusion; no info gained | Give Floyd an answer about Lazarus (and topics he himself raises) |
| 33 | "floyd, follow me" | Robot Shop | "Okay!", and he follows through the elevator | (positive) | none |
| 34 | "pour fluid into hole" (brown) | Comm Room | Help message now being sent, +6 | (positive) clear, satisfying milestone | none |
| 35 | "push tan button" | Booth 2 | "Teleportaashun buux not aktivaatid." | (positive) tells me what the booth is and that it needs activating | none |
| 36 | "save" with Floyd present | Reactor Control | Floyd: "Are we gonna try something dangerous now?" | (positive) delightful | none |
| 37 | "down" dark stairs | Reactor Access Stairs | Pitch black, grue warning; "up" returns | (positive) safe to back out | none |
| 38 | many card slots | Lobby / Booth / Reactor | Four slots, three cards, none fit the new ones | Mounting "locked door" fatigue with no pointer where to look next | Floyd or a sign could hint where cards are kept |
| 39 | "examine map" / "read map" / "examine left map" / "examine kalamontee map" / "examine arrow" (7 tries) | Plan Room | All "You can't see any ... here!" | The room is about the maps; I most wanted to read them; zero feedback | Implement both maps (and the arrow) as scenery with a text description of each complex's layout |
| 40 | "north" | Transportation Supply | Pitch black | Another light-gated room; fine | none |
| 41 | "ask floyd about shuttle access card" | Large Office | Floyd pats a compartment and giggles | (positive) excellent hint, delivered in character | none |
| 42 | "ask floyd for card" / "floyd, give card to me" | Large Office | Disambiguation over my own four cards | Floyd's card is not a known object, so every card request is about mine | Let "card" also match "Floyd's card" once he has hinted at it, or have Floyd answer "Floyd's card! Floyd not giving it." |
| 43 | "floyd, give me your card" | Large Office | "You can't see any me your card here!" | Parser garble on a common indirect-object phrasing | Parse "give me X" / "give X to me" for NPC orders |
| 44 | "turn off floyd", "search floyd" | Large Office | Found the lower elevator card, +1; Floyd hurt then "Why you turn Floyd off?" | (positive) memorable, guilt-inducing puzzle | none |
| 45 | lower elevator card, "push down button", waits | Lower Elevator | Worked exactly like the upper one | (positive) consistent mechanics | none |
| 46 | Waiting Area description | Waiting Area | "to the south is a metal door" right after I came north out of the elevator | Slightly confusing orientation (is the metal door the elevator?) | Say "the elevator door to the south" |
| 47 | "slide shuttle card through slot" | Alfie Control East | "Shuttle controls activated." | (positive) | none |
| 48 | "push lever up" | Alfie Control East | "You can't see any lever up here!" | The room text names the positions; natural phrasing fails | Accept "push lever up", "pull lever down", "move lever to +/-" |
| 49 | "set lever to center" | Alfie Control East | "You can't see any lever center here!"; "pull lever" works | Same | Accept "set/move/put lever to center/central/middle/+/-" |
| 50 | speed display and "Limit 45" sign | Shuttle | Each turn +5; sign at 15 | (positive) readable driving puzzle | none |
| 51 | batched "wait"s after the halfway sign | Shuttle | Braked 3 turns late, stopped short of the station | My fault; but the countdown signs made the length of the approach clear only in hindsight | fine |
| 52 | "open door" while stopped short | Alfie Control East | "Operator should remain in control cabin while shuttle car is between stations." | (positive) explains the situation | none |
| 53 | "push lever", then "pull lever" (to centre) near the station | Shuttle | Centre held speed 5; car smashed into the far wall | Easy to forget that you need two pulls to brake; no station stop assist | Maybe mention "the lever is at centre: the car will coast" when it is set to centre, or a platform warning sign |
| 54 | "diagnose" | Alfie Control East | "a bit sick and feverish", rested, fed | (positive) clear status on the illness | none |
| 55 | arrival at Lawanda Platform | Lawanda Platform | +4 even after the crash | (positive) crash did not block progress | none |
| 56 | Floyd leaves: "Floyd going exploring. See you later." | Lawanda Platform | Companion wanders off | Mild worry that I lost him; in character though | fine |

### Report
Starting at turn 107 in the Tower Core with 21 points, I finished at turn 410 on the Lawanda side of the island chain with 42 points, after about 339 typed commands (a little over budget, to see the shuttle through). Milestones: I explored the tower (Helipad with a locked rusty helicopter, Comm Room, Observation Deck); refilled food at the Kitchen with the kitchen card and the canteen (+4); slept a night in Dorm B; fixed the Comm Room's sending coolant by carrying green and then brown fluid from the Machine Shop dispenser up the tower in the flask, so the distress message is now being sent (+6); switched on and befriended the robot Floyd (+2); got the lower elevator card out of his compartment by switching him off and searching him (+1); rode the lower elevator to the Kalamontee shuttle platform (+4); drove Shuttle Car Alfie through the tunnel (crashing into the far wall at 5 on arrival); and reached Lawanda Platform (+4), then walked up the escalator to a Fork. I am sick and feverish, which is presumably the plague from the Comm Room message, and I have no food left and an empty canteen.

I was never truly stuck, but I carried several unsolved locks: the helicopter's panel (wants an orange key), the Rec Area door with a 0-1000 dial, the teleport booth ("not aktivaatid"), the Reactor Elevator slot, and two pitch-black places (Reactor Access Stairs and Transportation Supply) with no light source anywhere. The spare parts in Storage East (fromitz board, megafuses, bedistor) and the laser I could not carry are presumably for later. The hardest stretch was after the coolant repair, when every door needed something I lacked; talking to Floyd about cards broke the logjam, and that hint ("Cards are neat! Floyd likes cards", patting a compartment) was well judged.

The biggest confusions were parser gaps on things the room text makes prominent. The Plan Room is the worst: two big maps and an arrow, and seven different attempts to examine or read them all said "You can't see any ... here!". Also: the shuttle lever positions described in the room are not accepted as words ("push lever up", "set lever to center"); "floyd, give me your card" garbles into "You can't see any me your card here!" and "ask floyd for card" only disambiguates between my own cards; "examine funnel", "examine island" and "open door" in the helicopter all refuse described scenery; and Floyd says he never heard of Lazarus a turn after reminiscing about him. The weight-limit hint named the wrong item the first time. "go to storage west" looked like a travel command but was only read as "west", which misled me until "go to rec corridor" failed.

What worked well: the colour-matched coolant puzzle (enunciator colours = dispenser buttons) felt fair and clever; the phonetic spelling is fun to decode; hunger and sleep warnings name the remedy and where it is; elevator and card-slot feedback ("the slot stays dark", "Elevator enabled") is crisp; the shuttle speed display, "Limit 45" and countdown signs made a readable driving puzzle; and Floyd is a joy (the save quip, the Carmen death scene, the betrayal when switched off). The briefing was enough to pick up the thread: it told me what I carried, where I had left things, and what I meant to do, and the in-game reminders ("There is still goo in the survival kit you left in Storage West") dovetailed with it. What I would change: implement the Plan Room maps (a map would have saved me a lot of walking), accept lever positions and "give me X" phrasings, give Floyd answers on topics he raises himself, and fix the weight hint.

### Verdict
A strong, fair middle game: every puzzle I solved (coolant, Floyd's card, the shuttle) was clued in the world and felt earned, and Floyd carries a lot of charm. The main friction is parser coverage of prominently described scenery and natural phrasings (maps, lever positions, "give me"), not the puzzle design.
