import { Users, ChevronDown } from 'lucide-react'
import DailyInsights from './DailyInsights'
import PipelineGrid from './PipelineGrid'
import LeadsTable from './LeadsTable'

export default function Leads() {
  return (
    <div className="space-y-6">
      <DailyInsights />

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-brand-600">Sales Pipeline</h2>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-gray-400" />
            All Employees
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        <PipelineGrid />
      </section>

      <LeadsTable />
    </div>
  )
}
