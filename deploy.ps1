# SampoornaAangan Deployment Script for Windows
# PowerShell script to help deploy your project online

Write-Host "🚀 SampoornaAangan Deployment Helper" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔧 Choose your deployment option:" -ForegroundColor Cyan
Write-Host "1. Quick Deploy (Vercel + Railway)" -ForegroundColor Yellow
Write-Host "2. Manual Setup Instructions" -ForegroundColor Yellow
Write-Host "3. Build for Production Only" -ForegroundColor Yellow
Write-Host "4. Exit" -ForegroundColor Yellow

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🚀 Quick Deploy Setup" -ForegroundColor Green
        Write-Host "====================" -ForegroundColor Green
        
        # Check if Vercel CLI is installed
        try {
            vercel --version | Out-Null
        } catch {
            Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
            npm install -g vercel
        }
        
        Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
        
        # Install frontend dependencies
        Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
        Set-Location forntend
        npm install
        
        # Build frontend
        Write-Host "🔨 Building frontend..." -ForegroundColor Cyan
        npm run build
        
        Write-Host "✅ Frontend built successfully!" -ForegroundColor Green
        
        # Go back to root
        Set-Location ..
        
        # Install backend dependencies
        Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
        Set-Location backend
        npm install
        
        Write-Host "✅ Backend dependencies installed!" -ForegroundColor Green
        Set-Location ..
        
        Write-Host ""
        Write-Host "🎉 Project is ready for deployment!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Deploy frontend: cd forntend && vercel --prod" -ForegroundColor White
        Write-Host "2. Deploy backend to Railway: https://railway.app" -ForegroundColor White
        Write-Host "3. Update environment variables" -ForegroundColor White
        Write-Host "4. Test your deployed application" -ForegroundColor White
        Write-Host ""
        Write-Host "📖 See DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Yellow
    }
    
    "2" {
        Write-Host ""
        Write-Host "📖 Manual Setup Instructions" -ForegroundColor Green
        Write-Host "============================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Frontend Deployment (Vercel):" -ForegroundColor Cyan
        Write-Host "1. cd forntend" -ForegroundColor White
        Write-Host "2. npm install" -ForegroundColor White
        Write-Host "3. npm run build" -ForegroundColor White
        Write-Host "4. npx vercel --prod" -ForegroundColor White
        Write-Host ""
        Write-Host "Backend Deployment (Railway):" -ForegroundColor Cyan
        Write-Host "1. Create account at railway.app" -ForegroundColor White
        Write-Host "2. Connect your GitHub repository" -ForegroundColor White
        Write-Host "3. Deploy from main branch" -ForegroundColor White
        Write-Host "4. Set environment variables" -ForegroundColor White
        Write-Host ""
        Write-Host "Database Setup (MongoDB Atlas):" -ForegroundColor Cyan
        Write-Host "1. Create account at mongodb.com" -ForegroundColor White
        Write-Host "2. Create cluster" -ForegroundColor White
        Write-Host "3. Get connection string" -ForegroundColor White
        Write-Host "4. Update MONGODB_URI in environment variables" -ForegroundColor White
        Write-Host ""
        Write-Host "📖 See DEPLOYMENT_GUIDE.md for complete instructions" -ForegroundColor Yellow
    }
    
    "3" {
        Write-Host ""
        Write-Host "🔨 Building for Production" -ForegroundColor Green
        Write-Host "=========================" -ForegroundColor Green
        
        Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
        
        # Install frontend dependencies and build
        Write-Host "Building frontend..." -ForegroundColor Cyan
        Set-Location forntend
        npm install
        npm run build
        Write-Host "✅ Frontend built successfully!" -ForegroundColor Green
        Set-Location ..
        
        # Install backend dependencies
        Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
        Set-Location backend
        npm install
        Write-Host "✅ Backend ready for production!" -ForegroundColor Green
        Set-Location ..
        
        Write-Host ""
        Write-Host "🎉 Production build complete!" -ForegroundColor Green
        Write-Host "Frontend build is in: forntend/dist" -ForegroundColor White
        Write-Host "Backend is ready to deploy from: backend/" -ForegroundColor White
    }
    
    "4" {
        Write-Host "👋 Goodbye!" -ForegroundColor Green
        exit 0
    }
    
    default {
        Write-Host "❌ Invalid choice. Please run the script again." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🔗 Useful Links:" -ForegroundColor Cyan
Write-Host "- Vercel: https://vercel.com" -ForegroundColor White
Write-Host "- Railway: https://railway.app" -ForegroundColor White
Write-Host "- MongoDB Atlas: https://mongodb.com" -ForegroundColor White
Write-Host "- Documentation: See DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host ""
Write-Host "✅ Done!" -ForegroundColor Green