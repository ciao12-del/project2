import React, { useState } from 'react';
import { Mail, Eye, EyeOff, ArrowRight, UserPlus } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import GlitchText from './GlitchText';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onRegisterClick: () => void;
  isLoading: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegisterClick, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-lg bg-gray-900/50 border border-green-400/30 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-black font-bold text-2xl font-mono">◉</span>
            </div>
            <h1 className="text-3xl font-bold text-green-400 mb-2 font-mono">
              <GlitchText text="SECURE ACCESS" />
            </h1>
            <p className="text-green-300/80 text-sm font-mono">
              AUTHORIZED PERSONNEL ONLY
            </p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-400/30 rounded p-3 mb-6">
              <p className="text-red-300 text-sm font-mono text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-green-400 text-sm font-mono mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900/50 border border-green-400/30 rounded px-12 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
                  placeholder="user@domain.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-green-400 text-sm font-mono mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900/50 border border-green-400/30 rounded px-4 py-3 pr-12 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-600 disabled:to-gray-500 text-black font-bold py-3 px-4 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/50 disabled:transform-none font-mono flex items-center justify-center"
            >
              {isLoading ? (
                <LoadingSpinner size="small" />
              ) : (
                <>
                  ACCESS SYSTEM <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={onRegisterClick}
                className="text-green-400 hover:text-green-300 text-sm font-mono underline flex items-center justify-center mx-auto"
                disabled={isLoading}
              >
                <UserPlus className="w-4 h-4 mr-1" />
                CREATE NEW ACCOUNT
              </button>
            </div>
          </form>

          <div className="mt-8 border-t border-green-400/20 pt-4">
            <p className="text-green-400/60 text-xs font-mono text-center">
              🔒 256-bit encrypted authentication protocol
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;