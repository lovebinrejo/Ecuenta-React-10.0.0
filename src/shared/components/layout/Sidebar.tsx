import { useState } from 'react'
import { useNavigate, useLocation, type NavigateFunction, type Location } from 'react-router-dom'
import { UsersRound, Receipt, Archive, MessageCircle, Plus, ChevronDown } from 'lucide-react'
import logoIcon from '../../../assets/log3.png'
import logoFull from '../../../assets/login-logo.png'
import { nav as homeNav } from '../../../features/home/home.nav'
import { nav as zraNav } from '../../../features/zra/zra.nav'
import { nav as billingNav } from '../../../features/billing/billing.nav'
import { nav as purchasesNav } from '../../../features/purchases/purchases.nav'
import { nav as productsNav } from '../../../features/products/products.nav'
import { nav as warehousesNav } from '../../../features/warehouses/warehouses.nav'
import { nav as projectsNav } from '../../../features/projects/projects.nav'
import { nav as bankingNav } from '../../../features/banking/banking.nav'
import { nav as loansNav } from '../../../features/loans/loans.nav'
import { nav as usersNav } from '../../../features/users/users.nav'
import { nav as payrollNav } from '../../../features/payroll/payroll.nav'
import { nav as kitchenNav } from '../../../features/kitchen/kitchen.nav'
import { nav as fixedAssetNav } from '../../../features/fixedAsset/fixedAsset.nav'
import { nav as generalLedgerNav } from '../../../features/generalLedger/generalLedger.nav'
import { nav as ticketNav } from '../../../features/ticket/ticket.nav'
import { nav as settingsNav } from '../../../features/settings/settings.nav'
import { nav as reportsNav } from '../../../features/reports/reports.nav'
import type { NavLeafItem, NavSection } from '../../../features/navTypes'

// Kept as one pair so the rail's width and the collapsed flyout's left-offset
// (which must butt up against the rail) can never drift out of sync.
const RAIL_WIDTH_CLASS = 'w-28'
const RAIL_WIDTH_OFFSET_CLASS = 'left-28'

// Rail icon -> flyout panel of section items, in the exact order and with
// the exact content of the real app's left menu (read from its llx_menu
// table). Sections confirmed genuinely empty there (Expenses, Budget,
// Members, Chat) are kept empty here too, rather than guessed at.
const SECTIONS: NavSection[] = [
  homeNav,
  zraNav,
  billingNav,
  purchasesNav,
  productsNav,
  warehousesNav,
  projectsNav,
  bankingNav,
  loansNav,
  usersNav,
  payrollNav,
  { key: 'expenses', label: 'Expenses', icon: Receipt, items: [] },
  { key: 'budget', label: 'Budget', icon: Archive, items: [] },
  kitchenNav,
  fixedAssetNav,
  generalLedgerNav,
  ticketNav,
  settingsNav,
  { key: 'members', label: 'Members', icon: UsersRound, items: [] },
  reportsNav,
  { key: 'chat', label: 'Chat', icon: MessageCircle, items: [] },
]

// "Soft view": leaf items get a gentler, slower hover than a flat bg-swap —
// a soft tint + a barely-there rightward nudge + soft shadow, eased over a
// longer duration so the flyout feels calm rather than snappy.
function SidebarItem({
  item,
  indent = false,
  navigate,
  location,
}: {
  item: NavLeafItem
  indent?: boolean
  navigate: NavigateFunction
  location: Location
}) {
  const isLink = Boolean(item.path)
  const isCurrent = isLink && location.pathname === item.path
  return (
    <button
      type="button"
      disabled={!isLink}
      onClick={isLink ? () => navigate(item.path!) : undefined}
      className={`w-full flex items-center gap-2 text-left px-2 py-1 rounded-lg text-sm transition-all duration-300 ease-out ${indent ? 'pl-4' : ''} ${
        isCurrent
          ? 'bg-brand/10 text-brand font-semibold shadow-sm'
          : isLink
            ? 'text-text-muted hover:bg-surface-alt/70 hover:text-text hover:translate-x-0.5 hover:shadow-sm cursor-pointer'
            : 'text-text-faint cursor-default'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${isCurrent ? 'bg-brand' : 'bg-transparent'}`} />
      {item.label}
    </button>
  )
}

export function Sidebar({ open = true }: { open?: boolean }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeKey, setActiveKey] = useState('home')
  const [hovering, setHovering] = useState(false)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => new Set())
  const active = SECTIONS.find((s) => s.key === activeKey) ?? SECTIONS[0]

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupKey)) next.delete(groupKey)
      else next.add(groupKey)
      return next
    })
  }

  // Pinned-open (`open` prop, toggled by Navbar's collapse button) keeps the
  // flyout in normal flex flow, pushing <main> over. When collapsed,
  // hovering the rail temporarily reveals the same flyout as a floating
  // overlay instead (so it doesn't reflow page content on every hover), and
  // hides it again on mouse-leave — the "expand and shrink on hover" behavior.
  const expanded = open || hovering

  return (
    <div className="relative flex h-full shrink-0" onMouseEnter={() => !open && setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <aside className={`${RAIL_WIDTH_CLASS} bg-rail-bg h-full overflow-hidden flex flex-col items-center border-r border-black/10 dark:border-white/10`}>
        <div className="flex flex-col items-center gap-0.5 pt-6 pb-6">
        <span className={`mb-2 flex h-10 items-center justify-center ${open ? 'w-full px-2' : 'w-10'}`}>
          <img
            src={open ? logoFull : logoIcon}
            alt={open ? 'ECUENTA - Financial Accounting CRM' : 'ECUENTA'}
            className={open ? 'max-h-full w-full object-contain' : 'h-full w-full object-contain'}
          />
        </span>
        {SECTIONS.map((section) => {
          const Icon = section.icon
          const isActive = section.key === activeKey
          return (
            <button
              key={section.key}
              type="button"
              title={section.label}
              onClick={() => setActiveKey(section.key)}
              className={`group/rail relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-brand text-white shadow-sm shadow-brand/40'
                  : 'text-text-muted hover:bg-surface hover:text-(--color-accent-teal-2) hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--color-accent-teal-2),0_0_12px_var(--color-accent-teal-2),0_0_18px_var(--color-accent-cyan-2)]'
              }`}
            >
              <Icon
                size={18}
                className={isActive ? '[filter:drop-shadow(0_0_6px_var(--color-accent-teal-2))_drop-shadow(0_0_10px_var(--color-accent-cyan-2))]' : ''}
              />
            </button>
          )
        })}
        </div>
      </aside>

      <div
        className={`h-full bg-surface dark:bg-rail-bg border-r border-border overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'relative w-52' : `absolute ${RAIL_WIDTH_OFFSET_CLASS} top-0 z-30 shadow-xl ${expanded ? 'w-52' : 'w-0'}`
        }`}
        onMouseEnter={() => !open && setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="soft-scrollbar w-52 h-full overflow-y-auto overflow-x-hidden pt-9 pb-4 px-3">
          <div className="flex items-center justify-between mb-2 mt-6 px-1 pb-2 border-b border-border">
            <span className="text-xs font-bold tracking-wide text-brand uppercase">{active.label}</span>
            <button type="button" title={`Add to ${active.label}`} className="p-1 rounded-md text-brand hover:bg-surface-alt">
              <Plus size={14} />
            </button>
          </div>
          <div className="space-y-0">
            {active.items.length === 0 && <p className="text-xs italic text-text-muted px-2 py-1">Nothing here yet.</p>}
            {active.items.map((item) => {
              if (!('items' in item) || !item.items) {
                return <SidebarItem key={item.label} item={item} navigate={navigate} location={location} />
              }
              const groupKey = `${activeKey}:${item.label}`
              const isCollapsed = collapsedGroups.has(groupKey)
              return (
                <div key={item.label} className="pt-0.5 first:pt-0">
                  <button
                    type="button"
                    onClick={() => toggleGroup(groupKey)}
                    className="w-full flex items-center justify-between px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide text-text-muted hover:bg-surface-alt/70"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={13}
                      strokeWidth={2.5}
                      className={`shrink-0 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
                    />
                  </button>
                  {!isCollapsed && (
                    <div>
                      {item.items.map((sub) => (
                        <SidebarItem key={sub.label} item={sub} indent navigate={navigate} location={location} />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
