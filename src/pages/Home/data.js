import React from 'react';
import './data.css';
import img1 from '../../assets/Images/Home/Data 1.webp';
import img2 from '../../assets/Images/Home/Data 2.jpg';
import img3 from '../../assets/Images/Home/Data 3.jpg';
import img4 from '../../assets/Images/Home/Data 4.webp';

const Data = () => {
  return (
    <section className="home-data-section">
      <h2 className="home-data-title">Driven to Deliver!</h2>
      <div className="home-data-cards">
        <div className="home-data-card">
          <div className="home-data-img-wrapper">
            <img src={img1} alt="Data Strategy & Consulting" className="home-data-img" />
          </div>
          <div className="home-data-content">
            <span className="home-data-label">Data Strategy & Consulting</span>
            <p className="home-data-desc">
              Unlock business value with tailored data strategies, roadmap development, and expert consulting to drive digital transformation.
            </p>
          </div>
        </div>
        
        <div className="home-data-card">
          <div className="home-data-img-wrapper">
            <img src={img2} alt="Advanced Analytics & Machine Learning" className="home-data-img" />
          </div>
          <div className="home-data-content">
            <span className="home-data-label">Advanced Analytics & Machine Learning</span>
            <p className="home-data-desc">
              Leverage predictive analytics, AI, and machine learning to uncover insights, automate processes, and enable smarter decisions.
            </p>
          </div>
        </div>
        
        <div className="home-data-card">
          <div className="home-data-img-wrapper">
            <img src={img3} alt="Data Engineering & Integration" className="home-data-img" />
          </div>
          <div className="home-data-content">
            <span className="home-data-label">Data Engineering & Integration</span>
            <p className="home-data-desc">
              Build robust data pipelines, integrate diverse sources, and ensure data quality for seamless analytics and business operations.
            </p>
          </div>
        </div>

        <div className="home-data-card">
          <div className="home-data-img-wrapper">
            <img src={img4} alt="Business Intelligence & Visualization" className="home-data-img" />
          </div>
          <div className="home-data-content">
            <span className="home-data-label">Business Intelligence & Visualization</span>
            <p className="home-data-desc">
              Transform raw data into actionable insights with interactive dashboards and reports for effective decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Data; 