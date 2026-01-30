import React from "react";
import "./Truck.css";
import { useMediaByPage } from '../../../hooks/useMedia';
import truck1Image from "../../../assets/Images/Products/Smart Trucks/truck 1.jpg";
import truck2Image from "../../../assets/Images/Products/Smart Trucks/truck 2.webp";
import truck3Image from "../../../assets/Images/Products/Smart Trucks/truck 3.jpeg";
import Footer from "../../../components/Footer/Footer";

// Import local video as fallback
import smartTrucksVideo from "../../../assets/videos/smarttrucks.mp4";

const Truck = () => {
  // Fetch videos from the database for Smart Trucks page
  const { media: smartTrucksVideos, loading: videosLoading } = useMediaByPage('Products-Smart Trucks');

  // Helper to get the S3 URL for a given video mediaKey
  const getVideoUrl = (mediaKey) => {
    const norm = str => str.replace(/\s+/g, '').toLowerCase();
    
    // Filter videos only
    const videoItems = smartTrucksVideos.filter(item => item.file_type === 'video');
    
    // Try exact match first
    let found = videoItems.find(item => norm(item.original_name) === norm(mediaKey));
    
    // If not found, try partial match
    if (!found) {
      found = videoItems.find(item => 
        norm(item.original_name).includes(norm(mediaKey)) || 
        norm(mediaKey).includes(norm(item.original_name))
      );
    }
    
    return found ? found.s3_url : '';
  };

  // Get hero video from database with fallback to local asset
  const smartTrucksVideoUrl = getVideoUrl('smarttrucks') || getVideoUrl('smarttrucks.mp4') || getVideoUrl('smarttrucks.webm') || smartTrucksVideo;

  return (
    <div className="truck-container">
      {/* Hero Section with Video Overlay */}
      <section className="truck-hero">
        <div className="video-overlay">
          <video 
            autoPlay 
            muted 
            loop 
            className="hero-video"
            playsInline
          >
            <source src={smartTrucksVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay-content">
            <h1 className="truck-title">SmartLogistics</h1>
            <p className="truck-subtitle">Intelligent Fleet Management Solutions</p>
          </div>
        </div>
      </section>

      {/* Custom Truck Management Section */}
      <section className="truck-management-section">
        <div className="container">
          <div className="management-row">
            <div className="left-column">
              <h2>Custom Truck Management System</h2>
              <p>
                SLIMS (Smart Logistics Information Management System) is a comprehensive, end-to-end solution designed to simplify and optimize logistics operations. It integrates Claims Management, Warranties Management, and Inventory Tracking into a single, cohesive platform, enabling businesses to gain better control and visibility over their supply chain.
              </p>
              <p>
                By offering real-time tracking, automated claims processing, and streamlined warranty workflows, SLIMS reduces operational bottlenecks and enhances service efficiency. The system also supports sample tracking, shipment optimization, and supply chain visibility, helping organizations make data-driven decisions through integrated reporting and custom dashboards.
              </p>
            </div>
            <div className="right-column">
              <div className="feature-boxes-grid">
                <div className="feature-box-wrapper">
                  <div className="icon-container red-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"></path>
                    </svg>
                  </div>
                  <h4>Logistics and Claims Management</h4>
                  <p>SmartTrucks streamlines logistics operations and accelerates claims processing with enhanced visibility and workflow automation.</p>
                </div>
                <div className="feature-box-wrapper">
                  <div className="icon-container blue-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <h4>Sample Tracking</h4>
                  <p>Track samples in real-time across the supply chain, ensuring traceability and minimizing losses.</p>
                </div>
                <div className="feature-box-wrapper">
                  <div className="icon-container green-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>
                  <h4>Integrated Reporting</h4>
                  <p>Access consolidated data insights through customizable reports and dashboards for informed decision-making.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trackobit Section */}
      <section className="why-trackobit-section">
        <div className="container">
          <div className="section-header">
            <h2 
              id="truck-main-heading"
              className="truck-heading" 
              style={{
                color: '#000', 
                display: 'block',
                visibility: 'visible',
                fontSize: '2.8rem',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}
            >
              We're Here to Supercharge Your Trucking Business
            </h2>
          </div>
        </div>
        
        <div className="benefits-container">
          <div className="benefit-card">
            <div className="benefit-image">
              <img src={truck1Image} alt="Flexible System" />
            </div>
            <div className="benefit-content">
              <div className="heading-with-icon">
                <div className="benefit-icon blue-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                    <circle cx="12" cy="10" r="3"></circle>
                    <path d="M12 7v0"></path>
                    <path d="M12 13v0"></path>
                    <path d="M9 10h0"></path>
                    <path d="M15 10h0"></path>
                  </svg>
                </div>
                <h3>Flexible System</h3>
              </div>
              <p>If you have any use case in your trucking fleet that we do not solve, we'll mould our flexible software to cater to your needs, no problem!</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-image">
              <img src={truck2Image} alt="24x7 Support" />
            </div>
            <div className="benefit-content">
              <div className="heading-with-icon">
                <div className="benefit-icon red-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                </div>
                <h3>24x7 Support</h3>
              </div>
              <p>Your trucks' software support might run out, but our support to get them back on track will never run out. Our support team is always available for you.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-image">
              <img src={truck3Image} alt="Maximum Accuracy" />
            </div>
            <div className="benefit-content">
              <div className="heading-with-icon">
                <div className="benefit-icon green-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16l4-4-4-4"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                </div>
                <h3>Maximum Accuracy</h3>
              </div>
              <p>You can blindly trust the data you collect from our software. Our constant monitoring and tracking offer best-in-the-industry data accuracy.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Truck; 