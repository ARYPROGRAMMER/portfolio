"use client";

import { useEffect, useRef } from "react";
// Named imports, not `import * as THREE`: the namespace form defeats
// tree-shaking and drags the whole library in.
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  MathUtils,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

import { gsap } from "@/lib/gsap";

/* Ashima 2D simplex noise — compact, no dependency, good enough for a field. */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865,0.366025403,-0.577350269,0.024390243);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}
`;

const VERT = /* glsl */ `
uniform float uTime;
uniform vec2  uPointer;
uniform float uPointerStrength;
uniform float uSize;
uniform float uAspect;

varying float vGlow;
varying float vDepth;

${NOISE}

void main() {
  vec3 pos = position;

  // Slow, layered swell across the plane.
  float n = snoise(pos.xy * 0.28 + vec2(uTime * 0.07, uTime * 0.045));
  n += 0.5 * snoise(pos.xy * 0.62 - vec2(uTime * 0.05, 0.0));
  pos.z += n * 0.55;

  // Push points away from the cursor, falling off smoothly.
  vec2 toPointer = pos.xy - uPointer;
  float dist = length(toPointer * vec2(uAspect, 1.0));
  float influence = smoothstep(2.6, 0.0, dist) * uPointerStrength;
  pos.xy += normalize(toPointer + 1e-5) * influence * 0.7;
  pos.z  += influence * 1.4;

  vGlow = clamp(influence * 1.25 + max(n, 0.0) * 0.22, 0.0, 1.0);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vDepth = clamp((pos.z + 1.2) / 2.6, 0.0, 1.0);

  // Perspective-correct point size, nudged up where the field is excited.
  gl_PointSize = uSize * (1.0 + vGlow * 2.2) * (10.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = /* glsl */ `
uniform vec3  uInk;
uniform vec3  uAccent;
uniform float uOpacity;

varying float vGlow;
varying float vDepth;

void main() {
  // Round the square point sprite into a soft dot.
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float alpha = smoothstep(0.5, 0.18, d);
  if (alpha < 0.01) discard;

  vec3 color = mix(uInk, uAccent, vGlow);
  float fade = mix(0.35, 1.0, vDepth);

  gl_FragColor = vec4(color, alpha * uOpacity * fade);
}
`;

const COLUMNS = 84;
const ROWS = 48;
const GRID_W = 14;
const GRID_H = 8;
const CAMERA_Z = 9;
const FOV = 42;

/** Reads a CSS custom property off the document root. */
function cssVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

/**
 * Cursor-reactive particle field behind the hero.
 *
 * Plain three.js on a bare canvas — no react-three-fiber. The scene is a single
 * draw call, so the reconciler bought nothing and cost a large dependency (plus
 * the THREE.Clock deprecation warning, which came from inside it).
 *
 * Rendering is driven by `gsap.ticker`, the same loop that already drives Lenis
 * and ScrollTrigger, so the whole page runs on one rAF.
 */
export function HeroField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      // No WebGL context available — the hero is complete without this.
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new Scene();
    const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
    camera.position.z = CAMERA_Z;

    // Centered grid of points on the XY plane.
    const positions = new Float32Array(COLUMNS * ROWS * 3);
    let p = 0;
    for (let yi = 0; yi < ROWS; yi++) {
      for (let xi = 0; xi < COLUMNS; xi++) {
        positions[p++] = (xi / (COLUMNS - 1) - 0.5) * GRID_W;
        positions[p++] = (yi / (ROWS - 1) - 0.5) * GRID_H;
        positions[p++] = 0;
      }
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new Vector2(0, 0) },
      uPointerStrength: { value: 0 },
      uSize: { value: 2.4 },
      uAspect: { value: 1 },
      uInk: { value: new Color(cssVar("--c-ink", "#f4f4f0")) },
      uAccent: { value: new Color(cssVar("--c-accent", "#c8ff3d")) },
      uOpacity: { value: 0.85 },
    };

    const material = new ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: NormalBlending,
    });

    const points = new Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    /* ---------------- sizing ---------------- */

    let width = 1;
    let height = 1;
    // Half-extents of the visible plane at z = 0, used to map the pointer into
    // world space.
    let halfVisibleH = 1;
    let halfVisibleW = 1;

    const resize = () => {
      width = parent.clientWidth || 1;
      height = parent.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      halfVisibleH = Math.tan((FOV / 2) * (Math.PI / 180)) * CAMERA_Z;
      halfVisibleW = halfVisibleH * camera.aspect;
      uniforms.uAspect.value = camera.aspect;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    /* ---------------- pointer ---------------- */

    const targetPointer = new Vector2(0, 0);
    let targetStrength = 0;
    // Normalised device coords, kept for the parallax tilt.
    const ndc = new Vector2(0, 0);

    const onPointerMove = (e: PointerEvent) => {
      ndc.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
      targetPointer.set(ndc.x * halfVisibleW, ndc.y * halfVisibleH);
      targetStrength = 1;
    };

    const onPointerLeave = () => {
      targetStrength = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    /* ---------------- theme ---------------- */

    // The palette flips via a class on <html>, so watch that rather than polling.
    const applyColors = () => {
      uniforms.uInk.value.set(cssVar("--c-ink", "#f4f4f0"));
      uniforms.uAccent.value.set(cssVar("--c-accent", "#c8ff3d"));
    };
    const themeObserver = new MutationObserver(applyColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    /* ---------------- render loop ---------------- */

    let visible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(parent);

    const tick = (_time: number, deltaMs: number) => {
      if (!visible || document.hidden) return;

      const dt = Math.min(deltaMs / 1000, 1 / 30);
      uniforms.uTime.value += dt;

      uniforms.uPointer.value.lerp(targetPointer, Math.min(dt * 5, 1));
      uniforms.uPointerStrength.value = MathUtils.lerp(
        uniforms.uPointerStrength.value,
        targetStrength,
        Math.min(dt * 3, 1),
      );

      points.rotation.x = MathUtils.lerp(
        points.rotation.x,
        -ndc.y * 0.14,
        Math.min(dt * 2, 1),
      );
      points.rotation.y = MathUtils.lerp(
        points.rotation.y,
        ndc.x * 0.18,
        Math.min(dt * 2, 1),
      );

      renderer.render(scene, camera);
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}

export default HeroField;
