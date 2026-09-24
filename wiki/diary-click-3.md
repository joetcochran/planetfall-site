# Round 3: click-3, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 3, 10 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Tower Core, turn 233, with 28 points.
- **Commands:** 248, with no deaths

The diary below is `playtests/2026-09-10/2026-09-10-click-3.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest: session `click-3`
**Who:** Claude (Opus 5), playing blind, mouse-only (numbered options / printed phrases only)  **Date:** 2026-09-10  **Session:** `click-3` (`node scripts/playtest.mjs --session click-3 --new --click`)

### Attempt 1, turns 0-16: Scrubbing duty, a bully, and an explosion
I start on "Deck Nine" with a scrub brush, chronometer, uniform and ID card. The option list is well organised: Exits, Buttons, In the room, Carried. I read the ID card first ("Special Assignment Task Force", ID 6172-531-541 - I note the number in case it matters later).

Ensign First Class Blather arrived on turn 1 and handed me thirty demerits. I had chained two commands in one go (examine ID, then "11" meaning "examine escape pod"), but Blather's arrival inserted his own block of verbs, so "11" became **salute Ensign First Class**. Lucky: "Blather's sneer softens a bit... Only five demerits." But it taught me the numbers shift whenever something enters the room, so I stop batching numbers and use phrases when I chain.

I wandered up the gangway to Deck Eight, where Blather caught me "away from your post" and ordered me back. I obeyed, and back on Deck Nine I waited. Blather came, sneered, and left. On turn 13 "A massive explosion rocks the ship... The door to port slides open", then narrow and wide emergency bulkheads crashed shut. The escape pod was the obvious move, and "go west" took me in (+3 score). "get in" the safety web was right there as an option. The pod started sliding down its ejection tube.

Interface notes: the room description says "The bulkhead leading out is open" in the same reply as "The pod door clangs shut", which reads oddly. After the emergency bulkheads closed, "go east" and "go up" were still listed next to "open wide bulkhead" / "open narrow bulkhead", so I could not tell whether those exits were really blocked.

### Attempt 1, turns 17-40: Landing, sinking, climbing
Waiting in the web was the whole puzzle: the Feinstein blew up, the pod stabilised, entered the atmosphere and landed "precariously balanced" on a cleft, and a panel opened with "a survival kit and a towel". I waited two turns too long out of habit (nothing told me time was short). Standing up tipped the pod into the water, but the moment I got out of the web a **take all** button appeared, which is a lovely touch: one click and I had both. "open escape pod bulkhead" flooded the pod, "go up" twice got me to the Crag (+3).

The Crag describes "a small structure... about eight meters above you"; "go up" took me to the Balcony. The plaque was mentioned in the room text but at first I only saw cliff/ocean/stairway/window, because the plaque sits in a separate "Scenery" group further down. I had to reprint the options to find it. The plaque is written in phonetic mangled Galalingua: "SEENIK VISTA... Kalamontee Valee... Gulmaan Rivur... formur pravincul kapitul bildeeng." Fun. The survival kit holds red, brown and green goo, which I take to be food.

Up the Winding Stair to a ruined Courtyard with openings north and west. Pleasant, readable descriptions. I notice "go south, Winding Stair" and "go down, Winding Stair" both appear: two options, one destination.

### Attempt 1, turns 41-65: Mapping the complex
West Wing is a dead end: "Rubble blocks all exits save one". "move rubble" got "Not bloody likely." A **go down** exit is listed there; I checked the cliff first, then clicked it: "Certain death." (no turn spent, no death). An exit that exists only to refuse me is a dead option; it tempts every click-only player.

North from the Courtyard the architecture turns modern: Plain Hall, then a Rec Area with a north door "closed and locked" by a combination dial (0 to 1000). The dial offers "set to a number <value>", so the interface is ready for a number puzzle; I have no number yet except my ID (6172-531-541), which is out of range. "play games": "Okay. Gee, that was fun." Tapes include "a biography of a famous Double Fannucci champion". Rec Corridor leads to Dorms A and B and their SanFacs (all empty, but at least each is one short screen). Mess Corridor has a small north door with a steel padlock; south is the Mess Hall, where I took an octagonal canteen and found a card slot by the south door ("Pleez yuuz kitcin akses kard"). Nice: once I stood there, my ID card grew a contextual **slide through slot** verb. Wrong card, "akses deeniid", but the game clearly teaches that cards go in slots.

The option list is long now (the Carried block alone is 40+ entries with all the goo blobs), and "put in:" on the uniform offers to pocket blobs of goo, which is noise.

### Attempt 1, turns 66-92: Long corridors, booths and elevators
Dorm Corridor leads to Dorms C and D and two more SanFacs (all empty; I am now fairly sure the dorm block is flavour). East is a dead motorized walkway; "go east" is one long walk to the Corridor Junction, which the game summarises in one line. Nice pacing.

Elevator Lobby: a blue door (north) and a red door (south), each with a button, plus a "Booth 2" to the east with brown "1" and tan "3" buttons and another card slot ("Teleportaashun buux not aktivaatid"). I pushed both lobby buttons; the whirring and the vibrating were the only clue. I stepped into the booth, and when I came back and clicked "open blue door" by name it failed with "That is not one of the options on screen (Open is not in the menu for blue door)": both doors had opened on their own while I was away. Fair, but a one-line "The blue door slides open" when I returned would have saved a turn.

A hunger warning arrived; I ate the red goo ("just like scrumptious cherry pie"). The canteen is empty; I need water somewhere.

Both elevators are dead without a card: "Nothing happens. The slot beside the buttons stays dark." Two interface niggles here. First, the button entry reads "button: 11 examine · 12 push up · 13 push down", but typing the printed phrase "push down" is refused ("What do you want to push?"); only the number works. Second, "go up" / "go down" are listed as exits inside the elevator, but they only say "You'll have to use the elevator controls."

So far the locks are: dial door (Rec Area), padlock (Mess Corridor), kitchen card slot (Mess Hall), teleport booth card, and two elevator card slots. There are a lot of card readers and no cards yet.

### Attempt 1, turns 93-118: A key I can't reach, and a box of parts
Admin Corridor South: "You catch, out of the corner of your eye, a glint of light from the direction of the floor." I examined the crevice and found a shiny steel key, and a **take** option appeared for it at once. Taking it failed: "Either the crevice is too narrow, or your fingers are too large." I checked the options for anything like "put X in crevice" and found only examine/take. A tool puzzle, then; I will need something thin or sticky.

North, the Admin Corridor is split by "a gaping rift, at least eight meters across and thirty meters deep". Systems Monitors (west) shows failing systems (PLANATEREE DEFENS, KUMUUNIKAASHUNZ, PRAJEKT KUNTROOL...), which I read as story.

South of the junction: Storage East with an oil can and a cardboard box of electronic parts (cracked fromitz board, B- and K-series megafuses, a ninety-ohm bedistor). "take all" got the oil can but not the box ("Your load is too heavy"), so I dropped the scrub brush. The Physical Plant is scenery only. Reactor Control has a pitch-black stairway ("You might be eaten by a grue", so I went straight back up) and a Reactor Elevator behind a push-button door that closes again after a turn. Yet another card slot. Weight is starting to matter, and the "put in:" lists now name every item I own, which makes the Carried block very long.

### Attempt 1, turns 119-137: Floyd!
Mech Corridor South leads to the Machine Shop: a chemical dispenser with nine coloured buttons (KUULINTS 1-4, KATALISTS 1-3, BAAS, ASID) and a spout. My canteen immediately grew a **put under spout** option, which is a strong hint about where water, or something drinkable, might come from. But the full list here was 75 options, most of them "put in:" lists naming every item I carry.

Robot Shop: "Only one robot... looks even remotely close to being in working order." I clicked **turn on**: "Nothing happens. Then again, you notice a faint hum" (+2). One wait later: "Hi! I'm B-19-7, but to everyperson I'm called Floyd... Let's play Hider-and-Seeker you with me." That was the most charming moment so far. The interface, though, still calls him "multiple purpose robot" in the list, and his menu includes a bare **put** that answers "You can't do that." There is "put in:" and "throw at:" but no "give", so I am not sure how to hand him things.

Floyd followed me to the Tool Room: flask, U-shaped metal bar, wide-nosed pliers, and an "Akmee Portabul Laazur" with a battery and a 1-6 dial set to 5. "take all" refused everything ("Your load is too heavy"), so I dropped the cardboard box and took the pliers (for the crevice key) and the laser. The bar is still too heavy. Floyd then wandered off: "Floyd going exploring. See you later."

### Attempt 1, turns 138-153: The pliers are the wrong tool
(A technical pause on the harness side happened here; I resumed the same saved game.)

Back at the crevice with the pliers in hand, I expected a "take key with pliers" or "put pliers in crevice" option. There was none: the pliers offer only examine/drop, and "take key" gave the same "fingers are too large" line, with no mention that the pliers had been tried or were unsuitable. Examining the pliers and the key both said "I see nothing special". So the click interface tells me the pliers are not the answer, which is useful, but only by leaving things out.

My next idea was the "metal bar, curved into a U-shape": that sounds like a magnet. I dropped the pliers at the crevice to make room and walked back to the Tool Room (5 moves). The bar is takeable now. "examine curved metal bar": "I see nothing special", which doesn't confirm the magnet theory. Heading back to test it.

### Handover at turn 146
A new tester continued the same saved game after a technical interruption (the diary above runs to turn 153; the game's counter read 158 when I picked it up, standing at the crevice in Admin Corridor South with the U-shaped bar in hand and Floyd beside me).

### Attempt 1, turns 158-165: The magnet works, the padlock opens
The first reprint of the options answered the question the last tester left me: with the U-shaped bar in hand, the key grew a new verb, **take with magnet**. That is the click interface at its best: the right idea shows up as a button only when you hold the right thing, and it confirmed "the bar is a magnet" even though "examine" never said so. "With a spray of dust and a loud clank... It is a steel key!" No points, though.

The only lock a plain key could fit was the steel padlock in Mess Corridor, so I walked back (south, the long walkway west, west again: three clicks). Floyd tagged along the whole way and a stomach growl warned me I was "getting pretty hungry and thirsty". At the door the padlock offered **unlock with key**: "The padlock springs open." Then "open door", "go north": Storage West, with a tin of "Spam and Egz" and "A heavy-duty extendable ladder", +4 (score 12). The ladder is "currently collapsed and is around two-and-a-half meters long, but if extended would obviously be much longer." Eight meters of rift in the Admin Corridor: this is surely the bridge.

### Attempt 1, turns 166-176: Emptying my hands for the ladder
"take ladder": "Your load is too heavy. You'd need both hands free for the ladder." So I started shedding things, one click and one turn each: the bar, the key, the oil can, the laser, the canteen, then (after eating the brown goo, "delicious Nebulan fungus pudding") the survival kit. Each time the same sentence came back. With only the ID card and towel left I put the card in my uniform pocket and dropped the towel, and only then: "Taken." Eight turns to pick up one object, because the refusal never says what is actually in my hands, and "take all" / "drop all" style shortcuts don't exist for dropping. A **sleep** button also appeared in the Buttons row around turn 174 without any "you feel tired" message I noticed; I am treating it as a warning.

### Attempt 1, turns 177-187: Bridging the rift
With nothing but the ladder (and my ID card pocketed) I walked back east along the dead walkway and north to the rift; Floyd lost me for a while and then bounded in with "Floyd here now!". At the rift the ladder offered **open**, but "You couldn't possibly extend the ladder while you're holding it." So I dropped it, opened it ("extends to a length of around eight meters"), and a new verb appeared on it: **put across rift**. "The ladder swings out across the rift and comes to rest on the far edge." "go north": "You slowly make your way across the swaying ladder... sharp, pointy rocks" (+4, score 16). Two small interface slips: "open ladder" is offered while you are holding it, which can only fail, and "put across rift" stays on the list after the ladder is already spanning the rift. The contextual verbs themselves (open, then put across rift, only once extended) walked me through the puzzle nicely.

### Attempt 1, turns 188-194: A desk full of keycards
Admin Corridor North has three portals with signs: "Administraativ Awfisiz" (west), "Tranzportaashun Suplii" (north) and "Plan Ruum" (east). The exits on the list were bare "go north / go east / go west" without the room names the rest of the map shows, so the signs in the room text were the only guide. West: the Small Office. "open small desk": "a kitchen access card and an upper elevator access card" (+1 each). Further west, the Large Office with a picture window over the ocean and a wide wooden desk: "a shuttle access card" (+1, score 19). Cards at last, for all those card slots.

Meanwhile: "You're really tired now. You'd better find a place to sleep real soon." I am also still hungry-ish and thirsty with an empty canteen left behind in Storage West. The kitchen card should open the Mess Hall's south door, which is a plausible place for water. The dorm beds are on the far side of the rift, so I am heading back now rather than exploring north and east first.

### Attempt 1, turns 195-205: A race to bed
The tiredness warnings got steadily sharper on the way back ("If you don't get some sleep soon you'll probably drop", then "You can barely keep your eyes open"). Seven clicks from the Large Office to Dorm D, across the ladder and down the long walkway. (Correction to my note at 187: the exits do pick up their room names once visited, e.g. "go west, Small Office", so it's only unexplored exits that are bare. Consistent, just less helpful on first arrival.) In Dorm D a **bed** now had **get in**: "Ahhh...the bed is soft and comfortable. You should be asleep in short order." The "sleep" button vanished once I was in bed, so I clicked wait, and got a lovely nightmare about a shuttle, a giant spider web, and then "***** SEPTEM 7, 11344 *****... You wake up feeling refreshed". Floyd: "About time you woke up, you lazy bones!"

"While you slept, the things you were carrying slipped to the floor beside you." In bed, the three cards were listed with examine/read but no take; once I got out, a **take all** button appeared and picked them all up in one click. Good.

### Attempt 1, turns 206-220: The kitchen card, and a canteen of brown protein
Back to Storage West for the canteen, survival kit (green goo) and laser, then Mess Hall. Every card I carry now shows **slide through slot** at the slot, so I picked the kitchen card: "The kitchen door quietly slides open." Floyd, delighted, pulled out "a magnetic-striped card" of his own and waved it: something to remember. The Kitchen (+4, score 23) says outright "a machine near the door. You should probably examine it more closely": "an octagonal niche beneath a spout... Hii Prooteen Likwid Dispensur." My canteen is octagonal, so "put in: canteen" on the dispenser, then "push button": "fills almost to the brim with a brown liquid."

The liquid then appears as "quantity of protein-rich liquid" with examine / drop / **eat** but no "drink", and "eat" says "Thanks, but you're not hungry." Fair enough, I'll keep it for the next hunger warning. It also shows up in every "put in:" list (put the liquid in my uniform, in the laser, in Floyd), which is pure noise. More worrying: on entering the kitchen, "You notice that you feel a bit weak and slightly flushed, but you're not sure why." No option relates to it; I note it and move on.

### Attempt 1, turns 221-233: Up the elevator to the Tower Core
Back east to the Elevator Lobby (both doors open this time, and the lobby text said so). The hunger-and-thirst growl came on the long walkway, and "eat quantity of protein-rich liquid" now worked: "It certainly quenched your thirst and satisfied your hunger." So the liquid is food and drink in one, but the verb for drinking it is "eat", which I would not have guessed with a keyboard.

Behind the blue door is the Upper Elevator, and to my surprise the room list showed a **lower elevator access card** with take / read / slide through slot / **show to multiple purpose robot**. The room description did not mention it at all, so I think it is Floyd's card, dropped or offered; I clicked take and got it (+1, score 24) with no comment from Floyd. Then "slide upper elevator access card through slot": "Elevator enabled." The button entry's "push up" (by number): "The elevator door slides shut... vertical movement. Some innocuous Hawaiian music oozes from the elevator's intercom." During the ride "open blue door" was offered, which can't be right while moving; I waited twice and "The elevator door slides open", with no "you have arrived" line. "go south": **Tower Core** (+4, score 28), a small circular room with a spiral staircase up and exits northeast and southwest. The stairway is listed with **get in**, which is an odd verb for stairs. I stopped here at turn 233, at the edge of a new area with two access cards (shuttle, lower elevator) still unused.

### Friction log
| Turn | Where | What happened | Kind |
|---|---|---|---|
| 1-2 | Deck Nine | Blather's arrival inserted his verb block, so my queued "11" (meant: examine escape pod) became "salute Ensign First Class". Numbers shift whenever an NPC enters. | Confusing |
| 2 | Deck Nine | Salute got a good reaction ("Only five demerits"): NPC verbs on the list invite play. | Positive |
| 14 | Deck Nine | After the emergency bulkheads closed, "go east" and "go up" were still listed next to "open wide/narrow bulkhead", so I couldn't tell which exits were blocked. | Dead option |
| 15 | Escape Pod | Room text says "The bulkhead leading out is open" in the same reply as "The pod door clangs shut". | Text bug |
| 28-30 | Escape Pod | Nothing hinted that time was short after landing; I waited two extra turns. | Pacing |
| 31 | Escape Pod | A contextual "take all" button appeared when the kit and towel were revealed. One click. | Positive |
| 36 | Balcony | The plaque named in the room text was in a separate "Scenery" group below the fold; I reprinted the options to find it. | List too long |
| 40 | Courtyard | "go south, Winding Stair" and "go down, Winding Stair" both listed: two options, one destination. | List too long |
| 43 | West Wing | "go down" exit listed; it only says "Certain death." | Dead option |
| 45+ | Everywhere | "put in:" on the uniform/kit/canteen lists every carried item (goo blobs included), which bloats the Carried block to 40-75 entries. | List too long |
| 64 | Mess Hall | A contextual "slide through slot" verb appeared on the ID card next to the slot, which teaches the card-reader idea. | Positive |
| 76 | Dorm Corridor | The long walk is summarised in one line ("You walk down the long, featureless hallway..."). | Positive |
| 86 | Elevator Lobby | Both lobby doors opened while I was in the booth, with no message when I came back; "open blue door" was then refused as not on screen. | Silent state change |
| 88 | Upper Elevator | The printed phrase "push down" is refused ("What do you want to push?"); only the number works. | Unhelpful response |
| 92 | Lower Elevator | "go up"/"go down" listed as exits inside the elevator, but they only say "You'll have to use the elevator controls." | Dead option |
| 96 | Admin Corridor South | Examining the crevice revealed the key and added a take option at once. | Positive |
| 97 | Admin Corridor South | "take key" fails ("fingers are too large") with no hint of a tool verb on the list; fair as a puzzle. | Puzzle (stuck) |
| 107/132 | Storage East, Tool Room | "take all" fails item by item with "Your load is too heavy" and doesn't say what is heavy. | Unhelpful response |
| 116 | Reactor Control | The elevator door I had opened closed again with no message. | Silent state change |
| 122 | Machine Shop | 75 options on one screen. The canteen's "put under spout" is a good contextual hint, but it's buried. | List too long |
| 126 | Robot Shop | Floyd's wake-up is delightful. | Positive |
| 127 | Robot Shop | Floyd is listed as "multiple purpose robot", not by name; his menu has a bare "put" that answers "You can't do that", and there's no "give". | Dead option |
| 143 | Admin Corridor South | Holding the pliers gives no new verb on the key or crevice, and "take key" repeats "fingers are too large" without saying the pliers didn't help. | Unhelpful response |
| 153 | Tool Room | "examine curved metal bar": "I see nothing special". A U-shaped bar that might be a magnet gets no descriptive hint. | Unhelpful response |
| 159 | Admin Corridor South | Holding the U-shaped bar added "take with magnet" to the key: the right idea appeared as a button only when I held the right tool. | Positive |
| 163 | Mess Corridor | "take padlock" after unlocking: "Your load is too heavy" for a padlock, while carrying ordinary kit. | Unhelpful response |
| 168-176 | Storage West | "take ladder" repeated "You'd need both hands free for the ladder" through six drops; it never says what is still in my hands, and there is no "drop all". Eight turns to pick up one object. | Unhelpful response |
| 174 | Storage West | A "sleep" button appeared in the Buttons row with no tiredness message I could see. | Silent state change |
| 183 | Admin Corridor | "open ladder" is offered while holding it, and only answers "You couldn't possibly extend the ladder while you're holding it." | Dead option |
| 185-186 | Admin Corridor | Dropping and opening the ladder added "put across rift": contextual verbs led me through the bridge puzzle step by step. | Positive |
| 186 | Admin Corridor | "put across rift" stays on the ladder's menu after it already spans the rift. | Dead option |
| 187 | Admin Corridor North | Exits listed as bare "go north / go east / go west" with no names; only the signs in the room text say where they go. | Confusing |
| 189-194 | Small/Large Office | Opening two desks produced three access cards with clear take/read verbs, one point each. | Positive |
| 187/196 | Admin Corridor North | (Revised) exits gain their names once the room has been visited; only unexplored exits are bare. | Positive |
| 198-201 | Admin Corridor South to Dorm D | Escalating tiredness messages gave me enough warning to reach a bed; "get in" on the bed was right there. | Positive |
| 202 | Dorm D | Once in bed the "sleep" button disappears and nothing says to wait; I guessed "wait". | Confusing |
| 203-205 | Dorm D | Items slipped to the floor while I slept; after getting out, a single "take all" button recovered them. | Positive |
| 214 | Mess Hall | Every card grows "slide through slot" at the slot; one click opened the kitchen. | Positive |
| 218-220 | Kitchen | The protein liquid has "eat" but no "drink"; it is added to every "put in:" list (uniform, laser, Floyd). | List too long |
| 215 | Kitchen | "You feel a bit weak and slightly flushed" with no related option or explanation. | Confusing |
| 224-226 | Elevator Lobby | The protein liquid satisfies thirst too, but the only verb is "eat"; "drink" never appears. | Confusing |
| 227 | Upper Elevator | A "lower elevator access card" appears in the room list (not in the room text) with "show to multiple purpose robot"; no line says where it came from. | Silent state change |
| 229 | Upper Elevator | Every card grows "slide through slot"; the right card gave "Elevator enabled." | Positive |
| 230 | Upper Elevator | "open blue door" is offered while the elevator is moving. | Dead option |
| 232 | Upper Elevator | Arrival is only "The elevator door slides open", with no "you have arrived" or floor name; I waited twice not knowing how long the ride was. | Pacing |
| 233 | Tower Core | The spiral stairway is offered with "get in". | Text bug |

### Report
**How far the run got.** One attempt, no deaths, turns 0-233, final score 28. The earlier tester took the game from the Feinstein's Deck Nine through the escape pod landing, the Crag/Balcony/Courtyard, the whole western and southern complex (Rec Area, dorms, Mess Hall, long walkway, Elevator Lobby, Admin Corridor South, Storage East, Machine Shop, Robot Shop where Floyd was woken, Tool Room). From turn 158 I fished the key out of the crevice with the magnet, unlocked the padlock to Storage West, carried the ladder to the rift and bridged it, found three access cards in the offices, slept in Dorm D, opened the kitchen and filled the canteen with protein liquid, picked up a lower elevator card, and rode the Upper Elevator to the Tower Core. Still unexplored: the Transportation Supply (north) and Plan Room (east) off Admin Corridor North, the Tower Core's northeast, southwest and upward exits, the lower elevator and the shuttle. The combination dial in the Rec Area and the teleport booth are still unsolved.

**What worked in the click interface.**
- Contextual verbs that appear only when they make sense are the interface's best feature, and they carried every puzzle in my stretch: "take with magnet" on the key once I held the bar, "unlock with key" on the padlock, "put across rift" on the ladder once it was extended, "slide through slot" on each card beside a slot, "put in: canteen" on the dispenser.
- Contextual "take all" buttons (after the pod opens, after waking up with my things on the floor) save real effort.
- Exits labelled with room names once visited, and the one-line summary of the long walkway, make back-and-forth travel cheap. I walked the walkway six times without it feeling like a chore.
- The warning messages (tiredness, hunger) escalate in time for a player to react, and the dream sequence and Floyd's chatter give the long walks some life.
- Failed actions such as "take ladder" while overloaded did not cost a turn.

**What still hurts.**
- Load refusals don't explain themselves. "You'd need both hands free for the ladder" came back six times while I dropped one item at a time, and there is no "drop all" to shed a load. This cost eight turns.
- The "put in:" lists name every carried object, including goo, the protein liquid and the laser's own battery, so most screens run to 60-75 options and the useful verbs are buried.
- Dead or impossible options: "open ladder" while holding it, "put across rift" after it's done, "open blue door" while the elevator is moving, "go down" at the West Wing cliff, "go up/down" inside elevators.
- Silent changes: doors that open or close on their own, the sleep button appearing, and a card appearing in the elevator without any line of text.
- Verb mismatches: "eat" for a drink, "get in" for a staircase, the printed "push down" phrase that the parser refuses.

**The three changes I would make first.**
1. When "take" fails on weight or hands, name the problem items ("You're holding the laser, the canteen and the survival kit") and offer a "drop all" or "drop everything but..." button.
2. Trim "put in:" lists to plausible pairs (no food or liquids into uniforms or robots, no parts of the container into itself), or fold them behind one "put in..." entry per container, so screens fall back under about 30 options.
3. Remove options that can only refuse (actions on held objects that require dropping, finished actions like "put across rift", doors while in transit, exits that only say "Certain death"), and print a one-line notice whenever something on the list changes by itself (a door opening, an item appearing).

### Verdict
The click interface is genuinely playable: contextual verbs turned every puzzle I met (magnet, padlock, ladder, cards, dispenser) into a fair "hold the right thing and look for the new button" moment, and I reached the Tower Core with 28 points and no deaths. What slows it down is volume and silence: bloated "put in:" lists, refusals that don't say what's wrong, and state changes that happen without a line of text.
