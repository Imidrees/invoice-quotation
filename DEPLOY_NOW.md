# Quick Vercel Deployment - ONE COMMAND

## Prerequisites
- GitHub account (free): https://github.com/signup
- Vercel account (free): https://vercel.com/signup (use GitHub to sign in)

---

## ONE COMMAND TO DEPLOY

If you have Git installed, run this in PowerShell:

```powershell
cd C:\Users\Admin\Desktop\QUOTATION

# Initialize git
git init
git config user.email "admin@example.com"
git config user.name "Admin"

# Add all files
git add .

# Commit
git commit -m "Invoice & Quotation Management System"

# Create GitHub repo (replace USERNAME with your GitHub username)
git branch -M main
git remote add origin https://github.com/USERNAME/invoice-quotation-system.git
git push -u origin main
```

Then:
1. Go to: https://vercel.com/new
2. Import from GitHub: `invoice-quotation-system`
3. Add env variables (see VERCEL_DEPLOYMENT.md)
4. Click Deploy
5. Wait 3-5 minutes
6. Get your live URL ✅

---

## OR: Use Vercel CLI (Easier)

```powershell
npm install -g vercel
vercel login
vercel
```

Follow prompts and your app will be live in minutes!

---

## THEN: Test Your Live App

1. Open the URL Vercel gives you
2. Login: `admin` / `admin123`
3. Create invoice
4. See calculations work ✅

---

**Do you have Git installed?** (Run: `git --version`)

If YES → Follow the commands above  
If NO → I'll give you simpler steps
