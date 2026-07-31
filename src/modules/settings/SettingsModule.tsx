import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { InputField } from '../../components/ui/InputField'
import { appTheme } from '../../themes/theme'

export function SettingsModule() {
  const [email, setEmail] = useState('admin@example.com')
  const [team, setTeam] = useState('Product')

  return (
    <section className={`${appTheme.shell} space-y-6`}>
      <div>
        <p className={`text-sm font-semibold uppercase tracking-[0.27em] ${appTheme.accent}`}>Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Workspace configuration</h1>
        <p className={`mt-2 text-sm ${appTheme.muted}`}>Manage core app settings and identity preferences.</p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Admin email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <InputField
          label="Team name"
          value={team}
          onChange={(event) => setTeam(event.target.value)}
        />
      </div>

      <Button type="button">Save settings</Button>
    </section>
  )
}
