import { LegalPage } from "@/components/ui/LegalPage";
import { contact, site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von PJE Systems: welche Daten beim Besuch dieser Website verarbeitet werden und welche Rechte Sie haben.",
  path: "/datenschutz/",
});

/*
 * Inhalt von der bisherigen Website übernommen (Stand September 2026).
 * Angepasst: Schriftnamen (Geist / Geist Mono), Kontaktformular-Bezeichnung.
 * Entfernt, da keine Online-Buchung mehr: Supabase (Session-Cookies, Terminbuchung),
 * Stripe (Anzahlung), Google Calendar API. Vor dem Livegang prüfen, ob Vercel
 * Analytics / Speed Insights im Vercel-Projekt aktiv sind.
 */
export default function DatenschutzPage() {
  const mail = <a href={`mailto:${contact.email}`}>{contact.email}</a>;
  return (
    <LegalPage title="Datenschutzerklärung" path="/datenschutz/">
      <p>Diese Website verarbeitet personenbezogene Daten verantwortungsvoll. Lesen Sie, wie Ihre Daten verwendet werden und welche Rechte Sie haben.</p>

      <h2>Verantwortlich für die Verarbeitung</h2>
      <p>Verantwortlicher (i.S.d. DSGVO Art. 4 Abs. 7, BDSG § 3 Abs. 12):</p>
      <address>
        {site.legalName}
        <br />
        {contact.person}
        <br />
        {contact.street}
        <br />
        {contact.zip} {contact.city}
        <br />
        E-Mail: {mail}
        <br />
        Telefon: <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
      </address>

      <h2>Datenschutzbeauftragte / Kontakt für Datenschutzfragen</h2>
      <p>Für Fragen zum Datenschutz und Ihre Rechte nach der DSGVO kontaktieren Sie uns unter: {mail}</p>

      <h2>Aufrufen der Website</h2>
      <h3>Technisch notwendige Verarbeitung durch Hosting-Provider</h3>
      <p>Beim Aufruf dieser Website werden vom Hosting-Provider Vercel Inc., San Francisco, USA folgende Daten automatisch verarbeitet:</p>
      <ul>
        <li>IP-Adresse des anfragenden Computers</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>Seite, von der die Anfrage kommt (Referrer)</li>
        <li>Name der abgerufenen Datei</li>
        <li>Übertragene Datenmenge</li>
        <li>Browser und Betriebssystem</li>
        <li>HTTP-Statuscode</li>
      </ul>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Betrieb, Sicherheit und Optimierung der Website)
      </p>
      <p>
        <strong>Speicherdauer:</strong> Die Logfiles werden vom Hosting-Provider typischerweise für eine Dauer von 7-90 Tagen gespeichert und dann gelöscht.
      </p>
      <p>
        <strong>Keine Zusammenführung:</strong> Diese Daten werden nicht mit anderen Quellen zusammengeführt oder zu Tracking-Zwecken verwendet.
      </p>

      <h2>Kontakt über WhatsApp</h2>
      <p>
        Diese Website enthält Links, die WhatsApp mit einer vorbereiteten Nachricht öffnen (Adressen der Form wa.me). Beim Aufruf der Website
        werden dadurch keine Daten an WhatsApp übertragen. Erst wenn Sie einen solchen Link antippen, öffnet sich WhatsApp; die Nachricht wird erst
        verschickt, wenn Sie sie dort selbst absenden.
      </p>
      <p>
        Das Kontaktformular auf dieser Website setzt die Nachricht nur in Ihrem Browser zusammen. Die Eingaben werden weder gespeichert noch an
        einen Server übertragen.
      </p>
      <p>
        Anbieter: WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Für die Verarbeitung innerhalb von
        WhatsApp gilt dessen Datenschutzerklärung:{" "}
        <a href="https://www.whatsapp.com/legal/privacy-policy-eea" rel="noopener noreferrer" target="_blank">
          WhatsApp Datenschutzrichtlinie
        </a>
        .
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen / Bearbeitung Ihrer Anfrage)
      </p>

      <h2>Kontaktformular (E-Mail)</h2>
      <p>
        Wenn Sie mich per E-Mail oder über das Kontaktformular kontaktieren, verarbeite ich die von Ihnen übermittelten Angaben ausschließlich zur
        Bearbeitung Ihrer Anfrage.
      </p>
      <p>
        <strong>Verarbeitete Daten:</strong> Name, E-Mail, Nachrichteninhalt
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)
      </p>
      <p>
        <strong>Speicherdauer:</strong> Nach Abschluss der Geschäftsbeziehung werden die Mails archiviert (bis zu 3 Jahren für mögliche gesetzliche
        Aufbewahrungspflichten), dann gelöscht.
      </p>

      <h2>Webfonts (Google Fonts via next/font)</h2>
      <p>
        Die Schriftarten dieser Website (Geist und Geist Mono) werden durch Next.js optimiert und selbst gehostet. Es erfolgt keine direkte
        Verbindung zu Google-Servern beim Laden der Schriftarten.
      </p>
      <p>
        <strong>Datenweitergabe:</strong> Keine
      </p>

      <h2>Vercel Analytics</h2>
      <p>
        Diese Website nutzt Vercel Analytics zur Überwachung der Website-Performance und zum Verständnis von Nutzungsmustern. Der Dienst sammelt
        anonymisierte Daten über:
      </p>
      <ul>
        <li>Seitenzugriffe und Besucherdauer</li>
        <li>Gerätetyp und Browser</li>
        <li>Geographische Region (auf Stadtebene)</li>
        <li>Web Vitals (Lade-, Rendering- und Interaktionszeiten)</li>
      </ul>
      <p>
        <strong>Empfänger:</strong> Vercel Inc., San Francisco, USA
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Optimierung und Monitoring der Website-Performance)
      </p>
      <p>
        <strong>Datenschutz:</strong> Vercel anonymisiert die Daten nach kurzer Zeit. Keine Identifikation einzelner Nutzer, keine Cookies für
        Tracking.
      </p>
      <p>
        <strong>Weitere Informationen:</strong>{" "}
        <a href="https://vercel.com/legal/privacy-policy" rel="noopener noreferrer" target="_blank">
          Vercel Datenschutzerklärung
        </a>
      </p>

      <h2>Vercel Speed Insights</h2>
      <p>Diese Website nutzt Vercel Speed Insights zur Messung und Überwachung von Web-Performance-Metriken. Der Dienst erfasst anonymisierte Daten über:</p>
      <ul>
        <li>Core Web Vitals (LCP, FID, CLS)</li>
        <li>Seiten-Ladedauer</li>
        <li>Rendering-Performance</li>
        <li>Interaktivität und Stabilität</li>
      </ul>
      <p>
        <strong>Empfänger:</strong> Vercel Inc., San Francisco, USA
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Website-Optimierung und User-Experience-Verbesserung)
      </p>
      <p>
        <strong>Datenschutz:</strong> Die Daten sind vollständig anonymisiert und können nicht einzelnen Nutzern zugeordnet werden.
      </p>
      <p>
        <strong>Weitere Informationen:</strong>{" "}
        <a href="https://vercel.com/legal/privacy-policy" rel="noopener noreferrer" target="_blank">
          Vercel Datenschutzerklärung
        </a>
      </p>

      <h2>Externe Inhalte und Plugins</h2>
      <p>
        <strong>Social-Media-Plugins:</strong> Es werden keine Social-Media-Plugins verwendet.
      </p>
      <p>
        <strong>Remarketing/Werbung:</strong> Es werden keine Werbenetzwerke eingebunden.
      </p>

      <h2>Datenübertragung in Drittländer (USA)</h2>
      <p>
        <strong>Wichtig:</strong> Einige der eingesetzten Dienste (Vercel als Hosting-Provider) haben Sitz in den USA. Die Europäische Kommission hat
        für die USA KEIN angemessenes Datenschutzniveau festgestellt.
      </p>
      <p>
        <strong>Rechtsgrundlage für die Übertragung:</strong>
      </p>
      <ul>
        <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
        <li>Standarddatenschutzklauseln oder ähnliche Schutzmechanismen der Dienste</li>
      </ul>
      <p>Sie haben das Recht, gegen diese Datenübertragung Einspruch zu erheben. Kontaktieren Sie uns dazu unter: {mail}</p>

      <h2>Fernwartung</h2>
      <p>
        Für Fernwartungen nutze ich etablierte Fernwartungssoftware, die eine Verbindung erst nach Ihrer ausdrücklichen Freigabe herstellt. Sie
        sehen jede Aktion mit und können die Sitzung jederzeit beenden.
      </p>
      <p>
        <strong>Speicherdauer:</strong> Sitzungsprotokolle werden nicht länger als 30 Tage gespeichert.
      </p>

      <h2>Sicherheitsmaßnahmen</h2>
      <p>Ihre Daten werden durch geeignete technische und organisatorische Maßnahmen geschützt:</p>
      <ul>
        <li>HTTPS-Verschlüsselung für alle Übertragungen</li>
        <li>Keine öffentliche Speicherung von Passwörtern</li>
        <li>Regelmäßige Backups</li>
      </ul>

      <h2>Ihre Rechte</h2>
      <p>Nach der DSGVO haben Sie folgende Rechte:</p>
      <ul>
        <li>
          <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können jederzeit erfragen, welche Daten über Sie gespeichert sind
        </li>
        <li>
          <strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie können falsche Daten korrigieren lassen
        </li>
        <li>
          <strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer Daten verlangen, sofern keine Aufbewahrungspflichten
          bestehen
        </li>
        <li>
          <strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</strong>
        </li>
        <li>
          <strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können Ihre Daten in strukturierter Form erhalten
        </li>
        <li>
          <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung auf Basis von berechtigtem Interesse widersprechen
        </li>
        <li>
          <strong>Widerrufsrecht (Art. 7 Abs. 3 DSGVO):</strong> Falls eine Einwilligung erteilt wurde, können Sie diese widerrufen
        </li>
      </ul>
      <p>Alle Anfragen richten Sie bitte an: {mail}</p>

      <h2>Beschwerde bei der Datenschutzbehörde</h2>
      <p>
        Sollten Sie der Meinung sein, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt, haben Sie das Recht, sich bei der zuständigen
        Aufsichtsbehörde zu beschweren.
      </p>
      <p>
        <strong>Zuständige Datenschutzbehörde für Bayern:</strong>
        <br />
        Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
        <br />
        Postfach 606, 91511 Ansbach
        <br />
        E-Mail: <a href="mailto:poststelle@lda.bayern.de">poststelle@lda.bayern.de</a>
        <br />
        Tel.: 0981 53-1300
      </p>

      <h2>Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung kann bei Änderungen der technischen Infrastruktur oder gesetzlicher Anforderungen angepasst werden. Achten Sie
        auf Updates.
      </p>
      <p>Letzte Aktualisierung: September 2026</p>
    </LegalPage>
  );
}
