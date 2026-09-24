# Round 21: click-21, by mouse, as a millennial new to text adventures

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The third milestone](playing-it.md#the-third-milestone-every-way-of-playing-wins-blind), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 21, 24 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the start (Deck Nine, turn 0), in 2 legs
- **Played as:** a millennial only vaguely aware of text adventures
- **Result:** **Won 80 of 80** at turn 701.
- **Commands:** 819, with 2 deaths

**About the numbers.** Played as a millennial only vaguely aware of text adventures, click only from the start, seed 21, in two legs. Leg 1 stopped at turn 183 in Dorm Corridor, score 17, when the session's permission system refused the harness call for its next move, soon after a coordinator note in the diary raised the leg budget to 750 commands (diary lines 59 and 65); a fresh agent played leg 2 from the handoff. The game won 80 of 80, Galactic Overlord, at turn 701, with two deaths, both restored: the Infirmary bed at turn 522 and the microbe at turn 675. Floyd's death in the Bio Lab is not a player death. The diary counts about 185 and about 480 commands for its legs (lines 65 and 217); the transcript has 197 lines beginning "> " up to the stop (line 4919) and 819 in all.

The diary below is `playtests/2026-09-24/2026-09-24-click-21.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Playtest round twenty-one: click-only, from the start (seed 21)

- Mode: click only (numbered options, as a mouse player)
- Start: from the start, `--new --seed 21 --click`
- Persona: a millennial who is only vaguely aware of text adventure games; plenty of modern games, never finished a text adventure, never played this one.
- Hard cap: game turn 2000 across all games. Leg budget: about 400 commands.

### Friction

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 1 | 2 | Deck Nine | "Why open the door to the emergency escape pod if there's no emergency?" | Made me laugh, and quietly told me the pod matters later. Chekhov's escape pod. | nice | - |
| 2 | 0 | Deck Nine | The help paragraph under every screen is long and repeats every turn | By turn 3 I'd stopped reading it; it's a wall. Useful once, noise after. | tedious | low |
| 3 | 7 | Deck Nine | Brochure says the planet's main export is... the game Planetfall. | Genuinely funny meta joke. | nice | - |
| 4 | 9 | Deck Nine | Clicked "take celery" and the ambassador was offended, then offered me some anyway | Cute, but I didn't get the celery and don't know if I should have "accepted" it somehow; no accept option shown | confusing | low |
| 5 | 16-31 | Escape Pod | The explosion and the whole pod ride play out while I just press wait | Felt like a cutscene, dramatic and funny; zero effort to get off the ship once I got the hint | nice | - |
| 6 | 24 | Escape Pod | Exits switched from "east / out" to "go up / out" mid-flight, while the door was still closed | Weird - did the pod flip? No text said so. Small but made me wonder if I missed something | confusing | low |
| 7 | 35-38 | Underwater | The "depth 3 of 3 ... at the surface" readout in the status line | Instantly told me "keep pressing up". Would have been scary without it. | nice | - |
| 8 | 64 | Mess Hall | "Slide through slot" for the ID card only appeared after I examined the slot | Good that it showed up, but I'd never have guessed the option was hiding behind "examine" - makes me feel I need to examine EVERYTHING | confusing | low |
| 9 | 65 | Mess Hall | Card rejected in phonetic alien spelling | Funny, and clear enough: wrong card, find the right one | nice | - |
| 10 | 68-76 | Dorms C/D | Four identical dorms and four identical toilets, each a dead end with nothing in them | The toilet joke was funny once; the 4th time I was just clicking through to make sure I wasn't missing loot | tedious | low |
| 11 | 77 | Corridor Junction | Hunger warning told me exactly what to eat and gave me a one-click "eat the blob of red goo" button, plus "(hungry, about 14 hours)" on diagnose | Survival timers usually stress me out; this told me how long I have. Very modern-feeling. | nice | - |
| 12 | 85-90 | Elevators/booth | Three separate card-slot machines in a row, all dead | Clear "you need a key" signal, but a bit of a wall - I've found nothing card-like yet | other | low |
| 13 | 95 | Admin Corridor South | Key visible in a crevice, "your fingers are too large" | Great tease - a visible goal I know I'll come back for | nice | - |
| 14 | 105 | Storage East | Take all -> "ID card slips from your arms... too much to carry", with a tip about the uniform pocket | Inventory limits are annoying, but the pocket tip was helpful. Would love to see a weight bar | other | low |
| 15 | 118 | Reactor Access Stairs | "It is pitch black. You might be eaten by a grue." | THE meme! I actually know this one. Pure joy, and I noped right back up the stairs. Need a light. | nice | - |
| 16 | 125-131 | Tool Room | "Your load is too heavy. Dropping the towel would make enough room." | Love that it names what to drop - but I'm now juggling items like Resident Evil's item box without the box. Drop-shuffling cost me ~6 turns | tedious | medium |
| 17 | 127-128 | Tool Room | Magnet warned it would smear my ID card "carried together any longer"... and smeared it on the very next action (taking the pliers) | Warning was fair, but I got ONE action to react and didn't realize taking something else counted. Felt like a gotcha. Don't know yet if the card mattered | confusing | medium |
| 18 | 136-145 | Robot Shop / Admin Corridor S | Floyd wakes up, follows me, gets "itchy", and tickling him drops the elevator card | Charming companion, and the "itchy" line was a perfect nudge to search him. Best moment so far | nice | - |
| 19 | 143 | Admin Corridor South | "take with magnet (new)" appeared on the key as soon as I came back holding the magnet | The (new) tag made the solution obvious in a satisfying way, not a spoiler way | nice | - |
| 20 | 158 | Kalamontee Platform | Shuttle notice: service until 6000, after that "special authorization" - clock already says 7823 | I don't know what the clock numbers mean (is 6000 a time of day? a day count?). Am I too late forever or just tonight? | not understood | medium |
| 21 | 158 | Kalamontee Platform | Floyd's reaction to me saving: "Oh boy! Are we gonna try something dangerous now?" | Fourth-wall wink from the companion - laughed out loud | nice | - |
| 22 | 173 | Dorm Corridor | The 3-hour walk down the dead walkway, both directions, and it burns hunger/sleep | Backtracking tax. The whole map hinges on this one hallway and every trip costs 3 hours of my food/sleep budget | tedious | medium |
| 23 | 178 | Storage West | Ladder: "You'd have to drop the laser, the survival kit, the pliers and the oil can first" | Clear, but it means another pile of stuff to come back for; I'm running an item-shuttle service | tedious | medium |
| 24 | 173 | Dorm Corridor | Tiredness warning lists exactly which dorms have bunks | Didn't have to remember the map - appreciated | nice | - |

### Narrative

Okay, here we go. Someone handed me a 1983 text adventure called Planetfall and said "just click the options." I've seen Zork memes ("It is pitch black. You are likely to be eaten by a grue.") and that's about it. Let's see.

**Turns 0-13.** I'm a janitor. On a spaceship. With a scrub brush. Love it. I poked the escape pod (the game sassed me for trying to open it with no emergency, which basically screams "there WILL be an emergency"). Wandered east to the Reactor Lobby and up to Deck Eight, and both times this Ensign Blather guy popped up screaming demerits at me for leaving my post. An alien ambassador slimed my freshly scrubbed floor and handed me a brochure advertising... this game. Ha. I tried scrubbing the slime (one ten-thousandth done, lol). I'm back on Deck Nine now, and my gut says to hang around here and see what happens, since the game keeps pushing me back to this spot.

**Turns 14-39.** CALLED IT. Waited on Deck Nine, the ship exploded, the pod door slid open, I jumped in and strapped into the safety web. Then I just hit "wait" like ten times and watched a little cutscene play out in text: the Feinstein blows up, the pod tumbles, finds a mostly-ocean planet, burns through the atmosphere, lands on an island cliff. Honestly that was kind of great, like a radio drama. The pod then popped open a panel with a survival kit and a towel. The pod was "precariously balanced" so I panicked and hit take all, which made me stand up and the pod fell into the sea. Opened the door, water rushed in, I swam up four "depth" levels (nice that it shows depth 3 of 3 etc., I knew which way was out) and I'm on a crag. Score 6. There's a structure 8 meters up the cliff.

**Turns 40-65.** Survival kit has three blobs of goo (red, brown, green). Yum? The towel says "Don't Panic!" - Hitchhiker's reference, I got that one. Climbed to a Balcony with a plaque in phonetic-misspelled Galalingua ("SEENIK VISTA... Kalamontee Valee") which is fun to sound out - there's a "former provincial capitol building at the bend in the Gulmaan River". Then up the Winding Stair to a ruined castle Courtyard, then north into a much more modern complex, all dusty and abandoned. I SAVED at Plain Hall (turn 48) - I don't usually think to, but a deserted alien base felt like a boss-fight-is-coming vibe. Rec Area has a locked door with a combination dial (set to 0) - no clue yet. Dorms A and B plus toilets (the game joking about toilet bowl design being universal lol). Mess Corridor has a padlocked door. Mess Hall had a canteen (grabbed it) and a door with a card slot; my ID card got "Inkorekt awtharazaashun kard...akses deeniid." So I need a different card. Classic keycard hunt, I know this from Resident Evil / System Shock-alikes.

**Turns 66-90.** Checked the other two dorms/toilets (identical, empty). Went east down a dead moving walkway - the game said "That walk took about 3 hours" and immediately my stomach growled with a VERY helpful nudge: "The goo in your survival kit would take care of both", plus an "eat the blob of red goo" button appeared. Ate it: cherry pie flavor. Nice. So there's a hunger timer; the diagnose button even showed "hungry, about 14 hours". Found the Elevator Lobby: blue door (Upper Elevator) and red door (Lower Elevator), both with card slots, both dead ("slot stays dark"). A teleport booth "2" says "Teleportaashun buux not aktivaatid." Everything wants a card I don't have. Next: explore north and south from Corridor Junction.

**Turns 91-109.** Up north from the junction: a cracked Admin Corridor South with a crevice - there's a SHINY STEEL KEY at the bottom but my fingers are too big. Need tweezers/a magnet/something skinny. Further north the whole building is split by an 8-meter rift (can't jump it). "Sistumz Moniturz" room shows which systems are broken: planetary defense, planetary course control, communications, project control are red; library, reactors, life support green. That reads like a quest log to me - fix the red ones? South of the junction, Storage East had an oil can and a cardboard box of electronics (cracked fromitz board, B- and K-series megafuses, a ninety-ohm bedistor). "Take all" made me drop stuff - too much to carry. So I DROPPED the brochure and the scrub brush in Storage East, pocketed the ID card in my uniform, and grabbed the oil can.

**Turns 110-131.** Reactor Control has a reactor elevator (another card slot) and a dark stairway down - "It is pitch black. You might be eaten by a grue." I KNOW THAT ONE. Squealed a little, went right back up. Need a light source. Then the Tool Room: jackpot. Glass flask, a U-shaped metal bar with filings stuck to it (= magnet, surely that's how I fish out the crevice key), wide-nosed pliers, and an "Akmee Portabul Laazur" with an old battery and a setting dial. Inventory weight is now the main annoyance. I dropped the cardboard box of electronics, the canteen and the towel here in the Tool Room. When I picked up the magnet, the game warned it would smear my ID card's magnetic stripe if I kept carrying them together - and literally one action later it did. Oops. The ID card was already rejected by the Mess Hall slot so maybe it doesn't matter? Fingers crossed. Carrying now: chronometer, uniform (ID card in pocket, smeared), survival kit (brown + green goo), oil can, magnet bar, pliers, laser.

**Turns 132-147.** Machine Shop has a chemical dispenser with colored buttons (coolants, catalysts, base, acid) - the flask in the Tool Room is obviously for that, later. Robot Shop: turned on a little robot and after a beat he woke up: "Hi! I'm B-19-7, but to everyperson I'm called Floyd... Let's play Hider-and-Seeker you with me." I'm already in love. He follows me. Used the magnet on the crevice: the steel key leapt out. Then Floyd complained he felt itchy inside, I "searched" him, he giggled ("You're tickling Floyd!") and a LOWER ELEVATOR ACCESS CARD fell out. This is the best NPC moment I've had in a while. Having learned my lesson with the ID card, I dropped the magnet in Admin Corridor South BEFORE picking up the new card. Score 9.

**Turns 148-162.** The lower elevator card worked ("Elevator enabled"), and the elevator took me (and Floyd, who chanted the death scene from Carmen on the way down, lol) to an underground Waiting Area and the "Shutul Platform -- Kalamontee Staashun". +4 points, score 13. A notice says the shuttle runs every day until 6000, after that it needs "speshul awtharazaashun" - and the clock is already past 7800. Hmm. Saved here at Kalamontee Platform (turn 158; Floyd: "Oh boy! Are we gonna try something dangerous now?"). The shuttle car Alfie has control cabins at both ends with a slot, a +/- lever and a display. Pushing the lever: "Shuttle controls are not currently activated." Yet another card. I'm starting to feel like a keycard janitor. Plan: go back up and try the steel key on the padlock in Mess Corridor (a 3-hour walk west, ugh).

**Turns 163-180.** Rode back up (the card stayed "enabled", nice, no re-swipe needed), walked the 3-hour hallway west. The game told me I'm getting weary and even listed which dorms have bunks - very hand-holdy in a good way. Diagnose now spells out "hours on your chronometer, not turns" which answers my earlier question about the clock a bit. Unlocked the padlock with the steel key - Storage West! +4, score 17. Inside: a tin can of "Spam and Egz" and a HEAVY extendable ladder. Ladder + 8-meter rift = obvious. But the ladder is so heavy I had to drop everything: ate the brown goo first (Nebulan fungus pudding flavor), then used "drop all except" to keep only the lower elevator card. So in Storage West now: survival kit (green goo left), key, oil can, pliers, laser, tin can. Padlock is on the floor in Mess Corridor. Carrying: ladder, elevator card, uniform (smeared ID), chronometer. Plan: haul the ladder 3 hours east to the rift, bridge it. Then come back for my stuff... more hauling. Also need to sleep within ~10 hours.

(Coordinator note: leg budget raised to 750 commands.)

**Turns 181-183.** Grabbed the ladder, walked out to Mess Corridor and east to Dorm Corridor, about to start the 3-hour hike east to the rift with the ladder... and that's where this leg had to stop (the session's tooling refused my next command, so I'm writing the handoff here rather than pushing on).

### Leg 1 handoff

- **Why I stopped:** the harness call for my next move (go east from Dorm Corridor) was refused by the session's permission system, so I stopped instead of working around it. About 185 commands used.
- **Game turn:** about 183 (last confirmed 181 in Storage West, plus two moves). **Score:** 17. **Time:** night, chronometer about 8390.
- **Location:** Dorm Corridor (the west end of the long dead-walkway hallway), Floyd the robot following me.
- **Inventory:** extendable ladder (heavy, takes the whole load), lower elevator access card, chronometer (worn), Patrol uniform (worn) with my ID card in the pocket. The ID card's magnetic stripe got SMEARED by the magnet, and the Mess Hall slot rejected it even before that.
- **Items left behind:**
  - Storage West (north of Mess Corridor, door open, padlock unlocked): survival kit (one blob of GREEN goo left = one meal), steel key, oil can, wide-nosed pliers, laser ("Akmee Portabul Laazur", dial on 5 of 1-6, old battery), unopened tin can "Spam and Egz".
  - Mess Corridor floor: the open padlock.
  - Tool Room: cardboard box (cracked fromitz board, B-series megafuse, K-series megafuse, good 90-ohm bedistor), canteen (open, empty), towel ("Don't Panic!"), glass flask (never taken).
  - Admin Corridor South: curved metal bar = MAGNET (it smears magnetic cards! Never carry it next to a card).
  - Storage East: brochure, scrub brush.
- **Saves:** saved at Plain Hall (turn 48), then again at Kalamontee Platform (turn 158). I think it's a single save slot, so a restore probably goes back to Kalamontee Platform at turn 158: before the padlock and ladder, and the brown goo not eaten yet.
- **Health:** "perfect health". Ate brown goo at about turn 179, so good for about 14 chronometer hours of food. Tired: at turn 175 diagnose said about 10 hours of being awake left, so now about 9. The hallway walk takes 3 hours each way. Sleep soon; bunks are in Dorms A/B (off Rec Corridor) and C/D (off Dorm Corridor, right here). The diagnose button shows hours left. Hours are chronometer hours, not turns.
- **Map (what I've found):**
  - Crag (where I washed up) -> up -> Balcony (plaque) -> up -> Winding Stair -> up -> Courtyard (castle ruin). Courtyard: W = West Wing (dead end), N = Plain Hall.
  - Plain Hall: N = Rec Area, NE also exists (unexplored? probably Rec Corridor). Rec Area: locked north door with a COMBINATION DIAL (set to 0), E = Rec Corridor.
  - Rec Corridor: N = Dorm B -> SanFac B, S = Dorm A -> SanFac A, SW = Plain Hall, E = Mess Corridor.
  - Mess Corridor: N = Storage West, S = Mess Hall (canteen was here; south door with a card slot, my ID rejected), E = Dorm Corridor.
  - Dorm Corridor: N = Dorm D -> SanFac D, S = Dorm C -> SanFac C, E = the 3-hour dead walkway to Corridor Junction.
  - Corridor Junction: N = Admin Corridor South (crevice, now empty; E = SanFac E), then N = Admin Corridor (8m-wide RIFT to the north; W = Systems Monitors). E = Elevator Lobby. S = Mech Corridor North.
  - Elevator Lobby: N blue door = Upper Elevator (card slot, dead), S red door = Lower Elevator (my card works), E = Booth 2 teleporter ("not aktivaatid", buttons 1 and 3).
  - Lower Elevator down -> Waiting Area -> E = Kalamontee Platform -> S = Shuttle Car Alfie (control cabins E and W, each with a slot and a +/- lever: "controls not currently activated").
  - Mech Corridor North: E = Storage East, W = Physical Plant (NE/SE exits), S = Mech Corridor. Mech Corridor: E = Reactor Control (button-operated reactor elevator with a card slot; a DARK stairway down, where the grue is, so don't go without a light), W = Physical Plant, S = Mech Corridor South.
  - Mech Corridor South: SW = Tool Room, S = Machine Shop (chemical dispenser: 4 coolant buttons red/blue/green/yellow, 3 catalysts gray/brown/pink, white BAAS and ASID), SE = Robot Shop (where Floyd was).
- **Puzzles solved:** got off the ship (waited for the explosion, got in the pod and the web); swam up from the pod; turned on Floyd; key out of the crevice with the magnet; tickled/searched Floyd for the lower elevator card; rode the elevator to the shuttle platform; unlocked the padlock -> Storage West -> ladder.
- **Open puzzles:** the rift in Admin Corridor (ladder!), the combination-dial door in Rec Area, the Mess Hall south door (card), the Upper Elevator (card), the teleport booth (card?), the shuttle controls (card; notice: service until 6000, after that "special authorization"), the reactor elevator (card), the dark stairs (need a light), the chemical dispenser plus flask, what the fuses/fromitz board/bedistor fix, the systems monitors showing planetary defense, course control, communications and project control as broken, and the Spam tin (can't open it yet).
- **Theories:** the ladder bridges the rift and leads to more of the complex (maybe the admin area has cards). The broken systems are the "quest log". The board and fuses are replacement parts for something (maybe the communications room). The laser might be a light source, or open something. Floyd is useful (he's small, maybe he can fetch things through tiny openings).
- **Exactly what I meant to do next:** go east from Dorm Corridor (3h) with the ladder -> Corridor Junction -> N -> N to Admin Corridor and use the ladder on the rift, cross it, explore. Then sleep in a dorm when diagnose says tired, and come back to Storage West for the green goo and tools (the laser especially).

### Leg 2

Picking up where I left off: Dorm Corridor, turn 183, lugging the ladder with Floyd tagging along. Diagnose says tired, about 8 hours left. Plan from the handoff: haul the ladder east to the rift and bridge it, sleep when I have to.

#### Leg 2 friction

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 25 | 187 | Admin Corridor | "open ladder" -> "You couldn't possibly extend the ladder while you're holding it." Then after dropping it, "put across rift" appeared | Told me exactly why, and the next button showed up right after. Smooth. | nice | - |
| 26 | 190-198 | Admin Corridor North / offices | Crossing the ladder bridge led to two desks with THREE cards (kitchen, upper elevator, shuttle) | After a whole leg of dead card slots, a card jackpot. Huge payoff for hauling that ladder. | nice | - |

**Turns 183-198.** Hauled the ladder the 3 hours east, dropped it in Admin Corridor, "opened" it (extended to 8 meters) and "put across rift" - bridge! Walked over the swaying ladder (pointy rocks below, gulp) into Admin Corridor North, +4. Signs: west "Administraativ Awfisiz", north "Tranzportaashun Suplii", east "Plan Ruum". Small Office desk: kitchen access card AND upper elevator access card. Large Office (big window over the ocean) desk: SHUTTLE access card. Score 24. Saved at Admin Corridor North (turn 191). Problem: I'm "really tired", only ~3 hours awake left, and the bunks are 3+ hours away. Gonna see if I can just sleep here.

#### Friction (continued)

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 27 | 199 | Large Office | Tried "sleep" on the office floor: "Civilized members of society usually sleep in beds" + list of dorms | Funny and clear, but it meant a 3-hour forced march with 3 hours of awake left. The sleep timer + the one long hallway is a nasty combo; nothing warned me when I set off that the far side had no beds | tedious | medium |
| 28 | 209 | Dorm D | Stress dream: I hit the Feinstein's self-destruct while scrubbing, Blather howling | Loved this. Little reward for sleeping. | nice | - |
| 29 | 209 | Dorm D | My cards "slipped to the floor" while I slept, and I had to get out of bed to reach them; the button even said "(to reach what is on the floor)" | Mildly annoying mechanic, but the button explaining itself saved me confusion | nice | - |

**Turns 199-212.** The game refused to let me sleep on the office floor, so I had a genuine panic run: back across the ladder, down to the junction, and the 3-hour hike west with "If you don't get some sleep soon you'll probably drop" and "You can barely keep your eyes open" flashing. Collapsed into a bunk in Dorm D with diagnose saying "exhausted, less than an hour". Phew. Dreamt of blowing up the Feinstein. Woke up day 2 (Septem 7), morning, clock 1670 - so the clock DID reset overnight, and the shuttle notice said service until 6000. I think I can catch the shuttle today! Diagnose: perfect health, well-rested, well-fed. Now I have: kitchen card (Mess Hall door!), upper elevator card, shuttle card, lower elevator card.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 30 | 217-219 | Kitchen | Kitchen card opened the door, +4; "Hii Prooteen Likwid Dispensur" with an octagonal niche. Pressing the button just splashed brown goop on the floor | Clear enough: bring a container. Nice that experimenting didn't waste anything | nice | - |
| 31 | 223 | Storage West | "take all" dropped the key and the tin can in a chain of "slips from your arms" | Carry limit again. I just wish the inventory showed some kind of capacity | tedious | low |

**Turns 213-234.** Kitchen card opened the Mess Hall's south door: a Kitchen (+4, score 28) with a protein liquid dispenser - pressing the button spills it on the floor, so I need a container (the canteen!). Grabbed the green goo kit, laser and pliers from Storage West (the key and tin can wouldn't fit), walked the 3 hours east, got hungry, ate the last goo (lima beans). No more goo - food is now the canteen + dispenser, which is on the WEST side, ugh. Got the canteen from the Tool Room, dropped the empty survival kit. Floyd stopped following me somewhere around the Kitchen. Now: upper elevator and the shuttle while it's still "service hours" (clock 2191, runs till 6000).

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 32 | 244 | Upper Elevator | "You feel a bit weak and slightly flushed, but you're not sure why." Diagnose now says feverish | Ominous in a good way - then the Comm Room screen says a planetwide plague killed everyone. Oh no. Now there's a clock I can't see | other | medium |
| 33 | 250 | Comm Room | Send console: "Malfunkshun in Sendeeng Kuulint Sistum", a funnel hole, and the enunciator's BROWN light flashing | Lines up perfectly with the brown button on the Machine Shop dispenser and the flask in the Tool Room. Felt clever connecting it | nice | - |

**Turns 235-250.** Upper elevator card works; rode up (Floyd: "Hey, wait for Floyd!"). On the ride I started feeling "weak and flushed" - diagnose: feverish. Tower Core at the top (+4, score 32), with a spiral stair up and exits NE/SW. NE is the Comm Room: a recording of the Feinstein asking for a response on frequency 48.5 and then... an explosion. Poor guys. The send console's screen, in phonetic alien: "To any ship of the Second Galactic Union: Planetwide plague has struck entire population. Time is critical. Emergency assistance requested." So the whole planet died of a plague and I'm now feverish. Great. The send console has a coolant malfunction, a funnel-shaped hole for manual override, and a flashing BROWN light. Brown = the brown catalyst button at the chemical dispenser. Flask time.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 34 | 256 | Helicopter | "unlock lock" -> "But you don't have the orange key!" | Accidentally told me there's an orange key somewhere. A bit of a spoiler, but useful | other | low |
| 35 | 268 | Tool Room | Taking the flask made the UPPER ELEVATOR CARD slip to the floor. The random item it drops could have been one I'd walk away without noticing | I only caught it because I read the line. Putting a card in my uniform pocket freed space - nice that works | confusing | low |
| 36 | 275 | Machine Shop | Brown fluid "gradually turns milky white" in the flask | Wait, is that right? Did I make the wrong thing? No way to know till I pour it | confusing | low |

**Turns 251-276.** Explored the tower: Observation Deck (tower half a km tall; another island ~20 km east), Helipad on top with a rusty helicopter - control panel locked, and "unlock" said I don't have the ORANGE key. Went back down, grabbed the flask (had to drop the pliers and stuff a card in my uniform pocket to make room), put it under the chemical dispenser spout and hit BROWN. It filled with brown fluid that turned milky white. Hoping that's the coolant. Floyd wanders off and comes back ("Floyd going exploring"). Heading back up to the Comm Room with it.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 37 | 288 | Comm Room | Poured the brown stuff into the funnel: lights blink, all go off except... YELLOW. | Progress! But it means another full elevator + 4-corridor round trip to the Machine Shop. Is this going to be red, blue, green...? | tedious | medium |
| 38 | 314 | Comm Room | Yellow did it: panel goes dark, "help message is now being sent", +6 | Satisfying! Two colors, not seven - relieved | nice | - |
| 39 | 310 | Upper Elevator | Hungry again ~1500 clock units after eating, with the food machine a 3-hour walk away | The hint ("You think of the machine in the kitchen") is great, but the map geography turns every meal into a pilgrimage | tedious | medium |

**Turns 277-314.** Carried the brown-then-milky flask up, poured it in the funnel: all lights off except yellow. Back down, yellow button, back up (Hawaiian elevator music, lol), poured: "help message is now being sent"! +6, score 38. So hopefully a rescue is coming? Now hungry again and the only food is the kitchen machine way west. Off to fill the canteen, then the shuttle before 6000.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 40 | 329 | Kitchen | Filled the canteen in the niche, clicked "take canteen": over my carry limit, the kitchen card AND the canteen fell, and the protein liquid spilled and evaporated | Brutal - the weight system punished me for picking up the thing I just filled, and there was no "drink" button while it sat in the niche. Lost the meal | bug | medium |
| 41 | 335 | Kitchen | Diagnose said "hungry, nothing to eat" while the full canteen sat in the machine; the moment I picked it up, a big "drink the protein-rich liquid" button appeared | Once I was holding it, the one-click drink was lovely | nice | - |

**Turns 315-340.** Down and the long walk west to the Kitchen. First try at filling the canteen went badly: I took it out of the niche while overloaded, dropped it and the kitchen card, and the protein goop spilled and evaporated. Stashed two cards in my uniform pocket, refilled, drank ("Mmmm"), refilled again and closed the canteen for the road. Hunger fixed for now. Still feverish though. Next: 3 hours back east and down to the shuttle, clock ~4100, deadline 6000.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 42 | 356-380 | Alfie Control East | Driving the shuttle: lever up adds 5 per turn, center holds, down subtracts. "Limit 45", "Hafwaa Mark -- Beegin Deeseluraashun", then red-lit countdown signs "15", "10", "5"... I coasted at 5 and smashed into the far wall | Loved actually DRIVING it - real little minigame. But I read the 15/10/5 signs as speed limits, not distance-to-station. The crash was my fault but the signs were ambiguous to me | confusing | medium |

**Turns 341-383.** Walked back east, down the lower elevator, into Shuttle Car Alfie, saved (turn 353), went to the east control cabin and swiped the shuttle card: "Shuttle controls activated." Pushed the lever and we took off, 5 per turn up to 40, held it, "halfway mark, begin deceleration", pulled down to 5, held... and then signs "15", "10", "5" with blinking red lights, and the shuttle rumbled through a station and SMASHED into the wall. Unhealthy crunching sounds. I'm fine, apparently. But I'm worried I broke the shuttle and can't get back, so I'm going to restore to the save in the shuttle car and do it properly (brake to 0 when those countdown signs appear).

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 43 | 353 | Shuttle Car Alfie | On restore, Floyd: "That part of the game was more fun than this part," he admits | Fourth-wall Floyd strikes again. Took the sting out of redoing it | nice | - |
| 44 | 380 | Alfie Control East | Second run: pulled the lever right at "approaching a brightly-lit area" and glided to a perfect stop | Felt like I'd learned something. Good retry loop | nice | - |

**Turns 353-382 (again).** Restored, redid the drive, and this time pulled the lever back as soon as the station came into view: "glides into the station and comes to rest." Lawanda Platform, +4, score 42. It's dusk, clock 5791. There's a second shuttle (Betty) here and a dead escalator going up east.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 45 | 390 | Infirmary | Floyd finds the rusted breast plate of his friend Lazarus, sobs quietly and runs out of the room | Oof. He'd been talking about Lazarus the whole game. Genuinely got me - a 1983 game making me sad about a robot | nice | - |
| 46 | 392 | Infirmary | "Dizeez supreshun medisin -- eksperimentul": drank it, fever broke | Relief. "Suppression" and "experimental" tell me it's temporary though - the plague's still a clock | nice | - |

**Turns 383-399.** Up the dead escalator: a Fork, NE to Systems Corridor West, NW into an Infirmary. Medicine bottle ("disease suppression medicine - experimental") - drank it, fever broke, perfect health again. Took a sealed emergency ration and a red spool labelled "Simptumz uv Xe Dizeez" (symptoms of the disease - probably needs some reader). Floyd found his dead friend Lazarus's breast plate and ran out crying. :( Carry limit struck again; pocket's full now (ID, kitchen, upper elevator cards). Evening, clock 6001.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 47 | 403-412 | Planetary Defense / Course Control | Found the fixes for two red systems: a failed fromitz board (4 identical-looking boards in the panel) and a FUSED bedistor that won't come out - and the good bedistor and the pliers are sitting back in the Tool Room, a shuttle ride + 3-hour walk away | I had the parts in my hands and left them because of the carry limit. Kicking myself, but also: no way to know in advance which junk I'd need across the map | tedious | medium |
| 48 | 404 | Planetary Defense | Examining the four fromitz boards: all four give the identical description | How am I supposed to tell the broken one? Maybe that's the puzzle, but it read like nothing to go on | not understood | low |
| 49 | 407 | Planetary Defense | Fever came back ~15 turns after the medicine | Plague clock confirmed. Tense | other | low |

**Turns 400-423.** Lawanda complex is the "systems" side: Planetary Defense (access panel with four identical fromitz boards and a "circuit board failure" light) and Course Control ("Bedistur Faalyur!", a fused 90-ohm bedistor stuck in its socket - the good bedistor and the pliers are back in the Kalamontee Tool Room, argh). The fever came back ~15 turns after the medicine. Library Lobby: a green spool ("Helicopter Operating Manual") on the floor and a terminal with a menu. Read the lore in phonetic spelling: the Disease came from a Center for Advanced Cryogenic Research; the Project froze the whole population cryogenically while computers look for a cure, then Phase Four is "revival and inoculation of the population". So somewhere there's a cure, and I'm infected. The two complexes sit on twin peak plateaus with reactors and cryo chambers built in the mountains below. Carry limit made me drop both spools here.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 50 | 436 | Library | Microfilm reader + red spool: once symptoms show, death comes in 8 to 10 days; primary symptom high fever, secondary a sharp increase in the sleep needed each night | Scary but actually reassuring: the plague clock is days, not hours. Great way to deliver a timer diegetically | nice | - |
| 51 | 427 | Library Lobby | Fat-fingered "examine red spool" instead of "take" - the numbers 49/50 sit side by side and the room numbering reshuffles as things are dropped | My own slip, but with numbers renumbering per room it's easy to misclick | other | low |

**Turns 424-436.** Booth 3 east of the Library Lobby is another teleport booth (brown button 1, beige button 2, a slot - no teleport card yet). The Library up west has a microfilm reader. Red spool: the disease kills 8-10 days after first symptoms; fever, then needing more and more sleep each night. So I have ~a week of game time. Okay. Breathe.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 52 | 443 | Library | Green spool: helicopter needs a Helicopter Access Card and a Control Panel Key, "obtained from Transportation Storage" | Directly points at the "Tranzportaashun Suplii" door back in Kalamontee. Love a clue that closes a loop | nice | - |
| 53 | 449-451 | Lab Storage | "look inside" the lab uniform: a TELEPORTATION access card and a note "Combination to Conference Room: 477" | Two locks solved in one pocket. And teleport means I might not have to do the shuttle + 3-hour walk again! | nice | - |
| 54 | 451 | Lab Storage | Replacing the laser battery: no "take out" option on the old battery, only "drop"; "136 new battery" failed because the new battery was on the floor, not in my hands | Figured it out, but I clicked around 4 times; the "put in laser" list only showed my cards, which was confusing | confusing | low |

**Turns 437-457.** Green spool on the reader: helicopter needs an access card and a control panel key from Transportation Storage (home side!). South of the Library Lobby: Project Corridor East -> Main Lab (radiation-lock door NE, bio-lock door SE, exits S/SW/W). Lab Storage south of it: a lab uniform with a TELEPORTATION CARD and a note "Kombinaashun tuu Konfurins Ruum: 477" in the pocket, plus a fresh laser battery. Dropped my old smeared ID card (useless) to make room, swapped the laser's battery. Pocket now: kitchen, upper elevator, shuttle cards. Hands: canteen (full, closed), lower elevator card, teleport card, laser (new battery), emergency ration.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 55 | 459-460 | Computer Room | Floyd frowns at the red light: "Computer is broken... the most important part of the Project." Printout: drug testing 99.985%, "0 days, 0.8 chrons" to revival, then "Malfunction in Section 958! Summoning repair robot." | The whole plot clicks into place: the cure is basically done, the computer broke. Fix section 958 | nice | - |
| 56 | 473-474 | Repair Room | Asked Floyd through the robot-sized doorway: he played with a ball and mentions "a shiny fromitz board" inside. I have no button to ask him to bring it - "ask about" doesn't list the board, and asking him to go north again gets "Not again," | Exactly the board Planetary Defense needs, and I can SEE it through Floyd but can't ask for it. Stuck unless some option appears later | blocked | high |

**Turns 458-474.** Computer Room: red light, printout says the cure's done except testing, and section 958 malfunctioned. South of it a "Miniaturization Booth" with a slot and a numeric keypad (958, obviously, once I find the right card). ProjCon Office has a garish orange-and-purple mural that "ripples as though a breeze were blowing behind it" - Floyd doesn't remember it. Secret door? Down the stairs from Systems Corridor West: Repair Room with a dead robot and a tiny robot-sized doorway. Sent Floyd in: he found a rubber ball and "just a shiny fromitz board". But I can't find a way to ask him to fetch it.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 57 | 505-509 | Bio Lock East | Floyd volunteers to run into the monster-filled Bio Lab for the card: "When Floyd knocks, open door again." I closed the door, then pressed WAIT instead of opening on the knock... twice. Tearing metal, a scream, silence. | My fault, 100%, and the most emotionally loaded moment in the game. The wait button being right there made it easy to fumble. Restoring immediately | other | high |

**Turns 475-509.** Physical Plant east of Systems Corridor East (dead end, weirdly bigger than the Kalamontee one). Radiation Lock: sign says radiation suits required beyond the lab door - didn't go in. Bio Lock: through the window, mutant shapes, a blue glow from a crack, and a magnetic card on the floor. Floyd: "We'll need card there to fix computer... Floyd will get card. Robots are tough." His voice trembles. I saved. Opened, he plunged in, I closed the door... and then I hit wait while he knocked. Heard tearing metal. Then silence. NOPE. Restoring.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 58 | 509-511 | Bio Lock East | Second try, opened on the knock: Floyd stumbles out with the mini-booth card, I slam the door... and he dies anyway in my lap. "Floyd did it ... got card. Floyd a good friend, huh?" I sing him the Ballad of the Starcrossed Miner | I did NOT expect to be this sad about a text robot. Legitimately one of the best-written companion deaths I've seen in any game. (Also: the death text scrolled past fast and I only saw part of the song) | nice | - |

**Turns 510-513.** Restored and did it right: waited for the knock, opened, Floyd staggered out clutching the miniaturization card, I closed the door on the monsters. And he died anyway. Cradled his head, sang him his song. Score 45 after taking the card, which feels grim. RIP Floyd. I'm "really tired" (3 hours) and hungry-ish; heading to the Infirmary beds to sleep. Then: Miniaturization Booth, type 958.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 59 | 522 | Infirmary | Got into an Infirmary bed to sleep: a rusty diagnostic robot straps me down, injects all 347 serums and prepares to saw my legs off. DEAD. | Dark comedy gold, but a hard instant death on the only bed on this side of the map, with no warning. The sleep hint had even pointed me to the Kalamontee dorms - I thought I was being clever. Lost ~20 turns back to my save | blocked | medium |
| 60 | 511-522 | Bio Lock -> Infirmary | "Tired, about 3 hours" turned into "exhausted, less than an hour" after ~10 moves | Plague's secondary symptom (more sleep needed), I think - the red spool warned me. Still, the hours estimate in diagnose felt like it lied to me | confusing | medium |
| 61 | 512-513 | Booth 3 -> Booth 2 | Teleport card + beige button = instantly back in Kalamontee's Elevator Lobby, Floyd squealing and clutching his guidance mechanism | Game changer - no more shuttle driving. Should've found this before the Infirmary disaster | nice | - |
| 62 | 520 | Dorm D | Woke up day 3 "incredibly famished", starving with about an hour left - after having been "well-fed"-ish before bed | Sleep eats your food clock too. The emergency ration had a one-click "eat (starving!)" button, which saved me. Good UI | nice | - |

**Turns 505-524.** Restored to before the Bio Lab. Decided to SLEEP FIRST and do the Floyd thing after. Teleported from Booth 3 (beige button) to Booth 2 with Floyd, walked the 3 hours west, crawled into a bunk in Dorm D "exhausted, about 2 hours". Nightmare about a giant spider. Woke up Septem 8 (day 3), starving, ate the emergency ration. Floyd's still alive in this timeline (for now...). Plan today: the Rec Area dial (477 from the lab-uniform note), then Tool Room for the good bedistor + pliers, then Transportation Supply for helicopter stuff, then teleport back for the Bio Lab and the miniaturization booth.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 63 | 529-531 | Rec Area / Conference Room | Dial set to 477 -> door swings open -> Conference Room -> teleport Booth 1 right next to the dorms | The note paid off, and Booth 1 kills the 3-hour hallway for good. Wish I'd had it two days ago, but that's the game | nice | - |
| 64 | 541-544 | Tool Room | "Your load is too heavy" again - ended up leaving the LASER behind to carry the pliers and bedistor | Constant triage. I have no idea which item will matter, so every drop feels like a gamble | tedious | medium |

**Turns 525-544.** Rec Area dial -> 477 -> Conference Room -> Booth 1 teleporter (right by the dorms!). Teleported to Booth 2, walked to the Tool Room, took the good 90-ohm bedistor and the pliers. Had to drop the lower elevator card and the laser to fit them. Now heading north to "Tranzportaashun Suplii" for the helicopter stuff.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 65 | 551 | Transportation Supply | The room the helicopter manual pointed to is pitch black ("You might be eaten by a grue") | Another dark room and still no flashlight anywhere. Two dark places now blocking me | blocked | medium |
| 66 | 565-566 | Course Control | "take with pliers (new)" on the fused bedistor, then put the good one in the cube: "Kors diivurjins minimiizeeng", +6 | Carried those parts across the whole planet for this. Very satisfying click | nice | - |

**Turns 545-566.** Transportation Supply north of Admin Corridor North is pitch black (grue!) - backed out. Plan Room has maps of both complexes (Lawanda shows an installation "buried deep underground"). Teleported Booth 2 -> Booth 3 (tan button), went to Course Control, yanked the fused bedistor with the pliers and slotted in the good one: course divergence minimizing, +6, score 48. Two red systems fixed (communications, course control). Next: Repair Room to try Floyd and the shiny board again, then the Bio Lab and the miniaturization booth.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 67 | 578-581 | Repair Room | Back in the Repair Room with Floyd, and now there IS an "ask to get the board" button on him. It wasn't there right after he told me about the board (he wandered off immediately), so I thought I was stuck | Retract some of #56: the option exists, it just needs Floyd present after he's mentioned it. He fetched it and tossed it to me. Still, row 56 cost me a lot of worry | confusing | medium |
| 68 | 586-590 | Planetary Defense | Three of the four boards shocked me when I tried to pull them, the second slid out - that's how you find the dead one. Shiny board in, lights stop, +6 | Ahh, so the identical descriptions WERE the puzzle; the shock is the tell. Fair, once you try | nice | - |

**Turns 567-590.** Went back to the Repair Room and this time Floyd had an "ask to get the board" button: he fetched a shiny fromitz board and tossed it to me. Planetary Defense: saved, then tried pulling each board - three shocked me, the "second" slid out. Shiny one in its place, warning lights stop, +6, score 54. Three systems fixed now (comms, course control, planetary defense). Remaining: project control = the computer. Next: the Bio Lab with Floyd for the miniaturization card, then booth, 958.

**Turns 591-615.** Drank the canteen (hungry again), went to the Bio Lock with Floyd rested and fed, and did it for real this time. Same result - he dies. This time I actually read the whole Ballad of the Starcrossed Miner ("Then one true courageous miner / Spied a spaceship from the stars..."). "You sit in silence for a moment, in memory of a brave friend who gave his life so that you might live." Yeah, I'm not okay. +2, then +1 for the card, score 57. Afternoon, day 3. Now: Miniaturization Booth, 958.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 69 | 621-626 | Station 958 / Strip Near Relay | Shrunk down into the computer! Walking a "silicon filament highway" over a black void to a micro-relay sealed in red plastic, with a blue speck jammed in the contact | Honey-I-Shrunk-the-Kids in 1983. Loved the scale shift. +4 on arrival | nice | - |
| 70 | 626 | Strip Near Relay | The obvious tool is the laser... which I left in the Tool Room this morning to carry the pliers | The carry limit made me dump the one thing I needed, with no hint that I'd need it here. Now a round trip across two complexes | blocked | medium |

**Turns 616-626.** Miniaturization Booth: card in, "type in damaged sector number", 958, and the walls slide away - I'm microscopic, standing in Station 958 (+4, score 61). Walked a silicon strip over a void to a red plastic micro-relay with a blue speck wedged in its contact point. Clearly: shoot it with the laser. Which is in the Tool Room. Of course.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 71 | 646-648 | Tool Room | Test-fired the laser: setting 5 = blue beam (+2 points just for trying it!), setting 1 = red | The point for experimenting is a nice nudge. Red beam for red plastic, I think? | nice | - |
| 72 | 666-671 | Strip Near Relay | Red beam through the red plastic: six shots of near-misses ("A near miss!", "a little wide") before two hits vaporized the speck, +8. Meanwhile the laser kept "feeling warm" | The random misses were a bit of a slot machine, but the "warm" messages felt like a deliberate hint | nice | - |
| 73 | 672-675 | Middle of Strip | Elephant-sized red microbe lands on the strip. Red beam passes harmlessly through its red skin. I guessed it wanted the WARM laser and threw it into the void - it ate me instead. DEAD | I thought I'd cracked it (the warm-laser messages!). Wrong. Clear rule now: red beam passes red things, so try another color | other | medium |

**Turns 627-675.** Went back to the Tool Room for the laser (and swapped the pliers out). Test fires gave +2 and showed setting 5 = blue, 1 = red. Shrunk back into 958, saved at the relay, set the laser to red and shot through the red plastic: lots of misses, then the speck vaporized, "Sector 958 will activate in 200 millichrons. Proceed to exit station." +8, score 71. On the way out an elephant-sized microbe blocked me. Red laser went right through its red skin. I threw the hot laser into the void thinking it'd chase the heat. It ate me instead. Restoring to the relay save.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 74 | 674-679 | Middle of Strip | Retry: blue beam slices the microbe but it heals; shooting heats the laser up, and the monster keeps grabbing "attracted by the warmth of the laser". At "very warm" I threw it off the strip and the microbe dove after it. Whew! | That's the real solution to my wrong guess - the laser just had to be HOT enough. The escalating warm/somewhat warm/very warm messages were a great fair hint in hindsight | nice | - |
| 75 | 673 | Middle of Strip | "137 shoot something" vanished when only one target remained and became "235 shoot microbe" | The number I'd been using stopped working mid-fight. Scary moment to have the UI shift | confusing | low |

**Turns 676-681.** Restored, re-zapped the speck (+8), set the laser to blue before heading out. The microbe dropped in, blue beam hurt it but it healed. Kept shooting until the laser was "very warm", then chucked it into the void and the microbe dove after it. Walked out: the main booth "malfunctioned", so I came out in an Auxiliary Booth (+4, score 75). Lost the laser for good, but I'm alive.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 76 | 682-697 | Lab Office -> Cryo-Elevator | Trapped behind the Bio Lab; desk had a gas mask, red "Emergency System" button filled the lab with mist that stunned the mutants; then a PA announcement "Cryo-chamber access from Project Control Office now open" and a full-on chase scene, mutants nipping at my heels room by room, to the mural (now slid away) and the cryo-elevator door closing JUST in time. +5 | Best sequence in the game. Actual adrenaline from a text game. The chase messages every room ("right on your heels!") were perfect | nice | - |

**Turns 682-697.** Out of the auxiliary booth into a Lab Office - the only exit is through the Bio Lab. Found a gas mask in the desk, wore it, hit the red "Eemurjensee Sistum" button: hissing mist. Opened the door: four mutants (rat-ant thing, axe-wielding humanoid, fanged lurker, walking man-eating plant) all stunned. The PA: "Revival procedure beginning. Cryo-chamber access from Project Control Office now open." Then I RAN: Bio Lock, Main Lab, Computer Room (its red light is dark now - computer fixed!), ProjCon Office where the mural had slid away to reveal an elevator, pushed its one button, door closed just as the monsters reached it. +5, score 80. Going down.

| # | turn | where | what happened | why it hurt or helped | Kind | Severity |
|---|------|-------|---------------|-----------------------|------|----------|
| 77 | 701 | Cryo-Anteroom | THE ENDING: Veldina, leader of Resida, wakes up; the cure is found; the Stellar Patrol ship Flathead beams down; I'm promoted to Lieutenant First Class; Blather is demoted to my personal toilet attendant; I get the antidote... and FLOYD COMES BACK, repaired: "Floyd feeling better now!" with a helicopter key, a reactor elevator card and a paddleball set, "Maybe we can use them in the sequel..." | I actually cheered. Floyd living made the whole sad bit worth it, and the Blather payoff is perfect. 80 of 80, "Galactic Overlord". | nice | - |
| 78 | 701 | Cryo-Anteroom | The game just... ended when I walked in, while I was still holding open threads (helicopter, Transportation Supply in the dark, the radiation lab, the dark reactor stairs, the Spam tin) | Not a complaint, just a note: a lot of stuff I'd been worrying about turned out to be optional or for "the sequel". The Floyd line even jokes about it | other | low |

**Turns 698-701. I WON.** The cryo-elevator opened onto a chilly anteroom looking out over chambers of thousands of cryo-units. A medical robot revived Veldina, the red-haired leader of Resida: the cure worked, the systems are repaired, and a Stellar Patrol ship (the Flathead) is in orbit. They beamed down with Blather, who got demoted to Ensign Twelfth Class and assigned as my personal toilet attendant (LOL, full circle from the scrub brush). Promoted to Lieutenant First Class, offered leadership of the planet, got the antidote. And then the robot techs part and FLOYD bounds in, fixed: "Floyd feeling better now!" He hands me a helicopter key, a reactor elevator card and a paddleball set: "Maybe we can use them in the sequel..." Final score 80 out of 80, rank Galactic Overlord, day 3, turn 701.

Honestly? For someone who'd never finished a text adventure, that was great. The moments that'll stick: the escape pod, the shuttle drive, Floyd tickled into giving me a card, the Bio Lab sacrifice, and that chase to the elevator. The worst parts were the carry limit (constant item juggling, and I left the laser behind right before I needed it) and the one 3-hour hallway before I found the teleporters.

### Leg 2 handoff

- **Why I stopped:** I WON THE GAME. Walked into the Cryo-Anteroom and the ending played. The game says "GAME WON" and offers only the final score or starting again. About 480 commands used this leg.
- **Game turn:** 701 (well under the 2000 cap). **Score:** 80 of 80, rank "Galactic Overlord". **Time/day:** Day 3 (Septem 8, 11344), afternoon, clock 4964.
- **Location:** Cryo-Anteroom (bottom of the cryo-elevator behind the ProjCon Office mural, Lawanda complex).
- **Inventory at the end:** chronometer (worn), Patrol uniform (worn; pocket: kitchen card, upper elevator card, shuttle card), gas mask (worn), canteen (empty, open), miniaturization access card, teleportation access card. (Laser thrown into the void inside the computer with the microbe; ID card dropped in Lab Storage; pliers, lower elevator card, survival kit, towel, box of fuses in the Kalamontee Tool Room.)
- **Saves:** last save at the Lab Office (turn 682, score 75), just after the auxiliary booth and before the gas mask / Bio Lab escape. A restore would land there.
- **Health:** fine - got the antidote in the ending. Floyd: alive again (repaired in the ending).
- **Map additions this leg:**
  - Kalamontee: Admin Corridor (ladder across the rift) -> Admin Corridor North: W Small Office (desk: kitchen + upper elevator cards) -> W Large Office (desk: shuttle card); N Transportation Supply (PITCH DARK, never explored); E Plan Room (maps). Upper Elevator -> Tower Core: NE Comm Room, SW Observation Deck, up Helipad (rusty helicopter, locked panel needs an orange key). Mess Hall S door (kitchen card) -> Kitchen (protein dispenser; put canteen in niche, push button). Rec Area N door (dial 477) -> Conference Room -> N Booth 1 (teleporter).
  - Teleporters: Booth 1 (Conference Room) beige=2 tan=3; Booth 2 (Elevator Lobby E) brown=1 tan=3; Booth 3 (Library Lobby E) brown=1 beige=2. Slide the teleport card first.
  - Lawanda (shuttle from Kalamontee Platform, east cabin; brake when "approaching a brightly-lit area"): Lawanda Platform -> E escalator -> Fork: NE Systems Corridor West (NW Infirmary - DON'T get in the bed, it kills you; N/down Repair Room with Floyd-sized doorway), E Systems Corridor (N Planetary Defense), E Systems Corridor East (N Course Control, E Physical Plant, S Library Lobby: W/up Library with microfilm reader, E Booth 3, S Project Corridor East). Project Corridor East: E Main Lab (S Lab Storage, NE Radiation Lock -> Radiation Lab needs suits, never entered; SE Bio Lock -> Bio Lab), S Computer Room (S Miniaturization Booth, W ProjCon Office with the mural/cryo-elevator), W Project Corridor -> Project Corridor West (W SanFac F, NW Fork).
- **Puzzles solved this leg:** ladder over the rift; three cards from the office desks; kitchen door + protein canteen; upper elevator; comm room coolant (brown then yellow from the Machine Shop dispenser into the funnel); shuttle drive; infirmary medicine; library spools (disease symptoms, helicopter manual); lab uniform (teleport card + combination 477); Course Control (pliers pull the fused bedistor, good bedistor in); Floyd fetches the shiny fromitz board from the Repair Room; Planetary Defense (pull the one board that doesn't shock you, shiny board in); Floyd gets the miniaturization card from the Bio Lab (he dies... then comes back in the ending); Miniaturization booth 958; laser setting 1 (red) through the red relay to vaporize the speck; microbe: shoot it (blue) until the laser is "very warm", then throw the laser off the strip; auxiliary booth -> Lab Office gas mask + red emergency button -> run through the Bio Lab to the ProjCon cryo-elevator.
- **Open puzzles (left untouched, apparently optional):** Transportation Supply (dark), helicopter (orange key / access card), radiation lab, reactor elevator and the dark reactor stairs, the Spam tin, the megafuses.
- **Theories:** those loose ends are "for the sequel", per Floyd.
- **Next steps:** none needed; the game is won. A later leg could restart to go after the optional stuff, or start again with --new.
