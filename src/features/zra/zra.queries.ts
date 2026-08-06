import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/axios'

export interface ZraSyncStat {
  succeededAmount: number
  unsyncedAmount: number
  totalAmount: number
}

export type ZraSyncStatus = 'poor' | 'fair' | 'good' | 'complete'

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

// GET /api/zra/summary/ — real endpoint on the ecnta10 backend, queries
// llx_facture/llx_facture_fourn/llx_product directly. Response is
// {success, data: {salesInvoices, creditNotes, stockItems, purchaseAmount,
// vat, income}}, each of salesInvoices/creditNotes shaped
// {total,succeeded,unsynced,finishAmount,processAmount}, stockItems
// {total,succeeded,unsynced} (no amounts — stock has no monetary value here).
interface RawZraBucket {
  total: number
  succeeded: number
  unsynced: number
  finishAmount: number
  processAmount: number
}
interface RawZraStockBucket {
  total: number
  succeeded: number
  unsynced: number
}
interface RawZraSummaryData {
  salesInvoices: RawZraBucket
  creditNotes: RawZraBucket
  stockItems: RawZraStockBucket
  purchaseAmount: { count: number; amount: number }
  vat: { finishTax: number; processTax: number }
  income: { finishAmount: number; processAmount: number }
}
interface RawZraResponse {
  success: boolean
  data: RawZraSummaryData
}

// There's no live external-ZRA-API "online" probe in this real endpoint (that
// concept belonged to the old stub) — thresholds here classify our own
// succeeded/total ratio instead, matching the legacy dashboard's badge splits
// (sync_rate > 80 / > 50, per zraindex.php's updateTableRow).
function rateToStatus(succeeded: number, total: number): ZraSyncStatus {
  if (total <= 0) return 'complete'
  const rate = (succeeded / total) * 100
  if (rate > 80) return 'good'
  if (rate > 50) return 'fair'
  return 'poor'
}

function toSyncStat(bucket: RawZraBucket): ZraSyncStat {
  return {
    succeededAmount: bucket.finishAmount,
    unsyncedAmount: bucket.processAmount,
    totalAmount: bucket.finishAmount + bucket.processAmount,
  }
}

export function useZraSummary() {
  return useQuery({
    queryKey: ['zra', 'summary'],
    queryFn: async (): Promise<ZraSummary> => {
      const { data } = await api.get<RawZraResponse>('/zra/summary/')
      const { salesInvoices, creditNotes, stockItems, purchaseAmount, vat, income } = data.data

      const overallSucceeded = salesInvoices.succeeded + creditNotes.succeeded + stockItems.succeeded
      const overallTotal = salesInvoices.total + creditNotes.total + stockItems.total
      const overallStatus = rateToStatus(overallSucceeded, overallTotal)

      return {
        serverError: null,
        apiOnline: true,
        syncStatus: overallStatus.toUpperCase(),
        salesInvoices: toSyncStat(salesInvoices),
        creditNotes: toSyncStat(creditNotes),
        income: { succeededAmount: income.finishAmount, unsyncedAmount: income.processAmount, totalAmount: income.finishAmount + income.processAmount },
        vatAmount: { succeededAmount: vat.finishTax, unsyncedAmount: vat.processTax, totalAmount: vat.finishTax + vat.processTax },
        purchaseAmount: { amount: purchaseAmount.amount, complete: true },
        details: [
          { category: 'Sales Invoices', totalCount: salesInvoices.total, succeeded: salesInvoices.succeeded, unsynced: salesInvoices.unsynced, status: rateToStatus(salesInvoices.succeeded, salesInvoices.total) },
          { category: 'Credit Notes', totalCount: creditNotes.total, succeeded: creditNotes.succeeded, unsynced: creditNotes.unsynced, status: rateToStatus(creditNotes.succeeded, creditNotes.total) },
          { category: 'Stock Items', totalCount: stockItems.total, succeeded: stockItems.succeeded, unsynced: stockItems.unsynced, status: rateToStatus(stockItems.succeeded, stockItems.total) },
          { category: 'Purchase Amount', totalCount: purchaseAmount.count, succeeded: purchaseAmount.count, unsynced: 0, status: 'complete' },
        ],
      }
    },
    staleTime: 1000 * 60,
  })
}
