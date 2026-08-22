"use client"

import { cn } from "@/lib/utils"
import { useAnimatedNumber } from "./useAnimated"

interface ValueStatProps {
  label: string
  value: number | null
  format: (n: number) => string
  sub?: string
  nullDisplay?: string
  negative?: boolean
}

export function ValueStat({
  label,
  value,
  format,
  sub,
  nullDisplay = "n/a",
  negative,
}: ValueStatProps) {
  const animated = useAnimatedNumber(value ?? 0)

  return (
    <div className="flex flex-col gap-1">
      <span
        className={cn(
          "text-xl font-bold leading-none tracking-tight sm:text-2xl",
          negative ? "text-(--chart-negative)" : "text-(--text-primary)"
        )}
      >
        {value === null ? nullDisplay : format(animated)}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-(--text-muted)">
        {label}
      </span>
      {sub && <span className="text-[11px] leading-snug text-(--text-muted)">{sub}</span>}
    </div>
  )
}
