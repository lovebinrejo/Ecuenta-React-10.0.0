import { type ComponentType, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Globe2,
  Plus,
  ListChecks,
  LogOut as CheckoutIcon,
  BedDouble,
  Building2,
  DoorOpen,
  Bookmark,
  UserCheck,
  CalendarRange,
  CalendarCheck,
  CalendarClock,
  LogIn,
  LogOut,
  Clock,
  History,
} from 'lucide-react'
import { Card } from '../../../shared/components/dashboard/DashboardKit'
import type { HotelSummary } from '../hotel.queries'

const ICON_COLORS = {
  blue: 'text-blue-500',
  green: 'text-emerald-500',
  amber: 'text-amber-500',
  rose: 'text-rose-500',
  cyan: 'text-cyan-500',
  violet: 'text-violet-500',
  orange: 'text-orange-500',
} as const

function StatLink({ to, children }: { to?: string; children: ReactNode }) {
  if (!to) return <span className="flex items-center gap-1 text-text-faint cursor-default">{children}</span>
  return (
    <Link to={to} className="flex items-center gap-1 text-brand hover:underline">
      {children}
    </Link>
  )
}

function RoomStatCard({
  label,
  value,
  icon: Icon,
  color,
  showLinks = true,
}: {
  label: string
  value: number
  icon: ComponentType<{ size?: number; className?: string }>
  color: keyof typeof ICON_COLORS
  showLinks?: boolean
}) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-text!">{value}</span>
        <Icon size={26} className={ICON_COLORS[color]} />
      </div>
      <p className="text-sm text-text-muted">{label}</p>
      {showLinks && (
        <div className="flex items-center gap-3 text-xs">
          <StatLink>List</StatLink>
          <StatLink>+ Create</StatLink>
        </div>
      )}
    </Card>
  )
}

function HeaderActionButton({ icon: Icon, label, tone }: { icon: ComponentType<{ size?: number }>; label: string; tone: 'blue' | 'plain' | 'cyan' | 'green' }) {
  const toneClasses = {
    blue: 'bg-blue-500 text-white',
    plain: 'bg-surface-alt border border-border text-text',
    cyan: 'bg-cyan-500 text-white',
    green: 'bg-emerald-500 text-white',
  } as const
  return (
    <button type="button" disabled title="Not built yet" className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium opacity-90 cursor-default ${toneClasses[tone]}`}>
      <Icon size={14} /> {label}
    </button>
  )
}

export function HotelOverview({ summary }: { summary: HotelSummary }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-text!">
          <Globe2 size={20} className="text-brand" /> Booking Dashboard
        </h2>
        <div className="flex flex-wrap gap-2">
          <HeaderActionButton icon={Plus} label="New Booking" tone="blue" />
          <HeaderActionButton icon={ListChecks} label="List" tone="plain" />
          <HeaderActionButton icon={CheckoutIcon} label="Checkout" tone="cyan" />
          <HeaderActionButton icon={BedDouble} label="Rooms" tone="green" />
        </div>
      </div>

      <h3 className="flex items-center gap-2 font-semibold text-text-muted">
        <BedDouble size={16} /> Room Status Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <RoomStatCard label="Total Rooms" value={summary.totalRooms} icon={Building2} color="blue" />
        <RoomStatCard label="Available Rooms" value={summary.availableRooms} icon={DoorOpen} color="green" />
        <RoomStatCard label="Booked Rooms" value={summary.bookedRooms} icon={Bookmark} color="amber" />
        <RoomStatCard label="Checked-in Rooms" value={summary.checkedInRooms} icon={UserCheck} color="rose" />
      </div>

      <h3 className="flex items-center gap-2 font-semibold text-text-muted">
        <CalendarRange size={16} /> Booking Statistics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <RoomStatCard label="Total Bookings" value={summary.totalBookings} icon={CalendarCheck} color="blue" showLinks={false} />
        <RoomStatCard label="Today's Bookings" value={summary.todaysBookings} icon={CalendarClock} color="cyan" showLinks={false} />
        <RoomStatCard label="Today's Check-ins" value={summary.todaysCheckIns} icon={LogIn} color="green" showLinks={false} />
        <RoomStatCard label="Today's Check-outs" value={summary.todaysCheckOuts} icon={LogOut} color="violet" showLinks={false} />
        <RoomStatCard label="Pending Bookings" value={summary.pendingBookings} icon={Clock} color="orange" showLinks={false} />
      </div>

      <h3 className="flex items-center gap-2 font-semibold text-text!">
        <History size={16} className="text-brand" /> Recent Bookings
      </h3>
      <Card className="!p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold text-text uppercase tracking-wide border-b border-border bg-surface">
              <th className="px-4 py-3">Booking #</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Check-In</th>
              <th className="px-4 py-3">Check-Out</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {summary.recentBookings.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-center text-text-faint italic" colSpan={6}>
                  No Bookings Found
                </td>
              </tr>
            ) : (
              summary.recentBookings.map((b) => (
                <tr key={b.bookingRef} className="border-t border-border">
                  <td className="px-4 py-3 text-brand">{b.bookingRef}</td>
                  <td className="px-4 py-3 text-text!">{b.customer}</td>
                  <td className="px-4 py-3 text-text-muted">{b.checkIn}</td>
                  <td className="px-4 py-3 text-text-muted">{b.checkOut}</td>
                  <td className="px-4 py-3 text-text-muted">{b.status}</td>
                  <td className="px-4 py-3 text-text-faint">-</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-end p-3 border-t border-border">
          <button type="button" disabled title="Not built yet" className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-sm text-white opacity-80 cursor-default">
            View All Bookings →
          </button>
        </div>
      </Card>
    </div>
  )
}
