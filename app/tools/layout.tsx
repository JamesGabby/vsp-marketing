import type { Metadata } from "next"

const description =
  "Free tools for growth teams: an outbound ROI calculator, plus an ICP builder and deliverability audit coming soon. Plan, measure, and optimise your outbound."

export const metadata: Metadata = {
  title: "Free Outbound Tools",
  description,
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    url: "/tools",
    title: "Free Outbound Tools | Perihelion",
    description,
    images: [
      { url: "/perihelion-logo-light.png", width: 512, height: 512, alt: "Perihelion" },
    ],
  },
  twitter: {
    card: "summary",
    title: "Free Outbound Tools | Perihelion",
    description,
    images: ["/perihelion-logo-light.png"],
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
