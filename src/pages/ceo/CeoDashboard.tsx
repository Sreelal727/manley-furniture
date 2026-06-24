import { useMemo, type ReactNode } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { TrendingUp, Target, Wrench } from 'lucide-react'
import {
  monthlyRevenue,
  salesByCategory,
  leadsBySource,
  topProducts,
  departmentHeadcount,
  CHART_COLORS,
} from '@/data/analytics'
import { pipelineSummary } from '@/data/crm'
import { employees } from '@/data/hrms'
import { useBilling } from '@/store/billing'
import { formatCurrency } from '@/lib/pipeline'
import StatCard from '@/components/ui/StatCard'

/** Compact rupee label for chart axes: ₹34.2L / ₹1.2Cr. */
function inr(n: number): string {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)}Cr`
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)}L`
  if (n >= 1e3) return `₹${(n / 1e3).toFixed(0)}k`
  return `₹${n}`
}

const installColors: Record<string, string> = {
  Pending: '#94a3b8',
  Assigned: '#3b82f6',
  'In Progress': '#f59e0b',
  Completed: '#16a34a',
}

export default function CeoDashboard() {
  const { bills, installations } = useBilling()

  const ytdRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0)
  const ytdOrders = monthlyRevenue.reduce((s, m) => s + m.orders, 0)
  const avgOrder = Math.round(ytdRevenue / ytdOrders)
  const pipelineValue = pipelineSummary.reduce((s, p) => s + p.value, 0)
  const billedRevenue = bills.reduce((s, b) => s + b.total, 0)

  const momGrowth = (() => {
    const n = monthlyRevenue.length
    const cur = monthlyRevenue[n - 1].revenue
    const prev = monthlyRevenue[n - 2].revenue
    return ((cur - prev) / prev) * 100
  })()
  const junTargetPct = (monthlyRevenue[5].revenue / monthlyRevenue[5].target) * 100

  const installData = useMemo(() => {
    const labels: Record<string, string> = {
      pending: 'Pending',
      assigned: 'Assigned',
      in_progress: 'In Progress',
      completed: 'Completed',
    }
    const counts: Record<string, number> = {}
    installations.forEach((i) => {
      const l = labels[i.status]
      counts[l] = (counts[l] ?? 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [installations])

  const completedPct = installations.length
    ? Math.round(
        (installations.filter((i) => i.status === 'completed').length / installations.length) * 100,
      )
    : 0

  const pipelineBars = pipelineSummary
    .filter((p) => p.count > 0)
    .map((p) => ({ name: stageShort(p.key), value: p.count }))

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="flex items-baseline gap-2">
        <h1 className="text-2xl font-bold text-brand-600">CEO Dashboard</h1>
        <span className="text-sm text-gray-400">Business overview · 2026</span>
      </div>

      {/* Headline stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        <StatCard value={inr(ytdRevenue)} label="Revenue (YTD)" valueColor="text-green-600" active />
        <StatCard value={ytdOrders} label="Orders (YTD)" valueColor="text-brand-600" />
        <StatCard value={inr(avgOrder)} label="Avg order" valueColor="text-violet-600" />
        <StatCard value={inr(pipelineValue)} label="Open pipeline" valueColor="text-orange-500" />
        <StatCard value={installations.length} label="Installations" valueColor="text-cyan-600" />
        <StatCard value={employees.length} label="Team size" valueColor="text-pink-600" />
      </div>

      {/* Insight highlights */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Insight
          icon={<TrendingUp className="h-5 w-5" />}
          tint="bg-green-50 text-green-700"
          title={`+${momGrowth.toFixed(1)}% MoM`}
          note="June revenue grew over May, the strongest month this year."
        />
        <Insight
          icon={<Target className="h-5 w-5" />}
          tint="bg-violet-50 text-violet-700"
          title={`${junTargetPct.toFixed(0)}% of target`}
          note="June revenue beat its monthly target of ₹30.0L."
        />
        <Insight
          icon={<Wrench className="h-5 w-5" />}
          tint="bg-cyan-50 text-cyan-700"
          title={`${completedPct}% installs done`}
          note={`${billedRevenue ? inr(billedRevenue) + ' billed across ' + bills.length + ' invoices.' : 'Installation jobs on track.'}`}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Revenue vs Target" subtitle="Monthly, 2026" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={inr} tick={{ fontSize: 11 }} width={56} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Legend />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#12b76a" fill="#12b76a33" strokeWidth={2} />
              <Line type="monotone" dataKey="target" name="Target" stroke="#7c3aed" strokeWidth={2} dot={false} strokeDasharray="5 4" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sales by Category" subtitle="Revenue share">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={salesByCategory} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                {salesByCategory.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Orders" subtitle="Units sold per month">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="orders" name="Orders" fill="#12b76a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Leads by Source" subtitle="Acquisition channels">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={leadsBySource} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                {leadsBySource.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[(i + 2) % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Installation Status" subtitle="Live from billing">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={installData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                {installData.map((d, i) => (
                  <Cell key={i} fill={installColors[d.name] ?? CHART_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Products" subtitle="By revenue" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
              <XAxis type="number" tickFormatter={inr} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Bar dataKey="revenue" name="Revenue" fill="#7c3aed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Pipeline by Stage" subtitle="Open lead counts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pipelineBars} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" name="Leads" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Department Headcount" subtitle="Across the company" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentHeadcount} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" name="Employees" fill="#0891b2" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

function ChartCard({
  title,
  subtitle,
  children,
  className = '',
}: {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-4 ${className}`}>
      <div className="mb-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
      <div className="h-64">{children}</div>
    </div>
  )
}

function Insight({
  icon,
  tint,
  title,
  note,
}: {
  icon: ReactNode
  tint: string
  title: string
  note: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tint}`}>
        {icon}
      </div>
      <div>
        <div className="text-lg font-bold text-gray-900">{title}</div>
        <div className="text-xs text-gray-500">{note}</div>
      </div>
    </div>
  )
}

// Short labels for the pipeline stage bars.
function stageShort(key: string): string {
  const map: Record<string, string> = {
    new_lead: 'New',
    contacted: 'Contact',
    qualified: 'Qualified',
    proposal: 'Proposal',
    follow_up: 'Follow',
    demo: 'Demo',
    negotiation: 'Negotiate',
    deal: 'Deal',
    lpo: 'LPO',
    purchase: 'Purchase',
    delivery: 'Delivery',
    cash_customer: 'Cash',
    credit: 'Credit',
    close: 'Close',
  }
  return map[key] ?? key
}
