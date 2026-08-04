export interface PayrollSummary {
  totalEmployees: number
  todaysAttendance: number
  shifts: number
  shiftTemplates: number
  leaveRequestsThisMonth: number
  ytdAmountThisMonth: number
  ytdAmountThisMonthLabel: string
  ytdAmountLastMonth: number
  ytdAmountLastMonthLabel: string
  salaryPaidThisMonth: number
  salaryPaidLastMonth: number
  salaryPaidLastMonthLabel: string
}

function monthLabel(monthsAgo: number) {
  const d = new Date()
  d.setMonth(d.getMonth() - monthsAgo)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

const STUB_SUMMARY: PayrollSummary = {
  totalEmployees: 0,
  todaysAttendance: 0,
  shifts: 0,
  shiftTemplates: 0,
  leaveRequestsThisMonth: 0,
  ytdAmountThisMonth: 0,
  ytdAmountThisMonthLabel: monthLabel(0),
  ytdAmountLastMonth: 0,
  ytdAmountLastMonthLabel: monthLabel(1),
  salaryPaidThisMonth: 0,
  salaryPaidLastMonth: 0,
  salaryPaidLastMonthLabel: monthLabel(1),
}

// Stubbed: the real version calls the custom payroll module's stats
// (employee count, today's attendance, shifts/templates, leave requests,
// YTD and monthly salary totals). This project has no backend of its own, so
// it always reports the same all-zero summary, matching the reference
// dashboard on a fresh install with no payroll runs yet.
export function usePayrollSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
