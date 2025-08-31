import React from 'react';
import GlassCard from '../common/GlassCard';
import { ChatIcon, UsersIcon, BookIcon, CalendarIcon, DashboardIcon } from '../common/Icons';

interface HomepageProps {
  onLoginClick: () => void;
}

const features = [
    { title: 'AI Chat Support', description: 'Talk anytime, 24/7.', icon: ChatIcon },
    { title: 'Resource Hub', description: 'Articles & calming games.', icon: BookIcon },
    { title: 'Peer Forum', description: 'Connect with others.', icon: UsersIcon },
    { title: 'Confidential Booking', description: 'Schedule with counselors.', icon: CalendarIcon },
    { title: 'Admin Analytics', description: 'Track well-being trends.', icon: DashboardIcon },
];

const Homepage: React.FC<HomepageProps> = ({ onLoginClick }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-start to-bg-end animate-breathe-light"></div>
      
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-end items-center z-10">
        <button onClick={onLoginClick} className="bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition-transform hover:scale-105">
            Login / Sign Up
        </button>
      </header>

      <main className="z-10 text-center flex flex-col items-center animate-fade-in">
        <h2 
            aria-label="Aura Project Title"
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent animate-shimmer animate-glow transition-transform duration-300 hover:scale-105"
            style={{ backgroundSize: '200% auto' }}
        >
            Aura
        </h2>
        <p className="mt-4 text-xl text-text-body font-semibold">
            Find Balance. Build Strength. Discover Aura.
        </p>
        <button onClick={onLoginClick} className="mt-8 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-transform hover:scale-110 shadow-lg">
            Get Started
        </button>

        <p className="max-w-2xl text-text-body my-16">
          Aura offers confidential support, resources, and community to help you navigate student life. You are not alone.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl">
            {features.map(feature => (
                 <GlassCard key={feature.title} className="text-center p-4 hover:scale-105 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                    <h3 className="font-semibold text-text-body">{feature.title}</h3>
                    <p className="text-xs text-text-muted">{feature.description}</p>
                 </GlassCard>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Homepage;