import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { PriceList } from "@/components/ui/PriceList";
import { ContactSection } from "@/components/sections/ContactSection";
import { packages, priceFootnote, priceGroups } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Preise für Websites, Software & IT-Service",
  description:
    "Was kostet eine Website? Festpreise von 499 € bis 1.499 €, dazu die Preise für Softwareentwicklung, Computerhilfe, Hardware, Diagnose und Fernwartung, inklusive Anfahrt.",
  path: "/preise/",
});

export default function PreisePage() {
  const [web, ...rest] = priceGroups;
  const footnote = priceFootnote.replace(" Angaben zur Umsatzsteuer stehen im Impressum.", "");
  return (
    <>
      <PageHero
        crumbs={[{ name: "Preise", path: "/preise/" }]}
        lines={[
          <>
            Preise<span className="text-accent">.</span>
          </>,
        ]}
        lead="Website-Pakete zum Einmalpreis, viele Arbeiten der Computerhilfe zum Festpreis. Wo der Aufwand vorher nicht feststeht, gilt ein Stundensatz oder ein Startpreis (ab)."
        facts={[
          { label: "Websites", value: "Einmalpreis" },
          { label: "Umsatzsteuer", value: "keine, § 19 UStG" },
        ]}
      />

      <nav aria-label="Preisbereiche" className="sticky top-[60px] z-30 border-y border-line bg-white/85 backdrop-blur-xl">
        <ul className="wrap flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {priceGroups.map((g) => (
            <li key={g.id}>
              <a
                href={`#preise-${g.id}`}
                className="flex min-h-11 items-center whitespace-nowrap rounded-full border border-line px-4 text-[0.88rem] transition-colors hover:border-accent hover:text-accent"
              >
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="section" aria-label="Preislisten">
        <div className="wrap">
          <div id={`preise-${web.id}`} className="scroll-mt-40">
            <h2 className="t-h2">Websites</h2>
            <p className="t-lead mt-4 max-w-[60ch]">
              {web.lead}
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {packages.map((p) => (
                <div key={p.id} className={`rounded-[var(--radius-panel)] p-7 ${p.featured ? "bg-ink text-white" : "border border-line bg-white"}`} data-reveal>
                  <p className="font-medium">{p.name}</p>
                  <p className="t-num mt-6 text-[2.6rem] font-semibold leading-none tracking-[-0.05em]">{p.price}</p>
                  <p className={`mt-3 text-sm ${p.featured ? "text-white/65" : "text-slate"}`}>{p.lead}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 max-w-[640px]">
              <PriceList group={{ ...web, rows: web.rows.slice(3) }} showTitle={false} />
            </div>
            <Link href="/websites/#pakete" className="link-u mt-6 inline-flex items-center gap-2 font-medium">
              Leistungen der Pakete im Detail <ArrowRight size={14} aria-hidden />
            </Link>
          </div>

          <div className="mt-24 grid gap-x-16 gap-y-16 lg:grid-cols-2">
            {rest.map((g) => (
              <div key={g.id} data-reveal>
                <PriceList group={g} />
              </div>
            ))}
          </div>

          <p className="mt-16 max-w-[80ch] text-[0.92rem] leading-relaxed text-slate">
            {footnote} Angaben zur Umsatzsteuer stehen im{" "}
            <Link href="/impressum/" className="link-u-static text-ink">
              Impressum
            </Link>
            .
          </p>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
