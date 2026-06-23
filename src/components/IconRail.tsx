import { NavLink } from 'react-router-dom'
import { modules } from '@/navigation'

export default function IconRail() {
  return (
    <aside className="flex h-full w-16 flex-col items-center bg-brand-600 py-3">
      {/* Logo */}
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-base font-extrabold text-brand-600">
        M
      </div>

      <nav className="flex flex-1 flex-col items-center gap-1">
        {modules.map((m) => {
          const Icon = m.icon
          return (
            <NavLink
              key={m.path}
              to={m.path}
              end={m.path === '/'}
              title={m.label}
              className={({ isActive }) =>
                [
                  'flex h-11 w-11 items-center justify-center rounded-xl transition-colors',
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-brand-100 hover:bg-brand-500 hover:text-white',
                ].join(' ')
              }
            >
              <Icon className="h-5 w-5" />
            </NavLink>
          )
        })}
      </nav>

      {/* User avatar */}
      <div className="mt-3 h-10 w-10 overflow-hidden rounded-xl bg-white ring-2 ring-white/40">
        <div className="flex h-full w-full items-center justify-center bg-accent text-sm font-semibold text-white">
          SA
        </div>
      </div>
    </aside>
  )
}
