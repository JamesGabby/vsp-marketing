"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactCTA() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-[--surface] overflow-hidden volt-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[--volt]/30 bg-[--volt-glow] px-3 py-1 text-xs font-semibold text-[--volt]">
            Get Started
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[--text-primary] mb-4">
            Ready to Build{" "}
            <span className="text-[--volt]">Predictable Pipeline?</span>
          </h2>
          <p className="text-lg text-[--text-secondary] leading-relaxed mb-8">
            Stop guessing where your next customer will come from. Let&apos;s build
            an outbound engine that fills your calendar with qualified conversations.
          </p>
          <Button asChild size="lg">
            <Link href="https://calendly.com/voltscalepartners/15mins" target="_blank" rel="noopener noreferrer">
              Book Your Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 max-w-xl mx-auto mb-12">
          <div className="h-px flex-1 bg-[--border]" />
          <span className="text-xs font-medium text-[--text-muted] uppercase tracking-wider">
            or send us a message
          </span>
          <div className="h-px flex-1 bg-[--border]" />
        </div>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto flex flex-col gap-4 rounded-2xl border-2 border-[--border] bg-[--background] p-6 sm:p-8 shadow-sm dark:shadow-none"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Contact form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide"
              >
                Name
              </label>
              <Input id="name" placeholder="Alex Johnson" autoComplete="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="company"
                className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide"
              >
                Company
              </label>
              <Input id="company" placeholder="Acme Corp" autoComplete="organization" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide"
            >
              Work Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="alex@acmecorp.com"
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide"
            >
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Tell us about your target market, current pipeline situation, and what you're hoping to achieve..."
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send Message
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>
      </div>
    </section>
  )
}
