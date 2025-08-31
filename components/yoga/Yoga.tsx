import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { yogaCategories } from '../../data/yogaPoses';
import PoseCard from './PoseCard';
import { ChevronDownIcon } from '../common/Icons';
import PoseDetailModal from './PoseDetailModal';
import { YogaPose } from '../../types';

const Yoga: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(yogaCategories[0].id);
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-text-heading mb-2">Yoga for Mental Wellness</h1>
        <p className="text-text-muted mb-8">Discover gentle yoga practices to support your mind and body.</p>
        
        <div className="space-y-4">
          {yogaCategories.map((category) => (
            <GlassCard key={category.id} className="!p-0 overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggleExpand(category.id)}
                className="w-full flex justify-between items-center p-6 text-left"
                aria-expanded={expandedId === category.id}
                aria-controls={`yoga-content-${category.id}`}
              >
                <div>
                  <h2 className="text-xl font-bold text-text-heading">{category.title}</h2>
                  <p className="text-sm text-text-muted mt-1">{category.tagline}</p>
                </div>
                <ChevronDownIcon
                  className={`w-6 h-6 text-accent transition-transform duration-300 ${
                    expandedId === category.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                id={`yoga-content-${category.id}`}
                className={`transition-all duration-500 ease-in-out grid ${
                  expandedId === category.id
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.poses.map((pose) => (
                        <PoseCard key={pose.name} pose={pose} onSelect={setSelectedPose} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      {selectedPose && (
        <PoseDetailModal 
          pose={selectedPose}
          onClose={() => setSelectedPose(null)}
        />
      )}
    </>
  );
};

export default Yoga;