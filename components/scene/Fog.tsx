"use client";

import { useEffect, useRef } from "react";

/*
 * Nebelschicht als eigener WebGL-Canvas in niedriger Auflösung (Nebel hat keine harten Kanten).
 * `shared.prog` bewegt den Nebel mit der Kamera, `shared.wall` füllt das Bild bis zur Nebelwand.
 */

const FOG_VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FOG_FRAG = (oct: number) => `
precision mediump float;
uniform vec2 uRes; uniform float uTime; uniform float uProg; uniform float uWall; uniform float uSeed;
uniform vec3 uColor; uniform float uAlpha; uniform float uLow;
float h(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<${oct};i++){v+=a*n(p);p=mat2(.8,.6,-.6,.8)*p*2.02+11.;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  vec2 p=(uv-.5)*vec2(uRes.x/uRes.y,1.);
  float t=uTime;
  // Kamera fährt vorwärts: Nebel wächst und zieht nach unten weg
  p/=1.+uProg*.9;
  p+=vec2(t*.018+uSeed,-uProg*.5+uSeed*.3);
  vec2 w=vec2(fbm(p*1.2+t*.02),fbm(p*1.2+vec2(5.2,1.3)-t*.015));
  float d=fbm(p*1.6+w*1.8+vec2(t*.03,0.));
  float ground=mix(1.,smoothstep(1.05,.15,uv.y),uLow);
  float a=smoothstep(.38,.9,d)*uAlpha*ground;
  a=a+uWall*(.75+.25*d);
  a=clamp(a,0.,1.);
  gl_FragColor=vec4(uColor*a,a);
}`;

export type FogState = { prog: number; wall: number; reduce: boolean };

export function FogCanvas({ shared, color, alpha, low, seed, className = "" }: { shared: React.RefObject<FogState>; color: [number, number, number]; alpha: number; low: number; seed: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const gl = c.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false, depth: false, powerPreference: "low-power" });
    if (!gl) return;
    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const sh = (t: number, s: string) => {
      const o = gl.createShader(t)!;
      gl.shaderSource(o, s);
      gl.compileShader(o);
      return o;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, FOG_VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FOG_FRAG(mobile ? 3 : 4)));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const U = (k: string) => gl.getUniformLocation(prog, k);
    const uRes = U("uRes"), uTime = U("uTime"), uProg = U("uProg"), uWall = U("uWall");
    gl.uniform3f(U("uColor"), ...color);
    gl.uniform1f(U("uAlpha"), alpha);
    gl.uniform1f(U("uLow"), low);
    gl.uniform1f(U("uSeed"), seed);
    const scale = mobile ? 0.2 : 0.3;
    const resize = () => {
      c.width = Math.max(1, Math.round(c.clientWidth * scale));
      c.height = Math.max(1, Math.round(c.clientHeight * scale));
      gl.viewport(0, 0, c.width, c.height);
      gl.uniform2f(uRes, c.width, c.height);
    };
    resize();
    let raf = 0, visible = true, last = 0;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden || shared.current.prog > 0.985 || now - last < 30) return;
      last = now;
      const s = shared.current;
      gl.uniform1f(uTime, s.reduce ? 20 : 20 + (now - t0) / 1000);
      gl.uniform1f(uProg, s.prog);
      gl.uniform1f(uWall, s.wall);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
    };
  }, [shared, color, alpha, low, seed]);
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

