import React from 'react';
import GlassCard from '../common/GlassCard';
import { BookIcon, PuzzleIcon, SparklesIcon } from '../common/Icons';

const ResourceUsage: React.FC = () => {
  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-text-heading mb-4">Resources & Games</h2>

      <div className="mb-4">
        <h3 className="font-semibold text-text-body text-sm mb-2">Game Stats</h3>
        <div className="bg-white/40 p-3 rounded-lg text-sm text-text-body flex justify-around">
            <div><p className="font-bold">45 min</p><p className="text-xs">Time Played</p></div>
            <div><p className="font-bold">3 days</p><p className="text-xs">Longest Streak</p></div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold text-text-body text-sm mb-2">Recently Accessed</h3>
        <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3"><BookIcon className="w-4 h-4 text-accent"/> Introduction to Mindfulness</li>
            <li className="flex items-center gap-3"><PuzzleIcon className="w-4 h-4 text-accent"/> Puzzle Relaxer Game</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-text-body text-sm mb-2">Recommended For You</h3>
         <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3"><SparklesIcon className="w-4 h-4 text-accent"/> Memory Match Game</li>
        </ul>
      </div>

    </GlassCard>
  );
};

export default ResourceUsage;