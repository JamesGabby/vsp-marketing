"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamPlaceholders = [
  { initials: "JS", name: "Jamie Sullivan", role: "Founder & Head of Strategy" },
  { initials: "MR", name: "Morgan Reid", role: "Head of Outbound Operations" },
  { initials: "CC", name: "Casey Chen", role: "Lead Copywriter" },
  { initials: "DP", name: "Drew Parker", role: "Data & Enrichment Lead" },
]

const values = [
  {
    title: "Strategic Partner, Not a Vendor",
    description:
      "We embed ourselves in your go-to-market motion. That means we understand your product, your customers, your objections — not just your spreadsheet.",
  },
  {
    title: "Honest Before Comfortable",
    description:
      "If your positioning is the bottleneck, we'll say so. If a channel isn't working, we won't hide behind vanity metrics. You deserve the truth.",
  },
  {
    title: "Obsessed with Quality",
    description:
      "We'd rather book ten highly qualified meetings than fifty that waste your sales team's time. Every lead we send reflects on us.",
  },
]

export default function AboutPage() {
  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[--volt]/30 bg-[--volt-glow] px-3 py-1 text-xs font-semibold text-[--volt]">
              Our Story
            </div>
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[--volt-glow] border border-[--volt]/20">
              <Image src="/vs.png" alt="VoltScale Partners" height={56} width={56} priority />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[--text-primary] mb-6">
            About <span className="text-[--volt]">VoltScale Partners</span>
          </h1>
          <p className="text-lg text-[--text-secondary] leading-relaxed mb-4">
            VoltScale was built on a simple premise: most B2B companies have a great
            product and a weak pipeline. Not because outbound doesn't work — but because
            it&apos;s being done wrong.
          </p>
          <p className="text-lg text-[--text-secondary] leading-relaxed">
            We exist to close that gap. We&apos;re a team of outbound specialists, data
            nerds, and copywriters who care more about your revenue than your activity reports.
            We don&apos;t measure success in emails sent — we measure it in meetings that close.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[--volt]/30 bg-[--volt-glow] px-3 py-1 text-xs font-semibold text-[--volt]">
              Our Values
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[--text-primary]">
              How We Think
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border-2 border-[--border] bg-[--surface] p-6 shadow-sm dark:shadow-none hover:border-[--volt]/40 hover:bg-[--volt-glow] transition-all duration-300"
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-[--volt] text-[--volt-foreground] text-sm font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-[--text-primary] mb-2 tracking-tight">
                  {v.title}
                </h3>
                <p className="text-sm text-[--text-secondary] leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button asChild size="lg">
            <Link href="https://calendly.com/voltscalepartners/15mins" target="_blank" rel="noopener noreferrer">
              Work With Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
