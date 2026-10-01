"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { measureDomAnchors, stageAt } from "@/lib/sceneStage";

/*
 * Atmosphärischer Hintergrund: sehr zarter, entsättigter Blau-Nebel über hellem Grau.
 * Ein einziger Fullscreen-Shader (domain-warped fbm), in reduzierter Auflösung gerendert
 * und per CSS hochskaliert – Nebel hat keine harten Kanten, dadurch kostet er kaum GPU-Zeit.
 * Drei Ebenen mit eigener Parallaxe; Position, Verteilung und Dichte hängen an der Scrollposition
 * (läuft rückwärts exakt zurück), die Eigenbewegung ist nicht periodisch.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = (mobile: boolean) => `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
#define OCT ${mobile ? 3 : 5}
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform float uStage;
uniform vec2 uMouse;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
const mat2 ROT = mat2(0.8, 0.6, -0.6, 0.8);
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < OCT; i++) {
    v += a * noise(p);
    p = ROT * p * 2.03 + 17.1;
    a *= 0.5;
  }
  return v;
}
// Domain Warping: Nebel faltet sich in sich selbst, keine erkennbare Grundform
float mist(vec2 p, float t, float warp) {
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.6)), fbm(p + vec2(5.2, 1.3) - t * 0.4));
  vec2 r = vec2(fbm(p + warp * q + vec2(1.7, 9.2) + t * 0.3), fbm(p + warp * q + vec2(8.3, 2.8) - t * 0.25));
  return fbm(p + warp * r);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = (uv - 0.5) * vec2(asp, 1.0);
  float t = uTime;
  float s = uScroll;
  float hero = 1.0 - smoothstep(0.0, 1.4, s);

  // Beim Scrollen: Nebel zieht sich auseinander und verschiebt sich je Kapitel
  float warp = 2.4 + (1.0 - hero) * 1.1 + sin(t * 0.031) * 0.25;
  vec2 drift = vec2(t * 0.011 + uStage * 0.21, t * 0.017 + uStage * 0.08);
  float breathe = 1.0 + sin(t * 0.043 + 1.3) * 0.04 + sin(t * 0.017) * 0.03 + s * 0.012;

  // Ebene 1: sehr groß, kaum sichtbar, bewegt sich am langsamsten
  vec2 p1 = p * 0.85 / breathe - vec2(0.0, s * 0.10) + drift * 0.6 + uMouse * 0.012;
  float d1 = smoothstep(0.28, 0.8, mist(p1, t * 0.018, warp));

  // Ebene 2: kleinere diffuse Wolken, mittlere Parallaxe
  vec2 p2 = p * 1.55 / breathe - vec2(0.0, s * 0.26) + drift + vec2(3.1, 7.4) + uMouse * 0.028;
  float d2 = smoothstep(0.36, 0.85, mist(p2, t * 0.026 + 11.0, warp * 0.9));

  // Großräumige Maske: Bereiche lösen sich auf und entstehen an anderer Stelle neu
  float m = smoothstep(0.3, 0.72, fbm(p * 0.55 + vec2(uStage * 0.37 + t * 0.006, -s * 0.05 - t * 0.004) + 21.0));

  // Hero: große Struktur rechts hinter der Bühne, links bleibt der Text frei
  vec2 hc = p - vec2(asp * 0.2, 0.06);
  float heroField = exp(-dot(hc * vec2(0.8, 1.15), hc * vec2(0.8, 1.15)) * 2.2);
  float field = mix(0.6 + 0.8 * m, 0.35 + 1.0 * heroField, hero * 0.75);

  // Lesbarkeit: linke Textspalte leicht entlasten
  field *= 1.0 - 0.35 * smoothstep(0.35, 0.0, uv.x) * (0.4 + 0.6 * hero);

  float a = (d1 * 0.155 + d2 * 0.13) * field;

${
  mobile
    ? ""
    : `  // Ebene 3: wenige, fast unsichtbare Schleier im Vordergrund
  vec2 p3 = p * vec2(1.3, 3.2) - vec2(0.0, s * 0.5) + vec2(t * 0.02, t * 0.012) + drift * 1.4 + vec2(9.0, 2.0) + uMouse * 0.05;
  float veil = fbm(p3 + fbm(p3 * 0.7 + t * 0.01) * 1.6);
  float d3 = smoothstep(0.58, 0.8, veil) * smoothstep(0.95, 0.72, veil);
  a += d3 * 0.05 * m;`
}

  // Farbe: entsättigtes Blau, im Kern minimal tiefer
  vec3 haze = vec3(0.42, 0.5, 0.72);
  vec3 core = vec3(0.2, 0.28, 0.56);
  vec3 blue = mix(haze, core, smoothstep(0.1, 0.24, a));

  // Grundfläche: warmes Off-White-Licht auf hellem Grau, minimale Helligkeitsunterschiede
  float light = fbm(p * 0.45 + vec2(t * 0.003, -s * 0.03) + 40.0);
  float aW = smoothstep(0.35, 0.75, light) * 0.2 * (0.55 + 0.45 * hero);
  vec3 warm = vec3(0.992, 0.988, 0.978);

  float aB = clamp(a, 0.0, 0.28);
  // vormultipliziertes Alpha, feines Dithering gegen Banding
  vec3 col = warm * aW * (1.0 - aB) + blue * aB;
  float alpha = aB + aW * (1.0 - aB);
  float dn = (hash(gl_FragCoord.xy + fract(t) * 91.0) - 0.5) / 255.0;
  gl_FragColor = vec4(col + dn, alpha);
}`;

export function MistScene() {
  const ref = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  pathRef.current = pathname;
  // Auf der Startseite fliegt stattdessen die Drohne (DroneScene)
  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome) return;
    // erst im Leerlauf starten: entlastet Laden und Hydration
    let dispose: (() => void) | undefined;
    const start = () => (dispose = init());
    const idle = typeof window.requestIdleCallback === "function";
    const id = idle ? window.requestIdleCallback(start, { timeout: 2000 }) : window.setTimeout(start, 500);
    return () => {
      if (idle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
      dispose?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);

  // Anker der Szene nach Seitenwechsel neu messen
  useEffect(() => {
    measureDomAnchors();
  }, [pathname]);

  function init(): (() => void) | undefined {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true, depth: false, stencil: false, powerPreference: "low-power" });
    if (!gl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    // Nebel ist weich: ein Bruchteil der Auflösung genügt, CSS skaliert bilinear hoch
    const scale = mobile ? 0.22 : 0.34;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    const vs = sh(gl.VERTEX_SHADER, VERT);
    const fs = sh(gl.FRAGMENT_SHADER, FRAG(mobile));
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U("uRes"), uTime = U("uTime"), uScroll = U("uScroll"), uStage = U("uStage"), uMouse = U("uMouse");

    let w = 0, h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / w - 0.5) * 2;
      mouse.ty = (0.5 - e.clientY / h) * 2;
    };
    if (!mobile && !reduce) window.addEventListener("pointermove", onMove, { passive: true });

    const onRefresh = () => measureDomAnchors();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    measureDomAnchors();

    const home = () => pathRef.current === "/";
    let scroll = window.scrollY / h;
    let stage = home() ? stageAt(window.scrollY) : 0;
    let raf = 0;
    let running = true;
    let last = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      if (running) raf = requestAnimationFrame(frame);
      const targetScroll = window.scrollY / h;
      const targetStage = home() ? stageAt(window.scrollY) : targetScroll * 0.35;
      const k = reduce ? 1 : mobile ? 0.12 : 0.07;
      const ds = targetScroll - scroll;
      scroll += ds * k;
      stage += (targetStage - stage) * k;
      mouse.x += (mouse.tx - mouse.x) * 0.03;
      mouse.y += (mouse.ty - mouse.y) * 0.03;
      // Ohne Scroll ist die Eigenbewegung so langsam, dass 30 fps genügen (spart Akku)
      const settled = Math.abs(ds) < 0.0004;
      if (settled && now - last < (reduce ? 1000 : 32)) return;
      if (reduce && settled && last) return;
      last = now;
      gl.uniform1f(uTime, reduce ? 40 : 40 + (now - t0) / 1000);
      gl.uniform1f(uScroll, scroll);
      gl.uniform1f(uStage, stage);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);
    canvas.classList.add("is-on");

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }

  if (isHome) return null;
  return (
    <canvas
      ref={ref}
      aria-hidden
      className="mist-canvas pointer-events-none fixed inset-0 -z-10 h-[100lvh] w-full opacity-0 transition-opacity duration-[2.4s] [&.is-on]:opacity-100"
    />
  );
}
