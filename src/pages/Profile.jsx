import React, { useState, useEffect } from 'react';
import './Profile.css';
import { puppies } from '../data/puppies';

const Profile = () => {
    const [puppy, setPuppy] = useState(null);

    useEffect(() => {
        // Extract ID from URL path (e.g., /profile/42 -> 42)
        const pathParts = window.location.pathname.split('/');
        const idPath = pathParts[pathParts.length - 1];
        const id = parseInt(idPath, 10);

        const found = puppies.find(p => p.id === id);
        if (found) {
            setPuppy(found);
        } else {
            // Fallback for demo if direct navigation happens without ID
            setPuppy(puppies[0]);
        }
    }, []);

    if (!puppy) return <div className="loading-screen">Loading purebred magic...</div>;

    const dummyImages = [
        puppy.image,
        puppy.image,
        puppy.image
    ];

    return (
        <div className="profile-page container section-padding">
            <div className="breadcrumb">
                <a href="/">Home</a> <span>/</span> <a href="/listings">Purebred</a> <span>/</span> <span>{puppy.name}</span>
            </div>

            <div className="profile-layout">
                {/* Image Gallery */}
                <div className="profile-images">
                    <div className="main-image">
                        <img src={dummyImages[0]} alt={puppy.name} />
                    </div>
                    <div className="thumbnail-grid">
                        {dummyImages.map((img, idx) => (
                            <img key={idx} src={img} alt={`${puppy.name} thumb ${idx}`} />
                        ))}
                    </div>
                </div>

                {/* Puppy Info UI strictly matching screenshot */}
                <div className="profile-info-aside">
                    <div className="info-header-top">
                        <h1>{puppy.name}</h1>
                        <span className="price-tag-large">{puppy.price}</span>
                    </div>

                    <div className="breed-badge-wrapper">
                        <span className="breed-pill-orange">{puppy.breed}</span>
                    </div>

                    <div className="quick-stats-grid">
                        <div className="stat-card">
                            <span className="stat-lbl text-xs tracking-widest text-gray-400 font-bold uppercase mb-1 block text-center">Gender</span>
                            <span className="stat-val font-semibold text-gray-800 text-center block">{puppy.gender}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-lbl text-xs tracking-widest text-gray-400 font-bold uppercase mb-1 block text-center">Age</span>
                            <span className="stat-val font-semibold text-gray-800 text-center block">{puppy.age}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-lbl text-xs tracking-widest text-gray-400 font-bold uppercase mb-1 block text-center">Location</span>
                            <span className="stat-val font-semibold text-gray-800 text-center block">Austin, TX</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-lbl text-xs tracking-widest text-gray-400 font-bold uppercase mb-1 block text-center">Status</span>
                            <span className="stat-val font-semibold text-green-600 tracking-wide text-center block">Available</span>
                        </div>
                    </div>

                    <div className="action-button-group">
                        <button className="btn btn-reserve w-full">Reserve {puppy.name} Now</button>
                        <button className="btn btn-inquire w-full">Inquire About This Puppy</button>
                    </div>

                    <div className="trust-badges-bottom">
                        <div className="tb-item"><span className="tb-icon text-green-500">☑</span> <span>Vet<br />Checked</span></div>
                        <div className="tb-item"><span className="tb-icon text-blue-500">🛡️</span> <span>10yr Health<br />Guarantee</span></div>
                        <div className="tb-item"><span className="tb-icon text-indigo-400">✈️</span> <span>Travel<br />Available</span></div>
                    </div>
                </div>
            </div>

            {/* Detailed Content */}
            <div className="profile-details-grid">
                <div className="details-section">
                    <h2>About {puppy.name}</h2>
                    <p>Meet {puppy.name}, a spirited and affectionate {puppy.breed} puppy. Looking for a perfect balance of playful energy and loving cuddles, {puppy.name} is ready to join their forever home. With their soft {puppy.type === 'Purebred' ? 'beautiful' : 'unique'} coat and bright eyes, they're sure to steal your heart.</p>
                </div>

                <div className="details-section">
                    <h2>Breed Information</h2>
                    <p> The {puppy.breed} is a highly sought after {puppy.type.toLowerCase()} known for exceptional intelligence, loyalty, and companionship. Adapts well to family environments and maintains a friendly disposition towards guests and other household pets.</p>
                </div>

                <div className="details-section">
                    <h2>Health Background</h2>
                    <p>Vet checked, dewormed, up-to-date on shots. Microchipped for safety.</p>
                </div>

                <div className="details-section">
                    <h2>Breeder Standards</h2>
                    <p>Raised by <strong>Heritage Paws Club (Vetted & Certified)</strong>. All our breeders are personally visited and must pass a 47-point inspection process and abide by strict ethical breeding constraints.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
