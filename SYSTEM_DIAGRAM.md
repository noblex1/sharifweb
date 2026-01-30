# 🎨 System Architecture Diagram

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         YOUR PORTFOLIO SYSTEM                        │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐                    ┌──────────────────────┐
│   PUBLIC VISITORS    │                    │    YOU (ADMIN)       │
│                      │                    │                      │
│  👥 Anyone can view  │                    │  🔐 Secure access    │
└──────────────────────┘                    └──────────────────────┘
          │                                            │
          │                                            │
          ▼                                            ▼
┌──────────────────────┐                    ┌──────────────────────┐
│  PUBLIC PORTFOLIO    │                    │  ADMIN DASHBOARD     │
│  localhost:5173      │                    │  /admin/login        │
│                      │                    │  /admin/dashboard    │
│  • Hero Section      │                    │                      │
│  • Projects ◄────────┼────────────────────┤  • Login Form        │
│  • About             │   Same Data!       │  • Project Manager   │
│  • Experience        │                    │  • Add/Edit/Delete   │
│  • Certificates      │                    │  • Publish Control   │
│  • Contact           │                    │                      │
└──────────────────────┘                    └──────────────────────┘
          │                                            │
          │ GET /api/projects                         │ POST/PUT/DELETE
          │ (no auth needed)                          │ (JWT required)
          │                                            │
          └────────────────┬───────────────────────────┘
                           │
                           ▼
                 ┌──────────────────┐
                 │   BACKEND API    │
                 │  localhost:5000  │
                 │                  │
                 │  • Express.js    │
                 │  • JWT Auth      │
                 │  • CORS          │
                 │  • Validation    │
                 └──────────────────┘
                           │
                           │ Mongoose ODM
                           │
                           ▼
                 ┌──────────────────┐
                 │    MONGODB       │
                 │   Database       │
                 │                  │
                 │  • Users         │
                 │  • Projects      │
                 │  • (Future...)   │
                 └──────────────────┘
```

## Detailed Data Flow

### 1. Public User Views Portfolio

```
┌─────────┐
│ Visitor │
└────┬────┘
     │
     │ 1. Opens browser
     │    https://your-portfolio.com
     ▼
┌─────────────────┐
│  React App      │
│  (Frontend)     │
└────┬────────────┘
     │
     │ 2. Loads ProjectsSection component
     │
     │ 3. useEffect() triggers
     │    fetchProjects()
     │
     │ 4. HTTP GET Request
     │    /api/projects
     ▼
┌─────────────────┐
│  Express API    │
│  (Backend)      │
└────┬────────────┘
     │
     │ 5. projectRoutes.js
     │    router.get('/')
     │
     │ 6. Query MongoDB
     │    Project.find({ isPublished: true })
     ▼
┌─────────────────┐
│   MongoDB       │
│   Database      │
└────┬────────────┘
     │
     │ 7. Returns projects array
     │
     ▼
┌─────────────────┐
│  Express API    │
└────┬────────────┘
     │
     │ 8. JSON Response
     │    { success: true, data: [...] }
     │
     ▼
┌─────────────────┐
│  React App      │
└────┬────────────┘
     │
     │ 9. setProjects(data)
     │
     │ 10. Renders project cards
     │
     ▼
┌─────────┐
│ Visitor │ Sees beautiful projects! ✨
└─────────┘
```

### 2. Admin Adds New Project

```
┌─────────┐
│  Admin  │
└────┬────┘
     │
     │ 1. Navigates to /admin/login
     │
     ▼
┌─────────────────┐
│  Login Page     │
└────┬────────────┘
     │
     │ 2. Enters email & password
     │
     │ 3. POST /api/auth/login
     │    { email, password }
     ▼
┌─────────────────┐
│  Express API    │
└────┬────────────┘
     │
     │ 4. Verify credentials
     │    bcrypt.compare()
     │
     │ 5. Generate JWT token
     │    jwt.sign({ id, role })
     │
     │ 6. Return token
     │
     ▼
┌─────────────────┐
│  Login Page     │
└────┬────────────┘
     │
     │ 7. Save token to localStorage
     │
     │ 8. Redirect to /admin/dashboard
     │
     ▼
┌─────────────────┐
│  Dashboard      │
└────┬────────────┘
     │
     │ 9. Click "Add Project"
     │
     ▼
┌─────────────────┐
│  ProjectForm    │
└────┬────────────┘
     │
     │ 10. Fill form fields:
     │     - Title
     │     - Description
     │     - Technologies
     │     - Features
     │     - Links
     │     - etc.
     │
     │ 11. Click "Create Project"
     │
     │ 12. POST /api/projects
     │     Headers: { Authorization: Bearer <token> }
     │     Body: { ...projectData }
     ▼
┌─────────────────┐
│  Express API    │
└────┬────────────┘
     │
     │ 13. authenticateToken middleware
     │     Verify JWT token
     │
     │ 14. isAdmin middleware
     │     Check user role
     │
     │ 15. Create new Project
     │     new Project(req.body)
     │
     │ 16. Save to database
     │     project.save()
     ▼
┌─────────────────┐
│   MongoDB       │
└────┬────────────┘
     │
     │ 17. Project saved!
     │
     ▼
┌─────────────────┐
│  Express API    │
└────┬────────────┘
     │
     │ 18. Return success
     │     { success: true, data: project }
     │
     ▼
┌─────────────────┐
│  ProjectForm    │
└────┬────────────┘
     │
     │ 19. Show success toast
     │
     │ 20. Close form
     │
     │ 21. Refresh project list
     │
     ▼
┌─────────┐
│  Admin  │ Project added! 🎉
└─────────┘
     │
     │ Now visible on public portfolio!
     │
     ▼
┌─────────┐
│ Visitor │ Sees new project! ✨
└─────────┘
```

## Component Hierarchy

```
App.tsx
├── Routes
│   ├── / (Index.tsx)
│   │   ├── Navbar
│   │   ├── HeroSection
│   │   ├── AboutSection
│   │   ├── ProjectsSection ◄── Fetches from API
│   │   ├── TechStackSection
│   │   ├── ExperienceSection
│   │   ├── CertificatesSection
│   │   ├── ContactSection
│   │   └── Footer
│   │
│   ├── /admin/login (Login.tsx)
│   │   └── Login Form
│   │
│   └── /admin/dashboard (Dashboard.tsx)
│       ├── Header (with logout)
│       ├── Project Grid
│       │   └── Project Cards
│       │       ├── Edit Button
│       │       └── Delete Button
│       └── ProjectForm (Modal)
│           ├── Form Fields
│           └── Submit Button
```

## Database Schema

```
MongoDB Database: portfolio
│
├── Collection: users
│   └── Document:
│       {
│         _id: ObjectId,
│         username: "admin",
│         email: "admin@example.com",
│         password: "$2a$10$hashed...",  // bcrypt hash
│         role: "admin",
│         createdAt: ISODate,
│         updatedAt: ISODate
│       }
│
└── Collection: projects
    ├── Document 1:
    │   {
    │     _id: ObjectId,
    │     title: "SafeNet",
    │     description: "Blockchain-based...",
    │     technologies: ["Move", "React", ...],
    │     category: "Blockchain & Public Safety",
    │     status: "In Development",
    │     gradient: "from-blue-500 to-cyan-500",
    │     features: ["Smart Contracts", ...],
    │     period: "01/2026 - Present",
    │     githubUrl: "https://github.com/...",
    │     liveUrl: null,
    │     order: 0,
    │     isPublished: true,
    │     createdAt: ISODate,
    │     updatedAt: ISODate
    │   }
    │
    ├── Document 2: { ... }
    └── Document 3: { ... }
```

## Authentication Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                        │
└──────────────────────────────────────────────────────────────┘

1. REGISTRATION (One-time)
   ┌─────────┐
   │  Admin  │
   └────┬────┘
        │ POST /api/auth/register
        │ { username, email, password }
        ▼
   ┌─────────────┐
   │   Backend   │
   └────┬────────┘
        │ 1. Hash password (bcrypt)
        │ 2. Save to database
        │ 3. Generate JWT token
        │ 4. Return token
        ▼
   ┌─────────┐
   │  Admin  │ Registered! ✅
   └─────────┘

2. LOGIN (Every session)
   ┌─────────┐
   │  Admin  │
   └────┬────┘
        │ POST /api/auth/login
        │ { email, password }
        ▼
   ┌─────────────┐
   │   Backend   │
   └────┬────────┘
        │ 1. Find user by email
        │ 2. Compare password (bcrypt)
        │ 3. Generate JWT token
        │ 4. Return token
        ▼
   ┌─────────┐
   │  Admin  │ Logged in! ✅
   └────┬────┘
        │ Save token to localStorage
        │
        ▼

3. AUTHENTICATED REQUESTS
   ┌─────────┐
   │  Admin  │
   └────┬────┘
        │ POST /api/projects
        │ Headers: { Authorization: "Bearer <token>" }
        ▼
   ┌─────────────┐
   │   Backend   │
   └────┬────────┘
        │ 1. Extract token from header
        │ 2. Verify token (jwt.verify)
        │ 3. Check user role
        │ 4. Process request
        ▼
   ┌─────────┐
   │  Admin  │ Request successful! ✅
   └─────────┘
```

## File Upload Flow (Future Feature)

```
┌─────────┐
│  Admin  │
└────┬────┘
     │ 1. Select image file
     │
     ▼
┌─────────────────┐
│  ProjectForm    │
└────┬────────────┘
     │ 2. FormData with file
     │
     │ 3. POST /api/projects/upload
     │    Content-Type: multipart/form-data
     ▼
┌─────────────────┐
│  Express API    │
│  (Multer)       │
└────┬────────────┘
     │ 4. Save to /uploads
     │
     │ 5. Return file URL
     │
     ▼
┌─────────────────┐
│  ProjectForm    │
└────┬────────────┘
     │ 6. Add URL to project data
     │
     │ 7. Submit project
     │
     ▼
┌─────────┐
│  Admin  │ Image uploaded! 🖼️
└─────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                          │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐
│   Visitors   │
└──────┬───────┘
       │
       │ HTTPS
       │
       ▼
┌──────────────────┐
│     Vercel       │  Frontend Hosting
│  (CDN + Edge)    │  • Auto SSL
│                  │  • Global CDN
│  React App       │  • Auto Deploy
└──────┬───────────┘
       │
       │ API Calls
       │ HTTPS
       │
       ▼
┌──────────────────┐
│    Railway       │  Backend Hosting
│  (Container)     │  • Auto SSL
│                  │  • Auto Deploy
│  Express API     │  • Logs
└──────┬───────────┘
       │
       │ MongoDB Protocol
       │ Encrypted
       │
       ▼
┌──────────────────┐
│  MongoDB Atlas   │  Database Hosting
│  (Cloud)         │  • Auto Backups
│                  │  • Monitoring
│  Database        │  • Free Tier
└──────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                         │
└─────────────────────────────────────────────────────────────┘

Layer 1: HTTPS/SSL
├── All traffic encrypted
└── Certificates auto-managed

Layer 2: CORS
├── Only allowed origins
└── Configured in backend

Layer 3: JWT Authentication
├── Tokens expire after 7 days
├── Signed with secret key
└── Verified on each request

Layer 4: Password Hashing
├── bcrypt with salt rounds
├── Never store plain passwords
└── One-way encryption

Layer 5: Input Validation
├── Express validator
├── Mongoose schema validation
└── Frontend form validation

Layer 6: Environment Variables
├── Secrets not in code
├── Different per environment
└── Never committed to Git

Layer 7: Database Access
├── User authentication
├── Network IP whitelist
└── Encrypted connections
```

---

This diagram shows how all pieces work together to create your portfolio CMS! 🎨
