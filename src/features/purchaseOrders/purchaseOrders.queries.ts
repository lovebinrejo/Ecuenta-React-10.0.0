export interface PurchaseOrderRow {
  ref: string
  refOrderVendor: string
  requestAuthor: string
  thirdParty: string
  city: string
  zipCode: string
  orderDate: string
  plannedDelivery: string
  amountExclTax: number
  status: string
  billed: boolean
}

export interface PurchaseOrdersSummary {
  totalOrders: number
  ordersThisMonth: number
  totalPurchaseAmount: number
  approvedCount: number
  pendingCount: number
  orders: PurchaseOrderRow[]
}

const STUB_SUMMARY: PurchaseOrdersSummary = {
  totalOrders: 0,
  ordersThisMonth: 0,
  totalPurchaseAmount: 0,
  approvedCount: 0,
  pendingCount: 0,
  orders: [],
}

// Stubbed: the real version calls Dolibarr's fourn/commande/list stats
// (purchase order counts, this-month count, total value, approved/pending
// breakdown, plus the order list itself). This project has no backend of
// its own, so it always reports the same all-zero/empty summary, matching
// the reference list on a fresh install with no purchase orders yet.
export function usePurchaseOrdersSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
