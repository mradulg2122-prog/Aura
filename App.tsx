import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import UserDashboard from './components/userdashboard/UserDashboard';
import Booking from './components/booking/Booking';
import Resources from './components/resources/Resources';
import Forum from './components/forum/Forum';
import Screening from './components/screening/Screening';
import Helpline from './components/helpline/Helpline';
import Homepage from './components/homepage/Homepage';
import AuthModal from './components/auth/AuthModal';
import OnboardingScreening from './components/screening/OnboardingScreening';
import BasicInfoForm from './components/onboarding/BasicInfoForm';
import { type View, type UserRole, Session, Counselor } from './types';
import { MenuIcon, XIcon } from './components/common/Icons';
import Dashboard from './components/dashboard/Dashboard';
import MySessions from './components/sessions/MySessions';
import Toast from './components/common/Toast';
import FeedbackModal from './components/sessions/FeedbackModal';
import { sessions as allSessionsData } from './data/sessions';
import FindTherapist from './components/therapist/FindTherapist';
import Yoga from './components/yoga/Yoga';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [hasCompletedBasicInfo, setHasCompletedBasicInfo] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const [userName, setUserName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [currentView, setCurrentView] = useState<View>('user-dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // New state for session notifications
  const [showSessionToast, setShowSessionToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [sessionForFeedback, setSessionForFeedback] = useState<Session | null>(null);
  
  // State for pre-selecting a counselor from the new directory
  const [preselectedCounselor, setPreselectedCounselor] = useState<Counselor | null>(null);

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('aura-theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    // Default to light theme
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('aura-theme', theme);
  }, [theme]);


  useEffect(() => {
    const authStatus = localStorage.getItem('aura-auth') === 'true';
    const role = localStorage.getItem('aura-role') as UserRole | null;
    
    if (authStatus && role) {
        setIsAuthenticated(true);
        setUserRole(role);
        if (role === 'user') {
            setHasCompletedBasicInfo(localStorage.getItem('aura-basic-info-complete') === 'true');
            setHasCompletedOnboarding(localStorage.getItem('aura-onboarding-complete') === 'true');
            setUserName(localStorage.getItem('aura-user-name') || '');
            setIsAnonymous(localStorage.getItem('aura-user-isAnonymous') === 'true');
        }
    }
  }, []);

  // Effect for session notifications and feedback prompts
  useEffect(() => {
    if (isAuthenticated && userRole === 'user') {
      const checkSessions = () => {
        const now = new Date();
        const userSessions = allSessionsData.filter(s => s.userId === 'user_1'); // Mock current user

        // Check for upcoming sessions
        const upcomingSession = userSessions.find(s => {
          const sessionTime = new Date(`${s.date} ${s.time}`);
          const timeDiff = sessionTime.getTime() - now.getTime();
          return timeDiff > 0 && timeDiff <= 60 * 60 * 1000; // Within the next hour
        });

        if (upcomingSession && !localStorage.getItem(`notified-${upcomingSession.id}`)) {
          setToastMessage(`Reminder: Your session with ${upcomingSession.counselor.name} is at ${upcomingSession.time}.`);
          setShowSessionToast(true);
          localStorage.setItem(`notified-${upcomingSession.id}`, 'true');
        }

        // Check for sessions that just ended
        const completedSession = userSessions.find(s => {
            const sessionEndTime = new Date(`${s.date} ${s.time}`);
            sessionEndTime.setHours(sessionEndTime.getHours() + 1); // Assuming 1-hour sessions
            const timeDiff = now.getTime() - sessionEndTime.getTime();
            return timeDiff > 0 && timeDiff <= 15 * 60 * 1000; // Ended in the last 15 mins
        });
        
        if (completedSession && !localStorage.getItem(`feedback-${completedSession.id}`)) {
          setSessionForFeedback(completedSession);
          setShowFeedbackModal(true);
          localStorage.setItem(`feedback-${completedSession.id}`, 'true');
        }
      };

      const intervalId = setInterval(checkSessions, 60 * 1000); // Check every minute
      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated, userRole]);


  const handleLoginSuccess = (isNewUser: boolean, role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setShowAuthModal(false);
    localStorage.setItem('aura-auth', 'true');
    localStorage.setItem('aura-role', role);

    if (role === 'user') {
        if (isNewUser) {
            setHasCompletedBasicInfo(false);
        } else {
            const infoStatus = localStorage.getItem('aura-basic-info-complete') === 'true';
            setHasCompletedBasicInfo(infoStatus);
            const onboardingStatus = localStorage.getItem('aura-onboarding-complete') === 'true';
            setHasCompletedOnboarding(onboardingStatus);
            setUserName(localStorage.getItem('aura-user-name') || '');
            setIsAnonymous(localStorage.getItem('aura-user-isAnonymous') === 'true');
        }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setHasCompletedBasicInfo(false);
    setHasCompletedOnboarding(false);
    setUserName('');
    setIsAnonymous(false);
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('aura-') || key.startsWith('notified-') || key.startsWith('feedback-')) {
            localStorage.removeItem(key);
        }
    });
  };
  
  const handleBasicInfoComplete = (name: string, isAnon: boolean) => {
      setUserName(name);
      setIsAnonymous(isAnon);
      setHasCompletedBasicInfo(true);
      localStorage.setItem('aura-user-name', name);
      localStorage.setItem('aura-user-isAnonymous', String(isAnon));
      localStorage.setItem('aura-basic-info-complete', 'true');
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('aura-onboarding-complete', 'true');
  };

  const handleAnonymityToggle = () => {
    const newIsAnonymous = !isAnonymous;
    setIsAnonymous(newIsAnonymous);
    localStorage.setItem('aura-user-isAnonymous', String(newIsAnonymous));
  };

  const handleBookCounselor = (counselor: Counselor) => {
    setPreselectedCounselor(counselor);
    setCurrentView('booking');
  };

  const renderView = () => {
    switch (currentView) {
      case 'user-dashboard': return <UserDashboard userName={userName} isAnonymous={isAnonymous} setCurrentView={setCurrentView} onAnonymityToggle={handleAnonymityToggle} theme={theme} onThemeChange={setTheme} />;
      case 'booking': return <Booking preselectedCounselor={preselectedCounselor} />;
      case 'resources': return <Resources userName={userName} isAnonymous={isAnonymous} />;
      case 'yoga': return <Yoga />;
      case 'forum': return <Forum userName={userName} isAnonymous={isAnonymous} setCurrentView={setCurrentView} />;
      case 'screening': return <Screening />;
      case 'helpline': return <Helpline />;
      case 'my-sessions': return <MySessions />;
      case 'find-therapist': return <FindTherapist onBookCounselor={handleBookCounselor} />;
      default: return <UserDashboard userName={userName} isAnonymous={isAnonymous} setCurrentView={setCurrentView} onAnonymityToggle={handleAnonymityToggle} theme={theme} onThemeChange={setTheme} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-bg-start to-bg-end dark:from-dark-bg-start dark:to-dark-bg-end">
        <Homepage onLoginClick={() => setShowAuthModal(true)} />
        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    );
  }

  if (userRole === 'admin') {
    return <Dashboard onLogout={handleLogout} />;
  }
  
  if (userRole === 'user') {
    if (!hasCompletedBasicInfo) {
        return <BasicInfoForm onComplete={handleBasicInfoComplete} />;
    }

    if (!hasCompletedOnboarding) {
      return (
        <div className="min-h-screen w-full bg-gradient-to-br from-bg-start to-bg-end dark:from-dark-bg-start dark:to-dark-bg-end flex items-center justify-center p-4">
          <OnboardingScreening onComplete={handleOnboardingComplete} />
        </div>
      );
    }
    
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-primary-light to-bg-end flex dark:from-dark-bg-start dark:to-dark-bg-end transition-colors duration-300">
        {showSessionToast && <Toast message={toastMessage} onClose={() => setShowSessionToast(false)} />}
        {showFeedbackModal && sessionForFeedback && (
          <FeedbackModal 
            session={sessionForFeedback}
            onClose={() => setShowFeedbackModal(false)} 
          />
        )}
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 bg-white/50 dark:bg-dark-card-bg backdrop-blur-sm rounded-full text-text-heading dark:text-dark-text-heading shadow-lg"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onLogout={handleLogout}
        />

        <main className="flex-1 transition-all duration-300 md:ml-64">
          <div className="w-full p-4 sm:p-6 lg:p-8 animate-fade-in">
            {renderView()}
          </div>
        </main>
      </div>
    );
  }
  
  // Fallback, should not be reached if logic is correct
  return <p>Loading...</p>;
};

export default App;