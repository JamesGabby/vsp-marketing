"use client"

import { useReducer, useState } from "react"
import Link from "next/link"
import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SliderInput } from "./SliderInput"
import { InputSection } from "./InputSection"
import { PresetButtons } from "./PresetButtons"
import { ResultsDashboard } from "./ResultsDashboard"
import { calculate, fmtGBP } from "./calculations"
import { DEFAULTS, PRESETS, MINIMUMS, BENCHMARKS, type CalcState, type PresetKey } from "./constants"

type Action =
  | { type: "SET"; key: keyof CalcState; value: number }
  | { type: "PRESET"; values: CalcState }

function reducer(state: CalcState, action: Action): CalcState {
  if (action.type === "SET") return { ...state, [action.key]: action.value }
  if (action.type === "PRESET") return { ...action.values }
  return state
}

export function ROICalculator() {
  const [state, dispatch] = useReducer(reducer, DEFAULTS)
  const [activePreset, setActivePreset] = useState<PresetKey | null>("moderate")

  const results = calculate(state)

  function set(key: keyof CalcState) {
    return (value: number) => {
      dispatch({ type: "SET", key, value })
      setActivePreset(null)
    }
  }

  function applyPreset(key: PresetKey) {
    dispatch({ type: "PRESET", values: PRESETS[key] })
    setActivePreset(key)
  }

  function clearToMinimum() {
    dispatch({ type: "PRESET", values: MINIMUMS })
    setActivePreset(null)
  }

  return (
    <section className="rounded-3xl border-2 border-[--border] bg-[--surface]/50 p-6 sm:p-8">
      {/* Section header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="h-10 w-10 shrink-0 rounded-xl border-2 border-[--volt]/25 bg-[--volt-glow] flex items-center justify-center">
          <Calculator className="h-5 w-5 text-[--volt]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[--text-primary] tracking-tight">
            B2B Outbound ROI Calculator
          </h2>
          <p className="text-sm text-[--text-secondary] mt-0.5">
            Model the pipeline and revenue impact of your outbound programme. All calculations are live.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <PresetButtons active={activePreset} onSelect={applyPreset} />
        <button
          type="button"
          onClick={clearToMinimum}
          className="text-xs font-medium text-[--text-muted] hover:text-[--text-secondary] underline underline-offset-2 transition-colors shrink-0"
        >
          Reset all
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10">
        {/* ── Left: Inputs ───────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Section 1 */}
          <InputSection title="1 — Your Outbound Investment">
            <SliderInput
              label="Monthly agency retainer"
              value={state.agencyRetainer}
              min={0} max={25000} step={500}
              onChange={set("agencyRetainer")}
              prefix="£"
            />
            <SliderInput
              label="Monthly ad / tool spend"
              value={state.adToolSpend}
              min={0} max={5000} step={100}
              onChange={set("adToolSpend")}
              prefix="£"
            />
            <SliderInput
              label="One-time setup / onboarding fee"
              value={state.setupFee}
              min={0} max={25000} step={250}
              onChange={set("setupFee")}
              prefix="£"
              hint="Upfront cost — excluded from monthly ROI, included in year-1 annual ROI."
            />

            {/* Headcount — plain number input */}
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-medium text-[--text-secondary]">
                Sales reps dedicated to outbound
              </label>
              <input
                type="number"
                min={0} max={20} step={1}
                value={state.salesHeadcount}
                onChange={(e) => set("salesHeadcount")(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
                className="w-20 text-right text-sm font-bold text-[--text-primary] bg-transparent border-b border-[--border] focus:border-[--volt] focus:outline-none tabular-nums pb-px transition-colors"
              />
            </div>

            {state.salesHeadcount > 0 && (
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium text-[--text-secondary]">
                  Avg. fully loaded cost per rep / month
                </label>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-sm text-[--text-muted] font-medium">£</span>
                  <input
                    type="number"
                    min={0} max={15000} step={500}
                    value={state.costPerRep}
                    onChange={(e) => set("costPerRep")(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-20 text-right text-sm font-bold text-[--text-primary] bg-transparent border-b border-[--border] focus:border-[--volt] focus:outline-none tabular-nums pb-px transition-colors"
                  />
                </div>
              </div>
            )}

            <SliderInput
              label="Per meeting fee / bonus"
              value={state.perMeetingFee}
              min={0} max={1500} step={25}
              onChange={set("perMeetingFee")}
              prefix="£"
              hint="For pay-per-meeting or retainer + bonus models. Leave at £0 for retainer-only."
            />

            {/* Total cost summary */}
            <div className="rounded-lg border-2 border-[--border] bg-[--background] px-4 py-2.5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[--text-muted]">
                  Total Monthly Outbound Cost
                </span>
                <span className="text-sm font-bold text-[--volt] tabular-nums">
                  {fmtGBP(results.totalMonthlyCost)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[--text-muted]">
                  Cost Per Meeting
                </span>
                <span className="text-sm font-bold text-[--volt] tabular-nums">
                  {results.costPerMeeting !== null ? fmtGBP(results.costPerMeeting) : "—"}
                </span>
              </div>
            </div>
          </InputSection>

          {/* Section 2 */}
          <InputSection title="2 — Campaign Performance">
            <SliderInput
              label="Emails sent per month"
              value={state.emailsPerMonth}
              min={1000} max={100000} step={1000}
              onChange={set("emailsPerMonth")}
            />
            <SliderInput
              label="Average open rate"
              value={state.openRate}
              min={5} max={80} step={1}
              onChange={set("openRate")}
              suffix="%"
              benchmark={BENCHMARKS.openRate}
            />
            <SliderInput
              label="Average reply rate"
              value={state.replyRate}
              min={1} max={25} step={0.5}
              onChange={set("replyRate")}
              suffix="%"
              benchmark={BENCHMARKS.replyRate}
            />
            <SliderInput
              label="Positive reply rate (% of replies)"
              value={state.positiveReplyRate}
              min={10} max={80} step={5}
              onChange={set("positiveReplyRate")}
              suffix="%"
              benchmark={BENCHMARKS.positiveReplyRate}
            />
            <SliderInput
              label="Meeting show-up rate"
              value={state.showUpRate}
              min={30} max={100} step={5}
              onChange={set("showUpRate")}
              suffix="%"
              benchmark={BENCHMARKS.showUpRate}
            />
          </InputSection>

          {/* Section 3 */}
          <InputSection title="3 — Your Sales Metrics">
            <SliderInput
              label="Close rate (meeting → deal)"
              value={state.closeRate}
              min={5} max={60} step={1}
              onChange={set("closeRate")}
              suffix="%"
              benchmark={BENCHMARKS.closeRate}
            />
            <SliderInput
              label="Average deal value (monthly)"
              value={state.dealValue}
              min={500} max={500000} step={500}
              onChange={set("dealValue")}
              prefix="£"
            />
            <SliderInput
              label="Average contract length"
              value={state.contractLength}
              min={1} max={36} step={1}
              onChange={set("contractLength")}
              suffix=" mo"
            />
            <SliderInput
              label="Average sales cycle (months)"
              value={state.salesCycle}
              min={1} max={12} step={1}
              onChange={set("salesCycle")}
              suffix=" mo"
            />
          </InputSection>
        </div>

        {/* ── Right: Results (desktop sticky) ────────────────── */}
        <div className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl">
            <ResultsDashboard results={results} setupFee={state.setupFee} />
          </div>
        </div>
      </div>

      {/* Mobile results — below inputs */}
      <div className="lg:hidden mt-6">
        <ResultsDashboard results={results} setupFee={state.setupFee} />
      </div>

      {/* CTA */}
      <div className="mt-8 rounded-2xl border-2 border-[--volt]/20 bg-[--volt-glow] px-6 py-7 text-center">
        <h3 className="text-lg font-bold text-[--text-primary] mb-2">
          Want these numbers for real?
        </h3>
        <p className="text-sm text-[--text-secondary] mb-5 max-w-md mx-auto">
          Our clients consistently outperform industry benchmarks. Let&apos;s model what VoltScale
          can deliver for your specific business.
        </p>
        <Button asChild size="lg">
          <Link
            href="https://calendly.com/voltscalepartners/15mins"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Strategy Call
          </Link>
        </Button>
      </div>

      {/* Mobile: sticky bottom summary bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[--border] bg-[--background]/95 backdrop-blur-md px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[--text-muted]">Meetings/mo</p>
            <p className="text-sm font-bold text-[--volt] tabular-nums">{results.meetingsPerMonth.toFixed(1)}</p>
          </div>
          <div className="h-8 w-px bg-[--border]" />
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[--text-muted]">Revenue/mo</p>
            <p className="text-sm font-bold text-[--volt] tabular-nums">{fmtGBP(results.revenuePerMonth)}</p>
          </div>
          <div className="h-8 w-px bg-[--border]" />
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[--text-muted]">ROI</p>
            <p
              className="text-sm font-bold tabular-nums"
              style={{
                color: results.monthlyROI === null
                  ? "var(--text-muted)"
                  : results.monthlyROI >= 0
                  ? "var(--volt)"
                  : "rgb(248 113 113)"
              }}
            >
              {results.monthlyROI !== null
                ? `${results.monthlyROI >= 0 ? "+" : ""}${results.monthlyROI.toFixed(1)}%`
                : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Spacer so sticky bar doesn't overlap content on mobile */}
      <div className="lg:hidden h-16" aria-hidden="true" />
    </section>
  )
}
