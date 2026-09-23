// A room's turn: the set of painted views a package delivers, hung so they can be looked around (DR-093).
//
// A package records each view's camera as INTENT, because the image generator does not hit what it is asked for.
// So the real lens is fitted against the room, the set is levelled to a common exposure, and the seams between
// neighbouring views are put where the images agree rather than on an even grid. All three were learned the hard
// way and all three live here, so every page that shows a room gets them.
import * as THREE from 'three';
import { plateFrame, atoms, when, satisfy } from '../scene/parts.js';
import { visibleWhen, isOccluder } from '../scene/occlusion.js';

const arcDelta = (a, b) => ((b - a) % 360 + 540) % 360 - 180;
const norm = a => ((a % 360) + 360) % 360;
const rad = d => d * Math.PI / 180;

// Luminance at a true bearing and elevation from an image's pixels, or null if that direction is off the image --
// through the plate's stated lens by default, or through any other with `withLens`, which is what lets a lens be
// fitted rather than trusted (fitLenses). Pure: node tests build one from a synthetic image.
// The plate's own frame, matching aimPlate: it faces the eye along its bearing and pitch, and its left-to-right
// runs east. Right stays level whatever the pitch, because a plate is turned about y first and then tilted.
// Exported because the artwork tools project with it too (scripts/underpaint.mjs): a view built for a plate has to
// be built through exactly the frame the plate is hung in.
export function plateBasis(p) {
  const b = rad(p.bearing), t = rad(p.pitch ?? 0);
  return {
    fwd: [Math.sin(b) * Math.cos(t), Math.sin(t), -Math.cos(b) * Math.cos(t)],
    rgt: [Math.cos(b), 0, Math.sin(b)],
    up: [-Math.sin(t) * Math.sin(b), Math.cos(t), Math.sin(t) * Math.cos(b)],
  };
}

export function pixelSampler(W, H, data, p) {
  const { fwd, rgt, up } = plateBasis(p);
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const through = hfov => {
    const tanH = Math.tan(rad(hfov / 2)), tanV = tanH / (W / H);
    // `inset` keeps samples away from the very rim, where a generated image is least trustworthy.
    return (bearing, elev, inset = 0.98) => {
      const bb = rad(bearing), ee = rad(elev);
      const d = [Math.sin(bb) * Math.cos(ee), Math.sin(ee), -Math.cos(bb) * Math.cos(ee)];
      const z = dot(d, fwd);
      if (z <= 1e-3) return null;
      const nx = dot(d, rgt) / z / tanH, ny = dot(d, up) / z / tanV;
      if (Math.abs(nx) > inset || Math.abs(ny) > inset) return null;
      const x = Math.round((W / 2) * (1 + nx)), y = Math.round((H / 2) * (1 - ny));
      const i = (Math.min(H - 1, Math.max(0, y)) * W + Math.min(W - 1, Math.max(0, x))) * 4;
      return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    };
  };
  return { aspect: W / H, at: through(p.hfov), withLens: hfov => ({ at: through(hfov) }) };
}

// Load an image and hand back a sampler: luminance at a true bearing and elevation, or null if that direction is
// off the image. Same origin, so the canvas is readable.
//
// This projects properly rather than assuming a level view, because the caps do not point at the horizon and they
// have to take part in the same levelling as everything else: a ceiling drawn a third brighter than the walls it
// meets is as visible a join as two walls that disagree.
async function sampler(p) {
  const img = new Image();
  img.src = p.image;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.naturalWidth; c.height = img.naturalHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, c.width, c.height);
  const W = c.width, H = c.height;
  return {
    ...pixelSampler(W, H, data, p), canvas: c, ctx,
    // Rewrite the plate's own pixels at the fitted gain and hand back a texture of the result.
    //
    // The gain has to be applied in the same space it was fitted in, and it was fitted on the stored values. A
    // material's colour would have multiplied in linear light instead, which is a different correction -- roughly
    // half the size on a mid-grey -- so the gain is baked into the pixels and the material stays white. The canvas
    // is already here: it was decoded to measure the set in the first place.
    bake(gain) {
      const lut = new Uint8Array(256);
      for (let i = 0; i < 256; i++) lut[i] = Math.max(0, Math.min(255, Math.round(i * gain)));
      const out = ctx.createImageData(W, H);
      for (let i = 0; i < data.length; i += 4) {
        out.data[i] = lut[data[i]]; out.data[i + 1] = lut[data[i + 1]]; out.data[i + 2] = lut[data[i + 2]];
        out.data[i + 3] = data[i + 3];
      }
      ctx.putImageData(out, 0, 0);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      return tex;
    },
  };
}

// Level the set.
//
// Each view is generated on its own, so the set has no shared exposure. On Deck Nine the two views that meet in
// the north-west differ by half again in mean luminance over the very directions they BOTH cover, and the pair
// that meet in the north-east differ by nearly a stop. Nothing about where the seam goes can hide that: fading a
// bright image into a darker one is a visible ramp wherever it is put, which is what "I can tell where the two
// images are" means.
//
// It also poisons the seam solver. Measuring plain luminance difference between two views at different exposures
// mostly measures the exposure gap, and that gap is smallest where the room is darkest, so the solver parks every
// seam in the nearest dark corner instead of where the pictures actually agree. Levelling first is what makes the
// measurement mean anything.
//
// One gain per plate, fitted so every overlapping pair agrees on its own shared directions. In logs that is a
// linear least squares on the graph of overlaps -- solved by repeated weighted averaging, which is plenty for the
// handful of views a room has -- and the answer is only defined up to a common factor, so it is pinned by making
// the gains average to one. That leaves the room's overall brightness alone and moves only the differences.
//
// Each pair's ratio is the MEDIAN of the ratios direction by direction, not the ratio of the two averages. An
// average is carried by the brightest pixels in it, so a lamp or a specular hit on a pipe that one view drew and
// the other did not sets the correction for the whole plate. The median asks the typical direction instead.
//
// How well the whole set is explained by one gain each can be checked without knowing the answer: multiply the
// ratios all the way round the ring of views and a perfect fit returns to 1. Deck Nine returns 1.19, so about a
// fifth of the difference between its views is NOT exposure -- it is the generator lighting each view its own way,
// and no amount of arithmetic here will remove it. That is a note for the brief, not a bug in this file.
export function fitGains(samplers, { inset = 0.88, step = 3, floor = 4, minShared = 60 } = {}) {
  const n = samplers.length;
  const ratios = Array.from({ length: n }, () => Array.from({ length: n }, () => []));
  const v = new Array(n);
  for (let e = -78; e <= 78; e += step) {
    for (let b = 0; b < 360; b += step) {
      for (let i = 0; i < n; i++) v[i] = samplers[i].at(b, e, inset);
      for (let i = 0; i < n; i++) {
        if (v[i] == null || v[i] < floor) continue;
        for (let j = i + 1; j < n; j++) {
          if (v[j] == null || v[j] < floor) continue;
          ratios[i][j].push(v[i] / v[j]);
        }
      }
    }
  }
  // x = log gain. For every pair that shares enough sky, x_i - x_j = log(1 / ratio), so that gain_i * mean_i lands
  // on gain_j * mean_j.
  const pairs = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const r = ratios[i][j];
    if (r.length < minShared) continue;
    r.sort((a, b) => a - b);
    const ratio = r[r.length >> 1];
    pairs.push({ i, j, ratio, d: -Math.log(ratio), w: r.length });
  }
  const x = new Array(n).fill(0);
  for (let it = 0; it < 800; it++) {
    const num = new Array(n).fill(0), den = new Array(n).fill(0);
    for (const p of pairs) {
      num[p.i] += p.w * (x[p.j] + p.d); den[p.i] += p.w;
      num[p.j] += p.w * (x[p.i] - p.d); den[p.j] += p.w;
    }
    // Damped, not a plain average of the neighbours. The overlap graph of a turn is a ring, a ring of six views is
    // bipartite, and on a bipartite graph undamped averaging has a mode that flips sign every pass and never dies:
    // the answer oscillates forever a few percent from the truth instead of settling on it.
    for (let k = 0; k < n; k++) if (den[k]) x[k] = 0.5 * x[k] + 0.5 * (num[k] / den[k]);
  }
  const mean = x.reduce((a, b) => a + b, 0) / n;
  // Clamped: a gain far from one is a bad view, not a bad exposure, and stretching it only spreads the damage.
  const gains = x.map(g => Math.min(1.6, Math.max(0.6, Math.exp(g - mean))));
  return { gains, pairs, residual: pairs.map(p => p.ratio * gains[p.i] / gains[p.j]) };
}

// The lens each camera is drawn at, keyed by the camera. A state view is the SAME camera as the view it replaces,
// re-rendered with a door shut, and the delivery contract has it NOT restate the lens so the two cannot drift --
// so the code has to supply it, and supplying the generic default instead is a silent error of tens of degrees.
// It was: Deck Nine's state images were measured as 74 degree views against bases of 101 to 120, which puts every
// sample in the wrong place and hands the exposure fit and the seam solver pixels from the wrong directions.
export function baseLenses(refs) {
  const lens = new Map();
  for (const [id, r] of refs) if (r.hfov != null && !String(id).includes('@')) lens.set(`${r.bearing}|${r.pitch ?? 0}`, r.hfov);
  return lens;
}

// Tie a state view's exposure to the view it replaces, rather than letting it float in the ring fit.
//
// A variant is the same camera with a door shut. It overlaps its base completely, so in the ring fit it is the
// most strongly constrained plate there is -- and the constraint is wrong, because the thing that makes it a
// variant is precisely that a large part of the frame is DIFFERENT. On Deck Nine the shut gangway bulkhead
// replaces a dark opening with a lit slab across a fifth of the view, and the ring obligingly read that as the
// whole plate being brighter and darkened it to compensate: 0.987 fitted where 0.838 is right, a 15 percent error
// baked into the state image and visible the moment the switch is thrown.
//
// So the comparison is made only where the picture did NOT change: the half of the shared directions that agree
// best. That is self-scaling -- no threshold to pick and none to get wrong on the next room -- and it is the
// honest question, which is whether the two renders were exposed alike, not whether they contain the same things.
// On the five Deck Nine variants it answers 0.956 to 1.010, so the deliveries do share their bases' exposure and
// the correction is small; the point is that it is now measured rather than assumed either way.
export function tieExposure(baseSampler, varSampler, { bearing = 0, hfov = 74, step = 0.5, floor = 4 } = {}) {
  const rows = [];
  for (let b = bearing - hfov / 2 + 4; b <= bearing + hfov / 2 - 4; b += step) {
    for (let e = -30; e <= 30; e += 2) {
      const x = baseSampler.at(b, e), y = varSampler.at(b, e);
      if (x == null || y == null || x < floor || y < floor) continue;
      rows.push({ d: Math.abs(x - y), r: x / y });
    }
  }
  if (rows.length < 40) return 1;
  rows.sort((a, b) => a.d - b.d);
  const keep = rows.slice(0, Math.max(20, rows.length >> 1)).map(p => p.r).sort((a, b) => a - b);
  return keep[keep.length >> 1];
}

// Where the room's openings are, as arcs of bearing seen from the eye.
//
// A seam across a doorway is the worst kind. Two views of a flat wall that disagree give a soft double image you
// have to look for; two views of a DOOR disagree about what the door is -- on Deck Nine the western view drew the
// pod hatch as a rectangular slab and the north-western one drew it rounded, so crossing that seam dissolves one
// door into a different door. Nothing downstream can reconcile that, so the seam has to go somewhere else.
//
// This is arithmetic, not a list: the scene file already states each wall's opening as a width in that wall's own
// plane, and the eye is a known point, so the arc each opening subtends follows. A room that gains a door gains
// the exclusion with it.
// The same arcs, worked out from a PACKAGE's own metadata rather than from a scene file.
//
// Only three rooms have a scene file and every packaged room has an exit table, so this is what lets the clearance
// check -- "can this set of views be hung with every seam on plain wall" -- be answered for a room nobody has
// built yet. It is the check that should run before an image is generated rather than after one is rejected.
//
// An exit states a door's centre and its width; the wall it is on follows from the direction. IN, OUT, UP and
// DOWN are not openings in a wall of their own: IN and OUT alias a compass exit through the same doorway, and a
// gangway or hatch leaves through the deckhead. Aliases are dropped by position, so one doorway counts once.
export function openingsFromExits(exits = {}, eye = [0, 1.6, 0]) {
  const out = [], seen = new Set();
  for (const [dir, e] of Object.entries(exits)) {
    if (!FACING[dir]) continue;
    const w = e?.width, at = e?.position;
    if (!(w > 0) || !Array.isArray(at)) continue;
    const key = at.map(n => Math.round(n * 100)).join(',');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ name: dir, ...aperture(at, w, dir, eye) });
  }
  return out;
}

// The eight compass walls an aperture can face, as outward normals in room coordinates (north is -z). The four
// diagonals are there because the ZIL has diagonal exits everywhere -- the Fork's northeast and southeast branches,
// the Infirmary's southeast door -- and dropping them left those rooms' plans ignoring half their doorways.
const S2 = Math.SQRT1_2;
const FACING = {
  NORTH: [0, -1], SOUTH: [0, 1], EAST: [1, 0], WEST: [-1, 0],
  NE: [S2, -S2], SE: [S2, S2], SW: [-S2, S2], NW: [-S2, -S2],
};
FACING.NORTHEAST = FACING.NE; FACING.SOUTHEAST = FACING.SE; FACING.SOUTHWEST = FACING.SW; FACING.NORTHWEST = FACING.NW;

// The arc an aperture subtends from the eye: `width` laid across the wall it faces, centred on `at`.
function aperture(at, w, facing, eye) {
  const [nx, nz] = FACING[facing];
  const tx = -nz, tz = nx;                        // along the wall: the normal turned a quarter
  const bearingOf = (x, z) => norm(Math.atan2(x - eye[0], -(z - eye[2])) * 180 / Math.PI);
  const a = bearingOf(at[0] - tx * w / 2, at[2] - tz * w / 2), b = bearingOf(at[0] + tx * w / 2, at[2] + tz * w / 2);
  const d = arcDelta(a, b);
  return { centre: norm(a + d / 2), half: Math.abs(d) / 2 };
}

export function openingsOf(scene, eye = [0, 0, 0]) {
  const out = [];
  const bearingOf = (x, z) => norm(Math.atan2(x - eye[0], -(z - eye[2])) * 180 / Math.PI);
  const span = (a, b, name) => { const d = arcDelta(a, b); return { name, centre: norm(a + d / 2), half: Math.abs(d) / 2 }; };
  for (const p of scene?.parts ?? []) {
    if (p.part === 'shell' && p.openings) {
      const [w = 0, , d = 0] = p.size ?? [];
      const at = p.at ?? [0, 0, 0];
      for (const [wall, o] of Object.entries(p.openings)) {
        const [across = 0, , width = 0] = Array.isArray(o) ? o : [];
        if (!(width > 0)) continue;
        // `across` runs along the wall: north and south walls run in x, east and west walls run in z.
        if (wall === 'WEST' || wall === 'EAST') {
          const x = at[0] + (wall === 'WEST' ? -w / 2 : w / 2);
          out.push(span(bearingOf(x, at[2] + across - width / 2), bearingOf(x, at[2] + across + width / 2), wall));
        } else if (wall === 'NORTH' || wall === 'SOUTH') {
          const z = at[2] + (wall === 'NORTH' ? -d / 2 : d / 2);
          out.push(span(bearingOf(at[0] + across - width / 2, z), bearingOf(at[0] + across + width / 2, z), wall));
        }
      }
    }
    // A drum states its gaps in bearings already.
    if (p.part === 'drum') for (const g of p.gaps ?? []) if (g.from != null && g.to != null) out.push(span(g.from, g.to, 'gap'));
  }
  return out;
}

// How far inside an opening a bearing is: 1 at the middle of a doorway, 0 at its jambs and beyond. Reported, so a
// review page can say how deep in a door a seam had to sit, but NOT what the cost uses -- see below.
const inOpening = (at, openings) => {
  let worst = 0;
  for (const o of openings) {
    const d = Math.abs(arcDelta(o.centre, at));
    if (d >= o.half) continue;
    worst = Math.max(worst, 0.5 * (1 + Math.cos(Math.PI * d / o.half)));
  }
  return worst;
};

// Whether a bearing is inside an opening at all: 1 or 0, with nothing in between.
//
// This is the shape the cost wants, and the difference from the profile above is the whole of a bug. A tapered
// penalty says the middle of a doorway is much worse than its jamb, and that is not what goes wrong at a seam: a
// door is a hard vertical edge at each jamb and a different room beyond, and either is ruinous in a cross-fade.
// Worse, a taper misbehaves in exactly the case that matters. When an opening is wider than the window a seam is
// allowed to live in -- Deck Nine's corridor mouth is 34.8 degrees across and the window between the views either
// side of it is 30 -- there is no clear position at all, and a tapered penalty then spends its whole budget
// buying a position a degree from a jamb, which is the worst part of the doorway, in exchange for whatever
// disagreement it likes. That is precisely the seam the user photographed: 1.2 degrees inside the jamb with the
// two plates 48 luminance units apart, when 24 degrees away they were 21 apart.
//
// Flat-topped, the term cancels out when every candidate is inside, and the measured disagreement decides -- which
// is the right answer to "this room cannot put a seam on plain wall here": put it where the pictures agree best.
// Where a clear position does exist the step still takes it, and takes it decisively.
const insideOpening = (at, openings) => openings.some(o => Math.abs(arcDelta(o.centre, at)) < o.half) ? 1 : 0;

// Put each boundary where its two views agree best, subject to both being able to reach it.
//
// Placing them on an even grid cuts a symmetric room through its openings -- six views 60 degrees apart put seams
// on 90 and 270, which in the Feinstein's ninth deck are the corridor and the escape-pod door. Placing them away
// from the openings is better and still wrong: a seam can miss every door and fall across a pipe run, and then the
// pipe stops dead at the fade because the next view draws its pipes somewhere else. Nothing in the room model
// knows where the pipework is. Only the artwork does, so the artwork is asked.
//
// Two guards on the asking, both of which the first version wanted:
//
//   The window. A seam is no good in a direction one of its two plates cannot cover at full strength. Searching
//   the whole span let it settle a couple of degrees beyond a plate's reach; the arc was then quietly clipped back
//   to what the lens could do, and the band between was served by nobody but two fading edges. The window is now
//   the directions BOTH plates reach with a margin in hand, so that clip can never bind.
//
//   The pull to the middle. Far from its centre a flat plate is at its worst: the fitted lens is least trustworthy
//   there, the image is most stretched, and what was drawn is furthest from where it was composed to be seen. Left
//   free, the solver gave shares of 34 and 81 degrees to views 60 apart -- one view cut off eight degrees from its
//   own centre while its neighbour was stretched to fifty-two. So being off-centre costs something, measured
//   against each plate's own lens, and a seam leaves the middle only when the pictures disagree enough to pay.
const ELEV = [];
for (let e = -30; e <= 30; e += 3) ELEV.push(e);
const MARGIN = 8;          // degrees of a plate's half-lens kept in hand, so the arc mask never has to clip
// Between a view and one it was built from (builtFrom, scripts/underpaint.mjs) the margin is only what the fade
// needs. The eight degrees above keep a seam off a generated image's rim, which is where it is least trustworthy --
// but a built view's rim, where it meets its source, IS its source's pixels, so there is nothing there to distrust.
// What is left is the fade staying inside both frames -- and the fade itself can be short, since it is there to
// hide two drawings disagreeing, and here they do not. DR-107's dorm needs both: its 90-degree seeds and 110-degree
// side views overlap by 8.6 to 11.4 degrees (the seeds are turned 1.4), which two margins of eight cannot seam
// across and two five-degree fades would not fit.
const FEATHER = 5, BUILT_FEATHER = 2, BUILT_MARGIN = BUILT_FEATHER + 0.5;
const built = (p, q) => (p.builtFrom ?? []).includes(q.id) || (q.builtFrom ?? []).includes(p.id);
const marginOf = (p, q) => built(p, q) ? BUILT_MARGIN : MARGIN;
const OFFCENTRE = 20;      // luminance units charged for a seam pushed all the way to the edge of a lens
// Charged for a seam anywhere inside a doorway. Far larger than any of the others on purpose: where a clear
// position exists it is not a preference to be traded against picture agreement, it is the thing that made the
// user say a door snapped. What makes that safe is the flat top -- see insideOpening. A penalty that is equal
// everywhere inside cannot be spent buying a bad position that happens to be a degree nearer a jamb, and where
// no clear position exists it cancels and leaves the decision to the pictures.
const OPENING = 140;
// Tried and dropped: a term charging for the two plates' SLOPES disagreeing as well as their values, on the
// argument that a pipe run drawn a degree to one side barely moves the mean and is the most obvious thing in the
// frame. The argument still looks right and the measurement did not support it -- on Deck Nine it moved five of
// the six seams by under two degrees and left the doubled pipes above the stairway exactly where they were, for
// the good reason that those pipes run the length of the wall and EVERY position in the window crosses them. That
// is not a seam that is in the wrong place; it is two views that draw the same pipe in two places, which no
// choice of seam can reconcile and which belongs in the brief. Left out rather than left in at zero weight.

// Every way this pair of plates can be hung, because one seam position has to serve all of them.
//
// A state variant inherits its base's arc -- the whole point of the cheap swap -- so the seam chosen here is the
// seam the door state gets too. Solving on the base pictures alone asks how well two drawings of an EMPTY doorway
// agree and then hangs two drawings of a BULKHEAD on the answer. Both pairings are listed, including the lopsided
// ones where only one plate of the pair paints the change, since that is a combination the picker can produce.
function pairings(p, q, sp, sq, gp, gq) {
  const out = [{ state: null, a: sp, b: sq, ga: gp, gb: gq }];
  const pv = p.variants ?? [], qv = q.variants ?? [];
  const has = v => v?.sampler;
  for (const v of pv) {
    const w = qv.find(x => x.state === v.state);
    if (has(v) && has(w)) out.push({ state: v.state, a: v.sampler, b: w.sampler, ga: v.gain, gb: w.gain });
    else if (has(v)) out.push({ state: v.state, a: v.sampler, b: sq, ga: v.gain, gb: gq });
  }
  for (const w of qv) if (has(w) && !pv.some(v => v.state === w.state && has(v)))
    out.push({ state: w.state, a: sp, b: w.sampler, ga: gp, gb: w.gain });
  return out;
}

export function solveSeams(level, samplers, gains, openings = []) {
  return level.map((p, i) => {
    const j = (i + 1) % level.length;
    const q = level[j];
    const span = norm(q.bearing - p.bearing) || 360, m = marginOf(p, q);
    const lo = Math.max(m, span - (q.hfov / 2 - m));
    const hi = Math.min(span - m, p.hfov / 2 - m);
    const mid = span / 2;
    if (!(hi > lo)) return { at: norm(p.bearing + mid), cost: Infinity, reach: false };
    const cases = pairings(p, q, samplers[i], samplers[j], gains[i], gains[j]);
    let best = Math.min(hi, Math.max(lo, mid)) + p.bearing, bestCost = Infinity, bestFit = Infinity, bestWorst = null;
    for (let s = lo; s <= hi + 1e-9; s += 0.5) {
      const at = p.bearing + s;
      // The WORST state, not the average of them. A seam has to be acceptable in every state the room can be in,
      // and averaging lets a base that agrees nicely hide a variant that does not -- which is the failure this
      // whole function was just found to have.
      let fit = -1, worst = null, ok = true;
      for (const c of cases) {
        let cost = 0, n = 0;
        for (const e of ELEV) {
          const a = c.a.at(at, e), b = c.b.at(at, e);
          if (a == null || b == null) continue;
          // Measured on the levelled pictures, because it is the levelled ones that get hung. Without this the
          // cost is mostly the exposure gap, which is smallest where the room is darkest -- and the seams all go
          // there.
          cost += Math.abs(Math.min(255, a * c.ga) - Math.min(255, b * c.gb)); n++;
        }
        if (n < ELEV.length * 0.6) { ok = false; break; }
        if (cost / n > fit) { fit = cost / n; worst = c.state; }
      }
      if (!ok || fit < 0) continue;
      const u = Math.max(s / (p.hfov / 2), (span - s) / (q.hfov / 2));
      const total = fit + OFFCENTRE * u * u + OPENING * insideOpening(norm(at), openings);
      if (total < bestCost) { bestCost = total; bestFit = fit; bestWorst = worst; best = at; }
    }
    return {
      at: norm(best), cost: bestFit, reach: true, states: cases.length,
      worstState: bestWorst, inOpening: +inOpening(norm(best), openings).toFixed(2),
    };
  });
}

// Can this set of views put every seam clear of every opening at all?
//
// The solver above always returns an answer, because it has to draw something. That is the wrong end to find out
// at: by then the images exist and the only lever left is which bad position is least bad. Whether a clear seam
// EXISTS is decided by the view bearings and their lenses alone -- no pixels needed -- so it can be answered the
// moment a set is specified, and a set that cannot is a rework request rather than a thing to code around.
//
// The rule that falls out, and it is the one to write into a brief: PUT A VIEW ON EVERY OPENING, not between two
// of them. An opening between two views forces the seam into it; an opening a view is centred on is carried whole
// by that view and both its seams land on plain wall. An opening wider than the spacing between views must have a
// view of its own whose lens reaches across it with the margin to spare -- Deck Nine's sanitation alcove subtends
// ninety degrees, so the view facing it needs 2 * (45 + margin) = 106 degrees before it can own the whole thing.
export function clearance(level, openings, margin = null) {
  const sorted = [...level].sort((a, b) => a.bearing - b.bearing);
  // A replacement view has to do two jobs: carry the whole opening, and still reach far enough either side to meet
  // its neighbours. Quoting only the first gives a number like 51 degrees, and a 51-degree view would own the
  // doorway and nothing else. So the ask is never narrower than the lenses the set already uses.
  const lenses = sorted.map(p => p.hfov).sort((a, b) => a - b);
  const usual = lenses[lenses.length >> 1] ?? 0;
  return sorted.map((p, i) => {
    const q = sorted[(i + 1) % sorted.length];
    const span = norm(q.bearing - p.bearing) || 360, m = margin ?? marginOf(p, q);
    const lo = Math.max(m, span - (q.hfov / 2 - m));
    const hi = Math.min(span - m, p.hfov / 2 - m);
    const out = {
      from: p.id ?? p.bearing, to: q.id ?? q.bearing,
      window: [norm(p.bearing + lo), norm(p.bearing + hi)], reach: hi > lo, clear: 0, blocking: null,
    };
    if (!out.reach) return out;
    for (let s = lo; s <= hi + 1e-9; s += 0.5) if (!inOpening(norm(p.bearing + s), openings)) out.clear += 0.5;
    if (!out.clear) {
      const mid = norm(p.bearing + (lo + hi) / 2);
      const o = openings.find(x => Math.abs(arcDelta(x.centre, mid)) < x.half);
      // What would fix it: a view of its own, facing the opening, wide enough to carry the whole of it.
      if (o) out.blocking = { name: o.name, centre: o.centre, needsView: o.centre, needsHfov: Math.ceil(Math.max(2 * (o.half + (margin ?? MARGIN)), usual)) };
    }
    return out;
  });
}

// Where a room's views should point, worked out from its openings before anything is drawn (ARTWORK-BRIEF.md, view
// coverage). clearance() answers "can this set be hung"; this answers "which set should be commissioned", by trying
// the sets worth trying and keeping the cheapest that puts every seam on plain wall.
//
// Two families are tried. An EVEN ring of n views at every rotation, which is what a panorama cut into views
// gives and what Deck Nine's four compass doorways want. And a view ON every opening with plain-wall views filling
// any gap too wide to seam across, which is what a room whose openings are not evenly spaced wants -- an even ring
// can only sit on every opening if its spacing divides theirs. Among sets that work: the fewest images; then any
// set leaving the seam a few degrees of wall to settle in beats one that only just clears; then the set whose views
// sit most nearly ON the openings; then the narrowest lens, because a wide view is drawn worst at its edges, which
// is exactly where its seams are.
//
// Clearing a doorway is not the same as facing it. A seam can miss a door that sits 40 degrees off a view's centre,
// and then the door is drawn at the edge of its picture, stretched, and any state of it is an edit near a seam. So
// `offAxis` says how far the worst-placed opening is from the nearest view's centre, and `centred` is the cheapest
// set with a view within five degrees of every opening -- the one to commission for a room whose doors change.
export function planRing(openings = [], { lenses = [100, 105, 110, 115, 120], margin = MARGIN, slack = 4 } = {}) {
  const seen = new Set(), found = [];
  const test = (bearings, hfov, family) => {
    const level = bearings.map(b => ({ bearing: +norm(b).toFixed(1), hfov })).sort((a, b) => a.bearing - b.bearing);
    const key = hfov + ':' + level.map(p => p.bearing).join(',');
    if (seen.has(key)) return;
    seen.add(key);
    const cl = clearance(level, openings, margin);
    if (!cl.every(c => c.reach && c.clear > 0)) return;
    const offAxis = Math.max(0, ...openings.map(o => Math.min(...level.map(p => Math.abs(arcDelta(p.bearing, o.centre))))));
    found.push({ family, views: level.length, hfov, bearings: level.map(p => p.bearing), slack: Math.min(...cl.map(c => c.clear)), offAxis: +offAxis.toFixed(1) });
  };
  for (const hfov of lenses) {
    const reach = hfov - 2 * margin;             // the widest spacing two neighbours can still find a seam across
    for (const n of [4, 5, 6, 8, 12]) {
      const step = 360 / n;
      if (step >= reach) continue;
      for (let off = 0; off < step; off += 1) test(Array.from({ length: n }, (_, k) => off + k * step), hfov, 'even');
      for (const o of openings) test(Array.from({ length: n }, (_, k) => o.centre + k * step), hfov, 'even');
    }
    if (openings.length) {
      const on = [...new Set(openings.map(o => +norm(o.centre).toFixed(1)))].sort((a, b) => a - b);
      const bearings = [];
      on.forEach((b, i) => {
        const next = i + 1 < on.length ? on[i + 1] : on[0] + 360;
        const gap = next - b || 360;
        const fill = Math.ceil(gap / (reach - 1)) - 1;
        for (let k = 0; k <= fill; k++) bearings.push(b + k * gap / (fill + 1));
      });
      test(bearings, hfov, 'on-openings');
    }
  }
  const roomy = p => p.slack >= slack;
  const axis = p => Math.ceil(p.offAxis / 5);   // five-degree buckets: a degree or two either way is not a preference
  found.sort((a, b) => a.views - b.views || roomy(b) - roomy(a) || axis(a) - axis(b)
    || (roomy(a) ? a.hfov - b.hfov : b.slack - a.slack) || b.slack - a.slack);
  const best = found[0];
  if (!best) return null;
  const centred = found.find(p => p.offAxis <= 5) ?? null;
  return { ...best, centred: centred && centred !== best ? centred : null };
}

// Every opening a package states in its walls (`wallOpenings`, ARTWORK-BRIEF.md), as arcs from the eye. Unlike
// the exit table this includes what is not an exit -- Deck Nine's sanitation alcove, a window, a service recess --
// and places a gangway where it actually is, in the north wall, rather than under UP, which names no wall. Where a
// package has both, this is the one to believe; an exit table only ever knew about the doorways.
export function openingsFromWalls(walls = {}, eye = [0, 1.6, 0]) {
  const out = [];
  for (const [id, o] of Object.entries(walls)) {
    const w = o?.width, at = o?.position;
    if (!(w > 0) || !Array.isArray(at) || !FACING[o.wall]) continue;
    out.push({ name: id, ...aperture(at, w, o.wall, eye) });
  }
  return out;
}

// A room's openings from the best source it has, and which one that was. The package's `wallOpenings` first: the
// package is the authority on the room, and it is the only source that knows about recesses and windows. Then the
// scene file's shell, which is dev's model of the room and knows every wall it cuts. Then the exit table, which
// knows only doorways.
export function roomOpenings(meta, scene) {
  const eye = meta?.eye ?? [0, 1.6, 0];
  const walls = openingsFromWalls(meta?.wallOpenings ?? {}, eye);
  if (walls.length) return { openings: walls, source: 'wall openings' };
  const built = scene ? openingsOf(scene, eye) : [];
  if (built.length) return { openings: built, source: 'scene file' };
  const exits = openingsFromExits(meta?.exits ?? {}, eye);
  return { openings: exits, source: exits.length ? 'exit table' : 'none stated' };
}

// Which of a turn's views would have to be repainted for something at this bearing to change.
//
// This is what makes a second state affordable. A room with eight views does NOT cost eight more images per state:
// only the views whose lens contains the thing that changed have to be drawn again, and on Deck Nine that is two
// for the pod door and two for the corridor bulkhead. Worth knowing before commissioning a state, and worth
// telling the person who has to draw them.
// What counts is the arc a view actually DRAWS, not the arc its lens could reach. A 119-degree view hung on a
// 33-degree share contributes nothing outside that share plus its fade, so redrawing it for something it cannot
// put on screen is wasted work. Deck Nine's gangway bulkhead is inside the lens of three views and inside the
// drawn arc of one; asking for three would have been two images of nobody's business. Before the seams are solved
// a plate has no arc, and then the lens is the honest answer.
export function viewsSeeing(plates, opening) {
  return plates
    .filter(p => {
      if (isCap(p)) return false;
      const d = Math.abs(arcDelta(p.bearing, opening.centre)) - (opening.half ?? 0);
      if (!p.arc) return d < p.hfov / 2;
      const [left, right] = p.arc;
      const towards = arcDelta(p.bearing, opening.centre);
      const fade = Array.isArray(p.arcFeather) ? p.arcFeather[towards < 0 ? 0 : 1] : (p.arcFeather ?? 0);
      const reach = (towards < 0 ? left : right) + fade;
      return d < reach;
    })
    .sort((a, b) => a.bearing - b.bearing)
    .map(p => p.id);
}

// A room is not one picture, and a set of views is not one state.
//
// Deck Nine's delivered views are all painted with the pod door shut. In a complete turn the painting IS the room
// -- every built part is an invisible pick target, because the artwork already shows it -- so opening that door
// moves the pick target and the label and cannot change the picture. The fix is artwork, not code (DR-100), but
// the code has to be ready to receive it, and it only takes ONE view per camera to change: the rest of the turn
// is untouched, which is what makes a state cost two or three images instead of a whole set.
//
// A view says which state it depicts in its `state` field. Today that is prose -- "pod door shut; gangway and east
// emergency openings clear" -- which documents the delivery and cannot be matched against a running game. A view
// whose `state` parses as a CONDITION in the grammar the scene files already use is a variant, and is hung only
// while that condition holds. Parseability is the test, using the same parser, so the two cannot drift: prose
// yields no atoms and stays the base.
const conditional = expr => expr != null && expr !== '' && atoms(expr).length > 0;

// One plate per camera, carrying its variants. Views are grouped by where they point, because a variant is the
// same shot of the same wall with one thing changed -- if it were framed differently it could not be swapped in
// without moving the seams that were solved around it.
function foldVariants(plates) {
  const groups = new Map();
  for (const p of plates) {
    const key = `${p.bearing}|${p.pitch}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  }
  const bases = [];
  for (const group of groups.values()) {
    // The base is the view the others are variants OF, and it NEVER competes with them. Once a delivery labels its
    // base views too -- Deck Nine's carry the routine-duty condition, which has two leaf conditions where a
    // variant's has one -- a base treated as just another candidate outranks its own variants on specificity and
    // they can never be hung. The base is the default; a variant is a departure from it; departures win.
    const base = group.find(p => !conditional(p.state)) ?? group.find(p => !p.id.includes('@')) ?? group[0];
    // Most specific first among the DEPARTURES, so a view painted for two things being true at once beats either
    // of the two that show only one of them. Specificity is the number of leaf conditions, counted by the same
    // parser that evaluates them, rather than by the order the metadata happens to be written in.
    // The sampler and gain travel with the variant, not because hanging needs them -- hanging needs the baked
    // texture and nothing else -- but because the seam solver has to be able to MEASURE the state it is choosing
    // a seam for, and the only handle on those pixels is the sampler that was built to level them.
    base.variants = group.filter(p => p !== base && conditional(p.state))
      .map(p => ({ state: p.state, texture: p.texture, id: p.id, depth: atoms(p.state).length, sampler: p.sampler, gain: p.gain }))
      .sort((a, b) => b.depth - a.depth);
    base.baseTexture = base.texture;
    bases.push(base);
  }
  return bases;
}

// The parts a room is built from once its painted turn is hung. A complete turn draws the room by itself: the built
// fabric would otherwise show through wherever two plates cross-fade, so only its pick proxies stay -- what puts the
// game's door on the painted one. Except for what the painting does not know about: a conditional part none of whose
// conditions any delivered view branches on is an ADDITION (the ambassador's slime trail on the deck, which no view
// is painted with), and dropping it leaves a switch that changes nothing. Structural changes are painted; additive
// ones stay engine-drawn and compose with whatever state the painting is in. A part is painted, too, when its
// condition is exactly the state the base views were painted in: the Kitchen's views are all "KITCHEN-DOOR without
// OPENBIT", so its shut door is in the picture, and drawing the fabric's leaf over it put a black slab in the doorway
// (2026-09-14). Shared by the review page and the game, so the two can never hang a room differently.
//
// And when its condition is PART of that state: Lawanda is painted "ALFIE-AT-KALAMONTEE == true and
// BETTY-AT-KALAMONTEE == false", and the fabric's Betty car is drawn when "BETTY-AT-KALAMONTEE == false" -- the car the
// north view shows. Matched only on the whole string, the car's boxes stood in front of the painting the moment the
// room was whole (2026-09-14). So a condition made only of `and`ed clauses, every one of them a clause of a painted
// state, is painted.
//
// Grouping parentheses in a condition made only of `and`s change nothing, and are flattened: the shuttle scenes write
// "(BETTY-AT-KALAMONTEE == false and SHUTTLE-MOVING == false) and SHUTTLE-MOVING == false", and refused for its
// parentheses it never counted as painted, so the review reported it drawn over the picture (2026-09-19). A condition
// with an `or` or a `not` anywhere is still refused: its clauses are not all required.
const clauses = s => {
  const text = ` ${s ?? ''} `;
  if (/\s(or|not)\s|^\s*not\s/i.test(text.replace(/[()]/g, ' '))) return null;
  const out = [...new Set(String(s).replace(/[()]/g, ' ').trim().split(/\s+and\s+/i).map(c => c.trim().replace(/\s+/g, ' ')).filter(Boolean))];
  return out.length ? out : null;
};
//
// An OVERLAY (a package's `overlays`, scene/design.js) is kept whatever its condition: it is drawn over the
// painting because no painting can show it -- the shuttle's lever off centre, its display reading the speed, the
// tunnel going by -- and its condition may well be on a global the painted variants branch on (SHUTTLE-MOVING). One
// cut from a view (`view`) takes that view's levelling gain, so it matches the pixels round it -- and is not drawn
// at all where that view is not hung: a patch of a painting over the bare fabric is a scrap of picture in mid-air.
export function partsForTurn(overrides, turn) {
  const paintedAs = (turn?.painted ?? []).map(s => new Set(clauses(s) ?? [String(s).trim()]));
  const isPainted = when => { const own = clauses(when); return !!own && paintedAs.some(st => own.every(c => st.has(c))); };
  const gainOf = id => (turn?.plates ?? []).find(p => p.id === id)?.gain;
  const withGain = p => (p?.overlay && p.view && gainOf(p.view) != null ? { ...p, gain: gainOf(p.view) } : p);
  const hung = p => !(p?.overlay && p.view) || gainOf(p.view) != null;
  const unpainted = (overrides.parts ?? []).filter(p => {
    if (p?.overlay === true) return true;
    const own = atoms(p.when);
    return own.length && !isPainted(p.when) && !own.some(x => (turn?.states ?? []).some(st => atoms(st).some(y => y.key === x.key)));
  });
  return (turn?.whole ? [...seen(overrides, unpainted), ...masks(overrides, unpainted), ...turn.plates]
    : [...(overrides.parts ?? []), ...(turn?.plates ?? [])]).filter(hung).map(withGain);
}

// The fabric the paintings show, put back as DEPTH ONLY (scene/parts.js MASK_ORDER, DR-117). Dropping the fabric is
// right -- built walls show through wherever two plates cross-fade -- but it also empties the depth buffer, and the
// plates write no depth of their own, so nothing drawn over a painting could be hidden by the room it stands in. The
// Tool Room's magnet, seated exactly on the 1.85 m board and 0.27 m above the eye, drew its whole picture in front of
// the board's front edge instead of being cut by it ("magnet is not ON the shelf, its like hanging in front of the
// shelf"). A mask writes no pixels, so the picture is untouched; it only gives the painting's own solids a depth.
//
// The same solids occlusion.js judges the additions against, and for the same reason -- so the two can never
// disagree about what the paintings show. An ADDITION is left out: the painting does not show it, it is drawn for
// real, and it writes its own depth like anything else.
const masks = (overrides, additions) => {
  const extra = new Set(additions);
  return (overrides.parts ?? []).filter(p => !extra.has(p) && isOccluder(p)).map(p => ({ ...p, mask: true }));
};

// Over a whole turn nothing writes depth for the walls the paintings show, so an addition behind one is drawn over
// the picture of it: the Bio Lab's lamps, which the Bio Locks' scenes carry for their door and window, came out as
// white slivers across the locks' walls with the lab lights on (2026-09-18). So an addition a wall hides is dropped,
// and one a door's leaves hide is drawn only while they are open (scene/occlusion.js visibleWhen). Props and lamps
// only: a decal, a trail or a cutout is placed on a surface or in the open on purpose, and an overlay is drawn over
// the painting because it has to be. Worked out once per room's parts, since a switch rebuilds the room.
const seenCache = new WeakMap();
function seen(overrides, additions) {
  const parts = overrides.parts ?? [], eye = overrides.eye ?? [0, 1.6, 0];
  // The fabric is what the paintings show; the other additions are drawn, and hide each other by depth.
  const extra = new Set(additions), fabric = parts.filter(p => !extra.has(p));
  const key = additions.length + '|' + eye.join(',');
  let byParts = seenCache.get(parts);
  if (!byParts) seenCache.set(parts, byParts = new Map());
  let memo = byParts.get(key);
  if (!memo) byParts.set(key, memo = new Map());
  return additions.flatMap(p => {
    if (p?.overlay === true || (p?.part !== 'prop' && p?.part !== 'light')) return [p];
    if (!memo.has(p)) memo.set(p, visibleWhen(p, fabric, eye));
    const w = memo.get(p);
    if (w === (p.when ?? null)) return [p];
    // A lamp's light still falls where its housing cannot be seen: the fabric a state draws over the paintings is lit
    // by it (the Lower Elevator's car, seen with the car up, went dark when its lamps were dropped whole). So a hidden
    // lamp keeps its cast on its own condition, housing: false, and only the housing takes the visibility test.
    if (p.part === 'light' && p.cast && p.housing !== false) {
      const cast = { ...p, housing: false };
      return w == null ? [cast] : [cast, { ...p, cast: undefined, when: w }];
    }
    return w == null ? [] : [{ ...p, when: w }];
  });
}

// Hang the variant whose condition holds, or the base where none does. Cheap on purpose: a state change swaps a
// texture that is already decoded and levelled, so a switch on the review page is instant rather than a reload.
// Returns the ids actually hung, which is what lets a page say what it is showing instead of implying it.
export function pickVariants(turn, game) {
  const showing = [];
  for (const p of turn?.plates ?? []) {
    const hit = (p.variants ?? []).find(v => { try { return when(game, v.state); } catch { return false; } });
    p.texture = hit ? hit.texture : (p.baseTexture ?? p.texture);
    showing.push(hit ? hit.id : p.id);
  }
  return showing;
}

// The review page's state presets: one per distinct state the room's painted variants hang on, and one for the state
// its base views are painted in. A variant hangs on a whole compound state -- the Alfie cabin's shut door wants the car
// at Kalamontee, Betty away, the shuttle moving and the door shut all at once -- which one-at-a-time switches cannot
// reach, so the page fell back to the base painting and the door stayed open (the user, 2026-09-18). A preset carries
// the condition exactly as the variants are registered with it (so pickVariants hangs them), the name after the `@`,
// and the package state it answers, for the description: by the same name, else the same condition, else a name
// ending in it (the Balcony's DAY-2 is its FLOOD-DAY-2).
// Returns [{ name, condition, base, views: [{ id, bearing, pitch }], state, description }], the base first.
export function presetsFor(meta) {
  const refs = hungViews(meta), states = meta?.states ?? {};
  const cond = v => String(v?.state ?? '').trim();
  const describe = (name, c) => {
    const hit = Object.entries(states).find(([k]) => k === name)
      ?? Object.entries(states).find(([, s]) => String(s?.condition ?? '').trim() === c)
      ?? Object.entries(states).find(([k]) => name && k.endsWith(`-${name}`))
      ?? (name ? null : Object.entries(states).find(([k]) => /^BASE\b/.test(k)));   // the Alfie cabin's BASE-KALAMONTEE
    if (!hit) return { state: null, description: '' };
    const [k, s] = hit;
    const words = [s.description, s.notes, ...(Array.isArray(s.changes) ? s.changes : [])].filter(Boolean);
    return { state: k, description: words.join(' ').trim() };
  };
  const view = ([id, v]) => ({ id, bearing: v.bearing, pitch: v.pitch ?? 0 });
  // The base views' state: the one most of them are registered with (a view marked "true" is painted for any state).
  const counts = new Map();
  for (const [id, v] of refs) if (!id.includes('@')) counts.set(cond(v), (counts.get(cond(v)) ?? 0) + 1);
  const baseCond = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
  const out = [{ name: 'base', condition: conditional(baseCond) ? baseCond : '', base: true,
    views: refs.filter(([id]) => !id.includes('@')).map(view), ...describe(null, baseCond) }];
  if (!out[0].description) out[0].description = 'The state the base views are painted in.';
  for (const e of refs) {
    const [id, v] = e;
    if (!id.includes('@') || !conditional(cond(v))) continue;   // an unconditional variant never hangs (foldVariants)
    const had = out.find(p => !p.base && p.condition === cond(v));
    if (had) { had.views.push(view(e)); continue; }
    let name = id.slice(id.indexOf('@') + 1);
    if (out.some(p => p.name === name)) name = `${name} (${out.filter(p => p.name.startsWith(name)).length + 1})`;
    out.push({ name, condition: cond(v), base: false, views: [view(e)], ...describe(name, cond(v)) });
  }
  return out;
}

// Put the game into a preset's state: back to where the page started, then the base views' state, then the preset's
// own condition (parts.js satisfy). Returns { holds, unmet }: whether the condition is true afterwards, and the clauses
// that could not be set -- or, where every clause was set and it still does not hold, that the clauses contradict.
export function applyPreset(game, preset, { start = null, base = null } = {}) {
  if (start != null) game.load(start);
  const unmet = [];
  if (base?.condition && !preset.base) satisfy(game, base.condition);
  if (preset.condition) satisfy(game, preset.condition, true, unmet);
  const holds = !preset.condition || when(game, preset.condition);
  if (!holds && !unmet.length) unmet.push(`${preset.condition}: every clause was set and it still does not hold, so the clauses contradict each other`);
  return { holds, unmet };
}

// Each level view's REAL lens, measured from where it overlaps its neighbours.
//
// A generator does not hit a requested lens, so a view's `hfov` is what was asked for, not what was drawn (brief
// 1.4). Deck Nine's were fitted by hand against doorway jambs at known bearings; that needs a doorway in every view
// and a person to find it. This needs neither: two neighbouring views both draw the band of room between them, and
// through the right lenses that band lines up. Through a wrong one it slides -- too wide a lens and the view's
// content sits too close to its centre, so every feature in the overlap lands short of where its neighbour has it.
// So each view in turn takes the lens that makes its overlaps agree best with its neighbours as they currently
// stand, after matching exposure (the median ratio over the shared directions, as fitGains does), and the round
// repeats until the lenses settle.
//
// It can only measure what the pictures give it. A plain wall looks the same through any lens, so each fit comes
// with its `sharpness`: how much worse five degrees either side would be. A soft minimum is reported, not trusted.
export function fitLenses(level, samplers, { span = 30, step = 0.5, rounds = 4, elev = ELEV, min = 60 } = {}) {
  const n = level.length;
  const lens = level.map(p => p.hfov);
  const score = (i, h) => {
    let total = 0, count = 0;
    const me = samplers[i].withLens(h).at;
    for (const j of new Set([(i + n - 1) % n, (i + 1) % n])) {
      if (j === i) continue;
      const other = samplers[j].withLens(lens[j]).at;
      const pairs = [];
      for (let d = -h / 2; d <= h / 2; d += 1) {
        const b = level[i].bearing + d;
        for (const e of elev) {
          const a = me(b, e, 0.95), c = other(b, e, 0.95);
          if (a != null && c != null && a > 4 && c > 4) pairs.push([a, c]);
        }
      }
      if (pairs.length < min) continue;
      const ratios = pairs.map(([a, c]) => c / a).sort((x, y) => x - y);
      const g = ratios[ratios.length >> 1];
      for (const [a, c] of pairs) { total += Math.abs(a * g - c); count++; }
    }
    return count ? total / count : Infinity;
  };
  const mean = () => { const s = lens.map((h, i) => score(i, h)).filter(Number.isFinite); return s.length ? s.reduce((a, b) => a + b, 0) / s.length : null; };
  const before = mean();
  for (let r = 0; r < rounds; r++) {
    for (let i = 0; i < n; i++) {
      let best = lens[i], bestScore = score(i, lens[i]);
      for (let h = level[i].hfov - span; h <= level[i].hfov + span + 1e-9; h += step) {
        if (h < 40 || h > 150) continue;
        const s = score(i, h);
        if (s < bestScore) { bestScore = s; best = h; }
      }
      lens[i] = best;
    }
  }
  const fits = lens.map((h, i) => {
    const s = score(i, h), side = (score(i, h - 5) + score(i, h + 5)) / 2;
    return { id: level[i].id ?? level[i].bearing, asked: level[i].hfov, fitted: +h.toFixed(1), disagreement: +s.toFixed(1), sharpness: Number.isFinite(side) ? +(side - s).toFixed(1) : null };
  });
  return { fits, before: before == null ? null : +before.toFixed(1), after: mean() == null ? null : +mean().toFixed(1) };
}

// Whether a set of views draws the whole room by itself: the level views meet all the way round -- every seam is
// one both neighbours can reach -- and there is a cap above and a cap below. This used to be "six views or more",
// which was true of Deck Nine and false as a rule: the brief (1.2) commissions four or five, and a four-view ring
// that meets is as whole as a six-view one, while six views that leave a gap are not.
export function isWhole(level, seams, plates) {
  return level.length >= 3 && seams.length === level.length && seams.every(s => s.reach)
    && plates.some(p => isCap(p) && p.pitch > 0) && plates.some(p => isCap(p) && p.pitch < 0);
}

// A cap looks up or down; a level view looks at the walls. Level does not mean a pitch of exactly zero: a seed is
// hung at the camera it was painted from, and the dorm seeds were painted looking 1.95 degrees down (DR-107). Read
// as "pitch is not zero", they were taken for floor caps -- pulled out of the ring, hung at a cap's lens, and
// counted as the room's floor, so a room with no caps at all would have passed as whole.
export const isCap = p => Math.abs(p.pitch ?? 0) >= 45;

// The plates for a room, ready to pass to buildRoom as parts, or [] if the package has no turn.
// `design[room].referenceImages` supplies the cameras; `packages[room].files` supplies the URLs.
// The reference images a room's turn is hung from: any with a set and a bearing, whatever the key is called. One rule,
// used here and by scripts/build-site.mjs to choose what the public site ships -- the site once shipped only TURN-*,
// and SanFac A's north and south views are VIEW-A and VIEW-B, so the hosted game showed a black hole there
// (the user, 2026-09-14).
export const hungViews = meta => Object.entries(meta?.referenceImages ?? {}).filter(([, v]) => v?.set && v.bearing != null && v.path);

export async function turnFor(room, design, packages, scene, fitted = {}) {
  const files = packages?.[room]?.files ?? [];
  const refs = hungViews(design?.[room]);
  if (!refs.length) return { plates: [], seams: [], whole: false };

  // A state view is the SAME CAMERA as the view it replaces, re-rendered with a door shut. Where the metadata
  // leaves its lens unstated it inherits the lens of the view at its bearing, rather than falling back to the
  // generic default -- which on Deck Nine meant every state image was measured as a 74 degree view when the views
  // they replace are 101 to 120. That is not a cosmetic error: the sampler maps bearings to pixels through the
  // lens, so the exposure fit compared the wrong pixels and baked the wrong gain into each state image, and the
  // seam solver would have measured agreement at the wrong directions too.
  const lens = baseLenses(refs);

  const plates = (await Promise.all(refs.map(async ([id, r]) => {
    const file = files.find(f => f.name === r.path.split('/').pop());
    if (!file) return null;
    // An image's aspect is declared nowhere and is not assumed: a delivered set mixes 16:9 and 2.25:1, and at a
    // fixed lens the aspect is what decides how much of the room the view covers vertically.
    const aspect = await new Promise(done => {
      const img = new Image();
      img.onload = () => done(img.naturalWidth / img.naturalHeight);
      img.onerror = () => done(16 / 9);
      img.src = file.url;
    });
    const level = !isCap(r);
    // A lens dev has fitted and recorded (data/lens-fits.json) is hung in place of the one the package asked for;
    // the package's number stays what was asked, and neither overwrites the other (brief 1.4). A variant inherits
    // its base's fit exactly as it inherits its base's lens.
    const base = id.split('@')[0];
    const declared = fitted?.[room]?.[base] ?? r.hfov ?? lens.get(`${r.bearing}|${r.pitch ?? 0}`);
    return {
      part: 'plate', id, image: file.url, bearing: r.bearing, pitch: r.pitch ?? 0, builtFrom: r.builtFrom ?? [],
      // Every view hangs at the lens it declares, or at the one dev has fitted and recorded. Caps used to be hung at
      // least 130 wide whatever they declared, so Deck Nine's 110-degree caps would meet the walls; that is now a
      // recorded decision in lens-fits.json, because a cap built for its lens (scripts/underpaint.mjs) has to hang
      // at exactly that lens to meet the views it was built from.
      hfov: declared ?? (level ? 74 : 110),
      aspect, distance: 12, gain: 1, state: r.state ?? null,
      // Plates take no scene fog (parts.js plate) unless the room's fog is meant to be in its paintings as well.
      ...(design?.[room]?.lighting?.fog?.plates === true ? { fog: true } : {}),
    };
  }))).filter(Boolean);

  const samplers = await Promise.all(plates.map(sampler));
  // Level the views of the room against each other -- caps included, since they overlap the level views near the
  // top and bottom of the walls -- and then tie each state view to the one it replaces separately. A variant in
  // the ring fit is a plate whose overlap is total and whose content is deliberately different, which is the one
  // shape of input the median-of-ratios cannot survive; see tieExposure.
  const baseOf = new Map();
  plates.forEach((p, i) => {
    if (!p.id.includes('@')) return;
    const j = plates.findIndex(o => !o.id.includes('@') && o.bearing === p.bearing && (o.pitch ?? 0) === (p.pitch ?? 0));
    if (j >= 0) baseOf.set(i, j);
  });
  const ring = plates.map((_, i) => i).filter(i => !baseOf.has(i));
  const fit = fitGains(ring.map(i => samplers[i]));
  const gains = new Array(plates.length).fill(1);
  ring.forEach((i, k) => { gains[i] = fit.gains[k]; });
  const ties = [];
  for (const [i, j] of baseOf) {
    const ratio = tieExposure(samplers[j], samplers[i], plates[j]);
    gains[i] = gains[j] * ratio;
    ties.push({ id: plates[i].id, of: plates[j].id, ratio: +ratio.toFixed(3), gain: +gains[i].toFixed(3) });
  }
  const { pairs, residual } = fit;
  plates.forEach((p, i) => {
    p.gain = gains[i];
    p.sampler = samplers[i];
    // Baked, not passed to the material, so the correction happens in the space it was measured in. Every view is
    // baked, not only the ones whose gain moved, because swapping a state variant in swaps a texture and they all
    // have to be the same kind of thing.
    p.texture = samplers[i].bake(gains[i]);
  });

  const { openings } = roomOpenings(design?.[room], scene);
  // Fold each camera's state variants onto the one plate that is hung there. Everything below works on the bases.
  const bases = foldVariants(plates);
  const order = bases.map((p, i) => i).filter(i => !isCap(bases[i])).sort((a, b) => bases[a].bearing - bases[b].bearing);
  const level = order.map(i => bases[i]);
  const level0 = order.map(i => plates.indexOf(bases[i]));        // back to the index the samplers use
  // What each view's lens measures as, from its overlaps -- reported, not applied. Applying it is a decision: a soft
  // fit on a plain wall would move a view for nothing, so dev reads the fits and records the ones worth trusting.
  const lensFit = level.length >= 3 ? fitLenses(level, level0.map(i => samplers[i])) : null;
  let seams = [];
  if (level.length >= 3) {
    // level0 is by position in the ring, so it is mapped directly. It was once reached through `order`, which holds
    // base indices, and that picked the wrong view's pixels whenever the metadata did not list the views in bearing
    // order -- Dorm A lists north, south, east, west, and its north-east seam was solved against the SOUTH view.
    seams = solveSeams(level, level0.map(i => samplers[i]), level0.map(i => gains[i]), openings);
    level.forEach((p, i) => {
      const right = Math.abs(arcDelta(p.bearing, seams[i].at));
      const left = Math.abs(arcDelta(p.bearing, seams[(i - 1 + seams.length) % seams.length].at));
      p.arc = [left, right];
      const prev = level[(i - 1 + level.length) % level.length], next = level[(i + 1) % level.length];
      p.arcFeather = [built(prev, p) ? BUILT_FEATHER : FEATHER, built(p, next) ? BUILT_FEATHER : FEATHER];
    });
  }
  // A complete turn draws the room by itself; anything less needs the built room behind it to fill the gaps.
  const whole = isWhole(level, seams, bases);
  // With nothing behind them to hide, the plates can respect depth, which is what lets an actor or a dropped thing
  // stand in front of the painting instead of being painted over.
  if (whole) for (const p of bases) p.depth = true;
  // Answered whether or not it was needed, so a room whose set cannot be hung cleanly says so on the page that
  // reviews it rather than waiting for someone to notice a door behaving oddly.
  const room_clearance = level.length >= 3 ? clearance(level, openings) : [];
  // The states the delivered artwork actually depicts. One entry means the room is painted in a single state, so
  // anything the game can change about its fabric changes the pick targets and not the picture.
  const painted = [...new Set(plates.map(p => p.state).filter(Boolean))];
  // The states the artwork can actually be SWITCHED between, as opposed to the prose describing what it depicts.
  const states = [...new Set(bases.flatMap(p => (p.variants ?? []).map(v => v.state)))];
  // Each overlapping pair by the views' own names, with its residual after levelling -- the number the brief's 0.95
  // to 1.05 bar is about (brief 2.3, 5.3), in a form a review can quote without knowing the ring's internal order.
  const residualById = pairs.map((p, k) => ({ a: plates[ring[p.i]].id, b: plates[ring[p.j]].id, residual: +residual[k].toFixed(3) }));
  return { plates: bases, seams, whole, gains, overlaps: pairs, residual, residualById, ties, openings, clearance: room_clearance, painted, states, lensFit };
}

export { plateFrame };
