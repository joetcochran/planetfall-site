// The day-phase grade in a painted view's own material (scene/lighting.js works out the numbers; this applies them).
//
// A painted view is hung unlit, MeshBasicMaterial, so no light in the scene can reach it -- which is right, because a
// painting carries its own light, and is why dusk and night changed nothing on screen. The grade is added to that
// same material rather than replacing it: three's own shader does the texture, the arc mask and the feathers exactly
// as before, and the grade only rewrites the colour between the map and the alpha, so a plate's edges cannot move.
//
// The numbers are uniforms shared by every graded material, so a change of phase -- or a slider on the review page --
// regrades every plate on the next frame without rebuilding the room. And when the grade is the identity the code
// is skipped outright rather than run with neutral numbers: by day the paintings must come out bit for bit as they
// were approved, and "multiply by one" is not guaranteed to be that on every GPU.
//
// No DOM here, like parts.js, so the kit's tests still build plates in node.
import * as THREE from 'three';

export const gradeUniforms = {
  pfGradeOn: { value: 0 },
  pfExposure: { value: 1 },
  pfTint: { value: new THREE.Vector3(1, 1, 1) },
  pfSaturation: { value: 1 },
  pfLift: { value: new THREE.Vector3(0, 0, 0) },
  pfSky: { value: 0 },
  pfZenith: { value: new THREE.Vector3() },
  pfHorizon: { value: new THREE.Vector3() },
  pfDayZenith: { value: new THREE.Vector3(1, 1, 1) },
  pfDayHorizon: { value: new THREE.Vector3(1, 1, 1) },
};

// Take a grade as lighting.js describes it (`look.grade`); null or an identity grade turns it off.
export function setGrade(g) {
  const u = gradeUniforms;
  u.pfGradeOn.value = g && !g.identity ? 1 : 0;
  if (!u.pfGradeOn.value) return;
  u.pfExposure.value = g.exposure;
  u.pfTint.value.set(...g.tint);
  u.pfSaturation.value = g.saturation;
  u.pfLift.value.set(...g.lift);
  u.pfSky.value = g.sky?.amount ?? 0;
  if (g.sky) {
    u.pfZenith.value.set(...g.sky.zenith); u.pfHorizon.value.set(...g.sky.horizon);
    u.pfDayZenith.value.set(...g.sky.dayZenith); u.pfDayHorizon.value.set(...g.sky.dayHorizon);
  }
}

// Which of a picture's pixels are sky, one matte per picture (scene/skymatte.js). Making one needs a canvas, and this
// file has no DOM, so the page hands in the maker (view.js) and this only asks for a matte when the grade has a sky to
// pull: by day, and in node, every picture reads NO_MATTE -- all white, which leaves the sky test as it was before
// there were mattes -- and nothing is built.
export const NO_MATTE = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
NO_MATTE.needsUpdate = true;
let matteMaker = null;
export function makeSkyMattesWith(fn) { matteMaker = fn; }

// The matte for a material's picture as it is now. Kept on the texture, so a picture hung twice (a state variant
// swapped back in) is measured once; asked again next frame while the picture is still loading.
export function skyMatteOf(material) {
  const map = material.map, from = material.userData.skyFrom;
  if (!matteMaker || !map || !from || !gradeUniforms.pfGradeOn.value || !(gradeUniforms.pfSky.value > 0)) return NO_MATTE;
  const cache = (map.userData.pfSkyMatte ??= {});
  if (!cache[from]) {
    try { cache[from] = matteMaker(map, { from }) ?? undefined; }
    catch (e) { cache[from] = NO_MATTE; console.warn('no sky matte for', map.name || map.uuid, e); }
  }
  return cache[from] ?? NO_MATTE;
}

const HEAD = `
uniform float pfGradeOn; uniform float pfExposure; uniform vec3 pfTint; uniform float pfSaturation; uniform vec3 pfLift;
uniform float pfSky; uniform vec3 pfZenith; uniform vec3 pfHorizon; uniform vec3 pfDayZenith; uniform vec3 pfDayHorizon;
varying vec3 pfWorld;
#ifdef PF_GRADE_SKY
uniform sampler2D pfSkyMatte;
#endif
`;
// In linear light, which is what diffuseColor holds once three has decoded the sRGB texture. Saturation first, then the
// light's level and colour, so a desaturated night still takes the moon's blue rather than going grey.
//
// The sky: the paintings' sky is overcast daylight cloud, and no multiplier turns that into a dusk -- the dusk sky is
// dark blue above and orange at the horizon, a gradient, where the painting has cloud. So where the painting is sky it
// is pulled toward the look's own zenith and horizon for that height, keeping the cloud: its brightness against what
// the daylight look says the sky is there. Where it is sky is the picture's sky matte (scene/skymatte.js): smooth,
// bright and joined to the top of the frame. It used to be read off brightness alone, above the horizon and bright,
// and on the Crag that took in the wet top of the boulder and the spray on the cliff, which went the sky's own salmon
// at dusk as if the sky showed through holes in the rock. The horizon and the brightness still count: the first keeps
// the sea out, the second decides how much of the sky's colour the edge of a cloud takes. Only plates and panoramas
// carry a sky (PF_GRADE_SKY); a figure standing in the room does not.
const BODY = `
if ( pfGradeOn > 0.5 ) {
  vec3 pfC = diffuseColor.rgb;
  float pfY = dot( pfC, vec3( 0.2126, 0.7152, 0.0722 ) );
  pfC = mix( vec3( pfY ), pfC, pfSaturation ) * ( pfExposure * pfTint );
  #ifdef PF_GRADE_SKY
  if ( pfSky > 0.0 ) {
    vec3 pfDir = normalize( pfWorld - cameraPosition );
    float pfUp = smoothstep( 0.0, 0.7, max( pfDir.y, 0.0 ) );
    vec3 pfSkyNow = mix( pfHorizon, pfZenith, pfUp );
    float pfSkyDay = max( dot( mix( pfDayHorizon, pfDayZenith, pfUp ), vec3( 0.2126, 0.7152, 0.0722 ) ), 1e-3 );
    float pfIsSky = smoothstep( 0.0, 0.035, pfDir.y ) * smoothstep( 0.1, 0.3, pfY );
    #ifdef USE_MAP
    pfIsSky *= texture2D( pfSkyMatte, vMapUv ).r;
    #endif
    pfC = mix( pfC, pfSkyNow * ( pfY / pfSkyDay ), pfSky * pfIsSky );
  }
  #endif
  diffuseColor.rgb = pfLift + pfC * ( 1.0 - pfLift );
}
`;

function patch(shader) {
  Object.assign(shader.uniforms, gradeUniforms);
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 pfWorld;')
    .replace('#include <project_vertex>', '#include <project_vertex>\npfWorld = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;');
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', '#include <common>\n' + HEAD)
    .replace('#include <color_fragment>', '#include <color_fragment>\n' + BODY);
}

// Make an unlit material take the grade. `sky` for a picture that shows the sky (a plate, a panorama); `skyFrom` is
// the edge its sky comes in from, for the matte: 'top' for a level view, 'edges' for one looking up, null for one with
// no sky in it at all (looking down), which keeps the old brightness test and builds no matte. Returns the material.
export function graded(material, { sky = false, skyFrom = 'top' } = {}) {
  // The matte is the material's own uniform, where everything else is shared: each picture has its own sky. A getter,
  // so it is looked up on the frame it is drawn -- whatever picture the material holds by then, loaded or not.
  const matte = { get value() { return skyMatteOf(material); } };
  material.onBeforeCompile = shader => { patch(shader); if (sky) shader.uniforms.pfSkyMatte = matte; };
  material.userData.skyFrom = sky ? skyFrom : null;
  if (sky) material.defines = { ...(material.defines ?? {}), PF_GRADE_SKY: '' };
  // Named, so the two variants never share a compiled program: three keys programs on onBeforeCompile's source by
  // default, and that is the same function for both.
  material.customProgramCacheKey = () => (sky ? 'pf-grade-sky' : 'pf-grade');
  material.userData.graded = sky ? 'sky' : 'picture';
  return material;
}
