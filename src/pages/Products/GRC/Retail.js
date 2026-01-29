import React from "react";
import { Link } from "react-router-dom";
import "./Retail.css";

// Import the retail services image
import retailServicesImage from '../../../assets/Images/Products/GRC/retail.jpeg';

// Import framework icons
import pciIcon from '../../../assets/Images/Products/GRC/PCI-DSS logo.png';
import gdprIcon from '../../../assets/Images/Products/GRC/GDPR logo.png';
import ccpaIcon from '../../../assets/Images/Products/GRC/CCPA logo.png';
import soxIcon from '../../../assets/Images/Products/GRC/SOX logo.png';
import nistIcon from '../../../assets/Images/Products/GRC/NIST 800 logo.png';
import iso27001Icon from '../../../assets/Images/Products/GRC/ISO_27001 logo.png';
import reachIcon from '../../../assets/Images/Products/GRC/REACH logo.png';
import iso14001Icon from '../../../assets/Images/Products/GRC/ISO_14001 logo.png';

// Import ROI icons
import fs1Icon from '../../../assets/Images/Products/GRC/fs-1 icon.png';
import fs2Icon from '../../../assets/Images/Products/GRC/fs-2 icon.png';
import fs3Icon from '../../../assets/Images/Products/GRC/fs-3 icon.png';

const Retail = () => {
  // Framework ID mapping for navigation
  const getFrameworkId = (frameworkName) => {
    const mapping = {
      "PCI DSS": "pci",
      "GDPR & CCPA": "gdpr",
      "CCPA Compliance": "ccpa",
      "SOX (for public companies)": "sox",
      "NIST Cybersecurity Framework": "nist800",
      "ISO 27001": "iso27001",
      "REACH Regulations": "reach",
      "ISO 14001 Environmental": "iso14001"
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
      name: "PCI DSS",
      icon: pciIcon
    },
    { 
      name: "GDPR & CCPA",
      icon: gdprIcon
    },
    { 
      name: "CCPA Compliance",
      icon: ccpaIcon
    },
    { 
      name: "SOX (for public companies)",
      icon: soxIcon
    },
    { 
      name: "NIST Cybersecurity Framework",
      icon: nistIcon
    },
    { 
      name: "ISO 27001",
      icon: iso27001Icon
    },
    { 
      name: "REACH Regulations",
      icon: reachIcon
    },
    { 
      name: "ISO 14001 Environmental",
      icon: iso14001Icon
    }
  ];

  const benefits = [
    {
      title: "Payment Card Security",
      description: "Ensure PCI DSS compliance across all payment processing systems, reduce fraud risk, and protect customer payment data through comprehensive security controls.",
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
      title: "Data Privacy Management",
      description: "Maintain compliance with GDPR, CCPA, and other data protection regulations while managing customer data across omnichannel operations.",
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
      title: "Supply Chain Risk Management",
      description: "Monitor and assess third-party vendors, suppliers, and logistics partners to prevent disruptions and ensure ethical sourcing practices.",
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
      title: "Consumer Protection",
      description: "Implement controls to meet consumer protection laws, product safety standards, and advertising regulations across all retail channels.",
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
      title: "Operational Resilience",
      description: "Build resilience against cyber attacks, supply chain disruptions, and seasonal fluctuations through integrated risk management and business continuity planning.",
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
    <div className="ret-main-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="ret-breadcrumb">
        <nav className="ret-breadcrumb-nav">
          <ol className="ret-breadcrumb-list">
            <li className="ret-breadcrumb-item">
              <Link to="/" className="ret-breadcrumb-link">Our Products</Link>
            </li>
            <li className="ret-breadcrumb-separator">/</li>
            <li className="ret-breadcrumb-item">
              <Link to="/riskavaire" className="ret-breadcrumb-link">RiskaVaire</Link>
            </li>
            <li className="ret-breadcrumb-separator">/</li>
            <li className="ret-breadcrumb-item">
              <Link to="/solutions" className="ret-breadcrumb-link">Solutions</Link>
            </li>
            <li className="ret-breadcrumb-separator">/</li>
            <li className="ret-breadcrumb-item">
              <span className="ret-breadcrumb-current">Retail</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section with Left-Right Layout */}
      <div className="ret-hero-container">
        {/* Left Side - Heading and Call to Action */}
        <div className="ret-hero-text-area">
          <h1 className="ret-hero-heading">RiskaVaire for Retail</h1>
          <p className="ret-hero-subtitle">
            "Secure Customer Data, Ensure Payment Compliance, and Strengthen Operational Resilience"
          </p>
          
          {/* Mobile Image - appears below subtitle on mobile */}
          <div className="ret-hero-image-area-mobile">
            <div className="ret-icon-wrapper">
              <img 
                src={retailServicesImage}
                alt="Retail Services" 
                className="ret-hero-image"
              />
            </div>
          </div>
          
          <p className="ret-hero-description">
            Retail organizations face escalating cybersecurity threats, complex data privacy regulations, and supply chain risks that can result in significant financial penalties and reputational damage. With data breaches costing an average of $4.45 million per incident, GRC solutions are vital.
          </p>
          <button className="ret-hero-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>
        </div>
        
        {/* Button positioned separately for mobile grid layout */}
        <button className="ret-hero-button mobile-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>

        {/* Right Side - Retail Services Image (Desktop only) */}
        <div className="ret-hero-image-area">
          <div className="ret-icon-wrapper">
            <img 
              src={retailServicesImage}
              alt="Retail Services" 
              className="ret-hero-image"
            />
          </div>
        </div>
      </div>

      {/* Compliance Frameworks Section */}
      <div className="ret-frameworks-wrapper">
        <div className="ret-section-header">
          <h2 className="ret-section-title">Compliance Frameworks</h2>
        </div>
        
        <div className="ret-frameworks-grid">
          {frameworks.map((framework, index) => (
            <div 
              key={index} 
              className="ret-framework-item ret-framework-clickable"
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
              <div className="ret-framework-icon">
                <img 
                  src={framework.icon} 
                  alt={framework.name}
                  className="ret-framework-icon-image"
                />
              </div>
              <span className="ret-framework-text">{framework.name}</span>
            </div>
          ))}
        </div>
        
        <button className="ret-view-button" onClick={() => window.location.href = '/framework'}>View All Frameworks</button>
      </div>

      {/* Why GRC Solutions Section */}
      <div className="ret-benefits-wrapper">
        <div className="ret-section-header">
          <h2 className="ret-section-title">Why GRC Solutions Are Critical for Retail</h2>
        </div>
        
        <div className="ret-intro-text">
          <p>
            Retail organizations face escalating cybersecurity threats, complex data privacy regulations, and supply chain risks that can result in significant financial penalties and reputational damage. With data breaches costing an average of $4.45 million per incident, GRC solutions are vital for:
          </p>
        </div>

        <div className="ret-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="ret-benefit-item" style={{backgroundColor: benefit.bgColor}}>
              <div className="ret-benefit-header">
                <div className="ret-benefit-icon" style={{backgroundColor: benefit.accentColor + '20'}}>
                  {benefit.icon}
                </div>
                <h3 className="ret-benefit-title" style={{color: benefit.accentColor}}>{benefit.title}</h3>
              </div>
              <p className="ret-benefit-description">{benefit.description}</p>
              <div className="ret-benefit-footer">
                <div className="ret-benefit-accent" style={{backgroundColor: benefit.accentColor}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Section - Program Outcomes */}
      <div className="ret-roi-wrapper">
        <div className="ret-roi-header">
          <h2 className="ret-roi-title">Retail Industry</h2>
          <p className="ret-roi-subtitle">Measure Your Program Outcomes</p>
          <div className="ret-roi-underline"></div>
        </div>
        
        <div className="ret-roi-grid">
          <div className="ret-roi-item">
            <div className="ret-roi-icon">
              <img src={fs1Icon} alt="ROI Icon 1" />
            </div>
            <div className="ret-roi-percentage">80%</div>
            <div className="ret-roi-description">
              Reduction in payment fraud incidents and PCI DSS compliance violations
            </div>
          </div>
          
          <div className="ret-roi-item">
            <div className="ret-roi-icon">
              <img src={fs2Icon} alt="ROI Icon 2" />
            </div>
            <div className="ret-roi-percentage">70%</div>
            <div className="ret-roi-description">
              Decrease in data breach costs and regulatory fines
            </div>
          </div>
          
          <div className="ret-roi-item">
            <div className="ret-roi-icon">
              <img src={fs3Icon} alt="ROI Icon 3" />
            </div>
            <div className="ret-roi-percentage">65%</div>
            <div className="ret-roi-description">
              Improvement in supply chain risk visibility and management
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section - Call to Action */}
      <div className="ret-demo-wrapper">
        <div className="ret-demo-content">
          <h2 className="ret-demo-headline">
            RiskaVaire = Smarter GRC. Safer Enterprise. Simpler Compliance.
          </h2>
          <p className="ret-demo-subheadline">
            Ready to transform your compliance program?
          </p>
          <button className="ret-demo-button" onClick={() => window.location.href = '/contact#contact-form-section'}>
            <svg className="ret-demo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            BOOK YOUR DEMO NOW
          </button>
        </div>
        
        <div className="ret-demo-footer">
          <div className="ret-contact-info">
            <div className="ret-contact-item">
              <svg className="ret-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              info@vardaanglobal.com
            </div>
            <div className="ret-contact-item">
              <svg className="ret-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default Retail;
