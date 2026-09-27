"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis: weiches, träges Scrollen (wie bei der Referenz), synchron mit GSAP ScrollTrigger. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true, anchors: { offset: -80 } });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}

/** Scrollt (weich, falls Lenis aktiv) an eine Position. */
export function scrollToY(y: number) {
  if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.6 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}
