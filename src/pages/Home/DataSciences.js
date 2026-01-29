// src/DataSciences.js
 
import './DataSciences.css';
import dataVideo from '../../assets/videos/data_science1.mp4'; // Ensure this path is correct
import aiGif from '../../assets/videos/ai1.mp4'; // Renamed to clarify this is a GIF
import imagevideo from '../../assets/videos/image_processing1.mp4';
import fullstackVideo from '../../assets/videos/end-to-end-dev.mp4';
import React, { useEffect, useRef, useState } from 'react';
 
const contentData = [
  {
    id: 'riskavaire',
    title: ['RiskaVaire'],
    description: 'Empower your organization with Governance, Risk, and Compliance (RiskaVaire) solutions that streamline regulatory processes, mitigate risks, and ensure business continuity through intelligent automation and analytics.',
    videoSrc: dataVideo,
  },
 
  {
    id: 'prosync',
    title: ['ProSync'],
    description: 'Synchronize your business operations with ProSync, our integrated platform designed to enhance productivity, automate workflows, and deliver real-time insights for smarter decision-making.',
    videoSrc: aiGif,
  },
  {
    id: 'lapsec',
    title: ['ViCTAA'],
    description: 'Protect your digital assets with Lapsec, a comprehensive cybersecurity solution offering advanced threat detection, incident response, and continuous monitoring to safeguard your enterprise.',
    videoSrc: imagevideo,
  },
  {
    id: 'smart-logistics',
    title: ['Smart Logistics'],
    description: 'Optimize your supply chain with Smart Logistics—leveraging AI and IoT to enable real-time tracking, predictive analytics, and seamless coordination across your logistics network.',
    videoSrc: fullstackVideo,
  },
  // {
  //   title: ['Transformative Solutions for a Digital Future'],
  //   description: 'Revolutionize your business with our comprehensive digital transformation solutions. We integrate cutting-edge technologies, data-driven strategies, and innovative approaches to help organizations thrive in the digital age, ensuring sustainable growth and competitive advantage.',
  //   videoSrc: dataVideo3,
  // },
 
  // {
  //   title: ['Transformative Journey with Vardaan'],
  //   description: 'Dedicated to knowledge-sharing, our training programs provide practical skills in the ever-changing world of data sciences. As a consultancy, we bridge the gap between raw data and actionable insights, delivering trends analysis and dashboards using advanced analytics, machine learning, and AI.',
  //   videoSrc: dataVideo2,
  // },
  // {
  //   title: ['Transformative Solutions for a Digital Future'],
  //   description: 'Revolutionize your business with our comprehensive digital transformation solutions. We integrate cutting-edge technologies, data-driven strategies, and innovative approaches to help organizations thrive in the digital age, ensuring sustainable growth and competitive advantage.',
  //   videoSrc: dataVideo3,
  // }
 
];
 
// Helper function to determine if the source is a GIF
const isGifFile = (src) => {
  if (!src) return false;
  return src.toLowerCase().endsWith('.gif');
};
 
const DataSciences = ({ onComplete }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const totalSections = contentData.length;
 
  // Set up observation to track when section is visible
  useEffect(() => {
    if (!containerRef.current) return;

    // Create an intersection observer to detect when the section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when at least 10% is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      const currentRef = containerRef.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
 
  // Handle completion of section when user has viewed the last slide
  useEffect(() => {
    if (activeIndex === totalSections - 1 && !sectionComplete && isVisible) {
      // We've reached the last section, set as complete
      setTimeout(() => {
        setSectionComplete(true);
        if (onComplete && typeof onComplete === 'function') {
          onComplete();
        }
      }, 1000); // Short delay to ensure content is seen
    }
  }, [activeIndex, isVisible, onComplete, sectionComplete, totalSections]);

  // Function to handle dot click
  const handleDotClick = (index) => {
    setSlideDirection(index > activeIndex ? 'next' : 'prev');
    setActiveIndex(index);
  };

  // Navigation arrow handlers
  const handlePrevClick = () => {
    if (activeIndex > 0) {
      setSlideDirection('prev');
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (activeIndex < contentData.length - 1) {
      setSlideDirection('next');
      setActiveIndex(activeIndex + 1);
    }
  };

  // Preload media for smoother experience
  useEffect(() => {
    contentData.forEach(item => {
      if (isGifFile(item.videoSrc)) {
        const img = new Image();
        img.src = item.videoSrc;
      } else {
        const video = document.createElement('video');
        video.src = item.videoSrc;
        video.preload = 'auto';
      }
    });
  }, []);
 
  return (
    <div className="datasciences-container" ref={containerRef}>
      <div className="data-sciences-wrapper" ref={wrapperRef}>
        <div className="data-sciences-main-container">
          {contentData.map((item, index) => (
            <div
              key={index}
              className={`data-sciences-section ${index === activeIndex ? 'active' : ''} ${
                index > activeIndex ? 'next' : index < activeIndex ? 'prev' : ''
              } ${slideDirection}`}
            >
              {/* Left side - Text Content */}
              <div className="section-text-side">
                <div className="content-box">
                  {/* Title rendering */}
                  {Array.isArray(item.title) ? (
                    item.title.map((titleText, i) => (
                      <h1
                        key={i}
                        className="section-title"
                        style={{
                          color: index === 0 ? (i === 0 ? '#051937' : '#2c3e77') :
                                 index === 1 ? '#c31432' :
                                 index === 2 ? '#134e5e' :
                                 index === 3 ? '#5c37b7' : '#0083b0',
                        }}
                      >
                        {titleText}
                      </h1>
                    ))
                  ) : (
                    <h2
                      className="section-title"
                      style={{
                        color: index === 1 ? '#c31432' :
                               index === 2 ? '#134e5e' :
                               index === 3 ? '#5c37b7' : '#0083b0',
                      }}
                    >
                      {item.title}
                    </h2>
                  )}
                 
                  {/* Underline */}
                  <div
                    className="section-underline"
                    style={{
                      backgroundColor: index === 0 ? '#4a3aff' :
                                       index === 1 ? '#ff416c' :
                                       index === 2 ? '#1bc47d' :
                                       index === 3 ? '#8367da' : '#3bb1d8',
                    }}
                  ></div>
                 
                  {/* Description */}
                  <p className="section-description">
                    {item.description}
                  </p>
                 
                  {/* Button if present */}
                  {item.buttonText && (
                    <button className="section-button">
                      {item.buttonText}
                    </button>
                  )}
                </div>
              </div>
             
              {/* Right side - Media Content */}
              <div className="section-video-side">
                {isGifFile(item.videoSrc) ? (
                  <div className="gif-container">
                    <img
                      src={item.videoSrc}
                      alt={Array.isArray(item.title) ? item.title.join(' ') : item.title}
                    />
                  </div>
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={item.videoSrc}
                    className="fullscreen-media"
                  >
                    Your browser does not support video playback.
                  </video>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="navigation-arrow left-arrow"
          onClick={handlePrevClick}
          disabled={activeIndex === 0}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button 
          className="navigation-arrow right-arrow"
          onClick={handleNextClick}
          disabled={activeIndex === contentData.length - 1}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="pagination-dots">
          {contentData.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default DataSciences;
 
 