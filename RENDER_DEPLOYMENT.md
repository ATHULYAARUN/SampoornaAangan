# Render Deployment Guide

## 🚀 Live URLs
- **Frontend**: https://sampoornaaangan-forntend2.onrender.com
- **Backend**: https://sampoornaaangan-backend.onrender.com

## ⚙️ Required Environment Variables

### Backend Service
Set these in Render Dashboard → Backend Service → Environment:

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRE=7d
FIREBASE_PROJECT_ID=<your-firebase-project-id>
# Add other backend env vars as needed
```

### Frontend Service (CRITICAL!)
Set these in Render Dashboard → Frontend Service → Environment:

```bash
# This MUST be set BEFORE the build runs!
VITE_API_URL=https://sampoornaaangan-backend.onrender.com/api
```

**⚠️ IMPORTANT**: Vite environment variables are **baked into the build at build-time**. 
If you add or change `VITE_API_URL` after deployment, you MUST manually redeploy to rebuild.

## 🔧 How to Deploy

### Initial Setup
1. Push code to GitHub
2. Create Backend service on Render:
   - Build Command: `npm install`
   - Start Command: `npm start` or `node server.js`
   - Set all backend environment variables
3. Create Frontend service on Render:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - **CRITICAL**: Set `VITE_API_URL` environment variable BEFORE first deploy
4. Both services will auto-deploy on git push to main

### After Code Changes
1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
2. Render will automatically redeploy both services

### Troubleshooting

#### "Failed to fetch" or "ERR_NAME_NOT_RESOLVED"
**Cause**: Frontend was built without VITE_API_URL set.

**Fix**:
1. Go to Render Dashboard → Frontend Service → Environment
2. Add: `VITE_API_URL` = `https://sampoornaaangan-backend.onrender.com/api`
3. Click "Manual Deploy" → "Clear build cache & deploy"

#### CORS Errors
**Cause**: Backend CORS not allowing frontend domain.

**Fix**: Already configured in `backend/server.js` to allow `https://sampoornaaangan-forntend2.onrender.com`

#### Backend Connection Issues
1. Check backend logs in Render dashboard
2. Verify MongoDB connection string is correct
3. Ensure all required environment variables are set

## 🧪 Testing After Deployment

### Quick Health Check
```bash
# Test backend (PowerShell):
iwr https://sampoornaaangan-backend.onrender.com/health -UseBasicParsing

# Should return:
# StatusCode: 200
# Content: {"status":"OK","message":"Server running"}
```

### Frontend Testing
1. Open: https://sampoornaaangan-forntend2.onrender.com/login
2. Open Browser DevTools → Console
3. Try to log in
4. Check Network tab:
   - Should see POST to: `https://sampoornaaangan-backend.onrender.com/api/auth/login`
   - Should NOT see any CORS errors
   - Should NOT see `your-backend-domain.com` or `localhost`

## 📝 Notes

- Frontend build time: ~2-3 minutes
- Backend startup time: ~1-2 minutes
- Free tier services may spin down after inactivity (first request will be slow)
- Always set environment variables BEFORE deploying
- Check "Clear build cache & deploy" if env vars don't take effect
