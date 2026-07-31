import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/axios'
import { Button } from '../../components/ui/Button'
import { Table } from '../../components/ui/Table'
import { appTheme } from '../../themes/theme'

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'username', header: 'Username' },
] as const

export function UsersModule() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['users', 'all'],
    queryFn: async () => {
      const response = await api.get('/users')
      return response.data
    },
  })

  return (
    <section className={`${appTheme.shell} space-y-6`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={`text-sm font-semibold uppercase tracking-[0.27em] ${appTheme.accent}`}>Users</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Team members</h1>
          <p className={`mt-2 text-sm ${appTheme.muted}`}>View and manage employees with reusable list patterns.</p>
        </div>
        <Button variant="secondary">Invite user</Button>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300">Loading users...</div>
      ) : (
        <Table caption="Active users" columns={columns} data={data} />
      )}
    </section>
  )
}
