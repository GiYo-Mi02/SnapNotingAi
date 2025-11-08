import { useState, useMemo } from 'react'
import type { QuizQuestion } from '../types/api'

interface QuizPageProps {
  questions: QuizQuestion[]
  onBack: () => void
}

export function QuizPage({ questions, onBack }: QuizPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const score = useMemo(() => {
    let correct = 0
    questions.forEach((q, idx) => {
      const userAnswer = userAnswers[idx]
      const correctAnswer = q.answer
      if (userAnswer === correctAnswer) {
        correct++
      }
    })
    return correct
  }, [userAnswers, questions])

  const handleSelectAnswer = (value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: value
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const isAnswered = currentQuestionIndex in userAnswers

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <button
              onClick={onBack}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-slate-100">Quiz Complete! 🎉</h1>

            <div className="text-center mb-12">
              <div className="text-7xl font-bold text-blue-500 mb-4">{percentage}%</div>
              <p className="text-2xl text-slate-200 mb-2">
                You got <span className="font-bold text-blue-400">{score}</span> out of <span className="font-bold text-blue-400">{questions.length}</span> questions correct
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-slate-100 mb-6">Answer Review</h2>
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const userAnswer = userAnswers[idx]
                  const correctAnswer = q.answer
                  const isCorrect = userAnswer === correctAnswer
                  const selectedOption = q.options?.find(opt => opt.value === userAnswer)
                  const correctOption = q.options?.find(opt => opt.value === correctAnswer)

                  return (
                    <div key={idx} className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                      <p className="font-semibold text-slate-100 mb-3">{idx + 1}. {q.question}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Your answer:</span>
                          <span className={isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                            {selectedOption?.label || 'Not answered'}
                          </span>
                          {isCorrect && <span className="text-emerald-400">✓</span>}
                          {!isCorrect && <span className="text-rose-400">✗</span>}
                        </div>

                        {!isCorrect && (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <span>Correct answer:</span>
                            <span className="font-semibold">{correctOption?.label}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onBack}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <button
            onClick={onBack}
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-bold text-slate-100">Quiz</h1>
              <span className="text-sm font-medium text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-100 mb-8">{currentQuestion.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => {
                const isSelected = userAnswers[currentQuestionIndex] === option.value
                const isCorrect = option.value === currentQuestion.answer

                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelectAnswer(option.value)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/20'
                        : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-600'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className={`font-medium text-lg ${isSelected ? 'text-blue-300' : 'text-slate-300'}`}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 justify-between pt-8 border-t border-slate-800">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              {isAnswered ? (
                <span className="flex items-center gap-2 text-emerald-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Answered
                </span>
              ) : (
                <span className="text-slate-500">Please select an answer</span>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish →' : 'Next →'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
