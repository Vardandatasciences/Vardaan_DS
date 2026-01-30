import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Riskavaireinfo.css';
import riskavaireLogo from '../../../assets/Images/Products/GRC/riskavaire-icon.svg';

const Riskavaireinfo = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="riskavaire-info">
      {/* Header Section */}
      <div className="riskavaire-header">
        <div className="logo-container">
          <img src={riskavaireLogo} alt="RISKA AIRE Logo" className="riskavaire-logo" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Main Heading */}
        <h1 className="main-heading">
          <div className="title-line-1">Governance, Risk, and Compliance reimagined</div>
          <div className="title-line-2">with AI</div>
        </h1>

        {/* Tagline */}
        <p className="tagline">
          Transforms compliance into confidence—simplifying audits, reducing risk, and giving you control, one module at a time.
        </p>

        {/* Body Paragraph */}
        <p className="body-paragraph">
          Empower your organization with cutting-edge governance, risk management, and compliance tools designed for the modern enterprise. Our comprehensive platform delivers unparalleled control, real-time visibility, and AI-powered automation—aligning IT with business objectives and helping you stay ahead of regulatory change.
        </p>

        {/* Problem and Solution Cards */}
        <div className="cards-container">
          {/* The Problem Card */}
          <div className="problem-card">
            <h2 className="problem-title">The Problem</h2>
            <ul className="problem-list">
              <li>Increasing regulatory complexity and audit fatigue</li>
              <li>Siloed governance, risk, and compliance workflows</li>
              <li>Manual controls and spreadsheets prone to errors</li>
              <li>Lack of real-time risk intelligence</li>
              <li>Costly, hard-to-maintain legacy GRC systems</li>
            </ul>
          </div>

          {/* The Solution Card */}
          <div className="solution-card">
            <h2 className="solution-title">The Solution</h2>
            <ul className="solution-list">
              <li>Introducing <span className="riskavaire-name">Riskavaire</span> – an intelligent, AI-powered GRC framework</li>
              <li>Unifies governance, risk, and compliance in a single platform</li>
              <li>Leverages AI for predictive risk, automated compliance, and intelligent policy tracking</li>
              <li>Reduces manual effort, increases audit readiness, and delivers instant insights</li>
            </ul>
          </div>
        </div>

        {/* Urgency Section */}
        <div className="urgency-section">
          <h2 className="urgency-heading">Urgency of Now – The Need for a Transformation</h2>
          <div className="urgency-content">
            <p>
              The governance, risk, and compliance (GRC) landscape is experiencing unprecedented pressure. 
              Global non-compliance fines reached $14 billion in 2024, while the annual cost of financial-crime 
              compliance has soared to $206 billion. The global GRC software market is projected to grow by 
              $44.22 billion between 2025 and 2029, at a CAGR of 14.2%.
            </p>
            <p>
              Organizations now face a dual imperative: control rising compliance costs and strengthen 
              resilience in an increasingly volatile risk environment. Traditional GRC methods—dominated 
              by manual processes, periodic reviews, and reactive controls—are fast becoming outdated. 
              In contrast, AI-assisted automation has shown up to a 62% boost in compliance efficiency, 
              significantly cutting time spent on routine GRC tasks.
            </p>
          </div>
        </div>

        {/* RiskaVaire Response Section */}
        <div className="riskavaire-response-section">
          <h2 className="response-heading">RiskaVaire: Vardaan's Response to the Shifting GRC Landscape</h2>
          <div className="response-content">
            <p>
              RiskaVaire is Vardaan's answer to the growing complexity and cost pressures facing today's 
              risk and compliance landscape. Purpose-built to address the urgent need for transformation, 
              RiskaVaire offers a robust, AI-powered GRC framework that automates the entire risk lifecycle—from 
              framework design and policy management to compliance monitoring, incident response, and risk mitigation.
            </p>
            <p>
              In a world where traditional, manual GRC methods can no longer keep pace with regulatory demands 
              and evolving threats, RiskaVaire empowers organizations to shift from reactive compliance to 
              intelligent, proactive risk management. By continuously sensing risks and surfacing audit gaps 
              through AI, it reduces operational drag and strengthens enterprise resilience—meeting the moment 
              with speed, precision, and scale.
            </p>
          </div>
        </div>

        {/* Feature Set Section */}
        <div className="feature-set-section">
          <h2 className="feature-set-heading">A Feature Set That Delivers</h2>
          <div className="feature-cards-grid">
            {/* Row 1 */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5S21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12S9.24 7 12 7S17 9.24 17 12S14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15S15 13.66 15 12S13.66 9 12 9Z" fill="#3B82F6"/>
                </svg>
              </div>
              <h3 className="feature-title">Real-Time Monitoring</h3>
              <p className="feature-description">Live risk and compliance visibility across functions and geographies</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2C8.45 2 8 2.45 8 3V4H6C4.9 4 4 4.9 4 6V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V6C20 4.9 19.1 4 18 4H16V3C16 2.45 15.55 2 15 2S14 2.45 14 3V4H10V3C10 2.45 9.55 2 9 2ZM6 8H18V18H6V8ZM12 10C10.9 10 10 10.9 10 12S10.9 14 12 14S14 13.1 14 12S13.1 10 12 10Z" fill="#8B5CF6"/>
                </svg>
              </div>
              <h3 className="feature-title">AI-Powered Intelligence</h3>
              <p className="feature-description">Predictive analytics to assess and mitigate threats before they occur</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="#10B981"/>
                </svg>
              </div>
              <h3 className="feature-title">Compliance Automation</h3>
              <p className="feature-description">Auto-monitoring, reporting, and audit trails for industry frameworks</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V9C15 10.1 14.1 11 13 11H11C9.9 11 9 10.1 9 9V6.5L3 7V9L9 10.5V16C9 17.1 9.9 18 11 18H13C14.1 18 15 17.1 15 16V10.5L21 9Z" fill="#F59E0B"/>
                </svg>
              </div>
              <h3 className="feature-title">Policy Management</h3>
              <p className="feature-description">Centralized, versioned policies with automated compliance checks</p>
            </div>

            {/* Row 2 */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="#6366F1"/>
                </svg>
              </div>
              <h3 className="feature-title">Multi-Framework Support</h3>
              <p className="feature-description">ISO 27001, NIST, SOX, HIPAA, GDPR, PCI-DSS, and more</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4C16.55 4 17 4.45 17 5S16.55 6 16 6H13V9C13 10.1 12.1 11 11 11H8V14C8 14.55 7.55 15 7 15S6 14.55 6 14V11C6 9.9 6.9 9 8 9H11V6C11 4.9 11.9 4 13 4H16ZM19 8C19.55 8 20 8.45 20 9V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V9C4 8.45 4.45 8 5 8S6 8.45 6 9V19H18V9C18 8.45 18.45 8 19 8Z" fill="#14B8A6"/>
                </svg>
              </div>
              <h3 className="feature-title">Third-Party Risk</h3>
              <p className="feature-description">Evaluate vendor and partner risk with dedicated modules</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3S15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15S13.1 13 12 13S10 13.9 10 15S10.9 17 12 17Z" fill="#DC2626"/>
                </svg>
              </div>
              <h3 className="feature-title">Continuous Control</h3>
              <p className="feature-description">Ongoing oversight of operational, regulatory, and IT controls</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#F59E0B"/>
                </svg>
              </div>
              <h3 className="feature-title">Executive Dashboards</h3>
              <p className="feature-description">High-level insights, audit trail summaries, and compliance KPIs</p>
            </div>
          </div>
        </div>

        {/* Competitive Edge Section */}
        <div className="competitive-edge-section">
          <h2 className="competitive-edge-heading">Competitive Edge</h2>
          <div style={{
            maxWidth: isMobile ? '100%' : '900px', 
            margin: '0 auto', 
            borderRadius: '8px', 
            overflow: isMobile ? 'auto' : 'hidden', 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
            background: '#ffffff', 
            border: '1px solid #e5e7eb',
            WebkitOverflowScrolling: isMobile ? 'touch' : 'auto'
          }}>
            {/* Table Container */}
            <div style={{
              display: 'table',
              width: isMobile ? '520px' : '100%',
              minWidth: isMobile ? '520px' : 'auto'
            }}>
              {/* Header Row */}
              <div style={{
                display: 'table-row',
                background: '#f8f9fa'
              }}>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '120px' : '250px',
                  padding: isMobile ? '16px 8px' : '24px 20px',
                  fontWeight: '700',
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  borderRight: '1px solid #e2e8f0',
                  background: '#f8f9fa',
                  color: '#1a1a1a',
                  textAlign: 'left'
                }}>Feature</div>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '180px' : 'auto',
                  padding: isMobile ? '16px 8px' : '24px 20px',
                  fontWeight: '700',
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  borderRight: '1px solid #e2e8f0',
                  background: '#374151',
                  color: '#ffffff',
                  textAlign: 'center'
                }}>Riskavaire</div>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '220px' : 'auto',
                  padding: isMobile ? '16px 8px' : '24px 20px',
                  fontWeight: '700',
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  background: '#f8f9fa',
                  color: '#64748b',
                  textAlign: 'center'
                }}>Legacy GRC</div>
              </div>
              
              {/* Data Row 1 */}
              <div style={{
                display: 'table-row',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '120px' : '250px',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  borderRight: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#1a1a1a',
                  fontWeight: '600',
                  textAlign: 'left',
                  verticalAlign: 'middle'
                }}>Automation</div>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '180px' : 'auto',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  borderRight: '1px solid #e2e8f0',
                  background: '#374151',
                  color: '#ffffff',
                  fontWeight: '500',
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>AI-driven, predictive</div>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '220px' : 'auto',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  background: '#ffffff',
                  color: '#64748b',
                  fontWeight: '400',
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>Manual-heavy workflows</div>
              </div>
              
              {/* Data Row 2 */}
              <div style={{
                display: 'table-row',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '120px' : '250px',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  borderRight: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#1a1a1a',
                  fontWeight: '600',
                  textAlign: 'left',
                  verticalAlign: 'middle'
                }}>Risk Insights</div>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '180px' : 'auto',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  borderRight: '1px solid #e2e8f0',
                  background: '#374151',
                  color: '#ffffff',
                  fontWeight: '500',
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>Real-time dashboards</div>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '220px' : 'auto',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  background: '#ffffff',
                  color: '#64748b',
                  fontWeight: '400',
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>Delayed static reports</div>
              </div>
              
              {/* Data Row 3 */}
              <div style={{
                display: 'table-row',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '120px' : '250px',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  borderRight: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#1a1a1a',
                  fontWeight: '600',
                  textAlign: 'left',
                  verticalAlign: 'middle'
                }}>Cost</div>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '180px' : 'auto',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  borderRight: '1px solid #e2e8f0',
                  background: '#374151',
                  color: '#ffffff',
                  fontWeight: '500',
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>Scalable & efficient</div>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '220px' : 'auto',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  background: '#ffffff',
                  color: '#64748b',
                  fontWeight: '400',
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>High deployment cost</div>
              </div>
              
              {/* Data Row 4 */}
              <div style={{
                display: 'table-row'
              }}>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '120px' : '250px',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  borderRight: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#1a1a1a',
                  fontWeight: '600',
                  textAlign: 'left',
                  verticalAlign: 'middle'
                }}>Deployment</div>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '180px' : 'auto',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  borderRight: '1px solid #e2e8f0',
                  background: '#374151',
                  color: '#ffffff',
                  fontWeight: '500',
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>Fast, light rollout</div>
                <div style={{
                  display: 'table-cell',
                  width: isMobile ? '220px' : 'auto',
                  padding: isMobile ? '12px 8px' : '20px',
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  background: '#ffffff',
                  color: '#64748b',
                  fontWeight: '400',
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>Long, complex setups</div>
              </div>
            </div>
          </div>
        </div>

        {/* Designed For Section */}
        <div className="designed-for-section">
          <h2 className="designed-for-heading">Designed for</h2>
          <div className="industry-icons" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: isMobile ? '15px' : '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div className="industry-item">
              <svg width={isMobile ? "32" : "48"} height={isMobile ? "32" : "48"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20V6H4V4ZM4 8H20V10H4V8ZM4 12H20V14H4V12ZM4 16H20V18H4V16Z" fill="#3B82F6"/>
              </svg>
              <span className="industry-label">BFSI</span>
            </div>
            <div className="industry-item">
              <svg width={isMobile ? "32" : "48"} height={isMobile ? "32" : "48"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#EF4444"/>
              </svg>
              <span className="industry-label">Healthcare</span>
            </div>
            <div className="industry-item">
              <svg width={isMobile ? "32" : "48"} height={isMobile ? "32" : "48"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="#8B5CF6"/>
              </svg>
              <span className="industry-label">Cybersecurity</span>
            </div>
            <div className="industry-item">
              <svg width={isMobile ? "32" : "48"} height={isMobile ? "32" : "48"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 2V13H10V22L17 10H13L17 2H7Z" fill="#F59E0B"/>
              </svg>
              <span className="industry-label">Energy & Utilities</span>
            </div>
            <div className="industry-item">
              <svg width={isMobile ? "32" : "48"} height={isMobile ? "32" : "48"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="#64748B"/>
              </svg>
              <span className="industry-label">Manufacturing</span>
            </div>
            <div className="industry-item">
              <svg width={isMobile ? "32" : "48"} height={isMobile ? "32" : "48"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V10H22V7L12 2ZM4 11V13H6V11H4ZM18 11V13H20V11H18ZM8 11V13H10V11H8ZM14 11V13H16V11H14ZM11 11V13H13V11H11ZM2 19V21H22V19H2ZM4 15V17H20V15H4Z" fill="#10B981"/>
              </svg>
              <span className="industry-label">Public Sector</span>
            </div>
            <div className="industry-item">
              <svg width={isMobile ? "32" : "48"} height={isMobile ? "32" : "48"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 15 8.5 14.5 11.5 14C14.5 13.5 17 8 17 8Z" fill="#059669"/>
              </svg>
              <span className="industry-label">Environmental</span>
            </div>
            <div className="industry-item">
              <svg width={isMobile ? "32" : "48"} height={isMobile ? "32" : "48"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#3B82F6"/>
              </svg>
              <span className="industry-label">Telecom</span>
            </div>
          </div>
        </div>

        {/* Demo Section - Call to Action */}
        <div className="demo-wrapper">
          <div className="demo-content">
            <h2 className="demo-headline">
              RiskaVaire = Smarter GRC. Safer Enterprise. Simpler Compliance.
            </h2>
            <p className="demo-subheadline">
              Ready to transform your compliance program?
            </p>
            <button className="demo-button" onClick={() => navigate('/contact')}>
              <svg className="demo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              BOOK YOUR DEMO NOW
            </button>
          </div>
          
          <div className="demo-footer">
            <div className="contact-info-footer">
              <div className="contact-item-footer">
                <svg className="contact-icon-footer" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                info@vardaanglobal.com
              </div>
              <div className="contact-item-footer">
                <svg className="contact-icon-footer" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </div>
  );
};

export default Riskavaireinfo;
