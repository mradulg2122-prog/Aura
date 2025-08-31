import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { BarChartIcon, DashboardIcon, FileDownIcon, FileTextIcon, ShieldIcon, UsersIcon, CalendarCheckIcon } from '../common/Icons';
import AdminOverview from '../admin/Overview';
import AdminUserManagement from '../admin/UserManagement';
import AdminAnalytics from '../admin/Analytics';
import AdminContentManagement from '../admin/ContentManagement';
import AdminReports from '../admin/Reports';
import AdminSessionManagement from '../admin/SessionManagement';

type AdminView = 'overview' | 'users' | 'analytics' | 'content' | 'reports' | 'sessions';

// A simple Logout icon for the admin panel
const LogoutIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
);

const AdminSidebar: React.FC<{ activeView: AdminView; setActiveView: (view: AdminView) => void; onLogout: () => void; }> = ({ activeView, setActiveView, onLogout }) => {
    const navItems = [
        { view: 'overview', label: 'Overview', icon: DashboardIcon },
        { view: 'users', label: 'User Management', icon: UsersIcon },
        { view: 'sessions', label: 'Sessions', icon: CalendarCheckIcon },
        { view: 'analytics', label: 'Analytics', icon: BarChartIcon },
        { view: 'content', label: 'Content', icon: FileTextIcon },
        { view: 'reports', label: 'Reports', icon: FileDownIcon },
    ];

    return (
        <aside className="w-64 bg-white/60 backdrop-blur-lg p-6 flex-col fixed h-full hidden md:flex">
            <div className="flex items-center gap-2 mb-12">
                <ShieldIcon className="w-8 h-8 text-accent" />
                <h1 className="text-2xl font-bold text-text-heading">Aura Admin</h1>
            </div>
            <nav className="flex-1">
                <ul>
                    {navItems.map(item => (
                        <li key={item.view} className="mb-2">
                            <button
                                onClick={() => setActiveView(item.view as AdminView)}
                                className={`w-full flex items-center p-3 rounded-lg transition-colors text-md ${
                                    activeView === item.view
                                    ? 'bg-accent text-white font-semibold'
                                    : 'text-text-body hover:bg-accent-light hover:text-accent'
                                }`}
                            >
                                <item.icon className="w-5 h-5 mr-4" />
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center p-3 rounded-lg transition-colors text-md text-text-body hover:bg-red-100 hover:text-red-600"
                >
                    <LogoutIcon className="w-5 h-5 mr-4" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [activeView, setActiveView] = useState<AdminView>('overview');

    const renderView = () => {
        switch (activeView) {
            case 'overview': return <AdminOverview />;
            case 'users': return <AdminUserManagement />;
            case 'sessions': return <AdminSessionManagement />;
            case 'analytics': return <AdminAnalytics />;
            case 'content': return <AdminContentManagement />;
            case 'reports': return <AdminReports />;
            default: return <AdminOverview />;
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-primary-light to-bg-end flex">
            <AdminSidebar activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />
            <main className="flex-1 transition-all duration-300 md:ml-64">
                <div className="w-full p-4 sm:p-6 lg:p-8 animate-fade-in">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;