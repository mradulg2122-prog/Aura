

import { ForumPost, Comment } from '../types';

export const forumPosts: ForumPost[] = [
  {
    id: 1,
    author: 'AnonymousPanda',
    userId: 'user_abc',
    isAnonymous: true,
    title: 'Finals ka bahut tension hai yaar!',
    content: 'Does anyone else feel completely swamped with final exams coming up? I\'m having trouble focusing and my anxiety is through the roof. Any tips on how to manage this? Sab upar se jaa raha hai.',
    timestamp: '2 hours ago',
    likes: 15,
    likedBy: [],
    comments: [
      // Fix: Added missing properties to conform to the Comment type.
      { id: 'c1-1', author: 'QuietFox', content: 'Same here! I\'ve been trying the Pomodoro Technique (25 min study, 5 min chai break) and it seems to help a bit. Tension mat le!', userId: 'user_def', isAnonymous: false, timestamp: '1 hour ago' },
      // Fix: Added missing properties to conform to the Comment type.
      { id: 'c1-2', author: 'WiseOwl', content: 'Make sure you\'re getting enough sleep. Pulling all-nighters will only make it worse. Hum sab saath hain, you got this!', userId: 'user_ghi', isAnonymous: true, timestamp: '30 mins ago' }
    ]
  },
  {
    id: 2,
    author: 'StarlightSeeker',
    userId: 'user_jkl',
    isAnonymous: false,
    title: 'Hostel life feels lonely sometimes...',
    content: 'I moved to a new city for my degree and I still haven\'t really made any close friends. It feels really lonely sometimes, especially during weekends. How did you all make friends in your first year?',
    timestamp: '1 day ago',
    likes: 22,
    likedBy: [],
    comments: [
      // Fix: Added missing properties to conform to the Comment type.
      { id: 'c2-1', author: 'FriendlyBadger', content: 'Joining college clubs is a great way! I met my best friends in the drama club. Find something you\'re interested in, yaar.', userId: 'user_mno', isAnonymous: false, timestamp: '23 hours ago' },
      // Fix: Added missing properties to conform to the Comment type.
      { id: 'c2-2', author: 'HappySparrow', content: 'Aap akela nahi ho. Just start by saying hi to people in your classes or in the mess. Small steps help a lot!', userId: 'user_pqr', isAnonymous: false, timestamp: '22 hours ago' }
    ]
  }
];
