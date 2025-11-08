# SnapNotesAI - AI-Powered Note Taking & Quiz Generation

SnapNotesAI is an intelligent note-taking companion that captures screen content, extracts text via OCR, generates AI-powered summaries, and creates self-study quizzes automatically.

---

## 📋 Table of Contents

1. [Features](#features)
2. [Quick Start](#quick-start)
3. [How to Use (Step-by-Step)](#how-to-use-step-by-step)
4. [Setup & Installation](#setup--installation)
5. [Deployment](#deployment)
6. [Project Structure](#project-structure)

---

## ✨ Features

- **📸 Screen Capture** - Record your screen from lectures or tutorials
- **📝 Manual Input** - Type notes, paste transcripts, or upload documents
- **📄 Document Support** - Extract text from PDF, Word, and text files
- **✨ AI Summarization** - Automatic summaries using OpenAI GPT-4
- **🎓 Quiz Generation** - Auto-generated quiz questions (minimum 8 questions)
- **🔍 OCR Processing** - Extract text from screenshots
- **💾 Cloud Storage** - Supabase integration for persistent data
- **📊 Dashboard** - Real-time monitoring and management
- **📚 History** - Track and review all past sessions
- **🎯 Professional UI** - Dark mode, responsive design, smooth animations

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- Supabase account (free tier available)
- OpenAI API key

### Run Locally (Development)

**Step 1: Clone & Navigate**

```bash
cd C:\Users\Gio\Desktop\SnapShotAI
```

**Step 2: Start Backend**

```bash
cd backend
npm install
npm run dev
```

Backend runs on: `http://localhost:4000`

**Step 3: Start Frontend (New Terminal)**

```bash
cd frontend
npm install
npm run dev -- --host
```

Frontend runs on:

- Local: `http://localhost:5173`
- Network: `http://192.168.x.x:5173` (for others to access)

---

## 📖 How to Use (Step-by-Step)

### **PART 1: Getting Started**

#### Step 1: Open the Application

1. Go to `http://localhost:5173` (or network URL for others)
2. You'll see the **SnapNotesAI Dashboard**
3. Click **"Go to Dashboard"** or skip the landing page

#### Step 2: Understand the Interface

- **Left Panel**: Screen capture controls
- **Right Panel**: Summary and quiz results
- **Top Menu**: Navigation, settings, history

---

### **PART 2: Creating a Capture Session**

#### Option A: Capture from Screen

**Step 1: Click "Start Capture"**

- Button located in the top-left of dashboard
- A capture dialog will appear

**Step 2: Select What to Capture**

- Choose "Entire Screen" for full screen
- Or choose a specific window/application
- Click **"Share"** or **"Allow"**

**Step 3: Recording in Progress**

- System automatically captures frames every 30 seconds
- You'll see a recording indicator
- Continue your lecture/tutorial

**Step 4: Stop Capture**

- Click **"Stop Capture"** when done
- System processes the screenshots (may take 30-60 seconds)
- Shows "Processing..." status

---

#### Option B: Manual Input / Upload

**Step 1: Go to Dashboard**

**Step 2: Upload Document**

- Look for **"Upload"** button
- Select file: PDF, DOCX, or TXT
- File uploads automatically

**Step 3: Type Manually**

- Click **"New Note"**
- Type or paste your notes
- Click **"Submit"**

**Step 4: System Processes**

- AI generates summary
- Quiz questions created
- Results appear on right panel

---

### **PART 3: Reviewing Your Results**

#### Step 1: Wait for Processing

After capture or upload completes:

- **Summary Panel** shows on the right
- Displays key points extracted from content
- Lists number of quiz questions generated

#### Step 2: Read the Summary

- Clean, organized format
- Bullet points and sections
- Highlights key concepts

#### Step 3: Check Quiz Questions

- Shows preview (first 3 questions)
- Displays total question count
- If < 8 questions, warning appears
- If ≥ 8 questions, quiz is enabled

---

### **PART 4: Taking a Quiz**

#### Step 1: Click "Start Quiz"

- Located in the summary panel (if 8+ questions available)
- Or click "Quiz" button in header
- Quiz settings modal appears

#### Step 2: Select Number of Questions

- **Minimum:** 15 questions
- **Maximum:** 50 questions (or available count)
- Use +/- buttons or preset buttons (15, 30, 50)
- Progress bar shows selection

#### Step 3: Start Quiz

- Click **"Start Quiz"** button
- Quiz page opens full screen

#### Step 4: Answer Questions

- Read each question carefully
- Select one of 4 options (A, B, C, D)
- Click option to select
- Next question auto-loads or click "Next"
- Progress shows: "Question 5 of 25"

#### Step 5: Submit Quiz

- After last question, click **"Submit"**
- Results page shows immediately

#### Step 6: View Results

- **Score:** X/Y questions correct
- **Percentage:** Your score %
- **Answer Review:** See all your answers
  - ✅ Green = Correct
  - ❌ Red = Wrong (shows correct answer)
- **Options:**
  - "Retake Quiz" = Same questions again
  - "Back to Dashboard" = Return home

---

### **PART 5: Viewing History**

#### Step 1: Click "History" Button

- Located in top navigation bar
- Or press **Ctrl+H**

#### Step 2: Browse Sessions

- All past sessions displayed
- Shows: Date, status, preview of summary
- Most recent first

#### Step 3: Click a Session

- Click **"View Results"** to see summary again
- Click **"Take Quiz"** to retake quiz
- Options appear for each completed session

#### Step 4: Manage Sessions

- Use pagination: Previous / Next
- Shows current page and available pages

---

### **PART 6: Settings & Preferences**

#### Step 1: Open Settings

- Click **⚙️ Settings** in top-right corner

#### Step 2: Configure

- **Theme:** Dark/Light mode
- **Notifications:** Enable/disable
- **Capture Interval:** Change screenshot frequency
- **Quiz Preferences:** Default question count

#### Step 3: Save Changes

- Changes auto-save
- Return to dashboard anytime

---

## 🛠️ Setup & Installation

### Backend Setup

```bash
# Navigate to backend
cd C:\Users\Gio\Desktop\SnapShotAI\backend

# Install dependencies
npm install

# Copy environment variables
copy .env.example .env
```

**Edit `.env` file with:**

```
PORT=4000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-key
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_STORAGE_BUCKET=snapshots
OPENAI_API_KEY=sk-your-key
VITE_API_URL=http://localhost:4000
```

**Start backend:**

```bash
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend
cd C:\Users\Gio\Desktop\SnapShotAI\frontend

# Install dependencies
npm install

# Start development server
npm run dev -- --host
```

**Environment file (optional):**
Create `frontend/.env.local`:

```
VITE_API_URL=http://localhost:4000
```

---

## 🌐 Deployment

### Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import the `SnapNotingAi` repository
4. Set **Root Directory:** `frontend`
5. Click **Deploy**
6. Get your live URL: `https://your-project.vercel.app`

### Deploy Backend to Render

1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set **Build Command:** `npm install && npm run build`
5. Set **Start Command:** `npm start`
6. Add environment variables
7. Deploy
8. Get your live URL: `https://your-backend.onrender.com`

### Connect Frontend to Backend

1. In Vercel dashboard, go to **Settings → Environment Variables**
2. Add: `VITE_API_URL=https://your-backend.onrender.com`
3. Redeploy frontend
4. Test your live app!

---

## 📁 Project Structure

```
SnapShotAI/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express server entry
│   │   ├── services/         # Business logic
│   │   └── routes/           # API endpoints
│   ├── dist/                 # Compiled JavaScript
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                  # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Main app component
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── lib/              # Utilities & API calls
│   │   └── styles/           # CSS & Tailwind
│   ├── public/
│   │   └── logo.png          # App logo
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── README.md                 # This file
├── VERCEL_DEPLOYMENT_GUIDE.md
└── render.yaml              # Render configuration
```

---

## 📚 API Endpoints (Backend)

- `POST /api/sessions` - Create new capture session
- `POST /api/sessions/:id/screenshots` - Upload screenshot
- `POST /api/sessions/:id/stop` - End capture session
- `GET /api/sessions/:id/results` - Get summary & quiz
- `GET /api/sessions` - List all sessions
- `POST /api/documents/upload` - Upload PDF/DOCX

---

## 🐛 Troubleshooting

### "Cannot capture screen"

- Browser needs permission
- Use Chrome, Firefox, or Edge
- Allow when prompted

### "API connection failed"

- Backend not running?
- Check `VITE_API_URL` in frontend
- Verify CORS settings

### "Quiz not available"

- Need minimum 8 quiz questions
- Capture more content or longer text

### "Images not loading"

- Check Supabase storage bucket exists
- Verify public read access enabled

---

## 📊 Demo Account

**To test without setup:**

1. Visit deployed frontend: https://your-vercel-project.vercel.app
2. Use demo mode (if available)
3. Upload sample PDF to test

---

## 🎓 Example Workflow

1. **Start lecture recording** → Click "Start Capture"
2. **Record for 30 minutes** → System captures frames automatically
3. **Stop recording** → Click "Stop Capture"
4. **Wait 2-3 minutes** → AI processes content
5. **Read summary** → Review key points
6. **Take quiz** → Test your understanding
7. **View results** → See score and review answers
8. **Check history** → Access this session anytime

---

## 💡 Tips & Tricks

✅ **Best Results:** Capture full screen, not just browser window
✅ **Audio Lectures:** Works best with visual slides + text
✅ **Quiz Quality:** More content = better questions
✅ **Retake Quiz:** Practice with same questions multiple times
✅ **Multiple Topics:** Create separate sessions for each topic

---

## 📞 Support

- **Issues:** Check GitHub issues
- **Docs:** See VERCEL_DEPLOYMENT_GUIDE.md
- **Questions:** Review this README first

---

## 🚀 Next Steps

- ✅ Setup locally and test features
- ✅ Deploy to Vercel + Render
- ✅ Share with classmates for demo
- ✅ Gather feedback
- ✅ Deploy to production

---

**Happy Note Taking! 📚✨**

_Last Updated: November 8, 2025_
_Version: 1.0.0_
