"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  // { href: "/case-studies", label: "Case Studies" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-(--background)/90 backdrop-blur-md border-b border-(--border)"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-(--text-primary) hover:opacity-80 transition-opacity"
          >
            <Image
              src="/perihelion-logo-light.png"
              alt=""
              aria-hidden="true"
              height={56}
              width={56}
              priority
              className="logo-light-variant"
            />
            <Image
              src="/perihelion-logo-dark.png"
              alt=""
              aria-hidden="true"
              height={56}
              width={56}
              priority
              className="logo-dark-variant"
            />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold uppercase tracking-[0.15em] text-(--text-primary)">
                Perihelion
              </span>
              <span className="hidden sm:block text-[8px] font-semibold uppercase tracking-[0.15em] text-orange-500">
                Closest Approach to Your Next Deal
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-(--volt) bg-(--volt-glow)"
                    : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--surface)"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="https://calendly.com/perihelion/15mins" target="_blank" rel="noopener noreferrer">
                Book a Call
              </Link>
            </Button>
            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-(--border) bg-(--background)/95 backdrop-blur-md max-h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-(--volt) bg-(--surface)"
                    : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--surface)"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-(--border)">
              <div
                className="relative w-full overflow-hidden rounded-xl border-2 border-(--border) mb-3"
                style={{ aspectRatio: "16 / 9" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/Vj6QeO1a68E"
                  title="How to Consistently Win More High-Paying Clients Each Month Through Running Tightly-Listed & Trigger-Based Cold Email Campaigns"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <Button asChild className="w-full">
                <Link href="https://calendly.com/perihelion/15mins" target="_blank" rel="noopener noreferrer">
                  Book a Call
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
