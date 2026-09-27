import type { Metadata } from "next";
import { contact, locations, people, places, serviceRadiusKm, site, type Faq } from "./content";

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "de_DE",
      type: "website",
      images: [{ url: "/opengraph-image/", width: 1200, height: 630, alt: `${site.name}: ${title}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: ["/opengraph-image/"] },
  };
}

const paul = people[0];
const team = people.slice(1);
const personIdOf = (id: string) => `${site.url}/#${id}`;

export const orgId = `${site.url}/#localbusiness`;
export const personId = `${site.url}/#paul-hoeflich`;

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": orgId,
        name: site.name,
        legalName: site.legalName,
        description:
          "Websites, Softwareentwicklung und IT-Service für Unternehmen, Selbstständige und Privatkunden in München, Wolnzach und rund 50 km Umgebung. Websites und Software auch standortunabhängig.",
        url: `${site.url}/`,
        email: contact.email,
        telephone: "+4917655377205",
        priceRange: "€€",
        currenciesAccepted: "EUR",
        slogan: site.slogan,
        knowsLanguage: "de-DE",
        image: `${site.url}${paul.image ?? ""}`,
        logo: `${site.url}/assets/logo-pje-systems.webp`,
        founder: { "@id": personId },
        employee: [{ "@id": personId }, ...team.map((t) => ({ "@id": personIdOf(t.id) }))],
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.street,
          postalCode: contact.zip,
          addressLocality: contact.city,
          addressRegion: "Bayern",
          addressCountry: "DE",
        },
        geo: { "@type": "GeoCoordinates", latitude: 48.6028, longitude: 11.6289 },
        areaServed: [
          ...locations.map((l) => ({
            "@type": "GeoCircle",
            name: `${l.name} und Umgebung`,
            geoMidpoint: { "@type": "GeoCoordinates", latitude: l.lat, longitude: l.lon },
            geoRadius: serviceRadiusKm * 1000,
          })),
          ...[...locations, ...places].map((p) => ({ "@type": "City", name: p.name })),
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "15:00",
            closes: "20:00",
          },
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "18:00" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Leistungen",
          itemListElement: [
            { "@type": "Offer", price: "499", priceCurrency: "EUR", itemOffered: { "@type": "Service", name: "Website Starter (Onepager)" } },
            { "@type": "Offer", price: "799", priceCurrency: "EUR", itemOffered: { "@type": "Service", name: "Website Business (bis ca. 5 Seiten)" } },
            { "@type": "Offer", price: "1499", priceCurrency: "EUR", itemOffered: { "@type": "Service", name: "Website Premium (bis ca. 10 Seiten)" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Softwareentwicklung und Automatisierung" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT-Service und Computerhilfe vor Ort" } },
          ],
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: paul.name,
        jobTitle: paul.jobTitle,
        image: `${site.url}${paul.image ?? ""}`,
        worksFor: { "@id": orgId },
        knowsAbout: paul.knowsAbout,
        address: { "@type": "PostalAddress", addressLocality: "Wolnzach", addressRegion: "Bayern", addressCountry: "DE" },
      },
      ...team.map((t) => ({
        "@type": "Person",
        "@id": personIdOf(t.id),
        name: t.name,
        jobTitle: t.jobTitle,
        worksFor: { "@id": orgId },
      })),
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/`,
        name: site.name,
        inLanguage: "de-DE",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Startseite", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": orgId },
    areaServed: locations.map((l) => ({ "@type": "City", name: l.name })),
  };
}
