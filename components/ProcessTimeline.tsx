"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Discovery & ICP Workshop",
    description:
      "Deep-dive into your business, customers, and competitive landscape. We leave with a crystal-clear picture of who we're targeting and why they'll care.",
  },
  {
    number: "02",
    title: "Infrastructure Setup",
    description:
      "Domains, mailboxes, warmup, tech stack configured for maximum deliverability. We don't send a single email until the foundation is solid.",
  },
  {
    number: "03",
    title: "Campaign Build",
    description:
      "Copywriting, sequencing, audience segmentation, channel strategy. Every message is crafted with the target persona in mind — not a template.",
  },
  {
    number: "04",
    title: "Launch & Iterate",
    description:
      "Go live, monitor performance, A/B test relentlessly, optimize weekly. Outbound is a living system, not a set-and-forget campaign.",
  },
  {
    number: "05",
    title: "Scale & Expand",
    description:
      "Double down on what works, expand into new segments and channels. When something converts, we build on it systematically.",
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
            className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-[--border]"
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
                <div className="lg:hidden absolute left-0 top-0 bottom-0 w-px bg-[--border]" />

                {/* Step number bubble */}
                <div className="relative z-10 mb-4 lg:mb-6 self-start lg:self-center pl-6 lg:pl-0">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[--background] border border-[--border] lg:mx-auto">
                    <span
                      className="text-lg font-bold text-[--volt]"
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
