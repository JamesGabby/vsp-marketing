"use client"

import { useMemo, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { fmtMonth, interpolateAt } from "./calculations"
import { useMoney } from "./currency"
import { useAnimatedNumber, useAnimatedNumbers, useMeasuredWidth } from "./useAnimated"

interface ReturnCurveChartProps {
  /** Cumulative net value returned, index 0 (launch) through 12. */
  cumReturn: number[]
  /** Cumulative investment over the same months. */
  cumCost: number[]
  breakevenMonth: number | null
}

const MONTHS = 12

// Floor for the y axis. Without it an empty form scales to 1, and the ticks all
// round to "$0" or "$1".
const MIN_AXIS_MAX = 1000

/** Rounds an axis maximum up to a number a reader can hold in their head. */
function niceMax(value: number): number {
  if (!isFinite(value) || value <= 0) return 1
  const exponent = Math.floor(Math.log10(value))
  const base = Math.pow(10, exponent)
  const n = value / base
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10
  return step * base
}

export function ReturnCurveChart({ cumReturn, cumCost, breakevenMonth }: ReturnCurveChartProps) {
  const { fmtMoney, fmtCompactMoney } = useMoney()
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const width = useMeasuredWidth(wrapRef)
  const reduced = useReducedMotion()
  const [hover, setHover] = useState<number | null>(null)

  const animReturn = useAnimatedNumbers(cumReturn)
  const animCost = useAnimatedNumbers(cumCost)

  const narrow = width < 560
  const height = narrow ? 268 : 330
  const margin = {
    top: 28,
    right: narrow ? 18 : 116,
    bottom: 30,
    left: narrow ? 48 : 62,
  }
  const plotW = Math.max(width - margin.left - margin.right, 40)
  const plotH = height - margin.top - margin.bottom

  // The axis maximum comes from the settled values so tick labels stay honest,
  // while its scale eases, letting the curves grow into a moving frame.
  const targetMax = niceMax(Math.max(...cumReturn, ...cumCost, MIN_AXIS_MAX))
  const animMax = useAnimatedNumber(targetMax)
  const safeMax = animMax > 0 ? animMax : 1

  const x = (month: number) => margin.left + (month / MONTHS) * plotW
  const y = (value: number) => margin.top + (1 - value / safeMax) * plotH

  const linePath = (values: number[]) =>
    values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ")

  const returnLine = linePath(animReturn)
  const costLine = linePath(animCost)
  const returnArea = `${returnLine} L${x(MONTHS).toFixed(2)},${y(0).toFixed(2)} L${x(0).toFixed(2)},${y(0).toFixed(2)} Z`

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * targetMax)
  const xTicks = narrow ? [0, 3, 6, 9, 12] : [0, 2, 4, 6, 8, 10, 12]

  // Breakeven sits on the investment line, at the fraction of a month where the
  // two curves cross. Animated as a point so it slides rather than teleports.
  const breakevenTarget = useMemo(
    () => [breakevenMonth ?? 0, interpolateAt(cumCost, breakevenMonth ?? 0)],
    [breakevenMonth, cumCost]
  )
  const [beMonth, beValue] = useAnimatedNumbers(breakevenTarget)

  // End labels detach from their lines if they overlap, so nudge them apart.
  const returnEndY = y(animReturn[MONTHS])
  const costEndY = y(animCost[MONTHS])
  const gap = Math.abs(returnEndY - costEndY)
  const push = gap < 30 ? (30 - gap) / 2 : 0
  const returnLabelY = returnEndY <= costEndY ? returnEndY - push : returnEndY + push
  const costLabelY = returnEndY <= costEndY ? costEndY + push : costEndY - push

  function handlePointer(event: React.PointerEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const local = event.clientX - rect.left - margin.left
    const month = Math.round((local / plotW) * MONTHS)
    setHover(Math.max(0, Math.min(MONTHS, month)))
  }

  function handleKeyDown(event: React.KeyboardEvent<SVGSVGElement>) {
    const current = hover ?? MONTHS
    if (event.key === "ArrowRight") {
      event.preventDefault()
      setHover(Math.min(MONTHS, current + 1))
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      setHover(Math.max(0, current - 1))
    } else if (event.key === "Home") {
      event.preventDefault()
      setHover(0)
    } else if (event.key === "End") {
      event.preventDefault()
      setHover(MONTHS)
    } else if (event.key === "Escape") {
      setHover(null)
    }
  }

  const active = hover
  const activeReturn = active === null ? 0 : cumReturn[active]
  const activeCost = active === null ? 0 : cumCost[active]
  const activeNet = activeReturn - activeCost

  const summary =
    breakevenMonth === null
      ? `Cumulative net value returned reaches ${fmtMoney(cumReturn[MONTHS])} against ${fmtMoney(cumCost[MONTHS])} invested over twelve months. The two lines do not cross inside the year.`
      : `Cumulative net value returned reaches ${fmtMoney(cumReturn[MONTHS])} against ${fmtMoney(cumCost[MONTHS])} invested over twelve months, overtaking spend in month ${breakevenMonth.toFixed(1)}.`

  const tooltipLeft = active === null ? 0 : x(active)
  const flip = tooltipLeft > width * 0.62

  return (
    <figure className="m-0">
      {/* Legend: always present, so identity never rests on colour alone */}
      <figcaption className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="flex items-center gap-2 text-xs font-medium text-(--text-secondary)">
          <svg width="14" height="8" aria-hidden="true">
            <line x1="0" y1="4" x2="14" y2="4" stroke="var(--chart-return)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Net value returned
        </span>
        <span className="flex items-center gap-2 text-xs font-medium text-(--text-secondary)">
          <svg width="14" height="8" aria-hidden="true">
            <line x1="0" y1="4" x2="14" y2="4" stroke="var(--chart-cost)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Invested to date
        </span>
      </figcaption>

      <div ref={wrapRef} className="relative w-full min-w-0">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          role="img"
          aria-label={summary}
          tabIndex={0}
          className="block max-w-full touch-pan-y rounded-lg outline-none"
          onPointerMove={handlePointer}
          onPointerDown={handlePointer}
          onPointerLeave={() => setHover(null)}
          onFocus={() => setHover((h) => (h === null ? MONTHS : h))}
          onBlur={() => setHover(null)}
          onKeyDown={handleKeyDown}
        >
          <defs>
            <linearGradient id="roi-return-wash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-return)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--chart-return)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Gridlines: hairline, solid, one step off the surface */}
          {ticks.map((tick) => (
            <line
              key={tick}
              x1={margin.left}
              x2={margin.left + plotW}
              y1={y(tick)}
              y2={y(tick)}
              stroke="var(--chart-grid)"
              strokeWidth={1}
              shapeRendering="crispEdges"
            />
          ))}

          {ticks.map((tick) => (
            <text
              key={`y-${tick}`}
              x={margin.left - 10}
              y={y(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-(--text-muted) text-[11px] tabular-nums"
            >
              {fmtCompactMoney(tick)}
            </text>
          ))}

          {xTicks.map((month) => (
            <text
              key={`x-${month}`}
              x={x(month)}
              y={height - margin.bottom + 20}
              textAnchor="middle"
              className="fill-(--text-muted) text-[11px] tabular-nums"
            >
              {month === 0 ? "Launch" : month}
            </text>
          ))}

          <motion.path
            d={returnArea}
            fill="url(#roi-return-wash)"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          />

          <motion.path
            d={costLine}
            fill="none"
            stroke="var(--chart-cost)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <motion.path
            d={returnLine}
            fill="none"
            stroke="var(--chart-return)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          {/* Breakeven: the moment the orange line clears the grey one */}
          {breakevenMonth !== null && (
            <motion.g
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <line
                x1={x(beMonth)}
                x2={x(beMonth)}
                y1={margin.top}
                y2={margin.top + plotH}
                stroke="var(--chart-cost)"
                strokeWidth={1}
                opacity={0.5}
                shapeRendering="crispEdges"
              />
              <circle
                cx={x(beMonth)}
                cy={y(beValue)}
                r={5}
                fill="var(--chart-return)"
                stroke="var(--surface)"
                strokeWidth={2}
              />
              <text
                x={x(beMonth) + (beMonth > 8 ? -10 : 10)}
                y={margin.top + 12}
                textAnchor={beMonth > 8 ? "end" : "start"}
                className="fill-(--text-secondary) text-[11px] font-semibold"
              >
                {`Breakeven ${fmtMonth(breakevenMonth).toLowerCase()}`}
              </text>
            </motion.g>
          )}

          {/* End markers, each ringed in the surface colour so they stay legible */}
          <circle
            cx={x(MONTHS)}
            cy={costEndY}
            r={4.5}
            fill="var(--chart-cost)"
            stroke="var(--surface)"
            strokeWidth={2}
          />
          <circle
            cx={x(MONTHS)}
            cy={returnEndY}
            r={4.5}
            fill="var(--chart-return)"
            stroke="var(--surface)"
            strokeWidth={2}
          />

          {/* Direct end labels, only where there is room for them */}
          {!narrow && (
            <>
              <text
                x={x(MONTHS) + 12}
                y={returnLabelY}
                dominantBaseline="middle"
                className="fill-(--text-primary) text-[12px] font-bold tabular-nums"
              >
                {fmtCompactMoney(cumReturn[MONTHS])}
              </text>
              <text
                x={x(MONTHS) + 12}
                y={costLabelY}
                dominantBaseline="middle"
                className="fill-(--text-muted) text-[12px] font-semibold tabular-nums"
              >
                {fmtCompactMoney(cumCost[MONTHS])}
              </text>
            </>
          )}

          {/* Crosshair, snapped to the nearest month */}
          {active !== null && (
            <g pointerEvents="none">
              <line
                x1={x(active)}
                x2={x(active)}
                y1={margin.top}
                y2={margin.top + plotH}
                stroke="var(--text-muted)"
                strokeWidth={1}
                opacity={0.55}
                shapeRendering="crispEdges"
              />
              <circle
                cx={x(active)}
                cy={y(animCost[active])}
                r={4.5}
                fill="var(--chart-cost)"
                stroke="var(--surface)"
                strokeWidth={2}
              />
              <circle
                cx={x(active)}
                cy={y(animReturn[active])}
                r={4.5}
                fill="var(--chart-return)"
                stroke="var(--surface)"
                strokeWidth={2}
              />
            </g>
          )}
        </svg>

        {active !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 w-52 rounded-xl border border-(--border) bg-(--surface) p-3 shadow-lg"
            style={{
              left: tooltipLeft,
              transform: flip ? "translateX(calc(-100% - 14px))" : "translateX(14px)",
            }}
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)">
              {active === 0 ? "Launch" : `Month ${active}`}
            </p>
            <dl className="space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <dt className="flex items-center gap-2 text-[11px] text-(--text-secondary)">
                  <svg width="12" height="8" aria-hidden="true">
                    <line x1="0" y1="4" x2="12" y2="4" stroke="var(--chart-return)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Returned
                </dt>
                <dd className="text-sm font-bold tabular-nums text-(--text-primary)">
                  {fmtMoney(activeReturn)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="flex items-center gap-2 text-[11px] text-(--text-secondary)">
                  <svg width="12" height="8" aria-hidden="true">
                    <line x1="0" y1="4" x2="12" y2="4" stroke="var(--chart-cost)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Invested
                </dt>
                <dd className="text-sm font-bold tabular-nums text-(--text-primary)">
                  {fmtMoney(activeCost)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-(--border) pt-1.5">
                <dt className="text-[11px] text-(--text-secondary)">Net position</dt>
                <dd
                  className="text-sm font-bold tabular-nums"
                  style={{ color: activeNet < 0 ? "var(--chart-negative)" : "var(--text-primary)" }}
                >
                  {activeNet < 0 ? "-" : "+"}
                  {fmtMoney(Math.abs(activeNet))}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      <p className="mt-2 text-center text-[11px] text-(--text-muted)">
        Months from launch. Meetings ramp through the first quarter, and the meeting fees ramp with them.
      </p>

      <span aria-live="polite" className="sr-only">
        {active === null
          ? ""
          : `${active === 0 ? "Launch" : `Month ${active}`}: ${fmtMoney(activeReturn)} returned, ${fmtMoney(activeCost)} invested.`}
      </span>
    </figure>
  )
}
