import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { YogaPose } from '../../types';
import { XIcon } from '../common/Icons';

interface PoseDetailModalProps {
  pose: YogaPose;
  onClose: () => void;
}

const PoseDetailModal: React.FC<PoseDetailModalProps> = ({ pose, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <GlassCard
        className="w-11/12 md:w-3/4 lg:w-2/3 max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/30">
          <div>
            <h2 className="text-2xl font-bold text-text-heading">{pose.name}</h2>
            <p className="text-md font-semibold text-accent">{pose.sanskritName}</p>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-heading" aria-label="Close pose details">
            <XIcon />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2">
            <div className="mb-6">
                <iframe
                    title={`${pose.name} 3D Model`}
                    allowFullScreen
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    src={pose.sketchfabEmbedUrl}
                    onLoad={() => setIsLoading(false)}
                    className={`w-full h-64 md:h-96 lg:h-[500px] rounded-lg shadow-lg border-0 transition-all duration-700 ease-in-out ${isLoading ? 'blur-lg' : 'blur-0'}`}
                ></iframe>
            </div>

            <GlassCard className="!bg-white/30">
                <h3 className="text-lg font-semibold text-text-heading mb-2">Benefits & Description</h3>
                <p className="text-text-body">{pose.description}</p>
            </GlassCard>
        </div>
      </GlassCard>
    </div>
  );
};

export default PoseDetailModal;