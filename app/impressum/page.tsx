import { LegalPage } from "@/components/ui/LegalPage";
import { contact, site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({ title: "Impressum", description: "Impressum von PJE Systems, Paul Höflich, Wolnzach.", path: "/impressum/" }),
  robots: { index: true, follow: true },
};

/* Inhalt 1:1 von der bisherigen Website übernommen. */
export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" path="/impressum/">
      <h2>Angaben gemäß § 5 DDG</h2>
      <address>
        {site.legalName}
        <br />
        {contact.person}
        <br />
        {contact.street}
        <br />
        {contact.zip} {contact.city}
        <br />
        {contact.country}
      </address>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        <br />
        E-Mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>

      <h2>Umsatzsteuer</h2>
      <p>Ich bin Kleinunternehmer gemäß § 19 Abs. 1 Umsatzsteuergesetz (UStG) und erhebe daher keine Umsatzsteuer.</p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>Paul Höflich, Anschrift wie oben.</p>

      <h2>Hosting und Betrieb</h2>
      <p>Diese Website wird gehostet bei Vercel, Inc., San Francisco, USA.</p>

      <h2>Haftung für Inhalte und Links</h2>
      <p>
        Die Inhalte dieser Seiten wurden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch
        keine Gewähr übernommen werden. Für die Inhalte verlinkter externer Seiten ist stets der jeweilige Anbieter verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die auf dieser Website verwendeten Inhalte sind, soweit nicht anders angegeben, urheberrechtlich geschützt. Eine Vervielfältigung,
        Verbreitung oder Nutzung über den privaten Gebrauch hinaus ist ohne Zustimmung des Urhebers untersagt.
      </p>

      <h2>Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr" rel="noopener">
          ec.europa.eu/consumers/odr
        </a>
        . Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Disclaimer</h2>
      <p>
        Die bereitgestellten Informationen und Leistungsbeschreibungen auf dieser Website sind unverbindlich. Sie stellen kein Angebot im
        rechtlichen Sinne dar.
      </p>
    </LegalPage>
  );
}
