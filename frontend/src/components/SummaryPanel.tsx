import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Result } from '../types/api'

interface SummaryPanelProps {
  result: Result | null
  isProcessing: boolean
  onOpenQuiz?: () => void
  onOpenHistory?: () => void
}

export const SummaryPanel = ({ result, isProcessing, onOpenQuiz, onOpenHistory }: SummaryPanelProps) => {
  if (isProcessing) {
    return (
      <div className="space-y-4 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6">
        <h2 className="text-lg font-semibold text-slate-100">AI Processing</h2>
        <p className="text-sm text-slate-300">
          Hold tight! We are extracting notes and generating a quiz from your captured slides.
        </p>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-brand" />
        </div>
      </div>
    )
  }

  if (result === null) {
    return (
      <div className="space-y-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
        <p>Summaries will appear here after you finish a capture session.</p>
        {onOpenHistory && (
          <button
            onClick={onOpenHistory}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            View History
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Summary</h2>
        <div className="flex gap-2">
          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center justify-center px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-xs"
            >
              Take Quiz
            </button>
          )}
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs"
            >
              History
            </button>
          )}
        </div>
      </div>

      <article className="prose prose-invert max-w-none text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.summary}</ReactMarkdown>
      </article>

      <div>
        <h3 className="text-md font-semibold text-slate-100 mb-4">Quiz Preview</h3>
        <ul className="space-y-4 text-sm text-slate-200">
          {result.quiz.slice(0, 2).map((question, index) => (
            <li key={`${question.question}-${index}`} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="font-medium">{question.question}</p>
              <div className="mt-2 space-y-1 text-slate-300 text-xs">
                {question.options?.map(opt => (
                  <div key={opt.value} className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                    {opt.value}. {opt.label}
                  </div>
                ))}
              </div>
            </li>
          ))}
          {result.quiz.length > 2 && (
            <p className="text-xs text-slate-400 italic">
              +{result.quiz.length - 2} more questions in the full quiz
            </p>
          )}
        </ul>
      </div>

      {onOpenQuiz && (
        <button
          onClick={onOpenQuiz}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          Take Full Quiz ({result.quiz.length} questions)
        </button>
      )}
    </div>
  )
}

export default SummaryPanel
