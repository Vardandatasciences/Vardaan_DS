// Product pricing form service
// This service can be used by any product page to submit pricing inquiries
import { config } from '../utils/config';
import { detectUserLocation, getCurrencyForCountry } from './ipDetectionService';

// Backend API base URL - using centralized config for backend URL
const BACKEND_API_URL = config.API_URL;

/**
 * Fetch ViCTAA pricing data from the backend API with automatic IP detection
 * @param {string} country - Optional country code for testing (e.g., 'IN' for India)
 * @returns {Promise<Object>} - Response object with pricing data
 */
export const fetchVictaaPricing = async (country = null) => {
  try {
    let apiUrl = `${BACKEND_API_URL}/api/victaa-pricing`;
    
    // If no country is provided, detect user's location automatically
    if (!country) {
      console.log('🌍 No country provided, detecting user location...');
      const locationData = await detectUserLocation();
      console.log('📍 Detected location:', locationData);
      
      // Use detected country for pricing
      country = locationData.country;
    }
    
    // Add country parameter to API URL
    apiUrl += `?country=${country}`;
    
    console.log('📊 Fetching ViCTAA pricing data from backend...');
    console.log('API URL:', apiUrl);
    console.log('Backend API URL from config:', BACKEND_API_URL);
    console.log('🌍 Using country:', country);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HTTP error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ ViCTAA pricing data fetched successfully:', result);
    
    return {
      success: true,
      data: result.data,
      message: result.message,
      detectedCountry: country
    };

  } catch (error) {
    console.error('❌ Error fetching ViCTAA pricing:', error);
    console.error('❌ Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return {
      success: false,
      data: null,
      message: error.message || 'Failed to fetch pricing data'
    };
  }
};

/**
 * Submit product pricing form data to the backend API
 * @param {Object} formData - The form data from the pricing form
 * @param {string} productCode - The product code (e.g., 'LAPSEC', 'RiskaVaire', 'PROSYNC')
 * @param {string} productName - The product name (e.g., 'ViCTAA', 'RiskaVaire', 'ProSync')
 * @param {number} pricingAmount - Optional pricing amount if available
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {Promise<Object>} - Response object with success status and message
 */
export const submitProductPricingInquiry = async (formData, productCode, productName, pricingAmount = 0, currency = 'USD') => {
  try {
    console.log('Submitting product pricing inquiry:', {
      formData,
      productCode,
      productName,
      pricingAmount,
      currency
    });

    // Validate required form fields
    const requiredFields = ['name', 'email', 'company', 'phone', 'country', 'enquiry'];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      }
    }

    // Prepare submission data
    const submissionData = {
      ...formData,
      business_email: formData.email, // Map email to business_email for backend compatibility
      product_code: productCode,
      product_name: productName,
      pricing_amount: pricingAmount,
      currency: currency
    };

    console.log('Making API request to /api/product-pricing');
    console.log('Full URL:', `${BACKEND_API_URL}/api/product-pricing`);
    console.log('Request data:', submissionData);
    
    // Try multiple backend URLs in case of failure
    const backendUrls = [
      `${BACKEND_API_URL}/api/product-pricing`,
      `${BACKEND_API_URL}api/product-pricing`
    ];
    
    let response;
    let lastError;
    
    for (const url of backendUrls) {
      try {
        console.log(`Trying backend URL: ${url}`);
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(submissionData)
        });
        
        if (response.ok) {
          console.log(`✅ Success with URL: ${url}`);
          break;
        } else {
          console.log(`❌ Failed with URL: ${url}, status: ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ Error with URL: ${url}:`, error.message);
        lastError = error;
      }
    }
    
    if (!response || !response.ok) {
      throw new Error(`All backend URLs failed. Last error: ${lastError?.message || 'Unknown error'}`);
    }

    console.log('API Response status:', response.status);
    console.log('API Response headers:', response.headers);

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type:', contentType);
      console.error('Response text:', await response.text());
      throw new Error('Backend server is not responding properly. Please check if the server is running.');
    }

    const result = await response.json();
    console.log('API Response data:', result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit pricing inquiry');
    }

    return {
      success: true,
      message: result.message || '🎉 Your ViCTAA pricing inquiry has been successfully submitted! Our team will review your requirements and get back to you within 24 hours with a personalized quote.'
    };

  } catch (error) {
    console.error('Product pricing submission error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Log form data locally as fallback
    logFormDataLocally(formData, productCode, productName, pricingAmount, currency);
    
    return {
      success: false,
      message: error.message || 'Failed to submit ViCTAA pricing inquiry. Please try again or contact our support team.'
    };
  }
};

// Fallback function to log form data locally when backend is unavailable
const logFormDataLocally = (formData, productCode, productName, pricingAmount, currency) => {
  console.log('=== FALLBACK: FORM DATA LOGGED LOCALLY ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Product Code:', productCode);
  console.log('Product Name:', productName);
  console.log('Pricing Amount:', pricingAmount);
  console.log('Currency:', currency);
  console.log('Form Data:', formData);
  console.log('==========================================');
};

/**
 * Predefined product configurations for easy use
 */
export const PRODUCT_CONFIGS = {
  LAPSEC: {
    code: 'LAPSEC',
    name: 'ViCTAA'
  },
  RiskaVaire: {
    code: 'RiskaVaire',
    name: 'RiskaVaire'
  },
  PROSYNC: {
    code: 'PROSYNC',
    name: 'ProSync'
  },
  SMART_LOGISTICS: {
    code: 'SMART_LOGISTICS',
    name: 'Smart Logistics'
  }
};

/**
 * Get pricing amount based on selected plan for ViCTAA
 * @param {string} selectedPlan - The selected pricing plan
 * @param {string} planType - The specific plan type (e.g., 'shield-pro')
 * @param {Object} pricingData - The pricing data object
 * @returns {number} - The pricing amount
 */
export const getLapsecPricingAmount = (selectedPlan, planType, pricingData) => {
  try {
    return pricingData[selectedPlan][planType].price || 0;
  } catch (error) {
    console.warn('Could not determine pricing amount:', error);
    return 0;
  }
};

/**
 * Validate form data before submission
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
export const validatePricingFormData = (formData) => {
  const errors = [];
  const requiredFields = {
    name: 'Name',
    email: 'Email',
    company: 'Company',
    phone: 'Phone',
    country: 'Country',
    enquiry: 'Enquiry'
  };

  // Check required fields
  Object.entries(requiredFields).forEach(([field, label]) => {
    if (!formData[field] || formData[field].trim() === '') {
      errors.push(`${label} is required`);
    }
  });

  // Validate email format
  if (formData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
  }

  // Validate enquiry length
  if (formData.enquiry && formData.enquiry.length > 360) {
    errors.push('Enquiry message must be 360 characters or less');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 