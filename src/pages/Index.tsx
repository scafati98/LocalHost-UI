import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceButton from '../components/VoiceButton';
import { SearchableDropdown } from '../components/SearchableDropdown';
import { SuggestedQuestion } from '../components/SuggestedQuestion';
import ConversationOverlay from '../components/ConversationOverlay';
import { animations } from '@/styles/animations';

interface City {
  id: string;
  name: string;
  country: string;
  accent: string;
}

const cities: City[] = [
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    accent: 'en-GB'
  },
  {
    id: 'san-francisco',
    name: 'San Francisco', 
    country: 'USA',
    accent: 'en-US'
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    accent: 'es-AR'
  },
  // Add more cities with corresponding accents
];

const exampleQuestions = [
  "What tech conferences are happening next week?",
  "Are there any hackathons or developer meetups this month?",
  "Which hotels are closest to the main conference center?", 
  "Can you recommend good coworking spaces near the venue and tell me what developers think?",
  "What are the best rated tech startup hubs in the city center?",
  "Are there any tech networking events or developer workshops this weekend?",
  "Which cafes do local developers recommend for working and what are their reviews?"
];

const Index = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isConversationActive, setIsConversationActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isConversationActive) {
        setCurrentQuestion((prev) => (prev + 1) % exampleQuestions.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isConversationActive]);

  const handleVoiceToggle = (isActive: boolean) => {
    if (isActive) {
      setIsConversationActive(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      <motion.div 
        className="max-w-6xl mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center gap-16"
        {...animations.fadeIn}
      >
        {/* Header */}
        <motion.div 
          className="text-center space-y-4"
          variants={animations.fadeIn}
        >
          <AnimatePresence mode="wait">
            {!isConversationActive && (
              <motion.h1 
                className="text-7xl font-light tracking-tight text-gray-900 leading-tight"
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                Talk to{' '}
                <motion.span
                  className="text-primary font-medium relative inline-block"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  a Local
                  <motion.span 
                    className="absolute -inset-2 bg-primary/10 rounded-lg -z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.span>
              </motion.h1>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {!isConversationActive && (
              <motion.p 
                className="text-xl text-gray-600 font-light max-w-2xl mx-auto"
                exit={{ opacity: 0, y: -20 }}
              >
                Get authentic travel advice from someone who knows the city best
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Main Content */}
        <div className="w-full flex flex-col items-center gap-12">
          <AnimatePresence mode="wait">
            {!isConversationActive && (
              <motion.div
                exit={{ opacity: 0, y: -20 }}
              >
                <SearchableDropdown
                  cities={cities}
                  selectedCity={selectedCity}
                  onCityChange={setSelectedCity}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Central Voice Button */}
          <div className="relative">
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <VoiceButton 
              onToggle={handleVoiceToggle}
              isConversationActive={isConversationActive}
            />
          </div>

          {/* Suggested Questions */}
          <AnimatePresence mode="wait">
            {!isConversationActive && (
              <SuggestedQuestion 
                key={currentQuestion}
                question={exampleQuestions[currentQuestion]}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Conversation Overlay */}
      <ConversationOverlay 
        isActive={isConversationActive}
        onClose={() => setIsConversationActive(false)}
        selectedCity={selectedCity}
      />
    </div>
  );
};

export default Index;
