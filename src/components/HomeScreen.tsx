import { useState } from 'react';
import { Search, Mic, SlidersHorizontal } from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';
import { CityStatusBar } from './CityStatusBar';
import { Station } from '../types/digitalTwin';
import { CITY_STATUS } from '../data/digitalTwinData';

interface HomeScreenProps {
  stations: Station[];
  onStationClick: (station: Station) => void;
  onLineClick: (lineId: string) => void;
  onFilterClick: () => void;
}

export function HomeScreen({ stations, onStationClick, onLineClick, onFilterClick }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search station, route, or incident…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-20 py-2 bg-gray-100 rounded-lg"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
              <Mic className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onFilterClick}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="flex-1 relative">
        <InteractiveMap 
          stations={stations} 
          onStationClick={onStationClick}
          onLineClick={onLineClick}
        />
      </div>

      {/* City Status Bar */}
      <CityStatusBar status={CITY_STATUS} />
    </div>
  );
}