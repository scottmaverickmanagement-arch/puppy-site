import React from 'react';
import './Services.css';

const Services = () => {
    const serviceGroups = [
        {
            title: 'Professional Care',
            services: [
                { name: 'Veterinary Network', desc: 'Access to top-rated vets for exams and vaccinations.', icon: '🏥', cta: 'Find a Vet' },
                { name: 'Elite Grooming', desc: 'Pamper your puppy with sanitary trims and spa baths.', icon: '✂️', cta: 'Hire a Groomer' }
            ]
        },
        {
            title: 'Training Programs',
            services: [
                { name: 'Puppy Socialization', desc: 'Critical early-stage exposure for a well-adjusted dog.', icon: '🐕', cta: 'Hire a Dog Trainer' },
                { name: 'Core Obedience', desc: 'Mastering sit, stay, and leash walking with pros.', icon: '🎓', cta: 'Hire a Dog Trainer' },
                { name: 'Crate & House Training', desc: 'Establishing stress-free routines for your home.', icon: '🏠', cta: 'Hire a Dog Trainer' }
            ]
        },
        {
            title: 'Safety & Support',
            services: [
                { name: 'Premium Boarding', desc: 'Safe, secure, and fun environment while you are away.', icon: '🏨', cta: 'Book Boarding' },
                { name: 'Health Insurance', desc: 'Peace of mind for unexpected medical adventures.', icon: '🛡️', cta: 'Get a Quote' }
            ]
        }
    ];

    return (
        <div className="services-page">
            <div className="hero-section services-hero">
                <div className="container">
                    <h1>Puppy Services</h1>
                    <p>Expert support at every stage of your puppy's journey. From health to training, we've got you covered.</p>
                </div>
            </div>

            <div className="container">
                <div className="services-list">
                    {serviceGroups.map((group, idx) => (
                        <section key={idx} className="service-group">
                            <h2>{group.title}</h2>
                            <div className="services-grid-modern">
                                {group.services.map((service, i) => (
                                    <div key={i} className="service-card-modern">
                                        <div className="service-icon-bg">{service.icon}</div>
                                        <div className="service-info-modern">
                                            <h3>{service.name}</h3>
                                            <p>{service.desc}</p>
                                            <button className="service-cta">{service.cta}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
