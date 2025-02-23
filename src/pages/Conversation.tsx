import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TripSummary from '../components/TripSummary';
import LiveIndicator from '../components/LiveIndicator';
import {motion} from 'framer-motion';
import {MapPin, Mic, X} from 'lucide-react';

const Conversation = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50/90 via-purple-50/90 to-pink-50/90 p-8 relative overflow-hidden backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="flex flex-col items-center space-y-12"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {/* Top Navigation Bar */}
          <div className="w-full flex justify-between items-center px-8 py-5 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <MapPin className="w-6 h-6 text-indigo-600" />
                <motion.div 
                  className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <span className="text-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Local Guide</span>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#FEE2E2' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHangUp}
              className="p-4 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <X className="w-5 h-5 text-red-500" />
            </motion.button>
          </div>

          {/* Main Content Area */}
          <motion.div 
            className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="flex flex-col items-center space-y-10">
              <LiveIndicator onHangUp={handleHangUp} />
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <TripSummary conversationId={""} />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="wave-container">
        <div className="wave bg-gradient-to-r from-indigo-200/30 via-purple-200/30 to-pink-200/30"></div>
        <div className="wave bg-gradient-to-r from-purple-200/30 via-pink-200/30 to-indigo-200/30 delay-75"></div>
        <div className="wave bg-gradient-to-r from-pink-200/30 via-indigo-200/30 to-purple-200/30 delay-150"></div>
      </div>

      {/* Enhanced Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 p-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ scale: 1.1, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Mic className="w-6 h-6 text-white" />
      </motion.button>
    </motion.div>
  );
};

export default Conversation;
