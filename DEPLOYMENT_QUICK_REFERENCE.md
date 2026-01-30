# Deployment Quick Reference

## Your URLs

**Frontend (Netlify):** https://sharifiddrisu-online.netlify.app
**Backend (To Deploy):** Will be provided after deployment

## Backend Deployment - Quick Steps

### Option 1: Render (Recommended)

1. **Go to:** https://render.com
2. **Sign up/Login** with GitHub
3. **New Web Service** → Connect your repo
4. **Configure:**
   - Name: `portfolio-backend`
   - Root Directory: `backend`
   - Build: `npm install && npm run build`
   - Start: `npm run start:prod`
   - Plan: Free

5. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://billionairemind000_db_user:i86ix2nBXpayAjfg@cluster0.imsoszr.mongodb.net/portfolio?retryWrites=true&w=majority
   JWT_SECRET=EKK1mj3BZx7r4sEPqcmvvUPbyMV3qsyZ7MoMqiW24hHYhqnj5oDYBnZdaA9YtBiLQJQLggut7d4
   FRONTEND_URL=https://sharifiddrisu-online.netlify.app
   ```

6. **Deploy!** ✅

---

## After Backend Deployment

### Update Frontend on Netlify

1. **Go to:** Netlify Dashboard → Your Site
2. **Site Settings** → Environment Variables
3. **Add Variable:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
4. **Trigger Deploy** → Deploys → Trigger deploy

---

## Test Your Deployment

### Backend Tests
```bash
# Replace YOUR_BACKEND_URL with your actual URL

# Health check
curl https://YOUR_BACKEND_URL/api/health

# Projects
curl https://YOUR_BACKEND_URL/api/projects

# Hero
curl https://YOUR_BACKEND_URL/api/hero
```

### Frontend Tests
1. Visit: https://sharifiddrisu-online.netlify.app
2. Check all sections load
3. Test admin login: https://sharifiddrisu-online.netlify.app/admin/login
4. Test CRUD operations

---

## Your Stack

- **Frontend:** React + TypeScript + Vite → Netlify
- **Backend:** Node.js + Express + TypeScript → Render
- **Database:** MongoDB Atlas
- **Auth:** JWT

---

## MongoDB Atlas

**Database:** portfolio
**Collections:** 8
**Documents:** 23

**Access:** https://cloud.mongodb.com

---

## Important Files

- `backend/.env` - Local environment variables
- `backend/PRODUCTION_ENV_VARS.md` - Production variables
- `BACKEND_DEPLOYMENT_GUIDE.md` - Detailed deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Full checklist

---

## Support

**Render Docs:** https://render.com/docs
**Netlify Docs:** https://docs.netlify.com
**MongoDB Atlas:** https://docs.atlas.mongodb.com

---

## Quick Commands

```bash
# Build backend locally
cd backend
npm run build

# Test backend locally
npm run dev

# Deploy frontend (if needed)
cd ..
npm run build
```

---

**Status:** Ready to deploy! 🚀

**Next Step:** Deploy backend to Render following steps above.
