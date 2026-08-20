export interface CalcState {
  // Section 1 — Investment
  agencyRetainer: number
  adToolSpend: number
  setupFee: number
  salesHeadcount: number
  costPerRep: number
  perMeetingFee: number
  // Section 2 — Campaign Performance
  emailsPerMonth: number
  replyRate: number      // whole percent: 5 means 5%
  positiveReplyRate: number
  bookingRate: number    // % of positive replies that land on the calendar
  showUpRate: number
  // Section 3 — Sales Metrics
  closeRate: number
  dealValue: number
  contractLength: number
  grossMargin: number    // % of revenue left after cost of delivery
  renewalRate: number    // % of customers renewing at the end of each term
  salesCycle: number
}

export type PresetKey = "conservative" | "moderate" | "aggressive"

// Defaults are deliberately conservative and modelled on our own case-study
// range (14–22 qualified calls/month) rather than best-case numbers — a
// calculator that opens on a believable outcome is more persuasive than one
// that opens on a fantasy. Send volumes are set to land in that range with
// bookingRate applied, so the per-step rates stay benchmark-realistic.
export const DEFAULTS: CalcState = {
  agencyRetainer: 3000,
  adToolSpend: 500,
  setupFee: 2500,
  salesHeadcount: 1,
  costPerRep: 4500,
  perMeetingFee: 0,
  emailsPerMonth: 4500,
  replyRate: 3,
  positiveReplyRate: 25,
  bookingRate: 65,
  showUpRate: 70,
  closeRate: 15,
  dealValue: 6000,
  contractLength: 12,
  grossMargin: 70,
  renewalRate: 70,
  salesCycle: 3,
}

export const PRESETS: Record<PresetKey, CalcState> = {
  conservative: {
    agencyRetainer: 1500,
    adToolSpend: 200,
    setupFee: 1000,
    salesHeadcount: 0,
    costPerRep: 3500,
    perMeetingFee: 0,
    emailsPerMonth: 3500,
    replyRate: 2,
    positiveReplyRate: 18,
    bookingRate: 55,
    showUpRate: 60,
    closeRate: 12,
    dealValue: 4000,
    contractLength: 6,
    grossMargin: 55,
    renewalRate: 50,
    salesCycle: 4,
  },
  moderate: { ...DEFAULTS },
  aggressive: {
    agencyRetainer: 6000,
    adToolSpend: 1000,
    setupFee: 5000,
    salesHeadcount: 2,
    costPerRep: 5000,
    perMeetingFee: 0,
    emailsPerMonth: 5500,
    replyRate: 4,
    positiveReplyRate: 30,
    bookingRate: 75,
    showUpRate: 75,
    closeRate: 22,
    dealValue: 10000,
    contractLength: 18,
    grossMargin: 85,
    renewalRate: 65,
    salesCycle: 2,
  },
}

export const MINIMUMS: CalcState = {
  agencyRetainer: 0,
  adToolSpend: 0,
  setupFee: 0,
  salesHeadcount: 0,
  costPerRep: 0,
  perMeetingFee: 0,
  emailsPerMonth: 1000,
  replyRate: 1,
  positiveReplyRate: 10,
  bookingRate: 20,
  showUpRate: 30,
  closeRate: 5,
  dealValue: 500,
  contractLength: 1,
  grossMargin: 10,
  renewalRate: 0,
  salesCycle: 1,
}

export type BenchmarkField =
  | "replyRate"
  | "positiveReplyRate"
  | "bookingRate"
  | "showUpRate"
  | "closeRate"

export const BENCHMARKS: Record<BenchmarkField, { label: string; range: string; high: number }> = {
  replyRate:         { label: "Industry avg", range: "2–5%",   high: 8  },
  positiveReplyRate: { label: "Industry avg", range: "20–35%", high: 50 },
  bookingRate:       { label: "Industry avg", range: "50–70%", high: 80 },
  showUpRate:        { label: "Industry avg", range: "60–75%", high: 85 },
  closeRate:         { label: "B2B avg",       range: "15–25%", high: 40 },
}
