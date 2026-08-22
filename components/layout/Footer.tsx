import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"
import { LinkedinIcon } from "@/components/icons/LinkedinIcon"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How We Work" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-(--border) bg-(--surface)">
      {/* Volt gradient accent at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-(--volt)/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-(--text-primary) w-fit"
            >
              <Image src="/perihelion-logo-light.png" alt="" aria-hidden="true" height={48} width={48} className="logo-light-variant" />
              <Image src="/perihelion-logo-dark.png" alt="" aria-hidden="true" height={48} width={48} className="logo-dark-variant" />
              <span>Perihelion</span>
            </Link>
            <p className="text-sm text-(--text-secondary) leading-relaxed max-w-[260px]">
              B2B outbound that books real meetings with your ideal customers, not vanity metrics.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
              Built to build pipeline.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
              Quick Links
            </p>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-(--text-secondary) hover:text-(--volt) transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact / Social */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
              Connect
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/jamesgabbitus/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 flex items-center justify-center rounded-lg border-2 border-(--border) text-(--text-muted) hover:text-(--volt) hover:border-(--volt) transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@periheliongrowth.com"
                aria-label="Email"
                className="h-9 w-9 flex items-center justify-center rounded-lg border-2 border-(--border) text-(--text-muted) hover:text-(--volt) hover:border-(--volt) transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <a
              href="mailto:contact@periheliongrowth.com"
              className="text-sm text-(--text-secondary) hover:text-(--volt) transition-colors w-fit"
            >
              contact@periheliongrowth.com
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-(--border) flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-(--text-muted)">
              © {new Date().getFullYear()} Perihelion. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-xs text-(--text-muted) hover:text-(--volt) transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-(--text-muted) hover:text-(--volt) transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          {/* <p className="text-[11px] text-(--text-muted)">
            Perihelion is the trading name of James Gabbitus, a sole trader based in England, United Kingdom.
          </p> */}
        </div>
      </div>
    </footer>
  )
}
