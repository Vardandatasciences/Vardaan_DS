import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const history = useNavigate();

  const adminFeatures = [
    {
      title: 'Blog Management',
      description: 'Create, edit, and manage blog posts',
      icon: '📝',
      path: '/admin/blogs',
      color: '#667eea'
    },
    {
      title: 'Content Analytics',
      description: 'View blog performance and engagement metrics',
      icon: '📊',
      path: '/admin/analytics',
      color: '#38a169',
      comingSoon: true
    },
    {
      title: 'User Management',
      description: 'Manage admin users and permissions',
      icon: '👥',
      path: '/admin/users',
      color: '#d69e2e',
      comingSoon: true
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences and integrations',
      icon: '⚙️',
      path: '/admin/settings',
      color: '#805ad5',
      comingSoon: true
    }
  ];

  const handleFeatureClick = (feature) => {
    if (feature.comingSoon) {
      alert('This feature is coming soon!');
      return;
    }
    
    // Check if we're already on the blog management page
    if (feature.path === '/admin/blogs' && window.location.pathname === '/admin/blogs') {
      // If already on blog management, show a message
      alert('You are already on the Blog Management page. Use the "Write New Blog" button to create a new post.');
      return;
    }
    
    history(feature.path);
  };

  // Get current path to highlight active feature
  const currentPath = window.location.pathname;

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-header-content">
          <h1>Admin Dashboard</h1>
          <p>Manage your website content and settings</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="admin-dashboard-content">
        <div className="features-grid">
          {adminFeatures.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${feature.comingSoon ? 'coming-soon' : ''} ${currentPath === feature.path ? 'active' : ''}`}
              onClick={() => handleFeatureClick(feature)}
              style={{ '--feature-color': feature.color }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                {feature.comingSoon && (
                  <span className="coming-soon-badge">Coming Soon</span>
                )}
              </div>
              <div className="feature-arrow">→</div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <h2>Quick Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3>Total Blogs</h3>
                <p className="stat-number">5</p>
                <p className="stat-label">Published posts</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🖼️</div>
              <div className="stat-content">
                <h3>Total Images</h3>
                <p className="stat-number">10</p>
                <p className="stat-label">Uploaded images</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👁️</div>
              <div className="stat-content">
                <h3>Total Views</h3>
                <p className="stat-number">0</p>
                <p className="stat-label">Page views</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">✅</div>
              <div className="activity-content">
                <p>Blog system setup completed</p>
                <span className="activity-time">Just now</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <p>5 sample blog posts created</p>
                <span className="activity-time">2 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">🖼️</div>
              <div className="activity-content">
                <p>10 sample images uploaded</p>
                <span className="activity-time">5 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
