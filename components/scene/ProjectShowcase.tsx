"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, MouseScroll, X } from "@phosphor-icons/react/ssr";
import { gsap, useGsap } from "@/lib/gsap";
import { projects, type Project } from "@/lib/content";
import { FogCanvas, type FogState } from "./Fog";

/*
 * Referenz als Szene in der Bergwelt:
 * Aus dem Nebel → zwischen den Bergkanten glimmt ein Lichtspalt → er öffnet sich zum Browserfenster
 * → die Seite bleibt stehen, der Scroll fährt durch die echte Website → Kamera zieht zurück,
 * Nebel schluckt das Fenster, die helle Seite geht weiter.
 */

const FOG: [number, number, number] = [0.8, 0.83, 0.92];

function ProjectScene({ p, index }: { p: Project; index: number }) {
  const root = useRef<HTMLElement>(null);
  const shared = useRef<FogState>({ prog: 0, wall: 0, reduce: false });
  const [live, setLive] = useState(false);

  useEffect(() => {
    shared.current.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useGsap(root, ({ motion, desktop }, el) => {
    const q = gsap.utils.selector(el);
    const s = shared.current;
    const html = document.documentElement;
    // Desktop: Browserfenster, Smartphone: Handy-Rahmen mit der mobilen Website (jeweils das sichtbare)
    const visible = (sel: string) => q(sel).find((e) => e.getClientRects().length) as HTMLElement | undefined;
    const view = visible("[data-view]");
    const strip = view?.querySelector<HTMLElement>("[data-strip]");
    if (!motion || !view || !strip) return;
    const phone = view.hasAttribute("data-phone-view");
    // Wie weit die Seite im Fenster fahren muss (Streifenhöhe minus sichtbarer Bereich)
    const travel = () => {
      const w = view.clientWidth;
      if (phone) return -Math.max(0, (w * p.mobile.page.height) / p.mobile.page.width - view.clientHeight);
      const stripH = (w * p.page.height) / p.page.width;
      const headH = (w * p.header.height) / p.header.width;
      return -Math.max(0, stripH - (view.clientHeight - headH));
    };

    gsap.set(q("[data-pstage]"), { autoAlpha: 0 });
    s.wall = 1;
    gsap.set(q("[data-slit]"), { scaleY: 0, autoAlpha: 1 });
    gsap.set(q("[data-frame]"), { clipPath: "inset(0% 50% 0% 50% round 14px)", scale: 0.92 });
    gsap.set(q("[data-pl]"), { yPercent: 110 });
    gsap.set(q("[data-thumb]"), { scaleY: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: desktop ? 1 : 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          s.prog = self.progress;
          html.classList.toggle("story-dark", self.progress > 0.06 && self.progress < 0.9);
        },
        onLeave: () => html.classList.remove("story-dark"),
        onLeaveBack: () => html.classList.remove("story-dark"),
      },
    });
    // Aus dem hellen Nebel in die Nacht: Bühne taucht auf, dann lichtet sich der Nebel
    tl.to(q("[data-pstage]"), { autoAlpha: 1, duration: 0.04 }, 0)
      .to(s, { wall: 0, duration: 0.08, ease: "power1.out" }, 0.02)
      .fromTo(q("[data-cam]"), { scale: 1.3 }, { scale: 1.02, duration: 1 }, 0)
      // Lichtspalt zwischen den Bergkanten, der sich zum Fenster öffnet
      .to(q("[data-slit]"), { scaleY: 1, duration: 0.06, ease: "power2.out" }, 0.04)
      .to(q("[data-frame]"), { clipPath: "inset(0% 0% 0% 0% round 14px)", scale: 1, duration: 0.12, ease: "power3.inOut" }, 0.1)
      .to(q("[data-slit]"), { autoAlpha: 0, duration: 0.05 }, 0.18)
      .to(q("[data-pl]"), { yPercent: 0, stagger: 0.03, duration: 0.1, ease: "power2.out" }, 0.08)
      // Fahrt durch die Website
      .to(strip, { y: travel, duration: 0.62, ease: "power1.inOut" }, 0.22)
      .to(q("[data-thumb]"), { scaleY: 1, duration: 0.62, ease: "power1.inOut" }, 0.22)
      // Kamera zieht zurück, Nebel schluckt das Fenster
      .to(q("[data-frame]"), { scale: 0.62, yPercent: -6, duration: 0.1, ease: "power2.in" }, 0.86)
      .to(q("[data-pl]"), { yPercent: -110, stagger: 0.02, duration: 0.06 }, 0.86)
      .to(s, { wall: 1, duration: 0.08, ease: "power2.in" }, 0.86)
      // Bühne löst sich in den hellen Nebel der Seite auf
      .to(q("[data-pstage]"), { autoAlpha: 0, duration: 0.04 }, 0.93);
  });

  const nr = String(index + 1).padStart(2, "0");
  return (
    <section ref={root} aria-labelledby={`projekt-${p.id}`} className="relative h-[400svh] max-lg:h-[260svh] motion-reduce:h-auto">
      <div data-pstage className="sticky top-0 h-[100svh] overflow-hidden text-white motion-reduce:static motion-reduce:bg-navy-deep motion-reduce:h-auto motion-reduce:py-24">
        {/* Die Landschaft dahinter ist der Drohnenflug (DroneScene); ein Abendschleier macht die helle Schrift lesbar */}
        <div aria-hidden className="absolute inset-0">
          <div data-cam className="absolute inset-0 origin-[61%_45%] [background:radial-gradient(120%_90%_at_65%_50%,rgb(7_14_34/0.45),rgb(7_14_34/0.78))]" />
        </div>
        <FogCanvas shared={shared} color={FOG} alpha={0.3} low={0.4} seed={index * 4.3 + 1.7} />

        {/* Text und Browserfenster als feste Spalten: der Text liegt nie unter dem Fenster */}
        <div className="wrap absolute inset-x-0 inset-y-0 flex flex-col gap-5 pb-[max(20px,env(safe-area-inset-bottom))] max-lg:landscape:flex-row max-lg:landscape:items-center max-lg:landscape:gap-8 pt-[calc(var(--nav-h)+12px)] lg:flex-row lg:items-center lg:justify-center lg:gap-[4vw] lg:pb-0 lg:pt-[calc(var(--nav-h)+2vh)] xl:pr-[calc(var(--gutter)+48px)]">
          <div className="relative z-20 shrink-0 lg:w-[30%] max-lg:landscape:w-1/2">
            <p className="line-mask font-mono text-[0.72rem] uppercase tracking-[0.22em] text-white/60 short:hidden">
              <span data-pl className="block">
                Projekt {nr} · Von uns erstellte Website
              </span>
            </p>
            <h2 id={`projekt-${p.id}`} className="line-mask mt-4 text-[clamp(2.6rem,5.2vw,6rem)] short:mt-0 short:text-[2.2rem] font-semibold leading-[0.9] tracking-[-0.06em]">
              <span data-pl className="block">
                {p.name}
                <span className="text-[#6f8cff]">.</span>
              </span>
            </h2>
            <p className="line-mask mt-3 text-[0.95rem] text-white/75 sm:mt-4 sm:text-base">
              <span data-pl className="block">
                {p.claim}
              </span>
            </p>
            <p className="line-mask mt-3 font-mono text-[0.66rem] short:hidden uppercase tracking-[0.18em] text-[#8ea4ff] sm:mt-6 sm:text-[0.72rem] sm:tracking-[0.2em]">
              <span data-pl className="block">
                {p.scope.join(" · ")} · von PJE Systems
              </span>
            </p>
            <div className="line-mask mt-4 pb-1 sm:mt-7 short:mt-3">
              <div data-pl className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <button type="button" onClick={() => setLive(true)} className="btn btn-light btn-sm short:hidden" data-magnetic>
                  <MouseScroll size={17} aria-hidden />
                  <span className="btn-t"><span data-t="Selbst durchscrollen">Selbst durchscrollen</span></span>
                </button>
                <a href={p.url} target="_blank" rel="noopener" className="link-u inline-flex items-center gap-1.5 font-medium">
                  {p.host} öffnen <ArrowUpRight size={14} aria-hidden />
                </a>
              </div>
            </div>
          </div>
          {/* Smartphone: Handy-Rahmen mit der mobilen Website, füllt den restlichen Platz */}
          <div className="relative flex min-h-[min(300px,60svh)] w-full flex-1 items-center justify-center lg:hidden max-lg:landscape:h-full">
            <div className="relative aspect-[9/19.5] h-full max-h-[620px] max-w-full">
              <span data-slit aria-hidden className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_24px_6px_rgb(170_190_255/0.7),0_0_80px_20px_rgb(111_140_255/0.35)] motion-reduce:hidden" />
              <div data-frame className="absolute inset-0 flex flex-col overflow-hidden rounded-[2rem] border-[5px] border-[#1b1f28] bg-[#0b0b0c] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.08)]">
                <button type="button" onClick={() => setLive(true)} aria-label={`${p.name} selbst durchscrollen`} className="absolute inset-0 z-10">
                  <span className="absolute inset-x-0 bottom-[14%] mx-auto inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-[#0b1630]/85 px-2.5 py-1 text-[0.68rem] font-medium text-white backdrop-blur">
                    <MouseScroll size={12} aria-hidden /> Selbst scrollen
                  </span>
                </button>
                <Image src={p.mobile.header.src} alt="" aria-hidden width={p.mobile.header.width} height={p.mobile.header.height} sizes="60vw" className="block h-auto w-full shrink-0" />
                <div data-view data-phone-view className="relative min-h-0 flex-1 overflow-hidden">
                  <div data-strip className="absolute inset-x-0 top-0">
                    <Image src={p.mobile.page.src} alt={`Mobile Ansicht der Website ${p.name}, erstellt von PJE Systems`} width={p.mobile.page.width} height={p.mobile.page.height} sizes="60vw" className="block h-auto w-full" />
                  </div>
                </div>
                <Image src={p.mobile.bar.src} alt="" aria-hidden width={p.mobile.bar.width} height={p.mobile.bar.height} sizes="60vw" className="block h-auto w-full shrink-0" />
              </div>
            </div>
          </div>
          {/* Desktop: Browserfenster */}
          <div className="relative hidden w-full lg:block lg:min-w-0 lg:flex-1">
            <div className="relative mx-auto aspect-[16/10] w-full lg:max-w-[min(100%,calc(72svh*1.6))]">
              <span data-slit aria-hidden className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_24px_6px_rgb(170_190_255/0.7),0_0_80px_20px_rgb(111_140_255/0.35)] motion-reduce:hidden" />
              <div data-frame className="absolute inset-0 flex flex-col overflow-hidden rounded-[14px] border border-white/15 bg-[#0b0b0c] shadow-[0_60px_120px_-40px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.04)]">
                {/* Klick auf die Vorschau öffnet die echte Website zum Selberscrollen */}
                <button type="button" onClick={() => setLive(true)} aria-label={`${p.name} selbst durchscrollen`} className="group absolute inset-0 z-10 cursor-pointer">
                  <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-[#0b1630]/80 px-4 py-2 text-[0.85rem] font-medium text-white opacity-80 backdrop-blur transition-[opacity,translate] duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
                    <MouseScroll size={16} aria-hidden /> Klicken und selbst scrollen
                  </span>
                </button>
                <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="mx-auto rounded-full bg-white/[0.06] px-6 py-0.5 font-mono text-[0.66rem] text-white/60">{p.host}</span>
                </div>
                <div data-view className="relative flex-1 overflow-hidden">
                  <div data-strip className="absolute inset-x-0 top-0">
                    <Image src={p.page.src} alt={`Website ${p.name}, erstellt von PJE Systems`} width={p.page.width} height={p.page.height} sizes="(min-width: 1024px) 58vw, 92vw" className="block h-auto w-full" />
                  </div>
                  <Image src={p.header.src} alt="" aria-hidden width={p.header.width} height={p.header.height} sizes="(min-width: 1024px) 58vw, 92vw" className="absolute inset-x-0 top-0 block h-auto w-full" />
                  <span aria-hidden className="absolute bottom-2 right-1.5 top-10 w-[3px] rounded-full bg-white/10">
                    <span data-thumb className="block h-full w-full origin-top rounded-full bg-white/50" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FogCanvas shared={shared} color={FOG} alpha={0.22} low={0.9} seed={index * 2.1 + 9.3} />
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />
      </div>
      {live && <LiveSite p={p} onClose={() => setLive(false)} />}
    </section>
  );
}

/**
 * Die echte Website in einem großen Browserfenster: frei scrollen und klicken.
 * Während das Fenster offen ist, pausiert das weiche Scrollen der Seite (Lenis).
 */
function LiveSite({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const lenis = window.__lenis;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      lenis?.start();
    };
  }, [onClose]);

  // Direkt an <body> hängen: so liegt das Fenster über Navigation und allen Szenen
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Website ${p.name}`}
      data-lenis-prevent
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={`fixed inset-0 z-[95] flex items-center justify-center bg-[#070e22]/80 p-3 backdrop-blur-md transition-opacity duration-300 sm:p-6 ${shown ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`flex h-[min(88svh,960px)] w-[min(1280px,100%)] flex-col overflow-hidden rounded-[16px] border border-white/15 bg-[#0b0b0c] shadow-[0_60px_140px_-40px_rgb(0_0_0/0.9)] transition-transform duration-500 ease-[var(--ease-out-expo)] ${shown ? "scale-100" : "scale-95"}`}
      >
        <div className="flex h-14 shrink-0 items-center gap-2 border-b sm:h-11 border-white/10 bg-white/[0.04] px-3 text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="mx-auto hidden rounded-full bg-white/[0.06] px-8 py-1 font-mono text-[0.72rem] text-white/70 sm:block">{p.host}</span>
          <a href={p.url} target="_blank" rel="noopener" className="ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8rem] sm:min-h-0 text-white/80 hover:text-white sm:ml-0">
            Neuer Tab <ArrowUpRight size={13} aria-hidden />
          </a>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Schließen" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:h-9 sm:w-9">
            <X size={16} aria-hidden />
          </button>
        </div>
        <iframe src={p.url} title={`Website ${p.name}, erstellt von PJE Systems`} className="h-full w-full flex-1 border-0 bg-[#0b0b0c]" loading="lazy" />
      </div>
    </div>,
    document.body,
  );
}

/** Alle Referenzen nacheinander, jede als eigene Szene. */
export function ProjectShowcase() {
  return (
    <div id="referenzen">
      {projects.map((p, i) => (
        <ProjectScene key={p.id} p={p} index={i} />
      ))}
    </div>
  );
}
