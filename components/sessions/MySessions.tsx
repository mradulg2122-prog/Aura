import React, { useState, useMemo, useEffect } from 'react';
import GlassCard from '../common/GlassCard';
import { Session } from '../../types';
import { sessions as allSessionsData } from '../../data/sessions';
import { VideoIcon, MessageSquareIcon, PhoneIcon } from '../common/Icons';

const sessionTypeIcons: Record<Session['type'], React.FC<{className?: string}>> = {
    Video: VideoIcon,
    Chat: MessageSquareIcon,
    Voice: PhoneIcon,
};

const statusColors: Record<Session['status'], string> = {
    Upcoming: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
};

// Mock current user ID
const CURRENT_USER_ID = 'user_1';

const SessionCard: React.FC<{ session: Session; onCancel: (sessionId: number) => void }> = ({ session, onCancel }) => {
    const sessionDateTime = new Date(`${session.date} ${session.time}`);
    const now = new Date();
    const canCancel = session.status === 'Upcoming' && (sessionDateTime.getTime() - now.getTime()) > 24 * 60 * 60 * 1000;
    const Icon = sessionTypeIcons[session.type];

    return (
        <GlassCard className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div className="flex items-center gap-4">
                    <img src={session.counselor.imageUrl} alt={session.counselor.name} className="w-16 h-16 rounded-full"/>
                    <div>
                        <h3 className="text-lg font-bold text-text-heading">Session with {session.counselor.name}</h3>
                        <p className="font-semibold text-text-body">{new Date(session.date).toDateString()} at {session.time}</p>
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                            <Icon className="w-4 h-4"/>
                            <span>{session.type} Session</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[session.status]}`}>{session.status}</span>
                    {canCancel && (
                        <button onClick={() => onCancel(session.id)} className="text-xs mt-2 bg-red-500 text-white font-semibold hover:bg-red-600 px-3 py-1 rounded-full transition-colors">
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </GlassCard>
    );
};


const CalendarView: React.FC<{ sessions: Session[], onDateSelect: (date: Date) => void }> = ({ sessions, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const sessionDates = useMemo(() => new Set(sessions.map(s => new Date(s.date).toDateString())), [sessions]);

    return (
        <GlassCard>
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>&lt;</button>
                <h3 className="font-semibold text-text-heading">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="font-bold text-xs text-text-muted">{day}</div>)}
                {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
                {[...Array(daysInMonth)].map((_, day) => {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1);
                    const isToday = date.toDateString() === new Date().toDateString();
                    const hasSession = sessionDates.has(date.toDateString());
                    return (
                        <button 
                            key={day}
                            onClick={() => onDateSelect(date)}
                            className={`w-10 h-10 rounded-full transition-colors relative ${isToday ? 'bg-accent text-white' : ''} ${hasSession ? 'font-bold' : ''}`}
                        >
                            {day + 1}
                            {hasSession && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-secondary rounded-full"></div>}
                        </button>
                    );
                })}
            </div>
        </GlassCard>
    );
};

const MySessions: React.FC = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const userSessions = allSessionsData
      .filter(s => s.userId === CURRENT_USER_ID)
      .sort((a, b) => new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime()); // Sort descending
    setSessions(userSessions);
  }, []);

  const handleCancel = (sessionId: number) => {
    if (window.confirm('Are you sure you want to cancel this session?')) {
        setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: 'Cancelled' } : s));
        // In a real app, this would be an API call.
    }
  };

  const sessionsToShow = selectedDate 
    ? sessions.filter(s => new Date(s.date).toDateString() === selectedDate.toDateString())
    : sessions;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-text-heading mb-2">My Sessions</h1>
            <p className="text-text-muted">View and manage your scheduled appointments.</p>
        </div>
        <div className="flex text-sm bg-white/40 p-1 rounded-full mt-4 sm:mt-0">
            <button onClick={() => setView('list')} className={`px-4 py-2 rounded-full font-semibold ${view === 'list' ? 'bg-white shadow' : ''}`}>List</button>
            <button onClick={() => setView('calendar')} className={`px-4 py-2 rounded-full font-semibold ${view === 'calendar' ? 'bg-white shadow' : ''}`}>Calendar</button>
        </div>
      </div>

      {view === 'calendar' && (
        <div className="mb-6">
            <CalendarView sessions={sessions} onDateSelect={(date) => {setSelectedDate(date); setView('list');}} />
        </div>
      )}

      {view === 'list' && (
        <div>
            {selectedDate && (
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Sessions for {selectedDate.toDateString()}</h2>
                    <button onClick={() => setSelectedDate(null)} className="text-sm font-semibold text-accent hover:underline">Show All</button>
                </div>
            )}
            {sessionsToShow.length > 0 ? (
                 sessionsToShow.map(session => (
                    <SessionCard key={session.id} session={session} onCancel={handleCancel} />
                ))
            ) : (
                <GlassCard className="text-center">
                    <p className="text-text-muted">
                        {selectedDate ? `No sessions scheduled for ${selectedDate.toLocaleDateString()}.` : 'You have no sessions scheduled.'}
                    </p>
                </GlassCard>
            )}
        </div>
      )}
    </div>
  );
};

export default MySessions;