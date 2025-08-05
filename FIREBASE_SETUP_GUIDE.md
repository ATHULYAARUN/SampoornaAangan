# 🔥 Firebase Setup Guide - Quick Fix

## 🚨 **Current Status**
Your backend is running with **limited Firebase functionality**. To enable full Google Sign-in and password reset features, you need to configure Firebase credentials.

## 🔧 **Quick Setup Options**

### **Option 1: Skip Firebase (Development Mode)**
For testing without Google Sign-in:
- ✅ **Email/Password login** works
- ✅ **User registration** works  
- ✅ **Admin login** works
- ❌ **Google Sign-in** disabled
- ❌ **Password reset emails** disabled

### **Option 2: Configure Firebase (Full Features)**

This guide will help you set up Firebase authentication with MongoDB backend for your SampoornaAngan project.

## 📋 Prerequisites

- Node.js installed
- MongoDB installed and running
- Firebase account
- Basic understanding of Firebase and MongoDB

## 🔥 Step 1: Firebase Console Setup

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `sampoornaangan` (or your preferred name)
4. Enable/disable Google Analytics (your choice)
5. Click **"Create project"**

### 1.2 Enable Authentication
1. In your Firebase project dashboard, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Enable **"Email/Password"** provider
6. Click **"Save"**

### 1.3 Get Web App Configuration
1. Click the gear icon ⚙️ next to **"Project Overview"**
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the web icon `</>`
5. Register your app:
   - App nickname: `SampoornaAngan Frontend`
   - Check **"Also set up Firebase Hosting"** (optional)
6. Copy the Firebase configuration object (you'll need this)

### 1.4 Generate Service Account Key (for Backend)
1. In Firebase Console, go to **"Project settings"**
2. Click **"Service accounts"** tab
3. Click **"Generate new private key"**
4. Click **"Generate key"** in the popup
5. Download the JSON file and save it securely

## 🛠️ Step 2: Backend Configuration

### 2.1 Place Service Account Key
1. Copy the downloaded JSON file to: `backend/config/keys/serviceAccountKey.json`
2. Make sure the file is named exactly `serviceAccountKey.json`

### 2.2 Update Frontend Firebase Config (if needed)
Your current config in `frontend/src/config/firebase.js` should work, but verify the project ID matches your Firebase project.

### 2.3 Environment Variables (Optional Alternative)
If you prefer using environment variables instead of the JSON file, uncomment and update the Firebase section in `backend/.env`:

```env
# Firebase Configuration (Alternative to JSON file)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
# ... other Firebase config values
```

## 🗄️ Step 3: MongoDB Setup

### 3.1 Install MongoDB (if not already installed)
- **Windows**: Download from [MongoDB Official Site](https://www.mongodb.com/try/download/community)
- **macOS**: `brew install mongodb-community`
- **Linux**: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

### 3.2 Start MongoDB Service
- **Windows**: MongoDB should start automatically, or run `net start MongoDB`
- **macOS/Linux**: `sudo systemctl start mongod` or `brew services start mongodb-community`

### 3.3 Verify MongoDB Connection
The backend will automatically connect to `mongodb://localhost:27017/sampoornaangan`

## 🚀 Step 4: Start the Application

### 4.1 Start Backend Server
```bash
cd backend
npm install  # if not already done
npm start
```

You should see:
```
✅ Firebase Admin SDK initialized successfully
🔥 Project ID: your-project-id
MongoDB Connected: localhost
🚀 SampoornaAngan Backend Server Started
```

### 4.2 Start Frontend Server
```bash
cd frontend
npm install  # if not already done
npm run dev
```

## 🧪 Step 5: Test the Setup

### 5.1 Test Registration
1. Go to `http://localhost:5173` (or your frontend URL)
2. Click "Sign up for free"
3. Fill the registration form with:
   - Role: Parent/Guardian or Adolescent Girl
   - Valid email and password
   - Required information
4. Submit the form

### 5.2 Test Login
1. Go to login page
2. Use the credentials you just registered
3. Select the correct role
4. Click "Sign In"

### 5.3 Test Admin-Created Users
Use these test credentials (already created):
- **Parent**: `parent@test.com` / `test123` (role: Parent/Guardian)
- **Worker**: `worker@test.com` / `worker123` (role: Anganwadi Worker)
- **Admin**: `admin@test.com` / `admin123`

## 🔧 How It Works

### Authentication Flow:

1. **Registration (Firebase + MongoDB)**:
   - User fills registration form
   - Frontend creates user in Firebase Auth
   - Backend receives Firebase token
   - Backend creates user record in MongoDB with Firebase UID

2. **Login (Firebase Primary)**:
   - User enters credentials
   - Frontend authenticates with Firebase
   - Frontend gets Firebase ID token
   - Backend verifies token and finds user in MongoDB
   - Backend returns user data and JWT token

3. **Login (Direct Fallback)**:
   - If Firebase fails, backend tries direct authentication
   - Used for admin-created users with temporary passwords
   - Backend validates credentials against MongoDB
   - Backend returns user data and JWT token

### Database Structure:
- **MongoDB**: Stores user profiles, roles, and application data
- **Firebase Auth**: Handles authentication and user management
- **Connection**: Users linked via Firebase UID stored in MongoDB

## 🛡️ Security Features

- **Firebase Authentication**: Secure user authentication
- **JWT Tokens**: Session management
- **Role-Based Access**: Different permissions for different user types
- **Password Validation**: Strong password requirements
- **Email Verification**: Firebase email verification (optional)

## 🐛 Troubleshooting

### Common Issues:

1. **"Firebase initialization error"**:
   - Check if `serviceAccountKey.json` is in the correct location
   - Verify the JSON file is valid and complete
   - Check Firebase project settings

2. **"MongoDB connection failed"**:
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify MongoDB service is started

3. **"Firebase ID token is required"**:
   - This means Firebase authentication failed
   - Check Firebase configuration in frontend
   - Verify Firebase project settings

4. **"User not found"**:
   - User might be in Firebase but not in MongoDB
   - Check if registration completed successfully
   - Verify user creation in both systems

### Debug Steps:
1. Check backend console logs for detailed error messages
2. Check browser console for frontend errors
3. Verify Firebase project configuration
4. Test MongoDB connection separately
5. Check network requests in browser dev tools

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JWT Documentation](https://jwt.io/introduction)

## 🎯 Next Steps

After setup is complete, you can:
1. Configure email verification in Firebase
2. Set up password reset functionality
3. Add more authentication providers (Google, Facebook, etc.)
4. Implement advanced security rules
5. Set up production deployment

---

**Need Help?** If you encounter any issues, check the troubleshooting section above or refer to the console logs for detailed error messages.