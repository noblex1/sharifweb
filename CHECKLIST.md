# ✅ Setup Checklist

Use this checklist to ensure everything is set up correctly.

## 📋 Pre-Setup

- [ ] Node.js 18+ installed
- [ ] MongoDB installed (or MongoDB Atlas account created)
- [ ] Git installed
- [ ] Code editor ready (VS Code recommended)

## 🔧 Installation

- [ ] Cloned repository
- [ ] Ran `npm install` in root directory
- [ ] Ran `npm install` in `backend/` directory
- [ ] Created `.env` file in root (already done ✅)
- [ ] Created `backend/.env` file (already done ✅)
- [ ] Updated `JWT_SECRET` in `backend/.env` to a random string

## 🗄️ Database Setup

Choose one option:

### Option A: Local MongoDB
- [ ] MongoDB installed locally
- [ ] MongoDB running on port 27017
- [ ] Connection string in `backend/.env`: `mongodb://localhost:27017/portfolio`

### Option B: MongoDB Atlas (Cloud)
- [ ] Created MongoDB Atlas account
- [ ] Created free cluster
- [ ] Whitelisted IP address (0.0.0.0/0 for development)
- [ ] Created database user
- [ ] Got connection string
- [ ] Updated `MONGODB_URI` in `backend/.env`

## 🚀 First Run

- [ ] Started backend: `cd backend && npm run dev`
- [ ] Backend running on http://localhost:5000
- [ ] Tested health endpoint: http://localhost:5000/api/health
- [ ] Started frontend: `npm run dev`
- [ ] Frontend running on http://localhost:5173
- [ ] Portfolio loads successfully

## 👤 Admin Account

- [ ] Created admin account using curl or Postman
- [ ] Saved admin credentials securely
- [ ] Tested login at http://localhost:5173/admin/login
- [ ] Successfully logged into admin dashboard

## 📊 Initial Data

Choose one option:

### Option A: Seed Projects
- [ ] Ran `cd backend && npm run seed`
- [ ] Verified 3 projects created in database
- [ ] Projects visible on public portfolio

### Option B: Manual Entry
- [ ] Logged into admin dashboard
- [ ] Added first project manually
- [ ] Verified project appears on public portfolio

## ✨ Functionality Tests

### Public Portfolio
- [ ] Portfolio loads at http://localhost:5173
- [ ] Projects section displays correctly
- [ ] Project cards show all information
- [ ] GitHub links work (if added)
- [ ] Live demo links work (if added)
- [ ] Responsive on mobile (test with browser dev tools)

### Admin Dashboard
- [ ] Can login at `/admin/login`
- [ ] Dashboard shows all projects
- [ ] Can add new project
- [ ] Can edit existing project
- [ ] Can delete project
- [ ] Can publish/unpublish project
- [ ] Changes reflect on public portfolio immediately

## 🎨 Customization

- [ ] Updated admin email in registration
- [ ] Reviewed color scheme in `src/index.css`
- [ ] Checked all sections of portfolio
- [ ] Updated contact information
- [ ] Added your own projects

## 🔒 Security

- [ ] Changed `JWT_SECRET` to random string
- [ ] Using strong admin password
- [ ] `.env` files not committed to Git
- [ ] `.gitignore` includes `.env` files

## 📱 Testing

- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari (if available)
- [ ] Tested on mobile device or emulator
- [ ] All features work as expected

## 🚀 Ready for Development

- [ ] Both servers start without errors
- [ ] Can add/edit/delete projects
- [ ] Changes appear on public site
- [ ] No console errors in browser
- [ ] No errors in backend logs

## 📝 Documentation Review

- [ ] Read [README.md](README.md)
- [ ] Read [QUICK_START.md](QUICK_START.md)
- [ ] Read [ADMIN_GUIDE.md](ADMIN_GUIDE.md)
- [ ] Bookmarked [SETUP.md](SETUP.md) for reference

## 🎯 Next Steps

After completing this checklist:

1. **Customize Content**
   - [ ] Add your real projects
   - [ ] Update about section
   - [ ] Add your certificates
   - [ ] Update experience section

2. **Enhance Features**
   - [ ] Add more projects
   - [ ] Customize colors if desired
   - [ ] Add project images (future feature)
   - [ ] Set up analytics

3. **Prepare for Deployment**
   - [ ] Test everything thoroughly
   - [ ] Prepare production environment variables
   - [ ] Choose hosting providers
   - [ ] Follow deployment guide

## 🆘 Troubleshooting

If you encounter issues:

1. **Backend won't start**
   - Check MongoDB is running
   - Verify `.env` file exists in `backend/`
   - Check port 5000 is not in use

2. **Frontend won't start**
   - Verify `npm install` completed successfully
   - Check port 5173 is not in use
   - Clear node_modules and reinstall

3. **Can't login**
   - Verify backend is running
   - Check admin account was created
   - Clear browser cache
   - Check browser console for errors

4. **Projects not showing**
   - Verify backend is running
   - Check projects are published
   - Check browser console for API errors
   - Verify `VITE_API_URL` in `.env`

## ✅ All Done!

Once all items are checked:
- 🎉 Your portfolio CMS is ready!
- 📊 You can manage projects through admin dashboard
- 🌐 Your portfolio is live locally
- 🚀 Ready to deploy to production

---

**Pro Tip:** Keep this checklist handy for future reference or when setting up on a new machine!
