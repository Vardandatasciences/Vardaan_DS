import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { GlobalProvider } from './context/GlobalContext';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home/home';
import RiskaVaire from './pages/Products/GRC/RiskaVaire';
import Riskavaireinfo from './pages/Products/GRC/Riskavaireinfo';
import Solutions from "./pages/Products/GRC/Solutions";
import Framework from './pages/Products/GRC/Framework';
import FinancialServices from './pages/Products/GRC/FinancialServices';
import Insurance from './pages/Products/GRC/Insurance';
import Retail from './pages/Products/GRC/Retail';
import Healthcare from './pages/Products/GRC/Healthcare';
import Manufacturing from './pages/Products/GRC/Manufacturing';
import Software from './pages/Products/GRC/Software';
import Audit from './pages/Products/ProSync/Audit';
import Prosyncinfo from './pages/Products/ProSync/Prosyncinfo';
import Victaa from './pages/Products/Lapsec/Victaa';
import VictaaPricing from './pages/Products/Lapsec/VictaaPricing';
import VictaaDownload from './pages/Products/Lapsec/Victaadownload';
import VictaaShowcase from './pages/Products/Lapsec/VictaaShowcase';
import Truck from './pages/Products/SmartLogistics/Truck';
import ContactUs from './pages/ContactUs/ContactUs';
import AboutVardaan from './pages/About Us/AboutVardaan';
import Career from './pages/Careers/career';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';
// Admin imports
import AdminDashboard from './pages/Admin/AdminDashboard';
import BlogEditor from './pages/Admin/BlogEditor';
import BlogList from './pages/Admin/BlogList';
// Services imports
import DataStrategy from './pages/Services/DataStrategy/DataStrategy';
import AdvancedAnalytics from './pages/Services/AdvancedAnalytics/AdvancedAnalytics';
import DataEngineering from './pages/Services/DataEngineering/DataEngineering';
import BusinessIntelligence from './pages/Services/BusinessIntelligence/BusinessIntelligence';
// Information pages imports
import Privacy from './pages/Information/Privacy/Privacy';
import Terms from './pages/Information/Terms/Terms';
import Cookie from './pages/Information/Cookie/Cookie';
import Data from './pages/Information/Data/Data';
import International from './pages/Information/International/International';
import ProductResource from './pages/internal-dashboard/ProductResource';
import GroupCompanies from './pages/OurAssociations/Group Companies/Group Companies';
import ConsortiumPartners from './pages/OurAssociations/Consortium Partners/ConsortiumPartners';
import MediaTest from './components/MediaTest';
import IPDetectionTest from './components/IPDetectionTest';
import GlobalContextTest from './components/GlobalContextTest';
import RoutingTest from './components/RoutingTest';

// Test component to verify routing
const TestComponent = () => {
  console.log('Test component rendered');
  return <div style={{padding: '50px', textAlign: 'center'}}>Test Route Working!</div>;
};

// Analytics tracking component
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view with enhanced data
    if (window.gtag) {
      const pageTitle = getPageTitle(location.pathname);
      const pagePath = location.pathname + location.search;
      
      // Track page view with custom parameters
      window.gtag('config', 'G-VQ19XKHZWS', {
        page_title: pageTitle,
        page_path: pagePath,
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'page_title',
          'custom_parameter_2': 'page_path',
          'custom_parameter_3': 'user_engagement_time'
        }
      });

      // Track custom event for page view
      window.gtag('event', 'page_view', {
        page_title: pageTitle,
        page_path: pagePath,
        page_location: window.location.href,
        event_category: 'Navigation',
        event_label: pageTitle,
        value: 1
      });

      // Track user engagement
      window.gtag('event', 'user_engagement', {
        page_title: pageTitle,
        page_path: pagePath,
        event_category: 'Engagement',
        event_label: 'Page Visit',
        value: 1
      });

      console.log(`Analytics: Page view tracked - ${pageTitle} (${pagePath})`);
    }
  }, [location]);

  // Function to get page title based on route
  const getPageTitle = (pathname) => {
    const titles = {
      '/': 'Home - Vardaan Data Sciences',
      '/riskavaire': 'RiskaVaire - Vardaan Data Sciences',
      '/riskavaire/info': 'RiskaVaire Info - Vardaan Data Sciences',
      '/solutions': 'Solutions - Vardaan Data Sciences',
      '/framework': 'Framework - Vardaan Data Sciences',
      '/industry/financial': 'Financial Services - Vardaan Data Sciences',
      '/industry/insurance': 'Insurance - Vardaan Data Sciences',
      '/industry/retail': 'Retail - Vardaan Data Sciences',
      '/industry/healthcare': 'Healthcare - Vardaan Data Sciences',
      '/industry/manufacturing': 'Manufacturing - Vardaan Data Sciences',
      '/industry/software': 'Software - Vardaan Data Sciences',
      '/prosync': 'ProSync - Vardaan Data Sciences',
      '/prosync/info': 'ProSync Info - Vardaan Data Sciences',
      '/ViCTAA': 'ViCTAA - Vardaan Data Sciences',
      '/ViCTAA/pricing': 'ViCTAA Pricing - Vardaan Data Sciences',
      '/victaa/download': 'ViCTAA Download - Vardaan Data Sciences',
      '/victaa/info': 'ViCTAA Showcase - Vardaan Data Sciences',
      '/Victaa/info': 'ViCTAA Showcase - Vardaan Data Sciences',
      '/smartlogistics': 'Smart Logistics - Vardaan Data Sciences',
      '/contact': 'Contact Us - Vardaan Data Sciences',
      '/about': 'About Us - Vardaan Data Sciences',
      '/careers': 'Careers - Vardaan Data Sciences',
      '/blog': 'Blog - Vardaan Data Sciences',
      '/blog/:slug': 'Blog Post - Vardaan Data Sciences',
      '/group-companies': 'Group Companies - Vardaan Data Sciences',
      '/consortium-partners': 'Consortium Partners - Vardaan Data Sciences',
      '/services/data-strategy': 'Data Strategy Services - Vardaan Data Sciences',
      '/services/advanced-analytics': 'Advanced Analytics Services - Vardaan Data Sciences',
      '/services/data-engineering': 'Data Engineering Services - Vardaan Data Sciences',
      '/services/business-intelligence': 'Business Intelligence Services - Vardaan Data Sciences',
      '/privacy-policy': 'Privacy Policy - Vardaan Data Sciences',
      '/terms-of-service': 'Terms of Service - Vardaan Data Sciences',
      '/cookie-policy': 'Cookie Policy - Vardaan Data Sciences',
      '/data-retention': 'Data Retention - Vardaan Data Sciences',
      '/international-transfers': 'International Transfers - Vardaan Data Sciences',
      '/test': 'Test Page - Vardaan Data Sciences',
      '/media-test': 'Media Test - Vardaan Data Sciences',
      '/ip-test': 'IP Test - Vardaan Data Sciences',
      '/global-context-test': 'Global Context Test - Vardaan Data Sciences',
      '/routing-test': 'Routing Test - Vardaan Data Sciences'
    };
    return titles[pathname] || 'Vardaan Data Sciences';
  };

  return null;
};

// Enhanced click tracking hook
const useClickTracking = () => {
  useEffect(() => {
    const trackClick = (event) => {
      if (window.gtag && event && event.target) {
        try {
          const target = event.target;
          const tagName = target.tagName ? target.tagName.toLowerCase() : '';
          const classList = target.classList || [];
          const id = target.id || '';
          const text = target.textContent ? target.textContent.trim().substring(0, 50) : '';
          const href = target.href || '';
        
        // Determine click category
        let category = 'General';
        if (tagName === 'a' || href) category = 'Navigation';
        else if (tagName === 'button') category = 'Button';
        else if (classList && typeof classList.contains === 'function' && (classList.contains('nav') || classList.contains('menu'))) category = 'Navigation';
        else if (classList && typeof classList.contains === 'function' && (classList.contains('cta') || classList.contains('btn'))) category = 'Call to Action';
        else if (classList && typeof classList.contains === 'function' && (classList.contains('form') || classList.contains('input'))) category = 'Form';
        
        // Track click event
        window.gtag('event', 'click', {
          event_category: category,
          event_label: `${tagName}${id ? `#${id}` : ''}${classList && classList.length > 0 ? `.${classList[0]}` : ''}`,
          value: 1,
          custom_parameters: {
            element_text: text,
            element_href: href,
            page_path: window.location.pathname,
            page_title: document.title
          }
        });

        console.log(`Click tracked: ${category} - ${tagName}${id ? `#${id}` : ''}`);
        } catch (error) {
          console.error('Error in click tracking:', error);
        }
      }
    };

    // Add click listener to document
    document.addEventListener('click', trackClick);

    return () => {
      document.removeEventListener('click', trackClick);
    };
  }, []);
};

function App() {
  // Initialize Google Analytics with enhanced tracking
  useEffect(() => {
    console.log('🔍 App component mounted');
    console.log('🔍 Current routes:', [
      '/',
      '/riskavaire',
      '/prosync',
      '/ViCTAA',
      '/smartlogistics',
      '/contact',
      '/about',
      '/careers',
      '/blog',
      '/blogs',
      '/group-companies',
      '/consortium-partners',
      '/admin',
      '/admin/dashboard',
      '/admin/blogs',
      '/admin/blogs/new',
      '/admin/blogs/edit/:id'
    ]);
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-VQ19XKHZWS';
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-VQ19XKHZWS', {
      // Enhanced configuration
      page_title: document.title,
      page_path: window.location.pathname,
      page_location: window.location.href,
      // Enable enhanced features
      anonymize_ip: false,
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
      // Custom dimensions
      custom_map: {
        'custom_parameter_1': 'page_title',
        'custom_parameter_2': 'page_path',
        'custom_parameter_3': 'user_engagement_time',
        'custom_parameter_4': 'session_duration',
        'custom_parameter_5': 'bounce_rate'
      }
    });

    // Track initial page load
    gtag('event', 'page_view', {
      page_title: document.title,
      page_path: window.location.pathname,
      page_location: window.location.href,
      event_category: 'Navigation',
      event_label: 'Initial Page Load',
      value: 1
    });

    // Track user session start
    gtag('event', 'session_start', {
      event_category: 'User Engagement',
      event_label: 'Session Start',
      value: 1
    });

    // Track active users
    gtag('event', 'user_engagement', {
      event_category: 'Engagement',
      event_label: 'Active User',
      value: 1
    });

    console.log('Google Analytics initialized with enhanced tracking');

    // Track page visibility changes (user engagement)
    const handleVisibilityChange = () => {
      if (window.gtag) {
        if (document.hidden) {
          gtag('event', 'user_engagement', {
            event_category: 'Engagement',
            event_label: 'Page Hidden',
            value: 1
          });
        } else {
          gtag('event', 'user_engagement', {
            event_category: 'Engagement',
            event_label: 'Page Visible',
            value: 1
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Initialize click tracking
  useClickTracking();

  return (
    <GlobalProvider>
      <Router>
        <div className="App">
          <ScrollToTop />
          <AnalyticsTracker />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/riskavaire" element={<RiskaVaire />} />
            <Route path="/riskavaire/info" element={<Riskavaireinfo />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/framework/:frameworkId" element={<Framework />} />
            <Route path="/industry/financial" element={<FinancialServices />} />
            <Route path="/industry/insurance" element={<Insurance />} />
            <Route path="/industry/retail" element={<Retail />} />
            <Route path="/industry/healthcare" element={<Healthcare />} />
            <Route path="/industry/manufacturing" element={<Manufacturing />} />
            <Route path="/industry/software" element={<Software />} />
            <Route path="/prosync" element={<Audit />} />
            <Route path="/prosync/info" element={<Prosyncinfo />} />
            <Route path="/ViCTAA" element={<Victaa />} />
            <Route path="/ViCTAA/pricing" element={<VictaaPricing />} />
            <Route path="/victaa/download" element={<VictaaDownload />} />
            <Route path="/victaa/info" element={<VictaaShowcase />} />
            <Route path="/Victaa/info" element={<VictaaShowcase />} />
            <Route path="/smartlogistics" element={<Truck />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutVardaan />} />
            <Route path="/careers" element={<Career />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/sales-collateral/:product" element={<ProductResource />} />
            {/* Association routes */}
            <Route path="/group-companies" element={<GroupCompanies />} />
            <Route path="/consortium-partners" element={<ConsortiumPartners />} />
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/blogs" element={<BlogList />} />
            <Route path="/admin/blogs/new" element={<BlogEditor />} />
            <Route path="/admin/blogs/edit/:id" element={<BlogEditor />} />
            {/* Services routes */}
            <Route path="/services/data-strategy" element={<DataStrategy />} />
            <Route path="/services/advanced-analytics" element={<AdvancedAnalytics />} />
            <Route path="/services/data-engineering" element={<DataEngineering />} />
            <Route path="/services/business-intelligence" element={<BusinessIntelligence />} />
            {/* Information routes */}
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-of-service" element={<Terms />} />
            <Route path="/cookie-policy" element={<Cookie />} />
            <Route path="/data-retention" element={<Data />} />
            <Route path="/international-transfers" element={<International />} />
            <Route path="/test" element={<TestComponent />} />
            <Route path="/media-test" element={<MediaTest />} />
            <Route path="/ip-test" element={<IPDetectionTest />} />
            <Route path="/global-context-test" element={<GlobalContextTest />} />
            <Route path="/routing-test" element={<RoutingTest />} />
            <Route path="*" element={
              <div style={{padding: '100px 20px', textAlign: 'center'}}>
                <h1>Page not found</h1>
                <p>Current path: {window.location.pathname}</p>
                <p>Available routes:</p>
                <ul style={{textAlign: 'left', display: 'inline-block', listStyle: 'none'}}>
                  <li>• / - Home</li>
                  <li>• /prosync - ProSync</li>
                  <li>• /prosync/info - ProSync Info</li>
                  <li>• /blog - Blog</li>
                  <li>• /blogs - Blog (alternative)</li>
                  <li>• /group-companies - Group Companies</li>
                  <li>• /consortium-partners - Consortium Partners</li>
                  <li>• /about - About Us</li>
                  <li>• /contact - Contact Us</li>
                  <li>• /admin - Admin Panel</li>
                  <li>• /admin/dashboard - Admin Dashboard</li>
                  <li>• /admin/blogs - Blog List</li>
                  <li>• /admin/blogs/new - Create New Blog</li>
                  <li>• /admin/blogs/edit/:id - Edit Blog</li>
                </ul>
              </div>
            } />
          </Routes>
          {/* <Accordion /> */}
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
