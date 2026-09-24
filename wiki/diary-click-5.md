# Round 5: click-5, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 5, 10 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Tower Core, turn 215, with 23 points.
- **Commands:** 222, with no deaths

The diary below is `playtests/2026-09-10/2026-09-10-click-5.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest: session `click-5`
**Who:** Claude (blind, mouse-only playtester; no prior look at code or docs)  **Date:** 2026-09-10  **Session:** `click-5` (`node scripts/playtest.mjs --session click-5 --new --click`)

### Attempt 1, turns 0-11: Scrubbing duty on Deck Nine

I open on Deck Nine as a lowly Ensign Seventh Class with a scrub brush, a chronometer, a uniform and an ID card. The option list is long from the very first screen (27 entries) but it is well grouped: Exits, Buttons, In the room, Carried. The escape pod is the obvious "Chekhov's pod", so I examined it first ("I see nothing special") and that was the turn Ensign First Class Blather swaggered in to hand me thirty demerits. A "salute" button appeared under a new "Characters" heading, marked "(new)", and I clicked it: "First right thing you've done today. Only five demerits." That was a nice moment: the interface put a socially correct verb right in front of me.

I read the ID card (ID number 6172-531-541, noted in case it matters), then stepped east into the Reactor Lobby just to look, and Blather bellowed at me to get back. I went back. An alien ambassador arrived, dripped slime on my deck, and handed me a brochure (a cute self-referential joke). I badly wanted to scrub the slime with my scrub brush, since that is literally my job, but neither the slime ("examine" only) nor the brush ("examine", "drop") offers anything like "clean" or "scrub". The ambassador left up the gangway taking his celery with him. I am now waiting beside the escape pod because the intro text strongly suggests something is about to happen.
### Attempt 1, turns 12-36: Explosion, escape pod, splashdown

Blather came back for a second helping; I saluted again (five demerits) and he stomped off. I kept clicking "wait" next to the pod, and at turn 15 "A massive explosion rocks the ship... The door to port slides open." The "open escape pod bulkhead" option quietly vanished from the list, which was actually a helpful confirmation that the door was open. I lost one turn to a double wait (my fault) while bulkheads crashed shut, then clicked "get in escape pod" (+3 points) and "get in safety web". The web let me ride out a long, well-paced launch sequence: the Feinstein blowing up, the pod stabilising, re-entry, and a landing on a cliff-ringed island topped with buildings. About twelve "wait" clicks felt like a lot, but each one had fresh text so it read as a cutscene rather than dead time.

On landing a panel revealed a survival kit and a towel, but while I was in the web neither had a "take" option. I got out (the pod slid and began to sink), then "take all" grabbed both. A small snag here: in the same room the option numbers were reshuffled when I stood up (the exit was 33, then became 1; 13 went from "light" to "towel"), even though the footer promises numbers keep their meaning in a room. I clicked "go up / out" and got "The pod door is closed", though the room description had earlier said "The bulkhead leading out is open" and the list still offered "open escape pod bulkhead". Opening it flooded the pod, "go up / out" put me Underwater, and "go up" again got me to a Crag (+3, score 6). The kit holds red, brown and green goo, each with an "eat" option. I am not hungry yet, so I am keeping them. A structure clings to the cliff eight metres up, and "climb up" is right there.
### Attempt 1, turns 37-53: Up the cliff into an abandoned complex

"go up" from the Crag took me to an octagonal Balcony. The plaque is written in phonetic mangled Galalingua ("SEENIK VISTA ... Xee larj bildeeng at xee bend in xee Gulmaan Rivur..."), which was fun to decode. The towel says "Don't Panic!". Up the winding stair is a ruined castle Courtyard. The inventory section of the list was getting long (the three goo blobs each had examine/drop/eat), so I clicked "close survival kit" and the blobs folded away. That worked well as a way to tidy the list myself.

West Wing is a dead end with rubble. "move rubble" only said "An interesting idea...", a stock brush-off. North leads to a more modern Plain Hall, then a Rec Area with a locked door and a combination dial "set to a number <value>" from 0 to 1000. That is the first lock. I have no number yet (the ID number 6172-531-541 is too big), so I am exploring. Exits that I have already visited now carry their destination name ("go west, Rec Area", "go southwest, Plain Hall"), which is really helpful for mapping in my head. Dorm B and SanFac B are empty flavour rooms.
### Attempt 1, turns 54-72: Dorms, a padlock, and a card slot

I swept the dormitory wing: Dorms A, C and D with their SanFacs are copies of B and hold nothing, which cost me about ten clicks for no gain. The Mess Corridor has a small north door "hooked with a simple steel padlock"; the padlock only offers "examine", so that is a lock for later. In the Mess Hall I took an octagonal canteen and noticed something clever: the ID card suddenly grew a "slide through slot" option because there is a slot by the south door. The interface is basically telling me which item goes with which scenery, which is great for a mouse player. Sadly my Patrol ID gets "Inkorekt awtharazaashun kard...akses deeniid." So I need a local card. I opened the canteen; the reply was just "Opened." with no mention of contents, so I assume it is empty. Next I am heading east down the long corridor with the dead motorised walkway.
### Attempt 1, turns 73-97: Elevators, a teleport booth, hunger, and a key in a crack

The long walk east ("You walk down the long, featureless hallway for a long time") was a single click, which I appreciated. The Elevator Lobby has a blue door with a blue button, a red door with a red button, and a telephone-booth sized "Booth 2". Pushing blue gave "a faint whirring noise", red "begins vibrating a bit". Neither door visibly opened in the text, but "go north" walked straight into an Upper Elevator, so the push had opened it silently. Both elevators and the booth want a card in a slot ("Nothing happens. The slot beside the buttons stays dark"; "Teleportaashun buux not aktivaatid."). So I now know at least three card readers and one locked door, and I have no working card.

In the Lower Elevator my stomach growled, and the game kindly added "The goo in your survival kit would take care of both." I reopened the kit, examined the red goo (cherries) and ate it: "tasted just like scrumptious cherry pie." Closed the kit again to keep the list short.

North of the junction, Admin Corridor South has a crevice. Examining it: "a shiny steel key!" A "key: take" option appeared, but "Either the crevice is too narrow, or your fingers are too large." I suspect the key fits the Mess Corridor padlock. I need something thin, sticky, or magnetic to fish it out; nothing I carry offers a "put in crevice" or similar option yet, so I will look for a tool. (I briefly wandered into SanFac E before noticing the key row.)
### Attempt 1, turns 98-117: The rift, a box of parts, and a dark stairway

North of the crevice the Admin Corridor ends at "a gaping rift, at least eight meters across and thirty meters deep". That is surely the chasm I will have to cross later. Systems Monitors, to the west, is lore: LIIBREREE, REEAKTURZ and LIIF SUPORT are green, while PLANATEREE DEFENS, KORS KUNTROOL, KUMUUNIKAASHUNZ and PRAJEKT KUNTROOL are malfunctioning. That reads like a to-do list for the whole game.

South of the junction is the mechanical wing. Storage East had an oil can and a cardboard box of electronics (cracked fromitz board, B- and K-series megafuses, a good ninety-ohm bedistor). Taking the box hit a weight limit, and the refusal was excellent: "Your load is too heavy. Dropping the Patrol-issue ... scrub brush would make enough room." It named the exact item to drop. I dropped the brush and the useless brochure and took the box. (For a moment I thought dropped items vanished from the room list, but that was my own output filter; "look" showed them correctly.)

Physical Plant is scenery. Reactor Control has a reactor elevator (its button opened the doors) and "A dark stairway winds downward". Going down gave the classic "It is pitch black. You might be eaten by a grue." I have no light, so I am backing out right away.
### Attempt 1, turns 118-134: A chemical dispenser and Floyd wakes up

The reactor elevator is yet another card slot. Mech Corridor South leads to a Machine Shop with a dispensing machine: four red/blue/green/yellow "KUULINTS" buttons, three "KATALISTS", and white "BAAS" and "ASID" buttons. The list here reached 71 numbered options. I tried to trim it by clicking "close cardboard box", but it answered "There's no way to close it.", so that option was offered but dead. The canteen gained a context verb, "put under spout", which is a strong hint. I set it there and pushed blue: "the mouth of the canteen is very narrow, and the fluid just splashes over it." So the canteen is not the right vessel (or not yet). I took it back.

East is the Robot Shop with "one robot, about four feet high" that looks nearly working. "turn on" gave "Nothing happens. Then again, you notice a faint hum" (+2, score 8), and one wait later: "Hi! I'm B-19-7, but to everyperson I'm called Floyd... Let's play Hider-and-Seeker you with me." Robot companion found! His row lists examine, look inside, talk to, salute, attack, listen to, search, turn on/off, throw at. "look inside" made him giggle ("You're tickling Floyd!"). What I miss is any way to ask him to do something: there is no "ask Floyd to..." or "give to Floyd" entry, and "talk to" only gets "Hi!". My plan is to bring him to the crevice, since a small robot might have small fingers, and see whether the list offers anything there.
### Attempt 1, turns 135-163: Magnet, key, padlock, and a ladder

Floyd tagged along ("Floyd follows you", "Floyd here now!"). Southwest of Mech Corridor South is a Tool Room: a glass flask, "a metal bar, curved into a U-shape", wide-nosed pliers, and an "Akmee Portabul Laazur" with its own "set to a number <value>" dial and an old battery. Examining the bar: "A few metal filings cling to its ends." That is a magnet, and I thought of the crevice key at once. "take all" ran into the weight limit, but the per-item refusals again said exactly what to drop, which is very usable. I left the cardboard box behind, took the magnet and the flask, and left the laser for now.

Back at the crevice the key row had grown "take with magnet". It does give away that the bar is a magnet (the item list still calls it a "curved metal bar"), but for a mouse player that pairing is what makes the puzzle solvable without typing. "With a spray of dust and a loud clank ... It is a steel key!" At the Mess Corridor the padlock offered "unlock with key", and it sprang open. "open door" then said "The door cannot be opened until the padlock is removed." Fair enough, but the list had offered "open door" as if it would work. "take padlock", "open door", north into Storage West (+4, score 12): a tin of "Spam and Egz" and "A heavy-duty extendable ladder". That ladder is obviously for the rift.

The ladder is heavy: "You'd have to drop the survival kit, the towel, the canteen, the oil can and the glass flask first." I made Storage West my depot and spent six clicks dropping things one at a time. A "drop all except..." or a multi-drop would have saved most of those. Floyd meanwhile wants to play Hucka-Bucka-Beanstalk.
### Attempt 1, turns 164-180: Crossing the rift, three access cards

Carrying the ladder to the rift revealed the verb chain nicely. The ladder row offered "open" and a scary "throw into rift". "open" while holding it: "You couldn't possibly extend the ladder while you're holding it." I dropped it, and the stomach growl came back at that moment; my goo is back at the depot, which I noted with some worry. "open ladder" then gave "The ladder extends to a length of around eight meters." A new "put across rift" option appeared, and "The ladder swings out across the rift and comes to rest on the far edge". Having "throw into rift" sitting right beside "put across rift" is a real trap for a careless clicker.

"go north": "You slowly make your way across the swaying ladder..." to Admin Corridor North (+4, score 16). The portals are signed Administraativ Awfisiz (west), Tranzportaashun Suplii (north) and Plan Ruum (east). West, the Small Office desk held a kitchen access card and an upper elevator access card. Further west, the Large Office desk held a shuttle access card (score 19). Three cards for the slots I found earlier: the Mess Hall kitchen door, the upper elevator, and probably the shuttle somewhere. I also got "You begin to feel weary... time to think about finding a nice safe place to sleep", and a "sleep" button appeared among the Buttons. I saved, then decided to head back to the depot to eat and to the dorm beds to sleep before exploring further.
### Attempt 1, turns 181-199: The long walk home, dinner, and a night's sleep

I used the printed phrases ("go east", "go south") for the walk back, which is faster to plan than looking up numbers after every room change. Back over the ladder, down the admin wing, along the long walkway hall, to the Storage West depot: seven clicks. I took the survival kit and ate the green goo ("yummy lima beans"). Then Rec Corridor, Dorm B, "get in bed" ("You should be asleep in short order"). The Buttons row now read "sleep (very tired)", which is a lovely touch: the button itself tells you how urgent it is. One "sleep" and one "wait" later came a dream-free night, "SEPTEM 7, 11344", and "While you slept, the things you were carrying slipped to the floor beside you." Floyd: "About time you woke up, you lazy bones!" "get out of the bed" and one "take all" picked everything up again in a single click. Good.
### Attempt 1, turns 200-215: A scrambled card and an elevator ride

I went straight to the Mess Hall door. Every card I carry now shows "slide through slot" there, which is honest (you have to find out which card fits by trying) but produces four near-identical rows. I slid the kitchen access card: "Magnetik striip randumiizd...konsult Prajekt Handbuk abowt propur kaar uv awtharazaashun kardz." My heart sank. I had carried the cards around in the same pockets as the U-shaped magnet ever since the offices. The kitchen card is apparently ruined. I never saw a warning or a status change on the card itself: its row and its examine text looked the same before and after. That is a harsh, silent trap, and I only understand it because I happen to know that magnets wipe magnetic strips.

To see whether all my cards were dead, I walked to the Elevator Lobby (both coloured doors now read "open"; pushing blue now "doesn't seem to do anything") and slid the upper elevator access card in the Upper Elevator: "A recorded voice chimes 'Elevator enabled.'" It survived. "push up button": "The elevator door slides shut. After a moment, you feel a sensation of vertical movement." Two waits of travel, "innocuous Hawaiian music", another hunger pang (I ate my last goo, the brown one, "Nebulan fungus pudding"). Then "go south / out" put me in the Tower Core (+4, score 23): a circular room with a spiral staircase up and exits northeast and southwest. I stopped here at turn 215, over my budget, with the shuttle card unused and my food gone except the unopened tin of "Spam and Egz" back at the depot.
### Friction log

| Turn | Where | What happened | Kind |
|---|---|---|---|
| 0 | Deck Nine | 27 options on the first screen, but grouped (Exits / Buttons / In the room / Carried) so it scans fine | Positive |
| 3 | Deck Nine | "salute" appeared as a (new) option under Characters when Blather arrived; clicking it reduced demerits | Positive |
| 6 | Deck Nine | Option numbers all shifted after leaving and re-entering the room (open bulkhead 3 stayed, but everything past 10 moved) | Confusing |
| 8 | Deck Nine | Slime on the deck and I carry a scrub brush, but there is no "scrub/clean" option on either | Action not on list |
| 10 | Deck Nine | Blather silently vanished from the Characters list; no text said he left | Silent state change |
| 15 | Deck Nine | "open escape pod bulkhead" disappeared from Exits once the explosion opened the door, which confirmed the state change without extra text | Positive |
| 18-30 | Escape Pod | About 12 consecutive "wait" clicks to land; each gave new text, so it read like a cutscene | Pacing |
| 30 | Escape Pod | Towel and survival kit appeared but offered no "take" while I was in the web; no hint that I needed to get out first | Confusing |
| 31 | Escape Pod | Numbers renumbered inside the same room (exit 33 became 1, 13 went from "light" to "towel") despite the footer's promise | Confusing |
| 32 | Escape Pod | Room text says "The bulkhead leading out is open", but "go up / out" answered "The pod door is closed" | Text bug |
| 36 | Crag | One turn ("open survival kit") took over three minutes to return | Pacing |
| 42 | Courtyard | Closing the survival kit hid the three goo rows; an easy way to shorten the list by hand | Positive |
| 44 | West Wing | "move rubble" is offered, but it only answers "An interesting idea..." | Dead option |
| 47 | Rec Area | Combination dial shows up as "set to a number <value>", which makes the lock mechanic obvious | Positive |
| 51 | Rec Corridor | Exits to visited rooms carry the room name ("go west, Rec Area"), which helps me map | Positive |
| 60 | Mess Corridor | Padlock only offers "examine"; nothing hints at how it might be opened | Puzzle (stuck) |
| 63 | Mess Hall | ID card grew a context option "slide through slot" as soon as a slot was in the room; it steers me without spoiling | Positive |
| 64 | Mess Hall | "open canteen" answered only "Opened." with no word on whether anything is inside | Unhelpful response |
| 67-72 | Dorms C/D | Four identical dorm + SanFac pairs, about 10 clicks for pure flavour | Pacing |
| 75 | Dorm Corridor | The very long walkway hall collapses into one click with a line of travel text | Positive |
| 81 | Elevator Lobby | Pushing the blue button opened the blue door with no message; I found out only by trying "go north" | Silent state change |
| 86 | Lower Elevator | Hunger warning followed by "The goo in your survival kit would take care of both." A clear nudge | Positive |
| 97 | Admin Corridor South | The key in the crevice has a "take" that fails; no hint yet what tool could reach it | Puzzle (stuck) |
| 99 | Systems Monitors | The monitor wall of green and malfunctioning systems works as an at-a-glance goal list | Positive |
| 107 | Storage East | The weight-limit refusal named the exact item to drop ("Dropping the ... scrub brush would make enough room") | Positive |
| 117 | Reactor Access Stairs | Dark room: the options list still offers "go down" with no warning that more darkness may be deadly | Confusing |
| 124 | Machine Shop | Option list reached 71 entries (nine dispenser buttons plus the box contents) | List too long |
| 125 | Machine Shop | "close cardboard box" is offered but answers "There's no way to close it." | Dead option |
| 126 | Machine Shop | Canteen grew "put under spout"; the narrow-mouth refusal taught me something useful | Positive |
| 131 | Robot Shop | Waking Floyd was simple and charming: turn on, wait, he introduces himself | Positive |
| 132 | Robot Shop | Floyd's row has no "ask to..." or "give to" entry; "talk to" only gets "Hi!" | Action not on list |
| 138 | Tool Room | "take all" with a full load gave per-item refusals that each named what to drop | Positive |
| 146 | Admin Corridor South | Key row grew "take with magnet" once I carried the bar; solvable by mouse, though it names the bar a magnet before I had called it that | Positive |
| 152 | Mess Corridor | "open door" was offered while the unlocked padlock still hung on it; refused with "until the padlock is removed" | Confusing |
| 155 | Storage West | Opening the padlocked door and finding the ladder: +4, a satisfying first lock | Positive |
| 157-163 | Storage West | Ladder needs five items dropped; six single-item drop clicks, no multi-select | Pacing |
| 169 | Admin Corridor | "open ladder" was offered while I held it, then refused; the reply did explain why | Confusing |
| 171 | Admin Corridor | "throw into rift" sits right beside "put across rift" on the ladder row, an easy misclick that could lose the ladder | Confusing |
| 173 | Admin Corridor North | Crossing the rift via drop, open, put across: a clean three-step chain, all offered by the list (+4) | Positive |
| 178 | Large Office | "sleep" button appeared exactly when the weariness message did | Positive |
| 181-193 | Admin wing to Dorm B | Typing the printed phrase ("go east") instead of a number made multi-room walks easy to plan | Positive |
| 194 | Dorm B | The button label "sleep (very tired)" shows urgency right on the button | Positive |
| 197 | Dorm B | Items silently "slipped to the floor" during sleep; "take all" recovered them in one click | Positive |
| 198 | Dorm B | Hunger and sleep forced a 15-click round trip back to the depot; the need to carry food was not obvious when I dropped the kit to take the ladder | Pacing |
| 202 | Mess Hall | Every card shows its own "slide through slot", so four near-identical rows; fine for honesty, but noisy | List too long |
| 203 | Mess Hall | Kitchen card "Magnetik striip randumiizd": carrying the magnet silently ruined it, with no warning on the card's row or examine text | Silent state change |
| 203 | Mess Hall | The magnet trap cost me the kitchen, and the only hint ("konsult Prajekt Handbuk") arrives after the damage is done | Puzzle (stuck) |
| 210 | Upper Elevator | Upper elevator card: "Elevator enabled." Riding up took push up + two waits, with nice ambient text | Positive |
| 215 | Tower Core | Reached the Tower Core (+4, score 23) | Positive |

### Report

I played 215 turns in a single attempt (no deaths) and finished with **23 points** in the **Tower Core**, just off the upper elevator. Milestones: survived the Feinstein explosion via the escape pod; swam out of the sinking pod and climbed to the ruined castle; explored the whole dormitory, mess, mechanical and admin wings; woke and befriended the robot **Floyd**; fished a key out of a crevice with a magnet and **opened the padlocked storage room**; **crossed the rift** with the extendable ladder; collected kitchen, upper elevator and shuttle access cards; ate all three goos; **slept** through a night; and **rode the upper elevator** to the tower. Open threads: the Rec Area combination dial (0-1000, no number found), the Mess Hall kitchen door (my card got wiped by the magnet), the teleport booth, the reactor elevator, the dark reactor stairs (no light yet), the chemical dispenser (the canteen's mouth is too narrow), the Tool Room laser and pliers, and the unused shuttle card.

What worked: the grouped option list (Exits / Buttons / In the room / Carried / Characters) scans quickly even when long. Context verbs are the star of the interface: "salute" when an officer appears, "slide through slot" when a slot is present, "put under spout" by the dispenser, "take with magnet" at the crevice, "unlock with key" on the padlock, and "put across rift" once the ladder is extended. Together they turn a parser game into a solvable point-and-click game without ever feeling like a hint menu. Exits labelled with visited room names, the "sleep (very tired)" button, the hunger nudge pointing at the goo, and the weight-limit refusals that name exactly what to drop are all very good. Being able to type the printed phrase ("go east", "drop key") rather than look up a number made long walks and multi-step housekeeping comfortable.

What still hurts: (1) the magnet silently scrambling access cards. A mouse player cannot "check" a card, and nothing on the card's row changes, so the loss is invisible until it is too late. (2) The list gets long (71 entries in the Machine Shop), mostly from Carried items that each carry examine/drop/read, plus open containers expanding their contents. (3) Numbers are not as stable as the footer promises: they reshuffled within the escape pod when I stood up, and they renumber on every re-entry. (4) Some offered options are dead or refused: "close cardboard box" ("There's no way to close it"), "open door" while the unlocked padlock still hangs on it, "open ladder" while holding it, "move rubble". (5) Housekeeping is click-heavy: six separate drops to free space for the ladder, and a 15-click round trip to fetch food and a bed. (6) Silent state changes, such as the blue elevator door opening and Blather leaving, with no line of text. (7) Floyd has no way to be asked to do anything; "talk to" only gets "Hi!".

The three changes I would make first:
1. **Surface magnet damage.** When a card's strip is randomised, change its row, for example "kitchen access card (scrambled)" or an examine line saying the stripe looks smeared. Or, at the moment the magnet and a card first share an inventory, give a one-line hint that the bar tugs at the cards.
2. **Collapse carried items.** Show Carried as one line per item with only its most relevant verb, and put everything else behind the item ("towel…"), or fold Carried into a single "inventory…" submenu when there are more than about six items. Add a multi-drop ("drop… [pick several]") for weight juggling.
3. **Hide options that will be refused for a known reason.** Don't offer "open door" while it is still padlocked, "open ladder" while it is held, or "close" on things that cannot close. Keep numbers stable within a room even when my posture changes (in or out of the web or bed).

### Verdict

The click interface works: I got through the opening, a locked door, a chasm, a robot companion and an elevator ride with only printed options, and the context verbs are what make it work. The biggest risk is the invisible failure state (the magnet wiping cards). Beyond that, it mostly needs list trimming and removal of the offered-but-refused options.
