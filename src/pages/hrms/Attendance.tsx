import { useState } from 'react'
import { Download, UserPlus, MapPin, ChevronDown, CalendarCheck } from 'lucide-react'
import { attendance, attendanceSummary } from '@/data/hrms'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Attendance() {
  const [view, setView] = useState<'daily' | 'employee'>('daily')

  return (
    <div className="space-y-5">
      {/* Top controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-lg border border-gray-200 bg-white p-0.5 text-sm">
          <button
            onClick={() => setView('daily')}
            className={`rounded-md px-3 py-1.5 font-medium ${view === 'daily' ? 'bg-green-500 text-white' : 'text-gray-500'}`}
          >
            Daily (all staff)
          </button>
          <button
            onClick={() => setView('employee')}
            className={`rounded-md px-3 py-1.5 font-medium ${view === 'employee' ? 'bg-green-500 text-white' : 'text-gray-500'}`}
          >
            By Employee
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
            06/23/2026
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">
            <UserPlus className="h-4 w-4" />
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="flex flex-wrap gap-3">
        <StatCard value={attendanceSummary.activeStaff} label="Active staff" active />
        <StatCard value={attendanceSummary.present} label="present" valueColor="text-green-600" />
        <StatCard value={attendanceSummary.late} label="late" valueColor="text-amber-500" />
        <StatCard value={attendanceSummary.halfDay} label="half day" valueColor="text-orange-500" />
        <StatCard value={attendanceSummary.onLeave} label="on leave" valueColor="text-blue-500" />
        <StatCard value={attendanceSummary.absent} label="absent" valueColor="text-red-500" />
      </div>

      {/* Attendance table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
          <CalendarCheck className="h-4 w-4 text-brand-500" />
          <span className="text-sm font-semibold text-gray-700">Attendance · Jun-23-2026</span>
          <Badge tone="blue">{attendance.length}</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-4 py-2 font-medium">Employee</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Check In</th>
                <th className="px-4 py-2 font-medium">Check Out</th>
                <th className="px-4 py-2 font-medium">Break</th>
                <th className="px-4 py-2 font-medium">Travel</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((row) => (
                <tr key={row.empId} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${row.avatarColor}`}
                      >
                        {initials(row.name)}
                      </div>
                      <span className="font-medium text-gray-800">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone="green">present</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-gray-700">
                      {row.checkIn}
                      {row.hasLocation && <MapPin className="h-3.5 w-3.5 text-red-500" />}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.checkOut}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {row.breaks ? (
                      <span className="inline-flex items-center gap-1">
                        {row.breaks}
                        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.travel ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
