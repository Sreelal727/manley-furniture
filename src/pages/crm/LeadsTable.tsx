import { useMemo, useState } from 'react'
import { Search, Plus, Download, ChevronDown, Phone, Mail } from 'lucide-react'
import { leads as allLeads } from '@/data/crm'
import { pipelineStages, stageByKey, formatCurrency } from '@/lib/pipeline'

export default function LeadsTable() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allLeads
    // support a basic "status:qualified" filter like the source UI hints at
    const statusMatch = q.match(/status:(\w+)/)
    if (statusMatch) {
      return allLeads.filter((l) => l.stage.startsWith(statusMatch[1]))
    }
    return allLeads.filter(
      (l) =>
        l.company.toLowerCase().includes(q) ||
        l.contact.toLowerCase().includes(q) ||
        l.product.toLowerCase().includes(q) ||
        l.source.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="space-y-4">
      {/* Search + actions */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[260px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company, contact, email, phone… (or status:qualified)"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-400"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">
          <Plus className="h-4 w-4" />
          New Lead
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <span className="text-sm font-semibold text-gray-700">
            All Leads ({filtered.length})
          </span>
          <button className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-600">
            Latest to Oldest
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-4 py-2 font-medium">Company</th>
                <th className="px-4 py-2 font-medium">Contact</th>
                <th className="px-4 py-2 font-medium">Source</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 text-right font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => {
                const stage = stageByKey[lead.stage]
                return (
                  <tr
                    key={lead.id}
                    className="border-t border-gray-100"
                    style={{ backgroundColor: stage.bg + '12' }}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{lead.company}</div>
                      <div className="mt-0.5 text-xs text-gray-400">{lead.product}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div>{lead.contact}</div>
                      <div className="mt-0.5 flex gap-2 text-gray-400">
                        <Phone className="h-3.5 w-3.5" />
                        <Mail className="h-3.5 w-3.5" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{lead.source}</td>
                    <td className="px-4 py-3">
                      <StatusSelect value={lead.stage} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-semibold text-gray-800">
                        {formatCurrency(lead.value)}
                      </div>
                      <div className="text-xs text-gray-400">{lead.probability}% probability</div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatusSelect({ value }: { value: string }) {
  const [stageKey, setStageKey] = useState(value)
  const stage = stageByKey[stageKey]
  return (
    <select
      value={stageKey}
      onChange={(e) => setStageKey(e.target.value)}
      className="cursor-pointer rounded-md border-0 px-2 py-1 text-xs font-semibold text-white outline-none"
      style={{ backgroundColor: stage.bg }}
    >
      {pipelineStages.map((s) => (
        <option key={s.key} value={s.key} className="bg-white text-gray-800">
          {s.label}
        </option>
      ))}
    </select>
  )
}
