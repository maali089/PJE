import type { Metadata } from "next";
import { MountainStage } from "@/components/scene/MountainStage";
import { DroneScene } from "@/components/scene/DroneScene";
import { FlyHeadline } from "@/components/story/FlyHeadline";
import { ProjectShowcase } from "@/components/scene/ProjectShowcase";
import { StoryStage } from "@/components/story/StoryStage";
import { StoryMobile } from "@/components/story/StoryMobile";
import { TeamReveal } from "@/components/story/Chapters";
import { Facts, IntroCurtain, ServicesPan } from "@/components/story/Finale";
import { ChapterNav } from "@/components/story/ChapterNav";
import { Packages } from "@/components/sections/Packages";
import { Trust } from "@/components/sections/Trust";
import { Faq } from "@/components/ui/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { faqHome, site } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Websites, Software & IT in München und Wolnzach | PJE Systems" },
  description:
    "Websites zum Festpreis ab 499 €, individuelle Softwareentwicklung und IT-Service vor Ort in München, Wolnzach und rund 50 km Umgebung. Persönliche Ansprechpartner, kein Abo.",
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    title: "Websites, Software & IT in München und Wolnzach | PJE Systems",
    description: "Websites zum Festpreis ab 499 €, individuelle Software und IT-Service vor Ort in München, Wolnzach und Umgebung.",
    url: `${site.url}/`,
  },
};

/*
 * Startseite als ein durchgehender Drohnenflug (DroneScene, Route in lib/drone/path.ts):
 * Intro-Sequenz → Gewitter am Berg (Kamerafahrt, Text hinter dem Grat, Nebelwand) → Websites → Software → IT → Standorte (Desktop: eine Bühne, Mobile: eigene ruhigere Fassung)
 * → Text hinter dem Grat („Websites, die auffallen.“) → Referenzen (Wolkenbank → Browserfenster → Fahrt durch die echte Website → Nebel)
 * → Kennzahlen → Leistungen (horizontal) → Pakete → Team → Vertrauen → Fragen → Kontakt
 */
export default function Home() {
  return (
    <>
      <DroneScene />
      <IntroCurtain />
      <div data-drone="hero">
        <MountainStage />
      </div>
      <div data-drone="story">
        <StoryStage />
        <StoryMobile />
      </div>
      <div data-drone="fly">
        <FlyHeadline />
      </div>
      <div data-drone="project">
        <ProjectShowcase />
      </div>
      <div data-drone="facts">
        <Facts />
      </div>
      <div data-drone="services">
        <ServicesPan />
      </div>
      <div data-drone="packages">
        <Packages />
      </div>
      <div data-drone="team">
        <TeamReveal />
      </div>
      <div data-drone="trust">
        <Trust />
      </div>
      <div data-drone="faq">
        <Faq items={faqHome} />
      </div>
      <div data-drone="contact" data-chapter="kontakt" id="kontakt-cta" data-scene-stage="6">
        <ContactSection
          title={
            <>
              Bereit für Ihr nächstes Projekt<span className="text-accent">?</span>
            </>
          }
        />
      </div>
      <ChapterNav />
    </>
  );
}
