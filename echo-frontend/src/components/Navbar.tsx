import React, { useState } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/logo.png" alt="Logo" />
      </div>

      <div className="navbar-hamburger" onClick={toggleMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>

      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <button className="close-button" onClick={toggleMenu}>
            &#10005; 
          </button>
          <a href="/home" className="menu-link">Home</a>
          <a href="/profile" className="menu-link">My Profile</a>
          <a href="/aboutus" className="menu-link">About Us</a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;