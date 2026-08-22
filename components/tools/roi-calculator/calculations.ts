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
  totalContractValue: number  // deal value × contract length (first-term value)
  customerLifetimeMonths: number
  ltv: number                 // margin-based lifetime value of one customer
  ltvCacRatio: number | null
  cacPaybackMonths: number | null
  lifetimeCapped: boolean     // true when the 10-year horizon binds
}

const MONEY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export function fmtMoney(n: number): string {
  return MONEY.format(Math.round(n))
}

export function fmtPct(n: number, signed = false): string {
  const abs = Math.abs(n).toFixed(1)
  if (!signed) return `${abs}%`
  return n >= 0 ? `+${abs}%` : `-${abs}%`
}

export function fmtNum(n: number, decimals = 1): string {
  return n.toFixed(decimals)
}

export function fmtRatio(n: number): string {
  return `${n.toFixed(1)} : 1`
}

export function fmtMonths(n: number): string {
  return `${n.toFixed(1)} mo`
}

// A renewal rate approaching 100% sends expected lifetime to infinity, which is
// arithmetically true and commercially meaningless. Cap the horizon at 5 years,
// the usual ceiling for a defensible LTV, so the headline number survives
// scrutiny from a sceptical buyer.
const MAX_LIFETIME_MONTHS = 60

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

  // Contract length is the first term, not the customer lifetime. With a per-term
  // renewal probability r, the expected number of terms is the geometric mean
  // 1 / (1 - r) — 75% renewal means four terms, not one.
  const renewal = Math.min(Math.max(s.renewalRate / 100, 0), 0.95)
  const uncappedLifetime = s.contractLength / (1 - renewal)
  const customerLifetimeMonths = Math.min(uncappedLifetime, MAX_LIFETIME_MONTHS)
  const lifetimeCapped = uncappedLifetime > MAX_LIFETIME_MONTHS

  // LTV is gross profit, not revenue — an LTV:CAC ratio built on revenue
  // overstates the case by the whole cost of delivery.
  const monthlyGrossProfit = s.dealValue * (s.grossMargin / 100)
  const ltv = monthlyGrossProfit * customerLifetimeMonths

  const ltvCacRatio = cpa !== null && cpa > 0 ? ltv / cpa : null

  const cacPaybackMonths =
    cpa !== null && monthlyGrossProfit > 0 ? cpa / monthlyGrossProfit : null

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
    customerLifetimeMonths,
    ltv,
    ltvCacRatio,
    cacPaybackMonths,
    lifetimeCapped,
  }
}
