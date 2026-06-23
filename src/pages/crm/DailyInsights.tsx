import { useState } from 'react'
import { Lightbulb, RefreshCw, X, AlertTriangle, Hourglass, UserX } from 'lucide-react'
import {
  stuckOver7Days,
  oldestOpenLeads,
  leastActiveToday,
  type InsightItem,
} from '@/data/crm'

function InsightList({ items }: { items: InsightItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="w-8 shrink-0 text-right text-sm font-semibold text-gray-400">
            {it.rank}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-gray-800">{it.title}</div>
            <div className="truncate text-xs text-gray-400">{it.subtitle}</div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function DailyInsights() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <span className="font-semibold text-gray-800">Daily Insights</span>
          <span className="text-xs text-gray-400">leadership only</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <button className="rounded p-1 hover:bg-gray-100" aria-label="Refresh">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button onClick={() => setOpen(false)} className="rounded p-1 hover:bg-gray-100" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-orange-500">
            <AlertTriangle className="h-4 w-4" />
            STUCK &gt; 7 DAYS
          </div>
          <InsightList items={stuckOver7Days} />
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-500">
            <Hourglass className="h-4 w-4" />
            OLDEST OPEN LEADS
          </div>
          <InsightList items={oldestOpenLeads} />
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-pink-500">
            <UserX className="h-4 w-4" />
            LEAST ACTIVE TODAY
          </div>
          <ul className="space-y-3">
            {leastActiveToday.map((r) => (
              <li key={r.rank} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-xs font-semibold text-white">
                  {r.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-gray-800">{r.name}</div>
                  <div className="text-xs text-gray-400">
                    {r.changes} · {r.active}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
