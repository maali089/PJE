"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

// Nach verzögert aufgebauten Szenen einmal gesammelt neu berechnen (Reihenfolge der Pins nach DOM-Position)
let refreshTimer = 0;
function scheduleRefresh() {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }, 120);
}

export type MotionConditions = { motion: boolean; reduce: boolean; desktop: boolean; mobile: boolean };

/**
 * Führt GSAP-Setup in einem Scope aus. `gsap.matchMedia` sorgt dafür, dass alles
 * bei Wechsel von Viewport/Reduced-Motion sauber zurückgesetzt und neu aufgebaut wird.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (c: MotionConditions, el: HTMLElement) => void | (() => void),
  deps: unknown[] = [],
) {
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    const init = () => {
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023.98px)",
        },
        (ctx) => {
          // Ausgeblendete Varianten (display: none) nicht animieren
          if (!el.getClientRects().length) return;
          return setup(ctx.conditions as MotionConditions, el);
        },
      );
      scheduleRefresh();
    };
    // Szenen unterhalb des Viewports erst im Leerlauf aufbauen (entlastet Hydration/TBT)
    const below = el.getBoundingClientRect().top > window.innerHeight;
    const hasIdle = typeof window.requestIdleCallback === "function";
    let id = 0;
    if (!below) init();
    else id = hasIdle ? window.requestIdleCallback(init, { timeout: 1200 }) : window.setTimeout(init, 300);
    return () => {
      if (below) (hasIdle ? window.cancelIdleCallback(id) : window.clearTimeout(id));
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
