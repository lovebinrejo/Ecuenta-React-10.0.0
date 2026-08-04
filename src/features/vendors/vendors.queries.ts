import type { ThirdPartyRow } from '../../shared/components/thirdParty/ThirdPartyList'

export interface VendorsSummary {
  totalVendors: number
  createdThisMonth: number
  outstandingBalance: number
  defaultCountryVendors: number
  otherCountryVendors: number
  vendors: ThirdPartyRow[]
}

const STUB_SUMMARY: VendorsSummary = {
  totalVendors: 0,
  createdThisMonth: 0,
  outstandingBalance: 0,
  defaultCountryVendors: 0,
  otherCountryVendors: 0,
  vendors: [],
}

// Stubbed: the real version calls Dolibarr's societe/list (type=f) stats
// (vendor counts, outstanding balance, country breakdown, plus the vendor
// list itself). This project has no backend of its own, so it always
// reports the same all-zero/empty summary, matching the reference list on a
// fresh install with no vendors yet.
export function useVendorsSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
