// Mock HRMS data for Manley Furniture (Kerala). Kerala employee names with
// furniture-trade designations: showroom sales, carpentry, upholstery, design,
// logistics, finance, etc.

export interface Employee {
  id: string
  empId: string
  name: string
  title: string
  department: string
  active: boolean
  /** Tailwind bg class for the avatar fallback */
  avatarColor: string
}

export const employees: Employee[] = [
  { id: '1', empId: 'MF1001', name: 'Rajeev Menon', title: 'Managing Director', department: 'Management', active: true, avatarColor: 'bg-blue-500' },
  { id: '2', empId: 'MF1002', name: 'Suresh Nair', title: 'General Manager', department: 'Management', active: true, avatarColor: 'bg-indigo-500' },
  { id: '3', empId: 'MF1003', name: 'Vinod Kumar', title: 'Showroom Manager', department: 'Showroom', active: true, avatarColor: 'bg-orange-500' },
  { id: '4', empId: 'MF1004', name: 'Arjun Pillai', title: 'Sales Executive', department: 'Sales', active: true, avatarColor: 'bg-sky-500' },
  { id: '5', empId: 'MF1005', name: 'Reshma Nair', title: 'Sales Executive', department: 'Sales', active: true, avatarColor: 'bg-pink-500' },
  { id: '6', empId: 'MF1006', name: 'Shaji Varghese', title: 'Senior Carpenter', department: 'Production', active: true, avatarColor: 'bg-amber-600' },
  { id: '7', empId: 'MF1007', name: 'Pradeep Kurup', title: 'Carpenter', department: 'Production', active: true, avatarColor: 'bg-teal-500' },
  { id: '8', empId: 'MF1008', name: 'Biju Thomas', title: 'Upholstery Specialist', department: 'Upholstery', active: true, avatarColor: 'bg-rose-500' },
  { id: '9', empId: 'MF1009', name: 'Anjali Varma', title: 'Interior Designer', department: 'Design', active: true, avatarColor: 'bg-fuchsia-500' },
  { id: '10', empId: 'MF1010', name: 'Nikhil Das', title: 'CAD Designer', department: 'Design', active: true, avatarColor: 'bg-cyan-500' },
  { id: '11', empId: 'MF1011', name: 'Ratheesh Mohan', title: 'Delivery Executive', department: 'Logistics', active: true, avatarColor: 'bg-emerald-500' },
  { id: '12', empId: 'MF1012', name: 'Manoj Nambiar', title: 'Logistics Co-ordinator', department: 'Logistics', active: true, avatarColor: 'bg-teal-600' },
  { id: '13', empId: 'MF1013', name: 'Lakshmi Menon', title: 'Accountant', department: 'Finance', active: true, avatarColor: 'bg-green-500' },
  { id: '14', empId: 'MF1014', name: 'Athira Suresh', title: 'HR Executive', department: 'Human Resource', active: true, avatarColor: 'bg-purple-500' },
  { id: '15', empId: 'MF1015', name: 'Deepak Panicker', title: 'Service Technician', department: 'Service', active: true, avatarColor: 'bg-blue-600' },
  { id: '16', empId: 'MF1016', name: 'Sneha Ramesh', title: 'Showroom Sales Executive', department: 'Showroom', active: true, avatarColor: 'bg-pink-600' },
]

export type AttendanceStatus = 'present' | 'late' | 'half_day' | 'on_leave' | 'absent'

export interface AttendanceRow {
  empId: string
  name: string
  avatarColor: string
  status: AttendanceStatus
  checkIn: string
  checkOut: string
  breaks?: string
  travel?: string
  hasLocation?: boolean
}

export const attendance: AttendanceRow[] = [
  { empId: '1', name: 'Rajeev Menon', avatarColor: 'bg-blue-500', status: 'present', checkIn: '09:02 AM', checkOut: '—', hasLocation: true },
  { empId: '2', name: 'Suresh Nair', avatarColor: 'bg-indigo-500', status: 'present', checkIn: '09:08 AM', checkOut: '—' },
  { empId: '3', name: 'Vinod Kumar', avatarColor: 'bg-orange-500', status: 'present', checkIn: '09:15 AM', checkOut: '—', breaks: '1 break · 0h 20m', hasLocation: true },
  { empId: '6', name: 'Shaji Varghese', avatarColor: 'bg-amber-600', status: 'present', checkIn: '08:45 AM', checkOut: '—', breaks: '1 break · 0h 30m' },
  { empId: '7', name: 'Pradeep Kurup', avatarColor: 'bg-teal-500', status: 'present', checkIn: '08:48 AM', checkOut: '—' },
  { empId: '8', name: 'Biju Thomas', avatarColor: 'bg-rose-500', status: 'present', checkIn: '08:52 AM', checkOut: '—', breaks: '1 break · 0h 45m' },
  { empId: '4', name: 'Arjun Pillai', avatarColor: 'bg-sky-500', status: 'present', checkIn: '09:22 AM', checkOut: '—', breaks: '1 break · 0h 18m', travel: '2 trips' },
  { empId: '5', name: 'Reshma Nair', avatarColor: 'bg-pink-500', status: 'present', checkIn: '09:18 AM', checkOut: '—', hasLocation: true },
  { empId: '11', name: 'Ratheesh Mohan', avatarColor: 'bg-emerald-500', status: 'present', checkIn: '08:30 AM', checkOut: '—', breaks: '1 break · 0h 25m', travel: '4 trips' },
  { empId: '12', name: 'Manoj Nambiar', avatarColor: 'bg-teal-600', status: 'present', checkIn: '08:35 AM', checkOut: '—', travel: '3 trips' },
  { empId: '13', name: 'Lakshmi Menon', avatarColor: 'bg-green-500', status: 'present', checkIn: '09:05 AM', checkOut: '—', breaks: '1 break · 0h 40m' },
  { empId: '9', name: 'Anjali Varma', avatarColor: 'bg-fuchsia-500', status: 'present', checkIn: '09:35 AM', checkOut: '—', breaks: '1 break · 0h 22m' },
  { empId: '16', name: 'Sneha Ramesh', avatarColor: 'bg-pink-600', status: 'present', checkIn: '09:12 AM', checkOut: '—', breaks: '1 break · 0h 15m' },
]

export const attendanceSummary = {
  activeStaff: 16,
  present: 13,
  late: 0,
  halfDay: 0,
  onLeave: 0,
  absent: 3,
}
