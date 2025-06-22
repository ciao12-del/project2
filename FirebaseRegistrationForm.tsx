import React, { useState, useEffect } from 'react';
import { Mail, Phone, Eye, EyeOff, ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import GlitchText from './GlitchText';
import { authService } from '../services/authService';

interface FirebaseRegistrationFormProps {
  onRegistrationComplete: (user: any) => void;
  onBackToLogin: () => void;
}

const FirebaseRegistrationForm: React.FC<FirebaseRegistrationFormProps> = ({ 
  onRegistrationComplete, 
  onBackToLogin 
}) => {
  const [step, setStep] = useState<'email' | 'phone' | 'sms'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    displayName: ''
  });

  const [smsCode, setSmsCode] = useState(['', '', '', '', '', '']);
  const [tempUser, setTempUser] = useState<any>(null);

  useEffect(() => {
    // Inizializza reCAPTCHA quando il componente viene montato
    if (step === 'phone') {
      authService.initializeRecaptcha('recaptcha-container');
    }
    
    return () => {
      authService.cleanup();
    };
  }, [step]);

  const validateEmailStep = () => {
    const errors: string[] = [];
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push('Email non valida');
    }
    
    if (!formData.password || formData.password.length < 8) {
      errors.push('Password deve essere almeno 8 caratteri');
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.push('Le password non coincidono');
    }
    
    if (errors.length > 0) {
      setError(errors.join(', '));
      return false;
    }
    
    return true;
  };

  const handleEmailRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmailStep()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const user = await authService.registerWithEmail(
        formData.email, 
        formData.password, 
        formData.displayName || undefined
      );
      
      setTempUser(user);
      setStep('phone');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone || formData.phone.length < 10) {
      setError('Inserisci un numero di telefono valido');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await authService.sendSMSVerification(formData.phone);
      setStep('sms');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSMSCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...smsCode];
    newCode[index] = value;
    setSmsCode(newCode);
    
    // Auto-focus prossimo input
    if (value && index < 5) {
      const nextInput = document.getElementById(`sms-${index + 1}`);
      nextInput?.focus();
    }
    
    // Auto-verifica quando tutti i campi sono pieni
    if (newCode.every(digit => digit !== '')) {
      handleSMSVerification(newCode.join(''));
    }
  };

  const handleSMSVerification = async (code: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const verifiedUser = await authService.verifySMSCode(code);
      onRegistrationComplete({
        ...tempUser,
        phoneNumber: formData.phone,
        phoneVerified: true
      });
    } catch (error: any) {
      setError(error.message);
      setSmsCode(['', '', '', '', '', '']);
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailStep = () => (
    <form onSubmit={handleEmailRegistration} className="space-y-6">
      <div>
        <label className="block text-green-400 text-sm font-mono mb-2">
          EMAIL ADDRESS
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full bg-gray-900/50 border border-green-400/30 rounded px-12 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
            placeholder="user@domain.com"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-green-400 text-sm font-mono mb-2">
          DISPLAY NAME (Opzionale)
        </label>
        <input
          type="text"
          value={formData.displayName}
          onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
          className="w-full bg-gray-900/50 border border-green-400/30 rounded px-4 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
          placeholder="Il tuo nome"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-green-400 text-sm font-mono mb-2">
          PASSWORD
        </label>
        <div className="relative">
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full bg-gray-900/50 border border-green-400/30 rounded px-4 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-green-400 text-sm font-mono mb-2">
          CONFERMA PASSWORD
        </label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          className="w-full bg-gray-900/50 border border-green-400/30 rounded px-4 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
          placeholder="••••••••"
          required
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-600 disabled:to-gray-500 text-black font-bold py-3 px-4 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/50 disabled:transform-none font-mono flex items-center justify-center"
      >
        {isLoading ? (
          <LoadingSpinner size="small" />
        ) : (
          <>
            CONTINUA <ArrowRight className="ml-2 w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );

  const renderPhoneStep = () => (
    <form onSubmit={handlePhoneVerification} className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-400/30 rounded p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <p className="text-blue-300 text-sm font-mono font-bold">
            VERIFICA NUMERO DI TELEFONO
          </p>
        </div>
        <p className="text-blue-200/80 text-xs font-mono">
          Ti invieremo un SMS REALE con un codice di verifica a 6 cifre
        </p>
      </div>

      <div>
        <label className="block text-green-400 text-sm font-mono mb-2">
          NUMERO DI TELEFONO
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full bg-gray-900/50 border border-green-400/30 rounded px-12 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
            placeholder="+393331234567 o 3331234567"
            required
            disabled={isLoading}
          />
        </div>
        <p className="text-green-400/60 text-xs font-mono mt-1">
          Formato: +393331234567 (con prefisso internazionale)
        </p>
      </div>

      <div id="recaptcha-container"></div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-600 disabled:to-gray-500 text-black font-bold py-3 px-4 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/50 disabled:transform-none font-mono flex items-center justify-center"
      >
        {isLoading ? (
          <LoadingSpinner size="small" />
        ) : (
          <>
            INVIA SMS <ArrowRight className="ml-2 w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );

  const renderSMSStep = () => (
    <div className="space-y-6">
      <div className="bg-green-900/20 border border-green-400/30 rounded p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Phone className="w-5 h-5 text-green-400" />
          <p className="text-green-300 text-sm font-mono font-bold">
            SMS INVIATO!
          </p>
        </div>
        <p className="text-green-200/80 text-xs font-mono">
          Controlla il tuo telefono per il codice di verifica
        </p>
        <p className="text-green-400 font-mono font-bold mt-1">
          {formData.phone}
        </p>
      </div>

      <div>
        <label className="block text-green-400 text-sm font-mono mb-4 text-center">
          INSERISCI CODICE A 6 CIFRE
        </label>
        <div className="flex justify-center space-x-2">
          {smsCode.map((digit, index) => (
            <input
              key={index}
              id={`sms-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleSMSCodeChange(index, e.target.value)}
              className="w-12 h-14 bg-gray-900/50 border border-green-400/30 rounded text-green-300 text-center text-xl font-mono focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20"
              disabled={isLoading}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="text-center">
          <LoadingSpinner text="VERIFICA IN CORSO..." />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-lg bg-gray-900/50 border border-green-400/30 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4 animate-pulse" />
            <h1 className="text-2xl font-bold text-green-400 mb-2 font-mono">
              <GlitchText text="REGISTRAZIONE FIREBASE" />
            </h1>
            <p className="text-green-300/80 text-sm font-mono">
              {step === 'email' && 'STEP 1: CREDENZIALI EMAIL'}
              {step === 'phone' && 'STEP 2: VERIFICA TELEFONO'}
              {step === 'sms' && 'STEP 3: CODICE SMS'}
            </p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-400/30 rounded p-3 mb-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <p className="text-red-300 text-sm font-mono">{error}</p>
              </div>
            </div>
          )}

          {step === 'email' && renderEmailStep()}
          {step === 'phone' && renderPhoneStep()}
          {step === 'sms' && renderSMSStep()}

          <div className="text-center mt-6">
            <button
              onClick={onBackToLogin}
              className="text-green-400 hover:text-green-300 text-sm font-mono underline"
              disabled={isLoading}
            >
              ← TORNA AL LOGIN
            </button>
          </div>

          <div className="mt-8 border-t border-green-400/20 pt-4">
            <p className="text-green-400/60 text-xs font-mono text-center">
              🔥 SMS REALI tramite Firebase Authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseRegistrationForm;