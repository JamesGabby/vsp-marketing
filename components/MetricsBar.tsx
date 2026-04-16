"use client"

import { motion } from "framer-motion"

const metrics = [
  { value: "<2%", label: "Bounce Rate" },
  { value: "45%+", label: "Average Open Rate" },
  { value: "12%+", label: "Positive Reply Rate" },
  { value: "200+", label: "Meetings Booked Monthly" },
]

export function MetricsBar() {
  return (
    <section className="border-y border-[--border] bg-[--surface]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-1"
            >
              <span
                className="text-3xl sm:text-4xl font-bold text-[--volt]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {metric.value}
              </span>
              <span className="text-sm text-[--text-secondary] font-medium">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
