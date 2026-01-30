import { config } from '../utils/config';

// BLOG_API_URL already includes /api, so use it directly
const API_BASE_URL = config.BLOG_API_URL;

export const blogService = {
  // Get all blogs
  async getAllBlogs() {
    try {
      const url = `${API_BASE_URL}/blogs`;
      console.log('🔍 Fetching blogs from:', url);
      console.log('🔍 API_BASE_URL:', API_BASE_URL);
      console.log('🔍 BLOG_API_URL from config:', config.BLOG_API_URL);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include'
      });
      
      console.log('🔍 Response status:', response.status);
      console.log('🔍 Response OK:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error text:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Debug logging
      console.log('🔍 Full API Response:', result);
      console.log('🔍 API Response structure:', {
        success: result.success,
        message: result.message,
        dataType: typeof result.data,
        isArray: Array.isArray(result.data),
        dataLength: Array.isArray(result.data) ? result.data.length : 'N/A',
        firstItem: Array.isArray(result.data) && result.data.length > 0 ? result.data[0] : 'N/A'
      });
      
      // Check if this is the catch-all route response (means endpoint doesn't exist)
      if (result.message === 'Vardaan DS API Server' || (result.message && !result.success && !result.data)) {
        console.error('❌ Blog endpoint not found on server. This might mean:');
        console.error('   1. The server is using server.js instead of combined-server.js');
        console.error('   2. The /api/blogs endpoint is not registered on the production server');
        console.error('   3. The server routing is incorrect');
        throw new Error('Blog API endpoint not found on server. Please ensure the server has the blog endpoints configured.');
      }
      
      if (result.success) {
        // Additional validation of the data structure
        if (!Array.isArray(result.data)) {
          console.error('❌ API returned non-array data:', result.data);
          throw new Error('Invalid data structure: expected array of blogs');
        }
        
        // Log each blog's structure
        result.data.forEach((blog, index) => {
          console.log(`📝 Blog ${index + 1} structure:`, {
            id: blog.blog_id || blog.id,
            title: blog.title,
            slug: blog.slug,
            image: blog.image,
            imageType: typeof blog.image,
            images: blog.images,
            imagesType: Array.isArray(blog.images) ? 'array' : typeof blog.images,
            imageCount: Array.isArray(blog.images) ? blog.images.length : 'N/A'
          });
        });
        
        // Validate and clean the data before returning
        const cleanedData = result.data.map(blog => {
          // Ensure blog has required fields
          if (!blog || typeof blog !== 'object') {
            console.warn('⚠️ Invalid blog item:', blog);
            return null;
          }
          
          // Ensure image is a string or null
          if (blog.image !== null && typeof blog.image !== 'string') {
            console.warn('⚠️ Invalid image type:', typeof blog.image, blog.image);
            blog.image = null;
          }
          
          // Ensure images is an array
          if (!Array.isArray(blog.images)) {
            console.warn('⚠️ Invalid images type:', typeof blog.images, blog.images);
            blog.images = [];
          } else {
            // Filter out non-string image URLs
            blog.images = blog.images.filter(img => img === null || typeof img === 'string');
          }
          
          return blog;
        }).filter(blog => blog !== null);
        
        console.log('🧹 Cleaned data:', cleanedData);
        return cleanedData;
      } else {
        throw new Error(result.message || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      
      // If it's a CORS error, provide a more helpful message
      if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
        throw new Error('CORS Error: Unable to connect to the server. This might be due to cross-origin restrictions. Please check your server configuration.');
      }
      
      // If it's a network error, try to provide fallback data
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.warn('Network error detected, using fallback data');
        return this.getFallbackBlogData();
      }
      
      throw error;
    }
  },

  // Get a specific blog by ID
  async getBlogById(blogId) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || 'Blog not found');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },

  // Get a specific blog by slug
  async getBlogBySlug(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Blog data from API:', result.data);
        console.log('Blog images:', result.data.images);
        return result.data;
      } else {
        throw new Error(result.message || 'Blog not found');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },

  // Create a new blog (Admin only)
  async createBlog(blogData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(blogData),
      });
      
      if (!response.ok) {
        if (response.status === 413) {
          throw new Error('Request too large. Please reduce the content size or remove some images.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        return result;
      } else {
        throw new Error(result.message || 'Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      
      // Provide specific error messages
      if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
        throw new Error('CORS Error: Unable to connect to the server. Please check your server configuration.');
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error('Network Error: Unable to connect to the server. Please check your internet connection.');
      } else if (error.message.includes('Request too large')) {
        throw new Error('Content too large: Please reduce the blog content or remove some images.');
      }
      
      throw error;
    }
  },

  // Update an existing blog (Admin only)
  async updateBlog(blogId, blogData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(blogData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        return result;
      } else {
        throw new Error(result.message || 'Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Delete a blog (Admin only)
  async deleteBlog(blogId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        return result;
      } else {
        throw new Error(result.message || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },

  // Upload blog image (Admin only)
  async uploadBlogImage(imageData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/blog-images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(imageData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        return result;
      } else {
        throw new Error(result.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Get optimized image URLs for a specific image (simplified version)
  getImageUrls(filename) {
    console.log(`🔍 BlogService: Getting image URLs for ${filename}`);
    
    // Check environment
    const isHosted = window.location.hostname !== 'localhost' && 
                    window.location.hostname !== '127.0.0.1' &&
                    !window.location.hostname.includes('localhost');
    
    if (isHosted) {
      // Try imported image first
      const importedImageUrl = `${config.BLOG_API_URL}/assets/Blog/${filename}`;
      const urls = [];
      
      if (importedImageUrl) {
        urls.push(importedImageUrl);
        console.log(`✅ Found imported image: ${importedImageUrl}`);
      }
      
      // Add fallback URLs
      urls.push(
        `${window.location.origin}/assets/images/Blog/${filename}`,
        `${window.location.origin}/static/media/Blog/${filename}`,
        `/assets/images/Blog/${filename}`,
        `${config.BLOG_API_URL}/assets/Blog/${filename}`,
        `${config.BLOG_API_URL}/api/serve-asset-image/${filename}`
      );
      
      return {
        urls: urls,
                  recommended: importedImageUrl || `${window.location.origin}/assets/Images/Blog/${filename}`,
        environment: 'hosted'
      };
    } else {
      // For local development, prioritize uploads route
      return {
        urls: [
          `${config.BLOG_API_URL}/uploads/blog-images/${filename}`,
          `${config.BLOG_API_URL}/assets/Blog/${filename}`,
          `${config.BLOG_API_URL}/api/serve-asset-image/${filename}`,
          `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${filename}`
        ],
        recommended: `${config.BLOG_API_URL}/uploads/blog-images/${filename}`,
        environment: 'local'
      };
    }
  },

  // Format blog data for display
  formatBlogForDisplay(blog) {
    try {
      // Debug logging
      console.log('🔍 Formatting blog:', {
        id: blog.blog_id,
        title: blog.title,
        image: blog.image,
        imageType: typeof blog.image,
        images: blog.images,
        imagesType: Array.isArray(blog.images) ? 'array' : typeof blog.images,
        rawImagesData: blog.images
      });
      
      // Clean up image URLs - simplified to use direct database values
      const cleanImageUrl = (imageUrl) => {
        // Check if imageUrl is a valid string
        if (!imageUrl || typeof imageUrl !== 'string') {
          console.log('⚠️ Invalid imageUrl type:', typeof imageUrl, imageUrl);
          return null;
        }
        
        console.log(`🔍 BlogService: Processing raw image URL: "${imageUrl}"`);
        
        // If it's already a full URL, return as is
        if (imageUrl.includes('://')) {
          console.log(`✅ Using full URL as-is: ${imageUrl}`);
          return imageUrl;
        }
        
        // Get clean filename
        const cleanFilename = imageUrl.replace(/^\/+/, '');
        console.log(`🔍 BlogService: Clean filename: "${cleanFilename}"`);
        
        // Check environment
        const isHosted = window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1' &&
                        !window.location.hostname.includes('localhost');
        
        console.log(`🔍 BlogService: Environment: ${isHosted ? 'hosted' : 'local'}`);
        
        if (isHosted) {
          // For hosted environments, try imported image first
          const importedImageUrl = `${config.BLOG_API_URL}/assets/Blog/${cleanFilename}`;
          if (importedImageUrl) {
            console.log(`🏠 Using imported image: ${importedImageUrl}`);
            return importedImageUrl;
          }
          
          // Fallback to public assets path
          const publicAssetUrl = `${window.location.origin}/assets/images/Blog/${cleanFilename}`;
          console.log(`🏠 Using public asset URL: ${publicAssetUrl}`);
          return publicAssetUrl;
        } else {
          // For local development, use backend uploads route directly
          const uploadsImageUrl = `${config.BLOG_API_URL}/uploads/blog-images/${cleanFilename}`;
          console.log(`🖼️ Using uploads route: ${uploadsImageUrl}`);
          return uploadsImageUrl;
        }
      };

      // Ensure we have valid data with fallbacks
      const safeBlog = {
        id: blog.blog_id || blog.id || 'unknown',
        slug: blog.slug || 'unknown',
        title: blog.title || 'Untitled Blog',
        content: this.preserveContentFormatting(blog.content || ''),
        author: blog.author || 'Unknown Author',
        date: blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }) : 'Unknown Date',
        category: this.getCategoryFromContent(blog.content || ''),
        description: this.generateDescription(blog.content || ''),
        // Use raw image URLs from database without complex processing
        image: blog.image || 
               (blog.images && blog.images.length > 0 ? blog.images[0].image_url || blog.images[0] : null) ||
               this.getDefaultImageForBlog(blog),
        // Use raw images data from database
        images: blog.images || []
      };
      
      console.log('✅ Formatted blog result:', safeBlog);
      return safeBlog;
    } catch (error) {
      console.error('❌ Error formatting blog:', error);
      console.error('❌ Problematic blog data:', blog);
      
      // Return a safe fallback blog object
      return {
        id: 'error',
        slug: 'error',
        title: 'Error Loading Blog',
        content: 'There was an error loading this blog post. Please try again later.',
        author: 'System',
        date: 'Error',
        category: 'Error',
        description: 'Error loading blog content',
        image: this.getDefaultImage(), // Use default image function
        images: []
      };
    }
  },

  // Preserve content formatting and ensure proper line breaks
  preserveContentFormatting(content) {
    if (!content) return '';
    
    // Normalize line endings
    let formattedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Ensure proper spacing around main headings
    formattedContent = formattedContent.replace(/(^|\n)(#\s+)/g, '\n$2');
    
    // Ensure proper spacing around subheadings
    formattedContent = formattedContent.replace(/(^|\n)(##\s+)/g, '\n$2');
    formattedContent = formattedContent.replace(/(^|\n)(\*\*[^*]+\*\*)/g, '\n$2');
    
    // Ensure proper spacing around list items
    formattedContent = formattedContent.replace(/(^|\n)([-•*]\s+)/g, '\n$2');
    formattedContent = formattedContent.replace(/(^|\n)(\d+\.\s+)/g, '\n$2');
    
    // Handle specific content patterns from the images
    // Ensure "The reasons are clear:" is treated as a subheading
    formattedContent = formattedContent.replace(/(^|\n)(The reasons are clear:)/g, '\n## $2');
    
    // Ensure "Why Endpoint Security is the Weakest Link" is treated as a subheading
    formattedContent = formattedContent.replace(/(^|\n)(Why Endpoint Security is the Weakest Link)/g, '\n## $2');
    
    // Ensure "The Cost of Overlooking Endpoints" is treated as a subheading
    formattedContent = formattedContent.replace(/(^|\n)(The Cost of Overlooking Endpoints)/g, '\n## $2');
    
    // Ensure bullet points are properly formatted
    formattedContent = formattedContent.replace(/(^|\n)(Customer trust erosion)/g, '\n- $2');
    formattedContent = formattedContent.replace(/(^|\n)(Business downtime during investigations)/g, '\n- $2');
    formattedContent = formattedContent.replace(/(^|\n)(Legal liabilities that stretch for years)/g, '\n- $2');
    
    // Ensure other bullet points are properly formatted
    formattedContent = formattedContent.replace(/(^|\n)(Decentralized workforces mean endpoints are scattered)/g, '\n- $2');
    formattedContent = formattedContent.replace(/(^|\n)(Patch management delays leave systems exposed)/g, '\n- $2');
    formattedContent = formattedContent.replace(/(^|\n)(Insider threats and policy violations)/g, '\n- $2');
    formattedContent = formattedContent.replace(/(^|\n)(Traditional antivirus limitations make them blind)/g, '\n- $2');
    
    // Handle image references - ensure they're on separate lines
    formattedContent = formattedContent.replace(/(^|\n)(Picture\d+\.(jpg|jpeg|png|gif))/g, '\n$2');
    formattedContent = formattedContent.replace(/(^|\n)([A-Za-z0-9_-]+\.(jpg|jpeg|png|gif|webp|avif))/g, '\n$2');
    
    // Clean up multiple consecutive newlines
    formattedContent = formattedContent.replace(/\n{3,}/g, '\n\n');
    
    // Trim leading/trailing whitespace
    formattedContent = formattedContent.trim();
    
    return formattedContent;
  },

  // Generate a description from content (first 150 characters)
  generateDescription(content) {
    if (!content) return '';
    const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ');
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  },

  // Get category from content or use default
  getCategoryFromContent(content) {
    if (!content) return 'General';
    
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('ai') || contentLower.includes('artificial intelligence') || contentLower.includes('machine learning')) {
      return 'AI & Technology';
    } else if (contentLower.includes('cyber') || contentLower.includes('security') || contentLower.includes('threat')) {
      return 'Cybersecurity';
    } else if (contentLower.includes('data') || contentLower.includes('analytics') || contentLower.includes('strategy')) {
      return 'Data Strategy';
    } else if (contentLower.includes('erp') || contentLower.includes('oracle') || contentLower.includes('cloud')) {
      return 'ERP Services';
    } else if (contentLower.includes('training') || contentLower.includes('skill') || contentLower.includes('development')) {
      return 'Training & Development';
    } else if (contentLower.includes('digital') || contentLower.includes('transformation')) {
      return 'Digital Transformation';
    }
    
    return 'General';
  },

  // Get default image if no image is available
  getDefaultImage() {
    // Return the specific image for the featured blog about automated control testing
    return `${config.BLOG_API_URL}/uploads/blog-images/blog-1755627042464-216685196.png`;
  },

  // Get default image for a specific blog based on its content
  getDefaultImageForBlog(blog) {
    if (!blog || !blog.title) {
      return this.getDefaultImage(); // Fallback to default if no blog or title
    }

    const titleLower = blog.title.toLowerCase();
    console.log(`🔍 Assigning image for blog: "${blog.title}"`);

    // Specific blog image assignments
    if (titleLower.includes('iso 27001') || titleLower.includes('beginner') || titleLower.includes('every business in 2025')) {
      console.log(`✅ Assigning ISO 27001 image to: ${blog.title}`);
      return `${config.BLOG_API_URL}/uploads/blog-images/blog-1755664966089-833670262.jpg`;
    } else if (titleLower.includes('automated control testing') || titleLower.includes('future-proofs enterprises')) {
      console.log(`✅ Assigning Automated Control Testing image to: ${blog.title}`);
      return `${config.BLOG_API_URL}/uploads/blog-images/blog-1755627042464-216685196.png`;
    } else if (titleLower.includes('weak endpoint') || titleLower.includes('million-dollar breach')) {
      console.log(`✅ Assigning Weak Endpoint image to: ${blog.title}`);
      return `${config.BLOG_API_URL}/uploads/blog-images/blog-1755104390779-578349330.jpg`;
    } else if (titleLower.includes('ai') || titleLower.includes('artificial intelligence')) {
      console.log(`✅ Assigning AI image to: ${blog.title}`);
      return `${config.BLOG_API_URL}/uploads/blog-images/blog-1755625300877-328527850.png`;
    } else if (titleLower.includes('cyber') || titleLower.includes('security')) {
      console.log(`✅ Assigning Cybersecurity image to: ${blog.title}`);
      return `${config.BLOG_API_URL}/uploads/blog-images/blog-1755587967598-615892528.png`;
    } else if (titleLower.includes('oracle') || titleLower.includes('erp') || titleLower.includes('migration')) {
      console.log(`✅ Assigning Oracle ERP image to: ${blog.title}`);
      return `${config.BLOG_API_URL}/uploads/blog-images/blog-1755773616100-183980751.png`;
    } else if (titleLower.includes('iso 27001') && titleLower.includes('soc 2') && titleLower.includes('gdpr')) {
      console.log(`✅ Assigning ISO 27001 vs SOC 2 vs GDPR image to: ${blog.title}`);
      return `${config.BLOG_API_URL}/uploads/blog-images/blog-1755773616100-183980751.png`;
    }

    console.log(`⚠️ No specific image found for: ${blog.title}, using default`);
    return this.getDefaultImage(); // Fallback to default if no specific image found
  },

  // Get fallback blog data when API is not accessible
  getFallbackBlogData() {
    return [
      {
        blog_id: 'fallback-1',
        slug: 'cybersecurity-endpoint-protection',
        title: 'Cybersecurity: Why Endpoint Security is the Weakest Link',
        content: `# Cybersecurity: Why Endpoint Security is the Weakest Link

In today's interconnected world, endpoints represent the frontline of cybersecurity defense. Yet, they remain the most vulnerable points in any organization's security infrastructure.

## The reasons are clear:

- Customer trust erosion
- Business downtime during investigations  
- Legal liabilities that stretch for years

## Why Endpoint Security is the Weakest Link

Decentralized workforces mean endpoints are scattered across various locations, making them harder to monitor and protect. Patch management delays leave systems exposed to known vulnerabilities, while insider threats and policy violations add another layer of complexity.

Traditional antivirus limitations make them blind to modern threats, requiring a more comprehensive approach to endpoint security.

## The Cost of Overlooking Endpoints

Organizations that fail to prioritize endpoint security face significant consequences. The financial impact of data breaches, coupled with reputational damage, can be devastating.`,
        author: 'Vardaan Global Team',
        created_at: new Date().toISOString(),
        image: this.getDefaultImage(), // Use default image function
        images: []
      },
      {
        blog_id: 'fallback-2',
        slug: 'ai-consulting-future',
        title: 'AI Consulting: Shaping the Future of Business',
        content: `# AI Consulting: Shaping the Future of Business

Artificial Intelligence is revolutionizing how businesses operate, make decisions, and serve their customers. Organizations that embrace AI consulting services gain a competitive edge in today's rapidly evolving market.

## Key Benefits of AI Consulting

- Strategic AI implementation guidance
- Process automation and optimization
- Data-driven decision making
- Enhanced customer experiences

## Implementation Strategies

Successful AI adoption requires careful planning and execution. Our consulting approach focuses on understanding your business needs, identifying opportunities for AI integration, and implementing solutions that deliver measurable results.

## Future-Proofing Your Business

AI consulting helps organizations future-proof their operations by identifying emerging trends and technologies that can drive growth and efficiency.`,
        author: 'Vardaan Global Team',
        created_at: new Date().toISOString(),
        image: this.getDefaultImage(), // Use default image function
        images: []
      }
    ];
  }
};
