export interface UserRow {
  login: string
  name: string
  employee: boolean
  phone: string
  email: string
  gender: string
  designation: string
  lastLogin: string
  status: 'Enabled' | 'Disabled'
  isAdmin: boolean
}

export interface UsersSummary {
  totalUsers: number
  admins: number
  adminsPos: number
  adminsKot: number
  superAdmins: number
  activeUsers: number
  todayLoginUsers: number
  users: UserRow[]
}

const STUB_SUMMARY: UsersSummary = {
  totalUsers: 0,
  admins: 0,
  adminsPos: 0,
  adminsKot: 0,
  superAdmins: 0,
  activeUsers: 0,
  todayLoginUsers: 0,
  users: [],
}

// Stubbed: the real version calls Dolibarr's user/list stats (total/admin/
// active/today-login counts, plus the user list itself). This project has no
// backend of its own, so it always reports the same all-zero/empty summary —
// there's always at least the logged-in admin in the real app, but this stub
// intentionally shows nothing invented rather than a fake row.
export function useUsersSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
