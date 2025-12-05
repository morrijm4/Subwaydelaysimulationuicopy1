import { Station } from '../types/digitalTwin';
import { SUBWAY_LINES } from '../data/digitalTwinData';

interface InteractiveMapProps {
  stations: Station[];
  onStationClick: (station: Station) => void;
  onLineClick?: (lineId: string) => void;
}

export function InteractiveMap({ stations, onStationClick, onLineClick }: InteractiveMapProps) {
  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'low':
        return '#62D96B';
      case 'medium':
        return '#F7D154';
      case 'high':
        return '#E28A26';
      default:
        return '#62D96B';
    }
  };

  // Convert lat/long to SVG coordinates (simplified mapping)
  const latLongToSVG = (lat: number, long: number) => {
    // NYC bounds roughly: 40.5-40.9 lat, -74.05 to -73.75 long
    const x = ((long + 74.05) / 0.3) * 350 + 20;
    const y = ((40.9 - lat) / 0.4) * 550 + 20;
    return { x, y };
  };

  return (
    <div className="w-full h-full bg-[#242424] relative overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 390 600" preserveAspectRatio="xMidYMid meet">
        {/* Grid background */}
        <defs>
          <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#555" strokeWidth="0.8" />
          </pattern>
          
          {/* Congestion gradient */}
          <radialGradient id="congestion-high">
            <stop offset="0%" stopColor="#E28A26" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E28A26" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="congestion-medium">
            <stop offset="0%" stopColor="#F7D154" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F7D154" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="congestion-low">
            <stop offset="0%" stopColor="#62D96B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#62D96B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="delay">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="390" height="600" fill="url(#map-grid)" />

        {/* Subway Lines - Simplified vertical and horizontal routes */}
        {/* Red Lines (1,2,3) - Vertical on West */}
        <line 
          x1="100" y1="140" x2="100" y2="600" 
          stroke="#EE352E" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('1')}
        />
        <circle cx="100" cy="120" r="12" fill="#EE352E" className="pointer-events-none" />
        <text x="100" y="125" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">1</text>
        
        <line 
          x1="115" y1="140" x2="115" y2="600" 
          stroke="#EE352E" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('2')}
        />
        <circle cx="115" cy="120" r="12" fill="#EE352E" className="pointer-events-none" />
        <text x="115" y="125" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">2</text>
        
        {/* Green Lines (4,5,6) - Vertical in middle-east */}
        <line 
          x1="230" y1="50" x2="230" y2="550" 
          stroke="#00933C" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('4')}
        />
        <circle cx="230" cy="30" r="12" fill="#00933C" className="pointer-events-none" />
        <text x="230" y="35" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">4</text>
        
        <line 
          x1="245" y1="50" x2="245" y2="550" 
          stroke="#00933C" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('5')}
        />
        <circle cx="245" cy="30" r="12" fill="#00933C" className="pointer-events-none" />
        <text x="245" y="35" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">5</text>
        
        {/* Blue Lines (A,C,E) - Vertical on far west */}
        <line 
          x1="70" y1="160" x2="70" y2="570" 
          stroke="#0039A6" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('A')}
        />
        <circle cx="70" cy="140" r="12" fill="#0039A6" className="pointer-events-none" />
        <text x="70" y="145" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">A</text>
        
        {/* Orange Lines (B,D,F,M) - Vertical center */}
        <line 
          x1="180" y1="80" x2="180" y2="520" 
          stroke="#FF6319" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('F')}
        />
        <circle cx="180" cy="60" r="12" fill="#FF6319" className="pointer-events-none" />
        <text x="180" y="65" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">F</text>
        
        <line 
          x1="195" y1="80" x2="195" y2="520" 
          stroke="#FF6319" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('D')}
        />
        <circle cx="195" cy="60" r="12" fill="#FF6319" className="pointer-events-none" />
        <text x="195" y="65" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">D</text>
        
        {/* Yellow Lines (N,Q,R,W) - Diagonal/Horizontal */}
        <line 
          x1="50" y1="400" x2="390" y2="400" 
          stroke="#FCCC0A" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('N')}
        />
        <circle cx="30" cy="400" r="12" fill="#FCCC0A" className="pointer-events-none" />
        <text x="30" y="405" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">N</text>
        
        {/* Purple Line (7) - Horizontal */}
        <line 
          x1="0" y1="200" x2="340" y2="200" 
          stroke="#B933AD" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('7')}
        />
        <circle cx="360" cy="200" r="12" fill="#B933AD" className="pointer-events-none" />
        <text x="360" y="205" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">7</text>
        
        {/* L Line - Horizontal */}
        <line 
          x1="70" y1="300" x2="300" y2="300" 
          stroke="#A7A9AC" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('L')}
        />
        <circle cx="50" cy="300" r="12" fill="#A7A9AC" className="pointer-events-none" />
        <text x="50" y="305" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">L</text>
        
        {/* G Line - Vertical far east */}
        <line 
          x1="300" y1="200" x2="300" y2="600" 
          stroke="#6CBE45" strokeWidth="6" opacity="0.8" 
          className="cursor-pointer hover:opacity-100"
          onClick={() => onLineClick?.('G')}
        />
        <circle cx="300" cy="180" r="12" fill="#6CBE45" className="pointer-events-none" />
        <text x="300" y="185" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" className="pointer-events-none">G</text>

        {/* Congestion heatmap overlay circles */}
        {stations.map((station) => {
          const pos = latLongToSVG(station.latitude, station.longitude);
          const hasDelay = station.delays.length > 0;
          const gradientId = hasDelay ? 'delay' : `congestion-${station.congestion}`;
          return (
            <circle
              key={`heat-${station.id}`}
              cx={pos.x}
              cy={pos.y}
              r="50"
              fill={`url(#${gradientId})`}
            />
          );
        })}

        {/* Station Markers */}
        {stations.map((station) => {
          const pos = latLongToSVG(station.latitude, station.longitude);
          const hasDelay = station.delays.length > 0;

          return (
            <g
              key={station.id}
              onClick={() => onStationClick(station)}
              className="cursor-pointer"
            >
              {/* Station circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="8"
                fill="white"
                stroke="#333"
                strokeWidth="2"
                className="hover:r-10 transition-all"
              />
              
              {/* Status badge - only show one per station */}
              {(hasDelay || station.congestion === 'high' || station.congestion === 'low' || station.congestion === 'medium') && (
                <g>
                  {hasDelay ? (
                    <>
                      {/* Delay badge - highest priority */}
                      <rect
                        x={pos.x + 12}
                        y={pos.y - 8}
                        width="40"
                        height="16"
                        rx="8"
                        fill="#EF4444"
                      />
                      <text
                        x={pos.x + 32}
                        y={pos.y + 2}
                        fill="white"
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Delay
                      </text>
                    </>
                  ) : station.congestion === 'high' ? (
                    <>
                      {/* High congestion badge */}
                      <rect
                        x={pos.x + 12}
                        y={pos.y - 8}
                        width="30"
                        height="16"
                        rx="8"
                        fill="#E28A26"
                      />
                      <text
                        x={pos.x + 27}
                        y={pos.y + 2}
                        fill="white"
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        High
                      </text>
                    </>
                  ) : station.congestion === 'medium' ? (
                    <>
                      {/* Medium congestion badge */}
                      <rect
                        x={pos.x + 12}
                        y={pos.y - 8}
                        width="44"
                        height="16"
                        rx="8"
                        fill="#F7D154"
                      />
                      <text
                        x={pos.x + 34}
                        y={pos.y + 2}
                        fill="white"
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Medium
                      </text>
                    </>
                  ) : station.congestion === 'low' ? (
                    <>
                      {/* Low congestion badge */}
                      <rect
                        x={pos.x + 12}
                        y={pos.y - 8}
                        width="28"
                        height="16"
                        rx="8"
                        fill="#62D96B"
                      />
                      <text
                        x={pos.x + 26}
                        y={pos.y + 2}
                        fill="white"
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        Low
                      </text>
                    </>
                  ) : null}
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Map Legend */}
      <div className="absolute top-3 left-3 bg-blue-900/30 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-blue-800/50">
        <div className="text-xs text-blue-200 mb-2">Congestion Level</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#62D96B]"></div>
            <span className="text-xs text-blue-100">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F7D154]"></div>
            <span className="text-xs text-blue-100">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E28A26]"></div>
            <span className="text-xs text-blue-100">High</span>
          </div>
        </div>
      </div>
    </div>
  );
}