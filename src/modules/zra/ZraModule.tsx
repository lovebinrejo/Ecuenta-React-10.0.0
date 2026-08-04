import { useZraSummary } from '../../features/zra/zra.queries'
import { ZraOverview } from '../../features/zra/components/ZraOverview'

export function ZraModule() {
  const { data: summary, isError } = useZraSummary()

  return (
    <div>
      {isError && <p className="text-sm text-danger">Could not load the ZRA dashboard.</p>}
      {!summary && !isError && <p className="text-sm text-text-muted">Loading…</p>}
      {summary && <ZraOverview summary={summary} />}
    </div>
  )
}
