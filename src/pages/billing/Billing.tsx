import { useMemo, useState, type ReactNode } from 'react'
import { Plus, Trash2, Receipt, ArrowRight, X } from 'lucide-react'
import { products } from '@/data/inventory'
import { formatCurrency } from '@/lib/pipeline'
import { useBilling, GST_RATE, type BillLine } from '@/store/billing'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'

export default function Billing() {
  const { bills, createBill, togglePaid } = useBilling()
  const [showForm, setShowForm] = useState(false)

  const stats = useMemo(() => {
    const revenue = bills.reduce((s, b) => s + b.total, 0)
    const paid = bills.filter((b) => b.paid).length
    return { count: bills.length, revenue, paid, unpaid: bills.length - paid }
  }, [bills])

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold text-brand-600">Billing</h1>
          <span className="text-sm text-gray-400">Invoices &amp; inventory billing</span>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Close' : 'New Bill'}
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        <StatCard value={stats.count} label="Bills" active />
        <StatCard value={formatCurrency(stats.revenue)} label="Revenue" valueColor="text-green-600" />
        <StatCard value={stats.paid} label="Paid" valueColor="text-brand-600" />
        <StatCard value={stats.unpaid} label="Unpaid" valueColor="text-amber-500" />
      </div>

      {showForm && (
        <NewBillForm
          onSubmit={(input) => {
            createBill(input)
            setShowForm(false)
          }}
        />
      )}

      {/* Bills list */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
          All Bills ({bills.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-4 py-2 font-medium">Invoice</th>
                <th className="px-4 py-2 font-medium">Customer</th>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Items</th>
                <th className="px-4 py-2 text-right font-medium">Total</th>
                <th className="px-4 py-2 font-medium">Payment</th>
                <th className="px-4 py-2 font-medium">Installation</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b) => (
                <tr key={b.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">{b.invoiceNo}</td>
                  <td className="px-4 py-3 text-gray-700">{b.customer}</td>
                  <td className="px-4 py-3 text-gray-500">{b.date}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {b.lines.reduce((s, l) => s + l.qty, 0)} item(s)
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">
                    {formatCurrency(b.total)}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePaid(b.id)} title="Toggle payment status">
                      <Badge tone={b.paid ? 'green' : 'amber'}>{b.paid ? 'Paid' : 'Unpaid'}</Badge>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs text-brand-600">
                      <ArrowRight className="h-3.5 w-3.5" />
                      Sent
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function NewBillForm({ onSubmit }: { onSubmit: (input: {
  customer: string
  phone?: string
  address?: string
  scheduledDate?: string
  lines: BillLine[]
}) => void }) {
  const [customer, setCustomer] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [scheduledDate, setScheduledDate] = useState('')
  const [productId, setProductId] = useState(products[0].id)
  const [qty, setQty] = useState(1)
  const [lines, setLines] = useState<BillLine[]>([])

  const subtotal = lines.reduce((s, l) => s + l.qty * l.unitPrice, 0)
  const tax = Math.round(subtotal * GST_RATE * 100) / 100
  const total = subtotal + tax
  const canSubmit = customer.trim() !== '' && lines.length > 0

  function addLine() {
    const p = products.find((x) => x.id === productId)
    if (!p || qty < 1) return
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === p.id)
      if (existing) {
        return prev.map((l) => (l.productId === p.id ? { ...l, qty: l.qty + qty } : l))
      }
      return [...prev, { productId: p.id, sku: p.sku, name: p.name, qty, unitPrice: p.price }]
    })
    setQty(1)
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <Receipt className="h-5 w-5 text-brand-500" />
        <h2 className="font-semibold text-gray-800">New Bill</h2>
      </div>

      {/* Customer details */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Customer *">
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Customer / company name"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
        </Field>
        <Field label="Phone">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91…"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
        </Field>
        <Field label="Installation address">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Site address"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
        </Field>
        <Field label="Installation date">
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
        </Field>
      </div>

      {/* Add inventory item */}
      <div className="mt-4 flex flex-wrap items-end gap-3 rounded-xl bg-gray-50 p-3">
        <Field label="Inventory item" className="min-w-[220px] flex-1">
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {formatCurrency(p.price)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Qty" className="w-20">
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
        </Field>
        <button
          onClick={addLine}
          className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100"
        >
          <Plus className="h-4 w-4" />
          Add item
        </button>
      </div>

      {/* Line items */}
      {lines.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-2 py-2 font-medium">Item</th>
                <th className="px-2 py-2 text-center font-medium">Qty</th>
                <th className="px-2 py-2 text-right font-medium">Unit</th>
                <th className="px-2 py-2 text-right font-medium">Amount</th>
                <th className="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.productId} className="border-t border-gray-100">
                  <td className="px-2 py-2 text-gray-800">
                    {l.name}
                    <span className="ml-2 text-xs text-gray-400">{l.sku}</span>
                  </td>
                  <td className="px-2 py-2 text-center text-gray-600">{l.qty}</td>
                  <td className="px-2 py-2 text-right text-gray-600">{formatCurrency(l.unitPrice)}</td>
                  <td className="px-2 py-2 text-right font-medium text-gray-800">
                    {formatCurrency(l.qty * l.unitPrice)}
                  </td>
                  <td className="px-2 py-2 text-right">
                    <button
                      onClick={() => setLines((prev) => prev.filter((x) => x.productId !== l.productId))}
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Totals + submit */}
      <div className="mt-4 flex flex-col items-end gap-1 border-t border-gray-100 pt-4">
        <div className="flex w-full max-w-xs justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex w-full max-w-xs justify-between text-sm text-gray-500">
          <span>GST (18%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex w-full max-w-xs justify-between text-base font-bold text-gray-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <button
          disabled={!canSubmit}
          onClick={() => onSubmit({ customer, phone, address, scheduledDate, lines })}
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Generate Bill &amp; Send to Installation
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-gray-500">{label}</span>
      {children}
    </label>
  )
}
