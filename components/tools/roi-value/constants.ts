export interface ValueState {
  /** Qualified meetings actually held across 12 months. */
  meetingsPerYear: number
  /** Share of held meetings that become customers, whole percent. */
  closeRate: number
  /** Gross lifetime revenue from one customer, before cost of delivery. */
  grossLtv: number
  /** Lifetime value left after cost of delivery. Never exceeds grossLtv. */
  netLtv: number
  /** Fee per qualified meeting held. Rises where the ICP is hard to reach. */
  pricePerMeeting: number
  /** Tools, tech and infrastructure, billed monthly whatever the volume. */
  monthlyInfra: number
}

export type PresetKey = "conservative" | "balanced" | "ambitious"

export const DEFAULTS: ValueState = {
  meetingsPerYear: 120,
  closeRate: 18,
  grossLtv: 30000,
  netLtv: 18000,
  pricePerMeeting: 300,
  monthlyInfra: 300,
}

export const PRESETS: Record<PresetKey, ValueState> = {
  conservative: {
    meetingsPerYear: 60,
    closeRate: 12,
    grossLtv: 12000,
    netLtv: 6600,
    pricePerMeeting: 300,
    monthlyInfra: 300,
  },
  balanced: { ...DEFAULTS },
  ambitious: {
    meetingsPerYear: 240,
    closeRate: 25,
    grossLtv: 60000,
    netLtv: 42000,
    // Enterprise buyers are harder to reach, so the per-meeting fee sits above
    // the average rather than at it.
    pricePerMeeting: 500,
    monthlyInfra: 300,
  },
}

// Every range bottoms out at zero so Reset can empty the whole form. Without
// that the sliders would clamp a cleared field back up to their old floor.
export const RANGES = {
  meetingsPerYear: { min: 0, max: 600, step: 1 },
  closeRate: { min: 0, max: 60, step: 0.5 },
  grossLtv: { min: 0, max: 3000000, step: 500 },
  netLtv: { min: 0, max: 3000000, step: 500 },
  pricePerMeeting: { min: 0, max: 1500, step: 25 },
  monthlyInfra: { min: 0, max: 2000, step: 25 },
} as const

/** What Reset applies: a blank form, with no numbers anchoring the reader. */
export const ZEROED: ValueState = {
  meetingsPerYear: 0,
  closeRate: 0,
  grossLtv: 0,
  netLtv: 0,
  pricePerMeeting: 0,
  monthlyInfra: 0,
}

export const CLOSE_RATE_BENCHMARK = {
  label: "B2B avg",
  range: "15-25%",
  high: 40,
}

// Outbound does not hit steady state in month one: lists are still being built,
// sequences are still being tuned, and the calendar fills gradually. These
// weights spread the year's meetings so the first quarter runs light, which is
// what makes the breakeven point on the chart mean something. They are shares,
// not multipliers, so the annual total always equals the number entered.
export const RAMP_WEIGHTS = [0.35, 0.6, 0.85, 1, 1, 1, 1, 1, 1, 1, 1, 1]
