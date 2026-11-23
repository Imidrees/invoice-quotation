# Vercel Deployment Guide

## ✅ STEP 1: Create GitHub Account (If you don't have one)

Go to: https://github.com/signup

Create account with email and password.

---

## ✅ STEP 2: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `invoice-quotation-system`
3. Description: `Invoice & Quotation Management System`
4. Select: **Public** (so Vercel can access it)
5. Click: **Create Repository**

---

## ✅ STEP 3: Push Code to GitHub

In PowerShell, run these commands:

```powershell
cd C:\Users\Admin\Desktop\QUOTATION

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Invoice & Quotation Management System"

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/invoice-quotation-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**You'll be prompted for GitHub credentials. Enter your username and password.**

---

## ✅ STEP 4: Create Vercel Account

1. Go to: https://vercel.com/signup
2. Click: **Sign up with GitHub**
3. Authorize Vercel to access your GitHub account

---

## ✅ STEP 5: Deploy to Vercel

1. After signing in to Vercel
2. Click: **New Project**
3. Select your repository: `invoice-quotation-system`
4. Click: **Import**

### Configure Environment Variables

Add these variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `file:./.vercel/data.db` |
| `JWT_SECRET` | `your-secret-key-change-this-later` |
| `NODE_ENV` | `production` |

5. Click: **Deploy**

**Wait 3-5 minutes for deployment to complete...**

---

## ✅ STEP 6: Get Your Live URL

After deployment finishes, you'll see:
```
✅ Deployment successful!
Live URL: https://your-app.vercel.app
```

---

## ✅ STEP 7: Test the App

1. Open: `https://your-app.vercel.app`
2. Login: `admin` / `admin123`
3. Create test invoice
4. Verify calculations work

---

## 🔧 If Something Goes Wrong

### Error: "Database not found"
- Vercel serverless doesn't support SQLite files
- Solution: Use Supabase PostgreSQL (free tier)

### Error: "Prisma not found"
- Add to `package.json` scripts:
```json
"vercel-build": "npx prisma generate && npm run build"
```

### Error: "Cannot connect"
- Wait 5 minutes for initial deployment
- Then refresh the page

---

## 📝 Next: Connect Real Database

After testing on Vercel, upgrade to Supabase (free PostgreSQL):

1. Create account: https://supabase.com
2. Create new project
3. Copy connection string
4. Add to Vercel environment: `DATABASE_URL`
5. Deploy

---

**Follow these steps and tell me:**
1. ✅ Created GitHub account?
2. ✅ Pushed code to GitHub?
3. ✅ Deployed to Vercel?
4. ✅ What's your live URL?

Then I'll help you test it! 👍
