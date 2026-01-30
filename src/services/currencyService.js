// Currency service for handling currency detection and conversion
import { config } from '../utils/config';

const API_BASE_URL = `${config.API_URL}/api`;

export const getCurrencyFromIP = async () => {
  try {
    console.log('Fetching currency from IP geolocation...');
    
    // Use a reliable IP geolocation service
    const response = await fetch('https://ipapi.co/json/');
    console.log('IP API response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('IP geolocation data:', data);
    
    // Determine currency based on country code
    let currency = 'USD';
    let rate = 1;
    
    if (data.country_code === 'IN') {
      console.log('Detected India, using INR');
      currency = 'INR';
      rate = 83.0;
    } else {
      console.log(`Detected ${data.country_code || 'unknown'}, using USD`);
      currency = 'USD';
      rate = 1;
    }
    
    console.log(`Using currency: ${currency} with rate: ${rate}`);
    return {
      currency: currency,
      rate: rate
    };
    
  } catch (error) {
    console.error('Error fetching currency from IP:', error);
    
    // Try alternative IP geolocation service as fallback
    try {
      console.log('Trying alternative IP geolocation service...');
      const fallbackResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await fallbackResponse.json();
      console.log('IP address:', ipData.ip);
      
      // Use ipapi.co with the detected IP
      const geoResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
      const geoData = await geoResponse.json();
      console.log('Alternative IP geolocation data:', geoData);
      
      if (geoData.country_code === 'IN') {
        console.log('Alternative service detected India, using INR');
        return {
          currency: 'INR',
          rate: 83.0
        };
      } else {
        console.log('Alternative service detected non-India, using USD');
        return {
          currency: 'USD',
          rate: 1
        };
      }
    } catch (fallbackError) {
      console.error('All IP geolocation services failed:', fallbackError);
      console.log('Defaulting to USD');
      return {
        currency: 'USD',
        rate: 1
      };
    }
  }
};

export const formatPrice = (amount, currency, rate) => {
  console.log(`Formatting price: ${amount} ${currency} with rate ${rate}`);
  const convertedAmount = amount * rate;
  
  if (currency === 'INR') {
    // Format INR with proper Indian number formatting
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    const formattedPrice = formatter.format(convertedAmount);
    console.log(`Formatted INR price: ${formattedPrice}`);
    return formattedPrice;
  } else {
    // Format USD with US number formatting
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    const formattedPrice = formatter.format(convertedAmount);
    console.log(`Formatted USD price: ${formattedPrice}`);
    return formattedPrice;
  }
}; 