import { useState } from 'react'
import { Button } from '../ui/Button'
import { InputField } from '../ui/InputField'

interface FieldConfig {
  name: string
  label: string
  type?: string
  placeholder?: string
  hint?: string
}

interface EnterpriseFormProps {
  title: string
  subtitle: string
  fields: FieldConfig[]
  submitLabel?: string
}

export function EnterpriseForm({ title, subtitle, fields, submitLabel = 'Save changes' }: EnterpriseFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, ''])),
  )

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.info('Form submitted', values)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur">
      <div className="mb-6 space-y-2">
        <p className="text-sm font-medium text-cyan-400">Reusable form</p>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type ?? 'text'}
            placeholder={field.placeholder}
            hint={field.hint}
            value={values[field.name] ?? ''}
            onChange={(event) => handleChange(field.name, event.target.value)}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit">{submitLabel}</Button>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  )
}
