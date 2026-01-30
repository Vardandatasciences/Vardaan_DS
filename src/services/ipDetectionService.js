// IP Detection Service for automatic currency selection
// This service detects user's location and sets appropriate currency
// Enhanced for VPN detection and multiple fallback methods

import { config } from '../utils/config';

/**
 * Enhanced IP detection with multiple services and VPN detection
 * @returns {Promise<Object>} - Object with country and currency information
 */
export const detectUserLocation = async () => {
  try {
    console.log('🌍 Starting enhanced IP detection...');
    
    // Method 1: Direct IP detection services (most reliable for VPN)
    const directDetection = await detectLocationFromDirectServices();
    if (directDetection.success) {
      console.log('✅ Direct IP detection successful:', directDetection);
      return directDetection;
    }

    // Method 2: Backend API detection
    const backendDetection = await detectLocationFromBackend();
    if (backendDetection.success) {
      console.log('✅ Backend detection successful:', backendDetection);
      return backendDetection;
    }

    // Method 3: Browser-based detection
    const browserDetection = await detectLocationFromBrowser();
    console.log('✅ Browser detection result:', browserDetection);
    return browserDetection;

  } catch (error) {
    console.error('❌ All IP detection methods failed:', error);
    return {
      country: 'US',
      currency: 'USD',
      source: 'fallback',
      error: error.message,
      success: false
    };
  }
};

/**
 * Detect location using direct IP services (best for VPN detection)
 */
const detectLocationFromDirectServices = async () => {
  console.log('🔍 Method 1: Direct IP services detection...');
  
  // Simplified approach - use only reliable services that work
  const ipServices = [
    {
      name: 'ipinfo.io',
      url: 'https://ipinfo.io/json',
      extractCountry: (data) => data.country,
      extractIP: (data) => data.ip
    }
  ];

  for (const service of ipServices) {
    try {
      console.log(`🌍 Trying ${service.name}...`);
      
      const response = await fetch(service.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(5000)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`📡 ${service.name} response:`, data);

        let country = 'US';
        let ip = null;

        if (service.extractCountry) {
          // Service provides country directly
          country = service.extractCountry(data) || 'US';
          ip = service.extractIP ? service.extractIP(data) : null;
        } else {
          // Service only provides IP, need to get geolocation separately
          ip = service.extractIP(data);
          if (ip) {
            console.log(`🌍 IP detected: ${ip}, using fallback country`);
            country = 'US'; // Fallback to US if no country info
          }
        }

        // Validate country code
        if (country && country.length === 2) {
          const currency = country === 'IN' ? 'INR' : 'USD';
          
          console.log(`✅ ${service.name} detection successful:`, {
            country,
            currency,
            ip,
            service: service.name
          });

          return {
            country,
            currency,
            ip,
            source: 'direct',
            service: service.name,
            success: true
          };
        }
      }
    } catch (error) {
      console.log(`⚠️ ${service.name} failed:`, error.message);
      continue;
    }
  }

  console.log('❌ All direct IP services failed');
  return { success: false };
};

/**
 * Detect location using backend API
 */
const detectLocationFromBackend = async () => {
  console.log('🔍 Method 2: Backend API detection...');
  
  try {
    const response = await fetch(`${config.API_URL}/api/victaa-pricing`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.debug) {
        console.log('✅ Backend detection successful:', result.debug);
        return {
          country: result.debug.userCountry || 'US',
          currency: result.debug.userCurrency || 'USD',
          source: 'backend',
          success: true
        };
      }
    }
  } catch (error) {
    console.log('⚠️ Backend detection failed:', error.message);
  }

  return { success: false };
};

/**
 * Detect location using browser information
 */
const detectLocationFromBrowser = async () => {
  console.log('🔍 Method 3: Browser-based detection...');
  
  try {
    // Get browser locale
    const browserLocale = navigator.language || navigator.userLanguage || 'en-US';
    console.log('🌐 Browser locale:', browserLocale);
    
    // Get timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('⏰ Browser timezone:', timezone);
    
    // Check for Indian indicators
    const isIndianLocale = browserLocale.includes('IN') || 
                          browserLocale.includes('hi') || 
                          browserLocale.includes('ta') ||
                          browserLocale.includes('te') ||
                          browserLocale.includes('bn');
    
    const isIndianTimezone = timezone.includes('Asia/Kolkata') || 
                            timezone.includes('Asia/Calcutta');
    
    // Determine country based on browser indicators
    let country = 'US';
    if (isIndianLocale || isIndianTimezone) {
      country = 'IN';
      console.log('🇮🇳 Indian indicators detected in browser');
    }
    
    const currency = country === 'IN' ? 'INR' : 'USD';
    
    console.log('✅ Browser detection result:', {
      country,
      currency,
      locale: browserLocale,
      timezone,
      isIndianLocale,
      isIndianTimezone
    });

    return {
      country,
      currency,
      source: 'browser',
      locale: browserLocale,
      timezone,
      success: true
    };
    
  } catch (error) {
    console.log('⚠️ Browser detection failed:', error.message);
    return {
      country: 'US',
      currency: 'USD',
      source: 'browser-fallback',
      success: true
    };
  }
};

/**
 * Force refresh IP detection (useful for VPN testing)
 */
export const forceRefreshLocation = async () => {
  console.log('🔄 Forcing IP detection refresh...');
  
  // Clear any cached data
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('🗑️ Cleared browser cache');
    } catch (error) {
      console.log('⚠️ Could not clear cache:', error.message);
    }
  }
  
  // Wait a moment for cache to clear
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Perform fresh detection
  return await detectUserLocation();
};

/**
 * Get currency symbol based on currency code
 * @param {string} currency - Currency code (USD, INR, etc.)
 * @returns {string} - Currency symbol
 */
export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'INR':
      return '₹';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    default:
      return '$';
  }
};

/**
 * Format price with appropriate currency symbol
 * @param {number} price - Price amount
 * @param {string} currency - Currency code
 * @returns {string} - Formatted price string
 */
export const formatPriceWithCurrency = (price, currency) => {
  if (!price || price === 0) {
    return 'Not available';
  }

  const symbol = getCurrencySymbol(currency);
  
  if (currency === 'INR') {
    return `${symbol}${price.toFixed(2)}*`;
  } else if (currency === 'USD') {
    return `${symbol}${price.toFixed(2)}*`;
  } else {
    // For other currencies, use the formatPrice function from currencyService
    return `${symbol}${price.toFixed(2)}*`;
  }
};

/**
 * Check if user is in India
 * @param {string} country - Country code
 * @returns {boolean} - True if user is in India
 */
export const isUserInIndia = (country) => {
  return country === 'IN';
};

/**
 * Get appropriate currency for a country
 * @param {string} country - Country code
 * @returns {string} - Currency code
 */
export const getCurrencyForCountry = (country) => {
  return country === 'IN' ? 'INR' : 'USD';
}; 