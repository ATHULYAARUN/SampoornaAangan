#!/bin/bash

# SampoornaAangan Deployment Script
# This script helps you deploy your project online

echo "🚀 SampoornaAangan Deployment Helper"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

echo ""
echo "🔧 Choose your deployment option:"
echo "1. Quick Deploy (Vercel + Railway)"
echo "2. Manual Setup Instructions"
echo "3. Build for Production Only"
echo "4. Exit"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Quick Deploy Setup"
        echo "===================="
        
        # Install Vercel CLI if not installed
        if ! command -v vercel &> /dev/null; then
            echo "📦 Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "📦 Installing dependencies..."
        
        # Install frontend dependencies
        echo "Installing frontend dependencies..."
        cd forntend
        npm install
        
        # Build frontend
        echo "🔨 Building frontend..."
        npm run build
        
        echo "✅ Frontend built successfully!"
        
        # Go back to root
        cd ..
        
        # Install backend dependencies
        echo "Installing backend dependencies..."
        cd backend
        npm install
        
        echo "✅ Backend dependencies installed!"
        cd ..
        
        echo ""
        echo "🎉 Project is ready for deployment!"
        echo ""
        echo "Next steps:"
        echo "1. Deploy frontend: cd forntend && vercel --prod"
        echo "2. Deploy backend to Railway: https://railway.app"
        echo "3. Update environment variables"
        echo "4. Test your deployed application"
        echo ""
        echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
        ;;
        
    2)
        echo ""
        echo "📖 Manual Setup Instructions"
        echo "============================"
        echo ""
        echo "Frontend Deployment (Vercel):"
        echo "1. cd forntend"
        echo "2. npm install"
        echo "3. npm run build"
        echo "4. npx vercel --prod"
        echo ""
        echo "Backend Deployment (Railway):"
        echo "1. Create account at railway.app"
        echo "2. Connect your GitHub repository"
        echo "3. Deploy from main branch"
        echo "4. Set environment variables"
        echo ""
        echo "Database Setup (MongoDB Atlas):"
        echo "1. Create account at mongodb.com"
        echo "2. Create cluster"
        echo "3. Get connection string"
        echo "4. Update MONGODB_URI in environment variables"
        echo ""
        echo "📖 See DEPLOYMENT_GUIDE.md for complete instructions"
        ;;
        
    3)
        echo ""
        echo "🔨 Building for Production"
        echo "========================="
        
        echo "📦 Installing dependencies..."
        
        # Install frontend dependencies and build
        echo "Building frontend..."
        cd forntend
        npm install
        npm run build
        echo "✅ Frontend built successfully!"
        cd ..
        
        # Install backend dependencies
        echo "Installing backend dependencies..."
        cd backend
        npm install
        echo "✅ Backend ready for production!"
        cd ..
        
        echo ""
        echo "🎉 Production build complete!"
        echo "Frontend build is in: forntend/dist"
        echo "Backend is ready to deploy from: backend/"
        ;;
        
    4)
        echo "👋 Goodbye!"
        exit 0
        ;;
        
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🔗 Useful Links:"
echo "- Vercel: https://vercel.com"
echo "- Railway: https://railway.app"
echo "- MongoDB Atlas: https://mongodb.com"
echo "- Documentation: See DEPLOYMENT_GUIDE.md"
echo ""
echo "✅ Done!"