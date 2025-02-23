import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { animations } from '@/styles/animations';

interface City {
  id: string;
  name: string;
  country: string;
  image: string;
}

interface CitySelectorProps {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
}

const CitySelector = ({ cities, selectedCity, onCityChange }: CitySelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cities.map((city) => (
        <motion.button
          key={city.id}
          {...animations.scale}
          onClick={() => onCityChange(city)}
          className={`
            relative overflow-hidden rounded-2xl aspect-[4/3] group
            ${selectedCity.id === city.id ? 'ring-2 ring-primary' : ''}
          `}
        >
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-left">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{city.name}</span>
            </div>
            <span className="text-sm opacity-80">{city.country}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default CitySelector; 