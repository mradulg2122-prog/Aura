import React from 'react';
import UserProfile from './UserProfile';
import MoodTracker from './MoodTracker';
import ScreeningSummary from './ScreeningSummary';
import UpcomingAppointments from './UpcomingAppointments';
import Achievements from './Achievements';
import PrivacySettings from './PrivacySettings';
import EmergencyHelp from './EmergencyHelp';
import ResourceUsage from './ResourceUsage';
import CommunitySupport from './CommunitySupport';
import { View } from '../../types';
import PuzzleStats from './PuzzleStats';
import FestiveBanner from './FestiveBanner';

interface UserDashboardProps {
  userName: string;
  isAnonymous: boolean;
  setCurrentView: (view: View) => void;
  onAnonymityToggle: () => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userName, isAnonymous, setCurrentView, onAnonymityToggle, theme, onThemeChange }) => {
  return (
    <div key={isAnonymous ? 'anon' : 'user'} className="animate-fade-in">
      <FestiveBanner />
      {isAnonymous ? (
        <h1 className="text-3xl font-bold text-text-heading dark:text-dark-text-heading mb-2">Welcome, Anonymous User 👤</h1>
      ) : (
        <h1 className="text-3xl font-bold text-text-heading dark:text-dark-text-heading mb-2">Namaste, {userName} 🙏</h1>
      )}
      <p className="text-text-muted dark:text-dark-text-muted mb-8">Here's your personal wellness overview.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Core personal modules */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <UserProfile name={userName} isAnonymous={isAnonymous} />
          <EmergencyHelp />
          <UpcomingAppointments setCurrentView={setCurrentView} />
          <PrivacySettings isAnonymous={isAnonymous} onAnonymityToggle={onAnonymityToggle} theme={theme} onThemeChange={onThemeChange} />
        </div>

        {/* Column 2: Tracking and history */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ScreeningSummary />
          <MoodTracker />
          {/* Fix: Passed the required setCurrentView prop to the CommunitySupport component. */}
          <CommunitySupport setCurrentView={setCurrentView} />
        </div>
        
        {/* Column 3: Engagement and rewards */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           <PuzzleStats />
           <Achievements />
           <ResourceUsage />
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;