import React, { useState, useMemo } from 'react';
import GlassCard from '../common/GlassCard';
import { sessions as allSessions } from '../../data/sessions';
import { Session } from '../../types';

const SessionManagement: React.FC = () => {
  const [sessions] = useState<Session[]>(allSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredSessions = useMemo(() => {
    return sessions.filter(session => {
      const matchesSearch = session.counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            `User ID: ${session.userId}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = statusFilter === 'All' || session.status === statusFilter;
      return matchesSearch && matchesFilter;
    }).sort((a, b) => new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime());
  }, [sessions, searchTerm, statusFilter]);

  const statusColors: Record<Session['status'], string> = {
    Upcoming: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-heading mb-2">Session Management</h1>
      <p className="text-text-muted mb-8">Monitor and manage all user counseling sessions.</p>
      
      <GlassCard>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by counselor or user ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-2 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full md:w-auto p-2 bg-white/80 rounded-lg text-text-heading focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="All">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-text-body">
            <thead className="text-xs text-text-heading uppercase bg-white/40">
              <tr>
                <th scope="col" className="px-6 py-3">User ID</th>
                <th scope="col" className="px-6 py-3">Counselor</th>
                <th scope="col" className="px-6 py-3">Date & Time</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map(session => (
                <tr key={session.id} className="border-b border-white/30 hover:bg-white/30">
                  <td className="px-6 py-4 font-mono text-text-muted">{session.userId}</td>
                  <td className="px-6 py-4 font-medium text-text-heading">{session.counselor.name}</td>
                  <td className="px-6 py-4">{new Date(session.date).toLocaleDateString()} - {session.time}</td>
                  <td className="px-6 py-4">{session.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[session.status]}`}>
                      {session.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default SessionManagement;