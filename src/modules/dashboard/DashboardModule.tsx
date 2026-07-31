import { appTheme } from '../../themes/theme'

export function DashboardModule() {
  return (
    <section className={`${appTheme.shell} space-y-6`}>
      <div>
        <p className={`text-sm font-semibold uppercase tracking-[0.27em] ${appTheme.accent}`}>
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Dashboard</h1>
      </div>
    </section>
  )
}
