
import { useState } from 'react';
import VoiceButton from '../components/VoiceButton';
import ChatInterface from '../components/ChatInterface';
import TripSummary from '../components/TripSummary';

const Index = () => {
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Local Host, your personal travel assistant. How can I help you plan your perfect trip?",
      sender: 'agent' as const,
    },
  ]);

  const handleVoiceToggle = (isActive: boolean) => {
    if (isActive) {
      setIsConversationStarted(true);
      // Here you would normally integrate with your voice recognition system
      setMessages([...messages, {
        id: Date.now(),
        text: "I'm listening...",
        sender: 'agent' as const,
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {!isConversationStarted ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
            <h1 className="text-4xl font-bold mb-8 text-center">
              Plan Your Perfect Trip with Local Host
            </h1>
            <p className="text-gray-600 mb-12 text-center max-w-md">
              Press the button and start speaking to get personalized travel recommendations
            </p>
            <VoiceButton onToggle={handleVoiceToggle} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <ChatInterface messages={messages} />
            <TripSummary />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
