import { Resource } from '../types';

export const resources: Resource[] = [
  {
    id: 'mindfulness-101',
    category: 'Stress Relief',
    content: {
      en: {
        title: 'Introduction to Mindfulness',
        summary: 'Learn the basics of mindfulness and how it can help reduce stress and anxiety.',
        content: '<p>Mindfulness is the practice of paying attention to the present moment without judgment. It can involve meditation, breathing exercises, and simply being aware of your surroundings.</p><p>Studies show that regular mindfulness practice can reduce symptoms of stress, anxiety, and depression.</p>',
      },
      // Stubs for other languages
      es: { title: 'Introducción a Mindfulness', summary: '', content: '' },
      fr: { title: 'Introduction à la Pleine Conscience', summary: '', content: '' },
      de: { title: 'Einführung in die Achtsamkeit', summary: '', content: '' },
      zh: { title: '正念入门', summary: '', content: '' },
      hi: { title: 'माइंडफुलनेस का परिचय', summary: '', content: '' },
    },
  },
  {
    id: 'cbt-basics',
    category: 'Techniques',
    content: {
      en: {
        title: 'Understanding CBT',
        summary: 'Discover Cognitive Behavioral Therapy and how it helps change negative thought patterns.',
        content: '<p>Cognitive Behavioral Therapy (CBT) is a type of psychotherapy that helps people learn how to identify and change destructive or disturbing thought patterns that have a negative influence on behavior and emotions.</p><ul><li>Identify negative thoughts.</li><li>Challenge those thoughts.</li><li>Replace them with more objective, realistic thoughts.</li></ul>',
      },
      es: { title: 'Entendiendo la TCC', summary: '', content: '' },
      fr: { title: 'Comprendre la TCC', summary: '', content: '' },
      de: { title: 'CBT verstehen', summary: '', content: '' },
      zh: { title: '理解CBT', summary: '', content: '' },
      hi: { title: 'सीबीटी को समझना', summary: '', content: '' },
    },
  },
  {
    id: 'exam-stress',
    category: 'Student Life',
    content: {
      en: {
        title: 'Managing Exam Pressure',
        summary: 'Effective strategies to cope with the stress and pressure of exams.',
        content: '<p>Exam periods can be incredibly stressful. It\'s important to manage your time effectively with a study schedule, take regular breaks to avoid burnout (like the Pomodoro Technique), ensure you get 7-8 hours of sleep, and eat nutritious meals.</p><p><i>Don\'t forget to talk to friends or family about how you\'re feeling. You are not alone in this.</i></p>',
      },
      es: { title: 'Manejando la Presión de los Exámenes', summary: '', content: '' },
      fr: { title: 'Gérer la Pression des Examens', summary: '', content: '' },
      de: { title: 'Prüfungsdruck bewältigen', summary: '', content: '' },
      zh: { title: '管理考试压力', summary: '', content: '' },
      hi: { title: 'परीक्षा दबाव का प्रबंधन', summary: '', content: '' },
    },
  },
];
