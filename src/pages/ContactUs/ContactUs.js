import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactUs.css';
import contactVideo from '../../assets/videos/Contact us.mp4';
import Footer from '../../components/Footer/Footer';
import { config } from '../../utils/config';
 
const ContactUs = () => {
  const navigate = useNavigate();
 
  // API base URL - using centralized config for backend URL
  const API_BASE_URL = config.API_URL;
 
  useEffect(() => {
    console.log('ContactUs component mounted!');
  }, []);
 
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    otherSubject: '',
    message: ''
  });
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [modalType, setModalType] = useState('success'); // 'success' | 'error' | 'loading'
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
 
  const handlePrivacyPolicyClick = (e) => {
    e.preventDefault();
    navigate('/privacy-policy');
  };
 
  const handleCookiePolicyClick = (e) => {
    e.preventDefault();
    navigate('/cookie-policy');
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setModalType('loading');
    setModalMessage('Sending your message...');
    setShowModal(true); // <-- THIS SHOWS THE MODAL IMMEDIATELY
 
    try {
      // Validate form data
      if (!formData.fullname.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields');
      }
 
      if (!acceptTerms) {
        throw new Error('Please accept the Privacy Policy and Cookie Policy');
      }
 
      // Submit to backend
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        let errorMessage = 'Failed to submit form';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `Server error: ${response.status} ${response.statusText}`;
        } catch (parseError) {
          // If JSON parsing fails, use status text
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();

      // Success
      setModalType('success');
      setModalMessage('Thank you for contacting us! We\'ve received your message. We\'ll get back to you within 24-48 hours.');
      setFormData({
        fullname: '',
        phone: '',
        email: '',
        subject: '',
        otherSubject: '',
        message: ''
      });
      setAcceptTerms(false);
 
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsError(true);
      setModalType('error');
      
      // Provide more helpful error messages
      let errorMessage = error.message || 'An error occurred while submitting the form. Please try again.';
      
      if (error.message && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
      } else if (error.message && error.message.includes('CORS')) {
        errorMessage = 'Connection blocked. Please contact the administrator.';
      } else if (error.message && error.message.includes('500')) {
        errorMessage = 'Server error occurred. Please try again later or contact support.';
      }
      
      setModalMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const closeModal = () => {
    if (modalType === 'loading') return; // Prevent closing while loading
    setShowModal(false);
    setModalMessage('');
    setIsError(false);
    setModalType('success');
  };
 
  // Add a simple always-visible popup component
  const SimplePopup = ({ open, type, message, onClose, loading }) => {
    if (!open) return null;
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          minWidth: 320,
          maxWidth: 400,
          padding: 32,
          boxShadow: '0 8px 40px rgba(44,62,80,0.18)',
          textAlign: 'center',
          position: 'relative',
        }}>
          <div style={{
            fontSize: 22,
            fontWeight: 600,
            color: type === 'error' ? '#e74c3c' : (type === 'loading' ? '#3570f7' : '#3570f7'),
            marginBottom: 16,
          }}>
            {type === 'loading' ? 'Sending...' : type === 'error' ? 'Error' : 'Form Submitted Successfully!'}
          </div>
          <div style={{ fontSize: 16, color: '#333', marginBottom: 24 }}>{message}</div>
          {loading && (
            <div style={{
              margin: '18px auto 0 auto',
              border: '4px solid #e3e8ee',
              borderTop: '4px solid #3570f7',
              borderRadius: '50%',
              width: 36,
              height: 36,
              animation: 'spin 1s linear infinite',
              display: 'inline-block',
            }} className="simple-popup-spinner" />
          )}
          {type !== 'loading' && (
            <button
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                minWidth: 100,
              }}
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  };
 
  return (
    <div className="contact-us-container">
      {/* Hero Section */}
      <div className="contact-hero">
        <video
          className="contact-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={contactVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          {/* <h1>Get In Touch</h1> */}
          {/* <p>Ready to transform your business with data-driven insights? Let's start a conversation.</p> */}
        </div>
      </div>
 
      <div className="contact-main">
        <div className="contact-content">
          {/* Contact Form Section */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullname">Full Name *</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    required
                    placeholder="Full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email address"
                  />
                </div>
              </div>
 
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
              </div>
 
              {formData.subject === 'others' && (
                <div className="form-group">
                  <label htmlFor="otherSubject">Please specify *</label>
                  <input
                    type="text"
                    id="otherSubject"
                    name="otherSubject"
                    value={formData.otherSubject}
                    onChange={handleInputChange}
                    required
                    placeholder="Please specify your subject"
                  />
                </div>
              )}
 
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>
 
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span>
                    I accept the <a href="/privacy-policy" onClick={handlePrivacyPolicyClick}>Privacy Policy</a> and <a href="/cookie-policy" onClick={handleCookiePolicyClick}>Cookie Policy</a> *
                  </span>
                </label>
              </div>
 
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting || !acceptTerms}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
 
          {/* Contact Information Section */}
          <div className="contact-info-section">
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-text">
                  <h4>Address</h4>
                  <p>Aurum, 1st Floor, Plot No 57,<br />Jayabheri Enclave, Gachibowli<br />Hyderabad-500032 INDIA</p>
                </div>
              </div>
 
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>info@vardaanglobal.com</p>
                </div>
              </div>
 
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-text">
                  <h4>Phone</h4>
                  <p>+91 4035171118</p>
                </div>
              </div>
 
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div className="contact-text">
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Success/Error Modal */}
      <SimplePopup
        open={showModal}
        type={modalType}
        message={modalMessage}
        loading={modalType === 'loading'}
        onClose={closeModal}
      />
      <Footer />
    </div>
  );
};
 
export default ContactUs;
 