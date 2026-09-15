import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { computeLayout, toWorld } from './layout.js';
const [worldResponse, layoutResponse] = await Promise.all([fetch('./data/world.json'), fetch('./data/layout.json')]);
if (!worldResponse.ok) throw new Error('world.json could not be loaded');
if (!layoutResponse.ok) throw new Error('layout.json could not be loaded');
const world = await worldResponse.json(), layout = await layoutResponse.json();
const rooms = world.rooms, byId = new Map(rooms.map(r => [r.id,r]));
const objects = world.objects ?? {};
const host = document.querySelector('#viewport');
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2)); host.appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color('#07121c');
const camera = new THREE.PerspectiveCamera(48,1,.1,5000);
const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true;
scene.add(new THREE.HemisphereLight(0xd6faff,0x173047,3));
// Grid layout from declared exit directions (see layout.js). Directions stay in the source graph;
// region anchors in data/layout.json are rendering choices only.
const grid = computeLayout(world, layout);
const indices = new Map(rooms.map((r,i)=>[r.id,i]));
const pos = rooms.map(r => new THREE.Vector3(...toWorld(grid.cells.get(r.id), layout.spacing)));
const misfit = new Set(grid.misfits.map(m => m.a+' '+m.d));
// One line per unordered room pair and kind; reciprocal exits would otherwise draw twice.
const seen = new Set();
const links = grid.edges.filter(({a,b,kind}) => { const k=[a,b].sort().join('|')+kind; if(seen.has(k)) return false; seen.add(k); return true; })
  .map(({a,b,kind}) => ({a:indices.get(a), b:indices.get(b), kind}));

// --- Source-declared state helpers (initial state only; nothing is simulated) ---
const isOpen = id => !!objects[id]?.flags.includes('OPENBIT');
const has = (id, flag) => !!objects[id]?.flags.includes(flag);
// Pickupable objects that start in a room, including those inside containers in the room.
function pickupables(roomId){
  const out=[]; const walk=id=>{ if(has(id,'TAKEBIT')) out.push(id); for(const c of objects[id]?.contents??[]) walk(c); };
  for(const id of byId.get(roomId).objects??[]) walk(id);
  return out;
}
// Door object controlling the connection between two rooms, if either side declares one.
function doorBetween(aId,bId){
  for(const [x,y] of [[aId,bId],[bId,aId]]) for(const e of byId.get(x).exits) if(e.target===y && e.door) return e.door;
  return null;
}

const meshes=[];
rooms.forEach((r,i)=>{
  const color=r.file==='compone.zil'?0x39c9dd:r.file==='comptwo.zil'?0x6b9cf1:0xb49adc;
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(4,2,4),new THREE.MeshStandardMaterial({color,roughness:.65}));
  mesh.position.copy(pos[i]);mesh.userData.room=r.id;scene.add(mesh);meshes.push(mesh);
});
const edgeGroup=new THREE.Group();scene.add(edgeGroup);
const doorGeometry=new THREE.BoxGeometry(1.6,1.6,1.6);
const doorMaterials={open:new THREE.MeshStandardMaterial({color:0x5fd38a,roughness:.5}),closed:new THREE.MeshStandardMaterial({color:0xe0655a,roughness:.5})};
const doorPairs=new Set();
for(const {a,b,kind} of links){
  const material=kind==='conditional'?new THREE.LineDashedMaterial({color:0xecb461,dashSize:1,gapSize:.7,transparent:true,opacity:.6}):new THREE.LineBasicMaterial({color:0x3a91a7,transparent:true,opacity:.35});
  const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([pos[a],pos[b]]),material);line.computeLineDistances();edgeGroup.add(line);
  // Door marker at the midpoint: green if the door starts open, red if it starts closed.
  const door=doorBetween(rooms[a].id,rooms[b].id); const pairKey=[a,b].sort().join('|');
  if(door && !doorPairs.has(pairKey)){
    doorPairs.add(pairKey);
    const marker=new THREE.Mesh(doorGeometry,doorMaterials[isOpen(door)?'open':'closed']);
    marker.position.copy(pos[a]).lerp(pos[b],.5);marker.userData.door=door;scene.add(marker);
  }
}
// Item badges: number of pickupable objects that start in the room, drawn as a sprite above it.
function badge(text){
  const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');
  g.fillStyle='#f0c860';g.beginPath();g.arc(32,32,28,0,Math.PI*2);g.fill();
  g.fillStyle='#10202c';g.font='bold 32px system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(text,32,34);
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));sprite.scale.set(3,3,1);return sprite;
}
let badgedRooms=0;
rooms.forEach((r,i)=>{const n=pickupables(r.id).length;if(!n)return;badgedRooms++;const s=badge(String(n));s.position.copy(pos[i]).add(new THREE.Vector3(0,3.4,0));scene.add(s);});

const select=document.querySelector('#room');
for(const r of [...rooms].sort((a,b)=>a.name.localeCompare(b.name))){const option=document.createElement('option');option.value=r.id;option.textContent=r.name+' · '+r.id;select.appendChild(option);}
const ROOM_FLAGS={ONBIT:'lit',RLANDBIT:'land',RWATERBIT:'water',FLOYDBIT:'Floyd may enter'};
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;};

// Render a description segment tree. Branches show every case with its ZIL condition; nothing is evaluated.
function renderSegments(segs,into){
  for(const s of segs){
    if(s.type==='text') into.appendChild(document.createTextNode(s.text));
    else if(s.type==='break') into.appendChild(el('br'));
    else if(s.type==='door'){const o=objects[s.object];into.appendChild(el('span','state '+(isOpen(s.object)?'open':'closed'),`${isOpen(s.object)?'open':'closed'} [${o?o.name:s.object}, at start]`));}
    else if(s.type==='value') into.appendChild(el('span','ref',`[${s.format} of ${s.of}]`));
    else if(s.type==='call') into.appendChild(el('span','ref',`[${s.expression}]`));
    else if(s.type==='branch'){
      const b=el('span','branch');
      s.cases.forEach((c,i)=>{
        const k=el('span','case');k.appendChild(el('em',null,(c.condition==='else'?'otherwise':'if '+c.condition)+': '));
        renderSegments(c.segments,k);b.appendChild(k);if(i<s.cases.length-1)b.appendChild(el('span','sep',' | '));
      });
      into.appendChild(b);
    }
  }
}
function renderObject(id,into,depth=0){
  const o=objects[id];if(!o)return;
  const row=el('div','object');row.style.marginLeft=(depth*14)+'px';
  const traits=o.traits.filter(t=>t!=='open');
  if(has(id,'DOORBIT')||has(id,'CONTBIT'))traits.push(isOpen(id)?'open at start':'closed at start');
  row.appendChild(el('strong',null,o.name));row.appendChild(el('span','id',' '+o.id));
  if(traits.length)row.appendChild(el('span','traits',' · '+traits.join(', ')));
  if(o.fdesc)row.appendChild(el('p','desc',o.fdesc));
  else if(o.ldesc)row.appendChild(el('p','desc',o.ldesc));
  if(o.text)row.appendChild(el('p','desc','Reads: '+o.text));
  if(o.truncated)row.appendChild(el('p','desc','Definition is cut off at the end of comptwo.zil; flags may be incomplete.'));
  into.appendChild(row);
  for(const c of o.contents)renderObject(c,into,depth+1);
}
let active=null;
function inspect(id, focus=true){
  const r=byId.get(id);active=id;select.value=id;
  document.querySelector('#name').textContent=r.name;
  const cell=grid.cells.get(id);
  document.querySelector('#source').textContent=`${r.id} · ${r.file}:${r.line} · region ${grid.regionOf.get(id)} · cell ${cell.join(',')}`;
  meshes.forEach(m=>m.material.emissive.setHex(m.userData.room===id?0x568e88:0));
  const panel=document.querySelector('#exits');panel.replaceChildren();
  // Description
  const d=r.description;
  const desc=el('div','description');
  desc.appendChild(el('h3',null,d.source==='LDESC'?'Description (LDESC)':d.source==='M-LOOK'?`Description (${d.routine}, M-LOOK)`:'Description'));
  const body=el('p');if(d.segments.length)renderSegments(d.segments,body);else body.textContent='No description text found in the source.';desc.appendChild(body);
  const flags=(r.flags??[]).map(f=>ROOM_FLAGS[f]??f);if(flags.length)desc.appendChild(el('p','meta','Room flags: '+flags.join(', ')));
  panel.appendChild(desc);
  // Doors and object state
  if(r.doors?.length){
    const sec=el('div','section');sec.appendChild(el('h3',null,'Doors'));
    for(const door of r.doors){const p=el('p');p.appendChild(el('span','state '+(door.initiallyOpen?'open':'closed'),door.initiallyOpen?'open':'closed'));p.appendChild(document.createTextNode(` at start · ${door.name} (${door.object})`+(door.exits.length?` · controls ${door.exits.join(', ')}`:' · listed as visible here')));sec.appendChild(p);}
    panel.appendChild(sec);
  }
  const items=pickupables(id);
  const sec=el('div','section');sec.appendChild(el('h3',null,`Objects at start (${r.objects?.length??0} here, ${items.length} pickupable)`));
  if(r.objects?.length)for(const o of r.objects)renderObject(o,sec);else sec.appendChild(el('p','meta','No objects start in this room.'));
  const visible=(r.globals??[]).filter(g=>!r.doors.some(d=>d.object===g)).map(g=>objects[g]?.name??g);
  if(visible.length)sec.appendChild(el('p','meta','Also referable here: '+visible.join(', ')));
  if(r.pseudo?.length)sec.appendChild(el('p','meta','Scenery words: '+r.pseudo.map(p=>p.word).join(', ')));
  panel.appendChild(sec);
  // Exits
  panel.appendChild(el('h3',null,'Exits'));
  for(const e of r.exits){
    const row=document.createElement('div');row.className='exit '+e.kind;
    const title=document.createElement('strong');title.textContent=e.direction+' / '+e.kind;row.appendChild(title);
    const detail=document.createElement('p');detail.textContent=e.target||e.routine||e.expression.join(' ');row.appendChild(detail);
    if(e.kind==='conditional'){
      const p=document.createElement('p');
      if(e.door){p.appendChild(document.createTextNode(`Needs ${objects[e.door]?.name??e.door} open · `));p.appendChild(el('span','state '+(isOpen(e.door)?'open':'closed'),isOpen(e.door)?'open at start':'closed at start'));}
      else p.textContent=`Needs flag ${e.flag}`+(e.elseMessage?` · otherwise: "${e.elseMessage}"`:'');
      row.appendChild(p);
    }
    if(e.target){const b=document.createElement('button');b.textContent='Inspect '+byId.get(e.target).name;b.onclick=()=>inspect(e.target);row.appendChild(b);}
    if(misfit.has(id+' '+e.direction)){const p=document.createElement('p');p.textContent='Drawn off-grid: the declared direction does not fit the placement of both rooms.';row.appendChild(p);}
    if(e.kind==='routine'){const p=document.createElement('p');p.textContent='Unresolved. Referenced rooms (not verified exits): '+(e.candidateRoomReferences.join(', ')||'none')+'.';row.appendChild(p);}
    panel.appendChild(row);
  }
  if(!r.exits.length)panel.appendChild(el('p','meta','No declared direction exits. Check room actions and event routines.'));
  if(focus){const p=pos[indices.get(id)];controls.target.copy(p);camera.position.copy(p).add(new THREE.Vector3(0,48,46));controls.update();}
}
select.onchange=()=>inspect(select.value);
function overview(){const box=new THREE.Box3().setFromPoints(pos);const center=box.getCenter(new THREE.Vector3());const size=box.getSize(new THREE.Vector3());const span=Math.max(size.x/Math.max(camera.aspect,.3),size.z,50);controls.target.copy(center);camera.position.copy(center).add(new THREE.Vector3(0,span*1.1,span*.6));controls.update();}
document.querySelector('#overview').onclick=overview;
const ray=new THREE.Raycaster();let down;
renderer.domElement.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);
renderer.domElement.addEventListener('pointerup',e=>{
 if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;
 const rect=renderer.domElement.getBoundingClientRect();ray.setFromCamera(new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);
 const hit=ray.intersectObjects(meshes)[0];if(hit)inspect(hit.object.userData.room);
});
function resize(){renderer.setSize(host.clientWidth,host.clientHeight);camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();}
new ResizeObserver(resize).observe(host);resize();overview();inspect('DECK-NINE',false);
if(grid.notes.length)console.info('Layout notes:\n'+grid.notes.join('\n'));
document.querySelector('#status').textContent=`${rooms.length} rooms · ${links.length} drawn connections · ${doorPairs.size} doors on connections · ${world.counts.pickupable} pickupable objects in ${badgedRooms} rooms · ${grid.misfits.length} off-grid exits · 25 routine exits awaiting review`;
renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera);});
