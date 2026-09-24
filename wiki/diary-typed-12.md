# Round 12: typed-12, typed

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [The second milestone](playing-it.md#the-second-milestone-to-the-end-from-the-start), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 12, 12 September 2026
- **Mode:** typed: commands typed into the parser
- **Start:** from the start (Deck Nine, turn 0), in 2 legs
- **Result:** **Won 74 of 80** at turn 692.
- **Commands:** 1,489, with 26 deaths

**About the numbers.** The leg 1 report (line 417) counts three deaths; the transcript has four (a second, 13-turn game that died waiting on the Feinstein is not in the diary). The leg 2 report (line 783) says "roughly a dozen deaths"; the transcript has 22 deaths from command 1127 on, six of them in the first leg 2 attempt that was cut off before writing anything.

The diary below is `playtests/2026-09-12/2026-09-12-typed-12.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Planetfall blind playtest — typed-12 (2026-09-12)

Typed-mode blind playthrough. I have never played Planetfall and I am not looking anything up.

Started with:

```
node scripts/playtest.mjs --session typed-12 --new
```

### Turns 0-29: I died in the first five minutes

The opening is a delight. I am an Ensign Seventh Class scrubbing a deck, and the game
immediately gives me something to do with my one possession: `scrub floor` (turn 2)
reported "The floor is a bit shinier now," which is a lovely small reward for trying
the obvious thing. Blather showed up on turn 1 and started writing demerits. I tried
wandering starboard (turn 5) and up the gangway (turns 12-13) and Blather physically
blocked me both times — "Blather blocks your path, growling about extra galley duty."
So the whole Feinstein is scenery: there is exactly one room I am allowed to be in.
Fine, that's the joke.

The alien ambassador wandered through on turn 6 and handed me a brochure, which turned
out to be an advert for the game I am playing. I laughed. He then asked whether I was
interested in a game of Bocci and I typed `yes` (turn 8) — the game said "You sound
rather positive," which is the generic yes-handler, not an answer. Small thing, but the
game asked me a direct question and then didn't listen.

Then I made my mistake. I scrubbed and waited. On turn 25 "A massive explosion rocks the
ship... The door to port slides open." On turn 26 two other bulkheads crashed shut. On
turn 27 "the escape-pod bulkhead clangs shut." On turn 29 I died. I had exactly two
turns to notice that the door which had been closed all game was now open, and to walk
through it. I spent them watching. In hindsight the signal is there — the room
description had been telling me about the escape pod since turn 0 — but at the moment
the explosion happened I read it as "cutscene" rather than "your two-turn window is now
open."

The death message told me: "Type RESTART, RESTORE, or QUIT." I typed `restart` and got
"You have died. Start again with --new." So the game's own instructions don't work in
this build.

### Turns 0-70 (second run): off the Feinstein and onto the island

I restarted. Knowing the pod door opens on the explosion turn, I waited until it opened
and went `port` straight away (+3 points), climbed into the safety webbing, and rode the
pod down. The descent is a long, well-written cutscene — nine or ten turns of `wait` with
one nice beat each. That is genuinely good pacing; I never felt I was being made to wait
for nothing.

Useful thing I learned by accident: `wait` costs about 40 time units where a normal
command costs 7, and the game's clocks run on *time*, not turns. That is why my first
run's explosion came at turn 25 and the second run's at turn 9 — same time, different
turn count. The status line shows both, which is good, but nothing in the game ever told
me `wait` was expensive.

The pod lands "precariously balanced" and a panel opens revealing a survival kit and a
towel. Standing up (turn 27) tipped the pod into the water, which felt like an ambush —
but I had time to `take kit and towel`, `open bulkhead` (cold water rushes in!) and `out`,
then `up` to a crag (+3, score 6). No death. Nicely judged: it *feels* lethal without
actually being lethal if you keep moving.

Above the crag is a Balcony with a plaque written in phonetic corrupted Galalingua —
"Xis stuneeng vuu uf xee Kalamontee Valee" — which I could read aloud in my head and
understand. That is a great touch; it told me the ocean I just swam in used to be a
valley, and that this civilisation is long dead, without a word of exposition.

The complex above is big: Courtyard, Plain Hall, Rec Area (with a door locked by a dial
that goes 0-1000 — no idea yet), two dorms, two sanfacs, a Mess Hall and a long Dorm
Corridor with a dead motorized walkway. In the Mess Hall I found a canteen (empty) and a
card slot; `put id card in slot` correctly told me the slot was too shallow and hinted
"It may be possible to slide something through," and `slide id card through slot` got me
"Inkorekt awtharazaashun kard...akses deeniid." So my Patrol ID is the wrong card and
there is a right one somewhere. That is a clean, well-signposted puzzle. In the Mess
Corridor there is a padlocked door needing a key.

### Turns 70-170: mapping the complex, and meeting Floyd

The complex is much bigger than I expected. East of the dorms is a "tremendously long
hall" with a dead motorized walkway, and walking it (turn 79) cost me *three hours* of
game time in one command. The game told me so afterwards — "(That walk took about 3
hours.)" — which I appreciated, but it is also the first real sign that time is a
resource here. Within two turns of arriving I got "A growl from your stomach warns that
you're getting pretty hungry and thirsty. (DIAGNOSE will tell you how you are doing.)"
and a second line telling me the goo would fix both. That is about as considerate as a
survival mechanic can be about introducing itself; I'd have hated to discover it by
starving.

`diagnose` (turn 81) gave me a clean readout including the excellent clarification
"(Those are hours on your chronometer, not turns. Time passes as you move about, and some
walks take hours.)" I ate the red goo, which tasted of cherry pie and quenched my thirst
too. Two goos left and no idea where more food comes from — that is a low hum of worry
sitting under everything now.

Landmarks I found and could not yet use:
- A Rec Area door with a dial settable 0-1000. No clue what number.
- A padlocked door in the Mess Corridor. Needs a key.
- A card slot in the Mess Hall, and identical narrow slots in an Upper Elevator, a Lower
  Elevator and a Reactor Elevator. My Patrol ID gets "Inkorekt awtharazaashun kard."
- Booth 2, a teleport booth with buttons for 1 and 3: "Teleportaashun buux not aktivaatid."
- A 30-metre rift in the Admin Corridor, too wide to jump.
- A shiny steel key at the bottom of a crevice: "Either the crevice is too narrow, or
  your fingers are too large."
- A dark stairway down from Reactor Control. I stepped into it (turn 137) and got "It is
  pitch black. You might be eaten by a grue." and backed straight out.

And the goal board: **Systems Monitors**, where LIIBREREE, REEAKTURZ and LIIF SUPORT are
green, while PLANATEREE DEFENS, PLANATEREE KORS KUNTROOL, KUMUUNIKAASHUNZ and PRAJEKT
KUNTROOL are malfunctioning. That single room turned a wander into a mission. It is the
best piece of design I have hit so far — four named things to fix, no hand-holding about
how.

Storage East had a box of spares (a *cracked* fromitz board, two megafuses, a bedistor)
and an oil can; the Tool Room had pliers, a glass flask, a portable laser with an old
battery, and a heavy U-shaped bar with metal filings clinging to it — obviously a magnet,
obviously the answer to the key in the crevice. The Machine Shop has a chemical dispenser
with coolant, catalyst, BAAS and ASID buttons; I filled the flask with acid on turn 158.

Inventory limits are tight and the game is very good about them: instead of a bare
refusal, it says "Your load is too heavy. Dropping the towel would make enough room,"
naming a specific item. That is a small kindness that saved me a lot of fumbling.

Then the magnet bit me. In the Robot Shop I opened the deactivated robot's compartments
and found the "Loowur Elavaatur Akses Kard" (+1). The game warned me instantly — "the bar
is a strong magnet. Carried together any longer, it will smear the card's magnetic
stripe" — and I dropped the bar that turn and saved the card. It had already got my Patrol
ID earlier (turn 147), because I was running several commands without reading between
them, which was my fault, not the game's. The warning is one full turn ahead and
unambiguous. I am recording it as friction anyway only because the smear appears to be
permanent and there is no way to tell whether I have just broken the game.

Turning the robot on (turn 166, +2) and waiting one turn produced Floyd: "Hi! I'm B-19-7,
but to everyperson I'm called Floyd. Are you a doctor-person or a planner-person?" He
asked me to play Hider-and-Seeker. `floyd, follow me` got "Okay!" I like him already.

### Turns 170-224 (second run) and the replay: killed by bedtime

Floyd turned out to be delightful company and completely useless as a tool. `floyd, get
the key` — the obvious thing to do with a small robot standing next to a crack too narrow
for my fingers — got "Floyd whines, 'Enough talking! Let's play Hider-and-Seeker.'" So did
every other order I gave him except `follow me` and `go north`. I played Hider-and-Seeker
four times (turns 177-181) on the theory that he'd settle down afterwards. He did not. I
eventually concluded that the play line is just his catch-all refusal, which is charming
the first time and misleading the fourth, because it reads like a condition I could clear.
The actual answer to the key was the magnet bar: `get key with bar` (turn 196) — "a piece
of metal leaps from the crevice and affixes itself to the magnet." That is a good puzzle
and I got there, just via Floyd first.

He also asked, "Tell Floyd a story?" I typed `tell floyd a story` and got 'I don't know
the word "story".' A character asking for something the parser has never heard of is the
purest form of this kind of friction.

I used the access card in the Lower Elevator ("Elevator enabled"), rode it down, and found
a Waiting Area and the **Kalamontee Platform** with a shuttle transport waiting, door open
(+4, score 13). And that is exactly where the game killed me.

The weariness warnings came at turn 181 ("You begin to feel weary"), turn 215 ("If you
don't get some sleep soon you'll probably drop") and turn 219 ("You can barely keep your
eyes open"). At turn 220 I typed `sleep` and the game told me, helpfully and far too late,
"Civilized members of society usually sleep in beds. The dormitories have bunks: Dorms C
and D off the Dorm Corridor, Dorms A and B off the Rec Corridor." Those bunks were an
elevator ride, a corridor and a *three-hour walk* away. Four turns later: "You can't stay
awake a moment longer... several ferocious beasts (could they be grues?) surround and
attack you. Perhaps you should have found a slightly safer place to sleep." Dead, score 13.

That death is the single worst thing that has happened to me in this game, and not because
it is unfair in principle — it is because the geography and the clock are in direct
conflict and nothing tells you so until you are already stranded. The complex is split into
a west half (dorms, mess, rec) and an east half (tools, robot, elevators, shuttle) joined
by a corridor that costs three hours each way and has a *dead* moving walkway taunting you
from the wall. All the beds are in the west half. All the interesting work is in the east
half. I did not find a way to make the walkway run (`oil walkway` — "The walkway doesn't
need oiling," a nicely specific refusal; `turn on walkway` — "You can't turn that on"), and
the teleport booth in the Elevator Lobby says "Teleportaashun buux not aktivaatid."

I also discovered on the replay that SAVE *does* work in this build (`save` → "Ok.", no
turn consumed), which the death message had been nagging me about both times. I should
have tried it on turn 1. That is on me, but it is also the kind of thing a first-time
player only learns by losing two hours of play.

Replaying, I found the crevice has a discoverability wrinkle: on a fresh game `get key with
bar` says "You can't see any key here!" until you have typed `examine crevice` once. The
room description only says "Lying at the bottom of a narrow crevice is a shiny object"
*after* you've looked. So the puzzle has a hidden prerequisite step that isn't a puzzle.

And the magnet smeared my Patrol ID card again, despite my knowing the trap was there: the
warning fires the turn you pick up the bar, and the very next command — even `inventory` —
spends the grace turn. You essentially have to drop the card before you touch the magnet.

### Third run, turns 0-163: doing it properly, and surviving to Day 2

Third life. I replayed the Feinstein and the pod from memory in about 30 turns, saved at
the Courtyard, and went at the complex with a plan. Two things I did differently:

First, I used SAVE. `save` costs no turn and Floyd's reaction to it is the best joke in the
game so far — "Floyd's eyes light up. 'Oh boy! Are we gonna try something dangerous now?'"
That single line taught me more about what SAVE is for than the death message's nagging did.

Second, I treated bedtime as the hard constraint it is. I did the east wing in the evening
(magnet, key, robot, access card, Floyd), rode the Lower Elevator down to the Kalamontee
Platform, looked over the shuttle, and then walked all the way back west with hours to
spare. The shuttle, "Shuttle Car Alfie," has control cabins at both ends, each with a slot,
a +/- lever and a digital display reading 0. `push lever up` gets "Shuttle controls are not
currently activated" and my access card gets "Inkorekt awtharazaashun kard." So there is a
third card somewhere. The window in the east cabin shows rails running down a long tunnel;
the west cabin's window shows a concrete wall. That's a nice way of telling me which
direction the shuttle goes without saying it.

The key opened the padlock in the Mess Corridor (`unlock padlock with key` — "The padlock
springs open"), but `open door` then said "The door cannot be opened until the padlock is
removed," which is a slightly pedantic extra step; `take padlock` did it. Behind it is
**Storage West** (+4, score 17) with two things I badly want: a heavy-duty extendable
aluminium ladder — obviously the answer to the eight-metre rift in the Admin Corridor — and
an unopened tin of "Spam and Egz." `open can` says "you don't seem to have found a can
opener yet," which is a clear enough pointer; I suspect the laser in the Tool Room.

The ladder is so heavy that `take ladder` says "You'd have to drop the survival kit, the
tin can and the towel first." `floyd, take the ladder` got the Hider-and-Seeker brush-off
again. So the ladder is a dedicated three-hour round trip, which I will do first thing
tomorrow.

Bedtime itself has several steps nobody tells you about in advance. `sleep` when not tired
gives "You're not tired!"; when tired but standing it gives "You'd better get into one of
the bunks first"; `enter bunk` gives "Ahhh...the bed is soft and comfortable"; and then you
just wait and it happens. I got there on turn 158 and woke to "***** SEPTEM 7, 11344 *****
You wake up feeling refreshed" with Floyd bouncing at the foot of the bed saying "About
time you woke up, you lazy bones!" The clock reset from 8248 to 1628, which made the
day/night economy suddenly legible: a day is roughly 4500-8500 on the chronometer and you
must be in a bunk by the end of it.

One thing I would never have guessed: "While you slept, the things you were carrying
slipped to the floor beside you." `take all` picked them back up, but if I had slept
somewhere and walked off without looking down I'd have lost everything.

Also, the dial door in the Rec Area is still shut. It takes a number from 0 to 1000 and I
have no candidate. I tried 531 and 541 (fragments of my own Patrol ID number) on the off
chance. "The door is locked. You probably have to turn the dial to some number to open it."

### Day 2, turns 163-229: the ladder, the offices, the tower — and starving to death in style

Day 2 opened well. I hauled the ladder east (the game reminds you the walk took three
hours, and warns you as you arrive that you're getting hungry — and, beautifully, it names
the room where you left your food: "There is still goo in the survival kit you left in
Storage West." That is a genuinely thoughtful piece of writing).

The ladder puzzle has a nice two-step shape: `extend ladder` while holding it gives "You
couldn't possibly extend the ladder while you're holding it," and `put ladder across rift`
before extending gives "The ladder, far too short to reach the other edge of the rift, would
simply plunge in. It had better be extended first." Drop, extend, place — and "The ladder
swings out across the rift and comes to rest on the far edge." Crossing it (+4, score 21)
was the best moment of the session: "You slowly make your way across the swaying ladder. You
can see sharp, pointy rocks at the bottom of the rift, far below..."

Beyond the rift: a Plan Room with maps of the Kalamontee Komplex (where I am) and the
Lawanda Komplex (two installations, one buried deep underground); a Transportation Supply
room that is pitch black and full of grues; and two offices. The Small Office desk held a
kitchen access card and an upper elevator access card (+2); the Large Office desk held a
shuttle access card (+1). Three of the four locked things in this game opened at once. That
felt great.

The Upper Elevator, enabled with its card, goes up to a **Tower Core** (+4, score 28) with a
Helipad and a rusted helicopter on top (control panel "covered and locked"), an Observation
Deck showing another island about 20 km east — which must be Lawanda — and, best of all, a
**Comm Room**. The receive console had a blinking "Tranzmishun Reeseevd" light; pressing
Message Playback played the Feinstein's own comms officer calling planetside, cut off
mid-sentence by the explosion that destroyed her. The send console is trying to transmit
"Planitwiid plaag haz struk entiir popyuulaashun. Tiim iz kritikul. Eemurjensee asistins
reekwestid" and is blocked by a "Malfunkshun in Sendeeng Kuulint Sistum," with a funnel-
shaped hole labelled "Kuulint Sistum Manyuuwul Oovuriid" and an enunciator panel of coloured
lights — red, blue, green, yellow, gray, brown, black — with the **green** one flashing.

Those are exactly the colours of the dispenser buttons in the Machine Shop: KUULINTS 1-4 are
red, blue, green, yellow and KATALISTS 1-3 are gray, brown, black. So the fix is: fill the
flask with green coolant and pour it into the funnel. That is a lovely long-range puzzle —
two rooms half a complex apart that only click together when you notice the colour list is
the same list. I am very pleased with myself for spotting it and I have not yet got to try it,
because I am about to starve to death.

That is the second time the survival clock has wrecked me, and this one is structural. The
ladder is so heavy that carrying it means carrying *nothing else* — not the survival kit, not
the canteen. So the only way to open up the north half of the map is to leave your food behind,
three hours' walk away, and then the game starts the hunger timer while you are on the wrong
side of it. By the time I reached the Comm Room, `diagnose` said "You are a bit sick and
feverish... You can go about 3 hours longer without food or drink." The walk back alone is
three hours, and that is before the elevator ride. There is no food anywhere in the eastern
half of the complex that I have found.

I am going to RESTORE to the save I made on the near side of the rift rather than die, which
at least lets me test that RESTORE works.

### Turns 184-383: restore, the Comm Room fix, and the shuttle to Lawanda

RESTORE works, and Floyd's line when you use it is wonderful: "Floyd looks disappointed,
but understanding. 'That part of the game was more fun than this part,' he admits." I went
back to the near side of the rift with twelve hours of food in me, re-collected the three
cards, and walked straight west to the kitchen.

The **Kitchen** (+4) is the answer to the whole survival problem and I wish I had found it a
day earlier. It has a "Hii Prooteen Likwid Dispensur" with an *octagonal niche* — and the
canteen I picked up in the Mess Hall on my first hour on the planet is described as
"octagonally-shaped." That is a beautiful piece of delayed payoff. (You do have to open the
canteen first; pressing the button with it closed just spills brown liquid on the floor,
which is a fair and funny way to teach you.) From then on `drink from canteen` handles food
and thirst in one turn and I stopped being afraid of the clock.

The Comm Room repair worked exactly as I'd guessed. Green light flashing → green KUULINT
from the Machine Shop dispenser → `pour fluid into hole` → "the enunciator panel blink[s]
rapidly and all go off except one, a brown light." Then brown KATALIST → pour → "the help
message is now being sent." +6 points, score 38, and the Systems Monitors now read
KUMUUNIKAASHUNZ green. Chaining two rooms half a complex apart through a colour code is the
best puzzle in the game so far.

Two things made that repair more painful than it should have been. `pour flask into hole`
is refused with a joke about "section 17.9.2 of the Galactic Adventure Game Compendium of
Rules" — you have to say `pour fluid into hole`. And the carrying limit means the flask and
the canteen cannot be held together, so every trip is a juggling act; one failed `take`
dropped both on the floor and I walked an elevator ride away before I noticed.

Then the **shuttle**. The shuttle access card activates the controls; `push lever up`
accelerates in steps of 5 per turn; a sign says "Limit 45"; at the halfway mark another sign
says "Beegin Deeseluraashun." This is a lovely little driving minigame and I nearly failed
it on vocabulary alone: to hold speed you must return the lever to the middle, and the game
does not know the words "center", "central" or "middle" — even though the room description
literally says "The lever can be set at a central position." `pull lever` moves it one notch,
which I found by guessing while accelerating through a speed limit.

I then misjudged the ending: I decelerated all the way to 5 too early, stopped between
stations (the doors won't open: "Operator should remain in control cabin while shuttle car
is between stations"), nudged forward again, and at speed 5 the car "rumbles through the
station and smashes into the wall at the far end." Both the car and I made "unhealthy
crunching sounds." No damage I can detect, but I have probably wrecked the shuttle I came in
on, and there were countdown signs (15, 10, 5) I did not understand until too late.

**Lawanda Platform** (+4, score 42). Up a dead escalator is a fork, and northwest of that an
**Infirmary** — beds, an emergency ration, a red spool labelled "Simptumz uv Xe Dizeez," and a
bottle of "Dizeez supreshun medisin -- eksperimentul." I had been "a bit sick and feverish"
since the previous morning without being told why; `drink medicine` broke the fever
instantly and `diagnose` went back to "perfect health." The bottle is now empty, which I
assume means the clock is still running on whatever I have caught.

And this is where the game got me. While I read the label, "Floyd, rummaging in a corner,
finds something... the breast plate of a robot... Floyd stares at it in complete silence. A
moment later, he begins sobbing quietly, awkwardly excuses himself, and runs out of the
room. You look at the breast plate, and notice the name 'Lazarus' engraved on it." He had
been cheerfully telling me about his friend Lazarus for two days. I did not expect a text
adventure from this parser to land a punch like that.

Below the Systems Corridor is a Repair Room with the body of a robot called Achilles, whom
Floyd eulogises coolly and honestly, and a robot-sized doorway too small for me. Here is the
thing I had wrong all along: `floyd, go through the small doorway` **works** — "Floyd
squeezes through the opening... 'Floyd found a rubber ball inside... Nothing else
interesting inside. Just a shiny fromitz board.'" And `floyd, get the shiny fromitz board`
gets "Floyd shrugs. 'If you say so.'" So Floyd does take orders; the Hider-and-Seeker whine
is simply his parse-failure message, and it had convinced me for two in-game days that he
was a pet rather than a tool. That is a design cost I'd fix before anything else.

### Turns 383-554: the teleport card changes everything, then the Infirmary kills me

Lawanda is where the game opens up. Beyond the Infirmary the Systems Corridor leads to
**Planetary Defense** (a "Surkit Boord Faalyur" warning over an access panel with four
identical seventeen-centimeter fromitz boards; reaching in gets you "a powerful shock", and
I still have not solved it), **Course Control** ("Bedistur Faalyur!" over a metal cube
holding a fused ninety-ohm bedistor), a **Library Lobby** with a browsable terminal, a
**Library** with a microfilm reader, a **Main Lab**, a **Computer Room**, and a **ProjCon
Office**.

The library terminal is the best worldbuilding in the game. Typing `5` then `1` and `3`
gets you the whole backstory in phonetic Galalingua: the disease escaped from a cryogenics
research centre, and the Project's four phases are build the complexes, freeze the entire
population, run automated research while monitoring the cryogenics, then revive and
inoculate everyone. Suddenly the four broken systems on that monitor wall two days' walk
away stop being a checklist and start being the reason anyone is still alive.

The chain that unlocked the game for me went: helicopter manual spool in the Library Lobby →
"Reekwiird ekwipmint inkluudz aa Helikoptur Akses Kard and aa Kuntrool Panul Kee... obtaand
frum Tranzportaashun Stoorij" (which is the pitch-black room back on Kalamontee, so I still
need a light I have not found) → a **lab uniform** in Lab Storage whose *pocket* holds a
piece of paper reading "Kombinaashun tuu Konfurins Ruum: 982" and a **teleportation access
card**. `look in lab uniform` is the move; `open pocket` and `look in pocket` both just ask
which uniform I mean.

That card is the single most important object in the game and nothing marks it as such. It
turns the three "Teleportaashun buux not aktivaatid" booths into instant travel between the
Lawanda library, the Kalamontee elevator lobby and — once 982 opened the Rec Area door onto a
Conference Room — the Kalamontee dorm wing. The three-hour corridor, the elevators and the
shuttle all became optional in one turn. I wish I had found it on day one, and I am not sure
a first-time player finds it at all, since it is inside a pocket of a uniform on a rack in a
side room beyond a radiation-lock door on the far island.

With travel solved I did the repairs. Pliers from the Kalamontee Tool Room + the good
bedistor from Storage East → `take fused bedistor with pliers`, `put good bedistor in cube` →
"The warning lights go out" (+6, score 48). The ProjCon Office has a garish mural that
"seems to ripple now and then, as though a breeze were blowing behind it"; `shoot mural with
laser` scored +2 but did not damage it even at setting 6, so there is something behind it I
cannot reach yet. (`cut mural with laser` gets 'I don't know the word "cut"', which is an odd
gap for a game that hands you a cutting tool.) The Computer Room printout says drug testing
is at 99.985% and "Proojektid tiim tuu reeviivul prooseedzur: 0 daaz, 0.8 kronz" — and then
"ALURT! Malfunkshun in Sekshun 384! Sumuneeng reepaar roobot," which is presumably Achilles,
who is lying dead at the foot of a staircase two corridors away. That is a genuinely
chilling piece of information design.

The red spool in the Infirmary, read on the microfilm reader, finally explained my fever:
"Wuns xe furst simptumz ar shoon, dex alwaaz okurz in aat tuu ten daaz." So there is a real
deadline, it started on Day 2, and the one bottle of experimental medicine I found is empty.

And the Infirmary killed me. Looking for somewhere safe to spend Day 2's night, I picked the
room with beds in it — "a clean, well-lighted place", the room with the medicine and the
ration, exactly what the SLEEP hint means by "a nice safe place to sleep" — and `enter bed`
produced a rusted diagnostic robot that strapped me down, injected me with all 347 serums it
carried, and began sawing my legs off. No warning, no saving throw, no way to get out. I had
saved eight turns earlier at Booth 3, which is the only reason this leg did not end there.

I restored, teleported to Kalamontee, walked to Dorm C and slept in a bunk like a civilised
person. Day 3 opened with a dream about throwing my scrub brush at Blather, which was a nice
touch, and I spent the morning finishing Course Control and reading the library.

### Report

**Where I got to.** Day 3, morning, alive and in perfect health, standing in the Library of
the Lawanda Complex with Floyd somewhere nearby. **Score 50 out of 80**, rank "Planetary
Commodore". About 550 turns across three lives (I died three times: blown up with the
Feinstein, eaten by beasts for sleeping on the floor of an elevator, and vivisected by a
diagnostic robot in the Infirmary).

**What I fixed.** Two of the four broken systems. KUMUUNIKAASHUNZ, by working out that the
enunciator panel's coloured lights in the Comm Room name buttons on the chemical dispenser
half a complex away — green coolant, then brown catalyst, poured into the manual override
(+6). PLANATEREE KORS KUNTROOL, by pulling a fused bedistor out with wide-nosed pliers and
dropping in the good one from a cardboard box in a storage room on the other island (+6).

**What stopped me.**
- *Planetary Defense.* Four identical fromitz boards, one of them bad, and reaching into the
  panel gets me "a powerful shock". I have a good spare board and no idea how to make the
  panel safe or how to identify the dead one.
- *Project Control.* A mural that ripples "as though a breeze were blowing behind it" and
  shrugs off a laser at maximum setting. Something is behind it. The computer printout says
  "Malfunkshun in Sekshun 384" and the repair robot it summoned is a corpse at the bottom of
  a staircase.
- *Two pitch-black rooms* — Transportation Supply beyond the rift, and the Reactor Access
  Stairs — which I need for the helicopter access card and control panel key, and for which
  I have found no light source at all. The laser is not one (`turn on laser` — "You can't
  turn that on").
- *The clock.* The spool says death follows first symptoms in eight to ten days; mine started
  on Day 2, and the only medicine bottle is now empty.

**What the game does well.** A great deal, and I want to be clear about it before the
complaints. The corrupted-Galalingua signage is a small stroke of genius — you decode it
yourself, which makes the dead civilisation feel *read* rather than described. The Systems
Monitors room converts aimless wandering into a mission in one paragraph. The Comm Room
colour-code puzzle spans two complexes and clicks beautifully. The failure messages are
unusually well written and specific: "oil walkway" gets "The walkway doesn't need oiling"
rather than a shrug, the inventory limit tells you exactly which item to drop, and the hunger
warnings name the room where you left your food. `diagnose` is generous and even explains
that its hours are chronometer hours, not turns. The escape-pod descent is paced like a
film. And Floyd is the best-written NPC I have met in a parser game: he asks whether you are
a doctor-person or a planner-person, recites six hundred digits of pi, scrawls his name on
walls in crayon, says "Oh boy! Are we gonna try something dangerous now?" when you SAVE and
"That part of the game was more fun than this part" when you RESTORE, and then finds the
breastplate of his dead friend Lazarus and quietly leaves the room. I did not expect to be
moved and I was.

### Verdict

**Could a first-time player finish this?** Honestly, no — not without either luck or a lot of
replaying. I got to 50/80 and I was leaning hard on SAVE by the end, and SAVE is a thing the
game only recommends to you *after* it has killed you. The failure modes are not the puzzles;
the puzzles are fair and often elegant. The failure modes are logistics (food, sleep and
carrying capacity fighting a map with a three-hour walk down its middle) and two or three
unsignalled instant deaths. A player without my willingness to replay the first thirty turns
from memory would have bounced off at the pod, or at the first night, or in the Infirmary.

**The three changes that would most improve it:**

1. **Give Floyd a real "I don't understand that" line.** His Hider-and-Seeker whine is the
   response to every order he cannot parse, and it reads as a *state* — as if he'll obey once
   he's had his game. I played Hider-and-Seeker four times trying to clear it, and then spent
   two in-game days believing Floyd was a pet, when in fact `floyd, go through the small
   doorway` and `floyd, get the shiny fromitz board` work perfectly. That one message cost me
   more progress than any puzzle in the game.

2. **Warn before the two unsurvivable sleeps.** Sleeping anywhere but a bunk is instant death
   by grue-ish beasts, and `enter bed` in the Infirmary — the safest-looking room on the map
   — is instant death by malfunctioning surgeon. The game already knows how to do this well:
   it names the four dorms when you type SLEEP, and it names the room where you left your goo
   when you get hungry. A line as the sun goes down ("the corridors won't be safe after
   dark") and a glance at the Infirmary's "complicated looking equipment" showing it twitching
   would cost nothing and remove two of my three deaths.

3. **Stop making a plastic card weigh as much as a tin of Spam.** Six separate times a `take`
   failed with "Oh, no. The X slips from your arms" and I walked off without noticing. Either
   let small flat things (cards, spools, paper) be free, or make the uniform pockets the
   obvious default — putting cards in the worn Patrol uniform *does* free your hands, and
   nothing in the game ever suggests it, not even the otherwise-excellent "Dropping the towel
   would make enough room" hint.

Honourable mention, because it nearly ended a run: the shuttle's lever. The room description
says "The lever can be set at a central position" and the parser does not know "center",
"central" or "middle".


### Leg 2

> **Note from the session that ran these testers, not from a tester.** Leg 2 was attempted twice. The first attempt
> played roughly turns 555-676 and was then killed by an API outage before it had written a single narrative section,
> so those ~120 commands exist only in the raw transcript (`scripts/out/playtest/typed-12-transcript.txt`) and not in
> this diary. That is why the inherited-state notes just below, written by that first attempt from leg 1's ending, do
> not match what the second attempt found when it typed `look`. Reconstructed from the transcript, the missing stretch
> is: the Bio Lab sequence and Floyd's death (+2), the miniaturisation access card (+1), miniaturising into the
> computer at Station 384, the walk up the strip, shooting the speck off the micro-relay (+4 and +8), and the return
> (+4) -- score 50 to 69, ending in the Lab Office with Floyd dead, a gas mask on and mutants in the building. It also
> means the friction of those 120 commands went unrecorded. Round thirteen's prompts should have testers write before
> they play, not only every 40-60 commands.

I am taking over this session from myself, a leg later. What I know, from my own diary above:

**State inherited.** Day 3 of the Kalamontee/Lawanda story, morning, alive and (as of the last
entry) in perfect health after drinking the experimental medicine. Standing in the Library of
the Lawanda Complex. Score 50 of 80, rank "Planetary Commodore", about 550 turns played across
three lives. Floyd is somewhere nearby and does, in fact, take orders.

**What I believe I have.** A teleportation access card (the key to the whole map: booths in the
Lawanda Library, the Kalamontee Elevator Lobby and the Kalamontee Conference Room, the last of
which is behind the Rec Area dial door set to 982). A shuttle access card, an upper elevator
access card, a kitchen access card, a lower elevator access card. A canteen that refills at the
Kitchen's octagonal niche and solves food and drink in one turn. Pliers, a laser, a magnet bar,
a good fromitz board and assorted spares scattered across two islands.

**What is done.** KUMUUNIKAASHUNZ (green coolant, brown catalyst, poured into the Comm Room
override) and PLANATEREE KORS KUNTROOL (fused bedistor out with pliers, good one in).

**What is not.** PLANATEREE DEFENS -- four identical fromitz boards in a live panel that shocks
me. PRAJEKT KUNTROOL -- a mural that ripples as if a breeze were behind it and shrugs off the
laser. Two pitch-black rooms (Transportation Supply, Reactor Access Stairs) that I need for the
helicopter access card and control panel key, and no light source found in three days. And a
disease that the microfilm says kills eight to ten days after first symptoms, which for me was
Day 2.

**The plan.** Find a light. Work out how to de-power the defense panel. Get behind the mural.
And keep saving.

#### Turns 676-676: I opened my eyes in a room I had never heard of, and `inventory` killed me

The first thing to say about this leg is that my own notes were wrong, and not by a little.
My Leg 2 heading says I am standing in the Lawanda Library on the morning of Day 3 with a
score of 50 and Floyd somewhere nearby. I typed `look` and got the **Bio Lab**: turn 676,
afternoon, score 69, and four monsters in the room with me — a shelled thing with mandibles,
a humanoid swinging a piece of lab equipment like an axe, something with slavering fangs
squinting in the light, and a giant plant walking on three stalks. The last line was "The air
is filled with mist, which is affecting the mutants. They appear to be stunned and confused,
but are slowly recovering."

I did the sane thing for a player who has just woken up in a strange room and typed
`inventory`. That was my one remaining turn. "The last traces of mist in the air vanish. The
mutants, recovering quickly, notice you and begin salivating... Dozens of hungry eyes fix on
you as the mutations surround you and begin feasting." Dead on turn 677, score 69.

I want to be fair about this: the handoff is my own fault, not the game's. But the *game* part
of it is real and worth filing. "Stunned and confused, but are slowly recovering" is the only
information you get, and it reads like a paragraph of atmosphere rather than a one-turn fuse.
There is no "the mist is thinning", no count, nothing escalating. A player who stops to think
for one turn — and `inventory` is the most reflexive turn in the genre — dies.

The inventory I did get to read before dying was useful: chronometer and Patrol uniform worn
(with ID card, kitchen access card and upper elevator access card in the pockets), a canteen,
a red spool, a shiny seventeen-centimeter fromitz board, a miniaturization access card, a
teleportation access card, and — the important one — **a gas mask, being worn**. So my past
self had come here on purpose and equipped for it. Also: "You're now really ravenous and your
lips are quite parched. There is nothing to eat or drink on this side of the shuttle tunnel."

#### Turns 665-684: the Lab Office, the memo, and five ways to die in a bio lock

RESTORE dropped me at turn 665 in the **Lab Office**, which turns out to be the room the Bio
Lab leads *from*. It is a lovely little pressure-cooker of a room: a messy desk, locked
filing cabinets, a small booth to the south, a closed door west labelled "Biioo Lab", and
three wall buttons — white "Lab Liits On", black "Lab Liits Of", red "Eemurjensee Sistum" —
plus the sentence "You realize with shock and horror that the only way out is through the
mutant-infested Bio Lab."

South is an **Auxiliary Booth**: "Unlike the Miniaturization Booth, this room has no slot or
keyboard, so presumably it is intended only as a receiving station." That one sentence told me
how I got here (I was shipped in through a miniaturization booth) and that I cannot leave the
same way. Good, economical writing.

`examine desk` turned up a memo, and the memo is the puzzle: "an eemurjensee sistum haz bin
instawld. Xis sistum wud flud xe entiir Biioo Lab wic aa dedlee fungasiid. Propur preecawshunz
shud bee taakin if xis sistum iz evur yuuzd." Emergency system, deadly fungicide, take proper
precautions — and I am already wearing a gas mask. `diagnose` said "a bit sick and feverish"
(the plague is still in me) and "about 9 hours longer without food or drink".

Then I spent about thirty turns dying in that bio lock, and I learned the shape of it the hard
way:

- The order is **forced**. `open door` before pressing the red button: "Mutated monsters from
  the Bio Lab pour into the office. You are devoured." So you cannot pre-open the door to save
  a turn.
- Pressing the button and **waiting** three turns for the "deadly" fungicide to actually kill
  anything, then opening the door: devoured again. The fungicide never kills them. It stuns
  them for about five turns and that is all, which is not what the memo says at all.
- The exact window is: press (t), open office door (t+1), west into the Bio Lab (t+2), open
  the lab door on the far side (t+3), west into Bio Lock East (t+4). There is no slack in that
  sequence, and the lab door is closed, so you *must* burn a turn opening it while standing
  in a room full of monsters.
- `north` toward the "gaping crack in the northern wall" with its faint blue glow: "You can't
  go that way." `enter crack`: "You hit your head against the crack as you attempt this feat."
  The crack is scenery, or it wants me smaller. I have a miniaturization access card in my
  pocket and no booth to use it in, so I have to let that go for now.
- And however fast you are, **they follow you out**. Every single turn: "The mutants burst into
  the room right on your heels!" and a bite. `close east door` in Bio Lock East, on the turn I
  arrived, with the mist still active: "The door closes, but not soon enough!" — dead.

The one grace is that failed commands cost no turn at all. "The office door is closed", "The
lab door is closed", "You can't go that way" — all free. In a five-turn escape that is the
difference between living and dying, and I only discovered it by watching the turn counter.

Bio Lock East is where the game twists the knife. It is the "second half of the sterilization
chamber", and lying on its floor are a lower elevator access card and **"Your former companion,
Floyd, is lying on the ground in a pool of oil."** My notes from the last leg end with Floyd
alive and taking orders; a friction row I filed later mentions him fetching a miniaturization
access card, so I know what happened in the hours I cannot remember. I have now run past his
body five times with monsters on my heels and have not had one spare turn to look at him. That
is a strange and genuinely affecting way to meet the news.

Past the bio lock is the **Main Lab** ("exits to the west and southwest, and heavy metal doors
to the northeast and southeast. A small doorway leads south"), and west of that a Project
Corridor running east-west with a ProjCon Office off it, ending at Project Corridor West which
curves northwest with an opening west to SanFac F. The mutants chased me through all of it,
nipping once per room. They do not seem to kill you outright while you keep moving forward —
but `south` into Lab Storage is a dead end and they came in after me, and turning round and
going back east got me "You stupidly run right into the jaws of the pursuing mutants," which
is a fair cop and also a very final one.

So: the escape works, the chase does not stop, and my next idea is that the chase is meant to
end somewhere specific — a teleport booth, most likely, since the teleportation access card is
the best thing I own. Northwest from Project Corridor West is the one door I have not tried.

#### Turns 671-689, over and over: mapping Lawanda by dying in it

I have now died about a dozen times in the same forty turns, and I have learned the rule of the
chase exactly. The mutants move one room per turn and are always immediately behind you. The
turn you arrive anywhere you get "The mutants burst into the room right on your heels!" and a
bite. If your next command is **anything other than a successful move into a new room**, you
die that turn. Not "eventually" — that turn. I confirmed it with `examine equipment` in the
Physical Plant, `push lever up` in a shuttle cabin, `slide card through slot` in the
Miniaturization Booth, `press brown button` in Booth 3 and `close east door` in the bio lock.
Turning round and going back the way you came is also instant death: "You stupidly run right
into the jaws of the pursuing mutants."

The one mercy is that *refused* commands are free — "You can't go that way", "The lab door is
closed", "It is a robot-sized doorway -- a bit too small for you" all leave the turn counter
untouched. So I could probe exits without dying, which is the only reason I got a map at all.
But note the inconsistency, because it nearly killed me twice: `press brown button` →
"Teleportaashun buux not aktivaatid" **does** cost a turn, and so does `push lever up` →
"Shuttle controls are not currently activated", and so does `score`. A player cannot tell which
refusals are free.

What I mapped, running for my life:

- **Main Lab** is the hub. West to Project Corridor East, southwest to the **Computer Room**,
  a small doorway south to **Lab Storage** (dead end), and the two "heavy metal doors": northeast
  is a **Radiation Lock** (two halves, "Raadeeaashun suuts must bee worn beeyond xis point", and
  "both lock doors cannot be open simultaneously"), southeast is just the bio lock I came out of.
- The Project Corridor runs west from there to **Project Corridor West**, which has a dead-end
  **SanFac F** to the west and curves northwest to a **Fork**. The Fork's southeast branch is
  simply the way back, which I learned by dying.
- West from the Fork is the top of the dead **Escalator** down to the **Lawanda Platform**, where
  two shuttle cars sit, north and south. I boarded **Shuttle Car Betty** and reached its west
  control cabin — the window shows "parallel rails running along the floor of a long tunnel" —
  and `push lever up` got "Shuttle controls are not currently activated." I no longer carry a
  shuttle access card, so that road home is shut.
- Northeast from the Fork is the **Systems Corridor**, with Planetary Defense off the middle
  section, Course Control off the east end, a narrow stairway down to the **Repair Room** (dead
  end; Achilles still face down at the bottom of the stairs), and, at the far east, the
  **Physical Plant** — a dead end, and a room the game deliberately flags as odd: "although the
  Lawanda Complex is slightly smaller than its counterpart, this plant is much larger than the
  one in the Kalamontee Complex."
- South from Systems Corridor East is the **Library Lobby**, where a glass flask and a medicine
  bottle are lying on the floor — dropped, I assume, by me. East of it is **Booth 3**.

And the best thing I found by dying: in the Computer Room there is a small booth to the south,
and it is the **Miniaturization Booth** — "a small slot, and next to it a keyboard with numeric
keys." I slid the miniaturization access card through on the turn I was eaten, and got: "A
melodic high-pitched voice says 'Miniaturization and teleportation booth activated. Please type
in **damaged sector number**.'"

That is the whole endgame in one sentence, and it snapped two loose threads together. My notes
say the Computer Room printout ends "ALURT! Malfunkshun in Sekshun **384**! Sumuneeng reepaar
roobot" — and the repair robot it summoned is Achilles, who is lying dead at the bottom of a
staircase. So *I* am the repair robot. I am carrying a shiny seventeen-centimeter fromitz board
and a miniaturization access card, and there is a booth that will shrink me and post me into
sector 384. I would bet the eleven points I am missing on it.

Which makes the Lab Office look like what it is: a wrong number. The Auxiliary Booth there is
"intended only as a receiving station", the Lab Office says in so many words "the only way out is
through the mutant-infested Bio Lab", and I think my forgotten self typed a sector that was not
damaged and got couriered into a cul-de-sac with four monsters in the doorway.

I also finally looked at the crack in the Bio Lab's north wall, which cost me a life to do:
`examine crack` — "The crack is too small to go through, but large enough to look through" —
and `look through crack` — "You see a laboratory suffused with a pale blue glow." That is the
Radiation Lab, which I know is behind the northeast heavy door. So the crack is a window, not a
door, and the Bio Lab has exactly two exits: east to the office, west to the bio lock.

The white and black buttons turn out to be nothing. `press white button` makes the Bio Lab
"bright" (and the crack's glow invisible); the black button puts it back to "dim". All four
mutants are there either way, including the one the prose says is "squinting in the light" —
which reads exactly like a hint that the lights matter, and they do not.

#### Turns 679-692: a mural I had already moved, an elevator, and the end of the game

I had convinced myself the chase was unsurvivable. The mutants never tire — I looped
Main Lab → Computer Room → Project Corridor East → Main Lab six times and they burst in behind
me every single turn until I collapsed "from extreme thirst and hunger" on turn 696, which is
the other clock: there is no food or drink anywhere on the Lawanda side, and the shuttle access
card that would have taken me home is lying on the floor of the **Infirmary**, one turn's
pickup I could not afford. `kill mutants` gets a polite disambiguation ("the rat-like, ant-like
man-sized monster or the hairy growling biped or the lurking fanged creature or the mobile
man-eating plant") and then "Attacking the mobile man-eating plant would accomplish nothing."
There is no fighting and no hiding.

So I started ticking off the last unvisited rooms as pure guesses, and on turn 682 I walked
south out of the Project Corridor into the **ProjCon Office** and read this:

> "The mural that previously adorned the south wall **has slid away**, revealing an open
> doorway to a large elevator!"

My leg-1 notes end with that mural intact — "seems to ripple now and then, as though a breeze
were blowing behind it", `shoot mural with laser` scoring +2 but not damaging it. Somewhere in
the hours I cannot remember, I opened it. And that is the whole escape: `south` into the
**Cryo-Elevator**, "The monsters are storming straight toward the elevator door!" — the one
room in the chase where they arrive a turn late — and `press button`:

> "The elevator door closes just as the monsters reach it! You slump back against the wall,
> exhausted from the chase. The elevator begins to move downward." **+5 points, score 74.**

I want to be precise about how that felt, because it is the single most important design
observation of this leg. It is a *terrific* moment — the pursuit, the closing door, the slump
against the wall. And I reached it by accident. Nothing in the Bio Lab, the Lab Office, the
memo or the Auxiliary Booth points anywhere near the Project Control office. The escape from a
timed, unmapped, zero-slack chase depends on having already solved an unrelated puzzle in a
room four corridors away, and if you have not solved it, the chase is simply a slow death you
cannot diagnose. I spent roughly forty commands and a dozen lives proving to myself that every
other door on Lawanda was a dead end.

The ride down is long — about five turns — and while I was starving I could not tell whether it
was moving at all. `open door` gets the nice "You must be very clever to do that to the
cryo-elevator door" and a second `press button` gets "Pushing the button doesn't seem to do
anything," neither of which tells you to be patient. Then: "The elevator door opens onto a room
to the north," and I stepped into the **Cryo-Anteroom**.

> "To the north, through a wide arch, is an enormous chamber lined from floor to ceiling with
> thousands of cryo-units. You can see similar chambers beyond, and your mind staggers at the
> thought of the millions of individuals asleep for countless centuries."

A medical robot glides in, injects the sleeper in the anteroom's single frosted cryo-unit, and
a woman with flowing red hair stands up: "I am Veldina, leader of Resida. Thanks to you, the
cure has been discovered, and the planetary systems repaired. We are eternally grateful."

And then the sting, which is genuinely the best-judged thing in the whole game:

> "Unfortunately, a second ship from your Stellar Patrol has been destroyed by our
> malfunctioning meteor defenses. I fear that you are stranded on Resida, possibly forever.
> However, we show our gratitude by offering you an unlimited bank account and a house in the
> country."

**GAME WON.** Score 74 out of 80, rank Cluster Admiral, Day 3, turn 692.

That last paragraph is the score report written as fiction. PLANATEREE DEFENS — the four
identical fromitz boards in the live panel that I never solved, and that leg 1 filed as row 22
— is the planet's *meteor defense*, and because I never fixed it, the ship that came to rescue
me was shot down and I am marooned on the planet I saved. Six missing points, delivered as a
personal consequence rather than a number. I have not seen a better use of a partial-score
ending.

And I know now, too late, exactly how those six points were meant to be earned: the
Miniaturization Booth south of the Computer Room, the "damaged sector number", the shiny
seventeen-centimeter fromitz board still in my pocket, and "Malfunkshun in Sekshun 384" on the
Computer Room printout. My past self, and then I, were carrying the part and the key to the
booth the whole time. The reason I could not use them is structural: the chase allows no
non-movement turn, the booth needs two, and the position I inherited had already gone past the
point of no return. My only save was inside the trap, and when I saved again in the elevator I
overwrote it. One save slot, one game.

### Report (Leg 2)

**Where I got to.** I finished the game. **GAME WON on turn 692, Day 3, score 74 out of 80**,
rank Cluster Admiral, alive, in the Cryo-Anteroom of the Lawanda Complex watching the population
of Resida wake up. About 115 commands played this leg, and roughly a dozen deaths inside a
forty-turn stretch — every one of them the Bio Lab mutants, except one starvation and one
self-inflicted `inventory`.

**What I inherited.** Not what my own diary said. The Leg 2 notes I wrote before playing had me
in the Lawanda Library on the morning of Day 3 with 50 points and Floyd alive. `look` put me in
the **Bio Lab**, afternoon, turn 676, score 69, surrounded by four mutants under a mist that had
one turn left, with a gas mask on my face, a shiny fromitz board and a miniaturization access
card in my pockets, and Floyd dead in a pool of oil in the next room. I died on my first command.

**What this leg was.** One puzzle, forty turns wide, played about fifteen times:

- **The Lab Office** is a cul-de-sac reached through a one-way miniaturization booth, and its own
  description says so: "the only way out is through the mutant-infested Bio Lab." A memo on the
  desk describes an emergency system that floods the lab with "aa dedlee fungasiid"; a red button
  on the wall fires it; the gas mask is the "propur preecawshun."
- The fungicide does **not** kill anything. It stuns the four mutants for exactly five turns, and
  the escape fits into those five turns with zero slack: press (t), open the office door (t+1),
  west (t+2), open the lab door on the far side (t+3), west into the bio lock (t+4). Opening the
  office door first, to save a turn, kills you instantly.
- Once you are out, **they follow forever**, one room behind, and any turn you spend not moving
  into a new room kills you that turn. So does turning round. I proved this with an examine, a
  lever, a card slot, a button press, a door close and a `score`.
- The exit is the **Cryo-Elevator** behind the ProjCon Office mural — and only if the mural has
  already been opened, by a puzzle in another wing that has nothing to do with the Bio Lab.
- The ending scores you in prose: the meteor defenses I never repaired shoot down the ship sent
  to rescue me, and I am given a country house on a planet I can never leave.

**What I never solved.** PLANATEREE DEFENS, the last broken system. The intended route is now
obvious and was unreachable from the position I inherited: slide the miniaturization access card
in the booth south of the Computer Room, type the damaged sector number from the Computer Room
printout (384), and replace the dead board with the shiny seventeen-centimeter fromitz board I
was carrying the whole time. That is two turns of standing still, and from the moment I opened
the Lab Office door I never had one. Leg 1's friction row 22 — "no idea how to make the panel
safe or how to identify the dead one" — was the right complaint aimed at the wrong panel: you are
not supposed to reach into it at all, you are supposed to be posted inside it.

### Verdict (Leg 2)

**Could a first-time player finish this?** I did, and I still say no — not honestly, and not
without the RESTORE key held down. The last hour of this game is built out of exactly the two
things the rest of it is careful about: an unsignalled timer and an unsignalled dependency.

The endgame's shape is excellent on paper. A one-way trip into a monster-infested wing; a memo
that arms you; a five-turn gas; a chase through a complex you had better have mapped; and a lift
door closing in a monster's face. Played once, knowing the answer, it would be one of the best
sequences I have met in a parser game. Played blind, it is a wall, because **every hatch in it is
a two-turn device in a one-turn chase**. Teleport booths need the card re-slid and then a button.
The miniaturization booth needs the card and then a number. The shuttle needs a card you dropped
in the Infirmary and then a lever. The shuttle access card, the pliers, the flask, the medicine
bottle — all of them are lying on floors you sprint through, one turn's pickup away, and one turn
is what you do not have. The only thing that works is a bare movement command into a room you had
to have prepared before you ever came down here.

**The three changes that would most improve it (Leg 2):**

1. **Signpost the Cryo-Elevator, or make the chase survivable without it.** Right now the escape
   from a zero-slack timed chase is a room in a different wing whose door only exists if you
   solved an unrelated laser puzzle earlier. There is no line anywhere — not in the memo, not in
   the Lab Office, not in the Bio Lab — that points at Project Control. Even a scrap in the
   locked files ("in an emergency, proceed to the ProjCon evacuation lift") would turn a
   coin-flip into a plan. Failing that, let the mutants tire, or let one door in the complex
   hold them.

2. **Make refusals cost time consistently, and say which ones do.** "You can't go that way," "The
   lab door is closed" and "a bit too small for you" are free; "Teleportaashun buux not
   aktivaatid," "Shuttle controls are not currently activated" and `score` are not. In a chase
   where one turn is the whole budget, that distinction is the difference between living and
   dying, and there is no way to learn it except by dying. `score` in particular should never
   cost a turn when `save` does not.

3. **Fix the memo, or fix the fungicide.** The one document in the room says the emergency system
   floods the lab with a *deadly* fungicide and that precautions should be taken. Wearing the
   mask and waiting for it to work — the reading any player takes from that sentence — is a
   death. Either let it kill them slowly (and give the player a reason to hold the door shut for
   ten turns), or have the memo say what it actually does: "xis sistum wil stun xe speesimenz
   for aa shoort tiim."

**And the thing I want on the record as working.** The ending. Veldina bows, thanks me for the
cure and the repaired systems, and then mentions that the rescue ship was shot down by the
meteor defenses I never fixed and I will be living out my life on Resida with an unlimited bank
account and a house in the country. It reports my missing six points as a fact about my life
rather than a number on a status line, and it made me want to go back and do it properly more
than any score screen ever has. Whatever else gets changed, do not touch that paragraph.

### Friction log

| # | I was trying to | I typed | What happened | How bad |
| ---|---|---|---|--- |
| 1 | Answer the ambassador's direct question about a game of Bocci | `yes` | "You sound rather positive." — the generic yes-handler. The NPC asked me a question and then ignored my answer. | Low |
| 2 | Restart after dying, following the game's own printed instruction | `restart` | "You have died. Start again with --new." The death text says "Type RESTART, RESTORE, or QUIT". **Correction, filed later:** RESTORE *does* work once you have a saved position (and SAVE works too, at no turn cost) — it is only RESTART that is refused, and the harness does tell you to use --new. I have downgraded this from Medium to Low; the real problem is the one in row 23. | Low |
| 3 | Press the Down button in the elevator (the panel literally says "an Up button, a Down button") | `press down` | "What do you want to press?" — I had to type `press down button`. The panel's own noun phrase is refused. | Low |
| 4 | Carry the magnetic bar and my ID card at the same time | `take bar` then `take pliers` | The bar smeared my ID card's magnetic stripe, permanently. The game warns one turn ahead, clearly — but the damage is irreversible and nothing tells you whether you have just made the game unwinnable. | Medium |
| 5 | Do what Floyd asked when he said "Tell Floyd a story?" | `tell floyd a story` | 'I don't know the word "story".' The game put the word in Floyd's mouth and then didn't recognise it. | Medium |
| 6 | Survive the night. I got the "you begin to feel weary" warning at turn 181 and was still four rooms plus a three-hour corridor walk away from the nearest bunk | `sleep` (turn 220, on the Kalamontee Platform) | "Civilized members of society usually sleep in beds. The dormitories have bunks: Dorms C and D off the Dorm Corridor, Dorms A and B off the Rec Corridor." Excellent hint — but it only appears once you type SLEEP, and by then it was too late to walk back. Four turns later I collapsed and was eaten. | High |
| 7 | Get Floyd to fish the key out of the crevice (he is a small robot, I am a large ensign) | `floyd, get the key`, `floyd, take key`, `floyd, get key from crevice` | All three: "Floyd whines, 'Enough talking! Let's play Hider-and-Seeker.'" It reads like a state I can clear by playing with him, so I played four times. It is actually just his parser-failure message. | Medium |
| 8 | Magnet the key out of the crevice on a fresh game | `get key with bar` | "You can't see any key here!" — the key only exists to the parser after you have typed `examine crevice` once. Hidden prerequisite. | Medium |
| 9 | Open the small door after unlocking its padlock | `unlock padlock with key` then `open door` | "The door cannot be opened until the padlock is removed." I had to also `take padlock`. Unlocking a padlock should imply unhooking it. | Low |
| 10 | Get Floyd to carry the heavy ladder for me | `floyd, take the ladder` | Hider-and-Seeker brush-off again. A four-foot general-purpose work robot who follows me everywhere cannot pick anything up. | Medium |
| 11 | Explore the northern half of the map without starving | (structural — `take ladder` forces you to drop the survival kit) | The ladder needed to bridge the rift is so heavy you must leave all food behind, and the only food is a three-hour walk west. I reached the Comm Room with "about 3 hours longer without food or drink" and no way back. Two of my three deaths are this same west/east split. | High |
| 12 | Eat the goo out of the open survival kit sitting on the floor in front of me | `eat green goo`, then `take green goo` | "You're not holding the survival kit." / "It would ooze through your fingers. You'll have to eat it right from the survival kit." You must `take kit` first. Two wasted turns while starving. | Low |
| 13 | Pour the flask of coolant into the manual override hole | `pour flask into hole` | "Pouring or spilling non-liquids is specifically forbidden by section 17.9.2 of the Galactic Adventure Game Compendium of Rules." Funny, but it refuses the obvious phrasing; `pour fluid into hole` works. | Medium |
| 14 | Carry the flask and the canteen together | `take flask` | "Oh, no. The canteen slips from your arms while taking the glass flask and both tumble to the ground." I didn't notice, walked six rooms and an elevator ride away, and had to come all the way back. The drop message reads like flavour, not failure. | Medium |
| 15 | Hold the shuttle at the posted speed limit of 45 by returning the lever to the middle | `put lever in center position`, `move lever to central position`, `push lever to middle` | 'I don't know the word "center".' / '"central".' / '"middle".' The room description itself says "The lever can be set at a central position" — the game does not know its own noun. `pull lever` is the answer. Doing this while accelerating past a speed limit in a tunnel is a bad moment to be fighting the parser. | High |
| 16 | Stop the shuttle at Lawanda Station | decelerated early, then `push lever up` / `pull lever` at speed 5 | Stopped between stations ("Operator should remain in control cabin while shuttle car is between stations"), then crept forward and "smashe[d] into the wall at the far end" at speed 5. The countdown signs (15, 10, 5) are the only clue to distance and I had no way to know 5 was still too fast. | Medium |
| 17 | Pick up two small items at once (a piece of paper and a plastic card) | `take paper and teleportation access card` | "Oh, no. The piece of paper slips from your arms while taking the teleportation access card and both tumble to the ground." This happened to me six separate times with cards, spools, a flask and a tin can. The failure is silent-ish — it reads as flavour — and twice I walked several rooms before noticing I was empty-handed. The inventory limit counts a plastic card the same as a tin of Spam. | High |
| 18 | Sleep safely in the Infirmary on Lawanda — "a clean, well-lighted place" with "a number of beds", found while looking for somewhere safe to spend the night | `enter bed` | Instant, unsurvivable death. A rusted diagnostic robot straps you down, "injects you with all 347 serums and medicines it carries," and starts sawing your legs off. There is no warning of any kind: the room reads as the single safest place in the game, it is where the medicine and the ration are, and the game's own SLEEP hint has been telling me for two days to find "a nice safe place to sleep." | High |
| 19 | Slice open the rippling mural with the laser I am holding | `cut mural with laser` | 'I don't know the word "cut".' `shoot mural with laser` works (and scored +2), but "cut" is the natural verb for a cutting tool. | Low |
| 20 | Teleport a second time from the same booth | `press tan button` | "Teleportaashun buux not aktivaatid." You must re-slide the teleportation card in every booth, every departure, including a booth you activated ten minutes ago. Minor, but easy to read as "the booth is broken". | Low |
| 21 | Get a light so I could enter Transportation Supply and the Reactor Access Stairs | `turn on laser` | "You can't turn that on." Two rooms I need are pitch black ("You might be eaten by a grue") and after three in-game days I have not found anything in the game that makes light. This is where I am stuck. | Medium |
| 22 | Pull one of the four identical fromitz boards out of the live Planetary Defense panel | `take first fromitz board`, then `take first fromitz board with pliers` | "You jerk your hand back as you receive a powerful shock" / "Nothing interesting happens." No hint about de-powering the panel, and no way I can see to tell which of the four boards is the bad one. Second place I am stuck. | Medium |
| 23 | Learn that SAVE existed and worked | (nothing — I only tried it after my second death) | The game nags "SAVE costs no time at all, and one would have spared you replaying all of this" only in the death message, and in the same breath tells you to type RESTART, which does not work. A first-time player loses hours before discovering the one command that would have protected them. | Medium |
| 24 | Chain two commands on one line, the way Infocom games normally allow | `put green spool in reader. press button` | 'I don't know the word "press".' Two problems in one: the period-separated chain is not supported, and the error blames a word the game *does* know (`press down button` works in the elevators), so it reads as a vocabulary gap rather than a syntax one. | Low |
| 25 | Tell the game which of the four identical boards I meant, after it asked me | `floyd, get the board` -> "Which do you mean, the first... or the fourth...?" -> `first` | 'I don't know the word "first".' The game printed the word itself, in its own question, one line earlier. `take first fromitz board` works fine as a whole command, so "first" is only unknown in the disambiguation prompt and inside a `floyd,` command. | Medium |
| 26 | Pick up the card Floyd died to fetch, in the room where he is dying | `take mini card` | "Oh, no. The shiny seventeen-centimeter fromitz board slips from your arms while taking the miniaturization access card and both tumble to the ground." Then `take shiny fromitz board` dropped the mini card again. I spent four turns juggling two flat objects over my friend's body. This is row 17 again, but the placement makes it much worse: it is the game's biggest emotional beat and the inventory system steps on the line. | High |
| 27 | Find out what I was carrying, on the turn I took over in a room full of stunned monsters | `inventory` | Death. "The last traces of mist in the air vanish... Dozens of hungry eyes fix on you." The Bio Lab's only warning is "They appear to be stunned and confused, but are slowly recovering" — no countdown, no thinning-mist escalation, no sense that this is a fuse. One reflexive `inventory` is fatal. | High |
| 28 | Let the "dedlee fungasiid" from the emergency system actually kill the mutants, as the memo on the desk says it would | `press red button`, `wait`, `wait`, `wait`, `open door` | "Mutated monsters from the Bio Lab pour into the office. You are devoured." The memo says the system "wud flud xe entiir Biioo Lab wic aa dedlee fungasiid" — deadly. It is not deadly; it stuns for about five turns. The in-game document actively misled me into a death. | Medium |
| 29 | Open the office door before pressing the emergency button, so the escape would be one turn shorter | `open door` | Instant death — the monsters pour in. Reasonable, but combined with the five-turn window and the closed lab door on the far side it means the escape has exactly one solution and zero slack; every experiment costs a death and a RESTORE. | Medium |
| 30 | Shut the mutants out behind me, on the very turn I reached the sterilization chamber | `close east door` (in Bio Lock East, mist still active) | "The door closes, but not soon enough!" then death. The room is explicitly a *sterilization chamber* with a door at each end, which is exactly the architecture that promises "shut it and you are safe". Closing a door on a pursuer is never possible, but nothing says so until you die of it. | Medium |
| 31 | Retreat out of a dead end (SanFac F) back the way I came, with the mutants one room behind | `east` | "You stupidly run right into the jaws of the pursuing mutants." Fatal. In an unmapped chase, the game punishes the one move that a lost player always makes — backing out of a dead end — and there is no cue which corridor branches are dead ends. | Medium |
| 32 | Get through the "gaping crack in the northern wall" that the Bio Lab description draws attention to, with its faint blue glow | `north`, then `enter crack` | "You can't go that way." / "You hit your head against the crack as you attempt this feat." The crack is the most emphasised feature of the room and, as far as I can tell, is pure scenery — while I am carrying a *miniaturization access card*. Under chase pressure that is an expensive red herring: `enter crack` costs a real turn, `north` does not. | Low |
| 33 | Work out which of my commands were safe while being chased — some refusals are free and some are not | `north` (free), `open lab door` when locked (free), vs `press brown button` -> "Teleportaashun buux not aktivaatid" (costs a turn, killed me), `push lever up` -> "Shuttle controls are not currently activated" (costs a turn, killed me) | Failed/refused commands mostly cost no time at all, which is how I mapped the chase. But the two "device is not activated" refusals *do* consume a turn, and so does `score`. During a one-turn-of-slack chase that inconsistency is lethal and completely invisible. | High |
| 34 | Check my score while being chased, expecting a meta-command to be free the way SAVE is | `score` | Cost a turn, the mist ran out and I was eaten. SAVE costs nothing; SCORE costs a turn. | Medium |
| 35 | Use the two lab light buttons, which the Bio Lab prose seems to be pointing at ("Lurking nearby is a vicious-looking creature with slavering fangs. **Squinting in the light**, it eyes you hungrily") | `press white button` / `press black button`, then enter the Bio Lab | The lighting changes between "bright" and "dim" and nothing else happens: all four mutants are present and pursue identically. A room description that singles out one creature's reaction to light, in a room with an On and an Off button on the wall next door, is a very loud hint at a puzzle that does not exist. | Medium |
| 36 | Reach the teleport booth I know exists on Lawanda and jump to Kalamontee, where the food is | ran to Booth 3, `press brown button` | Booths must be re-activated with the teleportation card on every single use (row 20), so escaping by teleport needs two turns — slide card, press button — and the chase allows exactly one. The same is true of the Miniaturization Booth (slide card, then type the number). Every escape hatch in the endgame is a two-turn device in a one-turn chase. | High |
| 37 | Survive the mutant chase out of the Bio Lab — the endgame's big set piece | ran every corridor on Lawanda; the answer turned out to be `south` from the ProjCon Office into the Cryo-Elevator, then `press button` | The only escape is a lift behind the ProjCon Office mural, and **that doorway only exists if you have already solved the mural puzzle in another wing**, which has no connection to the Bio Lab, the memo, the gas mask or the emergency system. Nothing anywhere points at Project Control. If the mural is still up when you gas the lab, the chase is an undiagnosable slow death — you starve at around turn 696 with no food on the Lawanda side and the shuttle access card lying on the Infirmary floor one unaffordable turn away. I found it by walking into the room to cross it off a list. | High |
| 38 | Pick up the shuttle access card, the pliers, the flask or the medicine bottle — all of them lying loose on the floor of rooms I was sprinting through | (never attempted; any `take` is a non-movement turn) | The chase permits exactly one command per room and it must be a successful move. Every tool I had dropped over the previous two days was visible, named and untouchable. The game shows you your own belongings on the floor while you run past them to your death, which is very effective and also means the chase has precisely one solution and no recovery. | High |
| 39 | Keep a fallback save while experimenting inside the trap | `save` at the Lab Office (turn 671), then `save` again in the Cryo-Elevator (turn 684) | One save slot. My second save silently destroyed the only position from which the last six points were still reachable — and by then I had also learned that the position was already past the point of no return. A second slot, or a warning that SAVE overwrites, would cost nothing. | Medium |
| 40 | Tell whether the Cryo-Elevator was moving, while starving | `open door` -> "You must be very clever to do that to the cryo-elevator door." / `press button` -> "Pushing the button doesn't seem to do anything." | The ride takes about five turns and the elevator gives no sign of progress until the door opens. Both refusals read as "this is broken" rather than "be patient", which is a bad thing to believe when the hunger timer has three warnings left. | Low |
| 41 | (Correction to row 22, filed by leg 1.) Get a fromitz board out of the live Planetary Defense panel | `take first fromitz board`, `take first fromitz board with pliers` | Leg 1 filed this as "no hint about de-powering the panel". I now think the panel is not meant to be opened by hand at all: the Miniaturization Booth south of the Computer Room says "Miniaturization and teleportation booth activated. Please type in damaged sector number," and the Computer Room printout names "Malfunkshun in Sekshun 384." You are meant to be shrunk and posted inside the machine. Downgrading the complaint to this: nothing connects the printout's sector number to the booth's prompt unless you happen to read both and remember them days apart, and the panel keeps offering a hands-on interaction that can never work. | Medium |
| 42 | (Correction to the Leg 2 handoff notes at the top of this section.) Resume the game where my own diary said I was | `look` | My notes said Lawanda Library, Day 3 morning, score 50, Floyd alive. The actual saved position was the Bio Lab, afternoon, turn 676, score 69, Floyd dead, one turn from being eaten. Not the game's fault — but worth recording that the game offers no in-fiction way to catch up on your own situation: there is no `recap`, `remember`, `objectives` or journal, `score` costs a turn, and `diagnose` only covers your body. In a game with a three-day clock and a memory-hostile save system, one free "where am I up to" command would be worth a lot. | Low |
