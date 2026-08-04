export interface SalesStatCounts {
  salesInvoices: number
  proposals: number
  salesOrders: number
  contracts: number
  customers: number
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

export interface SalesSummary {
  stats: SalesStatCounts
  todaysInvoiceAmount: number
  todaysInvoiceCount: number
  todaysRefundAmount: number
  todaysCreditNoteCount: number
  invoiceStatus: InvoiceStatusRow[]
  topProducts: TopProductRow[]
  topProductsYear: number
}

const STUB_SUMMARY: SalesSummary = {
  stats: { salesInvoices: 0, proposals: 0, salesOrders: 0, contracts: 0, customers: 0 },
  todaysInvoiceAmount: 0,
  todaysInvoiceCount: 0,
  todaysRefundAmount: 0,
  todaysCreditNoteCount: 0,
  invoiceStatus: [
    { status: 'Draft (Needs To Be Validated)', count: 0, amount: 0 },
    { status: 'Started', count: 0, amount: 0 },
    { status: 'Paid', count: 0, amount: 0 },
    { status: 'Closed (Unpaid)', count: 0, amount: 0 },
  ],
  topProducts: [],
  topProductsYear: new Date().getFullYear(),
}

// Stubbed: the real version calls Dolibarr's commercial/index.php stats
// (customer invoices/proposals/orders/contracts/customers, today's invoice
// and credit-note totals, invoice-status breakdown, best-selling products).
// This project has no backend of its own, so it always reports the same
// all-zero/empty summary, matching the reference dashboard on a fresh install.
export function useSalesSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
