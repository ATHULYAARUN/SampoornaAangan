# 🛠️ Worker Management System - Setup Guide

## Overview
This guide covers the complete setup and configuration of the Worker Account Access Process for the SampoornaAngan system.

## 🏗️ System Architecture

### Worker Account Flow
```
Admin Creates Account → Email Sent → Worker Login → Password Change → Dashboard Access
```

## 📋 Prerequisites

### Backend Requirements
- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- Email service configuration (Gmail, SendGrid, etc.)

### Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/sampoornaangan

# JWT Secrets
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
ADMIN_JWT_EXPIRES_IN=24h

# Email Configuration (Choose one)
# Option 1: Gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@sampoornaangan.gov.in

# Option 2: SendGrid
# SENDGRID_API_KEY=your-sendgrid-api-key

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Server Configuration
PORT=5000
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Firebase Configuration (Optional)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

## 🚀 Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 3. Database Setup
The system will automatically create the required collections and indexes when you start the backend server.

## 📧 Email Service Configuration

### Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `EMAIL_PASS`

### SendGrid Setup (Recommended for Production)
1. Create a SendGrid account
2. Generate an API key
3. Verify your sender domain
4. Update the email service configuration in `backend/services/emailService.js`

## 🧪 Testing the System

### Run the Complete Workflow Test
```bash
cd backend
node scripts/testWorkerWorkflow.js
```

This test will:
- ✅ Create a test admin account
- ✅ Create a test worker account
- ✅ Test email service configuration
- ✅ Validate login process
- ✅ Test password change functionality
- ✅ Test password reset process

### Manual Testing Steps

#### 1. Admin Login
- URL: `http://localhost:3000/login`
- Email: `admin@sampoornaangan.gov.in`
- Password: `admin`

#### 2. Create Worker Account
- Navigate to Admin Dashboard → Worker Management
- Click "Create New Worker Account"
- Fill in worker details
- System sends email with credentials

#### 3. Worker First-Time Login
- Worker receives email with temporary password
- Login at `http://localhost:3000/login`
- System prompts for password change
- Worker sets new secure password

#### 4. Password Recovery
- Worker clicks "Forgot Password" on login page
- Enters email address
- Receives reset link via email
- Creates new password

## 🔧 API Endpoints

### Worker Management
```
POST /api/admin/workers          - Create worker account
GET  /api/admin/workers          - List all workers
GET  /api/admin/workers/:id      - Get worker details
PUT  /api/admin/workers/:id      - Update worker
DELETE /api/admin/workers/:id    - Delete worker
```

### Authentication
```
POST /api/auth/login             - Worker login
POST /api/auth/change-password   - Change password
POST /api/auth/logout            - Logout
```

### Password Reset
```
POST /api/password-reset/request - Request password reset
GET  /api/password-reset/verify/:token - Verify reset token
POST /api/password-reset/reset   - Reset password
```

## 🎯 Worker Roles & Dashboards

### Anganwadi Worker
- **Dashboard**: `/aww-dashboard`
- **Functions**: Child health records, nutrition tracking, attendance
- **Role ID**: `anganwadi-worker`

### ASHA Volunteer
- **Dashboard**: `/asha-dashboard`
- **Functions**: Maternal care, health screening, community outreach
- **Role ID**: `asha-volunteer`

### Sanitation Worker
- **Dashboard**: `/sanitation-dashboard`
- **Functions**: Hygiene monitoring, facility maintenance, waste management
- **Role ID**: `sanitation-worker`

## 🔐 Security Features

### Password Security
- Minimum 8 characters
- Must include uppercase, lowercase, number, and special character
- Bcrypt hashing with 12 salt rounds
- Temporary passwords expire on first use

### Token Security
- JWT tokens with expiration
- Secure HTTP-only cookies (production)
- Rate limiting on authentication endpoints
- Password reset tokens expire in 1 hour

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration

## 📊 Monitoring & Logging

### Backend Logs
- User registration/login attempts
- Password changes
- Email sending status
- Error tracking

### Frontend Analytics
- Login success/failure rates
- Password reset requests
- User session duration

## 🚨 Troubleshooting

### Common Issues

#### Email Not Sending
```bash
# Test email configuration
node -e "
const emailService = require('./services/emailService');
emailService.testConnection().then(console.log);
"
```

#### Database Connection Issues
```bash
# Check MongoDB connection
mongosh "mongodb://localhost:27017/sampoornaangan"
```

#### Frontend Build Issues
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Error Codes
- `AUTH001`: Invalid credentials
- `AUTH002`: Account not found
- `AUTH003`: Password change required
- `EMAIL001`: Email service not configured
- `EMAIL002`: Failed to send email

## 📈 Performance Optimization

### Database Indexes
```javascript
// User collection indexes
db.users.createIndex({ email: 1 })
db.users.createIndex({ role: 1 })
db.users.createIndex({ resetPasswordToken: 1 })
db.users.createIndex({ createdAt: -1 })
```

### Caching Strategy
- Redis for session management (production)
- In-memory caching for frequently accessed data
- CDN for static assets

## 🔄 Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] Email service verified
- [ ] Database backups enabled
- [ ] SSL certificates installed
- [ ] Rate limiting configured
- [ ] Monitoring setup
- [ ] Error tracking enabled

### Docker Deployment
```dockerfile
# Use the provided Dockerfile in the backend directory
docker build -t sampoornaangan-backend .
docker run -p 5000:5000 sampoornaangan-backend
```

## 📞 Support

### Development Team
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Tailwind CSS, Framer Motion
- **Email**: Nodemailer with multiple provider support
- **Security**: JWT, Bcrypt, Input validation

### Documentation
- API Documentation: `/api/docs` (when server is running)
- Component Documentation: Storybook (if configured)
- Database Schema: `backend/models/`

---

## 🎉 Success Metrics

When properly configured, the system should achieve:
- ✅ 100% automated worker account creation
- ✅ Instant email delivery of credentials
- ✅ Seamless first-time login experience
- ✅ Secure password management
- ✅ Role-based dashboard access
- ✅ Reliable password recovery

**The Worker Management System is now ready for production use!** 🚀