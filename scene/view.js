// Fixed-viewpoint 3D view: the player stands at one spot in the room and drags to look around.
// Clicks are raycast against the pickables the graybox builder registers.
import * as THREE from 'three';
import { setGrade, makeSkyMattesWith } from './grade.js';
import { skyMatte } from './skymatte.js';

// The grade finds the sky in each painting with a matte that needs a canvas to make, so the page -- the one place with
// a DOM -- hands it the maker. Every view on the page shares it, like the grade itself.
makeSkyMattesWith(skyMatte);

// A two-stop vertical gradient as a texture, for a sky room's background. A flat colour cannot say "the light is
// coming from over there", which is the whole point of the zenith and horizon pair the packages author.
let gradientCache = new Map();
function gradient(zenith, horizon) {
  const key = zenith + ':' + horizon;
  if (!gradientCache.has(key)) {
    const c = document.createElement('canvas'); c.width = 2; c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, '#' + zenith.toString(16).padStart(6, '0'));
    grad.addColorStop(1, '#' + horizon.toString(16).padStart(6, '0'));
    g.fillStyle = grad; g.fillRect(0, 0, 2, 128);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.mapping = THREE.EquirectangularReflectionMapping;
    gradientCache.set(key, tex);
  }
  return gradientCache.get(key);
}

export class View {
  constructor(host) {
    this.host = host;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    host.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#05090e');
    // Far enough for the sea: clipped at 200 m, a sea 11 m below the eye ended 3.3 degrees under the horizon, and a
    // painting grown from that blockout drew its horizon there (DR-109, Balcony). Depth is still fine to a millimetre
    // across a room at this ratio.
    this.camera = new THREE.PerspectiveCamera(70, 1, 0.05, 40000);
    this.eye = new THREE.Vector3(0, 1.6, 0);
    this.yaw = 0; this.pitch = 0;           // yaw 0 faces north (-Z)
    // A ROOM PAINTED AS A SINGLE VIEW CAN ONLY BE LOOKED AT WHERE ITS PAINTING REACHES. Set by game.js from the
    // room's registered views; null for a room with a full ring, which can be turned all the way round. See
    // clampYaw for why the allowance is computed from the camera rather than declared.
    this.clamp = null;
    this.room = null; this.pickables = [];
    this.hover = null; this.onPick = null;
    // Lights are rebuilt per room from the room's own day-phase look (setLighting, DR-060). Until a room supplies
    // one these two stand in, which is what every room used to get and is why they all looked alike.
    this.lights = new THREE.Group(); this.scene.add(this.lights);
    this.setLighting(null);
    this.ray = new THREE.Raycaster();
    this.bindPointer();
    new ResizeObserver(() => this.resize()).observe(host);
    this.resize();
    this.renderer.setAnimationLoop(() => this.render());
  }
  resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    this.renderer.setSize(w, h); this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
  }
  setRoom(group, pickables, eye) {
    if (this.room) this.scene.remove(this.room);
    this.room = group; this.pickables = pickables; this.scene.add(group);
    if (eye) this.eye.set(...eye);
    this.hover = null;
  }
  // Light the room from the day-phase look its package authored (scene/lighting.js turns metadata into these
  // plain values; this turns them into THREE objects). Called on every room build, because the look changes with
  // the room AND with the clock: the same balcony is three different places at 4000, 5500 and 6500.
  //
  // The lights reach only the fabric. The painted views are unlit, and what the phase does to them is the grade
  // (scene/grade.js), set here with the rest so nothing can light the room without also grading its paintings. It is
  // uniforms, so calling this alone -- no rebuild -- regrades every plate already hung.
  setLighting(desc) {
    setGrade(desc?.grade ?? null);
    this.lights.clear();
    if (this.skyDome) { this.scene.remove(this.skyDome); this.skyDome.geometry.dispose(); this.skyDome = null; }
    if (!desc) {                                   // no metadata: the flat fallback every room used to get
      this.lights.add(new THREE.HemisphereLight(0xe8f4ff, 0x1a2430, 1.6));
      const k = new THREE.PointLight(0xfff2dd, 12, 30, 1.6); k.position.set(0, 2.7, 0); this.lights.add(k);
      this.scene.background = new THREE.Color('#05090e');
      this.scene.fog = null;
      return;
    }
    this.lights.add(new THREE.AmbientLight(desc.ambient.color, desc.ambient.intensity));
    if (desc.key) {
      // `direction` points from the room towards the light (the schema's own wording), so it is the position.
      const sun = new THREE.DirectionalLight(desc.key.color, desc.key.intensity);
      sun.position.set(...desc.key.direction).multiplyScalar(60);
      this.lights.add(sun);
      // A little bounce from below, or everything the sun does not reach goes to pure black.
      this.lights.add(new THREE.HemisphereLight(desc.background.zenith ?? 0x223448, desc.seaTone ?? 0x2a2f36, 0.35));
    }
    if (desc.background.flat != null) this.scene.background = new THREE.Color(desc.background.flat);
    else this.scene.background = gradient(desc.background.zenith, desc.background.horizon);
    this.scene.fog = desc.fog ? new THREE.Fog(desc.fog.color, desc.fog.near, desc.fog.far) : null;
  }
  // The camera's vertical field of view, in degrees. The engine plays at 70; the dashboard's compare mode drives
  // this so a room's comp can be matched against the built view and the lens the comp was drawn at can be read off
  // (DR-066). Nothing in play changes it.
  setFov(deg) {
    this.camera.fov = Math.max(20, Math.min(150, deg));
    this.camera.updateProjectionMatrix();
  }
  get fov() { return this.camera.fov; }
  // Turn to face a point in the room (used when an exit or object is selected from the UI).
  faceTowards(p) {
    const d = new THREE.Vector3(...p).sub(this.eye);
    this.yaw = Math.atan2(-d.x, -d.z); this.pitch = Math.atan2(d.y, Math.hypot(d.x, d.z)) * 0.6;
  }
  // The arc a single-view room may be turned through, in radians either side of that view's bearing. It is NOT a
  // number anyone can declare, because it depends on the camera: the painting covers hfov/2 either side of its
  // bearing, the camera shows halfFovH either side of where it points, so the camera may only be turned by the
  // difference. At the default 70-degree lens on a wide canvas that is about 48 degrees of camera against 55 of
  // painting -- some 7 degrees of play. The metadata for the escape pod's nest claimed "about 40 degrees either
  // side", which a 110-degree painting cannot give: that would need a 176-degree one. Being strapped into a safety
  // web, barely able to turn, is the right answer anyway. Recomputed per frame so a window resize cannot open a gap.
  clampYaw(y) {
    if (!this.clamp) return y;
    const halfV = this.camera.fov * Math.PI / 180 / 2;
    const halfH = Math.atan(Math.tan(halfV) * this.camera.aspect);
    const allow = Math.max(0, this.clamp.hfov / 2 * Math.PI / 180 - halfH);
    const centre = -(this.clamp.bearing ?? 0) * Math.PI / 180;      // bearing runs clockwise from north, yaw the other way
    const d = Math.atan2(Math.sin(y - centre), Math.cos(y - centre));
    return centre + Math.max(-allow, Math.min(allow, d));
  }
  // UP AND DOWN NEED THE SAME TREATMENT AS LEFT AND RIGHT, and for a sharper reason: a single-view room has no caps,
  // so there is no painting above or below at all. The plate's vertical reach is its horizontal one scaled by the
  // picture's own shape -- at 110 degrees on a 1672x941 frame that is about 39 degrees, against a camera that shows
  // 35, leaving under 4 degrees of play. The first cut of this clamp allowed 20 and the escape pod's ceiling and
  // floor went blocky the moment the player climbed in, which is exactly what that arithmetic predicts.
  clampPitch(p) {
    if (!this.clamp) return p;
    const halfV = this.camera.fov * Math.PI / 180 / 2;
    const plateV = Math.atan(Math.tan(this.clamp.hfov / 2 * Math.PI / 180) * (this.clamp.aspect ?? 941 / 1672));
    const allow = Math.max(0, plateV - halfV);
    return Math.max(-allow, Math.min(allow, p));
  }
  // `null` frees the view; { bearing, hfov, aspect } pins it to that painting. Snaps at once, so entering a room
  // aimed somewhere its one painting does not reach turns you to what was painted instead of showing you the fabric.
  setClamp(clamp) {
    this.clamp = clamp ?? null;
    if (this.clamp) { this.yaw = this.clampYaw(this.yaw); this.pitch = this.clampPitch(this.pitch); }
  }
  // NAME PLATES THAT DO NOT PILE UP. Every label is a sprite scaled in WORLD units with depth testing off, which is
  // right for a thing standing in a room and wrong for writing about it: a plate two metres away is drawn many times
  // the size of one across the room, and because nothing occludes anything, a heap of dropped objects becomes a wall
  // of overlapping text. The user reported it from play (2026-09-17) after gathering every portable object in the
  // game into one room -- 45 of them, which the floor handles and the typography does not.
  //
  // Two rules, both applied per frame because both depend on where the camera is standing:
  //   SIZE   a plate may not take more than MAX_LABEL of the screen's height. Nearer no longer means bigger past
  //          that point, which is what made a close label a banner across the view.
  //   ROOM   plates are laid out nearest first, and one that would overlap a plate already placed is dropped for
  //          this frame. The nearest is the one the player is most likely to mean, and a plate that vanishes in a
  //          crowd comes back the moment it is alone or the player steps away.
  // Nothing is hidden permanently and no label is moved: a plate always sits over its own object or not at all.
  layOutLabels() {
    const cam = this.camera, out = [];
    this.room?.traverse(o => { if (o.isSprite && o.userData.label) out.push(o); });
    if (!out.length) return;
    // Every plate hidden while something outside asks for the room alone (`labelsHidden`: review-room.mjs's scan
    // copies). This runs every frame and shows each plate it places, so hiding a sprite from outside lasted until the
    // next frame -- the scan/ copies kept their labels and the straight-line check read them (2026-09-18).
    if (this.labelsHidden) { for (const s of out) s.visible = false; return; }
    // NDC spans 2 across the viewport, so a world size s at distance d covers s / (d * tan(fov/2)) of that 2 -- NOT
    // half of it. Getting that factor wrong makes every plate's footprint half its true size and lets pairs overlap
    // that the rule had already been asked to separate; it looked like the rule not working rather than like
    // arithmetic. Written out in one place, once, and used for both the clamp and the collision.
    const MAX_HEIGHT = 0.11;                                   // in NDC, so about 5.5% of the viewport's height
    const t = Math.tan(cam.fov * Math.PI / 180 / 2), here = cam.position;
    const v = new THREE.Vector3(), placed = [];
    const ndcOf = (world, d, across) => world / (d * t) / (across ? cam.aspect : 1);
    const seen = out.map(s => {
      s.visible = true;
      s.getWorldPosition(v);
      const d = Math.max(0.01, v.distanceTo(here));
      const ndc = v.clone().project(cam);
      const [bw, bh] = s.userData.labelScale;
      // Held back only when it would be too big; a distant plate is left alone rather than grown, since growing
      // the far ones would crowd the view the rule is here to keep clear.
      const natural = ndcOf(bh, d, false);
      const k = natural > MAX_HEIGHT ? MAX_HEIGHT / natural : 1;
      s.scale.set(bw * k, bh * k, 1);
      return { s, d, x: ndc.x, y: ndc.y, z: ndc.z, w: ndcOf(bw * k, d, true), h: ndcOf(bh * k, d, false) };
    });
    // WHATEVER THE POINTER IS ON KEEPS ITS PLATE, whatever else is in the way. Suppressing a plate in a crowd is
    // only tolerable because the player can always find out what a thing is by pointing at it; if the plate of the
    // thing under the pointer could itself be suppressed, the crowd would become unreadable instead of merely
    // uncluttered. So it is placed first and nothing can take its place.
    const under = this.hover?.id ?? null;
    seen.sort((a, b) => {
      const ha = a.s.userData.labelFor === under ? 0 : 1, hb = b.s.userData.labelFor === under ? 0 : 1;
      return ha - hb || a.d - b.d;
    });
    for (const o of seen) {
      if (o.z > 1 || Math.abs(o.x) > 1.3 || Math.abs(o.y) > 1.3) { o.s.visible = false; continue; }   // behind or off screen
      const hit = placed.some(p => Math.abs(p.x - o.x) < (p.w + o.w) / 2 && Math.abs(p.y - o.y) < (p.h + o.h) / 2);
      if (hit) o.s.visible = false; else placed.push(o);
    }
  }
  render() {
    if (this.clamp) { this.yaw = this.clampYaw(this.yaw); this.pitch = this.clampPitch(this.pitch); }
    this.camera.position.copy(this.eye);
    const dir = new THREE.Vector3(-Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), -Math.cos(this.yaw) * Math.cos(this.pitch));
    this.camera.lookAt(this.eye.clone().add(dir));
    // After the camera is aimed and before anything is drawn: which plates fit depends on where it is looking.
    this.camera.updateMatrixWorld();
    this.layOutLabels();
    this.renderer.render(this.scene, this.camera);
  }
  bindPointer() {
    const el = this.renderer.domElement; let down = null, dragged = false;
    el.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, yaw: this.yaw, pitch: this.pitch }; dragged = false; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', e => {
      if (down) {
        const dx = e.clientX - down.x, dy = e.clientY - down.y;
        if (Math.hypot(dx, dy) > 4) dragged = true;
        this.yaw = down.yaw - dx * 0.004; this.pitch = Math.max(-1.2, Math.min(1.2, down.pitch + dy * 0.004));
      } else this.setHover(this.pick(e));
    });
    el.addEventListener('pointerup', e => {
      const wasDrag = dragged; down = null; el.releasePointerCapture(e.pointerId);
      if (wasDrag) return;
      const hit = this.pick(e); if (hit && this.onPick) this.onPick(hit, e);
    });
    el.addEventListener('pointerleave', () => this.setHover(null));
  }
  pick(e) {
    const r = this.renderer.domElement.getBoundingClientRect();
    this.ray.setFromCamera(new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1), this.camera);
    const meshes = this.pickables.map(p => p.mesh);
    const hit = this.ray.intersectObjects(meshes, true)[0];
    if (!hit) return null;
    let o = hit.object; while (o && !o.userData.pickable) o = o.parent;
    return o ? o.userData.pickable : null;
  }
  setHover(p) {
    if (p === this.hover) return;
    // In a room built from the parts kit the pickable meshes are invisible proxies standing behind the fabric
    // (graybox.js `asProxy`), so the highlight has to fade them up rather than only light them: an emissive on a
    // mesh at zero opacity is an emissive nobody can see.
    const lift = (target, on) => target?.mesh.traverse(m => {
      if (m.material?.emissive) m.material.emissive.setHex(on ? 0x335566 : 0);
      if (target.mesh.userData.proxy && m.material) m.material.opacity = on ? 0.3 : 0;
    });
    lift(this.hover, false);
    this.hover = p;
    lift(p, true);
    this.renderer.domElement.style.cursor = p ? 'pointer' : 'grab';
    this.host.dispatchEvent(new CustomEvent('hover', { detail: p }));
  }
}
