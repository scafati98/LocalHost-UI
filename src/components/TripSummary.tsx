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
  conversationId: string
}

const TripSummary = ({ conversationId }: TripSummaryProps) => {

  console.log("conversation id", conversationId)

  const [data, setData] = useState<any | undefined>(undefined)

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const rawResponse = await fetch(`http://localhost:3000/conversation/${conversationId}`)
  //     const response = await rawResponse.json()
  //     console.log("got data realtime", response)
  //     setData(response)
  //   }, 3_000)
  //
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

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
          {data == null ? (
              <p>Start chatting to get personalized recommendations</p>
          ) : (
              JSON.stringify(data)
          )}
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
