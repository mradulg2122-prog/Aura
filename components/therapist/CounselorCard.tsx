import React from 'react';
import GlassCard from '../common/GlassCard';
import { Counselor } from '../../types';

interface CounselorCardProps {
    counselor: Counselor;
    onBook: (counselor: Counselor) => void;
}

const CounselorCard: React.FC<CounselorCardProps> = ({ counselor, onBook }) => {
    return (
        <GlassCard className="flex flex-col h-full animate-fade-in">
            <div className="flex-shrink-0">
                <img className="h-32 w-32 rounded-full mx-auto object-cover shadow-lg" src={counselor.imageUrl} alt={counselor.name} />
            </div>
            <div className="flex-grow text-center mt-4">
                <h3 className="text-xl font-bold text-text-heading">{counselor.name}</h3>
                <p className="text-sm font-semibold text-accent mb-2">{counselor.specialty}</p>
                <p className="text-xs text-text-body px-4 h-12 overflow-hidden">{counselor.bio}</p>
            </div>
            <div className="flex-shrink-0 mt-4 pt-4 border-t border-white/30">
                 <div className="text-xs text-text-muted space-y-1">
                    <p><strong>Languages:</strong> {counselor.languages.join(', ')}</p>
                    <p><strong>Availability:</strong> {counselor.availability.join(', ')}</p>
                </div>
                <button
                    onClick={() => onBook(counselor)}
                    className="w-full mt-4 bg-accent text-white font-semibold py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    Book Now
                </button>
            </div>
        </GlassCard>
    );
};

export default CounselorCard;