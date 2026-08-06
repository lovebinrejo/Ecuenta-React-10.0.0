import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, AlertTriangle } from 'lucide-react'

export const PER_PAGE = 25

// DataTables-style windowed page list: first page, a run of consecutive
// pages around the current one, "...", last page — e.g. 1 2 3 4 5 … 114.
function getPageNumbers(current: number, total: number, windowSize = 5): (number | '…')[] {
  if (total <= windowSize + 2) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  let start = Math.max(1, current - Math.floor(windowSize / 2))
  let end = start + windowSize - 1
  if (end > total) {
    end = total
    start = end - windowSize + 1
  }
  const pages: (number | '…')[] = []
  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push('…')
  }
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total) {
    if (end < total - 1) pages.push('…')
    pages.push(total)
  }
  return pages
}

// Upload/sync actions across the ZRA module submit to the LIVE ZRA government
// tax sandbox (see custom/zra/core/modules/zraworker.class.php), not just a
// local mutation. Left unwired pending explicit confirmation that live
// submission is wanted, rather than silently faking success or silently
// firing real government-facing requests.
export function notWiredYet() {
  window.alert(
    'This action submits to the live ZRA government tax API and has not been wired up yet — confirm with the developer before enabling it.',
  )
}

export function ListPagination({ page, perPage, total, onPageChange }: { page: number; perPage: number; total: number; onPageChange: (page: number) => void }) {
  if (total === 0) return null
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const rangeStart = (page - 1) * perPage + 1
  const rangeEnd = Math.min(page * perPage, total)
  const pages = getPageNumbers(page, totalPages)

  const navBtnCls = 'p-1.5 rounded-md hover:bg-surface-alt disabled:opacity-40 disabled:hover:bg-transparent'

  return (
    <div className="sticky bottom-0 -mx-3 px-3 py-3 border-t border-border bg-white dark:bg-gray-950 flex flex-wrap items-center justify-between gap-3 text-sm text-text-muted">
      <span>
        Showing {rangeStart} to {rangeEnd} of {total.toLocaleString()} entries
      </span>
      <div className="flex items-center gap-1">
        <button type="button" disabled={page <= 1} onClick={() => onPageChange(1)} className={navBtnCls} title="First page">
          <ChevronsLeft size={16} />
        </button>
        <button type="button" disabled={page <= 1} onClick={() => onPageChange(Math.max(1, page - 1))} className={navBtnCls} title="Previous page">
          <ChevronLeft size={16} />
        </button>
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-text-faint select-none">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`min-w-[2rem] px-2 py-1 rounded-md text-sm ${p === page ? 'bg-brand text-white font-semibold' : 'text-text hover:bg-surface-alt'}`}
            >
              {p}
            </button>
          ),
        )}
        <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(Math.min(totalPages, page + 1))} className={navBtnCls} title="Next page">
          <ChevronRight size={16} />
        </button>
        <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(totalPages)} className={navBtnCls} title="Last page">
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  )
}

export function ListHeader({ icon, title, count, action }: { icon: React.ReactNode; title: string; count: number | undefined; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-text!">
        {icon}
        {title}
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-surface-alt text-text-muted">{count ?? '…'}</span>
      </h2>
      {action}
    </div>
  )
}

export function SearchBox({ value, onChange, onSubmit, placeholder = 'Search…' }: { value: string; onChange: (v: string) => void; onSubmit: () => void; placeholder?: string }) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        placeholder={placeholder}
        className="flex-1 h-9 px-3 rounded-md border border-input-border bg-input-bg text-text text-sm outline-none focus:ring-2 focus:ring-brand/30"
      />
      <button type="button" onClick={onSubmit} className="px-3 h-9 rounded-md text-sm font-medium bg-brand text-white hover:opacity-90">
        Search
      </button>
    </div>
  )
}

export function TableShell({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-border bg-surface-alt overflow-auto max-h-[65vh] soft-scrollbar">{children}</div>
}

export function EmptyRow({
  colSpan,
  isLoading,
  isError,
  isEmpty,
  emptyLabel,
}: {
  colSpan: number
  isLoading: boolean
  isError: boolean
  isEmpty: boolean
  emptyLabel: string
}) {
  if (isLoading) {
    return (
      <tr>
        <td colSpan={colSpan} className="px-3 py-8 text-center text-text-faint">
          Loading…
        </td>
      </tr>
    )
  }
  if (isError) {
    return (
      <tr>
        <td colSpan={colSpan} className="px-3 py-8 text-center text-danger">
          Could not load data.
        </td>
      </tr>
    )
  }
  if (!isEmpty) return null
  return (
    <tr>
      <td colSpan={colSpan} className="px-3 py-8 text-center text-text-faint">
        {emptyLabel}
      </td>
    </tr>
  )
}

// Shown on ZRA pages with no matching backend endpoint at all (as opposed to
// a page that loaded and came back empty) — an honest "not available" state
// instead of fabricated rows.
export function BackendUnavailable({ icon, title, note }: { icon: React.ReactNode; title: string; note?: string }) {
  return (
    <div className="space-y-4">
      <ListHeader icon={icon} title={title} count={undefined} />
      <div className="rounded-xl border border-border bg-surface-alt px-4 py-10 flex flex-col items-center text-center gap-2">
        <AlertTriangle size={22} className="text-warning-fg" />
        <p className="text-sm font-medium text-text!">Backend not available yet</p>
        <p className="text-sm text-text-faint max-w-md">
          {note ?? 'No matching REST endpoint exists for this data on the backend yet — this page will connect once one is built.'}
        </p>
      </div>
    </div>
  )
}

export function ZraStatusBadge({ synced, label }: { synced: boolean; label: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${synced ? 'bg-success-bg text-success-fg' : 'bg-danger-bg text-danger-fg'}`}>{label}</span>
  )
}
