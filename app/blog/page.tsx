import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllPosts, formatDate } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog — VoltScale Partners",
  description:
    "Outbound strategy, cold email, LinkedIn, and B2B pipeline insights from the VoltScale team.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[--volt]/30 bg-[--volt-glow] px-3 py-1 text-xs font-semibold text-[--volt]">
            Insights
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[--text-primary] mb-4">
            The Outbound <span className="text-[--volt]">Playbook</span>
          </h1>
          <p className="text-lg text-[--text-secondary] leading-relaxed">
            Strategy, tactics, and frameworks from the team that lives and breathes B2B pipeline.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border-2 border-[--border] bg-[--surface] p-6 hover:border-[--volt]/40 hover:bg-[--volt-glow] transition-all duration-300 shadow-sm dark:shadow-none"
            >
              {/* Category */}
              <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[--volt]/30 bg-[--volt-glow] px-2.5 py-0.5 text-xs font-semibold text-[--volt]">
                {post.category}
              </div>

              {/* Title */}
              <h2 className="text-base font-bold text-[--text-primary] mb-3 leading-snug tracking-tight group-hover:text-[--volt] transition-colors">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-[--text-secondary] leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[--border]">
                <div className="flex items-center gap-3 text-xs text-[--text-muted]">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[--volt] group-hover:gap-2 transition-all">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
