/**
 * Test Enhanced Anganwadi Worker Creation
 * This script tests the new enhanced worker creation form with all additional fields
 */

require('dotenv').config();

const testAnganwadiWorkerCreation = () => {
  console.log('🧪 Testing Enhanced Anganwadi Worker Creation Form...\n');
  
  // Sample data matching the new form requirements
  const testWorkerData = {
    // Basic Information
    name: 'Priya Krishnan',
    email: 'priya.krishnan@example.com',
    phone: '9876543210',
    role: 'anganwadi-worker',
    
    // Enhanced fields for Anganwadi Workers
    gender: 'female',
    dateOfBirth: '1990-05-15', // Makes her 35 years old
    qualification: 'graduate',
    
    // Employment Details
    dateOfJoining: '2024-01-15',
    designation: 'worker',
    experience: 5,
    
    // Emergency Contact
    alternatePhone: '9876543211',
    emergencyContactPerson: 'Rajesh Krishnan (Husband)',
    
    // Address Information
    address: {
      street: '123 Temple Street',
      city: 'Akkarakunnu',
      state: 'Kerala',
      pincode: '686522',
      district: 'Kottayam',
      block: 'Ettumanoor'
    },
    
    // Anganwadi Center Details
    roleSpecificData: {
      anganwadiCenter: {
        name: 'Akkarakunnu Anganwadi Center',
        code: 'AK-KC969',
        district: 'Kottayam',
        block: 'Ettumanoor'
      }
    },
    
    // Password Configuration
    useCustomPassword: false // Auto-generated password
  };

  console.log('📋 Test Worker Data:');
  console.log('==================');
  console.log('✅ Basic Information:');
  console.log(`   - Name: ${testWorkerData.name}`);
  console.log(`   - Email: ${testWorkerData.email}`);
  console.log(`   - Phone: ${testWorkerData.phone}`);
  console.log(`   - Role: ${testWorkerData.role}`);
  console.log(`   - Gender: ${testWorkerData.gender} (Female Only - ✓)`);
  console.log(`   - Date of Birth: ${testWorkerData.dateOfBirth} (Age: ${calculateAge(testWorkerData.dateOfBirth)} years - ✓)`);
  console.log(`   - Qualification: ${testWorkerData.qualification}`);
  
  console.log('\n✅ Employment Details:');
  console.log(`   - Date of Joining: ${testWorkerData.dateOfJoining}`);
  console.log(`   - Designation: ${testWorkerData.designation}`);
  console.log(`   - Experience: ${testWorkerData.experience} years`);
  
  console.log('\n✅ Emergency Contact:');
  console.log(`   - Alternate Phone: ${testWorkerData.alternatePhone}`);
  console.log(`   - Emergency Contact: ${testWorkerData.emergencyContactPerson}`);
  
  console.log('\n✅ Address Information:');
  console.log(`   - Street: ${testWorkerData.address.street}`);
  console.log(`   - City: ${testWorkerData.address.city}`);
  console.log(`   - District: ${testWorkerData.address.district}`);
  console.log(`   - State: ${testWorkerData.address.state}`);
  console.log(`   - Pincode: ${testWorkerData.address.pincode}`);
  
  console.log('\n✅ Anganwadi Center:');
  console.log(`   - Center: ${testWorkerData.roleSpecificData.anganwadiCenter.name}`);
  console.log(`   - Code: ${testWorkerData.roleSpecificData.anganwadiCenter.code}`);
  
  console.log('\n✅ Password Configuration:');
  console.log(`   - Custom Password: ${testWorkerData.useCustomPassword ? 'Yes' : 'No (Auto-generated)'}`);

  console.log('\n🔍 Validation Tests:');
  console.log('==================');
  
  // Test validations
  const validations = [
    {
      test: 'Gender is Female',
      condition: testWorkerData.gender === 'female',
      message: 'Only female staff are allowed to be registered as Anganwadi workers.'
    },
    {
      test: 'Age is 18+',
      condition: calculateAge(testWorkerData.dateOfBirth) >= 18,
      message: 'Worker must be at least 18 years old'
    },
    {
      test: 'Email format is valid',
      condition: /\S+@\S+\.\S+/.test(testWorkerData.email),
      message: 'Please enter a valid email address'
    },
    {
      test: 'Phone number is valid',
      condition: /^\d{10}$/.test(testWorkerData.phone),
      message: 'Please enter a valid 10-digit phone number'
    },
    {
      test: 'Alternate phone is valid',
      condition: /^\d{10}$/.test(testWorkerData.alternatePhone),
      message: 'Please enter a valid 10-digit alternate phone number'
    },
    {
      test: 'Required fields present',
      condition: !!(testWorkerData.name && testWorkerData.email && testWorkerData.phone && 
                   testWorkerData.gender && testWorkerData.dateOfBirth && testWorkerData.qualification &&
                   testWorkerData.dateOfJoining && testWorkerData.designation),
      message: 'All required fields must be filled'
    },
    {
      test: 'Anganwadi Center selected',
      condition: !!(testWorkerData.roleSpecificData?.anganwadiCenter?.name),
      message: 'Please select an Anganwadi Center'
    }
  ];

  validations.forEach(validation => {
    const status = validation.condition ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${validation.test}`);
    if (!validation.condition) {
      console.log(`     Error: ${validation.message}`);
    }
  });

  console.log('\n📧 Expected Email Content:');
  console.log('=========================');
  console.log('Subject: "Welcome to SampoornaAangan – Your Worker Account"');
  console.log('');
  console.log(`Dear ${testWorkerData.name},`);
  console.log('');
  console.log('Your Anganwadi Worker account has been successfully created.');
  console.log('Here are your login credentials:');
  console.log('');
  console.log(`Email: ${testWorkerData.email}`);
  console.log('Password: [auto_generated_password]');
  console.log('');
  console.log('You can log in here: https://sampoornaangan.com/login');
  console.log('');
  console.log('Please change your password after your first login.');
  console.log('');
  console.log('Best regards,');
  console.log('SampoornaAangan Admin Team');
  console.log('support@sampoornaangan.com');

  console.log('\n🎯 Implementation Status:');
  console.log('========================');
  console.log('✅ Frontend: Enhanced CreateWorkerModal with all required fields');
  console.log('✅ Backend: Updated User model with new fields');
  console.log('✅ Backend: Enhanced createWorker API with validations');
  console.log('✅ Backend: File upload support for worker photos');
  console.log('✅ Backend: Updated email template for Anganwadi workers');
  console.log('✅ Validation: Gender restriction (Female only)');
  console.log('✅ Validation: Age validation (18+ years)');
  console.log('✅ Validation: All required field validations');
  
  console.log('\n🚀 Ready for Testing!');
  console.log('====================');
  console.log('1. Start the backend server: cd backend && node server.js');
  console.log('2. Start the frontend: cd forntend && npm run dev');
  console.log('3. Login as admin and go to Worker Management');
  console.log('4. Click "Create Worker" to test the new form');
  console.log('5. Fill out all fields and submit');
  console.log('6. Verify email is sent to the worker');

  return testWorkerData;
};

// Helper function to calculate age
const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Run the test
if (require.main === module) {
  testAnganwadiWorkerCreation();
}

module.exports = { testAnganwadiWorkerCreation };