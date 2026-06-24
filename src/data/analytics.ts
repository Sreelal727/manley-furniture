// Aggregated business data for the CEO Dashboard. Furniture business themed,
// amounts in Indian rupees. Static sample figures.

import { employees } from './hrms'

export const CHART_COLORS = [
  '#12b76a', // brand green
  '#7c3aed', // violet
  '#f97316', // orange
  '#0891b2', // cyan
  '#ec4899', // pink
  '#eab308', // yellow
  '#3b82f6', // blue
  '#ef4444', // red
  '#14b8a6', // teal
  '#a855f7', // purple
]

export interface MonthPoint {
  month: string
  revenue: number
  orders: number
  target: number
}

export const monthlyRevenue: MonthPoint[] = [
  { month: 'Jan', revenue: 1820000, orders: 22, target: 2000000 },
  { month: 'Feb', revenue: 2150000, orders: 27, target: 2100000 },
  { month: 'Mar', revenue: 1980000, orders: 24, target: 2200000 },
  { month: 'Apr', revenue: 2640000, orders: 31, target: 2400000 },
  { month: 'May', revenue: 2980000, orders: 35, target: 2700000 },
  { month: 'Jun', revenue: 3420000, orders: 39, target: 3000000 },
]

export interface CategorySlice {
  name: string
  value: number
}

export const salesByCategory: CategorySlice[] = [
  { name: 'Sofa Set', value: 8200000 },
  { name: 'Bedroom Set', value: 6400000 },
  { name: 'Mattress', value: 1200000 },
  { name: 'Coffee Table', value: 900000 },
  { name: 'Arm Chair', value: 700000 },
]

export const leadsBySource: CategorySlice[] = [
  { name: 'Showroom', value: 38 },
  { name: 'Website', value: 27 },
  { name: 'Referral', value: 22 },
  { name: 'Exhibition', value: 13 },
]

export interface TopProduct {
  name: string
  revenue: number
}

export const topProducts: TopProduct[] = [
  { name: 'Hiyora Premium Bedroom Set', revenue: 1545000 },
  { name: 'Aero 2+1+1 Sofaset', revenue: 1430000 },
  { name: 'Royalist Sofa Set', revenue: 1078000 },
  { name: 'Livora 3+1+1 Sofaset', revenue: 899000 },
  { name: 'Liner King Bedroom Set', revenue: 749500 },
]

/** Headcount by department, derived from HRMS employees. */
export const departmentHeadcount: CategorySlice[] = Object.entries(
  employees.reduce<Record<string, number>>((acc, e) => {
    acc[e.department] = (acc[e.department] ?? 0) + 1
    return acc
  }, {}),
).map(([name, value]) => ({ name, value }))
