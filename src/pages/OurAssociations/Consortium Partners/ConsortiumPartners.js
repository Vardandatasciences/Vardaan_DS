import React, { useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./ConsortiumPartners.css";
import Footer from "../../../components/Footer/Footer";

// Import partner logos
import recodeLogo from "../../../assets/Images/ConsortiumPartners/recodelogo.png";
import kameraLogo from "../../../assets/Images/ConsortiumPartners/kamerailogo.png";
import abmLogo from "../../../assets/Images/ConsortiumPartners/abmlogo.png";
import inteliwavesLogo from "../../../assets/Images/ConsortiumPartners/inteliwaveslogo1.webp";
import posidexLogo from "../../../assets/Images/ConsortiumPartners/posidexlogo.jpg";
import aiplanetLogo from "../../../assets/Images/ConsortiumPartners/aiplanetlogo.svg";

const ConsortiumPartners = () => {
  // Partner companies data
  const partnerCompanies = [
    {
      id: 1,
      name: "AI Planet",
      website: "https://aiplanet.com/",
      description: "Accelerating AI innovation with a platform trusted by 300k+ global community and leading organizations. Delivering 20x faster time to market, up to 30x infrastructure cost savings, and 10x productivity gains for enterprises worldwide. Enabling businesses to build, deploy, and scale AI solutions with cutting-edge technology and comprehensive support.",
      logo: aiplanetLogo
    },
    {
      id: 2,
      name: "Recode Solutions",
      website: "https://www.recodesolutions.com/",
      description: "Empowering businesses with cutting-edge AI, automation, and digital workforce solutions to drive digital transformation and enable enterprises to work smarter, faster, and more efficiently through intelligent process automation and seamless system integration.",
      logo: recodeLogo
    },
    {
      id: 3,
      name: "KamerAI",
      website: "https://kamerai.ai/",
      description: "A Computer Vision Based Industrial Automation & Video Analytics Platform transforming workplace safety and efficiency through advanced AI technology and OSHA compliance. Enhancing quality and throughput in manufacturing and warehouses with Kaizen and cutting-edge technology.",
      logo: kameraLogo
    },
    {
      id: 4,
      name: "ABM Knowledgeware Ltd",
      website: "https://abmindia.com/",
      description: "With 25 years of delivering Digital Government services and Smart City solutions across India, ABM specializes in Smart Water Management and citizen services for over 1,500 Urban Local Bodies, delivering 40 million citizen services annually with presence in 30 Smart Cities.",
      logo: abmLogo
    },
    {
      id: 5,
      name: "Inteliwaves Technologies",
      website: "https://inteliwaves.com/",
      description: "SAP Gold Partner in India providing comprehensive technology consulting and advisory services that drive innovation, business transformation, and digital excellence. Combining latest technology with deep industry expertise to help businesses navigate digital transformation seamlessly.",
      logo: inteliwavesLogo
    },
    {
      id: 6,
      name: "Posidex Technologies",
      website: "https://www.posidex.com/",
      description: "Providing advanced identity analytics and real-time decisioning solutions to enhance accuracy, security, and compliance. Trusted by major banks and government agencies, Posidex delivers high-speed data processing and intelligent automation at scale.",
      logo: posidexLogo
    }
  ];

  // Preload all partner logos immediately for instant display
  useEffect(() => {
    const imagePromises = partnerCompanies.map((partner) => {
      if (partner.logo) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = partner.logo;
          if (img.decode) {
            img.decode().catch(() => {});
          }
        });
      }
      return Promise.resolve();
    });

    Promise.allSettled(imagePromises).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePartnerClick = (website) => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="consortium-partners-main-container">
      {/* Hero Section */}
      <section className="consortium-partners-hero">
        <div className="consortium-partners-hero-content">
          <h1 className="consortium-partners-hero-title">
            CONSORTIUM <span className="hero-highlight">PARTNERS</span>
          </h1>
          <p className="consortium-partners-hero-subtitle">
            This collaborative ecosystem empowers us to focus our shared efforts on client success, ensuring that innovation is always aligned with meaningful impact. At Vardaan, our philosophy is simple — our clients come first, and success is a shared journey.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="consortium-partners-overview">
        <div className="consortium-partners-container">
          <div className="overview-content">
            <p className="overview-description">
            At Vardaan Group of Companies, we believe in playing strength to strength, uniting the expertise of our entities and consortium partners to create meaningful impact. Together, we craft state-of-the-art, future-ready solutions that address real business challenges and deliver measurable outcomes. Our collaborative ecosystem is built around customer enablement, where innovation transforms into tangible value and long-term growth. Guided by our enduring principle — customer first, and together we succeed — we channel our collective strengths to shape a smarter, more connected future.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="partners-container">
          <div className="partners-grid">
            {partnerCompanies.slice(0, 3).map((partner) => (
              <div key={partner.id} className={`partner-card partner-card-${partner.id}`}>
                {/* Logo Section */}
                <div className="partner-logo-section">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="partner-logo"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
                
                {/* Partner Info Section */}
                <div className="partner-info-section">
                  <h3 className="partner-name">{partner.name}</h3>
                  <p className="partner-description">{partner.description}</p>
                  <button className="learn-more-btn" onClick={() => handlePartnerClick(partner.website)}>
                    Explore
                    <FaExternalLinkAlt className="btn-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Centered container for last 3 cards */}
          <div className="partners-grid-centered">
            {partnerCompanies.slice(3).map((partner) => (
              <div key={partner.id} className={`partner-card partner-card-${partner.id}`}>
                {/* Logo Section */}
                <div className="partner-logo-section">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="partner-logo"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
                
                {/* Partner Info Section */}
                <div className="partner-info-section">
                  <h3 className="partner-name">{partner.name}</h3>
                  <p className="partner-description">{partner.description}</p>
                  <button className="learn-more-btn" onClick={() => handlePartnerClick(partner.website)}>
                    Explore
                    <FaExternalLinkAlt className="btn-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="footer-spacing"></div>
      <Footer />
    </div>
  );
};

export default ConsortiumPartners;

