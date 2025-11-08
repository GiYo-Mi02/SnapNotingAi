import { useEffect, useState } from 'react'
import { listAllSessions } from '../lib/api'
import type { Session } from '../types/api'
import { formatDate } from '../lib/dateUtils'

interface SessionWithPreview extends Session {
  summary_preview: string | null
}

const ITEMS_PER_PAGE = 10

export function HistoryPage() {
  const [sessions, setSessions] = useState<SessionWithPreview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    const loadSessions = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await listAllSessions(ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
        setSessions(data)
        setHasMore(data.length === ITEMS_PER_PAGE)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load history')
        setSessions([])
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [page])

  const goToNextPage = () => {
    if (hasMore) {
      setPage(p => p + 1)
    }
  }

  const goToPreviousPage = () => {
    if (page > 0) {
      setPage(p => p - 1)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading && sessions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading history...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (sessions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">No sessions yet</p>
          <p className="text-gray-500">Start a new capture session to see it here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Session History</h1>

        <div className="grid gap-6">
          {sessions.map(session => (
            <div
              key={session.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Session {session.id.substring(0, 8)}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(session.created_at)}
                  </p>
                </div>
              </div>

              {session.summary_preview && (
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {session.summary_preview}
                    {session.summary_preview.length >= 150 && '...'}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <a
                  href={`/?session=${session.id}`}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Results
                </a>
                {session.status === 'completed' && (
                  <a
                    href={`/?session=${session.id}&quiz=true`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Take Quiz
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goToPreviousPage}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            ← Previous
          </button>

          <span className="text-gray-600">
            Page {page + 1} {hasMore && '(more available)'}
          </span>

          <button
            onClick={goToNextPage}
            disabled={!hasMore}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
