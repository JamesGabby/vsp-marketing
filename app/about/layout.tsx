import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "Perihelion was founded by James Gabbitus after seeing too many companies burned by lead gen agencies. We built the Signal Engine to deliver qualified meetings, not vanity metrics.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
