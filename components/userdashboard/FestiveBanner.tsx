import React, { useState, useEffect } from 'react';
import GlassCard from '../common/GlassCard';

interface Festival {
  name: string;
  greeting: string;
  emoji: string;
  month: number; // 0-11
  day: number;
}

// Note: Using approximate dates for demonstration purposes.
// A real-world app would use a proper holiday API or more complex date calculations.
const festivals: Festival[] = [
    { name: 'Holi', greeting: 'Happy Holi! Wishing you a day full of colors and joy.', emoji: '🎨', month: 2, day: 25 }, // March 25
    { name: 'Eid', greeting: 'Eid Mubarak! May this special day bring peace and happiness.', emoji: '🌙', month: 3, day: 10 }, // April 10
    { name: 'Diwali', greeting: 'Happy Diwali! May your path be filled with light and clarity.', emoji: '🪔', month: 10, day: 1 }, // November 1
];


const FestiveBanner: React.FC = () => {
    const [activeFestival, setActiveFestival] = useState<Festival | null>(null);

    useEffect(() => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        const festival = festivals.find(f => f.month === currentMonth && f.day === currentDay);
        if (festival) {
            setActiveFestival(festival);
        }
    }, []);

    if (!activeFestival) {
        return null;
    }

    return (
        <GlassCard className="mb-6 !bg-gradient-to-r from-accent to-warm-green text-white shadow-lg animate-fade-in">
            <div className="flex items-center space-x-4">
                <div className="text-4xl">{activeFestival.emoji}</div>
                <div>
                    <h2 className="font-bold text-lg">{activeFestival.name}</h2>
                    <p className="text-sm">{activeFestival.greeting}</p>
                </div>
            </div>
        </GlassCard>
    );
};

export default FestiveBanner;
