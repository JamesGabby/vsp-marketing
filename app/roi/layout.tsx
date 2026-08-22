import type { Metadata } from "next"

const description =
  "Model the return on a year of outbound: qualified meetings held, close rate, gross and net customer lifetime value, and the point where returns overtake spend."

// This page is deliberately unlinked and kept out of the sitemap, so it is also
// kept out of the index. Remove the robots block if it ever goes public.
export const metadata: Metadata = {
  title: "ROI Calculator",
  description,
  robots: {
    index: false,
    follow: false,
  },
}

export default function ROILayout({ children }: { children: React.ReactNode }) {
  return children
}
