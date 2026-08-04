import { Link } from 'react-router-dom'
import { ShoppingCart, Check, X } from 'lucide-react'
import { ROUTES } from '../../../routes'
import { Card } from '../../../shared/components/dashboard/DashboardKit'
import { Field, Select, inputClasses } from '../../../shared/components/forms/FormField'

export function OrderCreateForm() {
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-bold text-text!">
        <ShoppingCart size={20} className="text-brand" /> Create Order
      </h2>

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <Field label="Ref.">
            <input disabled defaultValue="Draft" className={`${inputClasses} text-text-faint`} />
          </Field>
          <Field label="Ref. customer">
            <input type="text" className={inputClasses} />
          </Field>

          <Field label="Customer" required>
            <Select options={[]} />
          </Field>
          <Field label="Date" required>
            <input type="date" defaultValue={today} className={inputClasses} />
          </Field>

          <Field label="Planned date of delivery">
            <input type="date" className={inputClasses} />
          </Field>
          <Field label="Payment Terms">
            <Select options={[]} />
          </Field>

          <Field label="Payment Type" required>
            <Select options={[]} />
          </Field>
          <Field label="Bank account">
            <Select options={[]} />
          </Field>

          <Field label="Availability delay">
            <Select options={[]} />
          </Field>
          <Field label="Shipping method">
            <Select options={[]} />
          </Field>

          <Field label="Channel">
            <Select options={[]} />
          </Field>
          <Field label="Project">
            <Select options={[]} />
          </Field>

          <Field label="Default doc template">
            <Select defaultValue="einstein" options={['einstein']} />
          </Field>
          <Field label="Currency">
            <Select defaultValue="Zambian Kwacha (ZMW)" options={['Zambian Kwacha (ZMW)']} />
          </Field>

          <Field label="Incoterms">
            <Select options={[]} />
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
          <Check size={14} /> Create draft
        </button>
        <Link to={ROUTES.orderList} className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text hover:bg-surface-hover">
          <X size={14} /> Cancel
        </Link>
      </div>
    </div>
  )
}
