# Deploy SnapNotesAI to Vercel - Complete Guide

## Prerequisites

- Vercel account (create at https://vercel.com)
- GitHub account with your repo pushed
- Node.js installed locally

---

## Step 1: Prepare Your Project

### 1.1 Ensure Everything is Committed

```bash
cd C:\Users\Gio\Desktop\SnapShotAI
git status
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 1.2 Verify Build Works Locally

```bash
cd frontend
npm run build
```

✅ Should complete without errors

---

## Step 2: Create Vercel Account & Connect GitHub

### 2.1 Go to Vercel Dashboard

1. Visit https://vercel.com
2. Click **Sign Up**
3. Choose **GitHub** authentication
4. Authorize Vercel to access your GitHub account

### 2.2 Import Your Project

1. After login, click **Add New** → **Project**
2. Select **Import Git Repository**
3. Find and select `SnapNotingAi` repository
4. Click **Import**

---

## Step 3: Configure Build Settings

### 3.1 Root Directory

```
Root Directory: frontend
```

(Since your React app is in the `frontend` folder)

### 3.2 Build Command

```
npm run build
```

### 3.3 Output Directory

```
dist
```

### 3.4 Install Command

```
npm install
```

---

## Step 4: Environment Variables

### 4.1 Add Environment Variables in Vercel

In Vercel Dashboard → Project Settings → Environment Variables:

Add these variables:

```
VITE_API_URL = https://your-backend-url.com/api
```

**Note:** Replace `your-backend-url.com` with your actual backend URL

### 4.2 Make Sure Your Backend is Deployed First

- Deploy backend to a service like:
  - Railway.app
  - Render.com
  - AWS
  - DigitalOcean
  - Heroku
  - Azure

Or update CORS settings if backend is on different domain.

---

## Step 5: Deploy to Vercel

### 5.1 Automatic Deployment

- Push to GitHub main branch
- Vercel automatically deploys
- Check deployment status in Vercel Dashboard

### 5.2 Manual Deployment (If Needed)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel
```

---

## Step 6: Configure Backend API Connection

### 6.1 Backend URL Configuration

In your frontend code, update the API URL:

**File:** `frontend/src/lib/api.ts`

Make sure the API base URL points to your deployed backend:

```typescript
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://your-backend-url.com/api";

export const client = axios.create({
  baseURL: API_BASE_URL,
  // ... other config
});
```

### 6.2 CORS Setup in Backend

Your backend needs to allow requests from your Vercel domain:

```typescript
// backend/src/config.ts or middleware
const corsOptions = {
  origin: ["https://your-app.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
```

---

## Step 7: Verify Deployment

### 7.1 Check Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Check **Deployments** tab
4. Look for green checkmark ✅

### 7.2 Test Your App

1. Click the deployment URL
2. Test key features:
   - Landing page loads
   - Login/signup works
   - Can capture content
   - Summary generates
   - Quiz works
   - History displays

### 7.3 Check Browser Console

- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls

---

## Troubleshooting

### Issue: Build Fails on Vercel

**Solution:**

```bash
# Clear cache
vercel env pull  # Pull environment variables
npm ci           # Clean install
npm run build    # Build locally first
```

### Issue: API Calls Fail (CORS Error)

**Solution:**

```typescript
// Make sure backend CORS includes Vercel URL
// backend/src/middleware/cors.ts
const allowedOrigins = [
  "https://snapnotesai.vercel.app", // Your Vercel URL
  "http://localhost:3000",
];
```

### Issue: Environment Variables Not Working

**Solution:**

1. Verify variables in Vercel Dashboard
2. Restart deployment: **Vercel Dashboard** → **Deployments** → **Redeploy**
3. Check variable names match your code (VITE_API_URL)

### Issue: Images/Logo Not Showing

**Solution:**

```typescript
// Images should be in public/ folder
// Reference as: /logo.png  (with leading slash)

// Wrong:
<img src="logo.png" />

// Correct:
<img src="/logo.png" />
```

---

## Step 8: Custom Domain (Optional)

### 8.1 Add Custom Domain

1. **Vercel Dashboard** → Your Project → **Settings** → **Domains**
2. Enter your domain (e.g., snapnotesai.com)
3. Follow DNS configuration steps

### 8.2 DNS Configuration

Points to update at your domain registrar:

- A Record: `76.76.19.165`
- AAAA Records: Vercel will provide

---

## Step 9: Monitor & Maintain

### 9.1 Analytics

- **Vercel Dashboard** → **Analytics** tab
- Track performance metrics
- Monitor build times

### 9.2 Logs

- **Deployments** → Select deployment → **Logs**
- Check for errors in production
- Monitor API calls

### 9.3 Automatic Updates

- Every push to `main` branch triggers new deployment
- Automatic rollback available if needed
- Check deployment status in GitHub

---

## Environment Variables Reference

### Frontend (Vercel)

```
VITE_API_URL=https://your-backend.com/api
VITE_APP_NAME=SnapNotesAI
```

### Backend (Your deployment platform)

```
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://...
SUPABASE_KEY=...
NODE_ENV=production
```

---

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Build settings configured (frontend root, dist output)
- [ ] Environment variables added
- [ ] Backend deployed and URL added to VITE_API_URL
- [ ] CORS configured in backend
- [ ] Build succeeds locally
- [ ] Initial deployment succeeds on Vercel
- [ ] App loads and functions work
- [ ] API calls work (check Network tab)
- [ ] Logo/images display correctly
- [ ] Form submissions work
- [ ] Quiz generation works

---

## Quick Commands Reference

```bash
# Build locally before deploying
cd C:\Users\Gio\Desktop\SnapShotAI\frontend
npm install
npm run build

# Deploy with Vercel CLI
npm i -g vercel
vercel login
vercel

# Check deployment logs
vercel logs

# View deployment status
vercel status
```

---

## After Deployment

### Share Your App

- **Public URL:** https://your-project-name.vercel.app
- **Custom Domain:** https://yourdomain.com

### Monitor Performance

- Check Vercel Analytics
- Monitor API response times
- Track user errors in console

### Update Process

```bash
cd C:\Users\Gio\Desktop\SnapShotAI
git add .
git commit -m "Update description"
git push origin main
# Vercel automatically deploys!
```

---

## Support Links

- **Vercel Docs:** https://vercel.com/docs
- **Vercel React Guide:** https://vercel.com/docs/frameworks/react
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html
- **Vercel Community:** https://vercel.com/support

---

## Next Steps

1. ✅ Deploy frontend to Vercel (this guide)
2. Deploy backend to Railway/Render/etc
3. Add custom domain
4. Set up monitoring & analytics
5. Configure CI/CD pipeline

---

_Last Updated: November 8, 2025_
_Deployment Target: Vercel_
_Status: Ready to Deploy_
