import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, LogOut, Search } from 'lucide-react'

export default function TopHeader() {
  const navigate = useNavigate()
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 bg-brand-500 px-3 text-white sm:gap-4 sm:px-4">
      {/* Search */}
      <div className="relative min-w-0 max-w-sm flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search…"
          className="w-full rounded-lg border border-white/20 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Country selector */}
        <button className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-2.5 py-1.5 text-sm font-medium hover:bg-brand-700 sm:px-3">
          <span aria-hidden>🇮🇳</span>
          <span className="hidden sm:inline">IND</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 hover:bg-brand-600" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold">
            28
          </span>
        </button>

        {/* Sign out */}
        <button
          onClick={() => navigate('/login')}
          className="flex flex-col items-center text-[11px] leading-none hover:opacity-90"
        >
          <LogOut className="h-5 w-5" />
          <span className="mt-0.5 hidden sm:block">Sign Out</span>
        </button>
      </div>
    </header>
  )
}
