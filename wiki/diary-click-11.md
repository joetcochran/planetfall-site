# Round 11: click-11, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [Rounds ten and eleven](playing-it.md#rounds-ten-and-eleven), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 11, 11 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the start (Deck Nine, turn 0), in 3 legs
- **Result:** Did not win. Where play ended: Infirmary, turn 433, with 49 points.
- **Commands:** 1,014, with 6 deaths

**About the numbers.** Leg 2 was a restart from the beginning after leg 1 drowned at 15.

The diary below is `playtests/2026-09-11/2026-09-11-click-11.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Round eleven, click-only session `click-11` — `node scripts/playtest.mjs --session click-11 --new --click`

Mouse-only player. I may only press numbered options that are on screen this turn; I never type a
free-text command. Continue with `node scripts/playtest.mjs --session click-11 <number>`.

### Leg 1 (commands 1-~350)

#### Turns 1-14: the Feinstein, and Blather as a wall

Opening screen is generous: Deck Nine gives me `1 go east`, `2 go west / in`, `3 open escape pod
bulkhead`, `4 examine escape pod bulkhead`, `5 go up`, plus `look / inventory / wait / diagnose /
save` and the stairway and escape pod as scenery entries. Carried things are 100-series numbers with
a `…` that opens their verb list. The numbering contract ("a number keeps its meaning for the rest of
the game… the room's options in that room") is explained in the footer and did hold up all leg — but
it means `1` is "go east" on Deck Nine and "go south" in the Reactor Lobby, which I mis-stepped on
twice later.

Opening the pod bulkhead got the right in-fiction refusal: "Why open the door to the emergency escape
pod if there's no emergency?" That immediately summoned Blather with thirty demerits. His `104 …`
list is `examine, talk to, salute, attack, listen to`; `104 salute` earned "First right thing you've
done today. Only five demerits." Good — the click list surfaced a verb (salute) I would never have
guessed I could type.

The intro says I am scrubbing the deck with a "Patrol-issue self-contained multi-purpose scrub
brush". The brush's verb list is exactly `examine, drop`. There is no way to scrub, polish or clean
anything, ever. The one activity the game opens by describing is not on the menu. Harmless, but it is
the first thing a new player will reach for.

`103 read` on the ID card: "STELLAR PATROL / Special Assignment Task Force / ID Number:
6172-531-541" plus "A dark magnetic stripe runs along the back." Filed the number away; it never
turned out to matter this leg.

Wandering east to the Reactor Lobby brought Blather back, and from then on every exit answered
"Ensign Blather blocks your way, snarling angrily." Notably *blocked moves cost no turn* — turn
counter and clock both froze — so flailing at a herding NPC is free. Good.

The alien ambassador from Blow'k-bibben-Gordo turned up on Deck Nine, handed me a brochure (`107
read` = the Meretzky in-joke) and dropped a "piece of celery" into the room listing. The celery is
printed under **In the room** with a single option, `16 examine`, and the examine is the default "I
see nothing special". There is no `take`. If a thing is listed as being in the room, a click player
reads that as "you can have this"; here it is decoration the ambassador is eating.

Two `8 wait`s after Blather's second visit and he "moves off in search of more young ensigns to
terrorize", which unlocks the ship.

#### Turns 15-29: the explosion and getting off

Walking back into the Reactor Lobby fired the explosion. Back on Deck Nine the emergency bulkheads
crashed shut — and the exits menu still read `1 go east, Reactor Lobby` and `5 go up, Gangway`, with
the two shut bulkheads added only as *examine* entries (`19 examine wide bulkhead`, `20 examine
narrow bulkhead`). Pressing `1` said "The wide bulkhead is closed." for free. So the menu keeps
offering doors it knows are shut, with the destination name still helpfully attached. In text you'd
type into the dark and learn the same thing; on a button list a dead button that looks live is worse.

`14 get in` on the escape pod: +3, score 3. `11 get in` the safety web, then the pod launched and the
Feinstein blew up. The window in the escape pod, during the single most dramatic view the game will
ever offer, examines as "I see nothing special about the window." Same for the escape pod itself.

Also odd while inside the pod: the room list contains `escape pod: 14 examine · 15 get in` — an offer
to get into the thing I am standing in.

Landing takes about nine `wait`s with set-piece text every turn or two (gyroscopes, atmosphere
buffeting, ocean, the island with a plateau of buildings). Two of those turns printed nothing but
"Time passes...", which in click mode feels like the game stalled — there's no other button that
looks productive while strapped into a web.

#### Turns 30-37: the take-while-webbed trap

The pod lands and "a previously unseen panel slides open, revealing some emergency provisions,
including a survival kit and a towel." `4 look` lists them under **In the room**:

```
    towel: 19 examine · 20 read
    survival kit: 21 examine · 22 open · 23 look inside · 24 search
```

No `take`, and no `take all` button either. I genuinely did not know whether the towel was takeable
at all. It turns out the game is suppressing take because I'm still strapped into the safety web:
the moment I pressed `17 get out of the safety web`, `25 take all`, `26 take` (towel) and `27 take`
(kit) all appeared at once — and that same turn the pod slipped off its ledge into the ocean and
started flooding. So the click list hides the take verb exactly until the moment you're on a timer.
A player who read "no take button" as "not takeable" leaves the towel behind.

`25 take all` grabbed both. `18 go up / out` → "The pod door is closed."; `2 open escape pod
bulkhead` → "The bulkhead opens and cold ocean water rushes in!"; `18` again swam me out. Underwater
the exits read `1 go north, Underwater · 2 go south, Underwater · 3 go west, Underwater · 4 go up ·
5 go down, Underwater` — four of the five labelled with the destination room name, which quietly
tells me they all loop back to the same drowning room and that `4 go up`, the only unlabelled one, is
the way out. Convenient, but it is the menu solving the panic for me.

#### Turns 38-58: the island, and the first three locks

`4 go up` → **Crag**, +3, score 6. Opening the survival kit (`111 open`) reveals a blob of red goo, a
blob of brown goo and a blob of green goo, each with an `eat` option. Food, presumably rationed.

Up the cliff: **Balcony** (a plaque in corrupt Galalingua — "SEENIK VISTA … Xis stuneeng vuu uf xee
Kalamontee Valee kuvurz oovur fortee skwaar miilz…", i.e. a scenic overlook of a valley that is now
open ocean, so the sea rose a long time ago) → **Winding Stair** → **Courtyard** of a ruined castle →
**Plain Hall** → **Rec Area**.

Rec Area has the first real puzzle: "a door which is closed and locked. A dial on the door is
currently set to 0." The click affordance is excellent — `13 set to a number <value>`, and `12
examine` says "The dial can be turned to any number between 0 and 1000." So the interface tells me
the search space is 1001 wide and hands me a two-number entry form. I have no number yet.

East of Rec Area: **Rec Corridor**, with **Dorm B** → **SanFac B** north and **Dorm A** south. The
dorms and sanitary facilities are literally identical prose, four of each; I checked B and D and
stopped bothering. East again: **Mess Corridor**, where a north door is "hooked with a simple steel
padlock". The padlock's only option is `13 examine` ("It has a keyhole on its underside"); `2 open
door` says "The door cannot be opened until the padlock is removed." There is no unlock/remove verb
on offer, so the padlock is a flat wall until I find something — presumably a key — that grows one.

South: **Mess Hall**, with a canteen (`12 take`) and "a small slot" beside a south door. The instant
I entered, my carried ID card sprouted a new option, `119 slide through slot`. That is the best thing
the click layer has done so far: a verb that appears on the right object in the right room. It
answered "Inkorekt awtharazaashun kard...akses deeniid." So: I need a different card.

One wrinkle: I pressed `12 take` on the canteen, then `14 look inside canteen` from the same printed
list, and got "Option 14 ("look inside canteen (canteen)") is not on screen now: something has
changed. Look at the list again." Taking an object silently retires its in-room option numbers and
reissues it as a 100-series carried entry (canteen became `120 …`). The error text is clear enough,
but it costs a turn of confusion each time, and the promise that "a number keeps its meaning for the
rest of the game" is exactly what it violates.

#### Turns 59-83: the long corridor and two more slots

East of Mess Corridor: **Dorm Corridor** (Dorms C/D, a dead motorised walkway) and then a long east
walk — "You walk down the long, featureless hallway for a long time" — to **Corridor Junction**, then
**Elevator Lobby**.

The Elevator Lobby is a nicely legible click room: a blue door north with `13/14` blue button, a red
door south with `15/16` red button, a booth east. Pushing `14 push blue button` gives "a faint
whirring noise from behind the blue door"; trying `1 go north` while it's still shut costs no turn
and, crucially, *adds a button*: `19 wait for the elevator`, which waits repeatedly until the door
opens and prints each "Time passes..." That is a genuinely good click-mode affordance — the kind of
multi-turn compound the mouse player otherwise can't express.

Both elevators (**Upper Elevator** through the blue door, **Lower Elevator** through the red) have
"an Up button, a Down button, and a narrow slot". `14 push down` → "Nothing happens. The slot beside
the buttons stays dark." `119 slide through slot` with my Patrol ID → same "Inkorekt awtharazaashun
kard" refusal. Three locks now — dial, padlock, card slot ×3 — and nothing yet to open any of them.

Currently in the Lower Elevator, evening, score 6, turn 83.

#### Turns 84-100: booth, admin wing, and being told when to eat

`5 go east / in` from the Elevator Lobby is **Booth 2** — "a large '2' painted on the wall", a slot
ten centimetres wide, a brown button "1" and a tan button "3". `11 push brown button` →
"Teleportaashun buux not aktivaatid." A fourth lock. So far the complex answers every control with a
different flavour of "not yet".

North of Corridor Junction: **Admin Corridor South** (a jagged crevice in the floor), **SanFac E**
(dead end), **Admin Corridor** — "rent apart… by seismic upheaval… To the north is a gaping rift, at
least eight meters across and thirty meters deep." `1 go north` → "The rift is too wide to jump
across." West of that is **Systems Monitors**, the first place that tells me what the game is *about*:

> the ones labelled LIIBREREE, REEAKTURZ, and LIIF SUPORT are green, but the ones labelled
> PLANATEREE DEFENS, PLANATEREE KORS KUNTROOL, KUMUUNIKAASHUNZ, and PRAJEKT KUNTROOL indicate a
> malfunctioning condition.

Library, Reactors, Life Support good; Planetary Defence, Planetary Course Control, Communications and
Project Control broken. That is my to-do list. Very well done — one room that converts "wander a
ruin" into "fix four systems".

The nicest surprise this stretch: arriving in Admin Corridor South, a **new button appeared in the
Buttons row — `9 eat the blob of red goo`**. That is the interface telling me I'm hungry without a
status bar. `7 diagnose` confirmed "You seem to be fairly thirsty and hungry." Eating the red goo:
"Mmmm...that tasted just like scrumptious cherry pie. It was moist enough to quench your thirst,
too." One goo covers both needs and I started with three. I like the suggestion button a lot; it is
the one mechanic a mouse player would otherwise have no way to discover.

The canteen is the counter-example. `120 …` on it is `examine, drop, open, look inside, search` —
there is no **drink** and no **fill**. It's empty ("The canteen is empty"), so presumably a fill verb
appears at water. But with thirst on a real clock and the only water I've seen being the ocean I
nearly drowned in, a container whose entire point is invisible on the menu is uncomfortable.

#### Turns 101-135: the mech wing, and how the click list bloats

South of Corridor Junction: **Mech Corridor North** → **Storage East** (east) and **Physical Plant**
(west, catwalks, dead machinery) → **Mech Corridor** → **Reactor Control** (east) → **Mech Corridor
South** → **Tool Room** (sw), **Machine Shop**, **Robot Shop**.

**Storage East** is the first loot room: an oil can on a shelf and a cardboard box holding "A cracked
seventeen-centimeter fromitz board / A B-series megafuse / A K-series megafuse / A good ninety-ohm
bedistor". `6 take all` → "cardboard box: Your load is too heavy. (For the cardboard box: dropping
the Patrol-issue self-contained multi-purpose scrub brush would make enough room.)" That parenthetical
is genuinely good design: the failure names exactly which of my things to drop. Brush and brochure
dropped there.

**Reactor Control** has a door east with a button and a dark stairway down. `4 go down` →
"!> It is pitch black. You might be eaten by a grue." — and in the dark the option list collapses to
just `1 go up, Reactor Control` plus the standard buttons. That's the right call: the menu doesn't
leak what's in a room I can't see. `15 push button` opens the **Reactor Elevator**: Up, Down, and
"a small slot" again. Patrol ID refused again.

**Tool Room**: a glass flask, a curved metal bar, wide-nosed pliers, and "A small device, labelled
'Akmee Portabul Laazur'" containing an old battery. `7 take all` failed on all four at once — carry
capacity is brutally small. Two things went wrong staging a stash:

1. I dropped the cardboard box to make room, then pressed `7 take all` — and take all **picked the
   box straight back up**, wasting the drop. `take all` and `drop all` are the only bulk buttons and
   they fight each other; there is no "take all except" and nothing shows what anything weighs.
2. `18 examine laser` was on screen; I pressed `19 take laser` first, then `22 examine laser setting
   dial`, and got "Option 22 … is not on screen now: something has changed." Same renumbering trap as
   the canteen. In click mode, *taking* an object is the commonest way to invalidate the list you are
   currently reading.

The bigger structural problem arrived with the tools. The oil can adds one **`oil <thing>`** option
per visible object and the laser adds one **`shoot <thing>`** option per visible object. In the Tool
Room my carried block read:

```
    oil can: 122 … · 141 oil glass flask · 142 oil curved metal bar · 143 oil pair of wide-nosed
      pliers · 144 oil laser · 145 oil laser setting dial · 146 oil old battery · 128 oil shelf
    laser: 147 … · 148 shoot · 165 shoot id card · 162 shoot canteen · 161 shoot oil can · 149 shoot
      cardboard box · 150 shoot cracked seventeen-centimeter fromitz board · … (11 targets)
```

Eighteen option numbers for two tools in one small room, none of which I had any reason to use, and
every future room adds more.

The one genuinely excellent moment: `15 take curved metal bar` printed

> The curved metal bar swings toward the ID card and tugs at it: the bar is a strong magnet. Carried
> together any longer, it will smear the card's magnetic stripe.

An explicit, one-turn-of-grace warning about an otherwise silent inventory trap. I dropped the ID
card in the Tool Room. The laser examines as having "a dial with six settings, labelled '1' through
'6'… currently on setting 5", and its dial carries `159 set to a number <value>` — so the mouse
player gets a numeric entry widget for both the laser and the Rec Area door dial.

**Tool Room stash (turn 133, night): cardboard box + 4 electronic parts, oil can, empty canteen, ID
card. Storage East: scrub brush, brochure. Robot Shop: curved metal bar (magnet).**

#### Turns 136-141: the dispenser and the robot

**Machine Shop** holds a chemical dispenser with a spout and nine buttons: "KUULINTS 1 - 4" (red,
blue, green, yellow), "KATALISTS 1 - 3" (gray, brown, black), a square white "BAAS" and a round white
"ASID" — nine live `push` options. I have nothing to catch a chemical in; the glass flask is back in
the Tool Room because I couldn't carry it. The room prose also mentions "a variety of unusual
machines" which have no entry in the object list at all.

**Robot Shop**: "Only one robot, about four feet high, looks even remotely close to being in working
order", offering `9 examine · 10 search · 11 turn on`.

- `11 turn on` → "Nothing happens. Then again, you notice a faint hum from somewhere inside the
  robot." **+2, score 8.** Scoring on an apparent non-event is a good nudge that I did the right thing.
- `10 search` → "In one of the robot's compartments you find and take a magnetic-striped card
  embossed 'Loowur Elavaatur Akses Kard.'" **+1, score 9.** The magnet warning fired again instantly
  on the new card — consistent, and it has now saved a card twice. Bar dropped in the Robot Shop.

The robot's description says "Several compartments are set into its casing, their catches unfastened",
but there is no `open compartments`; `search` is the only way in, and I only pressed it because it
happened to be on the menu.

Heading for the Lower Elevator with the card. Night, score 9, turn 141.

#### Turns 142-165: Floyd, and the numbering contract breaking

Back in the Elevator Lobby I pressed `19`, which had been `wait for the elevator` in that room 60
turns earlier, and got: *"Option 19 ("examine gray button (gray button)") is not on screen now:
something has changed."* The gray button is a **chemical dispenser button in the Machine Shop**. So
number 19 has two meanings in two rooms, and the disambiguation message quotes the *other* room's
meaning at me. The footer's promise — "A number keeps its meaning for the rest of the game" — reads
as global and isn't.

The same screen also showed **Floyd** had followed me across half the complex. His block is huge and
is the best thing in the click layer:

```
  Floyd: 181 … · 182 look inside · 183 turn off · 184 throw at… · 186 ask to go in · 187 ask to go
    north · 188 ask to go south · 189 ask to go west · 190 ask to go east · 191 ask about…
```

`181 …` = `examine, talk to, salute, attack, listen to, search`; `191 …` opens "Ask Floyd about:
Floyd, yourself, towel, survival kit, lower elevator access card, pair of wide-nosed pliers, laser" —
i.e. exactly my carried objects, plus him and me. `191 Floyd` → "Floyd is B-19-7, multiple purpose
robot! Floyd is very good at Hider-and-Seeker. Also fixing things. Mostly Hider-and-Seeker."
`191 yourself` → a rib-cracking hug.

Two things the menu can't do, though, and Floyd asks for both repeatedly:

- `190 ask Floyd to go east` → "You know me and my sense of direction." Then he looks up at you with
  wide, trusting eyes. **"Tell Floyd a story?"** There is no `tell story` option anywhere.
- `191 laser` → "Floyd doesn't know much about that. **Want to play Hider-and-Seeker instead?**"
  There is no `play` option on Floyd either.

An NPC who asks you two direct questions you have no button to answer is the loudest "the mouse
player is a second-class citizen" moment so far. `185 ask to follow you` also flickers: it was on the
list in the Waiting Area at turn 155 and gone at turn 157 with Floyd still standing there, so I
pressed a number I had just read and got the "not on screen now" error.

`192 slide through slot` with the **lower elevator access card** → "A recorded voice chimes 'Elevator
enabled.'" `14 push down`, then `15 wait for the elevator` (which again appeared exactly when useful,
and narrated four turns of Floyd being Floyd) → **Waiting Area** at the bottom of the shaft, then
**Kalamontee Platform** (+4, score 13) and **Shuttle Car Alfie** with control cabins east and west.
Each cabin has a slot, a lever (+ / centre / -) and a display reading 0. `11 push lever` → "Shuttle
controls are not currently activated", and the lower elevator card is refused there. Another lock.

#### Turns 166-200: sleeping, and the inventory vanishing

Back up top, the game started suggesting things in the Buttons row again — in the West Wing the row
read `… 6 drop all · 7 sleep · 8 eat the blob of brown goo · 9 save`. Two needs surfaced as buttons
at once. That is the right way to do it for a mouse player.

I walked to Dorm B, `10 get in` the bed ("Ahhh...the bed is soft and comfortable"), `12 sleep`, then
waited. I got the Ramos Two pub dream and woke at **morning, time 1704** (the clock wraps), well-fed
and well-rested.

Then, four rooms later in the Mess Corridor, the carried block read only:

```
  Carried:
    chronometer (worn): 101 …
    Patrol uniform (worn): 102 …
```

**Falling asleep had dumped my entire inventory on the floor of Dorm B** — towel, survival kit with
the last goo, lower elevator access card, pliers and laser. At the time I thought this was silent;
checking the transcript afterwards, the wake-up paragraph does contain one line, "While you slept,
the things you were carrying slipped to the floor beside you", buried between the dream, a
`***** SEPTEM 7, 11344 *****` date stamp and Floyd bouncing at the foot of the bed, and the items are
re-listed in the room. So the game says it — once. What makes it bite in click mode is that there is
no persistent inventory anywhere (the status line is `room · time · turn · score` only), so the next
signal is a suspiciously short options list several rooms later. I verified the bed itself is not the
culprit: `10 get in` again and `4 inventory` shows everything still carried.

#### Turns 201-238: the laser, the padlock, and running out of food

`31 take all` recovered everything. Then the one piece of real progress: in the Mess Corridor the
laser's generated list contained `201 shoot padlock`.

> The laser emits a narrow blue beam of light which strikes the padlock. The padlock grows a bit
> warm, but nothing else happens.  **[+2 points · score 15]**

Scoring on a *failed* action is a strong, well-judged signal: right idea, wrong power. `159 6` set
the dial to its maximum ("The laser emits a narrow violet beam") and the padlock still only got warm,
so the "old battery" in the laser is the thing to replace. I have not found a battery.

Everything else I tried bounced:

- `181 search` / `182 look inside` Floyd → "You're tickling Floyd!" both times, identical text.
- `110 read` towel → "S.P.S. FEINSTEIN / Escape Pod #42 / Don't Panic!" (nice).
- `101 examine` chronometer → it just reports the same clock the status line shows.
- Rec Area `15 play games` → "Okay. Gee, that was fun." Nothing.
- Reactor Access Stairs, now with Floyd in tow, is still "It is pitch black. You might be eaten by a
  grue." and still offers exactly one exit, `1 go up`. No light source exists that I have found.
- SanFac A/C/E are byte-identical filler; so are Dorms A-D.

And the survival kit is empty. The game's hunger nudges were friendly the whole way — a `eat the
blob of X goo` button appearing in the Buttons row, and at one point the explicit "!> A growl from
your stomach warns that you're getting pretty hungry and thirsty. !> The goo in your survival kit
would take care of both." — but I have now eaten all three blobs and there is no food or water in any
room I can reach. The canteen still has no `fill` verb. Every remaining route is locked:

| lock | where | what it wants |
|---|---|---|
| combination dial 0-1000 | Rec Area, north door | a number I have no clue for |
| steel padlock | Mess Corridor, north door | a key, or a stronger laser |
| card slot | Mess Hall, south door | a card that isn't my Patrol ID |
| card slot | Upper Elevator | an upper elevator access card |
| card slot | Reactor Elevator | some reactor card |
| card slot + lever | Shuttle Alfie, both cabins | shuttle activation |
| 10cm slot + buttons 1/3 | Booth 2 | "Teleportaashun buux not aktivaatid" |
| 8m rift | Admin Corridor | a way across |
| pitch dark | Reactor Access Stairs | a light source |

Morning, score 15, turn 238.

#### Turns 239-290: acid, the crevice, the key — and a padlock that was already ruined

Two good ideas paid off and one of them may have broken the game.

**Acid.** The Machine Shop's dispenser plus the Tool Room's glass flask. The click layer handled this
beautifully: carrying the flask into the Machine Shop made `213 put under spout` appear on it (and
`212 put under spout` on the canteen), `26 push round white button` gave "The flask fills with some
clear chemical fluid. The fluid gradually turns milky white", and the fluid then carried its own
`pour on <every visible object>` list, so in the Mess Corridor I had `228 pour on padlock` waiting for
me. That is exactly how a mouse player should meet a two-room crafting puzzle.

The result was a shrug, though: "The padlock seems to undergo some damage as a result of your action."
That reads like a generic damage fallback rather than a written response, and nothing about the
padlock changed afterwards.

**The crevice.** Admin Corridor South's `11 examine crevice` → "Lying at the bottom of the narrow
crack, partly covered by layers of dust, is a shiny steel key!" `13 take key` → "Either the crevice is
too narrow, or your fingers are too large." The wide-nosed pliers turned out to be a red herring
(`163 …` = `examine, drop`, no use verb at all). The answer was the **curved metal bar** — the magnet
that had been warning me about my cards for 150 turns. I walked back to the Robot Shop for it, and
the instant it was in my hands the key sprouted a new option:

```
    key: 12 examine · 13 take · 19 take with magnet
```

`19` → "With a spray of dust and a loud clank, a piece of metal leaps from the crevice and affixes
itself to the magnet. It is a steel key!" This is the single best click-mode moment of the leg: the
compound action I would have had to *guess* how to phrase in typed mode was simply a button, and it
appeared exactly when the prerequisite was in hand.

Then, in the Mess Corridor, `16 unlock with key (padlock)`:

> **Tsk, tsk ... the padlock seems to be fused shut.**

The padlock has a keyhole, I found the key that clearly belongs to it, and it will not open — because
something I did earlier fused it. The candidates are the acid pour and, much more likely from the
word "fused", **the laser shot the game gave me +2 points for**. I re-tried everything: `237 oil
padlock` → "The padlock doesn't need oiling"; `201 shoot padlock` again → still just "grows a bit
warm"; `2 open door` → still "The door cannot be opened until the padlock is removed"; and
`13 examine padlock` still reads "It's a sturdy steel padlock, hooked through the hasp of the door.
It has a keyhole on its underside" — **the description never mentions being fused**, so nothing on
screen tells the player what they broke or when.

If this is what it looks like, the game hands out points for an action that silently makes a puzzle
unsolvable, and there is no on-screen signal at any point. That is the finding I would chase first.

#### Turns 291-319: the dial, starvation, and drowning off a button with no label

The Rec Area dial is unguessable by brute force: `13 <n>` then `2 open door` is two turns per attempt
over a 0-1000 range, and a miss just says "The door is locked. You probably have to turn the dial to
some number to open it." I tried 42 (the towel says "Escape Pod #42") and 197 (Floyd is "B-19-7").
Both wrong. The clue must be behind one of the other locks.

By then the hunger clock had run out: "!> You're starting to feel faint from lack of food and liquid."
All three goo blobs were gone and every food route was locked. The only water I knew of was the ocean,
so I headed down the cliff stair to the Crag to try filling the canteen.

The Balcony's description had changed — "The ocean waters swirl below. **The crag where you landed
yesterday is now underwater!**" — but its exits still read exactly:

```
  Exits: 1 go up, Winding Stair · 2 go down
```

Every other exit in the game carries its destination once you've been there; `2 go down` had taken me
to the Crag yesterday and is the one exit in that room with no label. Pressing it:

> ### Underwater
> You are momentarily disoriented as you enter the turbulent waters. Currents buffet you against the
> sharp rocks of an underwater cliff. A dim light filters down from above.
> !! A mighty undertow drags you across some underwater obstructions.
> !!     ****  You have died  ****

Dead on entry, same turn, no chance to press anything. Score 15 of 80, "rank of Space Cadet", Day 2.

And then the worst interface moment of the leg. The death text says:

> Would you like to restart the game from the beginning, restore a saved game position, or end this
> session of the game? (Type RESTART, RESTORE, or QUIT.)

…to a player who has no keyboard. The option list underneath is exactly one item:

```
On screen you can: start again with --new
```

RESTORE is offered in the prose and has no button. I never pressed `save` — it is one unremarkable
entry at the end of the Buttons row in every room, with nothing ever suggesting a mouse player should
use it — so the whole run is gone.

**Leg ended here: Underwater (dead), afternoon of Day 2, score 15 of 80, turn 319, 337 commands.**
The session `click-11` is in the died state; leg 2 will have to `--new`.

#### Map and state for my successor

Surface complex (all reachable without any lock): Courtyard hub — West Wing (dead end, rubble) /
Plain Hall / Winding Stair down to Balcony and (tide permitting) Crag. North of Plain Hall: Rec Area
(dial door N), Rec Corridor (Dorms A/B + SanFac B), Mess Corridor (padlocked door N, Mess Hall S with
a card slot), Dorm Corridor (Dorms C/D + SanFacs), long walkway east to Corridor Junction. From the
Junction: north to Admin Corridor South (crevice/key), SanFac E, Admin Corridor (8m rift N, Systems
Monitors W); east to Elevator Lobby (Upper Elevator N — card slot; Lower Elevator S — opened with the
robot's card; Booth 2 E — teleport "not activated"); south to the Mech wing — Mech Corridor North
(Storage East: box of fromitz board/megafuses/bedistor, oil can), Physical Plant, Mech Corridor
(Reactor Control E: reactor elevator card slot + pitch-dark stairs down), Mech Corridor South (Tool
Room SW: flask, magnet bar, pliers, laser; Machine Shop S: chemical dispenser; Robot Shop SE: Floyd).
Below the Lower Elevator: Waiting Area, Kalamontee Platform, Shuttle Car Alfie with two control
cabins (slot + lever + display, "not currently activated").

Things worth trying next leg: **do not shoot or acid the padlock** — get the key out of the Admin
Corridor South crevice with the magnet bar first and just unlock it. Fill a canteen or flask at the
dispenser before the goo runs out. Press `save` early and often; it is the only way back from a death
in click mode.

### Leg 2 (restart; commands ~340-690)

Leg 1 died in the water below the Balcony on the afternoon of day two, score 15, and the click session
has no RESTORE button, so **this leg restarts the game from the beginning** with
`node scripts/playtest.mjs --session click-11 --new --click`. The map, the item locations and the nine
locks from leg 1 all still apply; the plan is to replay the opening fast, press `save` early, get the
steel key out of the crevice **before** touching the padlock with anything else, and spend the bulk of
the leg past the locks leg 1 never got through.

#### Commands 340-495: three deaths in the first twenty turns, then the padlock answer

The restart went badly before it went well, and the reason is worth writing down.

`10 save` on Deck Nine at turn 0 cost no turn and printed "Ok." — and the Buttons row immediately grew
**`21 restore (new)`**. So the restore button only exists *after* you have saved. That is the whole of
leg 1's row 22: the death screen had no restore because there was no save, not because the interface
refuses one. With a save in hand, the death screen reads `On screen you can: 1 restore your saved game ·
or start again with --new`, and `1` really does put you back. Saving is the difference between a
click-mode run being recoverable and being gone.

I needed it three times in twenty turns.

**Death 1 (turn 13).** The explosion sequence is three beats: "A massive explosion... The door to port
slides open" → next turn "a narrow emergency bulkhead... and a wider one... crash shut" → next turn
"the escape-pod bulkhead clangs shut." That is a **two-turn window** to board the pod, and nothing in
the click list marks it. Deck Nine goes on offering `3 open escape pod bulkhead` and `13 examine · 14
get in` on the escape pod exactly as before, and pressing `3` one turn late answers "Too late. The
pod's launching procedure has already begun." and kills you on the same turn. I lost a run to it while
reading the ambassador's chatter. Worse for a mouse player than a typist, because the pod's buttons are
sitting right there looking live.

**Death 2 (turn 34).** After the pod lands and you press `17 get out of the safety web`, the pod slides
into the sea. From that turn you have, by my count, four turns. I spent two of them on `27 take survival
kit` and `26 take towel` as separate presses — because `25 take all` would also have re-picked-up the
scrub brush and brochure I had just dropped (leg 1's row 9 again) — and then `2 open escape pod
bulkhead` printed "Between the swirling waters and the increasing pressure, it's curtains for you."
The interface offers exactly one bulk button, it is wrong here, and doing it item-by-item costs the
turns that kill you.

**Death 3** was my own fault: I batched ten `wait`s without reading them, because the opening is twelve
turns of pressing the same button. Which is itself the point — the click player's only tool during the
whole intro and the whole descent is `wait`, pressed about twenty-five times, and two of the three
places where something else is required are invisible until they have already killed you.

Also noted in passing, and the same shape as leg 1's Floyd rows: the alien ambassador **asks you
questions** — "inquires whether you are interested in a game of Bocci", "offers you a bit of celery",
"asks where Admiral Smithers can be found" — and there is no yes, no, accept or answer button anywhere.

**Then the finding this leg was sent to get.** Route: Crag (+3, score 6) → Balcony → Winding Stair →
Courtyard → Plain Hall → Rec Area → east to Mess Corridor, then east and south to the Tool Room for
`15 take curved metal bar` (magnet warning fires on the ID card again; I dropped the card in the Tool
Room), north to Admin Corridor South, `11 examine crevice` → `19 take with magnet` → steel key. Back
west to the Mess Corridor, and this time I touched the padlock with **nothing but the key**:

```
> unlock with key (padlock)
The padlock springs open.
```

So leg 1's "Tsk, tsk ... the padlock seems to be fused shut" was **caused by leg 1** — by `shoot
padlock` with the laser, the action the game awarded **+2 points** for, and/or the dispenser acid. The
padlock is not a puzzle you solve with the laser; the laser destroys it. Confirmed by a clean run.

And what is behind it matters enormously. `2 open door`, `1 go north` → **Storage West**, +4, score 10:

> On a small shelf is a large, unopened tin can. It has a plain white label which reads "Spam and Egz."
> A heavy-duty extendable ladder is leaning against the rear wall.

Food, and a ladder — with an eight-metre rift in Admin Corridor waiting for one. Leg 1 starved to death
*because* of the +2 points it had been given. That is the whole trap in one line: a rewarded action
seals the room containing the food and the bridge, the padlock's description never changes, and nothing
on screen ever says why.

(The tin can does not open yet — "you don't seem to have found a can opener yet" — and the ladder is so
heavy that `8 take all` answers "For the ladder: you'd have to drop the survival kit, the tin can, the
towel and the padlock first.")

#### Commands 496-600: across the rift, and everything leg 1 was locked out of

With the padlock open the map unfolded fast, and almost every one of leg 1's nine locks turned out to
be gated behind that one door.

**The ladder and the rift.** The ladder's `…` list is `examine, drop, open` — no "extend", no "put
across". Carrying it to Admin Corridor and pressing `open` answers "You couldn't possibly extend the
ladder while you're holding it." Only after `drop` does `15 open` work ("The ladder extends to a length
of around eight meters"), and only *then* does **`17 put across rift (new)`** appear. The final button
is excellent; the two steps in front of it are a guess-the-verb chain where the verb is called
something else ("open" meaning "extend") and the failure message names the obstacle but not the fix.

`1 go north` across it: **Admin Corridor North**, +4, score 14. Three portals: "Administraativ Awfisiz"
west, "Tranzportaashun Suplii" north, "Plan Ruum" east.

- **Small Office / Large Office.** `10 open small desk` → a **kitchen access card** and an **upper
  elevator access card**. `9 open large desk` → a **shuttle access card**. +1 each on taking them
  (score 17). Three of leg 1's nine locks, sitting in two drawers behind the padlock. Note the desks
  are `examine · open · look inside · search` — the cards only exist after `open`; `examine` alone
  tells you nothing.
- **Transportation Supply** is the second pitch-dark room ("You might be eaten by a grue"), option list
  collapsed to one exit. Still no light source anywhere.
- **Plan Room**: maps of "Kalamontee Kompleks" (here, two installations joined by a long hallway) and
  "Lawanda Kompleks" (two installations, one buried deep underground). `10 examine maps` → "Examining
  the maps reveals no new information," which is an odd thing for the game to say about the one object
  in the room that just told me the shape of the world.

**The tower.** Upper Elevator: `252 slide through slot` with the new card → "Elevator enabled", `13
push up`, then `16 wait for the elevator` (the good compound button again) → **Tower Core**, +4, score
21. Off it: **Comm Room** (northeast), **Observation Deck** (southwest), **Helipad** (up) with a rusted
**Helicopter** whose control panel answers `15 unlock lock` with "But you don't have the orange key!" —
a lock that names its own key, which is far friendlier than the padlock ever was.

**Comm Room** is the first real repair. The receive console has a blinking "Tranzmishun Reeseevd" light
and `11 push glowing button` plays the Feinstein's last transmission. The send console has a flashing
"Malfunkshun in Sendeeng Kuulint Sistum", a **funnel** labelled "Kuulint Sistum Manyuuwul Oovuriid",
and an **enunciator**: "a panel of small coloured lights: red, blue, green, yellow, gray, brown and
black. **The brown one is flashing.**" Those are exactly the Machine Shop dispenser's seven chemical
buttons. So the panel *is* the instruction.

The click layer handled the round trip well — carrying the filled flask into the Comm Room grew
`262 pour into funnel-shaped hole` on the fluid, right beside the usual five junk "pour on <console>"
entries. The pour worked:

> The liquid disappears into the hole. The lights on the enunciator panel blink rapidly and all go off
> except one, **a black light.**

…which is to say it is a **sequence**, and each chemical is a full round trip: Comm Room → Tower Core →
Upper Elevator → push down → wait → Elevator Lobby → Corridor Junction → three corridors south →
Machine Shop → put flask under spout → push button → take flask → and all the way back up. That is
about **twenty-six presses per chemical**, with up to seven colours in the panel and no way to carry
more than one flask of fluid. I fixed one step of it and had to abandon the rest for lack of turns.

En route I collected Floyd the usual way (`11 turn on` +2, `10 search` +1, score 24) and he caught up
with me in the Elevator Lobby two rooms later.

#### Commands 601-684: the shuttle is shut for the night, the kitchen works, and sleep kills you twice

**The Lower Elevator and the shuttle.** Floyd's card (`11 turn on` +2, `10 search` → "Loowur Elavaatur
Akses Kard" +1), `192 slide through slot`, `14 push down`, `15 wait for the elevator` → Waiting Area →
**Kalamontee Platform** (+4, score 28) → Shuttle Car Alfie → Alfie Control East. And then the shuttle
access card from the Large Office:

> A recorded voice explains that using the shuttle car during the evening hours requires special
> authorization.

So the shuttle is **time-gated**, not card-gated, and the refusal is the only place the game says so.
Leg 1's "Shuttle controls are not currently activated" was the same wall wearing a vaguer message. The
crossing to Lawanda needs daylight, which means it needs a night's sleep first.

**The Kitchen.** `251 slide through slot` with the kitchen access card at the Mess Hall's south door →
"The kitchen door quietly slides open", `2 go south` → **Kitchen**, +4, score 32. It holds a "Hii
Prooteen Likwid Dispensur": an octagonal niche under a spout with a button. `18 push button` on its own
just splashes protein on the floor. The click layer solved the rest properly — the dispenser carries
`15 put in…`, which lists what you are carrying, and the **canteen** (leg 1's row 11, the container
with no visible purpose) is exactly what the niche is shaped for:

```
> put canteen in dispenser unit   The canteen fits snugly into the octagonal niche...
> push button                     A thick, brown liquid spills over the CLOSED canteen...
> open canteen                    Opened.
> push button                     The canteen fills almost to the brim with a brown liquid.
```

Two good touches there: the failure when the canteen is shut describes exactly what went wrong, and the
`put in…` list is the affordance a mouse player needs. One bad one: the kitchen door **auto-closes**
behind you, so stepping out to fetch the canteen cost a second card swipe, and `2 go south / in`
silently did nothing (no turn, no message on my screen) when the door had shut.

**Sleep is the killer, and it is reported as death.** The Buttons row escalates helpfully —
`sleep (new)` → `sleep (very tired)` → `sleep (exhausted)` — which is the best hunger/fatigue signalling
in the game. But pressing it anywhere except a bed answers **"Civilized members of society usually sleep
in beds."** and costs a turn, and the suggestion stays on the row regardless. The nearest bed to the
shuttle is about eighteen rooms and two elevator rides away. Both times I ran out of clock the result
was:

> You can't stay awake a moment longer. You drop to the ground and fall into a deep but fitful sleep.
> -- Rec Corridor · night · turn 187 · score 32 · **YOU HAVE DIED** (restore your saved game, or start
> again with --new)

There is **no `**** You have died ****` banner, no score summary, no rank** — the prose describes
falling asleep, and the only thing on screen saying the run is over is the suffix on the status line
and the option list collapsing to `1 restore your saved game`. It happened twice, at turn 198 and turn
187, and both times I read it as "I fell asleep" and pressed on. That is the most bug-shaped thing I
saw this leg.

**Leg ended: Waiting Area, night of day one, turn 151, score 24 of 80, command 684.** The session is
alive (not dead) and has a save at that point, so leg 3 can `restore`. High score reached this leg was
**32**, in the Kitchen at turn 184, before the exhaustion collapse threw it away.

#### Map and state for leg 3

Everything leg 1 mapped, plus the whole north half that was behind the padlock:

- **Mess Corridor north door** → Storage West: tin can "Spam and Egz" (needs a can opener, not found)
  and the extendable ladder.
- **Admin Corridor**: drop ladder, `open` it, `put across rift` → **Admin Corridor North**. West: Small
  Office (desk holds kitchen access card + upper elevator access card) → Large Office (desk holds
  shuttle access card, and a picture window). North: **Transportation Supply**, pitch dark. East: Plan
  Room (maps of Kalamontee and Lawanda; Lawanda has an installation buried deep underground).
- **Upper Elevator** (upper card) → **Tower Core**: Comm Room northeast, Observation Deck southwest,
  Helipad up with a rusted **Helicopter** whose panel wants an **orange key** (not found).
- **Comm Room**: pour dispenser chemicals into the funnel in the colour order the enunciator flashes.
  Brown was first; after brown the panel showed **black**. Each colour is a ~26-press round trip to the
  Machine Shop and back, one flask at a time.
- **Mess Hall south door** (kitchen card) → **Kitchen**: put the canteen in the niche, open it, push the
  button — unlimited food and water. Do this early; it removes the starvation that ended leg 1.
- **Shuttle Alfie**: needs the shuttle access card *and* daylight. Sleep in a Dorm bed first.

Still unopened: the Rec Area combination dial (0-1000, no clue found anywhere yet), Booth 2's teleport
("not activated"), the Reactor Elevator slot, the two pitch-dark rooms (Reactor Access Stairs and
Transportation Supply — no light source exists that I have found), the tin can, and the orange key.

Three things leg 3 should do differently: **press save every few rooms** (it costs no turn and it is
the only recovery there is); **fill the canteen in the Kitchen before anything else**; and **never let
the `sleep` suggestion reach "(exhausted)" more than about fifteen rooms from a Dorm bed**, because the
collapse is a silent game-over.

### Leg 3 (commands ~690-1030)

Picking up the leg 2 save: Waiting Area, night of day one, turn 151, score 24, carrying nothing but the
four access cards and my worn kit. The plan, in order: **save**, walk the ten rooms to a Dorm bed and
sleep through the night before the exhaustion collapse kills me again, then in daylight fill the canteen
in the Kitchen, take the shuttle to Lawanda, and spend whatever is left on the Comm Room coolant
sequence, the orange key and the two dark rooms.

#### Commands 685-710: a clean night's sleep, and the hunger nudge that points at an uneatable blob

The restore from leg 2's save worked exactly as advertised: `--status` came back alive in the Waiting
Area and the first thing I pressed was `9 save`, which again cost no turn.

The walk up was uneventful and showed the click layer at its best. The Lower Elevator **stayed enabled
overnight** — `13 push up` worked without a second card swipe — and `15 wait for the elevator` appeared
the moment the car started moving and rode three turns in one press. Elevator Lobby → Corridor Junction
→ one `go west` that covers the whole tremendous hallway in a single turn → Dorm Corridor.

Two turns into that walk the fatigue button went `sleep (new)` → **`sleep (very tired)`**, which is the
warning leg 2 died to, so this time I obeyed it immediately. What I got first, though, was the best
piece of guidance the game has given me:

```
!> You're now really ravenous and your lips are quite parched.
!> There is still goo in the survival kit you left in Storage West.
```

**The game remembers where I left my food and tells me.** For a mouse player with no inventory pane and
no notebook that is enormous.

But when I got to Storage West the goo was not clickable. The room listed

```
    survival kit: 23 examine · 24 take · 25 close · 26 look inside · 27 search
    blob of brown goo: 28 examine
    blob of green goo: 29 examine
```

— `examine` and nothing else on either blob, no `eat`, no `take`. The `eat` only exists as a Buttons-row
suggestion, and that suggestion only appears once the **container** is in your hands: `24 take survival
kit` and the row instantly grew `39 eat the blob of brown goo (new)`. So the hint that tells you where
your food is leads you to a room where the food has no verb, and the fix is to pick up a different
object. One turn of standing there wondering, after a `!>` warning that you are starving.

Sleep itself went fine and is worth recording as the thing that works: `10 get in` the bed, `12 sleep`,
then `5 wait` — one wait and "You slowly sink into a deep and restful sleep. ***** SEPTEM 7, 11344 *****
You wake up feeling refreshed". Day two, morning, turn 172. The inventory dump happened again and again
said so in one line; `29 take all (new)` appeared in the Buttons row after `14 get out of the bed` and
recovered everything in one press. Two notes: waking does **not** get you out of the bed, and nothing on
screen says to — I burned three `wait`s in a made bed before noticing the only new button was `get out`;
and `14` is printed twice on that screen, once as `14 get out of the bed` in the Buttons row and once as
`14 get out` under the bed.

**Day 2, morning, Dorm A, turn 176, score 24.**

#### Commands 711-760: the Kitchen, the shuttle, and Lawanda — score 36

Morning of day two went to plan and the click layer carried it well.

**The Kitchen.** The canteen was still on a bench in the Mess Hall (`12 take`), `120 open`, `251 slide
through slot` on the Mess Hall's south door, `2 go south` → Kitchen, **+4, score 28**. Then the dispenser's
`15 put in…` list — the affordance that makes this puzzle clickable — `15 canteen`, `18 push button`:
"The canteen fills almost to the brim with a brown liquid." `20 take`.

And then the thing I had been waiting two legs to check. With a canteen **full of liquid** in my hands,
its verb list is:

```
> 120
Actions on canteen: examine, drop, close, look inside, search.
```

**There is still no `drink` on the canteen.** Two turns later, riding the elevator, `6 diagnose` said
"You seem to be fairly thirsty and hungry" and the Buttons row offered `18 eat the blob of green goo` —
the goo, not the canteen. Later, at the worst moment, the warning was explicit: "!> You're now really
ravenous and your lips are quite parched. !> **The goo in your survival kit** would take care of both."
So I ate my last goo on the shuttle.

**Correction, twenty turns later.** The drink verb does exist — it just is not on the canteen. In a full
options dump at Lawanda the carried block reads:

```
    canteen: 120 …
      in it: quantity of protein-rich liquid (267 …, 268 drink)
```

The **liquid** is its own object with its own number, indented one level under its container, and `268
drink` is right there. The container's `…` list never mentions it, the hunger/thirst suggestion row never
mentions it, and the warning text names the goo instead. Two legs of this session recorded "the canteen
has no drink verb" and were wrong in the same way: the one line that answers it is an indented sub-entry
that three earlier readings scrolled past. That is still a real finding — for a mouse player the
container is the thing you clicked on, the container is what the Kitchen fills, and the container's own
verb list is where you look — but it is a discoverability problem, not a missing verb.

`6 diagnose` also turned up something new on day two: **"You are a bit sick and feverish."** Nothing else
on screen mentions it, there is no button related to it, and I have no idea whether it is a clock.

**The shuttle.** This is the best-designed sequence I have played in click mode, and it needs no special
help from the interface because every control is a physical object. Alfie Control East: `253 slide through
slot` (shuttle card) → "Shuttle controls activated" — the daylight gate leg 2 hit is simply gone in the
morning. `11 push lever` starts the car; the display climbs 5 per turn; a sign reads "Limit 45"; at 45 I
pressed `12 pull` once to centre the lever and cruised; a sign reads "Hafwaa Mark -- Beegin Deeseluraashun";
`12 pull` again drops the lever to "-" and the display falls 5 per turn; countdown signs "15", "10", "5"
run in step with the readout, and the car glides into the station. Eleven of the twenty-five presses are
`4 wait`, which is the one weakness — but the signs give a mouse player exactly the information they need
and the lever is a three-state object with two buttons. I overshot the halfway sign by three turns and it
did not punish me.

**Lawanda Platform, +4, score 36** — past leg 2's peak, on turn 229 of day two.

#### Commands 761-835: Lawanda — an infirmary, a library, and four systems that all want tools

Lawanda is a much denser place than Kalamontee and most of it is legible from the menu alone.

**Lawanda Platform (+4, 36) → Escalator → Fork → Systems Corridor West**, with the **Infirmary** off it:
a red spool labelled "Simptumz uv Xe Dizeez" and a bottle reading "Dizeez supreshun medisin --
eksperimentul". `6 take all` there produced the leg's clearest capacity failure — "Oh, no. **The shuttle
access card slips from your arms** while taking the red spool and both tumble to the ground" — which is a
good message (it names the casualty) attached to a bad mechanic. I then dropped the empty survival kit to
make room and pressed `6 take all` again, and take all **picked the survival kit straight back up** and
dropped the shuttle card instead. That is leg 1's row 9 reproducing exactly, one leg later, on the object
I need to get home.

**The fix nobody points at.** The worn Patrol uniform carries `106 put in…`, and its list turned out to be
`kitchen access card, upper elevator access card, lower elevator access card` — the uniform has pockets.
Three `106 <card>` presses and `26 take all` then took everything in one go. A worn container that solves
the game's most persistent interface problem, discovered by idly pressing the `…` on my own trousers.

The Infirmary also gave the leg's one piece of pure theatre: while I read the bottle, Floyd found a rusted
robot breast plate engraved "Lazarus", stared at it, and ran out of the room sobbing. No button involved,
and none needed.

**Systems Corridor / Course Control / Planetary Defense.** Both of the broken systems the Kalamontee
monitors named are here, both diagnose themselves in plain language, and **both are blocked on a tool I
left on the other continent**:

- **Planetary Defense**: "Surkit Boord Faalyur. WORNEENG: xis boord kuntroolz xe diskriminaashun surkits."
  `10 open` the access panel reveals four seventeen-centimeter fromitz boards. `examine` on all four
  returns **the same sentence** — there is no way to tell which board failed — and `18 take` answers "You
  jerk your hand back as you receive a powerful shock from the fromitz board." Four identical buttons, one
  of which is the answer, and all four bite.
- **Course Control**: two lights, "Bedistur Faalyur!" and "Kritikul diivurjins frum pland kors". `10 open`
  the metal cube shows **a fused ninety-ohm bedistor**, and `18 take` gives "It seems to be fused to its
  socket." Storage East, back in Kalamontee, holds "A good ninety-ohm bedistor" and an oil can.

So the wide-nosed pliers leg 1 wrote off as a red herring ("`163 …` = examine, drop, no use verb at all")
almost certainly belong in one of these two rooms, and the oil can belongs in the other. Neither tool grows
a verb until it is in the room, which is the click layer working as designed — but it also means a player
who left them behind cannot tell from here what to fetch.

**The Library is the best room in the game for a mouse player.** The Library Lobby's terminal has
`19 type a number <value>` — a numeric entry widget wired straight to the game's own on-screen menu, so
navigating a six-item catalogue is exactly as good with a mouse as with a keyboard. And the Library proper
has a microfilm reader with `15 put in…`:

- red spool → "Xe priimeree simptum iz aa **hii feevur**… dex alwaaz okurz in aat tuu ten daaz." And
  `5 diagnose` had been telling me since the morning of day two, with no other hint anywhere, that "You are
  **a bit sick and feverish**." I am infected and on a clock.
- green spool → "Reekwiird ekwipmint inkluudz aa **Helikoptur Akses Kard** and aa **Kuntrool Panul Kee**.
  Xeez kan bee obtaand frum **Tranzportaashun Stoorij**." That is the orange key the Helipad asked for, and
  it is in the pitch-dark Transportation Supply room. The dark-room thread and the helicopter thread are
  the same thread.

The medicine took three presses to swallow and taught the same lesson as the canteen: `271 taste` was the
only verb on the medicine, and it answered "The bottle is closed." Only after `269 open` did the contents
grow **`274 eat`**. "The medicine tasted extremely bitter. After a few moments the fever breaks." `5
diagnose` → "You are in perfect health." No points, but it is almost certainly the difference between
finishing and not.

#### Commands 836-880: the Main Lab, and Floyd

South of the Main Lab is **Lab Storage**, which holds a pale blue lab uniform and **a fresh laser battery**
— the part leg 1 worked out it needed 600 commands ago, sitting on a shelf on the other continent. West
is the **Computer Room**, where a pile of computer output reads

```
DRUG TESTEENG:           99.985%
Proojektid tiim tuu reeviivul prooseedzur:  0 daaz, 0.8 kronz
*** ALURT! ALURT! ***  Malfunkshun in Sekshun 384! Sumuneeng reepaar roobot.
```

A three-digit number in a game with an unexplained 0-1000 combination dial in the Rec Area. I did not get
back across to try 384, but that is where I would start.

The **ProjCon Office** has a mural that "seems to ripple now and then, as though a breeze were blowing
behind it", and the mural's entire option list is `10 examine`. There is no look behind, no move, no pull.
The room text is telling a click player there is a passage there and the interface has no button for it.

**The bio lock.** `7 open bio-lock door`, southeast, `3 close bio-lock door`, east — and then `12 examine
window`, which prints "I see nothing special about the window." followed by the longest and most important
speech in the game: Floyd works out that the card needed to fix the computer is in the Bio Lab, that the
lab is full of mutations, and that he should go instead. "You open the door, then Floyd will rush in. Then
you close door. When Floyd knocks, open door again. Okay? Go!"

The whole sequence is five plain buttons and it is perfectly clickable — `2 open lab door` (Floyd plunges
in, monsters follow), `15 close lab door`, `7 wait` (three fast knocks and tearing metal), `2 open lab
door`, `15 close lab door` — and it lands as hard in click mode as it can land in any mode. Floyd
staggers out with the card, is torn apart, and the game sings him the Ballad of the Starcrossed Miner.
**+2, score 38**; `17 take` the miniaturization access card, **+1, score 39**.

One note against it, and it is the same note as everywhere else: the trigger for the entire scene is
`examine window`, whose own printed answer is the game's null message. If I had not pressed the cheapest
button in the room on a whim I would have walked into the Bio Lab myself.

Taking the card also ran the two oldest friction items back to back. `17 take` answered "Oh, no. **The new
battery** slips from your arms while taking the miniaturization access card and both tumble to the ground"
— capacity again, on the two most valuable objects I own — and once I had it, `14 read` (printed on screen
one turn earlier) gave "Option 14 … is not on screen now: something has changed."

#### Commands 881-1014: the paper in the pocket, the teleport network, and a system repaired

The last third of the leg was the game finally opening up, and almost all of it came out of one pocket.

**Radiation Lock East** is gated by a sign — "Raadeeaashun suuts must bee worn beeyond xis point" — and I
have no suit, so I stopped there. But while standing in it I pressed `276 examine` on the lab uniform I
had picked up in Lab Storage and got "The pocket is closed." `276 open`:

> You discover a small piece of paper and a **teleportation access card** in the pocket of the uniform.

`284 read` the paper: **"Kombinaashun tuu Konfurins Ruum: 330."** That is the Rec Area dial — the 0-to-1000
combination leg 1 called "a wall with no surface to grip", sitting in a coat pocket on the far continent,
two `…` presses deep on an object whose room description does not mention a pocket at all. `13 330` in the
Rec Area: "The door swings open, and the dial resets to 0." The Conference Room behind it scores nothing
and holds a round table and a third booth, but the door is no longer a wall.

**The teleport network changes the game's geography completely.** Booth 3 (Lawanda, off the Library Lobby)
and Booth 2 (Kalamontee, off the Elevator Lobby) are three presses apart: `285 slide through slot`, then
the button for the other booth. The twenty-five-press shuttle ride and the whole two-elevator walk collapse
to a single hop. Leg 2's friction row 34 — the Comm Room coolant round trip being "about 26 presses per
chemical" — is a different problem once this exists, and nothing in the game tells you so.

With that, the repair loop finally closed:

1. Teleport to Kalamontee, walk to **Storage East**, take the **good ninety-ohm bedistor** (and the oil
   can, which turned out to be the wrong idea: `298 oil fused ninety-ohm bedistor` → "doesn't need oiling").
2. Walk to the **Tool Room**, `61 put in… new battery` on the laser (the fresh battery from Lab Storage
   fits the "Akmee Portabul Laazur" in one press), take the **wide-nosed pliers** — the object leg 1 wrote
   off as a red herring because its verb list was `examine, drop`.
3. Teleport back, walk to **Course Control**, and the pliers had grown their verb: **`19 take with pliers
   (new)`** on the fused bedistor. "With a tug, you manage to remove the fused bedistor."
4. `16 put in… good ninety-ohm bedistor` → "Done. The warning lights go out and another light goes on."
   **+6 points, score 49.**

That is the click layer at its absolute best, and it is the same trick as leg 1's `take with magnet`: the
compound action appears as one button, in the right room, the moment the prerequisite is in your hands.
Two objects that had been inert junk for four hundred commands became a six-point repair without my having
to guess a single phrase.

Planetary Defense did not follow. With the pliers in hand the four fromitz boards still offer only
`examine · take`, and `18 take` still answers "You jerk your hand back as you receive a powerful shock."
No tool I own grows a verb there — which at least tells me the pliers are the wrong answer — and the only
place I have never been able to search is **Transportation Supply**, the pitch-dark room that the green
spool says holds the helicopter card and the Control Panel Key. Every remaining thread in the game (the
helicopter, the orange key, Planetary Defense, and quite possibly the sealed micro-relay inside the
computer) runs through a room that needs a light source I have not found in 1014 commands across three
legs.

**Leg ended: Infirmary, Lawanda, evening of day two, turn 433, score 49 of 80, command 1014 — alive,
saved, in perfect health, carrying the laser with a fresh battery, the pliers and the teleport card.**

### Report

**What the run reached.** Three legs, 1014 commands, and at last one leg that did not die. Leg 3 restored
leg 2's save at score 24 and finished at **49 of 80** — a 25-point gain and the first time the session has
got past its own plateau. It did everything the leg was sent to do: slept a full night in a Dorm A bunk
and woke on day two; refilled the canteen at the Kitchen dispenser; rode the shuttle to **Lawanda** in
daylight; found the **Infirmary** and cured the fever the game had quietly given me; read both microfilm
spools; ran the **Floyd bio-lab sequence** to its end; miniaturised into the computer at **Station 384**;
found the **teleportation access card** and the **Conference Room combination (330)**; and repaired
**Planetary Course Control** for +6. Score events this leg: Kitchen +4, Kalamontee Platform +4, Lawanda
Platform +4, Floyd's sacrifice +2 and the mini card +1, Strip Near Station +4, Course Control +6.

**What stopped it.** Not death and not a puzzle — the command budget, plus one hard wall. The wall is
**light**. Three rooms are pitch dark (Reactor Access Stairs, Transportation Supply, and whatever they
gate), the green spool says the helicopter's access card and Control Panel Key are in Transportation
Supply, and in three legs no light source has appeared on any menu anywhere. Planetary Defense's four
identical shocking circuit boards, the helicopter, the orange key and probably the micro-relay's sealed
casing all sit behind that one missing object. Second to that is walking: even after the teleport network
turned up, the Comm Room coolant sequence is a colour-at-a-time round trip I never had the budget to
restart.

**What the click interface did well.** Three things, and they are not small.

1. **Compound actions as buttons.** `19 take with pliers`, `34 take with magnet`, `15 wait for the
   elevator`, `17 put across rift`, `268 drink`, `61 put in… new battery`, `279 slide through slot`, the
   Kitchen dispenser's `15 put in…`, and the `type a number <value>` widget on the library terminal, the
   miniaturisation keyboard, the shuttle and the combination dial. Each is a phrase a typed player has to
   invent and a mouse player simply presses, and they appear exactly when the prerequisite is in hand. The
   bedistor repair and the crevice key were both solved *by reading the menu*, which is the whole promise
   of the mode.
2. **The suggestion row as a status bar.** `eat the blob of X goo`, `drink the quantity of protein-rich
   liquid`, `sleep (new)` → `(very tired)` → `(exhausted)`, and `!>` lines that name **which room you left
   your food in**. With no persistent inventory or status pane, that row is the only survival UI there is,
   and when it points at the right object it is excellent.
3. **It does not leak.** Dark rooms collapse to a single exit; the Bio Lab's monsters are not listed
   before you open the door; a locked slot says what it wants. The menu never spoils a room.

**The three worst friction items of the whole session**, in order:

1. **Rewarded actions that silently make the game unwinnable (rows 20 and 30).** `shoot padlock` scores
   **+2** and fuses the padlock permanently; behind that padlock are the only food in the game and the
   ladder that bridges the rift. The padlock's description never changes. A first-time player is led by
   the scoring system into an unwinnable state with no on-screen signal, ever.
2. **The exhaustion collapse reported as a death with no death message (row 31).** "You can't stay awake a
   moment longer…" and the status line silently gains **YOU HAVE DIED** — no banner, no score, no rank,
   just an option list quietly collapsing to `restore`. It happened twice and both times read as an
   ordinary sleep. This remains the most bug-shaped thing in three legs.
3. **The standing buttons have no stable numbers (rows 37, 46, 51).** `look`, `save`, `drop all` and
   `inventory` are numbered *after* the room's exits, so they shift room to room. This leg it cost me a
   turn in the Mess Hall, a turn in the Tool Room, and — in Bio Lock West — a `9` that had been `look` one
   room earlier and was `drop all` here, dumping my canteen, two access cards, the lab uniform and the
   fresh laser battery on the floor of a sterilisation chamber. The one row on screen that ought to be
   muscle memory is the one that moves, and one of its misfires is destructive.

Runners-up, both structural: **carry capacity** (row 9 — it fired five separate times this leg, twice on
the access card I needed to get home, and `take all` twice re-took the item I had just dropped to make
room) and **dead exit buttons that still advertise their destination** (rows 3, 36, 45: the Feinstein's
emergency bulkheads, the auto-closing kitchen door, the bio-lock door I had closed myself one turn
earlier).

**Bug-shaped, in order of confidence.** (1) The exhaustion collapse game-over with no game-over message
(row 31). (2) The laser-fused padlock reached through a **+2-point** action, with the padlock's
description never updating (rows 20/30). (3) `search Floyd` and `look inside Floyd` printing the identical
"You're tickling Floyd!" (row 18). (4) `examine` returning the null message on objects the room text
describes in detail — the piece of celery, the escape pod window, the speck in the micro-relay, the
blinking status light in Planetary Defense, and the Bio Lock window whose null examine is what triggers
Floyd's death scene (rows 6, 48). (5) A card inside a *carried* container losing its `slide through slot`
option while the same card in a *worn* one keeps it (row 49).

### Verdict

**Could a first-time mouse-only player finish this game? Not as it stands — but it is far closer than leg
1 suggested.** Nothing in three legs turned out to be unclickable at the moment it mattered. Every puzzle
I actually solved, I solved by reading a button list, and several of them — the magnet and the key, the
pliers and the bedistor, the ladder across the rift, the Kitchen dispenser, the shuttle, the bio lock —
are *easier* with a mouse than with a keyboard, because the interface hands you the compound phrase you
would otherwise have to invent. The two dead ends still standing at command 1014 (the light source and the
fromitz boards) are unsolved rather than proven unsolvable, and the clue I most despaired of — the 0-1000
combination — turned out to be a readable piece of paper in a coat pocket.

What would stop a first-timer is not expressiveness. It is that the game can be quietly lost, and the
click layer makes losing quieter. A typed player who shoots a padlock at least typed the word "shoot"; the
click player pressed a number in a list of thirty generated `shoot <thing>` entries and was given two
points for it. A typed player who collapses from exhaustion reads a paragraph; the click player watches
the option list shrink to one item. And the recovery from all of it — `save` — is one undistinguished
entry in a row whose number changes every room, that nothing ever suggests, and that the death screen then
asks you to reach by **typing** RESTART, RESTORE or QUIT.

**The three changes that would most improve it:**

1. **Pin the standing buttons to fixed numbers, and separate the destructive one.** `look`, `inventory`,
   `wait`, `diagnose`, `save` and `restore` should carry the same numbers in every room in the game, and
   `drop all` should not sit next to `look`. This single change removes the most frequent source of wasted
   turns across three legs and the only one that has actively destroyed my inventory.
2. **Never let a scoring action create an unwinnable state silently — and make a game-over look like a
   game-over.** If `shoot padlock` fuses the padlock, the padlock's description must say so from that turn
   on and the +2 must go; and the exhaustion collapse needs the same `**** You have died ****` banner,
   score and rank that drowning gets. Alongside that, prompt the save: one `!> You have not saved this
   session` line in the first room, and a `restore` button on the death screen instead of "(Type RESTART,
   RESTORE, or QUIT.)", would have saved leg 1 outright.
3. **Fix what the menu says about exits, and surface verbs where the player is looking.** An exit whose
   door is shut should read `go west (door closed)` or leave the list, not keep its destination label —
   three separate doors do this. And the handful of places where the needed verb exists but is out of
   sight — `take` suppressed while you are strapped into the safety web, `eat` living on the container
   rather than on the goo, `drink` two indents down under the canteen, `slide through slot` vanishing when
   a card sits in a carried rather than a worn pocket — should put the verb on the object the player
   clicked. Every one of those cost me turns I could not afford, and the first one is a timed emergency.

A fourth, if there is room: **cap the generated verb lists.** One oil can and one laser still emit an
`oil <thing>` and a `shoot <thing>` entry for every visible object in the room. That is where the padlock
disaster came from, and it buries the two or three options that matter.

### Friction log

| # | What I was trying to do | What the interface offered | What happened | Severity |
|---|---|---|---|---|
| 1 | Scrub the deck, which the intro says I am doing | brush `100 …` = `examine, drop` only | No clean/scrub/polish verb exists anywhere. The game's opening activity is unclickable. | Low — cosmetic, but it is literally the first thing a player reaches for |
| 2 | Take the piece of celery the ambassador drops | listed under **In the room** with a lone `16 examine` | No take button; examine returns the default "I see nothing special about the piece of celery." A thing printed as "in the room" that can't be taken or described reads as a bug. | Low-medium |
| 3 | Know which exits still work after the emergency bulkheads slam | Exits kept `1 go east, Reactor Lobby` and `5 go up, Gangway`, with the shut bulkheads added only as `examine` entries | Pressing them says "The wide bulkhead is closed." (free, no turn). Dead buttons presented identically to live ones, destination label and all. | Medium — click mode makes stale exits much more misleading than typed mode |
| 4 | Pick up the towel and survival kit after landing | While strapped in the safety web the two items are listed **In the room** with `examine / read / open / look inside / search` — **no take, and no `take all`** | The take verbs only appear after `17 get out of the safety web` — the same turn the pod falls into the sea and starts flooding. A player who reads "no take button" as "not takeable" strands the towel. | **High** — hides a required verb until a timed emergency starts |
| 5 | Look inside the canteen right after taking it | I pressed `12 take`, then `14 look inside canteen` from the same list | "Option 14 … is not on screen now: something has changed." Taking an item retires its in-room numbers and reissues it in the 100-series (canteen → `120`), contradicting the footer's "a number keeps its meaning for the rest of the game". | Medium |
| 6 | Look at anything scenic | `examine window` in the escape pod, `examine escape pod`, `examine piece of celery` | All "I see nothing special about the X." The pod window during the destruction of the Feinstein is the worst of these. | Low-medium — click players examine far more, because examine is always the cheapest button |
| 7 | Get out of the pod I'm standing in | Room list inside the Escape Pod contains `escape pod: 14 examine · 15 get in` | An offer to enter the container I'm already inside. | Low |
| 8 | Remove the padlock on the Mess Corridor door | padlock's only option is `13 examine` | No unlock/remove/pick verb at all. Fine if a key later grows one, but with nothing on the menu the click player cannot tell a "come back later" lock from a scenery lock. | Medium (pending) |
| 9 | Carry more than about six things | `take all` / `drop all` as the only bulk buttons; per-item `take`/`drop` buried behind each item's `…` | Capacity is tiny and nothing shows weight. After I dropped the cardboard box to make room, `take all` picked it straight back up. The two bulk buttons undo each other and there is no "take all except". | **High** |
| 10 | Read a menu that stays readable once I have tools | the oil can emits `oil <every visible object>`; the laser emits `shoot <every visible object>` | 18 generated option numbers for two tools in one small room, growing with every room entered, burying the handful of options that matter — and spending numbers that "keep their meaning for the rest of the game". | **High** |
| 11 | Drink, or fill the canteen | canteen `120 …` = `examine, drop, open, look inside, search` | No `drink`, no `fill` anywhere, while thirst is a real clock (diagnose: "fairly thirsty and hungry"). A mouse player cannot tell whether the canteen is usable at all. | Medium |
| 12 | Open the robot's compartments, which its own description points at | robot offers `examine · search · turn on` | `search` is what works; there is no `open`. Survivable only because search happened to be on the menu. | Low |
| 13 | Interact with nouns that appear only in prose | Machine Shop's "variety of unusual machines" has no object entry | In click mode an unlisted noun is invisible, so richly-described rooms read as thinner than they are. | Low |
| 14 | Keep my things through a night's sleep | `12 sleep` in a bed, then `5 wait` until I dropped off | Falling asleep dumps your whole inventory on the floor. **Corrected after checking the transcript:** the game *does* say so, once, inside the long wake-up paragraph — "While you slept, the things you were carrying slipped to the floor beside you." — and re-lists the items in the room. So not silent. It is still a click-mode hazard: there is no persistent inventory anywhere (the status line is `room · time · turn · score` only), the message is one line inside dream + date-stamp + Floyd chatter, and once you leave the room nothing ever reminds you. I walked four rooms before noticing I had lost the laser, the elevator card and my last food. | Medium (downgraded from "bug" once verified) |
| 15 | Press the number I had just read for "wait for the elevator" (`19`) in the Elevator Lobby | it had been `19 wait for the elevator` there 60 turns earlier | "Option 19 ("examine gray button (gray button)") is not on screen now" — 19 had been reissued to a **Machine Shop** object, and the error quotes that other room's meaning back at me. The footer promises "A number keeps its meaning for the rest of the game." | Medium-high |
| 16 | Answer Floyd when he asks me something | Floyd = `examine, talk to, salute, attack, listen to, search` + `ask to go <dir>` + `ask about <carried item>` | He asks **"Tell Floyd a story?"** and **"Want to play Hider-and-Seeker instead?"** repeatedly. There is no `tell story` and no `play` button anywhere, and `ask about` only lists my own inventory. The game's best character asks two direct questions the mouse player cannot answer. | **High** |
| 17 | Press `185 ask Floyd to follow you` in the Waiting Area | it was on the list at turn 155 | Gone at turn 157 with Floyd still standing in the room; pressing it gave "not on screen now". Character options flicker between turns, so a number you read one turn is dead the next. | Medium |
| 18 | Two different Floyd actions | `181 search Floyd` and `182 look inside Floyd` | Both print the identical "You're tickling Floyd!" paragraph — two distinct buttons that are the same action. | Low |
| 19 | Find food or water after the three goo blobs are gone | no `fill`, no `drink`, no food object anywhere reachable | Hunger and thirst are on a visible clock with polite warnings, but by turn 231 every remaining route is locked (nine separate locks, table above) and the kit is empty. It killed the run in the end. | Medium-high (pacing, not strictly an interface bug) |
| 20 | Unlock the padlock with the key the game clearly intends for it | `16 unlock with key (padlock)` | "Tsk, tsk ... the padlock seems to be fused shut." It was fused by an earlier action of mine — almost certainly `201 shoot padlock`, **for which the game awarded +2 points**, and/or `228 pour on padlock` with dispenser acid. `13 examine padlock` still describes it as an ordinary padlock with a keyhole and never mentions fusing, so nothing on screen tells you what you destroyed or when. Looks like a genuine unwinnable-state trap reached by a *rewarded* action. | **Highest — the likeliest outright bug of the leg** |
| 21 | Go down from the Balcony to the Crag on Day 2 | `Exits: 1 go up, Winding Stair · 2 go down` — the only unlabelled exit in a game that labels every visited destination | The tide had come in ("The crag where you landed yesterday is now underwater!" in the room text) and `2 go down` put me straight into the sea, where "A mighty undertow drags you across some underwater obstructions. **** You have died ****" fired on the *same turn*. Same button, same label, one day earlier it was safe. | **High** |
| 22 | Recover from death | death text: "Would you like to restart …, restore a saved game position, or end this session? **(Type RESTART, RESTORE, or QUIT.)**" | The only on-screen option is `start again with --new`. A mouse-only player is instructed to type three words they cannot type, and RESTORE has no button at all. `save` is one undistinguished entry at the end of the Buttons row that nothing ever prompts you to use, so the whole run is simply gone. | **High** |
| 23 | Brute-force or reason out the Rec Area combination | `13 set to a number <value>` then `2 open door` | Two turns per guess over 0-1000, and a miss only repeats "You probably have to turn the dial to some number to open it." Fine if the clue is findable, but every other route was locked, so from the click player's seat it is a wall with no surface to grip. | Medium |
| 24 | Understand what the acid did | `228 pour on padlock` | "The padlock seems to undergo some damage as a result of your action." — reads like a generic damage fallback, not a written response; nothing about the object changed afterwards. | Low-medium |
| 25 | Method note, so later legs can weigh these rows | — | I read most move results through `head`, so some long outputs were cut on my own screen before I chose the next button. I went back to the full transcript to check every "no message" claim. Row 14 (sleep) turned out to **have** a message and is downgraded. Row 21 (drowning) is confirmed: the Balcony's *description* does warn that the crag is submerged, but the exit button itself is unlabelled and death is instant on the same turn, with no warning turn. Next tester: don't truncate, and press `save` in the first room. | (method note) |
| 26 | Board the escape pod after the explosion (leg 2) | Deck Nine keeps `3 open escape pod bulkhead` and `14 get in` on the list, unchanged, before/during/after | The door opens on the explosion turn and **clangs shut two turns later**. Pressing `3` one turn late says "Too late. The pod's launching procedure has already begun." and you die that same turn, score 0, turn 13. No countdown, no changed label, no on-screen difference between the live window and the dead one. | **High** |
| 27 | Grab the towel and kit and get out of the sinking pod (leg 2) | `25 take all` (which also re-takes anything you deliberately dropped) or one `take` per item | Four turns from standing up to drowning. Two individual takes plus `open bulkhead` = dead ("it's curtains for you. Perhaps you should have left the pod a bit sooner."). The one bulk button is the wrong tool and the per-item route costs exactly the turns you don't have. | **High** |
| 28 | Recover from a death (leg 2, follow-up to row 22) | after `10 save` the Buttons row grows `21 restore (new)`, and the death screen then reads `1 restore your saved game · or start again with --new` | **Restore works and is a button — but only if you saved.** Nothing ever suggests saving, and the death prose still says "(Type RESTART, RESTORE, or QUIT.)". So row 22 is precisely: the recovery button exists and is hidden behind an unprompted one. | **High** (unchanged severity, cause now pinned) |
| 29 | Answer the alien ambassador | ambassador has no character block at all on Deck Nine | He "inquires whether you are interested in a game of Bocci", "offers you a bit of celery", "asks where Admiral Smithers can be found" — three direct questions, no yes/no/accept/answer button. Same shape as row 16 (Floyd). | Medium |
| 30 | **Open the padlock the intended way** | `16 unlock with key (padlock)` | **"The padlock springs open."** — on a clean run where nothing had been shot or poured at it. This confirms row 20: leg 1's "fused shut" was caused by `shoot padlock`, **the action the game gives +2 points for**. Behind the door is **Storage West**, worth +4, holding the tin of "Spam and Egz" and a heavy-duty extendable ladder — i.e. the game's food supply and the answer to the eight-metre rift. Leg 1 starved because of its own reward. | **Highest — confirmed unwinnable-state trap created by a scoring action** |
| 31 | Collapse from exhaustion | Buttons row escalates `sleep (new)` → `sleep (very tired)` → `sleep (exhausted)`; I was two rooms from a bed | "You can't stay awake a moment longer. You drop to the ground and fall into a deep but fitful sleep." — and the status line silently gains **YOU HAVE DIED**. **No `**** You have died ****` banner, no score/rank summary**, just prose that describes falling asleep and an option list that has collapsed to `1 restore your saved game`. Happened twice (turns 198 and 187) and both times I misread it as an ordinary sleep. | **Highest — looks like an outright bug; at minimum a game-over with no game-over message** |
| 32 | Obey the `sleep` button the game is suggesting | `sleep (exhausted)` is offered in the Buttons row of **every** room | "Civilized members of society usually sleep in beds." — it costs a turn, changes nothing, and stays on the row. The row is the game's only fatigue UI and the action it suggests is refused everywhere except four Dorm beds, which can be eighteen rooms and two elevator rides away. A suggestion button that is wrong nearly everywhere trains you to ignore the one signal that matters. | **High** |
| 33 | Bridge the rift with the ladder | ladder `…` = `examine, drop, open` | You must `drop` it ("You couldn't possibly extend the ladder while you're holding it"), then `open` it — where "open" means "extend" — and only then does `17 put across rift (new)` appear. The last button is perfect; the two-step verb hunt in front of it is exactly what click mode is supposed to remove. | Medium |
| 34 | Repair the Comm Room coolant system | enunciator flashes one colour at a time; the fluid grows `262 pour into funnel-shaped hole` when carried in | Each colour is a full round trip — Comm Room → Tower Core → Upper Elevator → push down → wait → Elevator Lobby → Corridor Junction → three corridors → Machine Shop → put flask under spout → push button → take flask → all the way back. **About 26 presses per chemical**, one flask at a time, up to seven colours. The puzzle is fine; the walking is the puzzle. | Medium-high (pacing) |
| 35 | Use the shuttle | `253 slide through slot` with the shuttle access card | "…using the shuttle car during the evening hours requires special authorization." The card is right, the time is wrong, and nothing anywhere else says the shuttle keeps office hours. Leg 1 saw the vaguer "Shuttle controls are not currently activated" and filed it as a missing item. | Medium |
| 36 | Walk back into the Kitchen after fetching the canteen | `2 go south / in` was still on the Exits list | The kitchen door auto-closes behind you; the exit button stayed, the press consumed nothing and printed nothing I could see, and the fix was a second `slide through slot`. Same family as row 3 — an exit that has quietly gone dead but looks identical. | Medium |
| 37 | Press `look` without re-reading the list | `look` is numbered *after* the room's exits, so it is `3` in some rooms, `4`, `5`, `6` or `7` in others | I pressed `3` for `look` in the Machine Shop and walked west to the Tool Room; `6` for `look` on the Crag and got `diagnose`. The six standing Buttons never keep a stable number because the exit count in front of them changes room to room — the one row on the screen that ought to be muscle memory is the one that moves. | Medium |
| 38 | Eat the goo the game's own hunger warning pointed me at | Storage West listed `blob of brown goo: 28 examine` and `blob of green goo: 29 examine` — nothing else | The `!>` warning "There is still goo in the survival kit you left in Storage West" is excellent guidance, but in the room the blobs have no `eat` and no `take`. The eat verb exists only as a Buttons-row suggestion and only once the **survival kit** is in your hands: `24 take survival kit` and `39 eat the blob of brown goo (new)` appeared the same turn. Guidance that lands you in front of an object with no usable verb. | Medium |
| 39 | Get out of bed after a night's sleep | after waking, the only new thing on the screen is `14 get out of the bed` in the Buttons row | The wake-up text ends with Floyd and a date stamp and never says you are still in the bed; the status line says `Dorm A, in the bed` but that is the same line that said it while you were asleep. I pressed `5 wait` three times in a made bed before spotting the button. Also `14` is printed twice on that screen — `14 get out of the bed` under Buttons and `14 get out` under the bed. | Low-medium |
| 40 | Drink from a canteen the Kitchen had just filled | canteen `120 …` = `examine, drop, close, look inside, search` | **Corrected mid-leg.** The drink verb is not on the canteen, it is on its *contents*, printed as an indented sub-entry: `in it: quantity of protein-rich liquid (267 …, 268 drink)`. And once the goo ran out the Buttons row did suggest `9 drink the quantity of protein-rich liquid` with the text "A drink from your canteen would take care of both." So the machinery is all there. What is wrong is the pointing: while any goo remains the warning names only the goo, the container you clicked and filled has no drink verb of its own, and the one line that answers the question is an indent two levels down a list. Three separate readings across two legs recorded "the canteen cannot be used". | Medium |
| 41 | Work out which of four identical circuit boards has failed | Planetary Defense: `17/19/21/23 examine` on the first/second/third/fourth fromitz board | All four print the identical sentence ("Like most fromitz boards, it is a twisted maze of silicon circuits…"), and all four `take` options answer "You jerk your hand back as you receive a powerful shock." Four buttons that look different, behave identically, and none of them is the next step. The tool that presumably solves it (the wide-nosed pliers, which leg 1 filed as a red herring because they had no verbs) is on the other continent, twenty-five shuttle presses away, and nothing here names it. | Medium-high |
| 42 | Take the fused bedistor out of Course Control | `18 take fused ninety-ohm bedistor` | "It seems to be fused to its socket." The oil can that presumably frees it is in Storage East in Kalamontee. Same shape as row 41: the repair rooms diagnose themselves beautifully and then need an object that has no presence on the menu until you are already carrying it. | Medium |
| 43 | Look behind the ProjCon Office mural | mural's complete option list is `10 examine` | The examine says "The mural **seems to ripple now and then, as though a breeze were blowing behind it**." There is no move, pull, look behind, open or go-behind anywhere, and the room's Exits list only north and east. The prose promises a hidden passage that the click interface cannot express. | **High** |
| 44 | Swallow the disease-suppression medicine while running a fever | medicine's only verb was `271 taste` | "The bottle is closed." Then `269 open` on the bottle, and the contents grew **`274 eat` (new)** alongside taste. Three presses and two dead ends to take a dose of medicine — and `5 diagnose` was the only thing anywhere telling me I was ill ("You are a bit sick and feverish"), with no `!>` warning, no Buttons-row suggestion and no mention in any room. | Medium-high |
| 45 | Go back west through a bio-lock door I had closed myself one turn earlier | `Exits: … 2 go west, Main Lab` — unchanged, destination label and all | "The bio-lock door is closed." A dead exit button that still advertises where it goes, exactly like row 3 (the Feinstein's emergency bulkheads) and row 36 (the auto-closing kitchen door). Three separate doors in the game do this now; it is the interface's most repeated fault. | Medium-high |
| 46 | Press `look` in Bio Lock West after that failed move | I pressed `9`, which was `look` in Bio Lock **East** one room earlier | `9` in Bio Lock West is **`drop all`**, and it dropped my canteen, both access cards, the lab uniform and the new battery on the floor of a sterilization chamber. Cost three turns to undo. Row 37's "the standing buttons never keep a stable number" is not just annoying — `drop all` and `look` land on adjacent numbers and the room decides which is which. | **High** |
| 47 | Read the card I had just picked up | `14 read miniaturization access card` was on screen the turn before | "Option 14 … is not on screen now: something has changed." Taking an object retires its in-room numbers (row 5 again). Separately, pressing `13 read` on an in-room object that has no `…` entry answers **"That is not one of the options on screen (I don't know the word "13".)"** — the error blames the number, not the action. | Medium |
| 48 | Trigger the Floyd bio-lab scene | `12 examine window` in Bio Lock East | The printed answer to that button is the game's null message, "I see nothing special about the window." — and *then* Floyd delivers the plan that is the emotional centre of the entire game. The single most important event in the game hangs off a button whose own response says there is nothing to see. | Medium (but the best argument in the game for never shipping a null examine) |
| 49 | Slide the teleportation access card I was carrying | the card was inside the (carried, open) lab uniform and its verb list was `examine, drop, read` — **no `slide through slot`** | The three cards in my **worn** Patrol uniform all showed `slide through slot` from inside their container on the same screen. So a card inside a *worn* container is reachable and a card inside a *carried* one is not, with nothing on screen saying so. I only got past it by `283 drop`ping the card, at which point the floor copy offered `20 slide through slot`. | Medium |
| 50 | Teleport a second time | Booth 3's `14 push beige button` | "Teleportaashun buux not aktivaatid." — **the same message the booths give before you have ever found the card.** The activation lasts exactly one trip; every hop needs its own `slide through slot` first. A mouse player who has already solved this puzzle once reads the identical refusal and concludes the network is broken again. | Medium |
| 51 | Press `save` in the Tool Room | `save` was `10` in the previous four rooms | `10` in the Tool Room is `examine glass flask`; `save` is `9`. Third time this leg (Mess Hall `5 look`→`go north`, Bio Lock West `9 look`→`drop all`, here). Row 37 is the single most reliable way to waste a turn in this interface, and one of its misfires is `drop all`. | **High** |
| 52 | Get a fromitz board out of Planetary Defense with the right tool in hand | carrying the wide-nosed pliers, the four boards still offer only `examine · take` | In Course Control the same pliers made **`19 take with pliers (new)`** appear on the fused bedistor the instant I walked in — the compound-verb button working perfectly. In Planetary Defense no such option appears and `18 take` still shocks you. So the menu correctly tells me the pliers are not the answer here, which is good; what it cannot tell me is what *is*, and the only untried room in the game is pitch dark. | (finding, not friction) |
