import { useState, useEffect } from 'react';
import { useImages, useVideos } from '../../hooks/useMedia';
import { config } from '../../utils/config';

const API_BASE_URL = config.API_URL;

// Static showcase configuration - this defines the structure and metadata
const showcaseConfig = [
  {
    id: 'riskavaire',
    title: "RiskaVaire",
    category: 'riskavaire',
    mediaType: "video",
    fileName: "grc.mp4",
    buttonText: "Learn More",
    link: "/riskavaire",
    description: "Governance, Risk, and Compliance solutions",
    type: 'product'
  },
  {
    id: 'lapsec',
    title: "ViCTAA",
    category: 'lapsec',
    mediaType: "video",
    fileName: "lapsec.mp4",
    buttonText: "Learn More",
    link: "/ViCTAA",
    description: "Advanced cybersecurity solutions",
    type: 'product'
  },
  {
    id: 'prosync',
    title: "ProSync",
    category: 'prosync',
    mediaType: "video",
    fileName: "Audit.mp4",
    buttonText: "Learn More",
    link: "/prosync",
    description: "Integrated business operations platform",
    type: 'product'
  },
  {
    id: 'smartlogistics',
    title: "SmartLogistics",
    category: 'smarttrucks',
    mediaType: "video",
    fileName: "smarttrucks.mp4",
    buttonText: "Learn More",
    link: "/smartlogistics",
    description: "AI-powered logistics optimization",
    type: 'product'
  },
  {
    id: 'datastrategy',
    title: "Data Strategy & Consulting",
    category: 'datastrategy',
    mediaType: "video",
    fileName: "data_strategy_herov.mp4",
    buttonText: "Learn More",
    link: "/services/data-strategy",
    description: "Comprehensive data strategy solutions",
    type: 'service'
  },
  {
    id: 'advancedanalytics',
    title: "Advanced Analytics & ML",
    category: 'advancedanalytics',
    mediaType: "image",
    fileName: "hero_overlay.jpg",
    buttonText: "Learn More",
    link: "/services/advanced-analytics",
    description: "Machine learning and predictive analytics",
    type: 'service'
  },
  {
    id: 'dataengineering',
    title: "Data Engineering & Integration",
    category: 'dataengineering',
    mediaType: "video",
    fileName: "data_engineeing_herov.mp4",
    buttonText: "Learn More",
    link: "/services/data-engineering",
    description: "Data pipeline and integration services",
    type: 'service'
  },
  {
    id: 'businessintelligence',
    title: "Business Intelligence & Visualization",
    category: 'businessintelligence',
    mediaType: "video",
    fileName: "Time Lapse.mp4",
    buttonText: "Learn More",
    link: "/services/business-intelligence",
    description: "Data visualization and BI solutions",
    type: 'service'
  }
];

// Helper function to get random items from array
const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Custom hook to get showcase data with backend media
export const useShowcaseData = () => {
  const [showcaseData, setShowcaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all images and videos
  const { media: allImages, loading: imagesLoading } = useImages();
  const { media: allVideos, loading: videosLoading } = useVideos();

  useEffect(() => {
    if (imagesLoading || videosLoading) {
      setLoading(true);
      return;
    }

    try {
      // Helper function to normalize strings for comparison
      const normalizeString = (str) => str.replace(/\s+/g, '').toLowerCase();

      // Helper function to find media by filename
      const findMediaByFileName = (fileName, mediaArray) => {
        const normalizedFileName = normalizeString(fileName);
        
        // Try exact match first
        let found = mediaArray.find(item => 
          normalizeString(item.original_name) === normalizedFileName
        );
        
        // If not found, try partial match
        if (!found) {
          found = mediaArray.find(item => 
            normalizeString(item.original_name).includes(normalizedFileName) ||
            normalizedFileName.includes(normalizeString(item.original_name))
          );
        }
        
        return found ? found.s3_url : null;
      };

      // Separate products and services
      const products = showcaseConfig.filter(item => item.type === 'product');
      const services = showcaseConfig.filter(item => item.type === 'service');

      // Randomly select 1 product and 1 service
      const randomProduct = getRandomItems(products, 1)[0];
      const randomService = getRandomItems(services, 1)[0];

      // Combine the random selections
      const randomSelections = [randomProduct, randomService];

      // Process showcase configuration with random selections
      const processedData = randomSelections.map(config => {
        let mediaPath = null;
        
        if (config.mediaType === 'video') {
          mediaPath = findMediaByFileName(config.fileName, allVideos);
        } else if (config.mediaType === 'image') {
          mediaPath = findMediaByFileName(config.fileName, allImages);
        }

        return {
          ...config,
          mediaPath: mediaPath,
          // No fallback path - will be handled by component
          fallbackPath: null
        };
      });

      setShowcaseData(processedData);
      setError(null);
    } catch (err) {
      console.error('Error processing showcase data:', err);
      setError(err.message);
      setShowcaseData([]);
    } finally {
      setLoading(false);
    }
  }, [allImages, allVideos, imagesLoading, videosLoading]);

  return { showcaseData, loading, error };
};

// Custom hook for hero slider that returns only 1 product and 1 service
export const useHeroShowcaseData = () => {
  const { showcaseData, loading, error } = useShowcaseData();
  
  // The showcaseData already contains only 1 product and 1 service due to random selection
  return { showcaseData, loading, error };
};

// Custom hook for showcase carousel that returns all items
export const useShowcaseCarouselData = () => {
  const [showcaseData, setShowcaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all images and videos
  const { media: allImages, loading: imagesLoading } = useImages();
  const { media: allVideos, loading: videosLoading } = useVideos();

  useEffect(() => {
    if (imagesLoading || videosLoading) {
      setLoading(true);
      return;
    }

    try {
      // Helper function to normalize strings for comparison
      const normalizeString = (str) => str.replace(/\s+/g, '').toLowerCase();

      // Helper function to find media by filename
      const findMediaByFileName = (fileName, mediaArray) => {
        const normalizedFileName = normalizeString(fileName);
        
        // Try exact match first
        let found = mediaArray.find(item => 
          normalizeString(item.original_name) === normalizedFileName
        );
        
        // If not found, try partial match
        if (!found) {
          found = mediaArray.find(item => 
            normalizeString(item.original_name).includes(normalizedFileName) ||
            normalizedFileName.includes(normalizeString(item.original_name))
          );
        }
        
        return found ? found.s3_url : null;
      };

      // Process all showcase configuration (not just random selections)
      const processedData = showcaseConfig.map(config => {
        let mediaPath = null;
        
        if (config.mediaType === 'video') {
          mediaPath = findMediaByFileName(config.fileName, allVideos);
        } else if (config.mediaType === 'image') {
          mediaPath = findMediaByFileName(config.fileName, allImages);
        }

        return {
          ...config,
          mediaPath: mediaPath,
          // No fallback path - will be handled by component
          fallbackPath: null
        };
      });

      setShowcaseData(processedData);
      setError(null);
    } catch (err) {
      console.error('Error processing showcase data:', err);
      setError(err.message);
      setShowcaseData([]);
    } finally {
      setLoading(false);
    }
  }, [allImages, allVideos, imagesLoading, videosLoading]);

  return { showcaseData, loading, error };
};

// Default export for backward compatibility
const showcaseData = showcaseConfig;
export default showcaseData; 