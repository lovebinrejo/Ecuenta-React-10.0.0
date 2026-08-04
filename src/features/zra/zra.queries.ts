export interface ZraSyncStat {
  succeededAmount: number
  unsyncedAmount: number
  totalAmount: number
}

export type ZraSyncStatus = 'poor' | 'good' | 'complete'

export interface ZraSyncDetailRow {
  category: string
  totalCount: number | null
  succeeded: number | null
  unsynced: number | null
  status: ZraSyncStatus
}

export interface ZraSummary {
  serverError: string | null
  apiOnline: boolean
  syncStatus: string
  salesInvoices: ZraSyncStat
  creditNotes: ZraSyncStat
  income: ZraSyncStat
  vatAmount: ZraSyncStat
  purchaseAmount: { amount: number; complete: boolean }
  details: ZraSyncDetailRow[]
}

const zeroStat = (): ZraSyncStat => ({ succeededAmount: 0, unsyncedAmount: 0, totalAmount: 0 })

const STUB_SUMMARY: ZraSummary = {
  serverError: 'Unable to connect to ZRA server.',
  apiOnline: true,
  syncStatus: 'Checking...',
  salesInvoices: zeroStat(),
  creditNotes: zeroStat(),
  income: zeroStat(),
  vatAmount: zeroStat(),
  purchaseAmount: { amount: 0, complete: true },
  details: [
    { category: 'Sales Invoices', totalCount: 0, succeeded: 0, unsynced: 0, status: 'poor' },
    { category: 'Credit Notes', totalCount: 0, succeeded: 0, unsynced: 0, status: 'poor' },
    { category: 'Stock Items', totalCount: 0, succeeded: 0, unsynced: 0, status: 'poor' },
    { category: 'Purchase Amount', totalCount: null, succeeded: null, unsynced: null, status: 'complete' },
  ],
}

// Stubbed: the real version polls the ZRA (Zambia Revenue Authority) e-invoicing
// gateway for sync status. This project has no backend of its own, so it
// always reports the same all-zero/"can't reach the server" summary, matching
// the reference dashboard's own display on a fresh install with no ZRA
// credentials configured yet.
export function useZraSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
