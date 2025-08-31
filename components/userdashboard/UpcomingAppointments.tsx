import React, { useMemo } from 'react';
import GlassCard from '../common/GlassCard';
import { View } from '../../types';
import { sessions } from '../../data/sessions';

interface UpcomingAppointmentsProps {
  setCurrentView: (view: View) => void;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ setCurrentView }) => {
  const nextAppointment = useMemo(() => {
    const userUpcomingSessions = sessions
      .filter(s => s.userId === 'user_1' && s.status === 'Upcoming')
      .sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime());
    
    return userUpcomingSessions.length > 0 ? userUpcomingSessions[0] : null;
  }, []);
  
  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-text-heading dark:text-dark-text-heading mb-4">Your Next Session</h2>
      
      {nextAppointment ? (
        <div className="animate-fade-in">
          <div className="bg-white/40 dark:bg-black/20 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                  <img src={nextAppointment.counselor.imageUrl} alt={nextAppointment.counselor.name} className="w-12 h-12 rounded-full"/>
                  <div>
                      <p className="font-bold text-text-heading dark:text-dark-text-heading">{nextAppointment.counselor.name}</p>
                      <p className="text-sm text-text-body dark:text-dark-text-body font-semibold">{new Date(nextAppointment.date).toDateString()}</p>
                      <p className="text-sm text-text-body dark:text-dark-text-body">{nextAppointment.time}</p>
                  </div>
              </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-text-muted dark:text-dark-text-muted text-center py-4 animate-fade-in">No upcoming appointments.</p>
      )}
      
      <button 
        onClick={() => setCurrentView('my-sessions')} 
        className="w-full mt-4 bg-white/60 dark:bg-black/20 text-accent font-semibold py-2 rounded-lg hover:bg-accent-light dark:hover:bg-accent/20 transition-colors text-sm">
        Manage All Sessions
      </button>
    </GlassCard>
  );
};

export default UpcomingAppointments;