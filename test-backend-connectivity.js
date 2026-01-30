const axios = require('axios');

// Test backend connectivity
async function testBackendConnectivity() {
  const backendUrl = 'https://vardaands.com';
  
  console.log('🔧 Testing Backend Connectivity');
  console.log('===============================');
  console.log(`Backend URL: ${backendUrl}`);
  console.log('');
  
  try {
    // Test 1: Health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${backendUrl}/api/health`, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://vardaandatasciences.dbk39rik9ypyn.amplifyapp.com'
      }
    });
    
    console.log('✅ Health endpoint working:', healthResponse.data);
    console.log('');
    
    // Test 2: CORS preflight
    console.log('2. Testing CORS preflight...');
    try {
      const corsResponse = await axios.options(`${backendUrl}/api/health`, {
        timeout: 10000,
        headers: {
          'Origin': 'https://vardaandatasciences.dbk39rik9ypyn.amplifyapp.com',
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      });
      
      console.log('✅ CORS preflight successful');
      console.log('CORS Headers:', {
        'Access-Control-Allow-Origin': corsResponse.headers['access-control-allow-origin'],
        'Access-Control-Allow-Methods': corsResponse.headers['access-control-allow-methods'],
        'Access-Control-Allow-Headers': corsResponse.headers['access-control-allow-headers']
      });
    } catch (corsError) {
      console.log('❌ CORS preflight failed:', corsError.message);
    }
    console.log('');
    
    // Test 3: Product pricing endpoint
    console.log('3. Testing product pricing endpoint...');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      phone: '+1234567890',
      country: 'US',
      enquiry: 'Test enquiry',
      product_code: 'TEST',
      product_name: 'Test Product',
      pricing_amount: 100,
      currency: 'USD'
    };
    
    try {
      const pricingResponse = await axios.post(`${backendUrl}/api/product-pricing`, testData, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://vardaandatasciences.dbk39rik9ypyn.amplifyapp.com'
        }
      });
      
      console.log('✅ Product pricing endpoint working:', pricingResponse.data);
    } catch (pricingError) {
      console.log('❌ Product pricing endpoint failed:', pricingError.response?.data || pricingError.message);
    }
    
  } catch (error) {
    console.log('❌ Backend connectivity failed:', error.message);
    
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
      console.log('Response data:', error.response.data);
    }
  }
  
  console.log('');
  console.log('Test completed.');
}

// Run the test
testBackendConnectivity().catch(console.error); 