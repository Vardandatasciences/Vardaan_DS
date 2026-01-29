import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogPost.css';
import Footer from '../../components/Footer/Footer';
import { blogService } from '../../services/blogService';

import { getBlogImageUrl } from '../../assets/Images/Blog';

// Image Component - Uses LOCAL assets folder only (NO API dependency)
const RobustImage = ({ imageUrls, imageIndex, onImageClick, className, alt, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  // Log the image URLs for debugging
  console.log(`🖼️ RobustImage received URLs:`, imageUrls);
  
  // Get the current image URL
  const imageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[currentImageIndex] : null;

  const handleImageLoad = () => {
    console.log('✅ BlogPost image loaded successfully:', imageUrl);
    setImageError(false);
  };

  const handleImageError = (error) => {
    console.log('❌ BlogPost image failed to load:', imageUrl);
    console.log('❌ Error details:', error);
    
    // Try next image URL if available
    if (imageUrls && currentImageIndex < imageUrls.length - 1) {
      console.log(`🔄 Trying next image URL (${currentImageIndex + 1}/${imageUrls.length})`);
      setCurrentImageIndex(prev => prev + 1);
      setImageError(false);
    } else {
      console.log('❌ All image URLs failed, showing placeholder');
      setImageError(true);
    }
  };

  // If no image URL is available or all failed, show a placeholder
  if (!imageUrl || imageError) {
    console.log('⚠️ No image URL provided to RobustImage or all failed');
    return (
      <div className="blog-post-image-placeholder">
        <div className="placeholder-text">No image available</div>
      </div>
    );
  }

  console.log(`🖼️ Rendering image ${currentImageIndex + 1}/${imageUrls.length}: ${imageUrl}`);

  return (
    <img 
      src={imageUrl} 
      alt={alt || `Blog Image ${imageIndex + 1}`}
      className={className || 'blog-post-image'}
      onClick={onImageClick ? () => onImageClick(imageUrl) : undefined}
      title={title}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleImageClick = (imageUrl) => {
    // Open image in new tab for full size view
    window.open(imageUrl, '_blank');
  };



  // Note: BlogPost images load from LOCAL assets folder only - NO backend API dependency

  // Helper function to get image URLs from LOCAL assets only
  const getLocalImageUrls = (imageUrl) => {
    if (!imageUrl) return [];
    
    // Get clean filename
    let fileName = imageUrl;
    if (imageUrl.includes('/')) {
      fileName = imageUrl.split('/').pop();
    }
    
    if (!fileName) return [];
    
    // Prioritize imported images from assets folder first
    const importedImageUrl = getBlogImageUrl(fileName);
    const localAssetUrls = [];
    
    if (importedImageUrl) {
      localAssetUrls.push(importedImageUrl);
      console.log(`✅ Found imported image: ${importedImageUrl}`);
    }
    
    // Add fallback URLs in order of priority
    localAssetUrls.push(
      // Try S3 first (as per user preference)
      `https://vardaanwebsites.s3.ap-south-1.amazonaws.com/assets/Blog/${fileName}`,
      // Then try local assets
      `/assets/images/Blog/${fileName}`,
      `./assets/images/Blog/${fileName}`,
      `assets/images/Blog/${fileName}`,
      `/src/assets/images/Blog/${fileName}`,
      // Finally try backend routes
      `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/assets/Blog/${fileName}`,
      `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/blog-images/${fileName}`
    );
    
    console.log(`🖼️ Generated image URLs for ${fileName}:`, localAssetUrls);
    return localAssetUrls;
  };

  // Function to render blog content
  const renderBlogContent = () => {
    if (!blogPost.content) return null;
    
    // Split content by lines and process each line
    const lines = blogPost.content.split('\n');
    
    const renderedContent = [];
    let currentParagraph = [];
    let listItems = [];
    let inList = false;
    
    lines.forEach((line, lineIndex) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) {
        // If we have accumulated content in current paragraph, render it
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(' ');
          renderedContent.push(
            <p key={`p-${lineIndex}`} className="blog-post-paragraph">
              {paragraphText}
            </p>
          );
          currentParagraph = [];
        }
        
        // If we have accumulated list items, render them
        if (listItems.length > 0) {
          renderedContent.push(
            <ul key={`list-${lineIndex}`} className="blog-post-list">
              {listItems.map((item, itemIndex) => (
                <li key={`item-${lineIndex}-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        return;
      }
      
      // Check if this line contains an image reference
      const imageMatch = trimmedLine.match(/(?:Picture\d+\.(?:jpg|jpeg|png|gif)|[A-Za-z0-9_-]+\.(?:jpg|jpeg|png|gif|webp|avif))/);
      
      if (imageMatch) {
        // If we have accumulated content in current paragraph, render it first
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(' ');
          renderedContent.push(
            <p key={`p-${lineIndex}`} className="blog-post-paragraph">
              {paragraphText}
            </p>
          );
          currentParagraph = [];
        }
        
        // Render the image using database images
        const imageUrl = imageMatch[0];
        console.log(`🖼️ Content image detected: ${imageUrl}`);
        
        // Use the actual blog images from database instead of text extraction
        if (blogPost.images && blogPost.images.length > 0) {
          // Try to find matching image or use the first available image
          let blogImageToUse = null;
          
          // Look for a matching image in the blog.images array
          const matchingImage = blogPost.images.find(img => {
            const imgUrl = img.image_url || img;
            return imgUrl.includes(imageUrl) || imageUrl.includes(imgUrl);
          });
          
          if (matchingImage) {
            blogImageToUse = matchingImage.image_url || matchingImage;
            console.log(`✅ Found matching image: ${blogImageToUse}`);
          } else {
            // Use the first available image as fallback
            blogImageToUse = blogPost.images[0].image_url || blogPost.images[0];
            console.log(`🔄 Using first available image: ${blogImageToUse}`);
          }
          
          // Generate URLs for this image (LOCAL assets only)
          const imageUrls = getLocalImageUrls(blogImageToUse);
          
          console.log(`🖼️ Generated content image URLs:`, imageUrls);
          
          renderedContent.push(
            <div key={`img-${lineIndex}`} className="blog-post-content-image">
              <RobustImage 
                imageUrls={imageUrls}
                imageIndex={0}
                onImageClick={handleImageClick}
                className="blog-post-image"
                alt={`Blog content image`}
                title={blogImageToUse}
              />
            </div>
          );
        } else {
          // Show placeholder if no images available
          console.log(`❌ No blog images available for content image`);
          renderedContent.push(
            <div key={`img-${lineIndex}`} className="blog-post-content-image">
              <div className="blog-post-image-placeholder">
                <div className="placeholder-text">No image available</div>
              </div>
            </div>
          );
        }
        
        return;
      }
      
      // Check if this line is a main heading (# or specific patterns)
      if (trimmedLine.startsWith('# ') || 
          (lineIndex === 0 && !trimmedLine.startsWith('##') && trimmedLine.length > 20) ||
          trimmedLine.includes('When One Weak Endpoint Becomes a Million-Dollar Breach') ||
          trimmedLine.includes('Why Endpoint Security is the Weakest Link') ||
          trimmedLine.includes('The Cost of Overlooking Endpoints')) {
        // If we have accumulated content in current paragraph, render it first
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(' ');
          renderedContent.push(
            <p key={`p-${lineIndex}`} className="blog-post-paragraph">
              {paragraphText}
            </p>
          );
          currentParagraph = [];
        }
        
        // Render the main heading
        const headingText = trimmedLine.startsWith('# ') ? trimmedLine.substring(2) : trimmedLine;
        renderedContent.push(
          <h1 key={`h1-${lineIndex}`} className="blog-post-main-heading">
            {headingText}
          </h1>
        );
        return;
      }
      
      // Check if this line is a subheading (## or specific patterns)
      if (trimmedLine.startsWith('## ') || 
          trimmedLine.endsWith(':') ||
          trimmedLine.includes('The reasons are clear:') ||
          trimmedLine.match(/^[A-Z][^.!?]*:$/) ||
          trimmedLine.includes('Why Endpoint Security') ||
          trimmedLine.includes('The Cost of Overlooking')) {
        // If we have accumulated content in current paragraph, render it first
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(' ');
          renderedContent.push(
            <p key={`p-${lineIndex}`} className="blog-post-paragraph">
              {paragraphText}
            </p>
          );
          currentParagraph = [];
        }
        
        // Render the subheading
        const subheadingText = trimmedLine.startsWith('## ') ? trimmedLine.substring(3) : trimmedLine;
        renderedContent.push(
          <h2 key={`h2-${lineIndex}`} className="blog-post-subheading">
            {subheadingText}
          </h2>
        );
        return;
      }
      
      // Check if this line is a list item
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ') || trimmedLine.startsWith('* ')) {
        // If we have accumulated content in current paragraph, render it first
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(' ');
          renderedContent.push(
            <p key={`p-${lineIndex}`} className="blog-post-paragraph">
              {paragraphText}
            </p>
          );
          currentParagraph = [];
        }
        
        // Add to list items
        const listItemText = trimmedLine.substring(2);
        listItems.push(listItemText);
        inList = true;
        return;
      }
      
      // Check if this line is a numbered list item
      if (/^\d+\.\s/.test(trimmedLine)) {
        // If we have accumulated content in current paragraph, render it first
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(' ');
          renderedContent.push(
            <p key={`p-${lineIndex}`} className="blog-post-paragraph">
              {paragraphText}
            </p>
          );
          currentParagraph = [];
        }
        
        // Add to list items
        const listItemText = trimmedLine.replace(/^\d+\.\s/, '');
        listItems.push(listItemText);
        inList = true;
        return;
      }
      
      // Check if line contains bold text or special formatting
      if (trimmedLine.includes('**') || trimmedLine.match(/^[A-Z][a-z\s]+$/)) {
        // If we have accumulated content in current paragraph, render it first
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(' ');
          renderedContent.push(
            <p key={`p-${lineIndex}`} className="blog-post-paragraph">
              {paragraphText}
            </p>
          );
          currentParagraph = [];
        }
        
        // Render formatted text
        const formattedText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        renderedContent.push(
          <p key={`formatted-${lineIndex}`} className="blog-post-paragraph" 
             dangerouslySetInnerHTML={{ __html: formattedText }}>
          </p>
        );
        return;
      }
      
      // Regular text line - add to current paragraph
      currentParagraph.push(trimmedLine);
    });
    
    // Handle any remaining content
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(' ');
      renderedContent.push(
        <p key="p-final" className="blog-post-paragraph">
          {paragraphText}
        </p>
      );
    }
    
    if (listItems.length > 0) {
      renderedContent.push(
        <ul key="list-final" className="blog-post-list">
          {listItems.map((item, itemIndex) => (
            <li key={`item-final-${itemIndex}`}>{item}</li>
          ))}
        </ul>
      );
    }
    
    return renderedContent;
  };

  useEffect(() => {
      const fetchBlog = async () => {
    try {
      setLoading(true);
      const blog = await blogService.getBlogBySlug(slug);
      console.log('🔍 Raw blog data from API:', blog);
      
      const formattedBlog = blogService.formatBlogForDisplay(blog);
      console.log('🔍 Formatted blog data:', formattedBlog);
      console.log('🔍 Blog images:', formattedBlog.images);
      
      setBlogPost(formattedBlog);
      setError(null);
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Blog not found or failed to load.');
      setBlogPost(null);
    } finally {
      setLoading(false);
    }
  };

  if (slug) {
    fetchBlog();
  }
  }, [slug]);

  const handleBackToBlog = () => {
            navigate('/blog');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-loading">
          <div className="loading-spinner"></div>
          <p>Loading blog post...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (error || !blogPost) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-error">
          <h2>Blog Post Not Found</h2>
          <p>{error || 'The blog post you are looking for does not exist.'}</p>
          <button onClick={handleBackToBlog} className="back-button">
            Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      {/* Debug info */}
      {console.log('🔍 Blog post data for breadcrumb:', {
        category: blogPost.category,
        title: blogPost.title,
        hasCategory: !!blogPost.category,
        hasTitle: !!blogPost.title
      })}
      
      {/* Breadcrumb Navigation */}
      <div className="blog-post-breadcrumb">
        <span className="breadcrumb-item" onClick={handleBackToBlog}>
          Blog
        </span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active">
          {blogPost.category || blogPost.title || 'Blog Post'}
        </span>
      </div>

      {/* Hero Section */}
      <div className="blog-post-hero">
        <div className="blog-post-hero-content">
          <div className="blog-post-hero-text">
            <h1 className="blog-post-title">{blogPost.title}</h1>
            <p className="blog-post-intro">{blogPost.description}</p>
            <div className="blog-post-meta">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">{blogPost.date}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">👤</span>
                <span className="meta-text">{blogPost.author || 'Vardaan Global'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🏷️</span>
                <span className="meta-text">{blogPost.category}</span>
              </div>
            </div>
          </div>
                      <div className="blog-post-hero-image">
              {(() => {
                // Generate hero image URLs directly
                const heroImageUrl = blogPost.image || (blogPost.images && blogPost.images.length > 0 ? (blogPost.images[0].image_url || blogPost.images[0]) : null);
                const heroImageUrls = getLocalImageUrls(heroImageUrl);
                
                console.log(`🖼️ Hero image URL: ${heroImageUrl}`);
                console.log(`🖼️ Hero image URLs:`, heroImageUrls);
                
                return (
                  <RobustImage 
                    imageUrls={heroImageUrls}
                    imageIndex={0}
                    onImageClick={handleImageClick}
                    className="blog-post-hero-image"
                    alt={`Blog hero image for ${blogPost.title}`}
                    title={blogPost.title}
                  />
                );
              })()}
            </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-post-content">
        <div className="blog-post-content-wrapper">
          {/* Removed duplicate main image - keeping only the hero image above */}
          
          <div className="blog-post-text">
            {/* Display blog content with inline images */}
            {renderBlogContent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
