import { ScreeningTest } from '../types';

export const AUDIT_TEST: ScreeningTest = {
  id: 'audit',
  title: 'AUDIT Alcohol Screening',
  description: 'A 10-question screening test to identify hazardous alcohol use, harmful alcohol use, and possible alcohol dependence. Your answers are confidential.',
  questions: [
    // Consumption
    {
      text: 'How often do you have a drink containing alcohol?',
      options: [
        { text: 'Never', score: 0 },
        { text: 'Monthly or less', score: 1 },
        { text: '2-4 times a month', score: 2 },
        { text: '2-3 times a week', score: 3 },
        { text: '4 or more times a week', score: 4 },
      ],
    },
    {
      text: 'How many standard drinks containing alcohol do you have on a typical day when you are drinking?',
      options: [
        { text: '1 or 2', score: 0 },
        { text: '3 or 4', score: 1 },
        { text: '5 or 6', score: 2 },
        { text: '7 to 9', score: 3 },
        { text: '10 or more', score: 4 },
      ],
    },
    {
      text: 'How often do you have six or more standard drinks on one occasion?',
      options: [
        { text: 'Never', score: 0 },
        { text: 'Less than monthly', score: 1 },
        { text: 'Monthly', score: 2 },
        { text: 'Weekly', score: 3 },
        { text: 'Daily or almost daily', score: 4 },
      ],
    },
    // Dependence Symptoms
    {
        text: 'How often during the last year have you found that you were not able to stop drinking once you had started?',
        options: [
          { text: 'Never', score: 0 }, { text: 'Less than monthly', score: 1 }, { text: 'Monthly', score: 2 }, { text: 'Weekly', score: 3 }, { text: 'Daily or almost daily', score: 4 },
        ]
    },
    {
        text: 'How often during the last year have you failed to do what was normally expected of you because of drinking?',
        options: [
          { text: 'Never', score: 0 }, { text: 'Less than monthly', score: 1 }, { text: 'Monthly', score: 2 }, { text: 'Weekly', score: 3 }, { text: 'Daily or almost daily', score: 4 },
        ]
    },
    {
        text: 'How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?',
        options: [
          { text: 'Never', score: 0 }, { text: 'Less than monthly', score: 1 }, { text: 'Monthly', score: 2 }, { text: 'Weekly', score: 3 }, { text: 'Daily or almost daily', score: 4 },
        ]
    },
     // Harmful Consequences
    {
        text: 'How often during the last year have you had a feeling of guilt or remorse after drinking?',
        options: [
          { text: 'Never', score: 0 }, { text: 'Less than monthly', score: 1 }, { text: 'Monthly', score: 2 }, { text: 'Weekly', score: 3 }, { text: 'Daily or almost daily', score: 4 },
        ]
    },
    {
        text: 'How often during the last year have you been unable to remember what happened the night before because you had been drinking?',
        options: [
          { text: 'Never', score: 0 }, { text: 'Less than monthly', score: 1 }, { text: 'Monthly', score: 2 }, { text: 'Weekly', score: 3 }, { text: 'Daily or almost daily', score: 4 },
        ]
    },
    {
        text: 'Have you or someone else been injured as a result of your drinking?',
        options: [
          { text: 'No', score: 0 }, { text: 'Yes, but not in the last year', score: 2 }, { text: 'Yes, during the last year', score: 4 },
        ]
    },
    {
        text: 'Has a relative, friend, doctor, or other health worker been concerned about your drinking or suggested you cut down?',
        options: [
          { text: 'No', score: 0 }, { text: 'Yes, but not in the last year', score: 2 }, { text: 'Yes, during the last year', score: 4 },
        ]
    },
  ],
  getInterpretation: (score) => {
    const s = score as number;
    if (s >= 20) {
        return { level: 'High Risk (Dependence Likely)', message: 'Your score is high, indicating a likelihood of alcohol dependence. It is strongly recommended to discuss these results with a healthcare professional for a full assessment.', isHighRisk: true };
    }
    if (s >= 16) {
        return { level: 'Harmful Use', message: 'Your score suggests your drinking is at a harmful level. It is recommended to discuss these results with a healthcare professional.', isHighRisk: true };
    }
    if (s >= 8) {
        return { level: 'Hazardous Use', message: 'Your score indicates you are drinking at a level that could be hazardous to your health. Consider reducing your consumption.', isHighRisk: true };
    }
    return { level: 'Low Risk', message: 'Your drinking pattern appears to be low-risk. Continue to be mindful of your consumption.', isHighRisk: false };
  },
};

// Simplified ASSIST-like screening focusing on frequency of use for various substances.
export const ASSIST_TEST: ScreeningTest = {
    id: 'assist',
    title: 'ASSIST Substance Use Guide',
    description: 'A confidential guide to help you understand your use of various substances. For each substance, please indicate how often you have used it in the last 3 months.',
    questions: [
        { text: 'Tobacco products (cigarettes, vapes, chewing tobacco, etc.)', options: [{ text: 'Never', score: 0 }, { text: 'Once or twice', score: 2 }, { text: 'Monthly', score: 3 }, { text: 'Weekly', score: 4 }, { text: 'Daily or almost daily', score: 6 }] },
        { text: 'Cannabis (marijuana, pot, grass, hash, etc.)', options: [{ text: 'Never', score: 0 }, { text: 'Once or twice', score: 3 }, { text: 'Monthly', score: 4 }, { text: 'Weekly', score: 5 }, { text: 'Daily or almost daily', score: 7 }] },
        { text: 'Stimulants (cocaine, amphetamines, ecstasy, or prescription stimulants for non-medical reasons)', options: [{ text: 'Never', score: 0 }, { text: 'Once or twice', score: 4 }, { text: 'Monthly', score: 5 }, { text: 'Weekly', score: 6 }, { text: 'Daily or almost daily', score: 8 }] },
        { text: 'Sedatives or sleeping pills (without a prescription)', options: [{ text: 'Never', score: 0 }, { text: 'Once or twice', score: 4 }, { text: 'Monthly', score: 5 }, { text: 'Weekly', score: 6 }, { text: 'Daily or almost daily', score: 8 }] },
        { text: 'Hallucinogens (LSD, acid, magic mushrooms, etc.)', options: [{ text: 'Never', score: 0 }, { text: 'Once or twice', score: 4 }, { text: 'Monthly', score: 5 }, { text: 'Weekly', score: 6 }, { text: 'Daily or almost daily', score: 8 }] },
        { text: 'Opioids (heroin, or prescription opioids like morphine, codeine, oxycodone for non-medical reasons)', options: [{ text: 'Never', score: 0 }, { text: 'Once or twice', score: 5 }, { text: 'Monthly', score: 6 }, { text: 'Weekly', score: 7 }, { text: 'Daily or almost daily', score: 9 }] },
        { text: 'Inhalants (nitrous, glue, petrol, paint thinner)', options: [{ text: 'Never', score: 0 }, { text: 'Once or twice', score: 4 }, { text: 'Monthly', score: 5 }, { text: 'Weekly', score: 6 }, { text: 'Daily or almost daily', score: 8 }] },
    ],
    getInterpretation: (scores) => {
        const substanceScores = scores as Record<string, number>;
        const highRiskSubstances = [];
        let totalScore = 0;
        for (const substance in substanceScores) {
            const score = substanceScores[substance];
            totalScore += score;
            // A simplified threshold where any weekly or daily use is flagged.
            if (score >= 4) { 
                highRiskSubstances.push(substance);
            }
        }

        if (highRiskSubstances.length > 0) {
            return {
                level: 'High Risk',
                message: `Your use of the following substance(s) may be putting you at risk: ${highRiskSubstances.join(', ')}. It is strongly recommended to discuss these results with a healthcare professional.`,
                isHighRisk: true,
            };
        }
        
        if (totalScore > 0) {
            return {
                level: 'Low Risk',
                message: 'Your substance use pattern appears to be low-risk. It is always good to be aware of your habits.',
                isHighRisk: false,
            };
        }
        
        return {
            level: 'No to Low Risk',
            message: 'You reported no or very low substance use.',
            isHighRisk: false,
        };
    },
};