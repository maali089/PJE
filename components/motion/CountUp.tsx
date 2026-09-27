"use client";

import { useEffect, useRef } from "react";

/** Zählt beim ersten Sichtbarwerden auf den Zielwert hoch. Ohne JS steht der Endwert im HTML. */
const format = (n: number) => n.toLocaleString("de-DE");

export function CountUp({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = format(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = format(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return <span ref={ref} className="t-num">{format(to)}</span>;
}
