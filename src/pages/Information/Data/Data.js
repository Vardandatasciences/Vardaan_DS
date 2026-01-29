import React, { useEffect } from 'react';
import './Data.css';
import Footer from '../../../components/Footer/Footer';

const Data = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="data-page">
      <div className="data-container">
        <div className="data-header">
          <h1>Data Retention & Deletion Policy</h1>
          <h2>Vardaan Data Sciences</h2>
          <div className="policy-dates">
            <p><strong>Last Updated:</strong> [Insert Date]</p>
          </div>
        </div>

        <div className="data-content">
          <section className="data-section">
            <h2>1. Overview</h2>
            <p>
              This policy explains how long we keep your data, when we delete it, and how you can request deletion.
            </p>
          </section>

          <section className="data-section">
            <h2>2. Data Retention Periods</h2>
            
            <div className="retention-categories">
              <div className="retention-category">
                <h3>Account Data</h3>
                <ul>
                  <li><strong>Active Accounts:</strong> Retained while account is active</li>
                  <li><strong>Closed Accounts:</strong> 7 years after closure for legal compliance</li>
                  <li><strong>Inactive Accounts:</strong> 3 years without login, then deleted</li>
                </ul>
              </div>

              <div className="retention-category">
                <h3>Transaction & Business Data</h3>
                <ul>
                  <li><strong>Invoices & Payments:</strong> 7 years for tax and accounting requirements</li>
                  <li><strong>Contracts & Agreements:</strong> Duration of contract + 7 years</li>
                  <li><strong>Support Tickets:</strong> 5 years from last interaction</li>
                </ul>
              </div>

              <div className="retention-category">
                <h3>Marketing & Communication</h3>
                <ul>
                  <li><strong>Email Lists:</strong> Until unsubscribe or 3 years of inactivity</li>
                  <li><strong>Website Analytics:</strong> 26 months, then anonymized</li>
                  <li><strong>Marketing Campaigns:</strong> 13 months after campaign end</li>
                </ul>
              </div>

              <div className="retention-category">
                <h3>Technical Data</h3>
                <ul>
                  <li><strong>Log Files:</strong> 12 months maximum</li>
                  <li><strong>Security Logs:</strong> 2 years for fraud prevention</li>
                  <li><strong>Backup Data:</strong> 90 days in secure storage</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="data-section">
            <h2>3. Deletion Criteria</h2>
            
            <div className="deletion-types">
              <div className="deletion-type">
                <h3>Automatic Deletion</h3>
                <h4>Triggered By:</h4>
                <ul>
                  <li>Account inactivity (3+ years)</li>
                  <li>End of retention period</li>
                  <li>Legal requirement expiry</li>
                  <li>System cleanup schedules</li>
                </ul>
              </div>

              <div className="deletion-type">
                <h3>Manual Deletion</h3>
                <h4>User Requests:</h4>
                <ul>
                  <li>Account deletion requests</li>
                  <li>Right to erasure (GDPR)</li>
                  <li>"Do Not Sell" requests (CCPA)</li>
                  <li>Data portability followed by deletion</li>
                </ul>
              </div>

              <div className="deletion-type">
                <h3>Legal Holds</h3>
                <h4>Data Preserved When:</h4>
                <ul>
                  <li>Active legal proceedings</li>
                  <li>Regulatory investigations</li>
                  <li>Contractual obligations</li>
                  <li>Fraud prevention needs</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="data-section">
            <h2>4. Deletion Process</h2>
            
            {/* Row 1: User Request Information */}
            <div className="deletion-process-row">
              <div className="request-info">
                <h3>User-Requested Deletion</h3>
                <div className="request-details">
                  <h4>How to Request:</h4>
                  <ul>
                    <li><strong>Include:</strong> Full name, email, account details</li>
                    <li><strong>Verification required for security</strong></li>
                  </ul>
                </div>
              </div>
            </div>



            {/* Row 2: Data Categories */}
            <div className="deletion-process-row">
              <div className="data-categories">
                <div className="data-category removed">
                  <h3>What Gets Deleted</h3>
                  <h4>Immediately Removed:</h4>
                  <ul>
                    <li>Personal contact information</li>
                    <li>Account preferences and settings</li>
                    <li>Marketing profile data</li>
                    <li>Unnecessary technical logs</li>
                  </ul>
                </div>

                <div className="data-category anonymized">
                  <h3>Anonymized (Not Deleted):</h3>
                  <ul>
                    <li>Aggregated analytics data</li>
                    <li>Financial transaction records (legal requirement)</li>
                    <li>Security incident reports</li>
                    <li>System performance metrics</li>
                  </ul>
                </div>

                <div className="data-category cannot-delete">
                  <h3>What We Cannot Delete</h3>
                  <h4>Legal Requirements:</h4>
                  <ul>
                    <li>Tax and accounting records (7 years)</li>
                    <li>Contract-related data (duration + 7 years)</li>
                    <li>Fraud prevention records (2 years)</li>
                    <li>Regulatory compliance data (varies by law)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="data-section">
            <h2>5. Data Anonymization</h2>
            
            <div className="anonymization-details">
              <div className="process-details">
                <h3>Process</h3>
                <ul>
                  <li><strong>Anonymous Data:</strong> All personal identifiers removed</li>
                  <li><strong>Aggregated Data:</strong> Combined with other users' data</li>
                  <li><strong>Pseudonymized Data:</strong> Replaced with non-identifying codes</li>
                  <li><strong>Irreversible:</strong> Cannot be linked back to individuals</li>
                </ul>
              </div>

              <div className="uses-details">
                <h3>Uses of Anonymous Data</h3>
                <ul>
                  <li>Service improvement and development</li>
                  <li>Industry benchmarking and research</li>
                  <li>Statistical analysis and reporting</li>
                  <li>Product feature planning</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="data-section">
            <h2>6. Backup & Recovery</h2>
            
            <div className="backup-details">
              <div className="backup-retention">
                <h3>Backup Retention</h3>
                <ul>
                  <li><strong>Primary Backups:</strong> 30 days</li>
                  <li><strong>Archive Backups:</strong> 90 days</li>
                  <li><strong>Disaster Recovery:</strong> 1 year maximum</li>
                </ul>
              </div>

              <div className="backup-deletion">
                <h3>Deletion from Backups</h3>
                <ul>
                  <li>Deleted data removed from next backup cycle</li>
                  <li>Legacy backups expire automatically</li>
                  <li>Emergency recovery may temporarily restore deleted data</li>
                  <li>Re-deletion performed if data restored</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="data-section">
            <h2>7. Third-Party Data</h2>
            
            <div className="third-party-details">
              <div className="service-providers">
                <h3>Service Providers</h3>
                <ul>
                  <li><strong>Our Responsibility:</strong> Ensure partners delete data per agreements</li>
                  <li><strong>Timeline:</strong> 90 days after our deletion</li>
                  <li><strong>Verification:</strong> Confirmation of deletion from major partners</li>
                </ul>
              </div>

              <div className="data-processors">
                <h3>Data Processors</h3>
                <ul>
                  <li><strong>Google Analytics:</strong> Automatically expires per retention settings</li>
                  <li><strong>Email providers:</strong> Deleted within 30 days of our request</li>
                  <li><strong>Cloud storage:</strong> Immediate deletion with verification</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="data-section">
            <h2>8. Geographic Considerations</h2>
            
            <div className="geographic-regulations">
              <div className="regulation gdpr">
                <h3>GDPR (EU Users)</h3>
                <ul>
                  <li><strong>Right to Erasure:</strong> 30 days maximum</li>
                  <li><strong>Exceptions:</strong> Legal obligations, public interest</li>
                  <li><strong>Proof:</strong> Deletion confirmation provided</li>
                </ul>
              </div>

              <div className="regulation ccpa">
                <h3>CCPA (California Users)</h3>
                <ul>
                  <li><strong>Deletion Rights:</strong> Personal information and inferences</li>
                  <li><strong>Verification:</strong> Identity confirmation required</li>
                  <li><strong>Timeline:</strong> 45 days (extendable to 90 days)</li>
                </ul>
              </div>

              <div className="regulation dpdpa">
                <h3>DPDPA (India Users)</h3>
                <ul>
                  <li><strong>Erasure Rights:</strong> When purpose fulfilled or consent withdrawn</li>
                  <li><strong>Timeline:</strong> "Without undue delay"</li>
                  <li><strong>Exceptions:</strong> Legal compliance requirements</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="data-section">
            <h2>9. Data Subject Rights</h2>
            
            <div className="rights-details">
              <div className="request-types">
                <h3>Request Types</h3>
                <ul>
                  <li><strong>Access:</strong> What data we have about you</li>
                  <li><strong>Correction:</strong> Fix inaccurate information</li>
                  <li><strong>Deletion:</strong> Remove your personal data</li>
                  <li><strong>Portability:</strong> Download your data</li>
                  <li><strong>Restriction:</strong> Limit how we use your data</li>
                </ul>
              </div>

              <div className="how-to-exercise">
                <h3>How to Exercise Rights</h3>
                <ul>
                  <li><strong>Include:</strong> Specific request type and verification details</li>
                  <li><strong>Response:</strong> Within 30 days (may extend to 90 days for complex requests)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="data-section">
            <h2>10. Monitoring & Compliance</h2>
            
            <div className="compliance-details">
              <div className="regular-reviews">
                <h3>Regular Reviews</h3>
                <ul>
                  <li><strong>Data Audits:</strong> Quarterly review of retention practices</li>
                  <li><strong>Policy Updates:</strong> Annual review and updates as needed</li>
                  <li><strong>Staff Training:</strong> Regular training on data handling procedures</li>
                </ul>
              </div>

              <div className="compliance-tracking">
                <h3>Compliance Tracking</h3>
                <ul>
                  <li>Automated deletion schedules</li>
                  <li>Manual deletion logs</li>
                  <li>User request tracking</li>
                  <li>Legal hold management</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="data-section">
            <h2>11. Exceptions & Special Cases</h2>
            
            <div className="exceptions-details">
              <div className="cannot-delete">
                <h3>Cannot Delete When</h3>
                <ul>
                  <li>Active legal proceedings</li>
                  <li>Ongoing contract obligations</li>
                  <li>Fraud investigation in progress</li>
                  <li>Regulatory investigation pending</li>
                </ul>
              </div>

              <div className="partial-deletion">
                <h3>Partial Deletion</h3>
                <p>Some data may be:</p>
                <ul>
                  <li>Anonymized instead of deleted</li>
                  <li>Retained for specific legal periods</li>
                  <li>Kept in aggregated form only</li>
                  <li>Preserved for legitimate interests</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="data-section">
            <h2>12. Updates</h2>
            <p>We may update this policy to reflect:</p>
            <ul>
              <li>Changes in data practices</li>
              <li>New legal requirements</li>
              <li>User feedback and requests</li>
            </ul>
            <p>
              <strong>Notification:</strong> Email and website notice 30 days before major changes take effect.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Data; 