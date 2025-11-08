import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { CaptureControls } from './components/CaptureControls'
import { ScreenshotGrid } from './components/ScreenshotGrid'
import { SummaryPanel } from './components/SummaryPanel'
import { StatusBadge } from './components/StatusBadge'
import { ManualInputPanel } from './components/ManualInputPanel'
import { AppNavbar } from './components/AppNavbar'
import { QuizPage } from './pages/QuizPage'
import { HistoryPage } from './pages/HistoryPage'
import { LandingPage } from './pages/LandingPage'
import { LogoSection } from './components/LogoSection'
import { SettingsPage } from './pages/SettingsPage'
import { PricingPage } from './pages/PricingPage'
import { AboutPage } from './pages/AboutPage'
import { useScreenCapture } from './hooks/useScreenCapture'
import { useTheme } from './context/ThemeContext'
import {
  createSession,
  fetchResults,
  fetchScreenshots,
  processSession,
  stopSession,
  uploadScreenshot
} from './lib/api'
import type { Result, Screenshot, Session } from './types/api'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HistoryIconMUI from '@mui/icons-material/History'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import HomeIcon from '@mui/icons-material/Home'

const defaultInterval = 15000

const App = () => {
  const { theme, toggleTheme } = useTheme()
  const [showLanding, setShowLanding] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard') // 'dashboard' | 'settings' | 'pricing' | 'about'
  const [session, setSession] = useState<Session | null>(null)
  const [screenshots, setScreenshots] = useState<Screenshot[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [captureInterval, setCaptureInterval] = useState(defaultInterval)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizNumQuestions, setQuizNumQuestions] = useState<number | null>(null)
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

  const handleManualSessionCreated = useCallback((sessionId: string) => {
    // Reset state for new manual session
    setSession(null)
    setScreenshots([])
    setResult(null)
    setShowQuiz(false)
    setViewingHistoricalSession(false)
    
    // Set processing state and poll for results
    setIsProcessing(true)
    
    const pollManualResults = async () => {
      try {
        const result = await pollForResults(sessionId)
        if (result) {
          setResult(result)
        }
      } catch (err) {
        setError('Failed to retrieve results')
      } finally {
        setIsProcessing(false)
      }
    }
    
    pollManualResults()
  }, [pollForResults])

  const activeStatus = useMemo(() => {
    if (session === null) {
      return 'idle'
    }
    if (isProcessing) {
      return 'processing'
    }
    return session.status
  }, [isProcessing, session])

  // History Page (check before landing page)
  if (showHistory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 light:from-white light:via-slate-50 light:to-slate-100 transition-colors duration-200">
        <AppNavbar 
          onBack={() => setShowHistory(false)}
          onHome={() => setShowLanding(true)}
        />
        <HistoryPage />
      </div>
    )
  }

  // Landing Page
  if (showLanding) {
    return (
      <LandingPage onEnterApp={() => setShowLanding(false)} />
    )
  }

  // Settings Page
  if (currentPage === 'settings') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 light:from-white light:via-slate-50 light:to-slate-100 transition-colors duration-200">
        <AppNavbar 
          onBack={() => setCurrentPage('dashboard')}
          onHome={() => setShowLanding(true)}
        />
        <SettingsPage />
      </div>
    )
  }

  // Pricing Page
  if (currentPage === 'pricing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 light:from-white light:via-slate-50 light:to-slate-100 transition-colors duration-200">
        <AppNavbar 
          onBack={() => setCurrentPage('dashboard')}
          onHome={() => setShowLanding(true)}
        />
        <PricingPage />
      </div>
    )
  }

  // About Page
  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 light:from-white light:via-slate-50 light:to-slate-100 transition-colors duration-200">
        <AppNavbar 
          onBack={() => setCurrentPage('dashboard')}
          onHome={() => setShowLanding(true)}
        />
        <AboutPage />
      </div>
    )
  }

  if (showQuiz && result?.quiz) {
    // Filter quiz to the selected number of questions if specified
    const quizToShow = quizNumQuestions && quizNumQuestions < result.quiz.length 
      ? result.quiz.slice(0, quizNumQuestions)
      : result.quiz
    
    return (
      <QuizPage 
        questions={quizToShow} 
        onBack={() => {
          setShowQuiz(false)
          setQuizNumQuestions(null)
          // If viewing historical session, go back to history view
          if (viewingHistoricalSession) {
            window.history.replaceState({}, '', window.location.pathname)
          }
        }}
      />
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
            onOpenQuiz={(numQuestions) => {
              setQuizNumQuestions(numQuestions || null)
              setShowQuiz(true)
            }}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 from-white via-slate-50 to-slate-100 light:from-white light:via-slate-50 light:to-slate-100 transition-colors duration-200">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/80 dark:backdrop-blur-xl light:backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Section */}
            <LogoSection />

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-100 hover:bg-slate-800/50 transition-colors font-medium text-sm">
                <DashboardIcon sx={{ fontSize: 18 }} />
                Dashboard
              </button>
              <button 
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors font-medium text-sm"
              >
                <HistoryIconMUI sx={{ fontSize: 18 }} />
                History
              </button>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {session !== null && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-mono text-slate-300">Session {session.id.slice(0, 6)}</span>
                </div>
              )}
              <StatusBadge status={activeStatus} />
              <button 
                onClick={() => setCurrentPage('pricing')}
                className="hidden md:block px-3 py-1.5 text-slate-300 hover:text-white transition-colors font-medium text-sm"
              >
                Pricing
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className="hidden md:block px-3 py-1.5 text-slate-300 hover:text-white transition-colors font-medium text-sm"
              >
                About
              </button>
              <button 
                onClick={() => setCurrentPage('settings')}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors"
              >
                <SettingsIcon sx={{ fontSize: 20 }} />
              </button>
              <button 
                onClick={() => setShowLanding(true)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors"
                title="Go to Home / Landing Page"
              >
                <HomeIcon sx={{ fontSize: 20 }} />
              </button>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors dark:hover:bg-slate-700/50"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? (
                  <LightModeIcon sx={{ fontSize: 20 }} />
                ) : (
                  <DarkModeIcon sx={{ fontSize: 20 }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="rounded-2xl border border-slate-800/50 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-slate-900/10 p-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome back! 👋</h2>
                <p className="text-slate-400">Start a new session or continue working on your notes</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-2">Current Status</p>
                <StatusBadge status={activeStatus} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout - Single Column */}
        <div className="space-y-8">
          {/* Capture Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-blue-500"></span>
              Screen Capture
            </h3>
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
          </div>

          {/* Manual Input Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-blue-500"></span>
              Input Options
            </h3>
            <ManualInputPanel 
              onSessionCreated={handleManualSessionCreated}
              isProcessing={isProcessing}
            />
          </div>

          {/* Screenshots Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-blue-500"></span>
                Captured Frames
              </h3>
              {screenshots.length > 0 && (
                <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-medium">
                  {screenshots.length} screenshots
                </span>
              )}
            </div>
            <ScreenshotGrid screenshots={screenshots} />
          </div>

          {/* Results Section at Bottom */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-purple-500"></span>
              Results
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <SummaryPanel 
                  result={result} 
                  isProcessing={isProcessing}
                  onOpenQuiz={(numQuestions) => {
                    setQuizNumQuestions(numQuestions || null)
                    setShowQuiz(true)
                  }}
                  onOpenHistory={() => setShowHistory(true)}
                />
              </div>

              {/* Quick Stats */}
              <div className="rounded-2xl border border-slate-800/50 bg-slate-900/40 p-6 space-y-4">
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                    <span className="text-sm text-slate-400">Session ID</span>
                    <span className="text-xs font-mono text-slate-200">{session?.id.slice(0, 12) || 'None'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                    <span className="text-sm text-slate-400">Capture Status</span>
                    <span className="text-xs">
                      <StatusBadge status={activeStatus} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Error Notification */}
      {error !== null && (
        <div className="fixed bottom-6 right-6 rounded-xl border border-rose-500/50 bg-rose-500/10 backdrop-blur px-4 py-3 text-sm text-rose-100 shadow-lg max-w-sm">
          <div className="font-medium mb-1">Error occurred</div>
          <div className="text-rose-100/80">{error}</div>
        </div>
      )}
    </div>
  )
}

export default App
