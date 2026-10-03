"use client";

import { gsap, type MotionConditions } from "./gsap";
import { setStoryAnchors } from "./sceneStage";

export type Chapter = "intro" | "web" | "software" | "it" | "standorte" | "team" | "kontakt";

let current: Chapter | null = null;
export function setChapter(c: Chapter) {
  if (c === current) return;
  current = c;
  window.dispatchEvent(new CustomEvent("pje:chapter", { detail: c }));
}

/** Scrollposition (px) je Kapitel, damit die Fortschrittsanzeige springen kann. */
export const chapterScroll: Partial<Record<Chapter, number>> = {};

const T = {
  webStart: 1.2,
  softStart: 6.2,
  itStart: 10.4,
  lightAt: 13.6,
  mapAt: 14.4,
  end: 16.8,
};

// Die Timeline wird mit den Zeiten oben gebaut; danach rückt alles ab dem Browser um SH nach vorne,
// damit zwischen Bergszene und Browser keine leere Strecke bleibt.
const SH = 0.55;
const shift = (t: number) => (t >= T.webStart - 0.01 ? t - SH : t);
const unshift = (t: number) => (t >= T.webStart - SH - 0.01 ? t + SH : t);
const END = T.end - SH;

/** Skalierung, bei der ein Kreis (Durchmesser d, Mittelpunkt x/y in px) den ganzen Bildschirm bedeckt. */
function coverScale(d: number, x: number, y: number) {
  const w = window.innerWidth, h = window.innerHeight;
  return ((Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) * 2) / d) * 1.04;
}

// Wohin die UI-Bausteine des Smartphones kurz auseinanderfliegen (vw / vh / px / Grad)
const SCATTER = [
  { x: -9, y: -14, z: 160, rx: 18, ry: -24, rz: -8 },
  { x: 11, y: -8, z: 60, rx: -12, ry: 22, rz: 6 },
  { x: -13, y: 4, z: 220, rx: 10, ry: 30, rz: -4 },
  { x: 12, y: 9, z: 120, rx: -20, ry: -18, rz: 9 },
  { x: -2, y: 17, z: 80, rx: 24, ry: 8, rz: -12 },
];
const FRAG_OFFSET = [-11.5, -6.5, -0.5, 5.5, 10];

/**
 * Desktop-Story: eine durchgehende, an den Scroll gekoppelte Timeline.
 * (nach der Bergszene) Punkt → Linie → Browser wächst → Website baut sich auf → Zoom hinein → Geräte
 * → Smartphone zerfällt in UI-Bausteine → Nodes → Datenfluss → Zoom in einen Datenpunkt (Vollbild blau)
 * → dunkle IT-Welt, Computer explodiert und setzt sich zusammen → Hell verdrängt Dunkel → Karte.
 */
export function storyScene({ motion }: MotionConditions, el: HTMLElement) {
  if (!motion) return;
  const q = gsap.utils.selector(el);
  const one = (s: string) => q(s)[0] as HTMLElement;
  const stage = one("[data-pin]");
  const browser = one("[data-browser]");
  const screen = one("[data-screen]");
  const zdot = one("[data-zdot]");
  const itBg = one("[data-it-bg]");
  const light = one("[data-light]");
  const frags = q("[data-frag]");
  const vw = (n: number) => (window.innerWidth / 100) * n;
  const vh = (n: number) => (window.innerHeight / 100) * n;
  const lite = document.documentElement.classList.contains("lite");

  const fullScale = () => Math.max(window.innerWidth / browser.offsetWidth, window.innerHeight / browser.offsetHeight) * 1.04;
  const zCover = () => coverScale(12, window.innerWidth * 0.58, window.innerHeight * 0.62);
  const cCover = () => coverScale(20, window.innerWidth / 2, window.innerHeight / 2);
  // Ziel eines Bausteins: der passende Node in der Netzwerkzeile (relativ zur Smartphone-Mitte)
  const nodeX = (i: number) => vw(-32 + 16 * i - 17);

  // Startzustände
  gsap.set(browser, { autoAlpha: 1, scale: 0.3 });
  gsap.set(screen, { clipPath: "inset(50% 0% 50% 0% round 1.6cqw)" });
  gsap.set(q("[data-line]"), { scaleX: 0 });
  gsap.set(q("[data-hdot]"), { autoAlpha: 0, scale: 0 });
  gsap.set(q("[data-b]"), { autoAlpha: 0, y: 18 });
  gsap.set(q("[data-b='img']"), { clipPath: "inset(0% 100% 0% 0%)", autoAlpha: 1, y: 0 });
  gsap.set(q("[data-web-title]"), { autoAlpha: 0, x: -30 });
  gsap.set(q("[data-soft-l], [data-it-l], [data-map-l]"), { yPercent: 110 });
  gsap.set(q("[data-node]"), { autoAlpha: 0, y: 24, scale: 0.6 });
  gsap.set(q("[data-soft-line]"), { scaleX: 0 });
  gsap.set(q("[data-soft-track]"), { scaleX: 0, transformOrigin: "0% 50%" });
  gsap.set(q("[data-dot]"), { autoAlpha: 0, x: 0 });
  gsap.set(q("[data-soft-note]"), { autoAlpha: 0, y: 10 });
  gsap.set(frags, { xPercent: -50, yPercent: -50, autoAlpha: 0, transformPerspective: 900 });
  gsap.set(zdot, { autoAlpha: 0, scale: 0.4 });
  gsap.set([itBg, light], { scale: 0, autoAlpha: 1 });
  gsap.set(q("[data-it], [data-soft]"), { autoAlpha: 1 });
  gsap.set(q("[data-it-row]"), { autoAlpha: 0, y: 10 });
  gsap.set(q("[data-it-photo]"), { autoAlpha: 0, scale: 1.15 });
  gsap.set(q("[data-stack]"), { autoAlpha: 0, scale: 0.4 });
  gsap.set(q("[data-layer]"), { z: (i: number) => (i - 2.5) * 12 });
  gsap.set(q("[data-map]"), { autoAlpha: 1 });
  gsap.set(q("[data-map-p]"), { autoAlpha: 0, y: 12 });
  gsap.set(q("[data-map-cam]"), { scale: 0.78, autoAlpha: 0 });
  gsap.set(q("[data-map] [data-city]"), { scale: 0, transformOrigin: "50% 50%", transformBox: "fill-box" });
  gsap.set(q("[data-map] [data-radius]"), { scale: 0.2, opacity: 0, transformOrigin: "50% 50%", transformBox: "fill-box" });
  gsap.set(q("[data-map] [data-link]"), { strokeDashoffset: 60 });

  const devices = q("[data-device]");
  const mark = (list: Element[], idx: number) =>
    list.forEach((d) => (Number((d as HTMLElement).dataset.device) === idx ? d.setAttribute("data-on", "") : d.removeAttribute("data-on")));

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut", duration: 0.6 },
    scrollTrigger: {
      trigger: el,
      start: "top top",
      end: () => `+=${window.innerHeight * 8.2}`,
      pin: stage,
      scrub: lite ? true : 1,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        const span = self.end - self.start;
        const at = (t: number) => Math.round(self.start + (shift(t) / END) * span);
        chapterScroll.web = at(T.webStart + 1.9);
        chapterScroll.software = at(T.softStart + 1.9);
        chapterScroll.it = at(T.itStart + 1.3);
        chapterScroll.standorte = at(T.mapAt + 1.4);
        // Hintergrund-Nebel: jedes Kapitel verteilt ihn anders
        setStoryAnchors({ 0: at(0), 1: at(T.webStart + 1.6), 2: at(T.softStart + 1.5), 3: at(T.itStart + 1), 4: at(T.mapAt + 0.4) });
      },
      onUpdate: (self) => {
        const t = unshift(self.progress * END);
        setChapter(t < T.webStart + 0.3 ? "intro" : t < T.softStart + 0.3 ? "web" : t < T.itStart ? "software" : t < T.lightAt + 0.6 ? "it" : "standorte");
        mark(devices, t < 4.4 ? -1 : t < 4.8 ? 0 : t < 5.5 ? 1 : 2);
        document.documentElement.classList.toggle("story-dark", self.isActive && t > T.itStart + 0.3 && t < T.lightAt + 0.55);
      },
      onToggle: (self) => !self.isActive && document.documentElement.classList.remove("story-dark"),
      onLeaveBack: () => setChapter("intro"),
    },
  });

  // 01 Aus dem Nebel: ein Punkt pulsiert, daraus zieht sich die Linie
  tl.to(q("[data-hdot]"), { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(3)" }, 0)
    .to(q("[data-hdot]"), { scale: 1.6, duration: 0.12, yoyo: true, repeat: 1 }, 0.18)
    .to(q("[data-line]"), { scaleX: 1, duration: 0.3, ease: "power3.inOut" }, 0.34)
    .to(q("[data-hdot]"), { autoAlpha: 0, scale: 0.4, duration: 0.1 }, 0.4);

  // 02 Websites: Linie öffnet sich zum kleinen Browser, der beim Aufbau immer näher kommt
  tl.to(screen, { clipPath: "inset(0% 0% 0% 0% round 1.6cqw)", duration: 0.5, ease: "power3.inOut" }, T.webStart)
    .to(q("[data-line]"), { autoAlpha: 0, duration: 0.2 }, T.webStart + 0.1)
    .to(browser, { scale: 0.5, duration: 0.5, ease: "power1.inOut" }, 1.6)
    .to(q("[data-b='nav']"), { autoAlpha: 1, y: 0, duration: 0.3 }, 1.75)
    .to(q("[data-b='title']"), { autoAlpha: 1, y: 0, duration: 0.35 }, 1.9)
    .to(browser, { scale: 0.78, duration: 0.5, ease: "power1.inOut" }, 2.1)
    .to(q("[data-b='text']"), { autoAlpha: 1, y: 0, duration: 0.3 }, 2.2)
    .to(q("[data-b='img']"), { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.inOut" }, 2.25)
    .to(q("[data-b='cta']"), { autoAlpha: 1, y: 0, duration: 0.3 }, 2.4)
    // Kamera fährt in die Website hinein
    .to(browser, { scale: fullScale, duration: 0.7, ease: "power2.in" }, 2.6)
    .to(q("[data-b='tile']"), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.3 }, 2.8)
    // und wieder heraus: Browser rückt nach rechts, Titel erscheint
    .to(browser, { scale: 0.64, x: () => vw(17), duration: 0.8, ease: "power3.inOut" }, 3.5)
    .to(q("[data-web-title]"), { autoAlpha: 1, x: 0, duration: 0.6 }, 3.8)
    // Desktop → Tablet → Smartphone: dieselbe Oberfläche ändert Größe und Layout
    .to(q("[data-chrome]"), { autoAlpha: 0, duration: 0.25 }, 4.5)
    .to(screen, { clipPath: "inset(0% 26.6% 0% 26.6% round 2.6cqw)", duration: 0.5 }, 4.5)
    .to(q("[data-tablet]"), { autoAlpha: 1, duration: 0.25 }, 4.8)
    .to(screen, { clipPath: "inset(0% 35.6% 0% 35.6% round 3.4cqw)", duration: 0.5 }, 5.3)
    .to(q("[data-phone]"), { autoAlpha: 1, duration: 0.25 }, 5.45)
    .to(q("[data-tablet]"), { autoAlpha: 0, duration: 0.25 }, 5.55);

  // 03 Software: Smartphone zerfällt in seine Bausteine, sie schweben auseinander und werden zu Nodes
  const S = T.softStart;
  tl.to(q("[data-web-title]"), { autoAlpha: 0, x: -30, duration: 0.4 }, S)
    .to(frags, { autoAlpha: 1, duration: 0.12, stagger: 0.02 }, S + 0.1)
    .to(browser, { autoAlpha: 0, scale: 0.6, duration: 0.25 }, S + 0.15);
  frags.forEach((f, i) => {
    const s = SCATTER[i];
    tl.to(f, { x: () => vw(s.x), y: () => vh(s.y), z: s.z, rotationX: s.rx, rotationY: s.ry, rotation: s.rz, duration: 0.6, ease: "power2.out" }, S + 0.25 + i * 0.03)
      .to(f, { x: () => nodeX(i), y: () => vh(12) - vw(FRAG_OFFSET[i]), z: 0, rotationX: 0, rotationY: 0, rotation: 0, scale: 0.55, duration: 0.6, ease: "power3.inOut" }, S + 0.95 + i * 0.04)
      .to(f, { autoAlpha: 0, duration: 0.12 }, S + 1.45 + i * 0.04)
      .to(q(`[data-node='${i}']`), { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, S + 1.4 + i * 0.04);
  });
  tl.to(q("[data-soft-l]"), { yPercent: 0, stagger: 0.14, duration: 0.45 }, S + 0.7)
    .to(q("[data-soft-track]"), { scaleX: 1, duration: 0.5, ease: "power2.out" }, S + 1.3)
    .to(q("[data-soft-line]"), { scaleX: 1, duration: 1, ease: "none" }, S + 1.55);
  q("[data-dot]").forEach((d, i) => {
    const at = S + 1.75 + i * 0.13;
    tl.to(d, { autoAlpha: 1, duration: 0.08 }, at)
      .to(d, { x: () => vw(64), duration: 1.3, ease: "none" }, at)
      .to(d, { autoAlpha: 0, duration: 0.08 }, at + 1.22);
  });
  tl.to(q("[data-soft-note]"), { autoAlpha: 1, y: 0, duration: 0.3 }, S + 2.1);

  // Zoom auf einen einzelnen Datenpunkt: 12 px → Vollbild blau
  const Z = S + 3.1;
  tl.to(zdot, { autoAlpha: 1, scale: 1, duration: 0.15 }, Z)
    .to(q("[data-soft-cam]"), { scale: 3.4, autoAlpha: 0, transformOrigin: "58% 62%", duration: 0.8, ease: "power2.in" }, Z + 0.1)
    .to(zdot, { scale: 9, duration: 0.5, ease: "power1.in" }, Z + 0.15)
    .to(zdot, { scale: zCover, duration: 0.55, ease: "power2.in" }, Z + 0.65);

  // 04 IT: die Kamera fliegt durch den Punkt in eine dunkle Welt
  const I = T.itStart;
  tl.to(itBg, { scale: cCover, duration: 0.6, ease: "power2.in" }, I)
    .set(zdot, { autoAlpha: 0 }, I + 0.62)
    .to(q("[data-it-photo]"), { autoAlpha: 1, duration: 0.5 }, I + 0.55)
    .to(q("[data-it-photo]"), { scale: 1, duration: 2.8, ease: "none" }, I + 0.55)
    .to(q("[data-stack]"), { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out" }, I + 0.4)
    .to(q("[data-it-l]"), { yPercent: 0, stagger: 0.14, duration: 0.45 }, I + 0.55)
    .to(q("[data-it-row]"), { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.3 }, I + 0.85)
    // kontrollierte Explosion in die Komponenten und wieder zusammen
    .to(q("[data-layer]"), { z: (i: number) => (i - 2.5) * 82, duration: 0.9, ease: "power2.inOut" }, I + 1.1)
    .to(q("[data-layer]"), { z: (i: number) => (i - 2.5) * 12, duration: 0.8, ease: "power2.inOut" }, I + 2.4);

  // Hell verdrängt Dunkel
  const L = T.lightAt;
  tl.to(q("[data-it-l]"), { yPercent: -110, stagger: 0.06, duration: 0.35 }, L - 0.1)
    .to(q("[data-it-row]"), { autoAlpha: 0, duration: 0.25 }, L - 0.1)
    .to(light, { scale: cCover, duration: 0.7, ease: "power2.in" }, L)
    .set([itBg, q("[data-stack]")[0], q("[data-it-photo]")[0]], { autoAlpha: 0 }, L + 0.72)
    .to(light, { autoAlpha: 0, duration: 0.3 }, L + 0.75);

  // 05 Standorte: Karte zoomt leicht heran, München und Wolnzach pulsieren, Radien ziehen auf
  const M = T.mapAt;
  tl.to(q("[data-map-cam]"), { autoAlpha: 1, duration: 0.3 }, M)
    .to(q("[data-map-cam]"), { scale: 1, duration: 1.8, ease: "power1.out" }, M)
    .to(q("[data-map-l]"), { yPercent: 0, stagger: 0.12, duration: 0.45 }, M + 0.1)
    .to(q("[data-map] [data-city]"), { scale: 1, stagger: 0.25, duration: 0.3, ease: "back.out(2.4)" }, M + 0.35)
    .to(q("[data-map-p]"), { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.35 }, M + 0.7)
    .to(q("[data-map] [data-link]"), { strokeDashoffset: 0, duration: 0.5 }, M + 0.8)
    .to(q("[data-map] [data-radius]"), { scale: 1, opacity: 1, stagger: 0.14, duration: 0.8, ease: "power2.out" }, M + 1.0)
    .to({}, { duration: T.end - (M + 1.9) }, M + 1.9);

  // Alles ab dem Browser nach vorne ziehen (siehe SH)
  tl.getChildren(false, true, true).forEach((c) => {
    const st = c.startTime();
    if (st >= T.webStart - 0.01) c.startTime(st - SH);
  });
}

/** Mobile: Linie → Browser → Website → Smartphone, gekoppelt an eine einfache Sticky-Section. */
export function webMobileScene({ motion }: MotionConditions, el: HTMLElement) {
  if (!motion) return;
  const q = gsap.utils.selector(el);
  gsap.set(q("[data-screen]"), { clipPath: "inset(50% 0% 50% 0% round 2.4cqw)" });
  gsap.set(q("[data-line]"), { autoAlpha: 1, scaleX: 0 });
  gsap.set(q("[data-b]"), { autoAlpha: 0, y: 14 });
  gsap.set(q("[data-phone]"), { autoAlpha: 0, yPercent: 30 });
  gsap.set(q("[data-m-caption]"), { autoAlpha: 0 });
  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut", duration: 0.5 },
    scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6 },
  });
  tl.to(q("[data-line]"), { scaleX: 1, duration: 0.5 }, 0)
    .to(q("[data-screen]"), { clipPath: "inset(0% 0% 0% 0% round 2.4cqw)", duration: 0.5 }, 0.5)
    .to(q("[data-line]"), { autoAlpha: 0, duration: 0.2 }, 0.6)
    .to(q("[data-b]"), { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.3 }, 1.0)
    .to(q("[data-screen]"), { scale: 0.92, autoAlpha: 0.5, duration: 0.5 }, 2.2)
    .to(q("[data-phone]"), { autoAlpha: 1, yPercent: 0, duration: 0.6, ease: "power3.out" }, 2.3)
    .to(q("[data-m-caption]"), { autoAlpha: 1, duration: 0.3 }, 2.7)
    .to({}, { duration: 0.4 });
}

/** Team: Headline weicht zurück, Portrait wächst von klein auf groß, Infos folgen. */
export function teamScene({ motion }: MotionConditions, el: HTMLElement) {
  if (!motion) return;
  const q = gsap.utils.selector(el);
  const persons = q("[data-person]");
  gsap.set(q("[data-portrait]"), { scale: 0.2, borderRadius: 40, autoAlpha: 0 });
  gsap.set(q("[data-portrait-img]"), { scale: 1.3 });
  gsap.set(q("[data-info-row]"), { autoAlpha: 0, y: 24 });
  gsap.set(persons.slice(1), { autoAlpha: 0 });
  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: el,
      start: "top top",
      end: () => `+=${window.innerHeight * (0.8 + persons.length * 0.8)}`,
      pin: q("[data-pin]")[0],
      scrub: 0.8,
      invalidateOnRefresh: true,
      onToggle: (self) => self.isActive && setChapter("team"),
    },
  });
  tl.to(q("[data-team-title]"), { scale: 0.6, yPercent: -160, autoAlpha: 0, duration: 0.8 }, 0.25)
    .to(q("[data-portrait]")[0], { autoAlpha: 1, duration: 0.2 }, 0.55)
    .to(q("[data-portrait]")[0], { scale: 1, borderRadius: 20, duration: 1 }, 0.55)
    .to(q("[data-portrait-img]")[0], { scale: 1, duration: 1 }, 0.55)
    .to(persons[0].querySelectorAll("[data-info-row]"), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.4 }, 1.2);
  // Weitere Personen wechseln weich in die vorherige (falls vorhanden)
  for (let i = 1; i < persons.length; i++) {
    const at = 1.4 + i;
    tl.to(persons[i - 1], { autoAlpha: 0, duration: 0.4 }, at)
      .to(persons[i], { autoAlpha: 1, duration: 0.4 }, at + 0.2)
      .to(persons[i].querySelector("[data-portrait]"), { autoAlpha: 1, scale: 1, borderRadius: 20, duration: 0.6 }, at + 0.2)
      .to(persons[i].querySelector("[data-portrait-img]"), { scale: 1, duration: 0.6 }, at + 0.2)
      .to(persons[i].querySelectorAll("[data-info-row]"), { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.3 }, at + 0.4);
  }
  tl.to({}, { duration: 0.4 });
}

/** Mobile Software: Titel per Maske, Datenpunkt läuft die Kette hinunter und wächst am Ende zum blauen Vollbild. */
export function softMobileScene({ motion }: MotionConditions, el: HTMLElement) {
  if (!motion) return;
  const q = gsap.utils.selector(el);
  const nodes = q("[data-snode]");
  const list = q("ol")[0] as HTMLElement;
  const dot = q("[data-sdot]")[0] as HTMLElement;
  const endY = () => list.offsetTop + list.offsetHeight - 16;
  gsap.set(q("[data-sl]"), { yPercent: 110 });
  gsap.set(nodes, { x: -14, color: "#8b9099" });
  gsap.set(q("[data-sline]"), { scaleY: 0 });
  gsap.set(q("[data-snote]"), { autoAlpha: 0, y: 12 });
  gsap.set(dot, { x: () => list.offsetLeft - 1, y: () => list.offsetTop + 8, xPercent: 0, scale: 1 });
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true } });
  tl.to(q("[data-sl]"), { yPercent: 0, stagger: 0.12, duration: 0.4 }, 0)
    .to(q("[data-sline]"), { scaleY: 1, ease: "none", duration: 2 }, 0.4)
    .to(dot, { y: endY, ease: "none", duration: 2 }, 0.4);
  nodes.forEach((n, i) => tl.to(n, { x: 0, color: "#1c1e22", duration: 0.3 }, 0.4 + (i / Math.max(1, nodes.length - 1)) * 1.8));
  tl.to(q("[data-snote]"), { autoAlpha: 1, y: 0, duration: 0.3 }, 2.3)
    // Zoom in den Datenpunkt: er wächst, bis alles blau ist
    .to(dot, {
      scale: () => {
        const x = list.offsetLeft + 3, y = endY() + 4;
        return (Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) * 2) / 9 * 1.05;
      },
      duration: 0.9,
      ease: "power2.in",
    }, 2.7);
}

/** Mobile IT: aus dem Blau öffnet sich die dunkle Welt, Ebenen fahren auseinander und zusammen, dann wird es hell. */
export function itMobileScene({ motion }: MotionConditions, el: HTMLElement) {
  if (!motion) return;
  const q = gsap.utils.selector(el);
  const plates = q("[data-mlayer]");
  const cover = () => (Math.hypot(window.innerWidth, window.innerHeight) / 20) * 1.05;
  gsap.set(q("[data-il]"), { yPercent: 110 });
  gsap.set(plates, { z: (i: number) => (i - 2.5) * 8, autoAlpha: 0, y: 40 });
  gsap.set(q("[data-inote]"), { autoAlpha: 0, y: 12 });
  gsap.set(q("[data-mhole]"), { scale: 0 });
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true } });
  tl.to(q("[data-mhole]"), { scale: cover, duration: 0.5, ease: "power2.in" }, 0)
    .set(q("[data-mblue]"), { autoAlpha: 0 }, 0.5)
    .to(q("[data-mphoto]"), { autoAlpha: 1, duration: 0.4 }, 0.45)
    .to(q("[data-il]"), { yPercent: 0, stagger: 0.12, duration: 0.4 }, 0.4)
    .to(plates, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.4 }, 0.5)
    .to(plates, { z: (i: number) => (i - 2.5) * 42, duration: 0.8, ease: "power2.inOut" }, 1.0)
    .to(q("[data-inote]"), { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.3 }, 1.2)
    .to(plates, { z: (i: number) => (i - 2.5) * 8, duration: 0.7, ease: "power2.inOut" }, 2.0)
    // statt einer leeren hellen Fläche: die dunkle Bühne löst sich in die Berglandschaft auf
    .to(q("[data-mstage]"), { autoAlpha: 0, duration: 0.55, ease: "power1.in" }, 2.85);
}
