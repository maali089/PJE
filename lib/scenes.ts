"use client";

import { gsap, type MotionConditions } from "./gsap";
import { itMobileScene, softMobileScene, storyScene, teamScene, webMobileScene } from "./story";
import { digitalScene, finalScene, footerScene, servicesScene, silenceScene } from "./finale";

type Setup = (c: MotionConditions, el: HTMLElement) => void | (() => void);

/* Alle Scroll-Szenen. Das Markup rendert der Server, hier hängt nur die Bewegung an. */
export const scenes: Record<string, Setup> = {
  idea: ({ motion, desktop }, el) => {
    const q = gsap.utils.selector(el);
    const setActive = (i: number) => el.setAttribute("data-step", String(i));

    if (!motion) {
      setActive(4);
      return;
    }

    // Startzustände (Markup zeigt ohne Bewegung den Endzustand „Live“)
    gsap.set(q("[data-notes]"), { opacity: 1 });
    gsap.set(q("[data-url-test]"), { opacity: 1 });
    gsap.set(q("[data-note]"), { opacity: 0, y: 8 });
    gsap.set(q("[data-wire]"), { scaleX: 0, opacity: 0 });
    gsap.set(q("[data-layer='wire']"), { opacity: 1 });
    gsap.set(q("[data-layer='design']"), { opacity: 0, scale: 0.985 });
    gsap.set(q("[data-design-img]"), { clipPath: "inset(0 100% 0 0 round 1.2cqw)" });
    gsap.set(q("[data-chip]"), { opacity: 0, y: 12 });
    gsap.set(q("[data-code]"), { x: 0, xPercent: 104 });
    gsap.set(q("[data-code-line]"), { opacity: 0, x: -6 });
    gsap.set(q("[data-check]"), { opacity: 0, y: 8 });
    gsap.set(q("[data-url-live]"), { opacity: 0, y: 6 });
    gsap.set(q("[data-phone]"), { yPercent: 120, opacity: 0 });
    gsap.set(q("[data-toast]"), { opacity: 0, y: 16, scale: 0.96 });
    gsap.set(q("[data-live-badge]"), { opacity: 0, scale: 0.8 });
    setActive(0);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.5 },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * (desktop ? 2.8 : 2.4)}`,
        pin: q("[data-pin]")[0],
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setActive(p < 0.17 ? 0 : p < 0.37 ? 1 : p < 0.57 ? 2 : p < 0.8 ? 3 : 4);
          el.style.setProperty("--p", p.toFixed(4));
        },
      },
    });

    tl.addLabel("idee", 0)
      .to(q("[data-note]"), { opacity: 1, y: 0, stagger: 0.12, duration: 0.3 }, 0.05)
      .addLabel("konzept", 1)
      .to(q("[data-notes]"), { opacity: 0, scale: 0.94, y: -10, duration: 0.35 }, 0.75)
      .to(q("[data-wire]"), { scaleX: 1, opacity: 1, stagger: 0.025, duration: 0.35, ease: "power3.out" }, 0.85)
      .addLabel("design", 2)
      .to(q("[data-layer='design']"), { opacity: 1, scale: 1, duration: 0.45 }, 1.8)
      .to(q("[data-layer='wire']"), { opacity: 0, duration: 0.3 }, 1.85)
      .to(q("[data-design-img]"), { clipPath: "inset(0 0% 0 0 round 1.2cqw)", duration: 0.5, ease: "power3.inOut" }, 1.9)
      .to(q("[data-chip]"), { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 }, 2.0)
      .addLabel("entwicklung", 3)
      .to(q("[data-chip]"), { opacity: 0, y: -8, duration: 0.25 }, 2.75)
      .to(q("[data-code]"), { xPercent: 0, duration: 0.45, ease: "power3.out" }, 2.8)
      .to(q("[data-code-line]"), { opacity: 1, x: 0, stagger: 0.035, duration: 0.2 }, 2.95)
      .to(q("[data-check]"), { opacity: 1, y: 0, stagger: 0.08, duration: 0.2 }, 3.35)
      .addLabel("live", 4.2)
      .to(q("[data-code]"), { xPercent: 104, duration: 0.4, ease: "power2.in" }, 3.85)
      .to(q("[data-url-test]"), { opacity: 0, y: -6, duration: 0.2 }, 3.95)
      .to(q("[data-url-live]"), { opacity: 1, y: 0, duration: 0.25 }, 4.05)
      .to(q("[data-live-badge]"), { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, 4.1)
      .to(q("[data-phone]"), { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 4.05)
      .to(q("[data-toast]"), { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 4.35)
      .to({}, { duration: 0.35 });
  },
  showcase: ({ motion, desktop }, el) => {
    const q = gsap.utils.selector(el);
    if (!motion) {
      // Statischer Endzustand: alle Geräte sichtbar
      gsap.set(q("[data-tablet], [data-phone], [data-resp]"), { opacity: 1 });
      gsap.set(q("[data-caption]"), { opacity: 0 });
      gsap.set(q("[data-desktop]"), { scale: desktop ? 0.8 : 0.9, xPercent: desktop ? 8 : 0, yPercent: desktop ? -2 : -14 });
      return;
    }

    const slides = q("[data-slide]");
    gsap.set(slides.slice(1), { yPercent: 100 });
    gsap.set(
      slides.slice(1).map((s) => s.firstElementChild),
      { yPercent: -60 },
    );
    gsap.set(q("[data-caption]").slice(1), { opacity: 0, y: 14 });
    gsap.set(q("[data-tablet]"), { xPercent: desktop ? -40 : -30, opacity: 0, rotate: -2 });
    gsap.set(q("[data-phone]"), { xPercent: 40, opacity: 0, rotate: 3 });
    gsap.set(q("[data-resp]"), { opacity: 0, y: 14 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 1 },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * 2}`,
        pin: q("[data-pin]")[0],
        scrub: 0.9,
        invalidateOnRefresh: true,
      },
    });

    // Designwechsel: neue Seite schiebt sich von unten herein, Inhalt mit Gegenbewegung
    for (let i = 1; i < slides.length; i++) {
      const at = i - 0.6;
      tl.to(slides[i], { yPercent: 0 }, at)
        .to(slides[i].firstElementChild, { yPercent: 0 }, at)
        .to(slides[i - 1], { scale: 0.94, opacity: 0.4, duration: 0.8 }, at)
        .to(q("[data-caption]")[i - 1], { opacity: 0, y: -14, duration: 0.4 }, at)
        .to(q("[data-caption]")[i], { opacity: 1, y: 0, duration: 0.5 }, at + 0.4);
    }

    // Geräte setzen sich zusammen
    const d = slides.length - 0.4;
    tl.to(q("[data-desktop]"), { scale: desktop ? 0.8 : 0.9, xPercent: desktop ? 8 : 0, yPercent: desktop ? -2 : -14 }, d)
      .to(q("[data-tablet]"), { xPercent: 0, opacity: 1, rotate: 0 }, d + 0.1)
      .to(q("[data-phone]"), { xPercent: 0, opacity: 1, rotate: 0 }, d + 0.2)
      .to(q("[data-caption]")[slides.length - 1], { opacity: 0, y: -14, duration: 0.4 }, d)
      .to(q("[data-resp]"), { opacity: 1, y: 0, duration: 0.5 }, d + 0.5)
      .to({}, { duration: 0.4 });
  },
  pipeline: ({ motion, desktop }, el) => {
    const q = gsap.utils.selector(el);
    const lines = q("[data-line]");
    const rings = q("[data-ring]");
    const flows = q("[data-flow]");
    if (!motion) {
      gsap.set(rings, { opacity: 1 });
      return;
    }
    gsap.set(lines, desktop ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 });
    gsap.set(rings, { opacity: 0 });
    gsap.set(q("[data-node]"), { y: 16 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: el, start: "top 78%", end: desktop ? "bottom 55%" : "bottom 70%", scrub: 0.6 },
    });
    q("[data-node]").forEach((node, i) => {
      tl.to(node, { y: 0, duration: 0.5 }, i).to(rings[i], { opacity: 1, duration: 0.3 }, i + 0.2);
      if (lines[i]) {
        tl.to(lines[i], desktop ? { scaleX: 1, duration: 0.6 } : { scaleY: 1, duration: 0.6 }, i + 0.4).to(
          flows[i],
          { opacity: 1, duration: 0.2 },
          i + 0.9,
        );
      }
    });
  },
  map: ({ motion }, el) => {
    if (!motion) return;
    const q = gsap.utils.selector(el);
    gsap.set(q("[data-radius]"), { scale: 0, opacity: 0, transformOrigin: "50% 50%", transformBox: "fill-box" });
    gsap.set(q("[data-place]"), { opacity: 0 });
    gsap.set(q("[data-city]"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%", transformBox: "fill-box" });
    gsap.set(q("[data-link]"), { strokeDashoffset: 60 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 75%", end: "center 45%", scrub: 0.7 },
    });
    tl.to(q("[data-city]"), { opacity: 1, scale: 1, stagger: 0.15, duration: 0.3, ease: "back.out(2)" }, 0)
      .to(q("[data-link]"), { strokeDashoffset: 0, duration: 0.5 }, 0.2)
      .to(q("[data-radius]"), { scale: 1, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power2.out" }, 0.3)
      .to(q("[data-place]"), { opacity: 1, stagger: 0.05, duration: 0.3 }, 0.7);
  },
  trust: ({ motion, desktop }, el) => {
    if (!motion) return;
    const q = gsap.utils.selector(el);
    gsap.fromTo(
      q("[data-panel]"),
      { clipPath: desktop ? "inset(6% 4% 0% 4% round 40px)" : "inset(3% 3% 0% 3% round 28px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 15%", scrub: 0.6 },
      },
    );
    // Die beiden Zeilen der Headline bewegen sich gegeneinander
    gsap.fromTo(q("[data-line-a]"), { xPercent: -4 }, { xPercent: 1.5, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(q("[data-line-b]"), { xPercent: 5 }, { xPercent: -1.5, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
  },
  process: ({ motion, desktop }, el) => {
    const q = gsap.utils.selector(el);
    const items = q("[data-step]");
    if (!motion) {
      items.forEach((it) => it.classList.add("is-on"));
      gsap.set(q("[data-fill]"), { scaleX: 1, scaleY: 1 });
      return;
    }
    items.forEach((it, i) => it.classList.toggle("is-on", i === 0));

    if (desktop) {
      gsap.set(q("[data-fill]"), { scaleX: 0, scaleY: 1 });
      const n = items.length;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.4}`,
          pin: q("[data-pin]")[0],
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const reached = self.progress * (n - 1) + 0.05;
            items.forEach((it, i) => it.classList.toggle("is-on", i <= reached));
          },
        },
      });
      tl.to(q("[data-fill]"), { scaleX: 1, duration: 1 });
    } else {
      gsap.set(q("[data-fill]"), { scaleY: 0, scaleX: 1 });
      gsap.to(q("[data-fill]"), {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: q("ol")[0], start: "top 70%", end: "bottom 60%", scrub: 0.5 },
      });
      items.forEach((it) =>
        gsap.timeline({
          scrollTrigger: { trigger: it, start: "top 68%", toggleClass: { targets: it, className: "is-on" } },
        }),
      );
    }
  },
  words: ({ motion }, el) => {
    if (!motion) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    gsap.fromTo(
      words,
      { opacity: 0.14 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.6 },
      },
    );
  },
  parallax: ({ motion, desktop }, el) => {
    if (!motion) return;
    const amount = Number(el.dataset.amount) || 8;
    const a = desktop ? amount : amount / 2;
    gsap.fromTo(
      el.firstElementChild,
      { yPercent: -a },
      { yPercent: a, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
    );
  },
  services: ({ motion, desktop }, el) => {
    // Vorschaubild folgt dem Cursor (nur Maus, Desktop, ohne reduzierte Bewegung)
    const list = el.querySelector<HTMLElement>("[data-list]");
    const preview = el.querySelector<HTMLElement>("[data-preview]");
    if (!motion || !desktop || !list || !preview) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let x = 0, y = 0, tx = 0, ty = 0, visible = false;
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      const rot = Math.max(-6, Math.min(6, (tx - x) * 0.05));
      preview.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
      if (visible || Math.abs(tx - x) > 0.5) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      const r = list.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!visible) {
        x = tx;
        y = ty;
      }
    };
    const onEnterRow = (e: Event) => {
      preview.dataset.active = (e.currentTarget as HTMLElement).dataset.index;
      preview.style.opacity = "1";
      preview.style.scale = "1";
      if (!visible) {
        visible = true;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    };
    const onLeave = () => {
      visible = false;
      preview.style.opacity = "0";
      preview.style.scale = "0.85";
    };
    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-index]"));
    rows.forEach((r) => r.addEventListener("pointerenter", onEnterRow));
    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      rows.forEach((r) => r.removeEventListener("pointerenter", onEnterRow));
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
    };
  },
  story: storyScene,
  webMobile: webMobileScene,
  team: teamScene,
  digital: digitalScene,
  svcPan: servicesScene,
  silence: silenceScene,
  final: finalScene,
  footer: footerScene,
  softMobile: softMobileScene,
  itMobile: itMobileScene,
};
