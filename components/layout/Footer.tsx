import Link from "next/link";
import { WhatsappLogo, Phone, EnvelopeSimple } from "@phosphor-icons/react/ssr";
import { contact, site, waLink } from "@/lib/content";

const cols = [
  {
    title: "Leistungen",
    links: [
      { href: "/websites/", label: "Websites" },
      { href: "/leistungen/softwareentwicklung/", label: "Software" },
      { href: "/leistungen/computerhilfe/", label: "IT-Service" },
      { href: "/preise/", label: "Preise" },
      { href: "/leistungen/", label: "Alle Leistungen" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { href: "/ueber-uns/", label: "Über uns" },
      { href: "/kontakt/", label: "Kontakt" },
      { href: "/impressum/", label: "Impressum" },
      { href: "/datenschutz/", label: "Datenschutz" },
    ],
  },
];

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.12)_1px,transparent_0)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
      />
      <div className="wrap relative pt-20 pb-10 md:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold tracking-[-0.02em]">{site.name}</p>
            <p className="mt-1 text-sm text-white/60">{site.claim}</p>
            <address className="mt-6 not-italic leading-relaxed text-white/75">
              {contact.person}
              <br />
              {contact.street}
              <br />
              {contact.zip} {contact.city}
            </address>
            <p className="mt-4 text-sm text-white/60">Anfragen und Fragen: {contact.inquiries}</p>
            <div className="mt-5 flex flex-col gap-2 text-white/85">
              <a target="_blank" rel="noopener" href={waLink("Hallo PJE, ich habe eine Anfrage:")} className="link-u inline-flex w-fit items-center gap-2">
                <WhatsappLogo size={16} aria-hidden /> WhatsApp {contact.whatsappDisplay}
              </a>
              <a href={contact.phoneHref} className="link-u inline-flex w-fit items-center gap-2">
                <Phone size={16} aria-hidden /> {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className="link-u inline-flex w-fit items-center gap-2">
                <EnvelopeSimple size={16} aria-hidden /> {contact.email}
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="t-label !text-white/50">{c.title}</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-u text-white/85 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="t-label !text-white/50">Erreichbarkeit</p>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-white/85">
              {contact.hours.map((h) => (
                <div key={h.days} className="contents">
                  <dt className="text-white/55">{h.days}</dt>
                  <dd className="t-num">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Vor Ort in München, Wolnzach und rund 50 km Umgebung. Websites und Software standortunabhängig.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/12 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. {site.slogan}
          </p>
          <p>Website von {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
