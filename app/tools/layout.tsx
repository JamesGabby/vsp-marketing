import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Outbound Tools",
  description:
    "Free tools for growth teams: an outbound ROI calculator, plus an ICP builder and deliverability audit coming soon. Plan, measure, and optimise your outbound.",
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
