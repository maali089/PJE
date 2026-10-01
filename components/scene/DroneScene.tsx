"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { buildTerrain } from "@/lib/drone/terrain";
import { cameraAt, KEYS, resolveKeys, type Cam, type Vec3 } from "@/lib/drone/path";
import { FULL_VS, HAZE, moodAt, OVERLAY_FS, SEA_FS, SEA_VS, SKY_FS, terrainFS, TERRAIN_VS } from "@/lib/drone/look";

/*
 * Durchgehender Drohnenflug über ein prozedurales Hochgebirge (WebGL).
 * Liegt fest hinter der ganzen Startseite. Der Scroll steuert die Kamera (lib/drone/path.ts),
 * die Kamera folgt gedämpft wie eine schwere Kinodrohne.
 * Die Szene teilt ihren Zustand über `drone`, damit die Vordergrund-Ebene (DroneFront) dasselbe Bild rechnen kann.
 */

export const drone = {
  ready: false,
  vp: new Float32Array(16),
  cam: [0, 0, 0] as Vec3,
  uniforms: null as null | { sun: Vec3; sunCol: Vec3; amb: Vec3; fog: Vec3; den: number; valley: number; haze: number },
  front: 0,
};

// ---------------------------------------------------------------- Matrizen
function perspective(fov: number, asp: number, n: number, f: number) {
  const t = 1 / Math.tan(fov / 2), nf = 1 / (n - f);
  return new Float32Array([t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) * nf, -1, 0, 0, 2 * f * n * nf, 0]);
}
function lookAt(e: Vec3, c: Vec3) {
  let zx = e[0] - c[0], zy = e[1] - c[1], zz = e[2] - c[2];
  let l = Math.hypot(zx, zy, zz);
  zx /= l; zy /= l; zz /= l;
  let xx = zz, xy = 0, xz = -zx;
  l = Math.hypot(xx, xy, xz) || 1;
  xx /= l; xy /= l; xz /= l;
  const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
  return new Float32Array([xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0, -(xx * e[0] + xy * e[1] + xz * e[2]), -(yx * e[0] + yy * e[1] + yz * e[2]), -(zx * e[0] + zy * e[1] + zz * e[2]), 1]);
}
function mul(a: Float32Array, b: Float32Array) {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  return o;
}
function invert(m: Float32Array) {
  const inv = new Float32Array(16);
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = m;
  const b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
  const det = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
  inv[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det; inv[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  inv[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det; inv[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  inv[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det; inv[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  inv[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det; inv[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  inv[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det; inv[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  inv[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det; inv[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  inv[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det; inv[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  inv[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det; inv[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return inv;
}

// ---------------------------------------------------------------- GL-Helfer
export function makeProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
  const sh = (t: number, s: string) => {
    const o = gl.createShader(t)!;
    gl.shaderSource(o, s);
    gl.compileShader(o);
    if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(o));
    return o;
  };
  const p = gl.createProgram()!;
  gl.attachShader(p, sh(gl.VERTEX_SHADER, vs));
  gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  const U = new Map<string, WebGLUniformLocation | null>();
  return { p, u: (n: string) => (U.has(n) ? U.get(n)! : (U.set(n, gl.getUniformLocation(p, n)), U.get(n)!)) };
}

/** Lädt das Gelände in den GPU-Speicher und liefert eine Zeichenfunktion für einen Zeilenbereich. */
export function uploadTerrain(gl: WebGLRenderingContext, mesh: ReturnType<typeof buildTerrain>) {
  const vb = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vb);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.data, gl.STATIC_DRAW);
  const ib = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.index, gl.STATIC_DRAW);
  return {
    bind(prog: WebGLProgram) {
      gl.bindBuffer(gl.ARRAY_BUFFER, vb);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
      const loc = (n: string) => gl.getAttribLocation(prog, n);
      const P = loc("aPos"), N = loc("aNor"), A = loc("aAO");
      gl.enableVertexAttribArray(P);
      gl.vertexAttribPointer(P, 3, gl.FLOAT, false, 28, 0);
      gl.enableVertexAttribArray(N);
      gl.vertexAttribPointer(N, 3, gl.FLOAT, false, 28, 12);
      gl.enableVertexAttribArray(A);
      gl.vertexAttribPointer(A, 1, gl.FLOAT, false, 28, 24);
    },
    /** Zeichnet nur die Zeilen zwischen zNear (vorne) und zFar (hinten). */
    draw(zNear: number, zFar: number) {
      const r0 = Math.floor((mesh.z0 - zNear) / mesh.dz), r1 = Math.ceil((mesh.z0 - zFar) / mesh.dz);
      const s = mesh.rowIndexStart(r0), e = mesh.rowIndexStart(r1);
      if (e > s) gl.drawElements(gl.TRIANGLES, e - s, gl.UNSIGNED_INT, s * 4);
    },
    dispose() {
      gl.deleteBuffer(vb);
      gl.deleteBuffer(ib);
    },
  };
}

/** Setzt alle Gelände-Uniforms aus dem geteilten Zustand. */
export function terrainUniforms(gl: WebGLRenderingContext, prog: ReturnType<typeof makeProgram>, near: number) {
  const u = drone.uniforms!;
  gl.uniformMatrix4fv(prog.u("uVP"), false, drone.vp);
  gl.uniform3fv(prog.u("uCam"), drone.cam);
  gl.uniform3fv(prog.u("uSun"), u.sun);
  gl.uniform3fv(prog.u("uSunCol"), u.sunCol);
  gl.uniform3fv(prog.u("uAmb"), u.amb);
  gl.uniform3fv(prog.u("uFog"), u.fog);
  gl.uniform3fv(prog.u("uHazeCol"), HAZE);
  gl.uniform1f(prog.u("uDen"), u.den);
  gl.uniform1f(prog.u("uValley"), u.valley);
  gl.uniform1f(prog.u("uHaze"), u.haze);
  gl.uniform1f(prog.u("uNear"), near);
}

// ---------------------------------------------------------------- Szene
export function DroneScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    const start = () => (dispose = init());
    const idle = typeof window.requestIdleCallback === "function";
    const id = idle ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 400);
    return () => {
      if (idle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
      dispose?.();
    };
  }, []);

  function init(): (() => void) | undefined {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false, depth: true, powerPreference: "high-performance" });
    if (!gl || !gl.getExtension("OES_element_index_uint") || !gl.getExtension("OES_standard_derivatives")) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;

    const mesh = buildTerrain({ x0: -18, x1: 18, z0: 10, z1: -108, step: mobile ? 0.24 : 0.12, oct: mobile ? 5 : 6 });
    const terrain = uploadTerrain(gl, mesh);
    const pT = makeProgram(gl, TERRAIN_VS, terrainFS(mobile));
    const pSky = makeProgram(gl, FULL_VS, SKY_FS);
    const pSea = makeProgram(gl, SEA_VS, SEA_FS);
    const pOv = makeProgram(gl, FULL_VS, OVERLAY_FS);
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const drawQuad = (prog: WebGLProgram, attr = "aP") => {
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      const l = gl.getAttribLocation(prog, attr);
      gl.enableVertexAttribArray(l);
      gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.disableVertexAttribArray(l);
    };

    const scale = mobile ? 0.75 : Math.min(window.devicePixelRatio || 1, 1.25);
    let w = 0, h = 0, proj = new Float32Array(16);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      proj = perspective(((w < 768 ? 66 : 54) * Math.PI) / 180, w / h, 0.05, 90);
    };
    resize();

    // Keyframes an die Seite koppeln
    const keys = resolveKeys(KEYS);
    let ys: number[] = [];
    const measure = () => {
      const vh = window.innerHeight;
      const raw = keys.map((k) => {
        const el = document.querySelector<HTMLElement>(`[data-drone="${k.a}"]`);
        if (!el || !el.getClientRects().length) return NaN;
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        return top + (k.f ?? 0) * Math.max(0, r.height - vh) + (k.off ?? 0) * vh;
      });
      // fehlende Anker auffüllen und streng aufsteigend machen
      ys = raw.map((y, i) => (Number.isFinite(y) ? y : i ? raw[i - 1] : 0));
      for (let i = 1; i < ys.length; i++) ys[i] = Math.max(ys[i], ys[i - 1] + 1);
    };
    measure();
    ScrollTrigger.addEventListener("refresh", measure);
    window.addEventListener("load", measure);

    const cur: Cam = cameraAt(window.scrollY, ys, keys);
    const lerp3 = (a: Vec3, b: Vec3, k: number) => { a[0] += (b[0] - a[0]) * k; a[1] += (b[1] - a[1]) * k; a[2] += (b[2] - a[2]) * k; };

    gl.enable(gl.DEPTH_TEST);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    let raf = 0, running = true, last = 0, lastY = -1;
    const t0 = performance.now();
    const frame = (now: number) => {
      if (running) raf = requestAnimationFrame(frame);
      const y = window.scrollY;
      // Solange das gemalte Gewitterbild den Bildschirm verdeckt, nichts rechnen
      if (ys.length && y < ys[1] && drone.ready) return;
      const moving = Math.abs(y - lastY) > 0.5;
      if (!moving && now - last < (reduce ? 1000 : 33)) return;
      last = now;
      lastY = y;

      const tgt = cameraAt(y, ys, keys);
      const k = reduce ? 1 : 0.075;
      lerp3(cur.pos, tgt.pos, k);
      lerp3(cur.tgt, tgt.tgt, k);
      cur.mood += (tgt.mood - cur.mood) * k;
      cur.cloud += (tgt.cloud - cur.cloud) * k * 1.4;
      cur.haze += (tgt.haze - cur.haze) * k;
      cur.sea += (tgt.sea - cur.sea) * k;
      cur.seaA += (tgt.seaA - cur.seaA) * k;
      cur.front += (tgt.front - cur.front) * 0.2;
      const t = reduce ? 40 : (now - t0) / 1000;

      // ruhiges Schweben der Drohne
      const eye: Vec3 = [cur.pos[0] + Math.sin(t * 0.21) * 0.035, cur.pos[1] + Math.sin(t * 0.33) * 0.025, cur.pos[2]];
      const view = lookAt(eye, cur.tgt);
      const vp = mul(proj, view);
      const m = moodAt(cur.mood);
      drone.vp = vp;
      drone.cam = eye;
      drone.uniforms = { sun: m.sun, sunCol: m.sunCol, amb: m.amb, fog: m.fog, den: m.den, valley: m.valley, haze: cur.haze };
      drone.front = cur.front;
      drone.ready = true;

      // Himmel
      gl.disable(gl.DEPTH_TEST);
      gl.depthMask(false);
      gl.useProgram(pSky.p);
      gl.uniformMatrix4fv(pSky.u("uInvVP"), false, invert(vp));
      gl.uniform3fv(pSky.u("uCam"), eye);
      gl.uniform3fv(pSky.u("uZen"), m.zen);
      gl.uniform3fv(pSky.u("uHor"), m.hor);
      gl.uniform3fv(pSky.u("uSun"), m.sun);
      gl.uniform3fv(pSky.u("uSunCol"), m.sunCol);
      gl.uniform3fv(pSky.u("uCloudCol"), m.cloud);
      gl.uniform3fv(pSky.u("uHazeCol"), HAZE);
      gl.uniform1f(pSky.u("uHaze"), cur.haze);
      gl.uniform1f(pSky.u("uTime"), t);
      drawQuad(pSky.p);

      // Gelände (nur der sichtbare Streckenabschnitt)
      gl.enable(gl.DEPTH_TEST);
      gl.depthMask(true);
      gl.clear(gl.DEPTH_BUFFER_BIT);
      gl.useProgram(pT.p);
      terrainUniforms(gl, pT, 0);
      terrain.bind(pT.p);
      terrain.draw(eye[2] + 6, eye[2] - 62);

      // Wolkenmeer
      gl.enable(gl.BLEND);
      gl.depthMask(false);
      gl.useProgram(pSea.p);
      gl.uniformMatrix4fv(pSea.u("uVP"), false, vp);
      gl.uniform3fv(pSea.u("uCam"), eye);
      gl.uniform1f(pSea.u("uSea"), cur.sea);
      gl.uniform3fv(pSea.u("uSun"), m.sun);
      gl.uniform3fv(pSea.u("uSunCol"), m.sunCol);
      gl.uniform3fv(pSea.u("uCloudCol"), m.cloud);
      gl.uniform3fv(pSea.u("uFog"), m.fog);
      gl.uniform3fv(pSea.u("uHazeCol"), HAZE);
      gl.uniform1f(pSea.u("uDen"), m.den);
      gl.uniform1f(pSea.u("uHaze"), cur.haze);
      gl.uniform1f(pSea.u("uSeaA"), cur.seaA);
      gl.uniform1f(pSea.u("uTime"), t);
      drawQuad(pSea.p);

      // Flug durch Wolken
      if (cur.cloud > 0.01) {
        gl.disable(gl.DEPTH_TEST);
        gl.useProgram(pOv.p);
        gl.uniform1f(pOv.u("uCloud"), cur.cloud);
        gl.uniform1f(pOv.u("uTime"), t);
        gl.uniform1f(pOv.u("uAsp"), w / h);
        gl.uniform3fv(pOv.u("uCloudCol"), m.cloud);
        drawQuad(pOv.p);
      }
      gl.disable(gl.BLEND);
      if (!canvas.classList.contains("is-on")) canvas.classList.add("is-on");
    };
    raf = requestAnimationFrame(frame);

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
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", measure);
      ScrollTrigger.removeEventListener("refresh", measure);
      terrain.dispose();
      drone.ready = false;
    };
  }

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-[100lvh] w-full bg-[#dfe3ea] opacity-0 transition-opacity duration-700 [&.is-on]:opacity-100" />;
}
