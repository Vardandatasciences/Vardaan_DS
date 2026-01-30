import React from "react";
import { Link } from "react-router-dom";
import "./Manufacturing.css";

// Import the manufacturing services image
import manufacturingServicesImage from '../../../assets/Images/Products/GRC/manufacturing.webp';

// Import framework icons
import iso9001Icon from '../../../assets/Images/Products/GRC/ISO_9001 icon.png';
import iso14001Icon from '../../../assets/Images/Products/GRC/ISO_14001 logo.png';
import oshaIcon from '../../../assets/Images/Products/GRC/OSHA icon.png';
import reachIcon from '../../../assets/Images/Products/GRC/REACH logo.png';
import epaIcon from '../../../assets/Images/Products/GRC/EPA-Environmental-Regulations icon.png';
import fdaIcon from '../../../assets/Images/Products/GRC/FDA_GMP icon.png';
import itarIcon from '../../../assets/Images/Products/GRC/ITAR icon.png';
import industryStandardsIcon from '../../../assets/Images/Products/GRC/ISO_9001 icon.png'; // Using ISO 9001 as placeholder for industry standards

// Import ROI icons
import fs1Icon from '../../../assets/Images/Products/GRC/fs-1 icon.png';
import fs2Icon from '../../../assets/Images/Products/GRC/fs-2 icon.png';
import fs3Icon from '../../../assets/Images/Products/GRC/fs-3 icon.png';

const Manufacturing = () => {
  // Framework ID mapping for navigation
  const getFrameworkId = (frameworkName) => {
    const mapping = {
      "ISO 9001 (Quality Management)": "iso9001",
      "OSHA (Occupational Safety and Health)": "osha",
      "FDA GMP (Good Manufacturing Practices)": "fdagmp",
      "EPA Environmental Regulations": "epa",
      "ISO 14001 (Environmental Management)": "iso14001",
      "ITAR (International Traffic in Arms Regulations)": "itar",
      "Industry-Specific Standards": "industrystandards"
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
      name: "ISO 9001 (Quality Management)",
      icon: iso9001Icon
    },
    { 
      name: "OSHA (Occupational Safety and Health)",
      icon: oshaIcon
    },
    { 
      name: "FDA GMP (Good Manufacturing Practices)",
      icon: fdaIcon
    },
    { 
      name: "EPA Environmental Regulations",
      icon: epaIcon
    },
    { 
      name: "ISO 14001 (Environmental Management)",
      icon: iso14001Icon
    },
    { 
      name: "ITAR (International Traffic in Arms Regulations)",
      icon: itarIcon
    },
    { 
      name: "Industry-Specific Standards",
      icon: industryStandardsIcon
    }
  ];

  const benefits = [
    {
      title: "Regulatory Compliance",
      description: "Navigate complex requirements from FDA, EPA, and OSHA while maintaining compliance across multiple jurisdictions and standards.",
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
      title: "Quality Management",
      description: "Implement and maintain ISO 9001 and GMP standards to ensure consistent product quality, reduce defects, and meet customer expectations.",
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
      title: "Safety Management",
      description: "Protect workers through comprehensive OSHA compliance, safety monitoring, and incident management systems.",
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
      title: "Environmental Compliance",
      description: "Meet EPA regulations for emissions, waste disposal, and environmental impact while supporting sustainability initiatives.",
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
      title: "Supply Chain Oversight",
      description: "Monitor supplier compliance, manage vendor risks, and ensure continuity across global supply chains.",
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
    <div className="mf-main-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="mf-breadcrumb">
        <nav className="mf-breadcrumb-nav">
          <ol className="mf-breadcrumb-list">
            <li className="mf-breadcrumb-item">
              <Link to="/" className="mf-breadcrumb-link">Our Products</Link>
            </li>
            <li className="mf-breadcrumb-separator">/</li>
            <li className="mf-breadcrumb-item">
              <Link to="/riskavaire" className="mf-breadcrumb-link">RiskaVaire</Link>
            </li>
            <li className="mf-breadcrumb-separator">/</li>
            <li className="mf-breadcrumb-item">
              <Link to="/solutions" className="mf-breadcrumb-link">Solutions</Link>
            </li>
            <li className="mf-breadcrumb-separator">/</li>
            <li className="mf-breadcrumb-item">
              <span className="mf-breadcrumb-current">Manufacturing</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section with Left-Right Layout */}
      <div className="mf-hero-container">
        {/* Left Side - Heading and Call to Action */}
        <div className="mf-hero-text-area">
          <h1 className="mf-hero-heading">RiskaVaire for Manufacturing</h1>
          <p className="mf-hero-subtitle">
            "Optimize Operational Efficiency, Ensure Safety Compliance, and Manage Supply Chain Risk"
          </p>
          
          {/* Mobile Image - appears below subtitle on mobile */}
          <div className="mf-hero-image-area-mobile">
            <div className="mf-icon-wrapper">
              <img 
                src={manufacturingServicesImage}
                alt="Manufacturing Services" 
                className="mf-hero-image"
              />
            </div>
          </div>
          
          <p className="mf-hero-description">
            Manufacturing organizations operate in highly regulated environments with stringent safety, quality, and environmental requirements. Non-compliance can result in costly recalls, legal action, and operational shutdowns, making GRC solutions critical.
          </p>
          <button className="mf-hero-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>
        </div>
        
        {/* Button positioned separately for mobile grid layout */}
        <button className="mf-hero-button mobile-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>

        {/* Right Side - Manufacturing Services Image (Desktop only) */}
        <div className="mf-hero-image-area">
          <div className="mf-icon-wrapper">
            <img 
              src={manufacturingServicesImage}
              alt="Manufacturing Services" 
              className="mf-hero-image"
            />
          </div>
        </div>
      </div>

      {/* Compliance Frameworks Section */}
      <div className="mf-frameworks-wrapper">
        <div className="mf-section-header">
          <h2 className="mf-section-title">Compliance Frameworks</h2>
        </div>
        
        <div className="mf-frameworks-grid">
          {frameworks.map((framework, index) => (
            <div 
              key={index} 
              className="mf-framework-item mf-framework-clickable"
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
              <div className="mf-framework-icon">
                <img src={framework.icon} alt={framework.name} />
              </div>
              <span className="mf-framework-text">{framework.name}</span>
            </div>
          ))}
        </div>
        
        <button className="mf-view-button" onClick={() => window.location.href = '/framework'}>View All Frameworks</button>
      </div>

      {/* Why GRC Solutions Section */}
      <div className="mf-benefits-wrapper">
        <div className="mf-section-header">
          <h2 className="mf-section-title">Why GRC Solutions Are Critical for Manufacturing</h2>
        </div>
        
        <div className="mf-intro-text">
          <p>
            Manufacturing organizations operate in highly regulated environments with stringent safety, quality, and environmental requirements. Non-compliance can result in costly recalls, legal action, and operational shutdowns, making GRC solutions critical for:
          </p>
        </div>

        <div className="mf-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="mf-benefit-item" style={{backgroundColor: benefit.bgColor}}>
              <div className="mf-benefit-header">
                <div className="mf-benefit-icon" style={{backgroundColor: benefit.accentColor + '20'}}>
                  {benefit.icon}
                </div>
                <h3 className="mf-benefit-title" style={{color: benefit.accentColor}}>{benefit.title}</h3>
              </div>
              <p className="mf-benefit-description">{benefit.description}</p>
              <div className="mf-benefit-footer">
                <div className="mf-benefit-accent" style={{backgroundColor: benefit.accentColor}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Section - Program Outcomes */}
      <div className="mf-roi-wrapper">
        <div className="mf-roi-header">
          <h2 className="mf-roi-title">Manufacturing Industry</h2>
          <p className="mf-roi-subtitle">Measure Your Program Outcomes</p>
          <div className="mf-roi-underline"></div>
        </div>
        
        <div className="mf-roi-grid">
          <div className="mf-roi-item">
            <div className="mf-roi-icon">
              <img src={fs1Icon} alt="ROI Icon 1" />
            </div>
            <div className="mf-roi-percentage">85%</div>
            <div className="mf-roi-description">
              Reduction in compliance violations and regulatory fines
            </div>
          </div>
          
          <div className="mf-roi-item">
            <div className="mf-roi-icon">
              <img src={fs2Icon} alt="ROI Icon 2" />
            </div>
            <div className="mf-roi-percentage">70%</div>
            <div className="mf-roi-description">
              Decrease in audit preparation time and compliance costs
            </div>
          </div>
          
          <div className="mf-roi-item">
            <div className="mf-roi-icon">
              <img src={fs3Icon} alt="ROI Icon 3" />
            </div>
            <div className="mf-roi-percentage">75%</div>
            <div className="mf-roi-description">
              Improvement in supply chain risk visibility and management
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section - Call to Action */}
      <div className="mf-demo-wrapper">
        <div className="mf-demo-content">
          <h2 className="mf-demo-headline">
            RiskaVaire = Smarter GRC. Safer Enterprise. Simpler Compliance.
          </h2>
          <p className="mf-demo-subheadline">
            Ready to transform your compliance program?
          </p>
          <button className="mf-demo-button" onClick={() => window.location.href = '/contact#contact-form-section'}>
            <svg className="mf-demo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            BOOK YOUR DEMO NOW
          </button>
        </div>
        
        <div className="mf-demo-footer">
          <div className="mf-contact-info">
            <div className="mf-contact-item">
              <svg className="mf-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              info@vardaanglobal.com
            </div>
            <div className="mf-contact-item">
              <svg className="mf-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default Manufacturing;
