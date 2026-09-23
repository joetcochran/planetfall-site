// THE NARROW GLIMPSE: an actor in the next room, seen through the opening, drawn where he truly stands.
//
// The user's triage of 2026-09-23 (playtests/2026-09-23/PLAYTEST-LOG.md item 25) approved a narrow slice of
// PLAN-FLOYD-IN-A-GLIMPSE.md NOW, ahead of the rest of that plan: ONLY the four Bio Lab mutants (TRIFFID, RAT-ANT,
// TROLL, GRUE -- rules/biolab.js MUTANTS, which I-CHASE-SCENE moves together) and ONLY two openings, both from the
// final chase, where the mutants are one room behind the player:
//   - step 287: standing in BIO-LOCK-WEST, the mutants in BIO-LOCK-EAST, down the one chamber (the two halves are a
//     `meet` pair in scripts/fabric-lawanda.mjs -- one continuous bore, no wall between);
//   - step 292: standing in the CRYO-ELEVATOR with its door open, the mutants in the PROJCON-OFFICE outside it.
// Widened by the user from play, one pair and one id at a time (playtest #29 and #30, 2026-09-23):
//   - standing in BIO-LOCK-EAST, looking through BIO-DOOR-EAST (open, or through its 0.5 x 0.4 m window when shut)
//     into the BIO-LAB: the four mutants, which are there, and Floyd during his foray, whom canon has nowhere
//     (a `standIn`) -- "he just kind of disappears from next to us to oblivion right now";
//   - DEAD-FLOYD, the mangled robot, a flat decal on Bio Lock East's floor, seen from Bio Lock West.
// The pairs, their offsets and their gates are data (data/glimpses.json); nothing else in the game is touched.
//
// Pure, like occlusion.js: no THREE and no DOM. It returns part specs (`cutout`s and `decal`s) in the viewing room's frame;
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
//   table: data/glimpses.json -- { [viewRoom]: { [neighbour]: { offset, when?, actors, spots?, standIns?, gain? } } }
//     offset    the neighbour's frame origin in the viewing room's frame (scripts/fabric-*.mjs ROOMS[N].at - ROOMS[R].at;
//               scripts/tests/glimpse.mjs checks it against the neighbour bay each shipped scene carries)
//     when      the scene-condition language (parts.js when): the opening is there to be seen through
//     actors    the only ids ever drawn through it while the game has them in the neighbour: actors, or a thing with
//               a picture (DEAD-FLOYD, a FLAT decal, laid on the floor as buildRoom lays it in his own room)
//     spots     floor points in the NEIGHBOUR's frame for ids its package does not place where they are wanted here;
//               otherwise, as buildRoom places them in their own room: the package's objects.<ID>.position (while it
//               holds -- anchorUntilHandled), then its actors.<ID>.position
//     standIns  { ID: [{ when, spot }, ...] } (the first that holds): someone canon has NOWHERE -- REMOVEd -- while the story has him in the
//               neighbour. Floyd's foray: BIO-DOOR-EAST-F removes him as he plunges into the Bio Lab and I-FLOYD-FORAY
//               puts him back on its fourth turn (rules/biolab.js). Drawn only while `when` holds AND the game has
//               him nowhere, so he can never be drawn twice; the moment canon places him anywhere, he is its.
//     gain      [{ when, value }]: the first that holds dims the neighbour's figures (the Bio Lab with its lights off)
//     seals     [{ at, size, when? }]: depth-only boxes in the VIEWING room's frame, emitted (as `mask` props, parts.js
//               MASK_MATERIAL) only alongside this pair's figures: a crack in the fabric the painting does not have.
//               BIO-DOOR-EAST's two leaves meet 1 cm apart (z -0.0045 to +0.0055 in Bio Lock East's scene), and a figure
//               behind the shut door showed through that seam as a vertical sliver below and above the window.
export function glimpseParts(g, { room, table, design = {}, characters = {}, eye = [0, 1.6, 0], when = () => true, visible = () => true } = {}) {
  const pairs = table?.[room];
  if (!pairs || typeof pairs !== 'object') return [];
  const out = [];
  for (const [at, entry] of Object.entries(pairs)) {
    if (!entry || !Array.isArray(entry.offset) || at === room) continue;
    const here = (entry.actors ?? []).filter(id => g.loc(id) === at);
    const standIns = Object.entries(entry.standIns ?? {}).map(([id, s]) => [id, g.loc(id) == null ? [s].flat().find(x => x?.when && Array.isArray(x.spot) && when(g, x.when)) : null]).filter(([, s]) => s);
    if (!here.length && !standIns.length) continue; // the standing case: nobody next door, nothing drawn
    if (!g.lit(at)) continue;                       // a dark room shows nothing
    if (entry.when && !when(g, entry.when)) continue;
    const [ox, oy, oz] = entry.offset;
    const gain = (entry.gain ?? []).find(x => when(g, x.when))?.value;
    const placeOf = id => {
      if (entry.spots?.[id]) return { spot: entry.spots[id], own: false };
      const o = design?.[at]?.objects?.[id];
      if (Array.isArray(o?.position) && !(o.anchorUntilHandled !== false && g.fsetP(id, 'TOUCHBIT'))) return { spot: o.position, own: true };
      const a = design?.[at]?.actors?.[id];
      return Array.isArray(a?.position) ? { spot: a.position, own: false, foot: a.anchorHeight ? (a.position[1] ?? 0) : 0 } : null;
    };
    const first = out.length;
    const draw = [...here.map(id => [id, placeOf(id)]), ...standIns.map(([id, s]) => [id, { spot: s.spot, own: false }])];
    for (const [id, place] of draw) {
      if (!place || !visible(g, id)) continue;
      // The picture as buildRoom chooses it: the first variant whose condition holds, a null image meaning "no picture
      // in this state" (then nothing is drawn -- a far grey box would be worse than none).
      const base = characters?.[id];
      const variant = base?.variants?.find(v => when(g, v.when));
      const art = variant ? (variant.image === null ? undefined : { ...base, ...variant }) : base?.image ? base : undefined;
      if (!art || art.facing != null) continue;
      const [sx, sy = 0, sz] = place.spot;
      if (art.flat) {
        // A FLAT thing lies on the floor as a decal, exactly as buildRoom lays it: at its own place, its picture's
        // top edge north, height x aspect by height, a few millimetres up (graybox.js, the DR-099 rule).
        const [w, d] = [art.height * (art.aspect ?? 1), art.height];
        const y = place.own ? Math.max(0.005, sy - 0.01 + 0.004) : 0.005;
        out.push({ part: 'decal', image: art.image, at: [sx + ox, y + oy, sz + oz], size: [w, d], glimpse: id, from: at });
        continue;
      }
      const foot = place.own ? Math.max(0, sy - (art.height ?? 0) / 2) : (place.foot ?? 0);
      out.push({ part: 'cutout', image: art.image, at: [sx + ox, foot + oy, sz + oz], height: art.height, aspect: art.aspect ?? 0.5, eye, ...(gain != null ? { gain } : {}), glimpse: id, from: at });
    }
    if (out.length > first) for (const k of entry.seals ?? []) out.push({ part: 'prop', at: k.at, size: k.size, ...(k.when ? { when: k.when } : {}), mask: true, seal: true, from: at });
  }
  return out;
}
