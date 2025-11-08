export type SessionStatus = 'active' | 'processing' | 'completed' | 'failed'

export interface SessionRecord {
  id: string
  user_id?: string | null
  created_at: string
  stopped_at?: string | null
  status: SessionStatus
}

export interface ScreenshotRecord {
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
  options?: QuizOption[]
  answer: string
}

export interface ResultRecord {
  id: string
  session_id: string
  summary: string
  quiz: QuizQuestion[]
  created_at: string
}
