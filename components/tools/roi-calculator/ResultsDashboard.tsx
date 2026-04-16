import { StatBlock } from "./StatBlock"
import { StatCard } from "./StatCard"
import { ROIChart } from "./ROIChart"
import { fmtGBP, fmtPct, fmtNum, type CalcResults } from "./calculations"

interface ResultsDashboardProps {
  results: CalcResults
}

export function ResultsDashboard({ results }: ResultsDashboardProps) {
  const {
    totalMonthlyCost,
    meetingsPerMonth,
    dealsPerMonth,
    revenuePerMonth,
    monthlyROI,
    costPerMeeting,
    cpa,
    pipelinePerMonth,
    annualRevenue,
    annualROI,
    revenueMonths,
    totalContractValue,
  } = results

  const roiPositive = monthlyROI !== null && monthlyROI >= 0
  const roiNegative = monthlyROI !== null && monthlyROI < 0

  return (
    <div className="rounded-2xl border border-[--border] bg-[--surface] p-5 flex flex-col gap-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[--text-muted]">
          Live Results
        </p>
        <p className="text-[11px] text-[--text-muted] mt-0.5">Updates as you adjust inputs</p>
      </div>

      {/* Primary metrics — 2 × 3 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        <StatBlock
          label="Meetings / Month"
          value={meetingsPerMonth}
          format={(n) => fmtNum(n, 1)}
        />
        <StatBlock
          label="Deals Closed / Month"
          value={dealsPerMonth}
          format={(n) => fmtNum(n, 2)}
        />
        <StatBlock
          label="Revenue / Month"
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
      </div>

      <div className="h-px bg-[--border]" />

      {/* Secondary metrics — 2 × 3 */}
      <div className="grid grid-cols-2 gap-2.5">
        <StatCard
          label="Cost Per Acquisition"
          value={cpa !== null ? fmtGBP(cpa) : "—"}
        />
        <StatCard
          label="Pipeline / Month"
          value={fmtGBP(pipelinePerMonth)}
          sub="weighted"
        />
        <StatCard
          label="Annual Revenue"
          value={fmtGBP(annualRevenue)}
          sub={`${revenueMonths} revenue months (cycle lag)`}
        />
        <StatCard
          label="Annual ROI"
          value={annualROI !== null ? fmtPct(annualROI, true) : "—"}
          sub="12-month projection"
        />
        <StatCard
          label="Total Monthly Cost"
          value={fmtGBP(totalMonthlyCost)}
        />
        <StatCard
          label="Total Contract Value"
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
