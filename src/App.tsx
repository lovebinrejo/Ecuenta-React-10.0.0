import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppShell } from './app/AppShell'
import { queryClient } from './api/queryClient'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './features/auth/AuthContext'
import { LoginModule } from './modules/auth/LoginModule'
import { DashboardModule } from './modules/dashboard/DashboardModule'
import { UsersModule } from './modules/users/UsersModule'
import { ReportsModule } from './modules/reports/ReportsModule'
import { SettingsModule } from './modules/settings/SettingsModule'

function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginModule />} />
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardModule />} />
                <Route path="/users" element={<UsersModule />} />
                <Route path="/reports" element={<ReportsModule />} />
                <Route path="/settings" element={<SettingsModule />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
