import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// Wie bisher: alle Crawler inklusive KI-Suchdienste zugelassen
const bots = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "meta-externalagent", "Amazonbot",
  "cohere-ai", "DuckAssistBot", "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...bots.map((b) => ({ userAgent: b, allow: "/" }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
