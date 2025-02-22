
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
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
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
        <div className="relative">
          {/* Floating text indicator */}
          {!isActive && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-sm px-4 py-2 rounded-full animate-bounce">
              Click to Start
            </div>
          )}
          
          {isActive ? (
            <Mic className="w-12 h-12 text-white animate-pulse" strokeWidth={2.5} />
          ) : (
            <Mic className="w-12 h-12 text-primary" strokeWidth={2} />
          )}
        </div>
      </button>
    </div>
  );
};

export default VoiceButton;
