
import { MessageSquare, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'agent';
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onStartOver: () => void;
}

const ChatInterface = ({ messages, onStartOver }: ChatInterfaceProps) => {
  return (
    <div className="flex flex-col h-full glass-card rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4 p-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Chat with Local Host</h2>
        </div>
        <button
          onClick={onStartOver}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${
                message.sender === 'agent' ? 'agent-message' : 'user-message'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
