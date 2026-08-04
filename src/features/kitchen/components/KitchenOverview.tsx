import { useState } from 'react'
import { LineChart, ListChecks, Plus, Receipt, Clock, CheckCheck, Monitor, RefreshCw, Inbox } from 'lucide-react'
import { Card, ICON_STYLES } from '../../../shared/components/dashboard/DashboardKit'
import type { KitchenSummary } from '../kitchen.queries'

type Tab = 'all' | 'pending' | 'completed'

export function KitchenOverview({ summary }: { summary: KitchenSummary }) {
  const [tab, setTab] = useState<Tab>('all')

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: summary.totalOrders },
    { key: 'pending', label: 'Pending Orders', count: summary.pendingOrders },
    { key: 'completed', label: 'Completed Orders', count: summary.completedOrders },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text!">
          <LineChart size={20} className="text-brand" /> Kitchen Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <button type="button" disabled title="Not built yet" className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-text-muted cursor-default">
            <ListChecks size={14} /> Order Management
          </button>
          <button type="button" disabled title="Not built yet" className="flex items-center gap-1.5 rounded-lg bg-text px-3 py-2 text-sm text-surface opacity-80 cursor-default">
            <Plus size={14} /> New Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Total Orders</p>
            <p className="text-3xl font-bold text-text! mt-1">{summary.totalOrders}</p>
            <p className="text-xs text-text-faint mt-1">Today&apos;s orders</p>
          </div>
          <span className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${ICON_STYLES.violet}`}>
            <Receipt size={20} />
          </span>
        </Card>
        <Card className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Active Orders</p>
            <p className="text-3xl font-bold text-text! mt-1">{summary.activeOrders}</p>
            <p className="text-xs text-text-faint mt-1">Orders in progress</p>
          </div>
          <span className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${ICON_STYLES.rose}`}>
            <Clock size={20} />
          </span>
        </Card>
        <Card className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Completed Orders</p>
            <p className="text-3xl font-bold text-text! mt-1">{summary.completedOrders}</p>
            <p className="text-xs text-text-faint mt-1">Finished orders</p>
          </div>
          <span className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${ICON_STYLES.green}`}>
            <CheckCheck size={20} />
          </span>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <h3 className="flex items-center gap-2 font-semibold text-text-muted">
          <Monitor size={16} /> Token Status Overview
        </h3>
        <label className="flex items-center gap-2 text-sm text-text-muted ml-auto">
          Select Date:
          <input type="date" disabled className="rounded-md border border-input-border bg-input-bg text-text px-2 py-1.5 text-sm" />
        </label>
        <button type="button" disabled title="Not built yet" className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-sm text-white opacity-80 cursor-default">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <Card>
        <div className="flex flex-wrap gap-2 border-b border-border pb-3 mb-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${tab === t.key ? 'bg-brand text-white' : 'text-text-muted hover:bg-surface-hover'}`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-text-faint">
          <Inbox size={32} />
          <p className="text-sm">No orders found for this status</p>
        </div>
      </Card>
    </div>
  )
}
