# 🚀 Quick Start Guide

## One-Time Setup (5 minutes)

### 1. Install Dependencies
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 2. Setup Environment Files
Already created for you! Just verify:
- ✅ `.env` (frontend)
- ✅ `backend/.env` (backend)

### 3. Start MongoDB
```bash
# Option A: Docker (easiest)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Option B: Use MongoDB Atlas (free cloud)
# Get connection string from https://www.mongodb.com/cloud/atlas
# Update backend/.env with your connection string
```

### 4. Seed Initial Projects (Optional)
```bash
cd backend
npm run seed
cd ..
```

### 5. Create Admin Account
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "YourPassword123"
  }'
```

## Daily Usage

### Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Frontend running on http://localhost:5173

### Access Your Sites

- 🌐 **Public Portfolio**: http://localhost:5173
- 🔐 **Admin Login**: http://localhost:5173/admin/login
- 📊 **Admin Dashboard**: http://localhost:5173/admin/dashboard

## Common Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd backend
npm run dev          # Start dev server
npm run seed         # Seed initial projects
npm start            # Start production server
```

## Troubleshooting

### Backend won't start
```bash
# Check if MongoDB is running
docker ps

# Restart MongoDB
docker restart mongodb
```

### Can't login to admin
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Should return: {"status":"ok","message":"Portfolio API is running"}
```

### Projects not showing
1. Check backend is running (port 5000)
2. Check browser console for errors
3. Verify projects are published (green eye icon in admin)

## Next Steps

1. ✅ Login to admin dashboard
2. ✅ Add/edit your projects
3. ✅ Customize colors and content
4. ✅ Deploy to production

## Need Help?

- 📖 [Full Setup Guide](SETUP.md)
- 📚 [Admin Guide](ADMIN_GUIDE.md)
- 🔧 [Backend Docs](backend/README.md)

---

**Pro Tip:** Keep both terminals open while developing. The frontend will auto-reload on changes!
