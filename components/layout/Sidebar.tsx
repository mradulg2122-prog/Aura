import React from 'react';
import { type View } from '../../types';
import { DashboardIcon, CalendarIcon, BookIcon, UsersIcon, ClipboardIcon, PhoneIcon, CalendarCheckIcon, SearchIcon, YogaIcon } from '../common/Icons';

// A simple Logout icon
const LogoutIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
);

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen, onLogout }) => {
  const navItems: { view: View; label: string; icon: React.FC<{ className?: string }> }[] = [
    { view: 'user-dashboard', label: 'Dashboard', icon: DashboardIcon },
    { view: 'my-sessions', label: 'My Sessions', icon: CalendarCheckIcon },
    { view: 'find-therapist', label: 'Find a Therapist', icon: SearchIcon },
    { view: 'booking', label: 'Book a Session', icon: CalendarIcon },
    { view: 'resources', label: 'Resources', icon: BookIcon },
    { view: 'yoga', label: 'Yoga', icon: YogaIcon },
    { view: 'forum', label: 'Forum', icon: UsersIcon },
    { view: 'screening', label: 'Screening', icon: ClipboardIcon },
    { view: 'helpline', label: 'Helpline', icon: PhoneIcon },
  ];

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    if (window.innerWidth < 768) { // md breakpoint
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white/60 dark:bg-black/40 backdrop-blur-lg p-6 flex flex-col z-40 transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-12 text-center">
            <h1 
                aria-label="Aura Project Title"
                className="inline-block text-4xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent animate-shimmer animate-glow transition-transform duration-300 hover:scale-105"
                style={{ backgroundSize: '200% auto' }}
            >
                Aura
            </h1>
        </div>
        <nav className="flex-1">
          <ul>
            {navItems.map(item => (
              <li key={item.view} className="mb-2">
                <button
                  onClick={() => handleNavClick(item.view)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors text-lg ${
                    currentView === item.view
                      ? 'bg-accent text-white font-semibold'
                      : 'text-text-body dark:text-dark-text-body hover:bg-accent-light dark:hover:bg-accent/20 hover:text-accent dark:hover:text-dark-text-heading'
                  }`}
                >
                  <item.icon className="w-6 h-6 mr-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <button
            onClick={onLogout}
            className="w-full flex items-center p-3 rounded-lg transition-colors text-lg text-text-body dark:text-dark-text-body hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400"
          >
            <LogoutIcon className="w-6 h-6 mr-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;