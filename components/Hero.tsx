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
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border-2 border-[--border] bg-[--surface] pl-2.5 pr-4 py-1.5 text-xs font-medium leading-none text-[--text-secondary]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[--volt] animate-pulse" />
            B2B Outbound Agency
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
            VoltScale Partners is a B2B outbound agency that books qualified meetings
            with your ideal customers — through precision targeting, human-sounding
            outreach, and multi-channel orchestration.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg">
              <Link href="https://calendly.com/voltscalepartners/15mins" target="_blank" rel="noopener noreferrer">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#process">
                See How We Work
                <ChevronDown className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
