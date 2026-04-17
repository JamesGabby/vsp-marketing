"use client"

import { motion } from "framer-motion"
import {
  Target,
  Network,
  PenLine,
  ShieldCheck,
  Database,
  BarChart3,
} from "lucide-react"

const services = [
  {
    icon: Target,
    title: "ICP Research & Targeting",
    description:
      'We build hyper-specific ideal customer profiles down to firmographic, technographic, and behavioral signals. We know the difference between \u201ccompanies with 50\u2013200 employees\u201d and \u201cSeries B SaaS companies actively hiring SDRs who just switched CRMs.\u201d',
  },
  {
    icon: Network,
    title: "Multi-Channel Orchestration",
    description:
      "Cold email alone doesn't cut it. We layer email, LinkedIn (connections, voice notes, engagement), cold calling, and direct mail — sequenced so every touch reinforces the last.",
  },
  {
    icon: PenLine,
    title: "Copywriting That Converts",
    description:
      "Our emails sound like a human wrote them because a human did. Personalized using real research, leading with pain points, not product pitches.",
  },
  {
    icon: ShieldCheck,
    title: "Deliverability & Infrastructure",
    description:
      "Domain warming, inbox rotation, SPF/DKIM/DMARC, volume ramps, and inbox placement monitoring. If your emails land in spam, nothing else matters.",
  },
  {
    icon: Database,
    title: "Data & Enrichment",
    description:
      "Multiple data sources, cross-referenced and triple-verified. We keep bounce rates under 2% because clean data is the foundation of everything.",
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    description:
      "Open rates, reply rates, positive replies, and meetings booked — broken down by segment, angle, and channel. Outbound is an iterative experiment, not set-and-forget.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function ServicesGrid() {
  return (
    <section id="services" className="py-24 lg:py-32">
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
            Outbound,{" "}
            <span className="text-[--volt]">Engineered.</span>
          </h2>
          <p className="text-lg text-[--text-secondary] leading-relaxed">
            Every channel, every touchpoint, every message is intentional.
            We build systems that generate pipeline — not just activity.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group rounded-2xl border-2 border-[--border] bg-[--surface] p-6 hover:border-[--volt]/40 hover:bg-[--volt-glow] transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[--background] border-2 border-[--border] group-hover:border-[--volt]/40 transition-colors">
                  <Icon className="h-5 w-5 text-[--volt]" />
                </div>
                <h3 className="text-base font-bold text-[--text-primary] mb-2 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-[--text-secondary] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
