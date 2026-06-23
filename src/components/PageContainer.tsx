import type { ReactNode } from 'react'

interface PageContainerProps {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

/** Standard page wrapper: title row + content area. Reused by every module page. */
export default function PageContainer({
  title,
  description,
  actions,
  children,
}: PageContainerProps) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}
