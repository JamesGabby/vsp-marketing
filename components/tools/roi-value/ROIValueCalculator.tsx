"use client"

import { useMemo, useState } from "react"
import { RotateCcw, Table2, TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  calculate,
  clampNetLtv,
  fmtCount,
  fmtMonth,
  fmtMultiple,
  fmtPct,
  fmtRatio,
} from "./calculations"
import { CurrencyProvider, useMoney, type CurrencyCode } from "./currency"
import { CurrencySwitch } from "./CurrencySwitch"
import {
  CLOSE_RATE_BENCHMARK,
  DEFAULTS,
  PRESETS,
  RANGES,
  ZEROED,
  type PresetKey,
  type ValueState,
} from "./constants"
import { DelayCost } from "./DelayCost"
import { RangeSlider } from "./RangeSlider"
import { ReturnCurveChart } from "./ReturnCurveChart"
import { ValueComposition } from "./ValueComposition"
import { ValueStat } from "./ValueStat"
import { ValueTable } from "./ValueTable"
import { useAnimatedNumber } from "./useAnimated"

const PRESET_LABELS: Record<PresetKey, string> = {
  conservative: "Conservative",
  balanced: "Balanced",
  ambitious: "Ambitious",
}

export function ROIValueCalculator() {
  // Currency wraps the calculator rather than living inside it, so every figure
  // below reads the same denomination from one place.
  const [currency, setCurrency] = useState<CurrencyCode>("USD")

  return (
    <CurrencyProvider code={currency}>
      <CalculatorBody currency={currency} onCurrencyChange={setCurrency} />
    </CurrencyProvider>
  )
}

interface CalculatorBodyProps {
  currency: CurrencyCode
  onCurrencyChange: (code: CurrencyCode) => void
}

function CalculatorBody({ currency, onCurrencyChange }: CalculatorBodyProps) {
  const { fmtMoney, symbol } = useMoney()
  const [state, setState] = useState<ValueState>(DEFAULTS)
  const [showTable, setShowTable] = useState(false)

  const results = useMemo(() => calculate(state), [state])
  const netLtv = clampNetLtv(state)
  const animRoi = useAnimatedNumber(results.roi ?? 0)

  function update<K extends keyof ValueState>(key: K, value: number) {
    setState((prev) => {
      const next = { ...prev, [key]: value }
      // Net lifetime value is a slice of the gross figure, never more than it.
      if (key === "grossLtv") next.netLtv = Math.min(next.netLtv, value)
      if (key === "netLtv") next.netLtv = Math.min(value, next.grossLtv)
      return next
    })
  }

  const activePreset = (Object.keys(PRESETS) as PresetKey[]).find((key) =>
    (Object.keys(PRESETS[key]) as (keyof ValueState)[]).every(
      (field) => PRESETS[key][field] === state[field]
    )
  )

  const profitable = results.netProfit >= 0
  // Distinguishes "cleared the form" from "modelled a year that breaks exactly
  // even", which would otherwise render identically.
  const hasInputs = results.annualInvestment > 0 || results.netReturn > 0
  // "n/a" says the ratio cannot be formed from real numbers; the dash says no
  // numbers have been entered yet.
  const emptyValue = hasInputs ? "n/a" : "—"

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-(--border) bg-(--surface)">
      <div className="grid lg:grid-cols-12">
        {/* Inputs */}
        <aside className="min-w-0 border-b-2 border-(--border) p-6 lg:col-span-4 lg:border-b-0 lg:border-r-2 lg:p-8">
          <div className="lg:sticky lg:top-24">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-(--text-muted)">
                Your numbers
              </h2>
              <div className="flex items-center gap-3">
                <CurrencySwitch value={currency} onChange={onCurrencyChange} />
                <button
                  type="button"
                  onClick={() => setState(ZEROED)}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-(--text-muted) transition-colors hover:text-(--volt)"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setState(PRESETS[key])}
                  aria-pressed={activePreset === key}
                  className={cn(
                    "rounded-full border-2 px-3 py-1 text-xs font-semibold transition-colors",
                    activePreset === key
                      ? "border-(--volt) bg-(--volt) text-(--volt-foreground)"
                      : "border-(--border) text-(--text-secondary) hover:border-(--volt)"
                  )}
                >
                  {PRESET_LABELS[key]}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <RangeSlider
                label="Qualified meetings held per year"
                value={state.meetingsPerYear}
                min={RANGES.meetingsPerYear.min}
                max={RANGES.meetingsPerYear.max}
                step={RANGES.meetingsPerYear.step}
                onChange={(v) => update("meetingsPerYear", v)}
                hint={`About ${fmtCount(state.meetingsPerYear / 12)} a month once the campaign is at full pace`}
              />

              <RangeSlider
                label="Prospects closing rate"
                value={state.closeRate}
                min={RANGES.closeRate.min}
                max={RANGES.closeRate.max}
                step={RANGES.closeRate.step}
                onChange={(v) => update("closeRate", v)}
                suffix="%"
                benchmark={CLOSE_RATE_BENCHMARK}
              />

              <RangeSlider
                label="Gross customer lifetime value"
                value={state.grossLtv}
                min={RANGES.grossLtv.min}
                max={RANGES.grossLtv.max}
                step={RANGES.grossLtv.step}
                onChange={(v) => update("grossLtv", v)}
                prefix={symbol}
                hint="Total revenue one customer bills you over their lifetime"
              />

              <RangeSlider
                label="Net customer lifetime value"
                value={netLtv}
                min={Math.min(RANGES.netLtv.min, state.grossLtv)}
                max={state.grossLtv}
                step={RANGES.netLtv.step}
                onChange={(v) => update("netLtv", v)}
                prefix={symbol}
                hint={`${fmtPct(results.marginPct)} of gross, after the cost of delivering the work`}
              />

              <RangeSlider
                label="Fee per qualified meeting held"
                value={state.pricePerMeeting}
                min={RANGES.pricePerMeeting.min}
                max={RANGES.pricePerMeeting.max}
                step={RANGES.pricePerMeeting.step}
                onChange={(v) => update("pricePerMeeting", v)}
                prefix={symbol}
                hint={`${symbol}300 on average, higher where the ICP is hard to reach`}
              />

              <RangeSlider
                label="Tools, tech and infrastructure per month"
                value={state.monthlyInfra}
                min={RANGES.monthlyInfra.min}
                max={RANGES.monthlyInfra.max}
                step={RANGES.monthlyInfra.step}
                onChange={(v) => update("monthlyInfra", v)}
                prefix={symbol}
                hint="Billed monthly whatever the meeting volume"
              />
            </div>

            {/* The two fees above are what a client agrees to. This is the
                number they end up spending, so show it rather than making them
                do the multiplication. */}
            <dl className="mt-6 rounded-xl border border-(--border) p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-widest text-(--text-muted)">
                Total investment, year one
              </dt>
              <dd className="mt-1 text-2xl font-bold tracking-tight text-(--text-primary)">
                {fmtMoney(results.annualInvestment)}
              </dd>
              <dd className="mt-1 text-[11px] leading-snug text-(--text-muted)">
                {fmtMoney(results.annualMeetingFees)} in meeting fees plus{" "}
                {fmtMoney(results.annualInfra)} of tooling
              </dd>
            </dl>
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0 p-6 lg:col-span-8 lg:p-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-(--text-muted)">
                Return on investment, year one
              </p>
              <p
                className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl"
                style={{ color: profitable ? "var(--volt)" : "var(--chart-negative)" }}
              >
                {results.roi === null ? emptyValue : fmtPct(animRoi, true)}
              </p>
              <p className="mt-2 text-sm text-(--text-secondary)">
                {hasInputs ? (
                  <>
                    {profitable ? "Net profit of " : "Net loss of "}
                    <strong className="font-semibold text-(--text-primary)">
                      {fmtMoney(Math.abs(results.netProfit))}
                    </strong>{" "}
                    on {fmtMoney(results.annualInvestment)} invested
                  </>
                ) : (
                  "Set your numbers on the left, or start from a preset"
                )}
              </p>
            </div>

            <div className="rounded-xl border border-(--border) px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-(--text-muted)">
                Every {symbol}1 invested returns
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-(--text-primary)">
                {results.multiple === null ? emptyValue : fmtMultiple(results.multiple)}
              </p>
            </div>
          </div>

          {/* Everything above is an expected value. Say so while the volume is
              too small for that average to describe a real year. */}
          {results.tooFewMeetings && (
            <div className="mb-8 flex gap-3 rounded-xl border border-(--border) border-l-[3px] border-l-(--chart-shortfall) bg-(--background) p-4">
              <TriangleAlert
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: "var(--chart-shortfall)" }}
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-bold text-(--text-primary)">
                  Too few meetings for this to be a forecast
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-(--text-secondary)">
                  At {fmtCount(state.meetingsPerYear)} meetings and a {fmtPct(state.closeRate)}{" "}
                  close rate you would expect {fmtCount(results.customers)} customers, and there
                  is a{" "}
                  <strong className="font-semibold text-(--text-primary)">
                    {fmtPct(results.probabilityOfZero * 100)} chance of winning none at all
                  </strong>
                  . The return above is an average across many possible years, and at this
                  volume they differ wildly. It settles into something you can plan against at
                  roughly {fmtCount(results.meetingsForSignal)} meetings a year.
                </p>
              </div>
            </div>
          )}

          <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            <ValueStat
              label="Customers won"
              value={results.customers}
              format={fmtCount}
              sub={`from ${fmtCount(state.meetingsPerYear)} qualified meetings`}
            />
            <ValueStat
              label="Net value returned"
              value={results.netReturn}
              format={fmtMoney}
              sub="lifetime, after cost of delivery"
            />
            <ValueStat
              label="Gross revenue"
              value={results.grossReturn}
              format={fmtMoney}
              sub="lifetime, before cost of delivery"
            />
            <ValueStat
              label="Breakeven"
              value={results.breakevenMonth}
              format={fmtMonth}
              nullDisplay={hasInputs ? "Beyond year 1" : "—"}
              negative={hasInputs && results.breakevenMonth === null}
              sub="when returns overtake spend"
            />
          </div>

          <div className="mb-8 border-t-2 border-(--border) pt-8">
            <ReturnCurveChart
              cumReturn={results.cumReturn}
              cumCost={results.cumCost}
              breakevenMonth={results.breakevenMonth}
            />
          </div>

          <div className="mb-8 border-t-2 border-(--border) pt-8">
            <DelayCost
              points={results.delay}
              baseline={results.netReturn}
              forgonePerDay={results.forgonePerDay}
            />
          </div>

          <div className="mb-8 border-t-2 border-(--border) pt-8">
            <ValueComposition
              deliveryCost={results.deliveryCost}
              annualInvestment={results.annualInvestment}
              netReturn={results.netReturn}
            />
          </div>

          {/* Value of one meeting sits immediately left of the cost of one, so
              the trade the whole page argues reads straight across. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t-2 border-(--border) pt-8 sm:grid-cols-4">
            <ValueStat
              label="Value per meeting"
              // Close rate times net LTV, so this stands up before any volume or
              // fee is entered. That is the point at which it matters most.
              value={results.valuePerMeeting > 0 ? results.valuePerMeeting : null}
              format={fmtMoney}
              nullDisplay={emptyValue}
              sub="what one held meeting is worth, closed or not"
            />
            <ValueStat
              label="All-in cost per meeting"
              nullDisplay={emptyValue}
              value={results.costPerMeeting}
              format={fmtMoney}
              sub={`${fmtMoney(state.pricePerMeeting)} fee plus tooling spread across the year`}
            />
            <ValueStat
              label="Cost per customer"
              nullDisplay={emptyValue}
              value={results.cac}
              format={fmtMoney}
              sub="acquisition cost from this channel"
            />
            <ValueStat
              label="Net LTV to CAC"
              nullDisplay={emptyValue}
              value={results.ltvCac}
              format={fmtRatio}
              sub="3 : 1 or better is healthy"
              negative={results.ltvCac !== null && results.ltvCac < 1}
            />
          </div>

          <div className="mt-8 border-t-2 border-(--border) pt-6">
            <button
              type="button"
              onClick={() => setShowTable((v) => !v)}
              aria-expanded={showTable}
              className="flex items-center gap-2 text-xs font-semibold text-(--text-secondary) transition-colors hover:text-(--volt)"
            >
              <Table2 className="h-4 w-4" />
              {showTable ? "Hide the numbers" : "Show the numbers month by month"}
            </button>
            {showTable && (
              <div className="mt-5">
                <ValueTable series={results.series} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
