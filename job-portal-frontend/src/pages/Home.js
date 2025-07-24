import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component

import './styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      
      
      <main className="home-content">
        <section className="hero-section">
          <h1>Give your Career a Jumpstart</h1>
          <p>
            JobWell is Sri Lanka's premier Job Board. A marketplace tasked to help companies hire the best talent.
            JobWell is already trusted by over 8500 Sri Lankan and global organizations, and has a proven track
            record of utilizing recruitment technology with a Sri Lankan touch. JobWell has now processed over
            6 million job applications.
          </p>
          
          {/* Registration Buttons */}
          <div className="registration-cta">
            <h2>Ready to get started?</h2>
             <Link to="/register" className="register-btn">
          Register Now
        </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;