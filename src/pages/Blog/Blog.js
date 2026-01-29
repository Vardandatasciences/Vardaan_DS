import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';
import Footer from '../../components/Footer/Footer';
import { blogService } from '../../services/blogService';
import BlogDetailsPopup from './BlogDetailsPopup';
import { config } from '../../utils/config';
import { getBlogImageSrc, getAvailableImages } from '../../utils/blogImageUtils';

// Robust image component with fallback handling
const BlogImage = ({ blog, className = "blog-image", isFeatured = false }) => {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  useEffect(() => {
    if (blog.image) {
      const localSrc = getBlogImageSrc(blog.image);
      setCurrentSrc(localSrc || `${config.BLOG_API_URL}/uploads/blog-images/${blog.image}`);
      setImageError(false);
    }
  }, [blog.image]);

  const handleError = () => {
    console.log(`❌ ${isFeatured ? 'Featured' : 'Blog card'} image failed to load:`, blog.image);
    console.log('❌ Attempted URL:', currentSrc);
    console.log('❌ Blog data:', { id: blog.blog_id || blog.id, title: blog.title, image: blog.image });
    
    if (!imageError && currentSrc !== `${config.BLOG_API_URL}/uploads/blog-images/${blog.image}`) {
      // Try API URL as fallback
      console.log('🔄 Trying API URL fallback...');
      setCurrentSrc(`${config.BLOG_API_URL}/uploads/blog-images/${blog.image}`);
      setImageError(true);
    } else {
      // All options failed, show placeholder
      console.log('❌ All image sources failed, showing placeholder');
      setImageError(true);
    }
  };

  const handleLoad = () => {
    console.log(`✅ ${isFeatured ? 'Featured' : 'Blog card'} image loaded successfully:`, blog.image);
    console.log('✅ Loaded URL:', currentSrc);
  };

  if (!blog.image || imageError) {
    return (
      <div className="blog-image-placeholder" style={{ display: 'flex' }}>
        <div className="placeholder-text">No Image</div>
      </div>
    );
  }

  return (
    <img 
      src={currentSrc}
      alt={blog.title}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
};

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      const blogsData = await blogService.getAllBlogs();
      console.log('📝 Fetched blogs data:', blogsData);
      
      // Debug: Log image information for each blog
      blogsData.forEach((blog, index) => {
        console.log(`📝 Blog ${index + 1} image info:`, {
          id: blog.blog_id || blog.id,
          title: blog.title,
          image: blog.image,
          imageType: typeof blog.image,
          hasLocalImage: blog.image ? getBlogImageSrc(blog.image) !== null : false,
          localImageUrl: blog.image ? getBlogImageSrc(blog.image) : null
        });
      });
      
      setBlogs(blogsData);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = (blog) => {
    console.log('🔍 Blog clicked:', blog);
    console.log('Blog slug:', blog.slug);
    console.log('Blog title:', blog.title);
    setSelectedBlog(blog);
    setShowPopup(true);
  };

  const handlePopupSubmit = (requestId) => {
    console.log('📝 Popup submitted, navigating to:', `/blog/${selectedBlog.slug}`);
    // Navigate to the blog post page
    if (selectedBlog.slug) {
      navigate(`/blog/${selectedBlog.slug}`);
    } else {
      // Fallback to ID if slug is missing
      console.warn('⚠️ Slug missing, using blog ID as fallback');
      navigate(`/blog/${selectedBlog.blog_id || selectedBlog.id}`);
    }
    setShowPopup(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedBlog(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-page">
        <div className="blog-loading">
          <div className="loading-spinner"></div>
          <p>Loading blogs...</p>
          <p className="loading-subtitle">Please wait while we fetch the latest content</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <div className="blog-error">
          <h2>Unable to Load Blogs</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={fetchBlogs} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="blog-page">
        <div className="blog-empty">
          <h2>No Blogs Available</h2>
          <p>Check back soon for new content!</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Featured Blog Post */}
      {blogs.length > 0 && (
        <div className="featured-blog-section">
          <div 
            className="featured-blog-container"
            onClick={() => handleBlogClick(blogs[0])}
            style={{ cursor: 'pointer' }}
          >
            <div className="featured-blog-image">
              <BlogImage blog={blogs[0]} className="blog-image" isFeatured={true} />
            </div>
            
            <div className="featured-blog-content">
              <h1 className="featured-blog-title">{blogs[0].title}</h1>
              <p className="featured-blog-description">
                {blogs[0].content ? blogs[0].content.substring(0, 200) + '...' : 'No content available'}
              </p>
              <div className="featured-blog-meta">
                <span className="featured-blog-date">{formatDate(blogs[0].created_at || blogs[0].date)}</span>
                <span className="featured-blog-category">{blogs[0].category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Other Blog Posts Grid */}
      {blogs.length > 1 && (
        <div className="blog-content">
          <div className="blog-grid">
            {blogs.slice(1).map((blog) => (
              <article 
                key={blog.blog_id || blog.id} 
                className="blog-card"
                onClick={() => handleBlogClick(blog)}
              >
                <div className="blog-card-image">
                  <BlogImage blog={blog} className="blog-image" isFeatured={false} />
                </div>
                
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <div className="blog-meta-right">
                      <span className="blog-category-text">{blog.category}</span>
                      <span className="blog-date">{formatDate(blog.created_at || blog.date)}</span>
                    </div>
                  </div>
                  
                  <h2 className="blog-card-title">{blog.title}</h2>
                  <p className="blog-card-description">
                    {blog.content ? blog.content.substring(0, 150) + '...' : 'No content available'}
                  </p>
                  
                  <div className="blog-card-author">
                    <span>By {blog.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {showPopup && selectedBlog && (
        <BlogDetailsPopup
          isOpen={showPopup}
          onClose={handlePopupClose}
          onSubmit={handlePopupSubmit}
          blogTitle={selectedBlog.title}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Blog;
