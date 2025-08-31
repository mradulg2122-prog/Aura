import React, { useState, useEffect } from 'react';
import { SparklesIcon, BookIcon, CalendarIcon, ChatIcon, UsersIcon, PhoneIcon } from '../common/Icons';

const icons = [SparklesIcon, BookIcon, CalendarIcon, ChatIcon, UsersIcon, PhoneIcon];
const cardPairs = [...icons, ...icons].sort(() => Math.random() - 0.5);

const MemoryMatch: React.FC = () => {
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (flipped.length === 2) {
            setIsChecking(true);
            const [firstIndex, secondIndex] = flipped;
            const CardOne = cardPairs[firstIndex];
            const CardTwo = cardPairs[secondIndex];

            if (CardOne === CardTwo) {
                setMatched(prev => [...prev, firstIndex, secondIndex]);
            }

            setTimeout(() => {
                setFlipped([]);
                setIsChecking(false);
            }, 1000);
        }
    }, [flipped]);

    const handleFlip = (index: number) => {
        if (isChecking || flipped.includes(index) || matched.includes(index)) {
            return;
        }
        setFlipped(prev => [...prev, index]);
    };

    const isFlipped = (index: number) => flipped.includes(index) || matched.includes(index);
    const isComplete = matched.length === cardPairs.length;

    return (
        <div className="flex flex-col items-center p-4">
             <h3 className="text-lg font-semibold text-text-body mb-4">Find all the matching pairs!</h3>
             <div className="grid grid-cols-4 gap-4">
                {cardPairs.map((CardComponent, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleFlip(index)}
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center transition-transform duration-300 ${isFlipped(index) ? '[transform:rotateY(180deg)]' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                        disabled={isChecking}
                    >
                       <div className="absolute w-full h-full bg-gradient-to-br from-primary-light to-secondary/50 dark:from-dark-card-bg dark:to-accent/30 rounded-lg [backface-visibility:hidden]"></div>
                       <div className="absolute w-full h-full bg-white/80 rounded-lg flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                         <CardComponent className="w-10 h-10 text-accent" />
                       </div>
                    </button>
                ))}
             </div>
             {isComplete && <p className="mt-6 text-accent font-bold text-xl">Well Done!</p>}
        </div>
    );
};

export default MemoryMatch;