"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SliderInputProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  prefix?: string
  suffix?: string
  benchmark?: { label: string; range: string; high: number }
  hint?: string
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix,
  suffix,
  benchmark,
  hint,
}: SliderInputProps) {
  const [inputText, setInputText] = useState(String(value))

  useEffect(() => {
    setInputText(String(value))
  }, [value])

  const pct = ((value - min) / (max - min)) * 100
  const trackStyle = {
    background: `linear-gradient(to right, var(--volt) ${pct}%, var(--border) ${pct}%)`,
  }

  const isAboveBenchmark = benchmark !== undefined && value > benchmark.high

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(parseFloat(e.target.value))
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value)
  }

  function handleInputBlur() {
    const parsed = parseFloat(inputText)
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed))
      onChange(clamped)
      setInputText(String(clamped))
    } else {
      setInputText(String(value))
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur()
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-[--text-secondary] flex-1 min-w-0 leading-snug">
          {label}
        </label>
        <div className="flex items-center gap-1 shrink-0">
          {prefix && (
            <span className="text-sm text-[--text-muted] font-medium">{prefix}</span>
          )}
          <input
            type="number"
            value={inputText}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            min={min}
            max={max}
            step={step}
            className={cn(
              "w-20 text-right text-sm font-bold bg-transparent border-b border-[--border]",
              "focus:border-[--volt] focus:outline-none tabular-nums pb-px transition-colors",
              isAboveBenchmark ? "text-[--volt]" : "text-[--text-primary]"
            )}
          />
          {suffix && (
            <span className={cn("text-sm font-medium", isAboveBenchmark ? "text-[--volt]" : "text-[--text-muted]")}>
              {suffix}
            </span>
          )}
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSlider}
        className="slider w-full"
        style={trackStyle}
      />

      {benchmark && (
        <p className="text-[11px] text-[--text-muted]">
          {benchmark.label}: {benchmark.range}
          {isAboveBenchmark && (
            <span className="ml-1.5 text-[--volt]">↑ above benchmark</span>
          )}
        </p>
      )}
      {hint && !benchmark && (
        <p className="text-[11px] text-[--text-muted]">{hint}</p>
      )}
    </div>
  )
}
