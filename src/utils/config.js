// Configuration utility for local backend development
const getBackendUrl = () => {
  // Check for environment variable first (highest priority)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Use relative path - works in both development (with proxy) and production (same domain)
  // In production, this resolves to https://vardaands.com/api
  // In development, proxy handles /api requests
  return "";
};

// Special API URL for blogs (vardaan_ds database)
// Blogs use the global API from vardaanglobal.com
const getBlogApiUrl = () => {
  // Check for environment variable first (highest priority)
  if (process.env.REACT_APP_BLOG_API_URL) {
    return process.env.REACT_APP_BLOG_API_URL;
  }
  
  // Use the global API URL for blogs from vardaanglobal.com
  // In production, use https://vardaanglobal.com/api
  // In development, can use localhost or the global API
  if (process.env.NODE_ENV === 'development') {
    // For development, you can use localhost or the global API
    // Uncomment the line below to use localhost in development:
    // return "http://localhost:10000/api";
    return "https://vardaanglobal.com/api";
  }
  
  // Production: use the global API from vardaanglobal.com
  return "https://vardaanglobal.com/api";
};

export const config = {
  // Local backend URL
  API_URL: getBackendUrl(),
  BACKEND_URL: getBackendUrl(),
  
  // Blog-specific API URL (vardaan_ds database)
  BLOG_API_URL: getBlogApiUrl(),
  
  // Environment configuration
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || 'development',
  DEBUG_MODE: process.env.REACT_APP_DEBUG_MODE === 'true' || process.env.NODE_ENV === 'development',
  
  // Firebase configuration (optional)
  FIREBASE: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  },
  
  // Environment checks
  isProduction: () => process.env.NODE_ENV === 'production',
  isDevelopment: () => process.env.NODE_ENV === 'development',
  
  // Backend URL utilities
  getApiUrl: () => getBackendUrl(),
  getBlogApiUrl: () => getBlogApiUrl(),
  getFullApiUrl: (endpoint) => `${getBackendUrl()}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`,
  getFullBlogApiUrl: (endpoint) => `${getBlogApiUrl()}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`,
  
  // Logging utility
  log: (message, data = null) => {
    if (config.DEBUG_MODE) {
      console.log(`[CONFIG] ${message}`, data);
    }
  },
  
  // Debug function to check configuration
  debug: () => {
    const debugInfo = {
      NODE_ENV: process.env.NODE_ENV,
      REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
      REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT,
      REACT_APP_DEBUG_MODE: process.env.REACT_APP_DEBUG_MODE,
      computedBackendUrl: config.API_URL,
      blogApiUrl: config.BLOG_API_URL,
      debugMode: config.DEBUG_MODE,
      isProduction: config.isProduction(),
      isDevelopment: config.isDevelopment(),
      timestamp: new Date().toISOString()
    };
    
    console.log('=== LOCAL BACKEND CONFIGURATION DEBUG ===');
    console.table(debugInfo);
    console.log('Current Backend URL:', config.API_URL);
    console.log('Blog API URL:', config.BLOG_API_URL);
    console.log('Backend Mode: LOCAL DEVELOPMENT');
    console.log('==========================================');
    
    return debugInfo;
  }
};

// Auto-log configuration in development
if (config.DEBUG_MODE) {
  console.log('🔧 Local Backend Config Loaded');
  console.log(`Backend URL: ${config.API_URL}`);
  console.log(`Blog API URL: ${config.BLOG_API_URL}`);
}

export default config; 