import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Kurz-URLs und naheliegende Tippvarianten auf die bestehenden, bei Google indexierten Adressen leiten.
    return [
      { source: "/computerhilfe", destination: "/leistungen/computerhilfe/", permanent: true },
      { source: "/it-service", destination: "/leistungen/computerhilfe/", permanent: true },
      { source: "/leistungen/it-service", destination: "/leistungen/computerhilfe/", permanent: true },
      { source: "/software", destination: "/leistungen/softwareentwicklung/", permanent: true },
      { source: "/softwareentwicklung", destination: "/leistungen/softwareentwicklung/", permanent: true },
      { source: "/leistungen/websites", destination: "/websites/", permanent: true },
      { source: "/webdesign", destination: "/websites/", permanent: true },
      { source: "/about", destination: "/ueber-uns/", permanent: true },
      { source: "/team", destination: "/ueber-uns/", permanent: true },
      { source: "/termin", destination: "/kontakt/", permanent: true },
    ];
  },
};

export default nextConfig;
