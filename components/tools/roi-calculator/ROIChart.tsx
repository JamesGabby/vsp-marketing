"use client"

import { fmtGBP } from "./calculations"

interface ROIChartProps {
  cost: number
  revenue: number
}

export function ROIChart({ cost, revenue }: ROIChartProps) {
  const max = Math.max(cost, revenue, 1)
  const costPct = (cost / max) * 100
  const revPct = (revenue / max) * 100
  const positive = revenue >= cost

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[--text-muted] mb-3">
        Monthly: Cost vs Revenue
      </p>
      <div className="flex items-end gap-4 h-24">
        {/* Cost bar */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <span className="text-[11px] font-semibold text-[--text-muted] tabular-nums">
            {fmtGBP(cost)}
          </span>
          <div className="w-full flex items-end" style={{ height: "64px" }}>
            <div
              className="w-full rounded-t-lg bg-[--border] transition-all duration-500"
              style={{ height: `${costPct}%`, minHeight: "4px" }}
            />
          </div>
          <span className="text-[10px] text-[--text-muted]">Cost</span>
        </div>

        {/* Revenue bar */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <span
            className="text-[11px] font-semibold tabular-nums"
            style={{ color: positive ? "var(--volt)" : "rgb(248 113 113)" }}
          >
            {fmtGBP(revenue)}
          </span>
          <div className="w-full flex items-end" style={{ height: "64px" }}>
            <div
              className="w-full rounded-t-lg transition-all duration-500"
              style={{
                height: `${revPct}%`,
                minHeight: "4px",
                backgroundColor: positive ? "var(--volt)" : "rgb(248 113 113)",
                opacity: 0.85,
              }}
            />
          </div>
          <span className="text-[10px] text-[--text-muted]">Revenue</span>
        </div>
      </div>
    </div>
  )
}
