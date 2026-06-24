import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CalendarDays,
  ArrowRight,
  X,
  Hand,
  Medal,
  Target,
  UserMinus,
  Clock,
  Coffee,
  Car,
  Play,
} from 'lucide-react'

function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function Dashboard() {
  const now = useNow()
  const navigate = useNavigate()
  const [showBanner, setShowBanner] = useState(true)

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {/* KPI alert banner */}
      {showBanner && (
        <div className="flex flex-col gap-3 rounded-2xl bg-orange-500 px-5 py-4 text-white sm:flex-row sm:items-center sm:gap-4">
          <div className="flex-1">
            <div className="text-base font-bold">Good evening, CEO!</div>
            <div className="text-sm text-orange-50">
              314 items on today's calendar — 308 overdue and affecting your KPI.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/calendar')}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
            >
              <CalendarDays className="h-4 w-4" />
              Open my Calendar
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="rounded-lg p-1 hover:bg-orange-600"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Welcome hero */}
      <div className="rounded-2xl bg-purple-600 p-6 text-white">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Welcome back, CEO</h1>
          <Hand className="h-7 w-7 text-yellow-300" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <Medal className="h-4 w-4 text-amber-300" />
            Bronze League
          </span>
        </div>
        <p className="mt-1 text-purple-100">Here's what's happening with your business today.</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm">Management</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm">
            <Target className="h-4 w-4 text-pink-300" />
            30.0 pts to Silver
          </span>
        </div>

        {/* Live clock */}
        <div className="mt-6 inline-block rounded-2xl bg-white/15 px-6 py-4">
          <div className="text-4xl font-bold tabular-nums">{time}</div>
          <div className="mt-1 text-sm text-purple-100">{date}</div>
        </div>
      </div>

      {/* Activity / time-tracking action bar */}
      <div className="flex flex-wrap gap-3">
        <ActionButton icon={UserMinus} label="Log Off" className="bg-white text-gray-700 border border-gray-200" />
        <ActionButton icon={Clock} label="11:18:16" className="bg-white text-gray-700 border border-gray-200" />
        <ActionButton icon={Coffee} label="Break" className="bg-yellow-400 text-gray-900" />
        <ActionButton icon={Clock} label="00:00:01" className="bg-gray-200 text-gray-600" />
        <ActionButton icon={Car} label="Travel" className="bg-sky-500 text-white" />
        <ActionButton icon={Play} label="Start Service / Meeting" className="bg-green-500 text-white" />
      </div>
    </div>
  )
}

function ActionButton({
  icon: Icon,
  label,
  className,
}: {
  icon: typeof Clock
  label: string
  className: string
}) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${className}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}
