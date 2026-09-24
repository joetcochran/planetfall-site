# Round 4: typed-4, typed

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 4, 10 September 2026
- **Mode:** typed: commands typed into the parser
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Small Office, turn 167, with 18 points.
- **Commands:** 196, with one death

The diary below is `playtests/2026-09-10/2026-09-10-typed-4.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind typed playtest: session `typed-4`
**Who:** Claude (Opus 5), blind playtester, typed free-form commands only **Date:** 2026-09-10  **Session:** `typed-4` (`node scripts/playtest.mjs --session typed-4 --new`)

### Attempt 1, commands 1-25: scrubbing duty, and I missed the boat
I woke up as a lowly Ensign Seventh Class scrubbing Deck Nine. The room text tells me there is a closed escape-pod bulkhead to port, a gangway up and a corridor to starboard. An escape pod mentioned in the very first room is a loud hint, so I tried `open bulkhead` straight away and got a nicely in-character refusal: "Why open the door to the emergency escape pod if there's no emergency?" Good.

I poked at the props: `examine id card` (a Special Assignment Task Force ID number), `examine chronometer` (time 4643, engraved "Love, Mom and Dad"), `scrub floor` ("a bit shinier now"). Ensign Blather showed up, handed out demerits and left. An alien ambassador arrived, dripped slime and gave me a brochure, which `read brochure` turned into a joke plug for the game itself. `talk to ambassador` got a flavour shrug; `scrub slime` got a funny "one ten-thousandth" reply. All of these were understood first time.

I wandered `go starboard` to the Reactor Lobby and Blather barked at me to get back to my post, so I went `port` and waited for something to happen. On turn 16 "A massive explosion rocks the ship... The door to port slides open." I typed `wait` again because I wanted to see what came next. That was a mistake: two turns later the pod bulkhead clanged shut, `open escape pod bulkhead` said "Too late", and the ship blew up on turn 20. My death, fair and square, but the window was only two turns and the explosion message never says the pod is launching. `open bulkhead` after the explosion asked me to pick between three bulkheads (escape pod / wide / narrow), which is right but mildly clunky under time pressure.

Lesson: when the door slides open, go through it. Restarting.

### Attempt 2, commands 26-58: into the pod, down to a planet, up a crag
(Attempt 1 was 25 commands.)

Restarted. I peeked `up` the gangway (just a stairwell; "a distant bellowing ... something about an Ensign Seventh Class whose life is in danger" which I read as Blather hunting me), came back `down` and waited. `wait 5 turns` was accepted but only passed one turn, so I switched to `z`. Interesting: the explosion arrived on turn 10 this time, versus turn 16 last time, so it is tied to the clock, not to the turn count. The instant "The door to port slides open" appeared I typed `port` and got +3 for reaching the pod.

`get in webbing` worked ("safely cushioned within the web"), the door shut by itself and then there was a long, well-written launch sequence: the Feinstein blowing up, the pod tumbling, an ocean planet, re-entry, a plateau covered in buildings. I spent about fifteen `z` commands just riding it out. It is atmospheric but that is a lot of waiting with nothing to do; a player who knows `wait` only passes one turn feels it.

On landing, "The pod rocks gently back and forth as if it was precariously balanced", and a panel opened with a survival kit and a towel. `get out of web` tipped the pod into the water (I assume that is scripted, not a penalty). `take kit and towel` took both. `open door` flooded the pod, `out` put me Underwater, `up` brought me to the Crag for +3 (score 6). There is a small structure eight metres up the cliff that "even an out-of-shape Ensign Seventh Class could probably climb", which is about as clear a signpost as you can get.

### Attempt 2, commands 59-80: up the cliff into a ruined castle and a deserted base
`open kit` revealed three blobs of goo (red, brown, green). I assume that is food for later and left it alone. `climb cliff` took me straight up to the Balcony, first time. `read plaque` gave a lovely bit of phonetically corrupted Galalingua ("SEENIK VISTA... Kalamontee Valee... xee formur pravincul kapitul bildeeng") which I enjoyed decoding; it also names the region, Kalamontee.

`up`, `up` through the Winding Stair to a Courtyard of a ruined castle, exits north, west and south (down). West Wing is a rubble dead end; `search rubble` "nothing unusual". North is a Plain Hall, "much more modern" than the castle, with a northeast branch. North again, the Rec Area has games, tapes and a door north that is "closed and locked" with a dial "set to 0" that turns from 0 to 1000. A combination lock: I clearly need a number from somewhere. `examine games`, `examine tapes` gave fun flavour (Double Fannucci).

East is the Rec Corridor, which leads to Dorm A (south, with SanFac A, a toilet room) and Dorm B (north). Dorms are huge and empty; `search bunks` found nothing. So far the place is well described but nothing to pick up. I am keeping a mental map: Courtyard N -> Plain Hall N -> Rec Area E -> Rec Corridor (N Dorm B, S Dorm A, SW branch, E continues).

### Attempt 2, commands 81-111: a canteen, two card slots, a teleport booth and two elevators
(The run stalled for technical reasons around here; the save survived and I resumed at the Elevator Lobby.)

North of Dorm B is just SanFac B. East of the Rec Corridor, the Mess Corridor has a small north door with a steel padlock ("It has a keyhole on its underside", so I need a key). South, the Mess Hall had my first real loot: an octagonal canteen, which I took and opened (empty). The south door has "a small slot" that is "ten centimeters wide but only two deep". I tried `put id card in slot` and the game very helpfully replied "The slot is shallow, so you can't put anything in it. It may be possible to slide something through the slot, though." So `slide id card through slot` it was: "Inkorekt awtharazaashun kard...akses deeniid." The parser teaching me the right verb for a card reader was great.

East past Dorm D (another empty dorm) is a long dead walkway to a Corridor Junction (north-south crossing) and then the Elevator Lobby: a blue door north, a red door south, each with a button, and a booth east. The booth ("Booth 2") has a slot and buttons labelled 1 and 3; `push brown button` says "Teleportaashun buux not aktivaatid." `push blue button` whirred, and one turn later the blue door opened on the Upper Elevator, whose Up and Down buttons do nothing: "The slot beside the buttons stays dark." My ID card is refused there too. `push red button` made the red door vibrate but it has not opened after two turns.

So the whole eastern complex is gated behind some kind of access card, and the Rec Area behind a number. Meanwhile my stomach growled and the game very kindly told me "The goo in your survival kit would take care of both." Nice nudge.

### Attempt 2, commands 112-126: fed, a key I cannot reach, and a rift
`eat red goo`: "just like scrumptious cherry pie", quenches thirst too. The red door finally slid open a turn later (so the red elevator just takes a while to arrive; my earlier worry was unfounded). The Lower Elevator is bigger but has the same dark slot, so both elevators need a card.

I went back to the Corridor Junction and north into Admin Corridor South: "a jagged crevice crosses the floor". `examine crevice` found "a shiny steel key" at the bottom. `take key`: "Either the crevice is too narrow, or your fingers are too large." I tried `get key with brush`: "Nice try." Fair; I need something thin or magnetic. That key is almost certainly for the padlock on the Mess Corridor door.

East of there is SanFac E, another dead toilet. North is the Admin Corridor, torn open by an earthquake, with "a gaping rift, at least eight meters across and thirty meters deep" to the north: my first chasm. West, "Sistumz Moniturz" (Systems Monitors) shows status panels: library, reactors, life support green; planetary defense, planetary course control, communications and "project control" malfunctioning. Good world-building and probably a list of things to fix later.

### Attempt 2, commands 127-144: spare parts, an oil can, and a stairway into the dark
South of the Corridor Junction is the Mech Corridor. Storage East was a treasure trove: an oil can on a shelf and a cardboard box holding "a cracked seventeen-centimeter fromitz board, a B-series megafuse, a K-series megafuse, a good ninety-ohm bedistor". Techno-babble spares, clearly for a repair puzzle later (the monitors room listed broken systems). `take oil can and box` took the can but refused the box: "Your load is too heavy. Dropping the Patrol-issue self-contained multi-purpose scrub brush would make enough room." I loved that: an inventory limit that names the exact item to drop. `drop brush and brochure`, `take box`, done.

West is the Physical Plant, huge and dim, nothing workable. Its southeast exit led to the Mech Corridor (a second hall) and east to Reactor Control: dials, a diagram of a buried reactor, an east metal door with a button, and "a dark stairway winds downward". `push button` opened the east doors ("revealing a small room") but I went `down` first to try the stairs: "It is pitch black. You might be eaten by a grue." I went straight back `up`, and the elevator doors closed behind me. `e` then said "The reactor elevator door is closed." So I will need to push the button again. I also need a light source for those stairs.

### Attempt 2, commands 145-154: a dispensing machine and Floyd
I reopened the reactor elevator (`push button`, `e`): another card slot, so I left. South, the Mech Corridor ends in a three-way split. The Machine Shop has a big dispenser with a spout and nine buttons: four coloured "KUULINTS" (coolants), three "KATALISTS", and two white ones, "BAAS" and "ASID". My empty canteen is itching to go under that spout, but I have no idea what I would need yet, so I left it.

East, the Robot Shop: a room of half-dismantled robots and one four-foot robot "remotely close to being in working order". `examine robot`: "It has apparently been turned off." `turn on robot` got +2 (score 8) and "Nothing happens. Then again, you notice a faint hum." One `z` later: "Hi! I'm B-19-7, but to everyperson I'm called Floyd... Let's play Hider-and-Seeker you with me." A robot companion, and an instantly charming one. His baby-talk grammar sold him immediately.

### Attempt 2, commands 155-169: talking to Floyd, a tool room, and a magnet for the key
I tried to recruit Floyd for the key: `ask floyd about key` got "You can't see any key here!" That stung: in most IF games you can ask about things you have seen but are not holding or near. `floyd, hello` worked ("Floyd grins and bounces up and down"), but `ask floyd about card` only got "Floyd looks at you expectantly, as though he thought you were about to talk." Conversation with Floyd seems shallow; he is more a companion than an oracle, which is fine, but a line about the topic would help.

West of the Machine Shop, the Tool Room: a large glass flask, "a metal bar, curved into a U-shape" (which I read immediately as a magnet), wide-nosed pliers, and an "Akmee Portabul Laazur" with an old battery, dial on setting 5 of 6. `take bar, laser and pliers` failed on all three because of weight, each with a different "Dropping the X would make enough room" hint. I dropped the box and towel and took the bar and laser. Floyd followed me everywhere, chattering about his friend Lazarus the medical robot.

I walked back to the crevice and typed `get key with bar`: "With a spray of dust and a loud clank, a piece of metal leaps from the crevice and affixes itself to the magnet. It is a steel key!" Very satisfying. No points for it, oddly. Next stop: the padlock in the Mess Corridor, a long walk west.

### Attempt 2, commands 170-182: padlock open, a ladder for the rift
Long walk west (Floyd lagged behind and caught up later, barrelling into me: "Floyd not looking at where he was going to."). `unlock padlock with key`: "The padlock springs open." I then typed `remove padlock`, meaning "unhook it from the hasp", and the game treated it as taking it: "Your load is too heavy. Dropping the canteen would make enough room." `open door` worked anyway, so no harm. North is Storage West, +4 (score 12) just for getting in, with a tin of "Spam and Egz" and "a heavy-duty extendable ladder". That ladder has the eight-metre rift written all over it.

`take ladder` said I would have to drop the laser, kit, canteen, oil can and bar first. I tried `drop all except id card`, a phrasing I use in every IF game: "You can't see any all except id card here!" So no ALL EXCEPT. `drop all` worked, `take ladder` worked, `take id card` got my card back. `examine ladder`: collapsed, about 2.5 m, "if extended would obviously be much longer". Heading for the rift.

### Attempt 2, commands 183-200: bridging the rift and finding the access cards
Back at the Admin Corridor I typed `extend ladder`: "You couldn't possibly extend the ladder while you're holding it." Then, trying my luck, `put ladder across rift`: "The ladder, far too short to reach the other edge of the rift, would simply plunge in. It had better be extended first." Both refusals told me exactly what to do, so `drop ladder`, `extend ladder` ("extends to a length of around eight meters"), `put ladder across rift` ("comes to rest on the far edge, spanning the precipice"), and `n` across the swaying ladder: +4, score 16. Chasm crossed.

Admin Corridor North has three signed portals: "Administraativ Awfisiz" (west), "Tranzportaashun Suplii" (north), "Plan Ruum" (east). West is a Small Office; `open desk` revealed "a kitchen access card and an upper elevator access card". Jackpot: those are exactly the Mess Hall slot and the blue elevator. `take cards` asked "Which do you mean, the kitchen access card or the upper elevator access card or the ID card?" instead of taking all of them, which was a small letdown. Further west the Large Office has a picture window and a big desk with a shuttle access card inside. Back east, `take kitchen card and elevator card` took both (+2, score 18). Meanwhile I am hungry again (my goo is back in Storage West with everything else I dropped for the ladder) and "You begin to feel weary... finding a nice safe place to sleep." That is where my 200-command budget ran out.

### Friction log
| # | Attempt/cmd | Where | What happened | Why it hurt | Suggested fix |
|---|---|---|---|---|---|
| 1 | A1 `open bulkhead` (pre-explosion) | Deck Nine | "Why open the door to the emergency escape pod if there's no emergency?" | Positive: in-character refusal that plants the pod as important | Keep |
| 2 | A1 `read brochure`, `scrub slime`, `talk to ambassador` | Deck Nine | All understood with witty replies | Positive: early parser confidence | Keep |
| 3 | A1 `wait` after "The door to port slides open" | Deck Nine | Pod closed two turns later, died on turn 20 | The escape window is very short and the open-door message does not signal urgency (no "the pod is preparing to launch" cue) | Add a one-line urgency cue on the turn the door opens, or allow one more turn |
| 4 | A1 `open bulkhead` after explosions | Deck Nine | "Which do you mean, the escape pod bulkhead or the wide bulkhead or the narrow bulkhead?" | Disambiguation costs a beat under time pressure; the pod bulkhead is the obvious referent at this spot | Prefer the escape-pod bulkhead when the player is at the pod entrance |
| 5 | A2 `wait 5 turns` | Deck Nine | Accepted but only one turn passed | A player who types a count expects it honoured, or told it is not | Either support `wait N` or reply "(waiting one turn)" |
| 6 | A2 explosion timing | Deck Nine | Explosion on turn 10 in attempt 2, turn 16 in attempt 1 | Positive: clock-driven, so detours do not stall the plot | Keep |
| 7 | A2 pod ride, ~15 `z` | Escape Pod | Long scripted descent with nothing to do but wait | Good prose, but a lot of blank turns; `wait` passes only one | Let `wait`/`z` fast-forward to the next event while in the web, or support `wait until` |
| 8 | A2 landing sequence | Escape Pod | "precariously balanced", provisions panel, `take kit and towel`, `open door`, `out`, `up` all understood | Positive: clear cues and every natural command worked | Keep |
| 9 | A2 `climb cliff` | Crag | Took me straight up to the Balcony | Positive: the room text set it up and the obvious verb worked | Keep |
| 10 | A2 `read plaque` | Balcony | Phonetic "corrupt Galalingua" text | Positive: charming, names the region and the capital building | Keep |
| 11 | A2 `examine dial` | Rec Area | "can be turned to any number between 0 and 1000" | Positive: a clear locked-door puzzle with a clear verb | Keep |
| 12 | A2 dorms and SanFac | Rec Corridor area | Several large, empty rooms in a row, `search bunks` finds nothing | Mild: lots of walking with no payoff so far | Fine if a later item rewards revisiting |
| 13 | A2 `put id card in slot` | Mess Hall | "The slot is shallow... It may be possible to slide something through the slot, though." | Positive: the refusal teaches the right verb instead of just saying no | Keep, and use the same pattern elsewhere |
| 14 | A2 `slide id card through slot` | Mess Hall, Upper Elevator | "Inkorekt awtharazaashun kard...akses deeniid." | Positive: clear that a different card is needed | Keep |
| 15 | A2 `push up button` in Upper Elevator | Upper Elevator | "Nothing happens. The slot beside the buttons stays dark." | Positive: ties the dead buttons to the slot | Keep |
| 16 | A2 `push red button` | Elevator Lobby | "The red door begins vibrating a bit." then nothing for two turns | Unclear whether the red elevator is coming, broken, or needs something | A follow-up message ("the vibration dies away") would settle it |
| 17 | A2 hunger warning | Elevator Lobby | "The goo in your survival kit would take care of both." | Positive: a fair hint for a survival timer | Keep |
| 18 | A2 red elevator | Elevator Lobby | The red door opened three turns after the button push | Positive in the end; the delay reads as a real freight elevator | A "you hear the elevator approaching" beat in between would help |
| 19 | A2 `take key` | Admin Corridor South | "Either the crevice is too narrow, or your fingers are too large." | Positive: tells me exactly why and implies a tool | Keep |
| 20 | A2 `get key with brush` | Admin Corridor South | "Nice try." | Mild: a dismissive reply gives no hint which property the tool needs | Something like "The brush is far too thick to fit in the crevice" |
| 21 | A2 Systems Monitors | Admin Corridor | Status board of working and broken systems | Positive: sets goals without spelling them out | Keep |
| 22 | A2 `take oil can and box` | Storage East | "Your load is too heavy. Dropping the ... scrub brush would make enough room." | Positive: the weight limit names a concrete item to drop, no guessing | Keep |
| 23 | A2 `down` from Reactor Control | Reactor Access Stairs | "It is pitch black. You might be eaten by a grue." | Positive: classic, unmistakable warning | Keep |
| 24 | A2 reactor elevator door | Reactor Control | Door shut on its own after two turns; `e` then "The reactor elevator door is closed." | Mild: easy to miss the timeout; the room text still says "a metal door" not "open/closed" | Show the door state in the room description |
| 25 | A2 `turn on robot` then `z` | Robot Shop | +2, a hum, then Floyd boots up with a great intro line | Positive: milestone reached with the most obvious verb; the delayed start is a nice beat | Keep |
| 26 | A2 dispenser | Machine Shop | Nine labelled buttons and a spout, no obvious use yet | Neutral: intriguing, but nothing says what to fill or why | Fine as a later puzzle as long as something points back here |
| 27 | A2 `ask floyd about key` (key seen, not present) | Robot Shop | "You can't see any key here!" | Asking a companion about something I have seen elsewhere is standard IF; this refusal feels like a parser error, not the character | Allow ASK ABOUT for any known object, and let the NPC answer (even "Floyd shrugs") |
| 28 | A2 `ask floyd about card` | Robot Shop | "Floyd looks at you expectantly, as though he thought you were about to talk." | Reads as if the command was not understood at all | Give Floyd a generic topic reply ("Floyd doesn't know anything about cards") |
| 29 | A2 `take bar, laser and pliers` | Tool Room | Each item refused with a different "Dropping X would make enough room" | Mild: the multi-item result is a bit noisy when all three fail, but still informative | Fine; maybe one combined sentence |
| 30 | A2 `get key with bar` | Admin Corridor South | Magnet pulls the key out, lovely prose | Positive: the intuitive phrasing worked first time | Keep; maybe award a point for it |
| 31 | A2 `remove padlock` after unlocking | Mess Corridor | Treated as TAKE, refused for weight | I meant unhook it from the door; the weight refusal is a non sequitur | Map REMOVE X (from a door/hasp) to "You remove the padlock from the hasp" or treat it as opening the door |
| 32 | A2 `drop all except id card` | Storage West | "You can't see any all except id card here!" | ALL EXCEPT/BUT is a standard IF idiom; the error reply echoes it back as an object name | Support ALL EXCEPT/BUT X, or at least say "I don't understand EXCEPT" |
| 33 | A2 `take ladder` | Storage West | Lists every item I would have to drop | Positive: explicit, if long | Keep |
| 34 | A2 `extend ladder` while holding it | Admin Corridor | "You couldn't possibly extend the ladder while you're holding it." | Mild: slightly surprising rule, but the reply says exactly what is wrong | Keep; it is fair |
| 35 | A2 `put ladder across rift` before extending | Admin Corridor | "far too short... It had better be extended first." | Positive: the refusal is the hint | Keep |
| 36 | A2 ladder bridge + `n` | Admin Corridor | +4, lovely swaying-ladder text | Positive: the chasm milestone felt earned | Keep |
| 37 | A2 `take cards` | Small Office | "Which do you mean, the kitchen access card or the upper elevator access card or the ID card?" | A plural noun should mean all matching items in scope (the ID card is already held, so it is not even a candidate for TAKE) | Treat plurals as ALL matching; exclude held items from TAKE disambiguation |
| 38 | A2 hunger + sleep timers after the ladder | Small Office | Hungry again and weary, with the food left three rooms and a rift away | The ladder weight rule forced me to dump the survival kit; now the timers bite | Consider letting the kit ride along (weight) or a stronger hint to carry food |

### Report
I played 200 commands over two attempts. Attempt 1 (25 commands) ended when I waited through the escape-pod window and died with the Feinstein. Attempt 2 got me to a score of 18 by command 200: into the escape pod (+3), through the landing and up to the Crag (+3), across the ruined castle and into the Kalamontee complex, turning on Floyd the robot (+2), fishing a steel key out of a crevice with a U-shaped magnet, unlocking the padlocked Storage West (+4), bridging the eight-metre rift with the extendable ladder (+4), and finding the kitchen and upper-elevator access cards (+2) in the Small Office past the rift. I saw about 35 rooms. I had not yet used a card, ridden an elevator, opened the Rec Area dial lock, used the teleport booth or the Machine Shop dispenser, or gone down the dark reactor stairs (I have no light yet). The furthest point was the Small Office / Large Office past the rift, with a shuttle access card still in the large desk.

I was never really stuck. The world is dense with signposts: a crevice with a key, a U-shaped bar in a tool room, a rift and a ladder, card slots everywhere and then a desk full of cards. The best thing about the parser was how its refusals taught me: "The slot is shallow... It may be possible to slide something through the slot", "Dropping the scrub brush would make enough room", "It had better be extended first", "your fingers are too large". Almost every natural verb I tried (`climb cliff`, `get in webbing`, `slide id card through slot`, `get key with bar`, `unlock padlock with key`, `put ladder across rift`, `floyd, hello`) worked first time. Floyd is delightful company.

The biggest confusions were at the edges of the parser rather than the puzzles: `ask floyd about key` refused because the key was not in the room, `ask floyd about card` produced a reply that reads like a non-understanding, `drop all except id card` was parsed as an object called "all except id card", `take cards` asked me to pick one instead of taking all, and `wait 5 turns` silently waited only one. The opening is harsh: the escape pod stays open for only two turns after "The door to port slides open", and the long pod ride is about fifteen blank `z` turns. The inventory weight limit is strict enough that it made me leave my food behind to carry the ladder, and then hunger and sleep caught up with me on the far side of the rift.

What I would change: support ALL EXCEPT/BUT and plural nouns; let ASK ABOUT take any known object and give Floyd a default "doesn't know" line; honour `wait N` or fast-forward waits during the pod ride; add one urgency cue when the pod door opens; and make REMOVE on a padlock mean unhooking it rather than a weight-limited TAKE.

### Verdict
A charming, well-signposted opening whose puzzles (magnet and key, ladder and rift, card slots and a desk of cards) fall to natural commands, with a parser that usually explains itself beautifully when it says no. The rough edges are parser idioms experienced IF players expect (ALL EXCEPT, plurals, ASK ABOUT absent things, WAIT N) and a very tight escape-pod window; fix those and it plays like a polished classic.
