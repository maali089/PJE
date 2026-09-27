import Image from "next/image";
import Link from "next/link";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { SoftwareSection } from "@/components/sections/SoftwareSection";
import { Faq } from "@/components/ui/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { PriceList } from "@/components/ui/PriceList";
import { faqSoftware, getGroup, softwareProcess, softwareScope, waLink } from "@/lib/content";
import { pageMeta, serviceJsonLd } from "@/lib/seo";

const description =
  "Softwareentwicklung und Automatisierung aus München und Wolnzach: Python-Skripte, Excel-Automatisierung, API-Anbindungen, interne Tools, Webapps und Dashboards. Wartbar und mit Quellcode zur Übergabe.";

export const metadata = pageMeta({ title: "Softwareentwicklung & Automatisierung", description, path: "/leistungen/softwareentwicklung/" });

export default function SoftwarePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Leistungen", path: "/leistungen/" },
          { name: "Softwareentwicklung", path: "/leistungen/softwareentwicklung/" },
        ]}
        lines={[
          "Software und",
          <>
            Automatisierung<span className="text-accent">.</span>
          </>,
        ]}
        lead="Kleine, wartbare Lösungen, die eine konkrete Arbeit im Betrieb abnehmen, inklusive Quellcode zur Übergabe. Für Unternehmen in München, Wolnzach und überall sonst."
        facts={[
          { label: "Arbeitszeit", value: "50 € pro Stunde" },
          { label: "Einstieg", value: "ab 50 € je Aufgabe" },
        ]}
        aside={
          <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)]">
            <Image
              src="/assets/softwareentwicklung-automatisierung.webp"
              alt="Arbeit an einer Automatisierung für einen Betrieb"
              fill
              preload
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        }
      >
        <Link href="/kontakt/?thema=software#anfrage" className="btn btn-primary" data-magnetic>
          <span className="btn-t"><span data-t="Projekt starten">Projekt starten</span></span>
          <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
        </Link>
        <a target="_blank" href={waLink("Hallo PJE, ich habe eine Frage zu Software oder Automatisierung:")} rel="noopener" className="btn btn-outline">
          <WhatsappLogo size={18} aria-hidden /> <span className="btn-t"><span data-t="WhatsApp schreiben">WhatsApp schreiben</span></span>
        </a>
      </PageHero>

      <SoftwareSection />

      <section className="section" aria-labelledby="vorgehen-titel" data-bg="mist">
        <div className="wrap">
          <h2 id="vorgehen-titel" className="t-h2 max-w-[14ch]" data-reveal>
            Vorgehen<span className="text-accent">.</span>
          </h2>
          <p className="t-lead mt-6 max-w-[56ch]" data-reveal>
            Für umfangreichere Projekte gibt es ein schriftliches Angebot mit Festpreis oder Aufwandsrahmen, aufgeteilt in Schritte, die einzeln nutzbar sind.
          </p>
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {softwareProcess.map((s, i) => (
              <li
                key={s.title}
                className="rounded-[var(--radius-panel)] bg-white p-7 md:p-9"
                data-reveal
                data-tilt="2"
                style={{ ["--i" as string]: i }}
              >
                <span className="font-mono text-[0.78rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-10">{s.title}</h3>
                <p className="t-body mt-3">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div data-reveal>
              <h3 className="t-h3">Leistungen</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {softwareScope.map((s) => (
                  <li key={s} className="rounded-full bg-white px-3 py-1.5 text-[0.88rem] text-graphite">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <PriceList group={getGroup("software")} />
            </div>
          </div>
        </div>
      </section>

      <Faq items={faqSoftware} title="Fragen zur Software" />
      <ContactSection />
      <JsonLd data={serviceJsonLd("Softwareentwicklung und Automatisierung", description, "/leistungen/softwareentwicklung/")} />
    </>
  );
}
