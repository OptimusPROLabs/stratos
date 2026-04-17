# Stratos Waitlist Deployment Guide

## Quickest Option (Vercel Stack)
1. Neon Postgres - Managed PostgreSQL (free tier available)
2. Vercel Blob - File storage if needed (for saved card images, etc.)
3. Vercel Hosting - Already set up

---

## Step 1: Admin Dashboard
- View all waitlist users at: `/admin`

---

## Step 2: Migrate to Neon Postgres
1. Go to https://neon.tech
2. Create a free Neon Postgres project
3. Copy your DATABASE_URL from Neon
4. Add it to your Vercel Environment Variables
5. We'll help you migrate the JSON data to Neon!

---

## Step 3: Set up Vercel Blob (Optional)
For storing user-uploaded images, saved cards, etc.

---

## Current Data
Your current waitlist is stored in `/data/waitlist.json`. We can migrate this to Neon when you're ready!

