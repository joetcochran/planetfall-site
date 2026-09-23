// Whether a fabric part can be seen from the eye, for the parts drawn over a painting (dashboard/turn.js partsForTurn).
//
// Over a complete painted turn the fabric is not drawn: the paintings are the room, and nothing but the additions --
// the conditional parts no painting branches on -- stands in front of them. Nothing writes depth for the walls the
// paintings show, so an addition behind a wall is drawn over the picture of that wall. The Bio Lab's four ceiling
// lamps are in the Bio Locks' scenes (what their door and window look into), lit while LAB-LIGHTS-ON; with the lab
// lights switched on they came out as white slivers across the locks' walls and shut door (2026-09-18). Depth cannot
// fix it: a painting takes part in depth so that a figure in the room hides it, and the walls it shows are two metres
// off while it hangs twelve out, so walls written into depth would hide the painting itself.
//
// So it is decided from the geometry, once per room: a segment from the eye to points of the part (its centre and
// corners), against the fabric the paintings show -- shell and bay walls with their openings, floors, ceilings and solid
// props. A part a wall hides entirely is not drawn. One that only CONDITIONAL fabric hides -- a door's shut leaves -- is
// drawn only while that fabric is absent: its condition gains `and not (<leaves' when>)`, the same `when` language, so
// it switches with the game like everything else. One with any point in plain view is drawn as it always was.
// Pure, no THREE, so it runs in node and is tested there (scripts/tests/occlusion.mjs).

const FACE = {                       // wall, the axis it stands across, its side, and the axis and sign its opening's `across` runs along
  NORTH: { axis: 2, sign: -1, along: 0, alongSign: 1 },
  SOUTH: { axis: 2, sign: 1, along: 0, alongSign: -1 },
  EAST: { axis: 0, sign: 1, along: 2, alongSign: 1 },
  WEST: { axis: 0, sign: -1, along: 2, alongSign: -1 },
};

// Into and out of a part's own frame: `rot` turns it about y as three.js does (rotation.y), about `at`.
export const toLocal = (p, at, rot) => {
  const x = p[0] - at[0], y = p[1] - at[1], z = p[2] - at[2];
  if (!rot) return [x, y, z];
  const c = Math.cos(rot), s = Math.sin(rot);
  return [x * c - z * s, y, x * s + z * c];
};

// The solid boxes a part is built from, in its own frame, each with the hole cut through it (or null).
export function solids(p) {
  if (p.part === 'prop') {
    if (!p.size) return [];
    const h = p.size.map(v => v / 2);
    return [{ min: [-h[0], -h[1], -h[2]], max: h, hole: null }];
  }
  if (p.part !== 'shell' && p.part !== 'bay') return [];
  const [w, h, d] = p.size ?? (p.part === 'shell' ? [8, 3, 8] : [2, 2.3, 1]);
  const t = p.thickness ?? (p.part === 'shell' ? 0.1 : 0.08);
  const out = [{ min: [-w / 2, -t, -d / 2], max: [w / 2, 0, d / 2], hole: null }];
  if (p.ceiling !== null) out.push({ min: [-w / 2, h, -d / 2], max: [w / 2, h + t, d / 2], hole: null });
  for (const [dir, f] of Object.entries(FACE)) {
    if (p.part === 'bay' && dir === (p.open ?? 'SOUTH')) continue;
    const half = f.axis === 2 ? d / 2 : w / 2, len = f.axis === 2 ? w : d;
    const min = [0, 0, 0], max = [0, h, 0];
    min[f.axis] = f.sign < 0 ? -(half + t) : half; max[f.axis] = f.sign < 0 ? -half : half + t;
    min[f.along] = -len / 2; max[f.along] = len / 2;
    const o = p.openings?.[dir];
    const hole = o ? { along: f.along, c: f.alongSign * o[0], hw: o[2] / 2, y0: o[1] - o[3] / 2, y1: o[1] + o[3] / 2 } : null;
    out.push({ min, max, hole });
  }
  return out;
}

// Where a segment o + s * (q - o), s in [0, 1], is inside a box: [s0, s1] or null.
function slab(o, q, min, max) {
  let s0 = 0, s1 = 1;
  for (let a = 0; a < 3; a++) {
    const d = q[a] - o[a];
    if (Math.abs(d) < 1e-12) { if (o[a] < min[a] || o[a] > max[a]) return null; continue; }
    let u = (min[a] - o[a]) / d, v = (max[a] - o[a]) / d;
    if (u > v) [u, v] = [v, u];
    s0 = Math.max(s0, u); s1 = Math.min(s1, v);
    if (s0 > s1) return null;
  }
  return [s0, s1];
}
const inside = (p, min, max, tol) => p.every((v, a) => v >= min[a] - tol && v <= max[a] + tol);

// Does part `b` stand between the eye and point q? Not if q is in or on it (a part is not hidden by what it rests in).
export function blocks(b, eye, q) {
  const at = b.at ?? [0, 0, 0], o = toLocal(eye, at, b.rot), e = toLocal(q, at, b.rot);
  const len = Math.hypot(q[0] - eye[0], q[1] - eye[1], q[2] - eye[2]), end = 1 - 0.02 / Math.max(len, 1e-6);
  for (const s of solids(b)) {
    if (inside(e, s.min, s.max, 0.02)) continue;
    const r = slab(o, e, s.min, s.max);
    if (!r || r[0] >= end || r[1] <= 1e-6) continue;
    if (s.hole) {
      const m = (r[0] + r[1]) / 2, p = o.map((v, a) => v + (e[a] - v) * m);
      if (Math.abs(p[s.hole.along] - s.hole.c) <= s.hole.hw && p[1] >= s.hole.y0 && p[1] <= s.hole.y1) continue;
    }
    return true;
  }
  return false;
}

// The points of a part tested: a grid on each face of its box, at most half a metre apart, corners included. A point
// on the part's own surface may lie on the wall it is set against, and `blocks` does not count a wall a point is on.
// Parts longer than MAX_EXTENT are not judged (null): a platform edge sixteen metres long seen through a car door is
// visible along a stretch no grid this coarse would find, and such a part is fabric-sized, not a lamp or a readout.
export const MAX_EXTENT = 3;
export function samplePoints(p) {
  const size = p.size ?? [0, 0, 0];
  if (Math.max(...size) > MAX_EXTENT) return null;
  const at = p.at ?? [0, 0, 0], h = size.map(v => v / 2), n = size.map(v => Math.max(1, Math.ceil(v / 0.5)));
  const pts = [[0, 0, 0]], seenKey = new Set();
  const grid = a => Array.from({ length: n[a] + 1 }, (_, i) => -h[a] + (2 * h[a] * i) / n[a]);
  for (let a = 0; a < 3; a++) for (const side of [-h[a], h[a]]) {
    const [b, c] = [0, 1, 2].filter(x => x !== a);
    for (const u of grid(b)) for (const v of grid(c)) {
      const q = [0, 0, 0]; q[a] = side; q[b] = u; q[c] = v;
      const k = q.map(x => x.toFixed(4)).join(); if (seenKey.has(k)) continue; seenKey.add(k); pts.push(q);
    }
  }
  const cs = Math.cos(p.rot ?? 0), sn = Math.sin(p.rot ?? 0);
  return pts.map(([x, y, z]) => [at[0] + x * cs + z * sn, at[1] + y, at[2] - x * sn + z * cs]);
}

// Which parts are fabric that can stand in the way: the room's shell and bays, and its solid props.
export const isOccluder = p => p && !p.overlay && (p.part === 'shell' || p.part === 'bay' || (p.part === 'prop' && p.size));

// The condition an addition is drawn on, seen from `eye` past `fabric` (the parts the paintings show: not the other
// additions, which are drawn and hide each other by depth like anything else). Each point of it is hidden by the fabric
// in the way, or by nothing. It is drawn as it was if any point is in plain view; not at all if a wall hides every
// point; and otherwise only while, for some point, the conditional fabric hiding it -- a door's leaves -- is absent:
// `(own) and (not (leaf) or ...)`. A part seen only in part still draws whole, as it always has: this is for parts
// wholly behind a wall, not for the edge of one that a jamb cuts. Parts with no `at` and `size` are left as they are.
export function visibleWhen(part, fabric, eye) {
  if (!part?.at || !part?.size) return part?.when ?? null;
  const pts = samplePoints(part);
  if (!pts) return part.when ?? null;
  const occ = fabric.filter(b => b !== part && isOccluder(b));
  const clear = [];
  for (const q of pts) {
    const by = occ.filter(b => blocks(b, eye, q));
    if (!by.length) return part.when ?? null;
    if (by.some(b => !b.when)) continue;
    clear.push([...new Set(by.map(b => String(b.when).trim()))].map(c => `not (${c})`).join(' and '));
  }
  if (!clear.length) return null;
  const any = [...new Set(clear)];
  const vis = any.length === 1 ? any[0] : any.map(c => `(${c})`).join(' or ');
  return part.when ? `(${part.when}) and (${vis})` : vis;
}
