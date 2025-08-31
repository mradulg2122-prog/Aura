import React from 'react';
import GlassCard from '../common/GlassCard';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { mockUsers } from '../../data/adminMockData';

const AdminOverview: React.FC = () => {
    const totalUsers = mockUsers.length;
    const anonymousUsers = mockUsers.filter(u => u.status === 'Anonymous').length;
    const publicUsers = totalUsers - anonymousUsers;

    const userDistributionData = [
        { name: 'Public Users', value: publicUsers },
        { name: 'Anonymous Users', value: anonymousUsers },
    ];
    const COLORS = ['#00A896', '#007F7F'];

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-heading mb-2">Admin Overview</h1>
            <p className="text-text-muted mb-8">A snapshot of platform activity and user statistics.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <GlassCard className="!p-4">
                    <h3 className="text-sm font-medium text-text-muted">Total Users Enrolled</h3>
                    <p className="text-3xl font-bold text-text-heading">{totalUsers}</p>
                </GlassCard>
                <GlassCard className="!p-4">
                    <h3 className="text-sm font-medium text-text-muted">Daily Active Users</h3>
                    <p className="text-3xl font-bold text-text-heading">1,284</p>
                </GlassCard>
                <GlassCard className="!p-4">
                    <h3 className="text-sm font-medium text-text-muted">Pending Appointments</h3>
                    <p className="text-3xl font-bold text-text-heading">12</p>
                </GlassCard>
                <GlassCard className="!p-4">
                    <h3 className="text-sm font-medium text-text-muted">High-Risk Alerts</h3>
                    <p className="text-3xl font-bold text-red-500">{mockUsers.filter(u => u.isHighRisk).length}</p>
                </GlassCard>
            </div>

            <GlassCard>
                <h2 className="text-xl font-semibold text-text-heading mb-4">User Distribution</h2>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={userDistributionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {userDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </GlassCard>
        </div>
    );
};

export default AdminOverview;
