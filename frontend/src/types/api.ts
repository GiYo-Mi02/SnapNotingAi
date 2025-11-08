export interface Session {
  id: string
  status: 'active' | 'processing' | 'completed' | 'failed'
  created_at: string
  stopped_at?: string | null
}

export interface Screenshot {
  id: string
  session_id: string
  image_url: string
  created_at: string
  ocr_text?: string | null
}

export type QuizQuestionType = 'multiple-choice' | 'short-answer'

export interface QuizOption {
  label: string
  value: string
}

export interface QuizQuestion {
  question: string
  type: QuizQuestionType
  answer?: string
  correct_answer?: string
  option_a?: string
  option_b?: string
  option_c?: string
  option_d?: string
  options?: QuizOption[]
}

export interface Result {
  id: string
  session_id: string
  summary: string
  quiz: QuizQuestion[]
  created_at: string
}
