import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/axios'
import { Table } from '../../components/ui/Table'
import { appTheme } from '../../themes/theme'

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'title', header: 'Title' },
  { key: 'completed', header: 'Status', render: (row: any) => (row.completed ? 'Complete' : 'Pending') },
] as const

export function DashboardModule() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['dashboard', 'todos'],
    queryFn: async () => {
      const response = await api.get('/todos?_limit=6')
      return response.data
    },
  })

  return (
    <section className={`${appTheme.shell} space-y-6`}>
      <div>
        <p className={`text-sm font-semibold uppercase tracking-[0.27em] ${appTheme.accent}`}>
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Live operational metrics</h1>
        <p className={`mt-2 max-w-2xl text-sm ${appTheme.muted}`}>
          TanStack Query powers live API state for the dashboard module.
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300">Loading data...</div>
      ) : (
        <Table caption="Recent items" columns={columns} data={data} />
      )}
    </section>
  )
}
