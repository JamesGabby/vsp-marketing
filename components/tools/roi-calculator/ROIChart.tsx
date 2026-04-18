"use client"

import { fmtGBP } from "./calculations"

interface ROIChartProps {
  cost: number
  revenue: number
}

export function ROIChart({ cost, revenue }: ROIChartProps) {
  const CHART_H = 80
  const max = Math.max(cost, revenue, 1)
  const costH = Math.max((cost / max) * CHART_H, 6)
  const revH = Math.max((revenue / max) * CHART_H, 6)
  const positive = revenue >= cost

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[--text-muted] mb-3">
        Monthly: Cost vs Revenue
      </p>
      <div className="flex items-end gap-4" style={{ height: `${CHART_H + 40}px` }}>
        {/* Cost bar */}
        <div className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end">
          <span className="text-[11px] font-semibold text-[--text-muted] tabular-nums">
            {fmtGBP(cost)}
          </span>
          <div
            className="w-full rounded-t-lg transition-all duration-500"
            style={{ height: `${costH}px`, backgroundColor: "var(--text-muted)", opacity: 0.35 }}
          />
          <span className="text-[10px] text-[--text-muted]">Cost</span>
        </div>

        {/* Revenue bar */}
        <div className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end">
          <span
            className="text-[11px] font-semibold tabular-nums"
            style={{ color: positive ? "var(--volt)" : "rgb(248 113 113)" }}
          >
            {fmtGBP(revenue)}
          </span>
          <div
            className="w-full rounded-t-lg transition-all duration-500"
            style={{
              height: `${revH}px`,
              backgroundColor: positive ? "var(--volt)" : "rgb(248 113 113)",
              opacity: 0.85,
            }}
          />
          <span className="text-[10px] text-[--text-muted]">Revenue</span>
        </div>
      </div>
    </div>
  )
}
