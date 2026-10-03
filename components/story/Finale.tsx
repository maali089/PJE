import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Scene } from "@/components/motion/Scene";
import { CountUp } from "@/components/motion/CountUp";

/* ---------------------------------------------------------------- */
/* Intro-Sequenz (nur sichtbar, wenn der Kopf-Script .intro-play setzt) */
/* ---------------------------------------------------------------- */

function IntroArt() {
  return (
    <div className="intro-art">
      <div className="intro-row">
        <span className="intro-word" data-w="pje">
          <span>PJE</span>
        </span>
        <span className="intro-dot" />
        <span className="intro-word" data-w="sys">
          <span>SYSTEMS</span>
        </span>
      </div>
      <div className="intro-sub">
        <span>Websites</span>
        <span>Software</span>
        <span>IT</span>
      </div>
    </div>
  );
}

export function IntroCurtain() {
  return (
    <div className="intro" aria-hidden>
      <div className="intro-half" data-half="top">
        <IntroArt />
      </div>
      <div className="intro-half" data-half="bottom">
        <IntroArt />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* DIGITAL: die Kamera fliegt durch den Buchstaben in das Bild dahinter */
/* ---------------------------------------------------------------- */

const facts = [
  { pre: "ab ", to: 499, post: " €", label: "Website zum Festpreis, einmalig und ohne Abo" },
  { pre: "", to: 50, post: " €/Std.", label: "Softwareentwicklung, Aufgaben ab 50 €" },
  { pre: "", to: 35, post: " €/Std.", label: "IT-Service, viele Arbeiten zum Festpreis" },
  { pre: "", to: 50, post: " km", label: "Vor-Ort-Umkreis um München und Wolnzach" },
];

export function Facts() {
  return (
    <section data-scene-stage="5" aria-label="PJE Systems in Zahlen" className="section">
      <div className="wrap">
        <p className="t-lead mx-auto max-w-[52ch] text-center" data-reveal>
          PJE Systems ist der IT-Betrieb von Paul Höflich. Anfragen und Fragen beantwortet Blagoja Ljubeski, umgesetzt wird von Paul selbst.
        </p>
        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 min-[400px]:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
          {facts.map((f, i) => (
            <div key={f.label} className="flex flex-col-reverse border-t border-line pt-6" data-reveal style={{ ["--i" as string]: i }}>
              <dt className="t-body mt-4 max-w-[24ch] text-[0.95rem] [hyphens:auto] [overflow-wrap:anywhere]">{f.label}</dt>
              <dd className="text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-none tracking-[-0.05em]">
                {f.pre}
                <CountUp to={f.to} />
                <span className="text-[0.5em] tracking-[-0.02em] text-slate">{f.post}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Leistungen: vertikaler Scroll fährt horizontal durch fünf Bühnen    */
/* ---------------------------------------------------------------- */

const services = [
  {
    word: "Websites",
    text: "Eigenes Layout statt Vorlage, schnell geladen und für Google vorbereitet. Einmalig bezahlt, kein Abo.",
    price: "ab 499 €",
    href: "/websites/",
  },
  {
    word: "Software",
    text: "Webapps, Dashboards und interne Tools, die zu Ihrem Ablauf passen statt umgekehrt.",
    price: "50 €/Std.",
    href: "/leistungen/softwareentwicklung/",
  },
  {
    word: "IT-Service",
    text: "PC, Laptop, WLAN, Drucker und Datenrettung. Vor Ort in München, Wolnzach und rund 50 km Umgebung.",
    price: "35 €/Std.",
    href: "/leistungen/computerhilfe/",
  },
  {
    word: "Automation",
    text: "Excel-Automatisierung, Python-Skripte und API-Anbindungen statt wiederkehrender Handarbeit.",
    price: "ab 50 €",
    href: "/leistungen/softwareentwicklung/",
  },
  {
    word: "Support",
    text: "Fernwartung, Fehlerdiagnose und schnelle Hilfe per WhatsApp, Telefon oder E-Mail.",
    price: "Fernwartung 30 €/Std.",
    href: "/kontakt/",
  },
];

function ServiceCopy({ s, i }: { s: (typeof services)[number]; i: number }) {
  return (
    <>
      <p className="font-mono text-[0.78rem] text-accent">{String(i + 1).padStart(2, "0")} / 05</p>
      <h3 data-svc-word className="mt-3 text-[clamp(3rem,8.6vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
        {s.word}
        <span className="text-accent">.</span>
      </h3>
      <p className="t-lead mt-6 max-w-[34ch]">{s.text}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <span className="t-num text-2xl font-semibold tracking-[-0.03em]">{s.price}</span>
        <Link href={s.href} className="link-u inline-flex items-center gap-2 font-medium">
          Mehr erfahren <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </>
  );
}

export function ServicesPan() {
  return (
    <div id="leistungen-uebersicht">
      <Scene name="svcPan" as="section" aria-labelledby="svc-titel" className="relative hidden overflow-hidden lg:block lg:motion-reduce:hidden">
        <div data-pin className="flex h-[100svh] items-center">
          <div data-track className="flex h-full items-center gap-[6vw] pl-[max(var(--gutter),calc((100vw-1360px)/2+var(--gutter)))] pr-[12vw]">
            <div className="w-[30vw] shrink-0">
              <p className="t-label">Leistungen</p>
              <h2 id="svc-titel" className="t-h2 mt-4">
                Alles aus einer Hand<span className="text-accent">.</span>
              </h2>
              <p className="t-lead mt-6 max-w-[32ch]">Websites, Software und IT-Service mit festen Preisen und einem persönlichen Ansprechpartner.</p>
              <div className="mt-10 h-px w-full bg-line">
                <span data-pan-bar className="block h-px w-full origin-left scale-x-0 bg-accent" />
              </div>
            </div>
            {services.map((s, i) => (
              <article key={s.word} data-svc className="flex h-[74svh] w-[58vw] shrink-0 flex-col justify-center border-l border-line pl-[4vw]">
                <ServiceCopy s={s} i={i} />
              </article>
            ))}
          </div>
        </div>
      </Scene>
      <section aria-labelledby="svc-titel-m" className="section lg:hidden lg:motion-reduce:block">
        <div className="wrap">
          <p className="t-label">Leistungen</p>
          <h2 id="svc-titel-m" className="t-h2 mt-4">
            Alles aus einer Hand<span className="text-accent">.</span>
          </h2>
          <div className="mt-12 flex flex-col gap-14">
            {services.map((s, i) => (
              <article key={s.word} className="border-t border-line pt-8" data-reveal>
                <ServiceCopy s={s} i={i} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
