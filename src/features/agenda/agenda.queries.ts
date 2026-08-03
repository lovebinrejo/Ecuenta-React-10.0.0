export interface ActivityEvent {
  id: string | number
  label: string
  category: string
  authorName: string
  date: string
}

interface RecentActivityParams {
  category: string
  limit: number
}

// Stubbed: the real version reads llx_actioncomm activity from this app's
// backend. This project has no backend of its own, so NotificationsPanel
// always renders its honest "no notifications" empty state.
export function useRecentActivity(_params: RecentActivityParams) {
  return { data: [] as ActivityEvent[], isLoading: false }
}
