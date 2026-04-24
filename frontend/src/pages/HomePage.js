import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-bg-grid"></div>
        <div className="hero-content fade-in">
          <div className="team-badge fade-in fade-in-delay-1">
            <span>✦</span> SRM Institute of Science and Technology <span>✦</span>
          </div>

          <h1 className="hero-title fade-in fade-in-delay-1">
            <span className="hero-title-small">Welcome to</span>
            <br />
            TEAM <span className="hero-accent">NEXUS</span>
          </h1>

          <p className="hero-subtitle fade-in fade-in-delay-2">
            Student Team Members Management Application<br />
            <span className="hero-course">21CSS301T — Full Stack Development</span>
          </p>

          <div className="hero-actions fade-in fade-in-delay-3">
            <p className="manage-label">⬡ Manage Team</p>
            <div className="hero-btns">
              <Link to="/add" className="btn btn-primary hero-btn">
                ＋ Add Member
              </Link>
              <Link to="/view" className="btn btn-outline hero-btn">
                👥 View Members
              </Link>
            </div>
          </div>
        </div>

        {/* Floating orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Features Section */}
      <div className="features-section page-container">
        <div className="features-grid">
          <div className="feature-card fade-in fade-in-delay-1">
            <div className="feature-icon">📋</div>
            <h3>Add Members</h3>
            <p>Register new team members with their details, role, and a professional photo.</p>
            <Link to="/add" className="feature-link">Get started →</Link>
          </div>
          <div className="feature-card fade-in fade-in-delay-2">
            <div className="feature-icon">👥</div>
            <h3>View All Members</h3>
            <p>Browse the full list of team members with their profiles in a clean card layout.</p>
            <Link to="/view" className="feature-link">Explore →</Link>
          </div>
          <div className="feature-card fade-in fade-in-delay-3">
            <div className="feature-icon">🔍</div>
            <h3>Member Details</h3>
            <p>Click any member to view their full profile including projects, hobbies, and aims.</p>
            <Link to="/view" className="feature-link">Browse members →</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>TEAM NEXUS · SRM IST · Full Stack Development · 2024–25</p>
      </footer>
    </div>
  );
}

export default HomePage;
