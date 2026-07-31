import { NavLink } from 'react-router-dom'
import logoMark from '../../../assets/log3.png'

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/users', label: 'Users' },
  { path: '/reports', label: 'Reports' },
  { path: '/settings', label: 'Settings' },
]

export function Sidebar() {
  return (
    <aside className="border-r border-slate-800 bg-slate-950/95 px-4 py-8 text-slate-300 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08)] sm:px-6">
      <div className="mb-10 flex items-center gap-2.5 px-2">
        <img src={logoMark} alt="" className="h-9 w-9 shrink-0" />
        <div className="leading-tight">
          <h1 className="text-xl font-bold tracking-tight text-slate-50">ECUENTA</h1>
          <p className="whitespace-nowrap text-[8px] font-semibold tracking-[0.1em] text-cyan-400">FINANCIAL ACCOUNTING CRM</p>
        </div>
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
