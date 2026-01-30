import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImage from '../../assets/Images/Home/Vardaan Ds (2).png';
import { config } from '../../utils/config';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({}); // { [categoryId]: boolean }
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [associationDropdown, setAssociationDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch nav categories and items from backend
  useEffect(() => {
    const fetchNavData = async () => {
      try {
        const API_BASE_URL = config.API_URL;
        const [catRes, itemRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/nav-categories`),
          fetch(`${API_BASE_URL}/api/nav-items`),
        ]);
        const catData = await catRes.json();
        const itemData = await itemRes.json();
        if (catData.success && itemData.success) {
          setCategories(catData.categories);
          setItems(itemData.items);
          console.log('Fetched categories:', catData.categories);
          console.log('Fetched items:', itemData.items);
        }
      } catch (err) {
        // eslint-disable-next-line
        console.error('Failed to fetch navbar data', err);
      }
    };
    fetchNavData();
  }, []);

  // Function to check if a route is currently active
  const isRouteActive = (route) => {
    return location.pathname === route;
  };

  // Function to check if blogs route is active
  const isBlogsActive = () => {
    return location.pathname === '/blog' || 
           location.pathname === '/blogs' || 
           location.pathname.startsWith('/blog/');
  };

  // Helper: get items for a category
  const getItemsForCategory = (categoryId) => {
    return items.filter((item) => String(item.category_id) === String(categoryId));
  };
 
  // Helper: is route active for a link
  const isDropdownActive = (categoryId) => {
    return dropdownOpen[categoryId] || false;
  };

  // Handle dropdown open/close
  const handleDropdown = (categoryId, open) => {
    setDropdownOpen((prev) => ({ ...prev, [categoryId]: open }));
  };

  // Function to check if any services route is active
  const isServicesActive = () => {
    return location.pathname.startsWith('/services');
  };

  // Function to check if any products route is active
  const isProductsActive = () => {
    return location.pathname === '/riskavaire' || 
           location.pathname === '/prosync' || 
           location.pathname === '/ViCTAA' || 
           location.pathname === '/smartlogistics' ||
           location.pathname === '/smartcashflow' ||
           location.pathname === '/voicelume';
  };

  // Function to check if any association route is active
  const isAssociationActive = () => {
    return location.pathname === '/group-companies' || 
           location.pathname === '/consortium-partners';
  };

  // Handle navigation
  const handleNav = (link, event) => {
    event.preventDefault();
    navigate(link);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      setDropdownOpen({});
      setServicesDropdown(false);
      setProductsDropdown(false);
      setAssociationDropdown(false);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen({});
    setServicesDropdown(false);
    setProductsDropdown(false);
    setAssociationDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setDropdownOpen({});
        setServicesDropdown(false);
        setProductsDropdown(false);
        setAssociationDropdown(false);
      }
    };
    
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setDropdownOpen({});
        setServicesDropdown(false);
        setProductsDropdown(false);
        setAssociationDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const handleHamburgerClick = () => {
    setMobileMenuOpen((prev) => !prev);
    setServicesDropdown(false);
    setProductsDropdown(false);
    setAssociationDropdown(false);
    setDropdownOpen({});
  };

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setProductsDropdown(false);
    setAssociationDropdown(false);
    setDropdownOpen({});
  };

  // Function to handle smooth scrolling to sections
  const handleScrollToSection = (sectionId, event) => {
    event.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    } else {
      // If already on home page, scroll to section directly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to scroll to top (for logo click)
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      navigate('/');
    }
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle RiskaVaire navigation
  const handleRiskaVaireNavigation = (event) => {
    event.preventDefault();
    navigate('/riskavaire');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle ProSync navigation
  const handleProSyncNavigation = (event) => {
    event.preventDefault();
    navigate('/prosync');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle ViCTAA navigation
  const handleVictaaNavigation = (event) => {
    event.preventDefault();
    navigate('/ViCTAA');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle SmartLogistics navigation
  const handleSmartLogisticsNavigation = (event) => {
    event.preventDefault();
    navigate('/smartlogistics');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle Smart Cashflow navigation
  const handleSmartCashflowNavigation = (event) => {
    event.preventDefault();
    navigate('/smartcashflow');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle VoiceLume navigation
  const handleVoiceLumeNavigation = (event) => {
    event.preventDefault();
    navigate('/voicelume');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle Group Companies navigation
  const handleGroupCompaniesNavigation = (event) => {
    event.preventDefault();
    navigate('/group-companies');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle Consortium Partners navigation
  const handleConsortiumPartnersNavigation = (event) => {
    event.preventDefault();
    navigate('/consortium-partners');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle Contact Us navigation
  const handleContactUsNavigation = (event) => {
    event.preventDefault();
    console.log('Navigating to contact page...');
    navigate('/contact');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle Blogs navigation
  const handleBlogsNavigation = (event) => {
    event.preventDefault();
    console.log('Navigating to blogs page...');
    navigate('/blogs');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle About Us navigation
  const handleAboutUsNavigation = (event) => {
    event.preventDefault();
    console.log('Navigating to about page...');
    navigate('/about');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Services navigation functions
  const handleDataStrategyNavigation = (event) => {
    event.preventDefault();
    navigate('/services/data-strategy');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  const handleAdvancedAnalyticsNavigation = (event) => {
    event.preventDefault();
    navigate('/services/advanced-analytics');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  const handleDataEngineeringNavigation = (event) => {
    event.preventDefault();
    navigate('/services/data-engineering');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  const handleBusinessIntelligenceNavigation = (event) => {
    event.preventDefault();
    navigate('/services/business-intelligence');
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  // Function to handle Home navigation with smooth scroll
  const handleHomeNavigation = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If already on home page, scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page (ScrollToTop will handle the scroll)
      navigate('/');
    }
    if (mobileMenuOpen) {
      handleCloseMenu();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={logoImage} alt="Vardaan Data Sciences" className="logo-image" />
          {/* <span className="logo-text">Vardaan Data Sciences Pvt. Ltd.</span> */}
        </div>

        {/* Hamburger Icon */}
        <div 
          ref={hamburgerRef}
          className={`hamburger${mobileMenuOpen ? ' open' : ''}`} 
          onClick={handleHamburgerClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Menu */}
        <ul
          ref={menuRef}
          className={`navbar-menu${mobileMenuOpen ? ' mobile-open' : ''}`}
        >
          {/* Home always first */}
          <li className="navbar-item">
            <a 
              href="#home" 
              className={`navbar-link ${isRouteActive('/') ? 'active' : ''}`}
              onClick={handleHomeNavigation}
            >
              Home
            </a>
          </li>
          
          {/* Dynamic categories and dropdowns from backend */}
          {categories.map((cat) => {
            // Filter out resources category, keep blogs and others
            if (cat.slug === 'resources') return null;
            
            const catItems = getItemsForCategory(cat.id).filter(item => {
              // Filter out any items with links starting with /resources
              return !item.link?.startsWith('/resources');
            });
            if (catItems.length === 0) return null;
            return (
              <li
                key={cat.id}
                className={`navbar-item dropdown`}
                onMouseEnter={() => !mobileMenuOpen && handleDropdown(cat.id, true)}
                onMouseLeave={() => !mobileMenuOpen && handleDropdown(cat.id, false)}
              >
                <a
                  href={`#${cat.slug}`}
                  className={`navbar-link${isDropdownActive(cat.id) ? ' active' : ''}`}
                  onClick={(e) => {
                    if (mobileMenuOpen) {
                      e.preventDefault();
                      handleDropdown(cat.id, !isDropdownActive(cat.id));
                    } else {
                      handleScrollToSection(cat.slug, e);
                    }
                  }}
                >
                  {cat.name} <span className="dropdown-arrow">▼</span>
                </a>
                {isDropdownActive(cat.id) && (
                  <ul className={`dropdown-menu${cat.slug === 'products' ? ' dropdown-menu--products' : ''}`}>
                    {catItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.link}
                          onClick={(e) => handleNav(item.link, e)}
                          className={isRouteActive(item.link) ? 'active' : ''}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          
          {/* Static Services dropdown (fallback if no backend data) */}
          {categories.length === 0 && (
          <li 
            className="navbar-item dropdown"
            onMouseEnter={() => !mobileMenuOpen && setServicesDropdown(true)}
            onMouseLeave={() => !mobileMenuOpen && setServicesDropdown(false)}
          >
            <a 
              href="#services" 
              className={`navbar-link ${isServicesActive() ? 'active' : ''}`}
              onClick={(e) => {
                if (mobileMenuOpen) {
                  e.preventDefault();
                  setServicesDropdown((prev) => !prev);
                } else {
                  handleScrollToSection('services', e);
                }
              }}
            >
              Services <span className="dropdown-arrow">▼</span>
            </a>
            {servicesDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <a 
                    href="/services/data-strategy" 
                    onClick={handleDataStrategyNavigation}
                    className={isRouteActive('/services/data-strategy') ? 'active' : ''}
                  >
                    Data Strategy & Consulting
                  </a>
                </li>
                <li>
                  <a 
                    href="/services/advanced-analytics" 
                    onClick={handleAdvancedAnalyticsNavigation}
                    className={isRouteActive('/services/advanced-analytics') ? 'active' : ''}
                  >
                    Advanced Analytics & Machine Learning
                  </a>
                </li>
                <li>
                  <a 
                    href="/services/data-engineering" 
                    onClick={handleDataEngineeringNavigation}
                    className={isRouteActive('/services/data-engineering') ? 'active' : ''}
                  >
                    Data Engineering & Integration
                  </a>
                </li>
                <li>
                  <a 
                    href="/services/business-intelligence" 
                    onClick={handleBusinessIntelligenceNavigation}
                    className={isRouteActive('/services/business-intelligence') ? 'active' : ''}
                  >
                    Business Intelligence & Visualization
                  </a>
                </li>
              </ul>
            )}
          </li>
          )}
          
          {/* Static Products dropdown (fallback if no backend data) */}
          {categories.length === 0 && (
          <li 
            className="navbar-item dropdown"
            onMouseEnter={() => !mobileMenuOpen && setProductsDropdown(true)}
            onMouseLeave={() => !mobileMenuOpen && setProductsDropdown(false)}
          >
            <a 
              href="#products" 
              className={`navbar-link ${isProductsActive() ? 'active' : ''}`}
              onClick={(e) => {
                if (mobileMenuOpen) {
                  e.preventDefault();
                  setProductsDropdown((prev) => !prev);
                } else {
                  handleScrollToSection('products', e);
                }
              }}
            >
              Products <span className="dropdown-arrow">▼</span>
            </a>
            {productsDropdown && (
              <ul className="dropdown-menu dropdown-menu--products">
                <li>
                  <a 
                    href="/riskavaire" 
                    onClick={handleRiskaVaireNavigation}
                    className={isRouteActive('/riskavaire') ? 'active' : ''}
                  >
                    RiskaVaire
                  </a>
                </li>
                <li>
                  <a 
                    href="/prosync" 
                    onClick={handleProSyncNavigation}
                    className={isRouteActive('/prosync') ? 'active' : ''}
                  >
                    ProSync
                  </a>
                </li>
                <li>
                  <a 
                    href="/ViCTAA" 
                    onClick={handleVictaaNavigation}
                    className={isRouteActive('/victaa') ? 'active' : ''}
                  >
                    ViCTAA
                  </a>
                </li>
                <li>
                  <a 
                    href="/smartlogistics" 
                    onClick={handleSmartLogisticsNavigation}
                    className={isRouteActive('/smartlogistics') ? 'active' : ''}
                  >
                    SmartLogistics
                  </a>
                </li>
                <li>
                  <a 
                    href="/smartcashflow" 
                    onClick={handleSmartCashflowNavigation}
                    className={isRouteActive('/smartcashflow') ? 'active' : ''}
                  >
                    Smart Cashflow
                  </a>
                </li>
                <li>
                  <a 
                    href="/voicelume" 
                    onClick={handleVoiceLumeNavigation}
                    className={isRouteActive('/voicelume') ? 'active' : ''}
                  >
                    VoiceLume
                  </a>
                </li>
              </ul>
            )}
          </li>
          )}
          
          {/* Static Our Association dropdown */}
          <li 
            className="navbar-item dropdown"
            onMouseEnter={() => !mobileMenuOpen && setAssociationDropdown(true)}
            onMouseLeave={() => !mobileMenuOpen && setAssociationDropdown(false)}
          >
            <a 
              href="#association" 
              className={`navbar-link ${isAssociationActive() ? 'active' : ''}`}
              onClick={(e) => {
                if (mobileMenuOpen) {
                  e.preventDefault();
                  setAssociationDropdown((prev) => !prev);
                }
              }}
            >
              Our Association <span className="dropdown-arrow">▼</span>
            </a>
            {associationDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <a 
                    href="/group-companies" 
                    onClick={handleGroupCompaniesNavigation}
                    className={isRouteActive('/group-companies') ? 'active' : ''}
                  >
                    Group Companies
                  </a>
                </li>
                <li>
                  <a 
                    href="/consortium-partners" 
                    onClick={handleConsortiumPartnersNavigation}
                    className={isRouteActive('/consortium-partners') ? 'active' : ''}
                  >
                    Consortium Partners
                  </a>
                </li>
              </ul>
            )}
          </li>
          
          {/* Static links for Careers, About, Contact */}
          {/* <li className="navbar-item">
            <a
              href="/careers"
              className={`navbar-link ${isRouteActive('/careers') ? 'active' : ''}`}
              onClick={(e) => handleNav('/careers', e)}
            >
              Careers
            </a>
          </li> */}
          
          <li className="navbar-item">
            <a 
              href="/blogs" 
              className={`navbar-link ${isBlogsActive() ? 'active' : ''}`}
              onClick={(e) => handleBlogsNavigation(e)}
            >
              Blogs
            </a>
          </li>
          
          <li className="navbar-item">
            <a 
              href="/about" 
              className={`navbar-link ${isRouteActive('/about') ? 'active' : ''}`}
              onClick={(e) => handleAboutUsNavigation(e)}
            >
              About us
            </a>
          </li>
          
          <li className="navbar-item">
            <a 
              href="/contact" 
              className={`navbar-link ${isRouteActive('/contact') ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleContactUsNavigation(e);
              }}
            >
              Contact us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;