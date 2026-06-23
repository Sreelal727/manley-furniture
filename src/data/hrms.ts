// Mock HRMS data derived from the reference screenshots.

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
  { id: '1', empId: 'BM16001', name: 'MUHAMMAD RAFEEK KABEER', title: 'CEO', department: 'Management', active: true, avatarColor: 'bg-blue-500' },
  { id: '2', empId: 'BM16002', name: 'JASSAR MUHAMMAD', title: 'COO', department: 'Management', active: true, avatarColor: 'bg-indigo-500' },
  { id: '3', empId: 'BM23004', name: 'VARUN MATHEW', title: 'Logistics Co-ordinator', department: 'Logistics', active: true, avatarColor: 'bg-orange-500' },
  { id: '4', empId: 'BM24006', name: 'ABHISHEK A V', title: 'Technician', department: 'Technical Support', active: true, avatarColor: 'bg-teal-500' },
  { id: '5', empId: 'BM25016', name: 'MUHAMMAD ATIF', title: 'Application Engineer', department: 'Sales', active: true, avatarColor: 'bg-sky-500' },
  { id: '6', empId: 'BM25021', name: 'Mahalakshmi Jagadeep', title: 'Sales Executive', department: 'Sales', active: true, avatarColor: 'bg-pink-500' },
  { id: '7', empId: 'BM25023', name: 'JUHANA ZAMZAD', title: 'Sales Engineer', department: 'Sales', active: true, avatarColor: 'bg-rose-500' },
  { id: '8', empId: 'BM26029', name: 'AKSHAY', title: 'Technician', department: 'Technical Support', active: true, avatarColor: 'bg-cyan-500' },
  { id: '9', empId: 'BM26030', name: 'MUHAMMED MANSOOR', title: 'Delivery Person', department: 'Logistics', active: true, avatarColor: 'bg-teal-500' },
  { id: '10', empId: 'BM26032', name: 'Pramod Nair', title: 'Deputy General Manager', department: 'Management', active: true, avatarColor: 'bg-emerald-500' },
  { id: '11', empId: 'BM26034', name: 'Mohammed Muhasin', title: 'Technical Support Co-ordinator', department: 'Technical Support', active: true, avatarColor: 'bg-pink-500' },
  { id: '12', empId: 'BM26035', name: 'PONNU MARY JOSE', title: 'HR Executive', department: 'Human Resource', active: true, avatarColor: 'bg-fuchsia-500' },
  { id: '13', empId: 'BM26036', name: 'Shijumon Haneefa Rawther', title: 'Sr Sales Executive', department: 'Sales', active: true, avatarColor: 'bg-pink-600' },
  { id: '14', empId: 'BM26037', name: 'Keerthi K', title: 'Sales Executive', department: 'Sales', active: true, avatarColor: 'bg-green-500' },
  { id: '15', empId: 'BM66666', name: 'DGM Sample', title: 'Deputy GM', department: 'Management', active: true, avatarColor: 'bg-blue-600' },
  { id: '16', empId: 'BM99999', name: 'Super Admin', title: 'Super Admin', department: 'Management', active: true, avatarColor: 'bg-purple-600' },
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
  { empId: '10', name: 'Pramod Nair', avatarColor: 'bg-emerald-500', status: 'present', checkIn: '11:12 AM', checkOut: '—', hasLocation: true },
  { empId: '7', name: 'JUHANA ZAMZAD', avatarColor: 'bg-rose-500', status: 'present', checkIn: '10:49 AM', checkOut: '—' },
  { empId: '13', name: 'Shijumon Haneefa Rawther', avatarColor: 'bg-pink-600', status: 'present', checkIn: '10:44 AM', checkOut: '10:50 AM', hasLocation: true },
  { empId: '9', name: 'MUHAMMED MANSOOR', avatarColor: 'bg-teal-500', status: 'present', checkIn: '10:43 AM', checkOut: '—', breaks: '1 break · 0h 0m' },
  { empId: '11', name: 'Mohammed Muhasin', avatarColor: 'bg-pink-500', status: 'present', checkIn: '10:42 AM', checkOut: '—', breaks: '1 break · 0h 50m' },
  { empId: '5', name: 'MUHAMMAD ATIF', avatarColor: 'bg-sky-500', status: 'present', checkIn: '10:29 AM', checkOut: '—' },
  { empId: '14', name: 'Keerthi K', avatarColor: 'bg-green-500', status: 'present', checkIn: '10:26 AM', checkOut: '—', breaks: '1 break · 0h 51m', hasLocation: true },
  { empId: '4', name: 'ABHISHEK A V', avatarColor: 'bg-teal-500', status: 'present', checkIn: '10:16 AM', checkOut: '—', breaks: '1 break · 0h 49m', travel: '3 trips' },
  { empId: '3', name: 'VARUN MATHEW', avatarColor: 'bg-orange-500', status: 'present', checkIn: '10:11 AM', checkOut: '—', breaks: '1 break · 0h 32m', hasLocation: true },
  { empId: '12', name: 'PONNU MARY JOSE', avatarColor: 'bg-fuchsia-500', status: 'present', checkIn: '09:48 AM', checkOut: '—', breaks: '1 break · 0h 39m' },
  { empId: '8', name: 'AKSHAY', avatarColor: 'bg-cyan-500', status: 'present', checkIn: '09:23 AM', checkOut: '—', breaks: '1 break · 0h 22m', travel: '3 trips' },
  { empId: '6', name: 'Mahalakshmi Jagadeep', avatarColor: 'bg-pink-500', status: 'present', checkIn: '09:14 AM', checkOut: '—', breaks: '1 break · 0h 53m' },
  { empId: '16', name: 'Super Admin', avatarColor: 'bg-purple-600', status: 'present', checkIn: '06:08 AM', checkOut: '—', breaks: '1 break · 0h 0m' },
]

export const attendanceSummary = {
  activeStaff: 16,
  present: 13,
  late: 0,
  halfDay: 0,
  onLeave: 0,
  absent: 3,
}
