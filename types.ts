import React from 'react';

export type View = 'dashboard' | 'user-dashboard' | 'booking' | 'resources' | 'forum' | 'screening' | 'helpline' | 'my-sessions' | 'find-therapist' | 'yoga';

export interface Counselor {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  bio: string;
  languages: string[];
  availability: string[];
}

export interface Session {
  id: number;
  userId: string;
  counselor: Counselor;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM AM/PM"
  type: 'Video' | 'Chat' | 'Voice';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface Comment {
  id: string;
  author: string; // Display name
  userId: string;
  isAnonymous: boolean;
  content: string;
  timestamp: string;
}

export interface ForumPost {
  id: number;
  author: string; // Display name
  userId: string;
  isAnonymous: boolean;
  title: string;
  content: string;
  imageUrl?: string; // Optional image URL
  timestamp: string;
  comments: Comment[];
  likes: number;
  likedBy: string[]; // Array of user IDs who liked the post
}

// Fix: Added missing ChatMessage type for AI chat feature.
export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}


export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'hi';

export interface ResourceContent {
  title: string;
  summary: string;
  content: string;
}

export interface Resource {
  id: string;
  category: string;
  content: Record<Language, ResourceContent>;
}

export interface Article {
  id:string;
  title: string;
  content: string; // Stored as HTML string
  author: string; // Display name
  userId: string;
  isAnonymous: boolean;
  publishDate: string; // ISO string
  tags: string[];
}


export interface Game {
  id:string;
  title: string;
  description: string;
  Icon: React.FC<{ className?: string }>;
  Component: React.FC;
}

// Types for User Dashboard
export interface UserProfile {
    name: string;
    avatarUrl?: string;
    lastLogin: string;
    preferredLanguage: Language;
    isAnonymous: boolean;
}

export interface MoodEntry {
    date: string; // e.g., 'Mon' or 'Day 1'
    mood: number; // 1 (worst) to 5 (best)
}

export interface AssessmentRecord {
    date: string; // e.g., 'Mar'
    phq9: number;
    gad7: number;
}

export interface ResourceUsage {
    id: string;
    title: string;
    type: 'Article' | 'Game';
    lastAccessed: string;
}

export interface CommunityActivity {
    postId: number;
    postTitle: string;
    activity: 'Created a post' | 'Commented';
    timestamp: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    Icon: React.FC<{className?: string}>;
    unlocked: boolean;
}

// Admin Dashboard Types
export type UserRole = 'user' | 'admin';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  location: string;
  status: 'Active' | 'Anonymous' | 'Deactivated';
  lastLogin: string;
  phq9Score: number | null;
  gad7Score: number | null;
  isHighRisk: boolean;
}

// New types for in-app screening
export interface TestOption {
  text: string;
  score: number;
}

export interface TestQuestion {
  text: string;
  options: TestOption[];
}

export interface ScreeningTest {
  id: 'audit' | 'assist';
  title: string;
  description: string;
  questions: TestQuestion[];
  getInterpretation: (score: number | Record<string, number>) => {
    level: string;
    message: string;
    isHighRisk: boolean;
  };
}

export interface InAppScreeningResults {
  date: string;
  'audit'?: { score: number; level: string; isHighRisk: boolean };
  assist?: { scores: Record<string, number>; level: string; isHighRisk: boolean };
}

// New types for Yoga feature
export interface YogaPose {
  name: string;
  sanskritName: string;
  description: string;
  imageUrl: string;
  sketchfabEmbedUrl: string;
}

export interface YogaCategory {
  id: string;
  title: string;
  tagline: string;
  poses: YogaPose[];
}