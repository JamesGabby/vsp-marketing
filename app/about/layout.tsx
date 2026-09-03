import type { Metadata } from "next"
import {
  FOUNDER_ID,
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
  breadcrumbSchema,
  jsonLdGraph,
} from "@/lib/seo"

const description =
  "Perihelion Growth was founded by James Gabbitus after seeing too many companies burned by lead gen agencies. We built the Qualification Engine to deliver qualified meetings, not vanity metrics."

const title = `About ${SITE_NAME} | B2B Lead Generation Agency`

export const metadata: Metadata = {
  // Absolute so the brand name isn't duplicated by the "%s | Perihelion Growth"
  // template.
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "/about",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            {
              "@type": "AboutPage",
              "@id": `${SITE_URL}/about#webpage`,
              url: `${SITE_URL}/about`,
              name: title,
              description,
              inLanguage: "en-GB",
              // The page is *about* the company, which is how Google links an
              // About page to the brand entity behind a branded search.
              mainEntity: { "@id": ORGANIZATION_ID },
              about: [{ "@id": ORGANIZATION_ID }, { "@id": FOUNDER_ID }],
            },
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />
      {children}
    </>
  )
}
