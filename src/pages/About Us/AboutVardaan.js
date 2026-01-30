import './AboutVardaan.css';
import React, { useEffect, useState, useRef } from 'react';
import Footer from '../../components/Footer/Footer';
import leadershipBanner from '../../assets/videos/about_vardaan_hero.mp4';
import missionImg from '../../assets/Images/AboutVardaan/mission.jpg';
import { config } from '../../utils/config';
 
const WebsiteImpactAnimatedDescription = ({ text }) => {
  const [visibleSentences, setVisibleSentences] = useState([]);
  const descRef = useRef(null);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
 
  useEffect(() => {
    let timeouts = [];
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sentences.forEach((_, idx) => {
            const timeout = setTimeout(() => {
              setVisibleSentences((prev) => {
                if (!prev.includes(idx)) return [...prev, idx];
                return prev;
              });
            }, idx * 600);
            timeouts.push(timeout);
          });
        } else {
          setVisibleSentences([]);
          timeouts.forEach(clearTimeout);
        }
      },
      { threshold: 0.3 }
    );
    if (descRef.current) observer.observe(descRef.current);
    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [sentences]);
 
  return (
    <div className="website-impact-desc" ref={descRef}>
      {sentences.map((sentence, idx) => (
        <span
          key={idx}
          className={`website-impact-sentence${visibleSentences.includes(idx) ? ' website-impact-sentence--visible' : ''}`}
        >
          {sentence.trim()}&nbsp;
        </span>
      ))}
    </div>
  );
};
 
// New AnimatedHeading component for word-by-word transition
const AnimatedHeading = ({ text, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);
 
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    return () => observer.disconnect();
  }, []);
 
  return (
    <h2 ref={headingRef} className={`${className} animated-heading${isVisible ? " animated-heading--visible" : ""}`}>
      {text.split(" ").map((word, idx) => (
        <span
          key={idx}
          className="animated-heading-word"
          style={isVisible ? { animationDelay: `${idx * 0.25 + 0.2}s` } : {}}
        >
          {word + (idx !== text.split(" ").length - 1 ? "\u00A0" : "")}
        </span>
      ))}
    </h2>
  );
};
 
const AboutVardaan = () => {
  const [expandedProfile, setExpandedProfile] = useState(null);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const handleToggleProfile = (index) => {
    setExpandedProfile(expandedProfile === index ? null : index);
  };

  // Fetch team data from backend
  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${config.API_URL}/api/management-team`);
        const data = await res.json();
        if (data.success) {
          setTeam(data.team);
        } else {
          setError(data.message || 'Failed to fetch team data');
        }
      } catch (err) {
        setError('Failed to fetch team data');
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, []);
 
  useEffect(() => {
    const profileElements = document.querySelectorAll('.leadership-profile');
   
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
   
    profileElements.forEach(profile => {
      profile.style.opacity = 0;
      profile.style.transform = 'translateY(30px)';
      profile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(profile);
    });
   
    return () => {
      profileElements.forEach(profile => observer.unobserve(profile));
    };
  }, []);
 
  useEffect(() => {
    const handleResize = () => {
      document.querySelectorAll('.leadership-profile').forEach(profile => {
        profile.style.display = 'none';
        setTimeout(() => {
          profile.style.display = '';
        }, 0);
      });
    };
 
    window.addEventListener('resize', handleResize);
   
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 
  useEffect(() => {
    console.log('team data:', team);
  }, [team]);

  const getProfileImageUrl = (profile) => {
    if (!profile.image_url) return '';
    // Only encode if not already encoded
    if (profile.image_url.startsWith('/')) return profile.image_url;
    return `/assets/AboutVardaan/${encodeURIComponent(profile.image_url)}`;
  };
 
  return (
    <div className="leadership-page">
      <div className="leadership-hero-banner">
        {/* Use backend video if available, otherwise fallback to static import */}
        <video
          src={leadershipBanner}
          autoPlay
          loop
          muted
          playsInline
          className="leadership-banner-video"
          onError={(e) => {
            console.error('Video error:', e);
            console.error('Video URL:', leadershipBanner);
          }}
          onLoadStart={() => console.log('Video loading started:', leadershipBanner)}
          onCanPlay={() => console.log('Video can play:', leadershipBanner)}
          onLoadedData={() => console.log('Video data loaded:', leadershipBanner)}
        />
        <div className="leadership-header-content">
          {/* <h1 className="leadership-main-title">About Us</h1>
          <p className="leadership-intro">
            Delivering strategic insight, operational resilience, and digital integrity across industries through precision, independence, and foresight.
          </p> */}
        </div>
      </div>
     
      {/* Website Impact Section */}
      <section className="website-impact-section">
        <div className="website-impact-container">
          <div className="website-impact-left">
            <AnimatedHeading text="Our Approach and Commitment" className="website-impact-title" />
            <WebsiteImpactAnimatedDescription text="Through a combination of in-house expertise and a robust partner ecosystem, we are dedicated to empowering organisations to enhance efficiency, build resilience, and stay ahead in a rapidly changing landscape." />
            <AnimatedHeading text="Our Solutions and Impact" className="website-impact-subtitle" />
            <WebsiteImpactAnimatedDescription text="Our deep strategic insight into the drivers of enterprise growth enables us to help clients achieve secured operations, operational excellence, compliance readiness, and scalable innovation." />
            <WebsiteImpactAnimatedDescription text="Our portfolio includes AI-powered tools and intelligent platforms—ranging from RiskaVaire intelligence platforms and smart logistics systems to audit management suites, camera vision AI, digital workers, robotic automation, and cybersecurity solutions—all designed to deliver actionable insights and measurable business impact." />
          </div>
          <div className="website-impact-right">
            <div className="website-impact-image-diagonal">
              {/* Use backend image if available, otherwise fallback to static path */}
              <img 
                src={missionImg} 
                alt="Our Mission" 
                className="website-impact-img" 
              />
            </div>
          </div>
        </div>
      </section>
     
      {/* Leadership Section */}
      <section className="leadership-section">
        <div className="leadership-section-container">
          <h2 className="leadership-section-title">Leadership</h2>
         
          {loading ? (
            <div className="leadership-loading">Loading team data...</div>
          ) : error ? (
            <div className="leadership-error">{error}</div>
          ) : team.length === 0 ? (
            <div className="leadership-empty">No team members available at the moment.</div>
          ) : (
          <div className="leadership-grid">
            {/* First Row - 3 members */}
            <div className="leadership-row">
                {team.slice(0, 3).map((profile, index) => (
                <div key={index} className="leadership-card-wrapper">
                  <div className="leadership-card">
                    <div className="leadership-card-image">
                        <img 
                          src={profile.image_url} 
                          alt={profile.name} 
                        />
                    </div>
                    <div className="leadership-card-content">
                        <h3 className="leadership-card-name">{profile.name}</h3>
                      <p className="leadership-card-designation">{profile.subtitle}</p>
                      <button
                        className="leadership-toggle-btn"
                        onClick={() => handleToggleProfile(index)}
                      >
                        {expandedProfile === index ? '−' : '+'}
                      </button>
                    </div>
                  </div>
                 
                  {/* Individual Expanded Content for Mobile */}
                  {expandedProfile === index && (
                    <div className="leadership-expanded-individual">
                      <div className="leadership-expanded-content">
                        <div className="leadership-expanded-inner">
                          <div className="leadership-expanded-description">
                            <p>{profile.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Expanded Description - Desktop Only for First Row */}
            {expandedProfile !== null && expandedProfile < 3 && (
              <div className="leadership-expanded-row desktop-only">
                <div className="leadership-expanded-content">
                  <div className="leadership-expanded-inner">
                    <div className="leadership-expanded-description">
                        <p>{team[expandedProfile].description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Second Row - 2 members (centered) */}
            <div className="leadership-row leadership-row-centered">
                {team.slice(3, 6).map((profile, index) => (
                <div key={index + 3} className="leadership-card-wrapper">
                  <div className="leadership-card">
                    <div className="leadership-card-image">
                        <img 
                          src={profile.image_url} 
                          alt={profile.name} 
                        />
                    </div>
                    <div className="leadership-card-content">
                        <h3 className="leadership-card-name">{profile.name}</h3>
                      <p className="leadership-card-designation">{profile.subtitle}</p>
                      <button
                        className="leadership-toggle-btn"
                        onClick={() => handleToggleProfile(index + 3)}
                      >
                        {expandedProfile === index + 3 ? '−' : '+'}
                      </button>
                    </div>
                  </div>
                 
                  {/* Individual Expanded Content for Mobile */}
                  {expandedProfile === index + 3 && (
                    <div className="leadership-expanded-individual">
                      <div className="leadership-expanded-content">
                        <div className="leadership-expanded-inner">
                          <div className="leadership-expanded-description">
                            <p>{profile.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
           
            {/* Expanded Description - Desktop Only for Second Row */}
            {expandedProfile !== null && expandedProfile >= 3 && (
              <div className="leadership-expanded-row desktop-only">
                <div className="leadership-expanded-content">
                  <div className="leadership-expanded-inner">
                    <div className="leadership-expanded-description">
                        <p>{team[expandedProfile].description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </div>
            )}
        </div>
      </section>
      <Footer />
    </div>
  );
};
 
export default AboutVardaan;
 