"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FogCanvas, type FogState } from "./Fog";
import { coverBox, RIDGE } from "@/lib/mountain";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { gsap, useGsap } from "@/lib/gsap";
import { chapterScroll } from "@/lib/story";
import { waLink } from "@/lib/content";

type Shared = FogState;

/*
 * Eröffnungsszene: Gewitter über dem Berg.
 * Ebenen (hinten → vorne): Bild · Nebel hinten · Text hinter dem Grat · Berg-Vordergrund (dasselbe Bild,
 * auf die Silhouette zugeschnitten) · Regen + Blitze · Nebel vorne · Blitz-Licht · Hero-Text.
 * Der Scroll fährt die Kamera auf den Gipfel zu, der Text steigt hinter dem Grat hervor,
 * am Ende fliegt die Kamera in eine Nebelwand, aus der die Story (hell) weiterläuft.
 */


/* ---------------------------------------------------------------- */
/* Regen und Blitze (Canvas 2D)                                        */
/* ---------------------------------------------------------------- */

type Bolt = { pts: [number, number][]; branches: [number, number][][]; born: number; life: number; x: number; y: number };

function makeBolt(x: number, y0: number, y1: number, w: number): Omit<Bolt, "born" | "life" | "x" | "y"> {
  // Mittelpunkt-Verschiebung: gezackter Hauptast plus zwei, drei Seitenäste
  let pts: [number, number][] = [
    [x, y0],
    [x + (Math.random() - 0.5) * w * 0.08, y1],
  ];
  let off = w * 0.05;
  for (let k = 0; k < 6; k++) {
    const next: [number, number][] = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
      next.push([(ax + bx) / 2 + (Math.random() - 0.5) * off, (ay + by) / 2 + (Math.random() - 0.5) * off * 0.3], pts[i + 1]);
    }
    pts = next;
    off *= 0.55;
  }
  const branches: [number, number][][] = [];
  for (let b = 0; b < 3; b++) {
    const i = Math.floor(pts.length * (0.25 + Math.random() * 0.5));
    let [bx, by] = pts[i];
    const dir = Math.random() < 0.5 ? -1 : 1;
    const br: [number, number][] = [[bx, by]];
    for (let s = 0; s < 10; s++) {
      bx += dir * (4 + Math.random() * 10);
      by += 6 + Math.random() * 12;
      br.push([bx, by]);
    }
    branches.push(br);
  }
  return { pts, branches };
}

function StormCanvas({ shared, flashRef }: { shared: React.RefObject<Shared>; flashRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const flash = flashRef.current;
    if (!c || shared.current.reduce) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    let w = 0, h = 0;
    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w;
      c.height = h;
    };
    resize();
    // Regen in zwei Tiefen: vorne schneller, länger, heller
    const drops = Array.from({ length: mobile ? 70 : 170 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: i % 3 === 0 ? 1 : 0.45,
    }));
    const bolts: Bolt[] = [];
    let nextBolt = performance.now() + 1400;
    let raf = 0, visible = true, last = performance.now();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);

    const strike = (now: number) => {
      // meist nahe am Gipfel, manchmal weiter rechts über dem Tal
      const nearPeak = Math.random() < 0.6;
      const x = (nearPeak ? 0.3 + Math.random() * 0.12 : 0.55 + Math.random() * 0.3) * w;
      const y1 = (nearPeak ? 0.3 : 0.45 + Math.random() * 0.15) * h;
      bolts.push({ ...makeBolt(x, -10, y1, w), born: now, life: 520 + Math.random() * 240, x: x / w, y: y1 / h });
      nextBolt = now + 2600 + Math.random() * 4200;
    };

    const draw = (pts: [number, number][], width: number, alpha: number) => {
      ctx.globalAlpha = alpha;
      ctx.lineWidth = width;
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden || shared.current.prog > 0.985) {
        last = now;
        return;
      }
      const dt = Math.min(50, now - last) / 1000;
      last = now;
      if (now > nextBolt && shared.current.wall < 0.6) strike(now);
      ctx.clearRect(0, 0, w, h);

      // Regen
      ctx.strokeStyle = "rgb(200,214,255)";
      ctx.lineCap = "round";
      for (const d of drops) {
        d.y += dt * (d.z > 0.9 ? 1.6 : 0.9);
        d.x -= dt * 0.12 * d.z;
        if (d.y > 1.05) {
          d.y = -0.05;
          d.x = Math.random() * 1.1;
        }
        const len = (d.z > 0.9 ? 26 : 12) * (mobile ? 0.8 : 1);
        ctx.globalAlpha = d.z > 0.9 ? 0.22 : 0.12;
        ctx.lineWidth = d.z > 0.9 ? 1.2 : 0.8;
        ctx.beginPath();
        ctx.moveTo(d.x * w, d.y * h);
        ctx.lineTo(d.x * w + len * 0.18, d.y * h - len);
        ctx.stroke();
      }

      // Blitze: flackern zwei-, dreimal und verglimmen
      let light = 0;
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        const age = (now - b.born) / b.life;
        if (age > 1) {
          bolts.splice(i, 1);
          continue;
        }
        const flick = age < 0.12 ? 1 : age < 0.22 ? 0.25 : age < 0.34 ? 0.9 : age < 0.42 ? 0.3 : (1 - age) * 0.9;
        light = Math.max(light, flick);
        ctx.strokeStyle = "rgb(214,200,255)";
        ctx.shadowColor = "rgb(170,150,255)";
        ctx.shadowBlur = 18;
        draw(b.pts, 5, flick * 0.35);
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#fff";
        draw(b.pts, 1.6, flick);
        b.branches.forEach((br) => draw(br, 1, flick * 0.6));
        if (flash) {
          flash.style.setProperty("--fx", `${b.x * 100}%`);
          flash.style.setProperty("--fy", `${b.y * 60}%`);
        }
      }
      ctx.globalAlpha = 1;
      // Der gemalte Blitz im Bild glimmt leise mit
      const idle = 0.08 + 0.06 * Math.sin(now / 90) * Math.sin(now / 1700);
      if (flash) flash.style.opacity = String(Math.min(0.55, light * 0.5 + Math.max(0, idle)));
    };
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [shared, flashRef]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}

/* ---------------------------------------------------------------- */
/* Szene                                                               */
/* ---------------------------------------------------------------- */

const BACK_FOG: [number, number, number] = [0.72, 0.76, 0.9];
// Farbe der Wolke am Gipfel, identisch mit der Wolke, in der die Drohnenszene (DroneScene) weiterfliegt
const FRONT_FOG: [number, number, number] = [0.81, 0.84, 0.9];

export function MountainStage() {
  const root = useRef<HTMLElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const shared = useRef<Shared>({ prog: 0, wall: 0, reduce: false });

  useEffect(() => {
    shared.current.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    chapterScroll.intro = 0;
    // Auf dem dunklen Berg braucht die Navigation die helle Variante
    document.documentElement.classList.add("story-dark");
    return () => document.documentElement.classList.remove("story-dark");
  }, []);

  useGsap(root, ({ motion, desktop }, el) => {
    const q = gsap.utils.selector(el);
    const html = document.documentElement;
    const s = shared.current;
    if (!motion) {
      s.prog = 0;
      s.wall = 0;
      return;
    }
    gsap.set(q("[data-behind]"), { y: () => window.innerHeight * 0.62 });
    gsap.set(q("[data-wall]"), { autoAlpha: 0 });
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: desktop ? 1 : 0.6,
        onUpdate: (self) => {
          s.prog = self.progress;
          html.classList.toggle("story-dark", self.progress < 0.76);
        },
        onLeave: () => html.classList.remove("story-dark"),
        onEnterBack: () => html.classList.add("story-dark"),
      },
    });
    // Hero-Text weicht nach unten hinter Masken zurück
    tl.to(q("[data-hero-l]"), { yPercent: 110, stagger: 0.02, duration: 0.14, ease: "power2.in" }, 0)
      .to(q("[data-hero-fade]"), { autoAlpha: 0, y: 30, duration: 0.12 }, 0)
      // Kamera: fährt auf den Gipfel zu und steigt leicht
      .to(q("[data-cam]"), { scale: desktop ? 1.85 : 1.55, yPercent: 6, duration: 0.9, ease: "power1.in" }, 0.02)
      // Text kommt hinter dem Grat hervor (langsamer als der Berg = weiter hinten)
      .to(q("[data-behind]"), { y: () => -window.innerHeight * 0.03, duration: 0.55, ease: "power2.out" }, 0.1)
      .to(q("[data-behind]"), { scale: 1.12, duration: 0.4 }, 0.5)
      // Die Drohne fliegt in die Wolke am Gipfel; dahinter fliegt sie in der 3D-Landschaft weiter (DroneScene)
      .to(s, { wall: 1, duration: 0.18, ease: "power2.in" }, 0.66)
      .to(q("[data-wall]"), { autoAlpha: 1, duration: 0.1 }, 0.76)
      // Bühne löst sich auf: darunter liegt dieselbe Wolke der Drohnenszene, kein harter Schnitt
      .to(q("[data-mstage]"), { autoAlpha: 0, duration: 0.08 }, 0.86)
      .to({}, { duration: 0.02 });
  });

  return (
    <section ref={root} data-chapter="intro" data-scene-stage="0" data-scene-align="top" aria-labelledby="hero-titel" className="relative h-[250svh] max-lg:h-[180svh] motion-reduce:h-auto">
      <div data-mstage className="sticky top-0 h-[100svh] overflow-hidden bg-navy-deep text-white motion-reduce:static">
        {/* Bild: Himmel, Berge, Tal */}
        <div className={coverBox}>
          <div data-cam className="absolute inset-0 origin-[35%_21%]">
            <Image src="/assets/berg-gewitter-2.webp" alt="" fill preload loading="eager" sizes="100vw" className="object-cover" />
          </div>
        </div>

        <FogCanvas shared={shared} color={BACK_FOG} alpha={0.34} low={0} seed={3.1} className="opacity-90" />

        {/* Text hinter dem Grat */}
        <p data-behind aria-hidden className="absolute inset-x-0 top-[6vh] text-center text-[clamp(3.2rem,11vw,11.5rem)] font-semibold leading-[0.86] tracking-[-0.065em] text-white/95 [text-shadow:0_0_60px_rgb(160_170_255/0.35)] motion-reduce:hidden">
          Wir bauen
          <br />
          digitale
          <br />
          Erlebnisse<span className="text-[#6f8cff]">.</span>
        </p>

        {/* Vorderes Massiv: dasselbe Bild, auf die Silhouette geschnitten, liegt vor dem Text */}
        <div className={coverBox} aria-hidden>
          <div data-cam className="absolute inset-0 origin-[35%_21%]" style={{ clipPath: RIDGE }}>
            <Image src="/assets/berg-gewitter-2.webp" alt="" fill sizes="100vw" className="object-cover" />
          </div>
        </div>

        <StormCanvas shared={shared} flashRef={flashRef} />
        <FogCanvas shared={shared} color={FRONT_FOG} alpha={0.42} low={0.85} seed={7.7} className="" />

        {/* Blitzlicht: hellt die Szene um den Einschlag kurz auf */}
        <div
          ref={flashRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen [background:radial-gradient(60%_55%_at_var(--fx,34%)_var(--fy,14%),rgb(190_180_255/0.55),transparent_70%)]"
        />
        {/* Vignette und Filmkorn */}
        <div aria-hidden className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgb(4_9_24/0.7))]" />
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

        {/* Hero */}
        <div className="wrap absolute inset-x-0 bottom-0 pb-[max(7vh,48px)]">
          <h1 id="hero-titel" className="text-[clamp(3.6rem,10.5vw,10.5rem)] font-semibold leading-[0.84] tracking-[-0.065em]">
            <span className="line-mask">
              <span data-hero-l className="block">
                <span className="anim-rise block" style={{ ["--d" as string]: 150 }}>
                  PJE Systems<span className="text-[#6f8cff]">.</span>
                </span>
              </span>
            </span>
            <span className="sr-only"> Websites, Software und IT-Service in München und Wolnzach.</span>
          </h1>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <p className="text-[clamp(1.6rem,3.2vw,3rem)] font-semibold leading-[1] tracking-[-0.045em]" aria-hidden>
                <span className="line-mask">
                  <span data-hero-l className="block">
                    <span className="anim-rise block" style={{ ["--d" as string]: 280 }}>
                      Digital. <span className="text-white/55">Aber anders.</span>
                    </span>
                  </span>
                </span>
              </p>
              <p data-hero-fade className="anim-fade-up mt-4 font-mono text-[0.78rem] uppercase tracking-[0.22em] text-white/70" style={{ ["--d" as string]: 420 }}>
                Websites · Software · IT <span className="mx-2 text-[#6f8cff]">/</span> München × Wolnzach
              </p>
            </div>
            <div data-hero-fade className="anim-fade-up flex flex-wrap gap-3" style={{ ["--d" as string]: 520 }}>
              <Link href="/kontakt/" className="btn btn-primary" data-magnetic>
                <span className="btn-t"><span data-t="Projekt starten">Projekt starten</span></span>
                <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
              </Link>
              <a target="_blank" rel="noopener" href={waLink("Hallo PJE, ich habe eine Anfrage:")} className="btn btn-outline-light" data-magnetic>
                <WhatsappLogo size={18} aria-hidden />
                <span className="btn-t"><span data-t="WhatsApp">WhatsApp</span></span>
              </a>
            </div>
          </div>
        </div>

        {/* Nebelwand, die in die helle Seite übergeht */}
        <div data-wall aria-hidden className="pointer-events-none absolute inset-0 bg-[#cfd6e3] opacity-0" />
      </div>
    </section>
  );
}
