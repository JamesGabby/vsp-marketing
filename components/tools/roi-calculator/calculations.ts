import type { CalcState } from "./constants"

export interface CalcResults {
  totalMonthlyCost: number
  meetingsBookedPerMonth: number
  meetingsPerMonth: number    // meetings actually held (booked × show-up)
  dealsPerMonth: number
  revenuePerMonth: number     // new revenue added per month, not total billings
  monthlyROI: number | null
  costPerMeeting: number | null
  cpa: number | null
  pipelinePerMonth: number
  annualRevenue: number
  annualROI: number | null
  closingCohorts: number      // months in year 1 that produce closed deals after cycle lag
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
  // A positive reply is not a booked meeting — a share of interested replies
  // never make it onto the calendar, so bookingRate sits between the two.
  const meetingsBookedPerMonth =
    s.emailsPerMonth *
    (s.replyRate / 100) *
    (s.positiveReplyRate / 100) *
    (s.bookingRate / 100)

  const meetingsPerMonth = meetingsBookedPerMonth * (s.showUpRate / 100)

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

  // Gross pipeline created: every held meeting is an opportunity worth its full
  // contract value. Weighting it by close rate would just restate revenue.
  const pipelinePerMonth = meetingsPerMonth * s.dealValue * s.contractLength

  // Sales cycle creates a lag: deals sourced in month m don't close until month
  // m + salesCycle, so the first closes land in month salesCycle + 1. Each
  // monthly cohort then bills for the rest of year 1, capped by contract length
  // — that recurrence is what a flat `revenue × months` model misses. Clamped so
  // a 12-month cycle still closes one cohort rather than zeroing the year out.
  const firstCloseMonth = Math.min(s.salesCycle + 1, 12)
  const closingCohorts = 12 - firstCloseMonth + 1

  let annualRevenue = 0
  for (let startMonth = firstCloseMonth; startMonth <= 12; startMonth++) {
    const billingMonths = Math.min(13 - startMonth, s.contractLength)
    annualRevenue += revenuePerMonth * billingMonths
  }

  const annualCost = totalMonthlyCost * 12 + s.setupFee
  const annualROI =
    annualCost > 0
      ? ((annualRevenue - annualCost) / annualCost) * 100
      : null

  const totalContractValue = s.dealValue * s.contractLength

  return {
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
  }
}
