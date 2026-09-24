# Round 1: typed-1, typed

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 1, 10 September 2026
- **Mode:** typed: commands typed into the parser
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Rec Area, turn 245, with 10 points.
- **Commands:** 300, with 2 deaths

**About the numbers.** Three games: two deaths on the Feinstein (attacked Blather; missed the pod), then a third game to turn 245.

The diary below is `playtests/2026-09-10/2026-09-10-typed.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind playtest diary — 2026-09-10 (session typed-1, seed 7)

I have never seen this game. I'm playing it as a black box: only the command line, one command per call, and this diary.

### Attempt 1, command 0: the opening

The game opens with me as an "Ensign Seventh Class" aboard the "Stellar Patrol Ship Feinstein", scrubbing a metal deck on Level Nine with a "Patrol-issue self-contained multi-purpose all-weather scrub brush". There's a menacing "Ensign First Class Blather" who could appear at any moment. Tone is comic-bureaucratic, which I like.

Room: **Deck Nine** — "a featureless corridor similar to every other corridor on the ship. It curves away to starboard, and a gangway leads up. To port is the entrance to one of the ship's primary escape pods. The pod bulkhead is closed."

Status line: `Deck Nine · turn 0 · time 4453 · score 0`. Time is a four-digit number (4453), so presumably some kind of ship-clock. No idea yet whether the "day" matters.

Immediate thoughts: nautical directions (port/starboard) instead of compass ones — I'll need to find out whether the parser accepts "port"/"starboard" or wants north/south. The closed escape pod bulkhead is obviously a Chekhov's gun. My plan: look, take inventory, examine the brush, try the bulkhead, then wander.

### Attempt 1, commands 1-7: taking stock, and meeting Blather

`inventory` — I carry the brush, a chronometer (worn), and a Patrol uniform (worn) containing an ID card. Nested container display is nice and clear.

`examine chronometer` — "the current time is 4471", plus an engraving: "Good luck in the Patrol! Love, Mom and Dad." Sweet. I notice the clock jumps by uneven amounts per turn (4453 → 4471 → 4478 → 4496 → 4528…), so some actions cost more time than others, or the numbers are ship-time not turns.

`read id card` — "STELLAR PATROL| Special Assignment Task Force| ID Number: 6172-531-541". The pipe characters look like line breaks that didn't get rendered; minor presentation glitch. "Special Assignment Task Force" for a deck scrubber is a joke I appreciate.

`examine brush` — "I see nothing special about the Patrol-issue self-contained multi-purpose scrub brush." Fine, but then: **Blather swaggers in**, sneers at my polishing, threatens me with the toilet-scrubbing division, and awards "Thirty demerits." The event is prefixed with `>>`, which is a nice way of separating timed events from my command's reply.

`scrub floor` — "The floor is a bit shinier now." I expected Blather to react; he didn't. Slightly flat, but I'm pleased the verb worked at all.

`examine blather` — great description ("the crease in his trousers could probably slice diamonds in half").

`salute blather` — "Blather's sneer softens a bit. 'First right thing you've done today. Only five demerits.'" Delightful — the game rewarded an in-character guess I wasn't sure it would understand. Demerits seem to be flavour, not score.

Next: I have not yet touched the escape pod. Examine the bulkhead, try to open it, then head starboard/up.

### Attempt 1, commands 8-12: the bulkhead won't open, and Blather won't let me pass

`examine bulkhead` — "The escape pod bulkhead is closed." Blather then "adding fifty more demerits for good measure, moves off". Running demerit tally is a nice comic beat.

`open bulkhead` — "Why open the door to the emergency escape pod if there's no emergency?" This is a clear, funny refusal that also tells me what to wait for: an emergency. Filed away.

`starboard` — worked as a direction (good). New room, **Reactor Lobby**: Ion Reactor to starboard, Auxiliary Control Room aft, corridor continues to port. Blather immediately reappears and orders me back: "Forty if you're not back on Deck Nine in five seconds!"

`starboard` again — "Ensign Blather blocks your way, snarling angrily." Turn counter did NOT advance (still turn 10), so being blocked is free. `aft` — "Ensign Blather pushes you roughly back toward your post." Also free. So Blather is a soft gate: I cannot explore past the lobby while he's around. Mildly frustrating, but it makes sense in-fiction, and I suspect the emergency will resolve it.

`port` — back to Deck Nine; the room name printed but not the description (brief mode on revisit — fine). Blather's *exact same* arrival speech played again word-for-word ("You call this polishing…Thirty demerits"), even though he had just followed me around. That repetition slightly broke the illusion.

`up` — **Gangway**, "connecting Deck Eight, above, and Deck Nine, below." And then: "You hear a distant bellowing ... something about an Ensign Seventh Class whose life is in danger." Ha. Blather did not block the gangway, which is odd given he blocked every other exit. Going up.

### Attempt 1, commands 13-18: Deck Eight, and a fatal experiment

`up` — **Deck Eight**: corridor port/starboard, gangway down, "to fore is the Hyperspatial Jump Machinery Room." Blather arrives *again* with his exact same "Twenty demerits… Forty if you're not back on Deck Nine in five seconds!" speech. Third time I've heard this paragraph verbatim.

`fore` — "Blather blocks your path, growling about extra galley duty." (turn didn't advance). So he follows me everywhere and blocks every exit except back the way I came. At this point I'm basically on rails until whatever the emergency is happens.

`wait` — "Time passes..." then Blather: "I said to return to your post, Ensign Seventh Class!" ... "turning a deepening shade of crimson." Nice escalation; I wondered if he'd eventually do something.

`hit blather with brush` — **"You can't see any blather brush here!"** This is a parser bug: it swallowed "blather with brush" into a single noun phrase "blather brush". I expected either a fight or a "violence isn't the answer" refusal. Confusing for a moment because it implied the words didn't exist.

`attack blather` — "!! Blather removes several of your appendages and internal organs. **** You have died ****". Well. Instant death for punching a superior officer is harsh but honestly funny, and the `!!` prefix flagged it clearly. Status line says `YOU HAVE DIED (start a new session with --new)`. Turn count did not advance for the fatal action (turn 14 → 14), which is a little odd.

**Attempt 1 ends at turn 14, time 4698, score 0, 4 rooms seen (Deck Nine, Reactor Lobby, Gangway, Deck Eight).**

Lesson: don't fight Blather. Plan for Attempt 2: stay near the pod on Deck Nine, scrub, and wait for the emergency the bulkhead message hinted at. Then take whatever I can into the pod.

### Attempt 2, commands 1-4: staying at my post

Restarted with `--new --seed 7`; identical opening text, same clock (4453).

`scrub floor` — "The floor is a bit shinier now." Same as before.

`wait` ×3 — "Time passes..." each time, clock 4500 → 4540 → 4580 (so `wait` costs 40 ticks, whereas examining costs about 7 and moving about 15-20; the clock is action-weighted, which I now find rather elegant). Blather arrived on turn 4 (time 4580) with his fixed speech — last time he came at turn 4 too (time 4528), so he's on a turn schedule, not a clock schedule, as far as I can tell.

Plan: salute him (that worked), keep scrubbing, do not attack anybody, and wait for the emergency.

### Attempt 2, commands 5-8: playing the good ensign

`salute blather` — same softened response as before ("Only five demerits"). Repeatable, so it's a canned reaction rather than a state change.

`scrub floor`, `wait`, `wait` — Blather watched me for four turns, then "adding fifty more demerits for good measure, moves off in search of more young ensigns to terrorize" at turn 8. Exactly the same turn he left on in Attempt 1. So his visit is scripted: arrives turn 4, leaves turn 8.

Nothing else has happened by time 4674. I'm now going to test whether he still blocks me once he's "moved off" — sneaking starboard toward the Ion Reactor.

### Attempt 2, commands 9-11: the explosion

`starboard` — into the Reactor Lobby again; Blather reappears instantly with the same "Twenty demerits… five seconds" paragraph. So the moment I leave Deck Nine he materialises, regardless of whether he "moved off". Fourth verbatim repeat of that speech across two attempts.

`wait` — "I said to return to your post…turning a deepening shade of crimson." `wait` again — same crimson line repeated exactly, and then:

**">> A massive explosion rocks the ship. Echoes from the explosion resound deafeningly down the halls. Blather, looking slightly disoriented, barks at you to resume your assigned duties."**

The emergency, at turn 11 / time 4769. Blather still telling me to scrub during an explosion is a good gag. The "five seconds" threat turned out to be empty — he never did anything beyond going redder — which robs the tension a little, but it means a cautious player can't accidentally die by dawdling.

Now: back to Deck Nine, open the bulkhead ("if there's no emergency" — well, now there is), get in the pod.

### Attempt 2, commands 12-13: bulkheads everywhere

`port` — Deck Nine. ">> More distant explosions! A narrow emergency bulkhead at the base of the gangway and a wider one along the corridor to starboard both crash shut!" So I'm sealed into Deck Nine with the pod. Good — the game is funnelling me exactly where I guessed.

`open bulkhead` — "Which do you mean, the escape pod bulkhead or the wide bulkhead or the narrow bulkhead?" Fair disambiguation, and it cost no turn. But note: a turn earlier the only bulkhead was the pod one, and now there are three, so my habit of typing "bulkhead" broke.

`open pod bulkhead` — **"It's already open!"** — wait, what? Nobody told me it opened. Presumably the explosion popped it, but the room text when I arrived said nothing about the pod door's state, so this reply felt like the game knew something I didn't. Then in the same turn: ">> More powerful explosions buffet the ship. The lights flicker madly, and the escape-pod bulkhead clangs shut." So it opened silently and closed loudly. Trying again.

### Attempt 2, commands 14-15: too late

`open pod bulkhead` — **"Too late. The pod's launching procedure has already begun."** Oh no. `look` — the room now says the corridor and gangway are "blocked by closed bulkheads" and "The pod bulkhead is closed", then: "!! An enormous explosion tears the walls of the ship apart. If only you had made it to an escape pod... **** You have died ****".

**Attempt 2 ends at turn 15, time 4807, score 0.**

Post-mortem on the timing, because this is the thing that bothered me most so far. Reconstructing:
- Turn 11 (in the Reactor Lobby): first explosion.
- Turn 12: I walk to Deck Nine. The `>>` event says the narrow and wide bulkheads slam shut. It says *nothing* about the pod bulkhead, and since the room was shown in brief mode I didn't get the description line either. Yet the pod door must have been open right then, because…
- Turn 12 (still, since disambiguation is free): `open pod bulkhead` → "It's already open!" and then in the same reply it "clangs shut".
- Turn 14: "Too late."

So I had a window of exactly one action to walk `port` into the pod, and the game never told me the door had opened. If I'd typed `port` instead of `open bulkhead` I'd have lived. A single line like "the escape pod bulkhead slides open" in the turn-12 event would have made this fair. As it stands, a player who does the obviously sensible thing (try to open the door they were told was closed) is punished for it.

Second lesson: I wasted turns 9-11 in the Reactor Lobby testing Blather. Had I been on Deck Nine at turn 11 I'd have seen the explosion and perhaps the door opening in full.

Plan for Attempt 3: stay on Deck Nine the whole time. Salute Blather, scrub, wait. At the first explosion, type `port` immediately, and if refused, `open pod bulkhead` then `port`.

### Attempt 3, commands 1-4: the patient ensign

Third start, same opening, same clock. This time I do nothing but stand by the pod.

`wait` ×4 — clock 4493, 4533, 4573, 4613. Blather arrives on turn 4 exactly as before, same speech. The schedule is fully deterministic (same seed, so that's expected — but the flavour text never varies either).

While he glares I'm going to try talking to him rather than saluting, to see if the parser has any conversation at all.

### Attempt 3, commands 5-7: small talk with a tyrant

`talk to blather` — "Blather shouts 'Speak when you're spoken to, Ensign Seventh Class!' He breaks three pencil points in a frenzied rush to give you more demerits." Excellent line, and it cost no turn. The game clearly has a decent set of Blather reactions; I just wish the *arrival* speech varied as much.

`give brush to blather` — "The Ensign First Class declines your offer." Terse but sensible.

`wait` ×2 — clock 4660, 4700. Counting down: Blather leaves turn 8, explosion turn 11. My finger is hovering over `port`.

### Attempt 3, commands 8-10: the door slides open

`wait` — turn 8, Blather "moves off" on cue. `wait` — turn 9, quiet. `wait` — turn 10, and two events at once: Blather swaggers back in with his fixed arrival speech, and then:

">> A massive explosion rocks the ship. Echoes from the explosion resound deafeningly down the halls. **The door to port slides open.** Blather, confused by this non-routine occurrence, orders you to continue scrubbing the floor, and then dashes off."

There it is — the line I was missing in Attempt 2. When you're *in* the room, the explosion event tells you the pod door opens. When you arrive a turn later from elsewhere, you get only the "bulkheads crash shut" message and never learn the pod is open. Two notes:
1. The explosion came at turn 10 this time, not 11. In Attempt 2 it was turn 11 while I was in the lobby. Possibly the count differs because blocked/free actions don't advance turns, or because it's clock-based (4769 vs 4820 — no, that doesn't line up either). Not sure; it didn't hurt me.
2. Blather arriving *and* the explosion in the same turn made the "swaggers in… glares at you, arms crossed" paragraph immediately contradicted by "dashes off". Comic, but a bit of a seam.

Typing `port` immediately.

### Attempt 3, commands 11-13: into the pod

`port` — **Escape Pod**. "A mass of safety webbing, large enough to hold several dozen people, fills half the pod. The controls are entirely automated. The bulkhead leading out is open." Score ticked to **3** — first points of the game, 11 turns and three lives in. Then ">> The ship shakes again. You hear, from close by, the sounds of emergency bulkheads closing." Relief.

`get in webbing` — "You are now safely cushioned within the web." The status line now reads "Escape Pod, in the safety web" — nice touch. Then ">> The pod door clangs shut as heavy explosions continue to buffet the Feinstein."

`wait` — ">> You feel the pod begin to slide down its ejection tube as explosions shake the mother ship." The controls are "entirely automated", so I'm a passenger. Waiting.

### Attempt 3, commands 14-16: the Feinstein is gone

`wait` — ">> Through the viewport of the pod you see the Feinstein dwindle as you head away. Bursts of light dot its hull. Suddenly, a huge explosion blows the Feinstein into tiny pieces, sending the escape pod tumbling away!" Blather presumably went with it. I have complicated feelings.

`wait` — the gyroscopes whine, the tumbling stops, "Lights on the control panel blink furiously as the autopilot searches for a reasonable destination."

`wait` — ">> The auxiliary rockets fire briefly, and a nearby planet swings into view through the port. It appears to be almost entirely ocean, with just a few visible islands and an unusually small polar ice cap. A moment later, the system's sun swings into view, and the viewport polarizes into a featureless black rectangle."

This is a lovely automated sequence — each `wait` gives a new paragraph, so I never feel like I'm just burning turns. The "unusually small polar ice cap" is the kind of detail that makes me think it'll matter later. Clock is 5002 now; I'm curious whether the four-digit time rolls over into a new day.

### Attempt 3, commands 17-20: a long descent

`wait` — ">> The main thrusters fire a long, gentle burst. A monotonic voice issues from the control panel. 'Approaching planet...human-habitable.'" Good news.

`wait`, `wait` — nothing. Two silent turns (clock 5082, 5122) after a run of eventful ones made me wonder if I'd missed a cue and was supposed to do something. `look` — full room description; the only change is "The bulkhead leading out is closed." No viewport description, no controls I can examine by name yet. So I'll keep waiting a little longer before I start poking at things.

Note on pacing: silent `wait` turns after an automated cutscene are the moment a new player second-guesses themselves. A "the pod continues its descent" filler line would reassure.

### Attempt 3, commands 21-23: re-entry

`wait` — ">> The pod is buffeted as it enters the planet's atmosphere." `wait` — ">> You feel the temperature begin to rise, and the pod's climate control system roars as it labors to compensate." `wait` — ">> The viewport suddenly becomes transparent again, giving you a view of endless ocean below. The lights on the control panel flash madly as the pod's computer searches for a suitable landing site. The thrusters fire long and hard, slowing the pod's descent."

Once the cutscene resumed it was very good again — the "endless ocean below" pays off the "almost entirely ocean" line from orbit. The two dead turns earlier now look like a deliberate lull rather than a bug, but I'd still add a filler line. Clock 5251; still no day rollover.

### Attempt 3, commands 24-25: planetfall

`wait` — ">> The pod is now approaching the closer of a pair of islands. It appears to be surrounded by sheer cliffs rising from the water, and is topped by a wide plateau. The plateau seems to be covered by a sprawling complex of buildings." A complex of buildings on a plateau — that's the game, presumably.

`wait` — ">> The pod lands with a thud. Through the viewport you can see a rocky cleft and some water below. The pod rocks gently back and forth as if it was precariously balanced. A previously unseen panel slides open, revealing some emergency provisions, including a survival kit and a towel."

Landed at turn 25, time 5331, score still 3. "Precariously balanced" reads as a timer to me — I should grab the kit and towel and get out fast rather than dawdle. A towel is a nice touch; I'll assume it has a use. Trying `take all` to save a turn.

### Attempt 3, commands 26-28: the pod slips

`take all` — **"You can't see any all here!"** No `all` support, and the error text treats "all" as a noun. Costs no turn, at least. Annoying in a moment the game had just told me was time-critical.

`take kit` — "You can't reach it from here." Because I'm still in the webbing — fair, though "from here" made me pause a second before I realised the web was the problem.

`get out of webbing` — "As you stand, the pod shifts slightly and you feel it falling. A moment later, the fall stops with a shock, and you see water rising past the viewport." So the "precariously balanced" line was real, and standing up triggered the drop. Water rising = a timer for certain now. Grabbing the kit first, then the towel, then out.

### Attempt 3, commands 29-30: sinking

`take towel` — "Taken." and ">> The pod is now completely submerged, and you feel it smash against underwater rocks. Bubbles streaming upward past the window indicate that the pod is continuing to sink." The tension here is well judged: each turn I spend collecting things costs me depth.

`open bulkhead` — "The bulkhead opens and cold ocean water rushes in!" Only one bulkhead in scope now, so no disambiguation prompt this time — consistent. Now `out`, and hope I can swim.

### Attempt 3, commands 31-32: out of the water

`out` — **Underwater**: "You are momentarily disoriented as you enter the turbulent waters. Currents buffet you against the sharp rocks of an underwater cliff. A dim light filters down from above." No drowning countdown mentioned, but I'm not lingering.

`up` — **Crag**, score jumps to **6**. "You have reached a cleft in the cliff wall where the island rises from the water. The edge of the cleft displays recently exposed rock where it collapsed under the weight of the escape pod… A small structure clings to the face of the cliff about eight meters above you. Even an out-of-shape Ensign Seventh Class could probably climb up to it." Love that last line — the game is talking to me in character and telling me exactly what to do without being a hint.

I'm alive, on land, with a brush, a survival kit, a towel, and a soaked uniform. Climbing.

### Attempt 3, commands 33-34: the Balcony and the plaque

`up` — **Balcony**: "an octagonal room, half carved into and half built out from the cliff wall. Through the shattered windows… ocean to the horizon. A weathered metal plaque with barely readable lettering… The language seems to be a corrupt form of Galalingua. A steep stairway, roughly cut into the face of the cliff, leads upward."

`read plaque` —
> SEENIK VISTA
> Xis stuneeng vuu uf xee Kalamontee Valee kuvurz oovur fortee skwaar miilz uf xat faamus tuurist spot. Xee larj bildeeng at xee bend in xee Gulmaan Rivur iz xee formur pravincul kapitul bildeeng.

This is the highlight of the game so far. It's a phonetic-spelling cipher I could sound out in my head: "SCENIC VISTA. This stunning view of the Kalamontee Valley covers over forty square miles of that famous tourist spot. The large building at the bend in the Gulman River is the former provincial capital building." And the joke lands hard once you decode it — the "stunning view" is now "ocean to the horizon". The valley is drowned. That connects to the "unusually small polar ice cap" from orbit: the sea has risen. I now have a story hook without a single line of exposition. Superb.

I'm now going to inventory-check the survival kit before climbing the stairway.

### Attempt 3, commands 35-37: goo

`open kit` — "Opening the survival kit reveals a blob of red goo, a blob of brown goo and a blob of green goo." Ha.

`examine red goo` — "I see nothing special about the blob of red goo." (Cost 32 ticks of clock — examining is oddly expensive sometimes? Earlier examines cost ~7. Might be a hidden event tick. Not sure.)

`eat red goo` — "Thanks, but you're not hungry." So hunger exists and will presumably arrive on a clock; the goo is rations. Good to know, and the refusal is friendly rather than a wasted blob. I'll keep the kit closed-ish and carry on.

Heading up the stairway to the plateau. Current haul: brush, kit (3 goo), towel, chronometer, uniform, ID card. Score 6, turn 37, time 5524.

### Attempt 3, commands 38-39: up to the plateau

`up` — **Winding Stair**, "The middle of a long, steep stairway carved into the face of a cliff." A connector room; fine.

`up` — **Courtyard**: "an ancient stone edifice, vaguely reminiscent of the castles you saw during your leave on Ramos Two. It has decayed to the point where it can probably be termed a ruin. Openings lead north and west, and a stairway downward is visible to the south."

Interesting: the game has silently switched from ship directions (port/starboard/fore/aft) to compass directions (north/west/south) now that I'm on land. That's the right call, and it happened without any fuss. Score still 6 — the climb itself wasn't worth points, which is fair.

Going north first, then west.

### Attempt 3, commands 40-41: into the complex

`north` — **Plain Hall**: "featureless hall leading north and south. Although the hallway is old and dusty, the construction is of a much more modern style than the castle to the south. A similar hall branches off to the northeast." So the castle is an old shell and the modern complex sits behind it. Nice layering of history in two sentences.

`north` — **Rec Area**: "Games and tapes are scattered about the room. Hallways head off to the east and south, and to the north is a door which is closed and locked. A dial on the door is currently set to 0."

A combination-dial door: first proper puzzle. I don't have the number. "Games and tapes" are scenery I want to poke at — a tape might be readable or playable somewhere. Score is stuck at 6; I'm guessing points come from finding things and solving doors rather than from walking.

### Attempt 3, commands 42-44: games, tapes, and a wide corridor

`examine games` — "All the usual games -- Chess, Cribbage, Galactic Overlord, Double Fannucci..." `examine tapes` — "…some musical selections, here are some bestselling romantic novels, here is a biography of a famous Double Fannucci champion..." Pure flavour, cheerfully written. I tried both because a dial door next to a pile of scenery smells like a hidden hint; apparently not here. Neither the games nor tapes can be taken as far as I can tell (I didn't try; budget).

`east` — **Rec Corridor**: "a wide, east-west hallway. Portals lead north and south, and another corridor branches southwest." The map is opening up quickly: from the Rec Area alone there are three unexplored branches (northeast from Plain Hall; north, south, southwest from here). I'll do a rough clockwise sweep: north first.

Command count so far: 18 (A1) + 15 (A2) + 44 (A3) = 77 of ~200.

### Attempt 3, commands 45-46: the dormitory

`north` — **Dorm B**: "a very long room lined with multi-tiered bunks… could have once housed many hundreds, but it seems quite deserted now." Openings north and south.

`north` — **SanFac B**: "the sanitary facility for the adjacent dormitory. The fixtures are dry and dusty, the room dead and deserted. You marvel at how little the millenia and cultural gulfs have changed toilet bowl design. The only exit is south." Dead end, but the toilet-bowl line got a laugh, and "millenia" (sic) tells me this place is *old*.

The mood is shifting from farce to something quieter and lonelier — an empty complex that housed hundreds. I like it. The "B" in the room names implies a Dorm A and SanFac A somewhere. Heading back south and continuing the sweep (south portal, then southwest).

### Attempt 3, commands 47-49: mirror-image dorms

`south`, `south` — back through Dorm B to the Rec Corridor. Revisited rooms print only the heading, which is efficient, though after four rooms of it I'd welcome a one-line reminder of exits.

`south` — **Dorm A**, word-for-word identical to Dorm B ("very long room lined with multi-tiered bunks…"). Symmetrical layout: presumably SanFac A lies beyond. Copy-paste room text is a small letdown after how specific everything else has been; even one differing detail would help me tell them apart when I'm lost later.

Score has sat at 6 for twelve turns; I need to find something to *do* rather than just map. Checking the south end of Dorm A, then the southwest corridor.

### Attempt 3, commands 50-52: SanFac A and the long walk back

`south` — **SanFac A**, identical to SanFac B save "The only exit is north." Dead end confirmed. `north`, `north` — back to the Rec Corridor.

Five commands and about 100 clock ticks for two rooms of copy-pasted toilets. This is the first stretch where mapping felt like a chore. I don't regret checking (a dead end can hide an item), but a designer might put *something* in one of the two SanFacs to reward the trip.

Time is 5818. I keep watching the four-digit clock, wondering what happens at 9999 or whether there's a "day" boundary. Hunger hasn't hit yet. Onwards southwest — the branch I haven't tried — and then east along the corridor.

### Attempt 3, commands 53-55: a loop, and a padlock

`southwest` — back to **Plain Hall**. So the "corridor branching southwest" from the Rec Corridor is the same passage as Plain Hall's "northeast" branch: a small triangle loop. Fine, but it cost two moves to learn nothing new. `northeast` — back to the Rec Corridor.

`east` — **Mess Corridor**: "a wide, east-west hallway with a large portal to the south. A small door to the north is closed and hooked with a simple steel padlock which is also closed."

Now we're talking: a padlock is a physical obstacle I might be able to do something about with tools (I have a scrub brush and a towel — not promising — but the complex may have a crowbar or key somewhere). Also a "large portal" south which, given the corridor's name, is probably a mess hall. Food! I'll examine the padlock first.

### Attempt 3, commands 56-57: the Mess Hall

`examine padlock` — "I see nothing special about the padlock." Generic. I'd hoped for at least "it looks rusty" or "it would take a good whack" to tell me whether brute force is an option. (Also cost 32 ticks; examines seem to alternate between 7 and 32 and I still don't know why.)

`south` — **Mess Hall**: "a large hall lined with tables and benches… A door to the south is closed. Next to the door is a small slot. Although the room is quite barren, an octagonally-shaped canteen is sitting on one of the benches."

Two things at once: a **slot** next to a closed door (my ID card is the obvious candidate — the game did make a point of giving me one) and a **canteen**, my first real pick-up in the complex. Taking the canteen first, then trying the card in the slot.

### Attempt 3, commands 58-60: the canteen

`take canteen` — "Taken." `examine canteen` — "The canteen is closed." `open canteen` — "Opened."

Three commands, three one-word-ish answers, and I still don't know if there's anything in it. "Opened." with no follow-up implies empty, but the game showed contents when I opened the kit ("reveals a blob of red goo…"), so by that convention silence *should* mean empty — yet I don't quite trust it. Checking with `look in canteen`. If empty, it's presumably for carrying liquid later, which suggests thirst is a mechanic alongside hunger.

### Attempt 3, commands 61-62: the slot

`look in canteen` — "The canteen is empty." Confirmed; I'll fill it if I find water.

`put card in slot` — "The slot is shallow, so you can't put anything in it. It may be possible to slide something through the slot, though." This is a good refusal: it says no, explains why, and hands me the verb I should use. Exactly what a parser should do when I'm on the right track with the wrong words. Trying `slide card through slot`. Clock has just crossed 6000, still no day change.

### Attempt 3, command 63: access denied

`slide card through slot` — 'A sign flashes "Inkorekt awtharazaashun kard...akses deeniid."' — "Incorrect authorization card... access denied", in the same phonetic script as the plaque. So the slot works and reads cards; mine is simply the wrong one. That's a clean puzzle statement: find the right card. I'm going to remember this door and keep sweeping east.

### Attempt 3, commands 64-65: the long hall

`north` — Mess Corridor. `east` — **Dorm Corridor**: "a wide, east-west hallway with openings to the north and south. To the east, the corridor stretches off into the distance. That section of the hallway is lined with a motorized walkway (no longer running) that was probably intended to transport people or cargo down that tremendously long hall."

A dead moving walkway is evocative — this place had power once and doesn't now, which fits the dial door, the padlock, and the card reader all being obstacles. I suspect restoring power is a theme. North/south here are probably Dorm C and D (same text again, I'd bet), so I'm skipping them for now and committing to the long hall east. I'm at about 100 commands of my ~200; time to be choosier.

### Attempt 3, command 66: the walk

`east` — "You walk down the long, featureless hallway for a long time. Finally, you see an intersection ahead..." then **Corridor Junction**: "A north-south corridor intersects the main corridor here. To the west, the main corridor extends as far as you can see; a non-working walkway from that direction ends here. To the east, the corridor widens into a well-lit area."

The walk cost 160 clock ticks (6047 → 6207) — eight times a normal move — and the game told me so in prose. I really like that the clock is doing the work here: it makes the dead walkway matter (if it ran, I'd cross faster) and makes me think twice about going back and forth. Every trip west to the card-slot door is going to be expensive.

"Well-lit" is the first mention of anything working. East, now.

### Attempt 3, command 67: the Elevator Lobby

`east` — **Elevator Lobby**: "a wide, brightly lit lobby. A blue metal door to the north is closed and a larger red metal door to the south is also closed. Beside the blue door is a blue button, and beside the red door is a red button. A corridor leads west. To the east is a small room about the size of a telephone booth."

Finally, things that might respond. Two elevators (blue north, red south) and a phone-booth-sized room east. Buttons before booths: pushing blue.

### Attempt 3, commands 68-69: the blue elevator answers

`push blue button` — "You hear a faint whirring noise from behind the blue door." So it *does* have power. `wait` — ">> The door at the north end of the room slides open."

A two-turn elevator call is a nice bit of texture; it also implies the door will close again on a timer, so I'm stepping in immediately rather than trying the red button first.

### Attempt 3, commands 70-71: inside the elevator

`north` — **Upper Elevator**: "a tiny room with a sliding door to the south which is open. A control panel contains an Up button, a Down button, and a narrow slot."

Another slot. The complex loves slots. `push up button` — "Nothing happens." Terse and unhelpful; is that "the elevator has no power for movement", "you need a card in the slot first", or "this is the top floor"? I can't tell, and I'd like a hint. Trying Down.

### Attempt 3, commands 72-73: locked out of the lift

`push down button` — "Nothing happens." `slide card through slot` — same phonetic 'Inkorekt awtharazaashun kard...akses deeniid.'

So two locks now want a card I don't have (mess-hall door, elevator), plus a dial door and a padlock. The game is stacking obstacles faster than it's giving me tools — which is fine as a structure, but I've now been 60-odd turns on the plateau without a single point, and my only pick-up is an empty canteen. I'm starting to worry I've walked past the tool I need (those dorms I skipped?). Before backtracking 160 ticks west, though, there's still the booth east of the lobby, the red door south, and the junction's north/south corridor.

### Attempt 3, commands 74-75: Booth 2

`south` — Elevator Lobby. `east` — **Booth 2**: "a tiny room with a large '2' painted on the wall. A panel contains a slot about ten centimeters wide, a brown button labelled '1' and a tan button labelled '3.'"

A numbered booth with buttons for the *other* numbers reads as a teleporter / people-mover between three stations. A ten-centimetre slot is wider than the card slots — it wants something else (a token? a wider card?). I'll press "1" and see whether it works without whatever the slot wants.

### Attempt 3, command 76: not activated

`push brown button` — 'A sign flashes "Teleportaashun buux not aktivaatid."' — "Teleportation booth not activated." So it IS a teleporter, and it needs activating — which sounds like a systems/power thing rather than a card thing. The phonetic signage is consistently fun to decode; three for three so far.

Trying my card in the wide slot anyway, because it's one turn and I'd rather rule it out.

### Attempt 3, commands 77-78: three locks, one wrong card

`slide card through slot` (in Booth 2) — the same "Inkorekt awtharazaashun kard...akses deeniid." So my Patrol ID is rejected by every reader in the complex. That's now four gated things in a row (mess door, elevator, teleporter, plus the dial door and padlock). I have the strong sense there is a *right* card somewhere, and that finding it will open several things at once — which would be satisfying. But I also note I have gone about 45 turns on the plateau with no score change, which is the longest dry spell of the game.

`west` — back to the lobby. Red button is the last untried control here.

### Attempt 3, commands 79-80: the red door

`push red button` — "The red door begins vibrating a bit." A different response from the blue one's whirring — I like that the two elevators feel mechanically distinct, and "vibrating" for the *larger* door reads as a bigger, slower car. `wait` — silence. The blue door took one wait; this is taking more. I'll give it one more turn before assuming it's broken.

### Attempt 3, command 81: hunger

`wait` — the red door still hasn't opened, but: ">> A growl from your stomach warns that you're getting pretty hungry and thirsty."

So the survival clock has started, at time 6486 — about 2000 ticks after I first tried to eat and was told I wasn't hungry. Hunger I can fix (three blobs of goo). Thirst I can't: the canteen is empty and I've seen no water except the ocean I climbed out of. That's a real worry. The red door is now a secondary concern; eating first.

### Attempt 3, commands 82-83: cherry pie and a stubborn door

`eat red goo` — "Mmmm...that tasted just like scrumptious cherry pie." Charming. Two blobs left (brown, green); I'm now curious what they taste like.

`south` — "The door is closed." (free, no turn). So three turns after pressing the red button it's still shut. Either it's slower than I've allowed, or it needs something else, or it's broken and "vibrating a bit" was the tell. I'll come back. Thirst is the pressing issue: the junction had an unexplored north/south corridor, and the complex must have had plumbing somewhere that isn't dry.

Command tally: 18 + 15 + 83 = 116 of ~200.

### Attempt 3, command 84: structural damage

`north` — **Admin Corridor South**: "This section of hallway seems to have suffered some minor structural damage. The walls are cracked, and a jagged crevice crosses the floor. An opening leads east and the corridor heads north and south."

"Admin" is promising — offices mean desks, desks mean cards. The crevice is described but I could cross it without comment, so I take it as set dressing for now (or a place things fall into). Checking the east opening before continuing north.

### Attempt 3, command 85: SanFac E

`east` — **SanFac E**: "Here is another sanitary facility. Like the others, it is dusty and non-functional." At least this one is short and self-aware ("like the others"). "Non-functional" also quietly kills my hope of finding water in a bathroom. Back west and north.

### Attempt 3, commands 86-87: the rift

`west` — back to Admin Corridor South. `north` — **Admin Corridor**: "The hallway, in fact the entire building, has been rent apart here, presumably by seismic upheaval. You can see the sky through the severed roof above, and the ground is thick with rubble. To the north is a gaping rift, at least eight meters across and thirty meters deep. A wide doorway, labelled 'Sistumz Moniturz,' leads west."

The most striking room so far. The complex has been torn in half by an earthquake, and whatever is north of the rift is cut off — a puzzle for later (eight metres is not jumpable; I'd need the walkway running, a bridge, or another route). "Sistumz Moniturz" = Systems Monitors: if anywhere is going to tell me what's broken and why, it's there. Going west.


### Attempt 3, commands 88-94: Systems Monitors, and a resumed session

Back from a break. The saved session was one command ahead of my diary (I had already typed `west` into Systems Monitors but never read the reply), so I open with `look`.

**Systems Monitors**: "a large room filled with tables full of strange equipment. The far wall is filled with a number of monitors. Of these, the ones labelled LIIBREREE, REEAKTURZ, and LIIF SUPORT are green, but the ones labelled PLANATEREE DEFENS, PLANATEREE KORS KUNTROOL, KUMUUNIKAASHUNZ, and PRAJEKT KUNTROOL indicate a malfunctioning condition."

Decoded: Library, Reactors, Life Support are fine; Planetary Defense, Planetary Course Control, Communications, Project Control are broken. That's a to-do list handed to me in-fiction, which I like a lot — four broken systems, presumably four puzzles or four places. "Planetary Course Control" is an alarming phrase for a planet.

`examine equipment` — "so complicated that you couldn't even begin to figure out how to operate it." Fair; this is a status board, not a control room. `examine monitors` — just repeats the room text. The room lists no other exit, so it's a dead end with information in it.

`east` back to the Admin Corridor and `examine rift` — "at least eight meters wide and more than thirty meters deep. The bottom is covered with sharp and nasty rocks." A clear "don't jump" sign. `south` to Admin Corridor South. Next: the junction's unexplored south corridor, and the still-vibrating red door.

Command tally: 18 + 15 + 94 = 127 of ~200 (about 190 left in this sitting's budget).

### Attempt 3, commands 95-103: the storage room pays off

`south`, `south` from the junction — **Mech Corridor North**: "Entrances to rooms lie to the east and west from this north-south hall." "Mech" is the word I've been waiting for; if anything in this complex is fixable, the parts are down here.

`east` — **Storage East**: a dusty shelf with "a small oil can", and a cardboard box on the floor containing "a cracked seventeen-centimeter fromitz board, a B-series megafuse, a K-series megafuse, a good ninety-ohm bedistor." This is the first room with more than one object in it, and the adjectives are doing puzzle work: the board is *cracked*, the bedistor is *good*, and the two fuses differ only by series letter. I read this as a repair-kit room — somewhere there's a machine with a blown fuse or a burnt board.

`take oil can` — "Taken." That's for the padlock on the Mess Corridor door, I hope. `take box` — "Your load is too heavy." First time weight has come up, and I'm carrying a scrub brush I've never needed since Deck Nine. `drop brush` — it stays here on the floor of Storage East (noting the location in case it matters). `take box` — "Taken."

`examine board` — "a twisted maze of silicon circuits… square, approximately seventeen centimeters on each side. This one looks as though it's been dropped." So the seventeen-centimetre measurement is a spec: there'll be a slot that size somewhere, and this cracked one won't do — a good one exists elsewhere.

`west`, `west` — **Physical Plant**: "a huge, dim room with exits in the northeast and southeast corners… criss-crossed with catwalks and is filled with heavy equipment presumably intended to heat and ventilate this complex. Hardly any of the equipment is still operating." Two exits I haven't used (NE, SE), which is odd because I entered from the east. Sweeping southeast first.

Inventory now: chronometer, uniform, ID card, towel, kit (brown + green goo), canteen, oil can, box (board, 2 fuses, bedistor). Score still 6.

### Attempt 3, commands 104-112: Reactor Control, another slot, and a grue

`southeast` — **Mech Corridor**, same text as Mech Corridor North ("Entrances to rooms lie to the east and west"). `east` — **Reactor Control**: "many dials and gauges for controlling a massive planetary power reactor which, according to a diagram on the wall, must be buried far below this very complex. The exit is to the west. To the east is a metal door, and next to it, a button. A dark stairway winds downward."

`examine dials` — "incredibly complicated and you shouldn't even be thinking about touching them." That's the second "too complicated for you" wall in a row (after the Systems Monitors equipment). I understand the intent — keep the ensign away from the reactor — but two identical brush-offs make the "reactors green" status feel like a thing I'll never interact with.

`push button` — "The metal doors slide open, revealing a small room to the east." Instant, unlike the two-turn blue elevator. `east` — **Reactor Elevator**: Up, Down, "and a small slot." Third slot-locked elevator. `push down button` — "Nothing happens." I didn't even bother with my card this time; the pattern is clear. `west` — ">> The elevator door slides shut" behind me. Nice.

`down` — "It is pitch black. You might be eaten by a grue." **Reactor Access Stairs.** So a light source is now on the shopping list along with the right card and a good fromitz board. I climb straight back `up` (30 ticks; the grue didn't get me).

Running list of locks: dial door (Rec Area, needs a number), padlock (Mess Corridor, try oil), card door (Mess Hall), three card elevators, teleporter (needs activating), dark stairs (needs light), rift (needs a bridge or a detour), red elevator door (never opened). Tools in hand: oil can, fuses, bedistor, cracked board. The imbalance is starting to bite; I have not scored a point since the Crag, 80 turns ago. Next: the west room off Mech Corridor, then back to the padlock with the oil can.

Command tally: 18 + 15 + 112 = 145.

### Attempt 3, commands 113-122: the Machine Shop and a very narrow canteen

`west`, `west` from Reactor Control — the "west room" off Mech Corridor is just the Physical Plant again, entered by its southeast corner. So the Physical Plant is a big blob with two doors onto the same corridor; two moves to learn that. `southeast`, `south` — **Mech Corridor South**: "The corridor ends here with doorways to the southwest, south, and southeast." Three more branches.

`south` — **Machine Shop**: "filled with a variety of unusual machines. Doorways lead north, east, and west.| | Standing against the rear wall is a large dispensing machine with a spout" — the `| |` is the same unrendered line-break glitch as the ID card. The dispenser has "KUULINTS 1 - 4" (red, blue, green, yellow), "KATALISTS 1 - 3" (gray, brown, black), and two white buttons: square "BAAS" and round "ASID". Coolants, catalysts, base, acid. Nine buttons, a spout, and I'm carrying an empty canteen and dying of thirst. This *has* to be where the canteen gets filled — or where something gets mixed.

`examine dispenser` — "nothing special." `examine machines` — also answered about the dispenser, which is a small parser oddity (I asked about the room's "unusual machines").

`put canteen under spout` — "The canteen is now sitting under the spout." Good, the game understood the physical setup. `push red button` — "Chemical fluid gushes from the spout. Unfortunately, the mouth of the canteen is very narrow, and the fluid just splashes over it."

Ha — thwarted by geometry. This is a fair, well-telegraphed failure: it tells me the canteen *would* work with a funnel or a wider vessel, and it means the octagonal canteen isn't the intended container here after all (or not without help). No word on what "Coolant 1" actually is — the fluid isn't described — so I don't know if it's drinkable. `take canteen` back.

Thirst is now my clock. I have no water and the game hasn't shown me any since the ocean. Two doorways left here (east, west) plus SW/SE off the corridor end. Sweeping east.

Command tally: 18 + 15 + 122 = 155.

### Attempt 3, commands 123-128: Floyd

`east` — **Robot Shop**: "filled with robot-like devices of every conceivable description, all in various states of disassembly. Only one robot, about four feet high, looks even remotely close to being in working order." Exits west and northwest.

`examine robot` — "leaning against the wall, its head lolling to the side… equipped for general-purpose work. It has apparently been turned off." So: `turn on robot` — **"Nothing happens."** — and the score goes from 6 to **8**. That is a straight contradiction: the game scored me for the thing it said didn't happen. I nearly walked off. Only the score line told me to `wait`, and then:

">> Suddenly, the robot comes to life and its head starts swivelling about. It notices you and bounds over. 'Hi! I'm B-19-7, but to everyperson I'm called Floyd. Are you a doctor-person or a planner-person? That's a nice chronometer you are having there. Let's play Hider-and-Seeker you with me.'"

I'm charmed. The first character since Blather, and the opposite of him in every way. The one-turn boot delay is fine — but "Nothing happens" should be something like "The robot's eyes flicker faintly" so the player knows to wait. As written, only someone watching the score would stay.

`examine floyd` — "slightly cross-eyed, and its mechanical mouth forms a lopsided grin." `floyd, follow me` — **"I don't know the word 'floyd'."** Yet it just accepted `examine floyd`. The comma-address form (the classic "NPC, do X") isn't parsed, and the error message blames the *noun*, which sent me down the wrong path for a second. `talk to floyd` — "'Hi!' Floyd grins and bounces up and down." Cute, but tells me nothing about what he can do.

I'll leave the room and see whether he follows on his own. If he does, I'll try `ask floyd about card` / `give box to floyd` later.

### Attempt 3, commands 129-135: the Tool Room and the weight limit

`northwest` — Mech Corridor South, ">> Floyd follows you." He tags along without being asked — good, because the game gave me no way to ask him. `southwest` — **Tool Room**: "a large glass flask" on the floor, "a metal bar, curved into a U-shape" on an upper shelf, "a pair of wide-nosed pliers", and "a small device, labelled 'Akmee Portabul Laazur'" (Acme Portable Laser) containing "an old battery." Floyd follows again. This room and Storage East are clearly the game's toolbox, and I now have more candidate solutions than problems I can reach.

`take flask` — "Your load is too heavy." Again. The limit is tight enough that it's becoming the main thing I manage. `drop box` (with its cracked board, fuses and bedistor — I'm gambling that they're for something I haven't found yet, and the Tool Room is a sensible place to leave them). `take flask` — "Taken." A flask has a wide mouth; this is surely the dispenser vessel. `take laser` — "Taken." `take pliers` — too heavy again, so they stay for now; I know where they are.

Floyd, meanwhile, is doing one-liners every turn: "yawns and looks bored", "sings an ancient ballad, totally out of key", "frets about the possibility of his batteries failing." That last one might be a hint, given the laser's "old battery".

`examine laser` — "fairly heavy… a long, slender barrel and a dial with six settings… currently on setting 5. There is a depression on the top of the laser which contains an old battery." `turn on laser` — "You can't turn that on." So it's not a torch; it's a cutting/shooting tool with a power dial. I'll try firing it at something to learn what it does, then head for the padlock with the oil can, and the dispenser with the flask.

Command tally: 18 + 15 + 135 = 168.

### Attempt 3, commands 136-141: a blue beam and a milky flask

`shoot wall with laser` — **"You can't see any wall laser here!"** Same bug as `hit blather with brush` in Attempt 1: the parser fuses "X with Y" into a single noun "X Y". It cost no turn but it's the second time the "with" preposition has bitten me, and the error text is actively misleading (it implies "wall laser" is the missing object). `fire laser` — "The laser emits a narrow blue beam of light." Score to **10**. So it works, and firing it at nothing in particular is worth two points — a small reward for experimentation that I appreciated.

`east` to the Machine Shop (Floyd follows). `put flask under spout` — "The glass flask is now sitting under the spout." `push red button` — "The flask fills with some red chemical fluid. The fluid gradually turns milky white."

The colour change is the interesting bit. Red coolant on its own shouldn't turn white — unless the flask wasn't clean, or unless "coolant 1" is meant to be combined with something and this is what "wrong" looks like. `examine fluid` — "nothing special about the quantity of chemical fluid" — so the game won't tell me what I've made, which is a shame; even "it smells caustic" or "it looks drinkable" would steer me. I'm certainly not drinking it. `take flask` — "Taken."

Since I can't fill the canteen and the goo may or may not cover thirst, I'm going to go finish the two leads I actually have tools for: the padlock (oil can) and the dark stairs (nothing yet — the laser beam is "narrow", not a lamp). Heading north, exploring the Dorm Corridor's side rooms on the way to the Mess Corridor.

Command tally: 18 + 15 + 141 = 174.

### Attempt 3, commands 142-149: the long walk back, and the padlock resists

`north` ×4 up the Mech corridors to the Junction, Floyd following each time with the same ">> Floyd follows you." (a short, consistent line — I'd never want it removed, but a bit of variety in his wandering chatter helps, and the follow line could take a hint of that). `west` — the 160-tick walk, "Finally, you see some doorways ahead..." — and **no** "Floyd follows you." He appears to have been left at the Junction, or he doesn't do the long hall. Nothing told me either way, and I only noticed because the follow line went missing. I hope he isn't wandering off with the plot.

`west` — Mess Corridor. `oil padlock` — "The padlock doesn't need oiling." Well, that's a clean no; the oil can is for something else (the dead walkway? a stiff dial? Floyd?). `shoot padlock` — "The laser emits a narrow blue beam of light which strikes the padlock. The padlock grows a bit warm, but nothing else happens." This is a *great* partial-success message: it confirms the approach (the beam hits, the metal heats) and points straight at the dial ("setting 5" of 6). Turning it up.

Note that `shoot padlock` worked without naming the laser, which is friendlier than the "with" form that keeps failing.

### Attempt 3, commands 150-153: Padlock 1, Adventurer 0

`set dial to 6` — "The dial is now set to 6." `shoot padlock` — "a narrow **violet** beam… The padlock grows a bit warm, but nothing else happens." The colour change (blue → violet) is a lovely detail that says "yes, the dial did something" — but the outcome is identical, which tells me the limit isn't the setting, it's the power supply. The laser holds "an old battery" and Floyd has been fretting about batteries; I'm now fairly confident I need a fresh one.

`unhook padlock` — "I don't know the word 'unhook'", even though the room text says the door is "hooked with a simple steel padlock". Vocabulary in the description should be vocabulary in the parser. `break padlock` — "And, as we go into the next round, it's Padlock 1, Adventurer 0..." Very funny, and a clear no.

`examine door` — "The door is closed." and then ">> Floyd rushes into the room and barrels into you. 'Oops, sorry,' he says. 'Floyd not looking at where he was going to.'" So he *does* do the long hall, just a few turns behind. Relieved; and that entrance line is the best Floyd moment yet.

Padlock verdict: wants pliers (Tool Room, 6+ moves and 160 ticks away) or a new battery (location unknown). Parking it. I'll sweep the Dorm Corridor's north and south rooms since I'm adjacent, then the Courtyard's unexplored west opening.

Command tally: 18 + 15 + 153 = 186.

### Attempt 3, commands 154-158: Dorm D, and the bunks that aren't there

`east` — Dorm Corridor, ">> Floyd bounds into the room. 'Floyd here now!' he cries." Another distinct arrival line; his are varying nicely where Blather's never did. `north` — **Dorm D**, the fourth copy of the dormitory paragraph. `examine bunks` — **"You can't see any bunks here!"** in a room whose first sentence is "lined with multi-tiered bunks". That's the sort of reply that makes a player stop trusting `examine`; if the bunks are scenery, "There's nothing interesting in the bunks" would do.

`south` — Dorm Corridor, "There is a multiple purpose robot here." — Floyd shown as a generic object because he waited here rather than following me into the dorm. Fine, though "multiple purpose robot" after he's introduced himself as Floyd felt cold. `west`, `west` — Mess Corridor, Rec Corridor, Floyd following.

I'm skipping Dorm C and the two remaining SanFacs on the strength of four identical rooms; if something's hidden there, the copy-paste text has successfully persuaded me otherwise, which is a design risk worth flagging. Target: the Courtyard's west opening, which I never took on the way in.

### Attempt 3, commands 159-162: the West Wing

`west`, `south`, `south` — Rec Area, Plain Hall, Courtyard, Floyd keeping up ("Floyd here now!"). `west` — **West Wing**: "once the west wing of the castle, but the walls are now mostly rubble, allowing a view of the cliff and ocean below. Rubble blocks all exits save one, eastward to the courtyard."

A dead end, and a five-move round trip to confirm it. Atmospheric, at least. That closes the castle side of the map: the only unexplored exits I know of are behind locks (dial door, padlock, card door, three card elevators, red door, dark stairs, rift, and the "teleportation booth not activated").

Where I stand at command 162 of this attempt: score 10, time 7925, hungry-and-thirsty since 6486 with two goo blobs and no water. Tools: laser (weak battery), oil can (unknown purpose), flask of milky fluid, empty canteen, towel. Known-but-not-carried: pliers, U-bar, fuses, bedistor, cracked board (Tool Room), brush (Storage East). Plan: try asking Floyd something useful, then make the long trip for the pliers and cut the padlock.

Command tally: 18 + 15 + 162 = 195.

### Attempt 3, commands 163-168: fungus pudding and the trek east

`ask floyd about water` — **"You can't see any floyd about water here!"** Third form of the same parser failure: any "X <preposition> Y" phrase ("hit X with Y", "shoot X with Y", "ask X about Y") gets glued into one noun. Between that and the comma form not working, I have no way to ask Floyd anything, which makes him decorative for now — a shame, because he's clearly built to be a hint machine ("Are you a doctor-person or a planner-person?").

`east` — Courtyard, and ">> A growl from your stomach warns that you're getting pretty hungry and thirsty." Second warning, about 1460 ticks after the first, so the cycle is roughly 1500 ticks per meal. `eat brown goo` — "Mmmm...that tasted just like delicious Nebulan fungus pudding." One blob left (green), and still no water anywhere; if thirst is tracked separately from hunger, I'm going to find out the hard way.

`north`, `northeast`, `east`, `east` — Plain Hall, Rec Corridor (the shortcut works), Mess Corridor, Dorm Corridor. Floyd bounds in again. Now the long walk.

### Attempt 3, commands 169-173: weary, and back in the Tool Room

`east` — the long walk (160 ticks again), and at the Junction: ">> You begin to feel weary. It might be time to think about finding a nice safe place to sleep." So the game tracks hunger, thirst *and* sleep. Three survival clocks is a lot for a player who still hasn't scored a real puzzle, but the message is gentle and tells me what to do ("a nice safe place" — the dormitories, I assume, and they are on the *other* end of the 160-tick hall, which suddenly makes those copy-paste bunks matter). Floyd bounds in behind me.

`south` ×3 and `southwest` — Tool Room, exactly as I left it, box and all. Now to swap weight: I'm dropping the empty canteen (narrow-mouthed, no water anywhere) for the pliers.

Command tally: 18 + 15 + 173 = 206.

### Attempt 3, commands 174-178: pliers in hand, nothing to say about them

`drop canteen` — "Dropped." `take pliers` — "Taken." Weight is now the puzzle I solve most often. `examine pliers` — "nothing special about the pair of wide-nosed pliers." `examine bar` — "nothing special about the curved metal bar."

Two "nothing special" replies for the two tools the room lists most carefully ("wide-nosed", "curved into a U-shape"). Those adjectives are presumably the hint — wide-nosed for gripping something specific, a U-bar for hanging or bridging — and the examine text throws the hint away. Both examines also cost 32 ticks each, the expensive kind; I've now noticed that the 32-tick examines are the "nothing special" ones and the 7-tick ones are the bespoke descriptions, which is exactly backwards from what I'd want (the game charges me most for telling me least). Could be coincidence.

`northeast` — Mech Corridor South; Floyd bounds in. Six moves to the padlock, weariness rising.

### Attempt 3, commands 179-184: the padlock and the "with" wall

`north` ×3, `west` (long walk) — at the Dorm Corridor: ">> You're really tired now. You'd better find a place to sleep real soon." Second sleep warning, escalating nicely; Dorm D is one room north, so I gamble on the padlock first. `west` — Mess Corridor.

`cut padlock` — "I don't know the word 'cut'." `open padlock` — "You can't open it with your hands." Good: that reply says *use a tool*, and I have one. `open padlock with pliers` — **"You can't see any padlock pliers here!"**

So here is the problem in one line. The game tells me to use a tool, I name the tool in the most standard text-adventure syntax there is, and the parser fuses "padlock with pliers" into a nonsense noun. This is the fourth "with/about" failure ("hit blather with brush", "shoot wall with laser", "ask floyd about water", now this), and this time it's not a curiosity — it's standing between me and what I'm fairly sure is the intended solution. If the pliers are the answer, I cannot express it.

Trying single-verb phrasings on the off chance one is wired up.

### Attempt 3, commands 185-189: bedtime

`unlock padlock` — "You can't open it with your hands." (same as `open`). `pry padlock` — "I don't know the word 'pry'." `use pliers` — "I don't know the word 'use'." That's every phrasing I can think of that avoids a preposition. I'm leaving the padlock, defeated by syntax rather than by the puzzle; noted in the friction log as the single biggest issue of the run.

`east`, `north` — Dorm D, Floyd following. `sleep` — "Civilized members of society usually sleep in beds." Then ">> Floyd says 'Floyd going exploring. See you later.' He glides out of the room." — a good touch; he has his own life. But "sleep in beds" collides with `examine bunks` → "You can't see any bunks here!" from earlier. `get in bed` — "Ahhh...the bed is soft and comfortable. You should be asleep in short order." Status line: "Dorm D, in the bed". So the noun is *bed*, not *bunk*, and the room text only ever says "bunks". A synonym would fix it.

Floyd bounds back in as I settle. Sleeping now.

Command tally: 18 + 15 + 189 = 222. This sitting: 102 of ~200.

### Attempt 3, commands 190-191: the first night

`sleep` — "You'll probably be asleep before you know it." `wait` — Floyd "recalls the time he bruised his knee", then ">> You slowly sink into a deep and restful sleep."

And a dream: I'm eight years old on Gallium, playing with my pet sponge-cat Swanzo by a pond; "Mom is hanging orange towels on the clothesline"; the school bully pushes my head under the water and "you feel your life draining away..." Then ">> ***** SEPTEM 7, 11344 *****" and "You wake up feeling refreshed and ready to face the challenges of this mysterious world." Floyd: "About time you woke up, you lazy bones! Let's explore around some more!"

The clock now reads **1659** — so the four-digit time is a time of day, the day ticked over, and the date banner answered my earlier question about rollover. The dream is the most interesting thing the game has done since the plaque: it's either pure character colour or it's coded — orange towels (I carry a towel), drowning (I'm thirsty, or the pod), a pond (water!). I don't know which, and that's exactly the right amount of not-knowing. The "life draining away" line did make me check the status line for a death, though.

Sleep took three commands (`sleep` → "in beds", `get in bed`, `sleep`, `wait`) — one more than felt natural, since `sleep` while standing in a dormitory could reasonably put me in a bunk.

### Attempt 3, commands 192-196: day two, back to the dial door

`get out of bed` — "You are on your own feet again." `south`, `west` — Mess Corridor, Floyd following. One last free try at the padlock: `squeeze padlock` — "I don't know the word 'squeeze'." (Unknown-word replies cost no turn, which makes verb-guessing painless — a kindness I've leaned on a lot.) I'm now fairly sure the pliers aren't for the padlock at all: the laser *warmed* it, which reads as "right tool, weak battery", and the pliers' "wide-nosed" adjective suggests they pull something (a fuse? a board?) rather than cut. So: find a battery.

`west`, `west` — Rec Corridor, Rec Area. Floyd hasn't followed for the last two moves; he seems to have his own wander schedule. The dial door is the one obstacle here I haven't actually manipulated yet (I only read "set to 0"), so I'm going to examine it and try turning it, in case the number is discoverable by feel or the door reacts to a wrong guess in an informative way.

### Attempt 3, commands 197-201: a thousand possibilities

`examine dial` — "The dial can be turned to any number between 0 and 1000." So this is a find-the-combination puzzle, and the number must be written somewhere I haven't been (or somewhere I've been and didn't read closely enough — the games and tapes in this very room are the obvious suspects, and both examines gave me jokes rather than digits).

`turn dial to 500`, `open door` — "The door is locked. You probably have to turn the dial to some number to open it." A fair, slightly dry restatement; it doesn't leak "warmer/colder", which is right for a combination lock. `turn dial to 40` (the plaque's "fortee skwaar miilz", the only small number the game has shown me), `open door` — same. I'm not going to brute-force a thousand values at two commands each; that's the correct player reaction, and the game is clearly designed on that assumption.

Floyd "whistles tunelessly" — his idle lines keep landing.

So at the end of day one and the start of day two, every lead is behind something I don't have: a number, a card, a battery, a light, a bridge, or a preposition. The last unexplored ground is Dorm C / SanFac C and the red elevator's patience. I'll spend the remaining budget on those, then write up.

Command tally: 18 + 15 + 201 = 234. This sitting: 114 of ~200.

### Attempt 3, commands 202-206: Dorm C and SanFac C, for completeness

`east`, `east`, `east` — Rec Corridor, Mess Corridor, Dorm Corridor; Floyd off on his own again. `south` — **Dorm C**, the fifth copy of the dormitory text. `south` — **SanFac C**, the fourth copy of the toilet text (the "millenia" spelling included). Floyd bounds in behind me.

So the dorm block is fully symmetrical: four dorms, four sanfacs, all empty. I did the sweep because a hidden item in a copy-paste room is a classic trick, and I can now tell the author it isn't one here — but ten-plus commands of my budget went to confirming that nothing is there. If the four dorms exist to give sleep a location, one dorm and a "the other dormitories are identical" line would do the same job in a fraction of the player's time.

### Attempt 3, commands 207-210: everything is gone

`north`, `north` — Dorm Corridor. `east` — the long walk, and at the Junction two events: the hunger growl (third time; cycle confirmed at ~1500 ticks) and ">> You notice that you feel a bit weak and slightly flushed, but you're not sure why." A *fourth* clock, and this one reads like sickness — the drowning dream, the "life draining away", now "weak and flushed". Something is wrong with me and the game is being deliberately coy. I like the slow reveal; I'd like it more if I had any lead on a cure.

`eat green goo` — **"You can't see any green goo here!"** `inventory` — "A chronometer (being worn). A Patrol uniform (being worn)." That's it. The laser, the pliers, the flask, the survival kit with my last meal, the towel, the oil can, and the ID card that was *inside my uniform* — all gone, with no message, at some point in the last twenty commands.

I have no idea when. The obvious suspect is the night's sleep (I got into a bed carrying everything; maybe the game emptied my hands and I missed a line in the wake-up text, or maybe Floyd "went exploring" with my stuff). The less obvious suspect is a bug on the day rollover. Either way: a player who loses every object silently will assume the game is broken, and I nearly did. If it was deliberate, the wake-up paragraph must say "your things are scattered around the bed" or similar; if Floyd took something, he should say so.

Walking 160 ticks back to Dorm D to find out.

Command tally: 18 + 15 + 210 = 243. This sitting: 123 of ~200.

### Attempt 3, commands 211-212: found, on the floor by the bed

`west` (160 ticks), `north` — **Dorm D**, and there it all is: "There is an ID card here. There is a towel here. There is a survival kit here… There is an oil can here. There is a glass flask here. There is a pair of wide-nosed pliers here. There is a laser here."

So getting into bed (or falling asleep) put everything I carried on the floor, including the ID card from inside my uniform — and nothing said so. Worse, when I woke, the room was shown in brief mode (just "Dorm D" and Floyd's line), so the pile wasn't listed, and I walked out and 160 ticks down a corridor without it. Three things would each have fixed this: a line at bedtime ("you set your things down beside the bed"), a line at waking ("your belongings are where you left them"), or a full room description on waking. Any one of them. As it stands, the sleep mechanic cost me about 340 ticks and eight commands of pure backtracking, and for a few turns I believed the game had eaten my inventory.

Now to eat, then re-collect everything under the same weight limit that made me drop the canteen and box.

### Attempt 3, commands 213-217: lima beans and re-packing

`eat green goo` — "You're not holding the survival kit." Fine, but it's a small extra hoop in a room where the kit is at my feet; "(first taking the survival kit)" would be the friendlier convention. `take kit`, `eat green goo` — "Mmmm...that tasted just like yummy lima beans." The three goo flavours (cherry pie, Nebulan fungus pudding, lima beans) are a nice descending joke. That was my last food; the next growl will be a real problem unless the Mess Hall or something behind a lock feeds me.

`take laser`, `take card` — "Taken." twice. Re-packing one item per turn, watching for "Your load is too heavy" — which I know arrives around the sixth carried object. Pliers next, then the flask and oil can if they fit; the towel can stay unless it becomes obviously useful.

### Attempt 3, commands 218-223: packed, and back to the red door

`take pliers`, `take flask`, `take oil can` — "Taken." ×3. `take towel` — "Your load is too heavy." So the limit is six carried objects plus what I wear, near enough; the towel stays on the floor of Dorm D. (I'm a little sad about that; the game has done nothing with the towel and I keep expecting it to.)

`south`, `east` (160 ticks; Floyd *does* follow on the long walk this time — so his earlier lag was a wander, not a rule), `east` — **Elevator Lobby**. Time 2553 on day two.

The plan for the rest of the budget: be properly patient with the red door — push, then wait up to five turns, examining it as I go — because "begins vibrating a bit" is the only lock in the complex that ever responded with motion rather than a refusal.

Command tally: 18 + 15 + 223 = 256. This sitting: 136 of ~200.

### Attempt 3, commands 224-226: the red door was open all along

`push red button` — "Pushing the red button doesn't seem to do anything." A *different* reply from yesterday's "begins vibrating a bit", which made me suspicious. `examine red door` — **"The red door is open, but I can't tell what's beyond it."**

So the red elevator did come, sometime in the ~1800 ticks I was away — it's just slower than the blue one, and by the time I re-entered the lobby the door was standing open. I arrived in brief mode ("Elevator Lobby", Floyd follows) and had no idea. This is the same failure as the escape pod and the sleep pile: a state change I wasn't present for, hidden behind a brief-mode heading. The fix is cheap: brief mode should still print a one-line "The red door is open." for doors whose state changed, or the arrival should include exits.

Also, Floyd "absent-mindedly recites the first six hundred digits of pi" — a great line, and one that briefly made me wonder if the dial-door number was 314 or 3141 (out of range). I might try 314 if I'm ever back there.

`south` — **Lower Elevator**: "a medium-sized room with a door to the north which is open. A control panel contains an Up button, a Down button, and a narrow slot." Same panel as the other two. Trying the buttons before assuming the slot rules.

### Attempt 3, commands 227-229: the third slot, and playing with Floyd

`push down button`, `push up button` — "Nothing happens." twice. Three elevators, three identical slots, one wrong card. I've stopped expecting anything else from them.

`play with floyd` — "You play with Floyd for several centichrons until you drop to the floor, exhausted. Floyd pokes at you gleefully. 'C'mon! Let's play some more!'" Lovely — and it *parsed*, which is the interesting part. So "with" works when the verb has no direct object in front of it; the failure is specifically the "VERB NOUN with NOUN" shape (and "VERB NOUN about NOUN"). Meanwhile "give NOUN to NOUN" worked back on the Feinstein. That's a precise enough pattern that I'd guess it's one code path, and it happens to be the path every tool-use command goes through.

"Centichrons" as a unit is a nice bit of world-building; the 30-tick cost of playing is about right.

### Attempt 3, commands 230-233: Floyd holds, Floyd giggles

`give laser to floyd` — "'Neat!' exclaims Floyd. He thanks you profusely." He took it. `take laser` — "Taken." — straight back, no argument. So Floyd is a walking extra inventory slot, which given how hard the weight limit has been biting is genuinely useful; I wish I'd known that before leaving the towel behind.

`search floyd` — "Floyd giggles and pushes you away. 'You're tickling Floyd!' He clutches at his side panels, laughing hysterically. Oil drops stream from his eyes." Wonderful. `open floyd` — the exact same paragraph, which is fine for a second poke but I'd expected `open` to at least acknowledge "side panels" — the text names them, so I tried. Also "oil drops" plus my unexplained oil can: I'll try oiling him, on the off chance the can is a Floyd item.

Score has been 10 for a hundred turns. I'm now certain that the rest of the game is behind the card and the number, and that my remaining budget is best spent documenting rather than pacing corridors.

### Attempt 3, commands 234-240: oiling Floyd, and one more walk west

`oil floyd` — "Floyd thanks you for your thoughtfulness." Polite, no state change I can see, and no score. So the oil can remains a mystery: not the padlock, not Floyd (or not visibly). It's the one item I've carried for 140 turns without a use, and the game hasn't given a single nudge about it.

`north`, `west`, `west` (the long walk, 160 ticks), `west`, `west`, `west` — Elevator Lobby to Rec Area, six moves and 270 ticks, to test a guess: Floyd "recites the first six hundred digits of pi", the dial goes 0-1000, so 314. It's the only number-shaped hint I have. If it works, the pi line was a clue; if not, it's one of the better jokes in the game and I lost nothing but a walk.

This is my fifth traverse of the long hall. The dead walkway is a good idea told once and a tax thereafter; if the game intends me to make this trip repeatedly (and the layout — tools east, locks west, beds west — guarantees it), it needs to be fixable early or the map needs a shortcut.

Command tally: 18 + 15 + 240 = 273. This sitting: 153 of ~200.

### Attempt 3, commands 241-245: 314 is not the number, and the flask is empty

`turn dial to 314` — "Which do you mean, the combination dial or the laser setting dial?" A correct and free disambiguation; I'd forgotten the laser has a dial too. `turn combination dial to 314`, `open door` — "The door is locked. You probably have to turn the dial to some number to open it." So the pi line was a joke. A good one.

`read tapes` — "Hardly the time or place for reading recreational tapes." Fair. `drink fluid` — **"You can't see any fluid here!"** `examine flask` — "a wide mouth and looks large enough to hold one or two liters... glass, or perhaps some tough plastic." (Finally, a proper description — but it doesn't say whether it's full.) `look in flask` — **"The glass flask is empty."**

The milky fluid I dispensed at turn 139 is gone, and nothing told me when. Best guess: the same event that emptied my inventory onto the Dorm D floor also emptied the flask, or the fluid evaporated on a timer. Either way it's the third silent state change of the run (pod door, sleep pile, flask), and it means my one chemistry experiment left no evidence behind.

I'm stopping here. Final state: Attempt 3, turn 245, day two (SEPTEM 7), time 2996, score 10, no food, "weak and slightly flushed", carrying laser (old battery), pliers, empty flask, oil can, empty kit, ID card. Towel in Dorm D; canteen, box of parts and U-bar in the Tool Room; brush in Storage East.

Command tally: 18 + 15 + 245 = 278 total. This sitting: 158 of ~200.

### Map (as I understand it)

**Feinstein (ship directions):** Deck Nine (pod to port) — starboard to Reactor Lobby; up to Gangway, up to Deck Eight. Escape Pod, then Underwater, then up to Crag.

**Island, cliff:** Crag — up to Balcony (plaque) — up to Winding Stair — up to Courtyard.

**Castle / complex, west end:** Courtyard: west to West Wing (dead end); north to Plain Hall (NE shortcut to Rec Corridor); north to Rec Area (dial door N, locked). Rec Area east to Rec Corridor (N: Dorm B, SanFac B; S: Dorm A, SanFac A; SW: Plain Hall). East to Mess Corridor (N: padlocked door; S: Mess Hall with card-slot door S, canteen). East to Dorm Corridor (N: Dorm D, SanFac D; S: Dorm C, SanFac C). East: *long hall, 160 ticks*, to the east end.

**East end:** Corridor Junction. East to Elevator Lobby (N: blue door, Upper Elevator, card slot; S: red door, Lower Elevator, card slot, slow to arrive; E: Booth 2 teleporter, "not activated"). Junction north to Admin Corridor South (E: SanFac E), then Admin Corridor (rift to N; W: Systems Monitors). Junction south to Mech Corridor North (E: Storage East — oil can, parts box; W: Physical Plant NE door), Mech Corridor (E: Reactor Control — button/door to Reactor Elevator, card slot; dark stairs down, grue; W: Physical Plant SE door), Mech Corridor South (S: Machine Shop with dispenser; SE: Robot Shop, Floyd; SW: Tool Room — flask, U-bar, pliers, laser).

### Friction log

| # | Attempt / cmd | Where | What happened | Why it hurt | Suggested fix |
|---|---|---|---|---|---|
| 1 | A1 c3; A3 c88, c117 | ID card, Systems Monitors, Machine Shop | Literal pipe characters in text ("STELLAR PATROL / Special...", "north, east, and west. / / Standing...") | Reads as a rendering glitch | Render as line breaks |
| 2 | A1 c4-c14, A2 | Deck Nine / Lobby / Deck Eight | Blather's arrival speech repeats verbatim every time (5+ times across attempts) | Breaks the illusion; the rest of his lines vary well | Two or three arrival variants |
| 3 | A1 c17 | Deck Eight | `hit blather with brush` gives "You can't see any blather brush here!" | Parser fuses "X with Y" into one noun; error blames a nonexistent object | Parse VERB NOUN with/about NOUN; on failure say "I don't understand that sentence" |
| 4 | A1 c18 | Deck Eight | `attack blather` kills you instantly; turn counter doesn't advance | Fine as a joke; the turn not advancing is odd | Cosmetic |
| 5 | A2 c12-c14 | Deck Nine | Pod door opens silently when you arrive a turn after the explosion; "It's already open!" then it shuts; then "Too late" | One-action window with no message — a fair player dies | Print "the pod door slides open" on arrival, or in the bulkheads-shut event |
| 6 | A3 c26 | Escape Pod | `take all` gives "You can't see any all here!" | No `all`, and the error treats it as a noun, during a timed sequence | Support `all`, or say "One thing at a time" |
| 7 | A3 c18-c19 | Escape Pod | Two silent `wait` turns mid-cutscene | Player second-guesses whether to act | Filler line ("the pod continues its descent") |
| 8 | A3 c45-c52, c154-c206 | Dorms A-D, SanFacs A-E | Four identical dorm texts, five identical toilet texts, all empty | About 20 commands of budget to confirm nothing is there; copy-paste erodes trust | One dorm plus "the others are identical", or put one small thing in one of them |
| 9 | A3 c56, c88-c91, c105, c118, c176-c177 | various | `examine` gives "nothing special" for padlock, dispenser, pliers, U-bar, fluid; "too complicated" for equipment and reactor dials | The nouns with the most careful adjectives get the least examine text; costs 32 ticks each | One sentence per named object, even if it's flavour |
| 10 | A3 c71-c73, c109, c227-c228 | Three elevators | `push up/down button` gives "Nothing happens." with a slot right there | Can't tell "no power" from "need card" from "top floor" | "The panel beeps and the slot lights up" or similar |
| 11 | A3 c79-c83, c224-c225 | Elevator Lobby | Red door: "begins vibrating a bit", never opens in 3 turns; found open ~1800 ticks later via `examine`; brief-mode arrival didn't mention it | A working lock looked broken; then its success was invisible | Announce the door opening with a `>>` event, or show door states in brief mode |
| 12 | A3 c125 | Robot Shop | `turn on robot` gives "Nothing happens." but score +2; robot wakes next turn | Reply contradicts the score; a player who trusts the text walks away | "The robot's eyes flicker" |
| 13 | A3 c127 | Robot Shop | `floyd, follow me` gives "I don't know the word 'floyd'" right after `examine floyd` worked | Comma-address form unsupported and error blames the noun | Support "NAME, verb" or reply "Floyd doesn't take orders" |
| 14 | A3 c135, c162 | Tool Room, West Wing | `shoot wall with laser`, `ask floyd about water` give "can't see any wall laser / floyd about water" | Same bug as #3; makes Floyd un-askable | As #3 |
| 15 | A3 c148, c234 | Mess Corridor, Lower Elevator | `oil padlock` gives "doesn't need oiling"; `oil floyd` gives thanks; oil can has no discovered use in 140 turns | Item with no nudge | Fine if there is a use later; otherwise a hint |
| 16 | A3 c151-c152, c183-c185, c194 | Mess Corridor | `unhook`, `cut`, `pry`, `use`, `squeeze` all unknown; `open padlock` gives "can't open it with your hands"; `open padlock with pliers` gives "can't see any padlock pliers" | **The game tells me to use a tool and the parser cannot accept the sentence.** Biggest blocker of the run | Fix #3; also accept `cut/pry padlock` if that is the solution |
| 17 | A3 c155, c188-c189 | Dorm D | `examine bunks` gives "You can't see any bunks here!" in a room "lined with multi-tiered bunks"; later `sleep` says "sleep in beds" and `get in bed` works | Room noun differs from parser noun | Add "bunk(s)" as a synonym of "bed" |
| 18 | A3 c188-c191 | Dorm D | `sleep` standing gives "Civilized members... sleep in beds"; then `get in bed`, `sleep`, `wait` | Four commands to sleep | Let `sleep` in a dorm imply the bed |
| 19 | A3 c191-c212 | Dorm D to Junction and back | Sleeping puts every carried item (including the ID card *inside the uniform*) on the floor silently; brief-mode wake text doesn't list them; discovered 20 commands and 340 ticks later | Player believes inventory is lost or the game is bugged; long backtrack | Line at bedtime or waking, or full room description on waking |
| 20 | A3 c209 | Junction | "weak and slightly flushed, but you're not sure why" | Fourth clock (hunger/thirst, sleep, now illness) with no lead on a cause or cure, arriving as food runs out | Fine as a slow reveal, but pace the clocks against the supplies |
| 21 | A3 c213 | Dorm D | `eat green goo` with the kit on the floor gives "You're not holding the survival kit." | Extra hoop | Implicit take |
| 22 | A3 c243-c245 | Rec Area | Flask fluid vanished with no message | Third silent state change | Message when it evaporates or is spilled |
| 23 | A3 c66 onward | Long hall | 160-tick walk, traversed five times; layout puts tools east, locks and beds west | A great idea once; a tax thereafter | Make the walkway fixable early, or add a shortcut |
| 24 | A3 c81, c163, c209 | various | Hunger message says "hungry and thirsty" but only food is ever available; no water found anywhere (canteen can't be filled at the dispenser) | Unclear whether thirst is real | Either drop "thirsty" or put water somewhere reachable |
| 25 | A3 c119 | Machine Shop | `examine machines` answered about the dispenser | Minor noun collision | Separate scenery noun |
| 26 | A3 c197-c201, c240-c242 | Rec Area | Dial 0-1000; no number found anywhere reachable; games and tapes beside it give jokes only | A puzzle whose key may be behind another lock, with no signal either way | A nudge toward where the number lives |

### Report

**What I was trying to do.** Survive the destruction of the Feinstein, reach the planet, and then find out what the abandoned complex on the plateau is for and why its systems are failing. By the end I had a clear picture of the *story* — a drowned world, a sealed-off complex whose Systems Monitors list four broken subsystems (Planetary Defense, Planetary Course Control, Communications, Project Control) — and a clear list of *locks*, but I could not open a single one of them.

**The path I found.** Attempt 1: explored the ship, discovered Blather blocks every exit, punched him, died. Attempt 2: learned the explosion timing, arrived at the pod a turn late, and died because the pod door's opening is never announced to someone entering the room. Attempt 3 (245 commands, 10 points): waited at my post, got the "door to port slides open" line, entered the pod, rode the automated landing, grabbed the towel and kit as the pod sank, swam up to the Crag, climbed to the Balcony and decoded the phonetic plaque (the game's best moment), then mapped the whole complex: castle, rec area, four dorms and five sanfacs, mess hall, the 160-tick long hall, elevator lobby with three card-locked elevators and a dead teleporter, the admin wing with its earthquake rift and the Systems Monitors, and the mechanical wing with Storage East (oil can, parts box), Reactor Control (card elevator, grue-dark stairs), the Machine Shop (a chemical dispenser), the Robot Shop (Floyd), and the Tool Room (flask, U-bar, pliers, laser). I woke Floyd (+2), fired the laser (+2), filled the flask from the dispenser, slept through a night in Dorm D, and ate all three rations.

**Where I got stuck and why.** Every remaining exit is gated: a combination dial (0-1000, no number found; 40 and 314 tried), a padlock (laser at max setting only warms it; the "old battery" and Floyd's battery-fretting say it's underpowered), a card-reader door in the Mess Hall and slots in three elevators and the teleporter (my Patrol ID is rejected everywhere; no other card found), a pitch-black stairway (no light source), an eight-metre rift, and a teleporter that is "not activated". I found more tools than problems I could reach — pliers, U-bar, fuses, a bedistor, a cracked board, an oil can — but the one tool-on-object action the game explicitly invited ("You can't open it with your hands") was impossible to type, because the parser fuses "open padlock with pliers" into a single noun. I ran out of food on day two with an unexplained "weak and flushed" status, and I stopped at 278 total commands with nothing sensible left to try that didn't need a card, a number, a battery, or a working preposition.

**Biggest points of confusion.**
1. *The "VERB NOUN with/about NOUN" parser failure.* It bit five times (`hit blather with brush`, `shoot wall with laser`, `ask floyd about water`, `open padlock with pliers`, and the comma form `floyd, follow me`), and the error message ("You can't see any padlock pliers here!") sends the player looking for an object instead of rephrasing. `play with floyd` and `give laser to floyd` work, so the bug is specific to the direct-object-plus-preposition shape — which is exactly the shape every tool use and every NPC question takes. This single issue turned Floyd into decoration and made the padlock unsolvable.
2. *Silent state changes hidden by brief mode.* The pod door opening (fatal in Attempt 2), the red elevator door having opened while I was away, the sleep mechanic dumping my entire inventory (including the ID card from inside my uniform) on the floor, and the flask emptying — none announced. The sleep one cost me twenty commands of backtracking and, for a few turns, my trust in the game.
3. *"Nothing happens" that isn't nothing.* `turn on robot` scores two points and says "Nothing happens"; the elevator buttons say "Nothing happens" with a slot beside them; the red button "begins vibrating" and then apparently does nothing for three turns. The phrase is doing three different jobs and I can't tell which.
4. *The dial door with no number.* 0-1000 and no numeric clue anywhere I could reach; the two obvious scenery objects beside it (games, tapes) give jokes. I don't know if the number is behind a lock or in a place I skipped, and the game gives no sense of which.
5. *Survival clocks outrunning the tools to manage them.* Hunger-and-thirst (about 1500 ticks per cycle), sleep, and a mystery illness all arrived while I had exactly three rations, no water, and no medicine, and the message keeps saying "thirsty" when nothing drinkable exists.

**What worked well.** The writing is consistently excellent: Blather's demerit escalation, the plaque's phonetic Galalingua (which made me decode the story myself — the drowned valley, the small ice cap), the phonetic signage everywhere, the automated pod sequence with a fresh paragraph per `wait`, the "even an out-of-shape Ensign Seventh Class could probably climb up" nudge, the three goo flavours, the dream, "Padlock 1, Adventurer 0", and every single Floyd line. The action-weighted clock is elegant, and using it to make the dead walkway *cost* something is a genuinely good design idea. Disambiguation prompts are free and correct. Unknown words cost no turn, which makes verb-guessing painless. The blue elevator's two-turn call, the red door's different noise, the rift's "don't jump" description, and the `>>` / `!!` event prefixes all communicate well. Floyd following, wandering off, and coming back on his own schedule gives him a life, and he doubles as an extra inventory slot (he takes and returns items freely), which matters given how tight the weight limit is.

**What I would change.** (1) Fix the preposition parse and make its failure message say "I don't understand that sentence" rather than inventing a noun. (2) Announce every door and state change with a `>>` line, and have brief mode still list doors that changed state and objects lying in the room on waking. (3) Replace "Nothing happens" with a specific tell in each of its three uses. (4) Give every named object one line of examine text, especially the ones with careful adjectives (wide-nosed, U-shaped, seventeen-centimeter). (5) Vary Blather's arrival speech. (6) Cut the dorm block to one dorm and one sanfac, or seed one of them with something. (7) Add "bunk" as a synonym for "bed", and let `sleep` in a dorm imply the bed. (8) Put a nudge somewhere toward the dial number and toward water, or drop "thirsty" from the hunger line. (9) Either make the long hall's walkway repairable early or make the fix findable on the first pass; five 160-tick traverses in one session is too many.

#### Verdict

This is a remake with a superb script and a solid world that is currently being undercut by its parser and by what it doesn't say. The first hour is a delight; the second hour is spent walking a very long corridor between locks I can see but not open, and the single sentence the game *told* me to type ("use a tool on the padlock") is one it cannot read. Fix the "with/about" parse and the silent state changes, and I think a blind player gets through the padlock and the sleep night without ever feeling cheated — and then the four red monitors in the Systems room become the to-do list they're clearly meant to be. As it stands: 278 commands, three lives, 10 points, one plaque I will remember, and one padlock I'll be thinking about for a while.
