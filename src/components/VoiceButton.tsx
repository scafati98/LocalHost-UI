
import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceButtonProps {
  onToggle: (isActive: boolean) => void;
}

const VoiceButton = ({ onToggle }: VoiceButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    // Toggle the attention pulse animation every 3 seconds
    const interval = setInterval(() => {
      setShowPulse(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle(newState);
  };

  return (
    <div className="relative">
      {/* Softer pulse animation when inactive */}
      {!isActive && showPulse && (
        <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
      )}
      
      {/* Main button */}
      <button
        onClick={handleToggle}
        className={`relative p-8 rounded-full transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 ${
          isActive 
            ? 'bg-primary mic-glow' 
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        {isActive ? (
          <Mic className="w-12 h-12 text-white" strokeWidth={2.5} />
        ) : (
          <Mic className="w-12 h-12 text-primary" strokeWidth={2} />
        )}
      </button>
    </div>
  );
};

export default VoiceButton;
