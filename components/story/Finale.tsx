import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { Scene } from "@/components/motion/Scene";
import { CountUp } from "@/components/motion/CountUp";
import { contact, waLink } from "@/lib/content";

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

export function DigitalFly() {
  return (
    <section data-scene-stage="5" aria-labelledby="digital-titel">
      <Scene name="digital" as="div" className="relative h-[210svh] motion-reduce:h-auto">
        <div data-digital-stage className="sticky top-0 h-[100svh] overflow-hidden motion-reduce:static motion-reduce:h-[70svh]">
          <h2 id="digital-titel" className="sr-only">
            Digitale Lösungen von PJE Systems
          </h2>
          <svg aria-hidden className="absolute h-0 w-0">
            <defs>
              <clipPath id="digital-clip" clipPathUnits="userSpaceOnUse">
                <g data-clip-g>
                  <text data-clip-text x="50%" y="50%" textAnchor="middle" fontWeight={600} letterSpacing="-0.04em">
                    DIGITAL
                  </text>
                </g>
              </clipPath>
            </defs>
          </svg>
          <div data-digital-img className="absolute inset-0 [clip-path:url(#digital-clip)]">
            <Image src="/assets/it-beratung-unternehmen.webp" alt="" fill sizes="100vw" className="object-cover" data-digital-photo />
            <span className="absolute inset-0 bg-ink/15" />
          </div>
          <p data-digital-cap className="wrap absolute inset-x-0 top-[calc(var(--nav-h)+4vh)] flex justify-between font-mono text-[0.75rem] uppercase tracking-[0.24em] text-slate">
            <span>Digital Solutions</span>
            <span className="text-accent">by PJE Systems</span>
          </p>
          <p data-digital-hint className="wrap absolute inset-x-0 bottom-[8vh] text-center font-mono text-[0.72rem] uppercase tracking-[0.2em] text-slate">
            Websites · Software · IT
          </p>
        </div>
      </Scene>
      <div className="section wrap">
        <p className="t-lead mx-auto max-w-[52ch] text-center" data-reveal>
          PJE Systems ist der IT-Betrieb von Paul Höflich. Anfragen und Fragen beantwortet Blagoja Ljubeski, umgesetzt wird von Paul selbst.
        </p>
        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label} className="flex flex-col-reverse border-t border-line pt-6" data-reveal style={{ ["--i" as string]: i }}>
              <dt className="t-body mt-4 max-w-[24ch] text-[0.95rem]">{f.label}</dt>
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
    img: "/assets/arbeitsplatz-pje-systems-wolnzach.webp",
    alt: "Arbeitsplatz von PJE Systems in Wolnzach",
  },
  {
    word: "Software",
    text: "Webapps, Dashboards und interne Tools, die zu Ihrem Ablauf passen statt umgekehrt.",
    price: "50 €/Std.",
    href: "/leistungen/softwareentwicklung/",
    img: "/assets/softwareentwicklung-automatisierung.webp",
    alt: "Softwareentwicklung und Automatisierung am Bildschirm",
  },
  {
    word: "IT-Service",
    text: "PC, Laptop, WLAN, Drucker und Datenrettung. Vor Ort in München, Wolnzach und rund 50 km Umgebung.",
    price: "35 €/Std.",
    href: "/leistungen/computerhilfe/",
    img: "/assets/pc-reparatur-hardware.webp",
    alt: "Hardware-Reparatur an einem geöffneten PC",
  },
  {
    word: "Automation",
    text: "Excel-Automatisierung, Python-Skripte und API-Anbindungen statt wiederkehrender Handarbeit.",
    price: "ab 50 €",
    href: "/leistungen/softwareentwicklung/",
    img: "/assets/it-beratung-unternehmen.webp",
    alt: "IT-Beratung für ein Unternehmen",
  },
  {
    word: "Support",
    text: "Fernwartung, Fehlerdiagnose und schnelle Hilfe per WhatsApp, Telefon oder E-Mail.",
    price: "Fernwartung 30 €/Std.",
    href: "/kontakt/",
    img: "/assets/it-hilfe-anfrage-telefon.webp",
    alt: "IT-Hilfe per Telefon",
  },
];

function ServiceCopy({ s, i }: { s: (typeof services)[number]; i: number }) {
  return (
    <>
      <p className="font-mono text-[0.78rem] text-accent">{String(i + 1).padStart(2, "0")} / 05</p>
      <h3 data-svc-word className="mt-3 text-[clamp(3rem,7.4vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
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
              <article key={s.word} data-svc className="grid h-[74svh] w-[80vw] shrink-0 grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-center gap-[4vw]">
                <div>
                  <ServiceCopy s={s} i={i} />
                </div>
                <div data-svc-media className="relative h-full overflow-hidden rounded-[var(--radius-panel)] bg-fog">
                  <Image data-svc-img src={s.img} alt={s.alt} fill sizes="45vw" className="object-cover" />
                </div>
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
          <div className="mt-14 flex flex-col gap-20">
            {services.map((s, i) => (
              <article key={s.word}>
                <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] bg-fog" data-clip-reveal>
                  <Image src={s.img} alt={s.alt} fill sizes="100vw" className="object-cover" />
                </div>
                <div className="mt-8">
                  <ServiceCopy s={s} i={i} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Moment der Ruhe                                                     */
/* ---------------------------------------------------------------- */

export function Silence() {
  return (
    <Scene name="silence" as="section" aria-labelledby="ruhe-titel" className="relative flex min-h-[130svh] items-center">
      <div className="wrap w-full py-40">
        <h2 id="ruhe-titel" className="t-mega mx-auto max-w-[14ch] text-center !text-[clamp(2.8rem,8vw,8rem)] !leading-[0.95]">
          {["Technologie", "muss nicht", "kompliziert sein."].map((l, i) => (
            <span key={l} className="line-mask">
              <span data-quiet className={`block ${i === 2 ? "text-accent" : ""}`}>
                {l}
              </span>
            </span>
          ))}
        </h2>
      </div>
    </Scene>
  );
}

/* ---------------------------------------------------------------- */
/* Finale: WEBSITES · SOFTWARE · IT laufen zu PJE SYSTEMS zusammen     */
/* ---------------------------------------------------------------- */

export function FinalSequence() {
  return (
    <div data-chapter="kontakt" id="kontakt-cta" data-scene-stage="6">
      <Scene name="final" as="section" aria-labelledby="final-titel" className="relative h-[200svh] motion-reduce:h-auto">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
            {["Websites", "Software", "IT"].map((w, i) => (
              <span
                key={w}
                data-fw={i}
                className={`absolute left-1/2 top-1/2 whitespace-nowrap text-[clamp(2.6rem,7vw,7.5rem)] font-semibold tracking-[-0.06em] ${i === 2 ? "text-accent" : "text-ink"}`}
              >
                {w}
                <span className="text-accent">.</span>
              </span>
            ))}
          </div>
          <div className="wrap relative text-center">
            <h2 id="final-titel" data-final-title className="t-mega !text-[clamp(3.4rem,11vw,11rem)]">
              PJE Systems<span className="text-accent">.</span>
            </h2>
            <p className="mt-8 text-[clamp(1.4rem,2.6vw,2.4rem)] font-semibold tracking-[-0.04em]">
              <span className="line-mask inline-block">
                <span data-final-l className="block">
                  Ihr Projekt.
                </span>
              </span>{" "}
              <span className="line-mask inline-block">
                <span data-final-l className="block text-slate">
                  Unsere Technik.
                </span>
              </span>
            </p>
            <div data-final-cta className="mt-10">
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/kontakt/" className="btn btn-primary" data-magnetic>
                  <span className="btn-t"><span data-t="Projekt starten">Projekt starten</span></span> <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
                </Link>
                <a target="_blank" rel="noopener" href={waLink("Hallo PJE, ich habe eine Anfrage:")} className="btn btn-outline" data-magnetic>
                  <WhatsappLogo size={18} aria-hidden /> <span className="btn-t"><span data-t="WhatsApp">WhatsApp</span></span>
                </a>
                <a href={contact.phoneHref} className="btn btn-outline" data-magnetic>
                  <Phone size={17} aria-hidden /> <span className="btn-t"><span data-t="Anrufen">Anrufen</span></span>
                </a>
              </div>
              <p className="t-body mx-auto mt-6 max-w-[44ch]">Ein paar Sätze zu Ihrem Vorhaben genügen. Antwort {contact.responseTime}.</p>
            </div>
          </div>
        </div>
      </Scene>
    </div>
  );
}
