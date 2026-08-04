export interface InvoiceRow {
  ref: string
  invoiceNo: string
  invoiceDate: string
  thirdParty: string
  city: string
  paymentType: string
  amountInclTax: number
  author: string
  status: string
  zraStatus: string
}

export interface InvoicesSummary {
  clients: number
  invoices: number
  paidAmount: number
  unpaidAmount: number
  rows: InvoiceRow[]
}

const STUB_SUMMARY: InvoicesSummary = {
  clients: 0,
  invoices: 0,
  paidAmount: 0,
  unpaidAmount: 0,
  rows: [],
}

// Stubbed: the real version calls Dolibarr's compta/facture/list stats
// (client count, invoice count, paid/unpaid totals, plus the invoice list
// itself). This project has no backend of its own, so it always reports the
// same all-zero/empty summary, matching the reference list on a fresh
// install with no invoices yet.
export function useInvoicesSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
