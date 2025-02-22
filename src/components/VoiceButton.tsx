
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
      {/* Outer attention rings */}
      {!isActive && showPulse && (
        <>
          <div className="absolute inset-0 rounded-full bg-violet-400/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-violet-300/20 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-violet-200/10 animate-pulse delay-75" />
        </>
      )}
      
      {/* Main button */}
      <button
        onClick={handleToggle}
        className={`relative p-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
          isActive 
            ? 'bg-primary voice-button-waves ring-4 ring-primary/30' 
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        {isActive ? (
          <Mic className="w-12 h-12 text-white animate-pulse" strokeWidth={2.5} />
        ) : (
          <Mic className="w-12 h-12 text-primary" strokeWidth={2} />
        )}
      </button>
    </div>
  );
};

export default VoiceButton;
