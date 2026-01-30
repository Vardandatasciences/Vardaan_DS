import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectUserLocation } from '../services/ipDetectionService';
import { fetchVictaaPricing } from '../services/productPricingService';

// Create the context
const GlobalContext = createContext();

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

// Provider component
export const GlobalProvider = ({ children }) => {
  // User location state
  const [userLocation, setUserLocation] = useState({
    country: 'US',
    currency: 'USD',
    ip: null,
    source: 'fallback',
    loading: true,
    error: null
  });

  // Pricing data state
  const [pricingData, setPricingData] = useState({
    victaa: null,
    loading: true,
    error: null
  });

  // Initialize location detection and pricing data
  useEffect(() => {
    const initializeApp = async () => {
      console.log('🌍 Initializing GlobalContext - detecting user location...');
      
      try {
        // Detect user location
        const locationData = await detectUserLocation();
        console.log('📍 Location detected:', locationData);
        
        setUserLocation({
          country: locationData.country || 'US',
          currency: locationData.currency || 'USD',
          ip: locationData.ip || null,
          source: locationData.source || 'unknown',
          loading: false,
          error: null
        });

        // Fetch pricing data for the detected location
        console.log('📊 Fetching pricing data for detected location...');
        const pricingResult = await fetchVictaaPricing(locationData.country);
        
        if (pricingResult.success) {
          console.log('✅ Pricing data loaded successfully');
          setPricingData({
            victaa: pricingResult.data,
            loading: false,
            error: null
          });
        } else {
          console.error('❌ Failed to load pricing data:', pricingResult.message);
          setPricingData({
            victaa: null,
            loading: false,
            error: pricingResult.message
          });
        }

      } catch (error) {
        console.error('❌ Error initializing app:', error);
        setUserLocation(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
        setPricingData({
          victaa: null,
          loading: false,
          error: error.message
        });
      }
    };

    initializeApp();
  }, []);

  // Function to refresh location and pricing data
  const refreshLocationAndPricing = async () => {
    console.log('🔄 Refreshing location and pricing data...');
    
    setUserLocation(prev => ({ ...prev, loading: true }));
    setPricingData(prev => ({ ...prev, loading: true }));

    try {
      const locationData = await detectUserLocation();
      setUserLocation({
        country: locationData.country || 'US',
        currency: locationData.currency || 'USD',
        ip: locationData.ip || null,
        source: locationData.source || 'unknown',
        loading: false,
        error: null
      });

      const pricingResult = await fetchVictaaPricing(locationData.country);
      if (pricingResult.success) {
        setPricingData({
          victaa: pricingResult.data,
          loading: false,
          error: null
        });
      } else {
        setPricingData({
          victaa: null,
          loading: false,
          error: pricingResult.message
        });
      }
    } catch (error) {
      console.error('❌ Error refreshing data:', error);
      setUserLocation(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      setPricingData({
        victaa: null,
        loading: false,
        error: error.message
      });
    }
  };

  // Function to update pricing data for a specific product
  const updatePricingData = (product, data) => {
    setPricingData(prev => ({
      ...prev,
      [product]: data
    }));
  };

  const value = {
    userLocation,
    pricingData,
    refreshLocationAndPricing,
    updatePricingData
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext; 