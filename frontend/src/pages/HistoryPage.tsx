import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { LogoSection } from '../components/LogoSection'
import { listAllSessions } from '../lib/api'
import type { Session } from '../types/api'
import { formatDate } from '../lib/dateUtils'
import HistoryIcon from '@mui/icons-material/History'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ScheduleIcon from '@mui/icons-material/Schedule'
import ErrorIcon from '@mui/icons-material/Error'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

interface SessionWithPreview extends Session {
  summary_preview: string | null
}

const ITEMS_PER_PAGE = 10

export function HistoryPage() {
  const { theme } = useTheme()
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon sx={{ fontSize: 24, color: '#10b981' }} />
      case 'processing':
        return <ScheduleIcon sx={{ fontSize: 24, color: '#f59e0b' }} />
      case 'failed':
        return <ErrorIcon sx={{ fontSize: 24, color: '#ef4444' }} />
      default:
        return <HistoryIcon sx={{ fontSize: 24, color: '#3b82f6' }} />
    }
  }

  const getStatusBadgeClass = (status: string) => {
    const base = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold'
    switch (status) {
      case 'completed':
        return `${base} bg-emerald-500/20 text-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 light:bg-emerald-100 light:text-emerald-800`
      case 'processing':
        return `${base} bg-amber-500/20 text-amber-300 dark:bg-amber-500/20 dark:text-amber-300 light:bg-amber-100 light:text-amber-800`
      case 'failed':
        return `${base} bg-red-500/20 text-red-300 dark:bg-red-500/20 dark:text-red-300 light:bg-red-100 light:text-red-800`
      default:
        return `${base} bg-blue-500/20 text-blue-300 dark:bg-blue-500/20 dark:text-blue-300 light:bg-blue-100 light:text-blue-800`
    }
  }

  if (loading && sessions.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10 animate-fadeIn">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 animate-pulse">Loading history...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10 animate-fadeIn">
        <div className="flex items-center justify-center min-h-96">
          <div className="rounded-xl border border-red-500/50 bg-red-500/10 dark:bg-red-500/10 light:bg-red-50 px-6 py-4 text-center animate-slideInUp">
            <p className="font-bold text-red-400 dark:text-red-400 light:text-red-600 mb-2">Error Loading History</p>
            <p className="text-red-300 dark:text-red-300 light:text-red-700">{error}</p>
          </div>
        </div>
      </main>
    )
  }

  if (sessions.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10 animate-fadeIn">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center animate-slideInUp">
            <HistoryIcon sx={{ fontSize: 48, color: '#94a3b8', marginBottom: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            <p className="text-slate-200 dark:text-slate-200 light:text-slate-700 text-lg mb-2 font-semibold">No sessions yet</p>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">Start a new capture session to see it here</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl animate-slideInDown">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <LogoSection />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 animate-fadeIn">
        {/* History Header */}
        <div className="mb-12 animate-slideInDown">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-bounce-soft">
              <HistoryIcon sx={{ fontSize: 24, color: 'white' }} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white dark:text-white light:text-slate-900 animate-slideInLeft">Session History</h1>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1 animate-slideInLeft" style={{ animationDelay: '0.1s' }}>View and manage your past sessions</p>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
      <div className="grid gap-6 mb-8 animate-stagger">
        {sessions.map((session, idx) => (
          <div
            key={session.id}
            className="group rounded-2xl border border-slate-800/50 dark:border-slate-800/50 light:border-slate-200/50 bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-50/40 p-6 hover:border-blue-500/50 dark:hover:border-blue-500/50 light:hover:border-blue-400/50 transition-all duration-200 hover:shadow-lg dark:hover:shadow-lg/20 light:hover:shadow-md transform hover:scale-102 animate-slideInUp"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            {/* Session Header */}
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-800/50 dark:border-slate-800/50 light:border-slate-200/50">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white dark:text-white light:text-slate-900">
                      Session {session.id.substring(0, 8)}
                    </h2>
                  </div>
                  <div className={`${getStatusBadgeClass(session.status)} animate-pulse-soft`}>
                    {getStatusIcon(session.status)}
                    <span className="capitalize">{session.status}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
                  {formatDate(session.created_at)}
                </p>
              </div>
            </div>

            {/* Session Summary */}
            {session.summary_preview && (
              <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-200/30 rounded-xl p-4 mb-6 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-300/50 hover:border-slate-600/50 dark:hover:border-slate-600/50 light:hover:border-slate-300 transition-all">
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm line-clamp-2">
                  {session.summary_preview}
                  {session.summary_preview.length >= 150 && '...'}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <a
                href={`/?session=${session.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 light:from-blue-500 light:to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-800 light:hover:from-blue-600 light:hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-500/50 transform hover:scale-105"
              >
                <PlayCircleIcon sx={{ fontSize: 18 }} />
                View Results
              </a>
              {session.status === 'completed' && (
                <a
                  href={`/?session=${session.id}&quiz=true`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 light:from-purple-500 light:to-purple-600 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-700 dark:hover:to-purple-800 light:hover:from-purple-600 light:hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/50 dark:hover:shadow-purple-500/50 transform hover:scale-105"
                >
                  <PlayCircleIcon sx={{ fontSize: 18 }} />
                  Take Quiz
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-6 rounded-xl border border-slate-800/50 dark:border-slate-800/50 light:border-slate-200/50 bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-50/40 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={goToPreviousPage}
          disabled={page === 0}
          className="px-6 py-2 rounded-lg bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-200/50 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-slate-300/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold transform hover:scale-105"
        >
          ← Previous
        </button>

        <span className="text-slate-400 dark:text-slate-400 light:text-slate-600 font-medium animate-pulse-soft">
          Page {page + 1} {hasMore && '(more available)'}
        </span>

        <button
          onClick={goToNextPage}
          disabled={!hasMore}
          className="px-6 py-2 rounded-lg bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-200/50 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-slate-300/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold transform hover:scale-105"
        >
          Next →
        </button>
      </div>
    </main>
    </div>
  )
}
