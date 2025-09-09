const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sampoornaangan');
    console.log('Connected to MongoDB');

    const admin = await Admin.findOne({ email: 'admin@sampoornaangan.gov.in' });
    if (!admin) {
      console.log('Admin user not found.');
      return;
    }

    admin.password = 'admin123';
    await admin.save();
    console.log('✅ Admin password reset to admin123');
  } catch (error) {
    console.error('❌ Error resetting admin password:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

resetAdminPassword();
