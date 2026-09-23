// Drawn surfaces for the material vocabulary (DR-061), generated in a canvas rather than loaded as image files.
//
// The reason this is procedural and not a folder of PNGs: there are 105 rooms sharing about two dozen named
// surfaces, and a texture pipeline means somebody authoring, naming, storing, versioning and reviewing hundreds of
// image files. Drawing them in code means a surface is a few lines that every room gets at once, the repository
// stays text, and a repaint is an edit rather than a redelivery.
//
// What the comps say actually distinguishes the Feinstein is not surface fidelity -- it is SIGNAGE. "ESCAPE POD"
// in half-metre letters, "DECK 9", "TO REACTOR" with an arrow, hazard chevrons, little institutional placards
// nagging the crew about cleanliness. Text is the one thing a canvas reproduces exactly, at any resolution, for
// nothing. So the signs here are not an afterthought to the grime; they are the point of the exercise.
//
// Needs a DOM. scene/materials.js holds it at arm's length behind setTextureProvider so the palette still runs in
// node, where scripts/tests/parts.mjs lives.
import * as THREE from 'three';
import { PALETTE, setTextureProvider } from './materials.js';

const hex = n => '#' + (n >>> 0).toString(16).padStart(6, '0');

// Deterministic noise: a surface has to look the same on every load, or a screenshot taken for review is not the
// thing that was reviewed.
const rng = seed => { let s = (seed >>> 0) || 1; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; };

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return { c, x: c.getContext('2d') };
}

// ---- weathering ------------------------------------------------------------------------------------------------
// Film grain, which is what stops a flat fill reading as plastic.
function grain(x, w, h, amount, seed) {
  const img = x.getImageData(0, 0, w, h), d = img.data, r = rng(seed);
  for (let i = 0; i < d.length; i += 4) {
    const n = (r() - 0.5) * amount;
    d[i] += n; d[i + 1] += n; d[i + 2] += n;
  }
  x.putImageData(img, 0, 0);
}

// Dirt runs downwards. Streaks under fixings and along seams are most of why a real bulkhead looks used.
function streaks(x, w, h, color, count, seed, alpha = 0.16) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const sx = r() * w, len = h * (0.15 + r() * 0.7), wide = 1 + r() * 3;
    const g = x.createLinearGradient(0, 0, 0, len);
    g.addColorStop(0, `rgba(${color},${alpha * (0.5 + r() * 0.5)})`);
    g.addColorStop(1, `rgba(${color},0)`);
    x.fillStyle = g;
    x.fillRect(sx, r() * h * 0.1, wide, len);
  }
}

// Grime gathers where the floor meets the wall and in the corners.
function grime(x, w, h, seed) {
  const g = x.createLinearGradient(0, h * 0.62, 0, h);
  g.addColorStop(0, 'rgba(20,18,14,0)');
  g.addColorStop(1, 'rgba(20,18,14,0.34)');
  x.fillStyle = g; x.fillRect(0, h * 0.62, w, h * 0.38);
  streaks(x, w, h, '74,56,38', 26, seed, 0.2);
}

function scratches(x, w, h, count, seed) {
  const r = rng(seed);
  x.lineWidth = 1;
  for (let i = 0; i < count; i++) {
    x.strokeStyle = `rgba(255,255,255,${0.03 + r() * 0.07})`;
    x.beginPath();
    const sx = r() * w, sy = r() * h;
    x.moveTo(sx, sy);
    x.lineTo(sx + (r() - 0.5) * w * 0.3, sy + (r() - 0.5) * h * 0.08);
    x.stroke();
  }
}

function bolts(x, positions, radius = 3.5) {
  for (const [bx, by] of positions) {
    x.fillStyle = 'rgba(0,0,0,0.35)';
    x.beginPath(); x.arc(bx, by + 1, radius, 0, 7); x.fill();
    x.fillStyle = 'rgba(255,255,255,0.20)';
    x.beginPath(); x.arc(bx, by, radius, 0, 7); x.fill();
  }
}

// ---- lettering ---------------------------------------------------------------------------------------------------
// Stencilled, because everything aboard a 1983-imagined spacecraft is stencilled.
function stencil(x, text, cx, cy, size, color = '#20242a', weight = 700, spacing = 0.08) {
  x.save();
  x.font = `${weight} ${size}px "Arial Narrow", "Haettenschweiler", Impact, sans-serif`;
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = color;
  const letters = [...text];
  const gap = size * spacing;
  const widths = letters.map(ch => x.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (letters.length - 1);
  let px = cx - total / 2;
  for (let i = 0; i < letters.length; i++) {
    x.fillText(letters[i], px + widths[i] / 2, cy);
    px += widths[i] + gap;
  }
  x.restore();
}

function arrow(x, cx, cy, len, thick, dir, color = '#c4502a') {
  x.save();
  x.translate(cx, cy);
  if (dir === 'left') x.scale(-1, 1);
  x.fillStyle = color;
  const head = len * 0.34;
  x.fillRect(-len / 2, -thick / 2, len - head, thick);
  x.beginPath();
  x.moveTo(len / 2, 0);
  x.lineTo(len / 2 - head, -thick * 1.5);
  x.lineTo(len / 2 - head, thick * 1.5);
  x.closePath(); x.fill();
  x.restore();
}

// Diagonal hazard banding.
function chevrons(x, x0, y0, w, h, a = '#c4502a', b = '#e8e2d4', pitch = 34) {
  x.save();
  x.beginPath(); x.rect(x0, y0, w, h); x.clip();
  x.fillStyle = b; x.fillRect(x0, y0, w, h);
  x.fillStyle = a;
  for (let i = -h; i < w + h; i += pitch * 2) {
    x.beginPath();
    x.moveTo(x0 + i, y0 + h); x.lineTo(x0 + i + pitch, y0 + h);
    x.lineTo(x0 + i + pitch + h, y0); x.lineTo(x0 + i + h, y0);
    x.closePath(); x.fill();
  }
  x.restore();
}

// ---- the surfaces -------------------------------------------------------------------------------------------------
// Each entry draws one tile. `tile` is how many metres of wall the tile covers, so a 7 m bulkhead repeats it rather
// than stretching it; `tile: 0` means the graphic is unique to the thing it is painted on and must not repeat.
const SURFACES = {
  'wall-panel': {
    tile: 1.15,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      // A pressed panel with a raised rim, the way ship's plating is built up from bays.
      x.strokeStyle = 'rgba(0,0,0,0.45)'; x.lineWidth = 5;
      x.strokeRect(4, 4, w - 8, h - 8);
      x.strokeStyle = 'rgba(255,255,255,0.10)'; x.lineWidth = 2;
      x.strokeRect(8, 8, w - 16, h - 16);
      x.fillStyle = 'rgba(0,0,0,0.16)'; x.fillRect(0, h * 0.48, w, 7);   // mid rail
      const m = 22;
      bolts(x, [[m, m], [w - m, m], [m, h - m], [w - m, h - m], [m, h / 2], [w - m, h / 2]]);
      grime(x, w, h, 11);
      streaks(x, w, h, '120,96,60', 14, 23, 0.14);
      scratches(x, w, h, 40, 31);
      grain(x, w, h, 26, 7);
    },
  },
  'structural-rib': {
    tile: 0.8,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      for (let i = 0; i < w; i += 26) {
        x.fillStyle = i % 52 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.22)';
        x.fillRect(i, 0, 13, h);
      }
      grain(x, w, h, 22, 13);
    },
  },
  'deck-plate': {
    tile: 1.0,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      // Diamond tread plate: the floor of every service deck ever drawn.
      const step = 52;
      for (let gy = 0; gy < h; gy += step) {
        for (let gx = 0; gx < w; gx += step) {
          const ox = (gy / step) % 2 ? step / 2 : 0;
          for (const [dx, dy, rot] of [[ox + gx, gy + step * 0.3, -0.5], [ox + gx + step / 2, gy + step * 0.75, 0.5]]) {
            x.save(); x.translate(dx, dy); x.rotate(rot);
            x.fillStyle = 'rgba(255,255,255,0.13)'; x.fillRect(-13, -3.5, 26, 7);
            x.fillStyle = 'rgba(0,0,0,0.28)'; x.fillRect(-13, 3.5, 26, 3);
            x.restore();
          }
        }
      }
      streaks(x, w, h, '90,80,60', 10, 41, 0.1);
      grain(x, w, h, 20, 17);
    },
  },
  'deck-plate-scrubbed': {
    tile: 1.0,
    draw(x, w, h, base) {
      SURFACES['deck-plate'].draw(x, w, h, base);
      x.fillStyle = 'rgba(220,228,236,0.10)'; x.fillRect(0, 0, w, h);   // the bit somebody actually mops
      scratches(x, w, h, 70, 53);
    },
  },
  'tread': {
    tile: 0.42,
    draw(x, w, h, base) {
      x.fillStyle = '#1b2026'; x.fillRect(0, 0, w, h);                   // you see through grating, so start dark
      x.strokeStyle = hex(base); x.lineWidth = 7;
      for (let i = 0; i < w; i += 30) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); }
      x.lineWidth = 4;
      for (let i = 0; i < h; i += 30) { x.beginPath(); x.moveTo(0, i); x.lineTo(w, i); x.stroke(); }
      grain(x, w, h, 16, 19);
    },
  },
  'ceiling': {
    tile: 1.0,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      for (let i = 0; i < h; i += 34) {
        x.fillStyle = 'rgba(0,0,0,0.26)'; x.fillRect(0, i, w, 12);
        x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(0, i + 12, w, 3);
      }
      grain(x, w, h, 18, 29);
    },
  },
  'bulkhead-door': {
    tile: 0,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(0,0,0,0.4)'; x.lineWidth = 10; x.strokeRect(14, 14, w - 28, h - 28);
      const r = 26, pts = [];
      for (let i = r; i < w; i += 46) { pts.push([i, r], [i, h - r]); }
      for (let i = r + 46; i < h - r; i += 46) { pts.push([r, i], [w - r, i]); }
      bolts(x, pts, 4);
      chevrons(x, 18, h - 92, w - 36, 74);
      grime(x, w, h, 37);
      scratches(x, w, h, 50, 59);
      grain(x, w, h, 22, 43);
    },
  },
  // A solid painted band. The chevrons live on the door sign; doubling them up either side of it reads as noise.
  'emergency-band': {
    tile: 0.5,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      streaks(x, w, h, '70,44,26', 14, 61, 0.24);
      scratches(x, w, h, 26, 63);
      grain(x, w, h, 24, 67);
    },
  },
  'machinery': {
    tile: 0.75,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      x.fillStyle = 'rgba(0,0,0,0.3)';
      for (let i = 0; i < 6; i++) x.fillRect(w * 0.18, h * 0.2 + i * 22, w * 0.64, 10);   // louvres
      bolts(x, [[20, 20], [w - 20, 20], [20, h - 20], [w - 20, h - 20]]);
      grime(x, w, h, 71);
      grain(x, w, h, 24, 73);
    },
  },
  'plate-steel': {
    tile: 1.0,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      const r = rng(83);
      for (let i = 0; i < 400; i++) {                                    // brushed grain
        x.fillStyle = `rgba(255,255,255,${r() * 0.05})`;
        x.fillRect(0, r() * h, w, 1);
      }
      bolts(x, [[18, 18], [w - 18, 18], [18, h - 18], [w - 18, h - 18]]);
      grain(x, w, h, 18, 89);
    },
  },
  'plate-steel-corroded': {
    tile: 1.0,
    draw(x, w, h, base) {
      SURFACES['plate-steel'].draw(x, w, h, base);
      streaks(x, w, h, '128,84,44', 40, 97, 0.3);
    },
  },
  'concrete': {
    tile: 1.6,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      const r = rng(101);
      for (let i = 0; i < 260; i++) {                                    // aggregate mottling
        x.fillStyle = `rgba(${r() > 0.5 ? '255,255,255' : '0,0,0'},${r() * 0.06})`;
        const s = 6 + r() * 40;
        x.beginPath(); x.arc(r() * w, r() * h, s, 0, 7); x.fill();
      }
      x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(0, h - 6, w, 6);      // shutter line
      grain(x, w, h, 22, 103);
    },
  },
  'concrete-worn': {
    tile: 1.6,
    draw(x, w, h, base) {
      SURFACES['concrete'].draw(x, w, h, base);
      streaks(x, w, h, '60,52,40', 26, 107, 0.22);
    },
  },
  'trim': { tile: 0.8, draw: (x, w, h, base) => SURFACES['structural-rib'].draw(x, w, h, base) },
  'pipe': {
    tile: 0.6,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      x.fillStyle = 'rgba(0,0,0,0.3)'; x.fillRect(0, h * 0.46, w, 10);   // a joint band
      streaks(x, w, h, '120,88,52', 12, 109, 0.2);
      grain(x, w, h, 20, 113);
    },
  },
  'conduit': { tile: 0.5, draw: (x, w, h, base) => SURFACES['pipe'].draw(x, w, h, base) },
  'control-face': {
    tile: 0,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      x.fillStyle = 'rgba(0,0,0,0.45)'; x.fillRect(w * 0.1, h * 0.08, w * 0.8, h * 0.22);
      const r = rng(127);
      for (let i = 0; i < 18; i++) {                                     // a wall of unlabelled switches
        x.fillStyle = `rgba(${r() > 0.7 ? '210,200,120' : '150,160,170'},0.7)`;
        x.fillRect(w * 0.12 + (i % 6) * w * 0.13, h * 0.42 + Math.floor(i / 6) * h * 0.16, w * 0.08, h * 0.07);
      }
      grain(x, w, h, 20, 131);
    },
  },
  // A blank ivory plate. It is tempting to letter this one, but `stencil` is the generic small-plate surface and a
  // box wearing it shows the same words on all six faces; wording belongs on a named sign, which is painted on one
  // thing at one size.
  'stencil': {
    tile: 0,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(0,0,0,0.22)'; x.lineWidth = 5; x.strokeRect(8, 8, w - 16, h - 16);
      streaks(x, w, h, '90,70,44', 10, 137, 0.18);
      grain(x, w, h, 22, 139);
    },
  },
  'handrail': {
    tile: 0.5,
    draw(x, w, h, base) {
      x.fillStyle = hex(base); x.fillRect(0, 0, w, h);
      streaks(x, w, h, '60,48,30', 8, 149, 0.22);
      scratches(x, w, h, 30, 151);
      grain(x, w, h, 22, 157);
    },
  },
};

// ---- the signs ----------------------------------------------------------------------------------------------------
// New palette names, because a room should ask for "the escape pod door" and not for a picture. These are what the
// comp actually reads as from across the corridor.
const SIGNS = {
  'sign-escape-pod': {
    base: { color: 0xd9d5c8, roughness: 0.78, metalness: 0.15 },
    aspect: [820, 1024],
    draw(x, w, h) {
      x.fillStyle = '#d9d5c8'; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 14; x.strokeRect(20, 20, w - 40, h - 40);
      x.fillStyle = '#c4502a'; x.fillRect(40, h * 0.12, w - 80, 26);
      stencil(x, 'DECK 9', w / 2, h * 0.235, 76, '#b4482a');
      stencil(x, 'ESCAPE POD', w / 2, h * 0.35, 104);
      arrow(x, w / 2, h * 0.46, w * 0.52, 30, 'left');
      chevrons(x, 40, h * 0.72, w - 80, h * 0.2);
      const r = 34, pts = [];
      for (let i = r + 40; i < w - 40; i += 64) pts.push([i, r + 24], [i, h - r - 24]);
      bolts(x, pts, 5);
      grime(x, w, h, 163);
      streaks(x, w, h, '116,80,44', 34, 167, 0.26);
      scratches(x, w, h, 60, 173);
      grain(x, w, h, 26, 179);
    },
  },
  'sign-to-reactor': {
    base: { color: 0x5c6b78, roughness: 0.72, metalness: 0.28 },
    aspect: [1024, 640],
    draw(x, w, h) {
      SURFACES['wall-panel'].draw(x, w, h, 0x5c6b78);
      stencil(x, 'TO REACTOR', w / 2, h * 0.3, 96, '#e4e0d2');
      arrow(x, w / 2, h * 0.56, w * 0.5, 26, 'right', '#e4e0d2');
      stencil(x, 'POWER  ENGINEERING', w / 2, h * 0.78, 42, '#c8c3b4');
      stencil(x, 'COOLANT  MAINTENANCE', w / 2, h * 0.89, 42, '#c8c3b4');
      grain(x, w, h, 20, 181);
    },
  },
  'sign-deck-nine': {
    base: { color: 0x5c6b78, roughness: 0.72, metalness: 0.28 },
    aspect: [512, 1024],
    draw(x, w, h) {
      SURFACES['wall-panel'].draw(x, w, h, 0x5c6b78);
      stencil(x, 'DECK', w / 2, h * 0.2, 90, '#dcd7c8');
      stencil(x, '9', w / 2, h * 0.52, 300, '#dcd7c8');
      grain(x, w, h, 20, 191);
    },
  },
  'placard-flying': {
    base: { color: 0xd8d2c2, roughness: 0.86, metalness: 0.05 },
    aspect: [512, 640],
    draw(x, w, h) {
      x.fillStyle = '#d8d2c2'; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(0,0,0,0.28)'; x.lineWidth = 8; x.strokeRect(12, 12, w - 24, h - 24);
      const lines = ['CREW', 'KEEPS', 'THIS SHIP', 'FLYING'];
      lines.forEach((t, i) => stencil(x, t, w / 2, h * (0.24 + i * 0.17), 74, '#2a2f36', 700, 0.04));
      streaks(x, w, h, '110,86,52', 12, 193, 0.2);
      grain(x, w, h, 24, 197);
    },
  },
  'placard-sanitation': {
    base: { color: 0xd8d2c2, roughness: 0.86, metalness: 0.05 },
    aspect: [512, 512],
    draw(x, w, h) {
      x.fillStyle = '#d8d2c2'; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(0,0,0,0.28)'; x.lineWidth = 8; x.strokeRect(12, 12, w - 24, h - 24);
      ['SANITATION', 'COMPLIANCE', 'MATTERS'].forEach((t, i) =>
        stencil(x, t, w / 2, h * (0.26 + i * 0.2), 62, '#2a2f36', 700, 0.04));
      streaks(x, w, h, '110,86,52', 10, 199, 0.18);
      grain(x, w, h, 24, 211);
    },
  },
};

// ---- installation ---------------------------------------------------------------------------------------------------
function textureFor(draw, base, w, h) {
  const { c, x } = canvas(w, h);
  draw(x, w, h, base);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

let installed = false;

// Add the sign surfaces to the palette and hand materials.js the drawing routine. Idempotent.
export function installTextures() {
  if (installed) return;
  installed = true;
  for (const [name, s] of Object.entries(SIGNS)) PALETTE[name] = { ...s.base };
  setTextureProvider((name, mat, spec) => {
    const sign = SIGNS[name];
    if (sign) {
      mat.map = textureFor(sign.draw, spec?.color ?? 0xffffff, sign.aspect[0], sign.aspect[1]);
      mat.userData.tile = 0;
      mat.color.setHex(0xffffff);          // the drawing carries the colour; tinting it twice muddies the signs
      mat.needsUpdate = true;
      return;
    }
    const surface = SURFACES[name];
    if (!surface || spec?.emissive != null) return;   // lamps and indicators glow; they do not want a texture
    mat.map = textureFor(surface.draw, spec?.color ?? 0x808080, 512, 512);
    mat.userData.tile = surface.tile;
    // Not white. A drawn tile carries its own highlights, and at full white the room loses the pools and falloff
    // the authored lighting works so hard for: it goes evenly bright, which is the one thing plain colour did well.
    mat.color.setHex(0xd0d0d0);
    mat.needsUpdate = true;
  });
}

// The tile is drawn at a fixed size, so a 7 m bulkhead and a 0.4 m bracket would otherwise wear the same stretched
// copy of it. Walk what was built and set each mesh's repeat from how big that mesh actually is. Materials are
// shared across meshes, so a mesh that needs its own repeat gets its own clone.
export function fitTextures(root) {
  root.traverse(m => {
    const mat = m.material;
    if (!m.isMesh || !mat?.map) return;
    const tile = mat.userData.tile ?? 0;
    if (!tile) return;                      // a sign is painted on one thing at one size
    if (!m.geometry.boundingBox) m.geometry.computeBoundingBox();
    const s = new THREE.Vector3();
    m.geometry.boundingBox.getSize(s);
    const [a, b] = [s.x, s.y, s.z].sort((p, q) => q - p);   // the two dimensions of the face we mostly look at
    const clone = mat.clone();
    clone.map = mat.map.clone();
    clone.map.needsUpdate = true;
    clone.map.wrapS = clone.map.wrapT = THREE.RepeatWrapping;
    clone.map.repeat.set(Math.max(1, Math.round(a / tile)), Math.max(1, Math.round(b / tile)));
    m.material = clone;
  });
}
