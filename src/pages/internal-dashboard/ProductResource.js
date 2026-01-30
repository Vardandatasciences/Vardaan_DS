import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaDownload, FaArrowLeft, FaSpinner, FaSearch, FaEye, FaShieldAlt, FaCheckCircle, FaTh, FaList, FaHome } from 'react-icons/fa';
import './ProductResource.css';
import Footer from '../../components/Footer/Footer';
import { config } from '../../utils/config';

const ProductResource = () => {
  const { product } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching product data for slug:', product);
        const apiUrl = `${config.API_URL}/api/product-resources/${product}`;
        console.log('API URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          // If response is not OK, try to parse error message
          const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}: ${response.statusText}` }));
          throw new Error(errorData.message || `Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Product data received:', data);
        
        if (data.success && data.product) {
          setProductData(data.product);
          setDocuments(data.documents || []);
        } else {
          setError(data.message || 'Product not found');
        }
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError(err.message || 'Failed to load product data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (product) {
      fetchProductData();
    }
  }, [product]);

  const handleDownload = (document) => {
    if (document.document_url) {
      // Open in new tab for download/viewing
      window.open(document.document_url, '_blank');
    }
  };

  const handleView = (document) => {
    if (document.document_url) {
      // Open in new tab for viewing
      window.open(document.document_url, '_blank');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Filter and sort documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.heading?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = a.created_at || a.updated_at || '';
      const dateB = b.created_at || b.updated_at || '';
      return new Date(dateB) - new Date(dateA);
    }
    if (sortBy === 'name') {
      return (a.heading || '').localeCompare(b.heading || '');
    }
    return 0;
  });

  const formatFileSize = (sizeKB) => {
    if (!sizeKB) return 'Unknown';
    if (sizeKB < 1024) {
      return `${sizeKB} KB`;
    }
    return `${(sizeKB / 1024).toFixed(2)} MB`;
  };

  const getFileTypeLabel = (type) => {
    const typeMap = {
      'pdf': 'PDF',
      'ppt': 'PPT',
      'pptx': 'PPTX',
      'doc': 'DOC',
      'docx': 'DOCX',
      'xls': 'XLS',
      'xlsx': 'XLSX',
      'txt': 'TXT',
      'other': 'File'
    };
    return typeMap[type] || type.toUpperCase();
  };

  if (loading) {
    return (
      <div className="product-resource-page">
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <p>Loading product resources...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="product-resource-page">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>{error || 'The requested product resource could not be found.'}</p>
          <button onClick={() => navigate('/')} className="back-button">
            <FaArrowLeft /> Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-resource-page">
      {/* Header Section */}
      <header className="product-resource-header">
        <div className="product-resource-header-bg">
          <div className="product-resource-header-grid"></div>
          <div className="product-resource-shield-icon">
            <FaShieldAlt />
            <div className="shield-check-icon">
              <FaCheckCircle />
            </div>
          </div>
        </div>
        <div className="product-resource-header-content">
          <div className="breadcrumbs">
            <button onClick={() => navigate('/')} className="breadcrumb-link">
              <FaHome /> Home
            </button>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{productData.heading}</span>
          </div>

          <div className="product-resource-header-main">
            {productData.logo_url && (
              <div className="product-resource-logo">
                <img 
                  src={productData.logo_url} 
                  alt={`${productData.heading} logo`}
                  onError={(e) => {
                    // Hide image if it fails to load
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="product-resource-header-text">
              <h1 className="product-resource-title">{productData.heading}</h1>
              {productData.description && (
                <p className="product-resource-description">{productData.description}</p>
              )}
              <div className="product-resource-metrics">
                <div className="metric-item">
                  <FaFileAlt className="metric-icon" />
                  <span>{documents.length} Document{documents.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="metric-item">
                  <FaShieldAlt className="metric-icon" />
                  <span>Enterprise Grade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <main className="product-resource-content">
        <div className="product-resource-container">
          {documents.length > 0 ? (
            <>
              <div className="documents-section-header">
                <h2>Available Documents</h2>
                <p className="document-count">{sortedDocuments.length} document{sortedDocuments.length !== 1 ? 's' : ''} available for download</p>
              </div>
              
              <div className="documents-controls">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="controls-right">
                  <div className="view-sort-controls">
                    <div className="view-toggle">
                      <button
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        title="Grid View"
                      >
                        <FaTh />
                      </button>
                      <button
                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                        title="List View"
                      >
                        <FaList />
                      </button>
                    </div>
                    <select
                      className="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="date">Date</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className={`documents-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {sortedDocuments.length > 0 ? (
                  sortedDocuments.map((doc) => (
                    <div key={doc.id} className="document-card">
                      <div className="document-card-header">
                        <div className="document-icon">
                          <FaFileAlt />
                        </div>
                        <div className="document-info">
                          <h4 className="document-title">{doc.heading}</h4>
                          {doc.description && (
                            <p className="document-description">{doc.description}</p>
                          )}
                          <div className="document-meta">
                            <span className="document-type">{getFileTypeLabel(doc.document_type)}</span>
                            {doc.file_size_kb && (
                              <span className="document-size">{formatFileSize(doc.file_size_kb)}</span>
                            )}
                            {(doc.created_at || doc.updated_at) && (
                              <span className="document-date">{formatDate(doc.created_at || doc.updated_at)}</span>
                            )}
                          </div>
                          {productData.description && (
                            <p className="product-description-in-card">{productData.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="document-actions">
                        <button 
                          className="document-view-btn"
                          onClick={() => handleView(doc)}
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="document-download-btn"
                          onClick={() => handleDownload(doc)}
                        >
                          <FaDownload />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-documents-filtered">
                    <p>No documents match your search criteria.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-documents">
              <FaFileAlt className="no-documents-icon" />
              <h3>No Documents Available</h3>
              <p>There are currently no documents available for this product.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductResource;

