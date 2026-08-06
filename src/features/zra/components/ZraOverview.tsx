import { type ComponentType } from 'react'
import { CheckCircle2, RefreshCw, ReceiptText, FileText, Calculator, Percent, ShoppingCart, ListChecks, LayoutList } from 'lucide-react'
import { formatMoney } from '../../../utils/format'
import type { ZraSummary, ZraSyncDetailRow, ZraSyncStat } from '../zra.queries'

const fmt = (n: number) => `ZMW ${formatMoney(n)}`

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-surface-alt border border-border rounded-xl p-4 ${className}`}>{children}</div>
}

const ICON_STYLES = {
  blue: 'bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400',
  cyan: 'bg-cyan-50 text-cyan-500 dark:bg-cyan-500/10 dark:text-cyan-400',
  violet: 'bg-violet-50 text-violet-500 dark:bg-violet-500/10 dark:text-violet-400',
  rose: 'bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400',
  success: 'bg-success-bg text-success-fg',
} as const

function SyncStatCard({
  label,
  stat,
  icon: Icon,
  color,
  totalLabel = 'Total',
}: {
  label: string
  stat: ZraSyncStat
  icon: ComponentType<{ size?: number }>
  color: keyof typeof ICON_STYLES
  totalLabel?: string
}) {
  return (
    <Card className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wide truncate">{label}</p>
        <p className="text-sm font-semibold text-text! mt-2">
          {fmt(stat.succeededAmount)} <span className="text-success font-normal">✓ Succeeded</span>
        </p>
        <p className="text-sm font-semibold text-text!">
          {fmt(stat.unsyncedAmount)} <span className="text-text-faint font-normal">Unsynced</span>
        </p>
        <p className="text-xs text-success mt-2">
          {totalLabel}: {fmt(stat.totalAmount)}
        </p>
      </div>
      <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${ICON_STYLES[color]}`}>
        <Icon size={18} />
      </span>
    </Card>
  )
}

function PurchaseAmountCard({ amount }: { amount: number }) {
  return (
    <Card className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wide truncate">Purchase Amount</p>
        <p className="text-sm font-semibold text-text! mt-2">
          {fmt(amount)} <span className="text-success font-normal">✓ Complete</span>
        </p>
        <p className="text-xs text-success mt-2 flex items-center gap-1">
          <ShoppingCart size={12} /> Supplier Invoices
        </p>
      </div>
      <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${ICON_STYLES.success}`}>
        <CheckCircle2 size={18} />
      </span>
    </Card>
  )
}

const STATUS_BADGE: Record<ZraSyncDetailRow['status'], { label: string; cls: string; symbol: string }> = {
  poor: { label: 'POOR', cls: 'bg-danger-bg text-danger-fg', symbol: '✗' },
  fair: { label: 'FAIR', cls: 'bg-warning-bg text-warning-fg', symbol: '⚠' },
  good: { label: 'GOOD', cls: 'bg-success-bg text-success-fg', symbol: '✓' },
  complete: { label: 'COMPLETE', cls: 'bg-success-bg text-success-fg', symbol: '✓' },
}

const dash = (n: number | null) => (n === null ? '-' : String(n))

// Filter is presentational only — there's no backend to query by year yet, so
// it always shows "All Years" (matching the stub's single all-zero snapshot).
function YearFilter() {
  return (
    <label className="flex items-center gap-2 text-xs text-text-muted">
      <span className="hidden @sm:inline">Filter by Year:</span>
      <select
        defaultValue="all"
        className="text-xs rounded-md border border-input-border bg-input-bg text-text px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand/30"
      >
        <option value="all">All Years</option>
      </select>
    </label>
  )
}

export function ZraOverview({ summary }: { summary: ZraSummary }) {
  return (
    <div className="space-y-4">
      {summary.serverError && (
        <div className="flex items-center gap-2 rounded-lg border border-warning-border bg-warning-bg text-warning-fg px-4 py-2.5 text-sm font-medium">
          {summary.serverError}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-1.5">
          ZRA Server Api Status:
          {summary.apiOnline ? (
            <span className="flex items-center gap-1 text-success font-medium">
              <CheckCircle2 size={14} /> ZRA API Online
            </span>
          ) : (
            <span className="text-danger font-medium">Offline</span>
          )}
        </span>
        <span className="flex items-center gap-2">
          ZRA Server Synchronization Status:
          <span className="inline-flex items-center rounded-full bg-warning-bg text-warning-fg text-xs font-medium px-2.5 py-1">{summary.syncStatus}</span>
          <button type="button" title="Refresh sync status" className="p-1 rounded-md text-brand hover:bg-surface-alt">
            <RefreshCw size={14} />
          </button>
        </span>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-text!">
          <LayoutList size={16} className="text-brand" /> ZRA Synchronization Overview
        </h3>
        <YearFilter />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SyncStatCard label="Sales Invoices" stat={summary.salesInvoices} icon={ReceiptText} color="blue" />
        <SyncStatCard label="Credit Notes" stat={summary.creditNotes} icon={FileText} color="cyan" />
        <SyncStatCard label="Income" stat={summary.income} icon={Calculator} color="violet" totalLabel="Combined Total" />
        <SyncStatCard label="VAT Amount" stat={summary.vatAmount} icon={Percent} color="rose" />
        <PurchaseAmountCard amount={summary.purchaseAmount.amount} />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-text!">
          <ListChecks size={16} className="text-brand" /> ZRA Synchronization Details
        </h3>
        <YearFilter />
      </div>
      <Card className="!p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-text-faint uppercase tracking-wide border-b border-border bg-surface">
              <th className="font-medium px-4 py-3">Category</th>
              <th className="font-medium px-4 py-3">Total Count</th>
              <th className="font-medium px-4 py-3">Succeeded</th>
              <th className="font-medium px-4 py-3">Unsynced</th>
              <th className="font-medium px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {summary.details.map((row) => {
              const badge = STATUS_BADGE[row.status]
              return (
                <tr key={row.category} className="border-t border-border">
                  <td className="px-4 py-3 text-brand font-medium">{row.category}</td>
                  <td className="px-4 py-3 text-text-muted">{dash(row.totalCount)}</td>
                  <td className="px-4 py-3 text-success font-medium">{dash(row.succeeded)}</td>
                  <td className="px-4 py-3 text-danger font-medium">{dash(row.unsynced)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.cls}`}>
                      {badge.symbol} {badge.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
