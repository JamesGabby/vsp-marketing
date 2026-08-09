import type { Metadata } from "next"
import Link from "next/link"

const description =
  "How Perihelion collects, uses, and protects your personal data."

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    url: "/privacy",
    title: "Privacy Policy | Perihelion",
    description,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[--text-primary] mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-[--text-muted] mb-10">Last updated: 9 August 2026</p>

        <div className="flex flex-col gap-8 text-sm text-[--text-secondary] leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[--text-primary] [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_a]:text-[--volt] [&_a]:hover:underline">

          <section>
            <h2>Who we are</h2>
            <p>
              Perihelion (&ldquo;Perihelion&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a B2B outbound and lead
              generation service operated by James Gabbitus as a sole trader based in the United
              Kingdom. This policy explains what personal data we collect through
              periheliongrowth.com (the &ldquo;Site&rdquo;), why we collect it, and the rights you have over it.
            </p>
            <p className="mt-3">
              You can contact us about anything in this policy at{" "}
              <a href="mailto:james@periheliongrowth.com">james@periheliongrowth.com</a>.
            </p>
          </section>

          <section>
            <h2>What we collect</h2>
            <p>We only collect data you actively give us. That means:</p>
            <ul>
              <li>Name, company, email address, and any message content, when you submit the contact form or book a call.</li>
              <li>Email address, when you sign up for tool launch notifications or the blog newsletter.</li>
              <li>Any information you volunteer if we later work together, such as your ICP, target market, and campaign details.</li>
            </ul>
            <p className="mt-3">
              We do not use tracking cookies, third-party ad pixels, or web analytics on this Site.
              The only thing we store in your browser is a theme preference (light/dark mode), which
              never leaves your device.
            </p>
          </section>

          <section>
            <h2>Why we collect it</h2>
            <ul>
              <li>To respond to enquiries and follow up on call bookings (legitimate interest / steps to enter a contract).</li>
              <li>To send the specific updates you asked for, e.g. tool launch notifications or newsletter emails (consent, given by submitting the form).</li>
              <li>To deliver our services if you become a client (performance of a contract).</li>
            </ul>
            <p className="mt-3">
              We never sell your data, and we don&apos;t use it for anything beyond what you signed up for.
            </p>
          </section>

          <section>
            <h2>Who we share it with</h2>
            <p>
              We use <strong>Resend</strong> to deliver transactional and newsletter emails. Submitting a
              form on this Site means the data you enter is processed by Resend on our behalf, solely
              to deliver that email. We don&apos;t share your data with any other third party, and we don&apos;t
              sell it.
            </p>
          </section>

          <section>
            <h2>How long we keep it</h2>
            <p>
              Contact form and enquiry data is kept for as long as reasonably needed to respond to you
              and, if you become a client, for the duration of that relationship plus any period
              required by UK tax and accounting law. Newsletter and notification sign-ups are kept
              until you unsubscribe or ask us to delete them.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul>
              <li>Ask what personal data we hold about you</li>
              <li>Ask us to correct or delete it</li>
              <li>Withdraw consent (e.g. unsubscribe from any email) at any time</li>
              <li>Object to how we&apos;re using it</li>
              <li>Complain to the UK Information Commissioner&apos;s Office (ICO) at ico.org.uk if you believe we&apos;ve mishandled your data</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email{" "}
              <a href="mailto:james@periheliongrowth.com">james@periheliongrowth.com</a> and we&apos;ll respond
              within one month.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>
              If we materially change how we handle your data, we&apos;ll update this page and change the
              &ldquo;last updated&rdquo; date above.
            </p>
          </section>

          <p className="text-xs text-[--text-muted] pt-4 border-t border-[--border]">
            See also our <Link href="/terms">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
