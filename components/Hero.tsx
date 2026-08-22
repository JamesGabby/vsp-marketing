"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  PoundSterling,
  RefreshCw,
  Undo2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// The three terms that make up the offer. Kept as a list rather than prose
// because this is the part visitors scan for before they decide to book.
const offerTerms = [
  {
    icon: CalendarCheck,
    term: "Pay per qualified call held",
    detail: "A call that never happens never reaches your invoice.",
  },
  {
    icon: Undo2,
    term: "£500 monthly deposit",
    detail:
      "Builds the campaign and gets it sending, then comes back to you out of the first calls booked.",
  },
  {
    icon: RefreshCw,
    term: "Monthly rolling",
    detail:
      "No retainer, no setup fee, no lock-in. We re-earn the next month every month.",
  },
]

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
            className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 border-(--volt)/30 bg-(--volt-glow) pl-2.5 pr-3 sm:pl-3 sm:pr-4 py-1.5 text-[11px] sm:text-xs font-semibold leading-none text-(--volt)"
          >
            <PoundSterling className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            Outbound priced on outcomes, not activity
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2rem] sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-(--text-primary) text-balance mb-3 sm:mb-4"
          >
            We Book the Sales Calls.{" "}
            <span className="text-(--volt) sm:block">You Only Pay When They Happen.</span>
          </motion.h1>

          {/* Sub-tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto max-w-2xl text-[15px] sm:text-lg text-(--text-secondary) leading-normal sm:leading-relaxed mb-6 sm:mb-7"
          >
            Every prospect is researched across multiple sources, verified against your ICP, and showing a live reason to buy before we send a single email. You take the calls. We take the risk.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center mb-3"
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

          {/* Definition of a qualified call */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mb-6 sm:mb-8 max-w-xl text-xs text-(--text-muted) leading-snug"
          >
            Qualified means a decision-maker at a company matching the ICP we agree in week one, who attends the call.
          </motion.p>

          {/* Offer terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-5 sm:mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left"
          >
            {offerTerms.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.term}
                  className="rounded-xl border-2 border-(--border) bg-(--surface)/70 p-4 backdrop-blur-sm"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-(--volt)" />
                    <span className="text-sm font-bold tracking-tight text-(--text-primary)">
                      {item.term}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-(--text-secondary)">
                    {item.detail}
                  </p>
                </div>
              )
            })}
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-(--text-muted)"
          >
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-(--volt)" />
              Compliance built in (GDPR, CAN-SPAM)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-(--volt)" />
              Founder-led, never farmed out
            </span>
            <Link
              href="/blog/inside-the-signal-engine"
              className="inline-flex items-center gap-1.5 font-medium text-(--volt) hover:underline underline-offset-4"
            >
              How the Qualification Engine works
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
