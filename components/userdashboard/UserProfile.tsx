import React from 'react';
import { UserProfile as UserProfileType } from '../../types';
import GlassCard from '../common/GlassCard';
import { UserIcon } from '../common/Icons';

// Placeholder for Indian user avatar
const mockUser: Omit<UserProfileType, 'name' | 'isAnonymous'> = {
  avatarUrl: 'https://picsum.photos/id/447/200/200',
  lastLogin: 'Today, 10:30 AM',
  preferredLanguage: 'en',
};

interface UserProfileProps {
    name: string;
    isAnonymous: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, isAnonymous }) => {
  return (
    <GlassCard>
      <div className="flex items-center space-x-4 animate-fade-in" key={isAnonymous ? 'anon-profile' : 'user-profile'}>
        {isAnonymous ? (
          <div className="w-16 h-16 rounded-full bg-white/60 dark:bg-dark-card-bg flex items-center justify-center shadow-md flex-shrink-0">
            <UserIcon className="w-10 h-10 text-text-muted dark:text-dark-text-muted" />
          </div>
        ) : (
          <img 
            src={mockUser.avatarUrl} 
            alt={name}
            className="w-16 h-16 rounded-full shadow-md flex-shrink-0 object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-bold text-text-heading dark:text-dark-text-heading">{isAnonymous ? 'Anonymous User' : name}</h2>
          <p className="text-sm text-text-muted dark:text-dark-text-muted">Last login: {mockUser.lastLogin}</p>
        </div>
      </div>
    </GlassCard>
  );
};

export default UserProfile;