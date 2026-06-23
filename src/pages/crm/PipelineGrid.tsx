import { pipelineSummary } from '@/data/crm'
import { stageByKey, formatCurrency } from '@/lib/pipeline'

export default function PipelineGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {pipelineSummary.map((s) => {
        const stage = stageByKey[s.key]
        return (
          <div
            key={s.key}
            className="rounded-xl p-4 text-white shadow-sm"
            style={{ backgroundColor: stage.bg }}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
                {stage.label}
              </span>
              <span className="text-2xl font-bold leading-none">{s.count}</span>
            </div>
            <div className="mt-3 text-sm font-medium opacity-95">
              {formatCurrency(s.value)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
