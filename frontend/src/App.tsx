import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { CaptureControls } from './components/CaptureControls'
import { ScreenshotGrid } from './components/ScreenshotGrid'
import { SummaryPanel } from './components/SummaryPanel'
import { StatusBadge } from './components/StatusBadge'
import { QuizPage } from './pages/QuizPage'
import { HistoryPage } from './pages/HistoryPage'
import { useScreenCapture } from './hooks/useScreenCapture'
import {
  createSession,
  fetchResults,
  fetchScreenshots,
  processSession,
  stopSession,
  uploadScreenshot
} from './lib/api'
import type { Result, Screenshot, Session } from './types/api'

const defaultInterval = 15000

const App = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [screenshots, setScreenshots] = useState<Screenshot[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [captureInterval, setCaptureInterval] = useState(defaultInterval)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [viewingHistoricalSession, setViewingHistoricalSession] = useState(false)
  const sessionRef = useRef<Session | null>(null)

  // Handle query params for loading session from history
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session')
    const quiz = params.get('quiz')

    if (sessionId) {
      const loadSessionResult = async () => {
        try {
          setViewingHistoricalSession(true)
          const sessionResult = await fetchResults(sessionId)
          if (sessionResult) {
            setResult(sessionResult)
            if (quiz === 'true') {
              setShowQuiz(true)
            }
          } else {
            setError('Session results not found')
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load session')
        }
      }
      loadSessionResult()
    }
  }, [])

  const handleCapture = useCallback(async (blob: Blob) => {
    const activeSession = sessionRef.current
    if (activeSession === null) {
      return
    }
    try {
      const stored = await uploadScreenshot(activeSession.id, blob)
      setScreenshots((prev: Screenshot[]) => [...prev, stored])
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Failed to upload screenshot')
    }
  }, [])

  const { status: captureStatus, error: captureError, start, stop } = useScreenCapture({
    intervalMs: captureInterval,
    onCapture: handleCapture
  })

  const beginSession = useCallback(async () => {
    setError(null)
    if (captureStatus === 'running' || captureStatus === 'starting') {
      return
    }
    try {
      const created = await createSession()
      sessionRef.current = created
      setSession(created)
      setScreenshots([])
      setResult(null)
      await start()
    } catch (startError) {
      setError(startError instanceof Error ? startError.message : 'Failed to start session')
    }
  }, [captureStatus, start])

  const pollForResults = useCallback(async (sessionId: string): Promise<Result | null> => {
    const timeout = Date.now() + 120000
    while (Date.now() < timeout) {
      try {
        const current = await fetchResults(sessionId)
        if (current !== null) {
          return current
        }
      } catch (pollError) {
        setError(pollError instanceof Error ? pollError.message : 'Failed to fetch results')
      }
      await new Promise((resolve) => setTimeout(resolve, 4000))
    }
    setError('Timed out waiting for AI results')
    return null
  }, [])

  const endSession = useCallback(async () => {
    const activeSession = sessionRef.current
    if (activeSession === null) {
      return
    }
    setIsProcessing(true)
    setError(null)
    try {
      stop()
      const updated = await stopSession(activeSession.id)
      setSession(updated)
      await processSession(activeSession.id)
      const [latestScreenshots, pipelineResult] = await Promise.all([
        fetchScreenshots(activeSession.id),
        pollForResults(activeSession.id)
      ])
      setScreenshots(latestScreenshots)
      if (pipelineResult !== null) {
        setResult(pipelineResult)
        setSession({ ...updated, status: 'completed' })
      }
    } catch (stopError) {
      setError(stopError instanceof Error ? stopError.message : 'Failed to process session')
    } finally {
      setIsProcessing(false)
      sessionRef.current = null
    }
  }, [pollForResults, stop])

  const activeStatus = useMemo(() => {
    if (session === null) {
      return 'idle'
    }
    if (isProcessing) {
      return 'processing'
    }
    return session.status
  }, [isProcessing, session])

  if (showQuiz && result?.quiz) {
    return (
      <QuizPage 
        questions={result.quiz} 
        onBack={() => {
          setShowQuiz(false)
          // If viewing historical session, go back to history view
          if (viewingHistoricalSession) {
            window.history.replaceState({}, '', window.location.pathname)
          }
        }}
      />
    )
  }

  if (showHistory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <button
              onClick={() => {
                setShowHistory(false)
                // Clear URL params when going back
                window.history.replaceState({}, '', window.location.pathname)
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
        </header>
        <HistoryPage />
      </div>
    )
  }

  // View historical session results (not the capture dashboard)
  if (viewingHistoricalSession && result && !showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <button
              onClick={() => {
                setViewingHistoricalSession(false)
                setResult(null)
                setShowQuiz(false)
                // Clear URL params when going back
                window.history.replaceState({}, '', window.location.pathname)
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              ← Back to History
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-10">
          <SummaryPanel 
            result={result} 
            isProcessing={false}
            onOpenQuiz={() => setShowQuiz(true)}
            onOpenHistory={() => {
              setViewingHistoricalSession(false)
              setResult(null)
              setShowHistory(true)
            }}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">SnapNotesAI</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Automate your lecture notes with screen capture, OCR, summarisation, and instant quizzes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={activeStatus} />
            {session !== null && (
              <div className="text-xs text-slate-400">
                Session <span className="font-mono text-slate-200">{session.id.slice(0, 8)}</span>
              </div>
            )}
            <button
              onClick={() => setShowHistory(true)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              History
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[2fr,1.3fr]">
        <section className="space-y-6">
          <CaptureControls
            isActive={captureStatus === 'running'}
            captureStatus={captureStatus}
            processing={isProcessing}
            intervalMs={captureInterval}
            onIntervalChange={setCaptureInterval}
            onStart={beginSession}
            onStop={endSession}
            error={error ?? captureError}
          />

          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-100">Captured Screens</h2>
            <ScreenshotGrid screenshots={screenshots} />
          </div>
        </section>

        <aside>
          <SummaryPanel 
            result={result} 
            isProcessing={isProcessing}
            onOpenQuiz={() => setShowQuiz(true)}
            onOpenHistory={() => setShowHistory(true)}
          />
        </aside>
      </main>

      {error !== null && (
        <div className="fixed bottom-6 right-6 rounded-xl border border-rose-500/50 bg-rose-500/20 px-4 py-3 text-sm text-rose-100 shadow-lg">
          {error}
        </div>
      )}
    </div>
  )
}

export default App
