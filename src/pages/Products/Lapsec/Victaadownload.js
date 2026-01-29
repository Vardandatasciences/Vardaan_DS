import React, { useState, useEffect, useRef } from 'react';
import './Victaadownload.css';
import Footer from '../../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const LapsecPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const [downloadProgress, setDownloadProgress] = useState({});
  const [typedText, setTypedText] = useState('');
  const observerRef = useRef();

  const handleDownload = (version) => {
    // Define the download URLs
    const downloadUrls = {
      'without AI': 'https://laragelapse.s3.ap-south-1.amazonaws.com/ViCTAA_Lite.msi',
      'with AI': 'https://laragelapse.s3.ap-south-1.amazonaws.com/ViCTAA.msi'
    };

    // Get the URL for the requested version
    const downloadUrl = downloadUrls[version];
    
    if (!downloadUrl) {
      alert('Download URL not found for this version.');
      return;
    }

    // Show progress indication
    setDownloadProgress(prev => ({ ...prev, [version]: 0 }));
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = version === 'without AI' ? 'ViCTAA_Lite.msi' : 'ViCTAA.msi'; // Set a filename
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulate download progress for UI feedback
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const current = prev[version] || 0;
        if (current >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Properly remove the download progress to reset button state
            setDownloadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[version];
              return newProgress;
            });
          }, 500);
          return prev;
        }
        return { ...prev, [version]: current + 20 };
      });
    }, 100);
  };

  // Typewriter effect for hero title
  useEffect(() => {
    const text = "Secure Your Digital Infrastructure";
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Register elements for scroll animation
  const registerElement = (id) => {
    return {
      id,
      ref: (el) => {
        if (el && observerRef.current) {
          observerRef.current.observe(el);
        }
      }
    };
  };

  const scrollToDownload = () => {
    const downloadSection = document.getElementById('victaa-download-section');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="victaa-download-page">
      {/* Header */}
      <header className="victaa-download-header">
        <div className="victaa-download-container">
          {/* Logo and tagline removed */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="victaa-download-hero">
        <div className="victaa-download-hero-background">
          <div className="victaa-download-floating-elements">
            <div className="victaa-download-floating-element victaa-download-floating-element-1">🛡️</div>
            <div className="victaa-download-floating-element victaa-download-floating-element-2">🔐</div>
            <div className="victaa-download-floating-element victaa-download-floating-element-3">🔄</div>
            <div className="victaa-download-floating-element victaa-download-floating-element-4">⚡</div>
          </div>
          <div className="victaa-download-container">
            <div className="victaa-download-hero-content">
              <h1 className="victaa-download-hero-heading">ViCTAA</h1>
              <h2 className="victaa-download-hero-title typewriter">
                {typedText}
                <span className="victaa-download-highlight">
                  {typedText.includes('LAPSEC') ? '' : ''}
                </span>
              </h2>
              <p className="victaa-download-hero-subtitle victaa-download-fade-in-up">
                Intelligent, agentless endpoint security—designed for proactive leaders
              </p>
              <div className="victaa-download-hero-buttons victaa-download-fade-in-up">
                <button className="victaa-download-btn victaa-download-btn-primary victaa-download-pulse" onClick={scrollToDownload}>
                  <span className="victaa-download-btn-text">Download Now</span>
                  <span className="victaa-download-btn-icon">⬇</span>
                </button>
                <button className="victaa-download-btn victaa-download-btn-secondary" onClick={() => navigate('/ViCTAA')}>
                  <span className="victaa-download-btn-text">Learn More</span>
                  <span className="victaa-download-btn-icon">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="victaa-download-main-content">
        <div className="victaa-download-container">
          {/* Download Section */}
          <section id="victaa-download-section" className="victaa-download-section">
            <h2 className="victaa-download-section-title animate-on-scroll" {...registerElement('download-title')}>Download ViCTAA</h2>
            <p className="victaa-download-subtitle">Choose the version that best fits your organization's needs</p>
            
            <div className="victaa-download-options">
              <div className="victaa-download-card">
                <div className="victaa-download-header">
                  <h3>ViCTAA Standard</h3>
                  <p className="victaa-download-description">Essential Security Management Foundation</p>
                </div>
                <div className="victaa-download-features">
                  <ul>
                    <li>🚀 Agentless, Zero-Disruption Deployment</li>
                    <li>🎯 Actionable Risk Intelligence</li>
                    <li>📊 Compliance-Driven Scanning</li>
                    <li>⚡ Real-Time Health & Threat Correlation</li>
                    <li>🔗 API & SIEM/RiskaVaire Integration Ready</li>
                  </ul>
                </div>
                <div className="victaa-download-footer">
                  <div className="victaa-download-size">Lightweight</div>
                  <button 
                    className="victaa-download-btn victaa-download-btn-outline victaa-download-btn-download" 
                    onClick={() => handleDownload('without AI')}
                    disabled={typeof downloadProgress['without AI'] === 'number'}
                  >
                    {typeof downloadProgress['without AI'] === 'number' ? (
                      <>
                        <span className="victaa-download-progress-text">Downloading... {downloadProgress['without AI']}%</span>
                        <div className="victaa-download-progress-bar">
                          <div 
                            className="victaa-download-progress-fill" 
                            style={{ width: `${downloadProgress['without AI'] || 0}%` }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="victaa-download-btn-text">Download ViCTAA Lite</span>
                        <span className="victaa-download-btn-icon">⬇</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="victaa-download-card featured">
                {/* <div className="victaa-download-featured-badge">Coming Soon</div> */}
                <div className="victaa-download-ai-badge">🤖 AI-Powered</div>
                <div className="victaa-download-header">
                  <h3>ViCTAA AI-Enhanced</h3>
                  <p className="victaa-download-description">ViCTAA Standard + Advanced AI Capabilities</p>
                </div>
                <div className="victaa-download-features">
                  <div className="victaa-download-features-section">
                    <div className="victaa-download-includes-standard">
                      <h4>Everything in ViCTAA Standard</h4>
                      
                    </div>
                    <div className="victaa-download-plus-divider">+</div>
                    <div className="victaa-download-ai-enhancement-card">
                      <h4>🤖 Advanced AI Threat Detection</h4>
                    </div>
                  </div>
                </div>
                <div className="victaa-download-footer">
                  <div className="victaa-download-size">Full Size</div>
                  <button 
                    className="victaa-download-btn victaa-download-btn-primary victaa-download-btn-download" 
                    onClick={() => handleDownload('with AI')}
                    disabled={typeof downloadProgress['with AI'] === 'number'}
                  >
                    {typeof downloadProgress['with AI'] === 'number' ? (
                      <>
                        <span className="victaa-download-progress-text">Downloading... {downloadProgress['with AI']}%</span>
                        <div className="victaa-download-progress-bar">
                          <div 
                            className="victaa-download-progress-fill" 
                            style={{ width: `${downloadProgress['with AI'] || 0}%` }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="victaa-download-btn-text">Download ViCTAA AI</span>
                        <span className="victaa-download-btn-icon">⬇</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>


          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LapsecPage; 