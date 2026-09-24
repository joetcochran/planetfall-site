# Round 6: typed-6, typed

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 6, 11 September 2026
- **Mode:** typed: commands typed into the parser
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Tower Core, turn 195, with 21 points.
- **Commands:** 204, with no deaths

The diary below is `playtests/2026-09-11/2026-09-11-typed-6.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind typed playtest: session `typed-6`
**Who:** Claude (blind AI playtester, experienced IF player, never seen this remake) **Date:** 2026-09-11  **Session:** `typed-6` (`node scripts/playtest.mjs --session typed-6 --new`)

### Attempt 1, commands 1-18: Scrubbing the deck, waiting for the emergency

I wake up as Ensign Seventh Class on Deck Nine of the Feinstein with a scrub brush. The room text immediately flags an escape pod "to port" with a closed bulkhead, which reads as a Chekhov's gun. `look` and `inventory` worked as expected (brush, chronometer worn, uniform worn containing an ID card - nice nested container listing). Blather arrived on turn 1 to hand out demerits; `examine blather` gave a good, funny description. `scrub floor` was understood ("The floor is a bit shinier now.").

`open bulkhead` got a lovely in-world refusal: "Why open the door to the emergency escape pod if there's no emergency?" That told me outright that an emergency is coming, so my plan became: stay near the pod. I did take a short look around first: `examine chronometer` (time readout, engraved message from Mom and Dad), `examine id card` (ID number and a magnetic stripe - probably a keycard later). An alien ambassador handed me a brochure; `read brochure` is a cute meta-joke. `up` took me to a Gangway, `down` back, `starboard` to a Reactor Lobby where Blather yelled at me to get back to my post, so I went `port` and typed `wait` three times. On turn 18 a massive explosion rocked the ship and the pod door slid open. The ship-relative directions (port/starboard/aft) all parsed fine.

### Attempt 1, commands 19-42: Pod launch, a long ride, a sinking landing

`port` into the Escape Pod (+3 points). The room text mentions a "mass of safety webbing", so `get in webbing` was my first instinct and the parser accepted it ("You are now safely cushioned within the web."), and the status line changed to "Escape Pod, in the safety web" - a nice touch. The pod launched, the Feinstein blew up, and then I simply typed `wait` for a long time: commands 22-35 were all `wait` (14 of them). The flavour messages were good (planet swings into view, atmospheric entry, islands with cliffs and a plateau of buildings) but several waits in a row produced nothing but "Time passes...". An experienced player would reach for `wait` anyway, but a `wait until landing`/`z` count would be handy.

The pod landed with a thud, "precariously balanced", and a panel opened with a survival kit and a towel. I waited two more turns (nothing happened - it was actually waiting for me) then `get out of webbing`: the pod fell into the water. `take kit and towel` worked cleanly with per-item "Taken." lines. `open bulkhead` flooded the pod; `out` put me Underwater; `up` put me on a Crag (+3, score 6). A structure clings to the cliff eight metres above and the text all but tells me to climb.

### Attempt 1, commands 43-57: Up the cliff into the ruins

`open kit` revealed three blobs of goo (red, brown, green) - food, I assume, so I left them in the kit for when hunger kicks in. `climb up` from the Crag worked first try and put me on a Balcony with a plaque. `read plaque` is written in phonetic "corrupt Galalingua": "SEENIK VISTA ... Kalamontee Valee ... Gulmaan Rivur ... formur pravincul kapitul bildeeng" - fun to decode and it names the region. `read towel` gave "Don't Panic!" (smiled).

`up`, `up` via a Winding Stair to a ruined castle Courtyard (openings north and west, stairs south). I went `north` into a Plain Hall. I then typed `west` thinking I was still in the Courtyard - my mistake, "You can't go that way." did not consume a turn, which is good. `north` again: a Rec Area with a north door that is "closed and locked" with a dial set to 0 (`examine dial`: any number 0-1000). So it's a combination lock and I need to find the number somewhere. `examine games` gave a list including "Double Fannucci". `east` to a Rec Corridor with portals north and south and a southwest branch.

### Attempt 1, commands 58-74: Dorms, a padlock, the Mess Hall and a card slot

I mapped the Rec Corridor: north is Dorm B, south is Dorm A with a SanFac (toilets) off its south end. `search bunks` - "You find nothing unusual." East of Rec Corridor is a Mess Corridor with a small north door closed with a steel padlock (`examine padlock`: it has a keyhole on its underside, so I need a key). South is the Mess Hall: tables, a closed south door with a "small slot" beside it, and an octagonal canteen, which I took.

`put id card in slot` got a genuinely helpful refusal: "The slot is shallow, so you can't put anything in it. It may be possible to slide something through the slot, though." So I typed `slide id card through slot`: the game auto-took the card out of my uniform (nice) and flashed "Inkorekt awtharazaashun kard...akses deeniid." So I need a different card. Good: the game taught me the right verb and gave a clear failure. `open canteen` just said "Opened." - I will check whether anything is inside.

### Attempt 1, commands 75-87: More dorms, the long hall, an elevator lobby

The canteen is empty; I put the ID card back in the uniform (`put id card in uniform` - "Done."). East of the Mess Corridor is a Dorm Corridor with Dorms C and D, both identical and empty. The Dorm Corridor's east end has a dead motorized walkway; a single `east` compressed a long walk into one move ("You walk down the long, featureless hallway for a long time...", 160 time units) and dropped me at a Corridor Junction. That compression was welcome.

East again: an Elevator Lobby, bright, with a blue door/blue button north and a red door/red button south, plus a phone-booth-sized room east. `push blue button` -> "faint whirring noise from behind the blue door", `push red button` -> "The red door begins vibrating a bit." I suspect the elevators are being summoned. `east` into Booth 2: a panel with another card slot, a brown "1" button and a tan "3" button. Looks like a transit system between booths.

### Attempt 1, commands 88-101: Every slot wants a different card

Booth 2's tan button: "Teleportaashun buux not aktivaatid." My ID card through its slot: access denied again. Back in the lobby the blue door slid open (my earlier button press had summoned the elevator). The Upper Elevator has Up/Down buttons and a slot; both buttons say "Nothing happens. The slot beside the buttons stays dark." - a good hint that the slot needs a card first. My ID card was refused again.

A hunger message arrived with a direct nudge: "The goo in your survival kit would take care of both." `eat red goo` -> "scrumptious cherry pie", thirst quenched too. Very friendly handling of the hunger timer. The red door had opened too, into a Lower Elevator (medium-sized - freight?) with the same buttons and a dark slot. So: at least four card readers (mess hall door, teleport booth, two elevators) and my ID works on none. I need to find access cards. Unexplored leads: Courtyard west, Plain Hall northeast, Rec Corridor southwest, Corridor Junction north/south, the combination door, the padlocked door.

### Attempt 1, commands 102-112: A key in a crack, a rift, a wall of monitors

From the Corridor Junction I went `north` into Admin Corridor South: cracked walls and "a jagged crevice" in the floor. `examine crevice` paid off at once: "a shiny steel key!" at the bottom. `take key` -> "Either the crevice is too narrow, or your fingers are too large." and `reach into crevice` -> "too narrow to reach into." Both were understood and the refusals are clear; this is obviously a find-a-tool puzzle (magnet? something thin and sticky?). I will remember it - it is probably the padlock key.

East of there is SanFac E (dusty). North is the Admin Corridor, torn open by an earthquake, with an eight-metre-wide, thirty-metre-deep rift to the north; `north` -> "The rift is too wide to jump across." (no turn spent). West is "Sistumz Moniturz": green lights for LIIBREREE, REEAKTURZ, LIIF SUPORT; red for planetary defence, planetary course control, communications, and project control. That reads like a to-do list for the game.

### Attempt 1, commands 113-125: Spare parts and a weight limit

South of the Corridor Junction is Mech Corridor North with rooms east and west. Storage East holds an oil can on a shelf and a cardboard box with a cracked fromitz board, B-series and K-series megafuses, and a "good ninety-ohm bedistor". I carelessly walked out without taking anything (my own fault), peeked at the Physical Plant west (huge dim room of catwalks and mostly dead HVAC, exits NE and SE), then came back via `northeast`.

`take all` took the oil can but refused the box with a very helpful weight message: "Your load is too heavy. Dropping the Patrol-issue self-contained multi-purpose scrub brush would make enough room." I did exactly that (`drop brush`, `take box`). Naming the specific item to drop is excellent design. Inventory listing nests box contents and the kit contents neatly. The spare parts smell like a repair puzzle later (the "cracked" fromitz board suggests I will need a good one).

### Attempt 1, commands 126-140: The tool room and a magnet

Southeast out of the Physical Plant is Mech Corridor. East is Reactor Control (dials, a wall diagram of a buried planetary reactor, a metal door east with a button, and a dark stairway down). South is Mech Corridor South with doorways SW, S, SE. SW is the Tool Room: a large glass flask, "a metal bar, curved into a U-shape", wide-nosed pliers, and an "Akmee Portabul Laazur" containing an old battery. South is a Machine Shop with a dispenser: coloured KUULINTS 1-4, KATALISTS 1-3, and white BAAS/ASID buttons. That will be a chemistry puzzle.

A U-shaped bar with metal filings on its ends is a magnet - exactly what the crevice key needs. The weight limit bit again: `take bar` -> "Dropping the towel would make enough room", `take laser` -> "Dropping the cardboard box would make enough room." I did `drop box and towel` then `take bar and laser` (multi-object verbs worked both times). Then a surprise: "The curved metal bar tugs toward the ID card ... the magnetic stripe on the card looks smeared." My ID card is probably ruined - but it was being refused everywhere anyway. Good world simulation, and fair warning after the fact. The laser has a six-setting dial, currently 5.

### Attempt 1, commands 141-157: Magnet, key, padlock, ladder

Walked back north to the crevice. `put bar in crevice` was my first guess and it worked beautifully: "a piece of metal leaps from the crevice and affixes itself to the magnet. It is a steel key!" and the key went straight into my hands. (`take key` then said "You already have it." - fine, but I spent a turn.) No points for that, which surprised me slightly.

Long walk west to the Mess Corridor (I overshot to Rec Corridor by one move, my fault). `unlock padlock with key` -> "The padlock springs open." `open door` -> "The door cannot be opened until the padlock is removed." Fair. Then `remove padlock` -> "Your load is too heavy. Dropping the key would make enough room." - but the very next `open door` said "Opened." So did the padlock come off or not? It seems removing it off the hasp succeeded implicitly, or the game let me open the door despite refusing to take the lock. Either way it was confusing: the refusal message implied the action failed. `north` into Storage West (+4, score 10): a tin can of "Spam and Egz" and a heavy-duty extendable ladder. The ladder is surely for the 8-metre rift.

### Attempt 1, commands 158-171: Crossing the rift

`take ladder` gave a combined weight message this time: "You'd have to drop the laser, the survival kit, the canteen and the oil can first." I typed `drop laser, kit, canteen and oil can` (comma list with "and" parsed perfectly) and took the ladder. Back in the Mess Corridor the room now said "There is a padlock here." - so `remove padlock` earlier did unhook it onto the floor, it just did not say so.

Hauled the ladder to the rift. `extend ladder` -> "You couldn't possibly extend the ladder while you're holding it." `put ladder across rift` -> "far too short ... It had better be extended first." Both refusals told me exactly what to do. `drop ladder`, `extend ladder` ("around eight meters"), `put ladder across rift` ("comes to rest on the far edge, spanning the precipice"), `north`: I crossed (+4, score 14) to Admin Corridor North, with portals to "Administraativ Awfisiz" (W), "Tranzportaashun Suplii" (N) and "Plan Ruum" (E).

A second hunger warning came with "There is still goo in the survival kit you left in Storage West." - helpful, but that is a long way back, and it is the natural consequence of the weight limit forcing me to shed the kit to carry the ladder.

### Attempt 1, commands 172-191: Access cards, and the magnet bites me twice

West of Admin Corridor North: a Small Office with a desk. `open desk` -> "a kitchen access card and an upper elevator access card." Exactly what I was hunting for. `take cards` did not take both; it asked "Which do you mean, the kitchen access card or the upper elevator access card or the ID card?" Further west, a Large Office with a picture window and a wooden desk; `open wooden desk` -> "a shuttle access card".

Then I made a blunder the game had already warned me about. `take shuttle card` (+1): "The curved metal bar tugs toward the shuttle access card ... the magnetic stripe on the card looks smeared." I went back, `take all from desk` (+2, both cards taken) and again: the kitchen card got smeared. Only then did I `drop bar`. `examine kitchen card` confirms the stripe is smeared "as if the curved metal bar had been stuck to it while you carried them together"; the upper elevator card is intact ("A dark magnetic stripe runs along the back."). This is fair - the ID card incident was the warning - but it is harsh: two of three cards ruined in two commands, with the message arriving only after the damage. I also noticed the score still went up for the smeared cards, which feels odd if they are now useless. Also new: "You begin to feel weary. It might be time to think about finding a nice safe place to sleep." So hunger and sleep timers are both ticking.

### Attempt 1, commands 192-203: Riding the elevator to the Tower Core (stopping here)

With the magnet dropped and one good card, I walked back across the ladder (the room text now mentions "A metal ladder spans the rift", and crossing is narrated), down to the Corridor Junction and east to the Elevator Lobby. In the Upper Elevator, `slide upper elevator card through slot` -> "A recorded voice chimes 'Elevator enabled.'" and `push up button` -> "The elevator door slides shut ... vertical movement." Two `wait`s later it stopped at the top and opened; a third hunger stage arrived on the way ("You're now really ravenous and your lips are quite parched."). `south` took me into the Tower Core (+4, score 21): a small circular room with a spiral staircase up and exits NE and SW.

That is about 203 commands (195 game turns plus roughly eight refused moves that did not use a turn), so I stopped here. I am hungry at the "ravenous" stage, weary, and my food is in Storage West on the far side of the complex, so my next move would have been a food run or a quick look upstairs.

### Friction log
| # | Attempt/cmd | Where | What happened | Why it hurt | Suggested fix |
|---|---|---|---|---|---|
| 1 | `open bulkhead` (turn 6) | Deck Nine | "Why open the door to the emergency escape pod if there's no emergency?" | Positive: a refusal that doubles as a hint | none |
| 2 | `starboard`, `port`, `up` | Deck Nine / Reactor Lobby | Ship-relative directions all worked | Positive | none |
| 3 | `wait` x3 | Deck Nine | Explosion came on turn 18 after a few waits; each wait costs ~40 time units | Positive, pacing felt fine; a first-time player might wander further and miss it, but the explosion message is loud | none |
| 4 | `get in webbing` | Escape Pod | Understood first try; status line shows "in the safety web" | Positive | none |
| 5 | `wait` x14 (cmds 22-35) | Escape Pod | Long descent with several blank "Time passes..." turns | Mild tedium; no way to know how long to wait | Accept `wait N` / `wait until landing`, or compress the blank turns |
| 6 | `take kit and towel`, `open bulkhead`, `out`, `up` | Pod / Underwater | Multi-object take and the escape sequence all parsed naturally | Positive | none |
| 7 | `climb up` | Crag | Worked first try, matching the text's own hint | Positive | none |
| 8 | `read plaque` | Balcony | Phonetic Galalingua text, decodable and informative | Positive, flavourful | none |
| 9 | Rec Area door | Rec Area | Locked door with a dial 0-1000; `north` says "The door is closed." | Clear signal a combination is needed; fine | none |
| 10 | `put id card in slot` | Mess Hall | "The slot is shallow... It may be possible to slide something through the slot" | Positive: redirects the player to the right verb instead of a flat refusal | none |
| 11 | `slide id card through slot` | Mess Hall | Auto-removed card from uniform, "Inkorekt awtharazaashun kard" | Positive: clear failure, tells me I need another card | none |
| 12 | `examine canteen` | Mess Hall | Only "The canteen is closed." | Minor: no physical description of the canteen at all | Describe the object even when closed |
| 13 | `east` along the walkway corridor | Dorm Corridor | Long walk compressed into one move with a narrative line | Positive | none |
| 14 | Four identical dorm rooms | Dorms A-D | Identical text, nothing to find in any | Mild: four moves spent confirming emptiness | Give each dorm one distinguishing detail |
| 15 | Hunger warning | Upper Elevator | Warning plus "The goo in your survival kit would take care of both." | Positive: a timer that tells you the fix | none |
| 16 | `push up button` with no card | Elevators | "Nothing happens. The slot beside the buttons stays dark." | Positive: points at the slot as the missing piece | none |
| 17 | "The red door has opened since you were last here." | Elevator Lobby | Useful change note, though the room text already said it was open | Slight redundancy | Fine as is |
| 18 | `examine crevice` | Admin Corridor South | Revealed a key; room description then shows "a shiny object" | Positive: rewards examining scenery | none |
| 19 | `take key` / `reach into crevice` | Admin Corridor South | Both understood, both refused with a clear reason | Positive; the puzzle is legible | none |
| 20 | Systems Monitors | Systems Monitors | Status board of what is broken | Positive: gives the player long-term goals | none |
| 21 | `take all` over weight | Storage East | "Your load is too heavy. Dropping the ... scrub brush would make enough room." | Positive: names exactly what to drop | none |
| 22 | Physical Plant exits "northeast and southeast corners" | Physical Plant | I entered by going `west` but the way back is `northeast` | Mild disorientation (the map is not orthogonal) | Mention "back east" or accept `east` as an alias for the NE exit |
| 23 | Weight limit (second and third time) | Tool Room | Suggestions name a different item each time; I am juggling a lot | Mild inventory juggling, but the hints make it painless | none |
| 24 | Magnet smeared the ID card | Tool Room | Automatic event on picking up the magnet while carrying the card | Surprising; could be a trap if the card mattered. Fair and funny since the card was useless | none |
| 25 | `drop box and towel`, `take bar and laser` | Tool Room | Multi-object lists parse cleanly | Positive | none |
| 26 | `put bar in crevice` | Admin Corridor South | Magnet pulled the key out, key auto-taken | Positive, great payoff; no score for it though | Consider points for the key |
| 27 | `remove padlock` | Mess Corridor | Answered with a weight-limit refusal ("Dropping the key would make enough room"), yet `open door` then succeeded | Confusing: I could not tell if the padlock was off the door | Treat "remove padlock" as unhooking it (drop it on the floor if the player cannot carry it) and say so |
| 28 | Storage West | Storage West | +4 points, ladder and a tin can | Positive | none |
| 29 | `extend ladder` while holding / `put ladder across rift` unextended | Admin Corridor | Both refusals name the fix | Positive: the rift puzzle taught itself | none |
| 30 | `drop laser, kit, canteen and oil can` | Storage West | Comma-and list parsed | Positive | none |
| 31 | Weight limit vs hunger | Storage West / rift | Carrying the ladder forces dropping the food kit; hunger returns right after crossing, far from the kit | Mild frustration: a long backtrack | Let the kit be very light, or make the hunger interval a bit longer |
| 32 | `take cards` | Small Office | Asked "Which do you mean, the kitchen access card or the upper elevator access card or the ID card?" instead of taking both | Plural noun should mean "all matching"; the ID card in my uniform made it worse | Treat plural "cards" as all visible matching cards (or all cards in the desk) |
| 33 | Magnet smears shuttle and kitchen cards | Large/Small Office | Picking up a card while carrying the magnet ruins it; message comes after the damage; score still awarded | Harsh, easy to forget after one warning; two key items ruined in two commands | Warn on pickup ("the bar tugs toward the card - you hold them apart") the first time a real card is at stake, or make the damage need a few turns of carrying together |
| 34 | Sleep timer | Large Office | "You begin to feel weary..." | Positive as a warning, but stacks with hunger far from supplies | none |
| 35 | `slide upper elevator card through slot`, `push up button` | Upper Elevator | "Elevator enabled", ride narrated, door opens at top | Positive: the verb I learned at the mess hall slot carried over | none |
| 36 | Elevator ride | Upper Elevator | Needed two `wait`s after pushing the button before the door opened | Minor; natural enough | none |


### Report

I got through the whole opening and a good chunk of the complex in one attempt with no deaths: scrubbing on the Feinstein, the explosion, the escape pod (got into the webbing, rode it down, grabbed the survival kit and towel, got out of the sinking pod), up the cliff to the Balcony and Courtyard, then through the Rec Area, dorms, Mess Hall, the long walkway corridor, the Elevator Lobby and teleport Booth 2, the Admin corridors, Systems Monitors, both Mech corridors, Storage East, the Physical Plant, Reactor Control, the Tool Room and the Machine Shop. Milestones: fished a key out of a crevice with a magnet, opened the padlocked Storage West (+4), bridged the eight-metre rift with the extendable ladder (+4), found three access cards in the Admin offices (+1, +2), and rode the upper elevator to the Tower Core (+4). Final score 21, 195 game turns, about 203 commands. I never met a robot companion, and I left the combination door (dial 0-1000), the teleport booths, the lower elevator, the Mess Hall kitchen door, Reactor Control's east door and stairway, the Machine Shop dispenser, the Courtyard's west exit, the Plain Hall's northeast branch, and the rooms north and east of Admin Corridor North (Tranzportaashun Suplii, Plan Ruum) untouched.

I was never really stuck. The only real setback was my own: I kept carrying the magnetic bar after it had smeared my (useless) ID card, and it went on to smear the shuttle and kitchen access cards the moment I picked them up. The game did warn me with the ID card, so it is fair, but it is a harsh trap: the damage message only comes after the damage, score is still awarded for the ruined cards (which muddied whether they still matter), and two key items went in two commands. The next biggest friction was inventory weight working against the survival timers: to carry the ladder I had to shed the survival kit (the game helpfully named exactly what to drop), and hunger came back right after the rift crossing with my food a long walk away, followed by a sleep warning. Smaller parser rough edges: `take cards` asked me to choose between three cards instead of taking the two in the desk; `remove padlock` answered with a weight-limit refusal even though it had in fact unhooked the lock and dropped it on the floor; and the pod descent needs about fourteen blank `wait`s.

What worked well is a long list. The parser handled everything I tried in natural IF phrasing: ship directions (port/starboard), `get in webbing`, `get out of webbing`, `take kit and towel`, comma-and lists for drop, `put bar in crevice`, `unlock padlock with key`, `extend ladder`, `put ladder across rift`, `slide X through slot`, `open wooden desk`, `take all from desk`. Refusals nearly always teach: "Why open the door to the emergency escape pod if there's no emergency?", "The slot is shallow ... It may be possible to slide something through the slot", "You couldn't possibly extend the ladder while you're holding it", "far too short ... It had better be extended first", "The slot beside the buttons stays dark". The weight messages that name what to drop, the hunger message that says where the goo is, and the one-move compression of the long walkway corridor all respected my time. The phonetic Galalingua signs and plaque are charming and still readable.

What I would change: make the magnet a little less punishing (a warning before a real card gets smeared, or damage only after carrying them together for a turn or two), treat plural nouns as "all matching", report the padlock landing on the floor when it cannot be carried, give the four identical dorms one detail each, and offer a `wait until` or shorter blank stretch during the pod descent.

### Verdict

A polished, fair and very readable opening: the parser understood almost everything an experienced player types, and its refusals usually point straight at the answer. The weak spots are the magnet-smears-cards trap (fair but unforgiving and easy to walk into twice) and the pull between the weight limit and the hunger and sleep timers, which forces long backtracks.
