import { Timer, PhoneOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LiveIndicatorProps {
  onHangUp: () => void;
}

const LiveIndicator = ({ onHangUp }: LiveIndicatorProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-4 bg-white/80 border border-primary/10 
                 shadow-lg backdrop-blur-xl px-5 py-3 rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-accent/50 animate-ping" />
          </motion.div>
          <span className="text-sm font-medium text-gray-700 tracking-wide">LIVE</span>
        </div>
        <motion.div 
          className="flex items-center gap-2 text-sm pl-3 border-l border-primary/10"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Timer className="w-4 h-4 text-gray-500" />
          <span className="font-mono text-gray-700">{formatTime(seconds)}</span>
        </motion.div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onHangUp}
        className="group flex items-center gap-2 bg-red-50 hover:bg-red-100 
                 text-red-600 px-5 py-3 rounded-2xl transition-all duration-300
                 border border-red-100 shadow-lg"
      >
        <PhoneOff className="w-4 h-4 transition-transform group-hover:rotate-12" />
        <span className="text-sm font-medium">End Call</span>
      </motion.button>
    </div>
  );
};

export default LiveIndicator;
