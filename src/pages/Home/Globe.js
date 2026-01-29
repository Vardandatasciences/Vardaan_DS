import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Globe.css';
import worldMapImage from '../../assets/Images/Home/earth-map.jpg';

const WorldMap = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  // Company locations with coordinates (x and y percentages on the map)
  // These coordinates are adjusted for the night-time earth map
  const locations = [
    { name: 'India', x: 72, y: 36, color: '#ff5722' },
    { name: 'Malaysia', x: 78, y: 48, color: '#4caf50' },
    { name: 'USA', x: 23, y: 30, color: '#2196f3' },
    { name: 'UK', x: 48, y: 22, color: '#9c27b0' },
    { name: 'UAE', x: 62, y: 38, color: '#ffc107' }
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    
    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    // Use absolute path to public folder
    mapContainer.style.backgroundImage = `url(${worldMapImage})`;
    mapContainer.style.backgroundSize = 'contain';
    mapContainer.style.backgroundPosition = 'center';
    mapContainer.style.backgroundRepeat = 'no-repeat';
    containerRef.current.appendChild(mapContainer);
    mapRef.current = mapContainer;

    // Add markers and connections for each location
    const markerElements = [];
    const labelElements = [];
    
    locations.forEach((location, index) => {
      // Create marker
      const marker = document.createElement('div');
      marker.className = 'location-marker';
      marker.style.left = `${location.x}%`;
      marker.style.top = `${location.y}%`;
      marker.style.backgroundColor = location.color;
      mapContainer.appendChild(marker);
      markerElements.push(marker);
      
      // Create pulse effect
      const pulse = document.createElement('div');
      pulse.className = 'pulse-effect';
      pulse.style.left = `${location.x}%`;
      pulse.style.top = `${location.y}%`;
      pulse.style.borderColor = location.color;
      mapContainer.appendChild(pulse);
      
      // Animate pulse
      gsap.to(pulse, {
        width: '50px',
        height: '50px',
        opacity: 0,
        duration: 2,
        repeat: -1,
        delay: index * 0.3,
        ease: "power1.out"
      });
      
      // Create label
      const label = document.createElement('div');
      label.className = 'location-label';
      label.textContent = location.name;
      label.style.left = `${location.x}%`;
      label.style.top = `${location.y}%`;
      label.style.color = location.color;
      label.style.borderColor = location.color;
      mapContainer.appendChild(label);
      labelElements.push(label);
      
      // Animation for markers and labels
      gsap.fromTo(marker, 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          delay: index * 0.2,
          ease: "back.out(1.7)"
        }
      );
      
      gsap.fromTo(label, 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          delay: index * 0.2 + 0.1,
          ease: "power2.out"
        }
      );
    });
    
    // Create curved connections between locations
    // Define UAE (index 4) as the central hub connecting to all other countries
    const connections = [
      { from: 4, to: 0, color: '#ffc107' }, // UAE to India
      { from: 4, to: 1, color: '#ffc107' }, // UAE to Malaysia
      { from: 4, to: 2, color: '#ffc107' }, // UAE to USA
      { from: 4, to: 3, color: '#ffc107' }, // UAE to UK
    ];
    
    connections.forEach((connection, index) => {
      const fromLocation = locations[connection.from];
      const toLocation = locations[connection.to];
      
      // Create a curved SVG path between the two points
      const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgContainer.setAttribute("width", "100%");
      svgContainer.setAttribute("height", "100%");
      svgContainer.style.position = "absolute";
      svgContainer.style.top = "0";
      svgContainer.style.left = "0";
      svgContainer.style.zIndex = "2";
      svgContainer.style.pointerEvents = "none";
      mapContainer.appendChild(svgContainer);
      
      // Calculate the curve's control point
      const midX = (fromLocation.x + toLocation.x) / 2;
      let midY = (fromLocation.y + toLocation.y) / 2;
      
      // Adjust the curve height to make a parabola
      // For longer distances (like UAE to USA), increase the curve height
      const distanceX = Math.abs(fromLocation.x - toLocation.x);
      let curveHeight = 15 + (distanceX / 8);
      
      // Special handling for UAE to USA (route across the world)
      if (connection.to === 2) { // USA index
        curveHeight = 30; // Higher curve for the long distance
      }
      
      midY -= curveHeight;
      
      // Create the path - using absolute coordinates instead of percentages for the SVG path
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      
      // Get the container dimensions to convert percentages to pixels
      const containerWidth = mapContainer.offsetWidth;
      const containerHeight = mapContainer.offsetHeight;
      
      // Convert percentages to absolute pixel values for the SVG path
      const x1 = (fromLocation.x / 100) * containerWidth;
      const y1 = (fromLocation.y / 100) * containerHeight;
      const x2 = (toLocation.x / 100) * containerWidth;
      const y2 = (toLocation.y / 100) * containerHeight;
      const ctrlX = (midX / 100) * containerWidth;
      const ctrlY = (midY / 100) * containerHeight;
      
      // Create the path with absolute pixel coordinates
      const pathD = `M${x1},${y1} Q${ctrlX},${ctrlY} ${x2},${y2}`;
      path.setAttribute("d", pathD);
      path.setAttribute("fill", "none");
      
      // Use the destination country's color for the line
      const destinationColor = locations[connection.to].color;
      path.setAttribute("stroke", destinationColor);
      
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("opacity", "0.8");
      path.setAttribute("stroke-dasharray", "5,5");
      svgContainer.appendChild(path);
      
      // Animate the path appearance
      try {
        const pathLength = path.getTotalLength();
        if (pathLength) {
          path.style.strokeDasharray = pathLength;
          path.style.strokeDashoffset = pathLength;
          
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            delay: index * 0.3,
            ease: "power1.inOut"
          });
          
          // Create moving dot along the path
          const movingDot = document.createElement('div');
          movingDot.className = 'moving-dot';
          movingDot.style.backgroundColor = destinationColor;
          movingDot.style.boxShadow = `0 0 10px ${destinationColor}`;
          mapContainer.appendChild(movingDot);
          
          // Use GSAP for more reliable animation
          animateWithGSAP(movingDot, path, destinationColor, index);
        }
      } catch (error) {
        console.error("Error with SVG path:", error);
      }
    });

    // Simplified animation method using GSAP - with improved reliability
    function animateWithGSAP(dot, path, color, index) {
      try {
        // Wait a moment for the SVG to be properly rendered
        setTimeout(() => {
          try {
            const pathLength = path.getTotalLength();
            
            if (!pathLength || isNaN(pathLength)) {
              console.warn("Path has invalid length, cannot animate");
              return;
            }
            
            // Set starting position
            const startPos = path.getPointAtLength(0);
            dot.style.left = `${startPos.x}px`;
            dot.style.top = `${startPos.y}px`;
            dot.style.display = 'block';
            
            // Create a progress timeline for the dot
            gsap.to({progress: 0}, {
              progress: 1,
              duration: 4,
              delay: index * 0.5,
              repeat: -1,
              ease: "none",
              onUpdate: function() {
                try {
                  // Get the current progress
                  const progress = this.targets()[0].progress;
                  
                  // Get the position along the path for this progress
                  const point = path.getPointAtLength(progress * pathLength);
                  
                  // Update the dot position
                  gsap.set(dot, {
                    left: point.x + 'px',
                    top: point.y + 'px'
                  });
                } catch (err) {
                  console.error("Error in animation update:", err);
                }
              }
            });
          } catch (innerError) {
            console.error("Error initializing animation:", innerError);
          }
        }, 100); // Small delay to ensure SVG is ready
      } catch (error) {
        console.error("Animation setup error:", error);
      }
    }

    // Cleanup function
    return () => {
      const currentRef = containerRef.current;
      if (currentRef) {
        while (currentRef.firstChild) {
          currentRef.removeChild(currentRef.firstChild);
        }
      }
    };
  }, [locations]);

  return (
    <div className="global-presence-section">
      <h1 className="global-presence-title">
        <span className="title-dark">Vardaan's</span> <span className="title-highlight">Global Presence</span>
      </h1>
      
      <div className="world-map-container" ref={containerRef}>
      </div>
      
      <div className="global-footer-text-container">
        <p className="globe-footer-text">
          Our worldwide network spans key strategic locations across five continents, enabling us to deliver
          seamless solutions to clients globally. With offices in India, Malaysia, USA, UK, and UAE, we
          provide localized expertise while maintaining international standards of excellence.
        </p>
      </div>
    </div>
  );
};

export default WorldMap; 