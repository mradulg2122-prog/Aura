import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { Session } from '../../types';
import { XIcon } from '../common/Icons';

interface FeedbackModalProps {
    session: Session;
    onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ session, onClose }) => {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        console.log(`Feedback submitted for session ${session.id}: ${rating} stars.`);
        setSubmitted(true);
        setTimeout(onClose, 2000); // Close modal after 2 seconds
    };

    return (
        <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <GlassCard className="w-11/12 max-w-md p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-text-heading">Session Feedback</h2>
                    <button onClick={onClose}><XIcon/></button>
                </div>
                
                {submitted ? (
                    <div className="text-center p-8">
                        <p className="text-2xl mb-2">✅</p>
                        <p className="font-semibold text-text-body">Thank you for your feedback!</p>
                    </div>
                ) : (
                    <>
                        <p className="text-text-body text-center mb-4">
                            How would you rate your recent session with <span className="font-semibold">{session.counselor.name}</span>?
                        </p>
                        <div className="flex justify-center items-center text-4xl mb-6">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    onMouseEnter={() => setRating(star)}
                                    onClick={() => setRating(star)}
                                    className={`transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={handleSubmit} 
                            disabled={rating === 0}
                            className="w-full bg-accent text-white font-bold py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
                        >
                            Submit Rating
                        </button>
                    </>
                )}
            </GlassCard>
        </div>
    );
};

export default FeedbackModal;