import type { Metadata } from "next"
import Link from "next/link"

const description =
  "The terms that apply when you use periheliongrowth.com or work with Perihelion."

export const metadata: Metadata = {
  title: "Terms of Service",
  description,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    url: "/terms",
    title: "Terms of Service | Perihelion",
    description,
  },
}

export default function TermsPage() {
  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[--text-primary] mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-[--text-muted] mb-10">Last updated: 9 August 2026</p>

        <div className="flex flex-col gap-8 text-sm text-[--text-secondary] leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[--text-primary] [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_a]:text-[--volt] [&_a]:hover:underline">

          <section>
            <p>
              periheliongrowth.com (the &ldquo;Site&rdquo;) is operated by James Gabbitus, trading as
              Perihelion, a sole trader based in the United Kingdom (&ldquo;Perihelion&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;). By using the Site or engaging our services, you agree to the terms below.
              If you don&apos;t agree, please don&apos;t use the Site.
            </p>
          </section>

          <section>
            <h2>Use of the Site</h2>
            <p>
              The Site, its content, and the tools we publish (including the ROI calculator) are
              provided for general informational purposes. Calculator outputs are estimates based on
              the figures you enter; they are not a guarantee of results for your business.
            </p>
          </section>

          <section>
            <h2>Our services</h2>
            <p>
              Where we agree to provide outbound lead generation services, the specific scope,
              pricing, guarantee terms, and cancellation terms are set out in the proposal or
              agreement signed with you directly, which takes precedence over this page in the event
              of any conflict. Nothing on this Site constitutes a binding offer to provide services on
              specific terms until we&apos;ve agreed a scope in writing.
            </p>
          </section>

          <section>
            <h2>Compliance</h2>
            <p>
              We build outbound campaigns to operate within applicable email and data protection law,
              including UK GDPR and CAN-SPAM, for the sending practices under our control (e.g. clear
              sender identification, working unsubscribe/opt-out mechanisms, and lawful basis for
              contacting prospects). You remain responsible for the accuracy of any product, pricing,
              or business claims we&apos;re asked to represent in outreach on your behalf.
            </p>
          </section>

          <section>
            <h2>Intellectual property</h2>
            <p>
              The Site&apos;s content, design, and the Lead Intelligence Engine are the property of
              Perihelion. You&apos;re welcome to link to or reference the Site, but not to reproduce its
              content, code, or methodology without permission.
            </p>
          </section>

          <section>
            <h2>Liability</h2>
            <p>
              The Site and its free tools are provided &ldquo;as is&rdquo;, without warranty of any kind. To the
              extent permitted by law, Perihelion isn&apos;t liable for decisions made based on tools or
              content published on the Site. This doesn&apos;t affect any guarantee explicitly agreed in a
              signed client contract, or any liability that can&apos;t be excluded under UK law (such as
              for fraud or death or personal injury caused by negligence).
            </p>
          </section>

          <section>
            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of England and Wales, and any dispute will be
              subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms: <a href="mailto:contact@periheliongrowth.com">contact@periheliongrowth.com</a>.
            </p>
          </section>

          <p className="text-xs text-[--text-muted] pt-4 border-t border-[--border]">
            See also our <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
