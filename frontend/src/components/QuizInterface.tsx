import { useState, useMemo } from 'react'
import type { QuizQuestion } from '../types/api'

interface QuizInterfaceProps {
  questions: QuizQuestion[]
  onClose: () => void
}

export function QuizInterface({ questions, onClose }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const score = useMemo(() => {
    let correct = 0
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct_answer) {
        correct++
      }
    })
    return correct
  }, [userAnswers, questions])

  const handleSelectAnswer = (option: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: option
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quiz Complete!</h2>

          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-4">{percentage}%</div>
            <p className="text-2xl text-gray-700 mb-2">
              You got {score} out of {questions.length} questions correct
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Review Answers</h3>
            {questions.map((q, idx) => {
              const userAnswer = userAnswers[idx]
              const isCorrect = userAnswer === q.correct_answer
              return (
                <div key={idx} className="mb-4 pb-4 border-b last:border-b-0">
                  <p className="font-medium text-gray-900 mb-2">{idx + 1}. {q.question}</p>
                  <div className="text-sm text-gray-600 mb-1">
                    Your answer: <span className={isCorrect ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {userAnswer || 'Not answered'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="text-sm text-green-600 font-semibold">
                      Correct answer: {q.correct_answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const options: Array<{ key: string; label: string }> = [
    { key: 'option_a', label: 'A' },
    { key: 'option_b', label: 'B' },
    { key: 'option_c', label: 'C' },
    { key: 'option_d', label: 'D' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Quiz</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h3>

          <div className="space-y-3">
            {options.map(({ key, label }) => {
              const optionText = currentQuestion[key as keyof QuizQuestion] as string | undefined
              const isSelected = userAnswers[currentQuestionIndex] === label
              return (
                <button
                  key={label}
                  onClick={() => handleSelectAnswer(label)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                      {label}. {optionText || 'Option missing'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
