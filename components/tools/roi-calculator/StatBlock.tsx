"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

function useCountUp(target: number, duration = 450): number {
  const [display, setDisplay] = useState(target)
  const prev = useRef(target)
  const frame = useRef<number>(0)

  useEffect(() => {
    const from = prev.current
    const to = target
    prev.current = to
    if (from === to) return

    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(from + (to - from) * eased)
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, duration])

  return display
}

interface StatBlockProps {
  label: string
  value: number | null
  format: (n: number) => string
  nullDisplay?: string
  positive?: boolean
  negative?: boolean
}

export function StatBlock({
  label,
  value,
  format,
  nullDisplay = "—",
  positive,
  negative,
}: StatBlockProps) {
  const animated = useCountUp(value ?? 0)

  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={cn(
          "text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums leading-none",
          negative ? "text-red-400" : "text-[--volt]"
        )}
      >
        {value === null ? nullDisplay : format(animated)}
      </span>
      <span className="text-[11px] text-[--text-muted] uppercase tracking-widest font-semibold">
        {label}
      </span>
    </div>
  )
}
