"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {

  return (
    <section className="hero-bg relative flex min-h-[calc(100vh-64px)] items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-[--volt]/30 bg-[--volt-glow] pl-2.5 pr-4 py-1.5 text-xs font-semibold leading-none text-[--volt]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[--volt] animate-pulse" />
            Perihelion: Closest Approach to Your Next Deal
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-[--text-primary] mb-6"
          >
            We Build the Pipeline.{" "}
            <span className="text-[--volt]">You Close the Deals.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[--text-secondary] max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Every prospect we contact has already been through our Lead Intelligence Engine: researched across multiple data sources, verified against your ICP, and showing real event triggers. Outreach built from that research books the meetings. No templates, no spray-and-pray.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <div className="animate-float w-fit rounded-lg mx-auto sm:mx-0 [box-shadow:0_8px_20px_rgba(234,88,12,0.35)] dark:[box-shadow:0_8px_20px_rgba(251,146,60,0.25)]">
              <Button asChild size="lg">
                <Link href="https://calendly.com/perihelion/15mins" target="_blank" rel="noopener noreferrer">
                  Book a Free Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <Button asChild variant="outline" size="lg">
              <a href="#process">
                See How We Work
                <ChevronDown className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          {/* Lead Intelligence Engine link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 text-sm"
          >
            <Link
              href="/blog/inside-the-signal-engine"
              className="inline-flex items-center gap-1.5 text-[--volt] hover:underline underline-offset-4 font-medium"
            >
              Read how the Lead Intelligence Engine works
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.p>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-start justify-center gap-x-6 gap-y-2 text-xs text-[--text-muted]"
          >
            {[
              { label: "No long-term contracts" },
              { label: "10 qualified calls in 90 days guaranteed" },
              { label: "Pay per qualified meeting held" },
            ].map((item) => (
              <span key={item.label} className="flex flex-col">
                <span className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[--volt]" />
                  {item.label}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
