# Admin Dashboard Guide

## Quick Start

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on: http://localhost:5000

### 2. Start Frontend
```bash
# In root directory
npm run dev
```
Frontend runs on: http://localhost:5173

### 3. Access Admin Dashboard
Go to: http://localhost:5173/admin/login

## First Time Setup

### Create Your Admin Account

**Option 1: Using curl**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "your-email@example.com",
    "password": "YourSecurePassword123"
  }'
```

**Option 2: Using Postman/Thunder Client**
- Method: POST
- URL: http://localhost:5000/api/auth/register
- Body (JSON):
```json
{
  "username": "admin",
  "email": "your-email@example.com",
  "password": "YourSecurePassword123"
}
```

## Using the Admin Dashboard

### Login
1. Navigate to http://localhost:5173/admin/login
2. Enter your email and password
3. Click "Login"

### Managing Projects

#### Add New Project
1. Click "Add Project" button
2. Fill in the form:
   - **Title**: Project name (e.g., "NetWard AI")
   - **Description**: Detailed description
   - **Category**: Type of project (e.g., "AI & Cybersecurity")
   - **Status**: In Development / Completed / Archived
   - **Period**: Timeline (e.g., "01/2026 - Present")
   - **Technologies**: Comma-separated (e.g., "React, TypeScript, AI/ML")
   - **Features**: Comma-separated key features
   - **GitHub URL**: Repository link (optional)
   - **Live Demo URL**: Deployed site link (optional)
   - **Gradient**: Choose color scheme
   - **Display Order**: Number for sorting (lower = first)
   - **Publish**: Toggle to show/hide on public site
3. Click "Create Project"

#### Edit Project
1. Click "Edit" button on any project card
2. Update the fields
3. Click "Update Project"

#### Delete Project
1. Click "Delete" button on project card
2. Confirm deletion

#### Publish/Unpublish
- Toggle the "Publish this project" switch when editing
- Unpublished projects won't show on the public portfolio

### Project Display Order
- Set the "Display Order" field (0, 1, 2, etc.)
- Lower numbers appear first
- Projects with same order are sorted by creation date

## Color Schemes (Gradients)

Choose from these preset gradients:
- **Blue to Cyan**: `from-blue-500 to-cyan-500` (Default)
- **Purple to Indigo**: `from-purple-500 to-indigo-500`
- **Red to Orange**: `from-red-500 to-orange-500`
- **Green to Emerald**: `from-green-500 to-emerald-500`
- **Pink to Rose**: `from-pink-500 to-rose-500`

## Tips

### Best Practices
- Keep descriptions concise but informative (2-3 sentences)
- Use 3-5 technologies per project
- Add 3-4 key features
- Always add GitHub links when available
- Use live demo links to showcase working projects

### SEO & Performance
- Published projects load on the public site
- Unpublished projects are only visible in admin
- Projects are cached for better performance

### Security
- Never share your JWT_SECRET
- Use strong passwords
- Keep your .env files private
- Don't commit .env to Git

## Troubleshooting

### Can't Login
- Verify backend is running (http://localhost:5000/api/health)
- Check you created an admin account
- Clear browser cache and try again

### Projects Not Showing
- Check if projects are published (eye icon should be green)
- Verify backend is running
- Check browser console for errors

### Changes Not Appearing
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check if project is published
- Verify API connection

## API Endpoints Reference

### Public Endpoints
- `GET /api/projects` - Get all published projects

### Admin Endpoints (Require Authentication)
- `GET /api/projects/all` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

## Future Features (Coming Soon)
- [ ] Image upload for projects
- [ ] Manage certificates section
- [ ] Manage experience section
- [ ] Manage about section
- [ ] Analytics dashboard
- [ ] Bulk import/export
