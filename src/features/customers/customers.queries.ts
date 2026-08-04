import type { ThirdPartyRow } from '../../shared/components/thirdParty/ThirdPartyList'

export interface CustomersSummary {
  totalCustomers: number
  createdThisMonth: number
  outstandingBalance: number
  defaultCountryCustomers: number
  otherCountryCustomers: number
  customers: ThirdPartyRow[]
}

const STUB_SUMMARY: CustomersSummary = {
  totalCustomers: 0,
  createdThisMonth: 0,
  outstandingBalance: 0,
  defaultCountryCustomers: 0,
  otherCountryCustomers: 0,
  customers: [],
}

// Stubbed: the real version calls Dolibarr's societe/list stats (customer
// counts, outstanding balance, country breakdown, plus the customer list
// itself). This project has no backend of its own, so it always reports the
// same all-zero/empty summary, matching the reference list on a fresh
// install with no customers yet.
export function useCustomersSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
