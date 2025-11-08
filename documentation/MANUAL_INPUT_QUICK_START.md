# Manual Input Feature - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
cd backend
npm install pdf-parse mammoth
npm install --save-dev @types/pdf-parse
```

These packages are required for:

- **pdf-parse**: Extracting text from PDF files
- **mammoth**: Extracting text from Word documents (.docx, .doc)

### Step 2: Update Database Schema

Run these SQL migrations on your Supabase database:

```sql
-- Add source column to track input type
ALTER TABLE sessions ADD COLUMN source VARCHAR(50) DEFAULT 'capture';

-- Add manual_content column for text/transcript/extracted text
ALTER TABLE sessions ADD COLUMN manual_content TEXT;

-- Add file_name column to track uploaded documents
ALTER TABLE sessions ADD COLUMN file_name VARCHAR(255);

-- Optional: Create index for faster queries
CREATE INDEX idx_sessions_source ON sessions(source);
```

### Step 3: Start Using

#### Start Development Servers

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

#### Access the Dashboard

Open `http://localhost:5173` and look for the **Manual Input Panel** at the top of the dashboard.

---

## 📝 Feature Overview

### Three Input Methods

**1. Text Input (📝 Text Tab)**

- Paste or type notes directly
- Supports up to 1,000,000 characters
- Perfect for: Quick notes, copied text, lecture transcripts

**2. Audio Transcripts (🎤 Transcript Tab)**

- Paste transcribed audio
- Paste output from services like: Otter.ai, Rev.com, Google Docs Voice Typing
- Same processing as text

**3. Document Upload (📄 Document Tab)**

- Drag & drop or click to select files
- Supported formats: PDF, DOCX, DOC, TXT
- Max file size: 50MB
- Perfect for: Lecture handouts, research papers, textbook chapters

---

## ⚙️ How It Works

```
User Input
    ↓
Manual Input Panel (Frontend)
    ↓
Validate & Send to API
    ↓
Backend Processes:
  ✓ Extract text (if document)
  ✓ Create session
  ✓ Queue processing
    ↓
AI Pipeline (Background):
  ✓ Generate summary
  ✓ Generate quiz questions
    ↓
Store Results
    ↓
Display in SummaryPanel
    ↓
Save to History (Automatic)
```

---

## 🎯 Usage Examples

### Example 1: Quick Notes

1. Click "Text" tab
2. Paste your lecture notes:
   ```
   Key points from lecture:
   - Einstein's theory of relativity
   - E=mc²
   - Space-time continuum
   ```
3. Click "Submit Text"
4. Wait 2-3 seconds for summary and quiz

### Example 2: Transcribed Audio

1. Click "Transcript" tab
2. Paste from your transcription service
3. Click "Submit Transcript"
4. Get summary and quiz

### Example 3: PDF Lecture Slides

1. Click "Document" tab
2. Drag a PDF onto the upload area (or click to browse)
3. Click "Upload & Process"
4. Backend extracts text and processes
5. Results appear automatically

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend npm packages installed (pdf-parse, mammoth)
- [ ] Database columns added (source, manual_content, file_name)
- [ ] Frontend builds without errors: `npm run build`
- [ ] Backend builds without errors: `npm run build`
- [ ] Dev servers start: `npm run dev` (both)
- [ ] ManualInputPanel visible on dashboard
- [ ] Text input works (submit and get results)
- [ ] Document upload works (PDF extraction + results)
- [ ] Results appear in history

---

## 🐛 Common Issues

### Issue: "Cannot find module 'pdf-parse'"

**Solution:**

```bash
cd backend
npm install pdf-parse
```

### Issue: "Column 'manual_content' does not exist"

**Solution:** Run the database schema migration SQL above

### Issue: Manual Input Panel not showing

**Solution:** Rebuild frontend

```bash
cd frontend
npm run build
npm run dev
```

### Issue: "Unsupported file format"

**Supported formats:** `.pdf`, `.docx`, `.doc`, `.txt`
Other formats not yet supported. Upload as `.txt` if possible.

---

## 📊 Performance Tips

- **Text input**: Keep under 500,000 characters for faster processing
- **PDF files**: Smaller PDFs (< 10MB) process faster
- **Batch processing**: Process one document at a time

---

## 🔄 Full Integration

The manual input feature integrates seamlessly with:

- ✅ Screen capture (both work together)
- ✅ AI summarization (same pipeline)
- ✅ Quiz generation (same engine)
- ✅ History tracking (auto-saved)
- ✅ Results dashboard (unified display)

---

## 📚 Learn More

- **Full Documentation**: See `MANUAL_INPUT_FEATURE.md`
- **Backend Services**: Check `backend/src/services/manualInputService.ts`
- **Frontend Component**: Check `frontend/src/components/ManualInputPanel.tsx`
- **API Endpoints**: See routes in `backend/src/routes/sessionRoutes.ts`

---

## 🚀 You're All Set!

Your SnapNotesAI now supports multiple input methods:

- 📸 Screen capture (existing)
- 📝 Text input (new)
- 📄 Document upload (new)
- 🎤 Audio transcripts (new)

All processed through the same powerful AI pipeline! 🎉

---

**Need help?** Check the troubleshooting section in `MANUAL_INPUT_FEATURE.md`
