import React from 'react';
import './Essentials.css';

const Essentials = () => {
    const categories = [
        {
            title: 'Premium Nutrition',
            items: [
                { name: 'Puppy Growth Kibble', desc: 'High-protein formula for strong development.', cta: 'Get Your Puppies Treats' },
                { name: 'Stainless Steel Bowls', desc: 'Durable, non-slip feeding solutions.', cta: 'Get Puppy Products' }
            ]
        },
        {
            title: 'Comfort & Style',
            items: [
                { name: 'Weather-Ready Sweaters', desc: 'Soft knits for chilly morning walks.', cta: 'Get Puppy Products' },
                { name: 'Adjustable Harnesses', desc: 'Secure fit for exploring the world.', cta: 'Get Puppy Products' }
            ]
        },
        {
            title: 'Bath & Grooming',
            items: [
                { name: 'Gentle Tear-Free Shampoo', desc: 'Hypoallergenic formulas for sensitive skin.', cta: 'Get Puppy Products' },
                { name: 'Soft-Bristle Brushes', desc: 'Keep their coat shiny and tangle-free.', cta: 'Get Puppy Products' }
            ]
        },
        {
            title: 'Health & Hygiene',
            items: [
                { name: 'Dental Care Kits', desc: 'Keep target smiles bright and healthy.', cta: 'Get Puppy Products' },
                { name: 'Organic Puppy Treats', desc: 'Perfect for reward-based training.', cta: 'Get Your Puppies Treats' }
            ]
        }
    ];

    return (
        <div className="essentials-page">
            <div className="hero-section essentials-hero">
                <div className="container">
                    <h1>Puppy Essentials</h1>
                    <p>Everything you need to give your new best friend the perfect start. Curated by experts for quality and comfort.</p>
                </div>
            </div>

            <div className="container">
                <div className="essentials-grid">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="essentials-category">
                            <h2>{cat.title}</h2>
                            <div className="items-row">
                                {cat.items.map((item, i) => (
                                    <div key={i} className="essential-card">
                                        <div className="card-image-placeholder">
                                            <span className="icon">📦</span>
                                        </div>
                                        <div className="card-content">
                                            <h3>{item.name}</h3>
                                            <p>{item.desc}</p>
                                            <button className="cta-button">{item.cta}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Essentials;
