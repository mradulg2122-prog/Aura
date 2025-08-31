import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { MoodEntry } from '../../types';
// Fix: Removed incorrect TooltipProps from the main 'recharts' import.
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
// Fix: Import `ValueType`, `NameType`, and the correct `TooltipProps` for robust custom tooltip typing.
// The `TooltipProps` for the `content` prop must be imported from this specific path.
// Fix: The 'TooltipProps' type from this path was likely renamed to 'DefaultTooltipContentProps' in a 'recharts' update.
// This change imports 'DefaultTooltipContentProps' and aliases it as 'TooltipProps' to resolve the type error.
// Fix: Corrected the imported type name from `DefaultTooltipContentProps` to `DefaultTooltipContent` as suggested by the type error.
import { ValueType, NameType, DefaultTooltipContent as TooltipProps } from 'recharts/types/component/DefaultTooltipContent';

const generateMoodData = (days: number): MoodEntry[] => {
    return Array.from({ length: days }, (_, i) => ({
        date: `Day ${i + 1}`,
        mood: Math.floor(Math.random() * 5) + 1,
    }));
};

const moodData7d = generateMoodData(7).map((d, i) => ({...d, date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}));
const moodData30d = generateMoodData(30);


const moodEmojis = [
    { mood: 1, emoji: '😞', label: 'Awful' },
    { mood: 2, emoji: '😟', label: 'Bad' },
    { mood: 3, emoji: '😐', label: 'Okay' },
    { mood: 4, emoji: '🙂', label: 'Good' },
    { mood: 5, emoji: '😄', label: 'Great' }
];

const moodColors = ['#f87171', '#fbbf24', '#a7f3d0', '#6ee7b7', '#34d399'];

// Fix: Correctly typed the custom tooltip props using ValueType and NameType from the specific import path.
// This resolves the error where 'payload' and 'label' were not found on the type.
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const moodValue = payload[0].value;
    if (typeof moodValue !== 'number') return null;
    
    const moodInfo = moodEmojis.find(m => m.mood === moodValue);
    return (
      <div className="bg-card-bg dark:bg-dark-card-bg backdrop-blur-lg p-3 rounded-lg border border-card-border dark:border-dark-card-border shadow-lg">
        <p className="font-bold text-text-heading dark:text-dark-text-heading">{label}</p>
        <p className="text-text-body dark:text-dark-text-body">Mood: {moodInfo?.label}</p>
      </div>
    );
  }
  return null;
};

const MoodTracker: React.FC = () => {
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  
  const currentData = timeRange === '7d' ? moodData7d : moodData30d;

  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-text-heading dark:text-dark-text-heading mb-4">Mood & Wellness Tracking</h2>
      
      <div className="bg-white/40 dark:bg-black/20 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-text-body dark:text-dark-text-body mb-3 text-center">How are you feeling today?</h3>
        <div className="flex justify-around">
            {moodEmojis.map(({mood, emoji, label}) => (
                <button key={mood} onClick={() => setTodayMood(mood)} className={`flex flex-col items-center p-2 rounded-lg transition-all ${todayMood === mood ? 'bg-accent-light dark:bg-accent/30 scale-110' : 'hover:bg-white/50 dark:hover:bg-black/20'}`}>
                    <span className="text-3xl">{emoji}</span>
                    <span className="text-xs text-text-muted dark:text-dark-text-muted mt-1">{label}</span>
                </button>
            ))}
        </div>
        {todayMood && <p className="text-center text-accent font-semibold mt-3 animate-fade-in">Thanks for checking in! You're improving!</p>}
      </div>
      
      <div className="bg-white/40 dark:bg-black/20 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-text-body dark:text-dark-text-body mb-3 text-center">Mini Stress & Sleep Check</h3>
        <div className="text-sm">
            <p className="mb-1">Stress Level Today: <span className="font-semibold">Moderate</span></p>
            <p>Last Night's Sleep: <span className="font-semibold">6 hours</span></p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-text-body dark:text-dark-text-body">Your mood at a glance</h3>
        <div className="flex text-sm bg-white/40 dark:bg-black/20 p-1 rounded-full">
            <button onClick={() => setTimeRange('7d')} className={`px-3 py-1 rounded-full ${timeRange === '7d' ? 'bg-white dark:bg-dark-text-body shadow' : ''}`}>7-Day</button>
            <button onClick={() => setTimeRange('30d')} className={`px-3 py-1 rounded-full ${timeRange === '30d' ? 'bg-white dark:bg-dark-text-body shadow' : ''}`}>30-Day</button>
        </div>
      </div>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={currentData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={10} tick={{ fill: 'currentColor' }} />
            <YAxis hide={true} domain={[0, 5]} />
            <Tooltip
              cursor={{ fill: 'currentColor', opacity: 0.1 }}
              content={<CustomTooltip />}
            />
            <Bar dataKey="mood" radius={[10, 10, 0, 0]}>
                {currentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={moodColors[entry.mood - 1]} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

export default MoodTracker;