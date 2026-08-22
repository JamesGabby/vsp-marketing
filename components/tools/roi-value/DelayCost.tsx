"use client"

import type { DelayPoint } from "./calculations"
import { useMoney } from "./currency"

interface DelayCostProps {
  points: DelayPoint[]
  /** Net value contracted when the campaign starts now. Scales every bar. */
  baseline: number
  forgonePerDay: number
}

function rowLabel(days: number): string {
  return days === 0 ? "Start now" : `Wait ${days} days`
}

/**
 * What a slow decision costs inside a fixed twelve-month window. A late start
 * does not destroy customers, it pushes the curve right, so the honest number
 * is the tail that no longer lands inside the year being budgeted for.
 */
export function DelayCost({ points, baseline, forgonePerDay }: DelayCostProps) {
  const { fmtMoney } = useMoney()
  const scale = baseline > 0 ? baseline : 1
  const hasValue = baseline > 0

  return (
    <figure className="m-0">
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-sm font-bold text-(--text-primary)">The cost of a slow decision</h3>
        {hasValue && (
          <span className="text-[11px] tabular-nums text-(--text-muted)">
            About {fmtMoney(forgonePerDay)} a day
          </span>
        )}
      </div>
      <p className="mb-5 max-w-prose text-[11px] leading-snug text-(--text-muted)">
        Same twelve-month window in every row. Meetings ramp over the first quarter whenever
        you start, so waiting never saves you the ramp: it just pushes a fully-ramped month
        off the end of the window.
      </p>

      <ul className="flex flex-col gap-3">
        {points.map((point) => {
          const keptPct = (point.netReturn / scale) * 100
          const lostPct = (point.forgone / scale) * 100
          return (
            <li
              key={point.days}
              className="grid grid-cols-[5.5rem_1fr] items-center gap-x-3 gap-y-1 sm:grid-cols-[6rem_1fr_7rem]"
            >
              <span className="text-[11px] font-semibold text-(--text-secondary)">
                {rowLabel(point.days)}
              </span>

              <div
                className="flex h-4 w-full gap-[2px] overflow-hidden rounded"
                style={{ backgroundColor: hasValue ? undefined : "var(--border)" }}
              >
                <div
                  className="h-full rounded-l transition-[flex-grow] duration-500 ease-out"
                  style={{
                    flexGrow: Math.max(keptPct, 0),
                    flexBasis: 0,
                    backgroundColor: "var(--chart-return)",
                  }}
                />
                {lostPct > 0 && (
                  <div
                    className="h-full rounded-r transition-[flex-grow] duration-500 ease-out"
                    style={{
                      flexGrow: lostPct,
                      flexBasis: 0,
                      backgroundColor: "var(--chart-cost)",
                      opacity: 0.45,
                    }}
                  />
                )}
              </div>

              <span className="col-start-2 text-[11px] tabular-nums text-(--text-muted) sm:col-start-3 sm:text-right">
                {hasValue ? (
                  <>
                    <span className="font-bold text-(--text-primary)">
                      {fmtMoney(point.netReturn)}
                    </span>
                    {point.forgone > 0 && (
                      <span className="ml-2 text-(--chart-negative)">
                        -{fmtMoney(point.forgone)}
                      </span>
                    )}
                  </>
                ) : (
                  "—"
                )}
              </span>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="flex items-center gap-2 text-[11px] text-(--text-secondary)">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
            style={{ backgroundColor: "var(--chart-return)" }}
          />
          Contracted inside the window
        </span>
        <span className="flex items-center gap-2 text-[11px] text-(--text-secondary)">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
            style={{ backgroundColor: "var(--chart-cost)", opacity: 0.45 }}
          />
          Pushed outside it
        </span>
      </div>

      <p className="mt-4 max-w-prose text-[11px] leading-snug text-(--text-muted)">
        This is value deferred, not value destroyed. You would still win these customers, just
        outside the twelve months you are budgeting for.
      </p>
    </figure>
  )
}
