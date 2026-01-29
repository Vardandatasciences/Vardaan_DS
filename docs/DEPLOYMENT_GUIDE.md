# Production Deployment Guide

## Issue: Images and Videos Not Displaying in Production Build

This guide addresses the common issue where images and videos work in development but fail to display when the application is built and hosted.

## Root Causes

1. **Missing Environment Variables**: Production API URL not configured
2. **Hardcoded localhost URLs**: Components using localhost in production
3. **CORS Configuration**: Backend not allowing production domains
4. **Static Asset Paths**: Incorrect paths in production build

## Solution Steps

### 1. Environment Configuration

Create environment files in your project root:

**`.env.development`**
```bash
# Development environment variables
REACT_APP_API_URL=https://vardaan-website-node.onrender.com
REACT_APP_ENVIRONMENT=development

# Firebase configuration (optional)
REACT_APP_FIREBASE_API_KEY=your-dev-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-dev-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-dev-project-id
```

**`.env.production`**
```bash
# Production environment variables
# Replace with your actual production API URL
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_ENVIRONMENT=production

# Firebase configuration (optional)
REACT_APP_FIREBASE_API_KEY=your-prod-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-prod-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-prod-project-id
```

### 2. Install Required Dependencies

```bash
npm install env-cmd
```

### 3. Build Commands

Use environment-specific build commands:

```bash
# Development build
npm run build:dev

# Production build  
npm run build:prod

# Standard build (uses .env if present)
npm run build
```

### 4. Backend Configuration

Update your backend CORS configuration to include your production domains:

```python
ALLOWED_ORIGINS = [
        "https://vardaands.com",
    "https://www.vardaands.com",
    "https://vardaandatasciences.dbk39rik9ypyn.amplifyapp.com",
    "https://your-app.netlify.app",     # Replace with your actual domain
    "https://your-app.vercel.app",      # Replace with your actual domain
    "https://your-domain.com",          # Replace with your actual domain
    "https://www.your-domain.com",      # Replace with your actual domain
]
```

### 5. Hosting Platform Configuration

#### For Netlify:
1. Set environment variables in Netlify dashboard:
   - `REACT_APP_API_URL=https://your-backend-domain.com`
2. Add `_redirects` file in `public/` folder:
   ```
   /*    /index.html   200
   ```

#### For Vercel:
1. Set environment variables in Vercel dashboard
2. Vercel handles SPA routing automatically

#### For Traditional Hosting:
1. Ensure your web server serves `index.html` for all routes
2. Configure proper MIME types for media files

### 6. Static vs Database Media

Your app uses two types of media:

#### Static Media (from src/assets/):
- Built into the app bundle
- Works automatically if build is configured correctly
- Examples: `src/assets/Images/Home/logo.png`

#### Database Media (from S3/API):
- Fetched dynamically from your backend/S3
- Requires correct API URL configuration
- Examples: Components using `useImages()` and `useVideos()` hooks

### 7. Testing the Fix

1. **Check Environment Variables**:
   ```javascript
   console.log('API URL:', process.env.REACT_APP_API_URL);
   ```

2. **Test API Connectivity**:
   Open browser dev tools → Network tab → Look for API calls to your backend

3. **Check Database Media**:
   - Verify S3 URLs are accessible
   - Check CORS headers in API responses
   - Test media endpoints directly

4. **Verify Static Assets**:
   - Check browser dev tools for 404 errors
   - Verify asset paths in built files

### 8. Common Issues & Solutions

#### Issue: API calls to localhost in production
**Solution**: Ensure `REACT_APP_API_URL` is set correctly in production environment

#### Issue: CORS errors
**Solution**: Add your production domain to backend CORS configuration

#### Issue: 404 for static assets
**Solution**: Check if build folder structure matches expected paths

#### Issue: Database media not loading
**Solution**: Verify backend API is accessible and S3 URLs are valid

### 9. Deployment Checklist

- [ ] Environment variables configured for production
- [ ] Backend CORS updated with production domains
- [ ] API URLs use environment variables (no hardcoded localhost)
- [ ] Built with correct environment: `npm run build:prod`
- [ ] Backend deployed and accessible
- [ ] Database/S3 accessible from production
- [ ] Test all media types (static images, database images, videos)

### 10. Debugging Tips

1. **Browser Dev Tools**: Check Console and Network tabs for errors
2. **API Testing**: Test backend endpoints independently
3. **Environment Check**: Verify environment variables are loaded
4. **Build Inspection**: Check built files for correct asset paths

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://api.yourdomain.com` |
| `REACT_APP_ENVIRONMENT` | Environment name | `production` |
| `REACT_APP_FIREBASE_*` | Firebase configuration | Various |

## Support

If issues persist:
1. Check browser console for specific error messages
2. Verify backend logs for failed requests
3. Test API endpoints independently
4. Ensure environment variables are correctly set on hosting platform 