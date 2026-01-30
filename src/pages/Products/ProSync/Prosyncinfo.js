import React, { useEffect, useState } from 'react';
import './Prosyncinfo.css';

const Prosyncinfo = () => {
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
    <div className="prosync-info">
      {/* Hero Section */}
      <section className="prosync-hero-section">
        <div className="prosync-hero-background">
          <div className="prosync-hero-overlay"></div>
        </div>
        
        <div className="prosync-hero-content">
          <h1 className="prosync-hero-title">
            <span className="prosync-title-main">ProSync</span>
            <span className="prosync-title-sub">Professional Work Synchronization</span>
          </h1>
          
          <p className="prosync-hero-tagline">
            "With ProSync, every activity is connected, traceable, and accountable—ensuring 
            seamless process synchronization from start to finish."
          </p>
          
          <div className="prosync-hero-buttons">
            <button className="prosync-btn-primary" onClick={() => window.location.href = '/contact'}>Book Demo</button>
          </div>
        </div>
        
        <div className="prosync-hero-animation">
          <div className="prosync-glow-circle prosync-glow-1"></div>
          <div className="prosync-glow-circle prosync-glow-2"></div>
        </div>
      </section>

      {/* Problem Solution Section */}
      <section className="prosync-problem-solution-section">
        <div className="prosync-container">
          <div className="prosync-incident-story">
            <div className="prosync-story-badge">
              <svg className="prosync-alert-icon" viewBox="0 0 24 24" fill="none">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>The Incident That Changed the Game</span>
            </div>
            
            <div className="prosync-story-content">
              <p>
                In early 2025, a mid-sized consulting firm faced chaos: deadlines missed, audits delayed, 
                and projects derailed. Why? Their task management was scattered across emails, spreadsheets, 
                and ad-hoc tools. No single source of truth meant lost accountability, delayed responses, 
                and zero visibility into bottlenecks.
              </p>
              <p>
                This isn't an isolated story—organizations everywhere are struggling with fragmented 
                workflows and poor visibility. <strong>That's where ProSync steps in.</strong>
              </p>
            </div>
          </div>

          <div className="prosync-problem-solution-grid">
            <div className="prosync-problem-card">
              <div className="prosync-card-header">
                <div className="prosync-icon-container prosync-problem-icon">
                  <svg className="prosync-alert-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2>The Problem</h2>
              </div>
              
              <p className="prosync-card-description">
                Many organizations struggle with scattered tasks across emails, spreadsheets, 
                and manual tools—leading to missed deadlines, delayed audits, poor accountability, 
                and zero visibility into bottlenecks.
              </p>
              
              <ul className="prosync-problem-list">
                <li>Increasing regulatory complexity and audit fatigue</li>
                <li>Siloed governance, risk, and compliance workflows</li>
                <li>Manual controls and spreadsheets prone to errors</li>
                <li>Lack of real-time risk intelligence</li>
                <li>Costly, hard-to-maintain legacy systems</li>
              </ul>
            </div>

            <div className="prosync-solution-card">
              <div className="prosync-card-header">
                <div className="prosync-icon-container prosync-solution-icon">
                  <svg className="prosync-check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2>The Solution</h2>
              </div>
              
              <p className="prosync-card-description">
                ProSync solves this by centralizing task management into one secure platform, 
                offering real-time monitoring, audit-centric workflows, automated reminders, 
                and time tracking for seamless process synchronization.
              </p>
              
              <ul className="prosync-solution-list">
                <li>Introducing <span className="prosync-name">ProSync</span> – an intelligent task management framework</li>
                <li>Unifies governance, workflows, and compliance in a single platform</li>
                <li>Leverages automation for predictive insights and intelligent tracking</li>
                <li>Reduces manual effort, increases audit readiness, and delivers instant insights</li>
                <li>Scalable architecture that adapts to your organization's needs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="prosync-service-cards-white-bg">
        <div className="prosync-container">
          <div className="prosync-section-header">
            <h2>Comprehensive Task Management Solutions</h2>
            <p>
              ProSync offers a complete suite of services designed to streamline your organization's 
              workflows and enhance operational efficiency.
            </p>
          </div>

          <div className="prosync-our-services-grid">
            <div className="prosync-service-card">
              <div className="prosync-service-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>End-to-End Oversight</h3>
              <p>Create, assign, and track tasks across departments with real-time updates and complete visibility into every workflow.</p>
            </div>

            <div className="prosync-service-card">
              <div className="prosync-service-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Smart Dashboards</h3>
              <p>Interactive analytics and visual reporting to identify bottlenecks, track performance, and make data-driven decisions.</p>
            </div>

            <div className="prosync-service-card">
              <div className="prosync-service-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 13.5,15.5 8.5,10.5 2,17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Integrated Mailer</h3>
              <p>Automated email notifications, reminders, and reports sent directly from ProSync without external dependencies.</p>
            </div>

            <div className="prosync-service-card">
              <div className="prosync-service-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Dynamic View Builder</h3>
              <p>Customize fields, layouts, and filters to match your unique business processes and organizational requirements.</p>
            </div>

            <div className="prosync-service-card">
              <div className="prosync-service-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Time Tracking</h3>
              <p>Comprehensive time logging and productivity monitoring for accountability and performance optimization across teams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="prosync-why-choose-us-section">
        <div className="prosync-container">
          <div className="prosync-section-header">
            <div className="prosync-section-badge">
              <svg className="prosync-lightbulb-icon" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Why Choose Us</span>
            </div>
          </div>

          <div className="prosync-why-choose-us-grid">
            <div className="prosync-why-choose-feature-card">
              <div className="prosync-why-choose-feature-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Centralized Control & Visibility</h3>
              <p>One source of truth for all tasks, audits, and workflows eliminating confusion and delays.</p>
            </div>

            <div className="prosync-why-choose-feature-card">
              <div className="prosync-why-choose-feature-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Smarter, Data-Driven Decisions</h3>
              <p>Real-time dashboards and risk insights help managers act before issues escalate.</p>
            </div>

            <div className="prosync-why-choose-feature-card">
              <div className="prosync-why-choose-feature-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Scalable & Efficient Workflows</h3>
              <p>From startups to enterprises, ProSync adapts to your processes while ensuring faster audits and stronger accountability.</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* Roles Benefit Section */}
      <section className="prosync-roles-benefit-section">
        <div className="prosync-container">
          <div className="prosync-section-header">
            <h2>How Different Roles Benefit</h2>
          </div>

          <div className="prosync-roles-benefit-grid">
            <div className="prosync-role-card">
              <div className="prosync-role-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Supervisors</h3>
              <p>Onboard clients, set up audits, and assign employees with complete oversight.</p>
            </div>

            <div className="prosync-role-card">
              <div className="prosync-role-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Admins</h3>
              <p>Get 360° visibility into stakeholders, deadlines, and bottlenecks across all projects.</p>
            </div>

            <div className="prosync-role-card">
              <div className="prosync-role-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Auditors & Employees</h3>
              <p>Work seamlessly with task dashboards, update statuses, and log hours efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="prosync-industries-section">
        <div className="prosync-container">
          <div className="prosync-section-header">
            <h2>Trusted Across Industries</h2>
            <p>
              From consulting firms to financial institutions, ProSync adapts to your industry's 
              unique workflows and compliance requirements.
            </p>
          </div>

          <div className="prosync-industries-grid">
            <div className="prosync-industry-card">
              <div className="prosync-industry-icon prosync-industry-blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 2C8.45 2 8 2.45 8 3V4H6C4.9 4 4 4.9 4 6V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V6C20 4.9 19.1 4 18 4H16V3C16 2.45 15.55 2 15 2S14 2.45 14 3V4H10V3C10 2.45 9.55 2 9 2ZM6 8H18V18H6V8ZM12 10C10.9 10 10 10.9 10 12S10.9 14 12 14S14 13.1 14 12S13.1 10 12 10Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="prosync-industry-content">
                <h3>Accounting & Taxation Firms</h3>
                <p>Streamline GST returns, VAT processing, and client audit workflows with automated task management.</p>
              </div>
            </div>

            <div className="prosync-industry-card">
              <div className="prosync-industry-icon prosync-industry-blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 21V7l8-4v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 21V11l-6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="prosync-industry-content">
                <h3>Financial Services & Banking</h3>
                <p>Ensure compliance deadlines, risk assessments, and regulatory reporting with complete audit trails.</p>
              </div>
            </div>

            <div className="prosync-industry-card">
              <div className="prosync-industry-icon prosync-industry-green">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="prosync-industry-content">
                <h3>Education & Training</h3>
                <p>Manage curriculum delivery, student assessments, and institutional compliance requirements efficiently.</p>
              </div>
            </div>

            <div className="prosync-industry-card">
              <div className="prosync-industry-icon prosync-industry-orange">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="6" y1="7" x2="6" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="10" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="14" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="prosync-industry-content">
                <h3>Consulting & Professional Services</h3>
                <p>Coordinate client projects, deliverables, and team assignments with real-time visibility and tracking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="prosync-contact-section">
        <div className="prosync-container">
          <div className="prosync-section-header">
            <h2>Ready to Transform Your Operations?</h2>
            <p>
              Don't wait for the next missed deadline. Discover how ProSync can transform 
              your operations today.
            </p>
            
            <div className="prosync-contact-buttons">
              <button className="prosync-btn-primary" onClick={() => window.location.href = '/contact'}>Book Demo →</button>
            </div>
          </div>

          <div className="prosync-contact-info">
            <div className="prosync-contact-card">
              <div className="prosync-contact-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Phone Support</h3>
              <p>Speak directly with our experts</p>
              <a href="tel:+914035171118" className="prosync-contact-link">+91 40-35171118</a>
            </div>

            <div className="prosync-contact-card">
              <div className="prosync-contact-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Email Us</h3>
              <p>Get detailed information and support</p>
              <a href="mailto:info@prosync.com" className="prosync-contact-link">info@prosync.com</a>
            </div>

            <div className="prosync-contact-card">
              <div className="prosync-contact-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Online Portal</h3>
              <p>Access our comprehensive platform</p>
              <a href="https://vardaands.com/prosync" className="prosync-contact-link">vardaands.com/prosync</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prosyncinfo;
