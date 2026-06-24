import { createContext, useContext, useState, type ReactNode } from 'react'

// Shared store connecting Billing → Installation. Creating a bill on inventory
// items also creates a site-installation job that the Installation module picks
// up and assigns to a service employee. UI-only (in-memory, resets on reload).

export interface BillLine {
  productId: string
  sku: string
  name: string
  qty: number
  unitPrice: number
}

export interface Bill {
  id: string
  invoiceNo: string
  customer: string
  phone?: string
  address?: string
  date: string
  lines: BillLine[]
  subtotal: number
  tax: number
  total: number
  paid: boolean
}

export type InstallStatus = 'pending' | 'assigned' | 'in_progress' | 'completed'

export interface Installation {
  id: string
  invoiceNo: string
  customer: string
  address?: string
  items: { name: string; qty: number }[]
  assignedTo: string | null
  status: InstallStatus
  scheduledDate?: string
}

export const GST_RATE = 0.18

export interface NewBillInput {
  customer: string
  phone?: string
  address?: string
  scheduledDate?: string
  lines: BillLine[]
}

interface BillingContextValue {
  bills: Bill[]
  installations: Installation[]
  createBill: (input: NewBillInput) => void
  togglePaid: (billId: string) => void
  assignInstallation: (id: string, employee: string) => void
  advanceStatus: (id: string) => void
}

const BillingContext = createContext<BillingContextValue | null>(null)

function round(n: number) {
  return Math.round(n * 100) / 100
}

function totals(lines: BillLine[]) {
  const subtotal = round(lines.reduce((s, l) => s + l.qty * l.unitPrice, 0))
  const tax = round(subtotal * GST_RATE)
  return { subtotal, tax, total: round(subtotal + tax) }
}

// ---- Seed data so both tabs show something on first load ----

const seedBills: Bill[] = [
  {
    id: 'b1',
    invoiceNo: 'INV-2026-001',
    customer: 'Taj Malabar Resort, Cochin',
    phone: '+91 98470 11223',
    address: 'Willingdon Island, Kochi',
    date: '2026-06-18',
    lines: [
      { productId: 'p02', sku: 'MF-SOF-002', name: 'Aero 2+1+1 Sofaset', qty: 2, unitPrice: 71500 },
      { productId: 'p19', sku: 'MF-COF-001', name: 'Vivo Coffee Table', qty: 1, unitPrice: 14500 },
    ],
    ...totals([
      { productId: 'p02', sku: 'MF-SOF-002', name: 'Aero 2+1+1 Sofaset', qty: 2, unitPrice: 71500 },
      { productId: 'p19', sku: 'MF-COF-001', name: 'Vivo Coffee Table', qty: 1, unitPrice: 14500 },
    ]),
    paid: true,
  },
  {
    id: 'b2',
    invoiceNo: 'INV-2026-002',
    customer: 'Asset Homes',
    phone: '+91 99610 44556',
    address: 'Marine Drive, Kochi',
    date: '2026-06-21',
    lines: [
      { productId: 'p09', sku: 'MF-BED-001', name: 'Jesse 3-Door Queen Bedroom Set', qty: 3, unitPrice: 45000 },
    ],
    ...totals([
      { productId: 'p09', sku: 'MF-BED-001', name: 'Jesse 3-Door Queen Bedroom Set', qty: 3, unitPrice: 45000 },
    ]),
    paid: false,
  },
  {
    id: 'b3',
    invoiceNo: 'INV-2026-003',
    customer: 'Marriott Kochi',
    phone: '+91 98950 77889',
    address: 'Lulu International, Edappally',
    date: '2026-06-23',
    lines: [
      { productId: 'p07', sku: 'MF-SOF-007', name: 'Royalist 3+1+1 Sofa Set', qty: 1, unitPrice: 89900 },
    ],
    ...totals([
      { productId: 'p07', sku: 'MF-SOF-007', name: 'Royalist 3+1+1 Sofa Set', qty: 1, unitPrice: 89900 },
    ]),
    paid: true,
  },
]

const seedInstallations: Installation[] = [
  {
    id: 'i1',
    invoiceNo: 'INV-2026-001',
    customer: 'Taj Malabar Resort, Cochin',
    address: 'Willingdon Island, Kochi',
    items: [
      { name: 'Aero 2+1+1 Sofaset', qty: 2 },
      { name: 'Vivo Coffee Table', qty: 1 },
    ],
    assignedTo: 'Deepak Panicker',
    status: 'completed',
    scheduledDate: '2026-06-20',
  },
  {
    id: 'i2',
    invoiceNo: 'INV-2026-002',
    customer: 'Asset Homes',
    address: 'Marine Drive, Kochi',
    items: [{ name: 'Jesse 3-Door Queen Bedroom Set', qty: 3 }],
    assignedTo: 'Ratheesh Mohan',
    status: 'in_progress',
    scheduledDate: '2026-06-24',
  },
  {
    id: 'i3',
    invoiceNo: 'INV-2026-003',
    customer: 'Marriott Kochi',
    address: 'Lulu International, Edappally',
    items: [{ name: 'Royalist 3+1+1 Sofa Set', qty: 1 }],
    assignedTo: null,
    status: 'pending',
  },
]

export function BillingProvider({ children }: { children: ReactNode }) {
  const [bills, setBills] = useState<Bill[]>(seedBills)
  const [installations, setInstallations] = useState<Installation[]>(seedInstallations)

  function createBill(input: NewBillInput) {
    const n = bills.length + 1
    const invoiceNo = `INV-2026-${String(n).padStart(3, '0')}`
    const t = totals(input.lines)
    const bill: Bill = {
      id: `b${Date.now()}`,
      invoiceNo,
      customer: input.customer,
      phone: input.phone,
      address: input.address,
      date: '2026-06-24',
      lines: input.lines,
      ...t,
      paid: false,
    }
    const install: Installation = {
      id: `i${Date.now()}`,
      invoiceNo,
      customer: input.customer,
      address: input.address,
      items: input.lines.map((l) => ({ name: l.name, qty: l.qty })),
      assignedTo: null,
      status: 'pending',
      scheduledDate: input.scheduledDate,
    }
    setBills((prev) => [bill, ...prev])
    setInstallations((prev) => [install, ...prev])
  }

  function togglePaid(billId: string) {
    setBills((prev) => prev.map((b) => (b.id === billId ? { ...b, paid: !b.paid } : b)))
  }

  function assignInstallation(id: string, employee: string) {
    setInstallations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, assignedTo: employee, status: i.status === 'pending' ? 'assigned' : i.status }
          : i,
      ),
    )
  }

  function advanceStatus(id: string) {
    const next: Record<InstallStatus, InstallStatus> = {
      pending: 'assigned',
      assigned: 'in_progress',
      in_progress: 'completed',
      completed: 'completed',
    }
    setInstallations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: next[i.status] } : i)),
    )
  }

  return (
    <BillingContext.Provider
      value={{ bills, installations, createBill, togglePaid, assignInstallation, advanceStatus }}
    >
      {children}
    </BillingContext.Provider>
  )
}

export function useBilling() {
  const ctx = useContext(BillingContext)
  if (!ctx) throw new Error('useBilling must be used within BillingProvider')
  return ctx
}

/** Service / installation staff eligible for assignment (from HRMS). */
export const serviceDepartments = ['Service', 'Logistics', 'Production']
