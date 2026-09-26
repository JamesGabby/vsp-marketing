import { getAllPosts } from "@/lib/blog"
import { SITE_NAME, SITE_URL, faqs } from "@/lib/seo"

// The emerging convention for handing a language model a clean, linkable
// summary of a site instead of making it reconstruct one from rendered HTML.
// No major engine ranks on this yet, so treat it as cheap insurance.
export const dynamic = "force-static"

export function GET() {
  const posts = getAllPosts()

  const body = `# ${SITE_NAME}

> ${SITE_NAME} is a UK-based B2B lead generation agency that books qualified sales calls for B2B SMEs in the United Kingdom and United States. Prospects are researched across multiple sources, verified against the client's ICP, and shown to have a live trigger event before any email is sent. Clients pay per qualified call held, on a monthly rolling basis.

## The offer

- £500 monthly deposit, credited in full against the first qualified calls held.
- Beyond the deposit, payment is per qualified call held.
- A qualified call means a decision-maker at a company matching the ICP agreed in week one, who attends the call.
- No retainer, no setup fee, no lock-in. Monthly rolling.
- Founded and run by James Gabbitus (MSc Computer Science), who builds and runs every campaign directly.

## Key pages

- [Home](${SITE_URL}/): the offer, the process, and what a qualified call means.
- [About](${SITE_URL}/about): the founder, and why the agency exists.
- [Blog](${SITE_URL}/blog): outbound strategy, cold email, deliverability, and ICP research.
- [Free tools](${SITE_URL}/tools): an outbound ROI calculator, with an ICP builder and deliverability audit in progress.
- [RSS feed](${SITE_URL}/rss.xml)

## Articles

${posts
  .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`)
  .join("\n")}

## Frequently asked questions

${faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}

## Contact

- Email: contact@periheliongrowth.com
- Book a 15-minute call: https://calendly.com/perihelion/15mins
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
