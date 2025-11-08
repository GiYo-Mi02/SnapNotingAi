# Quick Start Guide - SnapNotesAI

## 🚀 Running the Application

### 1. Start Backend Server

```bash
cd backend
npm run dev
```

Server runs on: `http://localhost:4000`

### 2. Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 3. Open Browser

Navigate to: `http://localhost:5173`

---

## 📸 Basic Workflow

### Capture a Session

1. Click **"Start Capture"** button
2. Select your display/window to share
3. Adjust capture interval (5-120 seconds) if needed
4. Screenshots will appear in real-time
5. Click **"Stop Capture"** when done

### View Results

After stopping capture, the app will:

1. Extract text from screenshots using OCR
2. Generate AI summary of extracted content
3. Create 5-8 multiple-choice quiz questions
4. Display summary and quiz preview in right panel

### Take Quiz

1. Click **"Take Quiz"** button in summary panel
2. Answer each question by selecting A, B, C, or D
3. Use Previous/Next to navigate
4. Click "Finish" on last question to submit
5. View your score and answer review

### Browse History

1. Click **"History"** button in header
2. Browse past sessions (10 per page)
3. Use Previous/Next for pagination
4. Click session to view full results
5. Click "Take Quiz" to retake quiz

---

## 🔗 Deep Linking

Share quiz links:

```
http://localhost:5173/?session=<session-id>&quiz=true
```

This automatically opens the quiz for that session.

---

## 🛠️ Build for Production

### Frontend

```bash
cd frontend
npm run build
# Output: dist/
```

### Backend

```bash
cd backend
npm run build
# Output: dist/
```

---

## 📝 Key Features

✅ **Screen Capture** - Browser-based capture using Display Media API
✅ **OCR** - Automatic text extraction from screenshots
✅ **AI Summary** - OpenAI-powered markdown summaries
✅ **Quiz Generation** - 5-8 multiple-choice questions per session
✅ **Interactive Quiz** - Take quiz with immediate feedback and scoring
✅ **Session History** - Browse all past sessions with pagination
✅ **Real-time Upload** - Automatic screenshot upload to cloud storage
✅ **Background Processing** - Async pipeline for OCR, summarization, quiz

---

## 🔑 Environment Setup

### Required Files

- `backend/.env` - Database and API keys
- `backend/database.sql` - Run this in Supabase to create tables

### Auto-setup

Run once after setting up Supabase:

```bash
cd backend
npm run setup
```

This automatically creates the storage bucket.

---

## 🐛 Troubleshooting

### "Cannot find module" errors

```bash
# Install dependencies
npm install

# Frontend only
cd frontend && npm install && npm run build

# Backend only
cd backend && npm install && npm run build
```

### "EADDRINUSE: address already in use :::4000"

Port 4000 is busy. Kill process or change in `backend/.env`

### "Supabase bucket not found"

Run: `cd backend && npm run setup`

### Quiz shows "Option missing"

Ensure backend is running and processing completed successfully

---

## 💡 Tips

- **Adjust Capture Interval**: 5-30 seconds for live lectures, 30-120 for reading
- **Clear History**: Delete sessions in Supabase directly if needed
- **Multiple Sessions**: Each session is independent - no conflicts
- **Retake Quiz**: Click "History", select session, click "Take Quiz" again

---

## 📞 Support

For issues:

1. Check browser console (F12)
2. Check backend logs (terminal where `npm run dev` is running)
3. Verify environment variables are set
4. Ensure Supabase is configured and tables exist

---

## 🎓 Example Workflow

```
1. Start capture → displays "Capturing"
2. Record 3-5 screenshots
3. Stop capture → displays "Processing"
4. (Wait 10-30 seconds for AI)
5. Summary appears with quiz preview
6. Click "Take Quiz"
7. Answer 8 questions
8. See score (e.g., "75%")
9. Review answers
10. Click "Back to Dashboard"
11. Click "History" to see past sessions
```

---

Enjoy using SnapNotesAI! 🎉
