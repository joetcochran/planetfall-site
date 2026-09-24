# Round 4: click-4, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 4, 10 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Observation Deck, turn 221, with 23 points.
- **Commands:** 229, with no deaths

The diary below is `playtests/2026-09-10/2026-09-10-click-4.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest: session `click-4`
**Who:** Claude (blind agent tester, mouse-only, no prior knowledge used) **Date:** 2026-09-10  **Session:** `click-4` (`node scripts/playtest.mjs --session click-4 --new --click`)

### Attempt 1, turns 1-40: Deck Nine, the explosion, and a sinking pod

I start as a lowly Ensign Seventh Class with a scrub brush on Deck Nine. The option list is long even here (25 entries), but grouped sensibly: Exits, Buttons, In the room, Carried. I read my ID card first ("Special Assignment Task Force"), then Ensign First Class Blather swaggered in and a whole new "Characters" block appeared with "salute", "attack", "throw at: scrub brush". Saluting got me "Only five demerits", which felt like the game rewarding me for picking the obvious polite option.

I wandered east (Reactor Lobby) and up (Deck Eight), and both times Blather appeared and ordered me back to Deck Nine. Worth noting: the Reactor Lobby text mentions the Ion Reactor to starboard and Auxiliary Control aft, but the only exit on the list was "go west, Deck Nine". That is actually a helpful signal ("nothing else to do here"), but it contradicts the prose. Same on Deck Eight: the Jump Machinery Room is "to fore" but not listed.

Back on Deck Nine an alien ambassador handed me a brochure (a cute joke about the game itself) and dripped slime. I hoped the scrub brush could clean the slime, but there is no "clean" or "scrub" option anywhere, so I let it go. The celery was listed under "In the room" with only examine/eat, no take. After a couple of waits: "A massive explosion rocks the ship... The door to port slides open." The obvious move was the escape pod, which gave me my first 3 points.

Inside, "safety web: get in" was the clear choice. Then a long run of waiting (about 13 "wait" turns) as the pod ejected, the Feinstein blew up, and the pod flew to an ocean planet and landed "precariously balanced" on a cliff. The landing opened a panel with a survival kit and a towel, but while I was in the web there was no "take" option for them, only examine/read. So I had to get out first, which tipped the pod into the sea. Then "take all" (nice that it appeared as a button), "open escape pod bulkhead" (water rushes in), "go up / out", "go up" again, and I was on a Crag with 6 points.

The kit holds red, brown and green goo, clearly food. The towel says "Don't Panic!". Ahead: a small structure eight meters up the cliff.

### Attempt 1, turns 41-72: Up the cliff into an abandoned complex

From the Crag I climbed to a Balcony whose plaque is written in a phonetic "corrupt Galalingua" ("Xis stuneeng vuu uf xee Kalamontee Valee..."), which I enjoyed decoding. Up the Winding Stair to a ruined castle Courtyard. The West Wing is a dead end ("move rubble" just says "A valiant attempt."). North of the courtyard the architecture turns modern: Plain Hall, then a Rec Area with a locked door and "combination dial: set to a number <value>". I have no number yet, so I parked that.

East of the Rec Area is a hub of corridors and dormitories. I dutifully walked Dorm A, B and D and their "SanFac" toilets; all empty and identical text. That was a lot of clicks for nothing, though it is honest exploration. The Mess Corridor has a padlocked small door; the Mess Hall south of it had an octagonal canteen (taken, empty) and a card slot. Once I held my ID card a new option appeared right on the card: "slide through slot". I liked that the game surfaced the verb on the item as soon as it was relevant, but the reply was "Inkorekt awtharazaashun kard...akses deeniid." So I need a different card.

Interface notes. The carried-items block now dominates the list (brush, chronometer, uniform, ID, brochure, towel, kit, three goos, canteen: roughly 40 entries), so the room's own options get buried in the middle. I made one real mistake: I chained "take canteen" (11) and "examine slot" (16) in one go, but taking the canteen removed it from the room list, all numbers shifted up, and 16 became "examine chronometer". Numbers are only valid for one screen. Typing the printed phrase ("examine slot") is much safer and it works. When I typed an exit that was not listed ("go east" in the Mess Hall) the game politely refused without spending a turn, which is good.

### Attempt 1, turns 73-108: Long hall, elevators, a key I cannot reach

A long walk east along a dead walkway ("You walk down the long, featureless hallway for a long time") brought me to the Corridor Junction and an Elevator Lobby with a blue door/button (north) and a red door/button (south), plus a phone-booth-sized room to the east. The booth is "Booth 2" with a slot and buttons "1" and "3"; pushing one says "Teleportaashun buux not aktivaatid." So: teleporters, needing power or a card.

Pushing the blue and red buttons summoned both elevator cars (I liked the follow-up line "The red door has opened since you were last here."). Both cars have Up/Down buttons and a slot; the buttons say "The slot beside the buttons stays dark" and my ID card is "Inkorekt". There is clearly a family of access cards to find: mess hall, elevators, maybe the teleporter.

A hunger warning arrived with a helpful hint: "The goo in your survival kit would take care of both." I ate the red goo (cherry pie, also quenches thirst). I appreciated that the game told me exactly what to do instead of letting me starve.

North of the junction: Admin Corridor South has a crevice with "a shiny steel key!" in it. The key immediately showed up as a room object with "take", but taking it says "Either the crevice is too narrow, or your fingers are too large." So I need a tool, and I noted it. Further north is a gaping rift, 8 m wide and 30 m deep, and the list still offers "go north" there, which I did not dare click. West of that is Systems Monitors with red status lights for PLANATEREE DEFENS, KORS KUNTROOL, KUMUUNIKAASHUNZ and PRAJEKT KUNTROOL, which reads like the game's big to-do list.

I have switched to typing the printed phrases ("go south / out", "push red button") rather than numbers. It is noticeably more robust because the numbers renumber every turn.

### Attempt 1, turns 109-142: Storerooms, a magnet, and Floyd

South of the junction is the mechanical wing, and it is packed. Storage East had an oil can and a cardboard box of electronics (a cracked fromitz board, B- and K-series megafuses, a good ninety-ohm bedistor). My inventory hit its weight limit here, and the game handled it gracefully: "Your load is too heavy. Dropping the Patrol-issue ... scrub brush would make enough room." Dropping the brochure first did not help (it kept naming the brush), so the hint is specific and correct. I dropped the brush and brochure in Storage East.

Reactor Control has an elevator (card slot again, "slot stays dark") and a dark stairway down that I avoided for lack of a light. The Tool Room is the jackpot: a glass flask, a U-shaped metal bar with "a few metal filings" on its ends (a magnet, surely), wide-nosed pliers, and a portable laser with a six-setting dial and an old battery. The weight limit bit again: I dropped the cardboard box in the Tool Room to carry the magnet; the laser would have cost me the ID card, so I left it for now. Next door the Machine Shop has a chemical dispenser with nine coloured buttons (cooling fluids, catalysts, base, acid) and a spout, which will obviously pair with the flask.

The Robot Shop had one robot "close to being in working order". "turn on" gave a faint hum and 2 points, and one wait later: "Hi! I'm B-19-7, but to everyperson I'm called Floyd." Milestone: a robot companion. He follows me room to room ("Floyd bounds into the room. 'Floyd here now!'"), which is charming. His Characters block is huge (examine, look inside, talk to, salute, attack, listen to, search, turn on, turn off, throw at six items), and "talk to" just gets "Hi!".

Then back to the crevice, where the key now offered "take with magnet". That is great affordance design; the only oddity is that the item in my inventory is called "curved metal bar" while the option says "magnet", so the option names what I had only guessed. With a clank the key jumped onto the magnet and I have a steel key. My guess is the padlocked door in the Mess Corridor.

### Attempt 1, turns 143-174: Padlock, ladder, rift crossed, three access cards

The key did open the padlock ("unlock with key" appeared right on the padlock), though the door then said "cannot be opened until the padlock is removed", so I had to "take padlock" and drop it. A small extra step, and the reply named it. Behind the door: Storage West with a "Spam and Egz" tin and a heavy-duty extendable ladder, 2.5 m collapsed. The rift is 8 m. Obvious plan.

The ladder is heavy: "You'd have to drop the survival kit, the towel, the canteen, the oil can and the curved metal bar first." I dropped all five in Storage West. This turned out to be a trap I set myself: the goo is in the kit, and the goo blobs in the dropped kit only offer "examine" and "eat", not "take", so I could not pocket one blob and leave the rest. I left my food behind.

At the rift the carried ladder offered "throw into rift" (which I read as "lose it forever") but no "extend". I guessed that dropping it would change its verbs, and it did: on the floor it had "open", which extended it to eight meters, and then "put across rift". That drop-then-open dance was a guess; a player who never drops the ladder would be stuck. The crossing gave me 4 points and a nice line about "sharp, pointy rocks at the bottom of the rift, far below".

Admin Corridor North leads to offices. The Small Office desk held a kitchen access card and an upper elevator access card, the Large Office desk a shuttle access card (a point for each). Then two needs arrived at once: hunger ("The goo in your survival kit would take care of both", but the kit is across the map) and "You begin to feel weary... finding a nice safe place to sleep." Time to head back west: food first, then a bed in the dorms, then try the kitchen and the upper elevator.

### Attempt 1, turns 175-200: Food, a ruined card, and a night's sleep

The walk back west across the ladder took eight moves. In Storage West I tried "eat blob of brown goo" straight from the kit on the floor, since the option was on screen, and got "You're not holding the survival kit." So that option was offered but could not work. I took the kit, ate (fungus pudding), and gathered the rest with "take all".

Then my first real mistake of the run. In the Mess Hall I slid the kitchen access card through the slot and got: "Magnetik striip randumiizd...konsult Prajekt Handbuk abowt propur kaar uv awtharazaashun kardz." I had been carrying the U-shaped magnet in the same pockets as the cards since the Small Office. Dropping the magnet and retrying gave the same message, so the card is permanently scrambled. Nothing warned me when I picked up the cards while holding the magnet, and nothing on the card's options (examine, drop, read, slide) hints that it is ruined; I only learn at the slot. The upper elevator and shuttle cards travelled with the magnet too, so they are probably scrambled as well. This may have made the game unwinnable, and I only find out much later. It is the classic design of the original, I suspect, but in a click UI with no "undo" it hurts. I left the magnet in the Mess Hall.

Separately, "go south / in" stayed on the list in front of the closed kitchen door; it says "The door is closed." without using a turn.

The tiredness warnings escalated ("You're really tired now"), and a "sleep" button appeared on the Buttons row, which was helpful. I went to Dorm A, "get in bed", "sleep", one wait, and woke on a new day (SEPTEM 7) with my possessions on the floor. "take all" fixed that in one click.

### Attempt 1, turns 201-221: Up the elevator to the tower (stopping here)

Good news after the scare: the upper elevator card still worked ("A recorded voice chimes 'Elevator enabled.'"). So the magnet only ruined the kitchen card, or only the card it touched first. I still do not know which, and nothing on screen tells me; the cards look identical in the list. Up and a two-turn ride later, I stepped out into the Tower Core (+4, score 23). Milestone: elevator ridden.

Up the spiral stair is a Helipad with a rusted helicopter; inside, its control panel is "closed and locked" and the lock has only "examine", so my steel key is not the answer. The hunger warning fired again only about 15 turns after waking, so I ate my last goo (green, lima beans). I now carry only the unopened Spam tin and have seen no opener, so food is becoming a real clock.

The Comm Room is the story payoff: a playback of the Feinstein's last transmission ("Please respond on frequency 48.5 ... SPS Feinstein to planetside ..." cut off by an explosion), a screen announcing "Planitwiid plaag haz struk entiir popyuulaashun", and a send console with a "Malfunkshun in Sendeeng Kuulint Sistum", a funnel-shaped hole for coolant, and a green light on the enunciator. That connects straight to the Machine Shop's coloured cooling-fluid buttons and the glass flask in the Tool Room, so my next step would be: fetch the flask, dispense green coolant, pour it into the funnel. The Observation Deck shows a second island 20 km east.

I stopped at turn 221, a little over budget, with a clear next goal but not stuck.

### Friction log
| Turn | Where | What happened | Kind |
|---|---|---|---|
| 6 | Reactor Lobby | Prose mentions Ion Reactor (starboard) and Auxiliary Control (aft), but only "go west" is offered; no explanation why | Confusing |
| 7 | Deck Nine | On returning, every option in the room is re-flagged "(new)", even ones I saw two turns ago | Confusing |
| 11 | Deck Nine | No "clean"/"scrub" option for the slime even though I carry a scrub brush; celery has no "take" | Action not on list |
| 16 | Deck Nine | Explosion plus "door to port slides open" makes the escape pod the obvious move | Positive |
| 18-31 | Escape Pod | About 13 consecutive "wait" turns during the descent; atmospheric but slow in a click UI | Pacing |
| 24 | Escape Pod | Exit label silently changed from "go east / out" to "go up / out" (pod orientation changed) | Silent state change |
| 31 | Escape Pod | Towel and kit appear but no "take" while in the web; must stand up first, which sinks the pod | Confusing |
| 34 | Escape Pod | "take all" appears as a button when loose items are around; very convenient | Positive |
| 42 | Balcony | Plaque in phonetic Galalingua is fun and readable | Positive |
| 46 | West Wing | "move rubble" offered on a dead end, reply "A valiant attempt." | Dead option |
| 49 | Rec Area | "combination dial: set to a number <value>" is clear about what kind of input it wants | Positive |
| 53-72 | Dorms/SanFacs | Four identical dorm and toilet rooms with only examine options; many clicks, no content | Pacing |
| 63-64 | Mess Hall | After "take canteen" all numbers shifted, so my next number hit "examine chronometer" instead of "examine slot" | Confusing |
| 64 | Mess Hall | Carried block (~40 entries) dwarfs the room block; room options are buried | List too long |
| 64 | Mess Hall | "ID card: slide through slot" appears on the card itself once a slot is present | Positive |
| 68 | Mess Hall | Unlisted "go east" refused without spending a turn | Positive |
| 80 | Booth 2 | "Teleportaashun buux not aktivaatid" is a clear, flavorful "not yet" | Positive |
| 84 | Elevator Lobby | Hunger warning says outright that the goo will fix it | Positive |
| 88-93 | Elevators | Up/Down both dead with the "slot stays dark" hint; ID card rejected; I know I need another card | Puzzle (stuck) |
| 91 | Elevator Lobby | "The red door has opened since you were last here." nicely reports an off-screen change | Positive |
| 98 | Admin Corridor South | Key shown with a live "take" option that can never work by hand; a "take" that is really a hint | Dead option |
| 101 | Admin Corridor | "go north" is offered straight into an 8 m, 30 m-deep rift with no warning in the label | Confusing |
| 87-108 | everywhere | Numbers renumber every turn; typing the printed phrase is the reliable way to play | Confusing |
| 110 | Storage East | "Your load is too heavy. Dropping the ... scrub brush would make enough room." tells me exactly what to drop | Positive |
| 111 | Storage East | Dropping a different item (brochure) first did not free enough room; the weight limit is tight with this many small items | Pacing |
| 128 | Tool Room | Laser costs me the ID card to carry; lots of inventory juggling across rooms | Pacing |
| 131 | Machine Shop | Nine dispenser buttons plus the carried block push the list past 60 entries | List too long |
| 135 | Robot Shop | Floyd wakes up and introduces himself; he follows me with fun lines | Positive |
| 136 | Robot Shop | Floyd's block has ten verbs, most of them flavour ("salute", "look inside", "search"); "talk to" only says "Hi!" | List too long |
| 141 | Admin Corridor South | Key gains "take with magnet" once I carry the bar; the label says "magnet" though the item is "curved metal bar" | Positive |
| 145 | Mess Corridor | "unlock with key" appears on the padlock as soon as I carry the key | Positive |
| 147 | Mess Corridor | Unlocked padlock must still be taken off before the door opens; reply explains it | Positive |
| 152 | Storage West | Ladder needs five items dropped; the reply lists all five, which is clear | Positive |
| 158 | Storage West | Goo blobs inside the dropped kit offer only examine/eat, no "take", so I cannot carry one blob and leave the rest | Action not on list |
| 158 | Storage West | Carried ladder shows "take", which does nothing useful for an item already in hand | Dead option |
| 163 | Admin Corridor | Carried ladder offers "throw into rift" but not "extend"/"open"; I had to drop it to see "open" and then "put across rift" | Confusing |
| 165 | Admin Corridor | Hunger hint says "the goo in your survival kit" even though the kit is lying rooms away | Unhelpful response |
| 166-167 | Admin Corridor | Ladder across the rift, swaying crossing text, +4 | Positive |
| 169-173 | Offices | Desks reveal three access cards, one point each | Positive |
| 183 | Storage West | "eat blob of brown goo" offered on the kit lying on the floor, then refused ("You're not holding the survival kit") | Dead option |
| 190 | Mess Hall | Kitchen card "Magnetik striip randumiizd": carrying the magnet with the cards ruined them, with no warning at pickup and no sign on the card afterwards | Puzzle (stuck) |
| 190 | Mess Hall | "go south / in" stays listed in front of a closed door (no turn spent) | Dead option |
| 189 | Mess Hall | With cards, kit and Floyd, the list reaches 75 entries; "put in:" lists repeat ten item names | List too long |
| 189 | Mess Hall | "sleep" appears as a button once tired | Positive |
| 198-200 | Dorm A | Items slip to the floor while sleeping; "take all" recovers them in one click | Positive |
| 207 | Upper Elevator | Upper elevator card still works despite the magnet; nothing on screen says which cards are ruined | Confusing |
| 208-211 | Upper Elevator | Card, Up, a short ride, door opens, +4 at Tower Core; clean sequence | Positive |
| 212 | Helipad | Hunger returns about 15 turns after waking; food is scarce; after the last goo I only have an unopened Spam tin and no obvious opener | Pacing |
| 214 | Helicopter | "lock" offers only "examine", which signals the key does not fit here | Positive |
| 218-219 | Comm Room | Recorded Feinstein message and plague screen give the story and a clear coolant goal (green light, funnel) | Positive |

### Report

I played 221 turns in one attempt without dying and finished with 23 points. The route: Deck Nine, the explosion and escape pod, the sinking landing, the cliff climb to the castle, the dorm and mess complex, the long corridor to the elevator lobby, the mechanical wing (storage, tool room, machine shop, robot shop), the rift, the administrative offices, and finally the upper elevator to the Tower Core, Helipad, Comm Room and Observation Deck. Milestones reached: woke up the robot companion Floyd (who followed me everywhere after that), fished a key out of a crevice with a magnet, opened the padlock, extended the ladder and crossed the chasm, collected three access cards, slept through a night, and rode the upper elevator. I did not get into the kitchen (card scrambled), the lower or reactor elevators, the teleport booth, the helicopter, the Rec Area combination door, or the dark stairway, and I had not started the coolant puzzle.

What worked: the grouped options list (Exits, Buttons, In the room, Carried, Characters) is readable, and context verbs appearing on the right object at the right moment are the best thing about this interface: "slide through slot" on cards near a slot, "take with magnet" on the key, "unlock with key" on the padlock, "put across rift" on the extended ladder, "sleep" on the Buttons row when tired, "take all" when things are lying around. The weight-limit messages name exactly what to drop, the hunger warning names the fix, and refused actions (an unlisted exit, walking into a closed door) cost no turn. Typing the printed phrase instead of a number made play robust.

What still hurts: (1) the list is far too long once you carry things. By mid-game the Mess Hall screen had 75 entries, most of them in the Carried block, with "put in:" and "throw at:" repeating ten item names each and Floyd carrying ten mostly flavour verbs, so the room's own options get lost. (2) Numbers are only valid for a single screen; taking one item renumbered everything and my next click hit the wrong object. (3) Some options are offered that cannot work: "eat" on goo inside a kit on the floor, "take" on the unreachable key, "take" on a ladder already in hand, "go south / in" at a closed door, "move rubble". (4) Some needed verbs are hidden until you do something unrelated: the carried ladder has no "extend"/"open", and only appears after you drop it. (5) The magnet silently scrambled my kitchen card with no warning at pickup and no visible state on the card, and I only learned at the slot, rooms and many turns later. With no undo in a click UI, that is the kind of thing that makes a player quit.

The three changes I would make first:
1. Collapse the Carried block: show each held item as one line (name plus its two most useful verbs), with everything else behind a per-item expander, and move "put in:"/"throw at:" to the target instead of repeating every item on every container. Hide Floyd's flavour verbs (salute, look inside, search) behind a "more" link.
2. Keep option numbers stable within a room (for example, key them to the object so taking one item does not renumber the rest), or at least keep exits and buttons at fixed numbers.
3. Stop offering options that cannot succeed in the current state (eat from a container you are not holding, take an item already held, enter a closed door), and show verbs that only need a pre-step (let "extend" appear on the carried ladder, or have it drop and extend automatically). While there, add a visible state to a scrambled card (for example "kitchen access card (scratched strip)") so the player learns about the magnet when it happens.

### Verdict

The click interface carries the game well: I got through a third of the map, met Floyd, crossed the rift and rode the elevator using only listed options, and the context-sensitive verbs often felt like the game was quietly helping. What holds it back is list bloat from inventory, numbers that shift every turn, and a handful of offered-but-impossible or hidden-until-you-guess actions; fix those and it would be a pleasant way to play a classic.
