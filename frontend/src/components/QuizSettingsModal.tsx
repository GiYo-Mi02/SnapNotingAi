import { useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

interface QuizSettingsModalProps {
  totalQuestions: number
  onStart: (numQuestions: number) => void
  onCancel: () => void
}

const MIN_QUESTIONS = 15
const MAX_QUESTIONS = 50
const DEFAULT_QUESTIONS = 15

export function QuizSettingsModal({ totalQuestions, onStart, onCancel }: QuizSettingsModalProps) {
  const [numQuestions, setNumQuestions] = useState(
    Math.min(DEFAULT_QUESTIONS, totalQuestions)
  )

  const handleDecrease = () => {
    setNumQuestions(prev => Math.max(MIN_QUESTIONS, prev - 5))
  }

  const handleIncrease = () => {
    setNumQuestions(prev => Math.min(Math.min(MAX_QUESTIONS, totalQuestions), prev + 5))
  }

  const handleStart = () => {
    onStart(numQuestions)
  }

  const percentage = (numQuestions / Math.min(MAX_QUESTIONS, totalQuestions)) * 100

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800/50 max-w-md w-full p-8 shadow-2xl animate-slideInUp">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <TuneIcon sx={{ fontSize: 24, color: 'white' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Quiz Settings</h1>
            <p className="text-sm text-slate-400 mt-1">Customize your quiz experience</p>
          </div>
        </div>

        {/* Number of Questions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <label className="text-slate-100 font-semibold">Number of Questions</label>
            <span className="text-2xl font-bold text-purple-400">{numQuestions}</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
              <span>{MIN_QUESTIONS}</span>
              <span>{Math.min(MAX_QUESTIONS, totalQuestions)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleDecrease}
              disabled={numQuestions <= MIN_QUESTIONS}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-100 rounded-lg transition-colors font-semibold"
            >
              <RemoveIcon sx={{ fontSize: 20 }} />
              Decrease
            </button>
            <button
              onClick={handleIncrease}
              disabled={numQuestions >= Math.min(MAX_QUESTIONS, totalQuestions)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-100 rounded-lg transition-colors font-semibold"
            >
              <AddIcon sx={{ fontSize: 20 }} />
              Increase
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {[15, 30, 50].map(value => {
              const isAvailable = value <= totalQuestions
              return (
                <button
                  key={value}
                  onClick={() => setNumQuestions(Math.min(value, totalQuestions))}
                  disabled={!isAvailable}
                  className={`py-2 rounded-lg font-semibold transition-all text-sm ${
                    numQuestions === value && isAvailable
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/20'
                      : isAvailable
                      ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-800/25 text-slate-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  {value}
                </button>
              )
            })}
          </div>

          {totalQuestions < MAX_QUESTIONS && (
            <p className="text-xs text-slate-400 mt-4 text-center">
              📝 Note: Only {totalQuestions} questions available from this session
            </p>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
          <div className="flex gap-3">
            <div className="text-blue-400 text-lg flex-shrink-0">ℹ️</div>
            <div className="text-sm text-blue-300">
              <p className="font-semibold mb-1">Quiz Info</p>
              <p>You can generate quizzes with 15-50 questions. More questions take longer but provide better practice.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-100 rounded-lg transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleStart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg transition-all font-semibold shadow-lg shadow-purple-500/20"
          >
            <PlayCircleIcon sx={{ fontSize: 18 }} />
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  )
}
