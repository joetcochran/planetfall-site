# Walkthrough

The whole game, start to finish, in 296 steps. It is the route the test suite plays before every release (`scripts/tests/walkthrough.mjs`), so it is known to finish the game. The step numbers are the ones the checkpoints and the playtest notes use. This page is written from the suite by `scripts/wiki-walkthrough.mjs`.

Each section is a table of its steps: the step's number, the command a typist would enter, and what it does. A move says which room it takes you to; a step marked "Repeat until" is typed again until the game says so. A clicker does the same thing from the menus: click the thing, or its name plate, and pick the verb; move with the compass. The two number entries (the laser's dial and the booth's keyboard) open a number pad.

Two things differ from game to game, so read them off the screen rather than these steps:

- **The chemicals.** The Comm Room's lit lamp names the chemical the coolant system wants: push the Machine Shop button of that colour. The colours and the number of pours (two or three) are both random. The steps below pour what the test game drew (green, then brown).
- **The damaged sector.** The Computer Room's print-out ends "Malfunkshun in Sekshun ...!" with a number from 100 to 999. Type that number in the Miniaturization Booth. The wrong number fries you. Infocom's game always used 384; see [Where we left the original](canon-deviations.md).

The steps assume the test game's luck elsewhere too: when a step says to wait until something happens, keep waiting until it does.

## Deck Nine

The routine day aboard the Feinstein, until the explosion and the escape pod.

| # | Command | What it does |
|--:|---|---|
| 1 | `look` | Deck Nine, where the game starts |
| 2 | `examine brush` | Nothing special about it |
| 3 | `inventory` | The brush, the chronometer and the uniform |
| 4 | `wait` | Repeat until "…slides open…" |
| 5 | `w` | To Escape Pod |
| 6 | `get in web` | Into the pod's safety web |
| 7 | `wait` | Repeat until "…pod lands with a thud…" |

## The escape pod

Stand up once the pod has landed, take what it carries, and get out.

| # | Command | What it does |
|--:|---|---|
| 8 | `stand up` | The pod shifts and falls |
| 9 | `take towel` | Taken |
| 10 | `take kit` | Taken |
| 11 | `open pod door` | Ocean water rushes in |
| 12 | `out` | To Underwater |
| 13 | `up` | You kick upward |
| 14 | `up` | Another push upward |
| 15 | `up` | You rise clear of the rocks |
| 16 | `up` | To Crag |

## Up to the complex

Climb from the seabed and the cliff into the upper complex, to the dormitory corridor.

| # | Command | What it does |
|--:|---|---|
| 17 | `up` | To Balcony |
| 18 | `up` | To Winding Stair |
| 19 | `up` | To Courtyard |
| 20 | `n` | To Plain Hall |
| 21 | `ne` | To Rec Corridor |
| 22 | `e` | To Mess Corridor |
| 23 | `e` | To Dorm Corridor |

## The long hall and the rift

East along the long hall to the junction, the damaged corridor and the rift.

| # | Command | What it does |
|--:|---|---|
| 24 | `e` | To Corridor Junction |
| 25 | `n` | To Admin Corridor South |
| 26 | `examine crevice` | A steel key lies at its bottom |
| 27 | `take key` | The crevice is too narrow for fingers |
| 28 | `n` | To Admin Corridor |
| 29 | `examine rift` | Eight meters wide, too far to jump |
| 30 | `n` | The rift is too wide to jump across |
| 31 | `s` | To Admin Corridor South |
| 32 | `s` | To Corridor Junction |
| 33 | `e` | To Elevator Lobby |

## The upper elevator

Call it and step in. Without its access card the panel does nothing yet.

| # | Command | What it does |
|--:|---|---|
| 34 | `push blue button` | Calls the upper elevator |
| 35 | `wait` | Repeat until "…north end of the room slides open…" |
| 36 | `n` | To Upper Elevator |
| 37 | `push up button` | Nothing happens without the access card |
| 38 | `out` | To Elevator Lobby |

## The key in the crevice

The magnet from the tool room fishes the key out of the crevice.

| # | Command | What it does |
|--:|---|---|
| 39 | `w` | To Corridor Junction |
| 40 | `s` | To Mech Corridor North |
| 41 | `s` | To Mech Corridor |
| 42 | `s` | To Mech Corridor South |
| 43 | `sw` | To Tool Room |
| 44 | `take magnet` | The bar is a strong magnet |
| 45 | `ne` | To Mech Corridor South |
| 46 | `n` | To Mech Corridor |
| 47 | `n` | To Mech Corridor North |
| 48 | `n` | To Corridor Junction |
| 49 | `n` | To Admin Corridor South |
| 50 | `take key with magnet` | The magnet pulls the key out of the crevice |

## The ladder

The key opens the padlocked door with the ladder behind it.

| # | Command | What it does |
|--:|---|---|
| 51 | `s` | To Corridor Junction |
| 52 | `w` | To Dorm Corridor |
| 53 | `w` | To Mess Corridor |
| 54 | `unlock padlock with key` | The padlock springs open |

## Lightening the load

Put down the brush and towel: with eight things in hand you may fumble.

| # | Command | What it does |
|--:|---|---|
| 55 | `drop brush` | Dropped |
| 56 | `drop towel` | Dropped |
| 57 | `take padlock` | Taken |
| 58 | `open door` | Opened |
| 59 | `n` | To Storage West |

## Dinner

Eat from the survival kit when the first hunger warning comes. The ladder takes all the load you can carry, so the kit stays.

| # | Command | What it does |
|--:|---|---|
| 60 | `open kit` | Red, brown and green goo |
| 61 | `eat red goo` | Tastes like cherry pie |
| 62 | `drop kit` | Dropped |
| 63 | `drop padlock` | Dropped |
| 64 | `drop magnet` | Dropped |
| 65 | `take ladder` | Taken |
| 66 | `s` | To Mess Corridor |
| 67 | `e` | To Dorm Corridor |
| 68 | `e` | To Corridor Junction |
| 69 | `n` | To Admin Corridor South |
| 70 | `n` | To Admin Corridor |

## Across the rift

Lay the ladder across the rift. Fetch the upper elevator and kitchen cards from the small office and the shuttle card from the large office, then ride up to the tower.

| # | Command | What it does |
|--:|---|---|
| 71 | `drop ladder` | Dropped |
| 72 | `open ladder` | It extends to about eight meters |
| 73 | `put ladder across rift` | The ladder spans the rift |
| 74 | `n` | To Admin Corridor North |
| 75 | `w` | To Small Office |
| 76 | `open desk` | The kitchen and upper elevator cards |
| 77 | `take upper card` | Taken |
| 78 | `take kitchen card` | Taken |
| 79 | `w` | To Large Office |
| 80 | `open desk` | The shuttle card |
| 81 | `take shuttle card` | Taken |

## The pocket

The cards not needed until day two go in your uniform's pocket.

| # | Command | What it does |
|--:|---|---|
| 82 | `put shuttle card in uniform` | Into the uniform's pocket |
| 83 | `e` | To Small Office |
| 84 | `e` | To Admin Corridor North |
| 85 | `s` | To Admin Corridor |
| 86 | `s` | To Admin Corridor South |
| 87 | `s` | To Corridor Junction |
| 88 | `e` | To Elevator Lobby |
| 89 | `n` | To Upper Elevator |
| 90 | `slide upper card through slot` | Elevator enabled |
| 91 | `push up button` | The elevator goes up |
| 92 | `wait` | Repeat until "…elevator door slides open…" |
| 93 | `s` | To Tower Core |
| 94 | `ne` | To Comm Room |

## The Comm Room

The Feinstein's last message, and the coolant system. The enunciator's one lit lamp names the chemical to pour, and its colour is chosen at random each game: push the dispenser button that matches your lamp, not the colour these steps push. The repair takes two or three chemicals, also random; each right one lights the next lamp, until the lights all go dark. The wrong one shuts the system down for good. The flask and the dispenser are down in the Machine Shop.

| # | Command | What it does |
|--:|---|---|
| 95 | `push playback button` | The Feinstein's last message |
| 96 | `sw` | To Tower Core |
| 97 | `n` | To Upper Elevator |
| 98 | `slide upper card through slot` | Elevator enabled |
| 99 | `push down button` | The elevator goes down |
| 100 | `wait` | Repeat until "…elevator door slides open…" |
| 101 | `s` | To Elevator Lobby |
| 102 | `w` | To Corridor Junction |
| 103 | `s` | To Mech Corridor North |
| 104 | `s` | To Mech Corridor |
| 105 | `s` | To Mech Corridor South |
| 106 | `sw` | To Tool Room |
| 107 | `drop brochure` | Dropped |
| 108 | `drop key` | Dropped |
| 109 | `take flask` | Taken |
| 110 | `take laser` | Taken |
| 111 | `e` | To Machine Shop |
| 112 | `put flask under dispenser` | The flask under the spout |
| 113 | `push` *the lit lamp's colour* `button` | The chemical your lamp names, into the flask |
| 114 | `take flask` | Taken |

## The Robot Shop

The lower elevator card is in a compartment of the switched-off robot. Switching him on brings Floyd to life a little later.

| # | Command | What it does |
|--:|---|---|
| 115 | `e` | To Robot Shop |
| 116 | `search robot` | The lower elevator card |
| 117 | `put lower card in uniform` | Into the uniform's pocket |
| 118 | `turn on robot` | A faint hum inside the robot |
| 119 | `nw` | To Mech Corridor South |
| 120 | `n` | To Mech Corridor |
| 121 | `n` | To Mech Corridor North |
| 122 | `n` | To Corridor Junction |
| 123 | `e` | To Elevator Lobby |
| 124 | `n` | To Upper Elevator |
| 125 | `slide upper card through slot` | Elevator enabled |
| 126 | `push up button` | The elevator goes up |
| 127 | `wait` | Repeat until "…elevator door slides open…" |
| 128 | `s` | To Tower Core |
| 129 | `ne` | To Comm Room |
| 130 | `pour fluid into hole` | The first chemical; the next lamp lights (brown, in the test game) |

## Evening, day one

The sleep clock has started, so the second chemical waits for the morning. Fill the canteen in the kitchen and sleep in a dormitory bunk.

| # | Command | What it does |
|--:|---|---|
| 131 | `sw` | To Tower Core |
| 132 | `n` | To Upper Elevator |
| 133 | `slide upper card through slot` | Elevator enabled |
| 134 | `push down button` | The elevator goes down |
| 135 | `wait` | Repeat until "…elevator door slides open…" |
| 136 | `s` | To Elevator Lobby |
| 137 | `w` | To Corridor Junction |
| 138 | `w` | To Dorm Corridor |
| 139 | `w` | To Mess Corridor |
| 140 | `s` | To Mess Hall |
| 141 | `take canteen` | Taken |
| 142 | `open canteen` | Opened |
| 143 | `slide kitchen card through slot` | The kitchen door opens |
| 144 | `s` | To Kitchen |
| 145 | `put canteen in dispenser` | The canteen into the dispenser's niche |
| 146 | `press button` | The canteen fills |
| 147 | `take canteen` | Taken |
| 148 | `close canteen` | Closed |
| 149 | `n` | To Mess Hall |
| 150 | `n` | To Mess Corridor |
| 151 | `e` | To Dorm Corridor |
| 152 | `n` | To Dorm D |
| 153 | `get in bed` | Into a bunk to sleep |
| 154 | `wait` | Repeat until "…SEPTEM 7, 11344…" |

## Day two

Everything you held is on the floor beside the bunk. Breakfast first.

| # | Command | What it does |
|--:|---|---|
| 155 | `stand up` | Out of bed, day two |
| 156 | `take canteen` | Taken |
| 157 | `open canteen` | Protein-rich liquid inside |
| 158 | `drink liquid` | Breakfast: thirst and hunger both gone |
| 159 | `take laser` | Taken |
| 160 | `take flask` | Taken |
| 161 | `take upper card` | Taken |

## Finishing the coolant repair

The good bedistor from the carton in Storage East, the pliers from the Tool Room, the second chemical from the Machine Shop (the colour of the lamp now lit), and up to the Comm Room. If a lamp is still lit after this pour, your game wants a third chemical: fetch and pour it the same way.

| # | Command | What it does |
|--:|---|---|
| 162 | `s` | To Dorm Corridor |
| 163 | `e` | To Corridor Junction |
| 164 | `s` | To Mech Corridor North |
| 165 | `e` | To Storage East |
| 166 | `take good bedistor` | Taken |
| 167 | `w` | To Mech Corridor North |
| 168 | `s` | To Mech Corridor |
| 169 | `s` | To Mech Corridor South |
| 170 | `sw` | To Tool Room |
| 171 | `take pliers` | Taken |
| 172 | `e` | To Machine Shop |
| 173 | `put flask under dispenser` | The flask under the spout |
| 174 | `push` *the lit lamp's colour* `button` | The chemical your lamp names, into the flask |
| 175 | `take flask` | Taken |
| 176 | `n` | To Mech Corridor South |
| 177 | `n` | To Mech Corridor |
| 178 | `n` | To Mech Corridor North |
| 179 | `n` | To Corridor Junction |
| 180 | `e` | To Elevator Lobby |
| 181 | `n` | To Upper Elevator |
| 182 | `slide upper card through slot` | Elevator enabled |
| 183 | `push up button` | The elevator goes up |
| 184 | `wait` | Repeat until "…elevator door slides open…" |
| 185 | `s` | To Tower Core |
| 186 | `ne` | To Comm Room |
| 187 | `pour fluid into hole` | The second chemical; if the lights go dark, the help message goes out |
| 188 | `drop flask` | Dropped |
| 189 | `sw` | To Tower Core |
| 190 | `n` | To Upper Elevator |
| 191 | `slide upper card through slot` | Elevator enabled |
| 192 | `push down button` | The elevator goes down |
| 193 | `wait` | Repeat until "…elevator door slides open…" |
| 194 | `s` | To Elevator Lobby |
| 195 | `drop upper card` | Dropped |

## The shuttle to Lawanda

Down to the Kalamontee platform and ride the shuttle. The tunnel is 24 marks, one a turn: accelerate to 40, coast to the halfway mark, then brake so the car is stopped when it reaches the far platform.

| # | Command | What it does |
|--:|---|---|
| 196 | `push red button` | Calls the lower elevator |
| 197 | `wait` | Repeat until "…south end of the room slides open…" |
| 198 | `s` | To Lower Elevator |
| 199 | `slide lower card through slot` | Elevator enabled |
| 200 | `push down button` | The elevator goes down |
| 201 | `wait` | Repeat until "…elevator door slides open…" |
| 202 | `n` | To Waiting Area |
| 203 | `e` | To Kalamontee Platform |
| 204 | `s` | To Shuttle Car Alfie |
| 205 | `e` | To Alfie Control East |
| 206 | `slide shuttle card through slot` | Shuttle controls activated |
| 207 | `push lever` | Lever up: the shuttle moves off |
| 208 | `look` | Repeat until "…Limit 45…" |
| 209 | `pull lever` | Lever to the middle: coast |
| 210 | `look` | Repeat until "…Hafwaa Mark…" |
| 211 | `pull lever` | Lever down: brake |
| 212 | `look` | Repeat until "…glides into the station and comes to rest…" |
| 213 | `w` | To Shuttle Car Alfie |
| 214 | `n` | To Lawanda Platform |
| 215 | `drop lower card` | Dropped |
| 216 | `drop shuttle card` | Dropped |
| 217 | `up` | To Escalator |
| 218 | `up` | To Fork |

## Lawanda

The course control bedistor, the Infirmary's medicine, and Floyd's discovery of the broken computer.

| # | Command | What it does |
|--:|---|---|
| 219 | `ne` | To Systems Corridor West |
| 220 | `e` | To Systems Corridor |
| 221 | `e` | To Systems Corridor East |
| 222 | `n` | To Course Control |
| 223 | `open cube` | The fused bedistor inside |
| 224 | `take fused bedistor` | Fused to its socket |
| 225 | `take fused bedistor with pliers` | The pliers pull it free |
| 226 | `put good bedistor in cube` | The warning lights go out |
| 227 | `drop pliers` | Dropped |
| 228 | `drop fused bedistor` | Dropped |
| 229 | `s` | To Systems Corridor East |
| 230 | `w` | To Systems Corridor |
| 231 | `w` | To Systems Corridor West |
| 232 | `nw` | To Infirmary |
| 233 | `take bottle` | Taken |
| 234 | `open bottle` | Opened |
| 235 | `eat medicine` | The fever breaks |
| 236 | `se` | To Systems Corridor West |
| 237 | `e` | To Systems Corridor |
| 238 | `e` | To Systems Corridor East |
| 239 | `s` | To Library Lobby |
| 240 | `s` | To Project Corridor East |
| 241 | `s` | To Computer Room |
| 242 | `wait` | Repeat until "…Computer is broken…" |

## The miniaturization card

The new battery from Lab Storage, then the bio-lock: Floyd fetches the miniaturization card.

| # | Command | What it does |
|--:|---|---|
| 243 | `ne` | To Main Lab |
| 244 | `s` | To Lab Storage |
| 245 | `take new battery` | Taken |
| 246 | `n` | To Main Lab |
| 247 | `open bio-lock door` | The door opens; Floyd goes off exploring |
| 248 | `se` | To Bio Lock West |
| 249 | `e` | To Bio Lock East |
| 250 | `wait` | Repeat until "…Floyd will get card…" |
| 251 | `open lab door` | Floyd plunges into the Bio Lab |
| 252 | `close lab door` | Shut the door on the fight inside |
| 253 | `wait` | Three knocks from Floyd |
| 254 | `open lab door` | Floyd stumbles out with the card |
| 255 | `close lab door` | Shut the door on the monsters |
| 256 | `take mini card` | Taken |
| 257 | `w` | To Bio Lock West |
| 258 | `open bio-lock door` | The door opens |
| 259 | `w` | To Main Lab |
| 260 | `sw` | To Computer Room |

## Into the computer

Read the print-out in the Computer Room: its last line names the damaged sector ("Malfunkshun in Sekshun ..."). The number is different in every game (Infocom's was always 384), and it is the number to type in the Miniaturization Booth. Then the fresh battery, the laser on its finest setting, and the speck in the relay.

| # | Command | What it does |
|--:|---|---|
| 261 | `read printout` | Its last line names the damaged sector |
| 262 | `s` | To Miniaturization Booth |
| 263 | `drop old battery` | Dropped |
| 264 | `put new battery in laser` | The new battery into the laser |
| 265 | `set dial to 1` | The dial is now set to 1 |
| 266 | `slide mini card through slot` | The booth asks for the damaged sector |
| 267 | `type` *the sector number* | To the station of the damaged sector |
| 268 | `e` | To Strip Near Station |
| 269 | `n` | To Middle of Strip |
| 270 | `n` | To Strip Near Relay |
| 271 | `shoot laser at speck` | Repeat until "…vaporizes into a fine cloud of ash…" |

## The microbe

A microbe blocks the way back along the strip. Shoot it every turn: each turn it goes unhit it closes in, and the third time it eats you. Every shot warms the laser, and once the laser is warm enough the microbe grabs for it. Throw the laser off the strip then, and the microbe follows it.

| # | Command | What it does |
|--:|---|---|
| 272 | `set dial to 6` | The dial is now set to 6 |
| 273 | `s` | To Middle of Strip |
| 274 | `shoot laser at microbe` | Repeat until "…perhaps attracted by the warmth of the laser…" (about eight shots), then throw it at once. Every shot says "The laser beam strikes the microbe"; keep shooting well past the warmth line and the microbe drags you into the void |
| 275 | `throw laser off strip` | The microbe follows the laser into the void |
| 276 | `s` | To Strip Near Station |
| 277 | `w` | To Auxiliary Booth |

## The way out

Through the Lab Office and the Bio Lab with the fungicide mist and the gas mask, then run from the mutants to the cryo-elevator.

| # | Command | What it does |
|--:|---|---|
| 278 | `n` | To Lab Office |
| 279 | `examine desk` | A memo |
| 280 | `open desk` | A gas mask |
| 281 | `take mask` | Taken |
| 282 | `wear mask` | You are wearing the gas mask |
| 283 | `push fungicide button` | Fungicide mist into the Bio Lab |
| 284 | `open office door` | The Bio Lab beyond is full of mist |
| 285 | `w` | To Bio Lab |
| 286 | `open lab door` | The door opens; the mutants are stunned |
| 287 | `w` | To Bio Lock East |
| 288 | `w` | To Bio Lock West |
| 289 | `open bio-lock door` | The door opens |
| 290 | `w` | To Main Lab |
| 291 | `sw` | To Computer Room |
| 292 | `w` | To ProjCon Office |
| 293 | `s` | To Cryo-Elevator |
| 294 | `push button` | The door closes just as the monsters reach it |
| 295 | `wait` | Repeat until "…opens onto a room to the north…" |
| 296 | `n` | To Cryo-Anteroom |
