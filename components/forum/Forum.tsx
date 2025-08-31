import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '../common/GlassCard';
import { type ForumPost, type View, type Comment } from '../../types';
import { HeartIcon, MessageSquareIcon, ImageIcon, Trash2Icon } from '../common/Icons';
import QuickSupport from './QuickSupport';

// Mock current user ID, in a real app this would come from an auth context
const MOCK_USER_ID = 'user_1';

const initialPostsData: Omit<ForumPost, 'userId' | 'isAnonymous' | 'likes' | 'likedBy'>[] = [
  {
    id: 1,
    author: 'AnonymousPanda',
    title: 'Finals ka bahut tension hai yaar!',
    content: 'Does anyone else feel completely swamped with final exams coming up? I\'m having trouble focusing and my anxiety is through the roof. Any tips on how to manage this? Sab upar se jaa raha hai.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    comments: [
      { id: 'c1-1', userId: 'user_2', isAnonymous: false, author: 'QuietFox', content: 'Same here! I\'ve been trying the Pomodoro Technique (25 min study, 5 min chai break) and it seems to help a bit. Tension mat le!', timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString() },
      { id: 'c1-2', userId: 'user_3', isAnonymous: true, author: 'WiseOwl', content: 'Make sure you\'re getting enough sleep. Pulling all-nighters will only make it worse. Hum sab saath hain, you got this!', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() }
    ]
  },
  {
    id: 2,
    author: 'StarlightSeeker',
    title: 'Hostel life feels lonely sometimes...',
    content: 'I moved to a new city for my degree and I still haven\'t really made any close friends. It feels really lonely sometimes, especially during weekends. How did you all make friends in your first year?',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      { id: 'c2-1', userId: 'user_4', isAnonymous: false, author: 'FriendlyBadger', content: 'Joining college clubs is a great way! I met my best friends in the drama club. Find something you\'re interested in, yaar.', timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString() },
    ]
  }
];

interface ForumProps {
    userName: string;
    isAnonymous: boolean;
    setCurrentView: (view: View) => void;
}

const Forum: React.FC<ForumProps> = ({ userName, isAnonymous, setCurrentView }) => {
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [showNewPostForm, setShowNewPostForm] = useState(false);
    
    // Form state
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

    useEffect(() => {
        try {
            const storedPosts = localStorage.getItem('aura-forum-posts');
            if (storedPosts) {
                setPosts(JSON.parse(storedPosts));
            } else {
                // Seed initial data
                const seededPosts: ForumPost[] = initialPostsData.map(p => ({
                    ...p,
                    userId: `user_${p.id + 10}`, // mock different user ids
                    isAnonymous: Math.random() > 0.5,
                    likes: Math.floor(Math.random() * 20),
                    likedBy: [],
                }));
                localStorage.setItem('aura-forum-posts', JSON.stringify(seededPosts));
                setPosts(seededPosts);
            }
        } catch (error) {
            console.error("Failed to load or seed forum posts:", error);
            // Handle corrupted data by resetting
            localStorage.removeItem('aura-forum-posts');
        }
    }, []);

    const updateAndStorePosts = (newPosts: ForumPost[]) => {
        const sortedPosts = newPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setPosts(sortedPosts);
        localStorage.setItem('aura-forum-posts', JSON.stringify(sortedPosts));
        window.dispatchEvent(new Event('storage')); // Notify dashboard widget
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setNewPostImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleNewPostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPostTitle.trim() && newPostContent.trim()) {
            const newPost: ForumPost = {
                id: Date.now(),
                author: isAnonymous ? 'Anonymous User' : userName,
                userId: MOCK_USER_ID,
                isAnonymous: isAnonymous,
                title: newPostTitle,
                content: newPostContent,
                imageUrl: newPostImage || undefined,
                timestamp: new Date().toISOString(),
                comments: [],
                likes: 0,
                likedBy: []
            };
            updateAndStorePosts([newPost, ...posts]);
            
            // Reset form
            setNewPostTitle('');
            setNewPostContent('');
            setNewPostImage(null);
            if(imageInputRef.current) imageInputRef.current.value = "";
            setShowNewPostForm(false);
        }
    };

    const handleLike = (postId: number) => {
        const newPosts = posts.map(post => {
            if (post.id === postId) {
                const alreadyLiked = post.likedBy.includes(MOCK_USER_ID);
                if (alreadyLiked) {
                    return {
                        ...post,
                        likes: post.likes - 1,
                        likedBy: post.likedBy.filter(id => id !== MOCK_USER_ID)
                    };
                } else {
                    return {
                        ...post,
                        likes: post.likes + 1,
                        likedBy: [...post.likedBy, MOCK_USER_ID]
                    };
                }
            }
            return post;
        });
        updateAndStorePosts(newPosts);
    };

    const handleComment = (postId: number) => {
        const content = commentInputs[postId];
        if (!content || content.trim() === '') return;

        const newComment: Comment = {
            id: `c${Date.now()}`,
            author: isAnonymous ? 'Anonymous User' : userName,
            userId: MOCK_USER_ID,
            isAnonymous: isAnonymous,
            content: content,
            timestamp: new Date().toISOString()
        };

        const newPosts = posts.map(post => {
            if (post.id === postId) {
                return { ...post, comments: [...post.comments, newComment] };
            }
            return post;
        });
        updateAndStorePosts(newPosts);
        setCommentInputs(prev => ({ ...prev, [postId]: '' })); // Clear input
    };
    
    const handleDeletePost = (postId: number) => {
        if(window.confirm("Are you sure you want to delete this post?")) {
            const newPosts = posts.filter(p => p.id !== postId);
            updateAndStorePosts(newPosts);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading mb-2">Community Feed</h1>
                    <p className="text-text-muted">Connect with peers and find the support you need.</p>
                </div>
                <button onClick={() => setShowNewPostForm(true)} className="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors hidden sm:block">
                    New Post
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <main className="lg:col-span-8">
                    <div className="space-y-6">
                        {posts.map(post => (
                            <GlassCard key={post.id}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-bold text-text-heading">{post.title}</h2>
                                        <p className="text-xs text-text-muted">By {post.author} &bull; {new Date(post.timestamp).toLocaleString()}</p>
                                    </div>
                                    {post.userId === MOCK_USER_ID && (
                                        <button onClick={() => handleDeletePost(post.id)} className="text-gray-400 hover:text-red-500" title="Delete Post">
                                            <Trash2Icon className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                                <p className="text-text-body my-4">{post.content}</p>
                                {post.imageUrl && <img src={post.imageUrl} alt="User upload" className="mt-4 rounded-lg max-h-80 w-auto" />}

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/30">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => handleLike(post.id)} className="flex items-center gap-2 text-text-muted hover:text-red-500 transition-colors" aria-label="Like post">
                                            <HeartIcon className={`w-6 h-6 ${post.likedBy.includes(MOCK_USER_ID) ? 'fill-red-500 text-red-500' : 'fill-none'}`} />
                                            <span>{post.likes}</span>
                                        </button>
                                        <div className="flex items-center gap-2 text-text-muted">
                                            <MessageSquareIcon className="w-6 h-6"/>
                                            <span>{post.comments.length}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => alert('Post reported. Thank you for keeping the community safe.')} className="text-xs text-text-muted hover:text-accent">Report</button>
                                </div>

                                {/* Comments Section */}
                                <div className="mt-4 pt-4 border-t border-white/30">
                                    {post.comments.map(comment => (
                                        <div key={comment.id} className="bg-white/40 p-3 rounded-lg mt-2">
                                            <p className="font-bold text-accent text-sm">{comment.author}</p>
                                            <p className="text-text-body text-sm">{comment.content}</p>
                                        </div>
                                    ))}
                                    <div className="mt-4 flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                            value={commentInputs[post.id] || ''}
                                            onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                            onKeyPress={e => e.key === 'Enter' && handleComment(post.id)}
                                            className="w-full p-2 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent text-sm"
                                        />
                                        <button onClick={() => handleComment(post.id)} className="bg-accent text-white font-semibold px-4 rounded-lg text-sm">Post</button>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </main>
                <aside className="lg:col-span-4">
                    <QuickSupport setCurrentView={setCurrentView} />
                </aside>
            </div>
      
            {showNewPostForm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" onClick={() => setShowNewPostForm(false)}>
                    <GlassCard className="w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-text-heading mb-4">Create a New Post</h2>
                        <form onSubmit={handleNewPostSubmit} className="flex-1 overflow-y-auto pr-2">
                            <input type="text" placeholder="Title" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} required className="w-full p-2 mb-4 rounded-lg bg-white/80 text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"/>
                            <textarea placeholder="Share your thoughts..." value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} required className="w-full p-2 h-40 mb-4 rounded-lg bg-white/80 text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
                            
                            {newPostImage && <img src={newPostImage} alt="Preview" className="max-h-40 rounded-lg mb-2"/>}

                            <label htmlFor="image-upload" className="cursor-pointer flex items-center gap-2 text-sm p-2 rounded-lg bg-white/60 hover:bg-accent-light text-text-body">
                                <ImageIcon className="w-5 h-5"/>
                                <span>{newPostImage ? 'Change Image' : 'Add Image (Optional)'}</span>
                            </label>
                            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} ref={imageInputRef} className="hidden"/>
                        </form>
                         <div className="flex justify-end space-x-4 mt-4 pt-4 border-t border-white/30">
                            <button type="button" onClick={() => setShowNewPostForm(false)} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                            <button type="submit" onClick={handleNewPostSubmit} className="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90">Post</button>
                        </div>
                    </GlassCard>
                </div>
            )}
             <button onClick={() => setShowNewPostForm(true)} className="fixed bottom-6 right-6 bg-accent text-white p-4 rounded-full shadow-lg sm:hidden z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </button>
        </div>
    );
};

export default Forum;