import React, { useState } from 'react';
import './Quiz.css';

const Quiz = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="quiz-page container section-padding">
            <div className="quiz-container">
                <div className="quiz-progress" style={{ width: `${(step / 4) * 100}%` }}></div>

                {step === 1 && (
                    <div className="quiz-step">
                        <h2>What best describes your living situation?</h2>
                        <div className="quiz-options grid grid-cols-2">
                            <button className="quiz-opt" onClick={() => setStep(2)}>Apartment</button>
                            <button className="quiz-opt" onClick={() => setStep(2)}>House with small yard</button>
                            <button className="quiz-opt" onClick={() => setStep(2)}>House with large yard</button>
                            <button className="quiz-opt" onClick={() => setStep(2)}>Farm/Acreage</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="quiz-step">
                        <h2>How active do you want your puppy to be?</h2>
                        <div className="quiz-options grid grid-cols-2">
                            <button className="quiz-opt" onClick={() => setStep(3)}>Couch Potato</button>
                            <button className="quiz-opt" onClick={() => setStep(3)}>Moderate (Daily Walks)</button>
                            <button className="quiz-opt" onClick={() => setStep(3)}>High (Running/Hiking)</button>
                            <button className="quiz-opt" onClick={() => setStep(3)}>Athlete (Competitive)</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="quiz-step">
                        <h2>Do you have children or other pets?</h2>
                        <div className="quiz-options grid grid-cols-2">
                            <button className="quiz-opt" onClick={() => setStep(4)}>Yes, children</button>
                            <button className="quiz-opt" onClick={() => setStep(4)}>Yes, other dogs/cats</button>
                            <button className="quiz-opt" onClick={() => setStep(4)}>Both</button>
                            <button className="quiz-opt" onClick={() => setStep(4)}>No children or pets</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="quiz-result">
                        <div className="success-icon">✨</div>
                        <h2>We found your Pawfect Match!</h2>
                        <p>Based on your lifestyle, we think you'd love a <strong>Goldendoodle</strong> or a <strong>Cavapoo</strong>.</p>
                        <a href="/listings" className="btn btn-primary">See Matches</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
