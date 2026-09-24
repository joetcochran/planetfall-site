# Round 11: typed-11, typed

The diary of one of the blind playtesters: a fresh AI agent that knew nothing of the game, played it through a text front end and wrote down what it did and what got in its way. How the rounds worked, and what each one changed, is told on [Playing it](playing-it.md); this round is in [Rounds ten and eleven](playing-it.md#rounds-ten-and-eleven), and every tester's numbers are in [How far each tester got](playing-it.md#how-far-each-tester-got).

- **Round:** 11, 11 September 2026
- **Mode:** typed: commands typed into the parser
- **Start:** from the start (Deck Nine, turn 0), in 3 legs
- **Result:** Did not win. Where play ended: Dorm C, turn 216, with 30 points, having reached 44 earlier.
- **Commands:** 951, with 5 deaths

**About the numbers.** Best 44 in leg 2, which ended in death with no save; leg 3 restarted from the beginning twice and ended alive at 30. The diary's verdict (line 994) counts three deaths; the transcript has five: one on the Feinstein in leg 1, starvation at the end of leg 2, and three in leg 3's first fresh run (drowned, then starved twice, each restored from that run's save) before it started again from the beginning.

The diary below is `playtests/2026-09-11/2026-09-11-typed-11.md`, copied by `scripts/wiki-diaries.mjs`. The tester's words are unchanged; only its layout is adjusted where the wiki would draw it badly, and its headings sit one level down.

## Typed playtest, round eleven — session `typed-11`

Start: `node scripts/playtest.mjs --session typed-11 --new`
Continue: `node scripts/playtest.mjs --session typed-11 <command words>`

Blind typed/parser play. Leg 1 of three, from the start of the game.

### Leg 1 (commands 1-~350)

#### Turns 1-24 (first run): the Feinstein, and dying in the corridor

Opening text drops you on Deck Nine with a scrub brush. `look at brush`, `inventory`,
`scrub deck` all work; `x` is accepted as an abbreviation for examine. Inventory is
brush, chronometer (worn), Patrol uniform (worn) containing an ID card.

`read id card` gives ID 6172-531-541 and "A dark magnetic stripe runs along the back" —
clearly a card-reader plant. `x chronometer` gives the time and a nice "Love, Mom and Dad"
engraving.

Blather is the prologue's leash. He swaggers in on turn 1, wanders off after a few turns,
and then *instantly* reappears the moment you step off Deck Nine:

> Ensign Blather, his uniform immaculate, enters and notices you are away from your post.
> "Twenty demerits, Ensign Seventh Class!" ... "Forty if you're not back on Deck Nine in
> five seconds!"

and any further movement away gets "Ensign Blather pushes you roughly back toward your
post." I tried Reactor Lobby (starboard) → aft to Auxiliary Control: blocked. Up the
gangway to Deck Eight → fore to the Hyperspatial Jump Machinery Room: "Blather blocks your
path, growling about extra galley duty." Waiting on Deck Eight just loops the same
"I said to return to your post" line forever with no escalation, so the two named rooms
off the prologue map (Auxiliary Control, Jump Machinery) appear to be pure scenery you can
never enter. That's a mild tease — they're advertised in room descriptions you can read
but never reach.

Then I made the beginner's mistake. The explosion sequence fired while I was standing on
Deck Nine:

- "A massive explosion rocks the ship. ... The door to port slides open."
- next turn: emergency bulkheads at the gangway and to starboard crash shut
- next turn: "the escape-pod bulkhead clangs shut"
- two turns later: dead.

I spent those turns typing `wait` because I assumed the game would tell me what to do. It
does not, and the window to go `port` is **one or two turns**. Death message, then:

> Would you like to restart the game from the beginning, restore a saved game position, or
> end this session of the game? (Type RESTART, RESTORE, or QUIT.)

Typing `restart` does nothing — the harness answers "You have died. Start again with
--new." The game text and the harness disagree about how to restart. (Harness-level, but
a first-time player reads the game's own prompt.)

#### Turns 1-21 (second run): the prologue, timed

Restarted. The explosion is on a **clock, not a turn counter** — first run it fired at
turn 20 / time 4897, second run at turn 21 / time 4895. `wait` costs 40 time units,
`x`/`scrub` cost 7, movement 15-32. So if you spend the prologue examining things you get
far more turns of prologue than if you spend it waiting. Good: the prologue rewards
poking around.

Things worth seeing in the prologue:

- `x blather` — "the crease in his trousers could probably slice diamonds in half."
- `blather, hello` — "Speak when you're spoken to, Ensign Seventh Class!"
- The alien ambassador from Blow'k-bibben-Gordo ambles in around time 4740, slimes your
  deck, hands you a brochure, offers a game of Bocci, asks after Admiral Smithers, and
  leaves up the gangway. `read brochure` is the Meretzky in-joke. This whole vignette is
  pure atmosphere and it's the best-written thing in the prologue.

This time, on the turn the port door slid open I typed `port` immediately: **+3 points**,
Escape Pod. `enter webbing` ("You are now safely cushioned within the web"), then ride it
out. The pod sequence is ten-plus turns of `wait` with a new beat each turn — Feinstein
explodes, gyros stabilise, viewport polarises, atmosphere, ocean below, island with a
plateau of buildings, landing "with a thud."

#### Turns 36-54: out of the pod, up the cliff

Landing reveals "a survival kit and a towel." Two traps in a row here and I walked into
both without losing anything, which I think is luck:

- `get out of web` → "As you stand, the pod shifts slightly and you feel it falling ...
  you see water rising past the viewport." The pod is sinking.
- `take kit and towel` works with a conjunction (good; the harness prints
  "survival kit: Taken. / towel: Taken.").
- `open bulkhead` → "The bulkhead opens and cold ocean water rushes in!" then the pod is
  fully submerged. `out` → Underwater, `up` → **Crag, +3, score 6**.

If you dawdle here I assume you drown. Nothing warned me; the room text did its job by
being alarming.

Survival kit holds a red (cherries), brown (mushrooms) and green (beans) goo. Towel reads
"S.P.S. FEINSTEIN / Escape Pod #42 / Don't Panic!"

`up` from the Crag → **Balcony**, with a weathered plaque in "a corrupt form of
Galalingua":

> SEENIK VISTA — Xis stuneeng vuu uf xee Kalamontee Valee kuvurz oovur fortee skwaar miilz
> uf xat faamus tuurist spot. Xee larj bildeeng at xee bend in xee Gulmaan Rivur iz xee
> formur pravincul kapitul bildeeng.

i.e. "Scenic Vista. This stunning view of the Kalamontee Valley covers over forty square
miles of that famous tourist spot. The large building at the bend in the Gulmaan River is
the former provincial capital building." So the endless ocean outside the window used to
be a valley, and the plaque is *old*. Nice quiet worldbuilding — a whole drowned
civilisation in one sign, readable without a translator once you sound it out. I liked
this a lot.

Up again → Winding Stair → **Courtyard**, a ruined stone castle. Compass directions take
over from port/starboard here, which is a clean signal that the shipboard chapter is over.

#### Turns 55-114: mapping the complex

Map so far (compass):

```
                    SanFac B      SanFac D
                       |             |
   [locked dial door]  |             |
        Rec Area --- Dorm B        Dorm D      Booth 2
          |  \          |             |           |
          |   E---- Rec Corridor - Mess Corr. - Dorm Corr. --(long walkway)-- Corridor Junction -- Elevator Lobby
          |              |          (padlock N)     |                              |                 N: Upper Elevator
     Plain Hall        Dorm A       Mess Hall     Dorm C                        (N/S corridor)       S: Lower Elevator
       |  \NE            |          (slot, S door)  |
   Courtyard          SanFac A                    SanFac C
       |
   Winding Stair - Balcony - Crag
```

Four identical dorms (A/B/C/D) each with an identical SanFac. The repetition is clearly
deliberate — "could have once housed many hundreds" — but eight rooms with two
descriptions between them is a lot of empty walking, and `search bunks` in Dorm B just
says "You find nothing unusual," so there's no reason to enter seven of them. That's the
biggest structural drag I've hit.

Locks and gates found, none yet opened:

- **Rec Area, north door**: locked, "A dial on the door is currently set to 0. The dial
  can be turned to any number between 0 and 1000." A three-digit combination hunt.
- **Mess Corridor, north door**: "hooked with a simple steel padlock ... It has a keyhole
  on its underside." `open padlock` → "You can't open it with your hands." Need a key.
- **Mess Hall, south door**: beside it "a small slot ... about ten centimeters wide, but
  only about two centimeters deep ... surrounded on its long sides by parallel ridges of
  metal." `put id card in slot` gives a genuinely helpful refusal: "The slot is shallow,
  so you can't put anything in it. It may be possible to slide something through the slot,
  though." `slide id card through slot` → "A sign flashes 'Inkorekt awtharazaashun
  kard...akses deeniid.'" So: find the right card.
- **Upper Elevator** (blue door, north of Elevator Lobby): Up/Down buttons plus a narrow
  slot. Both buttons: "Nothing happens. The slot beside the buttons stays dark." ID card
  rejected the same way.
- **Booth 2** (east of Elevator Lobby): brown "1" and tan "3" buttons, plus another slot.
  Both: "Teleportaashun buux not aktivaatid." So there are at least Booths 1, 2 and 3, and
  something turns them on.
- **Lower Elevator** (red door, south): same Up/Down/slot panel. The red door needs the
  red button pressed and then ~3 turns of waiting; pressing it again in the meantime gets
  "Patience, patience...", which is a charming touch.

So the whole midgame seems to be gated behind one authorization card. That's a clear,
legible goal, and I like that four different gates all speak the same "slot" language.

Hunger arrived at turn 97 with a helpful nudge ("A growl from your stomach ... DIAGNOSE
will tell you how you are doing." / "The goo in your survival kit would take care of
both."). `diagnose` → "perfect health / well-rested / fairly thirsty and hungry."
`eat red goo` → "Mmmm...that tasted just like scrumptious cherry pie. It was moist enough
to quench your thirst, too." Two goos left, and no water source found yet; I'm going to
have to solve that.

#### Turns 115-160: the Admin wing, the status board, and the tool room

South door of the Elevator Lobby is the **Lower Elevator** (red, freight-sized); same
Up/Down/slot panel, same dead slot. North of the Corridor Junction:

- **Admin Corridor South** — "a jagged crevice crosses the floor." `x crevice` →
  "Lying at the bottom of the narrow crack, partly covered by layers of dust, is a shiny
  steel key!" `take key` → "Either the crevice is too narrow, or your fingers are too
  large." `get key with brush` → "Nice try." (A flippant refusal; it left me unsure
  whether the game had understood the instrumental phrasing at all. It had — see below.)
- **SanFac E** east of it, a fifth bathroom, this one with a shorter description.
- **Admin Corridor** — the building is "rent apart," sky through the roof, and "To the
  north is a gaping rift, at least eight meters across and thirty meters deep." `north` →
  "The rift is too wide to jump across." Something must bridge it.
- **Systems Monitors**, west of that. This is the mission statement of the whole game:

  > the ones labelled LIIBREREE, REEAKTURZ, and LIIF SUPORT are green, but the ones
  > labelled PLANATEREE DEFENS, PLANATEREE KORS KUNTROOL, KUMUUNIKAASHUNZ, and PRAJEKT
  > KUNTROOL indicate a malfunctioning condition.

  Four broken systems. That's a to-do list, and finding it felt great. Nothing in the room
  is operable ("so complicated that you couldn't even begin to figure out how to operate
  it"), which is the right call — it's a board, not a console.

South of the Junction is the Mech wing:

- **Storage East** (E of Mech Corridor North): an oil can on a shelf, and a cardboard box
  holding a cracked seventeen-centimeter fromitz board, a B-series megafuse, a K-series
  megafuse and a good ninety-ohm bedistor. So "fromitz board" and "bedistor" are the
  repair vocabulary, and one of the boards is already flagged *cracked* — a plant.
- **Physical Plant** (W): big, dim, catwalks, dead HVAC. Connects NE and SE to the two
  Mech corridor segments.
- **Reactor Control** (E of Mech Corridor): dials you're told not to touch, a button that
  opens a metal door east onto the **Reactor Elevator** (dead slot again), and "a dark
  stairway winds downward." Going down: "It is pitch black. You might be eaten by a grue."
  So: light source needed.
- **Tool Room** (SW of Mech Corridor South): a glass flask (1-2 litres, wide mouth), a
  metal bar curved into a U with "a few metal filings cling to its ends" (a magnet, and
  the filings are a lovely unobtrusive tell), wide-nosed pliers, and an "Akmee Portabul
  Laazur" with a six-setting dial and an old battery.
- **Machine Shop** (E of Tool Room): a chemical dispenser with a spout and nine buttons —
  KUULINTS 1-4 (red/blue/green/yellow), KATALISTS 1-3 (gray/brown/black), a square white
  "BAAS" and a round white "ASID." Pressing one with nothing under the spout: "Some sort
  of chemical fluid pours out of the spout, spills all over the floor, and dries up."
  Obviously the flask goes under it.
- **Robot Shop** (SE of Mech Corridor South): dismantled robots, and one intact.

#### The load limit, the magnet, and the card I ruined

Carrying capacity is *tight* — I hit "Your load is too heavy" constantly. The game is
generous about it, though: it names what to drop ("dropping the Patrol-issue
self-contained multi-purpose scrub brush would make enough room"), which turns an annoying
limit into a usable one. One genuinely bad moment: `take box` while holding the oil can
gave "Oh, no. The oil can slips from your arms while taking the cardboard box and both
tumble to the ground" — the turn counter did *not* advance, so it's a free retry, but
nothing hinted that putting the can *in* the box would work. It does.

`fire laser` → "The laser emits a narrow blue beam of light." **+2, score 8.** Setting the
dial changes the beam colour (1 = red, 5 = blue). It is emphatically *not* a lamp; the
dark stairway stayed dark. `turn on laser` → "You can't turn that on," and
`point laser at flask` → "It's usually impolite to point," which is a funny line but a bad
one for the single object in the game you obviously point.

Then the sequence I'd call the sharpest edge in the game so far:

1. `take bar` → ">> The curved metal bar swings toward the ID card and tugs at it: the bar
   is a strong magnet. Carried together any longer, it will smear the card's magnetic
   stripe." Excellent warning. I stashed the ID card in the cardboard box.
2. In the Robot Shop, `open compartments` → "In one of the robot's compartments you find
   **and take** a magnetic-striped card embossed 'Loowur Elavaatur Akses Kard.'" **+1.**
   The game auto-took it — straight into the hand holding the magnet — and printed the
   same warning in the same turn.
3. My very next command was `turn on robot`, and: "The curved metal bar tugs toward the
   lower elevator access card, and for a moment the two cling together. When you pull them
   apart, the magnetic stripe on the card looks smeared."

So the game handed me a critical item, put it in contact with a hazard it had already
warned me about, and destroyed it one turn later. The warning is fair in isolation, but
the auto-take is what sinks it: I never chose to pick the card up while holding the magnet.
Score went **up** by 2 on the turn it was ruined, which made it read like progress. This is
the worst thing I've hit.

Consolation: a **closed canteen shields the card from the magnet**. `put card in canteen`
+ `close canteen` + `take bar` produced no warning at all. I don't know whether that's
authored or just a top-level-inventory check, but it let me carry both.

`get key with bar` at the crevice: "With a spray of dust and a loud clank, a piece of metal
leaps from the crevice and affixes itself to the magnet. It is a steel key!" No points for
it, which surprised me — it's a two-room, two-object deduction and it felt like the best
puzzle so far.

#### Turns 181-209: Floyd, and the padlocked storeroom

`turn on robot` → "Nothing happens. Then again, you notice a faint hum from somewhere
inside the robot," and then two turns later, unprompted:

> "Hi! I'm B-19-7, but to everyperson I'm called Floyd. Are you a doctor-person or a
> planner-person? That's a nice chronometer you are having there. Let's play
> Hider-and-Seeker you with me."

The delayed boot is a great beat. Floyd wanders off and comes back on his own ("Floyd
going exploring. See you later." / "Floyd here now!"), barrels into you, checks himself for
rust. `floyd, follow me` → "Okay!" but he left anyway two turns later, so following seems
to be his own idea rather than an order. `ask floyd about card` → "Cards are neat! Floyd
likes the kind with the stripe best," so ASK ABOUT *does* work on Floyd even though it
fell flat on Blather.

The steel key opens the Mess Corridor padlock. Two-step gate, well signalled: `open door`
→ "The door cannot be opened until the padlock is removed," and `take padlock` →
"You lift the padlock off the hasp, but your load is too heavy to carry it as well, so you
set it down on the floor" — exactly the right behaviour, and it cost no turn.

**Storage West** (+4, score 15): a tin can labelled "Spam and Egz" and "a heavy-duty
extendable ladder ... currently collapsed and is around two-and-a-half meters long, but if
extended would obviously be much longer." The rift is eight meters across. That's my next
move.

Hunger and sleep are both on timers with clear nudges: "You begin to feel weary. It might
be time to think about finding a nice safe place to sleep." `diagnose` reports health,
tiredness and fed-ness separately. One goo per meal, and it handles thirst too ("It was
moist enough to quench your thirst, too") — one goo left after this.

#### Turns 209-226: hauling the ladder, and crossing the rift

The ladder is the heaviest thing in the game. `take ladder` → "Your load is too heavy.
You'd have to drop the laser, the survival kit, the canteen and the towel first." I ended
up dropping the magnet, towel, laser, key *and* the survival kit before it would come, so
the ladder is effectively a two-hands-and-nothing-else object. `floyd, take the ladder` →
"Floyd whines, 'Enough talking! Let's play Hider-and-Seeker.'" — so Floyd will not carry
things, at least not while he wants to play. That left a **six-room haul** (Storage West →
Mess Corridor → Dorm Corridor → the long walk → Corridor Junction → Admin Corridor South →
Admin Corridor) carrying nothing else, and then a second trip back for my gear. That's the
single biggest chunk of pure walking in the leg.

The puzzle itself is lovely and the verbs are forgiving:

- `extend ladder` → "You couldn't possibly extend the ladder while you're holding it."
  (A clear, in-fiction refusal that tells you the fix.)
- `drop ladder` then `extend ladder` → "The ladder extends to a length of around eight
  meters." The rift is "at least eight meters." Perfect.
- `put ladder across rift` → "The ladder swings out across the rift and comes to rest on
  the far edge, spanning the precipice."
- `north` → "You slowly make your way across the swaying ladder. You can see sharp,
  pointy rocks at the bottom of the rift, far below..." **+4, score 19.**

#### Turns 227-243: the offices, the plan room, and night one

**Admin Corridor North** has three signed portals: "Administraativ Awfisiz" (west),
"Tranzportaashun Suplii" (north), "Plan Ruum" (east).

- **Small Office** — `open desk` reveals a **kitchen access card** and an **upper elevator
  access card** (+2).
- **Large Office** beyond it, plush, with a scratched picture window — `open desk` reveals
  a **shuttle access card** (+1). So the desks are where the game keeps its keys, and both
  desks reward the same two commands. Satisfying but a touch mechanical.
- **Transportation Supply** is pitch black. Second dark room; still no lamp.
- **Plan Room** — empty blueprint cubbyholes, and two wall maps: "Kalamontee Kompleks"
  (this island, "Yuu ar heer") and **"Lawanda Kompleks", showing two installations, one
  apparently buried deep underground.** A second site. `x kalamontee map` →
  "Examining the maps reveals no new information," which is a slightly grudging reply to a
  map you're clearly meant to study.

I ran out of sleep on the Plan Room floor. The warning ladder is well graded — "You begin
to feel weary" → "You're really tired now" → "If you don't get some sleep soon you'll
probably drop" → "You can barely keep your eyes open" → collapse. Sleeping rough costs
nothing worse than "feeling stiff from your night on the floor," and "While you slept, the
things you were carrying slipped to the floor beside you" (they were all still there).
**SEPTEM 7, 11344**, day two, clock resets to ~1600.

#### Turns 244-268: up the tower

`slide upper elevator card through slot` → "A recorded voice chimes 'Elevator enabled.'"
then `press up button`. The ride takes three turns and plays "some innocuous Hawaiian
music ... from the elevator's intercom," which is the best joke in the game so far. Note
you have to `wait` for the door — `south` during transit just says "The door is closed"
without explaining you're still moving.

Mid-ride: "**You notice that you feel a bit weak and slightly flushed, but you're not sure
why.**" `diagnose` a while later: "You are a bit sick and feverish." So I've caught
something, and the game has started a third timer on top of hunger and sleep.

**Tower Core** (+4, score 26) opens onto:

- **Helipad** (up the spiral stair) with a rusted rotor-bladed vehicle. `enter vehicle` →
  **Helicopter**, cargo bay empty, "A complex control panel is closed and locked."
  `open control panel` → "**You don't even have the orange key!**" — which cheerfully
  names an item I've never heard of. I liked that; it's a want, not a wall.
- **Comm Room** (NE). This is the payoff room of the leg. Left console "Reeseev
  Staashun" with a blinking "Tranzmishun Reeseevd" light and a "Mesij Plaabak" button;
  right console "Send Staashun" with a screen, a flashing "Malfunkshun in Sendeeng Kuulint
  Sistum," an **enunciator panel of coloured lights (red, blue, green, yellow, gray, brown,
  black)** and "a funnel-shaped hole labelled Kuulint Sistum Manyuuwul Oovuriid."
  - `press message playback button` plays the Feinstein's comm officer hailing the planet
    on frequency 48.5, then "Admiral, no response on any of the standard frequen..." cut
    off by an explosion. Chilling, and it retroactively explains the prologue.
  - `read screen`: "Tuu enee ship uv xe Sekund Galaktik Yuunyun: Planitwiid plaag haz
    struk entiir popyuulaashun. Tiim iz kritikul. Eemurjensee asistins reekwestid."
    A planetwide plague — and I'm running a fever. That landed.
  - The enunciator's seven colours are **exactly** the seven KUULINTS/KATALISTS colours on
    the Machine Shop dispenser. That's a terrific cross-map deduction, made entirely out of
    two room descriptions and no hand-holding.
- **Observation Deck** (SW): "the tower must be half a kilometer tall ... In the distance,
  about 20 kilometers to the east, you can spot another island similar to this one." That's
  Lawanda, and I'm carrying a shuttle access card.

#### Turns 275-292: the ruined card confirmed, and food solved

I detoured into the Lower Elevator to find out how bad the magnet damage was:

> `slide lower elevator card through slot`
> A sign flashes "Magnetik striip randumiizd...konsult Prajekt Handbuk abowt propur kaar
> uv awtharazaashun kardz."

So it is genuinely dead, and the reply points at a "Prajekt Handbuk" I haven't found (the
Library is one of the three *working* systems, so that's where I'd look). **Leg 2 must find
out whether this is recoverable or whether I have soft-locked the Lower Elevator.** If it
isn't recoverable, the auto-take in the Robot Shop is a game-ending trap with a one-turn
fuse, and that is a serious problem.

`slide kitchen card through slot` in the Mess Hall opens the **Kitchen** (+4, score 30).
The room says "Of particular interest is a machine near the door. You should probably
examine it more closely," which is the game breaking character to nudge — the only place
so far it's done that, and it isn't needed; a machine in an empty room is already
interesting. `x machine`: "This wall-mounted unit contains an **octagonal** niche beneath a
spout ... 'Hii Prooteen Likwid Dispensur.'" The canteen I found on a Mess Hall bench on
day one is described as "an **octagonally-shaped** canteen." Put canteen in niche, press
button, "The canteen fills almost to the brim with a brown liquid," `drink from canteen` →
"It certainly quenched your thirst and satisfied your hunger." Food and water are now
solved permanently, and the click of octagonal-to-octagonal across twelve hours of play
was the best "aha" of the leg.

#### Turns 293-322: the coolant relay

Fetched the glass flask from the Tool Room, `put flask under spout` in the Machine Shop,
`press green button` → "The flask fills with some green chemical fluid. The fluid gradually
turns milky white." Hauled it back up the tower.

`pour flask into funnel` → "Pouring or spilling non-liquids is specifically forbidden by
section 17.9.2 of the Galactic Adventure Game Compendium of Rules." That's a wrong answer
delivered as a joke: the flask is *full of liquid*, and the game is refusing on the grounds
that a flask isn't one. `pour fluid into funnel` works:

> The liquid disappears into the hole. The lights on the enunciator panel blink rapidly
> and all go off except one, a brown light.

So it's a **relay**: green, now brown (KATALIST 2), presumably more after that. Each colour
is a full round trip between the Comm Room at the top of the tower and the Machine Shop at
the far south end of the Mech wing — for me that was **22 moves each way including two
elevator waits**. One iteration is a good puzzle. If it's four or more, this will be the
grindiest thing in the game, and the fix is obvious: let the flask hold more than one dose,
or let Floyd run the errand.

#### Where I stopped

**Comm Room, Day 2, morning, time 3172, turn 322, score 30/80 ("Ensign First Class"),
367 commands issued.** Carrying: chronometer and uniform (worn), canteen (full of high-
protein liquid), kitchen access card, upper elevator access card, shuttle access card,
ruined lower elevator access card, empty glass flask. Floyd is with me. I am "a bit sick
and feverish."

#### Notes for leg 2 (me, or whoever)

Open threads, roughly in the order I'd chase them:

1. **The coolant relay.** Brown catalyst (KATALIST 2) next, from the Machine Shop
   dispenser, into the Comm Room funnel. Check the enunciator each time — it names the
   next colour. Finishing it should fix KUMUUNIKAASHUNZ on the Systems Monitors board.
2. **The ruined lower elevator card.** Find the "Prajekt Handbuk" (Library?) or a second
   card. This is the one thing that might be unrecoverable.
3. **Light source.** Three dark places: Reactor Access Stairs (below Reactor Control),
   Transportation Supply (N of Admin Corridor North), and any lower level. The laser is
   *not* a lamp. I left it in **Storage West** along with the towel, survival kit (one
   brown goo), the magnet bar and the steel key.
4. **The dial door**, Rec Area north, 0-1000. No number found yet. My Patrol ID is
   6172-531-541 — untried.
5. **The orange key**, named by the helicopter's control panel. The helicopter is thick
   with rust and there is an **oil can** in the cardboard box in the Tool Room.
6. **Teleport booths.** Booth 2 (E of Elevator Lobby) has buttons for 1 and 3 and a slot;
   "Teleportaashun buux not aktivaatid."
7. **Lawanda Complex**, the second island 20 km east, two installations, one deep
   underground. I hold a **shuttle access card** and have not found a shuttle.
8. **Repair parts** in the Tool Room cardboard box: a *cracked* seventeen-centimeter
   fromitz board, B-series and K-series megafuses, a good ninety-ohm bedistor, an oil can,
   plus wide-nosed pliers loose on the floor. Something out there wants a *good* fromitz
   board.
9. **I am sick.** Third timer, no cure found, and the plague is the plot.

Stashes: **Tool Room** = box (ID card, oil can, fromitz board, 2 megafuses, bedistor),
pliers, brochure. **Storage West** = laser, towel, survival kit + brown goo, magnet bar,
steel key, tin of "Spam and Egz." **Mess Corridor** = padlock. **Admin Corridor** = the
ladder, spanning the rift (leave it there).

Warning to my successor: **do not carry the magnet bar and any access card at the same
time.** A closed canteen shields a card from it; that's the only workaround I found.


### Leg 2 (commands 368-601 — the leg ended early, in death)

Picked up where leg 1 stopped: **Comm Room, day two, morning, turn 322, time 3172,
score 30/80**, feverish, Floyd somewhere about, carrying canteen (full), kitchen card,
upper elevator card, shuttle card, the smeared lower elevator card, and an empty flask.

Plan for the leg, in order: finish the coolant relay, then chase the plague/Lawanda
thread, then spend one honest experiment on whether the ruined card can be recovered.

#### Turns 323-362: the coolant relay finished (it was only two doses)

Good news for my leg-1 self: the relay is **green then brown and done**. Second dose in,
and the payoff is generous:

> The liquid disappears into the hole. The lights on the enunciator panel blink rapidly and
> then go dark. The coolant system warning light goes off, and another flashes, indicating
> that the help message is now being sent. **[+6, score 36]**

So the errand is two round trips, not four. I'll soften friction #24 accordingly — but the
walk is still ~22 moves each way and the whole thing is a fetch quest with no decisions in
it, so it's a chore rather than a puzzle.

One nasty moment on the way. I had the full flask and went one room west to grab the oil
can:

> `take oil can` → "Oh, no. The glass flask slips from your arms while taking the oil can and
> both tumble to the ground. **Unfortunately, the chemical spills out of the flask and
> evaporates.**"

The turn counter did not advance — the game treats this as a free retry — but it had just
destroyed a 24-move fetch. Free retry, permanent loss. That's friction #26 and it's bad.

The workaround I found by accident: **the Patrol uniform is a container.** `put oil can in
uniform` → "Done." That solves most of the load-limit grief and nothing anywhere told me it
was possible.

#### Turns 386-396: the "ruined" Lower Elevator card is NOT ruined

This is the big finding of the leg, and it reverses leg 1's worst call. I went to the Lower
Elevator to run the honest experiment, expecting a dead end:

> `slide lower elevator card through slot`
> The slot holds on to the lower elevator access card for a moment. Something inside the
> machine hums, and a sign flashes "Striip riikoordid." The card comes back out with its
> stripe clean.

Slide it a *second* time and you get "Elevator enabled." So the magnet damage is fully
self-healing: the reader re-records the stripe. The trap has a built-in undo.

Two caveats, though. First, the failure message points you at the wrong fix — "konsult
Prajekt Handbuk abowt propur kaar uv awtharazaashun kardz" reads as "go find a document,"
when the actual fix is "do the exact thing you just did, again." I only found it because I
was told to spend one experiment on it; a player who reads that sign as a hard no could
abandon half the map. Second, it takes two slides and the first one gives no hint that a
second will work.

Net: leg 1's friction #13 drops from "game-ending trap" to "scary but recoverable, and
badly signposted."

#### Turns 396-445: down the freight elevator, and the shuttle to Lawanda

Below the Lower Elevator: **Waiting Area** → **Kalamontee Platform** (+4), "Shutul
Platform -- Kalamontee Staashun," with **Shuttle Car Alfie** waiting, doors open. The
shuttle access card from the Large Office desk slides into the control-cabin slot:
"Shuttle controls activated." Two identical control cabins, east and west; the east one's
window shows rails running off into a tunnel, so east it is.

The shuttle is the best-designed set-piece I've played so far — it's a genuine little
vehicle sim built from one lever and one number:

- `push lever` → upper position, accelerates +5 per turn, door seals itself.
- A sign flashes by: **"Limit 45."**
- `pull lever` steps back one notch; the lever is three-position and push/pull move one
  step each.
- Halfway: **"Hafwaa Mark -- Beegin Deeseluraashun."** Then countdown signs at 15, 10, 5.

I got it wrong in the most instructive way. I decelerated on the halfway sign, coasted to
0 **before** the station, and got a lovely diegetic error: `open door` → "Operator should
remain in control cabin while shuttle car is between stations." Then I nudged forward at
speed 5 with the lever centred, assumed 5 was slow enough, and:

> The shuttle car rumbles through the station and smashes into the wall at the far end. You
> are thrown forward into the control panel. Both you and the shuttle car produce unhealthy
> crunching sounds as the cabin doors creak slowly open.

No injury in `diagnose`, and the doors opened anyway, so the crash is cosmetic-ish — but I
don't know yet whether Alfie still runs. There is a second car (**Betty**) at the Lawanda
end, which I suspect is the game quietly insuring you against exactly this.

The parser is the weak point here. The room description names "a **display**, a digital
readout" and "a **central** position", and the dictionary contains neither word:
`x display` → "I don't know the word 'display'"; `set lever to central position` →
"I don't know the word 'central'"; `center lever`, `move lever to middle` likewise. I
burned four commands and 5 km/h of overspeed finding out that the verb is a bare
`pull lever`.

**Lawanda Platform** (+4, score 44). A dead escalator up to a **Fork**, and beyond it
**Systems Corridor West**. New island, new wing, and I'm still feverish.
#### Turns 446-520: Lawanda, and the plot arrives all at once

Lawanda is where the game stops being a scavenger hunt and starts being a story. Up the
dead escalator, a **Fork** (NE and SE), then **Systems Corridor West / Systems Corridor /
Systems Corridor East** running east with rooms hanging off it. In about seventy turns this
wing answered four questions leg 1 had been carrying.

**Infirmary** (NW of Systems Corridor West). "A clean, well-lighted place" — beds,
equipment, mostly bare shelves, a **red spool** on a bed and a translucent **medicine
bottle**: `read label` gives "Dizeez supreshun medisin -- eksperimentul." `open bottle`,
`drink medicine`:

> The medicine tasted extremely bitter. After a few moments the fever breaks, and you feel
> your strength returning.

`diagnose` then reports "You are in perfect health." **Zero points for curing the plague**,
which surprised me; and roughly thirteen turns later the game quietly said "You notice that
you feel a bit weak and slightly flushed" again, so the medicine is a suppressant on a
timer, exactly as the label says. Honest labelling, good.

Small snag: the room listing prints the bottle's contents ("The medicine bottle contains: A
quantity of medicine") and then `drink medicine` answers "The bottle is closed." It is
translucent, so I'll allow it, but listing the contents of a closed container is the kind of
thing that makes a player stop trusting the room description.

**Planetary Defense** (N of Systems Corridor) — one of the four red systems on the
Kalamontee status board. "Surkit Boord Faalyur. WORNEENG: xis boord kuntroolz xe
diskriminaashun surkits," and an access panel holding **four seventeen-centimeter fromitz
boards**, first through fourth. `x` on each gives byte-identical text, so you cannot tell
which is dead by looking. `take first fromitz board`:

> You jerk your hand back as you receive a powerful shock from the fromitz board.

The **wide-nosed pliers** have been lying on the Tool Room floor on the other island since
day one. That click — a tool I had dismissed as scenery turning out to answer a room I
hadn't seen yet — is the second-best moment of the game so far, after the octagonal canteen.

**Course Control** (N of Systems Corridor East) — "Bedistur Faalyur!" and "Kritikul
diivurjins frum pland kors." I have **a good ninety-ohm bedistor** sitting in the Tool Room
box. Also a large metal cube with a closed lid, which I never got back to.

**Library Lobby / Library** (S of Systems Corridor East). A computer terminal with a ten-key
pad and a nested menu (Histooree / Kulcur / Teknolojee / Jeeografee / Xe Prajekt /
Inturlajik Gaamz), and in the Library proper a **microfilm reader**. This is the exposition
engine and it is well made — you dig for it rather than being told.

- Index 5 then 1, "Orijinz uv xe Dizeez": the disease was linked to the **Center for
  Advanced Cryogenic Research**, which had succeeded at extending the cryogenic period
  indefinitely, "and sumhow Xe Dizeez wuz reeleest and beegan spredeeng."
- Index 5 then 2, "Xe Instalaashunz": the two complexes sit on twin peak plateaus so that
  "xe vast reeakturz and kriioojeniks caamburz kud bee kunstruktid in xe mowntinz beeloo."
  So there is a whole level under both islands, and the Lower Elevator and the dark Reactor
  Access Stairs both point at it.
- Red spool in the reader: the gestation period varies from one day to several rotations,
  and **"Wuns xe furst simptumz ar shoon, dex alwaaz okurz in aat tuu ten daaz."** Primary
  symptom a high fever; secondary, a sharp increase in sleep needed each night. That is a
  hard countdown printed on a library screen, and it is genuinely chilling.
- Green spool (spotted in the Library Lobby dust): the helicopter manual. "Reekwiird
  ekwipmint inkluudz aa **Helikoptur Akses Kard** and aa **Kuntrool Panul Kee**. Xeez kan
  bee obtaand frum **Tranzportaashun Stoorij**." Which is the pitch-black room north of
  Admin Corridor North. So the orange key is behind the light-source problem.

**Booth 3** is east of the Library Lobby — buttons for 1 and 2, the same shallow card slot,
the same "Teleportaashun buux not aktivaatid." So booths 1, 2 and 3 exist and none work yet.

**Physical Plant** (E of Systems Corridor East) is a nice piece of quiet foreshadowing:
"although the Lawanda Complex is slightly smaller than its counterpart, this plant is much
larger than the one in the Kalamontee Complex." Something big and warm is underneath.

#### Turns 525-532: Floyd, the small doorway, and dying of thirst in the Repair Room

Down the narrow stairway from Systems Corridor West is the **Repair Room**: dim, locked
cabinets, a robot lying face down at the bottom of the stairs, and **a very small doorway**
in the north wall. Floyd's reaction to the corpse is the best writing in the game:

> "That's Achilles. He was in charge of repairing machinery. He repaired Floyd once. I never
> liked him much; he wasn't friendly like other robots. Looks like he fell down the stairs.
> He always had trouble with one of his feet working right. A Planner-person once told me
> that's why they named him Achilles."

`x small doorway` gives "It's too small for you to get through. It was presumably intended
for robots." So: `floyd, go north`.

> Floyd squeezes through the opening and is gone for quite a while. You hear thudding noises
> and squeals of enjoyment. After a while the noise stops, and Floyd emerges, looking
> downcast. "Floyd found a rubber ball inside. Lots of fun for a while, but must have been
> old, because it fell apart. Nothing else interesting inside. **Just a shiny fromitz
> board.**"

That last sentence is perfect — Floyd discarding the thing I need most, in the tone of a
child reporting that the box was boring. I was two commands away from
`floyd, get the fromitz board`.

I never got to type them, because I starved to death.

**This is the thing I want the designers to look at hardest.** The hunger ladder ran:

| turn | message |
|---|---|
| 476 | "A growl from your stomach warns that you're getting pretty hungry and thirsty." |
| 526 | "You're starting to feel faint from lack of food and liquid." |
| 530 | "If you don't eat or drink something in a few millichrons, you'll probably pass out." |
| 532 | "You collapse from extreme thirst and hunger.  ****  You have died  ****" |

Two turns between the final warning and death. And underneath every one of those warnings,
the game's own hint line said:

> !> There is still goo in the survival kit you left in Storage West.

Storage West is on **the other island**. From the Repair Room that is: up the stairs, west,
down the escalator, board the shuttle, ride it (a minimum of about twenty turns of
acceleration and braking), cross the platform, ride the Lower Elevator up (four turns), then
seven more rooms. Call it forty turns against a two-turn fuse. The hint system confidently
directed me to food that was **provably unreachable**, and it did so in the same breath as
the final warning. It reads as help; what it actually says is that you died about thirty
turns before you noticed.

There is no food, no water and no canteen refill anywhere on Lawanda that I found across
~80 turns of thorough exploration, and nothing on the Kalamontee side warns you that
boarding the shuttle leaves the only food source behind. My canteen ran dry four turns after
I arrived, and I only discovered that by trying to drink from it.

Score at death: **44 of 80, day 2, evening, turn 532, 601 commands.**

#### The session is over, and the harness cannot recover it

This is the second half of the problem. The death screen and the status line both say:

> -- Repair Room · evening · turn 532 · time 6903 · score 44 · **YOU HAVE DIED (restore your
> saved game, or start again with --new)**

I tried `restore`, `undo`, `--restore`, `--undo`, and a plain `look`. Every one returns the
same line: "You have died. Start again with --new." There is no save and no undo. The
game's own death prompt advertises RESTORE, the harness status line advertises "restore your
saved game", and neither exists — so **any death is a total session loss**, 601 commands of
state gone.

I was told not to pass `--new`, and I have not, so leg 2 ends here at 601 commands rather
than the ~720 in the brief, and leg 3 cannot continue this session either. That combination
— a two-turn starvation fuse, a hint pointing at unreachable food, and a death with no
recovery path — is the most damaging thing I have found, and it is worth fixing ahead of
anything cosmetic on this list.

#### Notes for leg 3 (whoever plays next)

Everything below is confirmed, so a fresh run can go straight at it:

1. **The magnet-smeared lower elevator card repairs itself.** Slide it through the Lower
   Elevator slot twice: the first slide prints "Striip riikoordid," the second "Elevator
   enabled." Leg 1's soft-lock scare is not real.
2. **The coolant relay is two doses**, green then brown, +6 on the second.
3. **The Patrol uniform is a container** and holds two items. It is the answer to the load
   limit.
4. **Planetary Defense** wants the *wide-nosed pliers* from the Tool Room floor — the four
   fromitz boards shock you bare-handed — and Floyd can fetch a **shiny fromitz board**
   through the small doorway in the **Repair Room** under Lawanda's Systems Corridor West.
   Ask him with `floyd, go north`, then ask for the board *before* he wanders off.
5. **Course Control** wants a bedistor; the good ninety-ohm one is in the Tool Room box.
6. **The helicopter** needs a Helicopter Access Card and a Control Panel Key, both in
   **Transportation Storage** — the dark room. A light source is now the critical blocker
   for two whole threads.
7. **Carry food onto the shuttle.** Fill the canteen at the Kitchen and bring the survival
   kit. Lawanda has no food and no water at all.
8. **Shuttle driving:** `slide shuttle card through slot` in Alfie Control East,
   `push lever` to accelerate (+5/turn, posted limit 45), `pull lever` steps back one notch.
   Brake *to a stop at the station* — coasting in at 5 with the lever centred crashes you
   into the far wall. The countdown signs at 15/10/5 are the cue.
9. Stashes I created this leg: **Infirmary** (Lawanda) = glass flask, oil can. Everything
   leg 1 listed is still where it was.
---

### Leg 3 (restart; commands ~605-950)

**The game was restarted.** Leg 2 ended in death — starved in the Repair Room under Lawanda
at turn 532 — and the session could not be restored, so this leg begins a brand-new game
with `--new`. Everything below is a fresh run; the score, turn and clock all reset to zero.
What carries over is knowledge: legs 1 and 2 mapped both islands, solved the prologue, the
kitchen, Floyd, the elevators and the shuttle, and reached 44/80.

Plan for this leg, in order:
1. Replay the solved ground fast — prologue, pod, complex, tools, Floyd, cards, kitchen.
2. **SAVE early and often.** Neither previous leg had a save; that is what cost leg 2.
3. Spend the leg on what is still unknown: a light source for Transportation Storage
   (which holds the helicopter card and the orange Control Panel Key), the fromitz boards
   and the pliers at Planetary Defense, the bedistor at Course Control, the Library
   microfilm, and anything that pushes past 44.
4. Carry provisions onto the shuttle — Lawanda has no food or water at all.

#### Run A, commands 605-724: SAVE and RESTORE both work — and I still starved

First and most important: **SAVE and RESTORE are real and they work.** `save` answers "Ok.",
costs **no turn**, and after a death `restore` puts you back exactly where you saved, score
and inventory intact. Leg 2's friction #37 was therefore half wrong: the recovery path
exists; leg 2 simply never used it. The harness even prints a footer after death —
"On screen you can: 1 restore your saved game" — which is clearer than the in-game
RESTART/RESTORE/QUIT prompt, since RESTART and QUIT still do nothing.

Floyd's reaction to saving is a delight and I want it on the record: every `save` gets

> Floyd's eyes light up. "Oh boy! Are we gonna try something dangerous now?"

The prologue is faster the second time you know it. The explosion is on the clock, not the
turn counter: game starts at time 4563 and the door to port opened at time 4923, which is
exactly nine `wait`s at 40 units each. `port` on that turn, `enter webbing`, ride it down.

**Mistake one.** In the web I typed `take kit and towel` the moment the provisions panel
opened and got "You can't reach it from here." Correct, but the window to actually take them
is narrow: you can only reach the panel after `get out of web`, and standing up is what
starts the pod sinking. I panicked through `open bulkhead / out / up` and left the survival
kit — the game's only portable food — at the bottom of the ocean. Then I tried to swim back
for it: `down` from the Crag → "A mighty undertow drags you across some underwater
obstructions. **** You have died ****", instantly, with no warning and no intervening room.
`restore` brought me straight back. That is the save system earning its keep on turn 32.

Replaying the solved ground was quick and it confirmed every note from legs 1 and 2. Robot
Shop card (+1, and **no magnet in hand this time, so no smear**), `turn on robot` (+2), Floyd
boots two turns later; Tool Room for the pliers and the magnet; `x crevice` then
`get key with bar`; padlock off the Mess Corridor door; Storage West (+4); the six-room
ladder haul; `drop ladder` / `extend ladder` / `put ladder across rift` / `north` (+4); the
two office desks (+1, +2). Score 20 at turn 94, about 60 commands from the start of the run.

One correction to leg 1's note: opening the desks scores nothing; the points come when you
**take** the cards.

**Mistake two, and it killed me.** With no survival kit, my only food was the Kitchen, and
the kitchen access card is in the office **behind the rift** — so the ladder puzzle has to
come first, and the ladder puzzle is the longest walk in the game. The hunger ladder ran:

| turn | time | message |
|---|---|---|
| 69 | 6563 | "A growl from your stomach warns that you're getting pretty hungry and thirsty." |
| 89 | 7015 | "You're now really ravenous and your lips are quite parched." |
| 98 | 7169 | "You're starting to feel faint from lack of food and liquid." |
| 99 | 7329 | "If you don't eat or drink something in a few millichrons, you'll probably pass out." |
| 103 | 7383 | "You collapse from extreme thirst and hunger. **** You have died ****" |

I was standing **in the Mess Hall** when the last warning landed, holding the kitchen access
card. `take canteen`, `slide kitchen card through slot` — "The kitchen door quietly slides
open" — and dead on that same turn. I restored, skipped the canteen, slid the card and
stepped south: I reached the Kitchen, scored **+4 on the turn I died**, and died anyway.

Two things about that are worth more than the death itself.

1. **Hunger is on the clock, not the turn counter, and the long corridor costs 160 time
   units a crossing** — eight times a normal move. Walking Dorm Corridor ⇄ Corridor Junction
   twice, which the ladder haul forces, silently burned the equivalent of eight moves of
   food clock. Nothing on the status line or in `diagnose` exposes the number, so the
   penalty for a route is invisible until it kills you. Between the third warning and the
   fourth I had moved exactly **one room**.
2. **The save I made was already a dead save.** I saved in the Mess Hall at time 7369 with
   death scheduled at 7383 — two actions away, and the Kitchen needs four. `restore` returns
   you faithfully to a position that cannot be survived, and nothing in the save
   acknowledgement ("Ok.") suggests that. A game with a hard survival clock and a
   single-slot save needs either a second slot or a warning.

So: SAVE works, and it still could not save me, because by the time the game told me I was in
trouble the trouble was already unrecoverable. That is a design problem, not a save problem.

Net after run A: score 24 (of which 4 were awarded posthumously), dead in the Kitchen at turn
103, 119 commands spent. Starting over.

#### Run B, commands 725-951: a clean replay, and a curfew nobody mentions

Restarted a second time and replayed the whole solved chain from memory. It went cleanly and
fast, and two optimisations are worth recording because they change the shape of the game:

- **The escape-pod sequence is turn-based, but the clock is not.** Every beat of the pod ride
  fires on the next turn regardless of what you type, and `wait` costs 40 time units while
  `x webbing` costs 7. Run A spent 26 `wait`s riding the pod down and arrived at the Crag at
  time 5631; run B typed `x webbing` instead and arrived at time 5122. That is **509 time
  units — a quarter of a day — saved by typing a different no-op.** Since hunger, sleep and
  the day/night cycle all run on that clock, the game silently rewards a player who fidgets
  over one who waits, and nothing anywhere hints at it.
- **Plain Hall has a northeast exit straight to Rec Corridor**, skipping Rec Area. One move
  saved on the most-walked route in the game.

This time I took the survival kit out of the pod (`get out of web`, then `take kit`, then
`open bulkhead`) and food was never a problem again.

The replay: Robot Shop card (+1) and `turn on robot` (+2) with no magnet anywhere near the
card; Tool Room for laser (`fire laser`, +2) and pliers and the magnet bar; `x crevice` and
`get key with bar`; padlock, Storage West (+4); the ladder haul; the rift (+4); both desks
(+2, +1); Mess Hall canteen; Kitchen (+4). **Score 26 at turn 109, about 75 commands into
the run** — the same ground that took leg 1 nearly 300.

Two new snags on well-trodden ground:

- **The Patrol uniform holds exactly one thing.** Leg 2 recorded it as a two-item container;
  it is not. With the ID card already inside, `put bedistor in uniform` gets "There's no
  room." Since the ID card is a prologue prop with no later use, the uniform is effectively
  a zero-slot container unless you think to throw your own ID away. The **survival kit** is
  the real answer: it took three access cards *and* the three goos without complaint.
- **The canteen has to be open to fill.** `put canteen in niche` and `press button` with the
  canteen closed gives "A thick, brown liquid spills over the closed canteen, dribbles down
  the side of the machine, and forms a puddle on the floor." The machine cheerfully wastes a
  dose against a sealed lid and says nothing about why. `open canteen` first, then it works.

Then, at turn 168, standing in Alfie's east control cabin with the shuttle access card in
hand, the run hit a wall I had no idea existed:

> `slide shuttle card through slot`
> A recorded voice explains that using the shuttle car during the evening hours requires
> special authorization.

**The shuttle does not run at night.** Nothing on Kalamontee says so. The Plan Room maps, the
Library, the platform signs, the card itself, the Systems Monitors board — none of them
mention hours of operation, and the card that the game awards points for finding is simply
inert for a third of the day. And `push lever` then answers "Shuttle controls are not
currently activated," which describes the symptom rather than the curfew.

The obvious response is to sleep it off. The game won't let you:

> `sleep` -> "You're not tired!"

and later, when I *was* tired, at the very last rung of the exhaustion ladder ("You can
barely keep your eyes open"):

> `sleep` -> "Civilized members of society usually sleep in beds."

So the two timers actively fight each other: the vehicle is locked until morning, and the
only mechanism for reaching morning is refused first for not being tired enough and then for
not being in a bed. `wait until morning` and `wait for morning` are both silently truncated
to a plain 40-unit `wait` with no comment — the parser drops the phrase rather than saying it
doesn't understand it, which is worse, because the reply is indistinguishable from success.

I gave up on the shuttle at time 8043 and spent the rest of the leg on Kalamontee. That was
the wrong call and I want it on the record as a player error with a design cause: the day
actually rolled over at about time 8800, roughly **nineteen `wait`s** after I quit. But there
is no sunrise forecast anywhere. The chronometer gives a raw number, the status line says
"night", and nothing tells you how long night is or that the number wraps. I had no way to
tell nineteen turns from four hundred, so I treated an unknown wait as infinite. A single
line — "the shuttle resumes service at dawn" — would have bought the whole Lawanda half of
the game back.

#### Turns 182-216: the light source, still not found

With the shuttle out, I spent the remaining commands on the round's stated blocker: **a light
source**. Three legs and about 950 commands in, there is still none, and the two dark rooms
(Transportation Supply, north of Admin Corridor North; Reactor Access Stairs, below Reactor
Control) gate at least three threads — the helicopter access card, the orange Control Panel
Key, and whatever is under the complex.

Everything I tried, and what it cost:

- **The laser is not a lamp**, at any dial setting. Setting 6 gives "a narrow violet beam";
  the dark room stays dark.
- **Floyd will not scout a dark room.** He follows you in happily, but `floyd, go north` in
  Admin Corridor North and `floyd, go down` in Reactor Control both get his catch-all
  "You know me and my sense of direction... Tell Floyd a story?" So the Repair Room's small
  doorway on Lawanda is a one-off scripted errand, not a general "send the robot" verb. That
  is a shame, because sending the robot is exactly the deduction the Repair Room teaches you.
- **In the dark you cannot even name a thing to Floyd.** `floyd, get the orange key` in
  Transportation Supply answers "You can't see any orange key here!" — the visibility check
  runs on *me*, not on the robot standing next to me.
- **There is no spare battery.** The laser's "old battery" and Floyd's recurring "Floyd frets
  about the possibility of his batteries failing" read like a plant, so I searched the Robot
  Shop, which is "filled with robot-like devices of every conceivable description, all in
  various states of disassembly." `take battery` -> "You can't see any battery here!" And
  `search robots` / `x robots` -> "You can't see any robots here!" **in the Robot Shop**, of
  all places; the implemented noun is "devices" ("They are components of disassembled robots,
  beyond repair"). A room whose name is Robot Shop should answer to the word "robot".

I ended the leg walking to Dorm C to test the bed, and found one more oddity. The exhaustion
ladder had run all the way to "You can barely keep your eyes open" during the night; then the
clock wrapped to Day 2, and `diagnose` in the bunk reported "You feel **well-rested**"
without my ever having slept. **The tiredness timer is cured by the day rollover, not by
sleeping.** Four escalating warnings, a refusal to let you act on them, and then they
evaporate on their own.

Final state: **Dorm C, Day 2, morning, time 1897, turn 216, score 30 of 80 ("Ensign First
Class"), 951 commands across the session.** Carrying the canteen (full), the survival kit
(three goos, upper elevator card, shuttle card, lower elevator card), the wide-nosed pliers,
and Floyd. Saved, in a healthy, well-fed, perfectly winnable position — which is the one
thing no previous leg managed to hand over.

### Report

**Where three legs of this round got to.** Legs 1 and 2 played 601 commands, mapped both
islands and reached **44/80** before starving to death with no save. Leg 3 played 350 more,
across two fresh starts, and finished at **30/80 on Day 2 morning, turn 216, alive and
saved**. The lower number is not a regression: leg 3 spent its first 119 commands dying of
hunger and its last 50 on the light-source problem, and the run it ends on reproduced legs
1 and 2's first 300 commands in about 75.

**What this round got past.** Everything up to and including the shuttle is now solved
knowledge and reproducible at speed: the prologue and the one-turn escape-pod window; the
pod, the cliff and the complex; the magnet and the crevice key; the padlock and the ladder
and the eight-metre rift; the three desk cards; Floyd; the Kitchen dispenser and the
octagonal canteen; the coolant relay (green then brown, +6); the self-repairing magnetic
stripe; the freight elevator; and Lawanda, its Infirmary medicine, its Library microfilm and
the plague countdown.

**What stopped it.** Three different things stopped three legs, and none of them was a puzzle:

1. Leg 1 ran out of leg.
2. Leg 2 starved, because Lawanda has no food and no warning, and had no save.
3. Leg 3 lost its first run to the same hunger clock, and its second to a **night curfew on
   the shuttle** that it could neither be told about in advance nor sleep through — and then
   quit waiting nineteen turns before dawn, because nothing in the game tells you how long
   night lasts.

That is a pattern worth naming. **The puzzles in this game are good and the clocks are
hostile.** Every real defeat in 951 commands came from a timer that was invisible, badly
signposted, or un-actionable, never from a lock I couldn't pick.

**What the interface did well.** More than the friction log suggests.

- **SAVE and RESTORE genuinely work**, cost no turn, and restore score and inventory exactly.
  Leg 2's worst finding was half a false alarm. The harness's post-death footer ("On screen
  you can: 1 restore your saved game") is clearer than the game's own RESTART/RESTORE/QUIT
  prompt, of which only RESTORE actually functions.
- **The load system names what to drop.** "You'd have to drop the laser, the survival kit,
  the canteen and the towel first" is the most useful failure message in the game.
- **Diegetic refusals.** "You couldn't possibly extend the ladder while you're holding it."
  "Operator should remain in control cabin while shuttle car is between stations."
  "Patience, patience..." These tell you the fix without stepping out of the fiction.
- **Cross-map deductions that land.** Octagonal canteen into octagonal niche; the enunciator's
  seven colours matching the dispenser's seven buttons; wide-nosed pliers, dismissed as
  scenery on day one, answering a shock hazard on another island. These are the best things
  in the game and they are entirely unsignposted, which is exactly right.
- **Floyd.** Every leg has said so. He reacts to `save` with "Oh boy! Are we gonna try
  something dangerous now?", he scrawls his name on walls in crayon, and his eulogy for
  Achilles is the best paragraph in the game.
- **Failed parses are free.** "I don't know the word X" and "You can't see any X here" do not
  advance the turn counter, so experimenting costs clock but not survival. That is a quietly
  excellent decision and it is why the parser gripes below are annoyances rather than deaths.

### Verdict

**Could a first-time player finish this game?** Not without a walkthrough, and not because
of the puzzles. The puzzles are fair; several are excellent. A first-time player dies
instead to the bookkeeping. This round died three times: once in the escape-pod window (two
turns, one clause of warning), once of starvation two turns after the game first said the
word "faint", and once in a fresh run that reached the Mess Hall holding the kitchen card and
collapsed on the turn the kitchen door opened. Add a shuttle that refuses service at a time
of day the game never mentions, and a save system a player has no reason to think exists
because the death prompt offers RESTART and QUIT that do nothing, and the honest answer is
no. A determined player who saves obsessively could finish it. A first-time player will die
holding the solution.

**The three changes that would most improve it**, in order:

1. **Make the survival clocks legible and give them room to act.** Starvation goes from
   "you're starting to feel faint" to dead in five turns and from the final warning to dead in
   two, on a clock where one corridor crossing costs eight moves' worth of time and nothing
   displays the number. Put hunger, thirst and fatigue on the status line or in `diagnose`
   as something countable, stretch the last rung to fifteen or twenty turns, and make the
   hint system check whether the food it recommends is on the same island.
2. **Tell the player about the night curfew, and let them sleep through it.** One line in the
   shuttle cabin, on the platform sign, or on the shuttle access card — "service resumes at
   dawn" — plus letting `sleep` work when there is nothing else to do, converts a
   run-ending wall into a pause. As it stands the game locks its own vehicle, refuses the
   only remedy twice with two different jokes, and never says how long the lock lasts.
3. **Ship a light source, or say where it is.** Two dark rooms gate the helicopter, the
   orange key and everything under the complex, and across 951 commands and three legs no
   leg found a lamp. The laser is not one, Floyd will not scout, there is no spare battery,
   and in the dark the parser will not even let you name an object to the robot standing
   beside you. If the lamp exists, nothing in the Library, the Plan Room or the Systems
   Monitors board points at it; if it is meant to be deduced, the deduction has no visible
   first step.

Honourable mention to a fourth: **surface the save system**. Make the death prompt's RESTART
and QUIT work, or stop offering them, and have the game mention SAVE once — on the first
death, or the first time a timer warning fires. Leg 2 lost an entire playtest to not knowing
a working feature was there.

### Friction log

| # | I was trying to | I typed | What happened | How bad |
|---|---|---|---|---|
| 1 | Explore the Feinstein at all | `aft`, `fore` from Reactor Lobby / Deck Eight | Blather blocks every exit; Auxiliary Control and the Jump Machinery Room are named in room text but unreachable. Waiting near Blather loops one line forever with no escalation, so there's no way to learn whether persistence pays | Low — prologue is meant to be a cage, but naming two rooms you can never enter invites wasted turns |
| 2 | Survive the explosion | `wait` x4 on Deck Nine | The escape-pod door opens and re-shuts within two turns and nothing tells you to move. Died at turn 24 with 0 points on a first, reasonable playthrough | Medium — it is a fair "read the room" death, but the only cue is one clause at the end of a sentence |
| 3 | Restart after dying | `restart` (as the game's own death prompt instructs) | "You have died. Start again with --new." The in-game prompt says type RESTART/RESTORE/QUIT; none of those work | Medium — the game tells the player to do something the game cannot do |
| 4 | Ask Blather about something | `ask blather about pod` | "The Ensign First Class looks at you expectantly, as though he thought you were about to talk." Reads like the parser didn't understand ASK ABOUT and fell through to a default | Low-medium — ASK X ABOUT Y is bedrock IF phrasing; a flat "Blather isn't interested in your questions" would read as authored rather than broken |
| 5 | Examine myself | `x me` | "I see nothing special about **the you**." | Low, but it's an obvious grammar bug on a command every IF player types in the first minute |
| 6 | Find things hidden in my clothes | `search uniform` | "You find nothing unusual" — even though `i` shows the uniform *contains* the ID card | Low-medium — SEARCH contradicting INVENTORY teaches the player that SEARCH is useless |
| 7 | Ride the elevator | `press up` | "What do you want to press?" — the object is literally named "Up button" and there is exactly one thing called Up in the room | Medium — pure phrasing tax; `press up` should work |
| 8 | (prose) | `x webbing` | "It could **accomodate** from one to, perhaps, twenty people." Misspelling of "accommodate" | Low |
| 9 | (prose) | any SanFac | "how little the **millenia** and cultural gulfs have changed toilet bowl design." Misspelling of "millennia", and it appears in all four SanFacs | Low, but x4 |
| 10 | (prose) | pod landing | "The pod rocks gently back and forth **as if it was** precariously balanced" — subjunctive should be "were" | Trivial |
| 11 | Find a reason to enter eight near-identical rooms | walking Dorms A-D and SanFacs A-D | All four dorms share one description and all four SanFacs share another; `search bunks` finds nothing. Eight rooms, no content | Medium — real mapping drag; even one differing detail per dorm would pay for the walk |
| 12 | Fish a key out of a floor crevice | `get key with brush` | "Nice try." — a catch-all sneer, so I assumed GET X WITH Y wasn't implemented and stopped trying it. It *is* implemented: `get key with bar` (the magnet) works perfectly | Medium — a dismissive default on a **correct** phrasing taught me the wrong lesson about the parser |
| 13 | Keep the Lower Elevator Access Card intact | `open compartments`, then `turn on robot` | Opening the robot **auto-takes** the card into the same hands as the magnet and warns in the same breath; one turn later the stripe is smeared — and the score goes **up** 2 on that turn, so it reads as success. I never chose to hold them together | **High — the nearest thing to a bug I've seen.** The auto-take should refuse, or stow the card, while the magnet is held |
| 14 | Aim the laser | `point laser at flask`, `turn on laser` | "It's usually impolite to point." / "You can't turn that on." The only verb that works is `fire laser` | Low-medium — POINT X AT Y is the natural phrasing for the one pointable object in the game |
| 15 | Dispense a chemical | `press acid` | "You can't see any acid here!" — the button is labelled ASID and the room text calls it "The other white button ... says ASID." `press acid button` works | Medium — same class as `press up`; the game names buttons by their labels and then won't accept the label alone |
| 16 | Pick up two things | `take box` while holding the oil can | "Oh, no. The oil can slips from your arms while taking the cardboard box and both tumble to the ground." Nothing hints the can can simply go *in* the box | Low — the load system is otherwise unusually helpful (it names what to drop) |
| 17 | Look at the shop's contents | `x machines` in the Machine Shop | Resolves to the chemical dispenser — "I see nothing special about the chemical dispenser" — even though the room text advertises "a variety of unusual machines" as separate scenery | Low |
| 18 | See what the laser is made of | `i` | The laser lists its contents as "A laser setting dial / An old battery." A dial is not something a laser *contains*; it leaks an implementation detail into the inventory | Low |
| 19 | Get help carrying the ladder | `floyd, take the ladder` | "Floyd whines, 'Enough talking! Let's play Hider-and-Seeker.'" Floyd never carries anything, so the ladder forces you to drop **everything else** and make two six-room trips | Medium — the haul is ~12 moves of pure walking with no decisions in it |
| 20 | Leave the elevator | `south` while the car was still moving | "The door is closed." Nothing says you're in transit; the only cue that you've arrived is a `>>` event you'll miss if you don't `wait` | Low-medium — cost me three wasted commands the first time |
| 21 | Study the wall maps | `x kalamontee map` in the Plan Room | "Examining the maps reveals no new information." The maps are the room's whole point and the room description is the only place their content exists | Low — but it reads as if the object were unimplemented |
| 22 | Be told to look closer | Kitchen room description | "Of particular interest is a machine near the door. **You should probably examine it more closely.**" The only place the game drops out of its voice to instruct the player, and the least necessary one | Low-medium — tonal, but jarring after 280 turns of confident prose |
| 23 | Pour coolant into the funnel | `pour flask into funnel` | "Pouring or spilling non-liquids is specifically forbidden by section 17.9.2 of the Galactic Adventure Game Compendium of Rules" — while the flask is full of liquid. `pour fluid into funnel` works | Medium — the joke asserts something factually untrue about the world state, so it reads as the game not knowing what it's holding |
| 24 | Fix the comm coolant system | the whole green-then-brown relay | The enunciator demands one colour at a time, and each dose is a ~22-move round trip (Comm Room ⇄ Machine Shop, two elevator waits each way). One iteration is a good puzzle; the second is already a chore | Medium-high if the sequence runs to three or more colours — a bigger flask, or Floyd as a runner, would fix it |
| 25 | Restart the escape-pod sequence knowledge | n/a | Minor but worth recording: the Feinstein's explosion fires on the **clock** (~time 4895), not the turn counter, so a player who spends the prologue examining things gets ~21 turns and one who spends it on `wait` (40 time units each) gets ~7. Death is much likelier for the impatient player, which is backwards | Low |
| 26 | Pick up the oil can while carrying a full flask of coolant | `take oil can` | "Oh, no. The glass flask slips from your arms while taking the oil can and both tumble to the ground. **Unfortunately, the chemical spills out of the flask and evaporates.**" The turn counter did **not** advance (342 to 342), so the game frames this as a free retry — but it had just silently destroyed a puzzle item that costs a 24-move round trip to replace | **High** — a "no turn passed" event that permanently consumes a quest item is the worst of both worlds. Either charge the turn or don't spill the contents |
| 27 | Read the shuttle's speed readout | `x display` | "I don't know the word **display**" — the room description in the same breath says "A control panel contains a slot, a lever, and a **display**." Same for "central": the text says "The lever can be set at a central position" and `set lever to central position` gets "I don't know the word 'central'" | Medium — a noun the room text uses twice is not in the dictionary, on the one control panel in the game you must operate precisely |
| 28 | Hold the shuttle at cruising speed | `center lever`, `move lever to middle`, `push lever to central position` | All three: unknown word. The only working phrasing is a bare `pull lever` / `push lever`, which steps the three-position lever one notch. Nothing says the lever is stepped rather than set | Medium — I overshot the posted 45 limit to 50 while hunting for the phrasing |
| 29 | Stop the shuttle at the station | coasted in at speed 5 with the lever centred | "The shuttle car rumbles through the station and smashes into the wall at the far end ... Both you and the shuttle car produce unhealthy crunching sounds." Speed 5 is the smallest non-zero speed the display can show, so "creep in slowly" is exactly what a careful player does, and it still crashes. `diagnose` reports no injury afterwards, so the crunching is pure flavour | Medium — the failure punishes the cautious reading of the controls, and nothing distinguishes "slow" from "braking" |
| 30 | Ask the library index for help, as it told me to | `call librarian` | "I don't know the word **call**." The terminal's own text is "If yuu reekwiir asistins, **kawl** xe liibrereein" — the game issues an instruction using a verb it does not implement. (There is no librarian anywhere in the wing either, so the instruction may be dead text) | Low-medium — a printed instruction the parser rejects teaches the player to distrust printed instructions |
| 31 | Read the third Project sub-topic | library terminal, 5 then 3 ("Prajekt Kuntrool") | Topics 1 and 2 each print a paragraph of real backstory. Topic 3 prints only "Yuu hav reect xe loowist levul uv xe liibreree indeks. Pleez tiip zeeroo..." — i.e. the menu offers a numbered entry that has no content behind it | Low-medium — looks like a missing string rather than a design choice, because the same message is what you get for pressing an *invalid* key |
| 32 | Drink the medicine I could see listed in the bottle | `drink medicine` | "The bottle is closed." The room description had just printed "The medicine bottle contains: A quantity of medicine" — a closed container listing its contents. `open bottle` first, then it works | Low |
| 33 | Pick anything up on Lawanda | `take bottle`, `take spool`, `take shuttle card` | Three times in a row: "Oh, no. The X slips from your arms while taking the Y and both tumble to the ground." My whole inventory at the time was six items, two of them worn. The *good* load message ("you'd have to drop the laser, the survival kit...") names what to drop; the fumble message names nothing, so you retry blind. Undocumented fix: **the Patrol uniform is a container** and holds two items | Medium — the capacity is about four carried objects, which is very tight for a game whose puzzles want pliers + board + card + canteen at once |
| 34 | Not starve on Lawanda | nothing — I ate at the Kitchen before leaving and the canteen simply ran out | **There is no food or water anywhere on Lawanda.** The canteen emptied four turns after I arrived, and the only refill (the Kitchen dispenser) and the only goo (Storage West) are both back on Kalamontee, ~40 turns away through a shuttle ride. Nothing warns you before you board a shuttle that you are leaving the food behind | **High** — a whole continent-sized wing with no survival resource, entered through a one-way-feeling vehicle, with no pre-flight warning |
| 35 | Act on the starvation warning | `wait` (waiting for Floyd to come back so I could ask him for the fromitz board) | Turn 526 "starting to feel faint", turn 530 "if you don't eat or drink something in a few millichrons, you'll probably pass out", turn **532** dead. **Two turns from the final warning to death**, on an island with no food. Compare the sleep ladder, which gives four graded warnings over dozens of turns | **High** — the fuse is far too short to act on, and it burned during an unavoidable wait for an NPC |
| 36 | Follow the game's own hint while starving | n/a — the hint fired by itself | Every hunger warning was followed by "!> There is still goo in the survival kit you left in Storage West." Storage West is on **the other island**, roughly forty turns away against a two-turn fuse. The hint system is tracking my inventory but not my location, so it confidently recommends an action that is physically impossible | **High** — a hint that is not merely useless but actively misleading at the exact moment the player most needs a true one |
| 37 | Recover from death | `restore`, `undo`, `--restore`, `--undo`, `look` | All five: "You have died. Start again with --new." Meanwhile the status line itself reads "YOU HAVE DIED (**restore your saved game**, or start again with --new)" and the in-game death prompt offers RESTART/RESTORE/QUIT. No save, no undo, no checkpoint exists — so one death discards the entire session (601 commands, two in-game days, score 44). This is leg 1's friction #3 again, and it cost a whole playtest leg this time | **High** — the death UI promises a recovery path that the product does not have, and the absence of any checkpoint turns an ordinary IF death into total data loss |
| 38 | See where the shuttle had got to | `look` in Alfie Control East after arriving at Lawanda Station | The cabin description still reads "Through the cabin window you can see parallel rails running along the floor of a long tunnel, vanishing in the distance," identically at Kalamontee Station, mid-tunnel, and parked at Lawanda. The one window in a vehicle that moves never changes | Low — but it's the only instrument you have for "where am I", and it lies |
| 39 | Take the emergency provisions the pod had just revealed | `take kit and towel` from inside the safety web | "You can't reach it from here." The panel opens on the landing turn while you are still webbed in, and the only way to reach it is `get out of web` — which is also the action that starts the pod sinking. So the game shows you the food during the one turn you cannot take it, and hands you the chance to take it only once the room is on a fuse. I left the game's only portable food at the bottom of the ocean | Medium — a fair sequence, but the timing reads as a trap rather than a test |
| 40 | Swim back to the sinking pod for the kit I had missed | `down` from the Crag | "A mighty undertow drags you across some underwater obstructions. **** You have died ****" — instantly, on the move, with no intervening room, no warning in the Crag description (which says only "About two meters below, turbulent waters swirl against sharp rocks"), and no chance to turn back. The same `down`/`up` pair was survivable sixty seconds earlier | Medium-high — a one-word instant death on a direction the room text does not mark as lethal |
| 41 | Get to the Kitchen before starving | the whole ladder-and-rift route | Hunger runs on the **clock**, not the turn counter, and the long Dorm Corridor ⇄ Corridor Junction hallway costs **160 time units** per crossing against 20 for a normal move. The ladder puzzle forces two crossings, which silently burns eight moves' worth of food clock. Between the third hunger warning and the fourth I had moved exactly one room. Nothing — not the status line, not `diagnose` — exposes the number you are spending | **High** — the cost of a route is invisible until it kills you, and the route the puzzle forces is the expensive one |
| 42 | Protect myself with a save, as instructed | `save` in the Mess Hall at time 7369 | "Ok." — and the save was already unsurvivable. Death was scheduled at 7383, two actions away; the Kitchen needed four. `restore` faithfully returns you to a position that cannot be won, and nothing in the acknowledgement suggests it. With a single save slot and a hard survival clock, one careless save overwrites your only good one | **High** — the feature that is supposed to undo a death can instead lock it in |
| 43 | Free a hand by using my clothes as a bag | `put bedistor in uniform` | "There's no room." The Patrol uniform is a **one-item** container and the prologue ID card is already in it, so it is effectively zero-slot unless you think to throw your own ID away. Leg 2 recorded it as the answer to the load limit; it is not. (The **survival kit** is: it held three goos and three access cards.) | Low-medium — a useful container whose capacity is invisible and, at one item, functionally a lie |
| 44 | Fill the canteen at the Kitchen dispenser | `put canteen in niche` + `press button` with the canteen closed | "A thick, brown liquid spills over the closed canteen, dribbles down the side of the machine, and forms a puddle on the floor which quickly dries up." The machine wastes a dose against a sealed lid and never says the lid is the problem; the canteen's own description does not read as closed. `open canteen` first, then it works | Low-medium — a silent failure on the single most important machine in the game |
| 45 | Ride the shuttle to Lawanda in the evening | `slide shuttle card through slot` in Alfie Control East | "A recorded voice explains that using the shuttle car during the evening hours requires special authorization." **The shuttle has an undocumented night curfew.** Nothing on Kalamontee mentions hours of operation — not the platform signs, not the Plan Room maps, not the Library, not the card the game gives you points for finding. `push lever` then reports only "Shuttle controls are not currently activated," describing the symptom and not the cause | **High** — a hard, timed lock on the one route to half the game, with no forward notice anywhere |
| 46 | Sleep off the curfew | `sleep` | "You're not tired!" — and later, at the **last** rung of the exhaustion ladder ("You can barely keep your eyes open"), `sleep` in Reactor Control gives "Civilized members of society usually sleep in beds." So the two timers fight: the vehicle is locked until morning, and the only way to reach morning is refused first for not being tired enough and then for not being in a bed (the nearest one is six rooms away) | **High** — combined with #45 this is a run-ender: locked out of the shuttle, forbidden to wait it out |
| 47 | Wait out the night deliberately | `wait until morning`, `wait for morning` | Both are silently truncated to a plain 40-unit `wait` with no comment. The parser drops the phrase instead of rejecting it, so the reply is indistinguishable from the command having worked — the worst of the three possible behaviours. Meanwhile nothing anywhere says how long night lasts: the chronometer shows a raw number that wraps, and the status line says only "night". I abandoned the shuttle at time 8043; dawn arrived at about 8800, **nineteen waits later** | Medium-high — an unknowable wait is treated by a player as an infinite one, and this one cost me the entire Lawanda half of the leg |
| 48 | Cure four turns of escalating exhaustion warnings | nothing — the day simply rolled over | The fatigue ladder ran all the way to "You can barely keep your eyes open"; then the clock wrapped to Day 2 and `diagnose` in the bunk reported "You feel **well-rested**" without my ever having slept. The tiredness timer is reset by the day boundary, not by sleeping — so four escalating warnings, a mechanic that refuses to let you act on them, and then they evaporate on their own | Low-medium — it makes the warning ladder read as noise, which is dangerous in a game whose *other* ladder kills you in two turns |
| 49 | Search the disassembled robots for a spare battery | `search robots`, `x robots`, `take battery` in the **Robot Shop** | "You can't see any robots here!" — in a room described as "filled with robot-like devices of every conceivable description, all in various states of disassembly," in a game whose best character is a robot. The implemented noun is "devices" (`x devices` -> "They are components of disassembled robots, beyond repair"). "Battery" is also not findable, though the laser contains "an old battery" and Floyd repeatedly "frets about the possibility of his batteries failing" | Medium — the room's own name is not in its dictionary, and the two obvious nouns for the game's one unsolved blocker both bounce |
| 50 | Send Floyd into a dark room to fetch what I cannot see | `floyd, go north` (Transportation Supply), `floyd, go down` (Reactor Access Stairs) | Both get his catch-all "You know me and my sense of direction... Tell Floyd a story?" So the Repair Room's small-doorway errand on Lawanda is a single scripted beat, not a general verb — even though that beat is precisely what teaches the player "when you can't go somewhere, send the robot." Worse, inside the dark room `floyd, get the orange key` answers "You can't see any orange key here!": the visibility check runs on **me**, not on the robot standing next to me | Medium — the game teaches a general solution and then implements it exactly once |
| 51 | Recover from death (revision of #37) | `save`, then `restore` after dying | **Correction to leg 2's worst finding: SAVE and RESTORE both work.** `save` answers "Ok." and costs **no turn**; after a death `restore` returns you to the exact position, score and inventory. What is broken is only the advertising: the in-game death prompt offers RESTART, RESTORE and QUIT and only RESTORE functions, and nothing in the game ever mentions SAVE exists. Leg 2 lost 601 commands to a feature that was there all along | Downgraded to Low-medium — the recovery path exists; the game just never tells you, and offers two dead options beside it |
