import Link from "next/link";
import { Check, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { individualPackage, packageNotes, packages, vatNote, waLink } from "@/lib/content";

export function Packages({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <section className="section" id="pakete" aria-labelledby="pakete-titel">
      <div className="wrap">
        <H id="pakete-titel" className="t-h2 max-w-[15ch]" data-reveal>
          Websites zum Festpreis<span className="text-accent">.</span>
        </H>
        <p className="t-lead mt-6 max-w-[48ch]" data-reveal style={{ ["--i" as string]: 1 }}>
          Einmalpreis, kein Abo. Domain und Hosting laufen auf Ihren Namen.
        </p>

        <div className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-3 lg:gap-5">
          {packages.map((p, i) => {
            const dark = !!p.featured;
            return (
              <article
                key={p.id}
                data-reveal
                data-tilt="2.5"
                style={{ ["--i" as string]: i }}
                className={`relative flex min-w-0 flex-col rounded-[var(--radius-panel)] p-6 sm:p-7 md:p-9 ${
                  dark ? "bg-ink text-white shadow-[0_40px_80px_-40px_rgb(11_12_14/0.6)]" : "border border-line bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{p.name}</h3>
                  {dark && (
                    <span className="rounded-full bg-accent px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-white">
                      Üblicher Umfang
                    </span>
                  )}
                </div>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="t-num text-[clamp(3rem,5vw,4.2rem)] font-semibold leading-none tracking-[-0.05em]">{p.price}</span>
                </p>
                <p className={`mt-2 text-sm ${dark ? "text-white/60" : "text-slate"}`}>{p.priceNote}</p>
                <p className={`mt-6 leading-relaxed ${dark ? "text-white/80" : "text-graphite"}`}>{p.lead}</p>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className={`flex gap-3 text-[0.96rem] ${dark ? "text-white/85" : "text-graphite"}`}>
                      <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-9">
                  <a
                    href={waLink(`Hallo PJE, ich interessiere mich für das Website-Paket ${p.name}.`)}
                    rel="noopener"
                    target="_blank"
                    className={`btn w-full max-sm:whitespace-normal max-sm:py-3 max-sm:text-center max-sm:leading-tight ${dark ? "btn-primary" : "btn-outline"}`}
                  >
                    <WhatsappLogo size={18} aria-hidden />
                    <span className="btn-t"><span data-t={`${p.name} per WhatsApp anfragen`}>{p.name} per WhatsApp anfragen</span></span>
                  </a>
                  <Link
                    href={`/kontakt/?thema=website&paket=${p.name}#anfrage`}
                    className={`link-u mx-auto mt-4 block w-fit text-sm ${dark ? "text-white/70" : "text-slate"}`}
                  >
                    oder per Formular
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div
          data-reveal
          className="mt-4 grid gap-8 rounded-[var(--radius-panel)] bg-white p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9 lg:mt-5"
        >
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.02em]">
              {individualPackage.name} <span className="font-normal text-slate">· {individualPackage.price}</span>
            </h3>
            <p className="t-body mt-2 max-w-[62ch]">{individualPackage.lead}</p>
          </div>
          <a
            href={waLink("Hallo PJE, ich habe ein Projekt, das über eine Website hinausgeht (Webapp, Portal oder Schnittstelle).")}
            rel="noopener"
            target="_blank"
            className="btn btn-outline"
          >
            <WhatsappLogo size={18} aria-hidden />
            <span className="btn-t"><span data-t="Vorhaben schildern">Vorhaben schildern</span></span>
          </a>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {packageNotes.map((n, i) => (
            <li key={n} className="t-body border-t border-line pt-5 text-[0.95rem]" data-reveal style={{ ["--i" as string]: i }}>
              {n}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-quiet">{vatNote}</p>
      </div>
    </section>
  );
}
