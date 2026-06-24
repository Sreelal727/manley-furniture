// Per-employee KPI / performance data for Manley Furniture. Combines task &
// ticket clearing, punctuality, and (for sales roles) revenue attainment into
// an efficiency score. Amounts in Indian rupees.

export interface KpiRecord {
  id: string
  name: string
  department: string
  role: string
  tasksDone: number
  tasksTotal: number
  ticketsDone: number
  ticketsTotal: number
  punctuality: number // 0–100 (on-time check-ins)
  revenue: number // generated this month
  revenueTarget: number // 0 = non-revenue role
}

export const kpiRecords: KpiRecord[] = [
  { id: '4', name: 'Arjun Pillai', department: 'Sales', role: 'Sales Executive', tasksDone: 18, tasksTotal: 20, ticketsDone: 12, ticketsTotal: 14, punctuality: 96, revenue: 1240000, revenueTarget: 1200000 },
  { id: '5', name: 'Reshma Nair', department: 'Sales', role: 'Sales Executive', tasksDone: 16, tasksTotal: 18, ticketsDone: 10, ticketsTotal: 11, punctuality: 98, revenue: 1080000, revenueTarget: 1100000 },
  { id: '16', name: 'Sneha Ramesh', department: 'Showroom', role: 'Showroom Sales Executive', tasksDone: 14, tasksTotal: 17, ticketsDone: 9, ticketsTotal: 10, punctuality: 92, revenue: 860000, revenueTarget: 900000 },
  { id: '3', name: 'Vinod Kumar', department: 'Showroom', role: 'Showroom Manager', tasksDone: 20, tasksTotal: 22, ticketsDone: 8, ticketsTotal: 9, punctuality: 90, revenue: 1520000, revenueTarget: 1500000 },
  { id: '9', name: 'Anjali Varma', department: 'Design', role: 'Interior Designer', tasksDone: 15, tasksTotal: 16, ticketsDone: 6, ticketsTotal: 8, punctuality: 94, revenue: 640000, revenueTarget: 700000 },
  { id: '6', name: 'Shaji Varghese', department: 'Production', role: 'Senior Carpenter', tasksDone: 24, tasksTotal: 26, ticketsDone: 11, ticketsTotal: 12, punctuality: 88, revenue: 0, revenueTarget: 0 },
  { id: '7', name: 'Pradeep Kurup', department: 'Production', role: 'Carpenter', tasksDone: 19, tasksTotal: 23, ticketsDone: 9, ticketsTotal: 11, punctuality: 84, revenue: 0, revenueTarget: 0 },
  { id: '8', name: 'Biju Thomas', department: 'Upholstery', role: 'Upholstery Specialist', tasksDone: 17, tasksTotal: 19, ticketsDone: 13, ticketsTotal: 14, punctuality: 91, revenue: 0, revenueTarget: 0 },
  { id: '11', name: 'Ratheesh Mohan', department: 'Logistics', role: 'Delivery Executive', tasksDone: 21, tasksTotal: 24, ticketsDone: 15, ticketsTotal: 16, punctuality: 86, revenue: 0, revenueTarget: 0 },
  { id: '15', name: 'Deepak Panicker', department: 'Service', role: 'Service Technician', tasksDone: 16, tasksTotal: 18, ticketsDone: 18, ticketsTotal: 20, punctuality: 89, revenue: 0, revenueTarget: 0 },
  { id: '12', name: 'Manoj Nambiar', department: 'Logistics', role: 'Logistics Co-ordinator', tasksDone: 14, tasksTotal: 16, ticketsDone: 7, ticketsTotal: 9, punctuality: 93, revenue: 0, revenueTarget: 0 },
  { id: '13', name: 'Lakshmi Menon', department: 'Finance', role: 'Accountant', tasksDone: 22, tasksTotal: 23, ticketsDone: 5, ticketsTotal: 5, punctuality: 99, revenue: 0, revenueTarget: 0 },
  { id: '10', name: 'Nikhil Das', department: 'Design', role: 'CAD Designer', tasksDone: 13, tasksTotal: 17, ticketsDone: 4, ticketsTotal: 6, punctuality: 82, revenue: 0, revenueTarget: 0 },
  { id: '14', name: 'Athira Suresh', department: 'Human Resource', role: 'HR Executive', tasksDone: 18, tasksTotal: 20, ticketsDone: 6, ticketsTotal: 7, punctuality: 95, revenue: 0, revenueTarget: 0 },
]

export interface KpiScore {
  taskRate: number // 0–100
  ticketRate: number // 0–100
  punctuality: number // 0–100
  revenueAttain: number | null // 0–100 or null for non-revenue roles
  efficiency: number // 0–100 composite
}

export function scoreFor(r: KpiRecord): KpiScore {
  const taskRate = r.tasksTotal ? (r.tasksDone / r.tasksTotal) * 100 : 0
  const ticketRate = r.ticketsTotal ? (r.ticketsDone / r.ticketsTotal) * 100 : 0
  const hasRevenue = r.revenueTarget > 0
  const revenueAttain = hasRevenue ? Math.min(100, (r.revenue / r.revenueTarget) * 100) : null

  const efficiency = hasRevenue
    ? taskRate * 0.25 + ticketRate * 0.25 + r.punctuality * 0.2 + (revenueAttain as number) * 0.3
    : taskRate * 0.35 + ticketRate * 0.35 + r.punctuality * 0.3

  return {
    taskRate: Math.round(taskRate),
    ticketRate: Math.round(ticketRate),
    punctuality: r.punctuality,
    revenueAttain: revenueAttain === null ? null : Math.round(revenueAttain),
    efficiency: Math.round(efficiency),
  }
}

export function scoreTone(score: number): { text: string; bar: string; label: string } {
  if (score >= 90) return { text: 'text-green-600', bar: '#16a34a', label: 'Excellent' }
  if (score >= 80) return { text: 'text-brand-600', bar: '#12b76a', label: 'Good' }
  if (score >= 70) return { text: 'text-amber-500', bar: '#f59e0b', label: 'Average' }
  return { text: 'text-red-500', bar: '#ef4444', label: 'Needs focus' }
}
