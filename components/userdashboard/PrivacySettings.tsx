import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { GlobeIcon, MoonIcon, SunIcon } from '../common/Icons';

interface PrivacySettingsProps {
  isAnonymous: boolean;
  onAnonymityToggle: () => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ isAnonymous, onAnonymityToggle, theme, onThemeChange }) => {
  const [notifications, setNotifications] = useState(true);

  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-text-heading dark:text-dark-text-heading mb-4">Privacy & Settings</h2>
      <div className="space-y-4">
        {/* Anonymity Toggle */}
        <div className="flex justify-between items-center">
          <label htmlFor="anonymous-toggle-settings" className="text-sm font-medium text-text-body dark:text-dark-text-body">Anonymous Mode</label>
           <div className="relative inline-block w-10 align-middle">
              <input type="checkbox" id="anonymous-toggle-settings" checked={isAnonymous} onChange={onAnonymityToggle} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
              <label htmlFor="anonymous-toggle-settings" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>
        <p className="text-xs text-text-muted dark:text-dark-text-muted -mt-2">
            When enabled, your name and other personal info are hidden from public view.
        </p>

        {/* Other settings */}
        <div className="flex justify-between items-center">
          <label htmlFor="notifications-toggle" className="text-sm font-medium text-text-body dark:text-dark-text-body">Enable Notifications</label>
           <div className="relative inline-block w-10 align-middle">
              <input type="checkbox" id="notifications-toggle" checked={notifications} onChange={() => setNotifications(!notifications)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
              <label htmlFor="notifications-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>
         <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-text-body dark:text-dark-text-body flex items-center"><GlobeIcon className="w-4 h-4 mr-2"/> Language</label>
            <select className="text-sm bg-white/60 dark:bg-dark-card-bg dark:text-dark-text-body rounded-md py-1 px-2 border border-transparent focus:outline-none focus:ring-1 focus:ring-accent">
                <option>English</option>
                <option>Hindi</option>
            </select>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-text-body dark:text-dark-text-body">Theme</label>
          <div className="flex items-center bg-white/40 dark:bg-gray-700/50 p-1 rounded-full">
            <button onClick={() => onThemeChange('light')} className={`p-1 rounded-full transition-colors ${theme === 'light' ? 'bg-white shadow' : 'hover:bg-gray-500/50'}`} aria-label="Switch to light theme">
              <SunIcon className="w-4 h-4 text-gray-800 dark:text-yellow-300"/>
            </button>
            <button onClick={() => onThemeChange('dark')} className={`p-1 rounded-full transition-colors ${theme === 'dark' ? 'bg-accent shadow' : 'hover:bg-gray-500/50'}`} aria-label="Switch to dark theme">
              <MoonIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}/>
            </button>
          </div>
        </div>
      </div>
      
       <style>{`
            .toggle-checkbox:checked { right: 0; border-color: #00a896; }
            .toggle-checkbox:checked + .toggle-label { background-color: #00a896; }
        `}</style>
    </GlassCard>
  );
};

export default PrivacySettings;