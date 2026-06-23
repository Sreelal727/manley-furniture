import { useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
  ChevronDown,
  CalendarCheck,
  CheckCircle2,
} from 'lucide-react'
import {
  events as allEvents,
  typeMeta,
  typeOrder,
  statusLabel,
  teamWorkload,
  type CalEvent,
  type CalEventType,
  type CalStatus,
} from '@/data/calendar'
import {
  ymd,
  sameDay,
  addDays,
  addMonths,
  monthMatrix,
  weekDays,
  WEEKDAY_LABELS,
} from '@/lib/dates'

type View = 'month' | 'week' | 'day'

// "Today" is fixed to match the sample data (23 June 2026).
const TODAY = new Date(2026, 5, 23)

const statusTone: Record<CalStatus, string> = {
  done: 'bg-green-100 text-green-700',
  open: 'bg-slate-100 text-slate-600',
  pending: 'bg-amber-100 text-amber-700',
  overdue: 'bg-red-100 text-red-700',
}

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Calendar() {
  const [view, setView] = useState<View>('month')
  const [ref, setRef] = useState<Date>(TODAY)
  const [activeTypes, setActiveTypes] = useState<Set<CalEventType>>(new Set())
  const [workloadOpen, setWorkloadOpen] = useState(true)

  // Events within the visible period (before the type filter).
  const periodEvents = useMemo(() => {
    if (view === 'day') return allEvents.filter((e) => e.date === ymd(ref))
    if (view === 'week') {
      const days = new Set(weekDays(ref).map(ymd))
      return allEvents.filter((e) => days.has(e.date))
    }
    return allEvents.filter((e) => {
      const d = e.date.split('-')
      return Number(d[0]) === ref.getFullYear() && Number(d[1]) === ref.getMonth() + 1
    })
  }, [view, ref])

  const counts = useMemo(() => {
    const c = {} as Record<CalEventType, number>
    typeOrder.forEach((t) => (c[t] = 0))
    periodEvents.forEach((e) => (c[e.type] += 1))
    return c
  }, [periodEvents])

  const visible = useMemo(
    () => (activeTypes.size === 0 ? allEvents : allEvents.filter((e) => activeTypes.has(e.type))),
    [activeTypes],
  )

  function toggleType(t: CalEventType) {
    setActiveTypes((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }

  function navigate(dir: -1 | 0 | 1) {
    if (dir === 0) return setRef(TODAY)
    if (view === 'month') return setRef((r) => addMonths(r, dir))
    if (view === 'week') return setRef((r) => addDays(r, dir * 7))
    return setRef((r) => addDays(r, dir))
  }

  const periodLabel =
    view === 'month'
      ? ref.toLocaleString('en-US', { month: 'long', year: 'numeric' })
      : view === 'week'
        ? (() => {
            const wd = weekDays(ref)
            const a = wd[0].toLocaleString('en-US', { month: 'short', day: 'numeric' })
            const b = wd[6].toLocaleString('en-US', { month: 'short', day: 'numeric' })
            return `${a} – ${b}, ${wd[6].getFullYear()}`
          })()
        : ref.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {/* Title + navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-brand-600">My Calendar</h1>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate(0)}
              className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Today
            </button>
            <button
              onClick={() => navigate(1)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <span className="text-sm font-semibold text-gray-700">{periodLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          {!workloadOpen && (
            <button
              onClick={() => setWorkloadOpen(true)}
              className="hidden rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 sm:block"
            >
              Team Workload
            </button>
          )}
          <button className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 sm:flex">
            My calendar
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
          <div className="flex rounded-lg border border-gray-200 p-0.5 text-sm">
            {(['month', 'week', 'day'] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-md px-3 py-1 font-medium capitalize ${
                  view === v ? 'bg-brand-500 text-white' : 'text-gray-500'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Legend / type filter */}
      <div className="flex flex-wrap gap-2">
        {typeOrder.map((t) => {
          const meta = typeMeta[t]
          const active = activeTypes.has(t)
          return (
            <button
              key={t}
              onClick={() => toggleType(t)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                active ? 'border-transparent text-white' : 'border-gray-200 bg-white text-gray-600'
              }`}
              style={active ? { backgroundColor: meta.color } : undefined}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: active ? '#fff' : meta.color }} />
              {meta.label}
              <span className={active ? 'opacity-90' : 'text-gray-400'}>{counts[t]}</span>
            </button>
          )
        })}
      </div>

      {workloadOpen && <WorkloadPanel view={view} onClose={() => setWorkloadOpen(false)} />}

      {view === 'month' && <MonthView cursor={ref} events={visible} />}
      {view === 'week' && <WeekView cursor={ref} events={visible} />}
      {view === 'day' && <DayView cursor={ref} events={visible} />}
    </div>
  )
}

/* ----------------------------- Workload panel ---------------------------- */

function WorkloadPanel({ view, onClose }: { view: View; onClose: () => void }) {
  const period = view === 'day' ? 'today' : `this ${view}`
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-brand-500" />
          <span className="font-semibold text-gray-800">Team Workload · {period}</span>
          <span className="text-xs text-gray-400">leadership only</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <button className="rounded p-1 hover:bg-gray-100" aria-label="Refresh">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button onClick={onClose} className="rounded p-1 hover:bg-gray-100" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {teamWorkload.map((section) => (
          <section key={section.label}>
            <div className="mb-3 text-sm font-semibold text-gray-500">{section.label}</div>
            <ul className="space-y-2.5">
              {section.people.map((p) => (
                <li key={p.name} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                    {initials(p.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-gray-800">{p.name}</div>
                    <div className="text-xs text-gray-400">
                      {p.done}/{p.total} done
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
        <CheckCircle2 className="h-4 w-4" />
        All caught up — nothing overdue {period}.
      </div>
    </div>
  )
}

/* ------------------------------- Month view ------------------------------ */

function MonthView({ cursor, events }: { cursor: Date; events: CalEvent[] }) {
  const weeks = monthMatrix(cursor)
  const byDay = groupByDay(events)

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <div className="min-w-[760px]">
        <div className="grid grid-cols-7 border-b border-gray-200">
          {WEEKDAY_LABELS.map((d) => (
            <div key={d} className="px-2 py-2 text-center text-xs font-semibold text-gray-400">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {weeks.flat().map((day, i) => {
            const inMonth = day.getMonth() === cursor.getMonth()
            const isToday = sameDay(day, TODAY)
            const dayEvents = byDay[ymd(day)] ?? []
            return (
              <div
                key={i}
                className={`min-h-[104px] border-b border-r border-gray-100 p-1.5 ${
                  inMonth ? '' : 'bg-gray-50/60'
                }`}
              >
                <div className="mb-1 flex justify-end">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      isToday
                        ? 'bg-brand-500 font-semibold text-white'
                        : inMonth
                          ? 'text-gray-600'
                          : 'text-gray-300'
                    }`}
                  >
                    {day.getDate()}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((e) => (
                    <EventPill key={e.id} event={e} />
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="px-1 text-[11px] font-medium text-gray-400">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function EventPill({ event }: { event: CalEvent }) {
  const meta = typeMeta[event.type]
  const overdue = event.status === 'overdue'
  const done = event.status === 'done'
  return (
    <div
      className="flex items-center gap-1.5 truncate rounded px-1.5 py-0.5 text-[11px]"
      style={{
        backgroundColor: overdue ? '#fee2e2' : meta.color + '1a',
        color: overdue ? '#b91c1c' : '#374151',
      }}
      title={event.title}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: meta.color }} />
      <span className={`truncate ${done ? 'text-gray-400 line-through' : ''}`}>{event.title}</span>
    </div>
  )
}

/* ------------------------------- Week view ------------------------------- */

function WeekView({ cursor, events }: { cursor: Date; events: CalEvent[] }) {
  const days = weekDays(cursor)
  const byDay = groupByDay(events)

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <div className="grid min-w-[840px] grid-cols-7">
        {days.map((day) => {
          const isToday = sameDay(day, TODAY)
          const dayEvents = byDay[ymd(day)] ?? []
          return (
            <div key={ymd(day)} className="border-r border-gray-100 last:border-r-0">
              <div
                className={`border-b border-gray-200 px-2 py-2 text-center ${
                  isToday ? 'bg-brand-500 text-white' : 'text-gray-600'
                }`}
              >
                <div className="text-xs font-medium uppercase">
                  {day.toLocaleString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-bold">{day.getDate()}</div>
              </div>
              <div className="space-y-2 p-2">
                {dayEvents.length === 0 && (
                  <div className="py-4 text-center text-[11px] text-gray-300">—</div>
                )}
                {dayEvents.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* -------------------------------- Day view ------------------------------- */

function DayView({ cursor, events }: { cursor: Date; events: CalEvent[] }) {
  const dayEvents = events
    .filter((e) => e.date === ymd(cursor))
    .sort((a, b) => (a.time ?? '').localeCompare(b.time ?? ''))

  if (dayEvents.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-sm text-gray-400">
        No items scheduled for this day.
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {dayEvents.map((e) => (
        <EventCard key={e.id} event={e} expanded />
      ))}
    </div>
  )
}

/* ------------------------------- Event card ------------------------------ */

function EventCard({ event, expanded = false }: { event: CalEvent; expanded?: boolean }) {
  const meta = typeMeta[event.type]
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white p-2.5"
      style={{ borderLeftWidth: 4, borderLeftColor: meta.color }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: meta.color }}>
          {meta.label}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusTone[event.status]}`}>
          {statusLabel[event.status]}
        </span>
      </div>
      <div
        className={`mt-1 text-sm font-medium ${
          event.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-800'
        }`}
      >
        {event.title}
      </div>
      {(expanded || event.time || event.assignee) && (
        <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-gray-400">
          {event.time && <span>{event.time}</span>}
          {event.assignee && <span>{event.assignee}</span>}
        </div>
      )}
    </div>
  )
}

/* -------------------------------- helpers -------------------------------- */

function groupByDay(events: CalEvent[]): Record<string, CalEvent[]> {
  const map: Record<string, CalEvent[]> = {}
  for (const e of events) {
    ;(map[e.date] ??= []).push(e)
  }
  return map
}
