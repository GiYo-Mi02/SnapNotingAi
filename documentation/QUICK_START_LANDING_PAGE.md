# 🚀 SnapNotesAI - Quick Start Guide

## 📋 Prerequisites

Make sure you have the following installed:

- Node.js 16+
- npm 8+
- Git (optional)

## 🏁 Getting Started

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm run start
```

**Expected output:**

```
[HH:MM:SS.XXX] INFO: SnapNotesAI backend listening
    port: 4000
```

### 2. Frontend Setup

Open a **new terminal** and:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Expected output:**

```
  VITE v5.4.2  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 3. Access the Application

Open your browser and navigate to:

```
http://localhost:5173/
```

---

## 🎯 What You'll See

### Landing Page (First Visit)

The app opens with a professional landing page featuring:

- ✨ Hero section with "Focus on learning..." headline
- 📸 Features showcase (6 key capabilities)
- ⚙️ How It Works (5-step process)
- 💰 Pricing section (3 tiers)
- 🔗 Navigation bar with smooth scrolling

### Dashboard (After Clicking "Go to Dashboard")

Once you enter, you'll see:

- 📝 Manual Input Panel (text, transcript, document upload)
- 📸 Screenshot capture controls
- 🖼️ Captured screens grid
- 📊 AI results summary
- 🎯 Quiz generation
- 📚 Session history

---

## 📂 Project Structure

```
SnapShotAI/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── manualInputController.ts
│   │   ├── services/
│   │   │   ├── manualInputService.ts
│   │   │   └── documentService.ts
│   │   ├── middleware/
│   │   │   └── upload.ts
│   │   ├── routes/
│   │   │   └── sessionRoutes.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx    ← NEW: Landing page
│   │   │   ├── QuizPage.tsx
│   │   │   └── HistoryPage.tsx
│   │   ├── components/
│   │   │   ├── ManualInputPanel.tsx
│   │   │   ├── CaptureControls.tsx
│   │   │   └── ...more components
│   │   ├── App.tsx               ← Modified: Added routing
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
└── Documentation/
    ├── LANDING_PAGE_COMPLETE.md
    ├── LANDING_PAGE_CODE_REFERENCE.md
    ├── MANUAL_INPUT_FEATURE.md
    └── ...more docs
```

---

## 🎮 Using the Landing Page

### Navigation

- Click section links to scroll smoothly
- "Go to Dashboard" button in nav bar → Enter app
- "Try SnapNotesAI for Free" button in hero → Enter app
- "See How It Works" button → Scroll to process section

### Features Showcase

- Hover over feature cards to see color changes
- Each feature highlights with unique colors:
  - 📸 Screenshot → Blue
  - 🧠 Summarization → Purple
  - ✅ Quiz → Orange
  - 📝 Text Input → Green
  - 📚 History → Cyan
  - ⚡ Speed → Pink

### Pricing Section

- **Free Plan**: Basic features, no cost
- **Pro Plan**: Full features, $9/month (highlighted)
- **Enterprise**: Custom pricing for organizations

---

## 🎮 Using the Dashboard

### Manual Input Feature

#### Text Input

1. Type or paste text in the text area
2. Click "Process Text"
3. Wait for AI processing
4. View results (summary + quiz)

#### Transcript Upload

1. Upload a transcript file (.txt, .pdf, .docx)
2. Click "Upload & Process"
3. System extracts text and processes it
4. View results

#### Document Upload

1. Drag and drop or select a document (.pdf, .docx, .txt)
2. Automatic processing starts
3. View extracted text and results

### Screen Capture Feature

1. Click "Start Capture"
2. Adjust capture interval (default 15 seconds)
3. Screenshots are automatically captured
4. Click "Stop & Process" when done
5. View captured screens and AI results

### Results & Quiz

1. **Summary Tab**: AI-generated summary of content
2. **Quiz Tab**: AI-generated quiz questions
3. **Screenshots**: View all captured images
4. **History**: Access previous sessions

---

## 🔧 Configuration

### Backend Configuration

Edit `backend/src/main.ts`:

```typescript
const PORT = process.env.PORT || 4000;
const API_URL = process.env.API_URL || "http://localhost:4000";
```

### Frontend Configuration

Edit `frontend/vite.config.ts`:

```typescript
// API endpoint
const API_BASE_URL = "http://localhost:4000";
```

### Environment Variables

Create `.env` files in both directories:

**backend/.env**

```
PORT=4000
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
OPENAI_API_KEY=your_key
```

**frontend/.env**

```
VITE_API_URL=http://localhost:4000
```

---

## 🐛 Troubleshooting

### Backend Won't Start

```bash
# Check if port 4000 is in use
netstat -ano | findstr :4000

# Kill the process using port 4000
taskkill /PID <PID> /F

# Or use a different port
PORT=5000 npm run start
```

### Frontend Won't Compile

```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install

# Clear TypeScript cache
rm -r dist
npm run build
```

### CORS Errors

Ensure backend is running and API URL is correct in frontend

### Document Upload Not Working

- Check file format (.pdf, .docx, .txt)
- Ensure file size < 50MB
- Check backend logs for errors

---

## 📊 Testing the Features

### Test Manual Text Input

```
1. Open app
2. Go to Dashboard
3. Paste sample text about Python
4. Click "Process Text"
5. View AI summary and quiz
```

### Test Document Upload

```
1. Prepare a .txt or .docx file
2. Go to Document tab
3. Drag & drop or select file
4. Wait for processing
5. View results
```

### Test Screen Capture

```
1. Click "Start Capture"
2. Open a browser tab with content
3. Wait for automatic captures
4. Click "Stop & Process"
5. View captured screens and results
```

---

## 📊 Performance Tips

### Frontend Performance

- Landing page uses TailwindCSS for minimal CSS
- JavaScript is properly bundled and minified
- Images are optimized (using emoji instead)

### Backend Performance

- Mammoth library efficiently handles DOCX extraction
- OpenAI API is optimized for quick responses
- Database queries are indexed

### Optimization Suggestions

1. Enable caching in production
2. Use CDN for static assets
3. Implement service workers for offline
4. Optimize images further
5. Consider lazy loading for components

---

## 🚀 Production Deployment

### Building for Production

**Backend:**

```bash
cd backend
npm run build
npm run start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

### Deployment Platforms

- **Backend**: Heroku, AWS, Azure, DigitalOcean
- **Frontend**: Vercel, Netlify, AWS Amplify, GitHub Pages

### Pre-Deployment Checklist

- [ ] Update environment variables
- [ ] Test all features thoroughly
- [ ] Run security checks
- [ ] Optimize bundle sizes
- [ ] Set up monitoring
- [ ] Configure HTTPS
- [ ] Set up backups
- [ ] Plan scalability

---

## 📚 Documentation

For more detailed information, see:

- **Landing Page**: `LANDING_PAGE_COMPLETE.md`
- **Code Reference**: `LANDING_PAGE_CODE_REFERENCE.md`
- **Manual Input Feature**: `MANUAL_INPUT_FEATURE.md`
- **API Testing**: `API_TESTING_GUIDE.md`
- **Backend Status**: `BACKEND_RUNNING_STATUS.md`
- **Final Report**: `FINAL_REPORT.md`

---

## 💡 Tips & Tricks

### Keyboard Shortcuts

- `Ctrl+K` / `Cmd+K`: Search (if implemented)
- `Esc`: Close dialogs
- `Enter`: Submit forms

### Developer Mode

Press `F12` to open Developer Tools:

- **Console**: Check for errors
- **Network**: Monitor API calls
- **Application**: View stored data
- **Lighthouse**: Run performance audit

### Testing API Endpoints

Using curl:

```bash
# Test manual text input
curl -X POST http://localhost:4000/api/manual/text \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'

# Test document upload
curl -X POST http://localhost:4000/api/manual/document \
  -F "file=@document.pdf"
```

---

## 🎓 Learning Resources

- **React Fundamentals**: https://react.dev
- **TailwindCSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org
- **Express.js**: https://expressjs.com
- **API Design**: https://restfulapi.net

---

## 📞 Support

### Getting Help

1. **Check Documentation**: Review the docs folder
2. **Check Console**: Open browser DevTools (F12)
3. **Check Logs**: Look at terminal output
4. **Test Endpoints**: Use curl or Postman

### Common Issues

| Issue                    | Solution                      |
| ------------------------ | ----------------------------- |
| Landing page not showing | Clear browser cache           |
| API errors               | Ensure backend is running     |
| Styles not loading       | Run `npm install` and rebuild |
| File upload fails        | Check file format and size    |
| Results not appearing    | Check backend logs            |

---

## ✅ Checklist

Before sharing or deploying:

- [ ] Landing page displays correctly
- [ ] Navigation links work
- [ ] CTA buttons navigate properly
- [ ] Manual input works (text, transcript, document)
- [ ] Screen capture functions
- [ ] Results display correctly
- [ ] Quiz generates properly
- [ ] History saves sessions
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Build completes successfully
- [ ] Backend logs show no errors

---

## 🎉 You're All Set!

Your SnapNotesAI application is now running with a professional landing page. Enjoy exploring the features and feel free to customize the design to match your brand!

**Questions?** Check the documentation files or review the code comments.

**Happy coding!** 🚀

---

**Version**: 1.0
**Last Updated**: 2024
**Status**: ✅ Ready to Use
