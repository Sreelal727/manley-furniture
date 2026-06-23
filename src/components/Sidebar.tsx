import { NavLink } from 'react-router-dom'
import { navItems } from '@/navigation'

export default function Sidebar() {
  return (
    <aside className="flex h-full w-60 flex-col bg-brand-800 text-brand-100">
      <div className="flex h-16 items-center gap-2 border-b border-brand-700 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-500 font-bold text-white">
          M
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">Manley Furniture</div>
          <div className="text-xs text-brand-300">ERP</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'text-brand-200 hover:bg-brand-700 hover:text-white',
                ].join(' ')
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-brand-700 px-5 py-3 text-xs text-brand-300">
        v0.1.0
      </div>
    </aside>
  )
}
