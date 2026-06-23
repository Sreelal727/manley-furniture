import { NavLink } from 'react-router-dom'
import { modules } from '@/navigation'

export default function IconRail() {
  return (
    // Spacer keeps the 64px gutter in flow; the real rail is absolutely
    // positioned so expanding on hover overlays the content instead of
    // pushing it.
    <div className="relative w-16 shrink-0">
      <aside className="group absolute inset-y-0 left-0 z-30 flex w-16 flex-col overflow-hidden bg-brand-600 px-2.5 py-3 transition-[width] duration-200 ease-in-out hover:w-56 hover:shadow-2xl">
        {/* Logo */}
        <div className="flex h-10 items-center">
          <div className="flex h-10 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-base font-extrabold text-brand-600">
            M
          </div>
          <span className="ml-3 whitespace-nowrap font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Manley Furniture
          </span>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto">
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
                    'flex h-11 items-center rounded-xl transition-colors',
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-brand-100 hover:bg-brand-500 hover:text-white',
                  ].join(' ')
                }
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {m.label}
                </span>
              </NavLink>
            )
          })}
        </nav>

        {/* User */}
        <div className="mt-3 flex h-10 items-center">
          <div className="flex h-10 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-white">
            SA
          </div>
          <div className="ml-3 overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="whitespace-nowrap text-sm font-medium text-white">Super Admin</div>
            <div className="whitespace-nowrap text-xs text-brand-200">Administrator</div>
          </div>
        </div>
      </aside>
    </div>
  )
}
