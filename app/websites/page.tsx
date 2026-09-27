import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { Showcase } from "@/components/sections/Showcase";
import { Situations } from "@/components/sections/Situations";
import { Packages } from "@/components/sections/Packages";
import { WebsiteQuality } from "@/components/sections/WebsiteQuality";
import { IdeaToLive } from "@/components/sections/IdeaToLive";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Faq } from "@/components/ui/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqWebsites, websiteDuration, websiteProcess } from "@/lib/content";
import { pageMeta, serviceJsonLd } from "@/lib/seo";

const description =
  "Website erstellen lassen in München und Wolnzach: Onepager ab 499 €, Unternehmenswebsite ab 799 €, Relaunch ab 499 €. Eigenes Layout, feste Preise, für Unternehmen an jedem Standort.";

export const metadata = pageMeta({ title: "Website erstellen lassen in München & Wolnzach", description, path: "/websites/" });

export default function WebsitesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Websites", path: "/websites/" }]}
        lines={["Websites für", <>Unternehmen<span key="d" className="text-accent">.</span></>]}
        lead="Onepager, Unternehmenswebsite oder Relaunch zum Festpreis, mit eigenem Layout und der technischen Grundlage dafür, dass die Seite gefunden wird. Aus München und Wolnzach, für Betriebe an jedem Standort."
        facts={[
          { label: "Festpreis", value: "499 € bis 1.499 €" },
          { label: "Dauer", value: "ein bis vier Wochen" },
          { label: "Standort", value: "unabhängig" },
        ]}
        aside={
          <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)]">
            <Image
              src="/assets/praktische-it-arbeit.webp"
              alt="Umsetzung und Prüfung der Website"
              fill
              preload
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        }
      >
        <Link href="/kontakt/?thema=website#anfrage" className="btn btn-primary" data-magnetic>
          <span className="btn-t"><span data-t="Projekt starten">Projekt starten</span></span>
          <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
        </Link>
        <a href="#pakete" className="btn btn-outline">
          <span className="btn-t"><span data-t="Pakete und Preise">Pakete und Preise</span></span>
        </a>
      </PageHero>
      <Showcase />
      <Situations />
      <Packages />
      <WebsiteQuality />
      <IdeaToLive />
      <ProcessTimeline
        id="ablauf"
        steps={websiteProcess}
        title={
          <>
            So entsteht Ihr Projekt<span className="text-accent">.</span>
          </>
        }
        lead={websiteDuration}
      />
      <Faq items={faqWebsites} title="Fragen zur Website" />
      <ContactSection />
      <JsonLd data={serviceJsonLd("Website erstellen lassen", description, "/websites/")} />
    </>
  );
}
