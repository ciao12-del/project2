import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, ArrowRight, RefreshCw } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import GlitchText from './GlitchText';

interface SMSVerificationProps {
  phone: string;
  onVerify: (code: string) => void;
  onResendCode: () => void;
  isLoading: boolean;
  verificationCode?: string; // For simulation purposes
}

const SMSVerification: React.FC<SMSVerificationProps> = ({ 
  phone, 
  onVerify, 
  onResendCode, 
  isLoading,
  verificationCode 
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      setTimeout(() => onVerify(newCode.join('')), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    onResendCode();
  };

  const maskedPhone = phone.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d{4})/, '$1***$3****');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-lg bg-gray-900/50 border border-green-400/30 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="relative mb-4">
              <Smartphone className="w-12 h-12 text-green-400 mx-auto animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-2xl font-bold text-green-400 mb-2 font-mono">
              <GlitchText text="SMS VERIFICATION" />
            </h1>
            <p className="text-green-300/80 text-sm font-mono mb-4">
              SECURE CODE TRANSMITTED
            </p>
            <div className="bg-green-900/20 border border-green-400/30 rounded p-3 mb-4">
              <p className="text-green-300 text-xs font-mono">
                Verification code sent to:
              </p>
              <p className="text-green-400 font-mono font-bold">{maskedPhone}</p>
            </div>
          </div>

          {/* Simulation Notice */}
          {verificationCode && (
            <div className="bg-blue-900/20 border border-blue-400/30 rounded p-3 mb-6">
              <p className="text-blue-300 text-xs font-mono text-center">
                🔐 DEMO MODE: Code is {verificationCode}
              </p>
              <p className="text-blue-200/60 text-xs font-mono text-center mt-1">
                In production, this would be sent via SMS
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-green-400 text-sm font-mono mb-4 text-center">
                ENTER 6-DIGIT CODE
              </label>
              <div className="flex justify-center space-x-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 bg-gray-900/50 border border-green-400/30 rounded text-green-300 text-center text-xl font-mono focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20"
                    disabled={isLoading}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-green-400/60 text-sm font-mono">
                  Resend code in {timeLeft}s
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-green-400 hover:text-green-300 text-sm font-mono underline flex items-center justify-center mx-auto"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  RESEND CODE
                </button>
              )}
            </div>

            {isLoading && (
              <div className="text-center">
                <LoadingSpinner text="VERIFYING CODE..." />
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-green-400/20 pt-4">
            <p className="text-green-400/60 text-xs font-mono text-center">
              ⚡ Secure end-to-end verification protocol active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSVerification;