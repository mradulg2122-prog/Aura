import { ManagedUser } from '../types';

export const mockUsers: ManagedUser[] = [
  { id: 'usr_1', name: 'Priya Sharma', email: 'priya.s@example.com', location: 'Delhi, India', status: 'Active', lastLogin: '2 hours ago', phq9Score: 18, gad7Score: 15, isHighRisk: true },
  { id: 'usr_2', name: 'AnonymousUser_123', email: 'anon_123@aura.net', location: 'Mumbai, India', status: 'Anonymous', lastLogin: '5 hours ago', phq9Score: 8, gad7Score: 7, isHighRisk: false },
  { id: 'usr_3', name: 'Rohan Verma', email: 'rohan.v@example.com', location: 'Bengaluru, India', status: 'Active', lastLogin: '1 day ago', phq9Score: 4, gad7Score: 5, isHighRisk: false },
  { id: 'usr_4', name: 'Anjali Desai', email: 'anjali.d@example.com', location: 'Chennai, India', status: 'Active', lastLogin: '3 days ago', phq9Score: 12, gad7Score: 10, isHighRisk: false },
  { id: 'usr_5', name: 'AnonymousUser_456', email: 'anon_456@aura.net', location: 'Kolkata, India', status: 'Anonymous', lastLogin: '1 week ago', phq9Score: null, gad7Score: null, isHighRisk: false },
  { id: 'usr_6', name: 'Sameer Khan', email: 'sameer.k@example.com', location: 'Hyderabad, India', status: 'Deactivated', lastLogin: '2 weeks ago', phq9Score: 22, gad7Score: 18, isHighRisk: true },
];

export const mockAnalyticsData = {
    engagement: [
        { name: 'Jan', users: 120 },
        { name: 'Feb', users: 200 },
        { name: 'Mar', users: 180 },
        { name: 'Apr', users: 250 },
        { name: 'May', users: 300 },
        { name: 'Jun', users: 450 },
    ],
    averageScores: [
        { name: 'PHQ-9', score: 11.5 },
        { name: 'GAD-7', score: 9.8 },
    ],
};
