import { useState } from 'react';
import { Station, FilterOptions, SubwayLineData } from './types/digitalTwin';
import { STATIONS, PREDICTIONS, SUBWAY_LINES } from './data/digitalTwinData';
import { HomeScreen } from './components/HomeScreen';
import { AdvancedFilterPanel } from './components/AdvancedFilterPanel';
import { StationDetailScreen } from './components/StationDetailScreen';
import { RouteDetailScreen } from './components/RouteDetailScreen';
import { SimulationScenarioScreen } from './components/SimulationScenarioScreen';

type Screen = 'home' | 'station-detail' | 'route-detail' | 'simulation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedLine, setSelectedLine] = useState<SubwayLineData | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'today',
    peakHoursOnly: false,
    selectedLines: [],
    showExpress: true,
    showLocal: true,
    delayTypes: [],
    showPredictions: true,
    showHighRiskOnly: false,
  });

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    setCurrentScreen('station-detail');
  };

  const handleLineClick = (lineId: string) => {
    const line = SUBWAY_LINES.find((l) => l.id === lineId);
    if (line) {
      setSelectedLine(line);
      setCurrentScreen('route-detail');
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedStation(null);
    setSelectedLine(null);
  };

  const handleSimulate = () => {
    setCurrentScreen('simulation');
  };

  // Apply filters to stations
  const filteredStations = STATIONS.filter((station) => {
    // Filter by selected lines
    if (filters.selectedLines.length > 0) {
      const hasMatchingLine = station.lines.some((line) =>
        filters.selectedLines.includes(line)
      );
      if (!hasMatchingLine) return false;
    }

    // Filter by delay types
    if (filters.delayTypes.length > 0) {
      const hasMatchingDelay = station.delays.some((delay) =>
        filters.delayTypes.includes(delay.type)
      );
      if (station.delays.length === 0 || !hasMatchingDelay) return false;
    }

    // Filter by high risk only
    if (filters.showHighRiskOnly) {
      if (station.congestion !== 'high' && station.delays.length === 0) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* iPhone Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-black rounded-[60px] shadow-2xl overflow-hidden border-[14px] border-black">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-3xl z-50"></div>
        
        {/* Screen Content */}
        <div className="h-full bg-gray-50 overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="bg-white px-6 pt-3 pb-2">
            <div className="flex items-center justify-between text-black">
              <span className="text-sm">9:41</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <svg className="w-5 h-4" fill="currentColor" viewBox="0 0 24 20">
                  <rect x="0" y="3" width="18" height="14" rx="2" />
                  <path d="M23 7v6l-5-3z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Screen Router */}
          {currentScreen === 'home' && (
            <HomeScreen
              stations={filteredStations}
              onStationClick={handleStationClick}
              onLineClick={handleLineClick}
              onFilterClick={() => setShowFilters(true)}
            />
          )}

          {currentScreen === 'station-detail' && selectedStation && (
            <StationDetailScreen
              station={selectedStation}
              predictions={PREDICTIONS}
              onBack={handleBackToHome}
            />
          )}

          {currentScreen === 'route-detail' && selectedLine && (
            <RouteDetailScreen
              line={selectedLine}
              stations={STATIONS}
              onBack={handleBackToHome}
              onSimulate={handleSimulate}
            />
          )}

          {currentScreen === 'simulation' && selectedLine && (
            <SimulationScenarioScreen
              lineName={selectedLine.name}
              lineColor={selectedLine.color}
              onBack={handleBackToHome}
            />
          )}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
      </div>

      {/* Filter Modal */}
      {showFilters && (
        <AdvancedFilterPanel
          filters={filters}
          onFilterChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}