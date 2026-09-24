# Round 8: click-8-lawanda, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The first milestone](playing-it.md#the-first-milestone-to-the-end-from-mid-game), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 8, 11 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the Lawanda Platform checkpoint (turn 256, score 42)
- **Result:** **Won 80 of 80** at turn 369, after an earlier win of 74 of 80 at turn 409.
- **Commands:** 319, with 2 deaths

**About the numbers.** Won twice: 74 of 80 at turn 409 on its second attempt (transcript line 4957), then restarted from the checkpoint by choice and won 80 of 80 at turn 369 (diary line 73 explains the restart).

The diary below is `playtests/2026-09-11/2026-09-11-click-8-lawanda.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest from a checkpoint: session `click-8-lawanda`
**Who:** Claude (Opus 5), blind mouse-only playtester  **Date:** 2026-09-11  **Session:** `click-8-lawanda` (`node scripts/playtest.mjs --session click-8-lawanda --new --checkpoint lawanda --click`)

### Briefing
The briefing says I am a Stellar Patrol ensign whose ship blew up; I reached a deserted complex, fixed the communications equipment, woke a robot called Floyd, and this morning rode a shuttle car from Kalamontee to Lawanda Platform with Floyd behind me, carrying a bedistor, pliers, a laser, cards and an empty canteen. It also notes I feel weak and flushed (sounds like an illness clock) and that my survival kit with food is back in Storage West. It is clear and readable; the goal ("explore beyond this platform") is concrete.

### Attempt 1, turns 256-272: up the escalator, straight into an infirmary
I saved first (the Save button did not cost a turn, and a Restore button appeared as "(new)", which is reassuring). The briefing said I felt flushed, so my first click was "diagnose": "You are a bit sick and feverish." That set a clock ticking in my head. Floyd was not on the option list at turn 256 even though the briefing says he was right behind me; he "bounds into the room" one turn later, and then his ten-option character row appears.

The only way on was "go up" the dead escalator (Escalator room offers both "go east" and "go up", which I assume are the same thing), then a Fork, then "go northeast" to Systems Corridor West. A doorway to the northwest led to an Infirmary: a red spool on a bed and a translucent medicine bottle on a shelf. Reading the bottle gave "Dizeez supreshun medisin -- eksperimentul", which is exactly what I wanted to find.

Here the interface fought me a bit. "take all" took the spool but said my load was too heavy for the bottle, with a very helpful hint: "dropping the good ninety-ohm bedistor would make enough room." Before doing that I tried the "eat" option listed directly under "quantity of medicine" in the room, and got "You're not holding the medicine bottle." After dropping the bedistor and taking the bottle, "eat" again failed: "The bottle is closed." The bottle's contents were listed and "eat" offered even while it was closed. Two wasted turns on offered-but-impossible actions. Third try: "127 open", then eat: "The fever breaks, and you feel your strength returning." No score change. The spool reads "Simptumz uv Xe Dizeez" (probably for a reader machine somewhere). I dropped the empty bottle and re-took the bedistor.

Floyd found a rusted robot breastplate engraved "Lazarus" and ran out sobbing: a genuinely touching moment.

### Attempt 1, turns 273-286: Planetary Defense and the bedistor swap
East along the Systems Corridor I found two control rooms. "Planateree Deefens" has a blinking "Surkit Boord Faalyur" light and an access panel; opening it shows four identical "seventeen-centimeter fromitz boards". Examining the first two gave identical descriptions, so I cannot tell which is broken and I have no spare. I left them for now and noted the room.

Next door, "Planateree Kors Kontrool" (Course Control) had a light reading "Bedistur Faalyur!" and a closed metal cube. That rang the bell: the briefing says I took a "good ninety-ohm bedistor" from Storage East and a pair of pliers from the Tool Room. Opening the cube showed a "fused ninety-ohm bedistor" with an option "take with pliers". Honestly the option list solved the puzzle for me: I would have tried plain "take" first and learned something (probably that it is hot or stuck), but the list spelled out the tool. "With a tug, you manage to remove the fused bedistor." Then "put in..." on the cube opened a list of my inventory; "16 good ninety-ohm bedistor" gave "The warning lights go out and another light goes on." +6, score 48.

Small oddities: after I was holding the fused bedistor it still offered "take with pliers" in my Carried list, and after installing the good bedistor it appears in "In the room" with a bare "take", as if inviting me to pull it straight back out. I dropped the fused one there and saved (Floyd: "Oh boy! Are we gonna try something dangerous now?" on the save, which made me laugh).

### Attempt 1, turns 287-310: Physical Plant, the library, a dead teleport booth
Physical Plant (east) is a dead end, but the description pointedly says the plant is "much larger than the one in the Kalamontee Complex" although the complex is smaller. I filed that as "there is something hidden here". Examining the equipment gave the same stock line as the Infirmary equipment.

South of the corridor is the Library Lobby: a green spool in the dust, a terminal and a small booth. The terminal's "type a number <value>" entry worked nicely with the "21 5" form, and the phonetic-spelling menus were fun: "Xe Prajekt" explained the Disease came from a cryogenics research centre; Phase Two was "mass kriioojenik freezeeng uv Residan popyuulaashun" and Phase Three has "inkrediblee soofistikaatid kumpyuuturiizd fasiliteez" running the research. So the planet's people are frozen somewhere and a computer is looking for a cure: now I understand why this place matters. Each submenu text ends with "type zero to go higher", which the numeric entry handles fine.

Booth 3 has a slot and buttons "1" and "2": "Teleportaashun buux not aktivaatid." The option list offered "slide through slot" for each card I carry, which tells me a card is wanted, but none of mine is the teleport one presumably.

The Library proper (west, up the steps) has a microfilm reader with "put in...". Red spool: death comes eight to ten days after the first symptoms; the secondary symptom is needing more sleep each night. So I have a limited number of days. Green spool: helicopter operation needs a "Helikoptur Akses Kard and aa Kuntrool Panul Kee" from "Tranzportaashun Stoorij". A concrete goal. One small oddity: inserting the green spool printed "Some information appears on the screen" without showing it; I had to click "read" on the reader to see it (for the red one, "turn on" printed it straight away).

### Attempt 1, turns 311-325: the fever is back; lab storage, the broken computer, a rippling mural
Leaving the Library, an interrupt said "You notice that you feel a bit weak and slightly flushed" again, only about forty turns after the medicine. So the medicine really is just "supreshun"; the clock is still running and I should not dawdle.

South of the Library Lobby is Project Corridor East, then the Main Lab with two ominous doors: a "radiation-lock door" and a "bio-lock door", each with open/examine options listed right in the Exits row (a nice touch: I could see there were doors before walking into them). I left both closed for now.

Lab Storage (south) was a jackpot: searching a pale blue lab uniform found a teleportation access card and a note "Kombinaashun tuu Konfurins Ruum: 982"; there was also a fresh laser battery on a shelf. So Booth 3 can now be activated, and some Conference Room has a combination lock. I saved.

Computer Room (southwest of the Main Lab): a glowing red light, and Floyd volunteered "Uh oh. Computer is broken. A Doctor-person once told Floyd that Computer is the most important part of the Project." The printout's last page: all research and drug production at 100%, drug testing 99.985%, then "Malfunkshun in Sekshun 384! Sumuneeng reepaar roobot." That is clearly the main quest: fix the computer and the cure gets finished. (Aside: the footer's own example of a two-number answer is "12 384", which is the same number. Coincidence or not, it made me blink.)

ProjCon Office (west) has a logo and a garish mural that "seems to ripple now and then, as though a breeze were blowing behind it", and Floyd says he does not remember it. Something is behind it, but the mural only offers "examine": no push, move, look behind, or go through. As a clicker I cannot act on the one hint the room gives.

### Attempt 1, turns 326-354: the miniaturization booth, the locks, and Floyd
I closed the loop through Project Corridor (west end: SanFac F, a dead end; northwest back to the Fork). The small booth south of the Computer Room is a "Miniaturization Booth" with a card slot and a numeric keyboard. Floyd tiptoed in: "Are we going to teleport into the computer like Achilles always used to do?" So: shrink and go into the computer, to Section 384. The teleport card was refused: "Inkorekt awtharazaashun kard...akses deeniid." I need a miniaturization card.

Back at the Main Lab I opened the radiation-lock door and walked through the two-part decontamination chamber: "Raadeeaashun suuts must bee worn beeyond xis point." I have no suit, so I turned back. I saved, then tried the bio-lock. At Bio Lock East there is a lab door with a window. Examining the window: "I see nothing special about the window", but Floyd peeks in, says it looks dangerous, "We'll need card there to fix computer", and proposes a plan: I open the door, he rushes in, I close it, and open it again when he knocks.

Interface wrinkle: the moment Floyd mentioned the card, "miniaturization access card: examine / take / read" appeared in my In-the-room list, although the card is in the next room. "take" replied "It's in the next room." Another offered action that cannot work.

I saved, and followed Floyd's plan exactly: open, (monsters!) close, wait ("three fast knocks, followed by the distinctive sound of tearing metal"), open, close. Every step was on the list and the timing was generous. Floyd staggers out with the card and dies in my lap while I sing him "the Ballad of the Starcrossed Miner". That was a real gut-punch, well written, and I felt it even through a numbered menu. +2 and then +1 for taking the card: score 51.

### Attempt 1, turns 355-380: into the computer, the speck, the microbe, and death
Before going I swapped the laser's old battery for the fresh one (drop the old from the laser's sub-list, then "put in..." on the laser: two steps, but both were visible). At the Bio Lock West the game told me "The bio-lock door has closed since you were last here" and offered "open": good state feedback.

In the Miniaturization Booth the mini card worked: "Please type in damaged sector number." "11 384" and I was shrunk to Station 384 inside the computer (+4 on stepping onto the strip). North along a silicon "highway" over a void I found a micro-relay in red translucent plastic, jammed open by a blue speck. The laser was offered as "shoot speck" and "shoot micro-relay". I reasoned: the beam has to pass through red plastic, so a red beam. Firing without a target revealed setting 5 is blue (+2 points just for that, a nice nudge), so I guessed 1 is red, set "113 1", and fired. Five shots (three misses, a sizzle, then vaporized): "Sector 384 will activate in 200 millichrons. Proceed to exit station." +8, score 65. The laser meanwhile went "slightly warm", then "somewhat warm".

Heading back south, an elephant-sized red microbe dropped onto the strip. "shoot microbe" with the red beam "passes harmlessly through its red skin" (consistent with my own logic, which pleased me). Every carried item had carried a mysterious "throw off the strip" option since I arrived, and the laser kept warming, so I guessed the microbe was attracted by heat and threw the laser into the void. Wrong: it ate me. Death at turn 380; the death screen says the score is 65 "out of 80 points", which is a useful sense of progress.

My read on the failure: either I should have changed the laser colour (a non-red beam should hurt a red membrane), or the laser needed to be hotter before throwing. I will restore to the save at the relay (turn 369) and try the colour idea first.

### Attempt 2, turns 369-403: restore, the microbe done right, the Bio Lab dash, the cryo-elevator
I clicked "restore your saved game" on the death screen (one option, instant) and was back at the relay at turn 369. The speck sequence replayed identically (miss, miss, near miss, miss, sizzle, vaporize), so the misses are deterministic rather than random; fine, but it still costs five turns. I saved right after the speck died, then set the dial to 6 before walking into the microbe.

With a violet beam, "shoot microbe" hurt it ("the beam slices through the microbe's skin!") but "the wound quickly seals itself". Shooting kept it at bay while the laser went "somewhat warm" then "very warm", and the game spelled the mechanism out: "Another pseudopod, perhaps attracted by the warmth of the laser, tries to envelop the weapon." At "very warm" I threw the laser off the strip: "the hungry microbe lunges after it. Both the laser and the microbe plummet into the void. (Whew!)" So my first-attempt theory was right, only premature. The warmth ladder is a fair clue once you know to watch it.

Back at Station 384 the main booth had "malfunctioned" and I was dumped into an Auxiliary Booth (+4, score 69) next to a Lab Office whose "only way out is through the mutant-infested Bio Lab". The desk held a gas mask ("wear" was offered directly; afterwards the Carried list shows "gas mask" without any "(being worn)" marker, unlike the chronometer). Three buttons: lights on, lights off, and "Eemurjensee Sistum". I saved, pushed the red one ("a hissing from beyond the door"), opened the door: mist, and "Horrifying biological nightmares stagger about making choking noises."

Then a proper chase. In the Bio Lab a PA announced "Revival procedure beginning. Cryo-chamber access from Project Control Office now open." That tied straight back to the rippling mural. I opened the lab door, ran west through both halves of the bio-lock (the lock door had closed again and needed an extra "open" while the mutants were "almost upon" me), then Main Lab, Computer Room, ProjCon Office, where "The mural ... has slid away, revealing an open doorway to a large elevator!" South into the Cryo-Elevator, "push button": "The elevator door closes just as the monsters reach it!" +5, score 74. The chase was tense and every step was a single, obvious click. My main worry during it was the long option lists: each room re-listed three monsters with six options each (examine, talk to, salute, attack, listen to, throw at), which I had to scroll past to find the exit.

### Attempt 2, turns 404-409: the Cryo-Anteroom and the ending
The elevator took a few turns to arrive. In between, clicking "open cryo-elevator door" (offered!) got the odd reply "You must be very clever to do that to the cryo-elevator door", and "push button" did nothing; after a "wait" the door opened on its own. North was the Cryo-Anteroom: thousands of cryo-units, a medical robot revives Veldina, leader of Resida, who thanks me for the cure... and then tells me a second Stellar Patrol ship "has been destroyed by our malfunctioning meteor defenses", so I am stranded (with a bank account and a country house). GAME WON at turn 409, score 74 of 80, rank Cluster Admiral.

That sting in the tail made the Planetary Defense room click: the "Surkit Boord Faalyur" I walked past at turn 276 was the meteor defence, and I never found a replacement fromitz board. So the game told me exactly what I missed, which is a good ending design. With about 150 turns of budget left, I decided to restart from the checkpoint and try for the better ending: rush the known route, then spend the spare turns on the teleport booth, the radiation lab and the fromitz boards.

### Attempt 3, turns 256-283: fast replay, and the room I had walked past
I restarted from the checkpoint with `--new --checkpoint lawanda --click`. The promise that "a number keeps its meaning ... after a restart of this session" held up beautifully: I replayed the route with the same numbers from memory (4, 3, 2, 2, 2, 1 to Course Control; 10, 19, "16 good ninety-ohm bedistor" to fix the course). Installing the bedistor first also freed the weight, so the medicine bottle came without the drop-juggling of attempt 1. Fixed course and cured the fever by turn 273.

Then I went where I had not: Systems Corridor West's "go north" (I had assumed it was the same as "go down"). It is a Repair Room with a dead robot, Achilles ("He always had trouble with one of his feet working right"), locked cabinets, and a robot-sized doorway to a supply room: "a bit too small for you." I waited three turns for Floyd to catch up. "talk to Floyd" only got "Hi!", but it made a new entry appear: "small doorway: show to floyd". Clicking that sent Floyd in to play with a rubber ball; he came out saying there was "Just a shiny fromitz board." A new character option "ask to get the board" appeared, and he tossed it to me. That is exactly what I needed for the Planetary Defense panel.

In attempt 1 I simply never clicked "go north" there, because the room text said "a narrow stairway leads down to the north" and the list showed both "go north" and "go down"; I read them as one exit. That cost me the good ending.

### Attempt 3, turns 284-293: the meteor defence repaired
Back in Planetary Defense I examined the third and fourth boards too: all four read identically ("a twisted maze of silicon circuits"), so examining cannot find the fault. I tried taking them instead. The first gave "You jerk your hand back as you receive a powerful shock"; the second slid out, and in my Carried list it was suddenly called a "fried seventeen-centimeter fromitz board". So the fault is discovered by pulling boards, and the live ones shock you: fair, but the renaming happened silently (no line like "it is blackened and fried"); I only noticed because I scanned the Carried list. "put in..." on the panel with the shiny board: "The card clicks neatly into the socket. The warning lights stop flashing." +6, score 54. Saved.

### Attempt 3, turns 293-308: a careless batch, and Floyd who did not know
Feeling confident, I queued a whole sequence of clicks at once (walk to the Bio Lock, examine window, open door, close, wait, open, close, take). That was my mistake as a player, but it exposed something in the game: this time Floyd's reaction at the window was different. Instead of volunteering his plan, he just said "Ooo, look ... There's a miniaturization booth access card!" My pre-queued "open lab door" then opened the door myself: "the mutations march into the bio-lock and devour you." Dead at turn 308. Floyd's self-sacrifice offer apparently depends on him having seen the broken computer first (in attempt 1 I had visited the Computer Room with him and he said "Computer is broken"); on this faster route I skipped that room. Nothing on screen tells you that the difference is the computer visit, so a player who goes straight to the lab with Floyd just sees an "open lab door" option that kills them. I restored the Planetary Defense save (turn 293; Floyd quipped "That part of the game was more fun than this part").

### Attempt 3, turns 293-369: 80 of 80
This time I went via the Computer Room first. I also fumbled one click there: I sent "5" out of habit expecting "look", but in the Computer Room 5 is "go in" (the booth), since room buttons are numbered per room. A one-turn detour, harmless. Floyd arrived after a couple of waits, and at the Bio Lock window he gave the full plan again. Same open/close/wait/open/close routine, card taken (+1), booth, "11 384", strip (+4), untargeted shot (+2), speck on setting 1 (this time a different miss pattern, six shots), save, dial to 6, microbe: shot until "very warm", thrown off the strip, Auxiliary Booth (+4), gas mask, red button, through the Bio Lab and the locks, ProjCon Office (the mural already open), Cryo-Elevator (+5): score 80.

The ending changed completely: Veldina reports that a Stellar Patrol ship now orbits the planet, the S.P.S. Flathead beams down, I am promoted to Lieutenant First Class, and then the robot technicians bring back Floyd: "Floyd feeling better now!" He hands me a helicopter key, a reactor elevator card and a paddleball set, "Maybe we can use them in the sequel..." Score 80 of 80, rank Galactic Overlord, GAME WON at turn 369. Getting Floyd back was a lovely payoff for the second run.

### Report
I played three attempts from the Lawanda checkpoint, about 290 turns in all. Attempt 1 (turns 256-380) found the Infirmary medicine, fixed the course-control bedistor, read the library, found the teleport and miniaturization cards, lost Floyd in the Bio Lab, shrank into the computer and cleared the speck, then died to the microbe at 65 points. Attempt 2 (restore to turn 369) beat the microbe by heating the laser, escaped through the Bio Lab and reached the Cryo-Anteroom: won with 74 of 80, with the ending telling me the meteor defences had shot down my rescue ship. Attempt 3 (restart from the checkpoint) found the Repair Room I had missed, got Floyd to fetch the shiny fromitz board, repaired Planetary Defense, and after one death at the bio-lock (Floyd's offer depends on an earlier visit to the computer) finished with 80 of 80, Galactic Overlord, and Floyd restored. I never explored the Radiation Lab, the teleport booth destinations, the helicopter or the conference-room combination (982); none turned out to be needed.

What worked: the option list kept every puzzle step reachable with single clicks, and value entries ("11 384", "113 1", "21 5") were easy. Contextual verbs that only appear when relevant ("take with pliers", "slide through slot", "show to floyd", "ask to get the board", "throw off the strip") make this a genuinely playable point-and-click game. Numbers stay stable per room and survive restarts, so replaying was quick. Save/restore is instant and free. The writing carries the emotional beats (Lazarus, Floyd's death, his return), and the green "+N points" notices and the "out of 80" line give a clear sense of progress. The ending that names the missed task is excellent design.

What still hurts: (1) the lists sometimes offer actions that cannot work (eat medicine inside a closed or untaken bottle, take a card that is in the next room, "take with pliers" on something I hold, open a moving elevator), and each costs a turn under a disease clock. (2) Some contextual verbs give puzzles away before I have thought about them ("take with pliers", "throw off the strip" on everything the moment I arrive in the computer), while others that matter are hidden until a condition is met ("show to floyd" on the doorway) or missing entirely (the rippling mural offers only "examine"). (3) Exits that describe one passage as two list entries ("go north" and "go down" for "a narrow stairway leads down to the north") made me skip a room, which cost the best ending. (4) During the mutant chase, three monsters with six options each were re-listed in every room, pushing the exits I needed down the screen. (5) Some state changes are silent: the fried board is only identifiable by its new name in the Carried list, and the worn gas mask has no "(being worn)" marker.

The briefing was enough to pick up the thread: it named every item and why I had it, and "you feel weak and flushed" plus "diagnose" gave me a clear first priority. It did not mention that Floyd would be a few turns behind, and his absence from the first option list was briefly confusing.

The three changes I would make first: 1) hide or grey out options whose preconditions are plainly unmet (item not held, container closed, object in another room), or make them not cost a turn; 2) merge exits that are the same passage and label every exit with its destination once visited, so "go north" versus "go down" is unambiguous; 3) collapse hostile or passive characters during chases to a single "examine" entry (or fold their verbs behind a "…" like carried items) so exits stay near the top.

### Verdict
A complete, satisfying run from the checkpoint to the full 80-point ending using only clicks, with the best story beats intact. The interface is already good enough to finish the game blind. The remaining friction is offered-but-impossible actions, a few giveaway or hidden verbs, and ambiguous duplicate exits, and the last of those is what cost me the good ending on my first win.

### Friction log
| Turn | Where | What happened | Kind |
|---|---|---|---|
| 256 | Lawanda Platform | Floyd absent from the option list at start although the briefing says he is right behind me; he arrives next turn | Confusing |
| 256 | Lawanda Platform | Save is free and a Restore button appears marked "(new)" | Positive |
| 258 | Escalator | Exits list "go east" and "go up" separately with no destination names; unclear if they are the same | Confusing |
| 263 | Infirmary | "take all" blocked by weight, but the reply names exactly which item to drop to make room | Positive |
| 264 | Infirmary | "eat" offered on medicine in a bottle I was not holding: "You're not holding the medicine bottle." | Dead option |
| 267 | Infirmary | "eat" offered on medicine inside a closed bottle: "The bottle is closed." | Dead option |
| 267 | Infirmary | Carried-item submenu says 'Answer "127 <item>"' when it means an action | Text bug |
| 266 | Infirmary | Floyd finds the Lazarus breastplate and runs off sobbing | Positive |
| 278 | Planetary Defense | Four fromitz boards examine identically; no way (yet) to tell the failed one | Puzzle (stuck) |
| 283 | Course Control | "take with pliers" offered on the fused bedistor before I tried anything, which gives the solution away | Confusing |
| 284 | Course Control | Carried fused bedistor still offers "take with pliers" | Dead option |
| 285 | Course Control | Bedistor swap: clear feedback, green "+6 points" notice | Positive |
| 285 | Course Control | Installed bedistor listed loose in the room with "take", tempting me to undo the fix | Confusing |
| 288 | Physical Plant | Description hints the plant is oddly oversized; no clickable way to follow up | Confusing |
| 295 | Library Lobby | Terminal "type a number <value>" works smoothly with "21 5"; lore menus readable | Positive |
| 301 | Booth 3 | "slide through slot" offered for every card I carry: tells me a card is needed without telling which | Positive |
| 308 | Library | Inserting a spool into a switched-on reader says "Some information appears" but does not print it; needs a separate "read" | Unhelpful response |
| 309 | Library | Microfilm reader story beats (disease timeline, helicopter needs) are clear goals | Positive |
| 311 | Library Lobby | Fever message returns ~40 turns after the medicine, as an unobtrusive "!>" line; easy to miss | Pacing |
| 313 | Main Lab | Doors appear in the Exits row with "open"/"examine" right there | Positive |
| 315 | Lab Storage | Searching the lab uniform yields the teleport card and a combination note | Positive |
| 320 | Computer Room | Floyd's comment on the red light points straight at the main quest | Positive |
| 321 | Computer Room | Footer example "12 384" matches the plot's Section 384 | Confusing |
| 324 | ProjCon Office | Rippling mural hints at something behind it but only "examine" is offered | Action not on list |
| 334 | Miniaturization Booth | Wrong card gives a clear "Inkorekt awtharazaashun kard" | Positive |
| 338 | Main Lab | "examine" on either lock door only says "The door is closed." | Unhelpful response |
| 346 | Bio Lock East | "The is the second half of the sterilization chamber" | Text bug |
| 347 | Bio Lock East | "examine window" says "nothing special"; the real content comes from Floyd's interjection | Confusing |
| 347 | Bio Lock East | Card in the next room appears in In-the-room with "take"; reply "It's in the next room." | Dead option |
| 349-353 | Bio Lock East | Floyd's plan is fully executable with listed options; generous timing | Positive |
| 353 | Bio Lock East | Floyd's death scene lands emotionally | Positive |
| 356 | Bio Lock East | Swapping the laser battery took two visible steps (drop old from laser sub-list, "put in..." on laser) | Positive |
| 358 | Bio Lock West | "The bio-lock door has closed since you were last here." | Positive |
| 364 | Station 384 | Every carried item grows a "throw off the strip" option on arrival; puzzling (and a tempting red herring) | Confusing |
| 370 | Strip Near Relay | Untargeted "shoot" reveals the beam colour and awards points: teaches the dial | Positive |
| 372-377 | Strip Near Relay | Five shots to hit the speck; random misses cost turns under a timer | Pacing |
| 380 | Middle of Strip | Threw the warm laser off the strip to distract the microbe; eaten. Death screen offers restore; score "65 out of 80" | Puzzle (stuck) |
| 380 | Death screen | Single "restore your saved game" option; instant | Positive |
| 372-377 | Strip Near Relay | Speck shots replay identically after restore (deterministic misses) | Pacing |
| 383 | Middle of Strip | "perhaps attracted by the warmth of the laser" makes the heat mechanic explicit | Positive |
| 390 | Lab Office | Worn gas mask shows no "(being worn)" in the Carried list | Confusing |
| 394 | Bio Lab | PA announcement links the revival to the Project Control Office: clear signpost | Positive |
| 396-402 | Bio Lab to ProjCon | Three monsters x six options each re-listed in every room of the chase; exits buried | List too long |
| 398 | Bio Lock West | Lock door re-closed itself; needed an extra "open" click mid-chase (tense but fair) | Positive |
| 403 | Cryo-Elevator | Escape lands with "+5"; single-button climax works well by click | Positive |
| 405 | Cryo-Elevator | "open cryo-elevator door" offered while moving; reply "You must be very clever to do that" | Dead option |
| 406 | Cryo-Elevator | Elevator needs unexplained "wait"s to arrive; "push button" does nothing | Pacing |
| 409 | Cryo-Anteroom | Ending names the missed task (meteor defences) so I know what to go back for | Positive |
| 256 | Lawanda Platform | After the restart, every option number from attempt 1 still worked; replay was fast | Positive |
| 275 | Systems Corridor West | "go north" and "go down" both listed for "a narrow stairway leads down to the north"; I assumed one exit and missed the Repair Room in attempt 1 | Confusing |
| 281 | Repair Room | "show to floyd" on the small doorway only appears after Floyd is present/talked to; "talk to" itself says just "Hi!" | Confusing |
| 282-283 | Repair Room | "show to floyd" then "ask to get the board": a neat click-native way to command Floyd | Positive |
| 287-289 | Planetary Defense | All four boards examine identically; the fault is only found by trial-taking | Puzzle (stuck) |
| 290 | Planetary Defense | Live board shocks you when taken: a clear, fair signal | Positive |
| 291 | Planetary Defense | Taken board silently renamed "fried ... fromitz board" in the Carried list; the take message does not say so | Silent state change |
| 292 | Planetary Defense | Board swap: "The warning lights stop flashing." +6 | Positive |
| 292 | Planetary Defense | Reply calls the board a "card" ("The card clicks neatly into the socket") | Text bug |
| 307 | Bio Lock East | Floyd's offer to fetch the card silently depends on having visited the broken computer with him; otherwise "open lab door" is instant death with no warning | Puzzle (stuck) |
| 308 | Bio Lock East | My own batching error: pre-queued clicks ran after the situation changed | Confusing |
| 299 | Computer Room | Same number means different things in different rooms (5 = "go in" here, "look" elsewhere); habit misclick | Confusing |
| 369 | Cryo-Anteroom | Full-score ending, Floyd restored: strong payoff for replaying | Positive |
