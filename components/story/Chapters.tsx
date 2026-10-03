import { DeviceMobile, EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { Scene } from "@/components/motion/Scene";
import { Person } from "@/components/sections/Person";
import { Portrait } from "@/components/ui/Portrait";
import { contact, people, personContact, waLink } from "@/lib/content";

/* ---------------------------------------------------------------- */
/* Team                                                               */
/* ---------------------------------------------------------------- */

export function TeamReveal() {
  const title = people.length > 1 ? "Hinter der Technik stehen Menschen" : "Hinter der Technik steht ein Mensch";
  return (
    <div data-chapter="team" id="team">
      <Scene name="team" as="section" aria-labelledby="team-reveal-titel" className="relative hidden lg:block lg:motion-reduce:hidden">
        <div data-pin className="relative h-[100svh] overflow-hidden">
          <h2 id="team-reveal-titel" data-team-title className="t-mega absolute inset-x-0 z-10 top-1/2 -translate-y-1/2 text-center !text-[clamp(3rem,7.4vw,7.6rem)] mx-auto max-w-[14ch]">
            {title}
            <span className="text-accent">.</span>
          </h2>
          {people.map((p, idx) => {
            const c = personContact(p);
            return (
            <div key={p.id} data-person={idx} className="wrap absolute inset-0 grid grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-center gap-16">
              <div className="flex h-full items-center">
                <div data-portrait className="relative h-[78svh] w-full origin-center overflow-hidden rounded-[var(--radius-panel)] bg-ink [container-type:inline-size]">
                  <Portrait p={p} sizes="50vw" imgAttr={{ "data-portrait-img": "" }} />
                </div>
              </div>
              <div data-info>
                <p data-info-row className="t-label">
                  {p.role}
                </p>
                <p data-info-row className="mt-4 text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
                  {p.name.split(" ")[0]}
                  <br />
                  {p.name.split(" ").slice(1).join(" ")}
                  <span className="text-accent">.</span>
                </p>
                <p data-info-row className="mt-6 text-lg font-medium tracking-[-0.015em]">
                  {p.jobTitle}
                </p>
                <p data-info-row className="t-body mt-3 max-w-[44ch]">
                  {p.bio}
                </p>
                {p.knowsAbout.length > 0 && (
                  <p data-info-row className="t-body mt-5 max-w-[46ch] text-[0.92rem]">
                    <span className="text-ink">Schwerpunkte:</span> {p.knowsAbout.join(", ")}
                  </p>
                )}
                <ul data-info-row className="mt-8 flex flex-col gap-2.5 border-t border-line pt-6 text-graphite">
                  <li>
                    <a href={contact.phoneHref} className="icon-nudge link-u inline-flex items-center gap-3">
                      <Phone size={18} className="text-accent" aria-hidden /> {contact.phoneDisplay}
                    </a>
                  </li>
                  {c.mobile && (
                    <li>
                      <a href={c.mobile.href} className="icon-nudge link-u inline-flex items-center gap-3">
                        <DeviceMobile size={18} className="text-accent" aria-hidden /> Mobil {c.mobile.display}
                      </a>
                    </li>
                  )}
                  <li>
                    <a href={`mailto:${c.email}`} className="icon-nudge link-u inline-flex items-center gap-3">
                      <EnvelopeSimple size={18} className="text-accent" aria-hidden /> {c.email}
                    </a>
                  </li>
                  <li>
                    <a target="_blank" rel="noopener" href={waLink("Hallo PJE, ich habe eine Anfrage:")} className="icon-nudge link-u inline-flex items-center gap-3">
                      <WhatsappLogo size={18} className="text-accent" aria-hidden /> WhatsApp {contact.whatsappDisplay}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            );
          })}
        </div>
      </Scene>
      <div className="lg:hidden lg:motion-reduce:block">
        <Person title={title} />
      </div>
    </div>
  );
}
