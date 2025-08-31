import React, { useState, useEffect } from 'react';
import GlassCard from '../common/GlassCard';
import { BookIcon, PhoneIcon, UsersIcon } from '../common/Icons';
import { ForumPost, View } from '../../types';

interface CommunitySupportProps {
    setCurrentView: (view: View) => void;
}
// Mock current user ID
const MOCK_USER_ID = 'user_1';

const CommunitySupport: React.FC<CommunitySupportProps> = ({ setCurrentView }) => {
    const [latestActivity, setLatestActivity] = useState<{type: string, text: string} | null>(null);

    useEffect(() => {
        const getLatestActivity = () => {
            const postsRaw = localStorage.getItem('aura-forum-posts');
            if (postsRaw) {
                try {
                    const posts: ForumPost[] = JSON.parse(postsRaw);
                    const userPosts = posts.filter(p => p.userId === MOCK_USER_ID);
                    const userComments = posts.flatMap(p => 
                        p.comments
                         .filter(c => c.userId === MOCK_USER_ID)
                         .map(c => ({...c, parentTitle: p.title}))
                    );

                    const latestPost = userPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
                    const latestComment = userComments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

                    if (!latestPost && !latestComment) {
                        setLatestActivity(null);
                        return;
                    }
                    
                    if (latestPost && (!latestComment || new Date(latestPost.timestamp) > new Date(latestComment.timestamp))) {
                        setLatestActivity({ type: 'You posted in', text: `"${latestPost.title}"` });
                    } else if (latestComment) {
                         setLatestActivity({ type: 'You commented on', text: `"${latestComment.parentTitle}"` });
                    }
                } catch (e) {
                    console.error("Failed to parse forum posts for dashboard widget", e);
                    setLatestActivity(null);
                }
            }
        };

        getLatestActivity();
        
        // Listen for storage changes to update activity if user posts/comments
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'aura-forum-posts') {
                getLatestActivity();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        
        return () => window.removeEventListener('storage', handleStorageChange);

    }, []);

    return (
        <GlassCard>
            <h2 className="text-xl font-semibold text-text-heading dark:text-dark-text-heading mb-4">Community & Support</h2>

            <div className="mb-4">
                <h3 className="font-semibold text-text-body dark:text-dark-text-body text-sm mb-2">Your Recent Activity</h3>
                <div className="bg-white/40 dark:bg-black/20 p-3 rounded-lg text-sm">
                    {latestActivity ? (
                        <>
                            <p className="font-semibold text-text-body dark:text-dark-text-body">{latestActivity.type}</p>
                            <p className="text-xs text-text-muted dark:text-dark-text-muted truncate">{latestActivity.text}</p>
                        </>
                    ) : (
                        <p className="text-xs text-text-muted dark:text-dark-text-muted">You haven't posted anything yet. Join a discussion!</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                 <button onClick={() => setCurrentView('forum')} className="w-full bg-white/60 dark:bg-black/20 text-accent font-semibold py-2 rounded-lg hover:bg-accent-light dark:hover:bg-accent/20 transition-colors text-sm flex items-center justify-center gap-2">
                    <UsersIcon className="w-4 h-4" />
                    Go to Peer Forum
                </button>
                 <button onClick={() => setCurrentView('helpline')} className="w-full bg-white/60 dark:bg-black/20 text-accent font-semibold py-2 rounded-lg hover:bg-accent-light dark:hover:bg-accent/20 transition-colors text-sm flex items-center justify-center gap-2">
                    <PhoneIcon className="w-4 h-4" />
                    Find Helplines
                </button>
                 <button onClick={() => setCurrentView('resources')} className="w-full bg-white/60 dark:bg-black/20 text-accent font-semibold py-2 rounded-lg hover:bg-accent-light dark:hover:bg-accent/20 transition-colors text-sm flex items-center justify-center gap-2">
                    <BookIcon className="w-4 h-4" />
                    Explore Resources
                </button>
            </div>
        </GlassCard>
    );
};

export default CommunitySupport;