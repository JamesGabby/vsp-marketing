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
export const COMPANY_LINKEDIN = "https://www.linkedin.com/company/perihelion-growth"

export const SITE_DESCRIPTION =
  "Perihelion Growth is a B2B lead generation agency that books qualified sales calls. Every prospect is researched, verified against your ICP, and showing a real trigger event before we send a single email. You pay per qualified call held. No retainers, no setup fee, monthly rolling."

export const LOGO_URL = `${SITE_URL}/perihelion-logo-light.png`

/**
 * Shared Open Graph image. Next replaces the *entire* parent `openGraph`
 * object when a child segment defines its own, which silently drops the
 * file-convention image from app/opengraph-image.tsx. Every segment that sets
 * `openGraph` must spread this in, or its share card ships without an image.
 */
export const openGraphImage = {
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Perihelion Growth | B2B Lead Generation Agency",
    },
  ],
}

/** Stable @id values so the graph nodes can reference one another. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const FOUNDER_ID = `${SITE_URL}/about#james-gabbitus`
export const SERVICE_ID = `${SITE_URL}/#service`

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
  // the web. Add further company profiles here as they go live.
  sameAs: [COMPANY_LINKEDIN],
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

/**
 * The offer itself, as a machine-readable node. Pricing is the single most
 * common question asked about an agency, and until now it existed only as
 * prose in the hero, which answer engines cannot quote with confidence.
 */
export const serviceSchema = {
  "@type": "Service",
  "@id": SERVICE_ID,
  name: "Pay-per-qualified-call B2B lead generation",
  serviceType: "B2B lead generation",
  description:
    "Outbound prospecting priced on outcomes. Every prospect is researched across multiple sources, verified against your ICP, and showing a live trigger event before we send a single email. You pay per qualified call held, on a monthly rolling basis with no retainer and no setup fee.",
  provider: { "@id": ORGANIZATION_ID },
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United States" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "B2B small and medium-sized enterprises",
  },
  offers: {
    "@type": "Offer",
    "@id": `${SITE_URL}/#offer`,
    name: "Monthly rolling, pay per qualified call held",
    description:
      "A GBP 500 monthly deposit, credited in full against your first qualified calls. Beyond the deposit you pay per qualified call held. No retainer, no setup fee, no lock-in.",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: 500,
      priceCurrency: "GBP",
      billingIncrement: 1,
      unitText: "MONTH",
      description:
        "Monthly deposit, credited in full against the first qualified calls held.",
    },
    availability: "https://schema.org/InStock",
    url: SITE_URL,
    seller: { "@id": ORGANIZATION_ID },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "What we do",
    itemListElement: [
      "ICP research and targeting",
      "Cold email campaigns",
      "Research-backed personalisation",
      "Deliverability and sending infrastructure",
      "Data sourcing and enrichment",
      "Reply handling and meeting handoffs",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
}

/**
 * Question-shaped answers to the things prospects actually ask. These exist
 * because answer engines retrieve passages that match a question, and the same
 * facts written as prose elsewhere on the site do not get retrieved for
 * "how much does Perihelion Growth cost" or "what counts as a qualified call".
 *
 * Every answer here must stay true to the copy it is drawn from. If the offer
 * changes, change it here too.
 */
export const faqs: Array<{ question: string; answer: string }> = [
  {
    question: "How much does Perihelion Growth cost?",
    answer:
      "You pay a £500 monthly deposit, which is credited in full against your first qualified calls, so those calls arrive already paid for. Beyond the deposit you pay per qualified call held. There is no retainer, no setup fee, and no lock-in: the arrangement is monthly rolling, so we re-earn the next month every month.",
  },
  {
    question: "What counts as a qualified call?",
    answer:
      "A qualified call is one with a decision-maker at a company matching the ICP we agree in week one, who actually attends the call. A call that never happens never reaches your invoice.",
  },
  {
    question: "How is pay-per-call different from a retainer lead generation agency?",
    answer:
      "A retainer agency is paid for activity whether or not that activity produces meetings, which puts the risk on you. We are paid for qualified calls that are held, which puts the risk on us. You take the calls, we take the risk.",
  },
  {
    question: "What is the Qualification Engine?",
    answer:
      "The Qualification Engine is the research and personalisation system behind every campaign. We train it on your ICP and your offer, then it researches each prospect across multiple data sources, verifies they genuinely fit that ICP, checks for live trigger events, and produces research-based messaging for each prospect that makes the cut. Every prospect gets an explicit verdict with a written reason, so disqualifications can be reviewed and used to sharpen the ICP.",
  },
  {
    question: "Which outbound channels do you use?",
    answer:
      "Cold email is our core speciality and the channel we have engineered from the ground up. For clients who want to go further, we can layer LinkedIn outreach and cold calling on top.",
  },
  {
    question: "Who do you work with?",
    answer:
      "B2B small and medium-sized businesses selling to other businesses, in the United Kingdom and the United States. We define the ideal customer profile with you in week one, down to firmographic, technographic, and behavioural signals.",
  },
  {
    question: "Is your outbound GDPR compliant?",
    answer:
      "Yes. Compliance with GDPR, CAN-SPAM, and evolving regulations is built into how we run campaigns, so you do not face legal or reputational risk from your outbound activity.",
  },
  {
    question: "Do you track email opens?",
    answer:
      "No, deliberately. Tracking pixels damage deliverability, and opens do not close deals. We report on reply rates, positive replies, and meetings booked, broken down by segment, angle, and channel.",
  },
  {
    question: "Is the work outsourced?",
    answer:
      "No. Every campaign is founder-led and never farmed out. We also handle all replies and the back-and-forth with interested leads, book them directly onto your calendar, and hand over full context on each prospect.",
  },
  {
    question: "What results do you see?",
    answer:
      "Across the live outbound campaigns we run, bounce rates stay under 2%, reply rates run above 3%, and above 40% of those replies are positive. We keep bounce rates low by cross-referencing multiple data sources and double-verifying every email address before it enters the Qualification Engine.",
  },
]

/** Wraps the FAQ list in the FAQPage node answer engines look for. */
export const faqSchema = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}
