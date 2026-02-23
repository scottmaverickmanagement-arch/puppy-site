import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer shadow-top">
            <div className="container footer-content grid grid-cols-4">
                <div className="footer-column brand-column">
                    <div className="logo">
                        <span className="logo-icon">🐾</span>
                        <span className="logo-text">Pawfect Match</span>
                    </div>
                    <p className="footer-tagline">Bringing families together with healthy, happy puppies from vetted breeders.</p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook">FB</a>
                        <a href="#" aria-label="Instagram">IG</a>
                        <a href="#" aria-label="Twitter">TW</a>
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Search Puppies</h3>
                    <ul>
                        <li><a href="/listings?type=purebred">Purebred Puppies</a></li>
                        <li><a href="/listings?type=designer">Designer Breeds</a></li>
                        <li><a href="/listings?filter=size">By Size</a></li>
                        <li><a href="/listings?filter=friendly">Family Friendly</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="/promise">Our Promise</a></li>
                        <li><a href="/health">Health Guarantee</a></li>
                        <li><a href="/delivery">Safe Delivery</a></li>
                        <li><a href="/blog">Puppy Care Blog</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <ul className="contact-list">
                        <li>Customer Care: <a href="tel:1800PAWFECT">1-800-PAWFECT</a></li>
                        <li>Email: <a href="mailto:hello@pawfectmatch.com">hello@pawfectmatch.com</a></li>
                        <li>Hours: 8am – Midnight EST</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container bottom-flex">
                    <p>&copy; {new Date().getFullYear()} Pawfect Match. All rights reserved.</p>
                    <div className="legal-links">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                        <a href="/sitemap">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
