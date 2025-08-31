import React from 'react';
import GlassCard from '../common/GlassCard';
import { Achievement } from '../../types';
import { ChatIcon, ClipboardIcon, SparklesIcon } from '../common/Icons';

const achievements: Achievement[] = [
    { id: 'first-chat', title: 'Ice Breaker', description: 'Completed your first AI chat.', Icon: ChatIcon, unlocked: true },
    { id: 'first-assessment', title: 'First Step', description: 'Completed your first self-assessment.', Icon: ClipboardIcon, unlocked: true },
    { id: 'streak-7', title: 'Mindful Week', description: 'Checked in 7 days in a row.', Icon: SparklesIcon, unlocked: false }
];

const Achievements: React.FC = () => {
    const streakProgress = 4;
    const streakPercentage = (streakProgress / 7) * 100;
    const journeyProgress = 60;

  return (
    <GlassCard className="flex flex-col">
      <h2 className="text-xl font-semibold text-text-heading dark:text-dark-text-heading mb-4">Achievements & Rewards</h2>
      
        <div className="mb-4">
            <h3 className="font-semibold text-text-body dark:text-dark-text-body text-sm mb-1">Wellness Journey</h3>
            <div className="w-full bg-white/40 dark:bg-black/20 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-secondary to-accent h-2.5 rounded-full" style={{ width: `${journeyProgress}%` }}></div>
            </div>
        </div>

        <div className="mb-4">
            <h3 className="font-semibold text-text-body dark:text-dark-text-body text-sm mb-1">7-Day Check-in Streak</h3>
            <div className="w-full bg-white/40 dark:bg-black/20 rounded-full h-2.5">
                <div className="bg-accent h-2.5 rounded-full transition-all duration-500" style={{ width: `${streakPercentage}%` }}></div>
            </div>
            <p className="text-right text-xs text-text-muted dark:text-dark-text-muted mt-1">{streakProgress} / 7 days</p>
        </div>

      <h3 className="font-semibold text-text-body dark:text-dark-text-body text-sm mb-2">Badges</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        {achievements.map(ach => (
            <div key={ach.id} className={`p-2 flex flex-col items-center transition-opacity ${ach.unlocked ? 'opacity-100' : 'opacity-40'}`} title={ach.description}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${ach.unlocked ? 'bg-accent-light dark:bg-accent/30' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    <ach.Icon className="w-8 h-8 text-accent" />
                </div>
                <p className="text-xs font-semibold mt-2 text-text-body dark:text-dark-text-body">{ach.title}</p>
            </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/30 dark:border-dark-card-border text-center">
        <h3 className="font-semibold text-text-body dark:text-dark-text-body text-sm mb-1">Quote of the Day</h3>
        <p className="text-xs text-text-muted dark:text-dark-text-muted italic">"The best way to predict the future is to create it."</p>
      </div>
    </GlassCard>
  );
};

export default Achievements;