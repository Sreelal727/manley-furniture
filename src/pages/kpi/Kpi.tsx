import { useMemo, useState, type ReactNode } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'
import { Trophy, ListChecks, Ticket, Clock, IndianRupee } from 'lucide-react'
import { kpiRecords, scoreFor, scoreTone } from '@/data/kpi'
import { formatCurrency } from '@/lib/pipeline'
import StatCard from '@/components/ui/StatCard'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

type SortKey = 'efficiency' | 'punctuality' | 'revenue'

export default function Kpi() {
  const [sort, setSort] = useState<SortKey>('efficiency')

  const rows = useMemo(() => {
    const scored = kpiRecords.map((r) => ({ record: r, score: scoreFor(r) }))
    scored.sort((a, b) => {
      if (sort === 'punctuality') return b.score.punctuality - a.score.punctuality
      if (sort === 'revenue') return b.record.revenue - a.record.revenue
      return b.score.efficiency - a.score.efficiency
    })
    return scored
  }, [sort])

  const teamAvg = Math.round(
    rows.reduce((s, r) => s + r.score.efficiency, 0) / (rows.length || 1),
  )
  const top = rows[0]
  const totalRevenue = kpiRecords.reduce((s, r) => s + r.revenue, 0)
  const avgPunctuality = Math.round(
    kpiRecords.reduce((s, r) => s + r.punctuality, 0) / kpiRecords.length,
  )

  const chartData = rows.map((r) => ({
    name: r.record.name.split(' ')[0],
    efficiency: r.score.efficiency,
    fill: scoreTone(r.score.efficiency).bar,
  }))

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="flex items-baseline gap-2">
        <h1 className="text-2xl font-bold text-brand-600">KPI &amp; Performance</h1>
        <span className="text-sm text-gray-400">Per-employee efficiency · this month</span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard value={`${teamAvg}%`} label="Team avg efficiency" valueColor="text-brand-600" active />
        <StatCard value={top ? top.record.name.split(' ')[0] : '—'} label="Top performer" valueColor="text-green-600" />
        <StatCard value={`${avgPunctuality}%`} label="Avg punctuality" valueColor="text-violet-600" />
        <StatCard value={formatCurrency(totalRevenue)} label="Revenue (team)" valueColor="text-orange-500" />
      </div>

      {/* Efficiency comparison chart */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <h3 className="mb-3 font-semibold text-gray-800">Efficiency by employee</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 10, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" height={56} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="efficiency" radius={[4, 4, 0, 0]}>
                {chartData.map((d, i) => (
                  <Cell key={i} fill={d.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sort control */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        {([
          ['efficiency', 'Efficiency'],
          ['revenue', 'Revenue'],
          ['punctuality', 'Punctuality'],
        ] as [SortKey, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSort(key)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              sort === key ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Leaderboard cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {rows.map(({ record: r, score }, idx) => {
          const tone = scoreTone(score.efficiency)
          return (
            <div key={r.id} className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                    {initials(r.name)}
                  </div>
                  {idx < 3 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white">
                      {idx + 1}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-800">{r.name}</div>
                  <div className="text-xs text-gray-400">
                    {r.role} · {r.department}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${tone.text}`}>{score.efficiency}%</div>
                  <div className="text-[11px] text-gray-400">{tone.label}</div>
                </div>
              </div>

              {/* Metric bars */}
              <div className="mt-4 space-y-2.5">
                <Metric
                  icon={<ListChecks className="h-3.5 w-3.5" />}
                  label="Tasks cleared"
                  detail={`${r.tasksDone}/${r.tasksTotal}`}
                  pct={score.taskRate}
                  color="#12b76a"
                />
                <Metric
                  icon={<Ticket className="h-3.5 w-3.5" />}
                  label="Tickets cleared"
                  detail={`${r.ticketsDone}/${r.ticketsTotal}`}
                  pct={score.ticketRate}
                  color="#0891b2"
                />
                <Metric
                  icon={<Clock className="h-3.5 w-3.5" />}
                  label="Punctuality"
                  detail={`${r.punctuality}%`}
                  pct={r.punctuality}
                  color="#7c3aed"
                />
                {score.revenueAttain !== null ? (
                  <Metric
                    icon={<IndianRupee className="h-3.5 w-3.5" />}
                    label="Revenue vs target"
                    detail={`${formatCurrency(r.revenue)} · ${score.revenueAttain}%`}
                    pct={score.revenueAttain}
                    color="#f97316"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <IndianRupee className="h-3.5 w-3.5" />
                    Non-revenue role
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="flex items-center gap-1.5 text-xs text-gray-400">
        <Trophy className="h-3.5 w-3.5" />
        Efficiency = weighted blend of task &amp; ticket clearance, punctuality, and (for sales roles)
        revenue attainment.
      </p>
    </div>
  )
}

function Metric({
  icon,
  label,
  detail,
  pct,
  color,
}: {
  icon: ReactNode
  label: string
  detail: string
  pct: number
  color: string
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-gray-500">
          {icon}
          {label}
        </span>
        <span className="font-medium text-gray-700">{detail}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.min(100, pct)}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
