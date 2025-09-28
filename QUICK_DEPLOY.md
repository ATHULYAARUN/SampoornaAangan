# 🚀 Quick Deployment Guide

## Make Your SampoornaAangan Project Online

### 🎯 Quick Start (5 Minutes)

1. **Run the deployment helper:**
   ```powershell
   .\deploy.ps1
   ```

2. **Choose Option 1 (Quick Deploy)**

3. **Follow the on-screen instructions**

### 🌐 Recommended Deployment Stack

- **Frontend**: Vercel (Free tier available)
- **Backend**: Railway (Free tier available)
- **Database**: MongoDB Atlas (Free tier available)

### 📝 Simple Steps

#### Step 1: Prepare Your Project
```bash
# Build frontend
cd forntend
npm run build

# Install backend dependencies
cd ../backend
npm install
```

#### Step 2: Deploy Frontend (Vercel)
1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `cd forntend && vercel --prod`
3. Follow prompts to connect GitHub

#### Step 3: Deploy Backend (Railway)
1. Visit [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy from main branch
4. Add environment variables

#### Step 4: Setup Database (MongoDB Atlas)
1. Create account at [mongodb.com](https://mongodb.com)
2. Create free cluster
3. Get connection string
4. Add to Railway environment variables

### 🔑 Environment Variables Needed

**Backend (Railway):**
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-secret-key
ADMIN_EMAIL=admin@sampoornaangan.gov.in
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

**Frontend (Vercel):**
```env
VITE_API_URL=https://your-railway-backend-url/api
```

### ✅ After Deployment

Your project will be accessible at:
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-project.railway.app`

### 🛡️ All Features Will Work

- ✅ User Authentication
- ✅ Admin Dashboard
- ✅ Reports & Analytics
- ✅ Worker Management
- ✅ Registration System
- ✅ PDF Generation
- ✅ Data Export

### 📞 Need Help?

1. Check `DEPLOYMENT_GUIDE.md` for detailed instructions
2. Run `.\deploy.ps1` for interactive help
3. All existing functionality remains intact

**Your project will be fully online and accessible from anywhere! 🌐**