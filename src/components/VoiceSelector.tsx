
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect } from "react";

export type Voice = {
  id: string;
  name: string;
  country: string;
  gender: 'male' | 'female';
}

const voices: Voice[] = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel", country: "USA", gender: "female" },
  { id: "CYw3kZ02Hs0563khs1Fj", name: "Drew", country: "USA", gender: "male" },
  { id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum", country: "British", gender: "male" },
  { id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte", country: "British", gender: "female" },
  { id: "ErXwobaYiN019PkySvjV", name: "Antoni", country: "Argentina", gender: "male" },
  { id: "ThT5KcBeYPX3keUQqHPh", name: "Sofia", country: "Argentina", gender: "female" },
];

// Set default voice to Rachel (USA)
const DEFAULT_VOICE = voices[0];

const countryFlags: Record<string, string> = {
  USA: "🇺🇸",
  British: "🇬🇧",
  Argentina: "🇦🇷"
};

interface VoiceSelectorProps {
  onVoiceChange: (voice: Voice) => void;
}

export function VoiceSelector({ onVoiceChange }: VoiceSelectorProps) {
  // Set default voice when component mounts
  useEffect(() => {
    const savedVoice = localStorage.getItem('selectedVoice');
    if (!savedVoice) {
      onVoiceChange(DEFAULT_VOICE);
      localStorage.setItem('selectedVoice', JSON.stringify(DEFAULT_VOICE));
    }
  }, [onVoiceChange]);

  return (
    <Select 
      defaultValue={DEFAULT_VOICE.id}
      onValueChange={(voiceId) => {
        const selectedVoice = voices.find(v => v.id === voiceId);
        if (selectedVoice) onVoiceChange(selectedVoice);
      }}
    >
      <SelectTrigger className="w-[220px] bg-white">
        <SelectValue placeholder="Select a voice" />
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-lg" side="bottom">
        {voices.map((voice) => (
          <SelectItem 
            key={voice.id} 
            value={voice.id}
            className="hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{countryFlags[voice.country]}</span>
              <span>
                {voice.name} ({voice.gender})
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
