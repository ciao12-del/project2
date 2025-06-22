import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './config/firebase';
import MatrixBackground from './components/MatrixBackground';
import AuthGuard from './components/AuthGuard';
import FirebaseLoginForm from './components/FirebaseLoginForm';
import FirebaseRegistrationForm from './components/FirebaseRegistrationForm';
import Dashboard from './components/Dashboard';
import { authService } from './services/authService';

type AuthState = 'guard' | 'login' | 'register' | 'dashboard';

function App() {
  const [authState, setAuthState] = useState<AuthState>('guard');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ascolta i cambiamenti dello stato di autenticazione Firebase
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
      
      if (firebaseUser) {
        console.log('✅ Utente autenticato:', {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          phoneNumber: firebaseUser.phoneNumber,
          displayName: firebaseUser.displayName
        });
        setAuthState('dashboard');
      } else {
        console.log('❌ Utente non autenticato');
        if (authState === 'dashboard') {
          setAuthState('guard');
        }
      }
    });

    return () => unsubscribe();
  }, [authState]);

  const handleLoginSuccess = (firebaseUser: User) => {
    setUser(firebaseUser);
    setAuthState('dashboard');
  };

  const handleRegistrationComplete = (firebaseUser: User) => {
    setUser(firebaseUser);
    setAuthState('dashboard');
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setAuthState('guard');
    } catch (error) {
      console.error('Errore logout:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 font-mono">
          <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Inizializzazione Firebase...</p>
        </div>
      </div>
    );
  }

  const renderCurrentState = () => {
    switch (authState) {
      case 'guard':
        return <AuthGuard onAuthClick={() => setAuthState('login')} />;
      
      case 'login':
        return (
          <FirebaseLoginForm
            onLoginSuccess={handleLoginSuccess}
            onRegisterClick={() => setAuthState('register')}
          />
        );
      
      case 'register':
        return (
          <FirebaseRegistrationForm
            onRegistrationComplete={handleRegistrationComplete}
            onBackToLogin={() => setAuthState('login')}
          />
        );
      
      case 'dashboard':
        return user ? (
          <Dashboard
            user={{
              email: user.email || '',
              phone: user.phoneNumber || '',
              displayName: user.displayName || '',
              uid: user.uid
            }}
            onLogout={handleLogout}
          />
        ) : null;
      
      default:
        return <AuthGuard onAuthClick={() => setAuthState('login')} />;
    }
  };

  return (
    <div className="relative">
      <MatrixBackground />
      {renderCurrentState()}
    </div>
  );
}

export default App;