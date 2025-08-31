import { Session } from '../types';
import { counselors } from './counselors';

// Helper to get a future or past date string in YYYY-MM-DD format
const getDateString = (dayOffset: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    return date.toISOString().split('T')[0];
};

export const sessions: Session[] = [
    // Upcoming sessions for user_1
    {
        id: 1,
        userId: 'user_1',
        counselor: counselors[0],
        date: getDateString(2),
        time: '10:00 AM',
        type: 'Video',
        status: 'Upcoming'
    },
    {
        id: 2,
        userId: 'user_1',
        counselor: counselors[1],
        date: getDateString(7),
        time: '02:00 PM',
        type: 'Chat',
        status: 'Upcoming'
    },
     {
        id: 8,
        userId: 'user_1',
        counselor: counselors[2],
        date: getDateString(0), // Today
        time: new Date(new Date().getTime() + 50 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}), // In 50 minutes for notification testing
        type: 'Voice',
        status: 'Upcoming'
    },
    
    // Completed sessions for user_1
    {
        id: 3,
        userId: 'user_1',
        counselor: counselors[0],
        date: getDateString(-10),
        time: '11:00 AM',
        type: 'Video',
        status: 'Completed'
    },
    {
        id: 4,
        userId: 'user_1',
        counselor: counselors[2],
        date: getDateString(-20),
        time: '03:00 PM',
        type: 'Voice',
        status: 'Completed'
    },
    
    // Cancelled session for user_1
    {
        id: 5,
        userId: 'user_1',
        counselor: counselors[1],
        date: getDateString(-5),
        time: '09:00 AM',
        type: 'Chat',
        status: 'Cancelled'
    },

    // Sessions for other users to test conflict booking
    {
        id: 6,
        userId: 'usr_3', // Another user
        counselor: counselors[0], // Same counselor as session 1
        date: getDateString(2), // Same date as session 1
        time: '01:00 PM', // Different time
        type: 'Video',
        status: 'Upcoming'
    },
    {
        id: 7,
        userId: 'usr_4', // Another user
        counselor: counselors[1], // Dr. Rohan Verma
        date: getDateString(3),
        time: '10:00 AM',
        type: 'Video',
        status: 'Upcoming'
    }
];
