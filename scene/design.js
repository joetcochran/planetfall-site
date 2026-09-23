// The room design metadata (RoomPolishInstructions/<package>/<ROOM>.metadata.json, served whole by Program.cs at
// design/rooms.json) folded under a room's scene override file (data/scenes/<ROOM>.json), which wins key by key.
// DR-045. What the graybox takes from the metadata:
//   - always: droppedItems.anchors (floor points for loose things, in order), actors.FLOYD.position, and the `size` of
//     a global's or scenery word's pick proxy. These are small offsets from the eye, safe in the default 8 x 8 m box.
//   - only when the metadata gives the room a `size`: size, eye, exit positions (and, for an exit the file lists with
//     no position, that there is nothing to draw there), and global / scenery-word positions
//     and walls. Without a size the metadata's coordinates assume the README's footprint (a 12 m lobby, a 24 m dorm),
//     which the default box does not have, so they would land outside its walls.
// Pure: no DOM, no fetch (scripts/tests/design.mjs).
export function designOverrides(scene = {}, meta = null) {
  if (!meta) return scene;
  const out = { ...scene };
  const framed = Array.isArray(meta.size);
  if (framed) { out.size ??= meta.size; if (meta.eye) out.eye ??= meta.eye; }
  if (framed && meta.exits) {
    // A framed room's exits are positioned; one the file lists without a position has nothing to draw there (Upper
    // Elevator's UP and DOWN are blocked with no hatch or shaft), so it is marked `draw: false` (DR-046).
    out.exits = { ...scene.exits };
    // The opening's height comes with its position: graybox hangs the exit's name plate in the upper part of it.
    // `labelOffset` comes through whether or not the exit has a position, the same as an object's or a global's: it
    // moves the plate off what matters in the view, and the plate is hung by the rule above whatever the exit says.
    for (const [dir, e] of Object.entries(meta.exits)) out.exits[dir] = { ...(e.position ? { position: e.position, ...(e.height ? { height: e.height } : {}) } : { draw: false }), ...(e.labelOffset != null ? { labelOffset: e.labelOffset } : {}), ...scene.exits?.[dir] };
  }
  for (const key of ['globals', 'pseudos']) {
    if (!meta[key]) continue;
    out[key] = { ...scene[key] };
    for (const [id, m] of Object.entries(meta[key])) {
      const take = {};
      if (m.size) take.size = m.size;
      if (framed && m.position) take.position = m.position;
      if (framed && m.wall) take.wall = m.wall;
      // Same as an object's: the plaque's name plate moved up or down in metres. CONTROLS is a global here, and in
      // the Escape Pod its plate sat over the porthole (the user, 2026-09-16). It needs no position to be moved.
      if (framed && m.labelOffset != null) take.labelOffset = m.labelOffset;
      // The states it is there in, as a condition (`when`): Lawanda's "shuttle car" is on Betty's flank, and goes
      // when she does, as her fabric does.
      if (m.when) take.when = m.when;
      if (Object.keys(take).length) out[key][id] = { ...take, ...scene[key]?.[id] };
    }
  }
  // A package that authors its own lighting (DR-092) carries it through; graybox swaps the scene file's guessed
  // `light` parts for these rather than drawing both.
  if (meta.lighting) out.lighting = meta.lighting;
  if (meta.droppedItems?.anchors?.length && !scene.droppedItems) out.droppedItems = { anchors: meta.droppedItems.anchors };
  // Every actor the package places, not only Floyd. This line used to name FLOYD, which meant the graybox's own
  // loop over authored actors (which is general) never saw anyone else: a package could author the ambassador's
  // spot and nothing would happen, silently. Position and size both, since size is what the solver clears around,
  // and anchorHeight, the opt-in that stands an actor at position's own y (ESCALATOR's Floyd on his tread).
  for (const [id, a] of Object.entries(meta.actors ?? {})) {
    if (!a?.position || scene.actors?.[id]) continue;
    out.actors = { ...out.actors, [id]: { position: a.position, ...(a.size ? { size: a.size } : {}), ...(a.anchorHeight ? { anchorHeight: true } : {}) } };
  }
  // What an actor is drawn carrying (`drawnWith`, the ambassador's celery) is the package's to say, since it is a
  // fact about the artwork. The scene file's own entry for the same object still wins.
  for (const [id, o] of Object.entries(meta.objects ?? {})) {
    if (!o?.drawnWith || scene.objects?.[id]?.drawnWith) continue;
    out.objects = { ...out.objects, [id]: { ...scene.objects?.[id], ...out.objects?.[id], drawnWith: o.drawnWith } };
  }
  // Where the package puts a thing, in a framed room: the padlock on the Storage West door's hasp, the canteen on
  // its bench. These never reached the build, so every one of them fell through to the drop fan or the ring round
  // the eye -- the Mess Corridor's padlock lay on the floor beside you, nowhere near its door (2026-09-14). The
  // place holds only until the thing is first handled (`untilTouched`; the schema's anchorUntilHandled): once taken,
  // it is a loose thing wherever it is put down. A position the scene file gives still wins.
  for (const [id, o] of Object.entries(meta.objects ?? {})) {
    if (!framed || !o?.position || scene.objects?.[id]?.position) continue;
    out.objects = { ...out.objects, [id]: { ...scene.objects?.[id], ...out.objects?.[id], position: o.position, ...(o.size ? { size: o.size } : {}), ...(o.painted !== undefined ? { painted: o.painted } : {}), ...(o.paintedWhen ? { paintedWhen: o.paintedWhen } : {}), untilTouched: o.anchorUntilHandled !== false } };
  }
  // `labelOffset` moves a thing's name plate up or down, in metres, from where it would otherwise sit. It comes
  // through on its own, without a position, because the thing may have no authored place: CONTROLS is a local-global
  // that every pod, booth and elevator shares, and the Escape Pod needs its plate lower without claiming to say
  // where the console stands. The plate goes ABOVE the box by default, which is wrong wherever the player needs
  // what is directly above -- the porthole the pod's whole launch plays out in sits over its controls, and the key
  // lies in the Admin Corridor's crevice (the user, 2026-09-16, both rooms on the same day).
  for (const [id, o] of Object.entries(meta.objects ?? {})) {
    if (!framed || o?.labelOffset == null) continue;
    out.objects = { ...out.objects, [id]: { ...scene.objects?.[id], ...out.objects?.[id], labelOffset: o.labelOffset } };
  }
  // A large object the package paints into the room (`largeObjects`: the extended ladder lying across the rift) is
  // part of the painting, not a thing standing in front of it. Its place comes through, marked `painted`, so graybox
  // keeps it as a pick target there and draws no box over the picture -- the ladder, moved into the Admin Corridor
  // rooms by the rules, was a loose grey box on the first drop anchor (2026-09-15). A place the scene file or
  // `objects` gives still wins.
  for (const [id, o] of Object.entries(meta.largeObjects ?? {})) {
    if (!framed || !Array.isArray(o?.position) || scene.objects?.[id]?.position || out.objects?.[id]?.position) continue;
    // Three ways to say it, because `largeObjects` is also used for "something big lies here" and not only for "the
    // picture already draws this". Default: the picture has it in every view, which is what a fixture wants.
    // `paintedWhen: "<condition>"`: only in that state, evaluated by graybox -- the ladder, painted across the rift.
    // `painted: false`: never, so the box always draws, while the entry still supplies the place the thing lies.
    out.objects = { ...out.objects, [id]: { ...scene.objects?.[id], ...out.objects?.[id], position: o.position, ...(o.size ? { size: o.size } : {}), ...(o.paintedWhen ? { paintedWhen: o.paintedWhen } : {}), untilTouched: false, painted: o.painted !== false } };
  }
  // And where a container shows what is in it (`contentsAt`): the Kitchen dispenser's niche, where the canteen
  // stands while it is being filled.
  for (const [id, o] of Object.entries(meta.objects ?? {})) {
    if (!framed || !Array.isArray(o?.contentsAt) || scene.objects?.[id]?.contentsAt) continue;
    out.objects = { ...out.objects, [id]: { ...scene.objects?.[id], ...out.objects?.[id], contentsAt: o.contentsAt } };
  }
  // Flat things lying on the room's surfaces -- the ambassador's slime -- as the package places them. Each becomes
  // a scene part appended after the scene file's own, so it composes over whatever the room draws: a PATCH has a
  // centre and a footprint, a STRIP runs along a path of floor points at a stated width. Where the art is not
  // delivered yet the part still draws as a flat colour, so a placement can be reviewed before its picture exists.
  const decals = Object.entries(meta.decals ?? {}).flatMap(([id, d]) => decalParts(id, d));
  // And what the engine draws over the paintings because no painting can (`overlays`): the shuttle's lever off its
  // painted centre, its display reading the speed, the tunnel going by in its window. Each is a part as the kit knows
  // it, marked `overlay` so a whole turn keeps it whatever painted state the views are in (turn.js partsForTurn).
  const overlays = Object.entries(meta.overlays ?? {}).map(([id, o]) => overlayPart(id, o));
  if (decals.length || overlays.length) out.parts = [...(scene.parts ?? []), ...decals, ...overlays];
  return out;
}

// One metadata overlay as a scene part: `condition` is the schema's word for `when`, and `notes` is for people.
export function overlayPart(id, o = {}) {
  const { condition, notes, ...rest } = o;
  return { ...rest, id, ...(condition ? { when: condition } : {}), overlay: true };
}

// A package names its images by file ("reference/SLIME-POOL.png"), relative to itself; design/packages.json lists
// every file in every package with the URL it is served at, so the name is matched there. A path that is already a
// site path -- a scene file's own image under assets/ -- matches nothing in the package and passes through unchanged.
// Every page that builds a room needs this, or a delivered decal shows on the review page and stays a green
// placeholder in the game.
export function packageImage(packages, room, path) {
  const name = String(path).split('/').pop();
  return (packages?.[room]?.files ?? []).find(f => f.name === name)?.url ?? path;
}

// One metadata decal as scene parts: a patch is one part, a strip is one part per segment of its path.
export function decalParts(id, d = {}) {
  // `condition` is the schema's word, the same as a state's; a scene part calls it `when`.
  const common = { id, when: d.condition ?? d.when, image: d.image, color: d.color, opacity: d.opacity };
  const y = d.lift ?? 0.02;
  if (Array.isArray(d.path) && d.path.length >= 2) {
    const out = [];
    for (let i = 0; i + 1 < d.path.length; i++) {
      const [ax, az] = d.path[i], [bx, bz] = d.path[i + 1];
      out.push({ part: 'trail', ...common, from: [ax, y, az], to: [bx, y, bz], width: d.width ?? 0.35, tile: d.tile, wrap: d.wrap });
    }
    return out;
  }
  if (Array.isArray(d.at)) {
    const [x, z] = d.at.length === 3 ? [d.at[0], d.at[2]] : d.at;
    return [{ part: 'decal', ...common, at: [x, y, z], size: d.size ?? [0.6, 0.6], rot: d.rot ?? 0 }];
  }
  return [];
}
