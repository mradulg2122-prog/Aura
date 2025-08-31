import React, { useState, useMemo, useEffect } from 'react';
import GlassCard from '../common/GlassCard';
import { Counselor, Session } from '../../types';
import { counselors } from '../../data/counselors';
import { sessions as allSessions } from '../../data/sessions';
import { VideoIcon, MessageSquareIcon, PhoneIcon } from '../common/Icons';

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
const sessionTypes: Session['type'][] = ['Video', 'Chat', 'Voice'];
const sessionTypeIcons: Record<Session['type'], React.FC<{className?: string}>> = {
    Video: VideoIcon,
    Chat: MessageSquareIcon,
    Voice: PhoneIcon,
};

interface BookingProps {
  preselectedCounselor?: Counselor | null;
}

const Booking: React.FC<BookingProps> = ({ preselectedCounselor }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(counselors[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<Session['type']>('Video');
  const [isBooked, setIsBooked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (preselectedCounselor) {
      setSelectedCounselor(preselectedCounselor);
    }
  }, [preselectedCounselor]);

  const formattedSelectedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD

  const bookedSlots = useMemo(() => {
    if (!selectedCounselor) return { counselorSlots: new Set(), userSlots: new Set() };
    
    const counselorSlots = new Set<string>();
    const userSlots = new Set<string>();

    allSessions.forEach(session => {
        if (session.date === formattedSelectedDate) {
            // Check for counselor's availability
            if (session.counselor.id === selectedCounselor.id && session.status === 'Upcoming') {
                counselorSlots.add(session.time);
            }
            // Check for user's own bookings
            if (session.userId === 'user_1' && session.status === 'Upcoming') { // Mock current user
                userSlots.add(`${session.date} ${session.time}`);
            }
        }
    });

    return { counselorSlots, userSlots };
  }, [selectedCounselor, formattedSelectedDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const dateInstance = new Date(year, month, 1);
    const days = [];
    while (dateInstance.getMonth() === month) {
      days.push(new Date(dateInstance));
      dateInstance.setDate(dateInstance.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(selectedDate);
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const handleBooking = () => {
    setErrorMessage('');
    setIsBooked(false);
    if (!selectedTime || !selectedCounselor || !selectedDate) {
        setErrorMessage('Please select a counselor, date, and time.');
        return;
    }

    // Conflict check
    if (bookedSlots.userSlots.has(`${formattedSelectedDate} ${selectedTime}`)) {
        setErrorMessage('You already have a session at this time. Please choose another slot.');
        return;
    }
     if (bookedSlots.counselorSlots.has(selectedTime)) {
        setErrorMessage('This counselor is already booked at this time. Please choose another slot.');
        return;
    }

    // Mock booking success
    setIsBooked(true);
    // In a real app, you'd add the new session to the database here.
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-heading mb-2">Book a Confidential Session</h1>
      <p className="text-text-muted mb-8">Schedule an appointment with a professional counselor.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GlassCard>
            <h2 className="text-xl font-semibold text-text-heading mb-4">1. Select a Counselor</h2>
            <div className="flex space-x-4 overflow-x-auto p-2">
                {counselors.map(c => (
                    <div key={c.id} onClick={() => { setSelectedCounselor(c); setSelectedTime(null); }} className={`cursor-pointer p-4 rounded-xl border-2 transition-all min-w-[140px] ${selectedCounselor?.id === c.id ? 'border-accent bg-accent-light' : 'border-transparent hover:bg-white/50'}`}>
                        <img src={c.imageUrl} alt={c.name} className="w-20 h-20 rounded-full mx-auto mb-2"/>
                        <p className="font-semibold text-center text-text-body">{c.name}</p>
                        <p className="text-xs text-center text-text-muted">{c.specialty}</p>
                    </div>
                ))}
            </div>
            
            <h2 className="text-xl font-semibold text-text-heading mb-4 mt-8">2. Select Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>&lt;</button>
                        <h3 className="font-semibold">{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>&gt;</button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="font-bold text-xs text-text-muted">{day}</div>)}
                        {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
                        {daysInMonth.map(day => (
                            <button 
                                key={day.toISOString()} 
                                onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                                className={`w-8 h-8 rounded-full transition-colors ${day.toDateString() === selectedDate.toDateString() ? 'bg-accent text-white' : 'hover:bg-accent-light'}`}
                            >{day.getDate()}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-center mb-4">{selectedDate.toDateString()}</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map(time => {
                            const isBooked = bookedSlots.counselorSlots.has(time);
                            return (
                                <button 
                                    key={time} 
                                    onClick={() => setSelectedTime(time)} 
                                    disabled={isBooked}
                                    className={`p-2 rounded-lg transition-colors text-sm ${
                                        selectedTime === time ? 'bg-accent text-white' : 
                                        isBooked ? 'bg-gray-200 text-gray-400 line-through cursor-not-allowed' : 'bg-white/60 hover:bg-accent-light'
                                    }`}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
             <h2 className="text-xl font-semibold text-text-heading mb-4 mt-8">3. Select Session Type</h2>
             <div className="flex justify-center gap-4">
                {sessionTypes.map(type => {
                    const Icon = sessionTypeIcons[type];
                    return (
                        <button 
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${selectedType === type ? 'bg-accent text-white shadow' : 'bg-white/60 hover:bg-accent-light'}`}
                        >
                            <Icon className="w-5 h-5" />
                            {type}
                        </button>
                    )
                })}
             </div>
          </GlassCard>
        </div>

        <GlassCard>
            <h2 className="text-xl font-semibold text-text-heading mb-4">Your Appointment</h2>
            {selectedCounselor && (
                 <div className="mb-4 text-center">
                    <img src={selectedCounselor.imageUrl} alt={selectedCounselor.name} className="w-24 h-24 rounded-full mx-auto mb-2"/>
                    <p className="font-bold text-text-heading">{selectedCounselor.name}</p>
                    <p className="text-sm text-text-body">{selectedCounselor.specialty}</p>
                 </div>
            )}
            <div className="text-sm space-y-2 text-text-body">
                <p><span className="font-semibold">Date:</span> {selectedDate.toDateString()}</p>
                <p><span className="font-semibold">Time:</span> {selectedTime || 'Not selected'}</p>
                <p><span className="font-semibold">Type:</span> {selectedType}</p>
            </div>
            <button onClick={handleBooking} disabled={!selectedTime} className="w-full mt-6 bg-accent text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:bg-gray-400">
                Confirm Booking
            </button>
            {errorMessage && <p className="text-center text-red-500 font-semibold mt-4 text-sm">{errorMessage}</p>}
            {isBooked && <p className="text-center text-green-600 font-semibold mt-4">Booked Successfully!</p>}
        </GlassCard>
      </div>
    </div>
  );
};

export default Booking;