import React, { useState, useMemo } from 'react';
import './Listings.css';
import { puppies } from '../data/puppies';

const Listings = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [urlCategory, setUrlCategory] = useState(null);
    const [filters, setFilters] = useState({
        gender: [],
        age: [],
        breed: [],
        size: [],
        readyToTravel: [],
        lifestyle: []
    });
    const [currentPage, setCurrentPage] = useState(1);

    const handleCheckboxChange = (category, value) => {
        setFilters(prev => {
            const categoryFilters = [...prev[category]];
            if (categoryFilters.includes(value)) {
                return { ...prev, [category]: categoryFilters.filter(item => item !== value) };
            } else {
                return { ...prev, [category]: [...categoryFilters, value] };
            }
        });
    };

    const handleResetFilters = () => {
        setFilters({ gender: [], age: [], breed: [], size: [], readyToTravel: [], lifestyle: [] });
        setSearchQuery('');
        setUrlCategory(null);
        setCurrentPage(1);
    };

    // Read URL category once on mount and sync with lifestyle filters
    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const cat = searchParams.get('category');
        if (cat) {
            const normalizedCat = cat.toLowerCase();
            setUrlCategory(normalizedCat);

            const lifestyleMap = {
                'apartment': 'Apartment Dogs',
                'allergy': 'Allergy Friendly Dogs',
                'family': 'Family Dogs',
                'active': 'Active Dogs',
                'purebred': 'Pure Bred',
                'designer': 'Designer'
            };

            if (lifestyleMap[normalizedCat]) {
                setFilters(prev => ({
                    ...prev,
                    lifestyle: [lifestyleMap[normalizedCat]]
                }));
            }
        }
    }, []);

    // Reset to page 1 whenever filters or search query changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filters, searchQuery, urlCategory]);

    // Calculate age in weeks for filtering
    const getAgeInWeeks = (ageString) => {
        if (!ageString) return 0;
        const match = ageString.match(/(\d+)/);
        return match ? parseInt(match[0]) : 0;
    };

    const uniqueBreeds = useMemo(() => {
        const breeds = new Set(puppies.map(p => p.breed));
        return Array.from(breeds).sort();
    }, []);

    const filteredPuppies = useMemo(() => {
        return puppies.filter(puppy => {
            // Apply Lifestyle Filter (from sidebar or URL)
            const activeLifestyles = filters.lifestyle;
            if (activeLifestyles.length > 0) {
                const matchesLifestyle = activeLifestyles.some(lifestyle => {
                    if (lifestyle === 'Apartment Dogs') {
                        return ['French Bulldog', 'Cavalier King Charles Spaniel', 'Dachshund', 'Pomeranian', 'Yorkshire Terrier', 'Poodle'].includes(puppy.breed);
                    }
                    if (lifestyle === 'Allergy Friendly Dogs') {
                        return ['Poodle', 'Yorkshire Terrier'].includes(puppy.breed);
                    }
                    if (lifestyle === 'Family Dogs') {
                        return ['Golden Retriever', 'Labrador Retriever', 'Boxer', 'Cavalier King Charles Spaniel', 'Beagle', 'French Bulldog'].includes(puppy.breed);
                    }
                    if (lifestyle === 'Active Dogs') {
                        return ['German Shepherd', 'Siberian Husky', 'Rottweiler', 'Boxer', 'Labrador Retriever', 'Golden Retriever', 'Beagle'].includes(puppy.breed);
                    }
                    if (lifestyle === 'Pure Bred') {
                        return puppy.type === 'Purebred';
                    }
                    if (lifestyle === 'Designer') {
                        return puppy.type === 'Mix';
                    }
                    return true;
                });
                if (!matchesLifestyle) return false;
            }

            // Apply Gender Filter
            if (filters.gender.length > 0 && !filters.gender.includes(puppy.gender)) {
                return false;
            }

            // Apply Age Filter
            if (filters.age.length > 0) {
                const puppyAge = getAgeInWeeks(puppy.age);
                const matchesAge = filters.age.some(ageFilter => {
                    if (ageFilter === 'Up to 12 weeks' && puppyAge <= 12) return true;
                    if (ageFilter === '12 to 16 weeks' && puppyAge > 12 && puppyAge <= 16) return true;
                    if (ageFilter === '16 weeks & older' && puppyAge > 16) return true;
                    return false;
                });
                if (!matchesAge) return false;
            }

            // Apply Size Filter
            if (filters.size.length > 0 && !filters.size.includes(puppy.size)) {
                return false;
            }

            // Apply Ready To Travel Filter
            if (filters.readyToTravel.length > 0 && !filters.readyToTravel.includes(puppy.readyToTravel)) {
                return false;
            }

            // Apply Breed Search / Checkbox Filter
            if (filters.breed.length > 0) {
                if (!filters.breed.includes('All Breeds') && !filters.breed.includes(puppy.breed)) {
                    return false;
                }
            }

            // Apply specific text search constraint within the breed filter section
            if (searchQuery.trim() !== '') {
                const query = searchQuery.toLowerCase();
                const safeBreed = puppy.breed ? puppy.breed.toLowerCase() : '';
                const safeName = puppy.name ? puppy.name.toLowerCase() : '';

                if (!safeBreed.includes(query) && !safeName.includes(query)) {
                    return false;
                }
            }
            return true;
        });
    }, [filters, searchQuery, urlCategory]);

    const itemsPerPage = 20;
    const totalPages = Math.ceil(filteredPuppies.length / itemsPerPage);
    const currentPuppies = filteredPuppies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="listings-page-modern">
            <div className="container">
                <div className="page-header-modern">
                    <h1>
                        {filters.lifestyle.length === 1 ? filters.lifestyle[0] : 'Available puppies'}
                    </h1>
                    <p>Refine our {filteredPuppies.length} available puppies below to find your perfect match. Our complex breeding standards and 10-year health guarantee allow you to feel comfortable trusting us to find the ideal companion for your family. Happy searching, your new best friend is waiting!</p>
                </div>

                <div className="listings-layout-modern">
                    {/* Sidebar Filters */}
                    <aside className="filters-sidebar-modern">
                        <div className="sidebar-header">
                            <h2>Refine By</h2>
                            <button className="clear-btn" onClick={handleResetFilters}>Clear</button>
                        </div>

                        <div className="filter-group-modern">
                            <h3 className="filter-title">Lifestyle <span className="expand-icon">−</span></h3>
                            <div className="checkbox-group">
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.lifestyle.includes('Apartment Dogs')} onChange={() => handleCheckboxChange('lifestyle', 'Apartment Dogs')} /><span className="checkmark"></span>Apartment Dogs</label>
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.lifestyle.includes('Allergy Friendly Dogs')} onChange={() => handleCheckboxChange('lifestyle', 'Allergy Friendly Dogs')} /><span className="checkmark"></span>Allergy Friendly Dogs</label>
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.lifestyle.includes('Family Dogs')} onChange={() => handleCheckboxChange('lifestyle', 'Family Dogs')} /><span className="checkmark"></span>Family Dogs</label>
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.lifestyle.includes('Active Dogs')} onChange={() => handleCheckboxChange('lifestyle', 'Active Dogs')} /><span className="checkmark"></span>Active Dogs</label>
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.lifestyle.includes('Pure Bred')} onChange={() => handleCheckboxChange('lifestyle', 'Pure Bred')} /><span className="checkmark"></span>Pure Bred</label>
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.lifestyle.includes('Designer')} onChange={() => handleCheckboxChange('lifestyle', 'Designer')} /><span className="checkmark"></span>Designer</label>
                            </div>
                        </div>

                        <div className="filter-group-modern">
                            <h3 className="filter-title">Gender <span className="expand-icon">−</span></h3>
                            <div className="checkbox-group">
                                <label className="custom-checkbox">
                                    <input type="checkbox" checked={filters.gender.includes('Male')} onChange={() => handleCheckboxChange('gender', 'Male')} />
                                    <span className="checkmark"></span>
                                    Male
                                </label>
                                <label className="custom-checkbox">
                                    <input type="checkbox" checked={filters.gender.includes('Female')} onChange={() => handleCheckboxChange('gender', 'Female')} />
                                    <span className="checkmark"></span>
                                    Female
                                </label>
                            </div>
                        </div>

                        <div className="filter-group-modern">
                            <h3 className="filter-title">Age <span className="expand-icon">−</span></h3>
                            <div className="checkbox-group">
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.age.includes('Up to 12 weeks')} onChange={() => handleCheckboxChange('age', 'Up to 12 weeks')} /><span className="checkmark"></span>Up to 12 weeks</label>
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.age.includes('12 to 16 weeks')} onChange={() => handleCheckboxChange('age', '12 to 16 weeks')} /><span className="checkmark"></span>12 to 16 weeks</label>
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.age.includes('16 weeks & older')} onChange={() => handleCheckboxChange('age', '16 weeks & older')} /><span className="checkmark"></span>16 weeks & older</label>
                            </div>
                        </div>

                        <div className="filter-group-modern">
                            <h3 className="filter-title">Breed <span className="expand-icon">−</span></h3>
                            <div className="search-input-wrapper">
                                <input type="text" placeholder="Search..." className="filter-search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <div className="checkbox-group scrollable">
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.breed.includes('All Breeds') || filters.breed.length === 0} onChange={() => setFilters(prev => ({ ...prev, breed: [] }))} /><span className="checkmark"></span>All Breeds</label>
                                {uniqueBreeds.map(breed => (
                                    <label key={breed} className="custom-checkbox"><input type="checkbox" checked={filters.breed.includes(breed)} onChange={() => handleCheckboxChange('breed', breed)} /><span className="checkmark"></span>{breed}</label>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group-modern">
                            <h3 className="filter-title">Size <span className="expand-icon">−</span></h3>
                            <div className="checkbox-group">
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.size.includes('Small')} onChange={() => handleCheckboxChange('size', 'Small')} /><span className="checkmark"></span>Small</label>
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.size.includes('Medium')} onChange={() => handleCheckboxChange('size', 'Medium')} /><span className="checkmark"></span>Medium</label>
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.size.includes('Large')} onChange={() => handleCheckboxChange('size', 'Large')} /><span className="checkmark"></span>Large</label>
                            </div>
                        </div>

                        <div className="filter-group-modern">
                            <h3 className="filter-title">Ready To Travel <span className="expand-icon">−</span></h3>
                            <div className="checkbox-group">
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.readyToTravel.includes('Yes')} onChange={() => handleCheckboxChange('readyToTravel', 'Yes')} /><span className="checkmark"></span>Yes</label>
                                <label className="custom-checkbox"><input type="checkbox" checked={filters.readyToTravel.includes('No')} onChange={() => handleCheckboxChange('readyToTravel', 'No')} /><span className="checkmark"></span>No</label>
                            </div>
                        </div>
                    </aside>

                    {/* Listings Grid */}
                    <div className="listings-main-modern">
                        <div className="listings-toolbar">
                            <div className="sort-dropdown-modern">
                                Sort by: <b>Recommended</b> <span className="dropdown-arrow">▼</span>
                            </div>
                        </div>

                        {currentPuppies.length > 0 ? (
                            <div className="puppy-grid-modern">
                                {currentPuppies.map(puppy => (
                                    <a href={`/profile/${puppy.id}`} key={puppy.id} className="puppy-card-modern">
                                        <div className="puppy-image-wrapper">
                                            <img src={puppy.image} alt={puppy.name} />
                                            <div className="puppy-media-icons">
                                                {puppy.photos > 0 && <span className="media-badge">📷 {puppy.photos}</span>}
                                                {puppy.videos > 0 && <span className="media-badge">🎥 {puppy.videos}</span>}
                                            </div>
                                            {puppy.exclusive && <div className="exclusive-badge">PuppySpot Exclusive</div>}
                                        </div>
                                        <div className="puppy-info-modern">
                                            <div className="puppy-info-text">
                                                <h3>{puppy.name}</h3>
                                                <p className="puppy-breed">{puppy.breed}</p>
                                                <p className="puppy-age">{puppy.age} {puppy.gender && `• ${puppy.gender}`}</p>
                                            </div>
                                            <button className="favorite-btn" aria-label="Favorite" onClick={(e) => { e.preventDefault(); }}>
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                            </button>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderRadius: '12px', border: '1px dashed #ccc' }}>
                                <h3 style={{ marginBottom: '12px' }}>No puppies available matching your criteria</h3>
                                <p style={{ color: '#666', marginBottom: '20px' }}>Try adjusting your filters or checking back later for new arrivals.</p>
                                <button className="btn btn-primary" onClick={handleResetFilters}>Clear All Filters</button>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="pagination-wrapper">
                                <button className="page-btn nav-btn" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>{'<'}</button>
                                {[...Array(totalPages)].map((_, idx) => {
                                    const pageNumber = idx + 1;
                                    if (totalPages > 7) {
                                        if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                                            return <button key={pageNumber} className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`} onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</button>;
                                        } else if (pageNumber === 2 || pageNumber === totalPages - 1) {
                                            return <span key={pageNumber} className="page-ellipsis">...</span>;
                                        }
                                        return null;
                                    }
                                    return <button key={pageNumber} className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`} onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</button>;
                                })}
                                <button className="page-btn nav-btn" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>{'>'}</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Featured by Lifestyle */}
                <div className="lifestyle-section">
                    <h2>Featured by lifestyle</h2>
                    <p>Discover our breeds that match your unique lifestyle.</p>
                    <div className="lifestyle-grid">
                        <a href="/listings?category=family" className="lifestyle-item">
                            <div className="lifestyle-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Family friendly" />
                            </div>
                            <span>Family friendly</span>
                        </a>
                        <a href="/listings?category=apartment" className="lifestyle-item">
                            <div className="lifestyle-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Best apartment breeds" />
                            </div>
                            <span>Best apartment breeds</span>
                        </a>
                        <a href="/listings?category=teacup" className="lifestyle-item">
                            <div className="lifestyle-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1594136905280-973174403c98?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Teacup breeds" />
                            </div>
                            <span>Teacup breeds</span>
                        </a>
                        <a href="/listings?category=active" className="lifestyle-item">
                            <div className="lifestyle-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Best for the beach" />
                            </div>
                            <span>Best for the beach</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listings;
