import { RAMP_WEIGHTS, type ValueState } from "./constants"

export interface MonthPoint {
  month: number
  meetingsHeld: number
  cumMeetings: number
  cumCustomers: number
  cumNetReturn: number
  cumInvestment: number
}

export interface DelayPoint {
  days: number
  /** Campaign months still inside the twelve-month window after this delay. */
  activeMonths: number
  meetings: number
  netReturn: number
  /** Net value that no longer lands inside the window, versus starting now. */
  forgone: number
}

export interface ValueResults {
  customers: number
  grossReturn: number
  netReturn: number
  deliveryCost: number
  /** What one held meeting is worth on average: close rate x net LTV. */
  valuePerMeeting: number
  /** Meeting fees plus infrastructure across the twelve months. */
  annualInvestment: number
  annualMeetingFees: number
  annualInfra: number
  /** Net value returned minus the investment. Negative means the year lost money. */
  netProfit: number
  roi: number | null
  multiple: number | null
  costPerMeeting: number | null
  cac: number | null
  ltvCac: number | null
  marginPct: number
  /** Fractional month where cumulative return overtakes cumulative spend. */
  breakevenMonth: number | null
  /** Chance of winning no customers at all, treating each meeting as independent. */
  probabilityOfZero: number
  /** Meetings needed before that chance drops under one in ten. */
  meetingsForSignal: number
  /** True while the volume is too small for the average to be a forecast. */
  tooFewMeetings: boolean
  /** What a slow decision costs inside a fixed twelve-month window. */
  delay: DelayPoint[]
  /** Net value per day of delay, taken from the first month. */
  forgonePerDay: number
  series: MonthPoint[]
  cumReturn: number[]
  cumCost: number[]
}

// Money formatting lives in currency.tsx, so it can follow the chosen currency.

export function fmtPct(n: number, signed = false): string {
  const rounded = Math.abs(n) >= 100 ? Math.round(Math.abs(n)) : Number(Math.abs(n).toFixed(1))
  const body = `${rounded.toLocaleString("en-US")}%`
  if (!signed) return body
  return n < 0 ? `-${body}` : `+${body}`
}

export function fmtMultiple(n: number): string {
  return `${n >= 10 ? Math.round(n) : Number(n.toFixed(1))}x`
}

export function fmtRatio(n: number): string {
  return `${n >= 10 ? Math.round(n) : Number(n.toFixed(1))} : 1`
}

export function fmtCount(n: number): string {
  return n >= 100 ? Math.round(n).toLocaleString("en-US") : Number(n.toFixed(1)).toLocaleString("en-US")
}

/** "Month 1", "Month 4.3": one decimal, but never a trailing .0. */
export function fmtMonth(n: number): string {
  const month = n < 1 ? 1 : Number(n.toFixed(1))
  return `Month ${month}`
}

/** Clamp the net figure so it can never claim more value than the gross figure. */
export function clampNetLtv(state: ValueState): number {
  return Math.min(state.netLtv, state.grossLtv)
}

export function calculate(state: ValueState): ValueResults {
  const netLtv = clampNetLtv(state)
  const customers = state.meetingsPerYear * (state.closeRate / 100)
  const grossReturn = customers * state.grossLtv
  const netReturn = customers * netLtv
  const deliveryCost = grossReturn - netReturn
  // The average worth of a single held meeting, closed or not. Sits beside the
  // cost of one so the trade is on screen rather than in the reader's head.
  const valuePerMeeting = netLtv * (state.closeRate / 100)

  const annualMeetingFees = state.meetingsPerYear * state.pricePerMeeting
  const annualInfra = state.monthlyInfra * 12
  const annualInvestment = annualMeetingFees + annualInfra
  const netProfit = netReturn - annualInvestment

  const roi = annualInvestment > 0 ? (netProfit / annualInvestment) * 100 : null
  const multiple = annualInvestment > 0 ? netReturn / annualInvestment : null
  const costPerMeeting =
    state.meetingsPerYear > 0 ? annualInvestment / state.meetingsPerYear : null
  const cac = customers > 0.001 ? annualInvestment / customers : null
  const ltvCac = cac !== null && cac > 0 ? netLtv / cac : null
  const marginPct = state.grossLtv > 0 ? (netLtv / state.grossLtv) * 100 : 0

  // Meetings are spread by the ramp weights, so the return curve bends the way a
  // real campaign does. Because meetings are billed as they are held, the spend
  // line follows the same ramp; only the infrastructure fee accrues evenly.
  const totalWeight = RAMP_WEIGHTS.reduce((a, b) => a + b, 0)

  const series: MonthPoint[] = [
    {
      month: 0,
      meetingsHeld: 0,
      cumMeetings: 0,
      cumCustomers: 0,
      cumNetReturn: 0,
      cumInvestment: 0,
    },
  ]

  let cumMeetings = 0
  for (let m = 1; m <= 12; m++) {
    const meetingsHeld = state.meetingsPerYear * (RAMP_WEIGHTS[m - 1] / totalWeight)
    cumMeetings += meetingsHeld
    const cumCustomers = cumMeetings * (state.closeRate / 100)
    series.push({
      month: m,
      meetingsHeld,
      cumMeetings,
      cumCustomers,
      cumNetReturn: cumCustomers * netLtv,
      cumInvestment: cumMeetings * state.pricePerMeeting + state.monthlyInfra * m,
    })
  }

  const cumReturn = series.map((p) => p.cumNetReturn)
  const cumCost = series.map((p) => p.cumInvestment)

  let breakevenMonth: number | null = null
  for (let m = 1; m <= 12; m++) {
    // Nothing returned is not a breakeven, even though zero technically clears
    // zero. An empty form should read as "no answer yet", not "month 1".
    if (cumReturn[m] <= 0) continue
    const diff = cumReturn[m] - cumCost[m]
    if (diff < 0) continue
    const prevDiff = cumReturn[m - 1] - cumCost[m - 1]
    // Straight-line interpolation inside the month the curves cross. When the
    // previous month was already level or ahead there is nothing to interpolate.
    breakevenMonth = prevDiff < 0 ? m - 1 + prevDiff / (prevDiff - diff) : m
    break
  }

  // Cost of delay. A late start does not destroy customers, it shifts the whole
  // curve right, so what actually falls out is the tail of the window. Because
  // the ramp is front-loaded, the months pushed off the end are the fully-ramped
  // ones: waiting never saves you the ramp, it just buys you fewer good months.
  const delay: DelayPoint[] = [0, 1, 2, 3].map((monthsDelayed) => {
    const activeWeight = RAMP_WEIGHTS.slice(0, 12 - monthsDelayed).reduce((a, b) => a + b, 0)
    const meetings = state.meetingsPerYear * (activeWeight / totalWeight)
    const delayedReturn = meetings * (state.closeRate / 100) * netLtv
    return {
      days: monthsDelayed * 30,
      activeMonths: 12 - monthsDelayed,
      meetings,
      netReturn: delayedReturn,
      forgone: netReturn - delayedReturn,
    }
  })

  const forgonePerDay = delay[1].forgone / 30

  // Every figure above is an expected value, which only describes reality once
  // there are enough meetings for the average to assert itself. Below that the
  // spread swamps the mean: the model can show a healthy return on a year whose
  // single likeliest outcome is no customers at all. Treating each meeting as an
  // independent trial at the close rate is the simplest honest way to say so.
  const miss = 1 - state.closeRate / 100
  const probabilityOfZero =
    state.closeRate > 0 ? Math.pow(miss, state.meetingsPerYear) : 1
  const meetingsForSignal =
    state.closeRate > 0 && miss > 0 ? Math.ceil(Math.log(0.1) / Math.log(miss)) : 0
  const tooFewMeetings =
    state.meetingsPerYear > 0 && state.closeRate > 0 && probabilityOfZero >= 0.1

  return {
    customers,
    grossReturn,
    netReturn,
    deliveryCost,
    valuePerMeeting,
    annualInvestment,
    annualMeetingFees,
    annualInfra,
    netProfit,
    roi,
    multiple,
    costPerMeeting,
    cac,
    ltvCac,
    marginPct,
    breakevenMonth,
    probabilityOfZero,
    meetingsForSignal,
    tooFewMeetings,
    delay,
    forgonePerDay,
    series,
    cumReturn,
    cumCost,
  }
}

/** Value of a cumulative series at a fractional month, for the breakeven marker. */
export function interpolateAt(values: number[], month: number): number {
  const clamped = Math.max(0, Math.min(month, values.length - 1))
  const lo = Math.floor(clamped)
  const hi = Math.min(lo + 1, values.length - 1)
  const t = clamped - lo
  return values[lo] + (values[hi] - values[lo]) * t
}
