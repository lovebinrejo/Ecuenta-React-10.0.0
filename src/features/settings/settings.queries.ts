// Stubbed: the real version calls this app's backend for llx_const rows.
// This project has no backend of its own, so it always returns an empty
// result — AccountPanel falls back to '-' placeholders for every field.
export function useConsts(_names: string[]) {
  return { data: {} as Record<string, string>, isLoading: false }
}
