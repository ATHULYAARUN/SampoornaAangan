// Test script to replicate frontend API calls exactly
console.log('🧪 Testing Frontend API Calls...');

async function testFrontendAPICalls() {
  try {
    console.log('\n1️⃣ Testing Schemes API...');
    
    // Exact same call as frontend
    const schemesResponse = await fetch('http://localhost:5005/api/schemes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📊 Schemes Response status:', schemesResponse.status);
    console.log('📊 Schemes Response headers:', schemesResponse.headers.get('content-type'));
    
    if (!schemesResponse.ok) {
      const errorText = await schemesResponse.text();
      console.error('❌ Schemes API Error:', errorText);
      throw new Error(`HTTP ${schemesResponse.status}: ${errorText}`);
    }
    
    const responseText = await schemesResponse.text();
    console.log('📋 Raw response:', responseText.substring(0, 200) + '...');
    
    let schemesResult;
    try {
      schemesResult = JSON.parse(responseText);
      console.log('✅ Schemes parsed successfully:', schemesResult.data?.schemes?.length, 'schemes');
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      console.error('❌ Response was:', responseText);
      throw new Error('Server returned invalid JSON response');
    }
    
    console.log('\n2️⃣ Testing Enrollments API...');
    
    const enrollmentsResponse = await fetch('http://localhost:5005/api/enrollments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📊 Enrollments Response status:', enrollmentsResponse.status);
    
    let enrollmentsResult = { data: [] };
    if (enrollmentsResponse.ok) {
      const enrollmentsText = await enrollmentsResponse.text();
      console.log('📋 Raw enrollments response:', enrollmentsText);
      
      try {
        enrollmentsResult = JSON.parse(enrollmentsText);
        console.log('✅ Enrollments parsed successfully:', enrollmentsResult.data?.length, 'enrollments');
      } catch (parseError) {
        console.error('❌ Enrollments JSON Parse Error:', parseError);
        console.warn('⚠️ Using default empty enrollments array');
      }
    }
    
    console.log('\n3️⃣ Testing Enrollment Submission...');
    
    const enrollResponse = await fetch('http://localhost:5005/api/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        schemeId: 'pmcare',
        parentName: 'Demo Parent',
        childName: 'Demo Child'
      })
    });
    
    console.log('📊 Enroll Response status:', enrollResponse.status);
    
    if (!enrollResponse.ok) {
      const errorText = await enrollResponse.text();
      console.error('❌ Enrollment API Error:', errorText);
      throw new Error(`Failed to submit application: ${errorText}`);
    }
    
    const enrollResponseText = await enrollResponse.text();
    console.log('📋 Raw enrollment response:', enrollResponseText);
    
    let enrollResult;
    try {
      enrollResult = JSON.parse(enrollResponseText);
      console.log('✅ Enrollment successful:', enrollResult.data?.applicationNumber);
    } catch (parseError) {
      console.error('❌ Enrollment JSON Parse Error:', parseError);
      throw new Error('Server returned invalid JSON response for enrollment');
    }
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testFrontendAPICalls();