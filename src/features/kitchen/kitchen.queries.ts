export interface KitchenSummary {
  totalOrders: number
  activeOrders: number
  completedOrders: number
  pendingOrders: number
}

const STUB_SUMMARY: KitchenSummary = {
  totalOrders: 0,
  activeOrders: 0,
  completedOrders: 0,
  pendingOrders: 0,
}

// Stubbed: the real version calls the custom kitchen module's order stats
// (today's orders, in-progress, completed, pending) and the token status
// list. This project has no backend of its own, so it always reports the
// same all-zero/empty summary, matching the reference dashboard on a fresh
// install with no orders yet.
export function useKitchenSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
