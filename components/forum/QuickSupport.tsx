import React from 'react';
import GlassCard from '../common/GlassCard';
import { View } from '../../types';
import { PhoneIcon, BookIcon, HelpCircleIcon } from '../common/Icons';

interface QuickSupportProps {
    setCurrentView: (view: View) => void;
}

const QuickSupport: React.FC<QuickSupportProps> = ({ setCurrentView }) => {
    return (
        <GlassCard>
            <div className="flex items-center gap-3 mb-4">
                <HelpCircleIcon className="w-6 h-6 text-accent"/>
                <h2 className="text-xl font-semibold text-text-heading">Quick Support</h2>
            </div>
            <p className="text-sm text-text-muted mb-4">
                Need immediate help or want to explore resources? Use the links below.
            </p>
            <div className="space-y-3">
                <button
                    onClick={() => setCurrentView('helpline')}
                    className="w-full flex items-center gap-3 p-3 bg-white/60 rounded-lg hover:bg-accent-light transition-colors"
                >
                    <PhoneIcon className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-text-body">Helpline Directory</span>
                </button>
                <button
                    onClick={() => setCurrentView('resources')}
                    className="w-full flex items-center gap-3 p-3 bg-white/60 rounded-lg hover:bg-accent-light transition-colors"
                >
                    <BookIcon className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-text-body">Resource Hub</span>
                </button>
            </div>
        </GlassCard>
    );
};

export default QuickSupport;
