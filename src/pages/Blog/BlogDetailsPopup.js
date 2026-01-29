import React, { useState } from 'react';
import { config } from '../../utils/config';
import './BlogDetailsPopup.css';

const BlogDetailsPopup = ({ isOpen, onClose, onSubmit, blogTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    company: '',
    country: ''
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
    
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company/Organization is required';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
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
      const response = await fetch(`${config.BLOG_API_URL}/api/blog-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Form submitted successfully, close popup and redirect
        onSubmit(result.requestId);
      } else {
        setErrors({ submit: result.message || 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="blog-details-popup-overlay" onClick={handleClose}>
      <div className="blog-details-popup" onClick={(e) => e.stopPropagation()}>
        <button 
          className="blog-details-popup-close" 
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Close popup"
        >
          ×
        </button>
        
        <div className="blog-details-popup-header">
          <h2>Access Blog Content</h2>
          <p>Please provide your details to access: <strong>{blogTitle}</strong></p>
        </div>
        
        <form onSubmit={handleSubmit} className="blog-details-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
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
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone_number">Phone Number *</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className={errors.phone_number ? 'error' : ''}
                placeholder="Enter your phone number"
                disabled={isSubmitting}
              />
              {errors.phone_number && <span className="error-message">{errors.phone_number}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company/Organization *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={errors.company ? 'error' : ''}
                placeholder="Enter your company or organization"
                disabled={isSubmitting}
              />
              {errors.company && <span className="error-message">{errors.company}</span>}
            </div>
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="country">Country *</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={errors.country ? 'error' : ''}
              placeholder="Enter your country"
              disabled={isSubmitting}
            />
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>
          
          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        
        <div className="blog-details-popup-footer">
          <p>Your information will be used to provide you with relevant content and updates.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPopup;
