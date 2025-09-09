const mongoose = require('mongoose');

const anganwadiCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true
  },
  anganwadiCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  workersCount: {
    type: Number,
    required: true,
    min: 0
  },
  childrenCount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AnganwadiCenter', anganwadiCenterSchema);
