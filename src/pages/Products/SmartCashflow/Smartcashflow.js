import React from "react";
import "./Smartcashflow.css";
import Footer from "../../../components/Footer/Footer";
import homepageImage from "../../../assets/Images/Cashflow/homepage.webp";

const Smartcashflow = () => {
  return (
    <div className="smartcashflow-container">
      {/* Hero Section */}
      <section 
        className="smartcashflow-hero"
        style={{
          backgroundImage: `url(${homepageImage})`,
        }}
      >
        <div className="smartcashflow-hero-content">
          {/* Main Headline */}
          <h1 className="smartcashflow-title">
            Revolutionizing Financial Management with Smart{" "}
            <span className="title-highlight">Cashflow</span>
          </h1>

          {/* Description */}
          <p className="smartcashflow-description">
            Transform your bank statements into actionable insights. Automate financial analysis, 
            track vendors, and make data-driven decisions in real-time.
          </p>
        </div>
      </section>

      {/* The Challenge We Solve Section */}
      <section className="challenge-section">
        <div className="challenge-container">
          <h2 className="challenge-title">The Challenge We Solve</h2>
          <p className="challenge-subtitle">
            Traditional financial management is broken. Here's why businesses struggle.
          </p>
          
          <div className="challenge-cards-grid">
            {/* Card 1: Manual Burden */}
            <div className="challenge-card">
              <div className="challenge-icon-wrapper">
                <svg 
                  width="24" 
                  height="24" 
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
              <h3 className="challenge-card-title">Manual Burden</h3>
              <p className="challenge-card-description">
                Time-consuming bank statement reviews leading to delayed decisions.
              </p>
            </div>

            {/* Card 2: Fragmented Visibility */}
            <div className="challenge-card">
              <div className="challenge-icon-wrapper">
                <svg 
                  width="24" 
                  height="24" 
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
              <h3 className="challenge-card-title">Fragmented Visibility</h3>
              <p className="challenge-card-description">
                Disconnected multi-account data prevents holistic financial views.
              </p>
            </div>

            {/* Card 3: Reactive Planning */}
            <div className="challenge-card">
              <div className="challenge-icon-wrapper">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <h3 className="challenge-card-title">Reactive Planning</h3>
              <p className="challenge-card-description">
                Lack of predictive intelligence results in missing cash crunch signals.
              </p>
            </div>

            {/* Card 4: Vendor Blind Spots */}
            <div className="challenge-card">
              <div className="challenge-icon-wrapper">
                <svg 
                  width="24" 
                  height="24" 
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
              <h3 className="challenge-card-title">Vendor Blind Spots</h3>
              <p className="challenge-card-description">
                Limited insights into vendor relationships and payment patterns.
              </p>
            </div>

            {/* Card 5: Decision Delays */}
            <div className="challenge-card">
              <div className="challenge-icon-wrapper">
                <svg 
                  width="24" 
                  height="24" 
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
              <h3 className="challenge-card-title">Decision Delays</h3>
              <p className="challenge-card-description">
                Slow processing times lead to delayed actions and missed opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Key Features</h2>
          <p className="features-subtitle">
            Powerful tools designed to transform your financial management workflow.
          </p>
          
          <div className="features-cards-grid">
            {/* Card 1: Multi-format File Upload */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="12" x2="12" y2="16"></line>
                  <polyline points="10 14 12 12 14 14"></polyline>
                </svg>
              </div>
              <h3 className="feature-card-title">Multi-format File Upload</h3>
              <p className="feature-card-description">
                Supports PDF and Excel formats with AI-driven extraction and validation.
              </p>
              <ul className="feature-list">
                <li>
                  <svg 
                    className="checkmark-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>PDF & Excel support</span>
                </li>
                <li>
                  <svg 
                    className="checkmark-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>AI-driven extraction</span>
                </li>
                <li>
                  <svg 
                    className="checkmark-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Format validation</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Transaction Management */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="4" y="6" width="16" height="12" rx="2" ry="2"></rect>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="8" y1="8" x2="8" y2="8"></line>
                  <line x1="8" y1="16" x2="8" y2="16"></line>
                </svg>
              </div>
              <h3 className="feature-card-title">Transaction Management</h3>
              <p className="feature-card-description">
                Complete transaction history with real-time balance tracking and categorization.
              </p>
              <ul className="feature-list">
                <li>
                  <svg 
                    className="checkmark-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Real-time tracking</span>
                </li>
                <li>
                  <svg 
                    className="checkmark-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Smart categorization</span>
                </li>
                <li>
                  <svg 
                    className="checkmark-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Multi-currency support</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Vendor Analysis */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg 
                  width="24" 
                  height="24" 
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
              <h3 className="feature-card-title">Vendor Analysis</h3>
              <p className="feature-card-description">
                Extract vendor names and transaction histories for better financial insights.
              </p>
              <ul className="feature-list">
                <li>
                  <svg 
                    className="checkmark-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Auto vendor extraction</span>
                </li>
                <li>
                  <svg 
                    className="checkmark-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Transaction grouping</span>
                </li>
                <li>
                  <svg 
                    className="checkmark-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Performance insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 20+ Financial Analysis Types Section */}
      <section className="analysis-types-section">
        <div className="analysis-types-container">
          <h2 className="analysis-types-title">20+ Financial Analysis Types</h2>
          <p className="analysis-types-subtitle">
            AI-driven intelligence that transforms raw data into actionable insights.
          </p>
          
          <div className="analysis-types-grid">
            {/* Card 1: Income Stability */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <h3 className="analysis-type-title">Income Stability</h3>
              <p className="analysis-type-description">Measure income predictability</p>
            </div>

            {/* Card 2: Expense Categorization */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <polyline points="1 20 1 14 7 14"></polyline>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
              </div>
              <h3 className="analysis-type-title">Expense Categorization</h3>
              <p className="analysis-type-description">Identify spending trends</p>
            </div>

            {/* Card 3: Savings Potential */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="analysis-type-title">Savings Potential</h3>
              <p className="analysis-type-description">Assess disposable income</p>
            </div>

            {/* Card 4: Cashflow Volatility */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="analysis-type-title">Cashflow Volatility</h3>
              <p className="analysis-type-description">Detect financial instability</p>
            </div>

            {/* Card 5: Debt Obligations */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="analysis-type-title">Debt Obligations</h3>
              <p className="analysis-type-description">Track EMIs and loans</p>
            </div>

            {/* Card 6: Spending Patterns */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="analysis-type-title">Spending Patterns</h3>
              <p className="analysis-type-description">Analyze lifestyle spending</p>
            </div>

            {/* Card 7: Investment Readiness */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 7h-3V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="15" r="1"></circle>
                </svg>
              </div>
              <h3 className="analysis-type-title">Investment Readiness</h3>
              <p className="analysis-type-description">Evaluate savings adequacy</p>
            </div>

            {/* Card 8: Tax Optimization */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              </div>
              <h3 className="analysis-type-title">Tax Optimization</h3>
              <p className="analysis-type-description">Identify tax opportunities</p>
            </div>

            {/* Card 9: Irregular Income */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3 className="analysis-type-title">Irregular Income</h3>
              <p className="analysis-type-description">Detect income anomalies</p>
            </div>

            {/* Card 10: Goal-Based Planning */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 className="analysis-type-title">Goal-Based Planning</h3>
              <p className="analysis-type-description">Track financial goals</p>
            </div>

            {/* Card 11: Risk Analysis */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="analysis-type-title">Risk Analysis</h3>
              <p className="analysis-type-description">Assess financial risks</p>
            </div>

            {/* Card 12: AI Reasoning */}
            <div className="analysis-type-card">
              <div className="analysis-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44L2.5 13.5a2.5 2.5 0 0 1 0-3L7.04 2.06A2.5 2.5 0 0 1 9.5 2z"></path>
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44L21.5 13.5a2.5 2.5 0 0 0 0-3L16.96 2.06A2.5 2.5 0 0 0 14.5 2z"></path>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 className="analysis-type-title">AI Reasoning</h3>
              <p className="analysis-type-description">Transparent AI insights</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Smartcashflow;

