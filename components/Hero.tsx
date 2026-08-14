"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, PoundSterling } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {

  return (
    <section className="hero-bg relative flex min-h-[calc(100vh-64px)] items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-[--volt]/30 bg-[--volt-glow] pl-3 pr-4 py-1.5 text-xs font-semibold leading-none text-[--volt]"
          >
            <PoundSterling className="h-3.5 w-3.5" />
            Pay per qualified meeting held, not a flat retainer
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-[--text-primary] mb-3"
          >
            10 Qualified Sales Calls in 90 Days.{" "}
            <span className="text-[--volt]">Guaranteed.</span>
          </motion.h1>

          {/* Sub-tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-lg font-semibold text-[--text-secondary] mb-4"
          >
            We build the pipeline. You close the deals. If we fall short, we work for free until we get you there.
          </motion.p>

          {/* Definition of a qualified call */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mx-auto mb-6 max-w-xl text-sm text-[--text-muted] leading-relaxed"
          >
            Qualified means a decision-maker at a company matching the ICP we agree in week one, who attends the call.
          </motion.p>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[--text-secondary] max-w-2xl mx-auto leading-relaxed mb-8"
          >
            You only take calls with people who genuinely fit your market and have a live reason to buy. Our Qualification Engine researches every prospect across multiple data sources, verifies them against your ICP, and checks for real trigger events before we send a single email. No templates, no spray-and-pray.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <div className="animate-float w-fit rounded-lg mx-auto sm:mx-0 [box-shadow:0_8px_20px_rgba(234,88,12,0.35)] dark:[box-shadow:0_8px_20px_rgba(251,146,60,0.25)]">
              <Button asChild size="lg">
                <Link href="https://calendly.com/perihelion/15mins" target="_blank" rel="noopener noreferrer">
                  Book a 15-Minute Call
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

          {/* Qualification Engine link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 text-sm"
          >
            <Link
              href="/blog/inside-the-signal-engine"
              className="inline-flex items-center gap-1.5 text-[--volt] hover:underline underline-offset-4 font-medium"
            >
              Read how the Qualification Engine works
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
              { label: "Compliance built in (GDPR, CAN-SPAM)" },
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
