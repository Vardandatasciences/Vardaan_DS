import { useState, useEffect } from 'react';
import { config } from '../utils/config';

const API_BASE_URL = config.API_URL;

export const useMedia = (category = null, fileType = null) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (fileType) params.append('type', fileType);

        const response = await fetch(`${API_BASE_URL}/api/media?${params}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        console.log(`useMedia hook - category: ${category}, fileType: ${fileType}, result:`, result);
        
        if (result.success) {
          setMedia(result.data);
        } else {
          throw new Error(result.error || 'Failed to fetch media');
        }
      } catch (err) {
        console.error('Error fetching media:', err);
        setError(err.message);
        setMedia([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [category, fileType]);

  return { media, loading, error };
};

// New hook for page-specific media with fallback
export const useMediaByPage = (pageName) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingFallback(false);

        // First, try the new page-specific endpoint
        console.log(`Trying page-specific endpoint for: ${pageName}`);
        const response = await fetch(`${API_BASE_URL}/api/media/page/${pageName}`);
        
        if (response.ok) {
          const result = await response.json();
          console.log(`✅ Page-specific endpoint successful for ${pageName}:`, result);
          
          if (result.success) {
            setMedia(result.media);
            return;
          }
        }
        
        // If page-specific endpoint fails, try fallback with category-based search
        console.log(`Page-specific endpoint failed, trying fallback for: ${pageName}`);
        setUsingFallback(true);
        
        // Map page names to potential categories
        const categoryMap = {
          'Home': ['Home', 'home'],
          'AboutVardaan': ['AboutVardaan', 'aboutvardaan', 'about'],
          'Services-DataEngineering': ['Services-DataEngineering', 'dataengineering', 'data-engineering'],
          'Services-Data Strategy': ['Services-Data Strategy', 'data-strategy', 'datastrategy'],
          'Services-BusinessIntelligence': ['Services-BusinessIntelligence', 'businessintelligence', 'business-intelligence'],
          'Services-AdvancedAnalytics': ['Services-AdvancedAnalytics', 'advancedanalytics', 'advanced-analytics'],
          'Products-Lapsec': ['Products-Lapsec', 'lapsec', 'victaa'],
          'Products-Smart Trucks': ['Products-Smart Trucks', 'smart-trucks', 'smarttrucks'],
          'Products-ProSync': ['Products-ProSync', 'prosync'],
          'Products-RiskaVaire': ['Products-RiskaVaire', 'riskavaire']
        };
        
        const categories = categoryMap[pageName] || [pageName.toLowerCase()];
        
        // Try each potential category
        for (const category of categories) {
          try {
            const fallbackResponse = await fetch(`${API_BASE_URL}/api/media?category=${encodeURIComponent(category)}`);
            
            if (fallbackResponse.ok) {
              const fallbackResult = await fallbackResponse.json();
              console.log(`✅ Fallback successful with category "${category}":`, fallbackResult);
              
              if (fallbackResult.success && fallbackResult.data && fallbackResult.data.length > 0) {
                setMedia(fallbackResult.data);
                return;
              }
            }
          } catch (fallbackError) {
            console.log(`Fallback failed for category "${category}":`, fallbackError.message);
          }
        }
        
        // If all fallbacks fail, try getting all media and filter client-side
        console.log('All fallbacks failed, trying to get all media...');
        const allMediaResponse = await fetch(`${API_BASE_URL}/api/media`);
        
        if (allMediaResponse.ok) {
          const allMediaResult = await allMediaResponse.json();
          
          if (allMediaResult.success && allMediaResult.data) {
            // Filter by page name in the category field
            const filteredMedia = allMediaResult.data.filter(item => {
              const itemCategory = item.category?.toLowerCase() || '';
              const pageNameLower = pageName.toLowerCase();
              
              return itemCategory.includes(pageNameLower) || 
                     pageNameLower.includes(itemCategory) ||
                     itemCategory.includes(pageNameLower.replace('-', '')) ||
                     itemCategory.includes(pageNameLower.replace('-', ' '));
            });
            
            console.log(`✅ Client-side filtering found ${filteredMedia.length} items for ${pageName}`);
            setMedia(filteredMedia);
            return;
          }
        }
        
        // If everything fails, set empty array
        console.log(`❌ No media found for ${pageName} using any method`);
        setMedia([]);
        
      } catch (err) {
        console.error(`Error fetching page media for ${pageName}:`, err);
        setError(err.message);
        setMedia([]);
      } finally {
        setLoading(false);
      }
    };

    if (pageName) {
      fetchMedia();
    } else {
      setLoading(false);
      setMedia([]);
    }
  }, [pageName]);

  return { media, loading, error, usingFallback };
};

// Hook to get all page categories
export const usePageCategories = () => {
  const [pageCategories, setPageCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/media/pages`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        console.log('usePageCategories hook - result:', result);
        
        if (result.success) {
          setPageCategories(result.pageCategories);
        } else {
          throw new Error(result.error || 'Failed to fetch page categories');
        }
      } catch (err) {
        console.error('Error fetching page categories:', err);
        setError(err.message);
        setPageCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPageCategories();
  }, []);

  return { pageCategories, loading, error };
};

export const useMediaByCategory = (category) => {
  return useMedia(category);
};

export const useImages = (category = null) => {
  return useMedia(category, 'image');
};

export const useVideos = (category = null) => {
  return useMedia(category, 'video');
};

export const useMediaStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/media/stats`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          setStats(result.stats);
        } else {
          throw new Error(result.error || 'Failed to fetch stats');
        }
      } catch (err) {
        console.error('Error fetching media stats:', err);
        setError(err.message);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}; 