import React, { useEffect } from 'react';
import './Cookie.css';
import Footer from '../../../components/Footer/Footer';

const Cookie = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cookie-page">
      <div className="cookie-container">
        <div className="cookie-header">
          <h1>Cookie Policy</h1>
          <h2>Vardaan Data Sciences</h2>
        </div>

        <div className="cookie-content">
          <section className="cookie-section">
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit our website. We use cookies to 
              improve your experience, analyze site usage, and deliver relevant content.
            </p>
          </section>

          <section className="cookie-section">
            <h2>Types of Cookies We Use</h2>
            
            <div className="cookie-type">
              <h3>🔧 Essential Cookies (Always Active)</h3>
              <ul>
                <li><strong>Purpose:</strong> Required for website functionality and security</li>
                <li><strong>Examples:</strong> Login sessions, security protection, load balancing</li>
                <li><strong>Cannot be disabled:</strong> These are necessary for our site to work</li>
              </ul>
            </div>

            <div className="cookie-type">
              <h3>📊 Performance Cookies</h3>
              <ul>
                <li><strong>Purpose:</strong> Help us understand how visitors use our website</li>
                <li><strong>Examples:</strong> Google Analytics, page views, user behavior tracking</li>
                <li><strong>Data collected:</strong> Traffic sources, popular pages, site performance</li>
                <li><strong>User control:</strong> Can be disabled in cookie settings</li>
              </ul>
            </div>

            <div className="cookie-type">
              <h3>⚙️ Functional Cookies</h3>
              <ul>
                <li><strong>Purpose:</strong> Remember your preferences and enhance functionality</li>
                <li><strong>Examples:</strong> Language preferences, chat support, display settings</li>
                <li><strong>User control:</strong> Can be disabled (may affect some features)</li>
              </ul>
            </div>

            <div className="cookie-type">
              <h3>🎯 Marketing Cookies</h3>
              <ul>
                <li><strong>Purpose:</strong> Deliver relevant advertisements and measure campaigns</li>
                <li><strong>Examples:</strong> Facebook Pixel, Google Ads, LinkedIn tracking</li>
                <li><strong>Data collected:</strong> Website visits, conversions, ad interactions</li>
                <li><strong>User control:</strong> Can be disabled in cookie settings</li>
              </ul>
            </div>
          </section>

          <section className="cookie-section">
            <h2>Third-Party Cookies</h2>
            <p>We use cookies from trusted partners including:</p>
            <div className="third-party-list">
              <div className="partner-item">
                <h4>Google Analytics</h4>
                <p>Website performance analysis</p>
              </div>
              <div className="partner-item">
                <h4>Google Ads</h4>
                <p>Advertising and remarketing</p>
              </div>
              <div className="partner-item">
                <h4>Facebook Pixel</h4>
                <p>Social media advertising</p>
              </div>
              <div className="partner-item">
                <h4>LinkedIn</h4>
                <p>B2B marketing campaigns</p>
              </div>
              <div className="partner-item">
                <h4>Intercom</h4>
                <p>Customer support chat</p>
              </div>
              <div className="partner-item">
                <h4>HubSpot</h4>
                <p>Marketing automation</p>
              </div>
            </div>
            <p>Each partner has their own privacy policy governing their cookie use.</p>
          </section>

          <section className="cookie-section">
            <h2>Your Cookie Choices</h2>
            
            <h3>Cookie Consent Banner</h3>
            <p>When you first visit, you can choose:</p>
            <ul>
              <li><strong>Accept All:</strong> Allow all cookie types</li>
              <li><strong>Reject Non-Essential:</strong> Only essential cookies</li>
              <li><strong>Cookie Settings:</strong> Choose specific categories</li>
            </ul>

            <h3>Manage Preferences</h3>
            <ul>
              <li><strong>Cookie Settings:</strong> Access through website footer or [Cookie Preferences Link]</li>
              <li><strong>Browser Controls:</strong> Disable cookies in your browser settings</li>
              <li><strong>Withdraw Consent:</strong> Change your mind anytime in cookie settings</li>
            </ul>

            <h3>Granular Controls</h3>
            <div className="cookie-controls">
              <div className="control-item always-on">
                <span className="control-icon">✅</span>
                <span className="control-label">Essential (Always on)</span>
              </div>
              <div className="control-item">
                <span className="control-icon">☐</span>
                <span className="control-label">Performance (Toggle on/off)</span>
              </div>
              <div className="control-item">
                <span className="control-icon">☐</span>
                <span className="control-label">Functional (Toggle on/off)</span>
              </div>
              <div className="control-item">
                <span className="control-icon">☐</span>
                <span className="control-label">Marketing (Toggle on/off)</span>
              </div>
            </div>
          </section>

          <section className="cookie-section">
            <h2>Browser Controls</h2>
            <div className="browser-controls">
              <div className="browser-item">
                <h4>Chrome</h4>
                <p>Settings → Privacy → Cookies</p>
              </div>
              <div className="browser-item">
                <h4>Firefox</h4>
                <p>Settings → Privacy & Security → Cookies</p>
              </div>
              <div className="browser-item">
                <h4>Safari</h4>
                <p>Preferences → Privacy → Cookies</p>
              </div>
              <div className="browser-item">
                <h4>Edge</h4>
                <p>Settings → Cookies and site permissions</p>
              </div>
            </div>
          </section>

          <section className="cookie-section">
            <h2>Data Retention</h2>
            <ul>
              <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent cookies:</strong> Stored until expiration (maximum 2 years)</li>
              <li><strong>Analytics data:</strong> Retained for 26 months, then anonymized</li>
              <li><strong>Marketing data:</strong> Retained for 13 months or until consent withdrawal</li>
            </ul>
          </section>

          <section className="cookie-section">
            <h2>Your Rights</h2>
            <ul>
              <li><strong>Access:</strong> Know what cookies we use</li>
              <li><strong>Control:</strong> Enable/disable cookie categories</li>
              <li><strong>Delete:</strong> Remove existing cookies anytime</li>
              <li><strong>Withdraw:</strong> Change consent preferences</li>
              <li><strong>Portability:</strong> Request your cookie data</li>
            </ul>
            <div className="rights-notice">
              <p><strong>GDPR Users:</strong> Additional rights under European law</p>
              <p><strong>California Users:</strong> Cookie data may be considered personal information under CCPA</p>
            </div>
          </section>

          <section className="cookie-section">
            <h2>Updates</h2>
            <p>We may update this policy when we add new cookies or change practices. We'll notify you through:</p>
            <ul>
              <li>Website banner</li>
              <li>Email (for account holders)</li>
              <li>Updated date on this page</li>
            </ul>
            <p>Continued use means you accept any updates.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cookie; 