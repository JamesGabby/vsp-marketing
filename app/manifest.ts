import type { MetadataRoute } from "next"
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from "@/lib/seo"

// Replaces the old app/site.webmanifest, which was never actually served:
// non-route files in app/ are ignored, so /site.webmanifest returned a 404.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ea580c",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
