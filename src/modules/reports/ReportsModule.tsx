import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/axios'
import { appTheme } from '../../themes/theme'

export function ReportsModule() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['reports', 'posts'],
    queryFn: async () => {
      const response = await api.get('/posts?_limit=5')
      return response.data
    },
  })

  return (
    <section className={`${appTheme.shell} space-y-6`}>
      <div>
        <p className={`text-sm font-semibold uppercase tracking-[0.27em] ${appTheme.accent}`}>Reports</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Operational reports</h1>
        <p className={`mt-2 text-sm ${appTheme.muted}`}>Report data is fetched through the shared TanStack Query client.</p>
      </div>
      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300">Loading reports...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {data.map((item: any) => (
            <article key={item.id} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-slate-300 line-clamp-4">{item.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
