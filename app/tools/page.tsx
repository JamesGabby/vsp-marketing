"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ROICalculator } from "@/components/tools/roi-calculator/ROICalculator"

export default function ToolsPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || sending) return
    setSending(true)
    setError(false)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Tools launch notification signup",
          email,
          message: `${email} asked to be notified when the free tools launch.`,
        }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
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
              You&apos;re on the list. We&apos;ll be in touch.
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Notify Me"}
                </Button>
              </form>
              {error && (
                <p className="mt-3 text-sm text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
