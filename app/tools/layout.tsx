import type { Metadata } from "next"

const description =
  "Free tools for growth teams from Perihelion Growth: an outbound ROI calculator, plus an ICP builder and deliverability audit coming soon. Plan, measure, and optimise your outbound."

export const metadata: Metadata = {
  title: "Free Outbound Tools",
  description,
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    url: "/tools",
    title: "Free Outbound Tools | Perihelion Growth",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Outbound Tools | Perihelion Growth",
    description,
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
