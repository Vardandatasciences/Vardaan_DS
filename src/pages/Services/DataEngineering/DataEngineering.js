import React, { useState, useEffect } from 'react';
import './DataEngineering.css';
import { useMediaByPage } from '../../../hooks/useMedia';
import Footer from '../../../components/Footer/Footer';

// Import video directly from assets
import heroVideo from '../../../assets/videos/data_engineeing_herov.mp4';

const DataEngineering = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);

    // Fetch media from the database for Data Engineering page (keeping for images)
    const { media: dataEngineeringMedia, loading: mediaLoading } = useMediaByPage('Services-DataEngineering');

    // Helper to get the S3 URL for a given mediaKey (keeping for images)
    const getMediaUrl = (mediaKey, fileType = null) => {
        const norm = str => str.replace(/\s+/g, '').toLowerCase();
        
        // Filter by file type if specified
        let mediaItems = dataEngineeringMedia;
        if (fileType) {
            mediaItems = dataEngineeringMedia.filter(item => item.file_type === fileType);
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

    // Use direct video import instead of database fetch
    const heroVideoUrl = heroVideo;
    
    // Get specific images for Data Engineering (keeping database fetch for images)
    const introImageUrl = getMediaUrl('data_engineering_intro1.jpg', 'image') || getMediaUrl('data_engineering_intro1', 'image');
    const introImage2Url = getMediaUrl('data_engineering_intro2.jpg', 'image') || getMediaUrl('data_engineering_intro2', 'image');
    const streamlinedFlowUrl = getMediaUrl('streamlined_dataflow.png', 'image') || getMediaUrl('streamlined_dataflow', 'image');
    const improvedQualityUrl = getMediaUrl('improved_data_quality.jpg', 'image') || getMediaUrl('improved_data_quality', 'image');
    const techAdaptabilityUrl = getMediaUrl('technology_adaptibility.jpg', 'image') || getMediaUrl('technology_adaptibility', 'image');

    // Debug logging
    useEffect(() => {
        console.log('DataEngineering - dataEngineeringMedia:', dataEngineeringMedia);
        console.log('DataEngineering - heroVideoUrl:', heroVideoUrl);
    }, [dataEngineeringMedia, heroVideoUrl]);

    const handleVideoError = () => {
        console.error('Video failed to load:', heroVideoUrl);
        setVideoError(true);
        setVideoLoading(false);
    };

    const handleVideoLoad = () => {
        console.log('Video loaded successfully:', heroVideoUrl);
        setVideoLoading(false);
    };

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

    return (
        <div className="data-engineering-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-image-container">
                    {heroVideoUrl && !videoError ? (
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                            className="hero-video"
                            onError={handleVideoError}
                            onLoadedData={handleVideoLoad}
                        >
                            <source src={heroVideoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="hero-video bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    )}
                </div>
                
                <div className="hero-content">
                    <div className="hero-title-container">
                        <h1 className="hero-title">
                            Data Engineering and Integration
                        </h1>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="intro-section">
                <div className="intro-container">
                    <div className="intro-row">
                        {/* Image Column */}
                        <div className="image-container animate-on-scroll">
                            <div className="image-wrapper">
                                <img 
                                    src={introImageUrl}
                                    alt="Data Engineering and Integration Solutions" 
                                    className="intro-image"
                                />
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="intro-content-container animate-on-scroll">
                            <div className="content-text">
                                <p className="intro-text">
                                    Efficient data management is the backbone of any data-driven organization. Vardaan offers comprehensive Data Engineering & Integration services to ensure your data is accessible, accurate, and ready for analysis. We specialize in building robust data pipelines that seamlessly connect multiple sources, allowing for streamlined data flow and integration.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Intro Section */}
            <section className="second-intro-section">
                <div className="second-intro-container">
                    <div className="second-intro-row">
                        {/* Content Column */}
                        <div className="second-content-container animate-on-scroll">
                            <div className="second-content-text">
                                <p className="intro-text">
                                    Our team works diligently to address challenges related to disparate data sources, ensuring consistency and quality throughout. Whether it's migrating legacy systems or integrating cutting-edge technologies, our solutions are tailored to meet the unique needs of your business.
                                </p>
                                <p className="intro-text">
                                    With Vardaan, you can trust that your data infrastructure is built to sustain growth and innovation.
                                </p>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="second-image-container animate-on-scroll">
                            <div className="second-image-wrapper">
                                <img 
                                    src={introImage2Url}
                                    alt="Data Engineering Collaboration and Partnership" 
                                    className="second-intro-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Benefits Heading */}
            <div className="client-benefits-section">
                <div className="data-engineering-benefits-heading">
                    <h2>Client Benefits for Each Service Line</h2>
                </div>
                
                {/* Features Section */}
                <div className="features-grid">
                    {/* Streamlined Dataflow Feature */}
                    <div className="feature-card animate-on-scroll">
                        <div className="feature-image-wrapper">
                            <img 
                                src={streamlinedFlowUrl}
                                alt="Streamlined Data Flow Process" 
                                className="feature-image"
                            />
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">Streamlined Data Flow</h3>
                            <p className="feature-description">
                                Robust data pipelines are built to seamlessly connect disparate sources, ensuring that businesses can access unified and actionable data without disruptions or delays.
                            </p>
                        </div>
                    </div>

                    {/* Improved Data Quality Feature */}
                    <div className="feature-card animate-on-scroll">
                        <div className="feature-image-wrapper">
                            <img 
                                src={improvedQualityUrl}
                                alt="Improved Data Quality" 
                                className="feature-image"
                            />
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">Improved Data Quality</h3>
                            <p className="feature-description">
                                Our services address inconsistencies in data sources, guaranteeing that organizations have reliable datasets for analysis and decision-making, thereby avoiding costly errors.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technology Adaptability Section */}
            <section className="tech-adaptability-section">
                <div className="tech-adaptability-container">
                    <div className="tech-adaptability-card animate-on-scroll">
                        <div className="tech-adaptability-image-wrapper">
                            <img 
                                src={techAdaptabilityUrl}
                                alt="Technology Adaptability" 
                                className="tech-adaptability-image"
                            />
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">Technology Adaptability</h3>
                            <p className="feature-description">
                                Whether integrating legacy systems or adopting cutting-edge technologies, Vardaan ensures that client infrastructures are adaptable and future-proofed to sustain growth and innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DataEngineering;
