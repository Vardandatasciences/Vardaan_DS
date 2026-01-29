import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
 
// This component scrolls to the top of the page when the route changes
function ScrollToTop() {
  const { pathname } = useLocation();
 
  useEffect(() => {
    // Comprehensive scroll to top function
    const forceScrollToTop = () => {
      try {
        // Method 1: Multiple window.scrollTo calls with different approaches
        window.scrollTo(0, 0);
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        
        // Method 2: Direct DOM scroll manipulation
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
          document.documentElement.scrollLeft = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
          document.body.scrollLeft = 0;
        }
        
        // Method 3: Find and reset all potentially scrollable elements
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
          if (element.scrollTop > 0) {
            element.scrollTop = 0;
          }
          if (element.scrollLeft > 0) {
            element.scrollLeft = 0;
          }
        });
        
        // Method 4: Target common scrollable containers
        const commonScrollContainers = [
          'html', 'body', '.app', '#app', '.root', '#root',
          '.container', '.main', '.content', '.page'
        ];
        
        commonScrollContainers.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            element.scrollTop = 0;
            element.scrollLeft = 0;
          });
        });
        
        // Method 5: Handle hash-based navigation
        if (window.location.hash) {
          // Clear the hash without triggering navigation
          // history.replaceState(null, null, window.location.pathname + window.location.search);
        }
        
        // Method 6: Force focus to top of page
        if (document.body) {
          document.body.focus();
        }
        
        // Method 7: Use page offset properties
        if (window.pageYOffset !== undefined) {
          window.scrollTo(0, 0);
        }
        
        // Method 8: Ensure we account for fixed navbar
        // The body padding-top should handle this, but let's be extra sure
        const navbarHeight = window.innerWidth <= 640 ? 60 : window.innerWidth <= 768 ? 70 : 80;
        if (window.pageYOffset > navbarHeight) {
          window.scrollTo(0, 0);
        }
        
        console.log('ScrollToTop executed for:', pathname);
      } catch (error) {
        console.warn('ScrollToTop error:', error);
        // Fallback method
        try {
          window.scrollTo(0, 0);
        } catch (fallbackError) {
          console.warn('ScrollToTop fallback error:', fallbackError);
        }
      }
    };
    
    // Execute the scroll function multiple times with different delays
    // This ensures it works regardless of component load timing
    
    // Immediate execution
    forceScrollToTop();
    
    // Quick follow-up
    const timer1 = setTimeout(forceScrollToTop, 1);
    
    // After React has had time to render
    const timer2 = setTimeout(forceScrollToTop, 10);
    
    // After images might have loaded
    const timer3 = setTimeout(forceScrollToTop, 50);
    
    // After all animations and transitions
    const timer4 = setTimeout(forceScrollToTop, 100);
    
    // Final safety net
    const timer5 = setTimeout(forceScrollToTop, 250);
    
    // Extra safety for slow loading content
    const timer6 = setTimeout(forceScrollToTop, 500);
    
    // Use requestAnimationFrame for the next paint cycle
    const rafId = requestAnimationFrame(() => {
      forceScrollToTop();
      // Double RAF for extra certainty
      requestAnimationFrame(forceScrollToTop);
    });
    
    // Cleanup function
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);
 
  return null; // This component doesn't render anything
}
 
export default ScrollToTop;
 