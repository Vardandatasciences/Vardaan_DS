const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS must come FIRST
// Configure CORS to allow specific origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://vardaanglobal.com',
      'https://www.vardaanglobal.com',
      'https://vardaanglobal.vardaands.com',
      'https://www.vardaanglobal.vardaands.com',
      'https://api-vardaanglobal.vardaands.com',
      'https://vardaands.com',
      'https://www.vardaands.com',
      'http://72.61.243.113',
      'https://72.61.243.113',
      'http://localhost:3000',
      'http://localhost:3001'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Additional check for subdomain patterns
      const isVardaanSubdomain = origin.includes('vardaanglobal.com') || 
                                 origin.includes('vardaands.com') ||
                                 origin.includes('localhost') ||
                                 origin.includes('72.61.243.113');
      
      if (isVardaanSubdomain) {
        console.log('CORS allowed for Vardaan subdomain:', origin);
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  maxAge: 86400 // Cache preflight response for 24 hours
};

// Apply CORS middleware FIRST
app.use(cors(corsOptions));

// Add CORS debugging middleware
app.use((req, res, next) => {
  console.log('🌐 CORS Debug - Request Details:');
  console.log('  Origin:', req.headers.origin);
  console.log('  Method:', req.method);
  console.log('  URL:', req.url);
  console.log('  User-Agent:', req.headers['user-agent']);
  console.log('  Content-Length:', req.headers['content-length']);
  console.log('  Content-Type:', req.headers['content-type']);
  
  // Check if request is too large
  const contentLength = parseInt(req.headers['content-length'] || '0');
  if (contentLength > 50 * 1024 * 1024) { // 50MB
    console.log('⚠️  WARNING: Large request detected:', (contentLength / (1024 * 1024)).toFixed(2), 'MB');
  }
  
  // Ensure CORS headers are always set for all responses
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Log CORS headers being set
  console.log('  CORS Headers Set:');
  console.log('    Access-Control-Allow-Origin:', res.get('Access-Control-Allow-Origin'));
  console.log('    Access-Control-Allow-Credentials:', res.get('Access-Control-Allow-Credentials'));
  console.log('    Access-Control-Allow-Methods:', res.get('Access-Control-Allow-Methods'));
  console.log('    Access-Control-Allow-Headers:', res.get('Access-Control-Allow-Headers'));
  console.log('---');
  
  next();
});

// Handle preflight requests for ALL endpoints
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    console.log('🔍 PREFLIGHT REQUEST for:', req.url);
    console.log('  Origin:', req.headers.origin);
    console.log('  Method:', req.method);
    
    // Set CORS headers for preflight
    if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', '86400');
    
    console.log('  📤 Preflight response sent');
    res.status(200).end();
    return;
  }
  
  next();
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  // Handle multer errors specifically
  if (error.code === 'LIMIT_FILE_SIZE') {
    console.error('File size limit exceeded:', error.message);
    return res.status(413).json({
      success: false,
      message: 'File size too large. Maximum allowed size is 100MB.'
    });
  }
  
  if (error.code === 'LIMIT_FILE_COUNT') {
    console.error('File count limit exceeded:', error.message);
    return res.status(413).json({
      success: false,
      message: 'Too many files. Maximum allowed is 10 files.'
    });
  }
  
  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    console.error('Unexpected file field:', error.message);
    return res.status(400).json({
      success: false,
      message: 'Unexpected file field in request.'
    });
  }
  
  // Ensure CORS headers are set even for error responses
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Send error response
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

// Increase request size limits to handle larger content
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Add error handling for request parsing
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    console.error('Request parsing error:', error.message);
    return res.status(400).json({
      success: false,
      message: 'Invalid request format',
      error: 'Request body could not be parsed'
    });
  }
  next(error);
});

// Add timeout middleware for long-running requests
app.use((req, res, next) => {
  // Set timeout to 5 minutes for large requests
  req.setTimeout(300000); // 5 minutes
  res.setTimeout(300000); // 5 minutes
  next();
});

// Add request size monitoring middleware
app.use((req, res, next) => {
  const contentLength = parseInt(req.headers['content-length'] || '0');
  
  // Log large requests
  if (contentLength > 10 * 1024 * 1024) { // 10MB
    console.log('📊 Large request detected:', {
      url: req.url,
      method: req.method,
      size: (contentLength / (1024 * 1024)).toFixed(2) + ' MB',
      origin: req.headers.origin
    });
  }
  
  // Add progress tracking for large requests
  if (contentLength > 0) {
    let received = 0;
    req.on('data', (chunk) => {
      received += chunk.length;
      if (received % (1024 * 1024) === 0) { // Log every MB
        console.log(`📥 Received ${(received / (1024 * 1024)).toFixed(1)} MB of ${(contentLength / (1024 * 1024)).toFixed(1)} MB`);
      }
    });
  }
  
  next();
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const blogImagesDir = path.join(uploadsDir, 'blog-images');

// Also set up assets directory path for serving images
// Use multiple path strategies to handle different hosting environments
let assetsDir, blogAssetsDir;

// Strategy 1: Try relative to current file
const relativeAssetsDir = path.join(__dirname, '..', 'assets');
const relativeBlogAssetsDir = path.join(relativeAssetsDir, 'Blog');

// Strategy 2: Try relative to current working directory
const cwdAssetsDir = path.join(process.cwd(), 'src', 'assets');
const cwdBlogAssetsDir = path.join(cwdAssetsDir, 'Blog');

// Strategy 3: Try absolute paths for common hosting scenarios
const absoluteAssetsDir = '/var/www/html/src/assets';
const absoluteBlogAssetsDir = path.join(absoluteAssetsDir, 'Blog');

// Check which path exists and use it
if (fs.existsSync(relativeBlogAssetsDir)) {
  assetsDir = relativeAssetsDir;
  blogAssetsDir = relativeBlogAssetsDir;
  console.log('✅ Using relative assets path:', blogAssetsDir);
} else if (fs.existsSync(cwdBlogAssetsDir)) {
  assetsDir = cwdAssetsDir;
  blogAssetsDir = cwdBlogAssetsDir;
  console.log('✅ Using CWD assets path:', blogAssetsDir);
} else if (fs.existsSync(absoluteBlogAssetsDir)) {
  assetsDir = absoluteAssetsDir;
  blogAssetsDir = absoluteBlogAssetsDir;
  console.log('✅ Using absolute assets path:', blogAssetsDir);
} else {
  // Fallback to relative path and create if needed
  assetsDir = relativeAssetsDir;
  blogAssetsDir = relativeBlogAssetsDir;
  console.log('⚠️ Assets path not found, will create:', blogAssetsDir);
}

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(blogImagesDir)) {
  fs.mkdirSync(blogImagesDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, blogImagesDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'blog-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit to match express limits
    files: 10, // Maximum 10 files
    fieldSize: 100 * 1024 * 1024 // 100MB for text fields
  },
  fileFilter: function (req, file, cb) {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Create specific upload middlewares
const uploadArray = upload.array('images', 10);
const uploadSingle = upload.single('image');

// Serve uploaded files statically with debugging
app.use('/uploads', (req, res, next) => {
  console.log('📁 Static file request:', req.url);
  console.log('  Full path:', path.join(uploadsDir, req.url));
  console.log('  Absolute path:', path.resolve(path.join(uploadsDir, req.url)));
  console.log('  File exists:', fs.existsSync(path.join(uploadsDir, req.url)));
  console.log('  Current working directory:', process.cwd());
  console.log('  __dirname:', __dirname);
  console.log('  uploadsDir:', uploadsDir);
  
  // Check if file exists
  const filePath = path.join(uploadsDir, req.url);
  if (!fs.existsSync(filePath)) {
    console.log('❌ File not found:', filePath);
    console.log('  Available files in directory:', fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : 'Directory does not exist');
    
    // Try to serve from assets folder as fallback
    const assetFilePath = path.join(blogAssetsDir, path.basename(req.url));
    console.log('🔄 Trying assets folder as fallback:', assetFilePath);
    
    if (fs.existsSync(assetFilePath)) {
      console.log('✅ Found image in assets folder, serving from there');
      return res.sendFile(assetFilePath);
    }
    
    return res.status(404).json({
      success: false,
      message: 'File not found in uploads or assets folder',
      requestedPath: req.url,
      fullPath: filePath,
      assetPath: assetFilePath,
      currentWorkingDir: process.cwd(),
      __dirname: __dirname,
      uploadsDir: uploadsDir,
      assetsDir: assetsDir
    });
  }
  
  // Log file info
  const stats = fs.statSync(filePath);
  console.log('  File size:', (stats.size / 1024).toFixed(2), 'KB');
  console.log('  File type:', path.extname(filePath));
  console.log('  ✅ Serving file successfully');
  
  next();
}, express.static(uploadsDir));

// Add a specific route to serve blog images from uploads directory
app.use('/uploads/blog-images', (req, res, next) => {
  console.log('🖼️ Blog Images Uploads request:', req.url);
  
  // Remove leading slash and construct path
  const imagePath = req.url.replace(/^\//, '');
  const fullPath = path.join(blogImagesDir, imagePath);
  
  console.log('  Full uploads path:', fullPath);
  console.log('  File exists:', fs.existsSync(fullPath));
  console.log('  Blog images directory:', blogImagesDir);
  
  if (!fs.existsSync(fullPath)) {
    console.log('❌ Image not found in uploads:', fullPath);
    console.log('  Available files in uploads:', fs.existsSync(blogImagesDir) ? fs.readdirSync(blogImagesDir) : 'Directory does not exist');
    
    // Try to find the image in assets folder as fallback
    const assetsPath = path.join(blogAssetsDir, imagePath);
    console.log('  Trying assets fallback:', assetsPath);
    console.log('  Assets file exists:', fs.existsSync(assetsPath));
    
    if (fs.existsSync(assetsPath)) {
      console.log('✅ Found image in assets, serving from there');
      return res.sendFile(assetsPath);
    }
    
    // If still not found, return 404
    return res.status(404).json({
      success: false,
      message: 'Blog image not found',
      requestedPath: req.url,
      uploadsPath: fullPath,
      assetsPath: assetsPath,
      availableFiles: {
        uploads: fs.existsSync(blogImagesDir) ? fs.readdirSync(blogImagesDir) : [],
        assets: fs.existsSync(blogAssetsDir) ? fs.readdirSync(blogAssetsDir) : []
      }
    });
  }
  
  console.log('✅ Image found in uploads, serving from there');
  
  // Get file stats and set appropriate headers
  try {
    const stats = fs.statSync(fullPath);
    const ext = path.extname(imagePath).toLowerCase();
    
    // Set appropriate content type
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.avif') contentType = 'image/avif';
    
    // Set headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    // Send the file
    res.sendFile(fullPath);
    
    console.log('✅ Blog image served successfully from uploads:', imagePath);
    
  } catch (error) {
    console.error('Error serving blog image:', error);
    res.status(500).json({
      success: false,
      message: 'Error serving blog image',
      error: error.message
    });
  }
});

// Test endpoint to check blog images
app.get('/blog-images/debug', async (req, res) => {
  try {
    console.log('🔍 Blog Images Debug Request');
    
    // Get all blogs with their images
    const [blogs] = await pool.execute(`
      SELECT 
        b.blog_id,
        b.title,
        b.slug,
        bi.image_url
      FROM blogs b
      LEFT JOIN blog_images bi ON b.blog_id = bi.blog_id
      ORDER BY b.created_at DESC
    `);
    
    // Check filesystem
    const uploadsFiles = fs.existsSync(blogImagesDir) ? fs.readdirSync(blogImagesDir) : [];
    const assetsFiles = fs.existsSync(blogAssetsDir) ? fs.readdirSync(blogAssetsDir) : [];
    
    const debugInfo = {
      blogs: blogs,
      filesystem: {
        uploadsDir: blogImagesDir,
        assetsDir: blogAssetsDir,
        uploadsFiles: uploadsFiles,
        assetsFiles: assetsFiles
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        cwd: process.cwd(),
        __dirname: __dirname
      }
    };
    
    console.log('📊 Blog Images Debug Info:', debugInfo);
    
    res.json({
      success: true,
      data: debugInfo
    });
    
  } catch (error) {
    console.error('Error in blog images debug:', error);
    res.status(500).json({
      success: false,
      message: `Debug failed: ${error.message}`
    });
  }
});

// Add a new route to serve blog images from assets folder
app.use('/assets/Blog', (req, res, next) => {
  const imagePath = req.url.replace(/^\//, '');
  const fullPath = path.join(blogAssetsDir, imagePath);
  
  console.log('  Full assets path:', fullPath);
  console.log('  File exists:', fs.existsSync(fullPath));
  console.log('  Blog assets directory:', blogAssetsDir);
  console.log('  Current working directory:', process.cwd());
  console.log('  __dirname:', __dirname);
  
  // Check if this is a hosted environment (no local assets)
  const isHosted = !fs.existsSync(blogAssetsDir) || 
                   blogAssetsDir.includes('/var/www') || 
                   blogAssetsDir.includes('C:\\') ||
                   process.env.NODE_ENV === 'production' ||
                   process.env.HOSTED === 'true' ||
                   process.env.ENVIRONMENT === 'production' ||
                   process.env.ENVIRONMENT === 'staging';
  
  if (!fs.existsSync(fullPath) || isHosted) {
    console.log('❌ Image not found in local assets or hosted environment detected:', fullPath);
    console.log('  Environment:', isHosted ? 'hosted' : 'local');
    console.log('  Available files in local assets:', fs.existsSync(blogAssetsDir) ? fs.readdirSync(blogAssetsDir) : 'Directory does not exist');
    
    if (isHosted) {
      console.log('🌐 Hosted environment detected - redirecting to S3 fallback');
      
      // For hosted environments, redirect to S3 since local assets aren't available
      const s3Url = `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${imagePath}`;
      console.log('🔄 Redirecting to S3:', s3Url);
      
      // Set proper headers for redirect
      res.setHeader('Location', s3Url);
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache redirect for 1 hour
      return res.redirect(302, s3Url);
    } else {
      // For local development, return 404 with helpful message
      return res.status(404).json({
        success: false,
        message: 'Image not found in local assets folder',
        requestedPath: req.url,
        fullPath: fullPath,
        assetsDir: blogAssetsDir,
        availableFiles: fs.existsSync(blogAssetsDir) ? fs.readdirSync(blogAssetsDir) : [],
        suggestion: 'Ensure the image is uploaded to src/assets/Blog/ folder or use S3 for hosted environments',
        environment: 'local'
      });
    }
  }
  
  console.log('✅ Image found, serving from local assets folder');
  
  // Get file stats and set appropriate headers
  try {
    const stats = fs.statSync(fullPath);
    const ext = path.extname(imagePath).toLowerCase();
    
    // Set appropriate content type
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.avif') contentType = 'image/avif';
    
    // Set headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    // Send the file
    res.sendFile(fullPath);
    
    console.log('✅ Image served successfully from local assets:', imagePath);
    
  } catch (error) {
    console.error('Error serving local image:', error);
    res.status(500).json({
      success: false,
      message: 'Error serving local image',
      error: error.message
    });
  }
});

// Database configuration
const dbConfig = {
  host: 'vardaanwebsites.c1womgmu83di.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'vardaanwebservices',
  database: 'vardaan_global',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);


// ==================== UTILITY FUNCTIONS ====================

// Generate SEO-friendly slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-'); // Remove leading/trailing hyphens
}

// Copy existing blog images from uploads to assets folder
async function migrateBlogImagesToAssets() {
  try {
    console.log('🔄 Starting migration of blog images to assets folder...');
    
    // Ensure assets directory exists
    if (!fs.existsSync(blogAssetsDir)) {
      fs.mkdirSync(blogAssetsDir, { recursive: true });
      console.log(`📁 Created assets directory: ${blogAssetsDir}`);
    }
    
    // Check if uploads directory exists and has images
    if (!fs.existsSync(blogImagesDir)) {
      console.log('⚠️ Uploads directory does not exist, nothing to migrate');
      return { success: false, message: 'Uploads directory does not exist' };
    }
    
    const uploadFiles = fs.readdirSync(blogImagesDir);
    const imageFiles = uploadFiles.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext);
    });
    
    console.log(`📋 Found ${imageFiles.length} image files to migrate`);
    
    let migratedCount = 0;
    let skippedCount = 0;
    
    for (const filename of imageFiles) {
      const sourcePath = path.join(blogImagesDir, filename);
      const destPath = path.join(blogAssetsDir, filename);
      
      // Check if file already exists in assets
      if (fs.existsSync(destPath)) {
        console.log(`⏭️ Skipping ${filename} - already exists in assets`);
        skippedCount++;
        continue;
      }
      
      try {
        // Copy the file
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Migrated: ${filename}`);
        migratedCount++;
      } catch (copyError) {
        console.error(`❌ Failed to migrate ${filename}:`, copyError.message);
      }
    }
    
    console.log(`🎉 Migration completed: ${migratedCount} migrated, ${skippedCount} skipped`);
    
    return {
      success: true,
      message: `Migration completed: ${migratedCount} migrated, ${skippedCount} skipped`,
      migrated: migratedCount,
      skipped: skippedCount,
      total: imageFiles.length
    };
    
  } catch (error) {
    console.error('❌ Error during image migration:', error);
    return {
      success: false,
      message: `Migration failed: ${error.message}`,
      error: error.message
    };
  }
}

// ==================== IMAGE/VIDEO ENDPOINTS ====================

// Note: CORS is now handled globally by the middleware above

// Test CORS endpoint
app.get('/cors-test', (req, res) => {
  console.log('=== CORS TEST ENDPOINT HIT ===');
  console.log('Origin:', req.headers.origin);
  console.log('Method:', req.method);
  console.log('All headers:', req.headers);
  
  // Set CORS headers explicitly for this test
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  res.json({ 
    success: true, 
    message: 'CORS test successful',
    origin: req.headers.origin,
    method: req.method,
    timestamp: new Date().toISOString(),
    corsHeaders: {
      'Access-Control-Allow-Origin': req.headers.origin || 'Not set',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
  });
});

// Test CORS with POST method
app.post('/cors-test-post', (req, res) => {
  console.log('=== CORS POST TEST ENDPOINT HIT ===');
  console.log('Origin:', req.headers.origin);
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  
  // Set CORS headers explicitly for this test
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  res.json({ 
    success: true, 
    message: 'CORS POST test successful',
    origin: req.headers.origin,
    method: req.method,
    bodyReceived: req.body,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  // Check if this is a hosted environment
  const isHosted = !fs.existsSync(blogAssetsDir) || 
                   blogAssetsDir.includes('/var/www') || 
                   blogAssetsDir.includes('/opt/') ||
                   blogAssetsDir.includes('/home/') ||
                   blogAssetsDir.includes('C:\\') ||
                   process.env.NODE_ENV === 'production' ||
                   process.env.HOSTED === 'true';
  
  res.json({ 
    success: true, 
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: isHosted ? 'hosted' : 'local',
    paths: {
      uploadsDir,
      blogImagesDir,
      assetsDir,
      blogAssetsDir,
      currentWorkingDir: process.cwd(),
      __dirname: __dirname
    },
    blogAssetsTest: {
      directory: blogAssetsDir,
      exists: fs.existsSync(blogAssetsDir),
      files: fs.existsSync(blogAssetsDir) ? fs.readdirSync(blogAssetsDir).length : 0,
      sampleFiles: fs.existsSync(blogAssetsDir) ? fs.readdirSync(blogAssetsDir).slice(0, 5) : [],
      environment: isHosted ? 'hosted' : 'local',
      note: isHosted ? 'Using S3 fallback for images' : 'Serving images from local assets folder'
    },
    cors: {
      allowedOrigins: [
        'https://vardaanglobal.com',
        'https://www.vardaanglobal.com',
        'https://vardaanglobal.vardaands.com',
        'https://www.vardaanglobal.vardaands.com',
        'https://api-vardaanglobal.vardaands.com',
        'https://vardaands.com',
        'https://www.vardaands.com',
        'http://localhost:3000',
        'http://localhost:3001'
      ]
    }
  });
});

// Test image serving endpoint
app.get('/test-image/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(blogImagesDir, filename);
    
    console.log('🧪 Testing image serving:', filename);
    console.log('  File path:', filePath);
    console.log('  File exists:', fs.existsSync(filePath));
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Image file not found',
        filename,
        filePath,
        availableFiles: fs.readdirSync(blogImagesDir)
      });
    }
    
    const stats = fs.statSync(filePath);
    res.json({
      success: true,
      message: 'Image file found',
      filename,
      filePath,
      fileSize: stats.size,
      fileSizeKB: (stats.size / 1024).toFixed(2),
      uploadsDir,
      blogImagesDir,
      availableFiles: fs.readdirSync(blogImagesDir)
    });
    
  } catch (error) {
    console.error('Error testing image:', error);
    res.status(500).json({
      success: false,
      message: 'Error testing image',
      error: error.message
    });
  }
});

// Quick test endpoint to check file system
app.get('/debug-filesystem', (req, res) => {
  try {
    console.log('🔍 Debugging filesystem...');
    console.log('  Current directory:', process.cwd());
    console.log('  __dirname:', __dirname);
    console.log('  Uploads directory:', uploadsDir);
    console.log('  Blog images directory:', blogImagesDir);
    
    const uploadsExists = fs.existsSync(uploadsDir);
    const blogImagesExists = fs.existsSync(blogImagesDir);
    
    let uploadsContents = [];
    let blogImagesContents = [];
    
    if (uploadsExists) {
      uploadsContents = fs.readdirSync(uploadsDir);
    }
    
    if (blogImagesExists) {
      blogImagesContents = fs.readdirSync(blogImagesDir);
    }
    
    res.json({
      success: true,
      message: 'Filesystem debug info',
      currentDirectory: process.cwd(),
      __dirname: __dirname,
      uploadsDir,
      blogImagesDir,
      uploadsExists,
      blogImagesExists,
      uploadsContents,
      blogImagesContents,
      processEnv: {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV
      }
    });
    
  } catch (error) {
    console.error('Error debugging filesystem:', error);
    res.status(500).json({
      success: false,
      message: 'Error debugging filesystem',
      error: error.message
    });
  }
});

// Test direct image serving
app.get('/serve-image/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(blogImagesDir, filename);
    
    console.log('🖼️  Serving image directly:', filename);
    console.log('  File path:', filePath);
    console.log('  File exists:', fs.existsSync(filePath));
    console.log('  Absolute file path:', path.resolve(filePath));
    console.log('  Current working directory:', process.cwd());
    console.log('  __dirname:', __dirname);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Image file not found',
        filename,
        filePath,
        absolutePath: path.resolve(filePath),
        currentWorkingDir: process.cwd(),
        __dirname: __dirname,
        availableFiles: fs.existsSync(blogImagesDir) ? fs.readdirSync(blogImagesDir) : []
      });
    }
    
    // Serve the image file directly
    res.sendFile(filePath);
    
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({
      success: false,
      message: 'Error serving image',
      error: error.message
    });
  }
});

// Create a test image to verify file system
app.get('/create-test-image', (req, res) => {
  try {
    console.log('🖼️  Creating test image...');
    
    // Create a simple test image (1x1 pixel PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00,
      0xFF, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0xE2, 0x21, 0xBC, 0x33,
      0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    const testImagePath = path.join(blogImagesDir, 'test-image.png');
    fs.writeFileSync(testImagePath, testImageBuffer);
    
    console.log('  ✅ Test image created:', testImagePath);
    console.log('  File exists:', fs.existsSync(testImagePath));
    console.log('  File size:', fs.statSync(testImagePath).size, 'bytes');
    
    res.json({
      success: true,
      message: 'Test image created successfully',
      testImagePath,
      testImageUrl: `http://localhost:${process.env.PORT || 5000}/uploads/blog-images/test-image.png`,
      directUrl: `http://localhost:${process.env.PORT || 5000}/api/serve-image/test-image.png`
    });
    
  } catch (error) {
    console.error('Error creating test image:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating test image',
      error: error.message
    });
  }
});

// Test static file middleware directly
app.get('/api/test-static', (req, res) => {
  try {
    console.log('🧪 Testing static file middleware...');
    
    // Test if we can read a file directly
    const testFile = 'blog-1755585371538-172217150.png';
    const testFilePath = path.join(blogImagesDir, testFile);
    
    console.log('  Test file:', testFile);
    console.log('  Test file path:', testFilePath);
    console.log('  File exists:', fs.existsSync(testFilePath));
    
    if (!fs.existsSync(testFilePath)) {
      return res.status(404).json({
        success: false,
        message: 'Test file not found',
        testFile,
        testFilePath
      });
    }
    
    // Try to read the file
    const fileBuffer = fs.readFileSync(testFilePath);
    const fileStats = fs.statSync(testFilePath);
    
    console.log('  File read successfully');
    console.log('  File size:', fileStats.size, 'bytes');
    console.log('  Buffer length:', fileBuffer.length);
    
    // Set appropriate headers for image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', fileStats.size);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    // Send the file
    res.send(fileBuffer);
    
  } catch (error) {
    console.error('Error testing static file middleware:', error);
    res.status(500).json({
      success: false,
      message: 'Error testing static file middleware',
      error: error.message
    });
  }
});

// Test assets folder access and list available images
app.get('/api/test-assets', (req, res) => {
  try {
    console.log('🧪 Testing assets folder access...');
    console.log('  Assets directory:', assetsDir);
    console.log('  Blog assets directory:', blogAssetsDir);
    console.log('  Assets exists:', fs.existsSync(assetsDir));
    console.log('  Blog assets exists:', fs.existsSync(blogAssetsDir));
    console.log('  Current working directory:', process.cwd());
    console.log('  __dirname:', __dirname);
    
    if (!fs.existsSync(blogAssetsDir)) {
      return res.status(404).json({
        success: false,
        message: 'Blog assets directory not found',
        assetsDir,
        blogAssetsDir,
        currentWorkingDir: process.cwd(),
        __dirname: __dirname,
        pathStrategies: {
          relative: relativeBlogAssetsDir,
          cwd: cwdBlogAssetsDir,
          absolute: absoluteBlogAssetsDir
        }
      });
    }
    
    const files = fs.readdirSync(blogAssetsDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext);
    });
    
    console.log('  Total files in blog assets:', files.length);
    console.log('  Image files:', imageFiles.length);
    
    // Test if we can access a specific image
    let testImageAccess = null;
    if (imageFiles.length > 0) {
      const testImage = imageFiles[0];
      const testImagePath = path.join(blogAssetsDir, testImage);
      const testImageStats = fs.statSync(testImagePath);
      
      testImageAccess = {
        filename: testImage,
        path: testImagePath,
        size: testImageStats.size,
        sizeKB: (testImageStats.size / 1024).toFixed(2),
        url: `http://localhost:${process.env.PORT || 5000}/assets/Blog/${testImage}`,
        s3Fallback: `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${testImage}`,
        accessible: true
      };
    }
    
    res.json({
      success: true,
      message: 'Assets folder accessible',
      data: {
        assetsDir,
        blogAssetsDir,
        assetsExists: fs.existsSync(assetsDir),
        blogAssetsExists: fs.existsSync(blogAssetsDir),
        totalFiles: files.length,
        imageFiles: imageFiles.length,
        allFiles: files,
        imageFilesList: imageFiles,
        testImageAccess,
        currentWorkingDir: process.cwd(),
        __dirname: __dirname,
        pathStrategies: {
          relative: relativeBlogAssetsDir,
          cwd: cwdBlogAssetsDir,
          absolute: absoluteBlogAssetsDir
        }
      }
    });
    
  } catch (error) {
    console.error('Error testing assets folder:', error);
    res.status(500).json({
      success: false,
      message: 'Error testing assets folder',
      error: error.message,
      stack: error.stack
    });
  }
});

// Direct image serving test endpoint
app.get('/api/serve-asset-image/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const imagePath = path.join(blogAssetsDir, filename);
    
    console.log('🖼️ Direct asset image serving test:', filename);
    console.log('  Image path:', imagePath);
    console.log('  File exists:', fs.existsSync(imagePath));
    console.log('  Blog assets directory:', blogAssetsDir);
    
    if (!fs.existsSync(imagePath)) {
      console.log('❌ Image not found in local assets:', imagePath);
      
      // Check if this is a hosted environment (no local assets)
      const isHosted = !fs.existsSync(blogAssetsDir) || 
                       blogAssetsDir.includes('/var/www') || 
                       blogAssetsDir.includes('/opt/') ||
                       blogAssetsDir.includes('/home/') ||
                       blogAssetsDir.includes('C:\\') ||
                       process.env.NODE_ENV === 'production' ||
                       process.env.HOSTED === 'true';
      
      if (isHosted) {
        console.log('🌐 Hosted environment detected - redirecting to S3 fallback');
        
        // For hosted environments, redirect to S3 since local assets aren't available
        const s3Url = `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${filename}`;
        console.log('🔄 Redirecting to S3:', s3Url);
        return res.redirect(302, s3Url);
      } else {
        // For local development, return 404 with helpful message
        return res.status(404).json({
          success: false,
          message: 'Image not found in local assets folder',
          filename,
          imagePath,
          blogAssetsDir,
          availableFiles: fs.existsSync(blogAssetsDir) ? fs.readdirSync(blogAssetsDir) : [],
          suggestion: 'Ensure the image is uploaded to src/assets/Blog/ folder or use S3 for hosted environments',
          environment: 'local'
        });
      }
    }
    
    // Get file stats
    const stats = fs.statSync(imagePath);
    const ext = path.extname(filename).toLowerCase();
    
    // Set appropriate content type
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.avif') contentType = 'image/avif';
    
    // Set headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    // Send the file
    res.sendFile(imagePath);
    
    console.log('✅ Image served successfully from local assets:', filename);
    
  } catch (error) {
    console.error('Error serving local asset image:', error);
    
    // Check if this is a hosted environment
    const isHosted = !fs.existsSync(blogAssetsDir) || 
                     blogAssetsDir.includes('/var/www') || 
                     blogAssetsDir.includes('/opt/') ||
                     blogAssetsDir.includes('/home/') ||
                     blogAssetsDir.includes('C:\\') ||
                     process.env.NODE_ENV === 'production' ||
                     process.env.HOSTED === 'true';
    
    if (isHosted) {
      // Try S3 as final fallback for hosted environments
      const { filename } = req.params;
      const s3Url = `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${filename}`;
      console.log('🔄 Final fallback to S3 for hosted environment:', s3Url);
      return res.redirect(302, s3Url);
    } else {
      // Return error for local development
      res.status(500).json({
        success: false,
        message: 'Error serving local image',
        error: error.message,
        suggestion: 'Check if the image exists in src/assets/Blog/ folder'
      });
    }
  }
});

// Migrate blog images from uploads to assets folder
app.post('/api/admin/migrate-images', async (req, res) => {
  try {
    console.log('🔄 Image migration endpoint called');
    
    const result = await migrateBlogImagesToAssets();
    
    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        data: {
          migrated: result.migrated,
          skipped: result.skipped,
          total: result.total
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message,
        error: result.error
      });
    }
    
  } catch (error) {
    console.error('Error in image migration endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to migrate images',
      error: error.message
    });
  }
});

// Check status of both uploads and assets folders
app.get('/api/images/status', (req, res) => {
  try {
    console.log('📊 Checking image folders status...');
    
    const uploadsExists = fs.existsSync(uploadsDir);
    const blogImagesExists = fs.existsSync(blogImagesDir);
    const assetsExists = fs.existsSync(assetsDir);
    const blogAssetsExists = fs.existsSync(blogAssetsDir);
    
    let uploadsContents = [];
    let blogImagesContents = [];
    let assetsContents = [];
    let blogAssetsContents = [];
    
    if (uploadsExists) {
      uploadsContents = fs.readdirSync(uploadsDir);
    }
    
    if (blogImagesExists) {
      blogImagesContents = fs.readdirSync(blogImagesDir);
    }
    
    if (assetsExists) {
      assetsContents = fs.readdirSync(assetsDir);
    }
    
    if (blogAssetsExists) {
      blogAssetsContents = fs.readdirSync(blogAssetsDir);
    }
    
    const status = {
      uploads: {
        exists: uploadsExists,
        path: uploadsDir,
        contents: uploadsContents,
        count: uploadsContents.length
      },
      blogImages: {
        exists: blogImagesExists,
        path: blogImagesDir,
        contents: blogImagesContents,
        count: blogImagesContents.length
      },
      assets: {
        exists: assetsExists,
        path: assetsDir,
        contents: assetsContents,
        count: assetsContents.length
      },
      blogAssets: {
        exists: blogAssetsExists,
        path: blogAssetsDir,
        contents: blogAssetsContents,
        count: blogAssetsContents.length
      }
    };
    
    console.log('✅ Status check completed');
    
    res.json({
      success: true,
      message: 'Image folders status retrieved successfully',
      data: status
    });
    
  } catch (error) {
    console.error('Error checking image folders status:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking image folders status',
      error: error.message
    });
  }
});

// List all uploaded images
app.get('/api/images/list', (req, res) => {
  try {
    console.log('📋 Listing all uploaded images');
    console.log('  Uploads directory:', uploadsDir);
    console.log('  Blog images directory:', blogImagesDir);
    
    if (!fs.existsSync(blogImagesDir)) {
      return res.status(404).json({
        success: false,
        message: 'Blog images directory not found',
        blogImagesDir
      });
    }
    
    const files = fs.readdirSync(blogImagesDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext);
    });
    
    const imageDetails = imageFiles.map(file => {
      const filePath = path.join(blogImagesDir, file);
      const stats = fs.statSync(filePath);
      return {
        filename: file,
        filePath: filePath,
        fileSize: stats.size,
        fileSizeKB: (stats.size / 1024).toFixed(2),
        fileSizeMB: (stats.size / (1024 * 1024)).toFixed(2),
        extension: path.extname(file),
        uploadedAt: stats.mtime,
        url: `http://localhost:${process.env.PORT || 5000}/uploads/blog-images/${file}`,
        testUrl: `http://localhost:${process.env.PORT || 5000}/api/test-image/${file}`
      };
    });
    
    res.json({
      success: true,
      message: 'Images listed successfully',
      totalImages: imageDetails.length,
      uploadsDir,
      blogImagesDir,
      images: imageDetails
    });
    
  } catch (error) {
    console.error('Error listing images:', error);
    res.status(500).json({
      success: false,
      message: 'Error listing images',
      error: error.message
    });
  }
});

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    res.json({ success: true, message: 'Database connected' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all images from database with proper URL generation
app.get('/api/images', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM media_library');
    
    // Update URLs to use the correct server address
    const imagesWithUrls = rows.map(image => {
      let imageUrl = image.s3_url;
      
      // If the image is stored locally, generate the correct URL
      if (image.s3_url && image.s3_url.includes('/uploads/')) {
        const filename = path.basename(image.s3_url);
        const host = req.get('host');
        const protocol = req.protocol;
        
        if (host.includes('localhost') || host.includes('127.0.0.1')) {
          const port = process.env.PORT || 5000;
          imageUrl = `${protocol}://localhost:${port}/uploads/blog-images/${filename}`;
        } else {
          imageUrl = `${protocol}://${host}/uploads/blog-images/${filename}`;
        }
      }
      
      return {
        ...image,
        s3_url: imageUrl,
        local_url: imageUrl // Add local_url for compatibility
      };
    });
    
    res.json({ success: true, data: imagesWithUrls });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get image by name with proper URL generation
app.get('/api/images/name/:imageName', async (req, res) => {
  try {
    const { imageName } = req.params;
    if (!imageName) {
      return res.status(400).json({ success: false, message: 'Image name is required' });
    }
    
    const [rows] = await pool.execute(
      'SELECT * FROM media_library WHERE original_name = ?',
      [imageName]
    );
    
    if (rows.length > 0) {
      const image = rows[0];
      
      // Generate proper URL
      let imageUrl = image.s3_url;
      if (image.s3_url && image.s3_url.includes('/uploads/')) {
        const filename = path.basename(image.s3_url);
        const host = req.get('host');
        const protocol = req.protocol;
        
        if (host.includes('localhost') || host.includes('127.0.0.1')) {
          const port = process.env.PORT || 5000;
          imageUrl = `${protocol}://localhost:${port}/uploads/blog-images/${filename}`;
        } else {
          imageUrl = `${protocol}://${host}/uploads/blog-images/${filename}`;
        }
      }
      
      const imageWithUrl = {
        ...image,
        s3_url: imageUrl,
        local_url: imageUrl
      };
      
      res.json({ success: true, data: imageWithUrl });
    } else {
      res.status(404).json({ success: false, message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== EMAIL CONFIGURATION ====================

// Gmail configuration
const GMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: 'vdatasciences@gmail.com',
    pass: 'oqox uvxq eees opnt' // Gmail App Password
  }
};

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_CONFIG.auth.user,
    pass: GMAIL_CONFIG.auth.pass
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter verification failed:', error);
  } else {
    console.log('✅ Email transporter is ready to send emails');
  }
});

// Function to send admin notification email
const sendAdminNotification = async (formData) => {
  try {
    const mailOptions = {
      from: `"Vardaan Global Contact Form" <${GMAIL_CONFIG.auth.user}>`,
      to: GMAIL_CONFIG.auth.user, // Send to admin email
      subject: `New Contact Form Submission - ${formData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2c3e50; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #3498db; }
            .footer { margin-top: 20px; padding: 10px; text-align: center; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.name || 'N/A'}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${formData.email || 'N/A'}</div>
              </div>
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">${formData.phone_number || 'N/A'}</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${formData.subject || 'N/A'}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${formData.message || 'N/A'}</div>
              </div>
              <div class="field">
                <div class="label">Submitted At:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated notification from Vardaan Global Contact Form.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending admin notification email:', error);
    return { success: false, error: error.message };
  }
};

// Function to send user confirmation email
const sendUserConfirmation = async (formData) => {
  try {
    const mailOptions = {
      from: `"Vardaan Global" <${GMAIL_CONFIG.auth.user}>`,
      to: formData.email, // Send to user's email
      subject: 'Thank You for Contacting Vardaan Global',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .message { margin: 20px 0; padding: 15px; background-color: white; border-left: 3px solid #3498db; }
            .footer { margin-top: 20px; padding: 10px; text-align: center; color: #777; font-size: 12px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Contacting Us!</h2>
            </div>
            <div class="content">
              <p>Dear ${formData.name || 'Valued Customer'},</p>
              
              <div class="message">
                <p>We have successfully received your contact form submission. Our team has been notified and will get back to you as soon as possible.</p>
                
                <p><strong>Your Submission Details:</strong></p>
                <ul>
                  <li><strong>Subject:</strong> ${formData.subject || 'N/A'}</li>
                  <li><strong>Submitted At:</strong> ${new Date().toLocaleString()}</li>
                </ul>
                
                <p>We appreciate your interest in Vardaan Global and look forward to assisting you.</p>
              </div>
              
              <p>If you have any urgent questions, please feel free to reach out to us directly.</p>
              
              <p>Best regards,<br>
              <strong>The Vardaan Global Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} Vardaan Global. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ User confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending user confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// ==================== CONTACT FORM ENDPOINTS ====================

// Validate contact form data
const validateContactForm = (formData) => {
  const errors = [];
  
  // Check for either 'name' or 'fullname' field
  const name = formData.name || formData.fullname;
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!formData.email || formData.email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Invalid email format');
    }
  }
  
  if (!formData.subject || formData.subject.trim().length === 0) {
    errors.push('Subject is required');
  }
  
  if (!formData.message || formData.message.trim().length === 0) {
    errors.push('Message is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Clean form data
const cleanFormData = (formData) => {
  return {
    name: formData.fullname?.trim() || formData.name?.trim() || '',
    email: formData.email?.trim() || '',
    subject: formData.subject?.trim() || formData.additionalSubject?.trim() || '',
    phone_number: formData.phone?.trim() || formData.phoneNumber?.trim() || '',
    message: formData.message?.trim() || ''
  };
};


// Note: CORS is now handled globally by the middleware above

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: `Validation failed: ${validation.errors.join(', ')}`
      });
    }

    // Clean and prepare data for database
    const cleanedData = cleanFormData(formData);
    
    // Insert into contact_us table
    const insertQuery = `
      INSERT INTO contact_us (name, email, subject, phone_number, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const insertParams = [
      cleanedData.name,
      cleanedData.email,
      cleanedData.subject,
      cleanedData.phone_number,
      cleanedData.message
    ];
    
    const result = await pool.execute(insertQuery, insertParams);
    const requestId = result[0].insertId;
    
    console.log('Contact form submitted successfully with ID:', requestId);
    
    // Send emails asynchronously (don't wait for them to complete)
    Promise.all([
      sendAdminNotification(cleanedData),
      sendUserConfirmation(cleanedData)
    ]).then(([adminResult, userResult]) => {
      if (adminResult.success) {
        console.log('✅ Admin notification email sent successfully');
      } else {
        console.error('❌ Failed to send admin notification email:', adminResult.error);
      }
      
      if (userResult.success) {
        console.log('✅ User confirmation email sent successfully');
      } else {
        console.error('❌ Failed to send user confirmation email:', userResult.error);
      }
    }).catch((error) => {
      console.error('❌ Error in email sending process:', error);
    });
    
    res.json({
      success: true,
      requestId: requestId,
      message: 'Contact form submitted successfully. You will receive a confirmation email shortly.'
    });
    
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit contact form'
    });
  }
});

// Get contact submission by ID
app.get('/api/contact/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    const query = `
      SELECT * FROM contact_us 
      WHERE request_id = ?
    `;
    
    const [rows] = await pool.execute(query, [requestId]);
    const result = rows.length > 0 ? rows[0] : null;
    
    if (result) {
      res.json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, message: 'Contact submission not found' });
    }
    
  } catch (error) {
    console.error('Error getting contact submission:', error);
    res.status(500).json({
      success: false,
      message: `Failed to get contact submission: ${error.message}`
    });
  }
});

// Get all contact submissions (for admin use)
app.get('/api/contact', async (req, res) => {
  try {
    const query = `
      SELECT * FROM contact_us 
      ORDER BY created_at DESC
    `;
    
    const [rows] = await pool.execute(query);
    res.json({ success: true, data: rows });
    
  } catch (error) {
    console.error('Error getting all contact submissions:', error);
    res.status(500).json({
      success: false,
      message: `Failed to get contact submissions: ${error.message}`
    });
  }
});

// ==================== BLOG DETAILS ENDPOINTS ====================

// Note: CORS is now handled globally by the middleware above

// Submit blog details form
app.post('/api/blog-details', async (req, res) => {
  try {
    const { name, email, phone_number, company, country } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone_number || !company || !country) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }
    
    // Clean and sanitize data
    const cleanedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone_number: phone_number.trim(),
      company: company.trim(),
      country: country.trim()
    };
    
    // Insert into blog_details table
    const insertQuery = `
      INSERT INTO blog_details (name, email, phone_number, company, country)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const insertParams = [
      cleanedData.name,
      cleanedData.email,
      cleanedData.phone_number,
      cleanedData.company,
      cleanedData.country
    ];
    
    const result = await pool.execute(insertQuery, insertParams);
    const requestId = result[0].insertId;
    
    console.log('Blog details submitted successfully with ID:', requestId);
    
    res.json({
      success: true,
      requestId: requestId,
      message: 'Blog details submitted successfully'
    });
    
  } catch (error) {
    console.error('Error submitting blog details:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit blog details'
    });
  }
});

// Get blog details by ID
app.get('/api/blog-details/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;
    const query = `
      SELECT * FROM blog_details 
      WHERE request_id = ?
    `;
    
    const [rows] = await pool.execute(query, [requestId]);
    const result = rows.length > 0 ? rows[0] : null;
    
    if (result) {
      res.json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, message: 'Blog details not found' });
    }
    
  } catch (error) {
    console.error('Error getting blog details:', error);
    res.status(500).json({
      success: false,
      message: `Failed to get blog details: ${error.message}`
    });
  }
});

// Get all blog details (for admin use)
app.get('/api/blog-details', async (req, res) => {
  try {
    const query = `
      SELECT * FROM blog_details 
      ORDER BY request_id DESC
    `;
    
    const [rows] = await pool.execute(query);
    res.json({ success: true, data: rows });
    
  } catch (error) {
    console.error('Error getting all blog details:', error);
    res.status(500).json({
      success: false,
      message: `Failed to get blog details: ${error.message}`
    });
  }
});

// ==================== BLOG ENDPOINTS ====================

// Get all blogs with their images
app.get('/blogs', async (req, res) => {
  try {
    // Get all blogs
    const [blogs] = await pool.execute(`
      SELECT 
        b.blog_id,
        b.title,
        b.content,
        b.author,
        b.category,
        b.created_at,
        b.updated_at,
        b.slug
      FROM blogs b
      ORDER BY b.created_at DESC
    `);

    // Get images for each blog
    const blogsWithImages = await Promise.all(
      blogs.map(async (blog) => {
        const [images] = await pool.execute(`
          SELECT 
            bi.image_id,
            bi.image_url,
            bi.sort_order
          FROM blog_images bi
          WHERE bi.blog_id = ?
          ORDER BY bi.sort_order ASC
        `, [blog.blog_id]);

        return {
          ...blog,
          images: images,
          // Use the first image as the main image for display
          image: images.length > 0 ? images[0].image_url : null
        };
      })
    );

    res.json({ success: true, data: blogsWithImages });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: `Failed to fetch blogs: ${error.message}`
    });
  }
});

// Get a specific blog by ID with its images
app.get('/blogs/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;
    
    // Check if blogId is a number (ID) or string (slug)
    const isNumeric = !isNaN(blogId) && !isNaN(parseFloat(blogId));
    
    let query, params;
    if (isNumeric) {
      // Search by ID
      query = `
        SELECT 
          b.blog_id,
          b.title,
          b.content,
          b.author,
          b.category,
          b.created_at,
          b.updated_at,
          b.slug
        FROM blogs b
        WHERE b.blog_id = ?
      `;
      params = [blogId];
    } else {
      // Search by slug
      query = `
        SELECT 
          b.blog_id,
          b.title,
          b.content,
          b.author,
          b.category,
          b.created_at,
          b.updated_at,
          b.slug
        FROM blogs b
        WHERE b.slug = ?
      `;
      params = [blogId];
    }
    
    const [blogs] = await pool.execute(query, params);

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    const blog = blogs[0];

    // Get images for this blog
    const [images] = await pool.execute(`
      SELECT 
        bi.image_id,
        bi.image_url,
        bi.sort_order
      FROM blog_images bi
      WHERE bi.blog_id = ?
      ORDER BY bi.sort_order ASC
    `, [blog.blog_id]);

    const blogWithImages = {
      ...blog,
      images: images,
      image: images.length > 0 ? images[0].image_url : null
    };

    res.json({ success: true, data: blogWithImages });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: `Failed to fetch blog: ${error.message}`
    });
  }
});

// ==================== ADMIN BLOG ENDPOINTS ====================

// Note: CORS is now handled globally by the middleware above

// Reset blog ID auto-increment (for development)
app.post('/api/admin/reset-blog-ids', async (req, res) => {
  try {
    // Delete all blogs and reset auto-increment
    await pool.execute('DELETE FROM blog_images');
    await pool.execute('DELETE FROM blogs');
    await pool.execute('ALTER TABLE blogs AUTO_INCREMENT = 1');
    
    console.log('Blog IDs reset successfully');
    
    res.json({
      success: true,
      message: 'Blog IDs reset successfully'
    });
    
  } catch (error) {
    console.error('Error resetting blog IDs:', error);
    res.status(500).json({
      success: false,
      message: `Failed to reset blog IDs: ${error.message}`
    });
  }
});

// Note: CORS is now handled globally by the middleware above

// Create a new blog post with image handling
app.post('/api/admin/blogs', uploadArray, async (req, res) => {
  try {
    console.log('=== BLOG CREATION REQUEST ===');
    console.log('Request headers:', req.headers);
    console.log('Request origin:', req.headers.origin);
    console.log('Request method:', req.method);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Content-Length:', req.headers['content-length']);
    console.log('Received request body:', req.body);
    console.log('Content length received:', req.body.content ? req.body.content.length : 'No content');
    console.log('Content preview:', req.body.content ? req.body.content.substring(0, 200) + '...' : 'No content');
    console.log('Received files:', req.files);
    
    // Ensure CORS headers are set for this response
    if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Check if we have text fields
    if (!req.body.title || !req.body.content || !req.body.author || !req.body.category) {
      console.log('Missing fields:', { 
        title: !!req.body.title, 
        content: !!req.body.content, 
        author: !!req.body.author, 
        category: !!req.body.category 
      });
      return res.status(400).json({
        success: false,
        message: 'Title, content, author, and category are required'
      });
    }
    
    const { title, content, author, category } = req.body;
    
    // Generate slug from title
    const slug = generateSlug(title);
    
    // Insert new blog
    const insertQuery = `
      INSERT INTO blogs (title, content, author, category, slug)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const insertParams = [title, content, author, category, slug];
    
    const result = await pool.execute(insertQuery, insertParams);
    const blogId = result[0].insertId;
    
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      console.log(`Processing ${req.files.length} uploaded images`);
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        
        // Store just the filename in the database - the frontend will construct the full URL
        const imageUrl = file.filename;
        
        console.log(`Image ${i + 1}: ${file.filename} -> ${imageUrl}`);
        console.log(`  File path: ${path.join(blogImagesDir, file.filename)}`);
        console.log(`  File exists: ${fs.existsSync(path.join(blogImagesDir, file.filename))}`);
        
        // Copy the uploaded image to the assets folder for serving
        try {
          const sourcePath = path.join(blogImagesDir, file.filename);
          const destPath = path.join(blogAssetsDir, file.filename);
          
          // Ensure the assets directory exists
          if (!fs.existsSync(blogAssetsDir)) {
            fs.mkdirSync(blogAssetsDir, { recursive: true });
            console.log(`📁 Created assets directory: ${blogAssetsDir}`);
          }
          
          // Copy the file
          fs.copyFileSync(sourcePath, destPath);
          console.log(`📋 Copied image to assets folder: ${destPath}`);
          console.log(`  Assets file exists: ${fs.existsSync(destPath)}`);
          
        } catch (copyError) {
          console.error(`❌ Error copying image to assets folder:`, copyError);
          // Continue with the process even if copying fails
        }
        
        // Insert image into blog_images table with just the filename
        const imageQuery = `
          INSERT INTO blog_images (blog_id, image_url, sort_order)
          VALUES (?, ?, ?)
        `;
        
        const imageResult = await pool.execute(imageQuery, [blogId, imageUrl, i + 1]);
        console.log(`Image inserted with ID: ${imageResult[0].insertId}`);
        
        // Also store in media_library table for asset service compatibility
        const mediaQuery = `
          INSERT INTO media_library (original_name, s3_url, file_type, uploaded_at)
          VALUES (?, ?, ?, NOW())
          ON DUPLICATE KEY UPDATE 
          s3_url = VALUES(s3_url), 
          file_type = VALUES(file_type), 
          uploaded_at = NOW()
        `;
        
        await pool.execute(mediaQuery, [
          file.filename,
          imageUrl, // Store just filename for compatibility
          'image' // Use 'image' as file_type since it's an enum
        ]);
        console.log(`Media library entry created/updated for: ${file.filename}`);
      }
    } else {
      console.log('No images uploaded with this blog post');
    }
    
    console.log('Blog created successfully with ID:', blogId);
    
    // Get the created blog
    const [blogs] = await pool.execute(
      'SELECT * FROM blogs WHERE blog_id = ?',
      [blogId]
    );
    
    res.json({
      success: true,
      message: 'Blog created successfully',
      data: blogs[0]
    });
    
  } catch (error) {
    console.error('Error creating blog:', error);
    
    // Ensure CORS headers are set even for error responses
    if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    res.status(500).json({
      success: false,
      message: `Failed to create blog: ${error.message}`
    });
  }
});

// Note: CORS is now handled globally by the middleware above

// Create blog image
app.post('/api/admin/blog-images', uploadSingle, async (req, res) => {
  try {
    const { blog_id, sort_order } = req.body;
    
    // Store just the filename - the frontend will construct the full URL
    const image_url = req.file ? req.file.filename : null;
    
    // Validate required fields
    if (!blog_id || !image_url) {
      return res.status(400).json({
        success: false,
        message: 'Blog ID and image URL are required'
      });
    }
    
    // Check if blog exists
    const [blogs] = await pool.execute(
      'SELECT blog_id FROM blogs WHERE blog_id = ?',
      [blog_id]
    );
    
    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Insert image
    const insertQuery = `
      INSERT INTO blog_images (blog_id, image_url, sort_order)
      VALUES (?, ?, ?)
    `;
    
    const insertParams = [blog_id, image_url, sort_order || 1];
    
    const result = await pool.execute(insertQuery, insertParams);
    const imageId = result[0].insertId;
    
    console.log('Blog image created successfully with ID:', imageId);
    
    // Copy the uploaded image to the assets folder for serving
    if (req.file) {
      try {
        const sourcePath = path.join(blogImagesDir, req.file.filename);
        const destPath = path.join(blogAssetsDir, req.file.filename);
        
        // Ensure the assets directory exists
        if (!fs.existsSync(blogAssetsDir)) {
          fs.mkdirSync(blogAssetsDir, { recursive: true });
          console.log(`📁 Created assets directory: ${blogAssetsDir}`);
        }
        
        // Copy the file
        fs.copyFileSync(sourcePath, destPath);
        console.log(`📋 Copied image to assets folder: ${destPath}`);
        console.log(`  Assets file exists: ${fs.existsSync(destPath)}`);
        
      } catch (copyError) {
        console.error(`❌ Error copying image to assets folder:`, copyError);
        // Continue with the process even if copying fails
      }
    }
    
    // Also store in media_library table for asset service compatibility
    if (req.file) {
      const mediaQuery = `
        INSERT INTO media_library (original_name, s3_url, file_type, uploaded_at)
        VALUES (?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE 
        s3_url = VALUES(s3_url), 
        file_type = VALUES(file_type), 
        uploaded_at = NOW()
      `;
      
      await pool.execute(mediaQuery, [
        req.file.filename,
        image_url, // Store just filename for compatibility
        'image' // Use 'image' as file_type since it's an enum
      ]);
      console.log(`Media library entry created/updated for: ${req.file.filename}`);
    }
    
    res.json({
      success: true,
      message: 'Blog image created successfully',
      data: { image_id: imageId, blog_id, image_url, sort_order: sort_order || 1 }
    });
    
  } catch (error) {
    console.error('Error creating blog image:', error);
    res.status(500).json({
      success: false,
      message: `Failed to create blog image: ${error.message}`
    });
  }
});

// Note: CORS is now handled globally by the middleware above

// Update blog post
app.put('/api/admin/blogs/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content, author, category } = req.body;
    
    // Check if blog exists
    const [blogs] = await pool.execute(
      'SELECT blog_id FROM blogs WHERE blog_id = ?',
      [blogId]
    );
    
    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Generate new slug from title
    const slug = generateSlug(title);
    
    // Update blog
    const updateQuery = `
      UPDATE blogs 
      SET title = ?, content = ?, author = ?, category = ?, slug = ?, updated_at = CURRENT_TIMESTAMP
      WHERE blog_id = ?
    `;
    
    const updateParams = [title, content, author, category, slug, blogId];
    
    await pool.execute(updateQuery, updateParams);
    
    console.log('Blog updated successfully:', blogId);
    
    res.json({
      success: true,
      message: 'Blog updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      success: false,
      message: `Failed to update blog: ${error.message}`
    });
  }
});

// Note: CORS is now handled globally by the middleware above

// Delete blog post
app.delete('/api/admin/blogs/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;
    
    // Check if blog exists
    const [blogs] = await pool.execute(
      'SELECT blog_id FROM blogs WHERE blog_id = ?',
      [blogId]
    );
    
    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Delete blog (images will be deleted automatically due to CASCADE)
    await pool.execute('DELETE FROM blogs WHERE blog_id = ?', [blogId]);
    
    console.log('Blog deleted successfully:', blogId);
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: `Failed to delete blog: ${error.message}`
    });
  }
});

// ==================== CORS TEST ENDPOINT ====================

// CORS test endpoint for debugging
app.get('/api/cors-test', (req, res) => {
  console.log('CORS test endpoint called');
  console.log('Origin:', req.headers.origin);
  console.log('Method:', req.method);
  
  res.json({
    success: true,
    message: 'CORS test successful',
    timestamp: new Date().toISOString(),
    origin: req.headers.origin,
    method: req.method,
    corsHeaders: {
      'Access-Control-Allow-Origin': res.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Credentials': res.get('Access-Control-Allow-Credentials'),
      'Access-Control-Allow-Methods': res.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': res.get('Access-Control-Allow-Headers')
    }
  });
});

// Note: CORS is now handled globally by the middleware above

// ==================== PRODUCT PRICING ENDPOINT ====================

// Product pricing inquiry endpoint
app.post('/api/product-pricing', async (req, res) => {
  try {
    const formData = req.body;
    
    console.log('📧 Product pricing inquiry received:', {
      productCode: formData.product_code,
      productName: formData.product_name,
      customerName: formData.name,
      customerEmail: formData.email,
      company: formData.company,
      country: formData.country
    });
    
    // Here you would typically save to database and send email
    // For now, we'll just log and return success
    
    // Log the inquiry (replace with your actual logic)
    console.log('📊 Pricing inquiry details:', formData);
    
    res.json({
      success: true,
      message: '🎉 Your pricing inquiry has been successfully submitted! Our team will review your requirements and get back to you within 24 hours with a personalized quote.',
      inquiryId: Date.now() // Replace with actual database ID
    });
    
  } catch (error) {
    console.error('❌ Error in product pricing endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit pricing inquiry',
      error: error.message
    });
  }
});

// ==================== WHITEPAPER ENDPOINTS ====================

// Submit whitepaper download form
app.post('/api/whitepaper-submit', async (req, res) => {
  try {
    const { name, email, mobile_number, entity_type } = req.body;
    
    console.log('📄 Whitepaper submission received:', {
      name,
      email,
      mobile_number,
      entity_type
    });
    
    // Validate required fields
    if (!name || !email || !mobile_number || !entity_type) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }
    
    // Clean and sanitize data
    const cleanedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile_number: mobile_number.trim(),
      entity_type: entity_type.trim()
    };
    
    // Insert into whitepaper_submissions table
    // Try vardaan_ds database first, fallback to vardaan_global
    const insertQuery = `
      INSERT INTO whitepaper_submissions (name, email, mobile_number, entity_type, submitted_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    
    const insertParams = [
      cleanedData.name,
      cleanedData.email,
      cleanedData.mobile_number,
      cleanedData.entity_type
    ];
    
    let result;
    let submissionId;
    
    // Try vardaan_ds database first
    try {
      const vardaanDsConfig = {
        ...dbConfig,
        database: 'vardaan_ds'
      };
      const vardaanDsPool = mysql.createPool(vardaanDsConfig);
      result = await vardaanDsPool.execute(insertQuery, insertParams);
      submissionId = result[0].insertId;
      await vardaanDsPool.end();
      console.log('✅ Whitepaper submission saved to vardaan_ds with ID:', submissionId);
    } catch (dsError) {
      // If vardaan_ds doesn't exist or table doesn't exist, try vardaan_global
      console.log('⚠️ vardaan_ds database not available, trying vardaan_global:', dsError.message);
      
      // Ensure table exists in vardaan_global
      try {
        await pool.execute(`
          CREATE TABLE IF NOT EXISTS whitepaper_submissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            mobile_number VARCHAR(50) NOT NULL,
            entity_type VARCHAR(100) NOT NULL,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_submitted_at (submitted_at)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
      } catch (createError) {
        console.log('Table may already exist or creation failed:', createError.message);
      }
      
      // Insert into vardaan_global
      result = await pool.execute(insertQuery, insertParams);
      submissionId = result[0].insertId;
      console.log('✅ Whitepaper submission saved to vardaan_global with ID:', submissionId);
    }
    
    res.json({
      success: true,
      submissionId: submissionId,
      message: 'Whitepaper submission recorded successfully'
    });
    
  } catch (error) {
    console.error('❌ Error submitting whitepaper form:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit whitepaper form'
    });
  }
});

// Download whitepaper PDF
app.get('/api/whitepaper-download', async (req, res) => {
  try {
    console.log('📥 Whitepaper download requested');
    
    // Try multiple possible paths for the PDF file
    const possiblePaths = [
      path.join(__dirname, '..', 'pages', 'Products', 'GRC', 'Riskavaire.pdf'),
      path.join(__dirname, '..', '..', 'src', 'pages', 'Products', 'GRC', 'Riskavaire.pdf'),
      path.join(process.cwd(), 'src', 'pages', 'Products', 'GRC', 'Riskavaire.pdf'),
      path.join(process.cwd(), 'public', 'Riskavaire.pdf')
    ];
    
    let pdfPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        pdfPath = testPath;
        console.log('✅ PDF found at:', pdfPath);
        break;
      }
    }
    
    // Check if file exists
    if (!pdfPath) {
      console.error('❌ PDF file not found. Tried paths:', possiblePaths);
      return res.status(404).json({
        success: false,
        message: 'Whitepaper PDF not found',
        triedPaths: possiblePaths.map(p => path.resolve(p))
      });
    }
    
    // Get file stats
    const stats = fs.statSync(pdfPath);
    
    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="RiskaVaire-Whitepaper.pdf"');
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'no-cache');
    
    // Send the file
    const fileStream = fs.createReadStream(pdfPath);
    fileStream.pipe(res);
    
    console.log('✅ Whitepaper PDF sent successfully');
    
  } catch (error) {
    console.error('❌ Error downloading whitepaper:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to download whitepaper'
    });
  }
});

// ==================== ViCTAA PRICING ENDPOINT ====================

// ViCTAA pricing endpoint with IP detection
app.get('/api/victaa-pricing', async (req, res) => {
  try {
    const { country } = req.query;
    
    // Get client IP address
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
    
    // Get user agent and other request info
    const userAgent = req.headers['user-agent'] || 'unknown';
    const origin = req.headers.origin || 'unknown';
    
    console.log('🌍 ViCTAA pricing request:', {
      country,
      clientIP,
      userAgent: userAgent.substring(0, 100),
      origin
    });
    
    // Determine user country from query parameter or IP
    let userCountry = country || 'US';
    let userCurrency = 'USD';
    
    // If no country specified, try to detect from IP
    if (!country) {
      try {
        // Simple IP-based country detection (you can enhance this)
        // For now, we'll use a basic approach
        if (clientIP && clientIP !== 'unknown') {
          // You can integrate with a proper IP geolocation service here
          // For now, we'll use a fallback approach
          userCountry = 'US';
          userCurrency = 'USD';
        }
      } catch (ipError) {
        console.log('⚠️ IP detection failed, using default:', ipError.message);
      }
    }
    
    // Set currency based on country
    if (userCountry === 'IN') {
      userCurrency = 'INR';
    }
    
    // Mock pricing data (replace with your actual pricing logic)
    const pricingData = {
      plans: {
        'shield-lite': {
          name: 'Shield Lite',
          deviceRange: '10-100 devices',
          pricing: {
            'monthly': { price: 15, currency: userCurrency, discountPercentage: 0 },
            '1-year': { price: userCurrency === 'INR' ? 1245 : 12.5, currency: userCurrency, discountPercentage: 17 },
            '2-year': { price: userCurrency === 'INR' ? 1125 : 11.25, currency: userCurrency, discountPercentage: 25 },
            '3-year': { price: userCurrency === 'INR' ? 975 : 9.75, currency: userCurrency, discountPercentage: 35 }
          }
        },
        'shield-pro': {
          name: 'Shield Pro',
          deviceRange: '101-500 devices',
          pricing: {
            'monthly': { price: 25, currency: userCurrency, discountPercentage: 0 },
            '1-year': { price: userCurrency === 'INR' ? 2075 : 20.75, currency: userCurrency, discountPercentage: 17 },
            '2-year': { price: userCurrency === 'INR' ? 1875 : 18.75, currency: userCurrency, discountPercentage: 25 },
            '3-year': { price: userCurrency === 'INR' ? 1625 : 16.25, currency: userCurrency, discountPercentage: 35 }
          }
        },
        'shield-scale': {
          name: 'Shield Scale',
          deviceRange: '501-1,000 devices',
          pricing: {
            'monthly': { price: 35, currency: userCurrency, discountPercentage: 0 },
            '1-year': { price: userCurrency === 'INR' ? 2900 : 29, currency: userCurrency, discountPercentage: 17 },
            '2-year': { price: userCurrency === 'INR' ? 2625 : 26.25, currency: userCurrency, discountPercentage: 25 },
            '3-year': { price: userCurrency === 'INR' ? 2275 : 22.75, currency: userCurrency, discountPercentage: 35 }
          }
        }
      },
      currency: userCurrency,
      country: userCountry
    };
    
    // Response with debug information
    const response = {
      success: true,
      message: 'ViCTAA pricing data retrieved successfully',
      data: pricingData,
      debug: {
        userCountry,
        userCurrency,
        clientIP,
        userAgent: userAgent.substring(0, 100),
        origin,
        timestamp: new Date().toISOString()
      }
    };
    
    console.log('✅ ViCTAA pricing response:', {
      userCountry,
      userCurrency,
      clientIP: clientIP.substring(0, 20) + '...'
    });
    
    res.json(response);
    
  } catch (error) {
    console.error('❌ Error in ViCTAA pricing endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve ViCTAA pricing data',
      error: error.message
    });
  }
});


// ==================== START SERVER ====================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Combined Server running on http://0.0.0.0:${PORT}`);
  console.log(`🌐 Server accessible from any IP address`);
  console.log(`🔒 CORS configured for: https://vardaanglobal.com, https://www.vardaanglobal.com`);
  console.log(`📏 Request size limits: JSON: 100MB, Files: 100MB`);
  console.log(`🔍 CORS debugging enabled`);
  console.log(`🌍 Allowed origins: https://vardaanglobal.com, https://www.vardaanglobal.com, https://api-vardaanglobal.vardaands.com, https://vardaands.com, http://localhost:3000, http://localhost:3001`);
  console.log(`📁 Image serving paths:`);
  console.log(`  Uploads: ${uploadsDir}`);
  console.log(`  Assets: ${assetsDir}`);
  console.log(`  Blog Assets: ${blogAssetsDir}`);
  console.log('\n📝 Available endpoints:');
  console.log('📸 Image/Video Endpoints:');
  console.log('  GET  /api/health - Server health check');
  console.log('  GET  /api/test - Test database connection');
  console.log('  GET  /api/images - Get all images');
  console.log('  GET  /api/images/name/:imageName - Get specific image');
  console.log('  GET  /api/images/list - List all uploaded images');
  console.log('  GET  /api/test-image/:filename - Test image serving');
  console.log('  GET  /api/images/status - Check image folders status');
  console.log('  POST /api/admin/migrate-images - Migrate images to assets folder');
  console.log('  GET  /assets/Blog/:filename - Serve images from local assets or S3 fallback');
  console.log('  GET  /api/test-assets - Test assets folder access');
  console.log('  GET  /api/test-blog-assets - Test Blog assets folder specifically');
  console.log('  GET  /api/serve-asset-image/:filename - Direct asset image serving with S3 fallback');
  console.log('  GET  /api/check-image/:filename - Check image availability and environment info');
  console.log('\n📧 Contact Form Endpoints:');
  console.log('  POST /api/contact - Submit contact form');
  console.log('  GET  /api/contact/:requestId - Get contact submission by ID');
  console.log('  GET  /api/contact - Get all contact submissions');
  console.log('\n📚 Blog Details Endpoints:');
  console.log('  POST /api/blog-details - Submit blog details form');
  console.log('  GET  /api/blog-details/:requestId - Get blog details by ID');
  console.log('  GET  /api/blog-details - Get all blog details');
  console.log('\n📖 Blog Endpoints:');
  console.log('  GET  /blogs - Get all blogs with images');
  console.log('  GET  /blogs/:blogId - Get specific blog with images');
  console.log('\n🔐 Admin Blog Endpoints:');
  console.log('  POST   /api/admin/blogs - Create new blog');
  console.log('  PUT    /api/admin/blogs/:blogId - Update blog');
  console.log('  DELETE /api/admin/blogs/:blogId - Delete blog');
  console.log('  POST   /api/admin/blog-images - Upload blog image');
  console.log('  POST   /api/admin/reset-blog-ids - Reset blog ID auto-increment');
  console.log('  GET    /blogs/:slug - Get blog by slug or ID');
  console.log('\n💰 Pricing Endpoints:');
  console.log('  GET  /api/victaa-pricing - Get ViCTAA pricing data');
  console.log('  POST /api/product-pricing - Submit product pricing inquiry');
  console.log('\n🌐 Server URL: http://localhost:5000');
});

// Check if a specific image exists and provide fallback options
app.get('/api/check-image/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    
    // Check local assets
    const localImagePath = path.join(blogAssetsDir, filename);
    const localExists = fs.existsSync(localImagePath);
    
    // Check uploads
    const uploadImagePath = path.join(blogImagesDir, filename);
    const uploadExists = fs.existsSync(uploadImagePath);
    
    // Check if this is a hosted environment
    const isHosted = !fs.existsSync(blogAssetsDir) || 
                     blogAssetsDir.includes('/var/www') || 
                     blogAssetsDir.includes('C:\\') ||
                     process.env.NODE_ENV === 'production' ||
                     process.env.HOSTED === 'true' ||
                     process.env.ENVIRONMENT === 'production' ||
                     process.env.ENVIRONMENT === 'staging';
    
    // S3 fallback URL (for hosted environments)
    const s3Url = `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${filename}`;
    
    // Local URLs
    const localAssetsUrl = `${req.protocol}://${req.get('host')}/assets/Blog/${filename}`;
    const localUploadsUrl = `${req.protocol}://${req.get('host')}/uploads/blog-images/${filename}`;
    const directApiUrl = `${req.protocol}://${req.get('host')}/api/serve-asset-image/${filename}`;
    
    const result = {
      success: true,
      filename,
      environment: isHosted ? 'hosted' : 'local',
      local: {
        assets: {
          exists: localExists,
          path: localImagePath,
          url: localAssetsUrl
        },
        uploads: {
          exists: uploadExists,
          path: uploadImagePath,
          url: localUploadsUrl
        }
      },
      fallbacks: {
        s3: s3Url,
        directApi: directApiUrl
      },
      recommended: isHosted ? s3Url : (localExists ? localAssetsUrl : localUploadsUrl),
      message: isHosted ? 
        'Hosted environment - using S3 fallback since local assets not available' :
        (localExists ? 'Local environment - image found in assets folder' : 'Local environment - image not found in assets folder')
    };
    
    res.json(result);
    
  } catch (error) {
    console.error('Error checking image:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking image',
      error: error.message
    });
  }
});

// Test endpoint to list Blog assets folder contents
app.get('/api/test-blog-assets', (req, res) => {
  try {
    console.log('🧪 Testing Blog assets folder access...');
    console.log('  Blog assets directory:', blogAssetsDir);
    console.log('  Directory exists:', fs.existsSync(blogAssetsDir));
    console.log('  Current working directory:', process.cwd());
    console.log('  __dirname:', __dirname);
    
    if (!fs.existsSync(blogAssetsDir)) {
      return res.status(404).json({
        success: false,
        message: 'Blog assets directory not found',
        blogAssetsDir,
        currentWorkingDir: process.cwd(),
        __dirname: __dirname
      });
    }
    
    const files = fs.readdirSync(blogAssetsDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext);
    });
    
    console.log('  Total files in Blog assets:', files.length);
    console.log('  Image files:', imageFiles.length);
    console.log('  All files:', files);
    
    // Test if we can access a specific image
    let testImageAccess = null;
    if (imageFiles.length > 0) {
      const testImage = imageFiles[0];
      const testImagePath = path.join(blogAssetsDir, testImage);
      const testImageStats = fs.statSync(testImagePath);
      
      testImageAccess = {
        filename: testImage,
        path: testImagePath,
        size: testImageStats.size,
        sizeKB: (testImageStats.size / 1024).toFixed(2),
        url: `${req.protocol}://${req.get('host')}/assets/Blog/${testImage}`,
        accessible: true
      };
    }
    
    res.json({
      success: true,
      message: 'Blog assets folder accessible',
      data: {
        blogAssetsDir,
        blogAssetsExists: fs.existsSync(blogAssetsDir),
        totalFiles: files.length,
        imageFiles: imageFiles.length,
        allFiles: files,
        imageFilesList: imageFiles,
        testImageAccess,
        currentWorkingDir: process.cwd(),
        __dirname: __dirname
      }
    });
    
  } catch (error) {
    console.error('Error testing Blog assets folder:', error);
    res.status(500).json({
      success: false,
      message: 'Error testing Blog assets folder',
      error: error.message,
      stack: error.stack
    });
  }
});

// Get optimized image URLs for blog posts
app.get('/api/blog-images/:filename/urls', (req, res) => {
  try {
    const { filename } = req.params;
    
    // Check if this is a hosted environment
    const isHosted = !fs.existsSync(blogAssetsDir) || 
                     blogAssetsDir.includes('/var/www') || 
                     blogAssetsDir.includes('C:\\') ||
                     process.env.NODE_ENV === 'production' ||
                     process.env.HOSTED === 'true' ||
                     process.env.ENVIRONMENT === 'production' ||
                     process.env.ENVIRONMENT === 'staging';
    
    // Check local availability
    const localAssetsPath = path.join(blogAssetsDir, filename);
    const localUploadsPath = path.join(blogImagesDir, filename);
    const localAssetsExists = fs.existsSync(localAssetsPath);
    const localUploadsExists = fs.existsSync(localUploadsPath);
    
    // Generate URLs in priority order
    let urls = [];
    
    if (isHosted) {
      // For hosted environments, prioritize S3
      urls = [
        `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${filename}`,
        `${req.protocol}://${req.get('host')}/assets/Blog/${filename}`,
        `${req.protocol}://${req.get('host')}/api/serve-asset-image/${filename}`,
        `${req.protocol}://${req.get('host')}/uploads/blog-images/${filename}`
      ];
    } else {
      // For local development, prioritize local assets
      if (localAssetsExists) {
        urls = [
          `${req.protocol}://${req.get('host')}/assets/Blog/${filename}`,
          `${req.protocol}://${req.get('host')}/api/serve-asset-image/${filename}`,
          `${req.protocol}://${req.get('host')}/uploads/blog-images/${filename}`,
          `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${filename}`
        ];
      } else if (localUploadsExists) {
        urls = [
          `${req.protocol}://${req.get('host')}/uploads/blog-images/${filename}`,
          `${req.protocol}://${req.get('host')}/api/serve-asset-image/${filename}`,
          `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${filename}`
        ];
      } else {
        // No local file, use S3 as fallback
        urls = [
          `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${filename}`,
          `${req.protocol}://${req.get('host')}/assets/Blog/${filename}`,
          `${req.protocol}://${req.get('host')}/api/serve-asset-image/${filename}`
        ];
      }
    }
    
    const result = {
      success: true,
      filename,
      environment: isHosted ? 'hosted' : 'local',
      localAvailability: {
        assets: localAssetsExists,
        uploads: localUploadsExists
      },
      urls: urls.map((url, index) => ({
        priority: index + 1,
        url: url,
        type: index === 0 ? 'primary' : 'fallback'
      })),
      recommended: urls[0],
      message: isHosted ? 
        'Hosted environment - S3 URL recommended' :
        (localAssetsExists ? 'Local environment - assets folder URL recommended' : 'Local environment - uploads folder URL recommended')
    };
    
    res.json(result);
    
  } catch (error) {
    console.error('Error getting image URLs:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting image URLs',
      error: error.message
    });
  }
}); 