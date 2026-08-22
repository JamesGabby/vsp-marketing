"use client"

import { useState } from "react"
import { fmtPct } from "./calculations"
import { useMoney } from "./currency"

interface ValueCompositionProps {
  /** Gross lifetime revenue minus net lifetime value. */
  deliveryCost: number
  annualInvestment: number
  netReturn: number
}

interface Segment {
  key: string
  label: string
  hint: string
  value: number
  color: string
}

/**
 * Where a year of gross lifetime revenue ends up. The segments are ordered by
 * how far the money travels before it becomes profit, so the ramp reads as a
 * sequence rather than as four unrelated categories.
 */
export function ValueComposition({
  deliveryCost,
  annualInvestment,
  netReturn,
}: ValueCompositionProps) {
  const { fmtMoney } = useMoney()
  const [active, setActive] = useState<string | null>(null)

  const recovered = Math.min(annualInvestment, netReturn)
  const profit = Math.max(netReturn - annualInvestment, 0)
  const shortfall = Math.max(annualInvestment - netReturn, 0)

  const segments: Segment[] = [
    {
      key: "delivery",
      label: "Cost of delivery",
      hint: "Gross lifetime value the business spends serving these customers",
      value: deliveryCost,
      color: "var(--chart-ord-1)",
    },
    {
      key: "investment",
      // When the year does not earn the investment back, only part of it is
      // covered, so say which part rather than restating the whole spend.
      label: shortfall > 0 ? "Investment earned back" : "Outbound investment",
      hint:
        shortfall > 0
          ? `Of the ${fmtMoney(annualInvestment)} spent, this much comes back`
          : "What the channel costs across the year",
      value: recovered,
      color: "var(--chart-ord-2)",
    },
    shortfall > 0
      ? {
          key: "shortfall",
          label: "Shortfall",
          hint: "Investment the year does not earn back",
          value: shortfall,
          // Its own hue rather than the negative red, which sits too close to
          // the orange beside it to be told apart.
          color: "var(--chart-shortfall)",
        }
      : {
          key: "profit",
          label: "Net profit",
          hint: "What is left once delivery and the channel are both paid for",
          value: profit,
          color: "var(--chart-ord-3)",
        },
  ]

  const total = segments.reduce((sum, s) => sum + s.value, 0)
  const visible = segments.filter((s) => s.value > 0)
  // An empty form has no segments to draw, so the bar becomes a bare track
  // rather than collapsing into an invisible strip.
  const share = (value: number) => (total > 0 ? (value / total) * 100 : 0)

  return (
    <figure className="m-0">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-bold text-(--text-primary)">Where the money lands</h3>
        <span className="text-[11px] tabular-nums text-(--text-muted)">
          {fmtMoney(deliveryCost + netReturn)} gross lifetime revenue
          {shortfall > 0 && ` plus ${fmtMoney(shortfall)} shortfall`}
        </span>
      </div>

      {/* Stacked bar: 2px of surface separates the segments, never a border */}
      <div
        className="flex h-6 w-full gap-[2px] overflow-hidden rounded-md"
        style={{ backgroundColor: visible.length === 0 ? "var(--border)" : undefined }}
      >
        {visible.map((segment) => (
          <div
            key={segment.key}
            role="presentation"
            onPointerEnter={() => setActive(segment.key)}
            onPointerLeave={() => setActive(null)}
            className="h-full min-w-[3px] transition-[flex-grow,opacity] duration-500 ease-out first:rounded-l-md last:rounded-r-md"
            style={{
              flexGrow: Math.max(segment.value, 0),
              flexBasis: 0,
              backgroundColor: segment.color,
              opacity: active === null || active === segment.key ? 1 : 0.55,
            }}
          />
        ))}
      </div>

      {/* Direct labels: the legend and the values in one row, so nothing is */}
      {/* reachable only by hovering */}
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        {segments.map((segment) => (
          <div
            key={segment.key}
            onPointerEnter={() => setActive(segment.key)}
            onPointerLeave={() => setActive(null)}
            className="flex flex-col gap-1"
          >
            <dt className="flex items-center gap-2 text-[11px] font-medium text-(--text-secondary)">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                style={{ backgroundColor: segment.color }}
              />
              {segment.label}
            </dt>
            <dd className="text-base font-bold tabular-nums text-(--text-primary)">
              {fmtMoney(segment.value)}
              <span className="ml-2 text-[11px] font-medium text-(--text-muted)">
                {fmtPct(share(segment.value))}
              </span>
            </dd>
            <p className="text-[11px] leading-snug text-(--text-muted)">{segment.hint}</p>
          </div>
        ))}
      </dl>
    </figure>
  )
}
