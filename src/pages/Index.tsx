
import { useState } from 'react';
import VoiceButton from '../components/VoiceButton';
import TripSummary from '../components/TripSummary';

const Index = () => {
  const [isConversationStarted, setIsConversationStarted] = useState(false);

  const handleVoiceToggle = (isActive: boolean) => {
    setIsConversationStarted(isActive);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Plan Your Perfect Trip with Local Host
          </h1>
          <p className="text-gray-600 mb-12 text-center max-w-md">
            Press the button and start speaking to get personalized travel recommendations
          </p>
          <VoiceButton onToggle={handleVoiceToggle} />
        </div>
        
        {isConversationStarted && (
          <div className="mt-8 animate-fade-in">
            <TripSummary />
          </div>
        )}
      </div>
      
      {isConversationStarted && (
        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      )}
    </div>
  );
};

export default Index;
