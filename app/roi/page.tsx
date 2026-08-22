"use client"

import { motion } from "framer-motion"
import { ROIValueCalculator } from "@/components/tools/roi-value/ROIValueCalculator"

export default function ROIPage() {
  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-(--text-primary) sm:text-4xl lg:text-5xl">
            What outbound is <span className="text-(--volt)">actually worth</span>
          </h1>
          <p className="text-lg leading-relaxed text-(--text-secondary)">
            Set the numbers your board argues about, and watch the return curve move.
            Meetings held, close rate, and what a customer is worth gross and net, priced
            the way we actually charge: per qualified meeting held.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ROIValueCalculator />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-(--text-muted)"
        >
          Lifetime value is recognised at the point a customer signs, so the curve shows
          contracted value rather than cash collected. Meeting fees are billed as meetings
          are held, so the spend line follows the same first-quarter ramp as the meetings;
          only the tooling fee accrues evenly. Because the largest cost scales with volume,
          the ROI percentage is driven by your close rate and lifetime value, while the
          meeting count sets the size of the prize. Figures are an illustration, not a
          forecast.
        </motion.p>
      </div>
    </div>
  )
}
