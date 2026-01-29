import React from 'react';
import { useMediaByPage } from '../../hooks/useMedia';
import './Accordion.css';

// Import video directly from assets
import dashboardVideo from '../../assets/videos/Dashboard (2).mp4';

const Accordion = () => {
  // Fetch videos from the database for the Home page (keeping for potential future use)
  const { media: homeVideos, loading: videosLoading } = useMediaByPage('Home');

  // Use direct video import instead of database fetch
  const dashboardVideoUrl = dashboardVideo;

  // Show loading state while videos are being fetched (simplified since we have direct video)
  if (videosLoading) {
    return (
      <div className="home-hero-content">
        <div className="home-hero-text">
          <h1>
            <span className="home-hero-gradient-text">Powering the world</span> <span className="home-hero-gradient-text-3">with data,</span>{' '}
            <span className="home-hero-gradient-text-4">innovation,</span> <span className="home-hero-gradient-text-5">and AI.</span>
          </h1>
          <p>
            Join the growing number of customers that use Vardaan to transform
            raw data into actionable intelligence, embed analytics services,
            and create powerful AI-driven business solutions.
          </p>
        </div>
        <div className="home-hero-preview-card">
          <div className="home-hero-dashboard-content">
            <div className="home-hero-dashboard-video-placeholder">
              <p>Loading video content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-hero-content">
      <div className="home-hero-text">
        <h1>
          <span className="home-hero-gradient-text">Powering the world</span> <span className="home-hero-gradient-text-3">with data,</span>{' '}
          <span className="home-hero-gradient-text-4">innovation,</span> <span className="home-hero-gradient-text-5">and AI.</span>
        </h1>
        <p>
          Join the growing number of customers that use Vardaan to transform
          raw data into actionable intelligence, embed analytics services,
          and create powerful AI-driven business solutions.
        </p>
      </div>
     
      <div className="home-hero-preview-card">
        <div className="home-hero-dashboard-content">
          {dashboardVideoUrl ? (
            <video
              src={dashboardVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="home-hero-dashboard-video"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              onError={(e) => {
                console.error('Video error:', e);
                console.error('Video URL:', dashboardVideoUrl);
              }}
              onLoadStart={() => console.log('Video loading started:', dashboardVideoUrl)}
              onCanPlay={() => console.log('Video can play:', dashboardVideoUrl)}
              onLoadedData={() => console.log('Video data loaded:', dashboardVideoUrl)}
            />
          ) : (
            <div className="home-hero-dashboard-video-placeholder">
              <p>Video not found - URL: {dashboardVideoUrl || 'undefined'}</p>
              <p>Please check if the video file exists in the assets folder</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion; 