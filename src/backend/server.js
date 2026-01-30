const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs-extra');
const { parsePhoneNumber } = require('libphonenumber-js');
const mime = require('mime-types');
const axios = require('axios');
require('dotenv').config();

// Import custom modules
const { RenderS3Client } = require('./s3Client');
const { submitLapsecPricing, submitProductPricing, getCurrency } = require('./pricingService');

const app = express();
const PORT = process.env.PORT || 10000;

// Configure CORS for production
const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
  
      const whitelist = [
        "https://vardaands.com",
        "https://www.vardaands.com",
        "http://72.61.243.113",
        "https://72.61.243.113",
        "https://vardaandatasciences.dbk39rik9ypyn.amplifyapp.com",
        /\.amplifyapp\.com$/,
        /\.amplifyaws\.com$/,
        /\.netlify\.app$/,
        /\.vercel\.app$/,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        process.env.FRONTEND_URL,
        process.env.PRODUCTION_URL
      ].filter(Boolean); // Remove undefined values
  
      const isAllowed = whitelist.some(entry => {
        if (typeof entry === 'string') {
          return origin === entry;
        } else if (entry instanceof RegExp) {
          return entry.test(origin);
        }
        return false;
      });
  
      if (isAllowed) {
        console.log('✅ CORS allowed for origin:', origin);
        callback(null, true);
      } else {
        console.log('❌ CORS blocked for origin:', origin);
        console.log('❌ Allowed origins:', whitelist);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
  
  app.use(cors(corsOptions));
  

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files (commented out for backend-only deployment)
// app.use('/static', express.static(path.join(__dirname, '../../build/static')));
// app.use('/assets', express.static(path.join(__dirname, '../../build/assets')));

// Database configuration with environment variable support
const DB_CONFIG = {
    host: process.env.DB_HOST || 'vardaanwebsites.c1womgmu83di.ap-south-1.rds.amazonaws.com',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'vardaanwebservices',
    database: process.env.DB_NAME || 'vardaan_ds',
    port: parseInt(process.env.DB_PORT) || 3306,
    charset: 'utf8mb4',
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

// Create connection pool with retry logic
let dbPool;
let dbConnectionAttempts = 0;
const MAX_DB_ATTEMPTS = 5;

async function initializeDatabaseConnection() {
    try {
        dbPool = mysql.createPool({
            ...DB_CONFIG,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            acquireTimeout: 60000,
            timeout: 60000,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });
        
        // Add connection pool event handlers
        dbPool.on('connection', (connection) => {
            console.log('✅ New database connection established');
            connection.on('error', (err) => {
                console.error('❌ Database connection error:', err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
                    console.log('🔄 Connection lost, will be reconnected automatically');
                }
            });
        });
        
        dbPool.on('acquire', (connection) => {
            // Connection acquired from pool
        });
        
        dbPool.on('release', (connection) => {
            // Connection released back to pool
        });
        
        // Test the connection
        const connection = await dbPool.getConnection();
        await connection.execute('SELECT 1');
        connection.release();
        
        console.log("✅ MySQL connection pool initialized successfully");
        console.log(`🗄️  Connected to: ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`);
        
        // Initialize database tables
        await initializeDatabase();
        
    } catch (error) {
        dbConnectionAttempts++;
        console.error(`❌ MySQL connection attempt ${dbConnectionAttempts} failed:`, error.message);
        
        if (dbConnectionAttempts < MAX_DB_ATTEMPTS) {
            console.log(`🔄 Retrying database connection in 5 seconds... (${dbConnectionAttempts}/${MAX_DB_ATTEMPTS})`);
            setTimeout(initializeDatabaseConnection, 5000);
        } else {
            console.error("❌ Max database connection attempts reached. Server will continue without database.");
            dbPool = null;
        }
    }
}

// Helper function to get a healthy database connection with retry logic
async function getHealthyConnection(maxRetries = 3) {
    if (!dbPool) {
        throw new Error('Database pool is not initialized');
    }
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const connection = await dbPool.getConnection();
            
            // Test the connection with a simple query
            try {
                await connection.execute('SELECT 1');
                return connection;
            } catch (testError) {
                // Connection is stale, release it and try again
                connection.release();
                if (attempt < maxRetries) {
                    console.log(`🔄 Connection test failed, retrying... (${attempt}/${maxRetries})`);
                    await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                    continue;
                }
                throw testError;
            }
        } catch (error) {
            if (attempt === maxRetries) {
                console.error(`❌ Failed to get healthy connection after ${maxRetries} attempts:`, error.message);
                throw error;
            }
            console.log(`🔄 Connection attempt ${attempt} failed, retrying...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

// Initialize database connection
initializeDatabaseConnection();

// Initialize database tables
async function initializeDatabase() {
    try {
        const connection = await dbPool.getConnection();
        
        // Database tables will be created as needed
        console.log("✅ Database connection ready");
        
        connection.release();
    } catch (error) {
        console.error("❌ Database initialization error:", error);
    }
}

// Email configuration
const EMAIL_CONFIG = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_HOST_USER || 'vdatasciences@gmail.com',
        pass: process.env.EMAIL_HOST_PASSWORD || 'oqox uvxq eees opnt' // Gmail App Password (no spaces)
    }
};

const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER || 'vdatasciences@gmail.com';

// Initialize S3 client
let s3Client;
try {
    console.log("🔧 Initializing S3 client...");
    console.log("  Render URL: https://aws-microservice.onrender.com");
    console.log("  Database config:", {
        host: DB_CONFIG.host,
        user: DB_CONFIG.user,
        database: DB_CONFIG.database,
        port: DB_CONFIG.port
    });
    
    s3Client = new RenderS3Client("https://aws-microservice.onrender.com", DB_CONFIG);
    console.log("✅ S3 client initialized successfully");
    
    // Test the client immediately
    s3Client.testConnection().then(result => {
        if (result.overall_success) {
            console.log("✅ S3 client connection test passed");
        } else {
            console.log("⚠️  S3 client connection test issues:");
            if (result.render_error) console.log("  Render:", result.render_error);
            if (result.mysql_error) console.log("  MySQL:", result.mysql_error);
        }
    }).catch(error => {
        console.error("❌ S3 client connection test failed:", error.message);
    });
    
} catch (error) {
    console.error("❌ S3 client initialization failed:", error.message);
    console.error("❌ Stack trace:", error.stack);
    s3Client = null;
}

// Utility functions
const sendHtmlEmail = async (toEmail, subject, htmlContent, textContent = null) => {
    try {
        const transporter = nodemailer.createTransport(EMAIL_CONFIG);
        
        const mailOptions = {
            from: EMAIL_CONFIG.auth.user,
            to: toEmail,
            subject: subject,
            text: textContent || htmlContent.replace(/<[^>]*>/g, ''),
            html: htmlContent
        };
        
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to ${toEmail}`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to send email to ${toEmail}:`, error);
        return false;
    }
};

const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};

const validatePhone = (phoneNumber, countryCode) => {
    try {
        const parsed = parsePhoneNumber(phoneNumber, countryCode);
        return parsed && parsed.isValid();
    } catch (error) {
        return false;
    }
};

// Get ViCTAA pricing data from database
const getVictaaPricing = async (req, res) => {
    try {
        console.log('🔄 === ViCTAA PRICING DETECTION START ===');
        console.log('📊 Fetching ViCTAA pricing data from database...');
        console.log('🌐 Request headers:', {
            'x-forwarded-for': req.headers['x-forwarded-for'],
            'x-real-ip': req.headers['x-real-ip'],
            'x-client-ip': req.headers['x-client-ip'],
            'user-agent': req.headers['user-agent'],
            'accept-language': req.headers['accept-language']
        });
        
        // Get user's country from IP address
        let userCountry = 'US'; // Default to US
        let userCurrency = 'USD'; // Default to USD
        
        // For testing purposes, let's also check for a query parameter
        const testCountry = req.query.country;
        if (testCountry) {
            userCountry = testCountry.toUpperCase();
            userCurrency = userCountry === 'IN' ? 'INR' : 'USD';
            console.log('🧪 Test mode - Using country from query param:', userCountry, 'Currency:', userCurrency);
        } else if (process.env.FORCE_INDIA === 'true') {
            // Environment variable override for testing
            userCountry = 'IN';
            userCurrency = 'INR';
            console.log('🧪 Environment override - Forcing India detection');
        } else {
            try {
                // Get client IP from various headers (for different proxy setups)
                let clientIP = req.headers['x-forwarded-for'] || 
                              req.headers['x-real-ip'] || 
                              req.headers['x-client-ip'] || 
                              req.connection.remoteAddress || 
                              req.socket.remoteAddress;
                
                // Clean up IP address (remove port if present)
                if (clientIP && clientIP.includes(':')) {
                    clientIP = clientIP.split(':')[0];
                }
                
                console.log('📍 Client IP detected:', clientIP);
                console.log('📍 All IP headers:', {
                    'x-forwarded-for': req.headers['x-forwarded-for'],
                    'x-real-ip': req.headers['x-real-ip'],
                    'x-client-ip': req.headers['x-client-ip'],
                    'remote-address': req.connection.remoteAddress,
                    'socket-remote-address': req.socket.remoteAddress
                });
                
                // For localhost/development, try to get real IP from external service
                if (!clientIP || clientIP === '::1' || clientIP === '127.0.0.1' || clientIP === 'localhost') {
                    console.log('🌍 Localhost detected, trying to get real IP...');
                    try {
                        // Get real IP from external service with no-cache headers
                        const ipResponse = await axios.get('https://api.ipify.org?format=json', {
                            headers: {
                                'Cache-Control': 'no-cache',
                                'Pragma': 'no-cache'
                            },
                            timeout: 5000
                        });
                        const realIP = ipResponse.data.ip;
                        console.log('🌍 Real IP from external service:', realIP);
                        
                        // Get geolocation for real IP with no-cache headers
                        const geoResponse = await axios.get(`https://ipapi.co/${realIP}/json/`, {
                            headers: {
                                'Cache-Control': 'no-cache',
                                'Pragma': 'no-cache'
                            },
                            timeout: 5000
                        });
                        const geoData = geoResponse.data;
                        
                        userCountry = geoData.country_code || 'US';
                        userCurrency = userCountry === 'IN' ? 'INR' : 'USD';
                        
                        console.log('🌍 Geolocation API response:', geoData);
                        console.log('🌍 Detected country:', userCountry, 'Currency:', userCurrency);
                    } catch (ipError) {
                        console.log('⚠️ Could not get real IP:', ipError.message);
                        console.log('🌍 Using default US/USD');
                    }
                } else {
                    console.log('🌍 Fetching geolocation data for IP:', clientIP);
                    try {
                        const response = await axios.get(`https://ipapi.co/${clientIP}/json/`, {
                            headers: {
                                'Cache-Control': 'no-cache',
                                'Pragma': 'no-cache'
                            },
                            timeout: 5000
                        });
                        const geoData = response.data;
                        
                        userCountry = geoData.country_code || 'US';
                        userCurrency = userCountry === 'IN' ? 'INR' : 'USD';
                        
                        console.log('🌍 Geolocation API response:', geoData);
                        console.log('🌍 Detected country:', userCountry, 'Currency:', userCurrency);
                    } catch (geoError) {
                        console.log('⚠️ Geolocation API failed:', geoError.message);
                        console.log('🌍 Using default US/USD due to geolocation failure');
                    }
                }
            } catch (geoError) {
                console.log('⚠️ Could not detect country from IP:', geoError.message);
                console.log('⚠️ Using default US/USD');
            }
        }
        
        // Additional check: If we're in development and IP detection fails, 
        // check if the request is coming from a known Indian IP range
        if (userCountry !== 'IN' && process.env.NODE_ENV === 'development') {
            console.log('🔍 Development mode: Checking for Indian IP patterns...');
            // You can add additional logic here to detect Indian IPs
        }
        
        // Manual override for India detection (for testing and development)
        // Check if user agent or other indicators suggest India
        const userAgent = req.headers['user-agent'] || '';
        const acceptLanguage = req.headers['accept-language'] || '';
        
        console.log('🔍 Checking for India indicators...');
        console.log('🔍 User agent:', userAgent);
        console.log('🔍 Accept language:', acceptLanguage);
        
        // If we're in development and IP detection fails, try to detect India from other indicators
        if (userCountry !== 'IN' && (process.env.NODE_ENV === 'development' || process.env.FORCE_INDIA_DETECTION === 'true')) {
            console.log('🔍 Checking for India indicators...');
            
            // Check for Indian timezone in headers (if available)
            const timezone = req.headers['x-timezone'] || '';
            
            // Check for Indian language preferences
            const hasIndianLanguage = acceptLanguage.includes('hi-IN') || 
                                    acceptLanguage.includes('en-IN') || 
                                    acceptLanguage.includes('ta-IN') ||
                                    acceptLanguage.includes('te-IN') ||
                                    acceptLanguage.includes('bn-IN');
            
            // Check for Indian user agent patterns
            const hasIndianUserAgent = userAgent.includes('India') || 
                                     userAgent.includes('IN') ||
                                     userAgent.includes('Indian');
            
            console.log('🔍 India indicators:', {
                hasIndianLanguage,
                hasIndianUserAgent,
                timezone,
                acceptLanguage: acceptLanguage.substring(0, 100) // First 100 chars
            });
            
            if (hasIndianLanguage || hasIndianUserAgent || timezone.includes('Asia/Kolkata')) {
                console.log('🇮🇳 India detected from user agent/language preferences');
                userCountry = 'IN';
                userCurrency = 'INR';
            }
        }
        
        console.log('🎯 Final currency decision:', userCountry, '->', userCurrency);
        console.log('💾 Connecting to database...');
        
        const connection = await dbPool.getConnection();
        console.log('✅ Database connection established');
        
        try {
            // Query to get pricing data for the user's currency
            console.log(`🔍 Querying database for currency: ${userCurrency}`);
            const query = `
                SELECT 
                    pricing_id,
                    country_code,
                    plan_name,
                    device_range_min,
                    device_range_max,
                    duration_type,
                    price,
                    currency,
                    discount_percentage,
                    support_level,
                    call_to_action,
                    pricing_type,
                    created_at,
                    updated_at
                FROM victaa_pricing 
                WHERE currency = ?
                ORDER BY plan_name, device_range_min, duration_type
            `;
            console.log('📝 SQL Query:', query);
            console.log('📝 Query parameters:', [userCurrency]);
            
            const [rows] = await connection.execute(query, [userCurrency]);
            
            console.log(`✅ Successfully fetched ${rows.length} pricing records for currency: ${userCurrency} (country: ${userCountry})`);
            console.log('📊 Raw database rows:', JSON.stringify(rows, null, 2));
            
            // Group pricing data by plan and duration for easier frontend consumption
            const pricingData = {
                plans: {},
                durations: ['Monthly', '1-Year', '2-Year', '3-Year', 'Launch']
            };
            
            rows.forEach(row => {
                const planKey = row.plan_name.toLowerCase().replace(/\s+/g, '-');
                // Map duration types to frontend keys
                let durationKey;
                switch(row.duration_type) {
                    case 'Monthly':
                        durationKey = 'monthly';
                        break;
                    case '1-Year':
                        durationKey = '1-year';
                        break;
                    case '2-Year':
                        durationKey = '2-year';
                        break;
                    case '3-Year':
                        durationKey = '3-year';
                        break;
                    case 'Launch':
                        durationKey = 'launch';
                        break;
                    default:
                        durationKey = row.duration_type.toLowerCase().replace(/\s+/g, '-');
                }
                
                console.log(`🔄 Processing: ${row.plan_name} -> ${planKey}, ${row.duration_type} -> ${durationKey}`);
                
                if (!pricingData.plans[planKey]) {
                    pricingData.plans[planKey] = {
                        name: row.plan_name,
                        deviceRange: `${row.device_range_min}-${row.device_range_max}`,
                        pricing: {}
                    };
                }
                
                pricingData.plans[planKey].pricing[durationKey] = {
                    price: parseFloat(row.price),
                    currency: row.currency,
                    discountPercentage: row.discount_percentage ? parseFloat(row.discount_percentage) : null,
                    supportLevel: row.support_level,
                    callToAction: row.call_to_action,
                    pricingType: row.pricing_type,
                    countryCode: row.country_code
                };
            });
            
            console.log('📊 Final pricing data structure:', JSON.stringify(pricingData, null, 2));
            console.log('🔄 === ViCTAA PRICING DETECTION END ===');
            
            // Set headers to prevent caching
            res.set({
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            
            res.json({
                success: true,
                data: pricingData,
                message: 'ViCTAA pricing data retrieved successfully',
                debug: {
                    userCountry,
                    userCurrency,
                    recordsFound: rows.length,
                    plansFound: Object.keys(pricingData.plans).length
                }
            });
            
        } finally {
            connection.release();
            console.log('🔌 Database connection released');
        }
        
    } catch (error) {
        console.error('❌ Error fetching ViCTAA pricing:', error);
        console.error('❌ Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch pricing data',
            error: error.message,
            debug: {
                userCountry: userCountry || 'unknown',
                userCurrency: userCurrency || 'unknown',
                error: error.message
            }
        });
    }
};

// Multer configuration for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Cache control middleware
app.use((req, res, next) => {
    if (req.path.startsWith('/static/') || req.path.startsWith('/assets/')) {
        res.set('Cache-Control', 'public, max-age=31536000');
    } else if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
        res.set('Cache-Control', 'public, max-age=86400');
    } else {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
    next();
});

// Routes

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Vardaan DS Unified API',
        version: '2.0.0',
        endpoints: {
            'POST /api/contact': 'Submit a contact form',
            'GET /api/contacts': 'Get all contact submissions (admin)',
            'GET /api/health': 'Health check',
            'GET /api/management-team': 'Get management team data',
            'GET /api/media': 'Get media files by category and type',
            'GET /api/media/categories': 'Get all available media categories',
            'GET /api/media/stats': 'Get media library statistics',
            'GET /api/media/debug': 'Debug endpoint for all media files',
            'GET /api/job-listings': 'Get active job listings',
            'POST /api/job-application': 'Submit job application with resume',
            'GET /api/nav-categories': 'Get navigation categories',
            'GET /api/nav-items': 'Get navigation items',
            'POST /api/lapsec-pricing': 'Submit Lapsec pricing inquiry',
            'POST /api/product-pricing': 'Submit general product pricing inquiry',
            'POST /api/subscribe-email': 'Subscribe to email newsletter',
            'GET /api/get-currency': 'Get currency based on IP',
            'GET /api/s3-operations': 'Get S3 file operations history',
            'GET /api/s3-stats': 'Get S3 operations statistics',
            'GET /api/s3-test': 'Test S3 connection and health',
            'GET /api/product-resources': 'Get all products with document counts',
            'GET /api/product-resources/:slug': 'Get specific product with documents by slug'
        },
        status: 'running',
        integrated_services: [
            'Contact Management',
            'Management Team API',
            'Media Library API',
            'Job Applications',
            'Navigation Management',
            'Product Pricing',
            'Email Subscriptions',
            'Static File Serving'
        ]
    });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
    let dbStatus = 'disconnected';
    let s3Status = 'disconnected';
    
    try {
        if (dbPool) {
            await dbPool.execute('SELECT 1');
            dbStatus = 'connected';
        }
    } catch (error) {
        console.error('Database health check failed:', error);
    }
    
    try {
        if (s3Client) {
            const testResult = await s3Client.testConnection();
            s3Status = testResult.overall_success ? 'connected' : 'failed';
        }
    } catch (error) {
        console.error('S3 health check failed:', error);
    }

    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        port: PORT,
        database: dbStatus,
        s3_service: s3Status,
        environment: process.env.NODE_ENV || 'development'
    });
});

// Import and use pricing routes
app.get('/api/get-currency', getCurrency);
app.get('/api/victaa-pricing', getVictaaPricing);
app.get('/api/victaa-pricing-debug', async (req, res) => {
    try {
        const connection = await dbPool.getConnection();
        try {
            const [rows] = await connection.execute('SELECT * FROM victaa_pricing LIMIT 10');
            res.json({
                success: true,
                data: rows,
                count: rows.length
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Debug endpoint to test IP detection
app.get('/api/debug-ip', async (req, res) => {
    try {
        // Get client IP from various headers
        let clientIP = req.headers['x-forwarded-for'] || 
                      req.headers['x-real-ip'] || 
                      req.headers['x-client-ip'] || 
                      req.connection.remoteAddress || 
                      req.socket.remoteAddress;
        
        // Clean up IP address
        if (clientIP && clientIP.includes(':')) {
            clientIP = clientIP.split(':')[0];
        }
        
        let geoData = null;
        let userCountry = 'US';
        let userCurrency = 'USD';
        
        if (clientIP && clientIP !== '::1' && clientIP !== '127.0.0.1' && clientIP !== 'localhost') {
            try {
                const response = await axios.get(`https://ipapi.co/${clientIP}/json/`);
                geoData = response.data;
                userCountry = geoData.country_code || 'US';
                userCurrency = userCountry === 'IN' ? 'INR' : 'USD';
            } catch (error) {
                geoData = { error: error.message };
            }
        }
        
        res.json({
            clientIP,
            geoData,
            detectedCountry: userCountry,
            detectedCurrency: userCurrency,
            headers: {
                'x-forwarded-for': req.headers['x-forwarded-for'],
                'x-real-ip': req.headers['x-real-ip'],
                'x-client-ip': req.headers['x-client-ip'],
                'remote-address': req.connection.remoteAddress
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/api/lapsec-pricing', submitLapsecPricing);
app.post('/api/product-pricing', submitProductPricing);

// S3 Operations tracking endpoints
app.get('/api/s3-operations', async (req, res) => {
    try {
        const { user_id, limit = 20 } = req.query;
        
        if (!s3Client) {
            return res.status(503).json({
                success: false,
                message: 'S3 client not available'
            });
        }
        
        const history = await s3Client.getOperationHistory(user_id, parseInt(limit));
        
        res.json({
            success: true,
            operations: history,
            count: history.length
        });
        
    } catch (error) {
        console.error('S3 operations history error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch operations history',
            error: error.message
        });
    }
});

app.get('/api/s3-stats', async (req, res) => {
    try {
        if (!s3Client) {
            return res.status(503).json({
                success: false,
                message: 'S3 client not available'
            });
        }
        
        const stats = await s3Client.getOperationStats();
        
        res.json({
            success: true,
            stats: stats
        });
        
    } catch (error) {
        console.error('S3 stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch S3 statistics',
            error: error.message
        });
    }
});

app.get('/api/s3-test', async (req, res) => {
    try {
        if (!s3Client) {
            return res.status(503).json({
                success: false,
                message: 'S3 client not initialized'
            });
        }
        
        const testResult = await s3Client.testConnection();
        
        res.json({
            success: testResult.overall_success,
            test_results: testResult
        });
        
    } catch (error) {
        console.error('S3 test error:', error);
        res.status(500).json({
            success: false,
            message: 'S3 test failed',
            error: error.message
        });
    }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
    let connection;
    
    try {
        const data = req.body;
        
        if (!data) {
            return res.status(400).json({
                success: false,
                message: 'No data provided'
            });
        }
        
        // Validate required fields
        const requiredFields = ['fullname', 'email', 'subject', 'message'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }
        
        const { fullname, email, phone = '', subject: rawSubject, otherSubject = '', message } = data;
        
        // Handle "others" subject case
        const subject = rawSubject.toLowerCase() === 'others' && otherSubject ? otherSubject : rawSubject;
        
        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        
        // Get database connection
        connection = await dbPool.getConnection();
        
        // Create table if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS contact_us (
                contact_id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone_number VARCHAR(20),
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Insert data
        const [result] = await connection.execute(
            'INSERT INTO contact_us (full_name, email, phone_number, subject, message) VALUES (?, ?, ?, ?, ?)',
            [fullname, email, phone, subject, message]
        );
        
        const contactId = result.insertId;
        
        // Send admin notification email
        const adminHtml = `
            <h2>New Contact Form Submission Received</h2>
            <p><strong>Contact ID:</strong> ${contactId}</p>
            <p><strong>Full Name:</strong> ${fullname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `;
        
        await sendHtmlEmail(EMAIL_RECEIVER, 'New Contact Form Submission Received', adminHtml);
        
        // Send confirmation email to customer
        const customerHtml = `
            <h2>Thank You for Contacting Vardaan Data Sciences!</h2>
            <p>Dear ${fullname},</p>
            <p>Thank you for contacting Vardaan Data Sciences! We have received your message and appreciate you taking the time to reach out to us.</p>
            <p><strong>Your inquiry details:</strong></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p>Our team will review your message and get back to you within 24-48 hours.</p>
            <p>Best regards,<br>The Vardaan Data Sciences Team</p>
        `;
        
        await sendHtmlEmail(email, 'Thank You for Contacting Vardaan Data Sciences!', customerHtml);
        
        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully',
            contact_id: contactId
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred'
        });
    } finally {
        if (connection) connection.release();
    }
});

// Get all contacts (admin)
app.get('/api/contacts', async (req, res) => {
    let connection;
    
    try {
        connection = await dbPool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM contact_us ORDER BY created_at DESC');
        
        res.json({
            success: true,
            contacts: rows
        });
        
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Database error occurred'
        });
    } finally {
        if (connection) connection.release();
    }
});

// Job listings
app.get('/api/job-listings', async (req, res) => {
    let connection;
    
    try {
        connection = await dbPool.getConnection();
        
        // Create table if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS job_listings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category VARCHAR(100) NOT NULL,
                type VARCHAR(50) NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                location VARCHAR(255),
                salary VARCHAR(100),
                tags TEXT,
                status ENUM('A', 'I') DEFAULT 'A',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        const [rows] = await connection.execute('SELECT id, category, type, title, description, tags FROM job_listings WHERE status = "A"');
        
        res.json({
            success: true,
            jobs: rows
        });
        
    } catch (error) {
        console.error('Job listings error:', error);
        res.status(500).json({
            success: false,
            message: 'Database error occurred'
        });
    } finally {
        if (connection) connection.release();
    }
});

// Navigation categories
app.get('/api/nav-categories', async (req, res) => {
    let connection;
    
    try {
        connection = await dbPool.getConnection();
        
        // Create table if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS nav_categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                display_order INT DEFAULT 0,
                status ENUM('A', 'I') DEFAULT 'A',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        const [rows] = await connection.execute('SELECT * FROM nav_categories ORDER BY display_order ASC');
        
        res.json({
            success: true,
            categories: rows
        });
        
    } catch (error) {
        console.error('Navigation categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Database error occurred'
        });
    } finally {
        if (connection) connection.release();
    }
});

// Navigation items
app.get('/api/nav-items', async (req, res) => {
    let connection;
    
    try {
        connection = await dbPool.getConnection();
        
        // Create table if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS nav_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category_id INT,
                name VARCHAR(100) NOT NULL,
                url VARCHAR(255) NOT NULL,
                display_order INT DEFAULT 0,
                status ENUM('A', 'I') DEFAULT 'A',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES nav_categories(id) ON DELETE SET NULL
            )
        `);
        
        const [rows] = await connection.execute('SELECT * FROM nav_items WHERE status = "A" ORDER BY category_id ASC, display_order ASC');
        
        res.json({
            success: true,
            items: rows
        });
        
    } catch (error) {
        console.error('Navigation items error:', error);
        res.status(500).json({
            success: false,
            message: 'Database error occurred'
        });
    } finally {
        if (connection) connection.release();
    }
});

// Job application submission
app.post('/api/job-application', upload.single('resume'), async (req, res) => {
    let connection;
    
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Resume file is required'
            });
        }
        
        const { firstName, lastName, email, phone, jobTitle = '' } = req.body;
        
        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        // Validate file type (optional but recommended)
        const allowedExtensions = ['.pdf', '.doc', '.docx'];
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            // Clean up uploaded file
            try {
                await fs.remove(req.file.path);
            } catch (cleanupError) {
                console.warn('Failed to cleanup invalid file:', cleanupError);
            }
            
            return res.status(400).json({
                success: false,
                message: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.'
            });
        }
        
        console.log(`📤 Processing job application for ${firstName} ${lastName} - ${email}`);
        console.log(`📄 Resume: ${req.file.originalname} (${req.file.size} bytes)`);
        
        // Check if S3 client is available
        if (!s3Client) {
            throw new Error('S3 client not initialized. Please check server startup logs.');
        }
        
        console.log('🌐 S3 client available, starting upload...');
        
        // Upload resume to S3 with category for better organization
        const uploadResult = await s3Client.upload(
            req.file.path, 
            email, 
            req.file.originalname, 
            'job-applications'
        );
        
        if (!uploadResult.success) {
            // Clean up uploaded file on failure
            try {
                await fs.remove(req.file.path);
            } catch (cleanupError) {
                console.warn('Failed to cleanup temp file after upload failure:', cleanupError);
            }
            
            return res.status(500).json({
                success: false,
                message: 'Failed to upload resume to S3',
                error: uploadResult.error,
                operation_id: uploadResult.operation_id
            });
        }
        
        const s3Url = uploadResult.file_info.url;
        const s3Key = uploadResult.file_info.s3Key;
        
        console.log(`✅ Resume uploaded to S3: ${s3Url}`);
        
        // Save to database
        connection = await dbPool.getConnection();
        
        // Create table if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS job_applications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                job_title VARCHAR(255),
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone_number VARCHAR(20) NOT NULL,
                resume_file_path TEXT NOT NULL,
                resume_s3_key VARCHAR(1000),
                resume_original_name VARCHAR(500),
                file_size BIGINT,
                s3_operation_id INT,
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status ENUM('pending', 'reviewed', 'shortlisted', 'rejected') DEFAULT 'pending',
                
                INDEX idx_email (email),
                INDEX idx_status (status),
                INDEX idx_submitted_at (submitted_at)
            )
        `);
        
        const [result] = await connection.execute(
            'INSERT INTO job_applications (job_title, first_name, last_name, email, phone_number, resume_file_path, resume_s3_key, resume_original_name, file_size, s3_operation_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [jobTitle, firstName, lastName, email, phone, s3Url, s3Key, req.file.originalname, req.file.size, uploadResult.operation_id]
        );
        
        const appId = result.insertId;
        
        console.log(`💾 Job application saved to database with ID: ${appId}`);
        
        // Clean up uploaded file
        try {
            await fs.remove(req.file.path);
        } catch (cleanupError) {
            console.warn('Failed to cleanup temp file:', cleanupError);
        }
        
        // Send notification emails
        const adminSubject = `New Job Application Received - ${jobTitle || 'General Application'}`;
        const adminHtml = `
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #3570f7; border-bottom: 2px solid #3570f7; padding-bottom: 10px;">
                    New Job Application Received
                </h2>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #222;">Application Details</h3>
                    <p><strong>Application ID:</strong> ${appId}</p>
                    <p><strong>S3 Operation ID:</strong> ${uploadResult.operation_id}</p>
                    <p><strong>Job Title:</strong> ${jobTitle || 'General Application'}</p>
                    <p><strong>Applicant Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Resume File:</strong> ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)</p>
                    <p><strong>Resume URL:</strong> <a href="${s3Url}" style="color: #3570f7;" target="_blank">Download Resume</a></p>
                    <p><strong>S3 Key:</strong> <code style="background: #f1f1f1; padding: 2px 4px; border-radius: 3px;">${s3Key}</code></p>
                    <p><strong>Submitted Date:</strong> ${new Date().toLocaleString()}</p>
                </div>
                <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; border-left: 4px solid #4caf50; margin: 20px 0;">
                    <p style="margin: 0;"><strong>✅ File Upload Status:</strong> Successfully uploaded to S3 cloud storage</p>
                    <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Platform: ${uploadResult.platform} | Database: ${uploadResult.database}</p>
                </div>
                <p style="background: #e3f2fd; padding: 15px; border-radius: 5px; border-left: 4px solid #2196f3;">
                    <strong>Action Required:</strong> Please review this application and respond to the candidate as soon as possible.
                </p>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                    <p>This is an automated notification from the Vardaan Data Sciences job application system.</p>
                    <p>File stored securely in AWS S3 with full operation tracking.</p>
                </div>
            </div>
        </body>
        </html>
        `;
        const adminText = `
A new job application has been received:

Application ID: ${appId}
S3 Operation ID: ${uploadResult.operation_id}
Job Title: ${jobTitle || 'General Application'}
Applicant Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Resume File: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)
Resume URL: ${s3Url}
S3 Key: ${s3Key}
Date: ${new Date().toLocaleString()}

File Upload Status: ✅ Successfully uploaded to S3 cloud storage
Platform: ${uploadResult.platform} | Database: ${uploadResult.database}

Please review this application and respond to the candidate as soon as possible.

This file is stored securely in AWS S3 with full operation tracking.
        `;
        
        await sendHtmlEmail(EMAIL_RECEIVER, adminSubject, adminHtml, adminText);
        
        // Send confirmation email to applicant
        const applicantSubject = 'Thank You for Your Job Application - Vardaan Data Sciences';
        const applicantHtml = `
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #3570f7; margin-bottom: 10px;">Thank You!</h1>
                    <p style="font-size: 18px; color: #666;">Your application has been successfully submitted</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #222;">Application Details</h3>
                    <p><strong>Application ID:</strong> ${appId}</p>
                    <p><strong>Job Title:</strong> ${jobTitle || 'General Application'}</p>
                    <p><strong>Resume File:</strong> ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)</p>
                    <p><strong>Submitted Date:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Resume Link:</strong> <a href="${s3Url}" style="color: #3570f7;" target="_blank">Access Your Resume</a></p>
                </div>
                
                <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #2e7d32;">✅ File Upload Confirmation</h3>
                    <p style="margin: 0;">Your resume has been securely uploaded to our cloud storage system.</p>
                    <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Upload ID: ${uploadResult.operation_id} | Platform: ${uploadResult.platform}</p>
                </div>
                
                <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #2e7d32;">What happens next?</h3>
                    <ol style="margin: 0; padding-left: 20px;">
                        <li>Our HR team will review your application within 2-3 business days</li>
                        <li>If your profile matches our requirements, we will contact you for the next steps</li>
                        <li>You may be invited for an initial screening call or technical assessment</li>
                        <li>We will keep you updated throughout the process</li>
                    </ol>
                </div>
                
                <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #856404;">Important Notes</h3>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li>Please ensure your contact information (email and phone) is current</li>
                        <li>You can access your resume anytime using the link provided above</li>
                        <li>If you have any questions, please reply to this email or contact us at info@vardaanglobal.com</li>
                    </ul>
                </div>
                
                <p style="text-align: center; margin-top: 30px; font-style: italic; color: #666;">
                    We're excited about the possibility of having you join our team and contribute to our mission of transforming businesses through data-driven insights.
                </p>
                
                <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; font-weight: bold;">Best regards,</p>
                    <p style="margin: 5px 0;">The Vardaan Data Sciences Team</p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center;">
                    <p style="margin: 5px 0;"><strong>Vardaan Data Sciences Pvt Ltd</strong></p>
                    <p style="margin: 5px 0;">Aurum, 1st Floor, Plot No 57, Jayabheri Enclave</p>
                    <p style="margin: 5px 0;">Gachibowli Hyderabad-500032 INDIA</p>
                    <p style="margin: 5px 0;">Phone: +91 40-35171118, +91 40-35171119</p>
                    <p style="margin: 5px 0;">Email: info@vardaanglobal.com</p>
                </div>
            </div>
        </body>
        </html>
        `;
        const applicantText = `
Dear ${firstName} ${lastName},

Thank you for submitting your job application to Vardaan Data Sciences! We have successfully received your application and appreciate your interest in joining our team.

Application Details:
Application ID: ${appId}
Job Title: ${jobTitle || 'General Application'}
Resume File: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)
Submitted Date: ${new Date().toLocaleString()}
Resume Link: ${s3Url}

✅ File Upload Confirmation:
Your resume has been securely uploaded to our cloud storage system.
Upload ID: ${uploadResult.operation_id} | Platform: ${uploadResult.platform}

What happens next:
1. Our HR team will review your application within 2-3 business days
2. If your profile matches our requirements, we will contact you for the next steps
3. You may be invited for an initial screening call or technical assessment
4. We will keep you updated throughout the process

Important Notes:
• Please ensure your contact information (email and phone) is current
• You can access your resume anytime using the link provided above
• If you have any questions, please reply to this email or contact us at info@vardaanglobal.com

We're excited about the possibility of having you join our team and contribute to our mission of transforming businesses through data-driven insights.

Best regards,
The Vardaan Data Sciences Team

---
Vardaan Data Sciences Pvt Ltd
Aurum, 1st Floor, Plot No 57, Jayabheri Enclave
Gachibowli Hyderabad-500032 INDIA
Phone: +91 40-35171118, +91 40-35171119
Email: info@vardaanglobal.com
        `;
        
        await sendHtmlEmail(email, applicantSubject, applicantHtml, applicantText);
        
        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            application_id: appId,
            s3_operation_id: uploadResult.operation_id,
            resume_url: s3Url,
            resume_s3_key: s3Key,
            file_info: {
                original_name: req.file.originalname,
                size: req.file.size,
                stored_name: uploadResult.file_info.storedName
            },
            upload_platform: uploadResult.platform,
            database_platform: uploadResult.database
        });
        
    } catch (error) {
        console.error('❌ Job application error details:');
        console.error('  Error message:', error.message);
        console.error('  Error stack:', error.stack);
        console.error('  Request body:', req.body);
        console.error('  File info:', req.file ? {
            originalname: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            path: req.file.path
        } : 'No file');
        
        // Clean up uploaded file if it exists
        if (req.file && req.file.path) {
            try {
                await fs.remove(req.file.path);
                console.log('🧹 Cleaned up temp file after error');
            } catch (cleanupError) {
                console.warn('⚠️  Failed to cleanup temp file:', cleanupError.message);
            }
        }
        
        res.status(500).json({
            success: false,
            message: 'Job application submission failed',
            error: error.message,
            details: {
                step: 'Determining failure point...',
                timestamp: new Date().toISOString(),
                hasFile: !!req.file,
                hasS3Client: !!s3Client
            }
        });
    } finally {
        if (connection) connection.release();
    }
});

// Email subscription
app.post('/api/subscribe-email', async (req, res) => {
    let connection;
    
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }
        
        connection = await dbPool.getConnection();
        
        // Create table if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS email_subscriptions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                submitted_date DATE NOT NULL,
                submitted_time TIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        const now = new Date();
        await connection.execute(
            'INSERT INTO email_subscriptions (email, submitted_date, submitted_time) VALUES (?, ?, ?)',
            [email, now.toISOString().split('T')[0], now.toTimeString().split(' ')[0]]
        );
        
        // Send notification emails
        const adminHtml = `
            <h2>New Email Subscription Received</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${now.toLocaleString()}</p>
        `;
        
        await sendHtmlEmail(EMAIL_RECEIVER, 'New Email Subscription Received', adminHtml);
        
        const subscriberHtml = `
            <h2>Thank You for Subscribing to Vardaan Data Sciences!</h2>
            <p>Dear Subscriber,</p>
            <p>Thank you for subscribing to Vardaan Data Sciences! We're excited to have you join our community.</p>
            <p>You will now receive updates about our latest insights, industry trends, and innovative products.</p>
            <p>Best regards,<br>The Vardaan Data Sciences Team</p>
        `;
        
        await sendHtmlEmail(email, 'Thank You for Subscribing to Vardaan Data Sciences!', subscriberHtml);
        
        res.json({
            success: true,
            message: 'Email subscribed successfully!'
        });
        
    } catch (error) {
        console.error('Email subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    } finally {
        if (connection) connection.release();
    }
});

// Management Team API endpoint
app.get('/api/management-team', async (req, res) => {
    try {
        let connection = await dbPool.getConnection();
        
        // Create table if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS management_team (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                subtitle VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                image_url VARCHAR(500) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Check if table is empty, insert sample data
        const [countResult] = await connection.execute('SELECT COUNT(*) as count FROM management_team');
        
        if (countResult[0].count === 0) {
            // Insert sample management team data
            const sampleData = [
                {
                    name: 'Adarsh',
                    subtitle: 'CEO & Founder',
                    description: 'Adarsh is the visionary leader and founder of Vardaan Data Sciences. With over 15 years of experience in data science and technology, he has been instrumental in driving the company\'s strategic direction and innovative solutions.',
                    image_url: '/assets/AboutVardaan/Adarsh.jpg'
                },
                {
                    name: 'Gopa Sir',
                    subtitle: 'CTO & Technical Director',
                    description: 'Gopa Sir leads our technical initiatives and ensures the highest standards of innovation and quality in all our products and services.',
                    image_url: '/assets/AboutVardaan/GopaSir.JPG'
                },
                {
                    name: 'Ramana',
                    subtitle: 'Head of Operations',
                    description: 'Ramana oversees all operational aspects of the company, ensuring smooth delivery of our services and maintaining high client satisfaction.',
                    image_url: '/assets/AboutVardaan/ramana.png'
                },
                {
                    name: 'Srini',
                    subtitle: 'Head of Business Development',
                    description: 'Srini drives our business growth and strategic partnerships, helping expand our market presence and client base.',
                    image_url: '/assets/AboutVardaan/srini.png'
                },
                {
                    name: 'Susheel',
                    subtitle: 'Head of Technology',
                    description: 'Susheel leads our technology initiatives and ensures we stay at the forefront of technological advancements.',
                    image_url: '/assets/AboutVardaan/Susheel.png'
                },
                {
                    name: 'Vivek',
                    subtitle: 'Head of Analytics',
                    description: 'Vivek specializes in advanced analytics and data science, driving insights that help our clients make informed decisions.',
                    image_url: '/assets/AboutVardaan/vivek.png'
                }
            ];
            
            for (const member of sampleData) {
                await connection.execute(
                    'INSERT INTO management_team (name, subtitle, description, image_url) VALUES (?, ?, ?, ?)',
                    [member.name, member.subtitle, member.description, member.image_url]
                );
            }
        }
        
        const [rows] = await connection.execute('SELECT * FROM management_team ORDER BY id ASC');
        connection.release();
        
        res.json({
            success: true,
            team: rows
        });
        
    } catch (error) {
        console.error('Management team error:', error);
        res.status(500).json({
            success: false,
            message: 'Database error occurred',
            error: error.message
        });
    }
});

// Media API routes (from the original media API integration)
app.get('/api/media', async (req, res) => {
    try {
        const { category, type: fileType } = req.query;
        
        let connection = await dbPool.getConnection();
        
        let query = "SELECT * FROM media_library WHERE 1=1";
        const params = [];
        
        if (category) {
            query += " AND category = ?";
            params.push(category);
        }
        
        if (fileType) {
            query += " AND file_type = ?";
            params.push(fileType);
        }
        
        query += " ORDER BY uploaded_at DESC";
        
        const [rows] = await connection.execute(query, params);
        connection.release();
        
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
        
    } catch (error) {
        console.error('Media API error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Page-specific media endpoint
app.get('/api/media/page/:pageName', async (req, res) => {
    try {
        const { pageName } = req.params;
        console.log(`📄 Page-specific media request for: ${pageName}`);
        
        let connection = await dbPool.getConnection();
        
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
        console.log(`🔍 Searching for categories: ${categories.join(', ')}`);
        
        // Try each potential category
        for (const category of categories) {
            try {
                const query = "SELECT * FROM media_library WHERE category = ? ORDER BY uploaded_at DESC";
                const [rows] = await connection.execute(query, [category]);
                
                if (rows.length > 0) {
                    console.log(`✅ Found ${rows.length} media items for category "${category}"`);
                    connection.release();
                    
                    return res.json({
                        success: true,
                        media: rows,
                        count: rows.length,
                        category: category,
                        pageName: pageName
                    });
                }
            } catch (categoryError) {
                console.log(`❌ Category "${category}" failed:`, categoryError.message);
            }
        }
        
        // If no exact category match, try partial matching
        console.log(`🔍 No exact category match, trying partial matching...`);
        const allQuery = "SELECT * FROM media_library ORDER BY uploaded_at DESC";
        const [allRows] = await connection.execute(allQuery);
        
        const filteredMedia = allRows.filter(item => {
            const itemCategory = item.category?.toLowerCase() || '';
            const pageNameLower = pageName.toLowerCase();
            
            return itemCategory.includes(pageNameLower) || 
                   pageNameLower.includes(itemCategory) ||
                   itemCategory.includes(pageNameLower.replace('-', '')) ||
                   itemCategory.includes(pageNameLower.replace('-', ' '));
        });
        
        connection.release();
        
        if (filteredMedia.length > 0) {
            console.log(`✅ Found ${filteredMedia.length} media items using partial matching`);
            return res.json({
                success: true,
                media: filteredMedia,
                count: filteredMedia.length,
                pageName: pageName,
                method: 'partial-matching'
            });
        }
        
        // If still no results, return empty array
        console.log(`❌ No media found for page "${pageName}"`);
        res.json({
            success: true,
            media: [],
            count: 0,
            pageName: pageName,
            method: 'no-results'
        });
        
    } catch (error) {
        console.error('Page-specific media API error:', error);
        res.status(500).json({ 
            success: false,
            error: error.message,
            pageName: req.params.pageName 
        });
    }
});

// Get all page categories endpoint
app.get('/api/media/pages', async (req, res) => {
    try {
        let connection = await dbPool.getConnection();
        
        const query = "SELECT DISTINCT category FROM media_library ORDER BY category";
        const [rows] = await connection.execute(query);
        connection.release();
        
        const pageCategories = rows.map(row => row.category).filter(Boolean);
        
        res.json({
            success: true,
            pageCategories: pageCategories
        });
        
    } catch (error) {
        console.error('Page categories API error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/media/categories', async (req, res) => {
    try {
        let connection = await dbPool.getConnection();
        const [rows] = await connection.execute("SELECT DISTINCT category FROM media_library ORDER BY category");
        connection.release();
        
        const categories = rows.map(row => row.category);
        
        res.json({
            success: true,
            categories: categories
        });
        
    } catch (error) {
        console.error('Media categories error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/media/stats', async (req, res) => {
    try {
        let connection = await dbPool.getConnection();
        
        // Get stats by category and type
        const [stats] = await connection.execute(`
            SELECT 
                category,
                file_type,
                COUNT(*) as count
            FROM media_library 
            GROUP BY category, file_type
            ORDER BY category, file_type
        `);
        
        // Get total counts
        const [totalResult] = await connection.execute("SELECT COUNT(*) as total FROM media_library");
        const [imagesResult] = await connection.execute("SELECT COUNT(*) as images FROM media_library WHERE file_type = 'image'");
        const [videosResult] = await connection.execute("SELECT COUNT(*) as videos FROM media_library WHERE file_type = 'video'");
        
        connection.release();
        
        res.json({
            success: true,
            stats: {
                total: totalResult[0].total,
                images: imagesResult[0].images,
                videos: videosResult[0].videos,
                by_category: stats
            }
        });
        
    } catch (error) {
        console.error('Media stats error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/media/debug', async (req, res) => {
    try {
        let connection = await dbPool.getConnection();
        const [rows] = await connection.execute("SELECT * FROM media_library ORDER BY category, file_type, original_name");
        connection.release();
        
        res.json({
            success: true,
            media: rows,
            count: rows.length
        });
        
    } catch (error) {
        console.error('Media debug error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Product resources API endpoints
// Get all products with their document counts
app.get('/api/product-resources', async (req, res) => {
    let connection;
    
    try {
        connection = await dbPool.getConnection();
        
        // Create tables if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS product_details (
                id INT AUTO_INCREMENT PRIMARY KEY,
                heading VARCHAR(255) NOT NULL,
                description TEXT,
                logo_url VARCHAR(512),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS document_details (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT,
                heading VARCHAR(255) NOT NULL,
                document_type ENUM('pdf', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'other') DEFAULT 'pdf',
                file_size_kb INT,
                document_url VARCHAR(512) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES product_details(id) ON DELETE CASCADE
            )
        `);
        
        // Get all products with document counts
        const [products] = await connection.execute(`
            SELECT 
                pd.id,
                pd.heading,
                pd.description,
                pd.logo_url,
                pd.created_at,
                pd.updated_at,
                COUNT(dd.id) as document_count
            FROM product_details pd
            LEFT JOIN document_details dd ON pd.id = dd.product_id
            GROUP BY pd.id, pd.heading, pd.description, pd.logo_url, pd.created_at, pd.updated_at
            ORDER BY pd.heading ASC
        `);
        
        connection.release();
        
        res.json({
            success: true,
            products: products,
            count: products.length
        });
        
    } catch (error) {
        console.error('Product resources error:', error);
        if (connection) connection.release();
        res.status(500).json({
            success: false,
            message: 'Database error occurred',
            error: error.message
        });
    }
});

// Get a specific product by heading/slug with all documents
app.get('/api/product-resources/:slug', async (req, res) => {
    let connection;
    
    try {
        const { slug } = req.params;
        console.log(`🔍 Fetching product resource for slug: ${slug}`);
        console.log(`📝 Request path: ${req.path}`);
        console.log(`📝 Request params:`, req.params);
        
        if (!slug) {
            return res.status(400).json({
                success: false,
                message: 'Product slug is required'
            });
        }
        
        // Get a healthy connection with retry logic
        connection = await getHealthyConnection();
        console.log('✅ Database connection established');
        
        // Try multiple slug matching strategies with retry logic
        let products = [];
        const maxQueryRetries = 2;
        
        for (let retry = 0; retry <= maxQueryRetries; retry++) {
            try {
                // 1. Exact match (case-insensitive)
                [products] = await connection.execute(
                    'SELECT * FROM product_details WHERE UPPER(TRIM(heading)) = UPPER(TRIM(?))',
                    [slug]
                );
                
                // If no exact match, try with spaces removed
                if (products.length === 0) {
                    console.log('🔍 Trying slug match with spaces removed');
                    [products] = await connection.execute(
                        'SELECT * FROM product_details WHERE UPPER(REPLACE(TRIM(heading), " ", "")) = UPPER(REPLACE(TRIM(?), " ", ""))',
                        [slug]
                    );
                }
                
                // If still no match, try with dashes replaced
                if (products.length === 0) {
                    console.log('🔍 Trying slug match with dashes replaced');
                    const slugWithDashes = slug.replace(/-/g, ' ');
                    [products] = await connection.execute(
                        'SELECT * FROM product_details WHERE UPPER(REPLACE(TRIM(heading), " ", "")) = UPPER(REPLACE(TRIM(?), "-", ""))',
                        [slugWithDashes]
                    );
                }
                
                // If query succeeded, break out of retry loop
                break;
                
            } catch (queryError) {
                // Check if it's a connection error that we should retry
                if ((queryError.code === 'ECONNRESET' || 
                     queryError.code === 'PROTOCOL_CONNECTION_LOST' ||
                     queryError.code === 'ETIMEDOUT') && 
                    retry < maxQueryRetries) {
                    console.log(`🔄 Query failed with connection error, retrying... (${retry + 1}/${maxQueryRetries + 1})`);
                    // Release the bad connection and get a new one
                    if (connection) {
                        try {
                            connection.release();
                        } catch (releaseError) {
                            // Ignore release errors
                        }
                    }
                    // Get a fresh connection
                    connection = await getHealthyConnection();
                    // Wait before retrying
                    await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
                    continue;
                } else {
                    // Not a retryable error or max retries reached
                    throw queryError;
                }
            }
        }
        
        console.log(`📊 Found ${products.length} matching product(s)`);
        
        if (products.length === 0) {
            if (connection) connection.release();
            console.log(`❌ Product not found for slug: ${slug}`);
            return res.status(404).json({
                success: false,
                message: `Product not found for slug: ${slug}`
            });
        }
        
        const product = products[0];
        console.log(`✅ Product found: ${product.heading} (ID: ${product.id})`);
        
        // Get all documents for this product with retry logic
        let documents = [];
        for (let retry = 0; retry <= maxQueryRetries; retry++) {
            try {
                [documents] = await connection.execute(
                    'SELECT * FROM document_details WHERE product_id = ? ORDER BY created_at DESC',
                    [product.id]
                );
                break; // Success, exit retry loop
            } catch (queryError) {
                if ((queryError.code === 'ECONNRESET' || 
                     queryError.code === 'PROTOCOL_CONNECTION_LOST' ||
                     queryError.code === 'ETIMEDOUT') && 
                    retry < maxQueryRetries) {
                    console.log(`🔄 Document query failed, retrying... (${retry + 1}/${maxQueryRetries + 1})`);
                    if (connection) {
                        try {
                            connection.release();
                        } catch (releaseError) {
                            // Ignore release errors
                        }
                    }
                    connection = await getHealthyConnection();
                    await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
                    continue;
                } else {
                    throw queryError;
                }
            }
        }
        
        console.log(`📄 Found ${documents.length} document(s) for product`);
        
        if (connection) connection.release();
        
        res.json({
            success: true,
            product: product,
            documents: documents,
            document_count: documents.length
        });
        
    } catch (error) {
        console.error('❌ Product resource detail error:', error);
        console.error('❌ Error stack:', error.stack);
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                // Ignore release errors
            }
        }
        res.status(500).json({
            success: false,
            message: 'Database error occurred',
            error: error.message
        });
    }
});

// Insert sample media data for testing
app.post('/api/media/sample-data', async (req, res) => {
    try {
        let connection = await dbPool.getConnection();
        
        // Sample media data for different product pages
        const sampleMediaData = [
            // RiskaVaire Videos
            {
                original_name: 'grc.mp4',
                s3_url: 'https://vardaands.com/assets/videos/grc.mp4',
                file_type: 'video',
                category: 'Products-RiskaVaire',
                uploaded_by: 'system',
                uploaded_at: new Date()
            },
            {
                original_name: 'grc.webm',
                s3_url: 'https://vardaands.com/assets/videos/grc.webm',
                file_type: 'video',
                category: 'Products-RiskaVaire',
                uploaded_by: 'system',
                uploaded_at: new Date()
            },
            
            // Lapsec/ViCTAA Videos
            {
                original_name: 'lapsec.mp4',
                s3_url: 'https://vardaands.com/assets/videos/lapsec.mp4',
                file_type: 'video',
                category: 'Products-Lapsec',
                uploaded_by: 'system',
                uploaded_at: new Date()
            },
            {
                original_name: 'lapsec.webm',
                s3_url: 'https://vardaands.com/assets/videos/lapsec.webm',
                file_type: 'video',
                category: 'Products-Lapsec',
                uploaded_by: 'system',
                uploaded_at: new Date()
            },
            
            // ProSync/Audit Videos
            {
                original_name: 'audit.mp4',
                s3_url: 'https://vardaands.com/assets/videos/Audit.mp4',
                file_type: 'video',
                category: 'Products-ProSync',
                uploaded_by: 'system',
                uploaded_at: new Date()
            },
            {
                original_name: 'audit.webm',
                s3_url: 'https://vardaands.com/assets/videos/Audit.webm',
                file_type: 'video',
                category: 'Products-ProSync',
                uploaded_by: 'system',
                uploaded_at: new Date()
            },
            
            // Smart Trucks Videos
            {
                original_name: 'smarttrucks.mp4',
                s3_url: 'https://vardaands.com/assets/videos/smarttrucks.mp4',
                file_type: 'video',
                category: 'Products-Smart Trucks',
                uploaded_by: 'system',
                uploaded_at: new Date()
            },
            {
                original_name: 'smarttrucks.webm',
                s3_url: 'https://vardaands.com/assets/videos/smarttrucks.webm',
                file_type: 'video',
                category: 'Products-Smart Trucks',
                uploaded_by: 'system',
                uploaded_at: new Date()
            }
        ];
        
        // Insert sample data
        for (const mediaItem of sampleMediaData) {
            try {
                await connection.execute(`
                    INSERT INTO media_library 
                    (original_name, s3_url, file_type, category, uploaded_by, uploaded_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                `, [
                    mediaItem.original_name,
                    mediaItem.s3_url,
                    mediaItem.file_type,
                    mediaItem.category,
                    mediaItem.uploaded_by,
                    mediaItem.uploaded_at
                ]);
                console.log(`✅ Inserted sample media: ${mediaItem.original_name}`);
            } catch (insertError) {
                console.log(`⚠️ Sample media already exists: ${mediaItem.original_name}`);
            }
        }
        
        connection.release();
        
        res.json({
            success: true,
            message: 'Sample media data inserted successfully',
            count: sampleMediaData.length
        });
        
    } catch (error) {
        console.error('Sample media data error:', error);
        res.status(500).json({ error: error.message });
    }
});

// ==================== API ENDPOINTS ====================

// API-only routes (for backend deployment)
app.get('*', (req, res) => {
    // If it's an API route that doesn't exist, return 404
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ 
            success: false, 
            message: 'API endpoint not found' 
        });
    }
    
    // For all other routes, return API info
    res.json({
        message: 'Vardaan DS API Server',
        status: 'running',
        note: 'This is a backend API server. Frontend should be deployed separately.',
        available_endpoints: [
            '/api/contact',
            '/api/health',
            '/api/management-team',
            '/api/media',
            '/api/job-listings',
            '/api/job-application',
            '/api/nav-categories',
            '/api/nav-items',
            '/api/lapsec-pricing',
            '/api/product-pricing',
            '/api/subscribe-email',
            '/api/get-currency'
        ]
    });
});

// Error handlers
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server with proper error handling
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`✅ Backend API server ready`);
    console.log(`🌐 API endpoints available at /api/*`);
    console.log(`📊 Health check: /api/health`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌍 CORS Origins: ${process.env.FRONTEND_URL || 'localhost:3000'}`);
    console.log(`🗄️  Database: ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`);
});

// Handle server startup errors
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    console.error('❌ Server will shut down gracefully');
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    console.error('❌ Server will continue running');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    if (dbPool) {
        dbPool.end();
    }
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down gracefully');
    if (dbPool) {
        dbPool.end();
    }
    process.exit(0);
});

module.exports = app; 
