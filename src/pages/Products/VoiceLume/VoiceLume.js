import React from "react";
import "./VoiceLume.css";
import Footer from "../../../components/Footer/Footer";
import heroBanner from "../../../assets/Images/Voicelume/hero banner.jpg";

const VoiceLume = () => {
  // Debug: Log the imported image
  console.log("Hero Banner Image:", heroBanner);
  
  return (
    <div className="voicelume-container">
      {/* Hero Section */}
      <section 
        className="voicelume-hero" 
        style={{ 
          backgroundImage: `url("${heroBanner}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 50%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="voicelume-hero-content">
          {/* AI-Powered Badge */}
          <div className="voicelume-badge">
            <svg 
              className="star-icon" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              stroke="currentColor" 
              strokeWidth="0" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>AI-Powered Customer Intelligence</span>
          </div>

          {/* Main Title */}
          <h1 className="voicelume-title">
            <span className="title-vardaan">Vardaan</span>{" "}
            <span className="title-voice">Voice</span>{" "}
            <span className="title-lume">Lume</span>
          </h1>

          {/* Tagline */}
          <p className="voicelume-tagline">
            Transform customer feedback into actionable intelligence. AI-powered analysis that scales with your organization.
          </p>

          {/* Feature Highlights */}
          <div className="voicelume-features">
            <div className="voicelume-feature-item">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <span>Real-time Insights.</span>
            </div>
            <div className="voicelume-feature-item">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Enterprise-Grade.</span>
            </div>
            <div className="voicelume-feature-item">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span>Instant Detection.</span>
            </div>
          </div>

        </div>
      </section>

      {/* Challenge Section */}
      <section className="voicelume-challenge">
        <div className="voicelume-challenge-container">
          {/* Header */}
          <div className="voicelume-challenge-header">
            <h2 className="voicelume-challenge-subtitle">THE CHALLENGE</h2>
            <h3 className="voicelume-challenge-title">Managing Customer Feedback at Scale</h3>
            <p className="voicelume-challenge-description">
              Traditional feedback management creates bottlenecks that hurt customer satisfaction and operational efficiency.
            </p>
          </div>

          {/* Challenge Cards Grid */}
          <div className="voicelume-challenge-cards">
            {/* Top Row - Cards with Light Pink Circular Icons */}
            <div className="voicelume-challenge-card">
              <div className="voicelume-card-icon voicelume-card-icon-pink">
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="4 4 8 8 12 6 16 10 20 3"></polyline>
                  <polyline points="20 3 20 20 4 20"></polyline>
                </svg>
              </div>
              <h4 className="voicelume-card-title">Volume Overload</h4>
              <p className="voicelume-card-description">
                Organizations receive feedback continuously across multiple touchpoints—web forms, in-person interactions, call centers, emails. Handling this manually doesn't scale.
              </p>
            </div>

            <div className="voicelume-challenge-card">
              <div className="voicelume-card-icon voicelume-card-icon-pink">
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h4 className="voicelume-card-title">Lack of Actionable Insights</h4>
              <p className="voicelume-card-description">
                Raw feedback doesn't automatically translate into what to fix, who should act, and what's most urgent. Without analysis, critical patterns stay hidden.
              </p>
            </div>

            <div className="voicelume-challenge-card">
              <div className="voicelume-card-icon voicelume-card-icon-pink">
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h4 className="voicelume-card-title">Delayed Response Times</h4>
              <p className="voicelume-card-description">
                When feedback is reviewed late, dissatisfaction grows, complaints escalate, and trust drops—often before teams even see the issue.
              </p>
            </div>

            {/* Bottom Row - Cards with Light Pink Circular Icons */}
            <div className="voicelume-challenge-card">
              <div className="voicelume-card-icon voicelume-card-icon-pink">
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h4 className="voicelume-card-title">Inconsistent Tracking</h4>
              <p className="voicelume-card-description">
                Without a structured system, feedback gets duplicated, lost, or ignored. There's no consistent path from feedback → action → closure.
              </p>
            </div>

            <div className="voicelume-challenge-card">
              <div className="voicelume-card-icon voicelume-card-icon-pink">
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h4 className="voicelume-card-title">Limited Visibility</h4>
              <p className="voicelume-card-description">
                Leadership lacks real-time visibility into sentiment shifts, recurring pain points, and performance differences across teams and regions.
              </p>
            </div>

            <div className="voicelume-challenge-card">
              <div className="voicelume-card-icon voicelume-card-icon-pink">
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h4 className="voicelume-card-title">Resource Inefficiency</h4>
              <p className="voicelume-card-description">
                Teams waste hours sorting and categorizing feedback instead of resolving issues and improving service quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="voicelume-solution">
        <div className="voicelume-solution-container">
          {/* Header */}
          <div className="voicelume-solution-header">
            <h2 className="voicelume-solution-subtitle">THE SOLUTION</h2>
            <h3 className="voicelume-solution-title">Your Complete Feedback Intelligence Platform</h3>
            <p className="voicelume-solution-description">
              Voice Lume doesn't just collect feedback — it converts it into operational intelligence that leadership and teams can act on immediately.
            </p>
          </div>

          {/* Solution Cards Grid */}
          <div className="voicelume-solution-cards">
            {/* Top Row - Cards with Blue-Purple Gradient Icons */}
            <div className="voicelume-solution-card">
              <div className="voicelume-solution-icon voicelume-solution-icon-purple">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              </div>
              <h4 className="voicelume-solution-card-title">Centralized Feedback Hub</h4>
              <p className="voicelume-solution-card-description">
                A single platform to capture, store, and manage feedback from every channel—digital, physical, and support-driven.
              </p>
            </div>

            <div className="voicelume-solution-card">
              <div className="voicelume-solution-icon voicelume-solution-icon-purple">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44L2.5 13.5a2.5 2.5 0 0 1 0-3l4.54-5.96A2.5 2.5 0 0 1 9.5 2Z"></path>
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44L21.5 13.5a2.5 2.5 0 0 0 0-3l-4.54-5.96A2.5 2.5 0 0 0 14.5 2Z"></path>
                  <circle cx="12" cy="8" r="1.5"></circle>
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="16" r="1.5"></circle>
                  <circle cx="12" cy="12" r="3" strokeWidth="1.5"></circle>
                  <path d="M12 9v6M9 12h6"></path>
                </svg>
              </div>
              <h4 className="voicelume-solution-card-title">AI-Powered Analysis</h4>
              <p className="voicelume-solution-card-description">
                Our AI Model analyzes feedback, detects concerns, performs sentiment understanding, and generates intelligent summaries automatically.
              </p>
            </div>

            <div className="voicelume-solution-card">
              <div className="voicelume-solution-icon voicelume-solution-icon-purple">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h4 className="voicelume-solution-card-title">Automated Concern Detection</h4>
              <p className="voicelume-solution-card-description">
                The system identifies high-risk negative feedback, assigns confidence levels, and suggests next actions and resolution approaches.
              </p>
            </div>

            {/* Bottom Row - Cards with Blue-Green Gradient Icons */}
            <div className="voicelume-solution-card">
              <div className="voicelume-solution-icon voicelume-solution-icon-teal">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="6" cy="6" r="1.5" fill="currentColor"></circle>
                  <path d="M6 8 L6 10 Q6 12 8 12 Q10 12 10 14"></path>
                  <circle cx="10" cy="14" r="1.5" fill="currentColor"></circle>
                  <line x1="12" y1="14" x2="18" y2="14"></line>
                  <circle cx="18" cy="14" r="1.5" fill="currentColor"></circle>
                </svg>
              </div>
              <h4 className="voicelume-solution-card-title">Structured Workflow Management</h4>
              <p className="voicelume-solution-card-description">
                Feedback moves through a traceable workflow—from intake to validation, assignment, and closure—without losing context.
              </p>
            </div>

            <div className="voicelume-solution-card">
              <div className="voicelume-solution-icon voicelume-solution-icon-teal">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="20" x2="20" y2="20"></line>
                  <line x1="4" y1="20" x2="4" y2="4"></line>
                  <polyline points="4 16 8 12 12 14 16 10 20 8"></polyline>
                </svg>
              </div>
              <h4 className="voicelume-solution-card-title">Real-Time Analytics</h4>
              <p className="voicelume-solution-card-description">
                Dashboards provide instant visibility into sentiment, service performance, and trends across teams, departments, and regions.
              </p>
            </div>

            <div className="voicelume-solution-card">
              <div className="voicelume-solution-icon voicelume-solution-icon-teal">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="7" y1="12" x2="11" y2="12"></line>
                  <line x1="7" y1="16" x2="13" y2="16"></line>
                  <line x1="7" y1="20" x2="15" y2="20"></line>
                </svg>
              </div>
              <h4 className="voicelume-solution-card-title">Intelligent Summarization</h4>
              <p className="voicelume-solution-card-description">
                AI summaries consolidate large volumes of feedback into what matters—top issues, recurring themes, and improvement opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages Section */}
      <section className="voicelume-advantages">
        <div className="voicelume-advantages-container">
          {/* Header */}
          <div className="voicelume-advantages-header">
            <h2 className="voicelume-advantages-subtitle">WHY VOICE LUME</h2>
            <h3 className="voicelume-advantages-title">Competitive Advantages</h3>
            <p className="voicelume-advantages-description">
              What sets Vardaan Voice Lume apart from traditional feedback management systems.
            </p>
          </div>

          {/* Advantages Cards Grid */}
          <div className="voicelume-advantages-cards">
            {/* Card 1: AI-Powered Intelligence */}
            <div className="voicelume-advantages-card">
              <div className="voicelume-advantages-icon voicelume-advantages-icon-purple">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44L2.5 13.5a2.5 2.5 0 0 1 0-3l4.54-5.96A2.5 2.5 0 0 1 9.5 2Z"></path>
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44L21.5 13.5a2.5 2.5 0 0 0 0-3l-4.54-5.96A2.5 2.5 0 0 0 14.5 2Z"></path>
                  <path d="M8 8h8M8 12h8M8 16h6"></path>
                </svg>
              </div>
              <h4 className="voicelume-advantages-card-title">AI-Powered Intelligence</h4>
              <ul className="voicelume-advantages-list">
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Voice Lume understands the meaning behind feedback</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Concerns are identified automatically, not manually</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Intelligent summaries save hours of consolidation</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Detects trends before they become escalations</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Complete Workflow Integration */}
            <div className="voicelume-advantages-card">
              <div className="voicelume-advantages-icon voicelume-advantages-icon-teal">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                  <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                  <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                  <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                  <line x1="10" y1="7" x2="14" y2="7"></line>
                  <line x1="10" y1="17" x2="14" y2="17"></line>
                  <line x1="7" y1="10" x2="7" y2="14"></line>
                  <line x1="17" y1="10" x2="17" y2="14"></line>
                </svg>
              </div>
              <h4 className="voicelume-advantages-card-title">Complete Workflow Integration</h4>
              <ul className="voicelume-advantages-list">
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>End-to-end: From intake → validation → action → closure</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>One system for all stakeholders—no tool switching</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>No broken handoffs between teams</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Clear accountability and visibility</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Real-Time Actionability */}
            <div className="voicelume-advantages-card">
              <div className="voicelume-advantages-icon voicelume-advantages-icon-yellow">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <h4 className="voicelume-advantages-card-title">Real-Time Actionability</h4>
              <ul className="voicelume-advantages-list">
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Concerns are flagged as soon as feedback arrives</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Dashboards update live with instant visibility</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Leaders see what matters without waiting for reports</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Shortens the loop between feedback and correction</span>
                </li>
              </ul>
            </div>

            {/* Card 4: Scalability & Flexibility */}
            <div className="voicelume-advantages-card">
              <div className="voicelume-advantages-icon voicelume-advantages-icon-green">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h4 className="voicelume-advantages-card-title">Scalability & Flexibility</h4>
              <ul className="voicelume-advantages-list">
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Works from hundreds to thousands+ feedback entries</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Multi-location ready for distributed organizations</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Add new departments, services, or business units easily</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Adapt validation and routing to your internal process</span>
                </li>
              </ul>
            </div>

            {/* Card 5: Cost Efficiency */}
            <div className="voicelume-advantages-card">
              <div className="voicelume-advantages-icon voicelume-advantages-icon-purple-cost">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h4 className="voicelume-advantages-card-title">Cost Efficiency</h4>
              <ul className="voicelume-advantages-list">
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>AI reduces categorization and summarization effort</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Early detection reduces cost of escalations</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Trend spotting prevents reputation damage</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Track improvements through metrics and movement</span>
                </li>
              </ul>
            </div>

            {/* Card 6: Data-Driven Decision Making */}
            <div className="voicelume-advantages-card">
              <div className="voicelume-advantages-icon voicelume-advantages-icon-teal-target">
                <svg 
                  width="20" 
                  height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h4 className="voicelume-advantages-card-title">Data-Driven Decision Making</h4>
              <ul className="voicelume-advantages-list">
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Multiple dashboards for different decision levels</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Identify recurring issues and systemic causes</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Compare teams, locations, categories, and time windows</span>
                </li>
                <li>
                  <div className="checkmark-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
                  </div>
                  <span>Decisions supported by evidence, not guesswork</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner Section */}
      <section className="voicelume-quote-banner">
        <div className="voicelume-quote-banner-container">
          <p className="voicelume-quote-text">
            Voice Lume transforms raw feedback into structured, actionable intelligence—
            enabling faster decisions, better service, and measurable improvements.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VoiceLume;

