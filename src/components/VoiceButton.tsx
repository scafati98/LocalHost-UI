
import { useState } from 'react';
import { Mic } from 'lucide-react';

interface VoiceButtonProps {
  onToggle: (isActive: boolean) => void;
}

const VoiceButton = ({ onToggle }: VoiceButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle(newState);
  };

  return (
    <div className="relative">
      {/* Subtle circular pulse animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 rounded-full mic-ring" />
        <div className="absolute inset-0 rounded-full mic-ring animation-delay-1000" />
      </div>
      
      {/* Main button */}
      <button
        onClick={handleToggle}
        className={`relative p-8 rounded-full transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 ${
          isActive 
            ? 'bg-primary mic-glow' 
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        <Mic className={`w-12 h-12 ${isActive ? 'text-white' : 'text-primary'}`} strokeWidth={isActive ? 2.5 : 2} />
      </button>
    </div>
  );
};

export default VoiceButton;
