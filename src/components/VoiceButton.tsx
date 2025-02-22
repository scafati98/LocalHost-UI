
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
    <button
      onClick={handleToggle}
      className={`p-8 rounded-full transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 ${
        isActive 
          ? 'bg-primary' 
          : 'bg-white hover:bg-gray-50'
      }`}
    >
      <Mic className={`w-12 h-12 ${isActive ? 'text-white' : 'text-primary'}`} strokeWidth={isActive ? 2.5 : 2} />
    </button>
  );
};

export default VoiceButton;
