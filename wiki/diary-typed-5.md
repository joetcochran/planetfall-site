# Round 5: typed-5, typed

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 5, 10 September 2026
- **Mode:** typed: commands typed into the parser
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Tower Core, turn 196, with 21 points.
- **Commands:** 207, with no deaths

The diary below is `playtests/2026-09-10/2026-09-10-typed-5.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind typed playtest: session `typed-5`
**Who:** Claude (Opus 5), blind playtester, typed free-form commands only  **Date:** 2026-09-10  **Session:** `typed-5` (`node scripts/playtest.mjs --session typed-5 --new`)

### Attempt 1, commands 1-16: Scrubbing duty on Deck Nine

I start as a lowly Ensign Seventh Class scrubbing Deck Nine with a brush. The room description gives me exits in ship terms: starboard, a gangway up, and a closed escape pod bulkhead to port. `look`, `inventory` and `examine brush` all worked straight away. The inventory nests nicely ("The Patrol uniform contains: An ID card"), and `examine card` quoted the card text. `examine chronometer` gave the time and a sweet engraving from Mom and Dad.

Ensign Blather turned up on turn 1, gave me thirty demerits, then fifty more, and wandered off. When I tried `talk to blather` he was already gone ("You can't see any blather here!"). The lowercase "blather" in that reply reads a little odd for a proper name.

`open bulkhead` got a nice in-character refusal: "Why open the door to the emergency escape pod if there's no emergency?" That tells me pretty clearly that an emergency is coming and the pod is my way out. `starboard` took me to the Reactor Lobby, but Blather showed up and pushed me back when I tried `aft`. So the game is fencing me in on Deck Nine for now, which is fine.

Back on Deck Nine, `scrub floor with brush` worked ("The floor is a bit shinier now.") and an alien ambassador arrived, dripping slime and handing me a brochure. I'm waiting to see what the emergency is.

### Attempt 1, commands 17-30: The explosion and the escape pod

`read brochure` was a lovely joke: the leading export of the ambassador's planet is the adventure game *Planetfall*. After two more waits the ambassador left and "A massive explosion rocks the ship... The door to port slides open." That was the emergency the bulkhead refusal had promised, so I went `port` straight away. Entering the Escape Pod gave me my first 3 points.

The pod has "a mass of safety webbing". With explosions outside, climbing in seemed the obvious move, so I typed `get in webbing` and got "You are now safely cushioned within the web." The status line changed to "Escape Pod, in the safety web", which is a clear confirmation. Then I just waited. `wait` and `z` both work. The launch sequence is well paced: the Feinstein blows up, the pod tumbles, the gyros whine, an ocean planet swings into view, then a voice says "Approaching planet...human-habitable." A few waits pass with no message at all, which made me wonder whether I should be doing something, but nothing in the text suggested I should, so I kept waiting. Now the pod is entering the atmosphere.

### Attempt 1, commands 31-46: Splashdown, the crag, and the balcony

After some tense text about islands, cliffs and a plateau covered in buildings, the pod "lands with a thud" and is "precariously balanced". A panel opens with a survival kit and a towel. I spent two more `z`s waiting for something else to happen. In hindsight that was a mistake, because "precariously balanced" was a warning. `get out of webbing` made the pod fall into the water. `take kit and towel` worked well: the multi-object reply ("survival kit: Taken. towel: Taken.") is exactly what I'd expect. `open door` flooded the pod, `out` put me Underwater, and `up` got me to the Crag with +3 (score 6).

The Crag description points at "a small structure... about eight meters above you. Even an out-of-shape Ensign Seventh Class could probably climb up to it." That's a great nudge, and `climb up` worked. `open kit` showed red, brown and green goo, clearly food. The Balcony plaque is written in phonetic mangled Galalingua. Read aloud it says "This stunning view of the Kalamontee Valley covers over forty square miles of that famous tourist spot. The large building at the bend in the Gulman River is the former provincial capital building." Decoding it is fun. `up` took me to the Winding Stair.

### Attempt 1, commands 47-58: Castle ruins and a locked dial door

At the top of the stair is a Courtyard in a ruined castle, with exits north, west and south (down). West Wing is a dead end of rubble. `search rubble` got "You find nothing unusual." That's a fair reply, and it didn't cost me much. North leads to a "Plain Hall" in a more modern style than the castle, with a branch to the northeast. North again is the Rec Area: games and tapes, exits east and south, and a door to the north that is "closed and locked" with a dial set to 0.

`examine games` and `examine tapes` both gave flavour (Double Fannucci!), which I liked, since scenery nouns that answer make the world feel solid. `examine dial` says "The dial can be turned to any number between 0 and 1000." So it's a combination lock, and I need to find the number somewhere. I won't brute-force it. I'll go looking for clues first.

### Attempt 1, commands 59-77: Dorms, a padlock, and the Mess Hall card slot

The Rec Corridor runs east-west with portals north and south. Dorm B (north) and Dorm A (south) are identical bunk rooms, and SanFac A is a dry toilet with a joke about unchanged toilet bowl design. `search bunks` found nothing. East of the corridor is the Mess Corridor: a small door to the north with a steel padlock that "has a keyhole on its underside", so I need a key. South is the Mess Hall, where I took an octagonal canteen from a bench.

The Mess Hall has a closed south door and a small slot next to it. My first try, `open south door`, got "You can't see any south door here!" That was a real parser miss, because the room description literally says "A door to the south". Plain `open door` worked and flashed "Pleez yuuz kitcin akses kard." (use kitchen access card). `put id card in slot` got a very helpful refusal: "The slot is shallow... It may be possible to slide something through the slot, though." So I typed `slide id card through slot` and got "Inkorekt awtharazaashun kard...akses deeniid." Good: the verb works and the game recognises my card as the wrong one. I now need a kitchen card, a padlock key, and a number for the dial door. `examine canteen` just says "The canteen is closed."

### Attempt 1, commands 78-93: Dorm crawl, the long walkway, and lunch

`open canteen` said "Opened." (empty, I assume). I carried on east to the Dorm Corridor, which has openings north and south and a dead motorized walkway heading east. I made the completionist's mistake of checking every dorm: Dorm D, Dorm C, SanFac C, SanFac D. They're all copies of each other and all empty, so that cost me about eight commands for nothing. The repetition is faithful to the setting, but a player learns quickly that these rooms hold nothing. That's fine, though a small unique detail in each would reward the visit.

`east` from the Dorm Corridor produced a lovely travel beat: "You walk down the long, featureless hallway for a long time. Finally, you see an intersection ahead..." It took about 160 time units. At the Corridor Junction the game warned me: "A growl from your stomach warns that you're getting pretty hungry and thirsty. The goo in your survival kit would take care of both." That's an explicit, friendly hint. `eat red goo` worked without needing to take it out of the kit first ("scrumptious cherry pie", and it quenched my thirst). East is the Elevator Lobby, with a blue door and button to the north, a red door and button to the south, and a phone-booth-sized room to the east.

### Attempt 1, commands 94-110: Elevators, a teleport booth, and a key in a crack

In the Elevator Lobby I pressed the blue button ("faint whirring"), then looked into the booth to the east. Booth 2 has a slot, a brown "1" button and a tan "3" button. `push brown button` got "Teleportaashun buux not aktivaatid." When I came back out, the blue door slid open on its own, which is a nice delayed result for the button press. `open blue door` then answered "It's already open!", which is fair enough, since I'd missed the message. The Upper Elevator has Up and Down buttons and a narrow slot. `push up button` got "Nothing happens. The slot beside the buttons stays dark." My ID card is refused here too. So at least three things need special cards: the kitchen, the elevator, and probably the teleport booth. The red button makes "The red door begins vibrating a bit." I'll come back to that.

North from the Corridor Junction is Admin Corridor South, with a jagged crevice in the floor. `examine crevice` rewarded me: "Lying at the bottom of the narrow crack... is a shiny steel key!" That's surely the padlock key. The room description now adds "Lying at the bottom of a narrow crevice is a shiny object." `take key` got "Either the crevice is too narrow, or your fingers are too large." So this is a tool puzzle. SanFac E to the east is just another dry toilet.

### Attempt 1, commands 111-130: The rift, Systems Monitors, and a storage room

The brush was no help with the key. `get key with brush` got "Nice try." and `put brush in crevice` got "You can't do that." I'll probably need something magnetic or sticky. North of Admin Corridor South, the building is "rent apart" by an earthquake. There's a rift "at least eight meters across and thirty meters deep", and `north` says "The rift is too wide to jump across." That's the chasm, and I'll need a bridge or a ladder. West is Systems Monitors, with Galalingua monitor labels: the library, reactors and life support are green, while planetary defense, planetary course control, communications and project control are all malfunctioning. That reads like the story's to-do list. `examine equipment` is suitably dismissive.

South of the Junction is Mech Corridor North. Storage East has an oil can and a cardboard box of electronics: a cracked fromitz board, a B-series and a K-series megafuse, and a ninety-ohm bedistor. Physical Plant to the west is a huge dim room of catwalks with exits "in the northeast and southeast corners". I then tried to go back `east`, the way I came in, and got "You can't go that way." twice. I had entered with `west`, so reversing the direction is the first thing any player tries. `northeast` worked. That hurt a bit. Then `take oil can and box` took the can, but the box came back with a helpful message: "Your load is too heavy. Dropping the... scrub brush would make enough room." It's great that the game names what to drop.

### Attempt 1, commands 131-146: Reactor Control, the Tool Room, and a magnet

I dropped the brush and brochure and took the box. Heading south, Mech Corridor has Reactor Control to the east. It has dials, a metal door with a button, and "a dark stairway winds downward", which I'll want a light for. Mech Corridor South splits three ways. The Tool Room (southwest) has a glass flask, "a metal bar, curved into a U-shape", wide-nosed pliers, and an "Akmee Portabul Laazur" with an old battery in it. The Machine Shop (south) has a big chemical dispenser with coloured coolant, catalyst, BAAS and ASID buttons. That's clearly for later.

`examine bar` clinched it: "A few metal filings cling to its ends." It's a magnet, and that's my key-in-the-crevice tool. The weight limit bit again, but again the refusals told me exactly what to drop ("Dropping the towel would make enough room", "Dropping the survival kit would make enough room"). I dropped the box and towel here, so everything technical is now stashed in the Tool Room, and took the bar and pliers. One oddity: after all the juggling, my inventory lists the ID card at the top level rather than inside the uniform. Maybe it was quietly moved during a take. It doesn't matter, but it surprised me. Next I'll go fish for the key.

### Attempt 1, commands 147-160: Fishing the key, opening the padlock, finding a ladder

Back at the crevice, `put bar in crevice` got "You can't do that." That's a bit abrupt, since lowering a magnet into a crack is exactly what I meant. `get key with bar` worked beautifully: "With a spray of dust and a loud clank, a piece of metal leaps from the crevice and affixes itself to the magnet. It is a steel key!" No points for it, which surprised me a little.

Then I made the long walk west to the Mess Corridor. `unlock padlock with key` ("The padlock springs open."), `remove padlock` ("Taken."), `open door`, `north`. The parser took all four standard phrasings without complaint. Storage West gave me +4 (score 10). Inside are a tin can labelled "Spam and Egz" and "a heavy-duty extendable ladder". An extendable ladder next to an eight-meter rift is about as clear a pairing as you get, so the ladder goes to the rift next.

### Attempt 1, commands 161-173: Hauling the ladder and bridging the rift

`take ladder` listed everything I'd have to drop first. I tried `drop all except card and key` and it worked perfectly: six "Dropped." lines, card and key kept. That's a real power-user phrasing and I was pleased it parsed. Then I walked the ladder back along the long hall to the rift. On the way the hunger warning came back, this time with "There is still goo in the survival kit you left in Storage West." That's a very kind reminder, though it's also a clock I now have to watch. I'd dropped the food to carry the ladder.

At the rift, `extend ladder` got "You couldn't possibly extend the ladder while you're holding it." and `put ladder across rift` got "far too short... It had better be extended first." Both refusals told me the exact next step. So I did `drop ladder`, `extend ladder` ("around eight meters") and `put ladder across rift`: "The ladder swings out across the rift and comes to rest on the far edge, spanning the precipice." That was a very satisfying chasm puzzle, and I'm about to cross.

### Attempt 1, commands 174-183: Across the rift, three access cards

Crossing gave a nice vertigo line ("sharp, pointy rocks at the bottom of the rift, far below...") and +4 (score 14). Admin Corridor North has three signed portals: Administrative Offices (west), Transportation Supply (north), Plan Room (east). I went west first, because offices mean desks and desks mean cards. The Small Office desk has a drawer. `search desk` usefully told me about the drawer instead of just saying "nothing". `open drawer` revealed a kitchen access card and an upper elevator access card, and `take all from drawer` got both (+2, score 16). The Large Office further west has a picture window and a wide desk. `open desk` revealed a shuttle access card, and `take all from desk` got it (+1, score 17).

A new timer also started: "You begin to feel weary. It might be time to think about finding a nice safe place to sleep." Between hunger, sleep and the carry limit, the game is starting to press on me. Luckily I passed a dozen bunks on the way here.

### Attempt 1, commands 184-201: A dark room, the map room, and the elevator ride

North of Admin Corridor North (Transportation Supply) is "pitch black. You might be eaten by a grue." I retreated at once, since I have no light yet. The Plan Room has two wall maps, "Kalamontee Kompleks" (where I am, marked "Yuu ar heer") and "Lawanda Kompleks" (two installations, one deep underground). That suggests a whole second complex, presumably reached by the shuttle card.

With my budget nearly gone, I spent it on the most concrete lead: the upper elevator card. I walked back over the ladder. The Elevator Lobby now noted "The red door has opened since you were last here", a nice touch acknowledging my earlier button press. In the Upper Elevator, `slide upper elevator card through slot` got "A recorded voice chimes 'Elevator enabled.'" and `push up button` started the ride. It took two waits, during which I got two more warnings: "really ravenous and your lips are quite parched" and "really tired now". The door then opened. My `north` got "You can't go that way." That was my mistake, since the door is to the south, but I'd been thinking "I walked north in, so north is onward". `south` put me in the Tower Core, a circular room with a spiral staircase up and exits northeast and southwest, for +4 (score 21). I stopped there, hungry, tired and out of commands.

### Friction log
| # | Attempt/cmd | Where | What happened | Why it hurt | Suggested fix |
|---|---|---|---|---|---|
| 1 | A1 `look`/`inventory`/`examine card` | Deck Nine | All understood, nested inventory shown | Positive | - |
| 2 | A1 `talk to blather` | Deck Nine | "You can't see any blather here!" (he had just left) | Minor: lowercase proper noun in reply | Echo the name as the player's noun but capitalise known NPC names |
| 3 | A1 `open bulkhead` | Deck Nine | In-character refusal hints at a coming emergency | Positive, good foreshadowing | - |
| 4 | A1 `aft` in Reactor Lobby | Reactor Lobby | Blather pushes you back; time does not advance on that turn | Fine; fences the opening | - |
| 5 | A1 `scrub floor with brush` | Deck Nine | Understood, flavour reply | Positive | - |
| 6 | A1 `read brochure` | Deck Nine | Meta joke brochure | Positive, charming | - |
| 7 | A1 `port` after explosion | Deck Nine -> Escape Pod | Entered the pod, +3 score | Positive, clear cause and effect | - |
| 8 | A1 `get in webbing` | Escape Pod | Understood; status line shows "in the safety web" | Positive | - |
| 9 | A1 `z` x6 during descent | Escape Pod | Several silent turns between messages | Mild doubt about whether I should act | Maybe an occasional ambient line ("The pod hums as the autopilot computes a course") |
| 10 | A1 `z` after landing | Escape Pod | Pod "precariously balanced", I waited 2 turns | No penalty, but I was unsure whether waiting was dangerous | Fine as is; the tension works |
| 11 | A1 `take kit and towel` | Escape Pod | Per-object "Taken." lines | Positive | - |
| 12 | A1 `open door` / `out` / `up` | Pod -> Underwater -> Crag | Natural escape sequence, +3 | Positive | - |
| 13 | A1 Crag description | Crag | Explicitly suggests climbing to the structure | Positive, fair signposting | - |
| 14 | A1 `read plaque` | Balcony | Phonetic Galalingua, decodable | Positive, flavourful | - |
| 15 | A1 `search rubble` | West Wing | "You find nothing unusual." | Fine; dead end is clearly signposted as rubble | - |
| 16 | A1 `examine games` / `examine tapes` | Rec Area | Flavour replies for scenery | Positive | - |
| 17 | A1 `examine dial` | Rec Area | Range 0-1000 stated | Positive, tells me it's a combination | - |
| 18 | A1 `open south door` | Mess Hall | "You can't see any south door here!" | Room text says "A door to the south"; a direction adjective on a door is standard IF phrasing | Accept compass-direction adjectives for doors (south door, north door) |
| 19 | A1 `put id card in slot` | Mess Hall | Refusal suggests sliding instead | Positive, teaches the verb | - |
| 20 | A1 `slide id card through slot` | Mess Hall | Understood; wrong card message in Galalingua | Positive | - |
| 21 | A1 `examine canteen` | Mess Hall | "The canteen is closed." only | Minor: no physical description | Describe the canteen briefly as well as its state |
| 22 | A1 exploring Dorms C/D, SanFacs | Dorm Corridor area | Identical empty rooms | Cost me about 8 commands; no reward | A unique scrap of detail per dorm would make the exploration feel less wasted |
| 23 | A1 `east` down the long hallway | Dorm Corridor -> Corridor Junction | Travel narration and a big time jump | Positive, conveys scale | - |
| 24 | A1 hunger warning | Corridor Junction | Explicit hint that the goo cures hunger and thirst | Positive, fair | - |
| 25 | A1 `eat red goo` | Corridor Junction | Worked directly from inside the open kit | Positive | - |
| 26 | A1 blue button then leaving booth | Elevator Lobby | Door opened a turn later with its own message | Positive, but easy to miss | - |
| 27 | A1 `push up button` without a card | Upper Elevator | "The slot beside the buttons stays dark." | Positive: points at the slot | - |
| 28 | A1 `examine crevice` | Admin Corridor South | Reveals the steel key | Positive, rewards examining | - |
| 29 | A1 `take key` | Admin Corridor South | Too narrow for fingers | Clear puzzle statement | - |
| 30 | A1 `get key with brush` | Admin Corridor South | "Nice try." | Fine, but gives no hint about what kind of tool | Could hint "Something thin or magnetic might reach it" |
| 31 | A1 `north` at the rift | Admin Corridor | "too wide to jump across" | Positive, clear obstacle | - |
| 32 | A1 Systems Monitors | Systems Monitors | Monitor list spells out the broken systems | Positive, gives a sense of goals | - |
| 33 | A1 `east` from Physical Plant (entered via `west`) | Physical Plant | "You can't go that way." | Reversing my entry direction failed; had to use `northeast` | Make the reverse of the entry direction work, or say "The exits are northeast and southeast" in the refusal |
| 34 | A1 `take oil can and box` | Storage East | Box refused for weight; game names the brush as what to drop | Positive, very helpful | - |
| 35 | A1 `examine bar` | Tool Room | "metal filings cling to its ends" | Positive, fair hint for a magnet | - |
| 36 | A1 carry limit | Tool Room | Frequent weight refusals, each naming an item to drop | Inventory juggling is tedious, but the named suggestions soften it a lot | Positive overall |
| 37 | A1 `i` after juggling | Tool Room | ID card now listed loose, no longer "in the uniform" | Mildly confusing; I never took it out | Keep the card in the uniform pocket unless the player removes it, or say when it moves |
| 38 | A1 `put bar in crevice` | Admin Corridor South | "You can't do that." | This is how many players would phrase lowering a magnet | Treat "put/lower magnet in crevice" as the same as "get key with magnet" |
| 39 | A1 `get key with bar` | Admin Corridor South | Key leaps to the magnet | Positive, satisfying | - |
| 40 | A1 `unlock padlock with key` / `remove padlock` / `open door` | Mess Corridor | All phrasings accepted | Positive | - |
| 41 | A1 Storage West | Storage West | +4 and an extendable ladder | Positive: the obvious answer to the rift | - |
| 42 | A1 `drop all except card and key` | Storage West | Worked exactly as intended | Positive, strong parser | - |
| 43 | A1 hunger reminder naming where the kit is | Admin Corridor | "There is still goo in the survival kit you left in Storage West." | Positive, but the carry limit forces a long round trip for food | - |
| 44 | A1 `extend ladder` while holding / `put ladder across rift` unextended | Admin Corridor | Both refusals name the fix | Positive, teaching refusals | - |
| 45 | A1 drop, extend, `put ladder across rift` | Admin Corridor | Bridge laid | Positive milestone (crossing a chasm) | - |
| 46 | A1 crossing the ladder | Admin Corridor North | +4, vivid crossing text | Positive milestone | - |
| 47 | A1 `search desk` | Small Office | Points out the closed drawer | Positive, better than a flat "nothing" | - |
| 48 | A1 `take all from drawer` / `take all from desk` | Offices | Multi-take from containers works; points awarded | Positive | - |
| 49 | A1 weariness warning | Small Office | Sleep timer starts | Fair warning, adds pressure alongside hunger | - |
| 50 | A1 `north` into Transportation Supply | Transportation Supply | Pitch black, grue warning | Fair; I retreated | - |
| 51 | A1 Plan Room maps | Plan Room | Maps name both complexes | Positive orientation aid | - |
| 52 | A1 "The red door has opened since you were last here." | Elevator Lobby | Game recalls my earlier action | Positive | - |
| 53 | A1 `slide upper elevator card through slot` / `push up button` | Upper Elevator | Elevator enabled and rides up | Positive milestone (elevator ride) | - |
| 54 | A1 `north` on arrival at the top | Upper Elevator | "You can't go that way." (door is south) | My error, but the arrival message doesn't restate where the door is | On arrival, say "The door slides open to the south" |
| 55 | A1 food left in Storage West | whole second half | Ladder carrying forced me to abandon food; hunger escalated | Carry limit and hunger interact harshly across a long map | Fine for difficulty; the reminder text helps |

### Report

I played one attempt of about 201 commands with no deaths, finishing at **21 points** in the **Tower Core**, just off the top of the upper elevator. Milestones reached: surviving the Feinstein's destruction in the escape pod, swimming up to the Crag, climbing to the castle Courtyard, fishing a steel key out of a crevice with a magnet, opening a padlocked storeroom, **crossing the rift** with an extended ladder, collecting three access cards (kitchen, upper elevator, shuttle) from the administrative offices, and **riding the upper elevator**. I did not meet a robot companion, open the dial-lock door in the Rec Area, use the kitchen or shuttle cards, or explore Reactor Control's dark stairway or the dark Transportation Supply room. I also never found a light source. At the end I was ravenous and exhausted, with my food stashed far away in Storage West.

I was never truly stuck. The game signposts its puzzles well. The bulkhead refusal foreshadows the emergency, the Crag practically says "climb up", the hunger message names the goo, "metal filings cling to its ends" tells you the bar is a magnet, and the ladder refusals spell out "drop it, then extend it". The parser handled almost everything I threw at it: `take kit and towel`, `take all from drawer`, `drop all except card and key`, `unlock padlock with key`, `slide id card through slot`, `get key with bar`, `put ladder across rift`, `eat red goo` straight from the open kit. The refusal texts are often excellent teaching moments. The best was the slot's "you can't put anything in it... It may be possible to slide something through the slot."

The main points of confusion were small but real. `open south door` wasn't understood even though the room says "A door to the south". `put bar in crevice` got a flat "You can't do that." when that's a natural way to lower a magnet. In the Physical Plant I entered with `west`, but `east` wouldn't take me back (the exits are corner directions). I got "You can't go that way." on leaving the elevator because the arrival text didn't restate where the door was. Structurally, the carry limit, a very long corridor, and two survival timers (hunger, then sleep) combine so that hauling the ladder forced me to abandon my food on the far side of the map. The game's reminder of where I left the kit is thoughtful, but it's still a long round trip. The identical dorms and toilets cost me roughly eight commands for no reward.

What I'd change: accept compass adjectives on doors; map "put/lower X in crevice" onto the tool-use action; make "You can't go that way." in rooms with unusual exits list the real exits; restate door direction when an elevator arrives; and consider one small unique detail in each copy-paste dorm so exploring them isn't pure waste.

### Verdict

A polished, fair and well-signposted opening that rewarded careful reading at nearly every step. The parser is strong, handling multi-object, "all except" and tool phrasings. The few misses were door adjectives, one tool phrasing and asymmetric exits, all cheap to fix. The survival timers plus the carry limit are the main source of pressure. They're fair but can feel punishing on a long map.
