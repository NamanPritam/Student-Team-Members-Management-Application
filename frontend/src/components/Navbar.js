import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">⬡ TEAM NEXUS</Link>
      <div className="navbar-links">
        <Link
          to="/"
          className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`}
        >
          🏠 Home
        </Link>
        <Link
          to="/add"
          className={`nav-btn ${location.pathname === '/add' ? 'active' : ''}`}
        >
          ＋ Add Member
        </Link>
        <Link
          to="/view"
          className={`nav-btn ${location.pathname === '/view' ? 'active' : ''}`}
        >
          👥 View Members
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
