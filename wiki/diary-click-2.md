# Round 2: click-2, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 2, 10 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Dorm D, turn 191, with 8 points.
- **Commands:** 203, with no deaths

The diary below is `playtests/2026-09-10/2026-09-10-click-2.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest: session `click-2`

**Who:** a blind playtester who has never seen this game, playing as a mouse-only player. I may only choose what the "On screen you can:" list offers; I never type free text.
**Date:** 2026-09-10
**Session:** `click-2` (`node scripts/playtest.mjs --session click-2 --new --click`)

### Attempt 1, turns 0-7: scrubbing the deck, and a wall of options

I am an Ensign Seventh Class with a scrub brush on Deck Nine of a ship called the Feinstein. The opening text is funny and sets a tone: drudgery, a nasty superior called Blather. The very first option list is already 25 entries long, most of them for things I am carrying (my uniform alone has six actions, including "put scrub brush in", which is oddly specific). I read my ID card (a serial number, nothing useful yet).

Blather walks in and threatens demerits. The list offers "salute", "attack", "talk to" and three "throw X at" entries. I salute, because I am a lowly ensign; he softens slightly. Good: the click UI made "salute" discoverable, which I would probably not have typed.

I examine the escape pod: "nothing special", which feels wrong for the one interesting thing in the room. I try "open escape pod bulkhead": the game asks why I would open it if there's no emergency. That is a clear tell that an emergency is coming, so I file it away.

I walk east to the Reactor Lobby (reactor to starboard, auxiliary control aft). Blather follows and shoves me back when I try to go south; the turn counter does not even advance. So I am confined to my post. Back on Deck Nine an alien ambassador oozes slime on my floor and hands me a brochure. The brochure is a fourth-wall joke advertising the game itself. He asks if I want a game of Bocci; I have no way to say yes with the mouse, so I "talk to" him and he shrugs with his knee. Charming, but I am now just waiting for the plot to happen.

### Attempt 1, turns 8-31: waiting for the bang, then a long ride down

"examine translator" answers "nothing special about the transl." (the noun is cut off). The chronometer is engraved by Mom and Dad and confirms the status-line time is a clock. I sneak up the gangway to Deck Eight (Hyperspatial Jump Machinery to the fore) but Blather appears instantly and blocks north as well. So the whole ship is a cage. Back on Deck Nine, the arrival text is the ambassador's description instead of the room's; he then leaves.

I wait, search my uniform (nothing), wait again: explosion, and the pod door slides open. The "open bulkhead" line earlier told me exactly what to do, so I get in the pod (score 3) and, seeing "safety web: get in", strap myself in. Good call: the door clangs shut next turn and the Feinstein blows up. Notable UI oddity: inside the pod the exits still list "go east" and "go up", and the pod itself offers "get in" while I am already inside it.

Then a long automated descent: about twelve turns of "wait" with a paragraph of narration on most of them (two of them silent). The prose is good (the viewport polarising, the sun swinging into view, an ocean world with a small ice cap, a plateau covered in buildings), but as a click player there is nothing to do except press 7 twelve times. When I examine the controls the game repeats "entirely automated", so at least it tells me. Landing: the pod rocks "as if precariously balanced" and a panel opens with a survival kit and a towel. The list shows both, but neither has "take" while I am in the web; I only get examine/read/open. I have to guess that leaving the web is what unlocks them.

### Attempt 1, turns 32-44: the pod sinks, a towel, and a plaque in phonetic English

Standing up tips the pod off its perch and into the sea. Water rises past the viewport. "take" appears on the towel and kit only once I am out of the web, so my guess was right, but the game never said so. I grab the kit, then the towel (Don't Panic), by which time the pod is fully submerged and smashing against rocks. I open the bulkhead and cold water rushes in. Now the exit list says "go east" and "go up"; east is the way the door faced from the corridor, so I click it: "You can't go that way." A listed exit that does not work is the worst kind of click-UI bug, because clicking is the only thing I can do. "go up" works and I surface at a crag, score 6.

On the crag I open the survival kit: three blobs of goo (red, brown, green), each only examine/drop/eat, and "examine" says nothing special. The option list balloons to 54 entries, mostly "put X in uniform" and "put X in kit" permutations. The towel reads "S.P.S. FEINSTEIN, Escape Pod #42, Don't Panic!" I climb to a balcony with shattered windows and a plaque in "corrupt Galalingua", which turns out to be phonetically spelled English ("Seenik Vista ... Kalamontee Valee"). I can decode it by reading aloud: the valley is now ocean, so whatever lived here is long gone. A great piece of world-building and the click UI surfaced "read plaque" nicely. Up a winding stair to a ruined castle courtyard with openings north and west, and rubble I can "move".

### Attempt 1, turns 45-54: a locked door with a dial, and a dead-end bathroom

"move rubble" gets "A valiant attempt", which I take as "nothing here". North of the courtyard the construction turns modern: a Plain Hall (north, south, northeast), then a Rec Area with games and tapes and a locked door to the north with a combination dial set to 0. The click UI shows "set to a number <value>" on the dial, which is the first two-number entry I have seen; it is clear enough. Examining the dial: 0 to 1000. Games and tapes are flavour (Double Fannucci, romantic novels). No number anywhere yet, so I leave it.

East is a Rec Corridor hub (N, S, E, W, SW). North of it is Dorm B, a huge empty bunk room, which I note as a place to sleep, and beyond that SanFac B, a dusty bathroom with a nice line about toilet bowl design. Dead end. Coming back through Dorm B the room prints only its name and no description, which is fine for speed but I am relying on the list to remember what is here.

### Attempt 1, turns 55-66: padlock, canteen, and a list that hands me the answer

South of the hub is Dorm A and SanFac A, exact twins of B. East is a Mess Corridor with a small door padlocked shut; the padlock offers only "examine" and says nothing special. There is no "unlock", "break", or "hit padlock with brush", so with the mouse I cannot even express an attempt. I file it as "needs a tool".

South is the Mess Hall: tables, benches, a closed door with a slot beside it, and an octagonal canteen on a bench. I take the canteen. "look inside canteen" answers "Opened." with no contents, and I have to click it again to learn it is empty. Opening it also added seven "put X in canteen" entries (including "put survival kit in canteen"), pushing the list to 70. I close it again to tidy up.

The moment I entered the Mess Hall, my ID card gained a new action: "slide through slot". That is the click UI solving the puzzle for me. A parser player would have to think "card, slot, hmm"; a mouse player just sees it. I am going to use it, because it is on the list, but it should be noted as a giveaway.

### Attempt 1, turns 67-73: access denied, and the long walk east

The slot flashes "Inkorekt awtharazaashun kard...akses deeniid." So my Patrol ID is the wrong card; there must be a proper card somewhere. East along the Mess Corridor is a Dorm Corridor with a dead motorised walkway stretching east "into the distance". North is Dorm D (another twin); I skip its bathroom and the presumed Dorm C to save turns. Walking east along the walkway is a single click but costs 160 units of clock time and prints a nice "you walk for a long time" line, so the time budget clearly matters. At a Corridor Junction (N, S, E, W) I go east into a bright Elevator Lobby: a blue door with a blue button, a red door with a red button, and a telephone-booth-sized room to the east. The click list shows "blue button: push" and "red button: push", which is exactly what a mouse player wants.

### Attempt 1, turns 74-80: teleporter booth, and an elevator that opened in silence

I push the blue button and hear whirring. While I wait I step into the booth to the east: "Booth 2", with a "1" and a "3" button and a slot. Pushing 3 gives "Teleportaashun buux not aktivaatid" and my ID card is again "inkorekt". So there is a teleport network I cannot use yet, and one card would presumably open everything. Back in the lobby the room prints only its name, but the Exits line has quietly changed from "open blue door" to "close blue door": the elevator arrived while I was away and the game did not say so. I only noticed because I read the list carefully. North into the Upper Elevator: Up and Down buttons and a slot. The button entry is one line, "button: push up / push down", which is compact and clear.

### Attempt 1, turns 81-87: everything wants a card I do not have

"push up" in the elevator: "Nothing happens." I try "close blue door" (it is on the list) and get "You can't close it yourself." The ID card in the elevator slot is refused as well. So by turn 83 I have found four card-gated things (mess hall door, teleport booth, elevator, and presumably the padlock is a different key) and my card opens none of them. I do not feel stuck exactly, but every road ends at the same locked gate and I have no lead on where the right card is. My plan is to sweep the exits I skipped: the junction's north and south, Rec Corridor west and southwest, Plain Hall northeast, Courtyard west.

North of the junction is Admin Corridor South, cracked walls and a crevice in the floor. Its eastern opening is SanFac E, yet another dusty bathroom. That is my fifth bathroom, and none of them has anything.

### Attempt 1, turns 88-94: the rift, the monitors, and cherry pie

North of the damaged corridor the building is torn open: sky through the roof, rubble, and a rift eight metres wide and thirty deep. The click list lists "go north" (straight into the rift) as a normal exit and gives "throw into rift" to the brush, brochure, towel and survival kit but not to the ID card, canteen, chronometer or goo. That inconsistency makes me suspect the rift is a puzzle where throwing specific things matters, which may be a false lead. West is Systems Monitors: a wall of monitors in phonetic English, three green (Library, Reactors, Life Support) and four red (Planetary Defense, Planetary Course Control, Communications, Project Control). That reads like the game's agenda, which I appreciate, although I have no way to act on it yet; the equipment "is so complicated you couldn't begin to operate it".

Leaving, my stomach growls: hungry and thirsty. I eat the red goo (cherry pie). Thirst worries me: the canteen is empty and every fixture is dry. I have not seen any water except the ocean. I head back to the junction to try its southern branch.

### Attempt 1, turns 95-100: a storage room, at last some objects

South of the junction is Mech Corridor North with rooms east and west. East is Storage East: an oil can on a shelf and a cardboard box holding a cracked fromitz board, B- and K-series megafuses and a "good ninety-ohm bedistor". The room listing shows the box contents inline, which is helpful. I take the whole box in one click (nice), then "take oil can" answers "Your load is too heavy." I drop the scrub brush (finally) and take the oil can. The list is now 85 entries, dominated by "put X in uniform / kit / box" triples for every item I carry. The oil can is my first guess for the padlock (a rusty lock) and the spare parts presumably fix one of the red monitors, though I have no idea where yet.

### Attempt 1, turns 101-106: physical plant and reactor control

West of Mech Corridor North is a huge dim Physical Plant with catwalks and dead heating equipment; its southeast corner drops me into the middle Mech Corridor, which again has rooms east and west. East is Reactor Control: dials and gauges, a wall diagram, a metal "reactor elevator" door with a button, and a dark stairway winding down. Reading the diagram: "Not unless you've taken a twelve-year course in ninth-order molecular physics", a good joke but nothing to use. I do not have a light, so the dark stair is out for now. I push the button and the elevator door slides open. This one did not ask for a card, which is a relief.

### Attempt 1, turns 107-112: another slot, and a room that was the same room

The Reactor Elevator has Up, Down and a "small slot". "push down": nothing happens. I do not bother with the ID card; I have learned the pattern. Back in Reactor Control the door slides shut on its own. West of the middle Mech Corridor turns out to be the Physical Plant again (its second door), which the exit list gave no hint of, so that is a two-turn round trip for nothing. I am now at 112 turns of a 250 budget with score 6, five card-locked mechanisms, a padlock, a combination dial, a dark stair, and a rift, and no key to any of them. The unexplored exits left are: Mech Corridor south, Rec Corridor west and southwest, Plain Hall northeast, Courtyard west, and Dorm C. I go south.

### Attempt 1, turns 113-117: the chemical dispenser and a canteen with a narrow mouth

South of Mech Corridor South is a Machine Shop with a dispenser: four coolant buttons (red, blue, green, yellow), three catalysts (gray, brown, black), and two white buttons for "BAAS" and "ASID". Nine push buttons each listed on their own line, plus the canteen has sprouted "put under spout". The list is 105 entries. I put the canteen under the spout, open it (a second turn; I guessed a closed canteen would not fill), and push red: "the mouth of the canteen is very narrow, and the fluid just splashes over it." So I need a funnel or a wider vessel. I have no such thing. The click UI led me to this spot and then to a wall: it showed me "put under spout" as if it were the answer, and the answer needs an object I have not found.

### Attempt 1, turns 118-122: Floyd

East of the Machine Shop is a Robot Shop full of disassembled robots, and one four-foot "multiple purpose robot" that looks nearly working. The list offers "turn on", "turn off", "look inside", "search", and thirteen "put X in robot" entries, which is a strange way to present a character. I examine it (leaning against the wall, head lolling, turned off) and turn it on: "Nothing happens." But my score ticks from 6 to 8, which is the game contradicting itself: the text says nothing happened and the score says it did. I wait one turn and the robot springs up: "Hi! I'm B-19-7, but to everyperson I'm called Floyd." He wants to play Hider-and-Seeker. This is the best moment of the run so far. The list immediately grows "talk to / salute / attack / listen to" plus nine "throw X at" Floyd entries. "attack" and "throw survival kit at" a friendly robot feel wrong to have front and centre, but I can ignore them.

### Attempt 1, turns 123-128: the Tool Room, and a list of 171 entries

"talk to" Floyd gets "Hi!" and a bounce; there is no way to ask him anything. Northwest from the Robot Shop is just Mech Corridor South again (the map loops), and Floyd follows me with a line each time. Southwest is a Tool Room: a large glass flask, a U-shaped metal bar, wide-nosed pliers, and an "Akmee Portabul Laazur" containing an old battery, with a setting dial. The list is 171 entries; the four real objects are buried among "put X in flask", "put X in laser", "put X in Floyd", and "throw X at Floyd". "take pliers": too heavy. I drop the cardboard box of parts here (it is central, I can return), then take the pliers and the bar. The flask is my plan for the dispenser (wide mouth); the bar is for the padlock; the pliers are for something I have not seen yet.

### Attempt 1, turns 129-133: the flask works, but what is the recipe?

I take the flask, then "take laser": too heavy. I drop the brochure: still too heavy. I leave the laser and its old battery in the Tool Room. Its east door is the Machine Shop's west door (a two-way shortcut the exit list did not advertise). The flask gets "put under spout" the moment I enter, same as the canteen did. I place it, push red: "The flask fills with some red chemical fluid. The fluid gradually turns milky white." A "quantity of chemical fluid" appears in the room list with only "examine". So the dispenser is a mixing puzzle, coolants plus catalysts plus base or acid, and I have not seen a single clue about what to mix. With no recipe, a mouse player can only push buttons at random, which I will not spend my remaining ~115 turns on.

### Attempt 1, turns 134-139: back across the complex with a crowbar

"examine chemical fluid": nothing special. I take the flask (the fluid becomes a separate carried object, and the uniform now offers "put quantity of chemical fluid in"). Floyd stops following me somewhere around here without comment. I walk north through the three Mech Corridor sections to the junction, four clicks of bare room names, and turn west for the long walkway. My plan for the last ~110 turns: (1) try the curved bar on the padlock in the Mess Corridor, (2) sweep Rec Corridor west and southwest, Plain Hall northeast, Courtyard west, which are the last unexplored exits, and (3) if I find a card, ride the elevator. Thirst is still unsolved; the flask holds chemicals, not water.

### Attempt 1, turns 140-142: the padlock, and the wall a mouse cannot climb

Floyd catches up in the Dorm Corridor and barrels into me. In the Mess Corridor I am standing at the padlocked door holding a U-shaped steel bar and a pair of wide-nosed pliers, and the list gives me: padlock: examine. Bar: examine, drop. Pliers: examine, drop. "open door" says "The door cannot be opened until the padlock is removed", which confirms the padlock is the puzzle. I type the thing a keyboard player would type, "break padlock with curved metal bar", and the harness rejects it: "That is not one of the options on screen (MUNG padlock with curved metal bar is not in any menu)." So the parser knows the verb (it even names it) and a mouse player simply cannot reach it. This is the single clearest click-mode failure of the run: I have the right tools, I know the target, and the interface gives me no verb.

### Attempt 1, turns 143-146: the map closes, and the last door is a view

Rec Corridor southwest is just the Plain Hall (so the Plain Hall's northeast was that same passage), which by elimination means Rec Corridor west is the Rec Area. The map is a set of loops, and I have now walked all of it except the bathrooms I skipped. The last unexplored exit, Courtyard west, is the West Wing: rubble, a view of cliff and ocean, exits east and "down" (off the cliff, presumably; it is listed like any other exit). Floyd bounds in behind me. I am out of new places. Everything that remains is a locked thing: card slots (mess door, elevator, teleporter, reactor elevator), the padlock, the combination dial (0-1000), the dark stairway, the dispenser recipe, and the rift.

### Attempt 1, turns 147-150: tickling Floyd

"move rubble" in the West Wing: "What a concept!" Floyd scrawls his name on the wall with a crayon. Since he has compartments I try the container-ish verbs the list keeps offering on him: "look inside" and "search" both make him giggle ("You're tickling Floyd!", oil tears), and "listen to" says he is babbling. Lovely writing, and it is the only NPC interaction the mouse gives me: talk, salute, attack, listen, look inside, search, and put/throw things. There is no "ask Floyd about X", which is probably how a keyboard player would get a lead on cards or codes. With 100 turns left and every exit walked, my best remaining idea is the Rec Area dial: the only number the game has handed me is Escape Pod #42 on the towel, so I will try that, then give the padlock and stairs a last look before I stop.

### Attempt 1, turns 151-156: the dial, and Floyd's rumours

Back through the Courtyard and Plain Hall to the Rec Area with Floyd in tow. "examine door" says only "The door is closed". I set the dial to 42 ("10 42" worked exactly as the footer promised) and "open door": "The door is locked. You probably have to turn the dial to some number to open it." That is a fair message, and it confirms the dial is the whole puzzle, but I have found no number anywhere in 156 turns. Floyd meanwhile rubs his head on my shoulder and whispers rumours about a "Dr. Fizpick", which is the first proper name I have heard and probably a lead a keyboard player could follow with "ask Floyd about Fizpick". I cannot.

### Attempt 1, turns 157-160: guessing numbers with Floyd

"play games" is a nice touch: I play with Floyd until I drop, exhausted, and he pokes me to play more. Then I try the only other numbers the game has shown me, the groups on my ID card: 531 and 541, each a two-click set-then-open. Each attempt earns a different Floyd line (rumours about Dr. Fizpick, fretting about his batteries failing, wandering restlessly). The "batteries failing" line makes me wonder whether the old battery in the laser, or the parts in the box, are meant for Floyd, but the only Floyd verbs are put/throw, and I am not going to throw a megafuse at him. I am at 160 turns; I will use what is left on one more sweep for anything I missed (Dorm C, the bathrooms I skipped) and then stop and write the report rather than brute-force a dial.

### Attempt 1, turns 161-166: the last sweep

With ~90 turns left I walk the last rooms I skipped: east through the Rec and Mess corridors to the Dorm Corridor, south into Dorm C (identical to A, B and D) and SanFac C (identical to A, B and E). Floyd bounds in behind me each time with "Floyd here now!", which is sweet the first three times and wallpaper by the sixth. It occurs to me I have never once clicked "examine fixtures" in any bathroom, so I do it here; if the game hid a clue in a toilet, this is my last chance to find it. After that I intend to stop: every exit is walked, every object I can pick up is picked up or deliberately stashed, and every remaining puzzle needs either a card, a number, a recipe, a light, or a verb I cannot click.

### Attempt 1, turns 167-169: a bed with no sleep button

Status at turn 167: time 7855, score 8, carrying chronometer, ID card, uniform, towel, survival kit (brown and green goo), canteen, oil can, flask (chemical fluid), curved bar, pliers. The box of parts, the laser, the brush and the brochure are stashed in the Tool Room / Storage East. I have not had a single "you are tired" message, but "manage sleep" is on my list, so in Dorm C I "get in bed" (the status line becomes "Dorm C, in the bed", nice). The Buttons row offers look, inventory, wait, get out of the bed. No sleep. I type "sleep": "no button for SLEEP." So a mouse player who is told they are exhausted will have a bed and no way to use it, unless "wait" in bed counts.

### Attempt 1, turns 170-176: last experiment, the dark stairway

Waiting in bed only passes time. As a probe of the list's stranger offerings I "put oil can in robot": Floyd examines it, shrugs, and drops it, and because I am still in bed the can on the floor shows no "take" until I get up. I decide on one final experiment with my remaining budget: the dark stairway in Reactor Control, to learn whether the game lets a lightless player walk into the dark, warns them, or kills them. It is a long way (the walkway walk alone is 160 time units). At the junction my stomach growls again; I eat the brown goo (Nebulan fungus pudding) and note that thirst has now been flagged twice with no water anywhere in the map I have seen. I am at turn 176 of 250.

### Attempt 1, turns 177-180: grue

On the way south the game tells me I am weary and should find a safe place to sleep; this is the first fatigue message of the run, and I already know the bed has no sleep button. In Reactor Control I click "go down" into the dark stairway: "It is pitch black. You might be eaten by a grue." I am alive, in a room called Reactor Access Stairs, and the list still offers "go down" plus Floyd's full 30-entry menu even though I cannot see him. So the game does the right thing (warns, does not instantly kill), and the click UI does a slightly wrong thing (shows a lit-room menu in the dark). I go back up. That was the last experiment I had; what remains is the sleep test and the report.

### Attempt 1, turns 181-188: sleep, a dream, and my inventory on the floor

Five moves back across the complex to Dorm D (the walkway walk again). This time "get in bed" says "Ahhh... the bed is soft and comfortable. You should be asleep in short order", and one "wait" later I sink into sleep, get a nightmare about the shuttle sinking and a giant spider, and wake on "SEPTEM 7, 11344" with the clock reset to 1643. Floyd is bouncing at the foot of the bed telling me to get up. So the sleep mechanic does work for a mouse player, with no sleep verb: you need to be weary, get in a bed, and wait. Nothing told me that at turn 169 when I tried the same bed unweary. Waking up, every item I carried except the worn chronometer and uniform is lying on the floor, listed with no "take" because I am still in bed. That is eight more clicks to re-arm once I stand, out of about sixty I have left. This feels like where the run should end: I have learned how the day cycle works, which is the last mechanic I could test.

### Friction log

| Turn | Where | What happened | Kind |
|---|---|---|---|
| 0 | Deck Nine | First list is 25 items, 13 of them for carried clothing/ID. "put scrub brush in uniform" is a strange thing to offer up front. | List too long / odd option |
| 3 | Deck Nine | "examine escape pod" -> "nothing special". The pod is the room's only feature; a mouse player expects a description here. | Unhelpful response |
| 4 | Deck Nine | "open escape pod bulkhead" -> "Why open... if there's no emergency?" Nice tell, not a complaint. | Positive / foreshadowing |
| 5 | Reactor Lobby | "go south" blocked by Blather, turn counter did not advance. Fine, but no hint that I am supposed to stay put until something happens. | Confusing |
| 6 | Deck Nine | "piece of celery" offers only examine/eat, no "take". The celery is in the ambassador's hand so maybe intended, but it looks like an item on the floor. | Missing action? |
| 7 | Deck Nine | Ambassador asks a yes/no question ("game of Bocci?") and the list has no yes/no. | Action not on list |
| 7 | Deck Nine | "translator" appears as scenery but the ambassador text only mentions it in passing; feels like an internal object leaking into the UI. | Mislabelled/scenery leak |
| 8 | Deck Nine | "examine translator" -> "nothing special about the transl." Truncated noun in the canned reply. | Text bug |
| 11 | Deck Eight | Blather blocks every direction on every deck; the game never says "stay at your post until something happens", so the first ten turns feel like probing a locked box. | Confusing (design) |
| 13 | Deck Nine | Re-entering the room prints the ambassador's description as the room description; the actual room text is missing. | Mislabelled |
| 17 | Escape Pod | Exits still list "go east" and "go up" inside the pod; "escape pod: get in" is offered while inside the pod. | Stale options |
| 19 | Escape Pod | "examine window" -> nothing special, while the narration is describing what is seen through it. | Unhelpful response |
| 20-31 | Escape Pod | Twelve consecutive "wait" turns with no decisions. Two of them print nothing at all. Fine for a parser game, tedious with a mouse. | Pacing |
| 31 | Escape Pod | Towel and survival kit appear but neither has "take" while I am in the web. No hint that the web is why. | Missing action / unclear |
| 32 | Escape Pod | "take towel"/"take survival kit" only appear once out of the web. Getting out is what sinks the pod, so a cautious player is punished for exploring the list. | Unclear gating |
| 35 | Escape Pod | Exit "go east" is listed but answers "You can't go that way." A listed exit must work or must not be listed. | Bug: dead option |
| 38 | Crag | Opening the kit pushes the list to 54 entries; 11 of them are "put X in uniform/kit" permutations. Hard to scan for what matters. | List too long |
| 39 | Crag | "examine blob of red goo" -> nothing special. Three coloured blobs and no way to tell them apart. | Unhelpful response |
| 42 | Balcony | "read plaque" worked well from the scenery list; phonetic Galalingua is a fun decode. | Positive |
| 47 | Rec Area | "set to a number <value>" on the dial is the first two-number option; the footer explains it, works fine. | Positive |
| 48 | Rec Area | Dial is 0-1000 and nothing in the room hints at a number. Not a complaint yet, just where a blind player will start worrying. | Puzzle (open) |
| 54 | Dorm B | Revisiting prints only the room name; no short description. With 50 list entries the room's own features (bed) get buried under the inventory. | Readability |
| 61 | Mess Corridor | Padlock offers only "examine"; nothing special. No way to express unlock/break/pry with the mouse. | Action not on list |
| 64 | Mess Hall | "look inside canteen" on a closed canteen prints just "Opened." and no contents; need a second click. | Unhelpful response |
| 64 | Mess Hall | Open canteen offers "put survival kit in", "put scrub brush in", "put towel in"; list reaches 70 entries. | List too long / absurd options |
| 62 | Mess Hall | "ID card: slide through slot" appears the instant I enter. The list spoils the puzzle. | Gives the game away |
| 67 | Mess Hall | Phonetic "access denied" reply is readable and tells me I need a different card. | Positive |
| 72 | Dorm Corridor | One click east = 160 time units. No warning that the walk is long before committing; fine as flavour, but a mouse player cannot "walk halfway". | Pacing |
| 73 | Elevator Lobby | Buttons are listed as room objects with "push"; doors have "open" and "examine" in Exits. Clear. | Positive |
| 77-78 | Booth 2 | Both "not activated" and "access denied" replies are phonetic and readable. Fine. | Positive |
| 79 | Elevator Lobby | The elevator door opened while I was elsewhere with no message; the only evidence was "open blue door" becoming "close blue door" in the Exits line. Easy to miss. | Silent state change |
| 80 | Upper Elevator | "button: push up / push down" collapses two buttons into one clear entry. | Positive |
| 81 | Upper Elevator | "push up" -> "Nothing happens." No hint why (card? door?). | Unhelpful response |
| 82 | Upper Elevator | "close blue door" is listed but answers "You can't close it yourself." Another dead option. | Bug: dead option |
| 83 | Upper Elevator | Fourth "access denied" of the run; nothing anywhere has suggested where a valid card might be. Blind mouse player is now sweeping exits with no lead. | Puzzle (stuck-ish) |
| 87 | SanFac E | Fifth identical bathroom; each one is a two-turn round trip with the same text. | Pacing |
| 89 | Admin Corridor | "go north" into a 30 m rift is listed like any other exit; no warning. Also "throw into rift" exists for four items and not the other five, which reads as a hint that may not be one. | Dangerous option / inconsistent |
| 90 | Systems Monitors | Monitor list is a clear, readable objective board even in phonetic spelling. | Positive |
| 92 | Admin Corridor | Hunger/thirst warning arrives; goo solves hunger, but I have seen no water source anywhere and the canteen is empty. | Puzzle (open) |
| 97 | Storage East | Box contents listed inline in the room description and each part individually clickable. | Positive |
| 98 | Storage East | "take oil can" -> "Your load is too heavy" with no indication of what is heavy; I guess the brush. | Unhelpful response |
| 98-100 | Storage East | Inventory list reaches 85 entries; three containers each offer "put X in" for every other item, so ~35 entries are container permutations. Needs collapsing. | List too long |
| 104 | Reactor Control | "go down" a dark stairway is listed as a normal exit with no light source in hand; no warning. | Dangerous option? |
| 106 | Reactor Control | Button beside the door is under Scenery while the blue/red buttons in the lobby were "In the room". Inconsistent grouping. | Mislabelled |
| 108 | Reactor Elevator | Fifth card slot; "Nothing happens" on the button. Same pattern, no new information. | Repetition |
| 111 | Mech Corridor | "go west" leads back into the Physical Plant via its second door; the exit list does not distinguish "a room you have seen" from a new one. | Confusing map |
| 114 | Machine Shop | Nine separate button lines plus 90 inventory lines: 105 entries. The buttons are the only thing that matters here and they are a fifth of the way down. | List too long |
| 114 | Machine Shop | "canteen: put under spout" appears on entry: the list suggests the puzzle. Then the canteen turns out to be unusable here, so the suggestion misleads. | Gives the game away / misleading |
| 117 | Machine Shop | Fluid "splashes over" the narrow mouth; no funnel in my inventory and none seen. Cannot tell whether this dispenser is even relevant to my thirst. | Puzzle (open) |
| 119 | Robot Shop | Robot is listed with container verbs ("close", "look inside", "put X in") before it is even on; thirteen "put X in robot" entries. | Mislabelled / list too long |
| 121 | Robot Shop | "turn on robot" -> "Nothing happens." while score rises 6 -> 8. Text and score disagree; the delayed wake-up should be hinted ("a faint hum"). | Contradictory feedback |
| 122 | Robot Shop | List hits 128 entries; nine "throw X at Floyd" and "attack Floyd" for a friendly NPC. | List too long / tone |
| 124 | Mech Corridor South | Robot Shop's "northwest" exit leads back to Mech Corridor South; not obvious from the list that it is a loop. | Confusing map |
| 125 | Tool Room | 171-entry list. The laser, flask, bar, pliers and battery are the point of the room and account for ~10 lines. Containers generate ~80 "put X in" lines. | List too long |
| 125 | Tool Room | "Your load is too heavy" again with no weight feedback; a mouse player has to guess which of 14 items to drop. | Unhelpful response |
| 128 | Tool Room | Floyd's idle lines ("examines himself for signs of rust") are charming and cheap. | Positive |
| 130 | Tool Room | Laser still too heavy after two drops; no way to know how much more to shed. | Unhelpful response |
| 131 | Tool Room/Machine Shop | Tool Room "east" and Machine Shop "west" are the same door; the map loops in three places around here and nothing in the list flags "already visited". | Confusing map |
| 133 | Machine Shop | Dispenser is a mixing puzzle (4 coolants x 3 catalysts x acid/base) with no clue anywhere I have been. The list makes button-mashing trivially easy, which is a trap for a mouse player. | Puzzle (stuck) |
| 135 | Machine Shop | "put quantity of chemical fluid in uniform" offered; the fluid is listed as a carried object separate from its flask. | Absurd option |
| 136 | Mech Corridor South | Floyd silently stops following; no line says he stayed behind. | Silent state change |
| 142 | Mess Corridor | "open door" -> "cannot be opened until the padlock is removed". Good message; but no listed way to remove it. | Puzzle (blocked by UI) |
| 142 | Mess Corridor | Typed "break padlock with curved metal bar": rejected, "(MUNG padlock with curved metal bar is not in any menu)". Parser has the verb; click list does not offer it. Bar and pliers only list examine/drop. | Action not on list (critical) |
| 142 | Mess Corridor | Typed "cut padlock with pliers": rejected, "I don't know the word cut". So pliers are not for the padlock; still no clue what they are for. | Action not on list |
| 144 | Plain Hall | Rec Corridor "southwest" and Plain Hall "northeast" are the same passage; third loop the list did not signal. | Confusing map |
| 146 | West Wing | "go down" listed from a ruined wing above a cliff with no warning text. | Dangerous option |
| 148-150 | West Wing | Floyd's "look inside" / "search" / "listen to" are all charming but none conveys information; no "ask about" verb exists in the list. | Action not on list |
| 155 | Rec Area | Two-number "set to a number <value>" entry works as documented. | Positive |
| 156 | Rec Area | "open door" -> "You probably have to turn the dial to some number". Honest, but no source for the number has appeared in the whole explored map. | Puzzle (stuck) |
| 156 | Rec Area | Floyd drops a name (Dr. Fizpick); no click verb lets me follow it up. | Action not on list |
| 157 | Rec Area | "play games" produces a warm Floyd scene; good use of a scenery verb. | Positive |
| 158-160 | Rec Area | Dial guesses 42/531/541 all fail. Two clicks per guess; no partial feedback (warmer/colder) so guessing is hopeless with a mouse or a keyboard. | Puzzle (stuck) |
| 165-166 | Dorm C / SanFac C | Fourth identical dorm and sixth identical bathroom; the map has a lot of copy-paste rooms that cost turns to verify. | Pacing |
| 167 | SanFac C | `--status` prints the survival kit and flask contents inline with semicolons; readable enough. | Positive |
| 169 | Dorm C | In bed, no "sleep" button; typed "sleep" is rejected ("no button for SLEEP"). If fatigue is a mechanic, a mouse player cannot address it. | Action not on list (critical if sleep matters) |
| 170 | Dorm C | "wait" in bed only passes time; no sleep, no fatigue message all game so far. | Unclear mechanic |
| 171 | Dorm C | "put oil can in robot" (an offered option): Floyd shrugs and drops it. Harmless, but the list offered 11 such "put X in Floyd" entries that all presumably do this. | Absurd option |
| 171 | Dorm C | Oil can on the floor shows only "examine" while I am in bed; "take" is hidden with no explanation. Same pattern as the pod webbing at turn 31. | Missing action / unclear gating |
| 175 | Corridor Junction | Second hunger/thirst warning; goo covers hunger but no water source exists in ~40 explored rooms and the canteen cannot be filled at the dispenser. Thirst may be a slow death for a blind player. | Puzzle (stuck) |
| 178 | Mech Corridor | First fatigue warning ("find a nice safe place to sleep"). The bed offers no sleep action and "sleep" is rejected as "no button for SLEEP" (turn 169). The game now asks for a thing the mouse cannot do. | Action not on list (critical) |
| 180 | Reactor Access Stairs | Dark room still lists "go down" and every Floyd/inventory verb; a dark room should probably show a reduced list. Grue warning itself is fine. | Mislabelled / list in dark |
| 187 | Dorm D | Bed message differs when weary ("asleep in short order"); when not weary (turn 169) the bed said nothing about sleep. A one-line "you are not tired enough to sleep" would have saved the confusion. | Unclear mechanic |
| 188 | Dorm D | Sleep dumps all carried items on the floor and, while in bed, they show no "take". Eight clicks to re-collect. A mouse player should get a "take all" button here. | List / missing action |
| 188 | Dorm D | Day/clock rollover ("SEPTEM 7, 11344", time 1643) is clearly shown. Good. | Positive |
| 189 | Dorm D | Typed "take all": rejected, "no button for TAKE". Eight separate clicks needed to re-collect after sleeping. | Action not on list |
| 189 | Dorm D | The green goo on the floor lists only examine/eat, no take (it is inside the kit), but it is displayed as a room object like the others. | Mislabelled |

### Report

**Session:** `click-2`, one attempt, 190 turns of a 250 budget, no deaths, final score 8. Stopped by choice: every exit walked, every reachable object collected, every remaining puzzle gated on something I could not find or could not click.

#### What I was trying to do

Survive and make progress as an Ensign Seventh Class stranded on an ocean planet. The game's own agenda was clear once I found the Systems Monitors room: four systems (Planetary Defense, Course Control, Communications, Project Control) are red. I never touched any of them.

#### The path I found

Deck Nine, penned in by Blather until the explosion; pod; strap into the webbing; ride down; stand up (the pod tips into the sea); take kit and towel; open the bulkhead; "go up" out of the flooding pod (the listed "go east" does not work); crag; balcony with the phonetic plaque; winding stair; castle courtyard. From there the modern complex: Plain Hall, Rec Area (dial door), Rec Corridor hub, four identical dorms and six identical bathrooms, Mess Corridor (padlock) and Mess Hall (canteen, card slot), Dorm Corridor, the long dead walkway east, Corridor Junction, Elevator Lobby (blue and red elevators, teleport booth 2), Admin Corridor (rift, Systems Monitors), Mech Corridors (Storage East with parts and oil can, Physical Plant, Reactor Control with a card elevator and a dark stair, Machine Shop with a chemical dispenser, Robot Shop with Floyd, Tool Room with flask, bar, pliers, laser). I woke Floyd (score 6 -> 8), filled the flask with a red coolant that turned milky white, ate two of three goo blobs, and slept once to a new day.

#### Where I got stuck and why

Everything that leads anywhere is locked, and none of the locks has a visible key in the ~45 rooms I could reach:

1. **Five card slots** (Mess Hall door, teleport booth, Upper Elevator, Reactor Elevator; plus the padlocked door is a sixth lock) all reject my Patrol ID with "inkorekt awtharazaashun kard". No other card exists in the explored map.
2. **The padlock**: I found a crowbar-shaped bar and pliers, stood at the padlock, and the click list offered only examine/drop on the tools and examine on the lock. Typing "break padlock with bar" was rejected with the harness telling me the parser knows the verb ("MUNG padlock ... is not in any menu"). This is the clearest click-mode gap.
3. **The combination dial** (0-1000): no number anywhere. I tried 42, 531, 541 from the towel and ID card. No feedback beyond "locked".
4. **The dispenser**: 4 coolants x 3 catalysts x acid/base, no recipe seen. The list makes it trivially easy to mash buttons, which is a trap.
5. **Thirst**: two warnings, no water in the map, canteen too narrow for the dispenser, no "drink" anywhere. I suspect this would eventually have killed me.

#### Biggest points of confusion

1. The click list solves some puzzles for you ("ID card: slide through slot", "canteen/flask: put under spout" appear the moment you enter the room) and then gives you nothing for others (padlock, tools, "ask Floyd about"). A player cannot tell which kind of puzzle they are looking at.
2. Listed exits that do not work: "go east" in the flooding pod ("You can't go that way"), "close blue door" in the elevator ("You can't close it yourself"). When clicking is the only thing you can do, a dead button is a bug.
3. Silent state changes: the elevator door opened while I was away and the only sign was "open" becoming "close" in the Exits line; Floyd stopped following without a word; "turn on robot" said "Nothing happens" while the score rose by two.
4. Gated actions with no explanation: no "take" on the towel/kit while in the pod web; no "take" on dropped items while in bed; no "sleep" anywhere, yet a bed sleeps you if you are weary and wait. Each of these I had to discover by accident.
5. The map loops (Physical Plant has two doors on the corridor, Robot Shop NW = Mech Corridor South, Rec Corridor SW = Plain Hall NE, Tool Room E = Machine Shop W). The exit list never distinguishes "new room" from "room you have seen", so I spent about ten turns re-entering known rooms.

#### What worked well about clicking

- Scenery verbs surfaced things I would not have typed: "salute Blather" (fewer demerits), "read plaque", "play games" with Floyd, "push" on every button.
- The two-number `<value>` entry for the dial worked exactly as documented.
- Room objects with their actions on one line ("button: push up / push down") are quick to scan when the list is short.
- Container contents shown inline in the room text (the parts box) and in `--status`.
- Floyd's ambient lines arrive for free and make the corridors feel alive.

#### What was worst about it

- **List length.** From the crag onwards the list was 50-170 entries, and by the Tool Room 171. Roughly 60-70% of that is container permutations: every container I carry (uniform, kit, canteen, flask, box, and Floyd) offers "put X in" for every other thing I carry, and Floyd adds "throw X at" for every item as well. The four objects that matter in the Tool Room were about ten lines in a wall of 160.
- **Absurd or tonally wrong options:** "put survival kit in canteen", "put quantity of chemical fluid in uniform", "attack Floyd", nine "throw X at Floyd", thirteen "put X in robot".
- **No way to express tool use on a target** unless the game pre-generates it. That is the padlock problem and probably the reason I could not progress at all.
- **No "take all", no "sleep", no "ask about", no "drink".** The rejection messages are honest ("no button for TAKE") but do not help.
- Dangerous exits listed like any other: "go north" into a 30 m rift, "go down" off the West Wing, "go down" the dark stair (which at least gives the grue warning).

#### What I would change

1. Collapse container permutations into a sub-menu: one "put something in X" entry that then asks which item, and one "throw something at X". That alone would cut most lists by two thirds.
2. Generate "use/apply TOOL on TARGET" entries for tools (bar, pliers, laser, oil can) when a plausible target is in the room, or add a generic "use X on Y" two-step, so the padlock is at least attemptable.
3. Never list an exit or action the game will refuse with "can't". Either hide it or grey it with the reason.
4. Print a one-line reason when an action is gated ("You'd have to get out of the web first", "You're not tired enough to sleep").
5. Add "take all" when more than two takeable items are on the floor, and a "sleep" button when weary and in bed.
6. Mark exits that lead to a room already visited (or name the room), since the map is full of loops.
7. Give a dark room a dark-room list (exits and "wait"), not the full lit menu.
8. Fix the small text bugs: "the transl." truncation; the ambassador's description replacing the room description on re-entry; "look inside" on a closed container replying only "Opened.".
9. Make the score change from waking Floyd match the text, or hint at the delayed wake-up.

#### Verdict

Playable and charming up to the castle; the escape sequence is excellent and the prose throughout is a pleasure. Past the courtyard, a blind mouse-only player hits a wall of locked things with no reachable key, and the click interface both spoils the easy puzzles and hides the hard ones. I got to 8 points in 190 turns without dying and without ever being able to attempt the puzzle I had the tools for. Fix the padlock-style "tool on target" gap, prune the container permutations, and remove dead options, and the click mode would go from frustrating to genuinely good.
