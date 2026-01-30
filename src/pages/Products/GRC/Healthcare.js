import React from "react";
import { Link } from "react-router-dom";
import "./Healthcare.css";

// Import the healthcare services image
import healthcareServicesImage from '../../../assets/Images/Products/GRC/healthcare.jpg';

// Import framework icons
import hipaaIcon from '../../../assets/Images/Products/GRC/HIPAA logo.png';
import hitechIcon from '../../../assets/Images/Products/GRC/HITECH-Act logo.png';
import hitrustIcon from '../../../assets/Images/Products/GRC/HITRUST-CSF logo.png';
import gdprIcon from '../../../assets/Images/Products/GRC/GDPR logo.png';
import fdaIcon from '../../../assets/Images/Products/GRC/FDA-21-CFR logo.png';
import nistIcon from '../../../assets/Images/Products/GRC/NIST-Cybersecurity-Framework.png';
import statePrivacyIcon from '../../../assets/Images/Products/GRC/State-Privacy-Laws.png';
import jointCommissionIcon from '../../../assets/Images/Products/GRC/Joint-Commission-Standards.jpg';

// Import ROI icons
import fs1Icon from '../../../assets/Images/Products/GRC/fs-1 icon.png';
import fs2Icon from '../../../assets/Images/Products/GRC/fs-2 icon.png';
import fs3Icon from '../../../assets/Images/Products/GRC/fs-3 icon.png';

const Healthcare = () => {
  // Framework ID mapping for navigation
  const getFrameworkId = (frameworkName) => {
    const mapping = {
      "HIPAA (Health Insurance Portability and Accountability Act)": "hipaa",
      "HITECH Act": "hitech",
      "HITRUST CSF": "hitrust",
      "GDPR (for EU operations)": "gdpr",
      "FDA 21 CFR Part 820 (QSR)": "fda820",
      "NIST Cybersecurity Framework": "nist800",
      "State Privacy Laws": "stateprivacy",
      "Joint Commission Standards": "jointcommission"
    };
    return mapping[frameworkName] || null;
  };

  const handleFrameworkClick = (frameworkName) => {
    const frameworkId = getFrameworkId(frameworkName);
    if (frameworkId) {
      window.location.href = `/framework/${frameworkId}`;
    }
  };

  const frameworks = [
    { 
      name: "HIPAA (Health Insurance Portability and Accountability Act)",
      icon: hipaaIcon
    },
    { 
      name: "HITECH Act",
      icon: hitechIcon
    },
    { 
      name: "HITRUST CSF",
      icon: hitrustIcon
    },
    { 
      name: "GDPR (for EU operations)",
      icon: gdprIcon
    },
    { 
      name: "FDA 21 CFR Part 820 (QSR)",
      icon: fdaIcon
    },
    { 
      name: "NIST Cybersecurity Framework",
      icon: nistIcon
    },
    { 
      name: "State Privacy Laws",
      icon: statePrivacyIcon
    },
    { 
      name: "Joint Commission Standards",
      icon: jointCommissionIcon
    }
  ];

  const benefits = [
    {
      title: "HIPAA Compliance",
      description: "Ensure comprehensive protection of electronic Protected Health Information (ePHI) through administrative, physical, and technical safeguards mandated by HIPAA Security Rule.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7V10C2 20 12 22 12 22C12 22 22 20 22 10V7L12 2Z" fill="#1e40af"/>
          <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bgColor: "white",
      accentColor: "#1e40af"
    },
    {
      title: "Cybersecurity Protection",
      description: "Defend against ransomware, data breaches, and cyber attacks targeting healthcare systems through continuous monitoring and incident response capabilities.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="#1e40af"/>
          <path d="M16 2V6M8 2V6M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="15" r="2" fill="white"/>
        </svg>
      ),
      bgColor: "white",
      accentColor: "#1e40af"
    },
    {
      title: "Medical Device Security",
      description: "Maintain compliance with FDA regulations for medical devices and ensure cybersecurity throughout the device lifecycle.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="11" width="14" height="10" rx="2" ry="2" fill="#1e40af"/>
          <circle cx="12" cy="16" r="1" fill="white"/>
          <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="#1e40af" strokeWidth="2"/>
        </svg>
      ),
      bgColor: "white",
      accentColor: "#1e40af"
    },
    {
      title: "Business Continuity",
      description: "Ensure uninterrupted patient care through robust business continuity planning and operational resilience management.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" fill="#1e40af"/>
          <circle cx="9" cy="7" r="4" fill="#1e40af"/>
          <path d="M23 21V19C23 16.7909 21.2091 15 19 15C18.1013 15 17.2797 15.3188 16.6364 15.8506" stroke="#1e40af" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="16" cy="7" r="4" stroke="#1e40af" strokeWidth="2" fill="white"/>
        </svg>
      ),
      bgColor: "white",
      accentColor: "#1e40af"
    },
    {
      title: "Audit Readiness",
      description: "Streamline compliance audits and regulatory inspections through centralized documentation, automated evidence collection, and real-time compliance monitoring.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#1e40af"/>
          <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9L12 6L15 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bgColor: "white",
      accentColor: "#1e40af"
    }
  ];

  return (
    <div className="hc-main-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="hc-breadcrumb">
        <nav className="hc-breadcrumb-nav">
          <ol className="hc-breadcrumb-list">
            <li className="hc-breadcrumb-item">
              <Link to="/" className="hc-breadcrumb-link">Our Products</Link>
            </li>
            <li className="hc-breadcrumb-separator">/</li>
            <li className="hc-breadcrumb-item">
              <Link to="/riskavaire" className="hc-breadcrumb-link">RiskaVaire</Link>
            </li>
            <li className="hc-breadcrumb-separator">/</li>
            <li className="hc-breadcrumb-item">
              <Link to="/solutions" className="hc-breadcrumb-link">Solutions</Link>
            </li>
            <li className="hc-breadcrumb-separator">/</li>
            <li className="hc-breadcrumb-item">
              <span className="hc-breadcrumb-current">Healthcare</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section with Left-Right Layout */}
      <div className="hc-hero-container">
        {/* Left Side - Heading and Call to Action */}
        <div className="hc-hero-text-area">
          <h1 className="hc-hero-heading">RiskaVaire for Healthcare</h1>
          <p className="hc-hero-subtitle">
            "Protect Patient Data, Ensure HIPAA Compliance, and Strengthen Healthcare Security"
          </p>
          
          {/* Mobile Image - appears below subtitle on mobile */}
          <div className="hc-hero-image-area-mobile">
            <div className="hc-icon-wrapper">
              <img 
                src={healthcareServicesImage}
                alt="Healthcare Services" 
                className="hc-hero-image"
              />
            </div>
          </div>
          
          <p className="hc-hero-description">
            Healthcare organizations face increasing cyber threats, strict patient data protection requirements, and complex regulatory oversight. With healthcare data breaches affecting over 1.7 billion individuals in 2024, implementing robust GRC solutions is essential.
          </p>
          <button className="hc-hero-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>
        </div>
        
        {/* Button positioned separately for mobile grid layout */}
        <button className="hc-hero-button mobile-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>

        {/* Right Side - Healthcare Services Image (Desktop only) */}
        <div className="hc-hero-image-area">
          <div className="hc-icon-wrapper">
            <img 
              src={healthcareServicesImage}
              alt="Healthcare Services" 
              className="hc-hero-image"
            />
          </div>
        </div>
      </div>

      {/* Compliance Frameworks Section */}
      <div className="hc-frameworks-wrapper">
        <div className="hc-section-header">
          <h2 className="hc-section-title">Compliance Frameworks</h2>
        </div>
        
        <div className="hc-frameworks-grid">
          {frameworks.map((framework, index) => (
            <div 
              key={index} 
              className="hc-framework-item hc-framework-clickable"
              onClick={() => handleFrameworkClick(framework.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFrameworkClick(framework.name);
                }
              }}
            >
              <div className="hc-framework-icon">
                <img src={framework.icon} alt={framework.name} className="hc-framework-logo" />
              </div>
              <span className="hc-framework-text">{framework.name}</span>
            </div>
          ))}
        </div>
        
        <button className="hc-view-button" onClick={() => window.location.href = '/framework'}>View All Frameworks</button>
      </div>

      {/* Why GRC Solutions Section */}
      <div className="hc-benefits-wrapper">
        <div className="hc-section-header">
          <h2 className="hc-section-title">Why GRC Solutions Are Critical for Healthcare</h2>
        </div>
        
        <div className="hc-intro-text">
          <p>
            Healthcare organizations face increasing cyber threats, strict patient data protection requirements, and complex regulatory oversight. With healthcare data breaches affecting over 1.7 billion individuals in 2024, implementing robust GRC solutions is essential for:
          </p>
        </div>

        <div className="hc-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="hc-benefit-item" style={{backgroundColor: benefit.bgColor}}>
              <div className="hc-benefit-header">
                <div className="hc-benefit-icon" style={{backgroundColor: benefit.accentColor + '20'}}>
                  {benefit.icon}
                </div>
                <h3 className="hc-benefit-title" style={{color: benefit.accentColor}}>{benefit.title}</h3>
              </div>
              <p className="hc-benefit-description">{benefit.description}</p>
              <div className="hc-benefit-footer">
                <div className="hc-benefit-accent" style={{backgroundColor: benefit.accentColor}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Section - Program Outcomes */}
      <div className="hc-roi-wrapper">
        <div className="hc-roi-header">
          <h2 className="hc-roi-title">Healthcare Industry</h2>
          <p className="hc-roi-subtitle">Measure Your Program Outcomes</p>
          <div className="hc-roi-underline"></div>
        </div>
        
        <div className="hc-roi-grid">
          <div className="hc-roi-item">
            <div className="hc-roi-icon">
              <img src={fs1Icon} alt="ROI Icon 1" />
            </div>
            <div className="hc-roi-percentage">90%</div>
            <div className="hc-roi-description">
              Reduction in HIPAA violations and patient data breach incidents
            </div>
          </div>
          
          <div className="hc-roi-item">
            <div className="hc-roi-icon">
              <img src={fs2Icon} alt="ROI Icon 2" />
            </div>
            <div className="hc-roi-percentage">75%</div>
            <div className="hc-roi-description">
              Decrease in audit preparation time and compliance costs
            </div>
          </div>
          
          <div className="hc-roi-item">
            <div className="hc-roi-icon">
              <img src={fs3Icon} alt="ROI Icon 3" />
            </div>
            <div className="hc-roi-percentage">80%</div>
            <div className="hc-roi-description">
              Improvement in medical device security and FDA compliance
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section - Call to Action */}
      <div className="hc-demo-wrapper">
        <div className="hc-demo-content">
          <h2 className="hc-demo-headline">
            RiskaVaire = Smarter GRC. Safer Enterprise. Simpler Compliance.
          </h2>
          <p className="hc-demo-subheadline">
            Ready to transform your compliance program?
          </p>
          <button className="hc-demo-button" onClick={() => window.location.href = '/contact#contact-form-section'}>
            <svg className="hc-demo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            BOOK YOUR DEMO NOW
          </button>
        </div>
        
        <div className="hc-demo-footer">
          <div className="hc-contact-info">
            <div className="hc-contact-item">
              <svg className="hc-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              info@vardaanglobal.com
            </div>
            <div className="hc-contact-item">
              <svg className="hc-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 12h20" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              https://vardaanglobal.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Healthcare;
