import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Result } from '../types/api'
import { QuizSettingsModal } from './QuizSettingsModal'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import HistoryIcon from '@mui/icons-material/History'
import ArticleIcon from '@mui/icons-material/Article'
import SchoolIcon from '@mui/icons-material/School'

interface SummaryPanelProps {
  result: Result | null
  isProcessing: boolean
  onOpenQuiz?: (numQuestions?: number) => void
  onOpenHistory?: () => void
}

export const SummaryPanel = ({ result, isProcessing, onOpenQuiz, onOpenHistory }: SummaryPanelProps) => {
  const [showQuizSettings, setShowQuizSettings] = useState(false)
  if (isProcessing) {
    return (
      <div className="space-y-4 rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-6 shadow-lg shadow-slate-950/20 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Processing…</h2>
            <p className="text-xs text-slate-400 mt-1">Extracting notes and generating quiz</p>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
      </div>
    )
  }

  if (result === null) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700/50 bg-slate-900/20 p-8 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
          <ArticleIcon sx={{ fontSize: 24, color: '#94a3b8' }} />
        </div>
        <p className="text-sm text-slate-400 mb-4">No results yet</p>
        <p className="text-xs text-slate-500 mb-4">Start a capture session or submit content to see summaries here</p>
        {onOpenHistory && (
          <button
            onClick={onOpenHistory}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-colors font-medium text-sm"
          >
            <HistoryIcon sx={{ fontSize: 16 }} />
            View History
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-6 shadow-lg shadow-slate-950/20 backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/30">
        <div className="flex items-center gap-2">
          <ArticleIcon sx={{ fontSize: 20, color: '#60a5fa' }} />
          <h2 className="text-lg font-semibold text-slate-100">Summary</h2>
        </div>
        <div className="flex gap-2">
          {onOpenQuiz && result?.quiz && result.quiz.length > 0 && (
            <button
              onClick={() => setShowQuizSettings(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg transition-all font-medium text-xs shadow-lg shadow-purple-500/20"
            >
              <PlayCircleIcon sx={{ fontSize: 14 }} />
              Quiz
            </button>
          )}
        </div>
      </div>

      {/* Summary Content */}
      <article className="prose prose-invert max-w-none text-sm prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:text-yellow-300 prose-code:bg-slate-800/50 prose-li:text-slate-300 prose-ol:text-slate-300">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.summary}</ReactMarkdown>
      </article>

      {/* Quiz Preview - Show if quiz items available */}
      {result?.quiz && result.quiz.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800/30">
          <div className="flex items-center gap-2">
            <SchoolIcon sx={{ fontSize: 18, color: '#a78bfa' }} />
            <h3 className="text-sm font-semibold text-slate-100">Quiz Preview</h3>
            <span className="ml-auto text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded font-medium">
              {result.quiz.length} Q
            </span>
          </div>
          
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {result.quiz.slice(0, 3).map((question, index) => (
              <div key={`${question.question}-${index}`} className="rounded-lg border border-slate-800/30 bg-slate-800/30 p-3 hover:bg-slate-800/50 transition-colors">
                <p className="font-medium text-slate-100 text-xs mb-2">{index + 1}. {question.question}</p>
                <div className="space-y-1">
                  {question.options?.slice(0, 2).map(opt => (
                    <div key={opt.value} className="flex items-center gap-2 text-xs">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
                      <span className="text-slate-300">{opt.label.slice(0, 30)}...</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {result.quiz.length > 3 && (
            <p className="text-xs text-slate-400 italic text-center py-2">
              +{result.quiz.length - 3} more questions available
            </p>
          )}

          {/* Full Quiz Button */}
          {onOpenQuiz && (
            <button
              onClick={() => setShowQuizSettings(true)}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg transition-all font-semibold text-sm shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              <PlayCircleIcon sx={{ fontSize: 16 }} />
              Start Full Quiz ({result.quiz.length} questions)
            </button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2 border-t border-slate-800/30">
        {onOpenHistory && (
          <button
            onClick={onOpenHistory}
            className="flex-1 px-3 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-100 rounded-lg transition-colors font-medium text-xs flex items-center justify-center gap-1.5"
          >
            <HistoryIcon sx={{ fontSize: 14 }} />
            View History
          </button>
        )}
      </div>

      {/* Quiz Settings Modal */}
      {showQuizSettings && result?.quiz && result.quiz.length > 0 && (
        <QuizSettingsModal 
          totalQuestions={result.quiz.length}
          onStart={(numQuestions) => {
            setShowQuizSettings(false)
            onOpenQuiz?.(numQuestions)
          }}
          onCancel={() => setShowQuizSettings(false)}
        />
      )}
    </div>
  )
}

export default SummaryPanel
