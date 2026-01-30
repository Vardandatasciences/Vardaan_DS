import React from 'react';
import { config } from '../utils/config';

const ConfigDebug = () => {
  const handleDebug = () => {
    config.debug();
  };

  const testBackendConnection = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/health`);
      if (response.ok) {
        const data = await response.json();
        alert(`✅ Local Backend is accessible!\nStatus: ${response.status}\nResponse: ${JSON.stringify(data, null, 2)}`);
      } else {
        alert(`⚠️ Local Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      alert(`❌ Local Backend connection failed: ${error.message}\n\nMake sure your backend is running on ${config.API_URL}`);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '2px solid #007bff', 
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      fontFamily: 'monospace'
    }}>
      <h3>🔧 Local Backend Configuration</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <h4>Current Configuration:</h4>
        <ul>
          <li><strong>Backend URL:</strong> <code>{config.API_URL}</code></li>
          <li><strong>Mode:</strong> <span style={{ 
            color: 'blue',
            fontWeight: 'bold'
          }}>LOCAL DEVELOPMENT</span></li>
          <li><strong>Environment:</strong> {config.ENVIRONMENT}</li>
          <li><strong>Debug Mode:</strong> {config.DEBUG_MODE ? 'ON' : 'OFF'}</li>
          <li><strong>Node Environment:</strong> {process.env.NODE_ENV}</li>
        </ul>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4>Environment Variables:</h4>
        <ul>
          <li>REACT_APP_BACKEND_URL: <code>{process.env.REACT_APP_BACKEND_URL || 'not set (using default)'}</code></li>
          <li>REACT_APP_ENVIRONMENT: <code>{process.env.REACT_APP_ENVIRONMENT || 'not set (using default)'}</code></li>
          <li>REACT_APP_DEBUG_MODE: <code>{process.env.REACT_APP_DEBUG_MODE || 'not set (using default)'}</code></li>
        </ul>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={handleDebug}
          style={{ 
            padding: '10px 15px', 
            marginRight: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Debug in Console
        </button>
        
        <button 
          onClick={testBackendConnection}
          style={{ 
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Local Backend
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#e7f3ff', 
        padding: '10px', 
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <strong>Local Backend Setup:</strong><br/>
        1. Make sure your backend server is running on port 10000<br/>
        2. Default URL: <code>https://api.vardaands.com/</code><br/>
        3. To use custom URL: Set <code>REACT_APP_BACKEND_URL=https://api.vardaands.com</code> in .env.local<br/>
        4. Restart the development server after changing .env files
      </div>
    </div>
  );
};

export default ConfigDebug; 