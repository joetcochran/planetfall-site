// The day-phase lighting rig (DR-060): make the scene read the light every package already carries.
//
// Every sky room's metadata holds a complete `states.DAY-PHASE` -- zenith and horizon colours, an ambient colour
// and intensity, a key light with kind, direction, colour and intensity, a sea tone, a fog tone and
// `interiorLightsOn` -- and `SHARED-ROOM-METADATA.json` holds the same three looks as defaults. All of it was
// authored, reviewed and approved, and until now the renderer threw every value away: one HemisphereLight at 1.6
// and a flat `#05090e` background, the same for the Helipad at noon and a windowless corridor at midnight. That is
// most of what "the rooms look blocky" actually means -- not the geometry, the light on it.
//
// This module is the pure half: given the phase, the room's metadata and the shared defaults, it works out what
// the scene should look like and returns a plain description. view.js turns that into THREE objects. Keeping the
// arithmetic here is what lets scripts/tests/lighting.mjs check the values without a browser.

// `when` and `atoms` read the same little condition language the scene files and the packages use, so a grade
// keyed on a state is evaluated by exactly the parser that decides everything else conditional in this game.
import { when, atoms } from './parts.js';

// An interior is lit by its own fixtures, not by the sky. The day phase still reaches it -- a complex at night is
// not a complex at noon even three floors down -- but as a dim fill rather than as weather, and its practical
// lights are on whatever the hour, because a windowless room has nothing else. INTERIOR_FILL is the fraction of
// the phase's ambient an interior gets; the rest of its light has to come from the lamps the room places, which is
// what makes a corridor read as a corridor instead of an evenly-lit box.
export const INTERIOR_FILL = 0.4;
const INTERIOR_BACKGROUND = '#05090e';

const hexToNum = h => (typeof h === 'string' && /^#?[0-9a-f]{6}$/i.test(h) ? parseInt(h.replace('#', ''), 16) : null);

export function isSkyRoom(roomId, shared) {
  return (shared?.metadata?.sky?.rooms ?? []).includes(roomId);
}

// ---- authored interior lighting (DR-092) ---------------------------------------------------------------------
// An enclosed room says how it is lit, because the day phase cannot: `lighting.fill` is the light simply in the
// room, and `lighting.fixtures` are the lamps, each keyed by a stable id so a later delivery can move one without
// disturbing the others. Values are raw three.js -- intensity, cutoff `distance` and `decay` explicit -- and
// deliberately not dressed up as photometry; they are artist-tuned numbers and the schema says so.
//
// Authored fixtures REPLACE whatever `light` parts the room's scene file carries. They never stack: the scene
// files' lamps were the development agent's guesses, and two layers of guess and intent is worse than either.
export const hasAuthoredLighting = meta => !!meta?.lighting?.fixtures;

// Turn the authored fixtures into parts-kit `light` specs, so one code path draws every luminaire in the game.
export function fixtureParts(meta) {
  const out = [];
  for (const [id, f] of Object.entries(meta?.lighting?.fixtures ?? {})) {
    if (f.kind && f.kind !== 'point') continue;         // only kind so far; an unknown kind is the checker's job
    out.push({
      part: 'light',
      id,
      at: f.position,
      size: f.size,
      rot: ((f.rotation ?? 0) * Math.PI) / 180,          // degrees about Y, so a diagonal housing can face its opening
      color: hexToNum(f.color),
      when: f.when,
      cast: { intensity: f.intensity ?? 8, distance: f.distance ?? 8, decay: f.decay ?? 1.8, color: hexToNum(f.color) },
    });
  }
  return out;
}

// The three looks a room can be in, its own if its package authors them and the shared defaults otherwise. A room
// that authors only some phases still falls back phase by phase rather than all or nothing.
export function lookFor(phase, meta, shared) {
  const defaults = shared?.metadata?.sky?.dayPhaseDefaults ?? {};
  const own = meta?.states?.['DAY-PHASE']?.looks ?? {};
  return { ...(defaults[phase] ?? {}), ...(own[phase] ?? {}) };
}

// What the scene should be, as plain values. `key` is null for an interior: there is no sun indoors, and a
// directional light with nowhere to come from is exactly the flat wash this request exists to remove.
export function lighting(phase, roomId, meta, shared, game) {
  const look = lookFor(phase, meta, shared);
  const sky = isSkyRoom(roomId, shared);
  const ambient = look.ambient ?? {};
  const key = look.keyLight ?? {};
  // A sky room's one sun (brief 2.3): where its paintings are lit from, so every phase's key comes from there -- the
  // phase says how warm and how strong, not from where. Bearing clockwise from north (-z), toward the light.
  const sun = sky ? meta?.lighting?.sun : null;
  const rad = d => d * Math.PI / 180;
  const direction = sun ? [Math.sin(rad(sun.bearing)) * Math.cos(rad(sun.elevation)), Math.sin(rad(sun.elevation)), -Math.cos(rad(sun.bearing)) * Math.cos(rad(sun.elevation))] : key.direction;
  // A room that authors its own fill stops taking the sky's. An enclosed room's light does not change because the
  // sun went down outside it; its lamps are the same lamps at noon and at midnight.
  const fill = meta?.lighting?.fill;
  // A room in water is the case the sky rule below cannot reach: Underwater has more distance in it than any
  // corridor and needs fog far more than a courtyard does, but it has no sky to inherit a fogTone from, and 12 to
  // 260 m is the wrong scale for water by an order of magnitude. So a room may author its own fog, and what it
  // authors wins everywhere -- including over the sky's, for a sky room that knows its own weather better.
  const ownFog = meta?.lighting?.fog;

  return {
    phase,
    sky,
    authored: !!fill || hasAuthoredLighting(meta),
    // Authored fog is also what the room looks like at infinite distance, so in an enclosed room it IS the
    // background: a teal haze in front of a near-black void reads as a hole, not as water.
    background: sky
      ? { zenith: hexToNum(look.sky?.zenith) ?? 0x22364a, horizon: hexToNum(look.sky?.horizon) ?? 0x8a9aa0 }
      : { flat: (ownFog && hexToNum(ownFog.color)) ?? hexToNum(INTERIOR_BACKGROUND) },
    ambient: fill
      ? { color: hexToNum(fill.color) ?? 0x9fb0bd, intensity: fill.intensity ?? 0.2 }
      : {
        color: hexToNum(ambient.color) ?? 0x9fb0bd,
        intensity: (ambient.intensity ?? 0.6) * (sky ? 1 : INTERIOR_FILL),
      },
    key: sky && Array.isArray(direction)
      ? { direction, color: hexToNum(key.color) ?? 0xffffff, intensity: key.intensity ?? 1, kind: key.kind ?? 'sun' }
      : null,
    // Fog belongs to a room with distance in it. A corridor two metres wide does not have any, and fogging one
    // only greys it.
    fog: ownFog
      ? { color: hexToNum(ownFog.color) ?? 0x14343a, near: ownFog.near ?? 1, far: ownFog.far ?? 30 }
      : sky && look.fogTone ? { color: hexToNum(look.fogTone), near: 12, far: 260 } : null,
    seaTone: hexToNum(look.seaTone),
    // Outdoors the packages say when the practical lights come on; indoors they are the only light there is.
    fixtures: sky ? !!look.interiorLightsOn : true,
    grade: gradeFor(phase, roomId, meta, shared, game),
  };
}

// ---- the grade on painted views -------------------------------------------------------------------------------
// Everything above lights the FABRIC: ambient, sun, sky and fog are THREE lights and a background. A painted view
// is not fabric. It is hung unlit (parts.js plate) because a painting already carries its own light, and in a
// complete turn it covers the sky and the fabric both -- so the time-of-day switch changed every value above and
// nothing on screen (the user, 2026-09-14: "crag room time of day ddl does nothing"). The paintings are all painted
// in overcast daylight, the 'light' look, so what dusk and night need is the painting relit: a grade in its own
// material, which is this.
//
// Five numbers, in the shape a package can author them as `lighting.grade.<phase>`:
//   exposure    a multiplier on the painting's light (linear), 1 unchanged; 0.25 is two stops down
//   tint        the colour of the light, "#RRGGBB"; only its hue counts, since brightness is exposure's job
//   saturation  1 unchanged, 0 grey; the eye loses colour as the light goes
//   lift        how far black is raised, as a display value (0.04: black shows as 4% grey), in the ambient's colour
//   sky         0 to 1: how far the painted sky is pulled toward the look's own zenith and horizon
// 'light' is the identity by construction, because it is the light the paintings were painted in: an approved
// painting has to look exactly as approved by day.
export const GRADE_IDENTITY = Object.freeze({ exposure: 1, tint: '#FFFFFF', saturation: 1, lift: 0, sky: 0 });
const GRADE_FIELDS = Object.keys(GRADE_IDENTITY);

// The dev defaults the derivation uses where a look says nothing directly. The looks' intensities were authored to
// light a model, where a sun at 0.42 against 1.05 already reads as night because the model loses its shading as
// well as its light; a painting has no shading to lose, so its exposure is the looks' own ratio of light stretched
// by `exposureGamma` until night reads as night on a picture. The tint is the ratio of the two lights' colours,
// softened by `tintStrength` -- more at dusk than at night, because a low sun lights only what faces it and its
// orange is only partly the whole picture's (at full strength the Crag's grey sea and sky went one flat salmon),
// whereas at night the moon and the sky are all the light there is. Saturation falls by `saturationPerStop` for
// every stop below the first, to `saturationFloor`. The sky pull is per phase because nothing in a look says how
// much of a painted sky to replace; dusk takes more of it, since the dusk sky is where dusk is.
export const GRADE_TUNING = Object.freeze({
  exposureGamma: 1.8, exposureRange: [0.02, 1.25],
  tintStrength: { crepuscular: 0.4, dark: 0.9 },
  saturationPerStop: 0.22, saturationFloor: 0.4,
  liftScale: 0.3,
  sky: { crepuscular: 0.75, dark: 0.6 },
});

const LUMA = [0.2126, 0.7152, 0.0722];
const luma = v => v[0] * LUMA[0] + v[1] * LUMA[1] + v[2] * LUMA[2];
const toLinear = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toDisplay = c => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);
// A package colour as linear light, which is what the paintings are graded in (three decodes the textures to it).
export const hexToLinear = h => { const n = hexToNum(h); return n == null ? null : [n >> 16, (n >> 8) & 255, n & 255].map(c => toLinear(c / 255)); };
// A linear colour back to a hex, scaled so its brightest channel is full: the hex of a tint says only its hue.
const linearToHex = v => {
  const m = Math.max(...v, 1e-9);
  return '#' + v.map(c => Math.round(Math.min(1, Math.max(0, toDisplay(c / m))) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
};
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const round = (x, n = 3) => Math.round(x * 10 ** n) / 10 ** n;
// All the light a look puts on things, as one linear colour: the ambient and the key together.
const lightOf = look => {
  const a = hexToLinear(look.ambient?.color) ?? [0.4, 0.45, 0.5], k = hexToLinear(look.keyLight?.color) ?? [1, 1, 1];
  const ai = look.ambient?.intensity ?? 0.6, ki = look.keyLight?.intensity ?? 1;
  return a.map((c, i) => c * ai + k[i] * ki);
};

// The grade a look implies, against the daylight look the paintings were painted in.
export function deriveGrade(phase, look, dayLook, tuning = GRADE_TUNING) {
  if (phase === 'light') return { ...GRADE_IDENTITY };
  const now = lightOf(look), day = lightOf(dayLook);
  const exposure = clamp((luma(now) / Math.max(luma(day), 1e-6)) ** tuning.exposureGamma, ...tuning.exposureRange);
  const strength = typeof tuning.tintStrength === 'number' ? tuning.tintStrength : tuning.tintStrength[phase] ?? 0.6;
  const tint = now.map((c, i) => (c / Math.max(day[i], 1e-6)) ** strength);
  const stops = Math.log2(exposure);
  const saturation = clamp(1 + (stops + 1) * tuning.saturationPerStop, tuning.saturationFloor, 1);
  // The ambient is the light that reaches the shadows, so it is what keeps a black from going to nothing -- and more
  // so the darker the phase, since at dusk the key still does that job.
  const ambient = (hexToLinear(look.ambient?.color) ? luma(hexToLinear(look.ambient.color)) : 0.2) * (look.ambient?.intensity ?? 0.6);
  const lift = tuning.liftScale * toDisplay(ambient) * (1 - exposure) ** 2;
  return { exposure: round(exposure), tint: linearToHex(tint), saturation: round(saturation), lift: round(lift), sky: tuning.sky[phase] ?? 0 };
}

// The most specific state grade whose condition holds, or null. Specificity is the number of leaf conditions, the
// same rule turn.js uses to choose between painted variants, so a room cannot have the two disagree. A condition the
// parser cannot read is skipped rather than thrown, because a grade is not worth losing the room over.
function stateGrade(meta, game) {
  const grades = meta?.lighting?.grade, states = meta?.states;
  if (!grades || !states || !game) return null;
  let best = null;
  for (const [key, grade] of Object.entries(grades)) {
    const cond = states[key]?.condition;
    if (!cond) continue;                                  // a phase key, or a state the package does not describe
    let holds = false, depth = 0;
    try { holds = when(game, cond); depth = atoms(cond).length; } catch { continue; }
    if (holds && (!best || depth > best.depth)) best = { state: key, grade, depth };
  }
  return best;
}

// The grade in use for a room at a phase, and where each number came from. A room's own `lighting.grade.<phase>`
// wins field by field, then any shared `sky.gradeDefaults.<phase>`, then what the room's look implies -- the same
// per-field fallback the looks themselves use, so a package can fix one number without restating the rest.
// Returns the authored numbers (`authored`, the metadata shape) and the plain linear values the shader takes.
export function gradeFor(phase, roomId, meta, shared, game) {
  // A grade keyed on a STATE rather than on a day phase, for the one thing the phases cannot express: a room that
  // changes its light while the hour does not. Underwater is that room -- the user asked (2026-09-16) for the climb
  // to the surface to get brighter as you rise, and the alternative was four more paintings per stage, eighteen in
  // all, for what is a change of exposure and tint on the same six pictures. So `lighting.grade.<STATE>` is read
  // where <STATE> names one of the room's own `states` and its condition holds. It wins over the phase grade and it
  // applies to interiors too, since it is not the sky that moved.
  const byState = stateGrade(meta, game);
  if (byState) {
    const from = Object.fromEntries(GRADE_FIELDS.map(f => [f, byState.state]));
    const authored = {}; for (const f of GRADE_FIELDS) authored[f] = byState.grade[f] ?? GRADE_IDENTITY[f];
    return { ...plainGrade(authored, null, null, from), state: byState.state };
  }
  // An interior's paintings are lit by its lamps, which are the same lamps at any hour: no grade, whatever it authors.
  if (!isSkyRoom(roomId, shared)) return { ...plainGrade({ ...GRADE_IDENTITY }, null, null, Object.fromEntries(GRADE_FIELDS.map(f => [f, 'interior']))), interior: true };
  const look = lookFor(phase, meta, shared), dayLook = lookFor('light', meta, shared);
  const derived = deriveGrade(phase, look, dayLook);
  const sharedOwn = shared?.metadata?.sky?.gradeDefaults?.[phase] ?? {};
  const own = meta?.lighting?.grade?.[phase] ?? {};
  const authored = {}, from = {};
  for (const f of GRADE_FIELDS) {
    if (own[f] != null) { authored[f] = own[f]; from[f] = 'room'; }
    else if (sharedOwn[f] != null) { authored[f] = sharedOwn[f]; from[f] = 'shared'; }
    else { authored[f] = derived[f]; from[f] = phase === 'light' ? 'identity' : 'derived'; }
  }
  return plainGrade(authored, look, dayLook, from);
}

// Authored numbers to what the shader multiplies by. Also where 'identity' is decided, on the numbers rather than on
// the phase, so a room that authors a grade for daylight gets it, and one that does not is left exactly alone.
function plainGrade(authored, look, dayLook, from) {
  const tintLin = hexToLinear(authored.tint) ?? [1, 1, 1];
  const t = luma(tintLin) > 1e-6 ? tintLin.map(c => Math.min(4, c / luma(tintLin))) : [1, 1, 1];
  const amb = hexToLinear(look?.ambient?.color) ?? [1, 1, 1];
  const ambUnit = amb.map(c => c / Math.max(luma(amb), 1e-6));
  const liftLin = toLinear(clamp(authored.lift ?? 0, 0, 1));
  const identity = GRADE_FIELDS.every(f => authored[f] === GRADE_IDENTITY[f] || (f === 'tint' && hexToNum(authored.tint) === 0xffffff));
  return {
    authored, from, identity,
    exposure: authored.exposure ?? 1,
    tint: t,
    saturation: authored.saturation ?? 1,
    lift: ambUnit.map(c => Math.min(1, c * liftLin)),
    sky: look && (authored.sky ?? 0) > 0 ? {
      amount: authored.sky,
      zenith: hexToLinear(look.sky?.zenith) ?? [0.02, 0.04, 0.08], horizon: hexToLinear(look.sky?.horizon) ?? [0.2, 0.25, 0.3],
      dayZenith: hexToLinear(dayLook?.sky?.zenith) ?? [0.3, 0.35, 0.4], dayHorizon: hexToLinear(dayLook?.sky?.horizon) ?? [0.5, 0.55, 0.55],
    } : null,
  };
}
