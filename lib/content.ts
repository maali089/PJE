/**
 * Zentrale Inhalte von PJE Systems.
 *
 * Alle Fakten (Personen, Kontaktdaten, Preise, Pakete, Leistungen, FAQ) stammen von
 * der bisherigen Website pje-systems.de (Stand September 2026) und sind hier die
 * einzige Quelle für alle Seiten. Neu hinzugekommen sind nur die Standortangaben
 * München + Wolnzach und das Vor-Ort-Gebiet von rund 50 km (Vorgabe Relaunch).
 */

export const site = {
  name: "PJE Systems",
  legalName: "PJE Systems – Paul Höflich",
  url: "https://pje-systems.de",
  slogan: "IT, die einfach funktioniert.",
  claim: "Websites · Software · IT",
};

export const contact = {
  person: "Paul Höflich",
  inquiries: "Blagoja Ljubeski",
  phoneDisplay: "+49 176 55377205",
  phoneHref: "tel:+4917655377205",
  whatsapp: "4917656814860",
  whatsappDisplay: "+49 176 56814860",
  email: "paulhoflich@gmail.com",
  street: "Bodenfeldstraße 2",
  zip: "85283",
  city: "Wolnzach",
  country: "Deutschland",
  responseTime: "am selben oder nächsten Werktag",
  hours: [
    { days: "Mo bis Fr", time: "15:00 bis 20:00 Uhr" },
    { days: "Sa", time: "10:00 bis 18:00 Uhr" },
    { days: "So", time: "geschlossen" },
  ],
};

export const waLink = (text: string) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailLink = (subject: string, body = "") =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export type PersonInfo = {
  id: string;
  name: string;
  role: string;
  jobTitle: string;
  image?: string;
  imageAlt?: string;
  initials: string;
  bio: string;
  knowsAbout: string[];
  /** Eigene Kontaktdaten; ohne Angabe gelten die allgemeinen aus `contact`. */
  email?: string;
  mobileDisplay?: string;
  mobileHref?: string;
};

/** Kontaktdaten einer Person, ergänzt um die allgemeinen Angaben. */
export const personContact = (p: PersonInfo) => ({
  email: p.email ?? contact.email,
  mobile: p.mobileDisplay ? { display: p.mobileDisplay, href: p.mobileHref! } : undefined,
});

/**
 * Personen hinter PJE Systems.
 * Paul Höflich: von der bisherigen Website übernommen.
 * Blagoja Ljubeski: Angabe des Inhabers (zuständig für Anfragen und Fragen), Foto, E-Mail und Mobilnummer von ihm.
 */
export const people: PersonInfo[] = [
  {
    id: "paul-hoeflich",
    name: "Paul Höflich",
    // Rolle laut strukturierten Daten der bisherigen Website (jobTitle) + Inhaber laut Impressum / founder
    role: "Inhaber",
    jobTitle: "Webentwickler und IT-Dienstleister",
    image: "/assets/paul-hoeflich-pje-systems.webp",
    imageAlt: "Paul Höflich, Inhaber von PJE Systems",
    initials: "PH",
    bio: "Websites und Software für Betriebe, dazu IT-Service vor Ort. Planung, Umsetzung und Übergabe liegen bei ihm in einer Hand.",
    knowsAbout: [
      "Webdesign",
      "Webentwicklung",
      "Suchmaschinenoptimierung",
      "Softwareentwicklung",
      "Computerhilfe",
      "PC-Reparatur",
      "Windows",
      "Netzwerk und WLAN",
      "Datenrettung",
      "Automatisierung mit Python",
    ],
  },
  {
    id: "blagoja-ljubeski",
    name: "Blagoja Ljubeski",
    role: "Anfragen und Fragen",
    jobTitle: "Ansprechpartner für Anfragen und Fragen",
    image: "/assets/blagoja-ljubeski-pje-systems.webp",
    imageAlt: "Blagoja Ljubeski, Ansprechpartner für Anfragen bei PJE Systems",
    initials: "BL",
    email: "Blagojamuenchen@gmail.com",
    // dieselbe Nummer wie WhatsApp
    mobileDisplay: "+49 176 56814860",
    mobileHref: "tel:+4917656814860",
    bio: "Ihr erster Kontakt bei PJE Systems: nimmt Anfragen entgegen und beantwortet Fragen zu Websites, Software und IT-Service.",
    knowsAbout: [],
  },
];

/* ------------------------------------------------------------------ */
/* Standorte                                                          */
/* ------------------------------------------------------------------ */

export const locations = [
  { name: "München", lat: 48.1374, lon: 11.5755 },
  { name: "Wolnzach", lat: 48.6028, lon: 11.6289 },
];

export const serviceRadiusKm = 50;

/** Orte im Einzugsgebiet (bisherige Liste um Wolnzach + Orte rund um München). */
export const places = [
  { name: "Ingolstadt", lat: 48.7665, lon: 11.4258, near: "Wolnzach" },
  { name: "Pfaffenhofen a. d. Ilm", lat: 48.5308, lon: 11.5064, near: "Wolnzach" },
  { name: "Geisenfeld", lat: 48.6843, lon: 11.6117, near: "Wolnzach" },
  { name: "Mainburg", lat: 48.6406, lon: 11.7836, near: "Wolnzach" },
  { name: "Au in der Hallertau", lat: 48.557, lon: 11.7417, near: "Wolnzach" },
  { name: "Freising", lat: 48.4029, lon: 11.7488, near: "München" },
  { name: "Dachau", lat: 48.26, lon: 11.4342, near: "München" },
  { name: "Erding", lat: 48.3064, lon: 11.9076, near: "München" },
  { name: "Garching", lat: 48.2489, lon: 11.651, near: "München" },
];

/* ------------------------------------------------------------------ */
/* Websites                                                           */
/* ------------------------------------------------------------------ */

export type Pkg = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  lead: string;
  features: string[];
  featured?: boolean;
};

export const packages: Pkg[] = [
  {
    id: "starter",
    name: "Starter",
    price: "499 €",
    priceNote: "einmalig, Endpreis",
    lead: "Onepager für kleine Unternehmen und Selbstständige, die online auffindbar sein wollen.",
    features: [
      "Eine Seite mit Leistungen, Betrieb und Kontakt",
      "Eigenes Layout, keine fertige Vorlage",
      "Eine Korrekturrunde vor dem Livegang",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "799 €",
    priceNote: "einmalig, üblicher Umfang",
    lead: "Unternehmenswebsite mit bis zu etwa 5 Seiten, der übliche Umfang für einen Betrieb.",
    features: [
      "Bis ca. 5 Seiten, Struktur gemeinsam festgelegt",
      "Kontaktformular mit Spam-Schutz und Mailversand",
      "Zwei Korrekturrunden vor dem Livegang",
    ],
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "1.499 €",
    priceNote: "einmalig, Endpreis",
    lead: "Umfangreichere Website mit bis zu etwa 10 Seiten und einzelnen eigenen Funktionen.",
    features: [
      "Bis ca. 10 Seiten, eigene Seite je Leistung oder Standort",
      "Terminbuchung, Anfrage-Assistent, Filter oder Rechner",
      "Anbindung an Kalender oder Mailversand",
    ],
  },
];

export const individualPackage = {
  name: "Individuell",
  price: "Preis auf Anfrage",
  lead: "Für Vorhaben, die über eine Website hinausgehen: Webapps, Portale, Dashboards, API-Anbindungen und Automatisierungen.",
};

export const packageNotes = [
  "Domain- und Hostinggebühren laufen direkt über den Anbieter und bleiben bei Ihnen.",
  "Texte und Bilder können Sie liefern; auf Wunsch werden sie gegen Aufwand erstellt.",
  "Laufende Pflege nach dem Livegang ist kein Abo, sondern wird nach Aufwand abgerechnet.",
];

export const vatNote =
  "Die Preise sind Endpreise. Als Kleinunternehmer nach § 19 UStG wird keine Umsatzsteuer ausgewiesen.";

/** „Typische Lagen“ der bisherigen Website: Problem → Lösung → Preis */
export const websiteSituations = [
  {
    problem: "Ohne eigene Website sind Sie nur ein Facebook-Profil unter vielen.",
    solution: "Onepager mit Leistungen, Betrieb und Kontakt, eigenes Layout",
    price: "Starter 499 €",
    wa: "Hallo PJE, mein Betrieb hat noch keine eigene Website. Ich interessiere mich für einen Onepager.",
  },
  {
    problem: "Wer Sie bei Google sucht, findet Sie nicht.",
    solution: "Titel, Beschreibungen, strukturierte Daten und Sitemap für jede Seite",
    price: "in jedem Paket",
    wa: "Hallo PJE, unser Betrieb wird bei Google kaum gefunden. Können wir über eine neue Website sprechen?",
  },
  {
    problem: "Die meisten schauen am Handy nach, Ihre Seite aber nicht.",
    solution: "Aufbau zuerst fürs Handy, geprüft auf Handy, Tablet und Desktop",
    price: "in jedem Paket",
    wa: "Hallo PJE, unsere Website ist auf dem Handy kaum zu benutzen. Was würde eine neue kosten?",
  },
  {
    problem: "Eine Website von vor Jahren wirkt wie ein geschlossenes Geschäft.",
    solution: "Relaunch: Inhalte übernommen, alte Adressen weitergeleitet",
    price: "ab 499 €",
    wa: "Hallo PJE, unsere Website ist in die Jahre gekommen. Ich interessiere mich für einen Relaunch.",
  },
  {
    problem: "Verpassen Sie den Anruf, ist die Anfrage weg.",
    solution: "Kontaktformular mit Spam-Schutz und Mailversand",
    price: "Business 799 €",
    wa: "Hallo PJE, wir hätten gern eine Website mit Kontaktformular. Passt dafür das Business-Paket?",
  },
  {
    problem: "Ein handschriftlicher Termin ist schnell vergessen.",
    solution: "Terminbuchung auf der Website mit Anbindung an den Kalender",
    price: "Premium 1.499 €",
    wa: "Hallo PJE, wir möchten, dass Kunden auf unserer Website Termine buchen können. Können wir das besprechen?",
  },
  {
    problem: "Ohne eigene Zugänge gehört Ihnen die Website nicht wirklich.",
    solution: "Domain und Hosting auf Ihren Namen, Übergabe mit Dokumentation",
    price: "in jedem Paket",
    wa: "Hallo PJE, die Zugänge zu unserer Website liegen noch beim früheren Anbieter. Können Sie beim Umzug helfen?",
  },
];

/** Leistungsumfang Websites (bisherige Inhalte, als Liste) */
export const websiteScope = [
  "Onepager",
  "Unternehmenswebsites",
  "Relaunch bestehender Websites",
  "Individuelle Layouts",
  "Responsive Umsetzung",
  "Kontaktformulare",
  "Terminbuchung",
  "Eigene Funktionen",
  "SEO-Grundlagen",
  "Domain und Hosting einrichten",
  "Übergabe der Zugänge",
  "Webapps, Portale, Dashboards",
];

export const websiteQuality = [
  {
    title: "Gebaut, nicht zusammengeklickt",
    text: "Echter Code (Next.js, React) statt Baukasten: kurze Ladezeit, spätere Änderungen ohne Neuaufbau.",
  },
  {
    title: "Auf dem Handy zuerst geprüft",
    text: "Jede Seite wird in Handy-, Tablet- und Desktopbreite durchgesehen, bevor sie online geht.",
  },
  {
    title: "Für Google vorbereitet",
    text: "Titel und Beschreibungen je Seite, strukturierte Daten, sitemap.xml, robots.txt und saubere Adressen.",
  },
  {
    title: "Ohne unnötige Datensammlung",
    text: "Schriften werden selbst ausgeliefert, fremde Skripte werden vermieden.",
  },
  {
    title: "Bestehende Website überarbeiten",
    text: "Beim Relaunch werden Inhalte übernommen, die Seite neu aufgebaut und alte Adressen weitergeleitet, damit Platzierungen bei Google nicht verloren gehen.",
  },
];

/* ------------------------------------------------------------------ */
/* Ablauf                                                             */
/* ------------------------------------------------------------------ */

export const websiteProcess = [
  { title: "Gespräch", text: "Was die Seite leisten soll und welche Inhalte schon da sind." },
  { title: "Angebot", text: "Schriftlich, mit Paket und Umfang. Erst dann entscheiden Sie." },
  { title: "Entwurf", text: "Sie sehen die Startseite, bevor der Rest gebaut wird." },
  { title: "Umsetzung", text: "Aufbau, Prüfung auf Handy und Desktop, Stand unter einer Testadresse." },
  { title: "Livegang", text: "Domain umgestellt, Einweisung und Dokumentation übergeben." },
];

export const websiteDuration =
  "Onepager in ein bis zwei Wochen, mehrseitige Websites in zwei bis vier, sobald Texte und Bilder vorliegen.";

export const itProcess = [
  { title: "Nachricht", text: "Per WhatsApp, Telefon oder E-Mail. Ein paar Sätze zum Problem genügen." },
  { title: "Einschätzung", text: "Vorab ein Preisrahmen und ein Terminvorschlag." },
  { title: "Termin", text: "Bei Ihnen zu Hause oder im Betrieb. Wo es geht, per Fernwartung." },
  { title: "Reparatur", text: "Vor größeren Eingriffen wird gesichert." },
  { title: "Übergabe", text: "Zum Schluss wird in normalen Worten erklärt, was gemacht wurde." },
];

export const softwareProcess = [
  {
    title: "Erst zuhören, dann schätzen",
    text: "Im ersten Gespräch geht es um den Ablauf. Daraus entsteht eine Aufwandsschätzung mit Preisrahmen, bevor entwickelt wird.",
  },
  {
    title: "Klein anfangen",
    text: "Der erste Schritt bleibt überschaubar: ein Skript für eine konkrete Aufgabe. Läuft es im Alltag, wird darauf aufgebaut.",
  },
  {
    title: "Übergabe ohne Abhängigkeit",
    text: "Quellcode und kurze Dokumentation gehören dazu, wartbar auch von anderen.",
  },
];

/* ------------------------------------------------------------------ */
/* Software                                                           */
/* ------------------------------------------------------------------ */

export const softwareRate = "50 €/Std.";

export const softwareTasks = [
  {
    problem: "Jede Woche dieselbe Excel-Arbeit",
    solution: "Excel-Automatisierung inklusive Auswertung",
    price: "ab 50 €",
  },
  {
    problem: "Dateien werden von Hand umbenannt und sortiert",
    solution: "Python-Skript, das Dateien prüft, benennt und ablegt",
    price: "ab 50 €",
  },
  {
    problem: "Shop und Buchhaltung wissen nichts voneinander",
    solution: "API-Anbindung mit Protokoll statt stiller Ausfälle",
    price: "ab 80 €",
  },
  {
    problem: "Keine Standardsoftware passt zum Ablauf",
    solution: "Kleines eigenes Werkzeug mit klarer Oberfläche",
    price: "ab 100 €",
  },
  {
    problem: "Auf der bestehenden Website fehlt eine Kleinigkeit",
    solution: "Kleine Änderung an einer bestehenden Website",
    price: "ab 50 €",
  },
];

export const softwareScope = [
  "Individuelle Software",
  "Webapps",
  "Dashboards",
  "Interne Tools",
  "API-Anbindungen",
  "Automatisierungen",
  "Python-Skripte",
  "Excel-Automatisierungen",
];

/* ------------------------------------------------------------------ */
/* Preislisten (identisch zur bisherigen Seite /preise/)              */
/* ------------------------------------------------------------------ */

export type PriceRow = { label: string; price: string; note?: string };
export type PriceGroup = { id: string; title: string; lead?: string; rows: PriceRow[] };

export const priceGroups: PriceGroup[] = [
  {
    id: "websites",
    title: "Websites",
    lead: "Feste Einmalpreise für Unternehmenswebsites, ohne Umsatzsteuer (§ 19 UStG).",
    rows: [
      { label: "Starter, Onepager", price: "499 €" },
      { label: "Business, bis ca. 5 Seiten", price: "799 €" },
      { label: "Premium, bis ca. 10 Seiten", price: "1.499 €" },
      { label: "Website-Relaunch", price: "ab 499 €" },
      { label: "Individuelles Projekt", price: "auf Anfrage" },
    ],
  },
  {
    id: "computerhilfe",
    title: "Computerhilfe",
    lead: "Die häufigsten Aufgaben rund um Windows, Internet und Alltagssoftware.",
    rows: [
      { label: "Arbeitszeit", price: "35 €/Std." },
      { label: "PC/Laptop einrichten", price: "40 €" },
      { label: "Windows neu installieren", price: "50 €" },
      { label: "Windows + Treiber + Updates", price: "60 €" },
      { label: "PC schneller machen", price: "35 €" },
      { label: "Viren/Malware entfernen", price: "ab 40 €" },
      { label: "Software installieren/einrichten", price: "ab 20 €" },
      { label: "Drucker einrichten", price: "25 €" },
      { label: "WLAN/Router einrichten", price: "30 €" },
      { label: "E-Mail einrichten", price: "20 €" },
      { label: "Daten übertragen", price: "ab 50 €" },
      { label: "Backup einrichten", price: "ab 30 €" },
    ],
  },
  {
    id: "hardware",
    title: "Hardware",
    lead: "Arbeit am Gerät: Einbau, Aufrüstung und Wartung.",
    rows: [
      { label: "PC zusammenbauen", price: "ab 60 €" },
      { label: "PC aufrüsten", price: "ab 40 €" },
      { label: "Grafikkarte/RAM/SSD einbauen", price: "ab 25 €" },
      { label: "Wärmeleitpaste Desktop-PC", price: "30 €" },
      { label: "Wärmeleitpaste Laptop", price: "ab 45 €" },
      { label: "Laptop reinigen", price: "ab 40 €" },
    ],
  },
  {
    id: "diagnose",
    title: "Diagnose",
    lead: "Ursachensuche mit klarem Ergebnis, auch wenn keine Reparatur folgt.",
    rows: [
      { label: "Fehlerdiagnose", price: "20 €" },
      { label: "Komplexe Fehlerdiagnose", price: "35 €" },
    ],
  },
  {
    id: "fernwartung",
    title: "Fernwartung",
    lead: "Hilfe ohne Termin vor Ort, sofern das Problem es zulässt.",
    rows: [{ label: "Fernwartung", price: "30 €/Std." }],
  },
  {
    id: "daten",
    title: "Daten",
    rows: [{ label: "Datenrettung", price: "ab 50 €" }],
  },
  {
    id: "beratung",
    title: "Beratung",
    rows: [{ label: "PC-Kaufberatung", price: "30 €/Std." }],
  },
  {
    id: "software",
    title: "Softwareentwicklung",
    lead: "Webapps, Tools und Automatisierung. Der Umfang entscheidet den Preis, deshalb Stundensatz und Startpreise statt Pauschalen.",
    rows: [
      { label: "Arbeitszeit", price: "50 €/Std." },
      { label: "Kleines Python-Skript", price: "ab 50 €" },
      { label: "Excel-Automatisierung", price: "ab 50 €" },
      { label: "Kleine Websiteänderung", price: "ab 50 €" },
      { label: "API-Anbindung", price: "ab 80 €" },
      { label: "Individuelles kleines Tool", price: "ab 100 €" },
      { label: "Webapp, Dashboard oder Portal", price: "auf Anfrage" },
    ],
  },
  {
    id: "anfahrt",
    title: "Anfahrt",
    lead: "Einmal pro Termin, unabhängig von der Dauer des Einsatzes.",
    rows: [
      { label: "bis 10 km", price: "10 €" },
      { label: "10 bis 25 km", price: "15 €" },
      { label: "25 bis 40 km", price: "25 €" },
      { label: "über 40 km", price: "auf Anfrage" },
    ],
  },
];

export const priceFootnote =
  "Stundensätze werden nicht auf volle Stunden aufgerundet, Ersatzteile werden zum Einkaufspreis und getrennt ausgewiesen. Alle Preise verstehen sich in Euro; Angaben zur Umsatzsteuer stehen im Impressum. Für Aufträge außerhalb des Einzugsgebiets oder mit größerem Umfang gibt es ein individuelles Angebot.";

export const getGroup = (id: string) => priceGroups.find((g) => g.id === id)!;

/* ------------------------------------------------------------------ */
/* IT-Service                                                         */
/* ------------------------------------------------------------------ */

export const itRate = "35 €/Std.";

export const itProblems = [
  { problem: "Der Rechner ist langsam geworden", solution: "Aufräumen, Autostart und Updates prüfen, bei Bedarf SSD statt Festplatte", price: "35 €" },
  { problem: "Windows startet nicht mehr", solution: "Reparatur oder Neuinstallation, Daten werden vorher gesichert", price: "50 €" },
  { problem: "Das WLAN reicht nicht bis ins Büro", solution: "Router und WLAN einrichten, auf allen Geräten geprüft", price: "30 €" },
  { problem: "Der Drucker wird nicht gefunden", solution: "Drucker einrichten, erreichbar von jedem Rechner im Haushalt", price: "25 €" },
  { problem: "Fremde Programme und Pop-ups", solution: "Viren und Schadsoftware entfernen", price: "ab 40 €" },
  { problem: "Neuer Laptop, die alten Daten sollen mit", solution: "Dateien, Fotos, E-Mail-Konten und Einstellungen übertragen", price: "ab 50 €" },
  { problem: "Fotos auf einer Festplatte, die nicht mehr startet", solution: "Datenrettung, soweit das Speichermedium sie noch hergibt", price: "ab 50 €" },
  { problem: "Der Laptop wird heiß und laut", solution: "Reinigen, Wärmeleitpaste erneuern", price: "ab 40 €" },
  { problem: "Unklar, was eigentlich kaputt ist", solution: "Fehlerdiagnose mit klarem Ergebnis, auch wenn nicht repariert wird", price: "20 €" },
];

export const itScope = [
  "PC- und Laptop-Hilfe",
  "Einrichtung",
  "Windows",
  "Hardware und Upgrades",
  "WLAN und Router",
  "Drucker",
  "Fehlerdiagnose",
  "Viren und Malware",
  "Datenübertragung",
  "Datenrettung",
  "Backup",
  "Fernwartung",
  "Kaufberatung",
  "Wartung und Reinigung",
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export const faqHome: Faq[] = [
  {
    q: "Was kostet eine Website?",
    a: "Es gibt drei Festpreise: der Starter-Onepager kostet 499 €, eine Unternehmenswebsite mit bis zu etwa 5 Seiten 799 € (Business) und eine umfangreichere Seite mit bis zu etwa 10 Seiten 1.499 € (Premium). Jeweils einmalig, ohne Abo. Für Webapps, Portale oder Sonderfunktionen gibt es ein individuelles Angebot.",
  },
  {
    q: "Kommen Sie auch zu mir nach Hause?",
    a: "Ja. Vor-Ort-Termine sind der Normalfall in München, Wolnzach und rund 50 km Umgebung. Die Anfahrt wird einmal pro Termin berechnet: 10 € bis 10 km, 15 € bis 25 km, 25 € bis 40 km, darüber nach Absprache.",
  },
  {
    q: "Arbeiten Sie auch für Unternehmen?",
    a: "Das ist der Schwerpunkt: Websites zum Festpreis ab 499 € und individuelle Software, also Webapps, Dashboards, interne Tools, API-Anbindungen und Automatisierungen. Der Stundensatz für Entwicklung liegt bei 50 €, kleinere Aufgaben starten ab 50 €.",
  },
  {
    q: "Arbeiten Sie nur in München und Wolnzach?",
    a: "Vor Ort ja, im Umkreis von rund 50 km um München und Wolnzach, darunter Ingolstadt, Pfaffenhofen a. d. Ilm, Freising, Dachau, Erding, Geisenfeld, Mainburg und Au in der Hallertau. Websites und Software entstehen überwiegend aus der Ferne und sind an kein Gebiet gebunden.",
  },
  {
    q: "Wie schnell bekomme ich eine Antwort?",
    a: "Anfragen per WhatsApp oder E-Mail werden in der Regel am selben oder am nächsten Werktag beantwortet. Wenn es dringend ist, rufen Sie am besten direkt an.",
  },
  {
    q: "Muss ich online bezahlen?",
    a: "Nein. Ein Anruf, eine E-Mail oder eine WhatsApp-Nachricht genügt. Sie bekommen ein schriftliches Angebot und entscheiden danach.",
  },
];

export const faqWebsites: Faq[] = [
  {
    q: "Welches Paket passt zu meinem Betrieb?",
    a: "Wer vor allem gefunden werden und erreichbar sein will, ist mit dem Starter-Onepager für 499 € richtig. Sobald Leistungen, Preise und Team je eine eigene Seite brauchen, passt Business für 799 € mit bis zu etwa 5 Seiten. Premium für 1.499 € lohnt sich, wenn viele Einzelseiten dazukommen oder Funktionen wie eine Terminbuchung gewünscht sind.",
  },
  {
    q: "Kann ich ohne Online-Zahlung anfragen?",
    a: "Ja, das ist der übliche Weg. Ein Anruf, eine E-Mail oder eine WhatsApp-Nachricht genügt. Sie bekommen ein schriftliches Angebot und entscheiden danach. Eine Online-Zahlung ist für keine Website Voraussetzung.",
  },
  {
    q: "Wie lange dauert eine Website?",
    a: "Sobald Texte, Bilder und Logo vorliegen, braucht ein Onepager in der Regel ein bis zwei Wochen, eine mehrseitige Unternehmenswebsite zwei bis vier Wochen. Den größten Einfluss auf die Dauer haben die Inhalte, nicht die Technik.",
  },
  {
    q: "Können Sie eine bestehende Website überarbeiten?",
    a: "Ja. Bei einem Relaunch werden vorhandene Inhalte übernommen, die Seite neu aufgebaut und die bestehenden Adressen weitergeleitet, damit die Platzierungen bei Google nicht verloren gehen. Der Preis richtet sich nach dem Umfang und startet bei 499 €.",
  },
  {
    q: "Brauche ich Domain und Hosting von Ihnen?",
    a: "Nein. Die Verträge für Domain und Hosting laufen auf Ihren Namen, damit Sie unabhängig bleiben. Die Einrichtung gehört zum Paket, die laufenden Gebühren zahlen Sie direkt beim Anbieter.",
  },
  {
    q: "Bekomme ich die Website übergeben?",
    a: "Ja. Sie erhalten die Zugänge und eine kurze Dokumentation zum Aufbau. Die Seite ist so gebaut, dass sie auch von anderen gepflegt werden kann.",
  },
  {
    q: "Was ist mit Texten und Bildern?",
    a: "Sie können beides liefern, dann ist es im Paketpreis abgedeckt. Fehlen Texte oder Bilder, werden sie nach Aufwand erstellt und vorher getrennt ausgewiesen.",
  },
  {
    q: "Arbeiten Sie auch für Betriebe außerhalb von München und Wolnzach?",
    a: "Ja. Websites entstehen überwiegend aus der Ferne. Gespräche laufen per Telefon oder Video, Entwürfe sehen Sie unter einer Testadresse. Der Standort Ihres Betriebs spielt dafür keine Rolle.",
  },
];

export const faqSoftware: Faq[] = [
  {
    q: "Ab welcher Größe lohnt sich eine Automatisierung?",
    a: "Sobald eine Aufgabe regelmäßig gleich abläuft und pro Woche mehr als eine Stunde kostet, rechnet sich ein Skript meist innerhalb weniger Monate. Ein kleines Python-Skript startet bei 50 €, eine Excel-Automatisierung ebenfalls ab 50 €.",
  },
  {
    q: "Was kostet eine Schnittstelle zwischen zwei Programmen?",
    a: "Eine API-Anbindung startet bei 80 €. Der tatsächliche Aufwand hängt davon ab, wie gut die beteiligten Systeme dokumentiert sind. Nach dem ersten Gespräch bekommen Sie eine Aufwandsschätzung mit Preisrahmen, bevor entwickelt wird.",
  },
  {
    q: "Bekomme ich den Quellcode?",
    a: "Ja. Sie bekommen den Quellcode und eine kurze Dokumentation. Entwickelt wird so, dass die Software auch von anderen gewartet werden kann.",
  },
  {
    q: "Welche Aufgaben lassen sich typischerweise automatisieren?",
    a: "Häufig sind es wiederkehrende Dateiarbeiten: Listen abgleichen, Auswertungen aufbereiten, Berichte zu festen Zeitpunkten erzeugen, Dateien umbenennen oder sortieren, Daten zwischen Shop, ERP und Buchhaltung übertragen.",
  },
  {
    q: "Machen Sie auch größere Softwareprojekte?",
    a: "Der Einstieg ist bewusst klein: ein Werkzeug, das eine konkrete Aufgabe erledigt. Für umfangreichere Vorhaben gibt es nach dem ersten Gespräch ein schriftliches Angebot mit Festpreis oder Aufwandsrahmen, aufgeteilt in Schritte, die einzeln nutzbar sind.",
  },
];

export const faqIt: Faq[] = [
  {
    q: "Was kostet es, einen langsamen PC wieder schneller zu machen?",
    a: "Das Aufräumen eines langsamen Rechners kostet pauschal 35 €. Reicht Software allein nicht aus, ist meist eine SSD oder mehr Arbeitsspeicher die Lösung; der Einbau kostet ab 25 € zuzüglich des Bauteils. Vor dem Einbau erfahren Sie, ob sich das bei dem Gerät noch lohnt.",
  },
  {
    q: "Mein Windows startet nicht mehr. Sind meine Daten weg?",
    a: "Meistens nicht. Wenn Windows nicht mehr startet, ist häufig das System beschädigt, nicht der Datenträger. In vielen Fällen lässt sich das System reparieren, ohne dass Daten verloren gehen. Falls eine Neuinstallation nötig ist (50 €, mit Treibern und Updates 60 €), werden Ihre Dateien vorher gesichert und danach zurückgespielt.",
  },
  {
    q: "Können Sie meinen Drucker oder das WLAN einrichten?",
    a: "Ja. Das Einrichten eines Druckers kostet pauschal 25 €, WLAN und Router 30 €. Dazu gehört, dass die Geräte danach von allen Rechnern im Haushalt aus erreichbar sind und nicht nur von einem.",
  },
  {
    q: "Wie läuft ein Vor-Ort-Termin ab?",
    a: "Sie schildern das Problem per WhatsApp, E-Mail oder Telefon. Sie bekommen vorab eine Einschätzung mit Preisrahmen und einen Terminvorschlag. Der Termin findet bei Ihnen zu Hause oder im Betrieb in München, Wolnzach oder Umgebung statt, wo möglich auch per Fernwartung. Zum Schluss wird in normalen Worten erklärt, was gemacht wurde.",
  },
  {
    q: "Übernehmen Sie auch die Daten von einem alten auf einen neuen PC?",
    a: "Ja. Die Datenübertragung auf ein neues Gerät kostet ab 50 €. Übernommen werden Dateien, Fotos, E-Mail-Konten und die gewohnten Programmeinstellungen, damit der neue Rechner sich anfühlt wie der alte.",
  },
  {
    q: "Lohnt sich eine Reparatur oder soll ich ein neues Gerät kaufen?",
    a: "Das steht vor dem Termin fest, sobald klar ist, um welches Gerät es geht. Wenn eine Reparatur teurer wird als der Restwert, ist das ein klares Nein. Dann gibt es stattdessen eine Kaufberatung (30 €/Stunde), die zum Budget passt.",
  },
  {
    q: "In welchen Orten sind Sie vor Ort?",
    a: "In München, Wolnzach und im Umkreis von rund 50 km, zum Beispiel Ingolstadt, Pfaffenhofen a. d. Ilm, Freising, Dachau, Erding, Garching, Geisenfeld, Mainburg und Au in der Hallertau. Außerhalb ist ein Termin nach Absprache möglich, per Fernwartung ohnehin.",
  },
];

/* ------------------------------------------------------------------ */
/* Vertrauen                                                          */
/* ------------------------------------------------------------------ */

export const trustPoints = [
  { title: "Feste Ansprechpartner", text: "Blagoja Ljubeski für Anfragen und Fragen, Paul Höflich für die Umsetzung. Kein Ticketsystem, keine Warteschleife." },
  { title: "Keine Abos", text: "Websites zum Einmalpreis. Pflege nach dem Livegang wird nach Aufwand abgerechnet." },
  { title: "Transparente Preise", text: "Festpreise und Stundensätze stehen offen auf dieser Website, Anfahrt inklusive." },
  { title: "Ihre Zugänge", text: "Domain und Hosting laufen auf Ihren Namen. Sie bleiben unabhängig." },
  { title: "Saubere Übergabe", text: "Zugänge, Quellcode und eine kurze Dokumentation. Wartbar auch von anderen." },
  { title: "Moderne Technik", text: "Next.js und React statt Baukasten. Schnell, responsiv und für Google vorbereitet." },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                         */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Referenzen: von PJE Systems erstellte Websites                     */
/* Neues Projekt = neuer Eintrag; die Präsentation baut sich daraus.  */
/* `page` ist ein senkrechter Streifen aus Aufnahmen der Website,     */
/* `header` deren Navigation, die im Browserfenster stehen bleibt.    */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  name: string;
  url: string;
  host: string;
  claim: string;
  scope: string[];
  page: { src: string; width: number; height: number };
  header: { src: string; width: number; height: number };
  /** Mobile Ansicht der Website für den Smartphone-Rahmen auf kleinen Bildschirmen */
  mobile: {
    page: { src: string; width: number; height: number };
    header: { src: string; width: number; height: number };
    bar: { src: string; width: number; height: number };
  };
};

export const projects: Project[] = [
  {
    id: "cen-giz",
    name: "CEN-GIZ",
    url: "https://www.cen-giz.de/",
    host: "cen-giz.de",
    claim: "Bundesweite Pannenhilfe und Abschleppkoordination",
    scope: ["Website", "Design", "Development"],
    page: { src: "/assets/projekte/cen-giz-seite.webp", width: 1280, height: 5553 },
    header: { src: "/assets/projekte/cen-giz-header.webp", width: 1280, height: 60 },
    mobile: {
      page: { src: "/assets/projekte/cen-giz-mobil-seite.webp", width: 546, height: 16025 },
      header: { src: "/assets/projekte/cen-giz-mobil-header.webp", width: 546, height: 95 },
      bar: { src: "/assets/projekte/cen-giz-mobil-leiste.webp", width: 546, height: 123 },
    },
  },
];

export const nav = [
  { href: "/leistungen/", label: "Leistungen" },
  { href: "/websites/", label: "Websites" },
  { href: "/leistungen/softwareentwicklung/", label: "Software" },
  { href: "/leistungen/computerhilfe/", label: "IT-Service" },
  { href: "/ueber-uns/", label: "Über uns" },
  { href: "/kontakt/", label: "Kontakt" },
];
