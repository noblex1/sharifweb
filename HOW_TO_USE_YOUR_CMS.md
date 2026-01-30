# How to Use Your Portfolio CMS

## Getting Started

### 1. Start Your Development Environment

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
✅ Frontend running on http://localhost:8080

### 2. Access Admin Dashboard

1. Open browser: http://localhost:8080/admin/login
2. Login with your admin credentials
3. You'll see 7 tabs for managing content

## Managing Content

### Projects Tab
**What you can do:**
- Add new projects
- Edit existing projects
- Delete projects
- Publish/unpublish projects
- Reorder projects

**How to add a project:**
1. Click "Add Project" button
2. Fill in:
   - Title
   - Description
   - Technologies (add multiple)
   - Category
   - Status
   - Features (add multiple)
   - Period
   - GitHub URL (optional)
   - Live URL (optional)
3. Check "Published" to make it visible
4. Click "Save Project"
5. Page auto-refreshes

### Experience Tab
**What you can do:**
- Add work experience
- Edit experience entries
- Delete experience
- Publish/unpublish
- Reorder entries

**How to add experience:**
1. Click "Add Experience"
2. Fill in:
   - Company name
   - Position
   - Period (e.g., "06/2025 - 08/2025")
   - Location
   - Description
   - Achievements (add multiple)
   - Contact information
3. Check "Published"
4. Click "Save Experience"

### Certificates Tab
**What you can do:**
- Add certificates
- Edit certificates
- Delete certificates
- Publish/unpublish
- Reorder certificates

**How to add certificate:**
1. Click "Add Certificate"
2. Fill in:
   - Title
   - Issuer
   - Type (optional)
   - Event (optional)
   - Period
   - Description
   - Category
   - Gradient (color scheme)
   - Credential URL (optional)
3. Check "Published"
4. Click "Save Certificate"

### Tech Stack Tab
**What you can do:**
- Add technologies
- Edit tech items
- Delete tech items
- Publish/unpublish
- Reorder items

**How to add tech:**
1. Click "Add Tech"
2. Fill in:
   - Name
   - Category (languages/frameworks/tools)
   - Level (0-100%)
   - Icon (emoji)
   - Description
3. Check "Published"
4. Click "Save Tech Stack"

### About Tab (Phase 2)
**What you can do:**
- Edit your bio
- Update location
- Manage skills list
- Manage achievements/education

**How to edit:**
1. Click "About" tab
2. Click "Edit About"
3. Update:
   - **Bio:** Your full biography text
   - **Location:** Current location
   - **Skills:** Click "+" to add, "X" to remove
   - **Achievements:** Add education/experience entries
     - Icon name (e.g., "Book", "Code")
     - Title
     - Description
     - Year/Period
     - Location
4. Check "Published"
5. Click "Save About Section"

### Hero Tab (Phase 2)
**What you can do:**
- Edit your name
- Manage rotating taglines
- Update subtitle
- Change profile image
- Update CV link
- Update social links

**How to edit:**
1. Click "Hero" tab
2. Click "Edit Hero"
3. Update:
   - **Name:** Your full name
   - **Taglines:** Add multiple (they rotate automatically)
   - **Subtitle:** Your professional description
   - **Profile Image:** Path to image (e.g., "/assets/1.jpg")
   - **CV URL:** Path to CV (e.g., "/assets/Sharif CV.pdf")
   - **Social Links:** GitHub, LinkedIn, Twitter, Facebook URLs
4. Check "Published"
5. Click "Save Hero Section"

### Contact Tab (Phase 2)
**What you can do:**
- Update contact information
- Update social media links

**How to edit:**
1. Click "Contact" tab
2. Click "Edit Contact"
3. Update:
   - **Location:** Full location
   - **Email:** Contact email
   - **Phone:** Phone number
   - **Portfolio:** Portfolio website URL
   - **Social Links:** All social media URLs
4. Check "Published"
5. Click "Save Contact Section"

## Tips & Tricks

### Publishing Content
- **Unpublished items** won't show on public site
- Use this to prepare content before making it live
- Eye icon shows publish status (green = published)

### Reordering Items (Phase 1 sections)
- Items display in order of their "order" field
- Lower numbers appear first
- Edit item and change order number

### Adding Multiple Items
- Technologies, Skills, Features, Achievements support multiple entries
- Use the "+" button to add
- Use the "X" button to remove

### Social Links
- Always use full URLs (https://...)
- Test links after saving
- Same links can be used across Hero and Contact sections

### Images & Files
- Place images in `public/assets/` folder
- Reference as `/assets/filename.jpg`
- For CV: `/assets/YourName CV.pdf`

## Viewing Your Changes

### Public Site
Visit: http://localhost:8080

All published content appears here immediately!

### Testing Changes
1. Make changes in admin
2. Save
3. Page auto-refreshes
4. Go to public site
5. Hard refresh (Ctrl+Shift+R) if needed

## Common Tasks

### Update Your Bio
1. Admin → About tab
2. Edit About
3. Update bio text
4. Save

### Add New Project
1. Admin → Projects tab
2. Add Project
3. Fill all fields
4. Save

### Change Profile Picture
1. Add new image to `public/assets/`
2. Admin → Hero tab
3. Edit Hero
4. Update "Profile Image" path
5. Save

### Update Social Links
1. Admin → Hero or Contact tab
2. Edit section
3. Update social link URLs
4. Save

### Add New Skill
1. Admin → About tab
2. Edit About
3. Type skill name
4. Click "+" button
5. Save

## Troubleshooting

### Changes not showing?
- Hard refresh browser (Ctrl+Shift+R)
- Check if item is published
- Check browser console for errors

### Can't login?
```bash
# Create new admin account
cd backend
npm run create-admin
```

### Data disappeared?
```bash
# Re-seed database
cd backend
npx tsx scripts/seedAll.ts
```

### Backend not responding?
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Restart backend
cd backend
npm run dev
```

## Best Practices

### Content Writing
- Keep descriptions concise
- Use bullet points for features/achievements
- Proofread before publishing
- Test all links

### Images
- Use optimized images (compress before uploading)
- Use consistent image sizes
- Use descriptive filenames

### Regular Maintenance
- Review content monthly
- Update project statuses
- Add new skills as you learn
- Keep contact info current

## Production Deployment

When ready to deploy:

1. **Remove fallback data** from public components
2. **Set environment variables** for production
3. **Deploy backend** to Railway/Render
4. **Deploy frontend** to Vercel/Netlify
5. **Update CORS** settings for production domain
6. **Test everything** on production

## Need Help?

### Check Documentation
- `PHASE1_COMPLETE.md` - Phase 1 features
- `PHASE2_COMPLETE.md` - Phase 2 features
- `QUICK_START.md` - Quick reference
- `README.md` - Project overview

### Common Issues
- MongoDB not running → `sudo systemctl start mongod`
- Port already in use → Kill process or change port
- Authentication errors → Check JWT_SECRET in .env

## Summary

You now have a complete CMS for your portfolio! Every section is manageable through the admin dashboard. No code changes needed for content updates.

**Happy content managing!** 🎉
