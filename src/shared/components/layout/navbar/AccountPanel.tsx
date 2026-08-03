import { useEffect, useState } from 'react'
import { X, User, LogOut, FileText, MessageSquareText, BadgeCheck, Mail, Phone, ChevronRight } from 'lucide-react'
import { useConsts } from '../../../../features/settings/settings.queries'
import type { AuthUser } from '../../../../features/auth/AuthContext'

const CURRENCY_NAMES: Record<string, string> = { ZMW: 'Zambian Kwacha', USD: 'US Dollar', INR: 'Indian Rupee', GBP: 'British Pound', EUR: 'Euro' }

const CONST_NAMES = ['MAIN_INFO_SOCIETE_NOM', 'MAIN_INFO_SIREN', 'ZRA_Branch_code', 'MAIN_INFO_SOCIETE_COUNTRY', 'MAIN_MONNAIE']

function parseCountryLabel(value?: string) {
  if (!value) return '-'
  const parts = value.split(':')
  return parts[parts.length - 1] || value
}

function initialsOf(name: string) {
  const parts = (name || '').split(/[^a-zA-Z0-9]+/).filter(Boolean)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || '?'
}

// Ports the legacy Navbar avatar dropdown's rich "My Account" panel.
// Company/TPIN/Branch Code/Country/Currency read from useConsts (stubbed in
// this project — see settings.queries.ts). TimeZone is hardcoded "UTC" and
// Switch Entity offers only "Master entity", matching the source app's own
// no-per-user-timezone / no-multi-entity-data convention.
export function AccountPanel({ user, onClose, onLogout }: { user: AuthUser | null; onClose: () => void; onLogout: () => void }) {
  const { data: consts } = useConsts(CONST_NAMES)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const displayName = [user?.firstname, user?.lastname].filter(Boolean).join(' ') || user?.login || 'User'
  const companyName = consts?.MAIN_INFO_SOCIETE_NOM || '-'
  const tpin = consts?.MAIN_INFO_SIREN || '-'
  const branchCode = consts?.ZRA_Branch_code || ''
  const country = parseCountryLabel(consts?.MAIN_INFO_SOCIETE_COUNTRY)
  const currencyCode = consts?.MAIN_MONNAIE || 'ZMW'
  const currencyLabel = `${CURRENCY_NAMES[currencyCode] ?? currencyCode} (${currencyCode})`
  const timeLabel = now.toLocaleTimeString('en-ZM', { hour: 'numeric', minute: '2-digit', second: '2-digit' })

  return (
    <div className="absolute right-0 mt-1 w-96 max-h-[calc(100vh-4rem)] overflow-y-auto soft-scrollbar bg-surface border border-border rounded-lg shadow-xl z-30">
      <div className="flex items-start justify-between gap-2 p-4 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-11 h-11 rounded-lg bg-teal-500 text-white text-base font-semibold flex items-center justify-center shrink-0">{initialsOf(displayName)}</span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-text truncate">{displayName}</div>
            <div className="text-xs text-text-faint truncate">({user?.login})</div>
          </div>
        </div>
        <button type="button" onClick={onClose} title="Close" className="p-1 rounded-md text-danger hover:bg-surface-alt shrink-0">
          <X size={16} />
        </button>
      </div>

      <div className="px-4 py-2 border-b border-border flex items-center gap-4">
        <button type="button" className="flex items-center gap-1.5 text-sm text-brand hover:underline py-1.5">
          <User size={14} />
          My Account
        </button>
        <button type="button" onClick={onLogout} className="flex items-center gap-1.5 text-sm text-danger hover:underline py-1.5">
          <LogOut size={14} />
          Logout
        </button>
      </div>

      <div className="px-4 py-3 border-b border-border">
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
          <dt className="text-text-muted">Company</dt>
          <dd className="text-right text-brand font-medium">{companyName}</dd>
          <dt className="text-text-muted">TPIN</dt>
          <dd className="text-right text-text">{tpin}</dd>
          <dt className="text-text-muted">Branch Code</dt>
          <dd className="text-right text-text">{branchCode}</dd>
          <dt className="text-text-muted">Country</dt>
          <dd className="text-right text-text">{country}</dd>
          <dt className="text-text-muted">Currency</dt>
          <dd className="text-right text-text">{currencyLabel}</dd>
          <dt className="text-text-muted">TimeZone</dt>
          <dd className="text-right text-text">UTC</dd>
          <dt className="text-text-muted">{Intl.DateTimeFormat().resolvedOptions().timeZone}</dt>
          <dd className="text-right text-text tabular-nums">{timeLabel}</dd>
        </dl>
      </div>

      <div className="px-4 py-3 border-b border-border">
        <label className="block text-xs font-semibold uppercase tracking-wide text-text-faint mb-1">Switch Entity</label>
        <select className="w-full h-9 px-3 rounded-md border border-input-border bg-blue-50 dark:bg-blue-950 text-text text-sm outline-none focus:ring-2 focus:ring-brand/30" disabled>
          <option>Master entity</option>
        </select>
      </div>

      <div className="px-4 py-3 border-b border-border grid grid-cols-3 gap-2 text-center">
        {[
          { icon: FileText, label: 'User Guide' },
          { icon: MessageSquareText, label: 'FAQs' },
          { icon: BadgeCheck, label: 'License Info' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 py-2 rounded-md text-text cursor-default">
            <Icon size={26} strokeWidth={2} />
            <span className="text-xs font-medium">{label}</span>
          </div>
        ))}
      </div>

      <div className="px-4 py-3">
        <div className="text-sm font-semibold text-text mb-2">Need Assistance?</div>
        <div className="flex items-center justify-between text-sm text-brand py-1">
          <span className="flex items-center gap-2">
            <Mail size={14} />
            Send an email
          </span>
          <ChevronRight size={14} />
        </div>
        <div className="flex items-start gap-2 text-sm text-text-muted py-1">
          <Phone size={14} className="mt-0.5 shrink-0" />
          <span>
            Talk to us (Mon - Fri · 9:00 AM - 7:00 PM · Toll Free)
            <br />
            Zambia - <span className="text-brand">+260-764 864 419</span>, <span className="text-brand">+260-972094734</span>
          </span>
        </div>
      </div>
    </div>
  )
}
