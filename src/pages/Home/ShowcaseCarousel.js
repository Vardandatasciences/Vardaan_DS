import React from 'react';
import { useShowcaseCarouselData } from './showcaseData';
import './ShowcaseCarousel.css';

const ShowcaseCarousel = () => {
  const { showcaseData, loading, error } = useShowcaseCarouselData();

  if (loading) {
    return (
      <div className="showcase-carousel">
        <div className="loading-placeholder">
          <div className="loading-spinner"></div>
          <p>Loading showcase content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="showcase-carousel">
        <div className="error-placeholder">
          <p>Error loading showcase content: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="showcase-carousel">
      {showcaseData.map((item, idx) => (
        <div className="showcase-card" key={item.id || idx}>
          <div className="media-wrapper">
            {item.mediaType === 'video' ? (
              <video
                src={item.mediaPath || ''}
                autoPlay
                loop
                muted
                playsInline
                className="showcase-media"
                poster={item.poster}
                onError={(e) => {
                  console.warn(`Failed to load video for ${item.title}:`, e);
                  // Hide the video element if no media is available
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <img
                src={item.mediaPath || ''}
                alt={item.title}
                className="showcase-media"
                onError={(e) => {
                  console.warn(`Failed to load image for ${item.title}:`, e);
                  // Hide the image element if no media is available
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="showcase-overlay">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a href={item.link} className="showcase-btn">{item.buttonText}</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowcaseCarousel; 