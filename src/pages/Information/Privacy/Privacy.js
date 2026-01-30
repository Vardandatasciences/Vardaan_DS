import React, { useEffect } from 'react';
import './Privacy.css';
import Footer from '../../../components/Footer/Footer';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <h2>Vardaan Data Sciences</h2>
          <div className="policy-dates">
            {/* Removed Effective Date and Last Updated section */}
          </div>
        </div>

        <div className="privacy-content">
          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              Vardaan Global ("we," "our," or "us") is committed to protecting and respecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information 
              when you visit our website, use our services, or interact with us in any capacity.
            </p>
            <p>
              This policy applies to all users globally and complies with applicable data protection laws including 
              the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA/CPRA), and 
              India's Digital Personal Data Protection Act (DPDPA).
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information You Provide</h3>
            <p>We may collect the following categories of personal information that you voluntarily provide:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, postal address</li>
              <li><strong>Business Information:</strong> Company name, job title, industry, business requirements</li>
              <li><strong>Account Information:</strong> Username, password, preferences, profile details</li>
              <li><strong>Communication Data:</strong> Messages, inquiries, feedback, support requests</li>
              <li><strong>Transaction Information:</strong> Payment details, billing address, purchase history</li>
              <li><strong>Marketing Preferences:</strong> Subscription choices, communication preferences</li>
            </ul>

            <h3>2.2 Information Automatically Collected</h3>
            <p>We automatically collect certain technical information when you visit our website:</p>
            <ul>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns, referral sources</li>
              <li><strong>Cookies and Tracking Technologies:</strong> Session cookies, persistent cookies, web beacons, analytics tags</li>
              <li><strong>Location Data:</strong> General geographic location based on IP address</li>
              <li><strong>Performance Data:</strong> Website loading times, error reports, system diagnostics</li>
            </ul>

            <h3>2.3 Information from Third Parties</h3>
            <p>We may receive information from:</p>
            <ul>
              <li><strong>Business Partners:</strong> Joint marketing initiatives, referral programs</li>
              <li><strong>Public Sources:</strong> Publicly available business directories, social media profiles</li>
              <li><strong>Service Providers:</strong> Analytics platforms, marketing tools, payment processors</li>
              <li><strong>Social Media Platforms:</strong> When you interact with our social media pages</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. Purpose of Data Collection and Legal Basis</h2>
            
            <h3>3.1 Primary Purposes</h3>
            <p>We process your personal information for the following purposes:</p>
            
            <h4>Service Delivery</h4>
            <ul>
              <li>Providing and maintaining our services</li>
              <li>Processing transactions and fulfilling orders</li>
              <li>Customer support and communication</li>
              <li>Account management and authentication</li>
            </ul>

            <h4>Business Operations</h4>
            <ul>
              <li>Internal analytics and business intelligence</li>
              <li>Quality assurance and service improvement</li>
              <li>Compliance with legal obligations</li>
              <li>Fraud prevention and security</li>
            </ul>

            <h4>Marketing and Communication</h4>
            <ul>
              <li>Sending promotional materials and newsletters</li>
              <li>Conducting market research and surveys</li>
              <li>Personalizing user experience</li>
              <li>Building customer relationships</li>
            </ul>

            <h3>3.2 Legal Basis for Processing (GDPR)</h3>
            <p>Our legal basis for processing includes:</p>
            <ul>
              <li><strong>Consent:</strong> Where you have given clear consent for specific purposes</li>
              <li><strong>Contractual Necessity:</strong> Processing necessary to perform our contract with you</li>
              <li><strong>Legitimate Interests:</strong> Our legitimate business interests that don't override your rights</li>
              <li><strong>Legal Obligation:</strong> Compliance with applicable laws and regulations</li>
              <li><strong>Vital Interests:</strong> Protection of life or physical safety in emergency situations</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Data Sharing and Third Parties</h2>
            
            <h3>4.1 Categories of Recipients</h3>
            <p>We may share your information with:</p>
            
            <h4>Service Providers</h4>
            <ul>
              <li>Cloud hosting providers (AWS, Google Cloud, Microsoft Azure)</li>
              <li>Payment processors (Stripe, PayPal, banking partners)</li>
              <li>Analytics providers (Google Analytics, Mixpanel)</li>
              <li>Marketing platforms (Mailchimp, HubSpot)</li>
              <li>Customer support tools (Zendesk, Intercom)</li>
            </ul>

            <h4>Business Partners</h4>
            <ul>
              <li>Joint venture partners</li>
              <li>Authorized resellers and distributors</li>
              <li>Integration partners</li>
              <li>Referral partners</li>
            </ul>

            <h4>Legal and Compliance</h4>
            <ul>
              <li>Law enforcement agencies (when legally required)</li>
              <li>Regulatory authorities</li>
              <li>Legal advisors and auditors</li>
              <li>Court orders and legal processes</li>
            </ul>

            <h3>4.2 International Data Transfers</h3>
            <p>We may transfer your data to countries outside your residence, including:</p>
            <ul>
              <li>United States (with appropriate safeguards)</li>
              <li>European Union member states</li>
              <li>Countries with adequate data protection levels</li>
              <li>Third countries with Standard Contractual Clauses (SCCs)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>5. Data Storage and Retention</h2>
            
            <h3>5.1 Storage Locations</h3>
            <p>Your data is stored in secure data centers located in:</p>
            <ul>
              <li><strong>Primary:</strong> [Specify primary region - e.g., "United States and European Union"]</li>
              <li><strong>Backup:</strong> [Specify backup locations]</li>
              <li>Cloud providers with SOC 2 Type II certification</li>
            </ul>

            <h3>5.2 Retention Periods</h3>
            <p>We retain your personal information for the following periods:</p>
            <ul>
              <li><strong>Account Data:</strong> Duration of active account plus 7 years after closure</li>
              <li><strong>Transaction Records:</strong> 7 years for accounting and tax purposes</li>
              <li><strong>Marketing Data:</strong> Until withdrawal of consent or 3 years of inactivity</li>
              <li><strong>Support Communications:</strong> 5 years from last interaction</li>
              <li><strong>Legal Compliance:</strong> As required by applicable laws (up to 10 years)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>6. Your Rights and Choices</h2>
            
            <h3>6.1 Universal Rights</h3>
            <p>Regardless of your location, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request information about how we process your data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data Portability:</strong> Receive your data in a machine-readable format</li>
            </ul>

            <h3>6.2 GDPR Rights (EU Residents)</h3>
            <p>If you are in the European Union, you additionally have:</p>
            <ul>
              <li><strong>Right to Restriction:</strong> Limit how we process your data</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              <li><strong>Right to Lodge a Complaint:</strong> Contact your local data protection authority</li>
              <li><strong>EU Representative:</strong> [Insert EU representative details if applicable]</li>
            </ul>

            <h3>6.3 CCPA/CPRA Rights (California Residents)</h3>
            <p>California residents have the right to:</p>
            <ul>
              <li><strong>Know:</strong> What personal information we collect and how it's used</li>
              <li><strong>Delete:</strong> Request deletion of personal information</li>
              <li><strong>Opt-out:</strong> Opt-out of the sale or sharing of personal information</li>
              <li><strong>Non-discrimination:</strong> Equal service regardless of privacy choices</li>
              <li><strong>Correct:</strong> Correct inaccurate personal information</li>
              <li><strong>Limit:</strong> Limit the use of sensitive personal information</li>
            </ul>
            <p>
              <strong>"Do Not Sell or Share My Personal Information":</strong> We do not sell personal information 
              in the traditional sense, but some data sharing for targeted advertising may qualify as "selling" 
              under CCPA. [Click here to opt-out link].
            </p>

            <h3>6.4 DPDPA Rights (India Residents)</h3>
            <p>Indian residents have the right to:</p>
            <ul>
              <li><strong>Access and Correction:</strong> Obtain and correct personal data</li>
              <li><strong>Data Portability:</strong> Transfer data to another data fiduciary</li>
              <li><strong>Erasure:</strong> Request deletion when no longer necessary</li>
              <li><strong>Grievance Redressal:</strong> File complaints through our grievance mechanism</li>
            </ul>
            <p>
              <strong>Consent Notice:</strong> By using our services, you consent to the collection and processing 
              of your personal data as described in this policy.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7. Security Measures</h2>
            <p>We implement comprehensive security measures including:</p>
            
            <h3>Technical Safeguards</h3>
            <ul>
              <li>End-to-end encryption for data transmission</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Multi-factor authentication for admin access</li>
              <li>Regular security audits and penetration testing</li>
            </ul>

            <h3>Organizational Measures</h3>
            <ul>
              <li>Employee training on data protection</li>
              <li>Access controls and need-to-know principles</li>
              <li>Data processing agreements with vendors</li>
              <li>Incident response and breach notification procedures</li>
            </ul>

            <h3>Physical Security</h3>
            <ul>
              <li>Secure data centers with biometric access</li>
              <li>24/7 monitoring and surveillance</li>
              <li>Redundant power and cooling systems</li>
              <li>Disaster recovery capabilities</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>8. Cookies and Tracking Technologies</h2>
            
            <h3>8.1 Types of Cookies</h3>
            <p>We use the following categories of cookies:</p>
            <ul>
              <li><strong>Strictly Necessary:</strong> Essential for website functionality</li>
              <li><strong>Performance:</strong> Analytics and website optimization</li>
              <li><strong>Functional:</strong> Remember your preferences and settings</li>
              <li><strong>Targeting:</strong> Personalized advertising and content</li>
            </ul>

            <h3>8.2 Cookie Management</h3>
            <p>You can control cookies through:</p>
            <ul>
              <li>Browser settings (Chrome, Firefox, Safari, Edge)</li>
              <li>Our cookie consent banner</li>
              <li>Third-party opt-out tools</li>
              <li>Industry opt-out pages (NAI, DAA)</li>
            </ul>

            <h3>8.3 Third-Party Analytics</h3>
            <p>We use analytics services including:</p>
            <ul>
              <li>Google Analytics (with IP anonymization)</li>
              <li>[Other analytics tools used]</li>
            </ul>
            <p>For Google Analytics opt-out: [Google Analytics Opt-out Browser Add-on]</p>
          </section>

          <section className="privacy-section">
            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 (or 16 in the EU). We do not knowingly collect 
              personal information from children. If we become aware that we have collected information from a child, 
              we will delete it promptly and restrict that individual from further access.
            </p>
            <p>
              Parents or guardians who believe their child has provided information should contact us immediately.
            </p>
          </section>

          <section className="privacy-section">
            <h2>10. Updates to This Policy</h2>
            <p>We may update this Privacy Policy periodically to reflect:</p>
            <ul>
              <li>Changes in our practices</li>
              <li>New legal requirements</li>
              <li>Feedback from users and regulators</li>
              <li>Business developments</li>
            </ul>
            
            <p><strong>Notification of Changes:</strong> We will notify you of material changes through:</p>
            <ul>
              <li>Email notification (for account holders)</li>
              <li>Website banner or notice</li>
              <li>In-app notifications</li>
              <li>Updated "Last Modified" date</li>
            </ul>
            <p>
              Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="privacy-section">
            <h2>11. Contact Information</h2>
            
            <h3>11.1 General Privacy Inquiries</h3>
            <div className="contact-info">
              <p><strong>Vardaan Global Privacy Team</strong></p>
              <p><strong>Email:</strong> info@vardaanglobal.com</p>
              {/* <p><strong>Phone:</strong> [Insert phone number]</p>
              <p><strong>Address:</strong> [Insert physical address]</p> */}
            </div>

            <h3>11.2 Data Protection Officer (DPO)</h3>
            <p>If applicable under GDPR:</p>
            <div className="contact-info">
              <p><strong>Data Protection Officer</strong></p>
              <p><strong>Email:</strong> info@vardaanglobal.com</p>
              {/* <p><strong>Address:</strong> [DPO address]</p> */}
            </div>

            {/* <h3>11.3 Regional Representatives</h3>
            <p><strong>European Union Representative (if applicable):</strong></p>
            <p>[Insert EU representative details]</p>
            
            <p><strong>UK Representative (if applicable):</strong></p>
            <p>[Insert UK representative details]</p>

            <h3>11.4 Grievance Redressal (India)</h3>
            <div className="contact-info">
              <p><strong>Grievance Officer</strong></p>
              <p><strong>Name:</strong> [Insert name]</p>
              <p><strong>Email:</strong> grievance@vardaanglobal.com</p>
              <p><strong>Phone:</strong> [Insert phone number]</p>
              <p><strong>Response Time:</strong> 30 days maximum</p>
            </div> */}
          </section>

          <section className="privacy-section">
            <h2>12. Regulatory Compliance</h2>
            <p>This Privacy Policy is designed to comply with:</p>
            <ul>
              <li>General Data Protection Regulation (GDPR) - EU Regulation 2016/679</li>
              <li>California Consumer Privacy Act (CCPA) - California Civil Code Section 1798.100</li>
              <li>California Privacy Rights Act (CPRA) - Amendment to CCPA</li>
              <li>Digital Personal Data Protection Act (DPDPA) - India Act 2023</li>
              <li>Personal Information Protection and Electronic Documents Act (PIPEDA) - Canada</li>
              <li>Privacy Act 1988 - Australia</li>
              <li>Lei Geral de Proteção de Dados (LGPD) - Brazil</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>13. Additional Information</h2>
            
            <h3>13.1 Cross-Border Data Transfers</h3>
            <p>For international transfers, we ensure adequate protection through:</p>
            <ul>
              <li>European Commission adequacy decisions</li>
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Binding Corporate Rules (BCRs)</li>
              <li>Certification schemes</li>
            </ul>

            <h3>13.2 Automated Decision Making</h3>
            <p>We may use automated processing for:</p>
            <ul>
              <li>Fraud detection and prevention</li>
              <li>Service personalization</li>
              <li>Risk assessment</li>
              <li>Customer support routing</li>
            </ul>
            <p>
              You have the right to request human intervention in automated decisions that significantly affect you.
            </p>

            <h3>13.3 Data Minimization</h3>
            <p>We practice data minimization by:</p>
            <ul>
              <li>Collecting only necessary information</li>
              <li>Regular data audits and purging</li>
              <li>Purpose limitation</li>
              <li>Storage limitation</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
