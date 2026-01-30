import React, { useState, useEffect, useRef } from 'react';
import { useHeroShowcaseData } from './showcaseData';
import Accordion from '../../components/Accordion/Accordion';
import './HeroSlider.css';
import { Link } from 'react-router-dom';
import aiWorkshopBanner from '../../assets/Images/Home/AI Workshop Banner.png';

const SLIDE_INTERVAL = 6000;

const HeroSlider = () => {
  const { showcaseData, loading, error } = useHeroShowcaseData();
  
  // First slide is the hero (Accordion), then AI Workshop Banner, rest are showcaseData (1 product + 1 service)
  const slides = [
    { type: 'hero' },
    { 
      type: 'banner', 
      id: 'ai-workshop-banner',
      imagePath: aiWorkshopBanner 
    },
    ...(showcaseData || []).map(item => ({ ...item, type: 'showcase' }))
  ];
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (loading || error || slides.length <= 1) return;
    
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [current, slides.length, loading, error]);

  const goTo = idx => setCurrent(idx);

  if (loading) {
    return (
      <div className="hero-slider">
        <div className="loading-placeholder">
          <div className="loading-spinner"></div>
          <p>Loading hero content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero-slider">
        <div className="error-placeholder">
          <p>Error loading hero content: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-slider">
      <div className="hero-slides">
        {slides.map((slide, idx) => (
          <div
            className={`hero-slide${idx === current ? ' active' : ''}`}
            key={slide.id || idx}
            style={{ display: idx === current ? 'flex' : 'none' }}
          >
            {slide.type === 'hero' ? (
              <Accordion />
            ) : slide.type === 'banner' ? (
              <div className="hero-banner-wrapper">
                <a 
                  href="https://www.linkedin.com/posts/vardaan-ds_ai-workshop-banner-activity-7414184666829619204-dBvr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADrrh50BOGZvtS9Im3EAdgZubZ4DmsvH9DI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-banner-learn-more-btn"
                >
                  Learn More
                </a>
                <img
                  src={slide.imagePath}
                  alt="AI Workshop Banner"
                  className="hero-banner-image"
                />
              </div>
            ) : (
              <div className="hero-showcase-media-wrapper">
                {slide.mediaType === 'video' ? (
                  <video
                    src={slide.mediaPath || ''}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-showcase-media"
                    onError={(e) => {
                      console.warn(`Failed to load video for ${slide.title}:`, e);
                      // Hide the video element if no media is available
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <img
                    src={slide.mediaPath || ''}
                    alt={slide.title}
                    className="hero-showcase-media"
                    onError={(e) => {
                      console.warn(`Failed to load image for ${slide.title}:`, e);
                      // Hide the image element if no media is available
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div className="hero-showcase-overlay">
                  <h2>{slide.title}</h2>
                  <Link to={slide.link} className="hero-showcase-btn">{slide.buttonText}</Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="hero-slider-controls">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`hero-slider-dot${idx === current ? ' active' : ''}`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider; 