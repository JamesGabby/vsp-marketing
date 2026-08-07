import type { Metadata } from "next"

const description =
  "Perihelion was founded by James Gabbitus after seeing too many companies burned by lead gen agencies. We built the Signal Engine to deliver qualified meetings, not vanity metrics."

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "/about",
    title: "About Perihelion | B2B Lead Generation Agency",
    description,
    images: [
      { url: "/perihelion-logo-light.png", width: 512, height: 512, alt: "Perihelion" },
    ],
  },
  twitter: {
    card: "summary",
    title: "About Perihelion | B2B Lead Generation Agency",
    description,
    images: ["/perihelion-logo-light.png"],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
