// The parts kit (DR-063): a room's fabric described as data instead of programmed.
//
// The graybox draws what a room *does* -- its exits, doors, objects and scenery words, all pickable, all driven by
// game state. This draws what a room *is*: the shell, the openings cut through it, the stair, the pipe runs, the
// panels, the dressing. A room lists parts in data/scenes/<ROOM>.json and nothing here is bespoke to any room, so
// adding a room is a block of JSON rather than a module of geometry.
//
// Three rules keep it honest:
//   1. Parts are scenery. Nothing built here is registered as pickable, so decoration can never sit in front of a
//      door and swallow the click (DECK-NINE's README asks for exactly this, and DR-053 item 2 is what it looks
//      like when it goes wrong). The functional layer draws its own pickable meshes over the top.
//   2. Parts are conditional. Every part may carry a `when`, in the same little language the design packages
//      already write their `states.<NAME>.condition` in, so a room changes with the game rather than being a
//      photograph of one moment.
//   3. Parts are pure. No DOM and no fetch, so scripts/tests/parts.mjs exercises the whole kit in node. That is
//      also why labels live in graybox.js and not here: they need a canvas.
import * as THREE from 'three';
import { material, PALETTE } from './materials.js';
import { graded } from './grade.js';

// ---- the `when` language -------------------------------------------------------------------------------------
// Deliberately tiny, and deliberately the same words the metadata files already use:
//   "POD-DOOR has OPENBIT"            a flag is set
//   "POD-DOOR without OPENBIT"        it is not
//   "sceneObjects contains BLATHER"   the thing is in this room
//   "AMBASSADOR-LEAVE > 0"            a global compares (> < >= <= == !=)
//   "A and B", "A or B", "not A"      joined, `or` binding loosest
// Anything it cannot parse is false, and says so through `whenError`, so a typo hides the part rather than
// throwing in the middle of a render.
export const whenError = [];
const num = s => (/^-?\d+(\.\d+)?$/.test(s) ? Number(s) : null);

// The leaf conditions inside a `when`, without evaluating any of them. This is what lets a review page offer the
// room's own switches: the things a room's scene file branches on ARE the things worth toggling in front of a
// reviewer, and deriving them from the conditions means no room needs a hand-written list that can fall behind.
// Returns [{ kind: 'flag', id, flag } | { kind: 'object', id } | { kind: 'inside', id, container } | { kind: 'global', id, op, value }].
export function atoms(expr, out = []) {
  if (expr == null || expr === '') return out;
  const s = String(expr).trim();
  const top = split(s, ' or ');
  if (top.length > 1) { for (const p of top) atoms(p, out); return out; }
  const all = split(s, ' and ');
  if (all.length > 1) { for (const p of all) atoms(p, out); return out; }
  if (/^not /i.test(s)) return atoms(s.slice(4), out);
  if (s.startsWith('(') && s.endsWith(')')) return atoms(s.slice(1, -1), out);

  const add = a => { if (!out.some(b => b.key === a.key)) out.push(a); return out; };
  let m = /^([A-Z0-9-]+)\s+(?:has|without)\s+([A-Z]+)$/i.exec(s);
  if (m) return add({ kind: 'flag', id: m[1], flag: m[2].toUpperCase(), key: `flag:${m[1]}:${m[2].toUpperCase()}` });
  m = /^sceneObjects\s+contains\s+([A-Z0-9-]+)$/i.exec(s);
  if (m) return add({ kind: 'object', id: m[1], key: `obj:${m[1]}` });
  m = /^([A-Z0-9-]+)\s+in\s+([A-Z0-9-]+)$/i.exec(s);
  if (m) return add({ kind: 'inside', id: m[1], container: m[2], key: `in:${m[1]}:${m[2]}` });
  m = /^([A-Z0-9-]+)\s*(>=|<=|===|==|!=|>|<)\s*(\S+)$/.exec(s);
  if (m) return add({ kind: 'global', id: m[1], op: m[2], value: m[3], key: `glob:${m[1]}` });
  return out;
}

export function when(g, expr) {
  if (expr == null || expr === '') return true;
  const s = String(expr).trim();
  const top = split(s, ' or ');
  if (top.length > 1) return top.some(p => when(g, p));
  const all = split(s, ' and ');
  if (all.length > 1) return all.every(p => when(g, p));
  if (/^not /i.test(s)) return !when(g, s.slice(4));
  if (s.startsWith('(') && s.endsWith(')')) return when(g, s.slice(1, -1));

  let m = /^([A-Z0-9-]+)\s+has\s+([A-Z]+)$/i.exec(s);
  if (m) return !!g.fsetP(m[1], m[2].toUpperCase());
  m = /^([A-Z0-9-]+)\s+without\s+([A-Z]+)$/i.exec(s);
  if (m) return !g.fsetP(m[1], m[2].toUpperCase());
  m = /^sceneObjects\s+contains\s+([A-Z0-9-]+)$/i.exec(s);
  if (m) return !!g.isIn(m[1], g.state.here);
  // Containment, for a state that is about where a thing is rather than a flag on it: the good board still hidden
  // in the robot's access hole, a bedistor seated in the course-control cube (ARTWORK-BRIEF.md, conditional states).
  m = /^([A-Z0-9-]+)\s+in\s+([A-Z0-9-]+)$/i.exec(s);
  if (m) return !!g.isIn(m[1], m[2]);
  m = /^([A-Z0-9-]+)\s*(>=|<=|===|==|!=|>|<)\s*(\S+)$/.exec(s);
  if (m) {
    const left = g.getg(m[1]);
    const right = num(m[3]) ?? (m[3] === 'true' ? true : m[3] === 'false' ? false : m[3]);
    switch (m[2]) {
      case '>': return left > right;
      case '<': return left < right;
      case '>=': return left >= right;
      case '<=': return left <= right;
      case '!=': return left != right;                              // eslint-disable-line eqeqeq
      default: return left == right;                                // eslint-disable-line eqeqeq
    }
  }
  if (!whenError.includes(s)) whenError.push(s);
  return false;
}
// Split on a joiner, respecting brackets, so "(a and b) or c" survives.
function split(s, joiner) {
  const out = []; let depth = 0, last = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') depth++;
    else if (s[i] === ')') depth--;
    else if (depth === 0 && s.slice(i, i + joiner.length).toLowerCase() === joiner) {
      out.push(s.slice(last, i)); i += joiner.length - 1; last = i + 1;
    }
  }
  out.push(s.slice(last));
  return out.map(x => x.trim()).filter(Boolean);
}

// ---- helpers -------------------------------------------------------------------------------------------------
const V = a => new THREE.Vector3(...(a ?? [0, 0, 0]));
const slab = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(Math.max(w, 0.001), Math.max(h, 0.001), Math.max(d, 0.001)), material(mat));
const place = (mesh, at, rotY = 0) => { mesh.position.copy(V(at)); mesh.rotation.y = rotY; return mesh; };
// A wall lies in a plane; these say which way is "across" it and which way it faces.
const FACING = { NORTH: 0, SOUTH: Math.PI, EAST: -Math.PI / 2, WEST: Math.PI / 2 };

// Where a plate's corners are, from the camera it claims to have been drawn with. Exported because the dashboard's
// calibrator fits these numbers against the room, and a second copy of this arithmetic would drift from this one.
//
// A delivered comp is not a measured projection -- it is an image composed to read well, whose true bearing and
// lens are whatever they turn out to be (DR-093). So these values start as the package's stated intent and are
// then fitted by eye against the room's own geometry, which is why this has to be cheap to recompute.
export function plateFrame(s = {}) {
  const distance = s.distance ?? 12;
  const hfov = (s.hfov ?? 70) * Math.PI / 180;
  // A comp is a perspective render, so the surface that reproduces it exactly is the flat plane it was projected
  // onto -- not a curved patch, which stretches the edges. Width is what the lens subtends at this distance;
  // height follows the image's own aspect, so nothing is squashed.
  const width = 2 * distance * Math.tan(hfov / 2);
  return {
    width,
    height: width / (s.aspect ?? 16 / 9),
    distance,
    bearing: (s.bearing ?? 0) * Math.PI / 180,
    pitch: (s.pitch ?? 0) * Math.PI / 180,
  };
}

// Stand a plate off along its bearing and turn it to face the eye. Bearing is clockwise from north, north is -z.
export function aimPlate(mesh, f) {
  // Stand it off ALONG THE VIEW DIRECTION, not at a horizontal distance with a vertical offset: the second form
  // uses tan(pitch), which is infinite for a cap looking straight up or down, and sends the plate to infinity.
  const c = Math.cos(f.pitch);
  mesh.position.set(Math.sin(f.bearing) * c * f.distance, Math.sin(f.pitch) * f.distance, -Math.cos(f.bearing) * c * f.distance);
  // A plane's normal starts at +z (south). Turning it by -bearing points it back at the eye, and leaves the
  // image's own left-to-right running east, which is the way round a viewer facing that bearing reads it.
  mesh.rotation.order = 'YXZ';
  mesh.rotation.set(f.pitch, -f.bearing, 0);
}

// A plate's alpha mask.
//
// Two jobs. The edge feather stops a plate reading as a poster with a hard rim. The ARC is the important one: a
// 110-degree plate every 60 degrees overlaps its neighbour by fifty, so over most of a turn two images are both
// claiming the same direction. Where they disagree -- and they do, because each was drawn from its own implied
// standoff -- cross-fading them shows the disagreement as a snap or a ghost as you drag through it. Giving each
// plate a narrow arc of its own, with a short blend into the next, means almost every direction is served by one
// image and the disagreement is confined to a few degrees.
//
// `arc` is the half-angle a plate owns outright; it fades to nothing `arcFeather` degrees beyond that. Angles are
// converted to positions across the plate through its own lens, because a plate is flat: equal angles are not
// equal distances across it.
// `arcFeather` may likewise be [left, right]: a seam between a view and one it was built from needs only a short fade,
// because both sides carry the same pixels there (turn.js, BUILT_MARGIN).
// `arc` may be one half-angle, or [left, right] when a plate's share is not centred on it -- which it usually
// should not be. Seams want to fall in the quiet parts of a room, and the quiet parts are not evenly spaced: put
// them on an even grid and they land on the very things a room is looked at for. A plate's left share is east-
// negative, its right share east-positive, because the image's own left-to-right runs east.
const masks = new Map();
function plateMask(hfov, arc, arcFeather, edge, n = 128) {
  const key = `${hfov}/${arc}/${arcFeather}/${edge}`;
  if (masks.has(key)) return masks.get(key);
  const rad = d => (d * Math.PI) / 180;
  const H = Math.tan(rad(hfov / 2));
  const [aL, aR] = Array.isArray(arc) ? arc : [arc, arc];
  const edgeOf = a => (a ? Math.tan(rad(Math.min(89, a))) / H : Infinity);
  const [fL, fR] = Array.isArray(arcFeather) ? arcFeather : [arcFeather, arcFeather];
  const fullL = edgeOf(aL), zeroL = edgeOf(aL + fL);
  const fullR = edgeOf(aR), zeroR = edgeOf(aR + fR);
  const smooth = t => { const u = Math.min(1, Math.max(0, t)); return u * u * (3 - 2 * u); };
  const data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const fx = (x + 0.5) / n, fy = (y + 0.5) / n;
      const s = 2 * fx - 1;                                 // -1 at the plate's west edge, +1 at its east edge
      const u = Math.abs(s);
      const [full, zero] = s < 0 ? [fullL, zeroL] : [fullR, zeroR];
      let a = arc ? smooth((zero - u) / Math.max(1e-6, zero - full)) : 1;
      // The arc IS the horizontal fade when a plate has one, and the rim feather must not be applied on top of it.
      // It was: the outer eighth of the width is the last ten degrees or so of a wide lens, which is inside the
      // arc the solver had just given the plate -- so the plate faded out several degrees short of its own seam
      // and the band between was carried by two dying edges instead of one good image.
      if (!arc) a *= smooth(fx / edge) * smooth((1 - fx) / edge);
      a *= smooth(fy / edge) * smooth((1 - fy) / edge);
      const i = (y * n + x) * 4;
      data.fill(Math.round(255 * a), i, i + 4);             // RGBA: three.js reads alphaMap from GREEN
    }
  }
  const tex = new THREE.DataTexture(data, n, n, THREE.RGBAFormat);
  tex.needsUpdate = true;
  masks.set(key, tex);
  return tex;
}

// The plain rim feather, kept for a plate that owns no particular arc.
const feathers = new Map();
function feather(width, n = 64) {
  if (feathers.has(width)) return feathers.get(width);
  // RGBA, not a single channel: three.js reads alphaMap from the GREEN channel, so a red-only texture is a
  // perfectly uniform "fully transparent" and the plate silently disappears.
  const data = new Uint8Array(n * n * 4);
  const ramp = t => {                                   // smoothstep, so the join has no visible shoulder
    const u = Math.min(1, Math.max(0, t / width));
    return u * u * (3 - 2 * u);
  };
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const u = (x + 0.5) / n, v = (y + 0.5) / n;
      const a = 255 * Math.min(ramp(u), ramp(1 - u), ramp(v), ramp(1 - v));
      data.fill(a, (y * n + x) * 4, (y * n + x) * 4 + 4);
    }
  }
  const tex = new THREE.DataTexture(data, n, n, THREE.RGBAFormat);
  tex.needsUpdate = true;
  feathers.set(width, tex);
  return tex;
}

// A rectangle with a rectangular hole in it, built as four slabs (lintel, sill, two jambs) rather than by cutting,
// because CSG for one opening per wall is a lot of machinery for four boxes. `hole` is [centreAcross, centreUp,
// width, height] in the wall's own plane.
function pierced(width, height, thickness, mat, hole) {
  const g = new THREE.Group();
  // Floor to top, like the pieces round a hole below: a wall with no opening once stood centred on the floor line,
  // half of it under the deck, which left the upper half of every unpierced wall missing (a bay's back wall, the
  // Balcony's plain faces).
  if (!hole) { g.add(place(slab(width, height, thickness, mat), [0, height / 2, 0])); return g; }
  const [hx, hy, hw, hh] = hole;
  const left = hx - hw / 2 + width / 2, right = width / 2 - (hx + hw / 2);
  const below = hy - hh / 2, above = height - (hy + hh / 2);
  if (left > 0.001) g.add(place(slab(left, height, thickness, mat), [-width / 2 + left / 2, height / 2, 0]));
  if (right > 0.001) g.add(place(slab(right, height, thickness, mat), [width / 2 - right / 2, height / 2, 0]));
  if (below > 0.001) g.add(place(slab(hw, below, thickness, mat), [hx, below / 2, 0]));
  if (above > 0.001) g.add(place(slab(hw, above, thickness, mat), [hx, height - above / 2, 0]));
  return g;
}

// ---- the panorama convention (DR-088) ------------------------------------------------------------------------
// An equirectangular image has to agree with the room about which way is which, or the invisible pick proxies sit
// where nothing is. The delivery convention, the design agent's proposal and the better of the two:
//
//   u = 0.0 / 1.0  south (the seam)        v = 0  zenith (the top row of the image)
//   u = 0.25       west                    v = 1  nadir
//   u = 0.5        north (the image's middle column)
//   u = 0.75       east
//
// It puts the seam behind a viewer facing north, which on Deck Nine is the sanitation alcove -- the least detailed
// wall in the room and the cheapest place for a join to go wrong.
//
// three.js's own sphere UVs run the other way round (measured, not assumed: north lands at u 0.75, east 0.5, south
// 0.25, west 0, and the zenith at v 1, which with the default flipY is the image's top row). So the image is
// sampled mirrored and quarter-turned: u_image = 0.25 - u_sphere, which is repeat.x -1 with offset.x 0.25. The
// convention that is easiest to author to is the one to keep; one texture transform is the price.
export const PANORAMA = { seam: 'south', north: 0.5, east: 0.75, south: 0, west: 0.25, zenith: 'v=0 (top row)' };
export const bearingToU = deg => (((deg / 360) + 0.5) % 1 + 1) % 1;   // 0 = north, 90 = east
export function applyPanoramaMapping(tex) {
  tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.x = -1;
  tex.offset.x = 0.25;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---- the parts -----------------------------------------------------------------------------------------------
// Each takes its own spec and returns an Object3D already positioned in room space.
const PARTS = {
  // The room's own box: floor, ceiling and four walls, each wall optionally pierced by one opening. This replaces
  // the graybox's shell for a room that has one.
  //   { part: "shell", size: [w,h,d], at?: [x,y,z], floor?, ceiling?, wall?,
  //     openings?: { NORTH: [across, up, width, height], ... } }
  shell(s) {
    const g = new THREE.Group();
    const [w, h, d] = s.size ?? [8, 3, 8];
    const t = s.thickness ?? 0.1;
    g.add(place(slab(w, t, d, s.floor ?? 'deck-plate'), [0, -t / 2, 0]));
    if (s.ceiling !== null) g.add(place(slab(w, t, d, s.ceiling ?? 'ceiling'), [0, h + t / 2, 0]));
    for (const [dir, rot] of Object.entries(FACING)) {
      const len = (dir === 'NORTH' || dir === 'SOUTH') ? w : d;
      const wall = pierced(len, h, t, s.wall ?? 'wall-panel', s.openings?.[dir]);
      wall.rotation.y = rot;
      const off = (dir === 'NORTH' || dir === 'SOUTH') ? d / 2 : w / 2;
      wall.position[(dir === 'NORTH' || dir === 'SOUTH') ? 'z' : 'x'] = (dir === 'SOUTH' || dir === 'EAST' ? 1 : -1) * (off + t / 2);
      g.add(wall);
    }
    return place(g, s.at);
  },

  // A recess off one wall: its own little shell, open on the side that meets the room. The gangway bay and the
  // sanitation alcove on Deck Nine are both this.
  //   { part: "bay", at: [x,y,z], size: [w,h,d], open: "SOUTH", openings?: {...} }
  bay(s) {
    const g = new THREE.Group();
    const [w, h, d] = s.size ?? [2, 2.3, 1];
    const t = s.thickness ?? 0.08;
    g.add(place(slab(w, t, d, s.floor ?? 'deck-plate'), [0, -t / 2, 0]));
    if (s.ceiling !== null) g.add(place(slab(w, t, d, s.ceiling ?? 'ceiling'), [0, h + t / 2, 0]));
    for (const [dir, rot] of Object.entries(FACING)) {
      if (dir === (s.open ?? 'SOUTH')) continue;
      const len = (dir === 'NORTH' || dir === 'SOUTH') ? w : d;
      const wall = pierced(len, h, t, s.wall ?? 'wall-panel', s.openings?.[dir]);
      wall.rotation.y = rot;
      const off = (dir === 'NORTH' || dir === 'SOUTH') ? d / 2 : w / 2;
      wall.position[(dir === 'NORTH' || dir === 'SOUTH') ? 'z' : 'x'] = (dir === 'SOUTH' || dir === 'EAST' ? 1 : -1) * (off + t / 2);
      g.add(wall);
    }
    return place(g, s.at, s.rot ?? 0);
  },

  // A drum: floor, ceiling and a ring of wall segments with gaps left for the openings. Tower Core, the booths and
  // the lifts are all round or chamfered, and a box cannot pretend to be.
  //   { part: "drum", at?, radius, height, segments?, gaps?: [{ from, to }] }  -- angles in degrees, 0 = north
  drum(s) {
    const g = new THREE.Group();
    const r = s.radius ?? 3, h = s.height ?? 3, n = s.segments ?? 64;
    const t = s.thickness ?? 0.12;
    const disc = (y, mat) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r + t, r + t, t, n), material(mat));
      m.position.y = y; return m;
    };
    g.add(disc(-t / 2, s.floor ?? 'concrete'));
    if (s.ceiling !== null) g.add(disc(h + t / 2, s.ceiling ?? 'ceiling'));

    // Angles are the game's: degrees clockwise from north, so 0 is north, 90 east, 180 south, 270 west -- the same
    // bearings the metadata's exit positions work out to. A gap whose `from` is greater than its `to` wraps through
    // north, so the opening straight ahead is written -19 to 19 rather than split in two.
    const norm = a => ((a % 360) + 360) % 360;
    const rawGaps = (s.gaps ?? []).slice().sort((a, b) => norm(a.from) - norm(b.from));
    const gaps = rawGaps.map(x => [norm(x.from), norm(x.to)]);
    // The wall is what is left between the gaps: one curved span each, built as an arc of a cylinder rather than a
    // ring of flat boxes. Boxes leave their unlit side faces showing at every joint, and no overlap factor hides
    // it -- the seam is the geometry, not the shading.
    const spans = [];
    if (!gaps.length) spans.push([0, 360]);
    else {
      for (let i = 0; i < gaps.length; i++) {
        const from = gaps[i][1];                       // this gap ends
        const to = gaps[(i + 1) % gaps.length][0];     // the next one begins
        const len = norm(to - from);
        if (len > 0.5) spans.push([from, len]);
      }
    }
    const mat = material(s.wall ?? 'concrete').clone();
    mat.side = THREE.DoubleSide;                       // we stand inside it
    // A doorway is a hole in a wall, not a slot cut to the ceiling. `head` is the height of the opening, and the
    // arc above it is wall -- the curved equivalent of pierced()'s lintel. Without it a lamp authored above a door
    // hangs in a black void instead of being mounted on something, which is what DR-092's fixtures assume.
    for (const gap of rawGaps) {
      const head = gap.head;
      if (!(head > 0) || head >= h) continue;
      const from = norm(gap.from), len = norm(norm(gap.to) - from) || 360;
      const geo = new THREE.CylinderGeometry(r, r, h - head, Math.max(3, Math.round(n * len / 360)), 1, true,
        (180 - (from + len)) * Math.PI / 180, len * Math.PI / 180);
      const m = new THREE.Mesh(geo, mat);
      m.position.y = head + (h - head) / 2;
      g.add(m);
    }
    for (const [from, len] of spans) {
      // three.js lays a cylinder out as x = r sin(phi), z = r cos(phi), so phi 0 is south and phi grows eastward:
      // our bearing a is phi = 180 - a, which also reverses the direction an arc runs in.
      const phiStart = (180 - (from + len)) * Math.PI / 180;
      const geo = new THREE.CylinderGeometry(r, r, h, Math.max(3, Math.round(n * len / 360)), 1, true,
        phiStart, len * Math.PI / 180);
      const m = new THREE.Mesh(geo, mat);
      m.position.y = h / 2;
      g.add(m);
    }
    return place(g, s.at);
  },

  // A room on a regular polygon, flat-walled: the Balcony's octagon, and any chamfered room a drum's curved arcs
  // would bend. Face k's centre lies at bearing first + k * 360/sides, `apothem` metres from the axis. An opening
  // is keyed by its face's bearing and cut as the shell cuts one -- [across, up, width, height], across measured in
  // the face the way you read it from inside -- so a window keeps its sill and its head.
  //   { part: "prism", sides?, apothem, height, first?, at?, openings?: { "180": [0, 2.35, 2.8, 2.1], ... },
  //     floor?, ceiling? (null: open to the sky), wall?, thickness? }
  prism(s) {
    const g = new THREE.Group();
    const n = s.sides ?? 8, a = s.apothem ?? 4, h = s.height ?? 3, t = s.thickness ?? 0.12, first = s.first ?? 0;
    const face = 2 * a * Math.tan(Math.PI / n), R = a / Math.cos(Math.PI / n) + t;
    // floor and roof as polygons whose corners fall between the faces: three.js puts a cylinder's corners at
    // phi = thetaStart + k 2pi/n measured from +z toward +x, and a bearing b is phi = 180 - b
    const disc = (y, mat) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(R, R, t, n, 1, false, (180 - (first + 180 / n)) * Math.PI / 180), material(mat));
      m.position.y = y; return m;
    };
    g.add(disc(-t / 2, s.floor ?? 'concrete'));
    if (s.ceiling !== null) g.add(disc(h + t / 2, s.ceiling ?? 'ceiling'));
    for (let k = 0; k < n; k++) {
      const b = first + k * 360 / n, rb = b * Math.PI / 180;
      const key = Object.keys(s.openings ?? {}).find(x => Math.abs(((Number(x) - b) % 360 + 540) % 360 - 180) < 0.5);
      const wall = pierced(face, h, t, s.wall ?? 'masonry', key != null ? s.openings[key] : null);
      // FACING's convention: a wall turned by -bearing faces the middle with its across axis running clockwise
      wall.rotation.y = -rb;
      wall.position.set(Math.sin(rb) * (a + t / 2), 0, -Math.cos(rb) * (a + t / 2));
      g.add(wall);
    }
    return place(g, s.at);
  },

  // A barrel vault: a curved roof and walls in one skin, a circular arc in section, its axis running along x. The escape
  // pod is this (DR-109): Deck Nine's accepted glimpse through the pod door shows a ribbed vault over two web banks,
  // and nothing else in the kit can build one -- a drum's axis is vertical, and a shell's walls and ceiling are flat.
  // The arc passes through the floor either side of the axis (`chord` apart) and through the crown (`crown` high), so
  // those two numbers, which are what a section is measured by, fix its centre and radius. Seen from inside and, through
  // the pod door, from Deck Nine, so drawn both sides. Its ends are open: the room's shell walls close them.
  //   { part: "vault", at?: [x, y, z] (the floor under the crown, mid-length), length, chord, crown, material?, segments? }
  vault(s) {
    const L = s.length ?? 4, c = s.chord ?? 2.4, h = s.crown ?? 2.4, n = s.segments ?? 48;
    const y0 = (h * h - c * c / 4) / (2 * h), r = h - y0;       // the arc's centre above the floor, and its radius
    const end = Math.atan2(c / 2, -y0);                           // where it meets the floor, from the crown
    const pos = [], nrm = [], uv = [], idx = [];
    for (let i = 0; i <= n; i++) {
      const t = -end + 2 * end * i / n, sn = Math.sin(t), cs = Math.cos(t);
      for (const x of [-L / 2, L / 2]) {
        pos.push(x, y0 + r * cs, r * sn);
        nrm.push(0, -cs, -sn);                                    // toward the axis: the side we stand on
        uv.push(i / n, x < 0 ? 0 : 1);
      }
    }
    // Wound so the inside is the front face, so its normals are the ones used inside and flipped only outside.
    for (let i = 0; i < n; i++) { const a = 2 * i, b = a + 1, c2 = a + 2, d = a + 3; idx.push(a, b, c2, b, d, c2); }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeBoundingSphere();
    const mat = material(s.material ?? 'wall-panel').clone();
    mat.side = THREE.DoubleSide;
    return place(new THREE.Mesh(geo, mat), s.at);
  },

  // A raised border round an opening: the pressure-bulkhead frames the Feinstein is made of.
  //   { part: "frame", at, size: [w,h], facing: "WEST", depth?, band? }
  frame(s) {
    const g = new THREE.Group();
    const [w, h] = s.size ?? [1.6, 2.0];
    const b = s.band ?? 0.14, dp = s.depth ?? 0.1;
    const mat = s.material ?? 'structural-rib';
    g.add(place(slab(w + b * 2, b, dp, mat), [0, h / 2 + b / 2, 0]));
    g.add(place(slab(w + b * 2, b, dp, mat), [0, -h / 2 - b / 2, 0]));
    g.add(place(slab(b, h, dp, mat), [-w / 2 - b / 2, 0, 0]));
    g.add(place(slab(b, h, dp, mat), [w / 2 + b / 2, 0, 0]));
    return place(g, s.at, FACING[s.facing ?? 'NORTH']);
  },

  // A flight of treads between two points, with a rail each side. Steeper than stairs is fine -- the Feinstein's
  // gangway is meant to be. A `solid` flight is cut from rock rather than built: each step a block from its tread
  // down to `solid` metres below the flight's lower end (true: 0.4), touching the next, so there is no gap between
  // treads to see through -- the Winding Stair is "carved into the face of a cliff", and open treads read as slabs.
  //   { part: "stair", from: [x,y,z], to: [x,y,z], width?, treads?, rail?, solid? }
  stair(s) {
    const g = new THREE.Group();
    const a = V(s.from), b = V(s.to);
    const n = s.treads ?? Math.max(3, Math.round(Math.abs(b.y - a.y) / 0.22));
    const w = s.width ?? 1.0;
    const run = new THREE.Vector3().subVectors(b, a);
    const yaw = Math.atan2(-run.x, -run.z);
    const bottom = Math.min(a.y, b.y) - (s.solid === true ? 0.4 : Number(s.solid) || 0);
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      if (s.solid) {
        const top = a.y + run.y * t, block = slab(w, top - bottom, Math.hypot(run.x, run.z) / n, s.tread ?? 'tread');
        block.position.copy(a).addScaledVector(run, t);
        block.position.y = (top + bottom) / 2;
        block.rotation.y = yaw;
        g.add(block);
        continue;
      }
      const tread = slab(w, 0.05, run.length() / n * 0.9, s.tread ?? 'tread');
      tread.position.copy(a).addScaledVector(run, t);
      tread.rotation.y = yaw;
      g.add(tread);
    }
    // One rail each side, lying along the flight rather than level: it has to climb with the treads, so it is as
    // long as the slope and pitched by the same angle, not a horizontal bar hung over the stair.
    if (s.rail !== null) {
      const rise = b.y - a.y, flat = Math.hypot(run.x, run.z);
      const pitch = Math.atan2(rise, flat);
      const railH = s.railHeight ?? 0.95;
      for (const side of [-1, 1]) {
        const rail = slab(0.05, 0.05, Math.hypot(rise, flat), s.rail ?? 'handrail');
        rail.position.copy(a).addScaledVector(run, 0.5);
        rail.position.y += railH;
        rail.rotation.order = 'YXZ';
        rail.rotation.y = yaw;
        rail.rotation.x = pitch;
        rail.translateX(side * w / 2);
        g.add(rail);
      }
    }
    return g;
  },

  // A run of pipe along a polyline, with a fat elbow at each corner. Pipe and conduit are most of what makes a
  // service corridor read as one. `elbow` is the elbow's radius over the pipe's: 1 makes the joints flush, for a curve
  // drawn as many short straights -- the escape pod's ribs, where fat elbows every few degrees came out as a string of
  // beads (DR-109).
  //   { part: "pipe", path: [[x,y,z], ...], radius?, material?, elbow? (1.35) }
  pipe(s) {
    const g = new THREE.Group();
    const pts = (s.path ?? []).map(V);
    const r = s.radius ?? 0.06, er = r * (s.elbow ?? 1.35);
    const mat = material(s.material ?? 'pipe');
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const len = a.distanceTo(b);
      if (len < 0.001) continue;
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 10), mat);
      m.position.copy(a).lerp(b, 0.5);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(b, a).normalize());
      g.add(m);
      if (i < pts.length - 1) {
        const e = new THREE.Mesh(new THREE.SphereGeometry(er, 10, 8), mat);
        e.position.copy(b); g.add(e);
      }
    }
    return g;
  },

  // A control face with a scatter of switches and lamps on it. `lamps` are placed across the plate in a row and
  // may each carry their own material, which is how a fault light differs from a live one.
  //   { part: "panel", at, facing, size: [w,h], lamps?: [{ x, y, material, size? }] }
  panel(s) {
    const g = new THREE.Group();
    const [w, h] = s.size ?? [0.6, 0.8];
    g.add(slab(w, h, s.depth ?? 0.07, s.material ?? 'control-face'));
    for (const l of s.lamps ?? []) {
      const [lw, lh] = l.size ?? [0.05, 0.05];
      g.add(place(slab(lw, lh, 0.03, l.material ?? 'indicator-live'), [l.x ?? 0, l.y ?? 0, (s.depth ?? 0.07) / 2 + 0.015]));
    }
    return place(g, s.at, FACING[s.facing ?? 'NORTH']);
  },

  // A luminaire. It is a glowing slab, and optionally an actual light, because a room lit only by the scene's
  // hemisphere light has no shape to it.
  //   { part: "light", at, size?, material?, cast?: { intensity, distance, color } }
  light(s, ctx) {
    const g = new THREE.Group();
    const [w, h, d] = s.size ?? [1.1, 0.06, 0.22];
    const on = ctx?.fixtures !== false;
    // A lamp authored in a package gives its colour as a hex rather than a palette name, and the housing is drawn
    // unlit at that colour: a luminaire is the one surface in a room that should not be shaded by the light in it.
    // `housing: false` is a light the room's painting already draws: cast, not shown.
    if (s.housing !== false) {
      let housing;
      if (s.color != null && on) housing = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ color: s.color, toneMapped: false }));
      else housing = slab(w, h, d, on ? (s.material ?? 'lamp-cool') : (s.off ?? 'trim'));
      g.add(housing);
    }
    if (s.cast && on) {
      const p = new THREE.PointLight(s.cast.color ?? 0xdbe8f5, s.cast.intensity ?? 6, s.cast.distance ?? 9, s.cast.decay ?? 1.8);
      p.position.y = -0.1; g.add(p);
    }
    return place(g, s.at, s.rot ?? 0);
  },

  // A 360 degree photograph of the room, painted on the inside of a sphere around the eye (DR-088). The player
  // never moves, only turns, so a single panorama is correct from the one place they stand -- which is the whole
  // reason this is possible at all.
  //
  // It is unlit on purpose: a panorama already contains its own light, and a MeshStandardMaterial would light it
  // a second time. And it is drawn behind everything, so geometry for the things that move -- actors, dropped
  // objects, a door mid-swing -- still draws in front of it.
  //   { part: "panorama", image: "reference/....webp", when?: "..." }
  panorama(s, ctx) {
    const geo = new THREE.SphereGeometry(s.radius ?? 40, 64, 32);
    // Graded like a plate (scene/grade.js): it was painted in one light, and the day phase has to reach it.
    const mat = graded(new THREE.MeshBasicMaterial({ side: THREE.BackSide, color: 0x8a8a8a, toneMapped: false }), { sky: true });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.renderOrder = -1;
    mesh.userData.panorama = s.image;
    // The texture is loaded by the caller, because a loader needs a DOM and this file deliberately has none.
    const tex = ctx?.loadTexture?.(s.image);
    if (tex) { applyPanoramaMapping(tex); mat.map = tex; mat.color.setHex(0xffffff); mat.needsUpdate = true; }
    return place(mesh, s.at);
  },

  // One comp, hung on the inside of a sphere over the arc it actually covers. This is what lets a fixed painted
  // view be looked around in.
  //   { part: "plate", image, bearing, hfov?, vfov?, pitch?, radius? }   -- bearing and fovs in degrees
  //
  // The geometry is honest for one reason: the player's eye never moves inside a room, it only turns. A picture
  // painted from that eye is therefore correct for every rotation of it -- there is no parallax to get wrong,
  // because there is no translation. Walk the eye and the illusion breaks, which is why this is a room-sized
  // technique and not a world-sized one.
  //
  // A single comp covers something like 70 of the 360 degrees, so a room needs about five of them to be whole.
  // Where no plate covers, the built room shows through underneath.
  plate(s, ctx) {
    const f = plateFrame(s);
    // Subdivided, though a plane needs only two triangles: a cap is 66 m across twelve metres overhead, and looking
    // level its far corners lie beside and behind the eye. Two triangles reaching that far came out as one flat colour
    // -- every pixel sampling the middle of the image -- wherever the cap showed at a level gaze (DR-107, SanFac A);
    // small ones do not.
    const geo = new THREE.PlaneGeometry(f.width, f.height, 32, 32);
    // The plate wins wherever it covers: it is drawn last with the depth buffer ignored, so the built room shows
    // through only in the arcs no comp has been painted for. A comp already depicts the props in front of it, so
    // letting a nearer box occlude the painting of that same box would be backwards.
    // Two ways to hang a plate. Over a built room it must ignore depth, or the fabric it is meant to replace pokes
    // through it -- but then it also covers anything standing in the room, because the plate is drawn last. Over a
    // COMPLETE turn there is no fabric to cover, so the plate takes part in depth like everything else and the
    // ambassador standing a metre away correctly hides the wall twelve metres behind him. `depth: true` picks that.
    const depth = s.depth === true;
    // Unlit, since the painting carries its own light; graded (scene/grade.js), since that light is daylight and the
    // room is not always in it. The grade touches the colour only, so the masks below work as they always have. Its sky
    // is found by what it joins (scene/skymatte.js): a level view's sky reaches the top of the frame, but the sky seen
    // looking up can meet the frame on any side, and a view looking down has none.
    const pitch = s.pitch ?? 0, skyFrom = pitch >= 45 ? 'edges' : pitch <= -45 ? null : 'top';
    const mat = graded(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x8a8a8a, toneMapped: false, transparent: true, depthTest: depth, depthWrite: false }), { sky: true, skyFrom });
    const mesh = new THREE.Mesh(geo, mat);
    // Plates do not write depth, so where two overlap the one drawn last shows -- and left to three.js that is
    // whichever is nearer along the gaze, which changes as the player turns. A cap is built from the level views
    // and its rim is theirs twice resampled, so it goes underneath: the ring shows wherever it reaches, and the cap
    // wherever the ring fades out above or below it.
    const cap = Math.abs(s.pitch ?? 0) >= 45;
    mesh.renderOrder = (depth ? -1 : 10) - (cap ? 1 : 0);
    mesh.userData.plate = s.image;
    // A turn may hand over a texture it has already prepared rather than a URL to load. Each view of a set is
    // generated on its own, so a set arrives with no shared exposure -- on Deck Nine two neighbours differ by half
    // again over the very directions they both cover, and no seam placement hides that. The turn levels them and
    // gives the levelled pixels to the plate; a lone comp with nothing to agree with still arrives as a URL.
    const tex = s.texture ?? ctx?.loadTexture?.(s.image);
    if (tex) { tex.colorSpace = THREE.SRGBColorSpace; mat.map = tex; mat.color.setHex(0xffffff); mat.needsUpdate = true; }
    // Fade the edges out. A hard rectangle reads as a poster hung in mid-air; a soft one lets neighbouring plates
    // cross-fade into each other, and lets a lone plate sit in the built room instead of being pinned to it.
    // Built as data rather than on a canvas, because this file has no DOM and the tests run in node.
    const edge = s.feather ?? 0.12;
    if (s.arc) mat.alphaMap = plateMask(s.hfov ?? 70, s.arc, s.arcFeather ?? 8, edge);
    else if (edge > 0) mat.alphaMap = feather(edge);

    aimPlate(mesh, f);
    return place(new THREE.Group().add(mesh), s.at);
  },

  // Something lying flat on a surface: a slime trail, a scorch mark, a spill, a stain.
  //   { part: "decal", image?, at: [x, y, z], size: [w, d], rot?, color? }
  //
  // A ground-plane quad, not a billboard, and that distinction is the whole part. A flat thing has a large
  // silhouette and almost no thickness, so drawing it upright and facing the eye would be a lie about both; laid
  // on the deck at its real footprint, the perspective falls out of where the player is standing rather than being
  // baked in. That also means the art wants to be drawn TOP-DOWN and square-on -- an oblique drawing laid flat is
  // foreshortened twice. Same rule as the flat items in DR-099, same reason.
  //
  // These are ADDITIVE: they compose over whatever painted state the room is in, because nothing structural
  // changes when a trail appears. Without an image it is a flat colour, which is honest placeholder rather than
  // pretend artwork, and the delivered PNG replaces it with no other change.
  decal(s, ctx) {
    const [w = 0.5, d = 0.5] = s.size ?? [];
    const geo = new THREE.PlaneGeometry(w, d);
    const mat = flatMaterial(s, ctx);
    const mesh = new THREE.Mesh(geo, mat);
    // Flat on the deck, face up, with the image's top edge pointing along `rot` -- degrees clockwise seen from
    // above, the same sense as a bearing, so 0 is north and 90 is east.
    layFlat(mesh, s.rot ?? 0);
    const [x = 0, y = 0.01, z = 0] = s.at ?? [];
    mesh.position.set(x, y, z);
    // Just above whatever it lies on, and no depth write, so it never fights the deck for the same pixels.
    mesh.renderOrder = 21;
    return mesh;
  },

  // A strip lying on the deck from one floor point to another: a trail of slime, a scuff, a line of spilt coolant.
  //   { part: "trail", image?, from: [x, y, z], to: [x, y, z], width, tile? }
  //
  // A trail is a path, not a patch. The ambassador ambles in from down the corridor leaving a trail of green slime
  // and later disappears up the gangway leaving another (globals.zil 810, 831), so what is on the deck is a line
  // between places the room already knows -- and drawing it as a rectangle means someone has to paint a picture of
  // exactly that route. As a strip, the art is a short run of trail that REPEATS along its length, and the route is
  // two floor points. Change where he stands and the trail follows; nothing is repainted. `tile` is how many metres
  // of trail one copy of the image covers, so a long corridor does not stretch one blob into a smear.
  trail(s, ctx) {
    const [ax = 0, ay = 0.02, az = 0] = s.from ?? [];
    const [bx = 0, , bz = 0] = s.to ?? [];
    const dx = bx - ax, dz = bz - az;
    const len = Math.hypot(dx, dz);
    if (!(len > 1e-3)) return null;
    const geo = new THREE.PlaneGeometry(s.width ?? 0.35, len);
    // Mirrored unless the art says it tiles: each copy meets its neighbour's reflection, so the join is continuous
    // by construction whatever the picture's edges are. A generated "seamless" tile rarely is -- Greg's first trail
    // draft is 5.9/255 out between its top and bottom rows -- and an organic smear reads the same either way up.
    // With no `tile`, one copy covers the length its own proportions give it at this width, so it is never stretched.
    const mat = flatMaterial(s, ctx, tex => {
      tex.wrapT = s.wrap === 'repeat' ? THREE.RepeatWrapping : THREE.MirroredRepeatWrapping;
      const w = s.width ?? 0.35, img = tex.image;
      const tile = s.tile ?? (img?.width > 0 ? w * img.height / img.width : 0.6);
      tex.repeat.set(1, Math.max(1, len / tile));
    });
    const mesh = new THREE.Mesh(geo, mat);
    // Bearing of the direction of travel: clockwise from north, where north is -z.
    layFlat(mesh, Math.atan2(dx, -dz) * 180 / Math.PI);
    mesh.position.set(ax + dx / 2, ay, az + dz / 2);
    mesh.renderOrder = 21;
    return mesh;
  },

  // A figure standing on the deck, drawn as one flat picture facing the eye.
  //   { part: "cutout", image | texture, at: [x, 0, z], height, aspect, eye?: [x, y, z] }
  //
  // The same argument that makes a painted room exact makes this exact: the eye never moves inside a room, it only
  // turns, and nothing in the rules walks an actor from one side of a room to the other while you watch. So the
  // angle between the eye and a standing figure never changes, and one view of him is not an approximation of a
  // model -- it is what a model would render to. That is also why the quad is turned to face the eye ONCE here
  // rather than billboarded every frame: there is nothing for a per-frame update to do.
  //
  // `at` is a floor point and the figure stands on it, so his feet are the bottom edge of the image and his height
  // is a real measurement in metres. Width follows the image's own aspect, which is the only way the two can't
  // disagree -- authoring both a width and a height lets a delivery state a shape its picture does not have.
  //
  // `facing` (a bearing: 0 north, 90 east) makes it something ON a wall rather than standing in the room: the damage
  // painted over the Kitchen dispenser's face. It faces that way whatever the eye's bearing, because the face it
  // covers does -- turned to the eye it would sit 24 degrees off the dispenser. And it blends rather than clips: an
  // overlay is mostly soft soot and scorch (two fifths of the dispenser plate's painted pixels are under alpha 0.35),
  // lying on the painting with nothing to hide behind it.
  cutout(s, ctx) {
    const h = s.height ?? 1.8;
    const w = h * (s.aspect ?? 0.5);
    const geo = new THREE.PlaneGeometry(w, h);
    const onWall = s.facing != null;
    // alphaTest, not plain transparency: a cutout has a hard edge and belongs in the depth buffer like anything
    // else standing in the room, so that a plate hung with depth can be in front of or behind him correctly.
    // Graded with the paintings, or a figure drawn in daylight stands lit up in a room at night.
    const mat = graded(new THREE.MeshBasicMaterial(onWall
      ? { side: THREE.DoubleSide, color: 0xffffff, toneMapped: false, transparent: true, alphaTest: 0.004, depthWrite: false }
      : { side: THREE.DoubleSide, color: 0xffffff, toneMapped: false, transparent: true, alphaTest: 0.35 }));
    const tex = s.texture ?? ctx?.loadTexture?.(s.image);
    if (tex) { tex.colorSpace = THREE.SRGBColorSpace; mat.map = tex; mat.needsUpdate = true; }
    const mesh = new THREE.Mesh(geo, mat);
    const [ax, ay = 0, az] = s.at ?? [0, 0, 0];    // at: the foot of the picture; y above the floor for a thing hung up
    const [ex, , ez] = s.eye ?? [0, 1.6, 0];
    mesh.position.set(ax, ay + h / 2, az);
    // A plane's normal starts at +z. Turning it by the bearing FROM the figure TO the eye points his face at it.
    // A bearing b is the direction (sin b, -cos b) in x and z, north being -z.
    const b = (s.facing ?? 0) * Math.PI / 180;
    mesh.rotation.y = onWall ? Math.atan2(Math.sin(b), -Math.cos(b)) : Math.atan2(ex - ax, ez - az);
    if (onWall) mesh.renderOrder = 22;             // over the painting and any deck decal, like a decal
    return mesh;
  },

  // Outdoors. A room under the sky has no box round it: `open` says so, and the graybox then draws no shell of its own
  // (graybox.js) -- the parts are the whole of it.
  //   { part: "open" }
  open() { return new THREE.Group(); },

  // Water out to the horizon: a disc at the sea's level, big enough that its rim is below the horizon from any eye in
  // the room, and seen from above or below (the Underwater room looks up at it). Unlit, at its own colour: a flat
  // plane under an open sky's light washes out to the sky's own tone and the horizon disappears (tried on a scratch
  // Crag), and the horizon is the one line every view of the sea has to agree on. So it also takes no fog, and runs
  // 30 km out: a nearer rim, or one faded into the haze, puts the horizon visibly below the eye's level, where no
  // sea's horizon is.
  //   { part: "sea", level?, radius?, material? }
  sea(s) {
    // In rings that grow outward by 15 per cent each, not a fan of 600 m triangles: seen level, a triangle reaching
    // beside and behind the eye comes out as nothing at all (the ceiling-cap fault, plate() above), and here the
    // whole sea vanished below the horizon.
    const spec = PALETTE[s.material ?? 'sea'] ?? PALETTE.sea, R = s.radius ?? 30000, seg = 96, radii = [0];
    for (let r = 0.5; r < R; r *= 1.15) radii.push(r);
    radii.push(R);
    const pos = [], idx = [];
    for (const r of radii) for (let k = 0; k < seg; k++) { const a = (k / seg) * 2 * Math.PI; pos.push(Math.cos(a) * r, 0, Math.sin(a) * r); }
    for (let i = 0; i + 1 < radii.length; i++) for (let k = 0; k < seg; k++) {
      const a = i * seg + k, b = i * seg + (k + 1) % seg, c = (i + 1) * seg + k, d = (i + 1) * seg + (k + 1) % seg;
      idx.push(a, c, b, b, c, d);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeBoundingSphere();
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: spec.color, side: THREE.DoubleSide, fog: false }));
    mesh.position.y = s.level ?? 0;
    return mesh;
  },

  // A rock: a lumpy mass filling roughly its box, for crags, cliffs and a sea floor. The lumps come from `seed`, not
  // from chance, so the same scene file builds the same rock every time -- a blockout that moved between two
  // renders would not be one.
  //   { part: "rock", at, size: [w,h,d], seed?, detail?, material?, rot? }
  rock(s) {
    const [w, h, d] = s.size ?? [2, 2, 2];
    const geo = new THREE.IcosahedronGeometry(0.5, s.detail ?? 2);
    const pos = geo.attributes.position, v = new THREE.Vector3(), seed = s.seed ?? 1;
    // a vertex's lump depends on where it is, so the vertices a seam splits keep together
    const lump = (x, y, z) => { const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719 + seed * 4.1414) * 43758.5453; return n - Math.floor(n); };
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const k = 0.78 + 0.44 * lump(+v.x.toFixed(4), +v.y.toFixed(4), +v.z.toFixed(4));
      pos.setXYZ(i, v.x * k * w, v.y * k * h, v.z * k * d);
    }
    geo.computeVertexNormals();
    return place(new THREE.Mesh(geo, material(s.material ?? 'rock')), s.at, (s.rot ?? 0) * Math.PI / 180);
  },

  // A winding stair: wedge treads climbing round a central column. The castle's Winding Stair.
  //   { part: "spiral", at (the foot of the column), radius, column?, rise, turns?, treads?, from? (bearing of the
  //     first tread, degrees), clockwise?, material? }
  spiral(s) {
    const g = new THREE.Group();
    const r = s.radius ?? 1.4, c = s.column ?? 0.2, rise = s.rise ?? 4, turns = s.turns ?? 1;
    const n = s.treads ?? Math.max(4, Math.round(rise / 0.2)), sweep = turns * 2 * Math.PI / n;
    const dir = s.clockwise === false ? -1 : 1, start = (s.from ?? 0) * Math.PI / 180;
    const col = new THREE.Mesh(new THREE.CylinderGeometry(c, c, rise, 16), material(s.material ?? 'masonry'));
    col.position.y = rise / 2; g.add(col);
    for (let i = 0; i < n; i++) {
      const a = start + dir * (i + 0.5) * sweep, len = r - c;
      const tread = slab(len, 0.08, Math.max(0.12, 2 * Math.tan(sweep / 2) * (c + len / 2)), s.material ?? 'masonry');
      // bearings run clockwise from north (-z): the tread's centre sits along the bearing, and it is turned to point there
      tread.position.set(Math.sin(a) * (c + len / 2), (i + 1) * rise / n - 0.04, -Math.cos(a) * (c + len / 2));
      tread.rotation.y = Math.PI / 2 - a;
      g.add(tread);
    }
    return place(g, s.at);
  },

  // Anything else: one box or one cylinder, named and placed. A mop bucket, a stanchion, a cabinet, a valve.
  //   { part: "prop", at, size, shape?: "box" | "cylinder", material?, rot? }
  prop(s) {
    const [w, h, d] = s.size ?? [0.4, 0.4, 0.4];
    const mesh = s.shape === 'cylinder'
      ? new THREE.Mesh(new THREE.CylinderGeometry(w / 2, w / 2, h, 14), material(s.material ?? 'machinery'))
      : slab(w, h, d, s.material ?? 'machinery');
    return place(mesh, s.at, s.rot ?? 0);
  },
};

export const PART_NAMES = Object.keys(PARTS);
// The parts that lie flat on a surface and add to it -- slime, a scorch, a spill. They are engine overlays by
// definition and never painted into a view, whatever state the painting is in (DR-100's rule: a change to the
// fabric's structure is a painted variant, an additive flat change is an overlay).
export const OVERLAY_PARTS = ['decal', 'trail'];

// Lay a plane flat on the deck, face up, with its local +y (the image's top edge) pointing along `bearing` --
// degrees clockwise from north, where north is -z. The spin happens in the plane's own frame before it is laid
// down, which is what Euler order YXZ gives: Rz, then Rx, then Ry.
function layFlat(mesh, bearing = 0) {
  mesh.rotation.order = 'YXZ';
  mesh.rotation.set(-Math.PI / 2, 0, -bearing * Math.PI / 180);
}

// The material for something flat lying on a surface: an honest flat colour until its picture has ACTUALLY loaded,
// and the picture after. Assigning a texture up front would mean a delivery that has not landed yet -- or a path
// that 404s -- draws as a black or white card on the deck, which reads as broken artwork rather than as a
// placeholder. `resolveImage` lets a page turn a package's own file name into the URL it is served at.
function flatMaterial(s, ctx, onTexture) {
  // Graded, like everything else painted in daylight and hung unlit (scene/grade.js).
  const mat = graded(new THREE.MeshBasicMaterial({
    color: s.color ?? 0x6fd08c, toneMapped: false, transparent: true, depthWrite: false, opacity: s.opacity ?? 1,
  }));
  const url = s.image ? (ctx?.resolveImage?.(s.image) ?? s.image) : null;
  if (url && ctx?.loadTexture) {
    ctx.loadTexture(url, tex => {
      tex.colorSpace = THREE.SRGBColorSpace;
      onTexture?.(tex);
      // The picture carries its own alpha, so the placeholder's opacity no longer applies.
      mat.map = tex; mat.color.setHex(0xffffff); mat.opacity = 1; mat.needsUpdate = true;
    });
  }
  return mat;
}

// Build a room's scenery. Returns one group; the caller adds it under everything pickable.
// `parts` is the array from data/scenes/<ROOM>.json. A part with an unmet `when` is simply not built, and a part
// naming something the kit has no builder for is skipped and reported, never thrown.
export function buildParts(g, parts = [], ctx = {}) {
  const group = new THREE.Group();
  const missing = [];
  for (const spec of parts) {
    if (!spec || typeof spec !== 'object') continue;
    const make = PARTS[spec.part];
    if (!make) { missing.push(spec.part); continue; }
    if (!when(g, spec.when)) continue;
    const built = make(spec, ctx);
    if (built) group.add(built);
  }
  return { group, missing };
}
