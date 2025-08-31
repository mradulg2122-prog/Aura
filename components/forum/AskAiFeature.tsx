import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { getAiResponse } from '../../services/geminiService';
import { SendIcon, SparklesIcon } from '../common/Icons';

const AskAiFeature: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (question.trim() === '' || isLoading) return;

        setIsLoading(true);
        setError('');
        setAnswer('');
        try {
            // We can send a minimal history to frame the context for the AI
            const history = [{ sender: 'user' as const, text: 'I am a student asking for some advice.' }];
            const aiResponse = await getAiResponse(history, question);
            setAnswer(aiResponse);
        } catch (err) {
            setError('Sorry, I couldn\'t get a response. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
    };

    return (
        <GlassCard>
            <div className="text-center">
                <SparklesIcon className="w-12 h-12 mx-auto text-accent mb-2" />
                <h2 className="text-2xl font-bold text-text-heading mb-2">Ask Aura AI</h2>
                <p className="text-text-muted mb-6">Have a question? Ask anonymously and get a supportive answer from our friendly AI. Your identity is always kept private here.</p>
            </div>

            <div className="space-y-4">
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="E.g., How can I deal with feeling homesick?"
                    disabled={isLoading}
                    className="w-full p-3 h-28 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-accent text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
                >
                    {isLoading ? 'Thinking...' : 'Get an Answer'}
                    <SendIcon className="w-5 h-5"/>
                </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

            {answer && !isLoading && (
                <div className="mt-6 pt-4 border-t border-white/30 animate-fade-in">
                    <h3 className="font-semibold text-text-heading mb-2">Aura's Response:</h3>
                    <div className="bg-white/40 p-4 rounded-lg prose prose-sm max-w-none text-text-body">
                        {answer.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            )}
        </GlassCard>
    );
};

export default AskAiFeature;
