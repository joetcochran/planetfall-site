// THE NARROW GLIMPSE: an actor in the next room, seen through the opening, drawn where he truly stands.
//
// The user's triage of 2026-09-23 (playtests/2026-09-23/PLAYTEST-LOG.md item 25) approved a narrow slice of
// PLAN-FLOYD-IN-A-GLIMPSE.md NOW, ahead of the rest of that plan: ONLY the four Bio Lab mutants (TRIFFID, RAT-ANT,
// TROLL, GRUE -- rules/biolab.js MUTANTS, which I-CHASE-SCENE moves together) and ONLY two openings, both from the
// final chase, where the mutants are one room behind the player:
//   - step 287: standing in BIO-LOCK-WEST, the mutants in BIO-LOCK-EAST, down the one chamber (the two halves are a
//     `meet` pair in scripts/fabric-lawanda.mjs -- one continuous bore, no wall between);
//   - step 292: standing in the CRYO-ELEVATOR with its door open, the mutants in the PROJCON-OFFICE outside it.
// The pairs, their offsets and their gates are data (data/glimpses.json); nothing else in the game is touched.
//
// Pure, like occlusion.js: no THREE and no DOM. It returns part specs (`cutout`s) in the viewing room's frame;
// game.js builds them and adds them to the drawn room. Only game.js calls it, so the review page and every tool that
// renders an accepted room's pictures (dashboard/preview.js) never enters this path -- the plan's structural
// no-regression guarantee. And with no listed actor in the listed neighbour, it returns [] and the page draws exactly
// what it drew before.
//
// No name plate and no pick target: the specs are not registered by buildRoom. The parser cannot act on a thing in
// another room, and a plate saying "grue" would invite a click the game must refuse (the plan's Scope calls).
//
// Occlusion is the depth the room already writes: in a painted room the fabric the paintings show goes back as
// depth-only masks (dashboard/turn.js masks, parts.js MASK_ORDER), and in a graybox the fabric is drawn for real, so a
// figure standing at his true place next door is cut by the jambs and the lintel with no new machinery. A shut door is
// the pair's `when` (the cryo-elevator's leaves), so a door closing hides them the same turn.
// Scale needs no work either: a real quad at a real distance is the right size.
//
//   table: data/glimpses.json -- { [viewRoom]: { [neighbour]: { offset, when?, actors, spots? } } }
//     offset  the neighbour's frame origin in the viewing room's frame (scripts/fabric-*.mjs ROOMS[N].at - ROOMS[R].at;
//             scripts/tests/glimpse.mjs checks it against the neighbour bay each shipped scene carries)
//     when    the scene-condition language (parts.js when): the opening is there to be seen through
//     actors  the only ids ever drawn through it
//     spots   floor points in the NEIGHBOUR's frame for actors its package does not place (the Projcon Office's
//             package places Floyd only); otherwise the neighbour package's own actors.<ID>.position
export function glimpseParts(g, { room, table, design = {}, characters = {}, eye = [0, 1.6, 0], when = () => true, visible = () => true } = {}) {
  const pairs = table?.[room];
  if (!pairs || typeof pairs !== 'object') return [];
  const out = [];
  for (const [at, entry] of Object.entries(pairs)) {
    if (!entry || !Array.isArray(entry.offset) || at === room) continue;
    const here = (entry.actors ?? []).filter(id => g.loc(id) === at);
    if (!here.length) continue;                     // the standing case: nobody next door, nothing drawn
    if (!g.lit(at)) continue;                       // a dark room shows nothing
    if (entry.when && !when(g, entry.when)) continue;
    const [ox, oy, oz] = entry.offset;
    for (const id of here) {
      if (!visible(g, id)) continue;
      const a = design?.[at]?.actors?.[id];
      const spot = entry.spots?.[id] ?? a?.position;
      if (!Array.isArray(spot)) continue;
      // The picture as buildRoom chooses it: the first variant whose condition holds, a null image meaning "no picture
      // in this state" (then nothing is drawn -- a far grey box would be worse than none).
      const base = characters?.[id];
      const variant = base?.variants?.find(v => when(g, v.when));
      const art = variant ? (variant.image === null ? undefined : { ...base, ...variant }) : base?.image ? base : undefined;
      if (!art || art.flat || art.facing != null) continue;
      const foot = !entry.spots?.[id] && a?.anchorHeight ? (spot[1] ?? 0) : 0;
      out.push({ part: 'cutout', image: art.image, at: [spot[0] + ox, foot + oy, spot[2] + oz], height: art.height, aspect: art.aspect ?? 0.5, eye, glimpse: id, from: at });
    }
  }
  return out;
}
