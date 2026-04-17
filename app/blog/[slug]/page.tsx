import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — VoltScale Partners`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[--text-muted] hover:text-[--volt] transition-colors mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All posts
        </Link>

        {/* Category badge */}
        <div className="block mb-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[--volt]/30 bg-[--volt-glow] px-3 py-1 text-xs font-semibold text-[--volt]">
          {post.category}
        </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[--text-primary] mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-[--text-muted] mb-8">
          <span>{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        {/* Volt divider */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-12 bg-[--volt]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[--volt]" />
          <div className="h-px flex-1 bg-[--border]" />
        </div>

        {/* Content */}
        <article className="space-y-6">
          {post.content.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="text-xl font-bold text-[--text-primary] tracking-tight pt-4"
                >
                  {block.text}
                </h2>
              )
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="space-y-2 pl-4">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[--text-secondary] text-base leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[--volt]" />
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={i} className="text-base text-[--text-secondary] leading-relaxed">
                {block.text}
              </p>
            )
          })}
        </article>

        {/* Bottom divider */}
        <div className="flex items-center gap-3 mt-12 mb-12">
          <div className="h-px flex-1 bg-[--border]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[--volt]" />
          <div className="h-px flex-1 bg-[--border]" />
        </div>

        {/* CTA */}
        <div className="rounded-2xl border-2 border-[--border] bg-[--surface] p-8 text-center">
          <h3 className="text-xl font-extrabold text-[--text-primary] mb-2 tracking-tight">
            Ready to put this into practice?
          </h3>
          <p className="text-sm text-[--text-secondary] mb-6">
            Let's build an outbound engine for your business — from ICP to booked meetings.
          </p>
          <div className="animate-float w-fit rounded-lg mx-auto [box-shadow:0_8px_20px_rgba(15,138,107,0.35)] dark:[box-shadow:0_8px_20px_rgba(45,212,168,0.25)]">
            <Button asChild size="lg">
              <Link href="https://calendly.com/voltscalepartners/15mins" target="_blank" rel="noopener noreferrer">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
