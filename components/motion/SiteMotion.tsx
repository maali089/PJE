"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Globale, leichte Interaktionsschicht (ohne Animations-Bibliothek):
 * - [data-reveal]  : Einblenden beim Eintritt in den Viewport
 * - [data-bg]      : weicher Wechsel der Seitenfarbe (Weiß / Hellgrau) je Section
 * - [data-magnetic]: Buttons folgen dem Cursor minimal (nur Maus)
 * - [data-tilt]    : Flächen neigen sich minimal Richtung Cursor (nur Maus)
 */
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // Reveal: an die Scrollposition gekoppelt (läuft beim Zurückscrollen rückwärts)
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce) {
      revealEls.forEach((el) => el.classList.add("is-in"));
    } else {
      const tweens = revealEls.map((el) =>
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: el.dataset.reveal === "fade" ? 0 : 56 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            immediateRender: true,
            scrollTrigger: { trigger: el, start: "top 97%", end: "top 68%", scrub: 0.5 },
          },
        ),
      );
      // Bilder: leichte Parallaxe und Zoom beim Durchscrollen
      const imgs = Array.from(document.querySelectorAll<HTMLElement>(".img-zoom img, [data-pan-img]")).filter((i) => !i.closest("[data-pin]"));
      const imgTweens = imgs.map((img) =>
        gsap.fromTo(
          img,
          { yPercent: -5, scale: 1.14 },
          { yPercent: 5, scale: 1.02, ease: "none", scrollTrigger: { trigger: img.parentElement!, start: "top bottom", end: "bottom top", scrub: true } },
        ),
      );
      ScrollTrigger.refresh();
      cleanups.push(() => [...tweens, ...imgTweens].forEach((t) => (t.scrollTrigger?.kill(), t.kill())));
    }

    // Seitenfarbe
    const bgEls = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]"));
    const colors: Record<string, string> = { paper: "#e3e5e8", mist: "#dcdee2" };
    document.body.style.setProperty("--page-bg", colors.paper);
    if (bgEls.length) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const c = colors[(e.target as HTMLElement).dataset.bg || "paper"] ?? colors.paper;
              document.body.style.setProperty("--page-bg", c);
            }
          }
        },
        { rootMargin: "-50% 0px -50% 0px" },
      );
      bgEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    if (finePointer && !reduce) {
      // Magnetische Buttons
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = 0.22;
        const move = (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = ev.clientX - (r.left + r.width / 2);
          const y = ev.clientY - (r.top + r.height / 2);
          el.style.transform = `translate3d(${x * strength}px, ${y * strength * 1.2}px, 0)`;
        };
        const leave = () => {
          el.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
          el.style.transform = "";
          window.setTimeout(() => (el.style.transition = ""), 700);
        };
        const enter = () => (el.style.transition = "transform 0.2s cubic-bezier(0.16,1,0.3,1)");
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          el.style.transform = "";
        });
      });

      // Tilt
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        el.classList.add("tilt");
        const max = Number(el.dataset.tilt) || 3;
        const move = (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (ev.clientX - r.left) / r.width - 0.5;
          const py = (ev.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--ry", `${px * max}deg`);
          el.style.setProperty("--rx", `${-py * max}deg`);
        };
        const leave = () => {
          el.style.setProperty("--ry", "0deg");
          el.style.setProperty("--rx", "0deg");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
