import { FileText, ChevronLeft, ChevronRight, Calendar, Landmark, CalendarClock, Scale, Trash2 } from 'lucide-react'
import { Card, fmtZMW } from '../../../shared/components/dashboard/DashboardKit'
import type { LedgerMovement, LedgerSummary } from '../generalLedger.queries'

const COLUMNS = ['Num. Transaction', 'Journal', 'Date', 'Accounting Doc.', 'Label', 'Currency Code', 'Conversion Amount']

function MovementRow({ icon: Icon, label, movement }: { icon: typeof CalendarClock; label: string; movement: LedgerMovement }) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-1 py-3 border-b border-border last:border-0">
      <span className="flex items-center gap-2 text-text-muted min-w-48">
        <Icon size={15} /> {label}
      </span>
      <span className="text-text-muted text-sm">
        Debit: <span className="text-text!">{fmtZMW(movement.debit)}</span>
      </span>
      <span className="text-text-muted text-sm">
        Credit: <span className="text-text!">{fmtZMW(movement.credit)}</span>
      </span>
      <span className="ml-auto font-semibold text-success">
        {fmtZMW(movement.balance)} {movement.balanceSide}
      </span>
    </div>
  )
}

export function LedgerOverview({ summary }: { summary: LedgerSummary }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text!">
          <FileText size={20} className="text-brand" /> Operations - View By Accounting Account (Ledger)
        </h2>
        <div className="flex items-center gap-1">
          <button type="button" disabled title="Not built yet" className="p-1.5 rounded-md border border-border text-text-faint cursor-default">
            <ChevronLeft size={16} />
          </button>
          <span className="px-3 py-1 rounded-md border border-border text-sm font-medium text-text!">Year {summary.year}</span>
          <button type="button" disabled title="Not built yet" className="p-1.5 rounded-md border border-border text-text-faint cursor-default">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <Card>
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-1 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar size={12} /> Select By Date
            </span>
            <input type="date" disabled defaultValue={`${summary.year}-12-31`} className="text-sm rounded-md border border-input-border bg-input-bg text-text px-2 py-1.5" />
          </label>
          <label className="flex flex-col gap-1 text-xs text-text-muted">
            <span>Select By Account</span>
            <select disabled defaultValue="" className="text-sm rounded-md border border-input-border bg-input-bg text-text px-2 py-1.5 min-w-48">
              <option value="">All Accounting Accounts</option>
            </select>
          </label>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-faint uppercase tracking-wide border-b border-border">
                {COLUMNS.map((col) => (
                  <th key={col} className="font-medium px-3 py-2 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summary.entries.length === 0 ? (
                <tr>
                  <td className="px-3 py-4 text-text-faint italic" colSpan={COLUMNS.length}>
                    No accounting entries yet.
                  </td>
                </tr>
              ) : (
                summary.entries.map((entry) => (
                  <tr key={entry.transactionNum} className="border-b border-border">
                    <td className="px-3 py-2 text-brand">{entry.transactionNum}</td>
                    <td className="px-3 py-2 text-text-muted">{entry.journal}</td>
                    <td className="px-3 py-2 text-text-muted">{entry.date}</td>
                    <td className="px-3 py-2 text-text-muted">{entry.accountingDoc}</td>
                    <td className="px-3 py-2 text-text!">{entry.label}</td>
                    <td className="px-3 py-2 text-text-muted">{entry.currencyCode}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-text!">{fmtZMW(entry.conversionAmount)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h3 className="flex items-center gap-2 font-semibold text-text! mb-2">
          <Landmark size={16} className="text-text-muted" /> Account Summary
        </h3>
        <MovementRow icon={CalendarClock} label="Period Movements" movement={summary.periodMovements} />
        <MovementRow icon={Scale} label="Closing Balance" movement={summary.closingBalance} />
      </Card>

      <button
        type="button"
        disabled
        title="Not built yet"
        className="flex items-center gap-2 rounded-lg bg-danger px-4 py-2.5 text-sm font-medium text-white opacity-60 cursor-default"
      >
        <Trash2 size={14} /> Delete Some Operation Lines From Accounting
      </button>
    </div>
  )
}
