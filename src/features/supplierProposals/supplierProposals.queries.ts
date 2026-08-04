export interface SupplierProposalRow {
  ref: string
  thirdParty: string
  validationDate: string
  plannedDelivery: string
  amountExclTax: number
  amountInclTax: number
  author: string
  status: string
}

export interface SupplierProposalsSummary {
  totalProposals: number
  proposalsThisMonth: number
  totalProposalAmount: number
  validatedCount: number
  draftCount: number
  proposals: SupplierProposalRow[]
}

const STUB_SUMMARY: SupplierProposalsSummary = {
  totalProposals: 0,
  proposalsThisMonth: 0,
  totalProposalAmount: 0,
  validatedCount: 0,
  draftCount: 0,
  proposals: [],
}

// Stubbed: the real version calls Dolibarr's supplier_proposal/list stats
// (proposal counts, this-month count, total value, validated/draft
// breakdown, plus the proposal list itself). This project has no backend
// of its own, so it always reports the same all-zero/empty summary,
// matching the reference list on a fresh install with no proposals yet.
export function useSupplierProposalsSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
