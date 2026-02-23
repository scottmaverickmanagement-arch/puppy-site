import React, { useState, useEffect } from 'react';
import './Promise.css';

const Promise = () => {
    const [scrollOpacity, setScrollOpacity] = useState(0.30);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollY / (maxScroll * 0.5), 1);
            setScrollOpacity(0.30 + progress * 0.25); // 0.30 at top → 0.55 max
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="promise-page">
            {/* Fixed Video Background */}
            <div className="promise-video-bg">
                <video autoPlay muted loop playsInline>
                    <source src="/assets/our promise-bg.mp4" type="video/mp4" />
                </video>
                <div className="promise-video-overlay" style={{ opacity: scrollOpacity }}></div>
            </div>

            {/* Hero Section */}
            <section className="promise-hero">
                <div className="container promise-hero-content">
                    <span className="promise-badge">🐾 Our Commitment to You</span>
                    <h1 className="promise-hero-title">The Pawfect Match Promise</h1>
                    <p className="promise-hero-subtitle">
                        Finding your perfect puppy shouldn't be full of mystery or compromise.
                        Our promise means you can find the right companion with absolute confidence, transparency, and peace of mind.
                    </p>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="promise-stats">
                <div className="container promise-stats-grid">
                    <div className="stat-item">
                        <span className="stat-number">15,000+</span>
                        <span className="stat-label">Happy Puppies Placed</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Vetted Breeders</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">10 Year</span>
                        <span className="stat-label">Health Commitment</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">4.9 ★</span>
                        <span className="stat-label">Customer Rating</span>
                    </div>
                </div>
            </section>

            {/* Promise Pillars */}
            <section className="promise-pillars section-pad">
                <div className="container">
                    <div className="section-intro">
                        <h2>What Our Promise Means</h2>
                        <p>Every puppy that comes through Pawfect Match is backed by our unwavering commitment to health, ethics, and your happiness.</p>
                    </div>

                    {/* Pillar 1 - No Puppy Mills */}
                    <div className="pillar-card">
                        <div className="pillar-icon-wrap">
                            <div className="pillar-icon">🚫🏭</div>
                        </div>
                        <div className="pillar-content">
                            <h3>Absolutely No Puppy Mills</h3>
                            <p>
                                We have a zero-tolerance policy for puppy mills. Every single breeder in our network
                                undergoes a rigorous, multi-step screening process. We personally verify living conditions,
                                breeding practices, and the health history of all parents. Less than 10% of applicants
                                meet our standards — and that's exactly how it should be.
                            </p>
                            <div className="pillar-highlights">
                                <span>✓ On-site inspections</span>
                                <span>✓ USDA compliance verified</span>
                                <span>✓ Background checks</span>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 2 - Health Guarantee */}
                    <div className="pillar-card reverse">
                        <div className="pillar-icon-wrap">
                            <div className="pillar-icon">🩺🛡️</div>
                        </div>
                        <div className="pillar-content">
                            <h3>Comprehensive Health Guarantee</h3>
                            <p>
                                Every puppy comes with a thorough nose-to-tail health examination by a licensed
                                veterinarian before joining your family. We provide a 10-year health commitment
                                — the most comprehensive in the industry — because we stand firmly behind the
                                health of every puppy we place.
                            </p>
                            <div className="pillar-highlights">
                                <span>✓ Vet-examined before travel</span>
                                <span>✓ 10-year health guarantee</span>
                                <span>✓ Up-to-date vaccinations</span>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 3 - Safe Delivery */}
                    <div className="pillar-card">
                        <div className="pillar-icon-wrap">
                            <div className="pillar-icon">✈️🏠</div>
                        </div>
                        <div className="pillar-content">
                            <h3>Safe & Stress-Free Delivery</h3>
                            <p>
                                Our private travel network ensures your puppy arrives safely and comfortably.
                                Whether it's a VIP hand-delivery to your door or a carefully coordinated flight
                                with a dedicated puppy nanny, we treat every journey with the utmost care and attention.
                                Your puppy's comfort is our top priority.
                            </p>
                            <div className="pillar-highlights">
                                <span>✓ Private puppy nannies</span>
                                <span>✓ Climate-controlled travel</span>
                                <span>✓ Door-to-door delivery option</span>
                            </div>
                        </div>
                    </div>

                    {/* Pillar 4 - Breeder Standards */}
                    <div className="pillar-card reverse">
                        <div className="pillar-icon-wrap">
                            <div className="pillar-icon">⭐📋</div>
                        </div>
                        <div className="pillar-content">
                            <h3>Elite Breeder Standards</h3>
                            <p>
                                Our breeders aren't just approved — they're hand-selected. We maintain the highest
                                standards in the industry with ongoing monitoring, regular check-ins, and continuous
                                quality assessments. Our breeders are passionate about their breeds and dedicated
                                to raising healthy, well-socialized puppies in loving environments.
                            </p>
                            <div className="pillar-highlights">
                                <span>✓ Hand-selected breeders</span>
                                <span>✓ Ongoing quality audits</span>
                                <span>✓ Socialization standards</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="promise-process section-pad">
                <div className="container">
                    <div className="section-intro light">
                        <h2>How We Keep Our Promise</h2>
                        <p>From the moment you begin your search to the day your puppy arrives, every step is guided by our commitment to your experience.</p>
                    </div>

                    <div className="process-steps">
                        <div className="process-step">
                            <div className="step-number">01</div>
                            <h4>Breeder Screening</h4>
                            <p>Every breeder application undergoes rigorous review including background checks, facility inspections, and veterinary references.</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">02</div>
                            <h4>Health Verification</h4>
                            <p>Each puppy receives a comprehensive nose-to-tail health exam by a licensed veterinarian, with full documentation provided.</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">03</div>
                            <h4>Perfect Matching</h4>
                            <p>Our team helps match you with the ideal puppy based on your lifestyle, family situation, and personal preferences.</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">04</div>
                            <h4>Safe Arrival</h4>
                            <p>Your puppy travels safely with our dedicated travel network, arriving healthy, happy, and ready to join your family.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Highlight */}
            <section className="promise-testimonials section-pad">
                <div className="container">
                    <div className="section-intro">
                        <h2>Families Who Trust Us</h2>
                        <p>Join thousands of happy families who found their pawfect match through our promise-backed service.</p>
                    </div>

                    <div className="testimonial-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-stars">★★★★★</div>
                            <p className="testimonial-text">"The entire process was incredibly smooth. From the health guarantee to the safe delivery, every promise was kept. Our Golden Retriever puppy arrived healthy and full of energy!"</p>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <strong>Sarah M.</strong>
                                    <span>Golden Retriever Mom</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="testimonial-stars">★★★★★</div>
                            <p className="testimonial-text">"I was nervous about buying a puppy online, but Pawfect Match put all my fears to rest. The breeder was incredible, the health records were thorough, and our Frenchie is absolutely perfect."</p>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <strong>James R.</strong>
                                    <span>French Bulldog Dad</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="testimonial-stars">★★★★★</div>
                            <p className="testimonial-text">"The 10-year health guarantee gave us such peace of mind. When our pup had a minor issue, their team was incredibly supportive. This is how puppy adoption should work."</p>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <strong>Emily & David K.</strong>
                                    <span>Labrador Family</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="promise-cta">
                <div className="container promise-cta-content">
                    <h2>Ready to Find Your Pawfect Match?</h2>
                    <p>Every puppy in our family is backed by our promise. Start your journey today.</p>
                    <div className="cta-buttons">
                        <a href="/listings" className="btn btn-primary btn-lg">Browse Puppies</a>
                        <a href="/quiz" className="btn btn-outline-light btn-lg">Take the Breed Quiz</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Promise;
