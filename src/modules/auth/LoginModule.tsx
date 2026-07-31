import { useState, type ReactNode, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/login-logo.png'
import loginArt from '../../assets/login-graphic.png'

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

function IconLock({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" strokeLinecap="round" />
    </svg>
  )
}

/* --------------------------------- artwork --------------------------------- */

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
            <div className="relative order-1 overflow-hidden lg:order-2 lg:w-[57%]">
              <img src={loginArt} alt="" className="h-64 w-full object-cover lg:h-full" />
            </div>

            {/* form panel */}
            <div className="order-2 flex flex-col justify-center px-8 py-8 sm:px-10 lg:order-1 lg:w-[43%] lg:py-10">
              <div className="mb-6">
                <img src={logo} alt="ECUENTA - Financial Accounting CRM" className="h-16 w-auto sm:h-20 lg:h-24" />
              </div>

              <h1 className="mb-4 text-xl font-semibold text-slate-800">Sign In to your Account</h1>

              <form onSubmit={handleSubmit} className="space-y-3">
                <AuthInput
                  name="username"
                  placeholder="Vox_admina"
                  icon={<IconUser />}
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
                  icon={<IconLock />}
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
