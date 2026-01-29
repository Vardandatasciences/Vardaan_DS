import React from "react";
import { useNavigate } from "react-router-dom";
import "./Solutions.css";

// Import framework icons
import iso27001Icon from "../../../assets/Images/Products/GRC/ISO_27001 logo.png";
import nistIcon from "../../../assets/Images/Products/GRC/NIST 800 logo.png";
import sasbIcon from "../../../assets/Images/Products/GRC/SASB logo.png";
import griIcon from "../../../assets/Images/Products/GRC/GRI logo.png";
import tcfdIcon from "../../../assets/Images/Products/GRC/TCFD logo.png";
import samaIcon from "../../../assets/Images/Products/GRC/SAMA logo.png";
import mastrmIcon from "../../../assets/Images/Products/GRC/MAS_TRM logo.png";
import reachIcon from "../../../assets/Images/Products/GRC/REACH logo.png";
import iso14001Icon from "../../../assets/Images/Products/GRC/ISO_14001 logo.png";
import soxIcon from "../../../assets/Images/Products/GRC/SOX logo.png";
import gdprIcon from "../../../assets/Images/Products/GRC/GDPR logo.png";
import ccpaIcon from "../../../assets/Images/Products/GRC/CCPA logo.png";
import hipaaIcon from "../../../assets/Images/Products/GRC/HIPAA logo.png";
import pciIcon from "../../../assets/Images/Products/GRC/PCI-DSS logo.png";
import basel3Icon from "../../../assets/Images/Products/GRC/Basel_III-removebg-preview.png";
import nydfsIcon from "../../../assets/Images/Products/GRC/NYDFS.jpg";
import amlIcon from "../../../assets/Images/Products/GRC/AML.png";
import doddfrankIcon from "../../../assets/Images/Products/GRC/DODD-Frank logo.png";
import ffiecIcon from "../../../assets/Images/Products/GRC/FFIEC logo.png";
import solvency2Icon from "../../../assets/Images/Products/GRC/SOLVENCY II.avif";
import naicIcon from "../../../assets/Images/Products/GRC/NAIC.jpg";
import lodrIcon from "../../../assets/Images/Products/GRC/ORSA.png"; // Using ORSA icon as placeholder for LODR
import orsaIcon from "../../../assets/Images/Products/GRC/ORSA.png";
import ifrsIcon from "../../../assets/Images/Products/GRC/IFRS.png";
import cyberFrameworksIcon from "../../../assets/Images/Products/GRC/Cyber_security_frameworks logo.png";
import stateInsuranceIcon from "../../../assets/Images/Products/GRC/State-Privacy-Laws.png";
import hitechIcon from "../../../assets/Images/Products/GRC/HITECH-Act logo.png";
import hitrustIcon from "../../../assets/Images/Products/GRC/HITRUST-CSF logo.png";
import fda820Icon from "../../../assets/Images/Products/GRC/FDA-21-CFR logo.png";
import statePrivacyIcon from "../../../assets/Images/Products/GRC/State-Privacy-Laws.png";
import jointCommissionIcon from "../../../assets/Images/Products/GRC/Joint-Commission-Standards.jpg";
import iso9001Icon from "../../../assets/Images/Products/GRC/ISO_9001 icon.png";
import oshaIcon from "../../../assets/Images/Products/GRC/OSHA icon.png";
import fdagmpIcon from "../../../assets/Images/Products/GRC/FDA_GMP icon.png";
import epaIcon from "../../../assets/Images/Products/GRC/EPA-Environmental-Regulations icon.png";
import itarIcon from "../../../assets/Images/Products/GRC/ITAR icon.png";
import industryStandardIcon from "../../../assets/Images/Products/GRC/Industry-Specific icon.png";
import soc2Icon from "../../../assets/Images/Products/GRC/SOC_2 icon.png";
import fedrampIcon from "../../../assets/Images/Products/GRC/FedRAMP icon.png";
import industryCertIcon from "../../../assets/Images/Products/GRC/Industry-Specific icon.png";
import earIcon from "../../../assets/Images/Products/GRC/ISO_9001 icon.png";

const Solutions = () => {
  const navigate = useNavigate();

  const frameworksData = [
    {
      id: 'iso27001',
      name: 'ISO 27001',
      tag: 'ISO',
      color: '#4FC3F7',
      icon: iso27001Icon,
      intro: "With Vardaan's GRC platform, ISO 27001 compliance becomes an always-on, automated process—not a yearly firefight.",
      description: "Our AI engine integrates with your IT, security, and business systems, capturing compliance-relevant events as they happen—new access grants, firewall changes, vulnerability patches, incident logs—automatically mapping them to the right ISO 27001 control and storing them as evidence.",
      benefits: [
        "Zero scramble before audits – Evidence is pre-mapped, timestamped, and ready for auditors anytime.",
        "Continuous compliance – Controls are monitored 24/7, not just during audit season.",
        "Gap detection before they become findings – AI flags anomalies and risks in real time.",
        "No manual data chasing – Saves hundreds of man-hours annually across teams.",
        "One-click reporting – Instantly generate ISO 27001-ready reports for auditors or management."
      ],
      roi: [
        "50–70% reduction in audit preparation time and cost.",
        "30–40% faster risk and incident resolution thanks to early detection.",
        "100% traceability for every compliance action, reducing audit failure risk to near zero.",
        "Improved productivity – Free your security and compliance teams to focus on high-value tasks, not paperwork."
      ],
      summary: "In short, Vardaan's GRC makes compliance work for you—delivering a faster, cheaper, and more accurate ISO 27001 program, with real-time visibility for both operations and executives."
    },
    {
      id: 'nist800',
      name: 'NIST 800-series',
      tag: 'NIST',
      color: '#4FC3F7',
      icon: nistIcon,
      intro: "With Vardaan's GRC platform, NIST 800-series compliance shifts from static documents to a living, automated ecosystem.",
      description: "Our AI-driven engine continuously connects to your cyber, IT, and operational systems—capturing compliance-relevant events like configuration changes, vulnerability scans, incident reports, and user access updates in real time. Each event is instantly mapped to the right NIST control family (Access Control, Incident Response, Configuration Management, etc.) and logged as verifiable evidence.",
      benefits: [
        "Always audit-ready – Evidence is collected and linked to NIST controls 24/7.",
        "Continuous monitoring – AI flags deviations before they escalate into compliance violations.",
        "Cross-framework leverage – Evidence captured for NIST can be reused for FedRAMP, CMMC, ISO, and other frameworks.",
        "No manual tracking – Eliminates spreadsheets and siloed email trails.",
        "Single-pane view – Dashboards for executives, CISOs, and auditors in one place."
      ],
      roi: [
        "Up to 70% faster audit cycles – Slash months of prep to days.",
        "40% fewer compliance gaps – Early alerts allow quick remediation.",
        "Reduced security incident costs – Continuous control monitoring means threats are detected and mitigated earlier.",
        "Compliance staff efficiency doubled – Your team spends time securing systems, not chasing documents."
      ],
      summary: "In short, Vardaan's GRC turns NIST compliance into an automated, repeatable, and cost-effective process—giving you real-time assurance, not once-a-year paperwork."
    },
    {
      id: 'sasb',
      name: 'SASB',
      tag: 'SASB',
      color: '#4FC3F7',
      icon: sasbIcon,
      intro: "With Vardaan's GRC platform, SASB compliance becomes a real-time, data-driven process—no more year-end ESG fire drills.",
      description: "Our AI-powered engine connects directly to your operational, financial, HR, and sustainability data sources—automatically capturing metrics like greenhouse gas emissions, energy use, safety incidents, supply chain disruptions, and workforce diversity statistics. Each event or metric is automatically mapped to the relevant SASB disclosure requirement for your industry and stored as verifiable evidence.",
      benefits: [
        "Always disclosure-ready – SASB metrics are updated continuously, not just once a year.",
        "Industry-specific mapping – AI ensures your data aligns with the correct SASB standards for your sector.",
        "Cross-framework synergy – Evidence collected for SASB can also feed into GRI, TCFD, and CSRD reporting.",
        "No manual number-crunching – Automated data feeds remove human error and save massive reporting time.",
        "Executive and investor dashboards – One-click views for ESG performance and risk trends."
      ],
      roi: [
        "50–60% reduction in ESG reporting costs by cutting manual consolidation and validation time.",
        "Real-time ESG visibility improves investor trust and brand reputation.",
        "Faster response to ESG risks – Safety, environmental, or social deviations are flagged instantly.",
        "One source of truth for compliance, investor relations, and sustainability teams."
      ],
      summary: "With Vardaan's GRC, SASB compliance isn't a reporting burden—it's a competitive advantage that showcases transparency, attracts ESG-conscious investors, and keeps you ahead of regulatory and market expectations."
    },
    {
      id: 'gri',
      name: 'GRI',
      tag: 'GRI',
      color: '#4FC3F7',
      icon: griIcon,
      intro: "With Vardaan's GRC platform, GRI reporting becomes a living, automated process—built on real-time data, not year-end scramble.",
      description: "Our AI engine connects directly to your operational, HR, environmental, supply chain, and financial systems—automatically capturing metrics like carbon emissions, water consumption, waste generation, labor practices, diversity, human rights compliance, and community impact. Each data point is instantly tagged to the correct GRI Standard and disclosure requirement, stored as verifiable evidence, and ready for auditor or stakeholder review.",
      benefits: [
        "Always reporting-ready – No manual data hunts; GRI metrics are updated 24/7.",
        "Standard-aligned from day one – AI ensures every metric is mapped to the correct GRI disclosure and indicator.",
        "Multi-framework leverage – Data collected for GRI also feeds SASB, TCFD, and CSRD reporting.",
        "Proactive ESG management – Instant alerts when performance drifts from targets.",
        "Investor-grade dashboards – Visualize and share ESG progress with executives, regulators, and shareholders."
      ],
      roi: [
        "50–65% reduction in reporting time & cost – No more manual spreadsheet consolidation.",
        "Early issue detection – Spot ESG risks months before formal reporting deadlines.",
        "Improved audit success rate – Complete, timestamped evidence ready for verification.",
        "Stronger ESG ratings & market trust – Demonstrating transparency drives investor confidence."
      ],
      summary: "With Vardaan's GRC, GRI reporting isn't a compliance headache—it's a real-time ESG intelligence system that strengthens your brand, boosts stakeholder trust, and future-proofs your sustainability commitments."
    },
    {
      id: 'tcfd',
      name: 'TCFD',
      tag: 'TCFD',
      color: '#4FC3F7',
      icon: tcfdIcon,
      intro: "With Vardaan's GRC platform, TCFD compliance moves from static annual reports to a dynamic, always-on climate risk intelligence system.",
      description: "Our AI-powered engine integrates with your environmental, operational, supply chain, and financial data sources—automatically capturing climate-related metrics and events like emissions data, energy use, extreme weather disruptions, supply chain vulnerabilities, and investment exposure to climate risks. Each data point is mapped to the correct TCFD pillar (Governance, Strategy, Risk Management, Metrics & Targets) and stored as audit-ready evidence.",
      benefits: [
        "Continuous readiness – TCFD-aligned data is tracked and updated automatically year-round.",
        "Early risk visibility – AI flags climate risk impacts before they hit financial performance.",
        "Cross-reporting efficiency – Evidence captured for TCFD can also power GRI, SASB, and CSRD reports.",
        "No manual data wrangling – Automated data capture from IoT sensors, ERP, and ESG tools saves huge effort.",
        "Investor and regulator confidence – Provide transparent, verifiable climate risk data on demand."
      ],
      roi: [
        "50–70% reduction in TCFD reporting costs through automation.",
        "Faster decision-making – Climate risk dashboards give executives real-time insights.",
        "Lower compliance risk – Accurate, time-stamped evidence reduces the chance of misreporting.",
        "Enhanced ESG ratings – Transparent climate risk disclosure improves investor perception and funding access."
      ],
      summary: "With Vardaan's GRC, TCFD reporting isn't just about ticking regulatory boxes—it's about turning climate data into a strategic advantage for your business and stakeholders."
    },
    {
      id: 'sama',
      name: 'SAMA Cybersecurity',
      tag: 'SAMA',
      color: '#4FC3F7',
      icon: samaIcon,
      intro: "With Vardaan's GRC platform, SAMA Cybersecurity compliance becomes a continuous, automated assurance process—not a last-minute documentation rush.",
      description: "Our AI engine integrates with your IT, security, risk, and governance systems—automatically capturing SAMA-relevant events such as access control changes, vulnerability scans, incident response logs, configuration updates, and third-party risk data. Each event is mapped to the correct SAMA domain and sub-control (e.g., Cybersecurity Governance, Risk Management, Asset Management, Access Control, Business Continuity) and stored as audit-ready evidence.",
      benefits: [
        "Always compliant, always ready – Evidence linked to SAMA controls is maintained 24/7.",
        "Real-time deviation alerts – AI flags gaps or non-compliance instantly for early remediation.",
        "Audit in days, not months – Pre-mapped control evidence slashes audit preparation time.",
        "Unified compliance – Evidence captured for SAMA can also support ISO 27001, NCA ECC, and other regional frameworks.",
        "Centralized visibility – One dashboard for CISOs, auditors, and executives to track compliance health."
      ],
      roi: [
        "50–70% reduction in compliance preparation costs through automation.",
        "40% faster issue resolution thanks to early gap detection.",
        "Reduced regulatory risk – Lower chance of fines or sanctions due to missed controls.",
        "Higher operational efficiency – Compliance teams spend time improving security, not chasing documents."
      ],
      summary: "With Vardaan's GRC, SAMA compliance isn't a burden—it's a real-time, intelligence-driven cybersecurity assurance system that keeps your organization ahead of regulatory expectations."
    },
    {
      id: 'mastrm',
      name: 'MAS TRM',
      tag: 'MAS',
      color: '#4FC3F7',
      icon: mastrmIcon,
      intro: "With Vardaan's GRC platform, MAS TRM compliance becomes a real-time, automated assurance process—keeping your financial operations resilient and regulator-ready every day.",
      description: "Our AI-powered platform integrates with your IT, cybersecurity, operations, and risk systems—automatically capturing MAS TRM–relevant events such as system availability metrics, incident response logs, cybersecurity alerts, access control changes, penetration test results, and vendor risk assessments. Every data point is mapped to the correct MAS TRM domain (e.g., IT Governance, Cybersecurity, Incident Management, System Availability, Outsourcing) and stored as verifiable evidence.",
      benefits: [
        "Always audit-ready – Continuous evidence mapping to MAS TRM requirements means no last-minute scramble.",
        "Early risk alerts – AI flags incidents or control gaps before they escalate into compliance breaches.",
        "Multi-framework efficiency – Evidence collected for MAS TRM can also serve ISO 27001, NIST, and other APAC regulatory frameworks.",
        "One-click compliance reporting – Generate regulator-ready reports instantly.",
        "Clear executive oversight – Dashboards translate technical compliance into business language for board review."
      ],
      roi: [
        "50–70% reduction in compliance preparation costs via automation.",
        "40% faster incident detection and remediation thanks to real-time monitoring.",
        "Lower regulatory exposure – Minimized risk of non-compliance fines or directives.",
        "Increased team productivity – Compliance and security teams spend more time strengthening controls, less on manual reporting."
      ],
      summary: "With Vardaan's GRC, MAS TRM compliance is not just about satisfying regulators—it's about building operational resilience and trust that directly supports your financial institution's reputation and growth."
    },
    {
      id: 'product',
      name: 'REACH, RoHS, WEEE',
      tag: 'REACH',
      color: '#4FC3F7',
      icon: reachIcon,
      intro: "With Vardaan's GRC platform, product compliance for REACH, RoHS, and WEEE becomes an automated, always-on process—ensuring market access, brand trust, and zero regulatory surprises.",
      description: "Our AI-powered platform integrates with your ERP, PLM, supply chain, and quality systems—automatically capturing compliance-relevant events such as material composition data, supplier declarations, hazardous substance testing results, recycling/disposal tracking, and product change notices.",
      benefits: [
        "Always market-ready – Compliance data updated in real time for EU and other jurisdictions.",
        "Automated supplier compliance checks – AI validates supplier documentation and flags gaps.",
        "Product lifecycle compliance – From design to disposal, every step is tracked and documented.",
        "Multi-framework leverage – Evidence for REACH, RoHS, and WEEE can also support ESG and sustainability reporting.",
        "Instant regulatory reporting – One-click generation of compliance files for authorities or customers."
      ],
      roi: [
        "50–60% reduction in compliance administration costs by automating data collection and validation.",
        "Faster market entry – Avoid shipment delays due to missing documentation.",
        "Reduced recall risk – Early detection of non-compliant materials or suppliers.",
        "Enhanced brand trust – Demonstrate responsible manufacturing to customers and regulators."
      ],
      summary: "With Vardaan's GRC, REACH, RoHS, and WEEE compliance isn't just about avoiding penalties—it's about streamlining product compliance across the supply chain, protecting revenue, and building sustainability credibility."
    },
    {
      id: 'iso14001',
      name: 'ISO 14001',
      tag: 'ISO',
      color: '#4FC3F7',
      icon: iso14001Icon,
      intro: "With Vardaan's GRC platform, ISO 14001 environmental compliance becomes a live, automated management system—not a binder of outdated reports.",
      description: "Our AI-powered engine integrates with your operational, IoT, environmental monitoring, supply chain, and waste management systems—automatically capturing key ISO 14001 metrics such as energy consumption, water usage, emissions, waste generation, chemical storage, and incident reports. Every data point is automatically mapped to the relevant ISO 14001 clause (Environmental Policy, Planning, Implementation, Evaluation, and Improvement) and stored as verifiable evidence.",
      benefits: [
        "Continuous compliance – 24/7 monitoring ensures controls remain effective year-round.",
        "Real-time environmental performance tracking – AI flags deviations from targets instantly.",
        "Cross-framework efficiency – Evidence collected can also serve GRI, SASB, TCFD, and ISO 50001 reporting.",
        "Audit-ready at any time – No last-minute scramble before external certification audits.",
        "Stakeholder confidence – Transparent data builds trust with regulators, customers, and communities."
      ],
      roi: [
        "50–65% reduction in audit preparation costs via automated data capture and mapping.",
        "Lower environmental risk costs – Early detection of non-compliance prevents fines and shutdowns.",
        "Faster certification cycles – Pre-mapped evidence accelerates audit completion.",
        "Improved ESG ratings – Verified environmental data boosts sustainability scores and investor appeal."
      ],
      summary: "With Vardaan's GRC, ISO 14001 is not just a certificate—it's a living environmental management system that protects the planet, reduces operational risks, and strengthens your market position."
    },
    {
      id: 'sox',
      name: 'SOX',
      tag: 'SOX',
      color: '#4FC3F7',
      icon: soxIcon,
      intro: "With Vardaan's GRC platform, SOX compliance becomes an always-on, automated control assurance process—reducing audit risk and cutting manual work in half.",
      description: "Our AI-driven platform integrates with your ERP, financial systems, HR systems, and IT controls—automatically capturing SOX-relevant events such as user access changes, segregation of duties violations, journal entry approvals, system configuration changes, and exception reports. Each event is mapped to the correct SOX Section 302 or 404 control requirement, time-stamped, and stored as verifiable evidence.",
      benefits: [
        "Audit-ready 24/7 – Evidence for internal controls over financial reporting (ICFR) is continuously maintained.",
        "Real-time gap alerts – AI flags control breakdowns before they become audit findings.",
        "Cross-framework coverage – Evidence captured for SOX can also serve PCI-DSS, ISO 27001, and NIST audits.",
        "Streamlined testing – Automated workflows simplify quarterly and annual control testing.",
        "Executive visibility – Dashboards for CFOs, auditors, and compliance teams show control health at a glance."
      ],
      roi: [
        "50–70% reduction in SOX testing & documentation effort through automation.",
        "Fewer audit deficiencies – Early alerts mean issues are fixed before auditors arrive.",
        "Lower external audit costs – Less time auditors spend chasing evidence = smaller bill.",
        "Increased finance team productivity – Focus on analysis and strategy, not control checklists."
      ],
      summary: "With Vardaan's GRC, SOX compliance isn't just about meeting regulatory requirements—it's a continuous assurance system that strengthens governance, reduces financial risk, and builds investor confidence."
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      tag: 'GDPR',
      color: '#4FC3F7',
      icon: gdprIcon,
      intro: "With Vardaan's GRC platform, GDPR compliance becomes a proactive, automated data protection program—not a reactive, paper-heavy burden.",
      description: "Our AI-powered platform integrates with your HR, CRM, marketing, IT security, and cloud systems—automatically capturing GDPR-relevant events such as data subject requests, consent changes, data access logs, breach notifications, and retention/deletion actions. Each event is mapped to the relevant GDPR Article (e.g., Lawfulness of Processing, Data Subject Rights, Data Breach Notification, Data Minimization) and stored as verifiable, time-stamped evidence.",
      benefits: [
        "Always audit-ready – Evidence for GDPR controls is continuously updated and organized.",
        "Real-time breach alerts – AI flags unusual data activity before it becomes a reportable incident.",
        "Consent & DSAR automation – Track, validate, and respond to data subject requests without manual chasing.",
        "Cross-framework efficiency – GDPR evidence can also serve CCPA, ISO 27701, and other privacy regulations.",
        "Executive dashboards – One-click visibility into privacy posture for DPOs and compliance leaders."
      ],
      roi: [
        "50–65% reduction in compliance administration time through automated evidence capture and request handling.",
        "Lower breach fines – Early detection and response minimize regulatory penalties.",
        "Reduced manual workload – Privacy teams focus on improving controls instead of compiling reports.",
        "Improved customer trust – Transparent, compliant data handling boosts brand reputation and retention."
      ],
      summary: "With Vardaan's GRC, GDPR compliance isn't just about avoiding penalties—it's about embedding privacy-by-design into daily operations, protecting both your customers and your brand."
    },
    {
      id: 'ccpa',
      name: 'CCPA',
      tag: 'CCPA',
      color: '#4FC3F7',
      icon: ccpaIcon,
      intro: "With Vardaan's GRC platform, CCPA compliance becomes a real-time, automated privacy assurance program—eliminating manual data hunts and reducing regulatory risk.",
      description: "Our AI-powered platform integrates with your CRM, marketing automation tools, HR systems, e-commerce platforms, and IT security tools—automatically capturing CCPA-relevant events such as consumer data access/deletion requests, opt-outs of data sale, consent changes, third-party data sharing logs, and breach notifications. Each event is mapped to the correct CCPA requirement and stored as verifiable, time-stamped evidence for regulators or internal audits.",
      benefits: [
        "Always compliance-ready – Evidence for CCPA requirements is continuously updated and organized.",
        "Automated DSAR handling – Track, validate, and fulfill consumer requests within statutory deadlines.",
        "Real-time breach alerts – AI flags unusual data activity before it becomes a costly violation.",
        "Cross-framework leverage – CCPA evidence also supports GDPR, ISO 27701, and other privacy laws.",
        "Executive dashboards – Clear, real-time visibility into privacy posture for legal and compliance teams."
      ],
      roi: [
        "50–60% reduction in compliance administration costs via automation.",
        "Lower penalty exposure – Early detection and rapid response reduce fine risks.",
        "Improved team productivity – Privacy teams spend more time improving governance, less on chasing records.",
        "Higher consumer trust – Transparent handling of data builds brand loyalty and market differentiation."
      ],
      summary: "With Vardaan's GRC, CCPA compliance isn't just about avoiding fines—it's about embedding consumer privacy into your business DNA, building trust while maintaining operational efficiency."
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      tag: 'HIPAA',
      color: '#4FC3F7',
      icon: hipaaIcon,
      intro: "With Vardaan's GRC platform, HIPAA compliance becomes a continuous, automated patient data protection program—not a reactive scramble after audits or incidents.",
      description: "Our AI-powered platform integrates with your EHR/EMR systems, billing software, HR systems, cloud storage, and security tools—automatically capturing HIPAA-relevant events such as PHI access logs, unauthorized access attempts, security incident reports, employee training records, policy updates, and vendor risk assessments. Each event is mapped to the relevant HIPAA Privacy, Security, or Breach Notification Rule requirement and stored as verifiable, time-stamped evidence.",
      benefits: [
        "Always audit-ready – HIPAA control evidence is continuously updated and organized for OCR inspections.",
        "Real-time breach alerts – AI flags unusual PHI activity before it becomes a reportable incident.",
        "Automated workforce compliance tracking – Monitor mandatory HIPAA training completion and policy acknowledgements.",
        "Cross-framework efficiency – Evidence collected for HIPAA can also serve HITRUST, ISO 27001, and other healthcare regulations.",
        "Centralized visibility – Dashboards for compliance officers, CIOs, and security teams in one place."
      ],
      roi: [
        "50–65% reduction in compliance administration costs via automated evidence capture.",
        "Lower breach-related costs – Early detection reduces incident scope and fines.",
        "Improved staff productivity – Less manual reporting, more focus on improving patient care and data security.",
        "Reduced audit findings – Automated monitoring closes compliance gaps before auditors find them."
      ],
      summary: "With Vardaan's GRC, HIPAA compliance isn't just a checkbox—it's a living patient data protection system that builds trust, safeguards your reputation, and keeps you ahead of regulatory demands."
    },
    {
      id: 'pci',
      name: 'PCI DSS',
      tag: 'PCI',
      color: '#4FC3F7',
      icon: pciIcon,
      intro: "With Vardaan's GRC platform, PCI DSS compliance becomes a real-time, automated control monitoring program—protecting cardholder data and keeping you audit-ready every day.",
      description: "Our AI-powered platform integrates with your POS systems, payment gateways, firewalls, intrusion detection systems, vulnerability scanners, and access control tools—automatically capturing PCI DSS–relevant events such as firewall rule changes, vulnerability scan results, encryption key updates, access logs, penetration test outcomes, and incident reports. Each event is mapped to the correct PCI DSS requirement (from network security to vulnerability management to monitoring and testing) and stored as verifiable, time-stamped evidence.",
      benefits: [
        "Always compliant, always ready – Continuous evidence mapping to PCI DSS requirements means no last-minute scramble.",
        "Real-time risk detection – AI flags deviations, unpatched vulnerabilities, or suspicious activities instantly.",
        "Cross-framework synergy – Evidence collected for PCI DSS can also serve ISO 27001, NIST, and SOX controls.",
        "Automated reporting – Generate ROC (Report on Compliance) and SAQ (Self-Assessment Questionnaire) outputs in minutes.",
        "Full visibility – Dashboards for CISOs, compliance teams, and QSA auditors in one view."
      ],
      roi: [
        "50–70% reduction in audit preparation time via automated evidence collection.",
        "Fewer audit findings – Early alerts help fix issues before the assessor sees them.",
        "Reduced breach risk – Continuous monitoring detects threats before they impact cardholder data.",
        "Lower compliance costs – Less manual effort means leaner compliance staffing and QSA engagement time."
      ],
      summary: "With Vardaan's GRC, PCI DSS compliance isn't just about passing an annual audit—it's a continuous assurance system that protects customer trust, reduces risk, and keeps your payment operations secure year-round."
    },
    {
      id: 'basel3',
      name: 'Basel III',
      tag: 'BASEL',
      color: '#4FC3F7',
      icon: basel3Icon,
      intro: "With Vardaan's GRC platform, Basel III compliance becomes a continuous, automated capital and liquidity management system—transforming regulatory burden into competitive advantage for banks and financial institutions.",
      description: "Our AI-powered engine integrates with your core banking systems, treasury management, risk systems, and trading platforms—automatically capturing Basel III-relevant events such as capital tier calculations, liquidity coverage ratios (LCR), net stable funding ratios (NSFR), leverage ratio tracking, risk-weighted asset (RWA) computations, stress test results, and counterparty credit risk exposures. Each data point is mapped to the correct Basel III pillar (Minimum Capital Requirements, Supervisory Review, Market Discipline) and stored as verifiable evidence for regulators.",
      benefits: [
        "Always audit-ready – Capital and liquidity evidence is continuously updated and organized for regulatory submissions.",
        "Real-time risk monitoring – AI flags capital ratio deviations before they become compliance violations.",
        "Cross-framework leverage – Evidence captured for Basel III can also serve stress testing and regulatory reporting.",
        "No manual capital calculations – Automated RWA and capital ratio computations eliminate human error.",
        "Executive dashboards – One-click views for capital adequacy, liquidity coverage, and leverage ratios."
      ],
      roi: [
        "40-50% reduction in regulatory reporting time through automated capital and liquidity calculations",
        "30% improvement in capital efficiency via optimized RWA management and buffer utilization",
        "25% reduction in stress testing costs through continuous monitoring replacing periodic assessments",
        "100% audit readiness with real-time capital adequacy tracking eliminating quarterly scrambles"
      ],
      summary: "With Vardaan's GRC, Basel III compliance isn't just about meeting regulatory minimums—it's an intelligent capital management system that strengthens financial resilience, lowers funding costs, and positions banks for sustainable growth in global markets."
    },
    {
      id: 'nydfs500',
      name: 'NYDFS Cybersecurity Regulation',
      tag: 'NYDFS',
      color: '#4FC3F7',
      icon: nydfsIcon,
      intro: "With Vardaan's GRC platform, NYDFS 23 NYCRR 500 compliance becomes an always-on cybersecurity assurance program—protecting New York financial institutions while eliminating manual compliance burden.",
      description: "Our AI-driven platform integrates with your cybersecurity infrastructure, IT systems, incident response tools, and third-party vendor management platforms—automatically capturing NYDFS-relevant events such as penetration test results, vulnerability assessments, access control changes, cybersecurity incident reports, CISO certifications, third-party due diligence records, and annual risk assessments. Each event is mapped to specific NYDFS requirements (Sections 500.02-500.23) and stored as time-stamped, audit-ready evidence for regulators.",
      benefits: [
        "Always compliance-ready – Evidence for NYDFS requirements is continuously updated and organized.",
        "Real-time incident alerts – Automated 72-hour breach notification compliance ensures timely reporting.",
        "Cross-framework synergy – NYDFS evidence supports ISO 27001, NIST, SOC 2, and PCI DSS simultaneously.",
        "Automated vendor assessments – Continuous third-party due diligence tracking meets NYDFS standards.",
        "Executive certification dashboards – One-click compliance certification for board and senior management."
      ],
      roi: [
        "50-65% reduction in compliance administration costs via automated evidence collection and reporting",
        "30% faster audit cycles with pre-organized documentation mapped to NYDFS sections",
        "40% reduction in third-party security incidents through continuous vendor monitoring",
        "Real-time compliance posture visibility for CISOs, boards, and regulators"
      ],
      summary: "With Vardaan's GRC, NYDFS 23 NYCRR 500 compliance isn't a checkbox exercise—it's a comprehensive cybersecurity governance system that protects customer data, prevents regulatory fines, and positions your institution as a security leader in New York's financial sector."
    },
    {
      id: 'aml',
      name: 'Anti-Money Laundering (AML)',
      tag: 'AML',
      color: '#4FC3F7',
      icon: amlIcon,
      intro: "With Vardaan's GRC platform, AML compliance becomes an intelligent, automated financial crime prevention system—detecting suspicious activity in real-time while reducing false positives and compliance costs.",
      description: "Our AI-powered engine integrates with your transaction monitoring systems, customer onboarding platforms, KYC databases, sanctions screening tools, and case management systems—automatically capturing AML-relevant events such as suspicious transaction alerts, customer due diligence (CDD) updates, enhanced due diligence (EDD) triggers, beneficial ownership verification, sanctions hits, currency transaction reports (CTRs), and suspicious activity reports (SARs). Each event is mapped to applicable AML regulations (Bank Secrecy Act, USA PATRIOT Act, FinCEN guidance) and stored as audit-ready evidence.",
      benefits: [
        "Automated transaction monitoring – AI reduces false positives by 60-70% vs. traditional rule-based systems.",
        "Real-time suspicious activity detection – Identify money laundering patterns 50% faster than manual reviews.",
        "Cross-system integration – Unified view of KYC, transaction monitoring, and case management data.",
        "Automated reporting – Generate CTRs and SARs with pre-mapped regulatory evidence and documentation.",
        "Risk-based compliance – Tailored controls align with actual risk profiles vs. one-size-fits-all approaches."
      ],
      roi: [
        "60-70% reduction in false positive alerts through AI-driven behavioral analysis",
        "40-50% cost savings via automated transaction monitoring and case management",
        "50% faster investigation resolution with integrated evidence collection and reporting",
        "30-40% improvement in SAR quality reducing regulatory follow-up inquiries"
      ],
      summary: "With Vardaan's GRC, AML compliance isn't just about avoiding fines—it's an intelligent financial crime prevention system that protects your institution, enhances customer trust, and provides competitive advantage in an increasingly regulated global marketplace."
    },
    {
      id: 'doddfrank',
      name: 'Dodd-Frank Wall Street Reform Act',
      tag: 'DODD-FRANK',
      color: '#4FC3F7',
      icon: doddfrankIcon,
      intro: "With Vardaan's GRC platform, Dodd-Frank compliance becomes a streamlined, automated regulatory management system—reducing compliance burden while strengthening consumer protection and systemic risk management.",
      description: "Our AI-powered platform integrates with your risk management systems, trading platforms, compliance tools, consumer protection databases, and stress testing infrastructure—automatically capturing Dodd-Frank–relevant events such as Volcker Rule trading restrictions, CCAR/DFAST stress test results, systemic risk indicators for SIFIs, consumer complaint tracking, derivatives reporting, executive compensation disclosures, and whistleblower submissions. Each data point is mapped to the relevant Dodd-Frank title (16 titles covering 243 rules) and stored as verifiable regulatory evidence.",
      benefits: [
        "Automated stress testing – CCAR/DFAST submissions completed 40% faster with continuous data collection.",
        "Real-time Volcker Rule monitoring – Prevent prohibited proprietary trading through automated transaction analysis.",
        "Cross-framework compliance – Evidence supports multiple Dodd-Frank titles and regulatory requirements simultaneously.",
        "Consumer protection automation – Automated complaint tracking and resolution management for CFPB compliance.",
        "Executive oversight dashboards – Board-level visibility into systemic risk indicators and compliance posture."
      ],
      roi: [
        "40-50% reduction in stress testing costs through automated data aggregation and scenario modeling",
        "30% reduction in regulatory reporting burden via unified compliance evidence management",
        "25% improvement in risk identification through integrated systemic risk monitoring",
        "50% faster response to regulatory inquiries with centralized documentation"
      ],
      summary: "With Vardaan's GRC, Dodd-Frank compliance isn't an overwhelming regulatory burden—it's an integrated risk management and consumer protection system that strengthens governance, prevents crises, and positions your institution for sustainable growth."
    },
    {
      id: 'ffiec',
      name: 'FFIEC Cybersecurity Guidelines',
      tag: 'FFIEC',
      color: '#4FC3F7',
      icon: ffiecIcon,
      intro: "With Vardaan's GRC platform, FFIEC cybersecurity compliance becomes a continuous, automated assurance program—helping federally supervised financial institutions achieve and maintain robust cyber resilience.",
      description: "Our AI-powered platform integrates with your IT infrastructure, cybersecurity tools, risk assessment systems, and audit frameworks—automatically capturing FFIEC-relevant events such as Cybersecurity Assessment Tool (CAT) results, inherent risk profile calculations, cybersecurity maturity levels across five domains (Cyber Risk Management, Threat Intelligence, Cybersecurity Controls, External Dependency Management, Cyber Incident Management), penetration testing outcomes, vulnerability scan data, and board reporting documentation. Each data point is mapped to FFIEC IT Examination Handbook requirements and stored as audit-ready evidence.",
      benefits: [
        "Automated CAT scoring – Reduce cybersecurity assessment time by 50% with continuous maturity level tracking.",
        "Real-time maturity improvement – Track progression across Baseline, Evolving, Intermediate, Advanced, Innovative levels.",
        "Cross-framework compliance – FFIEC evidence supports NIST CSF, ISO 27001, and SOC 2 simultaneously.",
        "Risk-based resource allocation – Match maturity investments to actual inherent risk profile vs. arbitrary spending.",
        "Board reporting dashboards – Executive visibility into cybersecurity maturity and inherent risk levels."
      ],
      roi: [
        "50% reduction in CAT assessment time via automated evidence collection and scoring",
        "30-40% improvement in examination outcomes through continuous compliance monitoring",
        "40% reduction in remediation costs via early gap detection and prioritization",
        "25% decrease in third-party security incidents through structured vendor oversight"
      ],
      summary: "With Vardaan's GRC, FFIEC compliance isn't a burdensome assessment—it's a continuous cybersecurity maturity framework that strengthens defenses, streamlines examinations, and demonstrates regulatory commitment to protecting customer data."
    },
    {
      id: 'solvency2',
      name: 'Solvency II',
      tag: 'SOLVENCY-II',
      color: '#4FC3F7',
      icon: solvency2Icon,
      intro: "With Vardaan's GRC platform, Solvency II compliance becomes an intelligent, automated risk and capital management system—ensuring EU insurers maintain financial stability while reducing regulatory burden.",
      description: "Our AI-powered engine integrates with your actuarial systems, investment management platforms, risk modeling tools, and financial reporting infrastructure—automatically capturing Solvency II-relevant data such as Solvency Capital Requirement (SCR) calculations, Minimum Capital Requirement (MCR) tracking, Own Risk and Solvency Assessment (ORSA) reports, technical provisions valuations, asset-liability matching metrics, Solvency and Financial Condition Reports (SFCR), and supervisory reporting submissions. Each data point is mapped to the correct Solvency II pillar (Quantitative Requirements, Qualitative Supervision, Disclosure) and stored as verifiable regulatory evidence.",
      benefits: [
        "Automated SCR calculations – Real-time Solvency Capital Requirement monitoring with automated risk modeling.",
        "Continuous ORSA reporting – Own Risk and Solvency Assessment completed 40% faster with integrated risk data.",
        "Cross-pillar compliance – Evidence supports all three Solvency II pillars simultaneously for comprehensive coverage.",
        "Regulatory reporting automation – Automated SFCR generation and supervisory submission management.",
        "Risk-based capital optimization – Strategic capital allocation based on real-time SCR and MCR monitoring."
      ],
      roi: [
        "50-60% reduction in regulatory reporting costs through automated data collection and SFCR generation",
        "30% improvement in capital efficiency via optimized risk modeling and internal model approval",
        "40% faster ORSA completion with integrated risk assessment and stress testing",
        "25% reduction in actuarial costs through automated technical provisions calculations"
      ],
      summary: "With Vardaan's GRC, Solvency II compliance isn't just regulatory burden—it's an intelligent risk and capital management system that protects policyholders, optimizes capital allocation, and positions insurers for profitable growth in EU markets."
    },
    {
      id: 'naicmodels',
      name: 'NAIC Model Laws',
      tag: 'NAIC',
      color: '#4FC3F7',
      icon: naicIcon,
      intro: "With Vardaan's GRC platform, NAIC Model Law compliance becomes a unified, automated regulatory management system—helping insurers navigate state-by-state requirements while maintaining operational consistency.",
      description: "Our AI-powered platform integrates with your policy administration systems, claims management platforms, licensing databases, financial reporting tools, and data security infrastructure—automatically capturing NAIC-relevant events such as cybersecurity program documentation, data breach notifications, producer licensing verifications, market conduct compliance, financial solvency metrics, consumer complaint tracking, and state-specific reporting requirements. Each data point is mapped to applicable NAIC Model Laws (including Data Security Model Law #668, ORSA Model Act #505, Corporate Governance Model Act #305) and state adoption variations.",
      benefits: [
        "Always compliance-ready – Multi-state regulatory evidence is continuously updated and organized for all 50+ states.",
        "Real-time state-specific tracking – AI adapts to individual state requirements and regulatory variations automatically.",
        "Cross-state framework leverage – Unified evidence supports multiple NAIC model laws simultaneously.",
        "Automated producer licensing – Continuous tracking prevents unlicensed agent activity and regulatory violations.",
        "Executive dashboards – One-click views for market conduct, solvency, and consumer protection compliance."
      ],
      roi: [
        "40-50% reduction in multi-state compliance costs through unified evidence management",
        "60% faster state filings via IIPRC-integrated product approval workflows",
        "30% reduction in market conduct violations through automated policy and claim monitoring",
        "50% improvement in data breach response with automated notification and remediation"
      ],
      summary: "With Vardaan's GRC, NAIC Model Law compliance isn't a state-by-state headache—it's a unified regulatory management system that balances national consistency with local customization, protecting consumers while enabling operational excellence across all markets."
    },
    {
      id: 'lodr',
      name: 'Listing Obligations and Disclosure Requirements (LODR)',
      tag: 'LODR',
      color: '#4FC3F7',
      icon: lodrIcon,
      intro: "With Vardaan's GRC platform, SEBI LODR compliance becomes an automated, real-time disclosure management system—ensuring listed companies maintain transparency and meet all corporate governance obligations effortlessly.",
      description: "Our AI-powered platform integrates with your ERP, board management systems, investor relations platforms, financial reporting tools, and corporate secretarial databases—automatically capturing LODR-relevant events such as material event disclosures (Regulation 30), quarterly/annual financial results, corporate governance reports, related party transactions, shareholding pattern changes, insider trading compliance, board composition updates, and disclosure submissions to stock exchanges. Each event is mapped to specific SEBI LODR regulations (across 12 chapters) and stored with timestamps for BSE/NSE compliance.",
      benefits: [
        "Automated disclosure tracking – Reduce disclosure preparation time by 60% with real-time event capture.",
        "Real-time regulatory compliance – AI flags disclosable events within 24-48 hour regulatory deadlines.",
        "Cross-exchange integration – Unified filing system supports both BSE and NSE compliance requirements.",
        "Board governance automation – Automated board composition and independent director tracking.",
        "Investor relations efficiency – Transparent, accessible disclosures improve analyst ratings and investor trust."
      ],
      roi: [
        "60% reduction in disclosure preparation time via automated event capture and filing generation",
        "40% fewer compliance violations through real-time regulatory deadline tracking",
        "30% improvement in investor relations efficiency with transparent, accessible disclosures",
        "50% reduction in penalty exposure via proactive compliance monitoring"
      ],
      summary: "With Vardaan's GRC, SEBI LODR compliance isn't a manual scramble—it's an intelligent disclosure management system that ensures transparency, strengthens investor trust, and positions listed companies as governance leaders in Indian capital markets."
    },
    {
      id: 'orsa',
      name: 'Own Risk and Solvency Assessment (ORSA)',
      tag: 'ORSA',
      color: '#4FC3F7',
      icon: orsaIcon,
      intro: "With Vardaan's GRC platform, ORSA becomes a dynamic, forward-looking risk and capital assessment system—empowering insurers to make strategic decisions while demonstrating regulatory compliance effortlessly.",
      description: "Our AI-powered platform integrates with your enterprise risk management (ERM) systems, actuarial modeling tools, capital management platforms, stress testing infrastructure, and business planning systems—automatically capturing ORSA-relevant data such as risk identification and assessment across all material risks (underwriting, market, credit, operational, liquidity, strategic), capital adequacy calculations under current and stressed scenarios, internal target setting, forward-looking solvency projections, stress and scenario testing results, and management action plans. Each assessment component is mapped to NAIC Model Act #505 or EU Solvency II requirements and documented for regulatory review.",
      benefits: [
        "Automated risk assessment – Continuous monitoring across all material risks with forward-looking projections.",
        "Real-time capital adequacy tracking – AI calculates current and stressed scenario capital requirements.",
        "Cross-framework compliance – Evidence supports both NAIC Model Act #505 and EU Solvency II requirements.",
        "Strategic planning integration – Risk assessment aligned with business strategy and growth plans.",
        "Board-level risk visibility – Comprehensive risk reports for governance and decision making."
      ],
      roi: [
        "50% reduction in ORSA preparation time through automated data aggregation and risk quantification",
        "30% improvement in capital efficiency via optimized internal target setting",
        "40% faster stress testing with integrated scenario modeling across all risk types",
        "25% reduction in actuarial consulting costs through continuous risk assessment vs. annual snapshots"
      ],
      summary: "With Vardaan's GRC, ORSA isn't a compliance burden—it's a strategic risk intelligence system that strengthens financial resilience, informs business decisions, and demonstrates to regulators that your risk management is world-class."
    },
    {
      id: 'ifrs',
      name: 'International Financial Reporting Standards (IFRS)',
      tag: 'IFRS',
      color: '#4FC3F7',
      icon: ifrsIcon,
      intro: "With Vardaan's GRC platform, IFRS compliance becomes an automated, globally consistent financial reporting system—ensuring transparency, accuracy, and comparability across international operations.",
      description: "Our AI-powered platform integrates with your ERP systems, accounting software, consolidation tools, asset management platforms, and financial reporting infrastructure—automatically capturing IFRS-relevant data such as fair value measurements, revenue recognition (IFRS 15), lease accounting (IFRS 16), financial instruments classifications (IFRS 9), impairment assessments, foreign currency translations, consolidation adjustments, and disclosure note generation. Each transaction is mapped to applicable IFRS standards (IFRS 1-18, IAS 1-41) and stored with audit trails for external auditor review.",
      benefits: [
        "Global compliance automation – Unified framework supports 140+ countries with IFRS requirements.",
        "Real-time financial reporting – Automated consolidation and reporting across international subsidiaries.",
        "Cross-border M&A efficiency – Unified accounting eliminates restatement costs and accelerates due diligence.",
        "Audit trail management – Complete transaction mapping to IFRS standards with timestamped evidence.",
        "Investor-ready statements – Globally recognized financial statements for capital market access."
      ],
      roi: [
        "50-60% reduction in financial consolidation time across multi-country operations",
        "40% improvement in financial statement accuracy through standardized recognition and measurement",
        "30% reduction in external audit fees via streamlined evidence and documentation",
        "25% faster IPO preparation with investor-ready, globally recognized financial statements"
      ],
      summary: "With Vardaan's GRC, IFRS compliance isn't just accounting—it's a strategic advantage that opens global capital markets, attracts international investors, and positions your organization as a transparent, financially sophisticated leader in the worldwide economy."
    },
    {
      id: 'cyberframeworks',
      name: 'Cybersecurity Frameworks',
      tag: 'CYBER-FRAMEWORKS',
      color: '#4FC3F7',
      icon: cyberFrameworksIcon,
      intro: "With Vardaan's GRC platform, cybersecurity framework compliance becomes a unified, automated security assurance program—integrating NIST CSF, ISO 27001, CIS Controls, and COBIT into a single, efficient system.",
      description: "Our AI-powered platform integrates with your entire cybersecurity ecosystem—SIEM, EDR, firewalls, vulnerability scanners, IAM systems, DLP tools, and security orchestration platforms—automatically capturing evidence across all major frameworks: NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover), ISO 27001 (114 controls across 14 domains), CIS Controls (18 safeguards), and COBIT 2019 (40 governance and management objectives). Each security event is mapped to relevant framework requirements and stored as verifiable evidence for audits and examinations.",
      benefits: [
        "Unified framework compliance – Reduce multi-framework burden by 60% with integrated evidence collection.",
        "Real-time security monitoring – Continuous monitoring across NIST CSF, ISO 27001, CIS Controls, and COBIT.",
        "Cross-regulatory alignment – Framework mapping satisfies GLBA, SOX, HIPAA, PCI DSS, GDPR requirements.",
        "Executive risk reporting – Plain-language risk reporting translates technical controls into business impact.",
        "Vendor security assessments – Streamlined third-party evaluations using common framework language."
      ],
      roi: [
        "60% reduction in multi-framework compliance costs through unified evidence management",
        "40% improvement in security control effectiveness via integrated monitoring and testing",
        "50% faster audit and examination cycles with pre-mapped framework evidence",
        "30% reduction in cybersecurity program costs by eliminating redundant tools and processes"
      ],
      summary: "With Vardaan's GRC, cybersecurity framework compliance isn't a maze of overlapping standards—it's an integrated security intelligence system that strengthens defenses, streamlines audits, and demonstrates world-class cyber risk management to regulators, customers, and partners."
    },
    {
      id: 'stateinsurance',
      name: 'State Insurance Regulations',
      tag: 'STATE-INS',
      color: '#4FC3F7',
      icon: stateInsuranceIcon,
      intro: "With Vardaan's GRC platform, state insurance regulatory compliance becomes a unified, automated oversight system—managing 50+ state variations while ensuring consumer protection and market conduct excellence.",
      description: "Our AI-powered platform integrates with your policy administration systems, claims platforms, producer licensing databases, financial reporting tools, market conduct systems, and consumer complaint management infrastructure—automatically capturing state-specific regulatory events such as rate and form filings, producer license verifications and renewals, market conduct examination findings, consumer complaint resolutions, financial solvency reports, data breach notifications, and state-specific disclosure requirements. Each event is mapped to applicable state insurance department regulations across all 50 states + DC and territories.",
      benefits: [
        "Multi-state compliance automation – Unified platform manages 50+ state variations with centralized tracking.",
        "Real-time regulatory updates – Platform adapts to state-specific requirements and regulatory changes automatically.",
        "Producer licensing management – Continuous verification prevents unlicensed agent activity across all states.",
        "Market conduct monitoring – Automated tracking identifies issues before triennial examinations.",
        "Consumer protection compliance – Streamlined complaint tracking and resolution management."
      ],
      roi: [
        "50% reduction in multi-state compliance administration through centralized evidence management",
        "40% faster state expansion with streamlined licensing and filing processes",
        "30% improvement in market conduct examination outcomes via proactive issue detection",
        "60% reduction in producer licensing violations through automated tracking and renewals"
      ],
      summary: "With Vardaan's GRC, state insurance regulation isn't a fragmented compliance nightmare—it's a unified regulatory intelligence system that balances state-specific requirements with operational efficiency, protecting consumers while enabling profitable growth across all markets."
    },
    {
      id: 'ccpacompliance',
      name: 'CCPA Compliance',
      tag: 'CCPA',
      color: '#4FC3F7',
      icon: ccpaIcon,
      intro: "With Vardaan's GRC platform, CCPA compliance becomes an automated, real-time privacy assurance system—transforming consumer data rights into competitive advantage for California organizations.",
      description: "Our AI engine integrates with your CRM, e-commerce, marketing automation, and IT systems to auto-capture compliance-relevant activities—DSARs, opt-out requests, consent changes, third-party data sharing, breach notifications, and regulatory filings—mapped to CCPA mandates and stored as audit-ready evidence for rapid response and reporting.",
      benefits: [
        "Automated privacy compliance – Real-time tracking of opt-out, deletion, and DSAR requests with 50% faster response times.",
        "Multi-state alignment – CCPA framework supports GDPR, CPRA, Virginia, Colorado, and Connecticut privacy laws.",
        "Consumer trust building – 79% of Californians prefer privacy-focused organizations, boosting brand loyalty.",
        "Penalty prevention – Avoid fines up to $7,500 per violation through automated compliance monitoring.",
        "Marketing optimization – Target engaged, opted-in audiences and eliminate risky data processing practices."
      ],
      roi: [
        "60% reduction in privacy administration costs through automation",
        "30% less penalty risk via real-time compliance monitoring",
        "40% improvement in consumer retention from transparent data practice"
      ],
      summary: "Vardaan's GRC turns CCPA compliance into a privacy-driven customer trust and brand loyalty engine—protecting firms from regulatory risk and enabling responsible innovation in California's marketplace."
    },
    {
      id: 'reach',
      name: 'REACH',
      tag: 'REACH',
      color: '#4FC3F7',
      icon: reachIcon,
      intro: "Vardaan's GRC makes EU REACH compliance automated and proactive—eliminating supply chain disruptions and enabling market expansion for manufacturers and importers.",
      description: "Our system connects to ERP, PLM, chemical databases, supplier portals, and quality management systems—capturing compliance evidence on substance registration, risk assessment, communication with suppliers/customers, compliance documentation, and SVHC (Substances of Very High Concern) tracking.",
      benefits: [
        "EU market access automation – Pre-verified chemical documentation accelerates customs clearance and market entry.",
        "Supply chain resilience – Automated supplier monitoring ensures compliance documentation across the entire chain.",
        "Risk mitigation – Prevents costly recalls, market bans, and fines up to €50,000 through proactive compliance.",
        "ESG compliance – Supports sustainability goals by tracking hazardous and recyclability data for products.",
        "Brand protection – Verified safety and sustainability commitments enhance reputation and consumer trust."
      ],
      roi: [
        "50-60% reduction in compliance documentation costs",
        "30-40% faster supply chain verification for EU shipments",
        "Reduced risk of recalls and lost revenue due to early detection"
      ],
      summary: "Vardaan's GRC transforms REACH into a smart compliance and sustainability dashboard—securing market access and brand trust across the EU."
    },
    {
      id: 'hitech',
      name: 'HITECH Act',
      tag: 'HITECH',
      color: '#4FC3F7',
      icon: hitechIcon,
      intro: "With Vardaan's GRC platform, HITECH compliance is a continuous, automated patient privacy and data breach response system—supporting secure health IT transformation.",
      description: "The platform connects to EHR/EMR, billing, health IT, and security tools—auto-tracking breach notifications, risk assessments, patient data access logs, encryption status, and workforce training mapped to HITECH and HIPAA requirements.",
      benefits: [
        "Automated breach management – Speeds notification with automated event detection and response workflows.",
        "Business associate oversight – Strengthens vendor management with contract and compliance mapping.",
        "Regulatory compliance – Required for entities managing ePHI; protects against $1.5M annual penalties.",
        "EHR adoption acceleration – Supports financial incentives and secure health IT transformation.",
        "Risk reduction – Proactive risk management reduces breach scope and associated costs significantly."
      ],
      roi: [
        "50-65% cut in breach management admin time",
        "30% improved audit readiness with digital evidence",
        "40% reduction in business associate risk exposure"
      ],
      summary: "Vardaan's GRC turns HITECH compliance into a secure health data stewardship program—empowering providers and vendors to protect patients and meet regulatory milestones."
    },
    {
      id: 'hitrust',
      name: 'HITRUST CSF',
      tag: 'HITRUST',
      color: '#4FC3F7',
      icon: hitrustIcon,
      intro: "With Vardaan's GRC platform, HITRUST CSF compliance becomes a unified, scalable security and privacy assurance solution—ready for healthcare, financial services, and cloud vendors.",
      description: "The system syncs with security controls, policy management, risk systems, and audit infrastructure, auto-mapping evidence for 19+ regulatory frameworks including HIPAA, HITECH, GDPR, PCI DSS, SOC 2, and NIST in one place.",
      benefits: [
        "Multi-framework automation – Single certification covers 19+ regulatory frameworks with unified evidence collection.",
        "Client approval acceleration – Reduces repetitive audits and speeds third-party risk reviews in healthcare/finance.",
        "Comprehensive control testing – Automates testing for >2,000 requirements across diverse industry standards.",
        "Industry recognition – Required for healthcare vendors; increasingly adopted by cloud and fintech firms.",
        "Breach defense strengthening – Proactive risk monitoring with instant response playbooks for incident management."
      ],
      roi: [
        "50-60% audit effort reduction per client",
        "30% improvement in cross-framework evidence reuse",
        "100% certification traceability for regulators and partners"
      ],
      summary: "Vardaan's GRC positions HITRUST CSF as the gold standard for multi-framework compliance and risk management—simplifying security for critical industries."
    },
    {
      id: 'fda820',
      name: 'FDA 21 CFR Part 820',
      tag: 'FDA-QSR',
      color: '#4FC3F7',
      icon: fda820Icon,
      intro: "Vardaan's GRC automates FDA QSR compliance for medical device manufacturers—eliminating manual audits and ensuring product safety from design through distribution.",
      description: "Integrates with PLM, ERP, complaint handling, CAPA, and document management—tracking design controls, manufacturing records, device history files, post-market surveillance, supplier quality, and non-conformance reports mapped to FDA QSR sections.",
      benefits: [
        "FDA inspection readiness – Prevents Form 483 observations and warning letters that can halt sales or trigger recalls.",
        "Device approval acceleration – Complete design history and traceability streamline regulatory submission process.",
        "Quality system automation – Tracks design controls, manufacturing records, and device history files automatically.",
        "Post-market surveillance – Continuous monitoring improves defect and complaint resolution for patient safety.",
        "Global compliance support – Readiness for ISO 13485 and EU MDR certification through integrated quality management."
      ],
      roi: [
        "50% reduction in audit prep and CAPA workflow",
        "40% faster FDA inspection response",
        "Lower recall risk and quicker issue closure"
      ],
      summary: "Vardaan GRC turns FDA QSR compliance into a smart, visible control system—protecting patients and accelerating innovation in medtech."
    },
    {
      id: 'stateprivacy',
      name: 'State Privacy Laws',
      tag: 'STATE-PRIVACY',
      color: '#4FC3F7',
      icon: statePrivacyIcon,
      intro: "Vardaan's GRC platform enables seamless compliance with U.S. state privacy laws—mapping consent, access, disclosure, and breach requirements across dozens of state statutes and regulations.",
      description: "Auto-captures opt-out, data deletion, correction, breach notification, and record-keeping events for CCPA, CPRA, VCDPA, CPA, CTDPA, UCPA, and other emerging state laws—tagged by requirement for exact regulatory coverage.",
      benefits: [
        "Multi-state automation – Adapts to new/amended laws in real-time, future-proofing privacy programs across all jurisdictions.",
        "Penalty protection – Shields against penalties from $7,500 per violation to class action claims through proactive compliance.",
        "National rollout support – Accelerates multi-state compliance for digital products and services.",
        "Consumer trust enhancement – High-visibility privacy controls improve market differentiation and customer confidence.",
        "Unified compliance management – Centralized tracking reduces complexity of state-specific requirements and reduces admin costs."
      ],
      roi: [
        "40% reduction in privacy admin cost through central evidence management",
        "60% faster compliance as new laws are passed",
        "Lower risk of multi-state enforcement and litigation"
      ],
      summary: "Vardaan's GRC simplifies the complexity of U.S. privacy law—making consumer data rights an operational advantage instead of a legal risk."
    },
    {
      id: 'jointcommission',
      name: 'Joint Commission Standards',
      tag: 'JOINTCOM',
      color: '#4FC3F7',
      icon: jointCommissionIcon,
      intro: "Vardaan's GRC platform automates continuous readiness for Joint Commission accreditation—improving patient safety, clinical quality, and regulatory standing for hospitals and providers.",
      description: "Automatically tracks compliance evidence for Environment of Care, Infection Prevention, Patient Rights, Medication Management, Emergency Management, and Human Resources—mapped to Joint Commission standards and survey methodologies.",
      benefits: [
        "Survey readiness automation – Accelerates preparation and avoids costly deficiencies or penalties through continuous monitoring.",
        "Patient safety improvement – Enhanced metrics and care outcomes through systematic quality management processes.",
        "Staff competency tracking – Automated training and certification management ensures workforce readiness.",
        "Operational excellence – Systematic quality improvement processes enhance efficiency and patient satisfaction.",
        "Regulatory alignment – Benchmarking and reporting aligned with CMS, state, and specialty accreditation requirements."
      ],
      roi: [
        "50% reduction in survey prep/reporting time",
        "20% improvement in staff compliance training completion",
        "30% drop in citations for ongoing readiness gaps"
      ],
      summary: "Vardaan's GRC makes Joint Commission compliance a living healthcare culture—promoting better patient outcomes and continuous operational excellence."
    },
    {
      id: 'iso9001',
      name: 'ISO 9001',
      tag: 'ISO-QMS',
      color: '#4FC3F7',
      icon: iso9001Icon,
      intro: "Vardaan's GRC makes ISO 9001 quality management work in real-time—driving customer satisfaction and continuous process improvement across any industry.",
      description: "Connects with production, service management, documentation, supplier systems, corrective action tracking, and training records to auto-capture compliance-relevant evidence for ISO 9001 clauses—mapping quality objectives, audits, nonconformities, and improvement cycles.",
      benefits: [
        "Global market access – Required for aerospace, automotive, pharmaceuticals, and other sectors worldwide.",
        "Process efficiency boost – Measurable cost savings through defect reduction and optimized operations.",
        "Customer trust building – Enhanced supplier, partner, and customer confidence in product/service delivery.",
        "Certification acceleration – Faster cycles and record retention for seamless re-audit processes.",
        "Continuous improvement culture – Data-driven decision making and systematic quality enhancement."
      ],
      roi: [
        "40-60% drop in manual QMS admin time",
        "30% faster corrective action closure",
        "20% more efficient supplier management"
      ],
      summary: "Vardaan's GRC turns ISO 9001 compliance into daily business value—supporting organizational excellence and trusted brand reputation."
    },
    {
      id: 'osha',
      name: 'OSHA (Occupational Safety and Health)',
      tag: 'OSHA',
      color: '#4FC3F7',
      icon: oshaIcon,
      intro: "With Vardaan's GRC platform, OSHA compliance is a continuous safety and health management system—protecting employees and reducing regulatory risk for U.S. employers.",
      description: "Integrates with incident tracking, safety training, equipment maintenance, hazard communication (HazCom), PPE, and emergency response systems—auto-documenting compliance with OSHA standards and submitting reporting (Form 300, 301, 300A).",
      benefits: [
        "Penalty prevention – Avoids OSHA fines ($13,653+ per violation) and workplace injuries through automated compliance.",
        "Real-time safety monitoring – Improves injury prevention and hazard mitigation with continuous tracking.",
        "Workforce confidence boost – Enhanced productivity through demonstrated safety commitment and training.",
        "Insurance optimization – Accelerates claim/insurance documentation and regulatory reporting processes.",
        "Safety culture enhancement – Systematic risk management improves employee morale and retention."
      ],
      roi: [
        "40-50% faster safety incident closure",
        "30% lower injury and lost workday rates",
        "Reduced insurance premiums via compliance records"
      ],
      summary: "Vardaan's GRC makes OSHA safety a pro-active advantage—protecting lives, lowering costs, and ensuring regulatory peace-of-mind for every employer."
    },
    {
      id: 'fdagmp',
      name: 'FDA GMP',
      tag: 'GMP',
      color: '#4FC3F7',
      icon: fdagmpIcon,
      intro: "Vardaan's GRC platform automates FDA GMP compliance—ensuring pharmaceuticals, food, and medical devices meet or exceed quality and safety standards, protecting consumer health.",
      description: "Syncs with manufacturing, lab, QA, and batch record systems—tracking documentation, change control, equipment qualification, supplier audits, and deviation/CAPA events mapped to FDA/21 CFR GMP/GLP requirements.",
      benefits: [
        "Global market requirement – Essential for all U.S. manufacturers and crucial for export/sales worldwide.",
        "Inspection readiness – Accelerates FDA pre-approval, routine, or surprise inspections with automated evidence.",
        "Risk reduction – Prevents costly recalls and regulatory enforcement through proactive quality control.",
        "Product quality enhancement – Improves market trust and reliability through systematic quality assurance.",
        "Process optimization – Streamlines quality assurance and reduces manufacturing risks through automation."
      ],
      roi: [
        "50% less audit prep and documentation time",
        "40% faster nonconformance and CAPA resolution",
        "30% drop in recall risks"
      ],
      summary: "Vardaan's GRC turns FDA GMP into a live, traceable quality assurance system—fueling safe products and business growth."
    },
    {
      id: 'epa',
      name: 'EPA Environmental Regulations',
      tag: 'EPA',
      color: '#4FC3F7',
      icon: epaIcon,
      intro: "Vardaan's GRC makes EPA compliance an automated environmental stewardship system—enabling businesses to meet federal and state rules while advancing sustainability goals.",
      description: "Connects with facilities, waste, emissions monitoring, hazardous materials, incident reporting, and supply chain systems—tracking and mapping evidence for Clean Air Act, Clean Water Act, RCRA, TSCA, and state equivalents.",
      benefits: [
        "Penalty protection – Prevents fines ($10,000 to $10M+ per violation) and criminal liability through automated compliance.",
        "ESG integration – Supports sustainability, ESG, and climate risk reporting via integrated environmental data.",
        "Permit acceleration – Faster acquisition and renewal with pre-documented compliance evidence.",
        "Stakeholder trust – Improves community and investor confidence through transparent environmental reporting.",
        "Risk management – Enhanced environmental oversight and proactive issue detection reduce operational costs."
      ],
      roi: [
        "50% less regulatory reporting overhead",
        "30% better early detection of environmental issues",
        "Reduced insurance and operational risk costs"
      ],
      summary: "Vardaan's GRC enables EPA compliance as a strategic management system—securing permits and future-proofing businesses against enforcement and public scrutiny."
    },
    {
      id: 'itar',
      name: 'ITAR',
      tag: 'ITAR',
      color: '#4FC3F7',
      icon: itarIcon,
      intro: "Vardaan's GRC automates ITAR compliance—protecting sensitive U.S. defense, aerospace, and technology exports from unauthorized access and sanctions.",
      description: "Tracks license management, export authorization, restricted-party screening, technical data handling, and compliance evidence for all ITAR-controlled items and activities.",
      benefits: [
        "Regulatory requirement – Mandatory for U.S. manufacturers, exporters, and service providers handling defense articles and technical data.",
        "Penalty prevention – Avoids ITAR fines and debarment (up to $1M+, criminal penalties possible) through automated compliance.",
        "International business enablement – Facilitates global supply chain and defense contracts with verified compliance.",
        "Data security enhancement – Improves control of technical data and cybersecurity for remote and cloud environments.",
        "Supply chain security – Comprehensive vendor management and export authorization acceleration."
      ],
      roi: [
        "50% fewer manual screenings and export licensing errors",
        "100% audit-ready export controls and evidence",
        "Reduced risk of fines, lost contracts, and business interruption"
      ],
      summary: "Vardaan GRC secures ITAR compliance as a business enabler—supporting global defense collaborations and U.S. regulatory trust."
    },
    {
      id: 'industrystandards',
      name: 'Industry-Specific Standards',
      tag: 'IND-STANDARD',
      color: '#4FC3F7',
      icon: industryStandardIcon,
      intro: "Vardaan's GRC supports rapid deployment and management of industry-specific regulatory and quality frameworks—from automotive to food and construction.",
      description: "Configurable modules for standards such as IATF 16949 (automotive), ISO 22000 (food safety), ISO 45001 (occupational health/safety), and more—auto-tracking documentation, audits, supplier controls, risk assessments, and improvement actions.",
      benefits: [
        "Contract acceleration – Faster client contract wins and supply chain qualification through standardized processes.",
        "Operational continuity – Breaks compliance silos for uninterrupted business operations across industries.",
        "Global expansion support – Harmonized standards adoption enables international market entry.",
        "Quality enhancement – Reduced incidents and defects through systematic controls and standardized processes.",
        "Efficiency improvement – Automated vendor management and faster certification processes reduce costs."
      ],
      roi: [
        "40% less certification and record-keeping effort",
        "30% faster supplier onboarding",
        "20-60% lower incident and defect rates"
      ],
      summary: "Vardaan's GRC turns industry standards compliance into operational excellence and global growth drivers."
    },
    {
      id: 'soc2',
      name: 'SOC 2',
      tag: 'SOC2',
      color: '#4FC3F7',
      icon: soc2Icon,
      intro: "Vardaan's GRC enables automated, continuous SOC 2 Type 2 compliance—building trust and winning B2B clients with cloud security maturity.",
      description: "Connects with IT, security, HR, incident, and vendor systems—capturing evidence mapped to the five Trust Service Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy). Automates monitoring, reporting, and auditor liaison.",
      benefits: [
        "B2B market access – Essential for SaaS, cloud, and service providers to win enterprise contracts.",
        "Audit readiness – Demonstrates year-round control effectiveness with ready-for-audit evidence.",
        "Client acceleration – Faster new client onboarding and vendor due diligence processes.",
        "Multi-regulation support – Maps to NIST, ISO, GDPR, PCI DSS, HIPAA for comprehensive compliance.",
        "Competitive advantage – Enhanced security posture and faster sales cycles with pre-validated controls."
      ],
      roi: [
        "60-70% less audit prep work",
        "40% faster third-party client acceptance",
        "Enhances security posture and competitive advantage"
      ],
      summary: "Vardaan's GRC turns SOC 2 compliance into a driver of trusted business relationships in the digital economy."
    },
    {
      id: 'fedramp',
      name: 'FedRAMP',
      tag: 'FEDRAMP',
      color: '#4FC3F7',
      icon: fedrampIcon,
      intro: "Vardaan's GRC automates FedRAMP compliance for cloud vendors—enabling secure federal contracts and public sector innovation.",
      description: "Tracks evidence for NIST SP 800-53 controls, continuous monitoring, assessment, and Authority to Operate (ATO) workflow—mapped to FedRAMP Moderate, High, and LI-SaaS baselines.",
      benefits: [
        "Federal market requirement – Mandatory for cloud vendors serving U.S. federal agencies.",
        "ATO acceleration – Faster approval and re-use across multiple agencies with automated evidence.",
        "Cost reduction – Lower documentation, assessment, and ongoing compliance costs through automation.",
        "Revenue opportunity – Unlocks billions in federal contract opportunities with verified compliance.",
        "Security enhancement – Comprehensive control implementation supports government and critical infrastructure best practices."
      ],
      roi: [
        "50% less recurring assessment effort",
        "100% centralized continuous monitoring and dashboards",
        "Unlocks billions in federal contract opportunities"
      ],
      summary: "Vardaan's GRC turns FedRAMP into a scalable, revenue-generating advantage—securing federal business with confidence."
    },
    {
      id: 'indcerts',
      name: 'Industry-Specific Certifications',
      tag: 'IND-CERT',
      color: '#4FC3F7',
      icon: industryCertIcon,
      intro: "With Vardaan's GRC, industry-specific credentials (PCI DSS, ISO 13485, ISO 17025, etc.) are achieved and maintained with automated evidence, fast reporting, and audit-ready dashboards.",
      description: "Empowers organizations to meet client demands, regulatory mandates, and market opportunities through tailored compliance evidence and ongoing monitoring.",
      benefits: [
        "Contract acceleration – Faster certification and contract approvals across healthcare, finance, retail, logistics, manufacturing.",
        "Cost reduction – Lower audit costs through digitized, mapped evidence and automated processes.",
        "Market access enhancement – Improved competitive positioning and client trust through demonstrated expertise.",
        "Process efficiency – Streamlined certification maintenance and renewal with automated monitoring.",
        "Business growth enablement – Scalable certification management supports market expansion and client acquisition."
      ],
      roi: [
        "40-60% faster certification cycles",
        "30% lower audit costs",
        "20% higher win rate for compliance-sensitive contracts"
      ],
      summary: "Vardaan's GRC transforms certifications from annual stress into a tool for growth and trust."
    },
    {
      id: 'ear',
      name: 'Export Administration Regulations',
      tag: 'EAR',
      color: '#4FC3F7',
      icon: earIcon,
      intro: "Vardaan's GRC automates EAR compliance—enabling global trade while safeguarding against U.S. regulatory violations for dual-use exports.",
      description: "Automates screening, licensing, classification, export documentation, and restricted-party monitoring for covered technology and products.",
      benefits: [
        "Regulatory compliance – Required for U.S. exporters handling sensitive or dual-use technology and products.",
        "Penalty prevention – Avoids penalties ($50,000+ per civil violation, criminal liability) and export bans.",
        "Global trade acceleration – Faster international sales with verified compliance procedures and automated processes.",
        "Business continuity – Minimizes supply chain interruptions through comprehensive export control management.",
        "Risk reduction – Enhanced supply chain security and regulatory standing through automated documentation and screening."
      ],
      roi: [
        "50% reduction in export license approval time",
        "60% less false party screening workload",
        "100% audit traceability for all export events"
      ],
      summary: "Vardaan's GRC makes EAR compliance a seamless part of global business—protecting companies while enabling safe, lawful expansion."
    }
  ];

  const handleFrameworkClick = (frameworkId) => {
    console.log('Navigating to framework:', frameworkId); // Debug log
    // Navigate to the Framework page with framework name in URL
    navigate(`/framework/${frameworkId}`);
  };

  const industryData = [
    {
      id: 'financial',
      name: 'Financial Services',
      icon: '💰',
      color: '#4FC3F7'
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: '🛡️',
      color: '#4FC3F7'
    },
    {
      id: 'retail',
      name: 'Retail',
      icon: '🛒',
      color: '#4FC3F7'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: '🏥',
      color: '#4FC3F7'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: '⚙️',
      color: '#4FC3F7'
    },
    {
      id: 'software',
      name: 'Software & Technology',
      icon: '💻',
      color: '#4FC3F7'
    }
  ];

  return (
    <div className="solutions-container">
      <div className="solutions-main-content">
        <div className="solutions-grid">
          {/* Left Side - Industry */}
          <div className="solutions-left-section">
            <div className="solutions-section-header">
              <h2 className="solutions-section-title">INDUSTRY</h2>
              <p className="solutions-section-subtitle">Tailored solutions for your industry</p>
            </div>
            
            <div className="solutions-industry-list">
              {industryData.map((industry) => (
                <div 
                  key={industry.id} 
                  className="solutions-industry-item"
                  onClick={() => {
                    const routes = {
                      'financial': '/industry/financial',
                      'insurance': '/industry/insurance',
                      'retail': '/industry/retail',
                      'healthcare': '/industry/healthcare',
                      'manufacturing': '/industry/manufacturing',
                      'software': '/industry/software'
                    };
                    
                    navigate(routes[industry.id]);
                  }}
                >
                  <div className="solutions-industry-icon" style={{ color: industry.color }}>
                    {industry.icon}
                  </div>
                  <span className="solutions-industry-name">{industry.name}</span>
                  <div className="industry-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Section - View All Frameworks */}
          <div className="solutions-center-section">
            <div className="solutions-view-all-container">
              <div 
                className="solutions-view-all-card"
                onClick={() => navigate('/framework')}
              >
                <div className="view-all-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="view-all-title">View All Frameworks</h3>
                <p className="view-all-subtitle">Explore our complete framework library</p>
              </div>
            </div>
          </div>

          {/* Right Side - Frameworks */}
          <div className="solutions-right-section">
            <div className="solutions-section-header">
              <h2 className="solutions-section-title">FRAMEWORKS</h2>
              <p className="solutions-section-subtitle">Choose from our comprehensive library of compliance frameworks</p>
            </div>
            
            <div className="solutions-frameworks-container">
              <div className="solutions-frameworks-grid">
                {frameworksData.map((framework) => (
                  <div 
                    key={framework.id} 
                    className="solutions-framework-card"
                    onClick={() => handleFrameworkClick(framework.id)}
                  >
                    <div className="framework-icon">
                      <img 
                        src={framework.icon} 
                        alt={framework.name}
                        className="framework-icon-image"
                      />
                    </div>
                    <h3 className="framework-card-name">{framework.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
