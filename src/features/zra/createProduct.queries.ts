import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../api/axios'

// GET /api/zra/asycuda-imports/prefill/ — real, proxies the legacy ecuenta9
// install's quicklinks_ajax.php?type=get_importproduct action (session-login
// proxy, same as asycuda-imports/index.php). Only ref/label are pulled out —
// the rest of what that legacy action returns (country_id, qty_unit,
// pack_unit) has nowhere to go, since the real create-product endpoint below
// doesn't accept those fields.
export interface ProductPrefill {
  ref: string
  label: string
  taskCode: string
}
export function useProductPrefill(taskCode: string | null) {
  return useQuery({
    queryKey: ['zra', 'asycuda-imports', 'prefill', taskCode],
    queryFn: async (): Promise<ProductPrefill> => {
      const { data } = await api.get<{ success: boolean; data: ProductPrefill }>('/zra/asycuda-imports/prefill/', { params: { taskCd: taskCode } })
      return data.data
    },
    enabled: !!taskCode,
    staleTime: 1000 * 30,
  })
}

// POST /api/products/list/ — real, the only product-creation endpoint on the
// ecnta10 backend's bearer-token REST layer (see that file's header comment:
// built to match a ProductListPage.jsx, not the legacy ZRA "Add Products"
// form). It only accepts label/type/ref/description/sellingPrice/vatRate/
// desiredStock — no units, warehouse, IPL/Tourism/Excise codes, barcode, or
// category assignment; those concepts have no REST endpoint anywhere in this
// backend (only the legacy session-authenticated custom/zra/ajax_products.php
// supports them, which isn't reachable from a bearer-token SPA).
export interface CreateProductInput {
  label: string
  isService?: boolean
  ref?: string
  description?: string
  sellingPrice?: number
  vatRate?: number
  desiredStock?: number
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      const { data } = await api.post<{ success: boolean; data: { id: number; ref: string } }>('/products/list/', {
        label: input.label,
        type: input.isService ? 1 : 0,
        ref: input.ref || undefined,
        description: input.description || undefined,
        sellingPrice: input.sellingPrice,
        vatRate: input.vatRate,
        desiredStock: input.desiredStock,
      })
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
