import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { config } from '../../utils/config';
import './BlogEditor.css';
import { blogService } from '../../services/blogService';

const BlogEditor = () => {
  const history = useNavigate();
  const { id } = useParams(); // Get the blog ID from URL params
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('General');
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  // Check if we're in edit mode and fetch existing blog data
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchBlogData();
    }
  }, [id]);

  // Fetch existing blog data for editing
  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const blog = await blogService.getBlogById(id);
      
      // Populate form with existing data
      setTitle(blog.title || '');
      setContent(blog.content || '');
      setAuthor(blog.author || '');
      setCategory(blog.category || 'General');
      
      // Handle existing images if any
      if (blog.images && blog.images.length > 0) {
        setUploadedImages(blog.images.map((img, index) => ({
          id: `existing_${index}`,
          name: `Existing Image ${index + 1}`,
          url: img.image_url,
          isExisting: true
        })));
      }
      
    } catch (error) {
      console.error('Error fetching blog data:', error);
      setError('Failed to load blog data for editing');
    } finally {
      setLoading(false);
    }
  };

  // Categories for blog posts
  const categories = [
    'AI & Technology',
    'Cybersecurity',
    'Data Strategy',
    'ERP Services',
    'Training & Development',
    'Digital Transformation',
    'General'
  ];

  // Handle content changes and detect Enter key for image insertion
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Insert image at cursor position
  const insertImage = (imageFile, imageUrl) => {
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);
    
    // Generate a unique identifier for the image
    const imageId = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Insert image marker with unique ID in the content
    const imageText = `\n\n![${imageFile.name}](${imageId})\n\n`;
    
    const newContent = beforeText + imageText + afterText;
    setContent(newContent);
    
    // Store the image file and URL for later processing
    setUploadedImages(prev => [...prev, {
      id: imageId,
      name: imageFile.name,
      file: imageFile,
      url: imageUrl
    }]);
    
    // Set cursor position after the inserted image
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + imageText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 2MB to avoid payload issues)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    try {
      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      
      // Insert the image at cursor position
      insertImage(file, imageUrl);
      
      // Clear the file input
      e.target.value = '';
      setError('');
      
    } catch (error) {
      setError('Failed to upload image. Please try again.');
    }
  };

  // Trigger file input when plus button is clicked
  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !author.trim() || !category.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsPublishing(true);
    setError('');
    setSuccess('');

    try {
      if (isEditMode) {
        // Update existing blog
        const result = await blogService.updateBlog(id, {
          title: title.trim(),
          content: content.trim(),
          author: author.trim(),
          category: category
        });
        
        if (result.success) {
          setSuccess('Blog updated successfully!');
          // Redirect to blog list after 2 seconds
          setTimeout(() => {
            history('/admin/blogs');
          }, 2000);
        } else {
          setError(result.message || 'Failed to update blog');
        }
      } else {
        // Create new blog
        // Create FormData to handle file uploads
        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('content', content.trim());
        formData.append('author', author.trim());
        formData.append('category', category);

        // Debug: Log what we're sending
        console.log('Sending data:', {
          title: title.trim(),
          content: content.trim(),
          contentLength: content.trim().length,
          author: author.trim(),
          category: category,
          imagesCount: uploadedImages.length
        });
        
        // Log the full content to see if it's being truncated
        console.log('Full content being sent:', content);

        // Add uploaded images to FormData
        if (uploadedImages.length > 0) {
          uploadedImages.forEach((imageData, index) => {
            if (imageData.file) {
              formData.append('images', imageData.file);
            }
          });
        }

        // Send request with FormData
        console.log('Making request to:', `${config.BLOG_API_URL}/api/admin/blogs`);
        console.log('Request method:', 'POST');
        console.log('FormData contents:', formData);
        
        const response = await fetch(`${config.BLOG_API_URL}/api/admin/blogs`, {
          method: 'POST',
          body: formData, // Send as FormData instead of JSON
          credentials: 'include', // Include credentials if needed
        });

        if (!response.ok) {
          let errorMessage = 'Failed to create blog';
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            // If we can't parse JSON, it might be an HTML error page
            console.error('Failed to parse error response:', parseError);
            errorMessage = `Server error: ${response.status} ${response.statusText}`;
          }
          throw new Error(errorMessage);
        }

        const result = await response.json();
        
        if (result.success) {
          setSuccess('Blog published successfully!');
          // Reset form
          setTitle('');
          setContent('');
          setAuthor('');
          setCategory('');
          setUploadedImages([]);
          
          // Redirect to blog list after 2 seconds
          setTimeout(() => {
            history('/admin/blogs');
          }, 2000);
        } else {
          setError(result.message || 'Failed to publish blog');
        }
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      
      // Check for CORS errors specifically
      if (error.message === 'Failed to fetch') {
        setError('CORS Error: Unable to connect to the server. This might be due to cross-origin restrictions. Please check your server configuration.');
      } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        setError('Network Error: Unable to connect to the server. Please check if the backend server is running and accessible.');
      } else {
        setError(error.message || `Failed to ${isEditMode ? 'update' : 'publish'} blog. Please try again.`);
      }
    } finally {
      setIsPublishing(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter to publish
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };



  return (
    <div className="blog-editor-container">
      {/* Loading State */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading blog data...</p>
        </div>
      )}
      
      {/* Header */}
      <div className="blog-editor-header">
        <div className="blog-editor-header-content">
          <button 
            onClick={() => history('/admin/blogs')}
            className="back-button"
          >
            ← Back to Blogs
          </button>
          <h1>{isEditMode ? 'Edit Blog Post' : 'Write New Blog Post'}</h1>
          <button
            onClick={handleSubmit}
            disabled={isPublishing || loading}
            className="publish-button"
          >
            {loading ? 'Loading...' : isPublishing ? (isEditMode ? 'Updating...' : 'Publishing...') : (isEditMode ? 'Update Blog' : 'Publish Blog')}
          </button>
        </div>
      </div>

      {/* Editor Form */}
      <div className="blog-editor-form">
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="blog-title-input"
              maxLength={255}
            />
          </div>

          {/* Author and Category */}
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="Author name..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="blog-author-input"
                maxLength={100}
              />
            </div>
            <div className="form-group">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="blog-category-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Content Editor */}
          <div className="content-editor-container">
            <div className="content-editor-header">
              <span className="editor-label">Content</span>
              <button
                type="button"
                onClick={handleImageButtonClick}
                className="insert-image-button"
                title="Insert Image (Ctrl/Cmd + I)"
              >
                <span className="plus-symbol">+</span>
                <span className="button-text">Insert Image</span>
              </button>
            </div>
            <div className="image-upload-info">
              <small>📸 Images are limited to 2MB. For production use, consider using cloud storage.</small>
            </div>
            
            {/* Formatting Guide */}
            <div className="formatting-guide">
              <h4>📝 Formatting Guide:</h4>
              <div className="formatting-examples">
                <div className="format-example">
                  <strong>Main Heading:</strong> Start with <code># </code> (e.g., <code># Introduction</code>)
                </div>
                <div className="format-example">
                  <strong>Sub Heading:</strong> Start with <code>## </code> or <code>**</code> (e.g., <code>## Key Points</code> or <code>**Important Note**</code>)
                </div>
                <div className="format-example">
                  <strong>Bullet Points:</strong> Start with <code>- </code>, <code>• </code>, or <code>* </code> (e.g., <code>- First point</code>)
                </div>
                <div className="format-example">
                  <strong>Numbered Lists:</strong> Start with <code>1. </code>, <code>2. </code> (e.g., <code>1. First step</code>)
                </div>
                <div className="format-example">
                  <strong>Images:</strong> Click the + button to insert images inline with your content
                </div>
              </div>
            </div>
            
            <textarea
              ref={contentRef}
              placeholder="Start writing your blog post... You can use markdown syntax for formatting. Press Ctrl/Cmd + Enter to publish."
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              className="blog-content-textarea"
              rows={20}
            />
            
            {/* Image Preview Section */}
            {uploadedImages.length > 0 && (
              <div className="image-preview-section">
                <h4>Images in Content:</h4>
                <div className="image-preview-grid">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="image-preview-item">
                      <img 
                        src={image.url} 
                        alt={image.name}
                        className="preview-thumbnail"
                      />
                      <div className="image-info">
                        <span className="image-name">{image.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedImages(prev => prev.filter((_, i) => i !== index));
                            // Remove image from content using the image ID
                            const newContent = content.replace(new RegExp(`\\n\\n!\\[${image.name}\\]\\(${image.id}\\)\\n\\n`, 'g'), '');
                            setContent(newContent);
                          }}
                          className="remove-image-button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => history('/admin/blogs')}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPublishing}
              className="submit-button"
            >
              {isPublishing ? 'Publishing...' : 'Publish Blog Post'}
            </button>
          </div>
        </form>
      </div>

      {/* Help Section */}
      <div className="editor-help">
        <h3>Writing Tips</h3>
        <ul>
          <li>Use <strong>## Heading</strong> for section headers</li>
          <li>Use <strong>- Item</strong> for bullet points</li>
          <li>Use <strong>1. Item</strong> for numbered lists</li>
          <li>Click the <strong>+ Insert Image</strong> button to add images</li>
          <li>Press <strong>Ctrl/Cmd + Enter</strong> to publish quickly</li>
        </ul>
      </div>
    </div>
  );
};

export default BlogEditor;
