"use client";

import { useEffect, useRef } from "react";
import { buildTerrain, valleyX } from "@/lib/drone/terrain";
import { TERRAIN_FS, TERRAIN_VS } from "@/lib/drone/look";
import { drone, makeProgram, terrainUniforms, uploadTerrain } from "./DroneScene";

/*
 * Vordergrund-Ebene: rechnet nur das Gelände nahe der Kamera, mit denselben Farben wie die Hauptszene,
 * und liegt ÜBER dem Text. Dort, wo ein naher Grat vor der Schrift steht, verdeckt er sie.
 * Überall sonst ist das Bild deckungsgleich mit dem Hintergrund und damit unsichtbar.
 */
export function DroneFront({ near = 7.5 }: { near?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: true, premultipliedAlpha: true, depth: true });
    if (!gl || !gl.getExtension("OES_element_index_uint") || !gl.getExtension("OES_standard_derivatives")) return;

    // Nur die Umgebung des Querkamms, dafür fein aufgelöst
    const vx = valleyX(-24.5);
    const mesh = buildTerrain({ x0: vx - 9, x1: vx + 9, z0: -17, z1: -31, step: 0.07 });
    const terrain = uploadTerrain(gl, mesh);
    const prog = makeProgram(gl, TERRAIN_VS, TERRAIN_FS);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    const scale = Math.min(window.devicePixelRatio || 1, 1.25);
    const resize = () => {
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    let raf = 0, visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas.parentElement ?? canvas);
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const on = visible && drone.ready && drone.front > 0.02;
      canvas.style.opacity = on ? "1" : "0";
      if (!on) return;
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(prog.p);
      terrainUniforms(gl, prog, near);
      terrain.bind(prog.p);
      terrain.draw(-17, -31);
    };
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      terrain.dispose();
    };
  }, [near]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-20 h-[100lvh] w-full opacity-0" />;
}
