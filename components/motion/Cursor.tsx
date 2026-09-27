"use client";

import { useEffect, useRef } from "react";

/** Kleiner Punkt mit transparentem Kreis. Nur Maus, nicht bei reduzierter Bewegung oder schwachen Geräten. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches &&
      !document.documentElement.classList.contains("lite");
    if (!ok) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, shown = false;
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        d.style.opacity = r.style.opacity = "1";
      }
      const t = e.target as Element | null;
      const hot = !!t?.closest("a, button, [role='button'], label, summary");
      const text = !!t?.closest("input, textarea, select");
      r.dataset.state = text ? "text" : hot ? "hot" : "";
      d.dataset.state = r.dataset.state;
    };
    const leave = () => {
      shown = false;
      d.style.opacity = r.style.opacity = "0";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className="cursor-ring pointer-events-none fixed left-0 top-0 z-[90] opacity-0">
        <span />
      </div>
      <div ref={dot} aria-hidden className="cursor-dot pointer-events-none fixed left-0 top-0 z-[91] opacity-0">
        <span />
      </div>
    </>
  );
}
