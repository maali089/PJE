import type { Metadata } from "next";
import { StoryStage } from "@/components/story/StoryStage";
import { StoryMobile } from "@/components/story/StoryMobile";
import { TeamReveal } from "@/components/story/Chapters";
import { DigitalFly, FinalSequence, IntroCurtain, ServicesPan, Silence } from "@/components/story/Finale";
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
 * Startseite als durchgehende Scroll-Story:
 * Intro-Sequenz → Hero → Websites → Software → IT → Standorte (Desktop: eine Bühne, Mobile: eigene ruhigere Fassung)
 * → Flug durch DIGITAL → Leistungen (horizontal) → Pakete → Team → Vertrauen → Fragen → Moment der Ruhe → Finale → Kontakt
 */
export default function Home() {
  return (
    <>
      <IntroCurtain />
      <StoryStage />
      <StoryMobile />
      <DigitalFly />
      <ServicesPan />
      <Packages />
      <TeamReveal />
      <Trust />
      <Faq items={faqHome} />
      <Silence />
      <FinalSequence />
      <ContactSection />
      <ChapterNav />
    </>
  );
}
