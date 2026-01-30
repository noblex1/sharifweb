# Backend Deployment Guide

Your backend is ready for deployment! Choose one of the platforms below.

## ✅ Pre-Deployment Checklist

- [x] MongoDB Atlas configured
- [x] TypeScript compiled successfully
- [x] Environment variables documented
- [x] Build scripts configured
- [x] Deployment configs created

## Platform Options

### 🚀 Option 1: Render (Recommended - Free Tier)

**Why Render?**
- Free tier available
- Easy deployment
- Auto-deploys from Git
- Built-in SSL
- Good for Node.js apps

**Steps:**

1. **Push to GitHub** (if not already)
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to https://render.com
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository
   - Select the `backend` folder (or root if backend is in root)
   
3. **Configure Service**
   - **Name:** portfolio-backend
   - **Region:** Oregon (or closest to you)
   - **Branch:** main
   - **Root Directory:** `backend` (if in subfolder)
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
   - **Plan:** Free

4. **Add Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://billionairemind000_db_user:i86ix2nBXpayAjfg@cluster0.imsoszr.mongodb.net/portfolio?retryWrites=true&w=majority
   JWT_SECRET=EKK1mj3BZx7r4sEPqcmvvUPbyMV3qsyZ7MoMqiW24hHYhqnj5oDYBnZdaA9YtBiLQJQLggut7d4
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

5. **Deploy!**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Your API will be at: `https://portfolio-backend-xxxx.onrender.com`

---

### 🚂 Option 2: Railway

**Why Railway?**
- $5 free credit monthly
- Very fast deployments
- Great developer experience
- Automatic HTTPS

**Steps:**

1. **Push to GitHub** (same as above)

2. **Deploy on Railway**
   - Go to https://railway.app
   - Sign up/Login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects Node.js

3. **Add Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Add:
     ```
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://billionairemind000_db_user:i86ix2nBXpayAjfg@cluster0.imsoszr.mongodb.net/portfolio?retryWrites=true&w=majority
     JWT_SECRET=EKK1mj3BZx7r4sEPqcmvvUPbyMV3qsyZ7MoMqiW24hHYhqnj5oDYBnZdaA9YtBiLQJQLggut7d4
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     ```

4. **Generate Domain**
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - Your API will be at: `https://portfolio-backend-production.up.railway.app`

---

### ▲ Option 3: Vercel

**Why Vercel?**
- Same platform as frontend
- Serverless functions
- Free tier
- Fast global CDN

**Note:** Vercel works best with serverless functions. For traditional Express apps, Render or Railway are better.

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd backend
   vercel
   ```

3. **Add Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all variables

---

## Environment Variables Reference

```env
# Required
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_jwt_secret

# Frontend URL (update after frontend deployment)
FRONTEND_URL=https://your-frontend-domain.com
```

## Post-Deployment Steps

### 1. Test Your API

```bash
# Health check
curl https://your-backend-url.com/api/health

# Test projects endpoint
curl https://your-backend-url.com/api/projects

# Test hero endpoint
curl https://your-backend-url.com/api/hero
```

### 2. Update Frontend

Update your frontend `.env` file:
```env
VITE_API_URL=https://your-backend-url.com
```

### 3. Update CORS

Your backend is already configured to accept your frontend URL from the `FRONTEND_URL` environment variable.

### 4. MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas Dashboard
2. Network Access → IP Access List
3. Add: `0.0.0.0/0` (allow all) for development
4. Or add your deployment platform's IP addresses

## Monitoring & Logs

### Render
- Dashboard → Your Service → Logs tab
- Real-time logs available

### Railway
- Dashboard → Your Service → Deployments → View Logs
- Real-time logs and metrics

### Vercel
- Dashboard → Your Project → Deployments → View Function Logs

## Troubleshooting

### Build Fails
```bash
# Test build locally
cd backend
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Connection Errors
- Verify MongoDB Atlas IP whitelist
- Check MONGODB_URI environment variable
- Ensure database name is in URI: `/portfolio`

### CORS Errors
- Verify FRONTEND_URL environment variable
- Check frontend is using correct API URL
- Ensure CORS middleware is configured

### 500 Errors
- Check deployment logs
- Verify all environment variables are set
- Test MongoDB connection

## Deployment URLs

After deployment, you'll have:

**Backend API:** `https://your-backend-url.com`

**Endpoints:**
- Health: `/api/health`
- Projects: `/api/projects`
- Experiences: `/api/experiences`
- Certificates: `/api/certificates`
- Tech Stack: `/api/tech-stack`
- About: `/api/about`
- Hero: `/api/hero`
- Contact: `/api/contact`
- Auth: `/api/auth/login`

## Security Checklist

- [x] Environment variables not in code
- [x] JWT_SECRET is secure
- [x] MongoDB credentials secured
- [x] CORS configured for frontend only
- [x] .env file in .gitignore
- [ ] Update FRONTEND_URL after frontend deployment
- [ ] Consider rate limiting for production
- [ ] Set up monitoring/alerts

## Next Steps

1. ✅ Deploy backend (you're here!)
2. ⏭️ Deploy frontend
3. ⏭️ Update frontend with backend URL
4. ⏭️ Test full application
5. ⏭️ Set up custom domain (optional)

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test MongoDB connection
4. Check CORS configuration

---

**Your backend is ready to deploy!** 🚀

Choose your platform and follow the steps above. Render is recommended for beginners.
