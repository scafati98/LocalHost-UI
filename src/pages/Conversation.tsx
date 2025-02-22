
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripSummary from '../components/TripSummary';
import LiveIndicator from '../components/LiveIndicator';
import VoiceWaveform from '../components/VoiceWaveform';

const Conversation = () => {
  const navigate = useNavigate();

  const handleHangUp = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-full max-w-md">
            <div className="flex justify-center">
              <LiveIndicator onHangUp={handleHangUp} />
            </div>
            <div className="flex justify-center mt-6">
              <VoiceWaveform />
            </div>
          </div>
          
          <div className="w-full animate-fade-in">
            <TripSummary />
          </div>
        </div>
      </div>
      
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default Conversation;
