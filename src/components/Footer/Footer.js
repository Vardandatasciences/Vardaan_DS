import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import VLogo from '../../assets/Images/Home/V Logo.png';
import FooterVideo from '../../assets/videos/Footer Globe.mp4';
import { config } from '../../utils/config';

 
const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
 
  const services = [
    { name: 'Data Strategy & Consulting', path: '/services/data-strategy' },
    { name: 'Advanced Analytics & Machine Learning', path: '/services/advanced-analytics' },
    { name: 'Data Engineering & Integration', path: '/services/data-engineering' },
    { name: 'Business Intelligence & Visualization', path: '/services/business-intelligence' }
  ];
 
  const products = [
    { name: 'RiskaVaire', path: '/riskavaire' },
    { name: 'ProSync', path: '/prosync' },
    { name: 'ViCTAA', path: '/victaa' },
    { name: 'SmartLogistics', path: '/smartlogistics' }
  ];
 
  const informationLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Cookie Policy & Consent Management', path: '/cookie-policy' },
    { name: 'Terms of Service / Use', path: '/terms-of-service' },
    { name: 'Data Retention & Deletion Policy', path: '/data-retention' },
    { name: 'International Data Transfers Notice', path: '/international-transfers' }
  ];
 
  const handleInformationLinkClick = (path) => {
    navigate(path);
  };
 
  const handleServiceClick = (path) => {
    navigate(path);
  };
 
  const handleProductClick = (path) => {
    navigate(path);
  };
 
  const handlePrivacyPolicyClick = (e) => {
    e.preventDefault();
    navigate('/privacy-policy');
  };
 
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCheckboxChange = (e) => setAccepted(e.target.checked);
 
  const handleSend = async () => {
    setMessage('');
    if (!email) {
      setModalMessage('Please enter your email.');
      setShowModal(true);
      return;
    }
    if (!accepted) {
      setModalMessage('Please accept the Privacy Policy.');
      setShowModal(true);
      return;
    }
    try {
              const API_BASE_URL = config.API_URL;
      const response = await fetch(`${API_BASE_URL}/subscribe-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setModalMessage('Thank you for subscribing! A confirmation email has been sent to your inbox.');
        setShowModal(true);
        setEmail('');
        setAccepted(false);
      } else {
        setModalMessage(data.message || 'Subscription failed.');
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('An error occurred. Please try again.');
      setShowModal(true);
    }
  };
 
  return (
    <footer className="vardaan-footer">
      <video className="vardaan-footer-video" autoPlay loop muted>
        <source src={FooterVideo} type="video/mp4" />
      </video>
      <div className="vardaan-footer-overlay"></div>
     
      <div className="vardaan-footer-content">
        <div className="vardaan-footer-column vardaan-contact-column">
          <img src={VLogo} alt="Vardaan Logo" className="vardaan-footer-logo" />
          <div className="vardaan-contact-info">
            <div className="vardaan-contact-row">
              <span className="vardaan-contact-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#3b82f6" strokeWidth="2"/>
                  <path d="M3 7l9 6 9-6" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="vardaan-contact-text vardaan-contact-text-email">info@vardaanglobal.com</span>
            </div>
            <div className="vardaan-contact-row">
              <span className="vardaan-contact-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.09 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="vardaan-contact-text vardaan-contact-text-phone">+91 40-35171118, +91 40-35171119</span>
            </div>
            <div className="vardaan-contact-row">
              <span className="vardaan-contact-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21s-6-5.686-6-10A6 6 0 0 1 18 11c0 4.314-6 10-6 10z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="11" r="2.5" stroke="#3b82f6" strokeWidth="2"/>
                </svg>
              </span>
              <span className="vardaan-contact-text vardaan-contact-text-address">
                Aurum, 1st Floor, Plot No 57, Jayabheri Enclave,<br/>
                Gachibowli Hyderabad-500032 INDIA
              </span>
            </div>
          </div>
          <div className="vardaan-social-icons">
            <a href="https://www.facebook.com/profile.php?id=61554735873727" target="_blank" rel="noopener noreferrer" className="vardaan-footer-social-icon vardaan-facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/vardaan-data-sciences-pvt-ltd/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="vardaan-footer-social-icon vardaan-linkedin">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/vardaan_datasciences/" target="_blank" rel="noopener noreferrer" className="vardaan-footer-social-icon vardaan-instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://twitter.com/Vardaan_DS" target="_blank" rel="noopener noreferrer" className="vardaan-footer-social-icon vardaan-twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
 
        <div className="vardaan-footer-column vardaan-services-column">
          <h4>OUR SERVICES</h4>
          <ul>
            {services.map((service, index) => (
              <li key={index} onClick={() => handleServiceClick(service.path)} style={{ cursor: 'pointer' }}>
                {service.name}
              </li>
            ))}
          </ul>
        </div>
 
        <div className="vardaan-footer-column vardaan-products-column">
          <h4>OUR PRODUCTS</h4>
          <ul>
            {products.map((product, index) => (
              <li key={index} onClick={() => handleProductClick(product.path)} style={{ cursor: 'pointer' }}>
                {product.name}
              </li>
            ))}
          </ul>
        </div>
 
        <div className="vardaan-footer-column vardaan-information-column">
          <h4 className="vardaan-information-title">INFORMATION</h4>
          <ul className="vardaan-information-list">
            {informationLinks.map((link, index) => (
              <li key={index} onClick={() => handleInformationLinkClick(link.path)} style={{ cursor: 'pointer' }}>
                {link.name}
              </li>
            ))}
          </ul>
        </div>
 
        {/* <div className="vardaan-footer-column vardaan-stay-connected-column">
          <h4>STAY CONNECTED</h4>
          <div className="vardaan-email-form">
            <div className="vardaan-email-input-container">
              <input
                type="email"
                placeholder="Email Address"
                className="vardaan-email-input with-button"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button
                type="button"
                className="vardaan-send-button"
                onClick={handleSend}
                disabled={!email || !accepted}
              >
                SEND
              </button>
            </div>
            <div className="vardaan-privacy-checkbox-container">
              <label className="vardaan-privacy-checkbox-label">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={handleCheckboxChange}
                  className="vardaan-privacy-checkbox"
                />
                <span className="vardaan-privacy-checkmark"></span>
                <span className="vardaan-privacy-text">
                  I have read and accepted the{' '}
                  <span
                    className="vardaan-privacy-link"
                    onClick={handlePrivacyPolicyClick}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Privacy Policy
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div> */}
      </div>
 
      <div className="vardaan-footer-bottom">
        <p>&copy; {new Date().getFullYear()} Vardaan Data Sciences. All Rights Reserved.</p>
      </div>
 
      {/* Modal Popup - inside the footer for valid JSX */}
      {showModal && (
        <div className="vardaan-modal-overlay">
          <div className="vardaan-modal">
            <p className="vardaan-modal-message">{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

    </footer>
  );
};
 
export default Footer;
 