
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
      className={`relative p-6 rounded-full transition-all duration-300 ${
        isActive ? 'bg-primary voice-button-waves' : 'bg-gray-200 hover:bg-gray-300'
      }`}
    >
      {isActive ? (
        <Mic className="w-8 h-8 text-white" />
      ) : (
        <MicOff className="w-8 h-8 text-gray-600" />
      )}
    </button>
  );
};

export default VoiceButton;
