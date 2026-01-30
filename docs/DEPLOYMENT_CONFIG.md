# Deployment Configuration

## Environment Variables Required

Create a `.env` file in your project root with these variables:

```bash
# Frontend URLs (for CORS configuration)
FRONTEND_URL=https://your-domain.com
PRODUCTION_URL=https://your-production-domain.com

# React App API URL (this gets embedded in the React build)
REACT_APP_API_URL=https://your-backend-api.com

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Flask Configuration
FLASK_ENV=production
FLASK_DEBUG=false

# Port Configuration
PORT=5000
```

## Image Display Fix Applied & Media API Integration

✅ **Fixed Issues:**
1. **Static File Serving**: Flask now serves from `../build` instead of `../public`
2. **Asset Routes**: Added `/static/*` and `/assets/*` routes for React build assets
3. **CORS Configuration**: Added CORS for static files
4. **Cache Headers**: Added proper caching for performance
5. **React Router Support**: Added fallback to index.html for client-side routing
6. **Media API Integration**: Integrated `media_api.py` functionality into main `app.py`
7. **Database Images**: Added media database API routes for dynamic image/video serving

✅ **New API Endpoints:**
- `GET /api/media` - Get media files by category and type
- `GET /api/media/categories` - Get all available media categories  
- `GET /api/media/stats` - Get media library statistics
- `GET /api/media/debug` - Debug endpoint for all media files

## Build & Deploy Steps

1. **Build React App:**
   ```bash
   npm run build
   ```

2. **Set Environment Variables:**
   - For React build: Set `REACT_APP_API_URL` before building
   - For Flask: Set production environment variables

3. **Run Unified Flask Backend:**
   ```bash
   cd backend
   python app.py
   ```
   
   This now includes:
   - Static file serving for React build
   - Contact form handling
   - Job applications
   - Product pricing inquiries
   - **Media API for images/videos from database**
   - Email subscriptions

## Troubleshooting

If images still don't display:

1. **Check Build Directory**: Ensure `build/` folder exists with `static/` subdirectory
2. **Environment Variables**: Make sure `REACT_APP_API_URL` is set during build
3. **CORS**: Add your production domain to ALLOWED_ORIGINS in app.py
4. **File Paths**: Check browser developer tools for 404 errors on static files
5. **Database Images**: Check if media is in database using `/api/media/debug` endpoint
6. **API Connection**: Verify frontend is connecting to correct port (5000, not 5001)

## Testing the Integration

**Test Static Files:**
```bash
python test_static_serving.py
```

**Test Media API:**
```bash
curl https://vardaan-website-node.onrender.com/api/media/stats
curl https://vardaan-website-node.onrender.com/api/media?category=lapsec&type=image
```

**Check Health:**
```bash
curl https://vardaan-website-node.onrender.com/api/health
``` 