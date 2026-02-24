import React, { useState, useEffect } from 'react';
import './Home.css';
import { puppies } from '../data/puppies';

const breeds = [
    { id: 1, name: 'French Bulldog', titleSlug: 'Loyal /\nCompanion', desc: 'Sweet, playful, and completely irresistible. A big personality in a small package.', bg: '/assets/frenchie-bg.jpg', card: '/assets/frenchie-card.jpg' },
    { id: 2, name: 'Labrador Retriever', titleSlug: 'Active /\nFriendly', desc: 'The ultimate family dog with a heart of gold and boundless energy.', bg: '/assets/lab-bg.jpg', card: '/assets/lab-card.jpg' },
    { id: 3, name: 'Golden Retriever', titleSlug: 'Gentle /\nIntelligent', desc: 'Known for their patience and legendary loyalty. A friend to everyone they meet.', bg: '/assets/golden-bg.jpg', card: '/assets/golden-card.jpg' },
    { id: 4, name: 'German Shepherd', titleSlug: 'Brave /\nProtective', desc: 'A courageous guardian and a smart companion. Capable and devoted.', bg: '/assets/gsd-bg.jpg', card: '/assets/gsd-card.jpg' },
    { id: 5, name: 'Poodle', titleSlug: 'Elegant /\nProud', desc: 'Remarkably smart and surprisingly athletic dogs. Graceful and full of life.', bg: '/assets/poodle-bg.jpg', card: '/assets/poodle-card.jpg' },
    { id: 6, name: 'Dachshund', titleSlug: 'Bold /\nCurious', desc: 'Small in size but massive in personality. Brave and tireless.', bg: '/assets/dachshund-bg.jpg', card: '/assets/dachshund-card.jpg' },
    { id: 7, name: 'Beagle', titleSlug: 'Happy /\nMusical', desc: 'Inquisitive hunters with a friendly disposition and a merry heart.', bg: '/assets/beagle-bg.jpg', card: '/assets/beagle-card.jpg' },
    { id: 8, name: 'Rottweiler', titleSlug: 'Devoted /\nStrong', desc: 'Powerful protectors with a soft side for family. Calm and confident.', bg: '/assets/rottie-bg.jpg', card: '/assets/rottie-card.jpg' },
    { id: 10, name: 'Bulldog', titleSlug: 'Calm /\nDignified', desc: 'Easygoing companions who love a good nap. Kind but brave.', bg: '/assets/bulldog-bg.jpg', card: '/assets/bulldog-card.jpg' },
    { id: 11, name: 'G.S. Pointer', titleSlug: 'Energetic /\nAgile', desc: 'A versatile hunter and high-energy athlete. Always ready for adventure.', bg: '/assets/gsp-bg.jpg', card: '/assets/gsp-card.jpg' },
    { id: 12, name: 'Yorkshire Terrier', titleSlug: 'Spunky /\nAffectionate', desc: 'Big-city attitude in a tiny, glamorous package. Sprightly and tomboyish.', bg: '/assets/yorkie-bg.jpg', card: '/assets/yorkie-card.jpg' },
    { id: 13, name: 'Cavalier King', titleSlug: 'Sweet /\nGraceful', desc: 'The perfect lap dog with a gentle soul. Affectionate and eager to please.', bg: '/assets/cavalier-bg.jpg', card: '/assets/cavalier-card.jpg' },
    { id: 14, name: 'Siberian Husky', titleSlug: 'Social /\nAdventurous', desc: 'Strikingly beautiful and full of wild energy. Playful and mischievous.', bg: '/assets/husky-bg.jpg', card: '/assets/husky-card.jpg' },
    { id: 15, name: 'Boxer', titleSlug: 'Fun /\nPlayful', desc: 'High-spirited athletes who live for family fun. Patient and protective.', bg: '/assets/boxer-bg.jpg', card: '/assets/boxer-card.jpg' },
    { id: 16, name: 'Pomeranian', titleSlug: 'Fluffy /\nExtrovert', desc: 'Bold, lively, and incredibly smart companions. Tiny but mighty.', bg: '/assets/pom-bg.jpg', card: '/assets/pom-card.jpg' }
];

const Home = () => {
    const [currentBreeds, setCurrentBreeds] = useState([...breeds]);
    const [prevBreed, setPrevBreed] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isExpanding, setIsExpanding] = useState(false);
    const [expansionData, setExpansionData] = useState(null);
    const [isSliding, setIsSliding] = useState(false);
    const [slideDir, setSlideDir] = useState('next');
    const [scrollOpacity, setScrollOpacity] = useState(0.30);
    const autoTimer = React.useRef(null);

    const activeBreed = currentBreeds[0];

    // Scroll-driven overlay darkening
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollY / (maxScroll * 0.5), 1);
            setScrollOpacity(0.30 + progress * 0.25);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-advance slideshow every 10 seconds
    const resetAutoTimer = React.useCallback(() => {
        if (autoTimer.current) clearInterval(autoTimer.current);
        autoTimer.current = setInterval(() => {
            document.querySelector('.arrow-right')?.click();
        }, 20000);
    }, []);

    React.useEffect(() => {
        resetAutoTimer();
        return () => clearInterval(autoTimer.current);
    }, [resetAutoTimer]);

    /* ---------- rest of hooks/handlers stay the same ---------- */

    const handleSlideChange = (newBreeds, dir) => {
        const heroSection = document.querySelector('.premium-hero');
        const heroRect = heroSection?.getBoundingClientRect();
        const cardElements = document.querySelectorAll('.breed-card');

        // The "target" card is the one being promoted to background
        const targetIdx = dir === 'next' ? 0 : cardElements.length - 1;
        const cardRect = cardElements[targetIdx]?.getBoundingClientRect();
        const targetBreed = dir === 'next' ? currentBreeds[1] : currentBreeds[currentBreeds.length - 1];

        if (cardRect && heroRect) {
            setExpansionData({
                img: targetBreed.card,
                top: cardRect.top - heroRect.top,
                left: cardRect.left - heroRect.left,
                width: cardRect.width,
                height: cardRect.height,
                fade: false
            });
            setIsExpanding(true);
        }

        setPrevBreed(activeBreed);
        setIsVisible(false);
        setSlideDir(dir);
        setIsSliding(true);

        // 1. Start expansion immediately
        setTimeout(() => {
            setExpansionData(prev => ({ ...prev, expanded: true }));
        }, 20);

        // 2. TRIGGER FADE-OUT EARLIER (Halfway through the expansion)
        // This makes it disappear before hitting the text area
        setTimeout(() => {
            setExpansionData(prev => ({ ...prev, fade: true }));
        }, 500);

        // 3. Swap breeds and reset slider
        setTimeout(() => {
            setCurrentBreeds(newBreeds);
            setIsSliding(false);
        }, 600);

        // 4. Reveal new info
        setTimeout(() => {
            setIsVisible(true);
        }, 800);

        // 5. Final Cleanup
        setTimeout(() => {
            setIsExpanding(false);
            setExpansionData(null);
            setPrevBreed(null);
        }, 1200);
    };

    const nextSlide = () => {
        resetAutoTimer();
        const next = [...currentBreeds];
        const first = next.shift();
        next.push(first);
        handleSlideChange(next, 'next');
    };

    const prevSlide = () => {
        resetAutoTimer();
        const next = [...currentBreeds];
        const last = next.pop();
        next.unshift(last);
        handleSlideChange(next, 'prev');
    };

    const navigateToBreed = (id) => {
        window.history.pushState({}, '', `/breed/${id}`);
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <div className="home-page">
            {/* Fixed Slideshow Background */}
            <div className="home-bg-fixed">
                <div className="bg-slider">
                    {prevBreed && (
                        <div
                            className="bg-slide"
                            style={{ backgroundImage: `url(${prevBreed.bg})`, opacity: 1, zIndex: 1 }}
                        />
                    )}
                    <div
                        className={`bg-slide active`}
                        style={{
                            backgroundImage: `url(${activeBreed.bg})`,
                            zIndex: 2,
                            opacity: isVisible ? 1 : 0,
                            transition: isVisible ? 'opacity 0.8s ease' : 'none'
                        }}
                    />
                </div>
                <div className="home-bg-overlay" style={{ opacity: scrollOpacity }}></div>
            </div>

            {/* Premium Hero Section */}
            <section className="premium-hero">

                {/* Expansion Layer (Absolute inside relative Hero) */}
                {isExpanding && expansionData && (
                    <div className="expansion-overlay">
                        <div
                            className={`expanding-card ${expansionData.expanded ? 'expanded' : ''}`}
                            style={{
                                backgroundImage: `url(${expansionData.img})`,
                                top: expansionData.expanded ? 0 : expansionData.top,
                                left: expansionData.expanded ? 0 : expansionData.left,
                                width: expansionData.expanded ? '100%' : expansionData.width,
                                height: expansionData.expanded ? '100%' : expansionData.height,
                                opacity: expansionData.fade ? 0 : 1, // FAST FADE logic
                                transition: expansionData.fade
                                    ? 'opacity 0.4s ease, top 1.2s cubic-bezier(0.4, 0, 0.2, 1), left 1.2s cubic-bezier(0.4, 0, 0.2, 1), width 1.2s cubic-bezier(0.4, 0, 0.2, 1), height 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                    : 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        />
                    </div>
                )}

                <div className="container hero-content-wrapper">
                    <div className={`active-info ${isVisible ? 'visible' : ''}`}>
                        <h1>{activeBreed.titleSlug}</h1>
                        <p>{activeBreed.desc}</p>
                        <a href="/listings" className="btn-meet" onClick={(e) => { e.preventDefault(); navigateToBreed(activeBreed.id); }}>Meet Puppy</a>
                    </div>

                    <div className="card-slider-wrapper">
                        <div className="card-slider-container">
                            <div
                                className="card-slider"
                                style={{
                                    transform: isSliding
                                        ? (slideDir === 'next' ? 'translateX(-198px)' : 'translateX(198px)')
                                        : 'translateX(0)',
                                    transition: isSliding ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                                }}
                            >
                                {currentBreeds.slice(1).map((breed, idx) => (
                                    <div
                                        key={breed.id}
                                        className="breed-card"
                                        style={{
                                            backgroundImage: `url(${breed.card})`,
                                            opacity: (isExpanding && idx === 0) ? 0 : 1
                                        }}
                                        onClick={() => navigateToBreed(breed.id)}
                                    >
                                        <div className="card-name">🐾 {breed.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="slider-nav-mobile">
                            <div className="arrow arrow-left" onClick={prevSlide}>&#10094;</div>
                            <div className="arrow arrow-right" onClick={nextSlide}>&#10095;</div>
                        </div>
                    </div>
                </div>

                {/* Hero Navigation Controls */}
                <div className="hero-nav-footer container">
                    <div className="social-labels">
                        <a href="#" aria-label="Facebook" className="social-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="YouTube" className="social-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="social-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                    <div className="hero-tagline">FIND YOUR PAWFECT MATCH</div>
                    <div className="pagination">
                        {String(breeds.findIndex(b => b.id === activeBreed.id) + 1).padStart(2, '0')} / 15
                    </div>
                </div>
            </section>

            {/* Enhanced Trust Bar (PuppySpot Copy) */}
            <section className="trust-bar-premium">
                <div className="container trust-premium-grid">
                    <div className="trust-premium-item">
                        <span className="trust-icon">🚫🏭</span>
                        <div className="trust-premium-text">
                            <h3>No Puppy Mills</h3>
                            <p>Only vetted, responsible breeders.</p>
                        </div>
                    </div>
                    <div className="trust-premium-item">
                        <span className="trust-icon">🩺📜</span>
                        <div className="trust-premium-text">
                            <h3>Healthy Pups</h3>
                            <p>10-year health commitment.</p>
                        </div>
                    </div>
                    <div className="trust-premium-item">
                        <span className="trust-icon">✈️🏠</span>
                        <div className="trust-premium-text">
                            <h3>Safe Delivery</h3>
                            <p>Private travel network.</p>
                        </div>
                    </div>
                    <div className="trust-premium-item">
                        <span className="trust-icon">🤝❤️</span>
                        <div className="trust-premium-text">
                            <h3>Trusted</h3>
                            <p>220,000+ happy puppies placed.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Favorite Breeds Section */}
            <section className="favorite-breeds section-padding-lg">
                <div className="container">
                    <div className="section-header-centered">
                        <h2>Our customers' favorite breeds</h2>
                        <p>Let's find you a puppy you'll love.</p>
                    </div>
                    <div className="breeds-grid">
                        {favoriteBreeds.map(breed => (
                            <div key={breed.id} className="breed-item-circle">
                                <div className="breed-thumb">
                                    <img src={breed.image} alt={breed.name} />
                                </div>
                                <span>{breed.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-40">
                        <a href="/listings" className="btn btn-primary-outline">Browse All Breeds</a>
                    </div>
                </div>
            </section>

            {/* How it works Section */}
            <section className="how-it-works-alt section-padding-lg">
                <div className="container">
                    <div className="section-header-centered">
                        <h2>How it works</h2>
                        <p>Find Your PawFect Match</p>
                    </div>

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

                    <div className="text-center mt-60">
                        <a href="/how-it-works" className="btn-process-outline">Learn about our process</a>
                    </div>
                </div>
            </section>

            {/* Marketing Content: Where Puppy Love Begins */}
            <section className="marketing-love section-padding-lg">
                <div className="container marketing-grid">
                    <div className="marketing-content">
                        <span className="subtitle-brand">PAWFECT MATCH</span>
                        <h2>Where puppy love begins</h2>
                        <p>America's leading puppy placement service. Our mission is to make lives better by placing healthy puppies into happy homes.</p>
                        <ul className="brand-checks">
                            <li>✨ Comprehensive health guarantee</li>
                            <li>✨ Screened & verified breeders</li>
                            <li>✨ Independent health evaluations</li>
                        </ul>
                        <a href="/listings" className="btn btn-primary btn-lg">Browse All Puppies</a>
                    </div>
                    <div className="marketing-visual">
                        <div className="img-stack">
                            <img src={puppies[0]?.image || "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"} alt="Happy Puppy" className="main-img" />
                            <div className="img-accent-card">
                                <span>15,000+</span>
                                <p>Success Stories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section: Happy Tails */}
            <section className="happy-tails section-padding-lg">
                <div className="section-header-centered">
                    <h2>Happy Tails</h2>
                    <p>Real stories from real Pawfect Match families.</p>
                </div>
                <div className="marquee-container">
                    <div className="marquee-track">
                        {/* First set of reviews */}
                        <div className="reviews-carousel">
                            {reviews.map(review => (
                                <div key={`set1-${review.id}`} className="review-card-modern">
                                    <div className="stars">{"★".repeat(review.stars)}</div>
                                    <p className="review-text">"{review.text}"</p>
                                    <div className="reviewer">
                                        <img src={review.avatar} alt={review.author} />
                                        <div>
                                            <span className="author">{review.author}</span>
                                            <div className="reviewer-meta">
                                                <span className="location">📍 {review.location}</span>
                                                <span className="source">Verified Customer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Duplicate set for infinite scroll */}
                        <div className="reviews-carousel" aria-hidden="true">
                            {reviews.map(review => (
                                <div key={`set2-${review.id}`} className="review-card-modern">
                                    <div className="stars">{"★".repeat(review.stars)}</div>
                                    <p className="review-text">"{review.text}"</p>
                                    <div className="reviewer">
                                        <img src={review.avatar} alt={review.author} />
                                        <div>
                                            <span className="author">{review.author}</span>
                                            <div className="reviewer-meta">
                                                <span className="location">📍 {review.location}</span>
                                                <span className="source">Verified Customer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Derive dynamic favorite breeds from the actual puppy listings
const favoriteBreeds = Array.from(new Set(puppies.map(p => p.breed)))
    .slice(0, 8)
    .map((breedName, index) => {
        const representativePuppy = puppies.find(p => p.breed === breedName);
        return {
            id: index + 1,
            name: breedName,
            image: representativePuppy ? representativePuppy.image : 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&q=80'
        };
    });

const reviews = [
    { id: 1, author: 'The Johnson Family', location: 'California, US', stars: 5, text: 'Our kids haven\'t stopped smiling since Luna came home! The delivery was seamless, and she\'s simply the best addition to our family.', avatar: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=150&q=80' }, /* Family image */
    { id: 2, author: 'Michael Chen', location: 'London, UK', stars: 5, text: 'We were nervous about having a puppy delivered overseas, but the travel network was incredible. Cooper arrived happy and healthy.', avatar: 'https://i.pravatar.cc/150?img=11' }, /* Male image */
    { id: 3, author: 'Emily Davis', location: 'Texas, US', stars: 5, text: 'The 10-year health commitment gave us such peace of mind. Our Frenchie is the star of the neighborhood!', avatar: 'https://i.pravatar.cc/150?img=5' }, /* Female image */
    { id: 4, author: 'The Weber Household', location: 'Munich, Germany', stars: 5, text: 'My 6-year-old daughter is completely in love with our new Golden Retriever. The communication with the breeder was fantastic.', avatar: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=150&q=80' }, /* Dad/daughter family image */
    { id: 5, author: 'Jessica Smith', location: 'Florida, US', stars: 5, text: 'I couldn\'t be happier with the delivery process. Finding a vetted breeder was so easy with this platform.', avatar: 'https://i.pravatar.cc/150?img=20' }, /* Female image */
    { id: 6, author: 'Sophie Laurent', location: 'Paris, France', stars: 5, text: 'The communication was excellent. Our little Pomeranian is a dream come true for our family.', avatar: 'https://i.pravatar.cc/150?img=16' }, /* Female image */
    { id: 7, author: 'David & Thomas', location: 'New York, US', stars: 5, text: 'Highly recommend! The breeder provided regular updates and pictures of our boys\' new puppy until the day he arrived.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' }, /* Man in hat image */
    { id: 8, author: 'Elena Rossi', location: 'Rome, Italy', stars: 5, text: 'Such a professional service. The health checks and documentation were thorough and gave us great confidence.', avatar: 'https://i.pravatar.cc/150?img=9' } /* Female image */
];

// Derive featured puppies from actual listings (picking first 4)
const featuredPuppies = puppies.slice(0, 4).map(p => ({
    id: p.id,
    name: p.name,
    breed: p.breed,
    age: p.age,
    gender: p.gender,
    price: p.price,
    image: p.image
}));

export default Home;
