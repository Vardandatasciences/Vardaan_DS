// src/FeaturedClients.js
import React, { useState, useEffect } from 'react';
import './client.css';
import { fetchImages } from '../../services/mediaService';
// import ConfigDebug from '../../components/ConfigDebug';

const Clients = () => {
  const [clientImages, setClientImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClientImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch images from the 'clients' category
        const images = await fetchImages('clients');
        console.log('Loaded client images:', images);
        setClientImages(images);
      } catch (err) {
        console.error('Error loading client images:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadClientImages();
  }, []);

  if (loading) {
    return (
      <div className="featured-clients-container">
        <h2>Our Customers</h2>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Loading client images...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="featured-clients-container">
        <h2>Our Customers</h2>
        <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          Error loading client images: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="featured-clients-container">
      {/* <ConfigDebug /> */}
      <h2>Our Customers</h2>
      <div className="marquee">
        <div className="marquee-content">
          {clientImages.map((image, index) => (
            <img 
              key={index}
              src={image.s3_url} 
              alt={image.original_name || `Client ${index + 1}`}
              onError={(e) => {
                console.error('Failed to load image:', image.s3_url);
                e.target.style.display = 'none';
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
