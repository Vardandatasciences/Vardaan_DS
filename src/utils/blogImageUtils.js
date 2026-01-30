// Blog image mapping utility
// This file helps map database image URLs to local image files

import { getBlogImageUrl, blogImages } from '../assets/Images/Blog';

// Map of database image URLs to local image filenames
const imageMapping = {
  // Add any specific mappings if needed
  // 'database-filename.jpg': 'local-filename.jpg'
};

/**
 * Get the correct image URL for a blog image
 * @param {string} imageUrl - The image URL from the database
 * @returns {string|null} - The local image URL or null if not found
 */
export const getBlogImageSrc = (imageUrl) => {
  if (!imageUrl) return null;
  
  console.log('🔍 getBlogImageSrc called with:', imageUrl);
  
  // First try the direct mapping
  const mappedFilename = imageMapping[imageUrl];
  if (mappedFilename) {
    const mappedUrl = getBlogImageUrl(mappedFilename);
    console.log('✅ Found mapped image:', mappedUrl);
    return mappedUrl;
  }
  
  // Then try the original filename
  const directUrl = getBlogImageUrl(imageUrl);
  if (directUrl) {
    console.log('✅ Found direct image:', directUrl);
    return directUrl;
  }
  
  // Try to find a partial match (in case the filename has extra parts)
  const cleanFilename = imageUrl.split('/').pop(); // Get just the filename
  console.log('🔍 Clean filename:', cleanFilename);
  
  // Try exact match first
  const exactMatch = Object.keys(blogImages).find(key => key === cleanFilename);
  if (exactMatch) {
    const exactUrl = getBlogImageUrl(exactMatch);
    console.log('✅ Found exact match:', exactUrl);
    return exactUrl;
  }
  
  // Try partial match
  const partialMatch = Object.keys(blogImages).find(key => 
    key.includes(cleanFilename) || cleanFilename.includes(key)
  );
  
  if (partialMatch) {
    const partialUrl = getBlogImageUrl(partialMatch);
    console.log('✅ Found partial match:', partialUrl);
    return partialUrl;
  }
  
  console.log('❌ No image found for:', imageUrl);
  return null;
};

/**
 * Check if an image exists locally
 * @param {string} imageUrl - The image URL from the database
 * @returns {boolean} - True if the image exists locally
 */
export const hasLocalImage = (imageUrl) => {
  return getBlogImageSrc(imageUrl) !== null;
};

/**
 * Get all available local image filenames
 * @returns {string[]} - Array of available image filenames
 */
export const getAvailableImages = () => {
  return Object.keys(blogImages);
};
