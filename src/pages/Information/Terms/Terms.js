import React, { useEffect } from 'react';
import './Terms.css';
import Footer from '../../../components/Footer/Footer';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-page">
      <div className="terms-container">
        <div className="terms-header">
          <h1>Terms of Service</h1>
          <h2>Vardaan Data Sciences</h2>
          <div className="policy-dates">
            <p><strong>Last Updated:</strong> [Insert Date]</p>
          </div>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Agreement</h2>
            <p>
              By using our website and services, you agree to these terms. If you disagree, please don't use our services.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Acceptable Use</h2>
            
            <div className="use-guidelines">
              <div className="allowed-actions">
                <h3>✅ You May</h3>
                <ul>
                  <li>Use our services for legitimate business purposes</li>
                  <li>Create accounts with accurate information</li>
                  <li>Download publicly available resources</li>
                </ul>
              </div>

              <div className="prohibited-actions">
                <h3>❌ You May Not</h3>
                <ul>
                  <li>Use services for illegal activities</li>
                  <li>Transmit harmful code or viruses</li>
                  <li>Scrape or harvest data from our website</li>
                  <li>Harass other users or staff</li>
                  <li>Infringe copyrights or trademarks</li>
                  <li>Share confidential information without permission</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2>3. User Accounts</h2>
            
            <div className="account-details">
              <div className="responsibilities">
                <h3>Your Responsibilities:</h3>
                <ul>
                  <li>Provide accurate account information</li>
                  <li>Keep your password secure</li>
                  <li>Notify us of unauthorized access</li>
                </ul>
              </div>

              <div className="termination-reasons">
                <h3>We May Terminate Accounts for:</h3>
                <ul>
                  <li>Terms violations</li>
                  <li>Fraudulent activity</li>
                  <li>Extended inactivity</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2>4. Intellectual Property</h2>
            
            <div className="ip-details">
              <div className="our-content">
                <h3>Our Content:</h3>
                <p>All website content, logos, and software belong to Vardaan Global.</p>
              </div>

              <div className="your-license">
                <h3>Your License:</h3>
                <p>Limited use for intended purposes only. No copying, modifying, or redistributing without permission.</p>
              </div>

              <div className="user-content">
                <h3>Your Content:</h3>
                <p>You retain ownership but grant us license to use feedback and testimonials.</p>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2>5. User-Generated Content</h2>
            <p>When you submit content (comments, messages, feedback):</p>
            <ul>
              <li>You confirm you own the rights to share it</li>
              <li>We can use it to improve our services</li>
              <li>It must be accurate, respectful, and legal</li>
              <li>We can remove content that violates our terms</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>6. Privacy</h2>
            <p>
              Your data use is governed by our <a href="/privacy-policy" className="policy-link">[Privacy Policy]</a>. 
              We collect only necessary information and protect it with industry-standard security.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Disclaimers</h2>
            
            <div className="disclaimer-content">
              <h3>Services Provided "AS IS":</h3>
              <ul>
                <li>No guarantee of uninterrupted service</li>
                <li>No warranty of complete accuracy</li>
                <li>Not responsible for third-party websites</li>
                <li>Content is informational, not professional advice</li>
              </ul>
            </div>
          </section>

          <section className="terms-section">
            <h2>8. Liability Limits</h2>
            
            <div className="liability-details">
              <div className="maximum-liability">
                <h3>Maximum Liability:</h3>
                <p>Amount you paid us in the past 12 months</p>
              </div>

              <div className="not-liable">
                <h3>Not Liable For:</h3>
                <ul>
                  <li>Indirect or consequential damages</li>
                  <li>Lost profits or data</li>
                  <li>Third-party actions</li>
                  <li>Events beyond our control</li>
                </ul>
              </div>

              <div className="claims-deadline">
                <h3>Claims Deadline:</h3>
                <p>Must be brought within 1 year</p>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2>9. Termination</h2>
            
            <div className="termination-details">
              <div className="user-termination">
                <h3>You Can:</h3>
                <p>Close your account anytime</p>
              </div>

              <div className="company-termination">
                <h3>We Can:</h3>
                <p>Terminate for terms violations or with 30 days' notice</p>
              </div>

              <div className="after-termination">
                <h3>After Termination:</h3>
                <p>Access ends immediately, data may be deleted, legal obligations survive</p>
              </div>
            </div>
          </section>

          {/* <section className="terms-section">
            <h2>10. Legal</h2>
            
            <div className="legal-details">
              <ul>
                <li><strong>Governing Law:</strong> [Insert Jurisdiction]</li>
                <li><strong>Disputes:</strong> Courts of [Insert Location]</li>
                <li><strong>Class Actions:</strong> Individual disputes only</li>
                <li><strong>International Users:</strong> Responsible for local law compliance</li>
              </ul>
            </div>
          </section> */}

          <section className="terms-section">
            <h2>10. Changes</h2>
            <p>
              We may update these terms anytime. Continued use means acceptance. 
              Material changes get 30 days' notice.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms; 