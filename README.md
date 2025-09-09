# Sampoorna Aangan - Complete Anganwadi Management System

A comprehensive web application for managing Anganwadi centers, built with React.js frontend and Node.js backend.

## 🌟 Features

### User Management
- **Role-based Authentication**: Admin, Worker, and User roles
- **Secure Registration & Login**: JWT-based authentication
- **Google OAuth Integration**: Easy social login
- **Password Reset**: Email-based password recovery

### Admin Dashboard
- Complete user management
- Worker assignment and monitoring
- System analytics and reports
- Bulk user import functionality

### Worker Management
- Worker registration and profile management
- Task assignment and tracking
- Performance monitoring
- Real-time updates

### Modern UI/UX
- Responsive design with Tailwind CSS
- Professional and clean interface
- Mobile-friendly layout
- Smooth animations and transitions

## 🚀 Tech Stack

### Frontend
- **React.js** - Modern JavaScript library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Firebase** - Authentication and file storage

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Firebase project setup
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ATHULYAARUN/SampoornaAangan.git
cd SampoornaAangan
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/sampoornaangan

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Admin Configuration
ADMIN_EMAIL=admin@sampoornaangan.gov.in
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@sampoornaangan.gov.in
FRONTEND_URL=http://localhost:3000
```

### 3. Firebase Setup
1. Create a Firebase project
2. Download the service account key JSON file
3. Place it in `backend/config/keys/serviceAccountKey.json`
4. Update Firebase configuration in `backend/config/firebase.js`

### 4. Frontend Setup
```bash
cd ../forntend
npm install
```

### 5. Start the Application

Start the backend server:
```bash
cd backend
npm start
```

Start the frontend development server:
```bash
cd forntend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
SampoornaAangan/
├── backend/
│   ├── config/          # Database and Firebase configuration
│   ├── middleware/      # Authentication and validation middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts
│   ├── services/        # Business logic services
│   └── server.js        # Main server file
├── forntend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── contexts/    # React contexts
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── config/      # Configuration files
│   └── package.json
└── README.md
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- Environment variable protection
- Firebase security rules

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### User Management
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin only)

### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- `POST /api/admin/create-user` - Create new user
- `GET /api/admin/analytics` - System analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Athulya Arun
- **GitHub**: [@ATHULYAARUN](https://github.com/ATHULYAARUN)

## 📞 Support

For support, email support@sampoornaangan.gov.in or create an issue in this repository.

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Special thanks to the Anganwadi community for their feedback
- Built with ❤️ for better child care management

---

**Note**: This is a government project aimed at improving Anganwadi management systems across India.