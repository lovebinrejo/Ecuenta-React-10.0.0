export interface WarehouseSummary {
  totalProductsInStock: number
  totalStockQuantity: number
  totalStockValue: number
  warehousesActive: number
  warehousesTotal: number
  productsOutOfStock: number
  productsLowStock: number
  movementsToday: number
  inventories: number
  shipments: { total: number; validated: number }
  receptions: { total: number; validated: number }
  reservations: { active: number; totalReservedQty: number; released: number; consumed: number }
}

const STUB_SUMMARY: WarehouseSummary = {
  totalProductsInStock: 0,
  totalStockQuantity: 0,
  totalStockValue: 0,
  warehousesActive: 0,
  warehousesTotal: 0,
  productsOutOfStock: 0,
  productsLowStock: 0,
  movementsToday: 0,
  inventories: 0,
  shipments: { total: 0, validated: 0 },
  receptions: { total: 0, validated: 0 },
  reservations: { active: 0, totalReservedQty: 0, released: 0, consumed: 0 },
}

// Stubbed: the real version calls Dolibarr's product/stock stats (stock
// levels/value, warehouses, movements, inventories, shipments, receptions,
// reservations). This project has no backend of its own, so it always
// reports the same all-zero summary, matching the reference dashboard on a
// fresh install with no stock movements yet.
export function useWarehouseSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
