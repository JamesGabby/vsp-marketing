"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, PoundSterling } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {

  return (
    <section className="hero-bg relative flex min-h-[calc(100svh-64px)] items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-[clamp(1.25rem,5vh,3.5rem)]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 border-[--volt]/30 bg-[--volt-glow] pl-2.5 pr-3 sm:pl-3 sm:pr-4 py-1.5 text-[11px] sm:text-xs font-semibold leading-none text-[--volt]"
          >
            <PoundSterling className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            Pay per qualified call held. No retainer, no setup fee.
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2rem] sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-[--text-primary] text-balance mb-3 sm:mb-4"
          >
            Qualified Sales Calls, Booked For You.{" "}
            <span className="text-[--volt]">You Only Pay When They&apos;re Held.</span>
          </motion.h1>

          {/* Sub-tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto max-w-3xl text-[15px] sm:text-lg font-semibold text-[--text-secondary] mb-3"
          >
            We build the pipeline. You close the deals. A call that never happens never costs you a penny.
          </motion.p>

          {/* Deposit terms */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.17 }}
            className="mx-auto mb-2 max-w-2xl text-[13px] sm:text-[15px] text-[--text-secondary] leading-snug"
          >
            You start with a <span className="font-semibold text-[--text-primary]">&pound;500 monthly deposit</span> that gets your campaign built and sending, and you get it back out of the first calls booked. It is a float, not a fee.
          </motion.p>

          {/* Definition of a qualified call */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mx-auto mb-4 sm:mb-5 max-w-2xl text-xs sm:text-sm text-[--text-muted] leading-snug"
          >
            Qualified means a decision-maker at a company matching the ICP we agree in week one, who attends the call.
          </motion.p>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] sm:text-lg text-[--text-secondary] max-w-3xl mx-auto leading-normal sm:leading-relaxed mb-6 sm:mb-7"
          >
            You only take calls with people who genuinely fit your market and have a live reason to buy. Our Qualification Engine researches every prospect across multiple data sources, verifies them against your ICP, and checks for real trigger events before we send a single email. No templates, no spray-and-pray.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center mb-5 sm:mb-6"
          >
            <div className="animate-float w-full sm:w-fit rounded-lg [box-shadow:0_8px_20px_rgba(234,88,12,0.35)] dark:[box-shadow:0_8px_20px_rgba(251,146,60,0.25)]">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="https://calendly.com/perihelion/15mins" target="_blank" rel="noopener noreferrer">
                  Book a 15-Minute Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
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
            className="mb-4 sm:mb-5 text-sm"
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
              { label: "Monthly rolling, cancel any time" },
              { label: "No retainers, no setup fee" },
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
