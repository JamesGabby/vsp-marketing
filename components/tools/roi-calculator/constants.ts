export interface CalcState {
  // Section 1 — Investment
  agencyRetainer: number
  adToolSpend: number
  salesHeadcount: number
  costPerRep: number
  perMeetingFee: number
  // Section 2 — Campaign Performance
  emailsPerMonth: number
  openRate: number       // whole percent: 45 means 45%
  replyRate: number
  positiveReplyRate: number
  showUpRate: number
  // Section 3 — Sales Metrics
  closeRate: number
  dealValue: number
  contractLength: number
  salesCycle: number
}

export type PresetKey = "conservative" | "moderate" | "aggressive"

export const DEFAULTS: CalcState = {
  agencyRetainer: 3000,
  adToolSpend: 500,
  salesHeadcount: 1,
  costPerRep: 4500,
  perMeetingFee: 0,
  emailsPerMonth: 10000,
  openRate: 45,
  replyRate: 5,
  positiveReplyRate: 40,
  showUpRate: 75,
  closeRate: 20,
  dealValue: 8000,
  contractLength: 12,
  salesCycle: 2,
}

export const PRESETS: Record<PresetKey, CalcState> = {
  conservative: {
    agencyRetainer: 1500,
    adToolSpend: 200,
    salesHeadcount: 0,
    costPerRep: 3500,
    perMeetingFee: 0,
    emailsPerMonth: 3000,
    openRate: 28,
    replyRate: 2,
    positiveReplyRate: 22,
    showUpRate: 62,
    closeRate: 12,
    dealValue: 3000,
    contractLength: 6,
    salesCycle: 4,
  },
  moderate: { ...DEFAULTS },
  aggressive: {
    agencyRetainer: 8000,
    adToolSpend: 2000,
    salesHeadcount: 3,
    costPerRep: 5500,
    perMeetingFee: 0,
    emailsPerMonth: 30000,
    openRate: 55,
    replyRate: 8,
    positiveReplyRate: 50,
    showUpRate: 85,
    closeRate: 30,
    dealValue: 20000,
    contractLength: 24,
    salesCycle: 1,
  },
}

export const MINIMUMS: CalcState = {
  agencyRetainer: 0,
  adToolSpend: 0,
  salesHeadcount: 0,
  costPerRep: 0,
  perMeetingFee: 0,
  emailsPerMonth: 1000,
  openRate: 5,
  replyRate: 1,
  positiveReplyRate: 10,
  showUpRate: 30,
  closeRate: 5,
  dealValue: 500,
  contractLength: 1,
  salesCycle: 1,
}

export type BenchmarkField =
  | "openRate"
  | "replyRate"
  | "positiveReplyRate"
  | "showUpRate"
  | "closeRate"

export const BENCHMARKS: Record<BenchmarkField, { label: string; range: string; high: number }> = {
  openRate:          { label: "Industry avg", range: "25–35%", high: 55 },
  replyRate:         { label: "Industry avg", range: "2–5%",   high: 8  },
  positiveReplyRate: { label: "Industry avg", range: "20–35%", high: 50 },
  showUpRate:        { label: "Industry avg", range: "60–75%", high: 85 },
  closeRate:         { label: "B2B avg",       range: "15–25%", high: 40 },
}
