import React, { useState } from 'react';
import './Whitepaper.css';
import { config } from '../../../utils/config';
import { FaList, FaExchangeAlt, FaSitemap, FaFileAlt, FaCheckCircle, FaBolt, FaPlug, FaBell, FaChartLine, FaShieldAlt, FaRocket, FaUsers, FaFileContract, FaExclamationTriangle, FaGraduationCap, FaClock, FaChartPie, FaSearch, FaClipboardCheck, FaUserCheck, FaGavel, FaTrophy, FaDownload } from 'react-icons/fa';

import riskavaireLogo from '../../../assets/Images/Products/GRC/riskavaire-icon.svg';
import whitepaperImage from '../../../assets/Images/Products/GRC/Whitepaper.webp';
import whitepaperImage1 from '../../../assets/Images/Products/GRC/Whitepaper1.webp';
import whitepaperImage3 from '../../../assets/Images/Products/GRC/Whitepaper3.png';
import whitepaperImage4 from '../../../assets/Images/Products/GRC/Whitepaper4.avif';
import whitepaperImage5 from '../../../assets/Images/Products/GRC/Whitepaper5.jpg';
import whitepaperImage6 from '../../../assets/Images/Products/GRC/Whitepaper6.webp';
import Footer from '../../../components/Footer/Footer';

const Whitepaper = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    entity_type: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = 'Mobile number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.mobile_number)) {
      newErrors.mobile_number = 'Please enter a valid mobile number';
    }
    
    if (!formData.entity_type.trim()) {
      newErrors.entity_type = 'Entity type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const API_BASE_URL = config.API_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/whitepaper-submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      const result = await response.json();
      
      // Download the PDF
      const pdfResponse = await fetch(`${API_BASE_URL}/api/whitepaper-download`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (pdfResponse.ok) {
        const blob = await pdfResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'RiskaVaire-Whitepaper.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }

      // Close modal and reset form
      setShowModal(false);
      setFormData({
        name: '',
        email: '',
        mobile_number: '',
        entity_type: ''
      });
      setErrors({});
      
      alert('Thank you! Your details have been submitted and the whitepaper download has started.');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setShowModal(false);
      setFormData({
        name: '',
        email: '',
        mobile_number: '',
        entity_type: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="whitepaper-container">
      {/* Main Content Section with Split Layout */}
      <section className="whitepaper-main-section">
        {/* Left Side - Logo, Description and Dark Blue Text Box */}
        <div className="whitepaper-left-content">
          <div className="whitepaper-logo-container">
            <img src={riskavaireLogo} alt="RiskaVaire" className="whitepaper-logo" />
            <h1 className="whitepaper-main-headline">
              THE RiskaVaire OPERATIONALIZES<br />
              PRIVACY REVOLUTION
            </h1>
          </div>
          <div className="whitepaper-blue-box">
            <h2 className="whitepaper-blue-box-heading">
              Privacy by Design, Governance by Default — how RiskaVaire embeds privacy across the enterprise.
            </h2>
            <p className="whitepaper-blue-box-text">
              Privacy isn't an add-on; it must be built into controls, processes, data flows, and vendor ties, directly linked to business risk and value. Vardaan's GRC platform, RiskaVaire, transforms privacy obligations into operational strength and stakeholder trust.
            </p>
            <button 
              className="whitepaper-download-btn"
              onClick={() => setShowModal(true)}
            >
              <FaDownload /> Download Whitepaper
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="whitepaper-right-image">
          <img src={whitepaperImage} alt="Privacy and Governance" className="whitepaper-keyboard-image" />
        </div>
      </section>

      {/* Bottom Section - Dark Blue Background */}
      <section className="whitepaper-bottom-section">
        <div className="whitepaper-bottom-content">
          <h2 className="whitepaper-bottom-heading">
            1. Unified privacy controls, a single source of truth for obligations
          </h2>
          <p className="whitepaper-bottom-text">
            What it is: a centralized control library that normalizes requirements from GDPR, CCPA, LGPD, HIPAA, ISO 27701 and industry rules into actionable, reusable controls.
          </p>
        </div>
      </section>

      {/* Implementation Deep Dive Section */}
      <section className="whitepaper-implementation-section">
        <h2 className="whitepaper-implementation-title">
          How RiskaVaire implements it (deep):
        </h2>
        <div className="whitepaper-implementation-grid">
          <div className="whitepaper-implementation-item">
            <div className="whitepaper-implementation-header">
              <div className="whitepaper-implementation-icon">
                <FaList />
              </div>
              <h3 className="whitepaper-implementation-item-title">Control taxonomy & attributes:</h3>
            </div>
            <p className="whitepaper-implementation-item-text">
              Each control has type (technical/ administrative/ physical), owner, frequency, evidence attachments, maturity rating, mapped legal clauses, and test procedures.
            </p>
          </div>

          <div className="whitepaper-implementation-item">
            <div className="whitepaper-implementation-header">
              <div className="whitepaper-implementation-icon">
                <FaExchangeAlt />
              </div>
              <h3 className="whitepaper-implementation-item-title">Cross-framework crosswalks:</h3>
            </div>
            <p className="whitepaper-implementation-item-text">
              Obligations that look different across regulations are reconciled to one canonical control (e.g., consent management across GDPR & CCPA becomes a single consent- control with framework- specific parameters)
            </p>
          </div>

          <div className="whitepaper-implementation-item">
            <div className="whitepaper-implementation-header">
              <div className="whitepaper-implementation-icon">
                <FaSitemap />
              </div>
              <h3 className="whitepaper-implementation-item-title">Inheritance & scope rules:</h3>
            </div>
            <p className="whitepaper-implementation-item-text">
              Policies and controls can be inherited across business units and geographies with override rules for local variance, so global standards coexist with local adaptations.
            </p>
          </div>

          <div className="whitepaper-implementation-item">
            <div className="whitepaper-implementation-header">
              <div className="whitepaper-implementation-icon">
                <FaFileAlt />
              </div>
              <h3 className="whitepaper-implementation-item-title">Control templates & playbooks:</h3>
            </div>
            <p className="whitepaper-implementation-item-text">
              Pre-built templates for common privacy controls (consent, retention, pseudonymization, access control) plus playbooks for implementation and evidence collection.
            </p>
          </div>

          <div className="whitepaper-implementation-item">
            <div className="whitepaper-implementation-header">
              <div className="whitepaper-implementation-icon">
                <FaCheckCircle />
              </div>
              <h3 className="whitepaper-implementation-item-title">Outcome:</h3>
            </div>
            <p className="whitepaper-implementation-item-text">
              Consistent control implementation, faster audits, and reduced duplication of effort across regulatory regimes.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Two-Column Layout - Automated Assessments */}
      <section className="whitepaper-section-two">
        <div className="whitepaper-section-two-container">
          {/* Left Column - Light Gray Background */}
          <div className="whitepaper-section-two-left">
            <div className="whitepaper-section-two-left-content">
              <h2 className="whitepaper-section-two-title">
                How RiskaVaire implements it (deep):
              </h2>
              <div className="whitepaper-section-two-list">
                <div className="whitepaper-section-two-item">
                  <div className="whitepaper-section-two-header">
                    <div className="whitepaper-section-two-icon-circle">
                      <FaClipboardCheck />
                    </div>
                    <h3 className="whitepaper-section-two-item-title">DPIA orchestration:</h3>
                  </div>
                  <p className="whitepaper-section-two-item-text">
                    Guided questionnaires that adapt to context (data types, processing purpose, risk level). The platform calculates risk scores and recommends mitigation actions (encryption, retention changes, contract clauses).
                  </p>
                </div>

                <div className="whitepaper-section-two-item">
                  <div className="whitepaper-section-two-header">
                    <div className="whitepaper-section-two-icon-circle">
                      <FaExchangeAlt />
                    </div>
                    <h3 className="whitepaper-section-two-item-title">Record of Processing Activities (RoPA) auto-population:</h3>
                  </div>
                  <p className="whitepaper-section-two-item-text">
                    Map data elements, processing purposes, recipients, legal basis, and retention rules directly from system inventories; auto-fill fields from integrations with source systems.
                  </p>
                </div>

                <div className="whitepaper-section-two-item">
                  <div className="whitepaper-section-two-header">
                    <div className="whitepaper-section-two-icon-circle">
                      <FaList />
                    </div>
                    <h3 className="whitepaper-section-two-item-title">Questionnaire engine & conditional logic:</h3>
                  </div>
                  <p className="whitepaper-section-two-item-text">
                    Dynamic vendor and internal assessments that route to the right stakeholders and require attestation before approval.
                  </p>
                </div>

                <div className="whitepaper-section-two-item">
                  <div className="whitepaper-section-two-header">
                    <div className="whitepaper-section-two-icon-circle">
                      <FaShieldAlt />
                    </div>
                    <h3 className="whitepaper-section-two-item-title">Evidence capture & immutable audit trail:</h3>
                  </div>
                  <p className="whitepaper-section-two-item-text">
                    Attachments, screenshots, system logs, approvals and timestamps are stored with cryptographic hashes and version history for tamper-evident auditability.
                  </p>
                </div>

                <div className="whitepaper-section-two-item">
                  <div className="whitepaper-section-two-header">
                    <div className="whitepaper-section-two-icon-circle">
                      <FaFileAlt />
                    </div>
                    <h3 className="whitepaper-section-two-item-title">Regulatory-ready reporting:</h3>
                  </div>
                  <p className="whitepaper-section-two-item-text">
                    Exportable, regulator-friendly reports and templates (breach timelines, DPIA summaries, RoPA extracts).
                  </p>
                </div>

                <div className="whitepaper-section-two-item">
                  <div className="whitepaper-section-two-header">
                    <div className="whitepaper-section-two-icon-circle">
                      <FaRocket />
                    </div>
                    <h3 className="whitepaper-section-two-item-title">Outcome:</h3>
                  </div>
                  <p className="whitepaper-section-two-item-text">
                    Far less manual evidence-gathering, shorter audit cycles, and always-on readiness for inspections or breach investigations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Dark Blue Background */}
          <div className="whitepaper-section-two-right">
            <h2 className="whitepaper-section-two-right-heading">
              2. Automated assessments & documentation, evidence without the paperwork backlog
            </h2>
            <div className="whitepaper-section-two-divider"></div>
            <p className="whitepaper-section-two-right-text">
              What it is: automated workflows to run DPIAs, populate RoPAs, perform vendor privacy questionnaires, and capture versioned evidence.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Data Flow & Vendor Risk Mapping */}
      <section className="whitepaper-section-three">
        <div className="whitepaper-section-three-content">
          <h2 className="whitepaper-section-three-title">
            3. Data flow & vendor risk mapping, see where data lives and who touches it
          </h2>
          <p className="whitepaper-section-three-description">
            What it is: discovery, classification and lineage that show data movement across systems, teams and third parties.
          </p>
          
          <h3 className="whitepaper-section-three-subtitle">
            How RiskaVaire implements it (deep):
          </h3>

          <div className="whitepaper-section-three-grid">
            <div className="whitepaper-section-three-box">
              <div className="whitepaper-section-three-icon">
                <FaBolt />
              </div>
              <h4 className="whitepaper-section-three-box-title">Automated Discovery Connectors:</h4>
              <p className="whitepaper-section-three-box-text">
                Ingest Metadata From Cloud Storage, Databases, SaaS Apps, Message Queues And Data Lakes To Find Personal Data Hotspots
              </p>
            </div>

            <div className="whitepaper-section-three-box">
              <div className="whitepaper-section-three-icon">
                <FaBolt />
              </div>
              <h4 className="whitepaper-section-three-box-title">Data Classification & Tagging:</h4>
              <p className="whitepaper-section-three-box-text">
                Apply Standardized Classification (PII, PHI, Sensitive, Internal) And Tag With Business Context (Purpose, Retention, Legal Basis).
              </p>
            </div>

            <div className="whitepaper-section-three-box">
              <div className="whitepaper-section-three-icon">
                <FaBolt />
              </div>
              <h4 className="whitepaper-section-three-box-title">Lineage & Flow Visualizations:</h4>
              <p className="whitepaper-section-three-box-text">
                Graphical Maps That Show Origin → Transformation → Destination (Including Third-Party Transfers), With Clickable Nodes For Controls, Contracts And DPIAs.
              </p>
            </div>

            <div className="whitepaper-section-three-box">
              <div className="whitepaper-section-three-icon">
                <FaBolt />
              </div>
              <h4 className="whitepaper-section-three-box-title">Third-Party Risk Management (TPRM):</h4>
              <p className="whitepaper-section-three-box-text">
                Vendor Inventory Linked To Data Flows; Vendor Assessments, Contract Clause Tracking (BAA, SCCS), Certificate Expirations And Remediation Workflows
              </p>
            </div>

            <div className="whitepaper-section-three-box">
              <div className="whitepaper-section-three-icon">
                <FaBolt />
              </div>
              <h4 className="whitepaper-section-three-box-title">Cross-Border Transfer Tracking:</h4>
              <p className="whitepaper-section-three-box-text">
                Flag Transfers To Jurisdictions With Restrictions And Surface Required Protections (SCC, DPA, Adequacy Decisions).
              </p>
            </div>

            <div className="whitepaper-section-three-box">
              <div className="whitepaper-section-three-icon">
                <FaBolt />
              </div>
              <h4 className="whitepaper-section-three-box-title">Outcome:</h4>
              <p className="whitepaper-section-three-box-text">
                The Organization Tracks Personal Data Flow And Vendor Scope, Enabling Faster Incident Response And Stronger Risk Management.
              </p>
            </div>
          </div>
        </div>
        <div className="whitepaper-section-three-background">
          <img src={whitepaperImage1} alt="Data Flow Background" className="whitepaper-section-three-bg-image" />
        </div>
      </section>

      {/* Section 4: Discovery & Classification */}
      <section className="whitepaper-section-four-new">
        <div className="whitepaper-section-four-new-content">
          <h2 className="whitepaper-section-four-new-heading">
            4. What it is: discovery, classification and lineage that show data movement across systems, teams and third parties.
          </h2>
          <div className="whitepaper-section-four-new-grid">
            <div className="whitepaper-section-four-new-card">
              <div className="whitepaper-section-four-new-header">
                <div className="whitepaper-section-four-new-icon-circle">
                  <FaPlug />
                </div>
                <h3 className="whitepaper-section-four-new-item-title">Integration fabric:</h3>
              </div>
              <p className="whitepaper-section-four-new-item-text">
                Plug into SIEM, DLP, IAM, CASB, cloud audit logs and application telemetry to surface privacy-relevant incidents (unusual exports, mass downloads, privilege escalations).
              </p>
            </div>

            <div className="whitepaper-section-four-new-card">
              <div className="whitepaper-section-four-new-header">
                <div className="whitepaper-section-four-new-icon-circle">
                  <FaChartLine />
                </div>
                <h3 className="whitepaper-section-four-new-item-title">Anomaly detection & predictive signals:</h3>
              </div>
              <p className="whitepaper-section-four-new-item-text">
                Behavioural baselining to detect exfiltration patterns, spikes in DSARs, or unusual vendor activity. (Optionally augmented with ML models.)
              </p>
            </div>

            <div className="whitepaper-section-four-new-card">
              <div className="whitepaper-section-four-new-header">
                <div className="whitepaper-section-four-new-icon-circle">
                  <FaShieldAlt />
                </div>
                <h3 className="whitepaper-section-four-new-item-title">Continuous control testing:</h3>
              </div>
              <p className="whitepaper-section-four-new-item-text">
                Scheduled checks of encryption, access policies, retention deletes and backup protections with automated reporting on failures.
              </p>
            </div>

            <div className="whitepaper-section-four-new-card">
              <div className="whitepaper-section-four-new-header">
                <div className="whitepaper-section-four-new-icon-circle">
                  <FaRocket />
                </div>
                <h3 className="whitepaper-section-four-new-item-title">Outcome:</h3>
              </div>
              <p className="whitepaper-section-four-new-item-text">
                Risk is discovered early, workflows start automatically, and human attention is reserved for decisions rather than detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Continuous Monitoring & Alerts */}
      <section className="whitepaper-section-four">
        <div className="whitepaper-section-four-container">
          {/* Left Content Section */}
          <div className="whitepaper-section-four-left">
            {/* Top Part - White Background */}
            <div className="whitepaper-section-four-top">
              <h2 className="whitepaper-section-four-title">
                5. Continuous monitoring & alerts, detect, not just document
              </h2>
              <p className="whitepaper-section-four-description">
                What it is: real-time (or near real-time) monitoring of privacy control health and anomalous events with automated escalation and remediation options.
              </p>
            </div>

            {/* Bottom Part - Dark Blue Background */}
            <div className="whitepaper-section-four-bottom">
              <h3 className="whitepaper-section-four-subtitle">
                How RiskaVaire implements it (deep):
              </h3>
              <div className="whitepaper-section-four-grid">
                <div className="whitepaper-section-four-column">
                  <div className="whitepaper-section-four-icon-circle">
                    <FaPlug />
                  </div>
                  <h4 className="whitepaper-section-four-column-title">Integration fabric:</h4>
                  <p className="whitepaper-section-four-column-text">
                    Plug into SIEM, DLP, IAM, CASB, cloud audit logs and application telemetry to surface privacy-relevant incidents (unusual exports, mass downloads, privilege escalations).
                  </p>
                </div>

                <div className="whitepaper-section-four-column">
                  <div className="whitepaper-section-four-icon-circle">
                    <FaBell />
                  </div>
                  <h4 className="whitepaper-section-four-column-title">Policy-based alerting:</h4>
                  <p className="whitepaper-section-four-column-text">
                    Thresholds and rules that trigger workflows (e.g., X records exported from CRM within Y minutes triggers a ticket and suspends the account).
                  </p>
                </div>

                <div className="whitepaper-section-four-column">
                  <div className="whitepaper-section-four-icon-circle">
                    <FaChartLine />
                  </div>
                  <h4 className="whitepaper-section-four-column-title">Anomaly detection & predictive signals:</h4>
                  <p className="whitepaper-section-four-column-text">
                    Behavioural baselining to detect exfiltration patterns, spikes in DSARs, or unusual vendor activity. (Optionally augmented with ML models.)
                  </p>
                </div>

                <div className="whitepaper-section-four-column">
                  <div className="whitepaper-section-four-icon-circle">
                    <FaShieldAlt />
                  </div>
                  <h4 className="whitepaper-section-four-column-title">Continuous control testing:</h4>
                  <p className="whitepaper-section-four-column-text">
                    Scheduled checks of encryption, access policies, retention deletes and backup protections with automated reporting on failures.
                  </p>
                </div>

                <div className="whitepaper-section-four-column">
                  <div className="whitepaper-section-four-icon-circle">
                    <FaRocket />
                  </div>
                  <h4 className="whitepaper-section-four-column-title">Outcome:</h4>
                  <p className="whitepaper-section-four-column-text">
                    Risk is discovered early, workflows start automatically, and human attention is reserved for decisions rather than detection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Graphical Section */}
          <div className="whitepaper-section-four-right">
            <img src={whitepaperImage3} alt="Continuous Monitoring Background" className="whitepaper-section-four-bg-image" />
          </div>
        </div>
      </section>

      {/* Section 6: Alignment with Governance & Risk Objectives */}
      <section className="whitepaper-section-six">
        <div className="whitepaper-section-six-container">
          {/* Left Side - Dark Blue Background */}
          <div className="whitepaper-section-six-left">
            <h2 className="whitepaper-section-six-heading">
              6. Alignment with<br />
              governance & risk<br />
              objectives, privacy<br />
              as part of the risk<br />
              fabric
            </h2>
          </div>

          {/* Right Side - Abstract Background with Content */}
          <div className="whitepaper-section-six-right">
            <div className="whitepaper-section-six-background">
              <img src={whitepaperImage4} alt="Governance Background" className="whitepaper-section-six-bg-image" />
            </div>
            <div className="whitepaper-section-six-content">
              <p className="whitepaper-section-six-description">
                What it is: real-time (or near real-time) monitoring of privacy control health and anomalous events with automated escalation and remediation options.
              </p>
              <div className="whitepaper-section-six-grid">
                <div className="whitepaper-section-six-card">
                  <div className="whitepaper-section-six-header">
                    <div className="whitepaper-section-six-icon-circle">
                      <FaSitemap />
                    </div>
                    <h3 className="whitepaper-section-six-item-title">Risk mapping:</h3>
                  </div>
                  <p className="whitepaper-section-six-item-text">
                    Link each privacy control to risk statements and business processes, so control gaps show up in enterprise risk dashboards.
                  </p>
                </div>

                <div className="whitepaper-section-six-card">
                  <div className="whitepaper-section-six-header">
                    <div className="whitepaper-section-six-icon-circle">
                      <FaChartPie />
                    </div>
                    <h3 className="whitepaper-section-six-item-title">KRI/KPI integration:</h3>
                  </div>
                  <p className="whitepaper-section-six-item-text">
                    Measure privacy KPIs (DSAR SLA, DPIA completion, % of data assets classified) as KRIs to the board-level risk reports.
                  </p>
                </div>

                <div className="whitepaper-section-six-card">
                  <div className="whitepaper-section-six-header">
                    <div className="whitepaper-section-six-icon-circle">
                      <FaChartLine />
                    </div>
                    <h3 className="whitepaper-section-six-item-title">Risk scoring & simulation:</h3>
                  </div>
                  <p className="whitepaper-section-six-item-text">
                    Combine likelihood and impact, simulate remediation scenarios and show residual risk post-mitigation
                  </p>
                </div>

                <div className="whitepaper-section-six-card">
                  <div className="whitepaper-section-six-header">
                    <div className="whitepaper-section-six-icon-circle">
                      <FaFileAlt />
                    </div>
                    <h3 className="whitepaper-section-six-item-title">Board & regulator packs:</h3>
                  </div>
                  <p className="whitepaper-section-six-item-text">
                    Templated, executive-ready reports translating technical controls into business impact (financial exposure, reputational score).
                  </p>
                </div>

                <div className="whitepaper-section-six-card">
                  <div className="whitepaper-section-six-header">
                    <div className="whitepaper-section-six-icon-circle">
                      <FaGavel />
                    </div>
                    <h3 className="whitepaper-section-six-item-title">Policy & exception governance:</h3>
                  </div>
                  <p className="whitepaper-section-six-item-text">
                    Manage policy exceptions with approvals, due-dates and compensating controls, ensuring exceptions are visible to governance bodies.
                  </p>
                </div>

                <div className="whitepaper-section-six-card">
                  <div className="whitepaper-section-six-header">
                    <div className="whitepaper-section-six-icon-circle">
                      <FaRocket />
                    </div>
                    <h3 className="whitepaper-section-six-item-title">Outcome:</h3>
                  </div>
                  <p className="whitepaper-section-six-item-text">
                    Privacy isn't a silo; it informs strategic decision-making and is evaluated against the same risk appetite as cyber, operational, and financial risks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Privacy as a Stakeholder Commitment */}
      <section className="whitepaper-section-seven">
        <div className="whitepaper-section-seven-content">
          <h2 className="whitepaper-section-seven-title">
            7. Privacy as a stakeholder commitment, practical mechanisms to prove trust
          </h2>
          <p className="whitepaper-section-seven-description">
            What it is: operational features that make the enterprise accountable and transparent to customers, employees, partners and regulators.
          </p>

          <div className="whitepaper-section-seven-grid">
            <div className="whitepaper-section-seven-item">
              <div className="whitepaper-section-seven-header">
                <div className="whitepaper-section-seven-icon-circle">
                  <FaUsers />
                </div>
                <h3 className="whitepaper-section-seven-item-title">Consent lifecycle & preference management:</h3>
              </div>
              <p className="whitepaper-section-seven-item-text">
                Centralize consent records, map consent to processing activities, and honour revocations automatically across systems.
              </p>
            </div>

            <div className="whitepaper-section-seven-item">
              <div className="whitepaper-section-seven-header">
                <div className="whitepaper-section-seven-icon-circle">
                  <FaFileAlt />
                </div>
                <h3 className="whitepaper-section-seven-item-title">DSAR automation:</h3>
              </div>
              <p className="whitepaper-section-seven-item-text">
                Intake portals, identity verification workflows, automated search across data sources, redaction utilities, and SLA tracking with audit trails.
              </p>
            </div>

            <div className="whitepaper-section-seven-item">
              <div className="whitepaper-section-seven-header">
                <div className="whitepaper-section-seven-icon-circle">
                  <FaFileContract />
                </div>
                <h3 className="whitepaper-section-seven-item-title">Privacy notices & contractual templates:</h3>
              </div>
              <p className="whitepaper-section-seven-item-text">
                Manage and version privacy notices; push updates to web properties; maintain contract clause libraries and track sign-offs.
              </p>
            </div>

            <div className="whitepaper-section-seven-item">
              <div className="whitepaper-section-seven-header">
                <div className="whitepaper-section-seven-icon-circle">
                  <FaExclamationTriangle />
                </div>
                <h3 className="whitepaper-section-seven-item-title">Breach response orchestration:</h3>
              </div>
              <p className="whitepaper-section-seven-item-text">
                Pre-defined playbooks, notification templates, regulator-specific reporting timelines and post-incident root-cause analysis modules.
              </p>
            </div>

            <div className="whitepaper-section-seven-item">
              <div className="whitepaper-section-seven-header">
                <div className="whitepaper-section-seven-icon-circle">
                  <FaGraduationCap />
                </div>
                <h3 className="whitepaper-section-seven-item-title">Training & attestation:</h3>
              </div>
              <p className="whitepaper-section-seven-item-text">
                Automated training assignments for data handlers, attestations logged in the platform and linked to roles and processes.
              </p>
            </div>

            <div className="whitepaper-section-seven-item">
              <div className="whitepaper-section-seven-header">
                <div className="whitepaper-section-seven-icon-circle">
                  <FaClock />
                </div>
                <h3 className="whitepaper-section-seven-item-title">Transparency logs:</h3>
              </div>
              <p className="whitepaper-section-seven-item-text">
                Accessible logs showing accesses and disclosures for stakeholders where appropriate (for internal audit, customer requests or regulators).
              </p>
            </div>

            <div className="whitepaper-section-seven-item">
              <div className="whitepaper-section-seven-header">
                <div className="whitepaper-section-seven-icon-circle">
                  <FaChartPie />
                </div>
                <h3 className="whitepaper-section-seven-item-title">Outcome:</h3>
              </div>
              <p className="whitepaper-section-seven-item-text">
                The organization demonstrates consistent, documented behaviour that strengthens trust and reduces regulatory friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Data Flow & Vendor Risk Mapping (Repeated) */}
      <section className="whitepaper-section-eight">
        <div className="whitepaper-section-eight-container">
          {/* Left Side - Dark Blue Background with Image */}
          <div className="whitepaper-section-eight-left">
            <div className="whitepaper-section-eight-background">
              <img src={whitepaperImage5} alt="Data Flow Background" className="whitepaper-section-eight-bg-image" />
            </div>
            <div className="whitepaper-section-eight-content">
              <h2 className="whitepaper-section-eight-heading">
                8. Data flow & vendor risk mapping, see where data lives and who touches it
              </h2>
              <p className="whitepaper-section-eight-description">
                What it is: discovery, classification and lineage that show data movement across systems, teams and third parties.
              </p>
            </div>
          </div>

          {/* Right Side - White Background with List */}
          <div className="whitepaper-section-eight-right">
            <div className="whitepaper-section-eight-list">
              <div className="whitepaper-section-eight-item">
                <div className="whitepaper-section-eight-header">
                  <div className="whitepaper-section-eight-icon-circle">
                    <FaClipboardCheck />
                  </div>
                  <h3 className="whitepaper-section-eight-item-title">DPIA orchestration:</h3>
                </div>
                <p className="whitepaper-section-eight-item-text">
                  Guided questionnaires that adapt to context (data types, processing purpose, risk level). The platform calculates risk scores and recommends mitigation actions (encryption, retention changes, contract clauses).
                </p>
              </div>

              <div className="whitepaper-section-eight-item">
                <div className="whitepaper-section-eight-header">
                  <div className="whitepaper-section-eight-icon-circle">
                    <FaExchangeAlt />
                  </div>
                  <h3 className="whitepaper-section-eight-item-title">Record of Processing Activities (RoPA) auto-population:</h3>
                </div>
                <p className="whitepaper-section-eight-item-text">
                  Map data elements, processing purposes, recipients, legal basis, and retention rules directly from system inventories; auto-fill fields from integrations with source systems.
                </p>
              </div>

              <div className="whitepaper-section-eight-item">
                <div className="whitepaper-section-eight-header">
                  <div className="whitepaper-section-eight-icon-circle">
                    <FaList />
                  </div>
                  <h3 className="whitepaper-section-eight-item-title">Questionnaire engine & conditional logic:</h3>
                </div>
                <p className="whitepaper-section-eight-item-text">
                  Dynamic vendor and internal assessments that route to the right stakeholders and require attestation before approval.
                </p>
              </div>

              <div className="whitepaper-section-eight-item">
                <div className="whitepaper-section-eight-header">
                  <div className="whitepaper-section-eight-icon-circle">
                    <FaShieldAlt />
                  </div>
                  <h3 className="whitepaper-section-eight-item-title">Evidence capture & immutable audit trail:</h3>
                </div>
                <p className="whitepaper-section-eight-item-text">
                  Attachments, screenshots, system logs, approvals and timestamps are stored with cryptographic hashes and version history for tamper-evident auditability.
                </p>
              </div>

              <div className="whitepaper-section-eight-item">
                <div className="whitepaper-section-eight-header">
                  <div className="whitepaper-section-eight-icon-circle">
                    <FaFileAlt />
                  </div>
                  <h3 className="whitepaper-section-eight-item-title">Regulatory-ready reporting:</h3>
                </div>
                <p className="whitepaper-section-eight-item-text">
                  Exportable, regulator-friendly reports and templates (breach timelines, DPIA summaries, RoPA extracts).
                </p>
              </div>

              <div className="whitepaper-section-eight-item">
                <div className="whitepaper-section-eight-header">
                  <div className="whitepaper-section-eight-icon-circle">
                    <FaRocket />
                  </div>
                  <h3 className="whitepaper-section-eight-item-title">Outcome:</h3>
                </div>
                <p className="whitepaper-section-eight-item-text">
                  Far less manual evidence-gathering, shorter audit cycles, and always-on readiness for inspections or breach investigations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Technical Architecture & Integrations */}
      <section className="whitepaper-section-nine">
        <div className="whitepaper-section-nine-content">
          <h2 className="whitepaper-section-nine-title">
            9. Technical architecture & integrations, plug into your estate
          </h2>
          <p className="whitepaper-section-nine-description">
            What it is: an API-first, connector-friendly platform that coexists with your security stack.
          </p>

          <div className="whitepaper-section-nine-grid">
            <div className="whitepaper-section-nine-item">
              <div className="whitepaper-section-nine-icon">
                <FaBolt />
              </div>
              <h3 className="whitepaper-section-nine-item-title">Connectors & APIs:</h3>
              <p className="whitepaper-section-nine-item-text">
                Native connectors for IAM, HRIS, CRM, cloud storage, databases, SIEM, DLP and major SaaS apps; developer APIs for custom sources.
              </p>
            </div>

            <div className="whitepaper-section-nine-item">
              <div className="whitepaper-section-nine-icon">
                <FaBolt />
              </div>
              <h3 className="whitepaper-section-nine-item-title">Identity-aware controls:</h3>
              <p className="whitepaper-section-nine-item-text">
                Integrate with IAM to map identity risk, apply least-privilege based on role and context, and automate provisioning/de-provisioning.
              </p>
            </div>

            <div className="whitepaper-section-nine-item">
              <div className="whitepaper-section-nine-icon">
                <FaBolt />
              </div>
              <h3 className="whitepaper-section-nine-item-title">Encryption & pseudonymization utilities:</h3>
              <p className="whitepaper-section-nine-item-text">
                Manage keys, tokenization, and pseudonymization workflows tied to data classification.
              </p>
            </div>

            <div className="whitepaper-section-nine-item">
              <div className="whitepaper-section-nine-icon">
                <FaBolt />
              </div>
              <h3 className="whitepaper-section-nine-item-title">Event-driven workflows:</h3>
              <p className="whitepaper-section-nine-item-text">
                Triggers from logs or sensors start DPIAs, revoke access or open incident tickets automatically.
              </p>
            </div>

            <div className="whitepaper-section-nine-item">
              <div className="whitepaper-section-nine-icon">
                <FaBolt />
              </div>
              <h3 className="whitepaper-section-nine-item-title">Secure architecture:</h3>
              <p className="whitepaper-section-nine-item-text">
                Role-based access, audit logging, encryption at rest/in transit, and tenancy/isolation options for regulated clients.
              </p>
            </div>

            <div className="whitepaper-section-nine-item">
              <div className="whitepaper-section-nine-icon">
                <FaBolt />
              </div>
              <h3 className="whitepaper-section-nine-item-title">Outcome:</h3>
              <p className="whitepaper-section-nine-item-text">
                Technical integration makes privacy controls enforceable where the data lives, not just documented in a policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: A Pragmatic Scenario */}
      <section className="whitepaper-section-ten">
        <div className="whitepaper-section-ten-container">
          {/* Left Side - Dark Blue Background with Steps */}
          <div className="whitepaper-section-ten-left">
            <div className="whitepaper-section-ten-steps">
              <div className="whitepaper-section-ten-step">
                <div className="whitepaper-section-ten-step-icon">
                  <FaSearch />
                </div>
                <div className="whitepaper-section-ten-step-content">
                  <h3 className="whitepaper-section-ten-step-title">Discovery:</h3>
                  <p className="whitepaper-section-ten-step-text">
                    RiskaVaire discovers customer PII in CRM and analytics buckets, tags it, and maps the flow to the vendor.
                  </p>
                </div>
              </div>

              <div className="whitepaper-section-ten-step">
                <div className="whitepaper-section-ten-step-icon">
                  <FaClipboardCheck />
                </div>
                <div className="whitepaper-section-ten-step-content">
                  <h3 className="whitepaper-section-ten-step-title">DPIA:</h3>
                  <p className="whitepaper-section-ten-step-text">
                    Automated DPIA runs, identifies high risk due to profiling and cross-border transfer; recommends pseudonymization and a contractual SCC for transfers.
                  </p>
                </div>
              </div>

              <div className="whitepaper-section-ten-step">
                <div className="whitepaper-section-ten-step-icon">
                  <FaUserCheck />
                </div>
                <div className="whitepaper-section-ten-step-content">
                  <h3 className="whitepaper-section-ten-step-title">Vendor Assessment:</h3>
                  <p className="whitepaper-section-ten-step-text">
                    TPRM questionnaire triggers; vendor score below threshold; platform routes remediation (encryption, audit right) and holds contractual changes until score improves.
                  </p>
                </div>
              </div>

              <div className="whitepaper-section-ten-step">
                <div className="whitepaper-section-ten-step-icon">
                  <FaBell />
                </div>
                <div className="whitepaper-section-ten-step-content">
                  <h3 className="whitepaper-section-ten-step-title">Monitoring:</h3>
                  <p className="whitepaper-section-ten-step-text">
                    DLP alert detects large export from analytics; automated playbook suspends export, opens an incident, notifies the DPO, and logs evidence.
                  </p>
                </div>
              </div>

              <div className="whitepaper-section-ten-step">
                <div className="whitepaper-section-ten-step-icon">
                  <FaGavel />
                </div>
                <div className="whitepaper-section-ten-step-content">
                  <h3 className="whitepaper-section-ten-step-title">Governance:</h3>
                  <p className="whitepaper-section-ten-step-text">
                    Residual risk is calculated and presented in the board pack with recommended acceptance or mitigation.
                  </p>
                </div>
              </div>

              <div className="whitepaper-section-ten-step">
                <div className="whitepaper-section-ten-step-icon">
                  <FaTrophy />
                </div>
                <div className="whitepaper-section-ten-step-content">
                  <h3 className="whitepaper-section-ten-step-title">Outcome:</h3>
                  <p className="whitepaper-section-ten-step-text">
                    The new product launches with documented privacy controls, measurable risk reduction, and demonstrable compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - White Background with Image and Text */}
          <div className="whitepaper-section-ten-right">
            <div className="whitepaper-section-ten-image-container">
              <img src={whitepaperImage6} alt="Handshake" className="whitepaper-section-ten-image" />
            </div>
            <div className="whitepaper-section-ten-text">
              <h2 className="whitepaper-section-ten-title">
                10. A pragmatic scenario, how the pieces come together
              </h2>
              <p className="whitepaper-section-ten-example">
                Example: A retail bank launches a new credit-offer engine that uses CRM, analytics and a third-party credit-scoring vendor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section: Privacy As Strategic Advantage */}
      <section className="whitepaper-final-section">
        <div className="whitepaper-final-content">
          <h2 className="whitepaper-final-title">
            Losing, Privacy As Strategic Advantage
          </h2>
          <p className="whitepaper-final-text">
            RiskaVaire treats privacy as an enterprise capability, not a project. By unifying controls, automating evidence, mapping data flows, continuously monitoring, aligning to risk and operationalizing governance, the platform helps organizations turn regulatory obligation into demonstrable, auditable trust.
          </p>
        </div>
      </section>

      {/* Whitepaper Download Modal */}
      {showModal && (
        <div className="whitepaper-modal-overlay" onClick={closeModal}>
          <div className="whitepaper-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="whitepaper-modal-close" 
              onClick={closeModal}
              disabled={isSubmitting}
            >
              ×
            </button>
            
            <div className="whitepaper-modal-header">
              <h2>Download Whitepaper</h2>
              <p>Please provide your details to download the RiskaVaire Whitepaper</p>
            </div>
            
            <form onSubmit={handleSubmit} className="whitepaper-modal-form">
              <div className="whitepaper-form-row">
                <div className="whitepaper-form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                    required
                  />
                  {errors.name && <span className="whitepaper-error-message">{errors.name}</span>}
                </div>
                
                <div className="whitepaper-form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    required
                  />
                  {errors.email && <span className="whitepaper-error-message">{errors.email}</span>}
                </div>
              </div>
              
              <div className="whitepaper-form-row">
                <div className="whitepaper-form-group">
                  <label htmlFor="mobile_number">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobile_number"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleInputChange}
                    className={errors.mobile_number ? 'error' : ''}
                    placeholder="Enter your mobile number"
                    disabled={isSubmitting}
                    required
                  />
                  {errors.mobile_number && <span className="whitepaper-error-message">{errors.mobile_number}</span>}
                </div>
                
                <div className="whitepaper-form-group">
                  <label htmlFor="entity_type">Entity Type *</label>
                  <select
                    id="entity_type"
                    name="entity_type"
                    value={formData.entity_type}
                    onChange={handleInputChange}
                    className={errors.entity_type ? 'error' : ''}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="">Select entity type</option>
                    <option value="Individual">Individual</option>
                    <option value="Small Business">Small Business</option>
                    <option value="Medium Enterprise">Medium Enterprise</option>
                    <option value="Large Enterprise">Large Enterprise</option>
                    <option value="Government">Government</option>
                    <option value="Non-Profit">Non-Profit</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.entity_type && <span className="whitepaper-error-message">{errors.entity_type}</span>}
                </div>
              </div>
              
              <div className="whitepaper-modal-actions">
                <button 
                  type="button" 
                  className="whitepaper-modal-cancel" 
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="whitepaper-modal-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit & Download'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Whitepaper;

