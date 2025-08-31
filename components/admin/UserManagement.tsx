import React, { useState, useMemo } from 'react';
import GlassCard from '../common/GlassCard';
import { mockUsers } from '../../data/adminMockData';
import { ManagedUser } from '../../types';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<ManagedUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [decryptedUserId, setDecryptedUserId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = statusFilter === 'All' || user.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [users, searchTerm, statusFilter]);

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === 'Deactivated' ? 'Active' : 'Deactivated' };
      }
      return user;
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-heading mb-2">User Management</h1>
      <p className="text-text-muted mb-8">View, search, and manage user accounts.</p>
      
      <GlassCard>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
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
            <option value="Active">Active</option>
            <option value="Anonymous">Anonymous</option>
            <option value="Deactivated">Deactivated</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-text-body">
            <thead className="text-xs text-text-heading uppercase bg-white/40">
              <tr>
                <th scope="col" className="px-6 py-3">User</th>
                <th scope="col" className="px-6 py-3">Location</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Last Login</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-white/30 hover:bg-white/30">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-heading">{user.name}</div>
                    <div className="text-text-muted text-xs cursor-pointer" onClick={() => setDecryptedUserId(decryptedUserId === user.id ? null : user.id)}>
                      {decryptedUserId === user.id ? user.email : '************'}
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' :
                      user.status === 'Anonymous' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                    {user.isHighRisk && (
                        <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-red-200 text-red-800">High-Risk</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`text-xs font-medium px-3 py-1 rounded-full ${user.status === 'Deactivated' ? 'text-green-700 hover:bg-green-200' : 'text-red-700 hover:bg-red-200'}`}
                    >
                      {user.status === 'Deactivated' ? 'Activate' : 'Deactivate'}
                    </button>
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

export default UserManagement;