// Checkpoints: a saved game made by playing the walkthrough to a point, so a playtest can start where the thing under
// test begins instead of replaying the opening (the user, 2026-09-23: "test the enunciator and chemical dumping
// mechanism without going through the whole opening and access card retrieval and floyd activation"). The files are
// written by scripts/checkpoints.mjs into data/checkpoints/; the page loads one with ?checkpoint=ID.
//
// A checkpoint is played at a fixed seed, so without help every load would roll the same game. `reroll` names the
// random draws to make afresh on each load. 'chemicals' is COMM-SETUP's order of lamps (RANDOMIZE-ORDER, STEPS-TO-GO,
// CHEMICAL-REQUIRED; compone.zil), which a real game rolls on its first turn: the user asked for a different colour
// each load, as a real game would give. The laser's shot counts come from the same routine and are kept as played.
//
// Every checkpoint starts the player fed, rested and well (the user, 2026-09-23: "every checkpoint should start me
// off with full health and sleep"): rules/survival.js CHECKPOINT-REFRESH.
export function applyCheckpoint(g, checkpoint, seed) {
  g.load(checkpoint.state);
  g.state.rng = seed | 0;                         // the rest of the game is not the walkthrough's either
  g.rules.helpers['CHECKPOINT-REFRESH'](g);
  if ((checkpoint.reroll ?? []).includes('chemicals')) {
    const shots = { old: g.getg('OLD-SHOTS'), fresh: g.getg('NEW-SHOTS') };
    g.rules.helpers['COMM-SETUP'](g);
    g.setg('OLD-SHOTS', shots.old); g.setg('NEW-SHOTS', shots.fresh);
  }
  // The damaged sector (tower.js SECTOR-SETUP) is rolled afresh too, unless the player has already read it off the
  // print-out: then the number they saw is the one the booth takes.
  if (!g.getg('SECTOR-READ')) g.rules.helpers['SECTOR-SETUP'](g);
}
