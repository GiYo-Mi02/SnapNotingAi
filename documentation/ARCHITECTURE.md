# SnapNotesAI - Complete Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER (Frontend)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                      App.tsx                         │   │
│  │  - State: session, screenshots, result              │   │
│  │  - State: showQuiz, showHistory                      │   │
│  │  - Screen capture orchestration                      │   │
│  │  - Results polling loop                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                         │                                     │
│           ┌─────────────┼─────────────┐                      │
│           │             │             │                      │
│  ┌────────▼────────┐ ┌──▼────────┐ ┌─▼──────────────┐       │
│  │ CaptureControls │ │Screenshot │ │  SummaryPanel  │       │
│  │ - Start/Stop    │ │  Grid     │ │  + Quiz Link   │       │
│  │ - Interval      │ │ - Gallery │ │  + History Btn │       │
│  └─────────────────┘ └───────────┘ └────────────────┘       │
│                                             │                 │
│                          ┌──────────────────┼──────────────┐  │
│                          │                  │              │  │
│                    ┌─────▼────┐      ┌─────▼──────┐      │  │
│                    │ QuizModal │      │HistoryPage │      │  │
│                    │           │      │            │      │  │
│                    │ - Questions      │ - Sessions │      │  │
│                    │ - Options A-D    │ - Pagination     │  │
│                    │ - Scoring        │ - Status       │  │
│                    │ - Results        │ - Summary      │  │
│                    └───────────┘      └────────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                   HTTP Requests/Responses
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
┌─────────▼──────────┐ ┌──────▼──────┐ ┌────────▼──────┐
│  createSession     │ │   Upload    │ │  stopSession  │
│  POST /sessions    │ │  Screenshot │ │ POST /stop    │
└────────────────────┘ │ POST /upload│ └───────────────┘
                       └─────────────┘

                              │
                   HTTP Requests/Responses
                              │
┌─────────────────────────────────────────────────────────────┐
│                   EXPRESS SERVER (Backend)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                      Routes                          │   │
│  │  POST   /api/sessions          - createSession      │   │
│  │  GET    /api/sessions          - listAllSessions    │   │
│  │  POST   /api/sessions/:id/upload    - uploadScreenshot   │
│  │  POST   /api/sessions/:id/stop      - stopSession   │   │
│  │  POST   /api/sessions/:id/process   - processSession     │
│  │  GET    /api/sessions/:id/results   - fetchResults  │   │
│  │  GET    /api/sessions/:id/screenshots               │   │
│  └──────────────────────────────────────────────────────┘   │
│                         │                                     │
│           ┌─────────────┼─────────────────────┐              │
│           │             │                     │              │
│  ┌────────▼──────────┐  │        ┌────────────▼───────────┐  │
│  │ sessionController │  │        │  pipelineService      │  │
│  │                   │  │        │  (background worker)  │  │
│  │ - create()        │  │        │                       │  │
│  │ - upload()        │  │        │  - listSessionFiles() │  │
│  │ - stop()          │  │        │  - extractOCR()       │  │
│  │ - fetchResults()  │  │        │  - generateSummary()  │  │
│  │ - listAllSessions │  │        │  - generateQuiz()     │  │
│  │ - etc.            │  │        │  - saveResults()      │  │
│  └───────────────────┘  │        └───────────────────────┘  │
│                         │              │                     │
│  ┌──────────────────────▼──┐           │                     │
│  │ Services Layer:        │           │                     │
│  ├────────────────────────┤           │                     │
│  │ ocrService.ts          │           │                     │
│  │ - extractTextBatch()   │           │                     │
│  │ - extractTextFromImage │           │                     │
│  │                        │           │                     │
│  │ aiService.ts           │           │                     │
│  │ - generateSummary()    │           │                     │
│  │ - generateQuiz()       │           │                     │
│  │                        │           │                     │
│  │ storageService.ts      │           │                     │
│  │ - uploadToStorage()    │           │                     │
│  │ - saveMetadata()       │           │                     │
│  │                        │           │                     │
│  │ (All services + utils) │           │                     │
│  └──────────────────────────┘           │                     │
│                                         │                     │
└─────────────────────────────────────────┼─────────────────────┘
                                          │
                        ┌─────────────────┼─────────────────┐
                        │                 │                 │
                ┌───────▼────────┐ ┌──────▼──────┐ ┌───────▼───────┐
                │  Supabase DB   │ │  Supabase   │ │  External APIs│
                │  (PostgreSQL)  │ │  Storage    │ │               │
                ├────────────────┤ │  (S3-like)  │ │ OpenAI API    │
                │ - sessions     │ │             │ │ (GPT-4/3.5)   │
                │ - screenshots  │ │ - snapshots │ │               │
                │ - results      │ │   bucket    │ │ Tesseract.js  │
                │                │ │  (public)   │ │ (OCR)        │
                └────────────────┘ └─────────────┘ └───────────────┘
```

---

## 📊 Data Flow Diagram

### Session Capture Flow

```
User clicks "Start"
        ↓
Create Session (DB)
        ↓
getDisplayMedia() [Browser API]
        ↓
Screenshot every N seconds
        ↓
Canvas → Blob
        ↓
uploadScreenshot()
        ↓
Multer buffering (local)
        ↓
Upload to Supabase Storage
        ↓
Save metadata to DB
        ↓
Display in gallery
        ↓
User clicks "Stop"
        ↓
stopSession() → set status="processing"
```

### Pipeline Processing Flow

```
User clicks "Stop"
        ↓
Background Task Triggered
        ↓
listSessionFiles()
        ↓
For each screenshot:
  ├─ Extract image from storage
  ├─ Run Tesseract OCR
  └─ Accumulate text
        ↓
generateSummary(accumulated_text)
  ├─ Call OpenAI Chat API
  └─ Get markdown summary
        ↓
generateQuiz(summary)
  ├─ Call OpenAI Chat API
  ├─ Get JSON with 5-8 questions
  └─ Each has A, B, C, D options + correct_answer
        ↓
Save to results table
  ├─ summary: markdown text
  └─ quiz: JSON array of questions
        ↓
Update session status = "completed"
        ↓
Frontend polling detects ready
        ↓
Display summary + quiz preview
```

### Quiz Taking Flow

```
User clicks "Take Quiz"
        ↓
QuizInterface Modal Opens
        ↓
Display Question 1/8
        ↓
User selects option (A, B, C, D)
        ↓
"Next" button enabled
        ↓
User clicks "Next"
        ↓
Display Question 2/8
        ↓
... (repeat for all questions)
        ↓
User clicks "Finish"
        ↓
Calculate Score:
  ├─ userAnswers[Q1] vs quiz[Q1].correct_answer
  ├─ userAnswers[Q2] vs quiz[Q2].correct_answer
  └─ Total: X/8 correct
        ↓
Show Results Modal
  ├─ Percentage score
  ├─ Question breakdown
  ├─ Correct answers highlighted
  └─ User's selections
        ↓
User clicks "Back to Dashboard"
```

### History Navigation Flow

```
User clicks "History" button
        ↓
HistoryPage Component Mounts
        ↓
listAllSessions(limit=10, offset=0)
  └─ GET /api/sessions
        ↓
Backend queries DB:
  SELECT id, status, created_at, summary_preview
  FROM sessions
  ORDER BY created_at DESC
  LIMIT 10
        ↓
Fetch results
        ↓
Display Session Cards
  ├─ Title: Session {id}
  ├─ Date: formatted created_at
  ├─ Status: badge
  └─ Summary: first 150 chars
        ↓
User clicks "View Results"
  └─ Link back to dashboard with session loaded
        ↓
User clicks "Take Quiz"
  └─ Link with ?session=<id>&quiz=true
  └─ Auto-opens quiz modal
        ↓
Pagination:
  ├─ Click "Next" → offset += 10
  └─ Reload with new offset
```

---

## 🗄️ Database Schema

```sql
-- Sessions Table
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  status VARCHAR(20),           -- 'active' | 'processing' | 'completed' | 'failed'
  created_at TIMESTAMP,
  stopped_at TIMESTAMP,
  user_id VARCHAR(255)
);

-- Screenshots Table
CREATE TABLE screenshots (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  image_url VARCHAR(500),       -- Supabase storage URL
  created_at TIMESTAMP,
  ocr_text TEXT
);

-- Results Table (Quiz + Summary)
CREATE TABLE results (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  summary TEXT,                 -- Markdown summary
  quiz JSONB,                   -- Array of quiz questions
  created_at TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX idx_screenshots_session ON screenshots(session_id);
CREATE INDEX idx_results_session ON results(session_id);
```

---

## 🔌 API Endpoints Reference

### Sessions

```
POST /api/sessions
  Request:  { userId?: string }
  Response: { session: Session }

GET /api/sessions?limit=50&offset=0
  Request:  query params (optional)
  Response: { sessions: Array<Session & { summary_preview: string }> }

POST /api/sessions/:id/stop
  Request:  { }
  Response: { session: Session }
```

### Screenshots

```
POST /api/sessions/:id/upload
  Request:  multipart/form-data { image: File }
  Response: { screenshot: Screenshot }

GET /api/sessions/:id/screenshots
  Request:  { }
  Response: { screenshots: Screenshot[] }
```

### Processing

```
POST /api/sessions/:id/process
  Request:  { }
  Response: { status: "acknowledged" }
  Note: Triggers background pipeline

GET /api/sessions/:id/results
  Request:  { }
  Response: { result: Result } | 404 if not ready
```

---

## 🔑 Environment Configuration

```bash
# Backend/.env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyxxx...
OPENAI_API_KEY=sk-xxx...
PORT=4000
NODE_ENV=development
```

---

## 📦 Key Dependencies

### Backend

- express@4.19.2 - Web framework
- typescript@5.6.3 - Language
- supabase@2.45.4 - Database + storage
- openai@4.57.0 - AI API
- tesseract.js@5.1.0 - OCR
- multer@1.4.5 - File upload
- pino@9.5.0 - Logging
- tsx@4.19.2 - TS dev server

### Frontend

- react@18.3.1 - UI framework
- vite@5.4.2 - Build tool
- typescript@5.6.3 - Language
- tailwindcss@3.4.13 - Styling
- axios@1.7.7 - HTTP client
- react-markdown@9.0.3 - Markdown rendering

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Supabase tables created
- [ ] Storage bucket created
- [ ] OpenAI API key valid
- [ ] Frontend built (`npm run build`)
- [ ] Backend builds (`npm run build`)
- [ ] Backend server starts (`npm run dev`)
- [ ] Frontend connects to backend
- [ ] Test full capture → results flow
- [ ] Test quiz taking
- [ ] Test history navigation
- [ ] Verify error handling
- [ ] Check logs for errors
- [ ] Load test with multiple sessions

---

## 💾 Performance Considerations

- **Pagination**: 10 items per page for history
- **Polling**: 4-second intervals for results check
- **OCR**: Batch processing of screenshots
- **Storage**: S3-like Supabase storage for images
- **Caching**: Results cached in memory
- **Indexes**: Created on frequently queried fields

---

## 🔐 Security

- CORS enabled for frontend origin
- Input validation on all endpoints
- Error handling prevents data leaks
- Supabase RLS policies applied
- API keys in environment variables
- No sensitive data in logs

---

## 📈 Scalability

Current limitations and potential improvements:

- Single Node.js process (add clustering)
- In-memory session storage (use Redis)
- Synchronous OCR (already async)
- Local file buffering (add S3 direct upload)
- Single database connection (implement connection pool)

---

This architecture provides a complete, scalable foundation for the SnapNotesAI application! 🎉
