import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveDropdown(null); // Reset dropdowns when closing menu
    };

    const toggleDropdown = (e, name) => {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            setActiveDropdown(activeDropdown === name ? null : name);
        }
    };

    return (
        <header className="header sticky">
            <div className="top-banner">
                <p>Call our puppy concierges: 8am – midnight (EST)</p>
            </div>
            <nav className="nav container">
                <div className="logo-container">
                    <a href="/" className="logo">
                        <span className="logo-icon">🐾</span>
                        <span className="logo-text">Pawfect Match</span>
                    </a>
                </div>

                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li className={`nav-item dropdown-trigger ${activeDropdown === 'puppies' ? 'mobile-active' : ''}`}>
                        <a href="/listings" onClick={(e) => toggleDropdown(e, 'puppies')}>
                            Available Puppies <span className="dropdown-arrow">▼</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><a href="/listings?category=apartment" onClick={() => setIsMenuOpen(false)}>Apartment Dogs</a></li>
                            <li><a href="/listings?category=allergy" onClick={() => setIsMenuOpen(false)}>Allergy Friendly Dogs</a></li>
                            <li><a href="/listings?category=family" onClick={() => setIsMenuOpen(false)}>Family Dogs</a></li>
                            <li><a href="/listings?category=active" onClick={() => setIsMenuOpen(false)}>Active Dogs</a></li>
                            <li><a href="/listings?category=purebred" onClick={() => setIsMenuOpen(false)}>Pure Bred</a></li>
                            <li><a href="/listings?category=designer" onClick={() => setIsMenuOpen(false)}>Designer</a></li>
                            <li><a href="/listings" onClick={() => setIsMenuOpen(false)}>Explore All Breeds</a></li>
                        </ul>
                    </li>
                    <li className={`nav-item dropdown-trigger ${activeDropdown === 'about' ? 'mobile-active' : ''}`}>
                        <a href="/about" onClick={(e) => toggleDropdown(e, 'about')}>
                            About Us <span className="dropdown-arrow">▼</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><a href="/how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</a></li>
                            <li><a href="/how-it-works" onClick={() => setIsMenuOpen(false)}>Delivery Methods</a></li>
                            <li><a href="/promise" onClick={() => setIsMenuOpen(false)}>Our Promise</a></li>
                        </ul>
                    </li>
                    <li className={`nav-item dropdown-trigger ${activeDropdown === 'shop' ? 'mobile-active' : ''}`}>
                        <a href="/shop" onClick={(e) => toggleDropdown(e, 'shop')}>
                            Shop <span className="dropdown-arrow">▼</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><a href="/shop/essentials" onClick={() => setIsMenuOpen(false)}>Dog Essentials</a></li>
                            <li><a href="/shop/services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
                        </ul>
                    </li>
                </ul>

                <div className="nav-actions">
                    <button className="search-btn" aria-label="Search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                    <a href="tel:8886710518" className="btn btn-primary concierge-btn">
                        Call Now: (888) 671-0518
                    </a>
                    <button className={`mobile-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </header >
    );
};

export default Header;
