import {MapPin, RotateCw} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'agent';
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onStartOver: () => void;
  cityName: string;
}

const ChatInterface = ({ messages, onStartOver, cityName }: ChatInterfaceProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl shadow-sm">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <motion.div 
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-success rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-medium text-gray-800">
              Local Host
            </h2>
            <p className="text-sm text-gray-500">
              Your guide in {cityName}
            </p>
          </div>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartOver}
          className="group flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 rounded-xl
                   bg-white hover:bg-gray-50 shadow-sm hover:shadow transition-all duration-300
                   border border-gray-100"
        >
          <RotateCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
          <span className="font-medium">New Conversation</span>
        </motion.button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.sender === 'agent' ? 'justify-start' : 'justify-end'} items-end gap-3`}
            >
              {message.sender === 'agent' && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </motion.div>
              )}
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`
                  max-w-[70%] p-4 rounded-2xl shadow-sm
                  ${message.sender === 'agent' 
                    ? 'bg-white rounded-tl-sm border border-gray-100' 
                    : 'bg-primary text-white rounded-tr-sm'}
                `}
              >
                <p className="leading-relaxed text-[15px]">{message.text}</p>
              </motion.div>

              {message.sender === 'user' && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium"
                >
                  Y
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChatInterface;
