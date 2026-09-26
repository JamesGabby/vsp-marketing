import { Hero } from "@/components/Hero"
import { MetricsBar } from "@/components/MetricsBar"
import { VSLVideo } from "@/components/VSLVideo"
import { ServicesGrid } from "@/components/ServicesGrid"
import { ProcessTimeline } from "@/components/ProcessTimeline"
import { Differentiators } from "@/components/Differentiators"
import { FAQ } from "@/components/FAQ"
import { ContactCTA } from "@/components/ContactCTA"
import { faqSchema, jsonLdGraph, serviceSchema } from "@/lib/seo"

export default function HomePage() {
  return (
    <>
      {/* The Organization, WebSite, and Person nodes come from the root
          layout. These two are page-specific: what we sell and what it costs,
          and the questions answer engines get asked about it. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(serviceSchema, faqSchema),
        }}
      />
      <Hero />
      <MetricsBar />
      <VSLVideo />
      <ServicesGrid />
      <ProcessTimeline />
      <Differentiators />
      <FAQ />
      <ContactCTA />
    </>
  )
}
