# Build & Deployment Instructions

## 🏗️ Building the Application

The application has been fully designed and all source code is ready. Now you need to build it on your machine.

### **Windows Users - Quick Build**

```batch
# 1. Navigate to project
cd C:\Users\Admin\Desktop\QUOTATION

# 2. Run complete build (automated)
BUILD.bat

# This will:
# - Install all npm dependencies
# - Create SQLite database
# - Seed companies and default user
# - Run type checks
# - Display next steps
```

### **Mac/Linux Users - Quick Build**

```bash
# 1. Navigate to project
cd /path/to/QUOTATION

# 2. Run complete build (automated)
bash BUILD.sh

# This will:
# - Install all npm dependencies
# - Create SQLite database
# - Seed companies and default user
# - Run type checks
# - Display next steps
```

---

## ⚙️ Manual Build (If Scripts Don't Work)

### Step 1: Install Dependencies
```bash
npm install
```
**What it does:** Downloads and installs all required packages (React, Next.js, Prisma, etc.)  
**Time:** 5-10 minutes depending on internet speed

### Step 2: Setup Environment
```bash
cp .env.example .env.local
```
**What it does:** Creates local environment configuration file  
**Check:** File `.env.local` should exist in project root

### Step 3: Initialize Database
```bash
npx prisma db push --skip-generate
```
**What it does:** Creates SQLite database and applies schema  
**Check:** File `dev.db` should appear in project root

### Step 4: Seed Initial Data
```bash
npx ts-node prisma/seed.ts
```
**What it does:** 
- Creates two companies (AMANI & DIOUF)
- Creates default admin user
- Sets up company settings

**Check:** See output with company IDs and user confirmation

### Step 5: Type Check
```bash
npm run type-check
```
**What it does:** Verifies all TypeScript code is correct  
**Result:** Should show "No errors" or complete successfully

### Step 6: Run Tests (Optional)
```bash
npm test
```
**What it does:** Runs unit tests for calculations and QR codes  
**Expected:** 20+ tests should pass

---

## 🚀 Starting the Application

### After Build Completes

```bash
# Start development server
npm run dev
```

**Output should show:**
```
> next dev
  ▲ Next.js 14.0.0

  ✓ Ready in 3.2s
  ✓ Compiled /
  ✓ Compiled /api/companies
  ...
  
  ➜ Local:        http://localhost:3000
  ➜ Environments: .env.local
```

### Open in Browser

1. Visit **http://localhost:3000**
2. You should see the login page
3. Enter credentials:
   - **Username:** admin
   - **Password:** admin123
4. Click "Sign In"
5. Dashboard should load

---

## 🧪 Testing After Build

### Test Checklist

After successfully building and starting the app, verify:

- [ ] Login page loads at http://localhost:3000
- [ ] Can login with admin/admin123
- [ ] Dashboard displays without errors
- [ ] Can navigate sidebar (all links work)
- [ ] Can click "Create Invoice"
- [ ] Invoice form loads with company dropdown
- [ ] Can select both AMANI and DIOUF
- [ ] Can fill in invoice details
- [ ] Can add line items
- [ ] Can see calculations updating
- [ ] Can submit invoice form
- [ ] Invoice appears in "All Invoices" list
- [ ] Mobile layout is responsive (shrink browser)

### Quick Invoice Test

1. Dashboard → "Create Invoice"
2. Company: AMANI
3. Invoice Number: TEST-001
4. Date: Today
5. Customer: Test Customer
6. Add Line Item:
   - Description: Professional Services
   - Quantity: 1
   - Rate: 1000.00
7. Click "Create Invoice"
8. Verify: Subtotal 1000.00, VAT 150.00, Total 1150.00

---

## 📊 Database

### Local Database
- **Type:** SQLite
- **Location:** `dev.db` (in project root)
- **Size:** Grows as you add documents
- **Reset:** Delete `dev.db` and run `npx prisma db push` again

### Database Commands

```bash
# View database (GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
npx ts-node prisma/seed.ts

# Check database schema
npx prisma db execute --stdin < commands.sql
```

---

## 🛠️ Development Commands

```bash
# Start development server (what you'll use most)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run all tests
npm test

# Watch tests (re-run on changes)
npm run test:watch

# Type check only
npm run type-check

# Lint code
npm run lint

# Database GUI
npx prisma studio

# Reset database (careful!)
npx prisma db push --force-reset
```

---

## ⚠️ Common Issues During Build

### 1. "npm: command not found"
**Solution:** Node.js/npm not installed  
**Fix:** Install from https://nodejs.org/

### 2. "SQLite error"
**Solution:** Database file is corrupted  
**Fix:** 
```bash
rm dev.db
npx prisma db push
npx ts-node prisma/seed.ts
```

### 3. "Port 3000 already in use"
**Solution:** Another app is using port 3000  
**Fix:**
```bash
PORT=3001 npm run dev
# Then visit http://localhost:3001
```

### 4. "Dependencies error"
**Solution:** Corrupted node_modules  
**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### 5. "Prisma error"
**Solution:** Prisma client not generated  
**Fix:**
```bash
npx prisma generate
npx prisma db push
```

---

## 📋 Build Verification Checklist

| Step | Command | Expected Result |
|------|---------|-----------------|
| 1. Install | `npm install` | No errors, packages listed |
| 2. Environment | `ls .env.local` | File exists |
| 3. Database | `ls dev.db` | File created |
| 4. Seed | `npx ts-node prisma/seed.ts` | Companies and user created |
| 5. Type Check | `npm run type-check` | No errors |
| 6. Tests | `npm test` | 20+ tests pass |
| 7. Dev Server | `npm run dev` | Server starts on :3000 |
| 8. Login | Browser → localhost:3000 | Login page loads |
| 9. Dashboard | admin/admin123 | Dashboard displays |
| 10. Create Invoice | Form → Submit | Invoice saved |

---

## 🎯 Next Steps After Build

1. **Change default password** (IMPORTANT!)
   - Settings → Account Settings → Change Password
   
2. **Review company information**
   - Settings → Company Settings
   - Verify details match your records

3. **Create test documents**
   - Create sample invoices for both companies
   - Verify calculations
   - Check QR code generation

4. **Test workflows**
   - Create invoice for AMANI
   - Create quotation for DIOUF
   - Test company filtering

5. **Plan next phase**
   - Review Phase 3 requirements
   - Plan PDF template development
   - Schedule team training

---

## 📞 Build Troubleshooting

### If Build Script Fails

**Windows (BUILD.bat):**
1. Try manual steps above
2. Run `npm install` separately first
3. Then run `npx prisma db push`

**Mac/Linux (BUILD.sh):**
1. Make script executable: `chmod +x BUILD.sh`
2. Try manual steps above
3. Check Node.js version: `node -v` (should be 18+)

### If Development Server Won't Start

```bash
# Kill existing Node processes
# Windows: taskkill /F /IM node.exe
# Mac/Linux: killall node

# Try again
npm run dev
```

### If Database Won't Initialize

```bash
# Reset completely
rm dev.db dev.db-journal
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
```

---

## 📚 Resources

- **Node.js:** https://nodejs.org/ (download and install if needed)
- **npm Docs:** https://docs.npmjs.com/
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs

---

## ✅ Ready?

**When ready to build:**

### Windows
```
BUILD.bat
```

### Mac/Linux
```
bash BUILD.sh
```

Then:
```
npm run dev
```

Then visit: **http://localhost:3000**

**Enjoy! 🚀**
