import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { AUDIT_TEST, ASSIST_TEST } from '../../data/screeningTests';
import { ScreeningTest, InAppScreeningResults } from '../../types';

type Stage = 'menu' | 'taking-test' | 'results';
type TestResult = {
    testId: 'audit' | 'assist';
    score: number | Record<string, number>;
    interpretation: { level: string; message: string; isHighRisk: boolean; };
};

const Screening: React.FC = () => {
    const [stage, setStage] = useState<Stage>('menu');
    const [activeTest, setActiveTest] = useState<ScreeningTest | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [result, setResult] = useState<TestResult | null>(null);

    const handleStartTest = (test: ScreeningTest) => {
        setActiveTest(test);
        setAnswers(Array(test.questions.length).fill(null));
        setCurrentQuestion(0);
        setStage('taking-test');
    };

    const handleAnswer = (score: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = score;
        setAnswers(newAnswers);

        // Automatically move to next question
        setTimeout(() => {
            if (activeTest && currentQuestion < activeTest.questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                handleShowResult(newAnswers);
            }
        }, 300);
    };
    
    const handleBack = () => {
        if(currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleShowResult = (finalAnswers: (number | null)[]) => {
        if (!activeTest) return;

        let finalScore: number | Record<string, number>;
        if (activeTest.id === 'assist') {
            const scoreObject: Record<string, number> = {};
            activeTest.questions.forEach((q, index) => {
                const substanceName = q.text.split(' ')[0];
                scoreObject[substanceName] = finalAnswers[index] || 0;
            });
            finalScore = scoreObject;
        } else {
            finalScore = finalAnswers.reduce((sum, score) => sum + (score || 0), 0);
        }

        const interpretation = activeTest.getInterpretation(finalScore);
        const newResult: TestResult = { testId: activeTest.id, score: finalScore, interpretation };
        setResult(newResult);
        setStage('results');
        
        // Save result to local storage
        const resultsRaw = localStorage.getItem('aura-in-app-screening-results');
        const allResults: InAppScreeningResults = resultsRaw ? JSON.parse(resultsRaw) : { date: new Date().toISOString() };
        
        if(activeTest.id === 'audit') {
            allResults['audit'] = { score: finalScore as number, ...interpretation };
        } else {
            allResults.assist = { scores: finalScore as Record<string, number>, ...interpretation };
        }
        allResults.date = new Date().toISOString();
        localStorage.setItem('aura-in-app-screening-results', JSON.stringify(allResults));
        window.dispatchEvent(new Event('storage')); // Notify other components of storage change
    };

    const reset = () => {
        setStage('menu');
        setActiveTest(null);
        setCurrentQuestion(0);
        setAnswers([]);
        setResult(null);
    };

    const renderMenu = () => (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-text-heading mb-2">Self-Assessments</h1>
            <p className="text-text-muted mb-8">Confidential screening tools to help you understand your habits.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard className="flex flex-col items-center text-center p-8">
                    <h2 className="text-xl font-bold text-text-heading mb-2">{AUDIT_TEST.title}</h2>
                    <p className="text-text-body text-sm mb-6 flex-grow">{AUDIT_TEST.description}</p>
                    <button onClick={() => handleStartTest(AUDIT_TEST)} className="bg-accent text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                        Start Test
                    </button>
                </GlassCard>
                <GlassCard className="flex flex-col items-center text-center p-8">
                    <h2 className="text-xl font-bold text-text-heading mb-2">{ASSIST_TEST.title}</h2>
                    <p className="text-text-body text-sm mb-6 flex-grow">{ASSIST_TEST.description}</p>
                    <button onClick={() => handleStartTest(ASSIST_TEST)} className="bg-accent text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
                        Start Test
                    </button>
                </GlassCard>
            </div>
        </div>
    );
    
    const renderTest = () => {
        if (!activeTest) return null;
        const progress = ((currentQuestion + 1) / activeTest.questions.length) * 100;
        const question = activeTest.questions[currentQuestion];
        const titlePrefix = activeTest.id === 'assist' ? 'In the past 3 months, how often have you used:' : '';

        return (
            <GlassCard className="max-w-2xl mx-auto animate-slide-in">
                <h2 className="text-xl font-semibold text-text-heading text-center mb-2">{activeTest.title}</h2>
                <div className="w-full bg-white/40 rounded-full h-2.5 my-4">
                    <div className="bg-accent h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                
                <div className="text-center my-8 min-h-[6rem] flex flex-col items-center justify-center">
                    {titlePrefix && <p className="text-text-muted mb-2">{titlePrefix}</p>}
                    <p className="text-lg text-text-body font-semibold">{question.text}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {question.options.map((opt, index) => (
                        <button key={index} onClick={() => handleAnswer(opt.score)} className="p-3 bg-white/60 rounded-lg text-text-body font-semibold hover:bg-accent-light hover:scale-105 transition-all text-sm">
                            {opt.text}
                        </button>
                    ))}
                </div>
                <div className="mt-6 flex justify-between">
                    <button onClick={handleBack} disabled={currentQuestion === 0} className="text-sm bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 disabled:opacity-50">Back</button>
                    {/* Next is automatic, but a manual button could be placed here */}
                </div>
            </GlassCard>
        );
    };

    const renderResults = () => {
        if (!result) return null;
        
        return (
            <GlassCard className="max-w-2xl mx-auto animate-fade-in text-center">
                 <h2 className="text-2xl font-bold text-text-heading mb-4">Test Complete</h2>
                 {result.interpretation.isHighRisk && (
                    <div className="p-4 bg-red-100 border border-red-200 text-red-800 rounded-lg mb-6">
                        <h3 className="font-bold">High-Risk Results Detected</h3>
                        <p className="text-sm">These results indicate a potential high risk. Please consider discussing them with a trusted healthcare professional.</p>
                    </div>
                 )}
                 <h3 className="text-lg font-semibold text-text-body">Your Result: <span className={`font-bold ${result.interpretation.isHighRisk ? 'text-red-600' : 'text-green-600'}`}>{result.interpretation.level}</span></h3>
                 {result.testId === 'audit' && <p className="text-5xl font-bold my-4 text-accent">{result.score as number}</p>}
                 <p className="text-text-body text-sm mt-4">{result.interpretation.message}</p>
                 <button onClick={reset} className="mt-8 bg-accent text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90">Back to Menu</button>
            </GlassCard>
        );
    };

    switch (stage) {
        case 'taking-test': return renderTest();
        case 'results': return renderResults();
        case 'menu':
        default: return renderMenu();
    }
};

export default Screening;