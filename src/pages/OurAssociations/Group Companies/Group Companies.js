import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./Group Companies.css";
import Footer from '../../../components/Footer/Footer';

// Import company logos (local fallbacks)
import vardaanGlobalLogo from "../../../assets/Images/GroupCompanies/vardaan-global-logo.svg";
import infodriveLogo from "../../../assets/Images/GroupCompanies/infodrive-logo.svg";
import exalioTechLogo from "../../../assets/Images/GroupCompanies/exalio-tech-logo.svg";
import vardaanUkLogo from "../../../assets/Images/GroupCompanies/vardaan-uk-logo.svg";
import vardaanCyberLogo from "../../../assets/Images/GroupCompanies/vardaan-cyber-logo.svg";
import vardaanAndsLogo from "../../../assets/Images/GroupCompanies/vardaan-ands-logo.svg";
import placeholderLogo from "../../../assets/Images/GroupCompanies/placeholder-logo.svg";

const GroupCompanies = () => {
  // Logo mapping: company ID -> local logo
  const logoMapping = {
    1: vardaanGlobalLogo,
    2: infodriveLogo,
    3: exalioTechLogo,
    4: vardaanUkLogo,
    5: vardaanCyberLogo,
    6: vardaanAndsLogo
  };

  // Mock data for group companies
  const groupCompanies = [
    {
      id: 1,
      name: "Vardaan Global",
      website: "https://vardaanglobal.com/",
      description: "A multi-disciplinary enterprise delivering strategic insight, operational resilience, and digital integrity across businesses. Having presence in multiple countries, like the UK, the USA, UAE, India and Malaysia. Started with Vardaan Cybersecurity to safeguard critical infrastructure with advanced defence strategies, expanded into IT, ERP, Data sciences as well as AI/ML to help build state of the art solutions to the organisations.",
      logo: vardaanGlobalLogo,
      industry: "Technology Consulting",
      founded: "2010",
      employees: "500+",
      services: ["AI Consulting", "Cybersecurity", "Data Analytics", "Digital Transformation"],
      color: "#e3edfa"
    },
    {
      id: 2,
      name: "InfoDrive Analytics",
      website: "https://infodriveanalytics.com/",
      description: "An international organization serving customers across industries around the globe, offering a variety of IT services including ERP, that help them differentiate from their competition. Our practices span from Business Solutions to Technology Solutions, with our Strategy practice bringing pragmatic solutions that solve problems while enhancing competitive advantage through the right technology strategy.",
      logo: infodriveLogo,
      industry: "Data Analytics",
      founded: "2015",
      employees: "150+",
      services: ["Business Intelligence", "Predictive Analytics", "Data Visualization", "Machine Learning"],
      color: "#e3edfa"
    },
    {
      id: 3,
      name: "ExalioTech",
      website: "https://exaliotech.com/",
      description: "Pioneering the future of intelligent business by helping governments and businesses embrace intelligent systems that drive efficiency, transparency, and innovation at scale. As a next-gen technology partner, Exalio helps organizations unlock their potential through AI-driven transformation, data mastery, and scalable digital solutions that ensure long-term success and scalability.",
      logo: exalioTechLogo,
      industry: "Cloud Technology",
      founded: "2018",
      employees: "200+",
      services: ["Cloud Solutions", "Enterprise Software", "Digital Innovation", "Tech Consulting"],
      color: "#e3edfa"
    },
    {
      id: 4,
      name: "Vardaan Global UK",
      website: "https://vardaanglobal.uk/",
      description: "A leading cybersecurity and ERP solutions provider engaged in consulting on projects across global regions, operating from offices in the UK, Malaysia, and India. We offer a wide range of IT consulting services including implementation, support, and managed services to clients in banking, insurance, education, and other emerging sectors with experienced functional and techno-functional experts.",
      logo: vardaanUkLogo,
      industry: "Financial Technology",
      founded: "2017",
      employees: "100+",
      services: ["Regulatory Compliance", "FinTech Solutions", "Cross-border Services", "EU Market Entry"],
      color: "#e3edfa"
    },
    {
      id: 5,
      name: "Vardaan Cyber",
      website: "https://www.vardaan-cyber.com/",
      description: "Founded in 2020, Vardaan Sdn Bhd is a forward-thinking cybersecurity firm based in Malaysia, specializing in innovative cybersecurity solutions, artificial intelligence, machine learning, and data science consulting. With a focus on safeguarding businesses from today's most complex cyber threats, we combine technical expertise with a client-centric approach, building solutions to address ever-changing cybersecurity challenges.",
      logo: vardaanCyberLogo,
      industry: "Cybersecurity",
      founded: "2019",
      employees: "80+",
      services: ["Threat Detection", "Incident Response", "Security Audits", "Compliance Management"],
      color: "#e3edfa"
    },
    {
      id: 6,
      name: "Vardaan Data Sciences",
      website: "https://vardaands.com/",
      description: "Through a combination of in-house expertise and a robust partner ecosystem, we are dedicated to empowering organizations to enhance efficiency, build resilience, and stay ahead in a rapidly changing landscape. Our portfolio includes AI-powered tools and intelligent platforms ranging from RiskaVaire intelligence platforms to smart logistics systems, audit management suites, camera vision AI, digital workers, and robotic automation solutions.",
      logo: vardaanAndsLogo,
      industry: "Business Consulting",
      founded: "2012",
      employees: "120+",
      services: ["Strategic Planning", "Business Consulting", "Organizational Development", "Growth Strategy"],
      color: "#e3edfa"
    }
  ];

  const handleCompanyClick = (website) => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  // Helper function to get logo URL
  const getLogoUrl = (companyId) => {
    return logoMapping[companyId] || placeholderLogo;
  };

  return (
    <div className="group-companies-main-container">
      {/* Hero Section */}
      <section className="group-companies-hero">
        <div className="group-companies-hero-content">
          <h1 className="group-companies-hero-title">
            VARDAAN GLOBAL <span className="hero-highlight">GROUP</span>
          </h1>
          <p className="group-companies-hero-subtitle">
            A comprehensive ecosystem of specialized companies working together to deliver 
            cutting-edge solutions across technology, analytics, cybersecurity, and business consulting.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="group-companies-overview">
        <div className="group-companies-container">
          <div className="overview-content">
            <p className="overview-description">
              A carefully curated portfolio of specialized companies delivering innovative solutions across technology, consulting, and digital transformation domains.
            </p>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="group-companies-grid-section">
        <div className="group-companies-container">
          <div className="companies-grid">
            {groupCompanies.map((company) => (
              <div key={company.id} className="company-card">
                {/* Logo Section */}
                <div className="company-logo-section">
                  <img 
                    src={getLogoUrl(company.id)} 
                    alt={`${company.name} logo`}
                    className="company-logo"
                  />
                </div>
                
                {/* Company Info Section */}
                <div className="company-info-section">
                  <h3 className="company-name">{company.name}</h3>
                  <p className="company-description">{company.description}</p>
                  <button className="learn-more-btn" onClick={() => handleCompanyClick(company.website)}>
                    Explore
                    <FaExternalLinkAlt className="btn-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="group-companies-cta">
        <div className="group-companies-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Work with Our Group?</h2>
            <p className="cta-description">
              Whether you need specialized expertise from one of our companies or a comprehensive 
              solution spanning multiple disciplines, our group is ready to help you achieve your goals.
            </p>
            <div className="cta-buttons">
              <button 
                className="cta-primary-btn"
                onClick={() => window.open('https://vardaanglobal.com/', '_blank')}
              >
                Explore Vardaan Global
              </button>
              <button 
                className="cta-secondary-btn"
                onClick={() => window.open('/contact', '_self')}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-spacing"></div>
      <Footer />
    </div>
  );
};

export default GroupCompanies;
