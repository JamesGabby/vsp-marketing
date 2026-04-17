"use client"

import { cn } from "@/lib/utils"
import type { PresetKey } from "./constants"

interface PresetButtonsProps {
  active: PresetKey | null
  onSelect: (key: PresetKey) => void
}

const PRESETS: { key: PresetKey; label: string; desc: string }[] = [
  { key: "conservative", label: "Conservative", desc: "Low volume, modest rates" },
  { key: "moderate",     label: "Moderate",     desc: "Balanced mid-range assumptions" },
  { key: "aggressive",   label: "Aggressive",   desc: "High volume, strong conversion" },
]

export function PresetButtons({ active, onSelect }: PresetButtonsProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-[--text-muted]">
        Quick-fill a scenario
      </p>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map(({ key, label, desc }) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={cn(
              "rounded-lg border-2px-4 py-2 text-sm font-medium transition-colors",
              active === key
                ? "border-[--volt] bg-[--volt-glow] text-[--volt]"
                : "border-[--border] text-[--text-secondary] hover:border-[--volt] hover:text-[--volt] hover:bg-[--volt-glow]"
            )}
            title={desc}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
