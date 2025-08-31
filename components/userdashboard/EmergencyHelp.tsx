import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { HelpCircleIcon, PhoneIcon, XIcon } from '../common/Icons';

const helplines = [
    { name: 'National Suicide Prevention Lifeline', phone: '988' },
    { name: 'Crisis Text Line', phone: 'Text HOME to 741741' },
];

const EmergencyHelp: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <GlassCard className="!bg-red-100/80 dark:!bg-red-900/40 border-red-300/50 dark:border-red-500/30">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Need Help Now?</h2>
          <p className="text-sm text-red-700 dark:text-red-300 mb-4">If you are in a crisis or any other person may be in danger, please get help immediately.</p>
          <button 
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors shadow-lg"
          >
            <HelpCircleIcon />
            Get Help Now (SOS)
          </button>
        </div>
      </GlassCard>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" onClick={() => setShowModal(false)}>
          <GlassCard className="w-11/12 max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-red-600 dark:text-red-300">Immediate Support</h2>
              <button onClick={() => setShowModal(false)}><XIcon/></button>
            </div>
            <div className="text-center my-4">
               <div className="relative w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <div className="absolute inset-0 bg-primary-light/50 dark:bg-accent/30 rounded-full animate-breathe"></div>
                  <p className="font-semibold text-text-body dark:text-dark-text-body">Breathe...</p>
               </div>
            </div>
            <p className="text-sm text-text-body dark:text-dark-text-body mb-4">Please reach out to one of these 24/7 services. You are not alone.</p>
            <div className="space-y-3">
              {helplines.map(line => (
                <div key={line.name} className="bg-white/60 dark:bg-black/20 p-3 rounded-lg text-center">
                  <h3 className="font-semibold text-text-heading dark:text-dark-text-heading">{line.name}</h3>
                  <p className="text-xl font-bold text-accent my-1 flex items-center justify-center gap-2">
                    <PhoneIcon className="w-5 h-5"/>
                    {line.phone}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
};

export default EmergencyHelp;