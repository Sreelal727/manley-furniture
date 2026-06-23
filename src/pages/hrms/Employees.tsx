import { useMemo, useState } from 'react'
import { Search, Download, Plus } from 'lucide-react'
import { employees as allEmployees } from '@/data/hrms'
import Badge from '@/components/ui/Badge'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Employees() {
  const [query, setQuery] = useState('')
  const [activeOnly, setActiveOnly] = useState(true)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allEmployees.filter((e) => {
      if (activeOnly && !e.active) return false
      if (!q) return true
      return (
        e.name.toLowerCase().includes(q) ||
        e.empId.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
      )
    })
  }, [query, activeOnly])

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, ID, designation, department…"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-400"
          />
        </div>

        <div className="flex rounded-lg border border-gray-200 bg-white p-0.5 text-sm">
          <button
            onClick={() => setActiveOnly(false)}
            className={`rounded-md px-3 py-1.5 font-medium ${!activeOnly ? 'bg-gray-100 text-gray-800' : 'text-gray-500'}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveOnly(true)}
            className={`rounded-md px-3 py-1.5 font-medium ${activeOnly ? 'bg-green-500 text-white' : 'text-gray-500'}`}
          >
            Active
          </button>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
          <Plus className="h-4 w-4" />
          Add Employee
        </button>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Employees</h2>
        <Badge tone="blue">{filtered.length}</Badge>
      </div>

      {/* Employee cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((e) => (
          <div key={e.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="bg-green-500 px-4 py-3 text-white">
              <div className="font-semibold leading-tight">{e.name}</div>
              <div className="text-xs text-green-50">{e.title}</div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${e.avatarColor}`}
              >
                {initials(e.name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm text-gray-700">{e.department}</div>
                <div className="mt-1 flex items-center gap-2">
                  <Badge tone="green">Active</Badge>
                  <span className="text-xs text-gray-400">{e.empId}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
