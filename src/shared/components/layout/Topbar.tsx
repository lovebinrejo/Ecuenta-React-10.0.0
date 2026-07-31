import { Link } from 'react-router-dom'

export function Topbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-400">Welcome back, senior developer.</p>
          <h2 className="text-xl font-semibold text-white">Enterprise dashboard</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link className="rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-sm text-slate-200 hover:border-cyan-500 hover:text-white" to="/settings">
            Account settings
          </Link>
          <span className="rounded-full bg-slate-800/90 px-3 py-2 text-sm text-slate-300">Team alpha</span>
        </div>
      </div>
    </header>
  )
}
