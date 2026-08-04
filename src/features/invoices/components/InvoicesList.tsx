import { Link } from 'react-router-dom'
import { ShoppingCart, Plus, User, FileText, Check, TriangleAlert, Search, CalendarDays } from 'lucide-react'
import { ROUTES } from '../../../routes'
import { Card, ICON_STYLES, fmtZMW } from '../../../shared/components/dashboard/DashboardKit'
import { formatMoney } from '../../../utils/format'
import type { InvoicesSummary } from '../invoices.queries'

const COLUMNS = ['Ref', 'Invoice No', 'Invoice Date', 'Third-Party', 'City', 'Payment Type', 'Amount (Incl. Tax)', 'Author', 'Status', 'Zra Status']

export function InvoicesList({ summary }: { summary: InvoicesSummary }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text!">
          <ShoppingCart size={20} className="text-brand" /> Sales Invoices
        </h2>
        <div className="flex items-center gap-2">
          <Link to={ROUTES.invoiceCreate} className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-hover">
            <Plus size={14} /> New Quick Invoice
          </Link>
          <Link to={ROUTES.invoiceCreate} className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-hover">
            <Plus size={14} /> New Detailed Invoice
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Clients</p>
            <p className="text-2xl font-bold text-text! mt-1">{summary.clients}</p>
            <p className="text-xs text-text-faint mt-1">Customer records</p>
          </div>
          <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${ICON_STYLES.blue}`}>
            <User size={18} />
          </span>
        </Card>
        <Card className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Invoices</p>
            <p className="text-2xl font-bold text-text! mt-1">{summary.invoices}</p>
            <p className="text-xs text-text-faint mt-1">Sales invoices</p>
          </div>
          <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${ICON_STYLES.cyan}`}>
            <FileText size={18} />
          </span>
        </Card>
        <Card className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Paid</p>
            <p className="text-2xl font-bold text-text! mt-1">{fmtZMW(summary.paidAmount)}</p>
            <p className="text-xs text-text-faint mt-1">Collected amount</p>
          </div>
          <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${ICON_STYLES.green}`}>
            <Check size={18} />
          </span>
        </Card>
        <Card className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Unpaid</p>
            <p className="text-2xl font-bold text-text! mt-1">{fmtZMW(summary.unpaidAmount)}</p>
            <p className="text-xs text-text-faint mt-1">Outstanding amount</p>
          </div>
          <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${ICON_STYLES.rose}`}>
            <TriangleAlert size={18} />
          </span>
        </Card>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <select disabled defaultValue="15" className="text-sm rounded-md border border-input-border bg-input-bg text-text px-2 py-1.5">
            <option value="15">15</option>
          </select>
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
            <input disabled type="text" placeholder="Search" className="w-full text-sm rounded-md border border-input-border bg-input-bg text-text pl-8 pr-3 py-1.5" />
          </div>
          <button type="button" disabled title="Not built yet" className="p-2 rounded-md border border-input-border bg-input-bg text-text-faint cursor-default ml-auto">
            <CalendarDays size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-faint uppercase tracking-wide border-b border-border bg-surface">
                {COLUMNS.map((col) => (
                  <th key={col} className="font-medium px-4 py-2.5 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summary.rows.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-text-faint italic" colSpan={COLUMNS.length}>
                    No Data Available In Table
                  </td>
                </tr>
              ) : (
                summary.rows.map((r) => (
                  <tr key={r.ref} className="border-b border-border">
                    <td className="px-4 py-3 text-brand">{r.ref}</td>
                    <td className="px-4 py-3 text-text-muted">{r.invoiceNo}</td>
                    <td className="px-4 py-3 text-text-muted whitespace-nowrap">{r.invoiceDate}</td>
                    <td className="px-4 py-3 text-text!">{r.thirdParty}</td>
                    <td className="px-4 py-3 text-text-muted">{r.city}</td>
                    <td className="px-4 py-3 text-text-muted">{r.paymentType}</td>
                    <td className="px-4 py-3 text-text! text-right tabular-nums">{formatMoney(r.amountInclTax)} ZMW</td>
                    <td className="px-4 py-3 text-text-muted">{r.author}</td>
                    <td className="px-4 py-3 text-text-muted">{r.status}</td>
                    <td className="px-4 py-3 text-text-muted">{r.zraStatus}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-border text-xs text-text-muted">
          <span>
            Showing {summary.rows.length} to {summary.rows.length} of {summary.rows.length} entries
          </span>
          <div className="flex items-center gap-1">
            {['«', '‹', '›', '»'].map((label) => (
              <button key={label} type="button" disabled title="Not built yet" className="w-7 h-7 rounded-md text-xs border border-border text-text-faint cursor-default">
                {label}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
