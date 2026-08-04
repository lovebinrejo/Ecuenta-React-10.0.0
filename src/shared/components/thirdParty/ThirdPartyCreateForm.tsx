import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users2, Check, X } from 'lucide-react'
import { Card } from '../dashboard/DashboardKit'

interface FieldSpec {
  key: string
  label: string
  type: 'text' | 'select' | 'file'
  options?: string[]
  defaultValue?: string
  required?: boolean
}

// Dolibarr's societe/card.php?type=c|f — same "New Third Party" wizard for
// both customers and vendors, just with the Prospect/Customer + Vendor
// dropdown defaults flipped, and vendors getting an extra Branch Code field.
type Variant = 'customer' | 'vendor'

function buildStep1(variant: Variant): FieldSpec[] {
  const isVendor = variant === 'vendor'
  const fields: FieldSpec[] = [
    { key: 'prospectCustomer', label: 'Prospect / Customer', type: 'select', options: ['Customer', 'Prospect', 'Not prospect, Not customer'], defaultValue: isVendor ? 'Not prospect, Not customer' : 'Customer' },
    { key: 'tpin', label: 'Tpin', type: 'text', required: true },
    { key: 'trackingId', label: 'Tracking Id', type: 'text' },
    { key: 'aliasName', label: 'Alias name (commercial, trademark, ...)', type: 'text' },
    { key: 'customerGroup', label: 'Customer Group', type: 'select', options: [] },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'customerCode', label: 'Customer Code', type: 'text', defaultValue: 'CU2608-00001' },
    { key: 'email', label: 'EMail', type: 'text' },
    { key: 'vendor', label: 'Vendor', type: 'select', options: ['No', 'Yes'], defaultValue: isVendor ? 'Yes' : 'No' },
    { key: 'country', label: 'Country', type: 'select', options: ['Zambia (ZM)'], defaultValue: 'Zambia (ZM)' },
    { key: 'vendorCode', label: 'Vendor Code', type: 'text', defaultValue: 'SU2608-00001' },
  ]
  if (isVendor) {
    fields.push({ key: 'branchCode', label: 'Branch Code', type: 'text' })
  }
  fields.push(
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'currency', label: 'Currency', type: 'select', options: ['Zambian Kwacha (ZMW)'], defaultValue: 'Zambian Kwacha (ZMW)' },
    { key: 'thirdPartyType', label: 'Third-party type', type: 'select', options: [] },
  )
  return fields
}

const STEP2_FIELDS: FieldSpec[] = [
  { key: 'status', label: 'Status', type: 'select', options: ['Open', 'Close'], defaultValue: 'Open' },
  { key: 'supervisorDetails', label: 'Supervisor Details', type: 'text' },
  { key: 'employerName', label: 'Employer Name', type: 'text' },
  { key: 'employeeNumber', label: 'Employee Number', type: 'text' },
  { key: 'thirdPartyMode', label: 'Third-party Mode', type: 'select', options: ['unprivileged', 'privileged'], defaultValue: 'unprivileged' },
  { key: 'salesRep', label: 'Assigned to sales representative', type: 'text' },
  { key: 'zipCode', label: 'Zip Code', type: 'text' },
  { key: 'city', label: 'City', type: 'text' },
  { key: 'stateProvince', label: 'State/Province', type: 'select', options: [] },
  { key: 'fax', label: 'Fax', type: 'text' },
  { key: 'businessEntityType', label: 'Business entity type', type: 'select', options: [] },
  { key: 'nrc', label: 'NRC', type: 'select', options: [] },
  { key: 'nrcNumber', label: 'NRC Number', type: 'text' },
  { key: 'documentUpload', label: 'Document upload', type: 'file' },
  { key: 'salesTaxUsed', label: 'Sales tax used', type: 'select', options: ['Yes', 'No'], defaultValue: 'Yes' },
  { key: 'vatId', label: 'VAT ID', type: 'text' },
  { key: 'workforce', label: 'Workforce', type: 'select', options: [] },
  { key: 'languageDefault', label: 'Language default', type: 'select', options: [] },
  { key: 'capital', label: 'Capital', type: 'text' },
  { key: 'custProspTags', label: 'Cust./Prosp. tags/categories', type: 'text' },
  { key: 'vendorTags', label: 'Vendors tags/categories', type: 'text' },
  { key: 'incoterms', label: 'Incoterms', type: 'select', options: [] },
  { key: 'environment', label: 'Environment', type: 'select', options: ['Master entity'], defaultValue: 'Master entity' },
  { key: 'barcode', label: 'Barcode', type: 'text' },
  { key: 'web', label: 'Web', type: 'text' },
]

const STEP3_FIELDS: FieldSpec[] = [
  { key: 'facebook', label: 'Facebook', type: 'text' },
  { key: 'skype', label: 'Skype', type: 'text' },
  { key: 'twitter', label: 'Twitter', type: 'text' },
  { key: 'linkedin', label: 'LinkedIn', type: 'text' },
  { key: 'instagram', label: 'Instagram', type: 'text' },
  { key: 'snapchat', label: 'Snapchat', type: 'text' },
  { key: 'googlePlus', label: 'GooglePlus', type: 'text' },
  { key: 'youtube', label: 'Youtube', type: 'text' },
  { key: 'whatsapp', label: 'Whatsapp', type: 'text' },
  { key: 'diaspora', label: 'Diaspora', type: 'text' },
  { key: 'viber', label: 'Viber', type: 'text' },
  { key: 'github', label: 'Github', type: 'text' },
]

function Field({ field }: { field: FieldSpec }) {
  const inputClasses = 'w-full text-sm rounded-md border border-input-border bg-input-bg text-text px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand/30'
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-text">
        {field.label}
        {field.required && <span className="text-danger">*</span>}
      </span>
      {field.type === 'select' ? (
        <select defaultValue={field.defaultValue ?? ''} className={inputClasses}>
          {!field.defaultValue && <option value="">{field.options?.length ? `Select ${field.label.toLowerCase()}` : '—'}</option>}
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : field.type === 'file' ? (
        <input type="file" className={`${inputClasses} file:mr-3 file:rounded file:border-0 file:bg-surface-hover file:px-2 file:py-1`} />
      ) : (
        <input type="text" defaultValue={field.defaultValue} className={inputClasses} />
      )}
    </label>
  )
}

export function ThirdPartyCreateForm({ variant, cancelPath }: { variant: Variant; cancelPath: string }) {
  const [step, setStep] = useState(0)
  const steps = [
    { title: 'Setup basic details', fields: buildStep1(variant) },
    { title: 'Add professional info', fields: STEP2_FIELDS },
    { title: 'Add social links', fields: STEP3_FIELDS },
  ]

  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-bold text-text!">
        <Users2 size={20} className="text-brand" /> New Third Party (prospect, customer, vendor)
      </h2>

      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s.title} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
            <button type="button" onClick={() => setStep(i)} className={`flex flex-col items-center gap-2 ${i === step ? '' : 'opacity-80'}`}>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  i <= step ? 'bg-brand text-white' : 'bg-surface-hover text-text-muted border border-border'
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-xs whitespace-nowrap ${i === step ? 'text-text! font-medium' : 'text-text-faint'}`}>{s.title}</span>
            </button>
            {i < steps.length - 1 && <div className={`h-px flex-1 mx-2 ${i < step ? 'bg-brand' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
          {steps[step].fields.map((field) => (
            <Field key={field.key} field={field} />
          ))}
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Link to={cancelPath} className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text hover:bg-surface-hover">
          <X size={14} /> Cancel
        </Link>
        <button type="button" disabled title="Not built yet" className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white opacity-80 cursor-default">
          <Check size={14} /> Create third party
        </button>
      </div>
    </div>
  )
}
