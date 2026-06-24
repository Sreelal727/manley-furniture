import { useMemo, useState } from 'react'
import { MapPin, Wrench, UserCheck, Play, CheckCircle2, Package } from 'lucide-react'
import { useBilling, serviceDepartments, type InstallStatus } from '@/store/billing'
import { employees } from '@/data/hrms'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'

const serviceStaff = employees.filter((e) => serviceDepartments.includes(e.department))

const statusMeta: Record<InstallStatus, { label: string; tone: 'gray' | 'blue' | 'amber' | 'green' }> = {
  pending: { label: 'Pending', tone: 'gray' },
  assigned: { label: 'Assigned', tone: 'blue' },
  in_progress: { label: 'In Progress', tone: 'amber' },
  completed: { label: 'Completed', tone: 'green' },
}

const filters: (InstallStatus | 'all')[] = ['all', 'pending', 'assigned', 'in_progress', 'completed']

export default function Installation() {
  const { installations, assignInstallation, advanceStatus } = useBilling()
  const [filter, setFilter] = useState<InstallStatus | 'all'>('all')

  const counts = useMemo(() => {
    const c = { pending: 0, assigned: 0, in_progress: 0, completed: 0 } as Record<InstallStatus, number>
    installations.forEach((i) => (c[i.status] += 1))
    return c
  }, [installations])

  const visible = installations.filter((i) => filter === 'all' || i.status === filter)

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="flex items-baseline gap-2">
        <h1 className="text-2xl font-bold text-brand-600">Installation</h1>
        <span className="text-sm text-gray-400">Site installation jobs from billing</span>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        <StatCard value={installations.length} label="Total jobs" active />
        <StatCard value={counts.pending} label="Pending" valueColor="text-gray-600" />
        <StatCard value={counts.assigned} label="Assigned" valueColor="text-brand-600" />
        <StatCard value={counts.in_progress} label="In progress" valueColor="text-amber-500" />
        <StatCard value={counts.completed} label="Completed" valueColor="text-green-600" />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === f ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {f === 'all' ? 'All' : statusMeta[f].label}
          </button>
        ))}
      </div>

      {/* Job cards */}
      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-sm text-gray-400">
          No installation jobs in this view.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((job) => {
            const meta = statusMeta[job.status]
            return (
              <div key={job.id} className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-brand-500" />
                      <span className="font-semibold text-gray-800">{job.customer}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-gray-400">{job.invoiceNo}</div>
                  </div>
                  <Badge tone={meta.tone}>{meta.label}</Badge>
                </div>

                {job.address && (
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    {job.address}
                  </div>
                )}

                {/* Items */}
                <ul className="mt-3 space-y-1 rounded-lg bg-gray-50 p-3 text-sm">
                  {job.items.map((it, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <Package className="h-3.5 w-3.5 text-gray-400" />
                      <span className="flex-1">{it.name}</span>
                      <span className="text-gray-400">× {it.qty}</span>
                    </li>
                  ))}
                </ul>

                {job.scheduledDate && (
                  <div className="mt-3 text-xs text-gray-400">Scheduled: {job.scheduledDate}</div>
                )}

                {/* Assignment + actions */}
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-gray-400" />
                    <select
                      value={job.assignedTo ?? ''}
                      onChange={(e) => assignInstallation(job.id, e.target.value)}
                      disabled={job.status === 'completed'}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-brand-400 disabled:opacity-60"
                    >
                      <option value="" disabled>
                        Assign service employee…
                      </option>
                      {serviceStaff.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} · {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ml-auto">
                    {job.status === 'assigned' && (
                      <button
                        onClick={() => advanceStatus(job.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600"
                      >
                        <Play className="h-3.5 w-3.5" />
                        Start
                      </button>
                    )}
                    {job.status === 'in_progress' && (
                      <button
                        onClick={() => advanceStatus(job.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-600"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Mark Complete
                      </button>
                    )}
                    {job.status === 'completed' && (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        Done
                      </span>
                    )}
                    {job.status === 'pending' && (
                      <span className="text-xs text-gray-400">Assign to begin</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
