"use client"

import { motion } from "framer-motion"
import { Handshake, MessageSquareWarning, Scale, Star } from "lucide-react"

const differentiators = [
  {
    icon: Handshake,
    title: "Sales-Aware Handoffs",
    description:
      "We don't just toss a \u201cmeeting booked\u201d notification. We provide prospect context, what resonated, and can join early calls to ensure a warm transition.",
  },
  {
    icon: MessageSquareWarning,
    title: "Willingness to Disqualify",
    description:
      "If your offer, pricing, or positioning is the bottleneck, we'll tell you. We're a strategic partner, not a volume vendor — your success is our success.",
  },
  {
    icon: Scale,
    title: "Compliance Built In",
    description:
      "GDPR, CAN-SPAM, and evolving regulations. We stay on top of it so you never face legal or reputational risk from your outbound activity.",
  },
  {
    icon: Star,
    title: "Quality Over Quantity",
    description:
      "We use strict qualification criteria to deliver real sales-qualified leads. Vanity metrics look good in a deck — booked meetings that close look good on a P&L.",
  },
]

export function Differentiators() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[--text-primary] mb-4">
              Not Your Typical{" "}
              <span className="text-[--volt]">Lead Gen Shop</span>
            </h2>
            <p className="text-lg text-[--text-secondary] leading-relaxed mb-8">
              Most agencies measure success by activity. We measure it by revenue
              impact — and we're built top to bottom to deliver that.
            </p>
            {/* Visual accent — horizontal rule with volt dot */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[--border]" />
              <div className="h-2 w-2 rounded-full bg-[--volt]" />
              <div className="h-px flex-1 bg-[--border]" />
            </div>
          </motion.div>

          {/* Cards side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {differentiators.map((d, i) => {
              const Icon = d.icon
              return (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-xl border-2 border-[--border] bg-[--surface] p-5 shadow-sm dark:shadow-none hover:border-[--volt]/40 hover:bg-[--volt-glow] transition-all duration-300"
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[--background] border-2 border-[--border]">
                    <Icon className="h-4 w-4 text-[--volt]" />
                  </div>
                  <h3 className="text-sm font-bold text-[--text-primary] mb-1.5 tracking-tight">
                    {d.title}
                  </h3>
                  <p className="text-xs text-[--text-secondary] leading-relaxed">
                    {d.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
