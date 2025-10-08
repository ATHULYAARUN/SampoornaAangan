const axios = require('axios');

const API_BASE = 'http://localhost:5005/api/attendance-test';

async function testWorkerAttendanceSystem() {
    console.log('🧪 Testing Worker Attendance System');
    console.log('=' * 50);
    
    const workers = [
        { name: 'Athulya Arun', email: 'athulyaanal@gmail.com', center: 'Veliyanoor Anganwadi' },
        { name: 'Mohanakumari', email: 'athulyaarunu@gmail.com', center: 'Akkarakunnu Anganwadi' }
    ];
    
    for (const worker of workers) {
        console.log(`\n🔍 Testing access for ${worker.name} (${worker.email})`);
        console.log(`🏢 Expected Center: ${worker.center}`);
        
        try {
            // Test worker access
            const response = await axios.post(`${API_BASE}/test-worker-attendance`, {
                workerEmail: worker.email
            });
            
            if (response.data.success) {
                const data = response.data.data;
                console.log(`✅ Access successful!`);
                console.log(`👤 Worker: ${data.worker.name}`);
                console.log(`🏢 Anganwadi: ${data.worker.anganwadiCenter}`);
                console.log(`📅 Date: ${data.date}`);
                console.log(`📊 Statistics:`);
                console.log(`   - Total Children: ${data.statistics.total}`);
                console.log(`   - Present: ${data.statistics.present}`);
                console.log(`   - Absent: ${data.statistics.absent}`);
                console.log(`   - Late: ${data.statistics.late}`);
                console.log(`   - Marked: ${data.statistics.marked}`);
                
                console.log(`\n👶 Children in ${data.worker.anganwadiCenter}:`);
                data.children.forEach((child, index) => {
                    console.log(`   ${index + 1}. ${child.name} (Age: ${child.age}) - Status: ${child.attendanceStatus}`);
                    if (child.timeIn) console.log(`      Time In: ${child.timeIn}`);
                    if (child.notes) console.log(`      Notes: ${child.notes}`);
                });
                
                // Test marking attendance for the first child
                if (data.children.length > 0) {
                    const firstChild = data.children[0];
                    console.log(`\n📝 Testing attendance marking for ${firstChild.name}...`);
                    
                    try {
                        const markResponse = await axios.post(`${API_BASE}/test-mark-attendance`, {
                            workerEmail: worker.email,
                            childId: firstChild._id,
                            status: 'present',
                            timeIn: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                            nutritionReceived: true,
                            healthCheckDone: true,
                            notes: `Test attendance marked by ${worker.name} at ${new Date().toLocaleTimeString()}`
                        });
                        
                        if (markResponse.data.success) {
                            console.log(`✅ Attendance marked successfully!`);
                            console.log(`   Message: ${markResponse.data.message}`);
                        } else {
                            console.log(`❌ Failed to mark attendance: ${markResponse.data.message}`);
                        }
                    } catch (markError) {
                        console.log(`❌ Error marking attendance: ${markError.message}`);
                    }
                }
                
            } else {
                console.log(`❌ Access failed: ${response.data.message}`);
            }
            
        } catch (error) {
            console.log(`❌ Error testing worker access: ${error.message}`);
            if (error.response) {
                console.log(`   Status: ${error.response.status}`);
                console.log(`   Data: ${JSON.stringify(error.response.data, null, 2)}`);
            }
        }
        
        console.log('-'.repeat(50));
    }
    
    console.log('\n🏁 Test completed!');
}

// Run the test
testWorkerAttendanceSystem().catch(console.error);