import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteMotion } from "@/components/motion/SiteMotion";
import { Cursor } from "@/components/motion/Cursor";
import { MistScene } from "@/components/scene/MistScene";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/ui/JsonLd";
import { businessJsonLd } from "@/lib/seo";
import { site } from "@/lib/content";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Websites, Software & IT in München und Wolnzach | PJE Systems",
    template: "%s | PJE Systems",
  },
  description:
    "PJE Systems: Websites zum Festpreis ab 499 €, individuelle Software und IT-Service vor Ort in München, Wolnzach und rund 50 km Umgebung.",
  applicationName: site.name,
  authors: [{ name: "Paul Höflich" }],
  creator: "PJE Systems",
  formatDetection: { telephone: false },
  openGraph: { siteName: site.name, locale: "de_DE", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#e3e5e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Markiert JS-Verfügbarkeit vor dem ersten Paint, damit Reveal-Zustände nicht flackern */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement,n=navigator;d.classList.add('js');if(n.connection&&n.connection.saveData)d.classList.add('lite');" +
              // Intro nur auf der Startseite, höchstens einmal pro Woche und nie bei reduzierter Bewegung
              "try{var k='pje-intro',t=+localStorage.getItem(k)||0;if(location.pathname==='/'&&Date.now()-t>6048e5&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!d.classList.contains('lite')){d.classList.add('intro-play');localStorage.setItem(k,String(Date.now()));setTimeout(function(){d.classList.remove('intro-play')},3600)}}catch(e){}",
          }}
        />
      </head>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <MistScene />
        <Header />
        <main id="inhalt" className="relative isolate">{children}</main>
        <Footer />
        <SmoothScroll />
        <SiteMotion />
        <WhatsAppFloat />
        <Cursor />
        <JsonLd data={businessJsonLd()} />
      </body>
    </html>
  );
}
