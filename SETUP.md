# Portfolio CMS Setup Guide

This guide will help you set up the full-stack portfolio with admin dashboard.

## Architecture

- **Frontend**: React + TypeScript + Vite (Port 5173)
- **Backend**: Express + MongoDB (Port 5000)
- **Admin Dashboard**: `/admin/login` and `/admin/dashboard`

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

## Step 1: Backend Setup

1. Navigate to backend folder and install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=change-this-to-a-random-secret-key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the backend:
```bash
npm run dev
```

Backend will run on http://localhost:5000

## Step 2: Frontend Setup

1. Go back to root folder and create `.env`:
```bash
cd ..
cp .env.example .env
```

2. Update `.env`:
```env
VITE_API_URL=http://localhost:5000
```

3. Install frontend dependencies (if not already):
```bash
npm install
```

4. Start the frontend:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Step 3: Create Admin Account

Register your admin account using curl or Postman:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "YourSecurePassword123"
  }'
```

## Step 4: Login to Admin Dashboard

1. Go to http://localhost:5173/admin/login
2. Login with your credentials
3. Start managing your projects!

## MongoDB Options

### Option 1: Local MongoDB
```bash
# Install MongoDB or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Option 2: MongoDB Atlas (Free Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update MONGODB_URI in backend/.env:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

## Usage

### Admin Dashboard Features
- ✅ Add/Edit/Delete projects
- ✅ Publish/Unpublish projects
- ✅ Reorder projects
- ✅ Add GitHub and live demo links
- ✅ Manage technologies and features

### Public Portfolio
- Automatically fetches published projects from API
- Falls back to hardcoded data if API is unavailable
- Real-time updates when you publish changes

## Deployment

### Backend (Railway/Render/Heroku)
1. Push backend folder to Git
2. Set environment variables
3. Deploy

### Frontend (Vercel/Netlify)
1. Update VITE_API_URL to your backend URL
2. Deploy from Git
3. Done!

## Troubleshooting

**Backend won't start:**
- Check MongoDB is running
- Verify .env file exists and has correct values

**Frontend can't connect:**
- Ensure backend is running on port 5000
- Check VITE_API_URL in .env
- Check CORS settings in backend

**Can't login:**
- Verify you created an admin account
- Check JWT_SECRET is set in backend .env
