import React from 'react';
import { Link } from 'react-router-dom';

const RoutingTest = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Routing Test Component</h2>
      <p>This component helps test if routing is working correctly.</p>
      
      <div style={{ margin: '20px 0' }}>
        <h3>Test Links:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <Link to="/" style={{ padding: '10px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Home (/)
          </Link>
          
          <Link to="/Victaa/info" style={{ padding: '10px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Victaa Showcase (/Victaa/info)
          </Link>
          
          <Link to="/victaa/info" style={{ padding: '10px', background: '#ffc107', color: 'black', textDecoration: 'none', borderRadius: '5px' }}>
            Victaa Showcase (/victaa/info)
          </Link>
          
          <Link to="/ViCTAA" style={{ padding: '10px', background: '#dc3545', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Victaa Main (/ViCTAA)
          </Link>
        </div>
      </div>
      
      <div style={{ margin: '20px 0', padding: '20px', background: '#f8f9fa', borderRadius: '5px' }}>
        <h4>Current Route Information:</h4>
        <p><strong>Current URL:</strong> {window.location.href}</p>
        <p><strong>Pathname:</strong> {window.location.pathname}</p>
        <p><strong>Search:</strong> {window.location.search}</p>
      </div>
    </div>
  );
};

export default RoutingTest;
