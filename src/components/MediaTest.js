import React from 'react';
import { useMediaByPage, usePageCategories } from '../hooks/useMedia';

const MediaTest = () => {
  // Test different page categories
  const { media: homeMedia, loading: homeLoading, error: homeError } = useMediaByPage('Home');
  const { media: servicesMedia, loading: servicesLoading, error: servicesError } = useMediaByPage('Services');
  const { media: productsMedia, loading: productsLoading, error: productsError } = useMediaByPage('Products');
  const { pageCategories, loading: categoriesLoading, error: categoriesError } = usePageCategories();

  if (homeLoading || servicesLoading || productsLoading || categoriesLoading) {
    return <div>Loading media data...</div>;
  }

  if (homeError || servicesError || productsError || categoriesError) {
    return (
      <div style={{ color: 'red', padding: '20px' }}>
        <h3>Error loading media:</h3>
        {homeError && <p>Home: {homeError}</p>}
        {servicesError && <p>Services: {servicesError}</p>}
        {productsError && <p>Products: {productsError}</p>}
        {categoriesError && <p>Categories: {categoriesError}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Media Loading Test</h2>
      
      <h3>Available Page Categories ({pageCategories.length}):</h3>
      <ul>
        {pageCategories.map((category, index) => (
          <li key={index}>
            <strong>{category.category}</strong> - 
            {category.file_count} files 
            ({category.image_count} images, {category.video_count} videos)
          </li>
        ))}
      </ul>

      <h3>Home Page Media ({homeMedia.length} files):</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
        {homeMedia.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <p><strong>Name:</strong> {item.original_name}</p>
            <p><strong>Type:</strong> {item.file_type}</p>
            <p><strong>Category:</strong> {item.category}</p>
            {item.file_type === 'image' && (
              <img 
                src={item.s3_url} 
                alt={item.original_name}
                style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover' }}
                onError={(e) => {
                  console.error('Failed to load image:', item.s3_url);
                  e.target.style.display = 'none';
                }}
              />
            )}
            {item.file_type === 'video' && (
              <video 
                src={item.s3_url} 
                controls
                style={{ width: '100%', height: 'auto', maxHeight: '150px' }}
                onError={(e) => {
                  console.error('Failed to load video:', item.s3_url);
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>
        ))}
      </div>

      <h3>Services Page Media ({servicesMedia.length} files):</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
        {servicesMedia.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <p><strong>Name:</strong> {item.original_name}</p>
            <p><strong>Type:</strong> {item.file_type}</p>
            <p><strong>Category:</strong> {item.category}</p>
            {item.file_type === 'image' && (
              <img 
                src={item.s3_url} 
                alt={item.original_name}
                style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover' }}
                onError={(e) => {
                  console.error('Failed to load image:', item.s3_url);
                  e.target.style.display = 'none';
                }}
              />
            )}
            {item.file_type === 'video' && (
              <video 
                src={item.s3_url} 
                controls
                style={{ width: '100%', height: 'auto', maxHeight: '150px' }}
                onError={(e) => {
                  console.error('Failed to load video:', item.s3_url);
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>
        ))}
      </div>

      <h3>Products Page Media ({productsMedia.length} files):</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
        {productsMedia.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <p><strong>Name:</strong> {item.original_name}</p>
            <p><strong>Type:</strong> {item.file_type}</p>
            <p><strong>Category:</strong> {item.category}</p>
            {item.file_type === 'image' && (
              <img 
                src={item.s3_url} 
                alt={item.original_name}
                style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover' }}
                onError={(e) => {
                  console.error('Failed to load image:', item.s3_url);
                  e.target.style.display = 'none';
                }}
              />
            )}
            {item.file_type === 'video' && (
              <video 
                src={item.s3_url} 
                controls
                style={{ width: '100%', height: 'auto', maxHeight: '150px' }}
                onError={(e) => {
                  console.error('Failed to load video:', item.s3_url);
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaTest; 