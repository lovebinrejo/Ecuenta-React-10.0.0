import { useState, type ReactNode, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/log2.png'

/* ---------------------------------- icons --------------------------------- */

function IconUser({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round" />
    </svg>
  )
}

function IconKey({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <circle cx="7" cy="14" r="3.2" />
      <path d="M9.3 11.8 18 3.1M15.4 5.7l2 2M13 8.1l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconBuilding({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="4.5" y="4" width="10" height="16" rx="1" />
      <path d="M8.5 8h2M8.5 11h2M8.5 14h2" strokeLinecap="round" />
      <path d="M14.5 9.5h5V20h-5" strokeLinejoin="round" />
    </svg>
  )
}

function IconChartBar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
      <path d="M4 19V10M10 19V5M16 19v-6M20 19V9" strokeLinecap="round" />
    </svg>
  )
}

function IconBot() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 8V4.5" strokeLinecap="round" />
      <circle cx="12" cy="3.4" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9.2" cy="13.2" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="13.2" r="1.15" fill="currentColor" stroke="none" />
      <path d="M9 17h6" strokeLinecap="round" />
      <path d="M2.5 12.5h2.5M19 12.5h2.5" strokeLinecap="round" />
    </svg>
  )
}

function IconBank() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
      <path d="M3 9.5 12 4l9 5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 9.5v9M9 9.5v9M15 9.5v9M19.5 9.5v9" strokeLinecap="round" />
      <path d="M3 19.5h18" strokeLinecap="round" />
    </svg>
  )
}

function IconGear() {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
      <circle cx="12" cy="12" r="5.4" />
      <circle cx="12" cy="12" r="2.1" />
      {teeth.map((deg) => (
        <rect key={deg} x="10.9" y="0.9" width="2.2" height="3" rx="0.6" transform={`rotate(${deg} 12 12)`} fill="currentColor" stroke="none" />
      ))}
    </svg>
  )
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
      <path d="M4 5.5h16v10H10l-4.2 3.4v-3.4H4z" strokeLinejoin="round" />
      <path d="M8 10h8M8 13h5" strokeLinecap="round" />
    </svg>
  )
}

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
      <path d="M4 11 12 4l8 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9h12v-9" strokeLinejoin="round" />
      <path d="M10 19v-5h4v5" strokeLinejoin="round" />
    </svg>
  )
}

function IconBox() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
      <path d="M3.5 8 12 4l8.5 4-8.5 4-8.5-4Z" strokeLinejoin="round" />
      <path d="M3.5 8v8L12 20l8.5-4V8" strokeLinejoin="round" />
      <path d="M12 12v8" />
    </svg>
  )
}

function IconCrm() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
      <circle cx="12" cy="8.3" r="3" />
      <path d="M6 19c0-3.5 2.7-6 6-6s6 2.5 6 6" strokeLinecap="round" />
    </svg>
  )
}

/* --------------------------------- artwork --------------------------------- */

const RING_ITEMS: { icon: ReactNode; label: string; top: string; left: string; gradient: string }[] = [
  { icon: <IconChartBar />, label: 'Analytics', top: '4%', left: '50%', gradient: 'radial-gradient(circle at 32% 28%, #fef3c7 0%, #f59e0b 45%, #b45309 80%, #78350f 100%)' },
  { icon: <IconBot />, label: 'Automation', top: '18%', left: '83%', gradient: 'radial-gradient(circle at 32% 28%, #e9d5b8 0%, #a9743f 45%, #7c4a21 80%, #4a2a10 100%)' },
  { icon: <IconBank />, label: 'Banking', top: '50%', left: '96%', gradient: 'radial-gradient(circle at 32% 28%, #fecaca 0%, #dc2626 45%, #991b1b 80%, #601818 100%)' },
  { icon: <IconGear />, label: 'Operations', top: '82%', left: '83%', gradient: 'radial-gradient(circle at 32% 28%, #e1decb 0%, #8a8a4f 45%, #5c5c30 80%, #34341a 100%)' },
  { icon: <IconChat />, label: 'Messaging', top: '96%', left: '50%', gradient: 'radial-gradient(circle at 32% 28%, #e9d5ff 0%, #8b5cf6 45%, #5b21b6 80%, #3b0f6b 100%)' },
  { icon: <IconHome />, label: 'Assets', top: '82%', left: '17%', gradient: 'radial-gradient(circle at 32% 28%, #b2f5ea 0%, #0d9488 45%, #0f5d54 80%, #0a3b35 100%)' },
  { icon: <IconBox />, label: 'Inventory', top: '50%', left: '4%', gradient: 'radial-gradient(circle at 32% 28%, #bbf7d0 0%, #16a34a 45%, #0f6b31 80%, #0a441f 100%)' },
  { icon: <IconCrm />, label: 'CRM', top: '18%', left: '17%', gradient: 'radial-gradient(circle at 32% 28%, #bfdbfe 0%, #2563eb 45%, #1e3a8a 80%, #0f1f4d 100%)' },
]

const NODE_COLORS = ['bg-sky-300', 'bg-emerald-300', 'bg-amber-300', 'bg-slate-300', 'bg-violet-300', 'bg-teal-300', 'bg-rose-300', 'bg-indigo-300']

function PalmLeaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      {[0, 22, 44, -22, -44].map((deg) => (
        <path
          key={deg}
          transform={`rotate(${deg} 0 100)`}
          d="M0,100 C10,60 30,35 65,20 C45,45 35,70 30,100 Z"
        />
      ))}
    </svg>
  )
}

function CircuitPattern({ className = '' }: { className?: string }) {
  const dots: [number, number][] = [
    [0, 40], [50, 40], [50, 80], [110, 80], [110, 30], [170, 30], [20, 100], [20, 170], [90, 130], [150, 130], [150, 170],
  ]
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <path d="M0 40h50M50 40v40M50 80h60M110 80v-50M110 30h60M20 100v70M20 100h40M90 130h60M150 130v40" strokeLinecap="round" />
      {dots.map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r={3} fill="currentColor" stroke="none" />
      ))}
    </svg>
  )
}

const RAY_ANGLES = [15, 75, 135, 195, 255, 315]

function ConstellationRing() {
  return (
    <div className="relative mx-auto aspect-square w-64 sm:w-72 lg:w-80">
      <PalmLeaf className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rotate-12 text-emerald-950/50 sm:h-36 sm:w-36" />
      <PalmLeaf className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 -rotate-12 -scale-x-100 text-emerald-950/50 sm:h-36 sm:w-36" />
      <div
        className="absolute inset-0 rounded-full opacity-80"
        style={{
          background: 'conic-gradient(from 200deg, #4338ca, #6d28d9, #c026d3 35%, #f59e0b 50%, #c026d3 65%, #4338ca 100%)',
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 16px), #000 calc(100% - 15px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 16px), #000 calc(100% - 15px))',
        }}
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {RAY_ANGLES.map((deg) => (
          <line
            key={deg}
            x1="50"
            y1="50"
            x2={50 + 34 * Math.cos((deg * Math.PI) / 180)}
            y2={50 + 34 * Math.sin((deg * Math.PI) / 180)}
            stroke="white"
            strokeOpacity={0.4}
            strokeWidth={0.5}
          />
        ))}
        {RING_ITEMS.map((item, index) => (
          <line
            key={index}
            x1="50"
            y1="50"
            x2={parseFloat(item.left)}
            y2={parseFloat(item.top)}
            stroke="white"
            strokeOpacity={0.25}
            strokeWidth={0.4}
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/50 blur-2xl sm:h-52 sm:w-52" />
      <div
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-32 sm:w-32"
        style={{
          background: 'radial-gradient(circle at 34% 28%, #ffffff 0%, #cffafe 22%, #22d3ee 55%, #0d9488 85%, #0f766e 100%)',
          boxShadow: '0 0 70px rgba(45,212,191,0.6), inset -10px -10px 22px rgba(0,0,0,0.28), inset 6px 6px 14px rgba(255,255,255,0.5)',
        }}
      />
      <div className="absolute left-[38%] top-[30%] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-md sm:h-10 sm:w-10" />

      {RING_ITEMS.map((item, index) => {
        const x = parseFloat(item.left)
        const y = parseFloat(item.top)
        const nodeLeft = 50 + (x - 50) * 0.72
        const nodeTop = 50 + (y - 50) * 0.72
        return (
          <div
            key={index}
            className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-md shadow ring-1 ring-white/50 sm:h-5 sm:w-5 ${NODE_COLORS[index % NODE_COLORS.length]}`}
            style={{ top: `${nodeTop}%`, left: `${nodeLeft}%` }}
          />
        )
      })}

      {RING_ITEMS.map((item, index) => (
        <div
          key={index}
          className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-[0_8px_16px_rgba(0,0,0,0.45)] ring-2 ring-white/40 sm:h-16 sm:w-16"
          style={{ top: item.top, left: item.left, background: item.gradient }}
          title={item.label}
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 45%)' }}
          />
          <span className="relative drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">{item.icon}</span>
        </div>
      ))}
    </div>
  )
}

/* ---------------------------------- form ---------------------------------- */

interface AuthInputProps {
  placeholder: string
  type?: string
  icon: ReactNode
  tone?: 'cream' | 'plain'
  value: string
  onChange: (value: string) => void
  name: string
}

function AuthInput({ placeholder, type = 'text', icon, tone = 'plain', value, onChange, name }: AuthInputProps) {
  const toneClass =
    tone === 'cream'
      ? 'border-amber-200 bg-amber-50 focus:border-amber-400 focus:ring-amber-200'
      : 'border-slate-200 bg-white focus:border-teal-400 focus:ring-teal-200'

  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border px-4 py-3 pr-11 text-sm text-slate-700 outline-none transition focus:ring-4 ${toneClass}`}
      />
      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
    </div>
  )
}

export function LoginModule() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [masterEntity, setMasterEntity] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-100 via-indigo-50 to-violet-200">
      <CircuitPattern className="absolute -left-6 -top-6 h-48 w-48 text-slate-400/30" />
      <CircuitPattern className="absolute -right-6 -top-6 h-48 w-48 -scale-x-100 text-slate-400/30" />
      <CircuitPattern className="absolute -left-6 -bottom-6 h-48 w-48 -scale-y-100 text-slate-400/30" />
      <CircuitPattern className="absolute -right-6 -bottom-6 h-48 w-48 -scale-x-100 -scale-y-100 text-slate-400/30" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="relative w-full max-w-4xl">
          <div className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 rotate-45 rounded-md bg-white shadow-md lg:hidden" />

          <div className="flex w-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:flex-row">
            {/* graphic panel */}
            <div className="relative order-1 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-900 to-purple-900 px-8 py-10 lg:order-2 lg:w-[57%] lg:py-12">
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <PalmLeaf className="absolute -left-6 -top-6 h-28 w-28 text-indigo-300/20" />
              <PalmLeaf className="absolute -right-6 -top-6 h-28 w-28 -scale-x-100 text-indigo-300/20" />
              <PalmLeaf className="absolute -bottom-6 -left-6 h-28 w-28 -scale-y-100 text-indigo-300/20" />
              <PalmLeaf className="absolute -bottom-6 -right-6 h-28 w-28 -scale-x-100 -scale-y-100 text-indigo-300/20" />
              <ConstellationRing />
            </div>

            {/* form panel */}
            <div className="order-2 flex flex-col justify-center px-8 py-8 sm:px-10 lg:order-1 lg:w-[43%] lg:py-10">
              <div className="mb-6">
                <img src={logo} alt="ECUENTA - Financial Accounting CRM" className="h-16 w-auto sm:h-20" />
              </div>

              <h1 className="mb-4 text-xl font-semibold text-slate-800">Sign In to your Account</h1>

              <form onSubmit={handleSubmit} className="space-y-3">
                <AuthInput
                  name="username"
                  placeholder="Vox_admina"
                  icon={<IconUser />}
                  tone="cream"
                  value={username}
                  onChange={setUsername}
                />
                <AuthInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  icon={<IconKey />}
                  tone="cream"
                  value={password}
                  onChange={setPassword}
                />
                <AuthInput
                  name="masterEntity"
                  placeholder="Master entity"
                  icon={<IconBuilding />}
                  value={masterEntity}
                  onChange={setMasterEntity}
                />

                <label className="flex items-center gap-2 text-sm text-slate-500">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-400"
                  />
                  Remember me
                </label>

                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-teal-600 to-blue-600 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-600/30 transition hover:from-teal-500 hover:to-blue-500"
                >
                  SIGN IN
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-slate-500">
                Not registered yet?{' '}
                <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
