const express = require('express');
const router = express.Router();
const AnganwadiCenter = require('../models/AnganwadiCenter');

// Create new Anganwadi Center
router.post('/', async (req, res) => {
  try {
    const { name, location, pincode, anganwadiCode, workersCount, childrenCount } = req.body;
    if (!name || !location || !pincode || !anganwadiCode || workersCount == null || childrenCount == null) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const center = new AnganwadiCenter({ name, location, pincode, anganwadiCode, workersCount, childrenCount });
    await center.save();
    res.status(201).json({ success: true, message: 'Anganwadi Center created successfully', data: center });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = error.keyPattern.name ? 'name' : 'anganwadiCode';
      return res.status(400).json({ success: false, message: `Center with this ${duplicateField} already exists.` });
    }
    res.status(500).json({ success: false, message: 'Failed to create center', error: error.message });
  }
});

// Get all Anganwadi Centers
router.get('/', async (req, res) => {
  try {
    const centers = await AnganwadiCenter.find().sort({ createdAt: -1 });
    res.json({ success: true, data: centers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch centers', error: error.message });
  }
});

// Update worker and children counts for a specific center
router.put('/:id/update-counts', async (req, res) => {
  try {
    const { id } = req.params;
    const { workersCount, childrenCount } = req.body;
    
    const center = await AnganwadiCenter.findByIdAndUpdate(
      id,
      { 
        workersCount: workersCount || 0,
        childrenCount: childrenCount || 0,
        lastUpdate: new Date()
      },
      { new: true }
    );
    
    if (!center) {
      return res.status(404).json({ success: false, message: 'Center not found' });
    }
    
    res.json({ success: true, message: 'Counts updated successfully', data: center });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update counts', error: error.message });
  }
});

// Refresh counts for all centers based on actual database data
router.post('/refresh-counts', async (req, res) => {
  try {
    const User = require('../models/User');
    const Child = require('../models/Child');
    
    const centers = await AnganwadiCenter.find();
    const updatedCenters = [];
    
    for (const center of centers) {
      // Count workers for this center
      const workersCount = await User.countDocuments({ 
        role: 'worker', 
        anganwadiCenter: center.name 
      });
      
      // Count children for this center
      const childrenCount = await Child.countDocuments({ 
        anganwadiCenter: center.name 
      });
      
      // Update the center
      const updatedCenter = await AnganwadiCenter.findByIdAndUpdate(
        center._id,
        { 
          workersCount,
          childrenCount,
          lastUpdate: new Date()
        },
        { new: true }
      );
      
      updatedCenters.push(updatedCenter);
    }
    
    res.json({ 
      success: true, 
      message: 'All counts refreshed successfully', 
      data: updatedCenters 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to refresh counts', error: error.message });
  }
});

module.exports = router;
