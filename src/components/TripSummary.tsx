import { Calendar, MapPin, Star, Users, Mail, Wallet, Clock, Clock3, MapPinned, Utensils, Info, ChevronDown, ChevronUp, Euro, Coffee, Hotel, Camera, Share2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from 'framer-motion';

interface EventDetails {
  time: string;
  activity: string;
  type: "activity" | "restaurant";
  description?: string;
  location?: string;
  duration?: string;
  rating?: number;
  cuisine?: string;
  priceRange?: string;
}

interface DaySchedule {
  date: string;
  events: EventDetails[];
}

interface WeekSchedule {
  weekNumber: number;
  days: DaySchedule[];
}

interface TripDetail {
  type: 'destination' | 'accommodation' | 'activity' | 'restaurant' | 'budget' | 'duration';
  content: any;
  timestamp: number;
}

interface Recommendation {
  type: 'place' | 'restaurant' | 'hotel' | 'activity';
  title: string;
  description: string;
  icon: JSX.Element;
  tags: string[];
  time?: string;
  price?: string;
}

interface TripSummaryProps {
  messages: any[]; // Your chat message type
}

const TripSummary = ({ messages }: TripSummaryProps) => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1]); // First week expanded by default
  const { toast } = useToast();
  const [details, setDetails] = useState<TripDetail[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(['destination']);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleSendEmail = () => {
    toast({
      title: "Success!",
      description: `Trip summary will be sent to ${email}`,
    });
    setIsEmailDialogOpen(false);
    setEmail('');
  };

  const handleEventClick = (event: EventDetails) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeeks(prev => 
      prev.includes(weekNumber)
        ? prev.filter(w => w !== weekNumber)
        : [...prev, weekNumber]
    );
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // Extract trip details from messages
  useEffect(() => {
    const extractedDetails: TripDetail[] = [];
    
    messages.forEach(message => {
      // Add logic to extract details from messages
      // This is where you'd parse the AI responses and categorize information
    });

    setDetails(extractedDetails);
  }, [messages]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-800">Trip Insights</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-xl hover:bg-gray-50 text-gray-500"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      </div>


      {/* Recommendations */}
      <div className="space-y-4">
        <div className="text-center py-8 text-gray-500">
          <Coffee className="w-6 h-6 mx-auto mb-2 opacity-50" />
          <p>Start chatting to get personalized recommendations</p>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
