
import { Calendar, MapPin, Star, Users, Mail, Wallet, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

const TripSummary = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSendEmail = () => {
    // Here you would typically integrate with your email service
    toast({
      title: "Success!",
      description: `Trip summary will be sent to ${email}`,
    });
    setIsDialogOpen(false);
    setEmail('');
  };

  const agenda = [
    {
      date: "Day 1 - Monday, April 15",
      events: [
        { time: "10:00 AM", activity: "City Tour", type: "activity" },
        { time: "1:00 PM", activity: "Lunch at Ocean View Restaurant", type: "restaurant" },
        { time: "4:00 PM", activity: "Beach Walk", type: "activity" },
        { time: "7:00 PM", activity: "Dinner at Sunset Grill", type: "restaurant" }
      ]
    },
    {
      date: "Day 2 - Tuesday, April 16",
      events: [
        { time: "9:00 AM", activity: "Local Food Festival", type: "activity" },
        { time: "2:00 PM", activity: "Wine Tasting", type: "activity" },
        { time: "7:30 PM", activity: "Seafood Dinner at Pearl", type: "restaurant" }
      ]
    }
  ];

  return (
    <>
      <div className="glass-card rounded-2xl p-6 space-y-6 animate-fade-in-slow">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Trip Summary</h2>
            <Button
              onClick={() => setIsDialogOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Send to Email
            </Button>
          </div>
          <p className="text-sm text-gray-600">Based on your conversation</p>
        </div>

        <div className="space-y-6">
          {/* Place to Stay */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="font-medium">Accommodation</h3>
              <div className="mt-2">
                <div className="p-3 bg-white/50 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">Luxury Ocean Resort</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Beachfront, Ocean View Suite</p>
                </div>
              </div>
            </div>
          </div>

          {/* Budget and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Wallet className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Estimated Budget</h3>
                <div className="mt-2 p-3 bg-white/50 rounded-lg">
                  <span className="text-2xl font-semibold">$2,500</span>
                  <p className="text-sm text-gray-600 mt-1">All inclusive</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Duration</h3>
                <div className="mt-2 p-3 bg-white/50 rounded-lg">
                  <span className="text-2xl font-semibold">2 Days</span>
                  <p className="text-sm text-gray-600 mt-1">April 15 - 16</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Agenda */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="font-medium">Daily Agenda</h3>
              <div className="mt-2 space-y-4">
                {agenda.map((day, index) => (
                  <div key={index} className="p-4 bg-white/50 rounded-lg">
                    <h4 className="font-medium text-primary mb-3">{day.date}</h4>
                    <div className="space-y-3">
                      {day.events.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex items-start gap-2">
                          <div className="min-w-[80px] text-sm text-gray-600">
                            {event.time}
                          </div>
                          <div className={`flex-1 text-sm ${
                            event.type === 'restaurant' ? 'text-primary' : ''
                          }`}>
                            {event.activity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Trip Summary</DialogTitle>
            <DialogDescription>
              Enter your email address to receive your trip summary.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleSendEmail}>Send Summary</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TripSummary;
