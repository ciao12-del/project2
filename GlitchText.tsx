import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const startGlitch = () => {
      setIsGlitching(true);
      let iterations = 0;
      
      const interval = setInterval(() => {
        setDisplayText(prev => 
          prev.split('').map((char, index) => {
            if (index < iterations) return text[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }).join('')
        );
        
        if (iterations >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
          setIsGlitching(false);
        }
        
        iterations += 1/3;
      }, 30);
    };

    const glitchTimeout = setTimeout(() => {
      startGlitch();
    }, Math.random() * 3000 + 1000);

    return () => clearTimeout(glitchTimeout);
  }, [text]);

  return (
    <span className={`${className} ${isGlitching ? 'animate-pulse' : ''}`}>
      {displayText}
    </span>
  );
};

export default GlitchText;