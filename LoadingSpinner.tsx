import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', text }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 border-2 border-green-400/20 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-transparent border-t-green-400 rounded-full animate-spin"></div>
        <div className="absolute inset-1 border border-transparent border-t-green-300 rounded-full animate-spin animation-delay-150"></div>
      </div>
      {text && (
        <p className="text-green-400 text-sm font-mono animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;