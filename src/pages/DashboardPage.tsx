import { EnterpriseForm } from '../components/forms/EnterpriseForm'
import { Table } from '../components/ui/Table'
import { appTheme } from '../themes/theme'

const rows = [
  { id: 1, name: 'Ava Patel', role: 'Product Lead', status: 'Active' },
  { id: 2, name: 'Noah Chen', role: 'Engineering Manager', status: 'Review' },
  { id: 3, name: 'Mina Alvarez', role: 'Operations Lead', status: 'Pending' },
]

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
] as const

export function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className={`p-8 ${appTheme.shell}`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={`text-sm font-semibold uppercase tracking-[0.25em] ${appTheme.accent}`}>Enterprise Starter</p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Reusable design system foundation</h1>
              <p className={`mt-3 max-w-2xl text-base ${appTheme.muted}`}>
                This structure supports forms, tables, buttons, input fields, shared themes, and styles for scalable application development.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <EnterpriseForm
            title="Create a new record"
            subtitle="Use this reusable form block across modules and workflows."
            fields={[
              { name: 'name', label: 'Full name', placeholder: 'Enter full name', hint: 'Required for onboarding' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'name@company.com', hint: 'Work email only' },
              { name: 'department', label: 'Department', placeholder: 'Operations', hint: 'Used for reporting' },
            ]}
          />

          <div className={`p-6 ${appTheme.shell}`}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Team overview</h2>
                <p className={`mt-1 text-sm ${appTheme.muted}`}>Shared table component for enterprise grids.</p>
              </div>
            </div>
            <Table columns={columns} data={rows} caption="Active workforce" />
          </div>
        </section>
      </div>
    </main>
  )
}
