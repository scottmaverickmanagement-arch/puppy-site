import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <div className="how-it-works-page">
            {/* Page Header */}
            <section className="how-header">
                <div className="container">
                    <div className="header-content">
                        <span className="subtitle-brand">THE PROCESS</span>
                        <h1>The Pawfect Match process</h1>
                        <p>From choosing your new best friend to welcoming them home—here's what to expect.</p>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="how-overview section-padding-lg">
                <div className="container">
                    <div className="overview-card">
                        <div className="process-steps-wrapper">
                            <div className="process-line-dashed"></div>
                            <div className="process-steps-grid">
                                <div className="process-step">
                                    <div className="step-number">1</div>
                                    <span>Find your perfect puppy</span>
                                </div>
                                <div className="process-step">
                                    <div className="step-number">2</div>
                                    <span>Reserve & pick delivery</span>
                                </div>
                                <div className="process-step">
                                    <div className="step-number">3</div>
                                    <span>Health & readiness check</span>
                                </div>
                                <div className="process-step">
                                    <div className="step-number">4</div>
                                    <span>Delivery coordination & arrival</span>
                                </div>
                                <div className="process-step">
                                    <div className="step-number">5</div>
                                    <span>Support for life</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Steps */}
            <section className="how-details">
                <div className="container">
                    <div className="details-list">
                        <div className="detail-item">
                            <div className="detail-number">Step 1</div>
                            <div className="detail-text">
                                <h3>Find your perfect puppy</h3>
                                <p>Search by breed, size, color, age, or gender. Every puppy on our site is from a vetted, screened breeder who shares our commitment to canine health and welfare.</p>
                                <a href="/listings" className="learn-more-link">View available puppies →</a>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-number">Step 2</div>
                            <div className="detail-text">
                                <h3>Reserve & pick delivery</h3>
                                <p>Reserve your perfect puppy online or with a specialist and choose your preferred delivery method via our exclusive puppy transit system, designed for safety and comfort.</p>
                                <a href="/listings" className="learn-more-link">Learn about delivery →</a>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-number">Step 3</div>
                            <div className="detail-text">
                                <h3>Health & readiness check</h3>
                                <p>Every puppy undergoes a comprehensive health evaluation backed by our industry-leading 10-year health commitment. We ensure they are ready for their forever home.</p>
                                <a href="/promise" className="learn-more-link">Our health promise →</a>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-number">Step 4</div>
                            <div className="detail-text">
                                <h3>Delivery coordination & arrival</h3>
                                <p>We coordinate a safe delivery via our climate-controlled puppy transit system or private air travel. Your puppy's safety is our highest priority during the journey.</p>
                                <a href="/listings" className="learn-more-link">Delivery options →</a>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-number">Step 5</div>
                            <div className="detail-text">
                                <h3>Support for life</h3>
                                <p>Our commitment doesn't end at delivery. We'll provide ongoing guidance, tips, and resources for you and your puppy's happy life together. We are here for you.</p>
                                <a href="/listings" className="learn-more-link">Customer support →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Callout */}
            <section className="how-visual-callout section-padding-lg">
                <div className="container">
                    <div className="callout-grid">
                        <div className="callout-content">
                            <h2>How we place healthy puppies into happy homes</h2>
                            <div className="callout-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" alt="Puppy Care" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA sections */}
            <section className="how-contact-cta section-padding-lg text-center">
                <div className="container">
                    <h3>Get in touch with us</h3>
                    <div className="team-avatars">
                        <img src="https://i.pravatar.cc/100?u=1" alt="Team" />
                        <img src="https://i.pravatar.cc/100?u=2" alt="Team" />
                        <img src="https://i.pravatar.cc/100?u=3" alt="Team" />
                    </div>
                    <a href="tel:8886710518" className="btn btn-primary-outline btn-pill">Call (888) 671-0518</a>
                </div>
            </section>

            <section className="how-bottom-cta">
                <div className="container">
                    <div className="cta-box">
                        <div className="cta-text">
                            <h3>Keep exploring puppies</h3>
                            <p>Your new best friend is waiting for you.</p>
                        </div>
                        <a href="/listings" className="btn btn-white btn-pill">Browse All Puppies</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
