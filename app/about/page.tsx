"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkedinIcon } from "@/components/icons/LinkedinIcon"

const values = [
  {
    title: "Founder-Led, Not Farmed Out",
    description:
      "James runs every account personally. There's no junior SDR pool learning on your budget and no offshore list-builder you never speak to.",
  },
  {
    title: "We Build Our Own Tools",
    description:
      "The Qualification Engine is ours, written from scratch. When your campaign needs the research logic to work differently, we change the code rather than wait on a vendor's roadmap.",
  },
  {
    title: "Paid on Outcomes",
    description:
      "You pay per qualified call that actually takes place. No retainer, no setup fee. If the campaign doesn't book calls, we don't get paid, which keeps us honest about what's working.",
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
          <div className="flex flex-col items-center mb-6">
            <Image src="/perihelion-logo-light.png" alt="Perihelion" height={140} width={140} priority className="logo-light-variant" />
            <Image src="/perihelion-logo-dark.png" alt="" aria-hidden="true" height={140} width={140} priority className="logo-dark-variant" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--text-primary) mb-6">
            About <span className="text-(--volt)">Perihelion</span>
          </h1>
          <p className="text-lg text-(--text-secondary) leading-relaxed mb-4">
            James Gabbitus founded Perihelion after speaking to dozens of founders who&apos;d been burned by lead gen agencies: agencies that didn&apos;t understand their ICP, delivered low-quality leads, and hid behind vanity metrics. He decided to build something better.
          </p>
          <p className="text-lg text-(--text-secondary) leading-relaxed mb-4">
            With a technical background (MSc Computer Science), he spent months coding, testing, debugging, and iterating to build the Qualification Engine, our AI-powered research and personalisation system, from the ground up. It&apos;s a system that deep-researches every prospect, detects trigger events, qualifies or disqualifies against your exact ICP, and produces research-based outreach that sounds like a human wrote it, because the targeting is precise enough that it reads that way.
          </p>
          <p className="text-lg text-(--text-secondary) leading-relaxed">
            We don&apos;t measure success in emails sent. We measure it in qualified meetings held and deals closed.
          </p>
        </motion.div>

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-(--border) bg-(--surface) p-6 sm:p-8 shadow-sm dark:shadow-none flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <Image
              src="/james-gabbitus.png"
              alt="James Gabbitus, Founder of Perihelion"
              height={128}
              width={128}
              className="h-32 w-32 shrink-0 rounded-xl object-cover border-2 border-(--border)"
            />
            <div>
              <h2 className="text-lg font-bold text-(--text-primary) tracking-tight">
                James Gabbitus
              </h2>
              <p className="text-sm text-(--volt) font-semibold mb-3">
                Founder, Perihelion
              </p>
              <p className="text-sm text-(--text-secondary) leading-relaxed mb-4">
                MSc Computer Science. Built the Qualification Engine from the ground up and works directly with every client on ICP, messaging, and campaign strategy.
              </p>
              <a
                href="https://www.linkedin.com/in/jamesgabbitus/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-(--text-secondary) hover:text-(--volt) transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
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
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-(--volt)/30 bg-(--volt-glow) px-3 py-1 text-xs font-semibold text-(--volt)">
              Our Values
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-(--text-primary)">
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
                className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-sm dark:shadow-none hover:border-(--volt)/40 hover:bg-(--volt-glow) transition-all duration-300"
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-(--volt) text-(--volt-foreground) text-sm font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-(--text-primary) mb-2 tracking-tight">
                  {v.title}
                </h3>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
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
          <div className="animate-float w-fit rounded-lg mx-auto [box-shadow:0_8px_20px_rgba(234,88,12,0.35)] dark:[box-shadow:0_8px_20px_rgba(251,146,60,0.25)]">
            <Button asChild size="lg">
              <Link href="https://calendly.com/perihelion/15mins" target="_blank" rel="noopener noreferrer">
                Book a 15-Minute Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
