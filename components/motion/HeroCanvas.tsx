"use client";

import { useEffect, useRef } from "react";

/**
 * Feines Punkt-Raster mit einzelnen „Nodes“, die sich langsam bewegen und
 * verbinden. Punkte in Cursornähe weichen minimal aus und färben sich blau.
 * Läuft nur, solange der Hero sichtbar ist.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let gap = 28;
    let dots: { x: number; y: number }[] = [];
    const grid = document.createElement("canvas");
    const gctx = grid.getContext("2d")!;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: 0, target: 0 };
    let raf = 0;
    let running = false;
    let t0 = performance.now();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = w < 640 ? 24 : 28;
      dots = [];
      const ox = (w % gap) / 2;
      const oy = (h % gap) / 2;
      for (let y = oy; y < h; y += gap) for (let x = ox; x < w; x += gap) dots.push({ x, y });
      // statisches Raster einmal vorrendern, pro Frame nur noch kopieren
      grid.width = canvas.width;
      grid.height = canvas.height;
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gctx.fillStyle = "rgba(11,12,14,0.16)";
      for (const d of dots) gctx.fillRect(d.x - 0.7, d.y - 0.7, 1.4, 1.4);
      const count = w < 640 ? 9 : 16;
      // deterministischer Zufall (Seed), damit jeder Seitenaufruf gleich ruhig beginnt
      let seed = 1337;
      const rnd = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };
      nodes = Array.from({ length: count }, (_, i) => {
        const a = rnd() * Math.PI * 2;
        return {
          x: w * (w < 640 ? 0.1 + rnd() * 0.85 : 0.42 + rnd() * 0.55),
          y: h * (0.1 + rnd() * 0.8),
          vx: Math.cos(a) * 0.14,
          vy: Math.sin(a) * 0.14,
          r: i % 5 === 0 ? 2.6 : 1.8,
        };
      });
    };

    const draw = (time: number) => {
      if (!w || !h || !grid.width || !grid.height) return;
      const dt = Math.min(48, time - t0);
      t0 = time;
      ctx.clearRect(0, 0, w, h);

      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      pointer.active += (pointer.target - pointer.active) * 0.06;

      const R = 170;
      const R2 = R * R;

      // Raster (gecacht) + Hervorhebung in Cursornähe
      ctx.drawImage(grid, 0, 0, w, h);
      if (pointer.active > 0.01) {
        const x0 = pointer.x - R, x1 = pointer.x + R, y0 = pointer.y - R, y1 = pointer.y + R;
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          if (d.x < x0 || d.x > x1 || d.y < y0 || d.y > y1) continue;
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 >= R2) continue;
          const f = (1 - Math.sqrt(dist2) / R) * pointer.active;
          const s = 1.6 + f * 1.8;
          ctx.fillStyle = `rgba(38,81,240,${Math.min(0.85, 0.12 + f * 0.6)})`;
          ctx.fillRect(d.x - s / 2, d.y - s / 2, s, s);
        }
      }

      // Nodes + Verbindungen
      const step = reduce ? 0 : dt / 16.67;
      for (const n of nodes) {
        n.x += n.vx * step;
        n.y += n.vy * step;
        if (n.x < w * 0.1 || n.x > w * 0.98) n.vx *= -1;
        if (n.y < h * 0.06 || n.y > h * 0.96) n.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const max = Math.min(260, w * 0.28);
          if (d < max) {
            const o = (1 - d / max) * 0.22;
            ctx.strokeStyle = `rgba(38,81,240,${o})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(38,81,240,0.75)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      t0 = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();
    draw(performance.now());

    const ro = new ResizeObserver(() => {
      build();
      if (!running) draw(performance.now());
    });
    ro.observe(canvas);

    let visible = false;
    let ready = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && ready) start();
      else stop();
    });
    io.observe(canvas);
    // Animation erst starten, wenn die Seite interaktiv ist (schont LCP/TBT)
    const hasIdle = typeof window.requestIdleCallback === "function";
    const kick = () => {
      ready = true;
      if (visible) start();
    };
    const idleId = hasIdle ? window.requestIdleCallback(kick, { timeout: 2500 }) : window.setTimeout(kick, 1200);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      if (pointer.x < -1000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.target = 1;
    };
    const onLeave = () => (pointer.target = 0);
    const host = canvas.parentElement;
    if (fine && host) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }

    const onVis = () => (document.hidden || !ready || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      if (hasIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (host) {
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="anim-fade pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_75%_70%_at_70%_45%,black_30%,transparent_80%)]"
      style={{ ["--d" as string]: 300 }}
    />
  );
}
