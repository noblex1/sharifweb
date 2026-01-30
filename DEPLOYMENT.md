# 🚀 Deployment Guide

Complete guide to deploy your portfolio to production.

## Overview

We'll deploy:
- **Frontend** → Vercel (recommended) or Netlify
- **Backend** → Railway (recommended), Render, or Heroku
- **Database** → MongoDB Atlas (free tier)

## 📋 Pre-Deployment Checklist

- [ ] Everything works locally
- [ ] Admin account created and tested
- [ ] Projects added and displaying correctly
- [ ] All environment variables documented
- [ ] Code committed to Git repository

## 1️⃣ Deploy Database (MongoDB Atlas)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project (e.g., "Portfolio")

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select region closest to you
4. Name cluster (e.g., "portfolio-cluster")
5. Click "Create"

### Step 3: Setup Access
1. **Database Access:**
   - Click "Database Access" in left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `portfolio_admin`
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Network Access:**
   - Click "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

### Step 4: Get Connection String
1. Click "Database" in left menu
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `portfolio`

Example:
```
mongodb+srv://portfolio_admin:YOUR_PASSWORD@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Save this connection string!** You'll need it for backend deployment.

## 2️⃣ Deploy Backend (Railway)

### Option A: Railway (Recommended - Easy & Free)

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Choose `backend` folder as root directory

3. **Configure Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Add these variables:
   ```
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=generate-a-random-secret-key-here
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Configure Build**
   - Go to "Settings" tab
   - Root Directory: `/backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

5. **Deploy**
   - Railway will auto-deploy
   - Get your backend URL (e.g., `https://your-app.railway.app`)
   - **Save this URL!**

### Option B: Render

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +"
   - Choose "Web Service"
   - Connect your repository
   - Configure:
     - Name: `portfolio-backend`
     - Root Directory: `backend`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`

3. **Add Environment Variables**
   ```
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=generate-a-random-secret-key-here
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Get your backend URL
   - **Save this URL!**

## 3️⃣ Deploy Frontend (Vercel)

### Step 1: Prepare Frontend

1. **Update .env for production**
   Create `.env.production`:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   VITE_WEB3FORMS_ACCESS_KEY=your-key-here
   ```

2. **Test build locally**
   ```bash
   npm run build
   npm run preview
   ```

### Step 2: Deploy to Vercel

1. **Create Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import your Git repository
   - Vercel auto-detects Vite

3. **Configure**
   - Framework Preset: Vite
   - Root Directory: `./` (leave as root)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   VITE_WEB3FORMS_ACCESS_KEY=your-key-here
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get your frontend URL (e.g., `https://your-portfolio.vercel.app`)

### Step 3: Update Backend CORS

1. Go back to Railway/Render
2. Update `FRONTEND_URL` environment variable
3. Set it to your Vercel URL: `https://your-portfolio.vercel.app`
4. Redeploy backend

## 4️⃣ Post-Deployment Setup

### Create Admin Account in Production

```bash
curl -X POST https://your-backend-url.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "your-email@example.com",
    "password": "YourSecurePassword123"
  }'
```

### Seed Initial Projects (Optional)

1. SSH into your backend (Railway/Render)
2. Run: `npm run seed`

Or add projects manually through admin dashboard.

## 5️⃣ Verify Deployment

### Test Backend
```bash
# Health check
curl https://your-backend-url.railway.app/api/health

# Get projects
curl https://your-backend-url.railway.app/api/projects
```

### Test Frontend
1. Visit `https://your-portfolio.vercel.app`
2. Check projects load
3. Visit `/admin/login`
4. Login with your credentials
5. Add/edit a project
6. Verify it appears on public site

## 🔒 Security Checklist

- [ ] Changed JWT_SECRET to random string
- [ ] Using strong admin password
- [ ] MongoDB user has strong password
- [ ] Network access configured (0.0.0.0/0 for now)
- [ ] CORS configured with correct frontend URL
- [ ] Environment variables not in Git
- [ ] .env files in .gitignore

## 🌐 Custom Domain (Optional)

### Vercel (Frontend)
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Railway (Backend)
1. Go to project settings
2. Click "Settings" → "Domains"
3. Add custom domain
4. Update DNS records

## 📊 Monitoring

### Railway
- View logs in dashboard
- Monitor resource usage
- Set up alerts

### Vercel
- View deployment logs
- Monitor analytics
- Check performance

### MongoDB Atlas
- Monitor database metrics
- Set up alerts
- View slow queries

## 🔄 Continuous Deployment

Both Vercel and Railway support auto-deployment:

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

2. **Auto Deploy**
   - Vercel deploys frontend automatically
   - Railway deploys backend automatically

## 🐛 Troubleshooting

### Backend Issues

**Can't connect to MongoDB:**
- Verify connection string is correct
- Check MongoDB Atlas network access (0.0.0.0/0)
- Verify database user credentials

**CORS errors:**
- Check FRONTEND_URL in backend env vars
- Verify it matches your Vercel URL exactly
- Include https:// protocol

**500 errors:**
- Check backend logs in Railway/Render
- Verify all environment variables are set
- Check MongoDB connection

### Frontend Issues

**Can't fetch projects:**
- Verify VITE_API_URL is correct
- Check backend is running
- Open browser console for errors

**Admin login fails:**
- Verify backend URL is correct
- Check admin account was created
- Clear browser cache

**Build fails:**
- Check all dependencies installed
- Verify TypeScript has no errors
- Check build logs for details

## 💰 Cost Breakdown

### Free Tier Limits

**MongoDB Atlas (Free):**
- 512 MB storage
- Shared RAM
- Enough for thousands of projects

**Railway (Free):**
- $5 credit/month
- ~500 hours runtime
- Enough for portfolio backend

**Vercel (Free):**
- Unlimited deployments
- 100 GB bandwidth/month
- Perfect for portfolio

**Total: $0/month** for personal portfolio! 🎉

### When to Upgrade

Upgrade when you need:
- More database storage (>512 MB)
- More backend runtime (>500 hrs/month)
- Custom domains with SSL
- More bandwidth

## 🎯 Production URLs

After deployment, save these:

```
Frontend: https://your-portfolio.vercel.app
Backend:  https://your-backend.railway.app
Database: MongoDB Atlas cluster
Admin:    https://your-portfolio.vercel.app/admin/login
```

## 📝 Environment Variables Summary

### Backend (Railway/Render)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=random-secret-key-here
NODE_ENV=production
FRONTEND_URL=https://your-portfolio.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.railway.app
VITE_WEB3FORMS_ACCESS_KEY=your-key-here
```

## ✅ Deployment Complete!

Your portfolio is now live! 🎉

- ✅ Frontend deployed and accessible
- ✅ Backend API running
- ✅ Database connected
- ✅ Admin dashboard working
- ✅ Auto-deployment configured

Share your portfolio URL with the world! 🌍

---

**Need help?** Check the troubleshooting section or review the logs in your deployment platforms.
