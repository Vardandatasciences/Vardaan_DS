import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VictaaShowcase.css';
 
// Simple QR code SVG for Adobe Express
const qrCodeImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IndoaXRlIi8+PGEgaHJlZj0iaHR0cHM6Ly93d3cuYWRvYmUuY29tL2V4cHJlc3MvZmVhdHVyZS9pbWFnZS9xci1jb2RlLWdlbmVyYXRvci8iPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9ImJsYWNrIi8+PC9hPjwvc3ZnPg==';
 
const VictaaShowcase = () => {
  const navigate = useNavigate();
 
  const handleDemoClick = () => {
    navigate('/victaa');
  };
 
  return (
    <div className="vs-showcase-container">
      {/* Hero Section */}
      <section className="vs-hero-section">
        <div className="vs-hero-content">
          <h1 className="vs-hero-title">
            ViCTAA
          </h1>
          <p className="vs-hero-subtitle">
            Intelligent, agentless endpoint security—designed for proactive leaders.
          </p>
          <p className="vs-hero-description">
            ViCTAA is a Lightweight, agentless endpoint security solution that continuously scans for vulnerabilities, compliance gaps, and performance issues—without disrupting users.
            It offers centralized USB/web access control, real-time alerts, deep diagnostics, and automated threat reporting for 24/7 infrastructure protection
          </p>
        </div>
      </section>
 
      {/* Urgency Section */}
      <section className="vs-urgency-section">
        <div className="vs-container">
          <h2 className="vs-section-title">
            Urgency of Now – The Need for a Transformation in Endpoint Security
          </h2>
          <div className="vs-content-text">
            <p>
              Endpoints remain one of the most exploited vectors in cyberattacks, and the situation is escalating. In 2024, over 68% of security breaches were traced back to endpoint vulnerabilities, misconfigurations, or unauthorized access. The cost of endpoint-related incidents crossed $11.5 billion globally—with an average breach taking over 200 days to detect.
            </p>
            <p>
              At the same time, IT and security teams are overwhelmed. Manual audits, siloed monitoring tools, and fragmented diagnostics create blind spots and delays—leaving organizations exposed to silent threats. Add to that the surge in remote and hybrid workforces, and the attack surface has expanded dramatically.
            </p>
            <p>
              Enterprises today require always-on visibility, automated threat detection, and agentless speed to stay ahead of vulnerabilities and maintain compliance. As regulatory mandates expand and cyberattacks become faster and more sophisticated, relying on periodic, reactive endpoint checks is no longer an option.
            </p>
            <p className="vs-emphasis-text">
              This is the moment for a fundamental shift: from manual firefighting to continuous, intelligent endpoint protection—with zero disruption to users or operations.
            </p>
          </div>
        </div>
      </section>
 
      {/* ViCTAA Response Section */}
      <section className="vs-response-section">
        <div className="vs-container">
          <h2 className="vs-section-title">
            ViCTAA: Vardaan's Response to the Endpoint Security Crisis
          </h2>
          <div className="vs-content-text">
            <p>
              ViCTAA is Vardaan's purpose-built answer to today's endpoint security realities—where every system, port, and misconfiguration can become a breach vector if not monitored and remediated in real time.
            </p>
            <p>
              Engineered for speed, scale, and simplicity, ViCTAA delivers intelligent, agentless endpoint scanning that continuously detects vulnerabilities, compliance issues, and system health risks—without interrupting users or draining IT bandwidth.
            </p>
            <p>
              Whether you're managing hundreds or thousands of distributed devices, ViCTAA empowers IT, Security, and Compliance teams with instant visibility, smart remediation, and plug-and-play integrations into your existing SIEM, GRC, or ITSM stack.
            </p>
            <p className="vs-emphasis-text">
              ViCTAA helps teams move from reactive diagnostics to proactive infrastructure hardening, ensuring that endpoints aren't just secure—but resilient, compliant, and future-ready.
            </p>
          </div>
        </div>
      </section>
 
      {/* Problem vs Solution Section */}
      <section className="vs-problem-solution-section">
        <div className="vs-container">
          <div className="vs-problem-solution-grid">
            {/* Problem */}
            <div className="vs-problem-card">
              <h3 className="vs-problem-title">
                <span className="vs-problem-icon">⚠️</span>
                THE PROBLEM
              </h3>
              <ul className="vs-problem-list">
                <li>Inconsistent system diagnostics</li>
                <li>Siloed IT, Security & Compliance tools</li>
                <li>Manual, reactive audits</li>
                <li>Unpatched vulnerabilities = risk of breach</li>
                <li>No early warning system</li>
              </ul>
            </div>
 
            {/* Solution */}
            <div className="vs-solution-card">
              <h3 className="vs-solution-title">
                <span className="vs-solution-icon">🛡️</span>
                MEET ViCTAA – THE SOLUTION
              </h3>
              <p className="vs-solution-description">
                A lightweight, agentless scanner that empowers IT, security, and compliance teams to detect and fix endpoint issues before they escalate
              </p>
            </div>
          </div>
        </div>
      </section>
 
      {/* Engineered for Modern Risk */}
      <section className="vs-engineered-section">
        <div className="vs-container">
          <h2 className="vs-section-title">
            Engineered for Modern Risk
          </h2>
          <div className="vs-features-grid">
            <div className="vs-feature-item">
              <span className="vs-check-icon">✓</span>
              <span>Agentless, Zero-Disruption Deployment</span>
            </div>
            <div className="vs-feature-item">
              <span className="vs-check-icon">✓</span>
              <span>Actionable Risk Intelligence</span>
            </div>
            <div className="vs-feature-item">
              <span className="vs-check-icon">✓</span>
              <span>Compliance-Driven Scanning</span>
            </div>
            <div className="vs-feature-item">
              <span className="vs-check-icon">✓</span>
              <span>Real-Time Health & Threat Correlation</span>
            </div>
            <div className="vs-feature-item">
              <span className="vs-check-icon">✓</span>
              <span>API & SIEM/GRC Integration Ready</span>
            </div>
          </div>
        </div>
      </section>
 
      {/* Challenge to Solution Table */}
      <section className="vs-challenge-solution-section">
        <div className="vs-container">
          <h2 className="vs-section-title">
            Moving organisations from challenges to solutions
          </h2>
          <div className="vs-table-container">
            {/* Challenge Table */}
            <div className="vs-challenge-table">
              <table>
                <thead>
                  <tr>
                    <th>Challenge</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Endpoint misconfig</td></tr>
                  <tr><td>Compliance gaps</td></tr>
                  <tr><td>Manual audits</td></tr>
                  <tr><td>Downtime</td></tr>
                  <tr><td>Tool sprawl</td></tr>
                </tbody>
              </table>
            </div>
 
            {/* Arrow */}
            <div className="vs-arrow">
              <span className="vs-arrow-icon">→</span>
            </div>
 
            {/* Solution Table */}
            <div className="vs-solution-table">
              <table>
                <thead>
                  <tr>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Remediation engine</td></tr>
                  <tr><td>Pre-built mappings</td></tr>
                  <tr><td>Automated scans</td></tr>
                  <tr><td>Predictive alerts</td></tr>
                  <tr><td>Unified diagnostics</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
 
      {/* Features Section */}
      <section className="vs-features-section">
        <div className="vs-container">
          <h2 className="vs-section-title">
            A Feature Set That Delivers
          </h2>
          <div className="vs-features-cards-grid">
            <div className="vs-feature-card">
              <div className="vs-feature-header">
                <span className="vs-feature-icon">🔍</span>
                <h3 className="vs-feature-title">Automated Deep Scan</h3>
              </div>
              <p className="vs-feature-description">
                Conducts automated, comprehensive system analysis across OS, memory, storage, network, and software integrity for full endpoint health and security posture.
              </p>
            </div>
 
            <div className="vs-feature-card">
              <div className="vs-feature-header">
                <span className="vs-feature-icon">🧠</span>
                <h3 className="vs-feature-title">Agentless Architecture</h3>
              </div>
              <p className="vs-feature-description">
                Provides lightweight, non-intrusive security scanning with no software install or reboots—ensuring zero disruption and complete endpoint assessment.
              </p>
            </div>
 
            <div className="vs-feature-card">
              <div className="vs-feature-header">
                <span className="vs-feature-icon">✓</span>
                <h3 className="vs-feature-title">Custom Compliance Mapping</h3>
              </div>
              <p className="vs-feature-description">
                Offers pre-built compliance frameworks like ISO 27001, HIPAA, PCI-DSS, NIST, GDPR, with configurable rules that automatically map scan results to compliance requirements.
              </p>
            </div>
 
            <div className="vs-feature-card">
              <div className="vs-feature-header">
                <span className="vs-feature-icon">⚠️</span>
                <h3 className="vs-feature-title">Real-time Alerts</h3>
              </div>
              <p className="vs-feature-description">
                Generates instant, risk-scored alerts with actionable insights on system vulnerabilities, threats, and violations.
              </p>
            </div>
 
            <div className="vs-feature-card">
              <div className="vs-feature-header">
                <span className="vs-feature-icon">🔌</span>
                <h3 className="vs-feature-title">Integration Ready</h3>
              </div>
              <p className="vs-feature-description">
                Connects easily with SIEM, GRC, and ITSM platforms via APIs—reducing tool sprawl and enabling security orchestration.
              </p>
            </div>
 
            <div className="vs-feature-card">
              <div className="vs-feature-header">
                <span className="vs-feature-icon">⏰</span>
                <h3 className="vs-feature-title">Scheduled & On-Demand Scans</h3>
              </div>
              <p className="vs-feature-description">
                Enables automated and flexible scanning based on periodic assessments or operational triggers.
              </p>
            </div>
          </div>
        </div>
      </section>
 
      {/* Comparison Table */}
      <section className="vs-comparison-section">
        <div className="vs-container">
          <h2 className="vs-section-title">
            How ViCTAA Stands Apart
          </h2>
          <div className="vs-comparison-table-container">
            <table className="vs-comparison-table">
              <thead>
                <tr>
                  <th>Feature/Tool</th>
                  <th className="vs-highlight">ViCTAA</th>
                  <th>Peer 1</th>
                  <th>Peer 2</th>
                  <th>Peer 3</th>
                  <th>Peer 4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Agentless Scanning</td>
                  <td className="vs-highlight">✓</td>
                  <td>✗</td>
                  <td>✗</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Smart Remediation</td>
                  <td className="vs-highlight">✓</td>
                  <td>✗</td>
                  <td>✗</td>
                  <td>✗</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Compliance Mapping</td>
                  <td className="vs-highlight">✓</td>
                  <td>✓</td>
                  <td>✗</td>
                  <td>✓</td>
                  <td>✗</td>
                </tr>
                <tr>
                  <td>Real-Time Correlation</td>
                  <td className="vs-highlight">✓</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✗</td>
                  <td>✗</td>
                </tr>
                <tr>
                  <td>SIEM-SRC Integration</td>
                  <td className="vs-highlight">✓</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✗</td>
                  <td>✗</td>
                </tr>
                <tr>
                  <td>Lightweight Deployment</td>
                  <td className="vs-highlight">✓</td>
                  <td>✗</td>
                  <td>✗</td>
                  <td>✓</td>
                  <td>✗</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
 
      {/* Industry Section */}
      <section className="vs-industry-section">
        <div className="vs-container">
          <h2 className="vs-section-title vs-industry-title">
            Industry-Agnostic Core — Trusted partner for:
          </h2>
          <div className="vs-industry-grid">
            <div className="vs-industry-item">
              <span className="vs-industry-icon">🏦</span>
              <span className="vs-industry-name">BFSI</span>
            </div>
            <div className="vs-industry-item">
              <span className="vs-industry-icon">🏥</span>
              <span className="vs-industry-name">Pharma & Health Care</span>
            </div>
            <div className="vs-industry-item">
              <span className="vs-industry-icon">⚡</span>
              <span className="vs-industry-name">Energy & Utilities</span>
            </div>
            <div className="vs-industry-item">
              <span className="vs-industry-icon">💻</span>
              <span className="vs-industry-name">IT Services</span>
            </div>
            <div className="vs-industry-item">
              <span className="vs-industry-icon">🏛️</span>
              <span className="vs-industry-name">GovReg Entities</span>
            </div>
          </div>
          <div className="vs-industry-tagline">
            <p className="vs-tagline-text">
              ViCTAA = FASTER DIAGNOSTICS, STRONGER COMPLIANCE, SMARTER IT.
            </p>
          </div>
        </div>
      </section>
 
      {/* FAQ Section */}
      <section className="vs-faq-section">
        <div className="vs-container">
          <h2 className="vs-section-title">
            Frequently Asked Questions
          </h2>
         
          <div className="vs-faq-container">
            {/* FAQ 1 */}
            <div className="vs-faq-item">
              <h3 className="vs-faq-question">
                Q: What does "agentless" mean?
              </h3>
              <p className="vs-faq-answer">
                A: Agentless means ViCTAA doesn't require installing persistent background software on each endpoint. While there is a one-time lightweight installation, the solution performs remote scanning and monitoring without running continuous processes that consume system resources or impact performance.
              </p>
            </div>
 
            {/* FAQ 2 */}
            <div className="vs-faq-item">
              <h3 className="vs-faq-question">
                Q: How does ViCTAA ensure "zero-disruption deployment"?
              </h3>
              <p className="vs-faq-answer">
                A: Our agentless architecture means no heavy installations, no system reboots, and no persistent background processes consuming resources. The lightweight scanner performs comprehensive assessments without interfering with user productivity or system performance.
              </p>
            </div>
 
            {/* FAQ 3 */}
            <div className="vs-faq-item">
              <h3 className="vs-faq-question">
                How does ViCTAA compare to traditional antivirus solutions?
              </h3>
              <div className="vs-faq-answer">
                <p>
                  A: ViCTAA offers comprehensive endpoint protection that goes beyond traditional antivirus software, which mainly relies on signature-based detection for known threats. In contrast, ViCTAA uses real-time, cloud-based threat intelligence to detect advanced attacks like phishing, fileless malware, and zero-day threats. It protects all organisational devices—not just individual systems—and tracks usage of potentially risky applications, freeware, and USB devices.
                </p>
                <p>
                  More than just a scanning tool, ViCTAA actively safeguards sensitive data from being exfiltrated. It adopts a methodical and policy-driven approach to data protection, enabling IT and security teams to make informed, system-wide decisions about risk and security posture.
                </p>
                <p>
                  Through its unified admin dashboard, ViCTAA enables centralised control, letting IT teams monitor endpoints, manage patches, and flag suspicious activity across the organisation. It also provides detailed reports on software installations, USB access history, privilege escalations, and changes in security settings. These features help prevent insider threats, support compliance, and ensure proactive risk management at scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Final CTA Section */}
      <section className="vs-cta-section">
        <div className="vs-container">
          <h2 className="vs-cta-title">
            READY TO FORTIFY YOUR INFRASTRUCTURE?
          </h2>
         
          <div className="vs-cta-content">
            <div className="vs-cta-button-container">
              <button className="vs-cta-button" onClick={handleDemoClick}>
                BOOK YOUR DEMO NOW
              </button>
            </div>
           
            <div className="vs-cta-contact">
              <div className="vs-contact-item">
                <span className="vs-contact-icon">📧</span>
                <span>info@vardaanglobal.com</span>
              </div>
              <div className="vs-contact-item">
                <span className="vs-contact-icon">🌐</span>
                <span>vardaanglobal.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
 
export default VictaaShowcase;
 