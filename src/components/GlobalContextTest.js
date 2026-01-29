import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const GlobalContextTest = () => {
  const { userLocation, pricingData, refreshLocationAndPricing } = useGlobalContext();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Global Context Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>User Location</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(userLocation, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Pricing Data</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(pricingData, null, 2)}
        </pre>
      </div>

      <button 
        onClick={refreshLocationAndPricing}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Refresh Location & Pricing
      </button>
    </div>
  );
};

export default GlobalContextTest; 