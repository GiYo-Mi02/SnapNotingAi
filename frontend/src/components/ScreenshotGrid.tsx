import type { Screenshot } from '../types/api'

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) {
      return 'Unknown time'
    }
    return date.toLocaleTimeString()
  } catch {
    return 'Unknown time'
  }
}

interface ScreenshotGridProps {
  screenshots: Screenshot[]
}

export const ScreenshotGrid = ({ screenshots }: ScreenshotGridProps) => {
  if (screenshots.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center text-sm text-slate-400">
        No screenshots captured yet. Start a capture session to populate this feed.
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {screenshots.map((shot) => (
        <figure key={shot.id} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">
          <img
            src={shot.image_url}
            alt={`Screenshot taken at ${formatDate(shot.created_at)}`}
            className="h-48 w-full object-cover"
          />
          <figcaption className="border-t border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-400">
            Captured {formatDate(shot.created_at)}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
