# 📁 Project Structure

## Overview

```
portfolio/
├── 📱 Frontend (React + TypeScript + Vite)
├── 🔧 Backend (Express + MongoDB)
└── 📚 Documentation
```

## Detailed Structure

```
portfolio/
│
├── src/                                    # Frontend Source Code
│   ├── components/                         # React Components
│   │   ├── admin/                         # Admin Dashboard Components
│   │   │   └── ProjectForm.tsx           # ✨ Form for add/edit projects
│   │   ├── ui/                           # Shadcn UI Components
│   │   ├── AboutSection.tsx              # About section
│   │   ├── CertificatesSection.tsx       # Certificates display
│   │   ├── ContactSection.tsx            # Contact form
│   │   ├── ExperienceSection.tsx         # Work experience
│   │   ├── Footer.tsx                    # Footer component
│   │   ├── HeroSection.tsx               # Hero/landing section
│   │   ├── Navbar.tsx                    # Navigation bar
│   │   ├── ProjectsSection.tsx           # 🔥 Projects (API-powered)
│   │   └── TechStackSection.tsx          # Tech stack display
│   │
│   ├── pages/                             # Page Components
│   │   ├── admin/                        # Admin Pages
│   │   │   ├── Dashboard.tsx            # 📊 Admin dashboard
│   │   │   └── Login.tsx                # 🔐 Admin login
│   │   ├── Index.tsx                    # Main portfolio page
│   │   └── NotFound.tsx                 # 404 page
│   │
│   ├── hooks/                            # Custom React Hooks
│   │   ├── use-mobile.tsx               # Mobile detection
│   │   └── use-toast.ts                 # Toast notifications
│   │
│   ├── lib/                              # Utilities
│   │   └── utils.ts                     # Helper functions
│   │
│   ├── App.tsx                           # Main App component
│   ├── main.tsx                          # Entry point
│   └── index.css                         # 🎨 Global styles & colors
│
├── backend/                               # Backend Source Code
│   ├── src/
│   │   ├── models/                       # MongoDB Models
│   │   │   ├── User.js                  # 👤 User model (admin)
│   │   │   └── Project.js               # 📦 Project model
│   │   │
│   │   ├── routes/                       # API Routes
│   │   │   ├── authRoutes.js            # 🔐 Auth endpoints
│   │   │   └── projectRoutes.js         # 📊 Project CRUD
│   │   │
│   │   ├── middleware/                   # Middleware
│   │   │   └── auth.js                  # JWT authentication
│   │   │
│   │   └── server.js                     # 🚀 Express server
│   │
│   ├── scripts/                          # Utility Scripts
│   │   └── seedProjects.js              # Seed initial data
│   │
│   ├── uploads/                          # File uploads (future)
│   ├── .env                              # Backend config
│   ├── .gitignore                        # Git ignore
│   ├── package.json                      # Dependencies
│   └── README.md                         # Backend docs
│
├── public/                                # Static Assets
│   ├── assets/                           # Images, PDFs, etc.
│   └── robots.txt                        # SEO
│
├── .env                                   # Frontend config
├── .env.example                          # Example config
├── package.json                          # Frontend dependencies
├── vite.config.ts                        # Vite configuration
├── tailwind.config.ts                    # Tailwind config
├── tsconfig.json                         # TypeScript config
│
└── 📚 Documentation
    ├── README.md                         # Main documentation
    ├── SETUP.md                          # Setup guide
    ├── ADMIN_GUIDE.md                    # Admin usage guide
    ├── QUICK_START.md                    # Quick start
    └── PROJECT_STRUCTURE.md              # This file
```

## Key Files Explained

### Frontend

| File | Purpose |
|------|---------|
| `src/components/ProjectsSection.tsx` | Fetches and displays projects from API with fallback |
| `src/components/admin/ProjectForm.tsx` | Form component for creating/editing projects |
| `src/pages/admin/Dashboard.tsx` | Admin dashboard with project management |
| `src/pages/admin/Login.tsx` | Admin authentication page |
| `src/App.tsx` | Main app with routing (includes admin routes) |
| `src/index.css` | Color scheme and design system |

### Backend

| File | Purpose |
|------|---------|
| `backend/src/server.js` | Express server setup, MongoDB connection |
| `backend/src/models/Project.js` | Project schema and model |
| `backend/src/models/User.js` | User schema with password hashing |
| `backend/src/routes/projectRoutes.js` | CRUD endpoints for projects |
| `backend/src/routes/authRoutes.js` | Login, register, verify endpoints |
| `backend/src/middleware/auth.js` | JWT authentication middleware |
| `backend/scripts/seedProjects.js` | Seed initial projects to database |

### Configuration

| File | Purpose |
|------|---------|
| `.env` | Frontend environment variables (API URL) |
| `backend/.env` | Backend config (MongoDB, JWT secret) |
| `vite.config.ts` | Vite build configuration |
| `tailwind.config.ts` | Tailwind CSS customization |
| `tsconfig.json` | TypeScript compiler options |

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     PUBLIC PORTFOLIO                         │
│                  (http://localhost:5173)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ GET /api/projects
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND API                             │
│                  (http://localhost:5000)                     │
│                                                              │
│  ┌──────────────┐      ┌──────────────┐                    │
│  │   Express    │◄────►│   MongoDB    │                    │
│  │   Routes     │      │   Database   │                    │
│  └──────────────┘      └──────────────┘                    │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ POST/PUT/DELETE
                              │ (with JWT token)
                              │
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD                           │
│              (http://localhost:5173/admin)                   │
│                                                              │
│  ┌──────────────┐      ┌──────────────┐                    │
│  │    Login     │      │  Dashboard   │                    │
│  │    Page      │─────►│  (Manage)    │                    │
│  └──────────────┘      └──────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

## API Endpoints

### Public Endpoints
```
GET  /api/projects          # Get all published projects
GET  /api/health            # Health check
```

### Admin Endpoints (Protected)
```
POST   /api/auth/register   # Register admin (first time)
POST   /api/auth/login      # Login
GET    /api/auth/verify     # Verify JWT token

GET    /api/projects/all    # Get all projects (including unpublished)
POST   /api/projects        # Create new project
PUT    /api/projects/:id    # Update project
DELETE /api/projects/:id    # Delete project
```

## Color Scheme

Defined in `src/index.css`:

```css
--primary: 191 100% 50%        /* Cyan */
--background: 220 27% 8%       /* Dark Blue */
--accent: 191 100% 50%         /* Cyan */
```

Gradient options:
- `from-blue-500 to-cyan-500`
- `from-purple-500 to-indigo-500`
- `from-red-500 to-orange-500`
- `from-green-500 to-emerald-500`
- `from-pink-500 to-rose-500`

## Tech Stack Summary

### Frontend
- ⚛️ React 18
- 📘 TypeScript
- ⚡ Vite
- 🎨 TailwindCSS
- 🧩 Shadcn/ui
- 🔄 React Router
- 🔍 React Query

### Backend
- 🟢 Node.js
- 🚂 Express
- 🍃 MongoDB + Mongoose
- 🔐 JWT + bcryptjs
- 🔄 CORS enabled

### Development
- 🔥 Hot Module Replacement (HMR)
- 📝 ESLint
- 🎯 TypeScript strict mode
- 🔧 Nodemon for backend

## Future Additions

Planned sections for admin management:
- [ ] Certificates CRUD
- [ ] Experience CRUD
- [ ] About section editor
- [ ] Skills management
- [ ] Blog posts
- [ ] Image uploads
- [ ] Analytics dashboard

---

**Note:** This structure is designed to be scalable. Adding new sections follows the same pattern as projects!
