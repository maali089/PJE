import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { Person } from "@/components/sections/Person";
import { Trust } from "@/components/sections/Trust";
import { Locations } from "@/components/sections/Locations";
import { ContactSection } from "@/components/sections/ContactSection";
import { WordScrub } from "@/components/motion/WordScrub";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Über uns: Paul Höflich und PJE Systems",
  description:
    "PJE Systems ist der IT-Betrieb von Paul Höflich: Websites, Software und IT-Service für Betriebe und Privatkunden in München, Wolnzach und Umgebung. Persönliche Ansprechpartner vom ersten Gespräch bis zur Übergabe.",
  path: "/ueber-uns/",
});

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Über uns", path: "/ueber-uns/" }]}
        lines={[
          "Persönlich.",
          <>
            Von Anfang an<span className="text-accent">.</span>
          </>,
        ]}
        lead="PJE Systems ist der IT-Betrieb von Paul Höflich. Websites und Software für Betriebe, dazu IT-Service vor Ort in München, Wolnzach und Umgebung."
      >
        <Link href="/kontakt/" className="btn btn-primary" data-magnetic>
          <span className="btn-t"><span data-t="Projekt starten">Projekt starten</span></span>
          <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
        </Link>
        <Link href="/leistungen/" className="btn btn-outline">
          <span className="btn-t"><span data-t="Leistungen ansehen">Leistungen ansehen</span></span>
        </Link>
      </PageHero>

      <Person />

      <section className="section" aria-label="Arbeitsweise" data-bg="mist">
        <div className="wrap">
          <WordScrub
            className="max-w-[28ch] text-[clamp(1.8rem,4vw,3.6rem)] font-semibold leading-[1.1] tracking-[-0.04em]"
            text="Anfragen und Fragen landen direkt bei Blagoja Ljubeski, umgesetzt wird von Paul Höflich selbst. *Kein* Ticketsystem, *keine* Warteschleife, *keine* unnötigen Abos. Dafür feste Preise, eigene Zugänge und eine Dokumentation, mit der auch andere weiterarbeiten können."
          />
        </div>
      </section>

      <Trust />
      <Locations showTravel={false} />
      <ContactSection />
    </>
  );
}
