export interface ContractRow {
  ref: string
  refCustomer: string
  refVendor: string
  thirdParty: string
  salesRep: string
  contractDate: string
  endDateOfServices: string
  notRunning: number
  inProgress: number
  expired: number
  closed: number
}

export interface ContractsSummary {
  totalContracts: number
  createdThisMonth: number
  runningTotal: number
  startedThisMonth: number
  expiredCount: number
  expiredThisMonth: number
  closedCount: number
  followupsThisMonth: number
  contracts: ContractRow[]
}

const STUB_SUMMARY: ContractsSummary = {
  totalContracts: 0,
  createdThisMonth: 0,
  runningTotal: 0,
  startedThisMonth: 0,
  expiredCount: 0,
  expiredThisMonth: 0,
  closedCount: 0,
  followupsThisMonth: 0,
  contracts: [],
}

// Stubbed: the real version calls Dolibarr's contrat/list stats (contract
// counts, running/expiry/closure breakdowns, plus the contract list itself).
// This project has no backend of its own, so it always reports the same
// all-zero/empty summary, matching the reference list on a fresh install
// with no contracts yet.
export function useContractsSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
