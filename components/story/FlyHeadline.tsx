"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { DroneFront } from "@/components/scene/DroneFront";

/*
 * Zwischen zwei Bergen schwebt eine Headline. Zuerst verdeckt ein naher Grat den unteren Teil der Schrift,
 * die Drohne steigt, die Schrift wird ganz sichtbar, dann fliegt die Kamera an ihr vorbei.
 */
export function FlyHeadline() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, ({ motion }, el) => {
    if (!motion) return;
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 } });
    tl.fromTo(q("[data-fly-text]"), { scale: 0.86, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 0.6 }, 0)
      .to(q("[data-fly-text]"), { scale: 2.6, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 0.6);
  });

  return (
    <section ref={root} aria-labelledby="fly-titel" className="relative h-[180svh] motion-reduce:h-auto">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-28">
        <div data-fly-text className="wrap relative z-10 text-center">
          <h2 id="fly-titel" className="text-[clamp(3.2rem,10vw,10.5rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white [text-shadow:0_10px_60px_rgb(10_20_50/0.35)]">
            Websites,
            <br />
            die auffallen<span className="text-[#8ea4ff]">.</span>
          </h2>
          <p className="mt-6 font-mono text-[0.78rem] uppercase tracking-[0.22em] text-white/85 [text-shadow:0_2px_12px_rgb(10_20_50/0.5)]">
            Eigenes Layout · Schnell geladen · Für Google vorbereitet
          </p>
        </div>
        <DroneFront />
      </div>
    </section>
  );
}
