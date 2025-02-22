
import { Calendar, MapPin, Star, Users, Mail } from 'lucide-react';
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

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Suggested Stays</h3>
              <div className="mt-2 space-y-2">
                <div className="p-3 bg-white/50 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">Luxury Hotel</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Downtown area, Ocean view</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Upcoming Events</h3>
              <div className="mt-2 space-y-2">
                <div className="p-3 bg-white/50 rounded-lg">
                  <span className="font-medium">Local Food Festival</span>
                  <p className="text-sm text-gray-600 mt-1">This weekend, City Center</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Local Reviews</h3>
              <div className="mt-2 space-y-2">
                <div className="p-3 bg-white/50 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">Sarah M.</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">5.0</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">"Amazing experience, must visit!"</p>
                </div>
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
