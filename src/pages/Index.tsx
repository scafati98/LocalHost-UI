
import { useNavigate } from 'react-router-dom';
import VoiceButton from '../components/VoiceButton';

const Index = () => {
  const navigate = useNavigate();

  const handleVoiceToggle = (isActive: boolean) => {
    if (isActive) {
      navigate('/conversation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Plan Your Perfect Trip with Local Host
          </h1>
          <p className="text-gray-600 mb-12 text-center max-w-md">
            Press the button and start speaking to get personalized travel recommendations
          </p>
          <VoiceButton onToggle={handleVoiceToggle} />
        </div>
      </div>
    </div>
  );
};

export default Index;
