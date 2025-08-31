import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { XIcon, GoogleIcon, AppleIcon, FacebookIcon } from '../common/Icons';
import { UserRole } from '../../types';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (isNewUser: boolean, role: UserRole) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  // User form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Admin form state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  
  const [error, setError] = useState('');

  const validatePassword = (pass: string) => {
      // Simple validation: 8 chars, 1 uppercase, 1 number
      const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      return re.test(pass);
  }

  const handleUserAuth = () => {
    setError('');
    
    if (email.toLowerCase() === 'admin@aura.com') {
        setError('Please use the admin login form.');
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }

    if (!validatePassword(password)) {
        setError('Password must be at least 8 characters, with one uppercase letter and one number.');
        return;
    }

    if (!isLoginView && password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }

    // Mock successful user authentication
    onLoginSuccess(!isLoginView, 'user');
  };

  const handleAdminLogin = () => {
    setError('');
    // Mock Admin Credentials
    if (adminEmail === 'admin@aura.com' && adminPassword === 'AdminPass123') {
      onLoginSuccess(false, 'admin');
    } else {
      setError('Invalid admin credentials.');
    }
  };
  
  const handleSocialLogin = (provider: 'Google' | 'Apple' | 'Facebook') => {
    console.log(`Attempting login with ${provider}...`);
    localStorage.setItem('aura-user-name', `${provider} User`);
    localStorage.setItem('aura-user-isAnonymous', 'false');
    localStorage.setItem('aura-basic-info-complete', 'true');
    localStorage.setItem('aura-onboarding-complete', 'true');
    onLoginSuccess(true, 'user');
  };

  const toggleUserView = (isLogin: boolean) => {
    setError('');
    setIsLoginView(isLogin);
  };
  
  const toggleAdminView = (showAdmin: boolean) => {
    setError('');
    setShowAdminLogin(showAdmin);
  };

  const SocialButton: React.FC<{ provider: 'Google' | 'Apple' | 'Facebook', Icon: React.FC<{className?:string}>, onClick: () => void }> = ({ provider, Icon, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center justify-center gap-3 bg-white/60 text-text-body font-bold py-3 rounded-lg hover:bg-white/80 transition-colors">
      <Icon />
      Continue with {provider}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" onClick={onClose}>
      <GlassCard className="w-11/12 max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
            <h1
                aria-label="Aura Project Title"
                className="inline-block text-6xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent animate-shimmer animate-glow transition-transform duration-300 hover:scale-105"
                style={{ backgroundSize: '200% auto' }}
            >
                Aura
            </h1>
            <p className="mt-2 text-lg text-text-body font-semibold">
                Find Balance. Build Strength. Discover Aura.
            </p>
        </div>
        
        {!showAdminLogin ? (
        <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-text-heading">{isLoginView ? 'Login' : 'Sign Up'}</h2>
              <button onClick={onClose} className="p-1"><XIcon/></button>
            </div>
            
            <div className="mt-6 space-y-4">
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"/>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"/>
              {!isLoginView && (
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full p-3 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"/>
              )}
            </div>
            
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            
            <button onClick={handleUserAuth} className="w-full mt-6 bg-accent text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors">
              {isLoginView ? 'Login' : 'Sign Up'}
            </button>

            {isLoginView && (
                <button 
                    onClick={() => toggleAdminView(true)}
                    className="text-center text-sm font-semibold text-accent hover:underline w-full mt-4"
                >
                  Login as Admin
                </button>
            )}
            
            <div className="text-center mt-6">
                <p className="text-lg font-bold text-text-heading">
                  {isLoginView ? "New user? " : "Already have an account? "}
                  <button 
                    onClick={() => toggleUserView(!isLoginView)} 
                    className="group text-accent hover:text-primary transition-colors duration-300 inline-flex items-center"
                    aria-label={isLoginView ? "Switch to sign up form" : "Switch to log in form"}
                  >
                    <span className="group-hover:underline">
                      {isLoginView ? "Sign up" : "Log in"}
                    </span>
                    <span className="ml-1.5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
                      {isLoginView ? '✨' : '➡️'}
                    </span>
                  </button>
                </p>
            </div>
            
            <>
                <div className="my-6 flex items-center">
                    <hr className="flex-grow border-t border-white/30" />
                    <span className="mx-4 text-xs font-semibold text-text-muted">OR</span>
                    <hr className="flex-grow border-t border-white/30" />
                </div>

                <div className="space-y-3">
                  <SocialButton provider="Google" Icon={GoogleIcon} onClick={() => handleSocialLogin('Google')} />
                  <SocialButton provider="Apple" Icon={AppleIcon} onClick={() => handleSocialLogin('Apple')} />
                  <SocialButton provider="Facebook" Icon={FacebookIcon} onClick={() => handleSocialLogin('Facebook')} />
                </div>
            </>
        </>
        ) : (
        <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-text-heading">Admin Login</h2>
              <button onClick={onClose} className="p-1"><XIcon/></button>
            </div>
            
            <div className="mt-6 space-y-4">
              <input type="email" placeholder="Admin Email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="w-full p-3 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"/>
              <input type="password" placeholder="Password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} className="w-full p-3 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"/>
            </div>
            
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            
            <button onClick={handleAdminLogin} className="w-full mt-6 bg-accent text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors">
              Login as Admin
            </button>
            
            <button 
                onClick={() => toggleAdminView(false)} 
                className="text-center text-sm font-semibold text-accent hover:underline w-full mt-4"
            >
              Back to User Login
            </button>
        </>
        )}
      </GlassCard>
    </div>
  );
};

export default AuthModal;