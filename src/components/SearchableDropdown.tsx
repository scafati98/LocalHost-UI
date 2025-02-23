import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { animations } from '@/styles/animations';

interface City {
  id: string;
  name: string;
  country: string;
  accent: string;
}

interface SearchableDropdownProps {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export const SearchableDropdown = ({ cities, selectedCity, onCityChange }: SearchableDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="relative w-full max-w-md">
      <motion.button
        {...animations.scale}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white/80 
                 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl
                 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-lg text-gray-700">
            {selectedCity.name}, {selectedCity.country}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl
                     rounded-2xl shadow-xl overflow-hidden z-50"
          >
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cities..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50/50 rounded-xl outline-none
                           focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {filteredCities.map((city) => (
                <motion.button
                  key={city.id}
                  {...animations.scale}
                  onClick={() => {
                    onCityChange(city);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50
                           transition-colors"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium text-gray-700">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.country}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 