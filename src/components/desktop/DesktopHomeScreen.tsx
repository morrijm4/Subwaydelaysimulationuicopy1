import { useState } from 'react';
import { Search, Mic, SlidersHorizontal, X } from 'lucide-react';
import { InteractiveMap } from '../InteractiveMap';
import { CityStatusBar } from '../CityStatusBar';
import { Station, FilterOptions } from '../../types/digitalTwin';
import { CITY_STATUS } from '../../data/digitalTwinData';
import { StationDetailPanel } from './StationDetailPanel';
import { RouteDetailPanel } from './RouteDetailPanel';
import { DesktopFilterPanel } from './DesktopFilterPanel';

interface DesktopHomeScreenProps {
  stations: Station[];
  selectedStation: Station | null;
  selectedLine: any;
  filters: FilterOptions;
  onStationClick: (station: Station) => void;
  onLineClick: (lineId: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  onSimulate: () => void;
  onPlanTrip: () => void;
}

export function DesktopHomeScreen({
  stations,
  selectedStation,
  selectedLine,
  filters,
  onStationClick,
  onLineClick,
  onFilterChange,
  onSimulate,
  onPlanTrip,
}: DesktopHomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Filters */}
      {showFilters && (
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-gray-900">Filters</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-180px)]">
            <DesktopFilterPanel filters={filters} onFilterChange={onFilterChange} />
          </div>
        </div>
      )}

      {/* Main Map Area */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search station, route, or incident…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-24 py-3 bg-gray-100 rounded-lg"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Mic className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  showFilters ? 'bg-[#2979FF] text-white' : 'hover:bg-gray-200 text-gray-600'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <InteractiveMap
            stations={stations}
            onStationClick={onStationClick}
            onLineClick={onLineClick}
          />
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <CityStatusBar status={CITY_STATUS} onPlanTrip={onPlanTrip} />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Station/Line Details */}
      {(selectedStation || selectedLine) && (
        <div className="w-96 bg-white border-l border-gray-200 flex-shrink-0 overflow-y-auto">
          {selectedStation && (
            <StationDetailPanel
              station={selectedStation}
              onClose={() => onStationClick(null as any)}
            />
          )}
          {selectedLine && !selectedStation && (
            <RouteDetailPanel
              line={selectedLine}
              onClose={() => onLineClick('')}
              onSimulate={onSimulate}
            />
          )}
        </div>
      )}
    </div>
  );
}
