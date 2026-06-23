import { LayoutDashboard, type LucideIcon } from 'lucide-react'

export interface NavItem {
  /** Route path (relative to root) */
  path: string
  /** Label shown in the sidebar */
  label: string
  /** Icon component from lucide-react */
  icon: LucideIcon
}

/**
 * The ERP modules / tabs.
 *
 * NOTE: This is the single source of truth for the sidebar and the router.
 * Once the reference screenshots are available, add the remaining modules
 * (Inventory, Sales, Purchasing, Production, Reports, etc.) here and create a
 * matching page component under `src/pages/`.
 */
export const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
]
