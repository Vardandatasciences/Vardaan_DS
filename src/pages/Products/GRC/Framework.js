import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Framework.css";

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
import reachComplianceIcon from "../../../assets/Images/Products/GRC/REACH logo.png";
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
import earIcon from "../../../assets/Images/Products/GRC/SOC_2 icon.png"; // Using SOC2 icon as placeholder for EAR

const Framework = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { frameworkId } = useParams();
  const [selectedFramework, setSelectedFramework] = useState('iso27001');
  const contentAreaRef = useRef(null);
  const sidebarRef = useRef(null);
  const isHashNavigating = useRef(false);

  const frameworksData = [
    {
      id: 'iso27001',
      name: 'ISO 27001',
      tag: 'ISO',
      icon: iso27001Icon,
      intro: "With Vardaan's GRC platform, ISO 27001 compliance becomes an always-on, automated process—not a yearly firefight.",
      description: "Our AI engine integrates with your IT, security, and business systems, capturing compliance-relevant events as they happen—new access grants, firewall changes, vulnerability patches, incident logs—automatically mapping them to the right ISO 27001 control and storing them as evidence.",
      benefits: [
        "Win enterprise contracts – Many Fortune 500 companies and government agencies require ISO 27001 certification as a mandatory prerequisite for vendor partnerships",
        "Accelerate sales cycles by 40-60% – Pre-certified security posture removes months-long security reviews and questionnaires",
        "Reduce data breach costs by 45% – IBM research shows certified organizations experience significantly lower breach frequency and impact",
        "Unlock international markets – ISO 27001 is globally recognized across 170+ countries, enabling seamless expansion into EU, APAC, and MENA regions",
        "Lower insurance premiums by 15-25% – Cyber insurance providers offer substantial discounts for certified organizations",
        "Streamline multi-framework compliance – ISO 27001 creates a foundation that accelerates SOC 2, NIST, GDPR, and HIPAA compliance by 30-50%",
        "Improve operational efficiency – Structured processes eliminate redundant security tools and conflicting policies, saving costs",
        "Strengthen board and investor confidence – Third-party certification provides objective assurance for governance, M&A due diligence, and funding rounds",
        "Reduce human error by 35% – Mandatory security awareness training and documented procedures minimize costly mistakes",
        "Future-proof against evolving threats – The 2022 revision addresses cloud security, remote work, and threat intelligence"
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
      icon: nistIcon,
      intro: "With Vardaan's GRC platform, NIST 800-series compliance shifts from static documents to a living, automated ecosystem.",
      description: "Our AI-driven engine continuously connects to your cyber, IT, and operational systems—capturing compliance-relevant events like configuration changes, vulnerability scans, incident reports, and user access updates in real time. Each event is instantly mapped to the right NIST control family (Access Control, Incident Response, Configuration Management, etc.) and logged as verifiable evidence.",
      benefits: [
        "Mandatory for federal contracts – Required under FISMA and FedRAMP for agencies and contractors handling government data",
        "Bridge technical and executive communication – Risk-based language enables CISOs to justify security budgets to CEOs and boards effectively",
        "Cross-framework synergy – NIST evidence supports ISO 27001, CMMC, HIPAA, PCI-DSS, and state privacy laws simultaneously",
        "Adaptive to any organization size – Flexible control baselines (Low, Moderate, High) scale from startups to critical infrastructure",
        "Reduce audit cycles by 70% – Continuous monitoring and control automation replace annual compliance scrambles",
        "Unbiased, crowd-sourced security – Developed by thousands of security professionals, covering blind spots proprietary frameworks miss",
        "Enable long-term risk management – Shifts from one-time audits to adaptive, responsive cybersecurity posture",
        "Accelerate incident response – Structured incident management controls reduce mean time to detect (MTTD) and respond (MTTR) by 40%",
        "Support zero trust architecture – NIST SP 800-207 provides roadmap for implementing modern zero trust security models",
        "Alignment with critical infrastructure standards – Proven across energy, transportation, finance, and defense sectors"
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
      icon: sasbIcon,
      intro: "With Vardaan's GRC platform, SASB compliance becomes a real-time, data-driven process—no more year-end ESG fire drills.",
      description: "Our AI-powered engine connects directly to your operational, financial, HR, and sustainability data sources—automatically capturing metrics like greenhouse gas emissions, energy use, safety incidents, supply chain disruptions, and workforce diversity statistics. Each event or metric is automatically mapped to the relevant SASB disclosure requirement for your industry and stored as verifiable evidence.",
      benefits: [
        "Attract ESG-focused investors – Over 2,800 institutional investors with $120 trillion AUM prioritize SASB disclosures",
        "Improve credit ratings and cost of capital – Transparent ESG performance reduces perceived risk, lowering borrowing costs by 10-20 basis points",
        "Enable peer benchmarking – Industry-specific metrics allow apples-to-apples comparison across competitors",
        "Accelerate ESG reporting by 50% – Standardized metrics eliminate custom frameworks and reduce reporting burden",
        "Meet investor expectations proactively – 75% of institutional investors now request SASB-aligned disclosures during due diligence",
        "Link sustainability to financial performance – SASB focuses on financially material ESG issues that directly impact enterprise value",
        "Simplify multi-framework reporting – SASB integrates seamlessly with GRI (stakeholder impact) and TCFD (climate) for comprehensive ESG strategy",
        "Reduce ESG rating volatility – Consistent, standardized reporting improves scores from MSCI, Sustainalytics, and CDP",
        "Future-proof against SEC climate rules – SASB forms the foundation for anticipated U.S. mandatory ESG disclosure requirements",
        "Strengthen stakeholder dialogue – Clear, sector-specific language facilitates conversations with investors, customers, and regulators"
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
      icon: griIcon,
      intro: "With Vardaan's GRC platform, GRI reporting becomes a living, automated process—built on real-time data, not year-end scramble.",
      description: "Our AI engine connects directly to your operational, HR, environmental, supply chain, and financial systems—automatically capturing metrics like carbon emissions, water consumption, waste generation, labor practices, diversity, human rights compliance, and community impact. Each data point is instantly tagged to the correct GRI Standard and disclosure requirement, stored as verifiable evidence, and ready for auditor or stakeholder review.",
      benefits: [
        "Most widely adopted framework globally – Used by 10,000+ organizations across 100+ countries, ensuring universal stakeholder recognition",
        "Enhance stakeholder engagement – Multi-stakeholder approach builds trust with employees, communities, NGOs, and customers",
        "Identify cost-saving opportunities – Comprehensive impact assessment reveals waste reduction and resource efficiency gains",
        "Improve employee engagement and retention – Transparent sustainability reporting increases staff pride and reduces turnover by 15-20%",
        "Strengthen supply chain relationships – Suppliers value transparent partners; GRI helps demonstrate responsible procurement",
        "Support sustainable business model innovation – Impact analysis surfaces new revenue opportunities in circular economy and green products",
        "Enable continuous improvement culture – Structured reporting cycle drives year-over-year ESG performance gains",
        "Reduce reputational risk – Proactive disclosure of negative impacts prevents NGO campaigns and consumer boycotts",
        "Facilitate access to sustainable finance – Green bonds and sustainability-linked loans increasingly require GRI-level disclosure",
        "Meet evolving regulatory demands – GRI aligns with EU CSRD, providing readiness for mandatory sustainability reporting",
        "Build competitive differentiation – Transparent sustainability leadership attracts eco-conscious customers willing to pay premium prices"
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
      icon: tcfdIcon,
      intro: "With Vardaan's GRC platform, TCFD compliance moves from static annual reports to a dynamic, always-on climate risk intelligence system.",
      description: "Our AI-powered engine integrates with your environmental, operational, supply chain, and financial data sources—automatically capturing climate-related metrics and events like emissions data, energy use, extreme weather disruptions, supply chain vulnerabilities, and investment exposure to climate risks. Each data point is mapped to the correct TCFD pillar (Governance, Strategy, Risk Management, Metrics & Targets) and stored as audit-ready evidence.",
      benefits: [
        "Access climate-focused capital – Institutional investors managing $194 trillion+ support TCFD and prioritize compliant investments",
        "Reduce climate-related financial losses – Early identification of physical and transition risks prevents portfolio devaluation",
        "Meet mandatory disclosure requirements – TCFD is now required in UK, EU, Switzerland, Japan, Hong Kong, New Zealand, and soon in California",
        "Improve credit ratings – Credit agencies like Moody's and S&P incorporate climate risk; TCFD disclosure strengthens scores",
        "Unlock green financing opportunities – TCFD-aligned companies access lower-cost green bonds and sustainability-linked loans",
        "Identify new business opportunities – Scenario analysis reveals emerging markets in renewable energy, carbon capture, and adaptation services",
        "Strengthen board climate literacy – TCFD governance requirements elevate climate expertise at board level",
        "Enhance resilience planning – Stress-testing against 2°C and 4°C scenarios strengthens business continuity strategies",
        "Differentiate from competitors – Transparent climate reporting builds trust with employees, customers, and communities",
        "Prepare for carbon pricing – Early disclosure positions organizations to adapt to emerging carbon taxes and cap-and-trade systems",
        "Reduce scope 3 emissions – Supply chain climate analysis drives collaborative emissions reduction across value chain"
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
      icon: samaIcon,
      intro: "With Vardaan's GRC platform, SAMA Cybersecurity compliance becomes a continuous, automated assurance process—not a last-minute documentation rush.",
      description: "Our AI engine integrates with your IT, security, risk, and governance systems—automatically capturing SAMA-relevant events such as access control changes, vulnerability scans, incident response logs, configuration updates, and third-party risk data. Each event is mapped to the correct SAMA domain and sub-control (e.g., Cybersecurity Governance, Risk Management, Asset Management, Access Control, Business Continuity) and stored as audit-ready evidence.",
      benefits: [
        "Mandatory for Saudi financial sector – Required for all SAMA-regulated banks, insurers, and fintech companies",
        "Avoid severe regulatory penalties – Non-compliance triggers fines, mandatory remediation, and potential license revocation",
        "Align with global standards simultaneously – SAMA incorporates ISO 27001, NIST, PCI-DSS, and Basel Committee frameworks",
        "Strengthen customer trust in digital banking – Robust cybersecurity builds confidence in mobile and online financial services",
        "Accelerate digital transformation safely – Framework supports secure adoption of cloud, AI, and open banking APIs",
        "Reduce cyber insurance costs – Demonstrated compliance lowers premiums for Saudi financial institutions",
        "Improve incident response maturity – Structured IR requirements reduce breach containment time by 50%",
        "Enable fintech licensing – SAMA requires cybersecurity maturity for regulatory approval of new fintech services",
        "Protect against regional threats – Framework addresses Middle East-specific cyber threat landscape",
        "Enhance third-party risk management – Stringent vendor assessment requirements prevent supply chain compromises",
        "Support Vision 2030 objectives – Aligns with Saudi Arabia's national digital economy and cybersecurity strategy"
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
      icon: mastrmIcon,
      intro: "With Vardaan's GRC platform, MAS TRM compliance becomes a real-time, automated assurance process—keeping your financial operations resilient and regulator-ready every day.",
      description: "Our AI-powered platform integrates with your IT, cybersecurity, operations, and risk systems—automatically capturing MAS TRM–relevant events such as system availability metrics, incident response logs, cybersecurity alerts, access control changes, penetration test results, and vendor risk assessments. Every data point is mapped to the correct MAS TRM domain (e.g., IT Governance, Cybersecurity, Incident Management, System Availability, Outsourcing) and stored as verifiable evidence.",
      benefits: [
        "Mandatory for Singapore financial institutions – Required for all MAS-regulated banks, insurers, payment services, and capital markets",
        "Avoid regulatory enforcement actions – MAS issued $11.56M in penalties in 2023-2024 for technology risk failures",
        "Maintain operational license – Severe non-compliance can result in license suspension or revocation",
        "Strengthen regional competitiveness – Singapore's reputation as Asia's financial hub depends on strong technology risk management",
        "Accelerate digital banking innovation – Framework provides guardrails for safely deploying AI, open banking, and cloud services",
        "Reduce system downtime costs – Resilience requirements minimize business disruption from technology failures",
        "Improve board and senior management accountability – Clear governance structure prevents technology decisions from being made in isolation",
        "Enhance third-party vendor security – Stringent assessments prevent breaches through supply chain partners",
        "Enable cross-border operations – MAS TRM recognition facilitates expansion across ASEAN markets",
        "Reduce cyber insurance premiums – Demonstrated compliance lowers costs for Singaporean financial institutions",
        "Support AI and automation adoption – Framework provides risk management structure for emerging technologies"
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
      icon: reachIcon,
      intro: "With Vardaan's GRC platform, product compliance for REACH, RoHS, and WEEE becomes an automated, always-on process—ensuring market access, brand trust, and zero regulatory surprises.",
      description: "Our AI-powered platform integrates with your ERP, PLM, supply chain, and quality systems—automatically capturing compliance-relevant events such as material composition data, supplier declarations, hazardous substance testing results, recycling/disposal tracking, and product change notices.",
      benefits: [
        "Mandatory for EU market access – Non-compliant products face customs seizure, fines up to €50,000, and market bans",
        "Avoid costly product recalls – Proactive compliance prevents multi-million dollar recall campaigns and disposal costs",
        "Accelerate customs clearance – Compliant products experience 40% faster EU border processing",
        "Reduce supply chain disruption – Early supplier compliance verification prevents shipment delays and contract penalties",
        "Protect brand reputation – Environmental violations trigger NGO campaigns and consumer boycotts, devastating brand equity",
        "Lower disposal and recycling costs – WEEE compliance planning reduces end-of-life product liability by 30-50%",
        "Enable circular economy business models – Design-for-recycling requirements open opportunities in refurbishment and remanufacturing",
        "Meet global standards efficiently – EU REACH/RoHS/WEEE often more stringent than other markets; compliance simplifies global expansion",
        "Attract eco-conscious customers – 67% of EU consumers prefer products from environmentally responsible manufacturers",
        "Reduce hazardous waste liability – Proper substance tracking eliminates long-term environmental cleanup obligations",
        "Support ESG reporting – Product compliance data feeds into GRI, SASB, and CSRD sustainability disclosures"
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
      icon: iso14001Icon,
      intro: "With Vardaan's GRC platform, ISO 14001 environmental compliance becomes a live, automated management system—not a binder of outdated reports.",
      description: "Our AI-powered engine integrates with your operational, IoT, environmental monitoring, supply chain, and waste management systems—automatically capturing key ISO 14001 metrics such as energy consumption, water usage, emissions, waste generation, chemical storage, and incident reports. Every data point is automatically mapped to the relevant ISO 14001 clause (Environmental Policy, Planning, Implementation, Evaluation, and Improvement) and stored as verifiable evidence.",
      benefits: [
        "Reduce operational costs by 16-30% – Energy efficiency, waste reduction, and resource optimization generate average annual savings of $16,000-50,000",
        "Lower regulatory fine risk – Proactive compliance reduces non-compliance penalties that average $100,000-1M+ per incident",
        "Decrease environmental insurance premiums by 20% – Insurers offer substantial discounts for certified environmental management",
        "Accelerate permit approvals – Regulators fast-track permits for ISO 14001-certified facilities, reducing delays by months",
        "Win green procurement contracts – Government and corporate buyers increasingly require ISO 14001 for supplier qualification",
        "Reduce energy consumption by 15-25% – Systematic monitoring identifies high-consumption areas for optimization",
        "Generate recycling revenue – Zero-waste-to-landfill programs create income streams from recyclable materials like metals and plastics",
        "Improve environmental incident prevention – Structured risk management reduces spills, leaks, and releases by 45%",
        "Attract eco-conscious talent – Millennials and Gen Z prioritize employers with environmental commitments, reducing recruitment costs",
        "Enhance ESG ratings – ISO 14001 verification strengthens CDP, DJSI, and MSCI environmental scores",
        "Enable circular economy transition – Framework supports lifecycle thinking from design through recycling",
        "Future-proof against carbon pricing – Emissions tracking prepares organizations for carbon taxes and cap-and-trade systems"
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
      icon: soxIcon,
      intro: "With Vardaan's GRC platform, SOX compliance becomes an always-on, automated control assurance process—reducing audit risk and cutting manual work in half.",
      description: "Our AI-driven platform integrates with your ERP, financial systems, HR systems, and IT controls—automatically capturing SOX-relevant events such as user access changes, segregation of duties violations, journal entry approvals, system configuration changes, and exception reports. Each event is mapped to the correct SOX Section 302 or 404 control requirement, time-stamped, and stored as verifiable evidence.",
      benefits: [
        "Strengthen investor confidence by 35% – Transparent financial controls attract and retain institutional investors",
        "Reduce audit costs by 30-40% – Automated controls and continuous monitoring cut external audit hours significantly",
        "Lower cost of capital – Strong internal controls reduce perceived financial risk, decreasing borrowing rates",
        "Prevent fraud before it occurs – Segregation of duties and approval workflows detect anomalies in real-time, preventing losses",
        "Accelerate financial close by 50% – Automated reconciliation and reporting shorten monthly/quarterly close cycles",
        "Support M&A readiness – Clean SOX compliance accelerates due diligence and increases valuation multiples",
        "Enable data-driven decision making – Reliable financial data improves strategic planning and resource allocation",
        "Reduce restatement risk – Strong controls minimize costly financial restatements that damage credibility",
        "Improve operational efficiency – Process documentation reveals redundancies, reducing administrative costs",
        "Strengthen IT-Finance alignment – Shared control frameworks improve collaboration across departments",
        "Build audit committee confidence – Transparent control testing provides board-level assurance",
        "Protect executive reputation – Certification by CFO/CEO demonstrates personal commitment to financial integrity"
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
      icon: gdprIcon,
      intro: "With Vardaan's GRC platform, GDPR compliance becomes a proactive, automated data protection program—not a reactive, paper-heavy burden.",
      description: "Our AI-powered platform integrates with your HR, CRM, marketing, IT security, and cloud systems—automatically capturing GDPR-relevant events such as data subject requests, consent changes, data access logs, breach notifications, and retention/deletion actions. Each event is mapped to the relevant GDPR Article (e.g., Lawfulness of Processing, Data Subject Rights, Data Breach Notification, Data Minimization) and stored as verifiable, time-stamped evidence.",
      benefits: [
        "Avoid fines up to €20M or 4% global revenue – Highest-tier violations carry devastating financial penalties",
        "Build customer trust and loyalty – 81% of consumers won't engage with companies that mishandle data",
        "Reduce data breach costs by 40% – Proactive security measures minimize incident frequency and impact",
        "Enhance brand reputation – Privacy leadership differentiates organizations in competitive markets",
        "Improve data quality and accuracy – Regular audits and retention policies eliminate ROT (redundant, obsolete, trivial) data",
        "Reduce data storage costs by 25% – Minimization and deletion requirements cut cloud storage expenses",
        "Accelerate global expansion – GDPR compliance facilitates operations in 27 EU member states and EEA",
        "Simplify multi-regulation compliance – GDPR foundation supports CCPA, LGPD, PIPEDA, and other privacy laws",
        "Improve marketing ROI – Consent-based marketing targets engaged audiences, boosting conversion rates",
        "Enable international data transfers – Standard Contractual Clauses and Binding Corporate Rules unlock global operations",
        "Attract privacy-conscious customers – 73% of consumers prefer companies with strong data protection",
        "Reduce legal liability – GDPR lacks private right of action, limiting class-action lawsuit exposure"
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
      icon: ccpaIcon,
      intro: "With Vardaan's GRC platform, CCPA compliance becomes a real-time, automated privacy assurance program—eliminating manual data hunts and reducing regulatory risk.",
      description: "Our AI-powered platform integrates with your CRM, marketing automation tools, HR systems, e-commerce platforms, and IT security tools—automatically capturing CCPA-relevant events such as consumer data access/deletion requests, opt-outs of data sale, consent changes, third-party data sharing logs, and breach notifications. Each event is mapped to the correct CCPA requirement and stored as verifiable, time-stamped evidence for regulators or internal audits.",
      benefits: [
        "Avoid penalties up to $7,500 per violation – Intentional breaches carry steep fines that multiply per affected consumer",
        "Maintain California market access – Non-compliance excludes organizations from largest U.S. state economy ($3.9T GDP)",
        "Build consumer trust and loyalty – 79% of California consumers prioritize businesses that honor privacy rights",
        "Reduce data breach lawsuit exposure – Private right of action limited to data security failures, not all CCPA violations",
        "Strengthen data governance – CCPA compliance reveals data management weaknesses across the organization",
        "Accelerate multi-state privacy compliance – CCPA framework supports Virginia, Colorado, Connecticut, and 10+ other state laws",
        "Improve data quality and accuracy – Right to correct ensures customer data remains current and useful",
        "Enhance competitive positioning – Privacy leadership attracts conscious consumers in competitive markets",
        "Reduce marketing costs – Opt-out compliance focuses spending on engaged consumers, improving ROI",
        "Enable ethical data monetization – Transparent data practices build foundation for consent-based data partnerships",
        "Simplify GDPR compliance – CCPA modeled on GDPR; efforts support both frameworks simultaneously",
        "Protect brand reputation – Proactive privacy practices prevent consumer advocacy group complaints"
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
      icon: hipaaIcon,
      intro: "With Vardaan's GRC platform, HIPAA compliance becomes a continuous, automated patient data protection program—not a reactive scramble after audits or incidents.",
      description: "Our AI-powered platform integrates with your EHR/EMR systems, billing software, HR systems, cloud storage, and security tools—automatically capturing HIPAA-relevant events such as PHI access logs, unauthorized access attempts, security incident reports, employee training records, policy updates, and vendor risk assessments. Each event is mapped to the relevant HIPAA Privacy, Security, or Breach Notification Rule requirement and stored as verifiable, time-stamped evidence.",
      benefits: [
        "Avoid fines from $100 to $50,000+ per violation – Tier 4 willful neglect penalties reach $1.5M annual maximum per violation category",
        "Prevent $7.13M average breach costs – Healthcare breaches are most expensive across all industries",
        "Build patient trust and engagement – 88% of patients consider data security when choosing providers",
        "Improve patient outcomes by 25% – Patients share sensitive information more openly when privacy is assured",
        "Reduce medical errors – Standardized data handling and audit trails improve record accuracy and patient matching",
        "Enable value-based care models – Secure health information exchange supports population health management",
        "Protect organizational reputation – Data breaches damage provider trust for years, impacting patient acquisition",
        "Accelerate regulatory compliance – HIPAA foundation supports HITECH, state privacy laws, and international standards",
        "Lower cyber insurance premiums – Demonstrated compliance reduces healthcare-specific coverage costs by 20-30%",
        "Improve operational efficiency – Standardized transactions reduce administrative burden and processing time by 30%",
        "Enable telehealth expansion – HIPAA-compliant platforms support safe virtual care delivery",
        "Reduce fraud by $7B+ annually – Transaction standardization and audit controls minimize billing fraud",
        "Attract top talent – 76% of healthcare workers prefer employers with strong privacy cultures"
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
      icon: pciIcon,
      intro: "With Vardaan's GRC platform, PCI DSS compliance becomes a real-time, automated control monitoring program—protecting cardholder data and keeping you audit-ready every day.",
      description: "Our AI-powered platform integrates with your POS systems, payment gateways, firewalls, intrusion detection systems, vulnerability scanners, and access control tools—automatically capturing PCI DSS–relevant events such as firewall rule changes, vulnerability scan results, encryption key updates, access logs, penetration test outcomes, and incident reports. Each event is mapped to the correct PCI DSS requirement (from network security to vulnerability management to monitoring and testing) and stored as verifiable, time-stamped evidence.",
      benefits: [
        "Avoid fines from $5,000 to $100,000+ per month – Card brands impose escalating penalties for non-compliance",
        "Prevent $4.35M average breach costs – Payment card breaches trigger forensic audits, fines, and card reissuance expenses",
        "Build customer confidence and loyalty – 83% of consumers avoid merchants after payment data breaches",
        "Reduce transaction fees – Non-compliant merchants face 1.5% surcharges on every transaction",
        "Avoid payment processing suspension – Visa/Mastercard can revoke processing privileges for severe violations",
        "Protect brand reputation – Payment breaches generate negative media coverage for years",
        "Reduce cyber attack frequency by 50% – Compliant organizations experience significantly fewer breaches",
        "Improve operational efficiency – Standardized security controls streamline IT infrastructure management",
        "Enable global payment acceptance – PCI DSS recognized worldwide, facilitating international expansion",
        "Accelerate regulatory compliance – PCI DSS controls support SOX, GDPR, and state privacy law requirements",
        "Strengthen vendor relationships – Compliance demonstrates reliability to payment processors and banks",
        "Reduce incident response costs – Continuous monitoring detects threats early, minimizing containment expenses",
        "Build competitive advantage – Security leadership attracts enterprise customers with strict vendor requirements"
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
      icon: basel3Icon,
      intro: "With Vardaan's GRC platform, Basel III compliance becomes a continuous, automated capital and liquidity management system—transforming regulatory burden into competitive advantage for banks and financial institutions.",
      description: "Our AI-powered engine integrates with your core banking systems, treasury management, risk systems, and trading platforms—automatically capturing Basel III-relevant events such as capital tier calculations, liquidity coverage ratios (LCR), net stable funding ratios (NSFR), leverage ratio tracking, risk-weighted asset (RWA) computations, stress test results, and counterparty credit risk exposures. Each data point is mapped to the correct Basel III pillar (Minimum Capital Requirements, Supervisory Review, Market Discipline) and stored as verifiable evidence for regulators.",
      benefits: [
        "Mandatory for international banking operations – Required under FSMA and national banking regulations for banks with $100B+ assets and cross-border operations",
        "Avoid regulatory enforcement actions – Non-compliance triggers capital restrictions, dividend payment limitations, and potential license revocation",
        "Reduce capital costs by 15-20% – Optimized capital allocation and buffer management lower the cost of maintaining regulatory capital",
        "Enhance financial stability and resilience – Higher quality Tier 1 capital reduces bank failure risk by 40% compared to pre-Basel III standards",
        "Improve credit ratings and investor confidence – Strong capital ratios (CET1 >7%) attract institutional investors and lower funding costs",
        "Enable strategic capital planning – Real-time visibility into capital buffers supports M&A decisions, dividend planning, and growth strategies",
        "Reduce liquidity crisis risk by 50% – LCR and NSFR requirements ensure banks can survive 30-day stress scenarios",
        "Support stress testing automation – Continuous monitoring enables faster, more accurate stress test submissions to regulators",
        "Facilitate international expansion – Basel III recognition in 100+ countries simplifies cross-border banking operations",
        "Lower systemic risk exposure – G-SIB surcharges and countercyclical buffers protect against contagion during financial crises",
        "Improve risk management frameworks – Enhanced coverage of credit, market, and operational risks strengthens overall governance",
        "Enable better leverage management – 3% minimum leverage ratio prevents excessive debt accumulation"
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
      icon: nydfsIcon,
      intro: "With Vardaan's GRC platform, NYDFS 23 NYCRR 500 compliance becomes an always-on cybersecurity assurance program—protecting New York financial institutions while eliminating manual compliance burden.",
      description: "Our AI-driven platform integrates with your cybersecurity infrastructure, IT systems, incident response tools, and third-party vendor management platforms—automatically capturing NYDFS-relevant events such as penetration test results, vulnerability assessments, access control changes, cybersecurity incident reports, CISO certifications, third-party due diligence records, and annual risk assessments. Each event is mapped to specific NYDFS requirements (Sections 500.02-500.23) and stored as time-stamped, audit-ready evidence for regulators.",
      benefits: [
        "Mandatory for all NY financial services firms – Required for banks, insurers, mortgage brokers, and all entities licensed by NYDFS",
        "Avoid penalties up to $1M+ per violation – First American Title faced $1M fine for non-compliance; enforcement is aggressive",
        "Meet 72-hour breach notification requirement – Automated incident detection ensures timely reporting to NYDFS",
        "Streamline Class A vs Class B compliance – AI determines appropriate requirements based on asset size and complexity",
        "Reduce cybersecurity program costs by 40% – Automated controls monitoring eliminates redundant manual assessments",
        "Accelerate annual certification process – One-click compliance certification for board and senior management",
        "Enhance third-party vendor security – Automated due diligence tracking ensures service providers meet NYDFS standards",
        "Improve incident response maturity – Structured plans with root cause analysis reduce breach containment time by 50%",
        "Enable multi-framework leverage – NYDFS compliance supports ISO 27001, NIST, SOC 2, and PCI DSS simultaneously",
        "Protect sensitive nonpublic information (NPI) – Encryption and access controls prevent customer data breaches",
        "Strengthen board-level cyber governance – CISO reporting requirements elevate cybersecurity to strategic priority",
        "Support 2023 amendment compliance – Platform addresses enhanced penetration testing, access controls, and monitoring requirements"
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
      icon: amlIcon,
      intro: "With Vardaan's GRC platform, AML compliance becomes an intelligent, automated financial crime prevention system—detecting suspicious activity in real-time while reducing false positives and compliance costs.",
      description: "Our AI-powered engine integrates with your transaction monitoring systems, customer onboarding platforms, KYC databases, sanctions screening tools, and case management systems—automatically capturing AML-relevant events such as suspicious transaction alerts, customer due diligence (CDD) updates, enhanced due diligence (EDD) triggers, beneficial ownership verification, sanctions hits, currency transaction reports (CTRs), and suspicious activity reports (SARs). Each event is mapped to applicable AML regulations (Bank Secrecy Act, USA PATRIOT Act, FinCEN guidance) and stored as audit-ready evidence.",
      benefits: [
        "Mandatory for all financial institutions – Required under BSA, PATRIOT Act for banks, credit unions, MSBs, securities firms, casinos",
        "Avoid penalties up to $10M+ per violation – AML fines totaled $8.14B globally in 2022; enforcement is escalating",
        "Reduce false positives by 60-70% – AI-powered transaction monitoring cuts investigation workload by analyzing patterns vs. rigid rules",
        "Accelerate suspicious activity detection – Real-time analytics identify money laundering 50% faster than traditional methods",
        "Improve customer experience – Reduced false positives mean fewer account freezes and faster legitimate transaction processing",
        "Enhance regulatory compliance and reputation – Demonstrable AML programs reduce regulatory scrutiny and protect brand value",
        "Achieve competitive advantage – Strong AML practices attract customers who prioritize secure, compliant banking",
        "Lower compliance costs by 40-50% – Automation reduces manual review time and optimizes investigator allocation",
        "Strengthen fraud prevention – Advanced identity verification tools detect synthetic identities and account takeovers",
        "Enable risk-based approach – Tailored controls align resources with actual risk profiles vs. one-size-fits-all methods",
        "Facilitate cross-border operations – Harmonized AML programs support international expansion across FATF member countries",
        "Improve data quality and reporting accuracy – Automated data validation ensures CTR/SAR filings meet FinCEN standards"
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
      icon: doddfrankIcon,
      intro: "With Vardaan's GRC platform, Dodd-Frank compliance becomes a streamlined, automated regulatory management system—reducing compliance burden while strengthening consumer protection and systemic risk management.",
      description: "Our AI-powered platform integrates with your risk management systems, trading platforms, compliance tools, consumer protection databases, and stress testing infrastructure—automatically capturing Dodd-Frank–relevant events such as Volcker Rule trading restrictions, CCAR/DFAST stress test results, systemic risk indicators for SIFIs, consumer complaint tracking, derivatives reporting, executive compensation disclosures, and whistleblower submissions. Each data point is mapped to the relevant Dodd-Frank title (16 titles covering 243 rules) and stored as verifiable regulatory evidence.",
      benefits: [
        "Mandatory for banks with $50B-$250B+ assets – Enhanced prudential standards required for systemically important institutions",
        "Avoid enforcement actions and penalties – CFPB issued $2.7B in penalties since 2011; SEC oversight has intensified",
        "Reduce systemic risk exposure – Stress testing and capital planning prevent \"too big to fail\" scenarios",
        "Strengthen consumer protection compliance – CFPB oversight ensures fair lending, transparent mortgages, and complaint resolution",
        "Enable Volcker Rule compliance – Automated trading activity monitoring separates proprietary trading from customer service",
        "Improve risk management frameworks – Enhanced standards elevate governance, liquidity, and risk controls",
        "Support stress testing automation – CCAR/DFAST submissions completed 40% faster with continuous data collection",
        "Enhance investor protection – Greater transparency in derivatives and securities markets builds institutional confidence",
        "Facilitate regulatory reporting – Automated compliance with 67 mandated studies and 22 periodic reports",
        "Reduce compliance costs for smaller banks – $10B asset threshold exempts community banks from most Volcker Rule requirements",
        "Strengthen executive accountability – Say-on-pay provisions and clawback requirements align leadership incentives",
        "Enable data-driven decision making – Comprehensive risk data supports strategic planning and resource allocation"
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
      icon: ffiecIcon,
      intro: "With Vardaan's GRC platform, FFIEC cybersecurity compliance becomes a continuous, automated assurance program—helping federally supervised financial institutions achieve and maintain robust cyber resilience.",
      description: "Our AI-powered platform integrates with your IT infrastructure, cybersecurity tools, risk assessment systems, and audit frameworks—automatically capturing FFIEC-relevant events such as Cybersecurity Assessment Tool (CAT) results, inherent risk profile calculations, cybersecurity maturity levels across five domains (Cyber Risk Management, Threat Intelligence, Cybersecurity Controls, External Dependency Management, Cyber Incident Management), penetration testing outcomes, vulnerability scan data, and board reporting documentation. Each data point is mapped to FFIEC IT Examination Handbook requirements and stored as audit-ready evidence.",
      benefits: [
        "Mandatory for all federally supervised institutions – Required for banks, credit unions, and service providers under FDIC, OCC, Federal Reserve, NCUA, CFPB oversight",
        "Avoid penalties up to $2M per violation – Federal banking agencies enforce through consent orders, fines, and operational restrictions",
        "Reduce cybersecurity assessment time by 50% – Automated CAT scoring replaces manual quarterly evaluations",
        "Align with regulatory examination expectations – FFIEC-compliant programs reduce examination findings and remediation requirements",
        "Measure inherent risk accurately – Automated profiling across five categories (Technologies, Connections, Delivery Channels, Online/Mobile Products, Organizational Characteristics)",
        "Improve cybersecurity maturity systematically – Track progression across Baseline, Evolving, Intermediate, Advanced, Innovative levels",
        "Enable risk-based resource allocation – Match maturity investments to actual inherent risk profile vs. arbitrary spending",
        "Support BSA/AML examination readiness – FFIEC's 500+ page manual requirements automated and continuously monitored",
        "Facilitate multi-framework compliance – FFIEC evidence supports NIST CSF, ISO 27001, and SOC 2 simultaneously",
        "Strengthen third-party risk management – Automated vendor assessments aligned with FFIEC guidance",
        "Improve board-level cyber governance – Executive dashboards translate technical risks into business language",
        "Adapt to evolving threat landscape – Regular updates to assessment tool reflect emerging risks (cloud, AI, ransomware)"
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
      icon: solvency2Icon,
      intro: "With Vardaan's GRC platform, Solvency II compliance becomes an intelligent, automated risk and capital management system—ensuring EU insurers maintain financial stability while reducing regulatory burden.",
      description: "Our AI-powered engine integrates with your actuarial systems, investment management platforms, risk modeling tools, and financial reporting infrastructure—automatically capturing Solvency II-relevant data such as Solvency Capital Requirement (SCR) calculations, Minimum Capital Requirement (MCR) tracking, Own Risk and Solvency Assessment (ORSA) reports, technical provisions valuations, asset-liability matching metrics, Solvency and Financial Condition Reports (SFCR), and supervisory reporting submissions. Each data point is mapped to the correct Solvency II pillar (Quantitative Requirements, Qualitative Supervision, Disclosure) and stored as verifiable regulatory evidence.",
      benefits: [
        "Mandatory for all EU insurance and reinsurance companies – Required under European Insurance and Occupational Pensions Authority (EIOPA) regulations",
        "Avoid severe regulatory sanctions – Non-compliance triggers capital add-ons, portfolio restrictions, and potential license revocation",
        "Reduce capital requirements by 10-20% – Risk-based approach rewards strong governance and internal models vs. standardized formulas",
        "Enhance financial stability and policyholder protection – Market-consistent valuation ensures insurers can meet obligations in adverse scenarios",
        "Improve risk management maturity – ORSA requirements elevate risk culture and board-level oversight",
        "Enable strategic capital allocation – Real-time SCR monitoring supports M&A, product development, and investment decisions",
        "Reduce regulatory reporting burden – 2025 amendments cut SFCR requirements for small insurers; biennial ORSA for SNCUs",
        "Support climate risk integration – New requirements for climate scenario analysis align with TCFD and ESG reporting",
        "Facilitate cross-border operations – Harmonized EU framework enables group supervision and passporting rights",
        "Lower insurance costs – Improved risk pricing from better data enables competitive premium setting",
        "Strengthen investor confidence – Transparent capital adequacy reporting attracts institutional investment",
        "Enable long-term investment strategies – Volatility adjustment and matching adjustment mechanisms support infrastructure and green bonds"
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
      icon: naicIcon,
      intro: "With Vardaan's GRC platform, NAIC Model Law compliance becomes a unified, automated regulatory management system—helping insurers navigate state-by-state requirements while maintaining operational consistency.",
      description: "Our AI-powered platform integrates with your policy administration systems, claims management platforms, licensing databases, financial reporting tools, and data security infrastructure—automatically capturing NAIC-relevant events such as cybersecurity program documentation, data breach notifications, producer licensing verifications, market conduct compliance, financial solvency metrics, consumer complaint tracking, and state-specific reporting requirements. Each data point is mapped to applicable NAIC Model Laws (including Data Security Model Law #668, ORSA Model Act #505, Corporate Governance Model Act #305) and state adoption variations.",
      benefits: [
        "Mandatory for state-licensed insurers nationwide – Required across all 50 states + DC with varying adoption of 100+ NAIC model laws",
        "Avoid penalties up to $500-$10,000 per violation – Data Security Model Law fines reach $10,000; criminal penalties include 5 years imprisonment",
        "Achieve multi-state compliance efficiency – Unified framework reduces duplicative efforts across 22+ states with Data Security Law",
        "Strengthen consumer protection credibility – Standardized disclosure requirements build policyholder trust and market confidence",
        "Enhance solvency and financial stability – Capital and surplus requirements prevent insolvencies and protect policyholders",
        "Improve market conduct compliance – Automated tracking of ethical standards prevents deceptive practices and claim delays",
        "Enable faster product approvals – Interstate Insurance Product Regulation Commission (IIPRC) accelerates multi-state filings by 40%",
        "Reduce data breach notification costs – Automated incident tracking ensures timely reporting to commissioners",
        "Support producer licensing management – Centralized tracking prevents unlicensed agent activity and regulatory violations",
        "Facilitate state-specific customization – Platform adapts to state modifications of model laws while maintaining consistency",
        "Strengthen cybersecurity governance – Data Security Model Law requires CISO appointment, annual risk assessments, and board oversight",
        "Enable competitive advantage – Proactive compliance positions insurers as industry leaders during regulatory change"
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
      icon: lodrIcon,
      intro: "With Vardaan's GRC platform, SEBI LODR compliance becomes an automated, real-time disclosure management system—ensuring listed companies maintain transparency and meet all corporate governance obligations effortlessly.",
      description: "Our AI-powered platform integrates with your ERP, board management systems, investor relations platforms, financial reporting tools, and corporate secretarial databases—automatically capturing LODR-relevant events such as material event disclosures (Regulation 30), quarterly/annual financial results, corporate governance reports, related party transactions, shareholding pattern changes, insider trading compliance, board composition updates, and disclosure submissions to stock exchanges. Each event is mapped to specific SEBI LODR regulations (across 12 chapters) and stored with timestamps for BSE/NSE compliance.",
      benefits: [
        "Mandatory for all Indian listed companies – Required under SEBI regulations for equity shares, debt securities, REITs, InvITs",
        "Avoid penalties and trading suspensions – Non-compliance triggers fines, show-cause notices, and potential delisting",
        "Reduce disclosure preparation time by 60% – Automated event tracking eliminates manual data consolidation for Reg 30 filings",
        "Ensure timely material event reporting – AI flags disclosable events within regulatory deadlines (24-48 hours for most events)",
        "Strengthen corporate governance compliance – Automated board composition, committee formation, and independent director tracking",
        "Enhance investor confidence and trust – Transparent, timely disclosures improve analyst ratings and institutional investor participation",
        "Improve financial reporting accuracy – Automated reconciliation ensures quarterly results match accounting standards (Ind AS/IFRS)",
        "Enable related party transaction monitoring – Real-time tracking prevents undisclosed RPTs and audit committee violations",
        "Support insider trading prevention – Automated trading window closures and preclearance management",
        "Facilitate M&A and fundraising – Clean compliance history accelerates due diligence and improves valuation",
        "Reduce compliance team workload by 50% – Automated filing generation and submission to stock exchanges",
        "Adapt to regulatory amendments – Platform updates reflect SEBI circulars and LODR changes automatically"
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
      icon: orsaIcon,
      intro: "With Vardaan's GRC platform, ORSA becomes a dynamic, forward-looking risk and capital assessment system—empowering insurers to make strategic decisions while demonstrating regulatory compliance effortlessly.",
      description: "Our AI-powered platform integrates with your enterprise risk management (ERM) systems, actuarial modeling tools, capital management platforms, stress testing infrastructure, and business planning systems—automatically capturing ORSA-relevant data such as risk identification and assessment across all material risks (underwriting, market, credit, operational, liquidity, strategic), capital adequacy calculations under current and stressed scenarios, internal target setting, forward-looking solvency projections, stress and scenario testing results, and management action plans. Each assessment component is mapped to NAIC Model Act #505 or EU Solvency II requirements and documented for regulatory review.",
      benefits: [
        "Mandatory for insurers with $500M+ premiums – Required under NAIC ORSA Model Act; EU Solvency II Pillar 2 requirement for all insurers",
        "Avoid regulatory intervention and capital add-ons – Inadequate ORSA triggers supervisory actions including increased capital requirements",
        "Enhance risk management maturity – Comprehensive risk assessment elevates risk culture across the organization",
        "Enable strategic capital allocation – Forward-looking solvency projections support M&A, product development, and investment decisions",
        "Improve board and senior management oversight – ORSA reports provide clear, comprehensive risk visibility for governance",
        "Support business planning integration – Risk assessment aligned with strategy ensures risk appetite informs growth plans",
        "Reduce capital inefficiency by 20% – Internal models may require less capital than standardized formulas for well-managed risks",
        "Accelerate regulatory approval processes – Robust ORSA demonstrates risk management sophistication, facilitating product and expansion approvals",
        "Enable early warning of solvency issues – Continuous monitoring detects capital erosion 6-12 months earlier than annual reviews",
        "Strengthen stress testing capabilities – Scenario analysis reveals vulnerabilities to economic shocks, pandemics, catastrophes",
        "Facilitate group-wide risk assessment – Consolidated ORSA for insurance groups identifies contagion risks and diversification benefits",
        "Demonstrate proportionality – Small insurers benefit from biennial ORSA and reduced requirements under EU reforms"
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
      icon: ifrsIcon,
      intro: "With Vardaan's GRC platform, IFRS compliance becomes an automated, globally consistent financial reporting system—ensuring transparency, accuracy, and comparability across international operations.",
      description: "Our AI-powered platform integrates with your ERP systems, accounting software, consolidation tools, asset management platforms, and financial reporting infrastructure—automatically capturing IFRS-relevant data such as fair value measurements, revenue recognition (IFRS 15), lease accounting (IFRS 16), financial instruments classifications (IFRS 9), impairment assessments, foreign currency translations, consolidation adjustments, and disclosure note generation. Each transaction is mapped to applicable IFRS standards (IFRS 1-18, IAS 1-41) and stored with audit trails for external auditor review.",
      benefits: [
        "Mandatory for 140+ countries – Required for publicly traded companies in EU, UK, Australia, Canada, India, and 140+ jurisdictions",
        "Enable global capital market access – IFRS compliance required for listings on LSE, Euronext, Hong Kong Stock Exchange, and other major bourses",
        "Improve financial statement comparability – Investors can benchmark performance across companies and countries using standardized metrics",
        "Increase investor confidence by 35% – Transparent, consistent reporting reduces information asymmetry and attracts institutional capital",
        "Simplify cross-border M&A – Unified accounting eliminates restatement costs and accelerates due diligence by 40%",
        "Enhance fair value accuracy – IFRS mandates market-based asset valuations vs. outdated historical costs",
        "Reduce audit costs by 25% – Standardized frameworks minimize reconciliation and external auditor hours",
        "Facilitate international expansion – Consistent financial reporting across subsidiaries eliminates multiple accounting systems",
        "Improve financial transparency and accountability – Comprehensive disclosure requirements build stakeholder trust",
        "Support ESG and sustainability reporting – IFRS Foundation developing sustainability standards (ISSB) integrated with financial reporting",
        "Enable better capital planning – Accurate asset and liability measurement improves strategic resource allocation",
        "Reduce regulatory risk – IFRS alignment prevents penalties for non-compliant financial statements in jurisdictions requiring adoption"
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
      name: 'Cybersecurity Frameworks (NIST CSF, ISO 27001, CIS Controls, COBIT)',
      tag: 'CYBER-FRAMEWORKS',
      icon: cyberFrameworksIcon,
      intro: "With Vardaan's GRC platform, cybersecurity framework compliance becomes a unified, automated security assurance program—integrating NIST CSF, ISO 27001, CIS Controls, and COBIT into a single, efficient system.",
      description: "Our AI-powered platform integrates with your entire cybersecurity ecosystem—SIEM, EDR, firewalls, vulnerability scanners, IAM systems, DLP tools, and security orchestration platforms—automatically capturing evidence across all major frameworks: NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover), ISO 27001 (114 controls across 14 domains), CIS Controls (18 safeguards), and COBIT 2019 (40 governance and management objectives). Each security event is mapped to relevant framework requirements and stored as verifiable evidence for audits and examinations.",
      benefits: [
        "Reduce multi-framework compliance burden by 60% – Unified evidence collection supports NIST, ISO, CIS, and COBIT simultaneously",
        "Accelerate regulatory alignment – Cybersecurity frameworks map to GLBA, SOX, HIPAA, PCI DSS, GDPR, reducing duplicate efforts",
        "Improve cyber risk management maturity – Structured frameworks elevate security from ad-hoc to systematic, repeatable processes",
        "Enable C-suite and board communication – Plain-language risk reporting translates technical controls into business impact",
        "Support tailored security programs – Flexible frameworks scale from startups to critical infrastructure based on risk profile",
        "Facilitate vendor security assessments – Common framework language streamlines third-party risk evaluations",
        "Improve incident detection and response by 50% – Continuous monitoring across framework controls identifies threats earlier",
        "Enable regulatory examination readiness – Framework mapping satisfies FFIEC, NYDFS, and banking regulator expectations",
        "Support international operations – ISO 27001 recognized in 170+ countries; NIST CSF adopted globally",
        "Reduce cybersecurity insurance premiums by 20% – Framework certification demonstrates risk management maturity",
        "Achieve competitive differentiation – Security certifications (ISO 27001, SOC 2) win enterprise contracts requiring vendor attestations",
        "Enable continuous improvement culture – Framework maturity models drive year-over-year security posture enhancement"
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
      icon: stateInsuranceIcon,
      intro: "With Vardaan's GRC platform, state insurance regulatory compliance becomes a unified, automated oversight system—managing 50+ state variations while ensuring consumer protection and market conduct excellence.",
      description: "Our AI-powered platform integrates with your policy administration systems, claims platforms, producer licensing databases, financial reporting tools, market conduct systems, and consumer complaint management infrastructure—automatically capturing state-specific regulatory events such as rate and form filings, producer license verifications and renewals, market conduct examination findings, consumer complaint resolutions, financial solvency reports, data breach notifications, and state-specific disclosure requirements. Each event is mapped to applicable state insurance department regulations across all 50 states + DC and territories.",
      benefits: [
        "Mandatory for all state-licensed insurers – Each state maintains unique licensing, solvency, market conduct, and consumer protection requirements",
        "Avoid penalties ranging from $1,000 to $500,000 – State insurance commissioners enforce through fines, license suspensions, and corrective action orders",
        "Reduce multi-state compliance costs by 50% – Unified platform eliminates duplicative state-by-state manual tracking",
        "Accelerate rate and form approvals – Automated SERFF filings reduce approval time by 30-40% across jurisdictions",
        "Strengthen consumer protection compliance – Automated tracking of fair claims handling, policy disclosure, and complaint resolution",
        "Ensure producer licensing compliance – Real-time verification prevents unlicensed agent activity and prevents regulatory violations",
        "Maintain financial solvency oversight – Automated state-specific financial reporting and examination preparation",
        "Improve market conduct examination outcomes – Continuous monitoring identifies issues before triennial examinations",
        "Enable state-specific customization – Platform adapts to unique state requirements (e.g., California privacy, New York cybersecurity)",
        "Strengthen competitive positioning – Compliance excellence enables faster market entry and expansion into new states",
        "Support NAIC collaboration – State-based system enables participation in interstate compacts and uniform standards",
        "Build consumer trust and brand reputation – Demonstrated regulatory compliance attracts policyholders and agents"
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
      icon: ccpaIcon,
      intro: "With Vardaan's GRC platform, CCPA compliance becomes an automated, real-time privacy assurance system—transforming consumer data rights into competitive advantage for California organizations.",
      description: "Our AI engine integrates with your CRM, e-commerce, marketing automation, and IT systems to auto-capture compliance-relevant activities—DSARs, opt-out requests, consent changes, third-party data sharing, breach notifications, and regulatory filings—mapped to CCPA mandates and stored as audit-ready evidence for rapid response and reporting.",
      benefits: [
        "Mandatory for businesses serving California consumers with annual revenue $25M+ or collecting >50K+ personal records",
        "Prevents penalties up to $7,500 per violation by meeting requirements for opt-out, deletion, and non-discrimination",
        "Boosts consumer trust: 79% of Californians prefer privacy-focused organizations",
        "Simplifies compliance for other state/Federal privacy laws: Many requirements align with GDPR, CPRA, Virginia, Colorado, Connecticut",
        "Cuts DSAR response time by 50% with automated request management and secure data delivery",
        "Avoids breach-related liability with proactive incident detection and notification workflow",
        "Improves marketing ROI by targeting engaged, opted-in audiences and eliminating risky processing",
        "Enhances data governance through systematic tracking of data collection, usage, and sharing practices",
        "Strengthens vendor management with automated third-party data processing agreements and oversight",
        "Accelerates multi-state expansion by establishing privacy-by-design foundation for other jurisdictions",
        "Builds competitive differentiation through transparent privacy practices that attract privacy-conscious customers",
        "Reduces legal risks by maintaining comprehensive audit trails and compliance documentation"
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
      name: 'REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals)',
      tag: 'REACH',
      icon: reachComplianceIcon,
      intro: "Vardaan's GRC makes EU REACH compliance automated and proactive—eliminating supply chain disruptions and enabling market expansion for manufacturers and importers.",
      description: "Our system connects to ERP, PLM, chemical databases, supplier portals, and quality management systems—capturing compliance evidence on substance registration, risk assessment, communication with suppliers/customers, compliance documentation, and SVHC (Substances of Very High Concern) tracking.",
      benefits: [
        "Mandatory for anyone manufacturing or importing chemical substances or articles into the EU",
        "Prevents costly product recalls, market bans, and fines up to €50,000",
        "Accelerates EU market access and customs clearance via pre-verified chemical documentation",
        "Strengthens supply chain resilience with automated supplier monitoring for compliance documentation",
        "Supports ESG and circular economy goals by tracking hazardous and recyclability data for products",
        "Improves brand reputation with verified safety and sustainability commitments",
        "Enhances product transparency through comprehensive chemical composition documentation",
        "Reduces regulatory uncertainty with automated updates on REACH regulation changes",
        "Facilitates global expansion by meeting the world's most stringent chemical regulations",
        "Strengthens competitive positioning in EU markets through demonstrated compliance leadership"
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
      icon: hitechIcon,
      intro: "With Vardaan's GRC platform, HITECH compliance is a continuous, automated patient privacy and data breach response system—supporting secure health IT transformation.",
      description: "The platform connects to EHR/EMR, billing, health IT, and security tools—auto-tracking breach notifications, risk assessments, patient data access logs, encryption status, and workforce training mapped to HITECH and HIPAA requirements.",
      benefits: [
        "Required for any entity managing electronic PHI under HIPAA; enforces mandatory breach notifications and business associate accountability",
        "Protects against fines up to $1.5M annually for willful neglect",
        "Speeds breach notification with automated event detection and response checklists",
        "Strengthens business associate oversight with contract and compliance mapping",
        "Accelerates EHR adoption and eligibility for financial incentives",
        "Reduces breach scope and cost through proactive risk management",
        "Enhances patient trust through demonstrated security and privacy protections",
        "Improves regulatory standing with comprehensive audit trails and compliance documentation",
        "Streamlines business associate management with automated vendor assessment and monitoring",
        "Supports healthcare innovation by enabling secure health information exchange"
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
      icon: hitrustIcon,
      intro: "With Vardaan's GRC platform, HITRUST CSF compliance becomes a unified, scalable security and privacy assurance solution—ready for healthcare, financial services, and cloud vendors.",
      description: "The system syncs with security controls, policy management, risk systems, and audit infrastructure, auto-mapping evidence for 19+ regulatory frameworks including HIPAA, HITECH, GDPR, PCI DSS, SOC 2, and NIST in one place.",
      benefits: [
        "Required for vendors and covered entities serving U.S. healthcare clients; increasingly adopted by cloud and fintech firms",
        "Accelerates third-party risk reviews and contract approvals in healthcare, finance, and life sciences",
        "Reduces repetitive audits by offering a single certification accepted across multiple clients",
        "Automates control testing for >2,000 requirements across diverse standards",
        "Strengthens breach defense with proactive risk monitoring and instant response playbooks",
        "Enhances market competitiveness through recognized security and privacy certification",
        "Simplifies compliance across multiple frameworks with unified evidence collection",
        "Improves client trust and confidence through demonstrated security excellence",
        "Reduces audit costs and complexity through comprehensive framework coverage",
        "Enables faster market entry in regulated industries through pre-certified security posture"
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
      icon: fda820Icon,
      intro: "Vardaan's GRC automates FDA QSR compliance for medical device manufacturers—eliminating manual audits and ensuring product safety from design through distribution.",
      description: "Integrates with PLM, ERP, complaint handling, CAPA, and document management—tracking design controls, manufacturing records, device history files, post-market surveillance, supplier quality, and non-conformance reports mapped to FDA QSR sections.",
      benefits: [
        "Mandatory for all U.S. medical device companies (Class I-III)",
        "Prevents FDA Form 483 observations and warning letters, which can halt sales or trigger recalls",
        "Accelerates device approval with complete design history and traceability",
        "Improves defect and complaint resolution for continuous product safety monitoring",
        "Supports global ISO 13485 and EU MDR certification readiness",
        "Enhances patient safety through systematic quality management and risk control",
        "Reduces regulatory risk with comprehensive documentation and audit trails",
        "Streamlines post-market surveillance and adverse event reporting",
        "Strengthens supplier quality management through automated vendor oversight",
        "Enables faster time-to-market with pre-audit readiness and compliance automation"
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
      icon: statePrivacyIcon,
      intro: "Vardaan's GRC platform enables seamless compliance with U.S. state privacy laws—mapping consent, access, disclosure, and breach requirements across dozens of state statutes and regulations.",
      description: "Auto-captures opt-out, data deletion, correction, breach notification, and record-keeping events for CCPA, CPRA, VCDPA, CPA, CTDPA, UCPA, and other emerging state laws—tagged by requirement for exact regulatory coverage.",
      benefits: [
        "Protects against penalties ranging from $7,500 per violation to class action claims",
        "Adapts to new/amended laws in real-time, future-proofing privacy programs",
        "Accelerates multi-state compliance, supporting national rollouts for digital products",
        "Improves consumer trust and market differentiation with high-visibility privacy controls",
        "Reduces compliance complexity through unified management of state-specific requirements",
        "Enhances data governance with comprehensive tracking of consumer rights and requests",
        "Strengthens competitive positioning through proactive privacy leadership",
        "Minimizes legal risks with automated compliance monitoring and documentation",
        "Enables scalable privacy operations across all U.S. markets and jurisdictions"
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
      icon: jointCommissionIcon,
      intro: "Vardaan's GRC platform automates continuous readiness for Joint Commission accreditation—improving patient safety, clinical quality, and regulatory standing for hospitals and providers.",
      description: "Automatically tracks compliance evidence for Environment of Care, Infection Prevention, Patient Rights, Medication Management, Emergency Management, and Human Resources—mapped to Joint Commission standards and survey methodologies.",
      benefits: [
        "Required by most U.S. hospitals, accredited providers, and increasingly global healthcare organizations",
        "Accelerates survey readiness and avoids costly deficiencies or penalties",
        "Improves patient safety metrics and care outcomes",
        "Benchmarking and reporting aligns with CMS, state, and specialty accreditations",
        "Enhances operational efficiency through systematic quality improvement processes",
        "Strengthens staff competency with automated training and certification tracking",
        "Reduces survey preparation time and administrative burden",
        "Improves patient satisfaction through consistent quality care delivery",
        "Enables continuous improvement culture with real-time compliance monitoring",
        "Supports regulatory reporting requirements with comprehensive audit trails"
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
      icon: iso9001Icon,
      intro: "Vardaan's GRC makes ISO 9001 quality management work in real-time—driving customer satisfaction and continuous process improvement across any industry.",
      description: "Connects with production, service management, documentation, supplier systems, corrective action tracking, and training records to auto-capture compliance-relevant evidence for ISO 9001 clauses—mapping quality objectives, audits, nonconformities, and improvement cycles.",
      benefits: [
        "Mandatory for clients/suppliers in aerospace, automotive, pharmaceuticals, and other sectors; supports global market access",
        "Boosts process efficiency and defect reduction for measurable cost savings",
        "Improves supplier, partner, and customer trust in product/service delivery",
        "Accelerates certification cycles and ensures record retention for re-audit",
        "Enhances customer satisfaction through systematic quality improvement",
        "Strengthens competitive positioning with recognized quality management certification",
        "Reduces operational costs through optimized processes and reduced waste",
        "Improves employee engagement with clear quality objectives and training",
        "Enables continuous improvement culture with data-driven decision making",
        "Supports business growth through consistent quality performance and customer confidence"
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
      icon: oshaIcon,
      intro: "With Vardaan's GRC platform, OSHA compliance is a continuous safety and health management system—protecting employees and reducing regulatory risk for U.S. employers.",
      description: "Integrates with incident tracking, safety training, equipment maintenance, hazard communication (HazCom), PPE, and emergency response systems—auto-documenting compliance with OSHA standards and submitting reporting (Form 300, 301, 300A).",
      benefits: [
        "Prevents OSHA fines ($13,653 per violation or more for willful/repeat citations) and workplace injuries",
        "Improves injury prevention and hazard mitigation with real-time tracking",
        "Boosts workforce confidence and productivity",
        "Accelerates claim/insurance documentation and regulatory reporting",
        "Enhances workplace safety culture through systematic risk management",
        "Reduces workers' compensation costs through proactive injury prevention",
        "Strengthens regulatory standing with comprehensive compliance documentation",
        "Improves employee morale and retention through demonstrated safety commitment",
        "Enables faster incident investigation and corrective action implementation",
        "Supports continuous improvement of safety programs with data-driven insights"
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
      icon: fdagmpIcon,
      intro: "Vardaan's GRC platform automates FDA GMP compliance—ensuring pharmaceuticals, food, and medical devices meet or exceed quality and safety standards, protecting consumer health.",
      description: "Syncs with manufacturing, lab, QA, and batch record systems—tracking documentation, change control, equipment qualification, supplier audits, and deviation/CAPA events mapped to FDA/21 CFR GMP/GLP requirements.",
      benefits: [
        "Required for all U.S. manufacturers; crucial for export and sales globally",
        "Accelerates FDA pre-approval, routine, or surprise inspections",
        "Prevents costly recalls and regulatory enforcement",
        "Improves product quality, market trust, and reliability",
        "Streamlines quality assurance processes through automated monitoring",
        "Reduces manufacturing risks through systematic quality control",
        "Enhances supply chain management with supplier audit automation",
        "Supports global market expansion with standardized quality systems",
        "Improves customer satisfaction through consistent product quality",
        "Enables faster time-to-market for new products with compliance readiness"
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
      icon: epaIcon,
      intro: "Vardaan's GRC makes EPA compliance an automated environmental stewardship system—enabling businesses to meet federal and state rules while advancing sustainability goals.",
      description: "Connects with facilities, waste, emissions monitoring, hazardous materials, incident reporting, and supply chain systems—tracking and mapping evidence for Clean Air Act, Clean Water Act, RCRA, TSCA, and state equivalents.",
      benefits: [
        "Prevents fines (ranging from $10,000 to $10M+ per violation) and criminal liability for organizations and executives",
        "Supports sustainability, ESG, and climate risk reporting via integrated environmental data",
        "Accelerates permit acquisition and renewal",
        "Improves stakeholder and community trust through transparent reporting",
        "Enhances environmental risk management through proactive monitoring",
        "Reduces operational costs through efficient resource management",
        "Strengthens corporate reputation with demonstrated environmental responsibility",
        "Enables compliance across multiple environmental regulations simultaneously",
        "Improves regulatory relationship through consistent compliance performance",
        "Supports business continuity with comprehensive environmental oversight"
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
      icon: itarIcon,
      intro: "Vardaan's GRC automates ITAR compliance—protecting sensitive U.S. defense, aerospace, and technology exports from unauthorized access and sanctions.",
      description: "Tracks license management, export authorization, restricted-party screening, technical data handling, and compliance evidence for all ITAR-controlled items and activities.",
      benefits: [
        "Required for U.S. manufacturers, exporters, and service providers handling defense articles, technical data, and software",
        "Prevents ITAR fines and debarment (fines up to $1M+, criminal penalties possible)",
        "Facilitates international supply chain and defense contracts",
        "Improves control of technical data and cybersecurity for remote and cloud environments",
        "Accelerates export authorization processes through automated screening",
        "Enhances supply chain security through comprehensive vendor management",
        "Reduces compliance risks in international business operations",
        "Strengthens defense industry partnerships through demonstrated security practices",
        "Enables faster contract approvals with pre-verified compliance systems",
        "Supports global business expansion while maintaining regulatory compliance"
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
      icon: industryStandardIcon,
      intro: "Vardaan's GRC supports rapid deployment and management of industry-specific regulatory and quality frameworks—from automotive to food and construction.",
      description: "Configurable modules for standards such as IATF 16949 (automotive), ISO 22000 (food safety), ISO 45001 (occupational health/safety), and more—auto-tracking documentation, audits, supplier controls, risk assessments, and improvement actions.",
      benefits: [
        "Accelerates client contract wins and supply chain qualification",
        "Breaks compliance silos for uninterrupted business operations",
        "Supports global expansion via harmonized standards adoption",
        "Enhances operational efficiency through standardized processes",
        "Reduces quality issues and customer complaints through systematic controls",
        "Improves supplier relationships through automated vendor management",
        "Enables faster certification and recertification processes",
        "Strengthens competitive positioning in specialized markets",
        "Supports continuous improvement culture across all operations",
        "Reduces training costs through standardized procedures and documentation"
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
      icon: soc2Icon,
      intro: "Vardaan's GRC enables automated, continuous SOC 2 Type 2 compliance—building trust and winning B2B clients with cloud security maturity.",
      description: "Connects with IT, security, HR, incident, and vendor systems—capturing evidence mapped to the five Trust Service Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy). Automates monitoring, reporting, and auditor liaison.",
      benefits: [
        "Essential for SaaS, cloud, and service providers to win enterprise contracts",
        "Demonstrates year-round control effectiveness with ready-for-audit evidence",
        "Accelerates new client onboarding and vendor due diligence",
        "Supports multi-regulation compliance: maps to NIST, ISO, GDPR, PCI DSS, HIPAA",
        "Reduces audit preparation time and costs through automated evidence collection",
        "Enhances client confidence through transparent security practices",
        "Improves competitive positioning in B2B markets",
        "Enables faster sales cycles with pre-validated security controls",
        "Strengthens vendor relationships through comprehensive third-party oversight",
        "Supports business growth with scalable compliance management"
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
      icon: fedrampIcon,
      intro: "Vardaan's GRC automates FedRAMP compliance for cloud vendors—enabling secure federal contracts and public sector innovation.",
      description: "Tracks evidence for NIST SP 800-53 controls, continuous monitoring, assessment, and Authority to Operate (ATO) workflow—mapped to FedRAMP Moderate, High, and LI-SaaS baselines.",
      benefits: [
        "Required for cloud vendors serving U.S. federal agencies",
        "Accelerates ATO approval and re-use across multiple agencies",
        "Reduces cost of documentation, assessment, and ongoing compliance",
        "Supports cybersecurity best practices for government and critical infrastructure",
        "Enables access to billions in federal contract opportunities",
        "Strengthens security posture through comprehensive control implementation",
        "Improves competitive positioning in government markets",
        "Reduces compliance costs through reusable documentation and processes",
        "Enhances trust and credibility with federal stakeholders",
        "Supports business expansion into government and critical infrastructure sectors"
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
      icon: industryCertIcon,
      intro: "With Vardaan's GRC, industry-specific credentials (PCI DSS, ISO 13485, ISO 17025, etc.) are achieved and maintained with automated evidence, fast reporting, and audit-ready dashboards.",
      description: "Empowers organizations to meet client demands, regulatory mandates, and market opportunities through tailored compliance evidence and ongoing monitoring.",
      benefits: [
        "Accelerates certification and contract approvals in healthcare, finance, retail, logistics, manufacturing",
        "Reduces audit costs through digitized, mapped evidence",
        "Improves market access and competitive positioning",
        "Enhances client trust through demonstrated compliance expertise",
        "Streamlines certification maintenance and renewal processes",
        "Enables faster market entry in regulated industries",
        "Reduces compliance complexity through unified management systems",
        "Improves operational efficiency through standardized procedures",
        "Strengthens vendor relationships through verified capabilities",
        "Supports business growth with scalable certification management"
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
      icon: earIcon,
      intro: "Vardaan's GRC automates EAR compliance—enabling global trade while safeguarding against U.S. regulatory violations for dual-use exports.",
      description: "Automates screening, licensing, classification, export documentation, and restricted-party monitoring for covered technology and products.",
      benefits: [
        "Required for U.S. exporters, manufacturers, and service providers handling sensitive or dual-use technology",
        "Prevents penalties ($50,000+ per civil violation, criminal liability) and export bans",
        "Accelerates international sales with verified compliance procedures",
        "Supports business continuity by minimizing supply chain interruptions",
        "Reduces export processing time through automated license management",
        "Enhances supply chain security through comprehensive screening",
        "Improves regulatory standing with comprehensive compliance documentation",
        "Enables faster international expansion with pre-verified processes",
        "Strengthens client confidence through demonstrated export control capabilities",
        "Supports global business operations while maintaining regulatory compliance"
      ],
      roi: [
        "50% reduction in export license approval time",
        "60% less false party screening workload",
        "100% audit traceability for all export events"
      ],
      summary: "Vardaan's GRC makes EAR compliance a seamless part of global business—protecting companies while enabling safe, lawful expansion."
    }
  ];

  // Handle initial mount and URL parameter changes
  useEffect(() => {
    if (frameworkId) {
      const framework = frameworksData.find(f => f.id === frameworkId);
      if (framework) {
        console.log('Framework found:', frameworkId); // Debug log
        // Update state immediately to prevent race conditions
        setSelectedFramework(frameworkId);
        isHashNavigating.current = true;
        
        // Function to scroll to the framework
        const scrollToFramework = () => {
          const element = document.getElementById(frameworkId);
          const contentArea = contentAreaRef.current;
          
          console.log('Attempting to scroll to:', frameworkId, 'Element found:', !!element, 'Content area found:', !!contentArea); // Debug log
          
          if (element && contentArea) {
            // Scroll the sidebar to show the selected framework first
            scrollSidebarToFramework(frameworkId);
            
            // Wait a bit for sidebar scroll to complete
            setTimeout(() => {
              // Scroll the content area to the element
              try {
                const elementTop = element.offsetTop;
                console.log('Scrolling to element at position:', elementTop); // Debug log
                
                contentArea.scrollTo({
                  top: Math.max(0, elementTop - 20),
                  behavior: 'smooth'
                });
                
                // Also use scrollIntoView for additional assurance
                element.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start',
                  inline: 'nearest'
                });
                
                console.log('Scroll completed for:', frameworkId); // Debug log
              } catch (e) {
                console.error('Scroll error:', e); // Debug log
                // Fallback if scrollTo fails
                contentArea.scrollTop = Math.max(0, element.offsetTop - 20);
              }
              
              // Reset the flag after scrolling animation is complete
              setTimeout(() => {
                isHashNavigating.current = false;
                console.log('Hash navigation completed for:', frameworkId); // Debug log
              }, 1500);
            }, 200);
          } else {
            console.log('Element or content area not found for:', frameworkId); // Debug log
            // Element not found, reset flag after a shorter delay
            setTimeout(() => {
              isHashNavigating.current = false;
            }, 500);
          }
        };
        
        // Wait for DOM to be ready and try multiple times if needed
        const tryScroll = (attempts = 0) => {
          if (attempts > 30) {
            console.log('Max attempts reached for scrolling to:', frameworkId); // Debug log
            isHashNavigating.current = false;
            return;
          }
          
          const element = document.getElementById(frameworkId);
          if (element && contentAreaRef.current) {
            console.log('DOM ready, scrolling to:', frameworkId, 'Attempt:', attempts); // Debug log
            scrollToFramework();
          } else {
            console.log('DOM not ready, retrying for:', frameworkId, 'Attempt:', attempts); // Debug log
            setTimeout(() => tryScroll(attempts + 1), 300);
          }
        };
        
        // Start the scroll attempt with appropriate delay
        setTimeout(() => tryScroll(), 500);
      } else {
        console.log('Framework not found:', frameworkId); // Debug log
        // If frameworkId doesn't match any framework, redirect to iso27001
        navigate('/framework/iso27001', { replace: true });
      }
    } else {
      console.log('No frameworkId in URL, redirecting to default'); // Debug log
      // No frameworkId in URL, redirect to default
      navigate('/framework/iso27001', { replace: true });
    }
  }, [frameworkId, navigate]);


  // Scroll detection and sidebar synchronization
  useEffect(() => {
    const contentArea = contentAreaRef.current;
    if (!contentArea) {
      console.log('Content area not found');
      return;
    }

    console.log('Setting up scroll listener');

    const handleScroll = () => {
      // Don't interfere with hash navigation
      if (isHashNavigating.current) {
        console.log('Hash navigating, skipping scroll detection');
        return;
      }

      // Find which framework section is currently at the top of the viewport
      let currentFramework = null;
      let minDistance = Infinity;

      frameworksData.forEach((framework) => {
        const element = document.getElementById(framework.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const contentRect = contentArea.getBoundingClientRect();
          
          // Calculate distance from top of content area
          const distanceFromTop = Math.abs(rect.top - contentRect.top);
          
          // Find the framework closest to the top (within reasonable range)
          if (distanceFromTop < minDistance && rect.top <= contentRect.top + 150) {
            minDistance = distanceFromTop;
            currentFramework = framework.id;
          }
        }
      });

      // Update selected framework and scroll sidebar
      if (currentFramework && currentFramework !== selectedFramework) {
        console.log('Scrolling to framework:', currentFramework); // Debug log
        setSelectedFramework(currentFramework);
        // Use setTimeout to ensure the state update has been processed
        setTimeout(() => {
          scrollSidebarToFramework(currentFramework);
        }, 100);
      }
    };

    // Add scroll event listener with throttling
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    contentArea.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      contentArea.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [frameworksData, selectedFramework]);

  const scrollSidebarToFramework = (frameworkId) => {
    const sidebar = sidebarRef.current;
    if (!sidebar) {
      console.log('Sidebar not found');
      return;
    }

    const frameworkItem = sidebar.querySelector(`[data-framework-id="${frameworkId}"]`);
    if (!frameworkItem) {
      console.log('Framework item not found:', frameworkId);
      return;
    }

    console.log('Scrolling sidebar to:', frameworkId);
    
    // Always scroll to the framework item
    frameworkItem.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  };

  const handleFrameworkSelect = (frameworkId) => {
    // Update URL with the new route structure
    navigate(`/framework/${frameworkId}`);
  };

  const handleBackToMain = () => {
    navigate('/solutions');
  };

  return (
    <div className="grc-framework-page">
      {/* Breadcrumb Navigation */}
      <div className="grc-breadcrumb">
        <div className="grc-breadcrumb-content">
          <button className="grc-breadcrumb-back" onClick={handleBackToMain}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Solutions
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grc-framework-main-content">
        {/* Left Sidebar - Frameworks List */}
        <div className="grc-framework-sidebar" ref={sidebarRef}>
          <div className="grc-sidebar-header">
            <h2 className="grc-sidebar-title">Compliance Frameworks</h2>
            <p className="grc-sidebar-subtitle">Select a framework to view details</p>
          </div>
          
          <div className="grc-frameworks-list">
            {frameworksData.map((framework) => (
              <div 
                key={framework.id} 
                className={`grc-framework-item ${selectedFramework === framework.id ? 'grc-active' : ''}`}
                onClick={() => handleFrameworkSelect(framework.id)}
                data-framework-id={framework.id}
              >
                <div className="grc-framework-item-icon">
                  <img src={framework.icon} alt={framework.name} className="grc-framework-icon-img" />
                </div>
                <span className="grc-framework-item-name">{framework.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="grc-framework-content-area" ref={contentAreaRef}>
          {frameworksData.map((framework) => (
            <div key={framework.id} id={framework.id} className="grc-framework-detail-section">
              {/* Framework Header */}
              <div className="grc-framework-detail-header">
                <div className="grc-framework-detail-tag">
                  <span className="grc-framework-detail-icon">
                    <img src={framework.icon} alt={framework.name} className="grc-framework-detail-icon-img" />
                  </span>
                  <span className="grc-framework-detail-tag-text">{framework.tag}</span>
                </div>
                <h2 className="grc-framework-detail-title">{framework.name}</h2>
              </div>

              {/* Framework Intro */}
              <div className="grc-framework-detail-intro">
                <p>{framework.intro}</p>
              </div>

              {/* Framework Description */}
              <div className="grc-framework-detail-description">
                <p>{framework.description}</p>
              </div>

              {/* Benefits Section */}
              <div className="grc-framework-detail-benefits">
                <h3 className="grc-benefits-title">
                  <span className="grc-benefits-icon">✓</span>
                  Your Benefits
                </h3>
                <ul className="grc-benefits-list">
                  {framework.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>

              {/* ROI Section */}
              <div className="grc-framework-detail-roi">
                <h3 className="grc-roi-title">
                  <span className="grc-roi-icon">📈</span>
                  ROI You'll See
                </h3>
                <ul className="grc-roi-list">
                  {framework.roi.map((roiItem, idx) => (
                    <li key={idx}>{roiItem}</li>
                  ))}
                </ul>
              </div>

              {/* Summary */}
              <div className="grc-framework-detail-summary">
                <p>{framework.summary}</p>
              </div>

              {/* Divider between frameworks */}
              {framework.id !== frameworksData[frameworksData.length - 1].id && (
                <div className="grc-framework-divider"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Framework;
