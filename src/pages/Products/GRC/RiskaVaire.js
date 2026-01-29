import React from "react";
import { useNavigate } from "react-router-dom";
import "./RiskaVaire.css";
import { useVideos, useImages, useMediaByPage } from '../../../hooks/useMedia';
import Footer from "../../../components/Footer/Footer";

// Import images directly from assets
import riskavaireImage1 from '../../../assets/Images/Products/GRC/grc 1.webp';
import riskavaireImage2 from '../../../assets/Images/Products/GRC/grc 2.webp';
import riskavaireImage3 from '../../../assets/Images/Products/GRC/grc 3.jpg';
import riskavaireBackground from '../../../assets/Images/Products/GRC/GRCS.jpg';

// Import local video as fallback
import riskavaireVideo from '../../../assets/videos/grc.mp4';

// Import SVG icon
import riskavaireIcon from '../../../assets/Images/Products/GRC/riskavaire-icon.svg';

const RiskaVaire = () => {
  const navigate = useNavigate();
  
  // Fetch videos from the database for RiskaVaire page
  const { media: riskavaireVideos, loading: videosLoading } = useMediaByPage('Products-RiskaVaire');
  
  // Fetch images from the database with category 'riskavaire' (keeping for potential future use)
  const { media: riskavaireImages, loading: imagesLoading } = useImages('riskavaire');

  // Helper to get the S3 URL for a given video mediaKey
  const getVideoUrl = (mediaKey) => {
    const norm = str => str.replace(/\s+/g, '').toLowerCase();
    
    // Filter videos only
    const videoItems = riskavaireVideos.filter(item => item.file_type === 'video');
    
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
  const riskavaireHeroVideoUrl = getVideoUrl('grc') || getVideoUrl('grc.mp4') || getVideoUrl('grc.webm') || riskavaireVideo;

  // Use direct image imports instead of database fetch
  const riskavaireImage1Url = riskavaireImage1;
  const riskavaireImage2Url = riskavaireImage2;
  const riskavaireImage3Url = riskavaireImage3;
  const riskavaireBackgroundUrl = riskavaireBackground;

  return (
    <div className="riskavaire-container">
      {/* Hero Video Section */}
      <section className="riskavaire-hero-video-section">
        <div className="riskavaire-video-overlay">
          <div>
            <img src={riskavaireIcon} alt="RiskaVaire" className="riskavaire-video-icon" />
            <p className="riskavaire-video-tagline">"Transforms compliance into confidence—simplifying audits, reducing risk, and giving you control, one module at a time"</p>
            <button 
                className="riskavaire-solutions-button"
                onClick={() => navigate('/solutions')}
              >
                View Solutions
              </button>
          </div>
        </div>
        <video className="riskavaire-background-video" autoPlay loop muted playsInline>
          <source src={riskavaireHeroVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <div className="riskavaire-background" style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${riskavaireBackgroundUrl}')`
      }}>
        <div className="riskavaire-content-wrapper">
          <div className="riskavaire-content-box">
            {/* <div className="riskavaire-institute">— Vardaan Global</div> */}
            <img src={riskavaireIcon} alt="RiskaVaire" className="riskavaire-title-icon" />
            <div className="riskavaire-tagline">
              "Transforms compliance into confidence—simplifying audits, reducing risk, and giving you control, one module at a time"
            </div>
            <div className="riskavaire-description-container">
              <p className="riskavaire-description">
                Our comprehensive RiskaVaire solutions help organizations align IT with business objectives, 
                effectively manage risk and meet compliance requirements through robust governance 
                frameworks, advanced risk assessment tools, and automated control monitoring systems.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Gallery Section */}
      <div className="riskavaire-gallery">
        <div className="riskavaire-gallery-item">
          {riskavaireImage1Url ? (
            <img src={riskavaireImage1Url} alt="RiskaVaire Solution 1" className="riskavaire-gallery-image" />
          ) : (
            <div className="riskavaire-gallery-placeholder">
              <p>Image not found - RiskaVaire Solution 1</p>
            </div>
          )}
          <div className="riskavaire-gallery-content">
            <div className="riskavaire-gallery-category">— RiskaVaire Solutions</div>
            <div className="riskavaire-gallery-title">Integrated Risk & Compliance Management</div>
            <div className="riskavaire-gallery-description">
              Unifies governance, risk, and compliance processes for better efficiency and control.
            </div>
          </div>
        </div>
        
        <div className="riskavaire-gallery-item">
          {riskavaireImage2Url ? (
            <img src={riskavaireImage2Url} alt="RiskaVaire Solution 2" className="riskavaire-gallery-image" />
          ) : (
            <div className="riskavaire-gallery-placeholder">
              <p>Image not found - RiskaVaire Solution 2</p>
            </div>
          )}
          <div className="riskavaire-gallery-content">
            <div className="riskavaire-gallery-category">— RiskaVaire Solutions</div>
            <div className="riskavaire-gallery-title">Real-time Monitoring & Reporting</div>
            <div className="riskavaire-gallery-description">
              Provides live insights into risks, controls, and compliance status across the organization.
            </div>
          </div>
        </div>
        
        <div className="riskavaire-gallery-item">
          {riskavaireImage3Url ? (
            <img src={riskavaireImage3Url} alt="RiskaVaire Solution 3" className="riskavaire-gallery-image" />
          ) : (
            <div className="riskavaire-gallery-placeholder">
              <p>Image not found - RiskaVaire Solution 3</p>
            </div>
          )}
          <div className="riskavaire-gallery-content">
            <div className="riskavaire-gallery-category">— RiskaVaire Solutions</div>
            <div className="riskavaire-gallery-title">Regulatory Adherence & Audit Readiness</div>
            <div className="riskavaire-gallery-description">
              Ensures compliance with laws and standards while simplifying audits with automated documentation.
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="riskavaire-features-section">
        <div className="riskavaire-features-container">
          <div className="riskavaire-features-header">
            <div className="riskavaire-features-subtitle">Complete Solution</div>
            <h2 className="riskavaire-features-title">Advanced RiskaVaire Functionalities</h2>
            <p className="riskavaire-features-description">
              Empower your organization with cutting-edge governance, risk management, and compliance tools 
              designed for the modern enterprise. Our comprehensive platform delivers unparalleled control and visibility.
            </p>
          </div>

          <div className="riskavaire-features-grid">
            <div className="riskavaire-feature-card">
              <div className="riskavaire-feature-icon">🛡️</div>
              <h3 className="riskavaire-feature-title">Risk Intelligence</h3>
              <p className="riskavaire-feature-description">
                Advanced AI-powered risk assessment and predictive analytics to identify, evaluate, and mitigate 
                potential threats before they impact your business operations.
              </p>
            </div>

            <div className="riskavaire-feature-card">
              <div className="riskavaire-feature-icon">📊</div>
              <h3 className="riskavaire-feature-title">Compliance Automation</h3>
              <p className="riskavaire-feature-description">
                Streamlined compliance workflows with automated monitoring, reporting, and audit trails 
                ensuring adherence to industry standards and regulatory requirements.
              </p>
            </div>

            <div className="riskavaire-feature-card">
              <div className="riskavaire-feature-icon">🎯</div>
              <h3 className="riskavaire-feature-title">Policy Management</h3>
              <p className="riskavaire-feature-description">
                Centralized policy creation, distribution, and tracking with version control, approval workflows, 
                and automated policy compliance verification across your entire organization.
              </p>
            </div>
          </div>

          <div className="riskavaire-key-features">
            <h3 className="riskavaire-key-features-title">Key Features & Capabilities</h3>
            <ul className="riskavaire-key-features-list">
              <li className="riskavaire-key-feature-item">
                <div className="riskavaire-key-feature-icon">🔍</div>
                <div className="riskavaire-key-feature-text">Advanced Threat Detection & Prevention</div>
              </li>
              <li className="riskavaire-key-feature-item">
                <div className="riskavaire-key-feature-icon">📋</div>
                <div className="riskavaire-key-feature-text">Automated Compliance Reporting</div>
              </li>
              <li className="riskavaire-key-feature-item">
                <div className="riskavaire-key-feature-icon">🏗️</div>
                <div className="riskavaire-key-feature-text">Multi-Framework Support (ISO, NIST, SOX)</div>
              </li>
              <li className="riskavaire-key-feature-item">
                <div className="riskavaire-key-feature-icon">📝</div>
                <div className="riskavaire-key-feature-text">Custom Risk Assessment Templates</div>
              </li>
              <li className="riskavaire-key-feature-item">
                <div className="riskavaire-key-feature-icon">📈</div>
                <div className="riskavaire-key-feature-text">Executive Dashboard & Analytics</div>
              </li>
              <li className="riskavaire-key-feature-item">
                <div className="riskavaire-key-feature-icon">🤝</div>
                <div className="riskavaire-key-feature-text">Third-Party Risk Management</div>
              </li>
              <li className="riskavaire-key-feature-item">
                <div className="riskavaire-key-feature-icon">🚨</div>
                <div className="riskavaire-key-feature-text">Incident Response Automation</div>
              </li>
              <li className="riskavaire-key-feature-item">
                <div className="riskavaire-key-feature-icon">🔄</div>
                <div className="riskavaire-key-feature-text">Continuous Control Monitoring</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div style={{ width: '100%', marginTop: '100px' }}>
        <Footer />
      </div>
    </div>
  );
};

export default RiskaVaire;
