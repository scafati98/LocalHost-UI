
import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

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
  );
};

export default VoiceButton;
