
import { Message } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'agent';
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
}

const ChatInterface = ({ messages }: ChatInterfaceProps) => {
  return (
    <div className="flex flex-col h-full glass-card rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4 p-2">
        <Message className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Chat with Local Host</h2>
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
