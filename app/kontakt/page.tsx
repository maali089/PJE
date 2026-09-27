import { ContactSection } from "@/components/sections/ContactSection";
import { Locations } from "@/components/sections/Locations";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Kontakt",
  description:
    "Kontakt zu PJE Systems, Paul Höflich: per Formular, WhatsApp, E-Mail oder Telefon. Websites, Software und IT-Service in München, Wolnzach und Umgebung. Antwort am selben oder nächsten Werktag.",
  path: "/kontakt/",
});

export default function KontaktPage() {
  return (
    <>
      <div className="wrap pt-[calc(var(--nav-h)+40px)]">
        <Breadcrumbs items={[{ name: "Kontakt", path: "/kontakt/" }]} />
      </div>
      <ContactSection headingLevel="h1" />
      <Locations />
    </>
  );
}
