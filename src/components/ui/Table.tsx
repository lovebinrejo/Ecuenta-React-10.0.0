import type { ReactNode } from 'react'

interface Column<T> {
  key: keyof T
  header: string
  render?: (row: T) => ReactNode
}

interface TableProps<T extends Record<string, unknown>> {
  columns: ReadonlyArray<Column<T>>
  data: T[]
  caption?: string
}

export function Table<T extends Record<string, unknown>>({ columns, data, caption }: TableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
      {caption ? <p className="border-b border-slate-800 px-4 py-3 text-sm font-medium text-slate-300">{caption}</p> : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-4 py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-t border-slate-800 hover:bg-slate-900/60">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-3">
                    {column.render ? column.render(row) : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
