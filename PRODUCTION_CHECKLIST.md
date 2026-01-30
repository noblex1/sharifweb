# 🚀 Production Deployment Checklist

Before deploying to production, complete these tasks.

## 🔒 Security

- [ ] Change `JWT_SECRET` to a strong random string (32+ characters)
- [ ] Use strong admin password
- [ ] Enable MongoDB authentication (if using local MongoDB)
- [ ] Update CORS to only allow your production domain
- [ ] Remove or disable `/api/auth/register` endpoint after creating admin
- [ ] Set `NODE_ENV=production` in backend
- [ ] Review and remove any console.log statements with sensitive data

## 🗑️ Remove Development Features

### 1. Remove Hardcoded Projects Fallback

**File:** `src/components/ProjectsSection.tsx`

**Current (Development):**
```typescript
} catch (error) {
  console.error('Failed to fetch projects:', error);
  // Fallback to hardcoded projects if API fails
  setProjects([...hardcoded projects...]);
}
```

**Change to (Production):**
```typescript
} catch (error) {
  console.error('Failed to fetch projects:', error);
  // Show error message instead of fallback
  toast({
    title: 'Error',
    description: 'Failed to load projects. Please try again later.',
    variant: 'destructive'
  });
  setProjects([]);
}
```

### 2. Remove Debug Console Logs

**Files to check:**
- `src/components/admin/ProjectForm.tsx`
- `src/pages/admin/Dashboard.tsx`
- `src/pages/admin/Login.tsx`

Remove or comment out:
```typescript
console.log('Submitting project:', payload);
console.log('API URL:', url);
console.log('Response data:', data);
```

### 3. Disable Registration Endpoint

**File:** `backend/src/routes/authRoutes.ts`

**Comment out or remove:**
```typescript
// Disabled in production - admin already created
// router.post('/register', async (req: Request, res: Response) => { ... });
```

## 🌐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
VITE_WEB3FORMS_ACCESS_KEY=your-key-here
```

### Backend (backend/.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-long-random-secret-key-here-32-chars-minimum
NODE_ENV=production
FRONTEND_URL=https://your-portfolio-domain.com
```

## 🔧 CORS Configuration

**File:** `backend/src/server.ts`

**Update to production domain:**
```typescript
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'https://your-portfolio-domain.com',
    // Remove localhost URLs in production
  ],
  credentials: true
}));
```

## 📊 Database

- [ ] Use MongoDB Atlas (cloud) instead of local MongoDB
- [ ] Enable database backups
- [ ] Set up monitoring and alerts
- [ ] Review database indexes
- [ ] Test connection from production server

## 🧪 Testing

- [ ] Test all API endpoints
- [ ] Test admin login
- [ ] Test project CRUD operations
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Test with slow network (throttling)
- [ ] Verify all images load
- [ ] Check all links work

## 📝 Content

- [ ] Add all your real projects
- [ ] Update about section
- [ ] Add certificates
- [ ] Update experience
- [ ] Update contact information
- [ ] Add your real email
- [ ] Update social media links

## 🚀 Deployment

### Backend (Railway/Render/Heroku)

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Prepare for production"
   git push
   ```

2. **Deploy Backend**
   - Connect Git repository
   - Set environment variables
   - Deploy

3. **Verify Backend**
   ```bash
   curl https://your-backend-url.com/api/health
   ```

### Frontend (Vercel/Netlify)

1. **Update Environment Variables**
   - Set `VITE_API_URL` to production backend URL

2. **Deploy Frontend**
   - Connect Git repository
   - Set environment variables
   - Deploy

3. **Verify Frontend**
   - Visit your portfolio URL
   - Check projects load
   - Test admin login

## 🔍 Post-Deployment Verification

- [ ] Portfolio loads correctly
- [ ] Projects display from database
- [ ] Admin login works
- [ ] Can add/edit/delete projects
- [ ] Changes appear on public site
- [ ] No console errors
- [ ] SSL certificate valid
- [ ] All links work
- [ ] Mobile responsive
- [ ] Fast loading times

## 📈 Monitoring

- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Set up analytics (Google Analytics, Plausible)
- [ ] Monitor API response times
- [ ] Monitor database performance

## 🔐 Backup

- [ ] Enable MongoDB Atlas automatic backups
- [ ] Export database manually as backup
- [ ] Save environment variables securely
- [ ] Document deployment process

## 📚 Documentation

- [ ] Update README with production URLs
- [ ] Document deployment process
- [ ] Save admin credentials securely
- [ ] Document any custom configurations

## ⚡ Performance

- [ ] Enable gzip compression
- [ ] Optimize images
- [ ] Enable caching
- [ ] Use CDN for static assets
- [ ] Minify CSS/JS (automatic with Vite)

## 🎯 SEO

- [ ] Add meta tags
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Submit to Google Search Console

## 🔄 Continuous Deployment

- [ ] Set up auto-deploy on Git push
- [ ] Test staging environment first
- [ ] Set up rollback procedure

---

## Quick Production Deployment Commands

### 1. Remove Hardcoded Projects
```bash
# Edit src/components/ProjectsSection.tsx
# Remove the hardcoded projects array from catch block
```

### 2. Update Environment Variables
```bash
# Frontend
echo "VITE_API_URL=https://your-backend.com" > .env.production

# Backend
# Update backend/.env with production values
```

### 3. Deploy
```bash
# Commit changes
git add .
git commit -m "Production ready"
git push

# Deploy via your hosting platform
```

### 4. Verify
```bash
# Test backend
curl https://your-backend.com/api/health

# Test frontend
open https://your-portfolio.com
```

---

**Remember:** Test everything in a staging environment before deploying to production!

## 📞 Need Help?

Refer to:
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- [README.md](README.md) - Main documentation
- [SETUP.md](SETUP.md) - Setup instructions

---

**Good luck with your deployment!** 🚀
