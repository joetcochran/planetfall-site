# Round 6: click-6, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 6, 11 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Tower Core, turn 213, with 27 points.
- **Commands:** 222, with no deaths

The diary below is `playtests/2026-09-11/2026-09-11-click-6.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest: session `click-6`
**Who:** Claude (Opus 5), blind mouse-only tester, no prior knowledge used  **Date:** 2026-09-11  **Session:** `click-6` (`node scripts/playtest.mjs --session click-6 --new --click`)

### Attempt 1, turns 0-10: scrubbing Deck Nine, Blather on my case

I start as a lowly Ensign Seventh Class scrubbing Deck Nine. The option list is long even here (27 options): exits, a Buttons row, room things, and everything I carry, each with verbs. I read the ID card first (it has "a dark magnetic stripe", which smells like a future key-card use). Ensign Blather arrives and hands out thirty demerits; a "salute" option appeared on him, so I clicked it and got the demerits cut to five. Nice: the list offered a socially appropriate action I might not have thought of.

I tried to explore east to the Reactor Lobby. Blather followed and bellowed at me to get back to my post; "go south" was refused with "Ensign Blather pushes you roughly back". The ambassador from Blow'k-bibben-Gordo oozed slime on my deck and gave me a brochure (a cute self-referential ad for the game). I looked for a way to scrub the slime with my brush, since that is literally my job, but slime only has "examine" and the brush only "examine / drop". Climbing to Deck Eight got Blather yelling again, so I have come back to Deck Nine. The escape pod to port with "open escape pod bulkhead" and "get in" is very prominent; I suspect something is going to happen here and the pod matters.

### Attempt 1, turns 11-37: explosion, escape pod, splashdown

"open escape pod bulkhead" was refused with a fair in-world line: "Why open the door to the emergency escape pod if there's no emergency?" That told me exactly what to wait for. I saluted Blather again, he wandered off, and I pressed "wait". On turn 16 "A massive explosion rocks the ship... The door to port slides open." The list quietly dropped "open escape pod bulkhead" (it was open now), and "get in" on the escape pod was right there. +3 points for getting in.

Inside, "safety web: get in" was the obvious choice. Then a long ride of pure "wait" presses (turns 19-32): the Feinstein blows up, the pod finds an ocean planet, lands on "a rocky cleft" and "rocks gently back and forth as if it was precariously balanced". A panel opened with a survival kit and a towel. While I was in the web the kit and towel had no "take" option at all, only examine/read/open, which puzzled me for a turn until I realised I had to leave the web first. When I stood up the pod fell into the sea. "take all" (a new Buttons entry) grabbed both items in one click, which was lovely.

"go up / out" first said "The pod door is closed" even though it was listed as an exit, so I clicked "open escape pod bulkhead", water rushed in, then "go up / out" put me Underwater and "go up" again landed me on the Crag (+3, score 6). About 14 consecutive waits during the descent is a lot of clicking with nothing to decide; a "wait until something happens" button would help.

### Attempt 1, turns 38-54: up the cliff into a ruined castle and a deserted complex

On the Crag I opened the survival kit: red, brown and green goo. Food, I assume; I am keeping it for when the game tells me I am hungry. The goo blobs appear as top-level "Carried" rows with their own drop/eat verbs, which makes the carried block balloon to 9 items and ~30 options. The plaque on the Balcony is in a phonetic "corrupt Galalingua" ("Xis stuneeng vuu uf xee Kalamontee Valee...") which was fun to decode by ear.

At the Courtyard I dropped the useless brochure to shorten my list; when I came back the room said "Unfortunately, one of those stupid Blow'k-bibben-Gordo brochures is here." Ha. The West Wing is a rubble dead end ("move rubble": "An interesting idea..."). North through the Plain Hall I reached the Rec Area, which has a door north "closed and locked" with a combination dial "currently set to 0". The dial offers "set to a number <value>", which is a neat way to allow numeric input without typing; I have no combination yet, so I am leaving it. Exit labels now remember destinations ("go southwest, Plain Hall"), which helps me map mentally. Dorm B and SanFac B are empty and atmospheric, nothing to take.

### Attempt 1, turns 55-74: dorm crawl, a padlock, a card-slot door and a canteen

I swept the dorm block methodically: Dorms A-D and SanFacs A-D all share the same text and contain nothing. That's eight rooms and ~16 clicks of confirming emptiness. Mess Corridor has a north door "hooked with a simple steel padlock" (no key yet). The Mess Hall had an octagonal canteen (took it, opened it: just "Opened.", so presumably empty) and a south door with a small slot. The ID card offered a context verb "slide through slot", which I appreciated because I would never have guessed the phrasing; it failed in-world ("Inkorekt awtharazaashun kard...akses deeniid.") and "open door" says "Pleez yuuz kitcin akses kard." So I now know I am hunting a kitchen access card, a padlock key and a combination number.

Small interface notes: when I walked into the Mess Corridor with the canteen, every canteen verb was tagged "(new)" even though I had just used them in the previous room; the "(new)" marker is per room, so it flags things that are not new to me. Also the ID card jumped out of the uniform on its own when I slid it ("You take the ID card out of the Patrol uniform first"), and afterwards the carried list reordered (ID card now above the uniform), so the numbers I'd memorised in my head shifted positions on screen even though the numbers themselves stayed stable.

### Attempt 1, turns 75-92: the long walkway, an elevator lobby, and everything wants a card

"go east" from the Dorm Corridor was one click that narrated "You walk down the long, featureless hallway for a long time" and dropped me at Corridor Junction. Good compression. East of that is a bright Elevator Lobby: a blue door (north) with a blue button, a red door (south) with a red button, and a phone-booth-sized "Booth 2" to the east with a slot and buttons "1" and "3". The booth says "Teleportaashun buux not aktivaatid." Pushing the blue button gave "a faint whirring" and two turns later "The door at the north end of the room slides open"; same for red. Both elevators (Upper and Lower) say "Nothing happens. The slot beside the buttons stays dark." when I push Down, and my ID card is rejected. So there are at least three card slots in play (kitchen door, elevators, teleport booth) and one combination lock plus one padlock. I have no cards.

On turn 88 the game told me I was "pretty hungry and thirsty. The goo in your survival kit would take care of both." I appreciated that nudge naming the fix. I ate the red goo ("just like scrumptious cherry pie"). One interface slip: after the blue door opened, the lobby's room description in the same screen still said the blue door "is closed"; the next look was correct.

### Attempt 1, turns 93-107: a key I can't reach, a rift, and a storeroom of parts

North of the junction, Admin Corridor South has "a jagged crevice". Examining it: "Lying at the bottom of the narrow crack... is a shiny steel key!" A new "key: take" option appeared, but taking it fails: "Either the crevice is too narrow, or your fingers are too large." That key is surely for the Mess Corridor padlock, so I need some kind of fishing tool; nothing in my inventory offers a verb on the crevice, so I've parked it. Further north the building is "rent apart" by a rift "eight meters across and thirty meters deep" (a chasm to cross later), and Systems Monitors lists broken planetary systems (defence, course control, communications, "PRAJEKT KUNTROOL") in the phonetic spelling. The rift room adds "throw into rift" to three of my carried items, which reads like an invitation to lose my stuff.

South of the junction, Storage East had an oil can (took it) and a cardboard box holding a cracked fromitz board, two megafuses and a bedistor. Trying to take the box: "Your load is too heavy. Dropping the Patrol-issue ... scrub brush would make enough room." That is a very helpful refusal, and it did not cost a turn. I left the box for now since I don't know what the parts are for.

### Attempt 1, turns 108-122: the mech wing, a grue warning, a chemical dispenser, and Floyd

The Physical Plant is scenery only. Reactor Control has a button that opens a Reactor Elevator (another slot, another dead Down button) and "A dark stairway winds downward". I clicked "go down" to peek: "It is pitch black. You might be eaten by a grue." I backed straight up. I have no light source and nothing on the list suggests one.

Machine Shop: a big chemical dispenser with nine coloured buttons (KUULINTS 1-4, KATALISTS 1-3, BAAS, ASID) and a spout. The canteen gained a context verb "put under spout", which is a strong hint that I will fill it here at some point. With nine buttons listed as separate rows (examine/push each) this room is 66 options long.

Robot Shop: "Only one robot, about four feet high, looks even remotely close to being in working order." I clicked "turn on" (+2, score 8): "Nothing happens. Then again, you notice a faint hum". One wait later: "Hi! I'm B-19-7, but to everyperson I'm called Floyd... Let's play Hider-and-Seeker you with me." A companion! His row has ten verbs including "ask about…" and "turn off". I am already wondering whether his small hands could fish the key out of the crevice.

### Attempt 1, turns 123-132: Floyd tags along; a magnet, a laser, and a smeared card

Floyd is delightful: "search" makes him giggle ("You're tickling Floyd!"), and "ask about…" opened a topic list (Floyd, yourself, and each item I carry). "ask Floyd about Floyd": "Floyd is very good at Hider-and-Seeker. Also fixing things." The topic list only includes things I'm carrying, so I can't ask him about the key in the crevice or the padlock, which is what I actually wanted to ask. He follows me from room to room ("Floyd bounds into the room. 'Floyd here now!'"). His ten verbs get new numbers in every room, so I can't learn "Floyd = 50".

The Tool Room is a treasure trove: glass flask, a U-shaped "curved metal bar" ("A few metal filings cling to its ends", so a magnet), wide-nosed pliers, and an "Akmee Portabul Laazur" with a setting dial and an old battery. I figured the magnet would lift the key out of the crevice. Carrying limits forced me to drop the scrub brush. When I picked up the magnet: "The curved metal bar tugs toward the ID card... the magnetic stripe on the card looks smeared." Oops. That was a silent consequence of a plain "take"; the card had never worked in any slot, so I dropped it to make room for the laser. The laser's new verbs include "shoot floyd", right there in the list, which made me wince; nobody should be one mis-click away from shooting their friend. The laser's dial is listed as its own carried row with a "drop" verb, which seems odd for a part of the laser.

### Attempt 1, turns 133-148: magnet fishes out the key, padlock off, door open

Back at the crevice the key row had grown a context verb: "take with magnet (new)". One click: "a piece of metal leaps from the crevice and affixes itself to the magnet. It is a steel key!" This is exactly how I want a click interface to reward an inference: I worked out the magnet, and the interface met me halfway without spelling the answer out before I had the tool. No points for it, which surprised me a little.

The long walkway back west is one click each way. At the Mess Corridor the padlock offered "unlock with key (new)"; "The padlock springs open." Then "open door" refused: "The door cannot be opened until the padlock is removed." Removing it means taking it, and taking it hit the carry limit twice ("Dropping the survival kit would make enough room", then "...the towel"). I shed the key and the magnet to make room, took the padlock, dropped it, and "open door" finally said "Opened." That was five clicks of inventory juggling to take a lock off a hook. While I carried the padlock its row still showed "68 take", a dead option. Floyd caught up and barrelled into me ("Floyd not looking at where he was going to"), and the "shoot floyd" laser option reappeared the moment he entered.

I've also noticed that carried items get different numbers in different rooms (old battery was 60, then 61, 63, 66). The footer promises only per-room stability, but it means I must re-read the list every room.

### Attempt 1, turns 149-160: Storage West's ladder bridges the rift

Behind the padlocked door, Storage West (+4, score 12) holds a tin of "Spam and Egz" and "A heavy-duty extendable ladder". Eight metres of rift, an extendable ladder: I didn't need a hint. The ladder is heavy: "You'd have to drop the laser, the survival kit, the towel and the canteen first." I used "drop all" (one click, and it left my worn uniform and chronometer on me, good) and took just the ladder. The option list shrank to about 15 entries and became a pleasure to read. I'll have to come back for my stuff.

At the rift the ladder offered only "examine / drop / open". "open ladder" while holding it: "You couldn't possibly extend the ladder while you're holding it." Fair. Drop, open ("extends to a length of around eight meters"), and then a new "put across rift (new)" option appeared. "The ladder swings out across the rift and comes to rest on the far edge". No points yet (maybe on crossing). I saved first; Floyd chimed in, "Oh boy! Are we gonna try something dangerous now?", which made me laugh. The "restore" button only appears after the first save, which is tidy.

### Attempt 1, turns 161-173: across the rift; three access cards; hungry and tired

"go north" across the ladder: "You slowly make your way across the swaying ladder. You can see sharp, pointy rocks at the bottom of the rift, far below..." +4, score 16. Rift crossed. Admin Corridor North has portals to "Administraativ Awfisiz", "Tranzportaashun Suplii" and "Plan Ruum".

The Small Office desk held a kitchen access card and an upper elevator access card (+1 each), the Large Office desk a shuttle access card (+1). Score 19. After a hundred turns of being blocked by card slots, three cards in five clicks felt like a jackpot. On the way I got two body warnings: hunger again ("There is still goo in the survival kit you left in Storage West." – brilliant, it remembers where I left my food) and "You begin to feel weary... finding a nice safe place to sleep", and a "sleep" button appeared in Buttons. Transportation Supply north is pitch black (grue warning again), and the Plan Room has two maps ("Kalamontee Kompleks" with "Yuu ar heer", and "Lawanda Kompleks" with an underground installation), suggesting the shuttle card leads to that second complex. Floyd wanders on his own now and then.

Plan: go back across the rift to Storage West, eat, collect my things, find a bed in a dorm, then try the kitchen card at the Mess Hall.

### Attempt 1, turns 174-201: eat, kitchen, canteen of protein, and a night's sleep

Back across the ladder and down the walkway to Storage West. The goo in the kit on the floor had only "examine" (no "eat") until I picked the kit back up, which cost a turn while the game was escalating to "really ravenous". Brown goo: "delicious Nebulan fungus pudding." "take all" grabbed towel, tin can, canteen and oil can, then stopped at the laser with the now-familiar "Dropping the towel would make enough room"; I dropped the tin can instead and took the laser.

On the way to the Mess Hall the sleep button's label escalated: "sleep (very tired)", then "sleep (exhausted)". I love this: the Buttons row itself tells me how urgent my body is, without scrolling back for the warning text. The kitchen card opened the kitchen door ("quietly slides open"), and entering the Kitchen gave +4 (score 23). The "Hii Prooteen Likwid Dispensur" has an "octagonal niche"; my canteen is octagonal, so "put in… canteen" into the dispenser unit, "push button", "The canteen fills almost to the brim with a brown liquid." A new carried row "quantity of protein-rich liquid: drink" appeared. I closed the canteen for the trip. Leaving, the Mess Hall room text said "A door to the south is open" in the same screen as "The kitchen door slides quietly closed" (the same stale-description bug as the elevator door).

I went to Dorm D, "get in bed", then "sleep (exhausted)" replied only "You'll probably be asleep before you know it", and it took one more "wait" for the sleep to actually happen. A creepy dream about the shuttle and a giant spider, then "SEPTEM 7" and "You wake up feeling refreshed". All my carried things "slipped to the floor beside you", and Floyd: "About time you woke up, you lazy bones!"

### Attempt 1, turns 202-213: day two, the upper elevator rises to the Tower Core

"get out of the bed", then "take all" picked up all eight scattered items in one click (this time nothing was too heavy; it seems sleeping or the canteen changed the load maths, or the tin can was the problem before). I walked to the Elevator Lobby; the blue door was still open from yesterday. Inside the Upper Elevator the new card offered "slide through slot" and the elevator said "Elevator enabled." "push up": "The elevator door slides shut... a sensation of vertical movement." Two waits of "innocuous Hawaiian music" later: "The elevator comes to a stop at the top of the shaft... The elevator door slides open." While the door was shut the exit row still read "go south / out", which would have been a dead click.

"go south / out" delivered me to the Tower Core (+4, score 27): a circular room with a spiral staircase up and exits northeast and southwest. Floyd came too. That is where I stopped, at turn 213, a little over budget, because riding the elevator felt like the natural chapter break.

### Friction log

| Turn | Where | What happened | Kind |
|---|---|---|---|
| 1 | Deck Nine | 27 options on the very first screen, most of them verbs on carried items (uniform has 5 verbs incl. "close") | List too long |
| 2 | Deck Nine | "salute" on Blather was offered and paid off (demerits reduced) | Positive |
| 3 | Reactor Lobby | "go south" listed as an exit but Blather pushes me back; turn does not advance, fine, but the exit looked open | Confusing |
| 5 | Deck Nine | Slime on my freshly polished deck, I hold a scrub brush, but no "scrub/clean" option anywhere | Action not on list |
| 6 | Deck Nine | Brochure joke lands well | Positive |
| 10 | Deck Nine | Room text says the ambassador "is standing here" in the same turn he "disappears up the gangway" | Text bug |
| 12 | Deck Nine | "open escape pod bulkhead" refused with a clear hint ("if there's no emergency?") that taught me to wait | Positive |
| 16 | Deck Nine | After the explosion the "open" option vanished and "get in" worked straight away | Positive |
| 19-32 | Escape Pod | ~14 bare "wait" presses in a row while the pod descends; nothing to decide | Pacing |
| 31 | Escape Pod | Towel and kit appear but have no "take" while I am in the web; no hint why | Confusing |
| 34 | Escape Pod | "take all" button grabbed both new items in one click | Positive |
| 34 | Escape Pod | "go up / out" listed as an exit but the door is closed; it costs a click to learn that | Dead option |
| 38 | Crag | Opening the kit promotes three goo blobs to top-level carried rows (3 verbs each); carried block now ~30 options on every screen | List too long |
| 47 | Courtyard | Dropped brochure gets a funny custom room line | Positive |
| 49 | Rec Area | "set to a number <value>" on the combination dial is a clean mouse-friendly way to enter numbers | Positive |
| 52 | Rec Corridor | Exit labels name rooms I have already seen ("go southwest, Plain Hall") | Positive |
| 57-74 | Dorms A-D, SanFacs A-D | Eight identical empty rooms; nothing to click but exits | Pacing |
| 62 | Mess Hall | ID card offers "slide through slot" as a context verb; I would not have guessed the phrasing | Positive |
| 64-66 | Mess Hall | Slot and door both give clear phonetic hints that I need a "kitcin akses kard" | Positive |
| 67 | Mess Corridor | All canteen verbs marked "(new)" although I used them one room ago; "(new)" is per room, not per player | Confusing |
| 65 | Mess Hall | "open canteen" just says "Opened." with no statement that it is empty | Unhelpful response |
| 77 | Dorm Corridor | Long walkway traversed in a single click with a narrated transition | Positive |
| 82 | Elevator Lobby | Event says the blue door slid open while the room text printed on that screen says it "is closed" | Text bug |
| 84-92 | Elevators, Booth 2 | Three card slots, a padlock and a dial, and I have no card; everything is gated at once | Puzzle (stuck) |
| 88 | Elevator Lobby | Hunger warning explicitly points at the goo; eating it was one click | Positive |
| 79-87 | Elevator Lobby | "push" + several waits until the door opens; a door-opening elevator costs 3-4 clicks each time | Pacing |
| 97 | Admin Corridor South | Key visible in crevice, "take" offered but fails; no tool verb appears on the crevice to hint what might work | Puzzle (stuck) |
| 100 | Admin Corridor | "throw into rift" is added to the brush, towel and kit; feels like a trap on the list | Confusing |
| 107 | Storage East | Load-too-heavy refusal names exactly what to drop, and costs no turn | Positive |
| 106 | Storage East | Box contents listed as separate "take" rows alongside the box: 6 item rows for one shelf | List too long |
| 115 | Reactor Access Stairs | "go down" into pitch black with grue warning; I could retreat safely | Positive |
| 119 | Machine Shop | Nine dispenser buttons each get examine+push rows: 66 options on screen | List too long |
| 119 | Machine Shop | Canteen gets "put under spout" here: good contextual hint | Positive |
| 121-122 | Robot Shop | Turning on the robot and meeting Floyd was smooth and charming (+2) | Positive |
| 123-125 | Robot Shop | Floyd "ask about…" topics are limited to carried items; can't ask about the crevice key or padlock I'm stuck on | Action not on list |
| 126 | Machine Shop | Floyd's verbs renumber in every room (49-56, then 67-76, then 64-73) | Confusing |
| 130 | Tool Room | Taking the magnet silently smeared my ID card's stripe; no warning before the action | Silent state change |
| 130 | Tool Room | "Too heavy" message again names the exact item to drop | Positive |
| 132 | Tool Room | Laser offers "shoot floyd" as a one-click option right on the list | Confusing |
| 132 | Tool Room | "laser setting dial" shown as a separate carried item with its own "drop" | Text bug |
| 137-138 | Admin Corridor South | "take with magnet" appeared on the key once I carried the magnet; one click solved it | Positive |
| 138 | Admin Corridor South | Solving the crevice key gave no points and no fanfare | Unhelpful response |
| 143-147 | Mess Corridor | Removing an unlocked padlock requires picking it up, which hit the carry limit twice; 5 clicks of juggling | Pacing |
| 146 | Mess Corridor | Carried padlock still lists "take" | Dead option |
| 133-141 | several | Carried-item numbers change from room to room, so muscle memory never forms | Confusing |
| 149 | Storage West | Ladder "too heavy" message lists all four things to drop | Positive |
| 150 | Storage West | "drop all" keeps worn items on me and clears the list in one click | Positive |
| 157 | Admin Corridor | "open ladder" while holding it is refused; the refusal explains why, but the list offered it | Dead option |
| 159-160 | Admin Corridor | "put across rift (new)" appears once the ladder is extended: natural step-by-step affordance | Positive |
| 160 | Admin Corridor | Floyd's reaction to saving is a great touch | Positive |
| 161 | Admin Corridor North | Crossing the ladder narrated with tension, +4 | Positive |
| 162 | Small Office | Hunger warning tells me where I left the goo ("in the survival kit you left in Storage West") | Positive |
| 163-168 | Offices | Three access cards found in two desks, +1 each: a satisfying unlock after long gating | Positive |
| 170 | Admin Corridor North | "sleep" button appears the moment tiredness is announced | Positive |
| 171 | Transportation Supply | Second pitch-black room and still no light source visible anywhere | Puzzle (stuck) |
| 180 | Storage West | Goo inside the kit on the floor offers only "examine", not "eat", while I'm ravenous; must pick up the kit first | Action not on list |
| 186-197 | corridors | Sleep button label escalates "(very tired)" then "(exhausted)": urgency visible on the list itself | Positive |
| 191-192 | Kitchen | Octagonal canteen into octagonal niche, push button: a clean, fair puzzle via "put in…" | Positive |
| 195 | Mess Hall | Room text says the south door "is open" while the same screen says it slid closed | Text bug |
| 200 | Dorm D | "sleep (exhausted)" in bed only says I'll fall asleep soon; needed an extra "wait" | Unhelpful response |
| 201 | Dorm D | On waking, everything carried is dumped on the floor; list balloons with room items to re-take | Silent state change |
| 203 | Dorm D | "take all" after waking re-collected all eight items in one click | Positive |
| 208 | Upper Elevator | Right card, "slide through slot", "Elevator enabled": clean | Positive |
| 209-210 | Upper Elevator | "go south / out" stays listed while the elevator door is shut and moving | Dead option |
| 210-212 | Upper Elevator | Three waits to ride the elevator; no "wait until arrival" | Pacing |
| 213 | Tower Core | Arrival gives +4 and a new area; good payoff for the card hunt | Positive |

### Report

**How far I got.** One attempt, no deaths, 213 turns, score 27. I escaped the Feinstein in the pod, climbed from the Crag to the castle Courtyard, swept the Kalamontee dorm/rec/mess wing, found and switched on the robot Floyd (companion milestone), fished a steel key out of a crevice with a magnet, unlocked the padlocked storeroom, carried its extendable ladder to the rift and bridged it (chasm milestone), found three access cards in the admin offices on the far side, opened the kitchen with the kitchen card and filled my canteen at the protein dispenser, ate twice, slept through the night in Dorm D, and on day two rode the upper elevator to the Tower Core (elevator milestone). Unsolved when I stopped: the Rec Area combination dial (no number found), the teleport booth ("not aktivaatid"), the lower and reactor elevators, the dark Reactor Access Stairs and Transportation Supply (no light source found), the chemical dispenser, and the Machine Shop / Storage East parts (fuses, bedistor, fromitz board) that presumably repair something.

**What worked.** The context verbs are the star. Options such as "salute" on Blather, "slide through slot" on cards, "take with magnet" on the key (appearing only once I held the magnet), "put across rift" (only once the ladder was extended), and "put under spout"/"put in…" for the canteen let me act on inferences without typing, and they appeared at the right moment rather than giving puzzles away early. Refusals are nearly always informative: "Why open the door to the emergency escape pod if there's no emergency?", "Pleez yuuz kitcin akses kard", and the carry-limit messages that name exactly what to drop. Body-state feedback is excellent: hunger warnings say where the goo is, and the sleep button relabels itself "(very tired)" then "(exhausted)". "take all" / "drop all", exit labels that name visited rooms, one-click long-corridor travel, and the "<value>" entry for dials all save real effort. Floyd's personality comes through beautifully, including his reaction to saving.

**What still hurts.** (1) The list is too long almost everywhere: every carried item shows its full verb set on every screen, so a normal room is 45-90 options, and the useful new option is buried among "examine chronometer / take off chronometer / close Patrol uniform". The goo blobs, the laser's dial and battery, and a box's contents all become separate rows. (2) Numbers for carried items and for Floyd change from room to room, so I re-read the whole list every turn. (3) Stale or dead options: "go south / out" while a door is shut, "take" on a padlock I am holding, "open ladder" while holding it, and room text that says a door is closed/open in the same screen that announces it opening/closing. (4) Silent or surprising consequences: the magnet wiped my ID card on a plain "take", sleeping dumped my inventory, and "shoot floyd" sits one click away from "shoot". (5) Lots of low-value clicking: ~14 waits in the pod, 3-4 per elevator, eight identical empty dorm/sanfac rooms, and five clicks of inventory juggling just to lift an unlocked padlock off a door. (6) Floyd's "ask about…" only covers items I carry, so I could not ask about the key, padlock or rift I was stuck on.

**Three changes I would make first.**
1. Collapse the Carried block: show carried items as names only (or only those with a verb that is relevant in this room, e.g. "slide through slot", "put under spout", "unlock with key"), with the full verb set one click away. This alone would cut most screens by half and make the "(new)" context verbs stand out.
2. Keep option numbers stable per object across the whole game (the same number for "Floyd: ask about…" everywhere, the same number for "canteen: open"), and prune dead options (exits through closed doors, "take" on held items, verbs refused by pre-conditions) from the list.
3. Add a "wait until something happens" button (pod descent, elevators, sleeping), and put a confirm or a warning on destructive or irreversible picks ("shoot floyd", carrying the magnet next to the ID card, "throw into rift").

### Verdict

The click interface is genuinely playable blind: I reached the companion, the chasm, the kitchen, a night's sleep and an elevator ride in about 200 turns without ever needing to type, largely thanks to well-timed context verbs and informative refusals. What holds it back is noise, not missing actions: overlong, renumbering option lists and a handful of dead or dangerous entries make every turn a reading exercise.
