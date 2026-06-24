import {
  LayoutDashboard,
  Users,
  UserCog,
  Boxes,
  Receipt,
  Wrench,
  CheckSquare,
  CalendarDays,
  BarChart3,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export interface ModuleNavItem {
  /** Top-level route (icon rail) */
  path: string
  label: string
  icon: LucideIcon
}

/** Top-level modules shown in the thin left icon rail. */
export const modules: ModuleNavItem[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/crm', label: 'CRM', icon: Users },
  { path: '/hrms', label: 'HRMS', icon: UserCog },
  { path: '/inventory', label: 'Inventory', icon: Boxes },
  { path: '/billing', label: 'Billing', icon: Receipt },
  { path: '/installation', label: 'Installation', icon: Wrench },
  { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/calendar', label: 'Calendar', icon: CalendarDays },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
]
