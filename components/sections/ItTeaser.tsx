import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { itProblems } from "@/lib/content";

export function ItTeaser() {
  return (
    <section className="section" aria-labelledby="it-titel" data-bg="mist">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="it-titel" className="t-h2 max-w-[12ch]" data-reveal>
            IT-Service, der vorbeikommt<span className="text-accent">.</span>
          </h2>
          <p className="t-lead mt-6 max-w-[40ch]" data-reveal style={{ ["--i" as string]: 1 }}>
            Einrichtung, Reparatur und Datenrettung in München, Wolnzach und rund 50 km Umgebung. Wo es geht, per Fernwartung ohne Anfahrt.
          </p>
          <div className="img-zoom relative mt-10 aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)]" data-reveal>
            <Image
              src="/assets/pc-reparatur-hardware.webp"
              alt="Reparatur an geöffneter Hardware"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <Link href="/kontakt/?thema=it#anfrage" className="btn btn-primary" data-magnetic>
              <span className="btn-t"><span data-t="IT-Hilfe anfragen">IT-Hilfe anfragen</span></span>
              <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
            </Link>
            <Link href="/leistungen/computerhilfe/" className="btn btn-outline">
              <span className="btn-t"><span data-t="Alle IT-Leistungen">Alle IT-Leistungen</span></span>
            </Link>
          </div>
        </div>

        <div>
          <p className="t-label" data-reveal>
            Häufige Probleme, feste Preise
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {itProblems.map((p, i) => (
              <li
                key={p.problem}
                data-reveal
                style={{ ["--i" as string]: i % 2 }}
                className="group flex flex-col rounded-[var(--radius-panel)] bg-white p-6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-34px_rgb(11_12_14/0.4)]"
              >
                <p className="text-[1.05rem] font-medium leading-snug tracking-[-0.015em]">{p.problem}</p>
                <p className="t-body mt-2 text-[0.93rem]">{p.solution}</p>
                <p className="t-num mt-auto pt-5 text-lg font-semibold tracking-[-0.02em] text-accent">{p.price}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-quiet">
            Preise pro Aufgabe. Dazu kommt einmal pro Termin die Anfahrt ab 10 €. Arbeitszeit 35 €/Std., Fernwartung 30 €/Std.
          </p>
        </div>
      </div>
    </section>
  );
}
