// The material vocabulary (DR-061). A room names materials; it never names numbers.
//
// The point is that a room's scene file should read like the design package's palette table -- "wall-panel",
// "deck-plate", "emergency-band" -- so a person authoring a room picks from a list of things the art direction
// already names, and every room that names the same surface gets the same surface. The twelve-colour table in
// graybox.js stays exactly where it is: it is the graybox's own language for an unbuilt room, and this is the
// language for a built one.
//
// An entry is a base colour, a roughness, a metalness and an optional emissive, and that is deliberately all.
// Anything that needs a texture is a part's business, not the palette's.
//
// Pure: no DOM, no fetch, so scripts/tests/parts.mjs can run the whole thing in node.
import * as THREE from 'three';

// Named surfaces. The Feinstein set is DECK-NINE's README palette table, word for word where it names a colour;
// the complex set is the kit the Kalamontee and Lawanda comps share. Keep new names describing what a surface IS,
// never what colour it is, so a repaint is one edit here.
export const PALETTE = {
  // --- the Feinstein (imagined-in-1983 spacecraft: chunky, analog, institutional, worn but active)
  'wall-panel': { color: 0x5c6b78, roughness: 0.72, metalness: 0.28 },        // desaturated blue-gray painted steel
  'structural-rib': { color: 0x2c3644, roughness: 0.66, metalness: 0.42 },    // dark navy-charcoal
  'machinery': { color: 0x6a7078, roughness: 0.58, metalness: 0.55 },         // cold gray
  'deck-plate': { color: 0x39414a, roughness: 0.74, metalness: 0.40 },        // dark gunmetal
  'deck-plate-scrubbed': { color: 0x454f59, roughness: 0.42, metalness: 0.44 },
  'stencil': { color: 0xd8d2c2, roughness: 0.86, metalness: 0.05 },           // dirty ivory
  'emergency-band': { color: 0xb4552f, roughness: 0.78, metalness: 0.12 },    // faded orange-red
  'bulkhead-door': { color: 0x8d949a, roughness: 0.62, metalness: 0.52 },
  'handrail': { color: 0xc2a23c, roughness: 0.5, metalness: 0.6 },           // yellow safety-painted steel
  'tread': { color: 0x4c545c, roughness: 0.7, metalness: 0.5 },              // open industrial grating
  'safety-web': { color: 0x2b2f34, roughness: 0.93, metalness: 0.04 },       // the pod's charcoal strap webbing (DR-109)
  // The glass of the pod's porthole. Near black on purpose: in the blockout a window has to read as a HOLE, or the
  // painter cannot tell it from the wall around it. DR-112 found that out the hard way -- the pane was drawn in
  // wall-panel grey, and at 2.65 m through the safety net it was invisible, so the first painting of the seat put a
  // round porthole at the edge of the frame because the fabric offered nowhere else to put one. It is also true:
  // the base state of that pane IS black, the bore of the ejection tube a hand's breadth beyond the glass.
  'viewport-glass': { color: 0x0b0e12, roughness: 0.18, metalness: 0.0 },
  // --- shared
  'ceiling': { color: 0x28313a, roughness: 0.85, metalness: 0.15 },
  'pipe': { color: 0x6e757c, roughness: 0.52, metalness: 0.66 },
  'conduit': { color: 0x4a525a, roughness: 0.6, metalness: 0.5 },
  'control-face': { color: 0x3f4a55, roughness: 0.5, metalness: 0.35 },
  'lamp-cool': { color: 0xdCE8F2, roughness: 0.3, metalness: 0.0, emissive: 0xa8c4de, emissiveIntensity: 1.0 },
  'lamp-warm': { color: 0xffe8c0, roughness: 0.3, metalness: 0.0, emissive: 0xd8a860, emissiveIntensity: 1.0 },
  'indicator-live': { color: 0x7fd6a0, roughness: 0.4, metalness: 0.1, emissive: 0x2f9c5c, emissiveIntensity: 0.9 },
  'indicator-fault': { color: 0xd9776a, roughness: 0.4, metalness: 0.1, emissive: 0xa83224, emissiveIntensity: 0.9 },
  // --- the complexes (Kalamontee and Lawanda: cast concrete, plate steel, restrained corrosion)
  'concrete': { color: 0x8a8579, roughness: 0.94, metalness: 0.02 },
  'concrete-worn': { color: 0x736f66, roughness: 0.96, metalness: 0.02 },
  'plate-steel': { color: 0x7d8087, roughness: 0.64, metalness: 0.58 },
  'plate-steel-corroded': { color: 0x6d6357, roughness: 0.82, metalness: 0.40 },
  'trim': { color: 0x565f68, roughness: 0.6, metalness: 0.45 },
  // Outdoors (DR-109): the ocean world's water, its sea cliffs, and the castle's stone.
  'sea': { color: 0x2d4a55, roughness: 0.25, metalness: 0.1 },
  'seabed': { color: 0x3b4a44, roughness: 0.95, metalness: 0.02 },
  'rock': { color: 0x5e5a52, roughness: 0.95, metalness: 0.03 },
  'masonry': { color: 0x857c6c, roughness: 0.92, metalness: 0.02 },
};

export const NAMES = Object.keys(PALETTE);
export const known = name => Object.hasOwn(PALETTE, name);

// One THREE material per name, shared by every mesh that asks for it: a room is a few hundred boxes and giving
// each its own material costs a draw call for nothing.
const cache = new Map();

// A surface can be dressed with a drawn texture -- panel seams, grime, a stencilled sign -- but only in a browser,
// because drawing one needs a canvas. scene/textures.js installs itself here; with nothing installed the palette
// behaves exactly as it always has, which is what keeps this module pure enough to run in node.
let provider = null;
export function setTextureProvider(fn) { provider = fn; cache.clear(); }
export const textured = () => !!provider;

export function material(name) {
  if (!cache.has(name)) {
    const spec = PALETTE[name];
    if (!spec) {                       // an unknown name is the author's typo, and a magenta wall says so loudly
      cache.set(name, new THREE.MeshStandardMaterial({ color: 0xff00ff, roughness: 1 }));
    } else {
      const { color, roughness, metalness, emissive, emissiveIntensity } = spec;
      cache.set(name, new THREE.MeshStandardMaterial({
        color, roughness, metalness,
        ...(emissive != null ? { emissive, emissiveIntensity: emissiveIntensity ?? 1 } : {}),
      }));
    }
    if (provider) provider(name, cache.get(name), PALETTE[name]);
  }
  return cache.get(name);
}
