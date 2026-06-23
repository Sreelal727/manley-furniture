import { NavLink, Outlet } from 'react-router-dom'

const sections = [
  { path: '/hrms', label: 'Employees', end: true },
  { path: '/hrms/org-tree', label: 'Org Tree' },
  { path: '/hrms/journeys', label: 'Journeys' },
  { path: '/hrms/attendance', label: 'Attendance' },
  { path: '/hrms/leave-requests', label: 'Leave Requests' },
  { path: '/hrms/leave-approval', label: 'Leave Approval' },
  { path: '/hrms/leave-management', label: 'Leave Management' },
  { path: '/hrms/payroll', label: 'Payroll' },
  { path: '/hrms/off-days', label: 'Off Days' },
  { path: '/hrms/jd-library', label: 'JD Library' },
  { path: '/hrms/warnings-pip', label: 'Warnings/PIP' },
  { path: '/hrms/training', label: 'Training' },
  { path: '/hrms/recruitment', label: 'Recruitment' },
  { path: '/hrms/error-codes', label: 'Error Codes' },
]

export default function HrmsLayout() {
  return (
    <div className="flex min-h-full">
      {/* Secondary sidebar */}
      <aside className="w-52 shrink-0 bg-white p-4">
        <div className="mb-4 flex items-baseline gap-2 px-2">
          <h1 className="text-xl font-bold text-purple-600">HRMS</h1>
          <span className="text-xs text-gray-400">UAE</span>
        </div>
        <nav className="space-y-1">
          {sections.map((s) => (
            <NavLink
              key={s.path}
              to={s.path}
              end={s.end}
              className={({ isActive }) =>
                [
                  'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-gray-600 hover:bg-gray-100',
                ].join(' ')
              }
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 p-4 sm:p-6">
        <Outlet />
      </div>
    </div>
  )
}
