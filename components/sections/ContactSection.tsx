import { EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { contact, people, waLink } from "@/lib/content";
import { Avatar } from "@/components/ui/Portrait";

const inquiries = people.find((p) => p.name === contact.inquiries) ?? people[0];
import { ContactForm } from "./ContactForm";

export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  // Als Seitenkopf (Kontaktseite) sofort sichtbar, sonst beim Scrollen einblenden
  const top = headingLevel === "h1";
  const rv = top ? {} : { "data-reveal": true };
  const rc = top ? " anim-fade-up" : "";
  return (
    <section id="anfrage" aria-labelledby="kontakt-titel" className="section scroll-mt-16" data-bg="mist">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <H id="kontakt-titel" className={`t-h2${rc}`} {...rv}>
            Erzählen Sie kurz, was Sie vorhaben<span className="text-accent">.</span>
          </H>
          <p className={`t-lead mt-6 max-w-[40ch]${rc}`} {...rv}>
            Antwort {contact.responseTime}. Wenn es dringend ist, rufen Sie am besten direkt an.
          </p>

          <div className={`mt-10 flex items-center gap-4${rc}`} {...rv}>
            <Avatar p={inquiries} />
            <p className="leading-tight">
              <span className="block font-medium">{inquiries.name}</span>
              <span className="text-sm text-slate">Ihr Ansprechpartner für Anfragen und Fragen</span>
            </p>
          </div>

          <ul className={`mt-8 flex flex-col gap-3 text-[1.05rem]${rc}`} {...rv}>
            <li>
              <a href={contact.phoneHref} className="icon-nudge link-u inline-flex items-center gap-3">
                <Phone size={19} className="text-accent" aria-hidden />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="icon-nudge link-u inline-flex items-center gap-3">
                <EnvelopeSimple size={19} className="text-accent" aria-hidden />
                {contact.email}
              </a>
            </li>
            <li>
              <a target="_blank" href={waLink("Hallo PJE, ich habe eine Anfrage:")} rel="noopener" className="icon-nudge link-u inline-flex items-center gap-3">
                <WhatsappLogo size={19} className="text-accent" aria-hidden />
                WhatsApp schreiben
              </a>
            </li>
          </ul>

          <div className={`mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2${rc}`} {...rv}>
            <div>
              <p className="t-label">Erreichbarkeit</p>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.95rem]">
                {contact.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-slate">{h.days}</dt>
                    <dd className="t-num">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="t-label">Anschrift</p>
              <address className="mt-3 text-[0.95rem] not-italic leading-relaxed">
                PJE Systems, {contact.person}
                <br />
                {contact.street}
                <br />
                {contact.zip} {contact.city}
              </address>
              <p className="mt-3 text-[0.88rem] text-slate">Vor Ort in München, Wolnzach und rund 50 km Umgebung.</p>
            </div>
          </div>
        </div>

        <div className={rc} {...rv}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
