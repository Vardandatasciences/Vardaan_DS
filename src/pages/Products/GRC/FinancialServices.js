import React from "react";
import { Link } from "react-router-dom";
import "./FinancialServices.css";

// Import the financial services image
import financialServicesImage from '../../../assets/Images/Products/GRC/financial-services.jpg';

// Import framework icons
import soxIcon from '../../../assets/Images/Products/GRC/SOX logo.png';
import baselIcon from '../../../assets/Images/Products/GRC/Basel_III-removebg-preview.png';
import pciIcon from '../../../assets/Images/Products/GRC/PCI-DSS logo.png';
import gdprIcon from '../../../assets/Images/Products/GRC/GDPR logo.png';
import nydfsIcon from '../../../assets/Images/Products/GRC/NYDFS.jpg';
import amlIcon from '../../../assets/Images/Products/GRC/AML.png';
import doddFrankIcon from '../../../assets/Images/Products/GRC/DODD-Frank logo.png';
import ffiecIcon from '../../../assets/Images/Products/GRC/FFIEC logo.png';

// Import ROI icons
import fs1Icon from '../../../assets/Images/Products/GRC/fs-1 icon.png';
import fs2Icon from '../../../assets/Images/Products/GRC/fs-2 icon.png';
import fs3Icon from '../../../assets/Images/Products/GRC/fs-3 icon.png';

const FinancialServices = () => {
  // Framework ID mapping for navigation
  const getFrameworkId = (frameworkName) => {
    const mapping = {
      "SOX (Sarbanes-Oxley Act)": "sox",
      "Basel III": "basel3",
      "PCI DSS": "pci",
      "GDPR & Data Privacy": "gdpr",
      "NYDFS Cybersecurity Regulation": "nydfs500",
      "Anti-Money Laundering (AML)": "aml",
      "Dodd-Frank Act": "doddfrank",
      "FFIEC Guidelines": "ffiec"
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
      name: "SOX (Sarbanes-Oxley Act)",
      icon: soxIcon
    },
    { 
      name: "Basel III",
      icon: baselIcon
    },
    { 
      name: "PCI DSS",
      icon: pciIcon
    },
    { 
      name: "GDPR & Data Privacy",
      icon: gdprIcon
    },
    { 
      name: "NYDFS Cybersecurity Regulation",
      icon: nydfsIcon
    },
    { 
      name: "Anti-Money Laundering (AML)",
      icon: amlIcon
    },
    { 
      name: "Dodd-Frank Act",
      icon: doddFrankIcon
    },
    { 
      name: "FFIEC Guidelines",
      icon: ffiecIcon
    }
  ];

  const benefits = [
    {
      title: "Operational Resilience",
      description: "Navigate complex vendor ecosystems, cyber threats, and business continuity challenges while maintaining critical operations during disruptions.",
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
      title: "Regulatory Compliance",
      description: "Automate compliance monitoring across multiple frameworks, reduce manual errors, and ensure timely regulatory reporting with real-time obligation tracking.",
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
      title: "Cyber Risk Management",
      description: "Protect against increasing cyber breaches with integrated risk assessment, threat monitoring, and incident response capabilities aligned with NIST CSF and ISO 27001 standards.",
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
      title: "Third-Party Risk Management",
      description: "Effectively assess, monitor, and mitigate risks from the growing ecosystem of vendors, suppliers, and partners through automated workflows and continuous monitoring.",
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
      title: "Cost Optimization",
      description: "Reduce compliance costs by up to 90% through process automation, unified control frameworks, and elimination of redundant manual processes.",
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
    <div className="fs-main-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="fs-breadcrumb">
        <nav className="fs-breadcrumb-nav">
          <ol className="fs-breadcrumb-list">
            <li className="fs-breadcrumb-item">
              <Link to="/" className="fs-breadcrumb-link">Our Products</Link>
            </li>
            <li className="fs-breadcrumb-separator">/</li>
            <li className="fs-breadcrumb-item">
              <Link to="/riskavaire" className="fs-breadcrumb-link">RiskaVaire</Link>
            </li>
            <li className="fs-breadcrumb-separator">/</li>
            <li className="fs-breadcrumb-item">
              <Link to="/solutions" className="fs-breadcrumb-link">Solutions</Link>
            </li>
            <li className="fs-breadcrumb-separator">/</li>
            <li className="fs-breadcrumb-item">
              <span className="fs-breadcrumb-current">Financial Services</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section with Left-Right Layout */}
      <div className="fs-hero-container">
        {/* Left Side - Heading and Call to Action */}
        <div className="fs-hero-text-area">
          <h1 className="fs-hero-heading">RiskaVaire for Financial Services</h1>
          <p className="fs-hero-subtitle">
            "Strengthen Financial Resilience, Drive Regulatory Excellence, and Secure Customer Trust"
          </p>
          
          {/* Mobile Image - appears below subtitle on mobile */}
          <div className="fs-hero-image-area-mobile">
            <div className="fs-icon-wrapper">
              <img 
                src={financialServicesImage}
                alt="Financial Services" 
                className="fs-hero-image"
              />
            </div>
          </div>
          
          <p className="fs-hero-description">
            RiskaVaire for Financial Services fortifies financial resilience by automating compliance across regulations like PCI DSS, NYDFS, and SOC 2 while delivering live control monitoring.
          </p>
          <button className="fs-hero-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>
        </div>
        
        {/* Button positioned separately for mobile grid layout */}
        <button className="fs-hero-button mobile-button" onClick={() => window.location.href = '/contact#contact-form-section'}>Request Demo</button>

        {/* Right Side - Financial Services Image (Desktop only) */}
        <div className="fs-hero-image-area">
          <div className="fs-icon-wrapper">
            <img 
              src={financialServicesImage}
              alt="Financial Services" 
              className="fs-hero-image"
            />
          </div>
        </div>
      </div>

      {/* Compliance Frameworks Section */}
      <div className="fs-frameworks-wrapper">
        <div className="fs-section-header">
          <h2 className="fs-section-title">Compliance Frameworks</h2>
        </div>
        
        <div className="fs-frameworks-grid">
          {frameworks.map((framework, index) => (
            <div 
              key={index} 
              className="fs-framework-item fs-framework-clickable"
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
              <div className="fs-framework-icon">
                <img 
                  src={framework.icon} 
                  alt={framework.name}
                  className="fs-framework-icon-image"
                />
              </div>
              <span className="fs-framework-text">{framework.name}</span>
            </div>
          ))}
        </div>
        
        <button className="fs-view-button" onClick={() => window.location.href = '/framework'}>View All Frameworks</button>
      </div>

      {/* Why GRC Solutions Section */}
      <div className="fs-benefits-wrapper">
        <div className="fs-section-header">
          <h2 className="fs-section-title">Why GRC Solutions Are Critical for Financial Services</h2>
        </div>
        
        <div className="fs-intro-text">
          <p>
            Financial institutions operate in one of the most heavily regulated environments, facing stringent oversight from multiple regulatory bodies including the SEC, OCC, FINRA, and FRB. With over 60% of financial firms expecting compliance costs to rise due to changing regulations, implementing a comprehensive GRC solution is essential for:
          </p>
        </div>

        <div className="fs-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="fs-benefit-item" style={{backgroundColor: benefit.bgColor}}>
              <div className="fs-benefit-header">
                <div className="fs-benefit-icon" style={{backgroundColor: benefit.accentColor + '20'}}>
                  {benefit.icon}
                </div>
                <h3 className="fs-benefit-title" style={{color: benefit.accentColor}}>{benefit.title}</h3>
              </div>
              <p className="fs-benefit-description">{benefit.description}</p>
              <div className="fs-benefit-footer">
                <div className="fs-benefit-accent" style={{backgroundColor: benefit.accentColor}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Section - Program Outcomes */}
      <div className="fs-roi-wrapper">
        <div className="fs-roi-header">
          <h2 className="fs-roi-title">Financial Services Industry</h2>
          {/* <p className="fs-roi-subtitle">Measure Your Program Outcomes</p>
          <div className="fs-roi-underline"></div> */}
        </div>
        
        <div className="fs-roi-grid">
          <div className="fs-roi-item">
            <div className="fs-roi-icon">
              <img src={fs1Icon} alt="ROI Icon 1" />
            </div>
            <div className="fs-roi-percentage">67%</div>
            <div className="fs-roi-description">
              Improvement in risk reporting visibility and efficiency for the executive management and board
            </div>
          </div>
          
          <div className="fs-roi-item">
            <div className="fs-roi-icon">
              <img src={fs2Icon} alt="ROI Icon 2" />
            </div>
            <div className="fs-roi-percentage">90%</div>
            <div className="fs-roi-description">
              Reduction in the time taken to manage compliance activities
            </div>
          </div>
          
          <div className="fs-roi-item">
            <div className="fs-roi-icon">
              <img src={fs3Icon} alt="ROI Icon 3" />
            </div>
            <div className="fs-roi-percentage">80%</div>
            <div className="fs-roi-description">
              Decrease in third-party onboarding time
            </div>
          </div>
        </div>
        
        {/* <div className="fs-roi-source">
          Source: Based on MetricStream customer responses and GRC Journey Business Value Calculator
        </div> */}
      </div>

      {/* Demo Section - Call to Action */}
      <div className="fs-demo-wrapper">
        <div className="fs-demo-content">
          <h2 className="fs-demo-headline">
            RiskaVaire = Smarter GRC. Safer Enterprise. Simpler Compliance.
          </h2>
          <p className="fs-demo-subheadline">
            Ready to transform your compliance program?
          </p>
          <button className="fs-demo-button" onClick={() => window.location.href = '/contact#contact-form-section'}>
            <svg className="fs-demo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            BOOK YOUR DEMO NOW
          </button>
        </div>
        
        <div className="fs-demo-footer">
          <div className="fs-contact-info">
            <div className="fs-contact-item">
              <svg className="fs-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              info@vardaanglobal.com
            </div>
            <div className="fs-contact-item">
              <svg className="fs-contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default FinancialServices;
