import React from 'react';
import GlassCard from '../common/GlassCard';
import { XIcon } from '../common/Icons';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <GlassCard 
        className="w-11/12 md:w-2/3 lg:w-1/2 max-w-4xl max-h-[90vh] flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/30">
          <h2 className="text-2xl font-bold text-text-heading">{title}</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-heading" aria-label="Close game">
            <XIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-1">
          {children}
        </div>
      </GlassCard>
    </div>
  );
};

export default GameModal;