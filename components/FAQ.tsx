import { ChevronDown } from "lucide-react"
import { faqs } from "@/lib/seo"

// Deliberately a server component built on native <details>, not a JS
// accordion. Answer engines retrieve passages, so every answer has to be in
// the server-rendered HTML rather than behind client state, and <details>
// still opens for a reader with JS disabled.
export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-(--surface)">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-(--volt)/30 bg-(--volt-glow) px-3 py-1 text-xs font-semibold text-(--volt)">
            Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--text-primary) mb-4">
            The Things{" "}
            <span className="text-(--volt)">People Ask.</span>
          </h2>
          <p className="text-lg text-(--text-secondary) leading-relaxed">
            Pricing, qualification, compliance, and what you are actually
            signing up for. Straight answers, no discovery call required.
          </p>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              name="faq"
              className="group rounded-xl border-2 border-(--border) bg-(--background) px-5 py-4 transition-colors open:border-(--volt)/40"
            >
              {/* The heading lives inside <summary> so the question still
                  reads as a heading in the document outline. */}
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="flex items-center justify-between gap-4 text-left text-base font-bold tracking-tight text-(--text-primary)">
                  {faq.question}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-(--volt) transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </h3>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-(--text-secondary)">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
