const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const AnganwadiCenter = require('../models/AnganwadiCenter');
const User = require('../models/User');
const Child = require('../models/Child');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const addAnganwadiCenters = async () => {
  try {
    // First, let's count existing workers and children for each center
    const akkarakunnuWorkers = await User.countDocuments({ 
      role: 'worker', 
      anganwadiCenter: 'Akkarakunnu' 
    });
    
    const akkarakunnuChildren = await Child.countDocuments({ 
      anganwadiCenter: 'Akkarakunnu' 
    });

    const veliyanoorWorkers = await User.countDocuments({ 
      role: 'worker', 
      anganwadiCenter: 'Veliyanoor' 
    });
    
    const veliyanoorChildren = await Child.countDocuments({ 
      anganwadiCenter: 'Veliyanoor' 
    });

    // Define the anganwadi centers data
    const anganwadiCenters = [
      {
        name: 'Akkarakunnu',
        location: 'Elangulam',
        pincode: '686522',
        anganwadiCode: 'AW-AK101',
        workersCount: akkarakunnuWorkers || 2, // Default to 2 if no workers found
        childrenCount: akkarakunnuChildren || 15, // Default to 15 if no children found
        status: 'Active'
      },
      {
        name: 'Veliyanoor',
        location: 'Veliyanoor',
        pincode: '686522',
        anganwadiCode: 'AW-VY102',
        workersCount: veliyanoorWorkers || 3, // Default to 3 if no workers found
        childrenCount: veliyanoorChildren || 18, // Default to 18 if no children found
        status: 'Active'
      }
    ];

    // Clear existing centers first (optional - remove this if you want to keep existing data)
    await AnganwadiCenter.deleteMany({});
    console.log('Cleared existing anganwadi centers');

    // Add the new centers
    for (const centerData of anganwadiCenters) {
      const existingCenter = await AnganwadiCenter.findOne({ name: centerData.name });
      
      if (existingCenter) {
        // Update existing center
        await AnganwadiCenter.findByIdAndUpdate(existingCenter._id, centerData);
        console.log(`Updated ${centerData.name} center`);
      } else {
        // Create new center
        const center = new AnganwadiCenter(centerData);
        await center.save();
        console.log(`Added ${centerData.name} center`);
      }
    }

    console.log('Successfully added/updated anganwadi centers:');
    const centers = await AnganwadiCenter.find();
    centers.forEach(center => {
      console.log(`- ${center.name} (${center.anganwadiCode}) - ${center.location}, ${center.pincode}`);
      console.log(`  Workers: ${center.workersCount}, Children: ${center.childrenCount}`);
    });

  } catch (error) {
    console.error('Error adding anganwadi centers:', error);
  }
};

const main = async () => {
  await connectDB();
  await addAnganwadiCenters();
  await mongoose.connection.close();
  console.log('Database connection closed');
};

main();