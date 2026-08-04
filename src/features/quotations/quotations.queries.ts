export interface QuotationRow {
  ref: string
  refCustomer: string
  projectRef: string
  thirdParty: string
  city: string
  zipCode: string
  date: string
  endDate: string
  amountExclTax: number
  author: string
  salesRep: string
  status: string
}

export interface QuotationsSummary {
  totalProposals: number
  proposalsThisMonth: number
  totalProposalAmount: number
  validatedCount: number
  draftCount: number
  quotations: QuotationRow[]
}

const STUB_SUMMARY: QuotationsSummary = {
  totalProposals: 0,
  proposalsThisMonth: 0,
  totalProposalAmount: 0,
  validatedCount: 0,
  draftCount: 0,
  quotations: [],
}

// Stubbed: the real version calls Dolibarr's comm/propal/list stats
// (proposal counts, this-month count, total value, validated/draft
// breakdown, plus the quotation list itself). This project has no backend
// of its own, so it always reports the same all-zero/empty summary,
// matching the reference list on a fresh install with no quotations yet.
export function useQuotationsSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
