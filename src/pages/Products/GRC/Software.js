import React from "react";
import { Link } from "react-router-dom";
import "./Software.css";

// Import the software services image
import softwareServicesImage from '../../../assets/Images/Products/GRC/software.jpg';

// Import framework icons
import soc2Icon from '../../../assets/Images/Products/GRC/SOC_2 icon.png';
import iso27001Icon from '../../../assets/Images/Products/GRC/ISO_27001 logo.png';
import gdprIcon from '../../../assets/Images/Products/GRC/GDPR logo.png';
import ccpaIcon from '../../../assets/Images/Products/GRC/CCPA logo.png';
import nistIcon from '../../../assets/Images/Products/GRC/NIST-Cybersecurity-Framework.png';
import fedrampIcon from '../../../assets/Images/Products/GRC/FedRAMP icon.png';
import industrySpecificIcon from '../../../assets/Images/Products/GRC/Industry-Specific icon.png';
import exportControlIcon from '../../../assets/Images/Products/GRC/ISO_9001 icon.png'; // Using ISO 9001 as placeholder for export control

// Import ROI icons
import fs1Icon from '../../../assets/Images/Products/GRC/fs-1 icon.png';
import fs2Icon from '../../../assets/Images/Products/GRC/fs-2 icon.png';
import fs3Icon from '../../../assets/Images/Products/GRC/fs-3 icon.png';

const Software = () => {
  // Framework ID mapping for navigation
  const getFrameworkId = (frameworkName) => {
    const mapping = {
      "SOC 2 (Service Organization Control)": "soc2",
      "ISO 27001 (Information Security Management)": "iso27001",
      "GDPR & Global Privacy Laws": "gdpr",
      "CCPA (California Consumer Privacy Act)": "ccpa",
      "NIST Cybersecurity Framework": "nist800",
      "FedRAMP (for government clients)": "fedramp",
      "Industry-Specific Certifications": "indcerts",
      "Export Administration Regulations": "ear"
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
      name: "SOC 2 (Service Organization Control)",
      icon: soc2Icon
    },
    { 
      name: "ISO 27001 (Information Security Management)",
      icon: iso27001Icon
    },
    { 
      name: "GDPR & Global Privacy Laws",
      icon: gdprIcon
    },
    { 
      name: "CCPA (California Consumer Privacy Act)",
      icon: ccpaIcon
    },
    { 
      name: "NIST Cybersecurity Framework",
      icon: nistIcon
    },
    { 
      name: "FedRAMP (for government clients)",
      icon: fedrampIcon
    },
    { 
      name: "Industry-Specific Certifications",
      icon: industrySpecificIcon
    },
    { 
      name: "Export Administration Regulations",
      icon: exportControlIcon
    }
  ];

  const benefits = [
    {
      title: "Security Certification",
      description: "Achieve and maintain SOC 2, ISO 27001, and other critical certifications required by enterprise customers through automated control monitoring and evidence collection.",
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
      description: "Ensure compliance with GDPR, CCPA, and emerging global privacy regulations while supporting international business expansion.",
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
      title: "Cybersecurity Management",
      description: "Implement robust cybersecurity controls, continuous monitoring, and incident response capabilities to protect against evolving threats.",
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
      title: "Vendor Risk Management",
      description: "Assess and monitor third-party risks across the technology stack, including cloud providers, APIs, and software dependencies.",
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
      title: "Scalable Compliance",
      description: "Support rapid growth and product development through automated compliance processes that scale with business expansion.",
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
    <div className="sw-main-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="sw-breadcrumb">
        <nav className="sw-breadcrumb-nav">
          <ol className="sw-breadcrumb-list">
            <li className="sw-breadcrumb-item">
              <Link to="/" className="sw-breadcrumb-link">Our Products</Link>
            </li>
            <li className="sw-breadcrumb-separator">/</li>
            <li className="sw-breadcrumb-item">
              <Link to="/riskavaire" className="sw-breadcrumb-link">RiskaVaire</Link>
            </li>
            <li className="sw-breadcrumb-separator">/</li>
            <li className="sw-breadcrumb-item">
              <Link to="/solutions" className="sw-breadcrumb-link">Solutions</Link>
            </li>
            <li className="sw-breadcrumb-separator">/</li>
            <li className="sw-breadcrumb-item">
              <span className="sw-breadcrumb-current">Software & Technology</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section with Left-Right Layout */}
      <div className="sw-hero-container">
        {/* Left Side - Heading and Call to Action */}
        <div className="sw-hero-text-area">
          <h1 className="sw-hero-heading">RiskaVaire for Software & Technology</h1>
          <p className="sw-hero-subtitle">
            "Accelerate Secure Innovation, Ensure Data Privacy, and Scale Compliance"
          </p>
          
          {/* Mobile Image - appears below subtitle on mobile */}
          <div className="sw-hero-image-area-mobile">
            <div className="sw-icon-wrapper">
              <img 
                src={softwareServicesImage}
                alt="Software & Technology Services" 
                className="sw-hero-image"
              />
            </div>
          </div>
          
          <p className="sw-hero-description">
            Technology companies face rapidly evolving cybersecurity threats, complex data privacy regulations, and the need to demonstrate security to customers and partners. With 43% of cyberattacks targeting SMBs, comprehensive GRC solutions are essential.
          </p>
          <button className="sw-hero-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>
        </div>
        
        {/* Button positioned separately for mobile grid layout */}
        <button className="sw-hero-button mobile-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>

        {/* Right Side - Software Services Image (Desktop only) */}
        <div className="sw-hero-image-area">
          <div className="sw-icon-wrapper">
            <img 
              src={softwareServicesImage}
              alt="Software & Technology Services" 
              className="sw-hero-image"
            />
          </div>
        </div>
      </div>

      {/* Compliance Frameworks Section */}
      <div className="sw-frameworks-wrapper">
        <div className="sw-section-header">
          <h2 className="sw-section-title">Compliance Frameworks</h2>
        </div>
        
        <div className="sw-frameworks-grid">
          {frameworks.map((framework, index) => (
            <div 
              key={index} 
              className="sw-framework-item sw-framework-clickable"
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
              <div className="sw-framework-icon">
                <img src={framework.icon} alt={framework.name} className="sw-framework-icon-img" />
              </div>
              <span className="sw-framework-text">{framework.name}</span>
            </div>
          ))}
        </div>
        
        <button className="sw-view-button" onClick={() => window.location.href = '/framework'}>View All Frameworks</button>
      </div>

      {/* Why GRC Solutions Section */}
      <div className="sw-benefits-wrapper">
        <div className="sw-section-header">
          <h2 className="sw-section-title">Why GRC Solutions Are Critical for Software & Technology</h2>
        </div>
        
        <div className="sw-intro-text">
          <p>
            Technology companies face rapidly evolving cybersecurity threats, complex data privacy regulations, and the need to demonstrate security to customers and partners. With 43% of cyberattacks targeting SMBs, comprehensive GRC solutions are essential for:
          </p>
        </div>

        <div className="sw-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="sw-benefit-item" style={{backgroundColor: benefit.bgColor}}>
              <div className="sw-benefit-header">
                <div className="sw-benefit-icon" style={{backgroundColor: benefit.accentColor + '20'}}>
                  {benefit.icon}
                </div>
                <h3 className="sw-benefit-title" style={{color: benefit.accentColor}}>{benefit.title}</h3>
              </div>
              <p className="sw-benefit-description">{benefit.description}</p>
              <div className="sw-benefit-footer">
                <div className="sw-benefit-accent" style={{backgroundColor: benefit.accentColor}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Section - Program Outcomes */}
      <div className="sw-roi-wrapper">
        <div className="sw-roi-header">
          <h2 className="sw-roi-title">Software & Technology Industry</h2>
          <p className="sw-roi-subtitle">Measure Your Program Outcomes</p>
          <div className="sw-roi-underline"></div>
        </div>
        
        <div className="sw-roi-grid">
          <div className="sw-roi-item">
            <div className="sw-roi-icon">
              <img src={fs1Icon} alt="ROI Icon 1" />
            </div>
            <div className="sw-roi-percentage">90%</div>
            <div className="sw-roi-description">
              Reduction in compliance audit preparation time and certification costs
            </div>
          </div>
          
          <div className="sw-roi-item">
            <div className="sw-roi-icon">
              <img src={fs2Icon} alt="ROI Icon 2" />
            </div>
            <div className="sw-roi-percentage">80%</div>
            <div className="sw-roi-description">
              Decrease in security incidents and data breach risks
            </div>
          </div>
          
          <div className="sw-roi-item">
            <div className="sw-roi-icon">
              <img src={fs3Icon} alt="ROI Icon 3" />
            </div>
            <div className="sw-roi-percentage">75%</div>
            <div className="sw-roi-description">
              Improvement in customer trust and competitive advantage
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section - Call to Action */}
      <div className="sw-demo-wrapper">
        <div className="sw-demo-content">
          <h2 className="sw-demo-headline">
            RiskaVaire = Smarter GRC. Safer Enterprise. Simpler Compliance.
          </h2>
          <p className="sw-demo-subheadline">
            Ready to transform your compliance program?
          </p>
          <button className="sw-demo-button" onClick={() => window.location.href = '/contact#contact-form-section'}>
            <svg className="sw-demo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            BOOK YOUR DEMO NOW
          </button>
        </div>
        
        <div className="sw-demo-footer">
          <div className="sw-contact-info">
            <div className="sw-contact-item">
              <svg className="sw-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              info@vardaanglobal.com
            </div>
            <div className="sw-contact-item">
              <svg className="sw-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default Software;
