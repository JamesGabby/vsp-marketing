"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Inbox, UserSearch, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ROICalculator } from "@/components/tools/roi-calculator/ROICalculator"

const comingSoonTools = [
  {
    icon: UserSearch,
    title: "ICP Builder",
    description:
      "Define and score your ideal customer profile with guided prompts across firmographic, technographic, and behavioral signals.",
  },
  {
    icon: Inbox,
    title: "Deliverability Audit",
    description:
      "Check your domain reputation, SPF/DKIM/DMARC configuration, and inbox placement score before your next campaign.",
  },
]

export default function ToolsPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[--text-primary] mb-4">
            Tools for{" "}
            <span className="text-[--volt]">Growth Teams</span>
          </h1>
          <p className="text-lg text-[--text-secondary] leading-relaxed">
            Free resources to help you plan, measure, and optimise your outbound engine.
          </p>
        </motion.div>

        {/* ROI Calculator — featured */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <ROICalculator />
        </motion.div>

        {/* Coming soon tools */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16"
        >
          {comingSoonTools.map((tool, i) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="rounded-2xl border-2 border-[--border] bg-[--surface] p-6 opacity-60 pointer-events-none select-none shadow-sm dark:shadow-none"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[--background] border-2 border-[--border]">
                    <Icon className="h-5 w-5 text-[--text-muted]" />
                  </div>
                  <Badge variant="muted">Coming Soon</Badge>
                </div>
                <h3 className="text-base font-bold text-[--text-primary] mb-2 tracking-tight">
                  {tool.title}
                </h3>
                <p className="text-sm text-[--text-secondary] leading-relaxed">
                  {tool.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Email capture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[--surface] border-2 border-[--border] mx-auto">
            <Bell className="h-5 w-5 text-[--volt]" />
          </div>
          <h2 className="text-xl font-bold text-[--text-primary] mb-2 mt-3">
            Get notified when tools launch
          </h2>
          <p className="text-sm text-[--text-secondary] mb-6">
            Drop your email and we&apos;ll let you know the moment they&apos;re live.
          </p>
          {submitted ? (
            <div className="rounded-lg border-2 border-[--volt]/40 bg-[--volt-glow] px-5 py-4 text-sm font-medium text-[--volt]">
              You&apos;re on the list — we&apos;ll be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">Notify Me</Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
