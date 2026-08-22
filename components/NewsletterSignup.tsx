"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || sending) return
    setSending(true)
    setError(false)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter signup",
          email,
          message: `${email} subscribed to the Perihelion newsletter from the blog.`,
        }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mt-16 rounded-2xl border-2 border-(--volt)/20 bg-(--volt-glow) p-6 sm:p-8 text-center max-w-xl mx-auto">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--background) border-2 border-(--border) mx-auto">
        <Mail className="h-5 w-5 text-(--volt)" />
      </div>
      <h2 className="text-lg font-bold text-(--text-primary) mb-2">
        Get new posts in your inbox
      </h2>
      <p className="text-sm text-(--text-secondary) mb-5">
        Outbound strategy, deliverability, and cold email tactics. No spam, unsubscribe any time.
      </p>
      {submitted ? (
        <div className="rounded-lg border-2 border-(--volt)/40 bg-(--background) px-5 py-4 text-sm font-medium text-(--volt)">
          You&apos;re on the list. We&apos;ll email you when we publish something worth reading.
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-(--background)"
            />
            <Button type="submit" disabled={sending}>
              {sending ? "Sending…" : "Subscribe"}
            </Button>
          </form>
          {error && (
            <p className="mt-3 text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </div>
  )
}
