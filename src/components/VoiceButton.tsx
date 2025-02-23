import { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { animations } from '@/styles/animations';

interface VoiceButtonProps {
  onToggle: (isActive: boolean) => void;
  isConversationActive?: boolean;
}

const VoiceButton = ({ onToggle, isConversationActive }: VoiceButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isConversationActive) {
      setIsActive(false);
    }
  }, [isConversationActive]);

  const handleClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle(newState);
  };

  return (
    <motion.button
      {...animations.scale}
      onClick={handleClick}
      className={`
        relative p-8 rounded-full transition-all duration-500
        ${isActive || isConversationActive
          ? 'bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30' 
          : 'bg-white/80 hover:bg-white shadow-lg'}
      `}
    >
      <motion.div
        animate={isActive || isConversationActive ? animations.pulse.animate : {}}
        transition={animations.pulse.transition}
      >
        <Mic 
          className={`w-12 h-12 transition-all duration-500 ${
            isActive || isConversationActive ? 'text-white' : 'text-primary'
          }`}
          strokeWidth={isActive || isConversationActive ? 2.5 : 2} 
        />
      </motion.div>
      
      {(isActive || isConversationActive) && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 rounded-full animate-ping bg-primary/30"
        />
      )}
    </motion.button>
  );
};

export default VoiceButton;
