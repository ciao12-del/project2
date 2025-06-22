import React, { useState } from 'react';
import { Mail, Phone, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import GlitchText from './GlitchText';

interface RegistrationFormProps {
  onRegister: (email: string, phone: string, password: string) => void;
  onBackToLogin: () => void;
  isLoading: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister, onBackToLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(formData.email, formData.phone, formData.password);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-lg bg-gray-900/50 border border-green-400/30 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4 animate-pulse" />
            <h1 className="text-2xl font-bold text-green-400 mb-2 font-mono">
              <GlitchText text="SYSTEM REGISTRATION" />
            </h1>
            <p className="text-green-300/80 text-sm font-mono">
              CREATE SECURE ACCESS CREDENTIALS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-green-400 text-sm font-mono mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-gray-900/50 border border-green-400/30 rounded px-12 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
                  placeholder="user@domain.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs font-mono mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-green-400 text-sm font-mono mb-2">
                PHONE NUMBER
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full bg-gray-900/50 border border-green-400/30 rounded px-12 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
                  placeholder="+1 (555) 123-4567"
                  disabled={isLoading}
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs font-mono mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-green-400 text-sm font-mono mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full bg-gray-900/50 border border-green-400/30 rounded px-4 py-3 pr-12 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
                  placeholder="••••••••"
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
              {errors.password && (
                <p className="text-red-400 text-xs font-mono mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-green-400 text-sm font-mono mb-2">
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full bg-gray-900/50 border border-green-400/30 rounded px-4 py-3 pr-12 text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 font-mono"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs font-mono mt-1">{errors.confirmPassword}</p>
              )}
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
                  REGISTER <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-green-400 hover:text-green-300 text-sm font-mono underline"
                disabled={isLoading}
              >
                ← BACK TO LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;