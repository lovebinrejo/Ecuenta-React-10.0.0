import { Link } from 'react-router-dom'
import { FileEdit, Check, X } from 'lucide-react'
import { ROUTES } from '../../../routes'
import { Card } from '../../../shared/components/dashboard/DashboardKit'

const inputClasses = 'w-full text-sm rounded-md border border-input-border bg-input-bg text-text px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand/30'

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-text">
        {label}
        {required && <span className="text-danger">*</span>}
      </span>
      {children}
    </label>
  )
}

// The reference pre-assigns the logged-in user as a removable chip on each
// rep field — shown here as a static, disabled chip (no backend to remove
// against) rather than a fake interactive multi-select.
function RepChip() {
  return (
    <div className={`${inputClasses} flex items-center`}>
      <span className="inline-flex items-center gap-1.5 rounded-md bg-brand px-2 py-1 text-xs text-white">
        <X size={11} /> Voxforem Admin (All entities)
      </span>
    </div>
  )
}

export function ContractCreateForm() {
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-bold text-text!">
        <FileEdit size={20} className="text-brand" /> Create contract
      </h2>

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <Field label="Ref.">
            <input disabled defaultValue="Draft" className={`${inputClasses} text-text-faint`} />
          </Field>
          <Field label="Ref. customer">
            <input type="text" className={inputClasses} />
          </Field>

          <Field label="Ref. vendor">
            <input type="text" className={inputClasses} />
          </Field>
          <Field label="Third-party" required>
            <select defaultValue="" className={inputClasses}>
              <option value="">Select a third party</option>
            </select>
          </Field>

          <Field label="Sales representative following-up contract" required>
            <RepChip />
          </Field>
          <Field label="Customer support representative" required>
            <RepChip />
          </Field>

          <Field label="Sales representative signing contract" required>
            <RepChip />
          </Field>
          <Field label="Date" required>
            <input type="date" defaultValue={today} className={inputClasses} />
          </Field>

          <Field label="Project">
            <select defaultValue="" className={inputClasses}>
              <option value="">Select a project</option>
            </select>
          </Field>
          <Field label="Note (public)">
            <input type="text" className={inputClasses} />
          </Field>

          <Field label="Note (private)">
            <input type="text" className={inputClasses} />
          </Field>
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <button type="button" disabled title="Not built yet" className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white opacity-80 cursor-default">
          <Check size={14} /> Create
        </button>
        <Link to={ROUTES.contractList} className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text hover:bg-surface-hover">
          <X size={14} /> Cancel
        </Link>
      </div>
    </div>
  )
}
