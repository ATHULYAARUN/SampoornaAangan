# Vercel Deployment Guide - SampoornaAangan

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Git repository pushed to GitHub
- MongoDB Atlas connection string

## Step 1: Install Vercel CLI

```powershell
npm install -g vercel
```

## Step 2: Login to Vercel

```powershell
vercel login
```

Follow the prompts to authenticate.

## Step 3: Deploy Backend

### 3.1 Navigate to backend directory
```powershell
cd "D:\Project copy\latest\edit L5\angan S9 latest original copy\backend"
```

### 3.2 Deploy backend
```powershell
vercel
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → `sampoornaaangan-backend` (or your preferred name)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

### 3.3 Set environment variables

After first deployment, set the environment variables:

```powershell
vercel env add MONGODB_URI production
```
Paste: `mongodb+srv://sampoornaadmin:qiEbNqkB6fhm-2G@cluster0.8tilqvr.mongodb.net/sampoornaangan?retryWrites=true&w=majority&appName=Cluster0`

```powershell
vercel env add JWT_SECRET production
```
Paste: `your-secret-jwt-key-here-change-in-production`

```powershell
vercel env add ALLOWED_ORIGINS production
```
Paste: `https://your-frontend-domain.vercel.app`

### 3.4 Redeploy with environment variables
```powershell
vercel --prod
```

**Note the backend URL** (e.g., `https://sampoornaaangan-backend.vercel.app`)

## Step 4: Deploy Frontend

### 4.1 Navigate to frontend directory
```powershell
cd "D:\Project copy\latest\edit L5\angan S9 latest original copy\forntend"
```

### 4.2 Set API URL environment variable

```powershell
vercel env add VITE_API_URL production
```
Paste your backend URL from Step 3.4 (e.g., `https://sampoornaaangan-backend.vercel.app/api`)

### 4.3 Deploy frontend
```powershell
vercel --prod
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → `sampoornaaangan-frontend` (or your preferred name)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

**Note the frontend URL** (e.g., `https://sampoornaaangan-frontend.vercel.app`)

## Step 5: Update CORS Settings

### 5.1 Update backend ALLOWED_ORIGINS

```powershell
cd "D:\Project copy\latest\edit L5\angan S9 latest original copy\backend"
vercel env rm ALLOWED_ORIGINS production
vercel env add ALLOWED_ORIGINS production
```
Paste: `https://your-frontend-domain.vercel.app,https://sampoornaaangan-forntend3.onrender.com`

### 5.2 Redeploy backend
```powershell
vercel --prod
```

## Step 6: Test Admin Login

1. Visit your frontend URL
2. Go to login page
3. Enter:
   - **Email/Username:** `admin@sampoornaangan.gov.in` or `admin`
   - **Password:** `admin123`
4. Click login (no role selection needed for admin)
5. You should be redirected to admin dashboard

## Troubleshooting

### Backend not responding
- Check Vercel dashboard → Your Project → Deployments → Click deployment → View Function Logs
- Ensure environment variables are set correctly

### CORS errors
- Verify ALLOWED_ORIGINS includes your frontend URL
- Check browser console for exact error
- Redeploy backend after changing CORS settings

### 401 Unauthorized on admin login
- Verify admin password was set correctly (run `node update-admin-password.js` locally)
- Check backend logs in Vercel dashboard for detailed error

### Frontend can't reach backend
- Verify VITE_API_URL is set correctly in frontend env vars
- Check Network tab in browser DevTools for actual URL being called
- Ensure backend URL ends with `/api` in the frontend env var

## Quick Commands Reference

```powershell
# Deploy backend to production
cd backend
vercel --prod

# Deploy frontend to production
cd forntend
vercel --prod

# View deployments
vercel ls

# View logs (after deployment)
vercel logs [deployment-url]

# Remove environment variable
vercel env rm [VAR_NAME] production

# Add environment variable
vercel env add [VAR_NAME] production
```

## Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. For backend:
   - Root Directory: `backend`
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Environment Variables: Add MONGODB_URI, JWT_SECRET, ALLOWED_ORIGINS
4. For frontend:
   - Root Directory: `forntend`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add VITE_API_URL

## Post-Deployment

- Update your DNS settings if using custom domain
- Enable automatic Git deployments in Vercel dashboard
- Set up production monitoring and alerts
- Update README with new deployment URLs

## Benefits of Vercel over Render

✅ Faster cold starts (no sleep on free tier)
✅ Better performance with edge network
✅ Automatic HTTPS and SSL
✅ Easy rollbacks and preview deployments
✅ Built-in analytics and monitoring
✅ Faster deployment times
