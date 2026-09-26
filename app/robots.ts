import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

// The AI crawlers are named explicitly rather than left to the wildcard.
// Functionally the wildcard already allows them, but naming them records the
// intent: we want this site read, quoted, and cited by answer engines, and a
// future tightening of the wildcard should not silently take that away.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI, training and retrieval
  "OAI-SearchBot", // ChatGPT search results
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini grounding and AI Overviews
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
  "CCBot", // Common Crawl, which seeds many other models
  "cohere-ai",
  "DuckAssistBot",
  "Amazonbot",
  "YouBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
