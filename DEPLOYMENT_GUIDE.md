# Stratos Waitlist Deployment Guide

## ✅ DONE - Neon Postgres already set up!
You already have Neon Postgres connected via your Vercel Project! 🎉

---

## 🚀 What's Set Up:
1. **Neon Postgres** - Connected via your Vercel Storage
2. **@neondatabase/serverless SDK** - Installed and ready
3. **lib/db-neon.ts** - Neon database functions
4. **Fallback System** - Auto-falls back to local JSON if DATABASE_URL not set

---

## 📝 Local Development Setup:
1. Go to your Vercel Project → Settings → Environment Variables
2. Copy `DATABASE_URL` from there
3. Create `.env.local` in `/stratos/`
4. Add: `DATABASE_URL=your-vercel-neon-database-url-here`
5. Restart your dev server!

---

## 🔄 Migration from Local JSON to Neon:
To import your existing `/data/waitlist.json` users to Neon, you can:
1. Use the Neon SQL Editor
2. Or create a quick import script
3. We can help with this when you're ready!

---

## Step 1: Admin Dashboard
- View all waitlist users at: `/admin`

---

## Step 3: Set up Vercel Blob (Optional)
For storing user-uploaded images, saved cards, etc.

