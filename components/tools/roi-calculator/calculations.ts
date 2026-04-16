import type { CalcState } from "./constants"

export interface CalcResults {
  totalMonthlyCost: number
  meetingsPerMonth: number
  dealsPerMonth: number
  revenuePerMonth: number
  monthlyROI: number | null
  costPerMeeting: number | null
  cpa: number | null
  pipelinePerMonth: number
  annualRevenue: number
  annualROI: number | null
  revenueMonths: number       // effective revenue-generating months in year 1 after lag
  totalContractValue: number  // deal value × contract length (total customer value)
}

const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
})

export function fmtGBP(n: number): string {
  return GBP.format(Math.round(n))
}

export function fmtPct(n: number, signed = false): string {
  const abs = Math.abs(n).toFixed(1)
  if (!signed) return `${abs}%`
  return n >= 0 ? `+${abs}%` : `-${abs}%`
}

export function fmtNum(n: number, decimals = 1): string {
  return n.toFixed(decimals)
}

export function calculate(s: CalcState): CalcResults {
  const meetingsPerMonth =
    s.emailsPerMonth *
    (s.replyRate / 100) *
    (s.positiveReplyRate / 100) *
    (s.showUpRate / 100)

  const totalMonthlyCost =
    s.agencyRetainer +
    s.adToolSpend +
    s.salesHeadcount * s.costPerRep +
    meetingsPerMonth * s.perMeetingFee

  const dealsPerMonth = meetingsPerMonth * (s.closeRate / 100)
  const revenuePerMonth = dealsPerMonth * s.dealValue

  const monthlyROI =
    totalMonthlyCost > 0
      ? ((revenuePerMonth - totalMonthlyCost) / totalMonthlyCost) * 100
      : null

  const costPerMeeting =
    meetingsPerMonth > 0.001 ? totalMonthlyCost / meetingsPerMonth : null

  const cpa =
    dealsPerMonth > 0.001 ? totalMonthlyCost / dealsPerMonth : null

  const pipelinePerMonth = meetingsPerMonth * s.dealValue * (s.closeRate / 100)

  // Sales cycle creates a lag: deals started in the last `salesCycle` months of
  // year 1 won't close until year 2. Effective revenue months = 12 - salesCycle,
  // floored at 1 so the field always has some impact.
  const revenueMonths = Math.max(1, 12 - s.salesCycle)
  const annualRevenue = revenuePerMonth * revenueMonths

  const annualCost = totalMonthlyCost * 12 + s.setupFee
  const annualROI =
    annualCost > 0
      ? ((annualRevenue - annualCost) / annualCost) * 100
      : null

  const totalContractValue = s.dealValue * s.contractLength

  return {
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
  }
}
