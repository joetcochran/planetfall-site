// What a click in the scene reaches, and whether a thing on screen can be clicked at all. No THREE import, so the
// rules can be tested in node with the vendored core (scripts/tests/pickrule.mjs); view.js hands in its raycaster.
//
// NAME PLATES ARE CLICK TARGETS (the user's triage, 2026-09-23). A plate is drawn over everything -- its material
// ignores the depth buffer -- so a player reads it as the thing and clicks it. Before this a click on a plate went
// straight through to whatever the ray met behind it, or to nothing: the mini card lying at the player's feet was
// on screen only as its plate, and the plate did nothing (playtest 2026-09-23, item 19).
// Only an OBJECT's plate counts, the ones graybox.js marks with `labelFor`; exit and scenery plates behave as before.

// The plates a click can reach this frame: the room's sprites that name an object with a pickable, and that
// View.layOutLabels is showing now. The raycaster does not look at `visible`, and a plate the layout hid for a crowd
// must not take clicks it is not drawn to take.
export function plateTargets(root, pickables) {
  const out = [];
  if (!root) return out;
  const byId = new Map();
  for (const p of pickables) if (p.kind === 'object' && !byId.has(p.id)) byId.set(p.id, p);
  root.traverse(o => {
    if (!o.isSprite || !o.userData?.label || o.userData.labelFor == null) return;
    const p = byId.get(o.userData.labelFor);
    if (!p) return;
    for (let a = o; a; a = a.parent) if (a.visible === false) return;
    out.push({ sprite: o, pickable: p });
  });
  return out;
}

// One click's answer, from a raycaster already set from the camera. The plate is on top of everything, so any plate
// the ray meets wins over any mesh, whatever their distances; among plates the nearest, which is the one drawn last.
// Returns { pickable, via: 'plate' | 'mesh' } or null.
export function pickWith(ray, pickables, plates = []) {
  if (plates.length) {
    const hits = ray.intersectObjects(plates.map(t => t.sprite), false);
    if (hits.length) {
      const t = plates.find(t => t.sprite === hits[0].object);
      if (t) return { pickable: t.pickable, via: 'plate' };
    }
  }
  const hit = ray.intersectObjects(pickables.map(p => p.mesh), true)[0];
  if (!hit) return null;
  let o = hit.object; while (o && !o.userData.pickable) o = o.parent;
  return o ? { pickable: o.userData.pickable, via: 'mesh' } : null;
}

// ------------------------------------------------------------------ can a player click it?
// The browser harness (scripts/browser.mjs) used to open a menu by the object's id, so it never noticed four things
// in one playtest that a player could not click: a flask under a fluid box, a bedistor under a plate, a bottle
// inside a shelf proxy, a card at the feet. Now it turns to the thing, samples a grid of points across its box on
// screen, and asks the page's own pick() what each one reaches. These are the limits it fails on.
//
// MIN_TARGET_PX, 12 x 12 CSS px at the harness's 1400 x 900 viewport. WCAG 2.2's minimum target (2.5.8) is 24 px,
// but it lets a smaller target pass when it stands clear of its neighbours, and a thing in a room is exactly that
// case: the grid below already measures whether its neighbours take its clicks. Below 12 a target is under the
// height of the page's own 13-14 px menu text and a third of a fingertip, and the one the user could not find --
// the fused bedistor on the cube's lid, 21 x 12 before the view turned and 14 x 10 after -- falls under it, while
// the small props the user has clicked without complaint (the kit, the canteen, the keys across a room) are well
// over. Raise it with --min-target when the question is comfort rather than possibility.
//
// MIN_COVER 0.75: of the grid points whose ray meets the thing's own mesh, at least three in four must reach it.
// A player aims at the middle of what they see; if more than a quarter of it gives another thing's menu, a click
// misfires often enough to be noticed. The filled flask (73 of 81, 90%) passes on this measure -- its fault was the
// black box drawn over it -- while the Infirmary's bottle (0 of 81) and anything half under a plate fail.
export const MIN_TARGET_PX = 12;
export const MIN_COVER = 0.75;
export const GRID = 9;

// n x n points across a screen rect, each at the middle of its cell, so a thin target still gets a row through it.
export function sampleGrid(rect, n = GRID) {
  const pts = [];
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) pts.push({ x: rect.x + (i + 0.5) * rect.w / n, y: rect.y + (j + 0.5) * rect.h / n });
  return pts;
}

// The verdict on one target. `rect` is its projected box on screen, clipped to the viewport ({x, y, w, h} in CSS px,
// or null when none of it is on screen); `samples` are the grid points, each { x, y, on: the ray meets the target's
// own mesh, reached: pick() answered the target, by: what pick() answered instead (a name), plate: that answer came
// by a plate }. `plate` is the target's own name plate, { shown, reaches } -- reported, never a pass: the step is
// about the thing, and a plate the layout can drop in a crowd is no promise. Returns { ok, reason, click, numbers }.
export function judgeTarget({ name, rect, samples, plate = null, minPx = MIN_TARGET_PX, minCover = MIN_COVER }) {
  const on = samples.filter(s => s.on), hit = on.filter(s => s.reached);
  const cover = on.length ? hit.length / on.length : 0;
  const blockers = {};
  for (const s of on) if (!s.reached) { const k = (s.by ?? 'nothing') + (s.plate ? "'s name plate" : ''); blockers[k] = (blockers[k] ?? 0) + 1; }
  const blockedBy = Object.entries(blockers).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} (${n})`).join(', ');
  // Tenths, not whole pixels: 11.6 rounds to 12 and read as "12x12, under the 12x12 minimum".
  const px = v => String(Math.round(v * 10) / 10);
  const size = rect ? `${px(rect.w)}x${px(rect.h)} px` : 'off screen';
  const numbers = { size, w: rect?.w ?? 0, h: rect?.h ?? 0, points: samples.length, on: on.length, reached: hit.length, cover, blockedBy, plate };
  // Click the reaching point nearest the middle of those that reach: the middle of what can be clicked, not of the box.
  let click = null;
  if (hit.length) {
    const cx = hit.reduce((a, s) => a + s.x, 0) / hit.length, cy = hit.reduce((a, s) => a + s.y, 0) / hit.length;
    click = hit.reduce((b, s) => (Math.hypot(s.x - cx, s.y - cy) < Math.hypot(b.x - cx, b.y - cy) ? s : b));
  }
  const plateNote = !plate ? '' : !plate.shown ? '; its name plate is not showing' : plate.reaches ? '; its name plate is showing and a click on it opens its menu' : '; its name plate is showing but a click on it does not reach it';
  const fail = reason => ({ ok: false, reason: reason + plateNote, click, numbers });
  if (!rect) return fail(`${name} is not on screen after turning to it`);
  if (!hit.length) return fail(`no click reaches ${name}: 0 of ${on.length} points on its ${size} box` + (blockedBy ? ` -- covered by ${blockedBy}` : on.length ? '' : ' (no grid point met it)'));
  if (rect.w < minPx || rect.h < minPx) return fail(`${name} is too small to click: ${size} on screen, under the ${minPx}x${minPx} px minimum (${hit.length} of ${on.length} points reach it)`);
  if (cover < minCover) return fail(`${name} is covered: ${hit.length} of ${on.length} points on it reach it (${Math.round(cover * 100)}%, under ${Math.round(minCover * 100)}%) -- the rest reach ${blockedBy}`);
  return { ok: true, reason: null, click, numbers };
}
