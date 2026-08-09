"use client"

import { useEffect, useState } from "react"
import { motion, animate } from "framer-motion"

const metrics = [
  { prefix: "<", target: 2, suffix: "%", label: "Bounce Rate" },
  { prefix: "", target: 4, suffix: "%+", label: "Reply Rate" },
  { prefix: "", target: 20, suffix: "%+", label: "Positive Reply Rate" },
]

function CounterValue({
  target,
  prefix = "",
  suffix = "",
  start,
  delay = 0,
  duration = 1.4,
}: {
  target: number
  prefix?: string
  suffix?: string
  start: boolean
  delay?: number
  duration?: number
}) {
  // Initialise to the real target value so server-rendered markup (and any
  // client that never runs the animation — crawlers, slow JS, no-JS) always
  // shows the true number instead of a placeholder "0". Once this section
  // scrolls into view, the animate() call below drives the value from 0 up
  // to target via its onUpdate callback, so no separate reset effect is needed.
  const [value, setValue] = useState(target)

  useEffect(() => {
    if (!start) return
    const controls = animate(0, target, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [start, target, delay, duration])

  return (
    <span
      className="text-3xl sm:text-4xl font-bold text-[--volt]"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {prefix}
      {value}
      {suffix}
    </span>
  )
}

export function MetricsBar() {
  const [inView, setInView] = useState(false)

  return (
    <section className="relative border-y border-[--border] bg-[--surface] overflow-hidden">
      {/* Volt gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--volt-glow] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onViewportEnter={() => setInView(true)}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 divide-x-0 sm:divide-x divide-[--border]"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-1.5 px-6 py-2"
            >
              <CounterValue
                target={metric.target}
                prefix={metric.prefix}
                suffix={metric.suffix}
                start={inView}
                delay={i * 0.15}
              />
              <span className="text-sm text-[--text-secondary] font-medium">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
        <p className="relative mt-4 text-center text-xs text-[--text-muted]">
          Real numbers from live outbound campaigns we run.
        </p>
      </div>
    </section>
  )
}
