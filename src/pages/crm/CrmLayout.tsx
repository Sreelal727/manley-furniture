import { NavLink, Outlet } from 'react-router-dom'

const tabs = [
  { path: '/crm', label: 'Leads', end: true },
  { path: '/crm/customers', label: 'Customers', count: '3,098' },
  { path: '/crm/suppliers', label: 'Suppliers', count: '88' },
  { path: '/crm/activities', label: 'Activities' },
  { path: '/crm/other-clients', label: 'Other Clients', count: '1,374' },
  { path: '/crm/closed', label: 'Closed' },
  { path: '/crm/transfer-leads', label: 'Transfer Leads' },
]

export default function CrmLayout() {
  return (
    <div>
      <div className="bg-white px-4 pt-5 sm:px-6">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold text-brand-600">CRM</h1>
          <span className="text-sm text-gray-400">Kerala</span>
        </div>

        <nav className="mt-3 flex gap-6 overflow-x-auto border-b border-gray-200">
          {tabs.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              end={t.end}
              className={({ isActive }) =>
                [
                  '-mb-px flex items-center gap-1.5 whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-500 hover:text-gray-800',
                ].join(' ')
              }
            >
              {t.label}
              {t.count && (
                <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
                  {t.count}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 sm:p-6">
        <Outlet />
      </div>
    </div>
  )
}
