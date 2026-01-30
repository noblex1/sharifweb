# Sharif Iddrisu - Portfolio

Modern, full-stack portfolio website with CMS capabilities for managing projects, built with React, TypeScript, Express, and MongoDB.

## 🚀 Features

### Public Portfolio
- ✨ Modern, responsive design with glassmorphism effects
- 🎨 Neon cyan/blue color scheme
- 📱 Mobile-first approach
- 🔥 Dynamic project loading from API
- ⚡ Fast performance with Vite
- 🎯 SEO optimized

### Admin Dashboard
- 🔐 Secure authentication with JWT
- ➕ Add/Edit/Delete projects
- 👁️ Publish/Unpublish projects
- 🎨 Choose gradient colors
- 📊 Manage project order
- 🔗 Add GitHub and live demo links
- 🏷️ Categorize and tag projects

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Shadcn/ui
- React Router
- React Query

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- **TypeScript** ✨

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd portfolio
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Setup environment variables**

Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_WEB3FORMS_ACCESS_KEY=your-key-here
```

Backend `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

5. **Start MongoDB** (if using local)
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB locally
```

6. **Start the backend**
```bash
cd backend
npm run dev
```

7. **Start the frontend** (in new terminal)
```bash
npm run dev
```

8. **Create admin account**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "YourSecurePassword123"
  }'
```

9. **Access the application**
- Portfolio: http://localhost:5173
- Admin Login: http://localhost:5173/admin/login
- Admin Dashboard: http://localhost:5173/admin/dashboard

## 📚 Documentation

- [Setup Guide](SETUP.md) - Detailed setup instructions
- [Admin Guide](ADMIN_GUIDE.md) - How to use the admin dashboard
- [Backend README](backend/README.md) - Backend API documentation

## 🎯 Usage

### Seeding Initial Projects
```bash
cd backend
npm run seed
```

### Managing Projects
1. Login to admin dashboard at `/admin/login`
2. Click "Add Project" to create new projects
3. Fill in project details, technologies, features
4. Add GitHub and live demo URLs
5. Choose gradient color and display order
6. Toggle publish status
7. Save and view on public portfolio

### API Endpoints

**Public:**
- `GET /api/projects` - Get all published projects

**Admin (requires auth):**
- `GET /api/projects/all` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Auth:**
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your Git repository
2. Set environment variables:
   - `VITE_API_URL=https://your-backend-url.com`
3. Deploy

### Backend (Railway/Render/Heroku)
1. Connect your Git repository
2. Set environment variables (see backend/.env.example)
3. Deploy
4. Update frontend VITE_API_URL

### MongoDB Atlas (Free Cloud Database)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update MONGODB_URI in backend

## 🎨 Customization

### Colors
The portfolio uses a cyan/blue neon theme. Colors are defined in `src/index.css`:
- Primary: `hsl(191 100% 50%)` (Cyan)
- Background: `hsl(220 27% 8%)` (Dark blue)
- Accent: Cyan gradients

### Adding More Sections
Future updates will include admin management for:
- Certificates
- Experience
- About section
- Skills
- Blog posts

## 📝 Project Structure

```
portfolio/
├── src/                      # Frontend source
│   ├── components/          # React components
│   │   ├── admin/          # Admin dashboard components
│   │   └── ui/             # Shadcn UI components
│   ├── pages/              # Page components
│   │   └── admin/          # Admin pages
│   ├── hooks/              # Custom hooks
│   └── lib/                # Utilities
├── backend/                 # Backend source
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Auth middleware
│   └── scripts/            # Utility scripts
└── public/                 # Static assets
```

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this for your own portfolio

## 👨‍💻 About Me

- **Name:** Sharif Iddrisu  
- **Location:** Kumasi, Ghana  
- **Education:** University for Development Studies  
- **Interests:** AI, Cybersecurity, Blockchain, Software Engineering

## 📫 Contact

- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

Built with ❤️ using React, TypeScript, and MongoDB
