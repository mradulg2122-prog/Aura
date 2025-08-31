import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import DatePicker from '../common/DatePicker';

interface BasicInfoFormProps {
  onComplete: (name: string, isAnonymous: boolean) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (name.trim() === '' || dob.trim() === '' || location.trim() === '') {
      setError('Please fill out all fields.');
      return;
    }
    
    const dateParts = dob.split('-');
    if(dateParts.length !== 3 || new Date(dob) >= new Date()) {
        setError('Please enter a valid date of birth.');
        return;
    }

    setError('');
    onComplete(name, isAnonymous);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-bg-start to-bg-end dark:from-dark-bg-start dark:to-dark-bg-end flex items-center justify-center p-4">
        <GlassCard className="w-11/12 max-w-lg p-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-text-heading dark:text-dark-text-heading mb-2 text-center">A Little About You</h1>
            <p className="text-text-muted dark:text-dark-text-muted mb-6 text-center">This helps us personalize your experience. Your privacy is our priority.</p>
            
            <div className="space-y-4">
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-white/80 dark:bg-black/20 rounded-lg text-text-heading dark:text-dark-text-body placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"/>
                
                <DatePicker selectedDate={dob} onDateChange={setDob} />
                
                <input type="text" placeholder="Location (City, State)" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-3 bg-white/80 dark:bg-black/20 rounded-lg text-text-heading dark:text-dark-text-body placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"/>
            </div>

            <div className="mt-6 pt-4 border-t border-white/30 dark:border-dark-card-border">
                <div className="flex justify-between items-center">
                    <label htmlFor="anonymous-toggle" className="text-sm font-medium text-text-body dark:text-dark-text-body">Use Anonymously</label>
                    <div className="relative inline-block w-10 align-middle">
                        <input type="checkbox" id="anonymous-toggle" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                        <label htmlFor="anonymous-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"></label>
                    </div>
                </div>
                <p className="text-xs text-text-muted dark:text-dark-text-muted mt-2">
                    If you choose anonymous mode, your details will remain encrypted and hidden from others.
                </p>
            </div>

             {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            
            <button onClick={handleSubmit} className="w-full mt-6 bg-accent text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                Save & Continue
            </button>
             <style>{`
                .toggle-checkbox:checked { right: 0; border-color: #00a896; }
                .toggle-checkbox:checked + .toggle-label { background-color: #00a896; }
            `}</style>
        </GlassCard>
    </div>
  );
};

export default BasicInfoForm;
