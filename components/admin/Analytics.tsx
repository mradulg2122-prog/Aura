import React from 'react';
import GlassCard from '../common/GlassCard';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { mockAnalyticsData, mockUsers } from '../../data/adminMockData';

const AdminAnalytics: React.FC = () => {
    const highRiskUsers = mockUsers.filter(u => u.isHighRisk);

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-heading mb-2">Platform Analytics</h1>
            <p className="text-text-muted mb-8">Visualize user engagement, screening results, and risk alerts.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GlassCard>
                    <h2 className="text-xl font-semibold text-text-heading mb-4">User Engagement Trends</h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={mockAnalyticsData.engagement}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}/>
                                <Legend />
                                <Line type="monotone" dataKey="users" name="Active Users" stroke="#00A896" strokeWidth={2} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard>
                    <h2 className="text-xl font-semibold text-text-heading mb-4">Average Screening Scores</h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={mockAnalyticsData.averageScores}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 27]}/>
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)' }}/>
                                <Bar dataKey="score" fill="rgba(0, 168, 150, 0.6)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard className="lg:col-span-2">
                    <h2 className="text-xl font-semibold text-text-heading mb-4">High-Risk Detection Alerts</h2>
                     <p className="text-sm text-text-body mb-4">Users flagged based on high screening scores or other crisis indicators.</p>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-text-body">
                            <thead className="text-xs text-text-heading uppercase bg-white/40">
                                <tr>
                                    <th scope="col" className="px-6 py-3">User</th>
                                    <th scope="col" className="px-6 py-3">PHQ-9 Score</th>
                                    <th scope="col" className="px-6 py-3">GAD-7 Score</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {highRiskUsers.map(user => (
                                    <tr key={user.id} className="border-b border-white/30 hover:bg-white/30">
                                        <td className="px-6 py-4 font-medium text-text-heading">{user.name}</td>
                                        <td className="px-6 py-4 text-red-600 font-bold">{user.phq9Score}</td>
                                        <td className="px-6 py-4 text-red-600 font-bold">{user.gad7Score}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-xs font-medium px-3 py-1 rounded-full text-blue-700 hover:bg-blue-200">Review Case</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default AdminAnalytics;
