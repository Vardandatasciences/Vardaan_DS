# Product Pricing Form Integration Guide

This guide explains how to integrate pricing inquiry forms for any product page using the centralized product pricing service.

## Overview

When users fill out pricing forms on any product page, the details are automatically stored in the `product_pricing_request` database table with the appropriate product information (product_code and product_name) based on which page the form is submitted from.

## Database Table Structure

The `product_pricing_request` table contains the following columns:
- `id` (Primary Key)
- `product_code` (e.g., 'LAPSEC', 'GRC', 'PROSYNC')
- `product_name` (e.g., 'LapSec', 'GRC', 'ProSync')
- `name` (User's name)
- `business_email` (User's email)
- `company` (User's company)
- `phone` (User's phone)
- `employees` (Number of employees - optional)
- `country` (User's country)
- `enquiry` (User's inquiry message)
- `pricing_amount` (Pricing amount if available - optional)
- `currency` (Currency code - default: 'USD')
- `created_at` (Timestamp)

## Backend API Endpoints

### 1. `/api/lapsec-pricing` (POST)
- Specific endpoint for LapSec pricing forms
- Automatically sets product_code='LAPSEC' and product_name='LapSec'

### 2. `/api/product-pricing` (POST)
- Generalized endpoint for any product pricing form
- Accepts dynamic product_code and product_name

## Frontend Integration

### Step 1: Import the Service

```javascript
import { 
  submitProductPricingInquiry, 
  PRODUCT_CONFIGS, 
  validatePricingFormData 
} from "../../../services/productPricingService";
```

### Step 2: Set Up Form State

```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  company: '',
  phone: '',
  employees: '',
  country: '',
  enquiry: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitMessage, setSubmitMessage] = useState('');
```

### Step 3: Handle Form Submission

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitMessage('');

  try {
    // Validate form data (optional)
    const validation = validatePricingFormData(formData);
    if (!validation.isValid) {
      setSubmitMessage(validation.errors.join(', '));
      return;
    }

    // Submit using the product pricing service
    const result = await submitProductPricingInquiry(
      formData,
      PRODUCT_CONFIGS.GRC.code,     // Change this for different products
      PRODUCT_CONFIGS.GRC.name,     // Change this for different products
      0,                            // Optional pricing amount
      'USD'                         // Currency
    );

    if (result.success) {
      setSubmitMessage(result.message);
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        employees: '',
        country: '',
        enquiry: ''
      });
    } else {
      setSubmitMessage(result.message);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    setSubmitMessage('Failed to submit form. Please try again or contact support.');
  } finally {
    setIsSubmitting(false);
  }
};
```

## Available Product Configurations

```javascript
PRODUCT_CONFIGS = {
  LAPSEC: {
    code: 'LAPSEC',
    name: 'LapSec'
  },
  GRC: {
    code: 'GRC',
    name: 'GRC'
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
```

## Example: Adding Pricing Form to GRC Page

```javascript
// In GRC.js
import { submitProductPricingInquiry, PRODUCT_CONFIGS } from "../../../services/productPricingService";

// Form submission handler
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const result = await submitProductPricingInquiry(
      formData,
      PRODUCT_CONFIGS.GRC.code,
      PRODUCT_CONFIGS.GRC.name,
      0, // No pricing amount for GRC
      'USD'
    );

    if (result.success) {
      setSubmitMessage(result.message);
      // Reset form...
    }
  } catch (error) {
    // Handle error...
  } finally {
    setIsSubmitting(false);
  }
};
```

## CSS Classes for Form Styling

The following CSS classes are available for consistent form styling:
- `.contact-form-section` - Main form container
- `.form-grid` - Grid layout for form fields
- `.form-field` - Individual field container
- `.contact-submit-btn` - Submit button
- `.submit-message` - Message display
- `.submit-message.success` - Success message styling
- `.submit-message.error` - Error message styling

## Backend Setup

1. Ensure MySQL is running with the `vardaan_ds` database
2. Make sure the `product_pricing_request` table exists with the correct schema
3. Update database credentials in `backend/lapsecpricing.py` if needed
4. Install required Python packages: `pip install -r backend/requirements.txt`
5. Run the Flask server: `python backend/lapsecpricing.py`

## Testing

1. Fill out the form on any product page
2. Check the browser console for any errors
3. Verify data is stored in the `product_pricing_request` table
4. Confirm the correct product_code and product_name are saved

## Error Handling

The system includes comprehensive error handling for:
- Required field validation
- Email format validation
- Phone number validation (by country)
- Database connection errors
- Network errors

All errors are displayed to the user with helpful messages. 