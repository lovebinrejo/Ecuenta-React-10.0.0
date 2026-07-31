import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/users', label: 'Users' },
  { path: '/reports', label: 'Reports' },
  { path: '/settings', label: 'Settings' },
]

export function Sidebar() {
  return (
    <aside className="border-r border-slate-800 bg-slate-950/95 px-4 py-8 text-slate-300 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08)] sm:px-6">
      <div className="mb-10 px-2 text-slate-50">
        <p className="mb-1 text-xs uppercase tracking-[0.27em] text-cyan-400">Enterprise UI</p>
        <h1 className="text-2xl font-semibold">React Hub</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
