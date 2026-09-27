import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { ItTeaser } from "@/components/sections/ItTeaser";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Locations } from "@/components/sections/Locations";
import { Faq } from "@/components/ui/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { PriceList } from "@/components/ui/PriceList";
import { contact, faqIt, getGroup, itProcess, itScope } from "@/lib/content";
import { pageMeta, serviceJsonLd } from "@/lib/seo";

const description =
  "Computerhilfe und IT-Service vor Ort in München, Wolnzach und rund 50 km Umgebung: langsamer Rechner, Windows-Fehler, Viren, Drucker, WLAN, Hardware und Datenrettung zu festen Preisen.";

export const metadata = pageMeta({
  title: "Computerhilfe & IT-Service vor Ort in München und Wolnzach",
  description,
  path: "/leistungen/computerhilfe/",
});

const groups = ["computerhilfe", "hardware", "diagnose", "fernwartung", "daten", "beratung"];

export default function ComputerhilfePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Leistungen", path: "/leistungen/" },
          { name: "Computerhilfe", path: "/leistungen/computerhilfe/" },
        ]}
        lines={[
          "Computerhilfe",
          <>
            vor Ort<span className="text-accent">.</span>
          </>,
        ]}
        lead="Einrichtung, Reparatur und Wartung für Privatkunden und Betriebe in München, Wolnzach und Umgebung. Häufige Aufgaben zum Festpreis, wo möglich per Fernwartung."
        facts={[
          { label: "Arbeitszeit", value: "35 € pro Stunde" },
          { label: "Einsatzgebiet", value: "rund 50 km um München und Wolnzach" },
        ]}
        aside={
          <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)]">
            <Image
              src="/assets/computerhilfe-windows-einrichtung.webp"
              alt="Einrichtung eines Rechners beim Kunden"
              fill
              preload
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        }
      >
        <Link href="/kontakt/?thema=it#anfrage" className="btn btn-primary" data-magnetic>
          <span className="btn-t"><span data-t="IT-Hilfe anfragen">IT-Hilfe anfragen</span></span>
          <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
        </Link>
        <a href={contact.phoneHref} className="btn btn-outline">
          <Phone size={17} aria-hidden /> {contact.phoneDisplay}
        </a>
      </PageHero>

      <ItTeaser />

      <ProcessTimeline
        id="termin"
        steps={itProcess}
        title={
          <>
            So läuft ein Termin<span className="text-accent">.</span>
          </>
        }
        lead="Kein Ticketsystem, keine Warteschleife. Bei jedem Termin kommt dieselbe Person."
      />

      <section className="section" aria-labelledby="it-preise-titel" data-bg="paper">
        <div className="wrap">
          <h2 id="it-preise-titel" className="t-h2 max-w-[14ch]" data-reveal>
            Alle Preise der Computerhilfe<span className="text-accent">.</span>
          </h2>
          <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-2">
            {groups.map((g) => (
              <div key={g} data-reveal>
                <PriceList group={getGroup(g)} />
              </div>
            ))}
          </div>
          <div className="mt-16" data-reveal>
            <h3 className="t-h3">Leistungen im Überblick</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {itScope.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1.5 text-[0.88rem] text-graphite">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Locations />
      <Faq items={faqIt} title="Fragen zur Computerhilfe" />
      <ContactSection />
      <JsonLd data={serviceJsonLd("Computerhilfe und IT-Service vor Ort", description, "/leistungen/computerhilfe/")} />
    </>
  );
}
