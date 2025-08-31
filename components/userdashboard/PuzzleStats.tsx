import React, { useState, useEffect } from 'react';
import GlassCard from '../common/GlassCard';
import { PuzzleIcon } from '../common/Icons';

const PuzzleStats: React.FC = () => {
    const [streak, setStreak] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isCompleteToday, setIsCompleteToday] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateStats = () => {
            const progressData = JSON.parse(localStorage.getItem('auraPuzzleProgress') || '{}');
            const streakData = JSON.parse(localStorage.getItem('auraPuzzleStreak') || '{}');
            
            const today = new Date().toDateString();

            if (progressData.date === today) {
                const currentProgress = progressData.count || 0;
                setProgress(currentProgress);
                setIsCompleteToday(currentProgress >= 5);
            } else {
                setProgress(0);
                setIsCompleteToday(false);
            }

            if (streakData.lastPlayedDate) {
                const lastPlayed = new Date(streakData.lastPlayedDate);
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                
                if(lastPlayed.toDateString() === today || lastPlayed.toDateString() === yesterday.toDateString()) {
                    setStreak(streakData.count || 0);
                } else {
                    setStreak(0);
                }
            } else {
                setStreak(0);
            }
        };

        updateStats();
        window.addEventListener('storage', updateStats);
        
        return () => window.removeEventListener('storage', updateStats);

    }, []);
    
    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | null = null;
        if (isCompleteToday) {
            timer = setInterval(() => {
                const now = new Date();
                const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                const diff = tomorrow.getTime() - now.getTime();

                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                
                setTimeLeft(`${hours}h ${minutes}m`);
            }, 1000 * 60); // Update every minute
            
            // Initial calculation
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const diff = tomorrow.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft(`${hours}h ${minutes}m`);
        }
        
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isCompleteToday]);
    
    const progressPercentage = (progress / 5) * 100;

    return (
        <GlassCard>
            <div className="flex items-center gap-3 mb-4">
                <PuzzleIcon className="w-6 h-6 text-accent"/>
                <h2 className="text-xl font-semibold text-text-heading dark:text-dark-text-heading">Puzzle Relaxer Stats</h2>
            </div>

            {streak > 0 && (
                <div className="text-center bg-white/40 dark:bg-black/20 p-2 rounded-lg mb-4">
                     <p className="font-bold text-lg text-accent">🔥 {streak}-Day Streak!</p>
                </div>
            )}
            
            {isCompleteToday ? (
                <div className="text-center">
                    <p className="font-semibold text-text-body dark:text-dark-text-body">You've completed today's puzzles!</p>
                    <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">New puzzles available in <span className="font-bold text-accent">{timeLeft}</span></p>
                </div>
            ) : (
                <div>
                    <h3 className="font-semibold text-text-body dark:text-dark-text-body text-sm mb-1">Today's Progress</h3>
                    <div className="w-full bg-white/40 dark:bg-black/20 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-secondary to-accent h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <p className="text-right text-xs text-text-muted dark:text-dark-text-muted mt-1">{progress} / 5 completed</p>
                </div>
            )}
        </GlassCard>
    );
};

export default PuzzleStats;