import React, { useState, useEffect } from 'react';
import { config } from '../utils/config';

const CorsTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message, type = 'info') => {
    setTestResults(prev => [...prev, { message, type, timestamp: new Date().toISOString() }]);
  };

  const runTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    addResult('Starting CORS and connectivity tests...', 'info');
    
    // Test 1: Basic connectivity
    try {
      addResult('Testing basic connectivity to backend...', 'info');
      const response = await fetch(`${config.API_URL}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        addResult(`✅ Backend health check successful: ${JSON.stringify(data)}`, 'success');
      } else {
        addResult(`❌ Backend health check failed: ${response.status} ${response.statusText}`, 'error');
      }
    } catch (error) {
      addResult(`❌ Backend connectivity failed: ${error.message}`, 'error');
    }

    // Test 2: CORS preflight
    try {
      addResult('Testing CORS preflight request...', 'info');
      const response = await fetch(`${config.API_URL}/api/health`, {
        method: 'OPTIONS',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
      });
      
      if (response.ok) {
        addResult('✅ CORS preflight successful', 'success');
      } else {
        addResult(`❌ CORS preflight failed: ${response.status}`, 'error');
      }
    } catch (error) {
      addResult(`❌ CORS preflight error: ${error.message}`, 'error');
    }

    // Test 3: Product pricing endpoint
    try {
      addResult('Testing product pricing endpoint...', 'info');
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

      const response = await fetch(`${config.API_URL}/api/product-pricing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      if (response.ok) {
        const data = await response.json();
        addResult(`✅ Product pricing endpoint successful: ${JSON.stringify(data)}`, 'success');
      } else {
        const errorText = await response.text();
        addResult(`❌ Product pricing endpoint failed: ${response.status} - ${errorText}`, 'error');
      }
    } catch (error) {
      addResult(`❌ Product pricing endpoint error: ${error.message}`, 'error');
    }

    // Test 4: Check current origin
    addResult(`Current origin: ${window.location.origin}`, 'info');
    addResult(`Backend URL: ${config.API_URL}`, 'info');
    
    setIsLoading(false);
    addResult('Tests completed.', 'info');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>CORS and Backend Connectivity Test</h2>
      
      <button 
        onClick={runTests} 
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {isLoading ? 'Running Tests...' : 'Run Tests'}
      </button>

      <div style={{ marginTop: '20px' }}>
        <h3>Test Results:</h3>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '5px',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {testResults.map((result, index) => (
            <div 
              key={index} 
              style={{
                marginBottom: '10px',
                padding: '8px',
                backgroundColor: 
                  result.type === 'success' ? '#d4edda' :
                  result.type === 'error' ? '#f8d7da' :
                  result.type === 'warning' ? '#fff3cd' : '#d1ecf1',
                border: `1px solid ${
                  result.type === 'success' ? '#c3e6cb' :
                  result.type === 'error' ? '#f5c6cb' :
                  result.type === 'warning' ? '#ffeaa7' : '#bee5eb'
                }`,
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}
            >
              <strong>[{result.timestamp.split('T')[1].split('.')[0]}]</strong> {result.message}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <h4>Configuration Info:</h4>
        <ul>
          <li><strong>Backend URL:</strong> {config.API_URL}</li>
          <li><strong>Current Origin:</strong> {window.location.origin}</li>
          <li><strong>Environment:</strong> {process.env.NODE_ENV}</li>
          <li><strong>Debug Mode:</strong> {config.DEBUG_MODE ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </div>
  );
};

export default CorsTest; 