import { useMemo, useState, type ReactNode } from 'react'
import {
  Search,
  Plus,
  Download,
  LayoutGrid,
  List,
  Sofa,
  BedDouble,
  Armchair,
  Coffee,
  Layers,
  Package,
} from 'lucide-react'
import {
  products as allProducts,
  categories,
  stockStatus,
  type Category,
  type StockStatus,
  type Product,
} from '@/data/inventory'
import { formatCurrency } from '@/lib/pipeline'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'

const categoryIcon: Record<Category, typeof Sofa> = {
  'Sofa Set': Sofa,
  'Bedroom Set': BedDouble,
  Mattress: Layers,
  'Coffee Table': Coffee,
  'Arm Chair': Armchair,
}

const categoryColor: Record<Category, string> = {
  'Sofa Set': '#2563eb',
  'Bedroom Set': '#7c3aed',
  Mattress: '#0d9488',
  'Coffee Table': '#f97316',
  'Arm Chair': '#db2777',
}

const statusBadge: Record<StockStatus, { tone: 'green' | 'amber' | 'red'; label: string }> = {
  in: { tone: 'green', label: 'In Stock' },
  low: { tone: 'amber', label: 'Low Stock' },
  out: { tone: 'red', label: 'Out of Stock' },
}

export default function Inventory() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [view, setView] = useState<'grid' | 'table'>('grid')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allProducts.filter((p) => {
      if (category !== 'All' && p.category !== category) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.colour.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
      )
    })
  }, [query, category])

  // Summary stats (over the full catalogue, not the filtered view).
  const stats = useMemo(() => {
    const totalUnits = allProducts.reduce((sum, p) => sum + p.stock, 0)
    const value = allProducts.reduce((sum, p) => sum + p.stock * p.price, 0)
    const low = allProducts.filter((p) => stockStatus(p.stock) === 'low').length
    const out = allProducts.filter((p) => stockStatus(p.stock) === 'out').length
    return { totalUnits, value, low, out }
  }, [])

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="flex items-baseline gap-2">
        <h1 className="text-2xl font-bold text-brand-600">Inventory</h1>
        <span className="text-sm text-gray-400">Manley Furniture Studio</span>
      </div>

      {/* Summary stats */}
      <div className="flex flex-wrap gap-3">
        <StatCard value={allProducts.length} label="Products" active />
        <StatCard value={stats.totalUnits} label="Units in stock" valueColor="text-brand-600" />
        <StatCard value={categories.length} label="Categories" valueColor="text-purple-600" />
        <StatCard value={stats.low} label="Low stock" valueColor="text-amber-500" />
        <StatCard value={stats.out} label="Out of stock" valueColor="text-red-500" />
        <StatCard
          value={formatCurrency(stats.value)}
          label="Stock value"
          valueColor="text-green-600"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, SKU, colour, material…"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-400"
          />
        </div>

        <div className="flex rounded-lg border border-gray-200 bg-white p-0.5">
          <button
            onClick={() => setView('grid')}
            className={`rounded-md p-1.5 ${view === 'grid' ? 'bg-brand-500 text-white' : 'text-gray-500'}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView('table')}
            className={`rounded-md p-1.5 ${view === 'table' ? 'bg-brand-500 text-white' : 'text-gray-500'}`}
            aria-label="Table view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <FilterPill active={category === 'All'} onClick={() => setCategory('All')}>
          All ({allProducts.length})
        </FilterPill>
        {categories.map((c) => {
          const count = allProducts.filter((p) => p.category === c).length
          return (
            <FilterPill key={c} active={category === c} onClick={() => setCategory(c)}>
              {c} ({count})
            </FilterPill>
          )
        })}
      </div>

      {view === 'grid' ? <ProductGrid items={filtered} /> : <ProductTable items={filtered} />}

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-sm text-gray-400">
          No products match your filters.
        </div>
      )}
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )
}

function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => {
        const Icon = categoryIcon[p.category] ?? Package
        const bg = categoryColor[p.category]
        const status = statusBadge[stockStatus(p.stock)]
        const off = Math.round(((p.mrp - p.price) / p.mrp) * 100)
        return (
          <div
            key={p.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            {/* Image placeholder */}
            <div
              className="relative flex h-32 items-center justify-center"
              style={{ backgroundColor: bg }}
            >
              <Icon className="h-12 w-12 text-white/80" />
              {p.isNew && (
                <span className="absolute left-3 top-3 rounded-md bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
                  New
                </span>
              )}
              {off > 0 && (
                <span className="absolute right-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-xs font-bold text-gray-800">
                  {off}% off
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <div className="text-xs text-gray-400">{p.sku}</div>
              <h3 className="mt-0.5 line-clamp-2 font-semibold text-gray-800">{p.name}</h3>
              <div className="mt-1 text-xs text-gray-500">
                {p.colour} · {p.material}
              </div>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-lg font-bold text-gray-900">{formatCurrency(p.price)}</span>
                {p.mrp > p.price && (
                  <span className="text-xs text-gray-400 line-through">{formatCurrency(p.mrp)}</span>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                <Badge tone={status.tone}>{status.label}</Badge>
                <span className="text-xs text-gray-500">{p.stock} in stock</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ProductTable({ items }: { items: Product[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 text-right font-medium">Price</th>
              <th className="px-4 py-3 text-right font-medium">MRP</th>
              <th className="px-4 py-3 text-center font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const status = statusBadge[stockStatus(p.stock)]
              return (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{p.name}</div>
                    <div className="text-xs text-gray-400">
                      {p.colour} · {p.material}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.sku}</td>
                  <td className="px-4 py-3 text-gray-600">{p.category}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">
                    {formatCurrency(p.price)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-400 line-through">
                    {formatCurrency(p.mrp)}
                  </td>
                  <td className="px-4 py-3 text-center font-medium text-gray-700">{p.stock}</td>
                  <td className="px-4 py-3">
                    <Badge tone={status.tone}>{status.label}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
