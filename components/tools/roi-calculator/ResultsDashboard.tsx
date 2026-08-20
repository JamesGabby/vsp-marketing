import { StatBlock } from "./StatBlock"
import { StatCard } from "./StatCard"
import { ROIChart } from "./ROIChart"
import { fmtGBP, fmtPct, fmtNum, fmtRatio, fmtMonths, type CalcResults } from "./calculations"

interface ResultsDashboardProps {
  results: CalcResults
  setupFee: number
}

export function ResultsDashboard({ results, setupFee }: ResultsDashboardProps) {
  const {
    totalMonthlyCost,
    meetingsBookedPerMonth,
    meetingsPerMonth,
    dealsPerMonth,
    revenuePerMonth,
    monthlyROI,
    costPerMeeting,
    cpa,
    pipelinePerMonth,
    annualRevenue,
    annualROI,
    closingCohorts,
    totalContractValue,
    customerLifetimeMonths,
    ltv,
    ltvCacRatio,
    cacPaybackMonths,
    lifetimeCapped,
  } = results

  const roiPositive = monthlyROI !== null && monthlyROI >= 0
  const roiNegative = monthlyROI !== null && monthlyROI < 0

  // 3:1 is the benchmark every operator recognises, so the ratio is scored
  // against it rather than against zero.
  const ltvCacHealthy = ltvCacRatio !== null && ltvCacRatio >= 3
  const ltvCacUnderwater = ltvCacRatio !== null && ltvCacRatio < 1
  const ltvCacSub =
    ltvCacRatio === null
      ? undefined
      : ltvCacHealthy
      ? "↑ healthy is 3:1"
      : ltvCacUnderwater
      ? "below 1:1 — losing money per deal"
      : "below the 3:1 benchmark"

  const ltvSub = lifetimeCapped
    ? "gross profit, 5-yr lifetime cap"
    : `gross profit × ${fmtNum(customerLifetimeMonths, 0)} mo lifetime`

  return (
    <div className="rounded-2xl border-2 border-[--border] bg-[--surface] p-5 flex flex-col gap-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[--text-muted]">
          Live Results
        </p>
        <p className="text-[11px] text-[--text-muted] mt-0.5">Updates as you adjust inputs</p>
      </div>

      {/* Primary metrics — 2 × 4 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        <StatBlock
          label="Meetings Booked / Month"
          value={meetingsBookedPerMonth}
          format={(n) => fmtNum(n, 1)}
        />
        <StatBlock
          label="Meetings Held / Month"
          value={meetingsPerMonth}
          format={(n) => fmtNum(n, 1)}
        />
        <StatBlock
          label="Deals Closed / Month"
          value={dealsPerMonth}
          format={(n) => fmtNum(n, 2)}
        />
        <StatBlock
          label="New Revenue / Month"
          value={revenuePerMonth}
          format={fmtGBP}
        />
        <StatBlock
          label="Monthly ROI"
          value={monthlyROI}
          format={(n) => fmtPct(n, true)}
          nullDisplay="—"
          positive={roiPositive}
          negative={roiNegative}
        />
        <StatBlock
          label="Cost Per Meeting"
          value={costPerMeeting}
          format={fmtGBP}
          nullDisplay="—"
        />
        <StatBlock
          label="Customer LTV"
          value={ltv}
          format={fmtGBP}
          sub={ltvSub}
        />
        <StatBlock
          label="LTV : CAC"
          value={ltvCacRatio}
          format={fmtRatio}
          nullDisplay="—"
          sub={ltvCacSub}
          positive={ltvCacHealthy}
          negative={ltvCacUnderwater}
        />
      </div>

      <div className="h-px bg-[--border]" />

      {/* Secondary metrics — 2 × 3 */}
      <div className="grid grid-cols-2 gap-2.5">
        <StatCard
          label="Cost Per Acquisition"
          value={cpa !== null ? fmtGBP(cpa) : "—"}
          sub="your CAC"
        />
        <StatCard
          label="CAC Payback"
          value={cacPaybackMonths !== null ? fmtMonths(cacPaybackMonths) : "—"}
          sub="months of gross profit to break even"
        />
        <StatCard
          label="Pipeline Created / Month"
          value={fmtGBP(pipelinePerMonth)}
          sub="meetings × contract value"
        />
        <StatCard
          label="Annual Revenue"
          value={fmtGBP(annualRevenue)}
          sub={`incl. recurring · ${closingCohorts} closing months`}
        />
        <StatCard
          label="Annual ROI"
          value={annualROI !== null ? fmtPct(annualROI, true) : "—"}
          sub={setupFee > 0 ? "incl. setup fee" : "12-month projection"}
        />
        <StatCard
          label="First-Term Value"
          value={fmtGBP(totalContractValue)}
          sub="deal value × contract length"
        />
      </div>

      <div className="h-px bg-[--border]" />

      {/* Chart */}
      <ROIChart cost={totalMonthlyCost} revenue={revenuePerMonth} />

      {/* Disclaimer */}
      <p className="text-[11px] text-[--text-muted] leading-relaxed">
        This calculator provides estimates based on the inputs you provide. Actual results vary
        based on ICP quality, market conditions, and sales execution.
      </p>
    </div>
  )
}
