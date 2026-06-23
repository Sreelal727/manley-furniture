// Sample calendar data for Manley Furniture. Deliberately "normal": a handful
// of items per day, mostly open or done, with just one overdue — not the
// hundreds of overdue items in the source screenshots.

export type CalEventType =
  | 'task'
  | 'ticket'
  | 'svc_task'
  | 'svc_ticket'
  | 'todo'
  | 'call'
  | 'visit'
  | 'activity'

export type CalStatus = 'done' | 'open' | 'pending' | 'overdue'

export interface CalEvent {
  id: string
  title: string
  type: CalEventType
  status: CalStatus
  date: string // YYYY-MM-DD
  time?: string
  assignee?: string
}

export interface TypeMeta {
  label: string
  color: string
}

export const typeMeta: Record<CalEventType, TypeMeta> = {
  task: { label: 'Task', color: '#7c3aed' },
  ticket: { label: 'Ticket', color: '#ec4899' },
  svc_task: { label: 'Svc Task', color: '#16a34a' },
  svc_ticket: { label: 'Svc Ticket', color: '#0891b2' },
  todo: { label: 'To-Do', color: '#475569' },
  call: { label: 'Call', color: '#f97316' },
  visit: { label: 'Visit', color: '#e11d48' },
  activity: { label: 'Activity', color: '#0d9488' },
}

export const typeOrder: CalEventType[] = [
  'task',
  'ticket',
  'svc_task',
  'svc_ticket',
  'todo',
  'call',
  'visit',
  'activity',
]

export const statusLabel: Record<CalStatus, string> = {
  done: 'Done',
  open: 'Open',
  pending: 'Pending',
  overdue: 'Overdue',
}

export const events: CalEvent[] = [
  // Early June
  { id: 'e01', title: 'Showroom display refresh', type: 'svc_task', status: 'done', date: '2026-06-01', assignee: 'Vinod Kumar' },
  { id: 'e02', title: 'Supplier call — teak wood stock', type: 'call', status: 'done', date: '2026-06-02', assignee: 'Suresh Nair' },
  { id: 'e03', title: 'Client visit — Taj Malabar', type: 'visit', status: 'done', date: '2026-06-03', assignee: 'Arjun Pillai' },
  { id: 'e04', title: 'Monthly stock audit', type: 'task', status: 'done', date: '2026-06-04', assignee: 'Lakshmi Menon' },
  { id: 'e05', title: 'Upholstery repair — Marriott', type: 'svc_ticket', status: 'done', date: '2026-06-05', assignee: 'Biju Thomas' },

  // Second week
  { id: 'e06', title: 'Production review — mahogany batch', type: 'task', status: 'done', date: '2026-06-09', assignee: 'Shaji Varghese' },
  { id: 'e07', title: 'Follow up — Sobha Developers', type: 'call', status: 'done', date: '2026-06-10', assignee: 'Reshma Nair' },
  { id: 'e08', title: 'Site measurement — Aster Medcity', type: 'visit', status: 'done', date: '2026-06-11', assignee: 'Anjali Varma' },
  { id: 'e09', title: 'Polish touch-up — Casino Hotel', type: 'svc_ticket', status: 'done', date: '2026-06-12', assignee: 'Pradeep Kurup' },

  // Third week
  { id: 'e10', title: 'Sofa cushion refilling', type: 'svc_task', status: 'open', date: '2026-06-16', assignee: 'Biju Thomas' },
  { id: 'e11', title: 'Replace cane panel — Canelian', type: 'ticket', status: 'open', date: '2026-06-17', assignee: 'Shaji Varghese' },
  { id: 'e12', title: 'Quotation call — Brigade Group', type: 'call', status: 'open', date: '2026-06-18', assignee: 'Arjun Pillai' },
  { id: 'e13', title: 'Showroom appointment — walk-in', type: 'visit', status: 'done', date: '2026-06-19', assignee: 'Sneha Ramesh' },

  // The single overdue item (was due before today)
  { id: 'e14', title: 'Deliver Vivo Coffee Table — pending dispatch', type: 'ticket', status: 'overdue', date: '2026-06-20', assignee: 'Ratheesh Mohan' },

  // Current week (around today = Jun 23)
  { id: 'e15', title: 'Deliver Aero Sofaset — Le Meridien', type: 'svc_task', status: 'open', date: '2026-06-22', time: '10:00 AM', assignee: 'Ratheesh Mohan' },
  { id: 'e16', title: 'QC — Royalist sofa frames', type: 'task', status: 'done', date: '2026-06-22', assignee: 'Shaji Varghese' },
  { id: 'e17', title: 'Prepare delivery schedule', type: 'todo', status: 'pending', date: '2026-06-22', assignee: 'Manoj Nambiar' },

  { id: 'e18', title: 'Confirm dispatch — Grand Hyatt', type: 'call', status: 'open', date: '2026-06-23', time: '09:30 AM', assignee: 'Reshma Nair' },
  { id: 'e19', title: 'Install wardrobe — Asset Homes', type: 'svc_ticket', status: 'open', date: '2026-06-23', time: '11:00 AM', assignee: 'Deepak Panicker' },
  { id: 'e20', title: 'Client visit — Dezignmania Interiors', type: 'visit', status: 'pending', date: '2026-06-23', time: '02:00 PM', assignee: 'Anjali Varma' },
  { id: 'e21', title: 'Approve June payroll', type: 'task', status: 'open', date: '2026-06-23', assignee: 'Lakshmi Menon' },

  { id: 'e22', title: 'Assemble dining set — Saj Earth Resort', type: 'svc_task', status: 'open', date: '2026-06-24', time: '10:30 AM', assignee: 'Deepak Panicker' },
  { id: 'e23', title: 'Fix recliner mechanism — Berlin', type: 'svc_ticket', status: 'open', date: '2026-06-24', assignee: 'Pradeep Kurup' },

  { id: 'e24', title: 'Vendor call — fabric supplier', type: 'call', status: 'pending', date: '2026-06-25', time: '03:30 PM', assignee: 'Suresh Nair' },
  { id: 'e25', title: 'Deliver mattress — Rajagiri Hospital', type: 'svc_ticket', status: 'open', date: '2026-06-25', assignee: 'Ratheesh Mohan' },

  { id: 'e26', title: 'Service visit — clear open tickets', type: 'svc_task', status: 'open', date: '2026-06-26', assignee: 'Biju Thomas' },
  { id: 'e27', title: 'Showroom restock', type: 'task', status: 'open', date: '2026-06-26', assignee: 'Vinod Kumar' },

  { id: 'e28', title: 'New enquiry — corner sofa', type: 'ticket', status: 'open', date: '2026-06-27', assignee: 'Sneha Ramesh' },
  { id: 'e29', title: 'Driving licence renewal — delivery van', type: 'svc_ticket', status: 'open', date: '2026-06-27', assignee: 'Manoj Nambiar' },

  // End of month
  { id: 'e30', title: 'PPM — workshop machine maintenance', type: 'svc_task', status: 'done', date: '2026-06-29', assignee: 'Shaji Varghese' },
  { id: 'e31', title: 'Month-end sales report', type: 'activity', status: 'pending', date: '2026-06-30', assignee: 'Reshma Nair' },
  { id: 'e32', title: 'Plan July production targets', type: 'todo', status: 'pending', date: '2026-06-30', assignee: 'Suresh Nair' },
]

export interface WorkloadPerson {
  name: string
  done: number
  total: number
}

export interface WorkloadSection {
  label: string
  people: WorkloadPerson[]
}

export const teamWorkload: WorkloadSection[] = [
  {
    label: 'Service Tasks',
    people: [
      { name: 'Biju Thomas', done: 4, total: 5 },
      { name: 'Ratheesh Mohan', done: 6, total: 7 },
      { name: 'Deepak Panicker', done: 3, total: 4 },
    ],
  },
  {
    label: 'Service Tickets',
    people: [
      { name: 'Pradeep Kurup', done: 5, total: 5 },
      { name: 'Mohammed Muhasin', done: 4, total: 4 },
      { name: 'Akshay', done: 7, total: 8 },
    ],
  },
  {
    label: 'Calls & Visits',
    people: [
      { name: 'Reshma Nair', done: 9, total: 10 },
      { name: 'Arjun Pillai', done: 6, total: 6 },
      { name: 'Anjali Varma', done: 3, total: 4 },
    ],
  },
]
