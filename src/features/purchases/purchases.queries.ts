export interface PurchaseStatCounts {
  purchaseInvoices: number
  supplierProposals: number
  purchaseOrders: number
  vendors: number
  asycudaDeclarations: number
  automaticPurchases: number
}

export interface InvoiceStatusRow {
  status: string
  count: number
  amount: number
}

export interface TopProductRow {
  product: string
  count: number
}

export interface PurchasesSummary {
  stats: PurchaseStatCounts
  todaysPurchaseAmount: number
  todaysInvoiceCount: number
  todaysAsycudaAmount: number
  todaysAsycudaInvoiceCount: number
  invoiceStatus: InvoiceStatusRow[]
  topProducts: TopProductRow[]
  topProductsYear: number
}

const STUB_SUMMARY: PurchasesSummary = {
  stats: { purchaseInvoices: 0, supplierProposals: 0, purchaseOrders: 0, vendors: 0, asycudaDeclarations: 0, automaticPurchases: 0 },
  todaysPurchaseAmount: 0,
  todaysInvoiceCount: 0,
  todaysAsycudaAmount: 0,
  todaysAsycudaInvoiceCount: 0,
  invoiceStatus: [
    { status: 'Draft (Needs To Be Validated)', count: 0, amount: 0 },
    { status: 'Started', count: 0, amount: 0 },
    { status: 'Paid', count: 0, amount: 0 },
    { status: 'Closed (Unpaid)', count: 0, amount: 0 },
  ],
  topProducts: [],
  topProductsYear: new Date().getFullYear(),
}

// Stubbed: the real version calls Dolibarr's fourn/facture stats (supplier
// invoices/proposals/orders/vendors, ASYCUDA declarations, today's purchase
// and ASYCUDA totals, invoice-status breakdown, best-purchased products).
// This project has no backend of its own, so it always reports the same
// all-zero/empty summary, matching the reference dashboard on a fresh install.
export function usePurchasesSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
