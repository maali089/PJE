import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/websites/", priority: 0.95, changeFrequency: "monthly" },
  { path: "/leistungen/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/leistungen/computerhilfe/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/leistungen/softwareentwicklung/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/preise/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ueber-uns/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/kontakt/", priority: 0.8, changeFrequency: "yearly" },
  { path: "/impressum/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/datenschutz/", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified, changeFrequency: p.changeFrequency, priority: p.priority }));
}
