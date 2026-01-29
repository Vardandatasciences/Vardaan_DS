import React from "react";
import "./Audit.css";
import { useMediaByPage } from '../../../hooks/useMedia';
import auditImage from "../../../assets/Images/Products/ProSync/audit.jpg";
import Footer from "../../../components/Footer/Footer";

// Import local video as fallback
import auditVideo from "../../../assets/videos/Audit.mp4";

const Audit = () => {
  // Fetch videos from the database for ProSync page
  const { media: prosyncVideos } = useMediaByPage('Products-ProSync');

  // Helper to get the S3 URL for a given video mediaKey
  const getVideoUrl = (mediaKey) => {
    const norm = str => str.replace(/\s+/g, '').toLowerCase();
    
    // Filter videos only
    const videoItems = prosyncVideos.filter(item => item.file_type === 'video');
    
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
  const auditVideoUrl = getVideoUrl('audit') || getVideoUrl('audit.mp4') || getVideoUrl('audit.webm') || auditVideo;

  return (
    <>
      {/* Video Overlay Section at the top */}
      <section className="audit-video-section">
        <div className="audit-video-overlay">
          <div>
            <h2 className="audit-video-title">ProSync</h2>
            <p className="audit-video-tagline">Turn bottlenecks into breakthroughs, automate critical workflows, escalates faster, and keeps compliance running like clockwork.</p>
          </div>
        </div>
        <video className="audit-background-video" autoPlay loop muted playsInline>
          <source src={auditVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <div className="audit-hero-container">
        <div className="audit-hero-content">
          <h1 className="audit-hero-title">Process Synchronization</h1>
          <p className="audit-hero-description">
            Experience seamless workflow automation to enhance business process
            efficiency. APMS provides powerful tools for streamlining
            processes, facilitating team collaboration, and improving overall
            productivity through intelligent workflow management and task
            synchronization.
          </p>
          {/* <button className="audit-hero-btn">Read the full story</button> */}
        </div>
        <div className="audit-hero-image-wrapper">
          <img src={auditImage} alt="Audit Practice Management" className="audit-hero-image" />
        </div>
      </div>

      {/* Features Section */}
      <section className="prosync-features-section">
        <div className="prosync-container">
          <div className="prosync-section-header">
            <h2>Powerful Features for Modern Organizations</h2>
            <p>
              ProSync transforms how organizations manage performance, track deadlines, 
              and eliminate bottlenecks with our comprehensive suite of enterprise-grade features.
            </p>
          </div>

          <div className="prosync-features-grid">
            <div className="prosync-feature-card">
              <div className="prosync-feature-icon prosync-feature-blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>End-to-End Task Oversight</h3>
              <p>Create, assign, and track tasks across departments with real-time updates and full visibility.</p>
            </div>

            <div className="prosync-feature-card">
              <div className="prosync-feature-icon prosync-feature-blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Smart Dashboards & Visual Analytics</h3>
              <p>Drill down into bottlenecks using interactive charts showing 'Pending', 'Completed with Delay' status.</p>
            </div>

            <div className="prosync-feature-card">
              <div className="prosync-feature-icon prosync-feature-green">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Audit-Centric Workflow</h3>
              <p>Turn recurring processes like GST Returns, VAT, Project Deliverables into repeatable, assignable task templates.</p>
            </div>

            <div className="prosync-feature-card">
              <div className="prosync-feature-icon prosync-feature-orange">
                <svg viewBox="0 0 24 24" fill="none">
                  <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 5c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <ellipse cx="12" cy="12" rx="9" ry="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <ellipse cx="12" cy="19" rx="9" ry="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 19c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Dynamic View Builder</h3>
              <p>Customize fields, layouts, and filters to match your unique business workflows and requirements.</p>
            </div>

            <div className="prosync-feature-card">
              <div className="prosync-feature-icon prosync-feature-blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 13.5,15.5 8.5,10.5 2,17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Integrated Mailer System</h3>
              <p>Automate reminders, reports, and updates directly from ProSync without external tools.</p>
            </div>

            <div className="prosync-feature-card">
              <div className="prosync-feature-icon prosync-feature-blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Time Tracking (Diary)</h3>
              <p>Log working hours for accountability and performance benchmarking across all projects.</p>
            </div>

            <div className="prosync-feature-card">
              <div className="prosync-feature-icon prosync-feature-green">
                <svg viewBox="0 0 24 24" fill="none">
                  <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 5c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <ellipse cx="12" cy="12" rx="9" ry="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <ellipse cx="12" cy="19" rx="9" ry="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 19c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Data Portability</h3>
              <p>Import/export data seamlessly from spreadsheets or databases with full data integrity.</p>
            </div>

            <div className="prosync-feature-card">
              <div className="prosync-feature-icon prosync-feature-orange">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Strong Governance</h3>
              <p>Audit trails, multi-factor authentication, and OTP-based password workflows ensure airtight security.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Audit; 