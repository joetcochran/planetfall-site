// Grid layout for the world map.
//
// Rooms are assigned integer grid cells [east, north, up] from the declared exit
// directions in world.json: NORTH/SOUTH/EAST/WEST move one cell on the ground
// plane, NE/NW/SE/SW move diagonally, UP/DOWN move one level. Placement order
// per region is compass first, then diagonal, then vertical, then IN/OUT (which
// carries no direction and only gets a free neighbouring cell). Exits whose
// drawn vector does not match their declared direction are reported as
// "misfits" and are drawn slanted rather than forced onto the grid.
//
// Regions (groups of rooms joined only by routine exits such as elevators and
// the shuttle) have no relative position in the source, so each region's seed
// room is anchored by a hand-chosen cell in data/layout.json. Anchors and
// overrides are rendering choices, not game facts.
//
// This module has no DOM or Three.js dependency so scripts/check_layout.mjs can
// run it under Node.

export const VECTORS = {
  NORTH: [0, 1, 0], SOUTH: [0, -1, 0], EAST: [1, 0, 0], WEST: [-1, 0, 0],
  NE: [1, 1, 0], NW: [-1, 1, 0], SE: [1, -1, 0], SW: [-1, -1, 0],
  UP: [0, 0, 1], DOWN: [0, 0, -1],
};
const PRIORITY = {
  NORTH: 0, SOUTH: 0, EAST: 0, WEST: 0,
  NE: 1, NW: 1, SE: 1, SW: 1,
  UP: 2, DOWN: 2,
  IN: 3, OUT: 3,
};
// Search order for a free cell next to a placed room when the link has no direction.
const NEIGHBOURS = [VECTORS.EAST, VECTORS.WEST, VECTORS.NORTH, VECTORS.SOUTH, VECTORS.NE, VECTORS.NW, VECTORS.SE, VECTORS.SW, VECTORS.UP, VECTORS.DOWN];

const key = c => c.join(',');
const add = (c, v, sign = 1) => [c[0] + sign * v[0], c[1] + sign * v[1], c[2] + sign * v[2]];

export function computeLayout(world, layout) {
  const rooms = world.rooms;
  const byId = new Map(rooms.map(r => [r.id, r]));
  const order = new Map(rooms.map((r, i) => [r.id, i]));
  // Every exit with a destination other than the room itself, in source order.
  const edges = rooms.flatMap(r => r.exits
    .filter(e => e.target && e.target !== r.id && PRIORITY[e.direction] !== undefined)
    .map(e => ({ a: r.id, d: e.direction, b: e.target, kind: e.kind })));

  const cells = new Map();       // room id -> [east, north, up]
  const occupied = new Map();    // cell key -> room id
  const regionOf = new Map();    // room id -> region id
  const notes = [];              // human-readable placement decisions worth reviewing

  const isFree = c => !occupied.has(key(c));
  const freeNeighbour = c => NEIGHBOURS.map(v => add(c, v)).find(isFree) ?? null;
  function put(id, cell, region) {
    cells.set(id, cell); occupied.set(key(cell), id); regionOf.set(id, region);
  }

  for (const region of layout.regions) {
    if (!byId.has(region.seed)) { notes.push(`Region "${region.id}": seed ${region.seed} is not a room; skipped.`); continue; }
    if (cells.has(region.seed)) { notes.push(`Region "${region.id}": seed ${region.seed} was already placed by another region; skipped.`); continue; }
    const anchor = region.anchor ?? [0, 0, 0];
    if (!isFree(anchor)) notes.push(`Region "${region.id}": anchor ${key(anchor)} is already occupied by ${occupied.get(key(anchor))}.`);
    put(region.seed, anchor, region.id);

    // Repeatedly take the best offer (lowest priority number) from any placed room to an unplaced one.
    for (;;) {
      const offers = [];
      for (const { a, d, b } of edges) {
        const v = VECTORS[d];
        if (cells.has(a) && !cells.has(b)) offers.push({ p: PRIORITY[d], room: b, via: a, d, cell: v ? add(cells.get(a), v) : null });
        if (cells.has(b) && !cells.has(a)) offers.push({ p: PRIORITY[d], room: a, via: b, d, cell: v ? add(cells.get(b), v, -1) : null });
      }
      if (!offers.length) break;
      offers.sort((x, y) => x.p - y.p || order.get(x.room) - order.get(y.room));
      let chosen = offers.find(o => o.cell && isFree(o.cell));
      if (!chosen) {
        // No directed offer fits: either the link is IN/OUT, or every directed cell is taken.
        const o = offers[0];
        const cell = freeNeighbour(cells.get(o.via));
        if (!cell) { notes.push(`Region "${region.id}": no free cell near ${o.via} for ${o.room}.`); break; }
        notes.push(o.cell
          ? `${o.room}: cell ${key(o.cell)} (${o.d} of ${o.via}) is taken by ${occupied.get(key(o.cell))}; placed at ${key(cell)} instead.`
          : `${o.room}: linked to ${o.via} only by ${o.d}; placed in the nearest free cell ${key(cell)}.`);
        chosen = { ...o, cell };
      }
      put(chosen.room, chosen.cell, region.id);
    }
  }

  // Rooms no region reached (no directional or IN/OUT link to any seed) are parked in a row so they stay visible.
  const unplaced = rooms.map(r => r.id).filter(id => !cells.has(id));
  let park = layout.parking ?? [0, -20, 0];
  for (const id of unplaced) {
    while (!isFree(park)) park = add(park, VECTORS.EAST);
    put(id, park, 'unplaced');
    notes.push(`${id}: not reachable from any region seed; parked at ${key(park)}.`);
    park = add(park, [2, 0, 0]);
  }

  // Manual overrides win over everything above.
  for (const [id, cell] of Object.entries(layout.overrides ?? {})) {
    if (!byId.has(id)) { notes.push(`Override for unknown room ${id} ignored.`); continue; }
    occupied.delete(key(cells.get(id)));
    if (!isFree(cell)) notes.push(`Override ${id} -> ${key(cell)} overlaps ${occupied.get(key(cell))}.`);
    put(id, cell, regionOf.get(id));
  }

  // Exits whose drawn vector is not the declared direction.
  const misfits = edges.filter(({ a, d, b }) => {
    const v = VECTORS[d]; if (!v) return false;
    const actual = add(cells.get(b), cells.get(a), -1);
    return key(actual) !== key(v);
  });

  return { cells, regionOf, misfits, notes, unplaced, edges };
}

// Grid cell -> Three.js-style coordinates: east on +X, up on +Y, north on -Z
// (so north points away from the camera in the default overview).
export function toWorld(cell, spacing) {
  return [cell[0] * spacing.east, cell[2] * spacing.up, -cell[1] * spacing.north];
}
