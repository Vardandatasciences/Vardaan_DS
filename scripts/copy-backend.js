const fs = require('fs-extra');
const path = require('path');

async function copyBackendToBuild() {
    try {
        console.log('📁 Starting backend copy process...');
        
        const srcBackendPath = path.join(__dirname, '../src/backend');
        const buildBackendPath = path.join(__dirname, '../build/backend');
        
        // Ensure source backend directory exists
        if (!fs.existsSync(srcBackendPath)) {
            console.error('❌ Source backend directory not found:', srcBackendPath);
            process.exit(1);
        }
        
        // Ensure build directory exists
        const buildPath = path.join(__dirname, '../build');
        if (!fs.existsSync(buildPath)) {
            console.error('❌ Build directory not found. Please run "npm run build" first to create React build.');
            process.exit(1);
        }
        
        // Copy backend files to build directory
        console.log('📂 Copying backend files...');
        await fs.copy(srcBackendPath, buildBackendPath);
        
        // Copy package.json with only production dependencies
        console.log('📄 Creating production package.json...');
        const originalPackageJson = await fs.readJson(path.join(__dirname, '../package.json'));
        
        // Filter to include only backend-related dependencies
        const backendDependencies = {
            "express": originalPackageJson.dependencies.express,
            "cors": originalPackageJson.dependencies.cors,
            "mysql2": originalPackageJson.dependencies.mysql2,
            "multer": originalPackageJson.dependencies.multer,
            "nodemailer": originalPackageJson.dependencies.nodemailer,
            "aws-sdk": originalPackageJson.dependencies["aws-sdk"],
            "libphonenumber-js": originalPackageJson.dependencies["libphonenumber-js"],
            "dotenv": originalPackageJson.dependencies.dotenv,
            "mime-types": originalPackageJson.dependencies["mime-types"],
            "axios": originalPackageJson.dependencies.axios,
            "uuid": originalPackageJson.dependencies.uuid,
            "fs-extra": originalPackageJson.dependencies["fs-extra"],
            "path": originalPackageJson.dependencies.path
        };
        
        const productionPackageJson = {
            name: "vardaands-backend",
            version: originalPackageJson.version,
            description: "Vardaan Data Sciences Backend Server",
            main: "backend/server.js",
            scripts: {
                "start": "node backend/server.js"
            },
            dependencies: backendDependencies,
            engines: {
                "node": ">=14.0.0"
            }
        };
        
        await fs.writeJson(path.join(buildPath, 'package.json'), productionPackageJson, { spaces: 2 });
        
        // Create a startup script
        console.log('🚀 Creating startup script...');
        const startupScript = `#!/usr/bin/env node
/**
 * Vardaan Data Sciences - Production Server
 * This script starts the integrated frontend + backend server
 */

const path = require('path');
const fs = require('fs');

// Check if we're in the right directory
const serverPath = path.join(__dirname, 'backend', 'server.js');
if (!fs.existsSync(serverPath)) {
    console.error('❌ Backend server not found at:', serverPath);
    console.error('💡 Make sure you are running this from the build directory');
    process.exit(1);
}

console.log('🚀 Starting Vardaan Data Sciences Production Server...');
console.log('📁 Build directory:', __dirname);
console.log('🖥️  Server file:', serverPath);

// Set NODE_ENV to production
process.env.NODE_ENV = 'production';

// Start the server
require('./backend/server.js');
`;
        
        await fs.writeFile(path.join(buildPath, 'start.js'), startupScript);
        await fs.chmod(path.join(buildPath, 'start.js'), '755');
        
        // Create environment template
        console.log('⚙️  Creating environment template...');
        const envTemplate = `# Vardaan Data Sciences - Environment Configuration
# Copy this file to .env and update the values as needed

# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration (MySQL)
DB_HOST=vardaanwebsites.c1womgmu83di.ap-south-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=vardaanwebservices
DB_NAME=vardaan_ds
DB_PORT=3306

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=rupinirudroju@gmail.com
EMAIL_HOST_PASSWORD=wzcu fnyh dssu laeb
EMAIL_RECEIVER=vinnurudroju28@gmail.com

# Frontend URLs (for CORS)
FRONTEND_URL=https://vardaands.com
PRODUCTION_URL=https://yourdomain.com

# AWS S3 Configuration (if needed)
# AWS_ACCESS_KEY_ID=your_access_key
# AWS_SECRET_ACCESS_KEY=your_secret_key
# AWS_REGION=us-east-1
# S3_BUCKET_NAME=your_bucket_name
`;
        
        await fs.writeFile(path.join(buildPath, '.env.template'), envTemplate);
        
        // Create README for production deployment
        console.log('📖 Creating production README...');
        const productionReadme = `# Vardaan Data Sciences - Production Build

This directory contains the production build of the Vardaan Data Sciences application with integrated frontend and backend.

## Quick Start

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Configure environment (optional):
   \`\`\`bash
   cp .env.template .env
   # Edit .env with your specific configuration
   \`\`\`

3. Start the server:
   \`\`\`bash
   npm start
   # OR
   node start.js
   \`\`\`

The server will start on port 5000 (or the port specified in your .env file) and serve both the React frontend and the API backend.

## What's Included

- ✅ React frontend (built and optimized)
- ✅ Express.js backend with all API endpoints
- ✅ Database integration (MySQL)
- ✅ File upload functionality (S3)
- ✅ Email services (Nodemailer)
- ✅ Static file serving
- ✅ CORS configuration
- ✅ Error handling

## API Endpoints

All API endpoints are available at \`/api/*\`:

- \`POST /api/contact\` - Contact form submission
- \`GET /api/contacts\` - Get all contacts (admin)
- \`GET /api/health\` - Health check
- \`GET /api/media\` - Get media files
- \`GET /api/job-listings\` - Get job listings
- \`POST /api/job-application\` - Submit job application
- \`POST /api/lapsec-pricing\` - Submit Lapsec pricing inquiry
- \`POST /api/product-pricing\` - Submit product pricing inquiry
- \`POST /api/subscribe-email\` - Email subscription
- \`GET /api/get-currency\` - Get currency based on IP

## Frontend

The React frontend is served from the root path (\`/\`) and includes client-side routing. All non-API routes will serve the React application.

## Deployment

This build is ready for deployment to any Node.js hosting platform:

- Heroku
- Vercel
- Netlify
- DigitalOcean
- AWS
- Google Cloud
- Or any VPS with Node.js support

## Environment Variables

Key environment variables you may want to configure:

- \`PORT\` - Server port (default: 5000)
- \`NODE_ENV\` - Environment (production/development)
- Database credentials (DB_HOST, DB_USER, DB_PASSWORD, etc.)
- Email configuration (EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, etc.)
- CORS origins (FRONTEND_URL, PRODUCTION_URL)

See \`.env.template\` for a complete list.

## Support

For support or questions, contact the Vardaan Data Sciences development team.
`;
        
        await fs.writeFile(path.join(buildPath, 'README.md'), productionReadme);
        
        console.log('✅ Backend copy process completed successfully!');
        console.log('📊 Summary:');
        console.log('   - Backend files copied to build/backend/');
        console.log('   - Production package.json created');
        console.log('   - Startup script created (start.js)');
        console.log('   - Environment template created (.env.template)');
        console.log('   - Production README created');
        console.log('');
        console.log('🚀 Your production build is ready!');
        console.log('   To start: cd build && npm install && npm start');
        
    } catch (error) {
        console.error('❌ Error copying backend to build:', error);
        process.exit(1);
    }
}

// Run the copy process
copyBackendToBuild(); 