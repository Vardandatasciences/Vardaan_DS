import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogList.css';
import { blogService } from '../../services/blogService';

const BlogList = () => {
  const history = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogsData = await blogService.getAllBlogs();
      setBlogs(blogsData);
      setError('');
    } catch (err) {
      setError('Failed to load blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = (blogId) => {
    history(`/admin/blogs/edit/${blogId}`);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      const result = await blogService.deleteBlog(blogId);
      if (result.success) {
        // Remove blog from state
        setBlogs(blogs.filter(blog => blog.blog_id !== blogId));
        setDeleteConfirm(null);
      } else {
        setError(result.message || 'Failed to delete blog');
      }
    } catch (err) {
      setError('Failed to delete blog');
      console.error('Error deleting blog:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'AI & Technology': '#667eea',
      'Cybersecurity': '#e53e3e',
      'Data Strategy': '#38a169',
      'ERP Services': '#d69e2e',
      'Training & Development': '#805ad5',
      'Digital Transformation': '#3182ce',
      'General': '#718096'
    };
    return colors[category] || '#718096';
  };

  if (loading) {
    return (
      <div className="blog-list-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-container">
      {/* Header */}
      <div className="blog-list-header">
        <div className="blog-list-header-content">
          <div className="header-left">
            <button
              onClick={() => history('/admin')}
              className="back-to-dashboard-button"
            >
              ← Back to Dashboard
            </button>
            <h1>Manage Blog Posts</h1>
          </div>
          <button
            onClick={() => history('/admin/blogs/new')}
            className="new-blog-button"
          >
            + Write New Blog
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')} className="error-close">×</button>
        </div>
      )}

      {/* Blog List */}
      <div className="blog-list-content">
        {blogs.length === 0 ? (
          <div className="empty-state">
            <h3>No blogs yet</h3>
            <p>Start writing your first blog post to get started!</p>
            <button
              onClick={() => history('/admin/blogs/new')}
              className="empty-state-button"
            >
              Write Your First Blog
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <div key={blog.blog_id} className="blog-card">
                <div className="blog-card-image">
                  <img 
                    src={blog.image || 'https://via.placeholder.com/400x200?text=No+Image'} 
                    alt={blog.title}
                  />
                  <div className="blog-card-overlay">
                    <span 
                      className="blog-category"
                      style={{ backgroundColor: getCategoryColor(blog.category) }}
                    >
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="blog-card-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-excerpt">
                    {blog.content.substring(0, 120)}...
                  </p>
                  
                  <div className="blog-meta">
                    <span className="blog-author">By {blog.author}</span>
                    <span className="blog-date">{formatDate(blog.created_at)}</span>
                  </div>
                  
                  <div className="blog-actions">
                    <button
                      onClick={() => handleEditBlog(blog.blog_id)}
                      className="edit-button"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(blog.blog_id)}
                      className="delete-button"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="delete-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Blog Post</h3>
            <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
            <div className="delete-modal-actions">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBlog(deleteConfirm)}
                className="confirm-delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
