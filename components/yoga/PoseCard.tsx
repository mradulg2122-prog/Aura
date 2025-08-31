import React from 'react';
import { YogaPose } from '../../types';
import GlassCard from '../common/GlassCard';

interface PoseCardProps {
  pose: YogaPose;
  onSelect: (pose: YogaPose) => void;
}

const PoseCard: React.FC<PoseCardProps> = ({ pose, onSelect }) => {
  const handle3DModelClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card's onClick from firing
    onSelect(pose);
  };

  return (
    <GlassCard 
      onClick={() => onSelect(pose)}
      className="group flex flex-col text-center items-center p-4 h-full cursor-pointer hover:scale-105 !overflow-hidden"
    >
      {/* Image container with hover effect */}
      <div
        className="relative w-full h-40 bg-white/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden shadow-inner"
      >
        <img
          src={pose.imageUrl}
          alt={pose.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay and Button */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            onClick={handle3DModelClick}
            className="z-10 bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform translate-y-5 group-hover:translate-y-0"
          >
            View 3D Model
          </button>
        </div>
      </div>

      {/* Text content */}
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-text-heading">{pose.name}</h3>
        <p className="text-sm font-semibold text-accent mb-2">{pose.sanskritName}</p>
        <p className="text-xs text-text-body">{pose.description}</p>
      </div>
    </GlassCard>
  );
};

export default PoseCard;
