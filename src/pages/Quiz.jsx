import React, { useState, useEffect } from 'react';
import { puppies } from '../data/puppies';
import './Quiz.css';

const Quiz = () => {
    const [step, setStep] = useState(0); // 0 is start
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const questions = [
        {
            id: 'living',
            question: "What's your living situation like?",
            options: [
                { label: 'Apartment / Urban', icon: '🏢', value: 'Small' },
                { label: 'Suburban House', icon: '🏡', value: 'Medium' },
                { label: 'House with Acreage', icon: '🌳', value: 'Large' },
                { label: 'Farm / Rural', icon: '🚜', value: 'Large' }
            ]
        },
        {
            id: 'activity',
            question: "How active is your lifestyle?",
            options: [
                { label: 'Relaxed (Couch Potato)', icon: '🛋️', value: 'relaxed' },
                { label: 'Moderate (Daily Walks)', icon: '🚶', value: 'moderate' },
                { label: 'Active (Hiking/Running)', icon: '🏃', value: 'active' },
                { label: 'Intense (Athlete)', icon: '🚵', value: 'intense' }
            ]
        },
        {
            id: 'patience',
            question: "How much time for grooming/care?",
            options: [
                { label: 'Low Maintenance', icon: '🛁', value: 'low' },
                { label: 'Moderate Care', icon: '✂️', value: 'mid' },
                { label: 'High Maintenance', icon: '🐩', value: 'high' }
            ]
        }
    ];

    const handleOption = (val) => {
        const newAnswers = { ...answers, [questions[step - 1].id]: val };
        setAnswers(newAnswers);

        if (step < questions.length) {
            setStep(step + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers) => {
        // Simple heuristic: filter by size first
        let matches = puppies.filter(p => p.size === finalAnswers.living);

        // If no direct size match, just pick from all
        if (matches.length === 0) matches = puppies;

        // Shuffle and pick 1
        const randomMatch = matches[Math.floor(Math.random() * matches.length)];
        setResult(randomMatch);
        setStep(questions.length + 1);
    };

    const restart = () => {
        setStep(0);
        setAnswers({});
        setResult(null);
    };

    return (
        <div className="quiz-page">
            <div className="quiz-bg-overlay"></div>

            <div className="container">
                <div className="quiz-wrapper">
                    {step === 0 && (
                        <div className="quiz-intro-card">
                            <span className="quiz-badge">Find Your Sole Mate</span>
                            <h1>Let's Find Your Pawfect Match</h1>
                            <p>Answer a few lifestyle questions and we'll scan our 500+ vetted listings to find the puppy that fits your soul.</p>
                            <button className="btn-quiz-start" onClick={() => setStep(1)}>
                                Start My Journey
                            </button>
                        </div>
                    )}

                    {step > 0 && step <= questions.length && (
                        <div className="quiz-step-card">
                            <div className="quiz-header">
                                <div className="progress-container">
                                    <div className="progress-bar" style={{ width: `${(step / questions.length) * 100}%` }}></div>
                                </div>
                                <span className="step-indicator">Question {step} of {questions.length}</span>
                            </div>

                            <h2>{questions[step - 1].question}</h2>

                            <div className="quiz-grid">
                                {questions[step - 1].options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        className="quiz-card-opt"
                                        onClick={() => handleOption(opt.value)}
                                    >
                                        <span className="opt-icon">{opt.icon}</span>
                                        <span className="opt-label">{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step > questions.length && result && (
                        <div className="quiz-result-card">
                            <div className="result-header">
                                <div className="confetti-icon">✨</div>
                                <h2>It's a Match!</h2>
                                <p>Based on your lifestyle, meet your prospective new family member:</p>
                            </div>

                            <div className="match-showcase">
                                <div className="match-image">
                                    <img src={result.image} alt={result.name} />
                                    <div className="match-tag">Top Recommendation</div>
                                </div>
                                <div className="match-details">
                                    <h3>{result.name} the {result.breed}</h3>
                                    <div className="match-meta">
                                        <span>📍 {result.gender} • {result.age}</span>
                                        <span className="match-price">{result.price}</span>
                                    </div>
                                    <p className="match-desc">
                                        {result.name} is a sweet {result.breed} who is perfect for {answers.living.toLowerCase()} living.
                                        {result.readyToTravel === 'Yes' ? ' Ready to travel home to you today!' : ' Currently being socialized and ready soon.'}
                                    </p>
                                    <div className="match-actions">
                                        <a href="/listings" className="btn-match-view">Meet {result.name}</a>
                                        <button className="btn-restart" onClick={restart}>Try Again</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
