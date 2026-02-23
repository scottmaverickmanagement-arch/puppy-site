import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Profile from './pages/Profile'
import Quiz from './pages/Quiz'
import BreedDetail from './pages/BreedDetail'
import Promise from './pages/Promise'
import HowItWorks from './pages/HowItWorks'
import Essentials from './pages/Essentials'
import Services from './pages/Services'
import './index.css'

function App() {
    const [page, setPage] = useState('home');

    // Simple router based on URL hash or path
    useEffect(() => {
        const handleNavigation = () => {
            const path = window.location.pathname;
            if (path === '/listings') setPage('listings');
            else if (path.startsWith('/profile')) setPage('profile');
            else if (path.startsWith('/breed')) setPage('breed');
            else if (path === '/quiz') setPage('quiz');
            else if (path === '/promise') setPage('promise');
            else if (path === '/how-it-works') setPage('how-it-works');
            else if (path === '/shop/essentials') setPage('essentials');
            else if (path === '/shop/services') setPage('services');
            else setPage('home');
        };

        window.addEventListener('popstate', handleNavigation);

        // Intercept clicks on internal links
        const handleLinkClick = (e) => {
            const link = e.target.closest('a');
            if (link && link.href.startsWith(window.location.origin)) {
                const url = new URL(link.href);
                const path = url.pathname;
                // Basic check for internal links
                if (path === '/' || path === '/listings' || path.startsWith('/profile') || path === '/quiz' || path === '/promise' || path === '/how-it-works' || path === '/shop/essentials' || path === '/shop/services' || path.startsWith('/breed')) {
                    e.preventDefault();
                    window.history.pushState({}, '', path);
                    handleNavigation();
                    window.scrollTo(0, 0);
                }
            }
        };

        document.addEventListener('click', handleLinkClick);
        handleNavigation(); // Initial load

        return () => {
            window.removeEventListener('popstate', handleNavigation);
            document.removeEventListener('click', handleLinkClick);
        };
    }, []);

    return (
        <div className="app">
            <Header />
            <main>
                {page === 'home' && <Home />}
                {page === 'listings' && <Listings />}
                {page === 'profile' && <Profile />}
                {page === 'quiz' && <Quiz />}
                {page === 'breed' && <BreedDetail />}
                {page === 'promise' && <Promise />}
                {page === 'how-it-works' && <HowItWorks />}
                {page === 'essentials' && <Essentials />}
                {page === 'services' && <Services />}
            </main>
            <Footer />
        </div>
    )
}

export default App
