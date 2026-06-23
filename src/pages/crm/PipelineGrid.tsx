import { pipelineSummary } from '@/data/crm'
import { stageByKey, formatCurrency } from '@/lib/pipeline'

interface PipelineGridProps {
  selected: string | null
  onSelect: (key: string) => void
}

export default function PipelineGrid({ selected, onSelect }: PipelineGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {pipelineSummary.map((s) => {
        const stage = stageByKey[s.key]
        const isSelected = selected === s.key
        const dimmed = selected !== null && !isSelected
        return (
          <button
            key={s.key}
            type="button"
            onClick={() => onSelect(s.key)}
            aria-pressed={isSelected}
            className={[
              'rounded-xl p-4 text-left text-white shadow-sm transition-all',
              'hover:-translate-y-0.5 hover:shadow-md',
              isSelected ? 'ring-2 ring-gray-900 ring-offset-2' : '',
              dimmed ? 'opacity-50' : 'opacity-100',
            ].join(' ')}
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
          </button>
        )
      })}
    </div>
  )
}
