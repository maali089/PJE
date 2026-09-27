"use client";

import { gsap, type MotionConditions } from "./gsap";

/**
 * DIGITAL: Das Wort ist eine Maske, durch die ein Foto sichtbar ist.
 * Beim Scrollen fliegt die Kamera in den Stamm des „I“, bis das Foto den ganzen Bildschirm füllt.
 * Die Maske ist ein SVG-clipPath: skaliert wird nur die Schrift, das Foto bleibt scharf.
 */
export function digitalScene({ motion, desktop }: MotionConditions, el: HTMLElement) {
  const q = gsap.utils.selector(el);
  const stage = q("[data-digital-stage]")[0] as HTMLElement;
  const g = el.querySelector<SVGGElement>("[data-clip-g]");
  const text = el.querySelector<SVGTextElement>("[data-clip-text]");
  if (!stage || !g || !text) return;

  // Schrift an die Bühne anpassen; Ursprung = Mitte des ersten „I“
  let origin = "0 0";
  const layout = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    const size = Math.min(w * (desktop ? 0.25 : 0.27), h * 0.5);
    text.setAttribute("x", String(w / 2));
    text.setAttribute("y", String(h / 2 + size * 0.36));
    text.setAttribute("font-size", String(size));
    try {
      const r = text.getExtentOfChar(1);
      origin = `${r.x + r.width / 2} ${h / 2}`;
    } catch {
      origin = `${w / 2 - size * 0.9} ${h / 2}`;
    }
  };
  layout();
  if (!motion) return;

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      invalidateOnRefresh: true,
      onRefresh: () => {
        layout();
        gsap.set(g, { svgOrigin: origin });
      },
    },
  });
  gsap.set(g, { svgOrigin: origin, scale: 1 });
  tl.fromTo(g, { scale: 0.86 }, { scale: 1, duration: 0.25, ease: "power1.out" }, 0)
    .to(q("[data-digital-cap], [data-digital-hint]"), { autoAlpha: 0, y: -10, duration: 0.15 }, 0.2)
    .to(g, { scale: 70, duration: 0.65, ease: "power3.in" }, 0.25)
    .fromTo(q("[data-digital-photo]"), { scale: 1.25 }, { scale: 1, duration: 0.9 }, 0.1)
    .to({}, { duration: 0.1 });
}

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
  // Jede Bühne: Bild öffnet sich per Clip, Wort fährt gegen die Bewegung (Parallaxe)
  q("[data-svc]").forEach((svc) => {
    const media = svc.querySelector("[data-svc-media]");
    const img = svc.querySelector("[data-svc-img]");
    const word = svc.querySelector("[data-svc-word]");
    const st = { trigger: svc, containerAnimation: tween, start: "left right", end: "left 20%", scrub: true };
    gsap.fromTo(media, { clipPath: "inset(12% 0% 12% 70% round 20px)" }, { clipPath: "inset(0% 0% 0% 0% round 20px)", ease: "power2.out", scrollTrigger: st });
    gsap.fromTo(img, { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: { ...st, end: "right left" } });
    gsap.fromTo(word, { xPercent: 30 }, { xPercent: -8, ease: "none", scrollTrigger: { ...st, end: "right left" } });
  });
}

/** Moment der Ruhe: nur ein sehr langsamer Reveal, Zeile für Zeile. */
export function silenceScene({ motion }: MotionConditions, el: HTMLElement) {
  if (!motion) return;
  const q = gsap.utils.selector(el);
  gsap.fromTo(
    q("[data-quiet]"),
    { yPercent: 105 },
    { yPercent: 0, ease: "power1.out", stagger: 0.35, scrollTrigger: { trigger: el, start: "top 75%", end: "center 55%", scrub: 1.4 } },
  );
}

/** Finale: drei Wörter kommen aus den Ecken, verschmelzen in der Mitte und werden zu PJE Systems. */
export function finalScene({ motion, desktop }: MotionConditions, el: HTMLElement) {
  if (!motion) return;
  const q = gsap.utils.selector(el);
  const words = q("[data-fw]");
  const k = desktop ? 1 : 0.55;
  const from = [
    { x: -34, y: -26 },
    { x: 30, y: 24 },
    { x: 36, y: -18 },
  ];
  gsap.set(words, { xPercent: -50, yPercent: -50, x: (i: number) => (window.innerWidth / 100) * from[i].x * k, y: (i: number) => (window.innerHeight / 100) * from[i].y });
  gsap.set(q("[data-final-title]"), { autoAlpha: 0, scale: 1.25, letterSpacing: "0.02em" });
  gsap.set(q("[data-final-l]"), { yPercent: 110 });
  gsap.set(q("[data-final-cta]"), { autoAlpha: 0, y: 24 });
  const tl = gsap.timeline({
    scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
  });
  tl.to(words, { x: 0, y: 0, scale: 0.5, duration: 1, ease: "power2.inOut" }, 0)
    .to(words, { autoAlpha: 0, filter: "blur(6px)", duration: 0.25 }, 0.85)
    .to(q("[data-final-title]"), { autoAlpha: 1, scale: 1, letterSpacing: "-0.065em", duration: 0.5, ease: "power3.out" }, 0.9)
    .to(q("[data-final-l]"), { yPercent: 0, stagger: 0.12, duration: 0.3 }, 1.25)
    .to(q("[data-final-cta]"), { autoAlpha: 1, y: 0, duration: 0.35 }, 1.45)
    .to({}, { duration: 0.35 });
}

/** Footer: die drei Zeilen fahren gegeneinander ein, während der Footer ins Bild kommt. */
export function footerScene({ motion }: MotionConditions, el: HTMLElement) {
  if (!motion) return;
  const q = gsap.utils.selector(el);
  q("[data-foot-l]").forEach((l, i) => {
    gsap.fromTo(
      l,
      { xPercent: i % 2 ? 18 : -18 },
      { xPercent: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 25%", scrub: 0.6 } },
    );
  });
}
