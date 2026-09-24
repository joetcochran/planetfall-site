# Round 19: typed-19, typed, as a first-time player

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The third milestone](playing-it.md#the-third-milestone-every-way-of-playing-wins-blind), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 19, 18 September 2026
- **Mode:** typed: commands typed into the parser
- **Start:** from the start (Deck Nine, turn 0)
- **Played as:** a first-time player who types plain modern English
- **Result:** Did not win. Where play ended: Robot Shop, turn 87 after a restore, saved, with 9 points, having reached 13 earlier.
- **Commands:** 244, with one death

**About the numbers.** Played as a first-time player typing plain modern English. The session was run under the name r19, so its transcript is r19-transcript.txt. It reached 13 at Kalamontee Platform, then died at the rift (turn 134) and restored its only save, from the Crag; it stopped alive and saved in the Robot Shop at turn 87 with score 9, so its best (13) is above its final (9). The diary says roughly 190 commands counting refused ones; the transcript has 244 lines beginning "> ".

The diary below is `playtests/2026-09-18/2026-09-18-typed-19.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Playtest diary: typed-19

Round 19 (typed, from the start, one leg). Persona: I've never played a text adventure. I type the way I'd talk to a phone assistant ("what's in my bag", "go back", "pick up the thing"), and I get lost easily.

### The game

I started a new game. I have no idea what I'm supposed to do.

**Turns 0-5.** I'm a cleaner on a spaceship, scrubbing a deck. My first command, WHAT DO I DO, got "I don't know the word 'do'." LOOK AROUND worked. A man called Blather yelled at me and gave me demerits. I typed HELP (that cost a turn) and the game told me to order a hint booklet "using the order form in your game package". I don't have a game package. SAY SORRY TO BLATHER: "You must address the Ensign First Class directly." I don't know what that means. KEEP CLEANING THE FLOOR didn't know "keep", but CLEAN THE FLOOR worked ("a bit shinier now"). WHAT'S IN MY BAG and WHAT AM I CARRYING both failed on the first word. I guessed INVENTORY from other games I half remember, and it worked. Blather left.

**Turns 5-11.** I went up the stairs (GO UP THE STAIRS worked, nice). Blather caught me on Deck Eight and yelled at me to get back to my post. GO BACK: "I don't know the word 'back'." I worked out GO DOWN and went down twice.

**Turns 11-19.** OPEN THE ESCAPE POD: "Why open the door to the emergency escape pod if there's no emergency?" Fair enough. Blather came back. I cleaned the floor three more times and waited. At turn 19 a massive explosion rocked the ship and "the door to port slides open". WHAT WAS THAT: unknown word "was". RUN INTO THE ESCAPE POD: "I don't know the word 'into'." That scared me, because I could tell I was in a hurry.

**Turns 19-22.** GET IN THE ESCAPE POD worked (+3). CLOSE THE DOOR: "You can't close it yourself", and then it closed by itself anyway. SIT DOWN put me in the safety web. That felt natural, and I was relieved.

**Turns 22-34.** I waited. The Feinstein blew up behind me (scary and cool), and LOOK OUT THE WINDOW showed debris. There were about ten WAITs while the pod flew to a planet. Nothing to do but wait, and I wasn't sure if I was supposed to be doing something. Finally the pod landed, and a panel opened with a survival kit and a towel.

**Turns 34-43.** GET UP made the pod slip into the water. PICK UP THE SURVIVAL KIT AND THE TOWEL worked in one go, which pleased me. GET OUT OF THE POD: "The pod door is closed." OPEN THE DOOR let the sea in. GET OUT put me underwater. SWIM TO THE LIGHT: "You can't see any light here!" But the room text had just said "a dim light filters down from far above". SWIM UP worked, and each depth had its own description, so I could tell I was getting closer. At the surface the text said "One more push up should reach it." I typed CLIMB OUT ("You can't see any out here!"), then SWIM UP again, and landed on the Crag (+3). Then SAVE THE GAME: "Ok." Good.

**Turns 43-49.** LOOK IN THE SURVIVAL KIT: red, brown and green goo. WHAT IS GOO: unknown word "is". I gave up asking the game questions. CLIMB UP TO THE BUILDING took me to a Balcony. READ THE SIGN: "I don't know the word 'sign'" (the room calls it a plaque). KEEP GOING UP failed again on "keep". Up the stairs to a castle Courtyard, then north through a hall to a Rec Area with a locked door and a dial. PLAY A GAME: "Okay. Gee, that was fun." That made me laugh. TURN THE DIAL asks for a number, and I didn't have one.

**Turns 52-64.** East, then north into Dorm B and a bathroom. USE THE TOILET: unknown word "use". GO BACK failed again. East to the Mess Corridor (a padlocked door north, a "large portal" south). GO INTO THE BIG DOORWAY failed on "into". GO THROUGH THE PORTAL: "You hit your head against the doorway as you attempt this feat." It's open! GO SOUTH worked and put me in the Mess Hall.

**Turns 64-71.** PICK UP THE THING: unknown word "thing". PICK UP THE CANTEEN worked. OPEN THE CANTEEN just said "Opened." LOOK IN THE CANTEEN: empty. The door south wanted a "kitcin akses kard". PUT MY CARD IN THE SLOT gave a good hint (slide it through), but my ID card was refused. WHAT DOES THAT MEAN: unknown word "does". LEAVE worked and took me back out, which was nice.

**Turns 71-85.** East, then east again down a very long hall ("That walk took about 3 hours"). The Elevator Lobby has a blue door and a red door, each with a button. PRESS THE BUTTON asked "the blue button or the red button?". I answered THE BLUE ONE: "I don't know the word 'the'." I tried BLUE: "I don't know the word 'blue'." I tried BLUE BUTTON, same thing. PUSH THE BLUE BUTTON as a full sentence worked. I found this really baffling. The game asked me a question and wouldn't take any answer. There's a phone-booth room (Booth 2) whose buttons say it isn't activated. The blue door opened onto an elevator. PRESS THE UP BUTTON: "You can't see any up button here!", although the room says it has "an Up button". PUSH UP only said the slot stayed dark. My ID card doesn't work here either.

**Turns 85-97.** South down the Mech Corridor to a Machine Shop. I pressed a red button on a dispenser, and fluid poured on the floor. East, the Robot Shop has one little robot. TALK TO THE ROBOT: "You can't talk to a multiple purpose robot!" TURN THE ROBOT ON (+2). A turn later it's Floyd, who wants to play Hider-and-Seeker. He's adorable. He said he was itchy. SCRATCH FLOYD: unknown word. OPEN FLOYD'S COMPARTMENT: unknown word "floyd's". OPEN THE COMPARTMENT worked. He giggled and a card fell out. PICK UP THE CARD (+1).

**Turns 97-105.** WHAT DO I HAVE failed; I typed I. It's a "lower elevator access card". Floyd follows me everywhere. At the lobby my stomach growled, and the game told me the goo would help. That was really useful. GO THROUGH THE RED DOOR: "You hit your head against the red door". The text had just said the red door was open. EAT THE GOO asked which one. I said RED and it worked (cherry pie!). So one-word answers work sometimes (RED) but not other times (BLUE).

**Turns 105-120.** GO SOUTH into the lower elevator. PUT THE ELEVATOR CARD IN THE SLOT gave the slide hint again. SLIDE THE ELEVATOR CARD THROUGH THE SLOT: "Elevator enabled." PUSH DOWN. I typed GO OUT too early ("The door is closed"). Three waits later we were at the bottom: a Waiting Area, then a Kalamontee Platform (+4) with a big "transport". GET ON THE TRAIN: "I don't know the word 'on'." GO IN THE TRAIN and GO IN THE SHUTTLE: "You can't go that way." ENTER THE TRANSPORT: "I don't know the word 'transport'", even though that's the game's own word for it. GO SOUTH got me in. SIT DOWN on a shuttle with 20 seats: "You recline on the floor for a bit". The east cab has a lever and a slot. The lever does nothing ("controls are not currently activated") and my elevator card is the wrong card.

**Turns 120-134 (my first death).** I rode back up and went north to a corridor with a crack in the floor. LOOK IN THE CRACK: a shiny key! GRAB THE KEY: my fingers are too big. FLOYD, GET THE KEY: he just wants to play. North, a huge rift blocks the corridor. JUMP OVER THE HOLE and I died on the rocks, score 13. There was no warning at all. The rift is "at least eight meters across and thirty meters deep", which I suppose was the warning, but I didn't take it in. I restored, and my only save was from the Crag, 90 turns earlier. That hurt. Floyd said "That part of the game was more fun than this part", but he wasn't in the game any more at that point. Who was talking?

**Second life, turns 43-72.** I walked it all again, faster, and SAVEd at the Corridor Junction this time. WHERE IS FLOYD: unknown word "is". There's a dead-end West Wing. Storage East has an oil can and a box of parts. TAKE EVERYTHING worked (that was satisfying). WHAT'S A FROMITZ BOARD: unknown word. The Physical Plant is dim and full of machinery. Reactor Control has a button that opened a door east, and a dark stairway down. GO DOWN THE STAIRS: "It is pitch black. You might be eaten by a grue." WHAT IS A GRUE: unknown word "is". I ran back up. Then "The elevator door slides shut", so the door east was an elevator? Nothing had told me that. The Tool Room has a flask, a U-shaped bar, pliers and a laser. PICK UP THE U THING: unknown word "thing". PICK UP THE METAL BAR: "Your load is too heavy. Dropping the scrub brush would make enough room. (Your uniform has a pocket you can put small things in.)" That's a really friendly message. I dropped the brush and the box. The bar is a magnet and warned me it would smear my ID card. I didn't understand and picked up the laser, and the card got smeared. OOPS: unknown word.

**Turns 72-87.** Back to the Robot Shop and Floyd again (TICKLE FLOYD: unknown word, although the game's own reply says "You're tickling Floyd!"; OPEN HIS COMPARTMENT: unknown word "his"). Before the compartment was open, PICK UP THE CARD said "Taken." That turned out to be my own ID card coming out of my pocket, and I thought I'd got Floyd's card. After the card dropped out, PICK UP THE NEW CARD found no "new card", and PICK UP THE CARD ON THE FLOOR asked "the lower elevator access card or the ID card?" (the ID card was in my hand, not on the floor). THE LOWER ONE: "I don't know the word 'the'." I finally typed the full name, dropped the oil can to make room, and got the card (+1), and of course the magnet warned me about this card too. I saved. I tried to be clever: PUT THE ELEVATOR CARD IN MY POCKET, then PICK UP THE MAGNET. It smeared the card at once, with no "any longer" grace turn this time and no sign that the pocket helps. I restored, dropped the magnet, and pocketed the card. HINT: the order-form message again. GO TO THE ELEVATOR: "Use compass directions for movement." That's at least a clear rule. I saved in the Robot Shop at turn 87 and stopped there.

### Where I stopped

- **Where:** Robot Shop (Kalamontee), evening of Day 1, game turn 87 of my second life (about 178 game turns in all, roughly 190 commands counting refused ones). Score 9 of 80. Saved.
- **Carrying:** a smeared ID card, the lower elevator access card (in my pocket), a towel, the survival kit (all three goos), a laser with an old battery. The magnet, the oil can, the brush and the box of parts are on the floors of the Robot Shop and the Tool Room.
- **What I know:** the red door leads down to a shuttle, but I need a different card to drive it. There's a key in the crack in the floor that I can't reach. A huge rift blocks the way north. There's a locked door with a padlock and one with a number dial.
- **Didn't find:** anything to do with the key (I didn't connect the magnet to the key), the shuttle card, or the kitchen card.

### Verdict

As a total beginner I survived the opening, but only because the escape pod's door opening was loud enough to act on and SIT DOWN happened to work. After that I spent most of my commands fighting the words, not the puzzles. Questions (what/where/is), "go back", "use", "into", "on", "thing" and possessives all fail, and the disambiguation prompt refused every answer I gave it except RED. The game's own nudges were the best part: the slide-the-card hint, the goo hint when I was hungry, and the "Dropping the brush would make enough room" message. Floyd kept me playing.

### Friction

#### Bug
- **T75, T81 (second life)** `the blue one` / `blue` / `blue button` after "Which do you mean, the blue button or the red button?", and `the lower one` after "the lower elevator access card or the ID card?": every answer fails with "I don't know the word 'the'" or "'blue'", yet `red` worked for the goo question at T104. `push the blue button` as a full sentence was fine.
- **T62** `go through the portal` (the open "large portal" south of the Mess Corridor): "You hit your head against the doorway as you attempt this feat."
- **T104** `go through the red door` (the red door open, and the lobby text said so): "You hit your head against the red door".
- **T82** `press the up button` in the Upper Elevator, whose text lists "an Up button": "You can't see any up button here!"
- **T134 restore** `restore` to a save made before Floyd existed: Floyd's line "That part of the game was more fun than this part" still prints.
- **T86 (second life)** `put the elevator card in my pocket` then `pick up the magnet`: the card smeared on the same turn, with no fresh "any longer" warning. The pocket gives no protection, and nothing says so.
- **T78 (second life)** `pick up the card` before any card had dropped: "Taken." It quietly moved my own ID card from pocket to hand, and I thought I had Floyd's card.
- **T79 (second life)** `inventory`: "The laser contains: A laser setting dial", as if the dial were a loose item inside it.
- **T81 (second life)** `pick up the card on the floor` asked "the lower elevator access card or the ID card?", although the ID card was in my hand.

#### Parser didn't understand
- **T0** `what do I do` (and every question: `what was that` T19, `what is goo` T44, `what does that mean` T70, `where is floyd`, `what is a grue`, `what's a fromitz board`): "I don't know the word 'do'" / "'is'" / "'was'" / "'does'" / "'what's'". A beginner asks questions constantly.
- **T4** `what's in my bag`, `what am i carrying`, **T97** `what do i have`: none of them reach inventory.
- **T7, T54** `go back`: "I don't know the word 'back'."
- **T19** `run into the escape pod`, **T61** `go into the big doorway`: "I don't know the word 'into'." At T19 this happened during the escape-pod countdown.
- **T114** `get on the train`: "I don't know the word 'on'."
- **T115** `go in the train`, `go in the shuttle`: "You can't go that way."
- **T116** `enter the transport`: "I don't know the word 'transport'", the game's own word for the shuttle.
- **T56** `use the toilet`: "I don't know the word 'use'."
- **T64, T69 (second life)** `pick up the thing`, `pick up the u thing`: "I don't know the word 'thing'."
- **T95** `open floyd's compartment`, **T77 (second life)** `open his compartment`: possessives aren't known.
- **T77 (second life)** `tickle floyd`: unknown word, although the game's own reply says "You're tickling Floyd!"
- **T95** `scratch floyd`: unknown word, when Floyd is literally scratching at his side panel.
- **T45** `read the sign` (it's a "plaque"): "I don't know the word 'sign'."
- **T39** `swim to the light`: "You can't see any light here!", right after "a dim light filters down from far above".
- **T42** `climb out` at the surface: "You can't see any out here!"
- **T3, T46** `keep cleaning the floor`, `keep going up`: "I don't know the word 'keep'."
- **T72 (second life)** `oops`: unknown word.
- **T81 (second life)** `pick up the new card`: "You can't see any new card here!"
- **T87 (second life)** `go to the elevator`: "Use compass directions for movement." It's clear, but a beginner expects this to work.

#### Unclear text
- **T2, T86 (second life)** `help`, `hint`: "order a complete map and InvisiClues Hint Booklet using the order form in your game package". There is no package, and it costs a turn.
- **T3** `say sorry to blather`: "You must address the Ensign First Class directly." It doesn't say how.
- **T134** `jump over the hole`: instant death with no warning, and my only save was 90 turns back.
- **T118** `sit down` on a shuttle "with seating for around 20 people": "You recline on the floor for a bit".
- **T66 (second life)** `go up` from the dark stairs: "The elevator door slides shut." I had never been told the door east of Reactor Control was an elevator.
- **T113** Waiting Area: "to the south is a metal door". It's the elevator I just came out of, which isn't obvious.
- **T66** `open the canteen`: just "Opened." It doesn't say it's empty; I had to look inside.
- **T21** `close the door` in the pod: "You can't close it yourself", then it closes by itself the same turn.

#### Pacing
- **T22-34** The pod ride is about twelve WAITs with nothing for me to do. As a beginner I wasn't sure I was supposed to just wait.
- **T72** `go east` down the long hall: "That walk took about 3 hours." It's fine the first time, but after dying I had to redo the whole route from the Crag.
- **T109-112, T125-128** The elevator rides take three WAITs, and `go out` early says "The door is closed" with no "still moving" cue.
- **T71-72 (second life)** The magnet smears the card one turn after its warning. That isn't enough time for a beginner to work out what "carried together any longer" means.
