# Phase 2 Quick Start Guide

## Start Everything

### 1. Start Backend
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

### 2. Start Frontend
```bash
npm run dev
```
Frontend runs on: http://localhost:8080

### 3. Seed Phase 2 Data (First Time Only)
```bash
cd backend
npx tsx scripts/seedAll.ts
```

## Access Admin Dashboard

1. Go to: http://localhost:8080/admin/login
2. Login with your admin credentials
3. Navigate to the new tabs:
   - **About Tab** - Edit bio, skills, achievements
   - **Hero Tab** - Edit name, taglines, profile
   - **Contact Tab** - Edit contact info, social links

## Edit Phase 2 Sections

### Edit About Section
1. Click "About" tab
2. Click "Edit About" button
3. Update:
   - Bio text
   - Location
   - Skills (add/remove)
   - Achievements (education/experience)
4. Click "Save About Section"
5. Page auto-refreshes

### Edit Hero Section
1. Click "Hero" tab
2. Click "Edit Hero" button
3. Update:
   - Name
   - Taglines (rotating text)
   - Subtitle
   - Profile image path
   - CV URL
   - Social links
4. Click "Save Hero Section"
5. Page auto-refreshes

### Edit Contact Section
1. Click "Contact" tab
2. Click "Edit Contact" button
3. Update:
   - Location
   - Email
   - Phone
   - Portfolio URL
   - Social links
4. Click "Save Contact Section"
5. Page auto-refreshes

## View Changes

Go to: http://localhost:8080

All changes appear immediately on the public site!

## API Endpoints

### About
- Public: `GET /api/about`
- Admin: `GET /api/about/admin`
- Update: `POST /api/about`

### Hero
- Public: `GET /api/hero`
- Admin: `GET /api/hero/admin`
- Update: `POST /api/hero`

### Contact
- Public: `GET /api/contact`
- Admin: `GET /api/contact/admin`
- Update: `POST /api/contact`

## Troubleshooting

### Backend not starting?
```bash
# Check MongoDB is running
sudo systemctl status mongod

# Restart backend
cd backend
npm run dev
```

### Data not showing?
```bash
# Re-seed database
cd backend
npx tsx scripts/seedAll.ts
```

### Changes not appearing?
- Hard refresh browser (Ctrl+Shift+R)
- Check browser console for errors
- Verify backend is running on port 5000

## What's Next?

All 7 sections are now dynamic:
- ✅ Projects
- ✅ Experience  
- ✅ Certificates
- ✅ Tech Stack
- ✅ About
- ✅ Hero
- ✅ Contact

Your portfolio is a complete CMS! 🎉
