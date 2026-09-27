import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { Locations } from "@/components/sections/Locations";
import { Trust } from "@/components/sections/Trust";
import { ContactSection } from "@/components/sections/ContactSection";
import { itScope, softwareScope, websiteScope } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "IT-Dienstleistungen in München & Wolnzach",
  description:
    "Alle Leistungen von PJE Systems: Websites für Unternehmen, individuelle Softwareentwicklung sowie IT-Service, Hardware, Diagnose, Fernwartung und Datenrettung vor Ort in München, Wolnzach und Umgebung.",
  path: "/leistungen/",
});

const groups = [
  { title: "Websites", href: "/websites/", items: websiteScope },
  { title: "Software", href: "/leistungen/softwareentwicklung/", items: softwareScope },
  { title: "IT-Service", href: "/leistungen/computerhilfe/", items: itScope },
];

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Leistungen", path: "/leistungen/" }]}
        lines={[<>Leistungen<span key="d" className="text-accent">.</span></>]}
        lead="Websites und individuelle Software für Unternehmen, dazu IT-Service vor Ort in München, Wolnzach und Umgebung. Websites und Software laufen überwiegend aus der Ferne und sind an kein Gebiet gebunden."
        facts={[
          { label: "Für Betriebe", value: "Websites, Software" },
          { label: "Für alle", value: "IT-Service vor Ort" },
        ]}
      >
        <Link href="/kontakt/" className="btn btn-primary" data-magnetic>
          <span className="btn-t"><span data-t="Projekt starten">Projekt starten</span></span>
          <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
        </Link>
        <Link href="/preise/" className="btn btn-outline">
          <span className="btn-t"><span data-t="Alle Preise">Alle Preise</span></span>
        </Link>
      </PageHero>
      <ServicesIndex />
      <section className="section-tight" aria-labelledby="umfang-titel" data-bg="mist">
        <div className="wrap">
          <h2 id="umfang-titel" className="t-h2 max-w-[14ch]" data-reveal>
            Was dazugehört<span className="text-accent">.</span>
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {groups.map((g, i) => (
              <div key={g.title} className="border-t-2 border-ink pt-6" data-reveal style={{ ["--i" as string]: i }}>
                <h3 className="t-h3">{g.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="rounded-full bg-white px-3 py-1.5 text-[0.88rem] text-graphite">
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href={g.href} className="link-u mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium">
                  Mehr zu {g.title} <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Locations />
      <Trust />
      <ContactSection />
    </>
  );
}
