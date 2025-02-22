
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GlobeIcon } from "lucide-react"

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

interface VoiceSelectorProps {
  onVoiceChange: (voice: Voice) => void;
}

export function VoiceSelector({ onVoiceChange }: VoiceSelectorProps) {
  return (
    <Select onValueChange={(voiceId) => {
      const selectedVoice = voices.find(v => v.id === voiceId);
      if (selectedVoice) onVoiceChange(selectedVoice);
    }}>
      <SelectTrigger className="w-[220px] bg-white/90 backdrop-blur-sm">
        <SelectValue placeholder="Select a voice" />
      </SelectTrigger>
      <SelectContent>
        {voices.map((voice) => (
          <SelectItem key={voice.id} value={voice.id}>
            <div className="flex items-center gap-2">
              <GlobeIcon className="h-4 w-4 text-primary" />
              <span>
                {voice.name} ({voice.country} - {voice.gender})
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
