import { Article } from '../types';

export const initialArticles: Article[] = [
  {
    id: 'mindfulness-101',
    title: 'Introduction to Mindfulness',
    content: '<p>Mindfulness is the practice of paying attention to the present moment without judgment. It can involve meditation, breathing exercises, and simply being aware of your surroundings.</p><p>Studies show that regular mindfulness practice can reduce symptoms of stress, anxiety, and depression.</p>',
    author: 'Aura Staff',
    userId: 'system',
    isAnonymous: false,
    publishDate: new Date('2024-05-20T10:00:00Z').toISOString(),
    tags: ['Mindfulness', 'Stress Relief'],
  },
  {
    id: 'cbt-basics',
    title: 'Understanding CBT',
    content: '<p>Cognitive Behavioral Therapy (CBT) is a type of psychotherapy that helps people learn how to identify and change destructive or disturbing thought patterns that have a negative influence on behavior and emotions.</p><ul><li>Identify negative thoughts.</li><li>Challenge those thoughts.</li><li>Replace them with more objective, realistic thoughts.</li></ul>',
    author: 'Aura Staff',
    userId: 'system',
    isAnonymous: false,
    publishDate: new Date('2024-05-18T14:30:00Z').toISOString(),
    tags: ['Techniques', 'CBT', 'Anxiety'],
  },
  {
    id: 'exam-stress',
    title: 'Managing Exam Pressure',
    content: '<p>Exam periods can be incredibly stressful. It\'s important to manage your time effectively with a study schedule, take regular breaks to avoid burnout (like the Pomodoro Technique), ensure you get 7-8 hours of sleep, and eat nutritious meals.</p><p><i>Don\'t forget to talk to friends or family about how you\'re feeling. You are not alone in this.</i></p>',
    author: 'Aura Staff',
    userId: 'system',
    isAnonymous: false,
    publishDate: new Date('2024-05-15T09:00:00Z').toISOString(),
    tags: ['Student Life', 'Exams', 'Stress'],
  }
];
