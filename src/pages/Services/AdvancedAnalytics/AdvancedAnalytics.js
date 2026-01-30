import React, { useState, useEffect } from 'react';
import './AdvancedAnlytics.css';
import { useMediaByPage } from '../../../hooks/useMedia';
import Footer from '../../../components/Footer/Footer';

const AdvancedAnalytics = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fetch media from the database for Advanced Analytics page
    const { media: advancedAnalyticsMedia, loading: mediaLoading } = useMediaByPage('Services-AdvancedAnalytics');

    // Helper to get the S3 URL for a given mediaKey
    const getMediaUrl = (mediaKey, fileType = null) => {
        const norm = str => str.replace(/\s+/g, '').toLowerCase();
        
        // Filter by file type if specified
        let mediaItems = advancedAnalyticsMedia;
        if (fileType) {
            mediaItems = advancedAnalyticsMedia.filter(item => item.file_type === fileType);
        }
        
        // Try exact match first
        let found = mediaItems.find(item => norm(item.original_name) === norm(mediaKey));
        
        // If not found, try partial match
        if (!found) {
            found = mediaItems.find(item => 
                norm(item.original_name).includes(norm(mediaKey)) || 
                norm(mediaKey).includes(norm(item.original_name))
            );
        }
        
        return found ? found.s3_url : '';
    };

    // Get specific images and videos for Advanced Analytics
    const heroOverlayUrl = getMediaUrl('hero_overlay.jpg', 'image') || getMediaUrl('hero_overlay', 'image');
    const introImageUrl = getMediaUrl('advanced_intro.jpg', 'image') || getMediaUrl('advanced_intro', 'image');
    const introImage2Url = getMediaUrl('advanced_intro2.jpeg', 'image') || getMediaUrl('advanced_intro2', 'image');
    const predictiveInsightsUrl = getMediaUrl('predictive_insights.jpg', 'image') || getMediaUrl('predictive_insights', 'image');
    const processOptimizationUrl = getMediaUrl('process_optimization.jpg', 'image') || getMediaUrl('process_optimization', 'image');
    const innovationEnablementUrl = getMediaUrl('innovation_enablment.webp', 'image') || getMediaUrl('innovation_enablment', 'image');

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight * 0.8;
                if (isVisible) {
                    element.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const benefits = [
        {
            title: "Predictive Insights",
            image: predictiveInsightsUrl,
            content: "Clients benefit from cutting-edge predictive modeling capabilities that help anticipate trends, customer behaviors, and market fluctuations with unmatched accuracy, ensuring they stay ahead in competitive landscapes.",
            colorClass: "predictive"
        },
        {
            title: "Process Optimization",
            image: processOptimizationUrl,
            content: "Our machine learning algorithms continuously improve business processes, reducing operational inefficiencies and driving cost savings for sustainable growth.",
            colorClass: "process"
        },
        {
            title: "Innovation Enablement",
            image: innovationEnablementUrl,
            content: "By leveraging AI-driven analytics, we uncover hidden patterns in data that inspire innovation, empowering organizations to create new products, services, or strategies aligned with market demands.",
            colorClass: "innovation"
        }
    ];

    return (
        <div className="analytics-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-image-container">
                    <img 
                        src={heroOverlayUrl}
                        alt="Data Visualization" 
                        className="hero-image"
                    />
                    <div className="hero-overlay"></div>
                </div>
                
                <div className="hero-content">
                    <div className="hero-title-container">
                        <h1 className="hero-title">
                            Advanced Analytics & Machine Learning
                            <br />
                            {/* <span className="hero-subtitle"> 
                                Machine Learning
                            </span> */}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="intro-section">
                <div className="intro-container">
                    {/* First Row */}
                    <div className="intro-row">
                        {/* Image Column */}
                        <div className="image-container animate-on-scroll">
                            <div className="image-wrapper">
                                <img 
                                    src={introImageUrl}
                                    alt="Growth and Analytics Visualization" 
                                    className="intro-image"
                                />
                            </div>
                        </div>

                        {/* First 3 Points Column */}
                        <div className="points-container animate-on-scroll">
                            <ul className="points-list">
                                <li className="point-item">
                                    <i className="fas fa-check check-icon"></i>
                                    <span className="point-text">In today's rapidly evolving business landscape, leveraging AI, advanced analytics and machine learning is imperative for staying ahead.</span>
                                </li>
                                <li className="point-item">
                                    <i className="fas fa-check check-icon"></i>
                                    <span className="point-text">At Vardaan, we provide cutting-edge solutions that transform raw data into actionable insights.</span>
                                </li>
                                <li className="point-item">
                                    <i className="fas fa-check check-icon"></i>
                                    <span className="point-text">Our predictive modeling capabilities enable organizations to anticipate trends, customer behavior, and market changes with precision.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="intro-row">
                        {/* Last 2 Points Column */}
                        <div className="points-container animate-on-scroll">
                            <ul className="points-list">
                                <li className="point-item">
                                    <i className="fas fa-check check-icon"></i>
                                    <span className="point-text">From AI-driven analytics that uncover hidden patterns to machine learning algorithms that continuously optimize processes, our services are designed to support smarter decision-making.</span>
                                </li>
                                <li className="point-item">
                                    <i className="fas fa-check check-icon"></i>
                                    <span className="point-text">We help businesses harness the power of their data to uncover opportunities, enhance operational efficiency, and drive innovation across all domains.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Second Image Column */}
                        <div className="image-container animate-on-scroll">
                            <div className="image-wrapper">
                                <img 
                                    src={introImage2Url}
                                    alt="Team Collaboration" 
                                    className="intro-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Benefits Section */}
            <section className="client-benefits">
                <div className="client-benefits-container">
                    <div className="advanced-analytics-benefits-heading">
                        <h2>Client Benefits for Each Service Line</h2>
                    </div>
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="benefit-item">
                                <div className="flip-card">
                                    <div className="flip-card-front">
                                        <img 
                                            src={benefit.image} 
                                            alt={benefit.title} 
                                            className="benefit-image"
                                        />
                                    </div>
                                    <div className={`flip-card-back ${benefit.colorClass}`}>
                                        <p>{benefit.content}</p>
                                    </div>
                                </div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AdvancedAnalytics;
