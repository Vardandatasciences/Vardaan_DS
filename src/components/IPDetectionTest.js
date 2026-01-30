import React, { useState, useEffect } from 'react';
import { detectUserLocation, forceRefreshLocation } from '../services/ipDetectionService';

const IPDetectionTest = () => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testHistory, setTestHistory] = useState([]);

  const runDetection = async (isRefresh = false) => {
    setLoading(true);
    const timestamp = new Date().toLocaleTimeString();
    
    try {
      const result = isRefresh ? await forceRefreshLocation() : await detectUserLocation();
      
      const testResult = {
        timestamp,
        result,
        type: isRefresh ? 'Manual Refresh' : 'Auto Detection'
      };
      
      setLocationData(result);
      setTestHistory(prev => [testResult, ...prev.slice(0, 9)]); // Keep last 10 tests
      
      console.log(`🌍 ${isRefresh ? 'Manual refresh' : 'Auto detection'} result:`, result);
    } catch (error) {
      console.error('❌ Detection failed:', error);
      setLocationData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runDetection();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'monospace',
      fontSize: '14px'
    }}>
      <h2>🌍 IP Detection Test Panel</h2>
      <p>Use this panel to test IP detection with VPN changes</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => runDetection(false)}
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Detecting...' : '🔍 Auto Detect'}
        </button>
        
        <button 
          onClick={() => runDetection(true)}
          disabled={loading}
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Refreshing...' : '🔄 Force Refresh'}
        </button>
      </div>

      {locationData && (
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '15px', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          marginBottom: '20px'
        }}>
          <h3>📍 Current Detection Result:</h3>
          <pre style={{ 
            backgroundColor: '#1e293b', 
            color: '#e2e8f0', 
            padding: '15px', 
            borderRadius: '5px',
            overflow: 'auto'
          }}>
            {JSON.stringify(locationData, null, 2)}
          </pre>
          
          {locationData.country && (
            <div style={{ marginTop: '10px' }}>
              <strong>Country:</strong> {locationData.country} 
              <span style={{ marginLeft: '10px' }}>
                <strong>Currency:</strong> {locationData.currency}
              </span>
              <span style={{ marginLeft: '10px' }}>
                <strong>Source:</strong> {locationData.source}
              </span>
              {locationData.ip && (
                <span style={{ marginLeft: '10px' }}>
                  <strong>IP:</strong> {locationData.ip}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {testHistory.length > 0 && (
        <div>
          <h3>📋 Test History (Last 10):</h3>
          <div style={{ 
            backgroundColor: '#f8fafc', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            {testHistory.map((test, index) => (
              <div key={index} style={{ 
                borderBottom: index < testHistory.length - 1 ? '1px solid #e2e8f0' : 'none',
                paddingBottom: '10px',
                marginBottom: '10px'
              }}>
                <div style={{ fontWeight: 'bold', color: '#059669' }}>
                  {test.timestamp} - {test.type}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Country: {test.result.country} | Currency: {test.result.currency} | Source: {test.result.source}
                  {test.result.ip && ` | IP: ${test.result.ip}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fef3c7', borderRadius: '5px' }}>
        <h4>💡 Testing Instructions:</h4>
        <ol>
          <li>Click "Auto Detect" to test current location</li>
          <li>Change your VPN location (e.g., from India to US)</li>
          <li>Click "Force Refresh" to test new location</li>
          <li>Check the test history to see if detection changed</li>
          <li>If detection doesn't change, try clearing browser cache</li>
        </ol>
      </div>
    </div>
  );
};

export default IPDetectionTest; 