# SampoornaAangan Deployment Guide

## 🚀 Making Your Project Online

This guide will help you deploy your SampoornaAangan project online while keeping all existing functionality intact.

## Option 1: Vercel + Railway (Recommended)

### Frontend Deployment (Vercel)

1. **Prepare Frontend for Deployment**
   ```bash
   cd forntend
   npm run build
   ```

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

### Backend Deployment (Railway)

1. **Create Railway Account**: Visit [railway.app](https://railway.app)
2. **Connect GitHub Repository**
3. **Deploy from GitHub**
4. **Set Environment Variables**

### Environment Variables for Railway:
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex-sampoornaangan-2024
ADMIN_EMAIL=admin@sampoornaangan.gov.in
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
FIREBASE_PROJECT_ID=anganwadi-3e5b0
```

## Option 2: Netlify + Heroku

### Frontend (Netlify)
1. **Build the project**
   ```bash
   cd forntend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect GitHub repository

### Backend (Heroku)
1. **Install Heroku CLI**
2. **Create Heroku App**
   ```bash
   cd backend
   heroku create sampoornaangan-api
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

## Option 3: DigitalOcean App Platform

### Full Stack Deployment
1. **Connect GitHub Repository**
2. **Configure Build Settings**
3. **Set Environment Variables**
4. **Deploy**

## Option 4: Self-Hosted VPS (Advanced)

### Prerequisites
- Ubuntu/CentOS VPS
- Domain name
- SSL certificate

### Setup Steps
1. **Install Node.js and MongoDB**
2. **Clone Repository**
3. **Install Dependencies**
4. **Configure Nginx**
5. **Setup PM2 for Process Management**
6. **Configure SSL with Let's Encrypt**

---

## 🔧 Quick Setup Instructions

### Step 1: Prepare for Production

1. **Update API URLs**
   Create production environment file:
   ```bash
   # forntend/.env.production
   VITE_API_URL=https://your-backend-domain.com/api
   VITE_FIREBASE_CONFIG=your_firebase_config
   ```

2. **Update CORS Settings**
   In `backend/server.js`, update CORS origins:
   ```javascript
   const corsOptions = {
     origin: process.env.NODE_ENV === 'production' 
       ? ['https://your-frontend-domain.com'] 
       : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
     credentials: true,
     optionsSuccessStatus: 200,
   };
   ```

### Step 2: Choose Your Deployment Method

#### For Beginners (Easiest):
- **Frontend**: Vercel or Netlify
- **Backend**: Railway or Render
- **Database**: MongoDB Atlas (Free tier)

#### For Advanced Users:
- **Full Stack**: DigitalOcean App Platform
- **Custom**: VPS with Docker

### Step 3: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
2. **Create Cluster**
3. **Get Connection String**
4. **Update Environment Variables**

### Step 4: Deploy

Follow the specific instructions for your chosen platform above.

---

## 🛡️ Security Checklist

- [ ] Update JWT secrets
- [ ] Configure CORS properly
- [ ] Set up HTTPS
- [ ] Use environment variables
- [ ] Enable MongoDB authentication
- [ ] Configure rate limiting
- [ ] Set up monitoring

---

## 📱 Post-Deployment Testing

1. **Test All Features**
   - User authentication
   - Admin dashboard
   - Reports & Analytics
   - Data export
   - PDF generation

2. **Verify Security**
   - HTTPS enabled
   - API endpoints protected
   - File uploads working
   - Database connections secure

3. **Performance Check**
   - Page load times
   - API response times
   - Charts and visualizations
   - PDF generation speed

---

## 🔧 Maintenance

### Regular Tasks
- Monitor server logs
- Update dependencies
- Backup database
- Check SSL certificates
- Monitor performance metrics

### Scaling Considerations
- CDN for static assets
- Load balancers for high traffic
- Database replicas
- Caching strategies

---

## 📞 Support

If you encounter any issues during deployment:
1. Check the logs for error messages
2. Verify environment variables
3. Test database connectivity
4. Ensure all dependencies are installed
5. Check CORS and security settings

Your project will be fully functional online with all existing features preserved!