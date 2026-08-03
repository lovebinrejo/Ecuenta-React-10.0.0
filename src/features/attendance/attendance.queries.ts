export interface AttendanceStatus {
  isClockedIn: boolean
  clockInTime: string | null
  workingHours: number
}

// Stubbed: the real version reads/writes llx_payroll_essentials_attendances
// on this app's backend. This project has no backend of its own, so status
// always reports "not clocked in" and the clock in/out actions are no-ops —
// same honest-placeholder convention as the rest of this ported chrome.
export function useAttendanceStatus() {
  return { data: { isClockedIn: false, clockInTime: null, workingHours: 0 } as AttendanceStatus, isLoading: false }
}

export function useClockIn() {
  return { mutateAsync: async (_note?: string) => {}, isPending: false }
}

export function useClockOut() {
  return { mutateAsync: async (_note?: string) => {}, isPending: false }
}
