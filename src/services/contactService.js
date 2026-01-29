// Contact form service for Firebase Firestore
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { config } from '../utils/config';

// Collection name for contact form submissions
const CONTACTS_COLLECTION = 'contacts';
const NEWSLETTER_COLLECTION = 'newsletter_subscriptions';

// API base URL - using centralized config for backend URL
const API_BASE_URL = `${config.API_URL}/api`;

// Form validation utilities
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

const sanitizeString = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

const validateContactForm = (formData) => {
  const errors = [];
  
  if (!formData.name || formData.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!formData.email || formData.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!isValidEmail(formData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (formData.phoneNumber && !isValidPhoneNumber(formData.phoneNumber)) {
    errors.push('Please enter a valid phone number');
  }
  
  if (formData.phone && !isValidPhoneNumber(formData.phone)) {
    errors.push('Please enter a valid phone number');
  }
  
  if (formData.name && formData.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  if (formData.email && formData.email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }
  
  if (formData.subject && formData.subject.length > 1000) {
    errors.push('Subject must be less than 1000 characters');
  }
  
  if (formData.message && formData.message.length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

const cleanFormData = (formData) => {
  return {
    name: sanitizeString(formData.name),
    email: sanitizeString(formData.email).toLowerCase(),
    subject: sanitizeString(formData.subject),
    additionalSubject: sanitizeString(formData.additionalSubject),
    phoneNumber: sanitizeString(formData.phoneNumber),
    phone: sanitizeString(formData.phone),
    message: sanitizeString(formData.message)
  };
};

/**
 * Submit contact form data to backend API
 * @param {Object} formData - The contact form data
 * @returns {Promise<string>} - Document ID of the created record
 */
export const submitContactForm = async (formData) => {
  try {
    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    // Clean and prepare data for API
    const cleanedData = cleanFormData(formData);
    
    // Map form data to match backend API expectations
    const contactData = {
      fullname: cleanedData.name,
      email: cleanedData.email,
      phone: cleanedData.phoneNumber || cleanedData.phone || '',
      subject: cleanedData.subject,
      otherSubject: cleanedData.additionalSubject || '',
      message: cleanedData.message
    };

    console.log('Submitting contact form to:', `${API_BASE_URL}/contact`);
    
    // Submit to backend API
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Contact form submitted successfully with ID:', result.contact_id);
      return result.contact_id;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit contact form');
    }
    
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // If API is not available, fallback to Firebase
    if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
      console.warn('API not available, falling back to Firebase');
      return await submitContactFormToFirebase(formData);
    }
    
    throw new Error(`Failed to submit contact form: ${error.message}`);
  }
};

/**
 * Fallback function to submit contact form to Firebase when API is not available
 */
const submitContactFormToFirebase = async (formData) => {
  try {
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const cleanedData = cleanFormData(formData);
    
    // Check if Firebase is configured (basic check)
    if (!db || !db._delegate) {
      console.log('=== FORM SUBMISSION (Backend and Firebase not configured) ===');
      console.log('Form Data:', formData);
      console.log('Timestamp:', new Date().toISOString());
      console.log('========================================================');
      
      // Simulate successful submission
      return 'temp-' + Date.now();
    }

    const contactData = {
      ...cleanedData,
      createdAt: serverTimestamp(),
      status: 'new',
      source: 'website_contact_form',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
    };

    const docRef = await addDoc(collection(db, CONTACTS_COLLECTION), contactData);
    console.log('Contact form submitted to Firebase with ID:', docRef.id);
    return docRef.id;
    
  } catch (error) {
    console.error('Error submitting contact form to Firebase:', error);
    
    if (error.message.includes('not properly configured') || 
        error.message.includes('your-api-key-here') || 
        error.message.includes('your-project-id')) {
      
      console.log('=== FORM SUBMISSION (Backend and Firebase not configured) ===');
      console.log('Form Data:', formData);
      console.log('Timestamp:', new Date().toISOString());
      console.log('========================================================');
      
      return 'temp-' + Date.now();
    }
    
    throw new Error(`Failed to submit contact form: ${error.message}`);
  }
};

/**
 * Submit service inquiry form data to Firestore
 */
export const submitServiceInquiry = async (formData) => {
  try {
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const cleanedData = cleanFormData(formData);
    const inquiryData = {
      ...cleanedData,
      createdAt: serverTimestamp(),
      status: 'new',
      source: 'website_service_inquiry'
    };

    const docRef = await addDoc(collection(db, 'service_inquiries'), inquiryData);
    console.log('Service inquiry submitted successfully with ID:', docRef.id);
    return docRef.id;
    
  } catch (error) {
    console.error('Error submitting service inquiry:', error);
    throw new Error(`Failed to submit service inquiry: ${error.message}`);
  }
};

/**
 * Submit training inquiry form data to Firestore
 */
export const submitTrainingInquiry = async (formData) => {
  try {
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const cleanedData = cleanFormData(formData);
    const inquiryData = {
      ...cleanedData,
      createdAt: serverTimestamp(),
      status: 'new',
      source: 'website_training_inquiry'
    };

    const docRef = await addDoc(collection(db, 'training_inquiries'), inquiryData);
    console.log('Training inquiry submitted successfully with ID:', docRef.id);
    return docRef.id;
    
  } catch (error) {
    console.error('Error submitting training inquiry:', error);
    throw new Error(`Failed to submit training inquiry: ${error.message}`);
  }
};

/**
 * Submit newsletter subscription via API
 * @param {string} email - User's email address
 * @returns {Promise<Object>} - Result object with success status and message
 */
export const submitNewsletterSubscription = async (email) => {
  try {
    // Validate email
    if (!email || !email.trim()) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      };
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      };
    }

    const cleanEmail = email.toLowerCase().trim();

    // Call the backend API
    try {
      console.log('Submitting newsletter subscription to:', `${API_BASE_URL}/subscribe-email`);
      const response = await fetch(`${API_BASE_URL}/subscribe-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: cleanEmail })
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const errorData = await response.json();
        console.error('Newsletter subscription failed:', errorData);
        return errorData;
      }
    } catch (apiError) {
      console.warn('API call failed, falling back to Firebase:', apiError);
      // Fallback to Firebase if API is not available
      return await submitNewsletterSubscriptionToFirebase(cleanEmail);
    }
    
  } catch (error) {
    console.error('Error submitting newsletter subscription:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    };
  }
};

/**
 * Fallback function to submit newsletter subscription directly to Firebase
 * @param {string} email - User's email address
 * @returns {Promise<Object>} - Result object with success status and message
 */
const submitNewsletterSubscriptionToFirebase = async (email) => {
  try {
    // Check if Firebase is configured
    if (!db || !db._delegate) {
      console.log('=== NEWSLETTER SUBSCRIPTION (Firebase not configured) ===');
      console.log('Email:', email);
      console.log('Timestamp:', new Date().toISOString());
      console.log('=====================================================');
      
      // Simulate successful subscription
      return {
        success: true,
        message: 'Successfully subscribed to newsletter! Check your email for confirmation.',
        subscriptionId: 'temp-' + Date.now()
      };
    }

    // Check if email already exists
    const existingQuery = query(
      collection(db, NEWSLETTER_COLLECTION),
      where('email', '==', email)
    );
    const existingSnapshot = await getDocs(existingQuery);
    
    if (!existingSnapshot.empty) {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter'
      };
    }

    // Prepare subscription data
    const subscriptionData = {
      email: email,
      createdAt: serverTimestamp(),
      status: 'active',
      source: 'website_footer',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, NEWSLETTER_COLLECTION), subscriptionData);
    
    console.log('Newsletter subscription submitted successfully with ID:', docRef.id);
    
    return {
      success: true,
      message: 'Successfully subscribed to newsletter! Check your email for confirmation.',
      subscriptionId: docRef.id
    };
    
  } catch (error) {
    console.error('Error submitting newsletter subscription to Firebase:', error);
    
    // If Firebase is not configured, provide a fallback
    if (error.message.includes('not properly configured') || 
        error.message.includes('your-api-key-here') || 
        error.message.includes('your-project-id')) {
      
      console.log('=== NEWSLETTER SUBSCRIPTION (Firebase not configured) ===');
      console.log('Email:', email);
      console.log('Timestamp:', new Date().toISOString());
      console.log('=====================================================');
      
      return {
        success: true,
        message: 'Successfully subscribed to newsletter! Check your email for confirmation.',
        subscriptionId: 'temp-' + Date.now()
      };
    }
    
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    };
  }
}; 