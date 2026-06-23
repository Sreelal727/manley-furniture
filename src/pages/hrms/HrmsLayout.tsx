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

const linkClasses = (isActive: boolean, horizontal: boolean) =>
  [
    horizontal
      ? 'whitespace-nowrap rounded-full px-3 py-1.5'
      : 'block rounded-lg px-3 py-2',
    'text-sm font-medium transition-colors',
    isActive ? 'bg-accent text-white' : 'text-gray-600 hover:bg-gray-100',
  ].join(' ')

export default function HrmsLayout() {
  return (
    <div className="flex min-h-full flex-col lg:flex-row">
      {/* Mobile / tablet: title + horizontal scrolling nav */}
      <div className="bg-white px-4 pt-4 lg:hidden">
        <div className="mb-3 flex items-baseline gap-2">
          <h1 className="text-xl font-bold text-purple-600">HRMS</h1>
          <span className="text-xs text-gray-400">Kerala</span>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-3">
          {sections.map((s) => (
            <NavLink
              key={s.path}
              to={s.path}
              end={s.end}
              className={({ isActive }) => linkClasses(isActive, true)}
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Desktop: vertical sidebar */}
      <aside className="hidden w-52 shrink-0 bg-white p-4 lg:block">
        <div className="mb-4 flex items-baseline gap-2 px-2">
          <h1 className="text-xl font-bold text-purple-600">HRMS</h1>
          <span className="text-xs text-gray-400">Kerala</span>
        </div>
        <nav className="space-y-1">
          {sections.map((s) => (
            <NavLink
              key={s.path}
              to={s.path}
              end={s.end}
              className={({ isActive }) => linkClasses(isActive, false)}
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 p-4 sm:p-6">
        <Outlet />
      </div>
    </div>
  )
}
