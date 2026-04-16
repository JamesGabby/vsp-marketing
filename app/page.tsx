import { Hero } from "@/components/Hero"
import { MetricsBar } from "@/components/MetricsBar"
import { ServicesGrid } from "@/components/ServicesGrid"
import { ProcessTimeline } from "@/components/ProcessTimeline"
import { Differentiators } from "@/components/Differentiators"
import { ContactCTA } from "@/components/ContactCTA"

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsBar />
      <ServicesGrid />
      <ProcessTimeline />
      <Differentiators />
      <ContactCTA />
    </>
  )
}
