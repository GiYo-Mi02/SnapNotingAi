# SnapNotesAI Frontend

React + Vite dashboard that drives the SnapNotesAI workflow.

## Available scripts

- `npm run dev` – start Vite dev server (http://localhost:5173).
- `npm run build` – type-check and create production bundle.
- `npm run preview` – preview production build locally.
- `npm run lint` – lint TypeScript + React files.
- `npm run format` – format with Prettier.

## Environment

The frontend proxies API calls to the backend (`/api`). No additional environment variables are required for development.

## Key UI sections

- **Capture Controls** – start/stop capture, adjust interval, view pipeline status.
- **Captured Screens** – gallery of screenshots returned from the backend.
- **AI Summary & Quiz** – Markdown-rendered notes and interactive quiz output.

## Implementation details

- Uses the Display Media API to capture a selected screen/window.
- Captures frames on an interval (default 15 seconds) and uploads via `multipart/form-data`.
- Uses Tailwind CSS for styling and React Markdown for summary rendering.

To package as a desktop app, integrate this frontend with a Tauri wrapper and use the same backend API.
