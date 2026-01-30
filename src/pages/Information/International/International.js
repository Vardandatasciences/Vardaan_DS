import React, { useEffect } from 'react';
import './International.css';
import Footer from '../../../components/Footer/Footer';

const International = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="international-page">
      <div className="international-container">
        <div className="international-header">
          <h1>International Data Transfers Notice</h1>
          <h2>Vardaan Data Sciences</h2>
          <div className="policy-dates">
            <p><strong>Last Updated:</strong> [Insert Date]</p>
          </div>
        </div>

        <div className="international-content">
          <section className="international-section">
            <h2>1. Overview</h2>
            <p>
              We may transfer your personal data outside your country of residence to provide our services. 
              This notice explains where your data goes and how we protect it during transfers.
            </p>
          </section>

          <section className="international-section">
            <h2>2. Transfer Destinations</h2>
            
            <div className="transfer-locations">
              <div className="location-category">
                <h3>Primary Data Processing Locations</h3>
                <ul>
                  <li><strong>United States</strong> - Cloud hosting and data processing</li>
                  <li><strong>European Union</strong> - EU user data processing and backup</li>
                  <li><strong>India</strong> - Primary operations and customer support</li>
                  <li><strong>Singapore</strong> - Asia-Pacific operations hub</li>
                </ul>
              </div>

              <div className="location-category">
                <h3>Service Provider Locations</h3>
                <ul>
                  <li><strong>Cloud Services:</strong> AWS (US, EU), Google Cloud (US, EU)</li>
                  <li><strong>Analytics:</strong> Google Analytics (US), Mixpanel (US)</li>
                  <li><strong>Communication:</strong> Microsoft 365 (EU), Intercom (US)</li>
                  <li><strong>Payment Processing:</strong> Stripe (US), Local payment gateways</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="international-section">
            <h2>3. GDPR Safeguards (EU Users)</h2>
            
            <div className="gdpr-safeguards">
              <div className="safeguard-category">
                <h3>Adequacy Decisions</h3>
                <p>We transfer data to countries the European Commission considers adequate:</p>
                <ul>
                  <li><strong>Canada</strong> - Adequacy decision in place</li>
                  <li><strong>Japan</strong> - Adequacy decision in place</li>
                  <li><strong>UK</strong> - Adequacy decision in place</li>
                </ul>
              </div>

              <div className="safeguard-category">
                <h3>Standard Contractual Clauses (SCCs)</h3>
                <p>For transfers to non-adequate countries (like US), we use:</p>
                <ul>
                  <li>EU Standard Contractual Clauses (2021 version)</li>
                  <li>Data Processing Agreements with all processors</li>
                  <li>Supplementary Measures where required for data protection</li>
                </ul>
              </div>

              <div className="safeguard-category">
                <h3>Additional Safeguards</h3>
                <ul>
                  <li><strong>Encryption</strong> during transit and at rest</li>
                  <li><strong>Access Controls</strong> limiting who can view EU data</li>
                  <li><strong>Data Minimization</strong> only necessary data transferred</li>
                  <li><strong>Regular Audits</strong> of transfer compliance</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="international-section">
            <h2>4. India DPDPA Compliance</h2>
            
            <div className="dpdpa-compliance">
              <div className="compliance-category">
                <h3>Data Processing Outside India</h3>
                <p><strong>Government Approval Status:</strong> We transfer data to countries and regions that have:</p>
                <ul>
                  <li>Adequate data protection as per government guidelines</li>
                  <li>Bilateral agreements with India for data protection</li>
                  <li>Industry-standard security measures in place</li>
                </ul>
              </div>

              <div className="compliance-category">
                <h3>Approved Transfer Destinations</h3>
                <ul>
                  <li><strong>EU/EEA Countries</strong> - Strong data protection laws</li>
                  <li><strong>United States</strong> - With appropriate safeguards (SCCs, DPAs)</li>
                  <li><strong>Singapore</strong> - Adequate protection framework</li>
                  <li><strong>Canada</strong> - Similar privacy law standards</li>
                </ul>
              </div>

              <div className="compliance-category">
                <h3>Restricted Data</h3>
                <p>Sensitive Personal Data processed in India remains in India unless:</p>
                <ul>
                  <li>Explicit user consent provided</li>
                  <li>Transfer necessary for contract performance</li>
                  <li>Legal obligation requires transfer</li>
                  <li>Adequate protection guaranteed at destination</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="international-section">
            <h2>5. Transfer Purposes</h2>
            
            <div className="transfer-purposes">
              <div className="purpose-category">
                <h3>Why We Transfer Data</h3>
                <ul>
                  <li><strong>Service Delivery</strong> - Cloud hosting and application functionality</li>
                  <li><strong>Customer Support</strong> - Global support team assistance</li>
                  <li><strong>Analytics</strong> - Website and service performance analysis</li>
                  <li><strong>Security</strong> - Fraud prevention and threat detection</li>
                  <li><strong>Compliance</strong> - Legal and regulatory requirements</li>
                </ul>
              </div>

              <div className="purpose-category">
                <h3>Data Categories Transferred</h3>
                <ul>
                  <li><strong>Account Information</strong> - Name, email, company details</li>
                  <li><strong>Usage Data</strong> - Website interactions, service usage</li>
                  <li><strong>Communication Data</strong> - Support messages, feedback</li>
                  <li><strong>Technical Data</strong> - IP addresses, device information</li>
                  <li><strong>Transaction Data</strong> - Payment and billing information</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="international-section">
            <h2>6. Your Rights</h2>
            
            <div className="rights-categories">
              <div className="rights-category">
                <h3>EU Users (GDPR)</h3>
                <ul>
                  <li><strong>Right to Object</strong> to transfers where legally possible</li>
                  <li><strong>Right to Information</strong> about transfer safeguards</li>
                  <li><strong>Right to Lodge Complaints</strong> with data protection authorities</li>
                  <li><strong>Right to Seek Remedies</strong> if transfer safeguards fail</li>
                </ul>
              </div>

              <div className="rights-category">
                <h3>India Users (DPDPA)</h3>
                <ul>
                  <li><strong>Right to Know</strong> where your data is processed</li>
                  <li><strong>Right to Withdraw Consent</strong> for international transfers</li>
                  <li><strong>Right to Grievance Redressal</strong> for transfer concerns</li>
                  <li><strong>Right to Data Localization</strong> for sensitive personal data</li>
                </ul>
              </div>

              <div className="rights-category">
                <h3>How to Exercise Rights</h3>
                <ul>
                  <li><strong>Email:</strong> privacy@vardaanglobal.com</li>
                  <li><strong>Subject:</strong> "International Transfer Rights Request"</li>
                  <li><strong>Include:</strong> Specific concern and preferred resolution</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="international-section">
            <h2>7. Transfer Security</h2>
            
            <div className="security-measures">
              <div className="security-category">
                <h3>Technical Safeguards</h3>
                <ul>
                  <li><strong>TLS 1.3 Encryption</strong> for all data in transit</li>
                  <li><strong>AES-256 Encryption</strong> for data at rest</li>
                  <li><strong>VPN Tunnels</strong> for internal data access</li>
                  <li><strong>Access Logging</strong> and monitoring</li>
                </ul>
              </div>

              <div className="security-category">
                <h3>Legal Safeguards</h3>
                <ul>
                  <li>Data Processing Agreements with all vendors</li>
                  <li>Standard Contractual Clauses for non-adequate countries</li>
                  <li>Regular Compliance Audits of transfer practices</li>
                  <li>Breach Notification procedures in place</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="international-section">
            <h2>8. Vendor Management</h2>
            
            <div className="vendor-management">
              <div className="vendor-category">
                <h3>Due Diligence Process</h3>
                <ul>
                  <li>Security Assessment of all data processors</li>
                  <li>Legal Review of transfer mechanisms</li>
                  <li>Ongoing Monitoring of compliance status</li>
                  <li>Alternative Providers identified for contingency</li>
                </ul>
              </div>

              <div className="vendor-category">
                <h3>Major Service Providers</h3>
                <div className="provider-table">
                  <div className="table-header">
                    <span>Provider</span>
                    <span>Service</span>
                    <span>Location</span>
                    <span>Safeguard</span>
                  </div>
                  <div className="table-row">
                    <span>Google</span>
                    <span>Cloud/Analytics</span>
                    <span>US, EU</span>
                    <span>SCCs + Encryption</span>
                  </div>
                  <div className="table-row">
                    <span>AWS</span>
                    <span>Cloud Hosting</span>
                    <span>US, EU</span>
                    <span>SCCs + DPAs</span>
                  </div>
                  <div className="table-row">
                    <span>Microsoft</span>
                    <span>Communication</span>
                    <span>EU</span>
                    <span>Adequacy + SCCs</span>
                  </div>
                  <div className="table-row">
                    <span>Stripe</span>
                    <span>Payments</span>
                    <span>US</span>
                    <span>SCCs + PCI DSS</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="international-section">
            <h2>9. Monitoring & Updates</h2>
            
            <div className="monitoring-updates">
              <div className="monitoring-category">
                <h3>Regular Reviews</h3>
                <ul>
                  <li>Quarterly assessment of transfer destinations</li>
                  <li>Annual review of safeguard effectiveness</li>
                  <li>Ongoing monitoring of adequacy decisions</li>
                  <li>Immediate response to regulatory changes</li>
                </ul>
              </div>

              <div className="monitoring-category">
                <h3>Policy Updates</h3>
                <h4>Triggers for Updates:</h4>
                <ul>
                  <li>New adequacy decisions</li>
                  <li>Changes in data locations</li>
                  <li>Regulatory requirement changes</li>
                  <li>Service provider modifications</li>
                </ul>
                <p><strong>Notification:</strong> 30 days advance notice for material changes</p>
              </div>
            </div>
          </section>

          <section className="international-section">
            <h2>10. Emergency Procedures</h2>
            
            <div className="emergency-procedures">
              <div className="emergency-category">
                <h3>Government Access Requests</h3>
                <ul>
                  <li>Legal Review of all government requests</li>
                  <li>User Notification where legally permitted</li>
                  <li>Data Minimization in responses</li>
                  <li>Challenge Process for invalid requests</li>
                </ul>
              </div>

              <div className="emergency-category">
                <h3>Adequacy Decision Changes</h3>
                <p>If adequacy status changes:</p>
                <ul>
                  <li>Alternative Safeguards implemented immediately</li>
                  <li>Data Migration to adequate jurisdictions if needed</li>
                  <li>User Notification within 72 hours</li>
                  <li>Enhanced Protection measures activated</li>
                </ul>
              </div>
            </div>
          </section>

          {/* <section className="international-section">
            <h2>11. Contact Information</h2>
            
            <div className="contact-information">
              <div className="contact-category">
                <h3>General Transfer Questions</h3>
                <p><strong>Email:</strong> privacy@vardaanglobal.com</p>
                <p><strong>Response Time:</strong> 5 business days</p>
              </div>

              <div className="contact-category">
                <h3>EU-Specific Inquiries</h3>
                <p><strong>EU Representative:</strong> [Insert if applicable]</p>
                <p><strong>Email:</strong> [eu-rep@vardaanglobal.com]</p>
              </div>

              <div className="contact-category">
                <h3>India-Specific Inquiries</h3>
                <p><strong>Grievance Officer:</strong> [Insert name]</p>
                <p><strong>Email:</strong> grievance@vardaanglobal.com</p>
                <p><strong>Response Time:</strong> 30 days maximum</p>
              </div>

              <div className="contact-category">
                <h3>Data Protection Authorities</h3>
                <p><strong>EU Users:</strong> Contact your local data protection authority</p>
                <p><strong>India Users:</strong> Contact the Data Protection Board of India</p>
              </div>
            </div>
          </section>

          <section className="international-section">
            <h2>12. Documentation</h2>
            
            <div className="documentation">
              <div className="documentation-category">
                <h3>Available Upon Request</h3>
                <ul>
                  <li>Standard Contractual Clauses copies</li>
                  <li>Data Processing Agreements summaries</li>
                  <li>Transfer Impact Assessments (where conducted)</li>
                  <li>Adequacy Decision references</li>
                </ul>
                <p><strong>Request Method:</strong> Email privacy@vardaanglobal.com with "Transfer Documentation Request"</p>
              </div>
            </div>
          </section> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default International; 