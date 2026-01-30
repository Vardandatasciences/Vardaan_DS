import React from 'react';
import './expertise.css';
import { FaUserGraduate, FaChartLine, FaRobot, FaDatabase } from 'react-icons/fa';

const Expertise = () => {
  return (
    <section className="expertise-section">
      <div className="expertise-container">
        <div className="expertise-left">
          <h2 className="expertise-heading">Powerful Insights Through Data Science</h2>
          <p className="expertise-desc">
            Empower your organization to extract actionable insights, optimize operations, and drive innovation. From advanced analytics to machine learning, we help you harness the full potential of your data for smarter, faster decision-making.
          </p>
        </div>
        <div className="expertise-right">
          <div className="expertise-card">
            <div className="expertise-icon"><FaUserGraduate size={28} color="#fff" style={{margin:'4px'}} /></div>
            <div>
              <h3>Expert Data Scientists</h3>
              <p>Solve complex business problems with our experienced data science professionals.</p>
            </div>
          </div>
          <hr className="expertise-divider" />
          <div className="expertise-card">
            <div className="expertise-icon"><FaChartLine size={28} color="#fff" style={{margin:'4px'}} /></div>
            <div>
              <h3>Advanced Analytics</h3>
              <p>Gain predictive insights and make data-driven decisions with advanced analytics.</p>
            </div>
          </div>
          <hr className="expertise-divider" />
          <div className="expertise-card">
            <div className="expertise-icon"><FaRobot size={28} color="#fff" style={{margin:'4px'}} /></div>
            <div>
              <h3>AI-powered Insights</h3>
              <p>Uncover hidden patterns and automate intelligence with cutting-edge AI.</p>
            </div>
          </div>
          <hr className="expertise-divider" />
          <div className="expertise-card">
            <div className="expertise-icon"><FaDatabase size={28} color="#fff" style={{margin:'4px'}} /></div>
            <div>
              <h3>Scalable Data Solutions</h3>
              <p>Build robust, scalable data systems to support your growth and innovation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise; 