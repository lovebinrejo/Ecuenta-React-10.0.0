export interface BookingRow {
  bookingRef: string
  customer: string
  checkIn: string
  checkOut: string
  status: string
}

export interface HotelSummary {
  totalRooms: number
  availableRooms: number
  bookedRooms: number
  checkedInRooms: number
  totalBookings: number
  todaysBookings: number
  todaysCheckIns: number
  todaysCheckOuts: number
  pendingBookings: number
  recentBookings: BookingRow[]
}

const STUB_SUMMARY: HotelSummary = {
  totalRooms: 0,
  availableRooms: 0,
  bookedRooms: 0,
  checkedInRooms: 0,
  totalBookings: 0,
  todaysBookings: 0,
  todaysCheckIns: 0,
  todaysCheckOuts: 0,
  pendingBookings: 0,
  recentBookings: [],
}

// Stubbed: the real version calls the custom booking module's room/booking
// stats (room status counts, today's bookings/check-ins/check-outs, recent
// bookings list). This project has no backend of its own, so it always
// reports the same all-zero/empty summary, matching the reference dashboard
// on a fresh install with no rooms or bookings configured yet.
export function useHotelSummary() {
  return { data: STUB_SUMMARY, isError: false, isLoading: false }
}
