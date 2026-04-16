import Link from "next/link"
import Image from "next/image"
import { Globe, ExternalLink, Mail } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How We Work" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
]

export function Footer() {
  return (
    <footer className="border-t border-[--border] bg-[--surface]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-[--text-primary] w-fit"
            >
              <Image src="/vs.png" alt="VoltScale Partners" height={48} width={48} />
              <span>VoltScale Partners</span>
            </Link>
            <p className="text-sm text-[--text-secondary] leading-relaxed max-w-[260px]">
              B2B outbound that books real meetings with your ideal customers — not vanity metrics.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[--text-muted]">
              Quick Links
            </p>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[--text-secondary] hover:text-[--volt] transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact / Social */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[--text-muted]">
              Connect
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-[--border] text-[--text-muted] hover:text-[--volt] hover:border-[--volt] transition-colors"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-[--border] text-[--text-muted] hover:text-[--volt] hover:border-[--volt] transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@voltscale.com"
                aria-label="Email"
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-[--border] text-[--text-muted] hover:text-[--volt] hover:border-[--volt] transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <a
              href="mailto:hello@voltscale.com"
              className="text-sm text-[--text-secondary] hover:text-[--volt] transition-colors w-fit"
            >
              hello@voltscale.com
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[--border] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[--text-muted]">
            © {new Date().getFullYear()} VoltScale Partners. All rights reserved.
          </p>
          <p className="text-xs text-[--text-muted]">
            Built to build pipeline.
          </p>
        </div>
      </div>
    </footer>
  )
}
