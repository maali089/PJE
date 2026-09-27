import { EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { Parallax } from "@/components/motion/Parallax";
import { Portrait } from "@/components/ui/Portrait";
import { contact, people, waLink } from "@/lib/content";

export function Person({ headingLevel = "h2", title = "Die Menschen hinter PJE Systems" }: { headingLevel?: "h2" | "h1"; title?: string }) {
  const H = headingLevel;
  return (
    <section className="section" aria-labelledby="team-titel" id="team">
      <div className="wrap">
        <H id="team-titel" className={headingLevel === "h1" ? "sr-only" : "t-label"} data-reveal>
          {title}
        </H>
        {people.map((p, idx) => (
          <article
            key={p.id}
            className={`grid gap-12 lg:items-end lg:gap-20 ${idx === 0 ? "mt-10" : "mt-24 md:mt-32"} ${
              idx % 2 ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]" : "lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
            }`}
          >
            <div className={`group relative ${idx % 2 ? "lg:order-2" : ""}`} data-reveal>
              <Parallax amount={6} className="relative aspect-[4/5] rounded-[var(--radius-panel)] bg-ink [container-type:inline-size]">
                <div className="absolute inset-[-8%_0]">
                  <Portrait
                    p={p}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    imgClassName="transition-[scale] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                  />
                </div>
              </Parallax>
              {/* Zusatzinfos beim Hover (Desktop); dieselben Infos stehen daneben für alle sichtbar */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-4 bottom-4 hidden translate-y-4 rounded-2xl bg-white/90 p-5 opacity-0 backdrop-blur-md transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 lg:block"
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent">{p.knowsAbout.length ? "Schwerpunkte" : "Zuständig für"}</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-graphite">{p.knowsAbout.length ? p.knowsAbout.join(", ") : p.role}</p>
              </div>
            </div>

            <div>
              <p className="t-label" data-reveal>
                {p.role}
              </p>
              <h3 className="mt-4 text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]" data-reveal>
                {p.name.split(" ")[0]}
                <br />
                {p.name.split(" ").slice(1).join(" ")}
                <span className="text-accent">.</span>
              </h3>
              <p className="mt-6 text-lg font-medium tracking-[-0.015em]" data-reveal>
                {p.jobTitle}
              </p>
              <p className="t-body mt-4 max-w-[44ch]" data-reveal>
                {p.bio}
              </p>
              {p.knowsAbout.length > 0 && (
                <div className="mt-8" data-reveal>
                  <p className="t-label">Schwerpunkte</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.knowsAbout.map((k) => (
                      <li key={k} className="rounded-full border border-line px-3 py-1.5 text-[0.85rem] text-graphite">
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <ul className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-graphite" data-reveal>
                <li>
                  <a target="_blank" href={waLink("Hallo PJE, ich habe eine Anfrage:")} rel="noopener" className="icon-nudge link-u inline-flex items-center gap-3">
                    <WhatsappLogo size={18} className="text-accent" aria-hidden />
                    WhatsApp {contact.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a href={contact.phoneHref} className="icon-nudge link-u inline-flex items-center gap-3">
                    <Phone size={18} className="text-accent" aria-hidden />
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="icon-nudge link-u inline-flex items-center gap-3">
                    <EnvelopeSimple size={18} className="text-accent" aria-hidden />
                    {contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
