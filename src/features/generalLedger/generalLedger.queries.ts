export interface LedgerEntry {
  transactionNum: string
  journal: string
  date: string
  accountingDoc: string
  label: string
  currencyCode: string
  conversionAmount: number
}

export interface LedgerMovement {
  debit: number
  credit: number
  balance: number
  balanceSide: 'Dr' | 'Cr'
}

export interface LedgerSummary {
  year: number
  entries: LedgerEntry[]
  periodMovements: LedgerMovement
  closingBalance: LedgerMovement
}

const zeroMovement = (): LedgerMovement => ({ debit: 0, credit: 0, balance: 0, balanceSide: 'Dr' })

const STUB_SUMMARY: LedgerSummary = {
  year: new Date().getFullYear(),
  entries: [],
  periodMovements: zeroMovement(),
  closingBalance: zeroMovement(),
}

// Stubbed: the real version calls Dolibarr's accountancy/bookkeeping "view by
// accounting account" report (transactions for the selected account/date
// range, plus period-movements and closing-balance totals). This project has
// no backend of its own, so it always reports the same empty/all-zero
// summary, matching the reference report on a fresh install with no
// bookkeeping entries yet.
export function useLedgerSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
