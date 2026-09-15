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
  render() {
    this.camera.position.copy(this.eye);
    const dir = new THREE.Vector3(-Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), -Math.cos(this.yaw) * Math.cos(this.pitch));
    this.camera.lookAt(this.eye.clone().add(dir));
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
