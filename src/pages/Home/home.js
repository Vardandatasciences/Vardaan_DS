// pages/Home/home.js
import React, { useEffect } from 'react';
import './home.css';
import HeroSlider from './HeroSlider';
import Data from './data';
import Expertise from './expertise';
import DataSciences from './DataSciences';
// import Clients from './clients';
import WorldMap from './Globe';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  // Add debugging for video loading
  useEffect(() => {
    console.log('Home component mounted - checking for video loading...');
  }, []);

  return (
    <>
      <div id="home" className="hero-container">
        {/* <div className="preview-button">Preview</div> */}
        <div className="diagonal-cut"></div>
       
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
       
        <div className="gradient-waves">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
       
        <div className="diagonal-bars">
          <div className="color-bar"></div>
          <div className="color-bar"></div>
          <div className="color-bar"></div>
          <div className="color-bar"></div>
        </div>
       
        <div className="light-streaks">
          <div className="light-streak"></div>
          <div className="light-streak"></div>
          <div className="light-streak"></div>
        </div>
       
        <HeroSlider />
      </div>
      <Data />
      <Expertise />
      <DataSciences />
      {/* <Clients /> */}
      <WorldMap />
      <Footer />
    </>
  );
}

export default Home;