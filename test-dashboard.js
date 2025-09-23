// Simple test script to verify the dashboard endpoint
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

async function testDashboardEndpoint() {
  try {
    console.log('🧪 Testing Admin Dashboard Endpoint...');
    
    // Note: In a real test, you would need to authenticate first
    // For now, this is just to check if the endpoint structure is correct
    
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // In real implementation, add Authorization header with JWT token
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Dashboard endpoint structure:');
      console.log('- Success:', data.success);
      console.log('- Has stats:', !!data.data?.stats);
      console.log('- Has roleStats:', !!data.data?.roleStats);
      console.log('- Has recentActivities:', !!data.data?.recentActivities);
      console.log('- Has lastUpdated:', !!data.data?.lastUpdated);
      
      if (data.data?.stats) {
        console.log('\n📊 Stats structure:');
        console.log('- Total Anganwadis:', data.data.stats.totalAnganwadis);
        console.log('- Registered Users:', data.data.stats.registeredUsers);
        console.log('- Health Alerts:', data.data.stats.healthAlerts);
        console.log('- Center Stats:', data.data.stats.centerStats?.length || 0, 'centers');
      }
      
    } else {
      console.log('❌ Response status:', response.status);
      console.log('❌ Response text:', await response.text());
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
  }
}

// Run the test
testDashboardEndpoint();
