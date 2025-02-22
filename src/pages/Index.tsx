
import { useNavigate } from 'react-router-dom';
import VoiceButton from '../components/VoiceButton';
import { VoiceSelector, type Voice } from '../components/VoiceSelector';
import { Plane, MapPin, CalendarCheck } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleVoiceToggle = (isActive: boolean) => {
    if (isActive) {
      navigate('/conversation');
    }
  };

  const handleVoiceChange = (voice: Voice) => {
    // Store the selected voice in localStorage for use in the conversation
    localStorage.setItem('selectedVoice', JSON.stringify(voice));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
          {/* Main content */}
          <div className="text-center space-y-8 max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Plane className="w-8 h-8 text-primary animate-bounce" />
                <MapPin className="w-6 h-6 text-primary/80" />
                <CalendarCheck className="w-7 h-7 text-primary/60" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Your Local Host
              </h1>
              
              <p className="text-xl md:text-2xl font-medium text-gray-600 mb-6">
                Plan Your Perfect Trip with Voice
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-4 glass-card rounded-xl">
                <h3 className="font-semibold text-primary mb-2">Just Speak</h3>
                <p className="text-sm text-gray-600">Share your travel preferences naturally through conversation</p>
              </div>
              <div className="p-4 glass-card rounded-xl">
                <h3 className="font-semibold text-primary mb-2">Get Plans</h3>
                <p className="text-sm text-gray-600">Receive personalized itineraries and recommendations</p>
              </div>
              <div className="p-4 glass-card rounded-xl">
                <h3 className="font-semibold text-primary mb-2">Travel Better</h3>
                <p className="text-sm text-gray-600">Enjoy a perfectly planned trip tailored to your interests</p>
              </div>
            </div>

            {/* Voice controls section */}
            <div className="space-y-6">
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Choose your preferred assistant voice and press the microphone to start planning
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <VoiceSelector onVoiceChange={handleVoiceChange} />
                <VoiceButton onToggle={handleVoiceToggle} />
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Tap to start planning your next adventure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
