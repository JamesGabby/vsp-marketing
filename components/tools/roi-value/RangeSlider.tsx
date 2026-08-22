"use client"

import { useEffect, useId, useState } from "react"
import { cn } from "@/lib/utils"

interface RangeSliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  prefix?: string
  suffix?: string
  hint?: string
  benchmark?: { label: string; range: string; high: number }
}

export function RangeSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix,
  suffix,
  hint,
  benchmark,
}: RangeSliderProps) {
  const id = useId()
  const [draft, setDraft] = useState(String(value))

  useEffect(() => {
    setDraft(String(value))
  }, [value])

  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0
  const aboveBenchmark = benchmark !== undefined && value > benchmark.high

  function commit() {
    const parsed = parseFloat(draft)
    if (isNaN(parsed)) {
      setDraft(String(value))
      return
    }
    const clamped = Math.max(min, Math.min(max, parsed))
    onChange(clamped)
    setDraft(String(clamped))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="min-w-0 flex-1 text-sm font-medium leading-snug text-(--text-secondary)">
          {label}
        </label>
        <div className="flex shrink-0 items-center gap-1">
          {prefix && <span className="text-sm font-medium text-(--text-muted)">{prefix}</span>}
          <input
            id={id}
            type="number"
            inputMode="decimal"
            value={draft}
            min={min}
            max={max}
            step={step}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur()
            }}
            className={cn(
              "w-24 border-b border-(--border) bg-transparent pb-px text-right text-sm font-bold tabular-nums transition-colors",
              "focus:border-(--volt) focus:outline-none",
              aboveBenchmark ? "text-(--volt)" : "text-(--text-primary)"
            )}
          />
          {suffix && (
            <span
              className={cn(
                "text-sm font-medium",
                aboveBenchmark ? "text-(--volt)" : "text-(--text-muted)"
              )}
            >
              {suffix}
            </span>
          )}
        </div>
      </div>

      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="slider w-full"
        style={{
          background: `linear-gradient(to right, var(--volt) ${pct}%, var(--border) ${pct}%)`,
        }}
      />

      {benchmark ? (
        <p className="text-[11px] text-(--text-muted)">
          {benchmark.label}: {benchmark.range}
          {aboveBenchmark && <span className="ml-1.5 text-(--volt)">above benchmark</span>}
        </p>
      ) : (
        hint && <p className="text-[11px] text-(--text-muted)">{hint}</p>
      )}
    </div>
  )
}
