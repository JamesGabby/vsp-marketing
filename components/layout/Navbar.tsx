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
  { href: "/tools", label: "Tools" },
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
          ? "bg-[--background]/90 backdrop-blur-md border-b border-[--border]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-[--text-primary] hover:opacity-80 transition-opacity"
          >
            <Image src="/vs.png" alt="VoltScale Partners" height={56} width={56} priority />
            <span>VoltScale</span>
            <span className="hidden sm:inline text-[--text-muted] font-normal text-sm">
              Partners
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-[--volt]"
                    : "text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--surface]"
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
              <Link href="https://calendly.com/voltscalepartners/15mins" target="_blank" rel="noopener noreferrer">
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
        <div className="md:hidden border-t border-[--border] bg-[--background]/95 backdrop-blur-md">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-[--volt] bg-[--surface]"
                    : "text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--surface]"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-[--border]">
              <Button asChild className="w-full">
                <Link href="https://calendly.com/voltscalepartners/15mins" target="_blank" rel="noopener noreferrer">
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
