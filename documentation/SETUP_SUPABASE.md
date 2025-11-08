# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up or log in.
2. Create a new project.
3. Copy the **Project URL** and **Service Role Key** (from Settings > API).

## 2. Set Environment Variables

Create `.env` in `backend/` with:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_service_role_key
SUPABASE_STORAGE_BUCKET=snapshots
OPENAI_API_KEY=sk-...your_openai_key
PORT=4000
```

## 3. Run Database Schema

1. Go to your Supabase dashboard.
2. Navigate to **SQL Editor**.
3. Click **New Query**.
4. Copy and paste the contents of `backend/database.sql`.
5. Click **Run**.

This creates:

- `sessions` table (capture sessions)
- `screenshots` table (uploaded images)
- `results` table (summaries + quizzes)
- Indexes for performance

## 4. Create Storage Bucket

1. In Supabase, go to **Storage**.
2. Click **Create a new bucket**.
3. Name it `snapshots` and set it to **Public**.
4. Go to the bucket **Policies** tab.
5. Add a policy to allow public reads:
   - Policy: `SELECT`
   - Target roles: `public`
   - Allowed (optional): Leave default

This allows the frontend to display screenshot thumbnails.

## 5. Test Connection

Once configured, run:

```bash
cd backend
npm install
npm run dev
```

You should see:

```
SnapNotesAI backend listening on port 4000
```

Visit `http://localhost:4000/health` to confirm the API is up.
