# Round 1: click-1, by mouse

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The rounds](playing-it.md#the-rounds), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 1, 10 September 2026
- **Mode:** click: numbered options only, as a mouse player
- **Start:** from the start (Deck Nine, turn 0)
- **Result:** Did not win. Where play ended: Reactor Access Stairs, turn 347, with 19 points.
- **Commands:** 376, with one death

The diary below is `playtests/2026-09-10/2026-09-10-click.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Blind click-only playtest — 2026-09-10 (session click-1, seed 7)

I have never seen this game. I am playing it as a mouse-only player: after every
turn the game shows me a numbered list of things I can click, and I may only
pick a number. No typing. This diary is written as I go.

### Attempt 1, turns 0-6: waking up on Deck Nine

The opening is charming: I am an Ensign Seventh Class scrubbing "the filthy
metal deck at the port end of Level Nine" with a "Patrol-issue self-contained
multi-purpose all-weather scrub brush", dreading the arrival of Ensign First
Class Blather. The room is "Deck Nine", a featureless corridor that "curves
away to starboard, and a gangway leads up. To port is the entrance to one of
the ship's primary escape pods. The pod bulkhead is closed." Status line:
`Deck Nine · turn 0 · time 4453 · score 0`.

Then the screen fills with **36 buttons**. My first impression as a
mouse-only player: that is a wall. And it has problems I can see before I
click anything:

- "open escape pod bulkhead" and "examine escape pod bulkhead" each appear
  **twice** (2/6 and 3/7). Presumably the door is listed once as a door and
  once as scenery.
- There are two entries I cannot make sense of: "examine transl" and "examine
  slime". Nothing in the room text mentions a translator or slime.
- Nine of the entries are "put X in Patrol uniform / put X in escape pod" —
  the pod bulkhead is closed and I have not even seen inside it, so "put
  chronometer in escape pod" is a very strange thing to be offered.
- "go in" (1) is listed separately from the door entries; I assume it means
  go into the pod.

I clicked **32 read ID card**: "STELLAR PATROL| Special Assignment Task
Force| ID Number: 6172-531-541". Fine. The time jumped from 4453 to 4471 — so
roughly 7-18 time units per action; the clock clearly matters.

I then clicked the two mystery entries. **35 examine transl** → "What
translator?" and **36 examine slime** → "What slime?". So they are phantom
buttons: the menu is offering me nouns the parser itself does not accept.
Each cost me a turn. That is my first real friction item: a click-only UI
must never show a button that the game then rejects as nonsense.

**20 examine chronometer** was lovely: "the current time is 4485. The back is
engraved with the message 'Good luck in the Patrol! Love, Mom and Dad.'" — and
right then Blather "swaggers in", sneers at my polishing, and gives me thirty
demerits. Eight new options appear for him: examine / talk to / salute /
attack / listen, plus "throw [scrub brush | chronometer | Patrol uniform] at
Ensign First Class". Being offered to throw the uniform I am wearing at my
superior officer is funny, but it is also noise.

I examined him (tremendous misshapen nose, trouser crease that "could slice
diamonds"), **saluted** — "First right thing you've done today. Only five
demerits." — and **talked to** him — "Speak when you're spoken to, Ensign
Seventh Class!" and he breaks three pencil points. "Talk to" cost no time
(turn stayed at 6), which I appreciated.

Plan: get away from Blather and explore. The gangway "up" and the corridor
east/west are the obvious exits. I want to try opening the pod bulkhead too.

### Attempt 1, turns 7-15: Blather's leash, and an ambassador

**2 open escape pod bulkhead** → "Why open the door to the emergency escape
pod if there's no emergency?" A wink from the game: an emergency is clearly
coming, and the pod is the way out. Noted.

**8 go up** → "Gangway", a steep metal gangway between Deck Eight and Nine.
The list shrank to 22 entries here (no pod, no Blather) and was pleasant to
scan. Odd entry: "get in stairway" — I have no idea what that would do.

**1 go up** → "Deck Eight": "a featureless corridor leading port and
starboard. A gangway leads down, and to fore is the Hyperspatial Jump
Machinery Room." And Blather appears instantly: "Twenty demerits ... Forty if
you're not back on Deck Nine in five seconds!"

Here is a real click-UI problem: the prose speaks in ship directions —
**port, starboard, fore** — but the buttons say **go east, go west, go
north**. As a new player I had to guess that fore = north. A compass rose
labelled with the words the text actually uses would remove the guess.

Naturally I tried to disobey. **4 go north** → "Blather blocks your path,
growling about extra galley duty." **2 go east / 3 go west** → "Blather
throws you to the deck and makes you do 20 push-ups." None of these advanced
the clock (turn stayed at 9), which is kind. So he is a leash: I cannot
explore Deck Eight while he is watching.

Went back **down, down** to Deck Nine, and the game rewarded me with a scene:
"The alien ambassador from the planet Blow'k-bibben-Gordo ambles toward you
... munching on something resembling an enormous stalk of celery, and he
leaves a trail of green slime on the deck ... hands you a brochure outlining
his planet's major exports." The option list ballooned to **52**.

**48 read brochure** → a fourth-wall joke: the leading export is "the
adventure game *** PLANETFALL *** written by S. Eric Meretzky. Buy one today.
Better yet, buy a thousand." He introduces himself as
Br'gun-te'elkner-ipg'nun. **12 examine alien ambassador** → twenty eyes, six
legs, "He speaks through a mechanical translator slung around his neck." So
THAT is what "examine transl" referred to: the translator. And "slime" is his
slime. But both buttons were on screen from turn 0, long before he existed
in the room. **52 examine slime** now works: "It looks like slime. Aren't you
glad you didn't step in it?" Then he "grunts a polite farewell, and
disappears up the gangway".

The ambassador's ambient lines (Bocci, "all humans look alike to him") were
a delight and made the ship feel alive. But every ambient line is another
paragraph to read above a 52-line menu.

Now: explore east and west along Deck Nine while Blather is elsewhere.

### Attempt 1, turns 16-30: the explosion and the pod

**4 go east** from Deck Nine → "Reactor Lobby": "To starboard is the Ion
Reactor ... aft of here is the Auxiliary Control Room. The corridor continues
to port." And Blather is there again in the same breath, bellowing the same
"Forty if you're not back on Deck Nine in five seconds!" speech. He is
apparently omnipresent. Again the buttons read "go west / go south / go east"
while the text says port / aft / starboard.

I tried **11 listen Ensign First Class** (the button is missing the word
"to", which reads oddly) → "You hear nothing unusual." Blather turned
crimson. Went **west** back to my post.

Since the game plainly wanted me to stay put and let the clock run, I spent
turns on examining. Highlights: the uniform description is great ("repels
all insects, absorbs sweat, promotes healthy skin tone, and on top of
everything else, it is super-comfy"). Low points: the scrub brush, escape
pod, stairway and (later) light and window are all "I see nothing special" —
the menu offers "examine" for every noun whether or not it has anything to
say, so about half of my examine clicks were wasted.

Then, on **12 examine stairway** at turn 23 / time 4784: "A massive
explosion rocks the ship. Echoes from the explosion resound deafeningly down
the halls. The door to port slides open." The earlier hint paid off and I did
not hesitate: **1 go in** → "Escape Pod ... A mass of safety webbing, large
enough to hold several dozen people ... The controls are entirely automated."
**Score 3.** "You hear, from close by, the sounds of emergency bulkheads
closing."

Inside the pod the menu was 48 long and "close escape pod bulkhead" appeared
**three** times (2, 5, 8). "get in safety web" (14) was clearly the thing to
do → "You are now safely cushioned within the web." The pod door "clangs
shut". Then two duplicate exits appeared: "get out of the safety web" and
"get out safety web".

While I examined the controls / light / window and waited, the scripted
sequence played: the pod slides down its ejection tube; "a huge explosion
blows the Feinstein into tiny pieces, sending the escape pod tumbling away!";
gyroscopes; "a nearby planet swings into view ... almost entirely ocean, with
just a few visible islands and an unusually small polar ice cap"; the viewport
polarizes; and finally a monotone: "Approaching planet...human-habitable."
This was the best stretch so far — a real set piece, well paced, and my
"wait" button was exactly the right tool for it.

Clock note: each action is 7 units, but examine-type actions on some
objects were 32 units; I do not understand the rule yet. Score 3 for entering
the pod. No deaths so far. Waiting for touchdown.

### Attempt 1, turns 31-47: splashdown, a sinking pod, and dry land

Eight "wait"s carried me down: re-entry buffeting, the climate system
roaring, then "endless ocean below", "a pair of islands ... surrounded by
sheer cliffs ... topped by a wide plateau ... a sprawling complex of
buildings", and finally "The pod lands with a thud ... The pod rocks gently
back and forth as if it was precariously balanced. A previously unseen panel
slides open, revealing some emergency provisions, including a survival kit
and a towel." Waiting through this felt fine — it was a cutscene and the
"wait" button was the right control — but note that during the seven
uneventful waits (turns 31-33) I had **no idea** whether anything would ever
happen; a mouse player with no "wait" habit might have started clicking exits
and gotten out of the webbing.

After landing the menu reached **62 entries** — the biggest yet — because
the survival kit became yet another container ("put brochure in survival
kit", etc.). Of those 62, I'd guess eight were things I could plausibly want.

**18 read towel** → "S.P.S. FEINSTEIN| Escape Pod #42| Don't Panic!" Nice.
**19 examine survival kit** → "The survival kit is closed." (32 time units
for that — ouch.) **17 take towel** → **"You can't reach it from here."**
That button was offered to me while I was strapped in the web. A click
interface should hide or grey it out, or say why. Wasted turn, and the pod
was "precariously balanced" so I was nervous about turns.

**13 get out of the safety web** → "As you stand, the pod shifts slightly
and you feel it falling. A moment later, the fall stops with a shock, and you
see water rising past the viewport." Real panic now. **take towel** (Taken),
re-list, **take survival kit** (Taken) → "The pod is now completely
submerged ... continuing to sink." **2 open escape pod bulkhead** → "The
bulkhead opens and cold ocean water rushes in!" — I genuinely thought I was
about to drown. **4 go out** → "Underwater ... Currents buffet you against the
sharp rocks of an underwater cliff. A dim light filters down from above."
**1 go up** → "Crag". **Score 6.**

Crag: "a cleft in the cliff wall where the island rises from the water ...
A small structure clings to the face of the cliff about eight meters above
you. Even an out-of-shape Ensign Seventh Class could probably climb up to
it." Good. Nice that the menu now has both "go up" and "climb up structure"
and "climb up cleft" — three buttons for one intent, but at least the intent
is obvious.

One structural observation so far: the numbering is unstable. Every time I
pick something up, every button below it renumbers, so I have to re-read the
whole list before each click. In a real GUI the buttons would move around
under the mouse, which is worse.

### Attempt 1, turns 48-53: goo, a plaque, and a ruin

**39 open survival kit** → "a blob of red goo, a blob of brown goo and a blob
of green goo." That added **fifteen** buttons (examine / drop / eat / put in
uniform / put in kit, times three colours). "examine blob of red goo" → "I
see nothing special". I assume they are rations; I'm not hungry yet, so I
left them.

**2 go up** → "Balcony": an octagonal room with shattered windows, ocean to
the horizon, "A weathered metal plaque with barely readable lettering ... a
corrupt form of Galalingua." **62 read plaque** → "SEENIK VISTA — Xis
stuneeng vuu uf xee Kalamontee Valee kuvurz oovur fortee skwaar miilz uf xat
faamus tuurist spot..." I sounded it out: "Scenic Vista. This stunning view of
the Kalamontee Valley covers over forty square miles of that famous tourist
spot. The large building at the bend in the Gulman River is the former
provincial capital building." Delightful, and it tells me this was a tourist
lookout over a valley that is now ocean. The "read plaque" button was right at
the bottom of a 62-entry list (61-62), below fifteen goo buttons and all my
inventory. **Room scenery should come before inventory** in the list.

**go up** → "Winding Stair" (a short, quiet 5-button room plus inventory),
**go up** → "Courtyard": an ancient ruined stone edifice "vaguely reminiscent
of the castles you saw during your leave on Ramos Two". Openings north and
west, stairs south. Here the text and the compass finally agree (north /
west / south), which is a relief after the ship.

### Attempt 1, turns 54-61: the Rec Area and the dial I cannot turn

North of the courtyard: "Plain Hall" (modern construction, branches north
and northeast), then **"Rec Area"**: "Games and tapes are scattered about the
room ... to the north is a door which is closed and locked. A dial on the
door is currently set to 0."

This is the first puzzle, and the first place the click interface flatly
failed me. The options for the door and dial were: go north / open door /
examine door / **examine combination dial**. That is all. **9 examine
combination dial** → "The dial can be turned to any number between 0 and
1000." — the game TELLS me the dial turns, and offers me no way to turn it.
No "turn dial", no "set dial to ...", no number entry. As a mouse player I am
now dependent on the designer having put a "set dial" control somewhere,
and there is none. I wrote this down as the top friction item.

The rest of the room was fun flavour: "examine games" → "Chess, Cribbage,
Galactic Overlord, Double Fannucci..."; "play games" → "Okay. Gee, that was
fun."; tapes include "a biography of a famous Double Fannucci champion". But
these three buttons (60-62) sat at the very bottom under fifty inventory
entries; I had to filter the list mentally to find them.

Time check: 32 units for "examine door" vs 7 for "examine games". I still
can't tell what makes some examines cost four times more.

East → "Rec Corridor", a wide east-west hallway with portals north, south,
east, and a branch southwest. Lots to explore. I'll sweep the rooms here one
at a time, looking for anything that resembles a combination.

### Attempt 1, turns 62-79: dorms, a padlock, and "akses deeniid"

Sweep of the Rec Corridor branches. **Dorm B** (north): "very long room
lined with multi-tiered bunks ... could have once housed many hundreds, but
it seems quite deserted now." Scenery buttons: examine bed / get in bed /
examine partition — "get in bed" is nice to have, I may need to sleep. Beyond
it **SanFac B**: "You marvel at how little the millenia and cultural gulfs
have changed toilet bowl design." Only "examine fixtures". **Dorm A** and
**SanFac A** to the south are word-for-word mirrors. Four rooms, two
descriptions; a bit of a let-down after the Balcony.

I've started filtering the list mentally into "my stuff" (always ~50 lines,
always the same) and "this room" (5-10 lines, at the top for exits and the
very bottom for scenery). The scenery buttons being *after* the inventory
means they land at numbers like 55, 68, 80 — I have to scroll to the bottom
every room. In a GUI this would be the equivalent of scrolling past my
pockets to find the door.

East → **Mess Corridor**: "A small door to the north is closed and hooked
with a simple steel padlock which is also closed." Buttons: examine padlock /
take padlock (plus open/examine door). "take padlock" → "The padlock is
locked to the door." "open door" → "cannot be opened until the padlock is
removed." Fair enough, I need a key or a tool. I did wonder why "take" was
offered for a padlock that is locked on, but I can accept "try it and see" for
this one.

South → **Mess Hall**: tables, benches, "A door to the south is closed. Next
to the door is a small slot ... an octagonally-shaped canteen is sitting on
one of the benches." The slot was described precisely ("ten centimeters wide
... two centimeters deep ... parallel ridges of metal") — obviously a card
reader. I found **"slide through slot (ID card)"** in the list, which was
exactly what I wanted — but I only found it by searching for the word
"slot"; it was buried at #37 among the "put X in canteen" entries. Result: a
sign flashes **"Inkorekt awtharazaashun kard...akses deeniid."** So my Patrol
card is the wrong card. I need a local one.

Took the canteen (Taken). Opened it (Opened) — but no "drink" button appeared
and no contents were listed, so I think it's empty. Every object I pick up
adds another "put <everything> in <it>" block: with the canteen the list is
now **83 entries**, ten of which are "put ... in canteen". This is the core
usability problem of the click UI: containers multiply the menu.

Also noticed: after I slid the ID card, its entries moved from 36-37 to 29-30
— so the card apparently left my uniform pocket. Nothing told me that.

Unexplored so far: Mess Corridor east, Rec Corridor southwest, Plain Hall
northeast, Courtyard west. Going east first.

### Attempt 1, turns 80-94: the long walk east

"look inside canteen" → "The canteen is empty." OK.

East along the Mess Corridor → **Dorm Corridor**: "lined with a motorized
walkway (no longer running) that was probably intended to transport people or
cargo down that tremendously long hall." North: **Dorm D** and **SanFac D**,
identical copies again; south: **Dorm C** (I skipped SanFac C on the
assumption it is the fourth copy).

Here I made a mistake caused by the menu: I chained moves assuming "go
south" was button 1 as it had been in Dorm B and Dorm D, but in Dorm C
button 1 was "go north". So I marched myself back up into SanFac D and
wasted three turns. **The order of compass buttons is not the same from room
to room.** A fixed compass rose (N always in the same place) would have
prevented this; the current list seems to order exits by whatever order the
room defines them.

"--status" was useful here to re-orient: it lists my inventory in one line
("A survival kit; The survival kit contains: A blob of red goo ...").

**go east** → "You walk down the long, featureless hallway for a long time.
Finally, you see an intersection ahead..." → **Corridor Junction**. That single
step cost **180 time units** (6231 → 6411) versus 20 for a normal step. The
clock has run from 4453 to 6411 over the game so far; I still don't know
what the units mean or what will happen when they run out, but I'm getting
nervous about sleep and thirst with an empty canteen.

**go east** → **Elevator Lobby**: bright, "A blue metal door to the north ...
a larger red metal door to the south ... Beside the blue door is a blue
button, and beside the red door is a red button ... To the east is a small
room about the size of a telephone booth." At last, an interface that fits a
mouse: "push blue button", "push red button" are right there in the list at
13-16. Also "examine booth" / "go through booth" way down at 84-85.

### Attempt 1, turns 95-108: elevators, booths, and buttons I can't push

**14 push blue button** → "You hear a faint whirring noise from behind the
blue door." A moment later: "A growl from your stomach warns that you're
getting pretty hungry and thirsty." So there IS a hunger clock. I grepped
the list for "eat" (61/67/73) and ate the red goo: **"Mmmm...that tasted just
like scrumptious cherry pie."** Then "The door at the north end of the room
slides open."

**Upper Elevator**: "A control panel contains an Up button, a Down button,
and a narrow slot." Buttons offered: push up button / push down button /
slide through slot (ID card). **push up** → "Nothing happens." Slid my card →
"Inkorekt awtharazaashun kard...akses deeniid." again, and up/down still
"Nothing happens." So the elevator needs a proper card too. Fine — a
consistent lock, and the interface at least let me *try* everything.

Back out; **16 push red button** → "The red door begins vibrating a bit." A
slower door, presumably.

**79 go through booth** → **Booth 2**: "a large '2' painted on the wall. A
panel contains a slot about ten centimeters wide, a brown button labelled '1'
and a tan button labelled '3.'" Obviously a teleporter between booths 1, 2
and 3. And here is the second hard failure of the click UI: the list offers
**"examine brown button" and "examine tan button" but NO "push brown button"
/ "push tan button"**. In the Elevator Lobby, ten meters away, "push blue
button" and "push red button" were offered. Same verb, same kind of object,
inconsistent menu. I grepped the whole list for push/press — nothing. I can
only "slide through slot (ID card)", which gives the access-denied sign
again. So even with the right card, a mouse player could not operate the
booth. This and the untutnable dial are the two places a click-only player
is hard-blocked by the menu rather than by the puzzle.

Minor: "go out" and "go west" both leave the booth; "get out booth" at #73 is
a third copy.

Current inventory: brush, chronometer, ID card, uniform, brochure, towel,
survival kit (brown + green goo), empty canteen. Score still 6. Turn 108.

### Attempt 1, turns 109-123: a key I can't reach and a room full of monitors

The red door opened after one more wait → **Lower Elevator**, same panel,
same "Nothing happens" for up and down. Both elevators need the card I don't
have. Back west to the junction and **north** → **Admin Corridor South**:
"The walls are cracked, and a jagged crevice crosses the floor ... You catch,
out of the corner of your eye, a glint of light from the direction of the
floor." Good, atmospheric nudge. **7 examine crevice** → "Lying at the bottom
of the narrow crack, partly covered by layers of dust, is a shiny steel key!"
The padlock key, I'm sure. **9 take key** → "Either the crevice is too
narrow, or your fingers are too large."

Now I need a tool. What I *wanted* to do: poke the key out with the scrub
brush, or fish it out with the towel — I'm carrying both, and the brush is
literally described as "multi-purpose". The menu offers nothing of the sort:
for the brush only examine / drop / put in uniform / put in kit / put in
canteen. There is no "use X on Y" pattern anywhere in this interface; every
two-object action I've seen was pre-authored (slide card through slot, throw
X at person). So unless a specific "get key with brush" button appears
somewhere, the key stays where it is. Noted as friction #3 of the hard kind.

East: **SanFac E**, "another sanitary facility ... dusty and non-functional".
North: **Admin Corridor** — "the entire building has been rent apart here ...
To the north is a gaping rift, at least eight meters across and thirty meters
deep." The menu cheerfully offers "go north" into it. I did not click it.
"move rubble" → "What a concept!" (a joke refusal — but then why is the
button there?). "examine rift" → "sharp and nasty rocks".

West: **Systems Monitors**: "monitors ... labelled LIIBREREE, REEAKTURZ, and
LIIF SUPORT are green, but the ones labelled PLANATEREE DEFENS, PLANATEREE
KORS KUNTROOL, KUMUUNIKAASHUNZ, and PRAJEKT KUNTROOL indicate a
malfunctioning condition." So: Library, Reactors, Life Support OK; Planetary
Defense, Planetary Course Control, Communications, Project Control broken.
This feels like the game's to-do list. One more truncated button here:
"examine equipm".

### Attempt 1, turns 124-141: a storage room and an 88-button menu

"examine equipm" → "so complicated that you couldn't even begin to figure out
how to operate it." Fine. Back through the junction and **south** → **Mech
Corridor North**, a plain hall with rooms east and west.

East → **Storage East**: "One dusty shelf, otherwise bare, holds a small oil
can. On the floor beneath the shelves sits a small cardboard box. The
cardboard box contains: A cracked seventeen-centimeter fromitz board." The
menu, however, ALSO offered "examine / take B-series megafuse" and "examine /
take K-series megafuse" — two objects the room text never mentioned. Either
they were in the box and the description missed them, or the menu is leaking
objects the player hasn't discovered. Either way the list told me more than
the prose did, which spoils the "look closer" pleasure. I took all four
things (oil can, cracked board, both megafuses). The board description is
good: "a twisted maze of silicon circuits ... This one looks as though it's
been dropped." The other three: "nothing special".

I've now learned the list layout well enough to click blind in a chain:
**room objects first, then my inventory, then room scenery**. Because taking
an object moves it from the first block to the second, taking things
bottom-up keeps the earlier numbers valid. This is knowledge a player should
never need.

West across the hall → **Physical Plant**: "a huge, dim room ... criss-crossed
with catwalks ... Hardly any of the equipment is still operating." Exits NE
and SE. The option list is now **88 entries** long, of which the room itself
contributes five (two exits, look/inventory/wait) plus two scenery examines
at 87-88. Eighty-one entries are my pockets. At this point the inventory
block is actively hostile: I have stopped reading it and just grep.

Hunger clock check: I ate at turn 97; nothing since. Score stuck at 6 since
the Crag. Turn 141 of my ~200 budget.

### Attempt 1, turns 142-160: reactor, grue, and a chemical dispenser

**Mech Corridor** → east → **Reactor Control**: "many dials and gauges for
controlling a massive planetary power reactor ... buried far below ... To the
east is a metal door, and next to it, a button. A dark stairway winds
downward." The refusals here are funny and well-judged: "read diagram" → "Not
unless you've taken a special twelve-year course in ninth-order molecular
physics"; "examine set of controls" → "you shouldn't even be thinking about
touching them." **97 push button** → the reactor elevator opens. Inside:
another up/down/slot panel, "Nothing happens" to both. Third locked elevator.

**8 go down** the dark stairway → "It is pitch black. You might be eaten by a
grue." I don't know what a grue is but I took the hint and went back up. I
have no light source, and nothing in my 90-odd buttons looks like one. I'll
need to find one.

South → **Mech Corridor South** (doors SW, S, SE) → south → **Machine
Shop**. A rendering glitch in the room text: "Doorways lead north, east, and
west.| | Standing against the rear wall..." — the "| |" is a stray line-break
marker. The dispenser is wonderfully specific: buttons "KUULINTS 1 - 4" (red,
blue, green, yellow), "KATALISTS 1 - 3" (gray, brown, black), and two white
ones: square "BAAS." and round "ASID." Coolants, catalysts, base, acid.
Eighteen buttons for it (examine + push, times nine) — this is one place where
the wall of buttons is *correct*: it is a wall of buttons.

I pushed red with nothing under it: "Some sort of chemical fluid pours out
of the spout, spills all over the floor, and dries up." Then I searched the
list for "spout" and found **"87. put under spout (canteen)"** — a
two-object action, so the game does author these when it wants to. The
canteen "is now sitting under the spout." Pushed blue → "the mouth of the
canteen is very narrow, and the fluid just splashes over it." Empty. So I
need a wider container or a funnel. Note that after I put the canteen down,
"put under spout (canteen)" was still offered even though it was already
there — the option list doesn't check preconditions.

Total menu length here: **108**. That is the record so far.

### Attempt 1, turns 161-182: Floyd, the access card, and the lower elevator

East of the Machine Shop → **Robot Shop**: robots "in various states of
disassembly. Only one robot, about four feet high, looks even remotely close
to being in working order." Buttons for it: examine / close / look inside /
search / turn on / turn off. **8 look inside** → "In one of the robot's
compartments you find and take a magnetic-striped card embossed 'Loowur
Elavaatur Akses Kard.'" **Score 7.** **10 turn on** → "Nothing happens." —
but the **score went to 9**, so something did happen. Two turns later, while
I was reading the card: "Suddenly, the robot comes to life ... 'Hi! I'm
B-19-7, but to everyperson I'm called Floyd. Are you a doctor-person or a
planner-person? That's a nice Patrol-issue self-contained multi-purpose
scrub brush you are having there. Let's play Hider-and-Seeker you with me.'"
Best moment of the game. "Floyd recalls the time he bruised his knee." I
laughed.

Two menu problems came with him though. First, a **spoiler leak**: the
moment I picked up the card, the list offered "show to floyd (lower elevator
access card)" — the robot was still a nameless, switched-off "multiple
purpose robot" in the text. The menu knew his name before I did. Second,
**size**: with Floyd awake the list hit **132 entries**, including thirteen
"throw X at multiple purpose robot" and sixteen "put X in multiple purpose
robot" lines. Every object I carry is offered as a projectile at my new
friend. Also the buttons still call him "multiple purpose robot" after he has
introduced himself as Floyd — the one "floyd" label is on the show-card
entry only.

"talk to" → "'Hi!' Floyd grins and bounces up and down." He follows me
between rooms ("Floyd follows you", "Floyd here now!", "Hey, wait for
Floyd!").

I chained the six-room walk back to the Elevator Lobby by remembered exit
numbers — it worked, which shows a mouse player *could* move fast if the
compass were stable. Pushed the red button again: "doesn't seem to do
anything" (door already open). Into the **Lower Elevator**; the list had
"slide through slot (ID card)" at 60 and "slide through slot (lower elevator
access card)" at **120**. Slid the right one → "A recorded voice chimes
'Elevator enabled.'" **push down button** → "The elevator door slides shut.
After a moment, you feel a sensation of vertical movement."

Then two waits, "open red door" → "It won't budge.", "go out" → "The door is
closed." So the ride is long, or I'm missing a step. Turn 182, score 9.

### Attempt 1, turns 183-196: a gap in my notes, and a cabin called Alfie

I took a break and came back to find the saved game at **turn 195**, not
182 — I lost about thirteen turns of notes. Reconstructing from `--status`
and `look`: score is now **13** (was 9), the brown goo is gone (I must have
eaten it when the hunger warning came round again), the lower elevator ride
evidently finished, and I am now in a room called **"Alfie Control West"**:
"a small control cabin. A control panel contains a slot, a lever, and a
display. The lever can be set at a central position, or it could be pushed
up to a position labelled '+', or pulled down to a position labelled '-'. It
is currently at the center setting. The display, a digital readout,
currently reads 0. Through the cabin window you can see a featureless
concrete wall." Floyd is with me. The only exit is east.

So this is the driver's cab of some kind of train or shuttle ("Alfie" must be
its name), and the four points I gained on the way here were presumably for
the elevator and for finding it. The lever is the first control in the game
that the menu presents *completely*: "push lever" and "pull lever" are both
on the list (30, 31), right next to "examine lever". That is how the dial in
the Rec Area and the booth buttons should have looked.

The list is still 133 lines long, and thirteen of them are offers to throw
my possessions at Floyd.

Plan: look east to see what the car is, then try the lever.

### Attempt 1, turns 197-208: the shuttle needs a card I don't have

The cabin slot is the same ten-by-two-centimetre card reader as everywhere
else. "push lever" → a recorded voice: "Shuttle controls are not currently
activated." Slid the lower elevator card → "akses deeniid" again. So the
shuttle wants its own card. Fair — the game has been very consistent about
this: one card per machine.

I walked the car: **Shuttle Car Alfie** is "the cabin of a large transport,
with seating for around 20 people plus space for freight", with a control
cabin at each end. **Alfie Control East** looks out on "parallel rails
running along the floor of a long tunnel, vanishing in the distance", so the
tunnel runs east. North of the car is **Kalamontee Platform** — "Shutul
Platform -- Kalamontee Staashun" — and west of that the **Waiting Area**
with the red elevator door. That is the whole lower level: three rooms and a
train I cannot start.

Two more menu problems here. On the platform the list offers "go north";
clicking it says "You can't go that way." — the room text only mentions west
and south. And "get out shuttle car" is on the list while I am standing on
the platform outside it. Both are buttons that a click UI should not draw.

Floyd stayed in the Waiting Area when I walked east; "talk to multiple
purpose robot" is rejected on the platform with "You can't see any multiple
purpose robot here!" — reasonable, but the list only refreshes *after* an
action, so the button I saw was one turn stale.

So: back up the elevator and sweep the unexplored branches for a shuttle
card. Candidates from my map: Courtyard west, Plain Hall northeast, Rec
Corridor southwest, Mech Corridor South SW/SE, Physical Plant NE/SE. Also
the locked things I've catalogued: the dial door, the padlock, the key in
the crevice, the dark stair. Hunger will come back (one green goo left) and
the canteen is empty; I'll eat when told.

### Attempt 1, turns 209-218: the ride back up, and a tiredness warning

Back into the Lower Elevator. "push up button" → "Nothing happens." — the
elevator forgets the card between rides, so every trip is swipe, push,
wait, wait, wait. That is five clicks per ride; the game's own "Elevator
enabled" chime made it clear enough what I'd forgotten, so I'll call it
fair rather than friction. Oddly the elevator list also has a bare "go up"
(button 7) that I didn't dare try — I assume it is another phantom.

On the third wait: "You're really tired now. You'd better find a place to
sleep real soon." followed by the door opening. So now there are three
clocks: hunger, thirst and sleep. The only beds I know are the dorms, and
Dorm D is two rooms west of the lobby (through the long walkway corridor).
Going there now, then I'll sweep the unexplored branches.

### Attempt 1, turns 219-240: a night's sleep, and a morning spent on my knees

Dorm D, "get in bed" → "Ahhh...the bed is soft and comfortable. You should
be asleep in short order." No "sleep" button exists (I grepped the list:
only "get out of the bed", "examine bed", and fourteen "put X in bed"), so I
clicked "wait" and hoped. It worked: "You slowly sink into a deep and
restful sleep." Then a nightmare — eight years old on Gallium, a pet
sponge-cat called Swanzo, the school bully holding my head under the pond,
"You feel your life draining away..." — and I honestly thought I'd died in
my sleep. `--status` said otherwise: still in bed, time reset to **1664** (a
new day), and carrying only my chronometer and uniform. Everything else was
on the floor. Nobody told me I'd dropped it; the dream text just ended.

Then the worst click-UI moment of the run. The list offered "take ID card",
"take brochure", "take towel", "take survival kit", "take canteen" — and
each one, clicked from the bed, cost a turn and said **"You can't reach it
from here."** Five turns lost to buttons that should not have been there (the
same thing happened with the towel in the pod at turn ~40, so it's a
pattern: the list never checks reachability). And "take Patrol-issue
self-contained multi-purpose scrub brush", typed exactly as printed, was
rejected with "You can't see any patrol-issue self-contained multi-purpose
scrub brush here!" while the room text said the brush was right there.
Clicking it by number (7) worked. So the phrase form of the brush button is
broken — probably the hyphen or the capital P — and a mouse player would
never know why one button behaves differently from the rest.

Got out of bed, took all eleven things back, one turn each. It is now turn
240, time 1792, score 13, and Floyd wandered in during the night. Time to
sweep the branches I skipped: west first (Rec Corridor SW, Plain Hall NE,
Courtyard W), then back east for the Mech Corridor South doors.

### Attempt 1, turns 241-271: the Tool Room, and the weight of my pockets

Swept west first. Rec Corridor southwest just loops into the Plain Hall
(its "northeast"), and Courtyard west is the **West Wing**: "walls are now
mostly rubble, allowing a view of the cliff and ocean below. Rubble blocks
all exits save one, eastward". The list nonetheless offers "go down" off
the cliff. I left that button alone; if it is a death, it should not be a
button, and if it is a phantom, it should not be a button either.

On the way, a new line: "You notice that you feel a bit weak and slightly
flushed, but you're not sure why." I have no idea either. A fourth clock?

The long walk east again (hungry at the junction; ate the last goo — "yummy
lima beans"), then Mech Corridor South, southwest → **Tool Room**. Finally a
room that answers questions: "a large glass flask" (wide mouth, one or two
litres — the container the dispenser wanted), "a metal bar, curved into a
U-shape" (a magnet, surely: the key in the crevice), "a pair of wide-nosed
pliers" (the padlock?), and a device labelled "Akmee Portabul Laazur" with an
old battery (light for the dark stairway, or a cutter).

And here the click UI's "everything is a button" design bit me a different
way: **"Your load is too heavy."** four times in a row. I had been carrying
thirteen things because the interface never once suggested I shouldn't. To
carry the flask, bar and pliers I had to drop the brochure, survival kit,
canteen, ID card and scrub brush, one turn each — and dropping the scrub
brush by phrase failed with the same "You can't see any patrol-issue ...
scrub brush here!" bug as before, so I had to fetch its number (57) and
click that. The laser is *still* too heavy on top of the rest.

A small vindication: the laser shows "set laser setting dial" as a button.
So the verb "set" exists in this interface — the Rec Area combination dial
simply was never given one.

"shoot laser" while it sits on the shelf → "You're not holding the laser."
Wasted turn; the button is offered for a thing I'm not holding.

Now: decide what else to drop for the laser, or leave it. Turn 271, time
2430, score 13.

### Attempt 1, turns 272-283: a blue beam and a flask of milk

To lift the laser I had to drop, in order, the cracked board, the towel and
the oil can — it is by far the heaviest thing in the game and nothing
warns you. Once holding it, "shoot laser" → "The laser emits a narrow blue
beam of light." and the **score jumped to 15**. I do not know what I hit or
why that was worth two points; perhaps the game is rewarding me for
finding out the old battery still works. The beam is "light", so it might
also serve for the dark stairway.

The Tool Room's east door opens straight into the Machine Shop (its unused
west doorway). "put under spout (glass flask)" was there at #87, "push red
button" → "The flask fills with some red chemical fluid. The fluid gradually
turns milky white." Examining the fluid: "nothing special". I have no idea
what a milky white coolant is for, and the flask's whole verb list is
examine / take / close / look inside / search / put under spout — no
"drink", no "pour", no "empty". So if this fluid is the wrong one, or if I
need to mix, I cannot see how a mouse player would ever fix it.

Carrying: chronometer, uniform, elevator card, K-series megafuse, flask (of
white fluid), curved bar, pliers, laser. Left in the Tool Room: brush,
brochure, kit, canteen, ID card, towel, oil can, cracked board, B-series
fuse. Next: the crevice with the magnet.

### Attempt 1, turns 284-308: magnet, key, padlock, and a ladder I can barely lift

The pay-off run. At the crevice the list had grown a new line, **"take
with magnet (key)"** — the menu called my curved bar a "magnet" before the
game ever did, a small leak but the U-shape had told me anyway. Clicking it:
"With a spray of dust and a loud clank, a piece of metal leaps from the
crevice and affixes itself to the magnet. It is a steel key!" Great line.

Walked back west to the Mess Corridor padlock. **"unlock with key
(padlock)"** → "The padlock springs open." Then "open door" → "cannot be
opened until the padlock is removed", "take padlock" → "Your load is too
heavy" — and then "open door" → "Opened." anyway. So the padlock fell off on
its own between two clicks, and the first refusal was stale. Confusing for
a moment but harmless. North → **Storage West**, score **19**: "a large,
unopened tin can ... 'Spam and Egz'" and "a heavy-duty extendable ladder",
"around two-and-a-half meters long, but if extended would obviously be much
longer". Food and a bridge for the eight-metre rift — I'm sure of it.

Then twelve turns of inventory Tetris. "take ladder" → "Your load is too
heavy" with the laser; without the laser; without the flask; without the
fuses, pliers and can; and *still* with only the elevator card in my pocket.
It only came up once I was carrying literally nothing but my clothes. No
message ever said "the ladder needs both hands" or "you'd have to put
everything down" — just the same five-word refusal ten times. As a click
player, the interface offered "take ladder" every time, so I kept clicking.
A single sentence of feedback ("It's far too bulky to carry with anything
else") would have saved ten turns.

My whole inventory is now on the Storage West floor: laser, flask, pliers,
tin can, both fuses, elevator card, magnet, key. Carrying: the ladder.
Score 19, turn 309. Going to the rift.

### Attempt 1, turns 309-317: the ladder is "lost forever"

I carried the ladder — and nothing else — six rooms to the Admin Corridor.
The list there offered, side by side: "open ladder", "close ladder", "put
across rift (ladder)", "throw into rift (ladder)", and (absurdly) "put
ladder in Patrol uniform".

I did the sensible thing first: **"open ladder"** → "You couldn't possibly
extend the ladder while you're holding it." Then — and this is my own
fault as much as the game's — I had queued **"put across rift (ladder)"**
behind it without waiting to read that refusal. Result: "The ladder, far too
short to reach the other edge of the rift, plunges into the rift and is
lost forever." One click, no confirmation, and the only bridge in the game is
gone. "go north" → "The rift is too wide to jump across."

I want to be fair about blame. A careful keyboard player who read the first
refusal would have dropped the ladder, extended it, and then tried again.
But look at it from the mouse side: the game *knew* the ladder was
collapsed and too short, and still drew a "put across rift" button for it,
next to a "throw into rift" button that does the same damage on purpose. A
click UI that can compute "put across rift (ladder)" as a valid combination
can also compute "this will destroy the ladder" and either hide the button,
grey it, or ask. This is the third hard-block of the run, and unlike the
dial and the booth buttons, this one is permanent.

Storage West still has all my gear — laser, flask, pliers, tin can, fuses,
card, magnet, key — two long corridors away. With ~78 turns of budget left I
cannot restart and get back here, so I'll spend what remains mapping the
last unexplored doors on this side of the rift (Physical Plant NE/SE, Mech
Corridor South SE) and noting anything that looks like it wants the laser
or the flask.

### Attempt 1, turns 318-337: closing the map, and a can I cannot open

Physical Plant northeast → Mech Corridor North; Physical Plant southeast →
Mech Corridor; Mech Corridor South southeast → Robot Shop. Three "new"
doors, three loops. "examine device" in the Robot Shop → "components of
disassembled robots, beyond repair." So the map on this side of the rift is
closed: every door leads somewhere I've been. What remains locked: the dial
door (Rec Area), the booths, the three card-elevators (one of which I have
the card for), the dark stairway under Reactor Control, and now the rift.

Walked the eight rooms back to Storage West for the laser, getting the
"pretty hungry and thirsty" growl in the Dorm Corridor on the way. The
only food I know of is the "Spam and Egz" tin, and the list offers for it:
examine, take. No "open tin can". Holding the laser, the shoot buttons are
"shoot laser" (at nothing) and **"shoot multiple purpose robot (laser)"** —
the game will let me shoot my friend but not a tin can. A keyboard player
could type "shoot can with laser" or "open can with pliers"; a mouse player
is going to starve next to a can of Spam. That's friction of the hard kind,
number four.

### Attempt 1, turns 338-347: the laser is not a lamp, and the grue is real

"set laser setting dial" → "You must specify a number to set the dial to."
So the click UI shows a button that, when clicked, asks for something a mouse
player has no way to provide. That's the dial problem from the Rec Area in a
different coat.

Carried the laser seven rooms to Reactor Control and down the dark stairs:
"It is pitch black. You might be eaten by a grue." "shoot laser" → "a narrow
blue beam of light" — and "look" → still pitch black. The laser is a weapon,
not a lamp.

With the ladder gone, no light, no shuttle card, and a tin of food I cannot
open, the run was stalled. I had about fifty turns of budget left — not
enough to restart and get back to the plateau — so I spent one of them on
the most informative test remaining: "go down" in the dark. "Oh, no!
Something (a grue?) slithered into the room and devoured you!" **Died at
turn 347, score 19.** The stairway is not walkable without a light; noted
for whoever plays next.

I am stopping here. The rest of this file is the friction log and the
report.

### Friction log

| Turn | Where | What happened | Kind |
|---|---|---|---|
| 0 | Deck Nine | 36 buttons on the first screen; "open/examine escape pod bulkhead" listed twice; nine "put X in escape pod" entries for a closed pod | list too long / duplicates |
| 1-2 | Deck Nine | "examine transl", "examine slime" offered → "What translator?" / "What slime?"; the ambassador had not appeared yet; "transl" is also a truncated label | phantom button / spoiler |
| 8-9 | Deck Eight | Prose says port / starboard / fore; buttons say east / west / north; I had to guess | labelling |
| 15 | Deck Nine | Ambassador arrives: list jumps to 52 | list too long |
| 16-30 | Deck Nine | "examine" offered for every noun; brush, pod, stairway, light, window all "nothing special" | wasted clicks |
| 16 | Reactor Lobby | "listen Ensign First Class" — missing "to" | labelling |
| 31-33 | Escape Pod | Seven uneventful "wait"s with no cue that waiting was the right thing | no guidance |
| 34 | Escape Pod | 62-entry list after landing (survival kit adds a container block) | list too long |
| 38 | Escape Pod | "take towel" offered while strapped in → "You can't reach it from here." | precondition not checked |
| 44 | Crag | "go up", "climb up structure", "climb up cleft" — three buttons, one intent | duplicates |
| 40-50 | everywhere | Numbering shifts every time an item is taken; must re-read the list before each click | unstable numbering |
| 49 | Balcony | "read plaque" at #61-62, below fifteen goo buttons and all inventory | ordering (scenery after inventory) |
| 56 | Rec Area | Dial "can be turned to any number between 0 and 1000" — no turn / set / number button at all | HARD BLOCK |
| 60 | Rec Area | "examine games / play games / examine tapes" at 60-62 under fifty inventory lines | ordering |
| 75 | Mess Corridor | "take padlock" offered on a padlock locked to the door | precondition |
| 77 | Mess Hall | "slide through slot (ID card)" buried at #37 among "put X in canteen" lines; found only by searching for "slot" | ordering |
| 79 | Mess Hall | ID card silently moved out of the uniform pocket after sliding; list renumbered with no message | no feedback |
| 85-88 | Dorm C | Compass buttons not in the same order in every room; chained "1" and walked the wrong way three times | unstable exit order |
| 93 | Elevator Lobby | "push blue/red button" right at the top — the good case | (positive) |
| 104 | Booth 2 | "examine brown button / examine tan button" offered, but NO "push brown/tan button"; the elevator lobby had push buttons ten metres away | HARD BLOCK / inconsistent |
| 112 | Admin Corridor South | Key in crevice: "take key" fails, and no way to use brush or towel on it; no "use X on Y" pattern in the UI | (later solved by an authored "take with magnet" button — but only once you find the magnet) |
| 119 | Admin Corridor | "move rubble" → "What a concept!"; "go north" offered straight into a 30-metre rift | phantom / dangerous button |
| 121 | Systems Monitors | "examine equipm" truncated label | labelling |
| 125 | Storage East | Menu offered "take B-series / K-series megafuse" though the room text never mentioned them | spoiler leak |
| 141 | Physical Plant | 88 entries, 81 of them inventory | list too long |
| 155 | Machine Shop | "put under spout (canteen)" still offered after the canteen is already under the spout | precondition |
| 155 | Machine Shop | 108 entries | list too long |
| 163 | Robot Shop | "show to floyd (...)" offered while the robot is still a nameless switched-off "multiple purpose robot"; buttons never rename him to Floyd | spoiler leak / labelling |
| 165 | Robot Shop | 132 entries: 13 "throw X at robot", 16 "put X in robot" | list too long |
| 168 | Machine Shop | Stray "pipe pipe" line-break marker in the room text | rendering |
| 176 | Lower Elevator | "slide through slot (lower elevator access card)" at #120 of 130 | ordering |
| 183-195 | (gap) | About 13 turns of notes lost across the break | (my fault) |
| 208 | Kalamontee Platform | "go north" offered → "You can't go that way." | phantom button |
| 208 | Kalamontee Platform | "get out shuttle car" offered while standing on the platform | precondition |
| 210 | Lower Elevator | Bare "go up" button in the elevator (untested; looks phantom) | suspicious button |
| 210-216 | Lower Elevator | Card must be re-swiped every ride: swipe, push, wait x3 = five clicks per trip | tedium (fair) |
| 221 | Dorm D | No "sleep" button; "wait" in bed works but nothing says so | missing verb |
| 221 | Dorm D | Bed is a container: fourteen "put X in bed" lines | list too long |
| 222 | Dorm D | Wake-up: all items silently dropped; no message | no feedback |
| 223 | Dorm D | "take Patrol-issue self-contained multi-purpose scrub brush" by phrase → "You can't see any patrol-issue ... here!" while the brush is in the room; by number it works. Same for "drop". | BUG (phrase match fails for this item) |
| 224-228 | Dorm D | Five "take X" buttons offered from the bed, each "You can't reach it from here." | precondition (repeat of turn 38) |
| 244 | Plain Hall | "you feel a bit weak and slightly flushed" — a new clock with no explanation | (game design; I never learned what it was) |
| 246 | West Wing | "go down" offered off a cliff the text says is blocked | dangerous / phantom button |
| 257-270 | Tool Room | "Your load is too heavy" x4, then x3, then x2 — no hint about which item is the problem; had to drop nine things one at a time | no feedback / tedium |
| 262 | Tool Room | "set laser setting dial" exists — so "set" is a verb the UI knows; the Rec Area dial simply never got one | inconsistency |
| 271 | Tool Room | "shoot laser" offered while the laser is on the shelf → "You're not holding the laser." | precondition |
| 280-283 | Machine Shop | Flask of milky fluid: verbs are examine / take / close / look inside / search / put under spout — no drink, pour, empty | missing verbs |
| 289 | Admin Corridor South | "take with magnet (key)" names the bar a magnet before the text does | spoiler (mild) |
| 293 | Mess Corridor | "take with magnet (key)" still offered while holding the key; "unlock with key (padlock)" still offered after unlocking | precondition |
| 294-296 | Mess Corridor | "open door" refused "until the padlock is removed", "take padlock" too heavy, then "open door" works anyway | stale message |
| 297-308 | Storage West | Ladder: "Your load is too heavy" ten times; lifts only when carrying nothing at all; no message ever says so | no feedback / tedium |
| 315 | Admin Corridor | "put across rift (ladder)", "throw into rift (ladder)" and "put ladder in Patrol uniform" side by side | dangerous / absurd buttons |
| 316-317 | Admin Corridor | "open ladder" refused while holding it; "put across rift" with the collapsed ladder destroys it "forever", no warning, no confirm | HARD BLOCK, permanent |
| 336 | Storage West | Tin can: examine / take only. No "open can"; holding the laser adds "shoot multiple purpose robot (laser)" but no "shoot tin can (laser)" | HARD BLOCK (food) / missing target |
| 338 | Storage West | "set laser setting dial" → "You must specify a number to set the dial to." — no way to supply one | dead-end button |
| 345-347 | Reactor Access Stairs | Laser does not light the dark; "go down" in the dark = death by grue | (game design; no light source found) |

### Report

**What I was trying to do.** I played Planetfall as a mouse-only player,
choosing every action from the numbered list the game prints after each
turn, for 347 turns in one attempt (plus a gap where I lost about thirteen
turns of notes at a break). I never typed a command that wasn't on the list.
My goal was simply to survive and get as far as I could.

**The path I found.** Deck Nine → Blather → the explosion at turn 23 →
escape pod → splashdown, a sinking pod, and a swim up to the Crag → Balcony
(the "Seenik Vista" plaque) → Winding Stair → Courtyard → Plain Hall → Rec
Area (dial door, locked) → Rec Corridor → the four identical dorms and
SanFacs → Mess Corridor (padlocked door) → Mess Hall (card slot, wrong
card) → Dorm Corridor → the 180-time-unit walkway → Corridor Junction →
Elevator Lobby (blue and red elevators, both need cards) → Booth 2 →
Admin Corridor South (key in a crevice) → Admin Corridor (the rift) →
Systems Monitors → Mech Corridor North → Storage East (oil can, cracked
fromitz board, two megafuses) → Physical Plant → Reactor Control (third
elevator, dark stairway) → Machine Shop (chemical dispenser) → Robot Shop
(the lower elevator access card inside a robot; switched the robot on;
Floyd woke up) → lower elevator → Waiting Area / Kalamontee Platform /
Shuttle Car Alfie (controls "not currently activated", needs its own card).
Second day: slept in Dorm D, Tool Room (flask, magnet, pliers, laser),
filled the flask with red coolant (turns milky white), fished the key out of
the crevice with the magnet, unlocked the padlock, Storage West (Spam and
Egz, extendable ladder), carried the ladder to the rift — and lost it.
Died in the dark under Reactor Control. Final score 19.

**Where I got stuck and why.**
1. *The shuttle.* The whole lower level (three rooms and the car) is a dead
   end without a shuttle card, and I never found one. My best guess is that
   it is behind the dial door in the Rec Area or across the rift.
2. *The rift.* I found the ladder, carried it (alone — it will not lift with
   anything else in my hands, and nothing tells you that), tried to extend
   it, was told I couldn't while holding it, and then — my own impatience
   plus a button that should not have existed — laid the collapsed ladder
   across the rift and lost it forever. No warning, no confirmation. After
   that the attempt was unwinnable.
3. *Light.* The dark stairway needs a light source. I found none; the laser's
   "narrow blue beam of light" is not one. Walking down blind is death.
4. *Food.* By the end I was hungry with a tin of Spam I could not open: no
   "open can" button, and the laser can only be aimed at Floyd.
5. *The dial and the booths.* Both were unreachable from turn 56 / 104
   onward, purely because the list never offered a way to turn a dial or push
   the booth buttons.

**Biggest points of confusion.**
- Buttons that exist but don't work: "examine transl" on turn 0, "go north"
  on the platform, "go down" off the West Wing, "take X" from a bed, "shoot
  laser" from across the room, "set laser setting dial" that then demands a
  number. Every one of these costs a turn (and on the ship, time). The list
  never checks reachability, state, or whether the action is even possible.
- The scrub brush cannot be taken or dropped by its printed phrase — only by
  number. That is a real bug and it made me distrust every other phrase.
- Weight. "Your load is too heavy" appeared about twenty times and never
  once said what was heavy or how much I could carry. The ladder needing
  empty hands cost ten turns; the laser cost six.
- The ladder's destruction. This is the one that ended the run.
- Two clocks I never understood: what "weak and slightly flushed" meant,
  and why some "examine"s cost 32 time units and others 7.

**What worked well about clicking.** Movement is fast once you know the
map — chains of remembered exits work. Every authored two-object action
("slide through slot", "put under spout", "take with magnet", "unlock with
key", "put across rift") appeared on the list exactly when its objects were
both present, which meant I never had to guess syntax: if a combination
exists, the list shows it. "push blue button" in the Elevator Lobby and the
eighteen dispenser buttons in the Machine Shop are the click UI at its
best. "talk to" costing no time was a kindness. The set pieces (pod launch,
Floyd waking up) read beautifully with a "wait" button.

**What was worst.** The list length. It ran from 36 at the start to 133 in
the Robot Shop and the shuttle cabin, of which eighty or more were my
inventory re-listed as "examine / drop / put X in Y" for every pair of
container and object, plus "throw X at" everything alive. Room scenery sits
at the bottom, under all of that, so the interesting buttons were routinely
at #60-#120. I stopped reading the list after turn ~100 and searched it
instead; a real mouse user cannot. Second worst: the two hard blocks (dial,
booth buttons) and the two permanent ones (ladder, food) — a keyboard
player could type past all four.

**What I would change.**
1. Split the list into panes: exits (as a fixed compass rose, N always in
   the same place, labelled with the words the prose uses — port/starboard
   on the ship), then room objects and scenery, then inventory, then a
   collapsed "containers" section. Never list "put X in Y" unless Y is open
   and X is not already inside it.
2. Only draw a button if the action can succeed right now, or at least
   yields a specific reason: hide "take" for things out of reach, "shoot"
   for things not held, "go north" for walls, "examine" for nouns whose
   answer is "nothing special".
3. Give every dial, lever and numbered control a real control: a number
   entry for the Rec Area dial and the laser dial, and "push" for the booth
   buttons (they are just like the elevator buttons).
4. Ask before an irreversible action ("throw into rift", "put across rift"
   with an unextended ladder), or don't draw the button.
5. Fix the scrub brush phrase match, dedupe "open/close door" entries,
   untruncate "transl" / "equipm", rename the robot to Floyd once he's
   introduced himself, and don't list objects the room text hasn't revealed
   (the megafuses, the ambassador's slime and translator on turn 0).
6. Make "sleep", "open can", "pour"/"drink" and "cut X with laser" clickable,
   and say what is too heavy when a take fails.

#### Verdict

Playing Planetfall by clicking alone is *possible* for roughly the first
third — the ship, the pod, the plateau, the first cards — and the game's
writing carries it a long way. But from the Rec Area onward a mouse-only
player hits walls that are the interface's, not the puzzle's: a dial with
no way to turn it, buttons with no way to push them, a can with no way to
open it, a number the UI asks for but cannot accept. Add the ever-growing
button wall (peak 133) and a fatal button ("put across rift" with a
collapsed ladder) with no safeguard, and the click mode is a strong proof
of concept that needs a filtering pass on which buttons are drawn, a fixed
compass, and a handful of missing verbs before a real mouse-only player
could finish it. Score 19, one death, about 350 turns.
