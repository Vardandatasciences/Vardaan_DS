import React from 'react';
import { useMediaByPage, useMedia } from '../hooks/useMedia';
import { config } from '../utils/config';

const MediaDebug = () => {
  // Test different page categories
  const { media: homeMedia, loading: homeLoading, error: homeError, usingFallback: homeFallback } = useMediaByPage('Home');
  const { media: lapsecMedia, loading: lapsecLoading, error: lapsecError, usingFallback: lapsecFallback } = useMediaByPage('Products-Lapsec');
  const { media: dataEngMedia, loading: dataEngLoading, error: dataEngError, usingFallback: dataEngFallback } = useMediaByPage('Services-DataEngineering');
  
  // Test old endpoints
  const { media: oldMedia, loading: oldLoading, error: oldError } = useMedia();

  if (homeLoading || lapsecLoading || dataEngLoading || oldLoading) {
    return <div style={{ padding: '20px', fontFamily: 'monospace' }}>Loading debug data...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '12px' }}>
      <h2>🔍 Media Loading Debug</h2>
      
      <h3>📊 API Status</h3>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Home Media:</strong> {homeMedia.length} items {homeFallback && '(using fallback)'}</p>
        <p><strong>Lapsec Media:</strong> {lapsecMedia.length} items {lapsecFallback && '(using fallback)'}</p>
        <p><strong>DataEngineering Media:</strong> {dataEngMedia.length} items {dataEngFallback && '(using fallback)'}</p>
        <p><strong>All Media (old endpoint):</strong> {oldMedia.length} items</p>
      </div>

      <h3>❌ Errors</h3>
      <div style={{ marginBottom: '20px' }}>
        {homeError && <p style={{ color: 'red' }}>Home Error: {homeError}</p>}
        {lapsecError && <p style={{ color: 'red' }}>Lapsec Error: {lapsecError}</p>}
        {dataEngError && <p style={{ color: 'red' }}>DataEngineering Error: {dataEngError}</p>}
        {oldError && <p style={{ color: 'red' }}>Old Endpoint Error: {oldError}</p>}
        {!homeError && !lapsecError && !dataEngError && !oldError && <p style={{ color: 'green' }}>✅ No errors</p>}
      </div>

      <h3>📁 Available Media (Old Endpoint)</h3>
      <div style={{ marginBottom: '20px', maxHeight: '200px', overflow: 'auto' }}>
        {oldMedia.length > 0 ? (
          <ul>
            {oldMedia.map((item, index) => (
              <li key={index}>
                <strong>{item.original_name}</strong> ({item.file_type}) - Category: {item.category}
              </li>
            ))}
          </ul>
        ) : (
          <p>No media found</p>
        )}
      </div>

      <h3>🎯 Page-Specific Media</h3>
      <div style={{ marginBottom: '20px' }}>
        <h4>Home ({homeMedia.length} items):</h4>
        <ul>
          {homeMedia.map((item, index) => (
            <li key={index}>
              <strong>{item.original_name}</strong> ({item.file_type}) - Category: {item.category}
            </li>
          ))}
        </ul>

        <h4>Lapsec ({lapsecMedia.length} items):</h4>
        <ul>
          {lapsecMedia.map((item, index) => (
            <li key={index}>
              <strong>{item.original_name}</strong> ({item.file_type}) - Category: {item.category}
            </li>
          ))}
        </ul>

        <h4>DataEngineering ({dataEngMedia.length} items):</h4>
        <ul>
          {dataEngMedia.map((item, index) => (
            <li key={index}>
              <strong>{item.original_name}</strong> ({item.file_type}) - Category: {item.category}
            </li>
          ))}
        </ul>
      </div>

      <h3>🔧 Troubleshooting</h3>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>If no media is loading:</strong></p>
        <ol>
                          <li>Check if backend server is running at {config.API_URL}</li>
          <li>Verify the API endpoints are deployed</li>
          <li>Check browser network tab for 404 errors</li>
          <li>Try restarting the backend server</li>
        </ol>
        
        <p><strong>If using fallback:</strong></p>
        <ul>
          <li>The new page-specific endpoints are not working</li>
          <li>The system is using the old category-based endpoints</li>
          <li>This is a temporary solution until the backend is updated</li>
        </ul>
      </div>
    </div>
  );
};

export default MediaDebug; 