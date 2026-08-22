"use client"

import { cn } from "@/lib/utils"
import { CURRENCIES, CURRENCY_ORDER, type CurrencyCode } from "./currency"

interface CurrencySwitchProps {
  value: CurrencyCode
  onChange: (code: CurrencyCode) => void
}

export function CurrencySwitch({ value, onChange }: CurrencySwitchProps) {
  return (
    <div
      role="group"
      aria-label="Currency"
      className="flex items-center rounded-full border-2 border-(--border) p-0.5"
    >
      {CURRENCY_ORDER.map((code) => {
        const active = code === value
        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            aria-pressed={active}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-semibold tabular-nums transition-colors",
              active
                ? "bg-(--volt) text-(--volt-foreground)"
                : "text-(--text-muted) hover:text-(--text-primary)"
            )}
          >
            {CURRENCIES[code].symbol} {CURRENCIES[code].label}
          </button>
        )
      })}
    </div>
  )
}
