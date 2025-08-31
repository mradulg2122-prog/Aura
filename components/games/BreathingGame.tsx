import React, { useState, useEffect } from 'react';

const BreathingGame: React.FC = () => {
    const [text, setText] = useState('Get Ready...');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setText('Inhale');
            const interval = setInterval(() => {
                setText(prev => prev === 'Inhale' ? 'Exhale' : 'Inhale');
            }, 5000); // Corresponds to the animation duration
            return () => clearInterval(interval);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-80 md:h-96 w-full bg-gradient-to-br from-bg-start to-bg-end dark:from-dark-bg-start dark:to-dark-bg-end rounded-lg">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                <div className="absolute inset-0 bg-white/40 rounded-full animate-breathe"></div>
                <div className="absolute inset-2 bg-white/60 rounded-full animate-breathe [animation-delay:-0.2s]"></div>
                <span className="relative text-3xl font-semibold text-text-heading dark:text-dark-text-heading tracking-widest uppercase">{text}</span>
            </div>
        </div>
    );
};

export default BreathingGame;