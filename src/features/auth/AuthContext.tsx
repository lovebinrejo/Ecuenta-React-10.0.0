import { createContext, useContext, useMemo, type ReactNode } from 'react'

export interface AuthUser {
  firstname: string
  lastname: string
  login: string
  admin: boolean
}

interface AuthContextValue {
  user: AuthUser | null
  rights: Record<string, Record<string, boolean>>
  status: 'loading' | 'authenticated' | 'anonymous'
  login: () => Promise<AuthUser>
  logout: () => void
  hasRight: (module: string, action: string) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

// Stubbed: this project has no backend of its own (the ported Sidebar/Navbar
// chrome came from a separate app with a real Dolibarr-backed API). Rather
// than wire real network calls to that other project's backend, this always
// reports an authenticated placeholder user so the ported UI renders as
// intended without any network dependency.
const STUB_USER: AuthUser = { firstname: 'Vox', lastname: 'Admin', login: 'admin', admin: true }

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AuthContextValue>(
    () => ({
      user: STUB_USER,
      rights: {},
      status: 'authenticated',
      login: async () => STUB_USER,
      logout: () => {},
      hasRight: () => true,
    }),
    [],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
