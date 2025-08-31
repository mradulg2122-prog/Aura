import React from 'react';
import GlassCard from '../common/GlassCard';
import { AssessmentRecord } from '../../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BookIcon, LungsIcon } from '../common/Icons';

const assessmentData: AssessmentRecord[] = [
  { date: 'Jan', phq9: 18, gad7: 15 },
  { date: 'Feb', phq9: 15, gad7: 12 },
  { date: 'Mar', phq9: 12, gad7: 10 },
  { date: 'Apr', phq9: 10, gad7: 8 },
  { date: 'May', phq9: 8, gad7: 6 },
];

const AssessmentHistory: React.FC = () => {
  return (
    <GlassCard className="flex flex-col">
      <h2 className="text-xl font-semibold text-text-heading mb-4">Self-Assessment Records</h2>
      <div className="flex-grow" style={{ width: '100%', minHeight: 200 }}>
        <ResponsiveContainer>
          <LineChart data={assessmentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis domain={[0, 27]} />
            <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Line type="monotone" dataKey="phq9" name="Depression (PHQ-9)" stroke="#f87171" strokeWidth={2} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="gad7" name="Anxiety (GAD-7)" stroke="#fbbf24" strokeWidth={2} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
       <div className="mt-4 pt-4 border-t border-white/30">
          <h3 className="font-semibold text-text-body mb-2 text-sm">Suggested For You</h3>
          <div className="flex flex-col gap-2">
            <button className="text-left text-xs p-2 rounded-lg bg-white/50 hover:bg-accent-light transition-colors flex items-center gap-2">
                <BookIcon className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Read: Understanding CBT Techniques</span>
            </button>
            <button className="text-left text-xs p-2 rounded-lg bg-white/50 hover:bg-accent-light transition-colors flex items-center gap-2">
                <LungsIcon className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Try: Mindful Breathing Game</span>
            </button>
          </div>
        </div>
    </GlassCard>
  );
};

export default AssessmentHistory;