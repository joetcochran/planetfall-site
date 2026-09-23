// Graybox room builder. Every room gets walls, openings/doors per declared exit, a hatch or stair
// for UP/DOWN, and labelled placeholders for the objects that are present. A per-room scene file
// (data/scenes/<ROOM>.json) can override sizes, colours and positions; see README.
// Units are metres: north is -Z, east is +X, up is +Y. Eye height is 1.6 m at the room centre.
import * as THREE from 'three';
import { pseudosHere, isVisible, dark, knownInDark, exitNote, isMarker } from '../engine/parser.js';
import { buildParts, when } from './parts.js';
import { fixtureParts } from './lighting.js';

const WALL = { NORTH: { axis: 'z', sign: -1, rot: 0 }, SOUTH: { axis: 'z', sign: 1, rot: Math.PI }, EAST: { axis: 'x', sign: 1, rot: -Math.PI / 2 }, WEST: { axis: 'x', sign: -1, rot: Math.PI / 2 } };
const DIAG = { NE: ['NORTH', 'EAST'], NW: ['NORTH', 'WEST'], SE: ['SOUTH', 'EAST'], SW: ['SOUTH', 'WEST'] };
const COLORS = { floor: 0x2a3540, wall: 0x3b4a58, ceiling: 0x1f2830, opening: 0x0b1118, open: 0x3f9a6a, closed: 0xb5453b, blocked: 0x2a2f36, item: 0xd9b45a, actor: 0xc27ad1, vehicle: 0x4f7fa8, scenery: 0x6b7c8c, hatch: 0x5a6b7a, pseudo: 0x4d5f52 };

export function label(text, { size = 0.5, color = '#e8f1f8', background = 'rgba(8,14,20,0.75)' } = {}) {
  const c = document.createElement('canvas'); const g = c.getContext('2d');
  g.font = 'bold 40px system-ui, sans-serif'; const w = Math.ceil(g.measureText(text).width) + 40; c.width = w; c.height = 72;
  g.fillStyle = background; g.beginPath(); g.roundRect(0, 0, w, 72, 16); g.fill();
  g.font = 'bold 40px system-ui, sans-serif'; g.fillStyle = color; g.textBaseline = 'middle'; g.fillText(text, 20, 38);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false, transparent: true }));
  // Drawn last of all, over what moves (20), decals (21) and the overlays hung on a painted wall (22): at 10 the
  // Computer Room's light-off overlay wiped out half its own "light" plate (2026-09-18).
  s.scale.set(size * w / 72, size, 1); s.renderOrder = 30;
  // A name plate is the only thing in the room that is not part of the room: it is writing about the world rather
  // than a thing in it. View.layOutLabels reads these two to keep it readable -- the size it was made at, so a plate
  // near the eye can be held back from filling the screen, and the flag that says it is a plate at all.
  s.userData.label = true; s.userData.labelScale = [size * w / 72, size];
  return s;
}
// Which dropped-item anchor each loose thing took, per room: ROOM -> Map(id -> anchor index). Kept across rebuilds so
// a new drop never shuffles what is already on the floor (room contents are listed in object-table order).
const anchorMemory = new Map();
// The foot of a picture lying on the front face of a thing's box: the box centre `p`, moved out along the bearing the
// face looks (`facing`: 0 north, 90 east) by half the box's `depth` and a millimetre, and down by half the picture.
export const onFace = (p, art) => {
  const b = art.facing * Math.PI / 180, out = (art.depth ?? 0) / 2 + 0.001;
  return [p.x + Math.sin(b) * out, Math.max(0, p.y - art.height / 2), p.z - Math.cos(b) * out];
};
const box = (w, h, d, color, extra = {}) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: 0.8, ...extra }));

export function buildRoom(g, overrides = {}, ctx = {}) {
  const room = g.here();
  const [W, H, D] = overrides.size ?? [8, 3, 8];
  const group = new THREE.Group(); const pickables = [];
  // In a room built from the parts kit the fabric is what you look at, so the graybox's own coloured slabs and
  // hatches would sit on top of the thing they stand for -- a grey ramp across the gangway you can actually see.
  // They stay, because they are what the raycaster hits and what the click UI resolves against, but they turn
  // into proxies: invisible until the pointer finds them, when View.setHover fades them up (see view.js).
  const proxyOnly = () => (overrides.parts ?? []).some(p => p?.part === 'shell' || p?.part === 'drum' || p?.part === 'panorama' || p?.part === 'plate' || p?.part === 'open' || p?.part === 'prism');
  const asProxy = mesh => {
    if (!proxyOnly()) return mesh;
    // depthWrite off as well as invisible: a transparent material still writes depth by default, so a proxy you
    // cannot see would quietly occlude whatever is behind it -- which, in a painted room, is the painting.
    mesh.traverse(m => { if (m.material) { m.material = m.material.clone(); m.material.transparent = true; m.material.opacity = 0; m.material.depthWrite = false; } });
    mesh.userData.proxy = true;
    return mesh;
  };
  // A painted room (a plate turn, or a panorama) draws its own fabric, and the package is asked to draw it EMPTY:
  // no actors, nothing takeable, because those move and a painting cannot. So in a painted room the things that
  // move stay visible and are drawn over the artwork, while the fabric the painting already shows -- exits, doors,
  // scenery words -- becomes an invisible pick target as usual. Without this the ambassador walks into the room
  // and nothing happens on screen, which is the opposite of what the emptiness rule was for.
  const painted = () => (overrides.parts ?? []).some(p => p?.part === 'plate' || p?.part === 'panorama');
  const register = (mesh, data, keepVisible = false) => {
    if (keepVisible && painted()) {
      // A plate is drawn with the depth buffer ignored so it can cover the fabric, which means it would also cover
      // anything standing in the room. Things that move are put in front of it explicitly.
      mesh.traverse(m => { m.renderOrder = 20; });
    } else asProxy(mesh);
    mesh.userData.pickable = { mesh, ...data };
    pickables.push(mesh.userData.pickable);
    group.add(mesh);
    return mesh;
  };

  // The room's fabric (DR-063). A room that lists `parts` in its scene file describes its own shell, openings,
  // stair and dressing from the kit; everything below this line -- the exits, doors, objects, actors and scenery
  // words -- is unchanged, still pickable, and drawn over the top. A room that lists no shell part keeps the
  // graybox box, so nothing that has not been built yet changes at all.
  // A package that authors its own lighting replaces the scene file's guessed lamps entirely (DR-092): the scene
  // files' `light` parts were the development agent reading the comps, and the package's are the design agent
  // saying what the room has. Two layers of that is worse than either.
  // Over a whole painted turn a lamp's housing is the painting's to draw, like every other fixed thing in the room:
  // drawn as well, it is a glowing slab in front of the picture wherever the authored position and the painted lamp
  // differ, and they do (DR-107, SanFac A). Its light still falls on what moves.
  const wholeTurn = (overrides.parts ?? []).some(p => p?.part === 'plate' && p.depth === true);
  const authored = overrides.lighting?.fixtures
    ? fixtureParts({ lighting: overrides.lighting }).map(l => wholeTurn ? { ...l, housing: false } : l)
    : null;
  // A painting is hung round the eye it was painted from, which is where the camera stands: a plate or panorama
  // that names no `at` of its own takes the room's eye. Left at the origin they hung 1.6 m below the camera, so every
  // view's horizon sat 7.6 degrees low at its centre and bent up to a peak at each seam -- invisible where seams fall
  // on walls, plain on the Winding Stair's open sea (DR-109, 2026-09-13).
  const hungFrom = overrides.eye ?? [0, 1.6, 0];
  // ...but only THIS ROOM'S lamps. A scene file carries its neighbours' geometry too (ARTWORK-BRIEF 2.6: a glimpse
  // through a doorway is the neighbour's own), and their lamps came with it. The rule above was written when a scene
  // held nothing but the room itself, so it took those as well: the Gangway authors two fixtures and its scene has
  // thirteen lamps, eleven of them Deck Nine's and Deck Eight's seen up and down the well, and all eleven went out.
  // Seven rooms were losing light that way, four of them accepted and painted. The fabric stamps each light with the
  // room it belongs to (the `stamp` helper in every scripts/fabric-*.mjs); an unstamped light is treated as the
  // room's own -- which is what every light was before the stamp, so a scene not yet recut behaves as it always did.
  const ownLamp = p => p?.part === 'light' && !p.room;
  const partSpecs = (authored
    ? [...(overrides.parts ?? []).filter(p => !ownLamp(p)), ...authored]
    : (overrides.parts ?? [])).map(p => (p?.part === 'plate' || p?.part === 'panorama') && !p.at ? { ...p, at: hungFrom } : p);
  if (partSpecs.length) {
    const { group: fabric, missing } = buildParts(g, partSpecs, ctx);
    group.add(fabric);
    if (missing.length) console.warn(`${room.id}: no such part: ${[...new Set(missing)].join(', ')}`);
  }
  // A painted room needs no graybox box either: its walls are in the pictures. Left in, they are opaque surfaces
  // two metres away that occlude the plates twelve metres out -- which only shows once the plates respect depth.
  const builtShell = partSpecs.some(p => p?.part === 'shell' || p?.part === 'drum' || p?.part === 'panorama' || p?.part === 'plate' || p?.part === 'open' || p?.part === 'prism');

  // Shell
  if (!builtShell) {
    const floor = box(W, 0.1, D, overrides.floor ?? COLORS.floor); floor.position.y = -0.05; group.add(floor);
    const ceiling = box(W, 0.1, D, COLORS.ceiling); ceiling.position.y = H + 0.05; group.add(ceiling);
    for (const [dir, w] of Object.entries(WALL)) {
      const len = w.axis === 'z' ? W : D;
      const wall = box(len, H, 0.1, overrides.wall ?? COLORS.wall);
      wall.position.y = H / 2; wall.position[w.axis] = w.sign * ((w.axis === 'z' ? D : W) / 2 + 0.05); wall.rotation.y = w.rot; group.add(wall);
    }
  }
  // Compass letters high in the left corner of each wall so orientation is always visible without covering the exit labels at the wall centre.
  // A graybox aid only: a painted room's walls are pictures, not the graybox's four, and the letters floated over the
  // paintings in the game and on the review page alike (the dorms, the SanFacs, Deck Nine, the Balcony; audit of
  // 2026-09-18). The compass strip says which way is which in every room.
  if (!painted()) for (const [dir, w] of Object.entries(WALL)) {
    const s = label(dir[0], { size: 0.35, color: '#7fa6bd', background: 'rgba(0,0,0,0)' });
    const across = w.axis === 'z' ? 'x' : 'z', len = w.axis === 'z' ? W : D;
    s.position.y = H - 0.3; s.position[w.axis] = w.sign * ((w.axis === 'z' ? D : W) / 2 - 0.1);
    s.position[across] = (dir === 'NORTH' || dir === 'EAST' ? -1 : 1) * (w.axis === 'z' ? 1 : -1) * (len / 2 - 0.6);
    group.add(s);
  }

  // Exits. IN/OUT aliases of a compass exit to the same target are folded into that wall. A blocked exit the metadata
  // gives no position has nothing there to draw (DR-046).
  const live = g.exitsHere({ hidden: true }).filter(e => knownInDark(g, e));   // in the dark, only the way back (parser.exitChoices)
  const exits = live.filter(e => !e.hidden);
  // A door of an exit a rule hides while it can only refuse (a lift in transit) is drawn anyway, closed and
  // unpickable, so the car is never a room with no door at all — unless an exit you can still use draws that same
  // door (the escape pod's east, out and up are one door, and only one of them is hidden). One panel per door, on a
  // compass wall where the room offers one (DR-046).
  const usedDoors = new Set(exits.filter(e => e.door && e.doorVisible).map(e => e.door));
  const hiddenDoors = [];
  for (const e of live) {
    if (!e.hidden || !e.door || !e.doorVisible || usedDoors.has(e.door)) continue;
    const i = hiddenDoors.findIndex(h => h.door === e.door);
    if (i < 0) hiddenDoors.push(e);
    else if (!WALL[hiddenDoors[i].direction] && WALL[e.direction]) hiddenDoors[i] = e;
  }
  const placed = new Map(); // target|door -> exit already drawn
  const wallSlots = { NORTH: 0, SOUTH: 0, EAST: 0, WEST: 0 };
  const slotOffset = wall => { const n = wallSlots[wall]++; return n === 0 ? 0 : (n % 2 ? 1 : -1) * Math.ceil(n / 2) * 2.2; };
  const wallPos = (wall, offset, y, inset = 0) => {
    const w = WALL[wall]; const p = new THREE.Vector3(0, y, 0);
    p[w.axis] = w.sign * ((w.axis === 'z' ? D : W) / 2 - inset); p[w.axis === 'z' ? 'x' : 'z'] = offset * (wall === 'NORTH' || wall === 'EAST' ? -1 : 1) * (w.axis === 'z' ? 1 : -1);
    return p;
  };
  const compassExits = exits.filter(e => WALL[e.direction] || DIAG[e.direction]);
  const otherExits = exits.filter(e => !WALL[e.direction] && !DIAG[e.direction]);
  const drawn = [];
  // Where each exit's name plate went, so nothing drawn after it (another exit's plate, a global's or scenery word's
  // plaque placed by turn) is laid over it.
  const exitLabels = [];
  const CEIL = H - 0.25;
  // An exit's plate sits at the head of its own opening, on the lintel line: from its authored position and height
  // (the metadata's `position` is the opening's centre), under the ceiling. Lower, it lay over what a door has painted
  // in its upper half (Deck Nine's pod door, EMERGENCY ESCAPE POD). It used to be 2.55 m whatever the opening was, which put
  // the Courtyard's SOUTH -- a stair mouth at floor level -- 40 degrees up in the sky, and Deck Nine's EAST on its
  // 2.3 m ceiling lamp. A way down keeps its plate just above the hole, and a way up no more than 0.6 m over its
  // proxy, which a stair bay puts at the head of the flight rather than the bay's centre (the Balcony: UP's proxy at
  // 2.2 m in a bay 3 m high). A graybox exit keeps the old heights.
  const exitLabelY = (kind, p, o, y) => {
    if (!o?.position) return Math.min(kind === 'down' ? 0.5 : kind === 'up' ? y + 0.9 : 2.55, H - 0.3);
    if (kind === 'down') return Math.min(p.y + 0.45, CEIL);
    const top = p.y + (o.height ?? 2.2) / 2 - 0.05;
    return Math.max(p.y, Math.min(kind === 'up' ? Math.min(top, p.y + 0.6) : top, CEIL));
  };
  const nearExitLabel = (q, gap) => exitLabels.some(l => l.distanceTo(q) < gap);
  for (const e of [...compassExits, ...otherExits, ...hiddenDoors]) {
    const key = (e.target ?? e.routine ?? e.direction) + '|' + (e.door ?? '');
    if (placed.has(key) && !WALL[e.direction] && !DIAG[e.direction]) { placed.get(key).aliases.push(e.direction); continue; }
    const o = overrides.exits?.[e.direction];
    if (e.kind === 'blocked' && o?.draw === false) continue;   // the room's design says there is no opening, hatch or shaft this way
    let wall, offset, y = 1.1, kind = 'exit';
    if (WALL[e.direction]) { wall = e.direction; offset = slotOffset(wall); }
    else if (DIAG[e.direction]) { wall = DIAG[e.direction][0]; offset = (wall === 'NORTH' ? -1 : 1) * (DIAG[e.direction][1] === 'EAST' ? 1 : -1) * (W / 2 - 1); }   // wallPos mirrors x on the north wall only
    else if (e.direction === 'UP') { wall = 'NORTH'; offset = W / 2 - 1; kind = 'up'; }
    else if (e.direction === 'DOWN') { wall = 'SOUTH'; offset = -(W / 2 - 1); kind = 'down'; }
    else { wall = e.direction === 'IN' ? 'WEST' : 'SOUTH'; offset = slotOffset(wall); }
    const w = WALL[wall];
    let mesh;
    if (kind === 'up') { mesh = box(1.2, 0.2, 1.6, COLORS.hatch); mesh.rotation.z = 0; mesh.rotation.x = -0.9; y = 1.6; }
    else if (kind === 'down') { mesh = box(1.4, 0.12, 1.4, COLORS.hatch); y = 0.06; }
    else if (e.kind === 'blocked') mesh = box(1.3, 2.2, 0.12, COLORS.blocked);
    else if (e.hidden) mesh = box(1.3, 2.2, 0.12, COLORS.closed);   // hidden with its exit: the door is still there, shut
    else if (e.door && e.doorVisible) mesh = box(1.3, 2.2, 0.12, e.open ? COLORS.open : COLORS.closed);
    else mesh = box(1.3, 2.3, 0.12, COLORS.opening, { emissive: 0x000000 });
    const p = o?.position ? new THREE.Vector3(...o.position) : wallPos(wall, offset, y, kind === 'down' ? 1.2 : kind === 'up' ? 0.9 : 0.02);
    mesh.position.copy(p); mesh.rotation.y = w.rot + (mesh.rotation.y || 0);
    const entry = { kind: 'exit', exit: e, direction: e.direction, aliases: [], position: [p.x, p.y, p.z] };
    if (e.kind === 'blocked' || e.hidden) group.add(asProxy(mesh)); else register(mesh, entry);   // a blocked exit only refuses, and a door hidden with its exit can't be worked: drawn, not clickable
    placed.set(key, entry); drawn.push(entry);
    // A routine exit says what its rule module knows (parser.exitNote) and nothing otherwise: it used to write " · ?",
    // which read as a fault on every painted wall it hung on (the shuttle cars' platform doorways).
    const note = e.kind === 'routine' ? exitNote(g, e) : null;
    const text = e.direction + (e.hidden ? ' · door closed' : e.door && e.doorVisible ? (e.open ? ' · door open' : ' · door closed') : e.kind === 'blocked' ? ' · blocked' : note ? ' · ' + (isMarker(note) ? note.slice(1, -1) : note) : '');
    // A package or scene file may nudge its own exit plate, as it already can an object's and a plaque's
    // (`labelOffset`). A number lifts it, like theirs; [x, y, z] moves it sideways as well, because an exit plate
    // hangs in the middle of its own doorway and up is not always where the room has room. The Winding Stair's
    // "DOWN · Balcony" sat squarely across the balcony, with the sea on one side and the tower's stonework on the
    // other: "would be nice to move this text up and to the left so it doesnt cover the most interesting part of
    // this view" (the user, 2026-09-21). Applied after the plate's own height is worked out, so it moves the plate
    // from wherever that puts it rather than replacing the rule.
    const nudge = Array.isArray(o?.labelOffset) ? o.labelOffset : [0, Number(o?.labelOffset) || 0, 0];
    const s = label(text, { size: 0.42 }); s.position.copy(p); s.position.y = exitLabelY(kind, p, o, y);
    s.position.x += Number(nudge[0]) || 0; s.position.y += Number(nudge[1]) || 0; s.position.z += Number(nudge[2]) || 0;
    // Two exits through one opening (the Courtyard's SOUTH and DOWN, one stair mouth) would stack their plates: the
    // later one steps away, down for a way down and up for anything else.
    for (let k = 0; k < 4 && nearExitLabel(s.position, 0.45); k++) s.position.y += kind === 'down' ? -0.45 : 0.45;
    exitLabels.push(s.position.clone()); group.add(s);
  }
  for (const d of drawn) if (d.aliases.length) { /* aliases are listed by the compass strip */ }

  // Objects present: placeholders in a ring around the viewpoint, sized by trait.
  const scene = g.sceneObjects();
  // A dark room draws only its exits (parser.dark: the menus then offer exits and the quick buttons).
  const shown = id => isVisible(g, id) && !dark(g);
  const { vehicle } = scene, here = scene.here.filter(shown), inVehicle = scene.inVehicle.filter(shown), globals = scene.globals.filter(shown);
  const ids = [...here, ...inVehicle];
  // Where each thing stands: its own scene position; else Floyd's spot from the room's design metadata
  // (actors.FLOYD) and the loose things (takeable, not held by a vehicle) on the metadata's dropped-item anchors, in
  // order: what is already down keeps its anchor (anchorMemory), a new drop takes the first free one, and a thing
  // picked up frees its anchor. Whatever is left goes on the ring round the eye. The ring's radius stays inside small
  // rooms (Booth 2 is 4.2 x 3.4 m, where min(W, D) / 2 - 1.6 alone would put things at the eye) and is unchanged for
  // 5 m and up.
  const anchors = overrides.droppedItems?.anchors ?? [];
  const spot = new Map();
  // A thing's own authored place, while it still holds: one marked untilTouched gives it up once the player has
  // handled the thing (TOUCHBIT), and from then on it is loose like anything else put down.
  const ownPlace = id => { const o = overrides.objects?.[id]; return o?.position && !(o.untilTouched && g.fsetP(id, 'TOUCHBIT')) ? o.position : null; };
  // Any actor the room places, not only Floyd. Floyd was the only one authored when this was written, so his id
  // was written into it -- which meant Blather, the ambassador and the Bio Lab monsters all fell through to the
  // ring solver and stood wherever it put them, however carefully a package had placed them.
  for (const [id, a] of Object.entries(overrides.actors ?? {})) {
    if (a?.position && ids.includes(id) && !ownPlace(id)) spot.set(id, a.position);
  }
  // A thing an actor carries is depicted in that actor's own artwork, so it wants no place of its own: the
  // ambassador's celery is moved into the ROOM rather than into him (ship.js 243), which without this puts a
  // second box out on the ring beside the one he is drawn holding. It stays a real object and stays clickable --
  // only where you click it moves, to where he is.
  for (const [id, o] of Object.entries(overrides.objects ?? {})) {
    if (o?.drawnWith && ids.includes(id) && ids.includes(o.drawnWith) && !o.position) {
      const host = spot.get(o.drawnWith) ?? overrides.actors?.[o.drawnWith]?.position;
      if (host) spot.set(id, host);
    }
  }
  const loose = ids.filter(id => here.includes(id) && !ownPlace(id) && g.objects[id].flags.includes('TAKEBIT') && !g.objects[id].flags.includes('ACTORBIT'));
  const kept = anchorMemory.get(g.state.here) ?? new Map(); anchorMemory.set(g.state.here, kept);
  for (const [id, k] of kept) if (!loose.includes(id) || k >= anchors.length) kept.delete(id);
  const taken = new Set(kept.values());
  for (const id of loose) if (!kept.has(id)) { const k = anchors.findIndex((_, i) => !taken.has(i)); if (k < 0) break; kept.set(id, k); taken.add(k); }
  for (const [id, k] of kept) spot.set(id, anchors[k]);
  // The ring: the arc from NE round the south to NW, leaving north clear. An even spacing along it can land on an
  // anchor already in use or in an exit's lane where the ring is tight (Upper Elevator's radius is 0.9 m), so each
  // thing takes the point on the arc that best clears the spots in use and the lanes from the eye to every exit you
  // can walk through (DR-046).
  const ring = ids.filter(id => !ownPlace(id) && !spot.has(id));
  const radius = Math.min(Math.min(W, D) / 2 - 0.4, Math.max(0.9, Math.min(W, D) / 2 - 1.6));
  const eyeAt = overrides.eye ?? [0, 1.6, 0];
  const lanes = drawn.filter(d => d.exit.kind !== 'blocked' && !d.exit.hidden).map(d => d.position);
  const laneDist = (c, q) => {   // floor-plane distance from c [x, z] to the eye-to-exit segment
    const ax = eyeAt[0], az = eyeAt[2], dx = q[0] - ax, dz = q[2] - az, len2 = dx * dx + dz * dz;
    const t = len2 ? Math.max(0, Math.min(1, ((c[0] - ax) * dx + (c[1] - az) * dz) / len2)) : 0;
    return Math.hypot(c[0] - (ax + t * dx), c[1] - (az + t * dz));
  };
  const busy = [...spot.values()].map(p => [p[0], p[2]]);
  const STEPS = 48;
  for (const id of ring) {
    let best = null;
    for (let k = 0; k <= STEPS; k++) {
      const a = Math.PI * 0.25 + k * (Math.PI * 1.5 / STEPS);
      const c = [Math.sin(a) * radius, -Math.cos(a) * radius];
      const clear = Math.min(...busy.map(b => Math.hypot(c[0] - b[0], c[1] - b[1])), ...lanes.map(l => laneDist(c, l)), 99);
      if (!best || clear > best.clear) best = { c, clear };
    }
    busy.push(best.c); spot.set(id, [best.c[0], 0, best.c[1]]);
  }
  ids.forEach(id => {
    const o = overrides.objects?.[id]; const traits = g.objects[id].flags;
    // An actor is anyone the room's design places as one, as well as anything the game has flagged ACTORBIT. Floyd
    // has the flag only while he is switched on (floyd.js), so a Floyd who was off -- which is how the review page's
    // switch brings him in -- fell through to the fixed-scenery branch and, in a painted room, became an invisible
    // pick target: present, clickable, and never seen (the user, Dorm A and the Balcony, 2026-09-13). A painting is
    // asked to leave every actor out, so any of them the room lists has to be drawn over it, whatever state he is in.
    const actor = traits.includes('ACTORBIT') || !!overrides.actors?.[id], veh = traits.includes('VEHBIT') || traits.includes('CLIMBBIT'), item = traits.includes('TAKEBIT');
    // An actor's size may be authored beside its position. Without this every actor was a person-shaped box: Floyd
    // is four feet and drew at 1.7 m, and the ambassador's tripod is far wider than 0.6 m. The fallbacks stay for
    // everything a package has not measured.
    // An actor we have a picture of is drawn as that picture rather than as a coloured box. The cutout's width
    // comes from the image, so the authored size is only consulted for the footprint the room has to keep clear.
    // A character may have other pictures for other states (Floyd switched off: data/characters.json `variants`, each
    // with a `when` in the scene-condition language); the first whose condition holds replaces the base picture.
    // A thing may have a picture too (the Mess Corridor's padlock, 2026-09-14), not only an actor: anything with an
    // entry in characters.json is drawn as its cutout.
    const base = ctx.characters?.[id];
    const variant = base?.variants?.find(v => when(g, v.when));
    // An entry with no picture of its own draws only in its variants' states: the Kitchen dispenser is part of the
    // painting, and only its damage (MUNGEDBIT) is an overlay over it.
    // A picture on a thing's face (`facing`) is damage painted over the painting's own dispenser, so it is drawn only
    // where the room is painted: over a graybox it would be soot floating on a grey box.
    // A variant whose image is null is a state the picture does not show, so the thing is its box again: the ladder's
    // picture is the collapsed ladder, and extended to eight metres (across the rift) it is not that (2026-09-15).
    const drawn = variant ? (variant.image === null ? undefined : { ...base, ...variant }) : base?.image ? base : undefined;
    const art = drawn?.facing != null && !painted() ? undefined : drawn;
    const authored = o?.size ?? (actor ? overrides.actors?.[id]?.size : undefined);
    // A FLAT thing (characters.json `flat`: a card, a paper, a folded uniform) is drawn top-down, so it lies on its
    // surface as a decal rather than standing up as a cutout: `height` is then its length on the surface, the
    // picture's top edge pointing north, and its box is a sliver (the DR-099 rule for flat things).
    const size = art?.flat
      ? [art.height * (art.aspect ?? 1), 0.02, art.height]
      : art
      ? [art.height * (art.aspect ?? 0.5), art.height, art.depth ?? 0.5]
      : authored ?? (actor ? [0.6, 1.7, 0.4] : veh ? [2.2, 1.2, 2.2] : item ? [0.45, 0.35, 0.45] : [0.8, 0.8, 0.8]);
    const color = o?.color ?? (actor ? COLORS.actor : veh ? COLORS.vehicle : item ? COLORS.item : COLORS.scenery);
    const at = spot.get(id);   // anchors, Floyd's spot and the ring are floor points: the box stands on them
    // ...unless the actor opts in to its authored height (actors.<ID>.anchorHeight): ESCALATOR's Floyd stands on a
    // tread 6.67 m up a 17.6 m shaft. Everywhere else foot is 0, so the placement is unchanged by construction.
    const a = overrides.actors?.[id];
    const foot = a?.anchorHeight && Array.isArray(a.position) ? a.position[1] : 0;
    const p = ownPlace(id) ? new THREE.Vector3(...ownPlace(id)) : new THREE.Vector3(at[0], foot + size[1] / 2, at[2]);
    const mesh = art?.flat
      ? buildParts(g, [{ part: 'decal', image: art.image, at: [p.x, Math.max(0.005, p.y - size[1] / 2 + 0.004), p.z], size: [size[0], size[2]] }], ctx).group
      : art
      // Standing on the floor where the ring or an anchor puts it, or hung at its authored place (the padlock on its
      // hasp): the picture's foot goes at the base of the thing's own box, reckoned from the BASE picture's height,
      // so a variant drawn taller (the open padlock's raised shackle) keeps the same foot.
      // A picture that lies on the thing's face (`facing`, the dispenser's damage) goes on the front of its box, half
      // its depth out from the centre the room gives, a millimetre proud of the painted face it covers.
      ? buildParts(g, [{ part: 'cutout', image: art.image, at: art.facing == null
          ? [p.x, Math.max(0, p.y - (base.height ?? size[1]) / 2), p.z]
          : onFace(p, art), height: art.height, aspect: art.aspect ?? 0.5, eye: eyeAt, facing: art.facing }], ctx).group
      : box(...size, color);
    if (!art) mesh.position.copy(p);
    if (id === vehicle) mesh.material.opacity = 0.35, mesh.material.transparent = true;
    // A fixed thing is only a pick target in a painted room (the painting draws it), unless it has a picture to show
    // over the painting in this state -- then that picture is drawn, like any thing that moves.
    // ...and a large object the package paints into the room (design.js `painted`: the extended ladder across the
    // rift) is the painting's too: a pick target only, whatever its flags say.
    // BUT ONLY IN THE STATE THE PAINTING ACTUALLY SHOWS IT, which is what `paintedWhen` names. `largeObjects` does
    // two jobs -- "the picture already draws this" and "something big lies here" -- and reading the second as the
    // first makes a carried thing vanish. The ladder is listed in eight rooms and painted in one of them, lying
    // across the rift; where it is not painted, suppressing its box left a ladder you could take but not see (the
    // user, on the ladder toggle, 2026-09-16). It cannot be settled by asking whether a thing is takeable: the
    // ladder IS takeable and IS the painting's in the two rift rooms, which the rules only move it into once it
    // spans the gap. Each package says which of its large objects the picture has, and when.
    const shownByPainting = o?.painted && (!o.paintedWhen || when(g, o.paintedWhen));
    register(mesh, { kind: 'object', id, position: [p.x, p.y, p.z] }, (actor || item || veh || !!art) && !(shownByPainting && painted()));
    // The name plate sits above the thing's box, unless the room moves it: `labelOffset` in metres, negative to drop
    // it. Above is wrong wherever the player needs what is directly above -- the porthole over the pod's controls,
    // the key lying in the Admin Corridor's crevice.
    const s = label(g.name(id), { size: 0.38 }); s.position.set(p.x, p.y + size[1] / 2 + 0.35 + (o?.labelOffset ?? 0), p.z);
    s.userData.labelFor = id;                      // so the plate of whatever the pointer is on always wins its place
    group.add(s);
    // Contents of open containers sit on top -- or, where the room says where a container shows what is in it
    // (`contentsAt`: the Kitchen dispenser's niche), there, as their own pictures if they have them. Before this the
    // canteen in the dispenser was a grey box beside the machine (the user, 2026-09-14).
    const where = o?.contentsAt;
    // A container whose own picture already shows what is in it (characters.json `showsContents`: the medicine
    // bottle, painted with the medicine at the bottom) keeps its contents clickable but draws nothing for them --
    // otherwise the medicine stood over the bottle as an olive box (the user, 2026-09-18).
    const pictured = !!ctx.characters?.[id]?.showsContents;
    if (g.seeInside(id)) g.contents(id).forEach((c, j) => {
      if (pictured) {
        const pm = box(0.12, 0.12, 0.12, COLORS.item);
        pm.position.set(p.x, p.y, p.z);
        register(pm, { kind: 'object', id: c, position: [p.x, p.y, p.z] }, false);
        return;
      }
      const cb = ctx.characters?.[c], cv = cb?.variants?.find(v => when(g, v.when));
      const ca = cv ? (cv.image === null ? undefined : { ...cb, ...cv }) : cb?.image ? cb : undefined;
      // A THING WE HAVE A PICTURE OF IS DRAWN AS THAT PICTURE WHEREVER IT STANDS, not only where the room has
      // authored a place for it. The picture used to be conditional on `contentsAt`, so a content with perfectly
      // good art still came out as a 0.3 m COLORS.item box (0xd9b45a, tan) unless its room happened to have
      // authored one -- and only a handful ever had. That box is what the user reported as "lab unifor open toggle
      // results in a brown block being painted on the lab uniform" (LAB-STORAGE), as the block on Storage East's
      // carton, and as "a weird 2d box covers part of it" on Planetary Defense's access panel: one fault, reported
      // four times over five days, each time read as a room's own problem. The box is now what it was always meant
      // to be -- the fallback for a content we have no picture of at all.
      const lid = p.y + size[1] / 2;                    // the top of the container, where its contents sit
      const cp = where ? [where[0] + j * 0.2, where[1], where[2]] : [p.x + (j - 0.5) * 0.35, lid + 0.13, p.z];
      // `contentsAt` gives the CENTRE of the thing (the Kitchen's niche), so the foot is reckoned from its height;
      // without one, the contents stand on the container's lid.
      const foot = where ? Math.max(0, cp[1] - (cb?.height ?? 0.3) / 2) : lid;
      // A FLAT thing lies on the surface as a decal rather than standing up as a cutout, the same DR-099 rule the
      // room's own things follow -- the cards, the papers and the fromitz boards are all flat.
      const m = ca
        ? buildParts(g, [ca.flat
          ? { part: 'decal', image: ca.image, at: [cp[0], Math.max(0.005, foot + 0.004), cp[2]], size: [ca.height * (ca.aspect ?? 1), ca.height] }
          : { part: 'cutout', image: ca.image, at: [cp[0], foot, cp[2]], height: ca.height, aspect: ca.aspect ?? 0.5, eye: eyeAt }], ctx).group
        : box(0.3, 0.25, 0.3, COLORS.item);
      if (!ca) m.position.set(...cp);
      register(m, { kind: 'object', id: c, position: cp }, true);
    });
  });
  // Referable globals (window, controls, stairway...) and scenery words as plaques on the walls. A placed plaque with
  // no wall faces the wall nearest its position (not the next wall in turn); a `size` [w, h, d] shrinks the pick proxy
  // so small neighbouring controls (Booth 2's slot and buttons) are clicked one at a time, and a small plaque's label
  // goes to its right so a stack of them stays readable.
  const plaqueWalls = ['EAST', 'WEST', 'SOUTH', 'NORTH'];
  const nearestWall = p => { const e = W / 2 - Math.abs(p[0]), n = D / 2 - Math.abs(p[2]); return e <= n ? (p[0] >= 0 ? 'EAST' : 'WEST') : (p[2] >= 0 ? 'SOUTH' : 'NORTH'); };
  const plaque = (o, turn, dims, y, inset, color, text, labelColor, labelSize, labelLift, data) => {
    // A plaque the package says is there only in some states (`when`, the scene-condition language): Lawanda's
    // "shuttle car" is on Betty's flank, and Betty is not always in her berth.
    if (o?.when && !when(g, o.when)) return;
    let wall = o?.wall ?? (o?.position ? nearestWall(o.position) : turn);
    const [pw, ph, pd] = o?.size ?? dims;
    const mesh = box(pw, ph, pd, color);
    let p = o?.position ? new THREE.Vector3(...o.position) : null;
    // A plaque with no place of its own goes round the walls in turn, which knows nothing of the room: it is a
    // fallback, and it must never cover an exit's plate (the Balcony's "window" hid its UP). Next slot, next wall,
    // until its plate is clear of every exit's.
    if (!p) {
      const order = [turn, ...plaqueWalls.filter(x => x !== turn)];
      for (let k = 0; k < 8; k++) {
        const wk = order[k % order.length];
        const q = wallPos(wk, slotOffset(wk), y, inset);
        wall = wk; p = q;
        if (!nearExitLabel(q.clone().setY(q.y + labelLift), 1.0)) break;
      }
    }
    const w = WALL[wall];
    mesh.position.copy(p); mesh.rotation.y = w.rot;
    register(mesh, { ...data, position: [p.x, p.y, p.z] });
    if (o?.size && ph < 0.3) {   // beside, to the viewer's right (the plaque's local +x faces into the room's right-hand side)
      const s = label(text, { size: Math.max(0.12, Math.min(labelSize, ph + 0.06)), color: labelColor });
      const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), w.rot);
      s.position.copy(p).addScaledVector(right, pw / 2 + s.scale.x / 2 + 0.04); group.add(s);
    } else {
      const s = label(text, { size: labelSize, color: labelColor }); s.position.copy(p); s.position.y += (o?.size ? ph / 2 + 0.15 : labelLift) + (o?.labelOffset ?? 0); group.add(s);
    }
  };
  globals.filter(id => !g.fsetP(id, 'DOORBIT') && !ids.includes(id)).forEach((id, i) => {
    plaque(overrides.globals?.[id], plaqueWalls[i % plaqueWalls.length], [0.7, 0.5, 0.08], 1.9, 0.06, COLORS.scenery, g.name(id), '#b8c8d4', 0.3, 0.5, { kind: 'object', id, global: true });
  });
  // Scenery words (room PSEUDO entries) as small wall tags, one per routine, so "the button" or "the plaque"
  // can be clicked. The menu offers Examine plus whatever the rule module declares for the routine.
  let pseudoCount = 0;
  for (const p of pseudosHere(g)) {   // one tag per routine, hidden while rules.visible says the word makes no sense yet
    pseudoCount++;
    plaque(overrides.pseudos?.[p.routine], plaqueWalls[(pseudoCount + globals.length) % plaqueWalls.length], [0.5, 0.35, 0.06], 1.3, 0.05, COLORS.pseudo, p.label, '#a9bfae', 0.26, 0.4, { kind: 'pseudo', word: p.word, label: p.label, routine: p.routine });
  }
  return { group, pickables, eye: overrides.eye ?? [0, 1.6, 0], name: room.name };
}
