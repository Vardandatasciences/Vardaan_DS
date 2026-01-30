import React, { useState, useEffect } from 'react';
import './BusinessIntelligence.css';
import { useMediaByPage } from '../../../hooks/useMedia';
import Footer from '../../../components/Footer/Footer';

// Import video directly from assets
import timelapseVideo from '../../../assets/videos/Time Lapse.mp4';

const BusinessIntelligence = () => {
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  // Fetch media from the database for Business Intelligence page (keeping for images)
  const { media: businessIntelligenceMedia, loading: mediaLoading } = useMediaByPage('Services-BusinessIntelligence');

  // Helper to get the S3 URL for a given mediaKey (keeping for images)
  const getMediaUrl = (mediaKey, fileType = null) => {
    const norm = str => str.replace(/\s+/g, '').toLowerCase();
    
    // Filter by file type if specified
    let mediaItems = businessIntelligenceMedia;
    if (fileType) {
      mediaItems = businessIntelligenceMedia.filter(item => item.file_type === fileType);
    }
    
    // Try exact match first
    let found = mediaItems.find(item => norm(item.original_name) === norm(mediaKey));
    
    // If not found, try partial match
    if (!found) {
      found = mediaItems.find(item => 
        norm(item.original_name).includes(norm(mediaKey)) || 
        norm(mediaKey).includes(norm(item.original_name))
      );
    }
    
    return found ? found.s3_url : '';
  };

  // Use direct video import instead of database fetch
  const timelapseVideoUrl = timelapseVideo;
  
  // Get specific images for Business Intelligence (keeping database fetch for images)
  const biIntroImageUrl = getMediaUrl('business_intelligence_intro1.jpg', 'image') || getMediaUrl('business_intelligence_intro1', 'image');
  const biIntroImage2Url = getMediaUrl('business_intelligence_intro2.jpg', 'image') || getMediaUrl('business_intelligence_intro2', 'image');
  const accessibleInsightsUrl = getMediaUrl('accessible_insights.jpg', 'image') || getMediaUrl('accessible_insights', 'image');
  const decisionMakingUrl = getMediaUrl('decision_making.jpeg', 'image') || getMediaUrl('decision_making', 'image');
  const strategicClarityUrl = getMediaUrl('strategic_clarity.jpg', 'image') || getMediaUrl('strategic_clarity', 'image');

  // Debug logging
  useEffect(() => {
    console.log('BusinessIntelligence - businessIntelligenceMedia:', businessIntelligenceMedia);
    console.log('BusinessIntelligence - timelapseVideoUrl:', timelapseVideoUrl);
  }, [businessIntelligenceMedia, timelapseVideoUrl]);

  const handleVideoError = () => {
    console.error('Video failed to load:', timelapseVideoUrl);
    setVideoError(true);
    setVideoLoading(false);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully:', timelapseVideoUrl);
    setVideoLoading(false);
  };

  return (
    <div className="business-intelligence">
      <div className="hero-section">
        {timelapseVideoUrl && !videoError ? (
          <video 
            autoPlay 
            muted 
            loop 
            className="hero-video"
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
          >
            <source src={timelapseVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="hero-video bg-gradient-to-r from-blue-600 to-purple-600"></div>
        )}
        <div className="hero-overlay">
          <h1>Business Intelligence & Visualization</h1>
          {/* <p>Transform your data into actionable insights with powerful visualization tools</p> */}
        </div>
      </div>
      
      <div className="bi-intro-section">
        <div className="bi-intro-container">
          <div className="bi-intro-image-wrapper">
            <img src={biIntroImageUrl} alt="Business Intelligence Introduction" className="bi-intro-image" />
          </div>
          <div className="bi-intro-content">
            <div className="bi-intro-point">
              <span className="bi-checkmark">✓</span>
              <p>Data is most valuable when it is understood and used effectively. Our Business Intelligence & Visualization services focus on transforming complex datasets into easily digestible insights.</p>
            </div>
            <div className="bi-intro-point">
              <span className="bi-checkmark">✓</span>
              <p>At Vardaan, we design intuitive dashboards that provide a comprehensive overview of key metrics, reducing complexity for stakeholders at all levels.</p>
            </div>
            <div className="bi-intro-point">
              <span className="bi-checkmark">✓</span>
              <p>Our visualization solutions enable data-driven decision making by presenting information in clear, actionable formats that drive business growth.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bi-features-section">
        <div className="bi-features-container">
          <div className="bi-features-content">
            <div className="bi-features-point">
              <span className="bi-features-checkmark">✓</span>
              <p>Our dynamic reporting tools ensure that businesses have access to real-time data, enabling quick and informed decision-making.</p>
            </div>
            <div className="bi-features-point">
              <span className="bi-features-checkmark">✓</span>
              <p>We excel in crafting impactful visualizations that tell compelling stories, making data not only accessible but also actionable.</p>
            </div>
            <div className="bi-features-point">
              <span className="bi-features-checkmark">✓</span>
              <p>With our solutions, your organization can bridge the gap between raw data and strategic decision-making, achieving clarity and confidence in every step.</p>
            </div>
          </div>
          <div className="bi-features-image-wrapper">
            <img src={biIntroImage2Url} alt="Business Intelligence Features" className="bi-features-image" />
          </div>
        </div>
      </div>
      
      <div className="client-benefits-section">
        <div className="business-intelligence-benefits-heading">
          <h2>Client Benefits for Each Service Line</h2>
        </div>
        
        <div className="client-benefit-row">
          <div className="client-benefit-image-wrapper">
            <img src={accessibleInsightsUrl} alt="Accessible Insights" className="client-benefit-image" />
          </div>
          <div className="client-benefit-content light-blue">
            <h3>Accessible Insights</h3>
            <p>With intuitive dashboards crafted by Vardaan, stakeholders across all levels gain simplified access to critical metrics, enabling them to focus on actionable insights rather than deciphering complex datasets.</p>
          </div>
        </div>
        
        <div className="client-benefit-row reverse">
          <div className="client-benefit-content light-green">
            <h3>Quick Decision Making</h3>
            <p>Real-time reporting tools provide organizations with timely updates, allowing them to make swift and confident decisions in response to business challenges or opportunities.</p>
          </div>
          <div className="client-benefit-image-wrapper">
            <img src={decisionMakingUrl} alt="Decision Making" className="client-benefit-image" />
          </div>
        </div>
        
        <div className="client-benefit-row">
          <div className="client-benefit-image-wrapper">
            <img src={strategicClarityUrl} alt="Strategic Clarity" className="client-benefit-image" />
          </div>
          <div className="client-benefit-content light-purple">
            <h3>Strategic Clarity</h3>
            <p>The scalable frameworks designed by Vardaan support seamless data flow across organizations, enabling them to adapt to growth and changes without compromising efficiency or security.</p>
          </div>
        </div>
      </div>
      
      {/* Add more content sections here */}
      <Footer />
    </div>
  );
};

export default BusinessIntelligence;
