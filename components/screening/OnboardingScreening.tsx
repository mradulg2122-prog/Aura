import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';

const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself, or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless",
    "Thoughts that you would be better off dead, or of hurting yourself"
];

const gad7Questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen"
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

interface OnboardingScreeningProps {
  onComplete: () => void;
}

const OnboardingScreening: React.FC<OnboardingScreeningProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'intro' | 'phq9' | 'gad7' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({ phq9: [], gad7: [] });

  const handleAnswer = (score: number) => {
    if (stage === 'phq9') {
      const newAnswers = [...answers.phq9, score];
      setAnswers(prev => ({ ...prev, phq9: newAnswers }));
      if (currentQuestion < phq9Questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setStage('gad7');
        setCurrentQuestion(0);
      }
    } else if (stage === 'gad7') {
      const newAnswers = [...answers.gad7, score];
      setAnswers(prev => ({ ...prev, gad7: newAnswers }));
      if (currentQuestion < gad7Questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const phq9Total = answers.phq9.reduce((sum, val) => sum + val, 0);
        const gad7Total = newAnswers.reduce((sum, val) => sum + val, 0);
        
        const results = {
            date: new Date().toISOString(),
            phq9: phq9Total,
            gad7: gad7Total
        };
        localStorage.setItem('aura-screening-results', JSON.stringify([results]));
        setStage('complete');
      }
    }
  };

  const getProgress = () => {
    if (stage === 'phq9') return ((currentQuestion + 1) / phq9Questions.length) * 100;
    if (stage === 'gad7') return ((currentQuestion + 1) / gad7Questions.length) * 100;
    return 0;
  };
  
  const questions = stage === 'phq9' ? phq9Questions : gad7Questions;
  const title = stage === 'phq9' ? "Depression Screening (PHQ-9)" : "Anxiety Screening (GAD-7)";

  if (stage === 'intro') {
    return (
        <GlassCard className="w-11/12 max-w-lg text-center p-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-text-heading mb-4">Welcome to Aura</h1>
            <p className="text-text-body mb-6">Let's start with a quick, confidential check-in to understand how you've been feeling. This will help personalize your experience.</p>
            <button onClick={() => setStage('phq9')} className="bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors">Begin Check-in</button>
        </GlassCard>
    );
  }
  
  if (stage === 'complete') {
    return (
        <GlassCard className="w-11/12 max-w-lg text-center p-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-text-heading mb-4">Thank you for completing the test.</h1>
            <p className="text-text-body mb-6">Remember, awareness is the first step to wellness 💙</p>
            <button onClick={onComplete} className="bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors">Continue to Dashboard</button>
        </GlassCard>
    );
  }

  return (
    <GlassCard className="w-11/12 max-w-lg p-8 animate-slide-in">
        <h2 className="text-xl font-semibold text-text-heading text-center mb-2">{title}</h2>
        <p className="text-sm text-text-muted text-center mb-6">Over the last 2 weeks, how often have you been bothered by this?</p>
        
        <div className="w-full bg-white/40 rounded-full h-2.5 mb-6">
            <div className="bg-accent h-2.5 rounded-full transition-all duration-500" style={{ width: `${getProgress()}%` }}></div>
        </div>

        <p className="text-lg text-text-body font-semibold text-center mb-8 min-h-[5rem] flex items-center justify-center">
          {questions[currentQuestion]}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {options.map((option, index) => (
                <button 
                    key={index} 
                    onClick={() => handleAnswer(index)} 
                    className="p-3 bg-white/60 rounded-lg text-text-body font-semibold hover:bg-accent-light hover:scale-105 transition-all"
                >
                    {option}
                </button>
            ))}
        </div>
    </GlassCard>
  );
};

export default OnboardingScreening;
