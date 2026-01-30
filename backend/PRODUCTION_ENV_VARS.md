# Production Environment Variables

Use these environment variables when deploying your backend to production.

## Required Environment Variables

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://billionairemind000_db_user:i86ix2nBXpayAjfg@cluster0.imsoszr.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=EKK1mj3BZx7r4sEPqcmvvUPbyMV3qsyZ7MoMqiW24hHYhqnj5oDYBnZdaA9YtBiLQJQLggut7d4
FRONTEND_URL=https://sharifiddrisu-online.netlify.app
```

## How to Add on Different Platforms

### Render
1. Go to your service dashboard
2. Click "Environment" tab
3. Add each variable above
4. Click "Save Changes"

### Railway
1. Go to your service
2. Click "Variables" tab
3. Add each variable above
4. Deploy automatically updates

### Vercel
1. Go to project settings
2. Click "Environment Variables"
3. Add each variable above
4. Redeploy

## Important Notes

- **FRONTEND_URL**: Your Netlify frontend URL (already configured)
- **MONGODB_URI**: Your MongoDB Atlas connection string
- **JWT_SECRET**: Keep this secret and secure
- **NODE_ENV**: Must be "production" for production deployment
- **PORT**: Usually auto-assigned by platform, but 5000 is default

## CORS Configuration

Your backend is configured to accept requests from:
- `https://sharifiddrisu-online.netlify.app` (production)
- `http://localhost:8080` (development)
- `http://localhost:5173` (development)
- `http://localhost:3000` (development)

This is handled automatically in `backend/src/server.ts`.

## After Deployment

Once your backend is deployed, you'll need to update your frontend:

1. Get your backend URL (e.g., `https://your-backend.onrender.com`)
2. Update frontend environment variable:
   ```env
   VITE_API_URL=https://your-backend.onrender.com
   ```
3. Redeploy frontend on Netlify

## Testing

After deployment, test your API:

```bash
# Health check
curl https://your-backend-url.com/api/health

# Projects
curl https://your-backend-url.com/api/projects

# Hero
curl https://your-backend-url.com/api/hero
```

All endpoints should return JSON responses.
