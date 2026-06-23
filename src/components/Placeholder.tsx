import { Construction } from 'lucide-react'

interface PlaceholderProps {
  title: string
  note?: string
}

/** Clean placeholder for modules/tabs that have navigation wired but no detailed screenshot yet. */
export default function Placeholder({ title, note }: PlaceholderProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500">
        <Construction className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-gray-500">
        {note ?? 'This screen is wired into navigation and ready to build out — share a reference and it gets fleshed in.'}
      </p>
    </div>
  )
}
