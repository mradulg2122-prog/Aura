import React, { useState, useEffect } from 'react';
import GlassCard from '../common/GlassCard';
import { ClipboardIcon } from '../common/Icons';
import { InAppScreeningResults } from '../../types';

interface OnboardingScreeningResult {
    date: string;
    phq9: number;
    gad7: number;
}

const getOnboardingScoreInterpretation = (score: number, type: 'phq9' | 'gad7') => {
    if (type === 'phq9') {
        if (score <= 4) return { level: "Minimal", color: "bg-green-500" };
        if (score <= 9) return { level: "Mild", color: "bg-yellow-400" };
        if (score <= 14) return { level: "Moderate", color: "bg-orange-500" };
        if (score <= 19) return { level: "Moderately Severe", color: "bg-red-500" };
        return { level: "Severe", color: "bg-red-700" };
    } else { // gad7
        if (score <= 4) return { level: "Minimal", color: "bg-green-500" };
        if (score <= 9) return { level: "Mild", color: "bg-yellow-400" };
        if (score <= 14) return { level: "Moderate", color: "bg-orange-500" };
        return { level: "Severe", color: "bg-red-700" };
    }
};

const ScreeningSummary: React.FC = () => {
    const [onboardingResult, setOnboardingResult] = useState<OnboardingScreeningResult | null>(null);
    const [inAppResults, setInAppResults] = useState<InAppScreeningResults | null>(null);

    const updateResults = () => {
        // Onboarding results
        const onboardingResultsRaw = localStorage.getItem('aura-screening-results');
        if (onboardingResultsRaw) {
            try {
                const results: OnboardingScreeningResult[] = JSON.parse(onboardingResultsRaw);
                if (results.length > 0) {
                    setOnboardingResult(results[results.length - 1]);
                }
            } catch (e) {
                console.error("Failed to parse onboarding screening results", e);
            }
        }
        
        // In-app screening results
        const inAppResultsRaw = localStorage.getItem('aura-in-app-screening-results');
        if(inAppResultsRaw){
            try {
                const results: InAppScreeningResults = JSON.parse(inAppResultsRaw);
                setInAppResults(results);
            } catch(e) {
                console.error("Failed to parse in-app screening results", e);
            }
        }
    };

    useEffect(() => {
        updateResults();
        window.addEventListener('storage', updateResults);
        return () => window.removeEventListener('storage', updateResults);
    }, []);
    
    if (!onboardingResult && !inAppResults) {
        return (
            <GlassCard>
                <h2 className="text-xl font-semibold text-text-heading dark:text-dark-text-heading mb-4">Screening Results</h2>
                <p className="text-text-body dark:text-dark-text-body text-sm mb-4">You haven't completed a screening yet. Take one to see your results here.</p>
                {/* This button should navigate to the screening page */}
                <button className="w-full bg-accent text-white font-semibold py-2 rounded-lg hover:bg-opacity-90 transition-colors">Take Assessment</button>
            </GlassCard>
        );
    }
    
    const phq9Interp = onboardingResult ? getOnboardingScoreInterpretation(onboardingResult.phq9, 'phq9') : null;
    const gad7Interp = onboardingResult ? getOnboardingScoreInterpretation(onboardingResult.gad7, 'gad7') : null;

    return (
        <GlassCard>
            <div className="flex items-center gap-3 mb-4">
                <ClipboardIcon className="w-6 h-6 text-accent"/>
                <h2 className="text-xl font-semibold text-text-heading dark:text-dark-text-heading">Your Screening Results</h2>
            </div>
            
            {onboardingResult && phq9Interp && gad7Interp && (
                 <div className="mb-4">
                    <h3 className="font-bold text-text-heading dark:text-dark-text-heading text-md mb-2">Mental Health Check-in</h3>
                    <p className="text-xs text-text-muted dark:text-dark-text-muted mb-3">From your onboarding on: {new Date(onboardingResult.date).toLocaleDateString()}</p>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-semibold text-text-body dark:text-dark-text-body text-sm">Depression (PHQ-9)</h4>
                                <p className={`text-xs font-bold`}>{onboardingResult.phq9}/27 - {phq9Interp.level}</p>
                            </div>
                            <div className="w-full bg-white/40 dark:bg-black/20 rounded-full h-3">
                                <div className={`${phq9Interp.color} h-3 rounded-full`} style={{ width: `${(onboardingResult.phq9 / 27) * 100}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-semibold text-text-body dark:text-dark-text-body text-sm">Anxiety (GAD-7)</h4>
                                <p className={`text-xs font-bold`}>{onboardingResult.gad7}/21 - {gad7Interp.level}</p>
                            </div>
                            <div className="w-full bg-white/40 dark:bg-black/20 rounded-full h-3">
                                <div className={`${gad7Interp.color} h-3 rounded-full`} style={{ width: `${(onboardingResult.gad7 / 21) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {inAppResults && (inAppResults['audit'] || inAppResults.assist) && (
                <div className="mt-4 pt-4 border-t border-white/30 dark:border-dark-card-border">
                    <h3 className="font-bold text-text-heading dark:text-dark-text-heading text-md mb-2">Substance Use Screening</h3>
                     <p className="text-xs text-text-muted dark:text-dark-text-muted mb-3">Last taken on: {new Date(inAppResults.date).toLocaleDateString()}</p>
                     <div className="space-y-3">
                        {inAppResults['audit'] && (
                             <div className="text-sm bg-white/40 dark:bg-black/20 p-3 rounded-lg">
                                <p className="font-semibold text-text-body dark:text-dark-text-body">Alcohol (AUDIT): <span className={`font-bold ${inAppResults['audit'].isHighRisk ? 'text-red-600' : 'text-green-600'}`}>{inAppResults['audit'].level}</span></p>
                            </div>
                        )}
                         {inAppResults.assist && (
                             <div className="text-sm bg-white/40 dark:bg-black/20 p-3 rounded-lg">
                                <p className="font-semibold text-text-body dark:text-dark-text-body">Other Substances (ASSIST): <span className={`font-bold ${inAppResults.assist.isHighRisk ? 'text-red-600' : 'text-green-600'}`}>{inAppResults.assist.level}</span></p>
                            </div>
                        )}
                     </div>
                </div>
            )}
        </GlassCard>
    );
}

export default ScreeningSummary;