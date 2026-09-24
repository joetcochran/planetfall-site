# Round 7: click-7-late, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 7, 11 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the Tower Core checkpoint (turn 107, score 21)
- **Result:** Did not win. Where play ended: Reactor Access Stairs, turn 271, with 35 points.
- **Commands:** 313, with 2 deaths

**About the numbers.** Both deaths ended the game: restore after death did not work on that build, so each was a restart from the checkpoint (diary line 118).

The diary below is `playtests/2026-09-11/2026-09-11-click-7-late.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest from a checkpoint: session `click-7-late`
**Who:** Claude (Opus 5), blind mouse-only playtester, never seen the game  **Date:** 2026-09-11  **Session:** `click-7-late` (`node scripts/playtest.mjs --session click-7-late --new --checkpoint tower-core --click`)

### Briefing
I am an Ensign Seventh Class whose ship blew up this morning; I have crossed a rift with a ladder, found three access cards, and just rode the upper elevator to the Tower Core. It is night, I have eaten, and I have left my survival kit and extra gear in Storage West; soon I need to fetch the kit and find a bunk off the Rec Corridor. The briefing was clear and gave me an obvious short-term plan (look around the tower, then go back down and sleep), though "soon" for sleep is vague.

### Attempt 1, turns 107-121: touring the top of the tower
The briefing said "see what the elevator has brought you up to", so I did a lap of the Tower Core before anything else. Northeast was a Comm Room with two consoles written in a phonetic spelling I had to sound out. Reading the screen ("Tuu enee ship uv xe Sekund Galaktik Yuunyun: Planitwiid plaag haz struk entiir popyuulaashun...") told me this planet sent out a plague distress call. Pushing "Mesij Plaabak" played back the Feinstein's last transmission, cut off by the explosion: a nice, grim beat. The send console has a flashing "Malfunkshun in Sendeeng Kuulint Sistum", a funnel-shaped "Kuulint Sistum Manyuuwul Oovuriid" hole ("Anything poured into it would run down into the machinery below") and an enunciator panel with seven coloured lights, green flashing. My guess: pour some green coolant into the funnel. I remember a glass flask in the Tool Room, so that is a lead.

Southwest was an Observation Deck (I am on an island; another island 20 km east). Up was a Helipad with a rusted helicopter; inside, the control panel is "closed and locked". The key in my pocket offers only "examine, drop" there, so I take that as the game saying the key does not fit, which is useful if a little ambiguous (would it just not offer "unlock" anyway?).

### Attempt 1, turns 122-143: back down, a teleport booth, and a box of spares
Riding down, "push down button" first gave "Nothing happens. The slot beside the buttons stays dark." That told me exactly what to do: slide the upper elevator card again ("Elevator enabled."), push down, then a handy "15 wait for the elevator (new)" option appeared and took me to the bottom. Good design; the (new) marker drew my eye to it.

In the Elevator Lobby there is a closed red door to the south with a red button, and east a phone-booth-sized "Booth 2" with a brown "1" and tan "3" button and a card slot. Pushing tan: "Teleportaashun buux not aktivaatid." My shuttle card: "Inkorekt awtharazaashun kard...akses deeniid." So I need a teleportation card from somewhere. Noted.

Heading for the Tool Room's flask (my coolant idea), I opened unvisited doors in the Mech wing. Storage East had an oil can and a cardboard box with a cracked fromitz board, B- and K-series megafuses and a ninety-ohm bedistor. Electronics spares: someone will want these, so I took the box and the can. Physical Plant was scenery. Mech Corridor east led to Reactor Control: a metal reactor elevator door with a button and a dark stairway down. I saved here before poking at anything, since it is night and I have no idea how long I have before exhaustion.

### Attempt 1, turns 144-166: coolant in a flask, and a robot friend
Reactor Control: "read diagram" earned a joke about ninth-order molecular physics. The button opened a Reactor Elevator, but pushing down there gave the same dark-slot message and my shuttle card was refused, so another card is needed for that too. Two card-locked doors now (booth, reactor).

In the Tool Room I took the flask; "take laser" answered "Your load is too heavy. Dropping the cardboard box would make enough room." I love that: it tells me what to drop instead of making me guess. I left the laser for now. Next door, the Machine Shop has a chemical dispenser: four KUULINTS buttons (red, blue, green, yellow), three KATALISTS (gray, brown, black), BAAS and ASID. The colours match the enunciator panel upstairs exactly. The moment I walked in carrying the flask, "121 put under spout (new)" appeared on the flask's line: the interface practically solved the step for me, which felt good rather than patronising because I had already worked out why. Green button: "The flask fills with some green chemical fluid. The fluid gradually turns milky white." The colour change worries me slightly; I will find out upstairs.

One small stumble: after taking the flask, I typed its old room number 11 to examine it, got "That is not one of the options on screen", and had to reprint the list to find it had become carried item 120. Understandable, but a trap.

East of there, the Robot Shop has one intact robot. "turn on" gave +2 and, after a wait, "Hi! I'm B-19-7, but to everyperson I'm called Floyd... Let's play Hider-and-Seeker you with me." Delightful. A "sleep" button appeared in the button row at the same time as the message "You begin to feel weary", which is a clean nudge.

### Attempt 1, turns 167-182: supper, bed, and a spilled flask
Weary, I weighed carrying the coolant back up the tower (about a dozen moves each way) against getting to bed. The west corridor from Corridor Junction turned out to be a very long walk ("You walk down the long, featureless hallway for a long time"), which made me glad I had not tried both. Floyd caught up with me: "Floyd here now!" In Mess Corridor the game told me "You're now really ravenous and your lips are quite parched" and, helpfully, "There is still goo in the survival kit you left in Storage West." That reminder is exactly the kind of memory aid a returning player needs.

In Storage West the goo blobs only offered "examine" while they sat in the kit; I had to take the kit first. "take survival kit" said "Dropping the brochure would make enough room", but I preferred to drop the cardboard box of spares (via "113 drop"), which worked. Once carried, the blobs showed "eat". I ate the brown one ("delicious Nebulan fungus pudding"). In Dorm D the sleep button now read "sleep (very tired)", a lovely touch. I saved, got in the bed, pressed sleep ("You'll probably be asleep before you know it"), waited, and got a dream about Blather and the brush.

The wake-up had a sting: "While you slept, the things you were carrying slipped to the floor beside you. The fluid in the flask spilled out and evaporated." My coolant is gone. Fair enough, and it is explicit, but a player who went to bed with something fragile gets no warning beforehand; I will have to refill at the Machine Shop. Now it is morning, Septem 7.

### Attempt 1, turns 183-209: a canteen, the kitchen, and a combination lock
"take all" scooped up everything I had dropped in my sleep in one turn, listing each item: a relief after the spill. SanFac D was flavour ("how little the millenia ... have changed toilet bowl design").

The Mess Hall south of Mess Corridor had an octagonal canteen on a bench and a card slot by a closed door; the kitchen card opened it (+4). The kitchen dispenser, "Hii Prooteen Likwid Dispensur", has "an octagonal niche beneath a spout". The octagon made the link obvious. The dispenser's "put in…" list offered the canteen by name ("15 canteen"), and after I opened the canteen and pushed the button, "The canteen fills almost to the brim with a brown liquid." I closed and took it. So now I have drink/food for later. It was satisfying, though I noticed the flask offered no "put under spout" here as it did at the chemical dispenser, which quietly told me the niche was for the canteen.

West along the Rec Corridor: Dorms A and B (identical bunk rooms), and a Rec Area with games, tapes and a door north "closed and locked" by a combination dial (0 to 1000). I have no number. The brochure turned out to be a joke ad for the game itself. Floyd chatters constantly ("tells you the latest rumors about Dr. Fizpick"), which is charming but pads every reply.

### Attempt 1, turns 210-236: the long haul to the funnel
Back east through Dorm C (another bunk room) and the long hallway to the Mech wing. At the Machine Shop I refilled the flask with green (again "gradually turns milky white"). The flask's list offered "33 close"; I tried it hoping to avoid another spill and got "There's no way to close it." A listed action that can never work is a small lie from the interface.

Then the trek: four norths, east, north into the elevator, swipe, up, "wait for the elevator", out, northeast. About 16 turns from the Machine Shop to the Comm Room, all by typing single numbers, which is fast for me but would be a lot of clicking. In the Comm Room the carried fluid line had "142 pour into funnel-shaped hole (new)". I poured: "The lights on the enunciator panel blink rapidly and all go off except one, a brown light." No points, no message on the screen. So this is a sequence: brown is KATALIST 2 in the Machine Shop. That means another full round trip, and there may be more colours after that. I saved here.

### Attempt 1, turns 237-245: sudden death in Mech Corridor North
I retraced the route at speed: southwest, north into the elevator, swipe, down, wait, out, west to Corridor Junction, south... and the game ended: "YOU HAVE DIED" in Mech Corridor North at turn 245, morning, score 27. To be honest, I was skimming only the first line or two of each reply to go fast, so I did not read the death text or any warning that may have come before it. That is my fault as a player, but it also exposes something real: warnings that arrive as ">>" lines tacked below the room text are easy to miss when you are clicking quickly through a known route, and I have no idea what killed me. Hunger seems most likely (I was "ravenous" at turn 172 and ate only once; I had a full canteen and a blob of green goo on me and never touched them), but I cannot be sure.

After death, the tool refused everything, including "restore", even though I had saved in the Comm Room at turn 236: "The game is over. Start again with --new." So my save was worthless and I lose Floyd, the canteen and the first coolant step. Restarting from the checkpoint as attempt 2, and this time I will read every line.

### Attempt 2, turns 107-148: replaying the route with purpose
Restarted from the checkpoint. This time I read every line of every reply. Knowledge from attempt 1 made this fast: down the elevator (the re-swipe is still needed each ride), and on the way I pushed the red button in the Elevator Lobby, which I had skipped before: "The red door begins vibrating a bit", and a few turns later "The door at the south end of the room slides open." That is a Lower Elevator, and it too wants a card none of mine fit. So there are three card-locked machines: the teleport booth, the reactor elevator and the lower elevator.

Without the box of spares I could carry both the flask and the laser. Flask under the spout, green, back up past the Robot Shop to switch Floyd on (+2). Floyd caught up in the Elevator Lobby ("You turn Floyd on? Be Floyd's friend, yes?"). The printed phrases work as answers ("put under spout", "push green button"), which let me move faster without memorising room-specific numbers. Poured into the funnel at turn 148: brown light again, as in attempt 1. Saved.

### Attempt 2, turns 149-194: message sent, and a race to supper and bed
Reading everything this time, I saw what I had missed before: hunger and tiredness escalate in clear steps. "A growl from your stomach warns that you're getting pretty hungry and thirsty" (turn 150), "You begin to feel weary" (156), "really ravenous" (174), "You're really tired now" (180), "starting to feel faint from lack of food and liquid" (182), "If you don't get some sleep soon you'll probably drop" and "If you don't eat or drink something in a few millichrons, you'll probably pass out" (185). Each hunger warning repeated "There is still goo in the survival kit you left in Storage West", which is a great memory aid. So in attempt 1 I almost certainly starved: those same lines had scrolled past while I skimmed.

I gambled on one more coolant trip before eating. Saved in the Machine Shop, filled brown (KATALIST 2), hauled it up and poured: "The lights on the enunciator panel blink rapidly and then go dark. The coolant system warning light goes off, and another flashes, indicating that the help message is now being sent." +6, score 29. Very satisfying, and the colour clue across two rooms is a good puzzle.

Then the sprint west: elevator down (with "innocuous Hawaiian music" oozing from the intercom, ha), the long hallway, Storage West. The kit was on the floor again, so I took it and ate the brown goo at turn 189 with "You can barely keep your eyes open." Walking into Dorm D, "You climb into one of the bunk beds and immediately fall asleep." Automatic, no button needed. My next queued answer, "get in bed", was then rejected ("Get in is not in the menu for bed") because I was already in it: harmless. Woke on Septem 7 with everything on the floor again; "take all" fixed it. Saved.

### Attempt 2, turns 195-224: breakfast, and the first symptom
Day two. I went straight for the canteen and the kitchen (+4 again), filled the canteen, and while opening it saw: "You notice that you feel a bit weak and slightly flushed, but you're not sure why." "diagnose" confirmed "You are a bit sick and feverish." Given the plague message on the Comm Room screen, I am now infected, and the clock is running. That raised the stakes nicely. "take canteen" asked me to drop the flask to make room, which I happily did since the coolant job is done.

I tried Floyd's "ask about…": the topic list is only the things in view and in my pockets (Floyd, yourself, cards, laser, dispenser...). There is no way to ask about the plague, the sickness, the combination door or the missing cards, which were the things I actually wanted to ask. "ask Floyd about Floyd" gives a cute line ("Also fixing things. Mostly Hider-and-Seeker.").

A hitch: I typed Floyd's ask number from attempt 1 (132) and got the survival kit's action list instead, because in this attempt the numbers were handed out in a different order. Harmless, but "a number keeps its meaning for the rest of the game" does not hold across restarts.

Rec Area: "play games" with Floyd is a fun throwaway; no combination clue. Walking east, the next hunger pang came with "The goo in your survival kit would take care of both" (the reminder adapts to where the food is). I opened the canteen, a new "drink" option appeared on the "protein-rich liquid", and it "quenched your thirst and satisfied your hunger." Admin Corridor South's east door is just SanFac E.

### Attempt 2, turns 225-252: the Admin wing, a dark doorway and a blue beam
West off the rifted Admin Corridor is "Sistumz Moniturz": KUMUUNIKAASHUNZ now reads green (my repair shows up here, nice confirmation), along with LIIBREREE, REEAKTURZ and LIIF SUPORT, while PLANATEREE DEFENS, PLANATEREE KORS KUNTROOL and PRAJEKT KUNTROOL are malfunctioning. That reads like a to-do list, and my box of spares (fuses, a bedistor, a cracked fromitz board) now looks meant for one of them.

Across the ladder: "Tranzportaashun Suplii" to the north is "pitch black. You might be eaten by a grue," so I backed out at once. Oddly, the exit list there still showed north, east and west as if I could see them. The Plan Room has two maps, "Kalamontee Kompleks" (here, two installations and a long hallway) and "Lawanda Kompleks" (one installation deep underground), but "examine maps" just says "Examining the maps reveals no new information," which is a pity when the room description made them sound like the main feature. Both office desks are now empty. Floyd wandered off ("Floyd going exploring. See you later.") and came back later.

I trekked to the castle to check the one unexplored corner I could think of: the West Wing, all rubble and view. Nothing. Firing the laser there for lack of ideas gave "The laser emits a narrow blue beam of light" and +2 points, which surprised me. I don't yet know what to aim it at.

Open threads: a light source for the dark rooms (Transportation Supply, the stairway below Reactor Control), a combination for the Rec Area door, cards for the teleport booth and the two elevators, and, above all, a cure for the fever.

### Attempt 2, turns 253-271: castle corners, and a grue
With no light, no combination and no new card, I went looking for anything I had missed. The Balcony plaque ("SEENIK VISTA ... Kalamontee Valee") was scenery, and I noticed "The crag where you landed yesterday is now underwater!", a nice sign of time passing. "talk to Floyd" only gets "Hi!" Physical Plant's catwalk and equipment gave nothing.

The only unexplored exit left on my side was the "dark stairway" below Reactor Control. I saved first, went down one flight ("It is pitch black. You might be eaten by a grue."), and, since the exit list offered "2 go down" like any other exit, I clicked it. "Oh, no! Something (a grue?) slithered into the room and devoured you!" Dead at turn 271, score 35. As in attempt 1, "restore" (and the Restore button's number) is refused after death: "The game is over. Start again with --new." My save from one turn earlier is unreachable.

Across both attempts I have now played about 300 turns, over the 250-turn budget, so I am stopping here rather than starting attempt 3.

### Friction log
| Turn | Where | What happened | Kind |
|---|---|---|---|
| 108 | Comm Room | Phonetic-spelled consoles are fun to decode; "read screen" and "push glowing button" both on the list, good story payoff | Positive |
| 112 | Comm Room | "examine funnel-shaped hole" spells out that anything poured runs into the machinery: a clear hint | Positive |
| 114 | Comm Room | "examine communication send console" gives "I see nothing special" although the room description is rich about it | Unhelpful response |
| 121 | Helicopter | Locked control panel; the key's menu shows only "examine, drop", so I can't tell whether the key is wrong or unlock just isn't offered | Confusing |
| 125 | Upper Elevator | "Nothing happens. The slot beside the buttons stays dark." tells me precisely to re-swipe the card | Positive |
| 127 | Upper Elevator | "wait for the elevator (new)" appears while moving; the (new) tag is effective | Positive |
| 133 | Booth 2 | Card rejections are in-world and specific ("Inkorekt awtharazaashun kard") so I know it's the wrong card, not the wrong action | Positive |
| 141 | Physical Plant | After taking the box, the carried list grows by five lines (each fuse/board listed separately); the Carried block is getting long | List too long |
| 156 | Tool Room | "take laser": load too heavy, "Dropping the cardboard box would make enough room" names the fix | Positive |
| 157 | Tool Room | Typed the flask's old room number (11) after taking it; it had moved to carried slot 120, "That is not one of the options on screen" | Confusing |
| 159 | Machine Shop | "put under spout (new)" appears on the carried flask as soon as I enter; context options are excellent | Positive |
| 163 | Robot Shop | Weariness warning coincides with a new "sleep" button, so I know sleeping is possible, though not whether here is "safe" | Positive |
| 166 | Robot Shop | Floyd waking up is a great moment; he gets a full action row (talk to, ask about, salute...) | Positive |
| 172 | Mess Corridor | Hunger message plus "There is still goo in the survival kit you left in Storage West" is a perfect reminder | Positive |
| 173 | Storage West | Goo blobs inside the kit on the floor offer only "examine"; "eat" only appears once the kit is carried | Action not on list |
| 173 | Storage West | Load-too-heavy suggests dropping the brochure; I wanted to drop the box and had to find its "…" menu | Positive |
| 179 | Dorm D | "sleep (very tired)" label on the button shows urgency without a status screen | Positive |
| 182 | Dorm D | Sleeping dumps everything on the floor and spills the flask's coolant with no prior warning | Silent state change |
| 184 | Dorm D | "take all" after waking lists every item "Taken." in one turn | Positive |
| 194 | Kitchen | Dispenser "put in…" lists my carried items by name; "15 canteen" worked first try | Positive |
| 206 | Rec Area | Locked door with a 0-1000 combination dial and no clue yet; "set to a number <value>" form is clear | Puzzle (stuck) |
| 207 | Rec Area | Floyd's ambient chatter is appended to almost every turn, pushing the real result into a crowd | Pacing |
| 222 | Machine Shop | Flask lists "close" but "There's no way to close it." | Dead option |
| 235 | Comm Room | "pour into funnel-shaped hole (new)" appears on the fluid when I arrive with it | Positive |
| 236 | Comm Room | Correct pour gives no score and just changes the light to brown: a multi-step chemistry run with a 16-turn round trip each way | Pacing |
| 245 | Mech Corridor North | Died while walking a known route; the cause (and any warning) scrolled by in ">>" lines I was not reading | Confusing |
| 245 | Mech Corridor North | After death, "restore" is refused ("The game is over. Start again with --new.") despite a save at turn 236 | Dead option |
| 114 | Elevator Lobby | Red button: door vibrates, opens a few turns later on its own with a ">>" line; reveals Lower Elevator (card-locked) | Positive |
| 131 | Machine Shop | Printed phrases like "put under spout" work as answers; faster than hunting numbers that differ between attempts | Positive |
| 147 | Comm Room | Carried-item option numbers differ between attempts (pour was 142, now 131) because numbers are assigned in pickup order | Confusing |
| 150-185 | Tower to Dorm Corridor | Hunger and sleep warnings escalate in clear, well-worded steps with a reminder of where the food is | Positive |
| 176 | Comm Room | Coolant fixed: clear success text, +6; two-room colour puzzle feels fair | Positive |
| 180 | Upper Elevator | "Some innocuous Hawaiian music oozes from the elevator's intercom" | Positive |
| 192 | Dorm D | Very tired: walking into the dorm auto-beds and sleeps you; nice mercy | Positive |
| 185 | Dorm Corridor | Warnings arrive stacked with Floyd chatter in the same ">>" style, so life-or-death lines look like flavour | Confusing |
| 201 | Kitchen | Plague symptom arrives as a ">>" aside ("feel a bit weak and slightly flushed"); diagnose confirms it | Positive |
| 207 | Kitchen | Floyd's "ask about…" topics are only visible objects; can't ask about the plague, the lock or cards | Action not on list |
| 207 | Kitchen | Old attempt's number (132) now means a different item after a restart | Confusing |
| 219 | Dorm Corridor | Hunger reminder adapts: "The goo in your survival kit would take care of both" | Positive |
| 223 | Admin Corridor South | Opening the canteen exposes a "drink" option on the liquid; two-step but discoverable | Positive |
| 227 | Systems Monitors | Monitor wall doubles as a progress board (communications now green) | Positive |
| 230 | Transportation Supply | Dark room still lists exits north/east/west as if visible; tempting a grue death | Confusing |
| 233 | Plan Room | "examine maps" gives "reveals no new information" though the maps are the room's showpiece | Unhelpful response |
| 252 | West Wing | Firing the laser at nothing scores +2 with no hint why | Confusing |
| 256 | Balcony | "The crag where you landed yesterday is now underwater!": time visibly changes the world | Positive |
| 257 | Balcony | "talk to Floyd" only returns "Hi!" | Unhelpful response |
| 271 | Reactor Access Stairs | Dark room offers "go down" as a normal exit; one click is instant death by grue, no extra warning | Confusing |
| 271 | Reactor Access Stairs | Second death; restore refused again despite a save one turn earlier | Dead option |

### Report
I played two attempts from the Tower Core checkpoint, about 300 turns in all. Attempt 1 (turns 107-245) toured the tower, found the Comm Room coolant puzzle, the chemical dispenser, Floyd (+2), the kitchen (+4), slept through the first night and reached 27 points before starving to death on day 2 because I skimmed past the hunger warnings. Attempt 2 (turns 107-271) replayed that efficiently, finished the coolant puzzle (green then brown, +6, "the help message is now being sent"), switched Floyd on, ate and slept, got breakfast from the kitchen (+4), caught the plague fever, explored the Admin wing (Systems Monitors, Plan Room, the dark Transportation Supply, empty offices), the castle's West Wing and Balcony, fired the laser (+2), and died to a grue on the Reactor Access Stairs at turn 271 with 35 points. Furthest point: Reactor Access Stairs below Reactor Control, day 2 morning, score 35. Unsolved when I stopped: a light source, the Rec Area combination, cards for the teleport booth and both elevators, and the fever.

The click interface mostly works very well. Context options appear exactly when they make sense ("put under spout (new)", "pour into funnel-shaped hole (new)", "wait for the elevator (new)", "drink" on the opened canteen), the sleep button labels itself "(very tired)", "take all" after sleeping gathers everything in one turn, and "load too heavy" names what to drop. Printed phrases work as answers, which made replaying a known route quick. Hunger and sleep warnings are well written and escalate in clear steps, with a reminder of where the food is. The puzzles I solved felt fair with only the options on screen.

What hurts: (1) After death, Restore is refused and the session must restart from the checkpoint, so both my saves were useless and each death cost well over 100 turns. (2) Life-or-death ">>" messages look exactly like Floyd's constant chatter, so on a fast route they are easy to miss. That is how I starved. (3) Dark rooms list their exits like any other room, and clicking one is an instant grue death with no confirmation; a mouse player clicks whatever is listed. Smaller issues: the coolant puzzle needs about 16 turns per round trip, and sleeping silently spills a filled flask; Floyd's "ask about…" topics are limited to objects in view, so I could not ask about the plague, the lock or the cards; "close" is offered on a flask that cannot be closed; option numbers differ between attempts; and "examine maps" in the Plan Room gives nothing.

The briefing was enough to pick up the thread: it told me where I was, what I carried, where my kit and the dorms were, and what I meant to do next. It did not mention food timing (when I would next be hungry), and I wish it had listed the obvious open threads from before, such as unexplored exits or known locked doors.

The three changes I would make first: let Restore work from the death screen (or offer "restore your last save?" right there); set danger messages (hunger, sleep, disease, darkness) visually apart from companion chatter, for example a warning colour or a pinned status line; and in dark rooms, either hide exits other than the way back or put a "(dark: dangerous)" tag on them.

### Verdict
A strong click adaptation: its context-sensitive options turned multi-room chemistry and survival chores into satisfying, fair puzzles, and Floyd is charming. What undermines it is punishment, not puzzles: urgent warnings that blend into chatter, dark exits you can click to your death, and deaths that ignore your saves. Fixing those three would make the late game far less frustrating.
