import React, { useState, useEffect } from "react";
import "./VictaaPricing.css";
import Footer from "../../../components/Footer/Footer";
import { Lock, X, Check, Shield, ShieldCheck, ShieldAlert, ShieldPlus } from "lucide-react";
import { submitProductPricingInquiry, PRODUCT_CONFIGS, getLapsecPricingAmount } from "../../../services/productPricingService";
import { formatPrice } from "../../../services/currencyService";
import { getCurrencySymbol, formatPriceWithCurrency } from "../../../services/ipDetectionService";
import { useNavigate, Link } from 'react-router-dom';
import victaaLogo from '../../../assets/Images/Products/Lapsec/victaalogo.png';
import { config } from '../../../utils/config';
import { useGlobalContext } from '../../../context/GlobalContext';

const VictaaPricing = () => {
  const navigate = useNavigate();
  const { userLocation, pricingData, refreshLocationAndPricing } = useGlobalContext();
  
  const [selectedPlan, setSelectedPlan] = useState("1-year");
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    country: '',
    enquiry: '',
    consent: false // Add consent field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Log global context data for debugging
  useEffect(() => {
    console.log('🌍 Global context - User location:', userLocation);
    console.log('📊 Global context - Pricing data:', pricingData);
  }, [userLocation, pricingData]);

  // Helper function to get pricing data for a specific plan and duration
  const getPricingForPlan = (planName, durationType) => {
    if (!pricingData.victaa || !pricingData.victaa.plans) {
      console.log('❌ No pricing data available');
      return null;
    }
    
    const planKey = planName.toLowerCase().replace(/\s+/g, '-');
    const durationKey = durationType.toLowerCase().replace(/\s+/g, '-');
    
    console.log(`🔍 Looking for plan: ${planName} (key: ${planKey}), duration: ${durationType} (key: ${durationKey})`);
    console.log('Available plans:', Object.keys(pricingData.victaa.plans));
    
    const plan = pricingData.victaa.plans[planKey];
    if (!plan) {
      console.log(`❌ Plan not found: ${planKey}`);
      return null;
    }
    
    console.log('Available durations for this plan:', Object.keys(plan.pricing));
    
    if (!plan.pricing[durationKey]) {
      console.log(`❌ Duration not found: ${durationKey}`);
      return null;
    }
    
    console.log('✅ Found pricing:', plan.pricing[durationKey]);
    return plan.pricing[durationKey];
  };

  // Helper function to get plan info
  const getPlanInfo = (planName) => {
    if (!pricingData || !pricingData.plans) {
      return null;
    }
    
    const planKey = planName.toLowerCase().replace(/\s+/g, '-');
    return pricingData.plans[planKey];
  };

  // Helper function to format price display
  const formatPriceDisplay = (price, currency, currencyRate, discountPercentage) => {
    if (userLocation.loading || pricingData.loading) {
      return { formattedPrice: <span className="price-loading">Loading...</span>, discountText: '' };
    }
    
    if (!price || price === 0) {
      return { formattedPrice: <span className="price-loading">Not available</span>, discountText: '' };
    }
    
    let discountText = '';
    
    // Use the new formatPriceWithCurrency function from IP detection service
    const formattedPrice = formatPriceWithCurrency(price, currency);
    
    // Add discount text if available
    if (discountPercentage && discountPercentage > 0) {
      discountText = `Save ${discountPercentage}%`;
    }
    
    return { formattedPrice, discountText };
  };

  // Helper function to get the consistent currency for all plans
  const getConsistentCurrency = () => {
    if (!pricingData.victaa || !pricingData.victaa.plans) {
      return userLocation.currency || 'USD'; // Use global context currency
    }
    
    // Get the first available plan's currency to ensure consistency
    const firstPlan = Object.values(pricingData.victaa.plans)[0];
    if (firstPlan && firstPlan.pricing) {
      const firstPricing = Object.values(firstPlan.pricing)[0];
      return firstPricing ? firstPricing.currency : userLocation.currency || 'USD';
    }
    
    return userLocation.currency || 'USD';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmitMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Frontend validation
      const requiredFields = ['name', 'email', 'company', 'phone', 'country'];
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
      
      console.log('🔍 Form validation:');
      console.log('Required fields:', requiredFields);
      console.log('Missing fields:', missingFields);
      console.log('Form data validation:', {
        name: formData.name ? '✓' : '✗',
        email: formData.email ? '✓' : '✗',
        company: formData.company ? '✓' : '✗',
        phone: formData.phone ? '✓' : '✗',
        country: formData.country ? '✓' : '✗',
        consent: formData.consent ? '✓' : '✗'
      });
      
      if (missingFields.length > 0) {
        const fieldNames = missingFields.map(field => field.charAt(0).toUpperCase() + field.slice(1));
        setSubmitMessage(`Please fill in all required fields: ${fieldNames.join(', ')}`);
        return;
      }

      if (!formData.consent) {
        setSubmitMessage('Please accept the Privacy Policy and Cookie Policy to continue.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setSubmitMessage('Please enter a valid email address.');
        return;
      }

      // Get pricing amount for the selected plan (no conversion needed - use database currency)
      const pricing = getPricingForPlan('Shield Pro', selectedPlan);
      const pricingAmount = pricing ? pricing.price : 0;
      
      // Submit using the product pricing service with detected currency
      console.log('🚀 Starting form submission...');
      console.log('Form data:', formData);
      console.log('Product config:', PRODUCT_CONFIGS.LAPSEC);
      console.log('Pricing amount:', pricingAmount);
      console.log('Currency:', userLocation.currency);
      
      // Test backend connectivity first
      try {
        const testResponse = await fetch(`${config.API_URL}/api/health`);
        if (testResponse.ok) {
          console.log('✅ Backend server is accessible');
        } else {
          console.log('⚠️ Backend server responded with status:', testResponse.status);
        }
      } catch (error) {
        console.log('⚠️ Backend connectivity test failed:', error.message);
      }
      
      // Get the consistent currency from the first available pricing
      const consistentCurrency = getConsistentCurrency();
      
      const result = await submitProductPricingInquiry(
        formData,
        PRODUCT_CONFIGS.LAPSEC.code,
        PRODUCT_CONFIGS.LAPSEC.name,
        pricingAmount,
        consistentCurrency // Use consistent currency from database
      );

      console.log('📨 Form submission result:', result);

      if (result.success) {
        // Override any "Dummy" messages with our unique ViCTAA message
        const uniqueMessage = result.message && (
          result.message.includes('Dummy') || 
          result.message.includes('dummy') ||
          result.message.toLowerCase().includes('dummy')
        )
          ? `🎉 Your ViCTAA pricing inquiry has been successfully submitted! Our team will review your requirements and get back to you within 24 hours with a personalized quote.`
          : result.message;
        
        console.log('✅ Form submitted successfully!');
        console.log('📊 Database record ID:', result.record_id || 'Not provided');
        console.log('📧 Email notifications sent to admin and customer');
        
        setSubmitMessage(uniqueMessage);
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          employees: '',
          country: '',
          enquiry: '',
          consent: false
        });
      } else {
        console.log('❌ Form submission failed:', result.message);
        setSubmitMessage(result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      console.log('🔧 To debug form submission issues:');
      console.log('1. Open browser developer tools (F12)');
      console.log('2. Check the Console tab for detailed logs');
      console.log('3. Check the Network tab for API requests');
      setSubmitMessage('Failed to submit form. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const scrollToContactForm = () => {
    const contactSection = document.querySelector('.contact-form-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPricingCards = () => {
    const pricingSection = document.querySelector('.pricing-cards-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Manual refresh function for testing VPN changes
  const handleRefreshLocation = async () => {
    console.log('🔄 Manual location refresh requested...');
    
    try {
      await refreshLocationAndPricing();
      console.log('✅ Location and pricing refreshed successfully');
    } catch (error) {
      console.error('❌ Manual refresh failed:', error);
    }
  };

  const toggleFaq = (id) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      id: 'price-lock',
      question: 'What does "price locked for full term" mean?',
      answer: 'Your per-device rate remains unchanged throughout your entire contract period. If you sign a 3-year plan at $31/device/year, you\'ll pay exactly $31/device/year for all three years, regardless of any future price adjustments to our standard rates.'
    },
    {
      id: 'billing-multi-year',
      question: 'How does billing work for multi-year contracts?',
      answer: 'You\'re billed annually throughout your contract term. For a 3-year plan, you\'ll receive three separate annual invoices, each at your locked-in rate.'
    },
    {
      id: 'elastic-plan',
      question: 'What is ViCTAA Elastic Plan and How does it work?',
      answer: 'The ViCTAA Elastic Plan is designed for organizations that cannot predict their exact device count for an entire year and need deployment flexibility. You commit to a base number of annual licenses (typically 80% of your expected workforce) and receive an automatic 10% buffer at no additional cost. For example, if you purchase 100 base licenses, you can use up to 110 devices without any extra charges. Any usage beyond the 110-device threshold is billed monthly at standard rates. This model is ideal for businesses with dynamic workforce sizes, seasonal hiring, or rapid growth phases.'
    },
    {
      id: 'buffer-billing',
      question: 'How is billing handled for devices beyond my buffer allocation?',
      answer: 'When you exceed your included buffer (base licenses + 10%), only the excess devices are charged monthly at your contracted per-device rate. For example, if you have 100 base licenses with a 10% buffer (110 total capacity) and use 115 devices, you\'ll be charged monthly for just the 5 excess devices. The system calculates average usage on the last day of each month, adds charges to your next invoice, and provides a 7-day credit period for payment. Your admin dashboard shows real-time usage tracking so you can monitor approaching buffer limits and projected overage costs.'
    },
    {
      id: 'license-adjustment',
      question: 'Can I adjust my base license allocation during the contract term?',
      answer: 'Yes, you can adjust your base license allocation during quarterly true-up periods. If your organization experiences sustained growth and you\'re consistently paying overage charges, you can increase your base allocation to reduce monthly overage costs. For instance, if you started with 100 base licenses but consistently use 120 devices, you can upgrade to 120 base licenses (with a new 132-device buffer threshold).'
    }
  ];

  return (
    <div className="victaa-pricing-container">
              <img src={victaaLogo} alt="ViCTAA Logo" className="victaa-logo" />
      
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="pricing-hero-content">
          <h1 className="pricing-main-title">Pricing built for businesses of all sizes</h1>
          <p className="pricing-subtitle">
            Endpoint security that scales with your organization. Choose the plan that fits your business needs
            and growth trajectory.
          </p>
        </div>
      </section>

      {/* Launch Special Banner */}
      <section className="launch-special-banner">
        <div className="banner-content">
          <div className="banner-title-container">
            <span className="banner-icon">⚡</span>
            <h2 className="banner-title">ViCTAA Launch Special – Limited Time Only!</h2>
          </div>
          <p className="banner-text">Additional 30% discount on all tiers. Ends September 30</p>
          <div className="banner-buttons">
            <button className="view-pricing-btn" onClick={scrollToPricingCards}>View Pricing</button>
            <button className="book-demo-btn" onClick={scrollToContactForm}>Book Demo</button>
          </div>
        </div>
      </section>



      {/* Pricing Tabs */}
      <section className="pricing-tabs-section">
        <div className="pricing-tabs">
          <button 
            className={`tab-btn ${selectedPlan === "monthly" ? "active" : ""}`}
            onClick={() => setSelectedPlan("monthly")}
          >
            Monthly
          </button>
          <button 
            className={`tab-btn ${selectedPlan === "1-year" ? "active" : ""}`}
            onClick={() => setSelectedPlan("1-year")}
          >
            1-Year (Save 17%)
          </button>
          <button 
            className={`tab-btn ${selectedPlan === "2-year" ? "active" : ""}`}
            onClick={() => setSelectedPlan("2-year")}
          >
            2-Year (Save 25%) <Lock size={16} />
          </button>
          <button 
            className={`tab-btn ${selectedPlan === "3-year" ? "active" : ""}`}
            onClick={() => setSelectedPlan("3-year")}
          >
            3-Year (Save 35%) <Lock size={16} />
          </button>

        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards-section">
        {userLocation.loading || pricingData.loading ? (
          <div className="pricing-loading">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        ) : pricingData.error ? (
          <div className="pricing-error">
            <p>Error loading pricing data: {pricingData.error}</p>
          </div>
                ) : (
          <>
            <div className="currency-indicator">
              <p>All prices shown in {userLocation.currency === 'INR' ? 'Indian Rupees (₹)' : 'US Dollars ($)'}</p>
              <p className="location-info">
                📍 Detected location: {userLocation.country === 'IN' ? 'India' : 'International'} 
                <span className="detection-details">
                  (via {userLocation.source})
                  {userLocation.ip && ` • IP: ${userLocation.ip}`}
                </span>
              </p>
              <button 
                className="refresh-location-btn" 
                onClick={handleRefreshLocation}
                disabled={userLocation.loading}
              >
                {userLocation.loading ? '🔄 Refreshing...' : '🔄 Refresh Location'}
              </button>
            </div>
            <div className="pricing-container">
              {/* Shield Lite */}
              <div className="pricing-card">
              <div className="card-header">
                <div className="plan-name-container">
                  <Shield size={20} className="plan-icon" />
                  <h3 className="plan-name">Shield Lite</h3>
                </div>
                <p className="device-count">
                  {getPlanInfo('Shield Lite')?.deviceRange || '10-100 devices'}
                </p>
                <div className="price-section">
                  <span className="price">
                    {(() => {
                      const pricing = getPricingForPlan('Shield Lite', selectedPlan);
                      if (!pricing) {
                        return <span className="price-loading">Not available</span>;
                      }
                      
                      const { formattedPrice, discountText } = formatPriceDisplay(
                        pricing.price, 
                        pricing.currency, // Use currency from database
                        1, // No conversion needed
                        pricing.discountPercentage
                      );
                      
                      return formattedPrice;
                    })()}
                  </span>
                  <span className="price-period">
                    {selectedPlan === "monthly" ? "per device/month" : "per device/year"}
                  </span>
                  <span className="discount">
                    {(() => {
                      const pricing = getPricingForPlan('Shield Lite', selectedPlan);
                      if (!pricing) return '';
                      
                      const { discountText } = formatPriceDisplay(
                        pricing.price, 
                        pricing.currency, // Use currency from database
                        1, // No conversion needed
                        pricing.discountPercentage
                      );
                      
                      return discountText || pricing.discountPercentage ? `Save ${pricing.discountPercentage}%` : 'Monthly Rate';
                    })()}
                  </span>
                </div>
              </div>
            <div className="features-list">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Basic Email Support</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Real-time Scanning</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Compliance Reports</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Cross-platform Support</span>
              </div>
            </div>
            <button className="plan-btn primary" onClick={scrollToContactForm}>Get Started</button>
          </div>

          {/* Shield Pro - Most Popular */}
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <div className="card-header">
              <div className="plan-name-container">
                <ShieldCheck size={20} className="plan-icon" />
                <h3 className="plan-name">Shield Pro</h3>
              </div>
              <p className="device-count">
                {getPlanInfo('Shield Pro')?.deviceRange || '101-500 devices'}
              </p>
              <div className="price-section">
                <span className="price">
                  {(() => {
                    const pricing = getPricingForPlan('Shield Pro', selectedPlan);
                    if (!pricing) {
                      return <span className="price-loading">Not available</span>;
                    }
                    
                    const { formattedPrice } = formatPriceDisplay(
                      pricing.price, 
                      pricing.currency, // Use currency from database
                      1, // No conversion needed
                      pricing.discountPercentage
                    );
                    
                    return formattedPrice;
                  })()}
                </span>
                <span className="price-period">
                  {selectedPlan === "monthly" ? "per device/month" : "per device/year"}
                </span>
                <span className="discount">
                  {(() => {
                    const pricing = getPricingForPlan('Shield Pro', selectedPlan);
                    if (!pricing) return '';
                    
                    return pricing.discountPercentage ? `Save ${pricing.discountPercentage}%` : 'Monthly Rate';
                  })()}
                </span>
              </div>
            </div>
            <div className="features-list">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Priority Email + Chat</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Advanced Analytics</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Custom Policies</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>API Integration</span>
              </div>
            </div>
            <button className="plan-btn popular-btn" onClick={scrollToContactForm}>Get Shield Pro</button>
          </div>

          {/* Shield Scale */}
          <div className="pricing-card">
            <div className="card-header">
              <div className="plan-name-container">
                <ShieldAlert size={20} className="plan-icon" />
                <h3 className="plan-name">Shield Scale</h3>
              </div>
              <p className="device-count">
                {getPlanInfo('Shield Scale')?.deviceRange || '501-1,000 devices'}
              </p>
              <div className="price-section">
                <span className="price">
                  {(() => {
                    const pricing = getPricingForPlan('Shield Scale', selectedPlan);
                    if (!pricing) {
                      return <span className="price-loading">Not available</span>;
                    }
                    
                    const { formattedPrice } = formatPriceDisplay(
                      pricing.price, 
                      pricing.currency, // Use currency from database
                      1, // No conversion needed
                      pricing.discountPercentage
                    );
                    
                    return formattedPrice;
                  })()}
                </span>
                <span className="price-period">
                  {selectedPlan === "monthly" ? "per device/month" : "per device/year"}
                </span>
                <span className="discount">
                  {(() => {
                    const pricing = getPricingForPlan('Shield Scale', selectedPlan);
                    if (!pricing) return '';
                    
                    return pricing.discountPercentage ? `Save ${pricing.discountPercentage}%` : 'Monthly Rate';
                  })()}
                </span>
              </div>
            </div>
            <div className="features-list">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Phone + Dedicated AM</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Advanced Threat Intel</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>24/7 Monitoring</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Custom Integration</span>
              </div>
            </div>
            <button className="plan-btn secondary" onClick={scrollToContactForm}>Contact Sales</button>
          </div>

          {/* Shield Enterprise */}
          <div className="pricing-card">
            <div className="card-header">
              <div className="plan-name-container">
                <ShieldPlus size={20} className="plan-icon" />
                <h3 className="plan-name">Shield Enterprise</h3>
              </div>
              <p className="device-count">1,000+ devices</p>
              <div className="price-section">
                <span className="price">Custom</span>
                <span className="price-period">Pricing</span>
                <span className="discount green">Volume Discounts</span>
              </div>
            </div>
            <div className="features-list">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Premium 24/7 Support</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Custom Development</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>SLA Guarantees</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>White-glove Implementation</span>
              </div>
            </div>
            <button className="plan-btn primary" onClick={scrollToContactForm}>Contact Sales</button>
          </div>
        </div>
          </>
        )}
      </section>
      
      <div className="tax-info">
        *Taxes extra as applicable
      </div>

      {/* Elastic Plan Section */}
      <section className="elastic-plan-section">
        <div className="elastic-content">
          <h2 className="elastic-title">
            <span style={{color: '#183E8C'}}>Need Workforce Flexibility? </span>
            <span style={{color: '#059669'}}>Try Our Elastic Plan</span>
          </h2>
          <p className="elastic-subtitle">Perfect for organizations with unpredictable device counts or rapid growth</p>
          
          <div className="elastic-features">
            <div className="elastic-feature">
              <span className="checkmark">✓</span>
              <span>Start with 80% of expected devices</span>
            </div>
            <div className="elastic-feature">
              <span className="checkmark">✓</span>
              <span>10% automatic buffer at no extra cost</span>
            </div>
            <div className="elastic-feature">
              <span className="checkmark">✓</span>
              <span>Pay monthly only for devices beyond buffer</span>
            </div>
            <div className="elastic-feature">
              <span className="checkmark">✓</span>
              <span>Ideal for seasonal businesses and growing teams</span>
            </div>
          </div>

          <div className="elastic-buttons">
            <button 
              className="elastic-btn primary"
              onClick={scrollToContactForm}
            >
              Contact Sales for Elastic Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Billing Information Section */}
      <section className="billing-info-section">
        <div className="billing-header">
          <span className="lock-icon">🔒</span>
          <h2>Billed annually, price locked for full term.</h2>
        </div>

        <div className="billing-features">
          <div className="billing-feature-row">
            <div className="billing-feature">
              <span className="checkmark">✓</span>
              <span>Multi-year plans: Billed annually, price locked for full term</span>
            </div>
            <div className="billing-feature">
              <span className="checkmark">✓</span>
              <span>No mid-contract price increases</span>
            </div>
          </div>
          <div className="billing-feature-row">
            <div className="billing-feature">
              <span className="checkmark">✓</span>
              <span>Payment flexibility: Annual billing throughout contract period</span>
            </div>
            <div className="billing-feature">
              <span className="checkmark">✓</span>
              <span>Early termination available with pro-rated refunds</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqData.map((faq) => (
            <div key={faq.id} className="faq-item">
              <div 
                className="faq-question"
                onClick={() => toggleFaq(faq.id)}
              >
                <h3>{faq.question}</h3>
                <span className={`expand-icon ${expandedFaqs[faq.id] ? 'expanded' : ''}`}>❯</span>
              </div>
              <div className={`faq-answer ${expandedFaqs[faq.id] ? 'expanded' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Launch Special Banner Below FAQ */}
      <section className="launch-special-bottom">
        <h2>
          <span className="lightning-icon">⚡</span>
          ViCTAA Launch Special – Limited Time Only!
        </h2>
        <p>Additional 30% discount on all tiers. Ends September 30</p>
        <div className="button-container">
          <button className="view-pricing-btn" onClick={scrollToPricingCards}>View Pricing</button>
          <button className="book-demo-btn" onClick={scrollToContactForm}>Book Demo</button>
        </div>
      </section>

      {/* Success Modal */}
      <div className={`modal-overlay ${showSuccessModal ? 'show' : ''}`}>
        <div className="success-modal">
          <button className="success-modal-close" onClick={closeSuccessModal}>
            <X size={24} />
          </button>
          <div className="success-modal-header">
            <div className="success-modal-icon">
              <Check />
            </div>
            <h3>ViCTAA Inquiry Submitted!</h3>
            <p>{submitMessage}</p>
          </div>
          <button className="success-modal-button" onClick={closeSuccessModal}>
            Got it!
          </button>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <h2 className="contact-heading">Get in touch with our team</h2>
        <p className="subtitle">
          Ready to secure your business? Contact our sales team for a personalized
          demo and quote.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label>Name<span className="required">*</span></label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Business Email<span className="required">*</span></label>
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Company<span className="required">*</span></label>
              <input
                type="text"
                name="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Phone<span className="required">*</span></label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Employees</label>
              <input
                type="text"
                name="employees"
                placeholder="Number of employees"
                value={formData.employees}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Country<span className="required">*</span></label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="AU">Australia</option>
                <option value="JP">Japan</option>
                <option value="SG">Singapore</option>
                <option value="IN">India</option>
                <option value="BR">Brazil</option>
                <option value="MX">Mexico</option>
                <option value="NL">Netherlands</option>
                <option value="SE">Sweden</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="form-field full-width">
              <label>Enquiry</label>
              <textarea
                name="enquiry"
                placeholder="Tell us about your security needs..."
                value={formData.enquiry}
                onChange={handleInputChange}
                maxLength={360}
              />
              <div className="character-count">
                {formData.enquiry.length}/360 characters
              </div>
            </div>
          </div>
          
          <div className="consent-checkbox">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                required
              />
              <span className="checkbox-text">
                I accept the <Link to="/privacy-policy" className="policy-link">Privacy Policy</Link> and <Link to="/cookie-policy" className="policy-link">Cookie Policy</Link> *
              </span>
            </label>
          </div>
          
          <div className="contact-buttons-container">
            <button type="submit" className="contact-submit-btn" disabled={isSubmitting || !formData.consent}>
              {isSubmitting ? 'Submitting...' : 'Contact Sales'}
            </button>
            {/* <button 
              type="button" 
              className="download-btn-victaa" 
              onClick={() => navigate('/victaa/download')}
            >
              Download ViCTAA
            </button> */}
          </div>
          
          {!showSuccessModal && submitMessage && !submitMessage.includes('Thank you') && (
            <div className="submit-message error">
              {submitMessage}
            </div>
          )}
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default VictaaPricing;