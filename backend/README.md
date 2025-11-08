# SnapNotesAI Backend

TypeScript + Express REST API that orchestrates screenshot storage, OCR, and AI summarisation/quiz generation.

## Stack

- Express 4 (ESM)
- Supabase JS client
- Tesseract.js for OCR
- OpenAI Responses API
- Multer for multipart uploads
- Pino logger

## Environment variables

Copy `.env.example` to `.env` and fill in values:

```
PORT=4000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_STORAGE_BUCKET=snapshots
OPENAI_API_KEY=your_openai_key
SUMMARY_MODEL=gpt-4o-mini
QUIZ_MODEL=gpt-4o-mini
SCREENSHOT_STORAGE_DIR=./uploads
```

## Key scripts

- `npm run dev` – start dev server with hot reload.
- `npm run build` – compile to `dist/`.
- `npm run lint` – ESLint.
- `npm start` – run compiled JS.

## API overview

| Method | Endpoint                               | Description                                                 |
| ------ | -------------------------------------- | ----------------------------------------------------------- |
| `POST` | `/api/sessions`                        | Create a new capture session.                               |
| `POST` | `/api/sessions/:sessionId/upload`      | Upload a screenshot (`multipart/form-data`, field `image`). |
| `POST` | `/api/sessions/:sessionId/stop`        | Mark session as stopped (transitions to `processing`).      |
| `POST` | `/api/sessions/:sessionId/process`     | Run OCR + AI pipeline synchronously.                        |
| `GET`  | `/api/sessions/:sessionId/screenshots` | List screenshots for a session.                             |
| `GET`  | `/api/sessions/:sessionId/results`     | Fetch summary + quiz for a session.                         |
| `GET`  | `/health`                              | Health check.                                               |

## Development notes

- Uploaded images are temporarily cached under `SCREENSHOT_STORAGE_DIR/sessionId` before being pushed to Supabase Storage. Files are removed after successful upload.
- OCR is synchronous per image and may slow large batches; consider batching or worker offloading for production.
- OpenAI integration uses Responses API; adjust models via env variables.
- Update Supabase Row Level Security (RLS) policies if you enable public clients. For local development, service role credentials bypass RLS.
