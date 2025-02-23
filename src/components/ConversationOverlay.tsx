import {motion, AnimatePresence} from 'framer-motion';
import {X} from 'lucide-react';
import ChatInterface from './ChatInterface';
import LiveIndicator from './LiveIndicator';
import TripSummary from './TripSummary';
import {useState, useEffect, useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {useConversation} from "@11labs/react";

interface City {
    id: string;
    name: string;
    country: string;
    accent: string;
}

interface ConversationOverlayProps {
    isActive: boolean;
    onClose: () => void;
    selectedCity: City;
}

interface Message {
    id: number,
    text: string,
    sender: "agent" | "user"
}

const ConversationOverlay = ({isActive, onClose, selectedCity}: ConversationOverlayProps) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [conversationId, setConversationId] = useState<string | undefined>(undefined)
    const [messageId, setMessageId] = useState(0)

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const addMessage = (message: Message) => {
        setMessageId(currentMessageId => {
            const newId = currentMessageId + 1;

            setMessages(currentMessages => {
                const result = [...currentMessages, {...message, id: newId}];

                fetch(`https://c18d-12-206-80-188.ngrok-free.app/conversation/${conversationId}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({messages: result})
                }).catch(err => console.error("There was an error while trying to add messages to the back", err))

                return result
            })

            return newId
        })
    }

    const conversation = useConversation({
        onConnect: () => console.log('Connected'),
        onDisconnect: () => console.log("Disconnected"),
        onMessage: async ({message, source}) => {
            const result: Message = {id: -1, text: message, sender: source === "ai" ? "agent" : "user"};
            await addMessage(result);
        },
        onError: (error) => console.error('Error:', error),
    });

    const startConversation = useCallback(async () => {
        try {
            const rawResponse = await fetch(`https://c18d-12-206-80-188.ngrok-free.app/conversation/start`)
            const {id} = await rawResponse.json()
            setConversationId(id)
            // Request microphone permission
            await navigator.mediaDevices.getUserMedia({audio: true});
            // Start the conversation with your agent
            await conversation.startSession({
                agentId: 'UACrGvjgdGdC0hgRcsXh',
                dynamicVariables: {
                    session_id: id,
                    location: `${selectedCity.name}, ${selectedCity.country}`
                },
            });
        } catch (error) {
            console.error('Failed to start conversation:', error);
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        await fetch(`https://c18d-12-206-80-188.ngrok-free.app/conversation/${conversationId}/end`, {method: "POST"})
        await conversation.endSession();
    }, [conversation]);

    const handleHangUp = async () => {
        if (conversation.status === "connected") {
            // setIsExiting(true);
            await stopConversation()
            navigate('/');
        }
    };

    useEffect(() => {
        if (isActive) {
            setIsLoading(true);
            startConversation().then(() => setIsLoading(false))
        }
    }, [isActive, selectedCity]);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="fixed inset-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl z-50"
                >
                    <div className="h-full max-w-[1600px] mx-auto p-6 md:p-8 flex flex-col">
                        {/* Header Bar */}
                        <motion.div
                            initial={{y: -20, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            className="flex items-center justify-between mb-8 bg-white/80 rounded-2xl border border-gray-100 p-4 shadow-sm"
                        >
                            <LiveIndicator onHangUp={onClose}/>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={onClose}
                                className="p-2.5 rounded-xl bg-white hover:bg-gray-50
                         transition-colors border border-gray-100 shadow-sm"
                            >
                                <X className="w-5 h-5 text-gray-600"/>
                            </motion.button>
                        </motion.div>

                        {/* Main Content Area */}
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6 min-h-0">
                            {/* Left Column - Chat & Voice */}
                            <div className="flex flex-col gap-6 min-h-0">
                                {/* Chat Interface */}
                                <div
                                    className="flex-1 min-h-0 bg-white/80 rounded-2xl border border-gray-100 p-6 shadow-sm overflow-hidden">
                                    {isLoading ? (
                                        <motion.div
                                            className="flex items-center justify-center h-full"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"/>
                                                <div
                                                    className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"/>
                                                <div
                                                    className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"/>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <ChatInterface
                                            messages={messages}
                                            cityName={selectedCity.name}
                                            onStartOver={() => {
                                                setMessages([]);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Trip Summary */}
                            <motion.div
                                initial={{x: 20, opacity: 0}}
                                animate={{x: 0, opacity: 1}}
                                transition={{delay: 0.2}}
                                className="bg-white/80 rounded-2xl border border-gray-100 shadow-sm p-6
                         overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
                            >
                                <TripSummary conversationId={conversationId} />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConversationOverlay;