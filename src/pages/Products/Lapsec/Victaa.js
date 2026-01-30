import React, { useEffect, useState, useRef } from "react";
import "./Victaa.css";
import { useMediaByPage } from '../../../hooks/useMedia';
import Footer from "../../../components/Footer/Footer";

// Import local video as fallback
import lapsecHeroVideo from '../../../assets/videos/lapsec.mp4';

const Victaa = () => {
  const [visibleBenefits, setVisibleBenefits] = useState([]);
  const benefitsRef = useRef(null);
  const videoRef = useRef(null);

  // Fetch media from the database for Lapsec page (keeping for images)
  const { media: lapsecMedia, loading: mediaLoading } = useMediaByPage('Products-Lapsec');

  // Helper to get the S3 URL for a given mediaKey (keeping for images)
  const getMediaUrl = (mediaKey, fileType = null) => {
    const norm = str => str.replace(/\s+/g, '').toLowerCase();
    
    // Filter by file type if specified
    let mediaItems = lapsecMedia;
    if (fileType) {
      mediaItems = lapsecMedia.filter(item => item.file_type === fileType);
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

  // Get hero video from database with fallback to local asset
  const lapsecVideoUrl = getMediaUrl('lapsec', 'video') || getMediaUrl('lapsec.mp4', 'video') || getMediaUrl('lapsec.webm', 'video') || lapsecHeroVideo;
  
  // Get specific images from database (keeping for other sections)
  const lapsecImg1Url = getMediaUrl('lapsec.webp', 'image') || getMediaUrl('lapsec', 'image');
  const lapsecImg2Url = getMediaUrl('lapsec 1.jpg', 'image') || getMediaUrl('lapsec1.jpg', 'image');
  const lapsecImg3Url = getMediaUrl('lapsec 2.jpg', 'image') || getMediaUrl('lapsec2.jpg', 'image');
  const lapsecBackgroundUrl = getMediaUrl('lapsec 4.webp', 'image') || getMediaUrl('lapsec4.webp', 'image');

  // Benefits data with images from database
  const benefitsData = [
    {
      imageUrl: getMediaUrl('lapsec 5.jpg', 'image') || getMediaUrl('lapsec5.jpg', 'image'),
      alt: "Social Media Blocking",
      title: "Website & Social Media Blocking",
      description: "Blocking access to social media and choice of sites to maintain productivity and security."
    },
    {
      imageUrl: getMediaUrl('lapsec 6.jpeg', 'image') || getMediaUrl('lapsec6.jpeg', 'image'),
      alt: "Periodic Reporting",
      title: "Automated Reporting and Threat Detection System",
      description: "Periodic reporting to the admin ID with comprehensive security metrics, including abnormal system behavior, suspicious processes, and hardware usage to ensure advanced threat detection and compliance."
    },
    {
      imageUrl: getMediaUrl('lapsec 7.jpg', 'image') || getMediaUrl('lapsec7.jpg', 'image'),
      alt: "Dashboard Insights",
      title: "Comprehensive Security Dashboard",
      description: "Dashboard with critical insights like vulnerabilities, threats, open ports, drives, software, etc."
    },
    {
      imageUrl: getMediaUrl('lapsec 8.jpg', 'image') || getMediaUrl('lapsec8.jpg', 'image'),
      alt: "Key Information Reports",
      title: "Detailed Information Reports",
      description: "Reports containing key information for security analysis and compliance requirements."
    },
    {
      imageUrl: getMediaUrl('lapsec 9.avif', 'image') || getMediaUrl('lapsec9.avif', 'image'),
      alt: "Activity Tracking",
      title: "Activity Monitoring & Tracking",
      description: "Tracking and monitoring active, inactive and recent activities with detailed reporting."
    },
    {
      imageUrl: getMediaUrl('lapsec 10.jpg', 'image') || getMediaUrl('lapsec10.jpg', 'image'),
      alt: "External Device Monitoring",
      title: "USB & External Device Control",
      description: "Tracking of external devices connected and data size transfer information with access control."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timer = setTimeout(() => {
            showBenefits();
          }, 300);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.2 }
    );

    if (benefitsRef.current) {
      observer.observe(benefitsRef.current);
    }

    return () => {
      const currentRef = benefitsRef.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Ensure video plays correctly
  useEffect(() => {
    if (videoRef.current) {
      const playVideo = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(error => {
            console.log("Video play error:", error);
            // Try playing again on user interaction
            document.addEventListener('click', function playOnClick() {
              videoRef.current.play().catch(e => console.log("Still can't play video:", e));
              document.removeEventListener('click', playOnClick);
            }, { once: true });
          });
        }
      };
      
      // Play video when component mounts
      playVideo();
      
      // Play video when it becomes visible in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            playVideo();
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(videoRef.current);
      
      // Handle window resize to ensure video covers the screen
      const handleResize = () => {
        if (videoRef.current) {
          videoRef.current.style.height = '100%';
          videoRef.current.style.width = '100%';
        }
      };
      
      window.addEventListener('resize', handleResize);
      handleResize(); // Call once on mount
      
      return () => {
        const currentRef = videoRef.current;
        if (currentRef) {
          observer.unobserve(currentRef);
        }
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const showBenefits = () => {
    const benefits = document.querySelectorAll('.benefits-image-item');
    benefits.forEach((benefit, index) => {
      setTimeout(() => {
        setVisibleBenefits(prev => [...prev, index]);
      }, index * 200);
    });
  };

  return (
    <div className="victaa-container">
      {/* Hero Section with Video Overlay - Now at the top */}
      <section className="victaa-hero">
        <div className="video-overlay">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            className="hero-video"
            playsInline
            preload="auto"
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          >
            <source src={lapsecVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay-content">
            <h1 className="victaa-title">ViCTAA</h1>
            <p className="victaa-subtitle">"Delivers airtight local access control and intelligent privilege enforcement—securing endpoints without slowing teams down."</p>
            {/* <button 
              className="get-started-btn"
              onClick={() => window.location.href = '/ViCTAA/pricing'}
            >
              Get Started
            </button> */}
          </div>
        </div>
      </section>
      
      {/* Content Sections */}
      <section className="lapsec-content top-intro">
        <div className="container">
          {/* Main Heading */}
          <div className="lapsec-main-heading">
            <h1>ViCTAA(Vardaan's Intelligent Cyber Threat Analysing Agent)</h1>
          </div>
          
          <div className="lapsec-section lapsec-intro">
            <div className="lapsec-intro-content">
              <div className="lapsec-image-grid">
                <div className="image-item item1">
                  {lapsecImg1Url ? (
                    <img src={lapsecImg1Url} alt="LAPSEC Security Interface" />
                  ) : (
                    <div className="lapsec-image-placeholder">
                      <p>Image not found - LAPSEC Security Interface</p>
                    </div>
                  )}
                </div>
                <div className="image-item item2">
                  {lapsecImg2Url ? (
                    <img src={lapsecImg2Url} alt="LAPSEC Dashboard" />
                  ) : (
                    <div className="lapsec-image-placeholder">
                      <p>Image not found - LAPSEC Dashboard</p>
                    </div>
                  )}
                </div>
                <div className="image-item item3">
                  {lapsecImg3Url ? (
                    <img src={lapsecImg3Url} alt="LAPSEC Security Features" />
                  ) : (
                    <div className="lapsec-image-placeholder">
                      <p>Image not found - LAPSEC Security Features</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="lapsec-intro-text">
                <p>
                  ViCTAA is our comprehensive security 
                  management platform designed to protect your organization's digital and physical 
                  assets through advanced authentication, authorization, and monitoring systems.
                </p>
                <p>
                  ViCTAA conducts a comprehensive system scan, providing an in-depth report on critical aspects 
                  of your device. It offers centralized USB access control, website blocking capabilities, 
                  and automated patch notifications to ensure your systems remain secure and compliant with 
                  security policies.
                </p>
                <ul className="lapsec-features-list">
                  <li>Comprehensive Device Report</li>
                  <li>Threat Detection</li>
                  <li>Centralized USB access control</li>
                  <li>Website blocking capabilities</li>
                  <li>Automated patch notifications</li>
                  <li>Activity Monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining Content */}
      <section className="lapsec-content">
        <div className="container">
          {/* Key Features Section with Full-Screen Background */}
        </div>
      </section>
      
      {/* Key Features Section with Full-Screen Background */}
      <section className="key-features-section" style={{
        backgroundImage: lapsecBackgroundUrl ? `url('${lapsecBackgroundUrl}')` : 'none'
      }}>
        {/* <h2>Key Features</h2> */}
        <div className="container">
          <div className="features-circle-grid">
            <div className="feature-circle feature-hexagon">
              <div className="circle-content">
                <h3>Multi-Factor Authentication</h3>
                <p>Advanced authentication methods</p>
              </div>
            </div>
            <div className="feature-circle feature-hexagon">
              <div className="circle-content">
                <h3>Access Control</h3>
                <p>Granular permission management with role-based access control</p>
              </div>
            </div>
            <div className="feature-circle feature-hexagon">
              <div className="circle-content">
                <h3>Physical Security Integration</h3>
                <p>Seamless integration with physical security systems</p>
              </div>
            </div>
            <div className="feature-circle feature-hexagon">
              <div className="circle-content">
                <h3>Audit Trail</h3>
                <p>Comprehensive logging and reporting of all access attempts and security events</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Full-Screen Background */}
      <section className="benefits-section" ref={benefitsRef}>
        <h2>Benefits</h2>
        <div className="benefits-container">
          <div className="benefits-layout">
            <div className="benefits-image-grid">
              {benefitsData.map((benefit, index) => (
                <div 
                  key={index}
                  className={`benefits-image-item ${visibleBenefits.includes(index) ? "visible" : ""}`}
                >
                  <div className="benefit-image-container">
                    {benefit.imageUrl ? (
                      <img 
                        src={benefit.imageUrl} 
                        alt={benefit.alt}
                        className="benefit-image"
                      />
                    ) : (
                      <div className="benefit-image-placeholder">
                        <p>Image not found - {benefit.alt}</p>
                      </div>
                    )}
                  </div>
                  <div className="benefit-content">
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p className="benefit-description">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <div className="lapsec-cta-wrapper">
        <h3 className="cta-prompt">Want to see the pricing?</h3>
        <button 
          className="lapsec-cta-button"
          onClick={() => window.location.href = '/lapsec-pricing'}
        >
          Get it now
        </button>
      </div> */}

      <Footer />
    </div>
  );
};

export default Victaa; 