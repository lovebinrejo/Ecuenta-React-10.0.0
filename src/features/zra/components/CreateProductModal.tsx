import { useEffect, useState } from 'react'
import { X, Lock } from 'lucide-react'
import { useCreateProduct, useProductPrefill } from '../createProduct.queries'

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className={`block text-sm mb-1 ${required ? 'text-danger' : 'text-brand'}`}>
        {label}
        {required && '*'}
      </label>
      {children}
    </div>
  )
}

const UNAVAILABLE_HINT = 'Not available yet — no backend endpoint exists for this field on the real product-create API.'

// Same visual field as Field, but for the ~25 legacy "Add Products" fields
// (units, warehouse, IPL/Tourism/Excise codes, barcode, dimensions,
// accountancy codes, categories) that api/products/list/ — the only real
// product-creation endpoint — has no support for at all (see
// createProduct.queries.ts). Shown greyed out with a lock icon rather than
// silently dropped, matching this app's standing "show the real control,
// disable it, explain why" convention for anything not wired to a live
// backend — never a fabricated dropdown of made-up options.
function DisabledField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="opacity-45" title={UNAVAILABLE_HINT}>
      <label className={`flex items-center gap-1 text-sm mb-1 ${required ? 'text-danger' : 'text-brand'}`}>
        {label}
        {required && '*'}
        <Lock size={10} className="text-text-faint" />
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full h-9 px-3 rounded-md border border-input-border bg-input-bg text-text text-sm outline-none focus:ring-2 focus:ring-brand/30'
const selectCls = inputCls + ' appearance-none'
const disabledInputCls = inputCls + ' cursor-not-allowed'
const disabledSelectCls = selectCls + ' cursor-not-allowed'

export function CreateProductModal({ taskCode, onClose, onCreated }: { taskCode: string; onClose: () => void; onCreated: () => void }) {
  const createProduct = useCreateProduct()
  const { data: prefill, isLoading: prefillLoading } = useProductPrefill(taskCode)

  const [ref, setRef] = useState('')
  const [label, setLabel] = useState('')
  const [desiredStock, setDesiredStock] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [vatRate, setVatRate] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!prefill) return
    setRef((cur) => cur || prefill.ref)
    setLabel((cur) => cur || prefill.label)
  }, [prefill])

  async function handleSubmit() {
    setError('')
    if (!ref.trim()) return setError('Ref. is required!')
    if (!label.trim()) return setError('Label is required!')
    if (!sellingPrice) return setError('Selling price is required!')

    try {
      await createProduct.mutateAsync({
        ref: ref.trim(),
        label: label.trim(),
        isService: false,
        sellingPrice: Number(sellingPrice),
        vatRate: vatRate ? Number(vatRate) : undefined,
        desiredStock: desiredStock ? Number(desiredStock) : undefined,
      })
      onCreated()
    } catch {
      setError('Connection error while creating the product — please try again.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden bg-surface border border-border rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
          <h3 className="text-lg font-semibold text-text!">Add Products</h3>
          <button type="button" onClick={onClose} className="p-1 rounded-md text-text-muted hover:bg-surface-alt">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto soft-scrollbar">
          <p className="text-xs text-text-faint">
            From ASYCUDA task code <span className="text-text">{taskCode}</span>. Fields marked <Lock size={9} className="inline -mt-0.5" /> match the real
            legacy form's layout but have no live backend endpoint yet — only Ref, Label, Selling price, VAT rate and Desired Stock actually submit.
            {prefillLoading && ' Loading real item details…'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-3 items-start">
            <Field label="Ref." required>
              <input value={ref} onChange={(e) => setRef(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Label" required>
              <input value={label} onChange={(e) => setLabel(e.target.value)} className={inputCls} />
            </Field>
            <DisabledField label="Status (Sell)" required>
              <select disabled className={disabledSelectCls}>
                <option>For sale</option>
              </select>
            </DisabledField>

            <DisabledField label="Status (Purchase)" required>
              <select disabled className={disabledSelectCls}>
                <option>For purchase</option>
              </select>
            </DisabledField>
            <DisabledField label="Product Classification" required>
              <input disabled placeholder="Search Classification Code.." className={disabledInputCls} />
            </DisabledField>
            <DisabledField label="Nature of product" required>
              <select disabled className={disabledSelectCls}>
                <option>Finished Product</option>
              </select>
            </DisabledField>

            <DisabledField label="Country of origin" required>
              <select disabled className={disabledSelectCls}>
                <option>Select…</option>
              </select>
            </DisabledField>
            <DisabledField label="Default warehouse">
              <select disabled className={disabledSelectCls}>
                <option>Select a warehouse</option>
              </select>
            </DisabledField>
            <DisabledField label="Stock limit for alert">
              <input disabled className={disabledInputCls} />
            </DisabledField>

            <Field label="Desired Stock">
              <input value={desiredStock} onChange={(e) => setDesiredStock(e.target.value)} className={inputCls} />
            </Field>
            <DisabledField label="Unit" required>
              <select disabled className={disabledSelectCls}>
                <option>Select…</option>
              </select>
            </DisabledField>
            <DisabledField label="Packaging Unit" required>
              <select disabled className={disabledSelectCls}>
                <option>Select…</option>
              </select>
            </DisabledField>

            <Field label="Selling price" required>
              <input value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} className={inputCls} />
            </Field>
            <DisabledField label="Min. selling price">
              <input disabled className={disabledInputCls} />
            </DisabledField>
            <Field label="VAT rate (%)">
              <input value={vatRate} onChange={(e) => setVatRate(e.target.value)} className={inputCls} />
            </Field>

            <DisabledField label="IPL category code">
              <select disabled className={disabledSelectCls}>
                <option>Select Tax Category</option>
              </select>
            </DisabledField>
            <DisabledField label="Tourism levy Code">
              <select disabled className={disabledSelectCls}>
                <option>Select Tax Category</option>
              </select>
            </DisabledField>
            <DisabledField label="Excise tax category code">
              <select disabled className={disabledSelectCls}>
                <option>Select Tax Category</option>
              </select>
            </DisabledField>

            <DisabledField label="Barcode type">
              <select disabled className={disabledSelectCls}>
                <option>Select…</option>
              </select>
            </DisabledField>
            <DisabledField label="Barcode value">
              <input disabled className={disabledInputCls} />
            </DisabledField>
            <DisabledField label="Weight">
              <div className="flex gap-2">
                <input disabled className={disabledInputCls} />
                <select disabled className={disabledSelectCls + ' w-20'}>
                  <option>kg</option>
                </select>
              </div>
            </DisabledField>

            <DisabledField label="Length x Width x Height">
              <div className="flex items-center gap-1">
                <input disabled className={disabledInputCls} />
                <span className="text-text-faint">x</span>
                <input disabled className={disabledInputCls} />
                <span className="text-text-faint">x</span>
                <input disabled className={disabledInputCls} />
              </div>
            </DisabledField>
            <DisabledField label="Area">
              <div className="flex gap-2">
                <input disabled className={disabledInputCls} />
                <select disabled className={disabledSelectCls + ' w-20'}>
                  <option>m²</option>
                </select>
              </div>
            </DisabledField>
            <DisabledField label="Volume">
              <div className="flex gap-2">
                <input disabled className={disabledInputCls} />
                <select disabled className={disabledSelectCls + ' w-20'}>
                  <option>m³</option>
                </select>
              </div>
            </DisabledField>

            <DisabledField label="Product Accountancy Sell Code">
              <input disabled className={disabledInputCls} />
            </DisabledField>
            <DisabledField label="Product Accountancy Sell Export Code">
              <input disabled className={disabledInputCls} />
            </DisabledField>
            <DisabledField label="Product Accountancy Buy Code">
              <input disabled className={disabledInputCls} />
            </DisabledField>

            <DisabledField label="Product Accountancy Buy Export Code">
              <input disabled className={disabledInputCls} />
            </DisabledField>
            <DisabledField label="Tags/categories">
              <input disabled placeholder="Search or add a tag/category…" className={disabledInputCls} />
            </DisabledField>
            <div className="flex items-center gap-2 pt-6 opacity-45" title={UNAVAILABLE_HINT}>
              <label className="flex items-center gap-1 text-sm text-brand">
                Enable On Website <Lock size={10} className="text-text-faint" />
              </label>
              <button type="button" disabled className="w-9 h-5 rounded-full bg-surface-alt cursor-not-allowed">
                <span className="block w-4 h-4 rounded-full bg-white shadow translate-x-0.5" />
              </button>
            </div>
          </div>

          {error && <p className="text-sm font-medium text-danger">{error}</p>}
        </div>

        <div className="px-5 py-3 border-t border-border shrink-0 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={createProduct.isPending}
            className="px-4 py-2 rounded-md text-sm font-medium bg-brand text-white hover:opacity-90 disabled:opacity-60"
          >
            {createProduct.isPending ? 'Creating…' : 'Create Products'}
          </button>
        </div>
      </div>
    </div>
  )
}
