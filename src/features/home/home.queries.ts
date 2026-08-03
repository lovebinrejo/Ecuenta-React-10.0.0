export interface StatWithTrend {
  value: number
  lastYear: number
  percent: number
  up: boolean
}

interface BreakdownStat {
  draft_count: number
  validated_count: number
  total_amount: number
  paid_amount: number
}

export interface DashboardSummary {
  today: {
    invoices_count: number
    sales_amount: number
    purchases_count: number
    purchases_amount: number
  }
  zra: {
    signedInvoices: StatWithTrend
    totalSale: StatWithTrend
    totalTax: StatWithTrend
  }
  banks: Array<{ id: string | number; label: string; balance: number }>
  salesBreakdown: BreakdownStat
  purchaseBreakdown: BreakdownStat
  monthly: Array<{ ym: string; income: number; sales_count: number; customers: number }>
  months: string[]
  period: { dateStart: string }
  legacyCounts: {
    salesOrders: StatWithTrend
    contracts: StatWithTrend
    shipments: StatWithTrend
    quotationsCount: number
  }
  recentSales: Array<{
    id: string | number
    ref: string | null
    datef: string | null
    company_name: string
    total_ttc: number
    fk_statut: 0 | 1 | 2 | 3
  }>
  salesByCurrency: Array<{ currency: string; total: number }>
}

const zeroStat = (): StatWithTrend => ({ value: 0, lastYear: 0, percent: 0, up: true })

function buildMonths(dateStart: string): string[] {
  const [y, m] = dateStart.split('-').map(Number)
  return Array.from({ length: 12 }, (_, i) => {
    const idx = m - 1 + i
    const year = y + Math.floor(idx / 12)
    const month = (idx % 12) + 1
    return `${year}-${String(month).padStart(2, '0')}`
  })
}

const dateStart = `${new Date().getFullYear()}-01-01`

const STUB_SUMMARY: DashboardSummary = {
  today: { invoices_count: 0, sales_amount: 0, purchases_count: 0, purchases_amount: 0 },
  zra: { signedInvoices: zeroStat(), totalSale: zeroStat(), totalTax: zeroStat() },
  banks: [],
  salesBreakdown: { draft_count: 0, validated_count: 0, total_amount: 0, paid_amount: 0 },
  purchaseBreakdown: { draft_count: 0, validated_count: 0, total_amount: 0, paid_amount: 0 },
  monthly: [],
  months: buildMonths(dateStart),
  period: { dateStart },
  legacyCounts: { salesOrders: zeroStat(), contracts: zeroStat(), shipments: zeroStat(), quotationsCount: 0 },
  recentSales: [],
  salesByCurrency: [],
}

// Stubbed: the real version calls GET /api/dashboard/summary/ on this app's
// backend (see dashboard.service.js). This project has no backend of its
// own, so it always reports the same all-zero/empty summary — HomeOverview's
// own empty states ("No bank accounts yet.", "No sales yet.") carry the UI
// rather than any invented numbers.
export function useDashboardSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
