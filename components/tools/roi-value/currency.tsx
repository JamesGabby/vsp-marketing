"use client"

import { createContext, useContext, useMemo } from "react"

export type CurrencyCode = "USD" | "GBP"

export const CURRENCIES: Record<CurrencyCode, { symbol: string; locale: string; label: string }> = {
  USD: { symbol: "$", locale: "en-US", label: "USD" },
  GBP: { symbol: "£", locale: "en-GB", label: "GBP" },
}

export const CURRENCY_ORDER: CurrencyCode[] = ["USD", "GBP"]

interface Money {
  code: CurrencyCode
  symbol: string
  fmtMoney: (n: number) => string
  fmtCompactMoney: (n: number) => string
}

const MoneyContext = createContext<Money | null>(null)

/**
 * Switching currency re-denominates the model, it does not convert it. A figure
 * typed as 300 means $300 or £300 depending on the switch, because a prospect
 * enters their own numbers in their own currency and outbound is priced per
 * market rather than at an exchange rate. No FX rate is applied anywhere, and
 * none is stored: a hardcoded rate would be wrong within the week.
 */
export function CurrencyProvider({
  code,
  children,
}: {
  code: CurrencyCode
  children: React.ReactNode
}) {
  const value = useMemo<Money>(() => {
    const { symbol, locale } = CURRENCIES[code]
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      maximumFractionDigits: 0,
    })

    return {
      code,
      symbol,
      fmtMoney: (n) => formatter.format(Math.round(n)),
      fmtCompactMoney: (n) => {
        const abs = Math.abs(n)
        const sign = n < 0 ? "-" : ""
        if (abs >= 1_000_000) {
          const m = abs / 1_000_000
          return `${sign}${symbol}${m >= 10 ? Math.round(m) : m.toFixed(1)}M`
        }
        if (abs >= 1_000) return `${sign}${symbol}${Math.round(abs / 1_000)}k`
        return `${sign}${symbol}${Math.round(abs)}`
      },
    }
  }, [code])

  return <MoneyContext.Provider value={value}>{children}</MoneyContext.Provider>
}

export function useMoney(): Money {
  const money = useContext(MoneyContext)
  if (!money) throw new Error("useMoney must be used inside a CurrencyProvider")
  return money
}
