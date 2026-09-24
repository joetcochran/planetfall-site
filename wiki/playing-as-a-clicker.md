# Playing it as a clicker

By 23 September nearly every room was painted and accepted, and the user played the published game from start to finish by mouse alone. The earlier blind playtesters had been AI agents working through a text front end (see [Playing it](playing-it.md)). This was the first time the person who decides played the game as a clicker, on the page itself. What they found, and what was built in answer the same day, turned the project from the rooms to the player. The user put it this way: "i think we are mostly done with the room work and now we are working through various playtest bugs" (23 Sep, d71649fc). This page gathers what that playthrough taught about playing by mouse. The day's story is in the [journal](journal.md) entries for 23 September. Where a change goes beyond Infocom's game, it is listed on [Where we left the original](canon-deviations.md).

## What a clicker needs

Every one of the user's notes came down to one of four needs.

**To reach what you can see.** A text player types the thing's name. A clicker has to hit it on the screen. The test suite had been opening menus by an object's id, so a flask hidden under another box passed every check. The user asked: "how did the clicker playtester get through this step?" Now the browser harness clicks where things are drawn. A target must be at least 12 by 12 pixels on screen, and three quarters of a 9 by 9 grid of clicks over it must reach it (0f091163). A click on a name plate opens that thing's menu. A container drawn as a picture wins its own clicks. Things inside an open container get plates of their own (47de691a). And a thing is drawn where the game says it is: the flask stands under the dispenser's spout, not at the player's feet (a28844d0).

**To know what a click did.** When a card switched something on, the game had drawn a green placeholder box, and the user took it for the card left behind in the slot. Each such place now lights a sign in canon's phonetic spelling, such as ELAVAATUR AKTIVAATID (e816cb98). The enunciator's lamp that says which chemical is wanted is now twice the size, blinks and glows. Its black became pink, in Infocom's text as well (73b3752f, afa1ed77). While a room loads, a spinning helmet says the game has not stalled (12524b3c).

**To see what the text says is there.** When the text says the mutants are one room behind, or that Floyd has run into the Bio Lab, the picture has to agree. Glimpses draw a thing in the next room where the player can see into it, with no plate and no click (5f5234a7, bfaea500). Greg painted the pictures that had been boxes: the mangled Floyd, the extended ladder, and the mutants stunned by the fungicide (219f4fa3, afa1ed77).

**To know where you are in a timed stretch.** Two parts of the game narrate progress turn by turn: the pod's descent and the shuttle ride. For the pod, Greg painted twelve views of the outside, so the window matches the text for a player standing outside the webbing. For the shuttle, a lit map of the tunnel is planned, showing the mark the car has reached and a speed guide. Both were in progress on the evening of 23 September.

## How the work is run

- **The checklist.** The dashboard now opens on the user's playtest bugs, each in their own words. Each has a number, a state and a "test it" link, and the user accepts or rejects it with a note (d71649fc; `data/playtest-bugs.json`). Of the 39 entries on the evening of 23 September, 30 were accepted and none rejected.
- **Checkpoints.** The user can start where a fix shows: at a stage of the game, at a changed room, or at one bug's test (`TC17-course-fix` and the like, a2fe780a). Every checkpoint is a real route through the game, and each loads the player fed, rested and well.
- **Accepted rooms go back.** A fix that changes an accepted room's picture sends the room back to the user to look at. On 23 September eighteen rooms went back.

## What stayed as Infocom wrote it

Playing by mouse did not make the game easier. The microbe still kills a player who fires the laser too long. A player who stays out of the pod's webbing still dies at the landing. The mini card is still "in the next room" until Floyd's death scene; it is simply no longer drawn at the player's feet before then. The user turned down a greyed-out Take that would explain itself. The additions are about seeing and reaching things, not about the puzzles.

The tools are in [Tools](tools.md), and the dated events in the [timeline](timeline.md).
