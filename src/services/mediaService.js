// Media service for fetching images and videos from the backend database
import { config } from '../utils/config';

const API_BASE_URL = config.API_URL;

/**
 * Fetch media files from the backend database
 * @param {Object} options - Query options
 * @param {string} options.category - Filter by category (e.g., 'clients', 'riskavaire', 'lapsec')
 * @param {string} options.type - Filter by file type ('image' or 'video')
 * @param {string} options.search - Search term for file names
 * @returns {Promise<Array>} - Array of media objects
 */
export const fetchMedia = async (options = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (options.category) params.append('category', options.category);
    if (options.type) params.append('type', options.type);
    if (options.search) params.append('search', options.search);

    const response = await fetch(`${API_BASE_URL}/api/media?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to fetch media');
    }
  } catch (error) {
    console.error('Error fetching media:', error);
    throw error;
  }
};

/**
 * Fetch all images from the database
 * @param {string} category - Optional category filter
 * @returns {Promise<Array>} - Array of image objects
 */
export const fetchImages = async (category = null) => {
  return fetchMedia({ type: 'image', category });
};

/**
 * Fetch all videos from the database
 * @param {string} category - Optional category filter
 * @returns {Promise<Array>} - Array of video objects
 */
export const fetchVideos = async (category = null) => {
  return fetchMedia({ type: 'video', category });
};

/**
 * Fetch media by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} - Array of media objects
 */
export const fetchMediaByCategory = async (category) => {
  return fetchMedia({ category });
};

/**
 * Search media by filename or category
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} - Array of matching media objects
 */
export const searchMedia = async (searchTerm) => {
  return fetchMedia({ search: searchTerm });
};

/**
 * Get media statistics
 * @returns {Promise<Object>} - Media statistics object
 */
export const getMediaStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/media/stats`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return result.stats;
    } else {
      throw new Error(result.error || 'Failed to fetch media stats');
    }
  } catch (error) {
    console.error('Error fetching media stats:', error);
    throw error;
  }
};

/**
 * Get all available categories
 * @returns {Promise<Array>} - Array of category names
 */
export const getMediaCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/media/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return result.categories;
    } else {
      throw new Error(result.error || 'Failed to fetch categories');
    }
  } catch (error) {
    console.error('Error fetching media categories:', error);
    throw error;
  }
};

/**
 * Debug endpoint to get all media files
 * @returns {Promise<Array>} - Array of all media objects
 */
export const debugAllMedia = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/media/debug`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return result.media;
    } else {
      throw new Error(result.error || 'Failed to fetch debug media');
    }
  } catch (error) {
    console.error('Error fetching debug media:', error);
    throw error;
  }
};

/**
 * Helper function to get the S3 URL for a media item
 * @param {Object} mediaItem - Media item from database
 * @returns {string} - S3 URL
 */
export const getMediaUrl = (mediaItem) => {
  return mediaItem.s3_url || mediaItem.url || '';
};

/**
 * Helper function to check if media item is an image
 * @param {Object} mediaItem - Media item from database
 * @returns {boolean} - True if image
 */
export const isImage = (mediaItem) => {
  return mediaItem.file_type === 'image';
};

/**
 * Helper function to check if media item is a video
 * @param {Object} mediaItem - Media item from database
 * @returns {boolean} - True if video
 */
export const isVideo = (mediaItem) => {
  return mediaItem.file_type === 'video';
};

/**
 * Helper function to get media items by category and type
 * @param {Array} mediaItems - Array of media items
 * @param {string} category - Category filter
 * @param {string} type - Type filter ('image' or 'video')
 * @returns {Array} - Filtered media items
 */
export const filterMedia = (mediaItems, category = null, type = null) => {
  return mediaItems.filter(item => {
    const categoryMatch = !category || item.category === category;
    const typeMatch = !type || item.file_type === type;
    return categoryMatch && typeMatch;
  });
}; 