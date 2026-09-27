import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { softwareTasks } from "@/lib/content";
import { Pipeline } from "./Pipeline";

export function SoftwareSection() {
  return (
    <section className="section" aria-labelledby="software-titel" data-bg="paper">
      <div className="wrap">
        <h2 id="software-titel" className="t-h2 max-w-[16ch]" data-reveal>
          Systeme verbinden. <span className="text-slate">Abläufe automatisieren.</span>
        </h2>
        <p className="t-lead mt-6 max-w-[52ch]" data-reveal>
          Webapps, Dashboards, interne Tools, Schnittstellen und Automatisierungen für einen konkreten Ablauf im Betrieb. Quellcode und Dokumentation gehören dazu.
        </p>

        <div className="mt-16 md:mt-20">
          <Pipeline />
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div data-reveal>
            <p className="t-label">Arbeitszeit</p>
            <p className="mt-2 text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.05em]">
              50 €<span className="text-[0.45em] text-slate">/Std.</span>
            </p>
            <p className="t-body mt-4 max-w-[34ch]">Webapp oder Portal auf Anfrage, mit schriftlichem Angebot vor dem Start.</p>
            <Link href="/leistungen/softwareentwicklung/" className="btn btn-outline mt-8">
              <span className="btn-t"><span data-t="Softwareentwicklung ansehen">Softwareentwicklung ansehen</span></span>
              <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
            </Link>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {softwareTasks.map((t, i) => (
              <li key={t.problem} className="border-t border-line py-5" data-reveal style={{ ["--i" as string]: i % 2 }}>
                <p className="font-medium tracking-[-0.015em]">{t.problem}</p>
                <p className="t-body mt-1 text-[0.93rem]">{t.solution}</p>
                <p className="t-num mt-2 font-semibold text-accent">{t.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
