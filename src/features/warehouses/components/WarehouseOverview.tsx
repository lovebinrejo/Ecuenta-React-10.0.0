import { type ComponentType, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Warehouse,
  BarChart2,
  Package,
  Boxes,
  Banknote,
  AlertTriangle,
  BatteryLow,
  ArrowLeftRight,
  Zap,
  ClipboardList,
  Truck,
  PackageCheck,
  Shuffle,
  ListChecks,
  Bookmark,
  CheckCircle2,
  CheckCheck,
  ShoppingCart,
  FilePenLine,
  PackagePlus,
} from 'lucide-react'
import { ROUTES } from '../../../routes'
import { Card, SectionHeading, ICON_STYLES, ActionGroupCard, type IconColor } from '../../../shared/components/dashboard/DashboardKit'
import { formatMoney } from '../../../utils/format'
import type { WarehouseSummary } from '../warehouses.queries'

function MetricCard({
  label,
  value,
  caption,
  icon: Icon,
  color,
  listPath,
  newPath,
}: {
  label: string
  value: string | number
  caption?: string
  icon: ComponentType<{ size?: number }>
  color: IconColor
  listPath?: string
  newPath?: string
}) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="text-2xl font-bold text-text! mt-1">{value}</p>
          {caption && <p className="text-xs text-text-faint mt-0.5">{caption}</p>}
        </div>
        <span className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${ICON_STYLES[color]}`}>
          <Icon size={20} />
        </span>
      </div>
      {(listPath || newPath) && (
        <div className="flex items-center gap-3 text-xs">
          {listPath ? (
            <Link to={listPath} className="text-brand hover:underline">
              List
            </Link>
          ) : (
            <span className="text-text-faint cursor-default">List</span>
          )}
          {newPath ? (
            <Link to={newPath} className="text-brand hover:underline">
              + New
            </Link>
          ) : (
            <span className="text-text-faint cursor-default">+ New</span>
          )}
        </div>
      )}
    </Card>
  )
}

function ReservationCard({ label, value, icon: Icon, color, links }: { label: string; value: number; icon: ComponentType<{ size?: number }>; color: IconColor; links?: ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="text-2xl font-bold text-text! mt-1">{value}</p>
        </div>
        <span className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${ICON_STYLES[color]}`}>
          <Icon size={20} />
        </span>
      </div>
      {links}
    </Card>
  )
}

export function WarehouseOverview({ summary }: { summary: WarehouseSummary }) {
  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-bold text-text!">
        <Warehouse size={20} className="text-brand" /> Warehouses area
      </h2>

      <SectionHeading icon={BarChart2}>Statistics</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Total Products In Stock" value={summary.totalProductsInStock} icon={Package} color="blue" />
        <MetricCard label="Total Stock Quantity" value={summary.totalStockQuantity} icon={Boxes} color="indigo" />
        <MetricCard label="Total Stock Value" value={formatMoney(summary.totalStockValue)} icon={Banknote} color="cyan" />
        <MetricCard
          label="Warehouses"
          value={`${summary.warehousesActive} / ${summary.warehousesTotal}`}
          caption="Active / Total"
          icon={Warehouse}
          color="green"
          listPath={ROUTES.warehouseDashboard}
          newPath={ROUTES.warehouseDashboard}
        />

        <MetricCard label="Products Out of Stock" value={summary.productsOutOfStock} icon={AlertTriangle} color="rose" />
        <MetricCard label="Products Low Stock" value={summary.productsLowStock} icon={BatteryLow} color="cyan" />
        <MetricCard label="Movements Today" value={summary.movementsToday} caption="View All Movements" icon={ArrowLeftRight} color="violet" />
        <ActionGroupCard
          icon={Zap}
          title="Quick Actions"
          actions={[
            { icon: ShoppingCart, label: 'Replenishment' },
            { icon: FilePenLine, label: 'Stock correction' },
            { icon: PackagePlus, label: 'New inventory' },
          ]}
        />

        <MetricCard label="Inventories" value={summary.inventories} icon={ClipboardList} color="rose" />
        <MetricCard label="Shipments" value={summary.shipments.total} caption={`${summary.shipments.validated} Validated`} icon={Truck} color="blue" />
        <MetricCard label="Receptions" value={summary.receptions.total} caption={`${summary.receptions.validated} Validated`} icon={PackageCheck} color="blue" />
        <ActionGroupCard
          icon={Shuffle}
          title="Stock Transfer & Reports"
          actions={[
            { icon: Shuffle, label: 'Mass Transfer' },
            { icon: ListChecks, label: 'Movement Report' },
            { icon: BarChart2, label: 'Statistics' },
          ]}
        />
      </div>

      <SectionHeading icon={Bookmark}>Stock Reservations</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ReservationCard label="Active Reservations" value={summary.reservations.active} icon={Bookmark} color="amber" />
        <ReservationCard label="Total Reserved Qty" value={summary.reservations.totalReservedQty} icon={Boxes} color="violet" />
        <ReservationCard label="Released" value={summary.reservations.released} icon={CheckCircle2} color="green" />
        <ReservationCard
          label="Consumed"
          value={summary.reservations.consumed}
          icon={CheckCheck}
          color="green"
          links={
            <div className="flex items-center gap-3 text-xs">
              <span className="text-text-faint cursor-default">View All</span>
              <span className="text-text-faint cursor-default">Configure</span>
            </div>
          }
        />
      </div>
    </div>
  )
}
