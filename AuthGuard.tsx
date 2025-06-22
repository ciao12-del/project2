import React from 'react';
import { Shield, Lock } from 'lucide-react';
import GlitchText from './GlitchText';

interface AuthGuardProps {
  onAuthClick: () => void;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ onAuthClick }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-lg bg-gray-900/50 border border-green-400/30 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Shield className="w-16 h-16 text-green-400 animate-pulse" />
                <Lock className="w-6 h-6 text-red-400 absolute -bottom-1 -right-1" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-green-400 mb-2 font-mono">
              <GlitchText text="ACCESS DENIED" />
            </h1>
            <p className="text-green-300/80 text-sm font-mono">
              AUTHENTICATION REQUIRED
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-red-400/30 rounded p-4 bg-red-900/20">
              <p className="text-red-300 text-sm font-mono text-center">
                ⚠️ RESTRICTED AREA ⚠️
              </p>
              <p className="text-red-200/80 text-xs font-mono text-center mt-2">
                This platform contains advanced cybersecurity tools and educational content. 
                Access is restricted to verified users only.
              </p>
            </div>

            <button
              onClick={onAuthClick}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black font-bold py-3 px-4 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/50 font-mono"
            >
              INITIATE AUTHENTICATION
            </button>

            <div className="text-center">
              <p className="text-green-400/60 text-xs font-mono">
                Only authorized personnel beyond this point
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthGuard;