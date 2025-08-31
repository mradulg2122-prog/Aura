import { Counselor } from '../types';

export const counselors: Counselor[] = [
  { 
    id: 1, 
    name: 'Dr. Priya Sharma', 
    specialty: 'Anxiety & Exam Stress', 
    imageUrl: 'https://picsum.photos/id/1027/200/200', 
    bio: 'Specializes in Cognitive Behavioral Therapy (CBT) for students facing academic pressure. Helps build coping mechanisms for stress and anxiety.',
    languages: ['English', 'Hindi'],
    availability: ['Weekdays', 'Evenings']
  },
  { 
    id: 2, 
    name: 'Dr. Rohan Verma', 
    specialty: 'Depression & Mood Swings', 
    imageUrl: 'https://picsum.photos/id/1005/200/200', 
    bio: 'Focuses on mindfulness and acceptance-based strategies to help students manage mood disorders and find emotional balance.',
    languages: ['English'],
    availability: ['Weekdays', 'Weekends']
  },
  { 
    id: 3, 
    name: 'Dr. Anjali Desai', 
    specialty: 'Relationships & Family Issues', 
    imageUrl: 'https://picsum.photos/id/1011/200/200', 
    bio: 'Expert in interpersonal therapy and communication skills, offering guidance on personal and family relationships.',
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: ['Weekdays']
  },
  { 
    id: 4, 
    name: 'Dr. Sameer Khan', 
    specialty: 'Career & Future Planning', 
    imageUrl: 'https://picsum.photos/id/1012/200/200',
    bio: 'Dr. Khan provides strategies and support for students feeling uncertain about their career path and future. Helps in decision-making and goal setting.',
    languages: ['English', 'Urdu'],
    availability: ['Evenings', 'Weekends']
  },
  { 
    id: 5, 
    name: 'Dr. Meera Iyer', 
    specialty: 'Trauma & PTSD', 
    imageUrl: 'https://picsum.photos/id/219/200/200',
    bio: 'A compassionate therapist trained in trauma-informed care, providing a safe space for healing and recovery.',
    languages: ['English', 'Tamil'],
    availability: ['Weekdays', 'Weekends']
  },
];