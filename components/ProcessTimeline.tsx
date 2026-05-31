"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "ICP Definition & Engine Training",
    description:
      "We work closely with you to define your ideal customer profile down to firmographic, technographic, and behavioral signals. We then train the qualification engine specifically on your ICP and offer.",
  },
  {
    number: "02",
    title: "Lead List Building & Verification",
    description:
      "We scrape leads matching your ICP across multiple data sources, cross-reference them, and double-verify every email address before anything enters the engine. Clean data is non-negotiable.",
  },
  {
    number: "03",
    title: "AI Qualification & Deep Research",
    description:
      "Our AI agent researches each prospect across multiple sources, detects buying signals relevant to your offer, and qualifies or disqualifies them against your ICP. Only genuinely qualified leads move forward.",
  },
  {
    number: "04",
    title: "Infrastructure Setup & Outreach",
    description:
      "Dedicated sending domains, expert DNS config, inbox warm-up, and daily health monitoring — so emails always land in the primary inbox. We then run personalised, research-based outreach to every qualified prospect.",
  },
  {
    number: "05",
    title: "Inbox Management & Handoffs",
    description:
      "We handle all replies and back-and-forth with interested leads, book them directly onto your calendar, and provide full context on each prospect. You just show up and close.",
  },
]

export function ProcessTimeline() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[--surface]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[--volt]/30 bg-[--volt-glow] px-3 py-1 text-xs font-semibold text-[--volt]">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[--text-primary] mb-4">
            Our <span className="text-[--volt]">Process</span>
          </h2>
          <p className="text-lg text-[--text-secondary] leading-relaxed">
            From zero to a booked calendar — a repeatable, transparent system
            built around your specific market.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — hidden on mobile */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[--volt]/40 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col"
              >
                {/* Mobile: left-border accent */}
                <div className="lg:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[--volt]/60 to-[--volt]/10" />

                {/* Step number bubble */}
                <div className="relative z-10 mb-4 lg:mb-6 self-start lg:self-center pl-6 lg:pl-0">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[--volt] lg:mx-auto shadow-sm">
                    <span
                      className="text-lg font-bold text-[--volt-foreground]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pl-6 lg:pl-0 lg:text-center">
                  <h3 className="text-base font-bold text-[--text-primary] mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[--text-secondary] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
