import React from "react";
import { Link } from "react-router-dom";
import "./Insurance.css";

// Import the insurance services image
import insuranceServicesImage from '../../../assets/Images/Products/GRC/insurance.webp';

// Import framework icons
import solvencyIcon from '../../../assets/Images/Products/GRC/SOLVENCY II.avif';
import naicIcon from '../../../assets/Images/Products/GRC/NAIC.jpg';
import gdprIcon from '../../../assets/Images/Products/GRC/GDPR logo.png';
import iddIcon from '../../../assets/Images/Products/GRC/IDD.jpg';
import orsaIcon from '../../../assets/Images/Products/GRC/ORSA.png';
import ifrsIcon from '../../../assets/Images/Products/GRC/IFRS logo.png';
import cyberIcon from '../../../assets/Images/Products/GRC/Cyber_security_frameworks logo.png';
import stateIcon from '../../../assets/Images/Products/GRC/GRCS.jpg';

// Import ROI icons
import fs1Icon from '../../../assets/Images/Products/GRC/fs-1 icon.png';
import fs2Icon from '../../../assets/Images/Products/GRC/fs-2 icon.png';
import fs3Icon from '../../../assets/Images/Products/GRC/fs-3 icon.png';

const Insurance = () => {
  // Framework ID mapping for navigation
  const getFrameworkId = (frameworkName) => {
    const mapping = {
      "Solvency II": "solvency2",
      "NAIC Model Laws": "naicmodels",
      "GDPR & Data Protection": "gdpr",
      "IDD (Insurance Distribution Directive)": "lodr",
      "ORSA (Own Risk and Solvency Assessment)": "orsa",
      "IFRS 17": "ifrs",
      "Cyber Security Frameworks": "cyberframeworks",
      "State Insurance Regulations": "stateinsurance"
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
      name: "Solvency II",
      icon: solvencyIcon
    },
    { 
      name: "NAIC Model Laws",
      icon: naicIcon
    },
    { 
      name: "GDPR & Data Protection",
      icon: gdprIcon
    },
    { 
      name: "IDD (Insurance Distribution Directive)",
      icon: iddIcon
    },
    { 
      name: "ORSA (Own Risk and Solvency Assessment)",
      icon: orsaIcon
    },
    { 
      name: "IFRS 17",
      icon: ifrsIcon
    },
    { 
      name: "Cyber Security Frameworks",
      icon: cyberIcon
    },
    { 
      name: "State Insurance Regulations",
      icon: stateIcon
    }
  ];

  const benefits = [
    {
      title: "Solvency Management",
      description: "Ensure compliance with Solvency II requirements including capital adequacy, risk-based assessments, and governance standards through automated calculations and reporting.",
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
      title: "Data Privacy Compliance",
      description: "Protect policyholder data against breaches and ransomware attacks while maintaining GDPR compliance through robust technical and administrative safeguards.",
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
      title: "Risk-Based Approach",
      description: "Implement comprehensive risk management covering underwriting, operational, cyber, and regulatory risks with real-time monitoring and assessment capabilities.",
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
      title: "Regulatory Reporting",
      description: "Streamline complex regulatory reporting requirements including QRTs (Quantitative Reporting Templates) and supervisory reporting with automated data aggregation.",
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
      title: "Operational Efficiency",
      description: "Automate compliance processes, reduce manual work, and enhance decision-making through integrated risk and compliance management.",
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
    <div className="ins-main-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="ins-breadcrumb">
        <nav className="ins-breadcrumb-nav">
          <ol className="ins-breadcrumb-list">
            <li className="ins-breadcrumb-item">
              <Link to="/" className="ins-breadcrumb-link">Our Products</Link>
            </li>
            <li className="ins-breadcrumb-separator">/</li>
            <li className="ins-breadcrumb-item">
              <Link to="/riskavaire" className="ins-breadcrumb-link">RiskaVaire</Link>
            </li>
            <li className="ins-breadcrumb-separator">/</li>
            <li className="ins-breadcrumb-item">
              <Link to="/solutions" className="ins-breadcrumb-link">Solutions</Link>
            </li>
            <li className="ins-breadcrumb-separator">/</li>
            <li className="ins-breadcrumb-item">
              <span className="ins-breadcrumb-current">Insurance</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section with Left-Right Layout */}
      <div className="ins-hero-container">
        {/* Left Side - Heading and Call to Action */}
        <div className="ins-hero-text-area">
          <h1 className="ins-hero-heading">RiskaVaire for Insurance</h1>
          <p className="ins-hero-subtitle">
            "Enhance Regulatory Compliance, Strengthen Risk Resilience, and Protect Policyholder Trust"
          </p>
          
          {/* Mobile Image - appears below subtitle on mobile */}
          <div className="ins-hero-image-area-mobile">
            <div className="ins-icon-wrapper">
              <img 
                src={insuranceServicesImage}
                alt="Insurance Services" 
                className="ins-hero-image"
              />
            </div>
          </div>
          
          <p className="ins-hero-description">
            Insurance companies face a complex regulatory landscape with evolving solvency requirements, data protection mandates, and cyber risk challenges. The industry's high susceptibility to regulatory changes and data breaches makes GRC solutions essential.
          </p>
          <button className="ins-hero-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>
        </div>
        
        {/* Button positioned separately for mobile grid layout */}
        <button className="ins-hero-button mobile-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>

        {/* Right Side - Insurance Services Image (Desktop only) */}
        <div className="ins-hero-image-area">
          <div className="ins-icon-wrapper">
            <img 
              src={insuranceServicesImage}
              alt="Insurance Services" 
              className="ins-hero-image"
            />
          </div>
        </div>
      </div>

      {/* Compliance Frameworks Section */}
      <div className="ins-frameworks-wrapper">
        <div className="ins-section-header">
          <h2 className="ins-section-title">Compliance Frameworks</h2>
        </div>
        
        <div className="ins-frameworks-grid">
          {frameworks.map((framework, index) => (
            <div 
              key={index} 
              className="ins-framework-item ins-framework-clickable"
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
              <div className="ins-framework-icon">
                <img 
                  src={framework.icon} 
                  alt={framework.name}
                  className="ins-framework-icon-image"
                />
              </div>
              <span className="ins-framework-text">{framework.name}</span>
            </div>
          ))}
        </div>
        
        <button className="ins-view-button" onClick={() => window.location.href = '/framework'}>View All Frameworks</button>
      </div>

      {/* Why GRC Solutions Section */}
      <div className="ins-benefits-wrapper">
        <div className="ins-section-header">
          <h2 className="ins-section-title">Why GRC Solutions Are Critical for Insurance</h2>
        </div>
        
        <div className="ins-intro-text">
          <p>
            Insurance companies face a complex regulatory landscape with evolving solvency requirements, data protection mandates, and cyber risk challenges. The industry's high susceptibility to regulatory changes and data breaches makes GRC solutions essential for:
          </p>
        </div>

        <div className="ins-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="ins-benefit-item" style={{backgroundColor: benefit.bgColor}}>
              <div className="ins-benefit-header">
                <div className="ins-benefit-icon" style={{backgroundColor: benefit.accentColor + '20'}}>
                  {benefit.icon}
                </div>
                <h3 className="ins-benefit-title" style={{color: benefit.accentColor}}>{benefit.title}</h3>
              </div>
              <p className="ins-benefit-description">{benefit.description}</p>
              <div className="ins-benefit-footer">
                <div className="ins-benefit-accent" style={{backgroundColor: benefit.accentColor}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Section - Program Outcomes */}
      <div className="ins-roi-wrapper">
        <div className="ins-roi-header">
          <h2 className="ins-roi-title">Insurance Industry</h2>
          <p className="ins-roi-subtitle">Measure Your Program Outcomes</p>
          <div className="ins-roi-underline"></div>
        </div>
        
        <div className="ins-roi-grid">
          <div className="ins-roi-item">
            <div className="ins-roi-icon">
              <img src={fs1Icon} alt="ROI Icon 1" />
            </div>
            <div className="ins-roi-percentage">75%</div>
            <div className="ins-roi-description">
              Improvement in regulatory reporting accuracy and compliance monitoring
            </div>
          </div>
          
          <div className="ins-roi-item">
            <div className="ins-roi-icon">
              <img src={fs2Icon} alt="ROI Icon 2" />
            </div>
            <div className="ins-roi-percentage">85%</div>
            <div className="ins-roi-description">
              Reduction in compliance processing time and manual errors
            </div>
          </div>
          
          <div className="ins-roi-item">
            <div className="ins-roi-icon">
              <img src={fs3Icon} alt="ROI Icon 3" />
            </div>
            <div className="ins-roi-percentage">70%</div>
            <div className="ins-roi-description">
              Decrease in risk assessment and monitoring time
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section - Call to Action */}
      <div className="ins-demo-wrapper">
        <div className="ins-demo-content">
          <h2 className="ins-demo-headline">
            RiskaVaire = Smarter GRC. Safer Enterprise. Simpler Compliance.
          </h2>
          <p className="ins-demo-subheadline">
            Ready to transform your compliance program?
          </p>
          <button className="ins-demo-button" onClick={() => window.location.href = '/contact#contact-form-section'}>
            <svg className="ins-demo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            BOOK YOUR DEMO NOW
          </button>
        </div>
        
        <div className="ins-demo-footer">
          <div className="ins-contact-info">
            <div className="ins-contact-item">
              <svg className="ins-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              info@vardaanglobal.com
            </div>
            <div className="ins-contact-item">
              <svg className="ins-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default Insurance;
