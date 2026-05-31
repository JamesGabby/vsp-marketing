import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"

export const metadata: Metadata = {
  title: "Case Studies — VoltScale Partners",
  description:
    "Real results from real clients. See how VoltScale Partners fills pipelines with qualified meetings through AI-powered outbound.",
}

const caseStudies = [
  {
    slug: "nearshore-dev-shop",
    industry: "Software Development",
    company: "Nearshore Custom Dev Agency",
    description:
      "A 35-person nearshore software agency offering custom development and staff augmentation to US-based tech companies. Entirely referral-dependent with no outbound motion.",
    challenge:
      "The founder had tried one outbound agency prior — they built a massive spray-and-pray list, sent generic templates, and delivered a handful of irrelevant leads over three months. The team had no time to build their own system and needed a reliable, repeatable pipeline that matched their ICP.",
    whatWeDid: [
      "Defined a precise ICP: Series A/B US tech startups actively scaling engineering, showing hiring signals for senior developers",
      "Fed the lead list through our qualification engine — disqualified 60% of the raw list as non-ICP, retaining only verified, research-backed prospects",
      "Wrote personalised outreach referencing each company's recent funding, open roles, and tech stack",
    ],
    results: [
      { label: "Qualified calls / month", value: "16" },
      { label: "New retainer clients (90 days)", value: "3" },
      { label: "ARR added in first quarter", value: "$190k" },
    ],
    quote:
      "We'd been burned before by agencies that just didn't get our ICP. VoltScale actually understood who we were targeting — and the leads proved it.",
    quoteName: "Founder & CEO",
  },
  {
    slug: "b2b-saas-revenue-intelligence",
    industry: "B2B SaaS",
    company: "Revenue Intelligence Platform",
    description:
      "A 20-person B2B SaaS company providing revenue intelligence and pipeline forecasting tooling for mid-market sales teams. Founder-led sales with no outbound infrastructure.",
    challenge:
      "The founding team was closing deals entirely through inbound and word-of-mouth. They knew outbound was the next lever but didn't have the bandwidth to hire and ramp an SDR, and previous attempts at self-run cold email got poor deliverability and even worse replies.",
    whatWeDid: [
      "Built an ICP profile targeting Revenue Operations leaders at mid-market B2B SaaS companies on Salesforce with a recent CRM migration signal",
      "Set up dedicated sending infrastructure with full DNS configuration and a 3-week warm-up before the first email was sent",
      "Personalised outreach around each prospect's tech stack, CRM setup, and publicly visible pipeline challenges",
    ],
    results: [
      { label: "Qualified calls / month", value: "14" },
      { label: "Pipeline generated (60 days)", value: "$260k" },
      { label: "Enterprise deals closed", value: "2" },
    ],
    quote:
      "The quality of the leads was unlike anything we'd seen from cold outbound before. These were people who actually had the problem we solve.",
    quoteName: "Co-founder & Head of Sales",
  },
  {
    slug: "managed-it-services",
    industry: "Managed IT Services",
    company: "UK-Based IT Services Provider",
    description:
      "A 50-person managed IT services and cybersecurity provider targeting professional services firms in the UK. Had an internal SDR who was generating volume but not quality.",
    challenge:
      "Their previous outreach was high-volume and low-relevance — 600+ emails a month with a sub-1% positive reply rate. The sending domain was flagged and their primary domain reputation had taken damage. They needed to fix deliverability, overhaul targeting, and improve lead quality from the ground up.",
    whatWeDid: [
      "Isolated all future sending to new dedicated domains, fully separated from the main domain, with strict DNS config and continuous health monitoring",
      "Rebuilt the ICP around CFOs and IT Directors at 50–200 person professional services firms showing signs of compliance pressure or legacy infrastructure",
      "Ran the new lead list through our engine — deep-researched each prospect for buying signals including recent audits, compliance certifications, and IT job postings",
    ],
    results: [
      { label: "Qualified calls / month", value: "22" },
      { label: "Main domain reputation", value: "Restored" },
      { label: "New clients (first quarter)", value: "4" },
    ],
    quote:
      "We went from a broken, spammy outbound motion to a clean system that books us meetings with exactly the type of companies we want to work with.",
    quoteName: "Managing Director",
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[--volt]/30 bg-[--volt-glow] px-3 py-1 text-xs font-semibold text-[--volt]">
            Case Studies
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[--text-primary] mb-4">
            Real Pipelines.{" "}
            <span className="text-[--volt]">Real Results.</span>
          </h1>
          <p className="text-lg text-[--text-secondary] leading-relaxed">
            How we've helped B2B companies replace referral dependency with a
            predictable, engine-driven outbound motion.
          </p>
        </div>

        {/* Case study cards */}
        <div className="flex flex-col gap-8">
          {caseStudies.map((cs, i) => (
            <div
              key={cs.slug}
              className="rounded-2xl border-2 border-[--border] bg-[--surface] overflow-hidden shadow-sm dark:shadow-none"
            >
              <div className="p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                  {/* Left col — context */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[--volt]/30 bg-[--volt-glow] px-2.5 py-0.5 text-xs font-semibold text-[--volt]">
                        {cs.industry}
                      </span>
                      <span className="text-xs text-[--text-muted] font-mono">0{i + 1}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[--text-primary] mb-3">
                      {cs.company}
                    </h2>
                    <p className="text-sm text-[--text-secondary] leading-relaxed mb-6">
                      {cs.description}
                    </p>

                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[--text-muted] mb-2">
                      The Challenge
                    </h3>
                    <p className="text-sm text-[--text-secondary] leading-relaxed mb-6">
                      {cs.challenge}
                    </p>

                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[--text-muted] mb-3">
                      What We Did
                    </h3>
                    <ul className="flex flex-col gap-2 mb-8">
                      {cs.whatWeDid.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[--text-secondary] leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[--volt]" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Quote */}
                    <div className="rounded-xl border border-[--volt]/20 bg-[--volt-glow] p-5">
                      <Quote className="h-4 w-4 text-[--volt] mb-3" />
                      <p className="text-sm text-[--text-primary] leading-relaxed italic mb-3">
                        &ldquo;{cs.quote}&rdquo;
                      </p>
                      <p className="text-xs font-semibold text-[--text-muted]">
                        — {cs.quoteName}
                      </p>
                    </div>
                  </div>

                  {/* Right col — results */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[--text-muted]">
                      Results
                    </h3>
                    {cs.results.map((r) => (
                      <div
                        key={r.label}
                        className="rounded-xl border-2 border-[--border] bg-[--background] p-5"
                      >
                        <div className="text-3xl font-extrabold text-[--volt] tracking-tight mb-1">
                          {r.value}
                        </div>
                        <div className="text-xs text-[--text-muted] leading-snug">
                          {r.label}
                        </div>
                      </div>
                    ))}

                    <div className="mt-auto pt-4">
                      <Link
                        href="https://calendly.com/voltscalepartners/15mins"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[--volt] hover:gap-2.5 transition-all"
                      >
                        Get similar results <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg text-[--text-secondary] mb-6">
            Want to see what this looks like for your business?
          </p>
          <Link
            href="https://calendly.com/voltscalepartners/15mins"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[--volt] px-6 py-3 text-sm font-bold text-[--volt-foreground] hover:opacity-90 transition-opacity [box-shadow:0_8px_20px_rgba(15,138,107,0.35)] dark:[box-shadow:0_8px_20px_rgba(45,212,168,0.25)]"
          >
            Book a Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  )
}
