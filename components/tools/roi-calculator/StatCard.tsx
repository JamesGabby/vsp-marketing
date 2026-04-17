interface StatCardProps {
  label: string
  value: string
  sub?: string
}

export function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="rounded-xl border-2 border-[--border] bg-[--background] p-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[--text-muted] mb-1">
        {label}
      </p>
      <p className="text-base font-bold text-[--text-primary] tabular-nums">{value}</p>
      {sub && (
        <p className="text-[10px] text-[--text-muted] mt-0.5">{sub}</p>
      )}
    </div>
  )
}
