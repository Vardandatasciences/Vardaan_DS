const axios = require('axios');

const API_BASE_URL = 'http://localhost:10000';

async function testMediaAPI() {
    console.log('🧪 Testing Media API Endpoints...\n');
    
    try {
        // Test 1: Insert sample data
        console.log('1. Inserting sample media data...');
        const sampleResponse = await axios.post(`${API_BASE_URL}/api/media/sample-data`);
        console.log('✅ Sample data inserted:', sampleResponse.data);
        
        // Test 2: Test page-specific endpoint
        console.log('\n2. Testing page-specific endpoint...');
        const pageResponse = await axios.get(`${API_BASE_URL}/api/media/page/Products-Smart%20Trucks`);
        console.log('✅ Page-specific response:', pageResponse.data);
        
        // Test 3: Test regular media endpoint
        console.log('\n3. Testing regular media endpoint...');
        const mediaResponse = await axios.get(`${API_BASE_URL}/api/media?category=Products-Smart%20Trucks`);
        console.log('✅ Regular media response:', mediaResponse.data);
        
        // Test 4: Test categories endpoint
        console.log('\n4. Testing categories endpoint...');
        const categoriesResponse = await axios.get(`${API_BASE_URL}/api/media/categories`);
        console.log('✅ Categories response:', categoriesResponse.data);
        
        console.log('\n🎉 All tests passed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

testMediaAPI(); 