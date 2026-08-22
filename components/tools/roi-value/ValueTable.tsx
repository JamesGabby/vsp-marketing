"use client"

import { fmtCount, type MonthPoint } from "./calculations"
import { useMoney } from "./currency"

interface ValueTableProps {
  series: MonthPoint[]
}

/**
 * The chart's twin. Every value the curve and its tooltip show is also here, so
 * nothing on this page is reachable only by hovering.
 */
export function ValueTable({ series }: ValueTableProps) {
  const { fmtMoney } = useMoney()

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="sr-only">
          Cumulative meetings, customers, net value returned and investment by month
        </caption>
        <thead>
          <tr className="border-b border-(--border) text-left">
            <th scope="col" className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)">
              Month
            </th>
            <th scope="col" className="py-2 pr-4 text-right text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)">
              Meetings to date
            </th>
            <th scope="col" className="py-2 pr-4 text-right text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)">
              Customers to date
            </th>
            <th scope="col" className="py-2 pr-4 text-right text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)">
              Net value returned
            </th>
            <th scope="col" className="py-2 pr-4 text-right text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)">
              Invested
            </th>
            <th scope="col" className="py-2 text-right text-[11px] font-semibold uppercase tracking-wider text-(--text-muted)">
              Net position
            </th>
          </tr>
        </thead>
        <tbody>
          {series.slice(1).map((point) => {
            const net = point.cumNetReturn - point.cumInvestment
            return (
              <tr key={point.month} className="border-b border-(--border) last:border-0">
                <th scope="row" className="py-2 pr-4 text-left font-medium text-(--text-secondary)">
                  {point.month}
                </th>
                <td className="py-2 pr-4 text-right tabular-nums text-(--text-secondary)">
                  {fmtCount(point.cumMeetings)}
                </td>
                <td className="py-2 pr-4 text-right tabular-nums text-(--text-secondary)">
                  {fmtCount(point.cumCustomers)}
                </td>
                <td className="py-2 pr-4 text-right tabular-nums font-semibold text-(--text-primary)">
                  {fmtMoney(point.cumNetReturn)}
                </td>
                <td className="py-2 pr-4 text-right tabular-nums text-(--text-secondary)">
                  {fmtMoney(point.cumInvestment)}
                </td>
                <td
                  className="py-2 text-right font-semibold tabular-nums"
                  style={{ color: net < 0 ? "var(--chart-negative)" : "var(--text-primary)" }}
                >
                  {net < 0 ? "-" : "+"}
                  {fmtMoney(Math.abs(net))}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
