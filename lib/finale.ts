"use client";

import { gsap, type MotionConditions } from "./gsap";

/** Leistungen: vertikaler Scroll bewegt fünf fast bildschirmfüllende Bühnen horizontal. */
export function servicesScene({ motion }: MotionConditions, el: HTMLElement) {
  if (!motion) return;
  const q = gsap.utils.selector(el);
  const track = q("[data-track]")[0] as HTMLElement;
  const distance = () => track.scrollWidth - window.innerWidth;
  const tween = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top top",
      end: () => `+=${distance()}`,
      pin: q("[data-pin]")[0],
      scrub: 0.8,
      invalidateOnRefresh: true,
      onUpdate: (self) => gsap.set(q("[data-pan-bar]"), { scaleX: self.progress }),
    },
  });
  // Jedes Wort fährt leicht gegen die Bewegung (Parallaxe)
  q("[data-svc]").forEach((svc) => {
    const word = svc.querySelector("[data-svc-word]");
    gsap.fromTo(word, { xPercent: 24 }, { xPercent: -6, ease: "none", scrollTrigger: { trigger: svc, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
  });
}
