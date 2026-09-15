// Where a painted view is sky, as a matte the grade reads (scene/grade.js).
//
// The dusk grade pulls the paintings' daylight cloud toward the look's own sky, and it first has to know which pixels
// are the sky. Reading that off brightness alone -- above the horizon and bright -- was wrong on the Crag: the wet top
// of the boulder and the spray on the cliff are as bright as the cloud there, so at dusk they came out flat sky salmon,
// the sky's own colour, and cut off hard at the horizon line (verifier, 2026-09-14). Brightness still decides how much
// of the sky's colour a pixel takes; this decides whether it is sky at all.
//
// What the sky is, in these paintings: bright, smooth, and in one large piece or joined to the top of the picture. Rock,
// spray and stone are textured at any brightness, so the smooth test breaks them into crumbs; the wet top of the Crag's
// boulder, the nearest thing to a smooth stone in the set, is cut off from the cloud by its own outline and its cracks,
// so no piece of it is large. "Large" as well as "joined to the top" because the Balcony's sky is seen through windows
// that never reach the frame. The small holes left in the sky, a darker knot of cloud, are filled, since a hole the sky
// surrounds is sky; a large one is left alone, because that is a roof or a spar in front of it.
//
// The core works on plain pixels, so the tests can run it in node; skyMatte() is the page's half, which reads the
// picture off a canvas. Nothing here runs unless the grade has a sky to pull (grade.js asks for a matte only then), so
// daylight never pays for it.
import * as THREE from 'three';

const LIN = new Float32Array(256);
for (let i = 0; i < 256; i++) { const c = i / 255; LIN[i] = c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }

// Tuned on the Crag, Balcony, Courtyard and Winding Stair paintings at a quarter of their size (see skyMatte): the
// dimmest cloud in them is above `bright` in linear light, and across four pixels cloud changes by less than `smooth`
// of its own brightness where rock and spray change by more. Against its own brightness, so a dark storm bank and a
// pale one are held to one standard; 0.18 was tried first and lost the storm cloud's own texture. `large` and `speck`
// are fractions of the picture, measured (2026-09-14): the smallest piece of real sky is 1.4% (the Courtyard's, between
// two walls; the Balcony's narrowest window is 3.7%), the largest crumb of stone or spray that passes 0.3% (the Crag),
// so `large` sits between them. The rock at the Winding Stair's top edge that passes is under a hundredth of a percent.
export const MATTE = { bright: 0.1, smooth: 0.5, large: 0.006, speck: 0.002, grow: 1, blur: 2, hole: 0.02 };

// rgba: the picture's bytes (sRGB, row 0 at the top). from: 'top' for a level view, whose sky is the part joined to its
// top edge; 'edges' for a view looking up, whose sky may meet the frame on any side. Returns one byte per pixel,
// 255 where it is sky.
export function matteFromPixels(rgba, W, H, { from = 'top', ...opts } = {}) {
  const k = { ...MATTE, ...opts }, n = W * H;
  const L = new Float32Array(n);
  for (let i = 0; i < n; i++) L[i] = 0.2126 * LIN[rgba[4 * i]] + 0.7152 * LIN[rgba[4 * i + 1]] + 0.0722 * LIN[rgba[4 * i + 2]];

  // Bright and smooth: the change over four pixels across and four down, against the pixel's own brightness.
  const ok = new Uint8Array(n);
  for (let y = 0; y < H; y++) {
    const ya = Math.max(0, y - 2) * W, yb = Math.min(H - 1, y + 2) * W;
    for (let x = 0; x < W; x++) {
      const i = y * W + x, l = L[i];
      if (l <= k.bright) continue;
      const g = Math.abs(L[y * W + Math.min(W - 1, x + 2)] - L[y * W + Math.max(0, x - 2)]) + Math.abs(L[yb + x] - L[ya + x]);
      if (g < k.smooth * l) ok[i] = 1;
    }
  }

  // The pieces: joined to the edge the sky comes in from, or large.
  const piece = new Int32Array(n).fill(-1), sizes = [], edge = [];
  for (let s = 0; s < n; s++) {
    if (!ok[s] || piece[s] >= 0) continue;
    const id = sizes.length, stack = [s];
    piece[s] = id; sizes.push(0); edge.push(false);
    while (stack.length) {
      const i = stack.pop(), x = i % W, y = (i - x) / W;
      sizes[id]++;
      if (y === 0 || (from === 'edges' && (x === 0 || x === W - 1 || y === H - 1))) edge[id] = true;
      for (const m of neighbours(i, x, y, W, H)) if (ok[m] && piece[m] < 0) { piece[m] = id; stack.push(m); }
    }
  }
  // Not every speck on the edge: a few pixels of wet rock catch the top of the Winding Stair's cliff.
  const keep = sizes.map((z, id) => (edge[id] && z >= k.speck * n) || z >= k.large * n);
  // For tuning: every piece bigger than a crumb, as a fraction of the picture.
  if (Array.isArray(opts.report)) sizes.forEach((z, id) => { if (z >= 1e-4 * n) opts.report.push({ size: z / n, edge: edge[id], kept: keep[id] }); });
  const sky = new Uint8Array(n);
  for (let i = 0; i < n; i++) if (piece[i] >= 0 && keep[piece[i]]) sky[i] = 1;

  // Small holes the sky surrounds are sky. A hole is a piece of not-sky that never reaches the frame.
  const seen = new Uint8Array(n), limit = k.hole * n;
  for (let s = 0; s < n; s++) {
    if (sky[s] || seen[s]) continue;
    const piece = [s]; seen[s] = 1;
    let border = false;
    for (let j = 0; j < piece.length; j++) {
      const i = piece[j], x = i % W, y = (i - x) / W;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) border = true;
      for (const m of neighbours(i, x, y, W, H)) if (!sky[m] && !seen[m]) { seen[m] = 1; piece.push(m); }
    }
    if (!border && piece.length <= limit) for (const i of piece) sky[i] = 1;
  }

  // Grown a little and softened: the smooth test cannot pass the last two pixels of sky before an outline (the
  // change it measures reaches across it), and a hard-edged matte would draw its own outline round every rock.
  let m = sky;
  for (let r = 0; r < k.grow; r++) {
    const g = new Uint8Array(n);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x;
      g[i] = m[i] || (x > 0 && m[i - 1]) || (x < W - 1 && m[i + 1]) || (y > 0 && m[i - W]) || (y < H - 1 && m[i + W]) ? 1 : 0;
    }
    m = g;
  }
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = m[i];
  const soft = boxBlur(boxBlur(out, W, H, k.blur, 1), W, H, k.blur, W);
  const bytes = new Uint8Array(n);
  for (let i = 0; i < n; i++) bytes[i] = Math.round(soft[i] * 255);
  return bytes;
}

function* neighbours(i, x, y, W, H) {
  if (x > 0) yield i - 1;
  if (x < W - 1) yield i + 1;
  if (y > 0) yield i - W;
  if (y < H - 1) yield i + W;
}
// One pass of a box blur along rows (step 1) or columns (step W), clamped at the frame.
function boxBlur(src, W, H, r, step) {
  const out = new Float32Array(src.length), len = step === 1 ? W : H, lines = step === 1 ? H : W;
  for (let line = 0; line < lines; line++) {
    const base = step === 1 ? line * W : line;
    for (let t = 0; t < len; t++) {
      let sum = 0;
      for (let d = -r; d <= r; d++) sum += src[base + Math.min(len - 1, Math.max(0, t + d)) * step];
      out[base + t * step] = sum / (2 * r + 1);
    }
  }
  return out;
}

// The page's half: the matte for a loaded texture, or null while its picture is still on its way (grade.js asks again
// on the next frame). A quarter of the picture's size is plenty -- the matte is softened anyway -- and keeps this to a
// few milliseconds a plate, once. It comes back as a texture laid out like the picture's own (the same flip and wrap),
// because the shader reads it at the picture's own coordinates.
export function skyMatte(texture, { from = 'top' } = {}) {
  const img = texture?.image;
  const w0 = img?.naturalWidth || img?.videoWidth || img?.width, h0 = img?.naturalHeight || img?.videoHeight || img?.height;
  if (!w0 || !h0 || img.complete === false || typeof document === 'undefined') return null;
  const W = Math.max(8, Math.round(w0 / 4)), H = Math.max(8, Math.round(h0 / 4));
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, W, H);
  const bytes = matteFromPixels(ctx.getImageData(0, 0, W, H).data, W, H, { from });
  const px = ctx.createImageData(W, H);
  for (let i = 0; i < bytes.length; i++) { px.data[4 * i] = px.data[4 * i + 1] = px.data[4 * i + 2] = bytes[i]; px.data[4 * i + 3] = 255; }
  ctx.putImageData(px, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace;
  tex.flipY = texture.flipY;
  tex.wrapS = texture.wrapS; tex.wrapT = texture.wrapT;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.userData.skyMatteOf = texture.uuid;
  return tex;
}
