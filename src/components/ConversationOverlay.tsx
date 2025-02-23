import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ChatInterface from './ChatInterface';
import LiveIndicator from './LiveIndicator';
import TripSummary from './TripSummary';
import { useState, useEffect } from 'react';

interface City {
  id: string;
  name: string;
  country: string;
  accent: string;
}

interface ConversationOverlayProps {
  isActive: boolean;
  onClose: () => void;
  selectedCity: City;
}

const ConversationOverlay = ({ isActive, onClose, selectedCity }: ConversationOverlayProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isActive) {
      setIsLoading(true);
      setTimeout(() => {
        setMessages([{
          id: 1,
          text: `Hi! I'm your local guide for ${selectedCity.name}. What would you like to know about the city?`,
          sender: 'agent'
        }]);
        setIsLoading(false);
      }, 1500);
    }
  }, [isActive, selectedCity]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl z-50"
        >
          <div className="h-full max-w-[1600px] mx-auto p-6 md:p-8 flex flex-col">
            {/* Header Bar */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between mb-8 bg-white/80 rounded-2xl border border-gray-100 p-4 shadow-sm"
            >
              <LiveIndicator onHangUp={onClose} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white hover:bg-gray-50
                         transition-colors border border-gray-100 shadow-sm"
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6 min-h-0">
              {/* Left Column - Chat & Voice */}
              <div className="flex flex-col gap-6 min-h-0">
                {/* Chat Interface */}
                <div className="flex-1 min-h-0 bg-white/80 rounded-2xl border border-gray-100 p-6 shadow-sm overflow-hidden">
                  {isLoading ? (
                    <motion.div 
                      className="flex items-center justify-center h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </motion.div>
                  ) : (
                    <ChatInterface 
                      messages={messages}
                      cityName={selectedCity.name}
                      onStartOver={() => {
                        setMessages([messages[0]]);
                      }} 
                    />
                  )}
                </div>
              </div>

              {/* Right Column - Trip Summary */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 rounded-2xl border border-gray-100 shadow-sm p-6
                         overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
              >
                <TripSummary messages={messages} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConversationOverlay;