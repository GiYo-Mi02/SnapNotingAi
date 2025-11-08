# SnapNotesAI

SnapNotesAI is an AI-assisted note-taking companion that captures screenshots from online lectures, extracts key insights via OCR and LLM summarisation, and generates self-study quizzes automatically.

## Project layout

```
SnapShotAI/
├── backend/        # Express + TypeScript API (OCR, Supabase, OpenAI integration)
├── frontend/       # React + Vite dashboard for capture control and review
└── README.md
```

## Features

- **📸 Screen Capture**: Interval-based or manual capture of screen recordings (browser display media API via frontend).
- **📝 Manual Input**: Type notes directly, paste audio transcripts, or upload documents (PDF, DOCX, TXT).
- **📄 Document Processing**: Automatic text extraction from PDFs and Word documents.
- **✨ Smart Summarization**: Generate concise summaries using OpenAI API.
- **🎓 Quiz Generation**: Automatically create self-study quiz questions from content.
- **🔍 OCR Processing**: Extract text from screenshots using Tesseract.js workers.
- **💾 Persistent Storage**: Supabase for sessions, screenshots, documents, and AI outputs.
- **📊 Dashboard**: Real-time monitoring of captures, summaries, quizzes, and history.
- **📚 History Tracking**: Auto-save and review all sessions in organized history page.

## Getting started

### Prerequisites

- Node.js 18+ (recommended LTS)
- Supabase project (URL + service role key)
- OpenAI API key (gpt-4o-mini or compatible model)

### Backend setup

```cmd
cd backend
copy .env.example .env
npm install
npm run dev
```

Populate `.env` with your credentials:

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
OPENAI_API_KEY=...
```

The server listens on `http://localhost:4000` by default and exposes all REST endpoints under `/api`.

### Supabase schema

```sql
create table if not exists sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  stopped_at timestamptz
);

create table if not exists screenshots (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now(),
  ocr_text text
);

create table if not exists results (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id) on delete cascade,
  summary text,
  quiz jsonb,
  created_at timestamptz not null default now()
);
```

Create a Supabase storage bucket (default name `snapshots`) and grant public read access for serving screenshot previews.

### Frontend setup

```cmd
cd frontend
npm install
npm run dev
```

The Vite development server proxies API calls to the backend (`http://localhost:4000`).

### Desktop capture (browser MVP)

1. Start both backend and frontend servers.
2. Open `http://localhost:5173`.
3. Click **Start Capture** and choose the lecture window or screen to share.
4. SnapNotesAI will capture frames at the configured interval, upload them, and after stopping will run OCR + AI processing.
5. Review the generated summary and quiz in the right-hand panel.

## Scripts

### Backend

- `npm run dev` – hot-reload server (ts-node-dev).
- `npm run build` – compile TypeScript to `dist/`.
- `npm start` – run compiled JavaScript.
- `npm run lint` – lint source files.

### Frontend

- `npm run dev` – Vite dev server with hot module reload.
- `npm run build` – type-check and build for production.
- `npm run preview` – preview built assets.
- `npm run lint` – lint with ESLint + TypeScript.
- `npm run format` – apply Prettier formatting.

## TODO & next steps

- Add authentication via Supabase Auth for multi-user session tracking.
- Implement background workers (BullMQ/Cloud functions) for asynchronous pipelines at scale.
- Integrate Discord webhooks and optional cloud backups.
- Package a Tauri desktop wrapper for always-on capture beyond browser constraints.

Happy hacking!
