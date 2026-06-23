interface StatCardProps {
  value: number | string
  label: string
  /** Tailwind text-color class for the value, e.g. "text-green-600" */
  valueColor?: string
  active?: boolean
}

export default function StatCard({
  value,
  label,
  valueColor = 'text-gray-900',
  active = false,
}: StatCardProps) {
  return (
    <div
      className={`flex min-w-[96px] flex-1 flex-col items-center justify-center rounded-xl border bg-white px-4 py-3 ${
        active ? 'border-brand-400 ring-1 ring-brand-200' : 'border-gray-200'
      }`}
    >
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
      <div className="mt-0.5 text-xs font-medium text-gray-500">{label}</div>
    </div>
  )
}
