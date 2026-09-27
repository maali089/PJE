import Image from "next/image";
import Link from "next/link";
import { Scene } from "@/components/motion/Scene";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

const services = [
  {
    title: "Websites",
    href: "/websites/",
    text: "Onepager, Unternehmenswebsites und Relaunches zum Festpreis. Eigenes Layout, schnell geladen und für Google vorbereitet.",
    price: "Festpreis ab 499 €",
    img: "/assets/praktische-it-arbeit.webp",
    alt: "Umsetzung und Prüfung einer Website",
  },
  {
    title: "Software",
    href: "/leistungen/softwareentwicklung/",
    text: "Webapps, Dashboards, interne Tools, API-Anbindungen und Automatisierungen für einen konkreten Ablauf im Betrieb.",
    price: "50 € pro Stunde, Aufgaben ab 50 €",
    img: "/assets/softwareentwicklung-automatisierung.webp",
    alt: "Arbeit an einer Automatisierung für einen Betrieb",
  },
  {
    title: "IT-Service",
    href: "/leistungen/computerhilfe/",
    text: "Einrichtung, Reparatur, Diagnose, Fernwartung und Datenrettung für Betriebe und Privatkunden in München, Wolnzach und Umgebung.",
    price: "35 € pro Stunde, Festpreise ab 20 €",
    img: "/assets/computerhilfe-windows-einrichtung.webp",
    alt: "Einrichtung eines Rechners beim Kunden",
  },
];

export function ServicesIndex() {
  return (
    <Scene name="services" as="section" className="section" aria-labelledby="leistungen-titel" data-bg="paper">
      <div className="wrap">
        <h2 id="leistungen-titel" className="t-h2 max-w-[14ch]" data-reveal>
          Drei Disziplinen. <span className="text-slate">Kurze Wege.</span>
        </h2>

        <div className="relative mt-16 md:mt-20">
          <div
            data-preview
            aria-hidden
            data-active="0"
            className="group/prev pointer-events-none absolute left-0 top-0 z-10 hidden aspect-[4/3] w-[300px] overflow-hidden rounded-[var(--radius-panel)] opacity-0 shadow-[0_30px_60px_-30px_rgb(11_12_14/0.5)] transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] [scale:0.85] lg:block"
          >
            {services.map((s, i) => (
              <Image
                key={s.img}
                src={s.img}
                alt=""
                fill
                sizes="300px"
                className={`object-cover transition-opacity duration-500 ${
                  ["group-data-[active='0']/prev:opacity-100", "group-data-[active='1']/prev:opacity-100", "group-data-[active='2']/prev:opacity-100"][i]
                } opacity-0`}
              />
            ))}
          </div>

          <ul data-list className="border-t border-line">
          {services.map((s, i) => (
            <li key={s.title} data-index={i} className="group border-b border-line" data-reveal style={{ ["--i" as string]: i }}>
              <Link
                href={s.href}
                className="grid gap-5 py-10 md:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-10"
              >
                <span className="text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] transition-[translate,color] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-accent">
                  {s.title}
                </span>
                <span className="block">
                  <span className="t-body block max-w-[46ch]">{s.text}</span>
                  <span className="mt-3 block font-mono text-[0.78rem] uppercase tracking-[0.06em] text-ink">{s.price}</span>
                </span>
                <span className="hidden h-14 w-14 place-items-center rounded-full border border-line transition-[background-color,border-color,color,rotate] duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white lg:grid">
                  <ArrowUpRight size={22} aria-hidden />
                </span>
                <span className="relative block aspect-[16/10] overflow-hidden rounded-[var(--radius-panel)] lg:hidden">
                  <Image src={s.img} alt={s.alt} fill sizes="100vw" className="object-cover" />
                </span>
              </Link>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </Scene>
  );
}
