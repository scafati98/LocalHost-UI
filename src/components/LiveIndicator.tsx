
import { Clock, PhoneOff } from 'lucide-react';
import { useState, useEffect } from 'react';

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
      <div className="flex items-center gap-4 glass-card px-4 py-2 rounded-full animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-sm font-medium">LIVE</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span>{formatTime(seconds)}</span>
        </div>
      </div>
      <button
        onClick={onHangUp}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors animate-fade-in"
      >
        <PhoneOff className="w-4 h-4" />
        <span className="text-sm font-medium">Hang Up</span>
      </button>
    </div>
  );
};

export default LiveIndicator;
