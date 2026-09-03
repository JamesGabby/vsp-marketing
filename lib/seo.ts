// Single source of truth for brand and structured-data constants.
//
// The naming split here is deliberate, so please keep it:
//
//   SITE_SHORT_NAME ("Perihelion")      the brand identity, everywhere a human
//                                       reads it: nav wordmark, headings, logo
//                                       alt text, footer, copyright.
//
//   SITE_NAME ("Perihelion Growth")     the search identity, in machine-read
//                                       surfaces only: <title>, meta
//                                       description, og:site_name, JSON-LD, and
//                                       the web manifest.
//
// The reason for the split: "perihelion" on its own is an astronomy term with
// enormous competition, so the site would be buried under science results.
// "perihelion growth" is a far narrower query that the domain already matches
// exactly, which makes it the term worth ranking for. Google builds the site
// name it shows in results from the homepage <title>, og:site_name, the WebSite
// schema below, and the manifest name, so all four say "Perihelion Growth"
// while the visual brand stays short.

export const SITE_NAME = "Perihelion Growth"
export const SITE_SHORT_NAME = "Perihelion"
export const SITE_URL = "https://periheliongrowth.com"
export const SITE_EMAIL = "contact@periheliongrowth.com"
export const FOUNDER_NAME = "James Gabbitus"
export const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/jamesgabbitus/"

export const SITE_DESCRIPTION =
  "Perihelion Growth is a B2B lead generation agency that books qualified sales calls. Every prospect is researched, verified against your ICP, and showing a real trigger event before we send a single email. You pay per qualified call held. No retainers, no setup fee, monthly rolling."

export const LOGO_URL = `${SITE_URL}/perihelion-logo-light.png`

/** Stable @id values so the graph nodes can reference one another. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const FOUNDER_ID = `${SITE_URL}/about#james-gabbitus`

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  // Both the short display name and the bare domain, so Google can match the
  // brand however a searcher types it.
  alternateName: [SITE_SHORT_NAME, "Perihelion Growth Agency", "periheliongrowth.com"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: LOGO_URL,
    width: 512,
    height: 512,
    caption: SITE_NAME,
  },
  image: { "@id": `${SITE_URL}/#logo` },
  description: SITE_DESCRIPTION,
  slogan: "We book the sales calls. You only pay when they happen.",
  founder: { "@id": FOUNDER_ID },
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United States" },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
  },
  knowsAbout: [
    "B2B lead generation",
    "Outbound sales",
    "Cold email",
    "B2B appointment setting",
    "Ideal customer profile (ICP) definition",
    "Sales pipeline development",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE_EMAIL,
    contactType: "sales",
    availableLanguage: "English",
  },
  // sameAs is the strongest signal tying this site to the brand entity across
  // the web. Add company profiles here as they go live.
  sameAs: [FOUNDER_LINKEDIN],
}

export const founderSchema = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: FOUNDER_NAME,
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/james-gabbitus.png`,
  jobTitle: "Founder",
  description:
    "Founder of Perihelion Growth. MSc Computer Science. Built the Qualification Engine, the research and personalisation system behind every campaign.",
  worksFor: { "@id": ORGANIZATION_ID },
  sameAs: [FOUNDER_LINKEDIN],
}

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  // Google derives the site name shown in search results from this pair.
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en-GB",
}

/** Wraps schema nodes in the JSON-LD envelope Google expects. */
export function jsonLdGraph(...nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes })
}

/** Builds a BreadcrumbList from ordered [name, path] pairs. */
export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  }
}
