import React, { useState, useEffect } from 'react';
import './DataStrategy.css';
import { useMediaByPage } from '../../../hooks/useMedia';
import Footer from '../../../components/Footer/Footer';

// Import video directly from assets
import heroVideo from '../../../assets/videos/data_strategy_herov.mp4';

// Data Constants
const TIMELINE_ITEMS = [
    {
        title: "Data Assessment & Analysis",
        description: "Comprehensive evaluation of your current data landscape, identifying opportunities and challenges.",
        features: [
            "Data audit and quality assessment",
            "Current architecture evaluation", 
            "Gap analysis and recommendations"
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        icon: "fas fa-magnifying-glass",
        color: "blue"
    },
    {
        title: "Strategic Planning & Design",
        description: "Develop comprehensive data strategies aligned with your business objectives and growth plans.",
        features: [
            "Custom data governance framework",
            "Architecture design and planning",
            "ROI analysis and roadmap"
        ],
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        icon: "fas fa-lightbulb",
        color: "purple"
    },
    {
        title: "Implementation & Optimization",
        description: "Execute the strategic plan with ongoing support, monitoring, and continuous optimization.",
        features: [
            "Phased implementation approach",
            "Team training and knowledge transfer",
            "Ongoing monitoring and optimization"
        ],
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        icon: "fas fa-gear",
        color: "green"
    }
];

const BENEFITS = [
    {
        title: "Enhanced Decision-Making",
        description: "Through comprehensive strategies tailored to the unique needs of each organization, clients gain the ability to make informed, data-driven decisions that enhance operational efficiency, productivity, and competitiveness.",
        icon: "fas fa-brain",
        color: "blue",
        bgColor: "bg-blue-50"
    },
    {
        title: "Regulatory Compliance",
        description: "By ensuring data is managed ethically and securely, our services mitigate risks associated with non-compliance and provide peace of mind in navigating complex regulatory environments.",
        icon: "fas fa-shield-halved",
        color: "purple",
        bgColor: "bg-purple-50"
    },
    {
        title: "Scalability and Efficiency",
        description: "The scalable frameworks designed by Vardaan support seamless data flow across organizations, enabling them to adapt to growth and changes without compromising efficiency or security.",
        icon: "fas fa-chart-line",
        color: "green",
        bgColor: "bg-green-50"
    }
];

// Component Sections
const HeroSection = ({ heroVideoUrl }) => {
    const [videoError, setVideoError] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);

    useEffect(() => {
        console.log('DataStrategy HeroSection - heroVideoUrl:', heroVideoUrl);
    }, [heroVideoUrl]);

    const handleVideoError = () => {
        console.error('Video failed to load:', heroVideoUrl);
        setVideoError(true);
        setVideoLoading(false);
    };

    const handleVideoLoad = () => {
        console.log('Video loaded successfully:', heroVideoUrl);
        setVideoLoading(false);
    };

    return (
        <section className="hero-section relative h-[70vh] flex items-center justify-center overflow-hidden">
            {heroVideoUrl && !videoError ? (
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={handleVideoError}
                    onLoadedData={handleVideoLoad}
                >
                    <source src={heroVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            )}
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold hero-title">
                    Data Strategy and Consulting
                </h1>
            </div>
        </section>
    );
};

const TimelineSection = () => (
    <section className="timeline-section py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Our Data <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transformation Journey</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Follow our proven methodology to transform your data landscape from strategy to implementation
                </p>
            </div>

            <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line rounded-full hidden lg:block"></div>
                
                <div className="space-y-16">
                    {TIMELINE_ITEMS.map((item, index) => (
                        <div key={index} className={`relative flex flex-col lg:flex-row items-center animate-on-scroll ${
                            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                        }`}>
                            <div className={`lg:w-1/2 ${
                                index % 2 === 1 ? 'lg:pl-16' : 'lg:pr-16'
                            } mb-8 lg:mb-0`}>
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center mb-6">
                                        <div className={`w-12 h-12 bg-${item.color}-600 rounded-full flex items-center justify-center mr-4`}>
                                            <i className={`${item.icon} text-white text-xl`}></i>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <ul className="text-gray-600 space-y-2">
                                        {item.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center">
                                                <i className="fas fa-check text-green-500 mr-2"></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            <div className={`lg:w-1/2 ${
                                index % 2 === 1 ? 'lg:pr-16' : 'lg:pl-16'
                            }`}>
                                <img 
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                                />
                            </div>
                            
                            <div className={`timeline-node absolute left-1/2 bg-${item.color}-600 rounded-full hidden lg:block`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const MainContentSection = ({ dataStrategyImageUrl }) => (
    <>
        <section className="content-section-1 py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="animate-on-scroll order-2 lg:order-1">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Comprehensive Data Strategy & Consulting
                        </h2>
                        <div className="prose prose-lg text-gray-600">
                            <p className="mb-4">
                                At Vardaan, we understand that data is one of the most valuable assets for any organization. Our Data Strategy & Consulting services aim to help companies unlock the full potential of their data by developing comprehensive strategies tailored to their unique needs.
                            </p>
                        </div>
                    </div>
                    
                    <div className="relative animate-on-scroll order-1 lg:order-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl transform rotate-6"></div>
                        <img 
                            src={dataStrategyImageUrl}
                            alt="Data Strategy" 
                            className="relative z-10 rounded-3xl shadow-2xl w-full h-96 object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="content-section-2 py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative animate-on-scroll order-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl transform rotate-6"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Data Strategy Implementation" 
                            className="relative z-10 rounded-3xl shadow-2xl w-full h-96 object-cover"
                        />
                    </div>

                    <div className="animate-on-scroll order-2">
                        <div className="prose prose-lg text-gray-600">
                            <p className="mb-4">
                                We specialize in data governance, ensuring your data is managed ethically, securely, and in compliance with regulatory standards. Our expertise in data architecture enables us to design scalable and efficient frameworks that support seamless data flow across your organization.
                            </p>
                            <p>
                                By focusing on strategic planning, we empower businesses to make informed decisions that drive long-term growth, innovation, and competitive advantage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
);

const BenefitsSection = () => (
    <section className="benefits-section py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="data-strategy-benefits-heading mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Client Benefits for Each Service Line</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {BENEFITS.map((benefit, index) => (
                    <div key={index} className={`benefit-card relative overflow-hidden p-6 md:p-8 rounded-xl ${benefit.bgColor} group`}>
                        <div className={`absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-${benefit.color}-100 rounded-full -mr-4 -mt-4 md:-mr-8 md:-mt-8 transition-all duration-300 ease-in-out transform group-hover:scale-[4] group-hover:-mr-16 group-hover:-mt-16`}></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className={`w-10 h-10 md:w-12 md:h-12 bg-${benefit.color}-600 rounded-lg flex items-center justify-center mb-4 md:mb-6`}>
                                <i className={`${benefit.icon} text-white text-xl md:text-2xl`}></i>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">{benefit.title}</h3>
                            <p className="text-sm md:text-base text-gray-600 flex-grow">{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const DataStrategy = () => {
    // Fetch media from the database for Data Strategy page (keeping for images)
    const { media: dataStrategyMedia, loading: mediaLoading } = useMediaByPage('Services-Data Strategy');

    // Helper to get the S3 URL for a given mediaKey (keeping for images)
    const getMediaUrl = (mediaKey, fileType = null) => {
        const norm = str => str.replace(/\s+/g, '').toLowerCase();
        
        // Filter by file type if specified
        let mediaItems = dataStrategyMedia;
        if (fileType) {
            mediaItems = dataStrategyMedia.filter(item => item.file_type === fileType);
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
    
    // Get specific images for Data Strategy (keeping database fetch for images)
    const dataStrategyImageUrl = getMediaUrl('data_strategy1.avif', 'image') || getMediaUrl('data_strategy1', 'image');

    // Debug logging
    useEffect(() => {
        console.log('DataStrategy - dataStrategyMedia:', dataStrategyMedia);
        console.log('DataStrategy - heroVideoUrl:', heroVideoUrl);
        console.log('DataStrategy - dataStrategyImageUrl:', dataStrategyImageUrl);
    }, [dataStrategyMedia, heroVideoUrl, dataStrategyImageUrl]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <HeroSection heroVideoUrl={heroVideoUrl} />
            <div className="pt-8">
                <TimelineSection />
                <MainContentSection dataStrategyImageUrl={dataStrategyImageUrl} />
                <BenefitsSection />
            </div>
            <Footer />
        </div>
    );
};

export default DataStrategy;